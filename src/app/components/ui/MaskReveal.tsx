import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

/**
 * MaskReveal - editorial "wipe up from behind a mask" reveal. The child slides up
 * from below a clipping container as it enters the viewport, instead of a plain
 * fade. This is the crafted-motion signal premium/agency eyes read as "designed".
 *
 * IMPORTANT: in-view is observed on the STABLE outer container (useInView on the
 * ref), not on the transformed inner span - the inner starts translated down by
 * 115% (off-mask), so observing it directly would keep it permanently out of view
 * and the text would never reveal. Observing the outer fixes that.
 *
 * Bottom padding + matching negative margin give descenders (g/y/p) room inside
 * the mask without changing layout.
 */
export function MaskReveal({
  children,
  delay = 0,
  duration = 0.85,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block pb-[0.14em] -mb-[0.14em] will-change-transform"
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : { y: "115%" }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
