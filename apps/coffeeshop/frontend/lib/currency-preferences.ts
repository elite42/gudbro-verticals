/**
 * Currency Preferences Store
 * Manages user currency preferences for price display
 *
 * KEY CONCEPT:
 * - baseCurrency: The locale's native currency (set in config, e.g., VND for Vietnam)
 * - selectedCurrency: The currency tourists choose to see prices in
 * - enabled: Whether currency conversion is active (tourists toggle this on)
 */

import { coffeeshopConfig } from '@/config/coffeeshop.config';

export interface CurrencyPreferences {
  enabled: boolean;
  selectedCurrency: string; // ISO 4217 code (EUR, USD, GBP, etc.)
  baseCurrency: string; // Locale's base currency from config
}

// Get base currency from config
const BASE_CURRENCY = coffeeshopConfig.i18n.baseCurrency;

// Available currencies for tourist conversion
// Excludes base currency since that's the default display
export const AVAILABLE_CURRENCIES = [
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
] as const;

const STORAGE_KEY = 'gudbro-currency-preferences';

const DEFAULT_PREFERENCES: CurrencyPreferences = {
  enabled: false,
  selectedCurrency: BASE_CURRENCY, // Default to base currency (VND for Vietnam)
  baseCurrency: BASE_CURRENCY,
};

/**
 * Currency Preferences Store
 */
export const currencyPreferencesStore = {
  get(): CurrencyPreferences {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PREFERENCES;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_PREFERENCES, ...parsed };
    } catch (error) {
      console.error('Failed to load currency preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  },

  set(preferences: Partial<CurrencyPreferences>): void {
    if (typeof window === 'undefined') return;

    try {
      const current = this.get();
      const updated = { ...current, ...preferences };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('currency-preferences-updated'));
    } catch (error) {
      console.error('Failed to save currency preferences:', error);
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('currency-preferences-updated'));
    } catch (error) {
      console.error('Failed to clear currency preferences:', error);
    }
  },

  getCurrencyInfo(code: string) {
    return AVAILABLE_CURRENCIES.find(c => c.code === code);
  },
};
