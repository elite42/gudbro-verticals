/**
 * useDirection Hook
 *
 * Manages text direction (LTR/RTL) based on current language.
 * Automatically updates document direction when language changes.
 *
 * RTL Languages supported:
 * - Arabic (ar)
 * - Hebrew (he)
 * - Persian/Farsi (fa)
 * - Urdu (ur)
 * - Pashto (ps)
 * - Divehi (dv)
 *
 * Note: This hook reads the selected language directly from languagePreferencesStore
 * to support RTL for languages that may not have complete UI translations yet.
 */

import { useEffect, useMemo, useState } from 'react';
import { languagePreferencesStore } from '@/lib/language-preferences';

// Languages that use Right-to-Left text direction
const RTL_LANGUAGES = new Set(['ar', 'he', 'fa', 'ur', 'ps', 'dv']);

export type Direction = 'ltr' | 'rtl';

export interface UseDirectionResult {
  /** Current text direction */
  direction: Direction;
  /** Whether current language is RTL */
  isRTL: boolean;
  /** CSS class for direction-aware styling */
  directionClass: string;
  /** The actual selected language code (may differ from UI translation language) */
  selectedLanguage: string;
}

/**
 * Hook to get and manage text direction based on current language
 */
export function useDirection(): UseDirectionResult {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isClient, setIsClient] = useState(false);

  // Initialize on client
  useEffect(() => {
    setIsClient(true);
    const prefs = languagePreferencesStore.get();
    setSelectedLanguage(prefs.selectedLanguage || 'en');
  }, []);

  // Listen for language changes
  useEffect(() => {
    if (!isClient) return;

    const handleLanguageChange = () => {
      const prefs = languagePreferencesStore.get();
      setSelectedLanguage(prefs.selectedLanguage || 'en');
    };

    window.addEventListener('language-preferences-updated', handleLanguageChange);
    return () => window.removeEventListener('language-preferences-updated', handleLanguageChange);
  }, [isClient]);

  const isRTL = useMemo(() => RTL_LANGUAGES.has(selectedLanguage), [selectedLanguage]);
  const direction: Direction = isRTL ? 'rtl' : 'ltr';

  // Update document direction when language changes
  useEffect(() => {
    if (!isClient) return;

    // Set dir attribute on html element
    document.documentElement.dir = direction;
    document.documentElement.lang = selectedLanguage;

    // Add/remove RTL class for Tailwind utilities
    if (isRTL) {
      document.documentElement.classList.add('rtl');
      document.documentElement.classList.remove('ltr');
    } else {
      document.documentElement.classList.add('ltr');
      document.documentElement.classList.remove('rtl');
    }

    // Log for debugging in development
    if (process.env.NODE_ENV === 'development') {
      // Silently ignore
    }
  }, [direction, selectedLanguage, isClient, isRTL]);

  return {
    direction,
    isRTL,
    directionClass: isRTL ? 'rtl' : 'ltr',
    selectedLanguage,
  };
}

/**
 * Utility function to check if a language code is RTL
 * Can be used outside of React components
 */
export function isRTLLanguage(langCode: string): boolean {
  return RTL_LANGUAGES.has(langCode);
}

/**
 * Get direction for a specific language code
 * Can be used outside of React components
 */
export function getLanguageDirection(langCode: string): Direction {
  return RTL_LANGUAGES.has(langCode) ? 'rtl' : 'ltr';
}
