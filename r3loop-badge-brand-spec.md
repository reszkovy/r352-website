# R3LOOP Badge — Brand Specification

**For Briefly team integrating r3loop.app surfaces.**

This document specifies the R3LOOP brand mark so it can be recreated on r3loop.app (and any other r3loop touchpoints) with pixel-perfect consistency to the source design system on r352.com.

---

## Purpose

R3LOOP is the productized methodology brand inside the r352 design practice. The badge is its **wordmark/logo** — used wherever the methodology needs to be expressed as a brand asset, not body text.

---

## Visual Anatomy

A **rounded pill** containing the wordmark **R3LOOP** in uppercase Tanker font, lime outline 2px, transparent background, hover subtly tints lime.

```
┌──────────────────────────┐
│                          │
│       R 3 L O O P        │   ← lime border 2px
│                          │   ← lime text (matches border)
└──────────────────────────┘   ← transparent fill
   ↑                    ↑
   fully rounded ends (pill / capsule shape)
```

---

## Specification

### Typography
| Property | Value |
|---|---|
| Font family | **Tanker** (display) |
| Source | https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap |
| Weight | 400 (regular) |
| Case | UPPERCASE — always rendered as `R3LOOP` |
| Letter spacing (tracking) | `0.15em` |
| Line height | `1` (no extra leading) |

### Color
| Property | Token | Hex | Usage |
|---|---|---|---|
| Border / text (default) | Lime | `#D4FF00` | Primary outline + text color |
| Background (default) | Transparent | `rgba(0,0,0,0)` | Empty pill |
| Background (hover) | Lime 10% | `rgba(212, 255, 0, 0.1)` | Subtle tint on interaction |
| Text (solid variant) | Black | `#000000` | When variant used on photos / lime fills |

### Shape & Stroke
| Property | Value |
|---|---|
| Border radius | `9999px` (fully rounded pill) |
| Border width | **2px** (do NOT use 1px — too thin against Tanker glyph weight) |
| Border style | solid |
| Display | `inline-flex`, items-center, justify-center |

### Sizing variants

| Size | Use case | Padding (horizontal · vertical) | Font size |
|---|---|---|---|
| **Small** | Footer, inline mentions, signatures | `12px · 4px` | `11px` |
| **Medium** | Hero badges, section markers (default) | `16px · 6px` | `14px` |
| **Large** | Standalone hero moments, splash screens | `20px · 8px` | `16px` |

### Hover state
- Background fades in from `transparent` → `rgba(212, 255, 0, 0.1)`
- Transition: `300ms ease-out` on `background-color`
- Text/border color does NOT change on hover (stays lime)

### TM symbol — optional
- **Default: NO TM symbol** (cleaner look)
- TM only when used on legal/marketing materials where IP positioning is needed
- If used: `<sup>™</sup>` at `0.55em` font size, tracking-normal, slight negative top margin to align with cap-height of TANKER glyphs

---

## Code samples

### Plain HTML + CSS

```html
<span class="r3loop-badge">R3LOOP</span>

<style>
  /* Load Tanker font once in <head> */
  @import url('https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap');

  .r3loop-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 16px;
    border: 2px solid #D4FF00;
    border-radius: 9999px;
    background-color: transparent;
    color: #D4FF00;
    font-family: 'Tanker', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: default;
    user-select: none;
    transition: background-color 300ms ease-out;
  }

  .r3loop-badge:hover {
    background-color: rgba(212, 255, 0, 0.1);
  }

  /* Size variants */
  .r3loop-badge.sm { padding: 4px 12px; font-size: 11px; }
  .r3loop-badge.md { padding: 6px 16px; font-size: 14px; } /* default */
  .r3loop-badge.lg { padding: 8px 20px; font-size: 16px; }
</style>
```

### Tailwind CSS

```html
<span class="inline-flex items-center justify-center
             px-4 py-1.5 text-sm
             font-display tracking-[0.15em] uppercase leading-none
             rounded-full
             border-2 border-[#D4FF00] text-[#D4FF00] bg-transparent
             hover:bg-[#D4FF00]/10
             transition-colors duration-300
             cursor-default select-none">
  R3LOOP
</span>
```

Where `font-display` is mapped to Tanker in your Tailwind config:

