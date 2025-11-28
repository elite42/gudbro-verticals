'use client';

import React from 'react';
import type { ProductCustomization } from '@/database/types';

interface TextInputCustomizationProps {
  customization: ProductCustomization;
  value: string;
  onChange: (value: string) => void;
  language?: 'en' | 'it' | 'vi';
}

/**
 * Dynamic Text Input Customization Component
 * Renders a free-text input field for custom instructions
 *
 * Example usage:
 * - Special instructions: "No onions", "Extra spicy", etc.
 * - Name on drink: "John", "Sarah", etc.
 * - Gift message: "Happy Birthday!"
 * - Delivery notes: "Leave at door"
 */
export function TextInputCustomization({
  customization,
  value,
  onChange,
  language = 'en'
}: TextInputCustomizationProps) {
  const getName = (text: any): string => {
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const getDescription = (text: any): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return text?.[language] || text?.en || '';
  };

  const maxLength = 200; // Default max length for text inputs
  const currentLength = value.length;
  const isNearLimit = currentLength > maxLength * 0.8;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start gap-2">
        {customization.icon && (
          <span className="text-xl">{customization.icon}</span>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">
              {getName(customization.name)}
            </h3>
            {customization.required && (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-0.5 rounded">
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

      {/* Text Input */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Inserisci ${getName(customization.name).toLowerCase()}...`}
          maxLength={maxLength}
          rows={3}
          className={`
            w-full px-4 py-3 border-2 rounded-lg resize-none
            focus:outline-none focus:ring-2 transition-all
            ${customization.required && !value
              ? 'border-red-200 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-200 focus:border-theme-brand-primary focus:ring-theme-brand-secondary'
            }
          `}
        />

        {/* Character Counter */}
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <span className={`text-xs font-medium ${
            isNearLimit ? 'text-theme-brand-primary' : 'text-gray-500'
          }`}>
            {currentLength} / {maxLength}
          </span>
        </div>
      </div>

      {/* Validation Warning */}
      {customization.required && !value && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-red-800">
            Questo campo è obbligatorio
          </span>
        </div>
      )}

      {/* Helpful Examples (if options provided as suggestions) */}
      {customization.options && customization.options.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Esempi comuni:</p>
          <div className="flex flex-wrap gap-2">
            {customization.options.slice(0, 6).map((option) => (
              <button
                key={option.id}
                onClick={() => onChange(getName(option.name))}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-theme-brand-secondary border border-gray-300 hover:border-theme-brand-accent rounded-full transition-colors"
              >
                {getName(option.name)}
              </button>
            ))}
          </div>
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
