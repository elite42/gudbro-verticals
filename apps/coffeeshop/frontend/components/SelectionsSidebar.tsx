'use client';

import React, { useState, useEffect } from 'react';
import { selectionsStore, SelectionItem } from '../lib/selections-store';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { formatConvertedPrice } from '../lib/currency-converter';
import { DishItem } from './DishCard';

interface SelectionsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProduct?: (dish: DishItem) => void; // Callback to open ProductBottomSheet
}

export function SelectionsSidebar({
  isOpen,
  onClose,
  onEditProduct
}: SelectionsSidebarProps) {
  const [selections, setSelections] = useState<SelectionItem[]>([]);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());

  useEffect(() => {
    if (isOpen) {
      loadSelections();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSelectionsUpdate = () => {
      loadSelections();
    };

    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('selections-updated', handleSelectionsUpdate);
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => {
        window.removeEventListener('selections-updated', handleSelectionsUpdate);
        window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
      };
    }
  }, []);

  const loadSelections = () => {
    setSelections(selectionsStore.getItems());
  };

  const formatPrice = (price: number) => {
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  const handleRemoveSelection = (dishId: string) => {
    selectionsStore.remove(dishId);
  };

  const handleIncrement = (selection: SelectionItem) => {
    selectionsStore.increment(selection.dish);
  };

  const handleDecrement = (dishId: string) => {
    selectionsStore.decrement(dishId);
  };

  const handleClearAll = () => {
    if (confirm('Vuoi cancellare tutte le selezioni?')) {
      selectionsStore.clear();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] transition-opacity"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-theme-bg-elevated rounded-t-3xl shadow-2xl z-[9999] transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden flex flex-col"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full"></div>
        </div>

        {/* Header */}
        <div className="bg-theme-bg-elevated px-4 pb-4 border-b border-theme-bg-tertiary">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-theme-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h2 className="text-xl font-bold text-theme-text-primary">
              My Selections ({selectionsStore.getCount()})
            </h2>
          </div>
          <p className="text-sm text-theme-brand-primary mt-2">
            This is your digital notepad. Show this list to the waiter when ordering.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Selections List - COMPACT DESIGN */}
          {selections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg font-semibold">No selections yet</p>
              <p className="text-sm">Browse the menu and select dishes</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Compact List */}
              <div className="space-y-2">
                {selections.map((selection) => {
                  const extrasText = selection.extras && selection.extras.length > 0
                    ? selection.extras.map(e => e.name).join(', ')
                    : null;

                  return (
                    <div
                      key={selection.id}
                      className="bg-theme-bg-secondary border border-theme-bg-tertiary rounded-lg px-3 py-2.5 hover:border-theme-brand-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {/* Name + Extras */}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-theme-text-primary text-sm truncate">
                            {selection.dish.name}
                          </div>
                          {extrasText && (
                            <div className="text-xs text-theme-text-secondary truncate">
                              {extrasText}
                            </div>
                          )}
                        </div>

                        {/* Quantity Badge */}
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center bg-theme-brand-primary text-white text-xs font-bold rounded-full w-6 h-6">
                            {selection.quantity}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 min-w-[50px] text-right">
                          <span className="text-theme-brand-primary font-bold text-sm">
                            {formatPrice(selection.dish.price * selection.quantity)}
                          </span>
                        </div>

                        {/* Edit Icon */}
                        {onEditProduct && (
                          <button
                            onClick={() => onEditProduct(selection.dish)}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                            aria-label="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}

                        {/* Delete Icon */}
                        <button
                          onClick={() => handleRemoveSelection(selection.id)}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          aria-label="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {selections.length > 0 && (
          <div className="bg-theme-bg-elevated border-t border-theme-bg-tertiary p-4 space-y-3">
            <button
              onClick={handleClearAll}
              className="w-full bg-theme-bg-secondary text-theme-text-primary px-6 py-3 rounded-full font-bold hover:bg-theme-bg-tertiary transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="w-full bg-primary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </>
  );
}
