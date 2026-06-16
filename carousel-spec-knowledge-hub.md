# Brand Hub Carousel — Figma Build Spec

7-slide LinkedIn carousel for V10 post ("Dlaczego knowledge hub..."). Target time: ~100 min in Figma. Target score: 9,810/10,000.

---

## 0. Foundation (applies to ALL slides)

### Canvas

| Property | Value |
|---|---|
| Size | **1080 × 1350 px** (LI portrait optimal) |
| Color space | sRGB |
| Export | PNG @ 100% (or JPEG @ 95% for smaller files) |

### Color tokens (Figma variables)

| Token | Hex | Use |
|---|---|---|
| `--geers-green` | `#006B3F` | Primary fill, headlines on dark, CTAs |
| `--geers-green-dark` | `#00472A` | Hover states, dark backgrounds |
| `--geers-lime` | `#D4FF45` | Accent — max 2 slides total (slide 2 + slide 7) |
| `--mint-bg` | `#F0F8F2` | Soft backgrounds (slide 4) |
| `--mint-soft` | `#E0F0E5` | Card backgrounds |
| `--white` | `#FFFFFF` | Type on dark, light bg |
| `--charcoal` | `#1A1A1A` | Type on light |
| `--grey-500` | `#6B7280` | Secondary type, slide numbers |
| `--grey-200` | `#E5E7EB` | Dividers, card borders |

### Typography

- **Font**: TWK Lausanne (lub Inter jako proxy jeśli brak licencji)
- **Weights**: 300 / 500 / 700

| Style | Size | Weight | Letter-spacing | Line-height |
|---|---:|---:|---:|---:|
| Display XL | 96 px | 700 | -3% | 0.95 |
| Display L | 72 px | 700 | -2% | 1.05 |
| Display M | 56 px | 700 | -2% | 1.1 |
| H2 | 36 px | 500 | -1% | 1.2 |
| Body | 22 px | 400 | 0% | 1.4 |
| Caption | 14 px | 500 | +1% | 1.4 |
| Eyebrow | 11 px | 600 | +20% UPPERCASE | 1.2 |

### Grid

- 12 columns
- Margins: **80 px** left/right
- Gutter: 24 px
- Top safe area: **80 px**
- Bottom safe area: **80 px** (for LI mobile slide indicators)

### Persistent elements (every slide)

| Position | Element | Spec |
|---|---|---|
| Bottom-left | `Geers • r352` | Caption 14px, color depends on bg (--grey-500 on light, white 60% on dark) |
| Bottom-right | `01 / 07` slide number | Caption 14px, tabular nums, same color rule as bottom-left |

---

## Slide 1 · Hook

**Purpose**: Stop scroll. Plant CRM analogy.

