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
  const { t } = useLanguage();
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
      
      {/* Philosophy Teaser */}
      <section className="py-32 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
           {/* Title — full width */}
           <CinematicText
             text={t("philosophy.teaser.title")}
             className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight leading-[1.0] text-white max-w-4xl"
           />
           {/* Description + CTA — right-aligned below */}
           <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-12">
             <Reveal delay={0.2}>
               <p className="text-lg text-neutral-400 leading-relaxed max-w-lg whitespace-pre-line">
                 {t("philosophy.teaser.description")}
               </p>
             </Reveal>
             <Reveal delay={0.3}>
               <MagneticButton
                 onClick={() => setLocation("/philosophy")}
                 className="bg-transparent border-white/20 text-white hover:bg-white hover:text-black w-full max-w-[280px] sm:max-w-none sm:w-auto mx-auto md:mx-0 shrink-0"
                 glowColor="rgba(255, 255, 255, 0.2)"
               >
                   <span className="invisible text-xs font-display uppercase tracking-widest absolute">{t("philosophy.teaser.cta")}</span>
                   <span className="text-xs font-display uppercase tracking-widest group-hover:tracking-[0.25em] transition-all duration-500 ease-out">{t("philosophy.teaser.cta")}</span>
               </MagneticButton>
             </Reveal>
           </div>
        </div>
      </section>

      <SelectedWork />

      <Marquee />

      <HomePrinciples />
      
      <ServicesList />

      <div ref={engagementRef}>
        <EngagementModels />
      </div>

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