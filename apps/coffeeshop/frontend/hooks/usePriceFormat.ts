'use client';

import { useState, useEffect } from 'react';
import { currencyPreferencesStore } from '@/lib/currency-preferences';
import { formatConvertedPrice } from '@/lib/currency-converter';

/**
 * Hook for formatting prices with currency conversion support
 */
export function usePriceFormat() {
  const [currencyPrefs, setCurrencyPrefs] = useState(currencyPreferencesStore.get());

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
   * Format price with full currency symbol
   */
  const formatPrice = (price: number): string => {
    // Check if currency conversion is enabled
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'EUR') {
      // Show only converted price (clean UI)
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // Default EUR formatting for Coffee House
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  /**
   * Compact price format for Coffee House (EUR)
   */
  const formatPriceCompact = (price: number): string => {
    // Check if currency conversion is enabled
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'EUR') {
      // Use full formatting for converted currencies
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // Default EUR format for Coffee House menu
    return `€${price.toFixed(2)}`;
  };

  return {
    formatPrice,
    formatPriceCompact,
    currencyPrefs
  };
}
