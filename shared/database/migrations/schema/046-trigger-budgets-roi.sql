-- =============================================
-- Migration 046: Trigger Budgets & ROI Tracking
-- =============================================
-- Budget allocation for trigger campaigns with redemption limits
-- and ROI (Return on Investment) tracking
-- Part of GB-AI-ZONE-INTEL Phase 4
-- =============================================

-- =============================================
-- TABLE: ai_trigger_budgets
-- Budget allocation and tracking for trigger campaigns
-- Supports: fixed budget, per-execution cost, redemption limits
-- =============================================

CREATE TABLE ai_trigger_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- References
  trigger_id UUID NOT NULL REFERENCES ai_customer_triggers(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Budget Configuration
  -- budget_type: how to calculate spend
  -- - 'fixed': total_budget is max spend for entire campaign
  -- - 'per_execution': cost_per_execution × redemptions
  -- - 'percentage': percentage of generated revenue reinvested
  budget_type TEXT NOT NULL DEFAULT 'fixed' CHECK (budget_type IN (
    'fixed',
    'per_execution',
    'percentage'
  )),

  -- Monetary Limits
  total_budget DECIMAL(10,2),              -- Max total spend (NULL = unlimited)
  spent_amount DECIMAL(10,2) DEFAULT 0,    -- Current spent
  cost_per_execution DECIMAL(10,2),        -- For per_execution type

  -- Redemption Limits (useful for "primi 1000 caffè" scenarios)
  max_redemptions INTEGER,                 -- NULL = unlimited
  redemptions_used INTEGER DEFAULT 0,

  -- Time Constraints
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,

  -- ROI Tracking (aggregated from trigger_executions)
  total_revenue_generated DECIMAL(10,2) DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  paused_at TIMESTAMPTZ,
  paused_reason TEXT CHECK (paused_reason IN (
    'budget_exhausted',
    'redemptions_exhausted',
    'campaign_ended',
    'manual_pause',
    'performance_review'
  )),

  -- Auto-pause settings
  auto_pause_on_budget_exhausted BOOLEAN DEFAULT TRUE,
  auto_pause_on_redemptions_exhausted BOOLEAN DEFAULT TRUE,

  -- Notifications
  notify_at_budget_percentage INTEGER CHECK (notify_at_budget_percentage > 0 AND notify_at_budget_percentage <= 100),
  notify_at_redemption_percentage INTEGER CHECK (notify_at_redemption_percentage > 0 AND notify_at_redemption_percentage <= 100),
  last_notified_at TIMESTAMPTZ,

  -- Metadata
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One budget per trigger
  CONSTRAINT unique_trigger_budget UNIQUE (trigger_id)
);

-- Indexes
CREATE INDEX idx_ai_trigger_budgets_merchant ON ai_trigger_budgets(merchant_id);
CREATE INDEX idx_ai_trigger_budgets_trigger ON ai_trigger_budgets(trigger_id);
CREATE INDEX idx_ai_trigger_budgets_active ON ai_trigger_budgets(merchant_id, is_active)
  WHERE is_active = TRUE;
CREATE INDEX idx_ai_trigger_budgets_dates ON ai_trigger_budgets(start_date, end_date)
  WHERE start_date IS NOT NULL OR end_date IS NOT NULL;

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE ai_trigger_budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access trigger budgets"
  ON ai_trigger_budgets FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Merchant staff can view trigger budgets"
  ON ai_trigger_budgets FOR SELECT
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

CREATE POLICY "Merchant staff can manage trigger budgets"
  ON ai_trigger_budgets FOR ALL
  USING (merchant_id IN (
    SELECT ar.tenant_id FROM account_roles ar
    WHERE ar.account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    AND ar.role_type = 'merchant'
    AND ar.is_active = true
  ));

-- =============================================
-- TRIGGERS
-- =============================================

CREATE TRIGGER update_ai_trigger_budgets_timestamp
  BEFORE UPDATE ON ai_trigger_budgets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- FUNCTIONS
-- =============================================

