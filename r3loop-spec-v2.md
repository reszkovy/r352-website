# r3loop — Machine-Executable Specification v2

Two-layer architecture for AI agent execution:
- **Layer 1**: 8 r3loop steps as loop architecture (entry → process → exit gates)
- **Layer 2**: 50 optimized prompts per category, each agent-executable

This spec is the source of truth for:
- AI Diagnostic Tool (each prompt is an agent prompt)
- Q4 r3loop Playbook (content + structure)
- SaaS r3loop Cloud (orchestration logic)

---

# PART 1 — r3loop Steps (Loop Architecture)

## Step 01 — Diagnose

**Purpose**: Find the real problem before designing anything.

**Entry conditions**:
- User reports operational pain (slow delivery, brand drift, scope creep)
- Stakeholder access granted (interviews scheduled, tool access)
- Time-cost data available or recoverable

**AI agent role**:
- Pattern-match the reported pain against known r3loop failure modes (in Part 2 prompts)
- Generate stakeholder interview templates personalized to industry
- Analyze workflow audit data (intake source, request volume, decision paths)
- Identify candidate bottlenecks with hypothesized impact

**Human role**:
- Conduct stakeholder interviews (AI cannot do this — political reading required)
- Approve scope of audit (organization-wide vs project-focused)
- Sign off on root-cause hypothesis (legitimacy)
- Make decisions about which bottlenecks to address first

**Input contract**:
```
{
  organization: { industry, size, locations, stakeholders[] },
  stated_problem: "<1-sentence pain summary>",
  current_workflow: { intake_sources[], approval_paths[], tools[] },
  time_data: { meeting_hours_per_week, revision_cycles_avg }
}
```

**Output contract**:
```
{
  diagnosis: { root_cause: "...", confidence: 0-1, evidence[] },
  bottlenecks: [
    { name, time_cost_per_week, priority: high|mid|low, fixable_in_step: 02|03|... }
  ],
  recommended_sequence: ["02", "03", "05"],
  prioritized_actions_60d: [...]
}
```

**Decision gate**: *Can I describe the operational problem in one sentence with a concrete time-cost number? If not — stay in Diagnose.*

**KPIs**:
- Time-to-root-cause (target: <5 days)
- % of identified bottlenecks confirmed by stakeholders (target: 80%+)
- Stakeholder consensus on top-3 priority (target: 4/5 agreement)

**Common failure modes**:
1. **Confirmation bias**: AI/consultant picks first plausible hypothesis. Recovery: force 3 alternative hypotheses + evidence test.
2. **Skipping interviews**: Diagnose from artifacts only. Recovery: minimum 5 stakeholder interviews before output.
3. **Solution-loaded diagnosis**: "The problem is they need [solution]." Recovery: separate problem statement from solution recommendation.

**Categories improved by closing this step**: Audience Qualification (cat 3) · Distribution Muscle (cat 10) · indirectly: all others depend on this.

---

## Step 02 — Map

**Purpose**: Understand demand landscape — who requests what, how often, with what urgency.

**Entry conditions**:
- Diagnose output approved
- Access to request/ticket history (3+ months ideally)
- Stakeholder cooperation on intake source disclosure

**AI agent role**:
- Classify request types from raw data (briefs, tickets, emails)
- Detect seasonality patterns (campaign cycles, fiscal quarters)
- Calculate request volume per stakeholder + per category
- Identify request types to accept / reject / defer

**Human role**:
- Validate AI's classification taxonomy (industry knowledge required)
- Make accept/reject/defer political decisions
- Approve mapping output before standardization begins

**Input contract**:
```
{
  request_history: [
    { source, requester, category, urgency, volume_data }
  ],
  stakeholder_inventory: [{ name, role, weekly_request_volume }],
  industry_context: { vertical, scale_signals }
}
```

**Output contract**:
```
{
  demand_map: {
    by_stakeholder: { ... },
    by_category: { ... },
    seasonal_patterns: [...]
  },
  request_taxonomy: [{ type, definition, ownership, sla }],
  filter_decisions: { accept[], reject[], defer[] }
}
```

**Decision gate**: *Can a new request be classified into a category at intake within 30 seconds, by anyone? If less than 95% of requests categorize cleanly — refine taxonomy.*

**KPIs**:
- % requests categorized at intake (target: 95%+)
- Average request volume mapped per stakeholder (must show distribution)
- Seasonality patterns identified (count)

**Failure modes**:
1. **Over-classification**: 50 categories instead of 7-12. Recovery: enforce taxonomy of max 12 categories. Force collapse.
2. **Under-sample**: Mapping from 1 month of data. Recovery: minimum 3 months for seasonal pattern detection.
3. **Stakeholder-undercount**: Missing the "shadow" requesters (sales, leadership). Recovery: explicit stakeholder inventory before request classification.

**Categories improved**: Audience Qualification (cat 3) · Distribution Muscle (cat 10) · indirectly: Productization Readiness (cat 9 — knowing demand tells you what to productize first)

---

## Step 03 — Standardize

**Purpose**: Set rules before production starts — briefs, quality benchmarks, prioritization logic.

**Entry conditions**:
- Map output approved (taxonomy + filter decisions)
- Stakeholder buy-in on standardization (will they comply?)
- Examples of past "good" and "bad" deliverables available

**AI agent role**:
- Generate brief templates per request category (from intake taxonomy)
- Codify "Definition of Ready" checklists
- Build quality review checklists per asset type
- Generate AI prompt library for brief assistance (intake automation)
- Score brief quality 0-100 at submission (gate enforcement)

**Human role**:
- Define quality standards (subjective — taste-based)
- Decide which exceptions are allowed (politics)
- Approve template language (brand voice ownership)
- Train team on usage (adoption)

**Input contract**:
```
{
  request_taxonomy: [from step 02],
  quality_examples: { good[], bad[], in_between[] },
  brand_constraints: { voice, terminology, never_list },
  scoring_dimensions: ["priority", "urgency", "business_value", "production_effort"]
}
```

**Output contract**:
```
{
  brief_templates: [{ category, template, definition_of_ready }],
  quality_checklists: [{ asset_type, checklist_items[] }],
  prioritization_system: { scoring_formula, weight_assignments },
  ai_brief_assistant: { prompt, scoring_logic },
  adoption_plan_90d: [...]
}
```

**Decision gate**: *Can a junior team member fill a brief WITHOUT asking the lead designer questions, using only the template + checklist? If no — refine the template.*

**KPIs**:
- % of briefs meeting Definition of Ready on first submission (target: 80%+)
- Average brief completion time (target: <15 min)
- Quality review pass rate at first delivery (target: 70%+)

**Failure modes**:
1. **Template bloat**: 30-field forms nobody fills. Recovery: enforce 10-field maximum + 5-min completion time test.
2. **Standards without enforcement**: Beautiful guidelines that nobody follows. Recovery: scoring/gating MUST be enforced from day 1.
3. **Subjective "quality"**: "Looks good" criteria. Recovery: every criterion needs binary pass/fail test.

**Categories improved**: Positioning Clarity (cat 1) · IP Definability (cat 2) · Anti-Time POV (cat 6)

---

## Step 04 — Build

**Purpose**: Create what ships — systems, interfaces, assets — against the Step 03 standards.

**Entry conditions**:
- Standardize output approved (templates + checklists in use)
- Brief passed Definition of Ready check (Step 03 gate)
- Production resources allocated (capacity, tools)

**AI agent role**:
- Generate v1 deliverables (drafts, wireframes, copy, component code)
- Apply brand constraints automatically (from Step 03 brand_constraints)
- Suggest variants for A/B testing
- Auto-check against quality checklist (pre-flight QA)

**Human role**:
- Senior execution (refine v1 into final)
- Strategic direction (which variant wins, what to push back on)
- Taste-level decisions (where AI fails on "feel")
- Approval at every artifact-type level

**Input contract**:
```
{
  approved_brief: { from step 03 with DoR passed },
  brand_constraints: [from step 03],
  quality_checklist: [from step 03],
  asset_type: "brand_system" | "campaign_toolkit" | "ui_design" | "copy" | "code"
}
```

**Output contract**:
```
{
  deliverable: { files[], specs, assets },
  qa_results: { checklist_score, issues[], passes[] },
  variants: [{ variant_id, rationale, recommendation }],
  handoff_specs: { dev_notes, asset_links, instructions }
}
```

**Decision gate**: *Can a developer/team implement this without asking a single question? Test 3 random items. If they ask — close the specs.*

