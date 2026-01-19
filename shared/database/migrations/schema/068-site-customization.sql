-- =====================================================
-- Migration 068: Site Customization - Dynamic Sections
-- Date: 2026-01-19
-- Description: Enables merchants to customize PWA site sections via backoffice
-- =====================================================

-- =====================================================
-- PART 1: CREATE SITE_SECTIONS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS site_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Ownership
    location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

    -- Section Type
    section_type TEXT NOT NULL CHECK (section_type IN (
        'hero', 'about', 'gallery', 'hours', 'contact', 'social', 'reviews'
    )),

    -- Display Settings
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,

    -- Content (flexible JSON structure per section type)
    -- hero: { title, subtitle, image_url, cta_text, cta_link, overlay_opacity }
    -- about: { title, description, team[], values[] }
    -- gallery: { title, images[] }
    -- hours: { title, show_status_badge }
    -- contact: { title, show_phone, show_email, show_map, map_embed_url }
    -- social: { title, display_style }
    -- reviews: { title, google_place_id, tripadvisor_url, testimonials[] }
    content JSONB NOT NULL DEFAULT '{}',

    -- Style Overrides (optional custom styling)
    style_overrides JSONB DEFAULT '{}',

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Publishing workflow
    published_at TIMESTAMPTZ,  -- NULL = draft, set = published

    -- Ensure one section per type per location
    UNIQUE(location_id, section_type)
);

-- =====================================================
-- PART 2: INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_site_sections_location ON site_sections(location_id);
CREATE INDEX IF NOT EXISTS idx_site_sections_enabled ON site_sections(location_id, is_enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_site_sections_published ON site_sections(location_id, published_at) WHERE published_at IS NOT NULL;

-- =====================================================
-- PART 3: TRIGGER FOR updated_at
-- =====================================================

CREATE TRIGGER site_sections_updated_at
    BEFORE UPDATE ON site_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PART 4: ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;

-- Public read for published sections (needed for PWA)
CREATE POLICY "site_sections_public_read" ON site_sections
    FOR SELECT TO anon
    USING (is_enabled = true AND published_at IS NOT NULL);

-- Authenticated users can read sections for locations they have access to
CREATE POLICY "site_sections_authenticated_read" ON site_sections
    FOR SELECT TO authenticated
    USING (
        location_id IN (
            SELECT l.id
            FROM locations l
            JOIN brands b ON l.brand_id = b.id
            JOIN account_roles ar ON ar.tenant_id = b.organization_id
            WHERE ar.account_id IN (
                SELECT id FROM accounts WHERE auth_id = auth.uid()
            )
        )
    );

-- Authenticated users can insert sections for locations they have access to
CREATE POLICY "site_sections_authenticated_insert" ON site_sections
    FOR INSERT TO authenticated
    WITH CHECK (
        location_id IN (
            SELECT l.id
            FROM locations l
            JOIN brands b ON l.brand_id = b.id
            JOIN account_roles ar ON ar.tenant_id = b.organization_id
            WHERE ar.account_id IN (
                SELECT id FROM accounts WHERE auth_id = auth.uid()
            )
            AND ar.role_type IN ('owner', 'admin', 'manager')
        )
    );

-- Authenticated users can update sections for locations they have access to
CREATE POLICY "site_sections_authenticated_update" ON site_sections
    FOR UPDATE TO authenticated
    USING (
        location_id IN (
            SELECT l.id
            FROM locations l
            JOIN brands b ON l.brand_id = b.id
            JOIN account_roles ar ON ar.tenant_id = b.organization_id
            WHERE ar.account_id IN (
                SELECT id FROM accounts WHERE auth_id = auth.uid()
            )
            AND ar.role_type IN ('owner', 'admin', 'manager')
        )
    );

-- Authenticated users can delete sections for locations they have access to
CREATE POLICY "site_sections_authenticated_delete" ON site_sections
    FOR DELETE TO authenticated
    USING (
        location_id IN (
            SELECT l.id
            FROM locations l
            JOIN brands b ON l.brand_id = b.id
            JOIN account_roles ar ON ar.tenant_id = b.organization_id
            WHERE ar.account_id IN (
                SELECT id FROM accounts WHERE auth_id = auth.uid()
            )
            AND ar.role_type IN ('owner', 'admin')
        )
    );

-- Service role has full access (for backend operations)
CREATE POLICY "site_sections_service_role" ON site_sections
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- PART 5: DEFAULT SECTIONS FUNCTION
-- =====================================================

-- Function to initialize default sections for a new location
CREATE OR REPLACE FUNCTION initialize_site_sections(p_location_id UUID)
RETURNS void AS $$
DECLARE
    v_section_types TEXT[] := ARRAY['hero', 'about', 'gallery', 'hours', 'contact', 'social', 'reviews'];
    v_section_type TEXT;
    v_order INT := 0;
BEGIN
    FOREACH v_section_type IN ARRAY v_section_types
    LOOP
        INSERT INTO site_sections (
            location_id,
            section_type,
            is_enabled,
            display_order,
            content
        ) VALUES (
            p_location_id,
            v_section_type,
            true,
            v_order,
            CASE v_section_type
                WHEN 'hero' THEN '{"title": "", "subtitle": "", "image_url": "", "cta_text": "View Menu", "cta_link": "/menu", "overlay_opacity": 0.4}'::jsonb
                WHEN 'about' THEN '{"title": "About Us", "description": "", "team": [], "values": []}'::jsonb
                WHEN 'gallery' THEN '{"title": "Gallery", "images": []}'::jsonb
                WHEN 'hours' THEN '{"title": "Opening Hours", "show_status_badge": true}'::jsonb
                WHEN 'contact' THEN '{"title": "Contact Us", "show_phone": true, "show_email": true, "show_map": true, "map_embed_url": ""}'::jsonb
                WHEN 'social' THEN '{"title": "Follow Us", "display_style": "buttons"}'::jsonb
                WHEN 'reviews' THEN '{"title": "Reviews", "google_place_id": "", "tripadvisor_url": "", "testimonials": []}'::jsonb
                ELSE '{}'::jsonb
            END
        )
        ON CONFLICT (location_id, section_type) DO NOTHING;

        v_order := v_order + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- =====================================================
-- PART 6: COMMENTS
-- =====================================================

COMMENT ON TABLE site_sections IS 'Customizable sections for merchant PWA sites';
COMMENT ON COLUMN site_sections.section_type IS 'Type of section: hero, about, gallery, hours, contact, social, reviews';
COMMENT ON COLUMN site_sections.content IS 'JSON content structure varies by section_type';
COMMENT ON COLUMN site_sections.style_overrides IS 'Optional CSS/style overrides for the section';
COMMENT ON COLUMN site_sections.published_at IS 'NULL means draft, timestamp means published and visible';
COMMENT ON FUNCTION initialize_site_sections IS 'Creates default sections for a new location';

-- =====================================================
-- Migration complete
-- =====================================================
