/**
 * Currency Setup for Workshops PWA
 *
 * Creates app-specific currency store and converter instances using shared factories.
 * Preserves exact storage keys and behavior from the original local implementations.
 *
 * NOTE: The original workshops implementation used a functional API
 * (getCurrencyPreference/setCurrencyPreference/onCurrencyChange) with
 * storageKey 'gudbro-workshops-currency'. The shared store uses a different
 * key format ('gudbro-workshops-currency-preferences'). Since no app pages
 * actually consumed the old hook or functions (workshops pages manage currency
 * state locally), this key change has no behavioral impact.
 */

import {
  createCurrencyPreferencesStore,
  createCurrencyConverter,
  DEFAULT_FALLBACK_RATES,
  CURRENCIES,
  type CurrencyPreferences,
} from '@gudbro/utils';
import { usePriceFormat as useSharedPriceFormat } from '@gudbro/hooks';

// Re-export for consumers that need the currencies list and types
export { CURRENCIES };
export type { CurrencyPreferences };

// --- App-specific instances ---

export const currencyPreferencesStore = createCurrencyPreferencesStore({
  storageKeyPrefix: 'gudbro-workshops', // key: 'gudbro-workshops-currency-preferences'
  baseCurrency: 'VND',
});

export const currencyConverter = createCurrencyConverter({
  baseCurrency: 'VND',
  fallbackRates: DEFAULT_FALLBACK_RATES,
});

export const { formatConvertedPrice } = currencyConverter;

export function getBaseCurrency(): string {
  return 'VND';
}

// --- App-specific hook wrapper ---

/**
 * Workshops-specific price format hook.
 * Wraps the shared usePriceFormat with app-specific store and converter.
 */
export function useAppPriceFormat() {
  return useSharedPriceFormat({
    store: currencyPreferencesStore,
    formatConvertedPrice: currencyConverter.formatConvertedPrice,
    getBaseCurrency,
  });
}
