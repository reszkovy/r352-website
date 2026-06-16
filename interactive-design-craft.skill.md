---
name: interactive-design-craft
description: Build, refactor, or audit the craft layer of a beautiful interactive website — animation, interaction, and visual design as one coherent system. Use when the user wants production-grade motion (smooth scroll, scroll reveals, page transitions, hover micro-interactions), opinionated interaction language (magnetic CTAs, chip-tooltips, audio-as-affordance, mobile fallbacks), and a no-chrome visual surface (hairline separation, single-accent palette, hand-tuned typography across breakpoints). Trigger on requests like "make my site feel premium", "the animations feel cheap", "the hover states are generic", "audit my interaction language", "tune the motion across breakpoints", "the cards look like marketing chrome", "smooth scroll feels janky", "mobile interactions are broken". Framework-agnostic — patterns translate to React/Vue/Svelte/vanilla. NOT for content strategy, copywriting, IA, or SEO work — this skill is craft-only.
---

# Interactive Design Craft — Animation, Interaction, Visual Surface

A codified craft methodology for building interactive sites where motion, interaction, and visual design operate as one system. Every motion has a reason, every interaction has a fallback, every surface has a defended treatment.

The skill assumes the operator is willing to (1) hand-tune per breakpoint instead of relying on `text-balance` / auto-layout magic, (2) ship `prefers-reduced-motion` and mobile-fallback paths for every animated/hover-driven affordance, (3) reject decoration-only motion in favor of motion that signals state, hierarchy, or affordance.

---

## Three-Axis Operating Model

The whole site is governed by three intertwined craft axes. Decisions in one axis constrain the other two.

```
        ANIMATION
       /         \
      /           \
INTERACTION ─── VISUAL DESIGN
```

- **Animation** = how things change over time (scroll, route, focus, hover, idle)
- **Interaction** = how the user changes things (click, hover, drag, key, audio)
- **Visual Design** = the resting state surface (color, type, space, line, depth)

Rule: no element gets motion without resting-state design discipline, no interaction without animation feedback, no visual treatment without an interaction language to match.

---

## Core Craft Principles

### 1. One motion system, top to bottom
Pick ONE smooth-scroll engine (Lenis, Locomotive, or native + CSS `scroll-behavior`). Pick ONE animation library (framer-motion, GSAP, or CSS-only). Pick ONE easing language (e.g. `cubic-bezier(.16,1,.3,1)` for outs, `cubic-bezier(.4,0,.2,1)` for ins). Do not mix. Mixed motion engines fight each other on scroll-locked routes and produce micro-stutters that read as "cheap" even when no single bug exists.

### 2. Reveal on scroll — but with a budget
Scroll reveals (fade-in + 8–16px translateY on viewport entry) are powerful exactly until they're everywhere. Budget: **maximum 1 reveal per visible viewport.** Hero needs no reveal — it's already in view. Subsequent sections get one staggered group, not item-by-item theatrics. Per-character / per-word animations are reserved for the single hero line, never for body copy.

### 3. Page transitions: deterministic, not surprise
Page-to-page transitions should be **deterministic pairs** (route A → B always uses transition X). Random direction transitions feel like a bug to repeat visitors. Mobile gets simpler transitions (fade-only, no horizontal translates that fight gesture).

### 4. Hover language — earn it twice
Every hoverable element must declare itself twice: once at rest (visual affordance — underline, bg shift cue, cursor change) and once on hover (motion — letter-spacing shift, magnetic pull, fill swap, scale). One affordance alone is invisible; two combine to feel intentional. **Magnetic buttons** = cursor proximity → element offset toward cursor by 8–16% of distance. **Tracking-shift** = `letter-spacing: 0 → .15em` on hover for nav links. These two patterns alone elevate 80% of interactions.

### 5. Mobile fallbacks are non-negotiable
Every hover-only affordance needs a tap/expand counterpart on mobile. Chip-tooltips → tap-to-expand. Magnetic buttons → press-state scale. Audio CTA-hover triggers → never trigger on mobile (no hover), keep widget-only manual control. If a feature can't be made mobile-equivalent, ship it desktop-only behind a feature-detect, not a viewport-width guess.

### 6. Hairline separation over chrome
Sections separate with 1px hairlines, not card backgrounds. Card surfaces: transparent at rest, light fill ONLY on hover. Always-on tinted boxes (e.g. `bg-white/[0.015]` over a dark canvas) read as generic marketing chrome and add visual debt without affordance gain. Hairlines + hover-fill = editorial, premium, trust-signal-positive.

### 7. Single accent color + dark canvas (or its inverse)
Pick ONE accent color (e.g. lime `#D4FF00`) and ONE canvas tone (e.g. charcoal `#0a0a0a` / `#151515` two-layer). Use accent ONLY for: primary CTA fill, hover-active text, current-state indicators, and the rotating brand mark. Three-accent palettes feel like a startup. One-accent feels like an editorial title.