-- Function: Check if trigger can execute based on budget/limits
CREATE OR REPLACE FUNCTION check_trigger_budget(p_trigger_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_budget RECORD;
BEGIN
  SELECT * INTO v_budget
  FROM ai_trigger_budgets
  WHERE trigger_id = p_trigger_id AND is_active = TRUE;

  -- No budget record = no restrictions
  IF NOT FOUND THEN
    RETURN TRUE;
  END IF;

  -- Check redemption limit
  IF v_budget.max_redemptions IS NOT NULL
     AND v_budget.redemptions_used >= v_budget.max_redemptions THEN
    RETURN FALSE;
  END IF;

  -- Check budget limit
  IF v_budget.total_budget IS NOT NULL
     AND v_budget.spent_amount >= v_budget.total_budget THEN
    RETURN FALSE;
  END IF;

  -- Check start date
  IF v_budget.start_date IS NOT NULL AND NOW() < v_budget.start_date THEN
    RETURN FALSE;
  END IF;

  -- Check end date
  IF v_budget.end_date IS NOT NULL AND NOW() > v_budget.end_date THEN
    RETURN FALSE;
  END IF;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Record budget spend and check limits
CREATE OR REPLACE FUNCTION record_trigger_budget_spend(
  p_trigger_id UUID,
  p_execution_cost DECIMAL(10,2) DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_budget RECORD;
  v_actual_cost DECIMAL(10,2);
  v_should_pause BOOLEAN := FALSE;
  v_pause_reason TEXT;
  v_result JSONB;
BEGIN
  SELECT * INTO v_budget
  FROM ai_trigger_budgets
  WHERE trigger_id = p_trigger_id AND is_active = TRUE
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', true, 'has_budget', false);
  END IF;

  -- Calculate cost based on budget type
  v_actual_cost := COALESCE(p_execution_cost, v_budget.cost_per_execution, 0);

  -- Update counters
  UPDATE ai_trigger_budgets
  SET
    redemptions_used = redemptions_used + 1,
    spent_amount = spent_amount + v_actual_cost,
    updated_at = NOW()
  WHERE id = v_budget.id;

  -- Check if should auto-pause
  IF v_budget.auto_pause_on_redemptions_exhausted
     AND v_budget.max_redemptions IS NOT NULL
     AND (v_budget.redemptions_used + 1) >= v_budget.max_redemptions THEN
    v_should_pause := TRUE;
    v_pause_reason := 'redemptions_exhausted';
  ELSIF v_budget.auto_pause_on_budget_exhausted
     AND v_budget.total_budget IS NOT NULL
     AND (v_budget.spent_amount + v_actual_cost) >= v_budget.total_budget THEN
    v_should_pause := TRUE;
    v_pause_reason := 'budget_exhausted';
  END IF;

  IF v_should_pause THEN
    UPDATE ai_trigger_budgets
    SET
      is_active = FALSE,
      paused_at = NOW(),
      paused_reason = v_pause_reason
    WHERE id = v_budget.id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'has_budget', true,
    'cost_recorded', v_actual_cost,
    'paused', v_should_pause,
    'pause_reason', v_pause_reason
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Record conversion revenue
CREATE OR REPLACE FUNCTION record_trigger_budget_revenue(
  p_trigger_id UUID,
  p_revenue DECIMAL(10,2)
)
RETURNS VOID AS $$
BEGIN
  UPDATE ai_trigger_budgets
  SET
    total_revenue_generated = total_revenue_generated + p_revenue,
    total_conversions = total_conversions + 1,
    updated_at = NOW()
  WHERE trigger_id = p_trigger_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function: Get budget utilization status
CREATE OR REPLACE FUNCTION get_budget_utilization(p_trigger_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_budget RECORD;
BEGIN
  SELECT * INTO v_budget
  FROM ai_trigger_budgets
  WHERE trigger_id = p_trigger_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('has_budget', false);
  END IF;

  RETURN jsonb_build_object(
    'has_budget', true,
    'is_active', v_budget.is_active,
    'budget_type', v_budget.budget_type,
    'total_budget', v_budget.total_budget,
    'spent_amount', v_budget.spent_amount,
    'budget_remaining', COALESCE(v_budget.total_budget - v_budget.spent_amount, NULL),
    'budget_utilization_pct', CASE
      WHEN v_budget.total_budget > 0
      THEN ROUND((v_budget.spent_amount / v_budget.total_budget) * 100, 2)
      ELSE NULL
    END,
    'max_redemptions', v_budget.max_redemptions,
    'redemptions_used', v_budget.redemptions_used,
    'redemptions_remaining', CASE
      WHEN v_budget.max_redemptions IS NOT NULL
      THEN v_budget.max_redemptions - v_budget.redemptions_used
      ELSE NULL
    END,
    'redemption_utilization_pct', CASE
      WHEN v_budget.max_redemptions IS NOT NULL AND v_budget.max_redemptions > 0
      THEN ROUND((v_budget.redemptions_used::DECIMAL / v_budget.max_redemptions) * 100, 2)
      ELSE NULL
    END,
    'total_revenue_generated', v_budget.total_revenue_generated,
    'total_conversions', v_budget.total_conversions,
    'roi_ratio', CASE
      WHEN v_budget.spent_amount > 0
      THEN ROUND((v_budget.total_revenue_generated / v_budget.spent_amount), 2)
      ELSE NULL
    END,
    'cost_per_conversion', CASE
      WHEN v_budget.total_conversions > 0
      THEN ROUND((v_budget.spent_amount / v_budget.total_conversions), 2)
      ELSE NULL
    END,
    'paused_at', v_budget.paused_at,
    'paused_reason', v_budget.paused_reason,
    'start_date', v_budget.start_date,
    'end_date', v_budget.end_date
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =============================================
-- VIEW: ai_trigger_roi_summary
-- Aggregated ROI metrics per trigger (joins with budgets)
-- =============================================

CREATE OR REPLACE VIEW v_trigger_roi_summary
WITH (security_invoker = true) AS
SELECT
  t.id AS trigger_id,
  t.merchant_id,
  t.name,
  t.trigger_type,
  t.action_type,
  t.is_active AS trigger_active,
  t.total_triggered,
  t.total_converted,
  CASE
    WHEN t.total_triggered > 0
    THEN ROUND((t.total_converted::DECIMAL / t.total_triggered) * 100, 2)
    ELSE 0
  END AS conversion_rate_pct,
  -- Budget info
  b.budget_type,
  b.total_budget,
  b.spent_amount,
  COALESCE(b.total_budget - b.spent_amount, NULL) AS budget_remaining,
  b.max_redemptions,
  b.redemptions_used,
  b.is_active AS budget_active,
  b.start_date,
  b.end_date,
  -- ROI metrics
  b.total_revenue_generated,
  b.total_conversions AS budget_conversions,
  CASE
    WHEN b.spent_amount > 0
    THEN ROUND((b.total_revenue_generated / b.spent_amount), 2)
    ELSE NULL
  END AS roi_ratio,
  CASE
    WHEN b.total_conversions > 0
    THEN ROUND((b.spent_amount / b.total_conversions), 2)
    ELSE NULL
  END AS cost_per_conversion,
  CASE
    WHEN b.total_conversions > 0
    THEN ROUND((b.total_revenue_generated / b.total_conversions), 2)
    ELSE NULL
  END AS revenue_per_conversion,
  -- Status
  b.paused_at,
  b.paused_reason
FROM ai_customer_triggers t
LEFT JOIN ai_trigger_budgets b ON t.id = b.trigger_id;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE ai_trigger_budgets IS 'Budget allocation and ROI tracking for customer trigger campaigns';
COMMENT ON COLUMN ai_trigger_budgets.budget_type IS 'How budget is calculated: fixed total, per execution, or percentage of revenue';
COMMENT ON COLUMN ai_trigger_budgets.total_budget IS 'Maximum spend for campaign in merchant currency (NULL = unlimited)';
COMMENT ON COLUMN ai_trigger_budgets.max_redemptions IS 'Maximum times trigger can execute (e.g. "primi 1000 caffe")';
COMMENT ON COLUMN ai_trigger_budgets.total_revenue_generated IS 'Sum of conversion_value from successful trigger executions';
COMMENT ON COLUMN ai_trigger_budgets.auto_pause_on_budget_exhausted IS 'Automatically pause when budget runs out';
COMMENT ON COLUMN ai_trigger_budgets.notify_at_budget_percentage IS 'Send notification when budget reaches this percentage (e.g. 80)';

COMMENT ON FUNCTION check_trigger_budget IS 'Returns TRUE if trigger can execute (within budget/redemption limits)';
COMMENT ON FUNCTION record_trigger_budget_spend IS 'Records spend and redemption, auto-pauses if limits reached';
COMMENT ON FUNCTION record_trigger_budget_revenue IS 'Records revenue from successful conversion for ROI calculation';
COMMENT ON FUNCTION get_budget_utilization IS 'Returns detailed budget status including ROI metrics';

COMMENT ON VIEW v_trigger_roi_summary IS 'Consolidated view of trigger performance with budget and ROI metrics';

-- =============================================
-- END OF MIGRATION 046
-- =============================================
