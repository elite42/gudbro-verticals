'use client';

/**
 * Orders Page
 *
 * Shows list of orders for assigned tables with real-time updates.
 */

import { useEffect, useState } from 'react';
import { MagnifyingGlass, ArrowClockwise, Funnel } from '@phosphor-icons/react';
import { OrderList } from '@/components/orders/OrderList';
import { useOrdersStore, selectActiveOrders, type Order } from '@/lib/stores/orders-store';
import { useAuth } from '@/components/providers/AuthProvider';

type FilterStatus = 'all' | 'ready' | 'preparing';

// Mock data for development
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '1234',
    locationId: 'loc-1',
    tableId: 'table-7',
    tableNumber: '7',
    status: 'ready',
    items: [
      { id: 'i1', productId: 'p1', productName: 'Margherita', quantity: 2, unitPrice: 8.5, totalPrice: 17, status: 'ready' },
      { id: 'i2', productId: 'p2', productName: 'Coca Cola', quantity: 2, unitPrice: 3, totalPrice: 6, status: 'ready' },
    ],
    subtotal: 23,
    tax: 2.3,
    total: 25.3,
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    orderNumber: '1235',
    locationId: 'loc-1',
    tableId: 'table-3',
    tableNumber: '3',
    status: 'preparing',
    items: [
      { id: 'i3', productId: 'p3', productName: 'Carbonara', quantity: 1, unitPrice: 12, totalPrice: 12, status: 'preparing' },
      { id: 'i4', productId: 'p4', productName: 'Bruschette', quantity: 1, unitPrice: 6, totalPrice: 6, status: 'ready' },
    ],
    subtotal: 18,
    tax: 1.8,
    total: 19.8,
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
    updatedAt: new Date().toISOString(),
    notes: 'No aglio nella carbonara',
  },
  {
    id: '3',
    orderNumber: '1236',
    locationId: 'loc-1',
    tableId: 'table-12',
    tableNumber: '12',
    status: 'confirmed',
    items: [
      { id: 'i5', productId: 'p5', productName: 'Tiramisù', quantity: 3, unitPrice: 5.5, totalPrice: 16.5, status: 'pending' },
    ],
    subtotal: 16.5,
    tax: 1.65,
    total: 18.15,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders, setOrders, updateOrder, isLoading, setLoading } = useOrdersStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load mock data on mount (replace with real API call)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, [setOrders, setLoading]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOrders(mockOrders);
    setIsRefreshing(false);
  };

  // Handle mark as served
  const handleMarkServed = async (orderId: string) => {
    updateOrder(orderId, { status: 'served', updatedAt: new Date().toISOString() });
  };

  // Handle order press
  const handlePress = (order: Order) => {
    // TODO: Navigate to order details
    console.log('Order pressed:', order);
  };

  // Filter orders
  const activeOrders = useOrdersStore(selectActiveOrders);
  const filteredOrders = activeOrders.filter((o) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!o.tableNumber.toLowerCase().includes(query) &&
          !o.orderNumber.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Status filter
    if (filterStatus === 'ready' && o.status !== 'ready') return false;
    if (filterStatus === 'preparing' && o.status !== 'preparing') return false;

    return true;
  });

  const readyCount = activeOrders.filter(o => o.status === 'ready').length;
  const preparingCount = activeOrders.filter(o => o.status === 'preparing').length;

  return (
    <div className="p-4 space-y-4">
      {/* Search and filter bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={20}
            weight="bold"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-tertiary"
          />
          <input
            type="search"
            placeholder="Cerca per tavolo o ordine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-theme-bg-primary border border-theme-border-medium text-theme-text-primary placeholder:text-theme-text-tertiary focus:border-theme-brand-primary focus:ring-2 focus:ring-theme-brand-secondary transition-colors"
          />
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-ghost p-3"
          aria-label="Aggiorna"
        >
          <ArrowClockwise
            size={20}
            weight="bold"
            className={isRefreshing ? 'animate-spin' : ''}
          />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterStatus === 'all'
              ? 'bg-theme-brand-primary text-white'
              : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
          }`}
        >
          Tutti
        </button>
        <button
          onClick={() => setFilterStatus('ready')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterStatus === 'ready'
              ? 'bg-green-500 text-white'
              : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
          }`}
        >
          Pronti {readyCount > 0 && `(${readyCount})`}
        </button>
        <button
          onClick={() => setFilterStatus('preparing')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filterStatus === 'preparing'
              ? 'bg-amber-500 text-white'
              : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
          }`}
        >
          In preparazione {preparingCount > 0 && `(${preparingCount})`}
        </button>
      </div>

      {/* Loading state */}
      {isLoading && !isRefreshing ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card overflow-hidden animate-pulse">
              <div className="h-12 bg-theme-bg-tertiary" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-theme-bg-tertiary rounded w-1/3" />
                <div className="h-4 bg-theme-bg-tertiary rounded w-2/3" />
                <div className="h-4 bg-theme-bg-tertiary rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <OrderList
          orders={filteredOrders}
          onPress={handlePress}
          onMarkServed={handleMarkServed}
          emptyMessage="Gli ordini dei tuoi tavoli appariranno qui"
        />
      )}
    </div>
  );
}
