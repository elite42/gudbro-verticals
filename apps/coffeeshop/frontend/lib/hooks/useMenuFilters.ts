/**
 * useMenuFilters Hook
 *
 * Manages all menu filtering state:
 * - Category selection (all, new, favorites, specific category)
 * - Menu type selection (drinks, food, merchandise)
 * - Preferences filtering (allergens, intolerances, dietary)
 */

import { useState, useMemo, useEffect } from 'react';
import { DishItem } from '@/components/DishCard';
import { preferencesStore, filterMenuByPreferences } from '@/lib/user-preferences';
import { favoritesStore } from '@/lib/favorites-store';
import { getProductMenuType } from '@/lib/category-system';
import type { MenuType } from '@/data/categories';

export interface UseMenuFiltersOptions {
  initialMenuType?: MenuType;
  initialCategory?: string;
}

export interface UseMenuFiltersResult {
  // State
  selectedCategory: string;
  selectedMenuType: MenuType;
  showOnlyCompatible: boolean;

  // Setters
  setSelectedCategory: (category: string) => void;
  setSelectedMenuType: (menuType: MenuType) => void;
  setShowOnlyCompatible: (show: boolean) => void;

  // Computed
  hasPreferences: boolean;

  // Filter function
  filterItems: (items: DishItem[]) => DishItem[];
}

export function useMenuFilters(options: UseMenuFiltersOptions = {}): UseMenuFiltersResult {
  const {
    initialMenuType = 'drinks',
    initialCategory = 'all',
  } = options;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMenuType, setSelectedMenuType] = useState<MenuType>(initialMenuType);
  const [showOnlyCompatible, setShowOnlyCompatible] = useState(true);
  const [preferencesKey, setPreferencesKey] = useState(0);

  // Listen for preferences changes
  useEffect(() => {
    const handlePreferencesUpdate = () => {
      setPreferencesKey(prev => prev + 1);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('preferences-updated', handlePreferencesUpdate);
      return () => window.removeEventListener('preferences-updated', handlePreferencesUpdate);
    }
  }, []);

  // Get user preferences
  const userPreferences = preferencesStore.get();
  const hasPreferences =
    userPreferences.allergens_to_avoid.length > 0 ||
    userPreferences.intolerances.length > 0 ||
    userPreferences.dietary_preferences.length > 0;

  // Helper to check if an item is new
  const isItemNew = (item: DishItem): boolean => {
    if (!item.isNew || !item.newUntil) return false;
    const newUntilDate = new Date(item.newUntil);
    const now = new Date();
    return now <= newUntilDate;
  };

  // Filter function that applies all filters
  const filterItems = useMemo(() => {
    // Re-run when preferencesKey changes
    void preferencesKey;

    return (items: DishItem[]): DishItem[] => {
      // 1. Apply preferences filter
      const { compatible } = filterMenuByPreferences(items, userPreferences);
      let result = hasPreferences && showOnlyCompatible ? compatible : items;

      // 2. Apply menu type filter
      result = result.filter(item => {
        const itemMenuType = getProductMenuType(item.category);
        return itemMenuType === selectedMenuType;
      });

      // 3. Apply category filter
      if (selectedCategory === 'all') {
        // No additional filtering
      } else if (selectedCategory === 'new') {
        result = result.filter(isItemNew);
      } else if (selectedCategory === 'favorites') {
        result = result.filter(item => favoritesStore.isFavorite(item.id));
      } else {
        result = result.filter(item => item.category === selectedCategory);
      }

      return result;
    };
  }, [selectedCategory, selectedMenuType, showOnlyCompatible, hasPreferences, userPreferences, preferencesKey]);

  return {
    selectedCategory,
    selectedMenuType,
    showOnlyCompatible,
    setSelectedCategory,
    setSelectedMenuType: (menuType: MenuType) => setSelectedMenuType(menuType),
    setShowOnlyCompatible,
    hasPreferences,
    filterItems,
  };
}
