-- =====================================================
-- Migration 012: Multi-Tenant Architecture
-- Date: 2025-12-06
-- Description: Creates Partners, Organizations, Brands, Locations structure
-- ADR: ADR-003 Multi-Tenant Architecture
-- =====================================================

-- =====================================================
-- PART 1: CREATE NEW TABLES
-- =====================================================

-- 1.1 Partners (National/Regional Licensees)
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,

  -- Territory
  territory_type VARCHAR(20) NOT NULL CHECK (territory_type IN ('country', 'region', 'city')),
  territory_codes TEXT[] NOT NULL,  -- ['IT'] or ['IT-MI', 'IT-TO'] or ['US-CA', 'US-NY']
  is_exclusive BOOLEAN NOT NULL DEFAULT true,

  -- Commercial
  royalty_pct DECIMAL(5,2) NOT NULL DEFAULT 20.00,  -- % GUDBRO takes from partner revenue

  -- Contact
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  billing_email VARCHAR(255),
  billing_address TEXT,
  tax_id VARCHAR(50),  -- VAT number / Tax ID

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'terminated')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 1.2 Organizations (Paying Customers)
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,

  -- Type
  type VARCHAR(20) NOT NULL DEFAULT 'standard' CHECK (type IN ('standard', 'enterprise')),

  -- Partner relationship (NULL for enterprise clients)
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,

  -- Subscription (NULL for enterprise - custom pricing)
  subscription_plan VARCHAR(20) CHECK (subscription_plan IN ('free', 'starter', 'pro')),
  subscription_status VARCHAR(20) DEFAULT 'active' CHECK (subscription_status IN ('active', 'past_due', 'cancelled', 'trialing')),

  -- Billing
  billing_email VARCHAR(255),
  billing_address TEXT,
  tax_id VARCHAR(50),
  stripe_customer_id VARCHAR(255),

  -- Status
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 1.3 Brands (Business Identities)
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Ownership
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  -- Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,

  -- Business type
  business_type VARCHAR(20) NOT NULL DEFAULT 'fnb' CHECK (business_type IN ('fnb', 'hotel', 'rental', 'wellness', 'other')),

  -- Branding
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#000000',
  secondary_color VARCHAR(7),

  -- Default menu (locations can override)
  default_menu_id UUID,  -- FK to menus table (will add later)

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 1.4 Locations (Physical Points of Sale)
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Ownership
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,

  -- Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL,  -- Unique within brand, not globally
  description TEXT,

  -- Address
  address TEXT,
  city VARCHAR(255),
  postal_code VARCHAR(20),
  country_code VARCHAR(2) NOT NULL REFERENCES countries(code),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Locale (per-location settings)
  currency_code VARCHAR(3) NOT NULL DEFAULT 'USD',
  primary_language VARCHAR(5) NOT NULL DEFAULT 'en',
  enabled_languages TEXT[] NOT NULL DEFAULT ARRAY['en'],
  timezone VARCHAR(50),

  -- Contact
  phone VARCHAR(50),
  email VARCHAR(255),

  -- Menu (overrides brand default if set)
  menu_id UUID,  -- FK to menus table

  -- Operating hours (JSON for flexibility)
  operating_hours JSONB,  -- {"mon": {"open": "09:00", "close": "22:00"}, ...}

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Unique slug per brand
  UNIQUE(brand_id, slug)
);

-- 1.5 Enterprise Leads (Pre-sales)
CREATE TABLE IF NOT EXISTS enterprise_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Company info
  company_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(50),

  -- Requirements
  estimated_locations INT,
  countries TEXT[],
  current_solution TEXT,
  message TEXT,

  -- Sales pipeline
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiating', 'won', 'lost')),
  assigned_to UUID,  -- Sales rep user ID (future)
  notes TEXT,

  -- Conversion (if won)
  converted_organization_id UUID REFERENCES organizations(id),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PART 2: INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_partners_territory ON partners USING GIN (territory_codes);
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);

