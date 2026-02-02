'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Check, X, SpinnerGap, Tag, Percent } from '@phosphor-icons/react';
import type { ValidatedVoucher } from '@/types/property';

interface VoucherInputProps {
  propertyId: string;
  numNights: number;
  subtotal: number;
  onVoucherApplied: (voucher: ValidatedVoucher | null) => void;
  appliedVoucher: ValidatedVoucher | null;
  formatPrice: (amount: number) => string;
  disabled?: boolean;
}

export function VoucherInput({
  propertyId,
  numNights,
  subtotal,
  onVoucherApplied,
  appliedVoucher,
  formatPrice,
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
      const res = await fetch('/api/booking/validate-voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          voucherCode: code.trim().toUpperCase(),
          propertyId,
          numNights,
          subtotal,
        }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error || 'Invalid or expired code');
        return;
      }

      if (json.data) {
        onVoucherApplied(json.data);
        setCode('');
      } else {
        setError('Invalid or expired code');
      }
    } catch {
      setError('Failed to validate code. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemove = () => {
    onVoucherApplied(null);
    setCode('');
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  // Applied state: show green success card
  if (appliedVoucher) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-4"
        style={{
          background: 'var(--status-success-bg, #f0fdf4)',
          border: '1px solid var(--status-success, #22c55e)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: 'var(--status-success, #22c55e)' }}
            >
              {appliedVoucher.benefitType === 'percentage_discount' ? (
                <Percent size={20} weight="bold" className="text-white" />
              ) : (
                <Tag size={20} weight="fill" className="text-white" />
              )}
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--status-success, #22c55e)' }}>
                {appliedVoucher.code}
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary, #6b7280)' }}>
                {appliedVoucher.partnerName} &middot; {appliedVoucher.conventionName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-bold" style={{ color: 'var(--status-success, #22c55e)' }}>
              -{formatPrice(appliedVoucher.discountAmount)}
            </span>
            <button
              onClick={handleRemove}
              disabled={disabled}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
              style={{
                background: 'var(--bg-tertiary, #f3f4f6)',
                color: 'var(--text-secondary, #6b7280)',
              }}
            >
              <X size={16} weight="bold" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Input state: show code entry field
  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-xl p-2"
        style={{
          background: 'var(--bg-secondary, #f9fafb)',
          border: error
            ? '1px solid var(--status-error, #ef4444)'
            : '1px solid var(--border-medium, #e5e7eb)',
        }}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ background: 'var(--bg-tertiary, #f3f4f6)' }}
        >
          <Ticket size={20} style={{ color: 'var(--text-tertiary, #9ca3af)' }} />
        </div>

        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter voucher code"
          disabled={disabled || isApplying}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium uppercase tracking-wide placeholder:normal-case placeholder:tracking-normal"
          style={{
            color: 'var(--text-primary, #111827)',
            outline: 'none',
          }}
        />

        <button
          onClick={handleApply}
          disabled={!code.trim() || isApplying || disabled}
          className="shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-all disabled:opacity-50"
          style={{
            background: code.trim()
              ? 'var(--interactive-primary, #3b82f6)'
              : 'var(--bg-tertiary, #f3f4f6)',
            color: code.trim() ? 'var(--text-inverse, #ffffff)' : 'var(--text-tertiary, #9ca3af)',
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
            style={{ color: 'var(--status-error, #ef4444)' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
