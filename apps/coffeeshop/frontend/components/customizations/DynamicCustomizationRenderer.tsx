'use client';

import React from 'react';
import type { ProductCustomization } from '@/database/types';
import { RadioGroupCustomization } from './RadioGroupCustomization';
import { CheckboxGroupCustomization } from './CheckboxGroupCustomization';
import { QuantityCustomization } from './QuantityCustomization';
import { TextInputCustomization } from './TextInputCustomization';

/**
 * Customization State Structure
 * Each customization stores its state differently based on type:
 * - radio: string (single option ID)
 * - checkbox: string[] (multiple option IDs)
 * - quantity: number (numeric value)
 * - text: string (free text)
 */
export interface CustomizationState {
  [customizationId: string]: string | string[] | number;
}

interface DynamicCustomizationRendererProps {
  customizations: ProductCustomization[];
  state: CustomizationState;
  onChange: (customizationId: string, value: string | string[] | number) => void;
  language?: 'en' | 'it' | 'vi';
}

/**
 * Dynamic Customization Renderer
 * Master component that renders all product customizations dynamically based on database configuration
 *
 * This component:
 * 1. Receives an array of ProductCustomization from the database
 * 2. Sorts them by display_order
 * 3. Renders the appropriate UI component for each customization type
 * 4. Manages validation and state
 *
 * Example usage in DishCard or ProductModal:
 * ```tsx
 * const [customizationState, setCustomizationState] = useState<CustomizationState>({});
 *
 * const handleCustomizationChange = (id: string, value: string | string[] | number) => {
 *   setCustomizationState(prev => ({ ...prev, [id]: value }));
 * };
 *
 * <DynamicCustomizationRenderer
 *   customizations={product.customizations}
 *   state={customizationState}
 *   onChange={handleCustomizationChange}
 *   language="it"
 * />
 * ```
 */
export function DynamicCustomizationRenderer({
  customizations,
  state,
  onChange,
  language = 'en'
}: DynamicCustomizationRendererProps) {
  // Sort customizations by display_order
  const sortedCustomizations = [...customizations].sort(
    (a, b) => a.display_order - b.display_order
  );

  // Separate hidden and visible customizations
  const visibleCustomizations = sortedCustomizations.filter(c => !c.hidden_by_default);
  const hiddenCustomizations = sortedCustomizations.filter(c => c.hidden_by_default);

  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const renderCustomization = (customization: ProductCustomization) => {
    const currentValue = state[customization.id];

    switch (customization.type) {
      case 'radio':
        return (
          <RadioGroupCustomization
            key={customization.id}
            customization={customization}
            selectedOption={currentValue as string || null}
            onChange={(optionId) => onChange(customization.id, optionId)}
            language={language}
          />
        );

      case 'checkbox':
        return (
          <CheckboxGroupCustomization
            key={customization.id}
            customization={customization}
            selectedOptions={(currentValue as string[]) || []}
            onChange={(optionIds) => onChange(customization.id, optionIds)}
            language={language}
          />
        );

      case 'quantity':
        return (
          <QuantityCustomization
            key={customization.id}
            customization={customization}
            value={typeof currentValue === 'number' ? currentValue : (customization.quantity_config?.default || 0)}
            onChange={(value) => onChange(customization.id, value)}
            language={language}
          />
        );

      case 'text':
        return (
          <TextInputCustomization
            key={customization.id}
            customization={customization}
            value={(currentValue as string) || ''}
            onChange={(value) => onChange(customization.id, value)}
            language={language}
          />
        );

      default:
        console.error(`Unknown customization type: ${customization.type}`);
        return null;
    }
  };

  if (customizations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Visible Customizations */}
      {visibleCustomizations.map(renderCustomization)}

      {/* Advanced Options (Hidden by Default) */}
      {hiddenCustomizations.length > 0 && (
        <div className="border-t pt-4">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="font-semibold text-gray-900">Opzioni Avanzate</span>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-6">
              {hiddenCustomizations.map(renderCustomization)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Validation Helper
 * Validates customization state against requirements
 */
export function validateCustomizations(
  customizations: ProductCustomization[],
  state: CustomizationState
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const customization of customizations) {
    const value = state[customization.id];

    // Check required fields
    if (customization.required) {
      if (customization.type === 'radio' && !value) {
        errors.push(`${customization.name.en || customization.name} is required`);
      }
      if (customization.type === 'checkbox' && (!value || (value as string[]).length === 0)) {
        errors.push(`${customization.name.en || customization.name} requires at least one selection`);
      }
      if (customization.type === 'text' && !value) {
        errors.push(`${customization.name.en || customization.name} is required`);
      }
    }

    // Check min/max selections for checkboxes
    if (customization.type === 'checkbox' && value) {
      const selections = value as string[];
      if (customization.min_selections && selections.length < customization.min_selections) {
        errors.push(
          `${customization.name.en || customization.name} requires at least ${customization.min_selections} selections`
        );
      }
      if (customization.max_selections && selections.length > customization.max_selections) {
        errors.push(
          `${customization.name.en || customization.name} allows maximum ${customization.max_selections} selections`
        );
      }
    }

    // Check quantity bounds
    if (customization.type === 'quantity' && customization.quantity_config) {
      const numValue = value as number;
      const { min, max } = customization.quantity_config;
      if (numValue < min || numValue > max) {
        errors.push(
          `${customization.name.en || customization.name} must be between ${min} and ${max}`
        );
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Price Calculation Helper
 * Calculates total price modifier from customization state
 */
export function calculateCustomizationPrice(
  customizations: ProductCustomization[],
  state: CustomizationState
): number {
  let totalModifier = 0;

  for (const customization of customizations) {
    const value = state[customization.id];

    if (!value) continue;

    if (customization.type === 'radio') {
      const selectedOption = customization.options.find(opt => opt.id === value);
      if (selectedOption) {
        totalModifier += selectedOption.price_modifier;
      }
    }

    if (customization.type === 'checkbox') {
      const selectedIds = value as string[];
      for (const optionId of selectedIds) {
        const option = customization.options.find(opt => opt.id === optionId);
        if (option) {
          totalModifier += option.price_modifier;
        }
      }
    }

    if (customization.type === 'quantity') {
      const option = customization.options?.[0];
      if (option) {
        totalModifier += option.price_modifier * (value as number);
      }
    }
  }

  return totalModifier;
}
