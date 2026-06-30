import { motion, useScroll, useSpring } from "motion/react";

/**
 * ScrollThread - a thin lime line down the left edge that draws as the page
 * scrolls. A quiet "this is one designed system" signal that ties every section
 * together. Spring-smoothed, soft glow, hidden on mobile to stay clean.
 */
export function ScrollThread() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="fixed left-0 top-0 bottom-0 w-px z-40 pointer-events-none hidden md:block" aria-hidden="true">
      <div className="absolute inset-0 bg-white/[0.06]" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-[#D4FF00] shadow-[0_0_14px_2px_rgba(212,255,0,0.45)]"
      />
    </div>
  );
}
