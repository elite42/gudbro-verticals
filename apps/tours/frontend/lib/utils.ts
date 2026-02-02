import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and tailwind-merge
 * This allows conditional classes and proper Tailwind class deduplication
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price with currency
 */
export function formatPrice(
  priceVnd: number,
  currency: string,
  options?: { showBoth?: boolean }
): string {
  const rates: Record<string, number> = {
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

  const symbols: Record<string, string> = {
    VND: '₫',
    USD: '$',
    EUR: '€',
    KRW: '₩',
    JPY: '¥',
    CNY: '¥',
    AUD: 'A$',
    GBP: '£',
    THB: '฿',
    SGD: 'S$',
  }

  const rate = rates[currency] || 25000
  const symbol = symbols[currency] || '$'
  const converted = priceVnd / rate

  // VND formatting (no decimals)
  if (currency === 'VND') {
    return `${priceVnd.toLocaleString()}${symbol}`
  }

  // Other currencies with decimals for non-whole numbers
  const formatted =
    converted % 1 === 0
      ? converted.toLocaleString()
      : converted.toFixed(2)

  const primary = `${symbol}${formatted}`

  if (options?.showBoth) {
    return `${primary} (${priceVnd.toLocaleString()}₫)`
  }

  return primary
}

/**
 * Format date for display
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const d = typeof date === 'string' ? new Date(date) : date

  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  // Convert 24h to 12h format if needed
  if (time.includes(':')) {
    const [hours, minutes] = time.split(':').map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const hour12 = hours % 12 || 12
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`
  }
  return time
}

/**
 * Detect user's currency based on locale/country
 */
export function detectCurrency(): string {
  if (typeof navigator === 'undefined') return 'USD'

  const locale = navigator.language

  // Map locales to currencies
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
 * Detect user's preferred language
 */
export function detectLanguage(): string {
  if (typeof navigator === 'undefined') return 'en'

  const lang = navigator.language.split('-')[0]

  // Supported languages
  const supported = ['en', 'vi', 'ko', 'zh', 'ja']

  return supported.includes(lang) ? lang : 'en'
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return `${text.slice(0, length).trim()}...`
}

/**
 * Generate a WhatsApp message link
 */
export function whatsappLink(
  phone: string,
  message?: string
): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${cleanPhone}${encodedMessage}`
}

/**
 * Generate a Zalo link
 */
export function zaloLink(phone: string): string {
  return `https://zalo.me/${phone}`
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Get country flag emoji from country code
 */
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌍'

  const codePoints = [...countryCode.toUpperCase()]
    .map(char => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}
