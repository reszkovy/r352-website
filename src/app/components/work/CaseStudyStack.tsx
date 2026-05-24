import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenisGsap } from "@/app/hooks/useLenisGsap";

gsap.registerPlugin(ScrollTrigger);

/**
 * Project shape — pruned subset of the full projects.tsx record.
 * The stack consumes only fields needed for the card face — full detail
 * lives on /work/[id] reached via the CTA.
 */
interface StackProject {
  id: string;
  client: string;
  title?: string;
  year?: string;
  category?: { en: string; pl: string };
  coverImage: string;
  outcome?: { en: string; pl: string };
  stats?: Array<{ value: string; label: { en: string; pl: string } }>;
}

interface CaseStudyStackProps {
  projects: StackProject[];
  /** Optional eyebrow label rendered above the stack. */
  eyebrow?: { en: string; pl: string };
  /** Optional section title rendered above the stack. */
  title?: { en: string; pl: string };
}

/**
 * Sticky stacked case-study cards — each card pins to the viewport while in
 * its scroll range, the next card slides up over it, previous cards scale
 * down + fade slightly as they recede into the stack.
 *
 * Pattern inspired by editorial agency sites (Ragged Edge, Pentagram) but
 * Reszek-flavored: operator-language KPIs prominent, KPI number is the
 * visual hero instead of a big atmospheric image. Cover image is the side
 * accent, not the full bleed — keeps the operator framing, not creative
 * portfolio framing.
 *
 * Mobile (< md): stack disabled, cards rendered as plain vertical flow.
 */
export function CaseStudyStack({ projects, eyebrow, title }: CaseStudyStackProps) {
  const { language } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Bridge Lenis with ScrollTrigger so the stack stays in sync with the
  // smooth scroll position rather than the native scroll position.
  useLenisGsap();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll<HTMLElement>("[data-stack-card]");
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        // The last card stays as-is — nothing scrolls over it.
        if (index === cards.length - 1) return;

        // As the user scrolls past this card (its bottom hits viewport bottom)
        // and the next card begins covering it, recede it a touch.
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.65,
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top",
            // End when the NEXT card has fully covered this one.
            endTrigger: cards[index + 1],
            end: "top top",
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, [projects.length]);

  if (!projects.length) return null;

  return (
    <div className="relative">
      {/* Eyebrow + title — sit ABOVE the stack, scroll normally */}
      {(eyebrow || title) && (
        <div className="px-8 md:px-12 max-w-[1800px] mx-auto pb-16 md:pb-20">
          {eyebrow && (
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-6">
              {eyebrow[language]}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] max-w-4xl">
              {title[language]}
            </h2>
          )}
        </div>
      )}

      {/* Stack wrapper — relative parent for sticky children */}
      <div ref={wrapperRef} className="relative">
        {projects.map((p, index) => {
          const stat = p.stats?.[0];
          return (
            <div
              key={p.id}
              data-stack-card
              className="sticky top-0 min-h-screen w-full flex items-center"
              style={{
                transformOrigin: "center top",
              }}
            >
              <div
                className="w-full px-8 md:px-12 py-20 md:py-24 bg-white dark:bg-[#0A0A0A] border-t border-black/10 dark:border-white/10"
                style={{ minHeight: "100vh" }}
              >
                <div className="max-w-[1800px] mx-auto h-full flex flex-col justify-between gap-12">
                  {/* TOP ROW — meta line: index / year / category */}
                  <div className="flex items-baseline justify-between text-[11px] font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    <span>
                      <span className="text-[#D4FF00] mr-3">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {p.category?.[language] || ""}
                    </span>
                    {p.year && <span>{p.year}</span>}
                  </div>

                  {/* MAIN GRID — KPI hero on left, cover image on right */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center flex-1">
                    {/* LEFT — operator hero: KPI number + client + outcome */}
                    <div className="md:col-span-7 flex flex-col gap-8 md:gap-10">
                      {stat && (
                        <div>
                          <div className="font-display text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#D4FF00] leading-none mb-3">
                            {stat.value}
                          </div>
                          <div className="text-sm md:text-base font-display uppercase tracking-[0.15em] text-neutral-600 dark:text-neutral-400">
                            {stat.label[language]}
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black dark:text-white mb-4 leading-[0.95]">
                          {p.client}
                        </h3>
                        {p.outcome && (
                          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl [text-wrap:pretty]">
                            {p.outcome[language]}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* RIGHT — cover image, supporting (not full bleed) */}
                    <div className="md:col-span-5">
                      <div className="aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                        <img
                          src={p.coverImage}
                          alt={p.client}
                          loading="lazy"
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                        />
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ROW — CTA */}
                  <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-8">
                    <Link
                      href={`/work/${p.id}`}
                      className="group inline-flex items-center gap-3 text-base md:text-lg font-bold tracking-tight text-black dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-300"
                    >
                      <span>
                        {language === "pl" ? "Zobacz case study" : "Read the case"}
                      </span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={1.5}
                      />
                    </Link>
                    <span className="text-[11px] font-display uppercase tracking-[0.2em] text-neutral-500">
                      {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
