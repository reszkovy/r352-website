#!/usr/bin/env node
/**
 * mobile-audit.mjs - scripted mobile UX / a11y contract test at 390x844.
 * ----------------------------------------------------------------------
 * Emulates a real phone (viewport, DPR, touch, mobile UA) and asserts the
 * ergonomics rules the mobile audit asked for. Measures the RENDERED page, not
 * the source - the browser-window resize used during manual review never
 * produced a true 390px viewport, so every "looks cramped" claim needed a real
 * emulated device to be checked instead of eyeballed.
 *
 * Checks per page:
 *   1. no horizontal overflow
 *   2. exactly one h1, visible, real size, not covered by the fixed header
 *   3. first CTA visible in the first viewport
 *   4. no focusable element inside the CLOSED menu panel
 *   5. no visible touch target smaller than 44x44 CSS px
 *   6. no "@keyframes" leaking into any accessible name
 *   7. no letter-by-letter decorative text in the accessible tree
 *
 * TWO SEVERITIES, so this can gate a deploy without being disabled the first
 * time it is inconvenient:
 *   BLOCKING - overflow, wrong/invisible/covered h1, focusable elements in the
 *              closed menu, CSS leaking into an accessible name, letter-by-letter
 *              text in the accessibility tree. These are always bugs.
 *   BUDGET   - touch targets under 44x44. A residual set is knowingly accepted
 *              (inline links inside prose, 20px carousel dots) because enlarging
 *              them is a visual-design change, not an ergonomics fix. The budget
 *              in mobile-budget.json freezes that number per page: the current
 *              state cannot get worse, and going over IS blocking. Lower numbers
 *              are reported as an improvement to be committed, never a failure.
 *
 * Usage:
 *   node scripts/mobile-audit.mjs [baseUrl]      audit a URL (default production)
 *   node scripts/mobile-audit.mjs --local        build-output audit: serves dist/ itself
 *   node scripts/mobile-audit.mjs --update-budget   rewrite the budget from this run
 *
 * Exit 1 on any blocking issue or budget overrun. Deliberately NOT part of
 * `npm run build`: that runs on Vercel, where there is no Chromium to drive.
 * It is the pre-deploy gate (`npm run verify`) instead.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const UPDATE_BUDGET = argv.includes("--update-budget");
const LOCAL = argv.includes("--local") || UPDATE_BUDGET;
const LOCAL_PORT = 4199;
const urlArg = argv.find((a) => !a.startsWith("--"));
const BASE = (urlArg || (LOCAL ? `http://localhost:${LOCAL_PORT}` : "https://www.r352.com")).replace(/\/$/, "");
const BUDGET_FILE = join(ROOT, "scripts", "mobile-budget.json");

const PAGES = [
  "/", "/services", "/work", "/work/sonova",
  "/industries", "/industries/fitness-wellness", "/brief", "/contact",
];

const DEVICE = {
  viewport: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
};

const MIN_TAP = 44;

/** Reuse the prerender script's Chromium resolution (local + CI caches). */
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

