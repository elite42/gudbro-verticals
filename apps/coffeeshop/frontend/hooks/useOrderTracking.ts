'use client';

/**
 * useOrderTracking Hook
 *
 * Hook per tracciare lo stato di un ordine in real-time usando Supabase Realtime.
 * Se Supabase non è configurato, usa polling come fallback.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  OrderStatus,
  subscribeToOrderStatus,
  getOrderStatus,
} from '@/lib/order-service';

interface UseOrderTrackingOptions {
  /** Polling interval in ms (used as fallback if realtime not available) */
  pollingInterval?: number;
  /** Enable polling as fallback */
  enablePolling?: boolean;
}

interface UseOrderTrackingReturn {
  /** Current order status */
  status: OrderStatus | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
  /** Manually refresh status */
  refresh: () => Promise<void>;
  /** Check if order is in active state (not delivered/cancelled) */
  isActive: boolean;
  /** Get progress percentage (0-100) */
  progress: number;
  /** Get status label for display */
  statusLabel: string;
}

const STATUS_ORDER: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'delivered',
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Order Placed',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready for Pickup',
  delivered: 'Completed',
  cancelled: 'Cancelled',
};

/**
 * Calculate progress percentage based on status
 */
function getProgressFromStatus(status: OrderStatus | null): number {
  if (!status || status === 'cancelled') return 0;
  const index = STATUS_ORDER.indexOf(status);
  if (index === -1) return 0;
  return Math.round(((index + 1) / STATUS_ORDER.length) * 100);
}

export function useOrderTracking(
  orderId: string | null,
  options: UseOrderTrackingOptions = {}
): UseOrderTrackingReturn {
  const { pollingInterval = 30000, enablePolling = true } = options;

  const [status, setStatus] = useState<OrderStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial status
  const fetchStatus = useCallback(async () => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    try {
      const currentStatus = await getOrderStatus(orderId);
      if (currentStatus) {
        setStatus(currentStatus);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch order status');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  // Initial fetch and subscribe to realtime updates
  useEffect(() => {
    if (!orderId) {
      setStatus(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchStatus();

    // Subscribe to realtime updates
    const unsubscribe = subscribeToOrderStatus(orderId, (newStatus) => {
      setStatus(newStatus);
      setError(null);
    });

    return () => {
      unsubscribe();
    };
  }, [orderId, fetchStatus]);

  // Polling fallback
  useEffect(() => {
    if (!orderId || !enablePolling) return;

    // Only poll if order is still active
    const isActiveStatus =
      status && !['delivered', 'cancelled'].includes(status);
    if (!isActiveStatus) return;

    const intervalId = setInterval(fetchStatus, pollingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [orderId, enablePolling, pollingInterval, status, fetchStatus]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await fetchStatus();
  }, [fetchStatus]);

  const isActive =
    status !== null && !['delivered', 'cancelled'].includes(status);
  const progress = getProgressFromStatus(status);
  const statusLabel = status ? STATUS_LABELS[status] : 'Unknown';

  return {
    status,
    isLoading,
    error,
    refresh,
    isActive,
    progress,
    statusLabel,
  };
}

export default useOrderTracking;
