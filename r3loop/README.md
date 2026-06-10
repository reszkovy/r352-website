# r3loop Engine — automated product scoring (0–10 000)

Executable layer of the r3loop spec v2. Scores a product against 50 diagnostic prompts in 10 categories, snapshots results, tracks deltas, and drives the improve-loop toward the 9 000+ target (top 1-2% solo).

## Structure

```
r3loop/
├── spec/prompts.json        # all 50 prompts (extracted from r3loop-spec-v2.md PART 2)
├── engine/collect.mjs       # evidence collector: dist/ → evidence pack JSON
├── engine/score.mjs         # scoring + snapshot + delta + prioritized fixes
├── evidence/                # evidence packs (input to evaluation)
├── evaluations/             # pass/partial/fail judgments per prompt (LLM- or human-made)
├── snapshots/               # scored snapshots; latest.json = current state
└── dashboard.html           # live dashboard (reads snapshots/latest.json)
```

## The loop

```
1. BUILD     npm run build                                  (fresh dist/)
2. COLLECT   node r3loop/engine/collect.mjs                 (evidence pack)
3. EVALUATE  AI agent applies all 50 prompts to evidence    (evaluations/<name>.json)
             template: node r3loop/engine/score.mjs --init
4. SCORE     node r3loop/engine/score.mjs --eval r3loop/evaluations/<name>.json --label "v2"
5. FIX       work top of prioritized_fixes (sorted by recoverable points)
6. REPEAT    until site_score ≥ 9000
```

## Dashboard

```
cd r3loop && python3 -m http.server 8352
→ http://localhost:8352/dashboard.html
```

## Scoring model

- `pass_status ∈ {0, 0.5, 1}` per prompt
- `category_score = round(10000 × Σ(score_impact × status) / category_max)`
- `site_score = avg of 10 category scores` → 0–10 000
- **Normalization note:** raw score_impact sums per category are 2 300–6 800, not 10 000 as spec v2 claims (spec bug found 2026-06-09). Normalization keeps the 0–10 000 scale honest. Fix impacts in spec v3 or keep normalizing.

## Baseline (2026-06-09)

Site score **4 132** — below median. Weakest: Productization Readiness (875), Proof Density (2 273), Distribution Muscle (2 442), Visual Craft (2 826). Top recoverable: [4.1] two-proof minimum +4 091, [9.1] waitlist live +3 750, [10.1] content cadence +3 488.

Evaluation rule: **be strict** — when in doubt, score lower. Inflated baselines make deltas meaningless.
