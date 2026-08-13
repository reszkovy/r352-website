#!/usr/bin/env node
/**
 * audit-crawl.mjs - post-fix verification crawl over the built `dist/`.
 * ---------------------------------------------------------------------
 * Static, browser-free audit of every prerendered route. Checks the columns the
 * SEO/publishing audit asked for and asserts the acceptance criteria:
 *
 *   canonical === own URL   ·   exactly one <h1>   ·   no draft markers
 *   ·   no duplicate canonical/og:url   ·   referenced local images exist
 *
 * Run: node scripts/audit-crawl.mjs          (after `npm run build`)
 * Exit code 1 if any hard criterion fails, so it can gate a deploy.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SITE = "https://www.r352.com";

if (!existsSync(DIST)) {
  console.error("dist/ not found - run `npm run build` first.");
  process.exit(1);
}

/** Recursively collect every prerendered index.html. */
async function collect(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets") continue;
      await collect(p, acc);
    } else if (entry.name === "index.html") {
      acc.push(p);
    }
  }
  return acc;
}

const pick = (html, re) => (html.match(re)?.[1] ?? "").trim();
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1].trim());

const files = (await collect(DIST)).sort();
const rows = [];
const failures = [];
const skipped = [];
const warned = [];

for (const file of files) {
  const rel = relative(DIST, file);
  const route = rel === "index.html" ? "/" : "/" + dirname(rel);
  const url = route === "/" ? SITE : SITE + route;
  const html = await readFile(file, "utf-8");

  // Standalone static pages shipped in public/ (client prototypes, one-off
  // landings) are not React routes - they have no helmet meta by design and
  // are not part of the site's information architecture. Skip them.
  if (!/id="root"/.test(html)) {
    skipped.push(route);
    continue;
  }

  const canonicals = all(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"[^>]*>/g);
  const ogUrls = all(html, /<meta[^>]*property="og:url"[^>]*content="([^"]*)"[^>]*>/g);
  const title = pick(html, /<title>([\s\S]*?)<\/title>/i);
  const description = pick(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/i);
  const robots = pick(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/i);
  const lang = pick(html, /<html[^>]*lang="([^"]*)"/i);
  const h1Count = (html.match(/<h1[\s>]/g) || []).length;

  // Draft / placeholder markers that must never reach production copy.
  // Check VISIBLE TEXT only - matching raw HTML produced false positives on
  // Tailwind's `placeholder:` utility class and on input placeholder="" attrs.
  const visibleText = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]+>/g, " ");
  const draftHit = /\[DRAFT|NEEDS LEGAL REVIEW|Lorem ipsum|\bTODO\b/i.test(visibleText);

  // Local images referenced by the page must exist on disk.
  const imgs = all(html, /<img[^>]*src="([^"]+)"/g).filter((s) => s.startsWith("/"));
  const brokenImgs = [];
  for (const src of imgs) {
    const clean = decodeURIComponent(src.split("?")[0]);
    if (!existsSync(join(DIST, clean.replace(/^\//, "")))) brokenImgs.push(clean);
  }

  // hreflang: zbierz pary, zeby po petli sprawdzic ich wzajemnosc.
  const alternates = {};
  for (const m of html.matchAll(/<link[^>]*rel="alternate"[^>]*>/gi)) {
    const tag = m[0];
    const hl = /hreflang="([^"]+)"/i.exec(tag)?.[1];
    const href = /href="([^"]+)"/i.exec(tag)?.[1];
    if (hl && href) alternates[hl] = href;
  }

  const canonical = canonicals[0] ?? "";
  const ogUrl = ogUrls[0] ?? "";
  const norm = (u) => u.replace(/\/$/, "");

  const isNoindex = robots.includes("noindex");
  // A route that inject-meta produced but prerender never snapshotted is a bare
  // SPA shell: its headings exist only after hydration, so "0 h1" here says
  // nothing about the rendered page.
  const isShell = !/<h[1-6][\s>]/.test(html);

  const problems = [];   // block the deploy
  const warnings = [];   // report only
  if (canonicals.length !== 1) problems.push(`canonical x${canonicals.length}`);
  if (norm(canonical) !== norm(url)) problems.push(`canonical!=url (${canonical || "brak"})`);
  if (ogUrls.length > 1) problems.push(`og:url x${ogUrls.length}`);
  if (ogUrl && norm(ogUrl) !== norm(canonical)) problems.push("og:url!=canonical");
  if (!lang) problems.push("brak html lang");
  if (brokenImgs.length) problems.push(`obrazy: ${brokenImgs.join(", ")}`);
  if (description.length > 160) problems.push(`desc ${description.length}zn`);

  if (h1Count !== 1) {
    (isShell ? warnings : problems).push(
      isShell ? "h1: shell (nieprerenderowany, h1 po hydracji)" : `h1 x${h1Count}`
    );
  }
  if (draftHit) {
    // The legal pages keep their draft banner on purpose until the owner flips
    // LEGAL_APPROVED - and they are noindex while that is true.
    (isNoindex ? warnings : problems).push(
      isNoindex ? "DRAFT banner (swiadomie, strona noindex)" : "DRAFT marker"
    );
  }
  if (title.length > 60) warnings.push(`title ${title.length}zn (miekkie)`);

  // Jezyk dokumentu musi zgadzac sie z warstwa adresowa - polska strona pod
  // angielskim <html lang> to dokladnie ten blad, ktory ta warstwa naprawia.
  const expectLang = route === "/pl" || route.startsWith("/pl/") ? "pl" : "en";
  if (lang && lang !== expectLang) problems.push(`html lang="${lang}", oczekiwano "${expectLang}"`);

  rows.push({ route, status: 200, title, description, canonical, ogUrl, robots, h1Count, lang, alternates, brokenImgs: brokenImgs.length, problems, warnings });
  if (problems.length) failures.push({ route, problems });
  if (warnings.length) warned.push({ route, warnings });
}

