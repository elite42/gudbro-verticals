'use client';

import React from 'react';
import type { ProductCustomization, CustomizationOption } from '@/database/types';

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
  language = 'en'
}: RadioGroupCustomizationProps) {
  const getName = (text: any): string => {
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const getDescription = (text: any): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  // Find default option if none selected
  const effectiveSelection = selectedOption ||
    customization.options.find(opt => opt.is_default)?.id ||
    null;

  // Determine display style (list, grid, buttons)
  const displayStyle = customization.display_style || 'buttons';

  const renderOption = (option: CustomizationOption) => {
    const isSelected = effectiveSelection === option.id;
    const isUnavailable = option.available === false;
    const optionName = getName(option.name);
    const optionDescription = getDescription(option.description);
    const priceModifier = option.price_modifier;

    // Format price modifier (compact)
    const priceText = priceModifier > 0
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
          className={`
            relative flex flex-col p-4 rounded-xl transition-all duration-200
            ${isSelected
              ? 'bg-gradient-to-br from-theme-brand-primary to-theme-brand-primary text-white shadow-lg scale-105'
              : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-theme-brand-accent hover:shadow-md'
            }
            ${isUnavailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
          `}
        >
          {/* Option Image (if provided) */}
          {option.image && (
            <img
              src={option.image}
              alt={optionName}
              className={`w-full h-16 rounded-lg object-cover mb-2 ${isSelected ? 'opacity-90' : ''}`}
            />
          )}

          {/* Option Name */}
          <div className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {optionName}
          </div>

          {/* Option Description */}
          {optionDescription && (
            <div className={`text-xs mb-2 line-clamp-2 ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
              {optionDescription}
            </div>
          )}

          {/* Price Modifier */}
          {priceText && (
            <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-theme-brand-primary'}`}>
              {priceText}
            </div>
          )}

          {/* Selected Indicator (subtle glow) */}
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-theme-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}

          {isUnavailable && (
            <span className="absolute top-2 right-2 text-xs text-white bg-red-500 px-2 py-0.5 rounded-full">
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
          className={`
            relative flex flex-col items-center p-4 rounded-xl transition-all duration-200
            ${isSelected
              ? 'bg-gradient-to-br from-theme-brand-primary to-theme-brand-primary text-white shadow-lg scale-105'
              : 'bg-white border-2 border-gray-200 hover:border-theme-brand-accent'
            }
            ${isUnavailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
          `}
        >
          {/* Option Image */}
          {option.image && (
            <img
              src={option.image}
              alt={optionName}
              className="w-16 h-16 rounded-lg object-cover mb-2"
            />
          )}

          {/* Option Name */}
          <div className={`font-bold text-sm text-center ${isSelected ? 'text-white' : 'text-gray-900'}`}>
            {optionName}
          </div>

          {/* Price Modifier */}
          {priceText && (
            <span className={`text-xs font-bold mt-1 ${isSelected ? 'text-white' : 'text-theme-brand-primary'}`}>
              {priceText}
            </span>
          )}

          {/* Selected Indicator */}
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-theme-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
        className={`
          flex items-center gap-3 p-3 rounded-lg transition-all w-full text-left
          ${isSelected
            ? 'bg-gradient-to-r from-theme-brand-secondary to-theme-brand-secondary border-2 border-theme-brand-accent'
            : 'bg-white border-2 border-gray-200 hover:border-theme-brand-accent'
          }
          ${isUnavailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {option.image && (
          <img
            src={option.image}
            alt={optionName}
            className="w-10 h-10 rounded object-cover"
          />
        )}

        <div className="flex-1">
          <div className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-900'}`}>
            {optionName}
          </div>
          {optionDescription && (
            <div className="text-xs text-gray-600">{optionDescription}</div>
          )}
        </div>

        {priceText && (
          <span className={`text-sm font-semibold ${priceModifier > 0 ? 'text-theme-brand-primary' : 'text-green-600'}`}>
            {priceText}
          </span>
        )}

        {/* Selected Indicator */}
        {isSelected && (
          <div className="w-5 h-5 bg-theme-brand-primary rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
        {customization.icon && (
          <span className="text-2xl">{customization.icon}</span>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-900 text-base">
              {getName(customization.name)}
            </h3>
            {customization.required && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded-full font-semibold">
                Obbligatorio
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

      {/* Options - 2 COLUMN LAYOUT FOR BUTTONS */}
      <div className={`
        ${displayStyle === 'buttons'
          ? 'grid grid-cols-2 gap-3'  // 2 columns for mobile
          : displayStyle === 'grid'
          ? 'grid grid-cols-2 sm:grid-cols-3 gap-3'
          : 'space-y-2'
        }
      `}>
        {customization.options
          .filter(opt => opt.available !== false || effectiveSelection === opt.id)
          .map(renderOption)}
      </div>

      {/* Age Restriction Warning */}
      {customization.age_restricted && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-yellow-900 font-semibold">
            ⚠️ Età minima: {customization.age_restricted}+ anni
          </span>
        </div>
      )}

      {/* License Warning */}
      {customization.requires_license && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border-2 border-blue-300 rounded-lg">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-blue-900 font-semibold">
            📋 Licenza richiesta: {customization.requires_license}
          </span>
        </div>
      )}
    </div>
  );
}
