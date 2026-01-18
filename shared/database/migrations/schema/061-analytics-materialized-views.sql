-- =============================================
-- 061-analytics-materialized-views.sql
-- Analytics Materialized Views
-- =============================================
-- Pre-computed aggregates for fast dashboard queries
-- Refreshed every 15 minutes by Trigger.dev job
-- =============================================

-- =============================================
-- 1. DAILY METRICS MATERIALIZED VIEW
-- =============================================

-- Drop existing view if it exists (to allow recreation)
DROP MATERIALIZED VIEW IF EXISTS mv_analytics_daily CASCADE;

CREATE MATERIALIZED VIEW mv_analytics_daily AS
SELECT
    merchant_id,
    event_date,
    COUNT(*) FILTER (WHERE event_name = 'page_view') AS page_views,
    COUNT(DISTINCT session_id) AS sessions,
    COUNT(DISTINCT anonymous_id) AS unique_visitors,
    COUNT(*) FILTER (WHERE event_name = 'item_view') AS item_views,
    COUNT(*) FILTER (WHERE event_name = 'add_to_cart') AS add_to_carts,
    COUNT(*) FILTER (WHERE event_name = 'order_completed') AS orders,
    SUM(
        CASE
            WHEN event_name = 'order_completed'
            THEN (properties->>'total')::NUMERIC
            ELSE 0
        END
    ) AS total_revenue,
    AVG(
        CASE
            WHEN event_name = 'page_view'
            THEN (properties->>'time_on_page')::NUMERIC
            ELSE NULL
        END
    ) AS avg_time_on_page,
    COUNT(*) FILTER (WHERE device_type = 'mobile') AS mobile_events,
    COUNT(*) FILTER (WHERE device_type = 'desktop') AS desktop_events,
    COUNT(*) FILTER (WHERE device_type = 'tablet') AS tablet_events
FROM analytics_events
WHERE merchant_id IS NOT NULL
AND event_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY merchant_id, event_date
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_analytics_daily_pk
    ON mv_analytics_daily (merchant_id, event_date);

-- Additional indexes for common queries
CREATE INDEX idx_mv_analytics_daily_date
    ON mv_analytics_daily (event_date DESC);

CREATE INDEX idx_mv_analytics_daily_merchant
    ON mv_analytics_daily (merchant_id);

COMMENT ON MATERIALIZED VIEW mv_analytics_daily IS 'Pre-computed daily analytics metrics per merchant (refreshed every 15 min)';

-- =============================================
-- 2. TOP ITEMS LAST 30 DAYS
-- =============================================

DROP MATERIALIZED VIEW IF EXISTS mv_top_items_30d CASCADE;

CREATE MATERIALIZED VIEW mv_top_items_30d AS
SELECT
    merchant_id,
    (properties->>'item_id')::TEXT AS item_id,
    (properties->>'item_name')::TEXT AS item_name,
    COUNT(*) FILTER (WHERE event_name = 'item_view') AS view_count,
    COUNT(*) FILTER (WHERE event_name = 'add_to_cart') AS add_to_cart_count,
    COUNT(*) FILTER (WHERE event_name = 'order_completed') AS order_count,
    CASE
        WHEN COUNT(*) FILTER (WHERE event_name = 'item_view') > 0
        THEN ROUND(
            COUNT(*) FILTER (WHERE event_name = 'add_to_cart')::NUMERIC /
            COUNT(*) FILTER (WHERE event_name = 'item_view')::NUMERIC * 100, 2
        )
        ELSE 0
    END AS conversion_rate
FROM analytics_events
WHERE merchant_id IS NOT NULL
AND event_name IN ('item_view', 'add_to_cart', 'order_completed')
AND properties->>'item_id' IS NOT NULL
AND event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY merchant_id, properties->>'item_id', properties->>'item_name'
HAVING COUNT(*) FILTER (WHERE event_name = 'item_view') > 0
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_top_items_pk
    ON mv_top_items_30d (merchant_id, item_id);

-- Index for top items query
CREATE INDEX idx_mv_top_items_views
    ON mv_top_items_30d (merchant_id, view_count DESC);

COMMENT ON MATERIALIZED VIEW mv_top_items_30d IS 'Top performing items by views in last 30 days';

-- =============================================
-- 3. HOURLY TRAFFIC PATTERN
-- =============================================

DROP MATERIALIZED VIEW IF EXISTS mv_hourly_traffic CASCADE;

CREATE MATERIALIZED VIEW mv_hourly_traffic AS
SELECT
    merchant_id,
    EXTRACT(DOW FROM created_at)::INTEGER AS day_of_week, -- 0=Sunday, 6=Saturday
    EXTRACT(HOUR FROM created_at)::INTEGER AS hour_of_day,
    COUNT(*) AS event_count,
    COUNT(DISTINCT session_id) AS unique_sessions,
    COUNT(*) FILTER (WHERE event_name = 'page_view') AS page_views,
    COUNT(*) FILTER (WHERE event_name = 'order_completed') AS orders
FROM analytics_events
WHERE merchant_id IS NOT NULL
AND event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY merchant_id, EXTRACT(DOW FROM created_at), EXTRACT(HOUR FROM created_at)
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_hourly_traffic_pk
    ON mv_hourly_traffic (merchant_id, day_of_week, hour_of_day);

