import { useLanguage } from "@/app/context/LanguageContext";

/**
 * OfferMarquee - an auto-scrolling horizontal band of disciplines, showing the
 * breadth one accountable team covers white-label (inspired by growmodo's slider,
 * but typographic and capability-led, not a named-talent/commodity feed). Pauses
 * on hover; edges fade into the page. CSS-keyframe driven, self-contained.
 */
const DISCIPLINES: { en: string; pl: string }[] = [
  { en: "Brand strategy", pl: "Strategia marki" },
  { en: "Brand identity & systems", pl: "Identyfikacja i systemy" },
  { en: "Campaign & key visuals", pl: "Kampanie i key visuals" },
  { en: "Always-on content", pl: "Content always-on" },
  { en: "Web & landing", pl: "Web i landing" },
  { en: "Product UX/UI", pl: "Product UX/UI" },
  { en: "Motion & video", pl: "Motion i wideo" },
  { en: "AI development", pl: "Rozwój AI" },
  { en: "Design systems", pl: "Design systemy" },
  { en: "Creative direction", pl: "Kierunek kreatywny" },
];

export function OfferMarquee() {
  const { language } = useLanguage();
  const pl = language === "pl";
  // Duplicate the set so translateX(-50%) loops seamlessly.
  const row = [...DISCIPLINES, ...DISCIPLINES];

  return (
    <div
      className="group relative w-full overflow-hidden py-1"
      style={{
        // Fade the content itself to transparent at the edges (CSS mask) instead of
        // painting a bg-coloured gradient on top - so it blends on ANY background
        // (grain/theme) with no visible cut.
        maskImage:
          "linear-gradient(to right, transparent 0, black 64px, black calc(100% - 64px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 64px, black calc(100% - 64px), transparent 100%)",
      }}
    >
      <style>{`
        @keyframes r352OfferScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .r352-offer-track { animation: r352OfferScroll 48s linear infinite; will-change: transform; }
        .r352-offer-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .r352-offer-track { animation: none; } }
      `}</style>

      <div className="r352-offer-track flex w-max gap-3 md:gap-4">
        {row.map((d, i) => (
          <div
            key={i}
            aria-hidden={i >= DISCIPLINES.length ? true : undefined}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/12 px-5 py-2.5 md:px-6 md:py-3 hover:border-[#D4FF00]/50 transition-colors duration-300"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4FF00]" />
            <span className="whitespace-nowrap font-display text-sm md:text-base uppercase tracking-wide text-white">
              {pl ? d.pl : d.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
