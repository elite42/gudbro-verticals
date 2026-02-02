'use client';

/**
 * OrderTracker Component
 *
 * Progress tracker animato per lo stato dell'ordine.
 * Mostra gli step con progress bar e stato corrente.
 */

import { motion } from 'framer-motion';
import {
  Check,
  Receipt,
  CookingPot,
  Bell,
  Package,
  X,
} from '@phosphor-icons/react';
import { OrderStatus } from '@/lib/order-service';

interface OrderTrackerProps {
  /** Current order status */
  status: OrderStatus | null;
  /** Progress percentage (0-100) */
  progress: number;
  /** Status label for display */
  statusLabel: string;
  /** Loading state */
  isLoading?: boolean;
  /** Show compact version (inline) */
  compact?: boolean;
  /** Order code for display */
  orderCode?: string;
}

interface TrackingStep {
  id: OrderStatus;
  label: string;
  icon: typeof Check;
}

const TRACKING_STEPS: TrackingStep[] = [
  { id: 'pending', label: 'Placed', icon: Receipt },
  { id: 'confirmed', label: 'Confirmed', icon: Check },
  { id: 'preparing', label: 'Preparing', icon: CookingPot },
  { id: 'ready', label: 'Ready', icon: Bell },
  { id: 'delivered', label: 'Done', icon: Package },
];

function getStepStatus(
  stepId: OrderStatus,
  currentStatus: OrderStatus | null
): 'completed' | 'current' | 'pending' | 'cancelled' {
  if (currentStatus === 'cancelled') return 'cancelled';
  if (!currentStatus) return 'pending';

  const stepIndex = TRACKING_STEPS.findIndex((s) => s.id === stepId);
  const currentIndex = TRACKING_STEPS.findIndex((s) => s.id === currentStatus);

  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'current';
  return 'pending';
}

export function OrderTracker({
  status,
  progress,
  statusLabel,
  isLoading,
  compact = false,
  orderCode,
}: OrderTrackerProps) {
  if (status === 'cancelled') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl p-4"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--status-error)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'var(--status-error)', color: 'white' }}
          >
            <X size={20} weight="bold" />
          </div>
          <div>
            <p className="font-medium" style={{ color: 'var(--status-error)' }}>
              Order Cancelled
            </p>
            {orderCode && (
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {orderCode}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {/* Mini progress bar */}
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full"
          style={{ background: 'var(--bg-tertiary)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--interactive-primary)' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {isLoading ? '...' : statusLabel}
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
      {/* Header */}
      {orderCode && (
        <div className="mb-4 flex items-center justify-between">
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Order {orderCode}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-semibold"
            style={{
              background: 'var(--interactive-primary)',
              color: 'white',
            }}
          >
            {statusLabel}
          </span>
        </div>
      )}

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress line background */}
        <div
          className="absolute left-5 top-5 h-0.5 w-[calc(100%-40px)]"
          style={{ background: 'var(--bg-tertiary)' }}
        />

        {/* Progress line animated */}
        <motion.div
          className="absolute left-5 top-5 h-0.5"
          style={{ background: 'var(--interactive-primary)' }}
          initial={{ width: 0 }}
          animate={{ width: `calc(${progress}% - 40px)` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {TRACKING_STEPS.map((step, index) => {
            const stepStatus = getStepStatus(step.id, status);
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background:
                      stepStatus === 'completed' || stepStatus === 'current'
                        ? 'var(--interactive-primary)'
                        : 'var(--bg-tertiary)',
                    color:
                      stepStatus === 'completed' || stepStatus === 'current'
                        ? 'white'
                        : 'var(--text-tertiary)',
                    border:
                      stepStatus === 'current'
                        ? '3px solid var(--bg-primary)'
                        : 'none',
                    boxShadow:
                      stepStatus === 'current'
                        ? '0 0 0 2px var(--interactive-primary)'
                        : 'none',
                  }}
                  initial={false}
                  animate={{
                    scale: stepStatus === 'current' ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {stepStatus === 'completed' ? (
                    <Check size={18} weight="bold" />
                  ) : (
                    <Icon size={18} weight={stepStatus === 'current' ? 'fill' : 'regular'} />
                  )}

                  {/* Pulse animation for current step */}
                  {stepStatus === 'current' && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'var(--interactive-primary)' }}
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.5 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                    />
                  )}
                </motion.div>

                <span
                  className="mt-2 text-xs font-medium"
                  style={{
                    color:
                      stepStatus === 'completed' || stepStatus === 'current'
                        ? 'var(--text-primary)'
                        : 'var(--text-tertiary)',
                  }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current status message */}
      {status && status !== 'delivered' && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {getStatusMessage(status)}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function getStatusMessage(status: OrderStatus): string {
  switch (status) {
    case 'pending':
      return 'Your order has been received and is being processed';
    case 'confirmed':
      return 'Kitchen has confirmed your order';
    case 'preparing':
      return 'Your order is being prepared with care';
    case 'ready':
      return 'Your order is ready! Please pick it up at the counter';
    case 'delivered':
      return 'Enjoy your meal!';
    default:
      return '';
  }
}

export default OrderTracker;
