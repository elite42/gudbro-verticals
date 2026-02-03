'use client';

/**
 * CompetitorMarker Component
 *
 * Map marker for competitor entities with popup.
 */

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { BuildingOffice, MapPin, Star, CurrencyDollar } from '@phosphor-icons/react';
import type { CompetitorEntity } from '../hooks/useMapData';
import { formatDistance } from '../MapStatsPanel';

interface CompetitorMarkerProps {
  competitor: CompetitorEntity;
  icon: L.Icon | L.DivIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function CompetitorMarker({ competitor, icon, isSelected, onClick }: CompetitorMarkerProps) {
  return (
    <Marker
      position={[competitor.lat, competitor.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup maxWidth={280} minWidth={200}>
        <div className="p-1">
          {/* Header */}
          <div className="flex items-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <BuildingOffice className="h-4 w-4 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{competitor.name}</h3>
              {competitor.cuisine_type && (
                <p className="text-xs text-gray-500">{competitor.cuisine_type}</p>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="mt-3 space-y-2 text-xs">
            {competitor.address && (
              <div className="flex items-start gap-1 text-gray-600">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                <span>{competitor.address}</span>
              </div>
            )}

            <div className="flex items-center gap-4">
              {competitor.price_range && (
                <div className="flex items-center gap-1 text-gray-600">
                  <CurrencyDollar className="h-3 w-3" />
                  <span>{competitor.price_range}</span>
                </div>
              )}

              {competitor.rating && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>
                    {competitor.rating.toFixed(1)}
                    {competitor.review_count && (
                      <span className="text-gray-400"> ({competitor.review_count})</span>
                    )}
                  </span>
                </div>
              )}
            </div>

            {competitor.distance_m && (
              <div className="text-gray-500">
                {formatDistance(competitor.distance_m)} from your location
              </div>
            )}
          </div>

          {/* Action hint */}
          <div className="mt-3 border-t border-gray-100 pt-2 text-center">
            <span className="text-xs text-gray-400">Click to view competitor profile</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
