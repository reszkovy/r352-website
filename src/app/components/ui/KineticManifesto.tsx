import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  cubicBezier,
  MotionValue,
} from "motion/react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Reveal } from "@/app/components/ui/Reveal";

/**
 * KineticManifesto — scroll-driven kinetic typography scene for the home-page
 * philosophy manifesto ("Beautiful work is the baseline. The system behind it
 * is the advantage.").
 *
 * Mechanics (desktop, motion allowed):
 *   - 240vh section, inner frame sticky at top-0 / h-screen.
 *   - Single useScroll scrubbed from "section enters viewport" to "pin
 *     release" (offset ["start end","end end"]): Acts 1–2 compose during the
 *     100vh approach, so the frame is already composed the moment it pins
 *     (~p 0.42) — no lone floating fragment, no dead black viewports.
 *   - Every element is a useTransform of that one progress value
 *     (position-driven, never timed).
 *   - Act 1: "Beautiful work" — large, serene, scales in slowly.
 *   - Act 2: "is the baseline." — small, mono, snaps in matter-of-factly.
 *   - Act 3: "The system behind it" — builds word by word, bold.
 *   - Act 4: "is the advantage." — lands in lime with letter-level stagger.
 *   - Caption + CTA fade in for the final beat.
 *
 * Fallbacks (hard constraints):
 *   - Initial render is ALWAYS the static layout (full text in DOM), so
 *     prerender/SEO sees complete content. The kinetic scene is opted into
 *     after mount, and only when: no prefers-reduced-motion, no
 *     navigator.webdriver, and viewport >= 768px. Below 768px the static
 *     layout stays — no sticky scroll-jacking on touch.
 *   - transform/opacity only; will-change hints on animated spans.
 */

const EASE = cubicBezier(0.22, 1, 0.36, 1);

/* ── Copy — line splits per language (mirrors philosophy.teaser.title) ── */
const LINES = {
  en: {
    l1: "Beautiful work",
    l2: "is the baseline.",
    l3: "The system behind it",
    l4: "is the advantage.",
  },
  pl: {
    l1: "Piękna praca",
    l2: "to baseline.",
    l3: "System za nią",
    l4: "to przewaga.",
  },
} as const;

/* ── Scrubbed word: reveals over its own slice of scroll progress ── */
function ScrubWord({
  p,
  range,
  children,
  className = "",
}: {
  p: MotionValue<number>;
  range: [number, number];
  children: string;
  className?: string;
}) {
  const opacity = useTransform(p, range, [0, 1], { ease: EASE });
  const y = useTransform(p, range, ["0.5em", "0em"], { ease: EASE });
  const scale = useTransform(p, range, [0.92, 1], { ease: EASE });
  return (
    <motion.span
      className={`inline-block will-change-[transform,opacity] ${className}`}
      style={{ opacity, y, scale }}
    >
      {children}
    </motion.span>
  );
}

