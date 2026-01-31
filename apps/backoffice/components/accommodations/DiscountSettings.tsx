'use client';

import { useState, useMemo } from 'react';
import { Percent, SpinnerGap } from '@phosphor-icons/react';
import { formatBookingPrice } from '@/lib/accommodations/helpers';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DiscountSettingsProps {
  propertyId: string;
  weeklyDiscount: number; // 0-50
  monthlyDiscount: number; // 0-50
  basePricePerNight: number; // minor units for preview calculation
  currency: string;
  onSave: (weekly: number, monthly: number) => Promise<void>;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DiscountSettings({
  weeklyDiscount,
  monthlyDiscount,
  basePricePerNight,
  currency,
  onSave,
}: DiscountSettingsProps) {
  const [weekly, setWeekly] = useState(weeklyDiscount);
  const [monthly, setMonthly] = useState(monthlyDiscount);
  const [saving, setSaving] = useState(false);

  const isDirty = weekly !== weeklyDiscount || monthly !== monthlyDiscount;

  // Preview calculations
  const weeklyPreview = useMemo(() => {
    if (weekly <= 0) return null;
    const nights = 7;
    const total = basePricePerNight * nights;
    const discounted = Math.round(total * (1 - weekly / 100));
    return { nights, total, discounted };
  }, [weekly, basePricePerNight]);

  const monthlyPreview = useMemo(() => {
    if (monthly <= 0) return null;
    const nights = 28;
    const total = basePricePerNight * nights;
    const discounted = Math.round(total * (1 - monthly / 100));
    return { nights, total, discounted };
  }, [monthly, basePricePerNight]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(weekly, monthly);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Percent size={20} weight="duotone" className="text-purple-600" />
        <h3 className="text-sm font-semibold text-gray-900">Length-of-Stay Discounts</h3>
      </div>

      {/* Weekly Discount */}
      <div className="mb-5">
        <label className="text-xs font-medium text-gray-600">Weekly Discount (7+ nights)</label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={weekly}
            onChange={(e) => setWeekly(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-purple-600"
          />
          <div className="flex w-20 items-center gap-1">
            <input
              type="number"
              min={0}
              max={50}
              value={weekly}
              onChange={(e) => setWeekly(Math.min(50, Math.max(0, Number(e.target.value))))}
              className="w-14 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
        {weeklyPreview && (
          <p className="mt-1.5 text-xs text-gray-500">
            {weeklyPreview.nights} nights:{' '}
            <span className="line-through">
              {formatBookingPrice(weeklyPreview.total, currency)}
            </span>{' '}
            &rarr;{' '}
            <span className="font-medium text-green-700">
              {formatBookingPrice(weeklyPreview.discounted, currency)}
            </span>
          </p>
        )}
      </div>

      {/* Monthly Discount */}
      <div className="mb-5">
        <label className="text-xs font-medium text-gray-600">Monthly Discount (28+ nights)</label>
        <div className="mt-2 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-purple-600"
          />
          <div className="flex w-20 items-center gap-1">
            <input
              type="number"
              min={0}
              max={50}
              value={monthly}
              onChange={(e) => setMonthly(Math.min(50, Math.max(0, Number(e.target.value))))}
              className="w-14 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        </div>
        {monthlyPreview && (
          <p className="mt-1.5 text-xs text-gray-500">
            {monthlyPreview.nights} nights:{' '}
            <span className="line-through">
              {formatBookingPrice(monthlyPreview.total, currency)}
            </span>{' '}
            &rarr;{' '}
            <span className="font-medium text-green-700">
              {formatBookingPrice(monthlyPreview.discounted, currency)}
            </span>
          </p>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={!isDirty || saving}
        className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving && <SpinnerGap size={14} className="animate-spin" />}
        Save Discounts
      </button>
    </div>
  );
}
