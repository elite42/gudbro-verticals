import { ChallengeFiltersProps, ChallengeFilter } from './types';

export function ChallengeFilters({ filter, onFilterChange, t }: ChallengeFiltersProps) {
  return (
    <div className="flex gap-2">
      {[
        { id: 'all' as ChallengeFilter, label: t('filters.all') },
        { id: 'active' as ChallengeFilter, label: t('filters.active') },
        { id: 'inactive' as ChallengeFilter, label: t('filters.inactive') },
      ].map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === f.id
              ? 'bg-orange-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
