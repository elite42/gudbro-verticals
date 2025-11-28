/**
 * Selections Store
 * Manages customer's selected dishes with localStorage persistence
 * 
 * TIER 1 (digital-menu): Digital notepad to show waiter (extras tracked for accuracy)
 * TIER 2+ (pre-ordering): Full cart with checkout (extras required for order)
 */

import { DishItem, Extra } from '../components/DishCard';

export interface SelectionItem {
  id: string; // Unique ID: dish.id + extras hash
  dish: DishItem;
  quantity: number;
  extras: Extra[]; // Customizations (size, milk, add-ons, etc.)
  addedAt: number;
}

export interface SelectionsData {
  items: SelectionItem[];
}

const STORAGE_KEY = 'roots-selections';

const DEFAULT_SELECTIONS: SelectionsData = {
  items: [],
};

/**
 * Generate unique ID for selection item based on dish and extras
 * Same dish with different extras = different selection items
 */
function generateSelectionId(dishId: string, extras: Extra[]): string {
  const extrasIds = extras.map(e => e.id).sort().join(',');
  return `${dishId}-${extrasIds}`;
}

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

  add(dish: DishItem, quantity: number = 1, extras: Extra[] = []): void {
    const current = this.get();
    const itemId = generateSelectionId(dish.id, extras);

    // Check if item with same dish AND extras already exists
    const existingIndex = current.items.findIndex(item => item.id === itemId);

    if (existingIndex >= 0) {
      // Update quantity of existing item
      current.items[existingIndex].quantity += quantity;
    } else {
      // Add new selection
      current.items.push({
        id: itemId,
        dish,
        quantity,
        extras,
        addedAt: Date.now(),
      });
    }

    this.set(current);
  },

  increment(dish: DishItem, extras: Extra[] = []): void {
    const current = this.get();
    const itemId = generateSelectionId(dish.id, extras);
    const existingIndex = current.items.findIndex(item => item.id === itemId);

    if (existingIndex >= 0) {
      // Increment quantity if already exists
      current.items[existingIndex].quantity += 1;
      this.set(current);
    } else {
      // Add new selection with quantity 1
      this.add(dish, 1, extras);
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

  toggle(dish: DishItem, extras: Extra[] = []): boolean {
    const current = this.get();
    const itemId = generateSelectionId(dish.id, extras);
    const existingIndex = current.items.findIndex(item => item.id === itemId);

    if (existingIndex >= 0) {
      // Remove if already selected
      this.remove(itemId);
      return false; // Not selected anymore
    } else {
      // Add if not selected
      this.add(dish, 1, extras);
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

  getItem(dishId: string): SelectionItem | undefined {
    const current = this.get();
    return current.items.find(item => item.dish.id === dishId);
  },
};
