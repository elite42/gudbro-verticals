'use client';

/**
 * MapFilters Component
 *
 * Filter controls for the map: entity types, date range, customer status, radius.
 */

import { useState } from 'react';
import { Users, Building2, Handshake, Target, Calendar, MapPin } from 'lucide-react';

export interface FilterState {
  entities: {
    customers: boolean;
    competitors: boolean;
    partners: boolean;
    leads: boolean;
  };
  dateRange: {
    from: string | null;
    to: string | null;
    preset: '7d' | '30d' | '90d' | '365d' | 'custom' | null;
  };
  customerStatus: {
    active: boolean;
    atRisk: boolean;
    churned: boolean;
  };
  radiusKm: number;
}

interface MapFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const ENTITY_CONFIG = [
  {
    key: 'customers' as const,
    label: 'Customers',
    icon: Users,
    color: 'bg-green-500',
  },
  {
    key: 'competitors' as const,
    label: 'Competitors',
    icon: Building2,
    color: 'bg-red-500',
  },
  {
    key: 'partners' as const,
    label: 'Partners',
    icon: Handshake,
    color: 'bg-blue-500',
  },
  {
    key: 'leads' as const,
    label: 'Leads',
    icon: Target,
    color: 'bg-gray-400',
  },
];

const STATUS_CONFIG = [
  { key: 'active' as const, label: 'Active', color: 'bg-green-500' },
  { key: 'atRisk' as const, label: 'At Risk', color: 'bg-yellow-500' },
  { key: 'churned' as const, label: 'Churned', color: 'bg-red-500' },
];

const DATE_PRESETS = [
  { key: '7d' as const, label: '7 days' },
  { key: '30d' as const, label: '30 days' },
  { key: '90d' as const, label: '90 days' },
  { key: '365d' as const, label: '1 year' },
];

const RADIUS_OPTIONS = [1, 2, 3, 5, 10, 15, 20, 25];

export function MapFilters({ filters, onChange }: MapFiltersProps) {
  const [showCustomDate, setShowCustomDate] = useState(filters.dateRange.preset === 'custom');

  const toggleEntity = (key: keyof FilterState['entities']) => {
    onChange({
      ...filters,
      entities: {
        ...filters.entities,
        [key]: !filters.entities[key],
      },
    });
  };

  const toggleStatus = (key: keyof FilterState['customerStatus']) => {
    onChange({
      ...filters,
      customerStatus: {
        ...filters.customerStatus,
        [key]: !filters.customerStatus[key],
      },
    });
  };

  const setDatePreset = (preset: '7d' | '30d' | '90d' | '365d') => {
    setShowCustomDate(false);
    onChange({
      ...filters,
      dateRange: {
        from: null,
        to: null,
        preset,
      },
    });
  };

  const setCustomDate = (from: string, to: string) => {
    onChange({
      ...filters,
      dateRange: {
        from,
        to,
        preset: 'custom',
      },
    });
  };

  const setRadius = (km: number) => {
    onChange({
      ...filters,
      radiusKm: km,
    });
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
      {/* Entity toggles */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
          Show on Map
        </label>
        <div className="flex flex-wrap gap-2">
          {ENTITY_CONFIG.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => toggleEntity(key)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                filters.entities[key]
                  ? `${color} text-white`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
          <Calendar className="mr-1 inline h-3 w-3" />
          Customer Activity Period
        </label>
        <div className="flex flex-wrap gap-2">
          {DATE_PRESETS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setDatePreset(key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filters.dateRange.preset === key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setShowCustomDate(!showCustomDate)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              filters.dateRange.preset === 'custom'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Custom
          </button>
        </div>

        {/* Custom date inputs */}
        {showCustomDate && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="date"
              value={filters.dateRange.from || ''}
              onChange={(e) => setCustomDate(e.target.value, filters.dateRange.to || '')}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={filters.dateRange.to || ''}
              onChange={(e) => setCustomDate(filters.dateRange.from || '', e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
            />
          </div>
        )}
      </div>

      {/* Customer status (only show if customers filter is on) */}
      {filters.entities.customers && (
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500">
            Customer Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_CONFIG.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggleStatus(key)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filters.customerStatus[key]
                    ? `${color} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${filters.customerStatus[key] ? 'bg-white' : color}`}
                />
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Radius slider */}
      <div>
        <label className="mb-2 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-gray-500">
          <span>
            <MapPin className="mr-1 inline h-3 w-3" />
            Radius
          </span>
          <span className="text-sm font-bold text-gray-900">{filters.radiusKm} km</span>
        </label>
        <input
          type="range"
          min={1}
          max={25}
          step={1}
          value={filters.radiusKm}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-gray-900"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>1 km</span>
          <span>25 km</span>
        </div>
      </div>
    </div>
  );
}
