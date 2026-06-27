import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { Link } from "wouter";
import { useLanguage } from "@/app/context/LanguageContext";

// Product-design realizations. Case studies are in production, so each is shown
// as a "coming soon" teaser for now.
const ITEMS = [
  "Instytut Kawy",
  "Pampelle",
  "Twoje Menu",
  "Dimedical",
  "Europa Property",
  "DiscoBowl",
  "Dawid Podsiadło",
  "Geers",
];

export function ProductDesign() {
  const { language } = useLanguage();
  const pl = language === "pl";

  return (
    <PageTransition className="pt-20 min-h-screen">
      {/* Header */}
      <div className="py-32 px-8 md:px-12 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="max-w-4xl">
              <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-8">
                {pl ? "Wybrane realizacje" : "Selected work"}
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white mb-5 leading-[0.9]">
                Product design.
              </h1>
              <p className="font-display text-2xl md:text-4xl tracking-tight text-[#D4FF00] mb-12">
                Brand · CX · UI · UX
              </p>
              <div className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl">
                <p>
                  {pl
                    ? "Customer experience, user experience, interfejs - i systemy komponentów, które za nimi stoją. Dla własnych produktów i dla klientów: SaaS, platformy AI, e-commerce."
                    : "Customer experience, user experience, interface - and the component systems behind them. For our own products and for clients: SaaS, AI platforms, e-commerce."}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Grid - coming-soon teasers */}
      <div className="px-8 md:px-12 py-24 md:py-32 max-w-[1800px] mx-auto">
        <Reveal>
          <p className="text-sm text-neutral-500 mb-12 max-w-xl">
            {pl
              ? "Wybrane realizacje - case studies w przygotowaniu."
              : "Selected realizations - case studies in production."}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ITEMS.map((name, i) => (
            <Reveal key={name} delay={(i % 3) * 0.08} width="100%">
              <div className="group relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-900 to-black flex flex-col items-center justify-center text-center px-6 select-none transition-opacity duration-500 opacity-90 hover:opacity-100">
                <span className="text-2xl md:text-3xl font-bold tracking-tighter text-white/90 mb-3">
                  {name}
                </span>
                <span className="text-[10px] font-display uppercase tracking-[0.25em] text-neutral-500 mb-4">
                  Brand · CX · UI · UX
                </span>
                <span className="inline-flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.25em] text-[#D4FF00]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                  {pl ? "Wkrótce" : "Coming soon"}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Cross-link CTA */}
        <Reveal>
          <div className="mt-[80px] border-t border-black/10 dark:border-white/10 pt-[80px] pb-[40px] flex flex-col items-center justify-center text-center gap-8 relative z-50 pointer-events-auto">
            <span className="text-xs font-display uppercase tracking-widest text-neutral-500">
              {pl ? "Masz produkt do zbudowania?" : "Got a product to build?"}
            </span>
            <Link href="/brief" className="group relative inline-block cursor-pointer pointer-events-auto">
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black dark:text-white transition-colors duration-300 group-hover:text-[#D4FF00]">
                {pl ? "Zacznijmy projekt" : "Start a project"}
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}
