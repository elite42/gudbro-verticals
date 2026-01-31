'use client';

import { useState } from 'react';
import {
  CheckCircle,
  WhatsappLogo,
  EnvelopeSimple,
  Copy,
  Check,
  Clock,
  Money,
} from '@phosphor-icons/react';
import { formatPrice } from '@/lib/price-utils';
import type { BookingResponse } from '@/types/property';
import BankTransferInstructions from './BankTransferInstructions';
import CryptoPaymentOptions from './CryptoPaymentOptions';

interface BookingConfirmationProps {
  bookingResult: BookingResponse;
}

export default function BookingConfirmation({ bookingResult }: BookingConfirmationProps) {
  const [copied, setCopied] = useState(false);

  const { bookingCode, status, expiresAt, priceBreakdown, propertyName, hostWhatsapp } =
    bookingResult;

  const isConfirmed = status === 'confirmed';
  const isPendingPayment = status === 'pending_payment';

  const copyBookingCode = async () => {
    try {
      await navigator.clipboard.writeText(bookingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  // WhatsApp deep-link with pre-filled message
  const whatsappPhone = hostWhatsapp?.replace(/[^0-9]/g, '');
  const whatsappMessage = encodeURIComponent(
    `Hi! I just booked ${bookingCode} at ${propertyName}. Looking forward to my stay!`
  );
  const whatsappUrl = whatsappPhone
    ? `https://wa.me/${whatsappPhone}?text=${whatsappMessage}`
    : null;

  // Calculate hours until expiry for inquiry bookings
  const hoursUntilExpiry = expiresAt
    ? Math.max(0, Math.round((new Date(expiresAt).getTime() - Date.now()) / 3600000))
    : null;

  // Determine header text and icon
  let headerText = 'Booking Confirmed!';
  let subText = 'Your stay has been confirmed. See you soon!';
  if (isPendingPayment) {
    headerText = 'Awaiting Payment';
    subText = 'Complete your payment to confirm the booking.';
  } else if (!isConfirmed) {
    headerText = 'Booking Request Sent';
    subText = 'Waiting for host confirmation.';
  }

  return (
    <div className="text-center">
      {/* Success / Pending icon */}
      <div className="mb-4 flex justify-center">
        {isPendingPayment ? (
          <div className="rounded-full bg-amber-100 p-4">
            <Clock size={48} weight="fill" className="text-amber-600" />
          </div>
        ) : (
          <div className="bg-success-light rounded-full p-4">
            <CheckCircle size={48} weight="fill" className="text-success" />
          </div>
        )}
      </div>

      {/* Status message */}
      <h2 className="font-display text-foreground mb-1 text-2xl font-bold">{headerText}</h2>
      <p className="text-foreground-muted mb-6 text-sm">{subText}</p>

      {/* Inquiry expiry notice */}
      {!isConfirmed && !isPendingPayment && hoursUntilExpiry !== null && (
        <div className="bg-accent/10 text-foreground-muted mx-auto mb-6 flex max-w-sm items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm">
          <Clock size={16} weight="duotone" />
          <span>The host has {hoursUntilExpiry} hours to respond</span>
        </div>
      )}

      {/* Booking code */}
      <div className="border-border bg-background mx-auto mb-6 max-w-sm rounded-xl border p-4">
        <p className="text-foreground-muted mb-1 text-xs uppercase tracking-wide">Booking Code</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-primary font-mono text-2xl font-bold">{bookingCode}</p>
          <button
            onClick={copyBookingCode}
            className="text-foreground-muted hover:bg-primary-light hover:text-primary rounded-md p-1.5 transition-colors"
            aria-label="Copy booking code"
          >
            {copied ? <Check size={18} weight="bold" /> : <Copy size={18} />}
          </button>
        </div>
        <p className="text-foreground-subtle mt-2 text-xs">Save this code for your records</p>
      </div>

      {/* Price summary */}
      {priceBreakdown && (
        <div className="border-border bg-background mx-auto mb-6 max-w-sm rounded-xl border p-4 text-left">
          <div className="text-foreground-muted flex items-center justify-between text-sm">
            <span>
              {priceBreakdown.nights} night{priceBreakdown.nights !== 1 ? 's' : ''}
            </span>
            <span>{formatPrice(priceBreakdown.subtotal, priceBreakdown.currency)}</span>
          </div>
          {priceBreakdown.cleaningFee > 0 && (
            <div className="text-foreground-muted mt-1 flex items-center justify-between text-sm">
              <span>Cleaning fee</span>
              <span>{formatPrice(priceBreakdown.cleaningFee, priceBreakdown.currency)}</span>
            </div>
          )}
          {priceBreakdown.discountAmount > 0 && (
            <div className="text-success mt-1 flex items-center justify-between text-sm">
              <span>{priceBreakdown.discountLabel}</span>
              <span>-{formatPrice(priceBreakdown.discountAmount, priceBreakdown.currency)}</span>
            </div>
          )}
          <div className="border-border mt-2 border-t pt-2">
            <div className="flex items-center justify-between">
              <span className="text-foreground font-semibold">Total</span>
              <span className="text-foreground text-lg font-bold">
                {formatPrice(priceBreakdown.totalPrice, priceBreakdown.currency)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment-specific instructions */}
      {bookingResult.paymentMethod === 'cash' && (
        <div className="mx-auto mb-6 flex max-w-sm items-center gap-2 rounded-lg bg-emerald-50 p-3 text-left text-sm text-emerald-700">
          <Money size={20} weight="fill" className="flex-shrink-0" />
          <span>
            Pay{' '}
            {priceBreakdown
              ? formatPrice(priceBreakdown.totalPrice, priceBreakdown.currency)
              : 'the full amount'}{' '}
            at check-in
          </span>
        </div>
      )}

      {bookingResult.paymentMethod === 'bank_transfer' && bookingResult.bankTransferInfo && (
        <div className="mb-6">
          <BankTransferInstructions
            bankInfo={bookingResult.bankTransferInfo}
            amount={priceBreakdown?.totalPrice || 0}
            currency={priceBreakdown?.currency || 'VND'}
            bookingCode={bookingCode}
          />
        </div>
      )}

      {bookingResult.paymentMethod === 'crypto' && bookingResult.cryptoWallets && (
        <div className="mb-6">
          <CryptoPaymentOptions
            wallets={bookingResult.cryptoWallets}
            amount={priceBreakdown?.totalPrice || 0}
            currency={priceBreakdown?.currency || 'VND'}
            bookingCode={bookingCode}
          />
        </div>
      )}

      {/* CTAs */}
      <div className="mx-auto max-w-sm space-y-3">
        {/* WhatsApp Host */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <WhatsappLogo size={20} weight="fill" />
            Message Your Host
          </a>
        )}

        {/* Email notice */}
        <div className="border-border text-foreground-muted flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm">
          <EnvelopeSimple size={18} weight="duotone" />
          <span>Confirmation details will be sent to your email</span>
        </div>
      </div>
    </div>
  );
}
