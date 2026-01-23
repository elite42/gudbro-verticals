-- =============================================
-- 075-order-timing-materialized-views.sql
-- Prep Time Analytics Materialized Views
-- =============================================
-- Phase 2: Analytics Foundation
-- - Materialized view for prep time summary
-- - Functions for view refresh
-- =============================================

-- =============================================
-- 1. PREP TIME SUMMARY MATERIALIZED VIEW
-- =============================================

-- Drop if exists (allows recreation)
DROP MATERIALIZED VIEW IF EXISTS mv_prep_time_summary CASCADE;

CREATE MATERIALIZED VIEW mv_prep_time_summary AS
SELECT
  merchant_id,
  station,
  DATE(changed_at) AS prep_date,

  -- Counts
  COUNT(*) AS items_completed,

  -- Timing metrics (in seconds)
  ROUND(AVG(duration_from_previous_seconds)::NUMERIC, 1) AS avg_prep_seconds,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS median_prep_seconds,
  PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS p90_prep_seconds,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS p95_prep_seconds,
  MIN(duration_from_previous_seconds) AS min_prep_seconds,
  MAX(duration_from_previous_seconds) AS max_prep_seconds,

  -- For trend analysis
  COUNT(*) FILTER (WHERE duration_from_previous_seconds > 600) AS items_over_10min,
  COUNT(*) FILTER (WHERE duration_from_previous_seconds > 900) AS items_over_15min

FROM order_item_status_history
WHERE from_status = 'preparing'
  AND to_status = 'ready'
  AND duration_from_previous_seconds IS NOT NULL
  AND duration_from_previous_seconds > 0
  AND duration_from_previous_seconds < 7200 -- Filter outliers > 2 hours
  AND changed_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY merchant_id, station, DATE(changed_at)
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_prep_time_summary_pk
  ON mv_prep_time_summary (merchant_id, COALESCE(station, 'unknown'), prep_date);

-- Additional indexes for common queries
CREATE INDEX idx_mv_prep_time_summary_date
  ON mv_prep_time_summary (prep_date DESC);

CREATE INDEX idx_mv_prep_time_summary_merchant
  ON mv_prep_time_summary (merchant_id);

CREATE INDEX idx_mv_prep_time_summary_station
  ON mv_prep_time_summary (station)
  WHERE station IS NOT NULL;

COMMENT ON MATERIALIZED VIEW mv_prep_time_summary IS 'Daily prep time statistics by merchant and station (refreshed every 15 min)';

-- =============================================
-- 2. HOURLY PREP TIME PATTERN VIEW
-- =============================================

DROP MATERIALIZED VIEW IF EXISTS mv_prep_time_hourly CASCADE;

CREATE MATERIALIZED VIEW mv_prep_time_hourly AS
SELECT
  merchant_id,
  station,
  EXTRACT(DOW FROM changed_at)::INTEGER AS day_of_week, -- 0=Sunday, 6=Saturday
  EXTRACT(HOUR FROM changed_at)::INTEGER AS hour_of_day,

  -- Counts
  COUNT(*) AS items_completed,

  -- Timing
  ROUND(AVG(duration_from_previous_seconds)::NUMERIC, 1) AS avg_prep_seconds,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS median_prep_seconds

FROM order_item_status_history
WHERE from_status = 'preparing'
  AND to_status = 'ready'
  AND duration_from_previous_seconds IS NOT NULL
  AND duration_from_previous_seconds > 0
  AND duration_from_previous_seconds < 7200
  AND changed_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY
  merchant_id,
  station,
  EXTRACT(DOW FROM changed_at),
  EXTRACT(HOUR FROM changed_at)
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_prep_time_hourly_pk
  ON mv_prep_time_hourly (merchant_id, COALESCE(station, 'unknown'), day_of_week, hour_of_day);

CREATE INDEX idx_mv_prep_time_hourly_merchant
  ON mv_prep_time_hourly (merchant_id);

COMMENT ON MATERIALIZED VIEW mv_prep_time_hourly IS 'Prep time patterns by day of week and hour';

-- =============================================
-- 3. TOP ITEMS BY PREP TIME VIEW
-- =============================================

DROP MATERIALIZED VIEW IF EXISTS mv_item_prep_time_30d CASCADE;

