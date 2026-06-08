# r3loop Diagnostic — Prompt Library v1

50 prompts across 10 categories, each mapped to r3loop step.
Battle-tested through real product work on r352.com (June 2026).

Format per prompt:
- **Diagnostic** — the question that surfaces the problem
- **Action** — the concrete fix
- **Real example** — how this played out in actual practice

---

## CATEGORY 1 — Positioning Clarity
**Primary r3loop step**: 03 Standardize · **Secondary**: 02 Map

### 1.1 The 5-second test
**Diagnostic**: Paste your hero H1 + tagline + sub-line into a fresh chat with someone who's never seen your work. Ask them: *"Who is this person, who is it for, and what makes it different?"* — can they answer in 5 seconds without scrolling?
**Action**: If they hesitate on ANY of the three, your positioning is too abstract. Rewrite until: WHO (tagline) → WHAT (H1) → DIFFERENT (sub-line) reads as a coherent thread, not three competing claims.
**Real example**: r352 tagline "STRATEGIC DESIGN PARTNER" + H1 "Strategic design partner. For growing brands." — initially identical (redundant). Fixed by making tagline = identity, H1 = audience qualifier. Coherent thread, not echo chamber.

### 1.2 Tagline-H1 redundancy audit
**Diagnostic**: Read your tagline. Then read your H1. Do they say the same thing?
**Action**: If yes, sharpen one to be CLAIM (POV statement) and the other to be CATEGORY (who you are). They should complement, not duplicate. Tagline can carry identity; H1 should carry differentiated outcome.
**Real example**: We had "STRATEGIC DESIGN PARTNER" (tagline) and "Strategic design partner. For growing brands." (H1) — pure redundancy. The fix: tagline holds identity, H1 should ALSO carry POV (anti-time-for-money) for second-level meaning.

### 1.3 Audience qualifier visibility
**Diagnostic**: Under your H1, can a visitor self-identify in 3 seconds? "Growing brands" or "B2B teams" is too broad.
**Action**: Add 4-6 audience chips with specific filters (Multi-location, Multi-product, SaaS, Brand launch, Post-PMF, etc.). Use tooltips on hover for definition depth.
**Real example**: Home hero had "For growing brands" — too broad. Added 5 chips + 1 capability chip ("AI Elevated Workflows") with motion-tooltips. Instant self-identification.

### 1.4 Mobile typography stress test
**Diagnostic**: Open your homepage on 375px viewport (iPhone SE). Does the H1 word-break ("growin" / "g brands.") or wrap weirdly?
**Action**: Force explicit `<br/>` line breaks in title_mobile string. Reduce font-size 48px → 40px. Set leading-[0.76] for tight stack. Kill text-balance (causes re-flow with word breaks).
**Real example**: H1 was breaking "growing brands" into "growin / g brands." Fixed with 4-line explicit stack + smaller font + tighter leading. Mobile word-break gone.

### 1.5 Three-word category test
**Diagnostic**: Describe what you do in 3 words. Can you?
**Action**: If you need more than 3 words, you haven't named your category yet. Solo design partners who own a category compress to: "Design ops methodology", "Brand operating system", "AI loop architecture". Your category claim should fit on a chip.
**Real example**: r352 evolved from "Design ops & delivery systems built to scale" → "Strategic design partner" → eventually "Loop architecture for design ops". Each compression sharpened position.

---

## CATEGORY 2 — IP Definability
**Primary r3loop step**: 03 Standardize · **Secondary**: 08 Iterate

### 2.1 IP convergence check
**Diagnostic**: Do you have multiple competing methodology brands/pages? (e.g., "Framework" + "Methodology" + "Process" — three names for similar things)
**Action**: Pick ONE. Kill the rest. Don't create "master IP + slice" layering — flatten to a single brand with consistent narrative. Convergence noise dilutes both.
**Real example**: Spent a full day differentiating Framework (master IP) vs r3loop (slice). Conclusion: r3loop has 3 years of refinement + client citations + own brand mark. Framework was 24h old abstraction. Killed Framework. r3loop owns the methodology category alone now.

