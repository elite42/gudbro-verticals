/**
 * i18n Configuration
 *
 * Defines supported locales and default locale for the backoffice.
 * Uses a cookie-based approach for locale detection to avoid
 * restructuring existing routes with [locale] segments.
 */

export const locales = ['en', 'it'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
};

// Cookie name for storing user's locale preference
export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

// Validate if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
