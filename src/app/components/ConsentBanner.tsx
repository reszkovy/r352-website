import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'wouter';
import { useConsent } from '@/app/context/ConsentContext';
import { useLanguage } from '@/app/context/LanguageContext';

/**
 * ConsentBanner — bottom-fixed strict opt-in cookie banner.
 *
 * Renders only when consent status is "pending". Two explicit choices:
 *   - "Accept all"   → enables GTM and any future analytics tags
 *   - "Necessary only" → keeps GTM off (default behavior)
 *
 * Links to /privacy and /cookies for full disclosure + granular control.
 *
 * z-index sits at 9999 — above page content but below PageTransition
 * overlays (10000+) so route changes don't paint over the banner mid-sweep.
 *
 * Reduced motion: skip slide-up animation entirely.
 */
export function ConsentBanner() {
  const { status, accept, deny } = useConsent();
  const { t } = useLanguage();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    }
    // Safari < 14 fallback
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  // Slide motion config — different physics for enter vs exit:
  //  - Enter: spring with slight overshoot for premium "settling" feel
  //    (stiffness 80 + damping 16 = ~700ms with subtle bounce at end)
  //  - Exit: clean tween, no spring, slightly faster — feels responsive
  //    to user action (button click → banner gets out of the way)
  // Reduced motion: instant snap, no animation at all.
  const motionInitial = reducedMotion
    ? { y: 0, opacity: 1 }
    : { y: '110%', opacity: 0 };
  const motionAnimate = reducedMotion
    ? { y: 0, opacity: 1, transition: { duration: 0 } }
    : {
        y: 0,
        opacity: 1,
        transition: {
          y: { type: 'spring', stiffness: 80, damping: 16, mass: 0.9, delay: 0.3 },
          opacity: { duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
        },
      };
  const motionExit = reducedMotion
    ? { y: 0, opacity: 1, transition: { duration: 0 } }
    : {
        y: '110%',
        opacity: 0,
        transition: {
          y: { duration: 0.55, ease: [0.55, 0, 0.35, 1] },
          opacity: { duration: 0.4, ease: [0.55, 0, 0.35, 1], delay: 0.05 },
        },
      };

  // Critical: AnimatePresence must wrap the CONDITIONAL render, not the other
  // way around. If we exit before AnimatePresence (return null pre-AP), exit
  // animation never plays — the parent just unmounts instantly. This pattern
  // keeps AP mounted always; banner mounts/unmounts inside it.
  return (
    <AnimatePresence mode="wait">
      {status === 'pending' && (
        // role="region" (not "dialog") — the banner never traps or moves
        // focus, so dialog semantics would be misleading to AT users. A
        // labelled region is discoverable via landmark navigation instead.
        <motion.div
          key="consent-banner"
          role="region"
          aria-label={t('consent.banner.title')}
          aria-live="polite"
          initial={motionInitial}
          animate={motionAnimate}
          exit={motionExit}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0A0A0A] border-t border-white/10 text-white shadow-[0_-12px_40px_rgba(0,0,0,0.6)] will-change-transform"
          style={{ transformOrigin: 'bottom center' }}
          data-no-cursor-fx="true"
        >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 md:py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-display uppercase tracking-widest text-[#D4FF00] mb-2">
              {t('consent.banner.title')}
            </p>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-[760px]">
              {t('consent.banner.body')}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-xs md:text-sm">
              <Link
                href="/cookies"
                className="text-neutral-400 hover:text-[#D4FF00] underline underline-offset-4 decoration-white/20 hover:decoration-[#D4FF00] transition-colors duration-300"
              >
                {t('consent.banner.preferences')}
              </Link>
              <Link
                href="/privacy"
                className="text-neutral-400 hover:text-[#D4FF00] underline underline-offset-4 decoration-white/20 hover:decoration-[#D4FF00] transition-colors duration-300"
              >
                {t('consent.banner.privacy')}
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 shrink-0">
            <button
              type="button"
              onClick={deny}
              className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 bg-transparent text-white border border-white/30 hover:border-white/70 hover:bg-white/[0.04] transition-all duration-300 ease-out cursor-pointer whitespace-nowrap"
            >
              <span className="text-xs md:text-sm font-display uppercase tracking-widest">
                {t('consent.banner.deny')}
              </span>
            </button>

            <button
              type="button"
              onClick={accept}
              className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 bg-[#D4FF00] text-black hover:bg-white transition-all duration-300 ease-out cursor-pointer whitespace-nowrap"
            >
              <span className="text-xs md:text-sm font-display uppercase tracking-widest font-medium">
                {t('consent.banner.accept')}
              </span>
            </button>
          </div>
        </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
