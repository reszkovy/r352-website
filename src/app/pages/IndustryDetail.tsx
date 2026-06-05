import { Link, useRoute } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { industries, type IndustryContent } from "@/app/data/industries";
import { ArrowRight } from "lucide-react";

/**
 * IndustryDetail — shared template for every /industries/:slug page.
 *
 * One file, four routes. Content lives in `src/app/data/industries.ts`.
 * Adding a fifth segment is a data edit, not a component change.
 *
 * Page sections (top → bottom):
 *  1. Hero          — eyebrow + h1 + subcopy + dual CTA
 *  2. Symptoms      — "Common symptoms" / "Typowe symptomy"
 *  3. r352 Approach — 8-step r3loop, tightly summarized
 *  4. Proof         — client, context, outcome stat, link to case study
 *  5. What you get  — Diagnostic deliverables for this segment
 *  6. CTA           — large repeat of primary CTA + softer fallbacks
 */

// ─── r3loop step content (shared across all industries) ──────────────
// Why inline here and not in /data: this is the SAME r3loop for every
// segment, lightly adapted by the segment slug at render time. Keeping
// it next to the renderer makes the prose easier to maintain in context.
const R3LOOP_STEPS: { num: string; key: string; en: { title: string; body: string }; pl: { title: string; body: string } }[] = [
  {
    num: "01",
    key: "diagnose",
    en: { title: "Diagnose", body: "Audit the current state — workflow, briefs, approvals, capacity. Name what's broken before fixing anything." },
    pl: { title: "Diagnose", body: "Audyt obecnego stanu — workflow, briefy, akceptacje, capacity. Nazwij co nie działa, zanim cokolwiek naprawisz." },
  },
  {
    num: "02",
    key: "map",
    en: { title: "Map", body: "Map every campaign or launch path end-to-end. Who briefs, who approves, where the asset travels, where it stalls." },
    pl: { title: "Map", body: "Zmapuj każdą ścieżkę kampanii lub launchu end-to-end. Kto brief'uje, kto akceptuje, gdzie asset wędruje, gdzie staje." },
  },
  {
    num: "03",
    key: "standardize",
    en: { title: "Standardize", body: "Set the standards once. Brand rules, brief templates, naming conventions, file structure, adaptation rules." },
    pl: { title: "Standardize", body: "Ustaw standardy raz. Reguły marki, templaty briefów, konwencje nazewnictwa, struktura plików, reguły adaptacji." },
  },
  {
    num: "04",
    key: "build",
    en: { title: "Build", body: "Build the toolkits, templates, and components that let local teams move fast without breaking brand consistency." },
    pl: { title: "Build", body: "Zbuduj toolkity, templaty i komponenty, które pozwalają lokalnym zespołom poruszać się szybko bez psucia spójności marki." },
  },
  {
    num: "05",
    key: "govern",
    en: { title: "Govern", body: "Install approval gates — Master / Variant / Pre-production. Each gate has a named owner and a defined SLA." },
    pl: { title: "Govern", body: "Wprowadź bramki akceptacji — Master / Variant / Pre-production. Każda bramka ma imiennego ownera i zdefiniowane SLA." },
  },
  {
    num: "06",
    key: "ship",
    en: { title: "Ship", body: "Run the first campaigns or launches through the new system. Weekly cadence, Friday delivery packs, no heroic launches." },
    pl: { title: "Ship", body: "Przepuść pierwsze kampanie lub launche przez nowy system. Tygodniowy rytm, piątkowe delivery packi, zero heroic launchy." },
  },
  {
    num: "07",
    key: "measure",
    en: { title: "Measure", body: "Track decision velocity, brief throughput, consistency score, rework rate. Numbers, not opinions." },
    pl: { title: "Measure", body: "Mierz decision velocity, brief throughput, consistency score, rework rate. Liczby, nie opinie." },
  },
  {
    num: "08",
    key: "iterate",
    en: { title: "Iterate", body: "Quarterly review. Cut what doesn't work, scale what does, extend the system into the next bottleneck." },
    pl: { title: "Iterate", body: "Quarterly review. Wycinaj co nie działa, skaluj co działa, rozciągaj system na kolejny bottleneck." },
  },
];

