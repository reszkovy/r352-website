import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { R352Symbol, R352Text } from "./R352Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";
import { useTheme } from "@/app/context/ThemeContext";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";

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

  // Use Lenis scroll callback for reliable scroll tracking on desktop, and standard scroll listener for mobile
  useLenis((lenis) => {
    setIsScrolled(lenis.scroll > 150);
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
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

  // Lock scroll when menu is open
  useEffect(() => {
    if (lenis) {
      if (isMenuOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
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

  // Nav hierarchy (post-Framework deletion): Work (proof) → Process (r3loop — THE
  // methodology) → Philosophy (how I think) → Services (how to buy) → Journal (content).
  // Framework was deleted; r3loop now stands alone as the single methodology brand.
  const navItems = [
    { href: "/work", label: t("nav.work") },
    { href: "/process", label: t("nav.process") },
    { href: "/philosophy", label: t("nav.philosophy") },
    { href: "/services", label: t("nav.services") },
    { href: "/journal", label: t("nav.journal") },
  ];

  // Nav contact — familiar pattern. Premium signal moved to FloatingBriefCTA (persistent, global).
  // /contact = hybrid landing (Brief primary + mailto secondary). /brief = wizard entry.
  const contactButton = { href: "/contact", label: t("nav.contact") };
  const scheduleButton = { href: "https://calendly.com/p-reszkovy/30min", label: t("nav.schedule") };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  const tagline = t("nav.tagline");

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-[999] transition-all duration-700",
        isScrolled ? "pointer-events-auto is-scrolled" : "pointer-events-none",
        isLimeTheme 
          ? "text-black py-4 md:py-6" 
          : cn("text-white transition-all duration-700", isScrolled ? "py-4 md:py-6" : "mix-blend-difference py-6 md:py-8")
      )}>
        {/* Dark Mode Version - Soft gradient shadow */}
        <div 
          className={cn(
            "absolute inset-0 -z-10 bg-gradient-to-b from-[#050505]/95 via-[#050505]/70 to-transparent pointer-events-none transition-all duration-700 h-[160%]",
            isScrolled && theme === 'dark' && !isLimeTheme ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Light Mode Version - Light Blur gradient shadow */}
        <div 
          className={cn(
            "absolute inset-0 -z-10 pointer-events-none transition-all duration-700 h-[160%]",
            isScrolled && (theme === 'light' || isLimeTheme) ? "opacity-100 backdrop-blur-md" : "opacity-0"
          )}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)"
          }}
        />
        <div className="px-8 md:px-12 flex justify-between items-center w-full relative z-10">
        <Link
            href="/"
            className="pointer-events-auto cursor-pointer group relative flex items-center z-[1000] gap-[5px]"
        >
            {/* Symbol - R Icon */}
            <R352Symbol className="h-10 w-auto text-[#DAFF45]" color="currentColor" />

            {/* Text - 352 + always-visible positioning tagline.
                Tagline reveals on logo hover was killed — positioning insight ("Strategic
                Design Partner") needs to be visible by default, not hidden behind an interaction.
                Tagline hides on scroll alongside the 352 text — only the R-mark remains. */}
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

                  {/* Static positioning tagline — visible on lg+ screens (≥1024px)
                      where horizontal room allows. Pipe divider uses bg-current + opacity
                      instead of border-current/20 (which Tailwind compiles unreliably
                      for currentColor). This works in dark, light, and lime themes alike. */}
                  <div className="hidden lg:flex items-center ml-5 gap-5">
                    <span aria-hidden="true" className="block w-px h-4 bg-current opacity-30" />
                    <span className="font-display text-current text-[11px] tracking-[0.2em] whitespace-nowrap leading-none uppercase">
                      {tagline}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </Link>
        {/* Nav typography: text-base was overwhelming the bar vs the 11px tagline +
            logo lockup, and pt-1 was pushing items below the optical center. Dropped to
            text-sm (14px) matching the Contact button + EN/PL toggle, and removed the
            pt-1 so items center against the logo on the parent's items-center axis. */}
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

          {/* Contact button only — Schedule was removed from desktop nav.
              Rationale: Calendly link already exists in Hero CTA, FloatingBriefCTA (persistent
              global element), and Contact page. Three Calendly entry points was bloating
              the header and causing nav-wrap on 1024–1280px widths. Mobile keeps Schedule
              in the spacious overlay menu. */}
          <div className="flex gap-2 ml-3">
             <Link href={contactButton.href} className="group relative px-2 py-1 overflow-hidden">
                 <div className="relative z-10 font-sans font-medium text-sm lowercase tracking-normal">
                    <span className="block text-[#D4FF00] group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]">
                        {contactButton.label}
                    </span>
                    <span className="absolute inset-0 block text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]">
                        {contactButton.label}
                    </span>
                 </div>
             </Link>
          </div>
          
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            aria-label={language === 'en' ? 'Switch to Polish' : 'Przełącz na angielski'}
            className="ml-4 text-sm font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
            <span className="mx-2">/</span>
            <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
          </button>

          {/* Theme Switcher — moved from floating bottom-right corner */}
          <ThemeToggle />
        </nav>
        
        {/* Mobile Hamburger */}
        <motion.button
            ref={menuTriggerRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="pointer-events-auto md:hidden group flex flex-col justify-center items-center w-12 h-12 gap-1.5 cursor-pointer z-[1000] rounded-none backdrop-blur-sm outline-none focus:outline-none"
            animate={{
                backgroundColor: "rgba(212, 255, 0, 0)" // Always transparent
            }}
            transition={{ duration: 0.3 }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu-overlay"
        >
           <motion.div 
             className="w-6 h-[3px] rounded-none origin-center"
             animate={{ 
               backgroundColor: (theme === 'light' || isLimeTheme) ? "#000000" : "#D4FF00", 
               rotate: isMenuOpen ? 45 : 0, 
               y: isMenuOpen ? 4.5 : 0 
             }}
             transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
           />
           <motion.div 
             className="w-6 h-[3px] rounded-none origin-center"
             initial={{ width: 16 }} 
             animate={{ 
               backgroundColor: (theme === 'light' || isLimeTheme) ? "#000000" : "#D4FF00", 
               rotate: isMenuOpen ? -45 : 0, 
               y: isMenuOpen ? -4.5 : 0,
               width: isMenuOpen ? 24 : 16
             }}
             transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
           />
        </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
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
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}