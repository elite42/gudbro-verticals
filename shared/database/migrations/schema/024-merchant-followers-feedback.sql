-- =====================================================
-- Migration 024: Merchant Followers & Feedback System
-- Date: 2026-01-04
-- Description: Customer follow system and feedback with P5 accounts integration
-- Depends on: P5 Unified Account System (001-accounts-foundation.sql)
-- =====================================================

-- =====================================================
-- PART 1: MERCHANT FOLLOWERS (Opt-in System)
-- =====================================================
-- Users explicitly follow merchants to access loyalty/promos
-- Merchants only see their followers, not all GudBro users
-- Links to P5 accounts table (NOT the old gudbro_user_profiles)

CREATE TABLE IF NOT EXISTS merchant_followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships (using P5 accounts, NOT gudbro_user_profiles)
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Follow State
  is_active BOOLEAN NOT NULL DEFAULT true,  -- false = unfollowed
  followed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unfollowed_at TIMESTAMPTZ,  -- when they unfollowed (if is_active = false)

  -- How they discovered the merchant
  source VARCHAR(50) DEFAULT 'qr_scan',  -- qr_scan, search, referral, promo
  referral_code VARCHAR(50),  -- if referred by another user

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Unique constraint: one follow record per user-merchant pair
  CONSTRAINT unique_account_merchant_follow UNIQUE (account_id, merchant_id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_followers_merchant ON merchant_followers(merchant_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_followers_account ON merchant_followers(account_id) WHERE is_active = true;

-- =====================================================
-- PART 2: FOLLOWER ANALYTICS (Cached Metrics)
-- =====================================================
-- Pre-computed analytics per follower for fast backoffice queries
-- Updated via triggers or scheduled jobs

CREATE TABLE IF NOT EXISTS follower_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References (using P5 accounts)
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Visit Metrics
  first_visit_at TIMESTAMPTZ,
  last_visit_at TIMESTAMPTZ,
  total_visits INTEGER DEFAULT 0,
  visits_this_month INTEGER DEFAULT 0,
  visits_last_month INTEGER DEFAULT 0,

  -- Order Metrics
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0,
  orders_this_month INTEGER DEFAULT 0,
  spent_this_month DECIMAL(12,2) DEFAULT 0,

  -- Product Preferences (JSON array of top products)
  favorite_products JSONB DEFAULT '[]',  -- [{product_id, name, order_count}]
  favorite_categories TEXT[] DEFAULT '{}',

  -- Loyalty (now synced with P5 accounts.total_points)
  loyalty_points INTEGER DEFAULT 0,
  loyalty_tier VARCHAR(50) DEFAULT 'bronze',  -- bronze, silver, gold, platinum
  rewards_redeemed INTEGER DEFAULT 0,

  -- Feedback Summary
  total_feedback_given INTEGER DEFAULT 0,
  average_rating DECIMAL(2,1),  -- 1.0 to 5.0
  last_feedback_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Unique constraint
  CONSTRAINT unique_follower_analytics UNIQUE (account_id, merchant_id)
);

-- Index for backoffice queries
CREATE INDEX IF NOT EXISTS idx_analytics_merchant ON follower_analytics(merchant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_last_visit ON follower_analytics(merchant_id, last_visit_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_top_spenders ON follower_analytics(merchant_id, total_spent DESC);

-- =====================================================
-- PART 3: CUSTOMER FEEDBACK SYSTEM
-- =====================================================
-- Ratings, reviews, suggestions, and issue reports

CREATE TABLE IF NOT EXISTS customer_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who (using P5 accounts)
  account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,  -- nullable for guest feedback
  session_id VARCHAR(255),  -- for guest feedback tracking
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- What (context)
  order_id UUID,  -- nullable for general feedback

  -- Feedback Type
  type VARCHAR(20) NOT NULL CHECK (type IN ('rating', 'review', 'suggestion', 'issue', 'compliment')),
  category VARCHAR(30) NOT NULL DEFAULT 'general' CHECK (category IN (
    'food_quality', 'service', 'ambience', 'cleanliness',
    'app_experience', 'delivery', 'pricing', 'menu', 'general'
  )),

  -- Content
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),  -- 1-5 stars (if applicable)
  title VARCHAR(255),  -- optional headline
  message TEXT,  -- detailed feedback

  -- Media attachments
  attachments JSONB DEFAULT '[]',  -- [{url, type: 'image'|'video'}]

  -- Status & Response
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'in_progress', 'replied', 'resolved', 'dismissed')),
  staff_reply TEXT,
  replied_by_account_id UUID REFERENCES accounts(id),  -- Staff member who replied
  replied_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,

  -- Visibility
  is_public BOOLEAN DEFAULT false,  -- show on menu as testimonial?
  is_featured BOOLEAN DEFAULT false,  -- highlight in backoffice?

  -- Metadata
  device_type VARCHAR(20),  -- mobile, tablet, desktop
  app_version VARCHAR(20),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for feedback queries
