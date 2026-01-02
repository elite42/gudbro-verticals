-- ============================================================================
-- GUDBRO Menu Management Schema
-- PostgreSQL (Compatible with Supabase, Cloud SQL, self-hosted)
--
-- This schema focuses on the Menu Management flow:
-- Merchants → Menu Items → Categories → Display on PWA
--
-- Part of Sistema 5 Dimensioni integration
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- MERCHANTS (Tenants)
-- ============================================================================

CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Basic Info
  slug VARCHAR(100) UNIQUE NOT NULL, -- URL-friendly identifier (e.g., "roots-danang")
  name VARCHAR(255) NOT NULL,
  description TEXT,

  -- Contact
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),

  -- Location
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(2), -- ISO 3166-1 alpha-2
  timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',

  -- Branding
  logo_url TEXT,
  cover_image_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#000000', -- Hex color
  secondary_color VARCHAR(7) DEFAULT '#ffffff',

  -- Business Settings
  currency VARCHAR(3) DEFAULT 'VND',
  default_language VARCHAR(5) DEFAULT 'en', -- ISO 639-1
  supported_languages VARCHAR(5)[] DEFAULT ARRAY['en'],

  -- SaaS Tier
  tier VARCHAR(20) DEFAULT 'digital_menu' CHECK (tier IN ('digital_menu', 'pre_ordering', 'full_suite')),
  tier_expires_at TIMESTAMPTZ,

  -- WiFi (for Tier 2+)
  wifi_enabled BOOLEAN DEFAULT false,
  wifi_ssid VARCHAR(100),
  wifi_password VARCHAR(100),
  wifi_security VARCHAR(10) DEFAULT 'WPA',

  -- Status
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_merchants_slug ON merchants(slug);
CREATE INDEX idx_merchants_active ON merchants(is_active) WHERE is_active = true;

-- ============================================================================
-- MERCHANT USERS (Staff/Owners with access to backoffice)
-- ============================================================================

CREATE TABLE merchant_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Auth (provider-agnostic - stores external auth ID)
  auth_provider VARCHAR(50) DEFAULT 'email', -- 'email', 'google', 'supabase', 'firebase'
  auth_provider_id VARCHAR(255), -- External auth system ID

  -- Profile
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  phone VARCHAR(50),

  -- Role & Permissions
  role VARCHAR(50) DEFAULT 'staff' CHECK (role IN ('owner', 'admin', 'manager', 'staff')),
  permissions JSONB DEFAULT '{}', -- Granular permissions if needed

  -- Status
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, email)
);

CREATE INDEX idx_merchant_users_merchant ON merchant_users(merchant_id);
CREATE INDEX idx_merchant_users_email ON merchant_users(email);
CREATE INDEX idx_merchant_users_auth ON merchant_users(auth_provider, auth_provider_id);

-- ============================================================================
-- MENU CATEGORIES
-- ============================================================================

CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Basic Info
  slug VARCHAR(100) NOT NULL,
  name JSONB NOT NULL, -- {"en": "Hot Coffee", "vi": "Cà phê nóng"}
  description JSONB,

  -- Visual
  icon VARCHAR(10), -- Emoji
  image_url TEXT,
  color VARCHAR(7), -- Hex color

  -- Display
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  -- Time-based visibility (optional)
  visible_from TIME,
  visible_to TIME,
  visible_days INTEGER[], -- 0=Sunday, 6=Saturday

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, slug)
);

CREATE INDEX idx_menu_categories_merchant ON menu_categories(merchant_id);
CREATE INDEX idx_menu_categories_active ON menu_categories(merchant_id, is_active) WHERE is_active = true;

