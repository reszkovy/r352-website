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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setLocation("/brief")}
          aria-label={label}
          className={`
            fixed z-50 group
            bottom-6 right-6 md:right-[88px]
            inline-flex items-center gap-2.5
            bg-[#D4FF00] text-black
            px-4 py-2.5
            font-display uppercase tracking-[0.18em] text-[11px]
            shadow-[0_4px_12px_-4px_rgba(0,0,0,0.15)]
            hover:bg-white
            transition-colors duration-500 ease-out
            cursor-pointer
          `}
        >
          <span>{label}</span>
          <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-500">→</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
