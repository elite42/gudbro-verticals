'use client';

/**
 * useOrderETA Hook
 *
 * Hook per ottenere e aggiornare l'ETA di un ordine via polling.
 * Usa l'API /api/orders/[orderId]/eta per il tempo stimato.
 */

import { useState, useEffect, useCallback } from 'react';
import { OrderETA, getOrderETA } from '@/lib/order-service';

interface UseOrderETAOptions {
  /** Polling interval in ms (default: 30 seconds) */
  pollingInterval?: number;
  /** Enable polling (default: true) */
  enabled?: boolean;
}

interface UseOrderETAReturn {
  /** ETA data */
  eta: OrderETA | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: string | null;
  /** Manually refresh ETA */
  refresh: () => Promise<void>;
  /** Formatted time string (e.g., "5-10 min") */
  formattedTime: string;
  /** Confidence badge color */
  confidenceColor: string;
}

const CONFIDENCE_COLORS = {
  high: 'var(--status-success)',
  medium: 'var(--status-warning)',
  low: 'var(--text-tertiary)',
};

/**
 * Format ETA range as string
 */
function formatETARange(eta: OrderETA | null): string {
  if (!eta) return '--';

  if (eta.etaMinutes <= 0) {
    return 'Ready now';
  }

  if (eta.etaRange.min === eta.etaRange.max) {
    return `${eta.etaMinutes} min`;
  }

  return `${eta.etaRange.min}-${eta.etaRange.max} min`;
}

export function useOrderETA(
  orderId: string | null,
  options: UseOrderETAOptions = {}
): UseOrderETAReturn {
  const { pollingInterval = 30000, enabled = true } = options;

  const [eta, setETA] = useState<OrderETA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchETA = useCallback(async () => {
    if (!orderId) {
      setIsLoading(false);
      return;
    }

    try {
      const etaData = await getOrderETA(orderId);
      setETA(etaData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch ETA');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  // Initial fetch
  useEffect(() => {
    if (!orderId || !enabled) {
      setETA(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchETA();
  }, [orderId, enabled, fetchETA]);

  // Polling
  useEffect(() => {
    if (!orderId || !enabled) return;

    const intervalId = setInterval(fetchETA, pollingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [orderId, enabled, pollingInterval, fetchETA]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await fetchETA();
  }, [fetchETA]);

  const formattedTime = formatETARange(eta);
  const confidenceColor = eta
    ? CONFIDENCE_COLORS[eta.confidence]
    : CONFIDENCE_COLORS.low;

  return {
    eta,
    isLoading,
    error,
    refresh,
    formattedTime,
    confidenceColor,
  };
}

export default useOrderETA;
