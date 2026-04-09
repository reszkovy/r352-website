import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { R352Symbol } from "@/app/components/agency/R352Logo";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  // Once AnimatePresence finishes all exit animations, fully remove from DOM
  const handleExitComplete = () => {
    setIsDone(true);
    document.body.style.overflow = "";
  };

  if (isDone) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isLoading && (
        <motion.div
          key="preloader-wrapper"
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.1, delay: 0.85 }
          }}
        >
          {/* Cinematic Transition Overlay - Lime Accent */}
          <motion.div
            className="absolute inset-0 bg-[#D4FF00]/90 backdrop-blur-2xl z-[1]"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.12 }
            }}
          />

          {/* Cinematic Transition Overlay - Main Dark Sweep */}
          <motion.div
            className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-3xl z-[2]"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.04 }
            }}
          />

          {/* Static branding — revealed/concealed by sweep via clipPath */}
          <motion.div
            className="absolute inset-0 z-[3] flex items-center justify-center"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.04 }
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <R352Symbol className="w-7 h-7 md:w-9 md:h-9" color="#D4FF00" />
              <span className="text-[11px] md:text-sm font-display uppercase tracking-[0.3em] text-[#D4FF00]/80">
                your design partner
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
