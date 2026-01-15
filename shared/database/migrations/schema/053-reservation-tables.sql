-- ============================================================================
-- 053-reservation-tables.sql
-- RESERVATIONS SYSTEM - Location Sections & Tables
-- ============================================================================

-- ============================================================================
-- 1. LOCATION_SECTIONS - Areas within a location (Terrazza, Sala, VIP, etc.)
-- ============================================================================

CREATE TABLE location_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

    -- Identity
    name TEXT NOT NULL,
    name_translations JSONB DEFAULT '{}',
    code TEXT NOT NULL,
    description TEXT,

    -- Capacity
    max_capacity INTEGER NOT NULL DEFAULT 0,
    default_covers_per_table INTEGER DEFAULT 4,

    -- Characteristics
    section_type TEXT NOT NULL DEFAULT 'indoor' CHECK (section_type IN (
        'indoor', 'outdoor', 'semi_outdoor', 'private', 'bar', 'terrace', 'garden'
    )),
    amenities JSONB DEFAULT '[]',
    weather_dependent BOOLEAN DEFAULT FALSE,

    -- Availability
    is_reservable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,

    -- Floor plan positioning
    floor_plan_config JSONB DEFAULT '{}',
    color_hex TEXT DEFAULT '#3B82F6',

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(location_id, code)
);

COMMENT ON TABLE location_sections IS 'Areas within a restaurant location (terrace, indoor, VIP room, etc.)';
COMMENT ON COLUMN location_sections.amenities IS 'Array: ["smoking_allowed", "pets_allowed", "wheelchair_accessible", "scenic_view", "air_conditioned", "heated"]';
COMMENT ON COLUMN location_sections.floor_plan_config IS 'Object: {x, y, width, height, rotation} for visual editor';

-- ============================================================================
-- 2. LOCATION_TABLES - Individual tables within sections
-- ============================================================================

CREATE TABLE location_tables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
    section_id UUID REFERENCES location_sections(id) ON DELETE SET NULL,

    -- Identity
    table_number TEXT NOT NULL,
    display_name TEXT,

    -- Capacity
    min_capacity INTEGER NOT NULL DEFAULT 1,
    max_capacity INTEGER NOT NULL DEFAULT 4,
    optimal_capacity INTEGER NOT NULL DEFAULT 2,

    -- Physical attributes
    table_shape TEXT DEFAULT 'rectangular' CHECK (table_shape IN (
        'rectangular', 'round', 'square', 'oval', 'booth', 'bar_stool', 'long'
    )),
    table_size TEXT DEFAULT 'standard' CHECK (table_size IN (
        'small', 'standard', 'large', 'xl'
    )),

    -- Combinability
    is_combinable BOOLEAN DEFAULT TRUE,
    combine_with JSONB DEFAULT '[]',

    -- Features
    features JSONB DEFAULT '[]',
    priority INTEGER DEFAULT 50 CHECK (priority >= 0 AND priority <= 100),

    -- Availability
    is_reservable BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,

    -- Floor plan positioning
    floor_plan_config JSONB DEFAULT '{}',

    -- Notes for staff
    notes TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    UNIQUE(location_id, table_number)
);

COMMENT ON TABLE location_tables IS 'Individual tables within restaurant sections';
COMMENT ON COLUMN location_tables.features IS 'Array: ["window", "corner", "romantic", "high_chair", "wheelchair_accessible", "power_outlet", "quiet"]';
COMMENT ON COLUMN location_tables.priority IS 'Higher = preferred for assignment (0-100). Use for best tables.';
COMMENT ON COLUMN location_tables.combine_with IS 'Array of table_ids that can be combined with this table';

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Sections indexes
CREATE INDEX idx_location_sections_location ON location_sections(location_id);
CREATE INDEX idx_location_sections_active ON location_sections(location_id, is_active)
    WHERE is_active = TRUE;
CREATE INDEX idx_location_sections_reservable ON location_sections(location_id, is_reservable)
    WHERE is_reservable = TRUE AND is_active = TRUE;

-- Tables indexes
CREATE INDEX idx_location_tables_location ON location_tables(location_id);
CREATE INDEX idx_location_tables_section ON location_tables(section_id);
CREATE INDEX idx_location_tables_active ON location_tables(location_id, is_active)
    WHERE is_active = TRUE;
