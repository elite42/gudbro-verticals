-- ============================================================================
-- TIP DISTRIBUTION SYSTEM
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-23
-- Description: Tip distribution settings, pool management, split bill support
-- Prerequisite: Migration 070 (tax/tips base)
-- ============================================================================

-- ============================================================================
-- 1. TIP DISTRIBUTION SETTINGS (per merchant)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tip_distribution_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL UNIQUE REFERENCES merchants(id) ON DELETE CASCADE,

  -- Distribution mode
  -- individual: 100% goes to the serving staff
  -- pool: shared among staff with percentages
  -- none: tips go to the business
  distribution_mode TEXT DEFAULT 'individual'
    CHECK (distribution_mode IN ('individual', 'pool', 'none')),

  -- Pool type (when mode = 'pool')
  -- equal: split equally among all pool members
  -- by_role: split by role percentages
  -- custom: each staff has custom percentage
  pool_type TEXT DEFAULT 'equal'
    CHECK (pool_type IN ('equal', 'by_role', 'custom')),

  -- Role percentages (when pool_type = 'by_role')
  -- Example: {"waiter": 60, "kitchen": 25, "manager": 15}
  role_percentages JSONB DEFAULT '{"waiter": 60, "kitchen": 25, "manager": 15}',

  -- Distribution period
  distribution_period TEXT DEFAULT 'weekly'
    CHECK (distribution_period IN ('weekly', 'biweekly', 'monthly', 'custom')),

  -- Distribution day (1=Monday, 7=Sunday for weekly; 1-31 for monthly)
  distribution_day INTEGER DEFAULT 1,

  -- Additional options
  include_service_charge BOOLEAN DEFAULT TRUE,
  require_minimum_hours BOOLEAN DEFAULT FALSE,
  minimum_hours_per_period INTEGER DEFAULT 20,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. TIP POOL MEMBERS (who participates and with what %)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tip_pool_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,

  -- Inclusion status
  is_included BOOLEAN DEFAULT TRUE,
  exclusion_reason TEXT,

  -- Custom percentage (when pool_type = 'custom')
  custom_percentage DECIMAL(5,2),

  -- Override role for tip distribution (if different from job_title)
  tip_role TEXT, -- waiter, kitchen, manager, barista, etc.

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, staff_id)
);

-- ============================================================================
-- 3. TIP POOL PERIODS (open/closed periods)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tip_pool_periods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Status: open (accumulating), closed (ready to distribute), distributed (paid)
  status TEXT DEFAULT 'open'
    CHECK (status IN ('open', 'closed', 'distributed')),

  -- Accumulated totals
  total_tips DECIMAL(12,2) DEFAULT 0,
  total_service_charges DECIMAL(12,2) DEFAULT 0,
  total_distributed DECIMAL(12,2) DEFAULT 0,

  -- Tracking
  closed_at TIMESTAMPTZ,
  distributed_at TIMESTAMPTZ,
  distributed_by UUID REFERENCES accounts(id),

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, period_start)
);

-- ============================================================================
-- 4. TIP ALLOCATIONS (actual tip allocations to staff)
-- ============================================================================
CREATE TABLE IF NOT EXISTS tip_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  pool_period_id UUID REFERENCES tip_pool_periods(id) ON DELETE CASCADE,
  staff_id UUID NOT NULL REFERENCES staff_profiles(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Allocated amount
  amount DECIMAL(10,2) NOT NULL,

  -- Source of allocation
  -- individual_order: direct tip from an order they served
  -- pool_share: share from pool distribution
  -- adjustment: manual adjustment
  source TEXT NOT NULL
    CHECK (source IN ('individual_order', 'pool_share', 'adjustment')),

  -- Order reference (for individual tips)
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

  -- Payment status
  is_paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  payment_method TEXT, -- cash, bank_transfer, payroll
  payment_reference TEXT,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. ORDER SESSIONS (for split bill by device)
-- ============================================================================
CREATE TABLE IF NOT EXISTS order_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL, -- Device fingerprint/UUID

  -- Optional customer info
  customer_name TEXT,

  -- Items in this session (array of order_item.id)
  item_ids UUID[] DEFAULT '{}',

  -- Session totals
  subtotal DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  tip_amount DECIMAL(10,2) DEFAULT 0,
  service_charge_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) DEFAULT 0,

  -- Payment status
  payment_status TEXT DEFAULT 'unpaid'
    CHECK (payment_status IN ('unpaid', 'paid', 'partial')),
  paid_at TIMESTAMPTZ,
  payment_method TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(order_id, session_id)
);

-- ============================================================================
-- 6. MODIFY ORDERS TABLE (add staff assignment and split bill columns)
-- ============================================================================

