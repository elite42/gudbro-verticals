/**
 * Currency Setup for Laundry PWA
 *
 * Creates app-specific currency store and converter instances using shared factories.
 * Preserves exact storage keys and behavior from the original local implementations.
 */

import {
  createCurrencyPreferencesStore,
  createCurrencyConverter,
  DEFAULT_FALLBACK_RATES,
} from '@gudbro/utils';
import { usePriceFormat as useSharedPriceFormat } from '@gudbro/hooks';

// --- App-specific instances ---

export const currencyPreferencesStore = createCurrencyPreferencesStore({
  storageKeyPrefix: 'gudbro-laundry', // matches existing key: 'gudbro-laundry-currency-preferences'
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
 * Laundry-specific price format hook.
 * Wraps the shared usePriceFormat with app-specific store and converter.
 */
export function useAppPriceFormat() {
  return useSharedPriceFormat({
    store: currencyPreferencesStore,
    formatConvertedPrice: currencyConverter.formatConvertedPrice,
    getBaseCurrency,
  });
}
