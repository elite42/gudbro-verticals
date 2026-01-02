-- ============================================
-- DISH-TYPE-SYSTEM - Sistema Classificazione Universale
-- Aggiunge campo dish_type a tutte le tabelle food
-- Created: 2025-12-22
-- ============================================

-- =====================================================
-- VALORI DISH_TYPE STANDARDIZZATI:
-- appetizer  - antipasti, tapas, starters, mezze
-- main       - piatti principali, secondi, entrees
-- side       - contorni
-- soup       - zuppe, brodi, stews
-- salad      - insalate
-- bread      - pane, focacce, flatbreads
-- sauce      - salse, condimenti, dips
-- dessert    - dolci, pasticceria
-- rice       - piatti a base di riso (paella, risotto)
-- pasta      - piatti a base di pasta
-- pizza      - pizze
-- sandwich   - panini, piadine, wraps, burgers
-- grill      - grigliate, BBQ, steaks
-- dumpling   - ravioli, gyoza, dim sum
-- egg        - piatti a base di uova
-- breakfast  - colazione
-- fried      - fritti
-- seafood    - frutti di mare come piatto principale
-- cheese     - formaggi, fondute
-- cured      - salumi, affettati
-- =====================================================

-- =====================================================
-- STEP 1: Aggiungere colonna dish_type a tutte le tabelle food
-- =====================================================

-- Cucine nazionali (già hanno category)
ALTER TABLE moroccan ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE french ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE spanish ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE ethiopian ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE lebanese ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE turkish ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE greek ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE georgian ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE brazilian ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE peruvian ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE vietnamese ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE korean ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE indian ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE thai ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE chinese ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE mexican ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE caribbean ADD COLUMN IF NOT EXISTS dish_type TEXT;

-- Tabelle per tipo piatto
ALTER TABLE appetizers ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE desserts ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE soups ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE salads ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE sides ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE sauces ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE bakery ADD COLUMN IF NOT EXISTS dish_type TEXT;

-- Tabelle specifiche
ALTER TABLE pasta ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE pizzas ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE risotti ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE burgers ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE sandwiches ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE piadine ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE steaks ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE seafood ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE dumplings ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE icecream ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE breakfast ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE fried ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE vegetarian ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE japanese ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE wraps ADD COLUMN IF NOT EXISTS dish_type TEXT;
ALTER TABLE armenian ADD COLUMN IF NOT EXISTS dish_type TEXT;

-- =====================================================
-- STEP 2: Backfill - Tabelle con tipo implicito nel nome
-- =====================================================

-- Tabelle dove il nome = dish_type
UPDATE appetizers SET dish_type = 'appetizer' WHERE dish_type IS NULL;
UPDATE desserts SET dish_type = 'dessert' WHERE dish_type IS NULL;
UPDATE soups SET dish_type = 'soup' WHERE dish_type IS NULL;
UPDATE salads SET dish_type = 'salad' WHERE dish_type IS NULL;
UPDATE sides SET dish_type = 'side' WHERE dish_type IS NULL;
UPDATE sauces SET dish_type = 'sauce' WHERE dish_type IS NULL;
UPDATE pasta SET dish_type = 'pasta' WHERE dish_type IS NULL;
UPDATE pizzas SET dish_type = 'pizza' WHERE dish_type IS NULL;
UPDATE risotti SET dish_type = 'rice' WHERE dish_type IS NULL;
UPDATE burgers SET dish_type = 'sandwich' WHERE dish_type IS NULL;
UPDATE sandwiches SET dish_type = 'sandwich' WHERE dish_type IS NULL;
UPDATE piadine SET dish_type = 'sandwich' WHERE dish_type IS NULL;
UPDATE steaks SET dish_type = 'grill' WHERE dish_type IS NULL;
UPDATE dumplings SET dish_type = 'dumpling' WHERE dish_type IS NULL;
UPDATE icecream SET dish_type = 'dessert' WHERE dish_type IS NULL;
UPDATE bakery SET dish_type = 'bread' WHERE dish_type IS NULL;
UPDATE breakfast SET dish_type = 'breakfast' WHERE dish_type IS NULL;
UPDATE fried SET dish_type = 'fried' WHERE dish_type IS NULL;
UPDATE japanese SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE wraps SET dish_type = 'sandwich' WHERE dish_type IS NULL;
UPDATE armenian SET dish_type = 'main' WHERE dish_type IS NULL;

