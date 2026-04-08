import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Link } from "wouter";
import { Workflow, Sparkles } from "lucide-react";

export function ServicesList() {
  const { t, language } = useLanguage();
  
  const services = [
    { id: "01", key: "01", slug: "operating-system" },
    { id: "02", key: "02", slug: "design-production" },
    { id: "03", key: "03", slug: "build-optimize" },
  ];

  return (
    <section className="py-32 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        
        {/* Left Column: Heading, Narrative & Note */}
        <div className="md:col-span-4 flex flex-col justify-between h-full">
          <div>
            <Reveal>
               <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-8">
                 {t("services_list.heading")}
               </h2>
            </Reveal>
            
            {/* Process + AI Narrative */}
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3 mb-12">
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-none border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#D4FF00]/40 transition-colors duration-500">
                    <Workflow className="w-3.5 h-3.5 text-[#D4FF00]" />
                  </div>
                  <span className="text-sm text-neutral-400 font-mono tracking-wide group-hover:text-neutral-300 transition-colors">
                    {t("services_list.narrative_process")}
                  </span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-none border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#D4FF00]/40 transition-colors duration-500">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                  </div>
                  <span className="text-sm text-neutral-400 font-mono tracking-wide group-hover:text-neutral-300 transition-colors">
                    {t("services_list.narrative_ai")}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay={0.2}>
            <div className="mt-12 md:mt-0 p-6 border border-white/10 bg-white/[0.02] backdrop-blur-sm max-w-sm">
              <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block">{t("services_list.note_title")}</span>
              <p className="text-sm text-neutral-400 leading-relaxed font-mono">
                {t("services_list.note_body")}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right Column: List */}
        <div className="md:col-span-8">
          <ul className="flex flex-col">
            {services.map((service, index) => (
              <li key={service.id} className="border-b border-white/10 last:border-none">
                <Reveal delay={index * 0.1} width="100%">
                  <Link href={`/services/${service.slug}`}>
                    <div className="group py-12 md:py-16 flex flex-col md:flex-row gap-8 md:items-start transition-colors duration-500 hover:bg-white/[0.02] -mx-4 px-4 md:-mx-8 md:px-8 cursor-pointer">
                      <span className="text-xs font-mono text-[#D4FF00] pt-2">{service.id}</span>
                      <div className="flex-1">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#D4FF00] transition-colors flex items-center gap-3 break-words [word-break:break-word] hyphens-auto text-balance">
                          {t(`services_list.items.${service.key}.title`)}
                          {service.slug === 'build-optimize' && (
                             <span className="text-[10px] text-neutral-400 font-display font-medium uppercase tracking-widest border border-white/10 px-2 py-1 rounded-none">
                               Optional
                             </span>
                          )}
                        </h3>
                        <p className="text-neutral-400 max-w-xl leading-relaxed group-hover:text-neutral-300 transition-colors mb-4">
                          {t(`services_list.items.${service.key}.description`)}
                        </p>
                        <p className="text-xs md:text-sm font-mono text-neutral-500 max-w-2xl leading-relaxed tracking-tight group-hover:text-neutral-400 transition-colors">
                          {t(`services_list.items.${service.key}.output`)}
                        </p>
                      </div>
                      <div className="md:self-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#D4FF00]">
                           <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         </svg>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal>
            <div className="mt-8 mb-4 ml-0 md:ml-4 px-0">
              <Link href="/services" className="group/link inline-flex items-center text-[13px] text-[#D4FF00] hover:text-[#bce600] transition-colors border-b border-[#D4FF00]/30 hover:border-[#D4FF00] pb-[1px]">
                {language === 'pl' ? "Zobacz wszystkie produkty i modele współpracy" : "See all products and engagement models"}
                <span className="ml-1 inline-block transition-transform duration-200 group-hover/link:translate-x-[4px]">→</span>
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}