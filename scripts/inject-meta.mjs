#!/usr/bin/env node
/**
 * inject-meta.mjs — browserless per-route SEO meta injection.
 * --------------------------------------------------------------
 * Runs AFTER `vite build`, BEFORE the puppeteer prerender. For every static
 * route in route-meta.mjs it clones the freshly-built dist/index.html shell,
 * swaps in the route's <title> / description / canonical / OG / Twitter tags,
 * and writes dist/{route}/index.html.
 *
 * WHY: the puppeteer prerender (prerender.mjs) gracefully skips on Vercel when
 * Chromium isn't available, so it produces no per-route HTML there — and the
 * SPA catch-all rewrite in vercel.json then serves the home shell (home
 * <title>) for every route. This step needs no browser, so it ALWAYS runs and
 * guarantees route-correct meta in the raw HTML. When Chromium *is* available,
 * the prerender that runs next simply upgrades these files with full DOM
 * content (and its own helmet meta) — this step is the reliable floor.
 *
 * Vercel serves a real dist/{route}/index.html in preference to the rewrite,
 * so once these files exist the home-shell fallback stops masking them.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTE_META, SITE, DEFAULT_OG } from "./route-meta.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const SHELL = join(DIST, "index.html");

const log = (m) => console.log(`[inject-meta] ${m}`);

if (!existsSync(SHELL)) {
  console.error(`[inject-meta] ✗ dist/index.html not found — run \`vite build\` first.`);
  process.exit(1);
}

// HTML-escape for attribute/text content (descriptions contain &, titles |, — etc.)
const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shell = await readFile(SHELL, "utf-8");

// Replace the content="" of a <meta> matched by a key attribute (idempotent,
// only touches the first matching tag). Returns html unchanged if not present.
function setMetaContent(html, matchAttr, value) {
  const re = new RegExp(`(<meta[^>]*${matchAttr}[^>]*content=")[^"]*(")`, "i");
  return html.replace(re, (_m, a, b) => a + esc(value) + b);
}

let count = 0;
for (const [route, meta] of Object.entries(ROUTE_META)) {
  const url = route === "/" ? SITE : SITE + route;
  const ogImage = meta.ogImage || DEFAULT_OG;

  let html = shell;

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)}</title>`);

  // Standard description + Open Graph + Twitter
  html = setMetaContent(html, 'name="description"', meta.description);
  html = setMetaContent(html, 'property="og:title"', meta.title);
  html = setMetaContent(html, 'property="og:description"', meta.description);
  html = setMetaContent(html, 'property="og:url"', url);
  html = setMetaContent(html, 'property="og:image"', ogImage);
  html = setMetaContent(html, 'name="twitter:title"', meta.title);
  html = setMetaContent(html, 'name="twitter:description"', meta.description);
  html = setMetaContent(html, 'name="twitter:image"', ogImage);

  // Canonical — the shell ships none (react-helmet adds one client-side at the
  // same URL, so a static one here is a harmless identical duplicate for JS
  // crawlers and the only canonical non-JS crawlers ever see). Insert once.
  if (!/rel="canonical"/i.test(html)) {
    html = html.replace(
      /<\/head>/i,
      `  <link rel="canonical" href="${esc(url)}" />\n  </head>`
    );
  }

  const outDir = route === "/" ? DIST : join(DIST, route.replace(/^\//, ""));
  if (route !== "/") await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "index.html"), html, "utf-8");
  count++;
}

log(`✓ Injected route meta into ${count} static routes.`);
