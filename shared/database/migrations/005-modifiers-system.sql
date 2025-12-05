-- ============================================================================
-- Migration 005: Modifiers/Customizations System (Hybrid Approach)
--
-- Purpose: Enable product customizations like size, milk type, extras, etc.
--          Uses hybrid approach: global modifiers table + JSONB overrides
--
-- Architecture:
--   modifier_groups  → Groups like "Size", "Milk Type", "Extras"
--   modifiers        → Individual options like "Small", "Medium", "Large"
--   category_modifier_groups → Which groups apply to which categories
--   menu_item_modifier_overrides → JSONB overrides per product
--
-- Date: 2025-12-05
-- ============================================================================

-- =============================================================================
-- MODIFIER GROUPS (Size, Milk Type, Extras, etc.)
-- =============================================================================

CREATE TABLE IF NOT EXISTS modifier_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Identification
  slug VARCHAR(50) NOT NULL,
  name_multilang JSONB NOT NULL DEFAULT '{"en": "", "it": "", "vi": ""}',
  description_multilang JSONB DEFAULT '{"en": "", "it": "", "vi": ""}',

  -- Behavior
  selection_type VARCHAR(20) NOT NULL DEFAULT 'single'
    CHECK (selection_type IN ('single', 'multiple')),
  is_required BOOLEAN NOT NULL DEFAULT false,
  min_selections INTEGER DEFAULT 0,
  max_selections INTEGER DEFAULT 1,

  -- Display
  display_order INTEGER DEFAULT 0,
  icon VARCHAR(10),

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique slug per merchant
  UNIQUE(merchant_id, slug)
);

-- Enable RLS
ALTER TABLE modifier_groups ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to modifier_groups"
  ON modifier_groups FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage modifier_groups"
  ON modifier_groups FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_modifier_groups_merchant ON modifier_groups(merchant_id);
CREATE INDEX idx_modifier_groups_active ON modifier_groups(merchant_id, is_active);

-- =============================================================================
-- MODIFIERS (Individual options: Small, Medium, Large, etc.)
-- =============================================================================

CREATE TABLE IF NOT EXISTS modifiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES modifier_groups(id) ON DELETE CASCADE,

  -- Identification
  slug VARCHAR(50) NOT NULL,
  name_multilang JSONB NOT NULL DEFAULT '{"en": "", "it": "", "vi": ""}',
  description_multilang JSONB DEFAULT '{"en": "", "it": "", "vi": ""}',

  -- Pricing
  price_adjustment NUMERIC(10,2) NOT NULL DEFAULT 0,
  price_type VARCHAR(20) NOT NULL DEFAULT 'fixed'
    CHECK (price_type IN ('fixed', 'percentage', 'replace')),
  -- fixed: add to base price
  -- percentage: add X% of base price
  -- replace: replace base price entirely (for sizes)

  -- Display
  display_order INTEGER DEFAULT 0,
  icon VARCHAR(10),
  color VARCHAR(20), -- for visual differentiation

  -- Defaults
  is_default BOOLEAN NOT NULL DEFAULT false,

  -- Nutritional impact (optional)
  calories_adjustment INTEGER DEFAULT 0,
  allergens_added TEXT[] DEFAULT '{}',

  -- Status
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_available BOOLEAN NOT NULL DEFAULT true, -- for temporary out-of-stock

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique slug per group
  UNIQUE(group_id, slug)
);

-- Enable RLS
ALTER TABLE modifiers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to modifiers"
  ON modifiers FOR SELECT
  USING (is_active = true AND is_available = true);

CREATE POLICY "Authenticated users can manage modifiers"
  ON modifiers FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_modifiers_group ON modifiers(group_id);
CREATE INDEX idx_modifiers_merchant ON modifiers(merchant_id);
CREATE INDEX idx_modifiers_active ON modifiers(group_id, is_active, is_available);

-- =============================================================================
-- CATEGORY-MODIFIER GROUPS MAPPING
-- Which modifier groups apply to which categories by default
-- =============================================================================

CREATE TABLE IF NOT EXISTS category_modifier_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  modifier_group_id UUID NOT NULL REFERENCES modifier_groups(id) ON DELETE CASCADE,

  -- Override group settings for this category
  is_required_override BOOLEAN, -- NULL = use group default
  display_order_override INTEGER, -- NULL = use group default

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique pairing
  UNIQUE(category_id, modifier_group_id)
);

