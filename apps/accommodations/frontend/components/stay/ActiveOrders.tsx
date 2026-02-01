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

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  pending: { label: 'Submitted', color: 'bg-amber-50 text-amber-700' },
  confirmed: { label: 'Confirmed', color: 'bg-blue-50 text-blue-700' },
  preparing: { label: 'Preparing', color: 'bg-purple-50 text-purple-700' },
  ready: { label: 'Ready', color: 'bg-green-50 text-green-700' },
  delivered: { label: 'Delivered', color: 'bg-gray-50 text-gray-500' },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-[#E07A5F]' },
};

interface ActiveOrdersProps {
  orders: ServiceOrder[];
  currency: string;
}

export default function ActiveOrders({ orders, currency }: ActiveOrdersProps) {
  // Filter active orders (not delivered/cancelled)
  const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  // If no active orders, don't render
  if (activeOrders.length === 0) return null;

  // Most recent active order shown prominently
  const [primaryOrder, ...otherOrders] = activeOrders;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">📋</span>
        <h3 className="font-semibold text-[#2D2016]">Active Orders</h3>
      </div>

      {/* Primary order -- full timeline */}
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs text-[#8B7355]">
            {primaryOrder.items.length} item{primaryOrder.items.length !== 1 ? 's' : ''}
          </p>
          <p className="text-sm font-semibold text-[#2D2016]">
            {formatPrice(primaryOrder.total, currency)}
          </p>
        </div>

        <div className="mb-2 space-y-0.5">
          {primaryOrder.items.map((item) => (
            <p key={item.id} className="text-xs text-[#8B7355]">
              {item.quantity}x {item.name}
            </p>
          ))}
        </div>

        <OrderStatusTimeline status={primaryOrder.status} createdAt={primaryOrder.createdAt} />
      </div>

      {/* Other active orders -- compact */}
      {otherOrders.length > 0 && (
        <div className="mt-2 space-y-2">
          {otherOrders.map((order) => {
            const badge = STATUS_BADGES[order.status] ?? STATUS_BADGES.pending;
            return (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-[#E8E2D9] bg-white px-3 py-2.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                  <span className="text-xs text-[#8B7355]">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="text-sm font-semibold text-[#2D2016]">
                  {formatPrice(order.total, currency)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
