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

/**
 * Format integer minor units to display string.
 * VND: 500000 -> "500,000 VND" (no decimals, minor unit = 1)
 * USD: 4500 -> "$45.00" (2 decimals, minor unit = 100)
 */
export function formatPrice(amount: number, currency: string): string {
  const minorUnits = currency === 'VND' ? 1 : 100;
  const value = amount / minorUnits;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'VND' ? 0 : 2,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(value);
}
