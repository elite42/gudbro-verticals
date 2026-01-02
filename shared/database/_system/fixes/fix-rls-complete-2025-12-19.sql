-- ============================================
-- GUDBRO Security Fix: Complete RLS + search_path
-- Execute in Supabase SQL Editor
-- Created: 2025-12-19
-- Covers ALL 31 tables (updated from 2025-12-18 version)
-- ============================================

-- =====================================================
-- STEP 1: ENABLE RLS ON ALL TABLES (31 tables)
-- =====================================================

-- Core tables
ALTER TABLE IF EXISTS ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_taxonomy ENABLE ROW LEVEL SECURITY;

-- Food/Beverage tables (original 17)
ALTER TABLE IF EXISTS appetizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS beers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS burgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS coffee ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS desserts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS dumplings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pasta ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pizzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS risotti ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS salads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sandwiches ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS soups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS steaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tea ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS wines ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sushi ENABLE ROW LEVEL SECURITY;

-- NEW tables added Dec 18-19 (14 tables)
ALTER TABLE IF EXISTS seafood ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS mexican ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS vegetarian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS fried ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS breakfast ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS indian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS thai ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS chinese ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS korean ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS spirits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS vietnamese ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: CREATE RLS POLICIES (Public Read, Service Write)
-- Using DO blocks to handle "policy already exists" errors
-- =====================================================

-- === CORE TABLES ===

-- INGREDIENTS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON ingredients;
  DROP POLICY IF EXISTS "Service write access" ON ingredients;
  DROP POLICY IF EXISTS "ingredients_public_read" ON ingredients;
  DROP POLICY IF EXISTS "ingredients_service_write" ON ingredients;
  CREATE POLICY "ingredients_public_read" ON ingredients FOR SELECT USING (true);
  CREATE POLICY "ingredients_service_write" ON ingredients FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PRODUCT_INGREDIENTS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON product_ingredients;
  DROP POLICY IF EXISTS "Service write access" ON product_ingredients;
  DROP POLICY IF EXISTS "product_ingredients_public_read" ON product_ingredients;
  DROP POLICY IF EXISTS "product_ingredients_service_write" ON product_ingredients;
  CREATE POLICY "product_ingredients_public_read" ON product_ingredients FOR SELECT USING (true);
  CREATE POLICY "product_ingredients_service_write" ON product_ingredients FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- TRANSLATIONS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON translations;
  DROP POLICY IF EXISTS "Service write access" ON translations;
  DROP POLICY IF EXISTS "translations_public_read" ON translations;
  DROP POLICY IF EXISTS "translations_service_write" ON translations;
  CREATE POLICY "translations_public_read" ON translations FOR SELECT USING (true);
  CREATE POLICY "translations_service_write" ON translations FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PRODUCT_TAXONOMY
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON product_taxonomy;
  DROP POLICY IF EXISTS "Service write access" ON product_taxonomy;
  DROP POLICY IF EXISTS "product_taxonomy_public_read" ON product_taxonomy;
  DROP POLICY IF EXISTS "product_taxonomy_service_write" ON product_taxonomy;
  CREATE POLICY "product_taxonomy_public_read" ON product_taxonomy FOR SELECT USING (true);
  CREATE POLICY "product_taxonomy_service_write" ON product_taxonomy FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- === ORIGINAL FOOD/BEVERAGE TABLES ===

