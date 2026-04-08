## Problem

The `/services` page currently has too much content and repeats information. There are two separate "How we deliver" sections — one showing 3 delivery pillars (Operating System, Design & Production, Build & Optimize) and another showing 3 process steps (Clear intake, QA, Steady cadence). This creates confusion and cognitive overload. The page needs to be simplified.

---

## Current Page Structure (what exists now)

```
1. Page header
   - Label: "SERVICES"
   - Heading: "What we ship"
   - Subtext: "Brand, campaigns, and web - delivered with a quality bar, QA, and a steady cadence."

2. "How we deliver" section (PILLARS) ← REMOVE THIS
   - Left side: heading "How we deliver" + two tags ("Backed by structured processes", "Elevated by AI-powered execution")
   - Left side: "Approach" box with text
   - Right side: 3 numbered pillars:
     - 01 Operating System (Delivery, Intake, QA Standards, Governance + "You get:" list)
     - 02 Design & Production (Product UX/UI, Campaign Toolkits, Motion, Art Direction + "You get:" list)
     - 03 Build & Optimize [OPTIONAL] (Implementation, Performance, CMS, Handoff + "You get:" list)

3. "Products" section ← KEEP & IMPROVE
   - 6 products as accordion items, each with pillar tag badges:
     - Brand System [02 DESIGN & PRODUCTION] — currently expanded with Includes list + Output box
     - Campaign Toolkit [02 DESIGN & PRODUCTION] — collapsed
     - Always-On Communication [01 OPERATING SYSTEM] [02 DESIGN & PRODUCTION] — collapsed
     - Website Launch [02 DESIGN & PRODUCTION] [03 BUILD & OPTIMIZE] — collapsed
     - Digital Product UX [02 DESIGN & PRODUCTION] — collapsed
     - Multi-Location Asset System [01 OPERATING SYSTEM] [02 DESIGN & PRODUCTION] — collapsed

4. "How we deliver" section (PROCESS STEPS) ← KEEP
   - Label: "HOW WE DELIVER"
   - Right side: "BEST FIT" with 3 bullets
   - 3 numbered steps:
     - 01 Clear intake + one decision owner (fewer loops)
     - 02 QA + publish-ready handoff (consistent quality)
     - 03 Steady cadence (predictable delivery)

5. CTA section
   - "Ready to start a project?" + "Start conversation" button

6. Footer
```

---

## Target Page Structure (what it should become)

```
1. Page header (NO CHANGES)
   - Label: "SERVICES"
   - Heading: "What we ship"
   - Subtext: "Brand, campaigns, and web - delivered with a quality bar, QA, and a steady cadence."

2. "Products" section (MOVED UP, IMPROVED)
   - 6 products as accordion items with pillar tag badges
   - Each CLOSED accordion shows: Product name + pillar tags + one-line description + product number
   - Each OPEN accordion shows: description + Includes list + Output box
   - Brand System remains the default expanded item
   - All pillar tag badges remain as they are now

3. "How we deliver" section (PROCESS STEPS — NO CHANGES)
   - Label: "HOW WE DELIVER"
   - Right side: "BEST FIT" with 3 bullets
   - 01 Clear intake + one decision owner (fewer loops)
   - 02 QA + publish-ready handoff (consistent quality)
   - 03 Steady cadence (predictable delivery)

4. CTA section (NO CHANGES)
   - "Ready to start a project?" + "Start conversation" button

5. Footer (NO CHANGES)
```

---

## Changes Required

### Change 1: REMOVE the "How we deliver" PILLARS section

Remove the entire section that contains:
- The heading "How we deliver" with the two tags ("Backed by structured processes", "Elevated by AI-powered execution")
- The "Approach" box with text "We build a delivery system that makes quality and speed predictable..."
- The 3 numbered pillars (01 Operating System, 02 Design & Production, 03 Build & Optimize) with their "You get:" lists

**Why:** This content already exists on the homepage (`r352.com/`). Having it on both pages creates redundancy. On `/services`, the Products section with pillar tag badges already communicates which delivery pillar each product maps to — making the full pillar descriptions unnecessary here.

**Important:** Do NOT remove the second "How we deliver" section (the one with 3 process steps: Clear intake, QA, Steady cadence). That section stays.

### Change 2: MOVE Products section up

After removing the pillars section, the Products accordion section should now sit directly below the page header. The visual flow becomes:

```
Page header → Products (accordion) → How we deliver (process steps) + Best fit → CTA → Footer
```

No new content needed — just repositioning.

### Change 3: ADD one-line description to CLOSED accordion items

Currently, when a product accordion is collapsed, only the product name, pillar tags, and number are visible. This is not enough information for a visitor to understand what the product is without clicking.

**Add the one-line description to each collapsed accordion item**, visible without clicking. Use the existing descriptions:

| Product | Description (visible when closed) |
|---|---|
| Brand System | A clear brand foundation built to stay consistent across teams and channels. |
| Campaign Toolkit | A modular campaign asset set designed to scale beyond one-off visuals. |
| Always-On Communication | Ongoing communication support delivered in a predictable rhythm. |
| Website Launch | A premium website built for clarity, conversion, and maintainability. |
| Digital Product UX | End-to-end UX/UI from problem framing to dev-ready delivery. |
| Multi-Location Asset System | A scalable kit for brands with many locations and constant asset requests. |

