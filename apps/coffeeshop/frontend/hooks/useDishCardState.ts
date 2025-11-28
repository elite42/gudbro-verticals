'use client';

import { useState, useEffect } from 'react';
import { favoritesStore } from '@/lib/favorites-store';
import { selectionsStore } from '@/lib/selections-store';
import { DishItem } from '@/types/dish';

/**
 * Hook for managing DishCard component state
 */
export function useDishCardState(dish: DishItem) {
  const [quantity, setQuantity] = useState(0);
  const [showExtrasModal, setShowExtrasModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDietaryInfo, setShowDietaryInfo] = useState(false);
  const [selectionQuantity, setSelectionQuantity] = useState(0);

  // Sync favorites state
  useEffect(() => {
    setIsFavorite(favoritesStore.isFavorite(dish.id));

    const handleFavoritesUpdate = () => {
      setIsFavorite(favoritesStore.isFavorite(dish.id));
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('favorites-updated', handleFavoritesUpdate);
      return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate);
    }
  }, [dish.id]);

  // Sync selections state (for compact variant)
  useEffect(() => {
    const item = selectionsStore.getItem(dish.id);
    setSelectionQuantity(item?.quantity || 0);

    const handleSelectionsUpdate = () => {
      const item = selectionsStore.getItem(dish.id);
      setSelectionQuantity(item?.quantity || 0);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('selections-updated', handleSelectionsUpdate);
      return () => window.removeEventListener('selections-updated', handleSelectionsUpdate);
    }
  }, [dish.id]);

  const toggleFavorite = () => {
    const newStatus = favoritesStore.toggle(dish.id);
    setIsFavorite(newStatus);
  };

  return {
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
    selectionQuantity
  };
}