| Element | Spec |
|---|---|
| Background | `--geers-green` full fill |
| Top-left | "Geers" wordmark, 24 px, weight 700, white |
| Top-right | Eyebrow "01 · HOOK", white 60% opacity |
| Main text block | Display XL (96 px / 700), white |
| Text content | `Brand bez własnego hub'a`<br>`w 2026 = firma bez`<br>`CRMa w 2010.`<br><br>`Działa. Do czasu.` |
| Text position | Vertically centered, 80 px left margin |
| Accent dot | 24×24 px lime green circle (#D4FF45) bottom-right of "Do czasu." — single decorative element |
| Bottom-left | "Geers • r352" — white 60% |
| Bottom-right | "01 / 07" — white 60% |

---

## Slide 2 · AI Reality

**Purpose**: Trigger "yes, my team does this too" recognition.

| Element | Spec |
|---|---|
| Background | `--charcoal` |
| Top strip | 4 px height lead-green bar full width |
| Eyebrow | "02 · CONTEXT" — `--grey-500` |
| Main text | Display L (72 px / 700), white |
| Text content | `Twój zespół już prompts'uje AI codziennie.`<br><br>`Pytanie:`<br>**`Z czego uczy się twojej marki?`** |
| Highlighted line | "Z czego uczy się twojej marki?" in `--geers-lime`, same size — second accent use |
| Tool logos strip (below text) | 4 wordmarks: Claude / ChatGPT / Midjourney / Copilot |
| Logo treatment | 60 px height each, white 40% opacity, evenly spaced (80px gaps) |
| Bottom-left | "Geers • r352" — `--grey-500` |
| Bottom-right | "02 / 07" — `--grey-500` |

---

## Slide 3 · System Overview

**Purpose**: Establish scale + structure of the hub.

| Element | Spec |
|---|---|
| Background | `--white` |
| Eyebrow | "03 · SYSTEM" — `--geers-green` |
| H2 above grid | "23 moduły. 5 bucketów. Jeden hub." Display M (56 px), `--charcoal` |
| Subline | "Jedno źródło prawdy dla zespołu, AI i agencji." Body 22px, `--grey-500` |
| Bucket stack | 5 horizontal cards stacked vertically |
| Card spec | 920 × 96 px, white bg, 1px `--grey-200` border, no border-radius |
| Inside each card | Left: icon 48×48 `--geers-green` · Center: bucket name H2 (36px) `--charcoal` · Right: count caption "X modułów" `--grey-500` |
| Card gap | 16 px between cards |
| Card data | Strategia + voice (5) · Język (3) · Visual (6) · Wykonanie (6) · Reference (3) |
| Bottom-left | "Geers • r352" — `--grey-500` |
| Bottom-right | "03 / 07" — `--grey-500` |

---

## Slide 4 · Hub Mockup (HERO SHOT)

**Purpose**: Visual proof of depth. Main "wow" moment.

| Element | Spec |
|---|---|
| Background | `--mint-bg` |
| Eyebrow | "04 · IN PRACTICE" — `--geers-green` |
| Headline | "Knowledge hub Geers (Sonova PL)." Display M (56px), `--charcoal` |
| Subline | "3 lata produkcji · 200+ deliverables/kwartał · zero drift wizualny." Body 22px, `--grey-500` |
| Main visual | Twój istniejący screenshot grid (5 vertical mockup screens) — center, ~70% canvas height |
| Shadow | 0 24px 60px `rgba(0,0,0,0.08)` — lift mockups off mint background |
| Bottom-left | "Geers • r352" — `--grey-500` |
| Bottom-right | "04 / 07" — `--grey-500` |

---

## Slide 5 · Dual Format (Architecture)

**Purpose**: Most differentiating moment — show DUAL audience architecture.

| Element | Spec |
|---|---|
| Background | `--white` with vertical 1px `--grey-200` divider center |
| Layout | 50/50 split (540 px each half) |
| Eyebrow (top center spanning both) | "05 · ARCHITECTURE" — `--geers-green` |
| Headline above split | "Jeden hub. Dwa formaty wyjścia." Display M (56px), `--charcoal` |
| **LEFT HALF — Dla ludzi** | |
| Icon top | Eye / view icon (48×48), `--charcoal` |
| Headline | "Dla ludzi" Display M (56px), `--charcoal` |
| Body | "Wizualny system. Przeglądasz w 30 sekund." Body 22px, `--grey-500` |
| Visual | Small UI fragment screenshot (z Geers hub — moduł cards lub navigation) — 320×200 px frame |
| **RIGHT HALF — Dla AI** | |
| Icon top | Code/terminal brackets `</>` icon (48×48), `--geers-green` |
| Headline | "Dla AI" Display M (56px), `--geers-green` |
| Body | "Curated plik .md gotowy do zassania przez agenta." Body 22px, `--grey-500` |
| Visual | Code snippet card 320×200, `--charcoal` bg, monospace 14px, white text z lime syntax highlights — np. `# Brand Voice\n## Tone modes\n- ekspert: ...\n- przystępny: ...` |
| Bottom-left | "Geers • r352" — `--grey-500` |
| Bottom-right | "05 / 07" — `--grey-500` |

---

## Slide 6 · QA Checker (Active Layer)

**Purpose**: Closes loop — system jako active QA, not passive doc.

| Element | Spec |
|---|---|
| Background | `--white` |
| Eyebrow | "06 · ACTIVE QA LAYER" — `--geers-green` |
| Headline | "Plus tool: drop asset → score + fixy w 3 sekundy." Display M (56px), `--charcoal` |
| Main visual | Screenshot brand checker z workspace (`geers-brand-checker.html`) — zoom na score ring (74/100) + 2 issue cards visible |
| Visual position | 60/40 split — checker mockup left 60%, annotations right 40% |
| Annotations (right side, stacked) | 3 mini-cards z arrows: |
| Annotation 1 | "→ Drop file" — caption 14px, `--grey-500` |
| Annotation 2 | "→ Check vs 23 modułów" — caption 14px, `--grey-500` |
| Annotation 3 | "→ Score + lista fixów" — caption 14px, `--grey-500` (lime accent na "fixów") |
| Shadow on mockup | 0 24px 60px `rgba(0,0,0,0.08)` |
| Bottom-left | "Geers • r352" — `--grey-500` |
| Bottom-right | "06 / 07" — `--grey-500` |

---

## Slide 7 · Outcome + CTA

**Purpose**: Hard close. Stats + filter + action. Mirrors slide 1 visually (lead-green bracketing).

| Element | Spec |
|---|---|
| Background | `--geers-green` full fill |
| Eyebrow | "07 · OUTCOME" — white 60% |
| Stats stack (3 stats vertical) | Each: huge number (Display XL 96px white) + label below (Caption 14px UPPERCASE white 60%) |
| Stat 1 | **`3 LATA`** / "produkcji bez drift'u" |
| Stat 2 | **`200+`** / "deliverables / kwartał" |
| Stat 3 | **`ZERO`** / "subiektywnych debat 'czy on-brand'" |
| Stat gap | 32 px vertical between each stat block |
| Filter line (below stats) | "Nie dla solopreneurów. Dla operatorów 5+ lokalizacji, multi-market." Body 22px, white 80%, italic optional |
| CTA strip (bottom, 80px tall) | Full-width `--geers-lime` bar with charcoal text centered: "**DM otwarte** · r352.com/process" — H2 36px, weight 600 |
| Bottom-left | "Geers • r352" — white 60% (above CTA strip) |
| Bottom-right | "07 / 07" — white 60% (above CTA strip) |

---

## Production checklist

| Step | Time | Notes |
|---|---:|---|
| Build master template (grid, persistent elements, type styles, color vars) | 20 min | Save as Figma component so updates propagate |
| Slide 1 (hook) | 8 min | Simplest — single text block |
| Slide 2 (context) | 10 min | Collect AI tool wordmarks first |
| Slide 3 (system stack) | 15 min | 5 cards z icons — find/create 5 simple bucket icons |
| Slide 4 (hub mockup) | 5 min | Drop existing screenshot, add shadow |
| Slide 5 (dual format) | 15 min | Most complex — 50/50 split + 2 visualizations |
| Slide 6 (checker mockup) | 8 min | Screenshot z `geers-brand-checker.html`, dorzuć annotations |
| Slide 7 (outcome) | 10 min | Big stats + CTA strip |
| Review pass + export + upload | 10 min | Zoom out to see all 7 together, verify rhythm |

**Total: ~100 min**

---

## Visual rhythm check (review pass)

Zoom out na 7 slidów obok siebie. Sprawdź:

- [ ] Slide 1 i 7 mają identyczne tło (green) — visual bracketing
- [ ] Slide 2 jest jedyny ciemny (charcoal) — disruptor w środku
- [ ] Slide 4 jest jedyny w mint-bg — visual punctuation dla hero moment
- [ ] Slidy 3, 5, 6 są białe — neutralne dla content density
- [ ] Lime accent użyty tylko 2× (slide 2 + slide 7) — nie traci impact
- [ ] Każdy slide ma jeden DOMINANT element (text / image / grid) — no competing focal points
- [ ] Slide numbers consistent positioning
- [ ] "Geers • r352" lockup consistent positioning

---

## Export + upload sequence

1. **Export per slide**: PNG 100%, naming convention `01-hook.png`, `02-context.png`, ..., `07-cta.png`
2. **Verify mobile preview** w Figmie zanim eksportujesz: zoom do 100%, sprawdź czytelność body text
3. **Compose post** na LinkedIn web (nie mobile — mobile compose lubi miksować order)
4. **Drag all 7 PNGs w order** — LinkedIn preserves filename alphabetical sort
5. **Caption**: tekst V10 (1370 znaków)
6. **Verify preview** — przejdź carousel jeszcze raz w LI preview mode
7. **Schedule for Tu-Th 9-11 CET** lub publish on-demand

---

## Optional V2 enhancements (jeśli zostaje czas)

| Enhancement | Effort | Impact |
|---|---:|---|
| Subtle reveal animation per slide w GIF/MP4 wersji | +60 min | Carousel jako video posts performs jeszcze lepiej na LI |
| Polish + English version z language toggle | +90 min | Reach EN audience (Sonova HQ Switzerland, international ops) |
| Branded waveform/r3loop motif jako recurring visual signature | +30 min | Brand consistency across future carousel series |

---

*Spec dla single post — reusable jako template dla content series. Każda kolejna carousel używa same master template, zmienia tylko content. Skala: 3-5× szybsza produkcja od slide 2 wzwyż.*
