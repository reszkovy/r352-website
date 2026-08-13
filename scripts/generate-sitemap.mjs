#!/usr/bin/env node
/**
 * generate-sitemap.mjs - sitemap built from ONE route registry.
 * --------------------------------------------------------------
 * public/sitemap.xml used to be hand-maintained and had drifted in three
 * directions at once:
 *   - it advertised URLs that are `noindex` (/privacy, /cookies, NDA cases),
 *     which is a contradictory signal and shows up in GSC as
 *     "Submitted URL marked 'noindex'";
 *   - it advertised /journal/9, which is `published: false` and renders
 *     "Article Not Found" while still returning 200 - a self-reported soft 404;
 *   - `lastmod` was frozen in the past regardless of what actually shipped.
 *
 * Rule applied here: a sitemap lists CANONICAL pages we want indexed. Returning
 * 200 is not sufficient reason to be listed. Everything excluded below is
 * excluded on purpose, and the reason is printed at the end of the run.
 *
 * lastmod comes from git (last commit touching the source that defines the
 * page), never from "now" - so it stays truthful if a build is re-run.
 *
 * Runs after `vite build` (which copies public/ into dist/) so it overwrites
 * the copied file with the generated one.
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTE_META, SITE } from "./route-meta.mjs";
import { registry } from "./route-registry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const log = (m) => console.log(`[sitemap] ${m}`);

/** Last commit date (YYYY-MM-DD) touching a file; falls back to today. */
const hasGitHistory = (() => {
  try {
    execSync("git log -1 --format=%cs", { cwd: ROOT, encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] });
    return true;
  } catch {
    return false;
  }
})();

/**
 * Last commit date (YYYY-MM-DD) touching a file, or null when git history is
 * unavailable. NEVER falls back to "today": Vercel builds from a shallow clone,
 * and the first version of this script silently stamped every URL with the build
 * date - telling Google that all 34 pages changed today, every single deploy.
 * A missing lastmod is a legitimate "unknown"; a fabricated one is a lie that
 * trains the crawler to ignore the field.
 */
const gitDate = (relPath) => {
  if (!hasGitHistory) return null;
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relPath}"`, {
      cwd: ROOT,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || null;
  } catch {
    return null;
  }
};

// ── Read the data sources without importing TS ────────────────────────
const projectsSrc = await readFile(join(ROOT, "src/app/data/projects.tsx"), "utf-8");
const journalSrc = await readFile(join(ROOT, "src/app/data/journalArticles.ts"), "utf-8");

/** Split a source file into per-entry blocks keyed by id. */
function parseEntries(src, idPattern) {
  const entries = [];
  const re = new RegExp(idPattern, "g");
  const marks = [...src.matchAll(re)];
  marks.forEach((m, i) => {
    const start = m.index;
    const end = i + 1 < marks.length ? marks[i + 1].index : src.length;
    entries.push({ id: m[1], block: src.slice(start, end) });
  });
  return entries;
}

const excluded = [];

// Case studies and articles come from the SHARED registry (route-registry.mjs),
// the same one that drives the Vercel rewrite allowlist - so a page can never be
// routable-but-unsitemapped or sitemapped-but-unroutable.
const caseRoutes = [];
for (const p of registry.projects) {
  if (p.isNDA) { excluded.push(`/work/${p.id} - NDA (noindex)`); continue; }
  if (p.isShadow) { excluded.push(`/work/${p.id} - shadow (unlisted)`); continue; }
  caseRoutes.push(`/work/${p.id}`);
}

// Unpublished articles are not routable at all (they 404), so they are never listed.
const journalRoutes = [];
for (const a of registry.articles) {
  if (!a.published) { excluded.push(`/journal/${a.id} - published: false (404)`); continue; }
  journalRoutes.push(`/journal/${a.id}`);
}

// Static routes from route-meta, minus anything flagged noindex there, minus
// the legal pages while their copy is an unreviewed draft.
const legalApproved = /export const LEGAL_APPROVED = true/.test(
  await readFile(join(ROOT, "src/app/config/legal.ts"), "utf-8")
);
const staticRoutes = [];
for (const [route, meta] of Object.entries(ROUTE_META)) {
  if (meta.noindex) { excluded.push(`${route} - noindex w route-meta`); continue; }
  if (!legalApproved && (route === "/privacy" || route === "/cookies")) {
    excluded.push(`${route} - draft prawny (noindex)`);
    continue;
  }
  staticRoutes.push(route);
}

// Polska warstwa adresowa. Wchodzi w calosci: kazda z osmiu tras zostala wybrana
// pod konkretna polska intencje zakupowa (patrz src/app/config/plRoutes.ts), wiec
// nie ma tu czego wykluczac. Rozne jezyki tej samej strony to osobne URL-e i
// obie wersje naleza do sitemapy.
const plRoutes = registry.plRoutes;

// Source file that best represents each route's content, for lastmod.
const sourceFor = (route) => {
  // Polish pages render the same components from the shared `pl:` translation
  // tree, so the file that actually dates their content is translations.ts.
  if (route === "/pl" || route.startsWith("/pl/")) return "src/app/i18n/translations.ts";
  if (route.startsWith("/work/")) return "src/app/data/projects.tsx";
  if (route.startsWith("/journal/")) return "src/app/data/journalArticles.ts";
  if (route === "/") return "src/app/pages/Home.tsx";
  const guess = "src/app/pages/" + route.slice(1).split("/").map((s) =>
    s.replace(/(^|-)([a-z])/g, (_, a, b) => b.toUpperCase())
  ).join("/") + ".tsx";
  return existsSync(join(ROOT, guess)) ? guess : "src/app/App.tsx";
};

const priorityFor = (r) =>
  r === "/" || r === "/pl" ? "1.0"
  : ["/services", "/work", "/process", "/contact", "/brief",
     "/pl/uslugi", "/pl/realizacje", "/pl/proces", "/pl/kontakt", "/pl/brief"].includes(r) ? "0.9"
  : r.startsWith("/work/") || r.startsWith("/industries") ? "0.8"
  : r.startsWith("/journal/") ? "0.6" : "0.7";

const routes = [...staticRoutes, ...caseRoutes, ...journalRoutes, ...plRoutes];
const entries = routes.map((r) => ({
  loc: r === "/" ? SITE + "/" : SITE + r,
  lastmod: gitDate(sourceFor(r)),
  priority: priorityFor(r),
}));

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<!-- Generated by scripts/generate-sitemap.mjs - do not edit by hand. -->\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n` +
        (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : "") +
        `    <priority>${e.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;

// Without git history (Vercel's shallow clone) the committed public/sitemap.xml
// already carries real per-file dates from the last local build - keep it rather
// than replacing it with a dateless copy.
if (!hasGitHistory && existsSync(join(ROOT, "public/sitemap.xml"))) {
  log("brak historii git (shallow clone) - zostawiam zakomitowana public/sitemap.xml");
} else {
  for (const target of [join(DIST, "sitemap.xml"), join(ROOT, "public/sitemap.xml")]) {
    if (target.includes("/dist/") && !existsSync(DIST)) continue;
    await writeFile(target, xml, "utf-8");
  }
}

log(`✓ ${entries.length} URL (statyczne ${staticRoutes.length}, case ${caseRoutes.length}, journal ${journalRoutes.length}, PL ${plRoutes.length})`);
log(`✓ pominięte (${excluded.length}):`);
for (const e of excluded) log(`    - ${e}`);
