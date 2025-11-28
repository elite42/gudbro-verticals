/**
 * User Preferences System
 *
 * Phase 1: localStorage (current)
 * Phase 2: Backend API sync (future upgrade - zero breaking changes)
 *
 * This abstraction layer allows seamless migration from localStorage to API
 */

export interface UserPreferences {
  // Allergens to avoid (from Sistema 51 Filtri - 30 allergens)
  allergens_to_avoid: string[];

  // Intolerances (from Sistema 51 Filtri - 10 intolerances)
  intolerances: string[];

  // Dietary preferences (from Sistema 51 Filtri - 11 diets)
  dietary_preferences: string[];

  // UI preference: hide incompatible products or show with warning
  hide_incompatible: boolean;

  // User profile info (for future use)
  name?: string;
  email?: string;
}

// Default preferences for new users
export const DEFAULT_PREFERENCES: UserPreferences = {
  allergens_to_avoid: [],
  intolerances: [],
  dietary_preferences: [],
  hide_incompatible: false,
};

// Storage key for localStorage
const STORAGE_KEY = 'gudbro_user_preferences';

/**
 * Preferences Store Interface
 * Implementations can be localStorage, API, or hybrid
 */
interface IPreferencesStore {
  get(): UserPreferences;
  set(preferences: UserPreferences): void;
  update(partial: Partial<UserPreferences>): void;
  clear(): void;
}

/**
 * LocalStorage Implementation
 * Phase 1: Simple, fast, works offline
 */
class LocalStoragePreferencesStore implements IPreferencesStore {
  get(): UserPreferences {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_PREFERENCES;

      const parsed = JSON.parse(stored);
      // Merge with defaults to ensure all fields exist
      return { ...DEFAULT_PREFERENCES, ...parsed };
    } catch (error) {
      console.error('Error loading preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  }

  set(preferences: UserPreferences): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  }

  update(partial: Partial<UserPreferences>): void {
    const current = this.get();
    const updated = { ...current, ...partial };
    this.set(updated);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * API Implementation (Phase 2 - Future)
 * Uncomment and use when backend is ready
 */
/*
class APIPreferencesStore implements IPreferencesStore {
  private cache: UserPreferences | null = null;

  async get(): Promise<UserPreferences> {
    if (this.cache) return this.cache;

    try {
      const response = await fetch('/api/user/preferences');
      const data = await response.json();
      this.cache = data;
      return data;
    } catch (error) {
      console.error('Error loading preferences from API:', error);
      return DEFAULT_PREFERENCES;
    }
  }

  async set(preferences: UserPreferences): Promise<void> {
    try {
      await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      this.cache = preferences;
    } catch (error) {
      console.error('Error saving preferences to API:', error);
    }
  }

  async update(partial: Partial<UserPreferences>): Promise<void> {
    const current = await this.get();
    const updated = { ...current, ...partial };
    await this.set(updated);
  }

  async clear(): Promise<void> {
    await fetch('/api/user/preferences', { method: 'DELETE' });
    this.cache = null;
  }
}
*/

// Singleton instance - easy to swap implementation
export const preferencesStore = new LocalStoragePreferencesStore();

/**
 * React Hook for using preferences
 * This will work with both localStorage and API implementations
 */
export function useUserPreferences() {
  // For now, we'll manage state manually
  // In Phase 2, this can use React Query or SWR for API sync

  const getPreferences = (): UserPreferences => {
    return preferencesStore.get();
  };

  const updatePreferences = (partial: Partial<UserPreferences>) => {
    preferencesStore.update(partial);
    // Trigger re-render by dispatching a custom event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('preferences-updated'));
    }
  };

  const clearPreferences = () => {
    preferencesStore.clear();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('preferences-updated'));
    }
  };

  return {
    preferences: getPreferences(),
    updatePreferences,
    clearPreferences,
  };
}

/**
 * Mapping of intolerances to related allergens
 * Phase 1: Basic mapping using existing allergen data
 * Phase 2: Will require ingredient-level analysis for complex intolerances
 */
const INTOLERANCE_TO_ALLERGEN_MAP: Record<string, string[]> = {
  'lactose': ['milk'],
  'gluten': ['gluten', 'wheat', 'oats', 'barley', 'rye'],
  'sulfites': ['sulphites'],
  'nightshades': ['tomato', 'potato'],
  // Complex intolerances requiring ingredient-level analysis in Phase 2:
  'fructose': [], // Requires fruit/sweetener ingredient data
  'histamine': [], // Requires fermented food detection
  'salicylates': [], // Requires plant-based ingredient analysis
  'fodmap': [], // Complex: requires multiple ingredient checks
  'oxalates': [], // Requires specific vegetable ingredient data
  'tyramine': [], // Requires aged/fermented food detection
};

/**
 * Filter menu items based on user preferences
 */
export function filterMenuByPreferences(
  items: any[],
  preferences: UserPreferences
): { compatible: any[]; incompatible: any[] } {
  const compatible: any[] = [];
  const incompatible: any[] = [];

  for (const item of items) {
    let isCompatible = true;

    // Check allergens
    if (preferences.allergens_to_avoid.length > 0 && item.allergens) {
      const hasAllergen = item.allergens.some((allergen: string) =>
        preferences.allergens_to_avoid.includes(allergen)
      );
      if (hasAllergen) isCompatible = false;
    }

    // Check intolerances (mapped to allergens)
    if (preferences.intolerances.length > 0 && item.allergens) {
      const hasIntolerance = preferences.intolerances.some((intolerance: string) => {
        const relatedAllergens = INTOLERANCE_TO_ALLERGEN_MAP[intolerance] || [];
        // If no mapping exists yet, don't filter (will be handled in Phase 2)
        if (relatedAllergens.length === 0) return false;

        return item.allergens.some((allergen: string) =>
          relatedAllergens.includes(allergen)
        );
      });
      if (hasIntolerance) isCompatible = false;
    }

    // Check dietary preferences
    if (preferences.dietary_preferences.length > 0 && item.dietary) {
      const matchesDiet = preferences.dietary_preferences.every((diet: string) =>
        item.dietary.includes(diet)
      );
      if (!matchesDiet) isCompatible = false;
    }

    if (isCompatible) {
      compatible.push(item);
    } else {
      incompatible.push(item);
    }
  }

  return { compatible, incompatible };
}

/**
 * Get available allergens, intolerances, and diets from Sistema 51 Filtri
 * These are the options users can select in their preferences
 */
export const AVAILABLE_ALLERGENS = [
  'celery', 'gluten', 'crustaceans', 'eggs', 'fish', 'lupin', 'milk',
  'molluscs', 'mustard', 'nuts', 'peanuts', 'sesame', 'soya', 'sulphites',
  'banana', 'kiwi', 'apple', 'peach', 'cherry', 'avocado', 'tomato',
  'carrot', 'potato', 'garlic', 'onion', 'corn', 'wheat', 'oats',
  'barley', 'rye'
];

export const AVAILABLE_INTOLERANCES = [
  'lactose', 'gluten', 'fructose', 'histamine', 'sulfites',
  'salicylates', 'fodmap', 'nightshades', 'oxalates', 'tyramine'
];

export const AVAILABLE_DIETS = [
  'vegan', 'vegetarian', 'pescatarian', 'halal', 'kosher',
  'gluten_free', 'dairy_free', 'nut_free', 'low_carb', 'keto',
  'paleo', 'buddhist'
];
