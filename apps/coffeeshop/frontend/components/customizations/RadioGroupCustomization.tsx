'use client';

import React from 'react';
import type { ProductCustomization, CustomizationOption, MultiLangText } from '@/database/types';

interface RadioGroupCustomizationProps {
  customization: ProductCustomization;
  selectedOption: string | null;
  onChange: (optionId: string) => void;
  language?: 'en' | 'it' | 'vi';
}

/**
 * Dynamic Radio Group Customization Component
 * Renders a single-choice customization group (e.g., "Cup Size", "Coffee Length")
 *
 * REDESIGNED:
 * - 2-column layout for mobile
 * - Illumination instead of radio circles
 * - Measurements in cl displayed
 */
export function RadioGroupCustomization({
  customization,
  selectedOption,
  onChange,
  language = 'en',
}: RadioGroupCustomizationProps) {
  const getName = (text: MultiLangText | string): string => {
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const getDescription = (text: MultiLangText | string | undefined): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  // Find default option if none selected
  const effectiveSelection =
    selectedOption || customization.options.find((opt) => opt.is_default)?.id || null;

  // Determine display style (list, grid, buttons)
  const displayStyle = customization.display_style || 'buttons';

  const renderOption = (option: CustomizationOption) => {
    const isSelected = effectiveSelection === option.id;
    const isUnavailable = option.available === false;
    const optionName = getName(option.name);
    const optionDescription = getDescription(option.description);
    const priceModifier = option.price_modifier;

    // Format price modifier (compact)
    const priceText =
      priceModifier > 0
        ? `+${Math.round(priceModifier / 1000)}K`
        : priceModifier < 0
          ? `${Math.round(priceModifier / 1000)}K`
          : '';

    if (displayStyle === 'buttons') {
      return (
        <button
          key={option.id}
          onClick={() => !isUnavailable && onChange(option.id)}
          disabled={isUnavailable}
          className={`relative flex flex-col rounded-xl p-4 transition-all duration-200 ${
            isSelected
              ? 'from-theme-brand-primary to-theme-brand-primary scale-105 bg-gradient-to-br text-white shadow-lg'
              : 'hover:border-theme-brand-accent border-2 border-gray-200 bg-white text-gray-900 hover:shadow-md'
          } ${isUnavailable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-95'} `}
        >
          {/* Option Image (if provided) */}
          {option.image && (
            <img
              src={option.image}
              alt={optionName}
              className={`mb-2 h-16 w-full rounded-lg object-cover ${isSelected ? 'opacity-90' : ''}`}
            />
          )}

          {/* Option Name */}
          <div className={`mb-1 text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {optionName}
          </div>

          {/* Option Description */}
          {optionDescription && (
            <div
              className={`mb-2 line-clamp-2 text-xs ${isSelected ? 'text-white/90' : 'text-gray-600'}`}
            >
              {optionDescription}
            </div>
          )}

          {/* Price Modifier */}
          {priceText && (
            <div
              className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-theme-brand-primary'}`}
            >
              {priceText}
            </div>
          )}

          {/* Selected Indicator (subtle glow) */}
          {isSelected && (
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
              <svg
                className="text-theme-brand-primary h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {isUnavailable && (
            <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
              N/D
            </span>
          )}
        </button>
      );
    }

    if (displayStyle === 'grid') {
      return (
        <button
          key={option.id}
          onClick={() => !isUnavailable && onChange(option.id)}
          disabled={isUnavailable}
          className={`relative flex flex-col items-center rounded-xl p-4 transition-all duration-200 ${
            isSelected
              ? 'from-theme-brand-primary to-theme-brand-primary scale-105 bg-gradient-to-br text-white shadow-lg'
              : 'hover:border-theme-brand-accent border-2 border-gray-200 bg-white'
          } ${isUnavailable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer active:scale-95'} `}
        >
          {/* Option Image */}
          {option.image && (
            <img
              src={option.image}
              alt={optionName}
              className="mb-2 h-16 w-16 rounded-lg object-cover"
            />
          )}

          {/* Option Name */}
          <div
            className={`text-center text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}
          >
            {optionName}
          </div>

          {/* Price Modifier */}
          {priceText && (
            <span
              className={`mt-1 text-xs font-bold ${isSelected ? 'text-white' : 'text-theme-brand-primary'}`}
            >
              {priceText}
            </span>
          )}

          {/* Selected Indicator */}
          {isSelected && (
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
              <svg
                className="text-theme-brand-primary h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      );
    }

    // List style (default - with illumination)
    return (
      <button
        key={option.id}
        onClick={() => !isUnavailable && onChange(option.id)}
        disabled={isUnavailable}
        className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all ${
          isSelected
            ? 'from-theme-brand-secondary to-theme-brand-secondary border-theme-brand-accent border-2 bg-gradient-to-r'
            : 'hover:border-theme-brand-accent border-2 border-gray-200 bg-white'
        } ${isUnavailable ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} `}
      >
        {option.image && (
          <img src={option.image} alt={optionName} className="h-10 w-10 rounded object-cover" />
        )}

        <div className="flex-1">
          <div className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-900'}`}>
            {optionName}
          </div>
          {optionDescription && <div className="text-xs text-gray-600">{optionDescription}</div>}
        </div>

        {priceText && (
          <span
            className={`text-sm font-semibold ${priceModifier > 0 ? 'text-theme-brand-primary' : 'text-green-600'}`}
          >
            {priceText}
          </span>
        )}

        {/* Selected Indicator */}
        {isSelected && (
          <div className="bg-theme-brand-primary flex h-5 w-5 items-center justify-center rounded-full">
            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2">
        {customization.icon && <span className="text-2xl">{customization.icon}</span>}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">{getName(customization.name)}</h3>
            {customization.required && (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
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

      {/* Options - 2 COLUMN LAYOUT FOR BUTTONS */}
      <div
        className={` ${
          displayStyle === 'buttons'
            ? 'grid grid-cols-2 gap-3' // 2 columns for mobile
            : displayStyle === 'grid'
              ? 'grid grid-cols-2 gap-3 sm:grid-cols-3'
              : 'space-y-2'
        } `}
      >
        {customization.options
          .filter((opt) => opt.available !== false || effectiveSelection === opt.id)
          .map(renderOption)}
      </div>

      {/* Age Restriction Warning */}
      {customization.age_restricted && (
        <div className="flex items-center gap-2 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-3">
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
          <span className="text-sm font-semibold text-yellow-900">
            ⚠️ Età minima: {customization.age_restricted}+ anni
          </span>
        </div>
      )}

      {/* License Warning */}
      {customization.requires_license && (
        <div className="flex items-center gap-2 rounded-lg border-2 border-blue-300 bg-blue-50 p-3">
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
          <span className="text-sm font-semibold text-blue-900">
            📋 Licenza richiesta: {customization.requires_license}
          </span>
        </div>
      )}
    </div>
  );
}
