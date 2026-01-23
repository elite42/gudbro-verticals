-- =============================================
-- 076-order-timing-aggregates.sql
-- Order Timing Daily Aggregates Table
-- =============================================
-- Phase 2: Analytics Foundation
-- - Pre-computed daily aggregates for historical queries
-- - Populated by Trigger.dev job daily
-- =============================================

-- =============================================
-- 1. ORDER TIMING DAILY AGGREGATES TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS order_timing_daily_aggregates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL,
  aggregate_date DATE NOT NULL,
  station VARCHAR(20), -- NULL for overall merchant stats

  -- Order counts
  total_orders INTEGER DEFAULT 0,
  orders_completed INTEGER DEFAULT 0,
  orders_cancelled INTEGER DEFAULT 0,

  -- Item counts
  total_items INTEGER DEFAULT 0,
  items_completed INTEGER DEFAULT 0,

  -- Prep time metrics (in seconds)
  avg_prep_time_seconds NUMERIC(10,2),
  median_prep_time_seconds NUMERIC(10,2),
  p90_prep_time_seconds NUMERIC(10,2),
  p95_prep_time_seconds NUMERIC(10,2),
  min_prep_time_seconds INTEGER,
  max_prep_time_seconds INTEGER,

  -- Order-level timing (from submitted to ready)
  avg_order_ready_time_seconds NUMERIC(10,2),
  median_order_ready_time_seconds NUMERIC(10,2),

  -- Peak hour analysis
  busiest_hour INTEGER, -- 0-23
  busiest_hour_item_count INTEGER,
  slowest_hour INTEGER, -- Hour with longest avg prep time
  slowest_hour_avg_seconds NUMERIC(10,2),

  -- Performance indicators
  items_under_5min INTEGER DEFAULT 0,
  items_5_to_10min INTEGER DEFAULT 0,
  items_10_to_15min INTEGER DEFAULT 0,
  items_over_15min INTEGER DEFAULT 0,

  -- Comparison to previous day
  prep_time_change_pct NUMERIC(5,2), -- % change from previous day

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint
  CONSTRAINT unique_merchant_date_station UNIQUE (merchant_id, aggregate_date, COALESCE(station, 'all'))
);

-- =============================================
-- 2. INDEXES
-- =============================================

CREATE INDEX idx_timing_aggregates_merchant_date
  ON order_timing_daily_aggregates (merchant_id, aggregate_date DESC);

CREATE INDEX idx_timing_aggregates_date
  ON order_timing_daily_aggregates (aggregate_date DESC);

CREATE INDEX idx_timing_aggregates_station
  ON order_timing_daily_aggregates (merchant_id, station)
  WHERE station IS NOT NULL;

COMMENT ON TABLE order_timing_daily_aggregates IS 'Pre-computed daily order timing metrics by Trigger.dev job';

-- =============================================
-- 3. RLS POLICIES
-- =============================================

ALTER TABLE order_timing_daily_aggregates ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "service_role_timing_aggregates"
  ON order_timing_daily_aggregates FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Merchants can read their own data
CREATE POLICY "merchants_read_own_timing_aggregates"
  ON order_timing_daily_aggregates FOR SELECT
  USING (
    merchant_id IN (
      SELECT tenant_id FROM account_roles
      WHERE account_id = auth.uid()
      AND tenant_type = 'merchant'
      AND role_type IN ('owner', 'manager')
    )
  );

-- =============================================
-- 4. FUNCTION: Compute daily aggregates
-- =============================================

