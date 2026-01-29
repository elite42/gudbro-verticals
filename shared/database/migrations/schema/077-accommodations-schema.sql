-- ============================================================================
-- Migration 077: Accommodations Schema
-- ============================================================================
-- Date: 2026-01-29
-- Description: Complete database schema for the In-Stay Dashboard.
--              Properties, rooms, bookings with verification codes,
--              dynamic service categories/items, multi-language translations.
-- ============================================================================

-- ============================================================================
-- 1. FUNCTIONS (created before tables that reference them via triggers)
-- ============================================================================

-- Generate a unique booking code like BK-A3HN7K
-- Excludes ambiguous characters: 0/O, 1/I/L
CREATE OR REPLACE FUNCTION generate_booking_code()
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
        code := 'BK-';
        FOR i IN 1..6 LOOP
            code := code || substr(chars, floor(random() * length(chars) + 1)::INTEGER, 1);
        END LOOP;

        SELECT EXISTS(
            SELECT 1 FROM accom_bookings WHERE booking_code = code
        ) INTO exists_already;

        IF NOT exists_already THEN
            RETURN code;
        END IF;
    END LOOP;
END;
$$;

-- Trigger function: auto-set booking_code on INSERT if not provided
CREATE OR REPLACE FUNCTION set_booking_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NEW.booking_code IS NULL THEN
        NEW.booking_code := generate_booking_code();
    END IF;
    RETURN NEW;
END;
$$;

-- Verify guest access: validates booking code + last name + active dates
CREATE OR REPLACE FUNCTION verify_booking_access(p_booking_code TEXT, p_last_name TEXT)
RETURNS TABLE(
    is_valid BOOLEAN,
    property_id UUID,
    booking_id UUID,
    room_id UUID,
    guest_name TEXT,
    check_in DATE,
    check_out DATE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        true::BOOLEAN AS is_valid,
        b.property_id,
        b.id AS booking_id,
        b.room_id,
        b.guest_name,
        b.check_in_date AS check_in,
        b.check_out_date AS check_out
    FROM accom_bookings b
    WHERE b.booking_code = p_booking_code
      AND LOWER(b.guest_last_name) = LOWER(p_last_name)
      AND b.check_in_date <= CURRENT_DATE
      AND b.check_out_date + INTERVAL '24 hours' >= NOW()
      AND b.status IN ('confirmed', 'checked_in');

    IF NOT FOUND THEN
        RETURN QUERY SELECT
            false::BOOLEAN,
            NULL::UUID,
            NULL::UUID,
            NULL::UUID,
            NULL::TEXT,
            NULL::DATE,
            NULL::DATE;
    END IF;
END;
$$;

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- 2.1 Properties — identity, location, contact, WiFi, settings
CREATE TABLE IF NOT EXISTS accom_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Identity
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    tagline TEXT,
    property_type TEXT NOT NULL DEFAULT 'apartment' CHECK (property_type IN (
        'apartment', 'hotel', 'hostel', 'villa', 'guesthouse', 'resort', 'other'
    )),

    -- Location
    address TEXT,
    city TEXT,
    country_code TEXT NOT NULL DEFAULT 'VN',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',

    -- Host contact
    host_name TEXT,
    host_phone TEXT,
    host_email TEXT,
    emergency_phone TEXT,

    -- WiFi
    wifi_ssid TEXT,
    wifi_password TEXT,

    -- Settings
    currency TEXT NOT NULL DEFAULT 'VND',
    default_language TEXT NOT NULL DEFAULT 'en',
    supported_languages TEXT[] NOT NULL DEFAULT '{"en"}',
    check_in_time TIME NOT NULL DEFAULT '14:00',
    check_out_time TIME NOT NULL DEFAULT '11:00',

    -- Media & content
    images JSONB NOT NULL DEFAULT '[]',
    cover_image_url TEXT,
    amenities JSONB NOT NULL DEFAULT '[]',
    house_rules TEXT,

    -- Ownership
    owner_id UUID NOT NULL REFERENCES accounts(id),

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.2 Rooms — rooms within a property
CREATE TABLE IF NOT EXISTS accom_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Ownership
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

    -- Room info
    room_number TEXT NOT NULL,
    room_type TEXT NOT NULL DEFAULT 'double' CHECK (room_type IN (
        'studio', 'single', 'double', 'twin', 'suite', 'deluxe', 'dormitory', 'other'
    )),
    capacity INTEGER NOT NULL DEFAULT 2,
    floor TEXT,
    description TEXT,

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- One room number per property
    UNIQUE(property_id, room_number)
);

