/**
 * Currency Setup for Gym PWA
 *
 * Creates app-specific currency store and converter instances using shared factories.
 * Preserves exact storage keys and behavior from the original local implementations.
 */

import {
  createCurrencyPreferencesStore,
  createCurrencyConverter,
  DEFAULT_FALLBACK_RATES,
  formatVNDPrice,
} from '@gudbro/utils';
import { usePriceFormat as useSharedPriceFormat } from '@gudbro/hooks';

// Re-export formatVNDPrice for consumers that use it directly
export { formatVNDPrice };

// --- App-specific instances ---

export const currencyPreferencesStore = createCurrencyPreferencesStore({
  storageKeyPrefix: 'gudbro-gym', // matches existing key: 'gudbro-gym-currency-preferences'
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
 * Gym-specific price format hook.
 * Wraps the shared usePriceFormat with app-specific store and converter.
 */
export function useAppPriceFormat() {
  return useSharedPriceFormat({
    store: currencyPreferencesStore,
    formatConvertedPrice: currencyConverter.formatConvertedPrice,
    getBaseCurrency,
  });
}
