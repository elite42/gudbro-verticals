-- =============================================
-- Migration 029: AI Feedback Loop System (Phase 5)
-- =============================================
-- Collects merchant feedback about AI and routes to GudBro Team
-- Part of GB-AI-COMANAGER feature - Phase 5
-- =============================================

-- =============================================
-- TABLE: ai_feedback
-- Stores merchant feedback about AI Co-Manager
-- =============================================
CREATE TABLE ai_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  session_id UUID,               -- Related AI session if any

  -- Classification
  type TEXT NOT NULL CHECK (type IN (
    'bug',              -- Something broken
    'feature_request',  -- New feature wanted
    'improvement',      -- Enhancement to existing feature
    'complaint',        -- Unhappy with something
    'praise',           -- Positive feedback
    'question'          -- Need clarification
  )),
  category TEXT NOT NULL CHECK (category IN (
    'ai_chat',          -- Chat functionality
    'ai_actions',       -- Action execution
    'ai_suggestions',   -- Suggestions quality
    'ui_ux',            -- Interface issues
    'data_accuracy',    -- Wrong data/insights
    'performance',      -- Speed issues
    'other'             -- Everything else
  )),

  -- Content
  subject TEXT NOT NULL,
  description TEXT NOT NULL,

  -- AI Analysis
  ai_summary TEXT,
  ai_sentiment TEXT CHECK (ai_sentiment IN ('positive', 'neutral', 'negative')),
  ai_priority INTEGER CHECK (ai_priority BETWEEN 1 AND 5),

  -- Context
  conversation_context TEXT,     -- Relevant chat history
  screenshot_url TEXT,
  metadata JSONB DEFAULT '{}',

  -- Status workflow
  status TEXT DEFAULT 'new' CHECK (status IN (
    'new',          -- Just submitted
    'reviewed',     -- Team has seen it
    'in_progress',  -- Being worked on
    'resolved',     -- Fixed/implemented
    'wont_fix'      -- Declined
  )),
  assigned_to TEXT,              -- Team member name/id
  resolution TEXT,               -- How it was resolved

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ
);

-- Indexes for ai_feedback
CREATE INDEX idx_ai_feedback_merchant ON ai_feedback(merchant_id);
CREATE INDEX idx_ai_feedback_status ON ai_feedback(status);
CREATE INDEX idx_ai_feedback_priority ON ai_feedback(ai_priority, created_at DESC) WHERE status IN ('new', 'reviewed');
CREATE INDEX idx_ai_feedback_type ON ai_feedback(type);
CREATE INDEX idx_ai_feedback_created ON ai_feedback(created_at DESC);

-- =============================================
-- TABLE: ai_feedback_responses
-- GudBro team responses to merchant feedback
-- =============================================
CREATE TABLE ai_feedback_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id UUID NOT NULL REFERENCES ai_feedback(id) ON DELETE CASCADE,
  responder_id TEXT NOT NULL,    -- Team member who responded
  response TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true, -- Visible to merchant?
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_ai_feedback_responses_feedback ON ai_feedback_responses(feedback_id);

-- =============================================
-- TABLE: internal_notifications
-- Internal notifications for GudBro team
-- =============================================
CREATE TABLE IF NOT EXISTS internal_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,            -- ai_feedback, system_alert, etc.
  priority INTEGER DEFAULT 3,
  subject TEXT NOT NULL,
  body TEXT,

  -- Reference to source
  reference_type TEXT,           -- ai_feedback, merchant, etc.
  reference_id UUID,

  -- Status
  is_read BOOLEAN DEFAULT false,
  read_by TEXT,
  read_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_internal_notif_unread ON internal_notifications(is_read, priority, created_at DESC) WHERE is_read = false;
CREATE INDEX idx_internal_notif_type ON internal_notifications(type, created_at DESC);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_feedback_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_notifications ENABLE ROW LEVEL SECURITY;

-- ai_feedback: Merchants can view/create their own feedback
CREATE POLICY "Merchants can view own feedback"
  ON ai_feedback FOR SELECT
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

CREATE POLICY "Merchants can create feedback"
  ON ai_feedback FOR INSERT
  WITH CHECK (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  );

-- Admin can do everything with feedback
CREATE POLICY "Admin full access to feedback"
  ON ai_feedback FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.role_type = 'admin'
      AND ar.is_active = true
    )
  );

-- ai_feedback_responses: Merchants can view public responses to their feedback
CREATE POLICY "Merchants can view responses to own feedback"
  ON ai_feedback_responses FOR SELECT
  USING (
    is_public = true
    AND feedback_id IN (
      SELECT id FROM ai_feedback
      WHERE merchant_id IN (
        SELECT ar.tenant_id FROM account_roles ar
        WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        AND ar.role_type = 'merchant'
        AND ar.is_active = true
      )
    )
  );

-- Admin can manage responses
CREATE POLICY "Admin full access to responses"
  ON ai_feedback_responses FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.role_type = 'admin'
      AND ar.is_active = true
    )
  );

-- System can insert responses
CREATE POLICY "System can insert responses"
  ON ai_feedback_responses FOR INSERT
  WITH CHECK (true);

-- internal_notifications: Admin only
CREATE POLICY "Admin can manage notifications"
  ON internal_notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.role_type = 'admin'
      AND ar.is_active = true
    )
  );

-- System can insert notifications
CREATE POLICY "System can insert notifications"
  ON internal_notifications FOR INSERT
  WITH CHECK (true);

-- =============================================
-- FUNCTIONS
-- =============================================

-- Get feedback stats for dashboard
CREATE OR REPLACE FUNCTION get_feedback_stats()
RETURNS TABLE (
  total_count BIGINT,
  new_count BIGINT,
  in_progress_count BIGINT,
  resolved_count BIGINT,
  avg_priority NUMERIC,
  sentiment_breakdown JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_count,
    COUNT(*) FILTER (WHERE status = 'new')::BIGINT as new_count,
    COUNT(*) FILTER (WHERE status = 'in_progress')::BIGINT as in_progress_count,
    COUNT(*) FILTER (WHERE status = 'resolved')::BIGINT as resolved_count,
    ROUND(AVG(ai_priority)::NUMERIC, 1) as avg_priority,
    jsonb_build_object(
      'positive', COUNT(*) FILTER (WHERE ai_sentiment = 'positive'),
      'neutral', COUNT(*) FILTER (WHERE ai_sentiment = 'neutral'),
      'negative', COUNT(*) FILTER (WHERE ai_sentiment = 'negative')
    ) as sentiment_breakdown
  FROM ai_feedback;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_feedback IS 'Merchant feedback about AI Co-Manager for GudBro team';
COMMENT ON TABLE ai_feedback_responses IS 'GudBro team responses to merchant feedback';
COMMENT ON TABLE internal_notifications IS 'Internal notifications for GudBro team dashboard';
