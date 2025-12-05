/**
 * Currency Converter Service
 * Handles exchange rates and price conversion
 */

export interface ExchangeRates {
  base: string; // VND
  rates: Record<string, number>;
  lastUpdated: number; // timestamp
}

const STORAGE_KEY = 'roots-exchange-rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fallback rates (approximate, will be replaced by API fetch)
// Coffee House uses EUR as base currency
const FALLBACK_RATES: ExchangeRates = {
  base: 'EUR',
  rates: {
    EUR: 1,
    USD: 1.08, // 1 EUR ≈ 1.08 USD
    GBP: 0.86, // 1 EUR ≈ 0.86 GBP
    JPY: 160.5, // 1 EUR ≈ 160.5 JPY
    CNY: 7.65, // 1 EUR ≈ 7.65 CNY
    KRW: 1420, // 1 EUR ≈ 1420 KRW
    AUD: 1.63, // 1 EUR ≈ 1.63 AUD
    CAD: 1.47, // 1 EUR ≈ 1.47 CAD
    SGD: 1.42, // 1 EUR ≈ 1.42 SGD
    THB: 36.8, // 1 EUR ≈ 36.8 THB
    VND: 26500, // 1 EUR ≈ 26500 VND
  },
  lastUpdated: Date.now(),
};

/**
 * Get cached exchange rates
 */
function getCachedRates(): ExchangeRates | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const rates: ExchangeRates = JSON.parse(stored);

    // Check if cache is still valid
    const now = Date.now();
    if (now - rates.lastUpdated > CACHE_DURATION) {
      return null; // Cache expired
    }

    return rates;
  } catch (error) {
    console.error('Failed to load cached rates:', error);
    return null;
  }
}

/**
 * Save exchange rates to cache
 */
function cacheRates(rates: ExchangeRates): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
  } catch (error) {
    console.error('Failed to cache rates:', error);
  }
}

/**
 * Fetch latest exchange rates from API
 * Using exchangerate-api.io free tier (1500 requests/month)
 */
async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    // Note: For production, you'll need to sign up at https://www.exchangerate-api.com/
    // and use your API key. Free tier: 1500 requests/month
    // const API_KEY = 'your-api-key-here';
    // const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/VND`);

    // For now, using fallback rates
    // In production, uncomment above and implement proper API fetch
    console.log('⚠️ Using fallback exchange rates. Configure API key for live rates.');

    return {
      ...FALLBACK_RATES,
      lastUpdated: Date.now(),
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return FALLBACK_RATES;
  }
}

/**
 * Get exchange rates (from cache or API)
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // Try cache first
  const cached = getCachedRates();
  if (cached) {
    console.log('💱 Using cached exchange rates');
    return cached;
  }

  // Fetch fresh rates
  console.log('💱 Fetching fresh exchange rates...');
  const rates = await fetchExchangeRates();
  cacheRates(rates);

  return rates;
}

/**
 * Convert EUR price to target currency
 * Coffee House menu uses EUR as base currency
 */
export function convertPrice(
  eurPrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): number {
  if (targetCurrency === 'EUR') return eurPrice;

  const exchangeRates = rates || getCachedRates() || FALLBACK_RATES;
  const rate = exchangeRates.rates[targetCurrency];

  if (!rate) {
    console.warn(`No exchange rate found for ${targetCurrency}`);
    return eurPrice;
  }

  return eurPrice * rate;
}

/**
 * Format converted price with currency symbol
 * Takes EUR price as input and formats in target currency
 *
 * Special handling for VND: Shows in "k" format without symbol
 * e.g., 66250 VND → "66k" (locals know it's VND, tourists see the value)
 * Note: VND minimum denomination is 1000, so we always round to whole "k"
 */
export function formatConvertedPrice(
  eurPrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): string {
  const converted = convertPrice(eurPrice, targetCurrency, rates);

  // Special handling for VND - show in "k" format for readability
  // Vietnamese prices are always in thousands, locals don't need the symbol
  // Minimum VND denomination is 1000, so always round to whole numbers
  if (targetCurrency === 'VND') {
    const inThousands = Math.round(converted / 1000);
    return `${inThousands}k`;
  }

  // Format based on currency
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits: targetCurrency === 'JPY' || targetCurrency === 'KRW' ? 0 : 2,
    maximumFractionDigits: targetCurrency === 'JPY' || targetCurrency === 'KRW' ? 0 : 2,
  });

  return formatter.format(converted);
}

/**
 * Format price with both currencies (converted + original EUR)
 */
export function formatDualPrice(
  eurPrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): string {
  const convertedPrice = formatConvertedPrice(eurPrice, targetCurrency, rates);
  const eurFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
  const eurFormatted = eurFormatter.format(eurPrice);

  // For VND, the format is already compact (66k), so just add EUR reference
  return `${convertedPrice} (≈ ${eurFormatted})`;
}

/**
 * Format VND price directly (for prices already in VND)
 * e.g., 66250 → "66k", 79500 → "80k"
 * Note: VND minimum denomination is 1000, so always round to whole "k"
 */
export function formatVNDPrice(vndPrice: number): string {
  const inThousands = Math.round(vndPrice / 1000);
  return `${inThousands}k`;
}

/**
 * Manually refresh exchange rates
 */
export async function refreshExchangeRates(): Promise<ExchangeRates> {
  console.log('💱 Manually refreshing exchange rates...');
  const rates = await fetchExchangeRates();
  cacheRates(rates);

  // Dispatch event for UI updates
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('exchange-rates-updated'));
  }

  return rates;
}

/**
 * Get last update timestamp
 */
export function getLastUpdateTime(): Date | null {
  const cached = getCachedRates();
  return cached ? new Date(cached.lastUpdated) : null;
}

/**
 * Check if rates need refresh
 */
export function needsRefresh(): boolean {
  const cached = getCachedRates();
  if (!cached) return true;

  const now = Date.now();
  return now - cached.lastUpdated > CACHE_DURATION;
}
