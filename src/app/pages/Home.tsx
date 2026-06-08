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

      {/* ─── Operating Model teaser — compressed proof of anti-hourly thesis.
          3-row condensed view of /process Operating Model graph. Plants the
          "system not hours" POV BEFORE buyer reaches services. Links to full
          graph on /process for buyers who want the depth. */}
      <section className="py-24 md:py-32 border-t border-white/10">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
                  {language === "pl" ? "Operating Model" : "Operating Model"}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
                  {language === "pl"
                    ? "Moja obecność maleje z każdym krokiem."
                    : "My presence decreases with each step."}
                </h2>
                <p className="text-base md:text-lg text-neutral-400 leading-relaxed [text-wrap:pretty] mb-6">
                  {language === "pl"
                    ? "Klient kupuje system, który po wdrożeniu działa coraz mniej z moją obecnością. To dowód, że to system, nie godziny."
                    : "Clients buy a system that runs increasingly without my presence. Proof it's a system, not hours."}
                </p>
                <a
                  href="/process#operating-model"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/process");
                  }}
                  className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                >
                  <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{language === "pl" ? "Pełny model na /process" : "Full model on /process"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </div>
              <div className="border-t border-white/10">
                {[
                  { step: "01", name: language === "pl" ? "Diagnoza" : "Diagnose", presence: "90%", role: language === "pl" ? "Architekt i decydent" : "Architect & decision-maker" },
                  { step: "04", name: language === "pl" ? "Budowa" : "Build", presence: "45%", role: language === "pl" ? "Kierunkowy i kontroler jakości" : "Director & quality controller" },
                  { step: "08", name: language === "pl" ? "Iteracja" : "Iterate", presence: "15%", role: language === "pl" ? "Strategiczny nadzorca" : "Strategic overseer" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-center py-5 border-b border-white/10"
                  >
                    <div className="text-sm">
                      <span className="font-display text-[#D4FF00] mr-3">{row.step}</span>
                      <span className="text-white font-medium">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-full max-w-[120px] h-2 bg-white/10 relative">
                        <div
                          className="absolute left-0 top-0 h-full bg-[#D4FF00]"
                          style={{ width: row.presence }}
                        />
                      </div>
                      <span className="font-display text-sm text-white shrink-0">{row.presence}</span>
                    </div>
                    <span className="hidden md:inline text-sm text-neutral-400 shrink-0 text-right">{row.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

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