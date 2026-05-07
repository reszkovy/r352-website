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

  // Active state for the accordion — null = all collapsed by default
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    <PageTransition className="pb-32 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">

      {/* Products Section (Accordion) — page opener, editorial style matched to Home */}
      <section className="pt-32 md:pt-40 mb-40 min-h-[600px]">

        <div className="flex flex-col border-t border-neutral-200 dark:border-white/10">
          {cards.map((card, index) => {
             const isActive = index === activeIndex;
             return (
               <Reveal key={index} delay={index * 0.05}>
                 <div className="relative flex flex-col border-b border-neutral-200 dark:border-white/10">
                   {/* Lime accent bar — slides in when active */}
                   <AnimatePresence>
                     {isActive && (
                       <motion.div
                         layoutId="servicesActiveAccent"
                         className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#D4FF00] z-10"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                         transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.9 }}
                       />
                     )}
                   </AnimatePresence>

                   <button
                     onClick={() => setActiveIndex(isActive ? null : index)}
                     className={`
                       w-full group cursor-pointer py-10 md:py-12 text-left outline-none
                       transition-colors duration-500 ease-out
                       hover:bg-neutral-50 dark:hover:bg-white/[0.02]
                       focus-visible:bg-neutral-50 dark:focus-visible:bg-white/[0.02]
                       ${isActive ? 'bg-neutral-50 dark:bg-white/[0.02]' : ''}
                     `}
                   >
                     <div className="flex items-baseline gap-6 md:gap-10 px-4 sm:px-8 md:px-10">

                        {/* Mono number — big, lime when active */}
                        <span
                          className={`
                            font-mono text-[13px] md:text-[15px] tracking-wide shrink-0
                            transition-colors duration-500 mt-3 md:mt-4 self-start
                            ${isActive
                              ? 'text-[#D4FF00]'
                              : 'text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00]'
                            }
                          `}
                        >
                          0{index + 1}
                        </span>

                        {/* Title block + tags + arrow */}
                        <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 md:gap-8">
                          <h2
                            className={`
                              text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05]
                              transition-all duration-500 ease-out
                              ${isActive
                                ? 'text-neutral-900 dark:text-white'
                                : 'text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:tracking-tight'
                              }
                            `}
                          >
                            {card.title}
                          </h2>

                          <div className="flex items-center gap-4 shrink-0 self-end md:self-auto">
                            <div className="flex flex-wrap items-center gap-2">
                              {getPillarTags(index).map((tag, i) => (
                                <span
                                  key={i}
                                  className={`
                                    px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-display
                                    transition-colors duration-500
                                    ${isActive
                                      ? 'border border-[#D4FF00]/40 text-[#D4FF00]'
                                      : 'border border-neutral-200 dark:border-white/15 text-neutral-500 dark:text-neutral-500 group-hover:border-[#D4FF00]/40 group-hover:text-[#D4FF00]'
                                    }
                                  `}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Plus → cross indicator */}
                            <motion.span
                              animate={{ rotate: isActive ? 45 : 0 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className={`
                                w-9 h-9 flex items-center justify-center text-2xl font-light shrink-0
                                transition-colors duration-500
                                ${isActive
                                  ? 'text-[#D4FF00]'
                                  : 'text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00]'
                                }
                              `}
                              aria-hidden="true"
                            >
                              +
                            </motion.span>
                          </div>
                        </div>
                     </div>
                   </button>

                   <AnimatePresence initial={false}>
                     {isActive && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{
                           height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                           opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                         }}
                         className="overflow-hidden"
                       >
                         <div className="pb-16 px-4 sm:px-8 md:px-10 ml-0 md:ml-[60px]">
                           {/* Description — large, editorial */}
                           <motion.p
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                             className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-400 leading-relaxed font-light max-w-3xl mb-12 tracking-tight"
                           >
                             {card.description}
                           </motion.p>

                           {/* Includes — editorial 2-col with lime accent lines */}
                           {card.includes && card.includes.length > 0 && (
                             <motion.div
                               initial={{ opacity: 0, y: 12 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                               className="mb-12"
                             >
                               <div className="flex items-center gap-4 mb-8">
                                 <span className="w-8 h-px bg-[#D4FF00]" />
                                 <h3 className="text-[11px] font-display uppercase tracking-[0.2em] text-[#D4FF00]">
                                   {language === 'pl' ? "Obejmuje" : "Includes"}
                                 </h3>
                               </div>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 max-w-5xl">
                                 {card.includes.map((item, idx) => (
                                   <div key={idx} className="flex items-baseline gap-3 group/item">
                                     <span className="text-[#D4FF00] text-[13px] font-mono shrink-0 mt-1">
                                       {String(idx + 1).padStart(2, '0')}
                                     </span>
                                     <span className="text-[15px] md:text-base text-neutral-800 dark:text-neutral-300 leading-relaxed group-hover/item:text-neutral-900 dark:group-hover/item:text-white transition-colors">
                                       {item}
                                     </span>
                                   </div>
                                 ))}
                               </div>
                             </motion.div>
                           )}

                           {/* Output — inline editorial, no boxy frame */}
                           <motion.div
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                             className="border-t border-neutral-200 dark:border-white/10 pt-6 mb-8 max-w-5xl"
                           >
                             <div className="flex items-center gap-4 mb-3">
                               <span className="w-8 h-px bg-[#D4FF00]" />
                               <span className="text-[11px] font-display uppercase tracking-[0.2em] text-[#D4FF00]">
                                 {language === 'pl' ? "Wynik" : "Output"}
                               </span>
                             </div>
                             <span className="block text-lg md:text-xl text-neutral-900 dark:text-white font-mono leading-snug">
                               {card.output}
                             </span>
                           </motion.div>

                           {/* CTA Link */}
                           <motion.div
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                           >
                             <Link
                               href={`/deliverables#${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                               className="group/link inline-flex items-center gap-3 text-sm font-display uppercase tracking-[0.2em] text-neutral-900 dark:text-white border-b border-neutral-300 dark:border-white/20 hover:border-[#D4FF00] dark:hover:border-[#D4FF00] hover:text-[#D4FF00] dark:hover:text-[#D4FF00] pb-2 transition-all duration-500"
                             >
                               {language === 'pl' ? "Pełna lista zasobów" : "Full deliverable list"}
                               <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-2">→</span>
                             </Link>
                           </motion.div>
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