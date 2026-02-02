'use client';

/**
 * Order Card Component
 *
 * Displays a single order with its items and status.
 */

import {
  ClipboardText,
  Clock,
  CheckCircle,
  CookingPot,
  Tray,
  CaretRight,
  Warning
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { Order, OrderStatus } from '@/lib/stores/orders-store';

interface OrderCardProps {
  order: Order;
  onPress?: (order: Order) => void;
  onMarkServed?: (orderId: string) => Promise<void>;
}

const statusConfig: Record<OrderStatus, { icon: typeof Clock; label: string; color: string; bgColor: string }> = {
  pending: { icon: Clock, label: 'In attesa', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-800' },
  confirmed: { icon: CheckCircle, label: 'Confermato', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  preparing: { icon: CookingPot, label: 'In preparazione', color: 'text-amber-600', bgColor: 'bg-amber-100 dark:bg-amber-900/30' },
  ready: { icon: Warning, label: 'Pronto', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  served: { icon: Tray, label: 'Servito', color: 'text-emerald-600', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' },
  completed: { icon: CheckCircle, label: 'Completato', color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800' },
  cancelled: { icon: Warning, label: 'Annullato', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' },
};

function formatTime(dateString: string): string {
  return new Date(dateString).toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function OrderCard({ order, onPress, onMarkServed }: OrderCardProps) {
  const config = statusConfig[order.status];
  const Icon = config.icon;
  const isReady = order.status === 'ready';

  const handleMarkServed = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkServed) {
      await onMarkServed(order.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        card overflow-hidden
        ${isReady ? 'border-green-300 dark:border-green-700 ring-2 ring-green-500/20' : ''}
      `}
      onClick={() => onPress?.(order)}
    >
      {/* Header */}
      <div className={`px-4 py-3 ${config.bgColor} flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <Icon size={20} weight="bold" className={config.color} />
          <span className={`font-semibold ${config.color}`}>{config.label}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-theme-text-secondary">
          <Clock size={14} weight="bold" />
          {formatTime(order.createdAt)}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Order info */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="font-bold text-lg text-theme-text-primary">
              Tavolo {order.tableNumber}
            </span>
            <span className="ml-2 text-sm text-theme-text-tertiary">
              #{order.orderNumber}
            </span>
          </div>
          <span className="font-semibold text-theme-text-primary">
            {formatCurrency(order.total)}
          </span>
        </div>

        {/* Items preview */}
        <div className="space-y-1 mb-3">
          {order.items.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-theme-text-secondary">
                <span className="font-medium text-theme-text-primary">{item.quantity}x</span>{' '}
                {item.productName}
              </span>
              {item.status === 'ready' && (
                <CheckCircle size={16} weight="fill" className="text-green-500" />
              )}
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="text-xs text-theme-text-tertiary">
              +{order.items.length - 3} altri articoli
            </span>
          )}
        </div>

        {/* Notes */}
        {order.notes && (
          <p className="text-sm text-theme-text-secondary bg-theme-bg-tertiary rounded-lg p-2 mb-3">
            {order.notes}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isReady && onMarkServed && (
            <button
              onClick={handleMarkServed}
              className="btn-success flex-1 py-2.5"
            >
              <Tray size={20} weight="bold" />
              Segna come servito
            </button>
          )}

          {onPress && (
            <button
              onClick={() => onPress(order)}
              className={`btn-ghost p-2.5 ${!isReady ? 'flex-1' : ''}`}
              aria-label="Dettagli ordine"
            >
              {!isReady && <span>Dettagli</span>}
              <CaretRight size={20} weight="bold" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
