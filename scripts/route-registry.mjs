#!/usr/bin/env node
/**
 * route-registry.mjs - THE single source of truth for "which URLs exist".
 * -----------------------------------------------------------------------
 * Consumed by generate-sitemap.mjs (what to advertise), generate-vercel-routes.mjs
 * (what to serve) and the production crawl (what to assert). One registry means
 * a new case study / article automatically becomes routable, sitemapped and
 * testable - and anything NOT here is a 404 by construction, instead of being
 * silently absorbed by a catch-all SPA rewrite.
 *
 * The router in src/app/App.tsx is authoritative for the shape of the URL space;
 * the data files are authoritative for the parameter values.
 *
 * SAFETY: every parser asserts a sane minimum. If a source file is refactored and
 * a parser silently returns nothing, we would emit a short allowlist and 404 real
 * pages in production - so a failed parse throws and stops the build instead.
 */
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFile(join(ROOT, p), "utf-8");

const must = (arr, min, what) => {
  if (!Array.isArray(arr) || arr.length < min) {
    throw new Error(
      `[route-registry] parser dla "${what}" zwrocil ${arr?.length ?? 0} pozycji (min ${min}). ` +
      `Zrodlo zmienilo strukture - przerywam, zeby nie wygenerowac niepelnej listy tras.`
    );
  }
  return arr;
};

/** Split a source file into per-entry blocks so flags belong to the right entry. */
function blocks(src, idRe) {
  const marks = [...src.matchAll(new RegExp(idRe, "g"))];
  return marks.map((m, i) => ({
    id: m[1],
    block: src.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : src.length),
  }));
}

// ── Router shape ───────────────────────────────────────────────────────
const appSrc = await read("src/app/App.tsx");
const routePaths = must(
  [...appSrc.matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]),
  20,
  "App.tsx <Route path>"
);
const staticRoutes = routePaths.filter((r) => !r.includes(":"));
const paramRoutes = routePaths.filter((r) => r.includes(":"));

// ── Parameter values ───────────────────────────────────────────────────
const projectsSrc = await read("src/app/data/projects.tsx");
const projects = must(
  blocks(projectsSrc, `id:\\s*"([a-z0-9-]+)"`).map(({ id, block }) => ({
    id,
    isNDA: /isNDA:\s*true/.test(block),
    isShadow: /isShadow:\s*true/.test(block),
  })),
  8,
  "projects.tsx id"
);

const journalSrc = await read("src/app/data/journalArticles.ts");
const articles = must(
  blocks(journalSrc, `id:\\s*(\\d+)`).map(({ id, block }) => ({
    id,
    published: !/published:\s*false/.test(block),
  })),
  5,
  "journalArticles.ts id"
);

const industrySlugs = must(
  [...(await read("src/app/data/industries.ts")).matchAll(/slug:\s*"([a-z-]+)"/g)].map((m) => m[1]),
  3,
  "industries.ts slug"
);

// servicesData keys in ServiceDetail.tsx (object literal keyed by slug)
const serviceSrc = await read("src/app/pages/ServiceDetail.tsx");
const serviceSlugs = must(
  [...new Set([...serviceSrc.matchAll(/^\s{4}"([a-z-]+)":\s*\{/gm)].map((m) => m[1]))],
  2,
  "ServiceDetail.tsx servicesData keys"
);

// ── Expansion ──────────────────────────────────────────────────────────
const expand = (pattern) => {
  if (pattern === "/work/:id") return projects.map((p) => `/work/${p.id}`);
  // Unpublished articles render a not-found state - they must NOT be routable,
  // otherwise they stay soft 404s.
  if (pattern === "/journal/:id") return articles.filter((a) => a.published).map((a) => `/journal/${a.id}`);
  if (pattern === "/industries/:slug") return industrySlugs.map((s) => `/industries/${s}`);
  if (pattern === "/services/:slug") return serviceSlugs.map((s) => `/services/${s}`);
  throw new Error(`[route-registry] brak reguly rozwiniecia dla "${pattern}" - dopisz ja tutaj.`);
};

const dynamicRoutes = paramRoutes.flatMap(expand);

// ── Polish URL layer ───────────────────────────────────────────────────
// Parsed from the app's own source so the allowlist, the sitemap, the prerender
// and the crawl can never disagree with what the router actually serves.
const plSrc = await read("src/app/config/plRoutes.ts");
export const plPairs = must(
  [...plSrc.matchAll(/\{\s*pl:\s*"([^"]+)",\s*en:\s*"([^"]+)"\s*\}/g)].map((m) => ({
    pl: m[1],
    en: m[2],
  })),
  8,
  "plRoutes.ts PL_ROUTES"
);
const plRoutes = plPairs.map((r) => r.pl);

/**
 * Permanent redirects, kept HERE rather than hand-edited in vercel.json so the
 * routing config has a single owner. An alias is a URL people (and search
 * engines) reasonably guess; it must 308 to the canonical route instead of 404.
 * Aliases are deliberately NOT part of `knownRoutes` and never enter the sitemap -
 * only the canonical target is indexable.
 */
export const redirects = [
  { source: "/framework", destination: "/process" },
  // "fitness" is the natural short slug for the fitness-wellness industry page;
  // it used to 404, which is a false signal for a URL a person would type.
  { source: "/industries/fitness", destination: "/industries/fitness-wellness" },
];

/** Every URL the application legitimately answers. Anything else is a 404. */
export const knownRoutes = [...new Set([...staticRoutes, ...dynamicRoutes, ...plRoutes])].sort();

export const registry = {
  plPairs,
  plRoutes,
  staticRoutes,
  paramRoutes,
  dynamicRoutes,
  projects,
  articles,
  industrySlugs,
  serviceSlugs,
};

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`[route-registry] ${knownRoutes.length} znanych tras`);
  console.log(`  statyczne: ${staticRoutes.length}, dynamiczne: ${dynamicRoutes.length}`);
  console.log(`  projekty: ${projects.length}, artykuly opublikowane: ${articles.filter((a) => a.published).length}/${articles.length}`);
  console.log(`  branze: ${industrySlugs.length}, uslugi: ${serviceSlugs.length}`);
  console.log(`  trasy PL: ${plRoutes.length} (${plRoutes.join(", ")})`);
}