-- Staff who served this order
ALTER TABLE orders ADD COLUMN IF NOT EXISTS
  served_by_staff_id UUID REFERENCES staff_profiles(id) ON DELETE SET NULL;

-- How staff was assigned
ALTER TABLE orders ADD COLUMN IF NOT EXISTS
  staff_assigned_method TEXT DEFAULT 'manual'
    CHECK (staff_assigned_method IN ('qr_scan', 'manual', 'self_assign'));

-- Split bill flags
ALTER TABLE orders ADD COLUMN IF NOT EXISTS
  is_split_bill BOOLEAN DEFAULT FALSE;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS
  split_type TEXT
    CHECK (split_type IS NULL OR split_type IN ('full', 'by_item', 'equal'));

-- Parent order for split bills (child orders point to parent)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS
  parent_order_id UUID REFERENCES orders(id) ON DELETE SET NULL;

-- ============================================================================
-- 7. MODIFY ORDER_ITEMS TABLE (add session tracking)
-- ============================================================================

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS
  session_id TEXT; -- Which session/device ordered this item

-- ============================================================================
-- 8. INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_tip_distribution_settings_merchant
  ON tip_distribution_settings(merchant_id);

CREATE INDEX IF NOT EXISTS idx_tip_pool_members_merchant
  ON tip_pool_members(merchant_id);

CREATE INDEX IF NOT EXISTS idx_tip_pool_members_staff
  ON tip_pool_members(staff_id);

CREATE INDEX IF NOT EXISTS idx_tip_pool_members_included
  ON tip_pool_members(merchant_id) WHERE is_included = TRUE;

CREATE INDEX IF NOT EXISTS idx_tip_pool_periods_merchant
  ON tip_pool_periods(merchant_id);

CREATE INDEX IF NOT EXISTS idx_tip_pool_periods_status
  ON tip_pool_periods(merchant_id, status);

CREATE INDEX IF NOT EXISTS idx_tip_allocations_staff
  ON tip_allocations(staff_id);

CREATE INDEX IF NOT EXISTS idx_tip_allocations_period
  ON tip_allocations(pool_period_id);

CREATE INDEX IF NOT EXISTS idx_tip_allocations_merchant
  ON tip_allocations(merchant_id);

CREATE INDEX IF NOT EXISTS idx_tip_allocations_unpaid
  ON tip_allocations(staff_id) WHERE is_paid = FALSE;

CREATE INDEX IF NOT EXISTS idx_order_sessions_order
  ON order_sessions(order_id);

CREATE INDEX IF NOT EXISTS idx_orders_served_by
  ON orders(served_by_staff_id) WHERE served_by_staff_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_orders_parent
  ON orders(parent_order_id) WHERE parent_order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_order_items_session
  ON order_items(session_id) WHERE session_id IS NOT NULL;

-- ============================================================================
-- 9. TRIGGERS FOR UPDATED_AT
-- ============================================================================

-- Trigger function (reuse existing if available)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to new tables
DROP TRIGGER IF EXISTS update_tip_distribution_settings_updated_at ON tip_distribution_settings;
CREATE TRIGGER update_tip_distribution_settings_updated_at
    BEFORE UPDATE ON tip_distribution_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tip_pool_members_updated_at ON tip_pool_members;
CREATE TRIGGER update_tip_pool_members_updated_at
    BEFORE UPDATE ON tip_pool_members
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_order_sessions_updated_at ON order_sessions;
CREATE TRIGGER update_order_sessions_updated_at
    BEFORE UPDATE ON order_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 10. HELPER FUNCTION: Calculate tip distribution for a period
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_tip_distribution(
  p_period_id UUID
)
RETURNS TABLE (
  staff_id UUID,
  staff_name TEXT,
  tip_role TEXT,
  allocation_amount DECIMAL(10,2),
  percentage_share DECIMAL(5,2)
) AS $$
DECLARE
  v_period RECORD;
  v_settings RECORD;
  v_total_pool DECIMAL(12,2);
  v_total_percentage DECIMAL(5,2);
