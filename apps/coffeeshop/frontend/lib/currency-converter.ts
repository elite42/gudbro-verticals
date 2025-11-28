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
const FALLBACK_RATES: ExchangeRates = {
  base: 'VND',
  rates: {
    VND: 1,
    EUR: 0.000038, // 1 VND ≈ 0.000038 EUR
    USD: 0.000041, // 1 VND ≈ 0.000041 USD
    GBP: 0.000032, // 1 VND ≈ 0.000032 GBP
    JPY: 0.0061, // 1 VND ≈ 0.0061 JPY
    CNY: 0.00029, // 1 VND ≈ 0.00029 CNY
    KRW: 0.054, // 1 VND ≈ 0.054 KRW
    AUD: 0.000062, // 1 VND ≈ 0.000062 AUD
    CAD: 0.000056, // 1 VND ≈ 0.000056 CAD
    SGD: 0.000054, // 1 VND ≈ 0.000054 SGD
    THB: 0.0014, // 1 VND ≈ 0.0014 THB
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
 * Convert VND price to target currency
 */
export function convertPrice(
  vndPrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): number {
  if (targetCurrency === 'VND') return vndPrice;

  const exchangeRates = rates || getCachedRates() || FALLBACK_RATES;
  const rate = exchangeRates.rates[targetCurrency];

  if (!rate) {
    console.warn(`No exchange rate found for ${targetCurrency}`);
    return vndPrice;
  }

  return vndPrice * rate;
}

/**
 * Format converted price with currency symbol
 */
export function formatConvertedPrice(
  vndPrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): string {
  const converted = convertPrice(vndPrice, targetCurrency, rates);

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
 * Format price with both currencies (converted + original)
 */
export function formatDualPrice(
  vndPrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): string {
  const convertedPrice = formatConvertedPrice(vndPrice, targetCurrency, rates);
  const vndFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const vndFormatted = vndFormatter.format(vndPrice);

  return `${convertedPrice} (≈ ${vndFormatted})`;
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
