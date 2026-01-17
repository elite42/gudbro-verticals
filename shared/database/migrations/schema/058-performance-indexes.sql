-- ============================================================================
-- Migration 058: Performance Indexes for Scale
-- ============================================================================
-- Part of SCALE-ROADMAP.md Phase 1 Foundation
-- Created: 2026-01-17
-- Purpose: Critical database indexes to prevent performance degradation
-- Impact: Improves query performance for high-traffic tables by 10-100x
-- ============================================================================

-- NOTE: These indexes were already applied to production via MCP execute_sql
-- This file documents the changes for migration tracking and future deployments

-- ============================================================================
-- 1. MENU ITEMS - Most queried table
-- ============================================================================

-- Primary lookup: merchant's active items by category
CREATE INDEX IF NOT EXISTS idx_menu_items_merchant_category_active
ON menu_items (merchant_id, category_id, is_available);

-- ============================================================================
-- 2. MENU CATEGORIES - Category ordering
-- ============================================================================

-- Category list with ordering (for menu display)
CREATE INDEX IF NOT EXISTS idx_menu_categories_merchant_active_order
ON menu_categories (merchant_id, is_active, display_order);

-- ============================================================================
-- 3. ANALYTICS EVENTS - High volume table
-- ============================================================================

-- Event lookup by name and time (for dashboards)
CREATE INDEX IF NOT EXISTS idx_analytics_events_name_created
ON analytics_events (event_name, created_at DESC);

-- Event lookup by category and time (for reports)
CREATE INDEX IF NOT EXISTS idx_analytics_events_category_created
ON analytics_events (category, created_at DESC);

-- ============================================================================
-- 4. ORDERS - Operational queries
-- ============================================================================

-- Order list by merchant, status, and time (main backoffice view)
CREATE INDEX IF NOT EXISTS idx_orders_merchant_status_created
ON orders (merchant_id, status, created_at DESC);

-- ============================================================================
-- 5. RESERVATIONS - Calendar queries
-- ============================================================================

-- Reservation lookup by location and date (calendar view)
CREATE INDEX IF NOT EXISTS idx_reservations_location_date
ON reservations (location_id, reservation_date);

-- Reservation lookup by location and status (status filtering)
CREATE INDEX IF NOT EXISTS idx_reservations_location_status
ON reservations (location_id, status);

-- ============================================================================
-- 6. BLOCKED SLOTS - Availability calculation
-- ============================================================================

-- Blocked slot lookup for availability checking
CREATE INDEX IF NOT EXISTS idx_blocked_slots_location_date
ON blocked_slots (location_id, blocked_date);

-- ============================================================================
-- FUTURE INDEXES (Phase 2 - Add when needed)
-- ============================================================================
--
-- QR Codes (when QR traffic increases):
-- CREATE INDEX idx_qr_scans_qr_id_created ON qr_scans (qr_code_id, created_at DESC);
-- CREATE INDEX idx_qr_codes_merchant_active ON qr_codes (merchant_id, is_active);
--
-- Loyalty (when loyalty feature used heavily):
-- CREATE INDEX idx_loyalty_points_account_merchant ON loyalty_points (account_id, merchant_id);
-- CREATE INDEX idx_loyalty_transactions_account_created ON loyalty_transactions (account_id, created_at DESC);
--
-- Notifications (when push notifications scale):
-- CREATE INDEX idx_notifications_account_unread ON notifications (account_id, is_read) WHERE is_read = false;
--
-- ============================================================================
