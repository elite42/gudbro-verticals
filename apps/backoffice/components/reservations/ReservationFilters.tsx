'use client';

import { Filter, X } from 'lucide-react';
import { ReservationStatus } from './ReservationCard';

export interface ReservationFiltersState {
  status: ReservationStatus | 'all';
  sectionId: string | 'all';
  partySizeMin: number | null;
  partySizeMax: number | null;
}

interface Section {
  id: string;
  name: string;
}

interface ReservationFiltersProps {
  filters: ReservationFiltersState;
  onFiltersChange: (filters: ReservationFiltersState) => void;
  sections: Section[];
}

const STATUS_OPTIONS: { value: ReservationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'seated', label: 'Seated' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'no_show', label: 'No Show' },
];

const PARTY_SIZE_OPTIONS = [
  { value: null, label: 'Any size' },
  { value: 2, label: '1-2 guests' },
  { value: 4, label: '3-4 guests' },
  { value: 6, label: '5-6 guests' },
  { value: 10, label: '7+ guests' },
];

export function ReservationFilters({
  filters,
  onFiltersChange,
  sections,
}: ReservationFiltersProps) {
  const hasActiveFilters =
    filters.status !== 'all' || filters.sectionId !== 'all' || filters.partySizeMin !== null;

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      sectionId: 'all',
      partySizeMin: null,
      partySizeMax: null,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-3">
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <Filter className="h-4 w-4" />
        <span>Filters:</span>
      </div>

      {/* Status filter */}
      <select
        value={filters.status}
        onChange={(e) =>
          onFiltersChange({
            ...filters,
            status: e.target.value as ReservationStatus | 'all',
          })
        }
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Section filter */}
      {sections.length > 0 && (
        <select
          value={filters.sectionId}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              sectionId: e.target.value,
            })
          }
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="all">All Sections</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      )}

      {/* Party size filter */}
      <select
        value={filters.partySizeMin ?? ''}
        onChange={(e) => {
          const value = e.target.value ? parseInt(e.target.value) : null;
          let max = null;
          if (value === 2) max = 2;
          else if (value === 4) max = 4;
          else if (value === 6) max = 6;
          else if (value === 10) max = null; // 7+

          onFiltersChange({
            ...filters,
            partySizeMin: value === 10 ? 7 : value === 2 ? 1 : value ? value - 1 : null,
            partySizeMax: max,
          });
        }}
        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {PARTY_SIZE_OPTIONS.map((option) => (
          <option key={option.value ?? 'any'} value={option.value ?? ''}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-200"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </button>
      )}
    </div>
  );
}

export const DEFAULT_FILTERS: ReservationFiltersState = {
  status: 'all',
  sectionId: 'all',
  partySizeMin: null,
  partySizeMax: null,
};