### 2.2 Methodology checklist (4 tests)
**Diagnostic**: Does your IP have all four: (a) a NAME, (b) a STRUCTURE (e.g., 8 steps), (c) DECISION CRITERIA per step, (d) MEASURABLE OUTPUTS per step?
**Action**: If any missing, your "methodology" is talking points — not IP. Productizable IP needs all 4. Without structure: it's intuition. Without decision criteria: it can't be taught. Without measurable outputs: it can't be sold.
**Real example**: r3loop has all 4 (name + 8 steps + decision criteria + KPIs). That's why it's productizable as Q4 Playbook (€1500-2000). "Strategic design" by itself isn't IP — r3loop is.

### 2.3 Client-citation test
**Diagnostic**: Would your past clients cite your methodology BY NAME in a testimonial? Search their LinkedIn/blog/case studies — do they reference your branded process?
**Action**: If clients don't cite you by name, your IP isn't real IP yet. Either (a) give it a memorable name, (b) start using the name in every engagement, (c) ask clients to reference it in their public materials.
**Real example**: Sonova, Archicom, Geers cite r3loop in case study materials. That's 3-year compound effect of consistent naming. Framework didn't have this — was too new to be cited.

### 2.4 Productization probe
**Diagnostic**: Can you write a 50-page playbook FROM your methodology that someone could buy and use without you?
**Action**: If no, you don't have IP — you have intuition. Document everything. Output contracts per step. Decision gates. KPIs. Prompts. Templates. If it can't be productized, it can't scale beyond your time.
**Real example**: Q4 r3loop Playbook is becoming reality (~58 pages + 12 templates + 8 case minis) BECAUSE r3loop is structured enough to extract from your head into static doc.

### 2.5 The "borrowed authority" smell test
**Diagnostic**: Does your IP positioning rely on borrowing terms from elsewhere (DesignOps, Operations, Operating System) without adding distinctive vocabulary?
**Action**: Build proprietary vocabulary inside your IP. r3loop has: "decision gates", "output contracts", "presence drops 90→15%". These are YOUR terms, not borrowed. Proprietary vocabulary creates moat.
**Real example**: We added a /glossary page with DefinedTerm schema for 14 distinctive terms. SEO + GEO benefit. LLMs cite you when they have your terms defined.

---

## CATEGORY 3 — Audience Qualification
**Primary r3loop step**: 02 Map · **Secondary**: 04 Build

### 3.1 Role-based personas (not team types)
**Diagnostic**: Do you have NAMED roles (Founder/CEO, Brand owner, Multi-location ops leader) with one-sentence specific positioning? Or just team types (marketing teams, design teams)?
**Action**: Replace team types with 6 explicit roles. Each gets: role title (lime label) + 1-sentence pattern "You're [situation] — you want [outcome]." This converts 2x better than team types.
**Real example**: /process "Who this is for" had flat list of team types. Migrated 6-persona role-based format from Framework. Each persona reads as recognition statement to the right buyer.

### 3.2 "When this is too much" qualifier
**Diagnostic**: Do you have an explicit "When this is too much" / "Not a fit when" section that filters wrong-fit buyers?
**Action**: Add 1-paragraph qualifier listing the scenarios where your offer is the WRONG choice (one-off banner, single landing page, low strategic stakes). Filtering wrong-fit upfront saves both sides 30-min discovery calls.
**Real example**: /process and /framework both had "When this is too much" qualifier. Strongest disqualifier: "If you only need a one-off banner, this is probably too much." Honest disqualification builds trust.

### 3.3 Self-identification chips
**Diagnostic**: Can a buyer arriving at your homepage IDENTIFY themselves as in-target (or out) in 5 seconds?
**Action**: Add 4-6 audience chips under H1: vertical filters (Multi-location, SaaS), maturity filter (Post-PMF & scaling), capability claim (AI Elevated Workflows). Tooltips for definitions.
**Real example**: Home hero added 6 chips total (5 audience + 1 capability) separated by visual divider. Group 1 = WHO we serve. Group 2 = WHAT we do. Both filter visitor in 5 seconds.

