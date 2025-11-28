'use client';

import { useState, useEffect } from 'react';
import { DishItem, Extra } from './DishCard';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { formatConvertedPrice } from '../lib/currency-converter';
import { favoritesStore } from '../lib/favorites-store';
import { selectionsStore } from '../lib/selections-store';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { SafetyBadgeList } from './ui/safety-badge';
import { AllergenIcon, getIconNameFromFilterId } from './ui/allergen-icon';
import { safetyFilters } from '@/../../shared/database/safety-filters';

interface ProductBottomSheetProps {
  dish: DishItem;
  onClose: () => void;
  onAddToCart?: (dish: DishItem, quantity: number, extras: Extra[]) => void;
}

export function ProductBottomSheet({ dish, onClose, onAddToCart }: ProductBottomSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [activeTab, setActiveTab] = useState<'extra' | 'nutrition'>('extra');
  const [showBadgeNames, setShowBadgeNames] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => favoritesStore.isFavorite(dish.id));
  const [isInSelections, setIsInSelections] = useState(() => selectionsStore.isSelected(dish.id));
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Get feature flags
  const isOrderingEnabled = coffeeshopConfig.features.enableCart;

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

  // Compact price format: 35.000₫ → 35K
  const formatPriceCompact = (price: number) => {
    // Check if currency conversion is enabled
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      // Use full formatting for non-VND currencies
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // VND compact format: divide by 1000 and add K
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  const handleToggleFavorite = () => {
    const newStatus = favoritesStore.toggle(dish.id);
    setIsFavorite(newStatus);
  };

  const handleToggleSelection = () => {
    const newStatus = selectionsStore.toggle(dish);
    setIsInSelections(newStatus);
  };

  const handleAddToCart = () => {
    if (isOrderingEnabled && onAddToCart) {
      onAddToCart(dish, quantity, selectedExtras);
      onClose();
    } else {
      // TIER 1: Add to selections instead
      handleToggleSelection();
      onClose();
    }
  };

  // Swipe down to dismiss
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd < -100) {
      // Swiped down - close
      onClose();
    }
  };

  const hasAllergens = dish.allergens && dish.allergens.length > 0;
  const hasDietary = dish.dietary && dish.dietary.length > 0;

  // Estimate calories if not provided (temporary until database integration)
  const estimatedCalories = dish.calories || (() => {
    const name = dish.name.toLowerCase();
    const category = dish.category.toLowerCase();

    // Beverage estimates
    if (category.includes('bevande') || category.includes('coffee') || category.includes('smoothie')) {
      if (name.includes('juice')) return 45;
      if (name.includes('coffee') || name.includes('espresso')) return 5;
      if (name.includes('latte')) return 120;
      if (name.includes('cappuccino')) return 80;
      if (name.includes('smoothie')) return 150;
      return 60;
    }

    // Food estimates
    if (category.includes('pizza')) return 250;
    if (category.includes('primi')) return 350;
    if (category.includes('secondi')) return 280;
    if (category.includes('antipasti')) return 150;
    if (category.includes('dessert')) return 320;
    if (category.includes('bowl')) return 380;

    return 200; // Default estimate
  })();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-theme-bg-elevated rounded-t-3xl shadow-2xl z-50 max-h-[90vh] overflow-y-auto animate-slide-up"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3 sticky top-0 bg-theme-bg-elevated z-10">
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full" />
        </div>

        {/* Hero Image */}
        <div className="relative">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="text-2xl font-bold text-theme-text-primary flex-1">{dish.name}</h2>
              {/* Favorite button */}
              <button
                onClick={handleToggleFavorite}
                className="flex-shrink-0 hover:scale-110 transition-transform"
                aria-label="Toggle favorite"
              >
                {isFavorite ? (
                  <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-theme-text-tertiary hover:text-theme-text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-3xl font-bold text-theme-brand-primary">{formatPriceCompact(dish.price)}</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-theme-text-primary leading-relaxed">{dish.description}</p>
          </div>

          {/* Tab System - EXTRA / Nutrizione */}
          {((isOrderingEnabled && dish.availableExtras && dish.availableExtras.length > 0) || (hasDietary || hasAllergens)) && (
            <div className="mb-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-4 bg-theme-bg-secondary rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('extra')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'extra'
                      ? 'bg-theme-brand-primary text-white shadow-md'
                      : 'text-theme-text-secondary hover:text-theme-text-primary'
                  }`}
                >
                  EXTRA
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all ${
                    activeTab === 'nutrition'
                      ? 'bg-theme-brand-primary text-white shadow-md'
                      : 'text-theme-text-secondary hover:text-theme-text-primary'
                  }`}
                >
                  Nutrizione
                  {hasAllergens && activeTab !== 'nutrition' && <span className="ml-1 text-red-600">⚠️</span>}
                </button>
              </div>

              {/* EXTRA Tab Content */}
              {activeTab === 'extra' && (
                <div>
                  {isOrderingEnabled && dish.availableExtras && dish.availableExtras.length > 0 ? (
                    <div className="space-y-2">
                      {dish.availableExtras.map((extra) => {
                        const isSelected = selectedExtras.some(e => e.id === extra.id);
                        return (
                          <label
                            key={extra.id}
                            className="flex items-center justify-between p-3 bg-theme-bg-secondary rounded-lg cursor-pointer hover:bg-theme-bg-tertiary transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // Remove all extras of the same type first (mutually exclusive by type)
                                    const filteredExtras = selectedExtras.filter(ex => ex.type !== extra.type);
                                    setSelectedExtras([...filteredExtras, extra]);
                                  } else {
                                    setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
                                  }
                                }}
                                className="w-4 h-4 text-green-600 rounded-full focus:ring-green-500 accent-green-600"
                              />
                              <div>
                                <p className="font-medium text-theme-text-primary">{extra.name}</p>
                                <p className="text-sm text-theme-text-secondary">{extra.type}</p>
                              </div>
                            </div>
                            <span className={`font-bold ${extra.price > 0 ? 'text-gray-700' : 'text-green-600'}`}>
                              {extra.price > 0 ? `+${formatPriceCompact(extra.price)}` : 'Gratis'}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-theme-text-secondary">
                      Nessuna personalizzazione disponibile
                    </div>
                  )}
                </div>
              )}

              {/* Nutrizione Tab Content */}
              {activeTab === 'nutrition' && (
                <div>
                  {(hasDietary || hasAllergens) ? (
                    <div className="space-y-4">
                      {/* Calorie Card */}
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm opacity-90">Calorie Totali</p>
                            <p className="text-3xl font-bold">{estimatedCalories}</p>
                          </div>
                          <div className="text-5xl opacity-30">🔥</div>
                        </div>
                        <p className="text-xs opacity-75 mt-2">Valori stimati per porzione standard</p>
                      </div>

                      {/* Compact Icon Display (48px, no background badge) */}
                      <div>
                        {hasDietary && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-theme-text-secondary mb-3">Dieta</h4>
                            <div className="flex flex-wrap gap-3">
                              {(dish.dietary || []).slice(0, 8).map((filterId) => {
                                const filter = safetyFilters.find(f => f.id === filterId);
                                const iconName = getIconNameFromFilterId(filterId);

                                if (!filter || !iconName) return null;

                                return (
                                  <div key={filterId} className="flex flex-col items-center gap-1.5">
                                    <AllergenIcon
                                      name={iconName}
                                      size={48}
                                      colorScheme="diet"
                                    />
                                    {showBadgeNames && (
                                      <span className="text-xs text-theme-text-secondary text-center max-w-[60px] leading-tight">
                                        {filter.label.en}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {hasAllergens && (
                          <div>
                            <h4 className="text-sm font-semibold text-theme-text-secondary mb-3">Allergeni Presenti ⚠️</h4>
                            <div className="flex flex-wrap gap-3">
                              {(dish.allergens || []).map((filterId) => {
                                const filter = safetyFilters.find(f => f.id === filterId);
                                const iconName = getIconNameFromFilterId(filterId);

                                if (!filter || !iconName) return null;

                                return (
                                  <div key={filterId} className="flex flex-col items-center gap-1.5">
                                    <AllergenIcon
                                      name={iconName}
                                      size={48}
                                      colorScheme="allergen"
                                    />
                                    {showBadgeNames && (
                                      <span className="text-xs text-theme-text-secondary text-center max-w-[60px] leading-tight">
                                        {filter.label.en}
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Toggle Button to Show/Hide Names */}
                      <button
                        onClick={() => setShowBadgeNames(!showBadgeNames)}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-theme-bg-secondary rounded-lg hover:bg-theme-bg-tertiary transition-colors text-theme-text-primary font-medium"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        {showBadgeNames ? 'Nascondi nomi' : 'Mostra nomi'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-theme-text-secondary">
                      Nessuna informazione nutrizionale disponibile
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Quantity Controls - Always show */}
          <div className="mb-6">
            <h3 className="font-bold text-theme-text-primary mb-3">Quantità</h3>
            <div className="flex items-center justify-center gap-4 bg-theme-bg-secondary rounded-2xl p-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 bg-red-500 rounded-full font-bold text-white hover:bg-red-600 transition-colors shadow-md flex items-center justify-center text-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="font-bold text-theme-text-primary text-2xl min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 h-12 bg-green-600 rounded-full font-bold text-white hover:bg-green-700 transition-colors shadow-md flex items-center justify-center text-2xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full text-white py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform active:scale-95 ${
              isOrderingEnabled
                ? 'bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover'
                : isInSelections
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            }`}
          >
            {isOrderingEnabled
              ? `Add to Cart • ${formatPriceCompact(dish.price * quantity + selectedExtras.reduce((sum, e) => sum + e.price, 0) * quantity)}`
              : isInSelections
              ? 'Rimuovi dalle Selezioni'
              : `Aggiungi${quantity > 1 ? ` (x${quantity})` : ''} • ${formatPriceCompact(dish.price * quantity)}`}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
