-- =============================================
-- Migration 030: AI Bootstrap System (Phase 6)
-- =============================================
-- Automatic setup for new merchants: zone analysis, competitor discovery
-- Part of GB-AI-COMANAGER feature - Phase 6
-- =============================================

-- =============================================
-- TABLE: ai_zone_analysis
-- AI-generated zone/location analysis
-- =============================================
CREATE TABLE ai_zone_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Location
  address TEXT,
  city TEXT,
  country TEXT,
  coordinates JSONB,            -- {lat, lng}

  -- Zone characteristics
  zone_type TEXT CHECK (zone_type IN (
    'downtown', 'residential', 'tourist', 'business', 'mixed', 'industrial'
  )),
  foot_traffic TEXT CHECK (foot_traffic IN ('low', 'medium', 'high', 'very_high')),

  -- Demographics
  demographics JSONB DEFAULT '{}',  -- {primaryAge, incomeLevel, lifestyle[]}

  -- Business environment
  nearby_pois TEXT[] DEFAULT '{}',   -- Points of interest
  peak_hours TEXT[] DEFAULT '{}',
  busy_days TEXT[] DEFAULT '{}',

  -- AI recommendations
  recommendations TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- One analysis per location (can be refreshed)
  CONSTRAINT unique_zone_analysis UNIQUE (location_id)
);

-- Indexes
CREATE INDEX idx_ai_zone_merchant ON ai_zone_analysis(merchant_id);
CREATE INDEX idx_ai_zone_location ON ai_zone_analysis(location_id);

-- =============================================
-- TABLE: ai_competitor_profiles
-- AI-discovered competitor profiles
-- =============================================
CREATE TABLE ai_competitor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Competitor info
  name TEXT NOT NULL,
  business_type TEXT,
  address TEXT,
  distance INTEGER,              -- meters from merchant

  -- Analysis
  price_range TEXT CHECK (price_range IN ('budget', 'mid-range', 'premium', 'luxury')),
  strengths TEXT[] DEFAULT '{}',
  weaknesses TEXT[] DEFAULT '{}',
  popular_items TEXT[] DEFAULT '{}',

  -- Differentiation opportunities
  differentiators TEXT[] DEFAULT '{}',

  -- Source
  source TEXT DEFAULT 'ai_discovery' CHECK (source IN (
    'google_places', 'manual', 'ai_discovery'
  )),

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_competitor_merchant ON ai_competitor_profiles(merchant_id);
CREATE INDEX idx_ai_competitor_location ON ai_competitor_profiles(location_id);
CREATE INDEX idx_ai_competitor_active ON ai_competitor_profiles(merchant_id, is_active) WHERE is_active = true;

-- =============================================
-- TABLE: ai_bootstrap_results
-- Complete bootstrap results for new merchants
-- =============================================
CREATE TABLE ai_bootstrap_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- References
  zone_analysis_id UUID REFERENCES ai_zone_analysis(id),
  competitor_count INTEGER DEFAULT 0,

  -- Recommendations
  suggested_menu JSONB DEFAULT '{}',    -- {categories[], priceRange, mustHaveItems[]}
  marketing_tips TEXT[] DEFAULT '{}',
  operational_tips TEXT[] DEFAULT '{}',

  -- Status
  completed_at TIMESTAMPTZ DEFAULT NOW(),

  -- One bootstrap per location
  CONSTRAINT unique_bootstrap UNIQUE (location_id)
);

-- Indexes
CREATE INDEX idx_ai_bootstrap_merchant ON ai_bootstrap_results(merchant_id);
CREATE INDEX idx_ai_bootstrap_location ON ai_bootstrap_results(location_id);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_zone_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_competitor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_bootstrap_results ENABLE ROW LEVEL SECURITY;

-- Zone analysis: Merchant staff can view their own
CREATE POLICY "Merchant staff can view zone analysis"
  ON ai_zone_analysis FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert zone analysis"
  ON ai_zone_analysis FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update zone analysis"
  ON ai_zone_analysis FOR UPDATE
  USING (true);

-- Competitor profiles: Merchant staff can view/manage their own
CREATE POLICY "Merchant staff can view competitors"
  ON ai_competitor_profiles FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert competitors"
  ON ai_competitor_profiles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update competitors"
  ON ai_competitor_profiles FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- Bootstrap results: Merchant staff can view their own
CREATE POLICY "Merchant staff can view bootstrap"
  ON ai_bootstrap_results FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert bootstrap"
  ON ai_bootstrap_results FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update bootstrap"
  ON ai_bootstrap_results FOR UPDATE
  USING (true);

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update timestamp for competitors
CREATE TRIGGER update_competitor_timestamp
  BEFORE UPDATE ON ai_competitor_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_zone_analysis IS 'AI-generated zone/location analysis for merchants';
COMMENT ON TABLE ai_competitor_profiles IS 'AI-discovered competitor profiles';
COMMENT ON TABLE ai_bootstrap_results IS 'Complete AI bootstrap results for new merchants';
