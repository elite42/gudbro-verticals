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