**KPIs**:
- Cycle time from approved brief to delivered asset (track per asset type)
- % deliverables passing QA first round (target: 70%+)
- Developer/team follow-up questions per handoff (target: <2)

**Failure modes**:
1. **AI-generated mediocrity**: Sterile, on-brand but soulless. Recovery: senior human refinement is non-negotiable; AI is starter, not finisher.
2. **Skipping QA checklist**: "Looks good, ship it." Recovery: enforce checklist gate before handoff.
3. **Over-revision loops**: 5+ rounds. Recovery: max 2 review rounds, then escalate to decision gate (per Step 05 Govern).

**Categories improved**: Visual / Brand Craft (cat 7) · Conversion Path Design (cat 5)

---

## Step 05 — Govern

**Purpose**: Define who decides, how, when — so decisions are traceable and not bottlenecked.

**Entry conditions**:
- Build output flowing (deliverables being produced)
- Ambiguous ownership detected (multiple stakeholders claiming approval)
- Change requests starting to accumulate

**AI agent role**:
- Log every decision in structured format (who, what, when, why)
- Route change requests by category to correct owner
- Track decision velocity per decision type
- Flag stalled decisions (>X days)
- Generate decision change-log per artifact

**Human role**:
- Define ownership map (which roles own which decision types)
- Approve escalation paths
- Set change request rules (what requires re-approval)
- Resolve conflicts when AI escalates

**Input contract**:
```
{
  decision_history: [{ artifact, decision, made_by, made_at, rationale }],
  ownership_map: { decision_type: owner_role },
  escalation_rules: [{ trigger, path, sla }],
  change_request_log: [...]
}
```

**Output contract**:
```
{
  decision_log: [{ ... structured records ... }],
  ownership_clarity_score: 0-1,
  decision_velocity: { type: avg_days_to_decide },
  conflicts_resolved: [...],
  stalled_decisions: [...]
}
```

**Decision gate**: *For any artifact, can I name (a) who approved it, (b) when, (c) what the rationale was? If less than 95% traceability — fix logging.*

**KPIs**:
- Average decision time per type (target: <3 days for design decisions)
- % decisions logged with rationale (target: 95%+)
- Decision reversal rate (target: trending down)
- Time spent in approval limbo (target: <10% of cycle time)

**Failure modes**:
1. **Logging fatigue**: Team stops logging after first month. Recovery: automate logging via AI (Slack/email parser).
2. **Unclear ownership**: Two people both "own" decisions. Recovery: force single-name owner per decision type.
3. **Escalation by default**: Everything escalates to founder. Recovery: enforce escalation criteria — most decisions should NOT escalate.

**Categories improved**: Conversion Path Design (cat 5) · Productization Readiness (cat 9)

---

## Step 06 — Ship

**Purpose**: Deliver with quality gates, not hope.

**Entry conditions**:
- Build output complete (Step 04 deliverable in QA)
- Quality checklist available (from Step 03)
- Approval owner identified (from Step 05)

**AI agent role**:
- Run quality checklist automatically (visual diff, link checks, copy lint, a11y)
- Generate handoff documentation
- Pre-flight check before each ship
- Compare deliverable against brief (does it match what was asked?)

**Human role**:
- Final sign-off (decision gate)
- Edge case judgment (when checklist passes but something feels off)
- Stakeholder communication around ship (announcements, training)

**Input contract**:
```
{
  deliverable: [from step 04],
  quality_checklist: [from step 03],
  approval_owner: [from step 05],
  ship_destination: { team, location, channel }
}
```

**Output contract**:
```
{
  shipped: bool,
  ship_record: { artifact, version, approved_by, shipped_at },
  handoff_pack: { docs, asset_links, training_materials },
  post_ship_monitoring_setup: { metrics_to_watch, alert_thresholds }
}
```

**Decision gate**: *Did the deliverable match the brief AND pass quality checklist AND get sign-off from named owner? If any answer is no — don't ship.*

**KPIs**:
- % deliverables passing quality review on first round (target: 70%+)
- Time from QA-pass to actual ship (target: <2 days)
- Post-ship issues per delivery (target: <1)
- Quality regression rate (target: 0%)

**Failure modes**:
1. **Ship by deadline, not by quality**: "We had to ship." Recovery: enforce gate; if quality fails, missing deadline is the smaller cost.
2. **Skipping post-ship monitoring**: Ship and forget. Recovery: setup monitoring in same step.
3. **Insufficient handoff**: Asset shipped without instructions. Recovery: handoff pack is part of ship gate.

**Categories improved**: Proof Density (cat 4) · Technical SEO & GEO (cat 8)

---

## Step 07 — Measure

**Purpose**: Track what actually changed. Without data, you can't prove the system works.

**Entry conditions**:
- Things being shipped (Step 06 active)
- Baseline data captured (pre-system metrics)
- KPI dashboard infrastructure available

**AI agent role**:
- Aggregate metrics across r3loop steps automatically
- Generate weekly/monthly KPI reports
- Detect anomalies (sudden drops, plateaus)
- Compare to baseline + targets
- Correlate metric movements with system changes

**Human role**:
- Define what to measure (which KPIs matter)
- Review reports + ask "so what?" questions
- Communicate insights to stakeholders
- Decide when to investigate vs let-it-ride

**Input contract**:
```
{
  baseline_metrics: { ... pre-system data ... },
  targets: { ... per-KPI goals ... },
  shipped_artifacts: [from step 06],
  measurement_infra: { tools, access }
}
```

**Output contract**:
```
{
  current_state: { ... all KPIs measured ... },
  delta_vs_baseline: { ... },
  delta_vs_target: { ... },
  anomalies: [...],
  insights: [{ observation, hypothesis, recommended_action }]
}
```

**Decision gate**: *Can I show 3 measurable improvements vs baseline within 60 days? If no — the system isn't working OR measurement is broken.*

**KPIs**:
- Dashboard live + baseline captured (binary)
- Reports delivered on cadence (weekly/monthly)
- Stakeholder review meetings happen on schedule (target: 100%)
- Decisions made from data (target: 80%+ of major decisions)

**Failure modes**:
1. **Vanity metrics**: Tracking activity (briefs created) not outcomes (briefs that shipped). Recovery: outcome-only metrics.
2. **Dashboard nobody reads**: Built and forgotten. Recovery: dashboard is part of meeting cadence, not standalone.
3. **No baseline**: Measuring without comparison point. Recovery: baseline capture is part of Step 07 entry condition.

**Categories improved**: Proof Density (cat 4) · Distribution Muscle (cat 10)

---

## Step 08 — Iterate

**Purpose**: Keep the system alive, not frozen. Adapt to changing organization.

**Entry conditions**:
- Measure output flowing (data available)
- 30+ days of system operation (enough to see drift)
- Stakeholder feedback channels open

**AI agent role**:
- Analyze metric trends + flag degradation
- Identify which r3loop step is showing failure modes
- Propose process changes with predicted impact
- Generate quarterly governance review materials
- Detect "drift back to old habits" patterns

**Human role**:
- Approve process changes (political/cultural decisions)
- Lead retrospectives
- Make calls on what to evolve vs maintain
- Sign off on system updates

**Input contract**:
```
{
  measure_output: [from step 07],
  feedback_signals: { stakeholder_input, support_tickets, retrospective_notes },
  time_in_system: days,
  drift_signals: { ... reverting-to-old-ways indicators }
}
```

**Output contract**:
```
{
  process_updates: [{ step, change, rationale, predicted_impact }],
  retrospective_findings: [...],
  next_iteration_priorities: [...],
  system_health_score: 0-1
}
```

**Decision gate**: *Can I take a 2-week vacation without the system breaking? If no — the system isn't yet operating without me. Stay in Iterate or escalate.*

**KPIs**:
- Quarter-over-quarter trend on all step KPIs
- Process update implementation rate (changes approved → adopted)
- Stakeholder satisfaction with system (survey)
- Operator presence in daily operations (target: <15% after 90 days)

**Failure modes**:
1. **Iteration without measurement**: Changing things without data. Recovery: every change must reference Step 07 data.
2. **No iteration**: System frozen as designed. Recovery: minimum quarterly retrospective enforced.
3. **Over-iteration**: Changing system weekly. Recovery: monthly review cadence + quarterly system update cadence.

**Categories improved**: Distribution Muscle (cat 10) · Productization Readiness (cat 9) · IP Definability (cat 2)

---

# PART 2 — Optimized Prompts (50 Agent-Executable)

