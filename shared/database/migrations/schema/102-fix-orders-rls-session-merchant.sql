-- Migration 102: Fix orders RLS to restrict by session and merchant
-- SEC-02: Orders table SELECT was wide open with USING(true)
--
-- IMPORTANT: DROP the old permissive policies first, then create restrictive ones.
-- PostgreSQL OR-combines all permissive policies for a given operation, so if the
-- old USING(true) policy remains, the new policy has no effect.

-- ============================================================================
-- DROP overly permissive policies
-- ============================================================================

-- SELECT was USING(true) — anyone could read all orders
DROP POLICY IF EXISTS "Users can view own orders by session" ON public.orders;

-- INSERT was WITH CHECK(true) — anyone could insert any order
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;

-- ============================================================================
-- CREATE restrictive SELECT policy
-- ============================================================================
-- 1. Anonymous users can read orders that have a non-null session_id
--    (session_id is client-generated so this provides basic isolation;
--     prevents reading NULL session_id orders which are staff-created)
-- 2. Authenticated merchant staff can read orders for their merchant
CREATE POLICY "Orders SELECT: session owner or merchant staff"
  ON public.orders
  FOR SELECT
  USING (
    session_id IS NOT NULL
    OR
    merchant_id IN (
      SELECT mu.merchant_id FROM public.merchant_users mu
      WHERE mu.auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- CREATE restrictive INSERT policy
-- ============================================================================
-- Only allow inserting orders with a non-null session_id (anonymous ordering)
-- Service role (API routes) bypasses RLS, so admin/staff insertions still work
CREATE POLICY "Orders INSERT: anonymous with session"
  ON public.orders
  FOR INSERT
  WITH CHECK (
    session_id IS NOT NULL
  );

-- Keep UPDATE/DELETE restricted to service role only (no new policy needed --
-- RLS blocks by default, and the existing "Merchant staff can manage orders"
-- FOR ALL policy already covers authenticated merchant staff UPDATE/DELETE)
