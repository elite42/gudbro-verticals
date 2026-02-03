'use client';

/**
 * MapStatsPanel Component
 *
 * Stats sidebar showing aggregate data within the selected radius.
 */

import { formatPriceFromMinor } from '@gudbro/utils';
import {
  Users,
  BuildingOffice,
  Handshake,
  TrendUp,
  Warning,
  Crosshair,
  CurrencyEur,
  ArrowRight,
} from '@phosphor-icons/react';
import type { MapData, MapEntity, CustomerEntity } from './hooks/useMapData';
import type { FilterState } from './MapFilters';

interface MapStatsPanelProps {
  data: MapData | null;
  filters: FilterState;
  selectedEntity: MapEntity | null;
  onEntityClick: (entity: MapEntity) => void;
}

/**
 * Format distance consistently:
 * - < 1000m → "400 m"
 * - >= 1000m → "1.5 km"
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

export function MapStatsPanel({
  data,
  filters,
  selectedEntity,
  onEntityClick,
}: MapStatsPanelProps) {
  if (!data) {
    return (
      <div className="h-full rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex h-full items-center justify-center text-gray-400">
          Loading stats...
        </div>
      </div>
    );
  }

  const { stats, entities } = data;

  // Format currency (cents -> display)
  const formatCurrency = (cents: number) => formatPriceFromMinor(cents, 'EUR');

  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900">Within {filters.radiusKm} km</h3>
        <p className="text-sm text-gray-500">Business intelligence summary</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {/* Customers */}
        {filters.entities.customers && (
          <>
            <div className="rounded-lg bg-green-50 p-3">
              <div className="flex items-center gap-2 text-green-600">
                <Users className="h-4 w-4" />
                <span className="text-xs font-medium">Customers</span>
              </div>
              <p className="mt-1 text-2xl font-bold text-green-700">{stats.totalCustomers}</p>
              <div className="mt-1 text-xs text-green-600">
                <span className="font-medium">{stats.activeCustomers}</span> active
              </div>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3">
              <div className="flex items-center gap-2 text-yellow-600">
                <Warning className="h-4 w-4" />
                <span className="text-xs font-medium">At Risk</span>
              </div>
              <p className="mt-1 text-2xl font-bold text-yellow-700">{stats.atRiskCustomers}</p>
              <div className="mt-1 text-xs text-yellow-600">Need attention</div>
            </div>
          </>
        )}

        {/* Revenue */}
        {filters.entities.customers && (
          <div className="col-span-2 rounded-lg bg-gray-50 p-3">
            <div className="flex items-center gap-2 text-gray-600">
              <CurrencyEur className="h-4 w-4" />
              <span className="text-xs font-medium">Revenue in Radius</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {formatCurrency(stats.revenueInRadius)}
            </p>
            {stats.avgOrderValue > 0 && (
              <div className="mt-1 text-xs text-gray-500">
                Avg order: {formatCurrency(stats.avgOrderValue)}
              </div>
            )}
          </div>
        )}

        {/* Competitors */}
        {filters.entities.competitors && (
          <div className="rounded-lg bg-red-50 p-3">
            <div className="flex items-center gap-2 text-red-600">
              <BuildingOffice className="h-4 w-4" />
              <span className="text-xs font-medium">Competitors</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-red-700">{stats.totalCompetitors}</p>
          </div>
        )}

        {/* Partners */}
        {filters.entities.partners && (
          <div className="rounded-lg bg-blue-50 p-3">
            <div className="flex items-center gap-2 text-blue-600">
              <Handshake className="h-4 w-4" />
              <span className="text-xs font-medium">Partners</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-blue-700">{stats.totalPartners}</p>
          </div>
        )}

        {/* Leads */}
        {filters.entities.leads && (
          <div className="rounded-lg bg-gray-100 p-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Crosshair className="h-4 w-4" />
              <span className="text-xs font-medium">Leads</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-gray-700">{stats.totalLeads}</p>
          </div>
        )}
      </div>

      {/* Selected entity details */}
      {selectedEntity && (
        <div className="border-t border-gray-200 p-4">
          <SelectedEntityCard entity={selectedEntity} />
        </div>
      )}

      {/* Recent/notable entities list */}
      <div className="flex-1 overflow-auto border-t border-gray-200 p-4">
        <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Notable Entities
        </h4>
        <div className="space-y-2">
          {/* Show at-risk customers */}
          {filters.entities.customers &&
            entities.customers
              .filter((c) => c.status === 'at_risk')
              .slice(0, 3)
              .map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => onEntityClick(customer)}
                  className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-yellow-600">At risk</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}

          {/* Show closest competitors */}
          {filters.entities.competitors &&
            entities.competitors.slice(0, 2).map((competitor) => (
              <button
                key={competitor.id}
                onClick={() => onEntityClick(competitor)}
                className="flex w-full items-center justify-between rounded-lg p-2 text-left hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{competitor.name}</p>
                  <p className="text-xs text-red-600">
                    {competitor.distance_m ? formatDistance(competitor.distance_m) : 'Competitor'}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

function SelectedEntityCard({ entity }: { entity: MapEntity }) {
  if (entity.type === 'customer') {
    const customer = entity as CustomerEntity;
    return (
      <div className="rounded-lg bg-green-50 p-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">{customer.name}</h4>
          <span className="rounded-full bg-green-200 px-2 py-0.5 text-xs font-medium text-green-800">
            {customer.tier}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-500">Points:</span>{' '}
            <span className="font-medium">{customer.points_balance}</span>
          </div>
          <div>
            <span className="text-gray-500">Wallet:</span>{' '}
            <span className="font-medium">{(customer.wallet_balance_cents / 100).toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">Orders:</span>{' '}
            <span className="font-medium">{customer.order_count}</span>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>{' '}
            <span
              className={`font-medium ${
                customer.status === 'active'
                  ? 'text-green-600'
                  : customer.status === 'at_risk'
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {customer.status}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default card for other entity types
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <h4 className="font-medium text-gray-900">{entity.name}</h4>
      <p className="text-xs text-gray-500">
        {entity.distance_m ? `${formatDistance(entity.distance_m)} away` : entity.type}
      </p>
    </div>
  );
}
