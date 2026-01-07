-- Migration 038: Staff Management System
-- Staff profiles, scheduling, reviews, and performance tracking
-- Created: 2026-01-06

-- ============================================
-- TABLE: location_team_settings
-- Manager controls for team visibility and reviews
-- ============================================
CREATE TABLE IF NOT EXISTS location_team_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Team visibility (Manager decides)
  show_team_on_menu BOOLEAN NOT NULL DEFAULT FALSE,
  team_display_style TEXT NOT NULL DEFAULT 'cards' CHECK (team_display_style IN ('cards', 'list', 'minimal')),

  -- Review settings
  allow_staff_reviews BOOLEAN NOT NULL DEFAULT TRUE,
  review_requires_order BOOLEAN NOT NULL DEFAULT FALSE,  -- Verified purchase
  allow_anonymous_reviews BOOLEAN NOT NULL DEFAULT TRUE,
  min_review_length INTEGER DEFAULT 0,

  -- Recognition settings
  enable_weekly_recognition BOOLEAN NOT NULL DEFAULT TRUE,
  recognition_reward_type TEXT DEFAULT 'badge' CHECK (recognition_reward_type IN ('badge', 'bonus', 'time_off', 'meal', 'custom')),

  -- Scheduling settings (optional - for when we add scheduling)
  enable_scheduling BOOLEAN NOT NULL DEFAULT FALSE,
  min_staff_for_scheduling INTEGER DEFAULT 1,
  break_policy JSONB DEFAULT '{"min_hours_for_break": 6, "break_duration_minutes": 30}',

  -- Manager tooltip info shown
  tooltip_benefits_shown BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(location_id)
);

-- ============================================
-- TABLE: staff_profiles
-- Staff member public profiles
-- ============================================
CREATE TABLE IF NOT EXISTS staff_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Display info
  display_name TEXT NOT NULL,
  photo_url TEXT,
  bio TEXT,

  -- Role info
  job_title TEXT NOT NULL DEFAULT 'Staff',
  specialties TEXT[] DEFAULT '{}',  -- e.g., ['latte_art', 'cocktails', 'sommelier']
  languages TEXT[] DEFAULT '{}',     -- Languages spoken

  -- Employment
  employment_type TEXT NOT NULL DEFAULT 'full_time' CHECK (employment_type IN (
    'owner', 'full_time', 'part_time', 'seasonal', 'contractor'
  )),
  hire_date DATE,

  -- Visibility (Manager controls, staff consents)
  is_public BOOLEAN NOT NULL DEFAULT FALSE,  -- Show on menu/QR
  show_photo BOOLEAN NOT NULL DEFAULT TRUE,
  show_specialties BOOLEAN NOT NULL DEFAULT TRUE,

  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'on_leave', 'terminated')),

  -- Metrics (cached, updated periodically)
  total_reviews INTEGER NOT NULL DEFAULT 0,
  average_rating NUMERIC(3,2) DEFAULT 0,
  positive_review_rate NUMERIC(5,2) DEFAULT 0,  -- % of 4-5 star reviews

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(account_id, location_id)
);

-- ============================================
-- TABLE: staff_reviews
-- Customer feedback on staff members
-- ============================================
CREATE TABLE IF NOT EXISTS staff_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Reviewer (nullable for anonymous)
  reviewer_account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,

  -- Rating
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),

  -- Categories (quick feedback tags)
  categories TEXT[] DEFAULT '{}',  -- e.g., ['friendly', 'fast', 'helpful', 'knowledgeable', 'attentive']

  -- Comment
  comment TEXT,

  -- Source tracking
  source TEXT NOT NULL DEFAULT 'qr_code' CHECK (source IN ('qr_code', 'app', 'order', 'manual', 'kiosk')),
  order_id UUID,  -- Optional link to order for verified reviews

  -- Verification
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,  -- Has valid order

  -- Loyalty points awarded (if not anonymous)
  points_awarded INTEGER DEFAULT 0,

  -- Moderation
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  flagged_at TIMESTAMPTZ,
  flagged_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: staff_performance_metrics
