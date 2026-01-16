/**
 * Map Components Index
 *
 * Smart Interactive Map for Business Intelligence
 */

export { SmartMap } from './SmartMap';
export { MapFilters, type FilterState } from './MapFilters';
export { MapStatsPanel } from './MapStatsPanel';
export { MapLegend } from './MapLegend';

// Types (server-safe)
export type {
  EntityType,
  BaseEntity,
  CustomerEntity,
  CompetitorEntity,
  PartnerEntity,
  MapEntity,
  MapStats,
  MapData,
} from './types';
export { calculateCustomerStatus } from './types';

// Hooks (client-only)
export { useMapData } from './hooks/useMapData';

// Marker components (for advanced customization)
export { CustomerMarker } from './markers/CustomerMarker';
export { CompetitorMarker } from './markers/CompetitorMarker';
export { PartnerMarker } from './markers/PartnerMarker';