/* ── Scrubbed letter: micro-stagger for the lime payoff line ── */
function ScrubLetter({
  p,
  range,
  children,
}: {
  p: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(p, range, [0, 1], { ease: EASE });
  const y = useTransform(p, range, ["0.35em", "0em"], { ease: EASE });
  return (
    <motion.span
      className="inline-block will-change-[transform,opacity]"
      style={{ opacity, y }}
    >
      {children}
    </motion.span>
  );
}

/* ── Static layout — identical to the original philosophy teaser.
      Used for prerender/bots, reduced motion and < 768px. ── */
function StaticManifesto() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  return (
    <section className="pt-32 pb-32 md:pt-40 md:pb-40 border-t border-white/10">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
            <h2
              className="col-span-12 md:col-span-7 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.2] text-white break-keep"
              dangerouslySetInnerHTML={{ __html: t("philosophy.teaser.title") }}
            />
            <div className="col-span-12 md:col-span-5 md:justify-self-end max-w-xl space-y-8">
              <p className="text-base md:text-lg text-neutral-400 leading-relaxed whitespace-pre-line">
                {t("philosophy.teaser.description")}
              </p>
              <a
                href="/philosophy"
                onClick={(e) => {
                  e.preventDefault();
                  setLocation("/philosophy");
                }}
                className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
              >
                <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                <span>{t("philosophy.teaser.cta")}</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Kinetic scene — title-sequence treatment, scrubbed to scroll ── */
function KineticScene() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const ref = useRef<HTMLElement>(null);

  // Single useScroll for the whole scene (perf constraint).
  // "start end" → progress starts as the section scrolls into view, so the
  // first two acts play during the approach and the frame pins already
  // composed (pin happens at p ≈ 100vh/240vh ≈ 0.42).
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const copy = LINES[language === "pl" ? "pl" : "en"];

  /* Keyframes are budgeted against the measured progress window: with Lenis
     in the loop the scene's progress reaches ~0.29 at pin and ~0.71 at pin
     release — so the whole composition completes by ~0.67, never leaving a
     pinned-but-frozen viewport. */

  /* Act 1 — "Beautiful work": builds while the section rises into view. */
  const l1Opacity = useTransform(p, [0.13, 0.25], [0, 1], { ease: EASE });
  const l1Scale = useTransform(p, [0.13, 0.28], [1.06, 1], { ease: EASE });
  // Composition drifts up as the later acts stack beneath it.
  const stackY = useTransform(p, [0.27, 0.52], ["6vh", "0vh"], { ease: EASE });

  /* Act 2 — "is the baseline.": snaps in right as the frame pins.
     Rendered through ScrubWord (same mechanism as Act 3) — a bare motion.span
     with a [0,1] opacity transform was getting stuck at its initial 0. */
  const l2Range: [number, number] = [0.27, 0.32];

  /* Act 3 — word ranges (computed per word count so PL/EN both stagger). */
  const l3Words = copy.l3.split(" ");
  const l3Start = 0.35;
  const l3Step = 0.15 / l3Words.length;

  /* Act 4 — letter ranges across the lime line. */
  const l4Words = copy.l4.split(" ");
  const l4Letters = copy.l4.replace(/\s/g, "").length;
  const l4Start = 0.5;
  const l4Span = 0.12;

  /* Final beat — caption + CTA. */
  const endOpacity = useTransform(p, [0.6, 0.67], [0, 1], { ease: EASE });
  const endY = useTransform(p, [0.6, 0.67], ["1.5em", "0em"], { ease: EASE });

  // Running letter index across words (spaces excluded from stagger budget).
  let letterIndex = 0;

  return (
    <section
      ref={ref}
      className="relative h-[240vh] border-t border-white/10"
      aria-label={language === "pl" ? "Manifest" : "Manifesto"}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="max-w-[1800px] w-full mx-auto px-8 md:px-12">
          <motion.div
            className="flex flex-col items-start gap-2 md:gap-4 will-change-transform"
            style={{ y: stackY }}
          >
            {/* Act 1 */}
            <motion.h2
              className="text-white font-normal tracking-tight leading-[0.95] text-[clamp(3rem,10vw,10.5rem)] will-change-[transform,opacity]"
              style={{ opacity: l1Opacity, scale: l1Scale, transformOrigin: "left center" }}
            >
              {copy.l1}
              {/* Act 2 — full sentence stays one heading for semantics */}
              <span className="block mt-4 md:mt-6">
                <ScrubWord
                  p={p}
                  range={l2Range}
                  className="font-mono font-normal text-neutral-400 tracking-normal text-[clamp(1rem,2vw,1.6rem)]"
                >
                  {copy.l2}
                </ScrubWord>
              </span>

              {/* Act 3 */}
              <span className="block mt-8 md:mt-12 font-bold tracking-tighter leading-[0.95] text-[clamp(2.25rem,7vw,7.5rem)]">
                {l3Words.map((word, i) => (
                  <span key={i}>
                    <ScrubWord
                      p={p}
                      range={[l3Start + i * l3Step, l3Start + i * l3Step + 0.07]}
                    >
                      {word}
                    </ScrubWord>
                    {i < l3Words.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>

              {/* Act 4 — lime, letter-level stagger */}
              <span className="block mt-2 md:mt-4 font-bold tracking-tighter leading-[0.95] text-[#D4FF00] text-[clamp(3rem,12vw,13rem)]">
                {l4Words.map((word, wi) => (
                  <span key={wi} className="inline-block whitespace-nowrap">
                    {word.split("").map((ch, ci) => {
                      const start =
                        l4Start + (letterIndex++ / l4Letters) * l4Span;
                      return (
                        <ScrubLetter key={ci} p={p} range={[start, start + 0.05]}>
                          {ch}
                        </ScrubLetter>
                      );
                    })}
                    {wi < l4Words.length - 1 ? <span>&nbsp;</span> : null}
                  </span>
                ))}
              </span>
            </motion.h2>

            {/* Final beat — caption + CTA */}
            <motion.div
              className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end gap-6 md:gap-16 will-change-[transform,opacity]"
              style={{ opacity: endOpacity, y: endY }}
            >
              <p className="text-base md:text-lg text-neutral-400 leading-relaxed whitespace-pre-line max-w-xl">
                {t("philosophy.teaser.description")}
              </p>
              <a
                href="/philosophy"
                onClick={(e) => {
                  e.preventDefault();
                  setLocation("/philosophy");
                }}
                className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer shrink-0"
              >
                <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                <span>{t("philosophy.teaser.cta")}</span>
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function KineticManifesto() {
  // Always start static so prerender/first paint contains the full text.
  const [kinetic, setKinetic] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const decide = () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const bot = !!(navigator as Navigator & { webdriver?: boolean })
        .webdriver;
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      setKinetic(!reduced && !bot && desktop);
    };
    decide();
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqWidth = window.matchMedia("(min-width: 768px)");
    mqMotion.addEventListener("change", decide);
    mqWidth.addEventListener("change", decide);
    return () => {
      mqMotion.removeEventListener("change", decide);
      mqWidth.removeEventListener("change", decide);
    };
  }, []);

  return kinetic ? <KineticScene /> : <StaticManifesto />;
}
