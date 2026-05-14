import { useLocation } from "wouter";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * FloatingBriefCTA — persistent frosted-glass pill linking to /brief.
 * Position: fixed bottom-right.
 *  - Mobile: bottom-6 right-6 (alone — chat icon is hidden on mobile).
 *  - Desktop: ABOVE the chat icon at bottom-[88px] right-6 (vertical stack, right-aligned).
 * Style: translucent dark glass with backdrop-blur (premium Linear/Stripe pattern), no heavy fill.
 * Hides itself on /brief and conflicting full-screen routes.
 */
export function FloatingBriefCTA() {
  const [location, setLocation] = useLocation();
  const { language } = useLanguage();

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
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setLocation("/brief")}
          aria-label={label}
          className={`
            fixed z-50 group
            bottom-6 right-6 md:bottom-[42px] md:right-[112px]
            inline-flex items-center gap-3
            text-[#D4FF00]
            font-display uppercase tracking-[0.2em] text-[13px]
            hover:text-white
            transition-colors duration-300
            cursor-pointer
            [text-shadow:0_0_16px_rgba(0,0,0,0.5)]
          `}
        >
          <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
          <span>{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
