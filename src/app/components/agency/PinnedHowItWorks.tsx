import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

type Step = { id: string; en: { t: string; d: string }; pl: { t: string; d: string } };

/**
 * PinnedHowItWorks - sticky-rail set-piece. A sticky full-height panel sits
 * inside a tall track (one viewport-height of scroll per step); scroll progress
 * drives a pure motion-value crossfade between step layers. Nothing hijacks or
 * swallows native scrolling, so it stays in lockstep with Lenis wheel smoothing.
 *
 * v2 rebuild rationale: the previous version derived a discrete `active` index
 * from scroll and swapped content through AnimatePresence (mode="wait" /
 * "popLayout") with 0.55-0.7s exit+enter animations. Under Lenis-smoothed
 * scrolling the index changes faster than the exit/enter choreography can
 * resolve, so the panel lagged seconds behind the scrollbar, showed an empty
 * frame mid-swap, or appeared "stuck" on one step. Now every step layer is
 * always mounted and its opacity/y are direct transforms of scroll progress -
 * deterministic, reversible, zero queued animations.
 *
 * Falls back to a clean stacked editorial list on mobile or prefers-reduced-motion.
 * Relies on position: sticky working - PageTransition clears its inline transform
 * after entry for exactly this.
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

  const n = steps.length;
  const pinned = isDesktop && !reduced;

  // Scroll progress through the track, 0..1. Computed by hand from
  // getBoundingClientRect on each scroll/resize frame instead of framer's
  // useScroll: useScroll caches the target's position and desyncs when layout
  // shifts after mount (lazy images, the -mt hero overlap above this section),
  // which left the panel scrubbing against stale coordinates. A fresh rect
  // read per frame is cheap for one element and can never go stale. Native
  // scroll listener = plays fine with Lenis (which drives real window scroll).
  const progress = useMotionValue(0);
  useEffect(() => {
    if (!pinned) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      const v = range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
      progress.set(v);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned, progress]);

  // Discrete index only for the cheap UI chrome (tick rail + counter) - it can
  // never gate content visibility, so a lagging state update is harmless.
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const numX = useTransform(progress, [0, 1], ["3vw", "-7vw"]);

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

  // ── Pinned set-piece: one viewport-height of scroll per step ──
  return (
    <section ref={ref} className="relative" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Giant ghost numbers - all layers mounted, crossfaded by scroll progress,
            with a slow shared parallax drift across the whole sequence */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 md:right-2 top-1/2 -translate-y-1/2"
          style={{ x: numX }}
        >
          {steps.map((step, i) => (
            <GhostNumber key={step.id} i={i} n={n} progress={progress}>
              {step.id}
            </GhostNumber>
          ))}
        </motion.div>

        {/* Top labels: eyebrow + counter (pushed below the fixed nav) */}
        <div className="absolute top-24 md:top-28 left-0 right-0 flex items-center justify-between px-1">
          <span className="text-xs font-display uppercase tracking-widest text-[#D4FF00]">{label}</span>
          <span className="font-display text-sm text-neutral-500 tabular-nums">
            {steps[active].id} <span className="text-neutral-700">/ {String(n).padStart(2, "0")}</span>
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

        {/* Step content - every layer mounted, opacity/y scrubbed by scroll */}
        <div className="relative z-10 w-full max-w-3xl">
          {steps.map((step, i) => {
            const c = pl ? step.pl : step.en;
            return (
              <StepLayer key={step.id} i={i} n={n} progress={progress}>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.98] mb-6 md:mb-8">
                  {c.t}
                </h3>
                <p className="text-lg md:text-2xl text-neutral-400 leading-relaxed max-w-xl">{c.d}</p>
              </StepLayer>
            );
          })}
          {/* Invisible sizer keeps the flex row's height stable: the tallest
              step defines the box, the absolute layers paint over it. */}
          <div className="invisible pl-8 sm:pl-16 md:pl-20" aria-hidden="true">
            <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.98] mb-6 md:mb-8">
              {(pl ? steps[1].pl : steps[1].en).t}
            </h3>
            <p className="text-lg md:text-2xl leading-relaxed max-w-xl">
              {(pl ? steps[1].pl : steps[1].en).d}
            </p>
          </div>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
          <motion.div style={{ width: barWidth }} className="h-full bg-[#D4FF00]" />
        </div>
      </div>
    </section>
  );
}

/** Maps step index i (of n) to scroll-progress keyframes for a crossfade:
 *  fade in over the first slice of the step's segment, hold, fade out over the
 *  last slice. First step starts visible; last step stays visible to the end. */
function useStepFade(i: number, n: number, progress: MotionValue<number>, drift: number) {
  const seg = 1 / n;
  const start = i * seg;
  const end = start + seg;
  const f = seg * 0.22; // fade window inside the segment

  const first = i === 0;
  const last = i === n - 1;

  const input = first
    ? [end - f, end]
    : last
      ? [start, start + f]
      : [start, start + f, end - f, end];

  const opacityOut = first ? [1, 0] : last ? [0, 1] : [0, 1, 1, 0];
  const yOut = first ? [0, -drift] : last ? [drift, 0] : [drift, 0, 0, -drift];

  const opacity = useTransform(progress, input, opacityOut);
  const y = useTransform(progress, input, yOut);
  return { opacity, y };
}

function StepLayer({
  i,
  n,
  progress,
  children,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const { opacity, y } = useStepFade(i, n, progress, 44);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-0 pl-8 sm:pl-16 md:pl-20 pointer-events-none"
    >
      {children}
    </motion.div>
  );
}

function GhostNumber({
  i,
  n,
  progress,
  children,
}: {
  i: number;
  n: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const { opacity, y } = useStepFade(i, n, progress, 80);
  return (
    <motion.span
      style={{ opacity, y }}
      className={`block font-display font-bold leading-none tabular-nums text-white/[0.05] text-[40vw] md:text-[32vw] ${
        i !== 0 ? "absolute inset-0 flex items-center justify-end" : ""
      }`}
    >
      {children}
    </motion.span>
  );
}
