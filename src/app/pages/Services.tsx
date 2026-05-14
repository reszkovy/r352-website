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

      {/* ─── Strategy — editorial opener, sets the WHY before WHAT ─── */}
      <section className="pt-32 md:pt-40 mb-32 md:mb-40">
        <Reveal>
          <div className="flex flex-col mb-12 md:mb-16">
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
              {language === "pl" ? "01 · Strategia" : "01 · Strategy"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-8 leading-[0.95]">
              {language === "pl"
                ? "Strategia. Egzekucja. Operacjonalizacja."
                : "Strategy. Execution. Operationalization."}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 tracking-tight font-medium max-w-3xl leading-snug">
              {language === "pl"
                ? "Zanim cokolwiek zbudujemy — ustalamy CO ma być zbudowane i CZEMU. Każda współpraca zaczyna się od trzech decyzji."
                : "Before we build anything — we settle WHAT to build and WHY. Every engagement starts with three decisions."}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-neutral-200 dark:border-white/10 pt-12 md:pt-16">
          <Reveal delay={0.05}>
            <div>
              <span className="font-display text-sm text-[#D4FF00] mb-4 block">01</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                {language === "pl" ? "Marka" : "Brand"}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pl"
                  ? "Pozycjonowanie, narrative i audience — co was odróżnia, kogo obsługujecie i jak chcecie być zapamiętani. Zanim zacznie się jakakolwiek praca wizualna."
                  : "Positioning, narrative and audience — what sets you apart, who you serve, how you want to be remembered. Before any visual work begins."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <span className="font-display text-sm text-[#D4FF00] mb-4 block">02</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                {language === "pl" ? "Operacje" : "Operations"}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pl"
                  ? "Workflow, governance i capacity — jak creative ops skalują się przez lokalizacje, zespoły i sezony. System zanim assety."
                  : "Workflow, governance and capacity — how creative ops scale across locations, teams and seasons. System before assets."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.19}>
            <div>
              <span className="font-display text-sm text-[#D4FF00] mb-4 block">03</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                {language === "pl" ? "AI" : "AI"}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pl"
                  ? "Build vs buy, automation vs augmentation, ryzyko vs zwrot. Gdzie AI faktycznie ma sens w Waszym workflow — i od czego zacząć."
                  : "Build vs buy, automation vs augmentation, risk vs reward. Where AI actually fits in your workflow — and where to start."}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 md:mt-20 pt-10 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-sm text-neutral-500 dark:text-neutral-500 max-w-md leading-relaxed">
              {language === "pl"
                ? "Strategia łączy się z każdym produktem niżej. Bez fundamentu wszystko poniżej to tylko ładne assety."
                : "Strategy connects to every product below. Without the foundation, everything below is just nice-looking assets."}
            </p>
            <Link
              href="/brief"
              className="group/link inline-flex items-center gap-3 text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-500 shrink-0"
            >
              <span className="border-b-2 border-neutral-900 dark:border-white group-hover/link:border-[#D4FF00] transition-colors duration-500 pb-1">
                {language === "pl" ? "Omów potrzebę strategiczną" : "Discuss your strategic need"}
              </span>
              <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-2 text-xl">→</span>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ─── Products — execution layer ─── */}
      <section className="mb-40 min-h-[600px]">
        <Reveal>
          <div className="flex flex-col mb-12">
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
              {language === "pl" ? "02 · Produkty" : "02 · Products"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 leading-[0.95]">
              {language === "pl" ? "Co dostarczamy." : "What we ship."}
            </h2>
          </div>
        </Reveal>

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

                        {/* Tanker number — small editorial accent */}
                        <span
                          className={`
                            font-display text-base md:text-lg lg:text-xl shrink-0 leading-none
                            transition-colors duration-500 self-start mt-3 md:mt-4
                            ${isActive
                              ? 'text-[#D4FF00]'
                              : 'text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00]'
                            }
                          `}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        {/* Title + plus indicator */}
                        <div className="flex-1 flex items-baseline justify-between gap-6 md:gap-8">
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

                          {/* Plus → cross indicator */}
                          <motion.span
                            animate={{ rotate: isActive ? 45 : 0 }}
                            transition={{ type: "spring", stiffness: 280, damping: 22 }}
                            className={`
                              w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-3xl md:text-4xl font-normal shrink-0
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
                         <div className="pb-20 px-4 sm:px-8 md:px-10 ml-0 md:ml-[40px] lg:ml-[50px]">
                           {/* Description — bold editorial lead */}
                           <motion.p
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                             className="text-2xl md:text-3xl text-neutral-800 dark:text-neutral-200 leading-[1.25] font-medium max-w-4xl mb-16 tracking-tight"
                           >
                             {card.description}
                           </motion.p>

                           {/* Output — single bold statement, no Includes detail */}
                           <motion.div
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                             className="border-t border-neutral-200 dark:border-white/10 pt-10 max-w-5xl"
                           >
                             <h3 className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-4">
                               {language === 'pl' ? "Wynik" : "Output"}
                             </h3>
                             <p className="text-xl md:text-2xl lg:text-3xl text-neutral-900 dark:text-white font-bold tracking-tight leading-[1.2]">
                               {card.output}
                             </p>
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

      {/* CTA */}
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