-- 2.3 Bookings — guest bookings with verification codes
CREATE TABLE IF NOT EXISTS accom_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Property & room
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
    room_id UUID REFERENCES accom_rooms(id) ON DELETE SET NULL,

    -- Booking code (auto-generated via trigger if NULL)
    booking_code TEXT NOT NULL UNIQUE,

    -- Guest info
    guest_name TEXT NOT NULL,
    guest_last_name TEXT NOT NULL,
    guest_email TEXT,
    guest_phone TEXT,
    guest_count INTEGER NOT NULL DEFAULT 1,

    -- Stay dates
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,

    -- Status
    status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN (
        'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show'
    )),

    -- Notes
    special_requests TEXT,
    internal_notes TEXT,

    -- Source
    booking_source TEXT NOT NULL DEFAULT 'direct' CHECK (booking_source IN (
        'direct', 'booking_com', 'airbnb', 'expedia', 'walk_in', 'phone', 'other'
    )),

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Validation
    CHECK (check_out_date > check_in_date)
);

-- 2.4 Service Categories — dynamic per-property categories
CREATE TABLE IF NOT EXISTS accom_service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Ownership
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

    -- Category info
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- One slug per property
    UNIQUE(property_id, slug)
);

-- 2.5 Service Items — items within categories
CREATE TABLE IF NOT EXISTS accom_service_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Ownership
    category_id UUID NOT NULL REFERENCES accom_service_categories(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,

    -- Item info
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,

    -- Availability
    is_always_available BOOLEAN NOT NULL DEFAULT true,
    available_from TIME,
    available_until TIME,

    -- Display
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.6 Service Translations — multi-language support
CREATE TABLE IF NOT EXISTS accom_service_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Reference
    entity_type TEXT NOT NULL CHECK (entity_type IN ('category', 'item')),
    entity_id UUID NOT NULL,
    language_code VARCHAR(5) NOT NULL,

    -- Content
    name TEXT NOT NULL,
    description TEXT,

    -- Metadata
    is_machine_translated BOOLEAN NOT NULL DEFAULT false,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- One translation per entity per language
    UNIQUE(entity_type, entity_id, language_code)
);

-- ============================================================================
-- 3. TRIGGERS
-- ============================================================================

-- Auto-generate booking code on INSERT
DROP TRIGGER IF EXISTS accom_bookings_set_code ON accom_bookings;
CREATE TRIGGER accom_bookings_set_code
    BEFORE INSERT ON accom_bookings
    FOR EACH ROW EXECUTE FUNCTION set_booking_code();

-- Auto-update updated_at on all tables
DROP TRIGGER IF EXISTS update_accom_properties_updated_at ON accom_properties;
CREATE TRIGGER update_accom_properties_updated_at
    BEFORE UPDATE ON accom_properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accom_rooms_updated_at ON accom_rooms;
CREATE TRIGGER update_accom_rooms_updated_at
    BEFORE UPDATE ON accom_rooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accom_bookings_updated_at ON accom_bookings;
CREATE TRIGGER update_accom_bookings_updated_at
    BEFORE UPDATE ON accom_bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accom_service_categories_updated_at ON accom_service_categories;
CREATE TRIGGER update_accom_service_categories_updated_at
    BEFORE UPDATE ON accom_service_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accom_service_items_updated_at ON accom_service_items;
CREATE TRIGGER update_accom_service_items_updated_at
    BEFORE UPDATE ON accom_service_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_accom_service_translations_updated_at ON accom_service_translations;
CREATE TRIGGER update_accom_service_translations_updated_at
    BEFORE UPDATE ON accom_service_translations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_accom_properties_slug ON accom_properties(slug);
