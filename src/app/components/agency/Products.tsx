import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "wouter";

type Lang = "en" | "pl";

interface R3LoopStep {
  num: string;
  label: { en: string; pl: string };
  impl: { en: string; pl: string };
}

interface KPI {
  value: string;
  label: { en: string; pl: string };
}

interface Product {
  id: string;
  name: string;
  category: { en: string; pl: string };
  status: { en: string; pl: string };
  year: string;
  url: string;
  description: { en: string; pl: string };
  // Concrete proof — the numbers a buyer needs to believe this is real production work
  kpis: KPI[];
  // The headline transformation — research months → seconds, the kind of impact buyers want for themselves
  impact: { en: string; pl: string };
  r3loop: R3LoopStep[];
}

const PRODUCTS: Product[] = [
  {
    id: "caterelo",
    name: "Caterelo",
    category: { en: "Relocation Intelligence", pl: "Relocation Intelligence" },
    status: { en: "Live · Open Beta", pl: "Live · Open Beta" },
    year: "2026",
    url: "https://caterelo.com",
    description: {
      en: "A decision engine for Southern Europe. 90 regions scored across 13 data signals and 7 decision dimensions. AI advisor trained on the full dataset. Free + Pro tier shipping today.",
      pl: "Decision engine dla Europy Południowej. 90 regionów ocenionych przez 13 sygnałów danych i 7 wymiarów decyzyjnych. AI advisor wytrenowany na pełnym datasecie. Free + Pro tier — live.",
    },
    impact: {
      en: "40 hours of cross-referencing INE, ISTAT, INSEE data in 5 languages → 30 seconds, side-by-side.",
      pl: "40 godzin researchu w INE, ISTAT, INSEE w 5 językach → 30 sekund, side-by-side.",
    },
    kpis: [
      { value: "90", label: { en: "Regions tracked", pl: "Regionów" } },
      { value: "13", label: { en: "Data signals", pl: "Sygnałów danych" } },
      { value: "60+", label: { en: "Official sources", pl: "Oficjalnych źródeł" } },
      { value: "Live", label: { en: "+ quarterly refresh", pl: "+ quarterly refresh" } },
    ],
    // r3loop methodology mapped 1:1 to caterelo's actual production architecture
    r3loop: [
      {
        num: "01",
        label: { en: "Diagnose", pl: "Diagnoza" },
        impl: {
          en: "15-question relocation quiz surfaces user priorities",
          pl: "15-pytaniowy quiz ujawnia priorytety relokacji",
        },
      },
      {
        num: "02",
        label: { en: "Map", pl: "Mapowanie" },
        impl: {
          en: "90 regions × 13 signals × 7 decision dimensions",
          pl: "90 regionów × 13 sygnałów × 7 wymiarów decyzyjnych",
        },
      },
      {
        num: "03",
        label: { en: "Standardize", pl: "Standaryzacja" },
        impl: {
          en: "LifeTrend™ composite score 30–90, min-max normalized",
          pl: "LifeTrend™ — kompozytowy wynik 30–90, znormalizowany",
        },
      },
      {
        num: "04",
        label: { en: "Build", pl: "Budowa" },
        impl: {
          en: "REST API + comparator app + AI advisor + interactive map",
          pl: "REST API + comparator + AI advisor + mapa interaktywna",
        },
      },
      {
        num: "05",
        label: { en: "Govern", pl: "Governance" },
        impl: {
          en: "60+ official sources (Eurostat, IPCC, INE, ISTAT, INSEE)",
          pl: "60+ oficjalnych źródeł (Eurostat, IPCC, INE, ISTAT, INSEE)",
        },
      },
      {
        num: "06",
        label: { en: "Ship", pl: "Dostawa" },
        impl: {
          en: "Live: free tier + Founding Access €29/3 months",
          pl: "Live: free tier + Founding Access €29/3 miesiące",
        },
      },
      {
        num: "07",
        label: { en: "Measure", pl: "Pomiar" },
        impl: {
          en: "Live feeds + momentum scoring + Hidden Gem detector",
          pl: "Live feeds + momentum scoring + Hidden Gem detector",
        },
      },
      {
        num: "08",
        label: { en: "Iterate", pl: "Iteracja" },
        impl: {
          en: "AI advisor learns + Climate 2050 layer + quarterly refresh",
          pl: "AI advisor uczy się + Climate 2050 + quarterly refresh",
        },
      },
    ],
  },
];

