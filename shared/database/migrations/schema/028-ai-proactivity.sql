-- =============================================
-- Migration 028: AI Proactivity System (Phase 4)
-- =============================================
-- Adds tables for daily briefings, alerts, and suggestions
-- Part of GB-AI-COMANAGER feature - Phase 4
-- =============================================

-- =============================================
-- TABLE: ai_daily_briefings
-- Stores generated daily briefings for merchants
-- =============================================
CREATE TABLE ai_daily_briefings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

  -- Briefing date (one per day per merchant/location)
  date DATE NOT NULL,

  -- Content
  summary TEXT NOT NULL,
  highlights JSONB DEFAULT '[]',  -- Array of {type, title, description, metric, change}
  alerts JSONB DEFAULT '[]',      -- Array of alerts generated with briefing
  suggestions JSONB DEFAULT '[]', -- Array of suggestions

  -- Metadata
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  viewed_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT unique_daily_briefing UNIQUE (merchant_id, location_id, date)
);

-- Indexes for ai_daily_briefings
CREATE INDEX idx_ai_briefings_merchant ON ai_daily_briefings(merchant_id);
CREATE INDEX idx_ai_briefings_date ON ai_daily_briefings(date DESC);
CREATE INDEX idx_ai_briefings_merchant_date ON ai_daily_briefings(merchant_id, date DESC);

-- =============================================
-- TABLE: ai_alerts
-- Stores proactive alerts for merchants
-- =============================================
CREATE TABLE ai_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

  -- Alert classification
  type TEXT NOT NULL CHECK (type IN ('warning', 'info', 'success', 'urgent')),
  category TEXT NOT NULL CHECK (category IN (
    'inventory',    -- Stock/availability issues
    'sales',        -- Sales patterns
    'feedback',     -- Customer feedback
    'events',       -- Upcoming events
    'operations',   -- General operations
    'financial',    -- Revenue/cost alerts
    'marketing'     -- Marketing opportunities
  )),

  -- Content
  title TEXT NOT NULL,
  message TEXT NOT NULL,

  -- Actionability
  actionable BOOLEAN DEFAULT false,
  suggested_action TEXT,
  action_url TEXT,              -- Deep link to relevant page

  -- Priority (1 = highest, 5 = lowest)
  priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),

  -- Related entity (optional)
  entity_type TEXT,             -- 'event', 'menu_item', 'feedback', etc.
  entity_id UUID,

  -- Status
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  dismissed_at TIMESTAMPTZ,
  actioned_at TIMESTAMPTZ,      -- User took the suggested action

  -- Expiration (some alerts are time-sensitive)
  expires_at TIMESTAMPTZ
);

-- Indexes for ai_alerts
CREATE INDEX idx_ai_alerts_merchant ON ai_alerts(merchant_id);
CREATE INDEX idx_ai_alerts_active ON ai_alerts(merchant_id, dismissed_at) WHERE dismissed_at IS NULL;
CREATE INDEX idx_ai_alerts_priority ON ai_alerts(merchant_id, priority, created_at DESC) WHERE dismissed_at IS NULL;
CREATE INDEX idx_ai_alerts_category ON ai_alerts(merchant_id, category);
CREATE INDEX idx_ai_alerts_created ON ai_alerts(created_at DESC);

-- =============================================
-- TABLE: ai_suggestions
-- Stores AI-generated business suggestions
-- =============================================
CREATE TABLE ai_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

  -- Suggestion type
  type TEXT NOT NULL CHECK (type IN (
    'menu',         -- Menu improvements
    'pricing',      -- Price adjustments
    'marketing',    -- Marketing ideas
    'operations',   -- Operational improvements
    'events',       -- Event suggestions
    'inventory',    -- Stock management
    'staffing'      -- Staff scheduling
  )),

  -- Content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  expected_impact TEXT,

  -- Effort estimate
  effort TEXT DEFAULT 'medium' CHECK (effort IN ('low', 'medium', 'high')),

  -- Priority (AI-calculated based on impact/effort)
  priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',      -- Not yet reviewed
    'accepted',     -- User accepted
    'rejected',     -- User rejected
    'implemented',  -- User implemented
    'expired'       -- No longer relevant
  )),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  implemented_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  -- Feedback
  user_feedback TEXT
);

-- Indexes for ai_suggestions
CREATE INDEX idx_ai_suggestions_merchant ON ai_suggestions(merchant_id);
CREATE INDEX idx_ai_suggestions_pending ON ai_suggestions(merchant_id, status) WHERE status = 'pending';
CREATE INDEX idx_ai_suggestions_type ON ai_suggestions(merchant_id, type);
CREATE INDEX idx_ai_suggestions_priority ON ai_suggestions(merchant_id, priority) WHERE status = 'pending';

