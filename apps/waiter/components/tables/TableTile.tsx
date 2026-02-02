'use client';

/**
 * Table Tile Component (Compact View)
 *
 * Colored tile with table number and notification badge.
 * Designed for high-density grid display.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TableStatus = 'ok' | 'pending' | 'urgent' | 'payment' | 'ready' | 'empty';

interface TableTileProps {
  tableNumber: string;
  status: TableStatus;
  badge?: string | number; // Number of requests, '€' for payment, '!' for ready
  onTap?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const statusColors: Record<TableStatus, { bg: string; text: string; border: string }> = {
  ok: {
    bg: 'bg-green-500 dark:bg-green-600',
    text: 'text-white',
    border: 'border-green-600 dark:border-green-500',
  },
  pending: {
    bg: 'bg-yellow-400 dark:bg-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-100',
    border: 'border-yellow-500 dark:border-yellow-400',
  },
  urgent: {
    bg: 'bg-red-500 dark:bg-red-600',
    text: 'text-white',
    border: 'border-red-600 dark:border-red-500',
  },
  payment: {
    bg: 'bg-blue-500 dark:bg-blue-600',
    text: 'text-white',
    border: 'border-blue-600 dark:border-blue-500',
  },
  ready: {
    bg: 'bg-orange-500 dark:bg-orange-600',
    text: 'text-white',
    border: 'border-orange-600 dark:border-orange-500',
  },
  empty: {
    bg: 'bg-gray-300 dark:bg-gray-700',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-400 dark:border-gray-600',
  },
};

const sizeClasses = {
  sm: 'w-14 h-14 text-lg',
  md: 'w-16 h-16 text-xl',
  lg: 'w-20 h-20 text-2xl',
};

export function TableTile({
  tableNumber,
  status,
  badge,
  onTap,
  size = 'md',
}: TableTileProps) {
  const colors = statusColors[status];

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onTap}
      className={cn(
        'relative rounded-xl font-bold shadow-md transition-shadow',
        'flex items-center justify-center',
        'border-2',
        'active:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-brand-primary',
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size]
      )}
      aria-label={`Tavolo ${tableNumber}, stato: ${status}${badge ? `, ${badge} notifiche` : ''}`}
    >
      {/* Table number */}
      <span className="font-bold">{tableNumber}</span>

      {/* Badge */}
      {badge && (
        <span
          className={cn(
            'absolute -top-1.5 -right-1.5',
            'min-w-[20px] h-5 px-1',
            'flex items-center justify-center',
            'rounded-full text-xs font-bold',
            'bg-white text-gray-900 shadow-md',
            'border border-gray-200'
          )}
        >
          {badge}
        </span>
      )}
    </motion.button>
  );
}

/**
 * Determine table status based on requests and state
 */
export function getTableStatus(
  requestCount: number,
  hasPaymentRequest: boolean,
  hasReadyOrder: boolean,
  oldestRequestMinutes: number,
  isAssigned: boolean
): TableStatus {
  if (!isAssigned) return 'empty';
  if (hasPaymentRequest) return 'payment';
  if (hasReadyOrder) return 'ready';
  if (requestCount > 0 && oldestRequestMinutes >= 2) return 'urgent';
  if (requestCount > 0) return 'pending';
  return 'ok';
}

/**
 * Get badge content for table
 */
export function getTableBadge(
  requestCount: number,
  hasPaymentRequest: boolean,
  hasReadyOrder: boolean
): string | number | undefined {
  if (hasPaymentRequest) return '€';
  if (hasReadyOrder) return '!';
  if (requestCount > 0) return requestCount;
  return undefined;
}
