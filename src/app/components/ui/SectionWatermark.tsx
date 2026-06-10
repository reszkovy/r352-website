import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface SectionWatermarkProps {
  /** The watermark number to display, e.g. "01", "02", "03". */
  number: string;
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
 * Implementation: framer-motion's useScroll + useTransform. Replaces previous
 * GSAP + ScrollTrigger approach which had initial-paint timing bugs (number
 * sometimes wasn't visible until first scroll/click triggered ScrollTrigger
 * recalc). useScroll subscribes natively to scroll progress via the React
 * lifecycle — value is computed on first render, no refresh dance needed.
 *
 *  - Number translates downward as the section scrolls (-10% → +30%).
 *  - Number rotates subtly (-4° → +6°) for kinetic depth.
 *  - Mobile (< md): static, no scroll-link (hidden via Tailwind class).
 *  - Initial opacity fade-in (0 → 1) gives smooth entrance instead of pop.
 *
 * Use this to mark the major sections of /services. Keep usage minimal.
 */
export function SectionWatermark({
  number,
  children,
  className = "",
  align = "right",
}: SectionWatermarkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track the section's progress through the viewport.
  // ["start end", "end start"] = animation runs from section's TOP entering at
  // viewport BOTTOM (progress 0) to section's BOTTOM exiting at viewport TOP
  // (progress 1). Same mental model as GSAP's start/end strings.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Map 0→1 progress to translateY -10% → +30% and rotation -4° → +6°.
  // Identical motion params to the previous GSAP version, just driven natively.
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 6]);

  const alignClass = align === "right" ? "right-0 md:-right-4" : "left-0 md:-left-4";

  return (
    // `isolate` is load-bearing: it makes this wrapper its own stacking
    // context, so the watermark's -z-10 resolves HERE — above the page
    // background, below the section content. Without it, the negative
    // z-index resolves against the root stacking context and the number
    // paints BEHIND the app's bg-background div (App.tsx) → invisible.
    // This used to "work" only while PageTransition's wrapper kept an
    // inline transform/filter (accidental stacking context), which it now
    // clears in onAnimationComplete to fix position:sticky — leaving the
    // watermark hidden on fresh load until a re-render re-applied styles.
    // isolation:isolate does NOT create a containing block, so it is safe
    // for sticky/fixed descendants.
    <div ref={sectionRef} className={`relative isolate ${className}`}>
      {/* Watermark — sits behind content, never receives pointer events */}
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 ${alignClass} -z-10 hidden md:block select-none overflow-hidden`}
        style={{ width: "min(90vw, 1100px)", height: "100%" }}
      >
        {/* Color: text-[#1e1e1e] in dark mode = tone of BLACK 9 units lighter
            than bg (#151515) → reads as embossed shadow, not bright overlay.
            Light mode keeps subtle black tint at low opacity. */}
        <motion.span
          className="absolute right-0 top-0 font-display font-normal leading-none text-neutral-900/[0.04] dark:text-[#1e1e1e]"
          style={{
            fontSize: "clamp(14rem, 32vw, 30rem)",
            letterSpacing: "-0.04em",
            transformOrigin: "100% 50%",
            y,
            rotate,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        >
          {number}
        </motion.span>
      </div>

      {children}
    </div>
  );
}
