/**
 * Orders Store
 *
 * Manages orders for assigned tables using Zustand.
 * Uses shared OrderStatus and OrderItemStatus types from @gudbro/types.
 */

import { create } from 'zustand';
import type { OrderStatus, OrderItemStatus } from '@gudbro/types';

export type { OrderStatus, OrderItemStatus };

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  modifiers?: string[];
  status: OrderItemStatus;
}

export interface Order {
  id: string;
  orderNumber: string;
  locationId: string;
  tableId: string;
  tableNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  customerName?: string;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  updateOrderItem: (orderId: string, itemId: string, updates: Partial<OrderItem>) => void;
  removeOrder: (id: string) => void;
  clearOrders: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Status order for sorting (newer statuses first)
const statusOrder: Record<OrderStatus, number> = {
  ready: 7,
  preparing: 6,
  confirmed: 5,
  pending: 4,
  served: 3,
  completed: 2,
  cancelled: 1,
};

function sortOrders(orders: Order[]): Order[] {
  return [...orders].sort((a, b) => {
    const statusDiff = statusOrder[b.status] - statusOrder[a.status];
    if (statusDiff !== 0) return statusDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const useOrdersStore = create<OrdersState>((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  setOrders: (orders) => set({ orders: sortOrders(orders), error: null }),

  addOrder: (order) =>
    set((state) => ({
      orders: sortOrders([...state.orders.filter((o) => o.id !== order.id), order]),
    })),

  updateOrder: (id, updates) =>
    set((state) => ({
      orders: sortOrders(state.orders.map((o) => (o.id === id ? { ...o, ...updates } : o))),
    })),

  updateOrderItem: (orderId, itemId, updates) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              items: o.items.map((item) => (item.id === itemId ? { ...item, ...updates } : item)),
            }
          : o
      ),
    })),

  removeOrder: (id) =>
    set((state) => ({
      orders: state.orders.filter((o) => o.id !== id),
    })),

  clearOrders: () => set({ orders: [] }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));

// Selectors
export const selectActiveOrders = (state: OrdersState) =>
  state.orders.filter((o) => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status));

export const selectOrdersByTable = (tableId: string) => (state: OrdersState) =>
  state.orders.filter((o) => o.tableId === tableId);

export const selectReadyOrders = (state: OrdersState) =>
  state.orders.filter((o) => o.status === 'ready');

export const selectActiveOrdersCount = (state: OrdersState) =>
  state.orders.filter((o) => ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status))
    .length;
