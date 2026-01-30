-- =============================================
-- Migration 082: Feedback Intelligence System
-- =============================================
-- Merchant feedback submission, AI-processed task aggregation,
-- and notification system for the Feedback Intelligence pipeline.
-- Part of v1.3 Merchant Feedback Intelligence milestone.
-- =============================================

-- Enable pg_trgm for text similarity (safe if already enabled)
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================
-- TABLE: fb_submissions
-- Stores raw merchant feedback with AI-processed fields
-- =============================================
CREATE TABLE fb_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Original content
  original_title TEXT,                   -- nullable: not all feedback has a title
  original_body TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'chat', 'email', 'api')),
  vertical TEXT,                         -- which app the feedback came from
  page_path TEXT,                        -- which page they were on

  -- AI-processed fields (populated after processing)
  detected_language TEXT,                -- ISO 639-1 code
  translated_title TEXT,
  translated_body TEXT,
  type TEXT CHECK (type IN ('bug', 'feature_request', 'improvement', 'complaint', 'praise', 'operational')),
  priority INTEGER CHECK (priority BETWEEN 1 AND 5),
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  ai_confidence DECIMAL(3,2),            -- 0.00 to 1.00
  tags TEXT[] DEFAULT '{}',

  -- Task linkage (FK added after fb_tasks creation)
  task_id UUID,

  -- Processing state
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'processed', 'failed')),
  processing_attempts INTEGER NOT NULL DEFAULT 0,
  processing_error TEXT,
  processed_at TIMESTAMPTZ,

  -- Metadata
  submitted_by_account_id UUID REFERENCES accounts(id),
  screenshot_url TEXT,                   -- for Phase 14 screenshot upload

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- TABLE: fb_tasks
-- Aggregated tasks from similar submissions
-- =============================================
CREATE TABLE fb_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Task content (from first/best submission)
  title TEXT NOT NULL,
  description TEXT,

  -- Classification (inherited from submissions, may be overridden)
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature_request', 'improvement', 'complaint', 'praise', 'operational')),
  priority INTEGER NOT NULL CHECK (priority BETWEEN 1 AND 5),
  tags TEXT[] DEFAULT '{}',

  -- Lifecycle
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'in_progress', 'done', 'rejected')),

  -- Denormalized aggregation metrics
  submission_count INTEGER NOT NULL DEFAULT 1,
  languages TEXT[] DEFAULT '{}',
  avg_sentiment DECIMAL(3,2),
  first_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Resolution
  resolved_at TIMESTAMPTZ,
  resolution_note TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add FK from submissions to tasks (after fb_tasks exists)
ALTER TABLE fb_submissions ADD CONSTRAINT fk_fb_submissions_task
  FOREIGN KEY (task_id) REFERENCES fb_tasks(id) ON DELETE SET NULL;

-- =============================================
-- TABLE: fb_merchant_notifications
-- Notification records for merchant feedback events
-- =============================================
CREATE TABLE fb_merchant_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- References
  submission_id UUID REFERENCES fb_submissions(id) ON DELETE CASCADE,
  task_id UUID REFERENCES fb_tasks(id) ON DELETE CASCADE,

  -- Content
  type TEXT NOT NULL CHECK (type IN ('acknowledged', 'status_changed', 'resolved', 'rejected')),
  title TEXT NOT NULL,
  body TEXT,

  -- Read state
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

-- fb_submissions indexes
CREATE INDEX idx_fb_submissions_merchant ON fb_submissions(merchant_id, created_at DESC);
CREATE INDEX idx_fb_submissions_status ON fb_submissions(status) WHERE status IN ('pending', 'processing');
CREATE INDEX idx_fb_submissions_task ON fb_submissions(task_id) WHERE task_id IS NOT NULL;
CREATE INDEX idx_fb_submissions_tags ON fb_submissions USING GIN (tags);
CREATE INDEX idx_fb_submissions_trgm ON fb_submissions USING GIN (translated_body gin_trgm_ops);

-- fb_tasks indexes
CREATE INDEX idx_fb_tasks_merchant_status ON fb_tasks(merchant_id, status);
CREATE INDEX idx_fb_tasks_merchant_created ON fb_tasks(merchant_id, created_at DESC);
CREATE INDEX idx_fb_tasks_tags ON fb_tasks USING GIN (tags);

-- fb_merchant_notifications indexes
CREATE INDEX idx_fb_notifications_account ON fb_merchant_notifications(account_id, is_read, created_at DESC);
CREATE INDEX idx_fb_notifications_merchant ON fb_merchant_notifications(merchant_id);

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE fb_submissions IS 'Raw merchant feedback submissions with AI-processed classification, translation, and tagging';
COMMENT ON TABLE fb_tasks IS 'Aggregated tasks from similar feedback submissions with denormalized metrics';
COMMENT ON TABLE fb_merchant_notifications IS 'Notification records for merchant feedback lifecycle events (acknowledged, status changes, resolution)';

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE fb_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fb_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE fb_merchant_notifications ENABLE ROW LEVEL SECURITY;

-- ----- fb_submissions RLS -----

CREATE POLICY "Merchants can view own submissions"
  ON fb_submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = fb_submissions.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

CREATE POLICY "Merchants can insert own submissions"
  ON fb_submissions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = fb_submissions.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

