'use client';

import React from 'react';
import { DishItem, Extra } from '@/types/dish';
import { useDishCardState } from '@/hooks/useDishCardState';
import { useAppPriceFormat as usePriceFormat } from '@/lib/currency';
import { getOriginFlag, getCategoryColor } from '@/utils/dishCardHelpers';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { ExtrasModal } from '../ExtrasModal';
import { NutritionalInfo } from '../NutritionalInfo';
import { SafetyFilterIcons, SafetyFilterBadge } from '../SafetyFilterIcons';

interface DishCardVerticalProps {
  dish: DishItem;
  onAddToCart?: (dish: DishItem, quantity: number, extras: Extra[]) => void;
  onCardClick?: (dish: DishItem) => void;
}

const fallbackImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400';

export function DishCardVertical({ dish, onAddToCart, onCardClick }: DishCardVerticalProps) {
  const {
    quantity,
    setQuantity,
    showExtrasModal,
    setShowExtrasModal,
    isFavorite,
    toggleFavorite,
    imageError,
    setImageError,
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

  return (
    <>
      <div className="bg-theme-bg-elevated overflow-hidden rounded-xl shadow-md transition-all hover:shadow-xl">
        {/* Image with category badge and favorite */}
        <div className="relative">
          <img
            src={imageError ? fallbackImage : dish.image}
            alt={dish.name}
            className="h-48 w-full object-cover"
            onError={() => setImageError(true)}
          />
          <div
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${getCategoryColor(dish.category)}`}
          >
            {dish.category}
          </div>
          <button
            onClick={toggleFavorite}
            className="bg-theme-bg-elevated absolute right-3 top-3 rounded-full p-2 shadow-md transition-transform hover:scale-110"
            aria-label={
              isFavorite ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`
            }
            aria-pressed={isFavorite}
          >
            <span aria-hidden="true">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-theme-text-primary mb-1 text-lg font-bold">{dish.name}</h3>
          {dish.origin && getOriginFlag(dish.origin) && (
            <span className="mb-2 inline-block text-3xl">{getOriginFlag(dish.origin)}</span>
          )}
          <p className="text-theme-text-secondary mb-3 line-clamp-2 text-sm">{dish.description}</p>

          {/* Nutritional Info */}
          <NutritionalInfo
            calories={dish.calories}
            protein_g={dish.protein_g}
            carbs_g={dish.carbs_g}
            fat_g={dish.fat_g}
            variant="compact"
            className="mb-2"
          />

          {/* Safety Filters (Allergens, Intolerances, Dietary) */}
          <SafetyFilterIcons
            allergens={dish.allergens}
            intolerances={dish.intolerances}
            dietary={dish.dietary}
            variant="compact"
            maxVisible={5}
            className="mb-3"
          />

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-amber-700">{formatPrice(dish.price)}</span>

            {/* Quantity controls */}
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  !coffeeshopConfig.features.enableCart
                    ? 'bg-theme-bg-tertiary text-theme-text-secondary cursor-not-allowed'
                    : 'from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transform bg-gradient-to-r text-white hover:scale-105'
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
                aria-label={
                  !coffeeshopConfig.features.enableCart
                    ? `Pre-ordering ${dish.name} coming soon`
                    : (dish.customizations && dish.customizations.length > 0) ||
                        (dish.availableExtras && dish.availableExtras.length > 0)
                      ? `Customize and add ${dish.name} to cart`
                      : `Add ${dish.name} to cart`
                }
              >
                {!coffeeshopConfig.features.enableCart
                  ? '🔒 Soon'
                  : (dish.customizations && dish.customizations.length > 0) ||
                      (dish.availableExtras && dish.availableExtras.length > 0)
                    ? '⚙️'
                    : '+'}
              </button>
            ) : (
              <div
                className="bg-theme-bg-secondary flex items-center gap-2 rounded-full px-2"
                role="group"
                aria-label={`${dish.name} quantity controls`}
              >
                <button
                  onClick={handleDecrement}
                  className="bg-theme-bg-elevated text-theme-text-primary hover:bg-theme-bg-tertiary h-8 w-8 rounded-full font-bold transition-colors"
                  aria-label={`Decrease ${dish.name} quantity, currently ${quantity}`}
                >
                  −
                </button>
                <span
                  className="text-theme-text-primary font-bold"
                  aria-label={`Current quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className={`h-8 w-8 rounded-full text-xs font-bold transition-colors ${
                    !coffeeshopConfig.features.enableCart
                      ? 'bg-theme-bg-tertiary text-theme-text-secondary cursor-not-allowed'
                      : 'bg-theme-bg-elevated text-theme-brand-primary hover:bg-theme-bg-tertiary'
                  }`}
                  disabled={!coffeeshopConfig.features.enableCart}
                  title={
                    !coffeeshopConfig.features.enableCart ? 'Pre-ordering coming soon' : 'Add more'
                  }
                  aria-label={
                    !coffeeshopConfig.features.enableCart
                      ? `Pre-ordering ${dish.name} coming soon`
                      : `Increase ${dish.name} quantity, currently ${quantity}`
                  }
                >
                  {!coffeeshopConfig.features.enableCart ? '🔒' : '+'}
                </button>
              </div>
            )}
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
