-- ===========================================
-- TOURIST LIFECYCLE MANAGEMENT
-- ===========================================
-- Created: 2026-01-04
-- Purpose: Resident vs Tourist segmentation with smart notification pause
-- Feature: GB-TOURIST-LIFECYCLE (GudBro Exclusive)
-- Depends on: 024-merchant-followers-feedback.sql (uses P5 accounts)
-- ===========================================

-- ===========================================
-- PART 1: ADD COLUMNS TO MERCHANT_FOLLOWERS
-- ===========================================

-- Visitor type: resident stays forever, tourist visits temporarily
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS visitor_type TEXT DEFAULT 'unknown'
CHECK (visitor_type IN ('resident', 'tourist', 'unknown'));

-- Trip end date for tourists
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS trip_end_date DATE;

-- What happens after trip ends
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS post_trip_preference TEXT DEFAULT 'pause'
CHECK (post_trip_preference IN ('pause', 'occasional', 'stop'));

-- Notification pause until date (auto-set from trip_end_date)
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS notification_paused_until DATE;

-- Status: active, paused (trip ended), stopped (opted out), archived (2+ years inactive)
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS notification_status TEXT DEFAULT 'active'
CHECK (notification_status IN ('active', 'paused', 'stopped', 'archived'));

-- Archive tracking
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;

ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS archive_reason TEXT;

-- Visit counter (increments each time tourist returns)
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS visit_count INTEGER DEFAULT 1;

-- Home location for tourists (city, country)
ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS home_city TEXT;

ALTER TABLE merchant_followers
ADD COLUMN IF NOT EXISTS home_country TEXT;

-- ===========================================
-- PART 2: INDEXES FOR QUERIES
-- ===========================================

-- Fast lookup for active/contactable followers
CREATE INDEX IF NOT EXISTS idx_followers_notification_status
ON merchant_followers(merchant_id, notification_status)
WHERE notification_status = 'active';

-- Filter by visitor type
CREATE INDEX IF NOT EXISTS idx_followers_visitor_type
ON merchant_followers(merchant_id, visitor_type);

-- Find tourists whose trip just ended (for pausing notifications)
CREATE INDEX IF NOT EXISTS idx_followers_trip_end
ON merchant_followers(trip_end_date)
WHERE visitor_type = 'tourist' AND trip_end_date IS NOT NULL;

-- Find returning tourists (visit_count > 1)
CREATE INDEX IF NOT EXISTS idx_followers_returning
ON merchant_followers(merchant_id, visit_count)
WHERE visit_count > 1;

-- ===========================================
-- PART 3: HELPER FUNCTIONS
-- ===========================================