-- Seafood: check category se esiste, altrimenti main
UPDATE seafood SET dish_type = 'seafood' WHERE dish_type IS NULL;

-- =====================================================
-- STEP 3: Backfill - MOROCCAN (basato su category)
-- =====================================================

UPDATE moroccan SET dish_type = CASE category
  WHEN 'tagine' THEN 'main'
  WHEN 'couscous' THEN 'rice'
  WHEN 'soup' THEN 'soup'
  WHEN 'pastry' THEN 'dessert'
  WHEN 'grill' THEN 'grill'
  WHEN 'salad' THEN 'salad'
  WHEN 'bread' THEN 'bread'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 4: Backfill - FRENCH (basato su category)
-- =====================================================

UPDATE french SET dish_type = CASE category
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'main' THEN 'main'
  WHEN 'seafood' THEN 'seafood'
  WHEN 'bistro' THEN 'main'
  WHEN 'regional' THEN 'main'
  WHEN 'sauce' THEN 'sauce'
  WHEN 'cheese' THEN 'cheese'
  WHEN 'pastry' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 5: Backfill - SPANISH (basato su category)
-- =====================================================

UPDATE spanish SET dish_type = CASE category
  WHEN 'tapas' THEN 'appetizer'
  WHEN 'rice' THEN 'rice'
  WHEN 'seafood' THEN 'seafood'
  WHEN 'meat' THEN 'main'
  WHEN 'soup' THEN 'soup'
  WHEN 'egg' THEN 'egg'
  WHEN 'cured' THEN 'cured'
  WHEN 'dessert' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 6: Backfill - ETHIOPIAN (basato su category)
-- =====================================================

UPDATE ethiopian SET dish_type = CASE category
  WHEN 'wot' THEN 'main'
  WHEN 'tibs' THEN 'grill'
  WHEN 'kitfo' THEN 'main'
  WHEN 'vegetarian' THEN 'side'
  WHEN 'bread' THEN 'bread'
  WHEN 'breakfast' THEN 'breakfast'
  WHEN 'beverage' THEN 'main'  -- beverages in food table = specialty items
  WHEN 'combo' THEN 'main'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 7: Backfill - LEBANESE (basato su category)
-- =====================================================

UPDATE lebanese SET dish_type = CASE category
  WHEN 'mezze' THEN 'appetizer'
  WHEN 'mezze_cold' THEN 'appetizer'
  WHEN 'mezze_hot' THEN 'appetizer'
  WHEN 'grill' THEN 'grill'
  WHEN 'main' THEN 'main'
  WHEN 'bread' THEN 'bread'
  WHEN 'salad' THEN 'salad'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'wrap' THEN 'sandwich'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 8: Backfill - TURKISH (basato su category)
-- =====================================================

UPDATE turkish SET dish_type = CASE category
  WHEN 'mezze' THEN 'appetizer'
  WHEN 'kebab' THEN 'grill'
  WHEN 'pide' THEN 'bread'
  WHEN 'lahmacun' THEN 'bread'
  WHEN 'main' THEN 'main'
  WHEN 'soup' THEN 'soup'
  WHEN 'salad' THEN 'salad'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'breakfast' THEN 'breakfast'
  WHEN 'borek' THEN 'appetizer'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 9: Backfill - GREEK (basato su category)
-- =====================================================

UPDATE greek SET dish_type = CASE category
  WHEN 'mezze' THEN 'appetizer'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'salad' THEN 'salad'
  WHEN 'main' THEN 'main'
  WHEN 'grill' THEN 'grill'
  WHEN 'seafood' THEN 'seafood'
  WHEN 'pie' THEN 'appetizer'
  WHEN 'dessert' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 10: Backfill - GEORGIAN (basato su category)
-- =====================================================

UPDATE georgian SET dish_type = CASE category
  WHEN 'khachapuri' THEN 'bread'
  WHEN 'khinkali' THEN 'dumpling'
  WHEN 'main' THEN 'main'
  WHEN 'grill' THEN 'grill'
  WHEN 'salad' THEN 'salad'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'soup' THEN 'soup'
  WHEN 'dessert' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 11: Backfill - BRAZILIAN (basato su category)