export function Products() {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <section className="py-32 md:py-40 border-t border-black/10 dark:border-white/5">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12">

        {/* ─── FRAMING LINE — dual-track positioning lock-in (Phase 1.1).
             Sits above the section header to neutralize "why is caterelo here?"
             in 0.5 seconds — signals operator-mindset benefits BOTH tracks. ─── */}
        <Reveal>
          <p className="text-sm md:text-base font-mono text-neutral-500 dark:text-neutral-500 leading-relaxed mb-10 md:mb-12 max-w-2xl">
            {lang === "pl" ? (
              <>Operator's lab. <span className="text-neutral-700 dark:text-neutral-300">To samo r3loop, niezależnie czy lecimy retainer, czy projekt.</span></>
            ) : (
              <>Operator's lab. <span className="text-neutral-700 dark:text-neutral-300">Same r3loop whether we run a retainer or a project.</span></>
            )}
          </p>
        </Reveal>

        {/* ─── HEADER — 12-col 7+5 asymmetric (matches Brief CTA / Process pattern).
             This is a SALES SECTION: the hook is "want me to do this for you? here's the proof I can." ─── */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-20 md:mb-24">
          <Reveal className="col-span-12 lg:col-span-7">
            <div>
              <span className="text-[11px] uppercase tracking-[2px] text-[#D4FF00] font-display mb-4 block">
                {lang === "pl" ? "Produkty · r3loop w produkcji" : "Products · r3loop in production"}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
                {lang === "pl" ? (
                  <>Built by R3.<br className="hidden md:inline" />{" "}Nie tylko consulting.</>
                ) : (
                  <>Built by R3.<br className="hidden md:inline" />{" "}Not just consulting.</>
                )}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-5 lg:justify-self-end max-w-xl space-y-4">
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {lang === "pl"
                ? "r3loop nie jest teorią — jest stosowanym frameworkiem. Każdy produkt poniżej został zbudowany dokładnie tą samą metodologią, którą stosujemy u klientów."
                : "r3loop isn't theory — it's an applied framework. Every product below was built with the exact same methodology we run for clients."}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-500 font-mono leading-relaxed">
              {lang === "pl"
                ? "Skrolluj niżej żeby zobaczyć 8 kroków zmapowanych 1:1 do produkcyjnej architektury."
                : "Scroll down to see 8 steps mapped 1:1 to the production architecture."}
            </p>
          </Reveal>
        </div>

        {/* ─── PRODUCT CARDS ─── */}
        <div className="space-y-12 md:space-y-16">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <article className="border-t border-black/10 dark:border-white/10 pt-12 md:pt-16">

                {/* Product head — 12-col 8+4 (title left, status/year right) */}
                <div className="grid grid-cols-12 gap-6 md:gap-8 mb-10 md:mb-12">
                  <div className="col-span-12 md:col-span-8">
                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="font-display text-sm text-[#D4FF00]">0{i + 1}</span>
                      <span className="font-display text-xs uppercase tracking-[2px] text-neutral-500">
                        {p.category[lang]}
                      </span>
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-baseline gap-3 hover:gap-5 transition-all duration-500"
                    >
                      <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] group-hover:text-[#D4FF00] transition-colors duration-500">
                        {p.name}
                      </h3>
                      <ArrowUpRight
                        className="w-8 h-8 md:w-12 md:h-12 text-neutral-400 dark:text-neutral-600 group-hover:text-[#D4FF00] transition-all duration-500 group-hover:rotate-12 self-start mt-3 md:mt-5"
                        strokeWidth={1.5}
                      />
                    </a>
                    <p className="mt-6 md:mt-8 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 font-medium tracking-tight leading-snug max-w-2xl">
                      {p.description[lang]}
                    </p>

                    {/* IMPACT CALLOUT — the headline transformation, makes the buyer feel the value */}
                    <div className="mt-8 md:mt-10 border-l-2 border-[#D4FF00] pl-6 max-w-2xl">
                      <span className="block text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00] mb-2">
                        {lang === "pl" ? "Impact" : "Impact"}
                      </span>
                      <p className="text-base md:text-lg text-neutral-900 dark:text-white font-medium tracking-tight leading-snug">
                        {p.impact[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-4 md:justify-self-end flex flex-col gap-2 md:items-end">
                    <span className="text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00]">
                      {p.status[lang]}
                    </span>
                    <span className="text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500">
                      {p.year}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm font-mono text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
                    >
                      {p.url.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </div>

                {/* KPI BAR — concrete numbers that make "real production" believable.
                    Sits between description and r3loop mapping as the proof transition. */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/[0.06] dark:bg-white/[0.06] mb-10 md:mb-12">
                  {p.kpis.map((kpi) => (
                    <div
                      key={kpi.label.en}
                      className="bg-white dark:bg-[#0a0a0a] p-6 md:p-8 flex flex-col gap-2"
                    >
                      <span className="text-3xl md:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-none">
                        {kpi.value}
                      </span>
                      <span className="text-[10px] font-display uppercase tracking-[0.2em] text-neutral-500">
                        {kpi.label[lang]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* r3loop applied — 4-col grid of 8 steps */}
                <div className="border-t border-black/5 dark:border-white/5 pt-10 md:pt-12">
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 font-display">
                      {lang === "pl" ? "r3loop w produkcji" : "r3loop in production"}
                    </span>
                    <span className="text-[10px] uppercase tracking-[2px] text-neutral-500 font-display hidden md:block">
                      {lang === "pl" ? "8 kroków · 1:1 mapowanie" : "8 steps · 1:1 mapping"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.06] dark:bg-white/[0.06]">
                    {p.r3loop.map((step) => (
                      <div
                        key={step.num}
                        className="bg-white dark:bg-[#0a0a0a] p-6 md:p-7 flex flex-col gap-2 hover:bg-neutral-50 dark:hover:bg-[#0f0f0f] transition-colors duration-500"
                      >
                        <span className="font-display text-xs text-[#D4FF00]">{step.num}</span>
                        <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                          {step.label[lang]}
                        </span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-500 leading-snug mt-1">
                          {step.impl[lang]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ─── SALES CLOSER — turn the proof into a pitch.
             The question this section was built to answer: "can you actually deliver this for me?"
             The answer the visitor just saw: "yes, here are the 8 steps applied to a live product."
             The next step: convert. ─── */}
        <Reveal delay={0.3}>
          <div className="mt-20 md:mt-24 pt-12 md:pt-16 border-t border-black/10 dark:border-white/10">
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
              <div className="col-span-12 md:col-span-8">
                <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-6">
                  {lang === "pl" ? "Twoja kolej" : "Your turn"}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95] max-w-3xl">
                  {lang === "pl" ? (
                    <>Chcesz to samo dla swojej firmy?<br className="hidden md:inline" />{" "}Powiedz nam co budujesz.</>
                  ) : (
                    <>Want this for your business?<br className="hidden md:inline" />{" "}Tell us what you're building.</>
                  )}
                </h3>
              </div>
              <div className="col-span-12 md:col-span-4 md:justify-self-end flex flex-col gap-4 md:items-end">
                <p className="text-sm text-neutral-500 leading-relaxed max-w-xs md:text-right">
                  {lang === "pl"
                    ? "8 sekcji briefu, ~10 minut. Pierwsza odpowiedź w 48h."
                    : "8 sections, ~10 minutes. First response within 48h."}
                </p>
                <Link
                  href="/brief"
                  className="group inline-flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-neutral-900 dark:text-white hover:text-[#D4FF00] transition-colors duration-300"
                >
                  <span>{lang === "pl" ? "Zacznij brief" : "Start a brief"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            <div className="mt-10 md:mt-12 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <span className="text-xs font-display uppercase tracking-[0.25em] text-neutral-500">
                {lang === "pl"
                  ? "Więcej produktów w pipeline'ie"
                  : "More products in the pipeline"}
              </span>
              <span className="text-xs font-mono text-neutral-500">
                {lang === "pl"
                  ? "Każdy budowany tym samym systemem"
                  : "Each one built with the same system"}
              </span>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