// ─── 404 fallback when slug doesn't match any industry ───────────────
function IndustryNotFound() {
  const { language } = useLanguage();
  return (
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      <section className="pt-32 md:pt-40 max-w-2xl">
        <Reveal>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-6">
            {language === "pl" ? "Branża nie znaleziona" : "Industry not found"}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-8">
            {language === "pl"
              ? "Tej branży nie obsługujemy stroną."
              : "We don't have a page for that industry."}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
            {language === "pl"
              ? "Wróć do listy branż lub napisz na hello@r352.com — pewnie i tak rozmawialiśmy o czymś podobnym."
              : "Head back to the industries list or write hello@r352.com — chances are we've worked with something close."}
          </p>
          <Link
            href="/industries"
            className="inline-flex items-center gap-3 bg-[#D4FF00] text-black px-7 py-4 font-display uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300"
          >
            <span>{language === "pl" ? "Wszystkie branże" : "All industries"}</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}

export function IndustryDetail() {
  const { language } = useLanguage();
  // wouter binds :slug here. Default to empty so the not-found path triggers
  // cleanly if someone hits /industries/ with no trailing slug.
  const [, params] = useRoute<{ slug: string }>("/industries/:slug");
  const slug = params?.slug ?? "";

  const content: IndustryContent | undefined = industries.find((i) => i.slug === slug);
  if (!content) return <IndustryNotFound />;

  // Convenience accessors — language picker repeated all over the JSX otherwise.
  const eyebrow = content.eyebrow[language];
  const h1 = content.h1[language];
  const subcopy = content.subcopy[language];
  const ctaPrimary = content.ctaPrimary[language];
  const proofContext = content.proof.context[language];
  const proofOutcome = content.proof.outcome[language];
  const secondaryLabel = content.proof.secondaryLabel[language];

  return (
    <PageTransition className="pb-32 px-8 md:px-12 max-w-[1400px] mx-auto min-h-screen">
      {/* ─── 1 · HERO ──────────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 mb-24 md:mb-32 max-w-4xl">
        <Reveal>
          <span className="block text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-6">
            {eyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-8 [text-wrap:balance]">
            {h1}
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty] mb-10 max-w-3xl">
            {subcopy}
          </p>

          {/* Dual CTA — primary (lime/black) + secondary (outlined). */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Link
              href={content.ctaHref}
              className="group inline-flex items-center justify-center gap-3 bg-[#D4FF00] text-black px-7 py-4 font-display uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300"
            >
              <span>{ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
            {content.proof.caseStudyHref && (
              <Link
                href={content.proof.caseStudyHref}
                className="group inline-flex items-center justify-center gap-3 border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white px-7 py-4 font-display uppercase tracking-[0.2em] text-xs hover:border-[#D4FF00] hover:text-[#D4FF00] transition-colors duration-300"
              >
                <span>{secondaryLabel}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            )}
          </div>
        </Reveal>
      </section>

      {/* ─── 2 · COMMON SYMPTOMS ───────────────────────────────────── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-20 md:pt-24 mb-24 md:mb-32">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
            <div className="col-span-12 md:col-span-4">
              <span className="font-display text-xs text-[#D4FF00] tracking-[0.2em] mb-3 block">
                {language === "pl" ? "01 · Sygnały" : "01 · Signals"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1] [text-wrap:balance]">
                {language === "pl" ? "Typowe symptomy" : "Common symptoms"}
              </h2>
            </div>
            <p className="col-span-12 md:col-span-8 md:pt-2 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {language === "pl"
                ? "Jeśli kiwasz głową przy więcej niż dwóch — to nie problem talentu. To problem systemu."
                : "If you're nodding at more than two of these, it's not a talent problem. It's a system problem."}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {content.symptoms.map((s, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]"
              >
                <span className="w-1.5 h-1.5 bg-[#D4FF00] mt-[11px] shrink-0 rounded-none" />
                <span>{s[language]}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ─── 3 · HOW r352 SOLVES THIS (r3loop summary) ─────────────── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-20 md:pt-24 mb-24 md:mb-32">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
            <div className="col-span-12 md:col-span-4">
              <span className="font-display text-xs text-[#D4FF00] tracking-[0.2em] mb-3 block">
                {language === "pl" ? "02 · Metoda" : "02 · Method"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1] [text-wrap:balance]">
                {language === "pl" ? "Jak r352 to rozwiązuje" : "How r352 solves this"}
              </h2>
            </div>
            <p className="col-span-12 md:col-span-8 md:pt-2 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {language === "pl"
                ? "r3loop — nasza 8-stopniowa metodologia. Ta sama sekwencja dla każdego klienta, głębokość kroków skalowana do wielkości engagementu."
                : "r3loop — our 8-step methodology. Same sequence for every client, depth of each step scales with the engagement."}
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 border-t border-neutral-200 dark:border-white/10 pt-10">
            {R3LOOP_STEPS.map((step, i) => {
              const step_t = step[language];
              return (
                <Reveal key={step.key} delay={i * 0.03}>
                  <li className="flex items-start gap-5">
                    <span className="font-display text-sm text-[#D4FF00] tracking-[0.2em] shrink-0 mt-1">
                      {step.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold tracking-tight text-black dark:text-white mb-2 leading-tight">
                        {step_t.title}
                      </h3>
                      <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                        {step_t.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={0.2}>
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-white/10">
              <Link
                href="/process"
                className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
              >
                <span className="w-6 h-px bg-neutral-400 dark:bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-300" />
                <span>{language === "pl" ? "Pełen deep-dive w r3loop" : "Full r3loop deep-dive"}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </Reveal>
      </section>

      {/* ─── 4 · PROOF ─────────────────────────────────────────────── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-20 md:pt-24 mb-24 md:mb-32">
        <Reveal>
          <span className="font-display text-xs text-[#D4FF00] tracking-[0.2em] mb-3 block">
            {language === "pl" ? "03 · Dowód" : "03 · Proof"}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1] mb-12 [text-wrap:balance]">
            {language === "pl" ? "Zrobione w praktyce" : "Done in practice"}
          </h2>

          <div className="border border-neutral-200 dark:border-white/10 p-8 md:p-12 lg:p-16 bg-neutral-50/50 dark:bg-white/[0.02]">
            <div className="grid grid-cols-12 gap-6 md:gap-10">
              <div className="col-span-12 md:col-span-5">
                <span className="text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 mb-3 block">
                  {language === "pl" ? "Klient" : "Client"}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1] [text-wrap:balance]">
                  {content.proof.clientName}
                </h3>
                <p className="mt-5 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
                  {proofContext}
                </p>
              </div>
              <div className="col-span-12 md:col-span-7 md:border-l md:border-neutral-200 md:dark:border-white/10 md:pl-10">
                <span className="text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00] mb-3 block">
                  {language === "pl" ? "Wynik" : "Outcome"}
                </span>
                <p className="text-xl md:text-2xl lg:text-3xl text-black dark:text-white font-normal tracking-tight leading-[1.2] [text-wrap:balance]">
                  {proofOutcome}
                </p>
                {content.proof.caseStudyHref && (
                  <Link
                    href={content.proof.caseStudyHref}
                    className="group mt-8 inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-700 dark:text-neutral-300 hover:text-[#D4FF00] dark:hover:text-[#D4FF00] transition-colors duration-300"
                  >
                    <span>{secondaryLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 5 · WHAT THE DIAGNOSTIC DELIVERS ──────────────────────── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-20 md:pt-24 mb-24 md:mb-32">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-14">
            <div className="col-span-12 md:col-span-4">
              <span className="font-display text-xs text-[#D4FF00] tracking-[0.2em] mb-3 block">
                {language === "pl" ? "04 · Deliverables" : "04 · Deliverables"}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-black dark:text-white leading-[1] [text-wrap:balance]">
                {language === "pl" ? "Co dostarcza Diagnostic" : "What the Diagnostic delivers"}
              </h2>
            </div>
            <p className="col-span-12 md:col-span-8 md:pt-2 text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {language === "pl"
                ? "5-dniowy fixed-scope audyt operacyjny — €2k, jednostronicowa diagnoza, 60-day money-back guarantee jeśli rekomendacje nie są actionable."
                : "5-day fixed-scope operational audit — €2k, one-page written diagnosis, 60-day money-back guarantee if recommendations aren't actionable."}
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
            {content.whatYouGet.map((w, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]"
              >
                <span className="w-1.5 h-1.5 bg-[#D4FF00] mt-[11px] shrink-0 rounded-none" />
                <span>{w[language]}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ─── 6 · CTA ────────────────────────────────────────────────── */}
      <section className="border-t border-neutral-200 dark:border-white/10 pt-24 md:pt-28">
        <Reveal>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-6">
              {language === "pl" ? "Następny krok" : "Next step"}
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-10 [text-wrap:balance]">
              {ctaPrimary}.
            </h2>

            <Link
              href={content.ctaHref}
              className="group inline-flex items-center justify-center gap-3 bg-[#D4FF00] text-black px-8 py-5 font-display uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300 mb-10"
            >
              <span>{language === "pl" ? "Rozpocznij brief" : "Start the brief"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-xs font-display uppercase tracking-[0.2em] text-neutral-500">
              <Link
                href="/contact"
                className="hover:text-[#D4FF00] transition-colors duration-300"
              >
                {language === "pl" ? "Lub umów 30-min call" : "Or book a 30-min call"}
              </Link>
              <span className="hidden sm:inline text-neutral-400 dark:text-neutral-700">·</span>
              <a
                href="mailto:hello@r352.com"
                className="hover:text-[#D4FF00] transition-colors duration-300"
              >
                {language === "pl" ? "Lub napisz hello@r352.com" : "Or email hello@r352.com"}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
