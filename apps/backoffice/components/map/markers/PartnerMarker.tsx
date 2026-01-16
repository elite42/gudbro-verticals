'use client';

/**
 * PartnerMarker Component
 *
 * Map marker for partner and lead entities with popup.
 */

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Handshake, Building, MapPin, Phone, Mail, Ticket, Target } from 'lucide-react';
import type { PartnerEntity } from '../hooks/useMapData';

interface PartnerMarkerProps {
  partner: PartnerEntity;
  icon: L.Icon | L.DivIcon;
  isSelected: boolean;
  onClick: () => void;
}

const PARTNER_TYPE_LABELS: Record<string, string> = {
  accommodation: 'Hotel / B&B',
  office: 'Office / Corporate',
  tour_operator: 'Tour Operator',
  other: 'Partner',
};

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-gray-100 text-gray-700',
  lead: 'bg-blue-100 text-blue-700',
};

export function PartnerMarker({ partner, icon, isSelected, onClick }: PartnerMarkerProps) {
  const isLead = partner.type === 'lead' || partner.status === 'lead';
  const IconComponent = isLead ? Target : Handshake;
  const iconBgColor = isLead ? 'bg-gray-100' : 'bg-blue-100';
  const iconColor = isLead ? 'text-gray-600' : 'text-blue-600';

  return (
    <Marker
      position={[partner.lat, partner.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup maxWidth={280} minWidth={200}>
        <div className="p-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${iconBgColor}`}
              >
                <IconComponent className={`h-4 w-4 ${iconColor}`} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{partner.name}</h3>
                <p className="text-xs text-gray-500">
                  {PARTNER_TYPE_LABELS[partner.partner_type] || partner.partner_type}
                </p>
              </div>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[partner.status]}`}
            >
              {partner.status}
            </span>
          </div>

          {/* Contact info */}
          {(partner.contact_name || partner.contact_email || partner.contact_phone) && (
            <div className="mt-3 space-y-1 text-xs">
              {partner.contact_name && (
                <div className="font-medium text-gray-700">{partner.contact_name}</div>
              )}
              {partner.contact_phone && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="h-3 w-3" />
                  {partner.contact_phone}
                </div>
              )}
              {partner.contact_email && (
                <div className="flex items-center gap-1 text-gray-600">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{partner.contact_email}</span>
                </div>
              )}
            </div>
          )}

          {/* Voucher stats (for active partners) */}
          {partner.status === 'active' && (partner.vouchers_issued || partner.vouchers_used) && (
            <div className="mt-3 flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <Ticket className="h-3 w-3" />
                <span>{partner.vouchers_issued || 0} issued</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <Ticket className="h-3 w-3" />
                <span>{partner.vouchers_used || 0} used</span>
              </div>
            </div>
          )}

          {/* Distance */}
          {partner.distance_m && (
            <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{(partner.distance_m / 1000).toFixed(1)} km away</span>
            </div>
          )}

          {/* Action hint */}
          <div className="mt-3 border-t border-gray-100 pt-2 text-center">
            <span className="text-xs text-gray-400">
              {isLead ? 'Click to convert to partner' : 'Click for quick actions'}
            </span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
