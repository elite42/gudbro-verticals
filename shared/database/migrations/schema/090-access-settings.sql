-- ============================================================================
-- Migration 090: Access Settings for Owner Security Configuration
-- ============================================================================
-- Date: 2026-02-01
-- Description: Adds access_settings JSONB column to accom_properties so owners
--              can configure per-action verification gates. Updates
--              resolve_room_access() to return access_settings alongside
--              guest_verification_method.
-- Depends on: 089 (progressive auth)
-- Part of: v1.5 Frictionless Guest Access (Phase 27)
-- ============================================================================

-- ============================================================================
-- 1. ADD ACCESS_SETTINGS JSONB COLUMN
-- ============================================================================

ALTER TABLE accom_properties
    ADD COLUMN IF NOT EXISTS access_settings JSONB DEFAULT '{
        "preset": "standard",
        "actions": {
            "order_service": true,
            "order_fnb": true,
            "request_checkout": false,
            "view_orders": false,
            "contact_host": false
        }
    }'::JSONB;

-- Ensure preset is one of the three valid values
ALTER TABLE accom_properties
    ADD CONSTRAINT accom_properties_access_settings_preset_check
    CHECK (
        access_settings IS NULL
        OR access_settings->>'preset' IN ('family', 'standard', 'structured')
    );

COMMENT ON COLUMN accom_properties.access_settings IS
    'JSONB config for per-action verification gates. preset: family|standard|structured. '
    'actions map: true = requires verification (gated), false = free for browse tier. '
    'Family = all free, Standard = orders gated, Structured = everything gated.';

-- ============================================================================
-- 2. UPDATE resolve_room_access() TO RETURN access_settings
-- ============================================================================

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
    guest_verification_method TEXT,
    access_settings JSONB
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
    v_access_settings JSONB;
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
            NULL::TEXT, NULL::JSONB;
        RETURN;
    END IF;

    -- Step 2: Get property timezone, verification method, and access settings
    SELECT
        COALESCE(p.timezone, 'Asia/Ho_Chi_Minh'),
        COALESCE(p.guest_verification_method, 'last_name'),
        p.access_settings
    INTO v_timezone, v_verification_method, v_access_settings
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
        v_verification_method,
        v_access_settings
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
            true,
            false,
            v_property_id,
            v_room_id,
            NULL::UUID,
            v_room_number,
            v_room_type,
            NULL::TEXT,
            NULL::DATE,
            NULL::DATE,
            v_verification_method,
            v_access_settings;
    END IF;
END;
$$;

-- ============================================================================
-- 3. GRANTS (maintain existing permissions)
-- ============================================================================

GRANT EXECUTE ON FUNCTION resolve_room_access(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION resolve_room_access(TEXT) TO authenticated;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
