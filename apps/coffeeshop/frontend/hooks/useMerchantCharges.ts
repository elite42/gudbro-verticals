'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';

// ============================================================================
// Types
// ============================================================================

export interface MerchantCharge {
  id: string;
  merchant_id: string;
  charge_type: 'tax' | 'fee' | 'tip_preset';
  name: string;
  description?: string;
  amount_type: 'percentage' | 'fixed' | 'per_person';
  percentage?: number;
  fixed_amount?: number;
  display_mode: 'inclusive' | 'exclusive';
  show_breakdown: boolean;
  show_in_menu: boolean;
  calculation_base: 'subtotal' | 'after_taxes' | 'after_fees';
  applies_to: 'all' | 'food' | 'beverage' | 'alcohol' | 'dine_in' | 'takeaway';
  min_order_amount?: number;
  max_charge_amount?: number;
  sort_order: number;
  is_enabled: boolean;
  is_default: boolean;
}

export interface ChargeBreakdownItem {
  id?: string;
  type: 'tax' | 'fee' | 'tip';
  name: string;
  percentage?: number;
  amount: number;
  included?: boolean;
  isCustom?: boolean;
}

export interface OrderTotals {
  subtotal: number;
  taxesTotal: number;
  feesTotal: number;
  tipTotal: number;
  grandTotal: number;
  breakdown: ChargeBreakdownItem[];
}

// ============================================================================
// Hook
// ============================================================================

export function useMerchantCharges() {
  const [charges, setCharges] = useState<MerchantCharge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const merchantId = coffeeshopConfig.merchant.id;

  // Fetch charges from API
  useEffect(() => {
    if (!merchantId) {
      setIsLoading(false);
      return;
    }

    const fetchCharges = async () => {
      try {
        const response = await fetch(`/api/charges?merchantId=${merchantId}`);
        const data = await response.json();

        if (data.charges) {
          setCharges(data.charges.filter((c: MerchantCharge) => c.is_enabled));
        }
      } catch (err) {
        console.error('Error fetching charges:', err);
        setError('Failed to load charges');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharges();
  }, [merchantId]);

  // Get charges by type
  const taxes = useMemo(() => charges.filter((c) => c.charge_type === 'tax'), [charges]);
  const fees = useMemo(() => charges.filter((c) => c.charge_type === 'fee'), [charges]);
  const tipPresets = useMemo(
    () => charges.filter((c) => c.charge_type === 'tip_preset').sort((a, b) => (a.percentage || 0) - (b.percentage || 0)),
    [charges]
  );

  // Get default tip
  const defaultTip = useMemo(() => tipPresets.find((t) => t.is_default), [tipPresets]);

  // Calculate order totals
  const calculateTotals = useCallback(
    (
      subtotal: number,
      tipPercentage?: number,
      tipAmount?: number,
      consumptionType: 'dine_in' | 'takeaway' = 'dine_in',
      personCount: number = 1
    ): OrderTotals => {
      let taxesTotal = 0;
      let feesTotal = 0;
      let tipTotal = 0;
      const breakdown: ChargeBreakdownItem[] = [];

      // Filter charges by consumption type
      const applicableCharges = charges.filter(
        (c) => c.applies_to === 'all' || c.applies_to === consumptionType
      );

      // Process taxes first
      const applicableTaxes = applicableCharges
        .filter((c) => c.charge_type === 'tax')
        .sort((a, b) => a.sort_order - b.sort_order);

      for (const tax of applicableTaxes) {
        const pct = tax.percentage || 0;
        if (tax.display_mode === 'inclusive') {
          // Tax is included in prices, calculate for display only
          const included = Math.round((subtotal - subtotal / (1 + pct / 100)) * 100) / 100;
          breakdown.push({
            id: tax.id,
            type: 'tax',
            name: tax.name,
            percentage: pct,
            amount: included,
            included: true,
          });
        } else {
          // Tax is added on top
          const amount = Math.round((subtotal * pct) / 100 * 100) / 100;
          taxesTotal += amount;
          breakdown.push({
            id: tax.id,
            type: 'tax',
            name: tax.name,
            percentage: pct,
            amount,
            included: false,
          });
        }
      }

      // Process fees
      const applicableFees = applicableCharges
        .filter((c) => c.charge_type === 'fee')
        .sort((a, b) => a.sort_order - b.sort_order);

      for (const fee of applicableFees) {
        // Check min order amount
        if (fee.min_order_amount && subtotal < fee.min_order_amount) {
          continue;
        }

        let amount = 0;
        const amountType = fee.amount_type || 'percentage';

        if (amountType === 'fixed') {
          // Fixed amount
          amount = fee.fixed_amount || 0;
        } else if (amountType === 'per_person') {
          // Per person
          amount = (fee.fixed_amount || 0) * personCount;
        } else {
          // Percentage
          let base = subtotal;
          if (fee.calculation_base === 'after_taxes') {
            base = subtotal + taxesTotal;
          } else if (fee.calculation_base === 'after_fees') {
            base = subtotal + taxesTotal + feesTotal;
          }
          amount = Math.round((base * (fee.percentage || 0)) / 100 * 100) / 100;
        }

        // Apply max cap if defined
        if (fee.max_charge_amount && amount > fee.max_charge_amount) {
          amount = fee.max_charge_amount;
        }

        feesTotal += amount;
        breakdown.push({
          id: fee.id,
          type: 'fee',
          name: fee.name,
          percentage: amountType === 'percentage' ? fee.percentage : undefined,
          amount,
          included: false,
        });
      }

      // Calculate tip
      if (tipAmount && tipAmount > 0) {
        // Custom tip amount
        tipTotal = tipAmount;
        breakdown.push({
          type: 'tip',
          name: 'Mancia',
          amount: tipTotal,
          isCustom: true,
        });
      } else if (tipPercentage && tipPercentage > 0) {
        // Tip percentage
        const tipBase = subtotal + taxesTotal; // Tip typically on post-tax
        tipTotal = Math.round((tipBase * tipPercentage) / 100 * 100) / 100;
        breakdown.push({
          type: 'tip',
          name: 'Mancia',
          percentage: tipPercentage,
          amount: tipTotal,
          isCustom: false,
        });
      }

      // Calculate grand total
      const grandTotal = Math.round((subtotal + taxesTotal + feesTotal + tipTotal) * 100) / 100;

      return {
        subtotal,
        taxesTotal,
        feesTotal,
        tipTotal,
        grandTotal,
        breakdown,
      };
    },
    [charges]
  );

  // Check if any charge should show in menu
  const hasMenuCharges = useMemo(
    () => charges.some((c) => c.show_in_menu && c.display_mode === 'exclusive'),
    [charges]
  );

  // Get menu price suffix (e.g., "+22% IVA")
  const menuPriceSuffix = useMemo(() => {
    const menuCharges = charges.filter((c) => c.show_in_menu && c.display_mode === 'exclusive');
    if (menuCharges.length === 0) return null;
    return menuCharges.map((c) => `+${c.percentage}% ${c.name}`).join(', ');
  }, [charges]);

  return {
    charges,
    taxes,
    fees,
    tipPresets,
    defaultTip,
    isLoading,
    error,
    calculateTotals,
    hasMenuCharges,
    menuPriceSuffix,
  };
}
