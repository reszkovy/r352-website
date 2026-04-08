import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { R352Symbol, R352Text } from "./R352Logo";
import { useLanguage } from "@/app/context/LanguageContext";
import { useLenis } from "lenis/react";
import { useTheme } from "@/app/context/ThemeContext";

export function AgencyHeader() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLimeTheme, setIsLimeTheme] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const lenis = useLenis();

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

  const navItems = [
    { href: "/work", label: t("nav.work") },
    { href: "/philosophy", label: t("nav.philosophy") },
    { href: "/services", label: t("nav.services") },
    { href: "/journal", label: t("nav.journal") },
  ];

  const contactButton = { href: "/contact", label: t("nav.contact") };
  const scheduleButton = { href: "https://calendly.com/p-reszkovy/30min", label: t("nav.schedule") };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pl' : 'en');
  };

  const tagline = "YOUR AGILE DESIGN PARTNER";
  const taglineWords = tagline.split(" ");

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
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
        >
            {/* Symbol - R Icon */}
            <R352Symbol className="h-10 w-auto text-[#DAFF45]" color="currentColor" />
            
            {/* Text - 352 */}
            <AnimatePresence>
              {!isScrolled && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: -10 }}
                  animate={{ opacity: 1, width: "auto", x: 0 }}
                  exit={{ opacity: 0, width: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex items-center"
                >
                  <div> 
                    <R352Text className="h-9 w-auto text-[#DAFF45]" color="currentColor" /> 
                  </div>

                  {/* Tagline - Reveal Animation */}
                  <motion.div 
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                        width: isLogoHovered ? "auto" : 0,
                        opacity: isLogoHovered ? 1 : 0
                    }}
                    transition={{ 
                        duration: 0.8, // Slower duration for smoothness
                        ease: [0.22, 1, 0.36, 1],
                        // Small delay on exit to let words animate out first
                        delay: isLogoHovered ? 0 : 0.2 
                    }}
                    className="overflow-hidden flex items-center h-9" 
                  >
                    <div className="pl-4 flex gap-[0.3em] overflow-hidden">
                        {taglineWords.map((word, i) => (
                            <motion.span
                                key={i}
                                // Reduced font size to 13px
                                className="font-display text-white text-[13px] tracking-widest whitespace-nowrap leading-none pt-1" 
                                initial={{ y: 15, opacity: 0, rotateX: 90 }}
                                animate={{ 
                                    y: isLogoHovered ? 0 : 15, 
                                    opacity: isLogoHovered ? 1 : 0,
                                    rotateX: isLogoHovered ? 0 : 90
                                }}
                                transition={{ 
                                    duration: 0.6, // Smooth duration for words
                                    // Stagger entry, reverse stagger exit (or just slight delay)
                                    delay: isLogoHovered ? 0.2 + (i * 0.04) : 0,
                                    ease: [0.22, 1, 0.36, 1] 
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
        </Link>
        <nav className="pointer-events-auto hidden md:flex gap-4 text-base font-sans font-medium lowercase tracking-normal items-center pt-1">
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

          {/* Contact & Schedule Buttons */}
          <div className="flex gap-2 ml-4">
             {/* Schedule Button */}
             <a href={scheduleButton.href} target="_blank" rel="noopener noreferrer" className="group relative px-2 py-1 overflow-hidden">
                 <div className="relative z-10 font-sans font-medium text-sm lowercase tracking-normal">
                    <span className="block text-[#D4FF00] group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]">
                        {scheduleButton.label}
                    </span>
                    <span className="absolute inset-0 block text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]">
                        {scheduleButton.label}
                    </span>
                 </div>
             </a>

             {/* Contact Button */}
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
            className="ml-4 text-sm font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
            <span className="mx-2">/</span>
            <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
          </button>
        </nav>
        
        {/* Mobile Hamburger */}
        <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="pointer-events-auto md:hidden group flex flex-col justify-center items-center w-12 h-12 gap-1.5 cursor-pointer z-[1000] rounded-none backdrop-blur-sm outline-none focus:outline-none"
            animate={{ 
                backgroundColor: "rgba(212, 255, 0, 0)" // Always transparent
            }}
            transition={{ duration: 0.3 }}
            aria-label="Toggle menu"
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
                        className="text-lg font-display uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
                      >
                        <span className={cn(language === 'en' && "text-[#D4FF00]")}>EN</span>
                        <span className="mx-2">/</span>
                        <span className={cn(language === 'pl' && "text-[#D4FF00]")}>PL</span>
                      </button>

                      <button 
                        onClick={toggleTheme}
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