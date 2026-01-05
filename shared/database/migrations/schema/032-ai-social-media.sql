-- =============================================
-- Migration 032: AI Social Media Automation (Phase 8)
-- =============================================
-- Auto post generation, content calendar, captions
-- Part of GB-AI-COMANAGER feature - Phase 8
-- =============================================

-- =============================================
-- TABLE: ai_social_posts
-- AI-generated social media posts
-- =============================================
CREATE TABLE ai_social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Platform
  platform TEXT NOT NULL CHECK (platform IN (
    'instagram', 'facebook', 'tiktok', 'twitter', 'google_business'
  )),

  -- Content
  content TEXT NOT NULL,
  caption TEXT NOT NULL,
  hashtags TEXT[] DEFAULT '{}',
  call_to_action TEXT,

  -- Media
  media_type TEXT DEFAULT 'image' CHECK (media_type IN (
    'image', 'video', 'carousel', 'story', 'reel'
  )),
  media_urls TEXT[] DEFAULT '{}',
  media_suggestion TEXT,         -- AI suggestion for what media to use

  -- Scheduling
  scheduled_for TIMESTAMPTZ,
  best_time_to_post TEXT,
  timezone TEXT DEFAULT 'UTC',

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN (
    'draft',      -- Just created
    'scheduled',  -- Scheduled for publishing
    'published',  -- Published
    'failed'      -- Publishing failed
  )),

  -- Performance metrics (after publishing)
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_ai_posts_merchant ON ai_social_posts(merchant_id);
CREATE INDEX idx_ai_posts_status ON ai_social_posts(merchant_id, status);
CREATE INDEX idx_ai_posts_platform ON ai_social_posts(merchant_id, platform);
CREATE INDEX idx_ai_posts_scheduled ON ai_social_posts(scheduled_for) WHERE status = 'scheduled';
CREATE INDEX idx_ai_posts_created ON ai_social_posts(created_at DESC);

-- =============================================
-- TABLE: ai_content_calendars
-- Weekly content calendars
-- =============================================
CREATE TABLE ai_content_calendars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  week_start DATE NOT NULL,
  posts JSONB DEFAULT '[]',      -- Array of planned posts

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- One calendar per week per merchant
  CONSTRAINT unique_weekly_calendar UNIQUE (merchant_id, week_start)
);

-- Indexes
CREATE INDEX idx_ai_calendar_merchant ON ai_content_calendars(merchant_id);
CREATE INDEX idx_ai_calendar_week ON ai_content_calendars(week_start DESC);

-- =============================================
-- TABLE: ai_social_accounts
-- Connected social media accounts
-- =============================================
CREATE TABLE ai_social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  platform TEXT NOT NULL CHECK (platform IN (
    'instagram', 'facebook', 'tiktok', 'twitter', 'google_business'
  )),
  account_id TEXT,               -- Platform-specific account ID
  account_name TEXT,
  access_token TEXT,             -- Encrypted in production
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One account per platform per merchant
  CONSTRAINT unique_social_account UNIQUE (merchant_id, platform)
);

-- Indexes
CREATE INDEX idx_ai_social_accounts_merchant ON ai_social_accounts(merchant_id);
CREATE INDEX idx_ai_social_accounts_active ON ai_social_accounts(merchant_id, is_active) WHERE is_active = true;

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_content_calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_social_accounts ENABLE ROW LEVEL SECURITY;

-- Social posts: Merchant staff can manage their own
CREATE POLICY "Merchant staff can view posts"
  ON ai_social_posts FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert posts"
  ON ai_social_posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update posts"
  ON ai_social_posts FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Merchant staff can delete posts"
  ON ai_social_posts FOR DELETE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- Content calendars
CREATE POLICY "Merchant staff can view calendars"
  ON ai_content_calendars FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "System can insert calendars"
  ON ai_content_calendars FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Merchant staff can update calendars"
  ON ai_content_calendars FOR UPDATE
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- Social accounts
CREATE POLICY "Merchant staff can manage social accounts"
  ON ai_social_accounts FOR ALL
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- =============================================
-- TRIGGERS
-- =============================================

CREATE TRIGGER update_social_account_timestamp
  BEFORE UPDATE ON ai_social_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_social_posts IS 'AI-generated social media posts';
COMMENT ON TABLE ai_content_calendars IS 'Weekly content calendars for social media';
COMMENT ON TABLE ai_social_accounts IS 'Connected social media accounts for auto-posting';
