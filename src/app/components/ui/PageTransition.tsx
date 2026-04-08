import { motion } from "motion/react";
import { ReactNode, useEffect } from "react";
import { useLenis } from "lenis/react";
import { useTheme } from "@/app/context/ThemeContext";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  const lenis = useLenis();
  const { theme } = useTheme();

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

  return (
    <>
      {/* Cinematic Transition Overlay - Lime Accent */}
      <motion.div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#D4FF00]/90 backdrop-blur-2xl z-[9998] pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ 
          y: "-100%", 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.15 } 
        }}
        exit={{ 
          y: ["100%", "0%"], 
          transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } 
        }}
      />
      
      {/* Cinematic Transition Overlay - Main Black Sweep */}
      <motion.div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] ${theme === 'dark' ? 'bg-[#0A0A0A]/90' : 'bg-[#D0DBE1]/90'} backdrop-blur-3xl z-[9999] pointer-events-none`}
        initial={{ y: "0%" }}
        animate={{ 
          y: "-100%", 
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 } 
        }}
        exit={{ 
          y: ["100%", "0%"], 
          transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 } 
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(24px)" }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)",
          transition: {
            duration: 0.9,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] // Apple-like smooth decel
          }
        }}
        exit={{ 
          opacity: 0.3, 
          y: -20, 
          scale: 0.95, 
          filter: "blur(20px)",
          transition: {
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1] // Synced with sweep
          }
        }}
        className={className}
      >
        {children}
      </motion.div>
    </>
  );
}