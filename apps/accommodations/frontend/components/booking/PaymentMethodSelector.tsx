'use client';

import type { IconProps } from '@phosphor-icons/react';
import { Money, Bank, CreditCard, CurrencyBtc } from '@phosphor-icons/react';
import { PAYMENT_METHOD_CONFIG } from '@/types/property';
import { formatPrice } from '@/lib/price-utils';
import type { AccomPaymentMethod } from '@/types/property';

const ICON_MAP: Record<string, React.ForwardRefExoticComponent<IconProps>> = {
  Money,
  Bank,
  CreditCard,
  CurrencyBtc,
};

interface PaymentMethodSelectorProps {
  acceptedMethods: string[];
  selectedMethod: AccomPaymentMethod | null;
  onSelect: (method: AccomPaymentMethod) => void;
  depositPercent: number;
  totalPrice: number;
  currency: string;
}

export default function PaymentMethodSelector({
  acceptedMethods,
  selectedMethod,
  onSelect,
  depositPercent,
  totalPrice,
  currency,
}: PaymentMethodSelectorProps) {
  const methods = (Object.keys(PAYMENT_METHOD_CONFIG) as AccomPaymentMethod[]).filter((m) =>
    acceptedMethods.includes(m)
  );

  if (methods.length === 0) return null;

  const depositAmount = Math.round(totalPrice * (depositPercent / 100));

  return (
    <div>
      <h3 className="text-foreground mb-2 text-sm font-semibold">Payment Method</h3>
      <div className="space-y-2">
        {methods.map((method) => {
          const config = PAYMENT_METHOD_CONFIG[method];
          const Icon = ICON_MAP[config.icon];
          const isSelected = selectedMethod === method;
          const isOnlyOption = methods.length === 1;

          let description = config.description;
          if (method === 'card' && depositPercent < 100) {
            description = `Deposit: ${depositPercent}% (${formatPrice(depositAmount, currency)})`;
          } else if (method === 'cash') {
            description = `Pay full amount at check-in`;
          } else if (method === 'bank_transfer') {
            description = 'Transfer before arrival';
          } else if (method === 'crypto') {
            description = 'Pay with BTC, ETH, USDC & more';
          }

          return (
            <button
              key={method}
              type="button"
              onClick={() => onSelect(method)}
              disabled={isOnlyOption}
              className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                isSelected
                  ? 'border-primary ring-primary bg-primary-light ring-2'
                  : 'border-border bg-background hover:border-foreground-muted/40'
              } ${isOnlyOption ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${config.color} text-white`}
              >
                {Icon && <Icon size={20} weight="fill" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-sm font-medium">{config.label}</p>
                <p className="text-foreground-muted text-xs">{description}</p>
              </div>
              {/* Radio indicator */}
              <div
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? 'border-primary' : 'border-border'
                }`}
              >
                {isSelected && <div className="bg-primary h-2.5 w-2.5 rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
