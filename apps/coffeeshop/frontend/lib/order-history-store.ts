/**
 * Order History Store
 * Manages order history with localStorage persistence
 */

import { CartItem } from './cart-store';

export interface Order {
  id: string; // Unique order ID
  items: CartItem[];
  total: number;
  table_context: {
    table_number: string | null;
    customer_name: string | null;
    consumption_type: 'dine-in' | 'takeaway';
    service_type: 'table-service' | 'counter-pickup' | 'takeaway';
  };
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  submittedAt: number; // Timestamp
}

export interface OrderHistory {
  orders: Order[];
}

const STORAGE_KEY = 'roots-order-history';

const DEFAULT_HISTORY: OrderHistory = {
  orders: [],
};

/**
 * Generate unique order ID
 */
function generateOrderId(): string {
  return `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Order History Store
 */
export const orderHistoryStore = {
  get(): OrderHistory {
    if (typeof window === 'undefined') return DEFAULT_HISTORY;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return DEFAULT_HISTORY;

      const parsed = JSON.parse(stored);
      return { ...DEFAULT_HISTORY, ...parsed };
    } catch (error) {
      console.error('Failed to load order history:', error);
      return DEFAULT_HISTORY;
    }
  },

  set(history: OrderHistory): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      // Dispatch event for reactive updates
      window.dispatchEvent(new Event('order-history-updated'));
    } catch (error) {
      console.error('Failed to save order history:', error);
    }
  },

  /**
   * Add a new order to history
   */
  addOrder(orderData: {
    items: CartItem[];
    total: number;
    table_context: {
      table_number: string | null;
      customer_name: string | null;
      consumption_type: 'dine-in' | 'takeaway';
      service_type: 'table-service' | 'counter-pickup' | 'takeaway';
    };
  }): Order {
    const current = this.get();
    const newOrder: Order = {
      id: generateOrderId(),
      ...orderData,
      status: 'pending',
      submittedAt: Date.now(),
    };

    current.orders.unshift(newOrder); // Add to beginning of array
    this.set(current);

    return newOrder;
  },

  /**
   * Get all orders
   */
  getAll(): Order[] {
    return this.get().orders;
  },

  /**
   * Get orders for current session (last 24 hours)
   */
  getSessionOrders(): Order[] {
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return this.get().orders.filter((order) => order.submittedAt > oneDayAgo);
  },

  /**
   * Get order by ID
   */
  getById(orderId: string): Order | undefined {
    return this.get().orders.find((order) => order.id === orderId);
  },

  /**
   * Update order status
   */
  updateStatus(orderId: string, status: Order['status']): void {
    const current = this.get();
    const orderIndex = current.orders.findIndex((order) => order.id === orderId);

    if (orderIndex >= 0) {
      current.orders[orderIndex].status = status;
      this.set(current);
    }
  },

  /**
   * Clear all order history
   */
  clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event('order-history-updated'));
    } catch (error) {
      console.error('Failed to clear order history:', error);
    }
  },

  /**
   * Get order count
   */
  count(): number {
    return this.get().orders.length;
  },
};
