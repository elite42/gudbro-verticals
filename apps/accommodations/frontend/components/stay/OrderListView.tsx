'use client';

import { useMemo, useState } from 'react';
import type { ServiceOrder } from '@/types/stay';
import OrderDetailSheet, { CATEGORY_TAG_CONFIG } from './OrderDetailSheet';

/** Currencies with 0 decimal places (minor unit = major unit). */
const ZERO_DECIMAL_CURRENCIES = new Set(['VND', 'JPY', 'KRW', 'CLP', 'ISK', 'UGX', 'RWF']);

function formatPrice(minorUnits: number, currency: string): string {
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase());
  const amount = isZeroDecimal ? minorUnits : minorUnits / 100;

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: isZeroDecimal ? 0 : 2,
    maximumFractionDigits: isZeroDecimal ? 0 : 2,
  }).format(amount);
}

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  pending: { label: 'Submitted', color: 'bg-amber-50 text-amber-700' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-50 text-blue-700' },
  preparing: { label: 'Preparing', color: 'bg-purple-50 text-purple-700' },
  ready: { label: 'Ready', color: 'bg-green-50 text-green-700' },
  delivered: { label: 'Delivered', color: 'bg-gray-50 text-gray-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-[#E07A5F]' },
};

function formatShortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

function summarizeItems(items: ServiceOrder['items']): string {
  if (items.length === 0) return 'No items';
  const names = items.slice(0, 2).map((i) => i.name);
  const remaining = items.length - 2;
  if (remaining > 0) {
    return `${names.join(', ')} and ${remaining} more`;
  }
  return names.join(', ');
}

interface OrderListViewProps {
  orders: ServiceOrder[];
  currency: string;
  propertyName?: string;
  bookingCode?: string;
  token?: string;
  onOrderUpdated?: () => void;
}

export default function OrderListView({
  orders,
  currency,
  propertyName,
  bookingCode,
  token,
  onOrderUpdated,
}: OrderListViewProps) {
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);

  // Group orders by category
  const categoryGroups = useMemo(() => {
    const groups: Record<string, ServiceOrder[]> = {};
    for (const order of orders) {
      const tag = order.categoryTag || 'general';
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(order);
    }
    return groups;
  }, [orders]);

  const availableCategories = Object.keys(categoryGroups);

  // Default to category with most orders
  const defaultCategory = useMemo(() => {
    if (availableCategories.length === 0) return '';
    return availableCategories.reduce((best, cat) =>
      (categoryGroups[cat]?.length ?? 0) > (categoryGroups[best]?.length ?? 0) ? cat : best
    );
  }, [availableCategories, categoryGroups]);

  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  // If selectedCategory not in available categories, reset
  const activeCategory = availableCategories.includes(selectedCategory)
    ? selectedCategory
    : defaultCategory;

  const filteredOrders = categoryGroups[activeCategory] ?? [];

  if (orders.length === 0) {
    return (
      <div className="py-6 text-center">
        <span className="mb-2 block text-2xl">📋</span>
        <p className="text-sm text-[#8B7355]">No orders yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">📋</span>
        <h3 className="font-semibold text-[#2D2016]">Orders</h3>
      </div>

      {/* Category tabs -- horizontal scroll, no "All" tab */}
      <div className="-mx-4 mb-3 overflow-x-auto px-4">
        <div className="flex gap-2">
          {availableCategories.map((cat) => {
            const config = CATEGORY_TAG_CONFIG[cat] ?? CATEGORY_TAG_CONFIG.general;
            const count = categoryGroups[cat]?.length ?? 0;
            const isActive = cat === activeCategory;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive ? 'bg-[#3D8B87] text-white' : 'bg-[#FAF8F5] text-[#8B7355]'
                }`}
              >
                <span>{config.emoji}</span>
                <span>{config.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#E8E2D9] text-[#8B7355]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered order list */}
      {filteredOrders.length === 0 ? (
        <div className="py-6 text-center">
          <span className="mb-2 block text-2xl">
            {(CATEGORY_TAG_CONFIG[activeCategory] ?? CATEGORY_TAG_CONFIG.general).emoji}
          </span>
          <p className="text-sm text-[#8B7355]">No orders in this category</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredOrders.map((order) => {
            const badge = STATUS_BADGES[order.status] ?? STATUS_BADGES.pending;
            const tagConfig = CATEGORY_TAG_CONFIG[order.categoryTag] ?? CATEGORY_TAG_CONFIG.general;

            return (
              <button
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="w-full rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] p-3 text-left transition-colors active:bg-[#F0EBE3]"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagConfig.color}`}
                    >
                      {tagConfig.emoji} {tagConfig.label}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <span className="text-xs text-[#8B7355]">{formatShortDate(order.createdAt)}</span>
                </div>

                <div className="flex items-end justify-between">
                  <p className="line-clamp-1 text-xs text-[#8B7355]">
                    {summarizeItems(order.items)}
                  </p>
                  <p className="ml-2 shrink-0 text-sm font-semibold text-[#2D2016]">
                    {formatPrice(order.total, currency)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Order detail sheet */}
      <OrderDetailSheet
        order={selectedOrder}
        currency={currency}
        onClose={() => setSelectedOrder(null)}
        propertyName={propertyName}
        bookingCode={bookingCode}
        token={token}
        onOrderUpdated={() => {
          onOrderUpdated?.();
          setSelectedOrder(null);
        }}
      />
    </>
  );
}
