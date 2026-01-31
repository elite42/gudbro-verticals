-- ============================================================================
-- Migration 088: Room Codes for QR Access
-- ============================================================================
-- Date: 2026-02-01
-- Description: Adds permanent room codes (RM-XXXXXXXX) to accom_rooms for
--              QR-based guest access. Includes code generation function,
--              auto-set trigger, resolve_room_access() SECURITY DEFINER
--              function for mapping room codes to active bookings.
-- Depends on: 077 (base schema), 081 (timezone column on properties)
-- Part of: v1.5 Frictionless Guest Access (Phase 25)
-- ============================================================================

-- ============================================================================
-- 1. GENERATE ROOM CODE FUNCTION
-- ============================================================================

-- Generate a unique room code like RM-A3HN7KPQ
-- Excludes ambiguous characters: 0/O, 1/I/L
-- Follows generate_booking_code() pattern from migration 077
CREATE OR REPLACE FUNCTION generate_room_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    chars TEXT := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    code TEXT;
    i INTEGER;
    exists_already BOOLEAN;
BEGIN
    LOOP
        code := 'RM-';
        FOR i IN 1..8 LOOP
            code := code || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
        END LOOP;

        SELECT EXISTS(
            SELECT 1 FROM accom_rooms WHERE room_code = code
        ) INTO exists_already;

        IF NOT exists_already THEN
            RETURN code;
        END IF;
    END LOOP;
END;
$$;

-- ============================================================================
-- 2. ADD ROOM_CODE COLUMN (nullable first, for backfill)
-- ============================================================================

ALTER TABLE accom_rooms
    ADD COLUMN IF NOT EXISTS room_code TEXT UNIQUE;

-- ============================================================================
-- 3. SET ROOM CODE TRIGGER FUNCTION
-- ============================================================================

-- Trigger function: auto-set room_code on INSERT if not provided
-- Follows set_booking_code() pattern from migration 077
CREATE OR REPLACE FUNCTION set_room_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.room_code IS NULL THEN
        NEW.room_code := generate_room_code();
    END IF;
    RETURN NEW;
END;
$$;

-- ============================================================================
-- 4. CREATE TRIGGER ON accom_rooms
-- ============================================================================

DROP TRIGGER IF EXISTS set_accom_rooms_room_code ON accom_rooms;
CREATE TRIGGER set_accom_rooms_room_code
    BEFORE INSERT ON accom_rooms
    FOR EACH ROW EXECUTE FUNCTION set_room_code();

-- ============================================================================
-- 5. BACKFILL EXISTING ROOMS
-- ============================================================================

-- Generate room codes for all existing rooms that don't have one
UPDATE accom_rooms SET room_code = generate_room_code() WHERE room_code IS NULL;

-- Now make the column NOT NULL (safe because all rows have been backfilled)
ALTER TABLE accom_rooms ALTER COLUMN room_code SET NOT NULL;

-- ============================================================================
-- 6. INDEX FOR FAST ROOM CODE LOOKUP
-- ============================================================================

-- Note: UNIQUE constraint creates an implicit unique index, but we add an
-- explicit named one for clarity and documentation purposes
CREATE INDEX IF NOT EXISTS idx_accom_rooms_room_code ON accom_rooms(room_code);

-- ============================================================================
-- 7. RESOLVE ROOM ACCESS FUNCTION
-- ============================================================================

-- Maps a room code to the active booking for that room.
-- Three possible return shapes:
--   1. is_valid=false: room code does not exist or room is inactive
--   2. is_valid=true, has_active_booking=true: active booking found
--   3. is_valid=true, has_active_booking=false: valid room but no active booking (fallback)
--
-- Uses timezone-aware date comparison: (NOW() AT TIME ZONE property.timezone)::DATE
-- NOT CURRENT_DATE (avoids timezone mismatch near midnight)
--
-- Called by unauthenticated guests via QR scan (anon role)
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
    check_out DATE
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
            NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::DATE, NULL::DATE;
        RETURN;
    END IF;

    -- Step 2: Get property timezone for date resolution
    SELECT COALESCE(p.timezone, 'Asia/Ho_Chi_Minh')
    INTO v_timezone
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
        b.check_out_date
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
            NULL::DATE;
    END IF;
END;
$$;

-- ============================================================================
-- 8. GRANTS
-- ============================================================================

-- Anon needs EXECUTE on resolve_room_access because guests call it via
-- the room QR code (unauthenticated scan)
GRANT EXECUTE ON FUNCTION generate_room_code() TO anon;
GRANT EXECUTE ON FUNCTION generate_room_code() TO authenticated;
GRANT EXECUTE ON FUNCTION resolve_room_access(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION resolve_room_access(TEXT) TO authenticated;

-- ============================================================================
-- 9. COMMENTS
-- ============================================================================

COMMENT ON COLUMN accom_rooms.room_code IS 'Permanent room identifier for QR codes. Format: RM-XXXXXXXX. Never changes between bookings.';
COMMENT ON FUNCTION generate_room_code() IS 'Generates a unique RM-XXXXXXXX room code, excluding ambiguous characters (0/O/1/I/L).';
COMMENT ON FUNCTION resolve_room_access(TEXT) IS 'Maps a room code to the active booking. Returns property+room info even without active booking (fallback for vacant rooms).';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
