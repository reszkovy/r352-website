import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation, Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { R3LoopBadge } from "@/app/components/ui/R3LoopBadge";
import { EffectBackdrop } from "@/app/components/ui/EffectBackdrop";

// Living topographic map behind the hero - "pick one peak" made visible.
// EASY REVERT: flip to false to restore the plain hero exactly.
const PROCESS_PEAK = true;

// ─── 8-step methodology ──────────────────────────────────
interface Step {
  num: string;
  title: { en: string; pl: string };
  subtitle: { en: string; pl: string };
  goal: { en: string; pl: string };
  cards: { label: { en: string; pl: string }; text: { en: string; pl: string } }[];
  metric: { en: string; pl: string };
  // Explicit pass/fail gate question per step - sourced verbatim from
  // r3loop-spec-v2.md "Decision gate" fields. The gate is what makes each
  // step teachable and productizable (methodology 4-checklist, test #3).
  gate: { en: string; pl: string };
}

const steps: Step[] = [
  {
    num: "01",
    title: { en: "Diagnose", pl: "Diagnoza" },
    subtitle: { en: "Find the real problem before designing anything", pl: "Znaleźć realny problem zanim cokolwiek zaprojektujemy" },
    goal: {
      en: "We audit the current state - workflows, bottlenecks, stakeholders, tools, and decision paths. No assumptions, only evidence with time-cost data.",
      pl: "Audytujemy stan obecny - workflow, wąskie gardła, stakeholderzy, narzędzia i ścieżki decyzyjne. Bez założeń, tylko dowody z danymi o kosztach czasowych.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Stakeholder interviews, workflow audit, request source analysis, tool review and pain-point mapping with estimated time cost.", pl: "Wywiady ze stakeholderami, audyt workflow, analiza źródeł requestów, przegląd narzędzi i mapowanie pain-pointów z szacowanym kosztem czasowym." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A 1-page operational diagnosis with 5-7 prioritized bottlenecks and a recommended action sequence for the next 60 days.", pl: "Jednostronicowa diagnoza operacyjna z 5-7 priorytetyzowanymi wąskimi gardłami i zalecaną sekwencją działań na 60 dni." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Without diagnosis, every solution is a guess - even if it looks good.", pl: "Bez diagnozy każde rozwiązanie to zgadywanka - nawet jeśli wygląda dobrze." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "3-5 days for focused projects, 1-2 weeks for organization-wide engagements.", pl: "3-5 dni dla fokusowanych projektów, 1-2 tygodnie dla zaangażowań organizacyjnych." } },
    ],
    metric: { en: "Time to root cause for every recurring problem.", pl: "Czas do zidentyfikowania przyczyny każdego powtarzającego się problemu." },
    gate: {
      en: "Can we describe the operational problem in one sentence with a concrete time-cost number? If not - stay in Diagnose.",
      pl: "Czy potrafimy opisać problem operacyjny w jednym zdaniu z konkretną liczbą kosztu czasowego? Jeśli nie - zostań w Diagnozie.",
    },
  },
  {
    num: "02",
    title: { en: "Map", pl: "Mapowanie" },
    subtitle: { en: "Understand the demand landscape", pl: "Zrozumieć krajobraz popytu" },
    goal: {
      en: "We map what's coming in - who requests what, how often, in what format, with what urgency. This turns an infinite backlog into a classified, manageable system.",
      pl: "Mapujemy co przychodzi - kto, co, jak często, w jakim formacie, z jaką pilnością. To zamienia nieskończony backlog w sklasyfikowany, zarządzalny system.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Audit of where requests come from, classification of request types, stakeholder volume analysis and seasonality mapping.", pl: "Audyt skąd przychodzą requesty, klasyfikacja typów requestów, analiza wolumenu per stakeholder i mapowanie sezonowości." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A demand map showing request volume by stakeholder, recurring seasonal patterns, clear request categories and a list of requests to accept, reject or defer.", pl: "Mapa popytu pokazująca wolumen requestów per stakeholder, powtarzające się wzorce sezonowe, jasne kategorie requestów i listę requestów do zaakceptowania, odrzucenia lub odłożenia." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "You cannot prioritize what you have not classified. Mapping turns 'everything is urgent' into a system where every request has a clear place.", pl: "Nie priorytetyzujesz tego, czego nie sklasyfikowałeś. Mapowanie zamienia 'wszystko jest pilne' w system, gdzie każdy request ma jasne miejsce." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1 week. Often runs in parallel with diagnosis for larger engagements.", pl: "1 tydzień. Często przebiega równolegle z diagnozą przy większych zaangażowaniach." } },
    ],
    metric: { en: "% of requests with a clear category at intake (target 95%+).", pl: "% requestów z jasną kategorią na wejściu (cel 95%+)." },
    gate: {
      en: "Can a new request be classified into a category at intake within 30 seconds, by anyone? If less than 95% categorize cleanly - refine the taxonomy.",
      pl: "Czy nowy request da się sklasyfikować do kategorii na wejściu w 30 sekund, przez kogokolwiek? Jeśli mniej niż 95% klasyfikuje się czysto - dopracuj taksonomię.",
    },
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
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "2-3 weeks. This is the heaviest intellectual phase - where the system's operating logic gets written.", pl: "2-3 tygodnie. Najcięższa faza intelektualnie - tutaj pisze się operacyjna logika systemu." } },
    ],
    metric: { en: "% of briefs meeting the readiness checklist on first submission (target 80%+).", pl: "% briefów spełniających listę gotowości przy pierwszym złożeniu (cel 80%+)." },
    gate: {
      en: "Can a junior team member fill a brief without asking the lead designer questions, using only the template + checklist? If no - refine the template.",
      pl: "Czy junior może wypełnić brief bez zadawania pytań lead designerowi, korzystając tylko z szablonu i checklisty? Jeśli nie - dopracuj szablon.",
    },
  },
  {
    num: "04",
    title: { en: "Build", pl: "Budowa" },
    subtitle: { en: "Create what ships - systems, interfaces, assets", pl: "Tworzyć to, co idzie na produkcję" },
    goal: {
      en: "Senior-level execution against the standards from Phase 03. Whether it's UX/UI, brand system, campaign toolkit, or operational playbook - we build production-ready deliverables, not concepts.",
      pl: "Egzekucja na seniorskim poziomie zgodnie ze standardami z Fazy 03. Niezależnie czy to UX/UI, system marki, toolkit kampanijny czy playbook operacyjny - budujemy gotowe do produkcji deliverables, nie koncepty.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "UX and interface design, brand systems, campaign assets, component libraries, production workflows, approval ownership by asset type, handoff instructions and tool integrations.", pl: "Design UX i interfejsów, systemy marki, assety kampanijne, biblioteki komponentów, workflow produkcji, mapa ownership akceptacji per typ assetu, instrukcje handoffu i integracje narzędzi." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "Production-ready files, systems and documentation. This can include service blueprints, workflow diagrams, component libraries, campaign assets or interfaces - depending on what the project needs.", pl: "Gotowe do produkcji pliki, systemy i dokumentacja. To może obejmować service blueprinty, diagramy workflow, biblioteki komponentów, assety kampanijne lub interfejsy - w zależności od potrzeb projektu." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Craft without structure breaks during delivery. We combine senior execution with clear standards, so quality becomes repeatable instead of heroic.", pl: "Rzemiosło bez struktury łamie się przy dostawie. Łączymy seniorską egzekucję z jasnymi standardami, więc jakość staje się powtarzalna zamiast heroiczna." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "2-12 weeks depending on scope. Delivered in weekly sprints with visible progress at every checkpoint.", pl: "2-12 tygodni w zależności od zakresu. Dostarczane w tygodniowych sprintach z widocznym postępem na każdym checkpoincie." } },
    ],
    metric: { en: "Cycle time from approved brief to delivered asset.", pl: "Cycle time od zatwierdzonego briefu do dostarczonego assetu." },
    gate: {
      en: "Can a developer or team implement this without asking a single question? Test 3 random items. If they ask - close the specs.",
      pl: "Czy developer lub zespół może to wdrożyć bez zadania ani jednego pytania? Przetestuj 3 losowe elementy. Jeśli pytają - domknij specyfikacje.",
    },
  },
  {
    num: "05",
    title: { en: "Govern", pl: "Governance" },
    subtitle: { en: "Define who decides, how, and when", pl: "Zdefiniować kto decyduje, jak i kiedy" },
    goal: {
      en: "We define ownership, approval paths, change request rules, and decision logs - so decisions are traceable and don't bottleneck on one person.",
      pl: "Definiujemy ownership, ścieżki akceptacji, zasady change requestów i logi decyzji - żeby decyzje były śledzalne i nie blokowały się na jednej osobie.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Decision ownership model, approval rules, escalation paths, change request process, conflict resolution rules and decision log structure.", pl: "Model ownership decyzji, zasady akceptacji, ścieżki eskalacji, proces change requestów, zasady rozwiązywania konfliktów i struktura logu decyzji." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A clear decision playbook. Everyone knows who approves what, how changes are handled and where important decisions are documented.", pl: "Jasny decision playbook. Każdy wie kto akceptuje co, jak obsługiwane są zmiany i gdzie dokumentowane są ważne decyzje." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Most revision loops are not about quality. They happen because ownership is unclear. When everyone knows who decides what, projects move faster.", pl: "Większość pętli poprawek nie dotyczy jakości. Pojawiają się bo ownership jest niejasny. Kiedy wszyscy wiedzą kto decyduje o czym, projekty idą szybciej." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1-2 weeks. Defined in parallel with Build, enforced from first delivery.", pl: "1-2 tygodnie. Definiowane równolegle z Budową, egzekwowane od pierwszej dostawy." } },
    ],
    metric: { en: "Average decision time and decision reversal rate (both trending down).", pl: "Średni czas decyzji i wskaźnik cofania decyzji (oba w trendzie spadkowym)." },
    gate: {
      en: "For any artifact, can we name who approved it, when, and what the rationale was? If less than 95% traceability - fix the logging.",
      pl: "Czy dla dowolnego artefaktu potrafimy wskazać kto go zatwierdził, kiedy i jakie było uzasadnienie? Jeśli śledzalność poniżej 95% - napraw logowanie.",
    },
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
    gate: {
      en: "Did the deliverable match the brief AND pass the quality checklist AND get sign-off from the named owner? If any answer is no - don't ship.",
      pl: "Czy deliverable odpowiada briefowi ORAZ przeszedł quality checklistę ORAZ ma sign-off od nazwanego ownera? Jeśli którakolwiek odpowiedź brzmi nie - nie wysyłaj.",
    },
  },
  {
    num: "07",
    title: { en: "Measure", pl: "Pomiar" },
    subtitle: { en: "Track what actually changed", pl: "Śledzić co się naprawdę zmieniło" },
    goal: {
      en: "We set up measurement infrastructure - KPI dashboards, review cadences, adoption tracking. Without data, you can't prove the system works or find where it's leaking.",
      pl: "Stawiamy infrastrukturę pomiarową - dashboardy KPI, kadencje review, tracking adopcji. Bez danych nie udowodnisz że system działa ani nie znajdziesz gdzie przecieka.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Workflow performance dashboard setup, baseline measurement, monthly review structure, adoption tracking by team and AI workflow integration where useful.", pl: "Setup dashboardu workflow performance, pomiar bazowy, struktura miesięcznego review, tracking adopcji per zespół i integracja AI workflow tam gdzie to ma sens." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A measurement framework your team can use to track cycle time, revision rates, brief quality, recurring bottlenecks and adoption of the new process.", pl: "Framework pomiarowy, którego Twój zespół może używać do śledzenia cycle time, wskaźników poprawek, jakości briefów, powtarzających się wąskich gardeł i adopcji nowego procesu." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "If you do not measure the workflow, you end up managing opinions instead of real problems.", pl: "Jeśli nie mierzysz workflow, kończysz zarządzając opiniami zamiast realnymi problemami." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "1-2 weeks for setup. Then it runs continuously as part of the operating rhythm.", pl: "1-2 tygodnie na setup. Potem działa ciągle jako część rytmu operacyjnego." } },
    ],
    metric: { en: "Dashboard live + first baseline captured within 2 weeks of system launch.", pl: "Dashboard live + pierwszy baseline uchwycony w ciągu 2 tygodni od launchu systemu." },
    gate: {
      en: "Can we show 3 measurable improvements vs baseline within 60 days? If no - the system isn't working, or the measurement is broken.",
      pl: "Czy możemy pokazać 3 mierzalne usprawnienia względem baseline'u w ciągu 60 dni? Jeśli nie - system nie działa albo pomiar jest zepsuty.",
    },
  },
  {
    num: "08",
    title: { en: "Iterate", pl: "Iteracja" },
    subtitle: { en: "Keep the system alive, not frozen", pl: "Utrzymać system żywym, nie zamrożonym" },
    goal: {
      en: "We run monthly reviews, quarterly governance checks, and process optimization cycles. The system adapts to the changing organization - it doesn't become shelf-ware.",
      pl: "Prowadzimy monthly review, kwartalne governance checks i cykle optymalizacji procesu. System adaptuje się do zmieniającej się organizacji - nie staje się półkowym dokumentem.",
    },
    cards: [
      { label: { en: "What we do", pl: "Co robimy" }, text: { en: "Monthly review sessions, quarterly process reviews, optimization sprints, checks for old workflow habits, AI workflow updates and team coaching.", pl: "Miesięczne sesje review, kwartalne review procesu, sprinty optymalizacji, sprawdzanie powrotu do starych nawyków workflow, aktualizacje AI workflow i coaching zespołu." } },
      { label: { en: "What you get", pl: "Co dostajesz" }, text: { en: "A system that keeps improving instead of becoming outdated. Your team gets updated templates, process recommendations, quarterly trend reviews and a clear rhythm for improving how work gets done.", pl: "System, który ciągle się poprawia zamiast stawać się przestarzały. Twój zespół dostaje zaktualizowane szablony, rekomendacje procesowe, kwartalne review trendów i jasny rytm poprawy tego jak praca jest wykonywana." } },
      { label: { en: "Why it matters", pl: "Dlaczego to ważne" }, text: { en: "Every process decays. Teams change, tools change and priorities shift. Without a review rhythm, the system slowly stops working and the team returns to old habits.", pl: "Każdy proces się degraduje. Zespoły się zmieniają, narzędzia się zmieniają i priorytety się przesuwają. Bez rytmu review system powoli przestaje działać a zespół wraca do starych nawyków." } },
      { label: { en: "Typical duration", pl: "Typowy czas" }, text: { en: "Ongoing - typically 1 session per month. Can be part of a retainer or fully handed off to your team.", pl: "Ciągłe - typowo 1 sesja miesięcznie. Może być częścią retainera lub w pełni przekazane Twojemu zespołowi." } },
    ],
    metric: { en: "Quarter-over-quarter trend of all metrics from phases 03-06.", pl: "Trend kwartał-do-kwartału wszystkich metryk z faz 03-06." },
    gate: {
      en: "Can the system's owner take a 2-week vacation without anything breaking? If no - the system isn't yet operating on its own. Stay in Iterate.",
      pl: "Czy właściciel systemu może wziąć 2 tygodnie urlopu bez tego, żeby cokolwiek się rozsypało? Jeśli nie - system jeszcze nie działa samodzielnie. Zostań w Iteracji.",
    },
  },
];

