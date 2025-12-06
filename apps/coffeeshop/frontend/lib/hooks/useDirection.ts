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
 */

import { useEffect, useMemo } from 'react';
import { useTranslation } from '@/lib/use-translation';

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
}

/**
 * Hook to get and manage text direction based on current language
 */
export function useDirection(): UseDirectionResult {
  const { language, isClient } = useTranslation();

  const isRTL = useMemo(() => RTL_LANGUAGES.has(language), [language]);
  const direction: Direction = isRTL ? 'rtl' : 'ltr';

  // Update document direction when language changes
  useEffect(() => {
    if (!isClient) return;

    // Set dir attribute on html element
    document.documentElement.dir = direction;
    document.documentElement.lang = language;

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
      console.log(`[i18n] Direction set to ${direction} for language: ${language}`);
    }
  }, [direction, language, isClient, isRTL]);

  return {
    direction,
    isRTL,
    directionClass: isRTL ? 'rtl' : 'ltr',
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
