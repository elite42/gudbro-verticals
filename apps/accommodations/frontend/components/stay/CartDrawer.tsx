'use client';

import { useState } from 'react';
import { X, Minus, Plus, Trash, CheckCircle, SpinnerGap } from '@phosphor-icons/react';
import { createOrderAPI } from '@/lib/stay-api';
import type { ServiceCartReturn } from '@/hooks/useServiceCart';

import { formatPriceFromMinor as formatPrice } from '@gudbro/utils';

/** Generate time slots in 30-min increments from 07:00 to 22:00. */
function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 7; h <= 22; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 22) {
      slots.push(`${String(h).padStart(2, '0')}:30`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

interface CartDrawerProps {
  cart: ServiceCartReturn;
  bookingCode: string;
  token: string;
  currency: string;
  timezone: string;
  onClose: () => void;
  onOrderPlaced: () => void;
}

export default function CartDrawer({
  cart,
  bookingCode,
  token,
  currency,
  onClose,
  onOrderPlaced,
}: CartDrawerProps) {
  const [deliveryMode, setDeliveryMode] = useState<'asap' | 'scheduled'>('asap');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (cart.items.length === 0) return;

    setIsSubmitting(true);
    setError(null);

    const { error: apiError } = await createOrderAPI(bookingCode, token, {
      items: cart.items.map((ci) => ({
        serviceItemId: ci.serviceItemId,
        quantity: ci.quantity,
        notes: ci.notes || undefined,
      })),
      requestedTime: deliveryMode === 'scheduled' ? selectedTime : undefined,
      deliveryNotes: deliveryNotes || undefined,
    });

    setIsSubmitting(false);

    if (apiError) {
      setError(typeof apiError === 'string' ? apiError : 'Something went wrong. Please try again.');
      return;
    }

    setSuccess(true);
    cart.clearCart();
    setTimeout(() => {
      onOrderPlaced();
      onClose();
    }, 1500);
  };

  // Success state
  if (success) {
    return (
      <>
        <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />
        <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white p-6 shadow-2xl">
          <div className="flex flex-col items-center py-8">
            <CheckCircle size={56} weight="fill" className="mb-3 text-[#3D8B87]" />
            <h3 className="text-lg font-semibold text-[#2D2016]">Order Placed!</h3>
            <p className="mt-1 text-sm text-[#8B7355]">
              You&apos;ll receive updates on your order status
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[80vh] flex-col rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D9] px-4 py-3">
          <div>
            <h3 className="font-semibold text-[#2D2016]">Your Order</h3>
            <p className="text-xs text-[#8B7355]">{cart.itemCount} items</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#8B7355] hover:bg-[#FAF8F5]"
            aria-label="Close cart"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.serviceItemId}
                className="rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] p-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#2D2016]">{item.name}</p>
                    <p className="text-xs text-[#8B7355]">
                      {formatPrice(item.unitPrice, currency)} each
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-[#3D8B87]">
                    {formatPrice(item.unitPrice * item.quantity, currency)}
                  </p>
                </div>

                {/* Quantity stepper + remove */}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full border border-[#E8E2D9] bg-white px-1.5 py-0.5">
                      <button
                        onClick={() => cart.updateQuantity(item.serviceItemId, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[#8B7355] hover:bg-[#FAF8F5]"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} weight="bold" />
                      </button>
                      <span className="min-w-[20px] text-center text-sm font-semibold text-[#2D2016]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => cart.updateQuantity(item.serviceItemId, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-[#8B7355] hover:bg-[#FAF8F5]"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} weight="bold" />
                      </button>
                    </div>

                    <button
                      onClick={() => cart.removeItem(item.serviceItemId)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[#E07A5F] hover:bg-red-50"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash size={14} weight="bold" />
                    </button>
                  </div>
                </div>

                {/* Notes input */}
                <input
                  type="text"
                  value={item.notes}
                  onChange={(e) => cart.updateNotes(item.serviceItemId, e.target.value)}
                  placeholder="Add a note..."
                  className="mt-2 w-full rounded-lg border border-[#E8E2D9] bg-white px-3 py-1.5 text-xs text-[#2D2016] placeholder-[#C4B9A8] focus:border-[#3D8B87] focus:outline-none"
                />
              </div>
            ))}
          </div>

          {/* Delivery time */}
          <div className="mt-4 rounded-xl border border-[#E8E2D9] bg-white p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#8B7355]">
              Delivery Time
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeliveryMode('asap')}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  deliveryMode === 'asap'
                    ? 'bg-[#3D8B87] text-white'
                    : 'bg-[#FAF8F5] text-[#8B7355] hover:bg-[#F0EBE3]'
                }`}
              >
                ASAP
              </button>
              <button
                onClick={() => setDeliveryMode('scheduled')}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  deliveryMode === 'scheduled'
                    ? 'bg-[#3D8B87] text-white'
                    : 'bg-[#FAF8F5] text-[#8B7355] hover:bg-[#F0EBE3]'
                }`}
              >
                Choose Time
              </button>
            </div>

            {deliveryMode === 'scheduled' && (
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#E8E2D9] bg-[#FAF8F5] px-3 py-2 text-sm text-[#2D2016] focus:border-[#3D8B87] focus:outline-none"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Delivery notes */}
          <div className="mt-3">
            <textarea
              value={deliveryNotes}
              onChange={(e) => setDeliveryNotes(e.target.value)}
              placeholder="Delivery notes (optional)..."
              rows={2}
              className="w-full rounded-xl border border-[#E8E2D9] bg-white px-3 py-2 text-sm text-[#2D2016] placeholder-[#C4B9A8] focus:border-[#3D8B87] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer: total + submit */}
        <div className="border-t border-[#E8E2D9] px-4 py-3">
          {error && (
            <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-[#E07A5F]">{error}</p>
          )}

          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-[#8B7355]">Total</span>
            <span className="text-lg font-bold text-[#2D2016]">
              {formatPrice(cart.subtotal, currency)}
            </span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || cart.items.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D8B87] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2D6B68] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <SpinnerGap size={18} weight="bold" className="animate-spin" />
                Placing order...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </>
  );
}
