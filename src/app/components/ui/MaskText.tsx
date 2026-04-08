import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

export function MaskText({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: "100%" }}
          animate={isInView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay }}
        >
          {children}
        </motion.div>
    </div>
  );
}
