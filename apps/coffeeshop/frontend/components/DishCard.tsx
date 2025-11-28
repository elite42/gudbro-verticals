'use client';

import React from 'react';
import { DishCardProps } from '@/types/dish';
import { DishCardCompact } from './DishCard/DishCardCompact';
import { DishCardHorizontal } from './DishCard/DishCardHorizontal';
import { DishCardVertical} from './DishCard/DishCardVertical';

// Re-export types for backward compatibility
export type { Extra, DishItem } from '@/types/dish';

/**
 * Main DishCard component - Routes to appropriate variant
 *
 * Refactored from 500 lines to ~30 lines by extracting:
 * - Custom hooks: useDishCardState, usePriceFormat
 * - Utilities: dishCardHelpers
 * - Sub-components: DishCardCompact, DishCardHorizontal, DishCardVertical
 *
 * Benefits of refactoring:
 * - Much easier to maintain and test
 * - Clearer separation of concerns
 * - Reusable hooks and utilities
 * - Each variant is self-contained
 */
export function DishCard({ dish, variant = 'vertical', onAddToCart, onCardClick }: DishCardProps) {
  // Route to appropriate variant component
  switch (variant) {
    case 'compact':
      return <DishCardCompact dish={dish} onCardClick={onCardClick} />;

    case 'horizontal':
      return (
        <DishCardHorizontal
          dish={dish}
          onAddToCart={onAddToCart}
          onCardClick={onCardClick}
        />
      );

    case 'vertical':
    case 'grid':
    default:
      return (
        <DishCardVertical
          dish={dish}
          onAddToCart={onAddToCart}
          onCardClick={onCardClick}
        />
      );
  }
}
