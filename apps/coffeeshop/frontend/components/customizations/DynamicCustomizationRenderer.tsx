'use client';

import React from 'react';
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

// Flexible type for customization options - accepts both local and shared types
interface FlexibleCustomizationOption {
  id: string;
  name: string | { en?: string; it?: string; vi?: string };
  price_modifier?: number;
  is_default?: boolean;
}

// Flexible type for customizations - accepts both local and shared types
interface FlexibleProductCustomization {
  id: string;
  name: string | { en?: string; it?: string; vi?: string };
  type: string;
  options?: FlexibleCustomizationOption[];
  required?: boolean;
  display_order?: number;
  hidden_by_default?: boolean;
  min_selections?: number;
  max_selections?: number;
  quantity_config?: {
    min: number;
    max: number;
    step: number;
    default: number;
    unit?: { en?: string; it?: string; vi?: string };
  };
}

// Helper to get name string from flexible name
function getNameString(name: string | { en?: string; it?: string; vi?: string }): string {
  if (typeof name === 'string') return name;
  return name.en || name.it || name.vi || 'Unknown';
}

interface DynamicCustomizationRendererProps {
  customizations: FlexibleProductCustomization[];
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
  language = 'en',
}: DynamicCustomizationRendererProps) {
  // Sort customizations by display_order (default to 0 if undefined)
  const sortedCustomizations = [...customizations].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  // Separate hidden and visible customizations
  const visibleCustomizations = sortedCustomizations.filter((c) => !c.hidden_by_default);
  const hiddenCustomizations = sortedCustomizations.filter((c) => c.hidden_by_default);

  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const renderCustomization = (customization: FlexibleProductCustomization) => {
    const currentValue = state[customization.id];
    // Cast to any for sub-component compatibility - runtime structure is compatible
    const flexibleCustomization = customization as any;

    switch (customization.type) {
      case 'radio':
        return (
          <RadioGroupCustomization
            key={customization.id}
            customization={flexibleCustomization}
            selectedOption={(currentValue as string) || null}
            onChange={(optionId) => onChange(customization.id, optionId)}
            language={language}
          />
        );

      case 'checkbox':
        return (
          <CheckboxGroupCustomization
            key={customization.id}
            customization={flexibleCustomization}
            selectedOptions={(currentValue as string[]) || []}
            onChange={(optionIds) => onChange(customization.id, optionIds)}
            language={language}
          />
        );

      case 'quantity':
      case 'number':
        return (
          <QuantityCustomization
            key={customization.id}
            customization={flexibleCustomization}
            value={
              typeof currentValue === 'number'
                ? currentValue
                : customization.quantity_config?.default || 0
            }
            onChange={(value) => onChange(customization.id, value)}
            language={language}
          />
        );

      case 'text':
        return (
          <TextInputCustomization
            key={customization.id}
            customization={flexibleCustomization}
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
            className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
          >
            <span className="font-semibold text-gray-900">Opzioni Avanzate</span>
            <svg
              className={`h-5 w-5 text-gray-600 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-6">{hiddenCustomizations.map(renderCustomization)}</div>
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
  customizations: FlexibleProductCustomization[],
  state: CustomizationState
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const customization of customizations) {
    const value = state[customization.id];

    // Check required fields
    const name = getNameString(customization.name);
    if (customization.required) {
      if (customization.type === 'radio' && !value) {
        errors.push(`${name} is required`);
      }
      if (customization.type === 'checkbox' && (!value || (value as string[]).length === 0)) {
        errors.push(`${name} requires at least one selection`);
      }
      if (customization.type === 'text' && !value) {
        errors.push(`${name} is required`);
      }
    }

    // Check min/max selections for checkboxes
    if (customization.type === 'checkbox' && value) {
      const selections = value as string[];
      if (customization.min_selections && selections.length < customization.min_selections) {
        errors.push(`${name} requires at least ${customization.min_selections} selections`);
      }
      if (customization.max_selections && selections.length > customization.max_selections) {
        errors.push(`${name} allows maximum ${customization.max_selections} selections`);
      }
    }

    // Check quantity bounds
    if (
      (customization.type === 'quantity' || customization.type === 'number') &&
      customization.quantity_config
    ) {
      const numValue = value as number;
      const { min, max } = customization.quantity_config;
      if (numValue < min || numValue > max) {
        errors.push(`${name} must be between ${min} and ${max}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Price Calculation Helper
 * Calculates total price modifier from customization state
 */
export function calculateCustomizationPrice(
  customizations: FlexibleProductCustomization[],
  state: CustomizationState
): number {
  let totalModifier = 0;

  for (const customization of customizations) {
    const value = state[customization.id];
    const options = customization.options || [];

    if (!value) continue;

    if (customization.type === 'radio') {
      const selectedOption = options.find((opt) => opt.id === value);
      if (selectedOption?.price_modifier) {
        totalModifier += selectedOption.price_modifier;
      }
    }

    if (customization.type === 'checkbox') {
      const selectedIds = value as string[];
      for (const optionId of selectedIds) {
        const option = options.find((opt) => opt.id === optionId);
        if (option?.price_modifier) {
          totalModifier += option.price_modifier;
        }
      }
    }

    if (customization.type === 'quantity' || customization.type === 'number') {
      const option = options[0];
      if (option?.price_modifier) {
        totalModifier += option.price_modifier * (value as number);
      }
    }
  }

  return totalModifier;
}
