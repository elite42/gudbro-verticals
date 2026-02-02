-- Migration 100: Guest Lifecycle — Returning Guest Detection + Checkout Requests
-- Phase 38: Guest Lifecycle Management
-- Created: 2026-02-02

-- =============================================================================
-- 1. find_returning_guest() — Multi-signal returning guest detection
-- =============================================================================
-- Uses OR-based multi-signal matching: email, name+phone, name+country.
-- NEVER matches on name alone (every signal requires a secondary identifier).
-- Returns previous visit count and last visit date for the same property.

CREATE OR REPLACE FUNCTION find_returning_guest(
  p_property_id UUID,
  p_booking_id UUID,
  p_guest_email TEXT,
  p_guest_name TEXT,
  p_guest_last_name TEXT,
  p_guest_country TEXT,
  p_guest_phone TEXT
)
RETURNS TABLE(previous_visits INTEGER, last_visit_date DATE)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::INTEGER AS previous_visits,
    MAX(b.check_out_date)::DATE AS last_visit_date
  FROM accom_bookings b
  WHERE b.property_id = p_property_id
    AND b.id != p_booking_id
    AND b.status IN ('checked_out', 'confirmed', 'checked_in')
    AND (
      -- Signal 1: Email match (both non-null)
      (
        p_guest_email IS NOT NULL
        AND b.guest_email IS NOT NULL
        AND LOWER(TRIM(b.guest_email)) = LOWER(TRIM(p_guest_email))
      )
      OR
      -- Signal 2: Full name + phone match
      (
        p_guest_phone IS NOT NULL
        AND b.guest_phone IS NOT NULL
        AND LOWER(TRIM(b.guest_name)) = LOWER(TRIM(p_guest_name))
        AND LOWER(TRIM(b.guest_last_name)) = LOWER(TRIM(p_guest_last_name))
        AND b.guest_phone = p_guest_phone
      )
      OR
      -- Signal 3: Full name + country match
      (
        p_guest_country IS NOT NULL
        AND b.guest_country IS NOT NULL
        AND LOWER(TRIM(b.guest_name)) = LOWER(TRIM(p_guest_name))
        AND LOWER(TRIM(b.guest_last_name)) = LOWER(TRIM(p_guest_last_name))
        AND LOWER(TRIM(b.guest_country)) = LOWER(TRIM(p_guest_country))
      )
    );
END;
$$;

COMMENT ON FUNCTION find_returning_guest IS
  'Detect returning guests at a property using multi-signal matching (email, name+phone, name+country). Never matches on name alone.';


-- =============================================================================
-- 2. accom_checkout_requests — Early check-in / late checkout requests
-- =============================================================================

CREATE TABLE accom_checkout_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  request_type TEXT NOT NULL CHECK (request_type IN ('early_checkin', 'late_checkout')),
  requested_time TIME NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  owner_response TEXT,
  responded_at TIMESTAMPTZ,
  has_conflict BOOLEAN DEFAULT FALSE,
  conflict_booking_id UUID REFERENCES accom_bookings(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_checkout_requests_booking ON accom_checkout_requests(booking_id);
CREATE INDEX idx_checkout_requests_property_status ON accom_checkout_requests(property_id, status);

-- Unique constraint: one request per type per booking
ALTER TABLE accom_checkout_requests
  ADD CONSTRAINT uq_checkout_request_type_per_booking UNIQUE (booking_id, request_type);

COMMENT ON TABLE accom_checkout_requests IS
  'Guest requests for early check-in or late checkout, with owner approval workflow and conflict detection.';
