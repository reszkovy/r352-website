import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionWatermarkProps {
  /** The watermark number to display, e.g. "01", "02", "03". */
  number: string;
  /** Optional secondary label rendered above the number, e.g. "BRAND OPS". */
  label?: string;
  /** Section content. */
  children: React.ReactNode;
  /** Override default tailwind for the wrapper. */
  className?: string;
  /** Position the number on the left or right edge. Default: "right". */
  align?: "left" | "right";
}

/**
 * Editorial watermark — giant Tanker number sitting behind a section,
 * scroll-linked to the section's viewport progress. Provides typographic
 * signature without adding decoration noise.
 *
 *  - Number translateY's downward as the section scrolls (parallax depth).
 *  - Number rotates subtly (8°) for kinetic interest, not for show.
 *  - Mobile (< md): static, no scroll-link (perf + simplicity).
 *
 * Use this to mark the major sections of /services. Keep usage minimal —
 * watermarks lose impact when over-applied.
 */
export function SectionWatermark({
  number,
  label,
  children,
  className = "",
  align = "right",
}: SectionWatermarkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const num = numberRef.current;
    if (!section || !num) return;

    // Skip scroll-link on touch / narrow viewports.
    // matchMedia keeps the ScrollTrigger alive only when the breakpoint is met,
    // and cleans up automatically on resize across the breakpoint.
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(num, { yPercent: -10, rotate: -4 });

      gsap.to(num, {
        yPercent: 30,
        rotate: 6,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => mm.revert();
  }, []);

  const alignClass = align === "right" ? "right-0 md:-right-4" : "left-0 md:-left-4";

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      {/* Watermark — sits behind content, never receives pointer events */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 ${alignClass} -z-10 hidden md:block select-none overflow-hidden`}
        style={{ width: "min(90vw, 1100px)", height: "100%" }}
      >
        {label && (
          <span
            className="absolute top-8 right-0 font-display text-[11px] tracking-[0.3em] uppercase text-[#D4FF00]/40 dark:text-[#D4FF00]/30"
            style={{ writingMode: "horizontal-tb" }}
          >
            {label}
          </span>
        )}
        <span
          ref={numberRef}
          className="absolute right-0 top-0 font-display font-normal leading-none text-neutral-900/[0.045] dark:text-white/[0.06]"
          style={{
            fontSize: "clamp(14rem, 32vw, 30rem)",
            letterSpacing: "-0.04em",
            transformOrigin: "100% 50%",
          }}
        >
          {number}
        </span>
      </div>

      {children}
    </div>
  );
}
