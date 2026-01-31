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
// Order Status State Machine
// ---------------------------------------------------------------------------

/** Valid status transitions for service orders */
export const ORDER_VALID_TRANSITIONS: Record<string, string[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['preparing', 'cancelled'],
  preparing: ['ready'],
  ready: ['delivered'],
};

/** Maps user-facing action strings to order status values */
export const ORDER_ACTION_TO_STATUS: Record<string, string> = {
  confirm: 'confirmed',
  reject: 'cancelled',
  start_preparing: 'preparing',
  mark_ready: 'ready',
  mark_delivered: 'delivered',
};

/** Badge colors for order statuses */
export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-indigo-100 text-indigo-800',
  ready: 'bg-green-100 text-green-800',
  delivered: 'bg-gray-100 text-gray-600',
  cancelled: 'bg-red-100 text-red-800',
};

/** Human-readable labels for order statuses */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: 'Submitted',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

/**
 * Check whether a status transition is valid for service orders.
 */
export function isValidOrderTransition(current: string, next: string): boolean {
  const allowed = ORDER_VALID_TRANSITIONS[current];
  return !!allowed && allowed.includes(next);
}

/**
 * Build a WhatsApp message for a new service order notification.
 */
export function buildOrderWhatsAppMessage(
  orderNumber: string,
  roomNumber: string,
  itemCount: number,
  total: number,
  currency: string
): string {
  const formattedTotal = (total / 100).toFixed(2);
  return (
    `New order ${orderNumber} from Room ${roomNumber}\n` +
    `${itemCount} item${itemCount !== 1 ? 's' : ''} — ${formattedTotal} ${currency.toUpperCase()}\n` +
    `Please confirm or review in your dashboard.`
  );
}

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
