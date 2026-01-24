'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Check, X, SpinnerGap, Tag, Percent } from '@phosphor-icons/react';

interface AppliedVoucher {
  code: string;
  type: 'percentage' | 'fixed' | 'freebie';
  value: number; // Percentage (10 = 10%) or fixed amount
  description: string;
}

interface VoucherInputProps {
  onApply: (code: string) => Promise<AppliedVoucher | null>;
  onRemove: () => void;
  appliedVoucher: AppliedVoucher | null;
  formatPrice?: (price: number) => string;
  disabled?: boolean;
}

export function VoucherInput({
  onApply,
  onRemove,
  appliedVoucher,
  formatPrice = (p) => `$${(p / 100).toFixed(2)}`,
  disabled = false,
}: VoucherInputProps) {
  const [code, setCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    if (!code.trim() || isApplying || disabled) return;

    setIsApplying(true);
    setError(null);

    try {
      const result = await onApply(code.trim().toUpperCase());
      if (result) {
        setCode('');
      } else {
        setError('Invalid or expired code');
      }
    } catch (err) {
      setError('Failed to apply code');
    } finally {
      setIsApplying(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  // If voucher is already applied, show applied state
  if (appliedVoucher) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-4"
        style={{
          background: 'var(--status-success-bg)',
          border: '1px solid var(--status-success)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: 'var(--status-success)' }}
            >
              {appliedVoucher.type === 'percentage' ? (
                <Percent size={20} weight="bold" className="text-white" />
              ) : (
                <Tag size={20} weight="fill" className="text-white" />
              )}
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--status-success)' }}>
                {appliedVoucher.code}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {appliedVoucher.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="font-display text-lg font-bold"
              style={{ color: 'var(--status-success)' }}
            >
              {appliedVoucher.type === 'percentage'
                ? `-${appliedVoucher.value}%`
                : `-${formatPrice(appliedVoucher.value)}`}
            </span>
            <button
              onClick={onRemove}
              disabled={disabled}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
              }}
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-xl p-2"
        style={{
          background: 'var(--bg-secondary)',
          border: error ? '1px solid var(--status-error)' : '1px solid var(--border-medium)',
        }}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ background: 'var(--bg-tertiary)' }}
        >
          <Ticket size={20} style={{ color: 'var(--text-tertiary)' }} />
        </div>

        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter promo code"
          disabled={disabled || isApplying}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal"
          style={{
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />

        <button
          onClick={handleApply}
          disabled={!code.trim() || isApplying || disabled}
          className="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
          style={{
            background: code.trim() ? 'var(--interactive-primary)' : 'var(--bg-tertiary)',
            color: code.trim() ? 'var(--text-inverse)' : 'var(--text-tertiary)',
          }}
        >
          {isApplying ? <SpinnerGap size={18} className="animate-spin" /> : 'Apply'}
        </button>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-2 text-sm"
            style={{ color: 'var(--status-error)' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
