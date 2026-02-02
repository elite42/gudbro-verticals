/**
 * Assignments Store
 *
 * Manages the waiter's table assignments using Zustand.
 * Tracks which tables the current waiter is responsible for.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TableAssignment {
  id: string;
  tableId: string;
  tableNumber: string;
  tableName?: string;
  locationId: string;
  assignedAt: string;
  status: 'active' | 'pending' | 'completed';
  guestCount?: number;
}

interface AssignmentsState {
  assignments: TableAssignment[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setAssignments: (assignments: TableAssignment[]) => void;
  addAssignment: (assignment: TableAssignment) => void;
  removeAssignment: (tableId: string) => void;
  updateAssignment: (tableId: string, updates: Partial<TableAssignment>) => void;
  clearAssignments: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAssignmentsStore = create<AssignmentsState>()(
  persist(
    (set) => ({
      assignments: [],
      isLoading: false,
      error: null,

      setAssignments: (assignments) => set({ assignments, error: null }),

      addAssignment: (assignment) =>
        set((state) => ({
          assignments: [...state.assignments.filter(a => a.tableId !== assignment.tableId), assignment],
          error: null,
        })),

      removeAssignment: (tableId) =>
        set((state) => ({
          assignments: state.assignments.filter((a) => a.tableId !== tableId),
        })),

      updateAssignment: (tableId, updates) =>
        set((state) => ({
          assignments: state.assignments.map((a) =>
            a.tableId === tableId ? { ...a, ...updates } : a
          ),
        })),

      clearAssignments: () => set({ assignments: [] }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),
    }),
    {
      name: 'waiter-assignments',
      partialize: (state) => ({ assignments: state.assignments }),
    }
  )
);

// Selectors
export const selectActiveAssignments = (state: AssignmentsState) =>
  state.assignments.filter((a) => a.status === 'active');

export const selectAssignmentByTableId = (tableId: string) => (state: AssignmentsState) =>
  state.assignments.find((a) => a.tableId === tableId);

export const selectAssignmentCount = (state: AssignmentsState) =>
  state.assignments.filter((a) => a.status === 'active').length;
