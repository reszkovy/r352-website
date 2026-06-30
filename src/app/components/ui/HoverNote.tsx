import { ReactNode, useId } from "react";

/**
 * HoverNote - a header/trigger that reveals an annotation ("przypis") on hover or
 * focus, styled like the home ATF ChipTooltip popover (dark glass card, lime
 * hairline accent). Shows only the title by default - the detail lives in the
 * note, so dense text blocks become clean, interactive editorial elements.
 *
 * Tooltip stays in the DOM (opacity/visibility toggle) so prerendered HTML keeps
 * the full text for SEO. Keyboard + touch reach it via group-focus-within.
 */
export function HoverNote({
  children,
  note,
  className = "",
  noteClassName = "",
}: {
  children: ReactNode;
  note: ReactNode;
  className?: string;
  noteClassName?: string;
}) {
  const id = useId();
  return (
    <span className={`group/note relative inline-block ${className}`}>
      <span
        tabIndex={0}
        aria-describedby={id}
        className="inline-flex items-start gap-1.5 cursor-help outline-none text-white transition-colors duration-300 group-hover/note:text-[#D4FF00] group-focus-within/note:text-[#D4FF00]"
      >
        {children}
        {/* footnote marker */}
        <span
          aria-hidden="true"
          className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4FF00]/50 group-hover/note:bg-[#D4FF00] group-focus-within/note:bg-[#D4FF00] transition-colors duration-300"
        />
      </span>

      {/* The note - floating glass card, revealed on hover/focus */}
      <span
        role="tooltip"
        id={id}
        className={`pointer-events-none absolute bottom-full left-0 mb-3 w-max max-w-[300px] z-[60] opacity-0 translate-y-1 invisible group-hover/note:opacity-100 group-hover/note:translate-y-0 group-hover/note:visible group-focus-within/note:opacity-100 group-focus-within/note:translate-y-0 group-focus-within/note:visible transition-all duration-200 ease-out ${noteClassName}`}
      >
        <span className="relative block px-4 py-3 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#D4FF00]/25 rounded-[6px] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6),0_0_24px_-12px_rgba(212,255,0,0.3)]">
          <span aria-hidden="true" className="absolute top-0 left-4 right-4 h-px bg-[#D4FF00]/60" />
          <span className="block text-[12px] leading-relaxed text-neutral-100 normal-case tracking-normal font-sans [text-wrap:balance]">
            {note}
          </span>
        </span>
        <span aria-hidden="true" className="absolute -bottom-[5px] left-8 w-[10px] h-[10px] bg-[#0a0a0a]/90 backdrop-blur-xl border-r border-b border-[#D4FF00]/25 rotate-45" />
      </span>
    </span>
  );
}
