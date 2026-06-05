#!/usr/bin/env node
/**
 * Asset budget guard for r352.com
 * -------------------------------
 * Walks dist/ after `npm run build` and asserts size budgets for images,
 * JS chunks (gzipped), CSS files (gzipped) and the total dist/ footprint.
 *
 * Exit code 0 = all within budget.
 * Exit code 1 = at least one hard violation (or fatal error).
 *
 * No external dependencies — uses only the Node standard library so it can
 * run in CI without an extra install step.
 */

import { readdir, stat, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// ----------------------------------------------------------------------------
// Config
// ----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '..');
const DIST_DIR = join(PROJECT_ROOT, 'dist');

const KB = 1024;
const MB = 1024 * 1024;

const BUDGETS = {
  imageMaxBytes: 500 * KB,        // any single .png/.jpg/.jpeg/.webp
  jsGzipMaxBytes: 300 * KB,       // any single .js chunk, gzipped
  cssGzipMaxBytes: 50 * KB,       // any single .css file, gzipped
  totalDistMaxBytes: 50 * MB,     // total dist/ size
};

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);

/**
 * Whitelist — relative paths inside dist/ that are knowingly allowed to
 * exceed their budget. Use sparingly; prefer fixing the asset.
 * Example: 'assets/hero-poster.webp'
 */
const WHITELIST = new Set([
  // Hero-tier panoramic backgrounds and editorial cover images.
  // These exceed the 500KB budget knowingly — they are critical hero
  // assets where additional compression would visibly degrade quality.
  // Revisit when WebP/AVIF tooling can hit equivalent visual fidelity smaller.
  // Filenames use Vite's content-hash suffix — match by stem prefix.
  // Pattern: any 'bkg1' panoramic, any per-project hero, any journal cover.
]);

// Pattern-based whitelist for content-hashed Vite outputs.
// Use these prefixes when a file has a Vite hash like `bkg1 2-CjwMLXYF.webp`.
const WHITELIST_PREFIXES = [
  'assets/bkg1',                              // Archicom panoramic (hero context)
  'assets/journal-6-cover',                   // Journal article 6 cover (editorial)
  'assets/cc83c611649a28a788fdbc804faca8660ef993e6', // Brand asset (Sonova era)
];

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

const RED = (s) => `\x1b[31m${s}\x1b[0m`;
const GREEN = (s) => `\x1b[32m${s}\x1b[0m`;
const YELLOW = (s) => `\x1b[33m${s}\x1b[0m`;
const CYAN = (s) => `\x1b[36m${s}\x1b[0m`;
const BOLD = (s) => `\x1b[1m${s}\x1b[0m`;
const DIM = (s) => `\x1b[2m${s}\x1b[0m`;

function fmtBytes(n) {
  if (n >= MB) return `${(n / MB).toFixed(2)} MB`;
  if (n >= KB) return `${(n / KB).toFixed(1)} KB`;
  return `${n} B`;
}

function getExt(path) {
  const dot = path.lastIndexOf('.');
  if (dot === -1) return '';
  return path.slice(dot).toLowerCase();
}

function toPosix(p) {
  return p.split(sep).join('/');
}

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile()) {
      yield full;
    }
  }
}

async function gzipSize(absPath) {
  const buf = await readFile(absPath);
  return gzipSync(buf, { level: 9 }).length;
}

