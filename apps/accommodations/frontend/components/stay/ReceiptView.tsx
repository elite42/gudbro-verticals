'use client';

import { CheckCircle } from '@phosphor-icons/react';
import type { ServiceOrder } from '@/types/stay';

import { formatPriceFromMinor as formatPrice } from '@gudbro/utils';

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  room_charge: 'Room Charge',
  cash: 'Cash',
  card: 'Card',
  bank_transfer: 'Bank Transfer',
  crypto: 'Crypto',
};

function formatReceiptDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function timeUntil(dateStr: string): string {
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diffMs = target - now;

  if (diffMs <= 0) return '';

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

interface ReceiptViewProps {
  order: ServiceOrder;
  currency: string;
  propertyName: string;
  onConfirm: () => void;
  isConfirming: boolean;
}

export default function ReceiptView({
  order,
  currency,
  propertyName,
  onConfirm,
  isConfirming,
}: ReceiptViewProps) {
  const isConfirmed = !!order.receiptConfirmedAt;
  const isAutoConfirmed =
    !isConfirmed &&
    order.receiptAutoConfirmAt &&
    new Date(order.receiptAutoConfirmAt).getTime() <= Date.now();
  const shortId = order.id.slice(0, 8).toUpperCase();
  const paymentLabel = PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod;

  return (
    <div className="rounded-xl border border-dashed border-[#E8E2D9] bg-[#FDFCFA] p-4">
      {/* Header */}
      <div className="mb-3 text-center">
        <p className="text-xs font-medium uppercase tracking-wider text-[#8B7355]">
          {propertyName}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B8A88A]">
          Receipt
        </p>
      </div>

      {/* Order ref + date */}
      <div className="mb-3 flex items-center justify-between border-b border-dashed border-[#E8E2D9] pb-2">
        <span className="font-mono text-xs text-[#8B7355]">#{shortId}</span>
        <span className="text-xs text-[#8B7355]">{formatReceiptDate(order.createdAt)}</span>
      </div>

      {/* Items */}
      <div className="mb-3 space-y-1.5">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-2">
            <span className="text-xs text-[#2D2016]">
              {item.quantity}x {item.name}
            </span>
            <span className="shrink-0 text-xs text-[#2D2016]">
              {formatPrice(item.total, currency)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-dashed border-[#E8E2D9] pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#8B7355]">Subtotal</span>
          <span className="text-[#2D2016]">{formatPrice(order.subtotal, currency)}</span>
        </div>
        {order.tax > 0 && (
          <div className="mt-0.5 flex items-center justify-between text-xs">
            <span className="text-[#8B7355]">Tax</span>
            <span className="text-[#2D2016]">{formatPrice(order.tax, currency)}</span>
          </div>
        )}
        <div className="mt-1.5 flex items-center justify-between border-t border-[#E8E2D9] pt-1.5">
          <span className="text-sm font-semibold text-[#2D2016]">Total</span>
          <span className="text-sm font-semibold text-[#2D2016]">
            {formatPrice(order.total, currency)}
          </span>
        </div>
      </div>

      {/* Payment method */}
      <div className="mt-2 text-center">
        <span className="text-[10px] uppercase tracking-wider text-[#B8A88A]">{paymentLabel}</span>
      </div>

      {/* Confirmation status / action */}
      <div className="mt-3 border-t border-dashed border-[#E8E2D9] pt-3">
        {isConfirmed ? (
          <div className="flex items-center justify-center gap-1.5 text-green-600">
            <CheckCircle size={18} weight="fill" />
            <span className="text-xs font-medium">
              Confirmed on {formatReceiptDate(order.receiptConfirmedAt!)}
            </span>
          </div>
        ) : isAutoConfirmed ? (
          <div className="flex items-center justify-center gap-1.5 text-[#8B7355]">
            <CheckCircle size={18} weight="fill" />
            <span className="text-xs font-medium">Auto-confirmed</span>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={onConfirm}
              disabled={isConfirming}
              className="w-full rounded-lg bg-[#3D8B87] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#357A76] active:bg-[#2F6E6A] disabled:opacity-50"
            >
              {isConfirming ? 'Confirming...' : 'Confirm Receipt'}
            </button>
            {order.receiptAutoConfirmAt && (
              <p className="text-center text-[10px] text-[#B8A88A]">
                Auto-confirms in {timeUntil(order.receiptAutoConfirmAt)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
