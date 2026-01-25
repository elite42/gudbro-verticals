'use client';

/**
 * TableContextBanner v2
 *
 * Persistent banner showing current table context after QR scan.
 * Allows users to change table if needed.
 *
 * Features:
 * - Animated entry/exit
 * - Table change modal with numpad
 * - Visual confirmation feedback
 * - Dismissible for takeaway mode
 *
 * Aesthetic: "Subtle Anchor" - always visible but never intrusive
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  PencilSimple,
  X,
  Check,
  ArrowsClockwise,
  Package,
  Storefront,
} from '@phosphor-icons/react';

type OrderMode = 'dine-in' | 'takeaway' | 'pickup';

interface TableContextBannerProps {
  tableNumber: string | null;
  orderMode?: OrderMode;
  onTableChange?: (newTable: string) => void;
  onModeChange?: (mode: OrderMode) => void;
  onDismiss?: () => void;
  className?: string;
}

// Animation variants
const bannerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    y: -8,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 300,
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: 'easeIn' as const,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

const successPulse = {
  scale: [1, 1.05, 1],
  transition: { duration: 0.3 },
};

export function TableContextBanner({
  tableNumber,
  orderMode = 'dine-in',
  onTableChange,
  onModeChange,
  onDismiss,
  className = '',
}: TableContextBannerProps) {
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isChangeModalOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isChangeModalOpen]);

  const handleOpenChangeModal = useCallback(() => {
    setNewTableNumber(tableNumber || '');
    setIsChangeModalOpen(true);
  }, [tableNumber]);

  const handleConfirmChange = useCallback(() => {
    if (newTableNumber.trim() && onTableChange) {
      onTableChange(newTableNumber.trim());
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsChangeModalOpen(false);
      }, 800);
    }
  }, [newTableNumber, onTableChange]);

  const handleModeSelect = useCallback(
    (mode: OrderMode) => {
      onModeChange?.(mode);
      setIsModeMenuOpen(false);
    },
    [onModeChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleConfirmChange();
      } else if (e.key === 'Escape') {
        setIsChangeModalOpen(false);
      }
    },
    [handleConfirmChange]
  );

  // Get mode display info
  const getModeInfo = (mode: OrderMode) => {
    switch (mode) {
      case 'dine-in':
        return { icon: MapPin, label: 'Dine-in', color: 'var(--interactive-primary)' };
      case 'takeaway':
        return { icon: Package, label: 'Takeaway', color: 'var(--status-warning)' };
      case 'pickup':
        return { icon: Storefront, label: 'Pickup', color: 'var(--status-info)' };
    }
  };

  const currentModeInfo = getModeInfo(orderMode);
  const ModeIcon = currentModeInfo.icon;

  // Don't render if no table and not dine-in
  if (!tableNumber && orderMode !== 'dine-in') {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {(tableNumber || orderMode === 'dine-in') && (
          <motion.div
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`overflow-hidden ${className}`}
          >
            <div
              className="relative flex items-center justify-between px-4 py-2.5"
              style={{
                background: `linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%)`,
                borderBottom: '1px solid var(--border-light)',
              }}
            >
              {/* Decorative accent line */}
              <div
                className="absolute left-0 top-0 h-full w-1"
                style={{ background: currentModeInfo.color }}
              />

              {/* Left: Mode & Table info */}
              <div className="flex items-center gap-3">
                {/* Mode badge */}
                <motion.button
                  onClick={() => setIsModeMenuOpen(!isModeMenuOpen)}
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all"
                  style={{
                    background: `${currentModeInfo.color}15`,
                    color: currentModeInfo.color,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ModeIcon size={14} weight="fill" />
                  <span>{currentModeInfo.label}</span>
                  <ArrowsClockwise
                    size={12}
                    className={`transition-transform ${isModeMenuOpen ? 'rotate-180' : ''}`}
                  />
                </motion.button>

                {/* Table number */}
                {tableNumber && orderMode === 'dine-in' && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      ·
                    </span>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold"
                        style={{
                          background: 'var(--surface-card)',
                          color: 'var(--text-primary)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                        animate={showSuccess ? successPulse : {}}
                      >
                        {tableNumber}
                      </motion.div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        Table
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Change table button */}
                {tableNumber && orderMode === 'dine-in' && onTableChange && (
                  <motion.button
                    onClick={handleOpenChangeModal}
                    className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
                    style={{
                      background: 'var(--surface-card)',
                      color: 'var(--text-secondary)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    whileHover={{
                      scale: 1.02,
                      color: 'var(--text-primary)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PencilSimple size={12} weight="bold" />
                    <span>Change</span>
                  </motion.button>
                )}

                {/* Dismiss button */}
                {onDismiss && (
                  <motion.button
                    onClick={onDismiss}
                    className="flex h-6 w-6 items-center justify-center rounded-full transition-colors"
                    style={{
                      color: 'var(--text-tertiary)',
                    }}
                    whileHover={{
                      scale: 1.1,
                      color: 'var(--text-secondary)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Dismiss table context"
                  >
                    <X size={14} weight="bold" />
                  </motion.button>
                )}
              </div>

              {/* Mode selection dropdown */}
              <AnimatePresence>
                {isModeMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute left-4 top-full z-50 mt-1 overflow-hidden rounded-xl shadow-lg"
                    style={{
                      background: 'var(--surface-card)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    {(['dine-in', 'takeaway', 'pickup'] as OrderMode[]).map((mode) => {
                      const info = getModeInfo(mode);
                      const Icon = info.icon;
                      const isActive = mode === orderMode;

                      return (
                        <button
                          key={mode}
                          onClick={() => handleModeSelect(mode)}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl"
                          style={{
                            background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                            color: isActive ? info.color : 'var(--text-secondary)',
                          }}
                        >
                          <Icon size={18} weight={isActive ? 'fill' : 'regular'} />
                          <span className="text-sm font-medium">{info.label}</span>
                          {isActive && (
                            <Check
                              size={16}
                              weight="bold"
                              className="ml-auto"
                              style={{ color: info.color }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Change Table Modal */}
      <AnimatePresence>
        {isChangeModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChangeModalOpen(false)}
              className="fixed inset-0 z-[100]"
              style={{ background: 'var(--surface-overlay)' }}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed left-1/2 top-1/2 z-[101] w-[90%] max-w-xs -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
              style={{
                background: 'var(--surface-card)',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between p-4"
                style={{ borderBottom: '1px solid var(--border-light)' }}
              >
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Change Table
                </h3>
                <button
                  onClick={() => setIsChangeModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {showSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center gap-3 py-6"
                  >
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-full"
                      style={{
                        background: 'var(--status-success-bg)',
                        color: 'var(--status-success)',
                      }}
                    >
                      <Check size={32} weight="bold" />
                    </div>
                    <p
                      className="font-display text-lg font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Table {newTableNumber}
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <label
                      className="mb-2 block text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Enter table number
                    </label>

                    <input
                      ref={inputRef}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9A-Za-z]*"
                      value={newTableNumber}
                      onChange={(e) => setNewTableNumber(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="e.g. 5, A1, Patio 3"
                      className="w-full rounded-xl p-4 text-center text-2xl font-bold"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '2px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                      }}
                      maxLength={10}
                    />

                    <p
                      className="mt-2 text-center text-xs"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Check the number on your table marker
                    </p>

                    {/* Quick select for common tables */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {['1', '2', '3', '4', '5', '6', '7', '8'].map((num) => (
                        <button
                          key={num}
                          onClick={() => setNewTableNumber(num)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all"
                          style={{
                            background:
                              newTableNumber === num
                                ? 'var(--interactive-primary)'
                                : 'var(--bg-tertiary)',
                            color: newTableNumber === num ? 'white' : 'var(--text-secondary)',
                          }}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {!showSuccess && (
                <div
                  className="flex gap-3 p-4"
                  style={{ borderTop: '1px solid var(--border-light)' }}
                >
                  <button
                    onClick={() => setIsChangeModalOpen(false)}
                    className="flex-1 rounded-xl py-3 text-sm font-semibold transition-colors"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleConfirmChange}
                    disabled={!newTableNumber.trim()}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50"
                    style={{
                      background: 'var(--interactive-primary)',
                    }}
                    whileHover={{ scale: newTableNumber.trim() ? 1.02 : 1 }}
                    whileTap={{ scale: newTableNumber.trim() ? 0.98 : 1 }}
                  >
                    <Check size={16} weight="bold" />
                    Confirm
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside to close mode menu */}
      {isModeMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsModeMenuOpen(false)} />
      )}
    </>
  );
}

export default TableContextBanner;
