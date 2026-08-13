/**
 * plRoutes.ts - THE single source of truth for the Polish URL layer.
 * -------------------------------------------------------------------
 * WHY THIS EXISTS: the full Polish copy already lives in i18n/translations.ts,
 * but until now it had no URLs of its own - it sat behind a client-side toggle
 * on the SAME address as the English page. Google cannot index and rank two
 * language versions of one URL; one always loses, and the losing one was Polish
 * (title, description and og:locale were English). Search Console for the 90
 * days to 2026-08-10 shows the result: 145 impressions, 5 clicks, 7 queries -
 * every one of them the brand name, a typo of it, or a client's name. Zero
 * non-brand demand captured, in either language.
 *
 * SCOPE IS DELIBERATELY SMALL. We do NOT mirror all 34 English routes. A page
 * enters this list only if it answers a Polish buying intent or is proof needed
 * to make that decision. Translating the journal, the glossary or careers would
 * add pages with no purchase intent to a domain Google already declines to
 * index ("Discovered - currently not indexed" on 13 of 14 pages) - more thin
 * URLs is the opposite of the fix.
 *
 * SLUGS ARE POLISH, not transliterated English routes: the slug should match
 * the words a Polish buyer would type. They are frozen once shipped - changing
 * a slug later costs a redirect and splits the signals it had accumulated.
 *
 * Consumed by:
 *   - App.tsx                     (routing)
 *   - LanguageContext.tsx         (URL decides the language, not localStorage)
 *   - SEO.tsx                     (self-canonical + reciprocal hreflang)
 *   - scripts/route-registry.mjs  (allowlist, sitemap, prerender, crawl)
 */

export interface PlRoute {
  /** Polish URL. Frozen once shipped. */
  pl: string;
  /** English twin. Both directions of the hreflang pair are derived from this. */
  en: string;
}

/**
 * Phase 1 - the commercial core. Eight routes.
 *
 * Phase 2 (retail/franczyza, sieci medyczne, 2-3 case studies) waits for data,
 * not for enthusiasm: 4-6 weeks of Search Console on these eight first.
 */
export const PL_ROUTES: readonly PlRoute[] = [
  { pl: "/pl", en: "/" },
  { pl: "/pl/uslugi", en: "/services" },
  { pl: "/pl/proces", en: "/process" },
  { pl: "/pl/realizacje", en: "/work" },
  { pl: "/pl/kontakt", en: "/contact" },
  { pl: "/pl/brief", en: "/brief" },
  { pl: "/pl/branze/fitness-wellness", en: "/industries/fitness-wellness" },
  { pl: "/pl/branze/nieruchomosci", en: "/industries/real-estate" },
] as const;

/** Normalise a pathname for lookups: strip a trailing slash, keep "/" intact. */
export const normalizePath = (p: string): string =>
  p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;

/** Is this a Polish URL? Prefix match so future /pl/* routes are covered too. */
export const isPlPath = (p: string): boolean => {
  const n = normalizePath(p);
  return n === "/pl" || n.startsWith("/pl/");
};

/** English twin of a Polish URL, or null when there is none. */
export const enTwinOf = (plPath: string): string | null =>
  PL_ROUTES.find((r) => r.pl === normalizePath(plPath))?.en ?? null;

/** Polish twin of an English URL, or null when there is none. */
export const plTwinOf = (enPath: string): string | null =>
  PL_ROUTES.find((r) => r.en === normalizePath(enPath))?.pl ?? null;

/**
 * The twin in the other language, or null. Used both for hreflang (which must
 * never claim a page that does not exist) and for the language switcher, which
 * should navigate to the counterpart rather than reload the same content.
 */
export const twinOf = (path: string): string | null =>
  isPlPath(path) ? enTwinOf(path) : plTwinOf(path);
