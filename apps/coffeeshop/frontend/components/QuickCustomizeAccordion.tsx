'use client';

import React from 'react';
import { DishItem, Extra } from '@/types/dish';
import { useAppPriceFormat as usePriceFormat } from '@/lib/currency';
import { useQuickCustomizeState } from '@/hooks/useQuickCustomizeState';
import { DynamicCustomizationRenderer } from './customizations';
import { ConflictModal } from './QuickCustomize/ConflictModal';

interface QuickCustomizeAccordionProps {
  dish: DishItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    dish: DishItem,
    quantity: number,
    extras: Extra[],
    saveAsPreference: boolean
  ) => void;
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
  onAddToCart,
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
    savePreference,
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
  const groupedExtras = dish.availableExtras?.reduce(
    (acc, extra) => {
      if (!acc[extra.type]) {
        acc[extra.type] = [];
      }
      acc[extra.type].push(extra);
      return acc;
    },
    {} as Record<string, Extra[]>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="from-theme-brand-secondary to-theme-brand-secondary border-theme-brand-accent animate-slide-down overflow-hidden rounded-xl border-2 bg-gradient-to-br shadow-lg">
        {/* Header */}
        <div className="from-theme-brand-primary to-theme-brand-primary flex items-center justify-between bg-gradient-to-r px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <div>
              <h3 className="text-lg font-bold">Customize Your Order</h3>
              <p className="text-xs opacity-90">{dish.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] space-y-4 overflow-y-auto p-4">
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
          {!hasCustomizations &&
            groupedExtras &&
            Object.entries(groupedExtras).map(([type, extras]) => (
              <div key={type}>
                <h4 className="mb-2 text-sm font-bold capitalize text-gray-900">
                  {type === 'milk'
                    ? '🥛 Milk'
                    : type === 'size'
                      ? '📏 Size'
                      : type === 'shot'
                        ? '☕ Espresso Shots'
                        : type === 'sweetener'
                          ? '🍯 Sweetener'
                          : type === 'addon'
                            ? '➕ Add-ons'
                            : type === 'liquor'
                              ? '🥃 Liquor'
                              : type}
                </h4>
                <div className="space-y-2">
                  {extras.map((extra) => (
                    <label
                      key={extra.id}
                      className="bg-theme-bg-elevated border-theme-bg-tertiary flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-amber-50"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedExtras.some((e) => e.id === extra.id)}
                          onChange={() => handleToggleExtra(extra)}
                          className="text-theme-brand-primary focus:ring-theme-brand-primary h-5 w-5 rounded focus:ring-2"
                        />
                        <span className="text-theme-text-primary font-medium">{extra.name}</span>
                      </div>
                      <span className="text-theme-brand-primary font-bold">
                        +{formatPriceCompact(extra.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

          {/* Quantity Controls */}
          <div>
            <h4 className="text-theme-text-primary mb-2 text-sm font-bold">🔢 Quantity</h4>
            <div className="bg-theme-bg-elevated border-theme-bg-tertiary flex items-center justify-center gap-4 rounded-xl border p-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-primary flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold transition-colors"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="text-theme-text-primary min-w-[40px] text-center text-2xl font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-theme-brand-primary hover:bg-theme-brand-primary-hover flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Save as Preference or Add to Favorites */}
          <div
            className={
              hasAnyCustomization
                ? 'rounded-lg border border-blue-200 bg-blue-50 p-3'
                : 'rounded-lg border border-red-200 bg-red-50 p-3'
            }
          >
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={saveAsPreference}
                onChange={(e) => setSaveAsPreference(e.target.checked)}
                className={
                  hasAnyCustomization
                    ? 'h-5 w-5 rounded text-blue-600 focus:ring-2 focus:ring-blue-500'
                    : 'h-5 w-5 rounded text-red-600 focus:ring-2 focus:ring-red-500'
                }
              />
              <div className="flex-1">
                {hasAnyCustomization ? (
                  <>
                    <span className="text-theme-text-primary text-sm font-semibold">
                      Ricorda la mia scelta
                    </span>
                    <p className="text-theme-text-secondary text-xs">
                      Quick reorder next time with these settings
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-theme-text-primary text-sm font-semibold">
                      Aggiungi ai Favoriti
                    </span>
                    <p className="text-theme-text-secondary text-xs">
                      Mark as favorite for quick access
                    </p>
                  </>
                )}
              </div>
              <span className="text-xl">{hasAnyCustomization ? '🌟' : '❤️'}</span>
            </label>
          </div>
        </div>

        {/* Footer - Add to Cart */}
        <div className="bg-theme-bg-elevated border-theme-bg-tertiary border-t-2 p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary text-theme-text-primary flex-1 rounded-xl py-3 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover flex flex-[2] transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3 text-lg font-bold text-white shadow-lg transition-all active:scale-95"
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
