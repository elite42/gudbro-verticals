/**
 * Currency Converter Service
 *
 * Handles exchange rates and price conversion for tourist-friendly pricing.
 *
 * KEY CONCEPT:
 * - Each locale has a BASE CURRENCY (the currency they set prices in)
 * - Tourists can convert to their preferred currency for reference
 * - Example: A cafe in Vietnam has prices in VND, tourists see USD/EUR equivalent
 */

import { coffeeshopConfig } from '@/config/coffeeshop.config';

export interface ExchangeRates {
  base: string; // The base currency (from locale config)
  rates: Record<string, number>;
  lastUpdated: number; // timestamp
}

const STORAGE_KEY = 'gudbro-exchange-rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Get base currency from config
const BASE_CURRENCY = coffeeshopConfig.i18n.baseCurrency;

// Fallback rates - all rates are relative to VND (base currency for Vietnam locales)
// These are approximate rates, will be replaced by API fetch in production
const FALLBACK_RATES: ExchangeRates = {
  base: 'VND',
  rates: {
    VND: 1,
    USD: 0.00004,    // 1 VND ≈ 0.00004 USD (or 1 USD ≈ 25,000 VND)
    EUR: 0.0000375,  // 1 VND ≈ 0.0000375 EUR (or 1 EUR ≈ 26,667 VND)
    GBP: 0.0000316,  // 1 VND ≈ 0.0000316 GBP (or 1 GBP ≈ 31,646 VND)
    AUD: 0.0000615,  // 1 VND ≈ 0.0000615 AUD (or 1 AUD ≈ 16,260 VND)
    JPY: 0.006,      // 1 VND ≈ 0.006 JPY (or 1 JPY ≈ 167 VND)
    KRW: 0.0556,     // 1 VND ≈ 0.0556 KRW (or 1 KRW ≈ 18 VND)
    CNY: 0.000288,   // 1 VND ≈ 0.000288 CNY (or 1 CNY ≈ 3,472 VND)
    SGD: 0.0000533,  // 1 VND ≈ 0.0000533 SGD (or 1 SGD ≈ 18,762 VND)
    THB: 0.00138,    // 1 VND ≈ 0.00138 THB (or 1 THB ≈ 725 VND)
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
 * Convert price from base currency to target currency
 *
 * @param basePrice - Price in the locale's base currency (e.g., VND for Vietnam)
 * @param targetCurrency - Currency to convert to (e.g., USD, EUR)
 * @param rates - Optional exchange rates (uses cached/fallback if not provided)
 */
export function convertPrice(
  basePrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): number {
  // If target is same as base, no conversion needed
  if (targetCurrency === BASE_CURRENCY) return basePrice;

  const exchangeRates = rates || getCachedRates() || FALLBACK_RATES;
  const rate = exchangeRates.rates[targetCurrency];

  if (!rate) {
    console.warn(`No exchange rate found for ${targetCurrency}`);
    return basePrice;
  }

  return basePrice * rate;
}

/**
 * Get the locale's base currency
 */
export function getBaseCurrency(): string {
  return BASE_CURRENCY;
}

/**
 * Format price for display
 *
 * @param basePrice - Price in the locale's base currency
 * @param targetCurrency - Currency to display in (defaults to base currency)
 * @param rates - Optional exchange rates
 *
 * Display rules:
 * - VND: Compact "k" format (65000 → "65k") - no symbol needed for locals
 * - Other currencies: Standard format with symbol ($2.60, €2.40, etc.)
 */
export function formatConvertedPrice(
  basePrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): string {
  const converted = convertPrice(basePrice, targetCurrency, rates);

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
 * Format price showing both converted price and original base currency
 *
 * Example for Vietnam locale (base=VND):
 * - Tourist selects USD: "$2.60 (≈ 65k)"
 * - Shows converted price first, original VND price in parentheses
 */
export function formatDualPrice(
  basePrice: number,
  targetCurrency: string,
  rates?: ExchangeRates
): string {
  const convertedPrice = formatConvertedPrice(basePrice, targetCurrency, rates);
  const basePriceFormatted = formatConvertedPrice(basePrice, BASE_CURRENCY, rates);

  // If target is same as base, just show one price
  if (targetCurrency === BASE_CURRENCY) {
    return convertedPrice;
  }

  // Show converted price with original base currency reference
  return `${convertedPrice} (≈ ${basePriceFormatted})`;
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
