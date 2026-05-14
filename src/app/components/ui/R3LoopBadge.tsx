/**
 * R3LoopBadge — brand mark for the R3LOOP methodology.
 * Rounded pill with lime outline + Tanker (font-display) typography.
 * Used as a logo / wordmark across surfaces: footer, /process hero, sub-product references.
 *
 * Usage:
 *   <R3LoopBadge />           — default medium size
 *   <R3LoopBadge size="sm" /> — small (inline / footer)
 *   <R3LoopBadge size="lg" /> — large (hero / standalone)
 *   <R3LoopBadge tm />        — add TM symbol (opt-in, hidden by default)
 *   <R3LoopBadge variant="solid" /> — filled lime version (invert contexts)
 */

interface R3LoopBadgeProps {
  size?: "sm" | "md" | "lg";
  tm?: boolean;
  variant?: "outline" | "solid";
  className?: string;
}

export function R3LoopBadge({
  size = "md",
  tm = false,
  variant = "outline",
  className = "",
}: R3LoopBadgeProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-[11px] gap-0.5",
    md: "px-4 py-1.5 text-sm gap-0.5",
    lg: "px-5 py-2 text-base gap-1",
  };

  // border-2 (2px) — visually matches Tanker glyph stroke weight better than 1px
  const variantClasses = {
    outline:
      "border-2 border-[#D4FF00] text-[#D4FF00] bg-transparent hover:bg-[#D4FF00]/10",
    solid:
      "border-2 border-[#D4FF00] text-black bg-[#D4FF00] hover:bg-[#D4FF00]/90",
  };

  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "font-display tracking-[0.15em] uppercase leading-none",
        "rounded-full transition-colors duration-300 cursor-default select-none",
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(" ")}
      aria-label="R3LOOP methodology"
    >
      <span>R3LOOP</span>
      {tm && (
        <sup className="text-[0.55em] tracking-normal -mt-1">™</sup>
      )}
    </span>
  );
}
