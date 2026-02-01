'use client';

import type { ServiceOrder } from '@/types/stay';
import OrderStatusTimeline from './OrderStatusTimeline';

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

export const CATEGORY_TAG_CONFIG: Record<string, { label: string; color: string; emoji: string }> =
  {
    food: { label: 'Food', color: 'bg-orange-100 text-orange-700', emoji: '🍽️' },
    beverage: { label: 'Drinks', color: 'bg-purple-100 text-purple-700', emoji: '🍷' },
    laundry: { label: 'Laundry', color: 'bg-blue-100 text-blue-700', emoji: '👔' },
    minibar: { label: 'Minibar', color: 'bg-pink-100 text-pink-700', emoji: '🍫' },
    spa: { label: 'Spa', color: 'bg-teal-100 text-teal-700', emoji: '🧖' },
    transport: { label: 'Transport', color: 'bg-amber-100 text-amber-700', emoji: '🚗' },
    activity: { label: 'Activity', color: 'bg-green-100 text-green-700', emoji: '🎯' },
    general: { label: 'Other', color: 'bg-gray-100 text-gray-600', emoji: '📦' },
  };

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  pending: { label: 'Submitted', color: 'bg-amber-50 text-amber-700' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-50 text-blue-700' },
  preparing: { label: 'Preparing', color: 'bg-purple-50 text-purple-700' },
  ready: { label: 'Ready', color: 'bg-green-50 text-green-700' },
  delivered: { label: 'Delivered', color: 'bg-gray-50 text-gray-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-[#E07A5F]' },
};

interface OrderDetailSheetProps {
  order: ServiceOrder | null;
  currency: string;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function OrderDetailSheet({ order, currency, onClose }: OrderDetailSheetProps) {
  if (!order) return null;

  const badge = STATUS_BADGES[order.status] ?? STATUS_BADGES.pending;
  const categoryTag = CATEGORY_TAG_CONFIG[order.categoryTag] ?? CATEGORY_TAG_CONFIG.general;

  return (
    <div className="fixed inset-0 z-[60] flex items-end" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Sheet panel */}
      <div
        className="relative z-10 max-h-[80vh] w-full overflow-y-auto rounded-t-3xl bg-white pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 flex justify-center rounded-t-3xl bg-white pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-[#E8E2D9]" />
        </div>

        <div className="px-5">
          {/* Header: status + date */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.color}`}>
                {badge.label}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryTag.color}`}
              >
                {categoryTag.emoji} {categoryTag.label}
              </span>
            </div>
            <span className="text-xs text-[#8B7355]">{formatDate(order.createdAt)}</span>
          </div>

          {/* Items list */}
          <div className="mb-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8B7355]">
              Items
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => {
                const itemTag = item.categoryTag
                  ? (CATEGORY_TAG_CONFIG[item.categoryTag] ?? CATEGORY_TAG_CONFIG.general)
                  : null;
                return (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-[#2D2016]">
                          {item.quantity}x {item.name}
                        </p>
                        {itemTag && (
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${itemTag.color}`}
                          >
                            {itemTag.emoji}
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="mt-0.5 text-xs italic text-[#8B7355]">{item.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#8B7355]">
                        {formatPrice(item.unitPrice, currency)} ea
                      </p>
                      <p className="text-sm font-medium text-[#2D2016]">
                        {formatPrice(item.total, currency)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price breakdown */}
          <div className="mb-4 rounded-xl bg-[#FAF8F5] p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#8B7355]">Subtotal</span>
              <span className="text-[#2D2016]">{formatPrice(order.subtotal, currency)}</span>
            </div>
            {order.tax > 0 && (
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-[#8B7355]">Tax</span>
                <span className="text-[#2D2016]">{formatPrice(order.tax, currency)}</span>
              </div>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-[#E8E2D9] pt-2">
              <span className="text-sm font-semibold text-[#2D2016]">Total</span>
              <span className="text-sm font-semibold text-[#2D2016]">
                {formatPrice(order.total, currency)}
              </span>
            </div>
          </div>

          {/* Delivery info */}
          {(order.requestedTime || order.deliveryNotes) && (
            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8B7355]">
                Delivery Info
              </h4>
              {order.requestedTime && (
                <p className="text-sm text-[#2D2016]">
                  Requested: {formatDate(order.requestedTime)}
                </p>
              )}
              {order.deliveryNotes && (
                <p className="mt-1 text-sm text-[#8B7355]">{order.deliveryNotes}</p>
              )}
            </div>
          )}

          {/* Timeline */}
          <div className="mt-2">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#8B7355]">
              Status
            </h4>
            <OrderStatusTimeline status={order.status} createdAt={order.createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
}
