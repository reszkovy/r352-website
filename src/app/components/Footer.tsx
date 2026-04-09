import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { R352Symbol } from "@/app/components/agency/R352Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";
import { MagnetGrid } from "@/app/components/ui/MagnetGrid";

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
    { label: t("nav.detailed_brief"), href: "/brief-access" },
    { label: t("nav.pricing"), href: "/limitedaccess" },
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

                   <a href="https://calendly.com/p-reszkovy/30min" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-12 py-4 bg-transparent border border-white/20 text-white transition-all duration-500 ease-out cursor-pointer overflow-hidden whitespace-nowrap w-full sm:w-auto hover:bg-white hover:text-black">
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
            
            {/* Column 1: Address */}
            <div className="md:col-span-1">
               <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.studio")}</span>
               <p className="text-lg text-neutral-300 leading-relaxed">
                 Mallorca, Baleares<br/>
                 Santa Catalina<br/>
                 (remote)
               </p>
               <p className="text-lg text-neutral-300 mt-6">
                 hello@r352.com
               </p>
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

            {/* Column 4: Time */}
            <div className="md:col-span-1 flex flex-col justify-between">
               <div>
                  <span className="block text-xs font-display uppercase tracking-widest text-neutral-500 mb-6">{t("footer.local_time")}</span>
                  <p className="text-lg text-neutral-300">
                    Mallorca {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })} CET
                  </p>
               </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/10 pt-12">
             <div className="flex flex-col gap-2 w-full md:w-auto overflow-hidden">
               
             </div>
             
             <div className="flex justify-between w-full md:w-auto items-center gap-12 pb-4">
               <div className="flex items-center gap-4">
                 <R352Symbol className="w-8 h-8 opacity-50" />
                 <p className="text-xs font-display uppercase tracking-widest text-neutral-600">
                   © 2026 r352
                 </p>
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
      </div>
    </footer>
  );
}
