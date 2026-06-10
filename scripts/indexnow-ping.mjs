#!/usr/bin/env node
/**
 * indexnow-ping.mjs
 * ---------------------------------------------------------------------------
 * IndexNow batch ping for r352.com (Bing, Yandex, Seznam, Naver — shared API).
 *
 * What it does:
 *   POSTs the full prerendered route list (35 URLs, mirrors ROUTES in
 *   scripts/prerender.mjs) to https://api.indexnow.org/indexnow so search
 *   engines re-crawl changed pages within minutes instead of days.
 *
 * Key verification:
 *   The key file MUST be live on production BEFORE the first ping:
 *     https://www.r352.com/<KEY>.txt   (content = the key itself)
 *   The file lives in public/ and ships with every Vercel deploy.
 *
 * Usage (run AFTER the deploy that includes public/<KEY>.txt is live):
 *   node scripts/indexnow-ping.mjs            # ping all 35 routes
 *   node scripts/indexnow-ping.mjs --dry-run  # print payload, no request
 *
 * Expected responses:
 *   200 OK            — URLs accepted
 *   202 Accepted      — accepted, key validation pending (fine on first ping)
 *   403 Forbidden     — key file not found on host → deploy public/<KEY>.txt first
 *   422 Unprocessable — URLs don't belong to host / key mismatch
 *   429 Too Many      — back off, retry later (don't ping more than ~once per deploy)
 *
 * Idempotent and safe to re-run, but only ping when content actually changed —
 * IndexNow spec asks senders not to resubmit unchanged URLs.
 */

import https from "node:https";

// ─── Config ─────────────────────────────────────────────────────────────────
const HOST = "www.r352.com";
const KEY = "72360c43ee8112f5d4e808045d2490daba50757876b58d0ed0d97df0710e3dca";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Routes to submit — mirrors ROUTES in scripts/prerender.mjs (35 routes).
 * Keep the two lists in sync when adding pages.
 */
const ROUTES = [
  "/",
  "/services",
  "/process",
  "/glossary",
  "/work",
  "/journal",
  "/contact",
  "/brief",
  "/philosophy",
  "/deliverables",
  "/faq",
  "/privacy",
  "/cookies",
  "/industries",
  "/industries/fitness-wellness",
  "/industries/real-estate",
  "/industries/retail-franchise",
  "/industries/health-service-networks",
  // Journal articles (published ids only; 9 is unpublished, excluded)
  "/journal/1",
  "/journal/4",
  "/journal/5",
  "/journal/6",
  "/journal/7",
  "/journal/8",
  "/journal/10",
  // Work case studies
  "/work/archicom",
  "/work/benefit-systems",
  "/work/caterelo",
  "/work/dawid-podsiadlo",
  "/work/discobowl",
  "/work/fifa",
  "/work/kubota",
  "/work/regional-fit",
  "/work/sonova",
  "/work/uniqa",
];

// ─── Payload ────────────────────────────────────────────────────────────────
const payload = JSON.stringify(
  {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: ROUTES.map((r) => `https://${HOST}${r}`),
  },
  null,
  2,
);

// ─── Main ───────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes("--dry-run");

if (DRY_RUN) {
  console.log("→ DRY RUN — payload that would be POSTed to", ENDPOINT);
  console.log(payload);
  console.log(`\n${ROUTES.length} URLs. No request sent.`);
  process.exit(0);
}

console.log(`→ IndexNow ping: ${ROUTES.length} URLs for ${HOST}…`);

const req = https.request(
  ENDPOINT,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(payload),
    },
  },
  (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      const ok = res.statusCode === 200 || res.statusCode === 202;
      console.log(`${ok ? "✓" : "✗"} HTTP ${res.statusCode} ${res.statusMessage}`);
      if (body.trim()) console.log(body.trim());
      if (res.statusCode === 403) {
        console.error(
          `  Key file not found on host. Deploy public/${KEY}.txt to production first,\n` +
            `  then verify ${KEY_LOCATION} returns the key.`,
        );
      }
      process.exitCode = ok ? 0 : 1;
    });
  },
);

req.on("error", (err) => {
  console.error("✗ Request failed:", err.message);
  process.exitCode = 1;
});

req.write(payload);
req.end();
