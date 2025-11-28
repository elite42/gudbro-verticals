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
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      // Show only converted price (clean UI)
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // Default VND formatting
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  /**
   * Compact price format: 35.000₫ → 35K (for VND only)
   */
  const formatPriceCompact = (price: number): string => {
    // Check if currency conversion is enabled
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      // Use full formatting for non-VND currencies
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // VND compact format: divide by 1000 and add K
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  return {
    formatPrice,
    formatPriceCompact,
    currencyPrefs
  };
}
