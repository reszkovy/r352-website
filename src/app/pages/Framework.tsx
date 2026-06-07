import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

/**
 * /framework — Product Building Framework
 *
 * The broader IP that r3loop is a slice of. Universal 8-phase product system
 * for landing pages, multi-location ops, SaaS, brand launches, campaigns.
 *
 * Strategic role:
 *  - Unifies Reszek's full portfolio (multi-location + single brand + SaaS
 *    + real estate + product) under one operator framework
 *  - Plants the category problem ("system over hours") with the operating
 *    model graph: presence drops 90% → 15% across phases
 *  - Foundation for end-of-year productization (paid framework / playbook /
 *    licensable IP)
 *
 * Each phase has: input, output contract (checklist), decision gate question.
 * Plus 6 cross-cutting layers + operating model + CTA.
 */

interface Phase {
  num: string;
  title: { en: string; pl: string };
  goal: { en: string; pl: string };
  outputs: { en: string[]; pl: string[] };
  gate: { en: string; pl: string };
  presence: string; // % of Reszek's involvement
}

const PHASES: Phase[] = [
  {
    num: "00",
    title: { en: "Discovery & Strategy", pl: "Discovery & Strategia" },
    goal: {
      en: "Turn a foggy idea or client problem into a concrete, measurable product brief.",
      pl: "Zamienić mglisty pomysł lub problem klienta w konkretny, mierzalny brief produktowy.",
    },
    outputs: {
      en: [
        "Positioning approved by decision-maker",
        "JTBD validated with min. 3 users",
        "NSM + input metrics defined",
        'MVP scope + "never list" clear',
        "Budget and timeline accepted",
      ],
      pl: [
        "Pozycjonowanie zatwierdzone przez decydenta",
        "JTBD zwalidowane z min. 3 użytkownikami",
        "NSM + input metrics ustalone",
        'MVP scope + "never list" jasna',
        "Budżet i timeline zaakceptowane",
      ],
    },
    gate: {
      en: "Can I define product success in one sentence with a concrete number? If not — stay in phase 0.",
      pl: "Czy umiem zdefiniować sukces produktu w jednym zdaniu z konkretną liczbą? Jeśli nie — zostań w fazie 0.",
    },
    presence: "90%",
  },
  {
    num: "01",
    title: { en: "Brand Platform", pl: "Brand Platform" },
    goal: {
      en: "Build the brand foundation that supports every subsequent decision — copy, UX, UI, communication.",
      pl: "Zbudować fundament marki, na którym staną wszystkie kolejne decyzje — copy, UX, UI, komunikacja.",
    },
    outputs: {
      en: [
        "Brand platform approved",
        'Tone of voice with min. 10 "yes/no" examples',
        "Design tokens in dev-handoff format",
        "Logo and colors final, named, organized",
        "Brand book available to client team",
      ],
      pl: [
        "Brand platform zatwierdzona",
        'Tone of voice z min. 10 przykładami "tak/nie"',
        "Design tokens w formacie do dev handoffu",
        "Logo i kolory finalne, nazwane, zorganizowane",
        "Brand book dostępny dla zespołu klienta",
      ],
    },
    gate: {
      en: "Can a junior write a post or design a banner without your brief, using only the brand book? If not — close it.",
      pl: "Czy junior może napisać post lub zaprojektować baner bez Twojego briefu, używając tylko brand booka? Jeśli nie — domykaj.",
    },
    presence: "75%",
  },
  {
    num: "02",
    title: { en: "Narrative & Copy", pl: "Narracja & Copywriting" },
    goal: {
      en: "Turn the brand platform into living words — narrative, value prop copy, microcopy, content architecture.",
      pl: "Zamienić brand platform w żywe słowa — narrację, value prop copy, microcopy, content architecture.",
    },
    outputs: {
      en: [
        "Narrative approved by decision-maker",
        "Value prop copy tested with 5+ people",
        "Microcopy library complete for MVP",
        "Content style guide ready for delegation",
      ],
      pl: [
        "Narracja zatwierdzona przez decydenta",
        "Value prop copy przetestowane z 5+ osobami",
        "Microcopy library kompletna dla MVP",
        "Content style guide gotowy do delegacji",
      ],
    },
    gate: {
      en: "After 30 seconds of reading the copy, does a target-audience person know: what it is, who for, why choose it? 5-person test, threshold 4/5.",
      pl: "Czy osoba z target audience po przeczytaniu copy w 30 sekund wie: co to jest, dla kogo, dlaczego ma to wybrać? Test 5 osób — próg 4/5.",
    },
    presence: "60%",
  },
  {
    num: "03",
    title: { en: "UX — Research, IA, Flows", pl: "UX · Research, IA, Flows" },
    goal: {
      en: "Design the product structure and flows before any UI visualization begins.",
      pl: "Zaprojektować strukturę i przepływy produktu zanim zacznie się wizualizacja UI.",
    },
    outputs: {
      en: [
        "Critical user flows designed and tested",
        "IA validated (card sort or tree test)",
        "Mid-fi prototype passed usability test (≥80% success)",
        "Microcopy integrated with wireframes",
      ],
      pl: [
        "Critical user flows zaprojektowane i przetestowane",
        "IA zwalidowana (card sort lub tree test)",
        "Mid-fi prototyp przeszedł usability test (≥80% success)",
        "Microcopy zintegrowane z wireframami",
      ],
    },
    gate: {
      en: "Did 5 test users complete critical tasks without help? If less than 4/5 — back to flows.",
      pl: "Czy 5 testowych użytkowników wykonało critical task bez pomocy? Jeśli mniej niż 4/5 — wracasz do flowów.",
    },
    presence: "50%",
  },
  {
    num: "04",
    title: { en: "UI & Design System", pl: "UI & Design System" },
    goal: {
      en: "Turn wireframes and flows into production-ready, accessible, consistent screens on a systemic foundation.",
      pl: "Zamienić wireframes i flows w produkcyjne, dostępne, spójne ekrany z systemowym fundamentem.",
    },
    outputs: {
      en: [
        "All MVP screens in hi-fi with all states",
        "Design system documented, usable by devs",
        "A11y audit pass (or documented exceptions)",
        "Handoff specs complete",
      ],
      pl: [
        "Wszystkie ekrany MVP w hi-fi z wszystkimi stanami",
        "Design system udokumentowany, używalny przez devów",
        "A11y audit pass (lub udokumentowane wyjątki)",
        "Handoff specs kompletne",
      ],
    },
    gate: {
      en: "Can a developer implement screen X without asking a single question? Test 3 random screens. If they ask — close specs.",
      pl: "Czy developer może zaimplementować ekran X bez jednego pytania? Test na 3 losowych ekranach. Jeśli pyta — domykaj specs.",
    },
    presence: "35%",
  },
  {
    num: "05",
    title: { en: "Build & Deploy", pl: "Build & Deploy" },
    goal: {
      en: "Turn design into a working, monitored product.",
      pl: "Zamienić design w działający, monitorowany produkt.",
    },
    outputs: {
      en: [
        "Product in production",
        "QA passed (defined acceptance criteria)",
        "Monitoring and alerts enabled",
        "Backup and rollback plan exists",
        "Technical documentation ready",
      ],
      pl: [
        "Produkt na produkcji",
        "QA passed (defined acceptance criteria)",
        "Monitoring i alerty włączone",
        "Backup i rollback plan istnieje",
        "Dokumentacja techniczna gotowa",
      ],
    },
    gate: {
      en: "Can I show the product to a client without shame and recover it from an incident within minutes?",
      pl: "Czy mogę pokazać produkt klientowi bez wstydu i odzyskać go po awarii w minutach?",
    },
    presence: "20%",
  },
  {
    num: "06",
    title: { en: "Launch & Adoption", pl: "Launch & Adopcja" },
    goal: {
      en: "Get the product to market and ensure first users adopt it effectively.",
      pl: "Wprowadzić produkt na rynek i zapewnić, że pierwsi użytkownicy go skutecznie używają.",
    },
    outputs: {
      en: [
        "First users onboarded (defined number)",
        "Activation rate measured, baseline set",
        "Feedback loop running — min. 1 iteration cycle",
        "Support not on fire — ticket time under threshold",
      ],
      pl: [
        "Pierwsi użytkownicy onboarded (zdefiniowana liczba)",
        "Activation rate mierzona, baseline ustalony",
        "Feedback loop działa — min. 1 cykl iteracji",
        "Support nie pali — ticket time pod progiem",
      ],
    },
    gate: {
      en: 'Did 5 first users hit their "aha moment" without your personal help? If not — close the onboarding.',
      pl: 'Czy 5 pierwszych użytkowników zrobiło "aha moment" bez Twojej osobistej pomocy? Jeśli nie — domykasz onboarding.',
    },
    presence: "15%",
  },
  {
    num: "07",
    title: { en: "Operations & Scale", pl: "Operacje & Skalowanie" },
    goal: {
      en: "Turn a one-time launch into a living, iterating system that grows without your daily involvement.",
      pl: "Zamienić jednorazowy launch w żywy, iterujący system, który rośnie bez Twojego dziennego udziału.",
    },
    outputs: {
      en: [
        "Metrics flowing and regularly reviewed",
        "Roadmap is live, decisions logged",
        "Your operational time ≤15% monthly after 90 days",
        "Client/team maintains product without you for 30 days",
      ],
      pl: [
        "Metryki płyną i są regularnie reviewowane",
        "Roadmap żyje, decyzje są logowane",
        "Twój czas operacyjny ≤15% miesięcznie po 90 dniach",
        "Klient/team utrzymuje produkt bez Ciebie przez 30 dni",
      ],
    },
    gate: {
      en: "Can I take a 2-week vacation without product issues and without excuses? If not — back to operationalization.",
      pl: "Czy mogę wziąć 2-tygodniowy urlop bez awarii produktu i bez wymówek? Jeśli nie — wracasz do operacjonalizacji.",
    },
    presence: "15%",
  },
];

