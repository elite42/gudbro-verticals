/**
 * Currency Converter Factory
 *
 * Creates a currency converter instance with configurable base currency,
 * fallback rates, and optional async rate fetching (e.g. from Supabase).
 *
 * KEY CONCEPT:
 * - Each locale has a BASE CURRENCY (the currency they set prices in)
 * - Tourists can convert to their preferred currency for reference
 * - The fetchRates parameter is optional to avoid forcing Supabase dependency
 */

// --- Types ---

export interface ExchangeRates {
  base: string; // The base currency (e.g. 'VND')
  rates: Record<string, number>;
  lastUpdated: number; // timestamp
}

export interface ConversionConfig {
  baseCurrency: string;
  fallbackRates: ExchangeRates;
  fetchRates?: () => Promise<ExchangeRates>;
}

export interface CurrencyConverter {
  convert(amount: number, toCurrency: string): number;
  formatConvertedPrice(amount: number, toCurrency: string): string;
  getRate(toCurrency: string): number;
  refreshRates(): Promise<ExchangeRates>;
}

// --- Constants ---

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Default fallback rates relative to VND.
 * Used when no fetchRates is provided or when fetch fails.
 */
export const DEFAULT_FALLBACK_RATES: ExchangeRates = {
  base: 'VND',
  rates: {
    VND: 1,
    USD: 0.00004, // 1 VND ~ 0.00004 USD (1 USD ~ 25,000 VND)
    EUR: 0.0000375, // 1 VND ~ 0.0000375 EUR (1 EUR ~ 26,667 VND)
    GBP: 0.0000316, // 1 VND ~ 0.0000316 GBP (1 GBP ~ 31,646 VND)
    AUD: 0.0000615, // 1 VND ~ 0.0000615 AUD (1 AUD ~ 16,260 VND)
    JPY: 0.006, // 1 VND ~ 0.006 JPY (1 JPY ~ 167 VND)
    KRW: 0.0556, // 1 VND ~ 0.0556 KRW (1 KRW ~ 18 VND)
    CNY: 0.000288, // 1 VND ~ 0.000288 CNY (1 CNY ~ 3,472 VND)
    SGD: 0.0000533, // 1 VND ~ 0.0000533 SGD (1 SGD ~ 18,762 VND)
    THB: 0.00138, // 1 VND ~ 0.00138 THB (1 THB ~ 725 VND)
  },
  lastUpdated: Date.now(),
};

// --- Formatting Helpers ---

/**
 * Format VND price with "k" for thousands and "M" for millions.
 * Vietnamese prices are always in thousands; minimum denomination is 1000.
 *
 * Examples:
 * - 65000 -> "65k"
 * - 1500000 -> "1.5M"
 * - 2000000 -> "2M"
 */
export function formatVNDPrice(vndPrice: number): string {
  if (vndPrice >= 1_000_000) {
    const inMillions = vndPrice / 1_000_000;
    const formatted = inMillions % 1 === 0 ? inMillions.toString() : inMillions.toFixed(1);
    return `${formatted}M`;
  }
  const inThousands = Math.round(vndPrice / 1000);
  return `${inThousands}k`;
}

// --- Factory ---

/**
 * Create a currency converter instance.
 *
 * @param config - Configuration with baseCurrency, fallbackRates, and optional fetchRates
 * @returns Converter with convert, formatConvertedPrice, getRate, refreshRates
 *
 * @example
 * ```ts
 * const converter = createCurrencyConverter({
 *   baseCurrency: 'VND',
 *   fallbackRates: DEFAULT_FALLBACK_RATES,
 *   fetchRates: async () => {
 *     // fetch from Supabase or external API
 *   },
 * });
 *
 * converter.formatConvertedPrice(65000, 'USD'); // "$2.60"
 * converter.formatConvertedPrice(65000, 'VND'); // "65k"
 * converter.formatConvertedPrice(1500000, 'VND'); // "1.5M"
 * ```
 */
export function createCurrencyConverter(config: ConversionConfig): CurrencyConverter {
  const STORAGE_KEY = `gudbro-${config.baseCurrency.toLowerCase()}-exchange-rates`;

  let currentRates: ExchangeRates = config.fallbackRates;

  // --- Internal cache helpers ---

  function getCachedRates(): ExchangeRates | null {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed: ExchangeRates = JSON.parse(stored);
      if (Date.now() - parsed.lastUpdated > CACHE_DURATION) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  function cacheRates(rates: ExchangeRates): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
    } catch {
      // localStorage may be full or disabled
    }
  }

  // Initialize from cache if available
  const cached = getCachedRates();
  if (cached) {
    currentRates = cached;
  }

  // --- Public API ---

  function convert(amount: number, toCurrency: string): number {
    if (toCurrency === config.baseCurrency) return amount;
    const rate = currentRates.rates[toCurrency];
    if (!rate) {
      console.warn(`[CurrencyConverter] No exchange rate found for ${toCurrency}`);
      return amount;
    }
    return amount * rate;
  }

  function formatConvertedPrice(amount: number, toCurrency: string): string {
    const converted = convert(amount, toCurrency);

    // VND: use "k" for thousands, "M" for millions
    if (toCurrency === 'VND') {
      return formatVNDPrice(converted);
    }

    // JPY/KRW: zero decimal places
    const zeroDecimalCurrencies = ['JPY', 'KRW'];
    const fractionDigits = zeroDecimalCurrencies.includes(toCurrency) ? 0 : 2;

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: toCurrency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });

    return formatter.format(converted);
  }

  function getRate(toCurrency: string): number {
    if (toCurrency === config.baseCurrency) return 1;
    return currentRates.rates[toCurrency] ?? 0;
  }

  async function refreshRates(): Promise<ExchangeRates> {
    if (config.fetchRates) {
      try {
        const fetched = await config.fetchRates();
        currentRates = fetched;
        cacheRates(fetched);
        return fetched;
      } catch (error) {
        console.error('[CurrencyConverter] Failed to fetch rates:', error);
        return currentRates;
      }
    }
    // No fetchRates provided, return current (fallback) rates
    return currentRates;
  }

  return {
    convert,
    formatConvertedPrice,
    getRate,
    refreshRates,
  };
}
