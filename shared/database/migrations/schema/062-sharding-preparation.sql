-- Migration: 062-sharding-preparation.sql
-- Purpose: Prepare database for future horizontal scaling with logical sharding
-- Phase: 3 (10K → 100K users)
-- Created: 2026-01-18

-- ============================================================================
-- SHARDING PREPARATION
--
-- Adds shard_id column to high-volume tenant tables for future horizontal scaling.
-- Uses consistent hashing based on merchant_id to ensure related data stays together.
--
-- Tables affected:
-- - orders (highest write volume)
-- - analytics_events (highest read volume)
-- - menu_items (frequently accessed)
-- - menu_categories (frequently accessed)
-- - customer_messages (growing volume)
-- ============================================================================

-- Add shard_id to orders table
ALTER TABLE orders
ADD COLUMN IF NOT EXISTS shard_id INTEGER NOT NULL DEFAULT 0;

-- Add shard_id to analytics_events (if not partitioned)
ALTER TABLE analytics_events
ADD COLUMN IF NOT EXISTS shard_id INTEGER NOT NULL DEFAULT 0;

-- Add shard_id to menu_items
ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS shard_id INTEGER NOT NULL DEFAULT 0;

-- Add shard_id to menu_categories
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS shard_id INTEGER NOT NULL DEFAULT 0;

-- Add shard_id to customer_messages
ALTER TABLE customer_messages
ADD COLUMN IF NOT EXISTS shard_id INTEGER NOT NULL DEFAULT 0;

-- Add shard_id to customer_conversations
ALTER TABLE customer_conversations
ADD COLUMN IF NOT EXISTS shard_id INTEGER NOT NULL DEFAULT 0;

-- ============================================================================
-- SHARD ASSIGNMENT FUNCTION
--
-- Uses consistent hashing to map merchant_id to one of 16 logical shards.
-- 16 shards provide good balance between:
-- - Distribution (enough buckets to spread load)
-- - Manageability (not too many to manage)
-- - Future physical sharding (can map to 2, 4, 8, or 16 physical shards)
-- ============================================================================

CREATE OR REPLACE FUNCTION assign_shard(p_merchant_id UUID)
RETURNS INTEGER AS $$
BEGIN
  -- Consistent hashing: merchant_id -> shard_id (0-15)
  -- Uses hashtext for deterministic integer hash
  RETURN abs(hashtext(p_merchant_id::text)) % 16;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;

COMMENT ON FUNCTION assign_shard IS
'Assigns a shard_id (0-15) based on merchant_id using consistent hashing.
Ensures all data for a merchant lands on the same shard.';

-- ============================================================================
-- AUTO-ASSIGN TRIGGER FUNCTION
--
-- Automatically sets shard_id on INSERT if merchant_id is provided
-- ============================================================================

