-- ============================================
-- GUDBRO Policy Cleanup: Remove Duplicates
-- Execute in Supabase SQL Editor
-- Created: 2025-12-18
-- ============================================
--
-- This script:
-- 1. Drops ALL existing policies on each table
-- 2. Creates exactly 2 standardized policies per table:
--    - "Public read access" (SELECT for everyone)
--    - "Service write access" (ALL for service_role)
--
-- Result: Clean, consistent policy naming across all tables
-- ============================================

-- =====================================================
-- INGREDIENTS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON ingredients;
DROP POLICY IF EXISTS "Service write access" ON ingredients;
DROP POLICY IF EXISTS "Public read access for ingredients" ON ingredients;
DROP POLICY IF EXISTS "Service write access for ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow public read access to ingredients" ON ingredients;
DROP POLICY IF EXISTS "Allow service role full access to ingredients" ON ingredients;

CREATE POLICY "Public read access" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Service write access" ON ingredients FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- PRODUCT_INGREDIENTS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON product_ingredients;
DROP POLICY IF EXISTS "Service write access" ON product_ingredients;
DROP POLICY IF EXISTS "Public read access for product_ingredients" ON product_ingredients;
DROP POLICY IF EXISTS "Service write access for product_ingredients" ON product_ingredients;
DROP POLICY IF EXISTS "Allow public read access to product_ingredients" ON product_ingredients;
DROP POLICY IF EXISTS "Allow service role full access to product_ingredients" ON product_ingredients;

CREATE POLICY "Public read access" ON product_ingredients FOR SELECT USING (true);
CREATE POLICY "Service write access" ON product_ingredients FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TRANSLATIONS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON translations;
DROP POLICY IF EXISTS "Service write access" ON translations;
DROP POLICY IF EXISTS "Public read access for translations" ON translations;
DROP POLICY IF EXISTS "Service write access for translations" ON translations;
DROP POLICY IF EXISTS "Allow public read access to translations" ON translations;
DROP POLICY IF EXISTS "Allow service role full access to translations" ON translations;

CREATE POLICY "Public read access" ON translations FOR SELECT USING (true);
CREATE POLICY "Service write access" ON translations FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- APPETIZERS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON appetizers;
DROP POLICY IF EXISTS "Service write access" ON appetizers;
DROP POLICY IF EXISTS "Public read access for appetizers" ON appetizers;
DROP POLICY IF EXISTS "Service write access for appetizers" ON appetizers;
DROP POLICY IF EXISTS "Allow public read access to appetizers" ON appetizers;
DROP POLICY IF EXISTS "Allow service role full access to appetizers" ON appetizers;

CREATE POLICY "Public read access" ON appetizers FOR SELECT USING (true);
CREATE POLICY "Service write access" ON appetizers FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- BEERS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON beers;
DROP POLICY IF EXISTS "Service write access" ON beers;
DROP POLICY IF EXISTS "Public read access for beers" ON beers;
DROP POLICY IF EXISTS "Service write access for beers" ON beers;
DROP POLICY IF EXISTS "Allow public read access to beers" ON beers;
DROP POLICY IF EXISTS "Allow service role full access to beers" ON beers;

CREATE POLICY "Public read access" ON beers FOR SELECT USING (true);
CREATE POLICY "Service write access" ON beers FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- BURGERS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON burgers;
DROP POLICY IF EXISTS "Service write access" ON burgers;
DROP POLICY IF EXISTS "Public read access for burgers" ON burgers;
DROP POLICY IF EXISTS "Service write access for burgers" ON burgers;
DROP POLICY IF EXISTS "Allow public read access to burgers" ON burgers;
DROP POLICY IF EXISTS "Allow service role full access to burgers" ON burgers;

CREATE POLICY "Public read access" ON burgers FOR SELECT USING (true);
CREATE POLICY "Service write access" ON burgers FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- COCKTAILS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON cocktails;
DROP POLICY IF EXISTS "Service write access" ON cocktails;
DROP POLICY IF EXISTS "Public read access for cocktails" ON cocktails;
DROP POLICY IF EXISTS "Service write access for cocktails" ON cocktails;
DROP POLICY IF EXISTS "Allow public read access to cocktails" ON cocktails;
DROP POLICY IF EXISTS "Allow service role full access to cocktails" ON cocktails;

