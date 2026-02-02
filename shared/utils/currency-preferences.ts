/**
 * Currency Preferences Store Factory
 *
 * Creates per-app currency preference stores with configurable storage keys
 * to avoid localStorage collisions between PWAs.
 *
 * KEY CONCEPT:
 * - baseCurrency: The locale's native currency (set in config, e.g., VND for Vietnam)
 * - selectedCurrency: The currency tourists choose to see prices in
 * - enabled: Whether currency conversion is active (tourists toggle this on)
 */

// --- Types ---

export interface CurrencyPreferences {
  enabled: boolean;
  selectedCurrency: string; // ISO 4217 code (EUR, USD, GBP, etc.)
  baseCurrency: string; // Locale's base currency from config
}

export interface CurrencyPreferencesConfig {
  storageKeyPrefix: string; // e.g. 'gudbro-coffeeshop', 'gudbro-gym'
  baseCurrency: string; // e.g. 'VND'
}

export interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  decimalDigits: number;
}

// --- Currency Map ---

export const CURRENCIES: CurrencyInfo[] = [
  {
    code: 'VND',
    symbol: '\u20AB',
    name: 'Vietnamese Dong',
    flag: '\uD83C\uDDFB\uD83C\uDDF3',
    decimalDigits: 0,
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '\uD83C\uDDFA\uD83C\uDDF8',
    decimalDigits: 2,
  },
  {
    code: 'EUR',
    symbol: '\u20AC',
    name: 'Euro',
    flag: '\uD83C\uDDEA\uD83C\uDDFA',
    decimalDigits: 2,
  },
  {
    code: 'GBP',
    symbol: '\u00A3',
    name: 'British Pound',
    flag: '\uD83C\uDDEC\uD83C\uDDE7',
    decimalDigits: 2,
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    flag: '\uD83C\uDDE6\uD83C\uDDFA',
    decimalDigits: 2,
  },
  {
    code: 'JPY',
    symbol: '\u00A5',
    name: 'Japanese Yen',
    flag: '\uD83C\uDDEF\uD83C\uDDF5',
    decimalDigits: 0,
  },
  {
    code: 'KRW',
    symbol: '\u20A9',
    name: 'South Korean Won',
    flag: '\uD83C\uDDF0\uD83C\uDDF7',
    decimalDigits: 0,
  },
  {
    code: 'CNY',
    symbol: '\u00A5',
    name: 'Chinese Yuan',
    flag: '\uD83C\uDDE8\uD83C\uDDF3',
    decimalDigits: 2,
  },
  {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    flag: '\uD83C\uDDF8\uD83C\uDDEC',
    decimalDigits: 2,
  },
  {
    code: 'THB',
    symbol: '\u0E3F',
    name: 'Thai Baht',
    flag: '\uD83C\uDDF9\uD83C\uDDED',
    decimalDigits: 2,
  },
];

// --- Store Factory ---

export interface CurrencyPreferencesStore {
  get(): CurrencyPreferences;
  set(preferences: Partial<CurrencyPreferences>): void;
  clear(): void;
  getCurrencyInfo(code: string): CurrencyInfo | undefined;
}

/**
 * Create a currency preferences store for an app.
 *
 * @param config - Configuration with storageKeyPrefix and baseCurrency
 * @returns A store object with get/set/clear/getCurrencyInfo methods
 *
 * @example
 * ```ts
 * const store = createCurrencyPreferencesStore({
 *   storageKeyPrefix: 'gudbro-coffeeshop',
 *   baseCurrency: 'VND',
 * });
 * const prefs = store.get();
 * store.set({ enabled: true, selectedCurrency: 'USD' });
 * ```
 */
export function createCurrencyPreferencesStore(
  config: CurrencyPreferencesConfig
): CurrencyPreferencesStore {
  const STORAGE_KEY = `${config.storageKeyPrefix}-currency-preferences`;

  const DEFAULT_PREFERENCES: CurrencyPreferences = {
    enabled: false,
    selectedCurrency: config.baseCurrency,
    baseCurrency: config.baseCurrency,
  };

  return {
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

        // Dispatch event for reactive updates (matches event name used by 4/5 apps)
        window.dispatchEvent(new CustomEvent('currency-preferences-updated'));
      } catch (error) {
        console.error('Failed to save currency preferences:', error);
      }
    },

    clear(): void {
      if (typeof window === 'undefined') return;

      try {
        localStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new CustomEvent('currency-preferences-updated'));
      } catch (error) {
        console.error('Failed to clear currency preferences:', error);
      }
    },

    getCurrencyInfo(code: string): CurrencyInfo | undefined {
      return CURRENCIES.find((c) => c.code === code);
    },
  };
}