Each prompt is structured for:
- **AI agent execution** (verbatim prompt for Claude/GPT)
- **Self-diagnostic use** (humans can answer)
- **Pass criteria** (clear binary or scored outcome)
- **Score impact** (how much this moves the category score 1-10000)

Format:
```
[ID] Title
- Step: ##  | Category: ##  | Type: diagnose|build|verify
- Input: { what user/data provides }
- Agent prompt: "<verbatim prompt for Claude>"
- Pass criteria: <when this is satisfied>
- Score impact: +X (max points moved in category)
- Dependencies: [other prompt IDs that should run first]
- Real example: <reference to actual r352 work>
```

---

## Category 1 — Positioning Clarity (max 10000)

### [1.1] The 5-second test
- **Step**: 03 Standardize · **Category**: 1 · **Type**: verify
- **Input**: `{ hero_h1: string, tagline: string, sub_line: string }`
- **Agent prompt**:
  > "You're a buyer arriving at a B2B service page. You see this hero block:
  > H1: '{{hero_h1}}'
  > Tagline: '{{tagline}}'
  > Sub: '{{sub_line}}'
  >
  > Without scrolling, answer in 5 seconds: WHO is this person/company? WHO is it for? WHAT makes it different? If any answer is 'unclear' or 'need more context', flag the failed element. Return JSON: { who, target, differentiator, failed_elements[], pass: bool }"
- **Pass criteria**: All 3 questions answered concretely; no failed_elements.
- **Score impact**: +2000 (largest single positioning lever)
- **Dependencies**: none
- **Real example**: r352 tagline "STRATEGIC DESIGN PARTNER" + H1 "Strategic design partner. For growing brands." — initially identical → identified by 5-second test as redundant.

### [1.2] Tagline-H1 redundancy audit
- **Step**: 03 Standardize · **Category**: 1 · **Type**: diagnose
- **Input**: `{ tagline: string, h1: string }`
- **Agent prompt**:
  > "Compare these two strings semantically. Are they making the same claim or distinct claims?
  > Tagline: '{{tagline}}'
  > H1: '{{h1}}'
  >
  > Return: { redundancy_score: 0-1, recommendation: 'split'|'merge'|'keep', proposed_split: { identity_line, claim_line } if redundancy_score > 0.6 }"
- **Pass criteria**: redundancy_score < 0.4 OR explicit reason to keep similar.
- **Score impact**: +800
- **Dependencies**: [1.1]
- **Real example**: r352 had tagline and H1 saying same thing. Split: tagline = identity ("Strategic Design Partner"), H1 = should carry POV.

### [1.3] Audience qualifier visibility
- **Step**: 02 Map · **Category**: 1 + 3 · **Type**: build
- **Input**: `{ h1: string, sub_line: string, current_audience_signals: string[] }`
- **Agent prompt**:
  > "Analyze if a visitor can self-identify as in-target within 3 seconds of seeing the hero. Current signals: {{current_audience_signals}}.
  >
  > If H1 contains generic terms like 'growing brands' or 'B2B teams', recommend adding 4-6 audience qualifier chips. Generate the chips based on: industry verticals, maturity stages, scale signals.
  >
  > Return: { needs_chips: bool, recommended_chips: [{ label, tooltip }], placement: 'below_h1'|'inside_h1' }"
- **Pass criteria**: Either H1 is specific OR audience chips are visible.
- **Score impact**: +1500
- **Dependencies**: [1.1]
- **Real example**: Home hero "For growing brands" too broad → added 6 chips (Multi-location, Multi-product, SaaS, Brand launch, Post-PMF, AI Elevated Workflows) with tooltips.

### [1.4] Mobile typography stress test
- **Step**: 06 Ship · **Category**: 1 + 7 · **Type**: verify
- **Input**: `{ h1_desktop: string, h1_mobile: string, viewport_test: '375px'|'412px' }`
- **Agent prompt**:
  > "Simulate rendering H1 at 48px on 375px viewport. Word-break analysis:
  > Desktop: '{{h1_desktop}}'
  > Mobile: '{{h1_mobile}}'
  >
  > Identify: words wider than 311px (375 - 64 padding), mid-word break risks, line wrap awkwardness.
  >
  > Return: { word_break_detected: bool, problematic_words[], recommended_breaks: <inserted br tags>, recommended_font_size, recommended_leading }"
- **Pass criteria**: No word breaks mid-word; no orphan single-word lines; readable at 375px.
- **Score impact**: +600
- **Dependencies**: [1.1]
- **Real example**: "For growing brands" was breaking "growin / g brands." on iPhone. Fixed: 4-line explicit `<br/>` stack + 40px font + leading-[0.76].

### [1.5] Three-word category test
- **Step**: 03 Standardize · **Category**: 1 + 2 · **Type**: diagnose
- **Input**: `{ how_you_describe_what_you_do: string }`
- **Agent prompt**:
  > "Compress this description into MAXIMUM 3 words that name your category:
  > '{{how_you_describe_what_you_do}}'
  >
  > Examples of strong 3-word categories: 'Design ops methodology', 'Brand operating system', 'AI loop architecture'.
  >
  > If you can't compress to 3 words, the category isn't named yet. Generate 5 candidate 3-word phrases. Score each by: specificity, ownability, memorability.
  >
  > Return: { current_word_count, can_compress: bool, candidates: [{ phrase, scores }], recommended: <best phrase> }"
- **Pass criteria**: 3-word category exists in user vocabulary.
- **Score impact**: +1000
- **Dependencies**: [1.1]
- **Real example**: r352 evolved "Design ops & delivery systems" → "Strategic design partner" → "Loop architecture for design ops". Each compression sharpened.

---

## Category 2 — IP Definability (max 10000)

### [2.1] IP convergence check
- **Step**: 03 Standardize · **Category**: 2 · **Type**: diagnose
- **Input**: `{ ip_brands: string[] }` (list of all methodology/framework/process names you use)
- **Agent prompt**:
  > "User has these IP brands in use: {{ip_brands}}.
  >
  > Detect convergence: are any 2+ brands describing similar territory? Score each pair for semantic overlap.
  >
  > If pairs with overlap > 0.6 exist, this is convergence noise diluting both brands. Recommend: kill the newer/weaker one, consolidate to the stronger.
  >
  > Return: { convergence_pairs: [{ brand_a, brand_b, overlap_score, recommendation }], strongest_brand, kill_candidates[] }"
- **Pass criteria**: Single IP brand owns the methodology category; no duplicates.
- **Score impact**: +1500
- **Dependencies**: none
- **Real example**: r352 had Framework + r3loop both as "methodologies". Spent a day differentiating, then killed Framework. r3loop owns the category alone now.

### [2.2] Methodology 4-checklist
- **Step**: 03 Standardize · **Category**: 2 · **Type**: verify
- **Input**: `{ methodology_name: string, methodology_artifacts: { name, structure, criteria, outputs } }`
- **Agent prompt**:
  > "Evaluate '{{methodology_name}}' against the 4-test:
  > 1. NAME: Does it have a memorable, ownable name?
  > 2. STRUCTURE: Does it have a clear sequence (e.g., 8 steps)?
  > 3. DECISION CRITERIA: Does each step have a pass/fail question?
  > 4. MEASURABLE OUTPUTS: Does each step produce something measurable?
  >
  > Return: { passes_all_4: bool, missing: [], remediation: { ... how to fix each gap } }"
- **Pass criteria**: All 4 tests pass.
- **Score impact**: +2000
- **Dependencies**: [2.1]
- **Real example**: r3loop has all 4 (name + 8 steps + decision gates + KPIs). That's why it's productizable as Q4 Playbook (€1500-2000).

### [2.3] Client-citation test
- **Step**: 07 Measure · **Category**: 2 · **Type**: verify
- **Input**: `{ methodology_name: string, client_public_materials_urls: string[] }`
- **Agent prompt**:
  > "Search the provided URLs (client public testimonials, case studies, blog posts) for mentions of '{{methodology_name}}'.
  >
  > Calculate citation rate: (clients citing methodology by name) / (total clients in materials).
  >
  > Return: { citation_count, citation_rate, citing_clients[], non_citing_clients[], recommendation: <how to increase rate> }"
- **Pass criteria**: At least 2 named clients cite the methodology publicly.
- **Score impact**: +1000
- **Dependencies**: [2.2]
- **Real example**: Sonova, Archicom, Geers all cite r3loop in case studies — 3-year compound effect of consistent naming.

