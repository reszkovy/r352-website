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
  // Optional cross-link to r3loop application — clarifies how this phase
  // is implemented when the work is design ops at multi-location scale.
  // Renders as a small italic note below the gate.
  r3loopNote?: { en: string; pl: string };
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
        "Positioning approved by the decision-maker",
        "User goals validated with at least 3 real users",
        "Success metric defined — one number that signals the product is working, plus supporting metrics",
        'Scope of the first version (MVP) and the "never list" (what we will not build) are clear',
        "Budget and timeline accepted",
      ],
      pl: [
        "Pozycjonowanie zatwierdzone przez decydenta",
        "Cele użytkowników zwalidowane z min. 3 realnymi osobami",
        "Wskaźnik sukcesu zdefiniowany — jedna liczba sygnalizująca, że produkt działa, plus metryki wspierające",
        'Zakres pierwszej wersji (MVP) i "never list" (czego nie zbudujemy) są jasne',
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
        'Brand tone of voice defined with at least 10 "use this / not this" examples',
        "Design tokens (colors, fonts, spacing as code variables) in a format developers can use directly",
        "Logo and colors final, named, organized",
        "Brand book available to the client team",
      ],
      pl: [
        "Brand platform zatwierdzona",
        'Tone of voice marki zdefiniowany z min. 10 przykładami "tak mówimy / tak nie mówimy"',
        "Design tokens (kolory, fonty, odstępy jako zmienne) w formacie gotowym do użycia przez developerów",
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
        "Narrative approved by the decision-maker",
        "Value proposition copy tested with 5+ people from the target audience",
        "Microcopy library (button labels, error messages, empty states, tooltips) complete for the first version",
        "Content style guide ready — your team can write on-brand without your review",
      ],
      pl: [
        "Narracja zatwierdzona przez decydenta",
        "Copy z propozycją wartości przetestowane z 5+ osobami z grupy docelowej",
        "Biblioteka microcopy (etykiety przycisków, komunikaty błędów, puste stany, podpowiedzi) kompletna dla pierwszej wersji",
        "Content style guide gotowy — Twój zespół pisze on-brand bez Twojego review",
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
    title: { en: "UX — Research, Information Architecture, Flows", pl: "UX · Research, Architektura Informacji, Przepływy" },
    goal: {
      en: "Design the product structure and user flows before any visual design begins.",
      pl: "Zaprojektować strukturę i przepływy użytkownika zanim zacznie się wizualizacja.",
    },
    outputs: {
      en: [
        "Critical user flows (key paths through the product) designed and tested",
        "Information architecture validated through structured user testing",
        "Medium-fidelity prototype (clickable, unstyled) passes usability test (at least 80% success)",
        "Microcopy integrated with wireframes",
      ],
      pl: [
        "Krytyczne przepływy użytkownika (kluczowe ścieżki przez produkt) zaprojektowane i przetestowane",
        "Architektura informacji zwalidowana przez ustrukturyzowany test użytkowy",
        "Prototyp w średniej szczegółowości (klikalny, bez stylów) przechodzi test użyteczności (min. 80% sukcesu)",
        "Microcopy zintegrowane z wireframami",
      ],
    },
    gate: {
      en: "Did 5 test users complete critical tasks without help? If less than 4/5 — back to flows.",
      pl: "Czy 5 testowych użytkowników wykonało critical task bez pomocy? Jeśli mniej niż 4/5 — wracasz do flowów.",
    },
    presence: "50%",
    r3loopNote: {
      en: "For multi-location brand ops, this phase is structured by r3loop steps 02–03 (Map → Standardize). See /process.",
      pl: "Dla operacji marek multi-location ta faza jest strukturyzowana przez kroki r3loop 02–03 (Map → Standardize). Zobacz /process.",
    },
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
        "All first-version screens in final visual design with every state (loading, error, empty, success)",
        "Design system documented and usable by developers without follow-up questions",
        "Accessibility audit passed (or exceptions documented and approved)",
        "Developer handoff specifications complete",
      ],
      pl: [
        "Wszystkie ekrany pierwszej wersji w finalnym designie ze wszystkimi stanami (ładowanie, błąd, pusty, sukces)",
        "Design system udokumentowany i używalny przez developerów bez dopytywania",
        "Audyt dostępności zaliczony (lub wyjątki udokumentowane i zatwierdzone)",
        "Specyfikacje przekazania developerom kompletne",
      ],
    },
    gate: {
      en: "Can a developer implement screen X without asking a single question? Test 3 random screens. If they ask — close specs.",
      pl: "Czy developer może zaimplementować ekran X bez jednego pytania? Test na 3 losowych ekranach. Jeśli pyta — domykaj specs.",
    },
    presence: "35%",
    r3loopNote: {
      en: "For multi-location brand ops, this phase is structured by r3loop steps 03–06 (Standardize → Build → Govern → Ship). See /process.",
      pl: "Dla operacji marek multi-location ta faza jest strukturyzowana przez kroki r3loop 03–06 (Standardize → Build → Govern → Ship). Zobacz /process.",
    },
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
        "Decision log — every strategic decision recorded with who, why, when",
        "Responsibility map (who does what, who decides what) per phase",
        "Stakeholder communication cadence — fixed weekly rhythm, not ad-hoc",
        "Change request process — how scope shifts get approved without chaos",
        "Acceptance criteria per phase — written before work starts",
      ],
      pl: [
        "Decision log — każda decyzja strategiczna zapisana (kto, dlaczego, kiedy)",
        "Mapa odpowiedzialności (kto co robi, kto co decyduje) per faza",
        "Rytm komunikacji ze stakeholderami — stała kadencja tygodniowa, nie ad-hoc",
        "Proces change requestów — jak zmiany scope'u są zatwierdzane bez chaosu",
        "Kryteria akceptacji per faza — spisane zanim ruszy praca",
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
        "Prompt library per phase — proven AI prompts tied to specific tasks",
        "AI tools stack — which tools we use where, and why",
        "Human-in-the-loop checkpoints (AI proposes, a person decides)",
        "Governance — where AI is allowed, where a human signs off",
      ],
      pl: [
        "Biblioteka promptów per faza — sprawdzone prompty AI przypisane do konkretnych zadań",
        "AI tools stack — z jakich narzędzi korzystamy, gdzie i dlaczego",
        "Punkty kontroli z człowiekiem (AI proponuje, człowiek decyduje)",
        "Governance — gdzie AI ma głos, gdzie człowiek podpisuje",
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
        "Input metrics per phase — leading indicators, not just outcomes",
        "Main success metric (North Star Metric) tracked monthly",
        "Decision velocity dashboard — how fast decisions actually get made",
        "Health score per deliverable — is each artifact aging well or rotting?",
      ],
      pl: [
        "Metryki wejściowe per faza — wskaźniki wyprzedzające, nie tylko wyniki",
        "Główny wskaźnik sukcesu (North Star Metric) śledzony co miesiąc",
        "Decision velocity dashboard — jak szybko decyzje faktycznie zapadają",
        "Health score per deliverable — czy każdy artefakt się starzeje dobrze, czy gnije?",
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

      {/* ─── WHO THIS IS FOR — explicit audience definition (was missing) ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
                {isPl ? "Dla kogo" : "Who this is for"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05] mb-6">
                {isPl ? "Dla operatorów, którzy budują systemy — nie tylko produkty." : "For operators who build systems — not just products."}
              </h2>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                {isPl
                  ? "Framework działa, kiedy stawka jest większa niż jeden ekran. Kiedy decyzje, które podejmiesz dziś, będą żyć w organizacji przez lata."
                  : "The framework works when the stakes are bigger than one screen. When the decisions you make today will live in the organization for years."}
              </p>
            </div>
            <ul className="flex flex-col divide-y divide-neutral-200 dark:divide-white/10">
              {(isPl ? [
                { role: "Założyciel / CEO", desc: "Wypuszczasz SaaS lub digital product — chcesz uniknąć kosztownych poprawek i przepalonych iteracji." },
                { role: "Właściciel marki", desc: "Relaunchujesz tożsamość lub wchodzisz na nowy rynek — szukasz systemu, który utrzyma jakość bez Twojej obecności." },
                { role: "Lider operacji multi-location", desc: "Konsolidujesz operacje kreatywne dla 5–300+ lokalizacji — chcesz scenariuszy, nie improwizacji." },
                { role: "Product Manager", desc: "Dziedziczysz pół-zbudowany produkt — potrzebujesz domknięcia faz i wyciszenia ad-hoc requestów." },
                { role: "Lider marketingu", desc: "Przygotowujesz launch marki i kampanii — chcesz spójności tonu, narracji i wykonania." },
                { role: "Operating Partner", desc: "Budujesz operating system dla portfolio firm — potrzebujesz frameworku, który skaluje bez Ciebie." },
              ] : [
                { role: "Founder / CEO", desc: "You're launching a SaaS or digital product — you want to avoid costly revisions and burned iterations." },
                { role: "Brand owner", desc: "You're relaunching identity or entering a new market — you need a system that holds quality without your presence." },
                { role: "Multi-location ops leader", desc: "You're consolidating creative operations across 5–300+ locations — you want scenarios, not improvisation." },
                { role: "Product Manager", desc: "You've inherited a half-built product — you need phases closed and ad-hoc requests silenced." },
                { role: "Marketing leader", desc: "You're preparing a brand + campaign launch — you want consistent tone, narrative, and execution." },
                { role: "Operating Partner", desc: "You're building an operating system across portfolio companies — you need a framework that scales without you." },
              ]).map((item, i) => (
                <li key={i} className="py-5">
                  <div className="text-[11px] font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-2">{item.role}</div>
                  <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ─── WHEN THIS IS TOO MUCH — explicit qualifier ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="max-w-4xl">
            <span className="block text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-display mb-6">
              {isPl ? "Kiedy framework to za dużo" : "When this framework is too much"}
            </span>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300 leading-snug mb-6 [text-wrap:balance]">
              {isPl
                ? "Framework jest prawdopodobnie za duży, jeśli potrzebujesz jednorazowego landinga, jednorazowego brand refresha lub pojedynczego asseta kampanii."
                : "The framework is probably too much if you only need a one-off landing page, a one-time brand refresh, or a single campaign asset."}
            </p>
            <p className="text-lg text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-3xl">
              {isPl
                ? "Działa najlepiej, gdy stawka strategiczna jest realna — wielofazowy produkt, marka która ma żyć lata, lub operacje, które rosną bez Twojej obecności."
                : "It works best when the strategic stakes are real — a multi-phase product, a brand meant to live for years, or operations that grow without your presence."}
            </p>
          </div>
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

                  {/* Optional r3loop cross-link — only renders on phases that
                      have a specific r3loop step mapping. Subordinates r3loop
                      explicitly as the design-ops application of the framework. */}
                  {phase.r3loopNote && (
                    <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                      <p className="text-[12px] md:text-[13px] text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
                        <span className="not-italic font-display uppercase tracking-[0.18em] text-[10px] text-neutral-500 mr-2">
                          r3loop:
                        </span>
                        {phase.r3loopNote[language]}
                      </p>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── OPERATING MODEL TABLE (moved up from pos 4 → 2 — this is the killer IP,
          was previously buried below LAYERS. Showing presence-drops graph right after
          phases makes "system not hours" the central proof of the page) ─── */}
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
                ? "Średnia po stabilizacji: 35%. Docelowy podział 80/20: strategia vs operacje. Klient kupuje system, który po wdrożeniu działa coraz mniej z moją obecnością — to dowód, że to system, nie godziny."
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

      {/* ─── PROOF / CASE STUDY — replaces pure theory with concrete application.
          Geers/Sonova is Reszek's strongest multi-location case — anchors the framework
          to real numbers (3× faster approvals, 80% briefs first-round, 15% presence). ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-16 mb-20">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-16">
            <div>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
                {isPl ? "Framework w działaniu" : "Framework in action"}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1.05]">
                {isPl ? "Przykład zastosowania." : "An example application."}
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium [text-wrap:pretty]">
                {isPl
                  ? "Geers / Sonova — sieć 60+ salonów słuchowych w Polsce. Chaos materiałów marketingowych: każdy salon improwizuje, brak jednolitej tożsamości w komunikacji, briefy chodzą przez e-mail."
                  : "Geers / Sonova — a network of 60+ hearing-care studios in Poland. Marketing materials chaos: every studio improvising, no unified identity in communication, briefs flying through email."}
              </p>
              <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                {isPl
                  ? "Framework w akcji: Faza 01 ustabilizowała brand platform, Faza 02 dała narrację gotową do delegacji, Fazy 03–04 zbudowały design system i komponenty dostępne dla wszystkich lokalizacji, Faza 07 wprowadziła rytm operacyjny — miesięczne review, kwartalne governance check."
                  : "Framework in action: Phase 01 stabilized the brand platform, Phase 02 delivered a narrative ready for delegation, Phases 03–04 built a design system and components accessible to all locations, Phase 07 introduced an operational rhythm — monthly reviews, quarterly governance checks."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200 dark:border-white/10">
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-[#D4FF00] leading-none mb-2">
                    3×
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                    {isPl ? "szybsze cykle akceptacji" : "faster approval cycles"}
                  </p>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-[#D4FF00] leading-none mb-2">
                    80%
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                    {isPl ? "briefów gotowych za pierwszym razem" : "briefs ready on first submission"}
                  </p>
                </div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold tracking-tighter text-[#D4FF00] leading-none mb-2">
                    15%
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                    {isPl ? "obecność po stabilizacji" : "my presence after stabilization"}
                  </p>
                </div>
              </div>
              <Link
                href="/work/sonova"
                className="group inline-flex items-center gap-2 mt-4 text-[11px] font-display uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 hover:text-[#D4FF00] transition-colors"
              >
                <span>{isPl ? "Pełny case study" : "Full case study"}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 6 CROSS-CUTTING LAYERS (moved down from pos 3 → 5 — supporting infrastructure
          after the killer IP graph + proof case study; reads as "and here's what makes it work") ─── */}
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
