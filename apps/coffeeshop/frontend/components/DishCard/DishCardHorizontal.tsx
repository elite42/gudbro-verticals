'use client';

import React from 'react';
import { DishItem, Extra } from '@/types/dish';
import { useDishCardState } from '@/hooks/useDishCardState';
import { usePriceFormat } from '@/hooks/usePriceFormat';
import { getOriginFlag } from '@/utils/dishCardHelpers';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { ExtrasModal } from '../ExtrasModal';

interface DishCardHorizontalProps {
  dish: DishItem;
  onAddToCart?: (dish: DishItem, quantity: number, extras: Extra[]) => void;
  onCardClick?: (dish: DishItem) => void;
}

const fallbackImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400';

export function DishCardHorizontal({ dish, onAddToCart, onCardClick }: DishCardHorizontalProps) {
  const {
    quantity,
    setQuantity,
    showExtrasModal,
    setShowExtrasModal,
    isFavorite,
    toggleFavorite,
    imageError,
    setImageError,
    showDietaryInfo,
    setShowDietaryInfo
  } = useDishCardState(dish);

  const { formatPrice } = usePriceFormat();

  const handleIncrement = () => {
    const hasCustomizations = dish.customizations && dish.customizations.length > 0;
    const hasExtras = dish.availableExtras && dish.availableExtras.length > 0;

    if (hasCustomizations || hasExtras) {
      if (onCardClick) {
        onCardClick(dish);
      } else {
        setShowExtrasModal(true);
      }
    } else {
      setQuantity(quantity + 1);
      onAddToCart?.(dish, 1, []);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddWithExtras = (selectedExtras: Extra[], qty: number) => {
    setQuantity(quantity + qty);
    onAddToCart?.(dish, qty, selectedExtras);
    setShowExtrasModal(false);
  };

  const hasAllergens = dish.allergens && dish.allergens.length > 0;
  const hasDietary = dish.dietary && dish.dietary.length > 0;

  return (
    <>
      <div className="bg-theme-bg-elevated rounded-lg shadow-sm hover:shadow-md transition-all p-3 flex gap-3 relative">
        {/* Image with category above */}
        <div className="flex-shrink-0 flex flex-col gap-1">
          <span className="text-xs text-theme-text-secondary px-2 py-0.5 bg-theme-bg-secondary rounded font-medium self-start">
            {dish.category}
          </span>
          <img
            src={imageError ? fallbackImage : dish.image}
            alt={dish.name}
            className="w-24 h-24 rounded-lg object-cover"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex-1">
              <h3 className="font-bold text-theme-text-primary">{dish.name}</h3>
              {dish.origin && getOriginFlag(dish.origin) && (
                <span className="text-2xl inline-block mt-1">
                  {getOriginFlag(dish.origin)}
                </span>
              )}
            </div>
            {/* Favorite heart button */}
            <button
              onClick={toggleFavorite}
              className="flex-shrink-0 hover:scale-110 transition-transform"
              aria-label="Add to favorites"
            >
              {isFavorite ? (
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-theme-text-tertiary hover:text-theme-text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>
          </div>

          <p className="text-sm text-theme-text-secondary line-clamp-2 mb-1">{dish.description}</p>

          {/* Info button */}
          {(hasDietary || hasAllergens) && (
            <button
              onClick={() => setShowDietaryInfo(!showDietaryInfo)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium mb-1 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {showDietaryInfo ? 'Nascondi info' : 'Info nutrizionali'}
              {hasAllergens && !showDietaryInfo && <span className="text-red-600">⚠️</span>}
            </button>
          )}

          {/* Dietary tags */}
          {showDietaryInfo && hasDietary && (
            <div className="flex flex-wrap gap-1 mt-1 mb-1">
              {dish.dietary?.map((tag) => (
                <span key={tag} className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                  🌱 {tag}
                </span>
              ))}
            </div>
          )}

          {/* Allergen warnings */}
          {showDietaryInfo && hasAllergens && (
            <div className="flex flex-wrap gap-1 mt-1 mb-1">
              {dish.allergens?.map((allergen) => (
                <span key={allergen} className="text-xs bg-red-500 text-white px-2 py-0.5 rounded font-medium">
                  ⚠️ {allergen}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-lg text-amber-700">{formatPrice(dish.price)}</span>

            {/* Quantity controls */}
            <div className="flex items-center gap-2 bg-theme-bg-secondary rounded-full px-2 py-1">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 bg-theme-bg-elevated rounded-full font-bold text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity === 0}
              >
                −
              </button>
              <span className="font-bold text-theme-text-primary min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={handleIncrement}
                className={`w-8 h-8 rounded-full font-bold transition-colors flex items-center justify-center text-xs ${
                  !coffeeshopConfig.features.enableCart
                    ? 'bg-theme-bg-tertiary text-theme-text-secondary cursor-not-allowed'
                    : 'bg-theme-brand-primary text-white hover:bg-theme-brand-primary-hover'
                }`}
                disabled={!coffeeshopConfig.features.enableCart}
                title={!coffeeshopConfig.features.enableCart ? 'Pre-ordering coming soon' : ((dish.customizations && dish.customizations.length > 0) || (dish.availableExtras && dish.availableExtras.length > 0) ? 'Customize order' : 'Add to cart')}
              >
                {!coffeeshopConfig.features.enableCart ? '🔒' : ((dish.customizations && dish.customizations.length > 0) || (dish.availableExtras && dish.availableExtras.length > 0) ? '⚙️' : '+')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Extras Modal */}
      {showExtrasModal && dish.availableExtras && (
        <ExtrasModal
          dish={dish}
          onClose={() => setShowExtrasModal(false)}
          onAddToCart={handleAddWithExtras}
        />
      )}
    </>
  );
}
