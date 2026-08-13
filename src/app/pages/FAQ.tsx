import { useState } from "react";
import { Link } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Helmet } from "react-helmet-async";

/**
 * FAQ page - visible answers for the questions referenced in faqSchema
 * inside SEO.tsx. Without a rendered page, the JSON-LD Q&A becomes a
 * Google policy violation (schema must reflect on-page content). This
 * page is the on-page mirror.
 *
 * Pattern follows Glossary.tsx:
 *  - PageTransition + Reveal
 *  - Inline EN/PL content arrays (no translations.ts dependency)
 *  - Tailwind classes consistent with the rest of the operator pages
 *
 * Native <details>/<summary> is used for expand/collapse:
 *  - Zero JS, works without hydration
 *  - Screen-reader friendly by default (aria-expanded handled by UA)
 *  - Matches the operator aesthetic - no JS splash, just function
 *
 * A11y hardening (WCAG 2.1 AA): Chromium/Firefox expose the expanded state
 * of <summary> natively, but Safari + VoiceOver support is inconsistent, so
 * each summary additionally carries explicit aria-expanded + aria-controls,
 * synced through the native <details> toggle event. Redundant where the UA
 * already does the right thing, corrective where it doesn't.
 */

/**
 * Copy note (2026-08): the register moved from operator-jargon to plain,
 * confident language with exactly ONE smile per answer. Humour comes from
 * recognising the absurdities of the work ("final_v7_LAST_poprawiony"), never
 * from writing jokes - if every line tries to be funny, r352 reads like a
 * social media agency.
 *
 * Structure per answer: hook (one line, slightly disarming) -> substance
 * (what we actually do) -> landing (the sentence worth remembering).
 * Paragraphs are split on a blank line and rendered separately.
 *
 * FOUR definitional questions (r3loop, agencies/white-label, pricing, Reszek)
 * are deliberately kept from the previous version and rewritten into the new
 * register rather than dropped. They are the entity/pricing facts that LLM
 * answers and the FAQPage schema depend on - the conversational questions
 * around them do not carry a single number or proper noun.
 */
interface FaqItem {
  q: string;
  /** Paragraphs, blank-line separated. */
  a: string;
  /** Optional closing line rendered as the visual finale (last item only). */
  finale?: string;
}

