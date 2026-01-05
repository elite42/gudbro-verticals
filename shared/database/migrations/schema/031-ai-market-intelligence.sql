-- =============================================
-- Migration 031: AI Market Intelligence (Phase 7)
-- =============================================
-- Price comparison, partnership finder, market trends
-- Part of GB-AI-COMANAGER feature - Phase 7
-- =============================================

-- =============================================
-- TABLE: ai_price_comparisons
-- Price analysis for menu items vs market
-- =============================================
CREATE TABLE ai_price_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Item info
  item_name TEXT NOT NULL,
  item_category TEXT,
  merchant_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',

  -- Market data
  market_average DECIMAL(10,2),
  market_low DECIMAL(10,2),
  market_high DECIMAL(10,2),
  price_position TEXT CHECK (price_position IN ('below_market', 'at_market', 'above_market')),
  percentage_diff DECIMAL(5,2),

  -- Recommendation
  recommendation TEXT CHECK (recommendation IN ('keep', 'increase', 'decrease', 'review')),
  reasoning TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_price_merchant ON ai_price_comparisons(merchant_id);
CREATE INDEX idx_ai_price_recommendation ON ai_price_comparisons(merchant_id, recommendation);
CREATE INDEX idx_ai_price_created ON ai_price_comparisons(created_at DESC);

-- =============================================
-- TABLE: ai_partnership_opportunities
-- AI-discovered partnership opportunities
-- =============================================
CREATE TABLE ai_partnership_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Partner info
  partner_type TEXT NOT NULL CHECK (partner_type IN (
    'supplier',       -- Food/beverage suppliers
    'delivery',       -- Delivery services
    'event',          -- Event organizers
    'cross_promo',    -- Cross-promotion partners
    'influencer',     -- Local influencers
    'local_business'  -- Nearby businesses
  )),
  partner_name TEXT NOT NULL,
  partner_description TEXT,

  -- Opportunity
  opportunity_type TEXT,
  potential_benefit TEXT,
  estimated_value TEXT,
  effort TEXT DEFAULT 'medium' CHECK (effort IN ('low', 'medium', 'high')),

  -- Contact
  contact_info TEXT,

  -- Status
  status TEXT DEFAULT 'suggested' CHECK (status IN (
    'suggested',    -- AI suggested
    'interested',   -- Merchant interested
    'contacted',    -- Initial contact made
    'in_progress',  -- Negotiating
    'completed',    -- Partnership established
    'declined'      -- Not pursuing
  )),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_partner_merchant ON ai_partnership_opportunities(merchant_id);
CREATE INDEX idx_ai_partner_status ON ai_partnership_opportunities(merchant_id, status);
CREATE INDEX idx_ai_partner_type ON ai_partnership_opportunities(merchant_id, partner_type);

-- =============================================
-- TABLE: ai_market_trends
-- Market trends relevant to the merchant
-- =============================================
CREATE TABLE ai_market_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Trend info
  category TEXT NOT NULL CHECK (category IN (
    'food',         -- Food trends
    'beverage',     -- Drink trends
    'service',      -- Service/hospitality trends
    'marketing',    -- Marketing trends
    'technology'    -- Tech trends
  )),
  trend_name TEXT NOT NULL,
  description TEXT,
  relevance TEXT DEFAULT 'medium' CHECK (relevance IN ('high', 'medium', 'low')),

  -- Actionable insight
  how_to_apply TEXT,
  estimated_impact TEXT,

  -- Source
  source TEXT DEFAULT 'ai_analysis' CHECK (source IN (
    'ai_analysis',
    'industry_report',
    'social_trends'
  )),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ             -- Trends become stale
);

-- Indexes
CREATE INDEX idx_ai_trends_merchant ON ai_market_trends(merchant_id);
CREATE INDEX idx_ai_trends_expires ON ai_market_trends(merchant_id, expires_at);
CREATE INDEX idx_ai_trends_relevance ON ai_market_trends(merchant_id, relevance);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_price_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_partnership_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_market_trends ENABLE ROW LEVEL SECURITY;

-- Price comparisons: Merchant staff can view their own
CREATE POLICY "Merchant staff can view price comparisons"
  ON ai_price_comparisons FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert price comparisons"
  ON ai_price_comparisons FOR INSERT
  WITH CHECK (true);

-- Partnership opportunities: Merchant staff can view/update their own
CREATE POLICY "Merchant staff can view partnerships"
  ON ai_partnership_opportunities FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert partnerships"
  ON ai_partnership_opportunities FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update partnerships"
  ON ai_partnership_opportunities FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- Market trends: Merchant staff can view their own
CREATE POLICY "Merchant staff can view trends"
  ON ai_market_trends FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert trends"
  ON ai_market_trends FOR INSERT
  WITH CHECK (true);

-- =============================================
-- TRIGGERS
-- =============================================

CREATE TRIGGER update_partnership_timestamp
  BEFORE UPDATE ON ai_partnership_opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_price_comparisons IS 'AI-generated price comparisons for menu items vs market';
COMMENT ON TABLE ai_partnership_opportunities IS 'AI-discovered partnership opportunities';
COMMENT ON TABLE ai_market_trends IS 'Market trends relevant to the merchant';