CREATE OR REPLACE FUNCTION set_shard_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set if not already set and merchant_id exists
  IF NEW.shard_id = 0 AND NEW.merchant_id IS NOT NULL THEN
    NEW.shard_id := assign_shard(NEW.merchant_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION set_shard_id IS
'Trigger function to auto-assign shard_id based on merchant_id on INSERT.';

-- ============================================================================
-- CREATE TRIGGERS
-- ============================================================================

-- Orders trigger
DROP TRIGGER IF EXISTS trigger_orders_shard_id ON orders;
CREATE TRIGGER trigger_orders_shard_id
  BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- Analytics events trigger
DROP TRIGGER IF EXISTS trigger_analytics_events_shard_id ON analytics_events;
CREATE TRIGGER trigger_analytics_events_shard_id
  BEFORE INSERT ON analytics_events
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- Menu items trigger
DROP TRIGGER IF EXISTS trigger_menu_items_shard_id ON menu_items;
CREATE TRIGGER trigger_menu_items_shard_id
  BEFORE INSERT ON menu_items
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- Menu categories trigger
DROP TRIGGER IF EXISTS trigger_menu_categories_shard_id ON menu_categories;
CREATE TRIGGER trigger_menu_categories_shard_id
  BEFORE INSERT ON menu_categories
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- Customer messages trigger
DROP TRIGGER IF EXISTS trigger_customer_messages_shard_id ON customer_messages;
CREATE TRIGGER trigger_customer_messages_shard_id
  BEFORE INSERT ON customer_messages
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- Customer conversations trigger
DROP TRIGGER IF EXISTS trigger_customer_conversations_shard_id ON customer_conversations;
CREATE TRIGGER trigger_customer_conversations_shard_id
  BEFORE INSERT ON customer_conversations
  FOR EACH ROW EXECUTE FUNCTION set_shard_id();

-- ============================================================================
-- INDEXES FOR SHARD ROUTING
--
-- Composite indexes including shard_id for efficient shard-aware queries
-- ============================================================================

-- Orders: shard + merchant + status (common query pattern)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_shard_merchant_status
ON orders (shard_id, merchant_id, status);

-- Analytics: shard + merchant + created_at (time-series queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_analytics_events_shard_merchant_created
ON analytics_events (shard_id, merchant_id, created_at DESC);

-- Menu items: shard + merchant + category (menu fetching)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_items_shard_merchant_category
ON menu_items (shard_id, merchant_id, category_id);

-- Menu categories: shard + merchant (menu fetching)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_menu_categories_shard_merchant
ON menu_categories (shard_id, merchant_id);

-- Customer messages: shard + conversation (chat queries)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_customer_messages_shard_conversation
ON customer_messages (shard_id, conversation_id);

-- ============================================================================
-- BACKFILL EXISTING DATA
--
-- Update existing rows to have correct shard_id based on their merchant_id
-- ============================================================================

-- Backfill orders
UPDATE orders
SET shard_id = assign_shard(merchant_id)
WHERE shard_id = 0 AND merchant_id IS NOT NULL;

-- Backfill analytics_events
UPDATE analytics_events
SET shard_id = assign_shard(merchant_id)
WHERE shard_id = 0 AND merchant_id IS NOT NULL;

-- Backfill menu_items
UPDATE menu_items
SET shard_id = assign_shard(merchant_id)
WHERE shard_id = 0 AND merchant_id IS NOT NULL;

-- Backfill menu_categories
UPDATE menu_categories
SET shard_id = assign_shard(merchant_id)
WHERE shard_id = 0 AND merchant_id IS NOT NULL;

-- Backfill customer_messages (via conversation -> merchant)
UPDATE customer_messages cm
SET shard_id = assign_shard(cc.merchant_id)
FROM customer_conversations cc
WHERE cm.conversation_id = cc.id
  AND cm.shard_id = 0
  AND cc.merchant_id IS NOT NULL;

-- Backfill customer_conversations
UPDATE customer_conversations
SET shard_id = assign_shard(merchant_id)
WHERE shard_id = 0 AND merchant_id IS NOT NULL;

-- ============================================================================
-- SHARD DISTRIBUTION STATS VIEW
--
-- Helper view to monitor shard balance
-- ============================================================================

CREATE VIEW v_shard_distribution WITH (security_invoker = true) AS
SELECT
  'orders' as table_name,
  shard_id,
  COUNT(*) as row_count,
  ROUND(100.0 * COUNT(*) / NULLIF(SUM(COUNT(*)) OVER (), 0), 2) as percentage
FROM orders
GROUP BY shard_id

UNION ALL

SELECT
  'analytics_events' as table_name,
  shard_id,
  COUNT(*) as row_count,
  ROUND(100.0 * COUNT(*) / NULLIF(SUM(COUNT(*)) OVER (), 0), 2) as percentage
FROM analytics_events
GROUP BY shard_id

UNION ALL

SELECT
  'menu_items' as table_name,
  shard_id,
  COUNT(*) as row_count,
  ROUND(100.0 * COUNT(*) / NULLIF(SUM(COUNT(*)) OVER (), 0), 2) as percentage
FROM menu_items
GROUP BY shard_id

ORDER BY table_name, shard_id;

COMMENT ON VIEW v_shard_distribution IS
'Shows row distribution across shards. Ideal distribution is ~6.25% per shard (100/16).';

-- ============================================================================
-- SECURITY
-- ============================================================================

-- Secure functions
ALTER FUNCTION assign_shard(UUID) SET search_path = public;
ALTER FUNCTION set_shard_id() SET search_path = public;
