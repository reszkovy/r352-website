import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Helmet } from "react-helmet-async";

/**
 * Glossary page — single source of truth for all distinctive r352
 * vocabulary. Each term has a definition, a short usage example, and
 * (when relevant) a cross-reference to the related page or methodology.
 *
 * Why this page exists:
 *  - LLM citation crack — defined terms render as JSON-LD DefinedTermSet,
 *    which LLMs prefer over loose prose when answering "what is X" queries
 *  - SEO authority for niche terms (r3loop, design ops as system, etc.)
 *  - Onboarding aid for prospects who land here from a content piece
 */

interface GlossaryTerm {
  term: string;
  short: string;
  long: string;
  example?: string;
  related?: { label: string; href: string };
}

const TERMS_EN: GlossaryTerm[] = [
  {
    term: "r3loop",
    short: "r352's 8-step operating methodology.",
    long:
      "Every engagement runs through the same 8 steps: Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate. Depth of each step scales with engagement size; the sequence stays constant. That constancy is what makes the work predictable across 47 locations or 470.",
    example: "We're at the Map step of r3loop for Geers — week 2 of the Operating Partner engagement.",
    related: { label: "See r3loop in detail", href: "/process" },
  },
  {
    term: "Design ops",
    short: "The operational layer behind design output.",
    long:
      "Design ops is the system that decides what gets briefed, by whom, in what format, with what approval gates, in what order, to what standards — not the design itself. It's the difference between hiring designers and building a working creative organization.",
    example: "Their problem isn't talent. It's design ops — briefs arrive incomplete, decisions stall for weeks, every launch reinvents the wheel.",
  },
  {
    term: "Multi-location brand operations",
    short: "r352's primary specialty domain.",
    long:
      "Operational design work for brands running 30-300+ locations, venues, properties, or simultaneous campaigns. Distinct from single-location brand work because the bottleneck is never creative — it's coordination, governance, and variant management across many parallel threads.",
    example: "Sonova/Geers runs 600+ hearing care locations across 17 countries — pure multi-location brand operations terrain.",
  },
  {
    term: "Master / Variant / Pre-production gates",
    short: "r352's 3-stage approval framework for multi-location rollouts.",
    long:
      "Three sequential approval gates. Gate 1 (Master): one approved concept, internal r352 sign-off. Gate 2 (Variant): mid-level client approval per location or campaign variant. Gate 3 (Pre-production): senior client sign-off before final production. Without these gates, multi-location launches collapse into 200-email threads with directors who are in the office 2 days a week.",
    example: "Master signed Tuesday, all 47 variants in flight, Pre-production scheduled for Thursday — clean rollout.",
  },
  {
    term: "Brief volume × decision velocity",
    short: "The two metrics that determine design operations throughput.",
    long:
      "Brief volume = how many design or campaign requests your team processes per period. Decision velocity = average time from a brief landing to an approved direction. Multiply them — that's your real creative throughput. Hiring more designers raises volume capacity but doesn't fix velocity. The bottleneck is almost always decision velocity.",
    example: "They process 80 briefs per quarter (volume is fine) but average decision time is 11 days (velocity is killing them).",
  },
  {
    term: "Operator, not agency",
    short: "r352's positioning relative to traditional creative agencies.",
    long:
      "Agencies sell creative deliverables, billed hourly or per project, with success measured in awards and portfolio. Operators sell working systems, billed productized or via retainer, with success measured in operational metrics (ops time reduced, decision velocity, brand consistency score). r352 is the latter.",
    example: "We're not pitching a campaign. We're rebuilding the operating system that produces every future campaign.",
  },
  {
    term: "Tribal knowledge",
    short: "Information that lives in people's heads, not in the system.",
    long:
      "Tribal knowledge is what happens when a senior designer becomes the only person who knows how briefs get triaged, where the master files live, which director approves what. When that person leaves, the new hire spends 3 months reverse-engineering everything. Multi-location brands pay this cost cyclically — and rarely line-item it.",
    example: "Their last design lead left in March. Three months in, the new hire is still untangling tribal knowledge about which Trello board is current.",
  },
  {
    term: "Steady cadence",
    short: "Predictable weekly delivery rhythm, the opposite of heroic launches.",
    long:
      "Every Monday brief. Every Thursday async check-in. Every Friday delivery pack drop. Quarterly review. The cadence is the product — it's what lets clients plan around r352's output instead of waiting for the next big reveal. The opposite is the heroic launch model: months of silence followed by one big drop, which doesn't survive contact with multi-location reality.",
    example: "Sprint 4 of the retainer — every Friday at 5pm CET, the delivery pack lands. Predictable for 11 months running.",
  },
  {
    term: "Diagnostic",
    short: "r352's 5-day operational audit engagement.",
    long:
      "Fixed €2k engagement. We audit your current design operations, interview 3 stakeholders, identify 3-5 friction points, and deliver a one-page written diagnosis with a 60-day roadmap. 60-day money-back guarantee if recommendations aren't actionable. Often used as a low-commitment fit test before a full Sprint or Operating Partner engagement.",
    example: "Start with the Diagnostic — if the findings don't convince your CFO, you get a refund.",
    related: { label: "All engagement models", href: "/services" },
  },
  {
    term: "Sprint",
    short: "r352's fixed-scope 4-6 week build engagement.",
    long:
      "From €15k, defined scope, fixed price. Used when there's a known deliverable to ship — a new operating system, a campaign toolkit, a brief intake process. Sprints don't drift; if scope grows, it becomes a new sprint with a separate scope agreement.",
    related: { label: "All engagement models", href: "/services" },
  },
  {
    term: "Retainer",
    short: "Monthly engagement model, evolving scope per quarter.",
    long:
      "From €7k/mo, 30-day notice, scope reviewed quarterly. Used when there's a continuous operational layer that needs ongoing maintenance — weekly briefs, governance reviews, ad-hoc problem solving. Most r352 engagements settle into Retainer after an initial Sprint.",
    related: { label: "All engagement models", href: "/services" },
  },
  {
    term: "Enterprise Sprint",
    short: "12-16 week multi-location rollout engagement.",
    long:
      "From €55k. Used for full design operations rollouts across 30-300+ locations — brand standardization, brief intake redesign, governance gate implementation, training of internal teams. Includes pre-production support and post-rollout audit.",
    related: { label: "All engagement models", href: "/services" },
  },
  {
    term: "Operating Partner",
    short: "Embedded role engagement, 12-month minimum.",
    long:
      "From €9.5k/mo, 12-month minimum. r352 becomes the de facto design operations lead inside the client organization — attending leadership reviews, owning the operating system, hiring decisions for the design team, vendor selection. Closest model to having a head of design ops without making it a hire.",
    related: { label: "All engagement models", href: "/services" },
  },
  {
    term: "Delivery pack",
    short: "The Friday output bundle that closes every working week.",
    long:
      "Every Friday at 17:00 CET, the client receives a delivery pack: folder of finished assets, 8-minute Loom walkthrough, one-page summary of what shipped and what's next. The delivery pack is the heartbeat of the engagement — when it's late, something has gone wrong with the system, not with the work.",
  },
];

