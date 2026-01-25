'use client';

/**
 * SearchOverlay v2
 *
 * Full-screen search experience for menu navigation.
 * Fast, focused, frictionless.
 *
 * Features:
 * - Auto-focus on open
 * - Debounced live search
 * - Recent searches (localStorage)
 * - Quick filters (Popular, New, Dietary)
 * - Elegant empty/no-results states
 * - Keyboard navigation (Escape to close)
 *
 * Aesthetic: "Focused Clarity" - nothing between user and their search
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlass,
  X,
  Clock,
  Fire,
  Star,
  Leaf,
  GrainsSlash,
  ArrowRight,
  Trash,
  ForkKnife,
} from '@phosphor-icons/react';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Local storage keys
const RECENT_SEARCHES_KEY = 'gudbro-recent-searches';
const MAX_RECENT_SEARCHES = 5;

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  prepTime?: number;
}

type QuickFilter = 'all' | 'popular' | 'new' | 'vegan' | 'gluten-free';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: MenuItem) => void;
  menuItems: MenuItem[];
  formatPrice?: (price: number) => string;
}

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 300,
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
};

const resultVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
  },
};

export function SearchOverlay({
  isOpen,
  onClose,
  onSelectProduct,
  menuItems,
  formatPrice = (p) => `${Math.round(p / 1000)}K`,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<QuickFilter>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 200);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch {
          setRecentSearches([]);
        }
      }
    }
  }, []);

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!isOpen) {
      setQuery('');
      setActiveFilter('all');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Save search to recent
  const saveRecentSearch = useCallback((search: string) => {
    if (!search.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== search.toLowerCase());
      const updated = [search, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }, []);

  // Handle product selection
  const handleSelectProduct = useCallback(
    (product: MenuItem) => {
      saveRecentSearch(query);
      onSelectProduct(product);
      onClose();
    },
    [query, onSelectProduct, onClose, saveRecentSearch]
  );

  // Handle recent search click
  const handleRecentClick = useCallback((search: string) => {
    setQuery(search);
    inputRef.current?.focus();
  }, []);

  // Filter and search results
  const results = useMemo(() => {
    let filtered = [...menuItems];

    // Apply quick filter first
    switch (activeFilter) {
      case 'popular':
        filtered = filtered.filter((item) => item.isPopular);
        break;
      case 'new':
        filtered = filtered.filter((item) => item.isNew);
        break;
      case 'vegan':
        filtered = filtered.filter((item) => item.isVegan);
        break;
      case 'gluten-free':
        filtered = filtered.filter((item) => item.isGlutenFree);
        break;
    }

    // Then apply text search
    if (debouncedQuery.trim()) {
      const searchLower = debouncedQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.category?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [menuItems, debouncedQuery, activeFilter]);

  // Quick filters config
  const quickFilters: { id: QuickFilter; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All', icon: ForkKnife },
    { id: 'popular', label: 'Popular', icon: Fire },
    { id: 'new', label: 'New', icon: Star },
    { id: 'vegan', label: 'Vegan', icon: Leaf },
    { id: 'gluten-free', label: 'GF', icon: GrainsSlash },
  ];

  const showRecentSearches = !query && recentSearches.length > 0;
  const showResults = debouncedQuery || activeFilter !== 'all';
  const hasResults = results.length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'var(--bg-primary)' }}
        >
          {/* Header */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="flex-shrink-0"
            style={{ borderBottom: '1px solid var(--border-light)' }}
          >
            <div className="container-app py-3">
              {/* Search input row */}
              <div className="flex items-center gap-3">
                <div
                  className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-medium)',
                  }}
                >
                  <MagnifyingGlass
                    size={20}
                    weight="regular"
                    style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search menu..."
                    className="flex-1 bg-transparent text-base outline-none"
                    style={{
                      color: 'var(--text-primary)',
                    }}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                  />
                  {query && (
                    <motion.button
                      onClick={() => setQuery('')}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{
                        background: 'var(--bg-tertiary)',
                        color: 'var(--text-tertiary)',
                      }}
                    >
                      <X size={12} weight="bold" />
                    </motion.button>
                  )}
                </div>

                <motion.button
                  onClick={onClose}
                  className="px-3 py-2 text-sm font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              </div>

              {/* Quick filters */}
              <div className="scrollbar-hide -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
                {quickFilters.map((filter) => {
                  const Icon = filter.icon;
                  const isActive = activeFilter === filter.id;

                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        background: isActive ? 'var(--text-primary)' : 'var(--bg-tertiary)',
                        color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={14} weight={isActive ? 'fill' : 'regular'} />
                      <span>{filter.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container-app py-4">
              <AnimatePresence mode="wait">
                {/* Recent searches */}
                {showRecentSearches && (
                  <motion.div
                    key="recent"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <h3
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Recent Searches
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="flex items-center gap-1 text-xs"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        <Trash size={12} />
                        Clear
                      </button>
                    </div>

                    <div className="space-y-1">
                      {recentSearches.map((search, index) => (
                        <motion.button
                          key={search}
                          variants={itemVariants}
                          onClick={() => handleRecentClick(search)}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                          style={{ color: 'var(--text-primary)' }}
                          whileHover={{ background: 'var(--bg-secondary)' }}
                        >
                          <Clock size={16} style={{ color: 'var(--text-tertiary)' }} />
                          <span className="flex-1 text-sm">{search}</span>
                          <ArrowRight size={14} style={{ color: 'var(--text-tertiary)' }} />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Results */}
                {showResults && (
                  <motion.div
                    key="results"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {hasResults ? (
                      <>
                        <p className="mb-3 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                          {results.length} {results.length === 1 ? 'result' : 'results'}
                          {debouncedQuery && ` for "${debouncedQuery}"`}
                        </p>

                        <div className="space-y-2">
                          {results.slice(0, 20).map((item, index) => (
                            <motion.button
                              key={item.id}
                              variants={resultVariants}
                              onClick={() => handleSelectProduct(item)}
                              className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors"
                              style={{ background: 'var(--surface-card)' }}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                            >
                              {/* Image */}
                              <div
                                className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg"
                                style={{ background: 'var(--bg-tertiary)' }}
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <ForkKnife
                                      size={24}
                                      style={{ color: 'var(--text-tertiary)' }}
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Content */}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="min-w-0 flex-1">
                                    <h4
                                      className="font-display truncate text-sm font-medium"
                                      style={{ color: 'var(--text-primary)' }}
                                    >
                                      {item.name}
                                    </h4>
                                    {item.category && (
                                      <p
                                        className="text-xs"
                                        style={{ color: 'var(--text-tertiary)' }}
                                      >
                                        {item.category}
                                      </p>
                                    )}
                                  </div>
                                  <span
                                    className="font-display shrink-0 text-sm font-semibold"
                                    style={{ color: 'var(--price-primary)' }}
                                  >
                                    {formatPrice(item.price)}
                                  </span>
                                </div>

                                {/* Tags */}
                                <div className="mt-1 flex items-center gap-2">
                                  {item.isPopular && (
                                    <span
                                      className="flex items-center gap-0.5 text-[10px] font-medium"
                                      style={{ color: 'var(--status-warning)' }}
                                    >
                                      <Fire size={10} weight="fill" />
                                      Popular
                                    </span>
                                  )}
                                  {item.isNew && (
                                    <span
                                      className="flex items-center gap-0.5 text-[10px] font-medium"
                                      style={{ color: 'var(--status-success)' }}
                                    >
                                      <Star size={10} weight="fill" />
                                      New
                                    </span>
                                  )}
                                  {item.prepTime && (
                                    <span
                                      className="flex items-center gap-0.5 text-[10px]"
                                      style={{ color: 'var(--text-tertiary)' }}
                                    >
                                      <Clock size={10} />
                                      {item.prepTime}m
                                    </span>
                                  )}
                                </div>
                              </div>

                              <ArrowRight
                                size={16}
                                style={{ color: 'var(--text-tertiary)', flexShrink: 0 }}
                              />
                            </motion.button>
                          ))}
                        </div>

                        {results.length > 20 && (
                          <p
                            className="mt-4 text-center text-xs"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            Showing first 20 results. Try a more specific search.
                          </p>
                        )}
                      </>
                    ) : (
                      /* No results state */
                      <motion.div
                        variants={contentVariants}
                        className="flex flex-col items-center py-16 text-center"
                      >
                        <div
                          className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                          style={{ background: 'var(--bg-tertiary)' }}
                        >
                          <MagnifyingGlass
                            size={40}
                            weight="duotone"
                            style={{ color: 'var(--text-tertiary)' }}
                          />
                        </div>
                        <h3
                          className="font-display mb-2 text-lg font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          No results found
                        </h3>
                        <p
                          className="mb-6 max-w-[240px] text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {debouncedQuery
                            ? `We couldn't find anything matching "${debouncedQuery}"`
                            : 'No items match the selected filter'}
                        </p>

                        {/* Suggestions */}
                        <div className="space-y-2">
                          <p
                            className="text-xs font-medium"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            Try:
                          </p>
                          <div className="flex flex-wrap justify-center gap-2">
                            {['Coffee', 'Burger', 'Salad', 'Dessert'].map((suggestion) => (
                              <button
                                key={suggestion}
                                onClick={() => setQuery(suggestion)}
                                className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                                style={{
                                  background: 'var(--bg-tertiary)',
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Empty state (no query, no recent) */}
                {!showRecentSearches && !showResults && (
                  <motion.div
                    key="empty"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center py-16 text-center"
                  >
                    <div
                      className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <MagnifyingGlass
                        size={40}
                        weight="duotone"
                        style={{ color: 'var(--text-tertiary)' }}
                      />
                    </div>
                    <h3
                      className="font-display mb-2 text-lg font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Search our menu
                    </h3>
                    <p className="max-w-[240px] text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Find dishes by name, ingredients, or dietary preferences
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchOverlay;
