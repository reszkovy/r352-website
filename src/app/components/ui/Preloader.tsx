import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { R352Symbol } from "@/app/components/agency/R352Logo";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Fake progress simulation for cinematic effect
    const duration = 2200; // 2.2 seconds total loading time
    const intervalTime = 20; // ms per frame
    const totalFrames = duration / intervalTime;
    let currentFrame = 0;

    const interval = setInterval(() => {
      currentFrame++;
      // Easing function for progress (starts fast, slows down at the end)
      const easeOutExpo = (x: number): number => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      
      const newProgress = Math.min(Math.round(easeOutExpo(currentFrame / totalFrames) * 100), 100);
      setProgress(newProgress);

      if (currentFrame >= totalFrames) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => {
            document.body.style.overflow = "";
          }, 1200); // Wait for exit animation to complete
        }, 400); // Small pause at 100%
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: "-100%",
            transition: { 
              duration: 1.2, 
              ease: [0.83, 0, 0.17, 1] // Custom cinematic cubic-bezier
            }
          }}
          className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center pointer-events-none origin-top"
        >
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center gap-10 md:gap-14">
            {/* Number moving up */}
            <motion.div 
              initial={{ y: 30 }}
              animate={{ y: -30 }}
              exit={{ 
                y: -120,
                opacity: 0,
                transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.1 }
              }}
              transition={{ duration: 2.5, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ 
                  filter: "blur(10px)",
                  transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0.1 }
                }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                className="text-[#D4FF00] font-sans font-medium text-8xl md:text-[10rem] leading-[0.85] tracking-[-0.02em] flex items-baseline"
              >
                {progress}
              </motion.div>
            </motion.div>

            {/* Static Logo placed below */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ 
                y: -60,
                opacity: 0,
                scale: 0.85,
                filter: "blur(5px)",
                transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1], delay: 0 }
              }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
               <R352Symbol className="w-5 h-5 md:w-6 md:h-6 opacity-80" color="#D4FF00" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
