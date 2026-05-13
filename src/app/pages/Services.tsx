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

                           {/* Includes — bold section header + Tanker numbers */}
                           {card.includes && card.includes.length > 0 && (
                             <motion.div
                               initial={{ opacity: 0, y: 12 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                               className="mb-16 border-t border-neutral-200 dark:border-white/10 pt-10"
                             >
                               <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-10">
                                 {language === 'pl' ? "Obejmuje" : "Includes"}
                                 <span className="text-[#D4FF00] ml-2">.</span>
                               </h3>
                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-5xl">
                                 {card.includes.map((item, idx) => (
                                   <div key={idx} className="flex items-baseline gap-5 group/item">
                                     <span className="font-display text-sm md:text-base text-[#D4FF00] shrink-0 leading-none w-8">
                                       {String(idx + 1).padStart(2, '0')}
                                     </span>
                                     <span className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-snug font-medium group-hover/item:text-neutral-900 dark:group-hover/item:text-white transition-colors">
                                       {item}
                                     </span>
                                   </div>
                                 ))}
                               </div>
                             </motion.div>
                           )}

                           {/* Output — bold statement, no frame */}
                           <motion.div
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                             className="border-t border-neutral-200 dark:border-white/10 pt-10 mb-16 max-w-5xl"
                           >
                             <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
                               {language === 'pl' ? "Wynik" : "Output"}
                               <span className="text-[#D4FF00] ml-2">.</span>
                             </h3>
                             <p className="text-xl md:text-2xl lg:text-3xl text-neutral-900 dark:text-white font-bold tracking-tight leading-[1.2]">
                               {card.output}
                             </p>
                           </motion.div>

                           {/* CTA — bold magnetic-style link */}
                           <motion.div
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                             className="border-t border-neutral-200 dark:border-white/10 pt-10"
                           >
                             <Link
                               href={`/deliverables#${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                               className="group/link inline-flex items-center gap-4 text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-500"
                             >
                               <span className="border-b-2 border-neutral-900 dark:border-white group-hover/link:border-[#D4FF00] transition-colors duration-500 pb-1">
                                 {language === 'pl' ? "Pełna lista zasobów" : "Full deliverable list"}
                               </span>
                               <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-2 text-2xl">→</span>
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

      {/* ─── AI Brief Assistant — SaaS product section ─── */}
      <section id="ai-brief-assistant" className="mb-32 border-t border-neutral-200 dark:border-white/10 pt-24 md:pt-32 scroll-mt-24">
        <Reveal>
          <div className="flex flex-col mb-16">
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
              {language === "pl" ? "Produkt · SaaS" : "Product · SaaS"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 leading-[0.95]">
              {language === "pl" ? "AI Brief Assistant" : "AI Brief Assistant"}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 tracking-tight font-medium max-w-3xl leading-snug">
              {language === "pl"
                ? "Zamień niejasne requesty w gotowe briefy w 5 minut. Trenowane na 500+ realnych briefach z naszych projektów."
                : "Turn unclear requests into ready briefs in 5 minutes. Trained on 500+ real briefs from our projects."}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 md:gap-20">
          {/* Left: What it does */}
          <Reveal delay={0.1}>
            <div className="space-y-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6">
                  {language === "pl" ? "Co robi" : "What it does"}
                  <span className="text-[#D4FF00] ml-1">.</span>
                </h3>
                <ul className="space-y-4 max-w-2xl">
                  {(language === "pl" ? [
                    "Zadaje właściwe pytania, żeby uzupełnić brakujący kontekst briefa",
                    "Generuje ustrukturyzowany brief gotowy do produkcji (Definition of Ready)",
                    "Ocenia jakość briefa według checklist'y gotowości — 0–100 score przed wysyłką",
                    "Integruje się z Slack, Notion, Asana, email — request → brief w jednym flow",
                    "Uczy się Twojej organizacji: typologie requestów, stakeholder voice, brand language",
                  ] : [
                    "Asks the right questions to fill missing brief context",
                    "Generates a structured brief ready for production (against the Definition of Ready)",
                    "Scores brief quality against the readiness checklist — 0–100 before submission",
                    "Integrates with Slack, Notion, Asana, email — request → brief in one flow",
                    "Learns your organization: request typologies, stakeholder voice, brand language",
                  ]).map((item, i) => (
                    <li key={i} className="flex items-baseline gap-4 group/item">
                      <span className="font-display text-base text-[#D4FF00] shrink-0 w-8 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-snug font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-neutral-200 dark:border-white/10 pt-8">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4">
                  {language === "pl" ? "Dla kogo" : "Built for"}
                  <span className="text-[#D4FF00] ml-1">.</span>
                </h3>
                <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium max-w-2xl">
                  {language === "pl"
                    ? "Zespoły marketingu, brand i product, które dostają dziesiątki niejasnych requestów miesięcznie. Działa standalone albo jako warstwa wzmacniająca Twój Retainer / Operating Partner."
                    : "Marketing, brand and product teams that receive dozens of unclear requests every month. Works standalone or as a layer on top of your Retainer / Operating Partner."}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Availability + access */}
          <Reveal delay={0.2}>
            <div className="border-t border-neutral-200 dark:border-white/10 pt-8 space-y-10">
              <div>
                <span className="block text-[11px] uppercase tracking-[2px] text-[#D4FF00] font-display mb-6">
                  {language === "pl" ? "Dostępność" : "Availability"}
                </span>
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-snug">
                  {language === "pl" ? "Early access — by invitation." : "Early access — by invitation."}
                </h4>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  {language === "pl"
                    ? "Produkt w trakcie pilotażu z wybranymi organizacjami. Dostępny standalone albo jako warstwa nad Retainerem / Operating Partner."
                    : "Currently piloting with selected organizations. Available standalone or as a layer on top of Retainer / Operating Partner."}
                </p>
              </div>

              {/* CTA */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-8">
                <a
                  href="mailto:hello@r352.com?subject=AI%20Brief%20Assistant"
                  className="group/link inline-flex items-center gap-3 text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-500"
                >
                  <span className="border-b-2 border-neutral-900 dark:border-white group-hover/link:border-[#D4FF00] transition-colors duration-500 pb-1">
                    {language === "pl" ? "Poproś o early access" : "Request early access"}
                  </span>
                  <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-2 text-xl">→</span>
                </a>
              </div>
            </div>
          </Reveal>
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

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-neutral-200 dark:border-white/10">
          {deliveryOS.phases.map((phase, pi) => (
            <Reveal key={pi} delay={pi * 0.1}>
              <div className={`h-full flex flex-col ${pi > 0 ? 'border-t md:border-t-0 md:border-l border-neutral-200 dark:border-white/10' : ''}`}>
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

        {/* Best Fit — below Delivery OS, divider list */}
        <div className="mt-16 md:mt-24 border-t border-neutral-200 dark:border-white/10 pt-12">
          <Reveal>
            <h3 className="text-[11px] font-display uppercase tracking-widest text-neutral-800 dark:text-[#888888] mb-8">
              {bestFit.title}
            </h3>
            <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10 max-w-3xl">
              {bestFit.items.map((item, i) => (
                <li key={i} className="py-4 text-base md:text-lg text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                  {item}
                </li>
              ))}
            </ul>
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