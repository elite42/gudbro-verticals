/**
 * Currency Preferences Store
 * Manages user currency preferences for price display
 */

export interface CurrencyPreferences {
  enabled: boolean;
  selectedCurrency: string; // ISO 4217 code (EUR, USD, GBP, etc.)
  baseCurrency: string; // Always VND for ROOTS
}

export const AVAILABLE_CURRENCIES = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
] as const;

const STORAGE_KEY = 'roots-currency-preferences';

const DEFAULT_PREFERENCES: CurrencyPreferences = {
  enabled: false,
  selectedCurrency: 'EUR',
  baseCurrency: 'EUR',
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
