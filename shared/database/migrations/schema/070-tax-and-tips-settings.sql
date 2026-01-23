-- ============================================================================
-- TAX, TIPS & SERVICE CHARGE SETTINGS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-23
-- Description: Add configurable tax, tips and service charge support
-- ============================================================================

-- ============================================================================
-- 1. ADD COLUMNS TO MERCHANT PAYMENT SETTINGS
-- ============================================================================

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  -- TAX SETTINGS
  tax_enabled BOOLEAN DEFAULT FALSE;

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tax_percentage DECIMAL(5,2) DEFAULT 0;

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tax_display_mode TEXT DEFAULT 'inclusive'
    CHECK (tax_display_mode IN ('inclusive', 'exclusive'));

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tax_label TEXT DEFAULT 'VAT';

-- TIP SETTINGS (voluntary)
ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tips_enabled BOOLEAN DEFAULT FALSE;

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tip_presets JSONB DEFAULT '[10, 15, 20]';

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tip_allow_custom BOOLEAN DEFAULT TRUE;

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  tip_calculation_base TEXT DEFAULT 'pre_tax'
    CHECK (tip_calculation_base IN ('pre_tax', 'post_tax'));

-- SERVICE CHARGE SETTINGS (mandatory)
ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  service_charge_enabled BOOLEAN DEFAULT FALSE;

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  service_charge_percentage DECIMAL(5,2) DEFAULT 0;

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  service_charge_label TEXT DEFAULT 'Service Charge';

ALTER TABLE merchant_payment_settings ADD COLUMN IF NOT EXISTS
  service_charge_calculation_base TEXT DEFAULT 'pre_tax'
    CHECK (service_charge_calculation_base IN ('pre_tax', 'post_tax'));

-- ============================================================================
-- 2. ADD COLUMNS TO MARKETPLACE_ORDERS (for order history)
-- ============================================================================

-- Check if marketplace_orders exists, if not create minimal tracking
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'marketplace_orders') THEN
    -- Add tip tracking columns
    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      tip_amount DECIMAL(10,2) DEFAULT 0;

    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      tip_percentage DECIMAL(5,2) DEFAULT 0;

    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      service_charge_amount DECIMAL(10,2) DEFAULT 0;

    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      service_charge_percentage DECIMAL(5,2) DEFAULT 0;

    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      tax_amount DECIMAL(10,2) DEFAULT 0;

    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      tax_percentage DECIMAL(5,2) DEFAULT 0;

    ALTER TABLE marketplace_orders ADD COLUMN IF NOT EXISTS
      tax_display_mode TEXT DEFAULT 'inclusive';
  END IF;
END $$;

-- Also add to regular orders table if it exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      tip_amount DECIMAL(10,2) DEFAULT 0;

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      tip_percentage DECIMAL(5,2) DEFAULT 0;

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      service_charge_amount DECIMAL(10,2) DEFAULT 0;

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      service_charge_percentage DECIMAL(5,2) DEFAULT 0;

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      tax_amount DECIMAL(10,2) DEFAULT 0;

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      tax_percentage DECIMAL(5,2) DEFAULT 0;

    ALTER TABLE orders ADD COLUMN IF NOT EXISTS
      tax_display_mode TEXT DEFAULT 'inclusive';
  END IF;
END $$;

-- ============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_payment_settings_tax_enabled
  ON merchant_payment_settings(merchant_id)
  WHERE tax_enabled = TRUE;

CREATE INDEX IF NOT EXISTS idx_payment_settings_tips_enabled
  ON merchant_payment_settings(merchant_id)
  WHERE tips_enabled = TRUE;

CREATE INDEX IF NOT EXISTS idx_payment_settings_service_charge_enabled
  ON merchant_payment_settings(merchant_id)
  WHERE service_charge_enabled = TRUE;

