-- ============================================================================
-- GUDBRO Fix: Infinite Recursion in merchant_users RLS Policy
-- Migration: 013-fix-merchant-users-recursion
-- Date: 2025-12-06
--
-- Problem: "Admins can manage merchant users" policy queries merchant_users
--          to check permissions on merchant_users, causing infinite recursion.
--
-- Solution: Use a simpler approach - let users manage their own merchant's users
--           based on their auth ID, not by querying the same table.
-- ============================================================================

-- Drop the problematic recursive policy
DROP POLICY IF EXISTS "Admins can manage merchant users" ON public.merchant_users;

-- Create a new non-recursive policy
-- Strategy: Admins can manage users in the same merchant as themselves,
-- but we check role via the current user's own row (non-recursive)
CREATE POLICY "Admins can manage merchant users"
  ON public.merchant_users
  FOR ALL
  USING (
    -- Allow if:
    -- 1. User is viewing their own record
    auth_provider_id = auth.uid()::text
    -- 2. OR user is admin/owner of ANY merchant (checked via auth context)
    --    Since we can't check the table itself, we allow all authenticated users
    --    and rely on application-level checks for write operations
    OR auth.uid() IS NOT NULL
  );

-- Alternative: More restrictive version using a SECURITY DEFINER function
-- This is the "clean" solution but requires more setup

-- Create a helper function that runs with SECURITY DEFINER (bypasses RLS)
CREATE OR REPLACE FUNCTION public.is_merchant_admin(
  p_merchant_id UUID,
  p_auth_id TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.merchant_users
    WHERE merchant_id = p_merchant_id
      AND auth_provider_id = p_auth_id
      AND role IN ('owner', 'admin')
  )
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.is_merchant_admin(UUID, TEXT) TO authenticated;

-- Now replace the policy with a proper non-recursive version using the function
DROP POLICY IF EXISTS "Admins can manage merchant users" ON public.merchant_users;

CREATE POLICY "Admins can manage merchant users"
  ON public.merchant_users
  FOR ALL
  USING (
    -- User can manage their own record
    auth_provider_id = auth.uid()::text
    -- OR user is admin/owner of the same merchant (via SECURITY DEFINER function)
    OR public.is_merchant_admin(merchant_id, auth.uid()::text)
  );

-- ============================================================================
-- Also fix other policies that reference merchant_users
-- These could cause performance issues even if not recursive
-- ============================================================================

-- Fix menu_categories policy
DROP POLICY IF EXISTS "Merchant staff can manage categories" ON public.menu_categories;
CREATE POLICY "Merchant staff can manage categories"
  ON public.menu_categories
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.merchant_users mu
      WHERE mu.merchant_id = menu_categories.merchant_id
        AND mu.auth_provider_id = auth.uid()::text
    )
  );

-- Fix menu_items policy
DROP POLICY IF EXISTS "Merchant staff can manage menu items" ON public.menu_items;
CREATE POLICY "Merchant staff can manage menu items"
  ON public.menu_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.merchant_users mu
      WHERE mu.merchant_id = menu_items.merchant_id
        AND mu.auth_provider_id = auth.uid()::text
    )
  );

-- Fix ingredients policy
DROP POLICY IF EXISTS "Merchant staff can manage ingredients" ON public.ingredients;
CREATE POLICY "Merchant staff can manage ingredients"
  ON public.ingredients
  FOR ALL
  USING (
    merchant_id IS NULL  -- Global ingredients (anyone can read)
    OR EXISTS (
      SELECT 1 FROM public.merchant_users mu
      WHERE mu.merchant_id = ingredients.merchant_id
        AND mu.auth_provider_id = auth.uid()::text
    )
  );

-- Fix orders policy
DROP POLICY IF EXISTS "Merchant staff can manage orders" ON public.orders;
CREATE POLICY "Merchant staff can manage orders"
  ON public.orders
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.merchant_users mu
      WHERE mu.merchant_id = orders.merchant_id
        AND mu.auth_provider_id = auth.uid()::text
    )
  );

-- Fix order_items policy
DROP POLICY IF EXISTS "Merchant staff can manage order items" ON public.order_items;
CREATE POLICY "Merchant staff can manage order items"
  ON public.order_items
  FOR ALL
  USING (
    EXISTS (
      SELECT 1
      FROM public.orders o
      JOIN public.merchant_users mu ON o.merchant_id = mu.merchant_id
      WHERE o.id = order_items.order_id
        AND mu.auth_provider_id = auth.uid()::text
    )
  );

-- Fix merchants policy
DROP POLICY IF EXISTS "Merchant users can manage their merchant" ON public.merchants;
CREATE POLICY "Merchant users can manage their merchant"
  ON public.merchants
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.merchant_users mu
      WHERE mu.merchant_id = merchants.id
        AND mu.auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- VERIFICATION: Check that recursion is fixed
-- ============================================================================
-- Run this query to test:
-- SELECT * FROM public.menu_items LIMIT 1;
-- If it returns without "infinite recursion" error, the fix worked!

-- ============================================================================
-- NOTE: Execute this in Supabase SQL Editor
-- After running, test the PWA to confirm menu loads from Supabase
-- ============================================================================
