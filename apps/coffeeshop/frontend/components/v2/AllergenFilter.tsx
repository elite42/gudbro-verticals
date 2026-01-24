'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MagnifyingGlass,
  Check,
  Funnel,
  Warning,
  CaretDown,
  CaretUp,
} from '@phosphor-icons/react';

// Complete allergen list organized by region
const ALLERGEN_GROUPS = {
  common: {
    label: 'Common',
    allergens: [
      { id: 'gluten', name: 'Gluten', icon: '🌾' },
      { id: 'dairy', name: 'Dairy', icon: '🥛' },
      { id: 'eggs', name: 'Eggs', icon: '🥚' },
      { id: 'nuts', name: 'Tree Nuts', icon: '🥜' },
      { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
      { id: 'soy', name: 'Soy', icon: '🫘' },
      { id: 'shellfish', name: 'Shellfish', icon: '🦐' },
      { id: 'fish', name: 'Fish', icon: '🐟' },
    ],
  },
  eu14: {
    label: 'EU Allergens',
    allergens: [
      { id: 'celery', name: 'Celery', icon: '🥬' },
      { id: 'mustard', name: 'Mustard', icon: '🟡' },
      { id: 'sesame', name: 'Sesame', icon: '⚪' },
      { id: 'sulphites', name: 'Sulphites', icon: '🍷' },
      { id: 'lupin', name: 'Lupin', icon: '🌸' },
      { id: 'molluscs', name: 'Molluscs', icon: '🦪' },
    ],
  },
  korea: {
    label: 'Korean Allergens',
    allergens: [
      { id: 'buckwheat', name: 'Buckwheat', icon: '🌾' },
      { id: 'pork', name: 'Pork', icon: '🐷' },
      { id: 'peach', name: 'Peach', icon: '🍑' },
      { id: 'tomato', name: 'Tomato', icon: '🍅' },
      { id: 'chicken', name: 'Chicken', icon: '🐔' },
      { id: 'beef', name: 'Beef', icon: '🐄' },
      { id: 'squid', name: 'Squid', icon: '🦑' },
    ],
  },
  japan: {
    label: 'Japanese Allergens',
    allergens: [
      { id: 'abalone', name: 'Abalone', icon: '🐚' },
      { id: 'salmon_roe', name: 'Salmon Roe', icon: '🟠' },
      { id: 'orange', name: 'Orange', icon: '🍊' },
      { id: 'kiwi', name: 'Kiwi', icon: '🥝' },
      { id: 'banana', name: 'Banana', icon: '🍌' },
      { id: 'matsutake', name: 'Matsutake', icon: '🍄' },
      { id: 'yam', name: 'Yam', icon: '🍠' },
    ],
  },
  gudbro: {
    label: 'GUDBRO Special',
    allergens: [
      { id: 'msg', name: 'MSG', icon: '🧂' },
      { id: 'palm_oil', name: 'Palm Oil', icon: '🌴' },
      { id: 'artificial_colors', name: 'Artificial Colors', icon: '🎨' },
      { id: 'preservatives', name: 'Preservatives', icon: '🧪' },
    ],
  },
};

// Flatten all allergens for search
const ALL_ALLERGENS = Object.values(ALLERGEN_GROUPS).flatMap((group) =>
  group.allergens.map((a) => ({ ...a, group: group.label }))
);

interface AllergenFilterProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAllergens: string[];
  onApply: (allergens: string[]) => void;
  safeItemsCount?: number;
  totalItemsCount?: number;
}

