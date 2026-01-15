-- Migration: 052-custom-domains
-- Description: Custom domain support for white-label (brands and locations)
-- Created: 2026-01-15
-- Feature: WHITE-LABEL-FULL

-- ============================================================================
-- BRANDS: Add custom domain fields
-- ============================================================================

ALTER TABLE brands ADD COLUMN IF NOT EXISTS custom_domain TEXT UNIQUE;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS domain_verified BOOLEAN DEFAULT false;
ALTER TABLE brands ADD COLUMN IF NOT EXISTS domain_verified_at TIMESTAMPTZ;

COMMENT ON COLUMN brands.custom_domain IS 'Custom domain for brand (e.g., menu.mybrand.com)';
COMMENT ON COLUMN brands.domain_verified IS 'Whether DNS verification passed';
COMMENT ON COLUMN brands.domain_verified_at IS 'When domain was verified';

-- ============================================================================
-- LOCATIONS: Add custom domain fields
-- ============================================================================

ALTER TABLE locations ADD COLUMN IF NOT EXISTS custom_domain TEXT UNIQUE;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS domain_verified BOOLEAN DEFAULT false;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS domain_verified_at TIMESTAMPTZ;

COMMENT ON COLUMN locations.custom_domain IS 'Custom domain for single location (e.g., menu.myrestaurant.com)';
COMMENT ON COLUMN locations.domain_verified IS 'Whether DNS verification passed';
COMMENT ON COLUMN locations.domain_verified_at IS 'When domain was verified';

-- ============================================================================
-- PARTNERS: Add branding fields for white-label backoffice
-- ============================================================================

ALTER TABLE partners ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS primary_color VARCHAR(7) DEFAULT '#000000';
ALTER TABLE partners ADD COLUMN IF NOT EXISTS backoffice_domain TEXT UNIQUE;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS hide_gudbro_branding BOOLEAN DEFAULT false;

COMMENT ON COLUMN partners.logo_url IS 'Partner logo for white-label backoffice';
COMMENT ON COLUMN partners.primary_color IS 'Partner primary brand color';
COMMENT ON COLUMN partners.backoffice_domain IS 'Custom domain for partner backoffice';
COMMENT ON COLUMN partners.hide_gudbro_branding IS 'Hide GUDBRO branding completely';

-- ============================================================================
-- DOMAIN VERIFICATIONS TABLE
-- ============================================================================
-- Tracks domain verification status and Vercel integration

