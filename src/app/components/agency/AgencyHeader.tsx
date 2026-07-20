import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { R352Symbol, R352Text } from "./R352Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";
import { useTheme } from "@/app/context/ThemeContext";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";
import { SoundWaveWidget } from "@/app/components/ui/SoundWaveWidget";
import { DecodeText } from "@/app/components/ui/DecodeText";

// Console nav (lamalama-inspired, r352 grammar): desktop inline links collapse
// into a burger + status readout; the menu unfolds as an anchored dark panel
// with decode-in links, CTA tiers and utilities. EASY REVERT: flip to false to
// restore the classic inline nav + fullscreen mobile overlay exactly as before.
const NAV_CONSOLE = true;

export function AgencyHeader() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLimeTheme, setIsLimeTheme] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const lenis = useLenis();

  // Refs for mobile menu focus management (Escape close + focus trap)
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  // Use Lenis scroll callback for reliable scroll tracking on desktop, and standard scroll listener for mobile.
  // Threshold 80px (was 150): content slides under the fixed header well before 150px,
  // causing wordmark/nav collisions - the backdrop must be up before anything reaches it.
  useLenis((lenis) => {
    setIsScrolled(lenis.scroll > 80);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track lime-theme on body
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLimeTheme(document.body.classList.contains("lime-theme"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll is deliberately NOT locked while the menu is open (Reszek 2026-07):
  // the page keeps scrolling behind the blurred backdrop - a living-background
  // effect. Interaction stays menu-only: the backdrop swallows clicks (and
  // closes the menu), while wheel events bubble past it to Lenis on window.
  // The panel's own list carries data-lenis-prevent, so scrolling inside the
  // menu never moves the page. Bonus: no stop()/start() lifecycle means the
  // whole class of "dead scroll after close" races is structurally gone.
  useEffect(() => {
    // Defensive: if any earlier code path left lenis stopped, revive it.
    lenis?.start();
  }, [isMenuOpen, lenis]);

  // Mobile menu a11y: Escape to close, focus trap (Tab loops), auto-focus first link on open,
  // restore focus to trigger button on close.
  useEffect(() => {
    if (!isMenuOpen) return;

    const overlay = menuOverlayRef.current;
    if (!overlay) return;

    // Collect focusable elements inside the overlay
    const getFocusableElements = (): HTMLElement[] => {
      const selector =
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
      return Array.from(overlay.querySelectorAll<HTMLElement>(selector));
    };

    // Auto-focus first link in menu after animation paints (next frame)
    const focusTimer = window.setTimeout(() => {
      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes menu + restores focus to trigger
      if (e.key === "Escape") {
        e.preventDefault();
        setIsMenuOpen(false);
        // Restore focus on next tick after menu unmount
        window.setTimeout(() => {
          menuTriggerRef.current?.focus();
        }, 0);
        return;
      }

      // Focus trap: cycle Tab / Shift+Tab inside the overlay
      if (e.key === "Tab") {
        const focusables = getFocusableElements();
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          // Shift+Tab from first → wrap to last
          if (active === first || !overlay.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          // Tab from last → wrap to first
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Nav hierarchy (post-Framework deletion): Work (proof) → Process (r3loop - THE
  // methodology) → Philosophy (how I think) → Services (how to buy) → Journal (content).
  // Framework was deleted; r3loop now stands alone as the single methodology brand.
  const navItems = [
    { href: "/work", label: t("nav.work") },
    { href: "/process", label: t("nav.process") },
    { href: "/philosophy", label: t("nav.philosophy") },
    { href: "/services", label: t("nav.services") },
    { href: "/for-agencies", label: t("nav.agencies") },
    { href: "/journal", label: t("nav.journal") },
  ];

  // Nav contact - familiar pattern. Premium signal moved to FloatingBriefCTA (persistent, global).
  // /contact = hybrid landing (Brief primary + mailto secondary). /brief = wizard entry.
  const contactButton = { href: "/contact", label: t("nav.contact") };
  const scheduleButton = { href: "https://calendly.com/p-reszkovy/30min", label: t("nav.schedule") };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  const tagline = t("nav.tagline");

  // Console mode: current-section status readout (machine voice, mono).
  const sectionLabel = (() => {
    const map: Array<[string, string]> = [
      ["/work", "WORK"],
      ["/process", "PROCESS"],
      ["/philosophy", "PHILOSOPHY"],
      ["/services", "SERVICES"],
      ["/for-agencies", language === "pl" ? "DLA AGENCJI" : "FOR AGENCIES"],
      ["/journal", "JOURNAL"],
      ["/contact", "CONTACT"],
      ["/brief", "BRIEF"],
      ["/webgl", "GALLERY"],
    ];
    for (const [prefix, label] of map) {
      if (location === prefix || location.startsWith(prefix + "/")) return label;
    }
    return "HOME";
  })();

  const consoleItems = [...navItems, contactButton];

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-[999] transition-all duration-700",
        isScrolled ? "pointer-events-auto is-scrolled" : "pointer-events-none",
        isLimeTheme 
          ? "text-black py-4 md:py-6" 
          : cn("text-white transition-all duration-700", isScrolled ? "py-4 md:py-6" : "mix-blend-difference py-6 md:py-8")
      )}>
        {/* Dark Mode Version - soft linear scrim, NO rigid bar, NO blur (client
            direction: a shadow that fades top→transparent, never a frosted bar).
            QA 2026-06-21: a backdrop-blur layer was tried to kill nav/heading
            collisions but its blur cutoff read as a hard "technical" bar - reverted.
            Back to a single blur-free gradient, but stronger (95% vs the old 80%)
            and taller (h-[260%] vs 210%) so the falloff is long and gradual: it
            darkens high-contrast content enough to keep the nav legible while
            staying purely linear, with no edge anywhere. Brand easing. */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[260%] -z-10 pointer-events-none",
            "bg-gradient-to-b from-black/95 via-black/55 to-transparent",
            "transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isScrolled && theme === 'dark' && !isLimeTheme ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Light Mode Version - now a SINGLE clean gradient, mirroring the dark
            scrim exactly (white instead of black). 2026-07 (Reszek): the old
            two-layer build read as a solid white BAR that was too big and, with
            its downward box-shadow, looked shaded the wrong way. This is one
            smooth top→transparent falloff: no blur (which made it read solid
            and smeared content below), no shadow, no seam. Strong at the top
            (white/95) where the nav sits, gone by the bottom. */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[260%] -z-10 pointer-events-none",
            "bg-gradient-to-b from-white/95 via-white/55 to-transparent",
            "transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isScrolled && (theme === 'light' || isLimeTheme) ? "opacity-100" : "opacity-0"
          )}
        />
        <div className="px-8 md:px-12 flex justify-between items-center w-full relative z-10">
        <Link
            href="/"
            className="pointer-events-auto cursor-pointer group relative flex items-center z-[1000] gap-[5px]"
        >
            {/* Symbol - R Icon */}
            <R352Symbol className="h-10 w-auto text-[#DAFF45]" color="currentColor" />

            {/* Text - 352 + always-visible positioning tagline.
                Tagline reveals on logo hover was killed - positioning insight ("Strategic
                Design Partner") needs to be visible by default, not hidden behind an interaction.
                Tagline hides on scroll alongside the 352 text - only the R-mark remains. */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -10 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex items-center"
                >
                  <R352Text className="h-9 w-auto text-[#DAFF45]" color="currentColor" />

                  {/* Static positioning tagline - visible on lg+ screens (≥1024px)
                      where horizontal room allows. Pipe divider uses bg-current + opacity
                      instead of border-current/20 (which Tailwind compiles unreliably
                      for currentColor). This works in dark, light, and lime themes alike. */}
                  <div className="hidden lg:flex items-center ml-5 gap-5">
                    <span aria-hidden="true" className="block w-px h-4 bg-current opacity-30" />
                    {/* Tagline z clay accent na ostatnim segmencie (AI) jako TEST nowego
                        secondary brand color. Dynamic split po " · " — działa niezależnie
                        od języka (i18n-safe). Clay `#D97757` = warm warm tone vs lime cool
                        accent. Pierwsze test placement w wysokiej widoczności (sitewide
                        nav) z minimum visual disruption (1 słowo z 4). Revisit po 2 tyg
                        jeśli buyer/audience reakcja czytelna. */}
                    {(() => {
                      const segments = tagline.split(" · ");
                      const last = segments[segments.length - 1];
                      const rest = segments.slice(0, -1).join(" · ");
                      return (
                        <span className="font-display text-current text-[11px] tracking-[0.2em] whitespace-nowrap leading-none uppercase">
                          {rest}
                          <span className="opacity-50 mx-[0.3em]">·</span>
                          <span className="text-[#D97757]">{last}</span>
                        </span>
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </Link>
        {/* Nav typography: text-base was overwhelming the bar vs the 11px tagline +
            logo lockup, and pt-1 was pushing items below the optical center. Dropped to
            text-sm (14px) matching the Contact button + EN/PL toggle, and removed the
            pt-1 so items center against the logo on the parent's items-center axis. */}
        {!NAV_CONSOLE && (
        <nav className="pointer-events-auto hidden md:flex gap-4 text-sm font-sans font-medium lowercase tracking-normal items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn(
                "group relative px-2 py-1 transition-colors duration-300 hover:text-[#D4FF00]",
                location === item.href ? "text-white" : "text-white"
              )}>
                {/* Container for the text to prevent layout shift */}
                <div className="relative overflow-hidden flex flex-col items-center justify-center">
                    {/* Invisible spacer text with heaviest weight and widest tracking to reserve space */}
                    <span className="font-medium tracking-[0.15em] opacity-0 invisible select-none" aria-hidden="true">
                        {item.label}
                    </span>
                    
                    {/* Visible text that animates weight and tracking */}
                    <span className={cn(
                        "absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out",
                        "font-normal tracking-normal group-hover:font-medium group-hover:tracking-[0.15em]",
                        location === item.href && "font-medium tracking-normal"
                    )}>
                        {item.label}
                    </span>
                </div>
                
                {/* Active Dot */}
                {location === item.href && (
                    <motion.div 
                        layoutId="active-dot"
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#D4FF00] rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                )}
            </Link>
          ))}

          {/* Contact button only - Schedule was removed from desktop nav.
              Rationale: Calendly link already exists in Hero CTA, FloatingBriefCTA (persistent
              global element), and Contact page. Three Calendly entry points was bloating
              the header and causing nav-wrap on 1024-1280px widths. Mobile keeps Schedule
              in the spacious overlay menu. */}
          <div className="flex gap-2 ml-3">
             <Link href={contactButton.href} className="group relative px-2 py-1 overflow-hidden">
                 <div className="relative z-10 font-sans font-medium text-sm lowercase tracking-normal">
                    <span className="block text-[#D4FF00] group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        {contactButton.label}
                    </span>
                    <span className="absolute inset-0 block text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                        {contactButton.label}
                    </span>
                 </div>
             </Link>
          </div>
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Switch to Polish' : 'Przełącz na angielski'}
            className="ml-3 text-sm font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
            <span className="mx-2">/</span>
            <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
          </button>

          {/* Theme Switcher - moved from floating bottom-right corner */}
          <ThemeToggle />

          {/* Background music - animated sound-wave toggle (Planet Rock ambient,
              ~50% vol). Its play/turn-off label appears in a tooltip below. */}
          <SoundWaveWidget className="ml-3" />
        </nav>
        )}

        {/* Console mode - right cluster: status readout + utilities; links live in the panel.
            ml-auto glues the cluster to the burger on the right edge so the logo's
            scroll-collapse never shifts it (justify-between would center it otherwise). */}
        {NAV_CONSOLE && (
          <div className="pointer-events-auto hidden md:flex items-center gap-5 ml-auto mr-6">
            <DecodeText
              key={sectionLabel}
              text={`[ ${sectionLabel} ]`}
              duration={350}
              className="font-mono text-[10px] tracking-[0.25em] uppercase opacity-60"
            />
            <button
              onClick={toggleLanguage}
              aria-label={language === 'en' ? 'Switch to Polish' : 'Przełącz na angielski'}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors"
            >
              <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
              <span className="mx-2">/</span>
              <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
            </button>
            <ThemeToggle />
            <SoundWaveWidget />
          </div>
        )}

        {/* Mobile Hamburger */}
        <motion.button
            ref={menuTriggerRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
                "pointer-events-auto group relative flex flex-col justify-center items-center w-12 h-12 gap-1.5 cursor-pointer z-[1000] rounded-none backdrop-blur-sm outline-none focus:outline-none",
                !NAV_CONSOLE && "md:hidden"
            )}
            animate={{
                backgroundColor: "rgba(212, 255, 0, 0)" // Always transparent
            }}
            transition={{ duration: 0.3 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-overlay"
        >
           {/* Two IDENTICAL lines, both absolutely positioned from the button
               center with the exact same structure - only the sign of the
               offset differs. This guarantees identical subpixel rasterization
               at any DPR/zoom (flex stacking made them land on different pixel
               fractions, rendering one thinner than the other). Closed: centers
               at ±4px. Open: both at center, rotated ±45 = clean X. The middle
               hover-affordance line is equally centered and out of flow. */}
           <motion.div
             className="absolute w-6 h-[2px] rounded-none"
             style={{ left: "50%", top: "50%" }}
             animate={{
               backgroundColor: (theme === 'light' || isLimeTheme) ? "#000000" : "#D4FF00",
               x: -12,
               y: isMenuOpen ? -1 : -5,
               rotate: isMenuOpen ? 45 : 0
             }}
             transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
           />
           <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
             <div
               className={cn(
                 "w-6 h-[2px] rounded-none transition-[opacity,transform] duration-300 ease-out",
                 (theme === 'light' || isLimeTheme) ? "bg-black" : "bg-[#D4FF00]",
                 isMenuOpen
                   ? "opacity-0 scale-x-0"
                   : "opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100"
               )}
             />
           </span>
           <motion.div
             className="absolute w-6 h-[2px] rounded-none"
             style={{ left: "50%", top: "50%" }}
             animate={{
               backgroundColor: (theme === 'light' || isLimeTheme) ? "#000000" : "#D4FF00",
               x: -12,
               y: isMenuOpen ? -1 : 3,
               rotate: isMenuOpen ? -45 : 0
             }}
             transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
           />
        </motion.button>
        </div>
      </header>

      {/* Console panel (NAV_CONSOLE) - anchored dark panel, all viewports.
          ALWAYS MOUNTED, state-driven show/hide. AnimatePresence was leaving
          both the backdrop and the panel in the DOM after exit (opacity 0,
          pointer-events still active) - an invisible full-screen wall that
          killed scrolling and clicks after closing the menu. Deterministic
          animate + pointerEvents + inert removes that entire failure class. */}
      {NAV_CONSOLE && (
        <>
          <motion.div
            initial={false}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[990] bg-black/60 backdrop-blur-[6px]"
            style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <motion.div
            ref={menuOverlayRef}
            id="mobile-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            aria-hidden={!isMenuOpen}
            {...(!isMenuOpen ? ({ inert: "" } as Record<string, string>) : {})}
            initial={false}
            animate={isMenuOpen ? { opacity: 1, y: 0, scaleY: 1 } : { opacity: 0, y: -14, scaleY: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ pointerEvents: isMenuOpen ? "auto" : "none", visibility: undefined }}
            className="fixed z-[996] origin-top inset-x-0 top-0 h-[100dvh] md:h-auto md:inset-x-auto md:right-3 md:top-3 md:bottom-3 w-full md:w-[440px] bg-[#0A0A0A] md:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.7),0_2px_24px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden"
          >
           {/* Three-zone layout so the CTAs are ALWAYS inside the fold, on any
               viewport height (scaled screens included): fixed top spacing that
               clears the header, a links zone that is the ONLY thing allowed to
               shrink/scroll, and a bottom-pinned CTA zone. Link row height and
               top clearance scale fluidly with viewport height (vh clamps), so
               on short screens everything compresses before anything scrolls. */}
           <div className="shrink-0 pt-28 md:pt-[clamp(4.5rem,11vh,6rem)]" />
           <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto px-8">

            <nav className="flex flex-col">
              {consoleItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={false}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                  transition={{ duration: 0.45, delay: isMenuOpen ? 0.08 + i * 0.05 : 0, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/5"
                >
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-4 py-3.5 md:py-[clamp(0.375rem,1.2vh,0.625rem)] outline-none focus-visible:ring-1 focus-visible:ring-[#D4FF00]/60"
                  >
                    <span className="font-mono text-[10px] text-neutral-600 group-hover:text-[#D4FF00] transition-colors duration-300 w-5 shrink-0">
                      0{i + 1}
                    </span>
                    <DecodeText
                      text={item.label}
                      active={isMenuOpen}
                      delay={80 + i * 50}
                      duration={420}
                      className={cn(
                        "font-sans font-normal text-2xl md:text-[clamp(17px,2.6vh,22px)] lowercase tracking-normal transition-colors duration-300",
                        location === item.href ? "text-[#D4FF00]" : "text-white group-hover:text-[#D4FF00]"
                      )}
                    />
                    {location === item.href && (
                      <span className="w-1.5 h-1.5 bg-[#D4FF00] self-center ml-auto" aria-hidden="true" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
           </div>

           {/* Bottom-pinned zone: CTAs (+ mobile utilities) can never leave the fold */}
           <div className="shrink-0 px-8 pb-8 md:pb-5">
            {/* CTA tiers - grammar from design-system section 4 */}
            <motion.div
              initial={false}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ delay: isMenuOpen ? 0.45 : 0, duration: 0.5 }}
              className="mt-6 md:mt-4 flex flex-col gap-3 md:gap-2.5"
            >
              {/* Lighter CTA weight per Reszek: one slim lime primary, and the
                  secondary demoted to a quiet text link - the previous two
                  full plates outweighed the list above them. */}
              <Link
                href="/brief"
                className="block bg-[#D4FF00] text-black text-center font-display uppercase tracking-[0.18em] text-xs px-7 py-3.5 md:py-2.5 hover:bg-white transition-colors duration-300"
              >
                {language === 'pl' ? 'Rozpocznij projekt' : 'Start a project'}
              </Link>
              <a
                href={scheduleButton.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 py-2 font-display uppercase tracking-[0.18em] text-xs text-neutral-400 hover:text-[#D4FF00] transition-colors duration-300"
              >
                <span>{scheduleButton.label}</span>
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </motion.div>

            {/* utilities + canon line */}
            <motion.div
              initial={false}
              animate={{ opacity: isMenuOpen ? 1 : 0 }}
              transition={{ delay: isMenuOpen ? 0.55 : 0, duration: 0.5 }}
              className="md:hidden mt-8 pt-5 border-t border-white/10 flex items-center justify-end gap-8"
            >
              <button
                onClick={toggleLanguage}
                aria-label={language === 'en' ? 'Switch to Polish' : 'Przełącz na angielski'}
                className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors"
              >
                <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
                <span className="mx-2">/</span>
                <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
              </button>
              <button
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-white transition-colors"
              >
                <span className={cn(theme === 'light' && "text-[#D4FF00]")}>LIGHT</span>
                <span className="mx-2">/</span>
                <span className={cn(theme === 'dark' && "text-[#D4FF00]")}>DARK</span>
              </button>
              <SoundWaveWidget />
            </motion.div>
           </div>
          </motion.div>
        </>
      )}

      {/* Classic fullscreen mobile overlay (NAV_CONSOLE = false path) */}
      <AnimatePresence>
        {isMenuOpen && !NAV_CONSOLE && (
            <motion.div
                ref={menuOverlayRef}
                id="mobile-menu-overlay"
                role="dialog"
                aria-modal="true"
                aria-label="Main navigation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Custom gentle ease
                className="fixed inset-0 bg-[#050505] z-[995] flex flex-col justify-center px-8 md:hidden"
            >
                <nav className="flex flex-col gap-2">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Link 
                                href={item.href} 
                                className={cn(
                                    "text-3xl font-sans font-normal lowercase tracking-normal text-white transition-all duration-500",
                                    location === item.href ? "text-[#D4FF00] font-medium" : "opacity-60 hover:opacity-100 hover:text-[#D4FF00] hover:tracking-[0.1em]"
                                )}
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        transition={{ duration: 0.8, delay: 0.2 + navItems.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link 
                            href={contactButton.href}
                            className={cn(
                                "text-3xl font-sans font-normal lowercase tracking-normal text-white transition-all duration-500",
                                location === contactButton.href ? "text-[#D4FF00] font-medium" : "opacity-60 hover:opacity-100 hover:text-[#D4FF00] hover:tracking-[0.1em]"
                            )}
                        >
                            {contactButton.label}
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                        transition={{ duration: 0.8, delay: 0.2 + (navItems.length + 1) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <a 
                            href={scheduleButton.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl font-sans font-normal lowercase tracking-normal text-[#D4FF00] transition-all duration-500 hover:tracking-[0.1em]"
                        >
                            {scheduleButton.label}
                        </a>
                    </motion.div>
                </nav>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 flex gap-8 items-center"
                >
                     <button
                        onClick={toggleLanguage}
                        aria-label={language === 'en' ? 'Switch to Polish' : 'Przełącz na angielski'}
                        className="text-lg font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                      >
                        <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
                        <span className="mx-2">/</span>
                        <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
                      </button>

                      <button
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="text-lg font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                      >
                        <span className={cn(theme === 'light' && "text-[#D4FF00]")}>LIGHT</span>
                        <span className="mx-2">/</span>
                        <span className={cn(theme === 'dark' && "text-[#D4FF00]")}>DARK</span>
                      </button>

                      {/* Background music - same sound-wave toggle as desktop nav */}
                      <SoundWaveWidget />
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}