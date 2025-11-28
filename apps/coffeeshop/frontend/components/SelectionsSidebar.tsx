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
          {/* Selections List */}
        {selections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-semibold">No selections yet</p>
            <p className="text-sm">Browse the menu and select dishes</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {selections.map((selection) => (
              <div
                key={selection.id}
                className="bg-theme-bg-secondary border border-theme-bg-tertiary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3">
                  {/* Dish Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={selection.dish.image}
                      alt={selection.dish.name}
                      className="w-20 h-20 rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop';
                      }}
                    />
                  </div>

                  {/* Dish Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-theme-text-primary mb-1">
                      {selection.dish.name}
                    </h3>
                    <p className="text-theme-text-secondary text-sm mb-3 line-clamp-2">
                      {selection.dish.description}
                    </p>

                    {/* Price and Quantity Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold">
                          {formatPrice(selection.dish.price)}
                        </span>
                        <span className="text-theme-text-secondary text-sm font-semibold">
                          x{selection.quantity}
                        </span>
                      </div>
                      <span className="text-theme-brand-primary font-bold text-lg">
                        {formatPrice(selection.dish.price * selection.quantity)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {onEditProduct && (
                        <button
                          onClick={() => {
                            onEditProduct(selection.dish);
                          }}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Modifica
                        </button>
                      )}
                      <button
                        onClick={() => handleRemoveSelection(selection.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
