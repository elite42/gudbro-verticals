-- =============================================
-- Migration 027: AI Co-Manager System (Phase 1 MVP)
-- =============================================
-- Creates tables for AI chat, usage tracking, and merchant preferences
-- Part of GB-AI-COMANAGER feature
-- =============================================

-- =============================================
-- TABLE: ai_usage_logs
-- Tracks all AI interactions for billing and analytics
-- =============================================
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,

  -- Action details
  action_type TEXT NOT NULL CHECK (action_type IN (
    'chat',           -- Chat conversation
    'translate',      -- Translation request
    'generate',       -- Content generation (descriptions, marketing)
    'analyze',        -- Data analysis
    'summarize',      -- Summarization
    'action'          -- AI took an action (create event, etc.)
  )),

  -- Context
  entity_type TEXT,                    -- 'menu_item', 'event', 'feedback', etc.
  entity_id UUID,                      -- Reference to the entity
  session_id UUID,                     -- Group related requests

  -- Request/Response
  prompt_summary TEXT,                 -- Brief summary of the prompt
  response_summary TEXT,               -- Brief summary of response

  -- Token usage (for billing)
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER GENERATED ALWAYS AS (input_tokens + output_tokens) STORED,

  -- Cost tracking
  model TEXT DEFAULT 'gpt-4o-mini',
  cost_usd DECIMAL(10,6) DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'error', 'partial')),
  error_message TEXT,

  -- Timing
  latency_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for ai_usage_logs
CREATE INDEX idx_ai_usage_merchant ON ai_usage_logs(merchant_id);
CREATE INDEX idx_ai_usage_account ON ai_usage_logs(account_id);
CREATE INDEX idx_ai_usage_session ON ai_usage_logs(session_id);
CREATE INDEX idx_ai_usage_created ON ai_usage_logs(created_at DESC);
CREATE INDEX idx_ai_usage_action ON ai_usage_logs(action_type);
CREATE INDEX idx_ai_usage_billing ON ai_usage_logs(merchant_id, created_at DESC);

-- =============================================
-- TABLE: ai_conversations
-- Stores chat history for context continuity
-- =============================================
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,            -- Groups messages in a conversation

  -- Message
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,

  -- AI actions taken (if any)
  actions_taken JSONB DEFAULT '[]',    -- [{type: 'create_event', entity_id: '...'}]

  -- Context that was used
  context_summary TEXT,                -- Summary of data AI had access to

  -- Token tracking
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,

  -- Metadata
  model TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for ai_conversations
CREATE INDEX idx_ai_conv_merchant ON ai_conversations(merchant_id);
CREATE INDEX idx_ai_conv_account ON ai_conversations(account_id);
CREATE INDEX idx_ai_conv_session ON ai_conversations(session_id, created_at);
CREATE INDEX idx_ai_conv_created ON ai_conversations(created_at DESC);

-- =============================================
-- TABLE: ai_merchant_preferences
-- AI behavior preferences per merchant
-- =============================================
CREATE TABLE ai_merchant_preferences (
  merchant_id UUID PRIMARY KEY REFERENCES merchants(id) ON DELETE CASCADE,

  -- Communication style
  communication_style TEXT DEFAULT 'professional' CHECK (communication_style IN (
    'professional',   -- Formal, business-like
    'friendly',       -- Casual, warm
    'concise',        -- Brief, to the point
    'detailed'        -- Thorough explanations
  )),
  preferred_language TEXT DEFAULT 'en',  -- Primary language for AI responses

  -- Daily briefing
  daily_briefing_enabled BOOLEAN DEFAULT false,
  briefing_time TIME DEFAULT '09:00',
  briefing_timezone TEXT DEFAULT 'UTC',

  -- Alerts & notifications
  alert_on_negative_feedback BOOLEAN DEFAULT true,
  alert_threshold_rating INTEGER DEFAULT 3,  -- Alert if rating <= this
  suggest_events BOOLEAN DEFAULT true,
  suggest_menu_updates BOOLEAN DEFAULT true,

  -- Permissions (what AI can do)
  can_read_menu BOOLEAN DEFAULT true,
  can_read_orders BOOLEAN DEFAULT true,
  can_read_feedback BOOLEAN DEFAULT true,
  can_read_analytics BOOLEAN DEFAULT true,
  can_read_events BOOLEAN DEFAULT true,

  can_create_events BOOLEAN DEFAULT false,      -- Phase 3
  can_modify_menu BOOLEAN DEFAULT false,        -- Phase 3
  can_respond_reviews BOOLEAN DEFAULT false,    -- Phase 3
  can_send_notifications BOOLEAN DEFAULT false, -- Phase 4

  -- Context window
  include_last_n_days_data INTEGER DEFAULT 30,
  max_context_items INTEGER DEFAULT 50,

  -- Usage limits (for billing tiers)
  monthly_request_limit INTEGER DEFAULT 100,    -- NULL = unlimited
  monthly_requests_used INTEGER DEFAULT 0,
  limit_reset_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TABLE: ai_sessions
-- Tracks conversation sessions
-- =============================================
CREATE TABLE ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- Session info
  title TEXT,                          -- Auto-generated or user-set title
  summary TEXT,                        -- AI-generated summary of conversation

  -- Stats
  message_count INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),

  -- Timestamps
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);

