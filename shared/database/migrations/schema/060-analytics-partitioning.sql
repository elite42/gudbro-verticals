-- =============================================
-- 060-analytics-partitioning.sql
-- Analytics Events Monthly Partitioning
-- =============================================
-- Implements table partitioning for analytics_events to improve
-- query performance at scale (10K+ users)
-- =============================================

-- =============================================
-- 1. CREATE PARTITIONED TABLE
-- =============================================

-- First, check if partitioned table already exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'analytics_events_partitioned'
    ) THEN
        -- Create new partitioned table with same structure
        CREATE TABLE analytics_events_partitioned (
            id UUID NOT NULL DEFAULT gen_random_uuid(),
            event_date DATE NOT NULL,
            event_name TEXT NOT NULL,
            event_category TEXT,
            merchant_id UUID,
            location_id UUID,
            anonymous_id TEXT,
            session_id TEXT,
            user_id UUID,
            page_path TEXT,
            page_title TEXT,
            referrer TEXT,
            utm_source TEXT,
            utm_medium TEXT,
            utm_campaign TEXT,
            device_type TEXT,
            browser TEXT,
            os TEXT,
            country TEXT,
            city TEXT,
            properties JSONB DEFAULT '{}',
            created_at TIMESTAMPTZ DEFAULT NOW(),
            -- Composite primary key required for partitioning
            PRIMARY KEY (id, event_date)
        ) PARTITION BY RANGE (event_date);

        -- Add comment
        COMMENT ON TABLE analytics_events_partitioned IS 'Partitioned analytics events table for high-volume event tracking';
    END IF;
END $$;

-- =============================================
-- 2. CREATE MONTHLY PARTITIONS FOR 2026
-- =============================================

-- Function to create partition if not exists
CREATE OR REPLACE FUNCTION create_analytics_partition(
    p_year INTEGER,
    p_month INTEGER
) RETURNS VOID AS $$
DECLARE
    partition_name TEXT;
    start_date DATE;
    end_date DATE;
BEGIN
    partition_name := 'analytics_events_y' || p_year || 'm' || LPAD(p_month::TEXT, 2, '0');
    start_date := make_date(p_year, p_month, 1);
    end_date := (start_date + INTERVAL '1 month')::DATE;

    -- Check if partition exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = partition_name
    ) THEN
        EXECUTE format(
            'CREATE TABLE %I PARTITION OF analytics_events_partitioned
             FOR VALUES FROM (%L) TO (%L)',
            partition_name, start_date, end_date
        );

        RAISE NOTICE 'Created partition: %', partition_name;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create partitions for 2026
SELECT create_analytics_partition(2026, 1);
SELECT create_analytics_partition(2026, 2);
SELECT create_analytics_partition(2026, 3);
SELECT create_analytics_partition(2026, 4);
SELECT create_analytics_partition(2026, 5);
SELECT create_analytics_partition(2026, 6);
SELECT create_analytics_partition(2026, 7);
SELECT create_analytics_partition(2026, 8);
SELECT create_analytics_partition(2026, 9);
SELECT create_analytics_partition(2026, 10);
SELECT create_analytics_partition(2026, 11);
SELECT create_analytics_partition(2026, 12);

-- Also create partitions for 2027 (future-proofing)
SELECT create_analytics_partition(2027, 1);
SELECT create_analytics_partition(2027, 2);
SELECT create_analytics_partition(2027, 3);

-- =============================================
-- 3. CREATE AUTO-PARTITION FUNCTION
-- =============================================

-- Function to automatically create future partitions
CREATE OR REPLACE FUNCTION auto_create_analytics_partition()
RETURNS TRIGGER AS $$
DECLARE
    partition_name TEXT;
    start_date DATE;
    end_date DATE;
    event_year INTEGER;
    event_month INTEGER;
