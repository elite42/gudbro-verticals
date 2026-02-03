/**
 * Zod Validation Schemas
 *
 * Centralized validation schemas for API request bodies.
 * Use these to validate incoming data before processing.
 *
 * Usage:
 * ```ts
 * import { validateRequest, schemas } from '@/lib/validation';
 *
 * export async function POST(request: NextRequest) {
 *   const { data, error } = await validateRequest(request, schemas.createOrder);
 *   if (error) return error;
 *   // data is now typed and validated
 * }
 * ```
 */

import { z } from 'zod';
import { API } from '@gudbro/config';

// =============================================================================
// Common Validators
// =============================================================================

/** UUID validation */
export const uuid = z.string().uuid('Invalid UUID format');

/** Email validation */
export const email = z.string().email('Invalid email format').max(255);

/** Phone validation (international format) */
export const phone = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .optional();

/** URL validation */
export const url = z.string().url('Invalid URL format').max(2048);

/** Slug validation (lowercase, alphanumeric with hyphens) */
export const slug = z
  .string()
  .min(2, 'Slug must be at least 2 characters')
  .max(100, 'Slug must be at most 100 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens');

/** Price in cents (integer) */
export const priceInCents = z.number().int().min(0).max(100000000); // Max $1M

/** Percentage (0-100) */
export const percentage = z.number().min(0).max(100);

/** Date string in ISO format */
export const isoDate = z.string().datetime('Invalid ISO date format');

/** Date string in YYYY-MM-DD format */
export const dateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (expected YYYY-MM-DD)');

/** Time string in HH:MM format */
export const timeOnly = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (expected HH:MM)');

/** Pagination parameters */
export const pagination = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(API.MAX_PAGE_SIZE).default(API.DEFAULT_PAGE_SIZE),
});

// =============================================================================
// Entity Schemas
// =============================================================================

/** Merchant ID context (common in many requests) */
export const merchantContext = z.object({
  merchantId: uuid,
});

/** Location context */
export const locationContext = z.object({
  merchantId: uuid,
  locationId: uuid.optional(),
});

// =============================================================================
// Menu Schemas
// =============================================================================

export const createMenuItem = z.object({
  merchantId: uuid,
  categoryId: uuid,
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  price: priceInCents,
  isAvailable: z.boolean().default(true),
  imageUrl: url.optional(),
  preparationTime: z.number().int().min(0).max(180).optional(), // minutes
  allergens: z.array(z.string()).max(20).optional(),
  dietaryFlags: z.array(z.string()).max(10).optional(),
  displayOrder: z.number().int().min(0).optional(),
});

export const updateMenuItem = createMenuItem.partial().extend({
  id: uuid,
});

export const createMenuCategory = z.object({
  merchantId: uuid,
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  displayOrder: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
});

export const updateMenuCategory = createMenuCategory.partial().extend({
  id: uuid,
});

// =============================================================================
// Order Schemas
// =============================================================================

export const orderItem = z.object({
  menuItemId: uuid,
  quantity: z.number().int().min(1).max(99),
  notes: z.string().max(500).optional(),
  modifiers: z
    .array(
      z.object({
        modifierId: uuid,
        optionId: uuid.optional(),
      })
    )
    .max(20)
    .optional(),
});

export const createOrder = z.object({
  merchantId: uuid,
  locationId: uuid.optional(),
  tableId: uuid.optional(),
  customerId: uuid.optional(),
  items: z.array(orderItem).min(1).max(50),
  notes: z.string().max(1000).optional(),
  orderType: z.enum(['dine_in', 'takeaway', 'delivery']).default('dine_in'),
});

export const updateOrderStatus = z.object({
  orderId: uuid,
  status: z.enum(['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']),
  reason: z.string().max(500).optional(), // For cancellation
});

// =============================================================================
// Reservation Schemas
// =============================================================================

