-- ============================================================================
-- GUDBRO Security Fix: Enable RLS on All Tables
-- Migration: 001-enable-rls-all-tables
-- Date: 2025-12-03
--
-- Fixes 9 CRITICAL errors from Supabase Security Advisor
-- ============================================================================

-- ============================================================================
-- STEP 1: Enable RLS on all tables
-- ============================================================================

ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 2: Create policies for MERCHANTS
-- ============================================================================

-- Public read for active merchants (needed for PWA)
CREATE POLICY "Public can view active merchants"
  ON public.merchants
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can manage their own merchant
CREATE POLICY "Merchant users can manage their merchant"
  ON public.merchants
  FOR ALL
  USING (
    id IN (
      SELECT merchant_id FROM public.merchant_users
      WHERE auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 3: Create policies for MERCHANT_USERS
-- ============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.merchant_users
  FOR SELECT
  USING (auth_provider_id = auth.uid()::text);

-- Owners/Admins can manage merchant users
CREATE POLICY "Admins can manage merchant users"
  ON public.merchant_users
  FOR ALL
  USING (
    merchant_id IN (
      SELECT merchant_id FROM public.merchant_users
      WHERE auth_provider_id = auth.uid()::text
        AND role IN ('owner', 'admin')
    )
  );

-- ============================================================================
-- STEP 4: Create policies for MENU_CATEGORIES
-- ============================================================================

-- Public read for active categories (needed for PWA menu)
CREATE POLICY "Public can view active categories"
  ON public.menu_categories
  FOR SELECT
  USING (is_active = true);

-- Merchant staff can manage categories
CREATE POLICY "Merchant staff can manage categories"
  ON public.menu_categories
  FOR ALL
  USING (
    merchant_id IN (
      SELECT merchant_id FROM public.merchant_users
      WHERE auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 5: Create policies for INGREDIENTS
-- ============================================================================

-- Public read for global ingredients
CREATE POLICY "Public can view global ingredients"
  ON public.ingredients
  FOR SELECT
  USING (is_global = true);

-- Merchant staff can view/manage their ingredients
CREATE POLICY "Merchant staff can manage ingredients"
  ON public.ingredients
  FOR ALL
  USING (
    merchant_id IS NULL  -- Global ingredients
    OR merchant_id IN (
      SELECT merchant_id FROM public.merchant_users
      WHERE auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 6: Create policies for MENU_ITEMS
-- ============================================================================

-- Public read for active menu items (needed for PWA)
CREATE POLICY "Public can view active menu items"
  ON public.menu_items
  FOR SELECT
  USING (is_active = true AND is_available = true);

-- Merchant staff can manage menu items
CREATE POLICY "Merchant staff can manage menu items"
  ON public.menu_items
  FOR ALL
  USING (
    merchant_id IN (
      SELECT merchant_id FROM public.merchant_users
      WHERE auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 7: Create policies for MENU_ITEM_INGREDIENTS
-- ============================================================================

-- Public read (for allergen info on PWA)
CREATE POLICY "Public can view menu item ingredients"
  ON public.menu_item_ingredients
  FOR SELECT
  USING (true);

-- Merchant staff can manage
CREATE POLICY "Merchant staff can manage menu item ingredients"
  ON public.menu_item_ingredients
  FOR ALL
  USING (
    menu_item_id IN (
      SELECT mi.id FROM public.menu_items mi
      JOIN public.merchant_users mu ON mi.merchant_id = mu.merchant_id
      WHERE mu.auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 8: Create policies for ORDERS
-- ============================================================================

-- Anonymous users can create orders (PWA)
CREATE POLICY "Anyone can create orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Users can view their own orders by session_id
CREATE POLICY "Users can view own orders by session"
  ON public.orders
  FOR SELECT
  USING (true);  -- For now allow all reads - can be restricted by session_id

-- Merchant staff can manage their orders
CREATE POLICY "Merchant staff can manage orders"
  ON public.orders
  FOR ALL
  USING (
    merchant_id IN (
      SELECT merchant_id FROM public.merchant_users
      WHERE auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 9: Create policies for ORDER_ITEMS
-- ============================================================================

-- Anyone can view order items (for order history)
CREATE POLICY "Anyone can view order items"
  ON public.order_items
  FOR SELECT
  USING (true);

-- Anyone can insert order items (when creating order)
CREATE POLICY "Anyone can create order items"
  ON public.order_items
  FOR INSERT
  WITH CHECK (true);

-- Merchant staff can manage
CREATE POLICY "Merchant staff can manage order items"
  ON public.order_items
  FOR ALL
  USING (
    order_id IN (
      SELECT o.id FROM public.orders o
      JOIN public.merchant_users mu ON o.merchant_id = mu.merchant_id
      WHERE mu.auth_provider_id = auth.uid()::text
    )
  );

-- ============================================================================
-- STEP 10: Create policies for ORDER_STATUS_HISTORY
-- ============================================================================

-- Anyone can view status history
CREATE POLICY "Anyone can view order status history"
  ON public.order_status_history
  FOR SELECT
  USING (true);

-- System can insert (via triggers)
CREATE POLICY "System can log status changes"
  ON public.order_status_history
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'merchants', 'merchant_users', 'menu_categories',
    'ingredients', 'menu_items', 'menu_item_ingredients',
    'orders', 'order_items', 'order_status_history'
  )
ORDER BY tablename;

-- ============================================================================
-- NOTE: Run this in Supabase SQL Editor
-- After running, check Security Advisor - errors should be resolved
-- ============================================================================
