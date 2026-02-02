/* ═══════════════════════════════════════════════════════════════════════════
   SHARED PAYMENT UTILITIES

   Common utilities for payment processing across all GUDBRO verticals.
   ═══════════════════════════════════════════════════════════════════════════ */

import { SUPPORTED_CURRENCIES, type CurrencyConfig } from './types'

/**
 * Exchange rates to VND (updated periodically)
 * In production, fetch from API
 */
const EXCHANGE_RATES: Record<string, number> = {
  VND: 1,
  USD: 25000,
  EUR: 27000,
  KRW: 19,
  JPY: 170,
  CNY: 3500,
  AUD: 16000,
  GBP: 31000,
  THB: 750,
  SGD: 19000,
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  amount: number,
  currencyCode: string,
  options?: {
    showBoth?: boolean // Show both VND and converted
    baseVnd?: number   // Original VND amount for conversion
  }
): string {
  const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode)
  if (!currency) {
    return `${amount}`
  }

  const { symbol, decimals } = currency

  // Format the amount
  const formatted = amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  // Currency-specific formatting
  if (currencyCode === 'VND') {
    return `${formatted}${symbol}`
  }

  const primary = `${symbol}${formatted}`

  // Optionally show both
  if (options?.showBoth && options.baseVnd) {
    return `${primary} (${options.baseVnd.toLocaleString()}₫)`
  }

  return primary
}

/**
 * Convert amount between currencies
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  if (fromCurrency === toCurrency) return amount

  // Convert to VND first, then to target
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1
  const toRate = EXCHANGE_RATES[toCurrency] || 1

  const vndAmount = amount * fromRate
  return vndAmount / toRate
}

/**
 * Get currency config by code
 */
export function getCurrency(code: string): CurrencyConfig | undefined {
  return SUPPORTED_CURRENCIES.find(c => c.code === code)
}

/**
 * Detect user's preferred currency based on locale
 */
export function detectCurrency(): string {
  if (typeof navigator === 'undefined') return 'USD'

  const locale = navigator.language

  const currencyMap: Record<string, string> = {
    'ko-KR': 'KRW',
    'ko': 'KRW',
    'ja-JP': 'JPY',
    'ja': 'JPY',
    'zh-CN': 'CNY',
    'zh-TW': 'CNY',
    'zh': 'CNY',
    'vi-VN': 'VND',
    'vi': 'VND',
    'th-TH': 'THB',
    'th': 'THB',
    'en-AU': 'AUD',
    'en-GB': 'GBP',
    'de-DE': 'EUR',
    'fr-FR': 'EUR',
    'es-ES': 'EUR',
    'it-IT': 'EUR',
    'nl-NL': 'EUR',
  }

  return currencyMap[locale] || 'USD'
}

/**
 * Calculate processing fee for a payment method
 */
export function calculateFee(amount: number, feePercent: number): number {
  return Math.round(amount * (feePercent / 100))
}

/**
 * Validate card number using Luhn algorithm
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Detect card brand from card number
 */
export function detectCardBrand(cardNumber: string): string | null {
  const digits = cardNumber.replace(/\D/g, '')

  const patterns: Record<string, RegExp> = {
    visa: /^4/,
    mastercard: /^5[1-5]|^2[2-7]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    jcb: /^35(?:2[89]|[3-8])/,
    unionpay: /^62/,
  }

  for (const [brand, pattern] of Object.entries(patterns)) {
    if (pattern.test(digits)) return brand
  }

  return null
}

/**
 * Format card number with spaces
 */
export function formatCardNumber(value: string): string {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ''
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  return parts.length ? parts.join(' ') : v
}

/**
 * Format card expiry date
 */
export function formatExpiry(value: string): string {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return `${v.substring(0, 2)}/${v.substring(2, 4)}`
  }
  return v
}

/**
 * Mask card number for display
 */
export function maskCardNumber(lastFour: string): string {
  const dots = '••••'
  return `${dots} ${dots} ${dots} ${lastFour}`
}

/**
 * Generate WhatsApp payment link
 */
export function generateWhatsAppPaymentLink(
  phone: string,
  amount: number,
  currency: string,
  description: string
): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const message = `Payment of ${formatPrice(amount, currency)} for: ${description}`
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

/**
 * Check if payment method is available in region
 */
export function isMethodAvailableInRegion(
  methodId: string,
  countryCode: string,
  methods: { id: string; regions?: string[] }[]
): boolean {
  const method = methods.find(m => m.id === methodId)
  if (!method) return false
  if (!method.regions) return true // Available everywhere
  return method.regions.includes(countryCode)
}
