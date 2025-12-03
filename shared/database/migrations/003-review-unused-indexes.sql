-- ============================================================================
-- GUDBRO Performance Review: Unused Indexes Analysis
-- Migration: 003-review-unused-indexes
-- Date: 2025-12-03
--
-- Addresses 11 SUGGESTIONS from Supabase Performance Advisor
-- "Unused Index" - indexes that have never been used
--
-- IMPORTANT: This is a REVIEW script, not automatic removal!
-- Indexes should be analyzed before removal.
-- ============================================================================

-- ============================================================================
-- STEP 1: Analyze current index usage
-- ============================================================================

-- Run this query to see which indexes are actually unused:
SELECT
    schemaname,
    relname AS table_name,
    indexrelname AS index_name,
    idx_scan AS times_index_scanned,
    idx_tup_read AS tuples_read,
    idx_tup_fetch AS tuples_fetched,
    pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan ASC, pg_relation_size(indexrelid) DESC;

-- ============================================================================
-- REPORTED UNUSED INDEXES (from Supabase Security Advisor)
-- ============================================================================

-- Table: merchant_users (2 indexes)
--   - idx_merchant_users_email
--   - idx_merchant_users_merchant

-- Table: ingredients (2 indexes)
--   - idx_ingredients_global
--   - idx_ingredients_merchant

-- Table: menu_items (4 indexes)
--   - idx_menu_items_allergens
--   - idx_menu_items_category
--   - idx_menu_items_dietary
--   - idx_menu_items_merchant

-- Table: menu_item_ingredients (1 index)
--   - idx_menu_item_ingredients_ingredient

-- Table: orders (2 indexes)
--   - idx_orders_session
--   - idx_orders_status

-- ============================================================================
-- ANALYSIS & RECOMMENDATIONS
-- ============================================================================

-- KEEP (will be used when app scales):
-- - idx_merchant_users_merchant: Essential for multi-tenant queries
-- - idx_merchant_users_email: Essential for login lookups
-- - idx_menu_items_merchant: Essential for fetching merchant's menu
-- - idx_menu_items_category: Essential for category filtering
-- - idx_menu_items_allergens: Essential for Sistema 51 Filtri
-- - idx_menu_items_dietary: Essential for Sistema 51 Filtri
-- - idx_orders_status: Essential for order management
-- - idx_orders_session: Essential for session-based order history

-- POTENTIALLY REMOVABLE (after verification):
-- - idx_ingredients_global: May not be needed if few global ingredients
-- - idx_ingredients_merchant: May not be needed if few ingredients per merchant
-- - idx_menu_item_ingredients_ingredient: May not be needed for current queries

-- ============================================================================
-- OPTIONAL: Remove indexes ONLY if confirmed unused after analysis
-- Uncomment these lines ONLY after careful review
-- ============================================================================

-- -- Remove potentially unneeded indexes (OPTIONAL - REVIEW FIRST!)
-- DROP INDEX IF EXISTS public.idx_ingredients_global;
-- DROP INDEX IF EXISTS public.idx_ingredients_merchant;
-- DROP INDEX IF EXISTS public.idx_menu_item_ingredients_ingredient;

-- ============================================================================
-- RECOMMENDATION
-- ============================================================================

-- DO NOT remove indexes yet. The application is new and indexes may become
-- useful as the database grows. Unused indexes at this stage typically means
-- the features using them haven't been tested yet.
--
-- Review again in 30 days with production traffic data.
--
-- For now, focus on:
-- 1. Enabling RLS (critical security)
-- 2. Fixing function search_path (medium security)
-- 3. Monitor index usage over time

-- ============================================================================
-- STORAGE IMPACT (for reference)
-- ============================================================================

-- To see total space used by unused indexes:
SELECT
    pg_size_pretty(SUM(pg_relation_size(indexrelid))) AS total_unused_index_size
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
  AND idx_scan = 0;

-- ============================================================================
-- NOTE: This script is for ANALYSIS only
-- Run the SELECT queries to review, but DO NOT drop indexes without
-- understanding the impact on future queries
-- ============================================================================