```js
// tailwind.config.js
fontFamily: {
  display: ['Tanker', 'sans-serif'],
}
```

### React component (drop-in reusable)

```tsx
interface R3LoopBadgeProps {
  size?: "sm" | "md" | "lg";
  tm?: boolean;
  variant?: "outline" | "solid";
}

export function R3LoopBadge({
  size = "md",
  tm = false,
  variant = "outline"
}: R3LoopBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-[11px]",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-base",
  };

  const variantClasses = {
    outline: "border-2 border-[#D4FF00] text-[#D4FF00] bg-transparent hover:bg-[#D4FF00]/10",
    solid:   "border-2 border-[#D4FF00] text-black bg-[#D4FF00] hover:bg-[#D4FF00]/90",
  };

  return (
    <span
      className={`inline-flex items-center justify-center
                  font-display tracking-[0.15em] uppercase leading-none
                  rounded-full transition-colors duration-300
                  cursor-default select-none
                  ${sizeClasses[size]} ${variantClasses[variant]}`}
      aria-label="R3LOOP methodology"
    >
      <span>R3LOOP</span>
      {tm && <sup className="text-[0.55em] tracking-normal -mt-1 ml-0.5">™</sup>}
    </span>
  );
}
```

---

## Usage on r3loop.app

### Recommended placements

| Location | Size | Variant |
|---|---|---|
| Header (top-left) — primary brand mark | `md` | `outline` |
| Footer (bottom corner) | `sm` | `outline` |
| Wizard step indicator / loading screen | `lg` | `outline` |
| Thank you / brief-complete page | `md` | `outline` |
| Email signatures from `@r3loop.app` | `sm` | `outline` |
| Marketing assets / one-pager headers | `lg` | `outline` |

### Inverted contexts (rare)
Use `solid` variant only when:
- Placing on a photographic background where outline doesn't read clearly
- Designing a lime "fill" hero moment where contrast inverts (black text on lime fill)

---

## Do's & Don'ts

### ✅ Do
- Always use **Tanker font** (downloadable free from https://www.fontshare.com/fonts/tanker)
- Always render text as **R3LOOP** (uppercase, exact spelling)
- Always use **lime `#D4FF00`** as border + text color
- Keep border at exactly **2px** thickness
- Maintain min **24px clearance** from other elements / text
- Use the size that matches surrounding typography weight

### ❌ Don't
- Don't change the casing (no "r3loop", no "R3Loop")
- Don't change colors (no white, no other accent)
- Don't fill background with solid color (except solid variant in specific contexts)
- Don't stretch or distort the pill shape
- Don't add drop shadows, glows, gradients
- Don't add the TM symbol by default (opt-in only)
- Don't place on busy/textured backgrounds without a clean backdrop
- Don't render in any font other than Tanker

---

## Brand color reference

| Color | Hex | RGB | Usage |
|---|---|---|---|
| Lime (primary) | `#D4FF00` | `212, 255, 0` | r3loop brand mark, accents |
| Lime 10% (hover) | `rgba(212, 255, 0, 0.1)` | — | Subtle tint state |
| Black | `#000000` | `0, 0, 0` | Solid variant text |
| Off-black (page bg context) | `#0A0A0A` | `10, 10, 10` | Typical placement bg on r352 |

---

## Font sourcing

**Tanker** is free from Fontshare. Two integration methods:

### Method 1 — CSS Import (simplest)
```css
@import url('https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap');
```

### Method 2 — `<link>` in HTML head
```html
<link rel="preconnect" href="https://api.fontshare.com" crossorigin>
<link rel="preload" href="https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap" as="style">
<link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=tanker@400&display=swap">
```

### Method 3 — Self-host (best performance)
Download `.woff2` files from Fontshare, host on your own CDN, declare via `@font-face`.

---

## Questions / clarifications

If anything is unclear or you need a different variant (e.g. monochrome white for dark hero moments, animated version, larger marketing-grade asset), reach out to:

**Reszek · r352**  
hello@r352.com  
LinkedIn: linkedin.com/in/przemyslawreszka

---

*Version 1.0 — May 2026*  
*Brand mark designed and maintained at r352 design practice. Used under brand alignment for r3loop.app surfaces.*
