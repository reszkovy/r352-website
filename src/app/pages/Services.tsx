import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { SectionWatermark } from "@/app/components/ui/SectionWatermark";
import { EngagementModels } from "@/app/components/services/EngagementModels";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

interface ServiceCard {
  title: string;
  description: string;
  output: string;
  includes?: string[];        // main deliverables shown in expand state
  whats_inside?: string[];    // sub-detail (lives on /deliverables, not duplicated here)
  best_for?: string;          // 1-line audience filter shown after output
}

// ─── Pre-purchase FAQ ─────────────────────────────────────────────────
// The five questions a buyer asks before committing to any of the five
// engagement models. Answers use ONLY facts already published on this page
// and /faq (pricing ranges, guarantees, timelines, handoff scope).
// Rendered below EngagementModels + mirrored as FAQPage JSON-LD in <Helmet>.
const SERVICES_FAQ: { q: { en: string; pl: string }; a: { en: string; pl: string } }[] = [
  {
    q: {
      en: "What's the difference between the five engagement models?",
      pl: "Czym różni się pięć modeli współpracy?",
    },
    a: {
      en: "They map to problem maturity. Diagnostic (5 working days) finds the problem. Sprint (4-6 weeks, fixed scope) ships one working part of the system. Retainer (30-day notice) covers ongoing production. Enterprise Sprint (12-16 weeks) implements a full Creative Operating System for multi-location organizations. Operating Partner (12-month minimum) is an embedded strategic role. If several fit, start with the smallest engagement.",
      pl: "Mapują się na dojrzałość problemu. Diagnostic (5 dni roboczych) znajduje problem. Sprint (4-6 tygodni, fixed scope) dostarcza jedną działającą część systemu. Retainer (30-day notice) pokrywa bieżącą produkcję. Enterprise Sprint (12-16 tygodni) wdraża pełny Creative Operating System dla organizacji multi-location. Operating Partner (12-miesięczne minimum) to embedded rola strategiczna. Jeśli pasuje kilka - zacznij od najmniejszego engagementu.",
    },
  },
  {
    q: {
      en: "What if the Diagnostic doesn't work for us?",
      pl: "Co jeśli Diagnostic u nas nie zadziała?",
    },
    a: {
      en: "The Diagnostic carries a 60-day money-back guarantee: if the recommendations are not actionable within 60 days, you get your money back. There's also no commitment to build - you receive a written report with root causes and a prioritized action plan, and you can run the fixes yourself or engage us for the next phase.",
      pl: "Diagnostic ma 60-day money-back guarantee: jeśli rekomendacje nie są actionable w ciągu 60 dni, dostajesz zwrot pieniędzy. Nie ma też zobowiązania do budowy - dostajesz pisemny raport z root causes i spriorytetyzowanym action planem, a fixy możesz wdrożyć samodzielnie albo zaangażować nas do kolejnej fazy.",
    },
  },
  {
    q: {
      en: "How fast can we start?",
      pl: "Jak szybko możemy wystartować?",
    },
    a: {
      en: "The Diagnostic starts with a 60-minute kickoff, scheduled within 1-2 weeks, and runs 5 working days. A Sprint starts from a scoping call and delivers in 4-6 weeks - versus a typical 12-16 weeks in-house. Every engagement is scoped upfront, so the timeline is fixed before kickoff, not discovered along the way.",
      pl: "Diagnostic zaczyna się od 60-minutowego kickoffu, planowanego w 1-2 tygodnie, i trwa 5 dni roboczych. Sprint startuje od scoping callu i dostarcza w 4-6 tygodni - versus typowe 12-16 tygodni in-house. Każdy engagement jest scope'owany z góry, więc timeline jest ustalony przed kickoffem, nie odkrywany po drodze.",
    },
  },
  {
    q: {
      en: "How is pricing handled?",
      pl: "Jak ustalana jest cena?",
    },
    a: {
      en: "Pricing is set in the scoping call, individually per engagement. Final scope, location count, and implementation depth determine where you land - set before kickoff, not discovered along the way. The Diagnostic carries a 60-day money-back guarantee if the recommendations aren't actionable.",
      pl: "Cena jest ustalana w scoping callu, indywidualnie per engagement. Finalny scope, liczba lokalizacji i głębokość wdrożenia decydują gdzie wylądujesz - ustalane przed kickoffem, nie odkrywane po drodze. Diagnostic ma 60-day money-back guarantee jeśli rekomendacje nie są actionable.",
    },
  },
  {
    q: {
      en: "What do we actually keep after the engagement ends?",
      pl: "Co faktycznie zostaje u nas po zakończeniu współpracy?",
    },
    a: {
      en: "A complete deliverable, not a pitch deck. Sprint handoff includes everything your team needs to run the system forward. Enterprise Sprint adds complete system documentation, team training, and a 90-day transition plan. The deliverables are working tools your team uses after we're gone - you buy the system, not the hours.",
      pl: "Kompletny deliverable, nie pitch deck. Handoff Sprintu zawiera wszystko, czego Wasz zespół potrzebuje, żeby prowadzić system dalej. Enterprise Sprint dodaje pełną dokumentację systemu, szkolenie zespołu i 90-dniowy plan przejściowy. Deliverables to działające narzędzia, których zespół używa po naszym wyjściu - kupujecie system, nie godziny.",
    },
  },
];