-- Index for time pattern queries
CREATE INDEX idx_mv_hourly_traffic_merchant
    ON mv_hourly_traffic (merchant_id);

COMMENT ON MATERIALIZED VIEW mv_hourly_traffic IS 'Traffic patterns by day of week and hour';

-- =============================================
-- 4. DEVICE BREAKDOWN
-- =============================================

DROP MATERIALIZED VIEW IF EXISTS mv_device_breakdown CASCADE;

CREATE MATERIALIZED VIEW mv_device_breakdown AS
SELECT
    merchant_id,
    COALESCE(device_type, 'unknown') AS device_type,
    COALESCE(browser, 'unknown') AS browser,
    COALESCE(os, 'unknown') AS os,
    COUNT(*) AS event_count,
    COUNT(DISTINCT session_id) AS unique_sessions,
    ROUND(
        COUNT(*)::NUMERIC /
        SUM(COUNT(*)) OVER (PARTITION BY merchant_id) * 100, 2
    ) AS percentage
FROM analytics_events
WHERE merchant_id IS NOT NULL
AND event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY merchant_id, device_type, browser, os
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_device_breakdown_pk
    ON mv_device_breakdown (merchant_id, device_type, browser, os);

-- Index for device queries
CREATE INDEX idx_mv_device_breakdown_merchant
    ON mv_device_breakdown (merchant_id);

COMMENT ON MATERIALIZED VIEW mv_device_breakdown IS 'Device, browser and OS breakdown for last 30 days';

-- =============================================
-- 5. REFRESH FUNCTIONS
-- =============================================

-- Function to refresh a single view concurrently
CREATE OR REPLACE FUNCTION refresh_materialized_view_concurrently(
    view_name TEXT
) RETURNS VOID AS $$
BEGIN
    EXECUTE format('REFRESH MATERIALIZED VIEW CONCURRENTLY %I', view_name);
EXCEPTION
    WHEN OTHERS THEN
        -- If concurrent refresh fails, try regular refresh
        EXECUTE format('REFRESH MATERIALIZED VIEW %I', view_name);
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function to refresh a single view (non-concurrent)
CREATE OR REPLACE FUNCTION refresh_materialized_view(
    view_name TEXT
) RETURNS VOID AS $$
BEGIN
    EXECUTE format('REFRESH MATERIALIZED VIEW %I', view_name);
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function to refresh all analytics views
CREATE OR REPLACE FUNCTION refresh_all_analytics_views()
RETURNS TABLE (
    view_name TEXT,
    refreshed BOOLEAN,
    duration_ms NUMERIC
) AS $$
DECLARE
    v_start TIMESTAMP;
    v_views TEXT[] := ARRAY['mv_analytics_daily', 'mv_top_items_30d', 'mv_hourly_traffic', 'mv_device_breakdown'];
    v_view TEXT;
BEGIN
    FOREACH v_view IN ARRAY v_views
    LOOP
        v_start := clock_timestamp();
        BEGIN
            PERFORM refresh_materialized_view_concurrently(v_view);
            view_name := v_view;
            refreshed := TRUE;
            duration_ms := EXTRACT(MILLISECONDS FROM (clock_timestamp() - v_start));
        EXCEPTION WHEN OTHERS THEN
            view_name := v_view;
            refreshed := FALSE;
            duration_ms := EXTRACT(MILLISECONDS FROM (clock_timestamp() - v_start));
        END;
        RETURN NEXT;
    END LOOP;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Helper function to check if view exists
CREATE OR REPLACE FUNCTION check_view_exists(
    view_name TEXT
) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM pg_matviews
        WHERE schemaname = 'public'
        AND matviewname = view_name
    );
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- =============================================
-- 6. ANALYTICS DAILY AGGREGATES TABLE
-- =============================================

-- For Trigger.dev background job to store computed aggregates
CREATE TABLE IF NOT EXISTS analytics_daily_aggregates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL,
    event_date DATE NOT NULL,
    page_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    sessions INTEGER DEFAULT 0,
    item_views INTEGER DEFAULT 0,
    add_to_carts INTEGER DEFAULT 0,
    orders INTEGER DEFAULT 0,
    total_order_value NUMERIC(12,2) DEFAULT 0,
    conversion_rate NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_merchant_date UNIQUE (merchant_id, event_date)
);

CREATE INDEX idx_analytics_daily_agg_merchant
    ON analytics_daily_aggregates (merchant_id, event_date DESC);

COMMENT ON TABLE analytics_daily_aggregates IS 'Pre-computed daily analytics by Trigger.dev job';

-- RLS for aggregates table
ALTER TABLE analytics_daily_aggregates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_analytics_aggregates"
    ON analytics_daily_aggregates FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "merchants_read_own_aggregates"
    ON analytics_daily_aggregates FOR SELECT
    USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'merchant'
            AND role_type IN ('owner', 'manager')
        )
    );

-- =============================================
-- 7. COMMENTS
-- =============================================

COMMENT ON FUNCTION refresh_materialized_view_concurrently IS 'Refreshes a materialized view with concurrent option (non-blocking)';
COMMENT ON FUNCTION refresh_materialized_view IS 'Refreshes a materialized view (blocking)';
COMMENT ON FUNCTION refresh_all_analytics_views IS 'Refreshes all analytics materialized views and returns status';
COMMENT ON FUNCTION check_view_exists IS 'Checks if a materialized view exists';