### 3.4 The "single brand" filter
**Diagnostic**: Is your audience clearly bounded by ONE attribute (multi-location? SaaS? Series A+?) or are you trying to serve everyone?
**Action**: Pick ONE primary attribute. Everyone else is secondary. r352 leads with multi-location (Sonova, Benefit, Geers), secondary expands to SaaS / brand launch / Post-PMF.
**Real example**: Hero chip ordering goes Multi-location FIRST (primary audience), then expands. Makes Geers' 60+ studios the anchor case study, not Caterelo's SaaS work.

### 3.5 Segmented intake test
**Diagnostic**: Does your /brief or contact form route DIFFERENT buyers (founder vs ops leader vs brand owner) through different question flows?
**Action**: Use query param routing (e.g., `/brief?segment=fitness-wellness`) and conditional question logic. Founder needs different questions than ops leader. Generic intake → generic leads.
**Real example**: /industries pages route to `/brief?segment=<slug>` so intake wizard pre-routes by vertical. Same form, different first-question framing per audience.

---

## CATEGORY 4 — Proof Density
**Primary r3loop step**: 06 Ship · **Secondary**: 07 Measure

### 4.1 The "two-proof minimum"
**Diagnostic**: How many concrete case studies with HARD METRICS are visible on your methodology page? One = anecdote. Two = pattern. Zero = theory.
**Action**: Show at least 2 case studies with 3 measurable metrics each. Different dimensions (e.g., one shows SCALE, another shows DURATION). Two proofs on different axes = broader pattern.
**Real example**: /process now has Geers (SCALE — 60+ studios, 3× faster approvals) + Kubota (DURATION — 3+ years retainer, IPO debut). Two dimensions of proof.

### 4.2 Metric specificity audit
**Diagnostic**: Replace each vague metric ("faster delivery", "better quality") with concrete numbers. Can you?
**Action**: If you can't say "3× faster approvals" or "80% briefs first-round" or "15% time after stabilization" — your proof isn't real proof. Get concrete numbers from clients or estimate honestly. Vague metrics = soft positioning.
**Real example**: Geers proof block uses 3× / 80% / 15% — these are real numbers. Tile design makes them giant + lime. Numbers are quotable for LinkedIn arc + cold outreach.

### 4.3 Named clients > generic examples
**Diagnostic**: Does your case study use NAMED clients ("Sonova / Geers — 60+ studios") or generic descriptions ("a multi-location marketing team")?
**Action**: Replace ALL generic descriptions with specific named clients. If under NDA, use "Major hearing-care network across 17 markets" — still specific. Generics dilute, names create credibility.
**Real example**: Originally /process had "Multi-location marketing team" as example use case. Replaced with named Geers + Kubota cases. Credibility lift 10x.

### 4.4 r3loop step traceability
**Diagnostic**: In each case study, can you explicitly state WHICH r3loop steps were applied?
**Action**: Add a single sentence: "Steps 02-03 (Map → Standardize) defined the workflow; steps 06-08 sustained delivery for 3 years." Makes methodology visible as APPLICABLE not abstract.
**Real example**: Geers case mentions "Steps 02-03 (Map → Standardize) classified the workflow." Kubota mentions "Steps 03-08 sustained across 3 years." Methodology becomes traceable.

### 4.5 Proof axis diversification
**Diagnostic**: Do your 2-3 proofs cover DIFFERENT dimensions, or are they all similar shapes? (e.g., 3 case studies all showing "faster approvals" = redundant)
**Action**: Diversify proof axes: SCALE (locations), DURATION (years), DOMAIN (verticals), IP (own products), TRANSFORMATION (before/after operating model).
**Real example**: r352 portfolio has SCALE (Geers, Benefit), DURATION (Kubota), IP (Caterelo, regional.fit own products), enterprise (UNIQA, FIFA). Each axis tells a different proof story.

---

## CATEGORY 5 — Conversion Path Design
**Primary r3loop step**: 04 Build · **Secondary**: 05 Govern

### 5.1 Decision-fatigue test
**Diagnostic**: Paste your /services page. Can a buyer pick the right engagement model in 30 seconds?
**Action**: If decision is unclear, add a Mapping Matrix. Each engagement model gets a "Best for" row listing product types. Sprint → Brand System launch. Retainer → Always-On Communication. Etc. Buyer self-matches in 5 seconds.
**Real example**: /services Engagement Models had 5 models × ~50 words each = decision fatigue. Added Pairing Matrix below — engagement on left, products on right. Buyer reads matrix in 30 seconds.