-- =============================================
-- Add columns to ai_merchant_preferences for Phase 4
-- =============================================
ALTER TABLE ai_merchant_preferences
ADD COLUMN IF NOT EXISTS alert_types TEXT[] DEFAULT ARRAY['urgent', 'warning'],
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS push_notifications BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS suggestion_frequency TEXT DEFAULT 'weekly'
  CHECK (suggestion_frequency IN ('daily', 'weekly', 'monthly', 'never'));

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_daily_briefings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestions ENABLE ROW LEVEL SECURITY;

-- ai_daily_briefings: Merchant staff can view their briefings
CREATE POLICY "Merchant staff can view briefings"
  ON ai_daily_briefings FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert briefings"
  ON ai_daily_briefings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update briefings"
  ON ai_daily_briefings FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- ai_alerts: Merchant staff can view and manage their alerts
CREATE POLICY "Merchant staff can view alerts"
  ON ai_alerts FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert alerts"
  ON ai_alerts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update alerts"
  ON ai_alerts FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- ai_suggestions: Merchant staff can view and manage suggestions
CREATE POLICY "Merchant staff can view suggestions"
  ON ai_suggestions FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert suggestions"
  ON ai_suggestions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update suggestions"
  ON ai_suggestions FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to get active alerts count by category
CREATE OR REPLACE FUNCTION get_alert_counts(p_merchant_id UUID)
RETURNS TABLE (
  total BIGINT,
  urgent BIGINT,
  warning BIGINT,
  info BIGINT,
  by_category JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total,
    COUNT(*) FILTER (WHERE type = 'urgent')::BIGINT as urgent,
    COUNT(*) FILTER (WHERE type = 'warning')::BIGINT as warning,
    COUNT(*) FILTER (WHERE type = 'info')::BIGINT as info,
    (
      SELECT jsonb_object_agg(category, cnt)
      FROM (
        SELECT category, COUNT(*) as cnt
        FROM ai_alerts
        WHERE merchant_id = p_merchant_id
          AND dismissed_at IS NULL
          AND (expires_at IS NULL OR expires_at > NOW())
        GROUP BY category
      ) t
    ) as by_category
  FROM ai_alerts
  WHERE merchant_id = p_merchant_id
    AND dismissed_at IS NULL
    AND (expires_at IS NULL OR expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to dismiss all alerts of a type/category
CREATE OR REPLACE FUNCTION dismiss_alerts_bulk(
  p_merchant_id UUID,
  p_type TEXT DEFAULT NULL,
  p_category TEXT DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE ai_alerts
  SET dismissed_at = NOW()
  WHERE merchant_id = p_merchant_id
    AND dismissed_at IS NULL
    AND (p_type IS NULL OR type = p_type)
    AND (p_category IS NULL OR category = p_category);

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old briefings and alerts
CREATE OR REPLACE FUNCTION cleanup_old_ai_data()
RETURNS void AS $$
BEGIN
  -- Delete briefings older than 90 days
  DELETE FROM ai_daily_briefings
  WHERE date < CURRENT_DATE - INTERVAL '90 days';

  -- Delete dismissed alerts older than 30 days
  DELETE FROM ai_alerts
  WHERE dismissed_at IS NOT NULL
    AND dismissed_at < NOW() - INTERVAL '30 days';

  -- Delete expired alerts
  DELETE FROM ai_alerts
  WHERE expires_at IS NOT NULL
    AND expires_at < NOW() - INTERVAL '7 days';

  -- Mark expired suggestions
  UPDATE ai_suggestions
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at IS NOT NULL
    AND expires_at < NOW();

  -- Delete old expired/rejected suggestions
  DELETE FROM ai_suggestions
  WHERE status IN ('expired', 'rejected')
    AND created_at < NOW() - INTERVAL '60 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_daily_briefings IS 'AI-generated daily business briefings for merchants';
COMMENT ON TABLE ai_alerts IS 'Proactive alerts generated by AI based on business patterns';
COMMENT ON TABLE ai_suggestions IS 'AI-generated business improvement suggestions';

COMMENT ON FUNCTION get_alert_counts IS 'Returns count of active alerts by type and category';
COMMENT ON FUNCTION dismiss_alerts_bulk IS 'Dismisses multiple alerts at once based on type/category';
COMMENT ON FUNCTION cleanup_old_ai_data IS 'Cleanup function for old AI data (run via cron)';