BEGIN
    event_year := EXTRACT(YEAR FROM NEW.event_date);
    event_month := EXTRACT(MONTH FROM NEW.event_date);
    partition_name := 'analytics_events_y' || event_year || 'm' || LPAD(event_month::TEXT, 2, '0');

    -- Check if partition exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = partition_name
    ) THEN
        start_date := make_date(event_year, event_month, 1);
        end_date := (start_date + INTERVAL '1 month')::DATE;

        EXECUTE format(
            'CREATE TABLE %I PARTITION OF analytics_events_partitioned
             FOR VALUES FROM (%L) TO (%L)',
            partition_name, start_date, end_date
        );

        RAISE NOTICE 'Auto-created partition: %', partition_name;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- =============================================
-- 4. CREATE INDEXES ON PARTITIONED TABLE
-- =============================================

-- These indexes will be automatically created on each partition
CREATE INDEX IF NOT EXISTS idx_analytics_part_merchant_date
    ON analytics_events_partitioned (merchant_id, event_date DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_part_event_name
    ON analytics_events_partitioned (event_name, event_date DESC);

CREATE INDEX IF NOT EXISTS idx_analytics_part_session
    ON analytics_events_partitioned (session_id)
    WHERE session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_analytics_part_anonymous
    ON analytics_events_partitioned (anonymous_id)
    WHERE anonymous_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_analytics_part_created
    ON analytics_events_partitioned (created_at DESC);

-- =============================================
-- 5. RLS POLICIES
-- =============================================

ALTER TABLE analytics_events_partitioned ENABLE ROW LEVEL SECURITY;

-- Service role has full access
CREATE POLICY "service_role_analytics_partitioned"
    ON analytics_events_partitioned FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Merchants can read their own analytics
CREATE POLICY "merchants_read_own_analytics"
    ON analytics_events_partitioned FOR SELECT
    USING (
        merchant_id IN (
            SELECT tenant_id FROM account_roles
            WHERE account_id = auth.uid()
            AND tenant_type = 'merchant'
            AND role_type IN ('owner', 'manager')
        )
    );

-- =============================================
-- 6. VIEW TO UNIFY ACCESS
-- =============================================

-- Create a view that allows transparent access
-- When feature flag USE_PARTITIONED_ANALYTICS=true, queries go to partitioned table
CREATE OR REPLACE VIEW analytics_events_unified AS
SELECT
    id,
    event_date,
    event_name,
    event_category,
    merchant_id,
    location_id,
    anonymous_id,
    session_id,
    user_id,
    page_path,
    page_title,
    referrer,
    utm_source,
    utm_medium,
    utm_campaign,
    device_type,
    browser,
    os,
    country,
    city,
    properties,
    created_at
FROM analytics_events_partitioned;

COMMENT ON VIEW analytics_events_unified IS 'Unified view for analytics events - use this for queries';

-- =============================================
-- 7. DATA MIGRATION HELPER
-- =============================================

-- Function to migrate data from original table to partitioned table
-- Run this during low-traffic window
CREATE OR REPLACE FUNCTION migrate_analytics_to_partitioned(
    p_batch_size INTEGER DEFAULT 10000,
    p_start_date DATE DEFAULT NULL,
    p_end_date DATE DEFAULT NULL
) RETURNS TABLE (
    migrated_count BIGINT,
    batch_count INTEGER,
    duration_seconds NUMERIC
) AS $$
DECLARE
    v_start_time TIMESTAMP;
    v_migrated BIGINT := 0;
    v_batch INTEGER := 0;
    v_offset BIGINT := 0;
    v_count INTEGER;
BEGIN
    v_start_time := clock_timestamp();

    -- Set date range defaults
    p_start_date := COALESCE(p_start_date, '2020-01-01'::DATE);
    p_end_date := COALESCE(p_end_date, CURRENT_DATE);

    LOOP
        -- Insert batch
        WITH batch AS (
            SELECT *
            FROM analytics_events
            WHERE event_date >= p_start_date
            AND event_date <= p_end_date
            ORDER BY event_date, id
            LIMIT p_batch_size
            OFFSET v_offset
        )
        INSERT INTO analytics_events_partitioned (
            id, event_date, event_name, event_category, merchant_id, location_id,
            anonymous_id, session_id, user_id, page_path, page_title, referrer,
            utm_source, utm_medium, utm_campaign, device_type, browser, os,
            country, city, properties, created_at
        )
        SELECT
            id, event_date, event_name, event_category, merchant_id, location_id,
            anonymous_id, session_id, user_id, page_path, page_title, referrer,
            utm_source, utm_medium, utm_campaign, device_type, browser, os,
            country, city, properties, created_at
        FROM batch
        ON CONFLICT (id, event_date) DO NOTHING;

        GET DIAGNOSTICS v_count = ROW_COUNT;

        EXIT WHEN v_count = 0;

        v_migrated := v_migrated + v_count;
        v_batch := v_batch + 1;
        v_offset := v_offset + p_batch_size;

        -- Yield to allow other transactions
        PERFORM pg_sleep(0.1);
    END LOOP;

    RETURN QUERY SELECT
        v_migrated,
        v_batch,
        EXTRACT(EPOCH FROM (clock_timestamp() - v_start_time))::NUMERIC;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- =============================================
-- 8. MAINTENANCE FUNCTIONS
-- =============================================

-- Function to get partition statistics
CREATE OR REPLACE FUNCTION get_analytics_partition_stats()
RETURNS TABLE (
    partition_name TEXT,
    row_count BIGINT,
    size_bytes BIGINT,
    size_pretty TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        c.relname::TEXT,
        c.reltuples::BIGINT,
        pg_total_relation_size(c.oid),
        pg_size_pretty(pg_total_relation_size(c.oid))
    FROM pg_class c
    JOIN pg_inherits i ON c.oid = i.inhrelid
    JOIN pg_class p ON i.inhparent = p.oid
    WHERE p.relname = 'analytics_events_partitioned'
    ORDER BY c.relname;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- Function to drop old partitions (for retention policy)
CREATE OR REPLACE FUNCTION drop_old_analytics_partitions(
    p_months_to_keep INTEGER DEFAULT 12
) RETURNS INTEGER AS $$
DECLARE
    v_dropped INTEGER := 0;
    v_partition RECORD;
    v_cutoff_date DATE;
BEGIN
    v_cutoff_date := (CURRENT_DATE - (p_months_to_keep || ' months')::INTERVAL)::DATE;

    FOR v_partition IN
        SELECT c.relname
        FROM pg_class c
        JOIN pg_inherits i ON c.oid = i.inhrelid
        JOIN pg_class p ON i.inhparent = p.oid
        WHERE p.relname = 'analytics_events_partitioned'
        AND c.relname ~ '^analytics_events_y\d{4}m\d{2}$'
    LOOP
        -- Extract date from partition name
        IF make_date(
            SUBSTRING(v_partition.relname FROM 'y(\d{4})')::INTEGER,
            SUBSTRING(v_partition.relname FROM 'm(\d{2})')::INTEGER,
            1
        ) < v_cutoff_date THEN
            EXECUTE format('DROP TABLE IF EXISTS %I', v_partition.relname);
            v_dropped := v_dropped + 1;
            RAISE NOTICE 'Dropped partition: %', v_partition.relname;
        END IF;
    END LOOP;

    RETURN v_dropped;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

-- =============================================
-- 9. COMMENTS
-- =============================================

COMMENT ON FUNCTION create_analytics_partition IS 'Creates a monthly partition for analytics_events_partitioned';
COMMENT ON FUNCTION auto_create_analytics_partition IS 'Trigger function to auto-create partitions on demand';
COMMENT ON FUNCTION migrate_analytics_to_partitioned IS 'Migrates data from analytics_events to partitioned table';
COMMENT ON FUNCTION get_analytics_partition_stats IS 'Returns statistics for all analytics partitions';
COMMENT ON FUNCTION drop_old_analytics_partitions IS 'Drops partitions older than specified months';
