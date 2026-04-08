import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: theme === 'dark' 
          ? "0 0 25px rgba(255,255,255,0.2)" 
          : "0 0 25px rgba(0,0,0,0.2)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={cn(
        "fixed right-6 z-40 w-14 h-14 rounded-full hidden md:flex items-center justify-center transition-colors duration-300 shadow-lg border",
        "bottom-6 md:bottom-[96px]", // Bottom on mobile, above chat on desktop
        theme === 'dark' 
          ? "bg-[#111] text-white border-white/10 hover:bg-[#222]" 
          : "bg-[#D0DBE1] text-black border-black/10 hover:bg-[#c2ced5]"
      )}
      aria-label="Toggle Theme"
      data-no-cursor-fx="true"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-white" />
      ) : (
        <Moon className="w-6 h-6 text-black" />
      )}
    </motion.button>
  );
}
