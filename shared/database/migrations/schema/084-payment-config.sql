-- ============================================================================
-- Migration 084: Payment Configuration & Extended Booking Status
-- ============================================================================
-- Date: 2026-01-31
-- Description: Extends schema for payment flow in Accommodations v2.
--              Adds deposit tracking to accom_bookings, payment config to
--              accom_properties, and extends booking status with payment states.
--
-- Changes:
--   - DROP + ADD status CHECK on accom_bookings (add pending_payment, payment_failed)
--   - ALTER accom_bookings: +2 columns (deposit_amount, deposit_percent)
--   - ALTER accom_properties: +4 columns (deposit_percent, bank_transfer_info,
--     crypto_wallets, cancellation_window_hours, cancellation_penalty_percent)
--
-- Depends on: 083-accommodations-v2-foundation.sql
-- ============================================================================

-- ============================================================================
-- 1. EXTEND accom_bookings status CHECK constraint
-- ============================================================================
-- Original (077): 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'
-- New: adds 'pending_payment' and 'payment_failed' for payment flow

ALTER TABLE accom_bookings
  DROP CONSTRAINT IF EXISTS accom_bookings_status_check;

ALTER TABLE accom_bookings
  ADD CONSTRAINT accom_bookings_status_check
  CHECK (status IN (
    'pending', 'pending_payment', 'confirmed',
    'checked_in', 'checked_out',
    'cancelled', 'no_show', 'payment_failed'
  ));

-- ============================================================================
-- 2. ADD deposit tracking columns to accom_bookings
-- ============================================================================
-- Note: payment_method already exists from migration 083. Not re-added.

ALTER TABLE accom_bookings
  ADD COLUMN IF NOT EXISTS deposit_amount INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS deposit_percent INTEGER DEFAULT 100;

-- ============================================================================
-- 3. ADD payment config columns to accom_properties
-- ============================================================================
-- Note: accepted_payment_methods and stripe_account_id already exist from 083.

ALTER TABLE accom_properties
  ADD COLUMN IF NOT EXISTS deposit_percent INTEGER NOT NULL DEFAULT 100
    CHECK (deposit_percent BETWEEN 1 AND 100),
  ADD COLUMN IF NOT EXISTS bank_transfer_info JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS crypto_wallets JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS cancellation_window_hours INTEGER NOT NULL DEFAULT 48,
  ADD COLUMN IF NOT EXISTS cancellation_penalty_percent INTEGER NOT NULL DEFAULT 100
    CHECK (cancellation_penalty_percent BETWEEN 0 AND 100);

-- ============================================================================
-- 4. COMMENTS
-- ============================================================================

COMMENT ON COLUMN accom_bookings.deposit_amount IS 'Deposit amount in minor currency units. 0 means full payment or no deposit collected yet.';
COMMENT ON COLUMN accom_bookings.deposit_percent IS 'Deposit percentage applied at time of booking. Snapshot from property config.';
COMMENT ON COLUMN accom_properties.deposit_percent IS 'Owner-configured deposit percentage. 100 = full prepayment, 50 = half upfront.';
COMMENT ON COLUMN accom_properties.bank_transfer_info IS 'JSON: {bank_name, account_number, account_holder, swift_code?, notes?}';
COMMENT ON COLUMN accom_properties.crypto_wallets IS 'JSON: {btc: "address", eth: "address", usdc: "address", ...}';
COMMENT ON COLUMN accom_properties.cancellation_window_hours IS 'Hours before check-in for free cancellation. Default 48h.';
COMMENT ON COLUMN accom_properties.cancellation_penalty_percent IS 'Penalty as percentage of deposit if cancelled outside window. 0-100.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
