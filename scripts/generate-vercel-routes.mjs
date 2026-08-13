#!/usr/bin/env node
/**
 * generate-vercel-routes.mjs - turns the route registry into vercel.json rewrites.
 * -------------------------------------------------------------------------------
 * THE FIX for site-wide soft 404s.
 *
 * Before: one catch-all rewrite `/((?!api/|.*\.).*)` -> /index.html meant EVERY
 * unknown URL (/journal/999, /work/nieistniejacy-case, /pl/cokolwiek) was answered
 * with HTTP 200, the homepage <title> and a canonical pointing at "/". Google sees
 * that as a soft 404 - and as an infinite supply of duplicate-of-homepage URLs.
 * Patching individual paths (as was done for /journal/9) does not fix the class.
 *
 * After: rewrites are an ALLOWLIST generated from scripts/route-registry.mjs - the
 * same registry the sitemap and the prerender use. A URL that is not a known route
 * matches nothing, so Vercel falls through to dist/404.html and returns HTTP 404.
 *
 * Order on Vercel: redirects -> filesystem -> rewrites. Static files shipped in
 * public/ (client prototypes: /instytut, /brand, ...) are served by the filesystem
 * step and are therefore unaffected by this allowlist.
 *
 * Run before deploying (it is part of `npm run build`): vercel.json is read from
 * the uploaded source, so it must be current on disk at deploy time.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { knownRoutes, redirects as registryRedirects } from "./route-registry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONFIG = join(ROOT, "vercel.json");
const log = (m) => console.log(`[routes] ${m}`);

const config = JSON.parse(await readFile(CONFIG, "utf-8"));

// Every known route resolves to the SPA shell. Prerendered routes are served
// from the filesystem before this step ever runs; this covers the rest.
const rewrites = knownRoutes.map((route) => ({
  source: route,
  destination: "/index.html",
}));

const previous = config.rewrites?.length ?? 0;
config.rewrites = rewrites;

// Redirects come from the registry too - permanent (308), so signals consolidate
// on the canonical URL instead of being treated as a temporary detour.
config.redirects = registryRedirects.map((r) => ({ ...r, permanent: true }));

await writeFile(CONFIG, JSON.stringify(config, null, 2) + "\n", "utf-8");

log(`✓ ${rewrites.length} tras na allowliscie (bylo regul: ${previous})`);
log(`  nieznana trasa -> brak dopasowania -> dist/404.html ze statusem 404`);
if (config.redirects?.length) {
  log(`  redirecty zachowane (${config.redirects.length}): ${config.redirects.map((r) => r.source).join(", ")}`);
}
