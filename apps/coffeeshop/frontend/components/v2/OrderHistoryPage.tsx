'use client';

/**
 * OrderHistoryPage v2
 *
 * Pagina cronologia ordini con design system v2.
 * Mostra gli ordini passati con stato e dettagli.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClockCounterClockwise,
  Receipt,
  CheckCircle,
  Clock,
  CookingPot,
  Package,
  XCircle,
  CaretRight,
  ShoppingBag,
} from '@phosphor-icons/react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { TierGate } from './TierGate';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  submittedAt: number;
  table_context?: {
    table_number: string | null;
    customer_name: string | null;
    consumption_type: 'dine-in' | 'takeaway';
  };
}

interface OrderHistoryPageProps {
  /** Orders to display */
  orders: Order[];
  /** Theme toggle handler */
  onThemeToggle: () => void;
  /** Current theme */
  isDark: boolean;
  /** Cart item count */
  cartCount?: number;
  /** Price formatter */
  formatPrice?: (price: number) => string;
  /** Navigation handler */
  activePage?: string;
  onNavigate?: (pageId: string) => void;
  /** Reorder callback */
  onReorder?: (order: Order) => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'In attesa',
    color: 'var(--status-warning)',
    bgColor: 'var(--status-warning-bg)',
  },
  confirmed: {
    icon: CheckCircle,
    label: 'Confermato',
    color: 'var(--status-info)',
    bgColor: 'var(--status-info-bg)',
  },
  preparing: {
    icon: CookingPot,
    label: 'In preparazione',
    color: 'var(--status-warning)',
    bgColor: 'var(--status-warning-bg)',
  },
  ready: {
    icon: Package,
    label: 'Pronto',
    color: 'var(--status-success)',
    bgColor: 'var(--status-success-bg)',
  },
  delivered: {
    icon: CheckCircle,
    label: 'Consegnato',
    color: 'var(--status-success)',
    bgColor: 'var(--status-success-bg)',
  },
  cancelled: {
    icon: XCircle,
    label: 'Annullato',
    color: 'var(--status-error)',
    bgColor: 'var(--status-error-bg)',
  },
};

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `Oggi, ${date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return `Ieri, ${date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays < 7) {
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  } else {
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
  }
}

export function OrderHistoryPage({
  orders,
  onThemeToggle,
  isDark,
  cartCount = 0,
  formatPrice = (p) => `${p.toLocaleString()} VND`,
  activePage,
  onNavigate,
  onReorder,
}: OrderHistoryPageProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
      />

      <main className="container-app safe-area-bottom pb-24 pt-4">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Cronologia ordini
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {orders.length > 0
              ? `${orders.length} ${orders.length === 1 ? 'ordine' : 'ordini'}`
              : 'Nessun ordine ancora'}
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div
              className="mb-4 flex h-24 w-24 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <Receipt size={48} weight="duotone" style={{ color: 'var(--text-tertiary)' }} />
            </div>
            <h2
              className="font-display text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Nessun ordine
            </h2>
            <p className="mt-2 max-w-xs text-sm" style={{ color: 'var(--text-secondary)' }}>
              I tuoi ordini appariranno qui dopo il primo acquisto
            </p>
            <TierGate feature="enableCart">
              <button
                onClick={() => onNavigate?.('menu')}
                className="mt-6 flex items-center gap-2 rounded-xl px-6 py-3 font-medium"
                style={{ background: 'var(--brand-warm)', color: 'white' }}
              >
                <ShoppingBag size={20} />
                Sfoglia il menu
              </button>
            </TierGate>
          </motion.div>
        )}

        {/* Orders List */}
        {orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const isExpanded = expandedOrderId === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="card overflow-hidden"
                >
                  {/* Order Header */}
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="flex w-full items-center gap-4 p-4 text-left"
                  >
                    {/* Status Icon */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                      style={{ background: status.bgColor }}
                    >
                      <StatusIcon size={24} weight="fill" style={{ color: status.color }} />
                    </div>

                    {/* Order Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          Ordine #{order.id.slice(-6).toUpperCase()}
                        </span>
                        <span
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{ background: status.bgColor, color: status.color }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                        {formatDate(order.submittedAt)} · {order.items.length}{' '}
                        {order.items.length === 1 ? 'articolo' : 'articoli'}
                      </p>
                    </div>

                    {/* Total & Expand */}
                    <div className="flex items-center gap-2">
                      <span
                        className="font-display font-semibold"
                        style={{ color: 'var(--brand-warm)' }}
                      >
                        {formatPrice(order.total)}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CaretRight size={20} style={{ color: 'var(--text-tertiary)' }} />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ borderTop: '1px solid var(--border-light)' }}
                      >
                        <div className="p-4">
                          {/* Items */}
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-12 w-12 rounded-lg object-cover"
                                  />
                                )}
                                <div className="min-w-0 flex-1">
                                  <p
                                    className="font-medium"
                                    style={{ color: 'var(--text-primary)' }}
                                  >
                                    {item.name}
                                  </p>
                                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                                    x{item.quantity} · {formatPrice(item.price)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Context Info */}
                          {order.table_context && (
                            <div
                              className="mt-4 rounded-lg p-3"
                              style={{ background: 'var(--bg-tertiary)' }}
                            >
                              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                {order.table_context.consumption_type === 'dine-in'
                                  ? `Tavolo ${order.table_context.table_number || '-'}`
                                  : 'Da asporto'}
                                {order.table_context.customer_name &&
                                  ` · ${order.table_context.customer_name}`}
                              </p>
                            </div>
                          )}

                          {/* Reorder Button */}
                          {onReorder && order.status === 'delivered' && (
                            <TierGate feature="enableCart">
                              <button
                                onClick={() => onReorder(order)}
                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium"
                                style={{
                                  background: 'var(--bg-tertiary)',
                                  color: 'var(--text-primary)',
                                }}
                              >
                                <ClockCounterClockwise size={20} />
                                Riordina
                              </button>
                            </TierGate>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav cartCount={cartCount} activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}

export default OrderHistoryPage;
