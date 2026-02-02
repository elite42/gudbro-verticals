'use client';

/**
 * Table Bottom Sheet Component
 *
 * Slide-up panel showing table details, requests, orders, and actions.
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Bell,
  Receipt,
  Question,
  CheckCircle,
  Clock,
  CurrencyEur,
  DotsThree,
  CaretDown,
} from '@phosphor-icons/react';
import type { TableAssignment } from '@/lib/stores/assignments-store';
import type { CustomerRequest } from '@/lib/stores/requests-store';
import type { Order } from '@/lib/stores/orders-store';

interface TableBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: TableAssignment | null;
  requests: CustomerRequest[];
  orders: Order[];
  onAcknowledgeAll: () => void;
  onOpenPayment: () => void;
  onOpenMore: () => void;
}

const requestTypeIcons: Record<string, { icon: typeof Bell; label: string }> = {
  call_waiter: { icon: Bell, label: 'Chiamata cameriere' },
  request_bill: { icon: Receipt, label: 'Richiesta conto' },
  need_help: { icon: Question, label: 'Richiesta aiuto' },
  order_ready: { icon: CheckCircle, label: 'Ordine pronto' },
  custom: { icon: Bell, label: 'Richiesta' },
};

export function TableBottomSheet({
  isOpen,
  onClose,
  assignment,
  requests,
  orders,
  onAcknowledgeAll,
  onOpenPayment,
  onOpenMore,
}: TableBottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!assignment) return null;

  // Filter pending/acknowledged requests
  const pendingRequests = requests.filter(
    (r) => r.status === 'pending' || r.status === 'acknowledged'
  );

  // Get orders for this table
  const tableOrders = orders.filter((o) => o.tableId === assignment.tableId);

  // Calculate time since assignment
  const assignedTime = new Date(assignment.assignedAt);
  const minutesSince = Math.floor((Date.now() - assignedTime.getTime()) / 60000);
  const timeString = minutesSince < 60
    ? `${minutesSince}min fa`
    : `${Math.floor(minutesSince / 60)}h ${minutesSince % 60}min fa`;

  // Get status badge
  const getStatusBadge = () => {
    const urgent = pendingRequests.some((r) => {
      const age = (Date.now() - new Date(r.createdAt).getTime()) / 60000;
      return age >= 2;
    });
    const hasPayment = pendingRequests.some((r) => r.type === 'request_bill');

    if (urgent) return { text: 'Urgente', color: 'bg-red-500 text-white' };
    if (hasPayment) return { text: 'Conto', color: 'bg-blue-500 text-white' };
    if (pendingRequests.length > 0) return { text: 'Attesa', color: 'bg-yellow-400 text-yellow-900' };
    return { text: 'Ok', color: 'bg-green-500 text-white' };
  };

  const statusBadge = getStatusBadge();

  // Format request time
  const formatRequestTime = (createdAt: string) => {
    const mins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
    if (mins < 1) return 'Ora';
    return `${mins}:${String(Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000) % 60).padStart(2, '0')}`;
  };

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
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-hidden rounded-t-3xl bg-theme-bg-primary shadow-2xl"
          >
            {/* Drag handle */}
            <div className="flex justify-center py-3">
              <button
                onClick={onClose}
                className="w-12 h-1.5 rounded-full bg-theme-bg-tertiary"
                aria-label="Chiudi"
              />
            </div>

            {/* Header */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-theme-text-primary">
                    Tavolo {assignment.tableNumber}
                  </h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusBadge.color}`}>
                    {statusBadge.text}
                  </span>
                </div>
                <p className="text-sm text-theme-text-secondary flex items-center gap-1">
                  <Clock size={14} weight="bold" />
                  Assegnato {timeString}
                  {pendingRequests.length > 0 && (
                    <span className="ml-2">• {pendingRequests.length} richieste</span>
                  )}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-theme-bg-secondary transition-colors"
                aria-label="Chiudi"
              >
                <X size={24} weight="bold" className="text-theme-text-secondary" />
              </button>
            </div>

            {/* Content */}
            <div className="px-4 pb-4 space-y-4 overflow-y-auto max-h-[50vh]">
              {/* Pending requests */}
              {pendingRequests.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
                    Richieste
                  </h3>
                  {pendingRequests.map((request) => {
                    const typeInfo = requestTypeIcons[request.type] || requestTypeIcons.custom;
                    const Icon = typeInfo.icon;
                    const isUrgent = (Date.now() - new Date(request.createdAt).getTime()) / 60000 >= 2;

                    return (
                      <div
                        key={request.id}
                        className={`flex items-center justify-between p-3 rounded-xl ${
                          isUrgent
                            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                            : 'bg-theme-bg-secondary'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon
                            size={20}
                            weight="fill"
                            className={isUrgent ? 'text-red-500' : 'text-theme-brand-primary'}
                          />
                          <span className={`font-medium ${isUrgent ? 'text-red-700 dark:text-red-300' : 'text-theme-text-primary'}`}>
                            {typeInfo.label}
                          </span>
                        </div>
                        <span className={`text-sm font-mono ${isUrgent ? 'text-red-600 dark:text-red-400' : 'text-theme-text-tertiary'}`}>
                          {formatRequestTime(request.createdAt)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Orders */}
              {tableOrders.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
                    Ordini
                  </h3>
                  {tableOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="p-3 rounded-xl bg-theme-bg-secondary"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-theme-text-primary">
                          Ordine #{order.id.slice(-4)}
                        </span>
                        <span className="font-bold text-theme-brand-primary">
                          €{order.total.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-theme-text-secondary line-clamp-1">
                        {order.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-xs">
                        {order.status === 'ready' ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            <span className="text-orange-600 dark:text-orange-400 font-medium">
                              Pronto da servire
                            </span>
                          </>
                        ) : order.status === 'served' ? (
                          <>
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-green-600 dark:text-green-400">Servito</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="text-yellow-600 dark:text-yellow-400">In preparazione</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {pendingRequests.length === 0 && tableOrders.length === 0 && (
                <div className="text-center py-8 text-theme-text-tertiary">
                  <CheckCircle size={40} weight="duotone" className="mx-auto mb-2 text-green-500" />
                  <p>Nessuna richiesta o ordine attivo</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-4 pb-6 pt-2 border-t border-theme-border-light">
              <div className="flex gap-2">
                <button
                  onClick={onAcknowledgeAll}
                  disabled={pendingRequests.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold bg-green-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={20} weight="bold" />
                  Gestito
                </button>
                <button
                  onClick={onOpenPayment}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold bg-blue-500 text-white"
                >
                  <CurrencyEur size={20} weight="bold" />
                  Conto
                </button>
                <button
                  onClick={onOpenMore}
                  className="py-3 px-4 rounded-xl font-semibold bg-theme-bg-secondary text-theme-text-secondary"
                  aria-label="Altre opzioni"
                >
                  <DotsThree size={20} weight="bold" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
