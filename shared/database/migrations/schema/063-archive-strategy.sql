-- Migration: 063-archive-strategy.sql
-- Purpose: Create archive tables and functions for old data management
-- Phase: 3 (10K → 100K users)
-- Created: 2026-01-18

-- ============================================================================
-- ARCHIVE STRATEGY
--
-- Creates archive tables for data older than retention thresholds:
-- - analytics_events: > 1 year
-- - orders: > 6 months (completed/cancelled only)
-- - customer_messages: > 6 months
--
-- Benefits:
-- - Smaller primary tables = faster queries
-- - Lower storage costs (archive can use cheaper storage)
-- - Maintains data for compliance while improving performance
-- ============================================================================

-- ============================================================================
-- COLD STORAGE SCHEMA
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS cold_storage;

COMMENT ON SCHEMA cold_storage IS
'Schema for archived/cold data. Data older than retention thresholds.';

-- ============================================================================
-- ANALYTICS EVENTS ARCHIVE
-- ============================================================================

CREATE TABLE IF NOT EXISTS cold_storage.analytics_events_archive (
  id UUID NOT NULL,
  merchant_id UUID NOT NULL,
  session_id TEXT,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  user_id UUID,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country_code TEXT,
  city TEXT,
  referrer TEXT,
  page_url TEXT,
  shard_id INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL,
  archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

COMMENT ON TABLE cold_storage.analytics_events_archive IS
'Archived analytics events older than 1 year. Partitioned by month for easy management.';

-- Create yearly partitions for archive (past years)
CREATE TABLE IF NOT EXISTS cold_storage.analytics_events_archive_2024
PARTITION OF cold_storage.analytics_events_archive
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE IF NOT EXISTS cold_storage.analytics_events_archive_2025
PARTITION OF cold_storage.analytics_events_archive
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Index for archive queries
CREATE INDEX IF NOT EXISTS idx_analytics_archive_merchant_created
ON cold_storage.analytics_events_archive (merchant_id, created_at DESC);

-- ============================================================================
-- ORDERS ARCHIVE
-- ============================================================================

CREATE TABLE IF NOT EXISTS cold_storage.orders_archive (
  id UUID NOT NULL,
  merchant_id UUID NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  status TEXT NOT NULL,
  total_amount DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR',
  items JSONB DEFAULT '[]',
  notes TEXT,
  table_number TEXT,
  order_type TEXT,
  payment_method TEXT,
  payment_status TEXT,
  shard_id INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

COMMENT ON TABLE cold_storage.orders_archive IS
'Archived orders older than 6 months (completed/cancelled status only).';

-- Indexes for order archive queries
CREATE INDEX IF NOT EXISTS idx_orders_archive_merchant_created
ON cold_storage.orders_archive (merchant_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_archive_status
ON cold_storage.orders_archive (status);

-- ============================================================================
-- CUSTOMER MESSAGES ARCHIVE
-- ============================================================================

CREATE TABLE IF NOT EXISTS cold_storage.customer_messages_archive (
  id UUID NOT NULL,
  conversation_id UUID NOT NULL,
  sender_type TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  shard_id INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL,
  archived_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id)
);

COMMENT ON TABLE cold_storage.customer_messages_archive IS
'Archived customer messages older than 6 months.';

-- Index for message archive queries
CREATE INDEX IF NOT EXISTS idx_messages_archive_conversation
ON cold_storage.customer_messages_archive (conversation_id, created_at DESC);

-- ============================================================================
-- ARCHIVE FUNCTIONS
-- ============================================================================

-- Archive old analytics events (> 1 year)
CREATE OR REPLACE FUNCTION archive_old_analytics_events()
RETURNS TABLE(archived_count BIGINT, deleted_count BIGINT) AS $$
DECLARE
  v_archived BIGINT := 0;
  v_deleted BIGINT := 0;
  v_cutoff_date TIMESTAMPTZ := NOW() - INTERVAL '1 year';
BEGIN
  -- Move old events to archive
  INSERT INTO cold_storage.analytics_events_archive (
    id, merchant_id, session_id, event_type, event_data,
    user_id, device_type, browser, os, country_code,
    city, referrer, page_url, shard_id, created_at
  )
  SELECT
    id, merchant_id, session_id, event_type, event_data,
    user_id, device_type, browser, os, country_code,
    city, referrer, page_url, shard_id, created_at
  FROM analytics_events
  WHERE created_at < v_cutoff_date
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS v_archived = ROW_COUNT;

  -- Delete archived events from main table
  DELETE FROM analytics_events
  WHERE created_at < v_cutoff_date;

  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN QUERY SELECT v_archived, v_deleted;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION archive_old_analytics_events IS
'Archives analytics_events older than 1 year to cold_storage schema.';

-- Archive old completed/cancelled orders (> 6 months)
CREATE OR REPLACE FUNCTION archive_old_orders()
RETURNS TABLE(archived_count BIGINT, deleted_count BIGINT) AS $$
DECLARE
  v_archived BIGINT := 0;
  v_deleted BIGINT := 0;
  v_cutoff_date TIMESTAMPTZ := NOW() - INTERVAL '6 months';
BEGIN
  -- Move old completed/cancelled orders to archive
  INSERT INTO cold_storage.orders_archive (
    id, merchant_id, customer_name, customer_email, customer_phone,
    status, total_amount, currency, items, notes,
    table_number, order_type, payment_method, payment_status,
    shard_id, created_at, updated_at, completed_at
  )
  SELECT
    id, merchant_id, customer_name, customer_email, customer_phone,
    status, total_amount, currency, items, notes,
    table_number, order_type, payment_method, payment_status,
    shard_id, created_at, updated_at, completed_at
  FROM orders
  WHERE created_at < v_cutoff_date
    AND status IN ('delivered', 'completed', 'cancelled')
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS v_archived = ROW_COUNT;

  -- Delete archived orders from main table
  DELETE FROM orders
  WHERE created_at < v_cutoff_date
    AND status IN ('delivered', 'completed', 'cancelled');

  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN QUERY SELECT v_archived, v_deleted;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION archive_old_orders IS
'Archives completed/cancelled orders older than 6 months to cold_storage schema.';

-- Archive old customer messages (> 6 months)
CREATE OR REPLACE FUNCTION archive_old_customer_messages()
RETURNS TABLE(archived_count BIGINT, deleted_count BIGINT) AS $$
DECLARE
  v_archived BIGINT := 0;
  v_deleted BIGINT := 0;
  v_cutoff_date TIMESTAMPTZ := NOW() - INTERVAL '6 months';
BEGIN
  -- Move old messages to archive
  INSERT INTO cold_storage.customer_messages_archive (
    id, conversation_id, sender_type, content, metadata,
    is_read, shard_id, created_at
  )
  SELECT
    id, conversation_id, sender_type, content, metadata,
    is_read, shard_id, created_at
  FROM customer_messages
  WHERE created_at < v_cutoff_date
  ON CONFLICT DO NOTHING;

  GET DIAGNOSTICS v_archived = ROW_COUNT;

  -- Delete archived messages from main table
  DELETE FROM customer_messages
  WHERE created_at < v_cutoff_date;

  GET DIAGNOSTICS v_deleted = ROW_COUNT;

  RETURN QUERY SELECT v_archived, v_deleted;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION archive_old_customer_messages IS
'Archives customer messages older than 6 months to cold_storage schema.';

-- Run all archive operations
CREATE OR REPLACE FUNCTION run_archive_maintenance()
RETURNS TABLE(
  table_name TEXT,
  archived_count BIGINT,
  deleted_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'analytics_events'::TEXT, ae.archived_count, ae.deleted_count
  FROM archive_old_analytics_events() ae;

  RETURN QUERY
  SELECT 'orders'::TEXT, o.archived_count, o.deleted_count
  FROM archive_old_orders() o;

  RETURN QUERY
  SELECT 'customer_messages'::TEXT, cm.archived_count, cm.deleted_count
  FROM archive_old_customer_messages() cm;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION run_archive_maintenance IS
'Runs all archive operations and returns counts per table.';

-- ============================================================================
-- ARCHIVE STATS VIEW
-- ============================================================================

CREATE OR REPLACE VIEW v_archive_stats AS
SELECT
  'analytics_events' as table_name,
  (SELECT COUNT(*) FROM analytics_events) as active_count,
  (SELECT COUNT(*) FROM cold_storage.analytics_events_archive) as archived_count,
  (SELECT MIN(created_at) FROM analytics_events) as oldest_active,
  (SELECT MAX(created_at) FROM cold_storage.analytics_events_archive) as newest_archived

UNION ALL

SELECT
  'orders' as table_name,
  (SELECT COUNT(*) FROM orders) as active_count,
  (SELECT COUNT(*) FROM cold_storage.orders_archive) as archived_count,
  (SELECT MIN(created_at) FROM orders) as oldest_active,
  (SELECT MAX(created_at) FROM cold_storage.orders_archive) as newest_archived

UNION ALL

SELECT
  'customer_messages' as table_name,
  (SELECT COUNT(*) FROM customer_messages) as active_count,
  (SELECT COUNT(*) FROM cold_storage.customer_messages_archive) as archived_count,
  (SELECT MIN(created_at) FROM customer_messages) as oldest_active,
  (SELECT MAX(created_at) FROM cold_storage.customer_messages_archive) as newest_archived;

COMMENT ON VIEW v_archive_stats IS
'Shows active vs archived row counts per table.';

-- ============================================================================
-- AUTO-CREATE ARCHIVE PARTITIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION create_archive_partition_if_needed(p_year INTEGER)
RETURNS TEXT AS $$
DECLARE
  v_partition_name TEXT;
  v_start_date TEXT;
  v_end_date TEXT;
BEGIN
  v_partition_name := 'analytics_events_archive_' || p_year::TEXT;
  v_start_date := p_year::TEXT || '-01-01';
  v_end_date := (p_year + 1)::TEXT || '-01-01';

  -- Check if partition exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables
    WHERE schemaname = 'cold_storage'
      AND tablename = v_partition_name
  ) THEN
    EXECUTE FORMAT(
      'CREATE TABLE cold_storage.%I PARTITION OF cold_storage.analytics_events_archive
       FOR VALUES FROM (%L) TO (%L)',
      v_partition_name, v_start_date, v_end_date
    );
    RETURN 'Created partition: ' || v_partition_name;
  END IF;

  RETURN 'Partition already exists: ' || v_partition_name;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION create_archive_partition_if_needed IS
'Creates a yearly archive partition if it does not exist.';

-- ============================================================================
-- SECURITY
-- ============================================================================

-- Secure functions
ALTER FUNCTION archive_old_analytics_events() SET search_path = public, cold_storage;
ALTER FUNCTION archive_old_orders() SET search_path = public, cold_storage;
ALTER FUNCTION archive_old_customer_messages() SET search_path = public, cold_storage;
ALTER FUNCTION run_archive_maintenance() SET search_path = public, cold_storage;
ALTER FUNCTION create_archive_partition_if_needed(INTEGER) SET search_path = public, cold_storage;

-- RLS for archive tables (service role only)
ALTER TABLE cold_storage.analytics_events_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE cold_storage.orders_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE cold_storage.customer_messages_archive ENABLE ROW LEVEL SECURITY;

-- Service role access only
CREATE POLICY "service_role_analytics_archive" ON cold_storage.analytics_events_archive
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_orders_archive" ON cold_storage.orders_archive
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_messages_archive" ON cold_storage.customer_messages_archive
  FOR ALL USING (auth.role() = 'service_role');
