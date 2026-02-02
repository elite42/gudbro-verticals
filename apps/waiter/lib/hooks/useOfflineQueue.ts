'use client';

/**
 * Offline Queue Hook
 *
 * Provides offline queue functionality with automatic sync when online.
 */

import { useEffect, useCallback } from 'react';
import {
  useOfflineQueueStore,
  selectPendingActionsCount,
  type OfflineActionType,
} from '@/lib/stores/offline-queue-store';
import { acknowledgeRequest, completeRequest, selfAssignToTable } from '@/lib/services/requests-service';

export function useOfflineQueue() {
  const {
    actions,
    isSyncing,
    addAction,
    removeAction,
    updateAction,
    setSyncing,
    setLastSync,
  } = useOfflineQueueStore();
  const pendingCount = useOfflineQueueStore(selectPendingActionsCount);

  // Process a single action
  const processAction = useCallback(async (action: typeof actions[0]): Promise<boolean> => {
    try {
      let result: { success: boolean; error?: string };

      switch (action.type) {
        case 'acknowledge_request':
          result = await acknowledgeRequest(action.payload.requestId as string);
          break;
        case 'complete_request':
          result = await completeRequest(action.payload.requestId as string);
          break;
        case 'assign_table':
          result = await selfAssignToTable(action.payload.tableId as string);
          break;
        default:
          console.warn('Unknown action type:', action.type);
          return false;
      }

      if (result.success) {
        removeAction(action.id);
        return true;
      } else {
        updateAction(action.id, {
          retryCount: action.retryCount + 1,
          lastError: result.error,
        });
        return false;
      }
    } catch (error) {
      updateAction(action.id, {
        retryCount: action.retryCount + 1,
        lastError: error instanceof Error ? error.message : 'Unknown error',
      });
      return false;
    }
  }, [removeAction, updateAction]);

  // Sync all pending actions
  const syncQueue = useCallback(async () => {
    if (isSyncing || actions.length === 0) return;

    setSyncing(true);

    for (const action of actions) {
      // Skip if too many retries
      if (action.retryCount >= 5) {
        console.error('Action failed after 5 retries:', action);
        continue;
      }

      await processAction(action);
    }

    setSyncing(false);
    setLastSync(new Date().toISOString());
  }, [actions, isSyncing, processAction, setSyncing, setLastSync]);

  // Queue an action (will be synced when online)
  const queueAction = useCallback((type: OfflineActionType, payload: Record<string, unknown>) => {
    addAction(type, payload);

    // Try to sync immediately if online
    if (navigator.onLine) {
      syncQueue();
    }
  }, [addAction, syncQueue]);

  // Sync when coming back online
  useEffect(() => {
    const handleOnline = () => {
      syncQueue();
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [syncQueue]);

  // Initial sync on mount if online
  useEffect(() => {
    if (navigator.onLine && actions.length > 0) {
      syncQueue();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    pendingCount,
    isSyncing,
    queueAction,
    syncQueue,
  };
}