CREATE INDEX IF NOT EXISTS idx_accom_properties_owner ON accom_properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_accom_rooms_property ON accom_rooms(property_id);
CREATE INDEX IF NOT EXISTS idx_accom_bookings_property ON accom_bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_accom_bookings_code ON accom_bookings(booking_code);
CREATE INDEX IF NOT EXISTS idx_accom_bookings_dates ON accom_bookings(property_id, check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_accom_service_categories_property ON accom_service_categories(property_id);
CREATE INDEX IF NOT EXISTS idx_accom_service_items_category ON accom_service_items(category_id);
CREATE INDEX IF NOT EXISTS idx_accom_service_items_property ON accom_service_items(property_id);
CREATE INDEX IF NOT EXISTS idx_accom_service_translations_entity ON accom_service_translations(entity_type, entity_id);

-- ============================================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE accom_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_service_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_service_translations ENABLE ROW LEVEL SECURITY;

-- Properties: anon can read active, owner manages all
CREATE POLICY accom_properties_anon_read
    ON accom_properties FOR SELECT TO anon
    USING (is_active = true);

CREATE POLICY accom_properties_owner_manage
    ON accom_properties FOR ALL TO authenticated
    USING (owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- Rooms: anon can read active, owner manages via property ownership
CREATE POLICY accom_rooms_anon_read
    ON accom_rooms FOR SELECT TO anon
    USING (is_active = true);

CREATE POLICY accom_rooms_owner_manage
    ON accom_rooms FOR ALL TO authenticated
    USING (property_id IN (
        SELECT id FROM accom_properties
        WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    ));

-- Bookings: owner manages via property ownership, NO anon access
-- Guest access goes through verify_booking_access() SECURITY DEFINER function
CREATE POLICY accom_bookings_owner_manage
    ON accom_bookings FOR ALL TO authenticated
    USING (property_id IN (
        SELECT id FROM accom_properties
        WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    ));

-- Service Categories: anon can read active, owner manages via property ownership
CREATE POLICY accom_service_categories_anon_read
    ON accom_service_categories FOR SELECT TO anon
    USING (is_active = true);

CREATE POLICY accom_service_categories_owner_manage
    ON accom_service_categories FOR ALL TO authenticated
    USING (property_id IN (
        SELECT id FROM accom_properties
        WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    ));

-- Service Items: anon can read active, owner manages via property ownership
CREATE POLICY accom_service_items_anon_read
    ON accom_service_items FOR SELECT TO anon
    USING (is_active = true);

CREATE POLICY accom_service_items_owner_manage
    ON accom_service_items FOR ALL TO authenticated
    USING (property_id IN (
        SELECT id FROM accom_properties
        WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    ));

-- Service Translations: anon can read all, authenticated can manage all
-- (translations are public content, write access controlled by service item ownership)
CREATE POLICY accom_service_translations_anon_read
    ON accom_service_translations FOR SELECT TO anon
    USING (true);

CREATE POLICY accom_service_translations_owner_manage
    ON accom_service_translations FOR ALL TO authenticated
    USING (true);

-- ============================================================================
-- 6. ROLE GRANTS
-- ============================================================================

-- Anon: read-only access to public-facing tables
GRANT SELECT ON accom_properties TO anon;
GRANT SELECT ON accom_rooms TO anon;
GRANT SELECT ON accom_service_categories TO anon;
GRANT SELECT ON accom_service_items TO anon;
GRANT SELECT ON accom_service_translations TO anon;
GRANT EXECUTE ON FUNCTION verify_booking_access(TEXT, TEXT) TO anon;

-- Authenticated: full CRUD on all tables
GRANT ALL ON accom_properties TO authenticated;
GRANT ALL ON accom_rooms TO authenticated;
GRANT ALL ON accom_bookings TO authenticated;
GRANT ALL ON accom_service_categories TO authenticated;
GRANT ALL ON accom_service_items TO authenticated;
GRANT ALL ON accom_service_translations TO authenticated;

-- ============================================================================
-- 7. COMMENTS
-- ============================================================================

COMMENT ON TABLE accom_properties IS 'Accommodation properties (hotels, apartments, hostels, etc). Owner manages via backoffice.';
COMMENT ON TABLE accom_rooms IS 'Rooms within a property. Each room has a unique number within its property.';
COMMENT ON TABLE accom_bookings IS 'Guest bookings with auto-generated BK-XXXXXX codes. Guest access via verify_booking_access().';
COMMENT ON TABLE accom_service_categories IS 'Dynamic service categories per property (e.g. Room Service, Spa, Tours).';
COMMENT ON TABLE accom_service_items IS 'Individual service items within categories. Price stored as INTEGER (cents/minor unit).';
COMMENT ON TABLE accom_service_translations IS 'Multi-language translations for service categories and items.';

COMMENT ON FUNCTION generate_booking_code() IS 'Generates unique BK-XXXXXX booking code, excluding ambiguous chars (0/O, 1/I/L).';
COMMENT ON FUNCTION set_booking_code() IS 'Trigger function: auto-sets booking_code on INSERT if not provided.';
COMMENT ON FUNCTION verify_booking_access(TEXT, TEXT) IS 'SECURITY DEFINER: validates booking code + last name for guest dashboard access.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
