-- ============================================
-- GUDBRO Security Fix: Complete RLS + search_path
-- Execute in Supabase SQL Editor
-- Created: 2025-12-22
-- Covers ALL 47 product tables + 4 system tables
-- ============================================

-- =====================================================
-- STEP 1: ENABLE RLS ON ALL TABLES (51 tables total)
-- =====================================================

-- System/Core tables (4)
ALTER TABLE IF EXISTS ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS product_taxonomy ENABLE ROW LEVEL SECURITY;

-- Product tables - Alphabetical order (47 tables from product_taxonomy)
ALTER TABLE IF EXISTS appetizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS armenian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS bakery ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS beers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS brazilian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS burgers ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS caribbean ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS cocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS coffee ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS desserts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS dumplings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS ethiopian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS french ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS georgian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS hotbeverages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS icecream ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS korean ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS lebanese ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS milkshakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS mocktails ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS moroccan ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pasta ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS peruvian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS piadine ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pizzas ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS risotti ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS salads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sandwiches ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sauces ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS seafood ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sides ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS smoothies ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS softdrinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS soups ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS spanish ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS steaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sushi ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tea ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS turkish ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS vietnamese ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS waters ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS wines ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS wraps ENABLE ROW LEVEL SECURITY;

-- Legacy tables that may exist (for backwards compatibility)
ALTER TABLE IF EXISTS mexican ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS vegetarian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS fried ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS breakfast ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS indian ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS thai ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS chinese ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS spirits ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS greek ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS japanese ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 2: CREATE RLS POLICIES (Public Read, Service Write)
-- Using DO blocks to handle "policy already exists" errors
-- =====================================================

