'use client';

/**
 * Smart Interactive Map Page
 *
 * Business intelligence map showing customers, competitors, partners, leads.
 * Features: filtering, radius control, clustering, quick actions.
 */

import { useState, useEffect } from 'react';
import { Map, List, RefreshCw, Download, Mail } from 'lucide-react';
import { SmartMap } from '@/components/map';
import type { MapEntity } from '@/components/map/hooks/useMapData';
import { QuickActionPanel } from '@/components/map/panels/QuickActionPanel';

// Demo merchant ID - in production this comes from auth context
// ROOTS Cafe merchant ID for testing
const DEMO_MERCHANT_ID = '11111111-1111-1111-1111-111111111111';

export default function IntelligenceMapPage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedEntity, setSelectedEntity] = useState<MapEntity | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [merchantId, setMerchantId] = useState<string>(DEMO_MERCHANT_ID);

  const handleEntityClick = (entity: MapEntity) => {
    setSelectedEntity(entity);
    if (entity.type === 'customer') {
      setShowQuickActions(true);
    }
  };

  const handleCloseQuickActions = () => {
    setShowQuickActions(false);
    setSelectedEntity(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Intelligence Map</h1>
          <p className="mt-1 text-sm text-gray-500">
            Visualize customers, competitors, and partners in your area
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === 'map' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Map className="h-4 w-4" />
              Map
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>

          {/* Actions */}
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
            <Mail className="h-4 w-4" />
            Campaign
          </button>
        </div>
      </div>

      {/* Map View */}
      {viewMode === 'map' && <SmartMap merchantId={merchantId} onEntityClick={handleEntityClick} />}

      {/* List View (placeholder) */}
      {viewMode === 'list' && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <List className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">List View</h3>
          <p className="mt-1 text-sm text-gray-500">
            Table view with sorting and filtering coming soon
          </p>
        </div>
      )}

      {/* Quick Actions Panel (slide-over) */}
      {showQuickActions && selectedEntity?.type === 'customer' && (
        <QuickActionPanel
          entity={selectedEntity}
          merchantId={merchantId}
          onClose={handleCloseQuickActions}
        />
      )}
    </div>
  );
}