### 5.2 Multi-CTA hierarchy audit
**Diagnostic**: Count CTAs above the fold on home. Less than 2? Under-converting. More than 4? Decision paralysis.
**Action**: Aim for 2-3 CTAs with clear hierarchy: primary action (Start brief), secondary (Book call), tertiary (mailto). Same logic per page below the fold.
**Real example**: Hero has 2 primary CTAs (Start a brief, Book a call) + tertiary mailto link. 3 levels of commitment, each routes to different conversion paths.

### 5.3 Density-to-depth balance via chip-tooltips
**Diagnostic**: Do your service cards have 4-6 bullets visible? If yes, density is killing scanability.
**Action**: Apply chip-tooltip pattern. Each bullet becomes a 2-3 word chip; full sentence revealed on hover. Premium motion + glass tooltip + arrow pointer. Reduces visible content 70%, zero info loss.
**Real example**: /services engagement model cards had 4-bullet "How it works" + 2-bullet "Ideal when". Refactored to chip-tooltip rows. ~74% visible content reduction. Same info available on hover.

### 5.4 Mobile fallback for hover-dependent UX
**Diagnostic**: Your chip-tooltip pattern only works on desktop (no hover on mobile). What do mobile users see?
**Action**: Either (a) render full bullets on mobile (`md:hidden`), keep chips on desktop, or (b) tap-to-reveal popover on mobile, or (c) accept 40-60% of mobile users see only labels — and monitor conversion data.
**Real example**: We shipped chip pattern on desktop without mobile fallback. Decision: ship-and-monitor for 2-3 weeks before building mobile fix. If mobile bounce >20% baseline = build fallback.

### 5.5 Segmented vs generic intake
**Diagnostic**: Does your intake wizard route different verticals (fitness, real estate, retail, SaaS) through different first-question flows?
**Action**: Add `?segment=<vertical>` query param routing. Pre-populate first question + skip irrelevant ones based on segment. Generic intake = generic leads.
**Real example**: /industries pages all route to `/brief?segment=<slug>` with industry-specific framing. Pre-routing improves intake completion rate.

---

## CATEGORY 6 — Anti-Time POV Strength
**Primary r3loop step**: 03 Standardize · **Secondary**: 05 Govern

### 6.1 Anti-hourly POV visibility
**Diagnostic**: Do you have a visual/quote/claim that EXPLICITLY rejects time-for-money model? If not, you're lumped with hourly consultants by default.
**Action**: Add one of: (a) Operating Model graph showing your presence dropping over time, (b) "I sell systems not hours" closer in About, (c) productized pricing that signals not-hourly (€2k Diagnostic vs $200/hr).
**Real example**: /process has Operating Model graph (90% Diagnose → 15% Iterate). Visual makes anti-time POV undeniable. Quote backup: "Methodology you sell should survive your own use."

### 6.2 Operating Model proof
**Diagnostic**: Can you show HOW your presence decreases over time as the system takes over? Or are you indispensable forever?
**Action**: Create a table or graph: each methodology step → your presence % → role at that step. Architect → Director → Strategic overseer. Buyer sees system maturity not just labor.
**Real example**: 8-row Operating Model table on /process: step 01 Diagnose = 90% (architect), step 08 Iterate = 15% (strategic overseer). Lime fill bars visualize presence drops.

### 6.3 Methodology survival sentence
**Diagnostic**: Complete this sentence: "My methodology runs without me because ___."
**Action**: If you can't complete it, your methodology is consultancy theater. Real IP survives because: documented + decision criteria + KPIs + handoff plans + client team trained.
**Real example**: r3loop survives because: (a) every step has decision criteria, (b) every step has measurable KPIs, (c) clients are trained, (d) AI agents can run between gates.

