-- ============================================================================
-- Migration 089: Progressive Authentication Support
-- ============================================================================
-- Date: 2026-02-01
-- Description: Adds verification PIN column on accom_bookings and
--              guest_verification_method on accom_properties for progressive
--              authentication. Updates resolve_room_access() to return
--              the verification method.
-- Depends on: 088 (room codes)
-- Part of: v1.5 Frictionless Guest Access (Phase 26)
-- ============================================================================

-- ============================================================================
-- 1. ADD VERIFICATION PIN TO BOOKINGS
-- ============================================================================

ALTER TABLE accom_bookings
    ADD COLUMN IF NOT EXISTS verification_pin TEXT;

COMMENT ON COLUMN accom_bookings.verification_pin IS 'Optional PIN for guest identity verification when property uses PIN method. Set by property owner per booking.';

-- ============================================================================
-- 2. ADD GUEST VERIFICATION METHOD TO PROPERTIES
-- ============================================================================

ALTER TABLE accom_properties
    ADD COLUMN IF NOT EXISTS guest_verification_method TEXT DEFAULT 'last_name'
        CHECK (guest_verification_method IN ('last_name', 'pin'));

COMMENT ON COLUMN accom_properties.guest_verification_method IS 'Method used to verify guest identity for session upgrade. last_name = partial last name match; pin = exact PIN match.';

-- ============================================================================
-- 3. UPDATE resolve_room_access() TO RETURN VERIFICATION METHOD
-- ============================================================================

-- Adds guest_verification_method to the return table so the frontend knows
-- which verification input to show.
CREATE OR REPLACE FUNCTION resolve_room_access(p_room_code TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    has_active_booking BOOLEAN,
    property_id UUID,
    room_id UUID,
    booking_id UUID,
    room_number TEXT,
    room_type TEXT,
    guest_name TEXT,
    check_in DATE,
    check_out DATE,
    guest_verification_method TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_room_id UUID;
    v_property_id UUID;
    v_room_number TEXT;
    v_room_type TEXT;
    v_timezone TEXT;
    v_local_today DATE;
    v_verification_method TEXT;
BEGIN
    -- Step 1: Find the room by code
    SELECT r.id, r.property_id, r.room_number, r.room_type
    INTO v_room_id, v_property_id, v_room_number, v_room_type
    FROM accom_rooms r
    WHERE r.room_code = p_room_code
      AND r.is_active = true;

    -- Invalid room code or inactive room
    IF v_room_id IS NULL THEN
        RETURN QUERY SELECT
            false, false, NULL::UUID, NULL::UUID, NULL::UUID,
            NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::DATE, NULL::DATE,
            NULL::TEXT;
        RETURN;
    END IF;

    -- Step 2: Get property timezone and verification method
    SELECT COALESCE(p.timezone, 'Asia/Ho_Chi_Minh'), COALESCE(p.guest_verification_method, 'last_name')
    INTO v_timezone, v_verification_method
    FROM accom_properties p
    WHERE p.id = v_property_id;

    v_local_today := (NOW() AT TIME ZONE v_timezone)::DATE;

    -- Step 3: Find active booking for this room (timezone-aware)
    RETURN QUERY
    SELECT
        true,
        true,
        v_property_id,
        v_room_id,
        b.id,
        v_room_number,
        v_room_type,
        b.guest_name,
        b.check_in_date,
        b.check_out_date,
        v_verification_method
    FROM accom_bookings b
    WHERE b.room_id = v_room_id
      AND b.check_in_date <= v_local_today
      AND b.check_out_date + INTERVAL '24 hours' >= NOW()
      AND b.status IN ('confirmed', 'checked_in')
    ORDER BY b.check_in_date DESC
    LIMIT 1;

    -- Step 4: No active booking -> return room/property info only
    IF NOT FOUND THEN
        RETURN QUERY SELECT
            true,            -- room code is valid
            false,           -- but no active booking
            v_property_id,
            v_room_id,
            NULL::UUID,      -- no booking
            v_room_number,
            v_room_type,
            NULL::TEXT,      -- no guest name
            NULL::DATE,
            NULL::DATE,
            v_verification_method;
    END IF;
END;
$$;

-- ============================================================================
-- 4. GRANTS (maintain existing permissions)
-- ============================================================================

GRANT EXECUTE ON FUNCTION resolve_room_access(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION resolve_room_access(TEXT) TO authenticated;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