-- Enable RLS
ALTER TABLE category_modifier_groups ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to category_modifier_groups"
  ON category_modifier_groups FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage category_modifier_groups"
  ON category_modifier_groups FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_category_modifier_groups_category ON category_modifier_groups(category_id);
CREATE INDEX idx_category_modifier_groups_group ON category_modifier_groups(modifier_group_id);

-- =============================================================================
-- MENU ITEM MODIFIER OVERRIDES (JSONB flexibility)
-- Per-product customization of modifiers
-- =============================================================================

CREATE TABLE IF NOT EXISTS menu_item_modifier_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  modifier_group_id UUID NOT NULL REFERENCES modifier_groups(id) ON DELETE CASCADE,

  -- Override settings
  is_enabled BOOLEAN NOT NULL DEFAULT true, -- false = hide this group for this item
  is_required_override BOOLEAN, -- NULL = use category/group default
  display_order_override INTEGER,

  -- Modifier-level overrides (JSONB for flexibility)
  -- Format: { "modifier_slug": { "price_adjustment": 0.50, "is_available": false, "is_default": true } }
  modifier_overrides JSONB DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Unique pairing
  UNIQUE(menu_item_id, modifier_group_id)
);

-- Enable RLS
ALTER TABLE menu_item_modifier_overrides ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access to menu_item_modifier_overrides"
  ON menu_item_modifier_overrides FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage menu_item_modifier_overrides"
  ON menu_item_modifier_overrides FOR ALL
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_menu_item_modifier_overrides_item ON menu_item_modifier_overrides(menu_item_id);
CREATE INDEX idx_menu_item_modifier_overrides_group ON menu_item_modifier_overrides(modifier_group_id);

-- =============================================================================
-- UPDATE order_items TO STORE SELECTED MODIFIERS
-- =============================================================================

ALTER TABLE order_items
ADD COLUMN IF NOT EXISTS selected_modifiers JSONB DEFAULT '[]';
-- Format: [{ "group_slug": "size", "modifier_slug": "large", "price_adjustment": 0.50 }, ...]

COMMENT ON COLUMN order_items.selected_modifiers IS
  'Array of selected modifiers with their prices at time of order';

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Function to get all modifiers for a menu item (with overrides applied)
CREATE OR REPLACE FUNCTION get_menu_item_modifiers(p_menu_item_id UUID)
RETURNS TABLE (
  group_id UUID,
  group_slug VARCHAR,
  group_name JSONB,
  selection_type VARCHAR,
  is_required BOOLEAN,
  min_selections INTEGER,
  max_selections INTEGER,
  display_order INTEGER,
  modifiers JSONB
) AS $$
DECLARE
  v_category_id UUID;
  v_merchant_id UUID;
BEGIN
  -- Get the menu item's category and merchant
  SELECT mi.category_id, mi.merchant_id
  INTO v_category_id, v_merchant_id
  FROM menu_items mi
  WHERE mi.id = p_menu_item_id;

  RETURN QUERY
  SELECT
    mg.id AS group_id,
    mg.slug AS group_slug,
    mg.name_multilang AS group_name,
    mg.selection_type,
    COALESCE(mio.is_required_override, cmg.is_required_override, mg.is_required) AS is_required,
    mg.min_selections,
    mg.max_selections,
    COALESCE(mio.display_order_override, cmg.display_order_override, mg.display_order) AS display_order,
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', m.id,
          'slug', m.slug,
          'name', m.name_multilang,
          'price_adjustment', COALESCE(
            (mio.modifier_overrides->m.slug->>'price_adjustment')::NUMERIC,
            m.price_adjustment
          ),
          'price_type', m.price_type,
          'is_default', COALESCE(
            (mio.modifier_overrides->m.slug->>'is_default')::BOOLEAN,
            m.is_default
          ),
          'is_available', COALESCE(
            (mio.modifier_overrides->m.slug->>'is_available')::BOOLEAN,
            m.is_available
          ),
          'icon', m.icon,
          'calories_adjustment', m.calories_adjustment
        ) ORDER BY m.display_order
      )
      FROM modifiers m
      WHERE m.group_id = mg.id
        AND m.is_active = true
        AND COALESCE((mio.modifier_overrides->m.slug->>'is_available')::BOOLEAN, m.is_available) = true
    ) AS modifiers
  FROM modifier_groups mg
  -- Join category defaults
  LEFT JOIN category_modifier_groups cmg
    ON cmg.modifier_group_id = mg.id
    AND cmg.category_id = v_category_id
  -- Join item overrides
  LEFT JOIN menu_item_modifier_overrides mio
    ON mio.modifier_group_id = mg.id
    AND mio.menu_item_id = p_menu_item_id
  WHERE mg.merchant_id = v_merchant_id
    AND mg.is_active = true
    AND (cmg.id IS NOT NULL OR mio.id IS NOT NULL) -- Must be linked to category or have override
    AND COALESCE(mio.is_enabled, true) = true -- Not explicitly disabled
  ORDER BY COALESCE(mio.display_order_override, cmg.display_order_override, mg.display_order);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Function to calculate total price with modifiers
