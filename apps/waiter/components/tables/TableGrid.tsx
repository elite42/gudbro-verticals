'use client';

/**
 * Table Grid Component
 *
 * Displays a grid of assigned tables with filtering options.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chair, FunnelSimple, SortAscending } from '@phosphor-icons/react';
import { TableCard } from './TableCard';
import type { TableAssignment } from '@/lib/stores/assignments-store';

interface TableGridProps {
  assignments: TableAssignment[];
  requestCounts?: Record<string, number>;
  onTableTap?: (assignment: TableAssignment) => void;
  onUnassign?: (assignmentId: string) => void;
}

type FilterType = 'all' | 'active' | 'needs_attention';
type SortType = 'number' | 'time' | 'requests';

export function TableGrid({
  assignments,
  requestCounts = {},
  onTableTap,
  onUnassign,
}: TableGridProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('number');

  // Filter assignments
  const filteredAssignments = assignments.filter((a) => {
    if (filter === 'all') return a.status !== 'completed';
    return a.status === filter;
  });

  // Sort assignments
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    switch (sort) {
      case 'number':
        return parseInt(a.tableNumber) - parseInt(b.tableNumber);
      case 'time':
        return new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime();
      case 'requests':
        return (requestCounts[a.tableId] || 0) - (requestCounts[b.tableId] || 0);
      default:
        return 0;
    }
  });

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'Tutti' },
    { value: 'active', label: 'Attivi' },
    { value: 'needs_attention', label: 'Attenzione' },
  ];

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
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters and sort */}
      <div className="flex items-center justify-between gap-2">
        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === option.value
                  ? 'bg-theme-brand-primary text-white'
                  : 'bg-theme-bg-secondary text-theme-text-secondary hover:text-theme-text-primary'
              }`}
            >
              {option.value === 'all' && <FunnelSimple size={14} weight="bold" />}
              {option.label}
              {option.value !== 'all' && (
                <span className="ml-1 text-xs opacity-75">
                  ({assignments.filter((a) => a.status === option.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort button */}
        <button
          onClick={() => {
            const sorts: SortType[] = ['number', 'time', 'requests'];
            const currentIndex = sorts.indexOf(sort);
            setSort(sorts[(currentIndex + 1) % sorts.length]);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-theme-bg-secondary text-theme-text-secondary hover:text-theme-text-primary transition-colors"
          title={`Ordina per: ${sort === 'number' ? 'Numero' : sort === 'time' ? 'Tempo' : 'Richieste'}`}
        >
          <SortAscending size={14} weight="bold" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AnimatePresence mode="popLayout">
          {sortedAssignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <TableCard
                assignment={assignment}
                requestCount={requestCounts[assignment.tableId] || 0}
                onTap={() => onTableTap?.(assignment)}
                onUnassign={() => onUnassign?.(assignment.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state for filter */}
      {sortedAssignments.length === 0 && assignments.length > 0 && (
        <div className="text-center py-8 text-theme-text-secondary">
          <p>Nessun tavolo corrisponde al filtro selezionato</p>
        </div>
      )}
    </div>
  );
}
