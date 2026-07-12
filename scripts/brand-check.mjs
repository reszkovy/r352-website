#!/usr/bin/env node
/**
 * brand:check - drift guard for .brand/design-system.md.
 *
 * Verifies that what the brand guide cites still exists in the codebase:
 *   1. every `path/file.ext:line` style citation points at an existing file
 *      (and the line number is within the file),
 *   2. every hex color mentioned in the guide appears somewhere in src/,
 *      public/ or index.html (case-insensitive),
 *   3. the guide and tokens.json contain no long dashes (U+2014/U+2013),
 *   4. tokens.json parses and its hex values appear in the codebase.
 *
 * Exit 0 = no drift. Exit 1 = findings listed (guide needs an update pass).
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GUIDE = join(ROOT, ".brand/design-system.md");
const TOKENS = join(ROOT, ".brand/tokens.json");

const guide = readFileSync(GUIDE, "utf8");
const findings = [];

// ---------- gather searchable code corpus ----------
const corpusFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (["node_modules", "dist", "dist-img", ".git", "brand"].includes(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(tsx?|css|html|svg|json|webmanifest|mjs|js)$/.test(name) && st.size < 2_000_000)
      corpusFiles.push(p);
  }
};
walk(join(ROOT, "src"));
walk(join(ROOT, "public"));
corpusFiles.push(join(ROOT, "index.html"));
const corpus = corpusFiles.map((p) => readFileSync(p, "utf8").toLowerCase()).join("\n");

// ---------- 1. file:line citations ----------
const KNOWN_DIRS = ["src", "public", "scripts"];
const cited = new Set();
for (const m of guide.matchAll(/([A-Za-z0-9_./-]+\.(?:tsx|ts|css|svg|html|mjs|webmanifest|json))(?::(\d+))?/g)) {
  let [, file, line] = m;
  file = file.replace(/^[/.]+/, "");
  if (file.includes("design-system") || file.includes("brand-centre") || file.includes("tokens.json")) continue;
  cited.add(`${file}${line ? ":" + line : ""}`);
}
const resolveFile = (file) => {
  const candidates = [join(ROOT, file)];
  for (const d of KNOWN_DIRS) candidates.push(join(ROOT, d, file));
  // suffix match first (respects directory prefixes like services/Engagement...)
  const suffixHit = corpusFiles.find((p) => p.endsWith("/" + file));
  if (suffixHit) candidates.push(suffixHit);
  // bare filenames like AgencyHeader.tsx - basename fallback only when no dir given
  if (!file.includes("/")) {
    const hit = corpusFiles.find((p) => p.endsWith("/" + file));
    if (hit) candidates.push(hit);
  }
  return candidates.find(existsSync);
};
for (const c of cited) {
  const [file, line] = c.split(":");
  const resolved = resolveFile(file);
  if (!resolved) {
    findings.push(`MISSING FILE  ${c} - cited in guide, not found in repo`);
    continue;
  }
  if (line) {
    const lineCount = readFileSync(resolved, "utf8").split("\n").length;
    if (Number(line) > lineCount)
      findings.push(`STALE LINE    ${c} - ${file} has only ${lineCount} lines`);
  }
}

// ---------- 2. hex colors ----------
// Documented exceptions - colors the guide discusses that intentionally do NOT
// exist in code: #d97657 = derived from shader vec3(0.851,0.463,0.341);
// #c8f13a = mascot visor, baked into the 3D render, never a token;
// #d9764f = wrong hex from old briefs, cited BECAUSE it matches nothing.
const HEX_ALLOWLIST = new Set(["#d97657", "#c8f13a", "#d9764f"]);
const hexes = new Set([...guide.matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)].map((m) => m[0].toLowerCase()));
for (const hex of hexes) {
  if (HEX_ALLOWLIST.has(hex)) continue;
  if (!corpus.includes(hex)) findings.push(`ORPHAN HEX    ${hex} - in guide, not found in code`);
}

// ---------- 3. long dashes ----------
for (const [label, text] of [["design-system.md", guide], ["tokens.json", readFileSync(TOKENS, "utf8")]]) {
  const lines = text.split("\n");
  lines.forEach((l, i) => {
    if (/[–—]/.test(l)) findings.push(`LONG DASH     ${label}:${i + 1} - "${l.trim().slice(0, 60)}"`);
  });
}

// ---------- 4. tokens.json hexes ----------
let tokens;
try {
  tokens = JSON.parse(readFileSync(TOKENS, "utf8"));
  const tokenHexes = JSON.stringify(tokens).match(/#[0-9a-fA-F]{6}/g) ?? [];
  for (const hex of new Set(tokenHexes.map((h) => h.toLowerCase()))) {
    if (HEX_ALLOWLIST.has(hex)) continue;
    if (!corpus.includes(hex)) findings.push(`ORPHAN TOKEN  ${hex} - in tokens.json, not found in code`);
  }
} catch (e) {
  findings.push(`TOKENS PARSE  ${e.message}`);
}

// ---------- report ----------
if (findings.length) {
  console.error(`brand:check - ${findings.length} finding(s):\n`);
  for (const f of findings) console.error("  " + f);
  console.error("\nFix the guide (or tokens.json) - the code wins.");
  process.exit(1);
}
console.log(`brand:check - clean. ${cited.size} citations, ${hexes.size} hexes verified against ${corpusFiles.length} files.`);