export function Services() {
  const { t, language } = useLanguage();

  // SectionWatermark now uses framer-motion's native useScroll (no GSAP) -
  // useLenisGsap bridge no longer needed for the watermark parallax.

  // Cast to specific types to avoid TS errors
  const cards = (t('services_page.cards') || []) as ServiceCard[];

  // Active state for the accordion - null = all collapsed by default
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Explicit expanded-state mirror for aria-expanded on the FAQ <details>
  // (same Safari/VoiceOver hardening pattern as FAQ.tsx).
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  // If cards are not loaded yet, don't crash
  if (!cards.length) return null;

  // FAQPage JSON-LD - mirrors the on-page pre-purchase FAQ section below
  // (schema/content parity). react-helmet-async does not render <script>
  // inside fragments - it must be a direct child of <Helmet> (see Process.tsx).
  const servicesFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": SERVICES_FAQ.map((item) => ({
      "@type": "Question",
      "name": item.q[language],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a[language],
      },
    })),
  };

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
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1800px] mx-auto min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(servicesFaqSchema)}
        </script>
      </Helmet>

      {/* ─── Strategy - editorial opener, sets the WHY before WHAT ─── */}
      <SectionWatermark number="01" align="right">
      <section className="pt-32 md:pt-40 mb-32 md:mb-40">
        <Reveal>
          <div className="flex flex-col mb-12 md:mb-16">
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
              {language === "pl" ? "01 · Strategia" : "01 · Strategy"}
            </span>
            {/* Hero - matches Process/Journal master copy: bold + tracking-tighter + 2-line break. */}
            <h2 className="text-5xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 leading-[0.95]">
              {language === "pl" ? (
                <>
                  Strategia. Egzekucja.<br className="hidden md:block" />
                  {" "}Operacje.
                </>
              ) : (
                <>
                  Strategy. Execution.<br className="hidden md:block" />
                  {" "}Operations.
                </>
              )}
            </h2>
            <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 tracking-tight font-normal max-w-3xl leading-snug">
              {language === "pl" ? (
                <>
                  Zanim cokolwiek zbudujemy - ustalamy CO ma być zbudowane i CZEMU.
                  <br />
                  Każda współpraca zaczyna się od trzech decyzji.
                </>
              ) : (
                <>
                  Before we build anything - we settle WHAT to build and WHY.
                  <br />
                  Every engagement starts with three decisions.
                </>
              )}
            </p>
          </div>
        </Reveal>

        {/* 3 strategic areas - 12-col 4+4+4 */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 border-t border-neutral-200 dark:border-white/10 pt-12 md:pt-16">
          <Reveal delay={0.05} className="col-span-12 md:col-span-4">
            <div>
              <span className="font-display text-sm text-[#D4FF00] mb-4 block">01</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                {language === "pl" ? "Marka" : "Brand"}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pl"
                  ? "Pozycjonowanie, narrative i audience - co was odróżnia, kogo obsługujecie i jak chcecie być zapamiętani. Zanim zacznie się jakakolwiek praca wizualna."
                  : "Positioning, narrative and audience - what sets you apart, who you serve, how you want to be remembered. Before any visual work begins."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="col-span-12 md:col-span-4">
            <div>
              <span className="font-display text-sm text-[#D4FF00] mb-4 block">02</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                {language === "pl" ? "Operacje" : "Operations"}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pl"
                  ? "Jeden rytm intake'u, jeden format briefu, jasny ownership akceptacji, QA checklist i dashboard dla każdego powtarzalnego typu assetu. System zanim assety."
                  : "One intake rhythm, one brief format, clear approval ownership, QA checklist and a dashboard for every recurring asset type. System before assets."}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.19} className="col-span-12 md:col-span-4">
            <div>
              <span className="font-display text-sm text-[#D4FF00] mb-4 block">03</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white mb-4 leading-tight">
                {language === "pl" ? "AI" : "AI"}
              </h3>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {language === "pl"
                  ? "AI brief assistant, automatyczne QA checks, decision velocity dashboard, generowanie wariantów per lokalizacja. Konkret zamiast hype'u - gdzie AI realnie przyspiesza Wasz pipeline."
                  : "AI brief assistant, automated QA checks, decision velocity dashboard, variant generation per location. Concrete instead of hype - where AI actually speeds up your pipeline."}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Strategy closer - 12-col 7+5 (caption left, CTA right) */}
        <Reveal delay={0.3}>
          <div className="mt-16 md:mt-20 pt-10 border-t border-neutral-200 dark:border-white/10 grid grid-cols-12 gap-6 md:gap-8 items-center">
            <p className="col-span-12 md:col-span-7 text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
              {language === "pl"
                ? "Strategia łączy się z każdym produktem niżej i jest dostarczana przez r3loop - naszą 8-krokową metodologię. Bez fundamentu wszystko poniżej to tylko ładne assety."
                : "Strategy connects to every product below, delivered through r3loop - our 8-step methodology. Without the foundation, everything below is just nice-looking assets."}
            </p>
            <Link
              href="/brief"
              className="col-span-12 md:col-span-5 md:justify-self-end group/link inline-flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-300"
            >
              <span>{language === "pl" ? "Omów potrzebę strategiczną" : "Discuss your strategic need"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </section>
      </SectionWatermark>

      {/* ─── Products - execution layer ─── */}
      <SectionWatermark number="02" align="left">
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
                 <div className={`
                   relative flex flex-col border-b border-neutral-200 dark:border-white/10
                   transition-colors duration-500 ease-out
                   ${isActive ? 'bg-neutral-50 dark:bg-white/[0.025]' : ''}
                 `}>
                   {/* Lime accent bar - slides in when active */}
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
                       ${!isActive ? 'hover:bg-neutral-50 dark:hover:bg-white/[0.02] focus-visible:bg-neutral-50 dark:focus-visible:bg-white/[0.02]' : ''}
                     `}
                   >
                     <div className="flex items-baseline gap-6 md:gap-10 px-4 sm:px-8 md:px-10">

                        {/* Tanker number - small editorial accent */}
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
                         <div className="pb-20 pt-6 md:pt-10 px-4 sm:px-8 md:px-10 ml-0 md:ml-[40px] lg:ml-[50px]">
                           {/* Description - supporting context, lighter weight, smaller scale */}
                           <motion.p
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                             className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal max-w-4xl mb-12 [text-wrap:balance]"
                           >
                             {card.description}
                           </motion.p>

                           {/* Includes - main deliverables list, brought in from /deliverables substance.
                               Lime bullet markers + neutral text, 2-col layout for compactness on wider screens. */}
                           {card.includes && card.includes.length > 0 && (
                             <motion.div
                               initial={{ opacity: 0, y: 12 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                               className="border-t border-neutral-200 dark:border-white/10 pt-10 mb-10 max-w-5xl"
                             >
                               <h3 className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-5">
                                 {language === 'pl' ? "Co zawiera" : "Includes"}
                               </h3>
                               <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                                 {card.includes.map((inc: string, k: number) => (
                                   <li key={k} className="text-[15px] md:text-base text-neutral-700 dark:text-neutral-300 flex items-start gap-3 leading-relaxed">
                                     <span className="w-1 h-1 bg-[#D4FF00] mt-[10px] shrink-0 rounded-none" />
                                     {inc}
                                   </li>
                                 ))}
                               </ul>
                             </motion.div>
                           )}

                           {/* Output - the headline. Larger + heavier than description = clear hierarchy */}
                           <motion.div
                             initial={{ opacity: 0, y: 12 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                             className="border-t border-neutral-200 dark:border-white/10 pt-10 max-w-5xl"
                           >
                             <h3 className="text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-5">
                               {language === 'pl' ? "Wynik" : "Output"}
                             </h3>
                             <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-900 dark:text-white font-normal tracking-tight leading-[1.2] [text-wrap:balance]">
                               {card.output}
                             </p>
                           </motion.div>

                           {/* Best for - short audience filter line, hair-line divider above */}
                           {card.best_for && (
                             <motion.div
                               initial={{ opacity: 0, y: 12 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                               className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-baseline border-t border-neutral-200 dark:border-white/10 pt-6 max-w-5xl"
                             >
                               <span className="text-xs font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 shrink-0">
                                 {language === 'pl' ? "Dla kogo" : "Best for"}
                               </span>
                               <span className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">
                                 {card.best_for}
                               </span>
                             </motion.div>
                           )}

                           {/* Deep-link to /deliverables anchor - for prospects who want full
                               whats_inside detail (kept on /deliverables as deep-dive page).
                               Anchor matches /deliverables's id={title.toLowerCase().replace(/\s+/g, '-')}. */}
                           <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                             className="mt-8 max-w-5xl"
                           >
                             <Link
                               href={`/deliverables#${card.title.toLowerCase().replace(/\s+/g, '-')}`}
                               className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-500 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                             >
                               <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                               <span>{language === 'pl' ? "Pełna lista deliverables" : "Full deliverables list"}</span>
                               <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
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

          {/* White-label delivery - not an accordion product; it's the separate
              agency track. Same row styling, but a Link out to /for-agencies
              (arrow instead of the +/× expander). */}
          <Reveal delay={cards.length * 0.05}>
            <Link
              href="/for-agencies"
              className="group relative flex flex-col border-b border-neutral-200 dark:border-white/10 cursor-pointer py-10 md:py-12 outline-none hover:bg-neutral-50 dark:hover:bg-white/[0.02] focus-visible:bg-neutral-50 dark:focus-visible:bg-white/[0.02] transition-colors duration-500 ease-out"
            >
              <div className="flex items-baseline gap-6 md:gap-10 px-4 sm:px-8 md:px-10">
                <span className="font-display text-base md:text-lg lg:text-xl shrink-0 leading-none self-start mt-3 md:mt-4 text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00] transition-colors duration-500">
                  {String(cards.length + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 flex items-baseline justify-between gap-6 md:gap-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-[1.05] text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-all duration-500 ease-out">
                      {language === 'pl' ? "Delivery white-label" : "White-label delivery"}
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                      {language === 'pl'
                        ? "Dla agencji - wchodzimy na Twojego klienta jako zintegrowany zespół, pod Twoją marką."
                        : "For agencies - we embed on your client as one integrated team, under your name."}
                    </p>
                  </div>
                  <ArrowRight className="w-8 h-8 md:w-10 md:h-10 shrink-0 self-start mt-2 text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00] group-hover:translate-x-1 transition-all duration-500" strokeWidth={1.5} aria-hidden="true" />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
      </SectionWatermark>

      {/* ─── Who does the work - founder-led reality, framed as the advantage.
          Placed directly before engagement models & pricing so the buyer knows
          who delivers before reading what it costs. Resolves the "senior team"
          vs solo-founder ambiguity flagged in the content audit. ─── */}
      <section className="mb-32 md:mb-40 border-t border-neutral-200 dark:border-white/10 pt-16 md:pt-20">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-8">
            <div className="col-span-12 md:col-span-4">
              <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
                {language === "pl" ? "Kto wykonuje pracę" : "Who does the work"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">
                {language === "pl" ? (
                  <>Founder-led.<br />Z założenia.</>
                ) : (
                  <>Founder-led.<br />By design.</>
                )}
              </h2>
            </div>
            <div className="col-span-12 md:col-span-8 md:max-w-3xl flex flex-col gap-6">
              <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">
                {language === "pl"
                  ? "r352 jest founder-led. Każda bramka decyzyjna ma jednego właściciela - Reszka. Wolumen fazy build przechodzi przez imienną sieć seniorów i AI-native linie produkcyjne, nie przez juniorów."
                  : "r352 is founder-led. Every decision gate is owned by one person - Reszek. Build-phase volume runs through a named senior network and AI-native production lines, not juniors."}
              </p>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                {language === "pl"
                  ? "Krzywa obecności (90% → 15%) to model staffingu: kupujecie system, nie godziny."
                  : "The presence curve (90% → 15%) is the staffing model: you buy the system, not the hours."}
              </p>
              <Link
                href="/process#operating-model"
                className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-500 hover:text-[#D4FF00] transition-colors duration-500"
              >
                <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                <span>{language === "pl" ? "Zobacz krzywą obecności" : "See the presence curve"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* NEW: Engagement Models Section */}
      <SectionWatermark number="03" align="right">
        <EngagementModels />
      </SectionWatermark>

      {/* ─── Pre-purchase FAQ - buyer questions before committing.
          Placed directly after engagement models & pricing so objections
          (guarantee, start speed, fixed pricing, handoff) are answered at
          the exact moment they form. Native <details>/<summary> in the
          same pattern as FAQ.tsx; mirrored by the FAQPage JSON-LD in the
          <Helmet> at the top of this component. ─── */}
      <section className="mt-32 md:mt-40 border-t border-neutral-200 dark:border-white/10 pt-16 md:pt-20">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
            <div className="col-span-12 md:col-span-4">
              <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-4 block">
                {language === "pl" ? "04 · FAQ" : "04 · FAQ"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05]">
                {language === "pl" ? (
                  <>Zanim się<br />zdecydujesz.</>
                ) : (
                  <>Before you<br />commit.</>
                )}
              </h2>
            </div>
            <p className="col-span-12 md:col-span-8 md:pt-2 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty] max-w-3xl">
              {language === "pl"
                ? "Pięć pytań, które kupujący zadają przed wyborem modelu - różnice, gwarancja, start, ceny i co zostaje po zakończeniu."
                : "The five questions buyers ask before choosing a model - differences, guarantee, start speed, pricing, and what you keep when it ends."}
            </p>
          </div>

          <div className="border-t border-neutral-200 dark:border-white/10 max-w-4xl">
            {SERVICES_FAQ.map((item, i) => (
              <Reveal key={item.q.en} delay={i * 0.04}>
                <details
                  className="group border-b border-neutral-200 dark:border-white/10 py-7 md:py-8 [&_summary::-webkit-details-marker]:hidden"
                  onToggle={(e) =>
                    setOpenFaq((prev) => ({
                      ...prev,
                      [i]: (e.currentTarget as HTMLDetailsElement).open,
                    }))
                  }
                >
                  <summary
                    className="flex items-start gap-6 cursor-pointer list-none select-none"
                    aria-expanded={!!openFaq[i]}
                    aria-controls={`services-faq-panel-${i}`}
                  >
                    <span className="font-display text-xs text-[#D4FF00] tracking-[0.2em] pt-2 shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-xl md:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug group-hover:text-[#D4FF00] transition-colors duration-300">
                      {item.q[language]}
                    </span>
                    <span
                      className="text-[#D4FF00] text-3xl leading-none pt-1 shrink-0 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div id={`services-faq-panel-${i}`} className="mt-5 pl-14 pr-4 md:pr-12">
                    <p className="text-base md:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">
                      {item.a[language]}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* For Agencies promo - mirrors the for-agencies hero language (glass hands +
          headline) and links straight there. Image uses dark:mix-blend-screen so the
          hands float seamlessly on the dark theme (the default). */}
      <section className="mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-50 pointer-events-auto">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Reveal>
            <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 dark:text-[#D4FF00] font-display mb-5 block">
              {language === 'pl' ? "Dla agencji" : "For agencies"}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] mb-6">
              {language === 'pl' ? (
                <>Wygrywasz pitch.<br />My dostarczamy.</>
              ) : (
                <>Win the pitch.<br />We run the delivery.</>
              )}
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl mb-9">
              {language === 'pl'
                ? "White-label, end-to-end. Wchodzimy na Twojego klienta jako zintegrowany zespół, pod Twoją marką. Ty prowadzisz relację, my dostarczamy."
                : "White-label, end-to-end. We embed on your client as one integrated team, under your name. You lead the relationship, we deliver."}
            </p>
            <Link
              href="/for-agencies"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-widest text-sm hover:bg-neutral-900 hover:text-white dark:hover:bg-white transition-colors duration-300"
            >
              {language === 'pl' ? "Zobacz tor agencyjny" : "Explore the agency track"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
          <Reveal width="100%">
            <img
              src="/agency-frames/frame-000.webp"
              alt={language === 'pl' ? "Szklane dłonie podające kryształ - white-label delivery dla agencji" : "Glass hands offering a crystal - white-label delivery for agencies"}
              loading="lazy"
              className="w-full max-w-xs sm:max-w-sm lg:max-w-none h-auto select-none pointer-events-none dark:mix-blend-screen"
              draggable={false}
            />
          </Reveal>
        </div>
      </section>

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