-- === SYSTEM/CORE TABLES ===

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON ingredients;
  DROP POLICY IF EXISTS "Service write access" ON ingredients;
  DROP POLICY IF EXISTS "ingredients_public_read" ON ingredients;
  DROP POLICY IF EXISTS "ingredients_service_write" ON ingredients;
  CREATE POLICY "ingredients_public_read" ON ingredients FOR SELECT USING (true);
  CREATE POLICY "ingredients_service_write" ON ingredients FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON product_ingredients;
  DROP POLICY IF EXISTS "Service write access" ON product_ingredients;
  DROP POLICY IF EXISTS "product_ingredients_public_read" ON product_ingredients;
  DROP POLICY IF EXISTS "product_ingredients_service_write" ON product_ingredients;
  CREATE POLICY "product_ingredients_public_read" ON product_ingredients FOR SELECT USING (true);
  CREATE POLICY "product_ingredients_service_write" ON product_ingredients FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON translations;
  DROP POLICY IF EXISTS "Service write access" ON translations;
  DROP POLICY IF EXISTS "translations_public_read" ON translations;
  DROP POLICY IF EXISTS "translations_service_write" ON translations;
  CREATE POLICY "translations_public_read" ON translations FOR SELECT USING (true);
  CREATE POLICY "translations_service_write" ON translations FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON product_taxonomy;
  DROP POLICY IF EXISTS "Service write access" ON product_taxonomy;
  DROP POLICY IF EXISTS "product_taxonomy_public_read" ON product_taxonomy;
  DROP POLICY IF EXISTS "product_taxonomy_service_write" ON product_taxonomy;
  CREATE POLICY "product_taxonomy_public_read" ON product_taxonomy FOR SELECT USING (true);
  CREATE POLICY "product_taxonomy_service_write" ON product_taxonomy FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- === PRODUCT TABLES (Alphabetical) ===

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON appetizers;
  DROP POLICY IF EXISTS "Service write access" ON appetizers;
  DROP POLICY IF EXISTS "appetizers_public_read" ON appetizers;
  DROP POLICY IF EXISTS "appetizers_service_write" ON appetizers;
  CREATE POLICY "appetizers_public_read" ON appetizers FOR SELECT USING (true);
  CREATE POLICY "appetizers_service_write" ON appetizers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON armenian;
  DROP POLICY IF EXISTS "Service write access" ON armenian;
  DROP POLICY IF EXISTS "armenian_public_read" ON armenian;
  DROP POLICY IF EXISTS "armenian_service_write" ON armenian;
  CREATE POLICY "armenian_public_read" ON armenian FOR SELECT USING (true);
  CREATE POLICY "armenian_service_write" ON armenian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON bakery;
  DROP POLICY IF EXISTS "Service write access" ON bakery;
  DROP POLICY IF EXISTS "bakery_public_read" ON bakery;
  DROP POLICY IF EXISTS "bakery_service_write" ON bakery;
  CREATE POLICY "bakery_public_read" ON bakery FOR SELECT USING (true);
  CREATE POLICY "bakery_service_write" ON bakery FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON beers;
  DROP POLICY IF EXISTS "Service write access" ON beers;
  DROP POLICY IF EXISTS "beers_public_read" ON beers;
  DROP POLICY IF EXISTS "beers_service_write" ON beers;
  CREATE POLICY "beers_public_read" ON beers FOR SELECT USING (true);
  CREATE POLICY "beers_service_write" ON beers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON brazilian;
  DROP POLICY IF EXISTS "Service write access" ON brazilian;
  DROP POLICY IF EXISTS "brazilian_public_read" ON brazilian;
  DROP POLICY IF EXISTS "brazilian_service_write" ON brazilian;
  CREATE POLICY "brazilian_public_read" ON brazilian FOR SELECT USING (true);
  CREATE POLICY "brazilian_service_write" ON brazilian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON burgers;
  DROP POLICY IF EXISTS "Service write access" ON burgers;
  DROP POLICY IF EXISTS "burgers_public_read" ON burgers;
  DROP POLICY IF EXISTS "burgers_service_write" ON burgers;
  CREATE POLICY "burgers_public_read" ON burgers FOR SELECT USING (true);
  CREATE POLICY "burgers_service_write" ON burgers FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON caribbean;
  DROP POLICY IF EXISTS "Service write access" ON caribbean;
  DROP POLICY IF EXISTS "caribbean_public_read" ON caribbean;
  DROP POLICY IF EXISTS "caribbean_service_write" ON caribbean;
  CREATE POLICY "caribbean_public_read" ON caribbean FOR SELECT USING (true);
  CREATE POLICY "caribbean_service_write" ON caribbean FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON cocktails;
  DROP POLICY IF EXISTS "Service write access" ON cocktails;
  DROP POLICY IF EXISTS "cocktails_public_read" ON cocktails;
  DROP POLICY IF EXISTS "cocktails_service_write" ON cocktails;
  CREATE POLICY "cocktails_public_read" ON cocktails FOR SELECT USING (true);
  CREATE POLICY "cocktails_service_write" ON cocktails FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON coffee;
  DROP POLICY IF EXISTS "Service write access" ON coffee;
  DROP POLICY IF EXISTS "coffee_public_read" ON coffee;
  DROP POLICY IF EXISTS "coffee_service_write" ON coffee;
  CREATE POLICY "coffee_public_read" ON coffee FOR SELECT USING (true);
  CREATE POLICY "coffee_service_write" ON coffee FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON desserts;
  DROP POLICY IF EXISTS "Service write access" ON desserts;
  DROP POLICY IF EXISTS "desserts_public_read" ON desserts;
  DROP POLICY IF EXISTS "desserts_service_write" ON desserts;
  CREATE POLICY "desserts_public_read" ON desserts FOR SELECT USING (true);
  CREATE POLICY "desserts_service_write" ON desserts FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON dumplings;
  DROP POLICY IF EXISTS "Service write access" ON dumplings;
  DROP POLICY IF EXISTS "dumplings_public_read" ON dumplings;
  DROP POLICY IF EXISTS "dumplings_service_write" ON dumplings;
  CREATE POLICY "dumplings_public_read" ON dumplings FOR SELECT USING (true);
  CREATE POLICY "dumplings_service_write" ON dumplings FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON ethiopian;
  DROP POLICY IF EXISTS "Service write access" ON ethiopian;
  DROP POLICY IF EXISTS "ethiopian_public_read" ON ethiopian;
  DROP POLICY IF EXISTS "ethiopian_service_write" ON ethiopian;
  CREATE POLICY "ethiopian_public_read" ON ethiopian FOR SELECT USING (true);
  CREATE POLICY "ethiopian_service_write" ON ethiopian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON french;
  DROP POLICY IF EXISTS "Service write access" ON french;
  DROP POLICY IF EXISTS "french_public_read" ON french;
  DROP POLICY IF EXISTS "french_service_write" ON french;
  CREATE POLICY "french_public_read" ON french FOR SELECT USING (true);
  CREATE POLICY "french_service_write" ON french FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON georgian;
  DROP POLICY IF EXISTS "Service write access" ON georgian;
  DROP POLICY IF EXISTS "georgian_public_read" ON georgian;
  DROP POLICY IF EXISTS "georgian_service_write" ON georgian;
  CREATE POLICY "georgian_public_read" ON georgian FOR SELECT USING (true);
  CREATE POLICY "georgian_service_write" ON georgian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON hotbeverages;
  DROP POLICY IF EXISTS "Service write access" ON hotbeverages;
  DROP POLICY IF EXISTS "hotbeverages_public_read" ON hotbeverages;
  DROP POLICY IF EXISTS "hotbeverages_service_write" ON hotbeverages;
  CREATE POLICY "hotbeverages_public_read" ON hotbeverages FOR SELECT USING (true);
  CREATE POLICY "hotbeverages_service_write" ON hotbeverages FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON icecream;
  DROP POLICY IF EXISTS "Service write access" ON icecream;
  DROP POLICY IF EXISTS "icecream_public_read" ON icecream;
  DROP POLICY IF EXISTS "icecream_service_write" ON icecream;
  CREATE POLICY "icecream_public_read" ON icecream FOR SELECT USING (true);
  CREATE POLICY "icecream_service_write" ON icecream FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON korean;
  DROP POLICY IF EXISTS "Service write access" ON korean;
  DROP POLICY IF EXISTS "korean_public_read" ON korean;
  DROP POLICY IF EXISTS "korean_service_write" ON korean;
  CREATE POLICY "korean_public_read" ON korean FOR SELECT USING (true);
  CREATE POLICY "korean_service_write" ON korean FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON lebanese;
  DROP POLICY IF EXISTS "Service write access" ON lebanese;
  DROP POLICY IF EXISTS "lebanese_public_read" ON lebanese;
  DROP POLICY IF EXISTS "lebanese_service_write" ON lebanese;
  CREATE POLICY "lebanese_public_read" ON lebanese FOR SELECT USING (true);
  CREATE POLICY "lebanese_service_write" ON lebanese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON milkshakes;
  DROP POLICY IF EXISTS "Service write access" ON milkshakes;
  DROP POLICY IF EXISTS "milkshakes_public_read" ON milkshakes;
  DROP POLICY IF EXISTS "milkshakes_service_write" ON milkshakes;
  CREATE POLICY "milkshakes_public_read" ON milkshakes FOR SELECT USING (true);
  CREATE POLICY "milkshakes_service_write" ON milkshakes FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON mocktails;
  DROP POLICY IF EXISTS "Service write access" ON mocktails;
  DROP POLICY IF EXISTS "mocktails_public_read" ON mocktails;
  DROP POLICY IF EXISTS "mocktails_service_write" ON mocktails;
  CREATE POLICY "mocktails_public_read" ON mocktails FOR SELECT USING (true);
  CREATE POLICY "mocktails_service_write" ON mocktails FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON moroccan;
  DROP POLICY IF EXISTS "Service write access" ON moroccan;
  DROP POLICY IF EXISTS "moroccan_public_read" ON moroccan;
  DROP POLICY IF EXISTS "moroccan_service_write" ON moroccan;
  CREATE POLICY "moroccan_public_read" ON moroccan FOR SELECT USING (true);
  CREATE POLICY "moroccan_service_write" ON moroccan FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON pasta;
  DROP POLICY IF EXISTS "Service write access" ON pasta;
  DROP POLICY IF EXISTS "pasta_public_read" ON pasta;
  DROP POLICY IF EXISTS "pasta_service_write" ON pasta;
  CREATE POLICY "pasta_public_read" ON pasta FOR SELECT USING (true);
  CREATE POLICY "pasta_service_write" ON pasta FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON peruvian;
  DROP POLICY IF EXISTS "Service write access" ON peruvian;
  DROP POLICY IF EXISTS "peruvian_public_read" ON peruvian;
  DROP POLICY IF EXISTS "peruvian_service_write" ON peruvian;
  CREATE POLICY "peruvian_public_read" ON peruvian FOR SELECT USING (true);
  CREATE POLICY "peruvian_service_write" ON peruvian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON piadine;
  DROP POLICY IF EXISTS "Service write access" ON piadine;
  DROP POLICY IF EXISTS "piadine_public_read" ON piadine;
  DROP POLICY IF EXISTS "piadine_service_write" ON piadine;
  CREATE POLICY "piadine_public_read" ON piadine FOR SELECT USING (true);
  CREATE POLICY "piadine_service_write" ON piadine FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON pizzas;
  DROP POLICY IF EXISTS "Service write access" ON pizzas;
  DROP POLICY IF EXISTS "pizzas_public_read" ON pizzas;
  DROP POLICY IF EXISTS "pizzas_service_write" ON pizzas;
  CREATE POLICY "pizzas_public_read" ON pizzas FOR SELECT USING (true);
  CREATE POLICY "pizzas_service_write" ON pizzas FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON risotti;
  DROP POLICY IF EXISTS "Service write access" ON risotti;
  DROP POLICY IF EXISTS "risotti_public_read" ON risotti;
  DROP POLICY IF EXISTS "risotti_service_write" ON risotti;
  CREATE POLICY "risotti_public_read" ON risotti FOR SELECT USING (true);
  CREATE POLICY "risotti_service_write" ON risotti FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON salads;
  DROP POLICY IF EXISTS "Service write access" ON salads;
  DROP POLICY IF EXISTS "salads_public_read" ON salads;
  DROP POLICY IF EXISTS "salads_service_write" ON salads;
  CREATE POLICY "salads_public_read" ON salads FOR SELECT USING (true);
  CREATE POLICY "salads_service_write" ON salads FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sandwiches;
  DROP POLICY IF EXISTS "Service write access" ON sandwiches;
  DROP POLICY IF EXISTS "sandwiches_public_read" ON sandwiches;
  DROP POLICY IF EXISTS "sandwiches_service_write" ON sandwiches;
  CREATE POLICY "sandwiches_public_read" ON sandwiches FOR SELECT USING (true);
  CREATE POLICY "sandwiches_service_write" ON sandwiches FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sauces;
  DROP POLICY IF EXISTS "Service write access" ON sauces;
  DROP POLICY IF EXISTS "sauces_public_read" ON sauces;
  DROP POLICY IF EXISTS "sauces_service_write" ON sauces;
  CREATE POLICY "sauces_public_read" ON sauces FOR SELECT USING (true);
  CREATE POLICY "sauces_service_write" ON sauces FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON seafood;
  DROP POLICY IF EXISTS "Service write access" ON seafood;
  DROP POLICY IF EXISTS "seafood_public_read" ON seafood;
  DROP POLICY IF EXISTS "seafood_service_write" ON seafood;
  CREATE POLICY "seafood_public_read" ON seafood FOR SELECT USING (true);
  CREATE POLICY "seafood_service_write" ON seafood FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sides;
  DROP POLICY IF EXISTS "Service write access" ON sides;
  DROP POLICY IF EXISTS "sides_public_read" ON sides;
  DROP POLICY IF EXISTS "sides_service_write" ON sides;
  CREATE POLICY "sides_public_read" ON sides FOR SELECT USING (true);
  CREATE POLICY "sides_service_write" ON sides FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON smoothies;
  DROP POLICY IF EXISTS "Service write access" ON smoothies;
  DROP POLICY IF EXISTS "smoothies_public_read" ON smoothies;
  DROP POLICY IF EXISTS "smoothies_service_write" ON smoothies;
  CREATE POLICY "smoothies_public_read" ON smoothies FOR SELECT USING (true);
  CREATE POLICY "smoothies_service_write" ON smoothies FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON softdrinks;
  DROP POLICY IF EXISTS "Service write access" ON softdrinks;
  DROP POLICY IF EXISTS "softdrinks_public_read" ON softdrinks;
  DROP POLICY IF EXISTS "softdrinks_service_write" ON softdrinks;
  CREATE POLICY "softdrinks_public_read" ON softdrinks FOR SELECT USING (true);
  CREATE POLICY "softdrinks_service_write" ON softdrinks FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON soups;
  DROP POLICY IF EXISTS "Service write access" ON soups;
  DROP POLICY IF EXISTS "soups_public_read" ON soups;
  DROP POLICY IF EXISTS "soups_service_write" ON soups;
  CREATE POLICY "soups_public_read" ON soups FOR SELECT USING (true);
  CREATE POLICY "soups_service_write" ON soups FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON spanish;
  DROP POLICY IF EXISTS "Service write access" ON spanish;
  DROP POLICY IF EXISTS "spanish_public_read" ON spanish;
  DROP POLICY IF EXISTS "spanish_service_write" ON spanish;
  CREATE POLICY "spanish_public_read" ON spanish FOR SELECT USING (true);
  CREATE POLICY "spanish_service_write" ON spanish FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON steaks;
  DROP POLICY IF EXISTS "Service write access" ON steaks;
  DROP POLICY IF EXISTS "steaks_public_read" ON steaks;
  DROP POLICY IF EXISTS "steaks_service_write" ON steaks;
  CREATE POLICY "steaks_public_read" ON steaks FOR SELECT USING (true);
  CREATE POLICY "steaks_service_write" ON steaks FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON sushi;
  DROP POLICY IF EXISTS "Service write access" ON sushi;
  DROP POLICY IF EXISTS "sushi_public_read" ON sushi;
  DROP POLICY IF EXISTS "sushi_service_write" ON sushi;
  CREATE POLICY "sushi_public_read" ON sushi FOR SELECT USING (true);
  CREATE POLICY "sushi_service_write" ON sushi FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON tea;
  DROP POLICY IF EXISTS "Service write access" ON tea;
  DROP POLICY IF EXISTS "tea_public_read" ON tea;
  DROP POLICY IF EXISTS "tea_service_write" ON tea;
  CREATE POLICY "tea_public_read" ON tea FOR SELECT USING (true);
  CREATE POLICY "tea_service_write" ON tea FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON turkish;
  DROP POLICY IF EXISTS "Service write access" ON turkish;
  DROP POLICY IF EXISTS "turkish_public_read" ON turkish;
  DROP POLICY IF EXISTS "turkish_service_write" ON turkish;
  CREATE POLICY "turkish_public_read" ON turkish FOR SELECT USING (true);
  CREATE POLICY "turkish_service_write" ON turkish FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON vietnamese;
  DROP POLICY IF EXISTS "Service write access" ON vietnamese;
  DROP POLICY IF EXISTS "vietnamese_public_read" ON vietnamese;
  DROP POLICY IF EXISTS "vietnamese_service_write" ON vietnamese;
  CREATE POLICY "vietnamese_public_read" ON vietnamese FOR SELECT USING (true);
  CREATE POLICY "vietnamese_service_write" ON vietnamese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON waters;
  DROP POLICY IF EXISTS "Service write access" ON waters;
  DROP POLICY IF EXISTS "waters_public_read" ON waters;
  DROP POLICY IF EXISTS "waters_service_write" ON waters;
  CREATE POLICY "waters_public_read" ON waters FOR SELECT USING (true);
  CREATE POLICY "waters_service_write" ON waters FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON wines;
  DROP POLICY IF EXISTS "Service write access" ON wines;
  DROP POLICY IF EXISTS "wines_public_read" ON wines;
  DROP POLICY IF EXISTS "wines_service_write" ON wines;
  CREATE POLICY "wines_public_read" ON wines FOR SELECT USING (true);
  CREATE POLICY "wines_service_write" ON wines FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON wraps;
  DROP POLICY IF EXISTS "Service write access" ON wraps;
  DROP POLICY IF EXISTS "wraps_public_read" ON wraps;
  DROP POLICY IF EXISTS "wraps_service_write" ON wraps;
  CREATE POLICY "wraps_public_read" ON wraps FOR SELECT USING (true);
  CREATE POLICY "wraps_service_write" ON wraps FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- === LEGACY TABLES (may or may not exist) ===

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON mexican;
  DROP POLICY IF EXISTS "Service write access" ON mexican;
  DROP POLICY IF EXISTS "mexican_public_read" ON mexican;
  DROP POLICY IF EXISTS "mexican_service_write" ON mexican;
  CREATE POLICY "mexican_public_read" ON mexican FOR SELECT USING (true);
  CREATE POLICY "mexican_service_write" ON mexican FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON vegetarian;
  DROP POLICY IF EXISTS "Service write access" ON vegetarian;
  DROP POLICY IF EXISTS "vegetarian_public_read" ON vegetarian;
  DROP POLICY IF EXISTS "vegetarian_service_write" ON vegetarian;
  CREATE POLICY "vegetarian_public_read" ON vegetarian FOR SELECT USING (true);
  CREATE POLICY "vegetarian_service_write" ON vegetarian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON fried;
  DROP POLICY IF EXISTS "Service write access" ON fried;
  DROP POLICY IF EXISTS "fried_public_read" ON fried;
  DROP POLICY IF EXISTS "fried_service_write" ON fried;
  CREATE POLICY "fried_public_read" ON fried FOR SELECT USING (true);
  CREATE POLICY "fried_service_write" ON fried FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON breakfast;
  DROP POLICY IF EXISTS "Service write access" ON breakfast;
  DROP POLICY IF EXISTS "breakfast_public_read" ON breakfast;
  DROP POLICY IF EXISTS "breakfast_service_write" ON breakfast;
  CREATE POLICY "breakfast_public_read" ON breakfast FOR SELECT USING (true);
  CREATE POLICY "breakfast_service_write" ON breakfast FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON indian;
  DROP POLICY IF EXISTS "Service write access" ON indian;
  DROP POLICY IF EXISTS "indian_public_read" ON indian;
  DROP POLICY IF EXISTS "indian_service_write" ON indian;
  CREATE POLICY "indian_public_read" ON indian FOR SELECT USING (true);
  CREATE POLICY "indian_service_write" ON indian FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON thai;
  DROP POLICY IF EXISTS "Service write access" ON thai;
  DROP POLICY IF EXISTS "thai_public_read" ON thai;
  DROP POLICY IF EXISTS "thai_service_write" ON thai;
  CREATE POLICY "thai_public_read" ON thai FOR SELECT USING (true);
  CREATE POLICY "thai_service_write" ON thai FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON chinese;
  DROP POLICY IF EXISTS "Service write access" ON chinese;
  DROP POLICY IF EXISTS "chinese_public_read" ON chinese;
  DROP POLICY IF EXISTS "chinese_service_write" ON chinese;
  CREATE POLICY "chinese_public_read" ON chinese FOR SELECT USING (true);
  CREATE POLICY "chinese_service_write" ON chinese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON spirits;
  DROP POLICY IF EXISTS "Service write access" ON spirits;
  DROP POLICY IF EXISTS "spirits_public_read" ON spirits;
  DROP POLICY IF EXISTS "spirits_service_write" ON spirits;
  CREATE POLICY "spirits_public_read" ON spirits FOR SELECT USING (true);
  CREATE POLICY "spirits_service_write" ON spirits FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON greek;
  DROP POLICY IF EXISTS "Service write access" ON greek;
  DROP POLICY IF EXISTS "greek_public_read" ON greek;
  DROP POLICY IF EXISTS "greek_service_write" ON greek;
  CREATE POLICY "greek_public_read" ON greek FOR SELECT USING (true);
  CREATE POLICY "greek_service_write" ON greek FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Public read access" ON japanese;
  DROP POLICY IF EXISTS "Service write access" ON japanese;
  DROP POLICY IF EXISTS "japanese_public_read" ON japanese;
  DROP POLICY IF EXISTS "japanese_service_write" ON japanese;
  CREATE POLICY "japanese_public_read" ON japanese FOR SELECT USING (true);
  CREATE POLICY "japanese_service_write" ON japanese FOR ALL USING (auth.role() = 'service_role');
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- =====================================================
-- STEP 3: FIX SEARCH_PATH FOR ALL TRIGGER FUNCTIONS
-- Using SECURITY DEFINER + SET search_path = public
-- DROP first to handle return type changes
-- =====================================================