CREATE OR REPLACE FUNCTION compute_order_timing_daily_aggregate(
  p_merchant_id UUID,
  p_date DATE,
  p_station VARCHAR(20) DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_result RECORD;
  v_previous_avg NUMERIC;
  v_busiest_hour INTEGER;
  v_busiest_hour_count INTEGER;
  v_slowest_hour INTEGER;
  v_slowest_hour_avg NUMERIC;
BEGIN
  -- Get main metrics
  SELECT
    COUNT(DISTINCT oish.order_id) AS total_orders,
    COUNT(*) AS items_completed,
    ROUND(AVG(duration_from_previous_seconds)::NUMERIC, 2) AS avg_prep_time,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS median_prep_time,
    PERCENTILE_CONT(0.9) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS p90_prep_time,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_from_previous_seconds) AS p95_prep_time,
    MIN(duration_from_previous_seconds) AS min_prep_time,
    MAX(duration_from_previous_seconds) AS max_prep_time,
    COUNT(*) FILTER (WHERE duration_from_previous_seconds < 300) AS under_5min,
    COUNT(*) FILTER (WHERE duration_from_previous_seconds >= 300 AND duration_from_previous_seconds < 600) AS _5_to_10min,
    COUNT(*) FILTER (WHERE duration_from_previous_seconds >= 600 AND duration_from_previous_seconds < 900) AS _10_to_15min,
    COUNT(*) FILTER (WHERE duration_from_previous_seconds >= 900) AS over_15min
  INTO v_result
  FROM order_item_status_history oish
  WHERE oish.merchant_id = p_merchant_id
    AND DATE(oish.changed_at) = p_date
    AND oish.from_status = 'preparing'
    AND oish.to_status = 'ready'
    AND oish.duration_from_previous_seconds IS NOT NULL
    AND oish.duration_from_previous_seconds > 0
    AND oish.duration_from_previous_seconds < 7200
    AND (p_station IS NULL OR oish.station = p_station);

  -- Get previous day's avg for comparison
  SELECT avg_prep_time_seconds INTO v_previous_avg
  FROM order_timing_daily_aggregates
  WHERE merchant_id = p_merchant_id
    AND aggregate_date = p_date - INTERVAL '1 day'
    AND (p_station IS NULL AND station IS NULL OR station = p_station);

  -- Find busiest hour
  SELECT
    EXTRACT(HOUR FROM changed_at)::INTEGER,
    COUNT(*)
  INTO v_busiest_hour, v_busiest_hour_count
  FROM order_item_status_history
  WHERE merchant_id = p_merchant_id
    AND DATE(changed_at) = p_date
    AND from_status = 'preparing'
    AND to_status = 'ready'
    AND (p_station IS NULL OR station = p_station)
  GROUP BY EXTRACT(HOUR FROM changed_at)
  ORDER BY COUNT(*) DESC
  LIMIT 1;

  -- Find slowest hour
  SELECT
    EXTRACT(HOUR FROM changed_at)::INTEGER,
    ROUND(AVG(duration_from_previous_seconds)::NUMERIC, 2)
  INTO v_slowest_hour, v_slowest_hour_avg
  FROM order_item_status_history
  WHERE merchant_id = p_merchant_id
    AND DATE(changed_at) = p_date
    AND from_status = 'preparing'
    AND to_status = 'ready'
    AND duration_from_previous_seconds IS NOT NULL
    AND (p_station IS NULL OR station = p_station)
  GROUP BY EXTRACT(HOUR FROM changed_at)
  HAVING COUNT(*) >= 3 -- Need at least 3 items for meaningful average
  ORDER BY AVG(duration_from_previous_seconds) DESC
  LIMIT 1;

  -- Upsert the aggregate
  INSERT INTO order_timing_daily_aggregates (
    merchant_id,
    aggregate_date,
    station,
    total_orders,
    items_completed,
    avg_prep_time_seconds,
    median_prep_time_seconds,
    p90_prep_time_seconds,
    p95_prep_time_seconds,
    min_prep_time_seconds,
    max_prep_time_seconds,
    busiest_hour,
    busiest_hour_item_count,
    slowest_hour,
    slowest_hour_avg_seconds,
    items_under_5min,
    items_5_to_10min,
    items_10_to_15min,
    items_over_15min,
    prep_time_change_pct,
    updated_at
  ) VALUES (
    p_merchant_id,
    p_date,
    p_station,
    v_result.total_orders,
    v_result.items_completed,
    v_result.avg_prep_time,
    v_result.median_prep_time,
    v_result.p90_prep_time,
    v_result.p95_prep_time,
    v_result.min_prep_time,
    v_result.max_prep_time,
    v_busiest_hour,
    v_busiest_hour_count,
    v_slowest_hour,
    v_slowest_hour_avg,
    v_result.under_5min,
    v_result._5_to_10min,
    v_result._10_to_15min,
    v_result.over_15min,
    CASE
      WHEN v_previous_avg IS NOT NULL AND v_previous_avg > 0
      THEN ROUND(((v_result.avg_prep_time - v_previous_avg) / v_previous_avg * 100)::NUMERIC, 2)
      ELSE NULL
    END,
    NOW()
  )
  ON CONFLICT (merchant_id, aggregate_date, COALESCE(station, 'all'))
  DO UPDATE SET
    total_orders = EXCLUDED.total_orders,
    items_completed = EXCLUDED.items_completed,
    avg_prep_time_seconds = EXCLUDED.avg_prep_time_seconds,
    median_prep_time_seconds = EXCLUDED.median_prep_time_seconds,
    p90_prep_time_seconds = EXCLUDED.p90_prep_time_seconds,
    p95_prep_time_seconds = EXCLUDED.p95_prep_time_seconds,
    min_prep_time_seconds = EXCLUDED.min_prep_time_seconds,
    max_prep_time_seconds = EXCLUDED.max_prep_time_seconds,
    busiest_hour = EXCLUDED.busiest_hour,
    busiest_hour_item_count = EXCLUDED.busiest_hour_item_count,
    slowest_hour = EXCLUDED.slowest_hour,
    slowest_hour_avg_seconds = EXCLUDED.slowest_hour_avg_seconds,
    items_under_5min = EXCLUDED.items_under_5min,
    items_5_to_10min = EXCLUDED.items_5_to_10min,
    items_10_to_15min = EXCLUDED.items_10_to_15min,
    items_over_15min = EXCLUDED.items_over_15min,
    prep_time_change_pct = EXCLUDED.prep_time_change_pct,
    updated_at = NOW();

  RETURN jsonb_build_object(
    'merchant_id', p_merchant_id,
    'date', p_date,
    'station', p_station,
    'items_completed', v_result.items_completed,
    'avg_prep_time_seconds', v_result.avg_prep_time
  );