const FAQ_EN: FaqItem[] = [
  {
    q: "Are you an agency?",
    a: "Technically we could say yes. We would just have to leave out about half of what we do.\n\nWe design campaigns, brands and digital products, but we are just as interested in everything between the brief and the publish button: decisions, production, variants, approvals, QA, and the question of why this same banner is being built from scratch for the fourteenth time.\n\nWe do not only design things. We design the way the next ones get made.",
  },
  {
    q: "When is it worth coming to you?",
    a: "When marketing works, but it is starting to take a suspicious amount of energy.\n\nToo many versions. Too much manual work. Too many files called final_v7_LAST_revised. Too many people have to approve something, and the brand starts living its own life in every channel, country or location.\n\nUsually it is not talent that is missing. It is the system.",
  },
  {
    q: "Do we need everything in order before we start?",
    a: "Quite the opposite. Order limits our room to show off a little.\n\nIf the brief lives in five emails, two PDFs, a deck from three months ago and the head of one person who just left on holiday, that is exactly where we start.\n\nFirst we look at how the work actually happens. Not how it looks on the diagram.",
  },
  {
    q: "Can we just hire you for one project?",
    a: "Of course. Not every engagement has to begin by rebuilding all of marketing.\n\nWe can do a campaign, a landing page or a set of materials. But if it turns out along the way that the 40 formats you ordered are a symptom of a problem that will have you needing another 80 next month, we are not going to pretend we did not notice.\n\nYou get the files. You also get the cause.",
  },
  {
    q: "Do you do things by yesterday?",
    a: "Yes. We have even seen briefs needed by the day before yesterday.\n\nSudden work is part of marketing and we are not going to fight it. But when everything is urgent, the deadline stops being the problem.\n\nAt that point, instead of getting better at putting out fires, it is worth asking why something keeps catching fire.",
  },
  {
    q: "What does Design Ops actually mean?",
    a: "A complicated name for a very simple thing: making sure that producing good design is not a small military operation every single time.\n\nWe put rules, components, templates, production, ownership and QA in order. So the brand can produce more, faster and more consistently without adding more people, more meetings and more spreadsheets.\n\nLess ops. More design.",
  },
  {
    q: "What is r3loop?",
    a: "Our name for not starting every project from zero.\n\nEight steps every engagement runs through: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. How deep each step goes scales with the size of the work, but the sequence stays the same.\n\nThat is what makes the work equally predictable across 47 locations and across 470.",
  },
  {
    q: "Do you use AI?",
    a: "Very much. We just do not ask it to do the marketing.\n\nAI helps us process context, build variants, automate production, hold consistency and take off people's plates the work people really do not need to be doing.\n\nMachines are excellent at doing a thing 300 times. A human should decide whether it is worth doing once.",
  },
  {
    q: "Does AI just mean more content?",
    a: "Hopefully not. The internet is genuinely not suffering from a content shortage.\n\nWhat interests us is AI that shortens the path from brief to publish, remembers the brand rules, automates adaptations and catches mistakes.\n\nIt is not about ten times more production. It is about ten times less pointless work.",
  },
  {
    q: "Do you work with our team, or instead of it?",
    a: "With it. If a year in, every small change still needs a phone call to us, something went wrong.\n\nAt the start we can go deep: diagnose, design, build and put things in order. After that, more and more should run on your side.\n\nWorking with us well has a slightly paradoxical goal: over time you should need us less, not more.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes, white-label. Without our logo in the footer of your deck.\n\nYou keep the pitch, the client relationship and the brand. We run strategy, design, production and QA under your name. Three shapes: per project, retained capacity, or embedded for a launch.\n\nThe client sees your team. Because it is your team.",
  },
  {
    q: "What does it cost?",
    a: "It depends, but less than it usually does in this industry.\n\nFive models with the price written down. Diagnostic: 5-day operational audit, EUR 2k, 60-day money-back guarantee. Sprint: 4-6 weeks, fixed scope, from EUR 15k. Retainer: from EUR 7k/mo, 30-day notice. Enterprise Sprint: 12-16 week multi-location rollout, from EUR 55k. Operating Partner: an embedded role, from EUR 9.5k/mo, 12-month minimum.\n\nThe price before the call, not after the third meeting.",
  },
  {
    q: "Who is Reszek?",
    a: "The person behind r352, and the one who answers the emails.\n\nPrzemyslaw Reszka, 15+ years in design. Started in UX at Deloitte, then six years across European markets building design operations for multi-location brands. Created the r3loop methodology. EU-based, remote-first.\n\nShort version: a designer who has watched good design break on production one too many times.",
  },
  {
    q: "What is left after the project?",
    a: "The files, obviously. But it would be a little sad if that were all.\n\nWhat stays: components, templates, rules, automations, knowledge, QA and a way of making decisions. Sometimes a playbook. Sometimes an entire production system.",
    finale: "A good project solves today's problem. A good system means you do not have to solve it again tomorrow.",
  },
];

