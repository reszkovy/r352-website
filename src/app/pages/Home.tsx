import { AgencyHero } from "@/app/components/agency/AgencyHero";
import { ClientLogos } from "@/app/components/agency/ClientLogos";
import { SelectedWork } from "@/app/components/agency/SelectedWork";
import { ServicesList } from "@/app/components/agency/ServicesList";
import { HomePrinciples } from "@/app/components/agency/HomePrinciples";
import { EngagementModels } from "@/app/components/agency/EngagementModels";
import { References } from "@/app/components/agency/References";
import { Link, useLocation } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { CinematicText } from "@/app/components/ui/CinematicText";
import { useLanguage } from "@/app/context/LanguageContext";
import { useEffect, useRef } from "react";
import { useInView, motion, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { Marquee } from "@/app/components/ui/Marquee";

import { useTheme } from "@/app/context/ThemeContext";
import presentationImg from "../../imports/Background.webp";

export function Home() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  const [, setLocation] = useLocation();
  const engagementRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start end", "end start"]
  });
  
  // Przesunięcie od -15% do +15% z zapasem na skali
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Top margin: activate when section is ~1000px into viewport
  // Bottom margin: deactivate early (40% from bottom) so lime exits well before References
  const isInView = useInView(engagementRef, { margin: "-1000px 0px -40% 0px" });

  useEffect(() => {
    const body = document.body;
    body.classList.add("theme-transitioning");

    // In 'dark' theme mode (default): starts dark, becomes lime on scroll (isInView = true).
    // In 'light' theme mode: starts lime, becomes dark on scroll (isInView = true).
    const shouldBeLime = theme === 'dark' ? isInView : !isInView;

    if (shouldBeLime) {
      body.classList.add("lime-theme");
    } else {
      body.classList.remove("lime-theme");
    }

    // Keep transitioning class longer for smooth exit animation
    const timer = setTimeout(() => {
      body.classList.remove("theme-transitioning");
    }, 1200);

    return () => clearTimeout(timer);
  }, [isInView, theme]);

  // Rest of cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove("lime-theme");
      document.body.classList.remove("theme-transitioning");
    };
  }, []);

  return (
    <PageTransition className="">
      <AgencyHero />
      <ClientLogos />
      
      {/* Philosophy Teaser — Process master-head pattern: H1 left, caption + CTA right */}
      <section className="pt-32 pb-32 md:pt-40 md:pb-40 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
              {/* LEFT: title */}
              <CinematicText
                text={t("philosophy.teaser.title")}
                className="text-5xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95] text-white"
              />

              {/* RIGHT: caption + CTA stacked, right-aligned column */}
              <div className="max-w-xl md:justify-self-end space-y-8">
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed whitespace-pre-line">
                  {t("philosophy.teaser.description")}
                </p>
                <MagneticButton
                  onClick={() => setLocation("/philosophy")}
                  className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black w-full max-w-[280px] sm:max-w-none sm:w-auto shrink-0"
                  glowColor="rgba(255, 255, 255, 0.2)"
                >
                  <span className="invisible text-xs font-display uppercase tracking-widest absolute">{t("philosophy.teaser.cta")}</span>
                  <span className="text-xs font-display uppercase tracking-widest group-hover:tracking-[0.25em] transition-all duration-500 ease-out">{t("philosophy.teaser.cta")}</span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SelectedWork />

      <Marquee />

      <ServicesList />

      <HomePrinciples />

      <div ref={engagementRef}>
        <EngagementModels />
      </div>

      {/* ─── Brief CTA — universal briefing entry, between engagement & parallax ─── */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-end">
              <div>
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-6">
                  {language === "pl" ? "Narzędzie briefingowe" : "Briefing tool"}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[0.95]">
                  {language === "pl"
                    ? "Każdy projekt zaczyna się od briefu."
                    : "Every project starts with a brief."}
                </h2>
              </div>
              <div className="md:justify-self-end max-w-md space-y-6">
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                  {language === "pl"
                    ? "8 sekcji, ~26 pytań, ~10 minut. Pierwsza odpowiedź w 48 godzin — model współpracy, kierunek zakresu, następny krok."
                    : "8 sections, ~26 questions, ~10 minutes. First response within 48 hours — engagement model, scope direction, next step."}
                </p>
                <MagneticButton
                  onClick={() => setLocation("/brief")}
                  className="bg-[#D4FF00] text-black border-none hover:bg-white rounded-none"
                  glowColor="rgba(212, 255, 0, 0.3)"
                >
                  <span className="text-sm font-display uppercase tracking-widest">
                    {language === "pl" ? "Zacznij brief" : "Start a brief"}
                  </span>
                  <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Full-width Vertical Image with Parallax */}
      <section 
        ref={parallaxContainerRef}
        className="w-full h-[40vh] md:h-[60vh] bg-[#050505] border-y border-white/10 relative overflow-hidden flex items-center justify-center group"
      >
        <motion.div 
          style={{ y }}
          className="absolute inset-[-20%] w-[140%] h-[140%]"
        >
          <img
            src={presentationImg}
            alt="r352 background"
            loading="lazy"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
        </motion.div>
      </section>

      <References />
    </PageTransition>
  );
}