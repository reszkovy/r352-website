# r352 Design System

> Verified against code: 2026-07-12 (npm run brand:check). When this file and the code disagree, the code wins.

This document is the operating manual for r352.com's visual and verbal system - every color, type recipe, layout token, component contract, motion curve, shader constant and copy rule, read directly from source code (React 18 + Vite 6, Tailwind v4 arbitrary classes, wouter, motion/react, Lenis, raw WebGL). It exists so any contributor - human or AI agent - can ship work indistinguishable from the house style, and so drift is caught against file-cited values instead of memory.

Source of truth: this codebase; last generated DATE

How to use it:
- Humans: read section 0, then jump to the domain you are touching. Every value is exact and file-cited (path:line). Follow the Usage rules and Do/Don't lists literally.
- AI agents: treat file references as verification anchors - re-read the cited line before relying on a value; when this document and the code disagree, the code wins and this file should be regenerated. Never introduce a long dash anywhere (copy, code, or this file). New colors, easings, container widths and copy patterns are forbidden unless added here first.
- Conflicts between extraction passes were resolved toward the more specific file-cited value; every unresolved conflict is flagged inline and listed in the Appendix.

## 0. Brand core

- Positioning: r352 is an **operator, not an agency** - design operations for brands delivering at scale. Stated as identity, never as comparison copy (Chatbot.tsx:41, Careers.tsx hero, Glossary.tsx:65).
- Vibe layer: **oldschool electro/breakdance x futurism** - "machines + funk". It is grammar, not costume: it lives in the shader names (808, R3loop), the Planet Rock instrumental soundtrack, the 129 BPM clock, the b-boy law "show, don't talk" / "pokaz, nie gadaj" (Philosophy.tsx:201) - never as literal retro styling.
- Mantra: "Move fast, steady cadence." / "Tempo bez chaosu." - demoted from headline to signature line, rendered with a "-" prefix in lime Tanker (translations.ts:31,677; AgencyHero.tsx:222-226).

Hard rules (non-negotiable):
1. **No long dashes, ever.** Not em, not en - every dash in r352 copy is "-", usually spaced " - ". Applies to EN and PL alike.
2. **Dark theme is primary and default.** Light theme is an override layer (`body.global-light-mode` in src/styles/theme.css), never a parallel design.
3. **Silence = stillness.** Nothing pulses when the music is off; all beat-locked motion is gated by `u_live`.
4. **Never fabricate metrics.** Every published number must be verifiable; unverified claims get downgraded or flagged, never shipped optimistic.
5. **Never rewrite client quotes.** Testimonials ship verbatim with real name + role + company, or carry a placeholder warning comment.
6. **PL + EN parity.** All copy is bilingual at birth; EN is the structural source of truth and fallback, so EN must always exist.
7. **prefers-reduced-motion respected in every canvas** - one still frame, no rAF loop.

## 1. Color & theming

Near-monochrome dark system with one loud accent: graphite/near-black surfaces, neutral greys for hierarchy, neon lime #D4FF00 as the single signal color, clay #D97757 as an emerging warm secondary (AI connotation, "nod to Claude"). Primary sources: src/styles/theme.css (925 lines), src/app/context/ThemeContext.tsx.

### Core dark palette

| Value | Role | Where |
|---|---|---|
| `#151515` | Base surface: `--background` token (theme.css:5,15); app root `bg-background` (App.tsx:337); band surface - ClientLogos.tsx:35, Home.tsx:40 proof strip, Footer.tsx:69 CTA band + vignette gradients Footer.tsx:74-75 |
| `#0A0A0A` | Darker plane: `--background-dark`, `--card`, `--popover` (theme.css:16,22,25); `<meta theme-color>` + splash (index.html:63,95); Privacy.tsx:30, Cookies.tsx:61, Footer.tsx:118; card fills ServicesList.tsx:154; hero scrims HeroWebGLBackground.tsx:269, EffectBackdrop.tsx:214; feathered edges Home.tsx:83-84; theme-sweep target ThemeContext.tsx:72 |
| `#0f0f0f` | Card hover step up from #0a0a0a (ServicesList.tsx:154) |
| `#050505` `#080808` `#111` | Deepest fills (EngagementModels, AreasOfWork, MagnetGrid, Home); light-mode overrides theme.css:531-564 |
| `#363636` | Graphite "lifted" stay-dark band - single use, Operating Model teaser (Home.tsx:81) |
| `#f5f5f5` | `--foreground` (theme.css:6,17) |
| `#1a1a1a` | `--muted` / `--secondary` / `--accent` surfaces (theme.css:9,28,31,34) |
| `#888888` | `--muted-foreground` (theme.css:10,32) |
| `#262626` | `--border` / `--input` (theme.css:11,40-41) |
| `#D4FF00` | Neon lime: `--primary`, `--ring`, `--secondary-foreground`, `--accent-foreground` (theme.css:7,19,29,35,42); ~1180 raw refs; focus ring `outline: 2px solid #D4FF00` (theme.css:104); type-sub tokens (theme.css:289,295); CursorGlow.tsx:69-71; toggle sweep `bg-[#D4FF00]/90` (ThemeContext.tsx:58); skip-to-content link (App.tsx) |
| `#DAFF45` | Logo-asset lime ONLY - see "two limes" below |
| `#D97757` | Clay accent (CSS side) - see clay below |
| `#000000` | `--primary-foreground` - text on lime (theme.css:8,20) |
| `#990000` / `#ffffff` | `--destructive` / `--destructive-foreground` (theme.css:37-38) |
| Text neutrals | `text-white`, `text-neutral-200/300/400/500/600`; type utilities pin: `.type-body-lg` neutral-300, `.type-body-base` neutral-400, `.type-body-sm` / `.type-sub-sm` neutral-500 (theme.css:301-327) |
| Selection | Dark: `selection:bg-white selection:text-black` (theme.css:142, App.tsx:337); light: black/white (theme.css:701-709) |

Off-system exceptions: `src/app/pages/LimitedAccess*.tsx` uses #10b981, #9B51E0, #FF6B35, Apple-ish #0071e3/#1d1d1f - gated one-off pitch pages, not brand palette. `Estymacja907.tsx` is a second fully off-system surface: an Osada Orle client-branded page (Fraunces + Work Sans; paper #F0ECE4, brass #B87333, ink #2B2B2B), fixed `z-[100000]` overlay, noindex, r352 splash suppressed - and it carries the site's ONLY print pattern (`@media print` visibility isolation of #estymacja-root, `.no-print` class, `@page { margin: 14mm }`, `print-color-adjust: exact`, window.print() PDF button; Estymacja907.tsx:77-93). Print support exists only on client-deliverable pages via this pattern; the r352 site itself has no print styles by design.

### Semantic tokens (Tailwind v4 `@theme inline`, theme.css:47-67; `--radius: 0rem` - everything sharp)

| Token | Dark (`:root`/`.dark`) | `body.global-light-mode` (theme.css:411-428) | `body.lime-theme` (theme.css:431-448, orphaned) |
|---|---|---|---|
| --background | #151515 | #F1F6FA | #F1F6FA |
| --foreground | #f5f5f5 | #000000 | #000000 |
| --primary / --primary-foreground | #D4FF00 / #000000 | #000000 / #FFFFFF | #000000 / #F1F6FA |
| --card / --card-foreground | #0a0a0a / #f5f5f5 | #F5F5F5 / #000000 | #FFFFFF / #000000 |
| --secondary, --muted, --accent | #1a1a1a | #E5E5E5 | #b8c8d0 |
| --muted-foreground | #888888 | #1a1a1a | #1a1a1a |
| --border / --input | #262626 | rgba(0,0,0,0.15) / rgba(0,0,0,0.1) | same |
| --ring | #D4FF00 | #000000 | #000000 |

Light master background is `#F1F6FA` (cool near-white), not pure white; footer in light mode is forced to `#FFFFFF` surfaces (theme.css:730-739).

### The two limes

- `#D4FF00` = UI accent lime - every interactive/typographic accent, tokens, focus ring, CTAs, sweeps, WebGL (as vec3). Default for anything new. ~1180 refs.
- `#DAFF45` = logo-asset lime (slightly warmer/lighter), only in logo artwork: `R352Symbol`/`R352Text` default `color="#DAFF45"` (R352Logo.tsx:10,42), header logo `text-[#DAFF45]` + `color="currentColor"` (AgencyHeader.tsx:217,232), splash SVG fills (App.tsx:124-125), imported Figma SVGs in src/imports/. 159 refs.
- Light mode flips both `.text-[#D4FF00]` and `.text-[#DAFF45]` to #000000 (theme.css:492-495); inside `.stay-dark` both are pinned to `#D4FF00` (theme.css:856-859) - note the pin renders DAFF45-classed elements as D4FF00.
- Favicon/PWA family renders the mark in asset lime #DAFF45 on #0A0A0A: index.html:57-63 links favicon.svg (modern-first), legacy favicon.ico, 16/32 PNGs, apple-touch-icon 180x180, manifest.webmanifest (which adds the 96/192/512 PNGs) and `theme-color #0A0A0A`. Regenerate the whole set together when the mark changes.

### Clay: CSS vs shader discrepancy

