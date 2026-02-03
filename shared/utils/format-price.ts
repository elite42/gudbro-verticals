/**
 * Centralized Price & Currency Formatting
 *
 * Provides consistent price formatting across all GUDBRO verticals.
 *
 * Three main functions cover all use cases:
 *
 * 1. formatPrice(amount, currency)
 *    - Standard: amount is in major units (e.g., 65000 VND, 2.60 USD)
 *    - Uses Intl.NumberFormat for locale-aware output
 *
 * 2. formatPriceFromMinor(minorUnits, currency)
 *    - For APIs that store prices in minor units (cents)
 *    - VND/JPY/KRW: minor unit = major unit (no division)
 *    - USD/EUR/GBP: divides by 100
 *
 * 3. formatPriceCompact(amount, currency?)
 *    - Compact display: "65k", "1.5M" for VND; "$2.60" for others
 *    - Defaults to VND if no currency specified
 */

// --- Constants ---

/** Currencies where the minor unit equals the major unit (no cents). */
const ZERO_DECIMAL_CURRENCIES = new Set(['VND', 'JPY', 'KRW', 'CLP', 'ISK', 'UGX', 'RWF']);

// --- Main Functions ---

/**
 * Format a price amount for display with currency symbol.
 *
 * The amount should be in MAJOR units (e.g., 65000 for 65,000 VND, 2.60 for $2.60).
 *
 * @param amount - The price amount in major currency units
 * @param currency - ISO 4217 currency code (e.g., 'VND', 'USD', 'EUR')
 * @param options - Optional formatting overrides
 * @returns Formatted price string (e.g., "₫65,000", "$2.60")
 *
 * @example
 * ```ts
 * formatPrice(65000, 'VND')    // "₫65,000"
 * formatPrice(2.60, 'USD')     // "$2.60"
 * formatPrice(27.50, 'EUR')    // "€27.50"
 * formatPrice(350, 'JPY')      // "¥350"
 * formatPrice(null, 'USD')     // ""
 * formatPrice(0, 'VND')        // "₫0"
 * ```
 */
export function formatPrice(
  amount: number | null | undefined,
  currency: string,
  options?: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }
): string {
  if (amount == null) return '';

  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
  const minFrac = options?.minimumFractionDigits ?? (isZeroDecimal ? 0 : 2);
  const maxFrac = options?.maximumFractionDigits ?? (isZeroDecimal ? 0 : 2);
  const locale = options?.locale ?? 'en';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  }).format(amount);
}

/**
 * Format a price stored in minor (cent) units.
 *
 * Handles the minor-to-major conversion automatically:
 * - Zero-decimal currencies (VND, JPY, KRW): no conversion (minor = major)
 * - Standard currencies (USD, EUR, GBP): divides by 100
 *
 * @param minorUnits - Price in minor units (e.g., 4500 cents = $45.00)
 * @param currency - ISO 4217 currency code
 * @returns Formatted price string
 *
 * @example
 * ```ts
 * formatPriceFromMinor(500000, 'VND')  // "₫500,000"
 * formatPriceFromMinor(4500, 'USD')    // "$45.00"
 * formatPriceFromMinor(2750, 'EUR')    // "€27.50"
 * ```
 */
export function formatPriceFromMinor(
  minorUnits: number | null | undefined,
  currency: string
): string {
  if (minorUnits == null) return '';

  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
  const amount = isZeroDecimal ? minorUnits : minorUnits / 100;

  return formatPrice(amount, currency);
}

/**
 * Compact price display, optimized for VND.
 *
 * VND: shows "65k" for thousands, "1.5M" for millions
 * Other currencies: falls back to standard formatPrice
 *
 * @param amount - Price in major units
 * @param currency - ISO 4217 currency code (defaults to 'VND')
 * @returns Compact formatted string
 *
 * @example
 * ```ts
 * formatPriceCompact(65000)           // "65k"
 * formatPriceCompact(65000, 'VND')    // "65k"
 * formatPriceCompact(1500000, 'VND')  // "1.5M"
 * formatPriceCompact(2000000, 'VND')  // "2M"
 * formatPriceCompact(2.60, 'USD')     // "$2.60"
 * ```
 */
export function formatPriceCompact(
  amount: number | null | undefined,
  currency: string = 'VND'
): string {
  if (amount == null) return '';

  if (currency.toUpperCase() === 'VND') {
    if (amount >= 1_000_000) {
      const inMillions = amount / 1_000_000;
      const formatted = inMillions % 1 === 0 ? inMillions.toString() : inMillions.toFixed(1);
      return `${formatted}M`;
    }
    const inThousands = Math.round(amount / 1000);
    return `${inThousands}k`;
  }

  return formatPrice(amount, currency);
}

/**
 * Alias for formatPrice. Kept for backward compatibility with apps
 * that use the name "formatCurrency" instead of "formatPrice".
 *
 * @see formatPrice
 */
export const formatCurrency = formatPrice;

/**
 * Alias for formatPriceFromMinor. Formats cents/minor units to a
 * currency string. Common in backoffice where amounts are stored in cents.
 *
 * @see formatPriceFromMinor
 */
export const formatCurrencyFromMinor = formatPriceFromMinor;