const FAQ_PL: FaqItem[] = [
  {
    q: "Czy jesteście agencją?",
    a: "Technicznie moglibyśmy tak powiedzieć. Tylko wtedy musielibyśmy pominąć połowę tego, co robimy.\n\nProjektujemy kampanie, marki i produkty cyfrowe, ale równie mocno interesuje nas wszystko pomiędzy briefem a publikacją: decyzje, produkcja, warianty, akceptacje, QA i pytanie, dlaczego ten sam banner właśnie po raz czternasty powstaje od zera.\n\nNie tylko projektujemy rzeczy. Projektujemy też sposób, w jaki powstają kolejne.",
  },
  {
    q: "Kiedy warto do was przyjść?",
    a: "Kiedy marketing działa, ale zaczyna wymagać podejrzanie dużo energii.\n\nZa dużo wersji. Za dużo ręcznej roboty. Za dużo plików final_v7_LAST_poprawiony. Za dużo osób musi coś zaakceptować, a marka zaczyna żyć własnym życiem w każdym kanale, kraju albo lokalizacji.\n\nZwykle nie brakuje wtedy talentu. Brakuje systemu.",
  },
  {
    q: "Czy musimy mieć wszystko poukładane przed startem?",
    a: "Wręcz przeciwnie. Porządek trochę ogranicza nasze pole do popisu.\n\nJeśli brief żyje w pięciu mailach, dwóch PDF-ach, prezentacji sprzed trzech miesięcy i głowie jednej osoby, która właśnie poszła na urlop, zaczniemy właśnie tam.\n\nNajpierw sprawdzamy, jak praca wygląda naprawdę. Nie jak wygląda na diagramie.",
  },
  {
    q: "Czy możemy po prostu zlecić wam jeden projekt?",
    a: "Jasne. Nie każda współpraca musi zaczynać się od przebudowy całego marketingu.\n\nMożemy zrobić kampanię, landing page albo system materiałów. Ale jeśli przy okazji okaże się, że zamówione 40 formatów jest objawem problemu, przez który za miesiąc będziecie potrzebować kolejnych 80, raczej nie będziemy udawać, że tego nie widzimy.\n\nPliki dowieziemy. Przyczynę też pokażemy.",
  },
  {
    q: "Robicie rzeczy na wczoraj?",
    a: "Tak. Widzieliśmy już nawet briefy potrzebne na przedwczoraj.\n\nNagłe tematy są częścią marketingu i nie zamierzamy z tym walczyć. Ale jeśli wszystko jest pilne, problemem przestaje być deadline.\n\nWtedy zamiast coraz sprawniej gasić pożary, warto sprawdzić, dlaczego ciągle coś się pali.",
  },
  {
    q: "Co właściwie oznacza Design Ops?",
    a: "To skomplikowana nazwa na bardzo prostą rzecz: żeby robienie dobrego designu nie było za każdym razem małą operacją wojskową.\n\nPorządkujemy zasady, komponenty, szablony, produkcję, odpowiedzialności i QA. Dzięki temu marka może produkować więcej, szybciej i spójniej bez dokładania kolejnych ludzi, spotkań i arkuszy.\n\nMniej operacji. Więcej designu.",
  },
  {
    q: "Czym jest r3loop?",
    a: "Naszą nazwą na to, żeby nie zaczynać każdego projektu od zera.\n\nOsiem kroków, przez które przechodzi każda współpraca: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Głębokość każdego kroku skaluje się do wielkości projektu, ale kolejność zostaje ta sama.\n\nDzięki temu praca jest tak samo przewidywalna przy 47 lokalizacjach i przy 470.",
  },
  {
    q: "Czy używacie AI?",
    a: "Bardzo. Tylko nie prosimy go, żeby zrobiło marketing.\n\nAI pomaga nam przetwarzać kontekst, budować warianty, automatyzować produkcję, pilnować spójności i zdejmować z ludzi pracę, której ludzie naprawdę nie muszą wykonywać.\n\nMaszyny są świetne w robieniu rzeczy 300 razy. Człowiek powinien zdecydować, czy warto zrobić je choć raz.",
  },
  {
    q: "Czy AI oznacza po prostu więcej contentu?",
    a: "Oby nie. Internet naprawdę nie cierpi na niedobór contentu.\n\nInteresuje nas AI, które skraca drogę od briefu do publikacji, pamięta zasady marki, automatyzuje adaptacje i wyłapuje błędy.\n\nNie chodzi o 10 razy więcej produkcji. Chodzi o 10 razy mniej bezsensownej roboty.",
  },
  {
    q: "Pracujecie z naszym zespołem czy zamiast niego?",
    a: "Z nim. Jeśli po roku współpracy każda drobna zmiana nadal wymaga telefonu do nas, coś poszło nie tak.\n\nNa początku możemy wejść głęboko: diagnozować, projektować, budować i porządkować. Potem coraz więcej powinno działać po waszej stronie.\n\nDobra współpraca z nami ma trochę paradoksalny cel: z czasem potrzebujecie nas mniej, nie więcej.",
  },
  {
    q: "Czy pracujecie z agencjami?",
    a: "Tak, white-label. Bez naszego logo w stopce waszej prezentacji.\n\nWy trzymacie pitch, relację z klientem i markę. My prowadzimy strategię, design, produkcję i QA pod waszą nazwą. Trzy formy: per projekt, stała pojemność albo wejście na czas launchu.\n\nKlient widzi wasz zespół. Bo to jest wasz zespół.",
  },
  {
    q: "Ile to kosztuje?",
    a: "Zależy, ale mniej niż zwykle w tej branży.\n\nPięć modeli z ceną wypisaną wprost. Diagnostic: 5-dniowy audyt operacyjny, 2 tys. EUR, 60 dni gwarancji zwrotu. Sprint: 4-6 tygodni, fixed scope, od 15 tys. EUR. Retainer: od 7 tys. EUR/mc, wypowiedzenie 30 dni. Enterprise Sprint: 12-16 tygodni rolloutu multi-location, od 55 tys. EUR. Operating Partner: rola wewnątrz zespołu, od 9,5 tys. EUR/mc, minimum 12 miesięcy.\n\nCena przed rozmową, nie po trzecim spotkaniu.",
  },
  {
    q: "Kim jest Reszek?",
    a: "Osobą, która stoi za r352 i odbiera maile.\n\nPrzemysław Reszka, 15+ lat w designie. Zaczynał w UX w Deloitte, potem sześć lat na europejskich rynkach, budując design operations dla marek multi-location. Stworzył metodologię r3loop. Baza w UE, praca remote-first.\n\nKrótko: projektant, który za wiele razy widział, jak dobry design rozbija się o produkcję.",
  },
  {
    q: "Co zostaje po projekcie?",
    a: "Oczywiście pliki. Ale byłoby trochę smutno, gdyby tylko one.\n\nZostają komponenty, szablony, reguły, automatyzacje, wiedza, QA i sposób podejmowania decyzji. Czasem playbook. Czasem cały system produkcyjny.",
    finale: "Dobry projekt rozwiązuje dzisiejszy problem. Dobry system sprawia, że jutro nie musicie rozwiązywać go ponownie.",
  },
];

