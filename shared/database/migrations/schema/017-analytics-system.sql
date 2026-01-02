-- Migration: 017-analytics-system.sql
-- Purpose: Analytics events for self-improvement cycle
-- Created: 2025-12-07

-- ============================================
-- ANALYTICS EVENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Context
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

  -- User identification (anonymous)
  session_id TEXT NOT NULL,
  device_id TEXT,

  -- Event data
  event_type TEXT NOT NULL,
  event_category TEXT NOT NULL DEFAULT 'interaction',
  event_data JSONB DEFAULT '{}',

  -- Context data
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,

  -- Geo/locale
  country_code TEXT,
  language_code TEXT,
  currency_code TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Indexes will be created below
  CONSTRAINT valid_event_category CHECK (
    event_category IN ('page_view', 'interaction', 'conversion', 'engagement', 'error', 'performance')
  )
);

-- ============================================
-- ANALYTICS AGGREGATES TABLE (for reports)
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_daily_aggregates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Context
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

  -- Time bucket
  date DATE NOT NULL,

  -- Metrics
  total_sessions INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,

  -- Engagement
  menu_views INTEGER DEFAULT 0,
  item_clicks INTEGER DEFAULT 0,
  add_to_cart INTEGER DEFAULT 0,
  orders_placed INTEGER DEFAULT 0,

  -- Revenue
  total_revenue DECIMAL(10,2) DEFAULT 0,
  average_order_value DECIMAL(10,2) DEFAULT 0,

  -- Performance
  avg_session_duration_seconds INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,

  -- Top items (JSONB array)
  top_viewed_items JSONB DEFAULT '[]',
  top_ordered_items JSONB DEFAULT '[]',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint for daily aggregation
  UNIQUE (merchant_id, brand_id, location_id, date)
);

-- ============================================
-- IMPROVEMENT SUGGESTIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS improvement_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Context
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,

  -- Suggestion details
  suggestion_type TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  title TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Impact estimation
  estimated_impact TEXT,
  affected_metric TEXT,

  -- Evidence (data that led to this suggestion)
  evidence JSONB DEFAULT '{}',

  -- Status
  status TEXT NOT NULL DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  implemented_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'rejected', 'implemented', 'dismissed'))
);

-- ============================================
-- INDEXES
-- ============================================

-- Events: Fast lookup by merchant and time
CREATE INDEX IF NOT EXISTS idx_analytics_events_merchant_time
  ON analytics_events (merchant_id, created_at DESC);

-- Events: Fast lookup by session
CREATE INDEX IF NOT EXISTS idx_analytics_events_session
  ON analytics_events (session_id, created_at DESC);

-- Events: Fast lookup by event type
CREATE INDEX IF NOT EXISTS idx_analytics_events_type
  ON analytics_events (event_type, created_at DESC);

-- Events: JSONB index for event_data queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_data
  ON analytics_events USING GIN (event_data);

-- Aggregates: Fast lookup by merchant and date
CREATE INDEX IF NOT EXISTS idx_analytics_aggregates_merchant_date
  ON analytics_daily_aggregates (merchant_id, date DESC);

-- Suggestions: Fast lookup by merchant and status
CREATE INDEX IF NOT EXISTS idx_suggestions_merchant_status
  ON improvement_suggestions (merchant_id, status, created_at DESC);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily_aggregates ENABLE ROW LEVEL SECURITY;
ALTER TABLE improvement_suggestions ENABLE ROW LEVEL SECURITY;

-- Analytics events: Public insert (anonymous tracking), authenticated read
CREATE POLICY "analytics_events_insert" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "analytics_events_select" ON analytics_events
  FOR SELECT USING (true);

-- Aggregates: Authenticated read only
CREATE POLICY "analytics_aggregates_select" ON analytics_daily_aggregates
  FOR SELECT USING (true);

-- Suggestions: Authenticated CRUD
CREATE POLICY "suggestions_all" ON improvement_suggestions
  FOR ALL USING (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Track an analytics event
CREATE OR REPLACE FUNCTION track_event(
  p_merchant_id UUID,
  p_session_id TEXT,
  p_event_type TEXT,
  p_event_category TEXT DEFAULT 'interaction',
  p_event_data JSONB DEFAULT '{}',
  p_page_url TEXT DEFAULT NULL,
  p_device_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO analytics_events (
    merchant_id,
    session_id,
    device_id,
    event_type,
    event_category,
    event_data,
    page_url
  ) VALUES (
    p_merchant_id,
    p_session_id,
    p_device_id,
    p_event_type,
    p_event_category,
    p_event_data,
    p_page_url
  )
  RETURNING id INTO v_event_id;

  RETURN v_event_id;
END;
$$;

-- Get daily metrics for a merchant
CREATE OR REPLACE FUNCTION get_daily_metrics(
  p_merchant_id UUID,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_sessions BIGINT,
  unique_visitors BIGINT,
  page_views BIGINT,
  menu_views BIGINT,
  item_clicks BIGINT,
  add_to_cart BIGINT,
  orders_placed BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT session_id)::BIGINT as total_sessions,
    COUNT(DISTINCT device_id)::BIGINT as unique_visitors,
    COUNT(*) FILTER (WHERE event_type = 'page_view')::BIGINT as page_views,
    COUNT(*) FILTER (WHERE event_type = 'menu_view')::BIGINT as menu_views,
    COUNT(*) FILTER (WHERE event_type = 'item_click')::BIGINT as item_clicks,
    COUNT(*) FILTER (WHERE event_type = 'add_to_cart')::BIGINT as add_to_cart,
    COUNT(*) FILTER (WHERE event_type = 'order_placed')::BIGINT as orders_placed
  FROM analytics_events
  WHERE merchant_id = p_merchant_id
    AND created_at::DATE = p_date;
END;
$$;

-- Get top items for a merchant
CREATE OR REPLACE FUNCTION get_top_items(
  p_merchant_id UUID,
  p_event_type TEXT DEFAULT 'item_click',
  p_limit INTEGER DEFAULT 10,
  p_days INTEGER DEFAULT 7
)
RETURNS TABLE (
  item_id TEXT,
  item_name TEXT,
  event_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    event_data->>'item_id' as item_id,
    event_data->>'item_name' as item_name,
    COUNT(*)::BIGINT as event_count
  FROM analytics_events
  WHERE merchant_id = p_merchant_id
    AND event_type = p_event_type
    AND created_at >= NOW() - (p_days || ' days')::INTERVAL
    AND event_data->>'item_id' IS NOT NULL
  GROUP BY event_data->>'item_id', event_data->>'item_name'
  ORDER BY event_count DESC
  LIMIT p_limit;
END;
$$;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE analytics_events IS 'Raw analytics events from PWA and Backoffice';
COMMENT ON TABLE analytics_daily_aggregates IS 'Pre-computed daily metrics for fast dashboard loading';
COMMENT ON TABLE improvement_suggestions IS 'AI-generated improvement suggestions based on analytics';
COMMENT ON FUNCTION track_event IS 'Track an analytics event with automatic timestamp';
COMMENT ON FUNCTION get_daily_metrics IS 'Get aggregated metrics for a specific date';
COMMENT ON FUNCTION get_top_items IS 'Get top items by event type for a time period';