### 6.4 Productization signal
**Diagnostic**: Do you have a paid product (or waitlist) that signals the methodology exists outside your direct involvement?
**Action**: Add Q4 Playbook waitlist on methodology page. Even if it doesn't launch for 6 months, the existence of "you can buy the methodology without buying my time" anchors anti-hourly positioning.
**Real example**: Added Q4 r3loop Playbook scaffold on /process between qualifier and closing CTA. Founding €1500 vs Standard €2000 — anchors that methodology has value outside Reszek's time.

### 6.5 Hidden pricing as positioning
**Diagnostic**: Are your hourly/daily rates visible on /services?
**Action**: Hide pricing tactically. Don't show €/hour or €/day. Productized pricing (€2k Diagnostic, €7k/mo Retainer) signals "I sell outcomes not time". Hourly rates anchor to hourly mindset.
**Real example**: Pricing on r352 lives only on /faq and /glossary, not /services engagement cards. Strategic — allows pricing optionality between PL and international markets without locking in.

---

## CATEGORY 7 — Visual / Brand Craft
**Primary r3loop step**: 04 Build · **Secondary**: 06 Ship

### 7.1 Motion language consistency
**Diagnostic**: Do all your animations use the SAME easing curve? Or is it linear here, ease-out there, custom there?
**Action**: Pick ONE easing curve site-wide. Standardize. Tanker-style sites use [0.22, 1, 0.36, 1] (smooth out, snappy in). Apply to all enter/exit/scroll animations. Inconsistent eases = amateur signal.
**Real example**: r352 uses [0.22, 1, 0.36, 1] for PageTransition + Reveal + Chip tooltips + Scroll animations. Consistency makes the site feel like one motion language.

### 7.2 Premium tooltip test
**Diagnostic**: When user hovers a chip/term, what tooltip do they see? Plain CSS box? Or cinematic motion+glass effect?
**Action**: Upgrade to framer-motion tooltip with: fade + slide 8px + scale 0.96→1 + blur 6px→0. Glass effect via backdrop-blur-xl. Lime gradient hairline accent. Arrow pointer. Reads premium not Bootstrap-cheap.
**Real example**: Chip tooltips on /process and home hero use this exact pattern. Cinematic feel matches site-wide motion language.

### 7.3 Mobile word-break audit
**Diagnostic**: Open homepage on 375px viewport (iPhone SE). Does H1 word-break ("growin" / "g brands.")?
**Action**: Add explicit `<br/>` in title_mobile string. Force 4-line stack. Reduce font-size 48px → 40px. Set leading-[0.76]. Kill text-balance.
**Real example**: H1 was breaking "For growing brands" badly on mobile. Fixed with explicit breaks + smaller font + tighter leading.

### 7.4 Visual identity coherence
**Diagnostic**: Do all surfaces of your brand (header avatar, chatbot icon, About portrait) use the SAME visual identity?
**Action**: If chatbot has lime+silhouette and About has photo, brand is fractured. Use ONE identity element scaled up/down. Reszek's lime+silhouette appears on chatbot (small) and /philosophy About (420px).
**Real example**: /philosophy About uses same lime+silhouette avatar as Chatbot (scaled from icon to 420px portrait). Brand coherence between surfaces.

### 7.5 No-face brand statement
**Diagnostic**: Are you using a face photo because it's expected, or because it serves your positioning?
**Action**: If "no face" is strategic differentiator (anti-influencer, work-speaks-for-itself), reframe portrait with EXPLICIT brand statement caption. "The work speaks. I don't have to." converts placeholder into intentional positioning.
**Real example**: /philosophy About uses lime+silhouette portrait with overlay caption "The work speaks. I don't have to." Reframes anti-face as deliberate brand position.

---

## CATEGORY 8 — Technical SEO & GEO
**Primary r3loop step**: 06 Ship · **Secondary**: 07 Measure

### 8.1 Schema completeness audit
**Diagnostic**: Do your methodology pages have HowTo schema? Glossary pages have DefinedTerm schema? FAQ pages have FAQPage schema?
**Action**: Audit each major page type for appropriate structured data. Without it, LLMs (Claude/GPT/Gemini) can't cite you correctly. JSON-LD blocks reflect on-page content.
**Real example**: /process has HowTo schema (8 r3loop steps). /glossary has DefinedTermSet (14 terms). /faq has FAQPage (5 Q&A). GEO-ready.

