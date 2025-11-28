/**
 * Cart Store
 * Manages shopping cart with localStorage persistence
 */

import { DishItem, Extra } from '../components/DishCard';
import { tableContextStore } from './table-context-store';

export interface CartItem {
  id: string; // Unique ID for this cart entry (dish.id + extras hash)
  dish: DishItem;
  quantity: number;
  extras: Extra[];
  addedAt: number; // Timestamp
}

export interface CartData {
  items: CartItem[];
}

const STORAGE_KEY = 'roots-cart';

const DEFAULT_CART: CartData = {
  items: [],
};

/**
 * Generate unique ID for cart item based on dish and extras
 */
function generateCartItemId(dishId: string, extras: Extra[]): string {
  const extrasIds = extras.map(e => e.id).sort().join(',');
  return `${dishId}-${extrasIds}`;
}

/**
 * Cart Store
 */
export const cartStore = {
  get(): CartData {
    if (typeof window === 'undefined') return DEFAULT_CART;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_CART;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_CART, ...parsed };
    } catch (error) {
      console.error('Failed to load cart:', error);
      return DEFAULT_CART;
    }
  },

  set(cart: CartData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  },

  add(dish: DishItem, quantity: number, extras: Extra[]): void {
    const current = this.get();
    const itemId = generateCartItemId(dish.id, extras);

    // Check if item with same dish and extras already exists
    const existingIndex = current.items.findIndex(item => item.id === itemId);

    if (existingIndex >= 0) {
      // Update quantity of existing item
      current.items[existingIndex].quantity += quantity;
    } else {
      // Add new item
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

  remove(itemId: string): void {
    const current = this.get();
    const updated: CartData = {
      items: current.items.filter(item => item.id !== itemId),
    };
    this.set(updated);
  },

  updateQuantity(itemId: string, quantity: number): void {
    const current = this.get();
    const itemIndex = current.items.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        this.remove(itemId);
      } else {
        current.items[itemIndex].quantity = quantity;
        this.set(current);
      }
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  },

  count(): number {
    return this.get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotal(): number {
    return this.get().items.reduce((total, item) => {
      const dishPrice = item.dish.price * item.quantity;
      const extrasPrice = item.extras.reduce((sum, extra) => sum + extra.price, 0) * item.quantity;
      return total + dishPrice + extrasPrice;
    }, 0);
  },

  /**
   * Get complete order data including table context
   * Ready to be sent to backend
   */
  getOrderData(): {
    items: CartItem[];
    total: number;
    table_context: {
      table_number: string | null;
      customer_name: string | null;
      consumption_type: 'dine-in' | 'takeaway';
      service_type: 'table-service' | 'counter-pickup' | 'takeaway';
    };
  } {
    const cart = this.get();
    const orderContext = tableContextStore.getOrderContext();

    return {
      items: cart.items,
      total: this.getTotal(),
      table_context: orderContext,
    };
  },
};