### 8. Audio as interaction signal (optional, high-stakes)
If audio is used at all: trigger on user-initiated event (CTA hover, button click) — never autoplay. Cross-fade in/out (~600–1200ms). Persist play state across navigation via `sessionStorage`. Always render a visible widget the user can mute/control. Mobile fallback: widget-only, no hover-trigger. Pick a piece that reads as deliberate brand signal, not background noise — niche-sophisticated over popular.

### 9. Hand-tune mobile typography
Do not rely on `text-wrap: balance` or `text-wrap: pretty` alone for hero copy. They produce mid-word breaks on long words at 375px viewport. Use explicit `<br/>` line breaks for hero headlines, reduce font-size at the mobile breakpoint by 15–25%, tighten `line-height` to `0.76–0.85`, increase letter-spacing by `0.005em` to compensate visually.

### 10. Reduced motion = real path, not skip
Respect `prefers-reduced-motion: reduce` by replacing motion with crossfades (200ms opacity transitions), NEVER by skipping the transition entirely. Skipping breaks state-change perception. Crossfades preserve the "something changed" signal at zero motion cost.

---

## 8-Phase Build Workflow

### Phase 1 — Foundation tokens
Before any component: define CSS variables for color, type scale, spacing scale, motion (easing curves + duration tokens like `--motion-fast: 200ms`, `--motion-base: 400ms`, `--motion-slow: 800ms`). Components reference tokens, never raw values.

### Phase 2 — Motion contract
Write the motion contract in code comments or a short doc. What gets reveal-on-scroll? What gets hover-shift? What gets page-transition? What gets reduced-motion fallback? Settle this once — refactor cost is steep later.

### Phase 3 — Component-level interaction rules
Per component: rest state, hover state, focus state, active state, disabled state, loading state. Five states minimum for any interactive element. Specify motion duration + easing per transition between states.

### Phase 4 — Page-level orchestration
Sequence reveals, stagger groups, decide what cascades on route enter. Mount-time animations should resolve in under 800ms total — beyond that, content feels withheld.

### Phase 5 — Hand-tune per breakpoint
Mobile typography, mobile interaction fallbacks, mobile motion reductions (drop parallax, reduce stagger delay, simplify transitions). Audit every viewport from 375 → 1920 with the keyboard, not just the mouse.

### Phase 6 — Performance budget
Lighthouse Performance ≥ 85, CLS ≤ 0.1, no animation longer than the visible content shift it accompanies. Audio bundle ≤ 2MB, lazy-loaded. Heavy assets (video, hero images) gated behind `IntersectionObserver`.

### Phase 7 — Accessibility audit
Keyboard tab through every interaction. Screen-reader announces every state change. `prefers-reduced-motion` path tested. Focus rings visible at all times (no `outline: none` without replacement). Touch targets ≥ 44×44px.

### Phase 8 — Live observe + iterate
Watch real session recordings or scroll-depth analytics. Where do users stop? Where does hover get attempted on mobile (signal of missing fallback)? Where does reveal trigger off-screen (signal of bad threshold)? Tune iteratively.

---

## Anti-Patterns — Reject on Sight

- **Per-character animation on body copy** — distracting, hurts readability, signals "look at the animation" not "read the text"
- **Parallax everywhere** — creates motion sickness on long pages, fights smooth scroll, often desyncs at high refresh rates
- **Bouncy easing (`cubic-bezier(.68,-.55,.27,1.55)`) on enterprise/B2B surfaces** — reads as toy-app
- **Card with heavy shadow + border + bg-tint + corner radius** — pick one container affordance, not four
- **Three-color palette (accent + secondary + tertiary)** — every additional color halves perceived intentionality
- **Hover-only mobile interactions** without tap fallback — 50%+ traffic blind
- **`outline: none` on focus without replacement** — accessibility regression
- **Auto-playing audio or video on load** — annoyance signal, often regulatory issue in EU
- **Page transitions over 1s** — content withheld too long, users hit back button
- **Random transition direction** — feels like a bug to repeat visitors
- **Mixing two animation libraries** (e.g. GSAP + framer-motion on same scroll) — micro-stutter at junction points
- **Hero copy relying on `text-wrap: balance` at mobile** — produces mid-word breaks

---

## Reusable Pattern Library

### Magnetic CTA
```
On pointermove within ~120px radius:
  element.style.transform = `translate(${dx * 0.16}px, ${dy * 0.16}px)`
On pointerleave:
  transition transform back to translate(0,0) over 400ms
```

### Hover tracking-shift on nav links
```
.link        { letter-spacing: 0;    font-weight: 400; transition: 300ms cubic-bezier(.4,0,.2,1) }
.link:hover  { letter-spacing: .15em; font-weight: 500; }
```
Pre-allocate hover width with invisible placeholder span to prevent layout shift on hover.

