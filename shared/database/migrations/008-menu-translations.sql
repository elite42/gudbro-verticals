-- ============================================================================
-- Migration 008: Menu Item Translations Table
--
-- Purpose: Store translations for menu items (name, description) in multiple
--          languages. Enables merchants to offer menus in customer languages.
--
-- Architecture:
--   menu_item_translations  -> Per-item translations by language
--   category_translations   -> Per-category translations by language
--
-- Strategy:
--   - Primary language content stored in menu_items/menu_categories (original)
--   - Additional languages stored in translation tables
--   - Fallback: Requested → Primary → English → Original
--
-- Date: 2025-12-05
-- Sprint: 1 - Database Foundation
-- ============================================================================

-- =============================================================================
-- MENU ITEM TRANSLATIONS TABLE
-- Translations for menu item name and description
-- =============================================================================

CREATE TABLE IF NOT EXISTS menu_item_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(255) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,
  translated_by UUID, -- User who created/edited translation
  verified_at TIMESTAMP WITH TIME ZONE, -- When human-verified
  verified_by UUID, -- Who verified

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per item per language
  UNIQUE(menu_item_id, language_code)
);

-- Enable RLS
ALTER TABLE menu_item_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to menu_item_translations"
  ON menu_item_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage menu_item_translations"
  ON menu_item_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_menu_item_translations_item ON menu_item_translations(menu_item_id);
CREATE INDEX idx_menu_item_translations_lang ON menu_item_translations(language_code);
CREATE INDEX idx_menu_item_translations_item_lang ON menu_item_translations(menu_item_id, language_code);

-- =============================================================================
-- CATEGORY TRANSLATIONS TABLE
-- Translations for category name and description
-- =============================================================================

CREATE TABLE IF NOT EXISTS category_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,
  translated_by UUID,
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per category per language
  UNIQUE(category_id, language_code)
);

-- Enable RLS
ALTER TABLE category_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to category_translations"
  ON category_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage category_translations"
  ON category_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_category_translations_category ON category_translations(category_id);
CREATE INDEX idx_category_translations_lang ON category_translations(language_code);
CREATE INDEX idx_category_translations_cat_lang ON category_translations(category_id, language_code);

-- =============================================================================
-- MODIFIER TRANSLATIONS TABLE
-- Translations for modifier group names and modifier option names
-- =============================================================================

CREATE TABLE IF NOT EXISTS modifier_group_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  modifier_group_id UUID NOT NULL REFERENCES modifier_groups(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per group per language
  UNIQUE(modifier_group_id, language_code)
);

-- Enable RLS
ALTER TABLE modifier_group_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to modifier_group_translations"
  ON modifier_group_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage modifier_group_translations"
  ON modifier_group_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index
CREATE INDEX idx_modifier_group_translations_group ON modifier_group_translations(modifier_group_id);

-- =============================================================================
-- MODIFIER OPTION TRANSLATIONS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS modifier_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Foreign keys
  modifier_id UUID NOT NULL REFERENCES modifiers(id) ON DELETE CASCADE,
  language_code VARCHAR(5) NOT NULL REFERENCES languages(code) ON DELETE CASCADE,

  -- Translated content
  name VARCHAR(100) NOT NULL,
  description TEXT,

  -- Translation metadata
  is_machine_translated BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique translation per modifier per language
  UNIQUE(modifier_id, language_code)
);

-- Enable RLS
ALTER TABLE modifier_translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to modifier_translations"
  ON modifier_translations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage modifier_translations"
  ON modifier_translations FOR ALL
  USING (true)
  WITH CHECK (true);

-- Index
CREATE INDEX idx_modifier_translations_modifier ON modifier_translations(modifier_id);

-- =============================================================================
-- HELPER FUNCTION: Get translated menu item
-- Returns menu item with translation for specified language (with fallback)
-- =============================================================================

