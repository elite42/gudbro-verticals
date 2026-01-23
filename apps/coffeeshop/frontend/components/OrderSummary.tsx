'use client';

import React from 'react';
import { Receipt } from '@phosphor-icons/react';

interface OrderSummaryProps {
  subtotal: number;
  // Tax
  taxEnabled?: boolean;
  taxPercentage?: number;
  taxLabel?: string;
  taxDisplayMode?: 'inclusive' | 'exclusive';
  // Service Charge
  serviceChargeEnabled?: boolean;
  serviceChargePercentage?: number;
  serviceChargeLabel?: string;
  serviceChargeCalculationBase?: 'pre_tax' | 'post_tax';
  // Tip
  tipAmount?: number;
  tipPercentage?: number;
  // Display
  currency?: string;
  showDetails?: boolean;
}

interface CalculatedTotals {
  subtotal: number;
  taxAmount: number;
  taxIncluded: number;
  serviceChargeAmount: number;
  tipAmount: number;
  total: number;
}

export function calculateOrderTotals(props: OrderSummaryProps): CalculatedTotals {
  const {
    subtotal,
    taxEnabled = false,
    taxPercentage = 0,
    taxDisplayMode = 'inclusive',
    serviceChargeEnabled = false,
    serviceChargePercentage = 0,
    serviceChargeCalculationBase = 'pre_tax',
    tipAmount: providedTipAmount = 0,
  } = props;

  // Calculate tax
  let taxAmount = 0;
  let taxIncluded = 0;

  if (taxEnabled && taxPercentage > 0) {
    if (taxDisplayMode === 'exclusive') {
      // Tax is added on top of subtotal
      taxAmount = Math.round(subtotal * (taxPercentage / 100) * 100) / 100;
    } else {
      // Tax is included in subtotal (calculate for display only)
      taxIncluded = Math.round((subtotal - subtotal / (1 + taxPercentage / 100)) * 100) / 100;
    }
  }

  // Calculate service charge base
  let serviceChargeBase = subtotal;
  if (serviceChargeCalculationBase === 'post_tax' && taxDisplayMode === 'exclusive') {
    serviceChargeBase = subtotal + taxAmount;
  }

  // Calculate service charge
  const serviceChargeAmount =
    serviceChargeEnabled && serviceChargePercentage > 0
      ? Math.round(serviceChargeBase * (serviceChargePercentage / 100) * 100) / 100
      : 0;

  // Calculate total
  let total = subtotal;
  if (taxDisplayMode === 'exclusive') {
    total += taxAmount;
  }
  total += serviceChargeAmount;
  total += providedTipAmount;

  return {
    subtotal,
    taxAmount,
    taxIncluded,
    serviceChargeAmount,
    tipAmount: providedTipAmount,
    total: Math.round(total * 100) / 100,
  };
}

export function OrderSummary({
  subtotal,
  taxEnabled = false,
  taxPercentage = 0,
  taxLabel = 'IVA',
  taxDisplayMode = 'inclusive',
  serviceChargeEnabled = false,
  serviceChargePercentage = 0,
  serviceChargeLabel = 'Coperto',
  serviceChargeCalculationBase = 'pre_tax',
  tipAmount = 0,
  tipPercentage = 0,
  currency = 'EUR',
  showDetails = true,
}: OrderSummaryProps) {
  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Calculate all totals
  const totals = calculateOrderTotals({
    subtotal,
    taxEnabled,
    taxPercentage,
    taxDisplayMode,
    serviceChargeEnabled,
    serviceChargePercentage,
    serviceChargeCalculationBase,
    tipAmount,
  });

  // Check if we have any charges to show
  const hasCharges =
    (taxEnabled && taxDisplayMode === 'exclusive' && totals.taxAmount > 0) ||
    (serviceChargeEnabled && totals.serviceChargeAmount > 0) ||
    tipAmount > 0;

  if (!showDetails && !hasCharges) {
    // Simple mode: just show total
    return (
      <div className="flex items-center justify-between">
        <span className="text-theme-text-primary text-lg font-semibold">Totale</span>
        <span className="text-2xl font-bold text-amber-700">{formatPrice(totals.total)}</span>
      </div>
    );
  }

  return (
    <div className="bg-theme-bg-secondary border-theme-bg-tertiary rounded-xl border p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <Receipt className="text-theme-text-secondary h-5 w-5" weight="duotone" />
        <h3 className="text-theme-text-primary font-semibold">Riepilogo Ordine</h3>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-theme-text-secondary">Subtotale</span>
          <span className="text-theme-text-primary font-medium">{formatPrice(subtotal)}</span>
        </div>

        {/* Tax (if exclusive) */}
        {taxEnabled && taxDisplayMode === 'exclusive' && totals.taxAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-theme-text-secondary">
              {taxLabel} ({taxPercentage}%)
            </span>
            <span className="text-theme-text-primary font-medium">
              {formatPrice(totals.taxAmount)}
            </span>
          </div>
        )}

        {/* Tax included note (if inclusive) */}
        {taxEnabled && taxDisplayMode === 'inclusive' && totals.taxIncluded > 0 && (
          <div className="text-theme-text-tertiary flex justify-between text-xs">
            <span>
              di cui {taxLabel} ({taxPercentage}%)
            </span>
            <span>{formatPrice(totals.taxIncluded)}</span>
          </div>
        )}

        {/* Service Charge */}
        {serviceChargeEnabled && totals.serviceChargeAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-theme-text-secondary">
              {serviceChargeLabel} ({serviceChargePercentage}%)
            </span>
            <span className="text-theme-text-primary font-medium">
              {formatPrice(totals.serviceChargeAmount)}
            </span>
          </div>
        )}

        {/* Tip */}
        {tipAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-theme-text-secondary">
              Mancia {tipPercentage > 0 && `(${tipPercentage}%)`}
            </span>
            <span className="font-medium text-amber-600">{formatPrice(tipAmount)}</span>
          </div>
        )}

        {/* Divider */}
        <div className="border-theme-bg-tertiary my-2 border-t"></div>

        {/* Total */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-theme-text-primary text-lg font-semibold">Totale</span>
          <span className="text-xl font-bold text-amber-700">{formatPrice(totals.total)}</span>
        </div>
      </div>
    </div>
  );
}
