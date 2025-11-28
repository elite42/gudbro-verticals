/**
 * useTranslation - Custom hook for managing translations
 *
 * Usage:
 * const { t, language, setLanguage } = useTranslation();
 * <h1>{t.feedback.rating.title}</h1>
 */

'use client';

import { useState, useEffect } from 'react';
import { translations, Language, Translations, replacePlaceholders } from './translations';
import { languagePreferencesStore } from './language-preferences';

const DEFAULT_LANGUAGE: Language = 'en';

/**
 * Get language from languagePreferencesStore
 */
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const prefs = languagePreferencesStore.get();
  const lang = prefs.selectedLanguage as Language;

  // Validate language is supported by our translations
  if (['en', 'vi', 'it'].includes(lang)) {
    return lang;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Save language preference using languagePreferencesStore
 */
function saveLanguage(lang: Language): void {
  if (typeof window !== 'undefined') {
    languagePreferencesStore.set({ selectedLanguage: lang });
  }
}

/**
 * useTranslation Hook
 */
export function useTranslation() {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [isClient, setIsClient] = useState(false);

  // Initialize language on client side only
  useEffect(() => {
    setIsClient(true);
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
  }, []);

  // Listen for language changes from other components
  useEffect(() => {
    if (!isClient) return;

    const handleLanguageChange = () => {
      const newLang = getInitialLanguage();
      setLanguageState(newLang);
    };

    window.addEventListener('language-preferences-updated', handleLanguageChange);
    return () => window.removeEventListener('language-preferences-updated', handleLanguageChange);
  }, [isClient]);

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  };

  // Get translations for current language
  const t = translations[language];

  return {
    t,
    language,
    setLanguage,
    // Helper function for placeholders
    replace: replacePlaceholders
  };
}

/**
 * Hook to get current language without translations
 * Useful for components that only need to know the current language
 */
export function useLanguage() {
  const { language, setLanguage } = useTranslation();
  return { language, setLanguage };
}
