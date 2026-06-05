#!/usr/bin/env node
/**
 * Post-build prerender for r352.com
 * ----------------------------------
 * After `vite build`, this script:
 *  1. Starts `vite preview` to serve dist/ on a local port
 *  2. Launches headless Chromium via Puppeteer
 *  3. Visits each configured route
 *  4. Waits for window.__PRERENDER_READY__ (or timeout)
 *  5. Captures final document HTML
 *  6. Writes it to dist/{route}/index.html
 *  7. Tears down browser + preview server
 *
 * The SPA still hydrates client-side after the snapshot loads, so users
 * get the same UX as before. Crawlers + LLMs + social scrapers without
 * JS execution get real route-specific HTML instead of the SPA shell.
 *
 * Visual parity safeguards:
 *  - localStorage stub for consent (banner stays client-only, not in HTML)
 *  - 1500ms settle wait baked into App.tsx __PRERENDER_READY__ signal
 *  - Wait for document.fonts.ready before capture
 *  - 10s timeout fallback per route (no build crash on misbehaving page)
 *  - Don't set prefers-reduced-motion (capture normal motion state)
 *  - Set theme: dark (matches default)
 *
 * Exit code 0 = all routes captured (or fell back to existing dist/index.html).
 * Exit code 1 = unrecoverable failure (browser launch, build dir missing).
 */

import { spawn } from "node:child_process";
import { mkdir, writeFile, access } from "node:fs/promises";
import { existsSync, constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, "..");
const DIST_DIR = join(PROJECT_ROOT, "dist");

// ─── Config ─────────────────────────────────────────────────────────
const PREVIEW_PORT = 4173;
const PREVIEW_HOST = `http://localhost:${PREVIEW_PORT}`;
const ROUTE_TIMEOUT_MS = 10_000;
const READY_POLL_INTERVAL_MS = 50;
const VIEWPORT = { width: 1440, height: 900 };

/**
 * Routes to prerender. First iteration: 18 main routes.
 * Dynamic routes (case studies, journal articles) intentionally skipped —
 * they fall back to existing dist/index.html (SPA hydration), which is
 * Googlebot-render-compatible but not perfect for non-JS crawlers.
 * Add them in iteration 2 if first run is stable.
 */
const ROUTES = [
  "/",
  "/services",
  "/process",
  "/glossary",
  "/work",
  "/journal",
  "/contact",
  "/brief",
  "/philosophy",
  "/deliverables",
  "/faq",
  "/privacy",
  "/cookies",
  "/industries",
  "/industries/fitness-wellness",
  "/industries/real-estate",
  "/industries/retail-franchise",
  "/industries/health-service-networks",
];

// ─── Tiny logger ────────────────────────────────────────────────────
const log = {
  info: (msg) => console.log(`[prerender] ${msg}`),
  ok: (msg) => console.log(`[prerender] [32m✓[0m ${msg}`),
  warn: (msg) => console.log(`[prerender] [33m⚠[0m ${msg}`),
  err: (msg) => console.log(`[prerender] [31m✗[0m ${msg}`),
};

// ─── Sanity checks ──────────────────────────────────────────────────
if (!existsSync(DIST_DIR)) {
  log.err(`dist/ not found — run \`vite build\` first.`);
  process.exit(1);
}

// ─── Helper: poll the port via HTTP until it responds ───────────────
// Much more reliable than parsing stdout — Node may buffer child output
// across newlines, and stdout flush timing varies by vite version.
async function waitForServer(port, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(`http://localhost:${port}/`, (res) => {
          res.resume();
          resolve();
        });
        req.on("error", reject);
        req.setTimeout(1500, () => req.destroy(new Error("socket timeout")));
      });
      return; // success
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  throw new Error(
    `vite preview did not respond on http://localhost:${port}/ within ${timeoutMs / 1000}s. Last error: ${lastError?.message || "unknown"}`
  );
}

// ─── Start vite preview ─────────────────────────────────────────────
log.info(`Starting vite preview on :${PREVIEW_PORT}...`);

const previewProc = spawn(
  "npx",
  ["vite", "preview", "--port", String(PREVIEW_PORT), "--strictPort"],
  {
    cwd: PROJECT_ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" },
  }
);

// Capture stderr so we see vite errors if startup fails
let viteStderr = "";
previewProc.stderr.on("data", (chunk) => {
  viteStderr += chunk.toString();
});

// Fire-and-forget — also drain stdout so the buffer doesn't fill up
previewProc.stdout.on("data", () => { /* drain */ });