-- Indexes for ai_sessions
CREATE INDEX idx_ai_sessions_merchant ON ai_sessions(merchant_id);
CREATE INDEX idx_ai_sessions_account ON ai_sessions(account_id);
CREATE INDEX idx_ai_sessions_active ON ai_sessions(merchant_id, status) WHERE status = 'active';
CREATE INDEX idx_ai_sessions_last_msg ON ai_sessions(last_message_at DESC);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_merchant_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sessions ENABLE ROW LEVEL SECURITY;

-- Helper: Get current user's account_id from auth.uid()
-- Pattern P5: account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())

-- ai_usage_logs: Merchant staff can view their merchant's logs
CREATE POLICY "Merchant staff can view AI usage"
  ON ai_usage_logs FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert AI usage"
  ON ai_usage_logs FOR INSERT
  WITH CHECK (true);

-- ai_conversations: Users can view/insert their own conversations
CREATE POLICY "Users can view own conversations"
  ON ai_conversations FOR SELECT
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    OR merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

CREATE POLICY "Users can insert own conversations"
  ON ai_conversations FOR INSERT
  WITH CHECK (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

-- ai_merchant_preferences: Merchant admins can manage preferences
CREATE POLICY "Merchant admins can manage AI preferences"
  ON ai_merchant_preferences FOR ALL
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Merchant staff can view AI preferences"
  ON ai_merchant_preferences FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- ai_sessions: Users manage their own sessions
CREATE POLICY "Users can manage own sessions"
  ON ai_sessions FOR ALL
  USING (account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid()));

CREATE POLICY "Merchant admins can view all sessions"
  ON ai_sessions FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function to get or create merchant preferences
CREATE OR REPLACE FUNCTION get_or_create_ai_preferences(p_merchant_id UUID)
RETURNS ai_merchant_preferences AS $$
DECLARE
  v_prefs ai_merchant_preferences;
BEGIN
  SELECT * INTO v_prefs
  FROM ai_merchant_preferences
  WHERE merchant_id = p_merchant_id;

  IF NOT FOUND THEN
    INSERT INTO ai_merchant_preferences (merchant_id)
    VALUES (p_merchant_id)
    RETURNING * INTO v_prefs;
  END IF;

  RETURN v_prefs;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log AI usage
