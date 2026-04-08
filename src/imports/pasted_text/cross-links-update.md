
## Change 1: Cross-Link on /deliverables → /services

### What to do
At the bottom of the `/deliverables` page, after the last product (06 Multi-Location Asset System), add a cross-link section that directs the prospect to engagement models on `/services`.

### Content
```
Ready to start? See how we work together →
```

"Ready to start?" is plain text. "See how we work together →" is a link to `/services#engagement-models`.

If the Engagement Models section on /services doesn't have an anchor ID yet, add `id="engagement-models"` to its container element.

### Styling
- Centered text block
- "Ready to start?" — font-size 15px, color #e5e5e5, font-weight 500
- "See how we work together →" — font-size 15px, color #D4FF00, no text-decoration, border-bottom: 1px solid rgba(212,255,0,0.3)
- On hover: border-bottom becomes solid #D4FF00, arrow (→) moves 4px right (transform: translateX(4px), transition: 0.2s ease)
- Margin: 60px top, 60px bottom
- The → arrow should be wrapped in a span for the hover animation

---

## Change 2: Cross-Links on Homepage (/)

### What to do
Add two cross-links on the homepage to connect content sections to relevant subpages.

### 2A: After "How we deliver" pillars → link to /services

Currently the homepage has a "How we deliver" section with 3 pillars (01 Operating System, 02 Design & Production, 03 Build & Optimize). After the third pillar, add:

```
See all products and engagement models →
```

**Link target:** `/services`
**Placement:** Below the third pillar (03 Build & Optimize), left-aligned with the pillar content area (right side of the layout)
**Styling:** font-size 13px, color #D4FF00, border-bottom animation on hover (same pattern as Change 1), margin-top 32px

### 2B: In "Scale system not chaos" section → link to /services Diagnostic

The homepage has a "Scale system not chaos" section with three phases: DIAGNOSE, BUILD, SCALE. The DIAGNOSE phase describes the delivery workflow audit — which is the same as the Diagnostic engagement model on /services.

After the DIAGNOSE phase bullet points ("Delivery workflow audit", "Bottleneck map with root causes", "Actionable plan in under 2 weeks"), add:

```
Start with a Diagnostic →
```

**Link target:** `/services#engagement-models`
**Placement:** Below the last bullet point of the DIAGNOSE phase
**Styling:** font-size 13px, color #D4FF00, border-bottom animation on hover, margin-top 16px

---

## Change 3: Cross-Link on /philosophy → /services

### What to do
The `/philosophy` page ends with a CTA section:
```
Let's build your delivery system — and ship.
Not just a campaign. Not just a redesign. A repeatable way to produce high-quality work at scale.
[Start a project]  [Schedule a call]
```

Add a text link between the descriptive text and the CTA buttons.

### Content
```
Explore what we deliver →
```

**Link target:** `/services`
**Placement:** Between "...high-quality work at scale." and the [Start a project] / [Schedule a call] buttons
**Styling:** font-size 14px, color #D4FF00, displayed as inline text link (NOT a button — it should look different from the two CTA buttons below it), no text-decoration, border-bottom: 1px solid rgba(212,255,0,0.3), hover animation same as other cross-links, margin-bottom 24px (space between this link and the buttons below)

---

## Change 4: Cross-Links on /work

### What to do
The `/work` page lists 4 projects (Benefit Systems, Sonova, Dawid Podsiadło, Kubota). After the last project, there is currently no CTA or next step. The page just ends. Add a CTA section.

### Content
```
Like what you see?
See how we work together →
Start a conversation →
```

"Like what you see?" is a heading.
"See how we work together →" links to `/services#engagement-models`
"Start a conversation →" links to `/contact`

### Placement
After the last project (Kubota, 2023). Below the project grid/list.

### Styling
- "Like what you see?" — font-size 18px, color #e5e5e5, font-weight 600, margin-bottom 16px
- "See how we work together →" — font-size 14px, color #D4FF00, border-bottom animation on hover, display block, margin-bottom 8px
- "Start a conversation →" — font-size 14px, color #D4FF00, border-bottom animation on hover, display block
- Container: margin-top 80px from last project, left-aligned with project content
- Both links are on separate lines (display: block), not inline

