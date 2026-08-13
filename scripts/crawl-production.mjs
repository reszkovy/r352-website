#!/usr/bin/env node
/**
 * crawl-production.mjs - HTTP-level contract test against the live site.
 * -----------------------------------------------------------------------
 * Asserts the routing contract on real HTTP status codes, not on what React
 * renders. That distinction is the whole point: the site used to answer every
 * unknown URL with HTTP 200 and a React-rendered "not found" screen - which reads
 * as a soft 404 to Google no matter how correct the visible page looks.
 *
 * Contract:
 *   known routes (route-registry.mjs)  -> 200
 *   configured redirects (vercel.json) -> 3xx to the declared destination
 *   anything else                      -> 404
 *
 * Usage: node scripts/crawl-production.mjs [https://www.r352.com]
 * Exit 1 on any violation, so it can gate a release.
 */
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { knownRoutes } from "./route-registry.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = (process.argv[2] || "https://www.r352.com").replace(/\/$/, "");

/** Unknown URLs across every route family - these MUST 404. */
const UNKNOWN = [
  "/nieistniejaca-strona",
  "/zzz-random-" + "abc123",
  "/journal/999",
  "/journal/9",              // published: false
  "/journal/10",             // published: false
  "/journal/2",              // legacy redirect removed - no evidence of signals
  "/work/nieistniejacy-case",
  "/work/zzz-not-a-project",
  "/services/nieistniejaca-usluga",
  "/industries/nieistniejaca-branza",
  "/pl/nieistniejaca-strona",
  "/pl/",
];

const config = JSON.parse(await readFile(join(ROOT, "vercel.json"), "utf-8"));
const redirects = config.redirects || [];

const head = async (path) => {
  const res = await fetch(BASE + path, { redirect: "manual" });
  return { status: res.status, location: res.headers.get("location") };
};

const rows = [];
let failures = 0;

const check = async (path, expect, note = "") => {
  try {
    const { status, location } = await head(path);
    const ok = typeof expect === "function" ? expect(status, location) : status === expect;
    if (!ok) failures++;
    rows.push({ path, status, location, ok, note });
  } catch (e) {
    failures++;
    rows.push({ path, status: "ERR", location: e.message, ok: false, note });
  }
};

console.log(`\nCRAWL PRODUKCJI: ${BASE}\n`);

// 1. Known routes must resolve.
for (const r of knownRoutes) await check(r, 200, "znana trasa");

// 2. Declared redirects must redirect where they say.
for (const r of redirects) {
  await check(r.source, (s, loc) => s >= 300 && s < 400 && (loc || "").endsWith(r.destination), `redirect -> ${r.destination}`);
}

// 3. Everything else must be a hard 404.
for (const u of UNKNOWN) await check(u, 404, "nieznana trasa");

// ── Report ─────────────────────────────────────────────────────────────
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
const bad = rows.filter((r) => !r.ok);

const group = (note) => rows.filter((r) => r.note.startsWith(note));
const summarise = (label, list) => {
  const okCount = list.filter((r) => r.ok).length;
  console.log(`${pad(label, 24)} ${okCount}/${list.length} OK`);
};
summarise("Znane trasy (200)", group("znana"));
summarise("Redirecty (3xx)", group("redirect"));
summarise("Nieznane (404)", group("nieznana"));

if (bad.length) {
  console.log(`\nNARUSZENIA (${bad.length}):`);
  console.log(pad("URL", 42) + pad("STATUS", 8) + "OCZEKIWANO / UWAGA");
  console.log("-".repeat(90));
  for (const r of bad) {
    console.log(pad(r.path, 42) + pad(r.status, 8) + r.note + (r.location ? ` -> ${r.location}` : ""));
  }
}

console.log("\n" + "=".repeat(60));
if (failures === 0) {
  console.log(`WYNIK: kontrakt routingu spelniony (${rows.length} sprawdzen).`);
  process.exit(0);
}
console.log(`WYNIK: ${failures} naruszen na ${rows.length} sprawdzen.`);
process.exit(1);
