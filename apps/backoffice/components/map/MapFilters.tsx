'use client';

/**
 * MapFilters Component - Modern Compact Design
 *
 * Single-row filter bar with:
 * - Entity type chips (compact toggle pills)
 * - Date preset dropdown
 * - Customer status chips (when customers enabled)
 * - Radius dropdown
 *
 * Based on modern UI patterns: https://mapuipatterns.com/
 */

import { useState, useRef, useEffect } from 'react';
import {
  Users,
  Building2,
  Handshake,
  Target,
  Calendar,
  MapPin,
  ChevronDown,
  X,
} from 'lucide-react';

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
    activeColor: 'bg-emerald-500 text-white border-emerald-500',
    dotColor: 'bg-emerald-500',
  },
  {
    key: 'competitors' as const,
    label: 'Competitors',
    icon: Building2,
    activeColor: 'bg-rose-500 text-white border-rose-500',
    dotColor: 'bg-rose-500',
  },
  {
    key: 'partners' as const,
    label: 'Partners',
    icon: Handshake,
    activeColor: 'bg-blue-500 text-white border-blue-500',
    dotColor: 'bg-blue-500',
  },
  {
    key: 'leads' as const,
    label: 'Leads',
    icon: Target,
    activeColor: 'bg-slate-500 text-white border-slate-500',
    dotColor: 'bg-slate-400',
  },
];

const STATUS_CONFIG = [
  { key: 'active' as const, label: 'Active', dotColor: 'bg-emerald-500' },
  { key: 'atRisk' as const, label: 'At Risk', dotColor: 'bg-amber-500' },
  { key: 'churned' as const, label: 'Churned', dotColor: 'bg-rose-500' },
];

const DATE_PRESETS = [
  { key: '7d' as const, label: '7d', fullLabel: 'Last 7 days' },
  { key: '30d' as const, label: '30d', fullLabel: 'Last 30 days' },
  { key: '90d' as const, label: '90d', fullLabel: 'Last 90 days' },
  { key: '365d' as const, label: '1y', fullLabel: 'Last year' },
];

const RADIUS_OPTIONS = [1, 2, 3, 5, 10, 15, 20, 25];

export function MapFilters({ filters, onChange }: MapFiltersProps) {
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showRadiusDropdown, setShowRadiusDropdown] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);
  const radiusRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false);
      }
      if (radiusRef.current && !radiusRef.current.contains(e.target as Node)) {
        setShowRadiusDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleEntity = (key: keyof FilterState['entities']) => {
    onChange({
      ...filters,
      entities: { ...filters.entities, [key]: !filters.entities[key] },
    });
  };

  const toggleStatus = (key: keyof FilterState['customerStatus']) => {
    onChange({
      ...filters,
      customerStatus: { ...filters.customerStatus, [key]: !filters.customerStatus[key] },
    });
  };

  const setDatePreset = (preset: '7d' | '30d' | '90d' | '365d') => {
    onChange({
      ...filters,
      dateRange: { from: null, to: null, preset },
    });
    setShowDateDropdown(false);
  };

  const setRadius = (km: number) => {
    onChange({ ...filters, radiusKm: km });
    setShowRadiusDropdown(false);
  };

  // Count active filters
  const activeEntityCount = Object.values(filters.entities).filter(Boolean).length;
  const activeStatusCount = Object.values(filters.customerStatus).filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200/80 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
      {/* Entity type chips */}
      <div className="flex items-center gap-1.5">
        {ENTITY_CONFIG.map(({ key, label, icon: Icon, activeColor, dotColor }) => {
          const isActive = filters.entities[key];
          return (
            <button
              key={key}
              onClick={() => toggleEntity(key)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? activeColor
                  : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
              }`}
              title={label}
            >
              {!isActive && <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />}
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-5 w-px bg-gray-200" />

      {/* Customer status chips (only when customers enabled) */}
      {filters.entities.customers && (
        <>
          <div className="flex items-center gap-1">
            {STATUS_CONFIG.map(({ key, label, dotColor }) => {
              const isActive = filters.customerStatus[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleStatus(key)}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  title={`${label} customers`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-white' : dotColor}`}
                  />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
          <div className="h-5 w-px bg-gray-200" />
        </>
      )}

      {/* Date preset dropdown */}
      <div className="relative" ref={dateRef}>
        <button
          onClick={() => setShowDateDropdown(!showDateDropdown)}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <Calendar className="h-3.5 w-3.5 text-gray-400" />
          <span>
            {DATE_PRESETS.find((p) => p.key === filters.dateRange.preset)?.label || '30d'}
          </span>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>

        {showDateDropdown && (
          <div className="absolute left-0 top-full z-50 mt-1 min-w-[140px] rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            {DATE_PRESETS.map(({ key, fullLabel }) => (
              <button
                key={key}
                onClick={() => setDatePreset(key)}
                className={`block w-full px-3 py-1.5 text-left text-xs transition-colors ${
                  filters.dateRange.preset === key
                    ? 'bg-gray-100 font-medium text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {fullLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Radius dropdown */}
      <div className="relative" ref={radiusRef}>
        <button
          onClick={() => setShowRadiusDropdown(!showRadiusDropdown)}
          className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          <span>{filters.radiusKm} km</span>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>

        {showRadiusDropdown && (
          <div className="absolute left-0 top-full z-50 mt-1 grid min-w-[120px] grid-cols-2 gap-0.5 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
            {RADIUS_OPTIONS.map((km) => (
              <button
                key={km}
                onClick={() => setRadius(km)}
                className={`rounded-md px-3 py-1.5 text-center text-xs transition-colors ${
                  filters.radiusKm === km
                    ? 'bg-gray-900 font-medium text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {km} km
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active filter count badge */}
      {(activeEntityCount < 4 || activeStatusCount < 3) && (
        <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
          <span className="rounded-full bg-gray-100 px-2 py-0.5">
            {activeEntityCount + (filters.entities.customers ? activeStatusCount : 0)} filters
          </span>
        </div>
      )}
    </div>
  );
}
