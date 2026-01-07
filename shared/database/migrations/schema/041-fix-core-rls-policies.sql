-- Migration 041: Fix Core Tables RLS Policies
-- Removes dev policies and tightens access on core business tables
-- Reference: https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy

-- ============================================
-- EVENTS - Remove dangerous dev policies!
-- ============================================
-- These "dev_*" policies allow anyone to modify events - very dangerous in production

DROP POLICY IF EXISTS "dev_update_all" ON events;
DROP POLICY IF EXISTS "dev_write_all" ON events;

-- Replace with proper policies (service_role for backend operations)
CREATE POLICY "events_service_insert" ON events
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "events_service_update" ON events
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- PRODUCT_RECIPES - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "product_recipes_delete" ON product_recipes;
DROP POLICY IF EXISTS "product_recipes_insert" ON product_recipes;
DROP POLICY IF EXISTS "product_recipes_update" ON product_recipes;

CREATE POLICY "product_recipes_service_insert" ON product_recipes
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "product_recipes_service_update" ON product_recipes
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "product_recipes_service_delete" ON product_recipes
  FOR DELETE USING (auth.role() = 'service_role');

-- ============================================
-- STAFF_REVIEWS - Restrict insert to service_role
-- ============================================
DROP POLICY IF EXISTS "staff_reviews_create" ON staff_reviews;

CREATE POLICY "staff_reviews_service_insert" ON staff_reviews
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- SCHEDULE_OVERRIDES - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Schedule overrides manageable by authenticated" ON schedule_overrides;

CREATE POLICY "schedule_overrides_service_all" ON schedule_overrides
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- MODIFIER_GROUPS - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can manage modifier_groups" ON modifier_groups;

CREATE POLICY "modifier_groups_service_all" ON modifier_groups
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- MODIFIERS - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can manage modifiers" ON modifiers;

CREATE POLICY "modifiers_service_all" ON modifiers
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- MENU_ITEM_TRANSLATIONS - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can manage menu_item_translations" ON menu_item_translations;

CREATE POLICY "menu_item_translations_service_all" ON menu_item_translations
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- MENU_ITEM_MODIFIER_OVERRIDES - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can manage menu_item_modifier_overrides" ON menu_item_modifier_overrides;

CREATE POLICY "menu_item_modifier_overrides_service_all" ON menu_item_modifier_overrides
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- CATEGORY_TRANSLATIONS - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can manage category_translations" ON category_translations;

CREATE POLICY "category_translations_service_all" ON category_translations
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- CATEGORY_MODIFIER_GROUPS - Restrict to service_role
-- ============================================
DROP POLICY IF EXISTS "Authenticated users can manage category_modifier_groups" ON category_modifier_groups;

CREATE POLICY "category_modifier_groups_service_all" ON category_modifier_groups
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- NOTE: The following are intentionally left open:
-- - accounts: Anon can create (for signup)
-- - hot_action_requests: Anyone can insert (customer requests)
-- - hot_action_types: Authenticated manage (admin feature)
-- - order_items: Anyone can create (customer orders)
-- - merchant_onboarding_sessions: Anon can create (onboarding flow)
-- - exchange_rates: Service role manage (already correct name but uses true)
-- - countries, languages: Reference data, public read is fine
-- ============================================

-- Fix exchange_rates to actually use service_role check
DROP POLICY IF EXISTS "Service role can manage exchange_rates" ON exchange_rates;

CREATE POLICY "exchange_rates_service_all" ON exchange_rates
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
