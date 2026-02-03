'use client';

import React from 'react';
import type { ProductCustomization, MultiLangText } from '@/database/types';

interface QuantityCustomizationProps {
  customization: ProductCustomization;
  value: number;
  onChange: (value: number) => void;
  language?: 'en' | 'it' | 'vi';
}

/**
 * Dynamic Quantity Customization Component
 * Renders a numeric input with +/- buttons and validation
 *
 * Example usage:
 * - Sugar level: 0-5 spoons (step: 1)
 * - Ice level: 0-100% (step: 25)
 * - Extra shots: 0-3 (step: 1)
 * - Spice level: 0-10 (step: 1)
 */
export function QuantityCustomization({
  customization,
  value,
  onChange,
  language = 'en',
}: QuantityCustomizationProps) {
  const getName = (text: MultiLangText | string): string => {
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const getDescription = (text: MultiLangText | string | undefined): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  if (!customization.quantity_config) {
    console.error('QuantityCustomization requires quantity_config');
    return null;
  }

  const { min, max, step, default: defaultValue, unit } = customization.quantity_config;

  const unitText = unit ? getName(unit) : '';

  // Ensure value is within bounds
  const effectiveValue = Math.max(min, Math.min(max, value));

  const handleIncrement = () => {
    const newValue = Math.min(max, effectiveValue + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, effectiveValue - step);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      const clampedValue = Math.max(min, Math.min(max, inputValue));
      onChange(clampedValue);
    }
  };

  // Calculate percentage for visual indicator
  const percentage = ((effectiveValue - min) / (max - min)) * 100;

  // Determine if at min/max
  const isAtMin = effectiveValue <= min;
  const isAtMax = effectiveValue >= max;

  // Calculate price modifier based on value
  const priceModifier = customization.options?.[0]?.price_modifier || 0;
  const totalPriceModifier = priceModifier * effectiveValue;
  const priceText =
    totalPriceModifier > 0
      ? `+${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPriceModifier)}`
      : totalPriceModifier < 0
        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
            totalPriceModifier
          )
        : '';

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2">
        {customization.icon && <span className="text-xl">{customization.icon}</span>}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{getName(customization.name)}</h3>
            {customization.required && (
              <span className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-600">
                Obbligatorio
              </span>
            )}
          </div>
          {customization.description && (
            <p className="mt-1 text-sm text-gray-600">
              {getDescription(customization.description)}
            </p>
          )}
        </div>
      </div>

      {/* Quantity Control */}
      <div className="space-y-3 rounded-lg bg-gray-50 p-4">
        {/* Value Display */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            {effectiveValue}
            {unitText && <span className="ml-2 text-lg text-gray-600">{unitText}</span>}
          </div>
          {priceText && (
            <span
              className={`text-lg font-bold ${totalPriceModifier > 0 ? 'text-theme-brand-primary' : 'text-green-600'}`}
            >
              {priceText}
            </span>
          )}
        </div>

        {/* Increment/Decrement Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            disabled={isAtMin}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold transition-all ${
              isAtMin
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'hover:border-theme-brand-primary hover:bg-theme-brand-secondary border-2 border-gray-300 bg-white text-gray-700'
            } `}
          >
            −
          </button>

          <div className="relative flex-1">
            {/* Visual Progress Bar */}
            <div className="h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="from-theme-brand-accent to-theme-brand-primary h-full bg-gradient-to-r transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Range Labels */}
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>
                {min}
                {unitText && ` ${unitText}`}
              </span>
              <span>
                {max}
                {unitText && ` ${unitText}`}
              </span>
            </div>
          </div>

          <button
            onClick={handleIncrement}
            disabled={isAtMax}
            className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold transition-all ${
              isAtMax
                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                : 'bg-theme-brand-primary hover:bg-theme-brand-primary-hover text-white'
            } `}
          >
            +
          </button>
        </div>

        {/* Direct Input (Optional) */}
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap text-sm text-gray-600">Inserisci valore:</label>
          <input
            type="number"
            value={effectiveValue}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={step}
            className="focus:ring-theme-brand-primary focus:border-theme-brand-primary flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:ring-2"
          />
        </div>

        {/* Step Info */}
        {step > 1 && (
          <p className="text-center text-xs text-gray-500">
            Incrementi di {step}
            {unitText && ` ${unitText}`}
          </p>
        )}
      </div>

      {/* Age Restriction Warning */}
      {customization.age_restricted && (
        <div className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-2">
          <svg
            className="h-5 w-5 flex-shrink-0 text-yellow-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-yellow-800">
            Richiesta età minima: {customization.age_restricted}+ anni
          </span>
        </div>
      )}

      {/* License Warning */}
      {customization.requires_license && (
        <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-2">
          <svg
            className="h-5 w-5 flex-shrink-0 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-blue-800">
            Richiede licenza: {customization.requires_license}
          </span>
        </div>
      )}
    </div>
  );
}