CREATE MATERIALIZED VIEW mv_item_prep_time_30d AS
SELECT
  merchant_id,
  station,
  item_name,
  menu_item_id,

  -- Counts
  COUNT(*) AS times_prepared,

  -- Timing
  ROUND(AVG(duration_from_previous_seconds)::NUMERIC, 1) AS avg_prep_seconds,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS median_prep_seconds,
  MIN(duration_from_previous_seconds) AS min_prep_seconds,
  MAX(duration_from_previous_seconds) AS max_prep_seconds

FROM order_item_status_history
WHERE from_status = 'preparing'
  AND to_status = 'ready'
  AND duration_from_previous_seconds IS NOT NULL
  AND duration_from_previous_seconds > 0
  AND duration_from_previous_seconds < 7200
  AND changed_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY merchant_id, station, item_name, menu_item_id
HAVING COUNT(*) >= 3 -- Only items with enough data
WITH DATA;

-- Unique index for concurrent refresh
CREATE UNIQUE INDEX idx_mv_item_prep_time_pk
  ON mv_item_prep_time_30d (merchant_id, COALESCE(station, 'unknown'), COALESCE(menu_item_id, '00000000-0000-0000-0000-000000000000'::UUID));

-- Index for slow items query
CREATE INDEX idx_mv_item_prep_time_avg
  ON mv_item_prep_time_30d (merchant_id, avg_prep_seconds DESC);

COMMENT ON MATERIALIZED VIEW mv_item_prep_time_30d IS 'Per-item prep time statistics for last 30 days';

-- =============================================
-- 4. UPDATE REFRESH FUNCTION TO INCLUDE NEW VIEWS
-- =============================================

-- Update the existing function to include new views
CREATE OR REPLACE FUNCTION refresh_all_analytics_views()
RETURNS TABLE (
    view_name TEXT,
    refreshed BOOLEAN,
    duration_ms NUMERIC
) AS $$
DECLARE
    v_start TIMESTAMP;
    v_views TEXT[] := ARRAY[
      'mv_analytics_daily',
      'mv_top_items_30d',
      'mv_hourly_traffic',
      'mv_device_breakdown',
      'mv_prep_time_summary',
      'mv_prep_time_hourly',
      'mv_item_prep_time_30d'
    ];
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

-- =============================================
-- 5. CONVENIENCE FUNCTION: Get prep time stats
-- =============================================

CREATE OR REPLACE FUNCTION get_prep_time_stats(
  p_merchant_id UUID,
  p_days INTEGER DEFAULT 7,
  p_station VARCHAR(20) DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'period_days', p_days,
    'station', p_station,
    'total_items', SUM(items_completed),
    'avg_prep_seconds', ROUND(AVG(avg_prep_seconds)::NUMERIC, 1),
    'median_prep_seconds', ROUND(AVG(median_prep_seconds)::NUMERIC, 1),
    'p90_prep_seconds', ROUND(AVG(p90_prep_seconds)::NUMERIC, 1),
    'items_over_10min', SUM(items_over_10min),
    'items_over_15min', SUM(items_over_15min),
    'daily_breakdown', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'date', prep_date,
          'items', items_completed,
          'avg_seconds', avg_prep_seconds
        )
        ORDER BY prep_date DESC
      )
      FROM mv_prep_time_summary
      WHERE merchant_id = p_merchant_id
        AND prep_date >= CURRENT_DATE - (p_days || ' days')::INTERVAL
        AND (p_station IS NULL OR station = p_station)
    )
  )
  INTO v_result
  FROM mv_prep_time_summary
  WHERE merchant_id = p_merchant_id
    AND prep_date >= CURRENT_DATE - (p_days || ' days')::INTERVAL
    AND (p_station IS NULL OR station = p_station);

  RETURN COALESCE(v_result, '{}'::JSONB);
END;
$$;

COMMENT ON FUNCTION get_prep_time_stats IS 'Get aggregated prep time statistics for a merchant';

-- =============================================
-- 6. VERIFICATION
-- =============================================

-- Check materialized views created
SELECT matviewname, ispopulated
FROM pg_matviews
WHERE schemaname = 'public'
AND matviewname LIKE 'mv_prep_time%' OR matviewname = 'mv_item_prep_time_30d';
