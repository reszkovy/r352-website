# Parallel Agent Deployment Plan — r352.com Audit Close-out

**Cel:** Wdrożyć pozostałe rekomendacje audytora (Fazy 1-3) przez **5 równoległych agentów** plus **supervisor** do merge'owania. Spodziewany rezultat: średni audit score ~810 → **~920+** w jednym sprincie.

**Czas wykonania:** 4-6h równolegle (vs 12-16h sekwencyjnie).

---

## ARCHITEKTURA RÓWNOLEGŁOŚCI

5 agentów pracujących na **rozłącznych zbiorach plików**. Każdy ma:
- Własny scope (logiczna domena)
- Jednoznaczny file ownership (kto edytuje co)
- Explicit input contract (czego potrzebuje na start)
- Explicit output contract (co produkuje)
- Niezależne verification (jak sprawdzić sukces)

**Punkty koordynacji** (zarządza supervisor):
- `src/app/App.tsx` — routing additions z Agent 2 + Agent 6 (merge sekwencyjny)
- `package.json` — dependency additions z Agent 3 + Agent 4 (merge sekwencyjny)
- `src/app/components/Footer.tsx` — Agent 2 only (no conflict)
- Wszystkie pozostałe pliki — single ownership, brak konfliktów

---

## AGENT 1 — ACCESSIBILITY AGENT

**Cel:** Zamknąć kategorię #8 Accessibility (690 → 910).

**File ownership (exclusive):**
- `src/app/components/agency/AgencyHeader.tsx` (focus trap, Escape close)
- `src/app/components/ui/PageTransition.tsx` (JS-level reduced motion)
- `src/app/components/ui/CursorGlow.tsx` (disable for reduced motion)
- `src/app/components/ui/CustomCursor.tsx` (disable for reduced motion)
- `src/app/components/ui/Preloader.tsx` (reduce/skip for reduced motion)
- `src/app/components/ui/SmoothScroll.tsx` (Lenis duration override)
- `src/app/hooks/useReducedMotion.ts` (NEW)

**Tasks:**
1. Stworzyć `useReducedMotion()` hook — singleton listener na media query, zwraca boolean.
2. W `AgencyHeader.tsx`:
   - Implementować pełny focus trap dla mobile menu (Tab i Shift+Tab loop tylko wewnątrz menu)
   - Escape key handler zamyka menu + przywraca focus na trigger
   - `useEffect` zarządzający `document.body.style.overflow` (już chyba jest)
3. W `PageTransition.tsx`: jeśli `useReducedMotion() === true`, użyć variants z `duration: 0` (skip sweep animations).
4. W `CursorGlow.tsx` + `CustomCursor.tsx`: jeśli reduced motion, return null (nie renderuj cursor effects).
5. W `Preloader.tsx`: jeśli reduced motion, skip animation, set ready state instantly.
6. W `SmoothScroll.tsx`: jeśli reduced motion, override Lenis duration: 0, lerp: 1 (effective native scroll).

**Verification:**
- Włącz "Reduce motion" w macOS System Settings → Display
- Refresh strony → preloader skips, page transitions instant, cursor effects nie renderują, scroll jest native
- Tab przez mobile menu → focus zostaje wewnątrz, Escape zamyka

**Spodziewany impact na audit:**
- #8 Accessibility: 690 → 880+
- #5 JS rendering: 705 → 730 (drobny boost przez mobile efekt skip)

**Czas:** 1-2h

---

## AGENT 2 — CONSENT/PRIVACY AGENT

**Cel:** Zamknąć kategorię #10 Privacy/governance (655 → 905).

**File ownership (exclusive):**
- `src/app/components/ConsentBanner.tsx` (NEW)
- `src/app/components/GTM.tsx` (modify — add gating)
- `src/app/pages/Privacy.tsx` (NEW)
- `src/app/pages/Cookies.tsx` (NEW)
- `src/app/components/Footer.tsx` (add 2 links)
- `src/app/context/ConsentContext.tsx` (NEW)
- `src/app/i18n/translations.ts` (ADD: consent banner + privacy/cookies sections)