CREATE INDEX idx_location_tables_capacity ON location_tables(location_id, min_capacity, max_capacity);
CREATE INDEX idx_location_tables_reservable ON location_tables(location_id, is_reservable)
    WHERE is_reservable = TRUE AND is_active = TRUE;

-- ============================================================================
-- 4. TRIGGERS
-- ============================================================================

-- Update updated_at trigger for sections
CREATE OR REPLACE FUNCTION update_location_sections_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_location_sections_updated_at
    BEFORE UPDATE ON location_sections
    FOR EACH ROW EXECUTE FUNCTION update_location_sections_updated_at();

-- Update updated_at trigger for tables
CREATE OR REPLACE FUNCTION update_location_tables_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_location_tables_updated_at
    BEFORE UPDATE ON location_tables
    FOR EACH ROW EXECUTE FUNCTION update_location_tables_updated_at();

-- Update section capacity when tables change
CREATE OR REPLACE FUNCTION update_section_capacity()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the section's max_capacity based on sum of table capacities
    UPDATE location_sections
    SET max_capacity = (
        SELECT COALESCE(SUM(max_capacity), 0)
        FROM location_tables
        WHERE section_id = COALESCE(NEW.section_id, OLD.section_id)
        AND is_active = TRUE
    ),
    updated_at = NOW()
    WHERE id = COALESCE(NEW.section_id, OLD.section_id);

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_update_section_capacity
    AFTER INSERT OR UPDATE OR DELETE ON location_tables
    FOR EACH ROW EXECUTE FUNCTION update_section_capacity();

-- ============================================================================
-- 5. RLS POLICIES
-- ============================================================================

ALTER TABLE location_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_tables ENABLE ROW LEVEL SECURITY;

-- Sections: Public read for active sections (for customer booking)
CREATE POLICY "location_sections_public_select"
ON location_sections
FOR SELECT
USING (is_active = TRUE);

-- Sections: Staff can manage via service role
CREATE POLICY "location_sections_service_role_all"
ON location_sections
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Sections: Authenticated users with location access can manage
CREATE POLICY "location_sections_authenticated_manage"
ON location_sections
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = location_sections.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = location_sections.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
);

-- Tables: Public read for active tables (for customer booking)
CREATE POLICY "location_tables_public_select"
ON location_tables
FOR SELECT
USING (is_active = TRUE);

-- Tables: Staff can manage via service role
CREATE POLICY "location_tables_service_role_all"
ON location_tables
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Tables: Authenticated users with location access can manage
CREATE POLICY "location_tables_authenticated_manage"
ON location_tables
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = location_tables.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = auth.uid()
        AND ar.tenant_id = location_tables.location_id
        AND ar.tenant_type = 'location'
        AND ar.role_type IN ('owner', 'manager', 'admin')
        AND ar.is_active = TRUE
    )
);

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Get total capacity for a location
CREATE OR REPLACE FUNCTION get_location_total_capacity(p_location_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_total INTEGER;
BEGIN
    SELECT COALESCE(SUM(max_capacity), 0)
    INTO v_total
    FROM location_tables
    WHERE location_id = p_location_id
    AND is_active = TRUE
    AND is_reservable = TRUE;

    RETURN v_total;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get available tables for a party size
CREATE OR REPLACE FUNCTION get_tables_for_party_size(
    p_location_id UUID,
    p_party_size INTEGER,
    p_section_id UUID DEFAULT NULL
)
RETURNS TABLE (
    table_id UUID,
    table_number TEXT,
    display_name TEXT,
    section_id UUID,
    section_name TEXT,
    min_capacity INTEGER,
    max_capacity INTEGER,
    priority INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id AS table_id,
        t.table_number,
        t.display_name,
        t.section_id,
        s.name AS section_name,
        t.min_capacity,
        t.max_capacity,
        t.priority
    FROM location_tables t
    LEFT JOIN location_sections s ON s.id = t.section_id
    WHERE t.location_id = p_location_id
    AND t.is_active = TRUE
    AND t.is_reservable = TRUE
    AND t.min_capacity <= p_party_size
    AND t.max_capacity >= p_party_size
    AND (p_section_id IS NULL OR t.section_id = p_section_id)
    ORDER BY
        t.priority DESC,
        ABS(t.optimal_capacity - p_party_size) ASC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- End of migration 053
-- ============================================================================
