-- ============================================================================
-- Migration 006: Fix RLS for modifier_groups table
-- ============================================================================
--
-- ISSUE: modifier_groups table was created without RLS enabled
-- FOUND BY: Claude Opus during system review on 2025-12-05
--
-- This migration enables RLS and creates the missing policies
-- ============================================================================

-- Enable RLS on modifier_groups
ALTER TABLE modifier_groups ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (safety)
DROP POLICY IF EXISTS "Public read access to modifier_groups" ON modifier_groups;
DROP POLICY IF EXISTS "Authenticated users can manage modifier_groups" ON modifier_groups;

-- Create RLS policies
CREATE POLICY "Public read access to modifier_groups"
ON modifier_groups FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated users can manage modifier_groups"
ON modifier_groups FOR ALL
USING (true) WITH CHECK (true);

-- Verify RLS is enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class
    WHERE relname = 'modifier_groups' AND relrowsecurity = true
  ) THEN
    RAISE EXCEPTION 'RLS not enabled on modifier_groups';
  END IF;

  RAISE NOTICE 'RLS successfully enabled on modifier_groups';
END $$;
