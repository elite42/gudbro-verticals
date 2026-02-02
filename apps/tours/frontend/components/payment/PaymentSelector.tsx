'use client'

import { cn } from '@/lib/utils'
import type { PaymentMethod } from '@/lib/types'
import { formatPrice, convertCurrency, calculateFee } from '@shared/payment'

/* ═══════════════════════════════════════════════════════════════════════════
   PAYMENT SELECTOR COMPONENT

   Allows tourists to choose their preferred payment method.
   Supports cash, VNPay, MoMo, Stripe (cards), and crypto.
   ═══════════════════════════════════════════════════════════════════════════ */

interface PaymentSelectorProps {
  selectedMethod: PaymentMethod | null
  onSelect: (method: PaymentMethod) => void
  totalVnd: number
  currency: string
  acceptedMethods?: PaymentMethod[]
  className?: string
}

interface PaymentOptionConfig {
  id: PaymentMethod
  name: string
  description: string
  icon: React.ReactNode
  color: string
  popular?: boolean
  processingFee?: number // percentage
}

const PAYMENT_OPTIONS: PaymentOptionConfig[] = [
  {
    id: 'cash',
    name: 'Cash on Pickup',
    description: 'Pay when you meet your guide',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
      </svg>
    ),
    color: 'bg-emerald-500',
    popular: true,
  },
  {
    id: 'vnpay',
    name: 'VNPay',
    description: 'Vietnamese banks & cards',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
    ),
    color: 'bg-blue-600',
  },
  {
    id: 'momo',
    name: 'MoMo',
    description: 'Vietnam mobile wallet',
    icon: (
      <div className="w-6 h-6 rounded-full bg-[#A50064] flex items-center justify-center text-white text-xs font-bold">
        M
      </div>
    ),
    color: 'bg-[#A50064]',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, Amex',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
    ),
    color: 'bg-indigo-600',
    processingFee: 2.9,
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    description: 'BTC, ETH, USDT, USDC',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z" />
      </svg>
    ),
    color: 'bg-orange-500',
  },
]

export function PaymentSelector({
  selectedMethod,
  onSelect,
  totalVnd,
  currency,
  acceptedMethods = ['cash', 'vnpay', 'momo', 'card', 'crypto'],
  className,
}: PaymentSelectorProps) {
  const availableOptions = PAYMENT_OPTIONS.filter(opt =>
    acceptedMethods.includes(opt.id)
  )

  const formatFee = (feeVnd: number) => {
    if (currency === 'VND') return formatPrice(feeVnd, 'VND')
    const converted = convertCurrency(feeVnd, 'VND', currency)
    return formatPrice(Math.round(converted), currency)
  }

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="font-display text-lg font-semibold flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
        </svg>
        Payment Method
      </h3>

      <div className="space-y-2">
        {availableOptions.map(option => {
          const isSelected = selectedMethod === option.id
          const fee = option.processingFee
            ? calculateFee(totalVnd, option.processingFee)
            : 0

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                'text-left',
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50 bg-white'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-white',
                  option.color
                )}
              >
                {option.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {option.name}
                  </span>
                  {option.popular && (
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs font-medium rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground-muted mt-0.5">
                  {option.description}
                </p>
                {fee > 0 && (
                  <p className="text-xs text-foreground-subtle mt-1">
                    +{option.processingFee}% fee ({formatFee(fee)})
                  </p>
                )}
              </div>

              {/* Radio indicator */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  isSelected ? 'border-primary' : 'border-gray-300'
                )}
              >
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 text-xs text-foreground-muted pt-2">
        <svg className="w-4 h-4 text-success" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
        <span>All payments are secure and encrypted</span>
      </div>
    </div>
  )
}
