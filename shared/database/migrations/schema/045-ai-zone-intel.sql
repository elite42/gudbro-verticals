-- =============================================
-- Migration 045: AI Zone Intelligence System (Phase 1)
-- =============================================
-- Customer intelligence, enhanced zone profiles, merchant knowledge,
-- and automated customer trigger system
-- Part of GB-AI-ZONE-INTEL feature
-- =============================================

-- =============================================
-- TABLE 1: ai_customer_intelligence
-- AI-computed customer insights per merchant
-- =============================================
-- NOTE: This is per merchant-customer pair (like follower_analytics)
-- because CLV and churn risk are merchant-specific

CREATE TABLE ai_customer_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Customer Lifetime Value
  clv_estimated DECIMAL(12,2),
  clv_confidence DECIMAL(3,2) CHECK (clv_confidence >= 0 AND clv_confidence <= 1),
  clv_calculated_at TIMESTAMPTZ,

  -- Churn Risk Assessment
  churn_risk_score DECIMAL(3,2) CHECK (churn_risk_score >= 0 AND churn_risk_score <= 1),
  churn_risk_level TEXT CHECK (churn_risk_level IN ('low', 'medium', 'high', 'critical')),
  churn_factors JSONB DEFAULT '[]',
  days_since_last_visit INTEGER,
  predicted_days_to_churn INTEGER,

  -- Segmentation
  segment TEXT CHECK (segment IN (
    'champion',
    'loyal',
    'potential',
    'new',
    'at_risk',
    'dormant',
    'lost'
  )),
  segment_confidence DECIMAL(3,2),

  -- Predicted Values
  predicted_next_visit_at TIMESTAMPTZ,
  predicted_next_order_value DECIMAL(10,2),
  predicted_monthly_spend DECIMAL(10,2),

  -- Pattern Analysis (JSONB for flexibility)
  visit_pattern JSONB DEFAULT '{}',
  order_pattern JSONB DEFAULT '{}',

  -- AI Recommendations
  recommended_actions JSONB DEFAULT '[]',

  -- Sync with follower_analytics
  last_synced_from_analytics_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One intelligence record per customer-merchant pair
  CONSTRAINT unique_customer_intelligence UNIQUE (account_id, merchant_id)
);

-- Indexes
CREATE INDEX idx_ai_cust_intel_merchant ON ai_customer_intelligence(merchant_id);
CREATE INDEX idx_ai_cust_intel_account ON ai_customer_intelligence(account_id);
CREATE INDEX idx_ai_cust_intel_segment ON ai_customer_intelligence(merchant_id, segment);
CREATE INDEX idx_ai_cust_intel_churn ON ai_customer_intelligence(merchant_id, churn_risk_level)
  WHERE churn_risk_level IN ('high', 'critical');
CREATE INDEX idx_ai_cust_intel_clv ON ai_customer_intelligence(merchant_id, clv_estimated DESC);

-- =============================================
-- TABLE 2: ai_zone_profiles
-- Enhanced zone analysis with structured POIs and flows
-- =============================================

CREATE TABLE ai_zone_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Basic Location Info
  address TEXT,
  city TEXT,
  country TEXT,
  coordinates JSONB,

  -- Zone Classification
  zone_type TEXT CHECK (zone_type IN (
    'downtown_core',
    'commercial_strip',
    'tourist_zone',
    'business_district',
    'residential',
    'university',
    'entertainment',
    'transit_hub',
    'mixed_use'
  )),

  -- Population & Demographics
  population_density TEXT CHECK (population_density IN ('low', 'medium', 'high', 'very_high')),
  estimated_daily_footfall INTEGER,
  demographics JSONB DEFAULT '{}',

  -- Points of Interest (structured array)
  pois JSONB DEFAULT '[]',

  -- Pedestrian Flows by Time Slot
  pedestrian_flows JSONB DEFAULT '{}',

  -- Recurring Events
  recurring_events JSONB DEFAULT '[]',

  -- Seasonal Patterns
  seasonal_patterns JSONB DEFAULT '{}',

  -- Competition Density
  competitor_density TEXT CHECK (competitor_density IN ('sparse', 'moderate', 'dense', 'saturated')),
  nearby_competitors_count INTEGER DEFAULT 0,

  -- AI Recommendations
  recommendations JSONB DEFAULT '[]',

  -- Data Quality
  data_source TEXT DEFAULT 'ai_analysis' CHECK (data_source IN (
    'ai_analysis', 'manual_input', 'google_places', 'combined'
  )),
  last_analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  analysis_confidence DECIMAL(3,2),

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One profile per location
  CONSTRAINT unique_zone_profile UNIQUE (location_id)
);