CREATE POLICY "Public read access" ON cocktails FOR SELECT USING (true);
CREATE POLICY "Service write access" ON cocktails FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- COFFEE
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON coffee;
DROP POLICY IF EXISTS "Service write access" ON coffee;
DROP POLICY IF EXISTS "Public read access for coffee" ON coffee;
DROP POLICY IF EXISTS "Service write access for coffee" ON coffee;
DROP POLICY IF EXISTS "Allow public read access to coffee" ON coffee;
DROP POLICY IF EXISTS "Allow service role full access to coffee" ON coffee;

CREATE POLICY "Public read access" ON coffee FOR SELECT USING (true);
CREATE POLICY "Service write access" ON coffee FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- DESSERTS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON desserts;
DROP POLICY IF EXISTS "Service write access" ON desserts;
DROP POLICY IF EXISTS "Public read access for desserts" ON desserts;
DROP POLICY IF EXISTS "Service write access for desserts" ON desserts;
DROP POLICY IF EXISTS "Allow public read access to desserts" ON desserts;
DROP POLICY IF EXISTS "Allow service role full access to desserts" ON desserts;

CREATE POLICY "Public read access" ON desserts FOR SELECT USING (true);
CREATE POLICY "Service write access" ON desserts FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- DUMPLINGS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON dumplings;
DROP POLICY IF EXISTS "Service write access" ON dumplings;
DROP POLICY IF EXISTS "Public read access for dumplings" ON dumplings;
DROP POLICY IF EXISTS "Service write access for dumplings" ON dumplings;
DROP POLICY IF EXISTS "Allow public read access to dumplings" ON dumplings;
DROP POLICY IF EXISTS "Allow service role full access to dumplings" ON dumplings;

CREATE POLICY "Public read access" ON dumplings FOR SELECT USING (true);
CREATE POLICY "Service write access" ON dumplings FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- JAPANESE
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON japanese;
DROP POLICY IF EXISTS "Service write access" ON japanese;
DROP POLICY IF EXISTS "Public read access for japanese" ON japanese;
DROP POLICY IF EXISTS "Service write access for japanese" ON japanese;
DROP POLICY IF EXISTS "Allow public read access to japanese" ON japanese;
DROP POLICY IF EXISTS "Allow service role full access to japanese" ON japanese;

CREATE POLICY "Public read access" ON japanese FOR SELECT USING (true);
CREATE POLICY "Service write access" ON japanese FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- PASTA
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON pasta;
DROP POLICY IF EXISTS "Service write access" ON pasta;
DROP POLICY IF EXISTS "Public read access for pasta" ON pasta;
DROP POLICY IF EXISTS "Service write access for pasta" ON pasta;
DROP POLICY IF EXISTS "Allow public read access to pasta" ON pasta;
DROP POLICY IF EXISTS "Allow service role full access to pasta" ON pasta;

CREATE POLICY "Public read access" ON pasta FOR SELECT USING (true);
CREATE POLICY "Service write access" ON pasta FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- PIZZAS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON pizzas;
DROP POLICY IF EXISTS "Service write access" ON pizzas;
DROP POLICY IF EXISTS "Public read access for pizzas" ON pizzas;
DROP POLICY IF EXISTS "Service write access for pizzas" ON pizzas;
DROP POLICY IF EXISTS "Allow public read access to pizzas" ON pizzas;
DROP POLICY IF EXISTS "Allow service role full access to pizzas" ON pizzas;

CREATE POLICY "Public read access" ON pizzas FOR SELECT USING (true);
CREATE POLICY "Service write access" ON pizzas FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- RISOTTI
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON risotti;
DROP POLICY IF EXISTS "Service write access" ON risotti;
DROP POLICY IF EXISTS "Public read access for risotti" ON risotti;
DROP POLICY IF EXISTS "Service write access for risotti" ON risotti;
DROP POLICY IF EXISTS "Allow public read access to risotti" ON risotti;
DROP POLICY IF EXISTS "Allow service role full access to risotti" ON risotti;

