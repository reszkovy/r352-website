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

      {/* Proof strip - scale numbers + bench/price anchor. Answers "can they handle
          my scale?" for large buyers and pre-qualifies budget. Real figures only. */}
      <section className="border-t border-b border-white/10 py-12 md:py-16">
        <div className="max-w-[1800px] mx-auto px-8 md:px-12">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-x-10">
              {[
                { v: "300+", l: language === "pl" ? "klubów na jednym systemie" : "clubs on one system" },
                { v: "250+", l: language === "pl" ? "obsługiwanych lokalizacji" : "locations served" },
                { v: "3×", l: language === "pl" ? "szybsze cykle akceptacji" : "faster approval cycles" },
                { v: "500+", l: language === "pl" ? "assetów rocznie" : "assets shipped / year" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-none">{s.v}</div>
                  <div className="text-xs md:text-sm text-neutral-500 mt-2 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 md:mt-12 text-sm md:text-base text-neutral-400 leading-relaxed max-w-3xl">
              {language === "pl"
                ? "Jeden odpowiedzialny partner, z senioralną siecią specjalistów dobieraną do skali - realne zaplecze, nie solo. Współpraca od €2k do wieloletnich partnerstw operacyjnych."
                : "One accountable partner, backed by a curated senior network scaled to the work - real bench depth, not a solo shop. Engagements from €2k to multi-year operating partnerships."}
            </p>
          </Reveal>
        </div>
      </section>

      <SelectedWork />

      <Marquee />

      {/* ─── Operating Model teaser - compressed proof of anti-hourly thesis.
          3-row condensed view of /process Operating Model graph. Plants the
          "system not hours" POV BEFORE buyer reaches services. Links to full
          graph on /process for buyers who want the depth. */}
      {/* Graphite "lifted" band. Full-bleed graphite-gray bg with feathered
          top/bottom gradients (from the page #0A0A0A into transparent) so the
          gray emerges and recedes smoothly as you scroll - no rigid section edge.
          Kept dark (white text + lime) so the fixed nav stays legible when it
          passes over the band; a light-inverted version washed the nav out. */}
      <section className="relative isolate">
        {/* Graphite fill */}
        <div className="absolute inset-0 -z-10 bg-[#363636]" aria-hidden="true" />
        {/* Feathered edges - blend the graphite into the dark page above & below */}
        <div className="absolute inset-x-0 top-0 -z-10 h-32 md:h-48 bg-gradient-to-b from-[#0A0A0A] to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-32 md:h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" aria-hidden="true" />

        <div className="max-w-[1800px] mx-auto px-8 md:px-12 py-40 md:py-56">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 items-start">
              <div>
                <span className="block text-[11px] uppercase tracking-[0.25em] text-[#D4FF00] font-display mb-4">
                  {language === "pl" ? "Operating Model" : "Operating Model"}
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white leading-[1.05] mb-6">
                  {language === "pl"
                    ? "Nasza obecność maleje z każdym krokiem."
                    : "Our presence decreases with each step."}
                </h2>
                <p className="text-base md:text-lg text-neutral-300 leading-relaxed [text-wrap:pretty] mb-6">
                  {language === "pl"
                    ? "Klient kupuje system, który po wdrożeniu działa coraz mniej z naszą obecnością. To dowód, że to system, nie godziny."
                    : "Clients buy a system that runs increasingly without us. Proof it's a system, not hours."}
                </p>
                <a
                  href="/process#operating-model"
                  onClick={(e) => {
                    e.preventDefault();
                    setLocation("/process");
                  }}
                  className="group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                >
                  <span className="w-6 h-px bg-neutral-500 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{language === "pl" ? "Pełny model na /process" : "Full model on /process"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </div>
              <div className="border-t border-white/15">
                {[
                  { step: "01", name: language === "pl" ? "Diagnoza" : "Diagnose", presence: "90%", role: language === "pl" ? "Architekt i decydent" : "Architect & decision-maker" },
                  { step: "04", name: language === "pl" ? "Budowa" : "Build", presence: "45%", role: language === "pl" ? "Kierunkowy i kontroler jakości" : "Director & quality controller" },
                  { step: "08", name: language === "pl" ? "Iteracja" : "Iterate", presence: "15%", role: language === "pl" ? "Strategiczny nadzorca" : "Strategic overseer" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-8 items-center py-5 border-b border-white/15"
                  >
                    <div className="text-sm">
                      <span className="font-display text-[#D4FF00] mr-3">{row.step}</span>
                      <span className="text-white font-medium">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-full max-w-[120px] h-2 bg-white/15 relative">
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
                    ? "8 sekcji, ~26 pytań, ~10 minut. Pierwsza odpowiedź w 48 godzin - model współpracy, kierunek zakresu, następny krok."
                    : "8 sections, ~26 questions, ~10 minutes. First response within 48 hours - engagement model, scope direction, next step."}
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