'use client';

/**
 * MapLegend Component
 *
 * Legend overlay showing marker colors.
 */

import type { FilterState } from './MapFilters';

interface MapLegendProps {
  filters: FilterState;
}

const LEGEND_ITEMS = [
  { key: 'merchant', label: 'Your Location', color: '#1f2937' },
  { key: 'customers', label: 'Customers', color: '#22c55e' },
  { key: 'competitors', label: 'Competitors', color: '#ef4444' },
  { key: 'partners', label: 'Partners', color: '#3b82f6' },
  { key: 'leads', label: 'Leads', color: '#9ca3af' },
];

export function MapLegend({ filters }: MapLegendProps) {
  const visibleItems = LEGEND_ITEMS.filter(
    (item) => item.key === 'merchant' || filters.entities[item.key as keyof typeof filters.entities]
  );

  return (
    <div className="rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-3">
        {visibleItems.map(({ key, label, color }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-gray-600">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
