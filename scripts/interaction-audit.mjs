#!/usr/bin/env node
/**
 * interaction-audit.mjs - clicks the page and asserts nothing blows up.
 * ---------------------------------------------------------------------
 * WHY THIS EXISTS: the FAQ accordion shipped with a crash on the third item
 * (`e.currentTarget` read inside a setState updater, which React has already
 * nulled). Every existing gate passed it - audit-crawl reads the prerendered
 * MARKUP and mobile-audit measures the RESTING layout. Neither one ever clicked
 * anything, so a runtime error that only exists after user interaction was
 * invisible to all of them.
 *
 * This closes that class: for each page, expand/toggle every disclosure control
 * and assert that (a) no uncaught error reached the window, and (b) the app is
 * still mounted afterwards. A React error boundary unmounting the tree shows up
 * as a body that suddenly has no content - which is exactly what "strona sie
 * wywala" looks like to a visitor.
 *
 * Usage:
 *   node scripts/interaction-audit.mjs [baseUrl]   audit a URL (default production)
 *   node scripts/interaction-audit.mjs --local     serve dist/ and audit that
 *
 * Exit 1 on any uncaught error or unmount.
 */
import { existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const LOCAL = argv.includes("--local");
const PORT = 4198;
const urlArg = argv.find((a) => !a.startsWith("--"));
const BASE = (urlArg || (LOCAL ? `http://localhost:${PORT}` : "https://www.r352.com")).replace(/\/$/, "");

/** Pages that carry interactive disclosure UI worth exercising. */
const PAGES = [
  "/faq", "/services", "/process", "/for-agencies", "/brief", "/glossary",
  // IndustryDetail.tsx is the template behind every /industries/:slug page,
  // so one instance covers the whole family.
  "/industries/fitness-wellness",
];

/**
 * Anything a user can click to reveal content. Deliberately broad: the bug we
 * are guarding against is "a handler throws", and it does not matter whether the
 * handler sits on a <summary>, a button, or a tab.
 */
const CONTROL_SELECTOR = [
  "details > summary",
  "[aria-expanded]",
  "[role='tab']",
].join(", ");

/** Chromium resolution shared with prerender / mobile-audit. */
function findChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  try {
    const p = puppeteer.executablePath();
    if (p && existsSync(p)) return p;
  } catch {}
  const roots = [
    join(homedir(), ".cache", "ms-playwright"),
    join(homedir(), "Library", "Caches", "ms-playwright"),
    join(ROOT, "node_modules", ".cache", "puppeteer"),
  ];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const rev of readdirSync(root)) {
      for (const c of [
        join(root, rev, "chrome-mac-arm64", "Chromium.app", "Contents", "MacOS", "Chromium"),
        join(root, rev, "chrome-mac", "Chromium.app", "Contents", "MacOS", "Chromium"),
        join(root, rev, "chrome-linux", "chrome"),
      ]) if (existsSync(c)) return c;
    }
  }
  return null;
}

// ── Local server ───────────────────────────────────────────────────────
let server = null;
async function serveDist() {
  if (!existsSync(join(ROOT, "dist", "index.html"))) {
    console.error("[interaction-audit] brak dist/ - uruchom najpierw `npm run build`.");
    process.exit(1);
  }
  server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    cwd: ROOT, stdio: "ignore",
  });
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 250));
    try { if ((await fetch(`${BASE}/`)).ok) return; } catch {}
  }
  throw new Error(`serwer podgladu nie wstal na porcie ${PORT}`);
}
const stopServer = () => { if (server && !server.killed) server.kill("SIGTERM"); server = null; };
process.on("exit", stopServer);
process.on("SIGINT", () => { stopServer(); process.exit(130); });
if (LOCAL) await serveDist();

// ── Run ────────────────────────────────────────────────────────────────
const exe = findChromium();
const browser = await puppeteer.launch({
  headless: "new",
  ...(exe ? { executablePath: exe } : {}),
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const failures = [];
const rows = [];

for (const path of PAGES) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });

  try {
    const res = await page.goto(BASE + path, { waitUntil: "networkidle2", timeout: 45000 });
    if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status()}`);
    await new Promise((r) => setTimeout(r, 1500));

    const total = await page.$$eval(CONTROL_SELECTOR, (els) => els.length);
    let clicked = 0;
    const problems = [];

    for (let i = 0; i < total; i++) {
      errors.length = 0;
      // Click by index each time: the DOM may legitimately re-render between
      // toggles, so a held ElementHandle would go stale.
      const ok = await page.evaluate((sel, idx) => {
        const el = document.querySelectorAll(sel)[idx];
        if (!el || !(el instanceof HTMLElement)) return false;
        el.click();
        return true;
      }, CONTROL_SELECTOR, i);
      if (!ok) continue;
      clicked++;
      await new Promise((r) => setTimeout(r, 250));

      // An unmounted React tree is the visible symptom of a thrown handler.
      const mounted = await page.evaluate(() => {
        const root = document.getElementById("root") || document.body;
        return (root.innerText || "").trim().length;
      });

      if (errors.length) problems.push(`kontrolka #${i + 1}: ${errors[0]}`);
      if (mounted < 100) {
        problems.push(`kontrolka #${i + 1}: aplikacja odmontowana (tresc: ${mounted} znakow)`);
        break; // page is dead, further clicks tell us nothing
      }
    }

    rows.push({ path, total, clicked, problems });
    if (problems.length) failures.push({ path, problems });
  } catch (e) {
    rows.push({ path, total: 0, clicked: 0, problems: [`nie udalo sie wczytac: ${e.message}`] });
    failures.push({ path, problems: [`nie udalo sie wczytac: ${e.message}`] });
  }
  await page.close();
}

await browser.close();
stopServer();

// ── Report ─────────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`\nAUDYT INTERAKCJI - ${BASE}\n`);
console.log(pad("STRONA", 22) + pad("KONTROLKI", 11) + pad("KLIKNIETE", 11) + "WYNIK");
console.log("-".repeat(64));
for (const r of rows) {
  console.log(pad(r.path, 22) + pad(r.total, 11) + pad(r.clicked, 11) + (r.problems.length ? `BLAD (${r.problems.length})` : "ok"));
}

console.log("\n" + "=".repeat(60));
if (!failures.length) {
  console.log("WYNIK: interakcje OK - zadna kontrolka nie wywala strony.");
  process.exit(0);
}
console.log(`WYNIK: ${failures.length} stron z bledami runtime:\n`);
for (const f of failures) console.log(`  ${f.path}\n    - ${f.problems.join("\n    - ")}`);
process.exit(1);