**Coordination with supervisor:**
- App.tsx — dodać `<Privacy>` i `<Cookies>` routes (supervisor merges)

**Tasks:**
1. Stworzyć `ConsentContext` z state: `accepted | denied | pending`, persisted w `localStorage` (key `r352-consent-v1`).
2. Stworzyć `ConsentBanner` UI — bottom-fixed, dark theme, dwa CTA: "Accept all" + "Necessary only", link do `/privacy`. Pokazuje się tylko gdy `pending`.
3. W `GTM.tsx`: gate'uj `gtag` / dataLayer push'e za `consent === "accepted"`. Jeśli denied, fallback do anonymized analytics only (lub kompletnie skip).
4. Stworzyć `Privacy.tsx` — pełna polityka prywatności (EN+PL), zgodna z GDPR + Spanish LOPDGDD. **Draft copy do legal review** — oznacz jako `[DRAFT — needs legal review]`.
5. Stworzyć `Cookies.tsx` — kategoryzacja cookie'sów (Necessary, Analytics, Marketing), description per każdy, reject/accept toggles.
6. W `Footer.tsx` — dodać dwa linki: "Privacy Policy" + "Cookie Preferences" (drugi otwiera modal/page z toggle'ami).
7. W `translations.ts` — dodać klucze `consent.banner.*`, `privacy.*`, `cookies.*` (EN+PL).

**Verification:**
- Wyczyść localStorage, refresh strony → banner się pokazuje
- Click "Accept all" → banner znika, localStorage ma `accepted`, GTM ładuje
- Click "Necessary only" → banner znika, GTM NIE ładuje, localStorage ma `denied`
- Refresh → banner się nie pokazuje (state persisted)
- Footer ma dwa nowe linki, klik prowadzi do realnych stron

**Spodziewany impact na audit:**
- #10 Privacy/governance: 655 → 870+
- #6 Content: 925 → 935 (drobny boost przez visible policy pages)

**Czas:** 2-3h

---

## AGENT 3 — PRERENDER/SSG AGENT

**Cel:** Zamknąć kategorię #5 JS/rendering (705 → 910). **Największy single architectural lever.**

**File ownership (exclusive):**
- `vite.config.ts` (add plugin)
- `package.json` (add dependency) — **COORDINATION POINT**
- `scripts/prerender.mjs` (NEW — jeśli plugin nie wystarcza)
- `src/main.tsx` (potential hydration adjustment)
- `dist/` (output, generated)

**Coordination with supervisor:**
- package.json merge — Agent 4 też tu pisze, supervisor merguje
- Może wymagać drobnych adjustacji w komponentach które używają `window`/`document` na top-level (powinny być w useEffect) — supervisor reviewuje przed merge'em

**Tasks:**
1. Install `vite-plugin-prerender-spa` lub `react-snap` (recommend pierwsze, lepiej zintegrowane z Vite).
2. Konfiguracja w `vite.config.ts`:
   ```ts
   prerender({
     routes: ['/', '/services', '/process', '/glossary', '/work', '/journal', '/contact'],
     renderer: '@prerenderer/renderer-puppeteer',
     rendererOptions: { renderAfterTime: 3000, headless: true }
   })
   ```
3. Wait conditions — czekaj na: `window.__PRERENDER_READY__ = true` set'owany przez Suspense fallback resolution, framer-motion entry animations done, async data fetched.
4. W `App.tsx` lub `Home.tsx` — set `__PRERENDER_READY__` po pierwszym kompletnym render'cie (useEffect z timeout 2s).
5. Per-route case studies + journal articles — opcjonalnie dynamic prerender z mapy routes lub leave as fallback (Vite handles).
6. Test build lokalnie — `npm run build` produkuje `dist/index.html`, `dist/services/index.html`, `dist/process/index.html`, etc., każdy z prerendered HTML zawierającym title/meta/canonical/content per route.

**Verification:**
- `npm run build && grep -l "r3loop" dist/*/index.html` — każdy route'owy HTML zawiera content związany z tym route'm
- `curl https://www.r352.com/process` (po deploy) bez JS execution → widzi pełen content r3loop methodology
- Lighthouse SEO score per route → 100/100

**Spodziewany impact na audit:**
- #5 JS rendering: 705 → 905+
- #1 SEO: 900 → 935
- #2 Crawlability: 885 → 920

**Czas:** 2-4h (zależnie od ile router/async edge cases)

---

## AGENT 4 — PERFORMANCE/BUDGETS AGENT

**Cel:** Zamknąć kategorię #4 Performance (820 → 920) + dorzucić governance protection.

**File ownership (exclusive):**
- `scripts/check-asset-budget.mjs` (NEW)
- `.github/workflows/lighthouse.yml` (NEW)
- `.github/workflows/asset-budget.yml` (NEW)
- `package.json` (add `@lhci/cli` devDependency) — **COORDINATION POINT**
- `lighthouserc.json` (NEW — Lighthouse CI config)

**Coordination with supervisor:**
- package.json — append do devDependencies, supervisor merges z Agent 3

**Tasks:**
1. `scripts/check-asset-budget.mjs`:
   - Po `vite build`, scan `dist/assets/` + `dist/`
   - Fail jeśli pojedynczy obraz >500 KB bez exception w whitelist
   - Fail jeśli pojedynczy JS chunk >300 KB gzipped bez exception
   - Fail jeśli initial CSS >50 KB gzipped
   - Output: konkretne pliki + sizes + suggested actions
2. `.github/workflows/asset-budget.yml`:
   - Trigger: na każdy push do main + na pull_request
   - Steps: checkout, install, build, run check-asset-budget
   - Fail PR jeśli budget przekroczony
3. `.github/workflows/lighthouse.yml`:
   - Trigger: po Vercel deploy success (lub zwykły push z 90s wait)
   - Run Lighthouse CI na 5 routes: /, /services, /process, /work, /work/sonova
   - Assertions: Performance ≥85, Accessibility ≥90, Best Practices ≥90, SEO ≥95
   - Comment results na PR (opcjonalnie)
4. `lighthouserc.json` — config z assertions + URL list.

**Verification:**
- Push branch z fake 600 KB obrazem → asset-budget workflow fail z konkretnym detail'em
- Push do main → Lighthouse workflow runs, results visible w Actions tab
- Score regression przy następnym push'u → workflow fail

**Spodziewany impact na audit:**
- #4 Performance: 820 → 880 (samo monitoring, faktyczne optymalizacje od deweloperów)
- **Indirect**: chroni cały score przed regression w przyszłości

**Czas:** 1-2h

---

## AGENT 5 — CONTENT/OG IMAGES AGENT

**Cel:** Zamknąć kategorię #3 Social sharing (930 → 960) + #6 Content (925 → 960).

**File ownership (exclusive):**
- `scripts/generate-og-images.mjs` (NEW)
- `public/og/*.png` (NEW files — generated)
- `src/app/pages/FAQ.tsx` (NEW)
- `src/app/App.tsx` — add route `/faq` — **COORDINATION POINT**
- `src/app/components/SEO.tsx` — per-route ogImage logic (modify `getPageSEO` mapping)

**Coordination with supervisor:**
- App.tsx — `/faq` route addition, supervisor merges z Agent 2's routes

**Tasks:**
1. `scripts/generate-og-images.mjs`:
   - Read templates SVG (1200x630) per route type: `home.svg`, `services.svg`, `process.svg`, `glossary.svg`, `work.svg`, `journal.svg`, `case-study.svg`, `article.svg`
   - Per route, render SVG → PNG via ImageMagick lub sharp
   - Output do `public/og/{route-name}.png`
   - Dla case studies: iterate przez `projects.tsx`, generuj per-project OG z client name + key KPI
   - Dla journal articles: iterate, generuj per-article OG z title + category
2. `FAQ.tsx`:
   - Stworzyć stronę `/faq` z visible content matching `faqSchema` z `SEO.tsx`
   - 5 pytań: "What is r3loop?", "Who does r352 work with?", "How is r352 different from a creative agency?", "What are r352's engagement models?", "Who is Reszek?"
   - Each Q jako `<details><summary>` lub custom accordion
   - JSON-LD FAQPage schema już jest w `SEO.tsx` — teraz schema match'uje visible content
3. Update `SEO.tsx`:
   - `getPageSEO` (jest w App.tsx, sprawdź) zwraca `ogImage` per route
   - Per case study `/work/{id}`: `https://www.r352.com/og/case-{id}.png`
   - Per article `/journal/{id}`: `https://www.r352.com/og/article-{id}.png`
   - Per main route: `https://www.r352.com/og/{route}.png`
4. Update sitemap.xml — dodać `/faq`.

**Verification:**
- `npm run build && ls dist/og/*.png` — wszystkie pliki istnieją
- LinkedIn Post Inspector dla `https://www.r352.com/work/sonova` → pokazuje sonova-specific OG image, nie generic
- `https://www.r352.com/faq` → strona renderuje z 5 widocznymi Q&A
- Schema validator dla `/` i `/faq` → FAQ schema matches visible content (Google rich result eligible)

**Spodziewany impact na audit:**
- #3 Social sharing: 930 → 960
- #6 Content/positioning: 925 → 950
- #1 SEO: 900 → 920 (rich results eligibility)

**Czas:** 2-3h

---

## SUPERVISOR — MERGE & INTEGRATION

**Rola:** Koordynuje wymianę plików między agentami, mergeuje shared files, runs final integration testing.

**Pliki które tylko supervisor modyfikuje (po collect output'ów agentów):**

### `src/app/App.tsx` (4 changes z 3 agentów)

```tsx
// Z Agent 2:
const Privacy = lazy(() => import("@/app/pages/Privacy").then(m => ({ default: m.Privacy })));
const Cookies = lazy(() => import("@/app/pages/Cookies").then(m => ({ default: m.Cookies })));
// + routes: /privacy, /cookies

// Z Agent 5:
const FAQ = lazy(() => import("@/app/pages/FAQ").then(m => ({ default: m.FAQ })));
// + route: /faq

// Z Agent 2 (ConsentProvider wrapper):
<ConsentProvider>...</ConsentProvider>

// Z Agent 2 (ConsentBanner mounted globally):
<ConsentBanner />
```

**Merge order:** Agent 2 first (privacy/cookies + ConsentProvider wrap), then Agent 5 (faq route), then Agent 6 if exists.

### `package.json` (2 dep additions z 2 agentów)

```json
{
  "dependencies": {
    // Z Agent 3:
    "vite-plugin-prerender-spa": "^x.x.x",
    "@prerenderer/renderer-puppeteer": "^x.x.x"
  },
  "devDependencies": {
    // Z Agent 4:
    "@lhci/cli": "^x.x.x"
  }
}
```

**Merge order:** Append-only, both agents specify exact deps, supervisor merges JSON keys.

### `src/app/components/SEO.tsx` (modify per-route ogImage logic)

Agent 5 modyfikuje fragment `getPageSEO` (który prawdopodobnie jest w App.tsx, nie SEO.tsx — to do verify). Single-agent owned, no conflict.

---

## EXECUTION ORDER (parallelism opportunities)

### Wave 1 — Pełna równoległość (T+0 do T+2h)
- **Agent 1** (Accessibility) — start
- **Agent 2** (Consent/Privacy) — start
- **Agent 4** (Performance/Budgets) — start
- **Agent 5** (Content/OG) — start, ale skip route additions until supervisor merge

### Wave 2 — Sequential (T+2h do T+4h)
- **Agent 3** (Prerender) — start po Agent 1 zakończeniu (potrzebuje stabilnych komponentów)
- **Supervisor** — collect Agent 1, 2, 4, 5 output, merge App.tsx + package.json

### Wave 3 — Integration (T+4h do T+5h)
- **Supervisor** — collect Agent 3 output, final merge
- **Supervisor** — run `npm run build` end-to-end, verify dist/* structure
- **Supervisor** — run `scripts/post-deploy-check.mjs` locally (no live, syntax only)
- **Supervisor** — commit + push w jednej akcji

### Wave 4 — Live verification (T+5h do T+6h)
- Vercel deploys (~3 min)
- GitHub Action `post-deploy-check.yml` runs (auto)
- Lighthouse CI runs (auto)
- Asset budget check runs (auto)
- Supervisor reviews wszystkie 3 results, raporta back

---

## CONFLICT MATRIX (verified rozłączność)

| Plik | Agent 1 | Agent 2 | Agent 3 | Agent 4 | Agent 5 | Supervisor |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| `App.tsx` | | R | | | R | W |
| `package.json` | | | R | R | | W |
| `Footer.tsx` | | W | | | | |
| `GTM.tsx` | | W | | | | |
| `SEO.tsx` | | | | | W | |
| `AgencyHeader.tsx` | W | | | | | |
| `PageTransition.tsx` | W | | | | | |
| `CursorGlow.tsx` + `CustomCursor.tsx` | W | | | | | |
| `Preloader.tsx` | W | | | | | |
| `SmoothScroll.tsx` | W | | | | | |
| `vite.config.ts` | | | W | | | |
| Wszystkie nowe pliki (per agent) | W | W | W | W | W | |

**Legenda:** W = write/edit (full ownership), R = requests change (supervisor merges)

**Konflikt zero**: każdy plik ma maksimum 1 agenta-writera + opcjonalnie supervisor jako merger.

---

## SPODZIEWANY KOŃCOWY SCORE

Per kategoria audytora, przed i po:

| Kategoria | Obecnie | Po wdrożeniu | Δ |
|---|---:|---:|---:|
| #1 Techniczne SEO | 900 | 935 | +35 |
| #2 Indeksacja | 885 | 920 | +35 |
| #3 Social sharing | 930 | 960 | +30 |
| #4 Performance | 820 | 880 | +60 |
| #5 JS/rendering | 705 | 905 | **+200** |
| #6 Content | 925 | 950 | +25 |
| #7 UX/conversion | 835 | 870 | +35 |
| #8 Accessibility | 690 | 880 | **+190** |
| #9 i18n | 760 | 770 | +10 (real /pl pominęliśmy — Faza 3, oddzielnie) |
| #10 Privacy | 655 | 870 | **+215** |
| **Średnia** | **810** | **894** | **+84** |

**Overall audit score:** 849 → ~920+ (verified via post-deploy script).

---

## CZEGO NIE OBEJMUJE TEN PLAN (świadomie)

- **Real /pl URLs** — to Faza 3 audytora, wymaga osobnego architecture project (1-3 tygodnie). Po tym wdrożeniu i18n będzie 770/920, nie 920/920.
- **Real og-image z Twoim Figma designem** — wymaga Twojej Figma roboty, agent generuje placeholder z brandingiem (już lepszy niż obecny generic placeholder)
- **Pełny manual keyboard-only pass** przez top 7 stron — wymaga human tester (Ty)
- **Legal review polityki prywatności i cookies** — wymaga prawnika, agent draftuje copy z `[NEEDS LEGAL REVIEW]` tagiem

---

## ROZPOCZĘCIE

Aby uruchomić:
1. Confirm decyzje: **consent strict vs soft** (Agent 2 input)
2. Confirm: **prerender plugin choice** (`vite-plugin-prerender-spa` vs `react-snap`) — domyślnie pierwszy
3. Spawn 5 agentów równolegle w 1 wiadomości (Wave 1)
4. Po Agent 1 finishes, spawn Agent 3 (Wave 2)
5. Supervisor merges po Wave 2 zakończeniu
6. Push + monitor live verification

**Total estimated time:** 4-6h vs sekwencyjne 12-16h. **Net speedup: 2.5-3x**.

---

*Plan utworzony 2026-06-05 jako companion do dziennej sesji audytowej. Wersja 1.*