-- ============================================================================
-- MENU ITEMS (Merchant's Products)
-- ============================================================================

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,

  -- Basic Info
  slug VARCHAR(100) NOT NULL,
  name JSONB NOT NULL, -- {"en": "Espresso", "vi": "Cà phê Espresso"}
  description JSONB,
  short_description JSONB,

  -- Pricing
  price DECIMAL(12,2) NOT NULL,
  compare_at_price DECIMAL(12,2), -- Original price for discounts
  currency VARCHAR(3) DEFAULT 'VND',

  -- Images
  image_url TEXT,
  thumbnail_url TEXT,
  gallery_urls TEXT[],

  -- ========== SISTEMA 51 FILTRI (Auto-computed or manual) ==========

  -- Allergens (30 types) - JSONB flags
  allergens JSONB DEFAULT '{}', -- {gluten: true, milk: true, ...}

  -- Intolerances (10 types)
  intolerances JSONB DEFAULT '{}', -- {lactose: true, caffeine: true, ...}

  -- Dietary Flags (11 types)
  dietary_flags JSONB DEFAULT '{}', -- {vegan: true, halal: true, ...}

  -- Spice Level (0-5)
  spice_level SMALLINT DEFAULT 0 CHECK (spice_level >= 0 AND spice_level <= 5),

  -- If linked to master recipe, safety data is auto-computed
  based_on_recipe_id UUID, -- Reference to shared master_recipes if using centralized database
  safety_data_source VARCHAR(20) DEFAULT 'manual' CHECK (safety_data_source IN ('manual', 'computed', 'recipe')),

  -- ================================================================

  -- Nutrition (optional)
  calories INTEGER,
  nutrition_info JSONB, -- Full nutrition data

  -- Customizations
  customizations JSONB DEFAULT '[]', -- [{type, name, options[], required, maxSelections}]

  -- Inventory
  track_inventory BOOLEAN DEFAULT false,
  inventory_count INTEGER,
  low_stock_threshold INTEGER DEFAULT 10,

  -- Availability
  is_available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  new_until DATE,

  -- Time-based availability
  available_from TIME,
  available_to TIME,
  available_days INTEGER[],

  -- Display
  display_order INTEGER DEFAULT 0,
  tags TEXT[],

  -- Stats
  total_orders INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, slug)
);

