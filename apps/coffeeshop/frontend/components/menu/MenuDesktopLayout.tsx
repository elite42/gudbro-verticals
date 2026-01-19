'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { MenuSidebar } from './MenuSidebar';

interface Category {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

interface MenuDesktopLayoutProps {
  children: ReactNode;
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

/**
 * Desktop layout for menu page with sidebar
 *
 * Layout:
 * - Mobile/Tablet (<lg): Single column, no sidebar
 * - Desktop (lg+): 2-column layout with sticky sidebar
 *
 * Usage:
 * ```tsx
 * <MenuDesktopLayout
 *   categories={categories}
 *   selectedCategory={selectedCategory}
 *   onCategorySelect={setSelectedCategory}
 * >
 *   <CategorySections ... />
 * </MenuDesktopLayout>
 * ```
 */
export function MenuDesktopLayout({
  children,
  categories,
  selectedCategory,
  onCategorySelect,
  className,
}: MenuDesktopLayoutProps) {
  return (
    <div className={cn('mx-auto max-w-screen-xl px-4 lg:px-8', 'lg:flex lg:gap-8', className)}>
      {/* Sidebar - only visible on desktop */}
      <MenuSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
      />

      {/* Main content area */}
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

/**
 * Export components for flexibility
 */
export { MenuSidebar } from './MenuSidebar';