-- APPETIZERS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON appetizers;
  DROP POLICY IF EXISTS "Service write access" ON appetizers;
  CREATE POLICY "appetizers_public_read" ON appetizers FOR SELECT USING (true);
  CREATE POLICY "appetizers_service_write" ON appetizers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- BEERS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON beers;
  DROP POLICY IF EXISTS "Service write access" ON beers;
  DROP POLICY IF EXISTS "beers_public_read" ON beers;
  DROP POLICY IF EXISTS "beers_service_write" ON beers;
  CREATE POLICY "beers_public_read" ON beers FOR SELECT USING (true);
  CREATE POLICY "beers_service_write" ON beers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- BURGERS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON burgers;
  DROP POLICY IF EXISTS "Service write access" ON burgers;
  CREATE POLICY "burgers_public_read" ON burgers FOR SELECT USING (true);
  CREATE POLICY "burgers_service_write" ON burgers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- COCKTAILS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON cocktails;
  DROP POLICY IF EXISTS "Service write access" ON cocktails;
  CREATE POLICY "cocktails_public_read" ON cocktails FOR SELECT USING (true);
  CREATE POLICY "cocktails_service_write" ON cocktails FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- COFFEE
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON coffee;
  DROP POLICY IF EXISTS "Service write access" ON coffee;
  CREATE POLICY "coffee_public_read" ON coffee FOR SELECT USING (true);
  CREATE POLICY "coffee_service_write" ON coffee FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- DESSERTS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON desserts;
  DROP POLICY IF EXISTS "Service write access" ON desserts;
  CREATE POLICY "desserts_public_read" ON desserts FOR SELECT USING (true);
  CREATE POLICY "desserts_service_write" ON desserts FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- DUMPLINGS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON dumplings;
  DROP POLICY IF EXISTS "Service write access" ON dumplings;
  CREATE POLICY "dumplings_public_read" ON dumplings FOR SELECT USING (true);
  CREATE POLICY "dumplings_service_write" ON dumplings FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PASTA
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON pasta;
  DROP POLICY IF EXISTS "Service write access" ON pasta;
  CREATE POLICY "pasta_public_read" ON pasta FOR SELECT USING (true);
  CREATE POLICY "pasta_service_write" ON pasta FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- PIZZAS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON pizzas;
  DROP POLICY IF EXISTS "Service write access" ON pizzas;
  DROP POLICY IF EXISTS "pizzas_public_read" ON pizzas;
  DROP POLICY IF EXISTS "pizzas_service_write" ON pizzas;
  CREATE POLICY "pizzas_public_read" ON pizzas FOR SELECT USING (true);
  CREATE POLICY "pizzas_service_write" ON pizzas FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- RISOTTI
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON risotti;
  DROP POLICY IF EXISTS "Service write access" ON risotti;
  DROP POLICY IF EXISTS "risotti_public_read" ON risotti;
  DROP POLICY IF EXISTS "risotti_service_write" ON risotti;
  CREATE POLICY "risotti_public_read" ON risotti FOR SELECT USING (true);
  CREATE POLICY "risotti_service_write" ON risotti FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SALADS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON salads;
  DROP POLICY IF EXISTS "Service write access" ON salads;
  DROP POLICY IF EXISTS "salads_public_read" ON salads;
  DROP POLICY IF EXISTS "salads_service_write" ON salads;
  CREATE POLICY "salads_public_read" ON salads FOR SELECT USING (true);
  CREATE POLICY "salads_service_write" ON salads FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SANDWICHES
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sandwiches;
  DROP POLICY IF EXISTS "Service write access" ON sandwiches;
  CREATE POLICY "sandwiches_public_read" ON sandwiches FOR SELECT USING (true);
  CREATE POLICY "sandwiches_service_write" ON sandwiches FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SOUPS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON soups;
  DROP POLICY IF EXISTS "Service write access" ON soups;
  CREATE POLICY "soups_public_read" ON soups FOR SELECT USING (true);
  CREATE POLICY "soups_service_write" ON soups FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- STEAKS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON steaks;
  DROP POLICY IF EXISTS "Service write access" ON steaks;
  CREATE POLICY "steaks_public_read" ON steaks FOR SELECT USING (true);
  CREATE POLICY "steaks_service_write" ON steaks FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- TEA
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON tea;
  DROP POLICY IF EXISTS "Service write access" ON tea;
  CREATE POLICY "tea_public_read" ON tea FOR SELECT USING (true);
  CREATE POLICY "tea_service_write" ON tea FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- WINES
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON wines;
  DROP POLICY IF EXISTS "Service write access" ON wines;
  DROP POLICY IF EXISTS "wines_public_read" ON wines;
  DROP POLICY IF EXISTS "wines_service_write" ON wines;
  CREATE POLICY "wines_public_read" ON wines FOR SELECT USING (true);
  CREATE POLICY "wines_service_write" ON wines FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SUSHI (was japanese)
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sushi;
  DROP POLICY IF EXISTS "Service write access" ON sushi;
  DROP POLICY IF EXISTS "sushi_public_read" ON sushi;
  DROP POLICY IF EXISTS "sushi_service_write" ON sushi;
  CREATE POLICY "sushi_public_read" ON sushi FOR SELECT USING (true);
  CREATE POLICY "sushi_service_write" ON sushi FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- === NEW TABLES (Dec 18-19) ===

