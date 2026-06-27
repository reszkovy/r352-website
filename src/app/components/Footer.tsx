import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { R352Symbol } from "@/app/components/agency/R352Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { useConsent } from "@/app/context/ConsentContext";
import { useLenis } from "lenis/react";
import { MagnetGrid } from "@/app/components/ui/MagnetGrid";
import { R3LoopBadge } from "@/app/components/ui/R3LoopBadge";

export function Footer() {
  const { t } = useLanguage();
  const { reset } = useConsent();
  const lenis = useLenis();
  const [location] = useLocation();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  // Instant scroll to top for navigation
  const navigateToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const navLinks = [
    { label: t("work.selected_work"), href: "/work" },
    { label: t("nav.philosophy"), href: "/philosophy" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.journal"), href: "/journal" },
    { label: "Start a brief", href: "/brief" },
    { label: t("nav.contact") || "Kontakt", href: "/contact" },
  ];

  // Resources group - de-orphans /faq, /industries, /deliverables, /glossary
  // (audit: pages existed at direct URLs only, zero internal links → invisible to
  // users and crawlers). Rendered as a discreet secondary list under Sitemap.
  const resourceLinks = [
    { label: t("footer.link_faq"), href: "/faq" },
    { label: t("footer.link_industries"), href: "/industries" },
    { label: t("footer.link_deliverables"), href: "/deliverables" },
    { label: t("footer.link_glossary"), href: "/glossary" },
    // For Agencies - white-label / project-consultant track. Footer-only entry by
    // design (kept out of top-nav so it doesn't compete with the primary
    // brand-direct narrative). Surfaced contextually from /services too.
    { label: t("footer.link_agencies"), href: "/for-agencies" },
    // Product Design - curated digital-product / UX work (the product side of r352).
    { label: t("footer.link_product_design"), href: "/product-design" },
  ];

  // Channel focus - LinkedIn + email only. Instagram/YouTube removed (dormant
  // channels dilute the channel-focus signal; re-add only when actively maintained).
  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/przemyslawreszka/" },
    { label: "Email", href: "mailto:hello@r352.com" }
  ];

  return (
    <footer className="text-white relative overflow-hidden border-t border-white/10" data-no-cursor-fx="true">
      {/* Upper: CTA Section */}
      <div className="bg-[#151515] pt-32 pb-32 px-8 md:px-12 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto relative">
          <div className="relative">
            <div className="absolute inset-0 -mx-32 -my-32">
               <MagnetGrid fillColor="#000000" gradientOverlay={false} opacity={1} />
               <div className="absolute inset-0 bg-gradient-to-b from-[#151515] via-transparent to-[#151515]" />
               <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-transparent to-[#151515]" />
            </div>

            <div className="relative z-10">
              <p className="text-[#D4FF00] font-display uppercase tracking-widest text-sm mb-8">
                {t("footer.idea")}
              </p>
              <div className="flex flex-col items-start gap-12">
                 <Link href="/contact" onClick={navigateToTop} className="group inline-flex flex-col">
                   <span className="text-6xl md:text-8xl lg:text-9xl font-sans font-medium tracking-normal text-white group-hover:text-white/50 transition-colors duration-500">
                     {t("footer.bold_ideas")}
                   </span>
                   <span className="text-6xl md:text-8xl lg:text-9xl font-sans font-medium tracking-normal text-white group-hover:text-[#D4FF00] transition-colors duration-500 flex items-center gap-4">
                     {t("footer.shaped")}
                   </span>
                 </Link>
                 
                 <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                   <Link href="/contact" onClick={navigateToTop} className="group relative inline-flex items-center justify-center px-12 py-4 bg-[#D4FF00] text-black transition-all duration-500 ease-out cursor-pointer overflow-hidden whitespace-nowrap w-full sm:w-auto">
                         <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                         <span className="flex items-center justify-center relative">
                           <span className="invisible text-lg font-display uppercase tracking-widest">{t("footer.cta")}</span>
                           <span className="absolute text-lg font-display uppercase tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out">{t("footer.cta")}</span>
                         </span>
                   </Link>

                   {/* Schedule a call - secondary CTA. Hover lifts bg subtly + text turns lime
                       (matches the rest of the site's hover language - lime is the brand accent,
                       white-on-black hover felt generic + clashed with the primary lime button). */}
                   <a href="https://calendly.com/p-reszkovy/30min" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-12 py-4 bg-black/[0.05] dark:bg-white/[0.06] text-white transition-all duration-500 ease-out cursor-pointer overflow-hidden whitespace-nowrap w-full sm:w-auto hover:bg-white/[0.10] hover:text-[#D4FF00]">
                         <span className="flex items-center justify-center relative">
                           <span className="invisible text-lg font-display uppercase tracking-widest">{t("nav.schedule")}</span>
                           <span className="absolute text-lg font-display uppercase tracking-widest group-hover:tracking-normal transition-all duration-500 ease-out">{t("nav.schedule")}</span>
                         </span>
                   </a>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower: Links & Info - darker background */}
      <div className="bg-[#0a0a0a] px-8 md:px-12 pt-16 pb-12">
        <div className="max-w-[1800px] mx-auto">
          {/* Footer compaction (2026-06-11) - 4 cols → 3 cols.
              - Resources sub-list folded INTO Sitemap column as an internal 2-up grid
                (Sitemap | Resources side-by-side) - same width, half the height vs.
                the previous stacked-below treatment.
              - Social column dissolved - LinkedIn + Email migrated under Local Time
                in the rightmost column. Right column now reads as a tight "ways to
                connect / where we are" block instead of three thin stubs.
              Net effect: vertical height shrunk ~40%, less wasted whitespace, the
              R-mark watermark sits closer to its anchoring content. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 border-t border-white/10 pt-16 mb-24">

            {/* Column 1: Studio address (unchanged). "Founded by Reszek" still lives
                in Column 3 so it pairs with the R-mark watermark on the opposite end. */}
            <div className="md:col-span-1">
               <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.studio")}</span>
               <p className="text-lg text-neutral-300 leading-relaxed">
                 EU<br/>
                 remote / distributed
               </p>
               <a
                 href="mailto:hello@r352.com?subject=r352%20-%20hello"
                 className="block text-lg text-neutral-300 mt-6 hover:text-[#D4FF00] transition-colors duration-500 w-fit"
               >
                 hello@r352.com
               </a>
               {/* Verbal identity - one category line, sitewide. Matches header
                   tagline ("Strategic design partner") + the methodology category. */}
               <p className="text-xs text-neutral-500 mt-6 leading-relaxed max-w-[240px]">
                 Strategic design partner.<br />
                 Loop architecture for design ops.
               </p>
            </div>

            {/* Column 2: Sitemap + Resources as internal 2-up grid. Both lists get
                eyebrow-equal styling - Resources is no longer rendered as a smaller
                "secondary" list, because the side-by-side placement already
                communicates the relative weight without typographic dimming. */}
            <div className="md:col-span-1">
               <div className="grid grid-cols-2 gap-8">

                  {/* Sub-col A: Primary navigation */}
                  <div>
                     <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.sitemap")}</span>
                     <ul className="flex flex-col gap-3 items-start">
                        {navLinks.map((link) => (
                           <li key={link.label}>
                              <Link href={link.href} className={cn(
                                 "group relative inline-flex py-1 transition-colors duration-300 hover:text-[#D4FF00]",
                                 location === link.href ? "text-[#D4FF00]" : "text-neutral-300"
                              )}>
                              <div className="relative overflow-hidden flex flex-col items-start justify-center">
                                    <span className="font-medium tracking-[0.15em] opacity-0 invisible select-none text-base" aria-hidden="true">
                                       {link.label}
                                    </span>
                                    <span className={cn(
                                       "absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out text-base",
                                       "font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em]",
                                       location === link.href && "font-medium tracking-normal"
                                    )}>
                                       {link.label}
                                    </span>
                              </div>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Sub-col B: Resources. Same interactive treatment as Sitemap -
                      shift+letter-spacing on hover - so users perceive both lists as
                      equal-priority navigation, not main + footnote. */}
                  <div>
                     <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.resources")}</span>
                     <ul className="flex flex-col gap-3 items-start">
                        {resourceLinks.map((link) => (
                           <li key={link.href}>
                              <Link
                                 href={link.href}
                                 onClick={navigateToTop}
                                 className={cn(
                                    "group relative inline-flex py-1 transition-colors duration-300 hover:text-[#D4FF00]",
                                    location === link.href ? "text-[#D4FF00]" : "text-neutral-300"
                                 )}
                              >
                                 <div className="relative overflow-hidden flex flex-col items-start justify-center">
                                    <span className="font-medium tracking-[0.15em] opacity-0 invisible select-none text-base" aria-hidden="true">
                                       {link.label}
                                    </span>
                                    <span className={cn(
                                       "absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out text-base",
                                       "font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em]",
                                       location === link.href && "font-medium tracking-normal"
                                    )}>
                                       {link.label}
                                    </span>
                                 </div>
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </div>

               </div>
            </div>

            {/* Column 3: Time + Connect (LinkedIn/Email) + Founded by Reszek + Rotating R-mark.
                R-mark is ABSOLUTELY positioned so it doesn't stretch the column height
                (which previously created a huge empty gap under the shorter Sitemap / Social
                columns). It's allowed to overflow downward - past the divider, off-screen
                if needed - because pointer-events-none + z-0 keep it inert and behind
                everything important. */}
            <div className="md:col-span-1 flex flex-col gap-8 items-start relative">
               <div>
                  <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.local_time")}</span>
                  <p className="text-lg text-neutral-300">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })} CET
                  </p>
               </div>

               {/* CONNECT - folded in from the dissolved Social column.
                   LinkedIn + Email rendered with the same hover treatment as the
                   Sitemap/Resources lists so the right column reads as a coherent
                   "where + how to reach us" block instead of a thin time-stub. */}
               <div>
                  <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.social")}</span>
                  <ul className="flex flex-col gap-3 items-start">
                     {socialLinks.map((link) => (
                        <li key={link.label}>
                           <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group relative inline-flex py-1 transition-colors duration-300 text-neutral-300 hover:text-[#D4FF00]">
                              <div className="relative overflow-hidden flex flex-col items-start justify-center">
                                 <span className="font-medium tracking-[0.15em] opacity-0 invisible select-none text-base" aria-hidden="true">
                                    {link.label}
                                 </span>
                                 <span className="absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em] text-base">
                                    {link.label}
                                 </span>
                              </div>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Personal brand line - pairs with the R-mark watermark.
                   "Founded by Reszek · LinkedIn" reads as a personal signature beside the mark. */}
               <a
                 href="https://www.linkedin.com/in/przemyslawreszka/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#D4FF00] transition-colors duration-300 w-fit"
               >
                 <span>Founded by Reszek · LinkedIn</span>
                 <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span>
               </a>

               {/* Wegobold sister-brand cross-link REMOVED 2026-06 - portfolio + business
                   model mismatch z r352 (enterprise consulting vs performance lead-gen)
                   creates brand confusion vs trust transfer. Revisit po 6-12 mies. kiedy
                   wegobold ma własną pozycję AS execution arm (jeśli ten kierunek wybrany).
                   See chat strategy analysis 2026-06 dla full reasoning. */}

               {/* Rotating R-mark - animated brand signature.
                   Container scaled 70% larger (was 160/192px → 272/326px) so the
                   rotating wokolo ornament reads as the dominant motif. R in center
                   stays the same absolute size by dropping its relative fraction from
                   1/6 to 10%, keeping the visual hierarchy: big quiet rotation around
                   a small stable letter. Both SVGs use native fill #151515 - ledwo
                   widoczne darker shape on #0a0a0a lower-section bg. */}
               {/* top-64 md:top-72 → restored after wegobold cross-link removed.
                   Anchored below Time + Connect (LinkedIn/Email) + Founded by Reszek line.
                   Can overflow downward - pointer-events-none + z-0 keep it inert. */}
               {/* SVGs have hardcoded fill #151515 (works on dark mode as darker-shape-on-dark).
                   On LIGHT mode we invert + slightly darken via filter so it renders as a
                   very-light-gray watermark (~#ECECEC), then knock to 30% opacity so it
                   reads as truly ambient - no fight with the foreground. Dark mode keeps
                   native dark fill at full opacity (it's already subtle by color match). */}
               <div className="pointer-events-none absolute top-64 md:top-72 left-0 w-[20.5rem] h-[20.5rem] md:w-[24.5rem] md:h-[24.5rem] z-0">
                  <img
                    src="/footer-mark/wokolo.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full animate-spin-slow opacity-30 dark:opacity-100 [filter:invert(1)_brightness(0.92)] dark:[filter:none]"
                  />
                  <img
                    src="/footer-mark/r.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 m-auto w-[8.5%] h-[8.5%] opacity-30 dark:opacity-100 [filter:invert(1)_brightness(0.92)] dark:[filter:none]"
                  />
               </div>
            </div>
          </div>

          {/* Footer Bottom - all elements aligned LEFT so they don't collide with floating Brief CTA + chat (which live bottom-right).
              No divider above - pt-12 alone gives enough breathing room, and the divider was redundant with the one above the 4-col grid. */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 pt-12 pb-4">
            <div className="flex items-center gap-4">
              <R352Symbol className="w-8 h-8 opacity-50" />
              <p className="text-xs font-display uppercase tracking-widest text-neutral-600">
                © 2026 r352
              </p>
              <Link href="/process" className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                <R3LoopBadge size="sm" />
              </Link>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-display uppercase tracking-widest hover:tracking-[0.25em] text-neutral-500 hover:text-[#D4FF00] transition-all duration-500 ease-out"
            >
              {t("footer.back_to_top")}
            </button>

            {/* Legal strip - privacy + cookies pages + a quick reset for the consent banner.
                Kept inline with copyright row so it doesn't compete with primary nav above. */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-display uppercase tracking-widest">
              <Link
                href="/privacy"
                onClick={navigateToTop}
                className="text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
              >
                {t("consent.banner.privacy")}
              </Link>
              <Link
                href="/cookies"
                onClick={navigateToTop}
                className="text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
              >
                {t("consent.banner.preferences")}
              </Link>
              <button
                type="button"
                onClick={reset}
                className="text-neutral-500 hover:text-[#D4FF00] transition-colors duration-300"
                aria-label={t("consent.banner.preferences")}
              >
                {t("cookies.reset")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
