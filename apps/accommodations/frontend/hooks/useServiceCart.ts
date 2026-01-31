'use client';

import { useState, useCallback, useMemo } from 'react';
import type { ServiceItemResponse, CartItem } from '@/types/stay';

export interface ServiceCartReturn {
  items: CartItem[];
  addItem: (item: ServiceItemResponse) => void;
  removeItem: (serviceItemId: string) => void;
  updateQuantity: (serviceItemId: string, quantity: number) => void;
  updateNotes: (serviceItemId: string, notes: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  getCartItem: (serviceItemId: string) => CartItem | undefined;
}

/**
 * Cart state management for service ordering.
 *
 * React state only (no localStorage) -- cart lives at page level
 * and survives tab navigation within the dashboard.
 */
export function useServiceCart(): ServiceCartReturn {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: ServiceItemResponse) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.serviceItemId === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.serviceItemId === item.id ? { ...ci, quantity: Math.min(ci.quantity + 1, 10) } : ci
        );
      }
      return [
        ...prev,
        {
          serviceItemId: item.id,
          name: item.name,
          unitPrice: item.price,
          currency: item.currency,
          quantity: 1,
          notes: '',
        },
      ];
    });
  }, []);

  const removeItem = useCallback((serviceItemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.serviceItemId !== serviceItemId));
  }, []);

  const updateQuantity = useCallback((serviceItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((ci) => ci.serviceItemId !== serviceItemId));
      return;
    }
    const clamped = Math.min(Math.max(quantity, 1), 10);
    setItems((prev) =>
      prev.map((ci) => (ci.serviceItemId === serviceItemId ? { ...ci, quantity: clamped } : ci))
    );
  }, []);

  const updateNotes = useCallback((serviceItemId: string, notes: string) => {
    setItems((prev) =>
      prev.map((ci) => (ci.serviceItemId === serviceItemId ? { ...ci, notes } : ci))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, ci) => sum + ci.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, ci) => sum + ci.unitPrice * ci.quantity, 0),
    [items]
  );

  const getCartItem = useCallback(
    (serviceItemId: string) => items.find((ci) => ci.serviceItemId === serviceItemId),
    [items]
  );

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateNotes,
    clearCart,
    itemCount,
    subtotal,
    getCartItem,
  };
}
