/**
 * Dish Preferences System
 *
 * Saves user's favorite customizations for each dish
 * Phase 1: localStorage
 * Phase 2: Backend sync with social login
 */

import { Extra } from '../components/DishCard';

export interface DishPreference {
  dishId: string;
  dishName: string; // For display in modal
  extras: Extra[];
  quantity: number;
  savedAt: number; // Timestamp
}

interface DishPreferencesData {
  preferences: Record<string, DishPreference>; // keyed by dishId
}

const STORAGE_KEY = 'roots-dish-preferences';

const DEFAULT_DATA: DishPreferencesData = {
  preferences: {}
};

/**
 * Dish Preferences Store
 */
export const dishPreferencesStore = {
  /**
   * Get all preferences
   */
  getAll(): DishPreferencesData {
    if (typeof window === 'undefined') return DEFAULT_DATA;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_DATA;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_DATA, ...parsed };
    } catch (error) {
      console.error('Failed to load dish preferences:', error);
      return DEFAULT_DATA;
    }
  },

  /**
   * Get preference for a specific dish
   */
  get(dishId: string): DishPreference | null {
    const data = this.getAll();
    return data.preferences[dishId] || null;
  },

  /**
   * Check if a preference exists for a dish
   */
  has(dishId: string): boolean {
    const data = this.getAll();
    return dishId in data.preferences;
  },

  /**
   * Save or update preference for a dish
   */
  set(dishId: string, dishName: string, extras: Extra[], quantity: number): void {
    if (typeof window === 'undefined') return;

    try {
      const data = this.getAll();

      data.preferences[dishId] = {
        dishId,
        dishName,
        extras,
        quantity,
        savedAt: Date.now()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('dish-preferences-updated'));
    } catch (error) {
      console.error('Failed to save dish preference:', error);
    }
  },

  /**
   * Remove preference for a dish
   */
  remove(dishId: string): void {
    if (typeof window === 'undefined') return;

    try {
      const data = this.getAll();
      delete data.preferences[dishId];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event('dish-preferences-updated'));
    } catch (error) {
      console.error('Failed to remove dish preference:', error);
    }
  },

  /**
   * Clear all preferences
   */
  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('dish-preferences-updated'));
    } catch (error) {
      console.error('Failed to clear dish preferences:', error);
    }
  }
};

/**
 * Format extras for display (e.g., "Oat Milk, Large, Extra Shot")
 */
export function formatExtrasDescription(extras: Extra[]): string {
  if (extras.length === 0) return 'Nessuna customizzazione';
  return extras.map(e => e.name).join(', ');
}
