'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlass, X, SortAscending } from '@phosphor-icons/react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { CategoryTabs } from './CategoryTabs';
import { ProductCard } from './ProductCard';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  isBestSeller?: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  prepTime?: number;
  calories?: number;
  likesCount?: number;
}

interface Category {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

interface MenuPageProps {
  merchantName: string;
  merchantLogo?: string;
  menuItems: MenuItem[];
  categories: Category[];
  onProductClick: (product: MenuItem) => void;
  onThemeToggle: () => void;
  isDark: boolean;
  cartCount: number;
  formatPrice: (price: number) => string;
  favorites: string[];
  onFavoriteToggle: (id: string) => void;
  /** Callback for quick add to cart (tier-aware) */
  onAddToCart?: (productId: string) => void;
  // Navigation (for demo mode) - FIX V-001
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popular' | 'new';

export function MenuPage({
  merchantName,
  merchantLogo,
  menuItems,
  categories,
  onProductClick,
  onThemeToggle,
  isDark,
  cartCount,
  formatPrice,
  favorites,
  onFavoriteToggle,
  onAddToCart,
  activePage,
  onNavigate,
}: MenuPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'favorites') {
        items = items.filter((item) => favorites.includes(item.id));
      } else if (activeCategory === 'new') {
        items = items.filter((item) => item.isNew);
      } else {
        items = items.filter((item) => item.category === activeCategory);
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        items.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
        break;
      case 'new':
        items.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return items;
  }, [menuItems, activeCategory, searchQuery, sortBy, favorites]);

  // Build categories with counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { all: menuItems.length };

    menuItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    // Add dynamic categories
    const newCount = menuItems.filter((i) => i.isNew).length;
    const favCount = favorites.length;

    const allCategories: Category[] = [{ id: 'all', name: 'All', icon: '⭐', count: counts.all }];

    if (favCount > 0) {
      allCategories.push({ id: 'favorites', name: 'Favorites', icon: '❤️', count: favCount });
    }

    if (newCount > 0) {
      allCategories.push({ id: 'new', name: 'New', icon: '✨', count: newCount });
    }

    return [
      ...allCategories,
      ...categories.map((cat) => ({
        ...cat,
        count: counts[cat.id] || 0,
      })),
    ];
  }, [categories, menuItems, favorites]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={merchantName}
        merchantLogo={merchantLogo}
        showSearch={false}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
      />

      {/* Search Bar - not sticky to avoid overlap with Header */}
      <div
        className="px-4 py-3"
        style={{
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="relative flex items-center">
          <MagnifyingGlass
            size={20}
            className="absolute left-4"
            style={{ color: 'var(--text-tertiary)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu..."
            className="w-full rounded-full py-3 pl-12 pr-12 text-base"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
            }}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 rounded-full p-1 transition-colors hover:bg-gray-200"
              style={{ color: 'var(--text-tertiary)' }}
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <CategoryTabs
        categories={categoriesWithCounts}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Sort/Filter Bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
        </p>

        <div className="flex gap-2">
          {/* Sort button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <SortAscending size={16} />
            Sort
          </button>
        </div>
      </div>

      {/* Sort Options Dropdown */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            <div className="flex flex-wrap gap-2 p-4">
              {[
                { value: 'default', label: 'Default' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'popular', label: 'Most Popular' },
                { value: 'new', label: 'Newest First' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortBy(option.value as SortOption);
                    setShowFilters(false);
                  }}
                  className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={{
                    background:
                      sortBy === option.value ? 'var(--interactive-primary)' : 'var(--bg-tertiary)',
                    color:
                      sortBy === option.value ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <main className="safe-area-bottom container-app py-4">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center">
            <p className="mb-2 text-4xl" role="img" aria-label="No results">
              🔍
            </p>
            <h3
              className="font-display mb-2 text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              No items found
            </h3>
            <p style={{ color: 'var(--text-tertiary)' }}>Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
              >
                <ProductCard
                  {...item}
                  isFavorite={favorites.includes(item.id)}
                  onFavoriteToggle={onFavoriteToggle}
                  onClick={() => onProductClick(item)}
                  onAddToCart={onAddToCart}
                  formatPrice={formatPrice}
                />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <BottomNav cartCount={cartCount} activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
