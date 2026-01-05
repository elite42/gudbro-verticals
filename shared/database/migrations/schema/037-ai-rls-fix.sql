-- Migration 037: Fix AI Tables RLS Policies
-- Issue: INSERT/UPDATE blocked by RLS when using anon key from API
-- Solution: Add "service" policies that allow system operations
-- Created: 2026-01-05

-- ============================================
-- STRATEGY: Add policies to allow INSERT for system operations
-- The API acts on behalf of the system/service, not individual users
-- We add policies that allow operations when coming from the backend
-- ============================================

-- ============================================
-- AI DELEGATED TASKS (Phase 10)
-- ============================================
-- Allow inserts from system (API routes)
CREATE POLICY "tasks_system_insert" ON ai_delegated_tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "tasks_system_update" ON ai_delegated_tasks
  FOR UPDATE
  USING (true);

-- ============================================
-- AI TASK TEMPLATES (Phase 10)
-- ============================================
CREATE POLICY "templates_system_insert" ON ai_task_templates
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AI WORKFLOW DEFINITIONS (Phase 11)
-- ============================================
CREATE POLICY "workflow_defs_system_insert" ON ai_workflow_definitions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "workflow_defs_system_update" ON ai_workflow_definitions
  FOR UPDATE
  USING (true);

-- ============================================
-- AI WORKFLOW EXECUTIONS (Phase 11)
-- ============================================
CREATE POLICY "workflow_execs_system_insert" ON ai_workflow_executions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "workflow_execs_system_update" ON ai_workflow_executions
  FOR UPDATE
  USING (true);

-- ============================================
-- AI WORKFLOW SCHEDULES (Phase 11)
-- ============================================
CREATE POLICY "workflow_scheds_system_insert" ON ai_workflow_schedules
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AI WORKFLOW LOGS (Phase 11)
-- ============================================
CREATE POLICY "workflow_logs_system_insert" ON ai_workflow_logs
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AI FINANCIAL SUMMARIES (Phase 9)
-- ============================================
CREATE POLICY "financial_summaries_system_insert" ON ai_financial_summaries
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AI BUDGET PLANS (Phase 9)
-- ============================================
CREATE POLICY "budget_plans_system_insert" ON ai_budget_plans
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "budget_plans_system_update" ON ai_budget_plans
  FOR UPDATE
  USING (true);

-- ============================================
-- AI CASH FLOW FORECASTS (Phase 9)
-- ============================================
CREATE POLICY "cash_flow_system_insert" ON ai_cash_flow_forecasts
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AI EXPENSES (Phase 9)
-- ============================================
CREATE POLICY "expenses_system_insert" ON ai_expenses
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "expenses_system_update" ON ai_expenses
  FOR UPDATE
  USING (true);

-- ============================================
-- AI SOCIAL POSTS (Phase 8)
-- ============================================
CREATE POLICY "social_posts_system_insert" ON ai_social_posts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "social_posts_system_update" ON ai_social_posts
  FOR UPDATE
  USING (true);

-- ============================================
-- AI CONTENT CALENDARS (Phase 8)
-- ============================================
CREATE POLICY "content_calendars_system_insert" ON ai_content_calendars
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "content_calendars_system_update" ON ai_content_calendars
  FOR UPDATE
  USING (true);

-- ============================================
-- AI SOCIAL ACCOUNTS (Phase 8)
-- ============================================
CREATE POLICY "social_accounts_system_insert" ON ai_social_accounts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "social_accounts_system_update" ON ai_social_accounts
  FOR UPDATE
  USING (true);

-- ============================================
-- AI SUPPLIERS (Phase 12)
-- ============================================
CREATE POLICY "suppliers_system_insert" ON ai_suppliers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "suppliers_system_update" ON ai_suppliers
  FOR UPDATE
  USING (true);

-- ============================================
-- AI INVENTORY ITEMS (Phase 12)
-- ============================================
CREATE POLICY "inventory_items_system_insert" ON ai_inventory_items
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "inventory_items_system_update" ON ai_inventory_items
  FOR UPDATE
  USING (true);

-- ============================================
-- AI STOCK MOVEMENTS (Phase 12)
-- ============================================
CREATE POLICY "stock_movements_system_insert" ON ai_stock_movements
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- AI STOCK ALERTS (Phase 12)
-- ============================================
CREATE POLICY "stock_alerts_system_insert" ON ai_stock_alerts
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "stock_alerts_system_update" ON ai_stock_alerts
  FOR UPDATE
  USING (true);

-- ============================================
-- AI PURCHASE ORDERS (Phase 12)
-- ============================================
CREATE POLICY "purchase_orders_system_insert" ON ai_purchase_orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "purchase_orders_system_update" ON ai_purchase_orders
  FOR UPDATE
  USING (true);

-- ============================================
-- AI NEGOTIATION DRAFTS (Phase 12)
-- ============================================
CREATE POLICY "negotiation_drafts_system_insert" ON ai_negotiation_drafts
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON POLICY "tasks_system_insert" ON ai_delegated_tasks IS 'Allow API/system to insert tasks';
