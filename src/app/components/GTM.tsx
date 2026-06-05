import { useEffect } from 'react';
import { useConsent } from '@/app/context/ConsentContext';

/**
 * GTM — strict opt-in gated container.
 *
 * Google Consent Mode v2:
 *   - On mount, emit consent defaults set to "denied" BEFORE GTM loads.
 *     This ensures any tag inside the container that respects consent mode
 *     will gracefully no-op until the user accepts.
 *   - When status === "accepted":
 *        1. Update consent state to "granted"
 *        2. Inject the GTM script (once)
 *        3. Render the <noscript> iframe
 *   - When status === "denied" or "pending":
 *        - Do nothing (no script injection, no iframe).
 *        - If GTM was previously injected and the user revokes via /cookies,
 *          push a consent "update → denied" so any loaded tags stop tracking.
 *          (We intentionally do NOT try to physically remove the script tag;
 *          Consent Mode is the supported revocation path.)
 *
 * GTM ID (GTM-M2GDLHZ8) is unchanged from the previous always-on version.
 */

const GTM_ID = 'GTM-M2GDLHZ8';

type WindowWithDataLayer = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function ensureGtag(): (...args: unknown[]) => void {
  const w = window as WindowWithDataLayer;
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    w.gtag = function gtag(...args: unknown[]) {
      (w.dataLayer as unknown[]).push(args);
    };
  }
  return w.gtag;
}

export const GTM = () => {
  const { status } = useConsent();

  // 1. Consent Mode v2 defaults — emit as early as possible, regardless of status.
  //    Must run BEFORE any GTM/gtag tag is injected to take effect.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gtag = ensureGtag();
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500,
    });
  }, []);

  // 2. React to status changes — inject GTM on accept, revoke on deny.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const gtag = ensureGtag();

    if (status === 'accepted') {
      // Grant analytics, then load GTM if not already loaded
      gtag('consent', 'update', {
        analytics_storage: 'granted',
      });

      if (!document.getElementById('gtm-script')) {
        const script = document.createElement('script');
        script.id = 'gtm-script';
        script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;
        document.head.insertBefore(script, document.head.firstChild);
      }
      return;
    }

    // status === "denied" or "pending"
    // If GTM was previously injected (user accepted then revoked in same session),
    // signal denial to Consent-Mode-aware tags. Container itself stays loaded
    // for the rest of the session — Consent Mode is the supported revocation path.
    if (document.getElementById('gtm-script')) {
      gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }
  }, [status]);

  // Only render the <noscript> iframe when the user has accepted.
  // Without consent, even the no-JS fallback should not fire.
  if (status !== 'accepted') return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
        title="GTM"
      />
    </noscript>
  );
};