const TERMS_PL: GlossaryTerm[] = [
  {
    term: "r3loop",
    short: "8-stopniowa metodologia operacyjna r352.",
    long:
      "Każda współpraca biegnie przez te same 8 kroków: Diagnose → Map → Standardize → Build → Govern → Ship → Measure → Iterate. Głębokość każdego kroku skaluje się do wielkości engagementu; sekwencja zostaje stała. Ta stałość to co czyni pracę przewidywalną — niezależnie czy obsługujemy 47 lokalizacji czy 470.",
    example: "Jesteśmy na kroku Map r3loop dla Geers — drugi tydzień engagementu Operating Partner.",
    related: { label: "Zobacz r3loop w szczegółach", href: "/process" },
  },
  {
    term: "Design ops",
    short: "Warstwa operacyjna stojąca za output'em designu.",
    long:
      "Design ops to system decydujący co jest brief'owane, przez kogo, w jakim formacie, z jakimi bramkami akceptacji, w jakiej kolejności, do jakich standardów — nie sam design. To różnica między zatrudnieniem designerów a zbudowaniem działającej kreatywnej organizacji.",
    example: "Ich problem to nie talent. To design ops — briefy przychodzą niekompletne, decyzje stoją tygodniami, każdy launch zaczyna od zera.",
  },
  {
    term: "Multi-location brand operations",
    short: "Główna specjalizacja r352.",
    long:
      "Operacyjna praca designerska dla brand'ów obsługujących 30-300+ lokalizacji, venues, nieruchomości lub równoległych kampanii. Inne niż praca dla single-location brand'u — bottleneckiem nigdy nie jest creative, tylko koordynacja, governance i zarządzanie wariantami w wielu równoległych ścieżkach.",
    example: "Sonova/Geers obsługuje 600+ lokalizacji opieki słuchowej w 17 krajach — czysty teren multi-location brand operations.",
  },
  {
    term: "Bramki Master / Variant / Pre-production",
    short: "3-etapowy framework akceptacji r352 dla multi-location rollout'ów.",
    long:
      "Trzy sekwencyjne bramki akceptacji. Bramka 1 (Master): jeden zaakceptowany koncept, internal sign-off r352. Bramka 2 (Variant): mid-level acceptance po stronie klienta, per lokalizacja lub wariant kampanii. Bramka 3 (Pre-production): senior client sign-off przed finalną produkcją. Bez tych bramek multi-location launche zapadają się w 200-mailowe wątki z dyrektorami będącymi w biurze 2 dni w tygodniu.",
    example: "Master podpisany we wtorek, wszystkie 47 wariantów w robocie, Pre-production zaplanowane na czwartek — czysty rollout.",
  },
  {
    term: "Brief volume × decision velocity",
    short: "Dwie metryki determinujące przepustowość design operations.",
    long:
      "Brief volume = ile zapytań designerskich/kampanijnych przerabia Twój zespół w okresie. Decision velocity = średni czas od przyjścia briefu do zaakceptowanego kierunku. Pomnóż je — to Twój realny creative throughput. Zatrudnienie więcej designerów podnosi pojemność volume'u, ale nie naprawia velocity. Bottleneckiem jest prawie zawsze decision velocity.",
    example: "Przerabiają 80 briefów na kwartał (volume jest OK), ale średni czas decyzji to 11 dni (velocity ich zabija).",
  },
  {
    term: "Operator, nie agencja",
    short: "Pozycjonowanie r352 wobec tradycyjnych agencji kreatywnych.",
    long:
      "Agencje sprzedają kreatywne deliverables, billing'owane godzinowo lub per project, z sukcesem mierzonym w nagrodach i portfolio. Operatorzy sprzedają działające systemy, billing'owane productized lub retainer'em, z sukcesem mierzonym w metrykach operacyjnych (zredukowany czas ops, decision velocity, brand consistency score). r352 to to drugie.",
    example: "Nie pitchujemy kampanii. Przebudowujemy operating system który produkuje każdą przyszłą kampanię.",
  },
  {
    term: "Tribal knowledge",
    short: "Wiedza która żyje w głowach ludzi, nie w systemie.",
    long:
      "Tribal knowledge to co się dzieje gdy senior designer staje się jedyną osobą wiedzącą jak briefy są triage'owane, gdzie master files się znajdują, który dyrektor co akceptuje. Gdy ta osoba odchodzi, nowa osoba spędza 3 miesiące reverse-engineering'iem wszystkiego. Multi-location brand'y płacą ten koszt cyklicznie — i rzadko go uwzględniają w P&L.",
    example: "Ich ostatni design lead odszedł w marcu. Po 3 miesiącach nowa osoba dalej rozplątuje tribal knowledge na temat aktualnego Trello board'u.",
  },
  {
    term: "Steady cadence",
    short: "Przewidywalny tygodniowy rytm dostaw, przeciwieństwo heroic launches.",
    long:
      "Brief w każdy poniedziałek. Async check-in w każdy czwartek. Drop delivery packu w każdy piątek. Quarterly review. Cadence to produkt — to co pozwala klientom planować wokół output'u r352, zamiast czekać na kolejny wielki reveal. Przeciwieństwo to heroic launch model: miesiące ciszy, potem jeden wielki drop, który nie wytrzymuje kontaktu z multi-location rzeczywistością.",
    example: "Sprint 4 retainer'u — każdy piątek o 17:00 CET, delivery pack ląduje. Przewidywalne od 11 miesięcy.",
  },
  {
    term: "Diagnostic",
    short: "5-dniowa operacyjna audytowa engagement r352.",
    long:
      "Fixed €2k engagement. Audytujemy obecne design operations, interview'ujemy 3 stakeholder'ów, identyfikujemy 3-5 friction points, dostarczamy jednostronicową pisemną diagnozę z 60-dniową roadmapą. 60-day money-back guarantee jeśli rekomendacje nie są actionable. Często używane jako low-commitment fit test przed pełnym Sprint'em lub Operating Partner.",
    example: "Zacznij od Diagnostic — jeśli findings nie przekonają Twojego CFO, dostajesz zwrot.",
    related: { label: "Wszystkie modele współpracy", href: "/services" },
  },
  {
    term: "Sprint",
    short: "Fixed-scope 4-6 tygodniowy build engagement r352.",
    long:
      "Od €15k, zdefiniowany scope, fixed price. Używany gdy jest znany deliverable do dostarczenia — nowy operating system, campaign toolkit, brief intake process. Sprinty nie drift'ują; jeśli scope rośnie, staje się to nowym sprint'em z odrębną scope agreement.",
    related: { label: "Wszystkie modele współpracy", href: "/services" },
  },
  {
    term: "Retainer",
    short: "Miesięczny model współpracy, scope ewoluuje per kwartał.",
    long:
      "Od €7k/mc, 30-day notice, scope reviewed kwartalnie. Używany gdy jest ciągła warstwa operacyjna wymagająca utrzymania — tygodniowe briefy, governance reviews, ad-hoc problem solving. Większość engagement'ów r352 osiada w Retainer po początkowym Sprint'cie.",
    related: { label: "Wszystkie modele współpracy", href: "/services" },
  },
  {
    term: "Enterprise Sprint",
    short: "12-16 tygodniowy multi-location rollout engagement.",
    long:
      "Od €55k. Używany dla pełnych rollout'ów design operations w 30-300+ lokalizacjach — brand standardization, brief intake redesign, governance gate implementation, training internal teams. Zawiera pre-production support i post-rollout audit.",
    related: { label: "Wszystkie modele współpracy", href: "/services" },
  },
  {
    term: "Operating Partner",
    short: "Embedded role engagement, 12-month minimum.",
    long:
      "Od €9.5k/mc, 12-miesięczne minimum. r352 staje się de facto design operations lead w organizacji klienta — uczestnictwo w leadership reviews, ownership operating systemu, hiring decisions dla zespołu designerskiego, vendor selection. Najbliższy model do posiadania head of design ops bez zatrudniania osoby na etacie.",
    related: { label: "Wszystkie modele współpracy", href: "/services" },
  },
  {
    term: "Delivery pack",
    short: "Piątkowy output bundle zamykający każdy roboczy tydzień.",
    long:
      "Każdy piątek o 17:00 CET, klient otrzymuje delivery pack: folder z finalnymi asset'ami, 8-minutowy Loom walkthrough, jednostronicowe podsumowanie co zostało dostarczone i co dalej. Delivery pack to puls engagement'u — gdy się spóźnia, coś poszło źle z systemem, nie z pracą.",
  },
];