-- Indexes
CREATE INDEX idx_ai_zone_profiles_merchant ON ai_zone_profiles(merchant_id);
CREATE INDEX idx_ai_zone_profiles_location ON ai_zone_profiles(location_id);
CREATE INDEX idx_ai_zone_profiles_type ON ai_zone_profiles(zone_type);
CREATE INDEX idx_ai_zone_profiles_pois ON ai_zone_profiles USING GIN(pois);

-- =============================================
-- TABLE 3: ai_merchant_knowledge
-- Persistent memory/knowledge base for Co-Manager per merchant
-- =============================================

CREATE TABLE ai_merchant_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Document Classification
  document_type TEXT NOT NULL CHECK (document_type IN (
    'zone',
    'customers',
    'manager',
    'history',
    'menu',
    'operations',
    'strategies',
    'competitors',
    'events',
    'marketing',
    'financial',
    'staff',
    'custom'
  )),

  -- Document Content
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  summary TEXT,

  -- Categorization
  tags TEXT[] DEFAULT '{}',
  importance TEXT DEFAULT 'normal' CHECK (importance IN ('low', 'normal', 'high', 'critical')),

  -- Versioning
  version INTEGER DEFAULT 1,
  previous_version_id UUID REFERENCES ai_merchant_knowledge(id),

  -- Authorship
  last_updated_by TEXT NOT NULL CHECK (last_updated_by IN ('ai', 'manager', 'system')),
  last_updated_by_account_id UUID REFERENCES accounts(id),

  -- Usage Tracking
  times_referenced INTEGER DEFAULT 0,
  last_referenced_at TIMESTAMPTZ,

  -- Validity
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_knowledge_merchant ON ai_merchant_knowledge(merchant_id);
CREATE INDEX idx_ai_knowledge_type ON ai_merchant_knowledge(merchant_id, document_type);
CREATE INDEX idx_ai_knowledge_active ON ai_merchant_knowledge(merchant_id, is_active)
  WHERE is_active = TRUE;
CREATE INDEX idx_ai_knowledge_tags ON ai_merchant_knowledge USING GIN(tags);
CREATE INDEX idx_ai_knowledge_importance ON ai_merchant_knowledge(merchant_id, importance)
  WHERE importance IN ('high', 'critical');
CREATE INDEX idx_ai_knowledge_search ON ai_merchant_knowledge
  USING GIN(to_tsvector('english', title || ' ' || content));

-- =============================================
-- TABLE 4: ai_customer_triggers
-- Automated CRM trigger definitions
-- =============================================

