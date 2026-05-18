import { AgencyHero } from "@/app/components/agency/AgencyHero";
import { ClientLogos } from "@/app/components/agency/ClientLogos";
import { SelectedWork } from "@/app/components/agency/SelectedWork";
import { ServicesList } from "@/app/components/agency/ServicesList";
import { HomePrinciples } from "@/app/components/agency/HomePrinciples";
import { References } from "@/app/components/agency/References";
import { useLocation } from "wouter";
import { PageTransition } from "@/app/components/ui/PageTransition";
import { Reveal } from "@/app/components/ui/Reveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { Marquee } from "@/app/components/ui/Marquee";
import { ArrowRight } from "lucide-react";

import presentationImg from "../../imports/Background.webp";

export function Home() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start end", "end start"]
  });

  // Parallax offset for background image
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <PageTransition className="">
      <AgencyHero />
      <ClientLogos />
      
      {/* Philosophy Teaser — 12-col grid: title col-7, caption+CTA col-5 (7+5 asymmetric) */}
      <section className="pt-32 pb-32 md:pt-40 md:pb-40 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
              {/* LEFT col-7: title — plain h2, smaller size to fit col-7 cleanly, break-keep to prevent mid-word split */}
              <h2
                className="col-span-12 md:col-span-7 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.2] text-white break-keep"
                dangerouslySetInnerHTML={{ __html: t("philosophy.teaser.title") }}
              />

              {/* RIGHT col-5: caption + CTA stacked */}
              <div className="col-span-12 md:col-span-5 md:justify-self-end max-w-xl space-y-8">
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed whitespace-pre-line">
                  {t("philosophy.teaser.description")}
                </p>
                {/* TERTIARY text link — matches ATF hero "Or write directly" pattern.
                    Animated underline grows on hover, arrow translates right, lime accent
                    replaces neutral on hover. Kills the framed bordered button look. */}
                <a
                  href="/philosophy"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/philosophy");
                  }}
                  className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                >
                  <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{t("philosophy.teaser.cta")}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SelectedWork />

      <Marquee />

      <ServicesList />

      <HomePrinciples />

      {/* ─── Brief CTA — 12-col 7+5 asymmetric ─── */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 md:gap-8 items-end">
              <div className="col-span-12 md:col-span-7">
                <span className="block text-xs font-display uppercase tracking-[0.2em] text-[#D4FF00] mb-6">
                  {language === "pl" ? "Narzędzie briefingowe" : "Briefing tool"}
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[0.95]">
                  {language === "pl"
                    ? "Każdy projekt zaczyna się od briefu."
                    : "Every project starts with a brief."}
                </h2>
              </div>
              <div className="col-span-12 md:col-span-5 md:justify-self-end max-w-md space-y-6">
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
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
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