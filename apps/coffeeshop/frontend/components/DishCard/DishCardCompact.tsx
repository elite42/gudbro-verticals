'use client';

import React from 'react';
import { DishItem } from '@/types/dish';
import { useDishCardState } from '@/hooks/useDishCardState';
import { usePriceFormat } from '@/hooks/usePriceFormat';
import { getOriginFlag } from '@/utils/dishCardHelpers';
import { selectionsStore } from '@/lib/selections-store';

interface DishCardCompactProps {
  dish: DishItem;
  onCardClick?: (dish: DishItem) => void;
}

const fallbackImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400';

export function DishCardCompact({ dish, onCardClick }: DishCardCompactProps) {
  const { isFavorite, imageError, setImageError, selectionQuantity } = useDishCardState(dish);
  const { formatPriceCompact } = usePriceFormat();

  return (
    <div
      onClick={() => onCardClick?.(dish)}
      className="bg-theme-bg-elevated rounded-lg shadow-sm hover:shadow-md transition-all p-3 flex gap-3 items-center cursor-pointer active:scale-[0.98]"
    >
      {/* Image - Fixed size */}
      <img
        src={imageError ? fallbackImage : dish.image}
        alt={dish.name}
        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        onError={() => setImageError(true)}
      />

      {/* Product info - Flexible */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <p className="font-bold text-xl text-amber-700 flex-shrink-0">
            {formatPriceCompact(dish.price)}
          </p>
          {isFavorite && (
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
        <h3 className="font-semibold text-theme-text-primary line-clamp-2 leading-tight text-sm">
          {dish.name}
        </h3>
        {dish.origin && getOriginFlag(dish.origin) && (
          <span className="text-2xl mt-0.5">
            {getOriginFlag(dish.origin)}
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 flex-shrink-0">
        {selectionQuantity === 0 ? (
          /* Add to selections button */
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectionsStore.increment(dish);
            }}
            className="w-12 h-12 bg-green-500 rounded-full font-bold text-white hover:bg-green-600 transition-all flex items-center justify-center text-2xl shadow-lg"
            title="Aggiungi alle selezioni"
          >
            +
          </button>
        ) : (
          /* Quantity controls - Red for remove, Green for add */
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectionsStore.decrement(dish.id);
              }}
              className="w-12 h-12 bg-red-500 rounded-full font-bold text-white hover:bg-red-600 transition-all flex items-center justify-center text-2xl shadow-lg"
              title="Rimuovi"
            >
              −
            </button>
            <span className="font-bold text-theme-text-primary text-lg min-w-[24px] text-center">
              {selectionQuantity}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectionsStore.increment(dish);
              }}
              className="w-12 h-12 bg-green-500 rounded-full font-bold text-white hover:bg-green-600 transition-all flex items-center justify-center text-2xl shadow-lg"
              title="Aggiungi"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