interface Layer {
  num: string;
  name: { en: string; pl: string };
  items: { en: string[]; pl: string[] };
}

const LAYERS: Layer[] = [
  {
    num: "L1",
    name: { en: "Decisions & Governance", pl: "Decyzje & Governance" },
    items: {
      en: [
        "Decision log — every strategic decision",
        "RACI per phase",
        "Stakeholder communication cadence",
        "Change request process",
        "Acceptance criteria per phase",
      ],
      pl: [
        "Decision log — każda decyzja strategiczna",
        "RACI per faza",
        "Stakeholder communication cadence",
        "Change request process",
        "Acceptance criteria per faza",
      ],
    },
  },
  {
    num: "L2",
    name: { en: "Quality Bible", pl: "Quality Bible" },
    items: {
      en: [
        "Your taste codified as rules",
        "Review checkpoints",
        "Definition of Done per artifact",
      ],
      pl: [
        "Quality Bible — Twój smak w zasadach",
        "Review checkpoints",
        "Definition of Done per artefakt",
      ],
    },
  },
  {
    num: "L3",
    name: { en: "AI Operating Layer", pl: "AI Operating Layer" },
    items: {
      en: [
        "Prompt library per phase",
        "AI tools stack",
        "Human-in-the-loop checkpoints",
        "Governance: where yes, where no",
      ],
      pl: [
        "Prompt library per faza",
        "AI tools stack",
        "Human-in-the-loop checkpoints",
        "Governance: gdzie tak, gdzie nie",
      ],
    },
  },
  {
    num: "L4",
    name: { en: "Documentation", pl: "Dokumentacja" },
    items: {
      en: [
        "Living docs (Notion / Figma)",
        "Auto-generated with AI",
        "Versioning + change log",
      ],
      pl: [
        "Living docs (Notion / Figma)",
        "Auto-generated z AI",
        "Versioning + change log",
      ],
    },
  },
  {
    num: "L5",
    name: { en: "Metrics & Telemetry", pl: "Metryki & Telemetria" },
    items: {
      en: [
        "Input metrics per phase",
        "NSM tracking",
        "Decision velocity dashboard",
        "Health score per artifact",
      ],
      pl: [
        "Input metrics per faza",
        "NSM tracking",
        "Decision velocity dashboard",
        "Health score per artefakt",
      ],
    },
  },
  {
    num: "L6",
    name: { en: "Ops Cadence", pl: "Rytm Operacyjny" },
    items: {
      en: [
        "Weekly delivery rhythm",
        "Monthly outcome review",
        "Quarterly system evolution",
        "Yearly framework retrospective",
      ],
      pl: [
        "Tygodniowy rytm dostaw",
        "Miesięczny review wyników",
        "Kwartalna ewolucja systemu",
        "Roczna retrospektywa frameworku",
      ],
    },
  },
];