- CSS clay = `#D97757`: ChipTooltip "clay" variant `text-[#D97757] border-[#D97757]/40`, active `bg-[#D97757]/[0.06]` (ChipTooltip.tsx:85,90); header tagline "AI" segment `text-[#D97757]` (AgencyHeader.tsx:254) - in-code a test placement of the warm secondary.
- Shader clay = `vec3(0.851, 0.463, 0.341)` = rgb(217,118,87) ~ `#D97657` - 1/255 lower in green than CSS. Defined in EffectBackdrop.tsx:46,72, HeroWebGLBackground.tsx:47, ~10x in WebGLExperiment.tsx. (The #D9764F cited in earlier briefs matches neither - it would be blue 0.310.) Conflict unresolved - see Appendix.
- Shader lime = `vec3(0.831, 1.0, 0.0)` = rgb(212,255,0) = exactly `#D4FF00` - only clay drifts. Shader base/near-black = `vec3(0.010)` ~ `#030303` (EffectBackdrop.tsx:47).

### Light-theme lime derivatives (raw lime on light fails contrast: #D4FF00 vs #FFFFFF ~ 1.07:1, theme.css:109-110)

| Value | Role |
|---|---|
| `#6B8F00` | Standard "lime in light": link/footer hovers (theme.css:628,764-791,826), hero glow (AgencyHero.tsx:28), ChipTooltip light text (ChipTooltip.tsx:93) |
| `#9ABB00` | Dual-variant pattern `text-[#9abb00] dark:text-[#D4FF00]` (Process.tsx:398-424, LoopPath.tsx:59) |
| `#3A5500` / `#C5E800` | Engagement-card hover lime text / bg in light (theme.css:555,559) |
| `#E0FF33` | Hover-lightened lime on solid-lime CTAs, dark (`hover:bg-[#e0ff33]`, Pricing.tsx:177 + LimitedAccess) |
| Focus ring | flips lime -> #000000 in light (theme.css:111-119) |

Escape hatches keeping raw lime alive in light: `.lime-accent`, `.lime-accent-bg`, `.lime-accent-border`, `.ref-heading` - pinned `#D4FF00 !important` (theme.css:497-511); used in EngagementModels.tsx, References.tsx (lime on dark card fills even in light theme).

### Theming architecture

1. Dark default: `ThemeProvider` starts `'dark'` (ThemeContext.tsx:16); `.dark` class on the app root div (App.tsx:337), not `<html>`; `dark:` variants via `@custom-variant dark (&:is(.dark *))` (theme.css:1).
2. Light mode = two mechanisms: `.dark` removed AND `body.global-light-mode` added (ThemeContext.tsx:39-46) - token swap (theme.css:411-428) plus ~90 `!important` override rules on escaped Tailwind classes (`.text-white`, `.bg-\[\#0A0A0A\]`, gradients, header, footer, preloader; theme.css:461-828).
3. **KNOWN PITFALL - the override list is an allowlist.** Only literally enumerated class names flip in light mode; any new hardcoded color silently stays dark-styled on the light background. Use semantic tokens, or the dual-variant pattern (`text-[#9abb00] dark:text-[#D4FF00]`, `bg-white dark:bg-[#0a0a0a]` - Diagnostic.tsx:512), or add the class to theme.css.
4. `body.lime-theme` ("Lime Theme - Grey") is orphaned - only removed (App.tsx:322-323) and read (AgencyHeader.tsx:47, AnimeGrid.tsx:137). Treat as legacy.
5. Toggle choreography: `body.theme-transitioning` puts 0.8s `cubic-bezier(0.22,1,0.36,1)` on bg/color/border/fill/shadow (theme.css:450-458; body always transitions, theme.css:145); two-layer sweep lime `bg-[#D4FF00]/90` then target `#0A0A0A/90` or `#F1F6FA/90`, ease `[0.76,0,0.24,1]`, R352Symbol in #D4FF00, tagline clipPath reveal (ThemeContext.tsx:53-104).
6. Never go light: the preloader (`.fixed.z-[10000].bg-black` pinned #000, theme.css:815-818) and `.stay-dark` bands.
7. Header: `mix-blend-difference` until scrolled (AgencyHeader.tsx:166); light mode kills the blend, forces black text (theme.css:607-625); `.mix-blend-screen` elements get `opacity: 0` in light (theme.css:655-657).

### Stay-dark band pattern

Sections classed `.stay-dark` stay dark in BOTH themes (keeps the fixed nav legible passing over them). Single instance: Operating Model graphite band, `<section className="relative isolate stay-dark">` (Home.tsx:79) with graphite fill `absolute inset-0 -z-10 bg-[#363636]` (Home.tsx:81) and feathered edges `h-32 md:h-48 bg-gradient-to-b from-[#0A0A0A] to-transparent` top / `to-t` bottom (Home.tsx:83-84). Light-mode exceptions (theme.css:836-869) pin text: `.text-white` -> #FFFFFF, neutral-200/300/400/500 -> #E5E5E5/#D4D4D4/#A3A3A3/#737373, lime classes -> #D4FF00; feathers re-point `from #F1F6FA`.

### Gradients, scrims, grain

- Feathered band edges: `from-[#0A0A0A] to-transparent`, height 8rem/12rem (Home.tsx:83-84) - the house technique for full-bleed bands. Theme-aware example: ForAgencies.tsx:168.
- WebGL readability scrims: `bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/15` (HeroWebGLBackground.tsx:269); `via-[#0A0A0A]/55 to-[#0A0A0A]/20` (EffectBackdrop.tsx:214).
- Image hover scrim `from-black/80 via-black/10 to-transparent` (SelectedWork.tsx:65); header scroll scrim `from-black/95 via-black/55 to-transparent` (AgencyHeader.tsx:179); footer vignette `from-[#151515] via-transparent to-[#151515]` (Footer.tsx:74-75); fixed bottom fade `from-black/30 via-black/10 to-transparent` (BottomGradient.tsx:10).
- Light-mode gradient kill-switch: `bg-gradient-to-b/r` get from/to forced to solid #FFFFFF (#F1F6FA under lime-theme) (theme.css:673-699) - decorative dark gradients vanish in light mode unless `.stay-dark` or theme-aware.
- Grain is dormant: `GrainOverlay` (ui/GrainOverlay.tsx: fixed z-[2000] mix-blend-overlay opacity 0.035, 140x140 feTurbulence tile) is unmounted (only a comment, App.tsx:14-15); `.bg-noise` / `.animate-noise` (theme.css:171-182,201-217) unused in TSX. WebGL carries its own in-shader grain `col += (hash(gl_FragCoord.xy + u_time) - 0.5) * 0.016`.

### Rules

1. Default to semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `border-border`) - the only colors guaranteed to flip in light mode.
2. One accent at a time: lime #D4FF00 is the signal; clay #D97757 only for AI-flavored accents, never competing with lime in one element. #DAFF45 is logo artwork only.
3. Lime on light backgrounds uses the derivative greens (#6B8F00 default, #9ABB00 dual-variant) or flips to black.
4. Every new hardcoded color is paired: `x dark:y` variants or a theme.css light-mode override entry - otherwise it reads as a dark-mode leak.
5. In GLSL: lime `vec3(0.831,1.0,0.0)`, clay `vec3(0.851,0.463,0.341)` - keep the literals so all canvases match.
6. Focus is global (2px lime ring, offset 3px, theme.css:97-119; black in light) - no per-component focus colors or `outline-none`.
7. Surface layering (dark): base #151515 -> cards #0a0a0a (hover #0f0f0f) -> deepest #050505/#080808 -> graphite lift #363636; hairlines `border-white/5` or `/10`.
8. Don't rely on decorative `bg-gradient-to-b/r` surviving light mode; feather band edges instead of hard borders.

## 2. Typography

Two-voice system: **Tanker** (display, single weight 400, all-caps "machine label" voice) against a quiet mid-weight grotesque body (**BW Haas Head**, capped at 500). Scale is extreme at the top (10rem+ heroes, viewport-width watermark numerals) and tiny at the bottom (9-12px uppercase kickers, wide tracking). All weights flatten to 500, tight tracking flattens to -0.02em - contrast comes from size, case and lime, not weight.

### Families

| Token | Value | Where |
|---|---|---|
| `--font-display` | `"Tanker", sans-serif` | theme.css:69; Safari: `"Tanker", "Plus Jakarta Sans", system-ui, sans-serif` (theme.css:353) |
| `--font-body/--font-sans/--font-serif/--font-mono` | `"Bw Haas Head", "Helvetica Neue", Helvetica, Arial, sans-serif` | theme.css:70-73; Safari: `"Plus Jakarta Sans", system-ui, -apple-system, sans-serif` (theme.css:355-358) |

- **Tanker is self-hosted**: `@font-face` fonts.css:23-32, `/fonts/Tanker-Regular.woff2/.woff`, weight 400 only, `font-display: swap`; self-hosted because Fontshare CDN fails on Safari (fonts.css:1-21). Files verified in public/fonts/.
- **BW Haas Head** (primary body on Chromium/Firefox) loads from `https://fonts.cdnfonts.com/css/bw-haas-head` (index.html:48), non-blocking via `media="print" onload` swap + `<noscript>` duplicate (index.html:50-53). CDN is flaky (has returned 500s) - fallback-first: Helvetica Neue/Arial paints, webfont swaps in.
- **Plus Jakarta Sans** (Google Fonts, 400;500;600;700, index.html:49) is the **Safari-only body** via UA-sniff `html.safari` (index.html:70-80, theme.css:351-359). It is NOT the body on Chrome/Firefox/Edge - conflict with the "PJS = body" brand anchor, see Appendix.
- `.font-display` hard-locks Tanker `font-weight: 400 !important` (theme.css:329-332; Safari theme.css:363-366). Workhorse: 477 tsx uses vs 17 `font-sans`, 34 `font-mono`.
- **No real monospace**: `--font-mono` aliases the body sans (theme.css:73); `.font-mono` (34 uses, ServicesList.tsx:217, KineticManifesto.tsx:222) is a "technical annotation" semantic marker.

### Weights (capped) and base elements

`--font-weight-bold/semibold/black` all = `500` (theme.css:79-81,872-874). `font-bold` (488 uses), `font-semibold` (44), `font-black` all render 500; `font-medium` 169, `font-normal` 188. Safari remap: `html.safari .type-h1/h2/h3 { font-weight: 600 !important }` (PJS 600 ~ BW Haas Head 500 optically, theme.css:368-375; body needs no bump :377-378). Base safety net: `h1-h6 { font-sans font-medium tracking-normal; text-wrap: balance }` (theme.css:152-160), `p { text-wrap: pretty }` (:165-167), body `font-sans antialiased, letter-spacing: 0` (:141-146).

### type-* utilities (theme.css:260-327)

| Class | Font/color | Size | Leading / tracking |
|---|---|---|---|
| `.type-h1` | sans, white, `500 !important` | `clamp(3.5rem,6vw+1rem,7rem)`; >=768px `clamp(5rem,9vw+1rem,10rem)` | `0.85`, `-0.02em`, balance |
| `.type-h2` | sans, white, 500 | `clamp(2.5rem,4vw+1rem,4.5rem)` | `0.95`, normal, balance |
| `.type-h3` | sans, white, 500 | `clamp(1.5rem,2vw+1rem,2.5rem)` | tight, balance |
| `.type-sub-lg` / `.type-sub-base` | Tanker uppercase #D4FF00 | 1.25rem / 1rem | tracking-widest (0.1em), balance |
| `.type-sub-sm` | Tanker uppercase neutral-500 | 0.875rem | `0.15em`, balance |
| `.type-body-lg` | sans neutral-300 | 1.25rem, >=768px 1.5rem | relaxed, pretty |
| `.type-body-base` / `.type-body-sm` | sans neutral-400 / neutral-500 | 1rem / 0.875rem | relaxed, pretty |

Light overrides (theme.css:631-645,659-665): type-sub and type-h flip to #000000, type-body to #1a1a1a, `.font-display` to #000, `.font-mono` to #1a1a1a; `.stay-dark` keeps lime kickers lime (theme.css:856-859). **Adoption reality**: type-* is sparse - type-h1 2x (AgencyHero.tsx:56,76), type-h2 3x (SelectedWork.tsx:28, References.tsx:120, ProjectDetails.tsx:672), type-h3 1x, type-sub-base 2x, type-body-lg 1x; most headings are hand-composed (see Appendix).

### Heading scale in practice

- Usage counts: text-4xl 100, text-5xl 82, text-6xl 49, text-7xl 42, text-8xl 22, text-9xl 2 (footer mega-CTA only, Footer.tsx:84,87).
- **Canonical heading family** (~87 hits): `font-bold tracking-tighter` on a text-4xl/text-5xl base with md/lg step scale (`font-bold tracking-tighter` alone = 100 lines). Largest step trio `text-4xl md:text-6xl lg:text-7xl` 21x (PinnedHowItWorks.tsx:178,188, Work.tsx:225). Leading varies per instance - `leading-[0.98]` only 4x in the whole codebase (PinnedHowItWorks.tsx:178,188, ForAgencies.tsx:244, Careers.tsx:182), `leading-[0.95]` on big page heroes (IndustryDetail.tsx:177 with `[text-wrap:balance]`), default elsewhere - renders weight 500 / -0.02em via token caps.
- Hero desktop: `type-h1 !text-[clamp(2.75rem,5.8vw,7.25rem)] leading-[0.95]` (AgencyHero.tsx:56); mobile: `type-h1 !text-[40px] leading-[0.76]` so PL/EN holds one line at 375-393px, deliberately no text-balance (AgencyHero.tsx:66-76).
- WebGL gallery title: `font-display font-normal uppercase !text-[clamp(3.5rem,11vw,12rem)] leading-none tracking-tight [text-shadow:0_2px_60px_rgba(0,0,0,0.7)] mix-blend-screen` (WebGLExperiment.tsx:1063).
- KineticManifesto: `text-[clamp(3rem,10vw,10.5rem)]` (:213), lime finale `clamp(3rem,12vw,13rem)` (:244), mono aside `clamp(1rem,2vw,1.6rem)` (:222).
- Ghost numerals: `font-display font-bold leading-none tabular-nums text-white/[0.05] text-[40vw] md:text-[32vw]` (PinnedHowItWorks.tsx:269); `text-[clamp(120px,25vw,400px)] tracking-tighter text-white/[0.02]` (Philosophy.tsx:263).
- Leading distribution: relaxed 220 (body), snug 55, none 43 (display/Tanker), `[0.95]` 31 (big headings), tight 30, `[0.9]` 5.

### Kickers, numerals, tracking, wrapping, shadows

- **Kicker canonical**: `font-display uppercase tracking-[0.2em] text-xs text-[#D4FF00]`, often `text-[10px] md:text-xs` (Philosophy.tsx:95). Light-tolerant: `text-neutral-800 dark:text-[#D4FF00]` (Philosophy.tsx:119,159,241,281). Interactive: `group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500` (KineticManifesto.tsx:131, AgencyHero.tsx:209). Size counts with `font-display uppercase`: text-xs 153, text-[10px] 93, text-sm 59, text-[11px] 28, text-[9px] 9. Tracking ladder: `[0.2em]` 145 (default), `[0.25em]` 43, `[0.15em]` 31, `[0.3em]` 11 (ceremonial, e.g. WebGLExperiment.tsx:1054). Lime text: `text-[#D4FF00]` 500 uses vs `text-[#DAFF45]` 2 (header logo only).
- **tabular-nums** (17 uses) mandatory on any numeral that counts, aligns or changes: Preloader.tsx:151, SelectedWork.tsx:71, PinnedHowItWorks.tsx:116,269, Home.tsx:58, LimitedAccess2.tsx:845, LimitedAccess3.tsx:487, Estymacja907.tsx:143-188.
- Tracking tokens: `--tracking-tighter` and `--tracking-tight` are **intentionally identical** at `-0.02em` (theme.css:82-83,875-876); Safari `.tracking-tighter` becomes `-0.05em !important` (theme.css:383-385). Counts: widest 203, tight 128, tighter 106, normal 31, wide 22. Rule: negative -0.02em on large sans headings; positive 0.15-0.3em only on uppercase Tanker micro-labels; body 0. Micro-interaction: `tracking-normal -> tracking-[0.02em]` on hover with `ease-[cubic-bezier(0.22,1,0.36,1)]` (SelectedWork.tsx:79). Figma-export noise exists (`tracking-[-3.8958px]` 12x, `[-0.1516px]` 8x) - not system values, never copy.
- text-wrap: global balance/pretty (theme.css:148-167, rationale :248-258 - balance ok to ~6 lines, pretty kills widows); `[text-wrap:pretty]` 45 uses (WhyBreaksNow.tsx:62, IndustryDetail.tsx:180), `[text-wrap:balance]` on composed spans (ServicesList.tsx:201, ChipTooltip.tsx:164); helpers theme.css:184-192; PL hyphenation `[lang="pl"] { hyphens: auto }` (theme.css:197-199) - set `lang="pl"` on PL content.
- Text over canvases: soft black glow only, 14-60px blur, alpha 0.5-0.7, y-offset 0-2px: `0_2px_60px_rgba(0,0,0,0.7)` + mix-blend-screen + scrim (WebGLExperiment.tsx:1049,1063), `0_0_16px_rgba(0,0,0,0.5)` (FloatingBriefCTA.tsx:60), `0_0_14px_rgba(0,0,0,0.7)` (Chatbot.tsx:271).

### Rules

1. Tanker = labels, kickers, numerals, uppercase display moments; one weight (400), never fake-bold it, never load new weights.
2. Big headings are the body sans, not Tanker: `font-bold tracking-tighter` + stepped scale or clamp; expect rendered weight 500 (don't expect bold/semibold/black to differ).
3. Kickers at 10-12px, lime on dark; 0.25/0.3em only for ceremonial moments; neutral-400/500 for secondary/interactive.
4. Headings balance, paragraphs pretty (global); add `[text-wrap:...]` only on raw spans/divs.
5. Hero leading tightens with size: 0.95 desktop, 0.85 token, 0.76 mobile; body stays relaxed.
6. `.font-mono` is a voice, not a face - if true code styling is ever needed, add a real mono font first.

## 3. Layout & spacing

One wide editorial shell: a 1800px container, a 12-column grid with deliberately asymmetric splits, hairline borders doing all separation. Sections breathe through large py rhythm; bands (#151515 / #363636 / #080808) interrupt the page for proof and statement moments; every decorative canvas stacks behind content via `relative isolate` + `-z-10`. Corners square by conviction.

### Containers

- Master: `max-w-[1800px] mx-auto px-8 md:px-12` - canonical, 20+ exact occurrences, 56 total `max-w-[1800px]` (SelectedWork.tsx:20, ServicesList.tsx:115, Home.tsx:171). Canonical gutters `px-8 md:px-12` (63); drift: `px-6 md:px-12` (14), `px-4 md:px-12` (5), `px-4 sm:px-8` (3) - utility/legal/limited-access only.
- App root: `bg-background min-h-screen w-full overflow-x-clip` (App.tsx:337). **`overflow-x-clip` is load-bearing** (App.tsx:332-336): `overflow-x-hidden` would make the div a scroll container and break `position:sticky`; clip clips identically without a scroller. Never change it. (`overflow-x-hidden` survives on 9 legacy wrappers - add no more.)
- Narrow content inside the shell: max-w-2xl (42), 3xl (28), md (24), xl (22), 4xl (17). One-off shells max-w-[1400px] (6), [1600px] (3), [1500px] (1) - isolated pages, not standard; don't invent new shells.

### Vertical rhythm

| Pattern | Value |
|---|---|
| Standard section | `py-24 md:py-32` (18, e.g. Home.tsx:170 Brief CTA) |
| Heavy section | flat `py-32` (31, SelectedWork.tsx:19) or `py-32 md:py-40` (3, ServicesList.tsx:114) |
| Statement band | `py-40 md:py-56` (graphite band, Home.tsx:86) |
| Compact band / proof strip | `py-12` (ClientLogos.tsx:35, Home.tsx:40) |
| Page top under fixed header | `pt-32` (utility: `min-h-screen pt-32 pb-20/24`), `pt-32 md:pt-40` (8), hero `pt-40` (AgencyHero.tsx:46), `pt-40 md:pt-52` (1); Process.tsx:257 - never `mt-*` |
| Footer CTA band | `pt-32 pb-32` (Footer.tsx:69) |
| Section header -> content | `mb-16` (SelectedWork.tsx:22) or `mb-20 md:mb-24` (ServicesList.tsx:118, Products.tsx:149) |
| Between sub-blocks | `mb-24 md:mb-32` (6), `mb-32 md:mb-40` (6), `mb-32 md:mb-48` (7) |
| Card inner padding | `p-8 md:p-12` (10); References.tsx:135 `p-6 md:p-12` |
| Stacks | `space-y-6` (26), `space-y-4` (19) |

### Hairlines

Dark: `border-white/10` 232 (THE hairline), `/5` 47 (extra-subtle band edges), `/20` 33 (emphasis/outlined buttons), `/15` 7 (mid-tone, Home.tsx:116,124), `/12` 5 (pill chips, OfferMarquee.tsx:53). Light: (1) explicit dual classes preferred - `border-neutral-200 dark:border-white/10` (77, canonical), `border-black/10 dark:border-white/10` (13), `border-neutral-100 dark:border-white/5` (8), `border-neutral-300 dark:border-white/20` (7); (2) global remap theme.css:597-604 flips `/5 /10 /20` -> rgba(0,0,0,0.1) and `/30` -> rgba(0,0,0,0.3) - **does NOT cover /12 and /15**. `--border`: #262626 dark (theme.css:11), rgba(0,0,0,0.15) light (theme.css:425).

Hairline divider grids (borderless tables): `gap-px` on a grid whose parent carries the line color - `grid grid-cols-12 gap-px bg-white/[0.06]` (ServicesList.tsx:151), `gap-px bg-black/[0.06] dark:bg-white/[0.06]` (Products.tsx:243,270), `gap-px bg-neutral-200 dark:bg-white/[0.06]` (Diagnostic.tsx:509; comment :508: "gap-px on a lighter parent creates hair-line dividers without chunky borders"), `gap-px bg-white/10 border border-white/10` (StatsGrid.tsx:36). Physical: `h-px` 51 (animated rules/underlines, Home.tsx:111 `w-6 h-px bg-neutral-500 group-hover:w-10`), `w-px` verticals (AgencyHeader.tsx:239 `w-px h-4 bg-current opacity-30`).

### Grids

- Canonical editorial grid: `grid grid-cols-12 gap-6 md:gap-8` (grid-cols-12 31x; gap-6 md:gap-8 24x, gap-6 md:gap-10 11x); mobile children `col-span-12` (51) + `md:col-span-*`.
- Asymmetric splits: 9+3 header (SelectedWork.tsx:22), 5+7 (ServicesList.tsx:118), 7+5 (Home.tsx:173), 8+4/4+8 (md:col-span-8 12x, md:col-span-4 15x). Page-level: `grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24` (ProjectDetails.tsx:328, ServiceDetail.tsx:143). Never centered symmetric headers on agency pages.
- Narrative/data two-col: `md:grid-cols-[1fr_1.5fr]` with `gap-12 md:gap-20` or `gap-16 md:gap-24` (6 uses: Home.tsx:88, Diagnostic.tsx:376,443, Process.tsx:589,661).
- Row templates: `grid-cols-[auto_1fr_auto]` (Home.tsx:124, Operating Model rows), `[1fr_auto]` (ui/card.tsx:23), data-table `[40px_1fr_140px]` (6, LimitedAccess3.tsx:464+ with zebra `bg-white/[0.01]`, `border-t border-white/[0.06]`). Card grids: `grid-cols-1 md:grid-cols-2` (30), `md:grid-cols-3` (12).

### Bands

Proof-strip recipe (twins: ClientLogos.tsx:35-47 and stats strip Home.tsx:40-47):

```
<section className="py-12 border-t border-b border-white/5 bg-[#151515] overflow-hidden">
  <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
    [label: text-[#D4FF00] font-display uppercase tracking-widest text-sm md:text-base whitespace-nowrap]
    [row: flex flex-nowrap items-center justify-between gap-6 md:gap-12 overflow-x-auto md:overflow-visible scrollbar-hide]
```

Stacked strips: the lower drops `border-t` (Home.tsx:40). Footer CTA band reuses the surface: `bg-[#151515] pt-32 pb-32 px-8 md:px-12 relative overflow-hidden` (Footer.tsx:69) with self-masking gradients (Footer.tsx:74-75). Secondary dark section: `py-32 px-8 md:px-12 bg-[#080808] border-t border-white/10` (agency Philosophy et al.). Graphite stay-dark band: see section 1. Full-bleed image band: `w-full h-[40vh] md:h-[60vh] bg-[#050505] border-y border-white/10 relative overflow-hidden` + parallax layer `absolute inset-[-20%] w-[140%] h-[140%]` (Home.tsx:207-222). Light remap: theme.css:531-546 forces `bg-[#151515]/[#0A0A0A]/[#080808]` -> #F1F6FA outside footer; footer remap theme.css:735-737; `from-[#151515]` stops theme.css:673-678.

### Rounding, stacking, overflow, breakpoints

- `rounded-none` (35) is the brand statement: MagneticButton CTAs (MagneticButton.tsx:88), lime buttons (Home.tsx:192), frosted buttons (SelectedWork.tsx:38), chatbot panel/bubbles (Chatbot.tsx:189,211), square lime bullets `w-1 h-1 rounded-none bg-[#D4FF00]` (References.tsx:150, services/EngagementModels.tsx:338). `rounded-full` (78) reserved for marquee pill chips (OfferMarquee.tsx:53), tiny status/nav dots (`w-1.5 h-1.5 bg-[#D4FF00] rounded-full`, AgencyHeader.tsx:294), some white list dots (Audience.tsx:21, HowWeWork.tsx:44). `rounded-sm` 120 / `md` 49 / `xl` 16 live in shadcn primitives under ui/ - never on brand surfaces.
- **Isolate rule**: any `-z-10` background layer MUST sit inside a `relative isolate` parent, or it paints behind the app's bg div and disappears; `isolation:isolate` does NOT create a containing block so it is sticky/fixed-safe (canonical doc SectionWatermark.tsx:58-69). Instances: Home.tsx:79, Process.tsx:257, App.tsx:393-394 (404), SectionWatermark.tsx:69,73. Full-page fixed canvas: NoiseBackground.tsx:101. Content over hero canvas: container `relative z-10 pointer-events-none`, interactive children `pointer-events-auto` (AgencyHero.tsx:46-47).
- `overflow-hidden` (113) mandatory on every section with a canvas, parallax image, marquee, oversized watermark or scale-on-hover media. Horizontal strips: `overflow-x-auto md:overflow-visible scrollbar-hide` (ClientLogos.tsx:47, Home.tsx:47; `.scrollbar-hide` theme.css:387-391).
- Breakpoints: Tailwind v4 defaults only (tailwind.css has no overrides): sm 640 / md 768 / lg 1024 / xl 1280. Usage: `md:` 1191, `lg:` 156, `sm:` 100, `xl:` 2 - effectively a two-state system (base + md), `lg:` for 12-col activation.

## 4. Component inventory

Three layers: **primitives** (src/app/components/ui/), **agency sections** (src/app/components/agency/), **systems** mounted once in src/app/App.tsx. A vendored shadcn/radix kit (~48 files) sits in ui/ but is **imported nowhere** - only `ui/utils.ts` (`cn`) and the sonner Toaster (themed inline, App.tsx:414-430) are consumed. There is no generic `<Button>` - the CTA grammar below IS the button system.

### App shell mount order (App.tsx)

SmoothScroll (ReactLenis root, :331) wraps AppContent -> CursorGlow + CustomCursor (:339-340, -z-50 / z-[9998-9999]) -> AgencyHeader (fixed z-[999]) -> Footer (skipped on /webgl) + Chatbot (:412) -> Toaster (:414) -> outside AppContent: ScrollThread, BottomGradient, FloatingBriefCTA, VersionLabel, ConsentBanner (:442-446, z-40/30/50/9999/9999) -> EffectBackdrop `warp` on the 404 route only (:394, flag `NOTFOUND_WARP` :20).

### Primitives (src/app/components/ui/)

| Component | Contract |
|---|---|
| **Reveal** | scroll-in wrapper; `duration=1.6`, `yOffset=80`; hidden `{opacity:0, y:80, filter:blur(10px)}`, ease `[0.16,1,0.3,1]`, `useInView once, margin "-10% 0px -10% 0px"` (Reveal.tsx:38-41); used everywhere |
| **CinematicText** | char-by-char headline; per-char delay 0.02s, per-line 0.15s, ease `[0.16,1,0.3,1]`; pointer glow radius 280px, falloff `pow(x,1.6)`; words wrapped `inline-flex whitespace-nowrap`; AgencyHero h1 (light glow #6B8F00) |
| **MagneticButton** | THE interactive CTA; `strength=30`, `textStrength=15`, `glowColor="rgba(212,255,0,0.4)"`; base `px-8 py-4 rounded-none font-display text-sm tracking-widest uppercase bg-neutral-900 text-white border border-neutral-800 hover:border-[#D4FF00]/50` + `js-music-trigger` (MagneticButton.tsx:88-93); spring `{damping:15,stiffness:150,mass:0.1}`; 50px radial glow follows pointer |
| **ElasticLine** | pluckable string divider; springY `{stiffness:1000,damping:4}`; stroke `rgba(255,255,255,0.1)` -> hover #D4FF00; sets `data-no-cursor-fx`; AgencyHero |
| **ChipTooltip** | chip + glass tooltip; EASE `[0.22,1,0.36,1]` (ChipTooltip.tsx:30); variants neutral/lime/clay (clay #D97757 at /40 border; neutral open light #6B8F00); panel `bg-[#0a0a0a]/85 backdrop-blur-xl rounded-[6px]` + lime hairline; tooltip ALWAYS in DOM (prerender/SEO), Escape closes (WCAG 1.4.13) |
| **Marquee** | outline-type band: `WebkitTextStroke: 2px rgba(212,255,0,0.4)` on `text-6xl md:text-[100px] lg:text-[140px] font-display uppercase tracking-widest text-transparent`; hover fills `text-[#D4FF00]/10` + 2x speed (~65s loop) |
| **SoundWaveWidget** | 4-bar EQ music toggle; keyframes `r352-soundwave` 0.9s (1.6s reduced), bar delays `[0,0.18,0.36,0.12]`; playing = `text-[#D4FF00]`; `aria-pressed`; AgencyHeader |
| **MusicNudge** | one-time "soundtrack" pill; `fixed bottom-24 left-6 z-[9000]`, appears 3.2s / hides 17s, sessionStorage `r352-music-nudge`; CTA `rounded-full bg-[#D4FF00] text-black font-display tracking-[0.14em] text-[11px] hover:bg-white`; suppressed if playing/explicitlyPaused; AgencyHero dark only |
| **EffectBackdrop** | audio-less ambient WebGL (`effect="peak"\|"warp"`, `scrim`); dark-only (null otherwise); DPR cap 1.5; IO pause; reduced-motion still frame t=11; flag-gated at call sites |
| **R3LoopBadge** | r3loop pill: `border-2 border-[#D4FF00] rounded-full font-display tracking-[0.15em] uppercase`; outline `text-[#D4FF00] hover:bg-[#D4FF00]/10`, solid `bg-[#D4FF00] text-black hover:bg-[#D4FF00]/90` (R3LoopBadge.tsx:34-38) |
| **MaskReveal / MaskText** | clip-mask wipe-up (115% translate); in-view observed on the stable outer ref |
| **HoverNote** | glass annotation, ChipTooltip-style, always in DOM for SEO (ForAgencies) |
| **ScrollSequence** | pinned canvas frame-scrubber; 120 frames, `pinHeight="300vh"` (200vh play + 100vh exit); Philosophy hero (theme-keyed frame sets) |
| Others | LoopPath (scroll-drawn r3loop line, ServicesList), SectionWatermark (giant Tanker number, useScroll), HoverVideoImage, ImageHover, YouTubeEmbed (nocookie, lime play), Magnetic (`strength=0.5`), MagnetGrid (`fillColor="#000000"` in footer), AnimeGrid (hero fallback), SmoothScroll, ThemeToggle (`w-7 h-7 text-neutral-500 hover:text-[#D4FF00]`), figma/ImageWithFallback (live image primitive with error fallback - consumed by HomePrinciples, ProjectDetails, HoverVideoImage and dormant ParallaxImage) |

**Dormant** (files exist, zero imports): Preloader, GlassHero (893 lines, disabled 2026-06-10 client decision, kept per AgencyHero.tsx:41 comment), KineticManifesto (disabled 2026-06-10), AudioToggle, SpotifyPlayer, NowPlayingIndicator, NoiseBackground, ParallaxImage, PersistentBackground (returns null, still mounted), legacy Header.tsx / Hero.tsx / StatsGrid.tsx, GrainOverlay (unmounted); agency: WhatWeDo, AreasOfWork, Audience, agency/EngagementModels (live one is services/EngagementModels), Products, HowWeWork, FifaLogo, UniqaLogo, WegoboldLogo; PhilosophyVisuals renders inside a `hidden` div (Philosophy.tsx:111). Also dormant: services/SystemizedCapabilities, ui/Note (imported only by dormant WhatWeDo), ui/MaskedText (a third sibling to MaskText/MaskReveal, zero imports); lib/sanity.ts + hooks/useSanity.ts (full Sanity CMS client, project pi8mx0t0, GROQ article queries - the journal's source of truth is journalArticles.ts, NOT the CMS); the gsap dependency (only consumer is useLenisGsap, itself unused - Services.tsx:83 "no longer needed").

### Agency sections and systems (key contracts)

> 2026-07-12, NAV_CONSOLE experiment (AgencyHeader.tsx): desktop inline nav links are
> behind `NAV_CONSOLE = false`; when true (current), the header shows a mono status
> readout (`[ SECTION ]`, DecodeText) + utilities + burger, and navigation lives in an
> anchored dark console panel (all viewports): numbered Tanker links with decode-in,
> CTA tiers, utilities, canon line. New primitive: ui/DecodeText.tsx (decode-once,
> reduced-motion safe, never loops - silence = stillness). Flip the flag to restore
> the classic nav exactly. Update this section fully once the direction is confirmed.

- **AgencyHeader**: `mix-blend-difference` until 80px scroll; dark scrim `from-black/95 via-black/55 to-transparent h-[260%]` - **no blur, client rule "soft shadow, never frosted bar"** (AgencyHeader.tsx:170-175); logo in asset lime #DAFF45 (:217,232); tagline "AI" segment clay #D97757 (:254); hover-swap label pattern - invisible spacer span reserves `font-medium tracking-[0.15em]` width, visible span animates `font-normal tracking-normal -> font-medium tracking-[0.15em]` (:276-287); active-page dot `layoutId="active-dot"` 6px lime spring; contact = two stacked spans translate-y swap lime->white 0.5s `[0.22,1,0.36,1]` (:309-313); mobile overlay `bg-[#050505] z-[995]`, focus trap + Escape, ease `[0.76,0,0.24,1]`.
- **AgencyHero**: `HERO_WEBGL=true` flag (:17) - dark -> HeroWebGLBackground + MusicNudge, else AnimeGrid; 5 neutral chips + 1 clay chip ("AI Elevated Workflows"); primary MagneticButton `bg-[#D4FF00] text-black border-none hover:bg-[#D4FF00]/90` + secondary `bg-white/[0.04] text-white hover:bg-white/[0.08]`, each with font-mono 11px microcopy; ElasticLine divider; signature line `font-display text-2xl md:text-4xl text-[#D4FF00]` prefixed with plain `-`.
- **SelectedWork**: 9+3 header, 6+6 + full-width third card; image hover scale 1 -> 1.04 `duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)]` motion-safe only; lime index 01/02/03 always visible on touch via `[@media(hover:hover)]`; title -> `text-[#D4FF00]` + `tracking-[0.02em]`; description via `grid-rows-[0fr]->[1fr]`; tier doc at SelectedWork.tsx:33-35: "primary = lime fill, secondary = frosted dark, tertiary = text link with arrow".
- **ServicesList**: kinetic LoopPath gated >=1024px AND no reduced-motion AND no `navigator.webdriver` (static grid stays in DOM for prerender).
- **References**: quotes `text-[#8aa600]` light / `dark:text-[#D4FF00]`; autoplay 5s, cssEase `[0.16,1,0.3,1]`; `infinite:false` (kills DOM clones for SEO).
- **ClientLogos**: logos `brightness-0 invert opacity-60 hover:opacity-100`, hand-tuned per-logo optical heights (h-3..h-16).
- **HomePrinciples**: LIVE homepage section (Home.tsx:5,167) - three bilingual principle cards ("Systems over one-offs" etc.) in the canonical 12-col 4+4+4 grid, Reveal-staggered `i*0.1`, images via figma/ImageWithFallback + ImageHover.
- **PinnedHowItWorks**: hand-rolled rect-based scroll progress (not useScroll - stale-coords bug); all layers always mounted; stacked list fallback on mobile/reduced-motion.
- **PageTransition / ThemeContext sweeps**: see section 5. **Chatbot**: R080 persona, scripted 8-item PL/EN FAQ (Chatbot.tsx:21-110), scroll-gated, routes to /brief. **ConsentBanner**: strict opt-in, z-9999, enter spring `{stiffness:80,damping:16,mass:0.9,delay:0.3}`, exit `[0.55,0,0.35,1]`, compact <768px. **ScrollThread**: 1px lime progress lines both edges, `bg-[#D4FF00] shadow-[0_0_14px_2px_rgba(212,255,0,0.45)]` over `bg-white/[0.06]`, spring `{stiffness:120,damping:30}`, hidden below md. **CursorGlow**: 400px lime radial, idle `rgba(212,255,0,0.05)`, interactive scale 0.25 + `rgba(212,255,0,0.45)`, `-z-50 mix-blend-screen`, null on reduced-motion. **CustomCursor**: 8px lime dot (`mix-blend-difference z-[9999]`) + lagging circle 12->64px with "EXPLORE" (`font-display text-[10px] tracking-widest`); excluded over `header, form, input, textarea, [data-no-cursor-fx="true"]`; null on touch + reduced-motion. **FloatingBriefCTA**: `fixed bottom-6 right-6 md:bottom-[42px] md:right-[112px] z-50`, `text-[#D4FF00] font-display uppercase tracking-[0.2em] text-[13px] hover:text-white`, hidden on /brief + limitedaccess; entrance 1.0s `[0.22,1,0.36,1]` delay 0.25; `js-music-trigger`. **VersionLabel**: `fixed bottom-2 left-2 z-[9999] font-mono text-[9px] text-white/15` (date, commit, env via vite define). **Footer**: CTA band `bg-[#151515]` over MagnetGrid + links band `bg-[#0a0a0a]`; giant contact link 6xl->9xl white -> hover lime; primary `px-12 py-4 bg-[#D4FF00] text-black` + sheen + tracking collapse; secondary `bg-white/[0.06] hover:bg-white/[0.10] hover:text-[#D4FF00]` (Footer.tsx:69,93,104,118). **SEO/GTM**: react-helmet-async per-route map in App.tsx; GTM fires only after consent - strict opt-in via ConsentContext (status model `pending`/`accepted`/`denied`, ConsentContext.tsx:15) + Google Consent Mode v2 (GTM.tsx, GTM-M2GDLHZ8): consent defaults pushed as `denied` BEFORE any script loads, `consent update -> granted` on accept, script injected once; revocation via /cookies pushes `update -> denied` instead of removing the script (Consent Mode is the supported revocation path); any new tag must respect Consent Mode.

### CTA button grammar (site-wide)

26 lime-fill instances (`bg-[#D4FF00] text-black`); hover distribution: `hover:bg-white` x16 (canonical), `hover:bg-[#e0ff33]` x3, `hover:bg-[#D4FF00]/90` x2 (MagneticButton call sites), `hover:bg-neutral-900` x1.

- **Primary static**: `bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm px-7 py-4 hover:bg-white transition-colors duration-300` (Careers.tsx:194; IndustryDetail.tsx:103,188 variant `tracking-[0.2em] text-xs`; 404 uses px-8 py-4).
- **Primary magnetic**: MagneticButton + `bg-[#D4FF00] text-black border-none hover:bg-[#D4FF00]/90 rounded-none`, `glowColor="rgba(0,0,0,0.15)"` (AgencyHero.tsx:156-158).
- **Secondary magnetic (frosted)**: `bg-white/[0.04] text-white border-transparent hover:bg-white/[0.08]`, `glowColor="rgba(212,255,0,0.2)"` (AgencyHero.tsx:177, SelectedWork.tsx:38).
- **Secondary static (outline)**: `border border-neutral-300 dark:border-white/20 px-7 py-4 hover:border-[#D4FF00] hover:text-[#D4FF00]` (IndustryDetail.tsx:196).
- **Tertiary**: text link `font-display uppercase tracking-[0.2em] text-xs` + ArrowRight (w-3.5/w-4, `group-hover:translate-x-1`), neutral-400 -> `hover:text-[#D4FF00]`.
- Label micro-motion, 3 conventions: (1) tracking morph with invisible spacer span; (2) vertical two-span translate-y swap (header contact); (3) arrow translate-x (all tertiary).

### Forms

- Canonical field = the brief flow (/brief, the site's primary conversion path): `FormText` / `FormTextarea` (Diagnostic.tsx:535,571) - underline-only: `bg-transparent border-b border-neutral-300 dark:border-white/20 pb-3 text-lg md:text-xl outline-none focus:border-[#D4FF00]` (field classes Diagnostic.tsx:565,595), with a kicker-style label `text-xs font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-[#D4FF00]` and a lime `*` for required.
- Boxed variant for gated pages: BriefAccess.tsx:48 `bg-white/5 border border-white/10 p-4 focus:border-[#D4FF00]`, errors `border-red-500` / `text-red-500` (:48,55) - red-500 exists nowhere in the documented palette (`--destructive` is #990000); pick ONE error color (Appendix 47).

### Rules

1. New CTAs are one of the three tiers; always `rounded-none`, `font-display uppercase`; paddings only px-7/px-8/px-12 py-4. Hover-capable CTAs that should start the track get `js-music-trigger` (useCTAHoverMusicTrigger, App.tsx:147).
2. Tooltips/chips: reuse ChipTooltip; if impossible, replicate ONLY its motion (fade + y6 + scale .97 + blur 6px, 0.45s `[0.22,1,0.36,1]`) and keep content always-mounted for prerender - tooltip/chip/nav copy stays in the DOM at all times (opacity/visibility toggles).
3. Every canvas: reduced-motion check (still frame or null), IO pause off-screen, DPR cap <=1.5 where embedded, dark-theme-only where applicable; `u_live` gates flash amplitude.
4. Experimental visuals sit behind a boolean flag at the call site for one-line revert (see Governance).
5. Elements fighting the custom cursor set `data-no-cursor-fx="true"`.
6. Section entrances use Reveal (delay steps ~0.1-0.2); hero-overlay content Reveal can't observe uses a direct motion.div in the same language (Philosophy heroMotion: enter `blur(10px)->0` 1.2s `[0.16,1,0.3,1]`, exit `blur(14px)` 0.7s `[0.76,0,0.24,1]`).
7. Don't import the vendored shadcn kit for product UI; don't give the header a frosted bar in dark mode; don't add hover-only affordances without a touch fallback.
8. Icons = lucide-react only (0.487.0, imported in 51 files) - no second icon library, no inline icon SVGs outside logo artwork; default stroke; size ladder: w-3/w-3.5/w-4 inline and in CTAs (ArrowRight w-3.5/w-4), w-4/w-5 standalone UI, w-8+ decorative only.

## 5. Motion language

Choreographed, not decorative: a small set of named easings, long cinematic reveal durations, deterministic page sweeps on a compass cycle, pointer-driven soft springs. Depth and cadence govern - content decelerates in with heavy blur, sweeps use a symmetric in-out ease, and downstream work (scroll reset, focus, theme swap) is time-coupled to the ~700ms covered-viewport moment.

### Easings (exact; do not invent a fourth curve)

| Token | Value | Role | Evidence |
|---|---|---|---|
| **Signature decel** | `[0.22, 1, 0.36, 1]` | content entry, mask reveals, UI entrances, theme cross-fade | 20 motion + 38 CSS uses; KineticManifesto.tsx:42 `const EASE`; PageTransition.tsx:145,156; App.tsx:337 root `duration-[800ms]` |
| **Sweep ease** | `[0.76, 0, 0.24, 1]` | all full-screen sweeps/overlays + content exit | 25 uses: PageTransition, ThemeContext, MaskText, Preloader, AgencyHeader, Philosophy, Deliverables |
| **Ultra decel** | `[0.16, 1, 0.3, 1]` | Reveal/CinematicText family blur-up reveals | 14 uses: Reveal.tsx:41, CinematicText.tsx:125,219 |
| Legacy one-offs | `[0.55, 0, 0.35, 1]` (ConsentBanner.tsx:88-89); `cubic-bezier(0.4,0,0.2,1)` (1x theme.css) | do not reuse | |

Durations: framer tweens 0.4s (19x small UI), 0.8s (15x sweeps in), 0.7s (9x sweeps out), 0.6s (12x), 0.2s (11x micro), 0.9s (content wrapper entry), 1.2s (CinematicText), 1.6s (Reveal), 0.85s (MaskReveal), 0.55s (MusicNudge/ConsentBanner); `duration: 0` 13x = reduced-motion collapse. Tailwind hovers: duration-300 (210x default), duration-500 (103x color/border/glow), duration-700 (22x), duration-200 (13x).

### Core specs

- **Reveal**: see section 4 table. **CinematicText**: per-char `delay + lineIndex*0.15 + charIndex*0.02` (CinematicText.tsx:218); hidden char `{y:"100%", opacity:0, rotate:6, scale:0.95}` origin-bottom-left, line `{y:"100%", opacity:0, rotate:2}`; glow spring `{stiffness:25, damping:12, mass:1}` ("overdamped for elegance"), textShadow `0 0 v*16px rgba(glow, v*0.7), 0 0 v*40px rgba(glow, v*0.4)`; `text` is an effect dep so PL/EN switch re-drives chars.
- **MaskReveal**: `y: "115%" -> "0%"`, 0.85s, `[0.22,1,0.36,1]`; `pb-[0.14em] -mb-[0.14em]` for descenders; useInView on the STABLE outer span (`margin: "0px 0px -10% 0px"`).
- **PageTransition** (route sweep): fixed layer stack - depth scrim z-[9997] (vertical only, `rgba(0,0,0,0.55)->transparent 60%`) -> lime sweep `bg-[#D4FF00]/90 backdrop-blur-2xl z-[9998]` -> theme sweep `#0A0A0A/90` dark / `#F1F6FA/90` light `backdrop-blur-3xl z-[9999]` -> branding clipPath inset() z-[10000]: R352Symbol at `color="#D4FF00"` + "Move fast, steady cadence." `tracking-[0.3em] text-[#D4FF00]/80` (PageTransition.tsx:265-267). Sweeps all `[0.76,0,0.24,1]`: entry 0.8s (delays lime 0.15 / theme 0.05 / branding 0.05 / scrim 0.1), exit 0.7s (delays 0 / 0.1 / 0.1). Content entry 0.9s delay 0.3 `[0.22,1,0.36,1]` from `blur(24px)` (horizontal: `{opacity:0, y:30, scale:0.98}`; vertical: `{y:-44*flow, rotateX:7*flow, scaleY:1.04, scaleX:0.99, transformPerspective:1200}`); exit 0.8s `[0.76,0,0.24,1]` to blur(20px), drift 28px WITH the flow vs entry 44px against it (outgoing slower = depth). `onAnimationComplete` clears inline transform/filter/willChange (:277-291) - **leftover inline transform breaks `position:sticky`; any new wrapper animation must preserve this cleanup**. Whoosh `Audio("/sounds/transition-ltr.mp3")` volume 0.4 every mount (48KB MP3, replaced a 928KB WAV). `lenis.resize()` on mount + at 1200ms (:62-72).
- **Direction system** (src/app/utils/transitionDirection.ts): deterministic clockwise compass on desktop >=768px - `left-to-right -> top-to-bottom -> right-to-left -> bottom-to-top`, initial `"bottom-to-top"`; mobile vertical-only (iOS pull-to-refresh/swipe-back conflict). Advanced by `useTransitionRoll()` mounted ONCE (App.tsx:146); PageTransition snapshots direction via useRef so exit + entry share it; `AnimatePresence mode="wait"` (App.tsx:359); branding clipPath axis == sweep axis.
- **ThemeContext sweep**: re-entry guarded by `isTransitioning`; theme swap at 700ms, teardown 1500ms (ThemeContext.tsx:28-37); always bottom-to-top; lime z-[99998] 0.8s, target bg z-[99999] delay 0.1, branding z-[100000] delay 0.1; exits 0.7s delays 0.15/0.05/0.05; tagline `#D4FF00/80` toward dark, `#000000/50` toward light.
- **First-load splash** (`#r352-splash`, index.html:88-134): static pre-framework curtain on #0A0A0A with the #DAFF45 logo building in - symbol pop 0.62s `cubic-bezier(.22,1,.36,1)` delay 0.1s, letters 0.5s each staggered 0.52/0.64/0.76s; curtain lift `translateY(-100%)` 0.75s `cubic-bezier(.76,0,.24,1)` after a 1650ms hold (350ms under reduced motion), node removed 800ms later. Gates: once per session (sessionStorage `r352-splash`), skipped under `navigator.webdriver` so the end-state is never baked into prerender (prerender.mjs:428-444 additionally resets the splash to pristine before capture), removed outright on /estymacja907 (index.html:113 - client-brand pages must never flash the r352 splash); reduced motion = static logo (`animation: none`, index.html:106). Splash easings must stay on the two house curves.
- **Title tilt** (WebGLExperiment.tsx:829-845,1062): springs `{stiffness:55, damping:14}`; rotateY [-8,8], rotateX [6,-6] inverted, drift x [-16,16]px y [-10,10]px, `transformPerspective: 900`.
- **MusicNudge**: entrance `{opacity:0,y:18}`, exit `{opacity:0,y:12}`, 0.55s `[0.22,1,0.36,1]`; EQ bars height `["30%","100%","45%","85%","30%"]`, `duration 1.1 + i*0.25`, repeat Infinity, easeInOut.

### Staggers, in-view, Lenis, timing coupling

- Stagger steps: `i*0.05` 14x (dense lists - Philosophy.tsx:134,247,287, Services.tsx:257, Careers.tsx:117; AiRunners.tsx:76 caps `Math.min(0.4, i*0.05)`), `i*0.06` 5x (Industries.tsx:52, Careers.tsx:136), `i*0.08` 14x, `i*0.1` 21x (sparse/hero). Cap cumulative delay ~0.4s on long lists.
- `whileInView` nearly banned: 3 uses total (agency/HowWeWork.tsx:9, Pricing.tsx:308,323), all `once: true`. House pattern: `useInView` + `useAnimation` controls (Reveal, CinematicText) or conditional animate (MaskReveal); margins `-10%` family; always `once: true`.
- **Lenis** (SmoothScroll.tsx): `<ReactLenis root>` with `{lerp:0.1, duration:1.5, smoothWheel:true, autoResize:true, syncTouch:false}`; reduced-motion -> `{lerp:1, duration:0, smoothWheel:false}`. **Limit-caching caveat**: after any DOM height change call `lenis.resize()` - patterns: PageTransition (immediate + 1200ms), ScrollToTop (rAF), WebGLExperiment.tsx:1001 (rAF), accordion pages triple `setTimeout(100/500/1500)` (Pricing.tsx:77-79, LimitedAccess2/3/5/5Meeting/5Pricing). Fixed overlays with own scrollbars need `data-lenis-prevent` (Estymacja907.tsx:104).
- **700ms coupling** (App.tsx): ScrollToTop waits 700ms then `scrollTo(0,0)` + `lenis.scrollTo(0,{immediate:true})` + rAF resize (:56-75); FocusMainOnRouteChange 750ms then `#main.focus({preventScroll:true})` (:84-101); ThemeContext swap 700ms; `window.__PRERENDER_READY__ = true` at 1500ms per route (:154-161). Chain: exit covers ~0.7-0.8s -> scroll+theme at 0.7 -> focus 0.75 -> entry 0.15+0.8 -> content settles 1.2s -> resize 1.2s. **Changing any sweep duration requires re-tuning all four timers.**

### Reduced-motion policy

Hook: src/app/hooks/useReducedMotion.ts (reactive matchMedia, SSR-safe false). Global CSS clamp theme.css:898-906: all CSS animations/transitions to 0.01ms, `scroll-behavior: auto`, hides CursorGlow/CustomCursor, `animate-spin-slow` off (also theme.css:244-246) - **does NOT touch framer-motion tweens**; those need per-component opt-in. Covered: PageTransition (duration 0 + final states), SmoothScroll (native), all WebGL canvases (one still frame: HeroWebGLBackground.tsx:146,189,199,249 t=8; EffectBackdrop.tsx:151,181,190,195 t=11; WebGLExperiment.tsx:873,914,979 t=8), GlassHero (GL never inits, :493-495), KineticManifesto + ServicesList (static layout), PinnedHowItWorks (stacked list), Preloader (skipped, :30-33), OfferMarquee (`animation: none`, :45), ConsentBanner, AudioToggle, SoundWaveWidget, CursorGlow, CustomCursor. NOT covered (tweens still run): Reveal, CinematicText, MaskReveal, MagneticButton, MusicNudge, ThemeContext sweep - see Appendix.

### Rules

1. New in-view reveals: use Reveal or MaskReveal - never hand-roll `whileInView`; `once: true`, `-10%` margin.
2. Easing by role: `[0.22,1,0.36,1]` entering/settling, `[0.76,0,0.24,1]` covering/exiting, `[0.16,1,0.3,1]` only in the Reveal/CinematicText family.
3. Sweeps: 0.8s-in / 0.7s-out with layered 0.05-0.15 delays; lime under theme-bg under branding-clip; reuse the compass cycle.
4. Springs stay soft: 55/14 tilt, 150/15/0.1 magnetic, 25/12/1 glow - no visible-overshoot springs anywhere.
5. Anything mutating page height calls `lenis.resize()`; overlays with internal scroll carry `data-lenis-prevent`.
6. Full-screen animated wrappers clear inline transform/filter after entry; overlays need `pointer-events-none` + the established z-bands (9997-10000 route, 99998-100000 theme).
7. New cinematic components collapse to `{duration: 0}` + final-state under reduced motion; canvases render one still frame.

## 6. WebGL & audio layer

"Machines + funk" made literal: raw WebGL 1 fragment shaders (zero dependencies, no three.js) on a fullscreen triangle, one shared uniform contract, and an audio pipeline tapped into the site track - **Planet Rock instrumental (Afrika Bambaataa)** at `/audio/planet-rock-instrumental.mp3`, looped, `preload="none"`, no autoplay (AudioContext.tsx:31-37; stale docstring says Mompou/0.4 - code wins, see Appendix). Governing rule: **silence = stillness, music = dynamics**.

### Surfaces and flags

| Surface | File | DPR cap | Audio | Pause |
|---|---|---|---|---|
| /webgl gallery (8 presets, noindex) | WebGLExperiment.tsx | `min(dpr, 2)` (:875) | full bass/mid/high/kick/energy/live | reduced-motion still frame t=8 (:914,:979); no IO (fixed fullscreen route) |
| Home hero ambient ("808" glyph field, 129 BPM, "texture, not a show") | HeroWebGLBackground.tsx | `min(dpr, 1.75)` (:148) | bass/mid/high + live | IO threshold 0.01 (:186-193); still frame t=8 |
| Section backdrops ("peak"/"warp") | EffectBackdrop.tsx | `min(dpr, 1.5)` (:153) | none | IO 0.01 (:178-185); still frame t=11; dark-only (null otherwise, :208) |

Flags (flip to `false` = exact revert): `HERO_WEBGL` AgencyHero.tsx:17 (dark only; falls back to AnimeGrid), `PROCESS_PEAK` Process.tsx:15, `NOTFOUND_WARP` App.tsx:20 (404, `scrim={false}`).

### Architecture

- One GL context per surface, kept alive; preset switch = compile+link new program, delete old (WebGLExperiment.tsx:1006-1037). Context options `{antialias: true, alpha: false}`.
- Fullscreen triangle `[-1,-1, 3,-1, -1,3]`, `drawArrays(TRIANGLES, 0, 3)`; vertex shader one line.
- Shared PRELUDE (WebGLExperiment.tsx:17-30): `precision highp float`, uniform block, noise toolkit - `hash` (fract/dot), `hash2` (sin), `noise` (value noise, fade `f*f*(3.0-2.0*f)`), `fbm` (6 octaves, gain 0.5, lacunarity 2.02). EffectBackdrop.tsx:17-26 carries an identical COMMON minus audio uniforms.
- Null-safe uniforms (`uniform1f(null, x)` no-op, :1025); cleanup = cancel rAF, remove listeners, `WEBGL_lose_context.loseContext()` on unmount; canvases `pointer-events-none aria-hidden`, input via window-level passive listeners; mouse in canvas px y-flipped, shaders normalize `(gl_FragCoord.xy - 0.5*u_res)/u_res.y`.

### Uniform contract

`u_res` (vec2 device px), `u_time` (s; frozen 8/11 reduced), `u_mouse` (canvas px y-up), `u_mdown` (0/1), `u_bass/u_mid/u_high` (0..1 followers, fast attack / slow release - releases `pow(0.88/0.86/0.82, fr)` gallery, `0.9/0.88/0.85` hero), `u_kick` (bass-flux transient, attack `min(1, flux*5.5)`, release `pow(0.72, fr)` ~150ms, :953-958), `u_energy` (slow follower of `(bass+mid+high)/3`, rate `dt*1.6`, init 0.4, :959-960), `u_progress` (0..6 scene units, `min(6, scrollY/(innerHeight*0.85))`, :975), `u_live` (smoothed "music actually playing", rate `dt*2.0`, gates flashes `mix(0.15,1.0,u_live)` gallery / `mix(0.12,1.0,u_live)` hero), `u_glyphs` (sampler2D unit 0). Hero swaps kick/energy/progress for `u_cols` (<640px 5, <1024px 8, else 15, HeroWebGLBackground.tsx:159) and `u_scroll` = `scrollY * dpr * 0.35` (:246). EffectBackdrop uses only res/time/mouse.

### Audio pipeline (src/app/context/AudioContext.tsx)

- `TARGET_VOLUME = 0.5`, `FADE_MS = 600`, ease-out cubic `1 - pow(1-t, 3)` (:129-158); fade-out then `pause()`. Triggered by first CTA hover (`useCTAHoverMusicTrigger`) or header SoundWaveWidget. sessionStorage `r352-music-playing` / `r352-music-paused`; `explicitlyPaused` blocks hover re-start.
- Analyser: `fftSize = 512`, `smoothingTimeConstant = 0.55` (:236-237), element -> analyser -> destination. **Wiring safety (critical)**: `createMediaElementSource` is irreversible and mutes on a suspended context - wire only when context is running (`onstatechange`; resume retried once from a real `pointerdown`/`keydown`, :244-266). Consumers gate: `isLive = !!(analyser && isPlaying && analyser.context.state === "running")` (WebGLExperiment.tsx:919).
- Band edges from real sample rate: `hzPerBin = sampleRate/fftSize`; bass 0-345 Hz ×2.4, mid 345-4130 Hz ×3.0, high 4130-12050 Hz ×3.8, clamped (WebGLExperiment.tsx:932-938 = HeroWebGLBackground.tsx:216-221). Never hardcode bin indices.
- **Silence = stillness**: not live -> calm constants `bass 0.22 / mid 0.22 / high 0.18` (WebGLExperiment.tsx:939-945, HeroWebGLBackground.tsx:222-228); beat-phase math (129 BPM via u_time) exists but flashes are u_live-gated; hero playhead multiplied by u_live outright. Envelopes dt-based (`fr = dt*60`, dt capped 0.1s) - frame-rate independent.

### Presets (PRESETS, WebGLExperiment.tsx:788-797; all on a 129 BPM clock)

Flow (domain-warped fbm; kick deepens warp `3.4+0.7*u_bass+0.8*u_kick`), Aurora (light curtains breathe with mids, kick surge per beat, soft-knee), Scope (circular phosphor scope; ring displaced per band bass 5th / mid 11th / high 17th harmonics, beam orbits per 4-beat bar, clay ghost ring, CRT scanlines), Warp (log-polar starfield `log(r)*3.0`, 3 depth layers, streak `0.08+1.0*u_bass+0.3*u_mid` x energy + `1.1*u_kick`), 808 (16-column step sequencer; kick lane quarters/bass, snare 2+4/mids, pads = logo glyphs leaning toward pointer, reshuffle per sweep), Cymatics (Chladni nodal lines; bass retunes mode a, mids detune `b = a+1.5+...`, soft-knee), Peak (living topographic map, 26 contour bands, every 5th an index line, one summit breathes, kick ripples), R3loop (all seven as ONE continuous scroll-driven set).

R3loop journey (:736-786): ~0.85 viewport = 1 scene unit; 610vh scroll track mounts only for this preset (:1114); entering/leaving calls `lenis.resize()` (:995-1003). Per unit `ease = smoothstep(0.15, 0.85, ph)`; steady state evaluates ONE scene, morph exactly two (`scenePick` uniform-valued, :725-734). Morph = fbm dissolve (`mask = smoothstep(0.0,1.0,(e2-n)/0.13+0.5)`, `e2 = e*1.7-0.35`) + zoom pull (out `1.0-0.18*ease`, in `1.0+0.25*(1.0-ease)`) + molten lime seam (`lime*exp(-abs(e2-n)*22.0)*e*(1.0-e)*(0.7+1.8*u_kick)`); kick shoves dissolve `e = clamp(ease + 0.15*u_kick*ease*(1.0-ease), 0, 1)`. HUD: 7 track dots at `vec2((i-3)*0.032, -0.355)`. Scope drops 160 -> 96 segments with 1.67x compensation (:559-562). Grain + vignette applied ONCE at the end on the stable camera (:782-784).

### Glyph atlas (src/app/lib/logoGlyphAtlas.ts)

Real brand SVG paths (same as index.html splash) for [R-in-circle][3][5][2]; `GLYPH_TILE = 128` -> 512x128 atlas, 12px pad (:19-44). Upload (:47-58): unit 0, `UNPACK_FLIP_Y_WEBGL`, LINEAR, CLAMP_TO_EDGE; atlas stays bound for context life. Sampling: `gi = floor(hash(cell*2.13+7.7)*3.9999)`, `texture2D(u_glyphs, vec2((clamp(lf.x,0,1)+gi)*0.25, clamp(lf.y,0,1))).r`; jitter `(rnd-0.5)*0.34`, half-size gallery `0.26+0.16*rnd.y` / hero `0.24+0.15*rnd.y`.

### Shader palette and house post stack

Palette: lime `vec3(0.831,1.0,0.0)` = #D4FF00 exact; clay `vec3(0.851,0.463,0.341)` ~ #D97657 (see Appendix); scene base `vec3(0.010)`-`vec3(0.021)` ~ #030303-#050505 (Scope 0.010, Warp/Cymatics/Peak 0.012, 808 0.014, Flow 0.021, backdrops 0.010 - all darker than page #0A0A0A, the scrim bridges); Aurora sky `dark vec3(0.028,0.03,0.028)`, `clayD vec3(0.42,0.22,0.16)`; idle glyph dot `vec3(0.16)`. Clay is the minority via hash thresholds `step(0.90-0.93, hash(...))` - lime is the voice, clay the punctuation.

Post stack (end of every fragment shader): vignette `col *= 1.0 - K*v*v` (K 0.28 typical Flow/Aurora/808/R3loop; 0.20 Scope; 0.30 Warp/Cymatics/Peak/hero/backdrops) -> grain `col += (hash(gl_FragCoord.xy + u_time) - 0.5) * A` (A 0.022 Flow, 0.02 Scope/Cymatics/R3loop, 0.018 Warp/808/Peak, 0.016 Aurora/backdrops, 0.014 hero); scanlines `col *= 0.97 + 0.03*sin(gl_FragCoord.y*1.57)` on CRT surfaces (Scope, 808); soft-knee tone map `col = col / (1.0 + K*col)` before vignette/grain on layered scenes (K 0.40 Aurora, 0.45 Cymatics); hero-only ambient dim `col *= 0.85`. DOM scrims: hero HeroWebGLBackground.tsx:269; backdrop EffectBackdrop.tsx:214 (`scrim` prop); gallery `bg-gradient-to-tr from-[#0A0A0A]/92 via-[#0A0A0A]/45 to-transparent` (WebGLExperiment.tsx:1049).

### Rules

1. New effects start from PRELUDE (or COMMON), end with the house post stack; base color 0.010-0.021; only the lime/clay vec3 literals as chromatic accents.
2. Beat-locked motion runs at 129 BPM and is gated by u_live; audio response goes through follower envelopes, never raw FFT.
3. Never wire `createMediaElementSource` before the AudioContext is running; never add a second AudioProvider or second source on the same element.
4. New page-section usage goes behind a call-site boolean flag; ambient surfaces are dark-theme-only, under a #0A0A0A scrim, tuned notches dimmer/slower than /webgl.
5. Cap DPR per surface, IO-pause embedded loops, one still frame under reduced motion, `loseContext()` on unmount, `{alpha: false}`.
6. No libraries - deliberately raw WebGL 1, highp float, zero dependencies.

## 7. Voice & copy system

r352 speaks as an operator: short declarative sentences, verifiable numbers, systems vocabulary, zero adjectival fluff. Founder-led ("I" in journal/bio, "we" in service copy), bilingual EN/PL with EN as structural source of truth. Governing law, verbatim on Philosophy: "show, don't talk" / "pokaz, nie gadaj" (Philosophy.tsx:201).

### Operator voice

- Identity, not comparison: "We're an operator, not an agency." (Chatbot.tsx:41; Careers hero; Glossary.tsx:65 defined term).
- Boring excellence: "I don't promise revolution. I promise boring excellence:" + measurable bullets (journalArticles.ts:2237 EN, :2087 PL).
- Fluff engineered out: footer tagline "Bold ideas / shaped with care" removed as "pure agency-speak" -> "We build the system / behind great design." (translations.ts:541-543); "Short, specific, no marketing fluff." (FAQ.tsx:141).
- Anti-heroics vocabulary: system, cadence, heroics, loops, bottleneck, drift, intake, ownership, gates (translations.ts:393-418 beliefs, :428-435 non-negotiables). Claims must be "Concrete, falsifiable, no aspirational fluff" (journalArticles.ts:1242).
- Sentence shapes: contrast pairs ("Retainer for the steady. Project for the sharp." / "Retainer dla stabilnych. Projekt dla ostrych.", translations.ts:679), one-word verdicts ("Not 'progress'. Output."), triads ("packaged, named, spec'd"), old-vs-new tables (`philosophy_page.contrasts`, translations.ts:419-426).

### The dash rule (hard)

Never em/en dashes in any r352 copy - always "-", usually spaced " - ". Verified 0 long dashes in translations.ts, Chatbot.tsx, projects.tsx, industries.ts, journalArticles.ts, page files. Code splits copy on the convention (ServicesList.tsx:169-173 splits on `" - "`); the signature-line prefix is a literal hyphen `<span className="text-neutral-600 mr-3">-</span>` (AgencyHero.tsx:223). Known violations/exceptions: Estymacja907.tsx:35-190 uses en-dashes in PLN ranges (see Appendix); code comments may use em-dashes (the rule governs copy). Approved typography alongside: "·" (microcopy separator: "~10 min brief · reply within 48h", "DESIGN · SYSTEMS · AI", "EU · remote / distributed"), "×" (U+00D7 multiplication sign) in stats ("Approval cycles cut 3×.", translations.ts:37 - always the × sign, never the letter x), "≠" ("Responsiveness ≠ availability.", translations.ts:434).

### Bilingual architecture (EN/PL)

1. **t() dictionary** - src/app/i18n/translations.ts (1290 lines); `useLanguage().t("dot.path")`; missing PL falls back to EN (LanguageContext.tsx:60-67); values may contain `<br/>` (dangerouslySetInnerHTML). Covers shared chrome: nav, hero, references, services, philosophy, contact, footer, consent, legal, marquee.
2. **Inline ternaries** - `language === "pl" ? ... : ...` (250 occurrences, 22 files); some alias `const pl = language === "pl"` (Careers.tsx:54). Page-local copy.
3. **Bilingual data objects** - `{en, pl}` fields (projects.tsx, industries.ts, Chatbot FAQs) or `content`/`content_pl` pairs (journalArticles.ts).

Language state: localStorage `r352-language-v1`; default PL if `navigator.language` starts "pl", else EN; prerender always captures EN (LanguageContext.tsx:14-38). **Terms kept English in PL copy** (category-term policy): "Design operations" (comment translations.ts:671-672), r3loop step names (Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate), "Operating Model", "Deliverables", "Product Design", tagline "DESIGN · SYSTEMS · AI", plus loanwords (intake, workflow, output, brief, handoff, retainer, engagement, bottleneck/bottlenecki, asset/assety, drift). PL is the same operator register with Polish syntax, not a tone translation.

### Naming

| Name | Rule |
|---|---|
| r352 | always lowercase (copy, SEO, hello@r352.com) |
| r3loop | lowercase in copy ("r3loop is r352's 8-step operating methodology", SEO.tsx:117); code `R3LoopBadge`; WebGL preset "R3loop" |
| R080 | robot assistant: "Hi, I'm R080 - r352's robot assistant." (Chatbot.tsx:128-129); avatar `/brand-hero/hero.mp4` |
| Reszek | founder mononym ("Reszek · remote"; data routes "only to Reszek", Diagnostic.tsx:663) |
| Engagement models | Title Case products: Diagnostic (EUR 2k, 5 days, money-back), Sprint (from EUR 15k), Retainer (from EUR 7k/mo), Enterprise Sprint (from EUR 55k), Operating Partner (from EUR 9.5k/mo, 12-mo min) - Glossary.tsx:86-121 |
| WebGL presets | one-word evocative, electro register: Flow, Aurora, Scope, Warp, 808, Cymatics, Peak, R3loop |
| Storage keys | `r352-` prefix + `-v1` suffix (`r352-language-v1`, `r352-consent-v1`) |

### Numbers, CTAs, quotes

- Stat forms: `300+`, `250+`, `10k+`, `5+`, `80%+`, `3×` (U+00D7). Canon (never varies between pages): 300+ clubs, 250+ locations, 3× approvals, 10k+ assets/yr, 5+ yrs avg partnership, 80%+ first-round briefs. Display numerals get `tabular-nums`. PL money: space thousands, unit after ("104 000 PLN", "8 640 PLN"; journalArticles.ts:118, LimitedAccess2.tsx:38); EUR as "€2k", "od €7k/mies". Claims verified in code: retention math comment "~5.7 - '5+' holds" (Home.tsx:53-55); projects.tsx:199-200 TODO downgrades "15+" to "safer 5+"; "Real figures only." (Home.tsx:39).
- Primary CTA always pairs a Tanker-uppercase button with a `font-mono text-[11px] text-neutral-500` explainer (AgencyHero.tsx:152-155): "Start a project / Rozpocznij projekt" + "~10 min brief · reply within 48h / ~10 min briefu · odpowiedz w 48h" (:166); "Book a call / Umow rozmowe" + "30 min live · pick a slot / 30 min na zywo · wybierz termin" (:184-186); tertiary "Or write directly · hello@r352.com". Canonical brief spec: "8 sections, ~26 questions, ~10 minutes. First response within 48 hours - engagement model, scope direction, next step." - verbatim only at Home.tsx:188; Diagnostic.tsx:614 renders it period-separated ("8 sections. ~26 questions. ~10 minutes.") and App.tsx:298 (/brief SEO description) paraphrases ("...about 10 minutes. First response with engagement model and scope within 48 hours."). The numbers are canon everywhere; normalize wording toward the Home form when touching either variant. Footer: "Let's build your delivery system - and ship." (translations.ts:540,1177). Closing: "Design begins with a decision, not a tool."
- **Quotes are immutable**: never rewrite, shorten or invent; unverified attributions flagged "Role placeholder" (projects.tsx:280,358,423); 6 homepage testimonials live once at translations.ts:46-83 EN / :691-728 PL (Kubota Store, Muzk Management, Benefit Systems, Sonova Group, Orlen / ex. Pelion, Archicom); label "Client voice" / "Glos klienta" (translations.ts:373,1017).

### Category-of-one vocabulary (/glossary, JSON-LD DefinedTermSet, Glossary.tsx:13)

r3loop, Design ops, Multi-location brand operations, Master / Variant / Pre-production gates ("Master signed Tuesday, all 47 variants in flight..."), Brief volume × decision velocity, Operator not agency, Tribal knowledge, Steady cadence ("The cadence is the product"), Decision gate, Output contract, Delivery pack (Friday 17:00 CET), Presence curve ("the 90% -> 15% operator-involvement decline... if operator presence stays flat, you've bought a dependency, not a system"). Home teaser: "Our presence decreases with each step." / "Nasza obecnosc maleje z kazdym krokiem." (Home.tsx:96-98).

### R080, journal, careers

- R080: scripted FAQ (no LLM), 8 canned pairs (Chatbot.tsx:21-110); leads with the answer, ends with a route ("Full breakdown on /process."), self-disqualifies honestly ("If we don't fit - we'll say so and refer someone who fits better. No pressure."); numbers exactly as canon.
- Journal (journalArticles.ts): named scenarios with timestamps ("Saturday 23:30, junior copywriter in a panic"), hidden-cost arithmetic shown line by line (8 × 6 × 180 = 8 640 PLN), lime-bullet outcome lists, anti-fluff declarations (:950), `<span class="text-white">` emphasis in neutral-400 body, 2-line punchy titles with `<br/>`.
- Careers: peers not applicants - "This is a partnership, not a hire.", "You own an area, not a task queue."; apply = mailto with subject "Careers - {role}".

### Rules

1. "-" is the only dash; "·" separates microcopy; U+00D7 for multipliers; every claim verifiable or downgraded/flagged.
2. New copy bilingual at birth (both ternary branches or both dictionary keys; EN must always exist). De facto placement: dictionary for shared chrome, ternaries for page-local, data objects for collections.
3. Category terms stay English in PL; translate everything conversational. Never translate "Ship" to "Wysylka" inside the methodology.
4. Every primary CTA carries the mono effort + response-time microcopy line.
5. End explanatory copy with a route ("Full model on /process"), not a superlative; state limits, never claim universal fit.

## 8. Governance

- **Flag pattern for trials**: every experimental visual sits behind a boolean at the call site - `HERO_WEBGL` (AgencyHero.tsx:17), `PROCESS_PEAK` (Process.tsx:15), `NOTFOUND_WARP` (App.tsx:20) - so revert is a one-line flip with zero collateral. New effects and risky sections MUST enter through this pattern; the fallback (AnimeGrid, plain section, plain 404) stays in the tree until the trial is promoted or killed.
- **Verification culture**: verify before claiming. Changes are proven with a production build plus Puppeteer screenshots (both themes, mobile + desktop widths, reduced-motion where relevant) before deploy; prerender readiness is signaled via `window.__PRERENDER_READY__` (App.tsx:154-161) and prerender always captures EN. Copy claims are audited in code comments (Home.tsx:53-55 retention math; projects.tsx:199-200 downgrade TODO) - numbers ship only after the math is shown.
- **Judge-panel pattern for new effects**: candidate visuals (shader presets, hero backgrounds) are built as multiple variants, screenshotted, and judged side by side against the brand criteria (silence = stillness, texture not show, lime voice / clay punctuation) before one is flag-gated into a page. The /webgl gallery serves as the standing audition space - noindex, not in nav.
- **How changes enter this document**: edit the code first, cite the file:line, then regenerate or amend the relevant section here. If a value here disagrees with the code, the code wins and this file is stale - fix the file, don't work from memory. Anything that would add a fourth easing, a new hex, a new container shell or a new dash character is rejected by default.
- **Routes ship in threes**: every new route needs THREE entries kept in sync - `getPageSEO()` in src/app/App.tsx:168, `ROUTE_META` in scripts/route-meta.mjs (explicit "KEEP IN SYNC" comment, route-meta.mjs:12) and public/sitemap.xml. The build (package.json: `vite build` -> `inject-meta.mjs` -> `prerender.mjs`) bakes route-meta.mjs into per-route dist/{route}/index.html head tags, and prerender.mjs waits on `window.__PRERENDER_READY__` - miss the mirror and the route silently ships home-page static meta. Post-build gate: scripts/check-asset-budget.mjs (gzipped JS/CSS/image size budgets, exit 1 on violation); after deploy: scripts/post-deploy-check.mjs smoke test + scripts/indexnow-ping.mjs.
- **OG images**: per-route 1200x630 PNGs generated by scripts/generate-og-images.mjs (+ generate-og-industries.mjs) into public/og/ - one fixed brand frame for all ("void background, lime mark, bold typographic title, signature line at the foot" - generate-og-images.mjs:8-10); getPageSEO assigns them per route (App.tsx:172-212). New pages, case studies and articles get one via the generator, never hand-made; the site default is /og-image.png with a `?v=N` cache-bust version param (SEO.tsx:16, index.html:21, route-meta.mjs).
- **Machine-readable brand layer is brand copy**: public/llms.txt (entity/methodology pack for LLM crawlers) and the SEO.tsx JSON-LD (Person schema "Przemyslaw Reszka" / "Reszek" + WebSite + Organization rendered on every page; ProfessionalService, reviews and FAQ schemas homepage-only, SEO.tsx:329-352) follow the same rules as site copy - the dash rule and canon numbers apply. llms.txt currently uses em-dashes, violating hard rule 1 - fix. Canonical + hreflang (en + x-default, SEO.tsx:309-310) are helmet-injected per route; index.html deliberately carries NO static canonical (comment index.html:10-13: it would bake a homepage-pointing duplicate into every prerendered page); SEO.tsx also strips a baked noindex meta on mount (SEO.tsx:22-27).
- **Deploy**: Vercel CLI (not GitHub integration); mind the prerender Chromium gotcha documented in the repo's deploy notes.

## 9. Logo & mark

The mark is a circled R; the full lockup adds the 352 digits. All logo artwork ships in asset lime `#DAFF45` on near-black - never in UI lime `#D4FF00` (see section 1, "The two limes"). Primary sources: public/logo.svg, src/app/components/agency/R352Logo.tsx, AgencyHeader.tsx, Footer.tsx, src/app/lib/logoGlyphAtlas.ts.

### Mark anatomy

- **Circled R** = two paths: an outlined ring (ellipse with knocked-out center) + a custom hand-drawn R glyph, both `fill="#DAFF45"`, on a `#0A0A0A` rounded square (`rx="100"`, rect 698x716 bleeding 20px past the 658x676 viewBox) - public/logo.svg. favicon.svg is the same artwork byte-for-byte (both 2852 bytes).
- **Lockup** = `R352Symbol` (circled R, viewBox 0 0 658 676) + `R352Text` (352 digits, viewBox 0 0 460 373), React components with default `color = "#DAFF45"` (R352Logo.tsx:10,42). Paths imported from Figma exports src/imports/svg-9vxan0q60f + svg-0vjdtj0k0r (R352Logo.tsx:2-3).
- **Lockup hover choreography** (driven by parent `group`): circle fades out + scales to 95%, R slides +150px toward the digits, digits shift -10px left - all 500ms `cubic-bezier(0.22,1,0.36,1)` (R352Logo.tsx:28,35,55).

### Asset inventory (public/)

| Asset | Spec | Source |
|---|---|---|
| logo.svg | Mark on #0A0A0A rounded square, 256x256 render size | public/logo.svg |
| favicon.svg | Identical artwork, modern-first icon | index.html:57 |
| favicon-16/32x32.png, favicon.ico | Legacy raster fallbacks | index.html:58-60 |
| apple-touch-icon.png | 180x180 | index.html:61 |
| favicon-96/192/512.png | PWA icons, declared only in manifest | manifest.webmanifest |
| manifest.webmanifest | `theme_color` + `background_color` both #0A0A0A | manifest.webmanifest |
| og-image.png | 2400x1260 (2x of 1.91:1), cache-busted `?v=2` | index.html:21,29 |
| og/*.png + *.svg | Per-page OG pairs: home, work, services, case-*, article-*, industry-*, contact, faq, journal, glossary, process | public/og/ |
| footer-mark/r.svg + wokolo.svg | Footer watermark parts, native `fill="#151515"` | public/footer-mark/ |

Regeneration rule (existing, section 1): when the mark changes, regenerate the whole favicon/PWA family together.

### The lime rule

- Logo artwork = `#DAFF45` only: R352Symbol/R352Text defaults (R352Logo.tsx:10,42), header `text-[#DAFF45]` + `color="currentColor"` (AgencyHeader.tsx:217,232), splash fills (App.tsx:124-125).
- Everything interactive/typographic = `#D4FF00`. Never swap them; never introduce a third lime.
- Light mode flips both lime text classes to #000000 (theme.css:492-495); inside `.stay-dark` both pin to #D4FF00 (theme.css:856-859).

### In-UI rendering

- **Header**: home `Link` with `group` + `gap-[5px]`; `R352Symbol` at `h-10 w-auto text-[#DAFF45]` (AgencyHeader.tsx:217), `R352Text` at `h-9` inside an `AnimatePresence` block that collapses on scroll - scrolled state keeps only the R mark (AgencyHeader.tsx:224-232). Static "Strategic Design Partner" tagline sits right of the digits on lg+ with a `bg-current opacity-30` pipe divider.
- **Footer watermark**: `wokolo.svg` ring spins via `animate-spin-slow` with `r.svg` centered at `w-[8.5%]`, in a `20.5rem` (md: `24.5rem`) `pointer-events-none z-0` container; both native #151515 on #0A0A0A. Light mode applies `invert(1) brightness(0.92)` at 30% opacity to read as a ~#ECECEC watermark (Footer.tsx:325-338).
- **Footer bottom**: `R352Symbol` at `w-8 h-8 opacity-50` next to the copyright line (Footer.tsx:348).

### Glyph atlas (WebGL reuse)

The brand paths R-circle/3/5/2 (identical to the index.html splash logo) are rendered client-side to a white-on-black 4-tile canvas atlas, `GLYPH_TILE = 128` (512x128 total), and uploaded as texture unit 0 (LINEAR, clamped, y-flipped). Shaders sample it to scatter brand glyphs - the "808" effect on /webgl and its ambient variant behind the home hero (logoGlyphAtlas.ts:1-5,48,60-73). Color is applied in-shader, so the atlas itself is colorless by design.

### Standards set by this guide (v1.1)

The following are proposed norms, not extracted from code. Adopt or amend, then treat as binding.

- **Clear space**: keep a margin equal to the height of the R circle on all four sides of the mark and lockup. Nothing enters it - no type, no rules, no edges.
- **Minimum size**: 24px mark height in digital contexts. Below that, use nothing (drop the mark rather than shrink it).
- **Backgrounds**: allowed on `#0A0A0A`, `#151515`, `#080808`. On light theme use the dark-variant treatment (flip to #000000, as theme.css already does for text classes). Avoid placing the lime mark on clay `#D97757`.
- **Do**: use the shipped SVGs verbatim; keep #DAFF45 for artwork; regenerate the icon family as a set.
- **Don't**: recolor the mark outside #DAFF45/#000000-flip; stretch or skew; add drop shadows or glows; create an outline-only version (the ring is already the outline gesture - a stroked variant would double it).

## 10. Robot mascot

The brand hero: a friendly, minimalist matte-graphite robot - rounded helmet head, single glowing neon lime visor, small bent neon antenna, one arm raised in a wave - rendered as a grainy premium 3D asset. It is the human-warmth counterweight to the machine grammar of section 0: the shaders, the 129 BPM clock and the graphite planes supply the "machines"; the robot supplies the funk. In copy it already has a name: **R080**, the site's robot assistant persona ("Hi, I'm R080 - r352's robot assistant.", Chatbot.tsx:128-129).

### Assets

| Asset | What it is | Status |
|---|---|---|
| `public/brand-hero/hero.mp4` | Looping render of the robot (waving) | LIVE - only in-code reference is the chatbot launcher (Chatbot.tsx:303) |
| `public/brand-hero/robot.png` | 606x660 still of the same render | Shipped in `public/` but referenced nowhere in `src/` - reserve asset |

Both live under `/brand-hero/` and are served as-is from `public/`. The PNG is the canonical still for off-site use (decks, social, docs) until a dedicated export set exists.

### Where it appears today (verified)

Exactly one placement. The chatbot/FAQ launcher renders `hero.mp4` inside a 64px lime circle: `w-16 h-16 bg-[#D4FF00] rounded-full` button (Chatbot.tsx:281), video `autoPlay loop muted playsInline` with `object-cover [transform:translateY(10px)_scale(1.3)]` framing and `aria-label="R080"` (Chatbot.tsx:302-309). Closed state adds a subdued lime pulse glow, opacity 0.1 -> 0.4 -> 0.1 over 3s (Chatbot.tsx:264-268), and a hover-revealed "FAQ" label in lime display caps (Chatbot.tsx:271).

This scarcity is deliberate, not an accident: the Philosophy soundtrack section was removed 2026-06-10 and the code comment records "Brand-hero robot lives only in the chat/FAQ launcher (client decision 2026-07-06)" (Philosophy.tsx:236-237). Any new on-site placement reverses a client decision - get sign-off first.

### The third lime - visor vs UI vs logo

The visor glow in the render sits around `#c8f13a`. That is the mascot's OWN material color, baked into the 3D asset - it is NOT a UI token and must never become one.

| Lime | Value | Scope |
|---|---|---|
| UI accent | `#D4FF00` | All interactive/typographic accents, tokens, shaders (section 1) |
| Logo asset | `#DAFF45` | Logo artwork only (section 1, "two limes") |
| Visor (render) | ~`#c8f13a` | Inside the mascot render only - never extracted into CSS |

Rules: never sample the visor color for buttons, text or borders; never recolor the visor to #D4FF00 to "match" - the near-miss is what makes it read as light, not paint. UI chrome AROUND the mascot (rings, glows, labels) uses #D4FF00 as everywhere else - exactly what the launcher already does (Chatbot.tsx:264,281).

### Standards set by this guide (v1.1)

Nothing below is currently enforced in code; it is proposed usage law for the mascot.

Use the mascot for:
- Storytelling and narrative surfaces - about/history/timeline content, founder-voice pieces.
- Onboarding and guide moments - anywhere R080 "speaks" (the FAQ launcher is the pattern).
- Social and journal - posts, OG-style promos, article accents.
- Internal/ops docs where a friendly guide figure helps.

Do NOT use the mascot for:
- Client case studies and references - the client's work is the hero there.
- Formal proposals, estimates, contracts (client-branded surfaces like Estymacja907 doubly so).
- Anything implying the robot does the work - r352 is an operator, the robot is a guide.

Hard rules (non-negotiable):
1. Never as a logo replacement. The R352 mark (section 1, #DAFF45 rules) is the identifier; the robot is a character. They may co-exist, never substitute.
2. Dark surfaces only (#151515 / #0A0A0A family) - the render's lighting assumes it.
3. One robot per surface. No armies, no pattern fills.
4. No redraws, recolors, flips or style-transfers of the render; new poses = new 3D renders from the same source model, matching matte graphite + grain.
5. Keep the persona name consistent: R080 in copy, "robot mascot" in design docs.
6. Motion follows section 0 rule 7: any animated placement respects prefers-reduced-motion (one still frame - robot.png exists for exactly this).

## 11. Off-site applications

The brand leaves the site through two channels: Medium (long-form distribution of the journal) and LinkedIn (native reach + companion posts). r352.com stays the source of truth and the SEO beneficiary on both (PUBLISHING-PLAN.md:83). Sources: ~/Downloads/medium/ (PUBLISHING-PLAN.md + 8 prepared posts), ~/Downloads/r352-loops/ (rendered WebGL loops).

### Medium article anatomy

- Every prepared post opens with an HTML `PUBLISH CHECKLIST` comment carrying its canonical import URL, 5 tags and cover pick + fallback (pdf-ai-agents.md:1-6; present in all 8 files).
- Structure: H1 title, then an H2 dek directly under it - two punchy sentences that become the visible subtitle (pdf-ai-agents.md:8-10, refuse-to-ship.md:8-10). Titles are claim-shaped, not topic-shaped ("Your PDF Brand Book Won't Survive AI Agents").
- Cover: the article's r352.com journal cover first, dark gallery effect still as fallback (per-post Cover lines, PUBLISHING-PLAN.md:34,40,46,52,58,64,70,77). A dedicated render exists: r352-loops/medium-cover.jpg, 1280x720.
- Footer bio, verbatim in all 8 posts: one italic paragraph "I'm Reszek. I run r352, a design operations practice for brands delivering at scale (250+ locations, 10k+ assets a year, partnerships running 5+ years)" + a hook into the 48-hour diagnostic, linking r352.com and r352.com/brief (pdf-ai-agents.md footer, cadence-advantage.md footer). The numbers are the section 7 canon - never restate them differently.
- Tags: exactly 5 per post, from the per-post lists (PUBLISHING-PLAN.md:33-78); Branding / Design Systems / Design Operations recur as spine tags.

### Canonical rules (site-journal imports)

1. **Import for canonical, always.** Every Medium post enters via https://medium.com/p/import from its r352.com/journal URL so rel=canonical points at r352.com. Never paste content into the Medium editor directly (PUBLISHING-PLAN.md:82).
2. Unpublished journal routes 301 to /journal and kill the canonical fetch - flip `published: true` and restore sitemap/prerender BEFORE importing (the /journal/10 case, PUBLISHING-PLAN.md:75; route-shipping mirror rules in section 8).
3. All outbound links inside posts and companions point at r352.com pages (/process, /brief, /work/*), never at the Medium copy (PUBLISHING-PLAN.md:83).
4. Client names, numbers and quoted material (Geers/Sonova, Benefit Systems, Zdrofit) ship exactly as approved - trim around quotes, never inside them (PUBLISHING-PLAN.md:84; hard rule 5).

### The em-dash editor trap (hard)

Medium's editor auto-converts " - " into an em dash. Hard rule 1 (no long dashes, ever) applies off-site too. The fix is rewriting, not escaping: restructure dash-hinged sentences with periods, commas or colons before the text ever reaches Medium; after import, scan the Medium draft for auto-converted dashes and rewrite any survivor before hitting publish.

### Cadence

- 1 post per week, Tuesday-Thursday morning CET; default slot Wednesday 09:00 CET, window 08:30-10:00 (PUBLISHING-PLAN.md:24).
- LinkedIn companion goes out the same morning, 1-2 hours after the Medium import, linking the r352.com version (PUBLISHING-PLAN.md:26).
- Never double-publish in a week to chase momentum - "the season is the cadence argument in practice" (PUBLISHING-PLAN.md:27).

### LinkedIn video loops

Offline renders of the site's WebGL surfaces, made for feeds that can't run shaders (r352-loops/):

| Asset | Spec | Source surface |
|---|---|---|
| peak-loop.mp4 | 1280x720, 30 fps, 12s | Peak preset (living topographic map, WebGLExperiment.tsx:788-797) |
| r3loop-morph.mp4 | 1280x720, 30 fps, 14s | R3loop morph journey (WebGLExperiment.tsx:736-786) |
| medium-cover.jpg | 1280x720 still | gallery effect still, Medium cover fallback |

Standards set by this guide (v1.1): loops upload as **native LinkedIn video**, never external links or GIFs; the register is the /webgl gallery and GlassHero aesthetic - near-black base, lime #D4FF00 voice, clay punctuation, in-shader grain - no platform filters, no overlaid stickers or captions on the video itself.

### What carries over, what stays on-site

| Carries everywhere | Stays site-only |
|---|---|
| Operator voice: short declarative sentences, "show, don't talk" (section 7) | Tanker display face - self-hosted webfont; off-site it appears only baked into rendered assets (covers, loops) |
| Number canon: 300+, 250+, 3× (U+00D7), 10k+, 5+, 80%+ - identical on every surface (section 7) | Live WebGL interactivity and audio reactivity - off-site ships rendered video only |
| Dash rule: "-" only; "·" separators, "×" multipliers | Custom cursor, Lenis smooth scroll, page sweeps, the whole motion system |
| Dark visual identity: graphite/near-black + lime #D4FF00 in all art and stills | Theme toggle - off-site assets are dark-only, no light variants |
| Quotes immutable; never fabricate metrics (hard rules 4-5) | PL/EN toggle - the Medium season ships EN (all 8 prepared posts are EN) |

### Before anything ships off-site (Standards set by this guide, v1.1)

- [ ] Zero long dashes - scan your text AND the platform draft after auto-format.
- [ ] Every number matches the section 7 canon; no new metrics invented.
- [ ] Client quotes byte-identical to the approved versions.
- [ ] Canonical resolves to r352.com (Medium: imported via medium.com/p/import, never pasted).
- [ ] Cover/video is a site asset or WebGL render - no stock, no off-palette art.
- [ ] Footer bio present with r352.com and /brief links.
- [ ] All links target r352.com, not the Medium copy.
- [ ] Cadence respected: one post a week, no double-publishing.

## 12. Boilerplate

Ready-to-paste company descriptions, EN + PL, in four lengths. Composed only from verified live copy and the section 7 number canon - no new claims, no new numbers. Copy verbatim; edits go through this file first.

### Verified source lines (do not drift from these)

- Positioning: "Design operations for brands delivering at scale." / "Design operations dla marek działających w skali." (translations.ts:26, :673)
- Identity: "We're an operator, not an agency." (Chatbot.tsx:41; Glossary.tsx:65 defined term)
- Proven footer bio, live on Medium: "I'm Reszek. I run r352, a design operations practice for brands delivering at scale (250+ locations, 10k+ assets a year, partnerships running 5+ years)."
- Founder story anchors: started at Deloitte Digital; built r3loop; first clients Sonova, Benefit Systems, Archicom; "the average now runs 5+ years"; "from a single brand launch to 250+ locations" (Philosophy.tsx:209, :214)
- r3loop definition: "r3loop is r352's 8-step operating methodology" (SEO.tsx:117)
- Proof line: "Approval cycles cut 3×." (translations.ts:37 - always U+00D7, never the letter x)
- Number canon (section 7, never varies between surfaces): 300+ clubs, 250+ locations, 3× approvals, 10k+ assets/yr, 5+ yrs avg partnership, 80%+ first-round briefs.

### Standards set by this guide (v1.1)

The four texts below are proposed as the canonical boilerplate set. Only the first two sentences of the short bio are proven live copy (Medium footer); everything else is assembled from the verified lines above and ships as standard from v1.1.

#### One-liner (max 12 words)

- EN: `r352 - design operations for brands delivering at scale.`
- PL: `r352 - design operations dla marek działających w skali.`

#### Short bio (~50 words) - canonical, Medium-footer pattern

- EN: `I'm Reszek. I run r352, a design operations practice for brands delivering at scale (250+ locations, 10k+ assets a year, partnerships running 5+ years). We're an operator, not an agency: r3loop, our 8-step methodology, builds intake, briefs, QA and shipping cadence as a system - so quality repeats without heroics.`
- PL: `Jestem Reszek. Prowadzę r352 - design operations dla marek działających w skali (250+ lokalizacji, 10k+ assetów rocznie, partnerstwa trwające 5+ lat). Jesteśmy operatorem, nie agencją: r3loop, nasza 8-etapowa metodologia, buduje intake, briefy, QA i rytm dostarczania jako system - żeby jakość powtarzała się bez heroizmu.`
- Sentence 1-2 EN are the proven Medium footer - never rephrase them. To shorten, cut from the end; never rewrite from the top.

#### Full bio (~100 words)

- EN: `r352 is a design operations practice for brands delivering at scale. We're an operator, not an agency: intake paths, brief standards, feedback protocols, packaging rules and shipping cadence built as a system, so premium quality repeats itself without heroics. The methodology is r3loop - eight steps that turn creative chaos into a working system, at every scale, from a single brand launch to 250+ locations. The numbers: 300+ clubs, 10k+ assets a year, approval cycles cut 3×, 80%+ first-round briefs, partnerships averaging 5+ years. Founded and run by Reszek, who started at Deloitte Digital. hello@r352.com`
- PL: `r352 to praktyka design operations dla marek działających w skali. Jesteśmy operatorem, nie agencją: ścieżki intake, standardy briefów, protokoły feedbacku, zasady pakowania i rytm dostarczania zbudowane jako system - żeby jakość premium powtarzała się bez heroizmu. Metodologia to r3loop - osiem kroków, które zamieniają kreatywny chaos w działający system, w każdej skali: od pojedynczego launchu marki po 250+ lokalizacji. Liczby: 300+ klubów, 10k+ assetów rocznie, cykle akceptacji skrócone 3×, 80%+ briefów w pierwszej rundzie, partnerstwa trwające średnio 5+ lat. Założone i prowadzone przez Reszka, który zaczynał w Deloitte Digital. hello@r352.com`

#### Founder one-liner

- EN: `Reszek - founder of r352 and the r3loop methodology. Design operations for brands delivering at scale.`
- PL: `Reszek - założyciel r352 i metodologii r3loop. Design operations dla marek działających w skali.`

#### Usage map

| Context | Version | Notes |
|---|---|---|
| Directories, award listings, link-in-bio | One-liner | Pair with r352.com + hello@r352.com |
| Podcast intros | Short bio | Founder voice ("I'm Reszek") reads naturally spoken |
| Article footers (Medium, guest posts) | Short bio | Sentences 1-2 = proven live footer, verbatim |
| Proposals, pitch decks | Full bio | About/last page; PL money rules from section 7 apply |
| LinkedIn - company page | Full bio | Trim from the end if over the field limit |
| LinkedIn - founder profile | Short bio | Founder one-liner as the headline field |

#### Rules

1. r352 and r3loop always lowercase, even sentence-initial (section 7 Naming); Reszek is the founder mononym.
2. Numbers only from the canon; 3× always U+00D7; no new stats enter boilerplate before entering section 7.
3. Dash rule applies in full: "-" only, usually spaced " - ", EN and PL alike.
4. "Design operations" and "r3loop" stay English in PL copy (category-term policy, translations.ts:671-672).
5. Never rephrase per channel - pick the length, paste verbatim, cut from the bottom if forced.

## 13. Appendix: open questions

Cross-domain (deduped):
1. Clay canonical: CSS `#D97757` vs shader `vec3(0.851,0.463,0.341)` ~ #D97657 (1 green step off; the #D9764F in earlier briefs matches neither - would be blue 0.310). Move shaders to `vec3(0.851,0.467,0.341)` or accept the drift?
2. Clay status: the header tagline accent (AgencyHeader.tsx:242-254) is marked in-code as a 2-week test - is clay now a confirmed permanent secondary?
3. Grain dormant: GrainOverlay defined but never mounted (App.tsx:14-15 comment only); `.bg-noise`/`.animate-noise` (theme.css:171-217) unused. Intentionally grain-free, or re-mount?
4. `body.lime-theme` is orphaned (only removed App.tsx:322-323, read AgencyHeader.tsx:47/AnimeGrid.tsx:137) - delete from theme.css or keep documenting?
5. Dual lime on the same mark: R352Symbol renders #DAFF45 in header/favicon but #D4FF00 in PageTransition.tsx:265; stay-dark pin silently converts DAFF45 to D4FF00 (theme.css:856-859). Intended context split or drift?
6. "Page background" naming: `--background` = #151515, yet comments and index.html theme-color/splash treat #0A0A0A as "the page". Which hex gets the name?
7. LimitedAccess*.tsx off-system palette (#10b981, #9B51E0, #FF6B35, #0071e3/#1d1d1f) - confirm exempt one-off pitch pages.
8. src/app/components/Header.tsx is dead code (imported nowhere); `--background-dark` would then have no live consumer.
9. Stale audio comments: AudioContext.tsx:4-12 says Mompou at 0.4 and MagneticButton.tsx:90 mentions Mompou, but code plays Planet Rock instrumental at 0.5 (AgencyHeader.tsx:333 agrees) - doc treats code as canonical; fix the comments.

Typography:
10. Body font identity: brand anchor says Plus Jakarta Sans, code makes BW Haas Head primary (flaky cdnfonts CDN) with PJS Safari-only (index.html:48-49,70-80; theme.css:70-73,351-359). Promote PJS universally, or self-host BW Haas Head like Tanker?
11. type-* utilities have near-zero adoption (type-h1 2x, type-h2 3x) vs ~300 hand-composed headings - intended source of truth or legacy layer?
12. `--font-mono` aliases the body sans (34 semantic uses) - intentional "technical voice" or cleanup candidate?
13. tracking-tight == tracking-tighter (-0.02em, theme.css:82-83), both 100+ uses - deprecate one?
14. font-bold (488 uses) renders 500 via token caps - contributors will expect 700; rename or document prominently?
15. Figma-export tracking artifacts (tracking-[-3.8958px] 12x, [-0.1516px] 8x, [0.5156px] 6x) - normalize to the em ladder?
16. Three hero leadings coexist (0.85 token, 0.95 desktop override, 0.76 mobile) - update the token or accept page-specific overrides?
17. Kicker size split text-xs (153) vs text-[10px] (93) with no rule - codify 10px = micro tier, 12px = default?

Layout:
18. `mask-fade-sides` applied in ClientLogos.tsx:47 but defined in no CSS under src/ - dead class or missing utility (logo strip currently has no side fade).
19. Gutter drift px-6/px-4 variants on utility/legal/limited-access pages - intentional or normalize to px-8 md:px-12?
20. Heavy-tier rhythm has three standards: py-24 md:py-32 (18) vs flat py-32 (31) vs py-32 md:py-40 (3) - which is canonical?
21. Dot geometry conflict: lime bullets square rounded-none (References.tsx:150) vs nav/marquee dots rounded-full (AgencyHeader.tsx:294, OfferMarquee.tsx:55) vs white list dots rounded-full (Audience.tsx:21, HowWeWork.tsx:44) - is the rule "bullets square, status dots round"?
22. Border light-mode remap (theme.css:597, covers only /5 /10 /20 /30) vs explicit dual classes - phase the remap out?
23. gap-px fill varies: bg-white/[0.06] vs bg-white/10 (StatsGrid.tsx:36) - pick one hairline tone.
24. One-off shells max-w-[1400px]/[1500px]/[1600px] - intentional per-page or drift from 1800px?

Components:
25. Vendored shadcn/radix kit (~48 files, zero imports) - explicitly forbid, or reserved for future admin/product surfaces?
26. Large dormant surface (Preloader, GlassHero 893 lines, KineticManifesto, AudioToggle, SpotifyPlayer, NowPlayingIndicator, NoiseBackground, ParallaxImage, PersistentBackground, legacy Header/Hero/StatsGrid, ~7 unused agency sections) - keep as archive or prune?
27. Lime-fill CTA hover: hover:bg-white (16) vs hover:bg-[#D4FF00]/90 (2, hero) vs hover:bg-[#e0ff33] (3) - which is canonical?

Motion:
28. Reduced-motion gap: Reveal, CinematicText, MaskReveal, MagneticButton, MusicNudge and the ThemeContext sweep still run framer tweens under reduce (CSS clamp doesn't touch JS motion) - intentional "content motion" or close via MotionConfig reducedMotion="user"?
29. Two decel curves serve "entering": [0.16,1,0.3,1] (Reveal family) vs [0.22,1,0.36,1] (everything newer); ChipTooltip.tsx:13 even misattributes Reveal's curve - document as two-curve system (current stance) or unify?
30. Timing comments disagree with numbers: ThemeContext.tsx:27 says "0.8s" but times out at 700ms; FocusMainOnRouteChange says "~700ms" while content settles at 1.2s - which number is source of truth?
31. Stagger steps 0.05/0.06/0.07/0.08/0.1 coexist - prescribe exactly two (0.05 dense / 0.1 sparse)?
32. ConsentBanner one-off ease [0.55,0,0.35,1] - migrate to signature or keep as deliberate "legal UI feels different"?
33. Transition sound plays on EVERY navigation with no user setting and no reduced-motion/sound gate - tie to the AudioContext mute state?
34. lenis.resize() triple setTimeout (100/500/1500ms) copy-pasted across 6 pages - extract a shared hook; which timing is load-bearing?

WebGL:
35. Stale header comment WebGLExperiment.tsx:10-12 lists presets as "Flow / Grid / Cells" - actual library is Flow/Aurora/Scope/Warp/808/Cymatics/Peak/R3loop.
36. Comments claim a "129 BPM clock fallback when silent" (WebGLExperiment.tsx:847, HeroWebGLBackground.tsx:102) but the implementation is calm constants 0.22/0.22/0.18 + u_live gating - this doc records the implemented behavior; fix comments.
37. /webgl gallery has no IO pause (fixed fullscreen route, always visible) - is the IO rule mandatory only for embedded surfaces?
38. Dark-only gating split: EffectBackdrop gates in-component (reads ThemeContext, re-creates GL on theme flip) vs HeroWebGLBackground gated at the call site - pick one documented convention.

Voice:
39. Estymacja907.tsx:35-190 uses en-dashes in PLN ranges ("800-1 500 PLN" should be the form) - violation or accepted numeric-range exception? Normalize if the rule is absolute.
40. The dash rule was previously written nowhere in-repo (guidelines/Guidelines.md is an empty stub) and comments mislabel the hyphen as "em-dash" (AgencyHero.tsx:219, ServicesList.tsx:169) - this document now records it; fix the comments.
41. translations.ts:778 pl.services_page.title = "Services" untranslated - category-term policy or oversight?
42. Is "≠" an approved typographic exception alongside "·" and the multiplication sign? (translations.ts:434/1071)
43. Secondary CTA drift: hero "Book a call" (translations.ts:41) vs closing/philosophy "Schedule a call" (:537,:448) - funnel distinction or drift?
44. Three testimonial roles still placeholders awaiting real titles (projects.tsx:280,358,423).
45. Bilingual placement rule (dictionary vs ternary vs data object) is de facto, not written - codify it (recorded as rule 7.2 above).
46. Chatbot.tsx:51 PL "akountowalny" - intentional calque of "accountable" or typo? (Elsewhere PL uses "odpowiedzialnosc/ownership".)
47. Form error color: BriefAccess.tsx:48,55 uses border-red-500/text-red-500 while the token palette defines --destructive #990000 (theme.css:37) - standardize one error color.