-- Aggregated weekly/monthly metrics for AI reports
-- ============================================
CREATE TABLE IF NOT EXISTS staff_performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Period
  period_type TEXT NOT NULL CHECK (period_type IN ('weekly', 'monthly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Review metrics
  reviews_count INTEGER NOT NULL DEFAULT 0,
  average_rating NUMERIC(3,2) DEFAULT 0,
  positive_rate NUMERIC(5,2) DEFAULT 0,  -- % 4-5 stars

  -- Category breakdown
  category_counts JSONB DEFAULT '{}',  -- {"friendly": 15, "fast": 12, ...}

  -- Scheduling metrics (for future use)
  shifts_scheduled INTEGER DEFAULT 0,
  shifts_completed INTEGER DEFAULT 0,
  punctuality_rate NUMERIC(5,2) DEFAULT 100,  -- % on-time arrivals

  -- Comparative metrics
  rank_in_location INTEGER,  -- 1 = best
  vs_previous_period NUMERIC(5,2),  -- % change in rating

  -- AI insights (generated)
  ai_summary TEXT,
  ai_strengths TEXT[],
  ai_improvements TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(staff_id, period_type, period_start)
);

-- ============================================
-- TABLE: staff_achievements
-- Recognition and awards
-- ============================================
CREATE TABLE IF NOT EXISTS staff_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Achievement type
  achievement_type TEXT NOT NULL CHECK (achievement_type IN (
    'employee_of_week', 'employee_of_month',
    'most_reviews', 'top_rated', 'most_improved',
    'punctuality_star', 'customer_favorite', 'team_player',
    'custom'
  )),

  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Details
  title TEXT NOT NULL,
  description TEXT,
  metric_value NUMERIC,  -- e.g., 4.9 rating, 98% punctuality

  -- Reward
  reward_type TEXT CHECK (reward_type IN ('badge', 'bonus', 'time_off', 'meal', 'custom', NULL)),
  reward_value TEXT,  -- e.g., "$50", "4 hours", "Free lunch"
  reward_claimed BOOLEAN DEFAULT FALSE,
  reward_claimed_at TIMESTAMPTZ,

  -- Awarded by
  awarded_by UUID REFERENCES accounts(id),
  awarded_by_ai BOOLEAN NOT NULL DEFAULT FALSE,  -- AI suggested and auto-awarded

  -- Display
  is_public BOOLEAN NOT NULL DEFAULT TRUE,  -- Show on staff profile

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: manager_evaluations
-- Periodic manager evaluations of staff
-- ============================================
CREATE TABLE IF NOT EXISTS manager_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  evaluator_id UUID NOT NULL REFERENCES accounts(id),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,

  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Scores (1-5)
  score_punctuality INTEGER CHECK (score_punctuality BETWEEN 1 AND 5),
  score_teamwork INTEGER CHECK (score_teamwork BETWEEN 1 AND 5),
  score_customer_service INTEGER CHECK (score_customer_service BETWEEN 1 AND 5),
  score_skills INTEGER CHECK (score_skills BETWEEN 1 AND 5),
  score_initiative INTEGER CHECK (score_initiative BETWEEN 1 AND 5),
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),

  -- Qualitative
  strengths TEXT[],
  areas_to_improve TEXT[],
  goals_next_period TEXT[],
  manager_notes TEXT,

  -- Staff acknowledgment
  acknowledged_at TIMESTAMPTZ,
  staff_comments TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
-- Location settings
CREATE INDEX idx_location_team_settings_location ON location_team_settings(location_id);

-- Staff profiles
CREATE INDEX idx_staff_profiles_location ON staff_profiles(location_id);
CREATE INDEX idx_staff_profiles_account ON staff_profiles(account_id);
CREATE INDEX idx_staff_profiles_public ON staff_profiles(location_id, is_public) WHERE is_public = TRUE;
CREATE INDEX idx_staff_profiles_status ON staff_profiles(location_id, status);

-- Staff reviews
CREATE INDEX idx_staff_reviews_staff ON staff_reviews(staff_id);
CREATE INDEX idx_staff_reviews_location ON staff_reviews(location_id);
CREATE INDEX idx_staff_reviews_reviewer ON staff_reviews(reviewer_account_id) WHERE reviewer_account_id IS NOT NULL;
CREATE INDEX idx_staff_reviews_created ON staff_reviews(staff_id, created_at DESC);
CREATE INDEX idx_staff_reviews_rating ON staff_reviews(staff_id, rating);

-- Performance metrics
CREATE INDEX idx_staff_performance_staff ON staff_performance_metrics(staff_id);
CREATE INDEX idx_staff_performance_period ON staff_performance_metrics(location_id, period_type, period_start DESC);

-- Achievements
CREATE INDEX idx_staff_achievements_staff ON staff_achievements(staff_id);
CREATE INDEX idx_staff_achievements_location ON staff_achievements(location_id, period_start DESC);
CREATE INDEX idx_staff_achievements_type ON staff_achievements(location_id, achievement_type);

-- Manager evaluations
CREATE INDEX idx_manager_evaluations_staff ON manager_evaluations(staff_id);
CREATE INDEX idx_manager_evaluations_period ON manager_evaluations(location_id, period_end DESC);

-- ============================================
-- RLS POLICIES
-- ============================================
ALTER TABLE location_team_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE manager_evaluations ENABLE ROW LEVEL SECURITY;

