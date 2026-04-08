import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('dark'); // default dark
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<ThemeMode | null>(null);

  const toggleTheme = () => {
    if (isTransitioning) return;
    
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTargetTheme(nextTheme);
    setIsTransitioning(true);
    
    // Wait for sweep to fully cover screen (0.8s based on PageTransition timing)
    setTimeout(() => {
      setTheme(nextTheme);
    }, 700);
    
    // Remove sweep completely
    setTimeout(() => {
      setIsTransitioning(false);
      setTargetTheme(null);
    }, 1500); // 700ms in + pause + out
  };

  useEffect(() => {
    // Apply global-light-mode class when in light mode
    if (theme === 'light') {
      document.body.classList.add('global-light-mode');
    } else {
      document.body.classList.remove('global-light-mode');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      
      {/* Theme Transition Overlays - matches PageTransition.tsx */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Cinematic Transition Overlay - Lime Accent */}
            <motion.div
              className="fixed top-0 left-0 w-full h-[100vh] bg-[#D4FF00]/90 backdrop-blur-2xl z-[99998] pointer-events-none"
              initial={{ y: "100%" }}
              animate={{ 
                y: "0%", 
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
              }}
              exit={{ 
                y: "-100%", 
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 } 
              }}
            />
            
            {/* Cinematic Transition Overlay - Main Background Sweep */}
            <motion.div
              className={`fixed top-0 left-0 w-full h-[100vh] ${targetTheme === 'dark' ? 'bg-[#0A0A0A]/90' : 'bg-[#D0DBE1]/90'} backdrop-blur-3xl z-[99999] pointer-events-none`}
              initial={{ y: "100%" }}
              animate={{ 
                y: "0%", 
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } 
              }}
              exit={{ 
                y: "-100%", 
                transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 } 
              }}
            />
          </>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}

const defaultContext: ThemeContextType = {
  theme: 'dark',
  toggleTheme: () => console.warn('toggleTheme called outside of ThemeProvider'),
  isTransitioning: false,
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    return defaultContext;
  }
  return context;
}