export function FAQ() {
  const { language } = useLanguage();
  const items = language === "pl" ? FAQ_PL : FAQ_EN;

  // Explicit expanded-state mirror for aria-expanded (see header comment).
  // Native <details> stays the source of truth - onToggle just syncs aria.
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  // Mirror SEO.tsx faqSchema - by rendering it here too we keep the page
  // self-contained for crawlers that arrive directly at /faq without first
  // hitting the home route where SEO.tsx injects the global head.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        // Schema must mirror what is actually on the page, finale line included -
        // a FAQPage that answers more (or less) than the visible copy is a
        // structured-data policy violation, not a bonus.
        "@type": "Answer",
        "text": [item.a, item.finale].filter(Boolean).join("\n\n"),
      },
    })),
  };

  return (
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* ─── HEADER ─── */}
      <section className="pt-32 md:pt-40 mb-20 md:mb-28 max-w-3xl">
        <Reveal>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-6">
            {language === "pl" ? "FAQ · r352" : "FAQ · r352"}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-8">
            {language === "pl" ? (
              <>Najczęstsze<br />pytania.</>
            ) : (
              <>Common questions<br />answered.</>
            )}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
            {language === "pl"
              ? "Pytania, które naprawdę dostajemy - o to, czym właściwie jesteśmy, kiedy warto się odezwać, ile to kosztuje i co zostaje, kiedy skończymy. Bez marketingowej waty."
              : "The questions we actually get - what we really are, when it is worth reaching out, what it costs, and what is left when we are done. No marketing fluff."}
          </p>
        </Reveal>
      </section>

      {/* ─── FAQ LIST ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 max-w-4xl">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <details
              className="group border-b border-neutral-200 dark:border-white/10 py-8 md:py-10 [&_summary::-webkit-details-marker]:hidden"
              onToggle={(e) => {
                // Read `open` BEFORE the state updater. React nulls out
                // `currentTarget` once the handler returns, and the updater
                // callback runs later - reading it in there throws
                // "Cannot read properties of null (reading 'open')" and takes
                // the whole page down with it.
                const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                setOpenItems((prev) => ({ ...prev, [i]: isOpen }));
              }}
            >
              <summary
                className="flex items-start gap-6 cursor-pointer list-none select-none"
                aria-expanded={!!openItems[i]}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="font-display text-xs text-[#D4FF00] tracking-[0.2em] pt-2 shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white leading-snug group-hover:text-[#D4FF00] transition-colors duration-300">
                  {item.q}
                </span>
                <span
                  className="text-[#D4FF00] text-3xl leading-none pt-1 shrink-0 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div id={`faq-panel-${i}`} className="mt-6 pl-14 pr-4 md:pr-12">
                {/* Answers are written as hook / substance / landing, so they are
                    rendered as separate paragraphs - collapsing them into one
                    block loses the beat the copy depends on. */}
                {item.a.split("\n\n").map((para) => (
                  <p
                    key={para}
                    className="text-base md:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty] mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
                {item.finale ? (
                  <p className="mt-8 text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white leading-snug [text-wrap:balance] border-l-2 border-[#D4FF00] pl-5">
                    {item.finale}
                  </p>
                ) : null}
              </div>
            </details>
          </Reveal>
        ))}
      </section>

      {/* ─── FOOTER CTA ─── */}
      <Reveal>
        <section className="mt-20 md:mt-28 max-w-2xl text-center mx-auto">
          <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed mb-4">
            {language === "pl"
              ? "Masz inne pytania?"
              : "Still have questions?"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href="mailto:hello@r352.com"
              className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-[0.2em] text-[#D4FF00] hover:text-white transition-colors duration-300 border-b border-[#D4FF00]/40 hover:border-white pb-1"
            >
              {language === "pl"
                ? "Napisz na hello@r352.com"
                : "Write to hello@r352.com"}
            </a>
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-[0.2em] text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300 border-b border-transparent hover:border-[#D4FF00]/40 pb-1"
            >
              {language === "pl"
                ? "Albo zacznij od briefu →"
                : "Or start with a brief →"}
            </Link>
          </div>
        </section>
      </Reveal>
    </PageTransition>
  );
}