BEGIN
  -- Get period details
  SELECT * INTO v_period FROM tip_pool_periods WHERE id = p_period_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Period not found';
  END IF;

  -- Get distribution settings
  SELECT * INTO v_settings
  FROM tip_distribution_settings
  WHERE merchant_id = v_period.merchant_id;

  -- Calculate total pool
  v_total_pool := v_period.total_tips;
  IF v_settings.include_service_charge THEN
    v_total_pool := v_total_pool + v_period.total_service_charges;
  END IF;

  -- Return distribution based on pool_type
  IF v_settings.pool_type = 'equal' THEN
    -- Equal distribution
    RETURN QUERY
    SELECT
      tpm.staff_id,
      sp.display_name AS staff_name,
      COALESCE(tpm.tip_role, sp.job_title) AS tip_role,
      ROUND(v_total_pool / NULLIF(COUNT(*) OVER(), 0), 2) AS allocation_amount,
      ROUND(100.0 / NULLIF(COUNT(*) OVER(), 0), 2) AS percentage_share
    FROM tip_pool_members tpm
    JOIN staff_profiles sp ON sp.id = tpm.staff_id
    WHERE tpm.merchant_id = v_period.merchant_id
      AND tpm.is_included = TRUE;

  ELSIF v_settings.pool_type = 'custom' THEN
    -- Custom percentages
    SELECT SUM(custom_percentage) INTO v_total_percentage
    FROM tip_pool_members
    WHERE merchant_id = v_period.merchant_id AND is_included = TRUE;

    RETURN QUERY
    SELECT
      tpm.staff_id,
      sp.display_name AS staff_name,
      COALESCE(tpm.tip_role, sp.job_title) AS tip_role,
      ROUND(v_total_pool * (COALESCE(tpm.custom_percentage, 0) / NULLIF(v_total_percentage, 0)), 2) AS allocation_amount,
      ROUND(COALESCE(tpm.custom_percentage, 0) / NULLIF(v_total_percentage, 0) * 100, 2) AS percentage_share
    FROM tip_pool_members tpm
    JOIN staff_profiles sp ON sp.id = tpm.staff_id
    WHERE tpm.merchant_id = v_period.merchant_id
      AND tpm.is_included = TRUE;

  ELSE
    -- By role
    RETURN QUERY
    WITH role_counts AS (
      SELECT
        COALESCE(tpm.tip_role, sp.job_title) AS role,
        COUNT(*) AS members_in_role
      FROM tip_pool_members tpm
      JOIN staff_profiles sp ON sp.id = tpm.staff_id
      WHERE tpm.merchant_id = v_period.merchant_id
        AND tpm.is_included = TRUE
      GROUP BY COALESCE(tpm.tip_role, sp.job_title)
    )
    SELECT
      tpm.staff_id,
      sp.display_name AS staff_name,
      COALESCE(tpm.tip_role, sp.job_title) AS tip_role,
      ROUND(
        v_total_pool *
        COALESCE((v_settings.role_percentages->>(COALESCE(tpm.tip_role, sp.job_title)))::DECIMAL / 100, 0) /
        NULLIF(rc.members_in_role, 0)
      , 2) AS allocation_amount,
      ROUND(
        COALESCE((v_settings.role_percentages->>(COALESCE(tpm.tip_role, sp.job_title)))::DECIMAL, 0) /
        NULLIF(rc.members_in_role, 0)
      , 2) AS percentage_share
    FROM tip_pool_members tpm
    JOIN staff_profiles sp ON sp.id = tpm.staff_id
    LEFT JOIN role_counts rc ON rc.role = COALESCE(tpm.tip_role, sp.job_title)
    WHERE tpm.merchant_id = v_period.merchant_id
      AND tpm.is_included = TRUE;
  END IF;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 11. COMMENTS
-- ============================================================================

COMMENT ON TABLE tip_distribution_settings IS 'Merchant tip distribution configuration';
COMMENT ON TABLE tip_pool_members IS 'Staff members participating in tip pool';
COMMENT ON TABLE tip_pool_periods IS 'Time periods for tip accumulation and distribution';
COMMENT ON TABLE tip_allocations IS 'Individual tip allocations to staff members';
COMMENT ON TABLE order_sessions IS 'Split bill sessions tracking per device';

COMMENT ON COLUMN tip_distribution_settings.distribution_mode IS 'individual=to server, pool=shared, none=to business';
COMMENT ON COLUMN tip_distribution_settings.pool_type IS 'equal=split evenly, by_role=by job %, custom=individual %';
COMMENT ON COLUMN tip_distribution_settings.role_percentages IS 'JSON mapping roles to percentages';

COMMENT ON COLUMN orders.served_by_staff_id IS 'Staff member who served this order';
COMMENT ON COLUMN orders.staff_assigned_method IS 'How staff was assigned: qr_scan, manual, self_assign';
COMMENT ON COLUMN orders.is_split_bill IS 'Whether this order is part of a split bill';
COMMENT ON COLUMN orders.split_type IS 'Split type: full=one pays all, by_item=pay own items, equal=divide equally';
COMMENT ON COLUMN orders.parent_order_id IS 'Parent order ID for split child orders';

COMMENT ON COLUMN order_sessions.session_id IS 'Device fingerprint/UUID for tracking who ordered what';
COMMENT ON COLUMN order_sessions.item_ids IS 'Array of order_item IDs belonging to this session';

COMMENT ON FUNCTION calculate_tip_distribution IS 'Calculate how tips should be distributed for a given period';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
