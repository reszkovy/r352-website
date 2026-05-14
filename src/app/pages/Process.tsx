import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ─── 8-step methodology ──────────────────────────────────
interface Step {
  num: string;
  title: { en: string; pl: string };
  subtitle: { en: string; pl: string };
  goal: { en: string; pl: string };
  cards: { label: { en: string; pl: string }; text: { en: string; pl: string } }[];
  metric: { en: string; pl: string };
}

const steps: Step[] = [
  {
    num: "01",
    title: { en: "Diagnose", pl: "Diagnoza" },
    subtitle: { en: "Find the real problem before designing anything", pl: "Znaleźć realny problem zanim cokolwiek zaprojektujemy" },
    goal: {
      en: "We audit the current state — workflows, bottlenecks, stakeholders, tools, and decision paths. No assumptions, only evidence with time-cost data.",
      pl: "Audytujemy stan obecny — workflow, wąskie gardła, stakeholderzy, narzędzia i ścieżki decyzyjne. Bez założeń, tylko dowody z danymi o kosztach czasowych.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Stakeholder interviews, workflow audit, request source analysis, tool review and pain-point mapping with estimated time cost.", pl: "Wywiady ze stakeholderami, audyt workflow, analiza źródeł requestów, przegląd narzędzi i mapowanie pain-pointów z szacowanym kosztem czasowym." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A 1-page operational diagnosis with 5–7 prioritized bottlenecks and a recommended action sequence for the next 60 days.", pl: "Jednostronicowa diagnoza operacyjna z 5–7 priorytetyzowanymi wąskimi gardłami i zalecaną sekwencją działań na 60 dni." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Without diagnosis, every solution is a guess — even if it looks good.", pl: "Bez diagnozy każde rozwiązanie to zgadywanka — nawet jeśli wygląda dobrze." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "3–5 days for focused projects, 1–2 weeks for organization-wide engagements.", pl: "3–5 dni dla fokusowanych projektów, 1–2 tygodnie dla zaangażowań organizacyjnych." } },
    ],
    metric: { en: "Time to root cause for every recurring problem.", pl: "Czas do zidentyfikowania przyczyny każdego powtarzającego się problemu." },
  },
  {
    num: "02",
    title: { en: "Map", pl: "Mapowanie" },
    subtitle: { en: "Understand the demand landscape", pl: "Zrozumieć krajobraz popytu" },
    goal: {
      en: "We map what's coming in — who requests what, how often, in what format, with what urgency. This turns an infinite backlog into a classified, manageable system.",
      pl: "Mapujemy co przychodzi — kto, co, jak często, w jakim formacie, z jaką pilnością. To zamienia nieskończony backlog w sklasyfikowany, zarządzalny system.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Audit of where requests come from, classification of request types, stakeholder volume analysis and seasonality mapping.", pl: "Audyt skąd przychodzą requesty, klasyfikacja typów requestów, analiza wolumenu per stakeholder i mapowanie sezonowości." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A demand map showing request volume by stakeholder, recurring seasonal patterns, clear request categories and a list of requests to accept, reject or defer.", pl: "Mapa popytu pokazująca wolumen requestów per stakeholder, powtarzające się wzorce sezonowe, jasne kategorie requestów i listę requestów do zaakceptowania, odrzucenia lub odłożenia." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "You cannot prioritize what you have not classified. Mapping turns 'everything is urgent' into a system where every request has a clear place.", pl: "Nie priorytetyzujesz tego, czego nie sklasyfikowałeś. Mapowanie zamienia 'wszystko jest pilne' w system, gdzie każdy request ma jasne miejsce." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1 week. Often runs in parallel with diagnosis for larger engagements.", pl: "1 tydzień. Często przebiega równolegle z diagnozą przy większych zaangażowaniach." } },
    ],
    metric: { en: "% of requests with a clear category at intake (target 95%+).", pl: "% requestów z jasną kategorią na wejściu (cel 95%+)." },
  },
  {
    num: "03",
    title: { en: "Standardize", pl: "Standaryzacja" },
    subtitle: { en: "Set the rules before production starts", pl: "Ustalić zasady zanim ruszy produkcja" },
    goal: {
      en: "We introduce briefing standards, Definition of Ready, prioritization logic, and quality benchmarks. This is the contract between stakeholders and production.",
      pl: "Wprowadzamy standardy briefingu, Definition of Ready, logikę priorytetyzacji i benchmarki jakości. To jest kontrakt między stakeholderami a produkcją.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Brief templates for standard, local and express requests, a readiness checklist before production starts, a simple scoring system for priority, urgency, business value and production effort, weekly request reviews, creative quality standards and quality review checklists for each asset type.", pl: "Szablony briefów dla standardowych, lokalnych i ekspresowych requestów, lista gotowości zanim ruszy produkcja, prosty system scoringowy dla priorytetu, pilności, wartości biznesowej i nakładu produkcyjnego, cotygodniowe review requestów, standardy jakości kreatywnej i quality review checklisty per typ assetu." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A template library, prioritization system, creative quality standards, quality review checklists, AI brief assistant prompts and a 90-day adoption plan.", pl: "Biblioteka szablonów, system priorytetyzacji, standardy jakości kreatywnej, quality review checklisty, prompty AI asystenta briefu i 90-dniowy plan adopcji." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Standards eliminate revision loops before they start. When the brief is complete and quality criteria are clear, feedback becomes precise instead of political.", pl: "Standardy eliminują pętle poprawek zanim się zaczną. Kiedy brief jest kompletny a kryteria jakości są jasne, feedback staje się precyzyjny zamiast polityczny." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "2–3 weeks. This is the heaviest intellectual phase — where the system's operating logic gets written.", pl: "2–3 tygodnie. Najcięższa faza intelektualnie — tutaj pisze się operacyjna logika systemu." } },
    ],
    metric: { en: "% of briefs meeting the readiness checklist on first submission (target 80%+).", pl: "% briefów spełniających listę gotowości przy pierwszym złożeniu (cel 80%+)." },
  },
  {
    num: "04",
    title: { en: "Build", pl: "Budowa" },
    subtitle: { en: "Create what ships — systems, interfaces, assets", pl: "Tworzyć to, co idzie na produkcję" },
    goal: {
      en: "Senior-level execution against the standards from Phase 03. Whether it's UX/UI, brand system, campaign toolkit, or operational playbook — we build production-ready deliverables, not concepts.",
      pl: "Egzekucja na seniorskim poziomie zgodnie ze standardami z Fazy 03. Niezależnie czy to UX/UI, system marki, toolkit kampanijny czy playbook operacyjny — budujemy gotowe do produkcji deliverables, nie koncepty.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "UX and interface design, brand systems, campaign assets, component libraries, production workflows, approval ownership by asset type, handoff instructions and tool integrations.", pl: "Design UX i interfejsów, systemy marki, assety kampanijne, biblioteki komponentów, workflow produkcji, mapa ownership akceptacji per typ assetu, instrukcje handoffu i integracje narzędzi." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Production-ready files, systems and documentation. This can include service blueprints, workflow diagrams, component libraries, campaign assets or interfaces — depending on what the project needs.", pl: "Gotowe do produkcji pliki, systemy i dokumentacja. To może obejmować service blueprinty, diagramy workflow, biblioteki komponentów, assety kampanijne lub interfejsy — w zależności od potrzeb projektu." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Craft without structure breaks during delivery. We combine senior execution with clear standards, so quality becomes repeatable instead of heroic.", pl: "Rzemiosło bez struktury łamie się przy dostawie. Łączymy seniorską egzekucję z jasnymi standardami, więc jakość staje się powtarzalna zamiast heroiczna." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "2–12 weeks depending on scope. Delivered in weekly sprints with visible progress at every checkpoint.", pl: "2–12 tygodni w zależności od zakresu. Dostarczane w tygodniowych sprintach z widocznym postępem na każdym checkpoincie." } },
    ],
    metric: { en: "Cycle time from approved brief to delivered asset.", pl: "Cycle time od zatwierdzonego briefu do dostarczonego assetu." },
  },
  {
    num: "05",
    title: { en: "Govern", pl: "Governance" },
    subtitle: { en: "Define who decides, how, and when", pl: "Zdefiniować kto decyduje, jak i kiedy" },
    goal: {
      en: "We define ownership, approval paths, change request rules, and decision logs — so decisions are traceable and don't bottleneck on one person.",
      pl: "Definiujemy ownership, ścieżki akceptacji, zasady change requestów i logi decyzji — żeby decyzje były śledzalne i nie blokowały się na jednej osobie.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Decision ownership model, approval rules, escalation paths, change request process, conflict resolution rules and decision log structure.", pl: "Model ownership decyzji, zasady akceptacji, ścieżki eskalacji, proces change requestów, zasady rozwiązywania konfliktów i struktura logu decyzji." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A clear decision playbook. Everyone knows who approves what, how changes are handled and where important decisions are documented.", pl: "Jasny decision playbook. Każdy wie kto akceptuje co, jak obsługiwane są zmiany i gdzie dokumentowane są ważne decyzje." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Most revision loops are not about quality. They happen because ownership is unclear. When everyone knows who decides what, projects move faster.", pl: "Większość pętli poprawek nie dotyczy jakości. Pojawiają się bo ownership jest niejasny. Kiedy wszyscy wiedzą kto decyduje o czym, projekty idą szybciej." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1–2 weeks. Defined in parallel with Build, enforced from first delivery.", pl: "1–2 tygodnie. Definiowane równolegle z Budową, egzekwowane od pierwszej dostawy." } },
    ],
    metric: { en: "Average decision time and decision reversal rate (both trending down).", pl: "Średni czas decyzji i wskaźnik cofania decyzji (oba w trendzie spadkowym)." },
  },
  {
    num: "06",
    title: { en: "Ship", pl: "Dostawa" },
    subtitle: { en: "Deliver with quality gates, not hope", pl: "Dostarczać z quality gates, nie nadzieją" },
    goal: {
      en: "Every deliverable passes through structured QA and approval before handoff. Nothing ships half-baked. Nothing ships without sign-off from the right person.",
      pl: "Każdy deliverable przechodzi przez ustrukturyzowane QA i akceptację przed handoffem. Nic nie wychodzi niedopieczone. Nic nie wychodzi bez sign-offu od właściwej osoby.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Quality review checklists for each asset type, structured review rounds, stakeholder approval rules, handoff documentation and developer specifications where needed.", pl: "Quality review checklisty dla każdego typu assetu, ustrukturyzowane rundy review, zasady akceptacji stakeholderów, dokumentacja handoffu i specyfikacje dla developerów tam gdzie potrzebne." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Approved, production-ready files with clear handoff instructions. Your team knows what was delivered, why it was created and how to use or implement it.", pl: "Zatwierdzone, gotowe do produkcji pliki z jasnymi instrukcjami handoffu. Twój zespół wie co zostało dostarczone, dlaczego powstało i jak tego użyć lub wdrożyć." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Shipping is where most processes break. We replace 'looks good, I guess' with structured quality review that anyone on the team can apply consistently.", pl: "Dostawa to moment w którym większość procesów się łamie. Zastępujemy 'wygląda ok chyba' ustrukturyzowanym quality review, które każdy w zespole może stosować spójnie." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "Built into each sprint. Quality review happens continuously, not only at the end.", pl: "Wbudowane w każdy sprint. Quality review dzieje się ciągle, nie tylko na końcu." } },
    ],
    metric: { en: "% of work passing quality review on first round (target 70%+).", pl: "% prac przechodzących quality review w pierwszej rundzie (cel 70%+)." },
  },
  {
    num: "07",
    title: { en: "Measure", pl: "Pomiar" },
    subtitle: { en: "Track what actually changed", pl: "Śledzić co się naprawdę zmieniło" },
    goal: {
      en: "We set up measurement infrastructure — KPI dashboards, review cadences, adoption tracking. Without data, you can't prove the system works or find where it's leaking.",
      pl: "Stawiamy infrastrukturę pomiarową — dashboardy KPI, kadencje review, tracking adopcji. Bez danych nie udowodnisz że system działa ani nie znajdziesz gdzie przecieka.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Workflow performance dashboard setup, baseline measurement, monthly review structure, adoption tracking by team and AI workflow integration where useful.", pl: "Setup dashboardu workflow performance, pomiar bazowy, struktura miesięcznego review, tracking adopcji per zespół i integracja AI workflow tam gdzie to ma sens." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A measurement framework your team can use to track cycle time, revision rates, brief quality, recurring bottlenecks and adoption of the new process.", pl: "Framework pomiarowy, którego Twój zespół może używać do śledzenia cycle time, wskaźników poprawek, jakości briefów, powtarzających się wąskich gardeł i adopcji nowego procesu." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "If you do not measure the workflow, you end up managing opinions instead of real problems.", pl: "Jeśli nie mierzysz workflow, kończysz zarządzając opiniami zamiast realnymi problemami." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1–2 weeks for setup. Then it runs continuously as part of the operating rhythm.", pl: "1–2 tygodnie na setup. Potem działa ciągle jako część rytmu operacyjnego." } },
    ],
    metric: { en: "Dashboard live + first baseline captured within 2 weeks of system launch.", pl: "Dashboard live + pierwszy baseline uchwycony w ciągu 2 tygodni od launchu systemu." },
  },
  {
    num: "08",
    title: { en: "Iterate", pl: "Iteracja" },
    subtitle: { en: "Keep the system alive, not frozen", pl: "Utrzymać system żywym, nie zamrożonym" },
    goal: {
      en: "We run monthly reviews, quarterly governance checks, and process optimization cycles. The system adapts to the changing organization — it doesn't become shelf-ware.",
      pl: "Prowadzimy monthly review, kwartalne governance checks i cykle optymalizacji procesu. System adaptuje się do zmieniającej się organizacji — nie staje się półkowym dokumentem.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Monthly review sessions, quarterly process reviews, optimization sprints, checks for old workflow habits, AI workflow updates and team coaching.", pl: "Miesięczne sesje review, kwartalne review procesu, sprinty optymalizacji, sprawdzanie powrotu do starych nawyków workflow, aktualizacje AI workflow i coaching zespołu." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A system that keeps improving instead of becoming outdated. Your team gets updated templates, process recommendations, quarterly trend reviews and a clear rhythm for improving how work gets done.", pl: "System, który ciągle się poprawia zamiast stawać się przestarzały. Twój zespół dostaje zaktualizowane szablony, rekomendacje procesowe, kwartalne review trendów i jasny rytm poprawy tego jak praca jest wykonywana." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Every process decays. Teams change, tools change and priorities shift. Without a review rhythm, the system slowly stops working and the team returns to old habits.", pl: "Każdy proces się degraduje. Zespoły się zmieniają, narzędzia się zmieniają i priorytety się przesuwają. Bez rytmu review system powoli przestaje działać a zespół wraca do starych nawyków." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "Ongoing — typically 1 session per month. Can be part of a retainer or fully handed off to your team.", pl: "Ciągłe — typowo 1 sesja miesięcznie. Może być częścią retainera lub w pełni przekazane Twojemu zespołowi." } },
    ],
    metric: { en: "Quarter-over-quarter trend of all metrics from phases 03–06.", pl: "Trend kwartał-do-kwartału wszystkich metryk z faz 03–06." },
  },
];

