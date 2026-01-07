-- Migration 040: Fix AI Tables RLS Policies
-- Changes "WITH CHECK (true)" to "WITH CHECK (auth.role() = 'service_role')"
-- This ensures only the backend (service_role) can insert/update AI data
-- Reference: https://supabase.com/docs/guides/database/database-linter?lint=0024_permissive_rls_policy

-- ============================================
-- AI ALERTS
-- ============================================
DROP POLICY IF EXISTS "System can insert alerts" ON ai_alerts;
CREATE POLICY "System can insert alerts" ON ai_alerts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI BOOTSTRAP RESULTS
-- ============================================
DROP POLICY IF EXISTS "System can insert bootstrap" ON ai_bootstrap_results;
CREATE POLICY "System can insert bootstrap" ON ai_bootstrap_results
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "System can update bootstrap" ON ai_bootstrap_results;
CREATE POLICY "System can update bootstrap" ON ai_bootstrap_results
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI BUDGET PLANS
-- ============================================
DROP POLICY IF EXISTS "budget_plans_system_insert" ON ai_budget_plans;
CREATE POLICY "budget_plans_system_insert" ON ai_budget_plans
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "budget_plans_system_update" ON ai_budget_plans;
CREATE POLICY "budget_plans_system_update" ON ai_budget_plans
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI CASH FLOW FORECASTS
-- ============================================
DROP POLICY IF EXISTS "cash_flow_system_insert" ON ai_cash_flow_forecasts;
CREATE POLICY "cash_flow_system_insert" ON ai_cash_flow_forecasts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI COMPETITOR PROFILES
-- ============================================
DROP POLICY IF EXISTS "System can insert competitors" ON ai_competitor_profiles;
CREATE POLICY "System can insert competitors" ON ai_competitor_profiles
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI CONTENT CALENDARS
-- ============================================
DROP POLICY IF EXISTS "System can insert calendars" ON ai_content_calendars;
DROP POLICY IF EXISTS "content_calendars_system_insert" ON ai_content_calendars;
CREATE POLICY "content_calendars_system_insert" ON ai_content_calendars
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "content_calendars_system_update" ON ai_content_calendars;
CREATE POLICY "content_calendars_system_update" ON ai_content_calendars
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI DAILY BRIEFINGS
-- ============================================
DROP POLICY IF EXISTS "System can insert briefings" ON ai_daily_briefings;
CREATE POLICY "System can insert briefings" ON ai_daily_briefings
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI DELEGATED TASKS
-- ============================================
DROP POLICY IF EXISTS "tasks_system_insert" ON ai_delegated_tasks;
CREATE POLICY "tasks_system_insert" ON ai_delegated_tasks
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "tasks_system_update" ON ai_delegated_tasks;
CREATE POLICY "tasks_system_update" ON ai_delegated_tasks
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI EXPENSES
-- ============================================
DROP POLICY IF EXISTS "expenses_system_insert" ON ai_expenses;
CREATE POLICY "expenses_system_insert" ON ai_expenses
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "expenses_system_update" ON ai_expenses;
CREATE POLICY "expenses_system_update" ON ai_expenses
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI FEEDBACK RESPONSES
-- ============================================
DROP POLICY IF EXISTS "System can insert responses" ON ai_feedback_responses;
CREATE POLICY "System can insert responses" ON ai_feedback_responses
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI FINANCIAL SUMMARIES
-- ============================================
DROP POLICY IF EXISTS "financial_summaries_system_insert" ON ai_financial_summaries;
CREATE POLICY "financial_summaries_system_insert" ON ai_financial_summaries
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI INVENTORY ITEMS
-- ============================================
DROP POLICY IF EXISTS "inventory_items_system_insert" ON ai_inventory_items;
CREATE POLICY "inventory_items_system_insert" ON ai_inventory_items
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "inventory_items_system_update" ON ai_inventory_items;
CREATE POLICY "inventory_items_system_update" ON ai_inventory_items
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI MARKET TRENDS
-- ============================================
DROP POLICY IF EXISTS "System can insert trends" ON ai_market_trends;
CREATE POLICY "System can insert trends" ON ai_market_trends
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI NEGOTIATION DRAFTS
-- ============================================
DROP POLICY IF EXISTS "negotiation_drafts_system_insert" ON ai_negotiation_drafts;
CREATE POLICY "negotiation_drafts_system_insert" ON ai_negotiation_drafts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI PARTNERSHIP OPPORTUNITIES
-- ============================================
DROP POLICY IF EXISTS "System can insert partnerships" ON ai_partnership_opportunities;
CREATE POLICY "System can insert partnerships" ON ai_partnership_opportunities
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI PRICE COMPARISONS
-- ============================================
DROP POLICY IF EXISTS "System can insert price comparisons" ON ai_price_comparisons;
CREATE POLICY "System can insert price comparisons" ON ai_price_comparisons
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI PURCHASE ORDERS
-- ============================================
DROP POLICY IF EXISTS "purchase_orders_system_insert" ON ai_purchase_orders;
CREATE POLICY "purchase_orders_system_insert" ON ai_purchase_orders
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "purchase_orders_system_update" ON ai_purchase_orders;
CREATE POLICY "purchase_orders_system_update" ON ai_purchase_orders
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI SOCIAL ACCOUNTS
-- ============================================
DROP POLICY IF EXISTS "social_accounts_system_insert" ON ai_social_accounts;
CREATE POLICY "social_accounts_system_insert" ON ai_social_accounts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "social_accounts_system_update" ON ai_social_accounts;
CREATE POLICY "social_accounts_system_update" ON ai_social_accounts
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI SOCIAL POSTS
-- ============================================
DROP POLICY IF EXISTS "System can insert posts" ON ai_social_posts;
DROP POLICY IF EXISTS "social_posts_system_insert" ON ai_social_posts;
CREATE POLICY "social_posts_system_insert" ON ai_social_posts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "social_posts_system_update" ON ai_social_posts;
CREATE POLICY "social_posts_system_update" ON ai_social_posts
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI STOCK ALERTS
-- ============================================
DROP POLICY IF EXISTS "stock_alerts_system_insert" ON ai_stock_alerts;
CREATE POLICY "stock_alerts_system_insert" ON ai_stock_alerts
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "stock_alerts_system_update" ON ai_stock_alerts;
CREATE POLICY "stock_alerts_system_update" ON ai_stock_alerts
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI STOCK MOVEMENTS
-- ============================================
DROP POLICY IF EXISTS "stock_movements_system_insert" ON ai_stock_movements;
CREATE POLICY "stock_movements_system_insert" ON ai_stock_movements
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI SUGGESTIONS
-- ============================================
DROP POLICY IF EXISTS "System can insert suggestions" ON ai_suggestions;
CREATE POLICY "System can insert suggestions" ON ai_suggestions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI SUPPLIERS
-- ============================================
DROP POLICY IF EXISTS "suppliers_system_insert" ON ai_suppliers;
CREATE POLICY "suppliers_system_insert" ON ai_suppliers
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "suppliers_system_update" ON ai_suppliers;
CREATE POLICY "suppliers_system_update" ON ai_suppliers
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI TASK TEMPLATES
-- ============================================
DROP POLICY IF EXISTS "templates_system_insert" ON ai_task_templates;
CREATE POLICY "templates_system_insert" ON ai_task_templates
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI USAGE LOGS
-- ============================================
DROP POLICY IF EXISTS "System can insert AI usage" ON ai_usage_logs;
CREATE POLICY "System can insert AI usage" ON ai_usage_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI WORKFLOW DEFINITIONS
-- ============================================
DROP POLICY IF EXISTS "workflow_defs_system_insert" ON ai_workflow_definitions;
CREATE POLICY "workflow_defs_system_insert" ON ai_workflow_definitions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "workflow_defs_system_update" ON ai_workflow_definitions;
CREATE POLICY "workflow_defs_system_update" ON ai_workflow_definitions
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI WORKFLOW EXECUTIONS
-- ============================================
DROP POLICY IF EXISTS "workflow_execs_system_insert" ON ai_workflow_executions;
CREATE POLICY "workflow_execs_system_insert" ON ai_workflow_executions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "workflow_execs_system_update" ON ai_workflow_executions;
CREATE POLICY "workflow_execs_system_update" ON ai_workflow_executions
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- AI WORKFLOW LOGS
-- ============================================
DROP POLICY IF EXISTS "workflow_logs_system_insert" ON ai_workflow_logs;
CREATE POLICY "workflow_logs_system_insert" ON ai_workflow_logs
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI WORKFLOW SCHEDULES
-- ============================================
DROP POLICY IF EXISTS "workflow_scheds_system_insert" ON ai_workflow_schedules;
CREATE POLICY "workflow_scheds_system_insert" ON ai_workflow_schedules
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- AI ZONE ANALYSIS
-- ============================================
DROP POLICY IF EXISTS "System can insert zone analysis" ON ai_zone_analysis;
CREATE POLICY "System can insert zone analysis" ON ai_zone_analysis
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS "System can update zone analysis" ON ai_zone_analysis;
CREATE POLICY "System can update zone analysis" ON ai_zone_analysis
  FOR UPDATE USING (auth.role() = 'service_role');

-- ============================================
-- INTERNAL NOTIFICATIONS
-- ============================================
DROP POLICY IF EXISTS "System can insert notifications" ON internal_notifications;
CREATE POLICY "System can insert notifications" ON internal_notifications
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- ORDER STATUS HISTORY
-- ============================================
DROP POLICY IF EXISTS "System can log status changes" ON order_status_history;
CREATE POLICY "System can log status changes" ON order_status_history
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