### 8.2 llms.txt presence
**Diagnostic**: Do you have a /llms.txt file with curated content for LLM crawlers?
**Action**: Create /public/llms.txt with: brand description + key methodology terms + top URLs to crawl. This is the new SEO of 2026. Old robots.txt is incomplete without llms.txt.
**Real example**: r352 has /llms.txt set up early. Curated for r3loop methodology + key vocabulary + canonical URLs.

### 8.3 Redirect discipline
**Diagnostic**: When you delete a page, do you 301 redirect to its successor?
**Action**: Every deleted URL needs a 301 redirect. Configure in vercel.json (or hosting equivalent). Killing pages without redirects loses years of link equity instantly. Search rankings + LinkedIn shares + backlinks all break.
**Real example**: Deleted /framework page. Added 301 redirect /framework → /process in vercel.json. Preserved any inbound link equity, search authority, LinkedIn share cache.

### 8.4 WebP image migration
**Diagnostic**: Are your hero images WebP (not PNG/JPG)? PNG = 4x slower load on mobile = -20% conversion.
**Action**: Convert all hero/heavy images to WebP at 80% quality. Visually identical, 75% smaller. Use `loading="lazy"` for below-fold images.
**Real example**: All r352 hero images + case study covers migrated to WebP. Favicon family too. Result: mobile load <2s.

### 8.5 Sitemap accuracy
**Diagnostic**: Does your sitemap.xml reflect ACTUAL pages live on site? When you add/remove pages, do you update?
**Action**: Sitemap must be canonical. When deleting page, remove from sitemap + 301 redirect URL. When adding page, add entry. Outdated sitemaps confuse crawlers and waste crawl budget.
**Real example**: Deleted /framework → removed from sitemap.xml. Added /process Operating Model + Kubota proof — no sitemap change needed (URL unchanged). Discipline matters.

---

## CATEGORY 9 — Productization Readiness
**Primary r3loop step**: 05 Govern · **Secondary**: 08 Iterate

### 9.1 Waitlist live check
**Diagnostic**: Do you have a paid product launch on roadmap? If yes, is there a waitlist capture LIVE on site collecting emails RIGHT NOW?
**Action**: Add waitlist form to your methodology page. Email capture + Plausible event + mailto fallback (until ESP wired). Every week without waitlist = ~30 lost early-access subscribers.
**Real example**: Q4 r3loop Playbook waitlist live on /process from June 2026. Founding price €1500 first 100, then €2000. Starts capturing 3 months before launch.

### 9.2 Founding vs standard price anchoring
**Diagnostic**: When you tease an upcoming paid product, do you show founding price vs standard launch price?
**Action**: Display "€1500 (first 100) · €2000 standard launch" with strikethrough on the higher number. Creates urgency without forcing decisions. Anchors that early-access is special.
**Real example**: Q4 Playbook section shows €1500 founding price highlighted, €2000 standard launch in strikethrough dim. Visual urgency.

### 9.3 Productization filter test
**Diagnostic**: Write this sentence: "For teams that don't need us in the room — they need a system we can hand off." Does your offer match this audience?
**Action**: If you can't honestly say yes, your "product" is still consulting in disguise. Productization means: documented + decision criteria + KPIs + handoff plans + AI prompts. Tested by: someone NEW can use it.
**Real example**: r3loop Playbook tagline literally states "For teams that don't need us in the room — they need a system we can hand off." Filters non-fit (people wanting consulting) from fit (people wanting product).

### 9.4 8-item value visibility
**Diagnostic**: When announcing a paid product, do you show ~8 concrete inclusions in a grid?
**Action**: Replace vague descriptions ("comprehensive playbook") with specific inventory: 8 steps deep dive, output contracts per step, decision gates + KPIs, brief templates, quality review checklists, AI prompt library, governance frameworks, case studies in depth.
**Real example**: Q4 Playbook section uses 2-col grid with 8 "What's inside" items. Each is specific, scannable, concrete. Buyer counts value before pricing.