const TOTAL = steps.length;

export function Process() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  const lang = language as "en" | "pl";

  const goToStep = useCallback((idx: number) => {
    setActiveStep(Math.max(0, Math.min(TOTAL - 1, idx)));
  }, []);

  const step = steps[activeStep];
  const progressPct = ((activeStep + 1) / TOTAL) * 100;

  return (
    <PageTransition>
      {/* ─── Intro Hook — 12-col 7+5 (H1 left, supporting right) ─── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-8 md:px-12">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
              <h1 className="col-span-12 md:col-span-7 text-5xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
                {lang === "pl"
                  ? "Większość problemów z designem to nie problemy z designem."
                  : "Most design problems are not design problems."}
              </h1>
              <div className="col-span-12 md:col-span-5 md:justify-self-end max-w-xl space-y-6">
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-snug font-medium tracking-tight">
                  {lang === "pl"
                    ? "Wynikają z niejasnych briefów, rozproszonych requestów, wolnych decyzji, słabego ownership'u i brakujących standardów jakości."
                    : "They come from unclear briefs, scattered requests, slow decisions, weak ownership and missing quality standards."}
                </p>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {lang === "pl"
                    ? "Ten proces zamienia chaos w działający system — od diagnozy, przez produkcję i pomiar, po ciągłe usprawnianie."
                    : "This process turns that chaos into a working system — from diagnosis to production, measurement and continuous improvement."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 8-Step Tabs — interactive deep-dive (is the process map) ─── */}
      <section id="process-tabs" className="pb-20 md:pb-32 border-b border-white/10 scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="border-t border-neutral-200 dark:border-white/[0.12]">
              {/* Progress bar */}
              <div className="h-[2px] bg-neutral-200 dark:bg-white/[0.06] relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#D4FF00]"
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>

              {/* Tab buttons */}
              <div
                className="grid border-b border-neutral-200 dark:border-white/[0.06] overflow-x-auto"
                role="tablist"
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") { e.preventDefault(); goToStep(activeStep + 1); }
                  else if (e.key === "ArrowLeft") { e.preventDefault(); goToStep(activeStep - 1); }
                  else if (e.key === "Home") { e.preventDefault(); goToStep(0); }
                  else if (e.key === "End") { e.preventDefault(); goToStep(TOTAL - 1); }
                }}
                style={{ gridTemplateColumns: `repeat(${TOTAL}, minmax(110px, 1fr))` }}
              >
                {steps.map((s, i) => (
                  <button
                    key={s.num}
                    role="tab"
                    aria-selected={i === activeStep}
                    onClick={() => goToStep(i)}
                    className={`
                      relative isolate
                      border-r border-neutral-200 dark:border-white/[0.06] last:border-r-0 px-4 py-5 text-left
                      flex flex-col gap-2 min-h-[90px] cursor-pointer
                      transition-colors duration-500 ease-out
                      ${i === activeStep
                        ? "text-[#0A0A0A]"
                        : "text-neutral-400 dark:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-white/[0.03] hover:text-neutral-900 dark:hover:text-white"
                      }
                    `}
                  >
                    {/* Sliding active background — Framer animates between tabs via shared layoutId */}
                    {i === activeStep && (
                      <motion.div
                        layoutId="processActiveTab"
                        className="absolute inset-0 bg-[#D4FF00] -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.9 }}
                      />
                    )}
                    <span className={`font-display text-xs leading-none tracking-wide transition-colors duration-500 ${i === activeStep ? "text-[#0A0A0A]/60" : ""}`}>
                      {s.num}
                    </span>
                    <span className={`text-base md:text-lg font-semibold tracking-tight leading-tight mt-auto transition-colors duration-500 ${i === activeStep ? "font-bold text-[#0A0A0A]" : ""}`}>
                      {s.title[lang]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Panel */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="p-8 md:p-12 lg:px-16"
                    role="tabpanel"
                  >
                    {/* Header — subtitle, single line on md+ */}
                    <motion.h3
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-tight text-neutral-900 dark:text-white leading-snug md:whitespace-nowrap mb-10"
                    >
                      {step.subtitle[lang]}
                    </motion.h3>

                    {/* Detail grid — editorial layout, no boxy cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-10">
                      {step.cards.map((card, ci) => (
                        <div
                          key={ci}
                          className={`
                            relative py-8 md:py-10 transition-all duration-500 group
                            ${ci % 2 === 0 ? "md:pr-12" : "md:pl-12"}
                            ${ci % 2 === 1 ? "md:border-l border-neutral-100 dark:border-white/[0.06]" : ""}
                            ${ci < 2 ? "border-b border-neutral-100 dark:border-white/[0.06]" : ""}
                          `}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <span className="w-6 h-px bg-[#9abb00] dark:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                            <span className="font-display text-[10px] text-[#9abb00] dark:text-[#D4FF00] uppercase tracking-[0.2em]">
                              {card.label[lang]}
                            </span>
                          </div>
                          <p className="text-[15px] text-neutral-600 dark:text-neutral-300 leading-[1.7] max-w-[48ch]">
                            {card.text[lang]}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Metric — minimal accent line */}
                    <div className="flex items-start gap-5 pt-8 border-t border-neutral-100 dark:border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[#9abb00] dark:text-[#D4FF00] uppercase tracking-[0.15em] mt-[3px] shrink-0">
                        KPI
                      </span>
                      <span className="text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {step.metric[lang]}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center px-8 md:px-12 lg:px-16 py-6 border-t border-neutral-200 dark:border-white/[0.06]">
                  <button
                    onClick={() => goToStep(activeStep - 1)}
                    disabled={activeStep === 0}
                    className="border border-neutral-300 dark:border-white/[0.12] rounded px-5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2 transition-all duration-300 hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.04] disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-600 disabled:hover:bg-transparent cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> <span className="hidden sm:inline">{lang === "pl" ? "Poprzedni" : "Previous"}</span>
                  </button>
                  <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wide">
                    {String(activeStep + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => goToStep(activeStep + 1)}
                    disabled={activeStep === TOTAL - 1}
                    className="border border-neutral-300 dark:border-white/[0.12] rounded px-5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2 transition-all duration-300 hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.04] disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-600 disabled:hover:bg-transparent cursor-pointer"
                  >
                    <span className="hidden sm:inline">{lang === "pl" ? "Następny" : "Next"}</span> <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Who this is for ─── */}
      <section className="py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {lang === "pl" ? "Dla kogo" : "Who this is for"}
                </span>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-8 leading-[1.1]">
                  {lang === "pl"
                    ? "Dla zespołów, gdzie design to nie pojedyncze zadanie."
                    : "Built for teams where design work is no longer a single task."}
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {lang === "pl"
                    ? "Dla organizacji zarządzających wieloma stakeholderami, lokalizacjami, markami, kampaniami, produktami lub powtarzającymi się requestami — gdzie jakość, szybkość i ownership trzeba zsystemizować."
                    : "For organizations managing multiple stakeholders, locations, brands, campaigns, product surfaces or recurring asset requests — where quality, speed and ownership need to be systemized."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10">
                {(lang === "pl" ? [
                  "Zespoły marketingu z powtarzającymi się requestami na assety",
                  "Marki wielolokalizacyjne",
                  "Zespoły brand i growth",
                  "Zespoły produktowe",
                  "Organizacje z wieloma stakeholderami",
                  "Zespoły utknięte w niejasnych pętlach feedbacku",
                  "Zespoły gdzie zbyt wiele pracy idzie przez email, chat i last-minute requesty",
                ] : [
                  "Marketing teams with recurring asset requests",
                  "Multi-location brands",
                  "Brand and growth teams",
                  "Product teams",
                  "Organizations with many stakeholders",
                  "Teams stuck in unclear feedback loops",
                  "Teams where too much work happens through email, chat and last-minute requests",
                ]).map((item, i) => (
                  <li key={i} className="py-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── When this is too much — qualifier ─── */}
      <section className="py-20 md:py-24 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-4xl">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-500 mb-6">
                {lang === "pl" ? "Kiedy to za dużo" : "When this is probably too much"}
              </span>
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-400 leading-snug mb-6">
                {lang === "pl"
                  ? "Ten proces jest prawdopodobnie za duży, jeśli potrzebujesz jednorazowego banera, szybkiego visual refresha lub pojedynczego landing page'a bez powtarzającego się workflow."
                  : "This is probably too much if you only need a one-off banner, a quick visual refresh or a single landing page with no recurring workflow behind it."}
              </p>
              <p className="text-lg text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-3xl">
                {lang === "pl"
                  ? "Działa najlepiej kiedy design, komunikacja lub produkcja stały się powtarzającym się operacyjnym wyzwaniem."
                  : "It works best when design, communication or production has become a repeated operational challenge."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Example use case — concrete proof ─── */}
      <section className="py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {lang === "pl" ? "Przykład zastosowania" : "Example use case"}
                </span>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white mb-8 leading-[1.0]">
                  {lang === "pl"
                    ? "Multi-location marketing team."
                    : "Multi-location marketing team."}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-8">
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium tracking-tight">
                  {lang === "pl"
                    ? "Wielolokalizacyjny zespół marketingu otrzymuje dziesiątki lokalnych requestów miesięcznie przez email, chat i ad-hoc rozmowy."
                    : "A multi-location marketing team receives dozens of local requests every month through email, chat and ad hoc calls."}
                </p>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {lang === "pl"
                    ? "Klasyfikujemy typy requestów, definiujemy reguły intake, tworzymy szablony briefów, ustalamy ownership akceptacji, wprowadzamy quality review checklisty i budujemy miesięczny rytm review."
                    : "We classify request types, define intake rules, create brief templates, set approval ownership, introduce quality review checklists and build a monthly review rhythm."}
                </p>
                <div className="border-t border-neutral-200 dark:border-white/10 pt-8">
                  <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-4">
                    {lang === "pl" ? "Rezultat" : "Result"}
                  </span>
                  <p className="text-xl md:text-2xl text-neutral-900 dark:text-white font-bold tracking-tight leading-tight">
                    {lang === "pl"
                      ? "Mniej niejasnych requestów, szybsze akceptacje, reużywalne szablony i lepsza widoczność dla leadership'u."
                      : "Fewer unclear requests, faster approvals, reusable templates and better visibility for leadership."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-6">
                {lang === "pl" ? "Niepewny gdzie wąskie gardło?" : "Not sure where the bottleneck is?"}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 leading-[0.95]">
                {lang === "pl"
                  ? "Zacznij od sprintu diagnostycznego."
                  : "Start with a diagnostic sprint."}
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === "pl"
                  ? "Zmapujemy obecny workflow, zidentyfikujemy realne ograniczenia i zdefiniujemy pierwsze usprawnienia systemu. Bez zobowiązań."
                  : "We will map the current workflow, identify the real constraints and define the first system improvements. No commitment."}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                onClick={() => setLocation("/contact")}
                className="bg-[#D4FF00] text-black hover:bg-white hover:text-black"
                glowColor="rgba(212, 255, 0, 0.3)"
              >
                <span className="text-xs font-display uppercase tracking-widest">
                  {lang === "pl" ? "Umów rozmowę diagnostyczną" : "Book a diagnostic call"}
                </span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </MagneticButton>
              <MagneticButton
                onClick={() => setLocation("/services#engagement-models")}
                className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black"
                glowColor="rgba(255, 255, 255, 0.15)"
              >
                <span className="text-xs font-display uppercase tracking-widest">
                  {lang === "pl" ? "Zobacz modele współpracy" : "See ways to work"}
                </span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
