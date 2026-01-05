-- Migration 033: AI Financial Management
-- Phase 9: P&L analysis, budgeting, cash flow forecasting
-- Created: 2026-01-05

-- ============================================
-- TABLE: ai_financial_summaries
-- P&L summaries by period
-- ============================================
CREATE TABLE IF NOT EXISTS ai_financial_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Period info
  period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'yearly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Revenue breakdown (JSONB)
  revenue JSONB DEFAULT '{}',
  -- { total, byCategory: {}, orderCount, averageOrderValue }

  -- Costs breakdown (JSONB)
  costs JSONB DEFAULT '{}',
  -- { total, labor, ingredients, utilities, rent, marketing, other }

  -- P&L metrics
  gross_profit DECIMAL(12,2) DEFAULT 0,
  gross_margin DECIMAL(5,2) DEFAULT 0,
  net_profit DECIMAL(12,2) DEFAULT 0,
  net_margin DECIMAL(5,2) DEFAULT 0,

  -- Comparison with previous period
  vs_last_period JSONB,
  -- { revenueChange, costChange, profitChange }

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ai_budget_plans
-- Monthly budget allocations with AI insights
-- ============================================
CREATE TABLE IF NOT EXISTS ai_budget_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  year INTEGER NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),

  -- Budget allocations (JSONB array)
  budgets JSONB DEFAULT '[]',
  -- [{ category, planned, actual, variance, variancePercent }]

  -- Totals
  total_budget DECIMAL(12,2) DEFAULT 0,
  total_spent DECIMAL(12,2) DEFAULT 0,
  remaining DECIMAL(12,2) DEFAULT 0,

  -- AI analysis
  insights TEXT[] DEFAULT '{}',
  recommendations TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One budget per month per merchant
  UNIQUE(merchant_id, year, month)
);

-- ============================================
-- TABLE: ai_cash_flow_forecasts
-- Cash flow projections with risk analysis
-- ============================================
CREATE TABLE IF NOT EXISTS ai_cash_flow_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Period (e.g., "2026-Q1")
  forecast_period TEXT NOT NULL,

  -- Projections
  projected_revenue DECIMAL(12,2) DEFAULT 0,
  projected_costs DECIMAL(12,2) DEFAULT 0,
  projected_profit DECIMAL(12,2) DEFAULT 0,

  -- Weekly breakdown (JSONB array)
  weekly_projections JSONB DEFAULT '[]',
  -- [{ week, startDate, revenue, costs, netCash }]

  -- Risk factors (JSONB array)
  risks JSONB DEFAULT '[]',
  -- [{ factor, impact: low/medium/high, mitigation }]

  -- Confidence and assumptions
  confidence INTEGER DEFAULT 70 CHECK (confidence >= 0 AND confidence <= 100),
  assumptions TEXT[] DEFAULT '{}',

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ai_expenses
-- Track individual expenses for budget tracking
-- ============================================
CREATE TABLE IF NOT EXISTS ai_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  category TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(12,2) NOT NULL,
  expense_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Recurring expense info
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT, -- monthly, weekly, yearly

  -- Metadata
  vendor TEXT,
  receipt_url TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_ai_financial_summaries_merchant ON ai_financial_summaries(merchant_id);
CREATE INDEX idx_ai_financial_summaries_period ON ai_financial_summaries(merchant_id, period, period_start);
CREATE INDEX idx_ai_budget_plans_merchant ON ai_budget_plans(merchant_id);
CREATE INDEX idx_ai_budget_plans_period ON ai_budget_plans(merchant_id, year, month);
CREATE INDEX idx_ai_cash_flow_forecasts_merchant ON ai_cash_flow_forecasts(merchant_id);
CREATE INDEX idx_ai_expenses_merchant ON ai_expenses(merchant_id);
CREATE INDEX idx_ai_expenses_date ON ai_expenses(merchant_id, expense_date);
CREATE INDEX idx_ai_expenses_category ON ai_expenses(merchant_id, category);

-- ============================================
-- RLS POLICIES (P5 pattern with account_roles)
-- ============================================
ALTER TABLE ai_financial_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_budget_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_cash_flow_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_expenses ENABLE ROW LEVEL SECURITY;

-- Financial Summaries: Read own, admins read all
CREATE POLICY "financial_summaries_read_own" ON ai_financial_summaries
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "financial_summaries_insert_own" ON ai_financial_summaries
  FOR INSERT WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Budget Plans: Full access for merchant team
CREATE POLICY "budget_plans_read_own" ON ai_budget_plans
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "budget_plans_write_own" ON ai_budget_plans
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Cash Flow Forecasts
CREATE POLICY "cash_flow_read_own" ON ai_cash_flow_forecasts
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "cash_flow_insert_own" ON ai_cash_flow_forecasts
  FOR INSERT WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Expenses: Full CRUD for merchant team
CREATE POLICY "expenses_read_own" ON ai_expenses
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "expenses_write_own" ON ai_expenses
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Admin access for GudBro team
CREATE POLICY "financial_admin_access" ON ai_financial_summaries
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "budgets_admin_access" ON ai_budget_plans
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "forecasts_admin_access" ON ai_cash_flow_forecasts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "expenses_admin_access" ON ai_expenses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

-- ============================================
-- TRIGGER: Update timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_ai_budget_plans_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ai_budget_plans_updated_at
  BEFORE UPDATE ON ai_budget_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_budget_plans_updated_at();

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON TABLE ai_financial_summaries IS 'AI-generated P&L summaries by period';
COMMENT ON TABLE ai_budget_plans IS 'Monthly budget plans with AI insights';
COMMENT ON TABLE ai_cash_flow_forecasts IS 'AI cash flow projections with risk analysis';
COMMENT ON TABLE ai_expenses IS 'Individual expense tracking for budget management';
