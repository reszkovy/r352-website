import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { CinematicText } from "@/app/components/ui/CinematicText";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLocation } from "wouter";

// ─── Phase data ──────────────────────────────────────────
interface Phase {
  num: string;
  title: { en: string; pl: string };
  goal: { en: string; pl: string };
  cards: {
    label: { en: string; pl: string };
    text: { en: string; pl: string };
  }[];
  metric: { en: string; pl: string };
}

const phases: Phase[] = [
  {
    num: "00",
    title: { en: "Operational Discovery", pl: "Diagnoza Operacyjna" },
    goal: {
      en: "We diagnose where requests, decisions, feedback, and production create friction — before we design anything.",
      pl: "Diagnozujemy, gdzie requesty, decyzje, feedback i produkcja generują tarcie — zanim cokolwiek zaprojektujemy.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "Request sources, their format, time from first email to finished asset, most common reasons for revisions.",
          pl: "Źródła requestów, ich format, czas od pierwszego maila do gotowego assetu, najczęstsze powody poprawek.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "A current-state map with 5–7 bottlenecks and their cost in hours per week.",
          pl: "Mapa stanu obecnego z 5–7 wąskimi gardłami i ich kosztem w godzinach tygodniowo.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "A 1-page operational diagnosis with evidence and a recommended action sequence for the next 60 days.",
          pl: "Jednostronicowa diagnoza operacyjna z dowodami i zalecaną sekwencją działań na 60 dni.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "Leadership sees the real bottlenecks, not their symptoms. Decisions stop being based solely on intuition.",
          pl: "Kierownictwo widzi realne wąskie gardła, nie ich objawy. Decyzje przestają opierać się wyłącznie na intuicji.",
        },
      },
    ],
    metric: {
      en: "Time-to-cause for every recurring operational problem.",
      pl: "Czas do zidentyfikowania przyczyny każdego powtarzalnego problemu operacyjnego.",
    },
  },
  {
    num: "01",
    title: { en: "Demand Mapping", pl: "Mapowanie Popytu" },
    goal: {
      en: "We map creative demand sources — who, what, how much, how often, in what format.",
      pl: "Mapujemy źródła zapotrzebowania na kreację — kto, co, ile, jak często, w jakim formacie.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "Stakeholders, intake channels, request types, cyclicality, seasonality, local vs. central needs.",
          pl: "Stakeholderzy, kanały przyjmowania, typy requestów, cykliczność, sezonowość, potrzeby lokalne vs centralne.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "A request typology: strategic / urgent / local / cyclical / low-value — with clear definitions.",
          pl: "Typologia requestów: strategiczne / pilne / lokalne / cykliczne / niskowartościowe — z jasnymi definicjami.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "A demand map with volumes per stakeholder, a seasonal heatmap, and a list of requests to reject or defer.",
          pl: "Mapa popytu z wolumenami per stakeholder, heatmapa sezonowa i lista requestów do odrzucenia lub odroczenia.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "Every new request can be classified in seconds, not hours. The backlog stops being an infinite list without priorities.",
          pl: "Każdy nowy request można sklasyfikować w sekundy, nie godziny. Backlog przestaje być nieskończoną listą bez priorytetów.",
        },
      },
    ],
    metric: {
      en: "% of requests with clear classification on intake (target 95%+).",
      pl: "% requestów z jasną klasyfikacją na wejściu (cel 95%+).",
    },
  },
  {
    num: "02",
    title: { en: "Briefing System", pl: "System Briefingu" },
    goal: {
      en: "We introduce briefing standards, Definition of Ready, and intake templates for every request type.",
      pl: "Wprowadzamy standardy briefingu, Definition of Ready i szablony intake dla każdego typu requestu.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "The gap between what stakeholders write and what production needs. Most common reasons for follow-up questions.",
          pl: "Luka między tym, co piszą stakeholderzy, a tym, czego potrzebuje produkcja. Najczęstsze powody dopytywania.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "Brief templates (3 variants: standard / local / express), Definition of Ready, intake form, AI brief assistant.",
          pl: "Szablony briefów (3 warianty: standard / local / express), Definition of Ready, formularz intake, AI asystent briefu.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "A template library, AI assistant with custom prompts, team training session, and a 90-day adoption playbook.",
          pl: "Biblioteka szablonów, AI asystent z promptami, sesja szkoleniowa dla zespołu i 90-dniowy playbook adopcji.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "Briefs arrive complete on the first attempt. Most gaps surface before production starts, not during the second iteration.",
          pl: "Briefy przychodzą kompletne za pierwszym razem. Większość braków wychodzi przed startem produkcji, nie w drugiej iteracji.",
        },
      },
    ],
    metric: {
      en: "% of briefs meeting Definition of Ready on first submission (target 80%+).",
      pl: "% briefów spełniających Definition of Ready przy pierwszym złożeniu (cel 80%+).",
    },
  },
  {
    num: "03",
    title: { en: "Prioritization Logic", pl: "Logika Priorytetyzacji" },
    goal: {
      en: "We define which requests go to production, which are deferred, and which are rejected — with clear rationale.",
      pl: "Definiujemy, które requesty idą do produkcji, które odkładamy, a które odrzucamy — z jasnym uzasadnieniem.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: 'Why "everything is ASAP" and what should actually be. Conflicts between strategy and operational pressure.',
          pl: 'Dlaczego „wszystko jest ASAP" i co powinno być naprawdę. Konflikty między strategią a presją operacyjną.',
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "A 4-axis scoring rubric (urgency × strategic value × scope × dependencies) and a weekly triage cadence.",
          pl: "4-osiowa matryca scoringowa (pilność × wartość strategiczna × zakres × zależności) i tygodniowy triage.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "Prioritization rubric, decision rights map, weekly triage protocol, and a decision log for repeatability.",
          pl: "Matryca priorytetyzacji, mapa decyzyjności, tygodniowy protokół triage i log decyzji dla powtarzalności.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: 'Only the right things go to production. Everything else gets a clear "defer" or "no" with rationale.',
          pl: 'Tylko właściwe rzeczy idą do produkcji. Reszta dostaje jasne „odrocz" lub „nie" z uzasadnieniem.',
        },
      },
    ],
    metric: {
      en: '% of requests with a "yes / defer / no" decision within 24h of intake.',
      pl: '% requestów z decyzją „tak / odrocz / nie" w ciągu 24h od intake.',
    },
  },
  {
    num: "04",
    title: { en: "Quality System", pl: "System Jakości" },
    goal: {
      en: "We turn subjective taste into benchmarks, QA rubrics, and production standards that can be delegated.",
      pl: "Zamieniamy subiektywny gust w benchmarki, QA rubrics i standardy produkcji, które można delegować.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "Where quality depends on one person instead of a system. Recurring errors that seniors no longer consciously see.",
          pl: "Gdzie jakość zależy od jednej osoby zamiast systemu. Powtarzające się błędy, których seniorzy już nie widzą.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "A Creative Quality Playbook — senior judgment turned into rules. QA checklists per asset type, review workflow with RACI.",
          pl: "Creative Quality Playbook — osąd seniora zamieniony w reguły. QA checklisty per typ assetu, workflow review z RACI.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "Creative Quality Playbook (50+ entries), QA checklists, review workflow, delegation training for mid+senior.",
          pl: "Creative Quality Playbook (50+ pozycji), QA checklisty, workflow review, szkolenie delegowania dla mid+senior.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "The team shares quality criteria. Seniors no longer need to be the only filter on every decision.",
          pl: "Zespół dzieli kryteria jakości. Seniorzy nie muszą być jedynym filtrem przy każdej decyzji.",
        },
      },
    ],
    metric: {
      en: "% of work passing QA on first review (target 70%+).",
      pl: "% prac przechodzących QA przy pierwszym review (cel 70%+).",
    },
  },
  {
    num: "05",
    title: { en: "Production Workflow", pl: "Workflow Produkcji" },
    goal: {
      en: "We define end-to-end workflows per asset type — who, when, on what input, with what handoff.",
      pl: "Definiujemy end-to-end workflow per typ assetu — kto, kiedy, na jakim inpucie, z jakim handoffem.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "Where handoffs lose context, time, and quality. Invisible micro-revisions that stretch cycles by weeks.",
          pl: "Gdzie handoffy tracą kontekst, czas i jakość. Niewidoczne mikro-poprawki, które wydłużają cykle o tygodnie.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "Workflow diagrams per asset type, RACI, handoff specs, integration with the team's existing tools.",
          pl: "Diagramy workflow per typ assetu, RACI, specyfikacja handoffów, integracja z narzędziami zespołu.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "Service blueprint, RACI per asset type, handoff specs, integration map with Asana / Notion / Figma / Slack.",
          pl: "Service blueprint, RACI per typ assetu, spec handoffów, mapa integracji z Asana / Notion / Figma / Slack.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "Every project follows a known path. Ad-hoc stops being the default mode. A new team member understands the process in 1 day, not 2 months.",
          pl: "Każdy projekt idzie znaną ścieżką. Ad-hoc przestaje być domyślnym trybem. Nowy członek zespołu rozumie proces w 1 dzień, nie 2 miesiące.",
        },
      },
    ],
    metric: {
      en: "Cycle time from brief in DoR to delivered, approved asset.",
      pl: "Cycle time od briefu w DoR do dostarczonego, zatwierdzonego assetu.",
    },
  },
  {
    num: "06",
    title: { en: "Approval & Governance", pl: "Akceptacja & Governance" },
    goal: {
      en: "We define ownership, review paths, change request rules, and decision logs — so decisions are traceable, not political.",
      pl: "Definiujemy ownership, ścieżki review, zasady change requestów i logi decyzji — żeby decyzje były śledzalne, nie polityczne.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "Decision bottlenecks, unclear ownership, feedback loops that run the same content through three times.",
          pl: "Wąskie gardła decyzyjne, niejasny ownership, pętle feedbacku przepuszczające ten sam content trzy razy.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "Governance model, decision rights, escalation paths, change request process, decision log structure.",
          pl: "Model governance, prawa decyzyjne, ścieżki eskalacji, proces change requestów, struktura logu decyzji.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "Governance playbook, RACI for approvals, decision log template, escalation protocol, conflict resolution path.",
          pl: "Governance playbook, RACI dla akceptacji, szablon logu decyzji, protokół eskalacji, ścieżka rozwiązywania konfliktów.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "Decisions are owned, traceable, and don't bottleneck on one person. The system reduces dependency on individuals.",
          pl: "Decyzje mają ownera, są śledzalne i nie blokują się na jednej osobie. System redukuje zależność od jednostek.",
        },
      },
    ],
    metric: {
      en: "Average decision time + decision reversal rate (both trending down).",
      pl: "Średni czas decyzji + wskaźnik cofania decyzji (oba w trendzie spadkowym).",
    },
  },
  {
    num: "07",
    title: { en: "Rollout & Optimization", pl: "Wdrożenie & Optymalizacja" },
    goal: {
      en: "We measure cycle time, revisions, brief quality, bottlenecks, and iterate the process — so the system stays current in a changing organization.",
      pl: "Mierzymy cycle time, poprawki, jakość briefów, wąskie gardła i iterujemy proces — żeby system nadążał za zmieniającą się organizacją.",
    },
    cards: [
      {
        label: { en: "What we diagnose", pl: "Co diagnozujemy" },
        text: {
          en: "Where the system starts leaking after rollout. Where the team reverts to old habits despite new rules.",
          pl: "Gdzie system zaczyna przeciekać po wdrożeniu. Gdzie zespół wraca do starych nawyków mimo nowych zasad.",
        },
      },
      {
        label: { en: "What we design", pl: "Co projektujemy" },
        text: {
          en: "Measurement system, iteration cadence, monthly review rituals, optimization playbook, AI ops layer.",
          pl: "System pomiarowy, kadencja iteracji, miesięczne rytuały review, optimization playbook, warstwa AI ops.",
        },
      },
      {
        label: { en: "What you get", pl: "Co dostajesz" },
        text: {
          en: "KPI dashboard, monthly review structure, optimization playbook, quarterly governance review, and AI assistance setup.",
          pl: "Dashboard KPI, struktura monthly review, optimization playbook, kwartalny governance review i konfiguracja AI.",
        },
      },
      {
        label: { en: "What changes", pl: "Co się zmienia" },
        text: {
          en: "The process stops being a one-time implementation — it has a rhythm of measurement, review, and iteration. Bottlenecks surface and get addressed in cadence, not after a breakdown.",
          pl: "Proces przestaje być jednorazową implementacją — ma rytm pomiaru, review i iteracji. Wąskie gardła wypływają i są adresowane w kadencji, nie po awarii.",
        },
      },
    ],
    metric: {
      en: "Trend of all metrics from phases 02–06 quarter-over-quarter.",
      pl: "Trend wszystkich metryk z faz 02–06 kwartał do kwartału.",
    },
  },
];

