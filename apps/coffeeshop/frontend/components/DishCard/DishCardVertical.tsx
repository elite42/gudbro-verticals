'use client';

import React from 'react';
import { DishItem, Extra } from '@/types/dish';
import { useDishCardState } from '@/hooks/useDishCardState';
import { usePriceFormat } from '@/hooks/usePriceFormat';
import { getOriginFlag, getCategoryColor } from '@/utils/dishCardHelpers';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { ExtrasModal } from '../ExtrasModal';

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
    setImageError
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
      <div className="bg-theme-bg-elevated rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden">
        {/* Image with category badge and favorite */}
        <div className="relative">
          <img
            src={imageError ? fallbackImage : dish.image}
            alt={dish.name}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(dish.category)}`}>
            {dish.category}
          </div>
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 bg-theme-bg-elevated rounded-full p-2 shadow-md hover:scale-110 transition-transform"
            aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Add ${dish.name} to favorites`}
            aria-pressed={isFavorite}
          >
            <span aria-hidden="true">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg text-theme-text-primary mb-1">{dish.name}</h3>
          {dish.origin && getOriginFlag(dish.origin) && (
            <span className="text-3xl inline-block mb-2">
              {getOriginFlag(dish.origin)}
            </span>
          )}
          <p className="text-sm text-theme-text-secondary mb-3 line-clamp-2">{dish.description}</p>

          {/* Dietary tags */}
          {dish.dietary && dish.dietary.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {dish.dietary.map((tag) => (
                <span key={tag} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-bold text-xl text-amber-700">{formatPrice(dish.price)}</span>

            {/* Quantity controls */}
            {quantity === 0 ? (
              <button
                onClick={handleIncrement}
                className={`px-4 py-2 rounded-full font-bold transition-all text-sm ${
                  !coffeeshopConfig.features.enableCart
                    ? 'bg-theme-bg-tertiary text-theme-text-secondary cursor-not-allowed'
                    : 'bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transform hover:scale-105'
                }`}
                disabled={!coffeeshopConfig.features.enableCart}
                title={!coffeeshopConfig.features.enableCart ? 'Pre-ordering coming soon' : ((dish.customizations && dish.customizations.length > 0) || (dish.availableExtras && dish.availableExtras.length > 0) ? 'Customize order' : 'Add to cart')}
                aria-label={!coffeeshopConfig.features.enableCart ? `Pre-ordering ${dish.name} coming soon` : ((dish.customizations && dish.customizations.length > 0) || (dish.availableExtras && dish.availableExtras.length > 0) ? `Customize and add ${dish.name} to cart` : `Add ${dish.name} to cart`)}
              >
                {!coffeeshopConfig.features.enableCart ? '🔒 Soon' : ((dish.customizations && dish.customizations.length > 0) || (dish.availableExtras && dish.availableExtras.length > 0) ? '⚙️' : '+')}
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-theme-bg-secondary rounded-full px-2" role="group" aria-label={`${dish.name} quantity controls`}>
                <button
                  onClick={handleDecrement}
                  className="w-8 h-8 bg-theme-bg-elevated rounded-full font-bold text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors"
                  aria-label={`Decrease ${dish.name} quantity, currently ${quantity}`}
                >
                  −
                </button>
                <span className="font-bold text-theme-text-primary" aria-label={`Current quantity: ${quantity}`}>{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className={`w-8 h-8 rounded-full font-bold transition-colors text-xs ${
                    !coffeeshopConfig.features.enableCart
                      ? 'bg-theme-bg-tertiary text-theme-text-secondary cursor-not-allowed'
                      : 'bg-theme-bg-elevated text-theme-brand-primary hover:bg-theme-bg-tertiary'
                  }`}
                  disabled={!coffeeshopConfig.features.enableCart}
                  title={!coffeeshopConfig.features.enableCart ? 'Pre-ordering coming soon' : 'Add more'}
                  aria-label={!coffeeshopConfig.features.enableCart ? `Pre-ordering ${dish.name} coming soon` : `Increase ${dish.name} quantity, currently ${quantity}`}
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
