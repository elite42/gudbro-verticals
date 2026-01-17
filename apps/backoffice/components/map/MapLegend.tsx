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

// Base legend items (non-customer)
const BASE_ITEMS = [
  { key: 'merchant', label: 'Your Location', color: '#1f2937' },
  { key: 'competitors', label: 'Competitors', color: '#ef4444' },
  { key: 'partners', label: 'Partners', color: '#3b82f6' },
  { key: 'leads', label: 'Leads', color: '#9ca3af' },
];

// Customer status colors
const CUSTOMER_STATUS_ITEMS = [
  { key: 'active', label: 'Active', color: '#10b981' },
  { key: 'atRisk', label: 'At Risk', color: '#f59e0b' },
  { key: 'churned', label: 'Churned', color: '#ef4444' },
];

export function MapLegend({ filters }: MapLegendProps) {
  // Build visible items based on filters
  const visibleItems: Array<{ key: string; label: string; color: string }> = [];

  // Always show merchant
  visibleItems.push(BASE_ITEMS[0]);

  // Show customer status items if customers enabled
  if (filters.entities.customers) {
    CUSTOMER_STATUS_ITEMS.forEach((item) => {
      if (filters.customerStatus[item.key as keyof typeof filters.customerStatus]) {
        visibleItems.push(item);
      }
    });
  }

  // Add other entity types
  BASE_ITEMS.slice(1).forEach((item) => {
    if (filters.entities[item.key as keyof typeof filters.entities]) {
      visibleItems.push(item);
    }
  });

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
