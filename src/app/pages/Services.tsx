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

// ─── Strategy offerings — start of end-to-end journey, 3 cards ──────
interface StrategyOffering {
  title: string;
  description: string;
  covers: string[];
  output: string;
  bestFor: string;
}

const STRATEGY_OFFERINGS_EN: StrategyOffering[] = [
  {
    title: "Brand Strategy & Positioning",
    description: "Define what you stand for, who you serve, and how you'll be remembered in your category — before any visual work begins.",
    covers: [
      "Competitive positioning vs 3-5 closest peers",
      "Brand narrative & messaging architecture",
      "Audience segmentation by stakeholder & vertical",
      "12-month brand activation roadmap",
    ],
    output: "One-page positioning doc + audience map + 12-month brand activation roadmap.",
    bestFor: "Multi-location brands rebranding, entering new markets, or repositioning after M&A.",
  },
  {
    title: "Operating Strategy",
    description: "Design the system before designing the assets — how creative ops scale across locations, teams, seasons and budgets.",
    covers: [
      "Workflow architecture (intake → approval → production → shipping)",
      "Governance & decision ownership across HQ vs local",
      "Capacity planning per location and per season",
      "Vendor & internal-team strategy",
    ],
    output: "Operating playbook + governance map + 90-day implementation roadmap.",
    bestFor: "Organizations scaling beyond single-location creative teams to 5-50+ locations.",
  },
  {
    title: "AI Strategy & Roadmap",
    description: "Decide where AI fits in your design and marketing operations — build vs buy, automation vs augmentation, risk vs reward.",
    covers: [
      "AI use case audit across current workflow",
      "Build / buy / partner decision framework",
      "Automation prioritization (which workflows first)",
      "Governance & risk model for AI-touched decisions",
    ],
    output: "AI strategy doc + phased 12-month roadmap + first 90-day pilot recommendation.",
    bestFor: "Teams considering AI workflow integration but unsure where to start or what's worth automating.",
  },
];

