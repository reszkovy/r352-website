#!/usr/bin/env node

/**
 * Post-deploy smoke test for r352.com.
 *
 * Verifies that the live deploy actually matches expectations from the
 * publishing-layer audit:
 *  - Canonical URL points to www, not apex
 *  - hreflang declares only EN until /pl ships
 *  - Critical assets return proper Content-Type (not text/html from SPA fallback)
 *  - Missing assets return 404 (not text/html with status 200)
 *  - Sitemap is reachable and well-formed
 *  - robots.txt is reachable
 *  - llms.txt is reachable
 *
 * Usage:
 *   node scripts/post-deploy-check.mjs
 *   node scripts/post-deploy-check.mjs --base https://staging.r352.com
 *
 * Exits 0 on full pass, 1 on any failure. Designed to be wired into a
 * GitHub Action that runs after Vercel deploy completes.
 */

import { argv, exit } from "node:process";

// ─── Config ─────────────────────────────────────────────────────────
const argBase = argv.find((a) => a.startsWith("--base="));
const BASE = argBase ? argBase.split("=")[1] : "https://www.r352.com";

const EXPECTED_CANONICAL = "https://www.r352.com";

// Assets that MUST return their proper Content-Type, not text/html.
const ASSET_CHECKS = [
  { path: "/og-image.png",         expectedType: /^image\/png/ },
  { path: "/favicon.svg",          expectedType: /^image\/svg\+xml/ },
  { path: "/favicon.ico",          expectedType: /^image\/(x-icon|vnd\.microsoft\.icon)/ },
  { path: "/favicon-32x32.png",    expectedType: /^image\/png/ },
  { path: "/favicon-192x192.png",  expectedType: /^image\/png/ },
  { path: "/apple-touch-icon.png", expectedType: /^image\/png/ },
  { path: "/manifest.webmanifest", expectedType: /^(application\/manifest\+json|application\/json|text\/plain)/ },
];

// File extensions that should 404, not return HTML, when missing.
const MISSING_FILE_PATH = `/missing-${Date.now()}-test.png`;

// Documents that must exist and parse.
const DOC_CHECKS = [
  { path: "/sitemap.xml", contains: "<urlset" },
  { path: "/robots.txt",  contains: "User-agent" },
  { path: "/llms.txt",    contains: "# r352" },
];

// ─── Test harness ───────────────────────────────────────────────────
let pass = 0;
let fail = 0;
const failures = [];

function ok(label) {
  pass++;
  console.log(`  [32m✓[0m ${label}`);
}

function bad(label, detail) {
  fail++;
  failures.push({ label, detail });
  console.log(`  [31m✗[0m ${label}`);
  if (detail) console.log(`    [2m${detail}[0m`);
}

async function fetchHead(url) {
  // Use GET — some CDNs handle HEAD oddly and return wrong content-type.
  const res = await fetch(url, { redirect: "manual" });
  return res;
}

// ─── Tests ──────────────────────────────────────────────────────────
async function testCanonical() {
  console.log("\n[1mCanonical + hreflang[0m");
  try {
    const res = await fetch(BASE);
    const html = await res.text();

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    if (!canonicalMatch) {
      bad("canonical link found in HTML", "no <link rel=canonical> in response");
    } else if (canonicalMatch[1] === EXPECTED_CANONICAL) {
      ok(`canonical = ${EXPECTED_CANONICAL}`);
    } else {
      bad(`canonical = ${EXPECTED_CANONICAL}`, `got: ${canonicalMatch[1]}`);
    }

    const hreflangPl = /hreflang=["']pl["']/i.test(html);
    if (hreflangPl) {
      bad("no hreflang=\"pl\" (until /pl ships)", "found hreflang=pl in HTML");
    } else {
      ok("no hreflang=\"pl\" present");
    }
  } catch (err) {
    bad("canonical check fetch", err.message);
  }
}

async function testAssets() {
  console.log("\n[1mAsset MIME types[0m");
  for (const { path, expectedType } of ASSET_CHECKS) {
    try {
      const res = await fetchHead(`${BASE}${path}`);
      const ct = res.headers.get("content-type") || "";

      if (res.status !== 200) {
        bad(`${path} returns 200`, `got status ${res.status}`);
        continue;
      }
      if (expectedType.test(ct)) {
        ok(`${path} → ${ct.split(";")[0]}`);
      } else {
        bad(`${path} → ${expectedType}`, `got: ${ct}`);
      }
    } catch (err) {
      bad(`${path} fetch`, err.message);
    }
  }
}

async function testMissingFile404() {
  console.log("\n[1mMissing files return 404 (SPA rewrite fix)[0m");
  try {
    const res = await fetchHead(`${BASE}${MISSING_FILE_PATH}`);
    if (res.status === 404) {
      ok(`${MISSING_FILE_PATH} → 404`);
    } else {
      const ct = res.headers.get("content-type") || "";
      bad(`${MISSING_FILE_PATH} → 404`, `got status ${res.status}, content-type: ${ct}`);
    }
  } catch (err) {
    bad("missing-file fetch", err.message);
  }
}

async function testDocs() {
  console.log("\n[1mDocuments reachable + well-formed[0m");
  for (const { path, contains } of DOC_CHECKS) {
    try {
      const res = await fetch(`${BASE}${path}`);
      if (res.status !== 200) {
        bad(`${path} → 200`, `got status ${res.status}`);
        continue;
      }
      const body = await res.text();
      if (body.includes(contains)) {
        ok(`${path} contains "${contains}"`);
      } else {
        bad(`${path} contains "${contains}"`, `body starts: ${body.slice(0, 80)}...`);
      }
    } catch (err) {
      bad(`${path} fetch`, err.message);
    }
  }
}

async function testApexRedirect() {
  console.log("\n[1mApex redirects to www[0m");
  try {
    const res = await fetch("https://r352.com", { redirect: "manual" });
    const loc = res.headers.get("location") || "";
    if (res.status >= 300 && res.status < 400 && loc.startsWith("https://www.r352.com")) {
      ok(`r352.com → ${res.status} → ${loc}`);
    } else {
      bad("r352.com redirects to www.r352.com", `status ${res.status}, location: ${loc}`);
    }
  } catch (err) {
    bad("apex redirect fetch", err.message);
  }
}

// ─── Run ────────────────────────────────────────────────────────────
console.log(`\n[1m[36mr352 post-deploy smoke test[0m`);
console.log(`[2mBase: ${BASE}[0m`);

await testCanonical();
await testAssets();
await testMissingFile404();
await testDocs();
await testApexRedirect();

console.log(`\n[1mResult:[0m ${pass} pass · ${fail} fail`);

if (fail > 0) {
  console.log(`\n[31m[1mFAILURES:[0m`);
  failures.forEach((f) => {
    console.log(`  - ${f.label}${f.detail ? ` (${f.detail})` : ""}`);
  });
  exit(1);
}

console.log(`[32m[1mAll checks passed.[0m\n`);
exit(0);
