import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { EngagementModels } from "@/app/components/services/EngagementModels";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCard {
  title: string;
  description: string;
  output: string;
  includes?: string[];
}

export function Services() {
  const { t, language } = useLanguage();
  
  // Cast to specific types to avoid TS errors
  const cards = (t('services_page.cards') || []) as ServiceCard[];
  const deliveryOS = (t('services_page.delivery_os') || { title: "", subtitle: "", phases: [] }) as {
    title: string; subtitle: string; phases: { label: string; title: string; docs: { name: string; desc: string }[] }[]
  };
  const bestFit = (t('services_page.best_fit') || { title: "", items: [] }) as { title: string, items: string[] };

  // Active state for the accordion
  const [activeIndex, setActiveIndex] = useState(0);

  // If cards are not loaded yet, don't crash
  if (!cards.length) return null;

  const getPillarTags = (index: number) => {
    switch (index) {
      case 0: return ["02 Design & Production"];
      case 1: return ["02 Design & Production"];
      case 2: return ["01 Operating System", "02 Design & Production"];
      case 3: return ["02 Design & Production", "03 Build & Optimize"];
      case 4: return ["02 Design & Production"];
      case 5: return ["01 Operating System", "02 Design & Production"];
      default: return [];
    }
  };

  return (
    <PageTransition className="pt-32 pb-32 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      
      {/* 1. Header Section */}
      <div className="py-32 border-b border-neutral-200 dark:border-white/10 mb-24">
        <Reveal>
          <div className="max-w-4xl">
            <span className="block text-[11px] font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-8">
              {t('services_page.title')}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-12 leading-[0.9]">
              {t('services_page.hero_title')}
            </h1>
            <div className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-400 leading-relaxed max-w-2xl">
              <p>
                {t('services_page.hero_subtitle')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 2. Products Section (Accordion) */}
      <section className="mb-40 min-h-[600px]">
        <Reveal>
           <h2 className="text-[11px] font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-12">
             {language === 'pl' ? "Produkty" : "Products"}
           </h2>
        </Reveal>
        
        <div className="flex flex-col border-t border-neutral-200 dark:border-white/10">
          {cards.map((card, index) => {
             const isActive = index === activeIndex;
             return (
               <Reveal key={index} delay={index * 0.05}>
                 <div className="flex flex-col border-b border-neutral-200 dark:border-white/10">
                   <button 
                     onClick={() => setActiveIndex(isActive ? -1 : index)}
                     className={`w-full group cursor-pointer py-8 text-left outline-none transition-colors duration-300 hover:bg-neutral-50 dark:hover:bg-white/[0.02] focus-visible:bg-neutral-50 dark:focus-visible:bg-white/[0.02] ${isActive ? 'bg-neutral-50 dark:bg-white/[0.02]' : ''}`}
                   >
                     <div className="flex flex-col gap-4 px-4 sm:px-6">
                        
                        {/* Header Row: Title, Badges, Number */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
                           <span className={`text-[24px] font-semibold transition-colors duration-300 shrink-0 ${isActive ? 'text-neutral-900 dark:text-[#e5e5e5]' : 'text-neutral-800 dark:text-[#e5e5e5] group-hover:text-neutral-900 dark:group-hover:text-white'}`}>
                             {card.title}
                           </span>
                           
                           <div className="flex flex-row items-start sm:items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                             <div className="flex flex-wrap sm:justify-end items-center gap-2">
                               {getPillarTags(index).map((tag, i) => (
                                 <span key={i} className="px-2 py-0.5 rounded-none border border-neutral-200 dark:border-white/15 text-[11px] text-neutral-800 dark:text-[#888888] uppercase tracking-[0.5px] transition-colors group-hover:border-neutral-400 dark:group-hover:border-white/30">
                                   {tag}
                                 </span>
                               ))}
                             </div>
                             <span className={`text-[13px] font-mono transition-colors duration-300 shrink-0 ${isActive ? 'text-neutral-900 dark:text-[#D4FF00]' : 'text-neutral-600 dark:text-[#D4FF00] group-hover:text-neutral-900 dark:group-hover:text-[#D4FF00]'}`}>
                               0{index + 1}
                             </span>
                           </div>
                        </div>
                        
                        {/* Description (visible even when closed) */}
                        <p className="text-[14px] text-neutral-800 dark:text-[#888888] max-w-[500px] mt-1 leading-relaxed text-left">
                          {card.description}
                        </p>
                     </div>
                   </button>

                   <AnimatePresence>
                     {isActive && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.3 }}
                         className="overflow-hidden"
                       >
                         <div className="pt-4 pb-10 px-4 sm:px-6">
                           {/* Includes List */}
                           {card.includes && card.includes.length > 0 && (
                             <div className="mb-10 mt-4 space-y-5">
                               <h3 className="text-[11px] font-display uppercase tracking-[1.5px] text-neutral-800 dark:text-[#888888]">
                                 {language === 'pl' ? "Obejmuje" : "Includes"}
                               </h3>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 max-w-4xl">
                                 {card.includes.map((item, idx) => (
                                   <div key={idx} className="flex items-start gap-3 group">
                                     <div className="mt-2 w-1 h-1 rounded-none bg-neutral-900 dark:bg-[#D4FF00] shrink-0" />
                                     <span className="text-[14px] text-neutral-900 dark:text-[#e5e5e5] leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                                       {item}
                                     </span>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}

                           {/* Output Box */}
                           <div className="bg-neutral-100 dark:bg-[#141414] border border-neutral-200 dark:border-white/10 rounded-none px-[28px] py-[24px] flex flex-col md:flex-row md:items-center gap-6 mt-6 max-w-4xl">
                              <span className="text-neutral-800 dark:text-[#888888] text-[11px] font-display uppercase tracking-[1.5px] shrink-0">
                                {language === 'pl' ? "Wynik" : "Output"}
                              </span>
                              <span className="text-neutral-900 dark:text-[#e5e5e5] font-mono text-[15px] font-medium leading-snug">
                                {card.output}
                              </span>
                           </div>

                           {/* Cross-Link to Deliverables */}
                           <div className="mt-[12px]">
                             <Link href={`/deliverables#${card.title.toLowerCase().replace(/\s+/g, '-')}`} className="group/link inline-flex items-center text-[13px] text-neutral-800 dark:text-[#D4FF00] hover:text-black dark:hover:text-[#bce600] transition-colors border-b border-neutral-300 dark:border-[#D4FF00]/30 hover:border-black dark:hover:border-[#D4FF00] pb-[1px]">
                               {language === 'pl' ? "Zobacz pełną listę zasobów" : "See full deliverable list"}
                               <span className="ml-1 inline-block transition-transform duration-200 group-hover/link:translate-x-[4px]">→</span>
                             </Link>
                           </div>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               </Reveal>
             );
          })}
        </div>
      </section>

      {/* NEW: Engagement Models Section */}
      <EngagementModels />

      {/* 3. Delivery Operating System */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-24 md:pt-32">
        <Reveal>
          <h2 className="text-[11px] font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4 flex items-center gap-4">
            <span className="w-8 h-px bg-neutral-300 dark:bg-[#D4FF00]"></span>
            {deliveryOS.title}
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mb-16">
            {deliveryOS.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {deliveryOS.phases.map((phase, pi) => (
            <Reveal key={pi} delay={pi * 0.1}>
              <div className={`border border-neutral-200 dark:border-white/10 ${pi > 0 ? 'md:-ml-px' : ''} -mt-px md:mt-0 h-full flex flex-col`}>
                {/* Phase label — fixed height */}
                <div className="px-8 md:px-10 pt-8 md:pt-10 pb-6">
                  <span className="block text-[11px] font-display uppercase tracking-widest text-neutral-400 dark:text-[#D4FF00]">
                    {phase.label}
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-8 md:mx-10 border-t border-neutral-200 dark:border-white/10" />

                {/* How it works — docs list */}
                <div className="px-8 md:px-10 pt-6 pb-4">
                  <span className="block text-[10px] font-display uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-600 mb-5">
                    {language === 'pl' ? 'Jak to działa' : 'How it works'}
                  </span>
                  <div className="space-y-5">
                    {phase.docs.map((doc, di) => (
                      <div key={di} className="group">
                        <div className="flex items-start gap-3">
                          <span className="text-neutral-400 dark:text-[#D4FF00] text-xs mt-1.5 shrink-0">●</span>
                          <div>
                            <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-1">{doc.name}</h4>
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">{doc.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer to push timeline to bottom */}
                <div className="flex-grow" />

                {/* Divider */}
                <div className="mx-8 md:mx-10 border-t border-neutral-200 dark:border-white/10" />

                {/* Timeline — fixed at bottom */}
                <div className="px-8 md:px-10 py-6">
                  <span className="block text-[10px] font-display uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-600 mb-2">
                    {language === 'pl' ? 'Czas trwania' : 'Timeline'}
                  </span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">
                    {pi === 0 ? (language === 'pl' ? '1-2 tygodnie' : '1-2 weeks') : pi === 1 ? (language === 'pl' ? 'W toku' : 'Ongoing') : (language === 'pl' ? '1 tydzień' : '1 week')}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Best Fit — below Delivery OS */}
        <div className="mt-16 md:mt-24">
          <Reveal>
            <h3 className="text-[11px] font-display uppercase tracking-widest text-neutral-800 dark:text-[#888888] mb-8">
              {bestFit.title}
            </h3>
            <div className="flex flex-wrap gap-4">
              {bestFit.items.map((item, i) => (
                <span key={i} className="px-5 py-3 border border-neutral-200 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-white/30 transition-colors">
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      
      {/* 4. CTA */}
      <section className="mt-32 border-t border-neutral-200 dark:border-white/10 pt-24 pb-32 relative z-50 pointer-events-auto">
        <Reveal>
           <div className="flex flex-col items-center justify-center text-center gap-8">
             <span className="text-xs font-display uppercase tracking-widest text-neutral-800">
               {language === 'pl' ? "Gotowy rozpocząć projekt?" : "Ready to start a project?"}
             </span>
             <Link 
                href="/contact"
                className="group relative inline-block cursor-pointer pointer-events-auto"
             >
                <span className="text-5xl md:text-8xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                   {language === 'pl' ? "Rozpocznij rozmowę" : "Start conversation"}
                </span>
                <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                   {language === 'pl' ? "Rozpocznij rozmowę" : "Start conversation"}
                </span>
                <span className="absolute inset-0 text-5xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   {language === 'pl' ? "Rozpocznij rozmowę" : "Start conversation"}
                </span>
             </Link>
           </div>
        </Reveal>
      </section>

    </PageTransition>
  );
}