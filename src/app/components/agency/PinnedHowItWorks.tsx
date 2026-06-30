import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

type Step = { id: string; en: { t: string; d: string }; pl: { t: string; d: string } };

/**
 * PinnedHowItWorks - the immersive set-piece. A sticky panel pins to the viewport
 * while a tall outer track scrolls; scroll progress drives which step is active.
 * Giant ghost number parallax-drifts + crossfades, the statement slides per step,
 * a left tick rail + bottom progress bar mark position. Same easing as the hero.
 *
 * Falls back to a clean stacked editorial list on mobile or prefers-reduced-motion
 * (the 350vh pin would be tedious / unwanted there). Relies on position: sticky
 * working - PageTransition clears its inline transform after entry for exactly this.
 */
export function PinnedHowItWorks({
  steps,
  pl,
  label,
}: {
  steps: Step[];
  pl: boolean;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const n = steps.length;
  const ease = [0.22, 1, 0.36, 1] as const;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const numX = useTransform(scrollYProgress, [0, 1], ["3vw", "-7vw"]);

  const pinned = isDesktop && !reduced;

  // ── Fallback: clean stacked editorial list (mobile / reduced-motion) ──
  if (!pinned) {
    return (
      <section>
        <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00] mb-4 md:mb-8 block">
          {label}
        </span>
        <div>
          {steps.map((step) => {
            const c = pl ? step.pl : step.en;
            return (
              <div
                key={step.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-10 items-start border-t border-white/10 py-10 md:py-16"
              >
                <div className="md:col-span-3">
                  <span className="font-display text-5xl md:text-7xl font-bold leading-none tabular-nums text-white/[0.08]">
                    {step.id}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white leading-[1.04] mb-4">
                    {c.t}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-2xl">{c.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // ── Pinned set-piece ──
  const c = pl ? steps[active].pl : steps[active].en;
  const id = steps[active].id;

  return (
    <section ref={ref} className="relative" style={{ height: `${n * 88}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Giant ghost number - parallax drift + crossfade per step */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 md:right-2 top-1/2 -translate-y-1/2"
          style={{ x: numX }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`n-${active}`}
              className="block font-display font-bold leading-none tabular-nums text-white/[0.05] text-[40vw] md:text-[32vw]"
              initial={{ opacity: 0, y: "10%", filter: "blur(10px)" }}
              animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
              exit={{ opacity: 0, y: "-12%", filter: "blur(10px)" }}
              transition={{ duration: 0.7, ease }}
            >
              {id}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Top labels: eyebrow + counter (pushed below the fixed nav) */}
        <div className="absolute top-24 md:top-28 left-0 right-0 flex items-center justify-between px-1">
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00]">{label}</span>
          <span className="font-display text-sm text-neutral-500 tabular-nums">
            {id} <span className="text-neutral-700">/ {String(n).padStart(2, "0")}</span>
          </span>
        </div>

        {/* Left tick rail */}
        <div className="absolute left-1 md:left-0 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={`h-px transition-all duration-500 ${
                i === active ? "w-10 bg-[#D4FF00]" : i < active ? "w-6 bg-white/40" : "w-6 bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Active step content */}
        <div className="relative z-10 max-w-3xl pl-8 sm:pl-16 md:pl-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -44 }}
              transition={{ duration: 0.55, ease }}
            >
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.98] mb-6 md:mb-8">
                {c.t}
              </h3>
              <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed max-w-xl">{c.d}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
          <motion.div style={{ width: barWidth }} className="h-full bg-[#D4FF00]" />
        </div>
      </div>
    </section>
  );
}
