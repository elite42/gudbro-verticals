'use client';

/**
 * CustomerMarker Component
 *
 * Map marker for customer entities with popup.
 */

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { User, Phone, Mail, Star, Wallet, ShoppingBag, Clock } from 'lucide-react';
import type { CustomerEntity } from '../hooks/useMapData';

interface CustomerMarkerProps {
  customer: CustomerEntity;
  icon: L.Icon | L.DivIcon;
  isSelected: boolean;
  onClick: () => void;
}

export function CustomerMarker({ customer, icon, isSelected, onClick }: CustomerMarkerProps) {
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return 'Never';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    at_risk: 'bg-yellow-100 text-yellow-700',
    churned: 'bg-red-100 text-red-700',
  };

  return (
    <Marker
      position={[customer.lat, customer.lng]}
      icon={icon}
      eventHandlers={{
        click: onClick,
      }}
    >
      <Popup maxWidth={280} minWidth={220}>
        <div className="p-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{customer.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-medium text-gray-600">{customer.tier}</span>
                </div>
              </div>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[customer.status]}`}
            >
              {customer.status === 'at_risk' ? 'At Risk' : customer.status}
            </span>
          </div>

          {/* Contact */}
          <div className="mt-2 space-y-1 text-xs">
            {customer.phone && (
              <div className="flex items-center gap-1 text-gray-600">
                <Phone className="h-3 w-3" />
                {customer.phone}
              </div>
            )}
            {customer.email && (
              <div className="flex items-center gap-1 text-gray-600">
                <Mail className="h-3 w-3" />
                <span className="truncate">{customer.email}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1 text-gray-600">
              <Wallet className="h-3 w-3 text-green-500" />
              <span>{customer.points_balance.toLocaleString()} pts</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Wallet className="h-3 w-3 text-blue-500" />
              <span>{(customer.wallet_balance_cents / 100).toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <ShoppingBag className="h-3 w-3" />
              <span>{customer.order_count} orders</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="h-3 w-3" />
              <span>{formatDate(customer.last_order_at)}</span>
            </div>
          </div>

          {/* Profile completion */}
          {customer.profile_completion_pct < 100 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Profile</span>
                <span className="font-medium text-gray-700">
                  {customer.profile_completion_pct}%
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${customer.profile_completion_pct}%` }}
                />
              </div>
            </div>
          )}

          {/* Quick action hint */}
          <div className="mt-3 border-t border-gray-100 pt-2 text-center">
            <span className="text-xs text-gray-400">Click for quick actions</span>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