// ── Report ────────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`\nAUDYT: ${rows.length} tras z dist/\n`);
console.log(
  pad("TRASA", 34) + pad("ST", 4) + pad("CANONICAL OK", 14) + pad("OG=CAN", 8) +
  pad("H1", 4) + pad("LANG", 6) + pad("IMG", 5) + "ROBOTS"
);
console.log("-".repeat(118));
for (const r of rows) {
  const canonOk = r.canonical.replace(/\/$/, "") === (r.route === "/" ? SITE : SITE + r.route).replace(/\/$/, "") ? "OK" : "BLAD";
  const ogOk = r.ogUrl.replace(/\/$/, "") === r.canonical.replace(/\/$/, "") ? "OK" : "BLAD";
  console.log(
    pad(r.route, 34) + pad(r.status, 4) + pad(canonOk, 14) + pad(ogOk, 8) +
    pad(r.h1Count, 4) + pad(r.lang, 6) + pad(r.brokenImgs, 5) +
    (r.robots.includes("noindex") ? "noindex, follow" : "index, follow")
  );
}

// ── Wzajemnosc hreflang ────────────────────────────────────────────────
// Adnotacja jezykowa dziala tylko wtedy, gdy WSKAZUJE W OBIE STRONY. Jesli
// /pl/uslugi deklaruje /services jako wersje angielska, a /services nie
// deklaruje /pl/uslugi z powrotem, Google odrzuca cala pare - i zostajemy z
// dwiema stronami konkurujacymi ze soba zamiast jednej pary jezykowej.
// Dlatego to jest kryterium BLOKUJACE, nie ostrzezenie.
const byUrl = new Map(rows.map((r) => [r.canonical.replace(/\/$/, ""), r]));
for (const r of rows) {
  for (const [hl, href] of Object.entries(r.alternates || {})) {
    if (hl === "x-default") continue;
    const targetUrl = href.replace(/\/$/, "");
    if (targetUrl === r.canonical.replace(/\/$/, "")) continue; // wskazuje na siebie - ok
    const target = byUrl.get(targetUrl);
    if (!target) {
      const f = failures.find((x) => x.route === r.route) || (failures.push({ route: r.route, problems: [] }), failures.at(-1));
      f.problems.push(`hreflang="${hl}" wskazuje na ${href}, ktorego nie ma w buildzie`);
      continue;
    }
    const backLinks = Object.values(target.alternates || {}).map((u) => u.replace(/\/$/, ""));
    if (!backLinks.includes(r.canonical.replace(/\/$/, ""))) {
      const f = failures.find((x) => x.route === r.route) || (failures.push({ route: r.route, problems: [] }), failures.at(-1));
      f.problems.push(`hreflang niewzajemny: ${target.route} nie wskazuje z powrotem na ${r.route}`);
    }
  }
}
const plRows = rows.filter((r) => r.route === "/pl" || r.route.startsWith("/pl/"));
console.log(`\nwarstwa PL: ${plRows.length} tras, pary hreflang zweryfikowane obustronnie`);

const noindexed = rows.filter((r) => r.robots.includes("noindex")).map((r) => r.route);
console.log(`\npominiete (statyczne strony spoza SPA): ${skipped.join(", ") || "brak"}`);
console.log(`\nnoindex (${noindexed.length}): ${noindexed.join(", ") || "brak"}`);

if (warned.length) {
  console.log(`\nOSTRZEZENIA (nie blokuja wdrozenia): ${warned.length}`);
  for (const w of warned) console.log(`  ${w.route}: ${w.warnings.join("; ")}`);
}

console.log("\n" + "=".repeat(60));
if (failures.length === 0) {
  console.log("WYNIK: wszystkie KRYTERIA BLOKUJACE spelnione.");
  process.exit(0);
}
console.log(`WYNIK: ${failures.length} tras z problemami:\n`);
for (const f of failures) console.log(`  ${f.route}\n    - ${f.problems.join("\n    - ")}`);
process.exit(1);