CREATE INDEX idx_menu_items_merchant ON menu_items(merchant_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_active ON menu_items(merchant_id, is_active) WHERE is_active = true;
CREATE INDEX idx_menu_items_available ON menu_items(merchant_id, is_available) WHERE is_available = true;
CREATE INDEX idx_menu_items_featured ON menu_items(merchant_id, is_featured) WHERE is_featured = true;
CREATE INDEX idx_menu_items_allergens ON menu_items USING GIN(allergens);
CREATE INDEX idx_menu_items_dietary ON menu_items USING GIN(dietary_flags);

-- ============================================================================
-- MENU ITEM INGREDIENTS (For auto-computing safety data)
-- ============================================================================

CREATE TABLE menu_item_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,

  -- Reference to master ingredient (from shared food-database)
  master_ingredient_id UUID, -- Links to shared master_ingredients table

  -- Or manual entry
  ingredient_name JSONB, -- {"en": "Milk", "vi": "Sữa"}

  -- Quantity
  quantity DECIMAL(10,3),
  unit VARCHAR(20),

  -- Flags from ingredient (cached for performance)
  allergens JSONB DEFAULT '{}',
  intolerances JSONB DEFAULT '{}',
  dietary_flags JSONB DEFAULT '{}',

  -- Nutrition per 100g (cached from master ingredient)
  calories_per_100g DECIMAL(8,2),
  protein_per_100g DECIMAL(6,2),
  carbs_per_100g DECIMAL(6,2),
  fat_per_100g DECIMAL(6,2),
  fiber_per_100g DECIMAL(6,2),
  sugar_per_100g DECIMAL(6,2),

  is_optional BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_item_ingredients_item ON menu_item_ingredients(menu_item_id);

-- ============================================================================
-- FUNCTIONS: Auto-compute safety data from ingredients
-- ============================================================================

CREATE OR REPLACE FUNCTION compute_menu_item_safety(p_item_id UUID)
RETURNS VOID AS $$
DECLARE
  v_allergens JSONB := '{}';
  v_intolerances JSONB := '{}';
  v_dietary_flags JSONB := '{}';
  v_max_spice SMALLINT := 0;
  v_total_calories INTEGER := 0;
  v_total_protein DECIMAL := 0;
  v_total_carbs DECIMAL := 0;
  v_total_fat DECIMAL := 0;
  v_total_fiber DECIMAL := 0;
  v_row RECORD;
  v_key TEXT;
  v_value TEXT;
  v_quantity_factor DECIMAL;
BEGIN
  -- Aggregate from all ingredients
  FOR v_row IN
    SELECT
      allergens,
      intolerances,
      dietary_flags,
      quantity,
      unit,
      calories_per_100g,
      protein_per_100g,
      carbs_per_100g,
      fat_per_100g,
      fiber_per_100g
    FROM menu_item_ingredients
    WHERE menu_item_id = p_item_id
  LOOP
    -- Merge allergens (any TRUE means item contains it)
    FOR v_key, v_value IN SELECT * FROM jsonb_each_text(v_row.allergens)
    LOOP
      IF v_value::BOOLEAN THEN
        v_allergens := v_allergens || jsonb_build_object(v_key, true);
      END IF;
    END LOOP;

    -- Merge intolerances
    FOR v_key, v_value IN SELECT * FROM jsonb_each_text(v_row.intolerances)
    LOOP
      IF v_value::BOOLEAN THEN
        v_intolerances := v_intolerances || jsonb_build_object(v_key, true);
      END IF;
    END LOOP;

    -- Calculate nutrition if we have quantity and nutrition data
    IF v_row.quantity IS NOT NULL AND v_row.calories_per_100g IS NOT NULL THEN
      -- Convert quantity to grams factor (nutrition is per 100g)
      v_quantity_factor := CASE v_row.unit
        WHEN 'g' THEN v_row.quantity / 100.0
        WHEN 'ml' THEN v_row.quantity / 100.0  -- Approximate 1ml = 1g
        WHEN 'oz' THEN (v_row.quantity * 28.35) / 100.0
        WHEN 'cup' THEN (v_row.quantity * 240) / 100.0
        WHEN 'tbsp' THEN (v_row.quantity * 15) / 100.0
        WHEN 'tsp' THEN (v_row.quantity * 5) / 100.0
        WHEN 'piece' THEN (v_row.quantity * 50) / 100.0  -- Default 50g per piece
        ELSE v_row.quantity / 100.0
      END;

      v_total_calories := v_total_calories + ROUND(v_row.calories_per_100g * v_quantity_factor);
      v_total_protein := v_total_protein + (COALESCE(v_row.protein_per_100g, 0) * v_quantity_factor);
      v_total_carbs := v_total_carbs + (COALESCE(v_row.carbs_per_100g, 0) * v_quantity_factor);
      v_total_fat := v_total_fat + (COALESCE(v_row.fat_per_100g, 0) * v_quantity_factor);
      v_total_fiber := v_total_fiber + (COALESCE(v_row.fiber_per_100g, 0) * v_quantity_factor);
    END IF;
  END LOOP;

  -- Update menu item with safety data AND calculated nutrition
  UPDATE menu_items SET
    allergens = v_allergens,
    intolerances = v_intolerances,
    safety_data_source = 'computed',
    calories = CASE WHEN v_total_calories > 0 THEN v_total_calories ELSE calories END,
    nutrition_info = CASE
      WHEN v_total_calories > 0 THEN
        jsonb_build_object(
          'calories', v_total_calories,
          'protein', ROUND(v_total_protein::NUMERIC, 1),
          'carbohydrates', ROUND(v_total_carbs::NUMERIC, 1),
          'fat', ROUND(v_total_fat::NUMERIC, 1),
          'fiber', ROUND(v_total_fiber::NUMERIC, 1),
          'computed_at', NOW()
        )
      ELSE nutrition_info
    END,
    updated_at = NOW()
  WHERE id = p_item_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-compute when ingredients change
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

CREATE TRIGGER auto_compute_item_safety
  AFTER INSERT OR UPDATE OR DELETE ON menu_item_ingredients
  FOR EACH ROW EXECUTE FUNCTION trigger_compute_item_safety();

-- ============================================================================
-- FUNCTIONS: Update timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_merchants_updated_at
  BEFORE UPDATE ON merchants FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_merchant_users_updated_at
  BEFORE UPDATE ON merchant_users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_menu_categories_updated_at
  BEFORE UPDATE ON menu_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- ROW LEVEL SECURITY (For multi-tenant SaaS)
-- Enable when using Supabase or similar
-- ============================================================================

-- Example RLS policies (uncomment when needed):

-- ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE merchant_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own merchant's data
-- CREATE POLICY "Users can view own merchant" ON merchants
--   FOR SELECT USING (id IN (
--     SELECT merchant_id FROM merchant_users WHERE auth_provider_id = auth.uid()
--   ));

-- CREATE POLICY "Users can view own menu items" ON menu_items
--   FOR ALL USING (merchant_id IN (
--     SELECT merchant_id FROM merchant_users WHERE auth_provider_id = auth.uid()
--   ));

-- ============================================================================
-- VIEWS: Useful queries
-- ============================================================================

-- View: Menu items with category info
CREATE OR REPLACE VIEW v_menu_items_full AS
SELECT
  mi.*,
  mc.name AS category_name,
  mc.slug AS category_slug,
  mc.icon AS category_icon,
  mc.display_order AS category_display_order,
  m.name AS merchant_name,
  m.slug AS merchant_slug,
  m.currency AS merchant_currency,
  m.default_language AS merchant_default_language
FROM menu_items mi
LEFT JOIN menu_categories mc ON mc.id = mi.category_id
JOIN merchants m ON m.id = mi.merchant_id
WHERE mi.is_active = true;

-- View: Active menu for PWA consumption
CREATE OR REPLACE VIEW v_merchant_menu AS
SELECT
  m.slug AS merchant_slug,
  m.name AS merchant_name,
  m.logo_url,
  m.primary_color,
  m.currency,
  m.default_language,
  m.supported_languages,
  m.wifi_enabled,
  m.wifi_ssid,
  jsonb_agg(
    jsonb_build_object(
      'id', mc.id,
      'slug', mc.slug,
      'name', mc.name,
      'icon', mc.icon,
      'display_order', mc.display_order,
      'items', (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', mi.id,
            'slug', mi.slug,
            'name', mi.name,
            'description', mi.description,
            'price', mi.price,
            'image_url', mi.image_url,
            'allergens', mi.allergens,
            'intolerances', mi.intolerances,
            'dietary_flags', mi.dietary_flags,
            'spice_level', mi.spice_level,
            'customizations', mi.customizations,
            'is_featured', mi.is_featured,
            'is_new', mi.is_new,
            'display_order', mi.display_order
          ) ORDER BY mi.display_order
        )
        FROM menu_items mi
        WHERE mi.category_id = mc.id
          AND mi.is_active = true
          AND mi.is_available = true
      )
    ) ORDER BY mc.display_order
  ) AS categories
