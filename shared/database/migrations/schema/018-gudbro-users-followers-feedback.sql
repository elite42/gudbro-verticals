-- =====================================================
-- Migration 018: GudBro Users, Followers & Feedback System
-- Date: 2025-12-12
-- Description: Platform-wide user accounts with merchant follower system
-- =====================================================

-- =====================================================
-- PART 1: GUDBRO USER PROFILES
-- =====================================================
-- Extends Supabase auth.users with platform-specific profile data
-- Users register once on GudBro, can follow multiple merchants

CREATE TABLE IF NOT EXISTS gudbro_user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Basic Info
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  avatar_url TEXT,

  -- Dietary Preferences (synced from PWA)
  allergens_to_avoid TEXT[] DEFAULT '{}',
  intolerances TEXT[] DEFAULT '{}',
  dietary_preferences TEXT[] DEFAULT '{}',

  -- Platform Settings
  preferred_language VARCHAR(5) DEFAULT 'en',
  preferred_currency VARCHAR(3) DEFAULT 'VND',

  -- Marketing
  accepts_marketing BOOLEAN DEFAULT false,
  marketing_consent_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_gudbro_users_email ON gudbro_user_profiles(email);

-- =====================================================
-- PART 2: MERCHANT FOLLOWERS (Opt-in System)
-- =====================================================
-- Users explicitly follow merchants to access loyalty/promos
-- Merchants only see their followers, not all GudBro users

CREATE TABLE IF NOT EXISTS merchant_followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relationships
  user_id UUID NOT NULL REFERENCES gudbro_user_profiles(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Follow State
  is_active BOOLEAN NOT NULL DEFAULT true,  -- false = unfollowed
  followed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unfollowed_at TIMESTAMPTZ,  -- when they unfollowed (if is_active = false)

  -- How they discovered the merchant
  source VARCHAR(50) DEFAULT 'qr_scan',  -- qr_scan, search, referral, promo
  referral_code VARCHAR(50),  -- if referred by another user

  -- Unique constraint: one follow record per user-merchant pair
  CONSTRAINT unique_user_merchant_follow UNIQUE (user_id, merchant_id)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_followers_merchant ON merchant_followers(merchant_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_followers_user ON merchant_followers(user_id) WHERE is_active = true;

-- =====================================================
-- PART 3: FOLLOWER ANALYTICS (Cached Metrics)
-- =====================================================
-- Pre-computed analytics per follower for fast backoffice queries
-- Updated via triggers or scheduled jobs

CREATE TABLE IF NOT EXISTS follower_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References
  user_id UUID NOT NULL REFERENCES gudbro_user_profiles(id) ON DELETE CASCADE,
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

  -- Loyalty
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
  CONSTRAINT unique_follower_analytics UNIQUE (user_id, merchant_id)
);

-- Index for backoffice queries
CREATE INDEX IF NOT EXISTS idx_analytics_merchant ON follower_analytics(merchant_id);
CREATE INDEX IF NOT EXISTS idx_analytics_last_visit ON follower_analytics(merchant_id, last_visit_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_top_spenders ON follower_analytics(merchant_id, total_spent DESC);

-- =====================================================
-- PART 4: CUSTOMER FEEDBACK SYSTEM
-- =====================================================
-- Ratings, reviews, suggestions, and issue reports

CREATE TABLE IF NOT EXISTS customer_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who
  user_id UUID REFERENCES gudbro_user_profiles(id) ON DELETE SET NULL,  -- nullable for guest feedback
  session_id VARCHAR(255),  -- for guest feedback tracking
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- What (context)
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,  -- nullable for general feedback

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
  replied_by UUID REFERENCES merchant_users(id),
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
CREATE INDEX IF NOT EXISTS idx_feedback_user ON customer_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON customer_feedback(merchant_id, status) WHERE status IN ('new', 'in_progress');
CREATE INDEX IF NOT EXISTS idx_feedback_type ON customer_feedback(merchant_id, type);
CREATE INDEX IF NOT EXISTS idx_feedback_public ON customer_feedback(merchant_id) WHERE is_public = true;

-- =====================================================
-- PART 5: ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE gudbro_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE follower_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_feedback ENABLE ROW LEVEL SECURITY;

-- GudBro User Profiles: Users can see/edit their own profile
CREATE POLICY "Users can view own profile"
  ON gudbro_user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON gudbro_user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON gudbro_user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Merchant Followers: Users manage their own follows
CREATE POLICY "Users can view own follows"
  ON merchant_followers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can follow merchants"
  ON merchant_followers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unfollow merchants"
  ON merchant_followers FOR UPDATE
  USING (auth.uid() = user_id);

-- Merchant staff can see their followers
CREATE POLICY "Merchants can view their followers"
  ON merchant_followers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM merchant_users mu
      WHERE mu.user_id = auth.uid()
      AND mu.merchant_id = merchant_followers.merchant_id
    )
  );

-- Follower Analytics: Merchants can view analytics for their followers
CREATE POLICY "Merchants can view follower analytics"
  ON follower_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM merchant_users mu
      WHERE mu.user_id = auth.uid()
      AND mu.merchant_id = follower_analytics.merchant_id
    )
  );