CREATE POLICY "Service role full access submissions"
  ON fb_submissions FOR ALL
  USING (auth.role() = 'service_role');

-- ----- fb_tasks RLS -----

CREATE POLICY "Merchants can view own tasks"
  ON fb_tasks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = fb_tasks.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

CREATE POLICY "Service role full access tasks"
  ON fb_tasks FOR ALL
  USING (auth.role() = 'service_role');

-- ----- fb_merchant_notifications RLS -----

CREATE POLICY "Accounts can view own notifications"
  ON fb_merchant_notifications FOR SELECT
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  );

CREATE POLICY "Accounts can update own notifications"
  ON fb_merchant_notifications FOR UPDATE
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  );

CREATE POLICY "Service role full access notifications"
  ON fb_merchant_notifications FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================
-- FUNCTIONS
-- =============================================

-- Find similar tasks for a new submission using tag overlap + trigram similarity
CREATE OR REPLACE FUNCTION find_similar_tasks(
  p_merchant_id UUID,
  p_translated_body TEXT,
  p_tags TEXT[],
  p_threshold DECIMAL DEFAULT 0.5
)
RETURNS TABLE (
  task_id UUID,
  similarity_score DECIMAL,
  tag_overlap INTEGER,
  trigram_score REAL
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH scored_tasks AS (
    SELECT
      t.id,
      -- Tag overlap: count of matching tags / total input tags
      COALESCE(
        (SELECT COUNT(*)::INTEGER FROM unnest(p_tags) tag WHERE tag = ANY(t.tags)),
        0
      ) AS overlap_count,
      -- Trigram similarity on concatenated title + description vs input body
      COALESCE(
        similarity(t.title || ' ' || COALESCE(t.description, ''), p_translated_body),
        0
      ) AS trgm_score
    FROM fb_tasks t
    WHERE t.merchant_id = p_merchant_id
      AND t.status NOT IN ('done', 'rejected')
  )
  SELECT
    st.id AS task_id,
    (
      0.6 * (st.overlap_count::DECIMAL / GREATEST(array_length(p_tags, 1), 1)) +
      0.4 * st.trgm_score
    )::DECIMAL AS similarity_score,
    st.overlap_count AS tag_overlap,
    st.trgm_score AS trigram_score
  FROM scored_tasks st
  WHERE (
    0.6 * (st.overlap_count::DECIMAL / GREATEST(array_length(p_tags, 1), 1)) +
    0.4 * st.trgm_score
  ) >= p_threshold
  ORDER BY similarity_score DESC
  LIMIT 5;
END;
$$;

-- Recalculate denormalized metrics on fb_tasks from linked submissions
CREATE OR REPLACE FUNCTION update_task_metrics(p_task_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE fb_tasks
  SET
    submission_count = sub.cnt,
    languages = sub.langs,
    avg_sentiment = sub.avg_sent,
    last_submitted_at = sub.last_sub,
    updated_at = NOW()
  FROM (
    SELECT
      COUNT(*)::INTEGER AS cnt,
      ARRAY(
        SELECT DISTINCT s2.detected_language
        FROM fb_submissions s2
        WHERE s2.task_id = p_task_id
          AND s2.detected_language IS NOT NULL
      ) AS langs,
      AVG(
        CASE s.sentiment
          WHEN 'positive' THEN 1.0
          WHEN 'neutral' THEN 0.5
          WHEN 'negative' THEN 0.0
          ELSE NULL
        END
      )::DECIMAL(3,2) AS avg_sent,
      MAX(s.created_at) AS last_sub
    FROM fb_submissions s
    WHERE s.task_id = p_task_id
  ) AS sub
  WHERE fb_tasks.id = p_task_id;
END;
$$;

-- =============================================
-- TRIGGERS: updated_at
-- =============================================

-- Generic updated_at trigger function (create if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'update_updated_at_column'
    AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) THEN
    EXECUTE $func$
      CREATE FUNCTION update_updated_at_column()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      AS $trigger$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $trigger$;
    $func$;
  END IF;
END $$;

DROP TRIGGER IF EXISTS update_fb_submissions_updated_at ON fb_submissions;
CREATE TRIGGER update_fb_submissions_updated_at
  BEFORE UPDATE ON fb_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_fb_tasks_updated_at ON fb_tasks;
CREATE TRIGGER update_fb_tasks_updated_at
  BEFORE UPDATE ON fb_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_fb_notifications_updated_at ON fb_merchant_notifications;
CREATE TRIGGER update_fb_notifications_updated_at
  BEFORE UPDATE ON fb_merchant_notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- MIGRATION COMPLETE
-- =============================================
-- Tables created:
--   - fb_submissions (merchant feedback with AI processing fields)
--   - fb_tasks (aggregated tasks with denormalized metrics)
--   - fb_merchant_notifications (lifecycle notification records)
--
-- Functions created:
--   - find_similar_tasks(merchant_id, translated_body, tags, threshold)
--   - update_task_metrics(task_id)
--
-- RLS Policies:
--   - Merchants view/insert own submissions via account_roles
--   - Merchants view own tasks via account_roles
--   - Accounts view/update own notifications via auth_id
--   - Service role has full access to all tables
-- =============================================
