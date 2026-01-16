/**
 * useMapData Hook
 *
 * Fetches and transforms map data based on filters.
 */

import { useState, useEffect, useCallback } from 'react';
import type { FilterState } from '../MapFilters';
import type { MapData } from '../types';

// Re-export types for backwards compatibility
export type {
  EntityType,
  BaseEntity,
  CustomerEntity,
  CompetitorEntity,
  PartnerEntity,
  MapEntity,
  MapStats,
  MapData,
} from '../types';

export { calculateCustomerStatus } from '../types';

interface UseMapDataOptions {
  centerLat?: number;
  centerLng?: number;
}

export function useMapData(merchantId: string, filters: FilterState, options?: UseMapDataOptions) {
  const [data, setData] = useState<MapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        merchant_id: merchantId,
        radius_km: filters.radiusKm.toString(),
      });

      // Add center if provided
      if (options?.centerLat && options?.centerLng) {
        params.set('center_lat', options.centerLat.toString());
        params.set('center_lng', options.centerLng.toString());
      }

      // Add entity filters
      const entities = Object.entries(filters.entities)
        .filter(([, enabled]) => enabled)
        .map(([key]) => key);
      params.set('entities', entities.join(','));

      // Add date range
      if (filters.dateRange.from) {
        params.set('date_from', filters.dateRange.from);
      }
      if (filters.dateRange.to) {
        params.set('date_to', filters.dateRange.to);
      }
      if (filters.dateRange.preset) {
        params.set('date_preset', filters.dateRange.preset);
      }

      // Add customer status filters
      const statuses = Object.entries(filters.customerStatus)
        .filter(([, enabled]) => enabled)
        .map(([key]) => key);
      params.set('customer_status', statuses.join(','));

      const response = await fetch(`/api/intelligence/map?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch map data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [merchantId, filters, options?.centerLat, options?.centerLng]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
