-- ============================================================================
-- CONFIGURABLE CHARGES SYSTEM
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-23
-- Description: Multi-charge system supporting multiple taxes, fees, and tips
--              Allows international flexibility (VAT, GST, Sales Tax, Service Charge, etc.)
-- ============================================================================

-- ============================================================================
-- 1. MERCHANT CHARGES TABLE (multi-entry per merchant)
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Charge Type
  charge_type TEXT NOT NULL CHECK (charge_type IN ('tax', 'fee', 'tip_preset')),
  -- tax: Government taxes (VAT, IVA, GST, Sales Tax, etc.)
  -- fee: Mandatory fees (Service Charge, Coperto, Cover, etc.)
  -- tip_preset: Suggested tip percentage (voluntary)

  -- Basic Info
  name TEXT NOT NULL,                     -- e.g., "IVA", "Service Charge", "City Tax"
  description TEXT,                       -- e.g., "Imposta sul Valore Aggiunto 22%"

  -- Amount (percentage OR fixed, not both)
  amount_type TEXT DEFAULT 'percentage' CHECK (amount_type IN ('percentage', 'fixed', 'per_person')),
  -- percentage: e.g., 22% of subtotal
  -- fixed: e.g., €2.00 flat fee
  -- per_person: e.g., €2.50 per person (for coperto)

  percentage DECIMAL(5,2),                -- e.g., 22.00, 10.00 (used if amount_type = 'percentage')
  fixed_amount DECIMAL(10,2),             -- e.g., 2.00, 3.50 (used if amount_type = 'fixed' or 'per_person')

  -- Display Options
  display_mode TEXT DEFAULT 'exclusive' CHECK (display_mode IN ('inclusive', 'exclusive')),
  -- inclusive: Already included in prices (shown as "di cui X%")
  -- exclusive: Added at checkout (shown as "+ X%")

  show_breakdown BOOLEAN DEFAULT TRUE,    -- Show in receipt breakdown
  show_in_menu BOOLEAN DEFAULT FALSE,     -- Show "(+X% tax)" on menu items

  -- Calculation Options
  calculation_base TEXT DEFAULT 'subtotal' CHECK (calculation_base IN ('subtotal', 'after_taxes', 'after_fees')),
  -- subtotal: Calculate on raw item total
  -- after_taxes: Calculate after all taxes applied
  -- after_fees: Calculate after taxes and fees

  -- Applicability
  applies_to TEXT DEFAULT 'all' CHECK (applies_to IN ('all', 'food', 'beverage', 'alcohol', 'dine_in', 'takeaway')),
  -- all: Applies to entire order
  -- food/beverage/alcohol: Category-specific tax
  -- dine_in/takeaway: Consumption type specific

  -- Optional: Min/Max thresholds
  min_order_amount DECIMAL(10,2),         -- Only apply if order >= this amount
  max_charge_amount DECIMAL(10,2),        -- Cap the charge at this amount

  -- Ordering & Status
  sort_order INTEGER DEFAULT 0,           -- Display order in breakdown
  is_enabled BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,       -- Pre-selected for this type

  -- Metadata
  legal_reference TEXT,                   -- Legal code/reference if needed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_merchant_charges_merchant
  ON merchant_charges(merchant_id);

CREATE INDEX IF NOT EXISTS idx_merchant_charges_type
  ON merchant_charges(merchant_id, charge_type);

CREATE INDEX IF NOT EXISTS idx_merchant_charges_enabled
  ON merchant_charges(merchant_id)
  WHERE is_enabled = TRUE;

-- ============================================================================
-- 3. ORDER CHARGES TABLE (charges applied to specific orders)
-- ============================================================================

