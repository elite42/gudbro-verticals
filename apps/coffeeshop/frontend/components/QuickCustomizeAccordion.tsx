'use client';

import React from 'react';
import { DishItem, Extra } from '@/types/dish';
import { usePriceFormat } from '@/hooks/usePriceFormat';
import { useQuickCustomizeState } from '@/hooks/useQuickCustomizeState';
import { DynamicCustomizationRenderer } from './customizations';
import { ConflictModal } from './QuickCustomize/ConflictModal';

interface QuickCustomizeAccordionProps {
  dish: DishItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (dish: DishItem, quantity: number, extras: Extra[], saveAsPreference: boolean) => void;
}

/**
 * QuickCustomizeAccordion - Refactored from 533 lines
 *
 * Extracted:
 * - State management → useQuickCustomizeState hook
 * - Price formatting → usePriceFormat hook
 * - Conflict modal → ConflictModal component
 */
export function QuickCustomizeAccordion({
  dish,
  isOpen,
  onClose,
  onAddToCart
}: QuickCustomizeAccordionProps) {
  const { formatPriceCompact } = usePriceFormat();

  const {
    // State
    quantity,
    setQuantity,
    selectedExtras,
    customizationState,
    saveAsPreference,
    setSaveAsPreference,
    showConflictModal,
    setShowConflictModal,
    existingPreference,
    setExistingPreference,

    // Computed
    hasCustomizations,
    customizations,
    hasAnyCustomization,

    // Methods
    calculateTotal,
    handleToggleExtra,
    handleCustomizationChange,
    convertCustomizationsToExtras,
    resetState,
    validateCustomizations,
    hasExistingPreference,
    getExistingPreference,
    savePreference
  } = useQuickCustomizeState({ dish, isOpen });

  const handleAddToCart = () => {
    // Validate customizations if using new system
    if (hasCustomizations) {
      const { isValid, errors } = validateCustomizations();
      if (!isValid) {
        alert('Completa tutte le opzioni richieste:\n' + errors.join('\n'));
        return;
      }
    }

    // Check if user wants to save as preference AND a preference already exists
    if (saveAsPreference && hasExistingPreference()) {
      const existing = getExistingPreference();
      setExistingPreference(existing);
      setShowConflictModal(true);
      return; // Stop here - wait for user decision
    }

    // No conflict - proceed normally
    savePreferenceAndAddToCart();
  };

  const savePreferenceAndAddToCart = () => {
    const extrasToAdd = convertCustomizationsToExtras();

    // Save preference if requested
    if (saveAsPreference) {
      savePreference(extrasToAdd);
    }

    // Add to cart
    onAddToCart(dish, quantity, extrasToAdd, saveAsPreference);

    // Reset state after adding to cart
    resetState();

    onClose();
  };

  const handleKeepExisting = () => {
    // Don't save as preference, but still add to cart
    setSaveAsPreference(false);
    setShowConflictModal(false);
    savePreferenceAndAddToCart();
  };

  const handleReplacePreference = () => {
    // Close modal and proceed with saving (saveAsPreference is still true)
    setShowConflictModal(false);
    savePreferenceAndAddToCart();
  };

  // Group extras by type (old system)
  const groupedExtras = dish.availableExtras?.reduce((acc, extra) => {
    if (!acc[extra.type]) {
      acc[extra.type] = [];
    }
    acc[extra.type].push(extra);
    return acc;
  }, {} as Record<string, Extra[]>);

  if (!isOpen) return null;

  return (
    <>
      <div className="bg-gradient-to-br from-theme-brand-secondary to-theme-brand-secondary rounded-xl shadow-lg border-2 border-theme-brand-accent overflow-hidden animate-slide-down">
        {/* Header */}
        <div className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="font-bold text-lg">Customize Your Order</h3>
              <p className="text-xs opacity-90">{dish.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Database-Driven Customizations (NEW SYSTEM) */}
          {hasCustomizations && (
            <DynamicCustomizationRenderer
              customizations={customizations}
              state={customizationState}
              onChange={handleCustomizationChange}
              language="it"
            />
          )}

          {/* Legacy Extras Selection (OLD SYSTEM) */}
          {!hasCustomizations && groupedExtras && Object.entries(groupedExtras).map(([type, extras]) => (
            <div key={type}>
              <h4 className="font-bold text-gray-900 mb-2 capitalize text-sm">
                {type === 'milk' ? '🥛 Milk' :
                 type === 'size' ? '📏 Size' :
                 type === 'shot' ? '☕ Espresso Shots' :
                 type === 'sweetener' ? '🍯 Sweetener' :
                 type === 'addon' ? '➕ Add-ons' :
                 type === 'liquor' ? '🥃 Liquor' : type}
              </h4>
              <div className="space-y-2">
                {extras.map((extra) => (
                  <label
                    key={extra.id}
                    className="flex items-center justify-between p-3 bg-theme-bg-elevated rounded-lg cursor-pointer hover:bg-amber-50 transition-colors border border-theme-bg-tertiary"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedExtras.some(e => e.id === extra.id)}
                        onChange={() => handleToggleExtra(extra)}
                        className="w-5 h-5 text-theme-brand-primary rounded focus:ring-2 focus:ring-theme-brand-primary"
                      />
                      <span className="font-medium text-theme-text-primary">{extra.name}</span>
                    </div>
                    <span className="font-bold text-theme-brand-primary">+{formatPriceCompact(extra.price)}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity Controls */}
          <div>
            <h4 className="font-bold text-theme-text-primary mb-2 text-sm">🔢 Quantity</h4>
            <div className="flex items-center justify-center gap-4 bg-theme-bg-elevated rounded-xl p-3 border border-theme-bg-tertiary">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-theme-bg-secondary hover:bg-theme-bg-tertiary rounded-full font-bold text-theme-text-primary transition-colors flex items-center justify-center text-xl"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="font-bold text-theme-text-primary text-2xl min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-theme-brand-primary hover:bg-theme-brand-primary-hover rounded-full font-bold text-white transition-colors flex items-center justify-center text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Save as Preference or Add to Favorites */}
          <div className={hasAnyCustomization ? "bg-blue-50 border border-blue-200 rounded-lg p-3" : "bg-red-50 border border-red-200 rounded-lg p-3"}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={saveAsPreference}
                onChange={(e) => setSaveAsPreference(e.target.checked)}
                className={hasAnyCustomization ? "w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" : "w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"}
              />
              <div className="flex-1">
                {hasAnyCustomization ? (
                  <>
                    <span className="font-semibold text-theme-text-primary text-sm">Ricorda la mia scelta</span>
                    <p className="text-xs text-theme-text-secondary">Quick reorder next time with these settings</p>
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-theme-text-primary text-sm">Aggiungi ai Favoriti</span>
                    <p className="text-xs text-theme-text-secondary">Mark as favorite for quick access</p>
                  </>
                )}
              </div>
              <span className="text-xl">{hasAnyCustomization ? '🌟' : '❤️'}</span>
            </label>
          </div>
        </div>

        {/* Footer - Add to Cart */}
        <div className="p-4 bg-theme-bg-elevated border-t-2 border-theme-bg-tertiary">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-primary py-3 rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-[2] bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover text-white py-3 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Add to Order</span>
              <span className="text-xl">{formatPriceCompact(calculateTotal(dish.price))}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Preference Conflict Modal */}
      {existingPreference && (
        <ConflictModal
          isOpen={showConflictModal}
          dishName={dish.name}
          existingPreference={existingPreference}
          newExtras={convertCustomizationsToExtras()}
          onReplace={handleReplacePreference}
          onKeepExisting={handleKeepExisting}
          onClose={() => setShowConflictModal(false)}
        />
      )}
    </>
  );
}
