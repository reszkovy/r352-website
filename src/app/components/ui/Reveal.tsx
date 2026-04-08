import { motion, useInView, useAnimation } from "motion/react";
import { useEffect, useRef, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function Reveal({ 
  children, 
  width = "100%", 
  className = "", 
  delay = 0, 
  duration = 1.6,
  yOffset = 80
}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: yOffset, filter: "blur(10px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }} // Ultra smooth easeOutExpo
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
