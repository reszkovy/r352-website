import { ReactNode, useEffect, useId, useState } from "react";
import { motion } from "motion/react";

/**
 * ChipTooltip - shared premium chip + tooltip pattern (single source of truth).
 *
 * Used by: AgencyHero (audience qualifier chips) and EngagementModels
 * (compressed "how it works" / "ideal when" chips). Previously duplicated
 * inline in both files - extracted here so motion language stays in sync.
 *
 * Motion: cinematic entrance - fade + slide(6px) + scale(0.97) + blur,
 * easing cubic-bezier(0.22, 1, 0.36, 1) (site-wide curve, same as
 * PageTransition / Reveal / MaskedText).
 *
 * IMPORTANT - DOM visibility contract:
 * The tooltip content is ALWAYS mounted in the DOM. Open/close is toggled
 * purely via CSS opacity/visibility (motion variants), never via conditional
 * rendering. Prerendered static HTML therefore always contains the full
 * tooltip text - crawlers and evaluators see it without hovering.
 *
 * Accessibility:
 * - trigger is keyboard-focusable (tabIndex=0) and opens on focus
 * - trigger carries aria-describedby pointing at the tooltip's id
 * - tooltip has role="tooltip"
 * - Escape closes the tooltip while focused
 * - Escape ALSO closes a hover-opened tooltip (document-level listener,
 *   WCAG 1.4.13 "dismissable" - keydown never reaches an unfocused chip)
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface ChipTooltipProps {
  /** Short visible chip label (2-3 words). */
  label: ReactNode;
  /** Full qualifier sentence revealed on hover/focus - always in DOM. */
  tooltip: ReactNode;
  /** "neutral" = grey chip (lime on hover) · "lime" = lime accent chip · "clay" = clay/AI accent (#D97757, nod to Claude). */
  variant?: "neutral" | "lime" | "clay";
  /** "md" = hero scale · "sm" = dense card scale. */
  size?: "sm" | "md";
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Extra classes for the floating tooltip (e.g. max-width overrides). */
  tooltipClassName?: string;
}

export function ChipTooltip({
  label,
  tooltip,
  variant = "neutral",
  size = "md",
  className = "",
  tooltipClassName = "",
}: ChipTooltipProps) {
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  // WCAG 1.4.13 (Content on Hover or Focus - dismissable): Escape must close
  // the tooltip even when it was opened by mouse hover and the chip is NOT
  // focused. The trigger's own onKeyDown only covers the focused case, so a
  // document-level listener runs while open.
  useEffect(() => {
    if (!open) return;
    const onDocKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onDocKeyDown);
    return () => document.removeEventListener("keydown", onDocKeyDown);
  }, [open]);

  const isLime = variant === "lime";
  const isClay = variant === "clay";

  // Mobile-safe sizing - chips shrink below 640px (text-[10px]) and wrap
  // naturally inside any flex-wrap parent.
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-[10px]"
      : "px-3 py-1.5 text-[10px] sm:text-[11px]";

  // Resting vs open chip colors - CSS transition handles the crossfade,
  // motion handles the floating tooltip. dark: variants keep this usable
  // on light-surface pages (Services) and dark-surface pages (Home hero).
  const restClasses = isClay
    ? "text-[#D97757] border-[#D97757]/40"
    : isLime
    ? "text-[#D4FF00] border-[#D4FF00]/40"
    : "text-neutral-500 dark:text-neutral-400 border-neutral-400/40 dark:border-white/15";
  const openClasses = isClay
    ? "text-[#D97757] border-[#D97757] bg-[#D97757]/[0.06]"
    : isLime
    ? "text-[#D4FF00] border-[#D4FF00] bg-[#D4FF00]/[0.06]"
    : "text-[#6B8F00] dark:text-[#D4FF00] border-[#D4FF00]";

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Trigger chip - hover, keyboard focus, and Escape supported */}
      <span
        tabIndex={0}
        aria-describedby={tooltipId}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={`
          inline-flex items-center gap-1.5 font-display uppercase tracking-[0.15em]
          border rounded-full cursor-help select-none
          transition-colors duration-300 ease-out outline-none
          focus-visible:ring-1 focus-visible:ring-[#D4FF00]/60 focus-visible:ring-offset-0
          ${sizeClasses} ${open ? openClasses : restClasses}
        `}
      >
        {label}
      </span>

      {/* Tooltip - ALWAYS in the DOM; opacity/visibility toggled via motion.
          visibility flips to hidden only AFTER the exit animation completes
          (transitionEnd) so the close fade stays visible. */}
      <motion.span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[240px] z-[60] ${tooltipClassName}`}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          closed: {
            opacity: 0,
            y: 6,
            scale: 0.97,
            filter: "blur(6px)",
            transitionEnd: { visibility: "hidden" },
          },
          open: {
            visibility: "visible",
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Glass panel - backdrop-blur + low-opacity dark fill, soft drop shadow */}
        <span
          className={`relative block px-4 py-3 bg-[#0a0a0a]/85 backdrop-blur-xl border rounded-[6px] ${
            isLime
              ? "border-[#D4FF00]/25 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6),0_0_24px_-12px_rgba(212,255,0,0.3)]"
              : "border-white/10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]"
          }`}
        >
          {/* Lime hairline accent across the top - solid for lime variant,
              gradient fade for neutral (subtler register) */}
          <span
            aria-hidden="true"
            className={`absolute top-0 left-4 right-4 h-px ${
              isLime
                ? "bg-[#D4FF00]/60"
                : "bg-gradient-to-r from-transparent via-[#D4FF00]/50 to-transparent"
            }`}
          />
          <span className="block text-[11px] leading-relaxed text-neutral-100 normal-case tracking-normal font-sans text-center [text-wrap:balance]">
            {tooltip}
          </span>
          {/* Arrow pointer - rotated square linking tooltip to chip */}
          <span
            aria-hidden="true"
            className={`absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[#0a0a0a]/85 backdrop-blur-xl border-r border-b rotate-45 ${
              isLime ? "border-[#D4FF00]/25" : "border-white/10"
            }`}
          />
        </span>
      </motion.span>
    </span>
  );
}
