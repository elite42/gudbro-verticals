/**
 * Offline Queue Store
 *
 * Manages actions that need to be synced when back online.
 * Persists to localStorage for resilience.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OfflineActionType =
  | 'acknowledge_request'
  | 'complete_request'
  | 'assign_table'
  | 'mark_served';

export interface OfflineAction {
  id: string;
  type: OfflineActionType;
  payload: Record<string, unknown>;
  createdAt: string;
  retryCount: number;
  lastError?: string;
}

interface OfflineQueueState {
  actions: OfflineAction[];
  isSyncing: boolean;
  lastSyncAt: string | null;

  // Actions
  addAction: (type: OfflineActionType, payload: Record<string, unknown>) => void;
  removeAction: (id: string) => void;
  updateAction: (id: string, updates: Partial<OfflineAction>) => void;
  clearQueue: () => void;
  setSyncing: (syncing: boolean) => void;
  setLastSync: (date: string) => void;
}

function generateId(): string {
  return `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const useOfflineQueueStore = create<OfflineQueueState>()(
  persist(
    (set) => ({
      actions: [],
      isSyncing: false,
      lastSyncAt: null,

      addAction: (type, payload) =>
        set((state) => ({
          actions: [
            ...state.actions,
            {
              id: generateId(),
              type,
              payload,
              createdAt: new Date().toISOString(),
              retryCount: 0,
            },
          ],
        })),

      removeAction: (id) =>
        set((state) => ({
          actions: state.actions.filter((a) => a.id !== id),
        })),

      updateAction: (id, updates) =>
        set((state) => ({
          actions: state.actions.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      clearQueue: () => set({ actions: [] }),

      setSyncing: (isSyncing) => set({ isSyncing }),

      setLastSync: (lastSyncAt) => set({ lastSyncAt }),
    }),
    {
      name: 'waiter-offline-queue',
    }
  )
);

// Selector for pending actions count
export const selectPendingActionsCount = (state: OfflineQueueState) =>
  state.actions.length;

// Selector for actions by type
export const selectActionsByType = (type: OfflineActionType) => (state: OfflineQueueState) =>
  state.actions.filter((a) => a.type === type);
