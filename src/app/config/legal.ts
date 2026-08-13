/**
 * Publication gate for the legal documents (/privacy, /cookies).
 * ---------------------------------------------------------------
 * The copy on both pages was written as a DRAFT and shipped to production with a
 * visible "[DRAFT - needs legal review before publication]" banner. Removing that
 * banner without a real review would imply a legal sign-off that has not happened,
 * so the state is expressed as ONE flag instead:
 *
 *   LEGAL_APPROVED === false  ->  draft banner is shown  +  page is `noindex, follow`
 *   LEGAL_APPROVED === true   ->  banner is gone         +  page is indexable
 *
 * Flip this to `true` ONLY after the owner confirms the open points listed in
 * docs/legal-open-points.md. Nothing else needs to change - the banner and the
 * robots directive are both derived from this single value.
 */
export const LEGAL_APPROVED = false;

/** Routes whose indexability is tied to the legal review above. */
export const LEGAL_ROUTES = ["/privacy", "/cookies"] as const;