-- =====================================================

UPDATE brazilian SET dish_type = CASE category
  WHEN 'churrasco' THEN 'grill'
  WHEN 'feijoada' THEN 'main'
  WHEN 'main' THEN 'main'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'street_food' THEN 'appetizer'
  WHEN 'side' THEN 'side'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'beverage' THEN 'main'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 12: Backfill - PERUVIAN (basato su category)
-- =====================================================

UPDATE peruvian SET dish_type = CASE category
  WHEN 'ceviche' THEN 'appetizer'
  WHEN 'tiradito' THEN 'appetizer'
  WHEN 'main' THEN 'main'
  WHEN 'anticucho' THEN 'grill'
  WHEN 'soup' THEN 'soup'
  WHEN 'rice' THEN 'rice'
  WHEN 'side' THEN 'side'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'nikkei' THEN 'main'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 13: Backfill - VIETNAMESE (basato su category)
-- =====================================================

UPDATE vietnamese SET dish_type = CASE category
  WHEN 'pho' THEN 'soup'
  WHEN 'soup' THEN 'soup'
  WHEN 'noodle' THEN 'pasta'
  WHEN 'rice' THEN 'rice'
  WHEN 'banh_mi' THEN 'sandwich'
  WHEN 'roll' THEN 'appetizer'
  WHEN 'spring_roll' THEN 'appetizer'
  WHEN 'main' THEN 'main'
  WHEN 'grill' THEN 'grill'
  WHEN 'dessert' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 14: Backfill - KOREAN (basato su category)
-- =====================================================

UPDATE korean SET dish_type = CASE category
  WHEN 'soup' THEN 'soup'
  WHEN 'stew' THEN 'soup'
  WHEN 'jjigae' THEN 'soup'
  WHEN 'rice' THEN 'rice'
  WHEN 'noodle' THEN 'pasta'
  WHEN 'grill' THEN 'grill'
  WHEN 'bbq' THEN 'grill'
  WHEN 'side' THEN 'side'
  WHEN 'banchan' THEN 'side'
  WHEN 'fried' THEN 'fried'
  WHEN 'appetizer' THEN 'appetizer'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 15: Backfill - INDIAN (basato su category)
-- =====================================================

UPDATE indian SET dish_type = CASE category
  WHEN 'curry' THEN 'main'
  WHEN 'tandoor' THEN 'grill'
  WHEN 'biryani' THEN 'rice'
  WHEN 'bread' THEN 'bread'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'chaat' THEN 'appetizer'
  WHEN 'side' THEN 'side'
  WHEN 'dal' THEN 'side'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'rice' THEN 'rice'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 16: Backfill - THAI (basato su category)
-- =====================================================

UPDATE thai SET dish_type = CASE category
  WHEN 'curry' THEN 'main'
  WHEN 'soup' THEN 'soup'
  WHEN 'noodle' THEN 'pasta'
  WHEN 'rice' THEN 'rice'
  WHEN 'stir_fry' THEN 'main'
  WHEN 'salad' THEN 'salad'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'grill' THEN 'grill'
  WHEN 'dessert' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 17: Backfill - CHINESE (basato su category)
-- =====================================================

UPDATE chinese SET dish_type = CASE category
  WHEN 'dim_sum' THEN 'dumpling'
  WHEN 'dumpling' THEN 'dumpling'
  WHEN 'noodle' THEN 'pasta'
  WHEN 'rice' THEN 'rice'
  WHEN 'soup' THEN 'soup'
  WHEN 'stir_fry' THEN 'main'
  WHEN 'main' THEN 'main'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'roast' THEN 'main'
  WHEN 'dessert' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 18: Backfill - MEXICAN (basato su category)
-- =====================================================

UPDATE mexican SET dish_type = CASE category
  WHEN 'taco' THEN 'sandwich'
  WHEN 'burrito' THEN 'sandwich'
  WHEN 'quesadilla' THEN 'sandwich'
  WHEN 'enchilada' THEN 'main'
  WHEN 'main' THEN 'main'
  WHEN 'soup' THEN 'soup'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'salsa' THEN 'sauce'
  WHEN 'side' THEN 'side'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'rice' THEN 'rice'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 19: Backfill - CARIBBEAN (basato su category)
