'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchOrdersAPI } from '@/lib/stay-api';
import type { ServiceOrder } from '@/types/stay';

const POLL_INTERVAL_MS = 30_000;

interface UseOrderPollingOptions {
  bookingCode: string;
  token: string;
  enabled: boolean;
}

interface UseOrderPollingReturn {
  orders: ServiceOrder[];
  isLoading: boolean;
  refetch: () => void;
}

/**
 * Polls for order status updates every 30 seconds.
 *
 * Auto-stops polling when no active orders remain (all delivered/cancelled).
 * Cleans up interval on unmount.
 */
export function useOrderPolling({
  bookingCode,
  token,
  enabled,
}: UseOrderPollingOptions): UseOrderPollingReturn {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!bookingCode || !token) return;

    setIsLoading(true);
    const { data, error } = await fetchOrdersAPI(bookingCode, token);
    setIsLoading(false);

    if (!error && data) {
      setOrders(data.orders || []);
    }
  }, [bookingCode, token]);

  // Check if there are active orders
  const hasActiveOrders = orders.some((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  // Initial fetch + polling
  useEffect(() => {
    if (!enabled || !bookingCode || !token) return;

    // Initial fetch
    fetchOrders();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, bookingCode, token, fetchOrders]);

  // Manage polling interval based on active orders
  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (hasActiveOrders || orders.length === 0) {
      // Start/maintain polling
      if (!intervalRef.current) {
        intervalRef.current = setInterval(fetchOrders, POLL_INTERVAL_MS);
      }
    } else {
      // No active orders -- stop polling
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, hasActiveOrders, orders.length, fetchOrders]);

  return { orders, isLoading, refetch: fetchOrders };
}
