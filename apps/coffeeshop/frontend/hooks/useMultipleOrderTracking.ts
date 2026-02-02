'use client';

/**
 * useMultipleOrderTracking Hook
 *
 * Hook per tracciare lo stato di più ordini in real-time.
 * Combina i dati di tracking e ETA per ogni ordine attivo.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  OrderStatus,
  OrderETA,
  subscribeToOrderStatus,
  getOrderStatus,
  getOrderETA,
} from '@/lib/order-service';

export interface OrderTrackingData {
  orderId: string;
  status: OrderStatus | null;
  progress: number;
  statusLabel: string;
  eta: OrderETA | null;
  formattedTime: string;
  confidenceColor: string;
  isLoading: boolean;
}

interface UseMultipleOrderTrackingOptions {
  /** Polling interval in ms */
  pollingInterval?: number;
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

const CONFIDENCE_COLORS = {
  high: 'var(--status-success)',
  medium: 'var(--status-warning)',
  low: 'var(--text-tertiary)',
};

function getProgressFromStatus(status: OrderStatus | null): number {
  if (!status || status === 'cancelled') return 0;
  const index = STATUS_ORDER.indexOf(status);
  if (index === -1) return 0;
  return Math.round(((index + 1) / STATUS_ORDER.length) * 100);
}

function formatETARange(eta: OrderETA | null): string {
  if (!eta) return '--';
  if (eta.etaMinutes <= 0) return 'Ready now';
  if (eta.etaRange.min === eta.etaRange.max) return `${eta.etaMinutes} min`;
  return `${eta.etaRange.min}-${eta.etaRange.max} min`;
}

export function useMultipleOrderTracking(
  orderIds: string[],
  options: UseMultipleOrderTrackingOptions = {}
): Map<string, OrderTrackingData> {
  const { pollingInterval = 30000 } = options;
  const [trackingData, setTrackingData] = useState<Map<string, OrderTrackingData>>(
    new Map()
  );

  // Initialize and update tracking for each order
  useEffect(() => {
    if (orderIds.length === 0) {
      setTrackingData(new Map());
      return;
    }

    // Initialize loading state for all orders
    const initialData = new Map<string, OrderTrackingData>();
    orderIds.forEach((orderId) => {
      initialData.set(orderId, {
        orderId,
        status: null,
        progress: 0,
        statusLabel: 'Loading...',
        eta: null,
        formattedTime: '--',
        confidenceColor: CONFIDENCE_COLORS.low,
        isLoading: true,
      });
    });
    setTrackingData(initialData);

    // Fetch initial status and ETA for each order
    const fetchData = async () => {
      const newData = new Map<string, OrderTrackingData>();

      await Promise.all(
        orderIds.map(async (orderId) => {
          try {
            const [status, eta] = await Promise.all([
              getOrderStatus(orderId),
              getOrderETA(orderId),
            ]);

            newData.set(orderId, {
              orderId,
              status,
              progress: getProgressFromStatus(status),
              statusLabel: status ? STATUS_LABELS[status] : 'Unknown',
              eta,
              formattedTime: formatETARange(eta),
              confidenceColor: eta
                ? CONFIDENCE_COLORS[eta.confidence]
                : CONFIDENCE_COLORS.low,
              isLoading: false,
            });
          } catch (error) {
            console.error(`Error fetching data for order ${orderId}:`, error);
            newData.set(orderId, {
              orderId,
              status: null,
              progress: 0,
              statusLabel: 'Error',
              eta: null,
              formattedTime: '--',
              confidenceColor: CONFIDENCE_COLORS.low,
              isLoading: false,
            });
          }
        })
      );

      setTrackingData(newData);
    };

    fetchData();

    // Set up realtime subscriptions
    const unsubscribes = orderIds.map((orderId) =>
      subscribeToOrderStatus(orderId, (newStatus) => {
        setTrackingData((prev) => {
          const updated = new Map(prev);
          const current = updated.get(orderId);
          if (current) {
            updated.set(orderId, {
              ...current,
              status: newStatus,
              progress: getProgressFromStatus(newStatus),
              statusLabel: STATUS_LABELS[newStatus],
            });
          }
          return updated;
        });
      })
    );

    // Polling for ETA updates
    const intervalId = setInterval(async () => {
      const activeOrderIds = orderIds.filter((id) => {
        const data = trackingData.get(id);
        return data && !['delivered', 'cancelled'].includes(data.status || '');
      });

      if (activeOrderIds.length === 0) return;

      await Promise.all(
        activeOrderIds.map(async (orderId) => {
          const eta = await getOrderETA(orderId);
          setTrackingData((prev) => {
            const updated = new Map(prev);
            const current = updated.get(orderId);
            if (current) {
              updated.set(orderId, {
                ...current,
                eta,
                formattedTime: formatETARange(eta),
                confidenceColor: eta
                  ? CONFIDENCE_COLORS[eta.confidence]
                  : CONFIDENCE_COLORS.low,
              });
            }
            return updated;
          });
        })
      );
    }, pollingInterval);

    return () => {
      unsubscribes.forEach((unsub) => unsub());
      clearInterval(intervalId);
    };
  }, [orderIds.join(','), pollingInterval]);

  return trackingData;
}

export default useMultipleOrderTracking;
