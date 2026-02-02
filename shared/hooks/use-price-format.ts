'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CurrencyPreferencesStore, CurrencyPreferences } from '@gudbro/utils';

/**
 * Options for the usePriceFormat hook.
 *
 * Each app provides its own store instance and converter functions,
 * keeping the hook decoupled from app-specific config.
 */
export interface UsePriceFormatOptions {
  /** Currency preferences store created via createCurrencyPreferencesStore */
  store: CurrencyPreferencesStore;
  /** Format a price (in base currency) to a target currency string */
  formatConvertedPrice: (price: number, currency: string) => string;
  /** Get the app's base currency code (e.g. 'VND') */
  getBaseCurrency: () => string;
}

/**
 * Hook for formatting prices with currency conversion support.
 *
 * KEY CONCEPT:
 * - Prices in the database are in the locale's BASE CURRENCY (e.g., VND for Vietnam)
 * - By default, prices display in base currency format (e.g., "65k" for VND)
 * - Tourists can enable currency conversion to see prices in their preferred currency
 *
 * @example
 * ```tsx
 * const { formatPrice, formatPriceCompact, currencyPrefs, baseCurrency } = usePriceFormat({
 *   store: myCurrencyStore,
 *   formatConvertedPrice: myConverter.formatConvertedPrice,
 *   getBaseCurrency: () => 'VND',
 * });
 *
 * return <span>{formatPrice(65000)}</span>; // "65k" or "$2.60"
 * ```
 */
export function usePriceFormat(options: UsePriceFormatOptions) {
  const { store, formatConvertedPrice, getBaseCurrency } = options;

  const [currencyPrefs, setCurrencyPrefs] = useState<CurrencyPreferences>(store.get());
  const baseCurrency = getBaseCurrency();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(store.get());
    };

    window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
    return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
  }, [store]);

  /**
   * Format price for display.
   * If currency conversion is enabled and a different currency is selected,
   * shows converted price. Otherwise shows base currency format.
   */
  const formatPrice = useCallback(
    (price: number): string => {
      if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== baseCurrency) {
        return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
      }
      return formatConvertedPrice(price, baseCurrency);
    },
    [currencyPrefs, baseCurrency, formatConvertedPrice]
  );

  /**
   * Compact price format (same as formatPrice for now).
   * Kept for backwards compatibility and future differentiation.
   */
  const formatPriceCompact = useCallback(
    (price: number): string => {
      return formatPrice(price);
    },
    [formatPrice]
  );

  return {
    formatPrice,
    formatPriceCompact,
    currencyPrefs,
    baseCurrency,
  };
}