CREATE INDEX IF NOT EXISTS idx_feedback_merchant ON customer_feedback(merchant_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_account ON customer_feedback(account_id);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON customer_feedback(merchant_id, status) WHERE status IN ('new', 'in_progress');
CREATE INDEX IF NOT EXISTS idx_feedback_type ON customer_feedback(merchant_id, type);
CREATE INDEX IF NOT EXISTS idx_feedback_public ON customer_feedback(merchant_id) WHERE is_public = true;

-- =====================================================
-- PART 4: ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE merchant_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE follower_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_feedback ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- Merchant Followers: Users manage their own follows
-- =====================================================

CREATE POLICY "Users can view own follows"
  ON merchant_followers FOR SELECT
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can follow merchants"
  ON merchant_followers FOR INSERT
  WITH CHECK (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  );

CREATE POLICY "Users can update own follows"
  ON merchant_followers FOR UPDATE
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  );

-- Merchant staff can see their followers (via account_roles)
CREATE POLICY "Merchants can view their followers"
  ON merchant_followers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = merchant_followers.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

-- Service role bypass
CREATE POLICY "Service role full access followers"
  ON merchant_followers FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- Follower Analytics: Merchants view their analytics
-- =====================================================

CREATE POLICY "Merchants can view follower analytics"
  ON follower_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = follower_analytics.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

-- Service role can manage analytics (for triggers/jobs)
CREATE POLICY "Service role full access analytics"
  ON follower_analytics FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- Customer Feedback: Users submit, merchants respond
-- =====================================================

CREATE POLICY "Users can view own feedback"
  ON customer_feedback FOR SELECT
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    OR account_id IS NULL  -- Guest feedback visible to owner session
  );

CREATE POLICY "Users can submit feedback"
  ON customer_feedback FOR INSERT
  WITH CHECK (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    OR account_id IS NULL  -- Allow guest feedback
  );

CREATE POLICY "Users can edit own feedback before reply"
  ON customer_feedback FOR UPDATE
  USING (
    account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND status = 'new'
  );

-- Merchants view and respond to feedback
CREATE POLICY "Merchants can view feedback"
  ON customer_feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = customer_feedback.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

CREATE POLICY "Merchants can respond to feedback"
  ON customer_feedback FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
      AND ar.tenant_id = customer_feedback.merchant_id
      AND ar.role_type = 'merchant'
      AND ar.is_active = true
    )
  );

-- Service role bypass
CREATE POLICY "Service role full access feedback"
  ON customer_feedback FOR ALL
  USING (auth.role() = 'service_role');

-- =====================================================
-- PART 5: HELPER FUNCTIONS
-- =====================================================

-- Function to follow a merchant
CREATE OR REPLACE FUNCTION follow_merchant(p_merchant_id UUID, p_source VARCHAR DEFAULT 'qr_scan')
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  -- Get account_id from auth
  SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

  IF v_account_id IS NULL THEN
    RAISE EXCEPTION 'User account not found';
  END IF;

  INSERT INTO merchant_followers (account_id, merchant_id, source)
  VALUES (v_account_id, p_merchant_id, p_source)
  ON CONFLICT (account_id, merchant_id) DO UPDATE SET
    is_active = true,
    unfollowed_at = NULL,
    followed_at = CASE
      WHEN merchant_followers.is_active = false THEN NOW()
      ELSE merchant_followers.followed_at
    END,
    updated_at = NOW();

  -- Also create analytics record if doesn't exist
  INSERT INTO follower_analytics (account_id, merchant_id, first_visit_at)
  VALUES (v_account_id, p_merchant_id, NOW())
  ON CONFLICT (account_id, merchant_id) DO NOTHING;

  RETURN true;
END;
$$;