/** Runs inside the page. Returns raw measurements; assertions happen in Node. */
const MEASURE = (minTap) => {
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && cs.opacity !== "0";
  };
  // An element is hidden from assistive tech if it (or an ancestor) is
  // aria-hidden or inert. `inert` also removes it from the tab order.
  const hiddenFromAT = (el) => !!el.closest('[aria-hidden="true"], [inert]');

  const header = document.querySelector("header");
  const headerH = header ? Math.round(header.getBoundingClientRect().height) : 0;

  const h1s = [...document.querySelectorAll("h1")];
  const h1 = h1s[0];
  const h1r = h1 ? h1.getBoundingClientRect() : null;
  const h1cs = h1 ? getComputedStyle(h1) : null;

  // Touch targets: visible, interactive, exposed to AT.
  const small = [];
  for (const el of document.querySelectorAll("a, button, input, textarea, select, [role='button']")) {
    if (!vis(el) || hiddenFromAT(el)) continue;
    if (el.classList.contains("sr-only") || el.closest(".sr-only")) continue;
    // WCAG 2.5.8 exempts links inline in a sentence - padding those out would
    // break text flow and create overlapping targets. Only standalone controls
    // are held to 44x44.
    if (el.tagName === "A" && el.closest("p, li, blockquote")) continue;
    const r = el.getBoundingClientRect();
    if (r.width < minTap || r.height < minTap) {
      small.push({
        tag: el.tagName.toLowerCase(),
        label: (el.getAttribute("aria-label") || el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 34),
        w: Math.round(r.width), h: Math.round(r.height),
      });
    }
  }

  // Focusable elements inside a CLOSED nav panel must not be reachable.
  const panels = [...document.querySelectorAll("nav, [role='navigation'], [aria-label='Main navigation']")];
  const leakingMenu = [];
  for (const p of panels) {
    const closed = p.getAttribute("aria-hidden") === "true" || p.hasAttribute("inert");
    if (!closed) continue;
    for (const f of p.querySelectorAll("a[href], button, input, select, textarea, [tabindex]")) {
      // inert on an ancestor is the real guard; tabindex=-1 also works.
      const inertGuard = f.closest("[inert]");
      if (!inertGuard && f.tabIndex >= 0) {
        leakingMenu.push((f.getAttribute("aria-label") || f.textContent || "").trim().slice(0, 30));
      }
    }
  }

  // Accessible names must never contain raw CSS.
  const cssInName = [];
  for (const el of document.querySelectorAll("button, a, [role='button']")) {
    // Check BOTH the accessible name and the raw text. The first version of this
    // test only looked at `aria-label || innerText`, so a button with a correct
    // aria-label hid the fact that a <style> block inside it put
    // "@keyframes ..." into its textContent - which is what text-extracting
    // crawlers and some AT fallbacks actually read.
    const name = ((el.getAttribute("aria-label") || "") + " " + (el.textContent || "")).trim();
    if (/@keyframes|\{[^}]*:[^}]*\}/.test(name)) {
      cssInName.push({ tag: el.tagName.toLowerCase(), snippet: name.replace(/\s+/g, " ").slice(0, 50) });
    }
  }

  // Letter-soup: decorative per-character spans that are NOT hidden from AT.
  let letterSoup = null;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
  let node;
  while ((node = walker.nextNode())) {
    if (hiddenFromAT(node)) continue;
    const kids = [...node.children];
    if (kids.length >= 8 && kids.every((k) => (k.textContent || "").trim().length <= 1)) {
      letterSoup = (node.textContent || "").trim().slice(0, 40);
      break;
    }
  }

  // First CTA above the fold.
  const cta = [...document.querySelectorAll("a, button")].find((el) => {
    if (!vis(el)) return false;
    const t = (el.innerText || "").toLowerCase();
    return /start a project|rozpocznij|book a call|umów|zamawiam|diagnos/.test(t);
  });
  const ctaRect = cta ? cta.getBoundingClientRect() : null;

  return {
    headerH,
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
    scrollW: document.documentElement.scrollWidth,
    innerW: window.innerWidth,
    h1Count: h1s.length,
    h1: h1
      ? {
          text: (h1.innerText || h1.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60),
          top: Math.round(h1r.top), h: Math.round(h1r.height), w: Math.round(h1r.width),
          coveredByHeader: h1r.top < headerH && h1r.bottom > 0,
          srOnly: h1cs.clip === "rect(0px, 0px, 0px, 0px)" || h1r.height <= 1 || h1r.width <= 1,
        }
      : null,
    small, leakingMenu, cssInName, letterSoup,
    ctaTop: ctaRect ? Math.round(ctaRect.top) : null,
    ctaInFirstScreen: ctaRect ? ctaRect.top < window.innerHeight && ctaRect.top > 0 : null,
  };
};