CREATE TABLE IF NOT EXISTS domain_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Domain info
  domain TEXT NOT NULL UNIQUE,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('brand', 'location', 'partner')),
  entity_id UUID NOT NULL,

  -- Verification
  verification_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  verification_method TEXT NOT NULL DEFAULT 'cname' CHECK (verification_method IN ('cname', 'dns_txt', 'file')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verifying', 'verified', 'failed', 'expired')),
  failure_reason TEXT,

  -- SSL/Vercel
  ssl_status TEXT DEFAULT 'pending' CHECK (ssl_status IN ('pending', 'provisioning', 'active', 'failed')),
  vercel_domain_id TEXT,
  vercel_project_id TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  verified_at TIMESTAMPTZ,
  last_check_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT valid_entity_reference CHECK (
    (entity_type = 'brand' AND entity_id IS NOT NULL) OR
    (entity_type = 'location' AND entity_id IS NOT NULL) OR
    (entity_type = 'partner' AND entity_id IS NOT NULL)
  )
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Domain lookups (critical for middleware resolution)
CREATE INDEX IF NOT EXISTS idx_domain_verifications_domain
  ON domain_verifications(domain);

CREATE INDEX IF NOT EXISTS idx_domain_verifications_status
  ON domain_verifications(status)
  WHERE status = 'verified';

CREATE INDEX IF NOT EXISTS idx_domain_verifications_entity
  ON domain_verifications(entity_type, entity_id);

-- Brand/Location domain lookups
CREATE INDEX IF NOT EXISTS idx_brands_custom_domain
  ON brands(custom_domain)
  WHERE custom_domain IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_locations_custom_domain
  ON locations(custom_domain)
  WHERE custom_domain IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_partners_backoffice_domain
  ON partners(backoffice_domain)
  WHERE backoffice_domain IS NOT NULL;

-- ============================================================================
-- TRIGGER: Updated at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_domain_verifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

DROP TRIGGER IF EXISTS trigger_domain_verifications_updated_at ON domain_verifications;
CREATE TRIGGER trigger_domain_verifications_updated_at
  BEFORE UPDATE ON domain_verifications
  FOR EACH ROW
  EXECUTE FUNCTION update_domain_verifications_updated_at();

-- ============================================================================
-- HELPER FUNCTION: Resolve domain to entity
-- ============================================================================

CREATE OR REPLACE FUNCTION resolve_custom_domain(p_domain TEXT)
RETURNS TABLE (
  entity_type TEXT,
  entity_id UUID,
  brand_id UUID,
  location_id UUID,
  organization_id UUID,
  partner_id UUID
) AS $$
BEGIN
  -- First check locations (most specific)
  RETURN QUERY
  SELECT
    'location'::TEXT as entity_type,
    l.id as entity_id,
    l.brand_id as brand_id,
    l.id as location_id,
    b.organization_id as organization_id,
    o.partner_id as partner_id
  FROM locations l
  JOIN brands b ON l.brand_id = b.id
  JOIN organizations o ON b.organization_id = o.id
  WHERE l.custom_domain = p_domain
    AND l.domain_verified = true
    AND l.is_active = true
  LIMIT 1;

  IF FOUND THEN RETURN; END IF;

  -- Then check brands
  RETURN QUERY
  SELECT
    'brand'::TEXT as entity_type,
    b.id as entity_id,
    b.id as brand_id,
    NULL::UUID as location_id,
    b.organization_id as organization_id,
    o.partner_id as partner_id
  FROM brands b
  JOIN organizations o ON b.organization_id = o.id
  WHERE b.custom_domain = p_domain
    AND b.domain_verified = true
    AND b.is_active = true
  LIMIT 1;

  IF FOUND THEN RETURN; END IF;

  -- Finally check partners (for backoffice white-label)
  RETURN QUERY
  SELECT
    'partner'::TEXT as entity_type,
    p.id as entity_id,
    NULL::UUID as brand_id,
    NULL::UUID as location_id,
    NULL::UUID as organization_id,
    p.id as partner_id
  FROM partners p
  WHERE p.backoffice_domain = p_domain
    AND p.status = 'active'
  LIMIT 1;

END;
$$ LANGUAGE plpgsql
SET search_path = public;

COMMENT ON FUNCTION resolve_custom_domain IS 'Resolves a custom domain to its entity (location, brand, or partner)';

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE domain_verifications ENABLE ROW LEVEL SECURITY;

-- Public can read verified domains (for middleware resolution)
CREATE POLICY domain_verifications_public_read ON domain_verifications
  FOR SELECT
  USING (status = 'verified');

-- Service role full access
CREATE POLICY domain_verifications_service_role ON domain_verifications
  FOR ALL
  USING (auth.role() = 'service_role');

-- Authenticated users can manage their own domains
CREATE POLICY domain_verifications_owner ON domain_verifications
  FOR ALL TO authenticated
  USING (
    -- Check if user has access to the entity
    CASE entity_type
      WHEN 'brand' THEN entity_id IN (
        SELECT b.id FROM brands b
        JOIN organizations o ON b.organization_id = o.id
        WHERE o.id IN (
          SELECT ar.tenant_id FROM account_roles ar
          WHERE ar.account_id = auth.uid()
            AND ar.tenant_type = 'organization'
            AND ar.is_active = true
        )
      )
      WHEN 'location' THEN entity_id IN (
        SELECT l.id FROM locations l
        WHERE l.brand_id IN (
          SELECT b.id FROM brands b
          JOIN organizations o ON b.organization_id = o.id
          WHERE o.id IN (
            SELECT ar.tenant_id FROM account_roles ar
            WHERE ar.account_id = auth.uid()
              AND ar.tenant_type = 'organization'
              AND ar.is_active = true
          )
        )
      )
      WHEN 'partner' THEN entity_id IN (
        SELECT ar.tenant_id FROM account_roles ar
        WHERE ar.account_id = auth.uid()
          AND ar.role_type = 'partner'
          AND ar.is_active = true
      )
      ELSE false
    END
  );

-- ============================================================================
-- DOMAIN BLACKLIST (prevent abuse)
-- ============================================================================

CREATE TABLE IF NOT EXISTS domain_blacklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern TEXT NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed blacklist
INSERT INTO domain_blacklist (pattern, reason) VALUES
  ('gudbro.%', 'Reserved platform domain'),
  ('%.gudbro.%', 'Reserved platform subdomain'),
  ('vercel.%', 'Reserved Vercel domain'),
  ('%.vercel.app', 'Reserved Vercel subdomain'),
  ('localhost%', 'Reserved localhost'),
  ('%.local', 'Reserved local domain'),
  ('%.test', 'Reserved test domain'),
  ('%.example.%', 'Reserved example domain')
ON CONFLICT (pattern) DO NOTHING;

ALTER TABLE domain_blacklist ENABLE ROW LEVEL SECURITY;

CREATE POLICY domain_blacklist_public_read ON domain_blacklist
  FOR SELECT USING (true);

CREATE POLICY domain_blacklist_service_role ON domain_blacklist
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- HELPER FUNCTION: Check if domain is blacklisted
-- ============================================================================

CREATE OR REPLACE FUNCTION is_domain_blacklisted(p_domain TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM domain_blacklist
    WHERE p_domain LIKE pattern
  );
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE domain_verifications IS 'Tracks custom domain verification and Vercel integration status';
COMMENT ON TABLE domain_blacklist IS 'Patterns for domains that cannot be registered';

COMMENT ON COLUMN domain_verifications.verification_token IS 'Token for DNS TXT record verification';
COMMENT ON COLUMN domain_verifications.vercel_domain_id IS 'Domain ID returned by Vercel API';
COMMENT ON COLUMN domain_verifications.vercel_project_id IS 'Vercel project ID for this domain';

-- ============================================================================
-- SUBSCRIPTION PLAN LIMITS
-- ============================================================================
-- Defines what each subscription tier allows

CREATE TABLE IF NOT EXISTS subscription_plan_limits (
  plan TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  max_locations INTEGER DEFAULT 1,
  max_brands INTEGER DEFAULT 1,
  max_custom_domains INTEGER DEFAULT 0,
  max_team_members INTEGER DEFAULT 2,
  ai_features BOOLEAN DEFAULT false,
  analytics_retention_days INTEGER DEFAULT 30,
  priority_support BOOLEAN DEFAULT false,
  white_label_menu BOOLEAN DEFAULT false,
  white_label_backoffice BOOLEAN DEFAULT false,
  monthly_price_usd DECIMAL(10,2),
  annual_price_usd DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed plan limits (-1 means unlimited)
INSERT INTO subscription_plan_limits (
  plan, display_name, max_locations, max_brands, max_custom_domains,
  max_team_members, ai_features, analytics_retention_days, priority_support,
  white_label_menu, white_label_backoffice, monthly_price_usd, annual_price_usd
) VALUES
  ('free', 'Free', 1, 1, 0, 1, false, 7, false, false, false, 0, 0),
  ('starter', 'Starter', 1, 1, 0, 3, false, 30, false, false, false, 29, 290),
  ('pro', 'Pro', 3, 1, 1, 5, true, 90, false, true, false, 79, 790),
  ('business', 'Business', 10, 3, 3, 15, true, 365, true, true, false, 149, 1490),
  ('enterprise', 'Enterprise', -1, -1, -1, -1, true, -1, true, true, true, NULL, NULL)
ON CONFLICT (plan) DO NOTHING;

COMMENT ON TABLE subscription_plan_limits IS 'Defines limits and features for each subscription tier';
COMMENT ON COLUMN subscription_plan_limits.max_custom_domains IS 'Number of custom domains allowed (-1 = unlimited)';
COMMENT ON COLUMN subscription_plan_limits.white_label_menu IS 'Can use custom domain for menu';
COMMENT ON COLUMN subscription_plan_limits.white_label_backoffice IS 'Can use custom domain for backoffice (partners only)';

-- ============================================================================
-- HELPER: Check if organization can add more domains
-- ============================================================================

CREATE OR REPLACE FUNCTION can_add_custom_domain(p_organization_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_plan TEXT;
  v_max_domains INTEGER;
  v_current_domains INTEGER;
BEGIN
  -- Get organization's plan
  SELECT subscription_plan INTO v_plan
  FROM organizations
  WHERE id = p_organization_id;

  -- Get plan limit
  SELECT max_custom_domains INTO v_max_domains
  FROM subscription_plan_limits
  WHERE plan = COALESCE(v_plan, 'free');

  -- -1 means unlimited
  IF v_max_domains = -1 THEN
    RETURN true;
  END IF;

  -- Count current domains for this organization
  SELECT COUNT(*) INTO v_current_domains
  FROM (
    SELECT b.custom_domain
    FROM brands b
    WHERE b.organization_id = p_organization_id
      AND b.custom_domain IS NOT NULL
    UNION ALL
    SELECT l.custom_domain
    FROM locations l
    JOIN brands b ON l.brand_id = b.id
    WHERE b.organization_id = p_organization_id
      AND l.custom_domain IS NOT NULL
  ) domains;

  RETURN v_current_domains < v_max_domains;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

COMMENT ON FUNCTION can_add_custom_domain IS 'Checks if organization can add more custom domains based on subscription plan';
