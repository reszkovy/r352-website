import { Reveal } from "@/app/components/ui/Reveal";
import { CinematicText } from "@/app/components/ui/CinematicText";
import { useLocation } from "wouter";
import { useLanguage } from "@/app/context/LanguageContext";
import { useTheme } from "@/app/context/ThemeContext";
import { AnimeGrid } from "@/app/components/ui/AnimeGrid";
import { MagneticButton } from "@/app/components/ui/MagneticButton";
import { ElasticLine } from "@/app/components/ui/ElasticLine";
import { ChipTooltip } from "@/app/components/ui/ChipTooltip";
import { ArrowRight } from "lucide-react";

export function AgencyHero() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const { theme } = useTheme();

  // Theme-aware text colors - fixes white-on-white in light mode.
  // useTransform inside CinematicText binds [baseColor, glowColor] at mount,
  // so we key the component on theme to force re-bind when toggling.
  const baseColor = theme === "light" ? "#0A0A0A" : "#ffffff";
  const glowColor = theme === "light" ? "#6B8F00" : "#D4FF00";

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Background Elements - Full Width */}
      <AnimeGrid />

      {/* GlassHero (WebGL figure) DISABLED 2026-06-10 on client decision -- ATF restored to the type-led layout. Component kept in src/app/components/ui/GlassHero.tsx if revisited. */}

      {/* Content Container - Centered and Max Width.
          Tightened pb-32 → pb-20 and mb-16/24 → mb-8/12 to lift the subtitle + CTAs
          higher in viewport - guarantees they're visible above-the-fold on 1366×768 and up. */}
      <div className="flex-grow flex flex-col justify-end w-full max-w-[1800px] mx-auto px-8 md:px-12 pb-20 md:pb-24 pt-40 relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          {/* Hero headline size - back up after 'design ops' shortened the headline.
              5xl/7xl/8xl (48/72/96px) gives monumental feel without pushing CTAs below fold
              (2-line desktop layout uses only ~192px vs the previous 3-line ~290px). */}
          <div className="hidden md:block">
            <CinematicText
              key={`hero-title-${theme}`}
              text={t("hero.title")}
              as="h1"
              className="type-h1 !text-5xl md:!text-7xl lg:!text-8xl mb-6 md:mb-10 max-w-[95%] cursor-default leading-[0.95]"
              delay={0.1}
              glowEffect={true}
              baseColor={baseColor}
              glowColor={glowColor}
            />
          </div>
          <div className="block md:hidden" aria-hidden="true">
            {/* Mobile hero typography:
                  - Font reduced 48px → 40px (text-[40px]) so "design partner." and
                    "partner designowy." fit on a single line at ~375-393px viewports.
                  - Leading tightened 0.95 → 0.76 (20% reduction) so the 4-line stack
                    reads as a unified block, not 4 separate sentences.
                  - text-balance still off (would re-flow into word breaks). */}
            <CinematicText
              key={`hero-title-mobile-${theme}`}
              text={t("hero.title_mobile")}
              as="div"
              className="type-h1 !text-[40px] mb-6 max-w-[95%] cursor-default leading-[0.76]"
              delay={0.1}
              glowEffect={true}
              baseColor={baseColor}
              glowColor={glowColor}
            />
          </div>

          <Reveal delay={0.6}>
            {/* Hero content restructure:
                - Subtitle + CTAs + "write directly" link sit ABOVE the ElasticLine divider
                - Divider sits below the action block as a separator
                - Micro lines (proof points) sit BELOW divider on LEFT in ONE row
                This pushes subtitle + CTAs higher in viewport (ATF) and uses divider as a logical
                separator between "decide → act" zone and "proof signals" zone. */}

            {/* Audience qualifier chips - shared ChipTooltip component (ui/ChipTooltip).
                Two semantic groups separated by a vertical divider:
                  Group 1 (neutral chips): WHO we serve
                  Group 2 (lime accent):   WHAT we do (capability anchor)
                Tooltip content is ALWAYS in the DOM (hidden via opacity/visibility) so
                prerendered HTML carries the full qualifier text. Triggers are keyboard-
                focusable with aria-describedby. Chips wrap + shrink below 640px. */}
            <div className="mb-8 md:mb-10 flex flex-wrap gap-2 md:gap-3 items-center">
              {/* Group 1 - audience/maturity filters with premium tooltips.
                  Tooltip strings use React fragments + &nbsp; before the last 1-2 words -
                  a typography safety net preventing orphan words on the final line. */}
              {/* TODO(reszek): próg ICP ujednolicony do 30-300+ (był 5-300+, podczas gdy
                  FAQ/Glossary/SEO mówią 30-300+). Process.tsx nadal ma 5-300+ - poza
                  zakresem tej zmiany, do wyrównania osobno. */}
              {(language === "pl" ? [
                { label: "Multi-location", tooltip: <>30-300+ fizycznych punktów, jedna&nbsp;marka</> },
                { label: "Multi-product", tooltip: <>Wiele linii produktów pod jedną&nbsp;marką</> },
                { label: "Multi-brand", tooltip: <>Wiele marek pod jednym operating&nbsp;systemem</> },
                { label: "SaaS", tooltip: <>Produkty software&apos;owe od pomysłu do operating&nbsp;systemu</> },
                { label: "Brand launch", tooltip: <>Pre-launch tożsamość, wejście na rynek od&nbsp;zera</> },
                { label: "Post-PMF & scaling", tooltip: <>Po product-market fit, poza founder-led&nbsp;execution</> },
              ] : [
                { label: "Multi-location", tooltip: <>30-300+ physical branches under a single&nbsp;brand</> },
                { label: "Multi-product", tooltip: <>Multiple product lines under one&nbsp;brand</> },
                { label: "Multi-brand", tooltip: <>Multiple brands sharing one operating&nbsp;system</> },
                { label: "SaaS", tooltip: <>Software products from foggy idea to operating&nbsp;system</> },
                { label: "Brand launch", tooltip: <>Pre-launch identity and 0-to-1 market&nbsp;entry</> },
                { label: "Post-PMF & scaling", tooltip: <>Past product-market fit, beyond founder-led&nbsp;execution</> },
              ]).map((chip, i) => (
                <ChipTooltip key={i} label={chip.label} tooltip={chip.tooltip} tooltipClassName="max-w-[220px]" />
              ))}

              {/* Divider - signals category shift from "who" to "how" */}
              <span aria-hidden="true" className="hidden sm:inline-block w-px h-4 bg-white/15 mx-1" />

              {/* Group 2 - capability anchor (lime accent, distinct visual register) */}
              <ChipTooltip
                variant="lime"
                label={
                  <>
                    <span aria-hidden="true" className="text-[8px] opacity-70">+</span>
                    AI Elevated Workflows
                  </>
                }
                tooltip={
                  language === "pl"
                    ? <>AI jako warstwa w governance i delivery - nie jako&nbsp;feature</>
                    : <>AI as a layer in governance and delivery - not as a&nbsp;feature</>
                }
              />
            </div>

            {/* Action block: subtitle (vertically CENTERED to CTA buttons) + CTAs.
                items-center aligns subheader to the optical middle of the button group on md+.
                On mobile they stack normally. */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 md:gap-12">
              <div className="w-full max-w-3xl">
                <p className="type-body-lg leading-relaxed text-balance text-neutral-400" dangerouslySetInnerHTML={{ __html: t("hero.description_title") }} />
              </div>

              <div className="flex flex-col sm:flex-row gap-6 shrink-0">
                {/* PRIMARY CTA - Brief */}
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

                {/* SECONDARY CTA - direct Calendly book (no extra hop via /contact) */}
                <MagneticButton
                  onClick={() => {
                    try { (window as any).plausible?.("calendly_clicked", { props: { source: "hero" } }); } catch { /* noop */ }
                    window.open("https://calendly.com/p-reszkovy/30min", "_blank", "noopener,noreferrer");
                  }}
                  className="explore-work-btn bg-white/[0.04] text-white border-transparent hover:bg-white/[0.08] rounded-none"
                  glowColor="rgba(212, 255, 0, 0.2)"
                >
                  <span className="invisible text-lg font-display uppercase tracking-[0.25em] absolute">{t("hero.cta_work")}</span>
                  <span className="text-lg font-display uppercase tracking-wide group-hover:tracking-[0.25em] transition-all duration-500 ease-out">{t("hero.cta_work")}</span>
                </MagneticButton>
              </div>
            </div>

            {/* Divider + below-the-line zone:
                LEFT - proof points (micro lines, kept on left for scan-readability)
                RIGHT - mailto link (warm-lead path, sits opposite proof signals, below divider) */}
            <div className="relative w-full pt-10 md:pt-14 mt-10 md:mt-12">
              <ElasticLine className="absolute -top-[30px] left-0 w-full h-[60px]" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 text-sm text-neutral-500 font-mono tracking-tight">
                  <p>{t("hero.micro_1")}</p>
                  <p>{t("hero.micro_2")}</p>
                  <p>{t("hero.micro_3")}</p>
                </div>

                {/* Direct mail link - moved below the divider, opposite proof points */}
                <a
                  href="mailto:hello@r352.com?subject=r352%20-%20hello"
                  onClick={() => {
                    try { (window as any).plausible?.("mail_clicked", { props: { source: "hero" } }); } catch { /* noop */ }
                  }}
                  className="self-start md:self-end group inline-flex items-center gap-3 text-xs font-display uppercase tracking-[0.2em] text-neutral-400 hover:text-[#D4FF00] transition-colors duration-500 cursor-pointer"
                >
                  <span className="w-6 h-px bg-neutral-600 group-hover:bg-[#D4FF00] group-hover:w-10 transition-all duration-500" />
                  <span>{language === "pl" ? "Albo napisz bezpośrednio" : "Or write directly"} · hello@r352.com</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </a>
              </div>

              {/* Brand signature line - "Move fast, steady cadence" demoted from headline to mantra position.
                  Sits at the very bottom of the hero as a closing brand sign-off. Sentence-case lowercase
                  for editorial feel, em-dash prefix as author signature convention, Tanker display font
                  scaled down to ~24-32px so it reads as tagline rather than title. */}
              <p className="mt-10 md:mt-14 font-display text-2xl md:text-4xl tracking-tight text-[#D4FF00]">
                <span className="text-neutral-600 mr-3">-</span>
                {t("hero.signature")}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