### Chip-tooltip (replaces dense bullet lists)
```
Rest:  chip with label + caret
Hover: tooltip card slides 8px up + fade-in, max-width 280px, centered to chip
Mobile: tap chip → expand to inline bullet underneath
```
Visible content reduction: ~70%. Full info on demand.

### Scroll reveal (one per viewport)
```
Initial:  opacity: 0; transform: translateY(12px)
On viewport entry (threshold 0.15):
  opacity: 1; transform: translateY(0)
  duration: 600ms; easing: cubic-bezier(.16,1,.3,1)
```
Children get stagger of 60ms each — never more than 5 children at once.

### Page transition (deterministic pair)
```
Route A → Route B:  exit fade 240ms → enter fade-up 12px 400ms
Same easing as scroll reveal — visual language stays unified
Desktop only — mobile uses opacity-only 200ms
```

### Audio CTA-hover trigger
```
On pointerover any [data-music-trigger]:
  if !audioContext.playing:
    audio.volume = 0
    audio.play()
    fade volume 0 → 0.4 over 1200ms
On pointerleave (delegated, after 3s grace):
  fade volume 0.4 → 0 over 800ms
  pause when reaches 0
Always render top-right control widget — user can mute/pause
sessionStorage persists play state across navigation
```

### Hairline separator (replaces card chrome)
```
Section break:  <hr class="border-t border-white/10" />  (NO bg tint on container)
Card surface:   border + transparent bg at rest
Card hover:     border-accent + bg-white/[0.03]   (light fill ONLY on hover)
```

---

## Performance Budgets

| Metric | Budget |
|---|---|
| Lighthouse Performance | ≥ 85 |
| Lighthouse Accessibility | ≥ 95 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | ≤ 0.1 |
| Total Blocking Time | < 200ms |
| Hero image | WebP, < 200KB, with PNG fallback |
| Audio asset | < 2MB, lazy-loaded, single file |
| Font payload | < 100KB total, max 2 families |
| JS bundle (first route) | < 250KB gzipped |
| Animation frame time | ≤ 16ms (60fps) |

---

## Worked Examples

<example>
User: "Cards na stronie wyglądają jak generic marketing."
Skill response: Hairline-separation principle. Strip card bg-tint, keep border + invisible bg at rest. Add light fill (`hover:bg-white/[0.03]` on dark canvas) ONLY on hover. Card becomes editorial line-art at rest, gains affordance on interaction. No always-on visual debt.
</example>

<example>
User: "Hover state na buttons jest płaski — chcę żeby przyciągały."
Skill response: Add magnetic-CTA pattern. Pointer within 120px radius → element offsets 16% of cursor distance. Pair with tracking-shift on label text (`letter-spacing: 0 → .15em`). Two affordances stacked = "intentional", one alone = invisible.
</example>

<example>
User: "Animacje na scrollu są chaotyczne — wszystko leci na raz."
Skill response: Apply reveal budget — 1 reveal group per viewport, stagger children 60ms each (max 5 children). Hero gets no reveal (already in view). Subsequent sections trigger at IntersectionObserver threshold 0.15. Reveal motion uses same easing as page transitions for unified language.
</example>

<example>
User: "Page transitions feel like random bugs."
Skill response: Switch from random-direction to deterministic pairs. Define transition per route pair, never `Math.random()`. Mobile uses opacity-only (no horizontal translates that fight gesture). Same easing as scroll reveals.
</example>

<example>
User: "Mobile typography breakuje mid-word w hero."
Skill response: Drop `text-wrap: balance`. Use explicit `<br/>` line breaks in hero copy. Reduce font-size 15–25% at mobile breakpoint. Tighten line-height to 0.76–0.85. Add 0.005em letter-spacing to compensate visually for size reduction.
</example>

<example>
User: "Audio on scroll/hover — good idea?"
Skill response: Audio is high-stakes brand signal, not background. Conditions: trigger only on user-initiated event (CTA hover, button click). Never autoplay. Cross-fade in/out 600–1200ms. Mobile = widget-only, no hover-trigger. Pick niche-sophisticated piece, never popular. If you can't satisfy all conditions → skip audio entirely.
</example>

---

## Installation

To use as a Claude skill, copy this file to:

```
~/Library/Application Support/Claude/skills/interactive-design-craft/SKILL.md
```

Or package inside a plugin's `skills/interactive-design-craft/` directory and reference in the plugin manifest.

---

*Framework-agnostic craft methodology — patterns translate to React/Vue/Svelte/vanilla. Validated on production sites with smooth-scroll engines (Lenis), motion libraries (framer-motion, GSAP), and audio-context APIs.*
