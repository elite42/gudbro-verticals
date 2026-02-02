'use client';

/**
 * Table Card Component
 *
 * Displays a single table with status and quick actions.
 */

import { motion } from 'framer-motion';
import {
  Chair,
  Bell,
  Receipt,
  Clock,
  CheckCircle,
  XCircle,
} from '@phosphor-icons/react';
import type { TableAssignment } from '@/lib/stores/assignments-store';

interface TableCardProps {
  assignment: TableAssignment;
  requestCount?: number;
  onTap?: () => void;
  onUnassign?: () => void;
}

export function TableCard({
  assignment,
  requestCount = 0,
  onTap,
  onUnassign,
}: TableCardProps) {
  // Use requestCount to determine if table needs attention
  const needsAttention = requestCount > 0;

  const getStatusColor = () => {
    if (needsAttention) return 'bg-yellow-500';
    switch (assignment.status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = () => {
    if (needsAttention) {
      return <Bell size={16} weight="fill" className="text-yellow-600" />;
    }
    switch (assignment.status) {
      case 'active':
        return <CheckCircle size={16} weight="fill" className="text-green-600" />;
      case 'pending':
        return <Clock size={16} weight="fill" className="text-blue-600" />;
      case 'completed':
        return <XCircle size={16} weight="fill" className="text-gray-500" />;
      default:
        return null;
    }
  };

  const getTimeSince = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Ora';
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h`;
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className={`relative bg-theme-bg-primary rounded-2xl p-4 border-2 transition-colors cursor-pointer ${
        needsAttention
          ? 'border-yellow-400 dark:border-yellow-500'
          : 'border-theme-border-light hover:border-theme-brand-primary'
      }`}
    >
      {/* Status indicator */}
      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getStatusColor()}`} />

      {/* Table number */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-14 h-14 bg-theme-brand-secondary rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold text-theme-brand-primary">
            {assignment.tableNumber}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-theme-text-primary">
              Tavolo {assignment.tableNumber}
            </span>
            {getStatusIcon()}
          </div>
          <div className="flex items-center gap-1 text-sm text-theme-text-tertiary">
            <Clock size={14} weight="bold" />
            <span>{getTimeSince(assignment.assignedAt)}</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-4 text-sm">
        {requestCount > 0 && (
          <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400">
            <Bell size={16} weight="fill" />
            <span className="font-medium">{requestCount} richieste</span>
          </div>
        )}
        {requestCount === 0 && (
          <div className="flex items-center gap-1.5 text-theme-text-tertiary">
            <Chair size={16} weight="duotone" />
            <span>Nessuna richiesta</span>
          </div>
        )}
      </div>

      {/* Unassign button */}
      {onUnassign && assignment.status !== 'completed' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUnassign();
          }}
          className="absolute bottom-3 right-3 p-2 text-theme-text-tertiary hover:text-red-500 transition-colors"
          aria-label="Rimuovi assegnazione"
        >
          <XCircle size={20} weight="bold" />
        </button>
      )}
    </motion.div>
  );
}
