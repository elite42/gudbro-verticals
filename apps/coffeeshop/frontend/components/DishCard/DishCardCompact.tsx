'use client';

import React from 'react';
import { DishItem } from '@/types/dish';
import { useDishCardState } from '@/hooks/useDishCardState';
import { useAppPriceFormat as usePriceFormat } from '@/lib/currency';
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
      className="bg-theme-bg-elevated flex cursor-pointer items-center gap-3 rounded-lg p-3 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
    >
      {/* Image - Fixed size */}
      <img
        src={imageError ? fallbackImage : dish.image}
        alt={dish.name}
        className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
        onError={() => setImageError(true)}
      />

      {/* Product info - Flexible */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-baseline gap-2">
          <p className="flex-shrink-0 text-xl font-bold text-amber-700">
            {formatPriceCompact(dish.price)}
          </p>
          {isFavorite && (
            <svg
              className="h-4 w-4 flex-shrink-0 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
        <h3 className="text-theme-text-primary line-clamp-2 text-sm font-semibold leading-tight">
          {dish.name}
        </h3>
        {dish.origin && getOriginFlag(dish.origin) && (
          <span className="mt-0.5 text-2xl">{getOriginFlag(dish.origin)}</span>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-shrink-0 gap-2">
        {selectionQuantity === 0 ? (
          /* Add to selections button */
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectionsStore.increment(dish);
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white shadow-lg transition-all hover:bg-green-600"
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
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl font-bold text-white shadow-lg transition-all hover:bg-red-600"
              title="Rimuovi"
            >
              −
            </button>
            <span className="text-theme-text-primary min-w-[24px] text-center text-lg font-bold">
              {selectionQuantity}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectionsStore.increment(dish);
              }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl font-bold text-white shadow-lg transition-all hover:bg-green-600"
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