export const createReservation = z.object({
  merchantId: uuid,
  locationId: uuid,
  tableId: uuid.optional(),
  guestName: z.string().min(1).max(100),
  guestEmail: email.optional(),
  guestPhone: phone,
  partySize: z.number().int().min(1).max(50),
  reservationDate: dateOnly,
  reservationTime: timeOnly,
  duration: z.number().int().min(15).max(480).default(90), // minutes
  notes: z.string().max(1000).optional(),
  specialRequests: z.string().max(500).optional(),
});

export const updateReservation = createReservation.partial().extend({
  id: uuid,
  status: z
    .enum(['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show'])
    .optional(),
});

// =============================================================================
// Customer Schemas
// =============================================================================

export const createCustomer = z.object({
  merchantId: uuid,
  email: email.optional(),
  phone: phone,
  firstName: z.string().min(1).max(100),
  lastName: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const updateCustomer = createCustomer.partial().extend({
  id: uuid,
});

// =============================================================================
// AI/Chat Schemas
// =============================================================================

export const chatMessage = z.object({
  merchantId: uuid,
  message: z.string().min(1).max(4000),
  conversationId: uuid.optional(),
  context: z
    .object({
      page: z.string().max(100).optional(),
      selectedItems: z.array(uuid).max(20).optional(),
    })
    .optional(),
});

export const aiAction = z.object({
  merchantId: uuid,
  action: z.string().min(1).max(100),
  parameters: z.record(z.unknown()).optional(),
});

// =============================================================================
// Event Schemas
// =============================================================================

export const createEvent = z.object({
  merchantId: uuid,
  locationId: uuid.optional(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  eventType: z.enum(['promotion', 'special', 'holiday', 'live_music', 'other']),
  startDate: isoDate,
  endDate: isoDate,
  isAllDay: z.boolean().default(false),
  imageUrl: url.optional(),
  discount: percentage.optional(),
  terms: z.string().max(1000).optional(),
});

// =============================================================================
// QR Code Schemas
// =============================================================================

export const createQRCode = z.object({
  merchantId: uuid,
  locationId: uuid.optional(),
  name: z.string().min(1).max(100),
  type: z.enum(['menu', 'table', 'promo', 'wifi', 'custom']),
  tableId: uuid.optional(),
  customUrl: url.optional(),
  expiresAt: isoDate.optional(),
  scanLimit: z.number().int().min(1).max(1000000).optional(),
  style: z
    .object({
      foregroundColor: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/)
        .optional(),
      backgroundColor: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/)
        .optional(),
      errorCorrectionLevel: z.enum(['L', 'M', 'Q', 'H']).optional(),
      size: z.number().int().min(100).max(2000).optional(),
    })
    .optional(),
});

// =============================================================================
// Settings Schemas
// =============================================================================

export const updateMerchantSettings = z.object({
  merchantId: uuid,
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  logoUrl: url.optional(),
  currency: z.string().length(3).optional(), // ISO 4217
  timezone: z.string().max(50).optional(),
  defaultLanguage: z.string().length(2).optional(), // ISO 639-1
  supportedLanguages: z.array(z.string().length(2)).max(10).optional(),
});

export const updateBusinessHours = z.object({
  merchantId: uuid,
  locationId: uuid.optional(),
  hours: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6), // 0 = Sunday
      openTime: timeOnly,
      closeTime: timeOnly,
      isClosed: z.boolean().default(false),
    })
  ),
});

// =============================================================================
// Export all schemas
// =============================================================================

export const schemas = {
  // Common
  uuid,
  email,
  phone,
  url,
  slug,
  pagination,
  merchantContext,
  locationContext,

  // Menu
  createMenuItem,
  updateMenuItem,
  createMenuCategory,
  updateMenuCategory,

  // Orders
  orderItem,
  createOrder,
  updateOrderStatus,

  // Reservations
  createReservation,
  updateReservation,

  // Customers
  createCustomer,
  updateCustomer,

  // AI/Chat
  chatMessage,
  aiAction,

  // Events
  createEvent,

  // QR Codes
  createQRCode,

  // Settings
  updateMerchantSettings,
  updateBusinessHours,
} as const;

export default schemas;