const STRATEGY_OFFERINGS_PL: StrategyOffering[] = [
  {
    title: "Strategia Marki & Pozycjonowanie",
    description: "Zdefiniuj za czym stoisz, dla kogo jesteś i jak chcesz być zapamiętany w swojej kategorii — zanim ruszą prace wizualne.",
    covers: [
      "Pozycjonowanie konkurencyjne vs 3-5 najbliższych graczy",
      "Brand narrative i architektura komunikatów",
      "Segmentacja audiencji per stakeholder i wertykał",
      "12-miesięczny roadmap aktywacji marki",
    ],
    output: "Jednostronicowy positioning doc + mapa audience + 12-miesięczny roadmap aktywacji marki.",
    bestFor: "Marki wielolokalizacyjne podczas rebranding'u, wejścia na nowe rynki lub repozycjonowania po M&A.",
  },
  {
    title: "Strategia Operacyjna",
    description: "Zaprojektuj system zanim zaprojektujesz assety — jak creative ops skalują się przez lokalizacje, zespoły, sezony i budżety.",
    covers: [
      "Architektura workflow (intake → akceptacja → produkcja → wysyłka)",
      "Governance i ownership decyzji HQ vs local",
      "Capacity planning per lokalizacja i per sezon",
      "Strategia dla vendor'ów i wewnętrznych zespołów",
    ],
    output: "Operating playbook + mapa governance + 90-dniowy roadmap wdrożenia.",
    bestFor: "Organizacje skalujące się z single-location creative team do 5-50+ lokalizacji.",
  },
  {
    title: "Strategia AI & Roadmap",
    description: "Zdecyduj gdzie AI pasuje w Waszych design/marketing ops — build vs buy, automation vs augmentation, ryzyko vs zwrot.",
    covers: [
      "Audyt use case'ów AI w obecnym workflow",
      "Framework decyzji build / buy / partner",
      "Priorytetyzacja automatyzacji (które workflow pierwsze)",
      "Governance i model risk dla decyzji AI-touched",
    ],
    output: "Dokument strategii AI + fazowany 12-miesięczny roadmap + rekomendacja pierwszego 90-day pilota.",
    bestFor: "Zespoły rozważające integrację AI workflow ale niepewne od czego zacząć lub co warto automatyzować.",
  },
];

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

      {/* Products Section (Accordion) — page opener, editorial style matched to Home */}
      {/* ─── Strategy — start of end-to-end customer journey ─── */}
      <section className="pt-32 md:pt-40 mb-32 md:mb-40">
        <Reveal>
          <div className="flex flex-col mb-16">
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
              {language === "pl" ? "01 · Strategia" : "01 · Strategy"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 leading-[0.95]">
              {language === "pl"
                ? "Najpierw decyzja. Potem dostawa."
                : "Decide first. Deliver second."}
            </h2>
            <p className="text-[15px] text-neutral-600 dark:text-[#888888] max-w-[640px] leading-relaxed">
              {language === "pl"
                ? "Strategia to fundament każdej współpracy — zanim coś zbudujemy, zrozumiemy CO ma być zbudowane i CZEMU. Trzy obszary strategiczne dla wielolokalizacyjnych organizacji."
                : "Strategy is the foundation of every engagement — before we build anything, we understand WHAT to build and WHY. Three strategic areas for multi-location organizations."}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-neutral-200 dark:border-white/10">
          {(language === "pl" ? STRATEGY_OFFERINGS_PL : STRATEGY_OFFERINGS_EN).map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className={`p-8 lg:p-10 h-full flex flex-col group ${i > 0 ? "border-t md:border-t-0 md:border-l border-neutral-200 dark:border-white/10" : ""}`}>
                {/* Number anchor */}
                <span className="font-display text-sm text-neutral-400 group-hover:text-[#D4FF00] dark:text-[#D4FF00] transition-colors mb-3 block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <h3 className="text-2xl md:text-[28px] font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-neutral-600 dark:text-[#888888] leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* What it covers */}
                <div className="mb-6 flex-1">
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-3">
                    {language === "pl" ? "Co obejmuje" : "What it covers"}
                  </h4>
                  <ul className="space-y-3">
                    {item.covers.map((c, idx) => (
                      <li key={idx} className="text-[14px] text-neutral-700 dark:text-[#e5e5e5] flex items-start gap-3">
                        <span className="w-1 h-1 rounded-none bg-neutral-900 dark:bg-[#D4FF00] mt-[8px] shrink-0" />
                        <span className="leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="border-neutral-200 dark:border-white/10 mb-6" />

                {/* Output */}
                <div className="mb-4">
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-2">
                    {language === "pl" ? "Wynik" : "Output"}
                  </h4>
                  <p className="text-[14px] text-neutral-900 dark:text-white font-medium leading-snug">
                    {item.output}
                  </p>
                </div>

                {/* Best for */}
                <div>
                  <h4 className="text-[11px] uppercase tracking-[1px] text-neutral-500 dark:text-[#D4FF00] mb-2">
                    {language === "pl" ? "Idealne dla" : "Best for"}
                  </h4>
                  <p className="text-[13px] text-neutral-600 dark:text-[#888888] leading-snug">
                    {item.bestFor}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Products — execution layer ─── */}
      <section className="mb-40 min-h-[600px]">
        <Reveal>
          <div className="flex flex-col mb-12">
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
              {language === "pl" ? "02 · Produkty" : "02 · Products"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6 leading-[0.95]">
              {language === "pl" ? "To co dostajesz." : "What you ship."}
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

          {/* Right: Try it now — via /brief */}
          <Reveal delay={0.2}>
            <div className="border-t border-neutral-200 dark:border-white/10 pt-8 space-y-10">
              <div>
                <span className="block text-[11px] uppercase tracking-[2px] text-[#D4FF00] font-display mb-6">
                  {language === "pl" ? "Wypróbuj teraz" : "Try it now"}
                </span>
                <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-snug">
                  {language === "pl"
                    ? "Wypełnij brief — doświadcz tego sam."
                    : "Fill a brief — experience it firsthand."}
                </h4>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                  {language === "pl"
                    ? "Wizard, który wypełnisz na /brief, działa na tym samym AI Brief Assistant. Zobacz jak zadaje właściwe pytania, ocenia jakość przed wysyłką i generuje strukturalny brief gotowy do produkcji w ~10 minut. Bez zobowiązań."
                    : "The wizard you'll fill at /brief runs on the same AI Brief Assistant. See how it asks the right questions, scores quality before submission, and generates a production-ready brief in ~10 minutes. No commitment."}
                </p>
              </div>

              {/* CTA — direct to brief */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-8 space-y-5">
                <Link
                  href="/brief"
                  className="group/link inline-flex items-center gap-3 text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-500"
                >
                  <span className="border-b-2 border-neutral-900 dark:border-white group-hover/link:border-[#D4FF00] transition-colors duration-500 pb-1">
                    {language === "pl" ? "Wypełnij brief" : "Start a brief"}
                  </span>
                  <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-2 text-xl">→</span>
                </Link>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-md italic">
                  {language === "pl"
                    ? "Chcesz wdrożyć assistant'a u siebie? Napisz: hello@r352.com — dla custom prompts, integracji i organizational training."
                    : "Want to deploy the assistant in your org? Reach out: hello@r352.com — for custom prompts, integrations and team training."}
                </p>
              </div>
            </div>
          </Reveal>
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