-- ============================================
-- GUDBRO Product Taxonomy - Complete Import
-- Version: 1.0
-- Run this in Supabase SQL Editor
-- ============================================
--
-- This file contains:
-- 1. Schema creation (from create-product-taxonomy-table.sql)
-- 2. Initial data for all 18 product databases
--
-- ============================================


-- ============================================
-- PART 1: SCHEMA
-- ============================================

-- Drop if exists (for clean re-runs)
DROP TABLE IF EXISTS product_taxonomy CASCADE;

CREATE TABLE product_taxonomy (
  id SERIAL PRIMARY KEY,
  product_type TEXT NOT NULL,
  product_id TEXT DEFAULT NULL,
  service_type TEXT NOT NULL
    CHECK (service_type IN ('food', 'beverage')),
  menu_type TEXT NOT NULL
    CHECK (menu_type IN (
      'traditional_course',
      'standalone',
      'bar_menu',
      'cafe_menu',
      'side_dish'
    )),
  category TEXT NOT NULL
    CHECK (category IN (
      'appetizer', 'first_course', 'second_course', 'side', 'dessert',
      'pizza', 'burger', 'sandwich', 'sushi', 'dumpling',
      'cocktail', 'wine', 'beer', 'coffee', 'tea', 'soft_drink', 'juice', 'smoothie'
    )),
  subcategory TEXT DEFAULT NULL,
  course_order INT DEFAULT NULL,
  display_order INT DEFAULT 0,
  display_name_en TEXT NOT NULL,
  display_name_it TEXT,
  display_name_vi TEXT,
  display_name_ko TEXT,
  display_name_ja TEXT,
  description_en TEXT,
  icon TEXT,
  is_alcoholic BOOLEAN DEFAULT FALSE,
  is_hot_served BOOLEAN DEFAULT NULL,
  requires_cooking BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_type, product_id)
);

-- Indexes
CREATE INDEX idx_taxonomy_product_type ON product_taxonomy(product_type);
CREATE INDEX idx_taxonomy_product_id ON product_taxonomy(product_id) WHERE product_id IS NOT NULL;
CREATE INDEX idx_taxonomy_service_type ON product_taxonomy(service_type);
CREATE INDEX idx_taxonomy_menu_type ON product_taxonomy(menu_type);
CREATE INDEX idx_taxonomy_category ON product_taxonomy(category);
CREATE INDEX idx_taxonomy_subcategory ON product_taxonomy(subcategory) WHERE subcategory IS NOT NULL;
CREATE INDEX idx_taxonomy_course_order ON product_taxonomy(course_order) WHERE course_order IS NOT NULL;
CREATE INDEX idx_taxonomy_display_order ON product_taxonomy(display_order);
CREATE INDEX idx_taxonomy_menu_builder ON product_taxonomy(service_type, menu_type, course_order, display_order);

-- RLS
ALTER TABLE product_taxonomy ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON product_taxonomy
  FOR SELECT USING (true);

CREATE POLICY "Service write access" ON product_taxonomy
  FOR ALL USING (auth.role() = 'service_role');

-- Trigger
CREATE OR REPLACE FUNCTION update_product_taxonomy_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER product_taxonomy_updated_at
  BEFORE UPDATE ON product_taxonomy
  FOR EACH ROW
  EXECUTE FUNCTION update_product_taxonomy_updated_at();

-- Comments
COMMENT ON TABLE product_taxonomy IS 'GUDBRO Product Taxonomy - Unified classification for all 18+ product databases';


-- ============================================
-- PART 2: DATA - BEVERAGES (Bar Menu)
-- ============================================

INSERT INTO product_taxonomy (
  product_type, service_type, menu_type, category, subcategory,
  course_order, display_order,
  display_name_en, display_name_it, display_name_vi, display_name_ko, display_name_ja,
  description_en, icon, is_alcoholic, is_hot_served, requires_cooking
) VALUES

