-- ============================================================================
-- GUDBRO Security Fix: Add search_path to Functions
-- Migration: 002-fix-function-search-path
-- Date: 2025-12-03
--
-- Fixes 8 WARNINGS from Supabase Security Advisor
-- "Function Search Path Mutable" vulnerability
-- ============================================================================

-- ============================================================================
-- FUNCTION 1: generate_order_number_standalone
-- ============================================================================

CREATE OR REPLACE FUNCTION public.generate_order_number_standalone()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_next_number INTEGER;
BEGIN
  SELECT COALESCE(MAX(order_number), 0) + 1 INTO v_next_number
  FROM orders
  WHERE DATE(submitted_at) = CURRENT_DATE;

  RETURN v_next_number;
END;
$$;

-- ============================================================================
-- FUNCTION 2: generate_order_code_standalone
-- ============================================================================

CREATE OR REPLACE FUNCTION public.generate_order_code_standalone(p_order_number INTEGER)
RETURNS VARCHAR(10)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_letter CHAR(1);
  v_group INTEGER;
BEGIN
  v_group := (p_order_number - 1) / 100;
  v_letter := CHR(65 + (v_group % 6));
  RETURN v_letter || '-' || LPAD((((p_order_number - 1) % 100) + 1)::TEXT, 3, '0');
END;
$$;

-- ============================================================================
-- FUNCTION 3: trigger_set_order_number_standalone
-- ============================================================================

CREATE OR REPLACE FUNCTION public.trigger_set_order_number_standalone()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = 1 THEN
    NEW.order_number := generate_order_number_standalone();
  END IF;

  IF NEW.order_code IS NULL OR NEW.order_code = 'A-001' THEN
    NEW.order_code := generate_order_code_standalone(NEW.order_number);
  END IF;

  RETURN NEW;
END;
$$;

-- ============================================================================
-- FUNCTION 4: trigger_order_status_timestamp
-- (Note: In the schema it's called trigger_order_status_timestamps_standalone)
-- ============================================================================

CREATE OR REPLACE FUNCTION public.trigger_order_status_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    CASE NEW.status
      WHEN 'confirmed' THEN NEW.confirmed_at := NOW();
      WHEN 'preparing' THEN NEW.preparing_at := NOW();
      WHEN 'ready' THEN NEW.ready_at := NOW();
      WHEN 'delivered' THEN NEW.delivered_at := NOW();
      WHEN 'cancelled' THEN NEW.cancelled_at := NOW();
      ELSE NULL;
    END CASE;

    NEW.updated_at := NOW();
  END IF;

  RETURN NEW;
END;
$$;

-- Also update the standalone version if it exists
CREATE OR REPLACE FUNCTION public.trigger_order_status_timestamps_standalone()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    CASE NEW.status
      WHEN 'confirmed' THEN NEW.confirmed_at := NOW();
      WHEN 'preparing' THEN NEW.preparing_at := NOW();
      WHEN 'ready' THEN NEW.ready_at := NOW();
      WHEN 'delivered' THEN NEW.delivered_at := NOW();
      WHEN 'cancelled' THEN NEW.cancelled_at := NOW();
      ELSE NULL;
    END CASE;

    NEW.updated_at := NOW();
  END IF;

  RETURN NEW;
END;
$$;

-- ============================================================================
-- FUNCTION 5: trigger_log_order_status_standalone
-- ============================================================================

CREATE OR REPLACE FUNCTION public.trigger_log_order_status_standalone()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO order_status_history (order_id, from_status, to_status)
    VALUES (NEW.id, OLD.status, NEW.status);
  END IF;

  RETURN NEW;
END;
$$;

-- ============================================================================
-- FUNCTION 6: compute_menu_item_safety
-- ============================================================================

CREATE OR REPLACE FUNCTION public.compute_menu_item_safety(p_item_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
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
$$;

-- ============================================================================
-- FUNCTION 7: trigger_compute_item_safety
-- ============================================================================

CREATE OR REPLACE FUNCTION public.trigger_compute_item_safety()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM compute_menu_item_safety(OLD.menu_item_id);
    RETURN OLD;
  ELSE
    PERFORM compute_menu_item_safety(NEW.menu_item_id);
    RETURN NEW;
  END IF;
END;
$$;

-- ============================================================================
-- FUNCTION 8: update_updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

SELECT
  proname as function_name,
  proconfig as config
FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
  AND proname IN (
    'generate_order_number_standalone',
    'generate_order_code_standalone',
    'trigger_set_order_number_standalone',
    'trigger_order_status_timestamp',
    'trigger_order_status_timestamps_standalone',
    'trigger_log_order_status_standalone',
    'compute_menu_item_safety',
    'trigger_compute_item_safety',
    'update_updated_at'
  )
ORDER BY proname;

-- ============================================================================
-- NOTE: Run this in Supabase SQL Editor
-- After running, check Security Advisor - warnings should be resolved
-- ============================================================================