CREATE TABLE IF NOT EXISTS order_charges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- Reference to charge definition (nullable for custom/one-time charges)
  charge_definition_id UUID REFERENCES merchant_charges(id),

  -- Charge Info (copied at time of order for historical accuracy)
  charge_type TEXT NOT NULL CHECK (charge_type IN ('tax', 'fee', 'tip')),
  name TEXT NOT NULL,
  amount_type TEXT DEFAULT 'percentage',
  percentage DECIMAL(5,2),
  fixed_amount DECIMAL(10,2),
  display_mode TEXT DEFAULT 'exclusive',

  -- Calculated Amount
  base_amount DECIMAL(10,2),              -- Amount charge was calculated on (null for fixed)
  charge_amount DECIMAL(10,2) NOT NULL,   -- Final charge amount
  person_count INTEGER,                   -- Number of people (for per_person charges)

  -- For tips
  is_custom_amount BOOLEAN DEFAULT FALSE, -- True if customer entered custom tip

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_charges_order
  ON order_charges(order_id);

-- ============================================================================
-- 4. MIGRATION: Copy existing settings to new table
-- ============================================================================

-- Insert tax as a charge if enabled
INSERT INTO merchant_charges (
  merchant_id,
  charge_type,
  name,
  percentage,
  display_mode,
  show_breakdown,
  is_enabled,
  sort_order
)
SELECT
  merchant_id,
  'tax',
  COALESCE(tax_label, 'VAT'),
  COALESCE(tax_percentage, 0),
  COALESCE(tax_display_mode, 'inclusive'),
  TRUE,
  COALESCE(tax_enabled, FALSE),
  10
FROM merchant_payment_settings
WHERE tax_enabled = TRUE AND tax_percentage > 0
ON CONFLICT DO NOTHING;

-- Insert service charge as a fee if enabled
INSERT INTO merchant_charges (
  merchant_id,
  charge_type,
  name,
  percentage,
  display_mode,
  calculation_base,
  show_breakdown,
  is_enabled,
  sort_order
)
SELECT
  merchant_id,
  'fee',
  COALESCE(service_charge_label, 'Service Charge'),
  COALESCE(service_charge_percentage, 0),
  'exclusive',
  CASE
    WHEN service_charge_calculation_base = 'post_tax' THEN 'after_taxes'
    ELSE 'subtotal'
  END,
  TRUE,
  COALESCE(service_charge_enabled, FALSE),
  20
FROM merchant_payment_settings
WHERE service_charge_enabled = TRUE AND service_charge_percentage > 0
ON CONFLICT DO NOTHING;

-- Insert tip presets if enabled
INSERT INTO merchant_charges (
  merchant_id,
  charge_type,
  name,
  percentage,
  display_mode,
  calculation_base,
  show_breakdown,
  is_enabled,
  is_default,
  sort_order
)
SELECT
  merchant_id,
  'tip_preset',
  preset::text || '%',
  preset::DECIMAL,
  'exclusive',
  CASE
    WHEN tip_calculation_base = 'post_tax' THEN 'after_taxes'
    ELSE 'subtotal'
  END,
  TRUE,
  TRUE,
  preset = 15, -- 15% is default selected
  30 + (ROW_NUMBER() OVER (PARTITION BY merchant_id ORDER BY preset))
FROM merchant_payment_settings,
     LATERAL jsonb_array_elements_text(COALESCE(tip_presets, '[10, 15, 20]'::jsonb)) AS preset
WHERE tips_enabled = TRUE
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. ADD TIP SETTINGS TO MERCHANT_PAYMENT_SETTINGS (for backwards compat)
-- ============================================================================

-- Add flag to use new system
ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  use_multi_charge_system BOOLEAN DEFAULT FALSE;

-- Add custom tip toggle (preserved from old system)
ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  allow_custom_tip BOOLEAN DEFAULT TRUE;

-- ============================================================================
-- 6. HELPER FUNCTION: Calculate order with multiple charges
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_order_with_charges(
  p_merchant_id UUID,
  p_subtotal DECIMAL,
  p_tip_percentage DECIMAL DEFAULT NULL,
  p_tip_amount DECIMAL DEFAULT NULL,
  p_consumption_type TEXT DEFAULT 'dine_in',
  p_person_count INTEGER DEFAULT 1
)
RETURNS JSONB AS $$
DECLARE
  v_charge RECORD;
  v_base DECIMAL;
  v_amount DECIMAL;
  v_taxes_total DECIMAL := 0;
  v_fees_total DECIMAL := 0;
  v_tip_total DECIMAL := 0;
  v_grand_total DECIMAL;
  v_breakdown JSONB := '[]'::jsonb;