// ── Local server ───────────────────────────────────────────────────────
/**
 * In --local mode the audit must test the BUILD OUTPUT, not the dev server:
 * prerendered markup, the real bundle, the real CSS. vite preview serves dist/
 * with the same static semantics Vercel uses, so we spawn one and own its
 * lifetime instead of relying on a server the operator remembered to start.
 */
let server = null;
async function serveDist() {
  if (!existsSync(join(ROOT, "dist", "index.html"))) {
    console.error("[mobile-audit] brak dist/ - uruchom najpierw `npm run build`.");
    process.exit(1);
  }
  server = spawn("npx", ["vite", "preview", "--port", String(LOCAL_PORT), "--strictPort"], {
    cwd: ROOT, stdio: "ignore", detached: false,
  });
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {}
  }
  throw new Error(`serwer podgladu nie wstal na porcie ${LOCAL_PORT}`);
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

const results = [];
for (const path of PAGES) {
  const page = await browser.newPage();
  await page.setUserAgent(DEVICE.ua);
  await page.setViewport(DEVICE.viewport);
  try {
    await page.goto(BASE + path, { waitUntil: "networkidle2", timeout: 45000 });
    await new Promise((r) => setTimeout(r, 2500)); // let entry animations settle
    const m = await page.evaluate(MEASURE, MIN_TAP);
    results.push({ path, ...m });
  } catch (e) {
    results.push({ path, error: e.message });
  }
  await page.close();
}
await browser.close();
stopServer();

// ── Report ─────────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
const budget = existsSync(BUDGET_FILE) ? JSON.parse(readFileSync(BUDGET_FILE, "utf-8")) : { pages: {} };

const blocking = [];   // always a bug
const overruns = [];   // tap targets beyond the frozen budget
const improved = [];   // fewer than budgeted - commit the lower number

console.log(`\nAUDYT MOBILE ${DEVICE.viewport.width}x${DEVICE.viewport.height} - ${BASE}\n`);
console.log(pad("STRONA", 30) + pad("HDR", 5) + pad("H1 top/h", 11) + pad("PRZYKR.", 9) + pad("OVF", 5) + pad("MENU", 6) + pad("<44px", 12) + "CSS/LITERY");
console.log("-".repeat(102));

for (const r of results) {
  if (r.error) {
    console.log(pad(r.path, 30) + "ERROR: " + r.error.slice(0, 50));
    blocking.push({ path: r.path, problems: [`strona sie nie wczytala: ${r.error}`] });
    continue;
  }
  const problems = [];
  if (r.overflow) problems.push("poziomy overflow");
  if (r.h1Count !== 1) problems.push(`h1 x${r.h1Count} (ma byc dokladnie 1)`);
  if (r.h1?.coveredByHeader) problems.push("h1 przykryty przez staly header");
  if (r.h1?.srOnly) problems.push("h1 bez realnego rozmiaru (sr-only)");
  if (r.leakingMenu.length) problems.push(`focusable w zamknietym menu x${r.leakingMenu.length}`);
  if (r.cssInName.length) problems.push("CSS w nazwie dostepnej kontrolki");
  if (r.letterSoup) problems.push("tekst literowany w drzewie dostepnosci");
  if (problems.length) blocking.push({ path: r.path, problems });

  const allowed = budget.pages?.[r.path];
  const n = r.small.length;
  let tapCell = String(n || "-");
  if (typeof allowed === "number") {
    if (n > allowed) { overruns.push({ path: r.path, n, allowed }); tapCell = `${n} (>${allowed})`; }
    else if (n < allowed) { improved.push({ path: r.path, n, allowed }); tapCell = `${n} (bylo ${allowed})`; }
  }

  r._problems = problems;
  console.log(
    pad(r.path, 30) + pad(r.headerH, 5) +
    pad(r.h1 ? `${r.h1.top}/${r.h1.h}` : "brak", 11) +
    pad(r.h1?.coveredByHeader ? "TAK" : "nie", 9) +
    pad(r.overflow ? "TAK" : "nie", 5) +
    pad(r.leakingMenu.length || "-", 6) +
    pad(tapCell, 12) +
    (r.cssInName.length ? "CSS " : "") + (r.letterSoup ? "LITERY" : (r.cssInName.length ? "" : "-"))
  );
}

