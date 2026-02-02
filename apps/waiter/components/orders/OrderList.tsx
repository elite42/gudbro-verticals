'use client';

/**
 * Order List Component
 *
 * Displays a list of orders grouped by status.
 */

import { AnimatePresence } from 'framer-motion';
import { OrderCard } from './OrderCard';
import { ClipboardText, Warning, CookingPot, CheckCircle } from '@phosphor-icons/react';
import type { Order } from '@/lib/stores/orders-store';

interface OrderListProps {
  orders: Order[];
  onPress?: (order: Order) => void;
  onMarkServed?: (orderId: string) => Promise<void>;
  emptyMessage?: string;
}

export function OrderList({
  orders,
  onPress,
  onMarkServed,
  emptyMessage = 'Nessun ordine',
}: OrderListProps) {
  const readyOrders = orders.filter(o => o.status === 'ready');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const otherOrders = orders.filter(o => !['ready', 'preparing', 'completed', 'cancelled'].includes(o.status));

  const hasOrders = readyOrders.length > 0 || preparingOrders.length > 0 || otherOrders.length > 0;

  if (!hasOrders) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 mb-4 bg-theme-bg-tertiary rounded-full flex items-center justify-center">
          <ClipboardText size={40} weight="duotone" className="text-theme-text-tertiary" />
        </div>
        <h3 className="text-lg font-semibold text-theme-text-primary">Nessun ordine</h3>
        <p className="text-theme-text-secondary mt-1 max-w-xs">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Ready orders - highlight! */}
      {readyOrders.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Warning size={18} weight="fill" className="text-green-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
              Pronti da servire ({readyOrders.length})
            </h3>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {readyOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onPress={onPress}
                  onMarkServed={onMarkServed}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Preparing orders */}
      {preparingOrders.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CookingPot size={18} weight="duotone" className="text-amber-500" />
            <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
              In preparazione ({preparingOrders.length})
            </h3>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {preparingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onPress={onPress}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Other active orders */}
      {otherOrders.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <ClipboardText size={18} weight="duotone" className="text-theme-text-tertiary" />
            <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
              Altri ordini ({otherOrders.length})
            </h3>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {otherOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onPress={onPress}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
}
