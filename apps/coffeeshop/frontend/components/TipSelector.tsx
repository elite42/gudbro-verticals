'use client';

import React, { useState } from 'react';
import { HandCoins } from '@phosphor-icons/react';

interface TipSelectorProps {
  subtotal: number;
  taxAmount: number;
  tipPresets: number[];
  allowCustom: boolean;
  calculationBase: 'pre_tax' | 'post_tax';
  onTipChange: (amount: number, percentage: number) => void;
  currency?: string;
}

export function TipSelector({
  subtotal,
  taxAmount,
  tipPresets,
  allowCustom,
  calculationBase,
  onTipChange,
  currency = 'EUR',
}: TipSelectorProps) {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Calculate base for tip
  const tipBase = calculationBase === 'post_tax' ? subtotal + taxAmount : subtotal;

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  // Calculate tip amount for a percentage
  const calculateTipAmount = (percentage: number) => {
    return Math.round(tipBase * (percentage / 100) * 100) / 100;
  };

  // Handle preset selection
  const handlePresetSelect = (percentage: number) => {
    setSelectedPreset(percentage);
    setIsCustomMode(false);
    setCustomAmount('');
    const amount = calculateTipAmount(percentage);
    onTipChange(amount, percentage);
  };

  // Handle custom amount input
  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedPreset(null);
    setIsCustomMode(true);

    const amount = parseFloat(value) || 0;
    // Calculate percentage from amount
    const percentage = tipBase > 0 ? Math.round((amount / tipBase) * 100 * 100) / 100 : 0;
    onTipChange(amount, percentage);
  };

  // Handle no tip selection
  const handleNoTip = () => {
    setSelectedPreset(null);
    setIsCustomMode(false);
    setCustomAmount('');
    onTipChange(0, 0);
  };

  return (
    <div className="bg-theme-bg-secondary border-theme-bg-tertiary rounded-xl border p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <HandCoins className="h-5 w-5 text-amber-600" weight="duotone" />
        <h3 className="text-theme-text-primary font-semibold">Aggiungi una mancia</h3>
      </div>

      {/* Presets */}
      <div className="mb-3 grid grid-cols-4 gap-2">
        {tipPresets.map((preset) => {
          const amount = calculateTipAmount(preset);
          const isSelected = selectedPreset === preset && !isCustomMode;

          return (
            <button
              key={preset}
              onClick={() => handlePresetSelect(preset)}
              className={`flex flex-col items-center rounded-xl border-2 px-2 py-3 transition-all ${
                isSelected
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-theme-bg-tertiary bg-theme-bg-elevated hover:border-amber-300'
              }`}
            >
              <span
                className={`text-lg font-bold ${
                  isSelected ? 'text-amber-600' : 'text-theme-text-primary'
                }`}
              >
                {preset}%
              </span>
              <span
                className={`mt-0.5 text-xs ${
                  isSelected ? 'text-amber-600' : 'text-theme-text-tertiary'
                }`}
              >
                {formatPrice(amount)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom Amount & No Tip */}
      <div className="flex gap-2">
        {allowCustom && (
          <div className="relative flex-1">
            <input
              type="number"
              min="0"
              step="0.50"
              placeholder="Altro importo"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className={`bg-theme-bg-elevated text-theme-text-primary placeholder:text-theme-text-tertiary w-full rounded-xl border-2 px-4 py-2.5 transition-colors focus:outline-none ${
                isCustomMode
                  ? 'border-amber-500 focus:border-amber-500'
                  : 'border-theme-bg-tertiary focus:border-amber-400'
              }`}
            />
            <span className="text-theme-text-tertiary absolute right-3 top-1/2 -translate-y-1/2 text-sm">
              {currency === 'EUR' ? '€' : currency}
            </span>
          </div>
        )}

        <button
          onClick={handleNoTip}
          className={`rounded-xl border-2 px-4 py-2.5 font-medium transition-all ${
            selectedPreset === null && !isCustomMode && customAmount === ''
              ? 'border-gray-500 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              : 'border-theme-bg-tertiary text-theme-text-secondary hover:border-gray-400'
          }`}
        >
          No
        </button>
      </div>

      {/* Info text */}
      <p className="text-theme-text-tertiary mt-3 text-center text-xs">
        {calculationBase === 'post_tax'
          ? 'Calcolata sul totale con tasse'
          : 'Calcolata sul subtotale'}
      </p>
    </div>
  );
}
