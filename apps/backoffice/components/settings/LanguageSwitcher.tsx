'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { locales, localeNames, LOCALE_COOKIE_NAME, type Locale } from '@/lib/i18n';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons';
  className?: string;
}

/**
 * Language Switcher Component
 *
 * Allows users to switch the interface language.
 * Stores preference in a cookie for persistence.
 */
export function LanguageSwitcher({ variant = 'dropdown', className = '' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('settings');
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Set the locale cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale};path=/;max-age=31536000;samesite=lax`;

    // Refresh the page to apply the new locale
    startTransition(() => {
      router.refresh();
    });
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            disabled={isPending}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              locale === loc
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } ${isPending ? 'cursor-wait opacity-50' : ''}`}
          >
            {localeNames[loc]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <label htmlFor="language-select" className="mb-1 block text-sm font-medium text-gray-700">
        {t('language')}
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={(e) => switchLocale(e.target.value as Locale)}
        disabled={isPending}
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
          isPending ? 'cursor-wait opacity-50' : ''
        }`}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <p className="mt-1 text-xs text-gray-500">{t('languageDescription')}</p>
    </div>
  );
}