### [2.4] Productization probe
- **Step**: 08 Iterate · **Category**: 2 + 9 · **Type**: diagnose
- **Input**: `{ methodology_name: string, current_documentation_state: 'none'|'partial'|'comprehensive' }`
- **Agent prompt**:
  > "Can the methodology be extracted from the practitioner's head into a 50-page playbook that another person could USE without the practitioner present?
  >
  > Audit current state: '{{current_documentation_state}}'. Identify what's missing:
  > - Step-by-step process documentation
  > - Output contracts per step
  > - Decision criteria language
  > - KPIs per step
  > - Common failure modes + recovery
  > - Example cases per step
  >
  > Return: { extractable: bool, gaps[], estimated_pages_when_complete, productization_readiness_score: 0-100 }"
- **Pass criteria**: Score >= 70% → ready to start Q4 Playbook content build.
- **Score impact**: +1500
- **Dependencies**: [2.2]
- **Real example**: r3loop is ~70% extractable → Q4 Playbook content build started June 2026 for October 2026 launch.

### [2.5] Borrowed authority smell test
- **Step**: 03 Standardize · **Category**: 2 · **Type**: diagnose
- **Input**: `{ methodology_vocabulary: string[] }` (key terms used)
- **Agent prompt**:
  > "Audit vocabulary for proprietary vs borrowed terms.
  >
  > Borrowed (generic): 'design ops', 'operations', 'methodology', 'system'.
  > Proprietary (unique): 'decision gates', 'output contracts', 'r3loop step 03', '90% → 15% presence'.
  >
  > Calculate proprietary ratio. If <40%, methodology lacks distinctive vocabulary moat. Generate 5 proprietary terms to introduce.
  >
  > Return: { proprietary_ratio, borrowed_terms[], proprietary_terms[], suggested_new_terms[] }"
- **Pass criteria**: At least 5 proprietary terms in active use; ratio > 40%.
- **Score impact**: +800
- **Dependencies**: [2.2]
- **Real example**: r352 /glossary defines 14 proprietary terms (r3loop, decision gates, output contracts, Master/Variant/Pre-production gates, etc.) — vocabulary moat live.

---

## Category 3 — Audience Qualification (max 10000)

