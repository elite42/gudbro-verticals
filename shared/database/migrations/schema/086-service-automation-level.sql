-- ============================================================================
-- Migration 086: Service Automation Level
-- ============================================================================
-- Date: 2026-01-31
-- Description: Adds automation_level column to accom_service_categories.
--              Controls how orders are handled per category:
--              - auto_confirm: order is instantly confirmed (no owner action)
--              - manual: owner must confirm/reject (default)
--              - whatsapp_notify: auto-confirm + WhatsApp notification to owner
--
-- Depends on: 077-accommodations-schema.sql (accom_service_categories)
-- ============================================================================

ALTER TABLE accom_service_categories
  ADD COLUMN IF NOT EXISTS automation_level TEXT NOT NULL DEFAULT 'manual'
    CHECK (automation_level IN ('auto_confirm', 'manual', 'whatsapp_notify'));

COMMENT ON COLUMN accom_service_categories.automation_level IS
  'Order handling: auto_confirm (instant), manual (owner confirms), whatsapp_notify (auto+notify)';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
