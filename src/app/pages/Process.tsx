import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { Marquee } from "@/app/components/ui/Marquee";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation } from "wouter";

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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Stakeholder interviews, workflow audits, request-source analysis, tool stack review, pain-point mapping with hours-per-week cost evidence.", pl: "Wywiady ze stakeholderami, audyty workflow, analiza źródeł requestów, review stack narzędzi, mapowanie pain-pointów z dowodami kosztowymi w godzinach/tydzień." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A 1-page operational diagnosis with 5–7 prioritized bottlenecks and a recommended action sequence for the next 60 days.", pl: "Jednostronicowa diagnoza operacyjna z 5–7 priorytetyzowanymi wąskimi gardłami i zalecaną sekwencją działań na 60 dni." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Without diagnosis, every solution is a guess. Whether it's a landing page or a full system — we start from evidence, not intuition.", pl: "Bez diagnozy każde rozwiązanie to zgadywanka. Niezależnie czy to landing page czy pełny system — zaczynamy od dowodów, nie intuicji." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "3–5 days for focused projects, 1–2 weeks for organization-wide engagements.", pl: "3–5 dni dla fokusowanych projektów, 1–2 tygodnie dla zaangażowań organizacyjnych." } },
    ],
    metric: { en: "Time-to-cause for every recurring problem identified.", pl: "Czas do zidentyfikowania przyczyny każdego zidentyfikowanego problemu." },
  },
  {
    num: "02",
    title: { en: "Map", pl: "Mapowanie" },
    subtitle: { en: "Understand the demand landscape", pl: "Zrozumieć krajobraz zapotrzebowania" },
    goal: {
      en: "We map what's coming in — who requests what, how often, in what format, with what urgency. This turns an infinite backlog into a classified, manageable system.",
      pl: "Mapujemy co przychodzi — kto, co, jak często, w jakim formacie, z jaką pilnością. To zamienia nieskończony backlog w sklasyfikowany, zarządzalny system.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Intake channel audit, request typology (strategic / urgent / local / cyclical / low-value), stakeholder volume analysis, seasonality mapping.", pl: "Audyt kanałów intake, typologia requestów (strategiczne / pilne / lokalne / cykliczne / niskowartościowe), analiza wolumenu per stakeholder, mapowanie sezonowości." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A demand map with volumes per stakeholder, a seasonal heatmap, request typology with clear definitions, and a list of requests to reject or defer.", pl: "Mapa popytu z wolumenami per stakeholder, heatmapa sezonowa, typologia requestów z definicjami i lista requestów do odrzucenia lub odroczenia." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "You can't prioritize what you haven't classified. Mapping turns 'everything is ASAP' into a system where every request has a clear category on intake.", pl: "Nie priorytetyzujesz tego, czego nie sklasyfikowałeś. Mapowanie zamienia 'wszystko jest ASAP' w system, gdzie każdy request ma jasną kategorię na wejściu." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1 week. Often runs in parallel with Diagnose for larger engagements.", pl: "1 tydzień. Często przebiega równolegle z Diagnozą przy większych zaangażowaniach." } },
    ],
    metric: { en: "% of requests with clear classification on intake (target 95%+).", pl: "% requestów z jasną klasyfikacją na wejściu (cel 95%+)." },
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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Brief templates (standard / local / express), Definition of Ready, 4-axis scoring rubric, weekly triage cadence, Creative Quality Playbook, QA checklists per asset type.", pl: "Szablony briefów (standard / local / express), Definition of Ready, 4-osiowa matryca scoringowa, tygodniowy triage, Creative Quality Playbook, QA checklisty per typ assetu." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Template library, prioritization rubric, quality playbook (50+ entries), QA checklists, AI brief assistant with custom prompts, and a 90-day adoption playbook.", pl: "Biblioteka szablonów, matryca priorytetyzacji, quality playbook (50+ pozycji), QA checklisty, AI asystent briefu z promptami i 90-dniowy playbook adopcji." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Standards eliminate revision loops. When the brief is complete on first submission and quality criteria are shared, feedback becomes precise — not political.", pl: "Standardy eliminują pętle poprawek. Kiedy brief jest kompletny przy pierwszym złożeniu a kryteria jakości są wspólne, feedback staje się precyzyjny — nie polityczny." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "2–3 weeks. The heaviest intellectual phase — this is where the system's DNA gets written.", pl: "2–3 tygodnie. Najcięższa faza intelektualnie — tu pisze się DNA systemu." } },
    ],
    metric: { en: "% of briefs meeting Definition of Ready on first submission (target 80%+).", pl: "% briefów spełniających Definition of Ready przy pierwszym złożeniu (cel 80%+)." },
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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "UX/UI design, brand systems, campaign assets, component libraries, production workflows, RACI per asset type, handoff specs, tool integrations (Asana / Notion / Figma / Slack).", pl: "Design UX/UI, systemy marki, assety kampanijne, biblioteki komponentów, workflow produkcji, RACI per typ assetu, specyfikacje handoffu, integracje narzędzi (Asana / Notion / Figma / Slack)." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Production-ready files, systems, and documentation. Service blueprints, workflow diagrams, component libraries — whatever the project demands. Your team uses it from day one.", pl: "Gotowe do produkcji pliki, systemy i dokumentacja. Service blueprinty, diagramy workflow, biblioteki komponentów — cokolwiek wymaga projekt. Twój zespół używa tego od dnia pierwszego." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Craft without structure dies on delivery. We combine senior execution with the standards from Phase 03, so quality is consistent — not heroic.", pl: "Rzemiosło bez struktury umiera na dostarczeniu. Łączymy seniorską egzekucję ze standardami z Fazy 03, więc jakość jest powtarzalna — nie heroiczna." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "2–12 weeks depending on scope. Delivered in weekly sprints with visible progress at every checkpoint.", pl: "2–12 tygodni w zależności od zakresu. Dostarczane w tygodniowych sprintach z widocznym postępem na każdym checkpoincie." } },
    ],
    metric: { en: "Cycle time from brief in DoR to delivered asset.", pl: "Cycle time od briefu w DoR do dostarczonego assetu." },
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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Governance model, decision rights map, escalation paths, change request process, conflict resolution protocol, decision log structure.", pl: "Model governance, mapa praw decyzyjnych, ścieżki eskalacji, proces change requestów, protokół rozwiązywania konfliktów, struktura logu decyzji." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Governance playbook, RACI for approvals, decision log template, escalation protocol. Every decision has an owner and a paper trail.", pl: "Governance playbook, RACI dla akceptacji, szablon logu decyzji, protokół eskalacji. Każda decyzja ma ownera i ślad." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Most revision loops aren't about quality — they're about unclear ownership. When everyone knows who decides what, cycles shrink dramatically.", pl: "Większość pętli poprawek nie dotyczy jakości — dotyczy niejasnego ownershipa. Kiedy wszyscy wiedzą kto decyduje o czym, cykle drastycznie się skracają." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1–2 weeks. Defined in parallel with Build, enforced from first delivery.", pl: "1–2 tygodnie. Definiowane równolegle z Budową, egzekwowane od pierwszej dostawy." } },
    ],
    metric: { en: "Average decision time + decision reversal rate (both trending down).", pl: "Średni czas decyzji + wskaźnik cofania decyzji (oba w trendzie spadkowym)." },
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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "QA checklists per asset type, structured review rounds, stakeholder sign-off against governance rules, handoff documentation, developer specs where applicable.", pl: "QA checklisty per typ assetu, ustrukturyzowane rundy review, sign-off stakeholderów zgodnie z governance, dokumentacja handoffu, specyfikacje deweloperskie tam, gdzie potrzebne." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Approved, production-ready files with clear handoff specs. Your team knows exactly what was delivered, why, and how to implement it.", pl: "Zatwierdzone, gotowe do produkcji pliki z jasnymi specyfikacjami handoffu. Twój zespół wie dokładnie co dostarczono, dlaczego i jak to wdrożyć." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Shipping is where most processes break. We replace 'looks good I guess' with structured QA that anyone on the team can apply consistently.", pl: "Dostawa to moment, w którym większość procesów się łamie. Zastępujemy 'wygląda ok chyba' ustrukturyzowanym QA, które każdy w zespole może stosować spójnie." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "Built into each sprint — not a separate phase. QA happens continuously, not as a last-minute gate.", pl: "Wbudowane w każdy sprint — nie osobna faza. QA dzieje się ciągle, nie jako bramka na ostatnią chwilę." } },
    ],
    metric: { en: "% of work passing QA on first review (target 70%+).", pl: "% prac przechodzących QA przy pierwszym review (cel 70%+)." },
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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "KPI dashboard setup, baseline measurement, monthly review structure, adoption tracking per team/stakeholder, AI ops integration where applicable.", pl: "Setup dashboardu KPI, pomiar bazowy, struktura monthly review, tracking adopcji per zespół/stakeholder, integracja AI ops tam, gdzie to ma sens." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A measurement framework your team owns — cycle time, revision rates, brief quality scores, bottleneck frequency. Not a one-time report, a living system.", pl: "Framework pomiarowy, który Twój zespół posiada — cycle time, wskaźniki poprawek, scoring jakości briefów, częstotliwość wąskich gardeł. Nie jednorazowy raport, żywy system." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "What gets measured gets managed. Without a dashboard, teams revert to old habits within 90 days and you lose everything you built.", pl: "Co jest mierzone, jest zarządzane. Bez dashboardu zespoły wracają do starych nawyków w 90 dni i tracisz wszystko co zbudowałeś." } },
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
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Monthly review rituals, quarterly governance reviews, process optimization sprints, habit-reversion detection, AI ops layer updates, team coaching.", pl: "Miesięczne rytuały review, kwartalne governance reviews, sprinty optymalizacji procesu, wykrywanie powrotu do starych nawyków, aktualizacje warstwy AI ops, coaching zespołu." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "An evolving system with a built-in improvement rhythm. Optimization playbook, quarterly trend reports, updated playbooks and templates as the org changes.", pl: "Ewoluujący system z wbudowanym rytmem poprawy. Optimization playbook, kwartalne raporty trendów, zaktualizowane playbooki i szablony w miarę zmian w organizacji." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Every process decays. Teams change, tools change, priorities shift. Without iteration cadence, you'll rebuild from scratch in 12 months.", pl: "Każdy proces się degraduje. Zespoły się zmieniają, narzędzia się zmieniają, priorytety się przesuwają. Bez kadencji iteracji, za 12 miesięcy budujesz od zera." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "Ongoing — typically 1 session/month. Can be part of a retainer or fully handed off to your team.", pl: "Ciągłe — typowo 1 sesja/miesiąc. Może być częścią retainera lub w pełni przekazane Twojemu zespołowi." } },
    ],
    metric: { en: "Quarter-over-quarter trend of all metrics from phases 03–06.", pl: "Trend kwartał-do-kwartału wszystkich metryk z faz 03–06." },
  },
];