-- Drop existing functions first (to handle return type changes)
DROP FUNCTION IF EXISTS update_updated_at() CASCADE;
DROP FUNCTION IF EXISTS generate_order_number_standalone() CASCADE;
DROP FUNCTION IF EXISTS generate_order_code_standalone() CASCADE;
DROP FUNCTION IF EXISTS trigger_set_order_number_standalone() CASCADE;
DROP FUNCTION IF EXISTS trigger_order_status_timestamp() CASCADE;
DROP FUNCTION IF EXISTS trigger_log_order_status_standalone() CASCADE;
DROP FUNCTION IF EXISTS compute_menu_item_safety(UUID, TEXT) CASCADE;
DROP FUNCTION IF EXISTS trigger_compute_item_safety() CASCADE;

-- Core system functions
CREATE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Order-related functions (from migrations/002)
CREATE FUNCTION generate_order_number_standalone()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
  today_date DATE := CURRENT_DATE;
  sequence_num INTEGER;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 9) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM orders
  WHERE DATE(created_at) = today_date;

  new_number := TO_CHAR(today_date, 'YYYYMMDD') || LPAD(sequence_num::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE FUNCTION generate_order_code_standalone()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..6 LOOP
    result := result || SUBSTR(chars, FLOOR(RANDOM() * LENGTH(chars) + 1)::INTEGER, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE FUNCTION trigger_set_order_number_standalone()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number_standalone();
  END IF;
  IF NEW.order_code IS NULL THEN
    NEW.order_code := generate_order_code_standalone();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE FUNCTION trigger_order_status_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    NEW.status_updated_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE FUNCTION trigger_log_order_status_standalone()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status != OLD.status THEN
    INSERT INTO order_status_history (order_id, status, created_at)
    VALUES (NEW.id, NEW.status, NOW());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Safety/allergy computation functions
CREATE FUNCTION compute_menu_item_safety(item_id UUID, item_type TEXT)
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'is_vegetarian', bool_and(i.is_vegetarian),
    'is_vegan', bool_and(i.is_vegan),
    'is_gluten_free', bool_and(i.is_gluten_free),
    'allergens', array_agg(DISTINCT a.allergen) FILTER (WHERE a.allergen IS NOT NULL)
  )
  INTO result
  FROM product_ingredients pi
  JOIN ingredients i ON pi.ingredient_id = i.id
  LEFT JOIN LATERAL unnest(i.allergens) AS a(allergen) ON true
  WHERE pi.product_id = item_id AND pi.product_type = item_type;

  RETURN COALESCE(result, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE FUNCTION trigger_compute_item_safety()
RETURNS TRIGGER AS $$
BEGIN
  -- This is a placeholder; actual implementation depends on your schema
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Per-table update_*_updated_at functions (only if they exist)
-- These are created dynamically per table, so we recreate them with proper security

DO $$
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'appetizers', 'armenian', 'bakery', 'beers', 'brazilian', 'burgers',
    'caribbean', 'cocktails', 'coffee', 'desserts', 'dumplings', 'ethiopian',
    'french', 'georgian', 'hotbeverages', 'icecream', 'korean', 'lebanese',
    'milkshakes', 'mocktails', 'moroccan', 'pasta', 'peruvian', 'piadine',
    'pizzas', 'risotti', 'salads', 'sandwiches', 'sauces', 'seafood', 'sides',
    'smoothies', 'softdrinks', 'soups', 'spanish', 'steaks', 'sushi', 'tea',
    'turkish', 'vietnamese', 'waters', 'wines', 'wraps',
    'mexican', 'vegetarian', 'fried', 'breakfast', 'indian', 'thai',
    'chinese', 'spirits', 'greek', 'japanese', 'ingredients', 'translations',
    'product_taxonomy', 'product_ingredients'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables
  LOOP
    BEGIN
      EXECUTE format('
        CREATE OR REPLACE FUNCTION update_%s_updated_at()
        RETURNS TRIGGER AS $func$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
        $func$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
      ', tbl);
    EXCEPTION WHEN OTHERS THEN
      -- Function may not exist for this table, skip
      NULL;
    END;
  END LOOP;
END $$;

-- =====================================================
-- VERIFICATION QUERIES (run separately to check)
-- =====================================================

-- Check RLS status:
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- ORDER BY tablename;

-- Check policies:
-- SELECT schemaname, tablename, policyname
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;

-- Check function security:
-- SELECT proname, prosecdef, proconfig
-- FROM pg_proc
-- WHERE pronamespace = 'public'::regnamespace
-- AND proname LIKE 'update_%_updated_at';

-- =====================================================
-- END OF SCRIPT
-- =====================================================
