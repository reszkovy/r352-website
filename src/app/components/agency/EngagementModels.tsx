import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export function EngagementModels() {
  const { t, language } = useLanguage();
  
  const models = [
    { key: "project", number: "01" },
    { key: "retainer", number: "02" },
    { key: "augmentation", number: "03" }
  ];

  return (
    <section className="py-32 px-8 md:px-12 bg-[#080808] relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto relative z-10">
        <Reveal>
          <div className="mb-24 md:flex justify-between items-end border-b border-white/10 pb-8">
            <div className="flex items-center gap-5">
              {/* Lime vertical accent bar */}
              <div className="lime-accent-bg w-1 h-14 bg-[#D4FF00] hidden md:block" />
              <div>
                <span className="lime-accent block text-xs font-display uppercase tracking-[0.3em] text-[#D4FF00] mb-3">
                  {t("engagement.subtitle")}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white whitespace-normal md:whitespace-pre-line" dangerouslySetInnerHTML={{ __html: t("engagement.title") }}>
                </h2>
              </div>
            </div>
            {/* Decorative lime dots */}
            <div className="hidden md:flex items-center gap-2 mt-6 md:mt-0">
              <div className="lime-accent-bg w-16 h-[2px] bg-[#D4FF00]" />
              <div className="lime-accent-bg w-2.5 h-2.5 rounded-none bg-[#D4FF00]" />
              <div className="lime-accent-bg w-1.5 h-1.5 rounded-none bg-[#D4FF00] opacity-50" />
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <Reveal key={model.key} delay={index * 0.1} className="h-full">
              <div className="engagement-card bg-[#050505] h-full hover:bg-[#0a0a0a] transition-all duration-500 group flex flex-col relative overflow-hidden">
                {/* Lime top accent bar — always visible, expands on hover */}
                <div className="lime-accent-bg h-1 bg-[#D4FF00] w-full transition-all duration-700 ease-out" />
                
                <div className="p-10 flex flex-col h-full">
                  <div className="mb-8">
                    {/* Number badge with lime bg */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="lime-accent-bg inline-flex items-center justify-center w-10 h-10 bg-[#D4FF00] text-black text-sm font-bold font-mono tracking-wider">
                        {model.number}
                      </span>
                      <span className="lime-accent text-base font-display uppercase tracking-wide text-[#D4FF00] mt-2">
                        {t(`engagement.models.${model.key}.subtitle`)}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl font-display uppercase tracking-wider text-white mb-6 font-normal">
                      {t(`engagement.models.${model.key}.title`)}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed text-base min-h-[5rem]">
                      {t(`engagement.models.${model.key}.description`)}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-8 border-t border-white/5">
                    <ul className="space-y-4">
                      {(t(`engagement.models.${model.key}.features`) as string[]).map(feature => (
                        <li key={feature} className="flex items-center gap-3 text-lg text-neutral-500 font-mono group-hover:text-neutral-300 transition-colors">
                          <span className="lime-accent-bg w-2 h-2 bg-[#D4FF00] shrink-0 group-hover:scale-125 transition-transform" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Cross-Link for DIAGNOSE model */}
                    {model.key === "project" && (
                      <div className="mt-[16px] block">
                         <Link href="/services#engagement-models" className="group/link inline-flex items-center text-[13px] text-[#D4FF00] hover:text-[#bce600] transition-colors border-b border-[#D4FF00]/30 hover:border-[#D4FF00] pb-[1px]">
                           {language === 'pl' ? "Zacznij od Diagnostyki" : "Start with a Diagnostic"}
                           <span className="arrow ml-1 inline-block transition-transform duration-200 group-hover/link:translate-x-[4px]">→</span>
                         </Link>
                      </div>
                    )}

                    {/* Lime arrow CTA */}
                    <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-8px] group-hover:translate-x-0">
                      <span className="lime-accent-bg w-6 h-[2px] bg-[#D4FF00]" />
                      <ArrowRight className="lime-accent w-4 h-4 text-[#D4FF00]" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
