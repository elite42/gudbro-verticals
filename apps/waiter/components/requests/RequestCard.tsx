'use client';

/**
 * Request Card Component
 *
 * Displays a single customer request with actions.
 * Large touch targets for one-handed use.
 */

import { useState } from 'react';
import {
  Bell,
  Receipt,
  HandWaving,
  CheckCircle,
  Clock,
  Lightning,
  CaretRight
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import type { CustomerRequest, RequestType, RequestPriority } from '@/lib/stores/requests-store';

interface RequestCardProps {
  request: CustomerRequest;
  onAcknowledge?: (id: string) => Promise<void>;
  onComplete?: (id: string) => Promise<void>;
  onPress?: (request: CustomerRequest) => void;
}

const requestTypeConfig: Record<RequestType, { icon: typeof Bell; label: string; color: string }> = {
  call_waiter: { icon: Bell, label: 'Chiamata cameriere', color: 'blue' },
  request_bill: { icon: Receipt, label: 'Richiesta conto', color: 'green' },
  need_help: { icon: HandWaving, label: 'Assistenza', color: 'amber' },
  order_ready: { icon: CheckCircle, label: 'Ordine pronto', color: 'emerald' },
  custom: { icon: Bell, label: 'Richiesta', color: 'gray' },
};

const priorityConfig: Record<RequestPriority, { label: string; className: string }> = {
  urgent: { label: 'Urgente', className: 'status-urgent' },
  high: { label: 'Alta', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
  normal: { label: 'Normale', className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
  low: { label: 'Bassa', className: 'bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400' },
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Adesso';
  if (diffMins < 60) return `${diffMins} min fa`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} ore fa`;
  return date.toLocaleDateString('it-IT');
}

export function RequestCard({ request, onAcknowledge, onComplete, onPress }: RequestCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const typeConfig = requestTypeConfig[request.type] || requestTypeConfig.custom;
  const prioConfig = priorityConfig[request.priority];
  const Icon = typeConfig.icon;

  const isPending = request.status === 'pending';
  const isAcknowledged = request.status === 'acknowledged' || request.status === 'in_progress';
  const isUrgent = request.priority === 'urgent';

  const handleAcknowledge = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onAcknowledge || isLoading) return;

    setIsLoading(true);
    try {
      await onAcknowledge(request.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onComplete || isLoading) return;

    setIsLoading(true);
    try {
      await onComplete(request.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`
        card p-4
        ${isUrgent && isPending ? 'border-red-300 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10' : ''}
        ${isAcknowledged ? 'border-blue-300 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-900/10' : ''}
      `}
      onClick={() => onPress?.(request)}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
          ${isUrgent ? 'bg-red-100 dark:bg-red-900/30' : `bg-${typeConfig.color}-100 dark:bg-${typeConfig.color}-900/30`}
        `}>
          <Icon
            size={24}
            weight="duotone"
            className={isUrgent ? 'text-red-600 dark:text-red-400' : `text-${typeConfig.color}-600 dark:text-${typeConfig.color}-400`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-theme-text-primary">
                  Tavolo {request.tableNumber}
                </span>
                {request.priority !== 'normal' && (
                  <span className={`status-badge ${prioConfig.className}`}>
                    {isUrgent && <Lightning size={12} weight="bold" />}
                    {prioConfig.label}
                  </span>
                )}
              </div>
              <p className="text-sm text-theme-text-secondary">{typeConfig.label}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-theme-text-tertiary">
              <Clock size={14} weight="bold" />
              {formatTimeAgo(request.createdAt)}
            </div>
          </div>

          {/* Message if present */}
          {request.message && (
            <p className="mt-2 text-sm text-theme-text-secondary bg-theme-bg-tertiary rounded-lg p-2">
              {request.message}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            {isPending && onAcknowledge && (
              <button
                onClick={handleAcknowledge}
                disabled={isLoading}
                className="btn-primary flex-1 py-2.5"
              >
                {isLoading ? 'Attendere...' : 'Prendo io'}
              </button>
            )}

            {isAcknowledged && onComplete && (
              <button
                onClick={handleComplete}
                disabled={isLoading}
                className="btn-success flex-1 py-2.5"
              >
                {isLoading ? 'Attendere...' : 'Completato'}
              </button>
            )}

            {onPress && (
              <button
                onClick={() => onPress(request)}
                className="btn-ghost p-2.5"
                aria-label="Dettagli"
              >
                <CaretRight size={20} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