CREATE OR REPLACE FUNCTION calculate_item_price_with_modifiers(
  p_base_price NUMERIC,
  p_selected_modifiers JSONB
) RETURNS NUMERIC AS $$
DECLARE
  v_total NUMERIC := p_base_price;
  v_modifier JSONB;
BEGIN
  IF p_selected_modifiers IS NULL OR jsonb_array_length(p_selected_modifiers) = 0 THEN
    RETURN v_total;
  END IF;

  FOR v_modifier IN SELECT * FROM jsonb_array_elements(p_selected_modifiers)
  LOOP
    CASE v_modifier->>'price_type'
      WHEN 'fixed' THEN
        v_total := v_total + (v_modifier->>'price_adjustment')::NUMERIC;
      WHEN 'percentage' THEN
        v_total := v_total + (p_base_price * (v_modifier->>'price_adjustment')::NUMERIC / 100);
      WHEN 'replace' THEN
        v_total := (v_modifier->>'price_adjustment')::NUMERIC;
    END CASE;
  END LOOP;

  RETURN v_total;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =============================================================================
-- SEED DATA: Common Modifier Groups for Coffee Shop
-- =============================================================================

-- Note: This uses a placeholder merchant_id. Replace with actual merchant_id when running.
-- You can get your merchant_id with: SELECT id FROM merchants LIMIT 1;

DO $$
DECLARE
  v_merchant_id UUID;
  v_size_group_id UUID;
  v_milk_group_id UUID;
  v_extras_group_id UUID;
  v_sugar_group_id UUID;
  v_ice_group_id UUID;
