'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

/* ═══════════════════════════════════════════════════════════════════════════
   SEARCH BAR

   Prominent search with location detection and quick filters.
   Standard pattern for travel apps (Klook, GetYourGuide style).
   ═══════════════════════════════════════════════════════════════════════════ */

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  location?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search tours & experiences',
  location = 'Da Nang',
  className,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn('relative', className)}>
      {/* Main search container */}
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl bg-white px-4 py-3',
          'border-2 transition-all duration-200',
          isFocused ? 'border-primary shadow-primary/10 shadow-lg' : 'border-gray-100 shadow-sm'
        )}
      >
        {/* Search icon */}
        <svg
          className={cn(
            'h-5 w-5 flex-shrink-0 transition-colors',
            isFocused ? 'text-primary' : 'text-gray-400'
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        {/* Input area */}
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm font-medium text-gray-900 outline-none placeholder:text-gray-400"
          />
          {/* Location hint */}
          {!isFocused && !value && (
            <div className="mt-0.5 flex items-center gap-1">
              <svg className="h-3 w-3 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span className="text-xs text-gray-400">{location}</span>
            </div>
          )}
        </div>

        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange('')}
            className="rounded-full p-1 transition-colors hover:bg-gray-100"
          >
            <svg
              className="h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Filter button */}
        <button
          className="bg-primary hover:bg-primary-hover rounded-xl p-2 text-white transition-colors"
          onClick={onSearch}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUICK FILTERS

   Horizontal scrolling filter chips for common searches.
   ═══════════════════════════════════════════════════════════════════════════ */

interface QuickFilter {
  id: string;
  label: string;
  icon?: string;
}

interface QuickFiltersProps {
  filters: QuickFilter[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export function QuickFilters({ filters, selected, onSelect }: QuickFiltersProps) {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto py-2">
      {filters.map((filter) => {
        const isSelected = selected === filter.id;
        return (
          <button
            key={filter.id}
            onClick={() => onSelect(isSelected ? null : filter.id)}
            className={cn(
              'flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2',
              'whitespace-nowrap text-sm font-medium transition-all duration-200',
              isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {filter.icon && <span>{filter.icon}</span>}
            <span>{filter.label}</span>
          </button>
        );
      })}
    </div>
  );
}