END;
$$;

COMMENT ON FUNCTION compute_order_timing_daily_aggregate IS 'Computes and stores daily timing aggregate for a merchant';

-- =============================================
-- 5. FUNCTION: Compute all merchants for a date
-- =============================================

CREATE OR REPLACE FUNCTION compute_all_timing_aggregates_for_date(p_date DATE)
RETURNS TABLE (
  merchant_id UUID,
  station TEXT,
  items_completed BIGINT
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_merchant RECORD;
  v_station RECORD;
BEGIN
  -- Get all merchants with data for this date
  FOR v_merchant IN
    SELECT DISTINCT oish.merchant_id
    FROM order_item_status_history oish
    WHERE DATE(oish.changed_at) = p_date
    AND oish.from_status = 'preparing'
    AND oish.to_status = 'ready'
  LOOP
    -- Compute overall aggregate for merchant (no station filter)
    PERFORM compute_order_timing_daily_aggregate(v_merchant.merchant_id, p_date, NULL);
    merchant_id := v_merchant.merchant_id;
    station := 'all';
    items_completed := (SELECT COUNT(*) FROM order_item_status_history WHERE order_item_status_history.merchant_id = v_merchant.merchant_id AND DATE(changed_at) = p_date AND from_status = 'preparing' AND to_status = 'ready');
    RETURN NEXT;

    -- Compute per-station aggregates
    FOR v_station IN
      SELECT DISTINCT oish.station
      FROM order_item_status_history oish
      WHERE oish.merchant_id = v_merchant.merchant_id
      AND DATE(oish.changed_at) = p_date
      AND oish.station IS NOT NULL
      AND oish.from_status = 'preparing'
      AND oish.to_status = 'ready'
    LOOP
      PERFORM compute_order_timing_daily_aggregate(v_merchant.merchant_id, p_date, v_station.station);
      merchant_id := v_merchant.merchant_id;
      station := v_station.station;
      items_completed := (SELECT COUNT(*) FROM order_item_status_history WHERE order_item_status_history.merchant_id = v_merchant.merchant_id AND DATE(changed_at) = p_date AND order_item_status_history.station = v_station.station AND from_status = 'preparing' AND to_status = 'ready');
      RETURN NEXT;
    END LOOP;
  END LOOP;
END;
$$;

COMMENT ON FUNCTION compute_all_timing_aggregates_for_date IS 'Computes timing aggregates for all merchants for a specific date';

-- =============================================
-- 6. VERIFICATION
-- =============================================

-- Verify table created
SELECT EXISTS (
  SELECT FROM information_schema.tables
  WHERE table_name = 'order_timing_daily_aggregates'
);

-- Verify RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'order_timing_daily_aggregates';
