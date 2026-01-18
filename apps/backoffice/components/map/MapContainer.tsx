'use client';

/**
 * MapContainer Component
 *
 * Leaflet map wrapper with modern marker rendering and clustering.
 * Features custom cluster icons with count badges.
 *
 * Cluster design based on: https://github.com/Leaflet/Leaflet.markercluster
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

// Modern colored circle marker icons
function createModernIcon(color: string, size: number = 24, pulse: boolean = false): L.DivIcon {
  const pulseAnimation = pulse
    ? `
    <div style="
      position: absolute;
      width: ${size + 8}px;
      height: ${size + 8}px;
      background-color: ${color};
      border-radius: 50%;
      opacity: 0.3;
      animation: pulse 2s ease-out infinite;
      top: -4px;
      left: -4px;
    "></div>
  `
    : '';

  return L.divIcon({
    className: 'modern-marker',
    html: `
      <div style="position: relative; width: ${size}px; height: ${size}px;">
        ${pulseAnimation}
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          background: linear-gradient(135deg, ${color} 0%, ${adjustColor(color, -20)} 100%);
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          transition: transform 0.2s ease;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

// Darken/lighten color helper
function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.slice(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.slice(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.slice(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Modern cluster icon creator
function createClusterIcon(cluster: { getChildCount: () => number }): L.DivIcon {
  const count = cluster.getChildCount();

  // Size based on count
  let size: number;
  let fontSize: number;
  let bgColor: string;

  if (count < 10) {
    size = 36;
    fontSize = 12;
    bgColor = '#10b981'; // emerald-500
  } else if (count < 50) {
    size = 42;
    fontSize = 13;
    bgColor = '#3b82f6'; // blue-500
  } else if (count < 100) {
    size = 48;
    fontSize = 14;
    bgColor = '#8b5cf6'; // violet-500
  } else {
    size = 54;
    fontSize = 15;
    bgColor = '#f59e0b'; // amber-500
  }

  // Format count (99+ for large numbers)
  const displayCount = count > 99 ? '99+' : count.toString();

  return L.divIcon({
    className: 'modern-cluster-marker',
    html: `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
      ">
        <!-- Outer ring -->
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: ${size}px;
          height: ${size}px;
          background: ${bgColor}20;
          border-radius: 50%;
          animation: clusterPulse 2s ease-in-out infinite;
        "></div>

        <!-- Inner circle -->
        <div style="
          position: absolute;
          top: 4px;
          left: 4px;
          width: ${size - 8}px;
          height: ${size - 8}px;
          background: linear-gradient(135deg, ${bgColor} 0%, ${adjustColor(bgColor, -30)} 100%);
          border-radius: 50%;
          box-shadow: 0 3px 12px ${bgColor}50;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <span style="
            color: white;
            font-size: ${fontSize}px;
            font-weight: 600;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          ">${displayCount}</span>
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

// Modern marker icons
const MODERN_ICONS = {
  merchant: createModernIcon('#1f2937', 32, true), // Dark with pulse
  customer: createModernIcon('#10b981', 22), // Emerald (default)
  competitor: createModernIcon('#ef4444', 22), // Red
  partner: createModernIcon('#3b82f6', 22), // Blue
  lead: createModernIcon('#6b7280', 20), // Gray
  // Customer status-specific icons
  customerActive: createModernIcon('#10b981', 22), // Green - active
  customerAtRisk: createModernIcon('#f59e0b', 22), // Amber - at risk
  customerChurned: createModernIcon('#ef4444', 20), // Red - churned (slightly smaller)
};

// Get customer icon based on status
function getCustomerIcon(status: 'active' | 'at_risk' | 'churned'): L.DivIcon {
  switch (status) {
    case 'active':
      return MODERN_ICONS.customerActive;
    case 'at_risk':
      return MODERN_ICONS.customerAtRisk;
    case 'churned':
      return MODERN_ICONS.customerChurned;
    default:
      return MODERN_ICONS.customer;
  }
}

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
    const radiusMeters = radiusKm * 1000;
    const bounds = L.latLng(center.lat, center.lng).toBounds(radiusMeters * 2);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, center.lat, center.lng, radiusKm]);

  return null;
}

// Inject CSS for animations
function MapStyles() {
  useEffect(() => {
    const styleId = 'map-modern-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.1; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        @keyframes clusterPulse {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .modern-marker:hover > div > div:last-child {
          transform: scale(1.15);
        }
        .modern-cluster-marker {
          cursor: pointer;
        }
        .modern-cluster-marker:hover > div > div:last-child {
          transform: scale(1.05);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }
        .leaflet-popup-tip {
          box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
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

  // Default center (Da Nang, Vietnam) if no center provided
  const center = {
    lat: centerLat ?? data?.center.lat ?? 16.0544,
    lng: centerLng ?? data?.center.lng ?? 108.2022,
  };

  if (error) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-2xl border border-red-200 bg-red-50">
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
      zoom={14}
      style={{ height: '600px', width: '100%' }}
      className="rounded-2xl border border-gray-200 shadow-sm"
      ref={mapRef}
    >
      <MapStyles />

      {/* Modern map tiles (CartoDB Positron - cleaner look) */}
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Radius circle - softer style */}
      <Circle
        center={[center.lat, center.lng]}
        radius={filters.radiusKm * 1000}
        pathOptions={{
          color: '#6366f1',
          fillColor: '#6366f1',
          fillOpacity: 0.05,
          weight: 1.5,
          dashArray: '8, 6',
        }}
      />

      {/* Merchant center marker */}
      <Marker position={[center.lat, center.lng]} icon={MODERN_ICONS.merchant}>
        <Popup>
          <div className="min-w-[140px] p-1 text-center">
            <p className="font-semibold text-gray-900">
              {centerName || data?.center.name || 'Your Location'}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">Business center</p>
          </div>
        </Popup>
      </Marker>

      {/* Clustered markers with custom cluster icons */}
      <MarkerClusterGroup
        chunkedLoading
        showCoverageOnHover={false}
        maxClusterRadius={60}
        spiderfyOnMaxZoom
        disableClusteringAtZoom={17}
        iconCreateFunction={createClusterIcon}
        animate={true}
        animateAddingMarkers={true}
      >
        {/* Customer markers - colored by status */}
        {filters.entities.customers &&
          data?.entities.customers.map((customer) => (
            <CustomerMarker
              key={customer.id}
              customer={customer}
              icon={getCustomerIcon(customer.status)}
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
              icon={MODERN_ICONS.competitor}
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
              icon={MODERN_ICONS.partner}
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
              icon={MODERN_ICONS.lead}
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