-- =====================================================

UPDATE caribbean SET dish_type = CASE category
  WHEN 'jerk' THEN 'grill'
  WHEN 'main' THEN 'main'
  WHEN 'rice' THEN 'rice'
  WHEN 'soup' THEN 'soup'
  WHEN 'side' THEN 'side'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'seafood' THEN 'seafood'
  WHEN 'dessert' THEN 'dessert'
  WHEN 'pastry' THEN 'appetizer'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 20: Backfill - VEGETARIAN (basato su category)
-- =====================================================

UPDATE vegetarian SET dish_type = CASE category
  WHEN 'main' THEN 'main'
  WHEN 'appetizer' THEN 'appetizer'
  WHEN 'salad' THEN 'salad'
  WHEN 'soup' THEN 'soup'
  WHEN 'side' THEN 'side'
  WHEN 'bowl' THEN 'main'
  WHEN 'pasta' THEN 'pasta'
  WHEN 'curry' THEN 'main'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 21: Backfill - JAPANESE (basato su category)
-- =====================================================

UPDATE japanese SET dish_type = CASE category
  WHEN 'nigiri' THEN 'main'
  WHEN 'sashimi' THEN 'main'
  WHEN 'maki' THEN 'main'
  WHEN 'uramaki' THEN 'main'
  WHEN 'specialty_roll' THEN 'main'
  WHEN 'gunkan' THEN 'main'
  WHEN 'temaki' THEN 'main'
  WHEN 'chirashi' THEN 'rice'
  WHEN 'donburi' THEN 'rice'
  WHEN 'inari' THEN 'main'
  WHEN 'temari' THEN 'main'
  WHEN 'oshizushi' THEN 'main'
  WHEN 'ramen' THEN 'soup'
  WHEN 'udon_soba' THEN 'pasta'
  WHEN 'tempura' THEN 'fried'
  WHEN 'tonkatsu' THEN 'fried'
  WHEN 'yakitori' THEN 'grill'
  WHEN 'izakaya' THEN 'appetizer'
  WHEN 'nabemono' THEN 'soup'
  WHEN 'yoshoku' THEN 'main'
  WHEN 'comfort_food' THEN 'main'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 22: Backfill - ARMENIAN (basato su category)
-- =====================================================

UPDATE armenian SET dish_type = CASE category
  WHEN 'grilled_meats' THEN 'grill'
  WHEN 'dolma_sarma' THEN 'main'
  WHEN 'soups' THEN 'soup'
  WHEN 'dumplings' THEN 'dumpling'
  WHEN 'stews_mains' THEN 'main'
  WHEN 'appetizers_mezze' THEN 'appetizer'
  WHEN 'salads_sides' THEN 'side'
  WHEN 'breads' THEN 'bread'
  WHEN 'rice_grains' THEN 'rice'
  WHEN 'desserts' THEN 'dessert'
  ELSE 'main'
END WHERE dish_type IS NULL;

-- =====================================================
-- STEP 23: Fallback - Imposta 'main' dove ancora NULL
-- =====================================================

UPDATE moroccan SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE french SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE spanish SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE ethiopian SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE lebanese SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE turkish SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE greek SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE georgian SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE brazilian SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE peruvian SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE vietnamese SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE korean SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE indian SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE thai SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE chinese SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE mexican SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE caribbean SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE vegetarian SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE japanese SET dish_type = 'main' WHERE dish_type IS NULL;
UPDATE wraps SET dish_type = 'sandwich' WHERE dish_type IS NULL;
UPDATE armenian SET dish_type = 'main' WHERE dish_type IS NULL;

