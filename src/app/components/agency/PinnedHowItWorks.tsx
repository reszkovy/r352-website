import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "motion/react";

type Step = { id: string; en: { t: string; d: string }; pl: { t: string; d: string } };

/**
 * PinnedHowItWorks - the immersive set-piece. A sticky panel pins to the viewport
 * while a tall outer track scrolls; scroll progress drives which step is active.
 * Each step crossfades/slides in, a giant ghost number morphs behind it, a bottom
 * progress bar fills, and a left rail of ticks marks position. Same easing language
 * as the hero, so the page reads as one designed system.
 *
 * Relies on position: sticky working (PageTransition clears its inline transform
 * after entry specifically to keep sticky viewport-bound).
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const n = steps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    setActive(idx);
  });

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const c = pl ? steps[active].pl : steps[active].en;
  const id = steps[active].id;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={ref} className="relative" style={{ height: `${n * 88}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Giant ghost number behind */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`n-${active}`}
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-0 md:right-4 top-1/2 font-display font-bold leading-none tabular-nums text-white/[0.05] text-[44vw] md:text-[34vw]"
            style={{ translateY: "-50%" }}
            initial={{ opacity: 0, y: "-42%", filter: "blur(8px)" }}
            animate={{ opacity: 1, y: "-50%", filter: "blur(0px)" }}
            exit={{ opacity: 0, y: "-58%", filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease }}
          >
            {id}
          </motion.span>
        </AnimatePresence>

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