const TOTAL = steps.length;

const timelinePhases = [
  { label: { en: "Diagnose & Map", pl: "Diagnoza & Mapowanie" }, weeks: { en: "Week 1–2", pl: "Tydzień 1–2" }, steps: "01–02" },
  { label: { en: "Standardize", pl: "Standaryzacja" }, weeks: { en: "Week 3–5", pl: "Tydzień 3–5" }, steps: "03" },
  { label: { en: "Build & Govern", pl: "Budowa & Governance" }, weeks: { en: "Week 6–14", pl: "Tydzień 6–14" }, steps: "04–05" },
  { label: { en: "Ship & Measure", pl: "Dostawa & Pomiar" }, weeks: { en: "Week 12–16", pl: "Tydzień 12–16" }, steps: "06–07" },
  { label: { en: "Iterate", pl: "Iteracja" }, weeks: { en: "Ongoing", pl: "Ciągłe" }, steps: "08" },
];

const deliverables = {
  en: [
    "Operational diagnosis with cost evidence",
    "Demand map & request typology",
    "Brief templates & Definition of Ready",
    "Prioritization rubric & triage protocol",
    "Creative Quality Playbook (50+ entries)",
    "QA checklists per asset type",
    "Production workflows & RACI",
    "Service blueprints & handoff specs",
    "Governance playbook & decision log",
    "KPI dashboard & measurement framework",
    "Optimization playbook & review cadence",
    "AI brief assistant with custom prompts",
  ],
  pl: [
    "Diagnoza operacyjna z dowodami kosztowymi",
    "Mapa popytu i typologia requestów",
    "Szablony briefów i Definition of Ready",
    "Matryca priorytetyzacji i protokół triage",
    "Creative Quality Playbook (50+ pozycji)",
    "QA checklisty per typ assetu",
    "Workflow produkcji i RACI",
    "Service blueprinty i specyfikacje handoffu",
    "Governance playbook i log decyzji",
    "Dashboard KPI i framework pomiarowy",
    "Optimization playbook i kadencja review",
    "AI asystent briefu z promptami",
  ],
};

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
      {/* ─── 8-Step Tabs — page opener ─── */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="border border-neutral-200 dark:border-white/[0.12] rounded-lg overflow-hidden bg-neutral-50 dark:bg-[#141414]">
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
                      border-r border-neutral-200 dark:border-white/[0.06] last:border-r-0 px-4 py-5 text-left
                      flex flex-col gap-2 min-h-[90px] transition-all duration-300 cursor-pointer
                      ${i === activeStep
                        ? "bg-[#D4FF00] text-[#0A0A0A]"
                        : "bg-transparent text-neutral-400 dark:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-white/[0.03] hover:text-neutral-900 dark:hover:text-white"
                      }
                    `}
                  >
                    <span className={`font-mono text-[11px] tracking-wide ${i === activeStep ? "text-[#0A0A0A]/40" : ""}`}>
                      {s.num}
                    </span>
                    <span className={`text-[11px] md:text-xs font-medium leading-snug mt-auto ${i === activeStep ? "font-semibold text-[#0A0A0A]" : ""}`}>
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
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 md:p-12 lg:px-16"
                    role="tabpanel"
                  >
                    {/* Header — subtitle only */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white leading-snug max-w-[28ch] mb-10">
                      {step.subtitle[lang]}
                    </h3>

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
                    ← <span className="hidden sm:inline">{lang === "pl" ? "Poprzedni" : "Previous"}</span>
                  </button>
                  <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wide">
                    {String(activeStep + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => goToStep(activeStep + 1)}
                    disabled={activeStep === TOTAL - 1}
                    className="border border-neutral-300 dark:border-white/[0.12] rounded px-5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2 transition-all duration-300 hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.04] disabled:opacity-15 disabled:cursor-not-allowed disabled:hover:border-neutral-300 disabled:hover:text-neutral-600 disabled:hover:bg-transparent cursor-pointer"
                  >
                    <span className="hidden sm:inline">{lang === "pl" ? "Następny" : "Next"}</span> →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Marquee break ─── */}
      <Marquee />

      {/* ─── Timeline ─── */}
      <section className="py-24 md:py-32 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
              {lang === "pl" ? "Oś czasu" : "Timeline"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-16 leading-[0.95] max-w-[24ch]">
              {lang === "pl"
                ? "Od diagnozy do działającego systemu w jednym kwartale."
                : "From diagnosis to a running system in one quarter."}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-neutral-200 dark:bg-white/[0.06] rounded-lg overflow-hidden">
            {timelinePhases.map((phase, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className={`bg-white dark:bg-[#141414] p-8 md:p-10 h-full flex flex-col gap-4 transition-colors duration-500 hover:bg-neutral-50 dark:hover:bg-white/[0.03] group ${i === timelinePhases.length - 1 ? "dark:bg-[#D4FF00]/[0.04]" : ""}`}>
                  <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-wide">
                    {phase.steps}
                  </span>
                  <span className="text-base font-semibold text-neutral-900 dark:text-white group-hover:tracking-tight transition-all duration-500">
                    {phase.label[lang]}
                  </span>
                  <span className={`text-sm mt-auto font-medium ${i === timelinePhases.length - 1 ? "text-[#9abb00] dark:text-[#D4FF00]" : "text-neutral-400 dark:text-neutral-600"}`}>
                    {phase.weeks[lang]}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-sm text-neutral-500 dark:text-neutral-600 mt-8 max-w-[64ch] leading-relaxed">
              {lang === "pl"
                ? "Oś czasu zależy od zakresu. Fokusowane projekty (landing page, kampania) przechodzą przez kroki 01–06 w 4–6 tygodni. Pełne wdrożenia Creative Ops: 12–16 tygodni + ongoing."
                : "Timeline depends on scope. Focused projects (landing page, campaign) go through steps 01–06 in 4–6 weeks. Full Creative Ops implementations: 12–16 weeks + ongoing."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Deliverables ─── */}
      <section className="py-24 md:py-32 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  Deliverables
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 leading-[0.95]">
                  {lang === "pl"
                    ? "Co zostaje po wdrożeniu."
                    : "What stays after implementation."}
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {lang === "pl"
                    ? "Nie zostawiamy rekomendacji — zostawiamy system. Artefakty operacyjne, których Twój zespół używa codziennie."
                    : "We don't leave recommendations — we leave a system. Operational artifacts your team uses every day."}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
                {deliverables[lang].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 border-b border-neutral-100 dark:border-white/[0.05] group hover:border-neutral-300 dark:hover:border-white/[0.12] transition-colors duration-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9abb00] dark:bg-[#D4FF00] mt-[7px] shrink-0 group-hover:scale-150 transition-transform duration-500" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{item}</span>
                  </div>
                ))}
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8 leading-[0.95]">
                {lang === "pl"
                  ? "Każdy projekt zaczyna się od diagnozy."
                  : "Every project starts with a diagnosis."}
              </h2>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {lang === "pl"
                  ? "30 minut wystarczy, żeby zrozumieć gdzie Twój zespół traci czas, pieniądze i jakość. Bez zobowiązań — porozmawiajmy o tym, co można naprawić."
                  : "30 minutes is enough to understand where your team is losing time, money, and quality. No commitment — let's talk about what can be fixed."}
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
                  {lang === "pl" ? "Umów diagnozę" : "Book a diagnosis"}
                </span>
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
              </MagneticButton>
              <MagneticButton
                onClick={() => setLocation("/work")}
                className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black"
                glowColor="rgba(255, 255, 255, 0.15)"
              >
                <span className="text-xs font-display uppercase tracking-widest">
                  {lang === "pl" ? "Zobacz efekty" : "See results"}
                </span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
