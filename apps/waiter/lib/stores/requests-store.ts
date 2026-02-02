/**
 * Requests Store
 *
 * Manages customer requests (calls, bill requests, etc.) using Zustand.
 * Supports real-time updates and priority sorting.
 */

import { create } from 'zustand';

export type RequestType = 'call_waiter' | 'request_bill' | 'need_help' | 'order_ready' | 'custom';
export type RequestStatus = 'pending' | 'acknowledged' | 'in_progress' | 'completed' | 'cancelled';
export type RequestPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface CustomerRequest {
  id: string;
  locationId: string;
  tableId: string;
  tableNumber: string;
  type: RequestType;
  status: RequestStatus;
  priority: RequestPriority;
  message?: string;
  createdAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  completedAt?: string;
  completedBy?: string;
}

interface RequestsState {
  requests: CustomerRequest[];
  isLoading: boolean;
  error: string | null;
  lastFetch: number | null;

  // Actions
  setRequests: (requests: CustomerRequest[]) => void;
  addRequest: (request: CustomerRequest) => void;
  updateRequest: (id: string, updates: Partial<CustomerRequest>) => void;
  removeRequest: (id: string) => void;
  acknowledgeRequest: (id: string, userId: string) => void;
  completeRequest: (id: string, userId: string) => void;
  clearRequests: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Priority order for sorting (higher = more urgent)
const priorityOrder: Record<RequestPriority, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

// Sort requests by priority (urgent first) then by creation time (oldest first)
function sortRequests(requests: CustomerRequest[]): CustomerRequest[] {
  return [...requests].sort((a, b) => {
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

export const useRequestsStore = create<RequestsState>((set) => ({
  requests: [],
  isLoading: false,
  error: null,
  lastFetch: null,

  setRequests: (requests) =>
    set({
      requests: sortRequests(requests),
      error: null,
      lastFetch: Date.now(),
    }),

  addRequest: (request) =>
    set((state) => ({
      requests: sortRequests([
        ...state.requests.filter((r) => r.id !== request.id),
        request,
      ]),
    })),

  updateRequest: (id, updates) =>
    set((state) => ({
      requests: sortRequests(
        state.requests.map((r) => (r.id === id ? { ...r, ...updates } : r))
      ),
    })),

  removeRequest: (id) =>
    set((state) => ({
      requests: state.requests.filter((r) => r.id !== id),
    })),

  acknowledgeRequest: (id, userId) =>
    set((state) => ({
      requests: sortRequests(
        state.requests.map((r) =>
          r.id === id
            ? {
                ...r,
                status: 'acknowledged' as RequestStatus,
                acknowledgedAt: new Date().toISOString(),
                acknowledgedBy: userId,
              }
            : r
        )
      ),
    })),

  completeRequest: (id, userId) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'completed' as RequestStatus,
              completedAt: new Date().toISOString(),
              completedBy: userId,
            }
          : r
      ),
    })),

  clearRequests: () => set({ requests: [] }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}));

// Selectors
export const selectPendingRequests = (state: RequestsState) =>
  state.requests.filter((r) => r.status === 'pending');

export const selectAcknowledgedRequests = (state: RequestsState) =>
  state.requests.filter((r) => r.status === 'acknowledged' || r.status === 'in_progress');

export const selectUrgentRequests = (state: RequestsState) =>
  state.requests.filter((r) => r.priority === 'urgent' && r.status === 'pending');

export const selectRequestsByTable = (tableId: string) => (state: RequestsState) =>
  state.requests.filter((r) => r.tableId === tableId);

export const selectPendingCount = (state: RequestsState) =>
  state.requests.filter((r) => r.status === 'pending').length;
