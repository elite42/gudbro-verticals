'use client';

import { useTranslation } from '@/lib/use-translation';

type MenuType = 'food' | 'drinks' | 'merchandise';

interface MenuTypeTabsProps {
  selectedMenuType: MenuType | string;
  onMenuTypeChange: (menuType: MenuType) => void;
  onSearchClick: () => void;
}

export function MenuTypeTabs({
  selectedMenuType,
  onMenuTypeChange,
  onSearchClick,
}: MenuTypeTabsProps) {
  const { t } = useTranslation();

  const menuTypes: Array<{ id: MenuType; label: string; emoji: string }> = [
    { id: 'food', label: t.menu.types.food, emoji: '🍽️' },
    { id: 'drinks', label: t.menu.types.drinks, emoji: '🥤' },
    { id: 'merchandise', label: t.menu.types.merchandise, emoji: '🎁' },
  ];

  return (
    <div className="bg-theme-bg-secondary border-theme-bg-tertiary sticky top-0 z-20 border-b">
      <div className="container mx-auto px-4 py-3">
        {/* Single row: scrollable tabs + search icon */}
        <div className="flex items-center justify-between gap-3">
          {/* Tabs - horizontal scrollable */}
          <div className="scrollbar-hide flex flex-1 gap-2 overflow-x-auto">
            {menuTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onMenuTypeChange(type.id)}
                className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                  selectedMenuType === type.id
                    ? 'from-theme-brand-accent to-theme-brand-primary bg-gradient-to-br text-white shadow-md'
                    : 'bg-theme-bg-elevated text-theme-text-primary border-theme-bg-tertiary hover:border-theme-brand-accent hover:bg-theme-brand-secondary border-2'
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
            className="bg-theme-bg-elevated border-theme-bg-tertiary hover:border-theme-brand-accent hover:bg-theme-brand-secondary flex-shrink-0 rounded-full border-2 p-2.5 transition-all"
            aria-label="Cerca nel menu"
          >
            <svg
              className="text-theme-text-primary h-5 w-5"
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
