import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";

/**
 * WhyBreaksNow - educational hook that plants the category problem.
 *
 * Most multi-location operators don't know "design ops as a system" is a
 * category. They know they have chaos at scale but don't connect it to a
 * named problem with a named solution. This section bridges that gap:
 *
 *   5 locations  → handled by taste + effort
 *   50 locations → needs standards
 *   300+ locations → needs an operating system
 *
 * Designed to sit on the homepage right after hero, and on /process as
 * educational context before methodology. Operator tone, no fluff.
 */
export function WhyBreaksNow() {
  const { language } = useLanguage();

  const tiers = [
    {
      scale: language === "pl" ? "5 lokalizacji" : "5 locations",
      sub: language === "pl" ? "Smak + wysiłek" : "Taste + effort",
      body: language === "pl"
        ? "Pojedyncza osoba może utrzymać jakość. Wszystko żyje w jej głowie - briefy, decyzje, standardy. Działa bo skala jest mała."
        : "One person can hold quality. Briefs, decisions, standards all live in their head. It works because scale is small.",
    },
    {
      scale: language === "pl" ? "50 lokalizacji" : "50 locations",
      sub: language === "pl" ? "Standardy" : "Standards",
      body: language === "pl"
        ? "Smak przestaje skalować. Bez wspólnego brief'u i jasnych zasad każda lokalizacja produkuje inaczej. Bottleneckiem staje się decision velocity, nie talent."
        : "Taste stops scaling. Without a shared brief and clear rules every location produces differently. The bottleneck becomes decision velocity, not talent.",
    },
    {
      scale: language === "pl" ? "300+ lokalizacji" : "300+ locations",
      sub: language === "pl" ? "Operating system" : "Operating system",
      body: language === "pl"
        ? "Standardy bez systemu się rozjeżdżają. Potrzebny jest formal intake, ownership per asset type, bramki akceptacji i pomiar. To nie jest większa agencja - to operating system."
        : "Standards without a system drift. You need formal intake, ownership per asset type, approval gates, and measurement. That's not a bigger agency - that's an operating system.",
    },
  ];

  return (
    <section className="px-8 md:px-12 py-24 md:py-32 max-w-[1800px] mx-auto border-t border-neutral-200 dark:border-white/10">
      <Reveal>
        <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16 items-end">
          <div className="col-span-12 md:col-span-7">
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[#D4FF00] font-display mb-4">
              {language === "pl" ? "Dlaczego to się wywala teraz" : "Why this breaks now"}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.95]">
              {language === "pl" ? (
                <>Każda skala<br className="hidden md:block" /> ma inny problem.</>
              ) : (
                <>Each scale<br className="hidden md:block" /> breaks differently.</>
              )}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5">
            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
              {language === "pl"
                ? "Większość organizacji odkrywa potrzebę design ops dopiero gdy poprzedni model już się wywalił. Tu jest moment w którym to się dzieje."
                : "Most organizations discover the need for design ops only after the previous model already broke. Here's the moment when it happens."}
            </p>
          </div>
        </div>
      </Reveal>

      {/* 3 tiers - progressive scale breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-neutral-200 dark:border-white/10 pt-12">
        {tiers.map((tier, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="border-l-2 border-[#D4FF00] pl-6 md:pl-8 h-full">
              <div className="font-display text-xs text-[#D4FF00] tracking-[0.2em] uppercase mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-2 leading-tight">
                {tier.scale}
              </h3>
              <div className="text-sm md:text-base font-display uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400 mb-5">
                {tier.sub}
              </div>
              <p className="text-base md:text-[17px] text-neutral-700 dark:text-neutral-300 leading-relaxed [text-wrap:pretty]">
                {tier.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom anchor - softly explains where r352 lives */}
      <Reveal delay={0.3}>
        <div className="mt-16 md:mt-20 pt-10 border-t border-neutral-200 dark:border-white/10 max-w-3xl">
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed [text-wrap:pretty]">
            {language === "pl" ? (
              <>
                r352 zaczyna pracę dokładnie w tym przejściu - gdy organizacja przekracza próg,
                w którym <strong className="text-neutral-900 dark:text-white">smak i wysiłek już nie wystarczają</strong>,
                a brak systemu zaczyna kosztować przewidywalnie więcej niż jego budowa.
              </>
            ) : (
              <>
                r352 starts work exactly at that transition - when an organization crosses
                the threshold where <strong className="text-neutral-900 dark:text-white">taste and effort no longer scale</strong>,
                and the absence of a system starts costing predictably more than building one.
              </>
            )}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
