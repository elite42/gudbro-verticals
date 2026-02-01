-- Migration 093: Owner Dashboard Enhancements (Phase 32)
--
-- The `floor` column already exists on `accom_rooms` from migration 077.
-- This migration documents that floor is now exposed via the rooms API
-- (GET returns it, POST accepts it, PUT allows updates).
--
-- No schema changes needed -- this is a documentation-only migration.
--
-- Phase 32 features:
--   - Gantt/Timeline calendar view (CSS Grid, no new tables)
--   - Booking history tab (frontend-only filter)
--   - Room floor/level field exposed in API (column already in DB)

SELECT 1; -- no-op migration