CREATE OR REPLACE FUNCTION log_ai_usage(
  p_merchant_id UUID,
  p_account_id UUID,
  p_action_type TEXT,
  p_session_id UUID DEFAULT NULL,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_prompt_summary TEXT DEFAULT NULL,
  p_response_summary TEXT DEFAULT NULL,
  p_input_tokens INTEGER DEFAULT 0,
  p_output_tokens INTEGER DEFAULT 0,
  p_model TEXT DEFAULT 'gpt-4o-mini',
  p_latency_ms INTEGER DEFAULT NULL,
  p_status TEXT DEFAULT 'success',
  p_error_message TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
  v_cost DECIMAL(10,6);
BEGIN
  -- Calculate cost based on model (prices as of 2024)
  v_cost := CASE p_model
    WHEN 'gpt-4o-mini' THEN (p_input_tokens * 0.00000015) + (p_output_tokens * 0.0000006)
    WHEN 'gpt-4o' THEN (p_input_tokens * 0.0000025) + (p_output_tokens * 0.00001)
    WHEN 'claude-3-haiku' THEN (p_input_tokens * 0.00000025) + (p_output_tokens * 0.00000125)
    WHEN 'claude-3-sonnet' THEN (p_input_tokens * 0.000003) + (p_output_tokens * 0.000015)
    ELSE 0
  END;

  INSERT INTO ai_usage_logs (
    merchant_id, account_id, action_type, session_id,
    entity_type, entity_id, prompt_summary, response_summary,
    input_tokens, output_tokens, model, cost_usd,
    latency_ms, status, error_message
  ) VALUES (
    p_merchant_id, p_account_id, p_action_type, p_session_id,
    p_entity_type, p_entity_id, p_prompt_summary, p_response_summary,
    p_input_tokens, p_output_tokens, p_model, v_cost,
    p_latency_ms, p_status, p_error_message
  )
  RETURNING id INTO v_log_id;

  -- Update monthly usage counter
  UPDATE ai_merchant_preferences
  SET monthly_requests_used = monthly_requests_used + 1,
      updated_at = NOW()
  WHERE merchant_id = p_merchant_id;

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get AI usage stats for billing
CREATE OR REPLACE FUNCTION get_ai_usage_stats(
  p_merchant_id UUID,
  p_start_date TIMESTAMPTZ DEFAULT NOW() - INTERVAL '30 days',
  p_end_date TIMESTAMPTZ DEFAULT NOW()
)
RETURNS TABLE (
  total_requests BIGINT,
  total_tokens BIGINT,
  total_cost DECIMAL(10,4),
  requests_by_type JSONB,
  daily_usage JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_requests,
    COALESCE(SUM(l.total_tokens), 0)::BIGINT as total_tokens,
    COALESCE(SUM(l.cost_usd), 0)::DECIMAL(10,4) as total_cost,
    (
      SELECT jsonb_object_agg(action_type, cnt)
      FROM (
        SELECT action_type, COUNT(*) as cnt
        FROM ai_usage_logs
        WHERE merchant_id = p_merchant_id
          AND created_at BETWEEN p_start_date AND p_end_date
        GROUP BY action_type
      ) t
    ) as requests_by_type,
    (
      SELECT jsonb_agg(jsonb_build_object(
        'date', day,
        'requests', requests,
        'tokens', tokens
      ) ORDER BY day)
      FROM (
        SELECT
          DATE(created_at) as day,
          COUNT(*) as requests,
          SUM(total_tokens) as tokens
        FROM ai_usage_logs
        WHERE merchant_id = p_merchant_id
          AND created_at BETWEEN p_start_date AND p_end_date
        GROUP BY DATE(created_at)
      ) t
    ) as daily_usage
  FROM ai_usage_logs l
  WHERE l.merchant_id = p_merchant_id
    AND l.created_at BETWEEN p_start_date AND p_end_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly usage (called by cron)
CREATE OR REPLACE FUNCTION reset_monthly_ai_usage()
RETURNS void AS $$
BEGIN
  UPDATE ai_merchant_preferences
  SET
    monthly_requests_used = 0,
    limit_reset_at = NOW() + INTERVAL '1 month',
    updated_at = NOW()
  WHERE limit_reset_at IS NULL OR limit_reset_at <= NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- TRIGGERS
-- =============================================

-- Auto-update updated_at on preferences
CREATE TRIGGER update_ai_preferences_timestamp
  BEFORE UPDATE ON ai_merchant_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update session stats when conversation is added
CREATE OR REPLACE FUNCTION update_session_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE ai_sessions
  SET
    message_count = message_count + 1,
    total_tokens = total_tokens + COALESCE(NEW.input_tokens, 0) + COALESCE(NEW.output_tokens, 0),
    last_message_at = NOW()
  WHERE id = NEW.session_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_session_on_message
  AFTER INSERT ON ai_conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_session_stats();

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_usage_logs IS 'Tracks all AI interactions for billing, analytics, and debugging';
COMMENT ON TABLE ai_conversations IS 'Stores chat history for context continuity across sessions';
COMMENT ON TABLE ai_merchant_preferences IS 'AI behavior preferences and permissions per merchant';
COMMENT ON TABLE ai_sessions IS 'Groups conversations into sessions for better UX';

COMMENT ON FUNCTION log_ai_usage IS 'Logs AI usage with automatic cost calculation based on model pricing';
COMMENT ON FUNCTION get_ai_usage_stats IS 'Returns aggregated AI usage stats for a merchant (billing dashboard)';
COMMENT ON FUNCTION get_or_create_ai_preferences IS 'Gets or creates default AI preferences for a merchant';