-- SEAFOOD
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON seafood;
  DROP POLICY IF EXISTS "Service write access" ON seafood;
  DROP POLICY IF EXISTS "seafood_public_read" ON seafood;
  DROP POLICY IF EXISTS "seafood_service_write" ON seafood;
  CREATE POLICY "seafood_public_read" ON seafood FOR SELECT USING (true);
  CREATE POLICY "seafood_service_write" ON seafood FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- MEXICAN
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON mexican;
  DROP POLICY IF EXISTS "Service write access" ON mexican;
  DROP POLICY IF EXISTS "mexican_public_read" ON mexican;
  DROP POLICY IF EXISTS "mexican_service_write" ON mexican;
  CREATE POLICY "mexican_public_read" ON mexican FOR SELECT USING (true);
  CREATE POLICY "mexican_service_write" ON mexican FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- VEGETARIAN
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON vegetarian;
  DROP POLICY IF EXISTS "Service write access" ON vegetarian;
  DROP POLICY IF EXISTS "vegetarian_public_read" ON vegetarian;
  DROP POLICY IF EXISTS "vegetarian_service_write" ON vegetarian;
  CREATE POLICY "vegetarian_public_read" ON vegetarian FOR SELECT USING (true);
  CREATE POLICY "vegetarian_service_write" ON vegetarian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- FRIED
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON fried;
  DROP POLICY IF EXISTS "Service write access" ON fried;
  DROP POLICY IF EXISTS "fried_public_read" ON fried;
  DROP POLICY IF EXISTS "fried_service_write" ON fried;
  CREATE POLICY "fried_public_read" ON fried FOR SELECT USING (true);
  CREATE POLICY "fried_service_write" ON fried FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- BREAKFAST
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON breakfast;
  DROP POLICY IF EXISTS "Service write access" ON breakfast;
  DROP POLICY IF EXISTS "breakfast_public_read" ON breakfast;
  DROP POLICY IF EXISTS "breakfast_service_write" ON breakfast;
  CREATE POLICY "breakfast_public_read" ON breakfast FOR SELECT USING (true);
  CREATE POLICY "breakfast_service_write" ON breakfast FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- INDIAN
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON indian;
  DROP POLICY IF EXISTS "Service write access" ON indian;
  DROP POLICY IF EXISTS "indian_public_read" ON indian;
  DROP POLICY IF EXISTS "indian_service_write" ON indian;
  CREATE POLICY "indian_public_read" ON indian FOR SELECT USING (true);
  CREATE POLICY "indian_service_write" ON indian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- THAI
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON thai;
  DROP POLICY IF EXISTS "Service write access" ON thai;
  DROP POLICY IF EXISTS "thai_public_read" ON thai;
  DROP POLICY IF EXISTS "thai_service_write" ON thai;
  CREATE POLICY "thai_public_read" ON thai FOR SELECT USING (true);
  CREATE POLICY "thai_service_write" ON thai FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- CHINESE
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON chinese;
  DROP POLICY IF EXISTS "Service write access" ON chinese;
  DROP POLICY IF EXISTS "chinese_public_read" ON chinese;
  DROP POLICY IF EXISTS "chinese_service_write" ON chinese;
  CREATE POLICY "chinese_public_read" ON chinese FOR SELECT USING (true);
  CREATE POLICY "chinese_service_write" ON chinese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- KOREAN
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON korean;
  DROP POLICY IF EXISTS "Service write access" ON korean;
  DROP POLICY IF EXISTS "korean_public_read" ON korean;
  DROP POLICY IF EXISTS "korean_service_write" ON korean;
  CREATE POLICY "korean_public_read" ON korean FOR SELECT USING (true);
  CREATE POLICY "korean_service_write" ON korean FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- SPIRITS
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON spirits;
  DROP POLICY IF EXISTS "Service write access" ON spirits;
  DROP POLICY IF EXISTS "spirits_public_read" ON spirits;
  DROP POLICY IF EXISTS "spirits_service_write" ON spirits;
  CREATE POLICY "spirits_public_read" ON spirits FOR SELECT USING (true);
  CREATE POLICY "spirits_service_write" ON spirits FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- VIETNAMESE
DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON vietnamese;
  DROP POLICY IF EXISTS "Service write access" ON vietnamese;
  DROP POLICY IF EXISTS "vietnamese_public_read" ON vietnamese;
  DROP POLICY IF EXISTS "vietnamese_service_write" ON vietnamese;
  CREATE POLICY "vietnamese_public_read" ON vietnamese FOR SELECT USING (true);
  CREATE POLICY "vietnamese_service_write" ON vietnamese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =====================================================
-- STEP 3: FIX search_path ON ALL TRIGGER FUNCTIONS
-- =====================================================

-- Generic updated_at function
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

-- Table-specific updated_at functions (all 27 product tables + core tables)

CREATE OR REPLACE FUNCTION update_ingredients_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_product_ingredients_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_translations_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_product_taxonomy_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_appetizers_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_beers_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_burgers_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_cocktails_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_coffee_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_desserts_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_dumplings_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_pasta_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_pizzas_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_risotti_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_salads_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_sandwiches_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_soups_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_steaks_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_tea_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_wines_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_sushi_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- NEW tables
CREATE OR REPLACE FUNCTION update_seafood_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_mexican_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_vegetarian_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_fried_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_breakfast_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_indian_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_thai_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_chinese_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_korean_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_spirits_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_vietnamese_updated_at()
RETURNS TRIGGER SECURITY DEFINER SET search_path = public AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 4: VERIFICATION QUERIES
-- Run these after to confirm fixes applied
-- =====================================================

-- Check RLS is enabled on all tables
SELECT 'RLS STATUS' as check_type;
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'ingredients', 'product_ingredients', 'translations', 'product_taxonomy',
    'appetizers', 'beers', 'burgers', 'cocktails', 'coffee', 'desserts',
    'dumplings', 'pasta', 'pizzas', 'risotti', 'salads', 'sandwiches',
    'soups', 'steaks', 'tea', 'wines', 'sushi', 'seafood', 'mexican',
    'vegetarian', 'fried', 'breakfast', 'indian', 'thai', 'chinese',
    'korean', 'spirits', 'vietnamese'
  )
ORDER BY tablename;

-- Check policies exist
SELECT 'POLICIES' as check_type;
SELECT tablename, COUNT(*) as policy_count
FROM pg_policies
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- ============================================
-- DONE! Security fixes applied to all 31 tables
-- ============================================
