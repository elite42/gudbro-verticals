-- Migration 096: Minibar Self-Service Support
-- Phase 34-04: Add self_service automation level and minibar tracking columns
--
-- Purpose:
--   Enable minibar honor-system where guests mark consumed items,
--   creating self-service orders that owners can confirm later.

-- 1. Extend automation_level CHECK to include 'self_service'
ALTER TABLE accom_service_categories
  DROP CONSTRAINT IF EXISTS accom_service_categories_automation_level_check;

ALTER TABLE accom_service_categories
  ADD CONSTRAINT accom_service_categories_automation_level_check
  CHECK (automation_level IN ('auto_confirm', 'manual', 'whatsapp_notify', 'self_service'));

COMMENT ON CONSTRAINT accom_service_categories_automation_level_check ON accom_service_categories
  IS 'Valid automation levels: auto_confirm (instant), manual (owner reviews), whatsapp_notify (notify owner), self_service (guest honor system)';

-- 2. Add minibar tracking columns to orders
ALTER TABLE accom_service_orders
  ADD COLUMN IF NOT EXISTS is_minibar_consumption BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE accom_service_orders
  ADD COLUMN IF NOT EXISTS owner_confirmed BOOLEAN;

COMMENT ON COLUMN accom_service_orders.is_minibar_consumption
  IS 'True when order was created via minibar self-service (honor system)';

COMMENT ON COLUMN accom_service_orders.owner_confirmed
  IS 'Owner confirmation of minibar consumption: null=pending, true=confirmed, false=disputed';
