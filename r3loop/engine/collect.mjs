#!/usr/bin/env node
/**
 * r3loop evidence collector
 * Parses dist/ (prerendered HTML + SEO files) into an evidence pack
 * consumed by the 50-prompt evaluation (see r3loop/spec/prompts.json).
 *
 * Usage: node r3loop/engine/collect.mjs [--dist dist] [--out r3loop/evidence]
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const argVal = (flag, dflt) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : dflt;
};
const DIST = join(ROOT, argVal('--dist', 'dist'));
const OUT_DIR = join(ROOT, argVal('--out', 'r3loop/evidence'));

// ---------- helpers ----------
const stripTags = (s) => s.replace(/<[^>]+>/g, ' ');
const decodeEntities = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));

/** Normalize text that may be letter-split by animation spans ("D e s i g n"). */
function normalizeText(raw) {
  let t = decodeEntities(stripTags(raw)).replace(/\s+/g, ' ').trim();
  const tokens = t.split(' ');
  if (tokens.length > 6) {
    const singles = tokens.filter((x) => x.length === 1).length;
    if (singles / tokens.length > 0.55) {
      // letter-split animation artifact: rejoin singles, keep multi-char tokens spaced
      t = tokens
        .map((x, i) => (x.length === 1 && tokens[i + 1]?.length === 1 ? x : x + ' '))
        .join('')
        .replace(/\s+/g, ' ')
        .trim();
    }
  }
  return t;
}

const matchAll = (re, s) => [...s.matchAll(re)].map((m) => m[1]);

function parsePage(html) {
  const get = (re) => (html.match(re) || [])[1] || null;
  const jsonLd = matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, html)
    .map((b) => {
      try { return JSON.parse(b); } catch { return { _parse_error: true, raw: b.slice(0, 200) }; }
    });
  const headings = (tag) =>
    matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'g'), html).map(normalizeText).filter(Boolean);
  const links = matchAll(/href="(\/[^"#?]*)"/g, html);
  const ctas = matchAll(/<(?:a|button)[^>]*>([\s\S]*?)<\/(?:a|button)>/g, html)
    .map(normalizeText)
    .filter((t) => t && t.length < 60);
  const text = normalizeText(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' '));
  return {
    title: get(/<title>([\s\S]*?)<\/title>/) && normalizeText(get(/<title>([\s\S]*?)<\/title>/)),
    meta_description: get(/<meta name="description" content="([^"]*)"/),
    canonical: get(/<link rel="canonical" href="([^"]*)"/),
    og_title: get(/<meta property="og:title" content="([^"]*)"/),
    og_image: !!get(/<meta property="og:image" content="([^"]*)"/),
    h1: headings('h1'),
    h2: headings('h2'),
    h3: headings('h3').slice(0, 20),
    json_ld_types: jsonLd.map((j) => j['@type'] || (Array.isArray(j['@graph']) ? j['@graph'].map((g) => g['@type']) : 'unknown')).flat(),
    json_ld_count: jsonLd.length,
    forms: (html.match(/<form/g) || []).length,
    internal_links: [...new Set(links)].sort(),
    cta_texts: [...new Set(ctas)].slice(0, 40),
    word_count: text.split(' ').length,
    has_pricing_signals: /€|\bEUR\b|\bPLN\b|pricing|price/i.test(text),
    has_testimonials: /testimonial|"[^"]{40,}"\s*[-–—]\s*[A-Z]/.test(html) || /cite|blockquote/.test(html),
    mentions_r3loop: /r3loop/i.test(text),
    mentions_anti_time: /time[- ]for[- ]money|hourly|anti[- ]time|fixed[- ](?:fee|price|scope)/i.test(text),
    text_sample: text.slice(0, 1500),
  };
}

// ---------- walk dist ----------
if (!existsSync(DIST)) {
  console.error(`dist not found at ${DIST} — run the build first.`);
  process.exit(1);
}
const pages = {};
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (['assets', 'fonts', 'sounds', 'videos', 'og', 'scroll-frames', 'scroll-frames-light'].includes(name)) continue;
      walk(p);
    } else if (name === 'index.html') {
      const route = '/' + relative(DIST, dir).replace(/\\/g, '/').replace(/^\.$/, '');
      pages[route === '/.' || route === '/' ? '/' : route] = parsePage(readFileSync(p, 'utf-8'));
    }
  }
}
walk(DIST);

const readIf = (f) => (existsSync(join(DIST, f)) ? readFileSync(join(DIST, f), 'utf-8') : null);
const sitemap = readIf('sitemap.xml');
const evidence = {
  generated_at: new Date().toISOString(),
  source: relative(ROOT, DIST),
  site: {
    robots_txt: !!readIf('robots.txt'),
    llms_txt: !!readIf('llms.txt'),
    llms_txt_excerpt: (readIf('llms.txt') || '').slice(0, 800) || null,
    sitemap_urls: sitemap ? (sitemap.match(/<loc>/g) || []).length : 0,
    manifest: !!readIf('manifest.webmanifest'),
    routes: Object.keys(pages).sort(),
    route_count: Object.keys(pages).length,
  },
  pages,
};

mkdirSync(OUT_DIR, { recursive: true });
const outFile = join(OUT_DIR, `evidence-${new Date().toISOString().slice(0, 10)}.json`);
writeFileSync(outFile, JSON.stringify(evidence, null, 2));
console.log(`Evidence pack: ${relative(ROOT, outFile)}`);
console.log(`Routes: ${evidence.site.route_count} | sitemap URLs: ${evidence.site.sitemap_urls} | llms.txt: ${evidence.site.llms_txt}`);
