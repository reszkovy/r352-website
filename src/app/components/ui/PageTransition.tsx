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

  // ─── Direction-aware content choreography ───────────────────────────
  // Vertical navigations get a dedicated motion language matching the
  // horizontal one in class: perspective "page-flip" tilt on the X axis
  // (horizontal tilts on Y feel via lateral travel), a vertical motion-blur
  // smear (gaussian blur + anisotropic scaleY stretch), and parallax between
  // the exiting and entering layer (exit drifts 28px WITH the sweep flow,
  // entry arrives from 44px against it - outgoing moves slower than incoming,
  // reading as depth). Timing/easing identical to horizontal so the compass
  // cycle feels like one system.
  const isVertical =
    direction === "top-to-bottom" || direction === "bottom-to-top";
  // +1 = flow travels downward, -1 = upward (matches sweep travel direction)
  const flow = direction === "top-to-bottom" ? 1 : -1;

  // Content wrapper: when reduced, start at final state (no blur/tilt/y) and skip transition.
  const wrapperInitial = reduced
    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
    : isVertical
      ? {
          // Incoming page rides IN with the flow: enters from the edge the
          // sweep came from, tilted back in perspective, vertically smeared.
          opacity: 0,
          y: -44 * flow,
          rotateX: 7 * flow,
          scaleY: 1.04,
          scaleX: 0.99,
          transformPerspective: 1200,
          filter: "blur(24px)",
        }
      : { opacity: 0, y: 30, scale: 0.98, filter: "blur(24px)" };
  const wrapperAnimate = reduced
    ? {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0 }
      }
    : isVertical
      ? {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scaleY: 1,
          scaleX: 1,
          transformPerspective: 1200,
          filter: "blur(0px)",
          transition: {
            duration: 0.9,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] // Same Apple-like decel as horizontal
          }
        }
      : {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          duration: 0.9,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1] // Apple-like smooth decel
        }
      };
  const wrapperExit = reduced
    ? {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0 }
      }
    : isVertical
      ? {
          // Outgoing page is "flipped away": counter-tilt to the incoming
          // page's tilt (reads as one continuous rotation through the swap),
          // slow parallax drift with the flow, vertical smear + blur.
          opacity: 0.3,
          y: 28 * flow,
          rotateX: -7 * flow,
          scaleY: 1.03,
          scaleX: 0.99,
          transformPerspective: 1200,
          filter: "blur(20px)",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] // Synced with sweep
          }
        }
      : {
        opacity: 0.3,
        y: -20,
        scale: 0.95,
        filter: "blur(20px)",
        transition: {
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1] // Synced with sweep
        }
      };

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
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#D4FF00]/90 backdrop-blur-2xl z-[9998] pointer-events-none"
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
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] ${theme === 'dark' ? 'bg-[#0A0A0A]/90' : 'bg-[#D0DBE1]/90'} backdrop-blur-3xl z-[9999] pointer-events-none`}
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
            design operations
          </span>
        </div>
      </motion.div>

      <motion.div
        ref={wrapperRef}
        initial={wrapperInitial}
        animate={wrapperAnimate}
        exit={wrapperExit}
        onAnimationComplete={(definition) => {
          // After entry animation completes, clear inline transform/filter from this wrapper.
          // Framer keeps "transform: scale(1) translateY(0); filter: blur(0px)" applied inline,
          // which creates a new CSS containing block and BREAKS position: sticky on descendants
          // (sticky binds to this wrapper instead of viewport → no pin → 100vh gap below video).
          // Clearing the inline styles restores viewport-relative sticky for descendants.
          if (typeof definition === "object" && definition !== null && "opacity" in definition && (definition as { opacity?: number }).opacity === 1) {
            const el = wrapperRef.current;
            if (el) {
              el.style.transform = "";
              el.style.filter = "";
              el.style.willChange = "";
            }
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}