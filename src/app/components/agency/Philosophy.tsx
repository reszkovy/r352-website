import { Reveal } from "@/app/components/ui/Reveal";
import { Link } from "wouter";
import { useLanguage } from "@/app/context/LanguageContext";
import { useRef } from "react";
import { PhilosophyVisuals } from "./PhilosophyVisuals";

interface Belief {
  title: string;
  description: string;
}

interface Contrast {
  old: string;
  new: string;
}

interface NonNeg {
  title: string;
  desc: string;
}

export function Philosophy() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  const beliefKeys = ["01", "02", "03", "04", "05", "06"];
  const contrasts = (t("philosophy_page.contrasts") || []) as Contrast[];
  const nonneg = (t("philosophy_page.nonneg") || []) as NonNeg[];

  return (
    <section ref={containerRef} className="relative overflow-hidden">

      {/* Hero Header */}
      <div className="py-32 px-8 md:px-12 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div>
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-8">
                {t("philosophy_page.label")}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter text-neutral-900 dark:text-white mb-6 leading-[0.9] max-w-5xl">
                {t("philosophy_page.title_line1")} <br className="hidden md:block" />
                <span className="text-neutral-400 dark:text-[#D4FF00]">{t("philosophy_page.title_line2")}</span>
              </h1>
              <p className="text-2xl md:text-3xl text-neutral-600 dark:text-neutral-400 tracking-tight font-medium mb-16">
                {t("philosophy_page.subtitle")}
              </p>
              <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-12 text-xl md:text-2xl text-neutral-700 dark:text-neutral-400 leading-relaxed">
                <p>{t("philosophy_page.intro_col1")}</p>
                <p>{t("philosophy_page.intro_col2")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Visuals Strip */}
      <div className="border-b border-neutral-200 dark:border-white/10 bg-[#D0DBE1] md:bg-transparent">
        <PhilosophyVisuals />
      </div>

      {/* Beliefs Grid — 6 beliefs, 2 cols */}
      <div className="max-w-[1800px] mx-auto border-b border-neutral-200 dark:border-white/10 relative">
        <div className="px-8 md:px-12 pt-24 pb-8">
          <Reveal>
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
              {language === 'pl' ? 'W co wierzymy' : 'What We Believe'}
            </span>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
          {beliefKeys.map((key, i) => {
            const belief = t(`philosophy_page.beliefs.${key}`) as Belief;
            return (
              <div
                key={i}
                className={`group p-12 md:p-16 border-b border-neutral-200 dark:border-white/10 ${
                  i % 2 === 0 ? "md:border-r md:border-neutral-200 md:dark:border-white/10" : ""
                } hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors duration-500`}
              >
                <Reveal delay={i * 0.05}>
                  <div className="flex flex-col h-full gap-6">
                    <span className="font-display text-neutral-400 dark:text-[#D4FF00] text-sm tracking-widest">
                      {key}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-tight whitespace-pre-line">
                      {belief?.title}
                    </h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {belief?.description}
                    </p>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contrasts: Not This → This */}
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <Reveal>
          <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-16">
            {language === 'pl' ? 'Nie tak → Tak' : 'Not This → This'}
          </span>
        </Reveal>
        <div className="space-y-0">
          {contrasts.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="py-8 border-b border-neutral-100 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-baseline">
                <p className="text-lg md:text-xl text-neutral-400 dark:text-neutral-600 line-through decoration-neutral-200 dark:decoration-white/10">
                  {item.old}
                </p>
                <p className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                  {item.new}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Promise */}
      <div className="py-32 md:py-40 px-8 md:px-12 border-b border-neutral-200 dark:border-white/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(120px,25vw,400px)] font-bold tracking-tighter text-neutral-100 dark:text-white/[0.02] pointer-events-none select-none leading-none">
          r352
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.0] mb-8">
              {t("philosophy_page.promise")}
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              {t("philosophy_page.promise_sub")}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Non-Negotiables */}
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <Reveal>
          <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-16">
            {t("philosophy_page.nonneg_label")}
          </span>
        </Reveal>
        <div className="max-w-3xl">
          {nonneg.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="py-8 border-b border-neutral-100 dark:border-white/5 flex items-start gap-5">
                <span className="text-neutral-400 dark:text-[#D4FF00] text-lg mt-0.5 shrink-0">→</span>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight mb-2">
                    {item.title}
                  </h4>
                  <p className="text-base text-neutral-500 dark:text-neutral-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Personal Note */}
      <div className="py-32 px-8 md:px-12">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-neutral-50 dark:bg-white/[0.03] p-12 md:p-16 border border-neutral-100 dark:border-white/5">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight">{t("philosophy_page.note.title")}</h3>
              <div className="space-y-4 text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <p>{t("philosophy_page.note.p1")}</p>
                <p className="text-neutral-500 dark:text-white/60 whitespace-pre-line">{t("philosophy_page.note.p2")}</p>
                <p className="whitespace-pre-line">{t("philosophy_page.note.p3")}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-neutral-200 dark:border-white/10 pt-24 pb-32 relative z-50 pointer-events-auto">
         <Reveal>
           <div className="flex flex-col items-center justify-center text-center gap-8">
             <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
                {language === 'pl' ? "Gotowy rozpocząć projekt?" : "Ready to start a project?"}
             </span>
             <Link
                href="/contact"
                className="group relative inline-block cursor-pointer pointer-events-auto"
             >
                <span className="text-5xl md:text-8xl font-bold tracking-tighter text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                   {language === 'pl' ? "Porozmawiajmy" : "Let's talk"}
                </span>
                <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                   {language === 'pl' ? "Porozmawiajmy" : "Let's talk"}
                </span>
                <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   {language === 'pl' ? "Porozmawiajmy" : "Let's talk"}
                </span>
             </Link>
           </div>
         </Reveal>
      </div>
    </section>
  );
}