-- Set visitor type after registration
CREATE OR REPLACE FUNCTION set_visitor_type(
  p_merchant_id UUID,
  p_visitor_type TEXT,
  p_trip_end_date DATE DEFAULT NULL,
  p_post_trip_preference TEXT DEFAULT 'pause',
  p_home_city TEXT DEFAULT NULL,
  p_home_country TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
BEGIN
  -- Get account_id from auth (P5 system)
  SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

  IF v_account_id IS NULL THEN
    RAISE EXCEPTION 'User account not found';
  END IF;

  UPDATE merchant_followers
  SET
    visitor_type = p_visitor_type,
    trip_end_date = p_trip_end_date,
    post_trip_preference = COALESCE(p_post_trip_preference, 'pause'),
    home_city = p_home_city,
    home_country = p_home_country,
    -- If resident, always active; if tourist, active until trip ends
    notification_status = CASE
      WHEN p_visitor_type = 'resident' THEN 'active'
      WHEN p_visitor_type = 'tourist' AND p_trip_end_date > CURRENT_DATE THEN 'active'
      ELSE 'paused'
    END,
    updated_at = NOW()
  WHERE account_id = v_account_id
    AND merchant_id = p_merchant_id;

  RETURN FOUND;
END;
$$;

-- Handle tourist return (welcome back flow)
CREATE OR REPLACE FUNCTION handle_tourist_return(
  p_merchant_id UUID,
  p_new_trip_end_date DATE
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_account_id UUID;
  v_follower RECORD;
  v_result JSONB;
BEGIN
  -- Get account_id from auth (P5 system)
  SELECT id INTO v_account_id FROM accounts WHERE auth_id = auth.uid();

  IF v_account_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'User account not found');
  END IF;

  -- Get current follower info
  SELECT * INTO v_follower
  FROM merchant_followers
  WHERE account_id = v_account_id
    AND merchant_id = p_merchant_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Not a follower');
  END IF;

  -- Update follower record
  UPDATE merchant_followers
  SET
    trip_end_date = p_new_trip_end_date,
    notification_status = 'active',
    notification_paused_until = NULL,
    archived_at = NULL,
    archive_reason = NULL,
    visit_count = visit_count + 1,
    followed_at = NOW(), -- Update to track this visit start
    updated_at = NOW()
  WHERE account_id = v_account_id
    AND merchant_id = p_merchant_id;

  -- Return welcome back info
  RETURN jsonb_build_object(
    'success', true,
    'welcome_back', true,
    'previous_visits', v_follower.visit_count,
    'was_archived', v_follower.notification_status = 'archived'
  );
END;
$$;

-- Check if follower can receive notifications
CREATE OR REPLACE FUNCTION can_receive_notifications(
  p_account_id UUID,
  p_merchant_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_status TEXT;
  v_paused_until DATE;
BEGIN
  SELECT notification_status, notification_paused_until
  INTO v_status, v_paused_until
  FROM merchant_followers
  WHERE account_id = p_account_id
    AND merchant_id = p_merchant_id
    AND is_active = true;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Active = can receive
  IF v_status = 'active' THEN
    RETURN true;
  END IF;

  -- Paused/Stopped/Archived = cannot receive
  RETURN false;
END;
$$;

-- Get contactable followers for a merchant (for campaigns)
CREATE OR REPLACE FUNCTION get_contactable_followers(
  p_merchant_id UUID,
  p_visitor_type TEXT DEFAULT NULL -- NULL = all types
)
RETURNS TABLE (
  account_id UUID,
  email TEXT,
  display_name TEXT,
  visitor_type TEXT,
  loyalty_points INTEGER,
  visit_count INTEGER
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    mf.account_id,
    a.email,
    COALESCE(a.display_name, a.first_name, 'Guest'),
    mf.visitor_type,
    COALESCE(fa.loyalty_points, 0),
    mf.visit_count
  FROM merchant_followers mf
  JOIN accounts a ON a.id = mf.account_id  -- Using P5 accounts
  LEFT JOIN follower_analytics fa ON fa.account_id = mf.account_id AND fa.merchant_id = mf.merchant_id
  WHERE mf.merchant_id = p_merchant_id
    AND mf.is_active = true
    AND mf.notification_status = 'active'
    AND (p_visitor_type IS NULL OR mf.visitor_type = p_visitor_type);
END;
$$;

-- ===========================================
-- PART 4: AUTOMATED JOBS (to be called by cron)
-- ===========================================

-- Pause notifications for tourists whose trip ended
CREATE OR REPLACE FUNCTION pause_ended_trips()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE merchant_followers
  SET
    notification_status = CASE
      WHEN post_trip_preference = 'stop' THEN 'stopped'
      ELSE 'paused'
    END,
    notification_paused_until = CASE
      WHEN post_trip_preference = 'occasional' THEN trip_end_date + INTERVAL '1 year'
      ELSE NULL
    END,
    updated_at = NOW()
  WHERE visitor_type = 'tourist'
    AND notification_status = 'active'
    AND trip_end_date IS NOT NULL
    AND trip_end_date < CURRENT_DATE;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- Archive inactive tourists (2+ years)
CREATE OR REPLACE FUNCTION archive_inactive_tourists()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE merchant_followers mf
  SET
    notification_status = 'archived',
    archived_at = NOW(),
    archive_reason = 'inactive_2y',
    updated_at = NOW()
  FROM follower_analytics fa
  WHERE mf.account_id = fa.account_id
    AND mf.merchant_id = fa.merchant_id
    AND mf.visitor_type = 'tourist'
    AND mf.notification_status IN ('paused', 'stopped')
    AND fa.last_visit_at < NOW() - INTERVAL '2 years';

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- ===========================================
-- PART 5: ANALYTICS FUNCTIONS
-- ===========================================

-- Summary stats for merchant dashboard
CREATE OR REPLACE FUNCTION get_follower_stats(p_merchant_id UUID)
RETURNS TABLE (
  total_followers BIGINT,
  active_followers BIGINT,
  residents BIGINT,
  active_tourists BIGINT,
  paused_tourists BIGINT,
  archived_tourists BIGINT,
  returning_tourists BIGINT,
  avg_tourist_visits NUMERIC
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*) AS total_followers,
    COUNT(*) FILTER (WHERE notification_status = 'active') AS active_followers,
    COUNT(*) FILTER (WHERE visitor_type = 'resident') AS residents,
    COUNT(*) FILTER (WHERE visitor_type = 'tourist' AND notification_status = 'active') AS active_tourists,
    COUNT(*) FILTER (WHERE visitor_type = 'tourist' AND notification_status = 'paused') AS paused_tourists,
    COUNT(*) FILTER (WHERE visitor_type = 'tourist' AND notification_status = 'archived') AS archived_tourists,
    COUNT(*) FILTER (WHERE visitor_type = 'tourist' AND visit_count > 1) AS returning_tourists,
    ROUND(AVG(visit_count) FILTER (WHERE visitor_type = 'tourist'), 1) AS avg_tourist_visits
  FROM merchant_followers
  WHERE merchant_id = p_merchant_id
    AND is_active = true;
END;
$$;

-- Get tourists grouped by home country (for insights)
CREATE OR REPLACE FUNCTION get_tourist_origins(p_merchant_id UUID)
RETURNS TABLE (
  home_country TEXT,
  tourist_count BIGINT,
  avg_visits NUMERIC
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    mf.home_country,
    COUNT(*) AS tourist_count,
    ROUND(AVG(mf.visit_count), 1) AS avg_visits
  FROM merchant_followers mf
  WHERE mf.merchant_id = p_merchant_id
    AND mf.visitor_type = 'tourist'
    AND mf.home_country IS NOT NULL
    AND mf.is_active = true
  GROUP BY mf.home_country
  ORDER BY tourist_count DESC;
END;
$$;

-- ===========================================
-- PART 6: COMMENTS
-- ===========================================

COMMENT ON COLUMN merchant_followers.visitor_type IS 'resident = local customer, tourist = temporary visitor';
COMMENT ON COLUMN merchant_followers.trip_end_date IS 'When tourist vacation ends (for auto-pausing notifications)';
COMMENT ON COLUMN merchant_followers.post_trip_preference IS 'What to do after trip: pause (reactivate on return), occasional (1x/year), stop (no contact)';
COMMENT ON COLUMN merchant_followers.notification_status IS 'active = can contact, paused = trip ended, stopped = opted out, archived = 2+ years inactive';
COMMENT ON COLUMN merchant_followers.visit_count IS 'Number of times tourist has visited (increments on each return)';
COMMENT ON FUNCTION pause_ended_trips IS 'Cron job: Run daily to pause notifications for tourists whose trip ended';
COMMENT ON FUNCTION archive_inactive_tourists IS 'Cron job: Run monthly to archive tourists inactive for 2+ years';

-- ===========================================
-- MIGRATION COMPLETE
-- ===========================================
-- New columns on merchant_followers:
--   - visitor_type (resident/tourist/unknown)
--   - trip_end_date
--   - post_trip_preference (pause/occasional/stop)
--   - notification_paused_until
--   - notification_status (active/paused/stopped/archived)
--   - archived_at, archive_reason
--   - visit_count
--   - home_city, home_country
--
-- New functions:
--   - set_visitor_type() - after registration modal
--   - handle_tourist_return() - welcome back flow
--   - can_receive_notifications() - check before sending
--   - get_contactable_followers() - for campaigns (uses P5 accounts)
--   - pause_ended_trips() - daily cron
--   - archive_inactive_tourists() - monthly cron
--   - get_follower_stats() - dashboard analytics
--   - get_tourist_origins() - country breakdown
--
-- Integration:
--   - All functions use P5 accounts system (NOT gudbro_user_profiles)
--   - JOINs on accounts table for email/name
-- ===========================================
