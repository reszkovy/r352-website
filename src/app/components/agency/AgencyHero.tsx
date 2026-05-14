import { Reveal } from "@/app/components/ui/Reveal";
import { CinematicText } from "@/app/components/ui/CinematicText";
import { useLocation } from "wouter";
import { useLanguage } from "@/app/context/LanguageContext";
import { AnimeGrid } from "@/app/components/ui/AnimeGrid";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { ElasticLine } from "@/app/components/ui/ElasticLine";

export function AgencyHero() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background Elements - Full Width */}
      <AnimeGrid />
      
      {/* Content Container - Centered and Max Width */}
      <div className="flex-grow flex flex-col justify-end w-full max-w-[1800px] mx-auto px-8 md:px-12 pb-32 pt-40 relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="hidden md:block">
            <CinematicText
              text={t("hero.title")}
              as="h1"
              className="type-h1 mb-16 md:mb-24 text-balance max-w-[95%] cursor-default"
              delay={0.1}
              glowEffect={true}
            />
          </div>
          <div className="block md:hidden" aria-hidden="true">
            <CinematicText
              text={t("hero.title_mobile")}
              as="div"
              className="type-h1 mb-16 md:mb-24 text-balance max-w-[95%] cursor-default"
              delay={0.1}
              glowEffect={true}
            />
          </div>
          
          <Reveal delay={0.6}>
            <div className="relative w-full">
              {/* Elastic line replaces the static border-t */}
              <ElasticLine className="absolute -top-[30px] left-0 w-full h-[60px]" />
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 md:gap-12 pt-12 md:pt-16">
                <div className="w-full max-w-3xl">
                <p className="type-body-lg leading-relaxed text-balance text-neutral-400" dangerouslySetInnerHTML={{ __html: t("hero.description_title") }} />
              </div>
              
              <div className="flex flex-col gap-8 md:items-end shrink-0">
                <div className="flex flex-col sm:flex-row gap-6">
                   {/* PRIMARY CTA — Brief (promoted from /contact) */}
                   <MagneticButton
                     onClick={() => setLocation("/brief")}
                     className="bg-[#D4FF00] text-black border-none hover:bg-[#D4FF00]/90 rounded-none"
                     glowColor="rgba(0, 0, 0, 0.15)"
                   >
                     <span className="invisible text-lg font-display uppercase tracking-widest absolute">Start a brief</span>
                     <span className="text-lg font-display uppercase tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out">
                       {language === "pl" ? "Wypełnij brief" : "Start a brief"}
                     </span>
                   </MagneticButton>

                   {/* SECONDARY CTA — direct Calendly book (no extra hop via /contact) */}
                   <MagneticButton
                     onClick={() => window.open("https://calendly.com/p-reszkovy/30min", "_blank", "noopener,noreferrer")}
                     className="explore-work-btn bg-white/[0.04] text-white border-transparent hover:bg-white/[0.08] rounded-none"
                     glowColor="rgba(212, 255, 0, 0.2)"
                   >
                     <span className="invisible text-lg font-display uppercase tracking-[0.25em] absolute">{t("hero.cta_work")}</span>
                     <span className="text-lg font-display uppercase tracking-wide group-hover:tracking-[0.25em] transition-all duration-500 ease-out">{t("hero.cta_work")}</span>
                   </MagneticButton>
                </div>

                {/* Secondary text link — direct mail for warm leads */}
                <a
                  href="mailto:hello@r352.com?subject=r352%20—%20hello"
                  className="self-start md:self-end group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                >
                  <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{language === "pl" ? "Albo napisz bezpośrednio" : "Or write directly"} · hello@r352.com</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-500">→</span>
                </a>
                
                <div className="flex flex-col gap-1 text-sm text-neutral-500 font-mono tracking-tight md:text-right">
                   <p>{t("hero.micro_1")}</p>
                   <p>{t("hero.micro_2")}</p>
                   <p>{t("hero.micro_3")}</p>
                </div>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
