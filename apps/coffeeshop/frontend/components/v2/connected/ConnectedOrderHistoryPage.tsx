'use client';

/**
 * ConnectedOrderHistoryPage
 *
 * OrderHistoryPage v2 connesso ai servizi v1:
 * - order-history-store per gli ordini
 * - cart-store per riordinare
 */

import { useState, useEffect, useCallback } from 'react';
import { OrderHistoryPage } from '../OrderHistoryPage';
import { orderHistoryStore, Order as StoreOrder } from '@/lib/order-history-store';
import { cartStore } from '@/lib/cart-store';

// Local type that matches OrderHistoryPage expectations
interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  submittedAt: number;
  table_context?: {
    table_number: string | null;
    customer_name: string | null;
    consumption_type: 'dine-in' | 'takeaway';
  };
}

interface ConnectedOrderHistoryPageProps {
  /** Current theme */
  isDark: boolean;
  /** Theme toggle handler */
  onThemeToggle: () => void;
  /** Price formatter */
  formatPrice?: (price: number) => string;
  /** Navigation handler */
  onNavigate?: (pageId: string) => void;
  /** Active page */
  activePage?: string;
}

// Convert store order to component order format
function convertOrder(storeOrder: StoreOrder): Order {
  return {
    id: storeOrder.id,
    items: storeOrder.items.map((item) => ({
      id: item.id,
      productId: item.dish.id,
      name: item.dish.name,
      price: item.dish.price,
      quantity: item.quantity,
      image: item.dish.image,
    })),
    total: storeOrder.total,
    status: storeOrder.status,
    submittedAt: storeOrder.submittedAt,
    table_context: storeOrder.table_context,
  };
}

export function ConnectedOrderHistoryPage({
  isDark,
  onThemeToggle,
  formatPrice,
  onNavigate,
  activePage = 'orders',
}: ConnectedOrderHistoryPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Load orders and cart count
  useEffect(() => {
    const loadData = () => {
      const allOrders = orderHistoryStore.getAll();
      setOrders(allOrders.map(convertOrder));

      const cart = cartStore.get();
      setCartCount(cart.items.reduce((sum, item) => sum + item.quantity, 0));
    };

    loadData();

    // Listen for updates
    const handleOrderUpdate = () => {
      const allOrders = orderHistoryStore.getAll();
      setOrders(allOrders.map(convertOrder));
    };

    const handleCartUpdate = () => {
      const cart = cartStore.get();
      setCartCount(cart.items.reduce((sum, item) => sum + item.quantity, 0));
    };

    window.addEventListener('order-history-updated', handleOrderUpdate);
    window.addEventListener('cart-updated', handleCartUpdate);

    return () => {
      window.removeEventListener('order-history-updated', handleOrderUpdate);
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

  // Handle reorder
  const handleReorder = useCallback(
    (order: Order) => {
      // Add all items from the order to cart
      order.items.forEach((item) => {
        cartStore.add(
          {
            id: item.productId,
            name: item.name,
            price: item.price,
            image: item.image || '',
          } as any,
          item.quantity,
          []
        );
      });

      // Navigate to cart
      onNavigate?.('cart');
    },
    [onNavigate]
  );

  return (
    <OrderHistoryPage
      orders={orders}
      onThemeToggle={onThemeToggle}
      isDark={isDark}
      cartCount={cartCount}
      formatPrice={formatPrice}
      activePage={activePage}
      onNavigate={onNavigate}
      onReorder={handleReorder}
    />
  );
}

export default ConnectedOrderHistoryPage;
