## Context

You are updating the `/deliverables` page on r352.com. The site is built with a dark theme (#0a0a0a background, #D4FF00 neon green accent, Inter font). The site has scroll-triggered animations and a loader (counter animation to 100) on initial load. There is a light/dark mode toggle (sun/moon icon, bottom right corner).

The site owner is a design-first strategic partner working with large multi-location organizations (fitness, wellness, health, retail). The site communicates a "delivery systems" positioning — not a typical design agency.

---

## Current State of /deliverables

The page currently has 6 product blocks. Each block contains:
- Product number (01–06) in accent green, monospace
- Product name (h2)
- One-line description (muted gray)
- "Includes" section — short list of 3–4 items
- "Output" section — one-line summary

Current products:
1. Brand System
2. Campaign Toolkit
3. Always-On Communication
4. Website Launch
5. Digital Product UX
6. Multi-Location Asset System

Only "Brand System" (01) has a visible expanded state. Products 02–06 appear as collapsed accordion items showing only the title.

---

## Changes Required

### Change 1: Add "What's inside" column to each product

For each of the 6 products, add a second column next to the existing "Includes" column. This new column is labeled **"What's inside"** (uppercase, accent green, 11px, letter-spacing 1.5px — same style as "Includes" label).

The layout becomes a **two-column grid** (1fr 1fr, gap 40px):
- Left column: "Includes" (existing content, keep as-is)
- Right column: "What's inside" (new content, see below)

**Implementation option:** The "What's inside" column can be hidden by default inside an accordion toggle labeled **"See full deliverable list ↓"**. On click, it expands to reveal the list. This prevents overwhelming the user while giving depth to those who want it. The accordion trigger text should be styled in muted gray (var(--muted)), 13px, with the arrow animating on open/close.

### Change 2: Update "Output" copy

Replace current one-line output text with new copy that includes a **business benefit statement** after the deliverable summary. See content below.

### Change 3: Add "Best for" qualifier

Below each Output box, add a new line:
- Label: **"Best for:"** in accent green (#D4FF00), font-weight 500
- Text: qualifier sentence in muted gray (#888), font-size 13px
- Margin-top: 20px from the output box

### Change 4: Update "Includes" lists

Some products get expanded "Includes" lists (from 3 items to 5–6 items). See content below.

---

## Content Per Product

### 01 — Brand System

**Description:** A clear brand foundation built to stay consistent across teams and channels.

**Includes:**
- Visual identity + core rules
- Typography + layout system
- Color system (digital + print)
- Photography & illustration guidelines
- Template set (social, ads, deck, email)
- Icon set in brand style

**What's inside:**
- Brand Guidelines Document (PDF)
- Logo package — all versions, all formats (SVG, PNG, EPS)
- Typography hierarchy per medium (web, print, social)
- Color palette with HEX, RGB, CMYK, Pantone codes
- Layout grid system per format
- Template files — social posts, stories, covers, ads, deck, email header
- Photography mood & direction guide
- Do's & don'ts reference sheet

**Output:** Brand rules + usable templates. Your team ships on-brand without checking with you first.

**Best for:** Companies launching, rebranding, or scaling across new markets and channels.

---

### 02 — Campaign Toolkit

**Description:** A modular campaign asset set designed to scale beyond one-off visuals.

**Includes:**
- Concept + messaging structure
- Key Visual + modular layout templates
- Social + performance ad variants
- Motion package (video, GIF, animation)
- Print adaptations (poster, flyer, POS)
- Copy matrix per format and audience

**What's inside:**
- Key Visual in master resolution + adaptation guide
- Modular layout templates for self-assembly
- Social media variants — posts, stories, reels covers (FB, IG, LinkedIn, TikTok)
- Performance ad formats — GDN, Meta, LinkedIn sizes
- Motion assets — 15s, 30s, GIF loops
- CMYK print files — posters, flyers, rollups, POS materials
- Headline/subhead/CTA variants per segment
- Campaign asset checklist — full format inventory

**Output:** Publish-ready KV + variants + templates. One concept, every channel, zero rework.

**Best for:** Marketing teams running multi-channel campaigns with tight deadlines and high volume.

---

### 03 — Always-On Communication

**Description:** Ongoing communication support delivered in a predictable rhythm.

**Includes:**
- Monthly/weekly content plan
- Production + iterations
- QA + consistency control
- Performance notes + optimization
- Steady delivery cadence

**What's inside:**
- Content calendar with topics, formats, channels
- Reusable content templates per format (post, story, newsletter, blog)
- Production queue with statuses and deadlines
- QA report before every publish cycle
- Iteration log — what changed, why
- Performance notes — what worked, what to adjust next
- Monthly/weekly drops on schedule, no delays

**Output:** Consistent weekly/monthly drops. Your channels stay active without internal production overhead.

**Best for:** Teams that need steady content output but don't have the bandwidth to manage production in-house.

---

### 04 — Website Launch

**Description:** A premium website built for clarity, conversion, and maintainability.

**Includes:**
- Structure + UX
- UI design + component system
- Build + CMS setup
- SEO baseline + performance audit
- Launch support + handoff

**What's inside:**
- Sitemap + information architecture
- Wireframes — per page type
- UI design — pixel-perfect per breakpoint (desktop, tablet, mobile)
- Component library in Figma
- Interactive prototype of key flows
- Frontend build (Next.js / Webflow / custom CMS)
- CMS with editable content fields
- SEO setup — meta, OG images, sitemap.xml, robots.txt
- Performance audit — Lighthouse, Core Web Vitals
- Launch checklist — redirects, analytics, tracking, forms
- Handoff documentation — how your team edits content independently

**Output:** Launch-ready site + handoff. Your team edits content, adds pages, and tracks performance without calling us.

**Best for:** Companies that need a website that performs, converts, and doesn't require a developer for every content update.

---

### 05 — Digital Product UX

**Description:** End-to-end UX/UI from problem framing to dev-ready delivery.

**Includes:**
- Flow + architecture
- UI system + prototype
- Dev-ready specs + QA
- Component documentation
- User research synthesis

**What's inside:**
- User research synthesis — personas, journey map, pain points
- Information architecture + flow diagrams
- Wireframes (low & mid fidelity) — key screens and flows
- UI design system — components, tokens, spacing, color, type
- High-fidelity clickable prototype in Figma
- Dev-ready specs — redlines, spacing, all states (hover, active, disabled, error, loading)
- Asset export + component documentation
- QA checklist per screen

**Output:** Prototype + UI system + specs. Your dev team builds from a single source of truth, not loose mockups.

**Best for:** Product teams building or redesigning digital products that need to move fast without accumulating design debt.

---

### 06 — Multi-Location Asset System

**Description:** A scalable kit for brands with many locations and constant asset requests.

**Includes:**
- Central vs. local rules
- Reusable templates + variants
- Handoff packs for local teams
- Asset request workflow
- Quality control protocol

**What's inside:**
- Central vs. local rules document — what's locked, what's editable
- Master template set with editable zones per format
- Location variant guide — how locals adapt (photos, copy, prices, addresses)
- Asset request flow — form, approval path, timeline
- Self-service template library (Canva / Figma / custom tool)
- Quality control protocol — how HQ monitors local output
- Rollout pack per location — starter kit for every new site
- Training materials — video/PDF on how to use the template system

**Output:** Central standards + local templates. 50 locations ship on-brand without 50 briefs hitting your desk.

**Best for:** Franchise networks, retail chains, and multi-location brands that need consistency at scale without a central bottleneck.

---

## Design System Reference

Use these values to match the existing site:

```
Background:        #0a0a0a
Card background:   #141414
Text primary:      #e5e5e5
Text muted:        #888888
Accent (green):    #D4FF00
Border:            rgba(255, 255, 255, 0.08)
Font:              Inter
```

### Typography for new elements:
- **"What's inside" label:** 11px, uppercase, letter-spacing 1.5px, color #D4FF00
- **"What's inside" list items:** 14px, color #e5e5e5, padding 8px 0, border-bottom 1px solid rgba(255,255,255,0.08), green dot bullet (4px circle, #D4FF00) before each item
- **"Best for" label:** 13px, color #D4FF00, font-weight 500
- **"Best for" text:** 13px, color #888
- **Output box:** background #141414, border 1px solid rgba(255,255,255,0.08), border-radius 8px, padding 24px 28px
- **Output label:** 11px, uppercase, letter-spacing 1.5px, color #888
- **Output text:** 15px, color #e5e5e5, font-weight 500
- **Accordion trigger (if used):** 13px, color #888, cursor pointer, with ↓ arrow that rotates 180deg on open

### Layout:
- Product grid: `display: grid; grid-template-columns: 1fr 1fr; gap: 40px;`
- Product blocks separated by: `border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 80px; margin-bottom: 80px;`
- Max content width: 1200px, centered

---

## Additional Changes on /services Page

On the `/services` page, add **product-to-pillar mapping tags** next to each product name. These small tags show which delivery pillar(s) each product falls under:

| Product | Pillar tags |
|---|---|
| Brand System | `02 Design & Production` |
| Campaign Toolkit | `02 Design & Production` |
| Always-On Communication | `01 Operating System` `02 Design & Production` |
| Website Launch | `02 Design & Production` `03 Build & Optimize` |
| Digital Product UX | `02 Design & Production` |
| Multi-Location Asset System | `01 Operating System` `02 Design & Production` |

Tag styling: small pill/badge, border 1px solid rgba(255,255,255,0.15), border-radius 4px, padding 2px 8px, font-size 11px, color #888, uppercase, letter-spacing 0.5px. On hover: border-color #D4FF00, color #D4FF00.

---

## Light Mode Compatibility

The site has a light/dark mode toggle. In light mode:
- Background becomes light gray (~#f5f5f5)
- Text becomes dark (#1a1a1a)
- Muted text becomes (#666)
- Accent green (#D4FF00) stays the same
- Card backgrounds become white (#ffffff)
- Borders become rgba(0,0,0,0.08)

Ensure all new elements respect the theme toggle. If the site uses CSS custom properties (var(--bg), var(--text), etc.), use those variables instead of hardcoded colors.

---

## What NOT to Change

- Do not modify the page header ("What we ship" / "Deliverables" heading)
- Do not change the scroll-triggered animation behavior
- Do not modify the navigation or footer
- Do not change product names or their order
- Do not touch the loader animation
- Keep the existing "Includes" content structure — only expand the number of items where specified above