### [3.1] Role-based personas check
- **Step**: 02 Map · **Category**: 3 · **Type**: diagnose
- **Input**: `{ current_audience_descriptions: string[] }`
- **Agent prompt**:
  > "Audit audience descriptions. Are they NAMED ROLES or TEAM TYPES?
  >
  > Named roles examples: 'Founder/CEO', 'Brand owner', 'Multi-location ops leader', 'Product Manager'.
  > Team types examples: 'Marketing teams', 'Design teams', 'Product teams'.
  >
  > Named roles convert 2x better. Identify which descriptions are role-based vs team-based. Generate 6 role-based personas from team-based ones.
  >
  > Each persona = { role: title, situation: 'You're [X]', desire: 'you want [Y]' }
  >
  > Return: { current_descriptions, current_format: 'roles'|'teams'|'mixed', generated_personas[6] }"
- **Pass criteria**: 6 named role-based personas exist on methodology page.
- **Score impact**: +1500
- **Dependencies**: none
- **Real example**: /process Who-this-is-for migrated from flat team list to 6-persona role-based format (Founder/CEO, Brand owner, Multi-location ops lead, PM, Marketing leader, Operating Partner).

### [3.2] "When this is too much" qualifier
- **Step**: 02 Map · **Category**: 3 · **Type**: build
- **Input**: `{ offer_description, ideal_buyer_traits[] }`
- **Agent prompt**:
  > "Generate an explicit 'When this is too much' / 'Not a fit' qualifier for the offer.
  >
  > Audit: based on '{{offer_description}}' and ideal buyer '{{ideal_buyer_traits}}', who is NOT the right fit?
  >
  > Examples to disqualify: 'one-off banner', 'single landing page', 'no recurring workflow', 'pre-PMF founder needing 1-week pivot'.
  >
  > Return: { disqualifier_paragraph: string, examples_too_small[], examples_too_specialized[] }"
- **Pass criteria**: Disqualifier section visible on methodology page; ≥3 disqualifying scenarios listed.
- **Score impact**: +1000
- **Dependencies**: [3.1]
- **Real example**: /process "When this is too much": "Probably too much if you only need a one-off banner, a quick visual refresh or a single landing page with no recurring workflow."

### [3.3] Self-identification chips
- **Step**: 02 Map · **Category**: 3 · **Type**: build
- **Input**: `{ industry_verticals[], maturity_stages[], capability_claims[] }`
- **Agent prompt**:
  > "Generate 4-6 audience chips for the homepage hero. Each chip should let a visitor instantly self-identify.
  >
  > Mix dimensions: industry verticals (Multi-location, SaaS, Brand launch), maturity stages (Post-PMF, Series A+), capability claims (AI-native operations).
  >
  > Each chip: { label: 1-3 words, tooltip: 6-10 word definition, group: 'audience'|'capability' }
  >
  > Return: { chips[], separator_placement, mobile_treatment }"
- **Pass criteria**: 4-6 chips with tooltips visible under H1.
- **Score impact**: +1200
- **Dependencies**: [3.1]
- **Real example**: Home hero has 6 chips (5 audience + 1 capability) separated by vertical divider with cinematic tooltips on hover.

### [3.4] Single-attribute primary audience
- **Step**: 02 Map · **Category**: 3 · **Type**: diagnose
- **Input**: `{ primary_audience_attributes[] }`
- **Agent prompt**:
  > "Identify the SINGLE primary audience attribute. If multiple are listed as 'primary', this dilutes targeting.
  >
  > Score each attribute by: revenue concentration (% of clients), strategic fit, market size.
  >
  > Return: { recommended_primary, secondary_attributes[], dilution_risk_if_multiple }"
- **Pass criteria**: One clear primary attribute identified (e.g., 'multi-location'); secondaries clearly subordinate.
- **Score impact**: +800
- **Dependencies**: [3.1]
- **Real example**: r352 hero chip order: Multi-location FIRST (primary), expands to SaaS / Brand launch / Post-PMF secondaries.

### [3.5] Segmented intake routing
- **Step**: 02 Map · **Category**: 3 + 5 · **Type**: build
- **Input**: `{ vertical_industries[], current_intake_form_questions[] }`
- **Agent prompt**:
  > "Design segmented intake routing logic.
  >
  > For each vertical in {{vertical_industries}}, generate:
  > - URL parameter: ?segment=<slug>
  > - Pre-populated first question
  > - Skip/modify questions that don't apply to this vertical
  > - Branded framing for first screen
  >
  > Return: { routing_logic[], per_vertical_intake_changes }"
- **Pass criteria**: Each vertical has dedicated intake flow.
- **Score impact**: +900
- **Dependencies**: [3.4]
- **Real example**: /industries pages route to /brief?segment=fitness-wellness | real-estate | retail-franchise | health-service-networks. Same form, vertical-specific framing.

---

## Category 4 — Proof Density (max 10000)

### [4.1] Two-proof minimum
- **Step**: 06 Ship · **Category**: 4 · **Type**: diagnose
- **Input**: `{ case_studies_visible[] }`
- **Agent prompt**:
  > "Count case studies WITH HARD METRICS visible on the methodology page (not just /work index).
  >
  > Rules:
  > - 0 visible = theory (red flag)
  > - 1 visible = anecdote
  > - 2+ visible = pattern (acceptable)
  > - 3+ visible across DIFFERENT axes = strong pattern
  >
  > Each case must have: named client OR specific anonymized identifier, 3+ measurable metrics, 1-2 sentence story.
  >
  > Return: { count, axes_covered[], gap_recommendations[] }"
- **Pass criteria**: Minimum 2 case studies with 3 metrics each, on different proof axes.
- **Score impact**: +1800
- **Dependencies**: none
- **Real example**: /process has Geers (SCALE — 60+ studios, 3×/80%/15%) + Kubota (DURATION — 3+ years, 200+ deliverables, IPO). Two axes of proof.

### [4.2] Metric specificity audit
- **Step**: 06 Ship · **Category**: 4 · **Type**: diagnose
- **Input**: `{ current_metrics[] }` (list of claimed outcomes)
- **Agent prompt**:
  > "Audit metric specificity. Each metric must be:
  > - QUANTIFIED (number or %, not 'better' or 'faster')
  > - SCOPED (per what — per quarter? per location? total?)
  > - TIMED (over what period?)
  >
  > For each metric in {{current_metrics}}, score 0-3 on each dimension. Recommend replacement for any metric scoring <2/3 average.
  >
  > Return: { audit_per_metric[], replacements[], strongest_metric }"
- **Pass criteria**: All visible metrics score ≥ 2/3 average across dimensions.
- **Score impact**: +800
- **Dependencies**: [4.1]
- **Real example**: Geers metrics "3× faster approvals" (quantified+scoped), "80% briefs first round" (quantified+scoped), "15% presence" (quantified+scoped+timed). Strong.

### [4.3] Named clients vs generic
- **Step**: 06 Ship · **Category**: 4 · **Type**: verify
- **Input**: `{ case_study_descriptions[] }`
- **Agent prompt**:
  > "For each case study description, identify if it uses a NAMED CLIENT or a GENERIC PLACEHOLDER.
  >
  > Examples:
  > NAMED: 'Sonova / Geers — 60+ hearing-care studios'
  > GENERIC: 'A multi-location marketing team'
  >
  > For each generic, generate 3 ways to convert to named:
  > 1. Use real client name (if not under NDA)
  > 2. Specific anonymized identifier ('Major European hearing-care network')
  > 3. Move to /work and use named version there
  >
  > Return: { conversions[], strongest_named_options }"
- **Pass criteria**: 100% of visible case study descriptions use named clients.
- **Score impact**: +700
- **Dependencies**: [4.1]
- **Real example**: Was "Multi-location marketing team" — replaced with named Geers + Kubota cases. Credibility lift 10x.

### [4.4] r3loop step traceability
- **Step**: 06 Ship · **Category**: 4 + 2 · **Type**: build
- **Input**: `{ case_study: { name, story } }`
- **Agent prompt**:
  > "For case study '{{case_study.name}}', identify which r3loop steps were applied. Map each part of the story to a step.
  >
  > Generate a one-sentence step-trace: 'Steps 02-03 (Map → Standardize) defined the request workflow; steps 06-08 sustained delivery for 3 years.'
  >
  > Make the methodology TRACEABLE not abstract.
  >
  > Return: { step_trace_sentence, steps_invoked[], proof_of_methodology_concrete: bool }"
- **Pass criteria**: Every case study explicitly references r3loop steps applied.
- **Score impact**: +500
- **Dependencies**: [4.1]
- **Real example**: Geers case: "steps 02-03 (Map → Standardize) classified the workflow"; Kubota case: "steps 03-08 sustained across 3 years."

### [4.5] Proof axis diversification
- **Step**: 06 Ship · **Category**: 4 · **Type**: verify
- **Input**: `{ all_case_studies[] }`
- **Agent prompt**:
  > "Map each case study to its primary PROOF AXIS:
  > - SCALE (locations, users, volume)
  > - DURATION (years on retainer)
  > - DOMAIN (vertical diversity)
  > - IP (own products)
  > - TRANSFORMATION (before/after)
  >
  > If all case studies share the same axis, you have axis-redundancy not proof strength.
  >
  > Return: { axis_distribution, redundancy_detected, recommendation }"
- **Pass criteria**: At least 2 different axes covered by visible case studies.
- **Score impact**: +600
- **Dependencies**: [4.1]
- **Real example**: r352 covers SCALE (Geers/Benefit), DURATION (Kubota), IP (Caterelo/regional.fit). Multi-axis proof.

---

## Category 5 — Conversion Path Design (max 10000)

### [5.1] Decision-fatigue test on services
- **Step**: 04 Build · **Category**: 5 · **Type**: diagnose
- **Input**: `{ services_page_structure, engagement_models_count, product_categories_count }`
- **Agent prompt**:
  > "Simulate a buyer evaluating the services page. Time them: how long to pick the right engagement model?
  >
  > Decision-fatigue indicators:
  > - 5+ engagement models without comparison tool = HIGH fatigue
  > - Multiple taxonomies (products + engagements + tiers) without mapping = HIGH fatigue
  > - No 'best for' guidance per option = MID fatigue
  >
  > If fatigue is HIGH, generate a mapping matrix: row = engagement model, columns = best-for products/scenarios.
  >
  > Return: { fatigue_level, mapping_matrix[], implementation_priority }"
- **Pass criteria**: Buyer can pick engagement model in <30 seconds.
- **Score impact**: +1200
- **Dependencies**: none
- **Real example**: /services had 5 engagement models + 6 product cards without mapping. Added Pairing Matrix below — engagement on left, products on right. Buyer self-matches.

### [5.2] Multi-CTA hierarchy audit
- **Step**: 04 Build · **Category**: 5 · **Type**: verify
- **Input**: `{ above_fold_ctas[], cta_destinations[] }`
- **Agent prompt**:
  > "Count CTAs above the fold and audit hierarchy.
  >
  > Rules:
  > - <2 CTAs = under-converting
  > - 3 CTAs with clear primary/secondary/tertiary hierarchy = optimal
  > - 4+ CTAs without hierarchy = decision paralysis
  >
  > Each CTA must have: visible primary action (e.g., Start brief), secondary action (Book call), tertiary action (Email).
  >
  > Return: { cta_count, hierarchy_clear: bool, recommended_changes }"
- **Pass criteria**: 2-3 CTAs with clear visual hierarchy.
- **Score impact**: +600
- **Dependencies**: none
- **Real example**: r352 Hero has 2 primary CTAs (Start brief, Book call) + tertiary mailto. 3 levels of commitment.

### [5.3] Density-to-depth balance
- **Step**: 04 Build · **Category**: 5 + 7 · **Type**: build
- **Input**: `{ card_content_word_count, bullets_per_card }`
- **Agent prompt**:
  > "If each card has 4-6 bullets visible, density is killing scanability.
  >
  > Apply chip-tooltip pattern:
  > - Each bullet → 2-3 word chip
  > - Full sentence revealed on hover tooltip
  > - Premium motion + glass tooltip + arrow pointer
  >
  > Estimate: 70% visible content reduction with zero info loss.
  >
  > Return: { current_density_score, recommended_chips[], tooltip_pattern, mobile_fallback_strategy }"
- **Pass criteria**: <20 words visible per card (chips only).
- **Score impact**: +1000
- **Dependencies**: [5.1]
- **Real example**: /services engagement model cards had 4-bullet 'How it works' + 2-bullet 'Ideal when'. Refactored to chip-tooltip rows. 74% visible content reduction.

### [5.4] Mobile fallback for hover patterns
- **Step**: 06 Ship · **Category**: 5 + 7 · **Type**: verify
- **Input**: `{ desktop_pattern, mobile_behavior }`
- **Agent prompt**:
  > "Mobile devices don't have hover. Audit hover-dependent UX patterns.
  >
  > If chip-tooltip pattern is in use:
  > - Option A: Render full bullets on mobile (md:hidden chips, md:hidden bullets)
  > - Option B: Tap-to-reveal popover
  > - Option C: Accept 40-60% mobile users see only chip labels — monitor conversion
  >
  > Return: { hover_dependent_components[], recommended_mobile_strategy, monitoring_metrics }"
- **Pass criteria**: Either mobile fallback shipped OR monitoring data shows no conversion drop.
- **Score impact**: +500
- **Dependencies**: [5.3]
- **Real example**: Chip-tooltip on desktop. No mobile fallback yet. Decision: ship + monitor 2-3 weeks before building fix.

### [5.5] Conversion path analytics setup
- **Step**: 07 Measure · **Category**: 5 + 10 · **Type**: build
- **Input**: `{ current_analytics_provider, conversion_events_tracked[] }`
- **Agent prompt**:
  > "Audit conversion analytics. Each CTA must have a tracked event with attribution.
  >
  > Required events:
  > - 'brief_started' (intake form opened)
  > - 'brief_submitted' (form completed)
  > - 'calendly_clicked' (call booked)
  > - 'mail_clicked' (email opened)
  > - 'waitlist_signup' (Q4 Playbook waitlist email)
  >
  > Return: { missing_events[], implementation_per_event, dashboard_setup }"
- **Pass criteria**: All 5 events tracked + visible in dashboard.
- **Score impact**: +700
- **Dependencies**: [5.2]
- **Real example**: r352 uses Plausible with custom events for brief_cta_clicked, calendly_clicked, mail_clicked, playbook_waitlist_signup.

---

## Category 6 — Anti-Time POV (max 10000)

### [6.1] Anti-hourly POV visibility
- **Step**: 03 Standardize · **Category**: 6 · **Type**: diagnose
- **Input**: `{ marketing_page_content }`
- **Agent prompt**:
  > "Search marketing content for explicit anti-hourly claim. Without it, the offer is lumped with hourly consultants by default.
  >
  > Required signals:
  > - Visual/graph showing presence decreasing over time
  > - Quote or claim: 'system not hours' or equivalent
  > - Productized pricing (€/month or €/project), NOT hourly
  > - Methodology that 'survives without me' framing
  >
  > Return: { signals_present[], signals_missing[], strongest_addition }"
- **Pass criteria**: All 4 signals present somewhere on site.
- **Score impact**: +1500
- **Dependencies**: none
- **Real example**: r352 has Operating Model graph (90% → 15%), "I sell systems, not hours", productized pricing, "Methodology you sell should survive your own use" — all 4 signals.

### [6.2] Operating Model proof
- **Step**: 03 Standardize · **Category**: 6 · **Type**: build
- **Input**: `{ methodology_steps[], presence_per_step: number[] }`
- **Agent prompt**:
  > "Build the Operating Model visual: table showing how operator presence decreases across methodology steps.
  >
  > Format:
  > | Step | Presence % | Role |
  > | 01 Diagnose | 90% | Architect |
  > | 02 Map | 70% | Director |
  > | ... | ... | ... |
  > | 08 Iterate | 15% | Strategic overseer |
  >
  > Lime fill bars visualize presence drops. This makes anti-time POV undeniable.
  >
  > Return: { table_data, visual_treatment, placement_recommendation }"
- **Pass criteria**: Operating Model table live on methodology page with all 8 steps.
- **Score impact**: +1200
- **Dependencies**: [6.1]
- **Real example**: r3loop Operating Model table on /process: 90% Diagnose → 15% Iterate. Lime fill bars. Anti-hourly POV in one visual.

### [6.3] Methodology survival sentence
- **Step**: 03 Standardize · **Category**: 6 + 2 · **Type**: verify
- **Input**: `{ methodology_name }`
- **Agent prompt**:
  > "Complete this sentence: 'My {{methodology_name}} runs without me because ___.'
  >
  > Acceptable completions reference: documented contracts, decision criteria, KPIs, handoff plans, client team trained, AI agents at gates.
  >
  > Unacceptable completions: 'because of my expertise', 'because of my experience', 'because I'm in the room'.
  >
  > Return: { user_completion, completion_quality: 0-1, recommended_rewrite }"
- **Pass criteria**: Completion references structural elements, not personal traits.
- **Score impact**: +800
- **Dependencies**: [6.1]
- **Real example**: r3loop survives because: documented decision criteria + measurable KPIs + clients trained + AI agents can run between gates.

### [6.4] Productization signal
- **Step**: 05 Govern · **Category**: 6 + 9 · **Type**: build
- **Input**: `{ planned_paid_product_state }`
- **Agent prompt**:
  > "Even if Q4 launch is months away, the EXISTENCE of a productization path anchors anti-hourly positioning.
  >
  > Build minimum scaffold:
  > - Section on methodology page teasing Q4 product
  > - Waitlist email capture
  > - Founding vs standard price anchoring
  > - 'What's inside' inventory
  >
  > Return: { scaffold_components[], placement, copy_drafts }"
- **Pass criteria**: Waitlist scaffold live, capturing emails from now.
- **Score impact**: +1000
- **Dependencies**: [6.1]
- **Real example**: Q4 r3loop Playbook waitlist scaffold on /process. Founding €1500 vs Standard €2000. 8-item 'What's inside' grid.

### [6.5] Hidden pricing as positioning
- **Step**: 03 Standardize · **Category**: 6 · **Type**: diagnose
- **Input**: `{ visible_pricing_pages[], pricing_format }`
- **Agent prompt**:
  > "Audit pricing visibility. Productized pricing (€2k Diagnostic, €7k/mo Retainer) signals 'outcomes not time'. Hourly rates (€200/hour) anchor to hourly mindset.
  >
  > If hourly rates visible, recommend hiding them OR replacing with productized equivalents.
  >
  > Also: consider strategic optionality — hidden pricing allows market-segmented pricing (PL vs international).
  >
  > Return: { pricing_format_detected, recommendation, optionality_play_available: bool }"
- **Pass criteria**: No hourly rates visible; productized prices visible OR strategically hidden.
- **Score impact**: +500
- **Dependencies**: [6.1]
- **Real example**: r352 pricing visible only in /faq and /glossary. /services engagement cards have NO prices. Strategic optionality for PL vs international.

---

## Category 7 — Visual / Brand Craft (max 10000)

### [7.1] Motion language consistency
- **Step**: 04 Build · **Category**: 7 · **Type**: verify
- **Input**: `{ animation_components[] }`
- **Agent prompt**:
  > "Audit all animations on site. Each animation has an easing curve. List unique curves found.
  >
  > Standard: site should use 1-2 easing curves maximum. Recommended: cubic-bezier(0.22, 1, 0.36, 1) for smooth-out-fast-in.
  >
  > If 3+ curves detected, consolidate to standard.
  >
  > Return: { curves_found[], curves_should_be, components_to_update[] }"
- **Pass criteria**: Site uses ≤2 easing curves consistently.
- **Score impact**: +400
- **Dependencies**: none
- **Real example**: r352 uses [0.22, 1, 0.36, 1] for PageTransition + Reveal + Chip tooltips + scroll animations.

### [7.2] Premium tooltip pattern
- **Step**: 04 Build · **Category**: 7 · **Type**: build
- **Input**: `{ current_tooltip_implementation }`
- **Agent prompt**:
  > "Audit tooltip implementation. Plain CSS tooltips read as Bootstrap-cheap. Premium pattern:
  > - Framer-motion entrance (fade + slide 8px + scale 0.96→1 + blur 6px→0)
  > - Backdrop-blur-xl glass effect
  > - Lime gradient hairline accent
  > - Arrow pointer connecting to source
  > - Cinematic easing [0.22, 1, 0.36, 1]
  > - Text-center + text-wrap:balance for clean lines
  >
  > Return: { current_pattern_grade, upgrade_path, code_template }"
- **Pass criteria**: All tooltips use premium motion pattern.
- **Score impact**: +600
- **Dependencies**: [7.1]
- **Real example**: r352 chip tooltips use framer-motion + glass + lime accent + arrow. Matches site motion language.

### [7.3] Mobile word-break audit
- **Step**: 06 Ship · **Category**: 7 · **Type**: verify
- **Input**: `{ headline_text, viewport_width: 375 | 412 }`
- **Agent prompt**:
  > "Test headline rendering at mobile viewport.
  >
  > Detect: mid-word breaks ('growin' / 'g brands'), awkward line wraps, oversized fonts that overflow.
  >
  > Fix recipe:
  > - Add explicit <br/> tags in title_mobile string
  > - Reduce font-size to 40px (from 48px+)
  > - Set leading-[0.76] for tight stack
  > - Remove text-balance (causes re-flow)
  >
  > Return: { word_breaks_detected, recommended_breaks, font_size_reduction, leading_reduction }"
- **Pass criteria**: No mid-word breaks on 375px viewport.
- **Score impact**: +500
- **Dependencies**: [7.1]
- **Real example**: Home H1 was breaking "For growing brands" badly on mobile. Fixed with explicit `<br/>` + 40px + leading-[0.76].

### [7.4] Visual identity coherence
- **Step**: 04 Build · **Category**: 7 · **Type**: verify
- **Input**: `{ brand_visual_surfaces[] }` (header avatar, chatbot icon, about portrait, etc.)
- **Agent prompt**:
  > "Audit all visual identity surfaces. They should share ONE visual identity element.
  >
  > Fractured pattern: chatbot has lime+silhouette, About has photo, header has logo — three identities.
  > Coherent pattern: lime+silhouette appears across surfaces at different scales.
  >
  > Return: { identity_elements_found[], coherence_score, fracture_points[], consolidation_recommendation }"
- **Pass criteria**: Visual identity coherent across all surfaces.
- **Score impact**: +400
- **Dependencies**: none
- **Real example**: r352 chatbot icon (small lime+silhouette) and /philosophy About portrait (420px lime+silhouette) share visual identity.

### [7.5] No-face brand statement
- **Step**: 03 Standardize · **Category**: 7 · **Type**: build
- **Input**: `{ has_personal_photo: bool, brand_positioning }`
- **Agent prompt**:
  > "If 'no face' is strategic differentiator (anti-influencer positioning), make it INTENTIONAL via explicit caption.
  >
  > Convert placeholder portrait into branded statement:
  > - 'The work speaks. I don't have to.'
  > - 'No face. Just systems.'
  > - 'Operator, not influencer.'
  >
  > Caption overlay on portrait, mix-blend-multiply for clean reading on lime.
  >
  > Return: { current_state, recommended_caption, implementation }"
- **Pass criteria**: Portrait has explicit brand statement caption.
- **Score impact**: +400
- **Dependencies**: [7.4]
- **Real example**: /philosophy About uses lime+silhouette with caption "The work speaks. I don't have to." Reframes anti-face as deliberate positioning.

---

## Category 8 — Technical SEO & GEO (max 10000)

### [8.1] Schema completeness audit
- **Step**: 06 Ship · **Category**: 8 · **Type**: verify
- **Input**: `{ page_types: ['methodology', 'glossary', 'faq', 'case_studies'] }`
- **Agent prompt**:
  > "Audit JSON-LD schema per page type:
  > - Methodology pages → HowTo schema
  > - Glossary → DefinedTermSet schema
  > - FAQ → FAQPage schema
  > - Case studies → Article + Organization schema
  > - Services → Service schema
  >
  > Return: { schemas_present[], schemas_missing[], implementation_per_missing }"
- **Pass criteria**: All page types have appropriate schema.
- **Score impact**: +700
- **Dependencies**: none
- **Real example**: /process has HowTo (8 r3loop steps), /glossary has DefinedTermSet (14 terms), /faq has FAQPage (5 Q&A).

### [8.2] llms.txt presence
- **Step**: 06 Ship · **Category**: 8 · **Type**: verify
- **Input**: `{ has_llms_txt: bool, content_summary }`
- **Agent prompt**:
  > "Check /llms.txt presence. This is the new SEO of 2026 for LLM crawlers.
  >
  > Required content:
  > - Brand description (2-3 sentences)
  > - Key methodology terms (cite-able vocabulary)
  > - Top URLs to crawl (canonical priority list)
  > - Author/practitioner identification
  >
  > Return: { present: bool, content_quality, gaps, recommended_addition }"
- **Pass criteria**: /llms.txt exists with curated content for LLM crawlers.
- **Score impact**: +500
- **Dependencies**: none
- **Real example**: r352 /llms.txt curates r3loop methodology + vocabulary + canonical URLs.

### [8.3] Redirect discipline
- **Step**: 06 Ship · **Category**: 8 · **Type**: build
- **Input**: `{ deleted_urls[], redirect_config }`
- **Agent prompt**:
  > "For every deleted URL, verify 301 redirect to its successor.
  >
  > Killing pages without redirects loses link equity. Configure in vercel.json or hosting equivalent.
  >
  > Return: { deleted_urls_without_redirects[], redirect_configs_to_add }"
- **Pass criteria**: 100% of deleted URLs have 301 redirects.
- **Score impact**: +400
- **Dependencies**: none
- **Real example**: Deleted /framework → added 301 redirect /framework → /process in vercel.json.

### [8.4] WebP image migration
- **Step**: 06 Ship · **Category**: 8 · **Type**: verify
- **Input**: `{ image_inventory[] }`
- **Agent prompt**:
  > "Audit all images on site. Each should be WebP at 80% quality.
  >
  > PNG/JPG = 4x slower load on mobile = -20% conversion.
  > WebP at 80% = visually identical, 75% smaller.
  >
  > Also verify loading='lazy' for below-fold images.
  >
  > Return: { non_webp_images[], lazy_loading_missing[], total_kb_savings }"
- **Pass criteria**: 100% hero images WebP; lazy loading on all below-fold.
- **Score impact**: +400
- **Dependencies**: none
- **Real example**: All r352 hero images + case study covers WebP. Favicon family too. Mobile load <2s.

### [8.5] Sitemap accuracy
- **Step**: 06 Ship · **Category**: 8 · **Type**: verify
- **Input**: `{ sitemap_urls[], actual_pages_live[] }`
- **Agent prompt**:
  > "Compare sitemap.xml against actual live pages.
  >
  > Identify:
  > - URLs in sitemap but NOT live (need removal)
  > - URLs live but NOT in sitemap (need addition)
  > - Stale priorities (review)
  >
  > Return: { remove_from_sitemap[], add_to_sitemap[], priority_adjustments[] }"
- **Pass criteria**: Sitemap matches live pages 100%.
- **Score impact**: +300
- **Dependencies**: none
- **Real example**: Deleted /framework → removed from sitemap.xml in same commit. Discipline.

---

## Category 9 — Productization Readiness (max 10000)

### [9.1] Waitlist live check
- **Step**: 05 Govern · **Category**: 9 · **Type**: verify
- **Input**: `{ planned_product_launch_date, current_waitlist_state }`
- **Agent prompt**:
  > "If a paid product launches in <12 months, waitlist must be LIVE NOW.
  >
  > Required:
  > - Email capture form on methodology page
  > - Plausible event tracking
  > - Mailto fallback (until ESP wired)
  > - Pricing teaser visible (founding vs standard anchor)
  >
  > Every week without waitlist = ~30 lost early-access subscribers (per typical conversion rates).
  >
  > Return: { waitlist_present: bool, components_missing[], implementation_priority }"
- **Pass criteria**: Waitlist live and capturing emails.
- **Score impact**: +1500
- **Dependencies**: none
- **Real example**: Q4 r3loop Playbook waitlist live on /process from June 2026. Starts capturing 3 months before launch.

### [9.2] Founding vs standard price anchoring
- **Step**: 03 Standardize · **Category**: 9 · **Type**: build
- **Input**: `{ planned_pricing: { founding, standard } }`
- **Agent prompt**:
  > "Display pricing in dual-anchor format:
  > - Founding access price highlighted (€1500)
  > - Standard launch price strikethrough/dimmed (€2000)
  >
  > Creates urgency without forcing decisions. Anchors that early-access is special.
  >
  > Return: { pricing_display_template, copy_recommendations }"
- **Pass criteria**: Dual-anchor pricing visible on product teaser section.
- **Score impact**: +500
- **Dependencies**: [9.1]
- **Real example**: Q4 Playbook section shows €1500 founding (lime, bold, large) vs €2000 standard (strikethrough, dimmed).

### [9.3] Productization filter test
- **Step**: 03 Standardize · **Category**: 9 · **Type**: diagnose
- **Input**: `{ product_offer_statement }`
- **Agent prompt**:
  > "Test product offer with this statement:
  >
  > 'For teams that don't need us in the room — they need a system we can hand off.'
  >
  > If your offer doesn't honestly match this audience, the product is still consulting in disguise. Real productization means: documented + decision criteria + KPIs + handoff plans + AI prompts. Tested by: someone NEW can use it.
  >
  > Return: { filter_match: bool, gaps_to_close[], productization_readiness_score }"
- **Pass criteria**: Filter sentence honestly describes product audience.
- **Score impact**: +700
- **Dependencies**: [9.1]
- **Real example**: Q4 Playbook tagline literally states this. Filters non-fit from fit.

### [9.4] 8-item value visibility
- **Step**: 04 Build · **Category**: 9 · **Type**: build
- **Input**: `{ product_inclusions[] }`
- **Agent prompt**:
  > "Replace vague descriptions ('comprehensive playbook') with specific inventory.
  >
  > Generate 8 concrete inclusions:
  > 1. 8 methodology steps in depth
  > 2. Output contracts per step
  > 3. Decision gates + KPIs
  > 4. Brief templates
  > 5. Quality review checklists
  > 6. AI prompt library
  > 7. Governance frameworks
  > 8. Case studies in depth
  >
  > Display in 2-col grid. Buyer counts value before pricing.
  >
  > Return: { inclusion_list[], grid_layout, copy }"
- **Pass criteria**: 8 specific inclusions visible in grid format.
- **Score impact**: +600
- **Dependencies**: [9.3]
- **Real example**: Q4 Playbook section uses 2-col grid with 8 'What's inside' items.

### [9.5] r3loop step productization mapping
- **Step**: 08 Iterate · **Category**: 9 + 2 · **Type**: diagnose
- **Input**: `{ methodology_steps[] }`
- **Agent prompt**:
  > "For each methodology step, identify if it could be productized as standalone SaaS.
  >
  > Examples:
  > - Diagnose → workflow audit tool
  > - Standardize → AI brief assistant SaaS
  > - Measure → KPI dashboard SaaS
  >
  > Atomized productization = multiple revenue lines.
  >
  > Return: { per_step_saas_potential[], strongest_candidates_for_first_launch }"
- **Pass criteria**: At least 3 steps have viable standalone SaaS form.
- **Score impact**: +700
- **Dependencies**: [9.1]
- **Real example**: r3loop Standardize step → AI Brief Assistant SaaS already planned. Measure → dashboard potential. Multi-product roadmap.

---

## Category 10 — Distribution Muscle (max 10000)

### [10.1] Content cadence audit
- **Step**: 07 Measure · **Category**: 10 · **Type**: verify
- **Input**: `{ publishing_history_90d[], primary_channel }`
- **Agent prompt**:
  > "Count posts published in last 90 days on primary channel.
  >
  > Rules:
  > - <12 posts/90d (<1/week) = no distribution muscle
  > - 12-24 posts/90d (1-2/week) = minimum viable
  > - 24+ posts/90d (2-3/week) = strong cadence
  >
  > If <1/week, recommend setting non-negotiable cadence.
  >
  > Return: { cadence_actual, cadence_recommended, weeks_below_target }"
- **Pass criteria**: ≥1 post/week consistent over last 90 days.
- **Score impact**: +1500
- **Dependencies**: none
- **Real example**: r352 planned LinkedIn arc 2 posts/week × 8 weeks = 16 posts to establish thought leadership.

### [10.2] POV vs tutorial mix
- **Step**: 07 Measure · **Category**: 10 · **Type**: diagnose
- **Input**: `{ recent_posts[] }`
- **Agent prompt**:
  > "Classify each post by type:
  > - TUTORIAL: 'How to X', step-by-step, instructional
  > - POV: 'Why X is wrong', opinion, claim, manifesto
  > - PROOF: case studies, results, before/after
  >
  > Calculate ratio. Target: 60-70% POV / 20-30% Proof / 10-20% Tutorial.
  >
  > Tutorials build SEO. POV builds authority + leads.
  >
  > Return: { current_ratio, target_ratio, recommended_post_types_next_month }"
- **Pass criteria**: POV ≥ 50% of content mix.
- **Score impact**: +800
- **Dependencies**: [10.1]
- **Real example**: r3loop content arc starts with POV post (response to Boris Cherny). POV-first establishes category ownership.

### [10.3] First-mover monitoring
- **Step**: 07 Measure · **Category**: 10 · **Type**: build
- **Input**: `{ industry_leader_list[], monitoring_setup }`
- **Agent prompt**:
  > "Set up alerts for category-defining claims from industry leaders.
  >
  > Required:
  > - Slack/RSS/Twitter alerts on 5-10 leaders
  > - Response template ready (your prior work + claim)
  > - 24h response SLA when claim hits
  >
  > Window of opportunity: when leader makes claim, first-movers in 24h capture wave momentum.
  >
  > Return: { monitoring_setup_recommendations, response_templates }"
- **Pass criteria**: Monitoring active + template ready.
- **Score impact**: +700
- **Dependencies**: [10.1]
- **Real example**: Boris Cherny posted "I write loops not prompts" → r3loop = loop architecture response within 24h.

### [10.4] Channel concentration
- **Step**: 02 Map · **Category**: 10 · **Type**: diagnose
- **Input**: `{ active_channels[] }`
- **Agent prompt**:
  > "Audit channel concentration. Spread across 5+ channels = no compounding.
  >
  > Rules:
  > - 1 channel = too concentrated (no risk diversification)
  > - 2 channels = optimal (e.g., LinkedIn + email newsletter)
  > - 3-4 channels = balanced but stretching attention
  > - 5+ channels = spread too thin
  >
  > Return: { current_concentration, recommended_action, channels_to_kill[] }"
- **Pass criteria**: 1-2 dominant channels with consistent activity.
- **Score impact**: +500
- **Dependencies**: [10.1]
- **Real example**: r352 focuses on LinkedIn (Reszek personal) + email (Q4 waitlist). Two channels, dominated, before expanding.

### [10.5] Audience asset accumulation
- **Step**: 07 Measure · **Category**: 10 + 9 · **Type**: build
- **Input**: `{ owned_audience: { email_list_size, newsletter_status } }`
- **Agent prompt**:
  > "Audit owned audience assets.
  >
  > LinkedIn followers = RENTED (algorithm can kill access).
  > Newsletter subscribers = OWNED (you control distribution).
  >
  > Migrate engaged LinkedIn followers to newsletter via lead magnets (waitlist, free diagnostic, mini-playbook).
  >
  > Return: { owned_vs_rented_ratio, lead_magnet_recommendations, ESP_choice_recommendation }"
- **Pass criteria**: Newsletter has growing list with lead magnet flow.
- **Score impact**: +800
- **Dependencies**: [10.1]
- **Real example**: Q4 Playbook waitlist on /process is owned-audience capture. Future newsletter for r3loop entity.

---

# PART 3 — Cross-Reference Matrix

## Step → Categories improved

| Step | Categories primarily improved |
|---|---|
| 01 Diagnose | (foundational — affects all) |
| 02 Map | 3 (Audience Qualification) · 10 (Distribution Muscle) |
| 03 Standardize | 1 (Positioning Clarity) · 2 (IP Definability) · 6 (Anti-Time POV) |
| 04 Build | 5 (Conversion Path) · 7 (Visual / Brand Craft) |
| 05 Govern | 5 (Conversion Path) · 9 (Productization Readiness) |
| 06 Ship | 4 (Proof Density) · 8 (Technical SEO & GEO) |
| 07 Measure | 4 (Proof Density) · 10 (Distribution Muscle) |
| 08 Iterate | 2 (IP Definability) · 9 (Productization Readiness) · 10 (Distribution Muscle) |

## Category → Primary step to improve it

| Category | Primary step to fix |
|---|---|
| 1. Positioning Clarity | 03 Standardize |
| 2. IP Definability | 03 Standardize |
| 3. Audience Qualification | 02 Map |
| 4. Proof Density | 06 Ship + 07 Measure |
| 5. Conversion Path | 04 Build |
| 6. Anti-Time POV | 03 Standardize |
| 7. Visual / Brand Craft | 04 Build |
| 8. Technical SEO & GEO | 06 Ship |
| 9. Productization Readiness | 05 Govern + 08 Iterate |
| 10. Distribution Muscle | 02 Map + 07 Measure |

---

# PART 4 — Scoring Framework

## Score calculation per category

```
category_score = baseline (0) + sum(prompt.score_impact * pass_status)

where pass_status ∈ {0, 0.5, 1.0}:
  0 = fails diagnostic
  0.5 = partial (some criteria met)
  1.0 = full pass

max score per category = sum(all prompt.score_impact) ≈ 10000
```

## Score delta tracking

```
snapshot_v1 = {
  category_scores: { 1: 7400, 2: 7400, ... },
  total: 92560,
  prompts_passed: ['1.1', '1.3', '2.2', ...],
  prompts_failed: ['1.4', '6.4', '9.1', ...]
}

snapshot_v2 = (after applying prompts) = {
  category_scores: { 1: 9200, 2: 8400, ... },
  total: 94890,
  delta_vs_v1: +2330,
  prompts_newly_passed: ['1.4', '6.4', '9.1'],
  changes_applied: ['mobile_h1_fix', 'productization_scaffold', 'waitlist_form']
}
```

## Total site score formula

```
site_score_total = sum(category_scores) / 10
ranges from 0 to 10000

solo_benchmark = site_score_total scaled relative to solo design partner peers:
  9000+ = top 1-2% solo
  7500+ = top decile solo
  5000 = median solo
  2500 = below median
```

---

# How to use this spec

## For AI Diagnostic Tool
1. User pastes URL or content
2. Tool runs all 50 prompts against user's product
3. Each prompt fires its agent_prompt against user's content
4. Returns scores per category + recommended fixes
5. Compares to previous snapshot if exists → delta

## For Q4 Playbook content
- Part 1 (steps) = methodology chapters
- Part 2 (prompts) = exercises/diagnostics per chapter
- Part 3 (cross-ref) = quick reference appendix
- Part 4 (scoring) = self-assessment framework

## For r3loop Cloud SaaS
- Steps become workflow definitions
- Prompts become AI agent prompts in step pipelines
- Scoring becomes user-facing dashboard
- Cross-ref becomes navigation taxonomy

---

**Spec version**: v2.0 (machine-executable, June 2026)
**Source of truth**: Battle-tested via real product work on r352.com
**Next iteration v3**: Add per-vertical specialization (multi-location, SaaS, brand launch, real estate, retail)
