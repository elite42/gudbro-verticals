import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { defaultLocale, isValidLocale, LOCALE_COOKIE_NAME, type Locale } from './config';

/**
 * Server-side locale detection
 *
 * Priority:
 * 1. Cookie (user preference)
 * 2. Accept-Language header (browser preference)
 * 3. Default locale (English)
 */
async function getLocale(): Promise<Locale> {
  // 1. Check cookie
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (localeCookie && isValidLocale(localeCookie)) {
    return localeCookie;
  }

  // 2. Check Accept-Language header
  const headerStore = await headers();
  const acceptLanguage = headerStore.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7")
    const languages = acceptLanguage.split(',').map((lang) => {
      const [code] = lang.trim().split(';');
      return code.split('-')[0].toLowerCase();
    });

    for (const lang of languages) {
      if (isValidLocale(lang)) {
        return lang;
      }
    }
  }

  // 3. Default
  return defaultLocale;
}

export default getRequestConfig(async () => {
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
