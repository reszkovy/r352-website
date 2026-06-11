#!/usr/bin/env node
/**
 * r3loop scoring engine
 * category_score = round(10000 * sum(score_impact * pass_status) / category_max)
 * site_score     = round(avg(category_scores))          → 0..10000
 * Benchmarks: 9000+ top 1-2% · 7500+ top decile · 5000 median · 2500 below median
 *
 * NOTE: normalization to /10000 is required because raw per-category sums of
 * score_impact in spec v2 range 2300–6800, not 10000 (spec bug, found 2026-06-09).
 *
 * Usage:
 *   node r3loop/engine/score.mjs --init                       → generate empty evaluation template
 *   node r3loop/engine/score.mjs --eval r3loop/evaluations/X.json [--label "baseline"]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const SPEC = JSON.parse(readFileSync(join(ROOT, 'r3loop/spec/prompts.json'), 'utf-8'));
const SNAP_DIR = join(ROOT, 'r3loop/snapshots');
const EVAL_DIR = join(ROOT, 'r3loop/evaluations');
const CATEGORIES = {
  1: 'Positioning Clarity', 2: 'IP Definability', 3: 'Audience Qualification',
  4: 'Proof Density', 5: 'Conversion Path Design', 6: 'Anti-Time POV',
  7: 'Visual / Brand Craft', 8: 'Technical SEO & GEO',
  9: 'Productization Readiness', 10: 'Distribution Muscle',
};
const VALID_STATUS = [0, 0.5, 1];
const args = process.argv.slice(2);
const argVal = (f, d) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : d; };

// ---------- --init: template ----------
if (args.includes('--init')) {
  mkdirSync(EVAL_DIR, { recursive: true });
  const tpl = {
    _instructions: 'Set status per prompt: 0 = fail, 0.5 = partial, 1 = pass. Add evidence-based notes + concrete fix for anything < 1.',
    evaluated_at: null,
    evaluator: null,
    evidence_file: null,
    evaluations: Object.fromEntries(
      SPEC.prompts.map((p) => [p.id, { status: null, notes: '', fix: '' }])
    ),
  };
  const f = join(EVAL_DIR, 'TEMPLATE.json');
  writeFileSync(f, JSON.stringify(tpl, null, 2));
  console.log(`Template: ${relative(ROOT, f)} (${SPEC.prompts.length} prompts)`);
  process.exit(0);
}

// ---------- score ----------
const evalPath = argVal('--eval');
if (!evalPath) {
  console.error('Usage: score.mjs --init | --eval <evaluations.json> [--label name]');
  process.exit(1);
}
const evalData = JSON.parse(readFileSync(join(ROOT, evalPath), 'utf-8'));
const evals = evalData.evaluations || evalData;

// validate
const missing = SPEC.prompts.filter((p) => !(p.id in evals) || evals[p.id].status === null);
const invalid = SPEC.prompts.filter((p) => evals[p.id] && evals[p.id].status !== null && !VALID_STATUS.includes(evals[p.id].status));
if (invalid.length) { console.error(`Invalid status (must be 0|0.5|1): ${invalid.map((p) => p.id).join(', ')}`); process.exit(1); }
if (missing.length) console.warn(`WARN: ${missing.length} unevaluated prompts treated as fail(0): ${missing.map((p) => p.id).join(', ')}`);

// per-category aggregation
const cats = {};
for (const c of Object.keys(CATEGORIES)) cats[c] = { earned: 0, max: 0, passed: [], partial: [], failed: [] };
for (const p of SPEC.prompts) {
  const c = cats[p.category_primary];
  const status = evals[p.id]?.status ?? 0;
  c.max += p.score_impact;
  c.earned += p.score_impact * status;
  (status === 1 ? c.passed : status === 0.5 ? c.partial : c.failed).push(p.id);
}
const category_scores = {};
for (const [c, v] of Object.entries(cats)) category_scores[c] = Math.round((10000 * v.earned) / v.max);
const site_score = Math.round(Object.values(category_scores).reduce((a, b) => a + b, 0) / 10);
// Core score: site quality WITHOUT category 10 (Distribution) — distribution
// is an off-site execution track, scored separately (decision 2026-06-11).
const site_score_core = Math.round(
  Object.entries(category_scores).filter(([c]) => c !== '10').reduce((a, [, v]) => a + v, 0) / 9
);
const benchmark =
  site_score >= 9000 ? 'top 1-2% solo' :
  site_score >= 7500 ? 'top decile solo' :
  site_score >= 5000 ? 'median solo' : 'below median solo';

// prioritized fixes: weight = normalized points recoverable
const fixes = SPEC.prompts
  .map((p) => {
    const status = evals[p.id]?.status ?? 0;
    const recoverable = Math.round((10000 * p.score_impact * (1 - status)) / cats[p.category_primary].max);
    return {
      id: p.id, title: p.title, category: p.category_primary, step: p.step,
      status, recoverable_points: recoverable,
      fix: evals[p.id]?.fix || '', notes: evals[p.id]?.notes || '',
    };
  })
  .filter((f) => f.status < 1)
  .sort((a, b) => b.recoverable_points - a.recoverable_points);

// delta vs previous snapshot
mkdirSync(SNAP_DIR, { recursive: true });
const prevFiles = readdirSync(SNAP_DIR).filter((f) => f.startsWith('snapshot-') && f.endsWith('.json')).sort();
const prev = prevFiles.length ? JSON.parse(readFileSync(join(SNAP_DIR, prevFiles.at(-1)), 'utf-8')) : null;
const delta = prev
  ? {
      vs: prevFiles.at(-1),
      site_score: site_score - prev.site_score,
      categories: Object.fromEntries(Object.keys(category_scores).map((c) => [c, category_scores[c] - (prev.category_scores?.[c] ?? 0)])),
      newly_passed: SPEC.prompts.filter((p) => (evals[p.id]?.status ?? 0) === 1 && !(prev.prompts_passed || []).includes(p.id)).map((p) => p.id),
    }
  : null;

const ts = new Date().toISOString();
const snapshot = {
  label: argVal('--label', `snapshot-${ts.slice(0, 10)}`),
  created_at: ts,
  spec_version: SPEC.version,
  evidence_file: evalData.evidence_file || null,
  site_score, site_score_core, benchmark, target: 9000,
  gap_to_target: Math.max(0, 9000 - site_score),
  category_scores,
  category_names: CATEGORIES,
  category_detail: Object.fromEntries(Object.entries(cats).map(([c, v]) => [c, {
    earned_raw: v.earned, max_raw: v.max, normalized: category_scores[c],
    passed: v.passed, partial: v.partial, failed: v.failed,
  }])),
  prompts_passed: SPEC.prompts.filter((p) => (evals[p.id]?.status ?? 0) === 1).map((p) => p.id),
  prioritized_fixes: fixes,
  delta_vs_previous: delta,
};
const outFile = join(SNAP_DIR, `snapshot-${ts.replace(/[:T]/g, '-').slice(0, 16)}.json`);
writeFileSync(outFile, JSON.stringify(snapshot, null, 2));
writeFileSync(join(SNAP_DIR, 'latest.json'), JSON.stringify(snapshot, null, 2));
// .js wrapper so dashboard.html works on file:// (double-click, no server needed)
writeFileSync(join(SNAP_DIR, 'latest.js'), `window.R3SNAPSHOT = ${JSON.stringify(snapshot)};`);

// report
console.log(`\nr3loop score — ${snapshot.label}`);
console.log('─'.repeat(52));
for (const [c, name] of Object.entries(CATEGORIES)) {
  const bar = '█'.repeat(Math.round(category_scores[c] / 500)).padEnd(20, '·');
  const d = delta ? ` (${delta.categories[c] >= 0 ? '+' : ''}${delta.categories[c]})` : '';
  console.log(`${String(c).padStart(2)} ${name.padEnd(26)} ${bar} ${String(category_scores[c]).padStart(5)}${d}`);
}
console.log('─'.repeat(52));
console.log(`SITE SCORE: ${site_score} / 10000 → ${benchmark}${delta ? ` (Δ ${delta.site_score >= 0 ? '+' : ''}${delta.site_score})` : ''}`);
console.log(`Gap to 9000: ${snapshot.gap_to_target}`);
console.log(`\nTop 5 fixes by recoverable points:`);
for (const f of fixes.slice(0, 5)) console.log(`  [${f.id}] +${f.recoverable_points} — ${f.title}`);
console.log(`\nSnapshot: ${relative(ROOT, outFile)} (+ latest.json)`);