CREATE TABLE ai_customer_triggers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Trigger Identity
  name TEXT NOT NULL,
  description TEXT,

  -- Trigger Type
  trigger_type TEXT NOT NULL CHECK (trigger_type IN (
    'churn_risk',
    'inactivity',
    'milestone',
    'birthday',
    'anniversary',
    'location',
    'segment_change',
    'feedback',
    'loyalty_tier',
    'custom'
  )),

  -- Trigger Conditions (JSONB for flexibility)
  conditions JSONB NOT NULL DEFAULT '{}',

  -- Action Configuration
  action_type TEXT NOT NULL CHECK (action_type IN (
    'notification',
    'promo',
    'loyalty_reward',
    'alert_manager',
    'workflow',
    'tag',
    'custom'
  )),

  action_config JSONB NOT NULL DEFAULT '{}',

  -- Cooldown (prevent spam)
  cooldown_days INTEGER DEFAULT 30,
  max_triggers_per_customer INTEGER,

  -- Targeting
  target_segments TEXT[] DEFAULT '{}',
  exclude_segments TEXT[] DEFAULT '{}',
  min_clv DECIMAL(10,2),
  max_clv DECIMAL(10,2),

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 50,

  -- Statistics
  total_triggered INTEGER DEFAULT 0,
  total_converted INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMPTZ,

  -- Metadata
  created_by_account_id UUID REFERENCES accounts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_triggers_merchant ON ai_customer_triggers(merchant_id);
CREATE INDEX idx_ai_triggers_type ON ai_customer_triggers(merchant_id, trigger_type);
CREATE INDEX idx_ai_triggers_active ON ai_customer_triggers(merchant_id, is_active, priority DESC)
  WHERE is_active = TRUE;

-- =============================================
-- TABLE 5: ai_customer_trigger_executions
-- Log of trigger executions per customer
-- =============================================

CREATE TABLE ai_customer_trigger_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References
  trigger_id UUID NOT NULL REFERENCES ai_customer_triggers(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Execution Details
  triggered_at TIMESTAMPTZ DEFAULT NOW(),
  triggered_reason TEXT,

  -- Action Taken
  action_type TEXT NOT NULL,
  action_details JSONB DEFAULT '{}',

  -- Result Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'sent',
    'delivered',
    'opened',
    'converted',
    'expired',
    'failed',
    'cancelled'
  )),

  -- Outcome
  converted_at TIMESTAMPTZ,
  conversion_value DECIMAL(10,2),
  conversion_order_id UUID,

  -- Cooldown
  next_eligible_at TIMESTAMPTZ,

  -- Error handling
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_trigger_execs_trigger ON ai_customer_trigger_executions(trigger_id);
CREATE INDEX idx_ai_trigger_execs_account ON ai_customer_trigger_executions(account_id);
CREATE INDEX idx_ai_trigger_execs_merchant ON ai_customer_trigger_executions(merchant_id);
CREATE INDEX idx_ai_trigger_execs_status ON ai_customer_trigger_executions(merchant_id, status)
  WHERE status IN ('pending', 'sent');
CREATE INDEX idx_ai_trigger_execs_eligible ON ai_customer_trigger_executions(account_id, next_eligible_at);
CREATE INDEX idx_ai_trigger_execs_recent ON ai_customer_trigger_executions(merchant_id, triggered_at DESC);
CREATE INDEX idx_ai_trigger_execs_cooldown ON ai_customer_trigger_executions(
  trigger_id, account_id, triggered_at DESC
);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_customer_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_zone_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_merchant_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_customer_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_customer_trigger_executions ENABLE ROW LEVEL SECURITY;

-- Customer Intelligence
CREATE POLICY "Merchant staff can view customer intelligence"
  ON ai_customer_intelligence FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Service role full access customer intelligence"
  ON ai_customer_intelligence FOR ALL
  USING (auth.role() = 'service_role');

-- Zone Profiles
CREATE POLICY "Merchant staff can view zone profiles"
  ON ai_zone_profiles FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Service role full access zone profiles"
  ON ai_zone_profiles FOR ALL
  USING (auth.role() = 'service_role');

-- Merchant Knowledge
CREATE POLICY "Merchant staff can view knowledge"
  ON ai_merchant_knowledge FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Merchant staff can manage knowledge"
  ON ai_merchant_knowledge FOR ALL
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Service role full access knowledge"
  ON ai_merchant_knowledge FOR ALL
  USING (auth.role() = 'service_role');

