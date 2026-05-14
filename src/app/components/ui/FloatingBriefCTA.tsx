import { useLocation } from "wouter";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * FloatingBriefCTA — persistent lime "Start a brief" button.
 * Position: fixed bottom-right, sits LEFT of Chatbot icon (which is at right-6 bottom-6).
 * Hides itself on /brief page (don't show CTA when user is already there)
 * and on routes where it would conflict with full-screen modals (e.g. brief-access, limited-access5/*).
 */
export function FloatingBriefCTA() {
  const [location, setLocation] = useLocation();
  const { language } = useLanguage();

  // Routes where the CTA should hide
  const hiddenOn = [
    "/brief",
    "/brief-access",
    "/limitedaccess5",
    "/limitedaccess5/spotkanie",
    "/limitedaccess5/wycena",
  ];
  const shouldHide = hiddenOn.some((r) => location === r || location.startsWith(`${r}/`));

  const label = language === "pl" ? "Wypełnij brief" : "Start a brief";

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setLocation("/brief")}
          aria-label={label}
          className={`
            fixed z-50 group
            bottom-6 right-6 md:right-[88px]
            inline-flex items-center gap-3
            bg-[#D4FF00] text-black
            px-5 py-3 md:px-6 md:py-3.5
            font-display uppercase tracking-widest text-[11px] md:text-xs
            shadow-[0_8px_24px_-8px_rgba(212,255,0,0.5)]
            hover:shadow-[0_12px_36px_-8px_rgba(212,255,0,0.7)]
            hover:bg-white
            transition-all duration-500 ease-out
            cursor-pointer
          `}
        >
          <span className="block w-1.5 h-1.5 rounded-full bg-black animate-pulse" aria-hidden="true" />
          <span>{label}</span>
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">→</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