const TOTAL = steps.length;

export function Process() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeStep, setActiveStep] = useState(0);

  // Q4 r3loop Playbook - discreet editorial version (redesigned 2026-06-10).
  // Flip to false to hide the waitlist section entirely.
  const SHOW_PLAYBOOK = true;

  // Q4 r3loop Playbook waitlist state.
  // On submit: fires Plausible custom event (tracked in dashboard) + opens user's
  // mail client with prefilled subject/body so signups land in hello@r352.com
  // until a proper ESP (Mailchimp / Klaviyo / Loops) is wired up.
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const lang = language as "en" | "pl";

  const goToStep = useCallback((idx: number) => {
    setActiveStep(Math.max(0, Math.min(TOTAL - 1, idx)));
  }, []);

  const step = steps[activeStep];
  const progressPct = ((activeStep + 1) / TOTAL) * 100;

  // HowTo schema - JSON-LD describing r3loop as a structured 8-step process.
  // LLMs and search engines prefer this over loose prose when a user asks
  // "how does r3loop work" or "what are the steps of r352's methodology".
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "r3loop - r352's 8-step methodology for operational design systems",
    "description":
      "r3loop is r352's branded methodology. Eight sequential steps that turn operational chaos into a working design system. Sequence stays constant; depth of each step scales to engagement size.",
    "url": "https://www.r352.com/process",
    "totalTime": "P12W",
    "step": steps.map((s, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": s.title.en,
      "text": `${s.goal.en} Decision gate: ${s.gate.en}`,
      "url": `https://www.r352.com/process#step-${s.num}`,
    })),
    "supply": {
      "@type": "HowToSupply",
      "name": "Existing design operations state, stakeholder access, current brief intake process, design files and tool configurations",
    },
    "tool": {
      "@type": "HowToTool",
      "name": "r352 operating frameworks: brief templates, governance gates (Master/Variant/Pre-production), prioritization system, weekly cadence",
    },
  };

  return (
    <PageTransition>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Helmet>
      {/* ─── Intro Hook - 12-col 7+5 (H1 left, supporting right) ─── */}
      <section className="relative isolate pt-32 pb-16 md:pt-40 md:pb-20 px-8 md:px-12 overflow-hidden">
        {PROCESS_PEAK && <EffectBackdrop effect="peak" className="-z-10" />}
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
              <div className="col-span-12 md:col-span-7">
                <div className="flex items-center gap-3 mb-6">
                  <R3LoopBadge size="md" />
                  <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 font-display">
                    {lang === "pl" ? "Metodologia r352" : "r352 Methodology"}
                  </span>
                </div>
                <h1 className="text-5xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
                  {lang === "pl" ? (
                    <>
                      Większość problemów<br className="hidden md:block" />
                      {" "}z designem to nie<br className="hidden md:block" />
                      {" "}problemy z designem.
                    </>
                  ) : (
                    <>
                      Most design<br className="hidden md:block" />
                      {" "}problems are not<br className="hidden md:block" />
                      {" "}design problems.
                    </>
                  )}
                </h1>
              </div>
              <div className="col-span-12 md:col-span-5 md:justify-self-end max-w-xl space-y-6">
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-snug font-medium tracking-tight">
                  {lang === "pl"
                    ? "Wynikają z niejasnych briefów, rozproszonych requestów, wolnych decyzji, słabego ownership'u i brakujących standardów jakości."
                    : "They come from unclear briefs, scattered requests, slow decisions, weak ownership and missing quality standards."}
                </p>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {lang === "pl"
                    ? "r3loop to nasza 8-krokowa metodologia end-to-end - od diagnozy operacyjnej i mapowania popytu, przez standardy i produkcję, po pomiar i ciągłe usprawnianie. Tę samą sekwencję stosujemy do każdego klienta - głębokość kroków skaluje się z zakresem zaangażowania."
                    : "r3loop is our 8-step end-to-end methodology - from operational diagnosis and demand mapping, through standards and production, to measurement and continuous improvement. We apply the same sequence to every client - the depth of each step scales with engagement size."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 8-Step Tabs - interactive deep-dive (is the process map) ─── */}
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
                    {/* Sliding active background - Framer animates between tabs via shared layoutId */}
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
                    {/* Header - subtitle, single line on md+ */}
                    <motion.h3
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal tracking-tight text-neutral-900 dark:text-white leading-snug md:whitespace-nowrap mb-10"
                    >
                      {step.subtitle[lang]}
                    </motion.h3>

                    {/* Detail grid - editorial layout, no boxy cards */}
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

                    {/* Decision gate - the explicit pass/fail question for this step.
                        Verbatim from r3loop-spec-v2.md. This is what separates a
                        methodology from talking points: every step can be failed. */}
                    <div className="flex items-start gap-5 pt-8 border-t border-neutral-100 dark:border-white/[0.06]">
                      <span className="font-mono text-[10px] text-[#9abb00] dark:text-[#D4FF00] uppercase tracking-[0.15em] mt-[3px] shrink-0 whitespace-nowrap">
                        Decision gate
                      </span>
                      <span className="text-[15px] text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium [text-wrap:pretty]">
                        {step.gate[lang]}
                      </span>
                    </div>

                    {/* Metric - minimal accent line */}
                    <div className="flex items-start gap-5 pt-6 mt-6 border-t border-neutral-100 dark:border-white/[0.06]">
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

          {/* Static full-methodology index - visually hidden, always in the DOM.
              The interactive tabs above only mount ONE step panel at a time,
              which means prerendered HTML (and any crawler / LLM / scoring
              pass reading static markup) would see 1/8 of the methodology.
              This sr-only block guarantees every step's goal, deliverables,
              decision gate and KPI exist in the rendered DOM at all times. */}
          <div className="sr-only">
            <h2>{lang === "pl" ? "r3loop - wszystkie 8 kroków, decision gates i KPI" : "r3loop - all 8 steps, decision gates and KPIs"}</h2>
            <ol>
              {steps.map((s) => (
                <li key={s.num} id={`step-${s.num}`}>
                  <h3>{s.num} - {s.title[lang]}: {s.subtitle[lang]}</h3>
                  <p>{s.goal[lang]}</p>
                  {s.cards.map((card, ci) => (
                    <p key={ci}><strong>{card.label[lang]}:</strong> {card.text[lang]}</p>
                  ))}
                  <p><strong>Decision gate:</strong> {s.gate[lang]}</p>
                  <p><strong>KPI:</strong> {s.metric[lang]}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ─── Operating Model - presence drops across r3loop steps ─────────
          The killer IP graph: shows Reszek's involvement falling from 90% at
          Diagnose to 15% at Iterate. Anti-time-for-money thesis made visual.
          Client buys a system that runs increasingly without me - proof it's
          a system, not hours. Migrated from former /framework page.
          Anchor #operating-model - deep-linked from home page Operating Model teaser. */}
      <section id="operating-model" className="py-24 md:py-32 border-b border-neutral-200 dark:border-white/10 scroll-mt-24">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <span className="block text-[11px] uppercase tracking-[0.25em] text-neutral-800 dark:text-[#D4FF00] font-display mb-4">
                {lang === "pl" ? "Operating Model" : "Operating Model"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05] mb-6">
                {lang === "pl" ? "Nasza obecność maleje z każdym krokiem." : "Our presence decreases with each step."}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                {lang === "pl"
                  ? "Średnia po stabilizacji: ~40%. Docelowy podział 80/20 - strategia vs operacje. Klient kupuje system, który po wdrożeniu działa coraz bardziej bez nas. To dowód, że to system, nie godziny."
                  : "Average after stabilization: ~40%. Target 80/20 split - strategy vs operations. The client buys a system that runs increasingly without us. Proof it's a system, not hours."}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="overflow-hidden border-t border-neutral-200 dark:border-white/10">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02]">
                    <th className="text-left py-3 px-4 md:px-6 text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500">
                      {lang === "pl" ? "Krok" : "Step"}
                    </th>
                    <th className="text-left py-3 px-4 md:px-6 text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500">
                      {lang === "pl" ? "Nasza obecność" : "Our presence"}
                    </th>
                    <th className="text-left py-3 px-4 md:px-6 text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 hidden md:table-cell">
                      {lang === "pl" ? "Rola" : "Role"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map((s, i) => {
                    // Presence drops across r3loop steps - Diagnose is hands-on,
                    // Iterate runs without daily involvement.
                    const presenceMap = ["90%", "80%", "70%", "50%", "35%", "30%", "20%", "15%"];
                    const presence = presenceMap[i] ?? "30%";
                    const role = i <= 1
                      ? (lang === "pl" ? "Architekt i decydent" : "Architect & decision-maker")
                      : i <= 3
                      ? (lang === "pl" ? "Kierunkowy i kontroler jakości" : "Director & quality controller")
                      : (lang === "pl" ? "Strategiczny nadzorca" : "Strategic overseer");
                    return (
                      <tr key={s.num} className="border-b border-neutral-200 dark:border-white/10 last:border-b-0">
                        <td className="py-4 px-4 md:px-6 text-sm">
                          <span className="font-display text-neutral-900 dark:text-[#D4FF00] mr-3">{s.num}</span>
                          <span className="text-neutral-900 dark:text-white font-medium">{s.title[lang]}</span>
                        </td>
                        <td className="py-4 px-4 md:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-neutral-200 dark:bg-white/10 relative">
                              <div
                                className="absolute left-0 top-0 h-full bg-[#D4FF00]"
                                style={{ width: presence }}
                              />
                            </div>
                            <span className="font-display text-sm text-neutral-900 dark:text-white">{presence}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 md:px-6 text-sm text-neutral-600 dark:text-neutral-400 hidden md:table-cell">
                          {role}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Survival sentence + explicit anti-hourly claim - the structural
              "why" behind the presence drop. References documented decision
              criteria, KPIs, trained owners and AI agents (not personal traits). */}
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-3xl space-y-4">
              <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium [text-wrap:pretty]">
                {lang === "pl"
                  ? "r3loop działa bez nas, bo każdy krok ma udokumentowane kryteria decyzyjne, mierzalne KPI, przeszkolonych ownerów po stronie klienta i agentów AI między bramkami."
                  : "r3loop runs without us because every step has documented decision criteria, measurable KPIs, trained client owners, and AI agents between gates."}
              </p>
              <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                {lang === "pl"
                  ? "Nie sprzedajemy obecności ani godzin. System działa bez nas - i właśnie za to płacisz."
                  : "We don't sell presence and we don't sell hours. The system runs without us - that's exactly what you're paying for."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Who this is for ─── */}
      <section className="py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          {/* Who this is for - role-based personas (migrated from former /framework
              "For operators who build systems" section). Each role gets a lime label
              + 1-sentence specific positioning. Replaces the previous flat team-type
              list with sharper persona qualification. */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16">
            <Reveal>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.25em] text-neutral-800 dark:text-[#D4FF00] font-display mb-4">
                  {lang === "pl" ? "Dla kogo" : "Who this is for"}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[1.05] mb-6">
                  {lang === "pl" ? "Dla operatorów, którzy budują systemy - nie tylko produkty." : "For operators who build systems - not just products."}
                </h2>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                  {lang === "pl"
                    ? "r3loop działa, kiedy stawka jest większa niż jeden ekran. Kiedy decyzje, które podejmiesz dziś, będą żyć w organizacji przez lata."
                    : "r3loop works when the stakes are bigger than one screen. When the decisions you make today will live in the organization for years."}
                </p>
              </div>
            </Reveal>
            <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10">
              {(lang === "pl" ? [
                { role: "Założyciel / CEO", desc: "Wypuszczasz SaaS lub digital product - chcesz uniknąć kosztownych poprawek i przepalonych iteracji." },
                { role: "Właściciel marki", desc: "Relaunchujesz tożsamość lub wchodzisz na nowy rynek - szukasz systemu, który utrzyma jakość bez Twojej obecności." },
                { role: "Lider operacji multi-location", desc: "Konsolidujesz operacje kreatywne dla 30-300+ lokalizacji - chcesz scenariuszy, nie improwizacji." },
                { role: "Product Manager", desc: "Dziedziczysz pół-zbudowany produkt - potrzebujesz domknięcia faz i wyciszenia ad-hoc requestów." },
                { role: "Lider marketingu", desc: "Przygotowujesz launch marki i kampanii - chcesz spójności tonu, narracji i wykonania." },
                { role: "Operating Partner", desc: "Budujesz operating system dla portfolio firm - potrzebujesz metodologii, która skaluje bez Ciebie." },
              ] : [
                { role: "Founder / CEO", desc: "You're launching a SaaS or digital product - you want to avoid costly revisions and burned iterations." },
                { role: "Brand owner", desc: "You're relaunching identity or entering a new market - you need a system that holds quality without your presence." },
                { role: "Multi-location ops leader", desc: "You're consolidating creative operations across 30-300+ locations - you want scenarios, not improvisation." },
                { role: "Product Manager", desc: "You've inherited a half-built product - you need phases closed and ad-hoc requests silenced." },
                { role: "Marketing leader", desc: "You're preparing a brand + campaign launch - you want consistent tone, narrative, and execution." },
                { role: "Operating Partner", desc: "You're building an operating system across portfolio companies - you need a methodology that scales without you." },
              ]).map((item, i) => (
                <Reveal key={i} delay={0.05 + i * 0.04}>
                  <li className="py-5">
                    <div className="text-[11px] font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-2">{item.role}</div>
                    <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">{item.desc}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── When this is too much - qualifier ─── */}
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

      {/* ─── r3loop in action - Geers/Sonova case (concrete proof with hard metrics)
          Migrated from former /framework Proof section. Replaces generic
          "multi-location marketing team" example with named client + numbers. */}
      <section className="py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {lang === "pl" ? "r3loop w działaniu" : "r3loop in action"}
                </span>
                <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white mb-8 leading-[1.05]">
                  {lang === "pl" ? (
                    <>Geers / Sonova<br className="hidden md:inline" /> 60+ salonów słuchowych.</>
                  ) : (
                    <>Geers / Sonova<br className="hidden md:inline" /> 60+ hearing-care studios.</>
                  )}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium tracking-tight [text-wrap:pretty]">
                  {lang === "pl"
                    ? "Chaos materiałów marketingowych: każdy salon improwizuje, brak jednolitej tożsamości w komunikacji, briefy chodzą przez e-mail."
                    : "Marketing materials chaos: every studio improvising, no unified identity in communication, briefs flying through email."}
                </p>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                  {lang === "pl"
                    ? "r3loop w akcji: kroki 02-03 (Map → Standardize) zdefiniowały klasyfikację requestów, brief templates i standardy jakości. Kroki 04-06 (Build → Govern → Ship) zbudowały design system + komponenty dostępne dla wszystkich lokalizacji. Krok 08 (Iterate) wprowadził miesięczny rytm review."
                    : "r3loop in action: steps 02-03 (Map → Standardize) defined request classification, brief templates and quality standards. Steps 04-06 (Build → Govern → Ship) delivered a design system + components accessible to all locations. Step 08 (Iterate) introduced a monthly review rhythm."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200 dark:border-white/10">
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-[#D4FF00] leading-none mb-2">
                      3×
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      {lang === "pl" ? "szybsze cykle akceptacji" : "faster approval cycles"}
                    </p>
                  </div>
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-[#D4FF00] leading-none mb-2">
                      80%
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      {lang === "pl" ? "briefów gotowych za pierwszym razem" : "briefs ready on first submission"}
                    </p>
                  </div>
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-[#D4FF00] leading-none mb-2">
                      15%
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      {lang === "pl" ? "nasza obecność po stabilizacji" : "our presence after stabilization"}
                    </p>
                  </div>
                </div>
                {/* Factual citation line - no fabricated quotes. Sourced from
                    r3loop docs: methodology in production since 2022; Sonova,
                    Archicom and Geers cite r3loop by name in case materials. */}
                <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 leading-relaxed pt-2 border-t border-neutral-200 dark:border-white/10">
                  {lang === "pl"
                    ? "r3loop w produkcji w Geers (Sonova Group) od 2022 - 60+ salonów. Klient cytuje metodologię z nazwy w materiałach case study."
                    : "r3loop in production at Geers (Sonova Group) since 2022 - 60+ studios. The client cites the methodology by name in case-study materials."}
                </p>
                <Link
                  href="/work/sonova"
                  className="group inline-flex items-center gap-2 mt-4 text-[11px] font-display uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 hover:text-[#D4FF00] transition-colors"
                >
                  <span>{lang === "pl" ? "Pełny case study" : "Full case study"}</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── r3loop sustained - Kubota long-term retainer + brand reactivation
          Paired with Geers proof (above). Different angle: Geers proves SCALE
          (60+ locations, multi-location ops fix); Kubota proves DURATION (3+ years,
          brand reactivation, IPO debut materials sustained on retainer model).
          Together: r3loop works across scale AND time. */}
      <section className="py-24 md:py-32 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-16 md:gap-24">
            <Reveal>
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-4">
                  {lang === "pl" ? "r3loop w długim dystansie" : "r3loop sustained"}
                </span>
                <h2 className="text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 dark:text-white mb-8 leading-[1.05]">
                  {lang === "pl" ? (
                    <>Kubota<br className="hidden md:inline" /> 3+ lata retainera.</>
                  ) : (
                    <>Kubota<br className="hidden md:inline" /> 3+ years on retainer.</>
                  )}
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium tracking-tight [text-wrap:pretty]">
                  {lang === "pl"
                    ? "Reaktywacja marki w drodze do debiutu giełdowego. Brand stracił momentum, potrzebował IPO-grade kommunikacji i ciągłej produkcji - bez wracania do projekt-po-projekcie chaos."
                    : "Brand reactivation on the road to a stock-exchange debut. The brand had lost momentum, needed IPO-grade communication and continuous production - without falling back into project-by-project chaos."}
                </p>
                <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                  {lang === "pl"
                    ? "r3loop jako ciągła metodologia, nie engagement projektowy. Kroki 03-05 (Standardize → Build → Govern) ustabilizowały brand system i workflow akceptacji. Kroki 06-08 (Ship → Measure → Iterate) prowadziły zespół przez 3+ lata: IPO materiały, always-on creative, kwartalne brand health reviews."
                    : "r3loop as continuous methodology, not project engagement. Steps 03-05 (Standardize → Build → Govern) stabilized the brand system and approval workflow. Steps 06-08 (Ship → Measure → Iterate) carried the team through 3+ years: IPO materials, always-on creative, quarterly brand health reviews."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200 dark:border-white/10">
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-[#D4FF00] leading-none mb-2">
                      3+
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      {lang === "pl" ? "lata ciągłego retainera" : "years on continuous retainer"}
                    </p>
                  </div>
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-[#D4FF00] leading-none mb-2">
                      200+
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      {lang === "pl" ? "deliverables shippnięte" : "deliverables shipped"}
                    </p>
                  </div>
                  <div>
                    <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-[#D4FF00] leading-none mb-2">
                      IPO
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      {lang === "pl" ? "debiut na GPW wsparty brand systemem" : "WSE debut backed by brand system"}
                    </p>
                  </div>
                </div>
                {/* Factual citation line - duration axis. Sourced from r3loop
                    docs: Kubota = 3+ years on retainer, 200+ deliverables,
                    steps 03-08 sustained across the engagement. */}
                <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 leading-relaxed pt-2 border-t border-neutral-200 dark:border-white/10">
                  {lang === "pl"
                    ? "r3loop utrzymany w Kubota przez 3+ lata - kroki 03-08 prowadzone w sposób ciągły, 200+ deliverables na modelu retainerowym."
                    : "r3loop sustained at Kubota for 3+ years - steps 03-08 run continuously, 200+ deliverables on a retainer model."}
                </p>
                <Link
                  href="/work/kubota"
                  className="group inline-flex items-center gap-2 mt-4 text-[11px] font-display uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 hover:text-[#D4FF00] transition-colors"
                >
                  <span>{lang === "pl" ? "Pełny case study" : "Full case study"}</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── From loop to tools - step→product map (r3loop 9.5) ──────
          Factual strip: which steps have been productized into software.
          Replaces the unpublished journal/10 essay with a dry, structural
          version. Sits right before the Playbook section - same discreet
          editorial register. */}
      <section className="py-14 md:py-16 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-2xl">
              <span className="block text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500 mb-5">
                {lang === "pl" ? "Z pętli do narzędzi" : "From loop to tools"}
              </span>
              <p className="text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed [text-wrap:pretty] mb-4">
                {lang === "pl"
                  ? "Krok, którego output jest wystarczająco ustrukturyzowany, staje się oprogramowaniem - to test, czy metodologia jest systemem, a nie sloganem."
                  : "Any step with a structured enough output becomes software - that's the test of whether the methodology is a system, not a slogan."}
              </p>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-500 leading-relaxed">
                {lang === "pl"
                  ? "01 Diagnose → narzędzie diagnostyczne (scoring 50 kryteriów) · 03 Standardize → AI Brief Assistant (bramka jakości briefu) · 07 Measure → dashboard KPI (cotygodniowe delivery packs) · produkty z pętli: regional.fit (MVP live), Caterelo"
                  : "01 Diagnose → diagnostic instrument (50-criteria scoring) · 03 Standardize → AI Brief Assistant (brief quality gate) · 07 Measure → KPI dashboard (weekly delivery packs) · products born from the loop: regional.fit (MVP live), Caterelo"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Q4 2026 - r3loop Playbook waitlist ──────────────────────
          Productization scaffold. Captures emails for the paid playbook launch.
          Founding price (€1500) vs standard (€2000) creates urgency without
          forcing decisions today. Sits between methodology proof (above) and
          closing CTA (below) - so warm leads who've read the methodology see
          the "want this without consulting?" path before the contact CTA.

          TODO: replace mailto fallback with proper ESP integration (Mailchimp /
          Klaviyo / Loops / Brevo) once one is chosen. For now mailto routes
          signups to hello@r352.com and Plausible tracks the conversion event.

          HIDDEN (2026-06-10): product not ready to show - flip SHOW_PLAYBOOK
          to true when the playbook is ready to launch. */}
      {SHOW_PLAYBOOK && (
      <section className="py-16 md:py-20 border-b border-neutral-200 dark:border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-2xl">
              {/* Quiet editorial note - no glow, no pulse, no display headline */}
              <span className="block text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500 mb-5">
                {lang === "pl" ? "Q4 2026 - r3loop Playbook" : "Q4 2026 - r3loop Playbook"}
              </span>
              <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 leading-relaxed [text-wrap:pretty] mb-3">
                {lang === "pl"
                  ? "Cała metodologia r3loop - sprodukowana jako guided playbook. Dla tych, którzy nie potrzebują nas w pokoju - potrzebują systemu, który możemy oddać."
                  : "The full r3loop methodology - productized as a guided playbook. For teams that don't need us in the room - they need a system we can hand off."}
              </p>
              {/* Inventory - one quiet mono line instead of a grid */}
              <p className="text-[13px] text-neutral-500 dark:text-neutral-500 leading-relaxed mb-8">
                {(lang === "pl" ? [
                  "8 kroków szczegółowo",
                  "output contracts per krok",
                  "decision gates + KPIs",
                  "brief templates",
                  "quality review checklisty",
                  "AI prompt library",
                  "governance frameworks",
                  "8 mini case studies",
                ] : [
                  "8 steps in depth",
                  "output contracts per step",
                  "decision gates + KPIs",
                  "brief templates",
                  "quality review checklists",
                  "AI prompt library",
                  "governance frameworks",
                  "8 case-study minis",
                ]).join(" · ")}
              </p>

              {/* Email capture - minimal underline form */}
              {!waitlistSubmitted ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!waitlistEmail) return;
                    // Track conversion via Plausible custom event
                    try {
                      (window as any).plausible?.("playbook_waitlist_signup", {
                        props: { source: "process_page", lang },
                      });
                    } catch { /* noop */ }
                    // Open mail client as fallback storage until ESP is wired
                    const subject = encodeURIComponent("r3loop Playbook - early access waitlist");
                    const body = encodeURIComponent(
                      `I'd like to join the r3loop Playbook waitlist.\n\nEmail: ${waitlistEmail}\n\n(Sent from r352.com/process)`
                    );
                    window.location.href = `mailto:hello@r352.com?subject=${subject}&body=${body}`;
                    setWaitlistSubmitted(true);
                  }}
                >
                  <div className="flex items-baseline gap-4 max-w-md border-b border-neutral-300 dark:border-white/20 focus-within:border-[#D4FF00] transition-colors pb-2">
                    <input
                      type="email"
                      required
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                      placeholder={lang === "pl" ? "Twój email" : "Your email"}
                      className="flex-1 bg-transparent text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="text-[11px] font-display uppercase tracking-[0.2em] text-neutral-900 dark:text-white hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-300 cursor-pointer whitespace-nowrap"
                    >
                      {lang === "pl" ? "Dołącz do waitlisty" : "Join the waitlist"}
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-500 mt-3">
                    {lang === "pl"
                      ? "Founding price €1500 dla pierwszych 100 osób (standard €2000). Bez spamu - tylko launch announcement."
                      : "Founding price €1500 for the first 100 (standard €2000). No spam - just the launch announcement."}
                  </p>
                </form>
              ) : (
                <p className="text-sm text-neutral-700 dark:text-neutral-300 border-l border-[#D4FF00] pl-4">
                  {lang === "pl"
                    ? "Jesteś na liście. Launch announcement w Q4 z founding price €1500 (zamiast €2000) - sprawdź, czy klient pocztowy wysłał email do hello@r352.com."
                    : "You're on the list. Launch announcement lands in Q4 with the founding price €1500 (instead of €2000) - check that your mail client sent the email to hello@r352.com."}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      )}

      {/* ─── Closing CTA ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-neutral-800 dark:text-[#D4FF00] mb-6">
                {lang === "pl" ? "Niepewny gdzie wąskie gardło?" : "Not sure where the bottleneck is?"}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900 dark:text-white mb-8 leading-[1.05]">
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