-- Function to unfollow a merchant
CREATE OR REPLACE FUNCTION unfollow_merchant(p_merchant_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

  UPDATE merchant_followers
  SET is_active = false, unfollowed_at = NOW(), updated_at = NOW()
  WHERE account_id = v_account_id AND merchant_id = p_merchant_id;

  RETURN true;
END;
$$;

-- Function to check if user follows a merchant
CREATE OR REPLACE FUNCTION is_following_merchant(p_merchant_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

  RETURN EXISTS (
    SELECT 1 FROM merchant_followers
    WHERE account_id = v_account_id
    AND merchant_id = p_merchant_id
    AND is_active = true
  );
END;
$$;

-- Function to get user's followed merchants
CREATE OR REPLACE FUNCTION get_followed_merchants()
RETURNS TABLE (
  merchant_id UUID,
  merchant_name VARCHAR,
  merchant_logo TEXT,
  followed_at TIMESTAMPTZ,
  loyalty_points INTEGER,
  total_orders INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

  RETURN QUERY
  SELECT
    m.id,
    m.name,
    m.logo_url,
    mf.followed_at,
    COALESCE(fa.loyalty_points, 0),
    COALESCE(fa.total_orders, 0)
  FROM merchant_followers mf
  JOIN merchants m ON m.id = mf.merchant_id
  LEFT JOIN follower_analytics fa ON fa.account_id = mf.account_id AND fa.merchant_id = mf.merchant_id
  WHERE mf.account_id = v_account_id
  AND mf.is_active = true
  ORDER BY mf.followed_at DESC;
END;
$$;

-- =====================================================
-- PART 6: TRIGGERS
-- =====================================================

-- Update analytics when an order is placed
CREATE OR REPLACE FUNCTION update_follower_analytics_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  -- Only process if order has account_id
  IF NEW.account_id IS NULL THEN
    RETURN NEW;
  END IF;

  v_account_id := NEW.account_id;

  -- Insert or update analytics
  INSERT INTO follower_analytics (account_id, merchant_id, first_visit_at, last_visit_at, total_visits, total_orders, total_spent)
  VALUES (
    v_account_id,
    NEW.merchant_id,
    NOW(),
    NOW(),
    1,
    1,
    COALESCE(NEW.total, 0)
  )
  ON CONFLICT (account_id, merchant_id) DO UPDATE SET
    last_visit_at = NOW(),
    total_visits = follower_analytics.total_visits + 1,
    total_orders = follower_analytics.total_orders + 1,
    total_spent = follower_analytics.total_spent + COALESCE(NEW.total, 0),
    average_order_value = (follower_analytics.total_spent + COALESCE(NEW.total, 0)) / (follower_analytics.total_orders + 1),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

-- Trigger on orders (if orders table exists with account_id)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'account_id'
  ) THEN
    DROP TRIGGER IF EXISTS on_order_update_analytics ON orders;
    CREATE TRIGGER on_order_update_analytics
      AFTER INSERT ON orders
      FOR EACH ROW EXECUTE FUNCTION update_follower_analytics_on_order();
  END IF;
END $$;

-- Update analytics on feedback
CREATE OR REPLACE FUNCTION update_analytics_on_feedback()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.account_id IS NULL THEN
    RETURN NEW;
  END IF;

  UPDATE follower_analytics
  SET
    total_feedback_given = total_feedback_given + 1,
    last_feedback_at = NOW(),
    average_rating = (
      SELECT AVG(rating)::DECIMAL(2,1)
      FROM customer_feedback
      WHERE account_id = NEW.account_id
      AND merchant_id = NEW.merchant_id
      AND rating IS NOT NULL
    ),
    updated_at = NOW()
  WHERE account_id = NEW.account_id AND merchant_id = NEW.merchant_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_feedback_update_analytics ON customer_feedback;
CREATE TRIGGER on_feedback_update_analytics
  AFTER INSERT ON customer_feedback
  FOR EACH ROW EXECUTE FUNCTION update_analytics_on_feedback();

-- Updated_at triggers
CREATE OR REPLACE FUNCTION update_followers_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_merchant_followers_updated_at ON merchant_followers;
CREATE TRIGGER update_merchant_followers_updated_at
  BEFORE UPDATE ON merchant_followers
  FOR EACH ROW EXECUTE FUNCTION update_followers_updated_at();

DROP TRIGGER IF EXISTS update_follower_analytics_updated_at ON follower_analytics;
CREATE TRIGGER update_follower_analytics_updated_at
  BEFORE UPDATE ON follower_analytics
  FOR EACH ROW EXECUTE FUNCTION update_followers_updated_at();

DROP TRIGGER IF EXISTS update_customer_feedback_updated_at ON customer_feedback;
CREATE TRIGGER update_customer_feedback_updated_at
  BEFORE UPDATE ON customer_feedback
  FOR EACH ROW EXECUTE FUNCTION update_followers_updated_at();

-- =====================================================
-- PART 7: COMMENTS
-- =====================================================

COMMENT ON TABLE merchant_followers IS 'Opt-in follow system linking P5 accounts to merchants';
COMMENT ON TABLE follower_analytics IS 'Pre-computed metrics per account-merchant pair for fast dashboard queries';
COMMENT ON TABLE customer_feedback IS 'Ratings, reviews, suggestions and issues from customers';
COMMENT ON COLUMN merchant_followers.account_id IS 'References P5 accounts(id), NOT the old gudbro_user_profiles';
COMMENT ON COLUMN follower_analytics.loyalty_points IS 'Cached from P5 accounts.total_points for this merchant context';

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Tables created:
--   - merchant_followers (opt-in follow system using P5 accounts)
--   - follower_analytics (cached metrics)
--   - customer_feedback (ratings, reviews, suggestions, issues)
--
-- Functions created:
--   - follow_merchant(merchant_id, source)
--   - unfollow_merchant(merchant_id)
--   - is_following_merchant(merchant_id)
--   - get_followed_merchants()
--
-- RLS Policies:
--   - Users manage own follows via P5 accounts.auth_id
--   - Merchants see followers via account_roles (NOT old merchant_users)
--   - Service role has full access
-- =====================================================
