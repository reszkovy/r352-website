Implementation Brief: Engagement Models Section

## Where This Goes

New section on `/services` page, placed **between the "Products" section and the "Best fit" section**. This section answers the question every prospect has after seeing the products: "Ok, but how does working with you actually look?"

Section name: **"How we work together"**

---

## Current /services Page Structure

```
1. Page header ("Services / What we ship")
2. How we deliver (3 pillars — Operating System, Design & Production, Build & Optimize)
3. Products (6 accordion items — Brand System through Multi-Location Asset System)
4. [NEW SECTION GOES HERE] → "How we work together"
5. How we deliver (3 steps — intake, QA, cadence)
6. Best fit (3 bullet points)
7. CTA ("Ready to start a project?")
```

---

## Section Design

### Header
- Label: `ENGAGEMENT MODELS` (11px, uppercase, letter-spacing 2px, color #D4FF00)
- Heading: `How we work together` (same style as "How we deliver" heading — large, bold, white)
- Subtext: `Three ways to engage — depending on where you are and what you need.` (15px, color #888, max-width 600px)

### Layout
Three cards in a horizontal grid (3 columns on desktop, stacked on mobile). Each card has:
- Model number (01, 02, 03) in accent green monospace
- Model name (h3, white, bold)
- One-line positioning statement (muted gray)
- "How it works" — 3-4 bullet points describing the process
- "Timeline" — expected duration
- "Ideal when" — qualifier for self-selection
- "Starts with" — first step / entry point

Card styling: background #141414, border 1px solid rgba(255,255,255,0.08), border-radius 8px, padding 32px. On hover: border-color rgba(212,255,0,0.3).

Grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;`

---

## Content

### 01 — Sprint

**Positioning:** A focused engagement with a clear start, scope, and finish.

**How it works:**
- We define the problem and deliverables upfront
- Fixed scope, fixed timeline — no open-ended retainers
- You get a complete deliverable at the end, not a pitch deck
- Handoff includes everything your team needs to run it forward

**Timeline:** 2–6 weeks depending on scope

**Ideal when:**
- You need a brand system, campaign toolkit, or website — and you know what you need
- You have a launch date and need to ship on time
- You want to test working with us before committing long-term

**Starts with:** A scoping call where we define deliverables, timeline, and decision owners.

**Products that fit this model:**
Brand System, Campaign Toolkit, Website Launch, Digital Product UX

---

### 02 — Retainer

**Positioning:** Ongoing design and production capacity on a predictable monthly rhythm.

**How it works:**
- Monthly capacity reserved for your team
- We work from a shared backlog — you brief, we produce, QA, deliver
- Predictable cadence: weekly or biweekly drops, depending on volume
- Includes intake management, QA, and iteration — not just execution

**Timeline:** Monthly rolling — minimum 3 months recommended for system benefits to kick in

**Ideal when:**
- You have constant production needs across channels (social, ads, email, print)
- You want a design partner embedded in your rhythm, not a vendor you re-onboard every quarter
- You need consistency and speed without hiring a full in-house team

**Starts with:** A diagnostic sprint (1–2 weeks) where we audit your current workflow, set up intake, and define the delivery cadence.

**Products that fit this model:**
Always-On Communication, Multi-Location Asset System, Campaign Toolkit (ongoing)

---

### 03 — Diagnostic

**Positioning:** A short, structured audit that shows you exactly where delivery breaks down — before you commit to building anything.

**How it works:**
- We map your current delivery workflow end-to-end: brief → approval → production → publish
- We identify bottlenecks, unclear ownership, QA gaps, and wasted loops
- You get a written report with root causes and a prioritized action plan
- No commitment to build — you can run the fixes yourself or engage us for the next phase

**Timeline:** 1–2 weeks

**Ideal when:**
- You feel delivery is slow but can't pinpoint why
- You're about to scale (new markets, more locations, bigger team) and want to fix the system before it breaks
- You want data before making a decision about hiring, tooling, or outsourcing

**Starts with:** A 60-minute kickoff where we interview key stakeholders and request access to your current workflows.

**Deliverable:** Delivery Workflow Audit — bottleneck map, root cause analysis, and prioritized recommendations.

---

## Additional Element: Comparison Strip

Below the three cards, add a minimal comparison strip — not a full pricing table, but a quick-scan reference:

```
                    Sprint              Retainer            Diagnostic
Timeline            2–6 weeks           Monthly rolling     1–2 weeks
Scope               Fixed               Flexible            Fixed
Best for            Ship one thing       Ongoing production  Find the problem
Entry point         Scoping call         Diagnostic sprint   60-min kickoff
```

Styling: simple table or horizontal grid, 13px, muted text, no heavy borders. Accent green on column headers. Background transparent or subtle card bg.

---

## CTA at Bottom of Section

After the comparison strip, add a single CTA block:

**Text:** `Not sure which model fits? Start with a conversation — we'll help you figure it out.`
**Button:** `Schedule a call` (same style as existing CTAs — chartreuse background, dark text, uppercase)

---

## Design System Reference

```
Card background:     #141414
Card border:         1px solid rgba(255,255,255,0.08)
Card border hover:   1px solid rgba(212,255,0,0.3)
Card border-radius:  8px
Card padding:        32px

Section label:       11px, uppercase, letter-spacing 2px, #D4FF00
Section heading:     Same as "How we deliver" — large, bold, white
Subtext:             15px, #888, max-width 600px

Model number:        13px, monospace, #D4FF00
Model name:          22px, font-weight 600, #e5e5e5
Positioning line:    14px, #888
Bullet items:        14px, #e5e5e5, green dot bullet (4px, #D4FF00)
"Timeline" label:    11px, uppercase, letter-spacing 1px, #D4FF00
"Timeline" value:    14px, #e5e5e5
"Ideal when" label:  11px, uppercase, letter-spacing 1px, #D4FF00
"Ideal when" items:  13px, #888

Comparison strip:    13px, #888 for values, #D4FF00 for headers
```

---

## Light Mode Compatibility

In light mode:
- Card background → #ffffff
- Card border → 1px solid rgba(0,0,0,0.08)
- Card border hover → 1px solid rgba(150,180,0,0.4)
- Text colors invert as per existing site theme toggle
- Accent green (#D4FF00) stays — ensure sufficient contrast on white (may need darker green variant for light mode text labels)

Use CSS custom properties if the site already uses them for theme switching.

---

## What NOT to Change

- Do not modify existing sections on /services
- Do not add pricing or monetary values — this is about engagement structure, not cost
- Do not change the order of existing sections — insert this new section between Products and the delivery steps
- Do not remove the existing "How we deliver" steps (01 Clear intake, 02 QA, 03 Steady cadence) — those describe process, this new section describes engagement models. They coexist.
