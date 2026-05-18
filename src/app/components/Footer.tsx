import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { R352Symbol } from "@/app/components/agency/R352Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";
import { MagnetGrid } from "@/app/components/ui/MagnetGrid";
import { R3LoopBadge } from "@/app/components/ui/R3LoopBadge";

export function Footer() {
  const { t } = useLanguage();
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
    { label: t("services_page.deliverables.label"), href: "/deliverables" },
    { label: t("nav.journal"), href: "/journal" },
    { label: "Start a brief", href: "/brief" },
    { label: t("nav.contact") || "Kontakt", href: "/contact" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/r352.studio/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/przemyslawreszka/" },
    { label: "YouTube", href: "https://www.youtube.com/@r352studio" }
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

                   {/* Schedule a call — secondary CTA. Hover lifts bg subtly + text turns lime
                       (matches the rest of the site's hover language — lime is the brand accent,
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

      {/* Lower: Links & Info — darker background */}
      <div className="bg-[#0a0a0a] px-8 md:px-12 pt-16 pb-12">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 border-t border-white/10 pt-16 mb-24">
            
            {/* Column 1: Studio address only — "Founded by Reszek" moved to Column 4 sibling
                so it pairs with the rotating R-mark watermark on the opposite end of the row. */}
            <div className="md:col-span-1">
               <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.studio")}</span>
               <p className="text-lg text-neutral-300 leading-relaxed">
                 Mallorca, Baleares<br/>
                 Santa Catalina<br/>
                 (remote)
               </p>
               <a
                 href="mailto:hello@r352.com?subject=r352%20—%20hello"
                 className="block text-lg text-neutral-300 mt-6 hover:text-[#D4FF00] transition-colors duration-500 w-fit"
               >
                 hello@r352.com
               </a>
            </div>

            {/* Column 2: Sitemap */}
            <div className="md:col-span-1">
               <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.sitemap")}</span>
               <ul className="flex flex-col gap-3 items-start">
                 {navLinks.map((link) => (
                   <li key={link.label}>
                     <Link href={link.href} className={cn(
                        "group relative inline-flex py-1 transition-colors duration-300 hover:text-[#D4FF00]",
                        location === link.href ? "text-[#D4FF00]" : "text-neutral-300"
                     )}>
                       <div className="relative overflow-hidden flex flex-col items-start justify-center">
                           <span className="font-medium tracking-[0.15em] opacity-0 invisible select-none text-lg" aria-hidden="true">
                               {link.label}
                           </span>
                           <span className={cn(
                               "absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out text-lg",
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

             {/* Column 3: Socials */}
             <div className="md:col-span-1">
               <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.social")}</span>
               <ul className="flex flex-col gap-3 items-start">
                 {socialLinks.map((link) => (
                   <li key={link.label}>
                     <a href={link.href} target="_blank" rel="noopener noreferrer" className="group relative inline-flex py-1 transition-colors duration-300 text-neutral-300 hover:text-[#D4FF00]">
                       <div className="relative overflow-hidden flex flex-col items-start justify-center">
                           <span className="font-medium tracking-[0.15em] opacity-0 invisible select-none text-lg" aria-hidden="true">
                               {link.label}
                           </span>
                           <span className="absolute inset-0 flex items-center justify-start transition-all duration-300 ease-out font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em] text-lg">
                               {link.label}
                           </span>
                       </div>
                     </a>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Column 4: Time + Founded by Reszek + Rotating R-mark watermark.
                R-mark sits BELOW the textual blocks, as a quiet ambient signature.
                SVG fill is already #151515 (matches upper section bg) so it reads as a
                ledwo-widoczny "darker shape on dark" watermark against the #0a0a0a lower bg. */}
            <div className="md:col-span-1 flex flex-col gap-8 items-start">
               <div>
                  <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.local_time")}</span>
                  <p className="text-lg text-neutral-300">
                    Mallorca {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })} CET
                  </p>
               </div>

               {/* Personal brand line — moved here from Column 1 so it pairs with the R-mark.
                   "Founded by Reszek · LinkedIn" reads as a personal signature beside the watermark. */}
               <a
                 href="https://www.linkedin.com/in/przemyslawreszka/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-[#D4FF00] transition-colors duration-300 w-fit"
               >
                 <span>Founded by Reszek · LinkedIn</span>
                 <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">↗</span>
               </a>

               {/* Rotating R-mark — animated brand signature.
                   Container scaled 70% larger (was 160/192px → 272/326px) so the
                   rotating wokolo ornament reads as the dominant motif. R in center
                   stays the same absolute size by dropping its relative fraction from
                   1/6 to 10%, keeping the visual hierarchy: big quiet rotation around
                   a small stable letter. Both SVGs use native fill #151515 — ledwo
                   widoczne darker shape on #0a0a0a lower-section bg. */}
               {/* Container scaled +5% on top of previous +15% (cumulative +106% from
                   original baseline). Wokolo grows, R fraction drops 9% → 8.5% to keep
                   letter at the same absolute ~27/33px size — visual hierarchy intact. */}
               <div className="pointer-events-none relative w-[20.5rem] h-[20.5rem] md:w-[24.5rem] md:h-[24.5rem] mt-2">
                  <img
                    src="/footer-mark/wokolo.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full animate-spin-slow"
                  />
                  <img
                    src="/footer-mark/r.svg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 m-auto w-[8.5%] h-[8.5%]"
                  />
               </div>
            </div>
          </div>

          {/* Footer Bottom — all elements aligned LEFT so they don't collide with floating Brief CTA + chat (which live bottom-right) */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 border-t border-white/10 pt-12 pb-4">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
