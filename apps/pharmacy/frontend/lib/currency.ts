/**
 * Currency Setup for Pharmacy PWA
 *
 * Creates app-specific currency store and converter instances using shared factories.
 * Preserves exact storage keys and behavior from the original local implementations.
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
export { CURRENCIES as AVAILABLE_CURRENCIES };
export type { CurrencyPreferences };

// --- App-specific instances ---

export const currencyPreferencesStore = createCurrencyPreferencesStore({
  storageKeyPrefix: 'gudbro-pharmacy', // matches existing key: 'gudbro-pharmacy-currency-preferences'
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
 * Pharmacy-specific price format hook.
 * Wraps the shared usePriceFormat with app-specific store and converter.
 */
export function useAppPriceFormat() {
  return useSharedPriceFormat({
    store: currencyPreferencesStore,
    formatConvertedPrice: currencyConverter.formatConvertedPrice,
    getBaseCurrency,
  });
}