-- =====================================================
-- STEP 24: Creare indexes per query efficienti
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_moroccan_dish_type ON moroccan(dish_type);
CREATE INDEX IF NOT EXISTS idx_french_dish_type ON french(dish_type);
CREATE INDEX IF NOT EXISTS idx_spanish_dish_type ON spanish(dish_type);
CREATE INDEX IF NOT EXISTS idx_ethiopian_dish_type ON ethiopian(dish_type);
CREATE INDEX IF NOT EXISTS idx_lebanese_dish_type ON lebanese(dish_type);
CREATE INDEX IF NOT EXISTS idx_turkish_dish_type ON turkish(dish_type);
CREATE INDEX IF NOT EXISTS idx_greek_dish_type ON greek(dish_type);
CREATE INDEX IF NOT EXISTS idx_georgian_dish_type ON georgian(dish_type);
CREATE INDEX IF NOT EXISTS idx_brazilian_dish_type ON brazilian(dish_type);
CREATE INDEX IF NOT EXISTS idx_peruvian_dish_type ON peruvian(dish_type);
CREATE INDEX IF NOT EXISTS idx_vietnamese_dish_type ON vietnamese(dish_type);
CREATE INDEX IF NOT EXISTS idx_korean_dish_type ON korean(dish_type);
CREATE INDEX IF NOT EXISTS idx_indian_dish_type ON indian(dish_type);
CREATE INDEX IF NOT EXISTS idx_thai_dish_type ON thai(dish_type);
CREATE INDEX IF NOT EXISTS idx_chinese_dish_type ON chinese(dish_type);
CREATE INDEX IF NOT EXISTS idx_mexican_dish_type ON mexican(dish_type);
CREATE INDEX IF NOT EXISTS idx_caribbean_dish_type ON caribbean(dish_type);
CREATE INDEX IF NOT EXISTS idx_appetizers_dish_type ON appetizers(dish_type);
CREATE INDEX IF NOT EXISTS idx_desserts_dish_type ON desserts(dish_type);
CREATE INDEX IF NOT EXISTS idx_soups_dish_type ON soups(dish_type);
CREATE INDEX IF NOT EXISTS idx_salads_dish_type ON salads(dish_type);
CREATE INDEX IF NOT EXISTS idx_sides_dish_type ON sides(dish_type);
CREATE INDEX IF NOT EXISTS idx_sauces_dish_type ON sauces(dish_type);
CREATE INDEX IF NOT EXISTS idx_pasta_dish_type ON pasta(dish_type);
CREATE INDEX IF NOT EXISTS idx_pizzas_dish_type ON pizzas(dish_type);
CREATE INDEX IF NOT EXISTS idx_risotti_dish_type ON risotti(dish_type);
CREATE INDEX IF NOT EXISTS idx_burgers_dish_type ON burgers(dish_type);
CREATE INDEX IF NOT EXISTS idx_sandwiches_dish_type ON sandwiches(dish_type);
CREATE INDEX IF NOT EXISTS idx_piadine_dish_type ON piadine(dish_type);
CREATE INDEX IF NOT EXISTS idx_steaks_dish_type ON steaks(dish_type);
CREATE INDEX IF NOT EXISTS idx_seafood_dish_type ON seafood(dish_type);
CREATE INDEX IF NOT EXISTS idx_dumplings_dish_type ON dumplings(dish_type);
CREATE INDEX IF NOT EXISTS idx_icecream_dish_type ON icecream(dish_type);
CREATE INDEX IF NOT EXISTS idx_bakery_dish_type ON bakery(dish_type);
CREATE INDEX IF NOT EXISTS idx_breakfast_dish_type ON breakfast(dish_type);
CREATE INDEX IF NOT EXISTS idx_fried_dish_type ON fried(dish_type);
CREATE INDEX IF NOT EXISTS idx_vegetarian_dish_type ON vegetarian(dish_type);
CREATE INDEX IF NOT EXISTS idx_japanese_dish_type ON japanese(dish_type);
CREATE INDEX IF NOT EXISTS idx_wraps_dish_type ON wraps(dish_type);
CREATE INDEX IF NOT EXISTS idx_armenian_dish_type ON armenian(dish_type);

-- =====================================================
-- STEP 23: Verifica (eseguire separatamente)
-- =====================================================

-- SELECT dish_type, COUNT(*) as count
-- FROM (
--   SELECT dish_type FROM moroccan
--   UNION ALL SELECT dish_type FROM french
--   UNION ALL SELECT dish_type FROM spanish
--   UNION ALL SELECT dish_type FROM appetizers
--   UNION ALL SELECT dish_type FROM desserts
--   -- ... altre tabelle
-- ) all_dishes
-- GROUP BY dish_type
-- ORDER BY count DESC;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