function suggest(kind, relPath) {
  switch (kind) {
    case 'image':
      return 'Compress further or convert to WebP/AVIF; consider responsive <picture> with smaller variants.';
    case 'js':
      return 'Split with dynamic import(), lazy-load route/component, or move heavy deps to a separate chunk.';
    case 'css':
      return 'Purge unused selectors (Tailwind content config) or split critical vs. non-critical CSS.';
    case 'total':
      return 'Audit largest assets (videos, scroll frames) — lazy-load or move to CDN/external host.';
    default:
      return '';
  }
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(
      RED('[asset-budget] dist/ not found at ' + DIST_DIR)
    );
    console.error(
      YELLOW('[asset-budget] Run `npm run build` first, then re-run this script.')
    );
    process.exit(1);
  }

  const violations = [];
  let totalBytes = 0;
  let totalFiles = 0;

  for await (const absPath of walk(DIST_DIR)) {
    const rel = toPosix(relative(DIST_DIR, absPath));
    const ext = getExt(rel);

    let size;
    try {
      const st = await stat(absPath);
      size = st.size;
    } catch {
      continue;
    }

    totalBytes += size;
    totalFiles += 1;

    const whitelisted = WHITELIST.has(rel) ||
      WHITELIST_PREFIXES.some((prefix) => rel.startsWith(prefix));

    // Image budget (raw size)
    if (IMAGE_EXT.has(ext)) {
      if (size > BUDGETS.imageMaxBytes && !whitelisted) {
        violations.push({
          kind: 'image',
          rel,
          actual: size,
          actualLabel: fmtBytes(size),
          budget: BUDGETS.imageMaxBytes,
          budgetLabel: fmtBytes(BUDGETS.imageMaxBytes),
          suggestion: suggest('image', rel),
        });
      }
    }

    // JS chunk budget (gzipped)
    if (ext === '.js') {
      const gz = await gzipSize(absPath);
      if (gz > BUDGETS.jsGzipMaxBytes && !whitelisted) {
        violations.push({
          kind: 'js',
          rel,
          actual: gz,
          actualLabel: `${fmtBytes(gz)} gz (raw ${fmtBytes(size)})`,
          budget: BUDGETS.jsGzipMaxBytes,
          budgetLabel: `${fmtBytes(BUDGETS.jsGzipMaxBytes)} gz`,
          suggestion: suggest('js', rel),
        });
      }
    }

    // CSS budget (gzipped)
    if (ext === '.css') {
      const gz = await gzipSize(absPath);
      if (gz > BUDGETS.cssGzipMaxBytes && !whitelisted) {
        violations.push({
          kind: 'css',
          rel,
          actual: gz,
          actualLabel: `${fmtBytes(gz)} gz (raw ${fmtBytes(size)})`,
          budget: BUDGETS.cssGzipMaxBytes,
          budgetLabel: `${fmtBytes(BUDGETS.cssGzipMaxBytes)} gz`,
          suggestion: suggest('css', rel),
        });
      }
    }
  }

  // Total dist/ budget
  if (totalBytes > BUDGETS.totalDistMaxBytes) {
    violations.push({
      kind: 'total',
      rel: 'dist/ (total)',
      actual: totalBytes,
      actualLabel: fmtBytes(totalBytes),
      budget: BUDGETS.totalDistMaxBytes,
      budgetLabel: fmtBytes(BUDGETS.totalDistMaxBytes),
      suggestion: suggest('total', 'dist'),
    });
  }

  // ----------------------------------------------------------------------
  // Report
  // ----------------------------------------------------------------------

  console.log('');
  console.log(BOLD(CYAN('Asset budget check — r352.com')));
  console.log(DIM('-'.repeat(60)));
  console.log(`Scanned ${totalFiles} files in dist/`);
  console.log(`Total size: ${fmtBytes(totalBytes)} (budget ${fmtBytes(BUDGETS.totalDistMaxBytes)})`);
  console.log('');

  if (violations.length === 0) {
    console.log(GREEN(`PASS — all ${totalFiles} files within budget.`));
    console.log('');
    process.exit(0);
  }

  console.log(RED(BOLD(`FAIL — ${violations.length} budget violation${violations.length === 1 ? '' : 's'}:`)));
  console.log('');

  for (const v of violations) {
    console.log(RED(`  - [${v.kind}] ${v.rel}`));
    console.log(`      actual:    ${v.actualLabel}`);
    console.log(`      budget:    ${v.budgetLabel}`);
    console.log(`      suggested: ${v.suggestion}`);
    console.log('');
  }

  console.log(
    DIM('Tip: add a known-acceptable path to the WHITELIST in scripts/check-asset-budget.mjs to silence a specific file.')
  );
  console.log('');
  process.exit(1);
}

main().catch((err) => {
  console.error(RED('[asset-budget] Unexpected error:'));
  console.error(err);
  process.exit(1);
});
