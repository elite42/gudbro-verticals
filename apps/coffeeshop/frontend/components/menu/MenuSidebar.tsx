'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/lib/use-translation';

interface Category {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

interface MenuSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

/**
 * Sticky sidebar for desktop menu navigation
 * Shows category list with counts and active state
 * Only visible on lg+ screens
 */
export function MenuSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  className,
}: MenuSidebarProps) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className={cn(
        'sticky top-20 hidden h-fit w-64 flex-shrink-0 lg:block',
        'bg-theme-bg-elevated rounded-xl p-4',
        isScrolled && 'shadow-lg',
        'transition-shadow duration-200',
        className
      )}
    >
      <h2 className="text-theme-text-primary mb-4 px-2 text-lg font-bold">Categories</h2>

      <nav aria-label="Menu categories">
        <ul className="space-y-1">
          {categories.map((category) => {
            const isActive = selectedCategory === category.id;

            return (
              <li key={category.id}>
                <button
                  onClick={() => onCategorySelect(category.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5',
                    'text-left font-medium transition-colors',
                    isActive
                      ? 'bg-theme-brand-primary text-white'
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-tertiary'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="flex items-center gap-2">
                    {category.icon && (
                      <span className="text-lg" aria-hidden="true">
                        {category.icon}
                      </span>
                    )}
                    <span>{category.name}</span>
                  </span>

                  {typeof category.count === 'number' && (
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-sm',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-theme-bg-tertiary text-theme-text-tertiary'
                      )}
                    >
                      {category.count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick filters */}
      <div className="border-theme-border-light mt-6 border-t pt-4">
        <h3 className="text-theme-text-tertiary mb-3 px-2 text-sm font-medium">Quick Filters</h3>
        <div className="flex flex-wrap gap-2 px-2">
          <button className="bg-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-secondary rounded-full px-3 py-1.5 text-sm transition-colors">
            🌱 Vegan
          </button>
          <button className="bg-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-secondary rounded-full px-3 py-1.5 text-sm transition-colors">
            🔥 Spicy
          </button>
          <button className="bg-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-secondary rounded-full px-3 py-1.5 text-sm transition-colors">
            ⭐ Popular
          </button>
        </div>
      </div>
    </aside>
  );
}
