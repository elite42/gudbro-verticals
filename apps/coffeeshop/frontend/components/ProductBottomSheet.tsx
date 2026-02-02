'use client';

import { useState, useEffect } from 'react';
import { DishItem, Extra } from './DishCard';
import { favoritesStore } from '../lib/favorites-store';
import { selectionsStore } from '../lib/selections-store';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { SafetyBadgeList } from './ui/safety-badge';
import { AllergenIcon, getIconNameFromFilterId } from './ui/allergen-icon';
import { safetyFilters } from '@/database/safety-filters';
import { ProductIndicators } from './ProductIndicators';
import { useTranslation } from '../lib/use-translation';
import { useAppPriceFormat as usePriceFormat } from '../lib/currency';
import { SocialShareButton } from './SocialShareButton';
import { track, trackAddToCart } from '@/lib/analytics-service';

interface ProductBottomSheetProps {
  dish: DishItem;
  onClose: () => void;
  onAddToCart?: (dish: DishItem, quantity: number, extras: Extra[]) => void;
}

export function ProductBottomSheet({ dish, onClose, onAddToCart }: ProductBottomSheetProps) {
  const { t } = useTranslation();
  const { formatPrice } = usePriceFormat();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [activeTab, setActiveTab] = useState<'extra' | 'nutrition'>('extra');
  const [showBadgeNames, setShowBadgeNames] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => favoritesStore.isFavorite(dish.id));
  const [isInSelections, setIsInSelections] = useState(() => selectionsStore.isSelected(dish.id));
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Get feature flags
  const isOrderingEnabled = coffeeshopConfig.features.enableCart;

  // Track item view when component mounts
  useEffect(() => {
    track(
      'item_view',
      {
        item_id: dish.id,
        item_name: dish.name,
        category: dish.category,
        price: dish.price,
      },
      'page_view'
    );
  }, [dish.id, dish.name, dish.category, dish.price]);

  const handleToggleFavorite = () => {
    const newStatus = favoritesStore.toggle(dish.id);
    setIsFavorite(newStatus);
  };

  const handleToggleSelection = () => {
    const newStatus = selectionsStore.toggle(dish);
    setIsInSelections(newStatus);
  };

  const handleAddToCart = () => {
    // Track add to cart event
    const extrasNames = selectedExtras.map((e) => e.name);
    trackAddToCart(
      dish.id,
      dish.name,
      quantity,
      dish.price,
      extrasNames.length > 0 ? extrasNames : undefined
    );

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
  const estimatedCalories =
    dish.calories ||
    (() => {
      const name = dish.name.toLowerCase();
      const category = dish.category.toLowerCase();

      // Beverage estimates
      if (
        category.includes('bevande') ||
        category.includes('coffee') ||
        category.includes('smoothie')
      ) {
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
      <div className="animate-fade-in fixed inset-0 z-[10000] bg-black/50" onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className="bg-theme-bg-elevated animate-slide-up fixed bottom-0 left-0 right-0 z-[10001] max-h-[90vh] overflow-y-auto rounded-t-3xl shadow-2xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle */}
        <div className="bg-theme-bg-elevated sticky top-0 z-10 flex justify-center py-3">
          <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full" />
        </div>

        {/* Hero Image */}
        <div className="relative">
          <img src={dish.image} alt={dish.name} className="h-64 w-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="mb-2 flex items-start justify-between gap-3">
              <h2 className="text-theme-text-primary flex-1 text-2xl font-bold">{dish.name}</h2>
              {/* Action buttons: Share + Favorite */}
              <div className="flex flex-shrink-0 items-center gap-2">
                {/* Share button */}
                <SocialShareButton
                  productId={dish.id}
                  productName={dish.name}
                  productImage={dish.image}
                  compact
                />

                {/* Favorite button */}
                <button
                  onClick={handleToggleFavorite}
                  className="rounded-full bg-red-50 p-2 transition-colors hover:bg-red-100"
                  aria-label="Toggle favorite"
                >
                  {isFavorite ? (
                    <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400 hover:text-red-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-theme-brand-primary text-3xl font-bold">{formatPrice(dish.price)}</p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-theme-text-primary leading-relaxed">{dish.description}</p>
          </div>

          {/* Tab System - EXTRA / Nutrizione */}
          {((isOrderingEnabled && dish.availableExtras && dish.availableExtras.length > 0) ||
            hasDietary ||
            hasAllergens) && (
            <div className="mb-6">
              {/* Tabs */}
              <div className="bg-theme-bg-secondary mb-4 flex gap-2 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('extra')}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-semibold transition-all ${
                    activeTab === 'extra'
                      ? 'bg-theme-brand-primary text-white shadow-md'
                      : 'text-theme-text-secondary hover:text-theme-text-primary'
                  }`}
                >
                  {t.productDetail.extras.toUpperCase()}
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className={`flex-1 rounded-lg px-4 py-2.5 font-semibold transition-all ${
                    activeTab === 'nutrition'
                      ? 'bg-theme-brand-primary text-white shadow-md'
                      : 'text-theme-text-secondary hover:text-theme-text-primary'
                  }`}
                >
                  {t.productDetail.nutrition}
                  {hasAllergens && activeTab !== 'nutrition' && (
                    <span className="ml-1 text-red-600">⚠️</span>
                  )}
                </button>
              </div>

              {/* EXTRA Tab Content */}
              {activeTab === 'extra' && (
                <div>
                  {isOrderingEnabled && dish.availableExtras && dish.availableExtras.length > 0 ? (
                    <div className="space-y-2">
                      {dish.availableExtras.map((extra) => {
                        const isSelected = selectedExtras.some((e) => e.id === extra.id);
                        return (
                          <label
                            key={extra.id}
                            className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    // Remove all extras of the same type first (mutually exclusive by type)
                                    const filteredExtras = selectedExtras.filter(
                                      (ex) => ex.type !== extra.type
                                    );
                                    setSelectedExtras([...filteredExtras, extra]);
                                  } else {
                                    setSelectedExtras(
                                      selectedExtras.filter((e) => e.id !== extra.id)
                                    );
                                  }
                                }}
                                className="h-4 w-4 rounded-full text-green-600 accent-green-600 focus:ring-green-500"
                              />
                              <div>
                                <p className="text-theme-text-primary font-medium">{extra.name}</p>
                                <p className="text-theme-text-secondary text-sm">{extra.type}</p>
                              </div>
                            </div>
                            <span
                              className={`font-bold ${extra.price > 0 ? 'text-gray-700' : 'text-green-600'}`}
                            >
                              {extra.price > 0
                                ? `+${formatPrice(extra.price)}`
                                : t.productDetail.free}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-theme-text-secondary py-8 text-center">
                      {t.productDetail.noCustomizations}
                    </div>
                  )}
                </div>
              )}

              {/* Nutrizione Tab Content */}
              {activeTab === 'nutrition' && (
                <div>
                  <ProductIndicators dish={dish} />
                </div>
              )}
            </div>
          )}

          {/* Quantity Controls - Always show */}
          <div className="mb-6">
            <h3 className="text-theme-text-primary mb-3 font-bold">{t.productDetail.quantity}</h3>
            <div className="bg-theme-bg-secondary flex items-center justify-center gap-4 rounded-2xl p-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white shadow-md transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="text-theme-text-primary min-w-[40px] text-center text-2xl font-bold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-2xl font-bold text-white shadow-md transition-colors hover:bg-green-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full transform rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-95 ${
              isOrderingEnabled
                ? 'from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover bg-gradient-to-r'
                : isInSelections
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            }`}
          >
            {isOrderingEnabled
              ? `${t.productDetail.addToCart} • ${formatPrice(dish.price * quantity + selectedExtras.reduce((sum, e) => sum + e.price, 0) * quantity)}`
              : isInSelections
                ? t.productDetail.removeFromSelections
                : `${t.productDetail.addToSelections}${quantity > 1 ? ` (x${quantity})` : ''} • ${formatPrice(dish.price * quantity)}`}
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