-- Customer Triggers
CREATE POLICY "Merchant staff can view triggers"
  ON ai_customer_triggers FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Merchant staff can manage triggers"
  ON ai_customer_triggers FOR ALL
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Service role full access triggers"
  ON ai_customer_triggers FOR ALL
  USING (auth.role() = 'service_role');

-- Trigger Executions
CREATE POLICY "Merchant staff can view trigger executions"
  ON ai_customer_trigger_executions FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Service role full access trigger executions"
  ON ai_customer_trigger_executions FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================
-- TRIGGERS
-- =============================================

CREATE TRIGGER update_ai_customer_intelligence_timestamp
  BEFORE UPDATE ON ai_customer_intelligence
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_zone_profiles_timestamp
  BEFORE UPDATE ON ai_zone_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_merchant_knowledge_timestamp
  BEFORE UPDATE ON ai_merchant_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_customer_triggers_timestamp
  BEFORE UPDATE ON ai_customer_triggers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_trigger_executions_timestamp
  BEFORE UPDATE ON ai_customer_trigger_executions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-increment version on knowledge update
CREATE OR REPLACE FUNCTION increment_knowledge_version()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.content IS DISTINCT FROM NEW.content THEN
    NEW.version := OLD.version + 1;
    NEW.previous_version_id := OLD.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_knowledge_version
  BEFORE UPDATE ON ai_merchant_knowledge
  FOR EACH ROW
  EXECUTE FUNCTION increment_knowledge_version();

-- Update trigger stats on execution
CREATE OR REPLACE FUNCTION update_trigger_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE ai_customer_triggers
  SET
    total_triggered = total_triggered + 1,
    last_triggered_at = NEW.triggered_at
  WHERE id = NEW.trigger_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_update_stats
  AFTER INSERT ON ai_customer_trigger_executions
  FOR EACH ROW
  EXECUTE FUNCTION update_trigger_stats();

