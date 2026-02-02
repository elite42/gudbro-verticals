'use client';

import { useState, useEffect, useRef } from 'react';
import { DishItem } from './DishCard';
import { useAppPriceFormat as usePriceFormat } from '@/lib/currency';
import { selectionsStore } from '@/lib/selections-store';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  items: DishItem[];
  onItemClick: (item: DishItem) => void;
}

// Helper to highlight search term in text
function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 font-semibold">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export function SearchOverlay({ isOpen, onClose, items, onItemClick }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPriceCompact } = usePriceFormat();

  // Update quantities from selections store
  useEffect(() => {
    if (isOpen) {
      const updateQuantities = () => {
        const newQuantities: Record<string, number> = {};
        items.forEach((item) => {
          newQuantities[item.id] = selectionsStore.getQuantity(item.id);
        });
        setQuantities(newQuantities);
      };

      updateQuantities();
      window.addEventListener('selections-updated', updateQuantities);
      return () => window.removeEventListener('selections-updated', updateQuantities);
    }
  }, [isOpen, items]);

  // Filter and sort items based on search query
  const filteredItems = searchQuery.trim()
    ? items
        .filter((item) => {
          const query = searchQuery.toLowerCase();
          return (
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            item.allergens?.some((a: string) => a.toLowerCase().includes(query)) ||
            item.dietary?.some((l: string) => l.toLowerCase().includes(query))
          );
        })
        .sort((a, b) => {
          // Smart sorting: items starting with query first
          const query = searchQuery.toLowerCase();
          const aStartsWith = a.name.toLowerCase().startsWith(query);
          const bStartsWith = b.name.toLowerCase().startsWith(query);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          // Then alphabetically
          return a.name.localeCompare(b.name);
        })
    : [];

  // Group filtered items by category
  const groupedItems = filteredItems.reduce(
    (groups, item) => {
      const category = item.category || 'Altri';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
      return groups;
    },
    {} as Record<string, DishItem[]>
  );

  const categories = Object.keys(groupedItems).sort();

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Block body scroll when overlay is open
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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Reset search query when closing
  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="animate-fadeIn fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      {/* Overlay Content */}
      <div className="bg-theme-bg-secondary animate-slideUp h-full">
        {/* Header */}
        <div className="bg-theme-bg-elevated shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <button
                onClick={handleClose}
                className="hover:bg-theme-bg-tertiary flex-shrink-0 rounded-full p-2 transition-colors"
                aria-label="Chiudi ricerca"
              >
                <svg
                  className="text-theme-text-primary h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Search Input */}
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca nel menu..."
                  className="border-theme-bg-tertiary focus:border-theme-brand-accent bg-theme-bg-secondary text-theme-text-primary placeholder-theme-text-tertiary w-full rounded-full border-2 px-4 py-3 pl-12 focus:outline-none"
                  aria-label="Cerca prodotti"
                />
                {/* Search Icon */}
                <svg
                  className="text-theme-text-tertiary absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {/* Clear Button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-theme-text-tertiary hover:text-theme-text-secondary absolute right-4 top-1/2 -translate-y-1/2 transform"
                    aria-label="Cancella ricerca"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto pb-20">
          {/* Search Info */}
          {searchQuery && (
            <div className="bg-theme-bg-elevated border-theme-bg-tertiary border-b px-4 py-3">
              <p className="text-theme-text-secondary text-sm">
                {filteredItems.length > 0
                  ? `${filteredItems.length} risultat${filteredItems.length !== 1 ? 'i' : 'o'} in ${categories.length} categori${categories.length !== 1 ? 'e' : 'a'} per "${searchQuery}"`
                  : `Nessun risultato per "${searchQuery}"`}
              </p>
            </div>
          )}

          {/* Empty State - No query */}
          {!searchQuery && (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="text-theme-text-primary mb-2 text-xl font-bold">Cerca nel menu</h3>
              <p className="text-theme-text-secondary max-w-sm">
                Inizia a digitare per cercare prodotti, categorie, ingredienti...
              </p>
            </div>
          )}

          {/* Empty State - No results */}
          {searchQuery && filteredItems.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 text-6xl">🤷</div>
              <h3 className="text-theme-text-primary mb-2 text-xl font-bold">Nessun risultato</h3>
              <p className="text-theme-text-secondary max-w-sm">
                Prova con parole diverse o cerca per categoria
              </p>
            </div>
          )}

          {/* Results List - Grouped by Category */}
          {searchQuery && filteredItems.length > 0 && (
            <div>
              {categories.map((category) => (
                <div key={category} className="mb-4">
                  {/* Category Header */}
                  <div className="bg-theme-bg-secondary border-theme-bg-tertiary sticky top-0 border-b px-4 py-2">
                    <h3 className="text-theme-text-primary text-sm font-bold uppercase tracking-wide">
                      {category}{' '}
                      <span className="text-theme-text-tertiary">
                        ({groupedItems[category].length})
                      </span>
                    </h3>
                  </div>

                  {/* Category Items */}
                  <div className="divide-theme-bg-tertiary divide-y">
                    {groupedItems[category].map((item) => {
                      const quantity = quantities[item.id] || 0;

                      return (
                        <div
                          key={item.id}
                          className="hover:bg-theme-bg-tertiary flex items-start gap-4 px-4 py-4 transition-colors"
                        >
                          {/* Image */}
                          <button
                            onClick={() => {
                              onItemClick(item);
                              handleClose();
                            }}
                            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-900"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </button>

                          {/* Info */}
                          <button
                            onClick={() => {
                              onItemClick(item);
                              handleClose();
                            }}
                            className="min-w-0 flex-1 text-left"
                          >
                            <h4 className="text-theme-text-primary mb-1 line-clamp-2 font-bold">
                              {highlightMatch(item.name, searchQuery)}
                            </h4>
                            <p className="text-theme-text-secondary mb-2 line-clamp-1 text-sm">
                              {highlightMatch(item.description, searchQuery)}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-theme-brand-primary text-sm font-bold">
                                {formatPriceCompact(item.price)}₫
                              </span>
                            </div>
                          </button>

                          {/* Quantity Controls */}
                          <div className="flex-shrink-0">
                            {quantity === 0 ? (
                              // Show only + button when quantity is 0
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectionsStore.increment(item);
                                }}
                                className="bg-theme-brand-primary hover:bg-theme-brand-primary-hover flex h-10 w-10 items-center justify-center rounded-full font-bold text-white transition-colors"
                                aria-label="Aggiungi alla lista"
                              >
                                +
                              </button>
                            ) : (
                              // Show - number + controls when quantity > 0
                              <div className="bg-theme-bg-secondary flex items-center gap-2 rounded-full px-2 py-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectionsStore.decrement(item.id);
                                  }}
                                  className="bg-theme-bg-elevated text-theme-text-primary hover:bg-theme-bg-tertiary h-7 w-7 rounded-full text-sm font-bold transition-colors"
                                  aria-label="Rimuovi dalla lista"
                                >
                                  −
                                </button>
                                <span className="text-theme-text-primary min-w-[20px] text-center text-sm font-bold">
                                  {quantity}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    selectionsStore.increment(item);
                                  }}
                                  className="bg-theme-brand-primary hover:bg-theme-brand-primary-hover flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-white transition-colors"
                                  aria-label="Aggiungi alla lista"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
