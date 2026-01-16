'use client';

/**
 * MapContainer Component
 *
 * Leaflet map wrapper with marker rendering and clustering.
 */

import { useEffect, useRef } from 'react';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapData, type MapEntity, type MapData } from './hooks/useMapData';
import type { FilterState } from './MapFilters';
import { CustomerMarker } from './markers/CustomerMarker';
import { CompetitorMarker } from './markers/CompetitorMarker';
import { PartnerMarker } from './markers/PartnerMarker';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom marker icons
const MARKER_ICONS = {
  merchant: new L.Icon({
    iconUrl: '/markers/merchant.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  customer: new L.Icon({
    iconUrl: '/markers/customer.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  competitor: new L.Icon({
    iconUrl: '/markers/competitor.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  partner: new L.Icon({
    iconUrl: '/markers/partner.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
  lead: new L.Icon({
    iconUrl: '/markers/lead.svg',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  }),
};

// Fallback to colored circle markers if SVG not available
function createColoredIcon(color: string, size: number = 24): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

const COLOR_ICONS = {
  merchant: createColoredIcon('#1f2937', 32), // Dark gray
  customer: createColoredIcon('#22c55e', 24), // Green
  competitor: createColoredIcon('#ef4444', 24), // Red
  partner: createColoredIcon('#3b82f6', 24), // Blue
  lead: createColoredIcon('#9ca3af', 24), // Gray
};

interface MapContainerProps {
  merchantId: string;
  centerLat?: number;
  centerLng?: number;
  centerName?: string;
  filters: FilterState;
  selectedEntity: MapEntity | null;
  onEntityClick: (entity: MapEntity) => void;
  onDataUpdate: (data: MapData) => void;
}

// Component to handle map bounds when data changes
function MapBoundsHandler({
  center,
  radiusKm,
}: {
  center: { lat: number; lng: number };
  radiusKm: number;
}) {
  const map = useMap();

  useEffect(() => {
    // Fit to radius circle
    const radiusMeters = radiusKm * 1000;
    const bounds = L.latLng(center.lat, center.lng).toBounds(radiusMeters * 2);
    map.fitBounds(bounds);
  }, [map, center.lat, center.lng, radiusKm]);

  return null;
}

export default function MapContainer({
  merchantId,
  centerLat,
  centerLng,
  centerName,
  filters,
  selectedEntity,
  onEntityClick,
  onDataUpdate,
}: MapContainerProps) {
  const { data, isLoading, error } = useMapData(merchantId, filters, {
    centerLat,
    centerLng,
  });
  const mapRef = useRef<L.Map | null>(null);

  // Update parent with data
  useEffect(() => {
    if (data) {
      onDataUpdate(data);
    }
  }, [data, onDataUpdate]);

  // Default center (Rome, Italy) if no center provided
  const center = {
    lat: centerLat ?? data?.center.lat ?? 41.9028,
    lng: centerLng ?? data?.center.lng ?? 12.4964,
  };

  if (error) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-lg border border-red-200 bg-red-50">
        <div className="text-center">
          <p className="font-medium text-red-700">Error loading map data</p>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <LeafletMapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: '600px', width: '100%' }}
      className="rounded-lg border border-gray-200"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Radius circle */}
      <Circle
        center={[center.lat, center.lng]}
        radius={filters.radiusKm * 1000}
        pathOptions={{
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.1,
          weight: 2,
          dashArray: '5, 5',
        }}
      />

      {/* Merchant center marker */}
      <Marker position={[center.lat, center.lng]} icon={COLOR_ICONS.merchant}>
        <Popup>
          <div className="text-center">
            <strong>{centerName || data?.center.name || 'Your Location'}</strong>
            <p className="text-xs text-gray-500">Center point</p>
          </div>
        </Popup>
      </Marker>

      {/* Clustered markers */}
      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        maxClusterRadius={50}
        spiderfyOnMaxZoom
        disableClusteringAtZoom={16}
      >
        {/* Customer markers */}
        {filters.entities.customers &&
          data?.entities.customers.map((customer) => (
            <CustomerMarker
              key={customer.id}
              customer={customer}
              icon={COLOR_ICONS.customer}
              isSelected={selectedEntity?.id === customer.id}
              onClick={() => onEntityClick(customer)}
            />
          ))}

        {/* Competitor markers */}
        {filters.entities.competitors &&
          data?.entities.competitors.map((competitor) => (
            <CompetitorMarker
              key={competitor.id}
              competitor={competitor}
              icon={COLOR_ICONS.competitor}
              isSelected={selectedEntity?.id === competitor.id}
              onClick={() => onEntityClick(competitor)}
            />
          ))}

        {/* Partner markers */}
        {filters.entities.partners &&
          data?.entities.partners.map((partner) => (
            <PartnerMarker
              key={partner.id}
              partner={partner}
              icon={COLOR_ICONS.partner}
              isSelected={selectedEntity?.id === partner.id}
              onClick={() => onEntityClick(partner)}
            />
          ))}

        {/* Lead markers */}
        {filters.entities.leads &&
          data?.entities.leads.map((lead) => (
            <PartnerMarker
              key={lead.id}
              partner={lead}
              icon={COLOR_ICONS.lead}
              isSelected={selectedEntity?.id === lead.id}
              onClick={() => onEntityClick(lead)}
            />
          ))}
      </MarkerClusterGroup>

      {/* Bounds handler */}
      <MapBoundsHandler center={center} radiusKm={filters.radiusKm} />
    </LeafletMapContainer>
  );
}
