'use client';

import React from 'react';
import type { ProductCustomization, CustomizationOption } from '@/database/types';

interface CheckboxGroupCustomizationProps {
  customization: ProductCustomization;
  selectedOptions: string[];
  onChange: (optionIds: string[]) => void;
  language?: 'en' | 'it' | 'vi';
}

/**
 * Dynamic Checkbox Group Customization Component
 * Renders a multi-choice customization group with min/max validation
 *
 * Example usage:
 * - Pizza toppings: Mozzarella, Basil, Mushrooms, Olives (min: 0, max: 5)
 * - Pasta extras: Extra cheese, Extra vegetables (min: 0, max: unlimited)
 * - Beverage add-ons: Extra ice, No ice (min: 0, max: 1)
 */
export function CheckboxGroupCustomization({
  customization,
  selectedOptions,
  onChange,
  language = 'en'
}: CheckboxGroupCustomizationProps) {
  const getName = (text: any): string => {
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const getDescription = (text: any): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const minSelections = customization.min_selections || 0;
  const maxSelections = customization.max_selections;

  // Handle checkbox toggle
  const handleToggle = (optionId: string) => {
    const isSelected = selectedOptions.includes(optionId);

    if (isSelected) {
      // Remove option
      const newSelections = selectedOptions.filter(id => id !== optionId);
      onChange(newSelections);
    } else {
      // Add option (if max not reached)
      if (!maxSelections || selectedOptions.length < maxSelections) {
        onChange([...selectedOptions, optionId]);
      }
    }
  };

  // Check if option can be selected
  const canSelectMore = !maxSelections || selectedOptions.length < maxSelections;

  // Validation state
  const isValid = selectedOptions.length >= minSelections &&
    (!maxSelections || selectedOptions.length <= maxSelections);

  const renderOption = (option: CustomizationOption) => {
    const isSelected = selectedOptions.includes(option.id);
    const isUnavailable = option.available === false;
    const optionName = getName(option.name);
    const optionDescription = getDescription(option.description);
    const priceModifier = option.price_modifier;

    // Check if this option can still be selected
    const isDisabled = isUnavailable || (!isSelected && !canSelectMore);

    // Format price modifier
    const priceText = priceModifier > 0
      ? `+${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceModifier)}`
      : priceModifier < 0
      ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceModifier)
      : '';

    return (
      <label
        key={option.id}
        className={`
          relative flex items-center gap-3 p-3 rounded-lg border-2 transition-all
          ${isSelected
            ? 'border-theme-brand-primary bg-theme-brand-secondary'
            : 'border-gray-200 bg-white hover:border-theme-brand-accent'
          }
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => !isDisabled && handleToggle(option.id)}
          disabled={isDisabled}
          className="w-5 h-5 text-theme-brand-primary border-gray-300 rounded focus:ring-theme-brand-primary"
        />

        {/* Option Image (if provided) */}
        {option.image && (
          <img
            src={option.image}
            alt={optionName}
            className="w-10 h-10 rounded object-cover"
          />
        )}

        {/* Option Details */}
        <div className="flex-1">
          <div className="font-medium text-gray-900">{optionName}</div>
          {optionDescription && (
            <div className="text-xs text-gray-600">{optionDescription}</div>
          )}
          {option.max_per_order && (
            <div className="text-xs text-theme-brand-primary mt-1">
              Max: {option.max_per_order} per ordine
            </div>
          )}
        </div>

        {/* Price Modifier */}
        {priceText && (
          <span className={`text-sm font-semibold ${priceModifier > 0 ? 'text-theme-brand-primary' : 'text-green-600'}`}>
            {priceText}
          </span>
        )}

        {isUnavailable && (
          <span className="absolute top-1 right-1 text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
            Non disponibile
          </span>
        )}
      </label>
    );
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2">
        {customization.icon && (
          <span className="text-xl">{customization.icon}</span>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900">
              {getName(customization.name)}
            </h3>
            {customization.required && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
                Obbligatorio
              </span>
            )}
            {minSelections > 0 && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Min: {minSelections}
              </span>
            )}
            {maxSelections && (
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Max: {maxSelections}
              </span>
            )}
          </div>
          {customization.description && (
            <p className="text-sm text-gray-600 mt-1">
              {getDescription(customization.description)}
            </p>
          )}
        </div>
      </div>

      {/* Selection Counter */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Selezionati: {selectedOptions.length}
          {maxSelections && ` / ${maxSelections}`}
        </span>
        {!isValid && (
          <span className="text-red-600 font-medium">
            {selectedOptions.length < minSelections
              ? `Seleziona almeno ${minSelections}`
              : `Massimo ${maxSelections} opzioni`
            }
          </span>
        )}
      </div>

      {/* Options */}
      <div className="space-y-2">
        {customization.options
          .filter(opt => opt.available !== false || selectedOptions.includes(opt.id))
          .map(renderOption)}
      </div>

      {/* Max Reached Warning */}
      {maxSelections && selectedOptions.length >= maxSelections && (
        <div className="flex items-center gap-2 p-2 bg-theme-brand-secondary border border-theme-brand-accent rounded-lg">
          <svg className="w-5 h-5 text-theme-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-theme-brand-primary">
            Hai raggiunto il numero massimo di opzioni selezionabili
          </span>
        </div>
      )}

      {/* Age Restriction Warning */}
      {customization.age_restricted && (
        <div className="flex items-center gap-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-yellow-800">
            Richiesta età minima: {customization.age_restricted}+ anni
          </span>
        </div>
      )}

      {/* License Warning */}
      {customization.requires_license && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-blue-800">
            Richiede licenza: {customization.requires_license}
          </span>
        </div>
      )}
    </div>
  );
}
