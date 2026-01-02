-- ============================================
-- GUDBRO Product Taxonomy Schema
-- Version: 1.0
-- DATABASE-STANDARDS v1.1 compliant (TEXT + CHECK)
-- ============================================
--
-- PURPOSE:
-- Classifies all 18+ product databases into a unified taxonomy system.
-- Enables queries like "get all main courses" or "get all beverages".
--
-- ARCHITECTURE:
-- - One row per product_type (database-level classification)
-- - Optional product_id for item-level overrides
-- - Hierarchical: service_type > menu_type > category > subcategory
--
-- ============================================

-- Drop if exists (for clean re-runs)
DROP TABLE IF EXISTS product_taxonomy CASCADE;

-- ============================================
-- MAIN TABLE
-- ============================================

CREATE TABLE product_taxonomy (
  -- PRIMARY KEY
  id SERIAL PRIMARY KEY,

  -- PRODUCT REFERENCE
  product_type TEXT NOT NULL,              -- 'steaks', 'pasta', 'cocktails', etc.
  product_id TEXT DEFAULT NULL,            -- NULL = applies to ALL items in product_type
                                           -- Set value = override for specific item

  -- LEVEL 1: Service Type (food vs beverage)
  service_type TEXT NOT NULL
    CHECK (service_type IN ('food', 'beverage')),

  -- LEVEL 2: Menu Type (how it's typically served)
  menu_type TEXT NOT NULL
    CHECK (menu_type IN (
      'traditional_course',    -- Part of multi-course meal (antipasto, primo, secondo, dolce)
      'standalone',            -- Single dish meal (pizza, burger, sushi)
      'bar_menu',              -- Alcoholic beverages
      'cafe_menu',             -- Hot beverages, non-alcoholic
      'side_dish'              -- Accompaniments (salads, sides)
    )),

  -- LEVEL 3: Category (specific classification)
  category TEXT NOT NULL
    CHECK (category IN (
      -- Traditional courses
      'appetizer',             -- Antipasti
      'first_course',          -- Primi (pasta, risotto, soup)
      'second_course',         -- Secondi (meat, fish)
      'side',                  -- Contorni
      'dessert',               -- Dolci
      -- Standalone foods
      'pizza',
      'burger',
      'sandwich',
      'sushi',
      'dumpling',
      -- Beverages
      'cocktail',
      'wine',
      'beer',
      'coffee',
      'tea',
      'soft_drink',
      'juice',
      'smoothie'
    )),

  -- LEVEL 4: Subcategory (optional, more specific)
  subcategory TEXT DEFAULT NULL,           -- e.g., 'pasta', 'risotto', 'soup' within first_course

  -- MENU ORDERING
  course_order INT DEFAULT NULL,           -- 1=appetizer, 2=first, 3=second, 4=dessert
                                           -- NULL for non-course items
  display_order INT DEFAULT 0,             -- Order within same category

  -- DISPLAY INFO (for UI)
  display_name_en TEXT NOT NULL,           -- "Main Courses", "Hot Beverages"
  display_name_it TEXT,                    -- "Secondi Piatti", "Bevande Calde"
  display_name_vi TEXT,                    -- Vietnamese
  display_name_ko TEXT,                    -- Korean
  display_name_ja TEXT,                    -- Japanese

  description_en TEXT,                     -- Brief description
  icon TEXT,                               -- Emoji or icon name for UI

  -- FLAGS
  is_alcoholic BOOLEAN DEFAULT FALSE,      -- For beverage filtering
  is_hot_served BOOLEAN DEFAULT NULL,      -- Hot vs cold serving
  requires_cooking BOOLEAN DEFAULT TRUE,   -- For kitchen vs bar routing

  -- METADATA
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- CONSTRAINTS
  UNIQUE (product_type, product_id)        -- One classification per product_type (or per specific item)
);

-- ============================================
-- INDEXES
-- ============================================

-- Primary lookups
CREATE INDEX idx_taxonomy_product_type ON product_taxonomy(product_type);
CREATE INDEX idx_taxonomy_product_id ON product_taxonomy(product_id) WHERE product_id IS NOT NULL;

-- Classification lookups
CREATE INDEX idx_taxonomy_service_type ON product_taxonomy(service_type);
CREATE INDEX idx_taxonomy_menu_type ON product_taxonomy(menu_type);
CREATE INDEX idx_taxonomy_category ON product_taxonomy(category);
CREATE INDEX idx_taxonomy_subcategory ON product_taxonomy(subcategory) WHERE subcategory IS NOT NULL;

-- Ordering
CREATE INDEX idx_taxonomy_course_order ON product_taxonomy(course_order) WHERE course_order IS NOT NULL;
CREATE INDEX idx_taxonomy_display_order ON product_taxonomy(display_order);

-- Combined for menu building
CREATE INDEX idx_taxonomy_menu_builder ON product_taxonomy(service_type, menu_type, course_order, display_order);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE product_taxonomy ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON product_taxonomy
  FOR SELECT USING (true);

-- Service role write access
CREATE POLICY "Service write access" ON product_taxonomy
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- TRIGGER: Auto-update updated_at
-- ============================================

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

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE product_taxonomy IS 'GUDBRO Product Taxonomy - Unified classification for all 18+ product databases';
COMMENT ON COLUMN product_taxonomy.product_type IS 'Database/table name: steaks, pasta, cocktails, etc.';
COMMENT ON COLUMN product_taxonomy.product_id IS 'NULL = rule for entire product_type, value = override for specific item';
COMMENT ON COLUMN product_taxonomy.service_type IS 'Level 1: food or beverage';
COMMENT ON COLUMN product_taxonomy.menu_type IS 'Level 2: how product is typically served/ordered';
COMMENT ON COLUMN product_taxonomy.category IS 'Level 3: specific classification';
COMMENT ON COLUMN product_taxonomy.subcategory IS 'Level 4: optional further specification';
COMMENT ON COLUMN product_taxonomy.course_order IS 'Menu order: 1=appetizer, 2=first, 3=second, 4=dessert';