-- Update conversion stats
CREATE OR REPLACE FUNCTION update_trigger_conversion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'converted' AND OLD.status != 'converted' THEN
    UPDATE ai_customer_triggers
    SET total_converted = total_converted + 1
    WHERE id = NEW.trigger_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_update_conversion
  AFTER UPDATE ON ai_customer_trigger_executions
  FOR EACH ROW
  EXECUTE FUNCTION update_trigger_conversion();

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function: Get customers at risk of churning
CREATE OR REPLACE FUNCTION get_customers_at_risk(
  p_merchant_id UUID,
  p_risk_levels TEXT[] DEFAULT ARRAY['high', 'critical']
)
RETURNS TABLE (
  account_id UUID,
  account_email TEXT,
  account_name TEXT,
  churn_risk_score DECIMAL(3,2),
  churn_risk_level TEXT,
  days_since_last_visit INTEGER,
  clv_estimated DECIMAL(12,2),
  segment TEXT,
  recommended_actions JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ci.account_id,
    a.email,
    COALESCE(a.display_name, a.first_name || ' ' || a.last_name),
    ci.churn_risk_score,
    ci.churn_risk_level,
    ci.days_since_last_visit,
    ci.clv_estimated,
    ci.segment,
    ci.recommended_actions
  FROM ai_customer_intelligence ci
  JOIN accounts a ON a.id = ci.account_id
  WHERE ci.merchant_id = p_merchant_id
    AND ci.churn_risk_level = ANY(p_risk_levels)
  ORDER BY ci.clv_estimated DESC NULLS LAST, ci.churn_risk_score DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Check if customer is eligible for trigger
CREATE OR REPLACE FUNCTION is_customer_trigger_eligible(
  p_trigger_id UUID,
  p_account_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_cooldown_days INTEGER;
  v_max_triggers INTEGER;
  v_last_triggered TIMESTAMPTZ;
  v_trigger_count INTEGER;
BEGIN
  SELECT cooldown_days, max_triggers_per_customer
  INTO v_cooldown_days, v_max_triggers
  FROM ai_customer_triggers
  WHERE id = p_trigger_id AND is_active = TRUE;

  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  SELECT triggered_at INTO v_last_triggered
  FROM ai_customer_trigger_executions
  WHERE trigger_id = p_trigger_id AND account_id = p_account_id
  ORDER BY triggered_at DESC
  LIMIT 1;

  IF v_last_triggered IS NOT NULL AND
     v_last_triggered > NOW() - (v_cooldown_days || ' days')::INTERVAL THEN
    RETURN FALSE;
  END IF;

  IF v_max_triggers IS NOT NULL THEN
    SELECT COUNT(*) INTO v_trigger_count
    FROM ai_customer_trigger_executions
    WHERE trigger_id = p_trigger_id AND account_id = p_account_id;

    IF v_trigger_count >= v_max_triggers THEN
      RETURN FALSE;
    END IF;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Sync customer intelligence from follower_analytics
CREATE OR REPLACE FUNCTION sync_customer_intelligence_from_analytics(
  p_merchant_id UUID
)
RETURNS INTEGER AS $$
DECLARE
  v_synced INTEGER := 0;
BEGIN
  INSERT INTO ai_customer_intelligence (
    account_id,
    merchant_id,
    days_since_last_visit,
    last_synced_from_analytics_at
  )
  SELECT
    fa.account_id,
    fa.merchant_id,
    EXTRACT(DAY FROM NOW() - fa.last_visit_at)::INTEGER,
    NOW()
  FROM follower_analytics fa
  WHERE fa.merchant_id = p_merchant_id
  ON CONFLICT (account_id, merchant_id) DO UPDATE SET
    days_since_last_visit = EXCLUDED.days_since_last_visit,
    last_synced_from_analytics_at = NOW(),
    updated_at = NOW();

  GET DIAGNOSTICS v_synced = ROW_COUNT;
  RETURN v_synced;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Get relevant knowledge for context
CREATE OR REPLACE FUNCTION get_merchant_knowledge_context(
  p_merchant_id UUID,
  p_document_types TEXT[] DEFAULT NULL,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  document_type TEXT,
  title TEXT,
  content TEXT,
  importance TEXT,
  last_referenced_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    k.id,
    k.document_type,
    k.title,
    k.content,
    k.importance,
    k.last_referenced_at
  FROM ai_merchant_knowledge k
  WHERE k.merchant_id = p_merchant_id
    AND k.is_active = TRUE
    AND (k.expires_at IS NULL OR k.expires_at > NOW())
    AND (p_document_types IS NULL OR k.document_type = ANY(p_document_types))
  ORDER BY
    CASE k.importance
      WHEN 'critical' THEN 1
      WHEN 'high' THEN 2
      WHEN 'normal' THEN 3
      ELSE 4
    END,
    k.updated_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Update knowledge reference count
CREATE OR REPLACE FUNCTION mark_knowledge_referenced(p_knowledge_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE ai_merchant_knowledge
  SET
    times_referenced = times_referenced + 1,
    last_referenced_at = NOW()
  WHERE id = p_knowledge_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =============================================
-- VIEWS (with security_invoker = true)
-- =============================================

CREATE OR REPLACE VIEW v_customer_intelligence_summary
WITH (security_invoker = true) AS
SELECT
  ci.merchant_id,
  COUNT(*) AS total_customers,
  COUNT(*) FILTER (WHERE ci.segment = 'champion') AS champions,
  COUNT(*) FILTER (WHERE ci.segment = 'loyal') AS loyal,
  COUNT(*) FILTER (WHERE ci.segment = 'potential') AS potential,
  COUNT(*) FILTER (WHERE ci.segment = 'at_risk') AS at_risk,
  COUNT(*) FILTER (WHERE ci.segment = 'dormant') AS dormant,
  COUNT(*) FILTER (WHERE ci.segment = 'lost') AS lost,
  COUNT(*) FILTER (WHERE ci.churn_risk_level IN ('high', 'critical')) AS high_risk_count,
  AVG(ci.clv_estimated) AS avg_clv,
  SUM(ci.clv_estimated) AS total_clv
FROM ai_customer_intelligence ci
GROUP BY ci.merchant_id;

CREATE OR REPLACE VIEW v_trigger_performance
WITH (security_invoker = true) AS
SELECT
  t.id AS trigger_id,
  t.merchant_id,
  t.name,
  t.trigger_type,
  t.action_type,
  t.is_active,
  t.total_triggered,
  t.total_converted,
  CASE
    WHEN t.total_triggered > 0
    THEN ROUND((t.total_converted::DECIMAL / t.total_triggered) * 100, 2)
    ELSE 0
  END AS conversion_rate_pct,
  t.last_triggered_at,
  (SELECT SUM(conversion_value) FROM ai_customer_trigger_executions e
   WHERE e.trigger_id = t.id AND e.status = 'converted') AS total_revenue
FROM ai_customer_triggers t;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_customer_intelligence IS 'AI-computed customer insights including CLV, churn risk, and patterns per merchant-customer pair';
COMMENT ON TABLE ai_zone_profiles IS 'Enhanced zone analysis with structured POIs, pedestrian flows, and recurring events';
COMMENT ON TABLE ai_merchant_knowledge IS 'Persistent knowledge base for AI Co-Manager with versioning and categorization';
COMMENT ON TABLE ai_customer_triggers IS 'Automated CRM trigger definitions for customer engagement';
COMMENT ON TABLE ai_customer_trigger_executions IS 'Execution log for customer triggers with conversion tracking';

COMMENT ON COLUMN ai_customer_intelligence.clv_estimated IS 'Predicted total customer lifetime value in merchant currency';
COMMENT ON COLUMN ai_customer_intelligence.churn_risk_score IS 'Probability 0-1 that customer will churn';
COMMENT ON COLUMN ai_customer_intelligence.visit_pattern IS 'JSONB with preferred days, times, frequency analysis';
COMMENT ON COLUMN ai_customer_intelligence.order_pattern IS 'JSONB with average order value, categories, upsell rate';

COMMENT ON COLUMN ai_zone_profiles.pois IS 'Array of nearby points of interest with estimated foot traffic';
COMMENT ON COLUMN ai_zone_profiles.pedestrian_flows IS 'Traffic levels by time slot for weekday/weekend';
COMMENT ON COLUMN ai_zone_profiles.recurring_events IS 'Regular events that impact local traffic';

COMMENT ON COLUMN ai_merchant_knowledge.document_type IS 'Category: zone, customers, manager, history, menu, operations, strategies, etc.';
COMMENT ON COLUMN ai_merchant_knowledge.version IS 'Auto-incremented when content changes';
COMMENT ON COLUMN ai_merchant_knowledge.times_referenced IS 'How often AI has used this knowledge';

COMMENT ON COLUMN ai_customer_triggers.cooldown_days IS 'Minimum days between trigger activations for same customer';
COMMENT ON COLUMN ai_customer_triggers.conditions IS 'JSONB trigger conditions based on trigger_type';
COMMENT ON COLUMN ai_customer_triggers.action_config IS 'JSONB configuration for the action to take';

COMMENT ON COLUMN ai_customer_trigger_executions.next_eligible_at IS 'When customer becomes eligible for this trigger again (cooldown)';
COMMENT ON COLUMN ai_customer_trigger_executions.conversion_value IS 'Revenue generated from successful conversion';

COMMENT ON FUNCTION get_customers_at_risk IS 'Returns customers with high/critical churn risk sorted by CLV';
COMMENT ON FUNCTION is_customer_trigger_eligible IS 'Checks cooldown and max trigger limits for customer eligibility';
COMMENT ON FUNCTION sync_customer_intelligence_from_analytics IS 'Syncs basic data from follower_analytics to customer_intelligence';
COMMENT ON FUNCTION get_merchant_knowledge_context IS 'Retrieves relevant knowledge documents for AI context';

-- =============================================
-- END OF MIGRATION 045
-- =============================================