-- ============================================================================
-- 4. HELPER FUNCTION: Calculate order totals with tax/tips/service charge
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_order_totals(
  p_subtotal DECIMAL,
  p_tax_percentage DECIMAL DEFAULT 0,
  p_tax_display_mode TEXT DEFAULT 'inclusive',
  p_service_charge_percentage DECIMAL DEFAULT 0,
  p_service_charge_calculation_base TEXT DEFAULT 'pre_tax',
  p_tip_percentage DECIMAL DEFAULT 0,
  p_tip_calculation_base TEXT DEFAULT 'pre_tax'
)
RETURNS JSONB AS $$
DECLARE
  v_tax_amount DECIMAL;
  v_service_charge_base DECIMAL;
  v_service_charge_amount DECIMAL;
  v_tip_base DECIMAL;
  v_tip_amount DECIMAL;
  v_total DECIMAL;
BEGIN
  -- Calculate tax
  IF p_tax_display_mode = 'exclusive' THEN
    -- Tax is added on top of subtotal
    v_tax_amount := ROUND(p_subtotal * (p_tax_percentage / 100), 2);
  ELSE
    -- Tax is included in subtotal (no extra charge)
    v_tax_amount := ROUND(p_subtotal - (p_subtotal / (1 + p_tax_percentage / 100)), 2);
  END IF;

  -- Calculate service charge base
  IF p_service_charge_calculation_base = 'post_tax' AND p_tax_display_mode = 'exclusive' THEN
    v_service_charge_base := p_subtotal + v_tax_amount;
  ELSE
    v_service_charge_base := p_subtotal;
  END IF;

  v_service_charge_amount := ROUND(v_service_charge_base * (p_service_charge_percentage / 100), 2);

  -- Calculate tip base
  IF p_tip_calculation_base = 'post_tax' AND p_tax_display_mode = 'exclusive' THEN
    v_tip_base := p_subtotal + v_tax_amount;
  ELSE
    v_tip_base := p_subtotal;
  END IF;

  v_tip_amount := ROUND(v_tip_base * (p_tip_percentage / 100), 2);

  -- Calculate total
  IF p_tax_display_mode = 'exclusive' THEN
    v_total := p_subtotal + v_tax_amount + v_service_charge_amount + v_tip_amount;
  ELSE
    v_total := p_subtotal + v_service_charge_amount + v_tip_amount;
  END IF;

  RETURN jsonb_build_object(
    'subtotal', p_subtotal,
    'tax_amount', CASE WHEN p_tax_display_mode = 'exclusive' THEN v_tax_amount ELSE 0 END,
    'tax_included', CASE WHEN p_tax_display_mode = 'inclusive' THEN v_tax_amount ELSE 0 END,
    'service_charge_amount', v_service_charge_amount,
    'tip_amount', v_tip_amount,
    'total', v_total
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 5. COMMENTS
-- ============================================================================

COMMENT ON COLUMN merchant_payment_settings.tax_enabled IS 'Whether tax is enabled for this merchant';
COMMENT ON COLUMN merchant_payment_settings.tax_percentage IS 'Tax percentage (e.g., 22 for 22% VAT)';
COMMENT ON COLUMN merchant_payment_settings.tax_display_mode IS 'inclusive = prices include tax, exclusive = tax added at checkout';
COMMENT ON COLUMN merchant_payment_settings.tax_label IS 'Display label for tax (VAT, IVA, Tax, GST, etc.)';

COMMENT ON COLUMN merchant_payment_settings.tips_enabled IS 'Whether voluntary tips are enabled';
COMMENT ON COLUMN merchant_payment_settings.tip_presets IS 'Array of preset tip percentages e.g. [10, 15, 20]';
COMMENT ON COLUMN merchant_payment_settings.tip_allow_custom IS 'Whether customers can enter custom tip amounts';
COMMENT ON COLUMN merchant_payment_settings.tip_calculation_base IS 'Calculate tip on pre_tax or post_tax amount';

COMMENT ON COLUMN merchant_payment_settings.service_charge_enabled IS 'Whether mandatory service charge is enabled';
COMMENT ON COLUMN merchant_payment_settings.service_charge_percentage IS 'Service charge percentage';
COMMENT ON COLUMN merchant_payment_settings.service_charge_label IS 'Display label (Service Charge, Coperto, etc.)';
COMMENT ON COLUMN merchant_payment_settings.service_charge_calculation_base IS 'Calculate on pre_tax or post_tax amount';

COMMENT ON FUNCTION calculate_order_totals IS 'Calculate order totals including tax, service charge, and tip';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
