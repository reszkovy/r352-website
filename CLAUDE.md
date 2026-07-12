# r352.com - working rules

## Brand system (read this first)

`.brand/design-system.md` is the brand source of truth (13 sections: color, typography, layout, components, motion, WebGL/audio, voice, logo, mascot, off-site, boilerplate). Its human-readable mirror is `.brand/brand-centre.html`, deployed password-gated at r352.com/brand (encrypted copy: `public/brand/index.html`).

- **Before any UI, copy or brand-adjacent change:** read the relevant section of `.brand/design-system.md`. Machine-readable tokens: `.brand/tokens.json`.
- **After changing** `src/styles/theme.css`, `src/app/i18n/translations.ts`, logo assets, easings or any documented pattern: update `.brand/design-system.md` (and brand-centre.html if user-facing), then run `npm run brand:check`.
- **Redeploy of /brand:** `npx staticrypt .brand/brand-centre.html -p '<password>' --short -d public/brand`, rename output to `public/brand/index.html`, re-inject the `noindex` meta, `npx vercel --prod --yes`. Password: ask Reszek (or see memory).
- When the guide and the code disagree, the code wins - fix the guide, not the code.

## Hard brand rules (non-negotiable)

1. No long dashes, ever. Every dash is "-" (EN and PL alike).
2. Dark theme is primary; light theme is an override allowlist in theme.css.
3. Silence = stillness: no beat-locked motion without music (gate by `u_live`).
4. Never fabricate metrics; numbers only from the canon in design-system.md section 7.
5. Never rewrite client quotes.
6. PL + EN parity; EN is the structural source of truth.
7. `prefers-reduced-motion` respected in every canvas (one still frame).

## Deploy

`npm run build` (vite + inject-meta + prerender), then `npx vercel --prod --yes`. No GitHub integration - Vercel CLI only.
