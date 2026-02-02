-- ============================================================================
-- CONVENTIONS BENEFIT SCOPE: Accommodation-Aware Discount Calculation
-- Migration 099
-- ============================================================================
-- Extends partner_conventions with benefit_scope column for accommodations.
-- Creates validate_accommodation_voucher() RPC with scope-aware discount
-- calculation (per_order, per_night, per_stay, flat).
--
-- Does NOT modify existing validate_voucher() function (coffeeshop compat).
-- ============================================================================

-- ============================================================================
-- 1. ADD benefit_scope COLUMN
-- ============================================================================

ALTER TABLE partner_conventions
  ADD COLUMN IF NOT EXISTS benefit_scope TEXT DEFAULT 'per_order'
    CHECK (benefit_scope IN ('per_order', 'per_night', 'per_stay', 'flat'));

COMMENT ON COLUMN partner_conventions.benefit_scope IS
  'How the benefit is applied for accommodations: per_order=single discount on total booking, per_night=fixed amount multiplied by number of nights, per_stay=single amount for entire stay, flat=fixed amount regardless of duration (alias for per_order)';

-- ============================================================================
-- 2. validate_accommodation_voucher() RPC
-- ============================================================================
-- Accepts property_id (not merchant_id) because conventions link to
-- accommodation properties via partner_type='accommodation' + partner_id.
--
-- Returns discount_amount as INTEGER minor currency units matching the
-- subtotal format (e.g., 500000 for 500,000 VND or 4500 for $45.00 USD).
-- ============================================================================

CREATE OR REPLACE FUNCTION validate_accommodation_voucher(
  p_voucher_code TEXT,
  p_property_id UUID,
  p_num_nights INTEGER DEFAULT 1,
  p_subtotal INTEGER DEFAULT 0
)
RETURNS TABLE(
  is_valid BOOLEAN,
  error_message TEXT,
  convention_id UUID,
  voucher_id UUID,
  benefit_type TEXT,
  benefit_value DECIMAL,
  benefit_scope TEXT,
  discount_amount INTEGER,
  partner_name TEXT,
  convention_name TEXT
) AS $$
DECLARE
  v_voucher convention_vouchers%ROWTYPE;
  v_convention partner_conventions%ROWTYPE;
  v_calc_discount INTEGER;
BEGIN
  -- 1. Find voucher by code
  SELECT * INTO v_voucher
  FROM convention_vouchers cv
  WHERE cv.voucher_code = p_voucher_code;

  IF NOT FOUND THEN
    RETURN QUERY SELECT
      false, 'Voucher not found'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 2. Check voucher is active
  IF NOT v_voucher.is_active THEN
    RETURN QUERY SELECT
      false, 'Voucher is deactivated'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 3. Check voucher validity period
  IF v_voucher.valid_until IS NOT NULL AND v_voucher.valid_until < NOW() THEN
    RETURN QUERY SELECT
      false, 'Voucher has expired'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 4. Check usage limit
  IF v_voucher.times_used >= v_voucher.max_uses THEN
    RETURN QUERY SELECT
      false, 'Voucher usage limit reached'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 5. Find convention
  SELECT * INTO v_convention
  FROM partner_conventions pc
  WHERE pc.id = v_voucher.convention_id;

  IF NOT FOUND THEN
    RETURN QUERY SELECT
      false, 'Convention not found'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 6. Check convention is active
  IF NOT v_convention.is_active THEN
    RETURN QUERY SELECT
      false, 'Convention is not active'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 7. Check partner type is accommodation and partner_id matches property
  IF v_convention.partner_type != 'accommodation' THEN
    RETURN QUERY SELECT
      false, 'Voucher not valid for accommodations'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  IF v_convention.partner_id != p_property_id THEN
    RETURN QUERY SELECT
      false, 'Voucher not valid for this property'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 8. Check convention date validity
  IF v_convention.valid_from > CURRENT_DATE THEN
    RETURN QUERY SELECT
      false, 'Convention has not started yet'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  IF v_convention.valid_until IS NOT NULL AND v_convention.valid_until < CURRENT_DATE THEN
    RETURN QUERY SELECT
      false, 'Convention has expired'::TEXT,
      NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL,
      NULL::TEXT, NULL::INTEGER, NULL::TEXT, NULL::TEXT;
    RETURN;
  END IF;

  -- 9. Calculate discount based on benefit_type and benefit_scope
  IF v_convention.benefit_type = 'percentage_discount' THEN
    -- Percentage: always calculated against subtotal regardless of scope
    v_calc_discount := (p_subtotal * v_convention.benefit_value / 100)::INTEGER;
  ELSIF v_convention.benefit_type = 'fixed_discount' THEN
    -- Fixed: scope determines how the fixed amount is applied
    CASE COALESCE(v_convention.benefit_scope, 'per_order')
      WHEN 'per_night' THEN
        v_calc_discount := (v_convention.benefit_value * p_num_nights)::INTEGER;
      WHEN 'per_stay' THEN
        v_calc_discount := v_convention.benefit_value::INTEGER;
      WHEN 'flat' THEN
        v_calc_discount := v_convention.benefit_value::INTEGER;
      ELSE -- per_order
        v_calc_discount := v_convention.benefit_value::INTEGER;
    END CASE;
  ELSE
    -- Other benefit types (free_item, special_price, points_multiplier): no discount calculation
    v_calc_discount := 0;
  END IF;

  -- 10. Cap discount to never exceed subtotal
  IF v_calc_discount > p_subtotal THEN
    v_calc_discount := p_subtotal;
  END IF;

  -- 11. Return valid result
  RETURN QUERY SELECT
    true,
    NULL::TEXT,
    v_convention.id,
    v_voucher.id,
    v_convention.benefit_type,
    v_convention.benefit_value,
    COALESCE(v_convention.benefit_scope, 'per_order'),
    v_calc_discount,
    v_convention.partner_name,
    v_convention.convention_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users (needed for booking flow)
GRANT EXECUTE ON FUNCTION validate_accommodation_voucher(TEXT, UUID, INTEGER, INTEGER) TO authenticated;
