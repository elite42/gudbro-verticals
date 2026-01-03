'use client';

import { useState, useEffect } from 'react';
import { DishItem } from './DishCard';
import { favoritesStore } from '../lib/favorites-store';
import { useTranslation } from '../lib/use-translation';
import { usePriceFormat } from '../hooks/usePriceFormat';
import { trackItemClick, track } from '@/lib/analytics-service';

interface CategorySectionProps {
  categoryId: string;
  categoryName: string;
  categoryIcon?: string;
  items: DishItem[];
  onItemClick: (item: DishItem) => void;
  onSeeAllClick?: () => void; // Callback when "See All" is clicked
}

export function CategorySection({
  categoryId,
  categoryName,
  categoryIcon,
  items,
  onItemClick,
  onSeeAllClick,
}: CategorySectionProps) {
  const { t } = useTranslation();
  const { formatPrice } = usePriceFormat();
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  // Load favorites on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favoriteIds = new Set(favoritesStore.get().favoriteIds);
      setFavorites(favoriteIds);
    }
  }, []);

  // Listen for favorites changes
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const favoriteIds = new Set(favoritesStore.get().favoriteIds);
      setFavorites(favoriteIds);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('favorites-updated', handleFavoritesUpdate);
      return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate);
    }
  }, []);

  // Handle item click with analytics tracking
  const handleItemClick = (item: DishItem) => {
    trackItemClick(item.id, item.name, categoryId);
    onItemClick(item);
  };

  // Handle See All click with analytics tracking
  const handleSeeAllClick = () => {
    track(
      'category_click',
      {
        category_id: categoryId,
        category_name: categoryName,
        item_count: items.length,
      },
      'interaction'
    );
    onSeeAllClick?.();
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between px-4">
        {/* Title with count */}
        <h2 className="text-theme-text-primary flex items-center gap-2 text-2xl font-bold">
          {categoryIcon && <span>{categoryIcon}</span>}
          <span>{categoryName}</span>
          <span className="text-theme-text-secondary text-xl font-normal">({items.length})</span>
        </h2>

        {/* See All CTA - Icon only */}
        {onSeeAllClick && (
          <button
            onClick={handleSeeAllClick}
            className="text-theme-interactive-primary hover:text-theme-interactive-primary-hover p-1 transition-colors"
            aria-label={t.menu.sections.seeAll}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2">
        {items.map((item) => {
          const isFavorite = favorites.has(item.id);

          return (
            <div key={item.id} className="flex w-44 flex-shrink-0 flex-col">
              {/* Image with dark background */}
              <div className="relative mb-2 h-36 w-44 overflow-hidden rounded-2xl bg-gray-900">
                <button onClick={() => handleItemClick(item)} className="h-full w-full">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </button>

                {/* Favorite button - top right - show only when favorited */}
                {isFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      favoritesStore.toggle(item.id);
                    }}
                    className="absolute right-[-10px] top-[-3px] z-10 transition-transform hover:scale-110"
                    aria-label="Remove from favorites"
                  >
                    <svg
                      className="h-6 w-6 text-red-500 drop-shadow-lg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Product Name and Price on same line */}
              <button
                onClick={() => handleItemClick(item)}
                className="flex w-full items-start gap-2 text-left"
              >
                <h3 className="text-theme-text-primary min-w-0 flex-1 text-sm font-bold">
                  {item.name}
                </h3>
                <p className="text-theme-text-primary flex-shrink-0 text-xl font-bold">
                  {formatPrice(item.price)}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
