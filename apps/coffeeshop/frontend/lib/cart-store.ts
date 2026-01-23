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
  sessionId: string; // Device session ID for split bill tracking
}

export interface TaxSettings {
  enabled: boolean;
  percentage: number;
  displayMode: 'inclusive' | 'exclusive';
  label: string;
}

export interface TipSettings {
  enabled: boolean;
  presets: number[];
  allowCustom: boolean;
  calculationBase: 'pre_tax' | 'post_tax';
}

export interface ServiceChargeSettings {
  enabled: boolean;
  percentage: number;
  label: string;
  calculationBase: 'pre_tax' | 'post_tax';
}

export interface PaymentSettings {
  tax: TaxSettings;
  tips: TipSettings;
  serviceCharge: ServiceChargeSettings;
}

export interface TipState {
  amount: number;
  percentage: number;
}

export interface CartData {
  items: CartItem[];
  tip: TipState;
  sessionId: string; // Device fingerprint for split bill
}

const STORAGE_KEY = 'roots-cart';
const SESSION_ID_KEY = 'order_session_id';

/**
 * Get or create a unique session ID for this device
 * Used for split bill tracking - each device gets a unique session
 */
function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

const DEFAULT_CART: CartData = {
  items: [],
  tip: { amount: 0, percentage: 0 },
  sessionId: '',
};

/**
 * Generate unique ID for cart item based on dish and extras
 */
function generateCartItemId(dishId: string, extras: Extra[]): string {
  const extrasIds = extras
    .map((e) => e.id)
    .sort()
    .join(',');
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
      const sessionId = getOrCreateSessionId();

      if (!stored) return { ...DEFAULT_CART, sessionId };

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_CART, ...parsed, sessionId };
    } catch (error) {
      console.error('Failed to load cart:', error);
      return { ...DEFAULT_CART, sessionId: getOrCreateSessionId() };
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
    const sessionId = getOrCreateSessionId();

    // Check if item with same dish and extras already exists
    const existingIndex = current.items.findIndex((item) => item.id === itemId);

    if (existingIndex >= 0) {
      // Update quantity of existing item
      current.items[existingIndex].quantity += quantity;
    } else {
      // Add new item with session tracking for split bill
      current.items.push({
        id: itemId,
        dish,
        quantity,
        extras,
        addedAt: Date.now(),
        sessionId,
      });
    }

    this.set(current);
  },

  remove(itemId: string): void {
    const current = this.get();
    const updated: CartData = {
      items: current.items.filter((item) => item.id !== itemId),
      tip: current.tip,
      sessionId: current.sessionId,
    };
    this.set(updated);
  },

  updateQuantity(itemId: string, quantity: number): void {
    const current = this.get();
    const itemIndex = current.items.findIndex((item) => item.id === itemId);

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

  setTip(amount: number, percentage: number): void {
    const current = this.get();
    current.tip = { amount, percentage };
    this.set(current);
  },

  getTip(): TipState {
    return this.get().tip || { amount: 0, percentage: 0 };
  },

  clearTip(): void {
    const current = this.get();
    current.tip = { amount: 0, percentage: 0 };
    this.set(current);
  },

  /**
   * Get current device session ID
   * Used for split bill functionality
   */
  getSessionId(): string {
    return getOrCreateSessionId();
  },

  /**
   * Get items added by current session only
   * Used for "pay my share" in split bill
   */
  getMyItems(): CartItem[] {
    const cart = this.get();
    const sessionId = getOrCreateSessionId();
    return cart.items.filter((item) => item.sessionId === sessionId);
  },

  /**
   * Get total for current session items only
   * Used for "pay my share" in split bill
   */
  getMyTotal(): number {
    return this.getMyItems().reduce((total, item) => {
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
    subtotal: number;
    tip: TipState;
    total: number;
    sessionId: string;
    table_context: {
      table_number: string | null;
      customer_name: string | null;
      consumption_type: 'dine-in' | 'takeaway';
      service_type: 'table-service' | 'counter-pickup' | 'takeaway';
    };
  } {
    const cart = this.get();
    const orderContext = tableContextStore.getOrderContext();
    const subtotal = this.getTotal();
    const tip = this.getTip();
    const sessionId = getOrCreateSessionId();

    return {
      items: cart.items,
      subtotal,
      tip,
      total: subtotal + tip.amount, // Note: tax and service charge calculated on frontend based on merchant settings
      sessionId,
      table_context: orderContext,
    };
  },
};
