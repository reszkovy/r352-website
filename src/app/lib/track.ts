/**
 * track - single funnel-event entry point.
 *
 * History: components fired `window.plausible?.(...)` directly, but the
 * Plausible script was never loaded anywhere, so every event was a silent
 * no-op. GTM (GTM-M2GDLHZ8, strict consent gating in GTM.tsx) is the real
 * analytics backbone.
 *
 * This helper:
 *   1. pushes `{ event, ...props }` to the GTM dataLayer - safe pre-consent
 *      (the array exists but nothing processes it until the user accepts),
 *   2. still calls window.plausible if it ever gets loaded.
 *
 * GTM container mapping (one-time, in the GTM UI):
 *   - Custom Event triggers for: brief_view, brief_submitted,
 *     brief_cta_clicked, mail_clicked, calendly_clicked,
 *     playbook_waitlist_signup
 *   - One GA4 event tag per trigger (or a single tag with {{Event}} name),
 *     forwarding the `source` dataLayer variable as an event parameter.
 */
type TrackProps = Record<string, string | number | boolean>;

export function track(event: string, props?: TrackProps) {
  try {
    const w = window as Window & {
      dataLayer?: unknown[];
      plausible?: (e: string, opts?: { props?: TrackProps }) => void;
    };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...(props ?? {}) });
    w.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* analytics must never break the page */
  }
}