**Styling for the description in collapsed state:**
- Font size: 14px
- Color: #888 (muted)
- Margin-top: 4px below the product name
- Max-width: 500px
- The description should be on a new line below the product name, not inline

**Layout of collapsed accordion item should be:**
```
Product Name    [PILLAR TAG] [PILLAR TAG]    number
Description text in muted gray...
```

### Change 4: VERIFY all 6 products have correct content when expanded

When a product is expanded (clicked), it should show:
- One-line description
- "INCLUDES" label + bullet list
- "OUTPUT" box with business benefit text

Currently only Brand System has full expanded content. Make sure all 6 products have their content available when opened. If content is missing for products 02–06, use the content from the `/deliverables` page (same products, same structure) or from the reference file `r352-deliverables-content.html`.

**Content for each product when expanded:**

**01 — Brand System** (already implemented, verify only)
- Description: A clear brand foundation built to stay consistent across teams and channels.
- Includes: Visual identity + core rules, Typography + layout system, Color system (digital + print), Photography & illustration guidelines, Template set (social, ads, deck, email), Icon set in brand style
- Output: Brand rules + usable templates. Your team ships on-brand without checking with you first.

**02 — Campaign Toolkit**
- Description: A modular campaign asset set designed to scale beyond one-off visuals.
- Includes: Concept + messaging structure, Key Visual + modular layout templates, Social + performance ad variants, Motion package (video, GIF, animation), Print adaptations (poster, flyer, POS), Copy matrix per format and audience
- Output: Publish-ready KV + variants + templates. One concept, every channel, zero rework.

**03 — Always-On Communication**
- Description: Ongoing communication support delivered in a predictable rhythm.
- Includes: Monthly/weekly content plan, Production + iterations, QA + consistency control, Performance notes + optimization, Steady delivery cadence
- Output: Consistent weekly/monthly drops. Your channels stay active without internal production overhead.

**04 — Website Launch**
- Description: A premium website built for clarity, conversion, and maintainability.
- Includes: Structure + UX, UI design + component system, Build + CMS setup, SEO baseline + performance audit, Launch support + handoff
- Output: Launch-ready site + handoff. Your team edits content, adds pages, and tracks performance without calling us.

**05 — Digital Product UX**
- Description: End-to-end UX/UI from problem framing to dev-ready delivery.
- Includes: Flow + architecture, UI system + prototype, Dev-ready specs + QA, Component documentation, User research synthesis
- Output: Prototype + UI system + specs. Your dev team builds from a single source of truth, not loose mockups.

**06 — Multi-Location Asset System**
- Description: A scalable kit for brands with many locations and constant asset requests.
- Includes: Central vs. local rules, Reusable templates + variants, Handoff packs for local teams, Asset request workflow, Quality control protocol
- Output: Central standards + local templates. 50 locations ship on-brand without 50 briefs hitting your desk.

---

## Design System Reference

```
Background:           #0a0a0a
Card background:      #141414
Text primary:         #e5e5e5
Text muted:           #888888
Accent (green):       #D4FF00
Border:               rgba(255, 255, 255, 0.08)
Font:                 Inter

Pillar tag badges:    border 1px solid rgba(255,255,255,0.15), border-radius 4px,
                      padding 2px 8px, font-size 11px, uppercase, letter-spacing 0.5px,
                      color #888

Output box:           background #141414, border 1px solid rgba(255,255,255,0.08),
                      border-radius 8px, padding 24px 28px

Product number:       13px, monospace, color #D4FF00
Product name:         ~24px, font-weight 600, color #e5e5e5
Description:          14px, color #888
Includes label:       11px, uppercase, letter-spacing 1.5px, color #888 or #D4FF00
Includes items:       14px, color #e5e5e5, green dot bullet (4px circle #D4FF00)
Output label:         11px, uppercase, letter-spacing 1.5px, color #888
Output text:          15px, color #e5e5e5, font-weight 500, monospace
```

---

## Light Mode Compatibility

The site has a light/dark mode toggle (sun/moon icon, bottom right). In light mode:
- Background → ~#f5f5f5
- Text → #1a1a1a
- Muted text → #666
- Accent green (#D4FF00) stays
- Card backgrounds → #ffffff
- Borders → rgba(0,0,0,0.08)

Ensure all elements respect the theme toggle. Use CSS custom properties if the site already uses them.

---

## What NOT to Change

- Do NOT remove the "How we deliver" PROCESS STEPS section (01 Clear intake, 02 QA, 03 Steady cadence)
- Do NOT remove the "Best fit" section
- Do NOT remove the CTA or footer
- Do NOT change product names, their order, or their pillar tag badges
- Do NOT change the page header
- Do NOT modify the navigation, loader animation, or scroll-triggered animations
- Do NOT add new sections — this change is about simplifying, not adding

---

## Summary of Changes

| Action | What | Details |
|---|---|---|
| REMOVE | "How we deliver" pillars section | The one with Operating System / Design & Production / Build & Optimize + Approach box |
| MOVE UP | Products accordion section | Should now be directly below page header |
| ADD | One-line description to closed accordions | Visible without clicking, muted gray, below product name |
| VERIFY | All 6 products have expanded content | Includes list + Output box for each product |
| KEEP | Everything else | Process steps, Best fit, CTA, footer, header, pillar tags |