FROM merchants m
LEFT JOIN menu_categories mc ON mc.merchant_id = m.id AND mc.is_active = true
WHERE m.is_active = true
GROUP BY m.id;

-- ============================================================================
-- SEED DATA: Demo merchant for development
-- ============================================================================

-- Insert demo merchant
INSERT INTO merchants (
  slug, name, description, email,
  city, country, currency, default_language, supported_languages,
  tier, wifi_enabled, wifi_ssid
) VALUES (
  'demo-cafe',
  'Demo Café',
  'A demo coffee shop for testing',
  'demo@gudbro.com',
  'Ho Chi Minh City', 'VN', 'VND', 'en', ARRAY['en', 'vi'],
  'full_suite', true, 'Demo_Guest_WiFi'
) ON CONFLICT (slug) DO NOTHING;

-- Insert demo categories
INSERT INTO menu_categories (merchant_id, slug, name, icon, display_order)
SELECT
  m.id,
  unnest(ARRAY['hot-coffee', 'iced-coffee', 'food', 'desserts']),
  unnest(ARRAY[
    '{"en": "Hot Coffee", "vi": "Cà phê nóng"}'::jsonb,
    '{"en": "Iced Coffee", "vi": "Cà phê đá"}'::jsonb,
    '{"en": "Food", "vi": "Đồ ăn"}'::jsonb,
    '{"en": "Desserts", "vi": "Tráng miệng"}'::jsonb
  ]),
  unnest(ARRAY['☕', '🧊', '🍽️', '🍰']),
  unnest(ARRAY[1, 2, 3, 4])
FROM merchants m
WHERE m.slug = 'demo-cafe'
ON CONFLICT (merchant_id, slug) DO NOTHING;