CREATE POLICY "Public read access" ON risotti FOR SELECT USING (true);
CREATE POLICY "Service write access" ON risotti FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- SALADS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON salads;
DROP POLICY IF EXISTS "Service write access" ON salads;
DROP POLICY IF EXISTS "Public read access for salads" ON salads;
DROP POLICY IF EXISTS "Service write access for salads" ON salads;
DROP POLICY IF EXISTS "Allow public read access to salads" ON salads;
DROP POLICY IF EXISTS "Allow service role full access to salads" ON salads;

CREATE POLICY "Public read access" ON salads FOR SELECT USING (true);
CREATE POLICY "Service write access" ON salads FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- SANDWICHES
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON sandwiches;
DROP POLICY IF EXISTS "Service write access" ON sandwiches;
DROP POLICY IF EXISTS "Public read access for sandwiches" ON sandwiches;
DROP POLICY IF EXISTS "Service write access for sandwiches" ON sandwiches;
DROP POLICY IF EXISTS "Allow public read access to sandwiches" ON sandwiches;
DROP POLICY IF EXISTS "Allow service role full access to sandwiches" ON sandwiches;

CREATE POLICY "Public read access" ON sandwiches FOR SELECT USING (true);
CREATE POLICY "Service write access" ON sandwiches FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- SOUPS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON soups;
DROP POLICY IF EXISTS "Service write access" ON soups;
DROP POLICY IF EXISTS "Public read access for soups" ON soups;
DROP POLICY IF EXISTS "Service write access for soups" ON soups;
DROP POLICY IF EXISTS "Allow public read access to soups" ON soups;
DROP POLICY IF EXISTS "Allow service role full access to soups" ON soups;

CREATE POLICY "Public read access" ON soups FOR SELECT USING (true);
CREATE POLICY "Service write access" ON soups FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- STEAKS
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON steaks;
DROP POLICY IF EXISTS "Service write access" ON steaks;
DROP POLICY IF EXISTS "Public read access for steaks" ON steaks;
DROP POLICY IF EXISTS "Service write access for steaks" ON steaks;
DROP POLICY IF EXISTS "Allow public read access to steaks" ON steaks;
DROP POLICY IF EXISTS "Allow service role full access to steaks" ON steaks;

CREATE POLICY "Public read access" ON steaks FOR SELECT USING (true);
CREATE POLICY "Service write access" ON steaks FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- TEA
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON tea;
DROP POLICY IF EXISTS "Service write access" ON tea;
DROP POLICY IF EXISTS "Public read access for tea" ON tea;
DROP POLICY IF EXISTS "Service write access for tea" ON tea;
DROP POLICY IF EXISTS "Allow public read access to tea" ON tea;
DROP POLICY IF EXISTS "Allow service role full access to tea" ON tea;

CREATE POLICY "Public read access" ON tea FOR SELECT USING (true);
CREATE POLICY "Service write access" ON tea FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- WINES
-- =====================================================
DROP POLICY IF EXISTS "Public read access" ON wines;
DROP POLICY IF EXISTS "Service write access" ON wines;
DROP POLICY IF EXISTS "Public read access for wines" ON wines;
DROP POLICY IF EXISTS "Service write access for wines" ON wines;
DROP POLICY IF EXISTS "Allow public read access to wines" ON wines;
DROP POLICY IF EXISTS "Allow service role full access to wines" ON wines;

CREATE POLICY "Public read access" ON wines FOR SELECT USING (true);
CREATE POLICY "Service write access" ON wines FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- VERIFY: Should show exactly 40 rows (20 tables × 2 policies)
-- =====================================================
-- SELECT tablename, policyname FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;

-- ============================================
-- DONE! Expected: 40 policies (2 per table)
-- ============================================
