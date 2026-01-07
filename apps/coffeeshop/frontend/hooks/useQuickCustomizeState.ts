'use client';

import { useState, useEffect } from 'react';
import { DishItem, Extra } from '@/types/dish';
import { currencyPreferencesStore } from '@/lib/currency-preferences';
import { tableContextStore } from '@/lib/table-context-store';
import { dishPreferencesStore, DishPreference } from '@/lib/dish-preferences';
import {
  CustomizationState,
  validateCustomizations,
  calculateCustomizationPrice,
} from '@/components/customizations';
// Local ProductCustomization type - flexible for frontend use
// Named differently to avoid conflicts with shared database types
interface LocalProductCustomizationOption {
  id: string;
  name: string | { en?: string; it?: string; vi?: string };
  price_modifier: number;
  is_default?: boolean;
}

interface LocalProductCustomization {
  id: string;
  name: string | { en?: string; it?: string; vi?: string };
  type: 'radio' | 'checkbox' | 'number';
  options: LocalProductCustomizationOption[];
  required?: boolean;
  minSelections?: number;
  maxSelections?: number;
}

interface UseQuickCustomizeStateProps {
  dish: DishItem;
  isOpen: boolean;
}

/**
 * Hook for managing QuickCustomizeAccordion state
 */
export function useQuickCustomizeState({ dish, isOpen }: UseQuickCustomizeStateProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [customizationState, setCustomizationState] = useState<CustomizationState>({});
  const [saveAsPreference, setSaveAsPreference] = useState(false);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [existingPreference, setExistingPreference] = useState<DishPreference | null>(null);
  const [tableContext, setTableContext] = useState(() => tableContextStore.get());

  // Check if product has database-driven customizations
  const hasCustomizations =
    !!(dish as any).customizations && Array.isArray((dish as any).customizations);
  const customizations: LocalProductCustomization[] = hasCustomizations
    ? (dish as any).customizations
    : [];

  // Listen for currency preferences changes
  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  // Listen for table context changes
  useEffect(() => {
    const handleTableContextUpdate = (event: CustomEvent) => {
      setTableContext(event.detail);
    };

    if (typeof window !== 'undefined') {
      setTableContext(tableContextStore.get());
      window.addEventListener('table-context-updated', handleTableContextUpdate as EventListener);
      return () =>
        window.removeEventListener(
          'table-context-updated',
          handleTableContextUpdate as EventListener
        );
    }
  }, []);

  // Reset state when dish changes or when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedExtras([]);
      setCustomizationState({});
      setSaveAsPreference(false);

      // Initialize customization state with defaults
      if (hasCustomizations) {
        const initialState: CustomizationState = {};
        customizations.forEach((customization) => {
          const defaultOption = customization.options.find((opt) => opt.is_default);
          if (defaultOption && customization.type === 'radio') {
            initialState[customization.id] = defaultOption.id;
          }
        });

        // Auto-set consumption type from table context
        const consumptionCustomization = customizations.find(
          (c) => c.id === 'espresso-consumption'
        );
        if (consumptionCustomization && tableContext.table_number) {
          const consumptionOptionId =
            tableContext.consumption_type === 'dine-in' ? 'al-tavolo' : 'da-portare-via';
          initialState['espresso-consumption'] = consumptionOptionId;
        }

        setCustomizationState(initialState);
      }
    }
  }, [
    dish.id,
    isOpen,
    hasCustomizations,
    tableContext.consumption_type,
    tableContext.table_number,
  ]);

  // Check if there are meaningful customizations (not just defaults)
  const hasAnyCustomization = () => {
    // Quantity changed from default
    if (quantity > 1) return true;

    // Extras added (legacy system)
    if (selectedExtras.length > 0) return true;

    // Database-driven customizations changed from defaults
    if (hasCustomizations && Object.keys(customizationState).length > 0) {
      // Check if any customization differs from the default
      for (const customizationId in customizationState) {
        const customization = customizations.find((c) => c.id === customizationId);
        if (!customization) continue;

        const selectedValue = customizationState[customizationId];

        // For radio: check if selected option is not the default
        if (customization.type === 'radio' && typeof selectedValue === 'string') {
          const selectedOption = customization.options.find((opt) => opt.id === selectedValue);
          if (selectedOption && !selectedOption.is_default) return true;
        }

        // For checkbox: if any option is selected, it's a customization
        if (
          customization.type === 'checkbox' &&
          Array.isArray(selectedValue) &&
          selectedValue.length > 0
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const calculateTotal = (basePrice: number) => {
    if (hasCustomizations) {
      const customizationPrice = calculateCustomizationPrice(customizations, customizationState);
      return (basePrice + customizationPrice) * quantity;
    } else {
      const extrasPrice = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
      return (basePrice + extrasPrice) * quantity;
    }
  };

  const handleToggleExtra = (extra: Extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.id === extra.id);

      // For 'milk' and 'size' types, only one can be selected (radio behavior)
      if (extra.type === 'milk' || extra.type === 'size') {
        if (exists) {
          // Deselect if clicking the same one
          return prev.filter((e) => e.type !== extra.type);
        } else {
          // Remove any other of same type and add this one
          return [...prev.filter((e) => e.type !== extra.type), extra];
        }
      }

      // For other types (shot, addon, etc.), allow multiple selections
      if (exists) {
        return prev.filter((e) => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const handleCustomizationChange = (id: string, value: string | string[] | number) => {
    setCustomizationState((prev) => ({ ...prev, [id]: value }));

    // Sync consumption type with table context
    if (id === 'espresso-consumption') {
      const newConsumptionType = value === 'al-tavolo' ? 'dine-in' : 'takeaway';
      if (newConsumptionType !== tableContext.consumption_type && tableContext.table_number) {
        tableContextStore.setConsumptionType(newConsumptionType);
      }
    }
  };

  // Convert customizationState to extras array for cart
  const convertCustomizationsToExtras = (): Extra[] => {
    if (!hasCustomizations) return selectedExtras;

    const extrasToAdd: Extra[] = [];
    customizations.forEach((customization) => {
      const selectedValue = customizationState[customization.id];

      if (customization.type === 'radio' && selectedValue) {
        const selectedOption = customization.options.find((opt) => opt.id === selectedValue);
        if (selectedOption) {
          const optionName =
            typeof selectedOption.name === 'string'
              ? selectedOption.name
              : selectedOption.name.it || selectedOption.name.en || '';
          const optionNameLower = optionName.toLowerCase();

          const isNoneOption =
            optionNameLower.includes('nessuno') || optionNameLower.includes('none');
          const isDefaultWithNoPrice =
            selectedOption.is_default && selectedOption.price_modifier === 0;
          const isMeaningful = !isNoneOption && !isDefaultWithNoPrice;

          if (isMeaningful) {
            extrasToAdd.push({
              id: `${customization.id}-${selectedOption.id}`,
              name: optionName,
              price: selectedOption.price_modifier,
              type: 'addon',
            });
          }
        }
      } else if (customization.type === 'checkbox' && Array.isArray(selectedValue)) {
        selectedValue.forEach((optionId: string) => {
          const selectedOption = customization.options.find((opt) => opt.id === optionId);
          if (selectedOption) {
            const optionName =
              typeof selectedOption.name === 'string'
                ? selectedOption.name
                : selectedOption.name.it || selectedOption.name.en || '';
            const optionNameLower = optionName.toLowerCase();

            const isNoneOption =
              optionNameLower.includes('nessuno') || optionNameLower.includes('none');
            const isDefaultWithNoPrice =
              selectedOption.is_default && selectedOption.price_modifier === 0;
            const isMeaningful = !isNoneOption && !isDefaultWithNoPrice;

            if (isMeaningful) {
              extrasToAdd.push({
                id: `${customization.id}-${selectedOption.id}`,
                name: optionName,
                price: selectedOption.price_modifier,
                type: 'addon',
              });
            }
          }
        });
      }
    });

    return extrasToAdd;
  };

  const resetState = () => {
    setQuantity(1);
    setSelectedExtras([]);
    setCustomizationState({});
    setSaveAsPreference(false);
  };

  return {
    // State
    quantity,
    setQuantity,
    selectedExtras,
    customizationState,
    saveAsPreference,
    setSaveAsPreference,
    currencyPrefs,
    showConflictModal,
    setShowConflictModal,
    existingPreference,
    setExistingPreference,
    tableContext,

    // Computed
    hasCustomizations,
    customizations,
    hasAnyCustomization: hasAnyCustomization(),

    // Methods
    calculateTotal,
    handleToggleExtra,
    handleCustomizationChange,
    convertCustomizationsToExtras,
    resetState,

    // Validation
    validateCustomizations: () => validateCustomizations(customizations, customizationState),
    hasExistingPreference: () => dishPreferencesStore.has(dish.id),
    getExistingPreference: () => dishPreferencesStore.get(dish.id),
    savePreference: (extras: Extra[]) =>
      dishPreferencesStore.set(dish.id, dish.name, extras, quantity),
  };
}
