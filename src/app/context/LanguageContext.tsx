import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/app/i18n/translations';

type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Lazy initializer: returning PL users get PL on first client render,
  // without a visible EN→PL flash after mount.
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    persistLanguage(lang);
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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Fallback mechanism to prevent crashes in preview environments or isolated renders
const defaultContext: LanguageContextType = {
  language: 'en',
  setLanguage: () => console.warn('setLanguage called outside of LanguageProvider'),
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
