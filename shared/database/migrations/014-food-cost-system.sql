-- Migration: 014-food-cost-system.sql
-- Description: Add food cost tracking to ingredients and menu items
-- Date: 2025-12-06

-- ============================================================================
-- 1. ADD COST COLUMNS TO INGREDIENTS TABLE
-- ============================================================================

-- Cost per unit (e.g., cost per 1kg, per 1L, per 1 piece)
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS cost_per_unit DECIMAL(10, 2);

-- The unit type for the cost (what the cost_per_unit refers to)
-- Examples: 'kg', 'g', 'L', 'ml', 'piece', 'dozen'
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS cost_unit VARCHAR(20) DEFAULT 'kg';

-- Currency for the cost (uses merchant's default currency if not set)
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS cost_currency VARCHAR(3) DEFAULT 'USD';

-- Supplier info (optional)
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS supplier_name VARCHAR(255);
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS supplier_sku VARCHAR(100);

-- Last cost update date
ALTER TABLE ingredients ADD COLUMN IF NOT EXISTS cost_updated_at TIMESTAMPTZ;

-- ============================================================================
-- 2. ADD FOOD COST TO MENU ITEMS TABLE
-- ============================================================================

-- Calculated food cost (sum of all ingredients)
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS food_cost DECIMAL(10, 2);

-- Food cost currency
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS food_cost_currency VARCHAR(3) DEFAULT 'USD';

-- Profit margin percentage (calculated: (price - food_cost) / price * 100)
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS profit_margin DECIMAL(5, 2);

-- Last food cost calculation date
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS food_cost_updated_at TIMESTAMPTZ;

-- ============================================================================
-- 3. CREATE PRODUCT_RECIPES TABLE (LINKS MENU ITEMS TO RECIPE INGREDIENTS)
-- ============================================================================

-- Create product_recipes table if not exists
CREATE TABLE IF NOT EXISTS product_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
  quantity DECIMAL(10, 4) NOT NULL, -- Amount used in the recipe
  unit VARCHAR(20) NOT NULL, -- Unit for the quantity (g, ml, piece, etc.)
  notes TEXT, -- Optional notes (e.g., "finely ground", "fresh")
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(menu_item_id, ingredient_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_product_recipes_menu_item ON product_recipes(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_product_recipes_ingredient ON product_recipes(ingredient_id);

-- ============================================================================
-- 4. HELPER FUNCTION: CONVERT QUANTITY TO COST UNIT
-- ============================================================================

-- Function to convert a quantity from recipe unit to ingredient cost unit
CREATE OR REPLACE FUNCTION convert_to_cost_unit(
  quantity DECIMAL,
  from_unit VARCHAR,
  to_unit VARCHAR
) RETURNS DECIMAL
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  result DECIMAL;
BEGIN
  -- Handle same unit
  IF from_unit = to_unit THEN
    RETURN quantity;
  END IF;

  -- Weight conversions (to grams, then to target)
  IF from_unit IN ('g', 'kg', 'mg', 'oz', 'lb') AND to_unit IN ('g', 'kg', 'mg', 'oz', 'lb') THEN
    -- Convert to grams first
    CASE from_unit
      WHEN 'g' THEN result := quantity;
      WHEN 'kg' THEN result := quantity * 1000;
      WHEN 'mg' THEN result := quantity / 1000;
      WHEN 'oz' THEN result := quantity * 28.3495;
      WHEN 'lb' THEN result := quantity * 453.592;
    END CASE;

    -- Convert from grams to target
    CASE to_unit
      WHEN 'g' THEN RETURN result;
      WHEN 'kg' THEN RETURN result / 1000;
      WHEN 'mg' THEN RETURN result * 1000;
      WHEN 'oz' THEN RETURN result / 28.3495;
      WHEN 'lb' THEN RETURN result / 453.592;
    END CASE;
  END IF;

  -- Volume conversions (to ml, then to target)
  IF from_unit IN ('ml', 'L', 'cl', 'fl_oz', 'cup') AND to_unit IN ('ml', 'L', 'cl', 'fl_oz', 'cup') THEN
    -- Convert to ml first
    CASE from_unit
      WHEN 'ml' THEN result := quantity;
      WHEN 'L' THEN result := quantity * 1000;
      WHEN 'cl' THEN result := quantity * 10;
      WHEN 'fl_oz' THEN result := quantity * 29.5735;
      WHEN 'cup' THEN result := quantity * 236.588;
    END CASE;

    -- Convert from ml to target
    CASE to_unit
      WHEN 'ml' THEN RETURN result;
      WHEN 'L' THEN RETURN result / 1000;
      WHEN 'cl' THEN RETURN result / 10;
      WHEN 'fl_oz' THEN RETURN result / 29.5735;
      WHEN 'cup' THEN RETURN result / 236.588;
    END CASE;
  END IF;

  -- Same unit type assumed (piece, dozen, etc.)
  RETURN quantity;
END;
$$;

-- ============================================================================
-- 5. FUNCTION: CALCULATE FOOD COST FOR A MENU ITEM
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_food_cost(p_menu_item_id UUID)
RETURNS DECIMAL
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  total_cost DECIMAL := 0;
  rec RECORD;
  ingredient_cost DECIMAL;
  converted_qty DECIMAL;
BEGIN
  -- Loop through all ingredients in the recipe
  FOR rec IN
    SELECT
      pr.quantity,
      pr.unit AS recipe_unit,
      i.cost_per_unit,
      i.cost_unit
    FROM product_recipes pr
    JOIN ingredients i ON pr.ingredient_id = i.id
    WHERE pr.menu_item_id = p_menu_item_id
      AND i.cost_per_unit IS NOT NULL
  LOOP
    -- Convert recipe quantity to cost unit
    converted_qty := convert_to_cost_unit(rec.quantity, rec.recipe_unit, rec.cost_unit);

    -- Calculate cost for this ingredient
    ingredient_cost := converted_qty * rec.cost_per_unit;
    total_cost := total_cost + ingredient_cost;
  END LOOP;

  RETURN ROUND(total_cost, 2);
END;
$$;

-- ============================================================================
-- 6. FUNCTION: UPDATE FOOD COST AND MARGIN FOR A MENU ITEM
-- ============================================================================

CREATE OR REPLACE FUNCTION update_menu_item_food_cost(p_menu_item_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  v_food_cost DECIMAL;
  v_price DECIMAL;
  v_margin DECIMAL;
BEGIN
  -- Calculate food cost
  v_food_cost := calculate_food_cost(p_menu_item_id);

  -- Get current price
  SELECT price INTO v_price FROM menu_items WHERE id = p_menu_item_id;

  -- Calculate margin
  IF v_price > 0 AND v_food_cost IS NOT NULL THEN
    v_margin := ((v_price - v_food_cost) / v_price) * 100;
  ELSE
    v_margin := NULL;
  END IF;

  -- Update menu item
  UPDATE menu_items
  SET
    food_cost = v_food_cost,
    profit_margin = ROUND(v_margin, 2),
    food_cost_updated_at = NOW()
  WHERE id = p_menu_item_id;
END;
$$;

-- ============================================================================
-- 7. TRIGGER: AUTO-UPDATE FOOD COST WHEN RECIPE CHANGES
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_update_food_cost()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM update_menu_item_food_cost(OLD.menu_item_id);
    RETURN OLD;
  ELSE
    PERFORM update_menu_item_food_cost(NEW.menu_item_id);
    RETURN NEW;
  END IF;
END;
$$;

DROP TRIGGER IF EXISTS trg_product_recipes_food_cost ON product_recipes;
CREATE TRIGGER trg_product_recipes_food_cost
AFTER INSERT OR UPDATE OR DELETE ON product_recipes
FOR EACH ROW
EXECUTE FUNCTION trigger_update_food_cost();

-- ============================================================================
-- 8. TRIGGER: AUTO-UPDATE FOOD COST WHEN INGREDIENT COST CHANGES
-- ============================================================================

CREATE OR REPLACE FUNCTION trigger_ingredient_cost_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  menu_item_rec RECORD;
BEGIN
  -- Update all menu items that use this ingredient
  FOR menu_item_rec IN
    SELECT DISTINCT menu_item_id FROM product_recipes WHERE ingredient_id = NEW.id
  LOOP
    PERFORM update_menu_item_food_cost(menu_item_rec.menu_item_id);
  END LOOP;

  -- Update cost_updated_at
  NEW.cost_updated_at := NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_ingredient_cost_update ON ingredients;
CREATE TRIGGER trg_ingredient_cost_update
BEFORE UPDATE OF cost_per_unit, cost_unit ON ingredients
FOR EACH ROW
EXECUTE FUNCTION trigger_ingredient_cost_update();

-- ============================================================================
-- 9. RLS POLICIES FOR product_recipes
-- ============================================================================

ALTER TABLE product_recipes ENABLE ROW LEVEL SECURITY;

-- Allow read for all authenticated users
CREATE POLICY "product_recipes_select" ON product_recipes
  FOR SELECT USING (true);

-- Allow insert/update/delete for authenticated users
CREATE POLICY "product_recipes_insert" ON product_recipes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "product_recipes_update" ON product_recipes
  FOR UPDATE USING (true);

CREATE POLICY "product_recipes_delete" ON product_recipes
  FOR DELETE USING (true);

-- ============================================================================
-- 10. UPDATED_AT TRIGGER FOR product_recipes
-- ============================================================================

DROP TRIGGER IF EXISTS set_updated_at_product_recipes ON product_recipes;
CREATE TRIGGER set_updated_at_product_recipes
BEFORE UPDATE ON product_recipes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- DONE!
-- ============================================================================

COMMENT ON TABLE product_recipes IS 'Links menu items to ingredients with quantities for food cost calculation';
COMMENT ON COLUMN ingredients.cost_per_unit IS 'Cost per unit of measurement (e.g., cost per 1kg)';
COMMENT ON COLUMN ingredients.cost_unit IS 'Unit type for cost_per_unit (kg, g, L, ml, piece, etc.)';
COMMENT ON COLUMN menu_items.food_cost IS 'Total calculated food cost based on recipe ingredients';
COMMENT ON COLUMN menu_items.profit_margin IS 'Profit margin percentage: (price - food_cost) / price * 100';
