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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setLocation("/brief")}
          aria-label={label}
          className={`
            fixed z-50 group
            right-6 bottom-6 md:bottom-[88px]
            inline-flex items-center gap-3
            px-4 py-2.5
            bg-neutral-900/55 dark:bg-neutral-900/60
            backdrop-blur-xl
            border border-white/10
            text-white
            font-display uppercase tracking-[0.18em] text-[11px]
            shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)]
            hover:bg-neutral-900/80 hover:border-[#D4FF00]/40
            transition-all duration-500 ease-out
            cursor-pointer
          `}
        >
          <span>{label}</span>
          <span className="inline-block text-[#D4FF00] group-hover:translate-x-0.5 transition-transform duration-500">→</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
