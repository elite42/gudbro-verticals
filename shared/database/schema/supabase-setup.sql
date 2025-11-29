-- ============================================================================
-- GUDBRO Supabase Setup
--
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- This creates all tables, functions, and seed data for Menu Management
-- ============================================================================

-- Enable UUID extension (usually enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- MERCHANTS (Tenants)
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(2),
  timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
  logo_url TEXT,
  cover_image_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#000000',
  secondary_color VARCHAR(7) DEFAULT '#ffffff',
  currency VARCHAR(3) DEFAULT 'VND',
  default_language VARCHAR(5) DEFAULT 'en',
  supported_languages VARCHAR(5)[] DEFAULT ARRAY['en'],
  tier VARCHAR(20) DEFAULT 'digital_menu' CHECK (tier IN ('digital_menu', 'pre_ordering', 'full_suite')),
  tier_expires_at TIMESTAMPTZ,
  wifi_enabled BOOLEAN DEFAULT false,
  wifi_ssid VARCHAR(100),
  wifi_password VARCHAR(100),
  wifi_security VARCHAR(10) DEFAULT 'WPA',
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_merchants_slug ON merchants(slug);

-- ============================================================================
-- MERCHANT USERS
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  auth_provider VARCHAR(50) DEFAULT 'email',
  auth_provider_id VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'staff' CHECK (role IN ('owner', 'admin', 'manager', 'staff')),
  permissions JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(merchant_id, email)
);

