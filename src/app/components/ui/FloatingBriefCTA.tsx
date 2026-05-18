import { useLocation } from "wouter";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useScrollStarted } from "@/app/hooks/useScrollStarted";
import { ArrowRight } from "lucide-react";

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
  // Gate visibility on scroll — CTA stays hidden at top of page, slides up from
  // bottom once visitor commits to scrolling. Removes the "popup" feel.
  const scrollStarted = useScrollStarted();

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
      {!shouldHide && scrollStarted && (
        <motion.button
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 32 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => {
            try { (window as any).plausible?.("brief_cta_clicked", { props: { source: "floating" } }); } catch { /* noop */ }
            setLocation("/brief");
          }}
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
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          <span>{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