CREATE INDEX IF NOT EXISTS idx_organizations_partner ON organizations(partner_id);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);

CREATE INDEX IF NOT EXISTS idx_brands_organization ON brands(organization_id);
CREATE INDEX IF NOT EXISTS idx_brands_business_type ON brands(business_type);

CREATE INDEX IF NOT EXISTS idx_locations_brand ON locations(brand_id);
CREATE INDEX IF NOT EXISTS idx_locations_country ON locations(country_code);
CREATE INDEX IF NOT EXISTS idx_locations_active ON locations(is_active);

CREATE INDEX IF NOT EXISTS idx_enterprise_leads_status ON enterprise_leads(status);
CREATE INDEX IF NOT EXISTS idx_enterprise_leads_email ON enterprise_leads(contact_email);

-- =====================================================
-- PART 3: TRIGGERS FOR updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER enterprise_leads_updated_at
  BEFORE UPDATE ON enterprise_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- PART 4: ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_leads ENABLE ROW LEVEL SECURITY;

-- Partners: Read by all authenticated, write by admins
CREATE POLICY "Partners are viewable by authenticated users"
  ON partners FOR SELECT
  TO authenticated
  USING (true);

-- Organizations: Users see their own org
CREATE POLICY "Organizations are viewable by members"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);  -- Will refine with auth

-- Brands: Users see brands in their org
CREATE POLICY "Brands are viewable by org members"
  ON brands FOR SELECT
  TO authenticated
  USING (true);  -- Will refine with auth

-- Locations: Users see locations in their org
CREATE POLICY "Locations are viewable by org members"
  ON locations FOR SELECT
  TO authenticated
  USING (true);  -- Will refine with auth

-- Enterprise leads: Only admins/sales
CREATE POLICY "Enterprise leads viewable by admins"
  ON enterprise_leads FOR SELECT
  TO authenticated
  USING (true);  -- Will refine with auth

-- Public read for locations (needed for PWA)
CREATE POLICY "Locations readable by anon for PWA"
  ON locations FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Brands readable by anon for PWA"
  ON brands FOR SELECT
  TO anon
  USING (is_active = true);

-- =====================================================
-- PART 5: HELPER FUNCTION - Find Partner by Country
-- =====================================================

CREATE OR REPLACE FUNCTION find_partner_for_country(p_country_code VARCHAR(2))
RETURNS UUID AS $$
DECLARE
  v_partner_id UUID;
BEGIN
  -- Find active partner with this country in their territory
  SELECT id INTO v_partner_id
  FROM partners
  WHERE status = 'active'
    AND p_country_code = ANY(territory_codes)
  ORDER BY
    CASE territory_type
      WHEN 'city' THEN 1
      WHEN 'region' THEN 2
      WHEN 'country' THEN 3
    END
  LIMIT 1;

  RETURN v_partner_id;
END;
$$ LANGUAGE plpgsql STABLE;

-- =====================================================
-- PART 6: COMMENTS
-- =====================================================

COMMENT ON TABLE partners IS 'National/regional licensees who manage clients in their territory';
COMMENT ON TABLE organizations IS 'Paying customers - either standard (via partner) or enterprise (direct)';
COMMENT ON TABLE brands IS 'Business identities within an organization';
COMMENT ON TABLE locations IS 'Physical points of sale with locale-specific settings';
COMMENT ON TABLE enterprise_leads IS 'Pre-sales leads for enterprise clients';

COMMENT ON COLUMN partners.royalty_pct IS 'Percentage GUDBRO charges partner on their collected revenue';
COMMENT ON COLUMN organizations.partner_id IS 'NULL for enterprise clients (direct with GUDBRO)';
COMMENT ON COLUMN locations.enabled_languages IS 'Languages available in customer-facing PWA';

-- =====================================================
-- Migration complete
-- Next: Run 012a-migrate-merchants-to-locations.sql
-- =====================================================
