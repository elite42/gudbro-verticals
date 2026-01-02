-- ============================================
-- GUDBRO Security Fix: RLS + search_path
-- Execute in Supabase SQL Editor
-- Created: 2025-12-18
-- ============================================

-- =====================================================
-- STEP 1: CHECK CURRENT RLS STATUS
-- =====================================================

-- Run this first to see current status:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- =====================================================
-- STEP 2: ENABLE RLS ON ALL TABLES
-- =====================================================

-- Core tables
ALTER TABLE IF EXISTS ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS translations ENABLE ROW LEVEL SECURITY;

-- Food/Beverage tables
ALTER TABLE IF EXISTS appetizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS beers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS burgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS coffee ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS desserts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS dumplings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS japanese ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pasta ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pizzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS risotti ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS salads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sandwiches ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS soups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS steaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tea ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS wines ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 3: CREATE RLS POLICIES (Public Read, Service Write)
-- =====================================================

-- Helper: Drop existing policies if they exist and recreate
-- Using DO block for each table to handle "policy already exists" errors

-- INGREDIENTS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON ingredients;
  DROP POLICY IF EXISTS "Service write access" ON ingredients;
  CREATE POLICY "Public read access" ON ingredients FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON ingredients FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PRODUCT_INGREDIENTS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON product_ingredients;
  DROP POLICY IF EXISTS "Service write access" ON product_ingredients;
  CREATE POLICY "Public read access" ON product_ingredients FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON product_ingredients FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- TRANSLATIONS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON translations;
  DROP POLICY IF EXISTS "Service write access" ON translations;
  CREATE POLICY "Public read access" ON translations FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON translations FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- APPETIZERS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON appetizers;
  DROP POLICY IF EXISTS "Service write access" ON appetizers;
  CREATE POLICY "Public read access" ON appetizers FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON appetizers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- BEERS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON beers;
  DROP POLICY IF EXISTS "Service write access" ON beers;
  CREATE POLICY "Public read access" ON beers FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON beers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- BURGERS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON burgers;
  DROP POLICY IF EXISTS "Service write access" ON burgers;
  CREATE POLICY "Public read access" ON burgers FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON burgers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- COCKTAILS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON cocktails;
  DROP POLICY IF EXISTS "Service write access" ON cocktails;
  CREATE POLICY "Public read access" ON cocktails FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON cocktails FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- COFFEE
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON coffee;
  DROP POLICY IF EXISTS "Service write access" ON coffee;
  CREATE POLICY "Public read access" ON coffee FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON coffee FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- DESSERTS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON desserts;
  DROP POLICY IF EXISTS "Service write access" ON desserts;
  CREATE POLICY "Public read access" ON desserts FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON desserts FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- DUMPLINGS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON dumplings;
  DROP POLICY IF EXISTS "Service write access" ON dumplings;
  CREATE POLICY "Public read access" ON dumplings FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON dumplings FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- JAPANESE
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON japanese;
  DROP POLICY IF EXISTS "Service write access" ON japanese;
  CREATE POLICY "Public read access" ON japanese FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON japanese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PASTA
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON pasta;
  DROP POLICY IF EXISTS "Service write access" ON pasta;
  CREATE POLICY "Public read access" ON pasta FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON pasta FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PIZZAS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON pizzas;
  DROP POLICY IF EXISTS "Service write access" ON pizzas;
  CREATE POLICY "Public read access" ON pizzas FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON pizzas FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- RISOTTI
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON risotti;
  DROP POLICY IF EXISTS "Service write access" ON risotti;
  CREATE POLICY "Public read access" ON risotti FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON risotti FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SALADS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON salads;
  DROP POLICY IF EXISTS "Service write access" ON salads;
  CREATE POLICY "Public read access" ON salads FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON salads FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SANDWICHES
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sandwiches;
  DROP POLICY IF EXISTS "Service write access" ON sandwiches;
  CREATE POLICY "Public read access" ON sandwiches FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON sandwiches FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SOUPS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON soups;
  DROP POLICY IF EXISTS "Service write access" ON soups;
  CREATE POLICY "Public read access" ON soups FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON soups FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- STEAKS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON steaks;
  DROP POLICY IF EXISTS "Service write access" ON steaks;
  CREATE POLICY "Public read access" ON steaks FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON steaks FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- TEA
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON tea;
  DROP POLICY IF EXISTS "Service write access" ON tea;
  CREATE POLICY "Public read access" ON tea FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON tea FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- WINES
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON wines;
  DROP POLICY IF EXISTS "Service write access" ON wines;
  CREATE POLICY "Public read access" ON wines FOR SELECT USING (true);
  CREATE POLICY "Service write access" ON wines FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =====================================================
-- STEP 4: FIX search_path ON ALL TRIGGER FUNCTIONS
-- =====================================================

-- Pattern: Recreate each function with SECURITY DEFINER and search_path = public

-- Generic updated_at function (used by most tables)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table-specific updated_at functions (if they exist)

CREATE OR REPLACE FUNCTION update_ingredients_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_appetizers_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_beers_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_burgers_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_cocktails_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_coffee_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_desserts_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_dumplings_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_japanese_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_pasta_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_pizzas_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_risotti_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_salads_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_sandwiches_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_soups_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_steaks_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_tea_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_wines_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_product_ingredients_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_translations_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 5: VERIFY
-- =====================================================

-- Check RLS is enabled on all tables:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- Check policies exist:
-- SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;

-- Check functions have search_path:
-- SELECT proname, prosecdef, proconfig FROM pg_proc
-- WHERE pronamespace = 'public'::regnamespace
-- AND proname LIKE 'update_%_updated_at';

-- ============================================
-- DONE!
-- ============================================
