import { useState } from "react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ArrowDown } from "lucide-react";
import { Link } from "wouter";

export function Deliverables() {
  const { t, language } = useLanguage();
  const cards = (t("services_page.cards") as any[]) || [];
  
  // Track which product blocks have their "What's inside" accordion expanded
  // Only the first one (Brand System) is expanded by default
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0]));

  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <PageTransition className="pt-32 pb-32 px-6 md:px-12 w-full min-h-screen">
      <div className="max-w-[1200px] mx-auto">
        <section className="mb-32">
          <Reveal>
            <div className="mb-24">
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-tight mb-8">
                {t("services_page.deliverables.heading")}
              </h1>
              <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                {t("services_page.deliverables.label")}
              </p>
            </div>
          </Reveal>

          {/* Vertical Timeline Layout */}
          <div className="flex flex-col relative border-l border-neutral-200 dark:border-white/10 ml-[20px] md:ml-[100px] pl-[30px] md:pl-[80px] pt-4">
            {cards.map((item, i) => {
              const isExpanded = expandedItems.has(i);
              
              return (
                <Reveal key={i} delay={i * 0.1} className="group relative mb-32 md:mb-48 last:mb-0">
                  <div className="relative">
                    
                    {/* Timeline Node Square */}
                    <div className="absolute top-[8px] -left-[30px] md:-left-[80px] w-[24px] h-[24px] flex items-center justify-center bg-white dark:bg-[#0a0a0a] border border-neutral-300 dark:border-white/20 group-hover:border-neutral-400 dark:group-hover:border-[#D4FF00] group-hover:bg-neutral-50 dark:group-hover:bg-[#D4FF00]/10 transition-colors duration-300 transform -translate-x-1/2 z-10 rounded-none">
                       <span className="w-1.5 h-1.5 bg-[#D4FF00] rounded-none transition-colors duration-300" />
                    </div>
                    
                    {/* Number Label over the Node (visible md) */}
                    <span className="absolute top-[10px] -left-[80px] w-auto whitespace-nowrap transform -translate-x-full pr-8 font-mono text-[13px] text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-[#D4FF00] transition-colors hidden md:block">
                      0{i + 1}
                    </span>

                    {/* Mobile Number Label */}
                    <span className="block md:hidden font-mono text-[12px] text-neutral-900 dark:text-[#D4FF00] mb-6">
                      0{i + 1}
                    </span>

                    {/* Title and Description */}
                    <div id={item.title.toLowerCase().replace(/\s+/g, '-')} className="mb-10 scroll-mt-32">
                      <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 group-hover:text-neutral-600 dark:group-hover:text-[#D4FF00] transition-colors">{item.title}</h2>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl text-lg md:text-xl">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Delivery Steps Container */}
                    <div className="border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0A0A0A] p-6 md:p-10 hover:border-neutral-300 dark:hover:border-white/20 transition-colors relative z-0 rounded-none">
                       
                       {/* Internal Step 1 & 2: Input / Content */}
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                          {/* Left: Includes */}
                          <div>
                             <span className="flex items-center gap-3 text-[11px] font-display uppercase tracking-[1.5px] text-neutral-500 mb-6">
                                <div className="w-5 h-5 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center font-mono text-[9px] text-neutral-900 dark:text-white rounded-none">1</div>
                                {t("services_page.deliverables.includes_label")}
                             </span>
                             <ul className="space-y-4">
                                {item.includes?.map((inc: string, j: number) => (
                                  <li key={j} className="text-[14px] text-neutral-700 dark:text-neutral-300 flex items-start gap-4">
                                     <span className="w-1.5 h-1.5 bg-[#D4FF00] mt-[8px] shrink-0 rounded-none" />
                                     {inc}
                                  </li>
                                ))}
                             </ul>
                          </div>

                          {/* Right: What's inside (Accordion) */}
                          <div>
                             <span className="flex items-center gap-3 text-[11px] font-display uppercase tracking-[1.5px] text-neutral-500 mb-6">
                                <div className="w-5 h-5 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center font-mono text-[9px] text-neutral-900 dark:text-white rounded-none">2</div>
                                {language === 'pl' ? "Zasoby" : "Assets"}
                             </span>
                             
                             <button 
                               onClick={() => toggleExpand(i)}
                               className="flex items-center justify-between w-full p-4 border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#141414] hover:bg-neutral-50 dark:hover:bg-[#1a1a1a] hover:border-neutral-400 dark:hover:border-[#D4FF00]/50 transition-colors text-left group/btn rounded-none outline-none focus-visible:border-neutral-400 dark:focus-visible:border-[#D4FF00]"
                             >
                               <span className="text-[13px] text-neutral-700 dark:text-neutral-300 group-hover/btn:text-neutral-900 dark:group-hover/btn:text-white transition-colors">
                                  {language === 'pl' ? "Zobacz pełną listę zasobów" : "See full deliverable list"}
                               </span>
                               <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                                  className="w-6 h-6 border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 flex items-center justify-center rounded-none"
                               >
                                  <ChevronDown size={14} className="text-neutral-900 dark:text-[#D4FF00]" />
                               </motion.div>
                             </button>

                             <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                     initial={{ height: 0, opacity: 0 }}
                                     animate={{ height: "auto", opacity: 1 }}
                                     exit={{ height: 0, opacity: 0 }}
                                     transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                                     className="overflow-hidden rounded-none"
                                  >
                                     <div className="p-4 border-x border-b border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0a0a0a] rounded-none">
                                        <ul className="flex flex-col space-y-1">
                                           {item.whats_inside?.map((inc: string, j: number) => (
                                              <li key={j} className="text-[13px] text-neutral-600 dark:text-neutral-400 flex items-start gap-4 py-2 border-b border-neutral-100 dark:border-white/5 last:border-b-0">
                                                 <span className="w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-600 mt-[8px] shrink-0 rounded-none group-hover:bg-[#D4FF00] transition-colors" />
                                                 {inc}
                                              </li>
                                           ))}
                                        </ul>
                                     </div>
                                  </motion.div>
                                )}
                             </AnimatePresence>
                          </div>
                       </div>

                       {/* Divider / Arrow Connector to Output */}
                       <div className="relative flex items-center justify-center mt-12 mb-8">
                          <div className="absolute w-full h-[1px] bg-neutral-200 dark:bg-white/10 left-0"></div>
                          <div className="relative bg-white dark:bg-[#0A0A0A] px-4">
                             <div className="w-8 h-8 border border-neutral-300 dark:border-white/20 flex items-center justify-center bg-white dark:bg-[#141414] rounded-none group-hover:border-neutral-400 dark:group-hover:border-[#D4FF00]/50 transition-colors">
                                <ArrowDown size={14} className="text-neutral-900 dark:text-[#D4FF00]" />
                             </div>
                          </div>
                       </div>

                       {/* Internal Step 3: Output */}
                       <div className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-[#D4FF00]/20 rounded-none py-6 px-6 md:px-8 relative group-hover:border-neutral-400 dark:group-hover:border-[#D4FF00]/40 transition-colors">
                           <span className="flex items-center gap-3 text-[11px] font-display uppercase tracking-[1.5px] text-neutral-900 dark:text-[#D4FF00] mb-5">
                              <div className="w-5 h-5 bg-neutral-100 dark:bg-[#D4FF00]/10 border border-neutral-200 dark:border-[#D4FF00]/30 flex items-center justify-center font-mono text-[9px] text-neutral-900 dark:text-[#D4FF00] rounded-none">3</div>
                              {t("services_page.deliverables.output_label")}
                           </span>
                           <p className="text-[15px] md:text-[16px] text-neutral-900 dark:text-white font-medium leading-relaxed max-w-3xl">{item.output}</p>
                       </div>

                       {/* Best For */}
                       <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-baseline border-t border-neutral-200 dark:border-white/10 pt-6">
                           <span className="text-[11px] font-display uppercase tracking-[1.5px] text-neutral-400 shrink-0">
                              {language === 'pl' ? "Dla kogo" : "Best for"}
                           </span>
                           <span className="text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              {item.best_for}
                           </span>
                       </div>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Add CTA to Services Engagement Models */}
          <div className="mt-32 border-t border-black/10 dark:border-white/10 pt-24 pb-12 relative z-50 pointer-events-auto flex flex-col items-center justify-center text-center gap-8">
            <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
               {language === 'pl' ? "Gotowy do rozpoczęcia?" : "Ready to start?"}
            </span>
            <Link 
               href="/services#engagement-models" 
               className="group relative inline-block cursor-pointer pointer-events-auto"
            >
               <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-transparent group-hover:text-stroke-black dark:group-hover:text-stroke-white group-hover:text-stroke-1">
                  {language === 'pl' ? "Zobacz modele współpracy" : "See how we work together"}
               </span>
               <span className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-sm">
                  {language === 'pl' ? "Zobacz modele współpracy" : "See how we work together"}
               </span>
               <span className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#D4FF00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {language === 'pl' ? "Zobacz modele współpracy" : "See how we work together"}
               </span>
            </Link>
          </div>

        </section>
      </div>
    </PageTransition>
  );
}