const TOTAL = phases.length;

export function Process() {
  const { language } = useLanguage();
  const [, setLocation] = useLocation();
  const [activePhase, setActivePhase] = useState(0);

  const lang = language as "en" | "pl";

  const goToPhase = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, idx));
    setActivePhase(clamped);
  }, []);

  const phase = phases[activePhase];
  const progressPct = ((activePhase + 1) / TOTAL) * 100;

  return (
    <PageTransition>
      {/* ─── Hero ─── */}
      <section className="min-h-[70vh] flex items-end pb-16 md:pb-24 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12 pt-40">
          <Reveal>
            <span className="font-mono text-xs text-[#D4FF00] tracking-[0.3em] uppercase flex items-center gap-4 mb-7">
              <span className="w-10 h-px bg-[#D4FF00]" />
              Process
            </span>
          </Reveal>
          <CinematicText
            text={
              lang === "pl"
                ? "Creative Operating System w 8 krokach"
                : "Creative Operating System in 8 steps"
            }
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tight leading-[1.0] text-white max-w-[14ch]"
          />
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-neutral-500 max-w-[56ch] leading-relaxed mt-8">
              {lang === "pl"
                ? "Jak budujemy operacyjny system dostarczania kreacji dla marek multi-lokalizacyjnych — krok po kroku, od diagnozy operacyjnej po pomiar i iterację."
                : "How we build an operational creative delivery system for multi-location brands — step by step, from operational diagnosis to measurement and iteration."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── Intro ─── */}
      <section className="py-16 md:py-24 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-[68ch]">
              <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-4">
                {lang === "pl" ? (
                  <>
                    Każdy projekt creative operations przechodzi przez te same{" "}
                    <strong className="text-white font-semibold">8 faz</strong>.
                    Modyfikujemy głębokość, nie strukturę. Każda faza ma jasny
                    kontrakt:{" "}
                    <strong className="text-white font-semibold">
                      co diagnozujemy, co projektujemy, co dostajesz, co się
                      zmienia operacyjnie i który wskaźnik poprawiamy
                    </strong>
                    .
                  </>
                ) : (
                  <>
                    Every creative operations project goes through the same{" "}
                    <strong className="text-white font-semibold">
                      8 phases
                    </strong>
                    . We modify depth, not structure. Each phase has a clear
                    contract:{" "}
                    <strong className="text-white font-semibold">
                      what we diagnose, what we design, what you get, what
                      changes operationally, and which metric we improve
                    </strong>
                    .
                  </>
                )}
              </p>
              <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                {lang === "pl"
                  ? "Klikaj przez fazy od lewej do prawej, żeby zobaczyć jak system rośnie krok po kroku — od diagnozy stanu obecnego po stały rytm pomiaru i iteracji."
                  : "Click through the phases from left to right to see how the system grows step by step — from diagnosing the current state to a steady rhythm of measurement and iteration."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Phase Tabs System ─── */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="border border-white/[0.15] rounded-lg overflow-hidden bg-[#1A1A1A]">
              {/* Progress bar */}
              <div className="h-[2px] bg-white/[0.08] relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-[#D4FF00]"
                  animate={{ width: `${progressPct}%` }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>

              {/* Tab buttons */}
              <div
                className="grid grid-cols-8 border-b border-white/[0.08] overflow-x-auto"
                role="tablist"
                aria-label="Creative Operating System phases"
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    goToPhase(activePhase + 1);
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    goToPhase(activePhase - 1);
                  } else if (e.key === "Home") {
                    e.preventDefault();
                    goToPhase(0);
                  } else if (e.key === "End") {
                    e.preventDefault();
                    goToPhase(TOTAL - 1);
                  }
                }}
                style={{ gridTemplateColumns: `repeat(8, minmax(130px, 1fr))` }}
              >
                {phases.map((p, i) => (
                  <button
                    key={p.num}
                    role="tab"
                    aria-selected={i === activePhase}
                    onClick={() => goToPhase(i)}
                    className={`
                      border-r border-white/[0.08] last:border-r-0 px-4 py-5 text-left
                      flex flex-col gap-2.5 min-h-[100px] transition-all duration-250 cursor-pointer
                      ${
                        i === activePhase
                          ? "bg-[#D4FF00] text-[#0A0A0A]"
                          : "bg-transparent text-neutral-500 hover:bg-[#222] hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`font-mono text-[11px] tracking-wide ${
                        i === activePhase
                          ? "text-[#0A0A0A]/50"
                          : "text-neutral-600"
                      }`}
                    >
                      {p.num}
                    </span>
                    <span
                      className={`text-xs font-medium leading-snug mt-auto tracking-wide ${
                        i === activePhase ? "font-semibold text-[#0A0A0A]" : ""
                      }`}
                    >
                      {p.title[lang]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Panel content */}
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="p-7 md:p-10 lg:px-14"
                    role="tabpanel"
                  >
                    {/* Header: big number + title + goal */}
                    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-8 mb-8">
                      <div className="text-6xl md:text-8xl font-extralight tracking-tighter leading-none text-white/20 min-w-[96px] font-[Inter]">
                        {phase.num}
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-3">
                          {phase.title[lang]}
                        </h3>
                        <p className="text-[15px] text-neutral-500 leading-relaxed max-w-[60ch]">
                          {phase.goal[lang]}
                        </p>
                      </div>
                    </div>

                    {/* 2×2 cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                      {phase.cards.map((card, ci) => (
                        <div
                          key={ci}
                          className="bg-[#1E1E1E] border border-white/[0.08] rounded-md px-6 py-5 transition-colors hover:border-white/[0.15]"
                        >
                          <div className="font-mono text-[10px] text-[#D4FF00] uppercase tracking-widest mb-2.5">
                            {card.label[lang]}
                          </div>
                          <p className="text-sm text-neutral-300 leading-relaxed">
                            {card.text[lang]}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Metric */}
                    <div className="bg-[#D4FF00]/[0.12] border border-[#D4FF00]/[0.15] rounded-md px-6 py-4 flex items-center flex-wrap gap-3.5">
                      <span className="font-mono text-[10px] text-[#D4FF00] uppercase tracking-wide px-2.5 py-1 border border-[#D4FF00]/25 rounded-sm shrink-0">
                        Metric
                      </span>
                      <span className="text-sm text-neutral-300 leading-snug">
                        {phase.metric[lang]}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center px-7 md:px-10 lg:px-14 py-6 border-t border-white/[0.08]">
                  <button
                    onClick={() => goToPhase(activePhase - 1)}
                    disabled={activePhase === 0}
                    className="border border-white/[0.15] rounded px-4 py-2.5 text-sm text-neutral-300 flex items-center gap-2 transition-colors hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.06] disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-white/[0.15] disabled:hover:text-neutral-300 disabled:hover:bg-transparent cursor-pointer"
                  >
                    ←{" "}
                    <span>
                      {lang === "pl" ? "Poprzednia faza" : "Previous phase"}
                    </span>
                  </button>
                  <span className="font-mono text-[11px] text-neutral-600 uppercase tracking-wide">
                    {lang === "pl" ? "Faza" : "Phase"}{" "}
                    {String(activePhase + 1).padStart(2, "0")}{" "}
                    {lang === "pl" ? "z" : "of"}{" "}
                    {String(TOTAL).padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => goToPhase(activePhase + 1)}
                    disabled={activePhase === TOTAL - 1}
                    className="border border-white/[0.15] rounded px-4 py-2.5 text-sm text-neutral-300 flex items-center gap-2 transition-colors hover:border-[#D4FF00] hover:text-[#D4FF00] hover:bg-[#D4FF00]/[0.06] disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:border-white/[0.15] disabled:hover:text-neutral-300 disabled:hover:bg-transparent cursor-pointer"
                  >
                    <span>
                      {lang === "pl" ? "Następna faza" : "Next phase"}
                    </span>{" "}
                    →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Closing ─── */}
      <section className="py-16 md:py-24 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="max-w-[68ch] mb-10">
              <p className="text-base md:text-lg text-neutral-300 leading-relaxed mb-4">
                {lang === "pl" ? (
                  <>
                    Po przejściu wszystkich 8 faz, zespół klienta otrzymuje{" "}
                    <strong className="text-white font-semibold">
                      artefakty operacyjne
                    </strong>
                    , których faktycznie używa w codziennej pracy: szablony
                    briefów, Definition of Ready, matryca priorytetyzacji,
                    Creative Quality Playbook, QA checklisty, RACI, logi
                    decyzji, workflow produkcji i dashboard pomiarowy.
                  </>
                ) : (
                  <>
                    After going through all 8 phases, the client's team receives{" "}
                    <strong className="text-white font-semibold">
                      operational artifacts
                    </strong>{" "}
                    they actually use in daily work: brief templates, Definition
                    of Ready, prioritization rubric, Creative Quality Playbook,
                    QA checklists, RACI, decision logs, production workflows, and
                    a measurement dashboard.
                  </>
                )}
              </p>
              <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                {lang === "pl"
                  ? "To, co zostaje, to nie rekomendacja — to system."
                  : "What stays isn't a recommendation — it's a system."}
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
                  {lang === "pl"
                    ? "Umów 30-min diagnozę"
                    : "Book a 30-min diagnosis"}
                </span>
                <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </MagneticButton>
              <MagneticButton
                onClick={() => setLocation("/services")}
                className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black"
                glowColor="rgba(255, 255, 255, 0.15)"
              >
                <span className="text-xs font-display uppercase tracking-widest">
                  {lang === "pl" ? "Poznaj usługi" : "Explore services"}
                </span>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
