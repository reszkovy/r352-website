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
  const { language } = useLanguage();
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
      {/* KineticManifesto DISABLED 2026-06-10 on client decision */}

      {/* Proof strip - scale numbers, styled as a twin of the client-logos band
          (label left + row spread, same #151515 surface). Real figures only. */}
      <section className="py-12 border-b border-white/5 bg-[#151515] overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-auto flex-shrink-0">
            <h3 className="text-[#D4FF00] font-display font-normal uppercase tracking-widest text-sm md:text-base whitespace-nowrap text-left">
              {language === "pl" ? "W skali" : "At scale"}
            </h3>
          </div>
          <div className="w-full flex flex-nowrap items-baseline justify-between gap-6 md:gap-12 overflow-x-auto md:overflow-visible scrollbar-hide">
            {[
              { v: "300+", l: language === "pl" ? "klubów / jeden system" : "clubs / one system" },
              { v: "250+", l: language === "pl" ? "lokalizacji" : "locations served" },
              { v: "3×", l: language === "pl" ? "szybsze akceptacje" : "faster approvals" },
              { v: "10k+", l: language === "pl" ? "assetów / rok" : "assets / year" },
              // retention: avg across mature accounts (Benefit 2019- ~7y, Sonova 2022- ~4y,
              // Kubota 2019- 5+y, Podsiadlo 2018- 6+y per LinkedIn) ≈ 5.7 - "5+" holds
              { v: "5+", l: language === "pl" ? "lat śr. współpracy" : "yrs avg partnership" },
            ].map((s, i) => (
              <div key={i} className="flex-shrink-0 flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-lg md:text-2xl font-semibold tracking-tight text-white tabular-nums leading-none">{s.v}</span>
                <span className="text-[11px] md:text-xs text-neutral-500">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SelectedWork />

      <Marquee />

      {/* Agency callout - hero invites agencies; this surfaces the white-label track. */}
      <div className="border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm">
          <span className="text-neutral-500">
            {language === "pl" ? "Jesteś agencją?" : "Are you an agency?"}
          </span>
          <a
            href="/for-agencies"
            onClick={(e) => { e.preventDefault(); setLocation("/for-agencies"); }}
            className="group inline-flex items-center gap-2 text-neutral-300 hover:text-[#D4FF00] transition-colors duration-300 cursor-pointer"
          >
            <span>{language === "pl" ? "Dostarczamy white-label, pod Twoją marką" : "We deliver white-label, under your name"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <ServicesList />

      <HomePrinciples />

      {/* ─── Brief CTA - 12-col 7+5 asymmetric ─── */}
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
                    ? "8 sekcji, ~26 pytań, ~12 minut. Pierwsza odpowiedź w 48 godzin - model współpracy, kierunek zakresu, następny krok."
                    : "8 sections, ~26 questions, ~12 minutes. First response within 48 hours - engagement model, scope direction, next step."}
                </p>
                <MagneticButton
                  onClick={() => setLocation("/brief")}
                  className="bg-[#D4FF00] text-black border-none hover:bg-white rounded-none"
                  glowColor="rgba(212, 255, 0, 0.3)"
                >
                  <span className="text-sm font-display uppercase tracking-widest">
                    {language === "pl" ? "Rozpocznij projekt" : "Start a project"}
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