import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '@/app/i18n/translations';

type Language = 'en' | 'pl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple nested object access for translations
function getNestedValue(obj: any, path: string): any {
  if (!obj) return path;
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj) || path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English
  const [language, setLanguage] = useState<Language>('en');

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