BEGIN
  -- Get the first merchant (Demo Café)
  SELECT id INTO v_merchant_id FROM merchants LIMIT 1;

  IF v_merchant_id IS NULL THEN
    RAISE NOTICE 'No merchant found. Skipping seed data.';
    RETURN;
  END IF;

  -- =========================================================================
  -- SIZE GROUP
  -- =========================================================================
  INSERT INTO modifier_groups (merchant_id, slug, name_multilang, selection_type, is_required, min_selections, max_selections, display_order, icon)
  VALUES (
    v_merchant_id,
    'size',
    '{"en": "Size", "it": "Dimensione", "vi": "Kích cỡ"}',
    'single',
    true,
    1,
    1,
    1,
    '📏'
  )
  ON CONFLICT (merchant_id, slug) DO NOTHING
  RETURNING id INTO v_size_group_id;

  -- If not inserted, get existing ID
  IF v_size_group_id IS NULL THEN
    SELECT id INTO v_size_group_id FROM modifier_groups WHERE merchant_id = v_merchant_id AND slug = 'size';
  END IF;

  -- Size options
  INSERT INTO modifiers (merchant_id, group_id, slug, name_multilang, price_adjustment, price_type, display_order, is_default)
  VALUES
    (v_merchant_id, v_size_group_id, 'small', '{"en": "Small", "it": "Piccolo", "vi": "Nhỏ"}', 0, 'fixed', 1, false),
    (v_merchant_id, v_size_group_id, 'medium', '{"en": "Medium", "it": "Medio", "vi": "Vừa"}', 0.50, 'fixed', 2, true),
    (v_merchant_id, v_size_group_id, 'large', '{"en": "Large", "it": "Grande", "vi": "Lớn"}', 1.00, 'fixed', 3, false)
  ON CONFLICT (group_id, slug) DO NOTHING;

  -- =========================================================================
  -- MILK TYPE GROUP
  -- =========================================================================
  INSERT INTO modifier_groups (merchant_id, slug, name_multilang, selection_type, is_required, min_selections, max_selections, display_order, icon)
  VALUES (
    v_merchant_id,
    'milk-type',
    '{"en": "Milk Type", "it": "Tipo di Latte", "vi": "Loại Sữa"}',
    'single',
    false,
    0,
    1,
    2,
    '🥛'
  )
  ON CONFLICT (merchant_id, slug) DO NOTHING
  RETURNING id INTO v_milk_group_id;

  IF v_milk_group_id IS NULL THEN
    SELECT id INTO v_milk_group_id FROM modifier_groups WHERE merchant_id = v_merchant_id AND slug = 'milk-type';
  END IF;

  -- Milk options
  INSERT INTO modifiers (merchant_id, group_id, slug, name_multilang, price_adjustment, display_order, is_default)
  VALUES
    (v_merchant_id, v_milk_group_id, 'whole-milk', '{"en": "Whole Milk", "it": "Latte Intero", "vi": "Sữa Nguyên Kem"}', 0, 1, true),
    (v_merchant_id, v_milk_group_id, 'skim-milk', '{"en": "Skim Milk", "it": "Latte Scremato", "vi": "Sữa Tách Béo"}', 0, 2, false),
    (v_merchant_id, v_milk_group_id, 'oat-milk', '{"en": "Oat Milk", "it": "Latte d''Avena", "vi": "Sữa Yến Mạch"}', 0.60, 3, false),
    (v_merchant_id, v_milk_group_id, 'almond-milk', '{"en": "Almond Milk", "it": "Latte di Mandorla", "vi": "Sữa Hạnh Nhân"}', 0.60, 4, false),
    (v_merchant_id, v_milk_group_id, 'soy-milk', '{"en": "Soy Milk", "it": "Latte di Soia", "vi": "Sữa Đậu Nành"}', 0.50, 5, false),
    (v_merchant_id, v_milk_group_id, 'coconut-milk', '{"en": "Coconut Milk", "it": "Latte di Cocco", "vi": "Sữa Dừa"}', 0.60, 6, false)
  ON CONFLICT (group_id, slug) DO NOTHING;

  -- =========================================================================
  -- EXTRAS GROUP (Multiple selection)
  -- =========================================================================
  INSERT INTO modifier_groups (merchant_id, slug, name_multilang, selection_type, is_required, min_selections, max_selections, display_order, icon)
  VALUES (
    v_merchant_id,
    'extras',
    '{"en": "Extras", "it": "Extra", "vi": "Thêm"}',
    'multiple',
    false,
    0,
    5,
    3,
    '➕'
  )
  ON CONFLICT (merchant_id, slug) DO NOTHING
  RETURNING id INTO v_extras_group_id;

  IF v_extras_group_id IS NULL THEN
    SELECT id INTO v_extras_group_id FROM modifier_groups WHERE merchant_id = v_merchant_id AND slug = 'extras';
  END IF;

  -- Extras options
  INSERT INTO modifiers (merchant_id, group_id, slug, name_multilang, price_adjustment, display_order, calories_adjustment)
  VALUES
    (v_merchant_id, v_extras_group_id, 'extra-shot', '{"en": "Extra Shot", "it": "Shot Extra", "vi": "Thêm Shot"}', 0.80, 1, 5),
    (v_merchant_id, v_extras_group_id, 'whipped-cream', '{"en": "Whipped Cream", "it": "Panna Montata", "vi": "Kem Tươi"}', 0.50, 2, 50),
    (v_merchant_id, v_extras_group_id, 'caramel-drizzle', '{"en": "Caramel Drizzle", "it": "Caramello", "vi": "Sốt Caramel"}', 0.40, 3, 30),
    (v_merchant_id, v_extras_group_id, 'chocolate-drizzle', '{"en": "Chocolate Drizzle", "it": "Cioccolato", "vi": "Sốt Chocolate"}', 0.40, 4, 35),
    (v_merchant_id, v_extras_group_id, 'vanilla-syrup', '{"en": "Vanilla Syrup", "it": "Sciroppo Vaniglia", "vi": "Siro Vani"}', 0.40, 5, 20),
    (v_merchant_id, v_extras_group_id, 'hazelnut-syrup', '{"en": "Hazelnut Syrup", "it": "Sciroppo Nocciola", "vi": "Siro Hạt Dẻ"}', 0.40, 6, 20)
  ON CONFLICT (group_id, slug) DO NOTHING;

  -- =========================================================================
  -- SUGAR LEVEL GROUP
  -- =========================================================================
  INSERT INTO modifier_groups (merchant_id, slug, name_multilang, selection_type, is_required, min_selections, max_selections, display_order, icon)
  VALUES (
    v_merchant_id,
    'sugar-level',
    '{"en": "Sugar Level", "it": "Livello Zucchero", "vi": "Độ Ngọt"}',
    'single',
    false,
    0,
    1,
    4,
    '🍬'
  )
  ON CONFLICT (merchant_id, slug) DO NOTHING
  RETURNING id INTO v_sugar_group_id;

  IF v_sugar_group_id IS NULL THEN
    SELECT id INTO v_sugar_group_id FROM modifier_groups WHERE merchant_id = v_merchant_id AND slug = 'sugar-level';
  END IF;

  -- Sugar options
  INSERT INTO modifiers (merchant_id, group_id, slug, name_multilang, price_adjustment, display_order, is_default)
  VALUES
    (v_merchant_id, v_sugar_group_id, 'no-sugar', '{"en": "No Sugar", "it": "Senza Zucchero", "vi": "Không Đường"}', 0, 1, false),
    (v_merchant_id, v_sugar_group_id, 'less-sugar', '{"en": "Less Sugar", "it": "Poco Zucchero", "vi": "Ít Đường"}', 0, 2, false),
    (v_merchant_id, v_sugar_group_id, 'normal-sugar', '{"en": "Normal", "it": "Normale", "vi": "Bình Thường"}', 0, 3, true),
    (v_merchant_id, v_sugar_group_id, 'extra-sugar', '{"en": "Extra Sugar", "it": "Extra Zucchero", "vi": "Nhiều Đường"}', 0, 4, false)
  ON CONFLICT (group_id, slug) DO NOTHING;

  -- =========================================================================
  -- ICE LEVEL GROUP
  -- =========================================================================
  INSERT INTO modifier_groups (merchant_id, slug, name_multilang, selection_type, is_required, min_selections, max_selections, display_order, icon)
  VALUES (
    v_merchant_id,
    'ice-level',
    '{"en": "Ice Level", "it": "Livello Ghiaccio", "vi": "Độ Đá"}',
    'single',
    false,
    0,
    1,
    5,
    '🧊'
  )
  ON CONFLICT (merchant_id, slug) DO NOTHING
  RETURNING id INTO v_ice_group_id;

  IF v_ice_group_id IS NULL THEN
    SELECT id INTO v_ice_group_id FROM modifier_groups WHERE merchant_id = v_merchant_id AND slug = 'ice-level';
  END IF;

  -- Ice options
  INSERT INTO modifiers (merchant_id, group_id, slug, name_multilang, price_adjustment, display_order, is_default)
  VALUES
    (v_merchant_id, v_ice_group_id, 'no-ice', '{"en": "No Ice", "it": "Senza Ghiaccio", "vi": "Không Đá"}', 0, 1, false),
    (v_merchant_id, v_ice_group_id, 'less-ice', '{"en": "Less Ice", "it": "Poco Ghiaccio", "vi": "Ít Đá"}', 0, 2, false),
    (v_merchant_id, v_ice_group_id, 'normal-ice', '{"en": "Normal", "it": "Normale", "vi": "Bình Thường"}', 0, 3, true),
    (v_merchant_id, v_ice_group_id, 'extra-ice', '{"en": "Extra Ice", "it": "Extra Ghiaccio", "vi": "Nhiều Đá"}', 0, 4, false)
  ON CONFLICT (group_id, slug) DO NOTHING;

  RAISE NOTICE 'Seed data created successfully for merchant %', v_merchant_id;
END $$;

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON TABLE modifier_groups IS
  'Groups of modifiers like Size, Milk Type, Extras. Can be linked to categories or individual items.';

COMMENT ON TABLE modifiers IS
  'Individual modifier options within a group. Has base pricing that can be overridden per item.';

COMMENT ON TABLE category_modifier_groups IS
  'Links modifier groups to categories. All items in a category inherit these modifier groups.';

COMMENT ON TABLE menu_item_modifier_overrides IS
  'Per-item overrides for modifier groups. Use JSONB modifier_overrides for fine-grained control.';

COMMENT ON FUNCTION get_menu_item_modifiers IS
  'Returns all applicable modifiers for a menu item with overrides applied. Use this in API.';

COMMENT ON FUNCTION calculate_item_price_with_modifiers IS
  'Calculates total price including selected modifiers. Handles fixed, percentage, and replace price types.';