---

## Change 5: Cross-Links on /journal

### What to do
Two additions: one on the journal listing page, one on each individual article page.

### 5A: On the /journal listing page

After the last article card (currently "From Agency to Operating Partner: The Delivery OS"), add:

```
Ready to move from reading to building?
See how we work together →
```

"Ready to move from reading to building?" is plain text.
"See how we work together →" links to `/services#engagement-models`

**Styling:**
- "Ready to move from reading to building?" — font-size 15px, color #888 (muted), margin-bottom 12px
- "See how we work together →" — font-size 14px, color #D4FF00, border-bottom animation on hover
- Container: margin-top 60px from last article card, left-aligned with article cards

### 5B: On each individual article page

At the bottom of the article content (after the last paragraph), add a CTA block:

```
Want us to build this for your team?
[Start a project]
Or explore our services →
```

"Want us to build this for your team?" is a heading.
[Start a project] is a button linking to `/contact` — use the existing chartreuse button style (background #D4FF00, color #0a0a0a, uppercase, font-weight 600, padding 14px 32px).
"Or explore our services →" is a text link to `/services`

**Styling:**
- "Want us to build this for your team?" — font-size 18px, color #e5e5e5, font-weight 600, margin-bottom 20px
- Button: same style as existing "START A PROJECT" buttons on the site
- "Or explore our services →" — font-size 13px, color #D4FF00, margin-top 16px, border-bottom animation on hover
- Container: margin-top 60px, border-top 1px solid rgba(255,255,255,0.08), padding-top 40px

---

## BONUS: Fix "STEP" Labels on /deliverables

### What to do
On `/deliverables`, each product has a label "STEP 01", "STEP 02", etc. These products are independent — not sequential steps. Remove the word "STEP" and keep only the number.

### Changes
| Current | Replace with |
|---|---|
| STEP 01 | 01 |
| STEP 02 | 02 |
| STEP 03 | 03 |
| STEP 04 | 04 |
| STEP 05 | 05 |
| STEP 06 | 06 |

Keep existing styling (accent green #D4FF00, monospace font, small size). Only remove the "STEP " text prefix.

**Note:** If /deliverables is currently being redeployed (it was showing a white screen during verification), wait for it to be stable before making this change.

---

## Cross-Link Hover Animation (applies to ALL links above)

All cross-links use the same hover pattern for consistency:

```css
.cross-link {
  color: #D4FF00;
  text-decoration: none;
  border-bottom: 1px solid rgba(212, 255, 0, 0.3);
  transition: border-color 0.2s ease;
}

.cross-link:hover {
  border-bottom-color: #D4FF00;
}

.cross-link .arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.cross-link:hover .arrow {
  transform: translateX(4px);
}
```

HTML pattern:
```html
<a href="/services" class="cross-link">
  See all products and engagement models <span class="arrow">→</span>
</a>
```

---

## Light Mode Compatibility

In light mode the cross-links should adjust:
- Link color: #D4FF00 stays (or use a slightly darker green if contrast is insufficient on white/light gray)
- Border-bottom: rgba(212,255,0,0.3) → may need to be rgba(150,180,0,0.3) for visibility on light backgrounds
- Text colors (#e5e5e5 headings, #888 muted) invert per existing theme toggle

Use CSS custom properties if the site already uses them for theme switching.

---

## What NOT to Change

- Do NOT modify any existing page content, section order, or layout
- Do NOT change the navigation menu
- Do NOT modify existing CTA buttons — add links ALONGSIDE them
- Do NOT add links that duplicate existing navigation (e.g., "Read our philosophy" on homepage already works — don't add another)
- Do NOT change the Engagement Model cards on /services — testimonials are already implemented correctly
- Do NOT change the "See full deliverable list →" on /services — it's already implemented on Brand System