// Detect early death (vite crashed before responding)
let viteExitedEarly = false;
previewProc.on("exit", (code) => {
  viteExitedEarly = true;
  if (code !== 0 && code !== null) {
    log.err(`vite preview exited with code ${code}`);
    if (viteStderr) log.err(`vite stderr: ${viteStderr.slice(0, 500)}`);
  }
});

// HTTP-poll the port until we get a response (or timeout)
const previewReady = (async () => {
  await waitForServer(PREVIEW_PORT, 30_000);
  if (viteExitedEarly) {
    throw new Error(`vite preview process exited before becoming ready. stderr: ${viteStderr.slice(0, 500)}`);
  }
})();

let browser = null;
let failedRoutes = [];
let okRoutes = [];

async function cleanup() {
  if (browser) {
    try { await browser.close(); } catch { /* noop */ }
  }
  if (previewProc && !previewProc.killed) {
    previewProc.kill("SIGTERM");
  }
}

process.on("SIGINT", async () => { await cleanup(); process.exit(130); });
process.on("SIGTERM", async () => { await cleanup(); process.exit(143); });

try {
  await previewReady;
  log.ok(`vite preview ready at ${PREVIEW_HOST}`);

  // ─── Launch Puppeteer ───────────────────────────────────────────
  log.info(`Launching headless Chromium...`);
  browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });
  log.ok(`Chromium launched`);

  // ─── Render each route ──────────────────────────────────────────
  for (const route of ROUTES) {
    const url = `${PREVIEW_HOST}${route}`;
    const startMs = Date.now();

    try {
      const page = await browser.newPage();
      await page.setViewport(VIEWPORT);

      // Visual parity: stub localStorage BEFORE any script runs so the
      // consent banner doesn't render into the static HTML. Banner stays
      // a client-only experience — every visitor sees it normally.
      // We mark consent as "accepted" (any persisted value works) so the
      // ConsentProvider skips the pending state during prerender capture.
      await page.evaluateOnNewDocument(() => {
        try {
          window.localStorage.setItem(
            "r352-consent-v1",
            JSON.stringify({ status: "accepted", ts: Date.now(), version: 1 })
          );
        } catch { /* localStorage might not exist in some contexts */ }
      });

      await page.goto(url, { waitUntil: "networkidle2", timeout: ROUTE_TIMEOUT_MS });

      // Wait for fonts to load before capture (avoids FOUT in pre-rendered HTML)
      await page.evaluate(async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
      });

      // Wait for __PRERENDER_READY__ signal (set in App.tsx 1.5s after mount)
      // with timeout fallback to whatever's in DOM at that point.
      let ready = false;
      const readyDeadline = Date.now() + (ROUTE_TIMEOUT_MS - (Date.now() - startMs));
      while (Date.now() < readyDeadline) {
        ready = await page.evaluate(() => Boolean(window.__PRERENDER_READY__));
        if (ready) break;
        await new Promise((r) => setTimeout(r, READY_POLL_INTERVAL_MS));
      }

      if (!ready) {
        log.warn(`${route} — __PRERENDER_READY__ not set within ${ROUTE_TIMEOUT_MS}ms, capturing anyway`);
      }

      // Capture full final HTML
      const html = await page.evaluate(() => `<!DOCTYPE html>${document.documentElement.outerHTML}`);

      await page.close();

      // Write to dist/{route}/index.html — for "/" it's dist/index.html (overwrite),
      // for nested routes it's dist/path/to/route/index.html.
      const outDir = route === "/"
        ? DIST_DIR
        : join(DIST_DIR, route.replace(/^\//, ""));

      if (route !== "/") {
        await mkdir(outDir, { recursive: true });
      }

      const outPath = join(outDir, "index.html");
      await writeFile(outPath, html, "utf-8");

      const elapsedMs = Date.now() - startMs;
      log.ok(`${route.padEnd(40)} → ${outPath.replace(PROJECT_ROOT + "/", "")}  (${elapsedMs}ms${ready ? "" : ", FALLBACK"})`);
      okRoutes.push(route);
    } catch (err) {
      log.err(`${route} — ${err.message}`);
      failedRoutes.push({ route, error: err.message });
    }
  }

  // ─── Summary ────────────────────────────────────────────────────
  console.log("");
  log.ok(`Prerendered: ${okRoutes.length}/${ROUTES.length}`);
  if (failedRoutes.length > 0) {
    log.warn(`Failed: ${failedRoutes.length}`);
    for (const f of failedRoutes) {
      console.log(`  - ${f.route}: ${f.error}`);
    }
    log.warn(`Failed routes fall back to dist/index.html (SPA hydration still works).`);
  }
} catch (err) {
  log.err(`Fatal: ${err.message}`);
  await cleanup();
  process.exit(1);
}

await cleanup();
log.ok(`Done.`);
process.exit(0);
