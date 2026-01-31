-- ============================================================================
-- Migration 083: Accommodations v2 Foundation
-- ============================================================================
-- Date: 2026-01-31
-- Description: Schema foundation for Accommodations v2 (Milestone v1.4).
--              Extends accom_properties with booking/pricing config,
--              accom_rooms with pricing/images/beds,
--              accom_bookings with pricing breakdown + payment tracking.
--              Adds exclusion constraint for double-booking prevention.
--              Creates service order tables (header + line items).
--              Applies RLS policies on new tables.
--
-- Changes:
--   - Enable btree_gist extension (required for UUID + daterange GIST index)
--   - ALTER accom_properties: +11 columns (booking_mode, payment, pricing, policy)
--   - ALTER accom_rooms: +4 columns (base_price, currency, images, beds)
--   - ALTER accom_bookings: +14 columns (pricing, payment, Stripe, inquiry)
--   - ADD EXCLUDE constraint: prevents overlapping bookings per room
--   - CREATE accom_service_orders: order header with status/payment tracking
--   - CREATE accom_service_order_items: line items with snapshot pricing
--   - Indexes, triggers, RLS policies, grants
--
-- Depends on: 077-accommodations-schema.sql
-- ============================================================================

-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ============================================================================
-- 2. EXTEND accom_properties (booking & pricing configuration)
-- ============================================================================

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS booking_mode TEXT NOT NULL DEFAULT 'inquiry'
    CHECK (booking_mode IN ('instant', 'inquiry', 'disabled')),
  ADD COLUMN IF NOT EXISTS accepted_payment_methods TEXT[] NOT NULL DEFAULT '{"cash"}',
  ADD COLUMN IF NOT EXISTS min_nights INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS max_nights INTEGER,
  ADD COLUMN IF NOT EXISTS cleaning_fee INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS service_fee_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS weekly_discount_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS monthly_discount_percent NUMERIC(4,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cancellation_policy TEXT NOT NULL DEFAULT 'flexible'
    CHECK (cancellation_policy IN ('flexible', 'moderate', 'strict', 'non_refundable')),
  ADD COLUMN IF NOT EXISTS inquiry_timeout_hours INTEGER NOT NULL DEFAULT 24,
  ADD COLUMN IF NOT EXISTS stripe_account_id TEXT;

-- ============================================================================
-- 3. EXTEND accom_rooms (pricing & media)
-- ============================================================================

ALTER TABLE accom_rooms
  ADD COLUMN IF NOT EXISTS base_price_per_night INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'VND',
  ADD COLUMN IF NOT EXISTS images JSONB NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS beds JSONB NOT NULL DEFAULT '[]';

-- ============================================================================
-- 4. EXTEND accom_bookings (pricing breakdown & payment tracking)
-- ============================================================================

ALTER TABLE accom_bookings
  ADD COLUMN IF NOT EXISTS price_per_night INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS num_nights INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS subtotal INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cleaning_fee INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS service_fee INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discount_amount INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_price INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'VND',
  ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'cash'
    CHECK (payment_method IN ('cash', 'card', 'bank_transfer', 'crypto', 'vnpay', 'momo')),
  ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT,
  ADD COLUMN IF NOT EXISTS confirmed_via TEXT
    CHECK (confirmed_via IN ('whatsapp', 'zalo', 'telegram', 'email', 'sms', 'auto')),
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;

-- ============================================================================
-- 5. EXCLUSION CONSTRAINT (double-booking prevention)
-- ============================================================================
-- Uses btree_gist to combine UUID equality with daterange overlap.
-- Half-open range [) means check-out day is free for new check-in (hotel convention).
-- Partial constraint: cancelled/no_show bookings do NOT block future reservations.

ALTER TABLE accom_bookings
  ADD CONSTRAINT accom_bookings_no_overlap
  EXCLUDE USING GIST (
    room_id WITH =,
    daterange(check_in_date, check_out_date, '[)') WITH &&
  )
  WHERE (status NOT IN ('cancelled', 'no_show'));

-- ============================================================================
-- 6. CREATE accom_service_orders (order header)
-- ============================================================================

CREATE TABLE accom_service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  subtotal INTEGER NOT NULL DEFAULT 0,
  tax INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  requested_time TEXT,
  delivery_notes TEXT,
  payment_method TEXT NOT NULL DEFAULT 'room_charge'
    CHECK (payment_method IN ('room_charge', 'cash', 'card')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 7. CREATE accom_service_order_items (line items with snapshot pricing)
-- ============================================================================

CREATE TABLE accom_service_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES accom_service_orders(id) ON DELETE CASCADE,
  service_item_id UUID NOT NULL REFERENCES accom_service_items(id),
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,
  total INTEGER NOT NULL,
  variant TEXT,
  notes TEXT
);

-- ============================================================================
-- 8. TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS update_accom_service_orders_updated_at ON accom_service_orders;
CREATE TRIGGER update_accom_service_orders_updated_at
  BEFORE UPDATE ON accom_service_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 9. INDEXES
-- ============================================================================

CREATE INDEX idx_accom_service_orders_booking ON accom_service_orders(booking_id);
CREATE INDEX idx_accom_service_orders_property ON accom_service_orders(property_id);
CREATE INDEX idx_accom_service_orders_status ON accom_service_orders(status);
CREATE INDEX idx_accom_service_order_items_order ON accom_service_order_items(order_id);

-- ============================================================================
-- 10. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE accom_service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_service_order_items ENABLE ROW LEVEL SECURITY;

-- Service Orders: owner manages via property_id ownership chain
-- NO anon access (guest uses SECURITY DEFINER functions)
CREATE POLICY accom_service_orders_owner_manage
  ON accom_service_orders FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties
    WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));

-- Service Order Items: owner manages via order_id -> property_id chain
-- NO anon access
CREATE POLICY accom_service_order_items_owner_manage
  ON accom_service_order_items FOR ALL TO authenticated
  USING (order_id IN (
    SELECT id FROM accom_service_orders
    WHERE property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  ));

-- ============================================================================
-- 11. ROLE GRANTS
-- ============================================================================

GRANT ALL ON accom_service_orders TO authenticated;
GRANT ALL ON accom_service_order_items TO authenticated;

-- ============================================================================
-- 12. COMMENTS
-- ============================================================================

COMMENT ON TABLE accom_service_orders IS 'In-stay service orders linked to bookings. Header with status/payment tracking.';
COMMENT ON TABLE accom_service_order_items IS 'Line items for service orders. Snapshot pricing (name, unit_price) for historical accuracy.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
