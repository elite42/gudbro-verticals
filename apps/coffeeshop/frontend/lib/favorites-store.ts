/**
 * Favorites Store
 * Manages user's favorite menu items with localStorage persistence
 */

export interface FavoritesData {
  favoriteIds: string[]; // Array of dish IDs
}

const STORAGE_KEY = 'roots-favorites';

const DEFAULT_FAVORITES: FavoritesData = {
  favoriteIds: [],
};

/**
 * Favorites Store
 */
export const favoritesStore = {
  get(): FavoritesData {
    if (typeof window === 'undefined') return DEFAULT_FAVORITES;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_FAVORITES;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_FAVORITES, ...parsed };
    } catch (error) {
      console.error('Failed to load favorites:', error);
      return DEFAULT_FAVORITES;
    }
  },

  set(favorites: FavoritesData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  },

  toggle(dishId: string): boolean {
    const current = this.get();
    const isFavorite = current.favoriteIds.includes(dishId);

    const updated: FavoritesData = {
      favoriteIds: isFavorite
        ? current.favoriteIds.filter(id => id !== dishId)
        : [...current.favoriteIds, dishId],
    };

    this.set(updated);
    return !isFavorite; // Return new favorite status
  },

  isFavorite(dishId: string): boolean {
    const current = this.get();
    return current.favoriteIds.includes(dishId);
  },

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('favorites-updated'));
    } catch (error) {
      console.error('Failed to clear favorites:', error);
    }
  },

  count(): number {
    return this.get().favoriteIds.length;
  },
};
