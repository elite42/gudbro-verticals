'use client';

import React from 'react';
import { DishItem, Extra } from '@/types/dish';
import { useDishCardState } from '@/hooks/useDishCardState';
import { useAppPriceFormat as usePriceFormat } from '@/lib/currency';
import { getOriginFlag } from '@/utils/dishCardHelpers';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { ExtrasModal } from '../ExtrasModal';
import { NutritionalInfo } from '../NutritionalInfo';
import { SafetyFilterIcons, SafetyFilterBadge } from '../SafetyFilterIcons';

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
    setShowDietaryInfo,
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
  const hasIntolerances = dish.intolerances && dish.intolerances.length > 0;
  const hasDietary = dish.dietary && dish.dietary.length > 0;
  const hasNutritionalInfo = dish.calories || dish.protein_g || dish.carbs_g || dish.fat_g;
  const hasSafetyInfo = hasAllergens || hasIntolerances || hasDietary || hasNutritionalInfo;

  return (
    <>
      <div className="bg-theme-bg-elevated relative flex gap-3 rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
        {/* Image with category above */}
        <div className="flex flex-shrink-0 flex-col gap-1">
          <span className="text-theme-text-secondary bg-theme-bg-secondary self-start rounded px-2 py-0.5 text-xs font-medium">
            {dish.category}
          </span>
          <img
            src={imageError ? fallbackImage : dish.image}
            alt={dish.name}
            className="h-24 w-24 rounded-lg object-cover"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-theme-text-primary font-bold">{dish.name}</h3>
              {dish.origin && getOriginFlag(dish.origin) && (
                <span className="mt-1 inline-block text-2xl">{getOriginFlag(dish.origin)}</span>
              )}
            </div>
            {/* Favorite heart button */}
            <button
              onClick={toggleFavorite}
              className="flex-shrink-0 transition-transform hover:scale-110"
              aria-label="Add to favorites"
            >
              {isFavorite ? (
                <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  className="text-theme-text-tertiary hover:text-theme-text-secondary h-6 w-6"
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

          <p className="text-theme-text-secondary mb-1 line-clamp-2 text-sm">{dish.description}</p>

          {/* Info button */}
          {hasSafetyInfo && (
            <button
              onClick={() => setShowDietaryInfo(!showDietaryInfo)}
              className="mb-1 flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {showDietaryInfo ? 'Nascondi info' : 'Info nutrizionali'}
              {!showDietaryInfo && (
                <SafetyFilterBadge
                  allergens={dish.allergens}
                  intolerances={dish.intolerances}
                  dietary={dish.dietary}
                />
              )}
            </button>
          )}

          {/* Nutritional Info */}
          {showDietaryInfo && (
            <NutritionalInfo
              calories={dish.calories}
              protein_g={dish.protein_g}
              carbs_g={dish.carbs_g}
              fat_g={dish.fat_g}
              variant="compact"
              className="mb-1 mt-1"
            />
          )}

          {/* Safety Filters (Allergens, Intolerances, Dietary) */}
          {showDietaryInfo && (
            <SafetyFilterIcons
              allergens={dish.allergens}
              intolerances={dish.intolerances}
              dietary={dish.dietary}
              variant="compact"
              maxVisible={4}
              className="mb-1 mt-1"
            />
          )}

          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-bold text-amber-700">{formatPrice(dish.price)}</span>

            {/* Quantity controls */}
            <div className="bg-theme-bg-secondary flex items-center gap-2 rounded-full px-2 py-1">
              <button
                onClick={handleDecrement}
                className="bg-theme-bg-elevated text-theme-text-primary hover:bg-theme-bg-tertiary h-8 w-8 rounded-full font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                disabled={quantity === 0}
              >
                −
              </button>
              <span className="text-theme-text-primary min-w-[20px] text-center font-bold">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  !coffeeshopConfig.features.enableCart
                    ? 'bg-theme-bg-tertiary text-theme-text-secondary cursor-not-allowed'
                    : 'bg-theme-brand-primary hover:bg-theme-brand-primary-hover text-white'
                }`}
                disabled={!coffeeshopConfig.features.enableCart}
                title={
                  !coffeeshopConfig.features.enableCart
                    ? 'Pre-ordering coming soon'
                    : (dish.customizations && dish.customizations.length > 0) ||
                        (dish.availableExtras && dish.availableExtras.length > 0)
                      ? 'Customize order'
                      : 'Add to cart'
                }
              >
                {!coffeeshopConfig.features.enableCart
                  ? '🔒'
                  : (dish.customizations && dish.customizations.length > 0) ||
                      (dish.availableExtras && dish.availableExtras.length > 0)
                    ? '⚙️'
                    : '+'}
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
