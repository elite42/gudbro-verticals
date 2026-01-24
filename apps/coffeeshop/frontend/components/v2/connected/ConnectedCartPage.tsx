'use client';

/**
 * ConnectedCartPage
 *
 * Collega CartPage v2 ai servizi v1 (cart-store, order-service)
 * e applica la logica tier-aware.
 */

import { useState, useEffect, useCallback } from 'react';
import { CartPage } from '../CartPage';
import { cartStore, CartItem as StoreCartItem } from '@/lib/cart-store';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  extras?: { name: string; price: number }[];
  notes?: string;
}

interface ConnectedCartPageProps {
  /** Theme state */
  isDark: boolean;
  onThemeToggle: () => void;
  /** Navigation for demo mode */
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  /** Custom order placement handler */
  onPlaceOrder?: (notes: string) => Promise<{ success: boolean; orderCode?: string }>;
}

/**
 * Format price in VND
 */
function formatPrice(price: number): string {
  if (price >= 1000) {
    return `${Math.round(price / 1000)}K`;
  }
  return `${price}`;
}

/**
 * Convert store cart items to v2 cart items format
 */
function convertCartItems(storeItems: StoreCartItem[]): CartItem[] {
  return storeItems.map((item) => ({
    id: item.id,
    productId: item.dish.id,
    name: item.dish.name,
    price: item.dish.price,
    quantity: item.quantity,
    image: item.dish.image || '',
    extras: item.extras.map((e) => ({ name: e.name, price: e.price })),
  }));
}

/**
 * Generate order code
 */
function generateOrderCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function ConnectedCartPage({
  isDark,
  onThemeToggle,
  activePage,
  onNavigate,
  onPlaceOrder,
}: ConnectedCartPageProps) {
  // State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Sync cart items from store
  useEffect(() => {
    const updateCart = () => {
      const cart = cartStore.get();
      setCartItems(convertCartItems(cart.items));
    };
    updateCart();

    window.addEventListener('cart-updated', updateCart);
    return () => window.removeEventListener('cart-updated', updateCart);
  }, []);

  // Handlers
  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    cartStore.updateQuantity(itemId, newQuantity);
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    cartStore.remove(itemId);
  }, []);

  const handlePlaceOrder = useCallback(
    async (notes: string): Promise<{ success: boolean; orderCode?: string }> => {
      // If custom handler provided, use it
      if (onPlaceOrder) {
        return onPlaceOrder(notes);
      }

      // Default implementation - simulate order placement
      try {
        // In production, this would call the order API
        // const orderData = cartStore.getOrderData();
        // const response = await fetch('/api/orders', { method: 'POST', body: JSON.stringify({ ...orderData, notes }) });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Generate order code
        const orderCode = generateOrderCode();

        // Clear cart on success
        cartStore.clear();

        return { success: true, orderCode };
      } catch (error) {
        console.error('Failed to place order:', error);
        return { success: false };
      }
    },
    [onPlaceOrder]
  );

  return (
    <CartPage
      items={cartItems}
      onQuantityChange={handleQuantityChange}
      onRemoveItem={handleRemoveItem}
      onPlaceOrder={handlePlaceOrder}
      formatPrice={formatPrice}
      merchantName={coffeeshopConfig.business.name}
      merchantLogo={coffeeshopConfig.business.logo}
      onThemeToggle={onThemeToggle}
      isDark={isDark}
      activePage={activePage}
      onNavigate={onNavigate}
    />
  );
}

export default ConnectedCartPage;
