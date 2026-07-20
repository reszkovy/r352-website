import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '@/app/i18n/translations';
import { R352Symbol } from '@/app/components/agency/R352Logo';

type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'r352-language-v1';

// Simple nested object access for translations
function getNestedValue(obj: any, path: string): any {
  if (!obj) return path;
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj) || path;
}

// Persisted language choice - same storage pattern as ConsentContext.
// Prerender (Puppeteer) has no stored value, so captured HTML stays EN.
function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'en' || raw === 'pl') return raw;
    // No explicit choice yet: default to Polish for Polish-locale browsers, so PL
    // visitors land on the PL version instead of English. Everyone else -> EN.
    const nav = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    if (nav.startsWith('pl')) return 'pl';
  } catch {
    // localStorage unavailable (private mode etc.) - fall through
  }
  return 'en';
}

function persistLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Silently swallow - choice simply won't persist across sessions.
  }
}

// Mantra shown on the cover, in the language being switched TO - reinforces
// what just happened. Safe fallback if the key is ever missing.
function mantraFor(lang: Language): string {
  const v = getNestedValue(translations[lang], 'hero.signature');
  return typeof v === 'string' && v !== 'hero.signature'
    ? v
    : lang === 'pl' ? 'Tempo bez chaosu.' : 'Move fast, steady cadence.';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: returning PL users get PL on first client render,
  // without a visible EN→PL flash after mount.
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);

  // Language switch plays a full-screen L->R cinematic sweep (matches the page
  // transition grammar). The actual swap is deferred until the cover is fully
  // down (700ms), so text never visibly changes on screen - it's revealed in
  // the new language as the sweep peels away. Mirrors ThemeContext timing.
  const setLanguage = (lang: Language) => {
    if (lang === language || isTransitioning) return;

    setTargetLanguage(lang);
    setIsTransitioning(true);

    // Apply once the screen is covered.
    window.setTimeout(() => {
      setLanguageState(lang);
      persistLanguage(lang);
    }, 700);

    // Tear the sweep down.
    window.setTimeout(() => {
      setIsTransitioning(false);
      setTargetLanguage(null);
    }, 1500);
  };

  const t = (path: string): any => {
    const value = getNestedValue(translations[language], path);
    // Fallback to English if translation is missing
    if (value === undefined || value === null || value === path) {
        return getNestedValue(translations['en'], path);
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
      {children}

      {/* Language Transition Overlays - horizontal L->R, mirrors ThemeContext.
          Dark cinematic sweep regardless of theme (background is NOT changing,
          so this stays the standard lime + near-black cover). */}
      <AnimatePresence>
        {isTransitioning && targetLanguage && (
          <>
            {/* Lime accent sweep */}
            <motion.div
              className="fixed top-0 left-0 w-full h-[100vh] bg-[#D4FF00]/90 z-[99998] pointer-events-none will-change-transform"
              initial={{ x: "-100%" }}
              animate={{ x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
              exit={{ x: "100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 } }}
            />

            {/* Main near-black sweep */}
            <motion.div
              className="fixed top-0 left-0 w-full h-[100vh] bg-[#0A0A0A]/95 z-[99999] pointer-events-none will-change-transform"
              initial={{ x: "-100%" }}
              animate={{ x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
              exit={{ x: "100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
            />

            {/* Static branding - revealed/concealed by the sweep via clipPath.
                Shows the mantra in the language being switched TO. */}
            <motion.div
              className="fixed inset-0 z-[100000] pointer-events-none flex items-center justify-center"
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 } }}
              exit={{ clipPath: "inset(0 100% 0 0)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 } }}
            >
              <div className="flex flex-col items-center gap-5">
                <R352Symbol className="w-7 h-7 md:w-9 md:h-9" color="#D4FF00" />
                <span className="text-[11px] md:text-sm font-display uppercase tracking-[0.3em] text-[#D4FF00]/80">
                  {mantraFor(targetLanguage)}
                </span>
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">
                  {targetLanguage === 'pl' ? 'PL' : 'EN'}
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}

// Fallback mechanism to prevent crashes in preview environments or isolated renders
const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => console.warn('setLanguage called outside of LanguageProvider'),
  isTransitioning: false,
  t: (path: string) => {
    // Attempt to use English translations as fallback
    const value = getNestedValue(translations['en'], path);
    return value || path;
  }
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Instead of throwing, return a default context to allow isolated component rendering
    // This fixes the "useLanguage must be used within a LanguageProvider" error in preview environments
    return defaultContext;
  }
  return context;
}
