/* ═══════════════════════════════════════════════════════════════════════════
   SHARED PAYMENT TYPES

   Common payment types used across all GUDBRO verticals.
   Supports: Cash, Cards, VNPay, MoMo, Stripe, Crypto
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Supported payment methods across all verticals
 */
export type PaymentMethod =
  | 'cash'           // Pay on pickup/delivery
  | 'card'           // Credit/Debit via Stripe
  | 'vnpay'          // Vietnamese banks (Vietnam-specific)
  | 'momo'           // MoMo wallet (Vietnam-specific)
  | 'apple_pay'      // Apple Pay
  | 'google_pay'     // Google Pay
  | 'crypto'         // Cryptocurrency
  | 'saved_card'     // Previously saved card
  | 'qr'             // QR code payment
  | 'split'          // Split bill (waiter app)

/**
 * Crypto currencies supported
 */
export type CryptoCurrency = 'btc' | 'eth' | 'usdt' | 'usdc' | 'sol' | 'ton' | 'bnb'

/**
 * Payment status
 */
export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'succeeded'
  | 'failed'
  | 'cancelled'
  | 'refunded'

/**
 * Card brands
 */
export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'unionpay'

/**
 * Payment method configuration
 */
export interface PaymentMethodConfig {
  id: PaymentMethod
  label: string
  sublabel?: string
  icon: string // Icon name or component key
  color: string // Tailwind bg class
  processingFee?: number // Percentage fee
  enabled: boolean
  popular?: boolean
  regions?: string[] // ISO country codes where available
}

/**
 * Saved payment method (cards, wallets)
 */
export interface SavedPaymentMethod {
  id: string
  type: 'card' | 'wallet'
  brand?: CardBrand
  lastFour?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault?: boolean
  nickname?: string
}

/**
 * Payment intent / transaction
 */
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus

  // Optional details based on method
  cardLast4?: string
  cardBrand?: CardBrand
  cryptoTxHash?: string
  cryptoCurrency?: CryptoCurrency
  walletAddress?: string
  vnpayTransactionId?: string
  momoTransactionId?: string

  // Metadata
  orderId?: string
  customerId?: string
  merchantId?: string

  // Timestamps
  createdAt: string
  updatedAt: string
  completedAt?: string
}

/**
 * Payment processing result
 */
export interface PaymentResult {
  success: boolean
  paymentId?: string
  transactionId?: string
  error?: string
  errorCode?: string
  redirectUrl?: string // For VNPay, MoMo redirect
}

/**
 * Currency configuration
 */
export interface CurrencyConfig {
  code: string
  symbol: string
  name: string
  decimals: number
  rate?: number // Exchange rate to VND
}

/**
 * Default supported currencies
 */
export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', decimals: 0 },
  { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
  { code: 'EUR', symbol: '€', name: 'Euro', decimals: 2 },
  { code: 'KRW', symbol: '₩', name: 'Korean Won', decimals: 0 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', decimals: 2 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', decimals: 2 },
  { code: 'GBP', symbol: '£', name: 'British Pound', decimals: 2 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', decimals: 2 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', decimals: 2 },
]

/**
 * Default payment methods configuration
 */
export const DEFAULT_PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'cash',
    label: 'Cash',
    sublabel: 'Pay on pickup',
    icon: 'money',
    color: 'bg-emerald-500',
    enabled: true,
    popular: true,
  },
  {
    id: 'vnpay',
    label: 'VNPay',
    sublabel: 'Vietnamese banks',
    icon: 'bank',
    color: 'bg-blue-600',
    enabled: true,
    regions: ['VN'],
  },
  {
    id: 'momo',
    label: 'MoMo',
    sublabel: 'Vietnam e-wallet',
    icon: 'wallet',
    color: 'bg-pink-600',
    enabled: true,
    regions: ['VN'],
  },
  {
    id: 'card',
    label: 'Credit/Debit Card',
    sublabel: 'Visa, Mastercard, Amex',
    icon: 'credit-card',
    color: 'bg-indigo-600',
    processingFee: 2.9,
    enabled: true,
  },
  {
    id: 'apple_pay',
    label: 'Apple Pay',
    icon: 'apple',
    color: 'bg-black',
    enabled: true,
  },
  {
    id: 'google_pay',
    label: 'Google Pay',
    icon: 'google',
    color: 'bg-white',
    enabled: true,
  },
  {
    id: 'crypto',
    label: 'Cryptocurrency',
    sublabel: 'BTC, ETH, USDT, USDC',
    icon: 'bitcoin',
    color: 'bg-orange-500',
    enabled: true,
  },
]

/**
 * Crypto currencies configuration
 */
export const CRYPTO_CURRENCIES = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'bg-orange-500' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: 'bg-indigo-500' },
  { id: 'usdt', name: 'Tether', symbol: 'USDT', icon: '₮', color: 'bg-green-500' },
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', icon: '$', color: 'bg-blue-500' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', icon: '◎', color: 'bg-purple-500' },
  { id: 'ton', name: 'Toncoin', symbol: 'TON', icon: '💎', color: 'bg-sky-500' },
  { id: 'bnb', name: 'BNB', symbol: 'BNB', icon: 'B', color: 'bg-yellow-500' },
] as const
