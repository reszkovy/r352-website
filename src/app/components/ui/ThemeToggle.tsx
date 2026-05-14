import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

/**
 * Small inline theme toggle — designed to sit in nav header next to the language switcher.
 * Matches the visual weight of the lang toggle (EN/PL): small, low-contrast in resting state, hover lime accent.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="ml-3 inline-flex items-center justify-center w-7 h-7 text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
