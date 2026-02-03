'use client';

import { useState, useEffect } from 'react';
import { cartStore, CartItem } from '@/lib/cart-store';
import { currencyPreferencesStore } from '@/lib/currency';
import { orderHistoryStore } from '@/lib/order-history-store';

/**
 * Hook for managing Sticky Cart Bar state and logic
 */
export function useStickyCartState() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [isClient, setIsClient] = useState(false);

  // Load cart data client-side only
  useEffect(() => {
    setIsClient(true);
    updateCartData();
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      updateCartData();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', handleCartUpdate);
      return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }
  }, []);

  // Listen for currency preferences changes
  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  // Reload cart when page becomes visible (fixes back button cache issue)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateCartData();
      }
    };

    const handleFocus = () => {
      updateCartData();
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('focus', handleFocus);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        window.removeEventListener('focus', handleFocus);
      };
    }
  }, []);

  const updateCartData = () => {
    const cart = cartStore.get();
    setCartItems(cart.items);
    setCartCount(cartStore.count());
    setCartTotal(cartStore.getTotal());
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    cartStore.updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    cartStore.remove(itemId);
    // If cart becomes empty after removal, close expanded view
    if (cartStore.count() === 0) {
      setIsExpanded(false);
    }
  };

  const handlePlaceOrder = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);

    try {
      // Get complete order data with table context
      const orderData = cartStore.getOrderData();

      // Send order to backend
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            dish: {
              id: item.dish.id,
              slug: item.dish.id, // Use id as slug fallback
              name: item.dish.name,
              price: item.dish.price,
              image: item.dish.image,
            },
            quantity: item.quantity,
            extras: item.extras,
          })),
          tableNumber: orderData.table_context?.table_number,
          customerName: orderData.table_context?.customer_name,
          total: cartTotal,
          currency: 'VND',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit order');
      }

      // Save order to local history with backend order code
      const savedOrder = orderHistoryStore.addOrder(orderData);

      // Clear cart MULTIPLE times to ensure it's cleared
      cartStore.clear();

      // Force clear localStorage directly as backup
      if (typeof window !== 'undefined') {
        localStorage.removeItem('roots-cart');
      }

      // Verify cart is empty
      const verifyCart = cartStore.get();

      // Force state update to empty
      setCartItems([]);
      setCartCount(0);
      setCartTotal(0);

      // Force update from store (should be empty now)
      updateCartData();

      // Close modals
      setShowConfirmModal(false);
      setIsExpanded(false);

      // Show success toast
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit order:', error);
      // TODO: Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate item total (dish + extras)
  const calculateItemTotal = (item: CartItem) => {
    const dishPrice = item.dish.price;
    const extrasPrice = item.extras.reduce((sum, extra) => sum + extra.price, 0);
    return (dishPrice + extrasPrice) * item.quantity;
  };

  return {
    // State
    isExpanded,
    setIsExpanded,
    showConfirmModal,
    setShowConfirmModal,
    showSuccessToast,
    isSubmitting,
    cartItems,
    cartCount,
    cartTotal,
    currencyPrefs,
    isClient,

    // Methods
    handleUpdateQuantity,
    handleRemoveItem,
    handlePlaceOrder,
    handleConfirmOrder,
    calculateItemTotal,
    updateCartData,
  };
}
