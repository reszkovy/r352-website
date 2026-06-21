import { Link } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { industries } from "@/app/data/industries";
import { ArrowRight } from "lucide-react";

/**
 * Industries - index page listing every vertical r352 serves.
 *
 * One card per industry, each linking to /industries/:slug (rendered by
 * IndustryDetail). Cards are data-driven from src/app/data/industries.ts.
 *
 * Why the page exists:
 *  - Direct lead-gen entry point for prospects who arrive by segment
 *    (fitness operator, real estate marketing lead, retail brand owner,
 *    multi-market health network).
 *  - Helps GEO/SEO surface - a hub page that ties the four detail pages
 *    together with internal links.
 */

export function Industries() {
  const { language } = useLanguage();

  return (
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-32 md:pt-40 mb-20 md:mb-28 max-w-3xl">
        <Reveal>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-6">
            {language === "pl" ? "Branże · r352" : "Industries · r352"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-8 [text-wrap:balance]">
            {language === "pl" ? (
              <>Branże, które<br />obsługujemy.</>
            ) : (
              <>Industries<br />we serve.</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
            {language === "pl"
              ? "Wąska specjalizacja: multi-location brand operations. Fitness i wellness, deweloperka nieruchomości, retail i franczyzy, sieci zdrowia i usług. Wszystkie dzielą ten sam problem - kreatywna dostawa na skalę bez wycieków spójności."
              : "Narrow specialty: multi-location brand operations. Fitness and wellness networks, real estate developers, retail and franchise operators, health and service networks. All share the same problem - creative delivery at scale without consistency leaks."}
          </p>
        </Reveal>
      </section>

      {/* ─── INDUSTRY CARDS ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-12 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {industries.map((industry, i) => (
            <Reveal key={industry.slug} delay={i * 0.06}>
              {/* Card surface - line-only treatment. Previous bg tint
                  (bg-neutral-50/40 dark:bg-white/[0.015]) rendered as a faint
                  grey/white box against #0a0a0a, which collided with the no-card
                  aesthetic the rest of the site uses (sections separated by hairlines,
                  not chrome). Now: invisible at rest, light bg ONLY on hover so the
                  affordance is still present without the always-on "marketing card"
                  look the user wanted removed (2026-06-11). */}
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative block h-full border border-neutral-200 dark:border-white/10 p-8 md:p-10 lg:p-12 hover:border-[#D4FF00] dark:hover:bg-white/[0.03] hover:bg-neutral-50/60 transition-all duration-500"
              >
                {/* Eyebrow + lime number */}
                <div className="flex items-baseline justify-between mb-8">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display">
                    {industry.eyebrow[language]}
                  </span>
                  <span className="font-display text-sm text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00] transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-6 [text-wrap:balance]">
                  {industry.title[language]}
                </h2>

                {/* Teaser - use h1 as the promise-line */}
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty] mb-10">
                  {industry.h1[language]}
                </p>

                {/* Footer - explore link with arrow */}
                <div className="flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 group-hover:text-[#D4FF00] transition-colors duration-300">
                  <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{language === "pl" ? "Zobacz branżę" : "Explore"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FOOTER NOTE ─── */}
      <Reveal>
        <section className="mt-20 md:mt-28 max-w-2xl mx-auto text-center">
          <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
            {language === "pl"
              ? "Twoja branża tu nie pasuje? Napisz na hello@r352.com - pewnie i tak rozmawialiśmy o czymś podobnym."
              : "Your industry not listed? Email hello@r352.com - chances are we've worked with something close."}
          </p>
        </section>
      </Reveal>
    </PageTransition>
  );
}