export function Framework() {
  const { language } = useLanguage();
  const isPl = language === "pl";

  // HowTo schema — JSON-LD describing the 8-phase product building system
  // as a structured methodology. Like /process schema but broader scope.
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Product Building Framework — r352's 8-phase system for building any product",
    "description":
      "Reszek's master operating framework: 8 phases from Discovery & Strategy to Operations & Scale. Works for landing pages, multi-location ops, SaaS, brand launches, and campaigns. Each phase has input/output contracts and a decision gate.",
    "url": "https://www.r352.com/framework",
    "totalTime": "P26W",
    "step": PHASES.map((p, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": p.title.en,
      "text": p.goal.en,
      "url": `https://www.r352.com/framework#phase-${p.num}`,
    })),
  };

  return (
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Helmet>

      {/* ─── HERO ─── */}
      <section className="pt-32 md:pt-40 mb-20 md:mb-28 max-w-4xl">
        <Reveal>
          <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-6">
            {isPl ? "Product Building Framework · r352" : "Product Building Framework · r352"}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black dark:text-white leading-[0.9] mb-10">
            {isPl ? (
              <>End-to-end system<br />od strategii do żywego produktu.</>
            ) : (
              <>End-to-end system<br />from strategy to a living product.</>
            )}
          </h1>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed [text-wrap:pretty] mb-8">
            {isPl
              ? "Każdy produkt — landing page, narzędzie wewnętrzne dla 60 lokalizacji, kampania multi-touchpoint, SaaS — przechodzi przez te same 8 faz. Nie pomijasz, modyfikujesz głębokość."
              : "Every product — a landing page, an internal tool for 60 locations, a multi-touchpoint campaign, a SaaS — runs through the same 8 phases. You don't skip them, you modify depth."}
          </p>
          <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
            {isPl
              ? "Każda faza ma kontrakt wejścia i wyjścia. Bez zamknięcia kontraktu nie idziesz dalej. To eliminuje 80% rewizji wynikających z miękkich fundamentów."
              : "Each phase has an input/output contract. You don't move forward without closing the contract. This eliminates 80% of revisions stemming from soft foundations."}
          </p>
        </Reveal>
      </section>

      {/* ─── 8 PHASES ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
              {isPl ? "8 faz, jeden silnik" : "8 phases, one engine"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] max-w-3xl">
              {isPl ? "Sekwencja jest stała. Każda faza buduje fundament pod następną." : "The sequence is constant. Each phase builds the foundation for the next."}
            </h2>
          </div>
        </Reveal>

        {/* Phases — vertical list */}
        <div className="space-y-16 md:space-y-24">
          {PHASES.map((phase, i) => (
            <Reveal key={phase.num} delay={i * 0.04}>
              <article
                id={`phase-${phase.num}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 border-t border-neutral-200 dark:border-white/10 pt-12"
              >
                {/* LEFT — phase number + title */}
                <div className="md:col-span-4">
                  <div className="font-display text-7xl md:text-8xl font-bold tracking-tighter text-[#D4FF00] leading-none mb-4">
                    {phase.num}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-black dark:text-white mb-4 leading-tight">
                    {phase.title[language]}
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                    {phase.goal[language]}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-display uppercase tracking-[0.2em] text-neutral-500">
                    <span>{isPl ? "Twoja obecność" : "Your presence"}:</span>
                    <span className="text-[#D4FF00] font-bold">{phase.presence}</span>
                  </div>
                </div>

                {/* RIGHT — output contract + gate */}
                <div className="md:col-span-8 space-y-6">
                  <div>
                    <div className="text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00] mb-3">
                      {isPl ? "Output kontrakt" : "Output contract"}
                    </div>
                    <ul className="space-y-2.5">
                      {phase.outputs[language].map((out, k) => (
                        <li key={k} className="text-[15px] md:text-base text-neutral-700 dark:text-neutral-300 flex items-start gap-3 leading-relaxed">
                          <span className="w-3 h-3 border border-neutral-400 dark:border-neutral-600 mt-[7px] shrink-0" />
                          <span>{out}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-l-2 border-[#D4FF00] pl-5 py-2 bg-[#D4FF00]/[0.04]">
                    <div className="text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00] mb-2">
                      {isPl ? "Decision gate" : "Decision gate"}
                    </div>
                    <p className="text-[15px] md:text-base text-black dark:text-white font-medium leading-relaxed [text-wrap:pretty]">
                      {phase.gate[language]}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 6 CROSS-CUTTING LAYERS ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
              {isPl ? "Warstwy poprzeczne" : "Cross-cutting layers"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-6">
              {isPl ? "6 systemów, które żyją przez wszystkie fazy." : "6 systems that live across all phases."}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {isPl
                ? "To system operacyjny pod fazami — bez nich framework się rozjeżdża."
                : "This is the operating system beneath the phases — without them, the framework drifts."}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.num} delay={i * 0.05}>
              <div className="border border-neutral-200 dark:border-white/10 p-6 md:p-8 h-full">
                <div className="font-display text-xs text-[#D4FF00] tracking-[0.2em] uppercase mb-3">
                  {layer.num}
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tighter text-black dark:text-white mb-4 leading-tight">
                  {layer.name[language]}
                </h3>
                <ul className="space-y-2">
                  {layer.items[language].map((item, k) => (
                    <li key={k} className="text-[14px] text-neutral-600 dark:text-neutral-400 flex items-start gap-2 leading-relaxed">
                      <span className="text-[#D4FF00] mt-[2px] shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── OPERATING MODEL TABLE ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
              {isPl ? "Operating Model" : "Operating Model"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-6">
              {isPl ? "Moja obecność maleje z każdą fazą." : "My presence decreases with each phase."}
            </h2>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {isPl
                ? "Średnia po stabilizacji: 35%. Docelowy podział 80/20: strategia vs operacje. Klient kupuje system, który po wdrożeniu działa coraz mniej z moją obecnością — to dowód że to system, nie godziny."
                : "Average after stabilization: 35%. Target 80/20 split: strategy vs operations. The client buys a system that runs increasingly without my presence — proof it's a system, not hours."}
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="border border-neutral-200 dark:border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02]">
                  <th className="text-left py-3 px-4 md:px-6 text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500">
                    {isPl ? "Faza" : "Phase"}
                  </th>
                  <th className="text-left py-3 px-4 md:px-6 text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500">
                    {isPl ? "Twoja obecność" : "My presence"}
                  </th>
                  <th className="text-left py-3 px-4 md:px-6 text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 hidden md:table-cell">
                    {isPl ? "Rola" : "Role"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {PHASES.map((p, i) => {
                  const role = i <= 1
                    ? (isPl ? "Architekt i decydent" : "Architect & decision-maker")
                    : i <= 3
                    ? (isPl ? "Kierunkowy i kontroler jakości" : "Director & quality controller")
                    : (isPl ? "Strategiczny nadzorca" : "Strategic overseer");
                  return (
                    <tr key={p.num} className="border-b border-neutral-200 dark:border-white/10 last:border-b-0">
                      <td className="py-4 px-4 md:px-6 text-sm">
                        <span className="font-display text-[#D4FF00] mr-3">{p.num}</span>
                        <span className="text-black dark:text-white font-medium">{p.title[language]}</span>
                      </td>
                      <td className="py-4 px-4 md:px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 bg-neutral-200 dark:bg-white/10 relative">
                            <div
                              className="absolute left-0 top-0 h-full bg-[#D4FF00]"
                              style={{ width: p.presence }}
                            />
                          </div>
                          <span className="font-display text-sm text-black dark:text-white">{p.presence}</span>
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
      </section>

      {/* ─── OPERATING PRINCIPLE ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="max-w-3xl">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
              {isPl ? "Operating Principle" : "Operating Principle"}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-8">
              {isPl ? "Cały framework w jednej zasadzie." : "The whole framework in one principle."}
            </h2>
            <p className="text-xl md:text-3xl text-neutral-700 dark:text-neutral-200 font-medium leading-relaxed mb-10 [text-wrap:balance]">
              {isPl
                ? '"Nie idziesz dalej, dopóki nie zamknąłeś kontraktu poprzedniej fazy. Twój czas spada z każdą fazą. System rośnie bez Ciebie."'
                : '"You don\'t move forward until you\'ve closed the previous phase\'s contract. Your time decreases with each phase. The system grows without you."'}
            </p>
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {isPl
                ? 'Trzy testy. Jeśli każdy zwróci "tak" po fazie — framework działa. Jeśli któryś zwróci "nie" — zostań w fazie.'
                : 'Three tests. If each returns "yes" after a phase — the framework works. If any returns "no" — stay in the phase.'}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-black dark:text-white leading-tight mb-4">
                {isPl ? "Chcesz przepuścić swój produkt przez ten framework?" : "Want to run your product through this framework?"}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                {isPl
                  ? "Zacznij od 5-dniowego Diagnostic — wskażemy, w której fazie jest Twój produkt i co domknąć żeby przejść dalej."
                  : "Start with the 5-day Diagnostic — we'll identify which phase your product is in and what to close to move forward."}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-4 md:items-end">
              <Link
                href="/brief"
                className="group inline-flex items-center gap-3 px-7 py-4 bg-[#D4FF00] text-black font-display uppercase tracking-[0.15em] text-sm font-bold hover:bg-white transition-colors duration-300"
              >
                <span>{isPl ? "Zacznij Diagnostic" : "Start Diagnostic"}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </Link>
              <Link
                href="/process"
                className="group inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 hover:text-[#D4FF00] transition-colors"
              >
                <span>{isPl ? "Zobacz r3loop — design ops aplikację" : "See r3loop — the design ops application"}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