export function AllergenFilter({
  isOpen,
  onClose,
  selectedAllergens,
  onApply,
  safeItemsCount = 0,
  totalItemsCount = 0,
}: AllergenFilterProps) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedAllergens);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['common']);

  // Sync with prop changes
  useEffect(() => {
    setLocalSelected(selectedAllergens);
  }, [selectedAllergens]);

  // Filter allergens based on search
  const filteredAllergens = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const query = searchQuery.toLowerCase();
    return ALL_ALLERGENS.filter(
      (a) => a.name.toLowerCase().includes(query) || a.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleAllergen = (id: string) => {
    setLocalSelected((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupKey) ? prev.filter((g) => g !== groupKey) : [...prev, groupKey]
    );
  };

  const handleApply = () => {
    onApply(localSelected);
    onClose();
  };

  const handleClear = () => {
    setLocalSelected([]);
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'var(--surface-overlay)' }}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl"
            style={{ background: 'var(--surface-card)' }}
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <div
                className="h-1 w-12 rounded-full"
                style={{ background: 'var(--border-heavy)' }}
              />
            </div>

            {/* Header */}
            <div
              className="flex items-center justify-between border-b px-4 pb-4"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: 'var(--status-warning-bg)' }}
                >
                  <Warning size={20} style={{ color: 'var(--status-warning)' }} />
                </div>
                <div>
                  <h2
                    className="font-display text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Allergen Filter
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    {localSelected.length} allergens selected
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <X size={18} style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>

            {/* Search */}
            <div className="px-4 py-3">
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-3"
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                }}
              >
                <MagnifyingGlass size={18} style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search allergens..."
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--text-primary)' }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X size={16} style={{ color: 'var(--text-tertiary)' }} />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="scrollbar-styled max-h-[50vh] overflow-y-auto px-4 pb-4">
              {/* Search results */}
              {filteredAllergens ? (
                <div className="space-y-2">
                  {filteredAllergens.length === 0 ? (
                    <p
                      className="py-8 text-center text-sm"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      No allergens found
                    </p>
                  ) : (
                    filteredAllergens.map((allergen) => (
                      <AllergenCheckbox
                        key={allergen.id}
                        allergen={allergen}
                        isSelected={localSelected.includes(allergen.id)}
                        onToggle={() => toggleAllergen(allergen.id)}
                        showGroup
                      />
                    ))
                  )}
                </div>
              ) : (
                /* Grouped allergens */
                <div className="space-y-4">
                  {Object.entries(ALLERGEN_GROUPS).map(([key, group]) => {
                    const isExpanded = expandedGroups.includes(key);
                    const selectedInGroup = group.allergens.filter((a) =>
                      localSelected.includes(a.id)
                    ).length;

                    return (
                      <div key={key}>
                        {/* Group header */}
                        <button
                          onClick={() => toggleGroup(key)}
                          className="flex w-full items-center justify-between py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="text-sm font-semibold"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {group.label}
                            </span>
                            {selectedInGroup > 0 && (
                              <span
                                className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                                style={{
                                  background: 'var(--interactive-primary)',
                                  color: 'var(--text-inverse)',
                                }}
                              >
                                {selectedInGroup}
                              </span>
                            )}
                          </div>
                          {isExpanded ? (
                            <CaretUp size={16} style={{ color: 'var(--text-tertiary)' }} />
                          ) : (
                            <CaretDown size={16} style={{ color: 'var(--text-tertiary)' }} />
                          )}
                        </button>

                        {/* Group allergens */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 pb-2">
                                {group.allergens.map((allergen) => (
                                  <AllergenCheckbox
                                    key={allergen.id}
                                    allergen={allergen}
                                    isSelected={localSelected.includes(allergen.id)}
                                    onToggle={() => toggleAllergen(allergen.id)}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4" style={{ borderColor: 'var(--border-light)' }}>
              {/* Safe items count */}
              {localSelected.length > 0 && (
                <p className="mb-3 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-semibold" style={{ color: 'var(--status-success)' }}>
                    {safeItemsCount}
                  </span>{' '}
                  of {totalItemsCount} items are safe for you
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  className="flex-1 rounded-full py-3 text-sm font-semibold"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  Clear All
                </button>
                <button
                  onClick={handleApply}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
                  style={{
                    background: 'var(--interactive-primary)',
                    color: 'var(--text-inverse)',
                  }}
                >
                  <Funnel size={18} />
                  {localSelected.length > 0 ? `Show ${safeItemsCount} Safe Items` : 'Apply Filter'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Allergen checkbox component
function AllergenCheckbox({
  allergen,
  isSelected,
  onToggle,
  showGroup = false,
}: {
  allergen: { id: string; name: string; icon: string; group?: string };
  isSelected: boolean;
  onToggle: () => void;
  showGroup?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center gap-3 rounded-xl p-3 transition-all"
      style={{
        background: isSelected ? 'var(--interactive-primary)' : 'var(--bg-secondary)',
        border: isSelected
          ? '2px solid var(--interactive-primary)'
          : '1px solid var(--border-light)',
      }}
    >
      <span className="text-xl">{allergen.icon}</span>
      <div className="flex-1 text-left">
        <p
          className="text-sm font-medium"
          style={{
            color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
          }}
        >
          {allergen.name}
        </p>
        {showGroup && allergen.group && (
          <p
            className="text-xs"
            style={{
              color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)',
            }}
          >
            {allergen.group}
          </p>
        )}
      </div>
      {isSelected && <Check size={18} weight="bold" style={{ color: 'var(--text-inverse)' }} />}
    </button>
  );
}