CREATE INDEX IF NOT EXISTS idx_merchant_users_merchant ON merchant_users(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_users_email ON merchant_users(email);

-- ============================================================================
-- MENU CATEGORIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  name_multilang JSONB NOT NULL,
  description_multilang JSONB,
  icon VARCHAR(10),
  image_url TEXT,
  color VARCHAR(7),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  available_from TIME,
  available_until TIME,
  visible_days INTEGER[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(merchant_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_menu_categories_merchant ON menu_categories(merchant_id);

-- ============================================================================
-- INGREDIENTS (Master Ingredient Database)
-- ============================================================================

CREATE TABLE IF NOT EXISTS ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,
  slug VARCHAR(100) NOT NULL,
  name_multilang JSONB NOT NULL,
  allergens JSONB DEFAULT '{}',
  intolerances JSONB DEFAULT '{}',
  dietary_flags JSONB DEFAULT '{}',
  calories_per_100g DECIMAL(8,2),
  protein_per_100g DECIMAL(6,2),
  carbs_per_100g DECIMAL(6,2),
  fat_per_100g DECIMAL(6,2),
  fiber_per_100g DECIMAL(6,2),
  is_global BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create unique index for ingredient slug per merchant (global ingredients have merchant_id = NULL)
CREATE UNIQUE INDEX IF NOT EXISTS idx_ingredients_unique_slug
  ON ingredients(merchant_id, slug) WHERE merchant_id IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_ingredients_unique_slug_global
  ON ingredients(slug) WHERE merchant_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_ingredients_merchant ON ingredients(merchant_id);
CREATE INDEX IF NOT EXISTS idx_ingredients_global ON ingredients(is_global) WHERE is_global = true;

-- ============================================================================
-- MENU ITEMS
-- ============================================================================

CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  slug VARCHAR(100) NOT NULL,
  name_multilang JSONB NOT NULL,
  description_multilang JSONB,
  short_description_multilang JSONB,
  price DECIMAL(12,2) NOT NULL,
  compare_at_price DECIMAL(12,2),
  currency VARCHAR(3) DEFAULT 'VND',
  image_url TEXT,
  thumbnail_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  allergens JSONB DEFAULT '{}',
  intolerances JSONB DEFAULT '{}',
  dietary_flags JSONB DEFAULT '{}',
  spice_level SMALLINT DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),
  based_on_recipe_id UUID,
  safety_data_source VARCHAR(20) DEFAULT 'manual' CHECK (safety_data_source IN ('manual', 'computed', 'recipe')),
  calories INTEGER,
  protein_g DECIMAL(6,2),
  carbs_g DECIMAL(6,2),
  fat_g DECIMAL(6,2),
  fiber_g DECIMAL(6,2),
  nutrition_info JSONB,
  customizations JSONB DEFAULT '[]',
  track_inventory BOOLEAN DEFAULT false,
  inventory_count INTEGER,
  low_stock_threshold INTEGER DEFAULT 10,
  is_available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  new_until DATE,
  available_from TIME,
  available_until TIME,
  available_days INTEGER[],
  display_order INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  seo_title VARCHAR(255),
  seo_description TEXT,
  total_orders INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(merchant_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_menu_items_merchant ON menu_items(merchant_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_allergens ON menu_items USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_menu_items_dietary ON menu_items USING GIN(dietary_flags);

-- ============================================================================
-- MENU ITEM INGREDIENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS menu_item_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE SET NULL,
  quantity_grams DECIMAL(10,3) DEFAULT 0,
  is_optional BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_menu_item_ingredients_item ON menu_item_ingredients(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_menu_item_ingredients_ingredient ON menu_item_ingredients(ingredient_id);

-- ============================================================================
-- FUNCTION: Compute Menu Item Safety from Ingredients
-- ============================================================================

CREATE OR REPLACE FUNCTION compute_menu_item_safety(p_item_id UUID)
RETURNS VOID AS $$
DECLARE
  v_allergens JSONB := '{}';
  v_intolerances JSONB := '{}';
  v_dietary_flags JSONB := '{}';
  v_total_calories DECIMAL := 0;
  v_total_protein DECIMAL := 0;
  v_total_carbs DECIMAL := 0;
  v_total_fat DECIMAL := 0;
  v_total_fiber DECIMAL := 0;
  v_row RECORD;
  v_key TEXT;
  v_value BOOLEAN;
  v_quantity_factor DECIMAL;
BEGIN
  -- Aggregate from all ingredients
  FOR v_row IN
    SELECT
      i.allergens,
      i.intolerances,
      i.dietary_flags,
      i.calories_per_100g,
      i.protein_per_100g,
      i.carbs_per_100g,
      i.fat_per_100g,
      i.fiber_per_100g,
      mii.quantity_grams
    FROM menu_item_ingredients mii
    JOIN ingredients i ON i.id = mii.ingredient_id
    WHERE mii.menu_item_id = p_item_id
  LOOP
    -- Merge allergens (any TRUE means item contains it)
    FOR v_key, v_value IN SELECT key, value::boolean FROM jsonb_each_text(v_row.allergens) WHERE value = 'true'
    LOOP
      v_allergens := v_allergens || jsonb_build_object(v_key, true);
    END LOOP;

    -- Merge intolerances
    FOR v_key, v_value IN SELECT key, value::boolean FROM jsonb_each_text(v_row.intolerances) WHERE value = 'true'
    LOOP
      v_intolerances := v_intolerances || jsonb_build_object(v_key, true);
    END LOOP;

    -- Calculate nutrition if we have quantity and nutrition data
    IF v_row.quantity_grams > 0 AND v_row.calories_per_100g IS NOT NULL THEN
      v_quantity_factor := v_row.quantity_grams / 100.0;
      v_total_calories := v_total_calories + (v_row.calories_per_100g * v_quantity_factor);
      v_total_protein := v_total_protein + (COALESCE(v_row.protein_per_100g, 0) * v_quantity_factor);
      v_total_carbs := v_total_carbs + (COALESCE(v_row.carbs_per_100g, 0) * v_quantity_factor);
      v_total_fat := v_total_fat + (COALESCE(v_row.fat_per_100g, 0) * v_quantity_factor);
      v_total_fiber := v_total_fiber + (COALESCE(v_row.fiber_per_100g, 0) * v_quantity_factor);
    END IF;
  END LOOP;

  -- Update menu item with computed safety data and nutrition
  UPDATE menu_items SET
    allergens = v_allergens,
    intolerances = v_intolerances,
    safety_data_source = 'computed',
    calories = CASE WHEN v_total_calories > 0 THEN ROUND(v_total_calories) ELSE calories END,
    protein_g = CASE WHEN v_total_calories > 0 THEN ROUND(v_total_protein::NUMERIC, 1) ELSE protein_g END,
    carbs_g = CASE WHEN v_total_calories > 0 THEN ROUND(v_total_carbs::NUMERIC, 1) ELSE carbs_g END,
    fat_g = CASE WHEN v_total_calories > 0 THEN ROUND(v_total_fat::NUMERIC, 1) ELSE fat_g END,
    fiber_g = CASE WHEN v_total_calories > 0 THEN ROUND(v_total_fiber::NUMERIC, 1) ELSE fiber_g END,
    updated_at = NOW()
  WHERE id = p_item_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: Auto-compute when ingredients change
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_compute_item_safety()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM compute_menu_item_safety(OLD.menu_item_id);
    RETURN OLD;
  ELSE
    PERFORM compute_menu_item_safety(NEW.menu_item_id);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS auto_compute_item_safety ON menu_item_ingredients;
CREATE TRIGGER auto_compute_item_safety
  AFTER INSERT OR UPDATE OR DELETE ON menu_item_ingredients
  FOR EACH ROW EXECUTE FUNCTION trigger_compute_item_safety();

-- ============================================================================
-- TRIGGER: Auto-update timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_merchants_updated_at ON merchants;
CREATE TRIGGER update_merchants_updated_at
  BEFORE UPDATE ON merchants FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_merchant_users_updated_at ON merchant_users;
CREATE TRIGGER update_merchant_users_updated_at
  BEFORE UPDATE ON merchant_users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_menu_categories_updated_at ON menu_categories;
CREATE TRIGGER update_menu_categories_updated_at
  BEFORE UPDATE ON menu_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_menu_items_updated_at ON menu_items;
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_ingredients_updated_at ON ingredients;
CREATE TRIGGER update_ingredients_updated_at
  BEFORE UPDATE ON ingredients FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- SEED DATA: Demo Merchant
-- ============================================================================

INSERT INTO merchants (
  slug, name, description, email,
  city, country, currency, default_language, supported_languages,
  tier, wifi_enabled, wifi_ssid, primary_color
) VALUES (
  'demo-cafe',
  'Demo Café',
  'A demo coffee shop for testing GUDBRO Menu Management',
  'demo@gudbro.com',
  'Ho Chi Minh City', 'VN', 'VND', 'en', ARRAY['en', 'vi', 'ko', 'ja'],
  'full_suite', true, 'Demo_Guest_WiFi', '#6B4423'
) ON CONFLICT (slug) DO NOTHING;

-- Get the demo merchant ID for subsequent inserts
DO $$
DECLARE
  v_merchant_id UUID;
  v_cat_hot UUID;
  v_cat_iced UUID;
  v_cat_food UUID;
BEGIN
  SELECT id INTO v_merchant_id FROM merchants WHERE slug = 'demo-cafe';

  -- Insert categories
  INSERT INTO menu_categories (merchant_id, slug, name_multilang, icon, display_order)
  VALUES
    (v_merchant_id, 'hot-coffee', '{"en": "Hot Coffee", "vi": "Cà phê nóng", "ko": "핫 커피", "ja": "ホットコーヒー"}', '☕', 1),
    (v_merchant_id, 'iced-coffee', '{"en": "Iced Coffee", "vi": "Cà phê đá", "ko": "아이스 커피", "ja": "アイスコーヒー"}', '🧊', 2),
    (v_merchant_id, 'food', '{"en": "Food", "vi": "Đồ ăn", "ko": "음식", "ja": "フード"}', '🍽️', 3),
    (v_merchant_id, 'desserts', '{"en": "Desserts", "vi": "Tráng miệng", "ko": "디저트", "ja": "デザート"}', '🍰', 4)
  ON CONFLICT (merchant_id, slug) DO NOTHING;

  -- Get category IDs
  SELECT id INTO v_cat_hot FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'hot-coffee';
  SELECT id INTO v_cat_iced FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'iced-coffee';
  SELECT id INTO v_cat_food FROM menu_categories WHERE merchant_id = v_merchant_id AND slug = 'food';

  -- Insert menu items
  INSERT INTO menu_items (merchant_id, category_id, slug, name_multilang, description_multilang, price, allergens, intolerances, dietary_flags, spice_level, is_featured, display_order)
  VALUES
    (v_merchant_id, v_cat_hot, 'espresso',
     '{"en": "Espresso", "vi": "Cà phê Espresso"}',
     '{"en": "Rich and bold single shot espresso", "vi": "Cà phê đậm đà, một shot"}',
     45000, '{}', '{"caffeine": true}', '{"vegan": true}', 0, true, 1),

    (v_merchant_id, v_cat_hot, 'cappuccino',
     '{"en": "Cappuccino", "vi": "Cà phê Cappuccino"}',
     '{"en": "Espresso with steamed milk foam", "vi": "Espresso với bọt sữa hấp"}',
     65000, '{"milk": true}', '{"lactose": true, "caffeine": true}', '{}', 0, true, 2),

    (v_merchant_id, v_cat_iced, 'iced-latte',
     '{"en": "Iced Latte", "vi": "Latte đá"}',
     '{"en": "Chilled espresso with cold milk", "vi": "Espresso lạnh với sữa"}',
     70000, '{"milk": true}', '{"lactose": true, "caffeine": true}', '{}', 0, false, 1),

    (v_merchant_id, v_cat_food, 'banh-mi',
     '{"en": "Bánh Mì", "vi": "Bánh Mì thịt"}',
     '{"en": "Vietnamese baguette with grilled pork", "vi": "Bánh mì với thịt nướng"}',
     55000, '{"gluten": true, "sesame": true}', '{}', '{}', 1, true, 1),

    (v_merchant_id, v_cat_food, 'pho',
     '{"en": "Phở", "vi": "Phở bò"}',
     '{"en": "Traditional Vietnamese beef noodle soup", "vi": "Phở bò truyền thống"}',
     85000, '{"gluten": true}', '{}', '{}', 2, false, 2)
  ON CONFLICT (merchant_id, slug) DO NOTHING;

  -- Insert some global ingredients
  INSERT INTO ingredients (slug, name_multilang, allergens, intolerances, dietary_flags, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, is_global)
  VALUES
    ('whole-milk', '{"en": "Whole Milk", "vi": "Sữa nguyên kem"}', '{"milk": true}', '{"lactose": true}', '{}', 61, 3.2, 4.8, 3.3, true),
    ('espresso-shot', '{"en": "Espresso Shot", "vi": "Shot Espresso"}', '{}', '{"caffeine": true}', '{"vegan": true}', 2, 0.1, 0.4, 0, true),
    ('wheat-flour', '{"en": "Wheat Flour", "vi": "Bột mì"}', '{"gluten": true}', '{}', '{"vegan": true}', 364, 10.3, 76.3, 1, true),
    ('pork', '{"en": "Pork", "vi": "Thịt heo"}', '{}', '{}', '{}', 242, 27, 0, 14, true),
    ('beef', '{"en": "Beef", "vi": "Thịt bò"}', '{}', '{}', '{}', 250, 26, 0, 15, true),
    ('rice-noodles', '{"en": "Rice Noodles", "vi": "Phở"}', '{}', '{}', '{"vegan": true, "gluten_free": true}', 109, 0.9, 25, 0.2, true),
    ('sesame-seeds', '{"en": "Sesame Seeds", "vi": "Hạt mè"}', '{"sesame": true}', '{}', '{"vegan": true}', 573, 17.7, 23.5, 49.7, true)
  ON CONFLICT DO NOTHING;
END $$;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
SELECT 'GUDBRO Schema created successfully! ✅' AS status;
SELECT COUNT(*) AS merchant_count FROM merchants;
SELECT COUNT(*) AS category_count FROM menu_categories;
SELECT COUNT(*) AS item_count FROM menu_items;
SELECT COUNT(*) AS ingredient_count FROM ingredients;
