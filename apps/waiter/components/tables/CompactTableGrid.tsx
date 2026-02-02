'use client';

/**
 * Compact Table Grid Component
 *
 * High-density grid of table tiles for quick overview.
 * Designed for waiters managing many tables (7+).
 */

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chair, Plus, SquaresFour, Rows } from '@phosphor-icons/react';
import { TableTile, getTableStatus, getTableBadge } from './TableTile';
import type { TableAssignment } from '@/lib/stores/assignments-store';
import type { CustomerRequest } from '@/lib/stores/requests-store';
import type { Order } from '@/lib/stores/orders-store';

interface CompactTableGridProps {
  assignments: TableAssignment[];
  requests: CustomerRequest[];
  orders: Order[];
  onTableTap: (assignment: TableAssignment) => void;
  onAddTable: () => void;
  viewMode: 'cards' | 'compact';
  onToggleView: () => void;
}

export function CompactTableGrid({
  assignments,
  requests,
  orders,
  onTableTap,
  onAddTable,
  viewMode,
  onToggleView,
}: CompactTableGridProps) {
  // Calculate status for each table
  const tableData = useMemo(() => {
    return assignments
      .filter((a) => a.status !== 'completed')
      .map((assignment) => {
        const tableRequests = requests.filter(
          (r) => r.tableId === assignment.tableId &&
            (r.status === 'pending' || r.status === 'acknowledged')
        );

        const tableOrders = orders.filter(
          (o) => o.tableId === assignment.tableId && o.status === 'ready'
        );

        const hasPaymentRequest = tableRequests.some(
          (r) => r.type === 'request_bill'
        );

        const hasReadyOrder = tableOrders.length > 0;

        // Calculate oldest request age in minutes
        const oldestRequestTime = tableRequests.reduce((oldest, req) => {
          const reqTime = new Date(req.createdAt).getTime();
          return reqTime < oldest ? reqTime : oldest;
        }, Date.now());
        const oldestRequestMinutes = Math.floor(
          (Date.now() - oldestRequestTime) / 60000
        );

        const status = getTableStatus(
          tableRequests.length,
          hasPaymentRequest,
          hasReadyOrder,
          oldestRequestMinutes,
          true
        );

        const badge = getTableBadge(
          tableRequests.length,
          hasPaymentRequest,
          hasReadyOrder
        );

        return {
          assignment,
          status,
          badge,
          requestCount: tableRequests.length,
        };
      })
      .sort((a, b) => {
        // Sort by urgency: urgent > payment > ready > pending > ok
        const priority = { urgent: 0, payment: 1, ready: 2, pending: 3, ok: 4, empty: 5 };
        return priority[a.status] - priority[b.status];
      });
  }, [assignments, requests, orders]);

  const activeCount = tableData.length;
  const urgentCount = tableData.filter((t) => t.status === 'urgent' || t.status === 'payment').length;

  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 mb-4 bg-theme-bg-tertiary rounded-full flex items-center justify-center">
          <Chair size={40} weight="duotone" className="text-theme-text-tertiary" />
        </div>
        <h3 className="text-lg font-semibold text-theme-text-primary">
          Nessun tavolo assegnato
        </h3>
        <p className="text-theme-text-secondary mt-1 max-w-xs">
          Scansiona un QR code per assegnarti a un tavolo
        </p>
        <button
          onClick={onAddTable}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-theme-brand-primary text-white rounded-xl font-medium"
        >
          <Plus size={20} weight="bold" />
          Aggiungi tavolo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-theme-text-primary">
            Tavoli ({activeCount})
          </h1>
          {urgentCount > 0 && (
            <p className="text-sm text-red-500 font-medium">
              {urgentCount} richiedono attenzione
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <button
            onClick={onToggleView}
            className="p-2 rounded-lg bg-theme-bg-secondary text-theme-text-secondary hover:text-theme-text-primary transition-colors"
            aria-label={viewMode === 'compact' ? 'Vista cards' : 'Vista compatta'}
          >
            {viewMode === 'compact' ? (
              <Rows size={20} weight="bold" />
            ) : (
              <SquaresFour size={20} weight="bold" />
            )}
          </button>
          {/* Add button */}
          <button
            onClick={onAddTable}
            className="p-2 rounded-lg bg-theme-brand-primary text-white"
            aria-label="Aggiungi tavolo"
          >
            <Plus size={20} weight="bold" />
          </button>
        </div>
      </div>

      {/* Color legend (collapsible) */}
      <div className="flex flex-wrap gap-2 text-xs text-theme-text-secondary">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-green-500" /> Ok
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-yellow-400" /> Richiesta
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-red-500" /> Urgente
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-500" /> Conto
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-orange-500" /> Pronto
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-2">
        <AnimatePresence mode="popLayout">
          {tableData.map(({ assignment, status, badge }) => (
            <motion.div
              key={assignment.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <TableTile
                tableNumber={assignment.tableNumber}
                status={status}
                badge={badge}
                onTap={() => onTableTap(assignment)}
                size="md"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
