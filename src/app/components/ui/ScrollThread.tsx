import { motion, useScroll, useSpring } from "motion/react";

/**
 * ScrollThread - thin lime lines down BOTH edges that draw as the page scrolls.
 * A quiet "this is one designed system" signal that frames every page (and the
 * scroll-progress indicator now that the native scrollbar is hidden). Spring-
 * smoothed, soft glow, hidden on mobile to stay clean.
 */
export function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <>
      {(["left-0", "right-0"] as const).map((side) => (
        <div
          key={side}
          className={`fixed ${side} top-0 bottom-0 w-px z-40 pointer-events-none hidden md:block`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-white/[0.06]" />
          <motion.div
            style={{ scaleY }}
            className="absolute inset-0 origin-top bg-[#D4FF00] shadow-[0_0_14px_2px_rgba(212,255,0,0.45)]"
          />
        </div>
      ))}
    </>
  );
}
