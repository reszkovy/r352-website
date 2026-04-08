## Goal

Close navigation gaps between pages so prospects flow naturally through the site without dead ends. Fix the "STEP" labeling on /deliverables. Add contextual social proof to Engagement Models. These changes bring the site from 9/10 to 9.5/10.

---

## Change 1: Cross-Links Between /services and /deliverables

### Problem
Both pages feature the same 6 products but serve different purposes: /services = how to engage, /deliverables = what you get. There is no link connecting them. A prospect on /services who wants to see the full asset list has to manually navigate. A prospect on /deliverables who wants to understand engagement models has to do the same.

### On /services — Add link per product to /deliverables

For each product in the Products accordion on `/services`, add a subtle text link below the Output box (or below the description for collapsed items):

**Link text:** `See full deliverable list →`
**Link target:** `/deliverables` with anchor to the corresponding product section

If the site uses anchor IDs, link to the specific product:
- Brand System → `/deliverables#brand-system`
- Campaign Toolkit → `/deliverables#campaign-toolkit`
- Always-On Communication → `/deliverables#always-on-communication`
- Website Launch → `/deliverables#website-launch`
- Digital Product UX → `/deliverables#digital-product-ux`
- Multi-Location Asset System → `/deliverables#multi-location-asset-system`

If anchor IDs don't exist on /deliverables, add them first (id attribute on each product's container element).

**Styling:**
- Font size: 13px
- Color: #D4FF00 (accent green)
- Text decoration: none, border-bottom: 1px solid rgba(212,255,0,0.3)
- On hover: border-bottom color becomes solid #D4FF00
- Margin-top: 12px below the Output box
- Arrow (→) animates 4px right on hover (transform: translateX(4px), transition 0.2s ease)

**For expanded products (e.g., Brand System):** Place the link below the Output box.
**For collapsed products:** Place the link on the same line as the description, right-aligned, or below the description.

### On /deliverables — Add link back to /services engagement models

At the bottom of the entire deliverables list (after the last product, Multi-Location Asset System), add a section:

**Text:** `Ready to start? See how we work together →`
**Link target:** `/services#engagement-models`

If the Engagement Models section on /services doesn't have an anchor ID, add `id="engagement-models"` to its container.

**Styling:**
- Centered text block
- Font size: 15px
- Color: #e5e5e5 for "Ready to start?", #D4FF00 for "See how we work together →"
- Margin: 60px 0
- Arrow animates on hover (same as above)

---

## Change 2: Cross-Links Between Homepage and Subpages

### Problem
The homepage has rich content sections (How we deliver pillars, Scale system not chaos, principle cards) but most of them are dead ends — no links to relevant subpages.

### Add these links on the homepage:

**A) "How we deliver" section (3 pillars) → link to /services**

After the third pillar (03 Build & Optimize), add:

**Text:** `See all products and engagement models →`
**Link target:** `/services`
**Placement:** Below the last pillar, left-aligned with pillar content
**Styling:** 13px, color #D4FF00, same hover animation as above

**B) "Scale system not chaos" section (DIAGNOSE / BUILD / SCALE) → link to /services#engagement-models**

The Diagnostic phase on homepage describes the audit. Link it to the Diagnostic engagement model.

After the DIAGNOSE phase description, add:

**Text:** `Start with a Diagnostic →`
**Link target:** `/services#engagement-models`
**Styling:** 13px, color #D4FF00, same hover animation

**C) "Selected Work" section → link to /work**

Currently there is a "View all projects" link — verify it works and points to `/work`. If it does, no change needed.

**D) Philosophy teaser → link to /philosophy**

Currently there is a "Read our philosophy" button — verify it works and points to `/philosophy`. If it does, no change needed.

---

## Change 3: Cross-Links on /philosophy

### Problem
/philosophy is a strong page but has no links to /services or /deliverables. A prospect who reads the philosophy and is convinced has to manually navigate to see what they can buy.

### Add link at the bottom CTA section

Currently the bottom of /philosophy has:
```
Let's build your delivery system — and ship.
Not just a campaign. Not just a redesign. A repeatable way to produce high-quality work at scale.
[Start a project] [Schedule a call]
```

**Add a third link between the text and the buttons:**

**Text:** `Explore what we deliver →`
**Link target:** `/services`
**Styling:** 14px, color #D4FF00, displayed as inline text link (not a button), margin-bottom 24px before the buttons

---

## Change 4: Cross-Links on /work

### Problem
/work lists 4 projects. After viewing case studies, prospect has no natural next step except navigating manually.

### Add CTA section at the bottom of /work

After the last project (Kubota), add:

