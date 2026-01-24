'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  image?: string;
  icon?: string;
  count?: number;
}

interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  isLoading?: boolean;
}

// Skeleton loader for categories
function CategorySkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-xl" style={{ background: 'var(--bg-tertiary)' }} />
      <div className="mx-auto mt-3 h-4 w-20 rounded" style={{ background: 'var(--bg-tertiary)' }} />
    </div>
  );
}

// Default placeholder image for categories without images
const PLACEHOLDER_COLORS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
];

export function CategoryGrid({ categories, onSelect, isLoading = false }: CategoryGridProps) {
  // Show skeletons while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 px-4 py-6">
        {[...Array(4)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    );
  }

  // Empty state
  if (categories.length === 0) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-4xl" role="img" aria-label="No categories">
          📂
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
          No categories available
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-4 py-6">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          onClick={() => onSelect(category)}
          className="group relative overflow-hidden rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Image Container */}
          <div
            className="relative aspect-[4/3] overflow-hidden rounded-xl"
            style={{
              background: category.image
                ? 'var(--bg-tertiary)'
                : PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length],
            }}
          >
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            ) : (
              // Fallback with icon or first letter
              <div className="absolute inset-0 flex items-center justify-center">
                {category.icon ? (
                  <span className="text-4xl">{category.icon}</span>
                ) : (
                  <span
                    className="text-4xl font-bold text-white/80"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                  >
                    {category.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            )}

            {/* Subtle overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Count badge */}
            {category.count !== undefined && category.count > 0 && (
              <span
                className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  color: 'var(--text-primary)',
                }}
              >
                {category.count}
              </span>
            )}
          </div>

          {/* Category Name */}
          <p
            className="mt-3 text-center text-base font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {category.name}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
