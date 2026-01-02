-- ============================================================================
-- Migration 004: Add menu_type and temperature to menu_categories
--
-- Purpose: Enable filtering products by tab (Food/Drinks/Merch) and temperature
--          to support the PWA menu navigation
--
-- Date: 2025-12-05
-- ============================================================================

-- Add menu_type column to menu_categories
-- This determines which tab the category appears under
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS menu_type VARCHAR(20) DEFAULT 'drinks'
CHECK (menu_type IN ('food', 'drinks', 'merchandise'));

-- Add temperature column
-- hot = served hot only, iced = served cold only
-- Products that can be both hot/iced should be created as separate products
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS temperature VARCHAR(10) DEFAULT 'hot'
CHECK (temperature IN ('hot', 'iced'));

-- Add parent_category_id for hierarchical categories (subcategories)
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS parent_category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL;

-- Add temperature_icon for display
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS temperature_icon VARCHAR(10);

-- Add sort_order for ordering categories within each menu_type
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Add tags for additional filtering/search
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Add quick_prompts for chat interface (JSONB for multi-language)
ALTER TABLE menu_categories
ADD COLUMN IF NOT EXISTS quick_prompts JSONB DEFAULT '{"en": [], "it": [], "vi": []}';

-- Create index for menu_type filtering
CREATE INDEX IF NOT EXISTS idx_menu_categories_menu_type
ON menu_categories(merchant_id, menu_type)
WHERE is_active = true;

-- Create index for temperature filtering
CREATE INDEX IF NOT EXISTS idx_menu_categories_temperature
ON menu_categories(merchant_id, temperature)
WHERE is_active = true;

-- Create index for parent category (subcategories)
CREATE INDEX IF NOT EXISTS idx_menu_categories_parent
ON menu_categories(parent_category_id);

-- ============================================================================
-- Update existing categories with sensible defaults based on slug
-- ============================================================================

-- Update drink categories
UPDATE menu_categories
SET menu_type = 'drinks', temperature = 'hot'
WHERE slug IN ('hot-coffee', 'espresso', 'americano', 'latte', 'cappuccino')
AND menu_type IS NULL OR menu_type = 'drinks';

UPDATE menu_categories
SET menu_type = 'drinks', temperature = 'iced'
WHERE slug IN ('iced-coffee', 'cold-brew', 'frappe', 'frappuccino')
AND menu_type IS NULL OR menu_type = 'drinks';

-- Note: matcha and tea go in 'hot', smoothie and milkshake go in 'iced'
-- If you need both hot/iced versions, create separate products
UPDATE menu_categories
SET menu_type = 'drinks', temperature = 'hot'
WHERE slug IN ('matcha', 'tea');

UPDATE menu_categories
SET menu_type = 'drinks', temperature = 'iced'
WHERE slug IN ('smoothie', 'milkshake');

-- Update food categories
UPDATE menu_categories
SET menu_type = 'food'
WHERE slug IN ('food', 'breakfast', 'lunch', 'dinner', 'snacks', 'antipasti', 'primi', 'secondi', 'pizza', 'bowl');

UPDATE menu_categories
SET menu_type = 'food'
WHERE slug IN ('dessert', 'desserts', 'cake', 'pastry');

-- Update merchandise categories
UPDATE menu_categories
SET menu_type = 'merchandise'
WHERE slug IN ('merch', 'merchandise', 'coffee-beans', 'equipment', 'branded', 'retail', 'gift');

-- ============================================================================
-- Add temperature_icon based on temperature
-- ============================================================================

-- Set temperature icons (only for drinks with explicit temperature)
UPDATE menu_categories
SET temperature_icon = CASE
  WHEN temperature = 'hot' THEN '🔥'
  WHEN temperature = 'iced' THEN '❄️'
  ELSE NULL
END;

-- ============================================================================
-- Create view for PWA category navigation
-- ============================================================================

CREATE OR REPLACE VIEW v_menu_categories_nav AS
SELECT
  mc.id,
  mc.merchant_id,
  mc.slug,
  mc.name,
  mc.description,
  mc.icon,
  mc.menu_type,
  mc.temperature,
  mc.temperature_icon,
  mc.sort_order,
  mc.is_active,
  mc.parent_category_id,
  pc.slug AS parent_slug,
  pc.name AS parent_name,
  (
    SELECT COUNT(*)
    FROM menu_items mi
    WHERE mi.category_id = mc.id
    AND mi.is_active = true
    AND mi.is_available = true
  ) AS item_count
FROM menu_categories mc
LEFT JOIN menu_categories pc ON pc.id = mc.parent_category_id
WHERE mc.is_active = true
ORDER BY mc.sort_order, mc.slug;

-- ============================================================================
-- Function to get categories by menu_type
-- ============================================================================

CREATE OR REPLACE FUNCTION get_categories_by_menu_type(
  p_merchant_id UUID,
  p_menu_type VARCHAR(20)
)
RETURNS SETOF v_menu_categories_nav AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM v_menu_categories_nav
  WHERE merchant_id = p_merchant_id
  AND menu_type = p_menu_type
  AND is_active = true
  ORDER BY sort_order, slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- ============================================================================
-- Comment on new columns for documentation
-- ============================================================================

COMMENT ON COLUMN menu_categories.menu_type IS
  'Tab filter: food, drinks, or merchandise. Determines which navigation tab this category appears under.';

COMMENT ON COLUMN menu_categories.temperature IS
  'Temperature filter: hot, iced, or both. Used for drink categories to filter by temperature.';

COMMENT ON COLUMN menu_categories.parent_category_id IS
  'For hierarchical categories. Links to parent category for subcategory support.';

COMMENT ON COLUMN menu_categories.temperature_icon IS
  'Emoji icon for temperature display: 🔥 for hot, ❄️ for iced, 🔥❄️ for both.';

COMMENT ON COLUMN menu_categories.sort_order IS
  'Display order within the menu_type. Lower numbers appear first.';

COMMENT ON COLUMN menu_categories.tags IS
  'Array of tags for search and filtering (e.g., coffee, caffeine, healthy).';

COMMENT ON COLUMN menu_categories.quick_prompts IS
  'Chat-style quick prompts in multiple languages for conversational ordering.';
