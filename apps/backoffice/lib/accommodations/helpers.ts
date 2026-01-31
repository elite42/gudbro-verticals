import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/**
 * Validates the ADMIN_API_KEY from the Authorization header.
 * Expected format: `Bearer {key}`
 */
export function validateAdminApiKey(
  request: NextRequest
): { valid: true } | { valid: false; response: NextResponse } {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  const apiKey = process.env.ADMIN_API_KEY;

  if (!apiKey || !token || token !== apiKey) {
    return {
      valid: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }

  return { valid: true };
}

// ---------------------------------------------------------------------------
// Booking Status State Machine
// ---------------------------------------------------------------------------

/** Valid status transitions for accommodation bookings */
export const VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  pending_payment: ['confirmed', 'cancelled'],
  confirmed: ['checked_in', 'cancelled'],
  checked_in: ['checked_out', 'cancelled'],
};

/** Maps user-facing action strings to booking status values */
export const ACTION_TO_STATUS: Record<string, string> = {
  confirm: 'confirmed',
  decline: 'cancelled',
  checkin: 'checked_in',
  checkout: 'checked_out',
  cancel: 'cancelled',
};

// ---------------------------------------------------------------------------
// Status Color Maps (reused from accommodations dashboard)
// ---------------------------------------------------------------------------

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  confirmed: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  pending_payment: 'bg-amber-100 text-amber-800',
  cancelled: 'bg-red-100 text-red-800',
  payment_failed: 'bg-red-100 text-red-800',
  checked_in: 'bg-blue-100 text-blue-800',
  checked_out: 'bg-gray-100 text-gray-600',
  no_show: 'bg-gray-100 text-gray-600',
};

export const PAYMENT_STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  partial: 'bg-blue-100 text-blue-800',
  unpaid: 'bg-gray-100 text-gray-600',
  pending: 'bg-amber-100 text-amber-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-purple-100 text-purple-800',
};

// ---------------------------------------------------------------------------
// Utility Functions
// ---------------------------------------------------------------------------

/**
 * Build a WhatsApp `wa.me` URL from a phone number and message.
 * Strips all non-digit characters from the phone number.
 */
export function buildWhatsAppUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}

/**
 * Format a price stored as minor currency units (e.g. cents) into a
 * human-readable string like "12.50 EUR".
 */
export function formatBookingPrice(amount: number, currency: string): string {
  const major = (amount / 100).toFixed(2);
  return `${major} ${currency.toUpperCase()}`;
}
