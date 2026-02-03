'use client';

import type { PromotionStatus } from './types';

interface PromotionFiltersProps {
  filter: 'all' | PromotionStatus;
  onFilterChange: (filter: 'all' | PromotionStatus) => void;
  t: (key: string) => string;
}

export function PromotionFilters({ filter, onFilterChange, t }: PromotionFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {[
        { id: 'all', label: t('filters.all') },
        { id: 'active', label: t('filters.active') },
        { id: 'draft', label: t('filters.draft') },
        { id: 'paused', label: t('filters.paused') },
        { id: 'expired', label: t('filters.expired') },
      ].map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id as 'all' | PromotionStatus)}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === f.id
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