### 9.5 r3loop step productization mapping
**Diagnostic**: Can each step of your methodology be productized independently?
**Action**: Map each step to a potential standalone product. r3loop Diagnose → workflow audit SaaS. Standardize → AI Brief Assistant SaaS. Measure → KPI dashboard. Productization atomized = multiple revenue lines.
**Real example**: r3loop steps map to: Diagnose (audit tool), Standardize (Brief Assistant SaaS in pipeline), Measure (dashboard). Each could be standalone SaaS over time.

---

## CATEGORY 10 — Distribution Muscle
**Primary r3loop step**: 02 Map · **Secondary**: 07 Measure

### 10.1 Content cadence audit
**Diagnostic**: Do you publish AT LEAST 1 POV-led post per week on LinkedIn or your channel?
**Action**: Set a non-negotiable cadence: 1 POV post/week minimum, 2-3 posts ideal. Inconsistent posting = no distribution muscle. Top solos post 2-3x/week MINIMUM.
**Real example**: r3loop entity planned for LinkedIn arc — 2 posts/week × 8 weeks = 16 posts to establish thought leadership before Q4 launch.

### 10.2 POV vs tutorial mix
**Diagnostic**: What % of your posts are "how-to" tutorials vs "why my POV" claims?
**Action**: Aim for 70% POV / 30% tutorial. Tutorials build SEO. POV builds authority + leads. POV is harder but compounds faster. "Here's why we're wrong about X" >> "Here's how to do Y."
**Real example**: r3loop content arc starts with POV post (response to Boris Cherny "I write loops not prompts"). Anchors r3loop as loop architecture. POV-first establishes category ownership.

### 10.3 First-mover monitoring
**Diagnostic**: When industry leaders make a category-defining claim, do you respond within 24h with your prior work?
**Action**: Set up alerts (Slack, RSS, Twitter) for thought leaders in your space. When they claim a new category, respond with your prior work. Boris Cherny says "I write loops not prompts" → claim r3loop = loop architecture WITHIN 24H.
**Real example**: Boris Cherny posted "I write loops not prompts" — Reszek's response post claims r3loop = loop architecture since 2022. First-mover within 24h captures wave momentum.

### 10.4 Channel concentration
**Diagnostic**: Are you on 1-2 channels MAXIMUM (LinkedIn + email)?
**Action**: Spread across 5+ channels = no compounding. Pick 1-2 channels, dominate, expand later. LinkedIn + email newsletter is the canonical solo combo. Twitter optional for tech-adjacent audience.
**Real example**: r352 distribution focuses on LinkedIn (Reszek's personal brand) + email (Q4 Playbook waitlist). Two channels, dominated, before expanding.

### 10.5 Audience asset accumulation
**Diagnostic**: Where do your subscribers / followers live? Can you contact them directly if LinkedIn algorithm changes?
**Action**: Newsletter is your OWNED audience asset. LinkedIn followers are RENTED. Migrate engaged followers to newsletter via lead magnets (Q4 Playbook waitlist, free diagnostic). Algorithm changes don't kill owned audience.
**Real example**: Q4 Playbook waitlist on /process is owned-audience capture. Plus future newsletter for r3loop entity. Build owned asset, rent attention from LinkedIn.

---

## How to use this library

### As Q4 Playbook content
- Direct content for the paid playbook
- Each prompt becomes a chapter section
- Group by category, organized by r3loop step navigation

### As Diagnostic Tool prompts
- AI agent uses these as analysis criteria
- For each prompt: AI checks user's product against the diagnostic
- Returns score (1-10000 per category) + which prompts to apply

### As Notion knowledge base
- Searchable by category OR r3loop step
- Tag system: #step03, #standardize, #positioning, #anti-hourly
- Cross-reference between prompts

### As LinkedIn content seeds
- Each prompt = 1 LinkedIn post idea
- POV format: "Most solos fail on prompt X. Here's why."
- 50 prompts = ~6 months of weekly content

---

**Document state**: V1 draft, 50 prompts written. Battle-tested via real product work on r352.com over a 2-day intensive session.

**Next iteration**: V2 should add prompts for specific industries (multi-location ops, SaaS pre-PMF, brand launches) and prompts for specific deliverable types (case studies, pricing pages, sales decks).
