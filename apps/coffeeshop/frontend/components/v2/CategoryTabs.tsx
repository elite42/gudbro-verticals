'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position and update indicators
  const updateScrollIndicators = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Initial check and on scroll
  useEffect(() => {
    updateScrollIndicators();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollIndicators);
      window.addEventListener('resize', updateScrollIndicators);
      return () => {
        container.removeEventListener('scroll', updateScrollIndicators);
        window.removeEventListener('resize', updateScrollIndicators);
      };
    }
  }, [categories]);

  // Scroll active category into view
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const button = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Calculate scroll position to center the button
      const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;

      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeCategory]);

  return (
    <div
      className="relative sticky top-0 z-30"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-light)',
      }}
    >
      {/* Scroll fade indicators */}
      {canScrollLeft && (
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8"
          style={{
            background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          }}
        />
      )}
      {canScrollRight && (
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8"
          style={{
            background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          }}
        />
      )}

      <div ref={scrollRef} className="scrollbar-hide flex gap-2 overflow-x-auto px-4 py-3">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              ref={isActive ? activeRef : null}
              onClick={() => onCategoryChange(category.id)}
              className="relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                background: isActive ? 'var(--interactive-primary)' : 'var(--bg-tertiary)',
                color: isActive ? 'var(--text-inverse)' : 'var(--text-secondary)',
              }}
            >
              {/* Icon/Emoji */}
              {category.icon && <span className="text-base">{category.icon}</span>}

              {/* Name */}
              <span>{category.name}</span>

              {/* Count badge */}
              {category.count !== undefined && (
                <span
                  className="ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-accent)',
                    color: isActive ? 'var(--text-inverse)' : 'var(--text-tertiary)',
                  }}
                >
                  {category.count}
                </span>
              )}

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="categoryIndicator"
                  className="absolute -bottom-3 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: 'var(--brand-warm)' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
