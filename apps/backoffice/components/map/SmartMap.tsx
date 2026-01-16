'use client';

/**
 * SmartMap Component
 *
 * Interactive map for business intelligence:
 * - Customers (from delivery addresses)
 * - Competitors
 * - Partners (accommodations, offices, tour operators)
 * - Leads (potential partners)
 *
 * Dynamic import wrapper for SSR compatibility.
 */

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { MapFilters, type FilterState } from './MapFilters';
import { MapStatsPanel } from './MapStatsPanel';
import { MapLegend } from './MapLegend';
import type { MapData, MapEntity } from './hooks/useMapData';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('./MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="text-sm text-gray-500">Loading map...</span>
      </div>
    </div>
  ),
});

export interface SmartMapProps {
  merchantId: string;
  centerLat?: number;
  centerLng?: number;
  centerName?: string;
  initialFilters?: Partial<FilterState>;
  onEntityClick?: (entity: MapEntity) => void;
  className?: string;
}

export function SmartMap({
  merchantId,
  centerLat,
  centerLng,
  centerName,
  initialFilters,
  onEntityClick,
  className = '',
}: SmartMapProps) {
  const [filters, setFilters] = useState<FilterState>({
    entities: {
      customers: true,
      competitors: true,
      partners: true,
      leads: false,
    },
    dateRange: {
      from: null,
      to: null,
      preset: '30d',
    },
    customerStatus: {
      active: true,
      atRisk: true,
      churned: false,
    },
    radiusKm: 5,
    ...initialFilters,
  });

  const [selectedEntity, setSelectedEntity] = useState<MapEntity | null>(null);
  const [mapData, setMapData] = useState<MapData | null>(null);

  const handleEntityClick = (entity: MapEntity) => {
    setSelectedEntity(entity);
    onEntityClick?.(entity);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setSelectedEntity(null); // Clear selection when filters change
  };

  const handleDataUpdate = (data: MapData) => {
    setMapData(data);
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Filters */}
      <MapFilters filters={filters} onChange={handleFilterChange} />

      {/* Map + Stats layout */}
      <div className="flex gap-4">
        {/* Map container */}
        <div className="relative flex-1">
          <MapContainer
            merchantId={merchantId}
            centerLat={centerLat}
            centerLng={centerLng}
            centerName={centerName}
            filters={filters}
            selectedEntity={selectedEntity}
            onEntityClick={handleEntityClick}
            onDataUpdate={handleDataUpdate}
          />

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 z-[1000]">
            <MapLegend filters={filters} />
          </div>
        </div>

        {/* Stats panel */}
        <div className="w-80 shrink-0">
          <MapStatsPanel
            data={mapData}
            filters={filters}
            selectedEntity={selectedEntity}
            onEntityClick={handleEntityClick}
          />
        </div>
      </div>
    </div>
  );
}

export default SmartMap;
