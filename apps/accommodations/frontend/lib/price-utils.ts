/**
 * Price Calculation Utilities for Accommodations Booking
 *
 * All prices are INTEGER minor currency units:
 * - VND: 1 unit = 1 VND (500000 = 500,000 VND)
 * - USD: 1 unit = 1 cent (4500 = $45.00)
 *
 * IMPORTANT: Client-side calculation is for PREVIEW only.
 * Server recalculates authoritatively on booking submission.
 */
import { differenceInDays } from 'date-fns';
import type { PriceBreakdown } from '@/types/property';

export function calculatePriceBreakdown(
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date,
  cleaningFee: number,
  weeklyDiscountPercent: number,
  monthlyDiscountPercent: number,
  currency: string,
  voucherDiscount?: number,
  voucherLabel?: string | null
): PriceBreakdown {
  const nights = differenceInDays(checkOut, checkIn);
  const subtotal = pricePerNight * nights;

  let discountPercent = 0;
  let discountLabel: string | null = null;
  if (nights >= 28 && monthlyDiscountPercent > 0) {
    discountPercent = monthlyDiscountPercent;
    discountLabel = `${monthlyDiscountPercent}% monthly discount`;
  } else if (nights >= 7 && weeklyDiscountPercent > 0) {
    discountPercent = weeklyDiscountPercent;
    discountLabel = `${weeklyDiscountPercent}% weekly discount`;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  // Voucher discount applied AFTER existing discounts, total never below 0
  const totalPrice = Math.max(0, subtotal + cleaningFee - discountAmount - (voucherDiscount || 0));

  return {
    pricePerNight,
    nights,
    subtotal,
    cleaningFee,
    discountAmount,
    discountLabel,
    voucherDiscount: voucherDiscount || undefined,
    voucherLabel: voucherLabel || undefined,
    totalPrice,
    currency,
  };
}

// Re-export centralized formatPriceFromMinor as formatPrice for backward compatibility.
// This module stores prices in minor units (cents), so we use formatPriceFromMinor.
export { formatPriceFromMinor as formatPrice } from '@gudbro/utils';
