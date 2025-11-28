/**
 * Selections Store
 * Manages customer's selected dishes (digital notepad) with localStorage persistence
 * This is NOT an ordering system - just a list to show the waiter
 */

import { DishItem } from '../components/DishCard';

export interface SelectionItem {
  id: string; // dish.id
  dish: DishItem;
  quantity: number; // Quantity selected
  addedAt: number; // Timestamp
}

export interface SelectionsData {
  items: SelectionItem[];
}

const STORAGE_KEY = 'roots-selections';

const DEFAULT_SELECTIONS: SelectionsData = {
  items: [],
};

/**
 * Selections Store
 */
export const selectionsStore = {
  get(): SelectionsData {
    if (typeof window === 'undefined') return DEFAULT_SELECTIONS;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_SELECTIONS;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SELECTIONS, ...parsed };
    } catch (error) {
      console.error('Failed to load selections:', error);
      return DEFAULT_SELECTIONS;
    }
  },

  set(selections: SelectionsData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('selections-updated'));
    } catch (error) {
      console.error('Failed to save selections:', error);
    }
  },

  add(dish: DishItem): void {
    const current = this.get();

    // Check if dish is already selected
    const existingIndex = current.items.findIndex(item => item.id === dish.id);

    if (existingIndex < 0) {
      // Add new selection with quantity 1
      current.items.push({
        id: dish.id,
        dish,
        quantity: 1,
        addedAt: Date.now(),
      });

      this.set(current);
    }
  },

  increment(dish: DishItem): void {
    const current = this.get();
    const existingIndex = current.items.findIndex(item => item.id === dish.id);

    if (existingIndex >= 0) {
      // Increment quantity if already exists
      current.items[existingIndex].quantity += 1;
      this.set(current);
    } else {
      // Add new selection with quantity 1
      this.add(dish);
    }
  },

  decrement(dishId: string): void {
    const current = this.get();
    const existingIndex = current.items.findIndex(item => item.id === dishId);

    if (existingIndex >= 0) {
      if (current.items[existingIndex].quantity > 1) {
        // Decrease quantity
        current.items[existingIndex].quantity -= 1;
        this.set(current);
      } else {
        // Remove if quantity is 1
        this.remove(dishId);
      }
    }
  },

  getQuantity(dishId: string): number {
    const current = this.get();
    const item = current.items.find(item => item.id === dishId);
    return item ? item.quantity : 0;
  },

  remove(dishId: string): void {
    const current = this.get();
    const updated: SelectionsData = {
      items: current.items.filter(item => item.id !== dishId),
    };
    this.set(updated);
  },

  toggle(dish: DishItem): boolean {
    const current = this.get();
    const existingIndex = current.items.findIndex(item => item.id === dish.id);

    if (existingIndex >= 0) {
      // Remove if already selected
      this.remove(dish.id);
      return false; // Not selected anymore
    } else {
      // Add if not selected
      this.add(dish);
      return true; // Now selected
    }
  },

  isSelected(dishId: string): boolean {
    const current = this.get();
    return current.items.some(item => item.id === dishId);
  },

  clear(): void {
    this.set(DEFAULT_SELECTIONS);
  },

  getCount(): number {
    const current = this.get();
    // Sum all quantities instead of just counting items
    return current.items.reduce((total, item) => total + item.quantity, 0);
  },

  getItems(): SelectionItem[] {
    return this.get().items;
  },
};
