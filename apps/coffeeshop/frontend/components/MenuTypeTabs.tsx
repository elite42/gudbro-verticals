'use client';

import { useTranslation } from '@/lib/use-translation';

interface MenuTypeTabsProps {
  selectedMenuType: string;
  onMenuTypeChange: (menuType: string) => void;
  onSearchClick: () => void;
}

export function MenuTypeTabs({ selectedMenuType, onMenuTypeChange, onSearchClick }: MenuTypeTabsProps) {
  const { t } = useTranslation();

  const menuTypes = [
    { id: 'food', label: t.menu.types.food, emoji: '🍽️' },
    { id: 'drinks', label: t.menu.types.drinks, emoji: '🥤' },
    { id: 'merchandise', label: t.menu.types.merchandise, emoji: '🎁' }
  ];

  return (
    <div className="bg-theme-bg-secondary border-b border-theme-bg-tertiary sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        {/* Single row: scrollable tabs + search icon */}
        <div className="flex items-center gap-3 justify-between">
          {/* Tabs - horizontal scrollable */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
            {menuTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onMenuTypeChange(type.id)}
                className={`flex-shrink-0 py-2 px-4 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                  selectedMenuType === type.id
                    ? 'bg-gradient-to-br from-theme-brand-accent to-theme-brand-primary text-white shadow-md'
                    : 'bg-theme-bg-elevated text-theme-text-primary border-2 border-theme-bg-tertiary hover:border-theme-brand-accent hover:bg-theme-brand-secondary'
                }`}
              >
                <span className="text-lg">{type.emoji}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Search Icon Button */}
          <button
            onClick={onSearchClick}
            className="flex-shrink-0 p-2.5 bg-theme-bg-elevated border-2 border-theme-bg-tertiary rounded-full hover:border-theme-brand-accent hover:bg-theme-brand-secondary transition-all"
            aria-label="Cerca nel menu"
          >
            <svg
              className="w-5 h-5 text-theme-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
