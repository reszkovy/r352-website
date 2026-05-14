import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { R3LoopBadge } from "@/app/components/ui/R3LoopBadge";

/**
 * ServicesList — unified system section on Home.
 * Combines: 4-layer architecture (Strategy → Operating System → Design & Production → Build & Optimize)
 *           with an 8-step process preview that bridges to /process for the deep dive.
 * Two CTAs at the bottom: /process (deep dive) + /services (catalog).
 */

type Lang = "en" | "pl";

interface Pillar {
  num: string;
  title: { en: string; pl: string };
  scope: { en: string; pl: string };
  sub: { en: string; pl: string };
  optional?: boolean;
}

interface ProcessStep {
  num: string;
  en: string;
  pl: string;
}

const PILLARS: Pillar[] = [
  {
    num: "01",
    title: { en: "Strategy", pl: "Strategia" },
    scope: { en: "Brand · Operating · AI", pl: "Marka · Operacje · AI" },
    sub: {
      en: "Decide what to ship — before building anything.",
      pl: "Decydujemy co dostarczyć — zanim cokolwiek zaczniemy budować.",
    },
  },
  {
    num: "02",
    title: { en: "Operating System", pl: "Operating System" },
    scope: { en: "Intake · QA · Governance · Workflow", pl: "Intake · QA · Governance · Workflow" },
    sub: {
      en: "Make quality and speed predictable — at multi-location scale.",
      pl: "Jakość i szybkość przewidywalne — w skali wielu lokalizacji.",
    },
  },
  {
    num: "03",
    title: { en: "Design & Production", pl: "Design & Production" },
    scope: { en: "Product UX · Campaigns · Motion · AD", pl: "Product UX · Kampanie · Motion · AD" },
    sub: {
      en: "Ship the assets that move the business — without rework loops.",
      pl: "Dostarczamy assety, które ruszają biznes — bez pętli poprawek.",
    },
  },
  {
    num: "04",
    title: { en: "Build & Optimize", pl: "Build & Optimize" },
    scope: { en: "Implementation · CMS · Performance · Handoff", pl: "Wdrożenia · CMS · Performance · Handoff" },
    sub: {
      en: "Optional engineering layer — where it moves the metric.",
      pl: "Opcjonalna warstwa engineeringu — tam gdzie rusza metrykę.",
    },
    optional: true,
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  { num: "01", en: "Diagnose", pl: "Diagnoza" },
  { num: "02", en: "Map", pl: "Mapowanie" },
  { num: "03", en: "Standardize", pl: "Standaryzacja" },
  { num: "04", en: "Build", pl: "Budowa" },
  { num: "05", en: "Govern", pl: "Governance" },
  { num: "06", en: "Ship", pl: "Dostawa" },
  { num: "07", en: "Measure", pl: "Pomiar" },
  { num: "08", en: "Iterate", pl: "Iteracja" },
];

export function ServicesList() {
  const { language } = useLanguage();
  const lang = language as Lang;

  return (
    <section className="py-32 md:py-40 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-8 md:px-12">

        {/* ─── HEADER — 12-col 5+7 asymmetric (title left, copy right). col-span on Reveal (direct grid child) ─── */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-20 md:mb-24">
          <Reveal className="col-span-12 lg:col-span-5">
            <div>
              <span className="text-[11px] uppercase tracking-[2px] text-[#D4FF00] font-display mb-4 block">
                {lang === "pl" ? "System" : "System"}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.05]">
                {lang === "pl" ? "Jeden system. Cztery warstwy." : "One system. Four layers."}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 lg:col-span-7">
            <div className="flex flex-col gap-6">
              <p className="text-xl md:text-2xl text-neutral-300 font-medium tracking-tight leading-snug max-w-2xl">
                {lang === "pl"
                  ? "Strategia decyduje co dostarczamy. Operating system robi pracę przewidywalną. Design & Production dostarcza assety. Build & Optimize obsługuje wdrożenie."
                  : "Strategy decides what we ship. The operating system makes work predictable. Design & production delivers the assets. Build & optimize handles implementation."}
              </p>
              <p className="text-sm text-neutral-500 font-mono leading-relaxed">
                {lang === "pl"
                  ? "Wspierane przez r3loop — 8-krokową metodologię operacyjną. Wzmocnione AI-first egzekucją."
                  : "Powered by r3loop — our 8-step operating methodology. Elevated by AI-first execution."}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ─── 4 PILLARS GRID — 12-col, each col-span-3 on lg+ (3+3+3+3); gap-px creates hair-line dividers ─── */}
        <div className="grid grid-cols-12 gap-px bg-white/[0.06] mb-24 md:mb-28">
          {PILLARS.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08} className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className="p-8 md:p-10 h-full flex flex-col gap-4 group bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors duration-500">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-sm text-[#D4FF00]">{p.num}</span>
                  {p.optional && (
                    <span className="text-[10px] uppercase tracking-widest bg-white/[0.06] text-neutral-400 px-2 py-1 font-display">
                      {lang === "pl" ? "Opcjonalne" : "Optional"}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-[28px] font-medium tracking-tight text-white leading-tight group-hover:text-[#D4FF00] transition-colors duration-500">
                  {p.title[lang]}
                </h3>
                <p className="text-sm text-neutral-400 font-mono tracking-tight leading-relaxed">
                  {p.scope[lang]}
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed mt-auto pt-4">
                  {p.sub[lang]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ─── 8-STEP PROCESS STRIP ─── */}
        <Reveal>
          <div className="border-t border-white/10 pt-12 md:pt-16 mb-16">
            {/* 8-step strip header — 12-col 8+4 asymmetric */}
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mb-12">
              <div className="col-span-12 md:col-span-8">
                <div className="flex items-center gap-3 mb-3">
                  <R3LoopBadge size="sm" />
                  <span className="text-[11px] uppercase tracking-[2px] text-neutral-500 font-display">
                    {lang === "pl" ? "8 kroków" : "8 steps"}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white leading-tight [text-wrap:balance]">
                  {lang === "pl" ? (
                    <>
                      Jak system przepływa w praktyce
                      <br className="hidden md:inline" />
                      {" "}— od diagnozy po iterację.
                    </>
                  ) : (
                    <>
                      How the system flows in practice
                      <br className="hidden md:inline" />
                      {" "}— from diagnosis to iteration.
                    </>
                  )}
                </h3>
              </div>
              <p className="col-span-12 md:col-span-4 text-sm text-neutral-500 leading-relaxed font-mono [text-wrap:balance]">
                {lang === "pl" ? (
                  <>
                    Każdy krok ma cel, deliverable i metrykę.
                    <br className="hidden md:inline" />
                    {" "}Nie pętle poprawek — checkpointy.
                  </>
                ) : (
                  <>
                    Each step has a goal, a deliverable and a metric.
                    <br className="hidden md:inline" />
                    {" "}Not revision loops — checkpoints.
                  </>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-4">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.num} delay={0.05 + i * 0.04}>
                  <Link href="/process" className="flex flex-col gap-2 group cursor-pointer">
                    <span className="font-display text-xs text-[#D4FF00]">{step.num}</span>
                    <span className="text-base font-bold tracking-tight text-white leading-tight group-hover:text-[#D4FF00] transition-colors duration-300">
                      {step[lang]}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ─── DUAL CTAs ─── */}
        <Reveal delay={0.4}>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <Link
              href="/process"
              className="group/link inline-flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-white hover:text-[#D4FF00] transition-colors duration-300"
            >
              <span>{lang === "pl" ? "Poznaj r3loop" : "Explore r3loop"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={1.5} />
            </Link>
            <Link
              href="/services"
              className="group/link inline-flex items-center gap-2 text-base md:text-lg font-bold tracking-tight text-white hover:text-[#D4FF00] transition-colors duration-300"
            >
              <span>{lang === "pl" ? "Zobacz produkty i modele współpracy" : "See products and engagement models"}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
