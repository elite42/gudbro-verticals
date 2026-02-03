'use client';

/**
 * Tables Page
 *
 * Shows grid of assigned tables with status and quick actions.
 * Supports both compact (grid) and card views based on settings.
 */

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAssignmentsStore } from '@/lib/stores/assignments-store';
import { useRequestsStore } from '@/lib/stores/requests-store';
import { useOrdersStore } from '@/lib/stores/orders-store';
import { useSettingsStore, getEffectiveViewMode } from '@/lib/stores/settings-store';
import { CompactTableGrid } from '@/components/tables/CompactTableGrid';
import { TableGrid } from '@/components/tables/TableGrid';
import { TableBottomSheet } from '@/components/tables/TableBottomSheet';
import { PaymentSheet } from '@/components/payment/PaymentSheet';
import type { TableAssignment } from '@/lib/stores/assignments-store';
import type { PaymentMethod } from '@/components/payment/PaymentSheet';

export default function TablesPage() {
  const router = useRouter();

  // Stores
  const { assignments, removeAssignment } = useAssignmentsStore();
  const { requests, updateRequest } = useRequestsStore();
  const { orders } = useOrdersStore();
  const { viewMode, autoSwitchThreshold, setViewMode } = useSettingsStore();

  // Local state
  const [selectedTable, setSelectedTable] = useState<TableAssignment | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isPaymentSheetOpen, setIsPaymentSheetOpen] = useState(false);

  // Calculate effective view mode
  const activeAssignments = assignments.filter((a) => a.status !== 'completed');
  const effectiveViewMode = getEffectiveViewMode(
    viewMode,
    activeAssignments.length,
    autoSwitchThreshold
  );

  // Get requests and orders for selected table
  const selectedTableRequests = useMemo(() => {
    if (!selectedTable) return [];
    return requests.filter((r) => r.tableId === selectedTable.tableId);
  }, [requests, selectedTable]);

  const selectedTableOrders = useMemo(() => {
    if (!selectedTable) return [];
    return orders.filter((o) => o.tableId === selectedTable.tableId);
  }, [orders, selectedTable]);

  // Calculate total for payment
  const selectedTableTotal = useMemo(() => {
    return selectedTableOrders.reduce((sum, o) => sum + o.total, 0);
  }, [selectedTableOrders]);

  // Handlers
  const handleTableTap = useCallback((assignment: TableAssignment) => {
    setSelectedTable(assignment);
    setIsBottomSheetOpen(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
    // Delay clearing selection to allow animation
    setTimeout(() => setSelectedTable(null), 300);
  }, []);

  const handleAcknowledgeAll = useCallback(() => {
    if (!selectedTable) return;

    // Mark all pending requests as completed
    selectedTableRequests
      .filter((r) => r.status === 'pending' || r.status === 'acknowledged')
      .forEach((r) => {
        updateRequest(r.id, { status: 'completed' });
      });

    handleCloseBottomSheet();
  }, [selectedTable, selectedTableRequests, updateRequest, handleCloseBottomSheet]);

  const handleOpenPayment = useCallback(() => {
    setIsBottomSheetOpen(false);
    setIsPaymentSheetOpen(true);
  }, []);

  const handleClosePayment = useCallback(() => {
    setIsPaymentSheetOpen(false);
    setSelectedTable(null);
  }, []);

  const handlePaymentComplete = useCallback(
    (method: PaymentMethod, details?: Record<string, unknown>) => {
      // In production: update order status, close table, etc.
      if (selectedTable) {
        // Mark as completed
        removeAssignment(selectedTable.id);
      }

      handleClosePayment();
    },
    [selectedTable, removeAssignment, handleClosePayment]
  );

  const handleOpenMore = useCallback(() => {
    // TODO: Implement more options menu
  }, [selectedTable]);

  const handleToggleView = useCallback(() => {
    if (viewMode === 'auto') {
      setViewMode(effectiveViewMode === 'compact' ? 'cards' : 'compact');
    } else {
      setViewMode(viewMode === 'compact' ? 'cards' : 'compact');
    }
  }, [viewMode, effectiveViewMode, setViewMode]);

  const handleAddTable = useCallback(() => {
    router.push('/scan');
  }, [router]);

  // Calculate request counts per table (for card view)
  const requestCounts = useMemo(() => {
    return requests.reduce(
      (acc, req) => {
        if (req.status === 'pending' || req.status === 'acknowledged') {
          acc[req.tableId] = (acc[req.tableId] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>
    );
  }, [requests]);

  return (
    <div className="p-4">
      {/* Compact view (grid of tiles) */}
      {effectiveViewMode === 'compact' ? (
        <CompactTableGrid
          assignments={assignments}
          requests={requests}
          orders={orders}
          onTableTap={handleTableTap}
          onAddTable={handleAddTable}
          viewMode={effectiveViewMode}
          onToggleView={handleToggleView}
        />
      ) : (
        /* Card view (larger cards with more info) */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-theme-text-primary text-xl font-bold">I miei tavoli</h1>
              <p className="text-theme-text-secondary text-sm">
                {activeAssignments.length} tavoli attivi
              </p>
            </div>
          </div>
          <TableGrid
            assignments={assignments}
            requestCounts={requestCounts}
            onTableTap={handleTableTap}
            onUnassign={(id) => {
              if (confirm('Sei sicuro di voler rimuovere questa assegnazione?')) {
                removeAssignment(id);
              }
            }}
          />
        </div>
      )}

      {/* Table detail bottom sheet */}
      <TableBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        assignment={selectedTable}
        requests={selectedTableRequests}
        orders={selectedTableOrders}
        onAcknowledgeAll={handleAcknowledgeAll}
        onOpenPayment={handleOpenPayment}
        onOpenMore={handleOpenMore}
      />

      {/* Payment sheet */}
      <PaymentSheet
        isOpen={isPaymentSheetOpen}
        onClose={handleClosePayment}
        tableNumber={selectedTable?.tableNumber || ''}
        total={selectedTableTotal || 45.5} // Default for demo
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}
