import { Reveal } from "@/app/components/ui/Reveal";
import { Link } from "wouter";
import { useLanguage } from "@/app/context/LanguageContext";
import { useRef } from "react";
import { PhilosophyVisuals } from "./PhilosophyVisuals";

export function Philosophy() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  const principles = [
    { number: "01", key: "01" },
    { number: "02", key: "02" },
    { number: "03", key: "03" },
    { number: "04", key: "04" }
  ];

  return (
    <section ref={containerRef} className="relative overflow-hidden">
      
      {/* Intro Header */}
      <div className="py-32 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div>
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-8">
                {t("philosophy_page.label")}
              </span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-16 leading-[0.9] max-w-4xl text-balance">
                {t("philosophy_page.title_line1")} <br className="hidden md:block" />
                {t("philosophy_page.title_line2")}
              </h2>
              <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 gap-12 text-xl md:text-2xl text-neutral-400 leading-relaxed">
                <div>
                  <p className="whitespace-pre-line">
                    {t("philosophy_page.intro_col1")}
                  </p>
                </div>
                <div>
                  <p className="whitespace-pre-line">
                    {t("philosophy_page.intro_col2")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Visuals Strip */}
      <div className="border-b border-white/10 bg-[#D0DBE1] md:bg-transparent">
        <PhilosophyVisuals />
      </div>

      {/* Principles Grid */}
      <div className="max-w-[1800px] mx-auto border-b border-white/10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 relative z-10">
          {principles.map((principle, i) => (
            <div 
              key={i} 
              className={`group p-12 md:p-16 border-b md:border-b-0 border-white/10 ${
                i % 2 === 0 ? "md:border-r" : ""
              } ${i >= 2 ? "md:border-t" : ""} hover:bg-white/[0.02] transition-colors duration-500`}
            >
              <Reveal delay={i * 0.1}>
                <div className="flex flex-col h-full justify-between gap-12">
                  <div>
                    <span className="font-display text-[#D4FF00] text-sm tracking-widest mb-6 block">
                      {principle.number}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-white leading-tight mb-8">
                      {t(`philosophy_page.principles.${principle.key}.title`)}
                    </h3>
                  </div>
                  <div className="space-y-4 text-lg text-neutral-400 leading-relaxed">
                    {(t(`philosophy_page.principles.${principle.key}.content`) as string[]).map((paragraph, j) => (
                      <p key={j} className="whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Note */}
      <div className="py-32 px-8 md:px-12 border-t border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-black/5 dark:bg-white/[0.03] p-12 md:p-16 border border-black/5 dark:border-white/5">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-8 tracking-tight">{t("philosophy_page.note.title")}</h3>
              <div className="space-y-4 text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <p>
                  {t("philosophy_page.note.p1")}
                </p>
                <p className="text-black/60 dark:text-white/60 whitespace-pre-line">
                  {t("philosophy_page.note.p2")}
                </p>
                <p className="whitespace-pre-line">
                  {t("philosophy_page.note.p3")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Cross-Link CTA */}
      <div className="border-t border-black/10 dark:border-white/10 pt-24 pb-32 relative z-50 pointer-events-auto">
         <Reveal>
           <div className="flex flex-col items-center justify-center text-center gap-8">
             <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
                {language === 'pl' ? "Gotowy przejść do działania?" : "Ready to move to action?"}
             </span>
             <Link 
                href="/work"
                className="group relative inline-block cursor-pointer pointer-events-auto"
             >
                <span className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                   {language === 'pl' ? "Nasze Projekty" : "Our Work"}
                </span>
                <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                   {language === 'pl' ? "Nasze Projekty" : "Our Work"}
                </span>
                <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   {language === 'pl' ? "Nasze Projekty" : "Our Work"}
                </span>
             </Link>
           </div>
         </Reveal>
      </div>
    </section>
  );
}