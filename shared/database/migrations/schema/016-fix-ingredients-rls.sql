-- Migration 016: Fix RLS for ingredients table
-- This enables public read access so the backoffice can display ingredients

-- First, check if RLS is enabled and enable it if not
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;

-- Drop existing read policy if exists (to avoid conflicts)
DROP POLICY IF EXISTS "ingredients_public_read" ON ingredients;
DROP POLICY IF EXISTS "Allow public read access" ON ingredients;
DROP POLICY IF EXISTS "Enable read access for all users" ON ingredients;

-- Create a policy that allows anyone to read ingredients
CREATE POLICY "ingredients_public_read" ON ingredients
  FOR SELECT
  USING (true);

-- Also allow authenticated users to update ingredients (for cost editing)
DROP POLICY IF EXISTS "ingredients_authenticated_update" ON ingredients;
CREATE POLICY "ingredients_authenticated_update" ON ingredients
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Verify the policies are in place
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE tablename = 'ingredients';
