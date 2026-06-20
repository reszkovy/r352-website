import { useState } from "react";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Helmet } from "react-helmet-async";

/**
 * FAQ page — visible answers for the questions referenced in faqSchema
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
 *  - Matches the operator aesthetic — no JS splash, just function
 *
 * A11y hardening (WCAG 2.1 AA): Chromium/Firefox expose the expanded state
 * of <summary> natively, but Safari + VoiceOver support is inconsistent, so
 * each summary additionally carries explicit aria-expanded + aria-controls,
 * synced through the native <details> toggle event. Redundant where the UA
 * already does the right thing, corrective where it doesn't.
 */

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_EN: FaqItem[] = [
  {
    q: "What is r3loop?",
    a: "r3loop is r352's 8-step operating methodology: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Every engagement runs through this loop. Depth of each step scales with engagement size, but sequence stays constant — that's what makes the work predictable across 47 locations or 470.",
  },
  {
    q: "Who does r352 work with?",
    a: "Multi-location brands and scaling operators — typically 30–300+ location complexity. Fitness, wellness, health, retail, real estate. Past clients include Sonova (Geers), Benefit Systems (300+ wellness clubs), Archicom (multi-investment real estate), Kubota, DiscoBowl, UNIQA, and FIFA.",
  },
  {
    q: "How is r352 different from a creative agency?",
    a: "r352 is positioned as an operator, not an agency. Agencies sell creative deliverables billed by the hour. r352 builds operational systems — design ops infrastructure, brief standardization, governance gates, AI-native production pipelines — sold as productized engagements with fixed scope and predictable outcomes. The deliverables are working tools your team uses after we're gone, not pitch decks.",
  },
  {
    q: "What are r352's engagement models?",
    a: "Five productized models. Diagnostic: 5-day operational audit, €2k fixed, 60-day money-back guarantee. Sprint: 4–6 week fixed-scope build, from €15k. Retainer: monthly engagement from €7k/mo with 30-day notice. Enterprise Sprint: 12–16 week multi-location rollout from €55k. Operating Partner: embedded role from €9.5k/mo with 12-month minimum.",
  },
  {
    q: "Who is Reszek?",
    // TODO(reszek): potwierdź listę miast w bio — na razie ogólne "six years across European markets".
    // MUST stay byte-identical with faqSchema in src/app/components/SEO.tsx (schema/content parity).
    a: "Przemyslaw Reszka (Reszek) is the founder of r352. Designer-operator with 15+ years of experience: started in UX at Deloitte, then spent six years across European markets building design operations for multi-location brands. Created the r3loop methodology. EU-based, remote-first.",
  },
];

const FAQ_PL: FaqItem[] = [
  {
    q: "Czym jest r3loop?",
    a: "r3loop to 8-stopniowa metodologia operacyjna r352: Diagnose, Map, Standardize, Build, Govern, Ship, Measure, Iterate. Każda współpraca biegnie przez ten loop. Głębokość każdego kroku skaluje się do wielkości engagementu, ale sekwencja zostaje stała — to dzięki niej praca jest przewidywalna przy 47 lokalizacjach i przy 470.",
  },
  {
    q: "Z kim pracuje r352?",
    a: "Multi-location brandy i skalujący się operatorzy — typowo złożoność 30–300+ lokalizacji. Fitness, wellness, health, retail, real estate. Wśród klientów: Sonova (Geers), Benefit Systems (300+ klubów wellness), Archicom (multi-inwestycyjny real estate), Kubota, DiscoBowl, UNIQA i FIFA.",
  },
  {
    q: "Czym r352 różni się od agencji kreatywnej?",
    a: "r352 jest pozycjonowane jako operator, nie agencja. Agencje sprzedają kreatywne deliverables billing'owane godzinowo. r352 buduje systemy operacyjne — design ops infrastructure, brief standardization, governance gates, AI-native production pipelines — sprzedawane jako produktyzowane engagementy z fixed scope i przewidywalnym outcome'em. Deliverables to działające narzędzia, których Twój zespół używa po naszym wyjściu, a nie pitch decki.",
  },
  {
    q: "Jakie są modele współpracy r352?",
    a: "Pięć produktyzowanych modeli. Diagnostic: 5-dniowy operacyjny audyt, €2k fixed, 60-day money-back guarantee. Sprint: 4–6 tygodniowy fixed-scope build, od €15k. Retainer: miesięczny engagement od €7k/mc z 30-day notice. Enterprise Sprint: 12–16 tygodniowy multi-location rollout od €55k. Operating Partner: embedded role od €9.5k/mc z 12-miesięcznym minimum.",
  },
  {
    q: "Kim jest Reszek?",
    // TODO(reszek): potwierdź listę miast w bio — na razie ogólne "sześć lat na europejskich rynkach".
    a: "Przemysław Reszka (Reszek) to założyciel r352. Designer-operator z 15+ latami doświadczenia: zaczynał w UX w Deloitte, potem spędził sześć lat na europejskich rynkach, budując design operations dla multi-location brandów. Stworzył metodologię r3loop. Bazuje w UE, pracuje remote-first.",
  },
];

export function FAQ() {
  const { language } = useLanguage();
  const items = language === "pl" ? FAQ_PL : FAQ_EN;

  // Explicit expanded-state mirror for aria-expanded (see header comment).
  // Native <details> stays the source of truth — onToggle just syncs aria.
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  // Mirror SEO.tsx faqSchema — by rendering it here too we keep the page
  // self-contained for crawlers that arrive directly at /faq without first
  // hitting the home route where SEO.tsx injects the global head.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
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
              ? "Pięć pytań, które dostajemy najczęściej — o r3loop, modele współpracy, pozycjonowanie i kto stoi za r352. Krótko, konkretnie, bez marketingowej waty."
              : "The five questions we get most — about r3loop, engagement models, positioning, and who's behind r352. Short, specific, no marketing fluff."}
          </p>
        </Reveal>
      </section>

      {/* ─── FAQ LIST ─── */}
      <section className="border-t border-neutral-200 dark:border-white/10 max-w-4xl">
        {items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.04}>
            <details
              className="group border-b border-neutral-200 dark:border-white/10 py-8 md:py-10 [&_summary::-webkit-details-marker]:hidden"
              onToggle={(e) =>
                setOpenItems((prev) => ({
                  ...prev,
                  [i]: (e.currentTarget as HTMLDetailsElement).open,
                }))
              }
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
                <p className="text-base md:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">
                  {item.a}
                </p>
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
          <a
            href="mailto:hello@r352.com"
            className="inline-flex items-center gap-2 text-sm font-display uppercase tracking-[0.2em] text-[#D4FF00] hover:text-white transition-colors duration-300 border-b border-[#D4FF00]/40 hover:border-white pb-1"
          >
            {language === "pl"
              ? "Napisz na hello@r352.com"
              : "Write to hello@r352.com"}
          </a>
        </section>
      </Reveal>
    </PageTransition>
  );
}