-- Location team settings: Managers can read/write
CREATE POLICY "team_settings_read" ON location_team_settings
  FOR SELECT USING (
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "team_settings_write" ON location_team_settings
  FOR ALL USING (
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

-- Staff profiles: Public profiles visible to all, own profile editable
CREATE POLICY "staff_profiles_read_public" ON staff_profiles
  FOR SELECT USING (
    is_public = TRUE OR
    account_id = auth.uid() OR
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "staff_profiles_write_own" ON staff_profiles
  FOR ALL USING (
    account_id = auth.uid() OR
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

-- Staff reviews: Anyone can create, staff/managers can read their location's reviews
CREATE POLICY "staff_reviews_read" ON staff_reviews
  FOR SELECT USING (
    reviewer_account_id = auth.uid() OR
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "staff_reviews_create" ON staff_reviews
  FOR INSERT WITH CHECK (TRUE);  -- Anyone can leave a review

CREATE POLICY "staff_reviews_manage" ON staff_reviews
  FOR UPDATE USING (
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

-- Performance metrics: Location team can read
CREATE POLICY "performance_metrics_read" ON staff_performance_metrics
  FOR SELECT USING (
    staff_id IN (SELECT id FROM staff_profiles WHERE account_id = auth.uid()) OR
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "performance_metrics_write" ON staff_performance_metrics
  FOR ALL USING (
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

-- Achievements: Public read, managers write
CREATE POLICY "achievements_read" ON staff_achievements
  FOR SELECT USING (
    is_public = TRUE OR
    staff_id IN (SELECT id FROM staff_profiles WHERE account_id = auth.uid()) OR
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "achievements_write" ON staff_achievements
  FOR ALL USING (
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

-- Manager evaluations: Staff can see own, managers can see all in location
CREATE POLICY "evaluations_read" ON manager_evaluations
  FOR SELECT USING (
    staff_id IN (SELECT id FROM staff_profiles WHERE account_id = auth.uid()) OR
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

CREATE POLICY "evaluations_write" ON manager_evaluations
  FOR ALL USING (
    location_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('business_owner', 'manager')
    )
  );

-- Admin access for all tables
CREATE POLICY "staff_admin_access" ON location_team_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "profiles_admin_access" ON staff_profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "reviews_admin_access" ON staff_reviews
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "metrics_admin_access" ON staff_performance_metrics
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "achievements_admin_access" ON staff_achievements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "evaluations_admin_access" ON manager_evaluations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

-- ============================================
-- TRIGGERS
-- ============================================

-- Update staff profile metrics when review is added
CREATE OR REPLACE FUNCTION update_staff_profile_metrics()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE staff_profiles
  SET
    total_reviews = (SELECT COUNT(*) FROM staff_reviews WHERE staff_id = NEW.staff_id AND is_visible = TRUE),
    average_rating = (SELECT AVG(rating)::NUMERIC(3,2) FROM staff_reviews WHERE staff_id = NEW.staff_id AND is_visible = TRUE),
    positive_review_rate = (
      SELECT (COUNT(*) FILTER (WHERE rating >= 4)::NUMERIC / NULLIF(COUNT(*), 0) * 100)::NUMERIC(5,2)
      FROM staff_reviews WHERE staff_id = NEW.staff_id AND is_visible = TRUE
    ),
    updated_at = NOW()
  WHERE id = NEW.staff_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_staff_metrics
  AFTER INSERT OR UPDATE ON staff_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_staff_profile_metrics();

-- Award loyalty points for non-anonymous reviews
CREATE OR REPLACE FUNCTION award_review_points()
RETURNS TRIGGER AS $$
DECLARE
  points_to_award INTEGER := 10;  -- Base points for leaving a review
BEGIN
  -- Only award points for non-anonymous, verified reviews
  IF NEW.reviewer_account_id IS NOT NULL AND NOT NEW.is_anonymous THEN
    -- Add bonus for verified order
    IF NEW.is_verified THEN
      points_to_award := points_to_award + 5;
    END IF;

    -- Add bonus for writing a comment
    IF NEW.comment IS NOT NULL AND LENGTH(NEW.comment) > 20 THEN
      points_to_award := points_to_award + 5;
    END IF;

    -- Update points awarded
    NEW.points_awarded := points_to_award;

    -- Award to account
    UPDATE accounts
    SET
      consumer_points = consumer_points + points_to_award,
      total_points = total_points + points_to_award
    WHERE id = NEW.reviewer_account_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_review_points
  BEFORE INSERT ON staff_reviews
  FOR EACH ROW
  EXECUTE FUNCTION award_review_points();

-- Update timestamp triggers
CREATE TRIGGER trigger_location_team_settings_updated
  BEFORE UPDATE ON location_team_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_staff_profiles_updated
  BEFORE UPDATE ON staff_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_manager_evaluations_updated
  BEFORE UPDATE ON manager_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTIONS: Performance Report Generation
-- ============================================

-- Generate weekly performance metrics for all staff in a location
CREATE OR REPLACE FUNCTION generate_weekly_performance_metrics(p_location_id UUID)
RETURNS INTEGER AS $$
DECLARE
  staff_record RECORD;
  week_start DATE := date_trunc('week', CURRENT_DATE)::DATE;
  week_end DATE := (date_trunc('week', CURRENT_DATE) + INTERVAL '6 days')::DATE;
  generated_count INTEGER := 0;
BEGIN
  FOR staff_record IN
    SELECT id FROM staff_profiles
    WHERE location_id = p_location_id AND status = 'active'
  LOOP
    INSERT INTO staff_performance_metrics (
      staff_id, location_id, period_type, period_start, period_end,
      reviews_count, average_rating, positive_rate, category_counts
    )
    SELECT
      staff_record.id,
      p_location_id,
      'weekly',
      week_start,
      week_end,
      COUNT(*),
      AVG(rating)::NUMERIC(3,2),
      (COUNT(*) FILTER (WHERE rating >= 4)::NUMERIC / NULLIF(COUNT(*), 0) * 100)::NUMERIC(5,2),
      (
        SELECT jsonb_object_agg(cat, cnt)
        FROM (
          SELECT unnest(categories) as cat, COUNT(*) as cnt
          FROM staff_reviews
          WHERE staff_id = staff_record.id
          AND created_at >= week_start
          AND created_at < week_end + INTERVAL '1 day'
          GROUP BY unnest(categories)
        ) sub
      )
    FROM staff_reviews
    WHERE staff_id = staff_record.id
    AND created_at >= week_start
    AND created_at < week_end + INTERVAL '1 day'
    ON CONFLICT (staff_id, period_type, period_start)
    DO UPDATE SET
      reviews_count = EXCLUDED.reviews_count,
      average_rating = EXCLUDED.average_rating,
      positive_rate = EXCLUDED.positive_rate,
      category_counts = EXCLUDED.category_counts;

    generated_count := generated_count + 1;
  END LOOP;

  -- Update ranks within location
  WITH ranked AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY average_rating DESC NULLS LAST) as rank
    FROM staff_performance_metrics
    WHERE location_id = p_location_id
    AND period_type = 'weekly'
    AND period_start = week_start
  )
  UPDATE staff_performance_metrics spm
  SET rank_in_location = ranked.rank
  FROM ranked
  WHERE spm.id = ranked.id;

  RETURN generated_count;
END;
$$ LANGUAGE plpgsql;

-- Get top performers for a location
CREATE OR REPLACE FUNCTION get_top_performers(
  p_location_id UUID,
  p_period_type TEXT DEFAULT 'weekly',
  p_limit INTEGER DEFAULT 5
)
RETURNS TABLE (
  staff_id UUID,
  display_name TEXT,
  photo_url TEXT,
  job_title TEXT,
  average_rating NUMERIC,
  reviews_count INTEGER,
  rank_in_location INTEGER,
  top_categories TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    sp.id,
    sp.display_name,
    sp.photo_url,
    sp.job_title,
    spm.average_rating,
    spm.reviews_count,
    spm.rank_in_location,
    (
      SELECT ARRAY(
        SELECT key
        FROM jsonb_each_text(spm.category_counts)
        ORDER BY value::INTEGER DESC
        LIMIT 3
      )
    ) as top_categories
  FROM staff_performance_metrics spm
  JOIN staff_profiles sp ON sp.id = spm.staff_id
  WHERE spm.location_id = p_location_id
  AND spm.period_type = p_period_type
  AND spm.period_start = (
    SELECT MAX(period_start)
    FROM staff_performance_metrics
    WHERE location_id = p_location_id AND period_type = p_period_type
  )
  ORDER BY spm.rank_in_location ASC NULLS LAST
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED: Review categories
-- ============================================
COMMENT ON TABLE location_team_settings IS 'Manager controls for team visibility and review settings per location';
COMMENT ON TABLE staff_profiles IS 'Public-facing staff profiles linked to accounts';
COMMENT ON TABLE staff_reviews IS 'Customer feedback on individual staff members';
COMMENT ON TABLE staff_performance_metrics IS 'Aggregated weekly/monthly performance metrics for AI reporting';
COMMENT ON TABLE staff_achievements IS 'Recognition and awards for staff';
COMMENT ON TABLE manager_evaluations IS 'Periodic manager evaluations of staff performance';

-- Standard review categories reference (for UI)
COMMENT ON COLUMN staff_reviews.categories IS 'Standard categories: friendly, fast, helpful, knowledgeable, attentive, professional, patient, welcoming';