-- COCKTAILS
(
  'cocktails', 'beverage', 'bar_menu', 'cocktail', NULL,
  NULL, 1,
  'Cocktails', 'Cocktail', 'Cocktail', '칵테일', 'カクテル',
  'Mixed alcoholic drinks and classic cocktails', '🍸',
  TRUE, FALSE, FALSE
),

-- WINES
(
  'wines', 'beverage', 'bar_menu', 'wine', NULL,
  NULL, 2,
  'Wines', 'Vini', 'Rượu vang', '와인', 'ワイン',
  'Red, white, sparkling, and dessert wines from around the world', '🍷',
  TRUE, FALSE, FALSE
),

-- BEERS
(
  'beers', 'beverage', 'bar_menu', 'beer', NULL,
  NULL, 3,
  'Beers', 'Birre', 'Bia', '맥주', 'ビール',
  'Craft beers, lagers, ales, and stouts', '🍺',
  TRUE, FALSE, FALSE
);


-- ============================================
-- PART 3: DATA - BEVERAGES (Cafe Menu)
-- ============================================

INSERT INTO product_taxonomy (
  product_type, service_type, menu_type, category, subcategory,
  course_order, display_order,
  display_name_en, display_name_it, display_name_vi, display_name_ko, display_name_ja,
  description_en, icon, is_alcoholic, is_hot_served, requires_cooking
) VALUES

-- COFFEE
(
  'coffee', 'beverage', 'cafe_menu', 'coffee', NULL,
  NULL, 1,
  'Coffee', 'Caffè', 'Cà phê', '커피', 'コーヒー',
  'Espresso drinks, filter coffee, and specialty coffees', '☕',
  FALSE, TRUE, FALSE
),

-- TEA & INFUSIONS
(
  'tea', 'beverage', 'cafe_menu', 'tea', NULL,
  NULL, 2,
  'Tea & Infusions', 'Tè e Infusi', 'Trà', '차', 'お茶',
  'Black tea, green tea, herbal infusions, and specialty teas', '🍵',
  FALSE, TRUE, FALSE
);


-- ============================================
-- PART 4: DATA - FOOD (Traditional Course Menu)
-- ============================================

INSERT INTO product_taxonomy (
  product_type, service_type, menu_type, category, subcategory,
  course_order, display_order,
  display_name_en, display_name_it, display_name_vi, display_name_ko, display_name_ja,
  description_en, icon, is_alcoholic, is_hot_served, requires_cooking
) VALUES

-- APPETIZERS (Course 1)
(
  'appetizers', 'food', 'traditional_course', 'appetizer', NULL,
  1, 1,
  'Appetizers', 'Antipasti', 'Khai vị', '에피타이저', '前菜',
  'Starters, small plates, and shared appetizers', '🥗',
  FALSE, NULL, TRUE
),

-- SOUPS (Course 2 - First)
(
  'soups', 'food', 'traditional_course', 'first_course', 'soup',
  2, 1,
  'Soups', 'Zuppe', 'Súp', '수프', 'スープ',
  'Hot soups, broths, and pho', '🍜',
  FALSE, TRUE, TRUE
),

-- PASTA (Course 2 - First)
(
  'pasta', 'food', 'traditional_course', 'first_course', 'pasta',
  2, 2,
  'Pasta', 'Pasta', 'Mì Ý', '파스타', 'パスタ',
  'Italian pasta and Asian noodles', '🍝',
  FALSE, TRUE, TRUE
),

-- RISOTTI (Course 2 - First)
(
  'risotti', 'food', 'traditional_course', 'first_course', 'risotto',
  2, 3,
  'Risotto', 'Risotti', 'Risotto', '리조또', 'リゾット',
  'Creamy Italian rice dishes', '🍚',
  FALSE, TRUE, TRUE
),