**Text line 1:** `Like what you see?`
**Text line 2:** `See how we work together →` (links to `/services#engagement-models`)
**Alternative text line 2:** `Start with a conversation →` (links to `/contact`)

Show both links on separate lines:
```
Like what you see?
See how we work together →
Start a conversation →
```

**Styling:**
- "Like what you see?" — 15px, color #e5e5e5, font-weight 500
- Links — 14px, color #D4FF00, border-bottom animation on hover
- Margin-top: 80px from last project
- Left-aligned with project content

---

## Change 5: Cross-Links on /journal

### Problem
Journal articles build authority but don't link back to services. A prospect who reads an article and is interested has no exit to conversion.

### Add CTA at the bottom of each article page

After the article content, add:

**Text:** `Want us to build this for your team?`
**Button:** `Start a project` → links to `/contact`
**Secondary link:** `Or explore our services →` → links to `/services`

**Styling:** Same as existing CTA blocks on the site (chartreuse button for primary, text link for secondary)

### Add CTA at the bottom of the /journal listing page

After the last article card:

**Text:** `Ready to move from reading to building?`
**Link:** `See how we work together →` → `/services#engagement-models`

---

## Change 6: Fix "STEP" Labels on /deliverables

### Problem
Products on /deliverables are labeled "STEP 01", "STEP 02", etc. These are independent products, not sequential steps. A client doesn't need to buy Brand System before buying Website Launch. "STEP" implies a sequence that doesn't exist.

### Fix
Replace all "STEP XX" labels with just the number:

| Current | New |
|---|---|
| STEP 01 | 01 |
| STEP 02 | 02 |
| STEP 03 | 03 |
| STEP 04 | 04 |
| STEP 05 | 05 |
| STEP 06 | 06 |

Keep the same styling (accent green, monospace, small caps). Just remove the word "STEP".

---

## Change 7: Add Social Proof to Engagement Models on /services

### Problem
The Sprint / Retainer / Diagnostic cards explain how each model works but provide no proof that it actually delivers results. Adding one testimonial quote per model builds trust at the decision point.

### Add one quote to each engagement model card

Place the quote at the bottom of each card, below "Products that fit this model" (or "Deliverable" for Diagnostic). Visually separated by a thin border-top.

**Sprint card:**
> "Working with r352 is a pleasure. They are proactive, transparent, and truly care about the outcome. A reliable partner for any scale."
> — Alina Sztoch, CEO, Kubota Store

**Retainer card:**
> "It feels like they are part of our internal team. Flexible, responsive, and always focused on delivering the best possible impact."
> — Lidia Kołucka, Marketing Director, Orlen / ex. Pelion

**Diagnostic card (or if no direct quote fits, use this one):**
> "Professionalism and great energy. They understand the business context and deliver work that actually moves the needle."
> — Filip Mazurkiewicz, Marketing Manager, Sonova Group

**Quote styling:**
- Border-top: 1px solid rgba(255,255,255,0.08)
- Padding-top: 20px
- Margin-top: 20px
- Quote text: 13px, italic, color #888
- Attribution: 12px, color #666, not italic
- Company name: color #888

---

## Summary of All Changes

| # | Page | Change | Type |
|---|---|---|---|
| 1a | /services | Add "See full deliverable list →" per product | Cross-link |
| 1b | /deliverables | Add "See how we work together →" at bottom | Cross-link |
| 2a | / (homepage) | Add "See all products and engagement models →" after How we deliver pillars | Cross-link |
| 2b | / (homepage) | Add "Start with a Diagnostic →" in Scale system section | Cross-link |
| 3 | /philosophy | Add "Explore what we deliver →" before CTA buttons | Cross-link |
| 4 | /work | Add CTA section at bottom (services + contact links) | Cross-link |
| 5 | /journal | Add CTA at bottom of articles and listing page | Cross-link |
| 6 | /deliverables | Change "STEP 01" to "01" (remove "STEP" word) | Label fix |
| 7 | /services | Add one testimonial quote per Engagement Model card | Social proof |

---

## Design System Reference

```
Cross-link text:     13-14px, color #D4FF00
Cross-link hover:    border-bottom solid #D4FF00, arrow translateX(4px)
Cross-link arrow:    → character, transition 0.2s ease
Border (separator):  1px solid rgba(255,255,255,0.08)
Quote text:          13px, italic, color #888
Quote attribution:   12px, color #666
```

All other styling follows existing site design system. Use CSS custom properties for theme compatibility (light/dark mode).

---

## What NOT to Change

- Do not modify page content, structure, or section order
- Do not add new sections — only add links within existing sections
- Do not change navigation menu items
- Do not modify existing CTA buttons — add links alongside them, not instead of them
- Do not change testimonial text — use exact quotes from the homepage testimonials carousel