BEGIN
  -- Process taxes first (typically inclusive or on subtotal)
  FOR v_charge IN
    SELECT * FROM merchant_charges
    WHERE merchant_id = p_merchant_id
      AND charge_type = 'tax'
      AND is_enabled = TRUE
      AND (applies_to = 'all' OR applies_to = p_consumption_type)
    ORDER BY sort_order
  LOOP
    IF v_charge.display_mode = 'inclusive' THEN
      -- Tax is included in prices, calculate for display only
      v_amount := ROUND(p_subtotal - (p_subtotal / (1 + v_charge.percentage / 100)), 2);
      v_breakdown := v_breakdown || jsonb_build_object(
        'id', v_charge.id,
        'type', 'tax',
        'name', v_charge.name,
        'percentage', v_charge.percentage,
        'amount', v_amount,
        'included', TRUE
      );
    ELSE
      -- Tax is added on top
      v_amount := ROUND(p_subtotal * (v_charge.percentage / 100), 2);
      v_taxes_total := v_taxes_total + v_amount;
      v_breakdown := v_breakdown || jsonb_build_object(
        'id', v_charge.id,
        'type', 'tax',
        'name', v_charge.name,
        'percentage', v_charge.percentage,
        'amount', v_amount,
        'included', FALSE
      );
    END IF;
  END LOOP;

  -- Process fees (service charge, coperto, etc.)
  FOR v_charge IN
    SELECT * FROM merchant_charges
    WHERE merchant_id = p_merchant_id
      AND charge_type = 'fee'
      AND is_enabled = TRUE
      AND (applies_to = 'all' OR applies_to = p_consumption_type)
    ORDER BY sort_order
  LOOP
    -- Calculate amount based on amount_type
    CASE COALESCE(v_charge.amount_type, 'percentage')
      WHEN 'fixed' THEN
        -- Fixed amount (e.g., €2.00 flat)
        v_amount := COALESCE(v_charge.fixed_amount, 0);
        v_base := NULL;
      WHEN 'per_person' THEN
        -- Per person (e.g., €2.50 × 4 people)
        v_amount := COALESCE(v_charge.fixed_amount, 0) * p_person_count;
        v_base := NULL;
      ELSE
        -- Percentage based
        CASE v_charge.calculation_base
          WHEN 'after_taxes' THEN
            v_base := p_subtotal + v_taxes_total;
          WHEN 'after_fees' THEN
            v_base := p_subtotal + v_taxes_total + v_fees_total;
          ELSE
            v_base := p_subtotal;
        END CASE;
        v_amount := ROUND(v_base * (COALESCE(v_charge.percentage, 0) / 100), 2);
    END CASE;

    -- Apply max cap if defined
    IF v_charge.max_charge_amount IS NOT NULL AND v_amount > v_charge.max_charge_amount THEN
      v_amount := v_charge.max_charge_amount;
    END IF;

    -- Check min order amount
    IF v_charge.min_order_amount IS NOT NULL AND p_subtotal < v_charge.min_order_amount THEN
      CONTINUE;
    END IF;

    v_fees_total := v_fees_total + v_amount;
    v_breakdown := v_breakdown || jsonb_build_object(
      'id', v_charge.id,
      'type', 'fee',
      'name', v_charge.name,
      'amount_type', COALESCE(v_charge.amount_type, 'percentage'),
      'percentage', v_charge.percentage,
      'fixed_amount', v_charge.fixed_amount,
      'person_count', CASE WHEN v_charge.amount_type = 'per_person' THEN p_person_count ELSE NULL END,
      'amount', v_amount,
      'included', FALSE
    );
  END LOOP;

  -- Calculate tip
  IF p_tip_amount IS NOT NULL AND p_tip_amount > 0 THEN
    -- Custom tip amount provided
    v_tip_total := p_tip_amount;
    v_breakdown := v_breakdown || jsonb_build_object(
      'type', 'tip',
      'name', 'Tip',
      'amount', v_tip_total,
      'is_custom', TRUE
    );
  ELSIF p_tip_percentage IS NOT NULL AND p_tip_percentage > 0 THEN
    -- Tip percentage provided
    v_base := p_subtotal + v_taxes_total; -- Tip typically on post-tax
    v_tip_total := ROUND(v_base * (p_tip_percentage / 100), 2);
    v_breakdown := v_breakdown || jsonb_build_object(
      'type', 'tip',
      'name', 'Tip',
      'percentage', p_tip_percentage,
      'amount', v_tip_total,
      'is_custom', FALSE
    );
  END IF;

  -- Calculate grand total
  v_grand_total := p_subtotal + v_taxes_total + v_fees_total + v_tip_total;

  RETURN jsonb_build_object(
    'subtotal', p_subtotal,
    'taxes_total', v_taxes_total,
    'fees_total', v_fees_total,
    'tip_total', v_tip_total,
    'grand_total', ROUND(v_grand_total, 2),
    'breakdown', v_breakdown
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. RLS POLICIES
-- ============================================================================

ALTER TABLE merchant_charges ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_charges ENABLE ROW LEVEL SECURITY;

-- Merchant charges: merchants can manage their own
CREATE POLICY "Merchants can view their charges"
  ON merchant_charges FOR SELECT
  USING (merchant_id IN (
    SELECT tenant_id FROM account_roles
    WHERE account_id = auth.uid()
  ));

CREATE POLICY "Merchants can insert their charges"
  ON merchant_charges FOR INSERT
  WITH CHECK (merchant_id IN (
    SELECT tenant_id FROM account_roles
    WHERE account_id = auth.uid()
  ));

CREATE POLICY "Merchants can update their charges"
  ON merchant_charges FOR UPDATE
  USING (merchant_id IN (
    SELECT tenant_id FROM account_roles
    WHERE account_id = auth.uid()
  ));

CREATE POLICY "Merchants can delete their charges"
  ON merchant_charges FOR DELETE
  USING (merchant_id IN (
    SELECT tenant_id FROM account_roles
    WHERE account_id = auth.uid()
  ));

-- Order charges: follow order access
CREATE POLICY "Order charges follow order access"
  ON order_charges FOR ALL
  USING (order_id IN (
    SELECT id FROM orders WHERE merchant_id IN (
      SELECT tenant_id FROM account_roles
      WHERE account_id = auth.uid()
    )
  ));

-- Service role bypass
CREATE POLICY "Service role full access charges"
  ON merchant_charges FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access order_charges"
  ON order_charges FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================================
-- 8. TRIGGERS
-- ============================================================================

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_merchant_charges_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_merchant_charges_timestamp ON merchant_charges;
CREATE TRIGGER trigger_update_merchant_charges_timestamp
  BEFORE UPDATE ON merchant_charges
  FOR EACH ROW EXECUTE FUNCTION update_merchant_charges_timestamp();

-- ============================================================================
-- 9. COMMENTS
-- ============================================================================

COMMENT ON TABLE merchant_charges IS 'Configurable tax, fee, and tip presets per merchant. Supports international tax structures.';
COMMENT ON TABLE order_charges IS 'Charges applied to specific orders, preserving historical values.';

COMMENT ON COLUMN merchant_charges.charge_type IS 'tax = government taxes (VAT, GST), fee = mandatory charges (service, coperto), tip_preset = suggested tip %';
COMMENT ON COLUMN merchant_charges.amount_type IS 'percentage = % of base, fixed = flat amount, per_person = amount × number of people';
COMMENT ON COLUMN merchant_charges.percentage IS 'Percentage value (used when amount_type = percentage)';
COMMENT ON COLUMN merchant_charges.fixed_amount IS 'Fixed amount in currency (used when amount_type = fixed or per_person)';
COMMENT ON COLUMN merchant_charges.display_mode IS 'inclusive = included in prices, exclusive = added at checkout';
COMMENT ON COLUMN merchant_charges.calculation_base IS 'What amount to calculate the percentage on';
COMMENT ON COLUMN merchant_charges.applies_to IS 'Filter for specific categories or consumption types';

COMMENT ON FUNCTION calculate_order_with_charges IS 'Calculate order total with all applicable charges. Returns breakdown for receipt display.';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
