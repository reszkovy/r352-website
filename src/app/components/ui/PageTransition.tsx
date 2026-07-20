import { motion } from "motion/react";
import { ReactNode, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { useTheme } from "@/app/context/ThemeContext";
import { R352Symbol } from "@/app/components/agency/R352Logo";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import {
  getCurrentDirection,
  getSweepProps,
  getBrandingClipPath,
  getDepthScrim,
  type TransitionDirection,
} from "@/app/utils/transitionDirection";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// ─── Transition sound (singleton, reused across mounts) ──────────────
// Browsers block autoplay before any user gesture, so the very first
// page load is silent - every subsequent navigation (which IS a gesture)
// triggers the sound. .catch() swallows the autoplay-policy rejection.
let transitionAudio: HTMLAudioElement | null = null;
if (typeof window !== "undefined") {
  // MP3 (48KB VBR) replaces the original 928KB WAV - eagerly preloaded on first
  // paint, so the lossless PCM was a heavy, pointless cost for a 5s whoosh played
  // at volume 0.4. Perceptually identical, 95% smaller. (QA 2026-06-21)
  transitionAudio = new Audio("/sounds/transition-ltr.mp3");
  transitionAudio.volume = 0.4;
  transitionAudio.preload = "auto";
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const lenis = useLenis();
  const { theme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Direction follows the deterministic cycle in transitionDirection utility.
  // We snapshot it at first render via useRef so the outgoing exit and
  // incoming entry of a single navigation share the same direction.
  const directionRef = useRef<TransitionDirection | null>(null);
  if (directionRef.current === null) {
    directionRef.current = getCurrentDirection();
  }
  const direction = directionRef.current;
  const sweep = getSweepProps(direction);
  const branding = getBrandingClipPath(direction);

  // Trigger transition sound on every page mount
  useEffect(() => {
    if (transitionAudio) {
      transitionAudio.currentTime = 0;
      transitionAudio.play().catch(() => {
        // Ignore autoplay-policy rejection on first load
      });
    }
  }, []);

  // After the page transition animation completes, force Lenis to recalculate
  useEffect(() => {
    if (lenis) {
      // Resize immediately
      lenis.resize();
      // And again after animation likely completes
      const timer = setTimeout(() => {
        lenis.resize();
      }, 1200); // Accounts for sweep delay + enter animation
      return () => clearTimeout(timer);
    }
  }, [lenis]);

  // Reduced-motion: collapse all sweep + content wrapper animations to zero duration
  // so user sees the destination page immediately without cinematic overlays.
  const sweepAnimateTransition = reduced
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 };
  const sweepExitTransition = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.76, 0, 0.24, 1] };
  const sweep2AnimateTransition = reduced
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 };
  const sweep2ExitTransition = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 };
  const brandingAnimateTransition = reduced
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 };
  const brandingExitTransition = reduced
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 };

  // isVertical still gates the depth scrim (vertical mobile navigations only).
  const isVertical =
    direction === "top-to-bottom" || direction === "bottom-to-top";

  // ─── Content wrapper: OPACITY ONLY, no transform ────────────────────
  // The page content used to slide/scale/tilt in via transform. Framer keeps
  // the final transform inline (e.g. "translateY(0) scale(1)"), which turns
  // this wrapper into a CSS containing block. Any fixed/sticky descendant
  // (WebGL hero canvas, Peak/Warp backdrops, pinned case-study video) then
  // positions against THIS wrapper instead of the viewport. Clearing the
  // transform on animation-complete snapped those descendants back to
  // viewport coordinates in a single frame - the "pixel jump" seen on some
  // pages (the ones with fixed/sticky children) but not others.
  //
  // Fading only (no transform) means no containing block is ever created, so
  // fixed/sticky descendants stay viewport-relative throughout and the whole
  // failure class is gone. The cinematic sweep + branding reveal carry the
  // motion; the content simply fades up as the sweep peels away. The
  // onAnimationComplete transform-clearing hack is no longer needed.
  const wrapperInitial = reduced ? { opacity: 1 } : { opacity: 0 };
  const wrapperAnimate = reduced
    ? { opacity: 1, transition: { duration: 0 } }
    : { opacity: 1, transition: { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] } };
  const wrapperExit = reduced
    ? { opacity: 1, transition: { duration: 0 } }
    : { opacity: 0.3, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } };

  return (
    <>
      {/* Depth scrim - directional shadow on the OUTGOING page (vertical only).
          Sits just below the sweeps; deepens toward the edge the sweep enters
          from, so the sweep reads as a physical layer sliding OVER the page.
          Fades in during exit, and the incoming page mounts WITH it visible,
          fading out as the sweep peels away - exit and enter interlock, no gap. */}
      {isVertical && (
        <motion.div
          aria-hidden
          className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[9997] pointer-events-none"
          style={{ background: getDepthScrim(direction) }}
          initial={{ opacity: reduced ? 0 : 1 }}
          animate={{
            opacity: 0,
            transition: reduced
              ? { duration: 0 }
              : { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
          }}
          exit={{
            opacity: reduced ? 0 : 1,
            transition: reduced
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
        />
      )}

      {/* Cinematic Transition Overlay - Lime Accent */}
      <motion.div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#D4FF00]/90 z-[9998] pointer-events-none will-change-transform"
        initial={sweep.initial}
        animate={{
          ...sweep.animate,
          transition: sweepAnimateTransition
        }}
        exit={{
          ...sweep.exit,
          transition: sweepExitTransition
        }}
      />

      {/* Cinematic Transition Overlay - Main Black Sweep */}
      <motion.div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] ${theme === 'dark' ? 'bg-[#0A0A0A]/95' : 'bg-[#F1F6FA]/95'} z-[9999] pointer-events-none will-change-transform`}
        initial={sweep.initial}
        animate={{
          ...sweep.animate,
          transition: sweep2AnimateTransition
        }}
        exit={{
          ...sweep.exit,
          transition: sweep2ExitTransition
        }}
      />

      {/* Static branding - stays perfectly still, revealed/concealed by sweep via clipPath */}
      <motion.div
        className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center"
        initial={{ clipPath: branding.initial }}
        animate={{
          clipPath: branding.animate,
          transition: brandingAnimateTransition
        }}
        exit={{
          clipPath: branding.exit,
          transition: brandingExitTransition
        }}
      >
        <div className="flex flex-col items-center gap-5">
          <R352Symbol className="w-7 h-7 md:w-9 md:h-9" color="#D4FF00" />
          <span className="text-[11px] md:text-sm font-display uppercase tracking-[0.3em] text-[#D4FF00]/80">
            Move fast, steady cadence.
          </span>
        </div>
      </motion.div>

      {/* Opacity-only wrapper: no inline transform is ever left behind, so it
          never becomes a containing block and fixed/sticky descendants stay
          viewport-relative. The old onAnimationComplete transform-clearing
          hack (and the jump it caused) is gone with it. */}
      <motion.div
        ref={wrapperRef}
        initial={wrapperInitial}
        animate={wrapperAnimate}
        exit={wrapperExit}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}