'use client';

import { useState, useEffect } from 'react';
import { currencyPreferencesStore } from '@/lib/currency-preferences';
import { formatConvertedPrice, getBaseCurrency } from '@/lib/currency-converter';

/**
 * Hook for formatting prices with currency conversion support
 *
 * KEY CONCEPT:
 * - Prices in the database are in the locale's BASE CURRENCY (e.g., VND for Vietnam)
 * - By default, prices display in base currency format (e.g., "65k" for VND)
 * - Tourists can enable currency conversion to see prices in their preferred currency
 */
export function usePriceFormat() {
  const [currencyPrefs, setCurrencyPrefs] = useState(currencyPreferencesStore.get());
  const baseCurrency = getBaseCurrency();

  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  /**
   * Format price for display
   *
   * @param price - Price in the locale's base currency (e.g., VND)
   * @returns Formatted price string
   *
   * Examples (for Vietnam locale with baseCurrency=VND):
   * - No conversion enabled: 65000 → "65k"
   * - USD selected: 65000 → "$2.60"
   * - EUR selected: 65000 → "€2.44"
   */
  const formatPrice = (price: number): string => {
    // If currency conversion is enabled and a different currency is selected
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== baseCurrency) {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // Default: show in base currency format
    return formatConvertedPrice(price, baseCurrency);
  };

  /**
   * Compact price format (same as formatPrice for base currency)
   * Kept for backwards compatibility
   */
  const formatPriceCompact = (price: number): string => {
    return formatPrice(price);
  };

  return {
    formatPrice,
    formatPriceCompact,
    currencyPrefs,
    baseCurrency
  };
}