-- DUMPLINGS (Course 2 - First)
(
  'dumplings', 'food', 'traditional_course', 'first_course', 'dumpling',
  2, 4,
  'Dumplings', 'Ravioli e Dumpling', 'Há cảo', '만두', '餃子',
  'Asian dumplings, gyoza, and dim sum', '🥟',
  FALSE, TRUE, TRUE
),

-- STEAKS (Course 3 - Second)
(
  'steaks', 'food', 'traditional_course', 'second_course', 'meat',
  3, 1,
  'Steaks & Grills', 'Carni alla Griglia', 'Bò nướng', '스테이크', 'ステーキ',
  'Premium steaks, grilled meats, and BBQ', '🥩',
  FALSE, TRUE, TRUE
),

-- SEAFOOD (Course 3 - Second)
(
  'seafood', 'food', 'traditional_course', 'second_course', 'fish',
  3, 2,
  'Seafood', 'Pesce e Frutti di Mare', 'Hải sản', '해산물', 'シーフード',
  'Fresh fish, shellfish, and crustaceans', '🦞',
  FALSE, TRUE, TRUE
),

-- SALADS (Side)
(
  'salads', 'food', 'side_dish', 'side', 'salad',
  NULL, 1,
  'Salads', 'Insalate', 'Salad', '샐러드', 'サラダ',
  'Fresh salads, bowls, and healthy options', '🥬',
  FALSE, FALSE, FALSE
),

-- DESSERTS (Course 4)
(
  'desserts', 'food', 'traditional_course', 'dessert', NULL,
  4, 1,
  'Desserts', 'Dolci', 'Tráng miệng', '디저트', 'デザート',
  'Sweet endings, cakes, and Italian dolci', '🍰',
  FALSE, NULL, TRUE
);


-- ============================================
-- PART 5: DATA - FOOD (Standalone)
-- ============================================

INSERT INTO product_taxonomy (
  product_type, service_type, menu_type, category, subcategory,
  course_order, display_order,
  display_name_en, display_name_it, display_name_vi, display_name_ko, display_name_ja,
  description_en, icon, is_alcoholic, is_hot_served, requires_cooking
) VALUES

-- PIZZAS
(
  'pizzas', 'food', 'standalone', 'pizza', NULL,
  NULL, 1,
  'Pizzas', 'Pizze', 'Pizza', '피자', 'ピザ',
  'Italian pizzas, Neapolitan and Roman styles', '🍕',
  FALSE, TRUE, TRUE
),

-- BURGERS
(
  'burgers', 'food', 'standalone', 'burger', NULL,
  NULL, 2,
  'Burgers', 'Hamburger', 'Hamburger', '버거', 'バーガー',
  'Classic and gourmet burgers', '🍔',
  FALSE, TRUE, TRUE
),

-- SANDWICHES (includes Piadine)
(
  'sandwiches', 'food', 'standalone', 'sandwich', NULL,
  NULL, 3,
  'Sandwiches & Piadine', 'Panini e Piadine', 'Bánh mì', '샌드위치', 'サンドイッチ',
  'Sandwiches, panini, piadine, and wraps', '🥪',
  FALSE, NULL, TRUE
),

-- SUSHI
(
  'sushi', 'food', 'standalone', 'sushi', NULL,
  NULL, 4,
  'Sushi & Sashimi', 'Sushi e Sashimi', 'Sushi', '스시', '寿司',
  'Sushi, sashimi, maki rolls, and Japanese raw fish dishes', '🍣',
  FALSE, FALSE, FALSE
);


-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count by service type
-- SELECT service_type, COUNT(*) as count FROM product_taxonomy GROUP BY service_type;

-- Count by menu type
-- SELECT menu_type, COUNT(*) as count FROM product_taxonomy GROUP BY menu_type;

-- Traditional menu ordered by course
-- SELECT display_name_en, course_order, display_order
-- FROM product_taxonomy
-- WHERE menu_type = 'traditional_course'
-- ORDER BY course_order, display_order;

-- All categories
-- SELECT category, display_name_en, product_type FROM product_taxonomy ORDER BY category;
