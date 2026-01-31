'use client';

import { formatPrice } from '@/lib/price-utils';
import type { PriceBreakdown as PriceBreakdownType } from '@/types/property';

interface PriceBreakdownProps {
  priceBreakdown: PriceBreakdownType | null;
}

export default function PriceBreakdown({ priceBreakdown }: PriceBreakdownProps) {
  if (!priceBreakdown) return null;

  const {
    pricePerNight,
    nights,
    subtotal,
    cleaningFee,
    discountAmount,
    discountLabel,
    totalPrice,
    currency,
  } = priceBreakdown;

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Price Details</h2>
      <div className="border-border bg-background space-y-2 rounded-xl border p-4">
        {/* Per-night x nights */}
        <div className="text-foreground-muted flex items-center justify-between text-sm">
          <span>
            {formatPrice(pricePerNight, currency)} x {nights} night{nights !== 1 ? 's' : ''}
          </span>
          <span>{formatPrice(subtotal, currency)}</span>
        </div>

        {/* Cleaning fee */}
        {cleaningFee > 0 && (
          <div className="text-foreground-muted flex items-center justify-between text-sm">
            <span>Cleaning fee</span>
            <span>{formatPrice(cleaningFee, currency)}</span>
          </div>
        )}

        {/* Discount */}
        {discountAmount > 0 && discountLabel && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="bg-success-light text-success rounded-full px-2 py-0.5 text-xs font-medium">
                {discountLabel}
              </span>
            </span>
            <span className="text-success">-{formatPrice(discountAmount, currency)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-border border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="text-foreground text-base font-semibold">Total</span>
            <span className="text-foreground text-lg font-bold">
              {formatPrice(totalPrice, currency)}
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-foreground-subtle pt-1 text-xs">
          Price shown is an estimate. Final price confirmed at booking.
        </p>
      </div>
    </div>
  );
}
