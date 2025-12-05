'use client';

import { useState, useEffect } from 'react';
import { DishItem } from './DishCard';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { formatConvertedPrice } from '../lib/currency-converter';
import { favoritesStore } from '../lib/favorites-store';
import { useTranslation } from '../lib/use-translation';

interface PopularSectionProps {
  items: DishItem[];
  onItemClick: (item: DishItem) => void;
  totalCount?: number; // Total count of popular items (not just visible ones)
  onSeeAllClick?: () => void; // Callback when "See All" is clicked
}

export function PopularSection({ items, onItemClick, totalCount, onSeeAllClick }: PopularSectionProps) {
  const { t } = useTranslation();
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  // Load favorites on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favoriteIds = new Set(favoritesStore.get().favoriteIds);
      setFavorites(favoriteIds);
    }
  }, []);

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

  // Price formatting - Coffee House uses EUR prices
  const formatPriceCompact = (price: number) => {
    // Check if currency conversion is enabled (enabled = true when currency != EUR)
    if (currencyPrefs.enabled) {
      // Use full formatting for converted currencies
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    // Default EUR format for Coffee House menu
    return `€${price.toFixed(2)}`;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="px-4 mb-4 flex items-center justify-between">
        {/* Title with count */}
        <h2 className="text-2xl font-bold text-theme-text-primary flex items-center gap-2">
          <span>🔥</span>
          <span>{t.menu.sections.popular}</span>
          {totalCount !== undefined && <span className="text-xl text-theme-text-secondary font-normal">({totalCount})</span>}
        </h2>

        {/* See All CTA - Icon only */}
        {onSeeAllClick && (
          <button
            onClick={onSeeAllClick}
            className="text-theme-interactive-primary hover:text-theme-interactive-primary-hover transition-colors p-1"
            aria-label={t.menu.sections.seeAll}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Horizontal Scroll Cards - Beast Burger Style */}
      <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
        {items.map((item) => {
          const isFavorite = favorites.has(item.id);

          return (
            <div
              key={item.id}
              className="flex-shrink-0 w-44 flex flex-col"
            >
              {/* Image with dark background - Beast Burger style */}
              <div className="relative w-44 h-36 bg-gray-900 rounded-2xl overflow-hidden mb-2">
                <button
                  onClick={() => onItemClick(item)}
                  className="w-full h-full"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Favorite button - top right - show only when favorited */}
                {isFavorite && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      favoritesStore.toggle(item.id);
                    }}
                    className="absolute top-[-3px] right-[-10px] hover:scale-110 transition-transform z-10"
                    aria-label="Remove from favorites"
                  >
                    <svg className="w-6 h-6 text-red-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Product Name and Price on same line */}
              <button
                onClick={() => onItemClick(item)}
                className="flex items-start gap-2 text-left w-full"
              >
                <h3 className="font-bold text-sm text-theme-text-primary flex-1 min-w-0">
                  {item.name}
                </h3>
                <p className="text-xl font-bold text-theme-text-primary flex-shrink-0">
                  {formatPriceCompact(item.price)}
                </p>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