CREATE OR REPLACE FUNCTION get_translated_menu_item(
  p_menu_item_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  language_used VARCHAR(5),
  is_translated BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    mi.id,
    COALESCE(
      -- First try requested language
      (SELECT t.name FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code),
      -- Then try fallback language
      (SELECT t.name FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_fallback_language),
      -- Finally use original
      mi.name
    ) AS name,
    COALESCE(
      (SELECT t.description FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code),
      (SELECT t.description FROM menu_item_translations t
       WHERE t.menu_item_id = mi.id AND t.language_code = p_fallback_language),
      mi.description
    ) AS description,
    mi.price,
    CASE
      WHEN EXISTS (SELECT 1 FROM menu_item_translations t
                   WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code)
      THEN p_language_code
      WHEN EXISTS (SELECT 1 FROM menu_item_translations t
                   WHERE t.menu_item_id = mi.id AND t.language_code = p_fallback_language)
      THEN p_fallback_language
      ELSE 'original'
    END AS language_used,
    EXISTS (SELECT 1 FROM menu_item_translations t
            WHERE t.menu_item_id = mi.id AND t.language_code = p_language_code) AS is_translated
  FROM menu_items mi
  WHERE mi.id = p_menu_item_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- HELPER FUNCTION: Get all menu items with translations
-- Bulk fetch for PWA (returns all items with translations for a language)
-- =============================================================================

CREATE OR REPLACE FUNCTION get_menu_items_with_translations(
  p_merchant_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  id UUID,
  category_id UUID,
  name VARCHAR(255),
  description TEXT,
  price NUMERIC,
  image_url TEXT,
  is_available BOOLEAN,
  language_used VARCHAR(5)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    mi.id,
    mi.category_id,
    COALESCE(
      t.name,
      t_fallback.name,
      mi.name
    ) AS name,
    COALESCE(
      t.description,
      t_fallback.description,
      mi.description
    ) AS description,
    mi.price,
    mi.image_url,
    mi.is_available,
    CASE
      WHEN t.id IS NOT NULL THEN p_language_code
      WHEN t_fallback.id IS NOT NULL THEN p_fallback_language
      ELSE 'original'
    END AS language_used
  FROM menu_items mi
  LEFT JOIN menu_item_translations t
    ON t.menu_item_id = mi.id
    AND t.language_code = p_language_code
  LEFT JOIN menu_item_translations t_fallback
    ON t_fallback.menu_item_id = mi.id
    AND t_fallback.language_code = p_fallback_language
  WHERE mi.merchant_id = p_merchant_id
    AND mi.is_available = true
  ORDER BY mi.display_order, mi.name;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- HELPER FUNCTION: Get categories with translations
-- =============================================================================

CREATE OR REPLACE FUNCTION get_categories_with_translations(
  p_merchant_id UUID,
  p_language_code VARCHAR(5),
  p_fallback_language VARCHAR(5) DEFAULT 'en'
)
RETURNS TABLE (
  id UUID,
  slug VARCHAR,
  name VARCHAR(100),
  description TEXT,
  display_order INTEGER,
  language_used VARCHAR(5)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.slug,
    COALESCE(
      t.name,
      t_fallback.name,
      c.name
    )::VARCHAR(100) AS name,
    COALESCE(
      t.description,
      t_fallback.description,
      c.description
    ) AS description,
    c.display_order,
    CASE
      WHEN t.id IS NOT NULL THEN p_language_code
      WHEN t_fallback.id IS NOT NULL THEN p_fallback_language
      ELSE 'original'
    END AS language_used
  FROM menu_categories c
  LEFT JOIN category_translations t
    ON t.category_id = c.id
    AND t.language_code = p_language_code
  LEFT JOIN category_translations t_fallback
    ON t_fallback.category_id = c.id
    AND t_fallback.language_code = p_fallback_language
  WHERE c.merchant_id = p_merchant_id
    AND c.is_active = true
  ORDER BY c.display_order, c.name;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER
SET search_path = public;

-- =============================================================================
-- TRIGGER: Update timestamps
-- =============================================================================

CREATE OR REPLACE FUNCTION update_translation_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_menu_item_translations_updated
  BEFORE UPDATE ON menu_item_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trg_category_translations_updated
  BEFORE UPDATE ON category_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trg_modifier_group_translations_updated
  BEFORE UPDATE ON modifier_group_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

CREATE TRIGGER trg_modifier_translations_updated
  BEFORE UPDATE ON modifier_translations
  FOR EACH ROW
  EXECUTE FUNCTION update_translation_timestamp();

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON TABLE menu_item_translations IS
  'Stores translations for menu items. Primary content stays in menu_items table.';

COMMENT ON TABLE category_translations IS
  'Stores translations for menu categories.';

COMMENT ON TABLE modifier_group_translations IS
  'Stores translations for modifier group names (e.g., "Size" → "Dimensione").';

COMMENT ON TABLE modifier_translations IS
  'Stores translations for modifier options (e.g., "Large" → "Grande").';

COMMENT ON FUNCTION get_translated_menu_item IS
  'Returns a single menu item with translation. Fallback: requested → fallback → original.';

COMMENT ON FUNCTION get_menu_items_with_translations IS
  'Bulk fetch all menu items for a merchant with translations. Use in PWA API.';

COMMENT ON FUNCTION get_categories_with_translations IS
  'Fetch all categories for a merchant with translations. Use in PWA API.';

-- =============================================================================
-- GRANT PUBLIC READ ACCESS
-- =============================================================================

GRANT SELECT ON menu_item_translations TO anon;
GRANT SELECT ON category_translations TO anon;
GRANT SELECT ON modifier_group_translations TO anon;
GRANT SELECT ON modifier_translations TO anon;
