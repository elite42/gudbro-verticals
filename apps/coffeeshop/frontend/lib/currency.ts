/**
 * Currency Setup for Coffeeshop PWA
 *
 * Creates app-specific currency store and converter instances using shared factories.
 * Preserves exact storage keys and behavior from the original local implementations.
 */

import {
  createCurrencyPreferencesStore,
  createCurrencyConverter,
  DEFAULT_FALLBACK_RATES,
  CURRENCIES,
  type ExchangeRates,
  type CurrencyPreferences,
} from '@gudbro/utils';
import { usePriceFormat as useSharedPriceFormat } from '@gudbro/hooks';

// Re-export for consumers that need the currencies list and types
export { CURRENCIES as AVAILABLE_CURRENCIES };
export type { CurrencyPreferences };

// --- App-specific instances ---

export const currencyPreferencesStore = createCurrencyPreferencesStore({
  storageKeyPrefix: 'gudbro', // matches existing key: 'gudbro-currency-preferences'
  baseCurrency: 'VND',
});

/**
 * Fetch rates from Supabase (coffeeshop has Supabase integration).
 * Falls back to external API, then hardcoded rates.
 */
async function fetchRates(): Promise<ExchangeRates> {
  try {
    // 1. Try Supabase first (rates are updated daily via cron)
    const { supabase, isSupabaseConfigured } = await import('./supabase');

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('exchange_rates')
        .select('base_currency, rates, fetched_at')
        .order('fetched_at', { ascending: false })
        .limit(1)
        .single();

      if (!error && data) {
        return {
          base: data.base_currency,
          rates: data.rates as Record<string, number>,
          lastUpdated: new Date(data.fetched_at).getTime(),
        };
      }
    }
  } catch (err) {
    console.error('[CurrencyConverter] Supabase fetch failed:', err);
  }

  // 2. Try external API if configured
  try {
    const API_KEY = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    if (API_KEY) {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/VND`);
      if (response.ok) {
        const apiData = await response.json();
        return {
          base: 'VND',
          rates: apiData.conversion_rates || {},
          lastUpdated: Date.now(),
        };
      }
    }
  } catch {
    // fall through to fallback
  }

  // 3. Fallback to hardcoded rates
  console.warn('[CurrencyConverter] Using fallback rates');
  return {
    ...DEFAULT_FALLBACK_RATES,
    lastUpdated: Date.now(),
  };
}

export const currencyConverter = createCurrencyConverter({
  baseCurrency: 'VND',
  fallbackRates: DEFAULT_FALLBACK_RATES,
  fetchRates,
});

export const { formatConvertedPrice } = currencyConverter;

export function getBaseCurrency(): string {
  return 'VND';
}

// --- App-specific hook wrapper ---

/**
 * Coffeeshop-specific price format hook.
 * Wraps the shared usePriceFormat with app-specific store and converter.
 */
export function useAppPriceFormat() {
  return useSharedPriceFormat({
    store: currencyPreferencesStore,
    formatConvertedPrice: currencyConverter.formatConvertedPrice,
    getBaseCurrency,
  });
}