-- Customer Feedback: Users can submit and view their own feedback
CREATE POLICY "Users can view own feedback"
  ON customer_feedback FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can submit feedback"
  ON customer_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can edit own feedback"
  ON customer_feedback FOR UPDATE
  USING (auth.uid() = user_id AND status = 'new');

-- Merchants can view and respond to feedback
CREATE POLICY "Merchants can view feedback"
  ON customer_feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM merchant_users mu
      WHERE mu.user_id = auth.uid()
      AND mu.merchant_id = customer_feedback.merchant_id
    )
  );

CREATE POLICY "Merchants can respond to feedback"
  ON customer_feedback FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM merchant_users mu
      WHERE mu.user_id = auth.uid()
      AND mu.merchant_id = customer_feedback.merchant_id
    )
  );

-- =====================================================
-- PART 6: FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION handle_new_gudbro_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.gudbro_user_profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name')
  );
  RETURN NEW;
END;
$$;

-- Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_gudbro_user();

-- Function to update follower analytics after order
CREATE OR REPLACE FUNCTION update_follower_analytics_on_order()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Only process if order has a user_id
  IF NEW.user_id IS NULL THEN
    RETURN NEW;
  END IF;

  v_user_id := NEW.user_id;

  -- Insert or update analytics
  INSERT INTO follower_analytics (user_id, merchant_id, first_visit_at, last_visit_at, total_visits, total_orders, total_spent)
  VALUES (
    v_user_id,
    NEW.merchant_id,
    NOW(),
    NOW(),
    1,
    1,
    COALESCE(NEW.total, 0)
  )
  ON CONFLICT (user_id, merchant_id) DO UPDATE SET
    last_visit_at = NOW(),
    total_visits = follower_analytics.total_visits + 1,
    total_orders = follower_analytics.total_orders + 1,
    total_spent = follower_analytics.total_spent + COALESCE(NEW.total, 0),
    average_order_value = (follower_analytics.total_spent + COALESCE(NEW.total, 0)) / (follower_analytics.total_orders + 1),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

-- Trigger on orders (if orders table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    DROP TRIGGER IF EXISTS on_order_update_analytics ON orders;
    CREATE TRIGGER on_order_update_analytics
      AFTER INSERT ON orders
      FOR EACH ROW EXECUTE FUNCTION update_follower_analytics_on_order();
  END IF;
END $$;

-- Function to update analytics on feedback
CREATE OR REPLACE FUNCTION update_analytics_on_feedback()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only process if feedback has a user_id
  IF NEW.user_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Update feedback count and average rating
  UPDATE follower_analytics
  SET
    total_feedback_given = total_feedback_given + 1,
    last_feedback_at = NOW(),
    average_rating = (
      SELECT AVG(rating)::DECIMAL(2,1)
      FROM customer_feedback
      WHERE user_id = NEW.user_id
      AND merchant_id = NEW.merchant_id
      AND rating IS NOT NULL
    ),
    updated_at = NOW()
  WHERE user_id = NEW.user_id AND merchant_id = NEW.merchant_id;

  RETURN NEW;
END;
$$;

-- Trigger on customer_feedback
DROP TRIGGER IF EXISTS on_feedback_update_analytics ON customer_feedback;
CREATE TRIGGER on_feedback_update_analytics
  AFTER INSERT ON customer_feedback
  FOR EACH ROW EXECUTE FUNCTION update_analytics_on_feedback();

-- =====================================================
-- PART 7: HELPER FUNCTIONS FOR API
-- =====================================================

-- Function to follow a merchant
CREATE OR REPLACE FUNCTION follow_merchant(p_merchant_id UUID, p_source VARCHAR DEFAULT 'qr_scan')
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO merchant_followers (user_id, merchant_id, source)
  VALUES (auth.uid(), p_merchant_id, p_source)
  ON CONFLICT (user_id, merchant_id) DO UPDATE SET
    is_active = true,
    unfollowed_at = NULL,
    followed_at = CASE
      WHEN merchant_followers.is_active = false THEN NOW()
      ELSE merchant_followers.followed_at
    END;

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
BEGIN
  UPDATE merchant_followers
  SET is_active = false, unfollowed_at = NOW()
  WHERE user_id = auth.uid() AND merchant_id = p_merchant_id;

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
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM merchant_followers
    WHERE user_id = auth.uid()
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
BEGIN
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
  LEFT JOIN follower_analytics fa ON fa.user_id = mf.user_id AND fa.merchant_id = mf.merchant_id
  WHERE mf.user_id = auth.uid()
  AND mf.is_active = true
  ORDER BY mf.followed_at DESC;
END;
$$;

-- =====================================================
-- PART 8: UPDATED_AT TRIGGERS
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_gudbro_user_profiles_updated_at ON gudbro_user_profiles;
CREATE TRIGGER update_gudbro_user_profiles_updated_at
  BEFORE UPDATE ON gudbro_user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_follower_analytics_updated_at ON follower_analytics;
CREATE TRIGGER update_follower_analytics_updated_at
  BEFORE UPDATE ON follower_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customer_feedback_updated_at ON customer_feedback;
CREATE TRIGGER update_customer_feedback_updated_at
  BEFORE UPDATE ON customer_feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Tables created:
--   - gudbro_user_profiles (extends auth.users)
--   - merchant_followers (opt-in follow system)
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
--   - Users manage own profile and follows
--   - Merchants see only their followers
--   - Merchants can respond to feedback
-- =====================================================
