'use client';

import { useState, useMemo } from 'react';
import { X } from '@phosphor-icons/react';
import type { ServiceCategoryWithItems } from '@/types/stay';
import type { ServiceCartReturn } from '@/hooks/useServiceCart';
import ServiceItemCard from './ServiceItemCard';

/** Check if a service item is currently available based on property timezone. */
function isItemAvailableNow(
  isAlwaysAvailable: boolean,
  availableFrom: string | null,
  availableUntil: string | null,
  timezone: string
): boolean {
  if (isAlwaysAvailable) return true;
  if (!availableFrom || !availableUntil) return true;

  const now = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  });

  // HH:MM string comparison works for 24h format
  return now >= availableFrom && now <= availableUntil;
}

/** Map Phosphor icon names (from DB seed) to emoji for display. */
const ICON_NAME_TO_EMOJI: Record<string, string> = {
  CookingPot: '🍳',
  Broom: '🧹',
  ShoppingCart: '🛒',
  Bed: '🛏️',
  Coffee: '☕',
  Swim: '🏊',
  SwimmingPool: '🏊',
  Car: '🚗',
  Shirt: '👔',
  TShirt: '👔',
  WashingMachine: '🧺',
  Wine: '🍷',
  ForkKnife: '🍽️',
  Taxi: '🚕',
  Bicycle: '🚲',
  FirstAid: '🏥',
  Barbell: '🏋️',
  Bathtub: '🛁',
  Flower: '🌸',
  Package: '📦',
};

/** Category icon mapping -- emoji fallback from icon field or default. */
function getCategoryIcon(icon: string | null): string {
  if (!icon) return '📦';
  // If already an emoji (non-ASCII or short), return as-is
  if (/[^\u0020-\u007E]/.test(icon)) return icon;
  // Map Phosphor icon name to emoji
  return ICON_NAME_TO_EMOJI[icon] ?? '📦';
}

interface ServiceCatalogProps {
  categories: ServiceCategoryWithItems[];
  cart: ServiceCartReturn;
  timezone: string;
  propertyCurrency: string;
  onClose: () => void;
}

export default function ServiceCatalog({
  categories,
  cart,
  timezone,
  propertyCurrency,
  onClose,
}: ServiceCatalogProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id ?? '');

  const selectedCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategoryId) ?? categories[0],
    [categories, selectedCategoryId]
  );

  // Sort items: available first, then unavailable
  const sortedItems = useMemo(() => {
    if (!selectedCategory) return [];
    return [...selectedCategory.items].sort((a, b) => {
      const aAvail =
        a.inStock &&
        isItemAvailableNow(a.isAlwaysAvailable, a.availableFrom, a.availableUntil, timezone);
      const bAvail =
        b.inStock &&
        isItemAvailableNow(b.isAlwaysAvailable, b.availableFrom, b.availableUntil, timezone);
      if (aAvail === bAvail) return 0;
      return aAvail ? -1 : 1;
    });
  }, [selectedCategory, timezone]);

  if (categories.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E2D9] px-4 py-3">
        <h2 className="text-lg font-semibold text-[#2D2016]">Services</h2>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#8B7355] transition-colors hover:bg-[#FAF8F5]"
          aria-label="Close catalog"
        >
          <X size={20} weight="bold" />
        </button>
      </div>

      {/* Category tabs */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto border-b border-[#E8E2D9] px-4 py-2">
        {categories.map((cat) => {
          const isActive = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#3D8B87] text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-[#8B7355] hover:bg-[#F0EBE3]'
              }`}
            >
              <span className="text-sm">{getCategoryIcon(cat.icon)}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {selectedCategory?.description && (
          <p className="mb-3 text-xs text-[#8B7355]">{selectedCategory.description}</p>
        )}

        <div className="grid grid-cols-2 gap-3">
          {sortedItems.map((item) => {
            const available =
              item.inStock &&
              isItemAvailableNow(
                item.isAlwaysAvailable,
                item.availableFrom,
                item.availableUntil,
                timezone
              );
            const cartItem = cart.getCartItem(item.id);
            return (
              <ServiceItemCard
                key={item.id}
                item={item}
                isAvailable={available}
                cartQuantity={cartItem?.quantity ?? 0}
                onAdd={() => cart.addItem(item)}
                onRemove={() => {
                  if (cartItem && cartItem.quantity > 1) {
                    cart.updateQuantity(item.id, cartItem.quantity - 1);
                  } else {
                    cart.removeItem(item.id);
                  }
                }}
                currency={propertyCurrency}
                timezone={timezone}
              />
            );
          })}
        </div>

        {sortedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-[#8B7355]">No items in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
