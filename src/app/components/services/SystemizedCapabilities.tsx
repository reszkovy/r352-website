import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Workflow, Sparkles } from "lucide-react";

export function SystemizedCapabilities() {
  const { t, language } = useLanguage();
  
  const content = (t('services_list') || { 
    heading: "", 
    note_title: "", 
    note_body: "", 
    narrative: "",
    narrative_process: "",
    narrative_ai: "",
    items: {} 
  }) as any;

  const items = [
    { id: "01", ...content.items?.["01"] },
    { id: "02", ...content.items?.["02"] },
    { id: "03", ...content.items?.["03"], optional: true }
  ];

  return (
    <section className="py-24 md:py-32 border-b border-white/10">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Left Column */}
          <div className="flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <Reveal>
                <h2 className="text-4xl md:text-7xl font-medium tracking-tighter text-white leading-[0.9] mb-12">
                  {content.heading}
                </h2>
              </Reveal>

              {/* Process + AI Narrative */}
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-3 mb-12">
                  <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#D4FF00]/40 transition-colors duration-500">
                      <Workflow className="w-3.5 h-3.5 text-[#D4FF00]" />
                    </div>
                    <span className="text-sm text-neutral-400 font-mono tracking-wide group-hover:text-neutral-300 transition-colors">
                      {content.narrative_process}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#D4FF00]/40 transition-colors duration-500">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                    </div>
                    <span className="text-sm text-neutral-400 font-mono tracking-wide group-hover:text-neutral-300 transition-colors">
                      {content.narrative_ai}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="border border-white/10 p-8 max-w-md bg-[#111]">
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-500 mb-6">
                  {content.note_title}
                </span>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {content.note_body}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {items.map((item: any, index: number) => (
              <Reveal key={item.id} delay={0.3 + (index * 0.1)} width="100%">
                <div className={`py-12 border-b border-white/10 ${index === 0 ? 'border-t lg:border-t-0' : ''}`}>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                    <span className="text-[#D4FF00] font-mono text-sm shrink-0 mt-2">
                      {item.id}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight">
                          {item.title}
                        </h3>
                        {item.optional && (
                          <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] font-display uppercase tracking-widest text-neutral-400">
                            {language === 'pl' ? 'Opcjonalne' : 'Optional'}
                          </span>
                        )}
                      </div>
                      <p className="text-xl text-neutral-500 mb-4">
                        {item.description}
                      </p>
                      <p className="text-sm font-mono text-neutral-500/80 leading-relaxed tracking-tight max-w-2xl">
                        {item.output}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}