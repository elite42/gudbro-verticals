'use client';

/**
 * NotificationPrompt Component
 *
 * Prompt per richiedere il permesso per le push notifications.
 * Mostra un banner o modal con opzione per abilitare le notifiche.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRinging, X, Check, Warning } from '@phosphor-icons/react';

interface NotificationPromptProps {
  /** Show the prompt */
  isOpen: boolean;
  /** Close callback */
  onClose: () => void;
  /** Enable notifications callback */
  onEnable: () => void;
  /** Current permission state */
  permission: 'default' | 'granted' | 'denied';
  /** Is subscribed to push */
  isSubscribed: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string | null;
  /** Display mode: banner (inline) or modal (overlay) */
  mode?: 'banner' | 'modal';
  /** Order ID for context */
  orderId?: string;
}

export function NotificationPrompt({
  isOpen,
  onClose,
  onEnable,
  permission,
  isSubscribed,
  isLoading = false,
  error,
  mode = 'banner',
  orderId,
}: NotificationPromptProps) {
  // Don't show if already subscribed or permission denied
  if (isSubscribed || permission === 'denied') {
    return null;
  }

  if (mode === 'modal') {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-1/2 z-50 -translate-y-1/2 rounded-2xl p-6 md:left-1/2 md:max-w-sm md:-translate-x-1/2"
              style={{
                background: 'var(--bg-primary)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: 'var(--interactive-primary)', color: 'white' }}
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <BellRinging size={32} weight="fill" />
                </motion.div>

                <h2
                  className="font-display mb-2 text-xl font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Stay Updated
                </h2>

                <p className="mb-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Get notified when your order is ready for pickup. Never miss your food!
                </p>

                {error && (
                  <div
                    className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                    style={{
                      background: 'var(--status-error-bg)',
                      color: 'var(--status-error)',
                    }}
                  >
                    <Warning size={16} />
                    {error}
                  </div>
                )}

                <div className="flex w-full gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 rounded-xl py-3 font-medium"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Not Now
                  </button>

                  <motion.button
                    onClick={onEnable}
                    disabled={isLoading}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-medium"
                    style={{
                      background: 'var(--interactive-primary)',
                      color: 'white',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <Bell size={18} weight="fill" />
                        Enable
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Banner mode (inline)
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative overflow-hidden rounded-xl p-4"
          style={{
            background: 'linear-gradient(135deg, var(--interactive-primary) 0%, var(--interactive-primary-hover) 100%)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full p-1"
            style={{ color: 'white', opacity: 0.7 }}
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <BellRinging size={22} weight="fill" style={{ color: 'white' }} />
            </div>

            <div className="flex-1">
              <p className="font-medium" style={{ color: 'white' }}>
                Get order updates
              </p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                We'll notify you when your order is ready
              </p>
            </div>

            <motion.button
              onClick={onEnable}
              disabled={isLoading}
              className="shrink-0 rounded-full px-4 py-2 text-sm font-medium"
              style={{
                background: 'white',
                color: 'var(--interactive-primary)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? '...' : 'Enable'}
            </motion.button>
          </div>

          {error && (
            <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {error}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationPrompt;
