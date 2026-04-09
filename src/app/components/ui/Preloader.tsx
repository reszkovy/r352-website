import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { R352Symbol } from "@/app/components/agency/R352Logo";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Short hold — just enough to see the branding, then sweep away
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 1200); // Wait for exit animation to complete
    }, 1400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Cinematic Transition Overlay - Lime Accent */}
          <motion.div
            key="preloader-lime"
            className="fixed top-0 left-0 w-full h-[100vh] bg-[#D4FF00]/90 backdrop-blur-2xl z-[9998] pointer-events-none"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 }
            }}
          />

          {/* Cinematic Transition Overlay - Main Dark Sweep */}
          <motion.div
            key="preloader-dark"
            className="fixed top-0 left-0 w-full h-[100vh] bg-[#0A0A0A]/90 backdrop-blur-3xl z-[9999] pointer-events-none"
            initial={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }
            }}
          />

          {/* Static branding — revealed/concealed by sweep via clipPath */}
          <motion.div
            key="preloader-branding"
            className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }
            }}
          >
            <div className="flex flex-col items-center gap-5">
              <R352Symbol className="w-7 h-7 md:w-9 md:h-9" color="#D4FF00" />
              <span className="text-[11px] md:text-sm font-display uppercase tracking-[0.3em] text-[#D4FF00]/80">
                your design partner
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
