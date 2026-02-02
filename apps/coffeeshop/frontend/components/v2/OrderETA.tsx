'use client';

/**
 * OrderETA Component
 *
 * Mostra il tempo stimato per un ordine con indicatore di confidence.
 */

import { motion } from 'framer-motion';
import { Clock, ArrowClockwise } from '@phosphor-icons/react';
import { OrderETA as OrderETAType } from '@/lib/order-service';

interface OrderETAProps {
  /** ETA data from API */
  eta: OrderETAType | null;
  /** Loading state */
  isLoading?: boolean;
  /** Formatted time string */
  formattedTime: string;
  /** Confidence color */
  confidenceColor: string;
  /** Optional refresh callback */
  onRefresh?: () => void;
  /** Compact mode (for inline display) */
  compact?: boolean;
}

export function OrderETA({
  eta,
  isLoading,
  formattedTime,
  confidenceColor,
  onRefresh,
  compact = false,
}: OrderETAProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <Clock
          size={16}
          weight="fill"
          style={{ color: confidenceColor }}
        />
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {isLoading ? '...' : formattedTime}
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <Clock size={22} weight="fill" style={{ color: confidenceColor }} />
          </div>
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--text-secondary)' }}
            >
              Estimated Time
            </p>
            <p
              className="font-display text-xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              {isLoading ? 'Calculating...' : formattedTime}
            </p>
          </div>
        </div>

        {onRefresh && (
          <motion.button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowClockwise
              size={18}
              className={isLoading ? 'animate-spin' : ''}
            />
          </motion.button>
        )}
      </div>

      {eta?.message && (
        <p
          className="mt-2 text-sm"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {eta.message}
        </p>
      )}

      {eta && (
        <div className="mt-3 flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: confidenceColor }}
          />
          <span
            className="text-xs font-medium uppercase"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {eta.confidence} confidence
          </span>
          {eta.itemsRemaining > 0 && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>·</span>
              <span
                className="text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {eta.itemsRemaining} items ahead
              </span>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default OrderETA;