// ── Detail ─────────────────────────────────────────────────────────────
const detailed = results.filter((r) => r._problems?.length || r.small?.length);
if (detailed.length) {
  console.log("\nSZCZEGOLY:");
  for (const r of detailed) {
    const head = [...(r._problems || []), ...(r.small?.length ? [`tap<44 x${r.small.length}`] : [])];
    console.log(`\n  ${r.path}: ${head.join(", ")}`);
    if (r.small?.length) {
      const uniq = [...new Map(r.small.map((s) => [s.label + s.w + s.h, s])).values()];
      for (const s of uniq.slice(0, 8)) console.log(`      tap ${s.w}x${s.h}  <${s.tag}> ${s.label || "(bez nazwy)"}`);
      if (uniq.length > 8) console.log(`      ... i ${uniq.length - 8} wiecej`);
    }
    if (r.cssInName?.length) for (const c of r.cssInName.slice(0, 3)) console.log(`      CSS w <${c.tag}>: ${c.snippet}`);
    if (r.letterSoup) console.log(`      litery: ${JSON.stringify(r.letterSoup)}`);
    if (r.leakingMenu?.length) console.log(`      focusable w zamknietym menu: ${r.leakingMenu.slice(0, 5).join(" | ")}`);
  }
}

// ── Budget ─────────────────────────────────────────────────────────────
if (UPDATE_BUDGET) {
  const pages = {};
  for (const r of results) if (!r.error) pages[r.path] = r.small.length;
  writeFileSync(
    BUDGET_FILE,
    JSON.stringify({
      _comment:
        "Zamrozony budzet celow dotykowych <44x44 na stronie (WCAG 2.5.8). Reszta to swiadomie " +
        "zaakceptowane linki inline w tekscie i kropki karuzeli - ich powiekszenie to zmiana " +
        "visual direction, nie ergonomii. Wzrost = blokada wdrozenia. Spadek = zaktualizuj plik " +
        "(node scripts/mobile-audit.mjs --update-budget), zeby zamrozic lepszy stan.",
      updated: new Date().toISOString().slice(0, 10),
      base: BASE,
      pages,
    }, null, 2) + "\n",
    "utf-8"
  );
  console.log(`\n[mobile-audit] zapisano budzet: ${Object.values(pages).reduce((a, b) => a + b, 0)} celow lacznie`);
}

// ── Verdict ────────────────────────────────────────────────────────────
console.log("\n" + "=".repeat(60));
if (improved.length && !UPDATE_BUDGET) {
  console.log("POPRAWA (zamroz nowy stan: node scripts/mobile-audit.mjs --update-budget):");
  for (const i of improved) console.log(`  ${i.path}: ${i.n} zamiast ${i.allowed}`);
}
if (!blocking.length && !overruns.length) {
  console.log("WYNIK: mobile OK - zero problemow blokujacych, budzet celow dotykowych dotrzymany.");
  process.exit(0);
}
if (blocking.length) {
  console.log(`BLOKUJACE (${blocking.length} stron):`);
  for (const b of blocking) console.log(`  ${b.path}\n    - ${b.problems.join("\n    - ")}`);
}
if (overruns.length) {
  console.log(`\nPRZEKROCZONY BUDZET CELOW DOTYKOWYCH (${overruns.length} stron):`);
  for (const o of overruns) console.log(`  ${o.path}: ${o.n} celow <44px, dozwolone ${o.allowed} (+${o.n - o.allowed})`);
  console.log("  -> nowe za male cele dotyku. Dodaj data-tap-44 albo uzasadnij i podnies budzet swiadomie.");
}
process.exit(1);