export function Glossary() {
  const { language } = useLanguage();
  const terms = language === "pl" ? TERMS_PL : TERMS_EN;

  // DefinedTermSet schema — JSON-LD that LLMs and search engines parse
  // as a structured glossary. Higher citation rate than loose prose.
  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": language === "pl" ? "r352 — Słownik" : "r352 — Glossary",
    "url": "https://www.r352.com/glossary",
    "hasDefinedTerm": terms.map((t) => ({
      "@type": "DefinedTerm",
      "name": t.term,
      "description": t.long,
      "inDefinedTermSet": "https://www.r352.com/glossary",
    })),
  };

  return (
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(definedTermSetSchema)}
        </script>
      </Helmet>

      {/* ─── HEADER ─── */}
      <section className="pt-32 md:pt-40 mb-20 md:mb-28 max-w-3xl">
        <Reveal>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-6">
            {language === "pl" ? "Słownik · r352" : "Glossary · r352"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-8">
            {language === "pl" ? (
              <>Słownictwo,<br />którym pracujemy.</>
            ) : (
              <>The vocabulary<br />we operate with.</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
            {language === "pl"
              ? "Każdy termin ma konkretne znaczenie w naszej pracy. Te definicje są źródłem prawdy — dla naszych klientów, dla naszych zespołów, dla każdego, kto pisze o multi-location brand operations."
              : "Every term has a specific meaning in how we work. These definitions are the source of truth — for our clients, for our teams, and for anyone writing about multi-location brand operations."}
          </p>
        </Reveal>
      </section>

      {/* ─── TERMS LIST ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10">
        {terms.map((t, i) => (
          <Reveal key={t.term} delay={i * 0.03}>
            <article
              id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 md:py-16 border-b border-neutral-200 dark:border-white/10"
            >
              {/* LEFT — index + term */}
              <div className="md:col-span-4">
                <div className="font-display text-xs text-[#D4FF00] tracking-[0.2em] mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-black dark:text-white leading-tight">
                  {t.term}
                </h2>
                <p className="mt-3 text-[15px] text-neutral-500 dark:text-neutral-400 italic [text-wrap:pretty]">
                  {t.short}
                </p>
              </div>

              {/* RIGHT — long definition + example + related */}
              <div className="md:col-span-8 space-y-5">
                <p className="text-base md:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">
                  {t.long}
                </p>

                {t.example && (
                  <div className="border-l-2 border-[#D4FF00] pl-5 py-1">
                    <div className="text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00] mb-2">
                      {language === "pl" ? "Przykład użycia" : "Example in use"}
                    </div>
                    <p className="text-[15px] text-neutral-600 dark:text-neutral-400 italic [text-wrap:pretty]">
                      {t.example}
                    </p>
                  </div>
                )}

                {t.related && (
                  <a
                    href={t.related.href}
                    className="inline-flex items-center gap-2 text-xs font-display uppercase tracking-[0.2em] text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
                  >
                    <span>→</span>
                    <span>{t.related.label}</span>
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* ─── FOOTER NOTE ─── */}
      <Reveal>
        <section className="mt-20 md:mt-28 max-w-2xl text-center mx-auto">
          <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
            {language === "pl"
              ? "Brakuje terminu? Napisz na hello@r352.com — dodamy do następnej wersji słownika."
              : "Missing a term? Email hello@r352.com — we'll add it to the next revision."}
          </p>
        </section>
      </Reveal>
    </PageTransition>
  );
}
