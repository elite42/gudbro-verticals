/**
 * useTranslation - Custom hook for managing translations
 *
 * Usage:
 * const { t, language, setLanguage } = useTranslation();
 * <h1>{t.feedback.rating.title}</h1>
 *
 * Features:
 * - Automatic fallback to English for missing translations
 * - Dev mode logging for missing keys
 * - Type-safe access to translation keys
 * - Validates language against merchant's enabled languages
 */

'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { translations, Language, Translations, replacePlaceholders } from './translations';
import { languagePreferencesStore } from './language-preferences';

const DEFAULT_LANGUAGE: Language = 'en';

// Languages that have UI translations available
const AVAILABLE_UI_TRANSLATIONS: Language[] = ['en', 'vi', 'it'];

// Track logged missing keys to avoid console spam
const loggedMissingKeys = new Set<string>();

/**
 * Create a proxy that falls back to English for missing translations
 * This allows the app to work even when translations are incomplete
 */
function createFallbackProxy<T extends object>(
  target: T,
  fallback: T,
  path: string = ''
): T {
  return new Proxy(target, {
    get(obj, prop: string | symbol) {
      if (typeof prop === 'symbol') return undefined;

      const value = (obj as Record<string, unknown>)[prop];
      const fallbackValue = (fallback as Record<string, unknown>)[prop];
      const currentPath = path ? `${path}.${prop}` : prop;

      // If value is missing, use fallback
      if (value === undefined || value === null) {
        if (process.env.NODE_ENV === 'development' && !loggedMissingKeys.has(currentPath)) {
          loggedMissingKeys.add(currentPath);
          console.warn(`[i18n] Missing translation key: "${currentPath}" - using English fallback`);
        }
        return fallbackValue;
      }

      // If value is an object, recursively proxy it
      if (typeof value === 'object' && value !== null && typeof fallbackValue === 'object') {
        return createFallbackProxy(
          value as object,
          fallbackValue as object,
          currentPath
        );
      }

      return value;
    }
  }) as T;
}

/**
 * Get language from languagePreferencesStore
 * @param merchantLanguages - Optional list of merchant's enabled language codes
 * @param primaryLanguage - Optional merchant's primary language (fallback before English)
 */
function getInitialLanguage(
  merchantLanguages?: string[],
  primaryLanguage?: string
): Language {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const prefs = languagePreferencesStore.get();
  const savedLang = prefs.selectedLanguage;

  // If merchant has configured languages, validate against those
  if (merchantLanguages && merchantLanguages.length > 0) {
    // Check if saved language is in merchant's enabled languages
    if (savedLang && merchantLanguages.includes(savedLang)) {
      // Also check if we have UI translations for this language
      if (AVAILABLE_UI_TRANSLATIONS.includes(savedLang as Language)) {
        return savedLang as Language;
      }
      // Language is merchant-enabled but no UI translations - will use English UI with that language for content
      // For now, fall back to primary or default
    }

    // Try merchant's primary language
    if (primaryLanguage && AVAILABLE_UI_TRANSLATIONS.includes(primaryLanguage as Language)) {
      return primaryLanguage as Language;
    }
  }

  // Legacy validation: check against hardcoded list
  if (savedLang && AVAILABLE_UI_TRANSLATIONS.includes(savedLang as Language)) {
    return savedLang as Language;
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
 *
 * Returns translations with automatic fallback to English for missing keys.
 * In development mode, logs warnings for missing translations.
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

  // Get translations with fallback to English
  // Memoize to avoid creating new proxy on every render
  const t = useMemo(() => {
    const currentTranslations = translations[language];
    const englishTranslations = translations['en'];

    // If already English, no fallback needed
    if (language === 'en') {
      return currentTranslations;
    }

    // Create fallback proxy for non-English languages
    return createFallbackProxy(currentTranslations, englishTranslations);
  }, [language]);

  return {
    t,
    language,
    setLanguage,
    isClient,
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

/**
 * Check if a language code has available UI translations
 */
export function hasUITranslations(langCode: string): boolean {
  return AVAILABLE_UI_TRANSLATIONS.includes(langCode as Language);
}

/**
 * Get the list of languages that have UI translations available
 */
export function getAvailableUITranslations(): Language[] {
  return [...AVAILABLE_UI_TRANSLATIONS];
}

/**
 * Validate a language code against merchant's enabled languages
 * Returns a valid Language code or the default
 */
export function validateLanguage(
  langCode: string,
  merchantLanguages?: string[],
  primaryLanguage?: string
): Language {
  // If merchant has configured languages
  if (merchantLanguages && merchantLanguages.length > 0) {
    // Check if the language is enabled by merchant AND has UI translations
    if (merchantLanguages.includes(langCode) && AVAILABLE_UI_TRANSLATIONS.includes(langCode as Language)) {
      return langCode as Language;
    }

    // If not, try primary language
    if (primaryLanguage && AVAILABLE_UI_TRANSLATIONS.includes(primaryLanguage as Language)) {
      return primaryLanguage as Language;
    }
  }

  // Fallback: check if it's a valid UI language
  if (AVAILABLE_UI_TRANSLATIONS.includes(langCode as Language)) {
    return langCode as Language;
  }

  return DEFAULT_LANGUAGE;
}
