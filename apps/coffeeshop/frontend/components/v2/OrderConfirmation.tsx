'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  MapPin,
  Receipt,
  ArrowRight,
  ShareNetwork,
  Copy,
  Check,
  Confetti as ConfettiIcon,
} from '@phosphor-icons/react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  extras?: { name: string; price: number }[];
}

interface OrderConfirmationProps {
  orderCode: string;
  estimatedTime?: number; // in minutes
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  pickupLocation?: string;
  tableNumber?: string;
  paymentMethod?: string;
  pointsEarned?: number;
  formatPrice: (price: number) => string;
  onTrackOrder?: () => void;
  onBackToMenu?: () => void;
}

export function OrderConfirmation({
  orderCode,
  estimatedTime = 15,
  items,
  subtotal,
  discount = 0,
  total,
  pickupLocation,
  tableNumber,
  paymentMethod,
  pointsEarned,
  formatPrice,
  onTrackOrder,
  onBackToMenu,
}: OrderConfirmationProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(orderCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Order Confirmation',
        text: `Order #${orderCode} placed! ETA: ${estimatedTime} minutes`,
        url: window.location.href,
      });
    } catch (err) {
      handleCopyCode();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-app py-8">
        {/* Success header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-6 flex justify-center"
        >
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full"
            style={{ background: 'var(--status-success-bg)' }}
          >
            <CheckCircle size={64} weight="fill" style={{ color: 'var(--status-success)' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Order Confirmed!
          </h1>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
            Your order has been sent to the kitchen
          </p>
        </motion.div>

        {/* Order code card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-6 p-6 text-center"
        >
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Order Number
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <p
              className="font-display text-4xl font-bold tracking-wider"
              style={{ color: 'var(--brand-warm)' }}
            >
              {orderCode}
            </p>
            <button
              onClick={handleCopyCode}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              {copied ? (
                <Check size={18} style={{ color: 'var(--status-success)' }} />
              ) : (
                <Copy size={18} style={{ color: 'var(--text-secondary)' }} />
              )}
            </button>
          </div>

          {/* ETA */}
          <div
            className="mt-4 flex items-center justify-center gap-2 rounded-full px-4 py-2"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <Clock size={18} style={{ color: 'var(--text-tertiary)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>
              Ready in approximately{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{estimatedTime} min</strong>
            </span>
          </div>

          {/* Location / Table */}
          {(pickupLocation || tableNumber) && (
            <div
              className="mt-3 flex items-center justify-center gap-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <MapPin size={16} />
              <span className="text-sm">
                {tableNumber ? `Table ${tableNumber}` : pickupLocation}
              </span>
            </div>
          )}
        </motion.div>

        {/* Order summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mt-4"
        >
          <div
            className="flex items-center gap-2 border-b p-4"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <Receipt size={20} style={{ color: 'var(--text-tertiary)' }} />
            <h2 className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
              Order Summary
            </h2>
          </div>

          <div className="p-4">
            {/* Items */}
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between">
                  <div>
                    <p style={{ color: 'var(--text-primary)' }}>
                      <span className="mr-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>
                        {item.quantity}x
                      </span>
                      {item.name}
                    </p>
                    {item.extras && item.extras.length > 0 && (
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {item.extras.map((e) => e.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div
              className="mt-4 space-y-2 border-t pt-4"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-tertiary)' }}>Subtotal</span>
                <span style={{ color: 'var(--text-secondary)' }}>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--status-success)' }}>Discount</span>
                  <span style={{ color: 'var(--status-success)' }}>-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="font-display flex justify-between pt-2 text-lg font-bold">
                <span style={{ color: 'var(--text-primary)' }}>Total</span>
                <span style={{ color: 'var(--price-primary)' }}>{formatPrice(total)}</span>
              </div>

              {paymentMethod && (
                <p className="pt-1 text-right text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  Paid with {paymentMethod}
                </p>
              )}
            </div>

            {/* Points earned */}
            {pointsEarned && pointsEarned > 0 && (
              <div
                className="mt-4 flex items-center justify-center gap-2 rounded-lg p-3"
                style={{ background: 'var(--status-success-bg)' }}
              >
                <span className="text-lg">🎉</span>
                <span className="text-sm font-medium" style={{ color: 'var(--status-success)' }}>
                  You earned {pointsEarned} loyalty points!
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 space-y-3"
        >
          <button
            onClick={onTrackOrder || (() => router.push('/orders'))}
            className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-base font-semibold text-white"
            style={{
              background: 'var(--interactive-primary)',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.3)',
            }}
          >
            Track Order Status
            <ArrowRight size={20} />
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
              }}
            >
              <ShareNetwork size={18} />
              Share
            </button>

            <button
              onClick={onBackToMenu || (() => router.push('/menu'))}
              className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-medium"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
              }}
            >
              Back to Menu
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
