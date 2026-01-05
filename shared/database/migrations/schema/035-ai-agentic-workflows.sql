-- Migration 035: AI Agentic Workflows
-- Phase 11: Chain multiple AI actions into intelligent workflows
-- Created: 2026-01-05

-- ============================================
-- TABLE: ai_workflow_definitions
-- Workflow templates with steps and triggers
-- ============================================
CREATE TABLE IF NOT EXISTS ai_workflow_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Workflow info
  name TEXT NOT NULL,
  description TEXT,

  -- Trigger configuration
  trigger TEXT NOT NULL CHECK (trigger IN ('manual', 'scheduled', 'event', 'condition')),
  trigger_config JSONB,
  -- { schedule: "0 8 * * *", eventType: "order_created", condition: "revenue < threshold" }

  -- Workflow steps (JSONB array)
  steps JSONB NOT NULL DEFAULT '[]',
  -- [{ id, name, action, params, dependsOn: [] }]

  -- Status
  is_active BOOLEAN DEFAULT FALSE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ai_workflow_executions
-- Individual workflow runs
-- ============================================
CREATE TABLE IF NOT EXISTS ai_workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES ai_workflow_definitions(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Execution state
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'running', 'completed', 'failed', 'paused'
  )),

  -- Steps with execution results
  steps JSONB NOT NULL DEFAULT '[]',
  -- [{ id, name, action, params, status, result, error, startedAt, completedAt }]

  -- Timing
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  -- Error info
  error TEXT,

  -- Trigger info
  triggered_by TEXT NOT NULL,
  context JSONB                          -- Execution context and results
);

-- ============================================
-- TABLE: ai_workflow_schedules
-- Track scheduled workflow runs
-- ============================================
CREATE TABLE IF NOT EXISTS ai_workflow_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID NOT NULL REFERENCES ai_workflow_definitions(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Schedule info
  cron_expression TEXT NOT NULL,
  timezone TEXT DEFAULT 'UTC',

  -- Tracking
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  last_execution_id UUID REFERENCES ai_workflow_executions(id),

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workflow_id)
);

-- ============================================
-- TABLE: ai_workflow_logs
-- Detailed logging for debugging
-- ============================================
CREATE TABLE IF NOT EXISTS ai_workflow_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID NOT NULL REFERENCES ai_workflow_executions(id) ON DELETE CASCADE,
  step_id TEXT,

  level TEXT NOT NULL DEFAULT 'info' CHECK (level IN ('debug', 'info', 'warn', 'error')),
  message TEXT NOT NULL,
  data JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_ai_workflow_defs_merchant ON ai_workflow_definitions(merchant_id);
CREATE INDEX idx_ai_workflow_defs_active ON ai_workflow_definitions(merchant_id, is_active) WHERE is_active = TRUE;
CREATE INDEX idx_ai_workflow_defs_trigger ON ai_workflow_definitions(trigger);

CREATE INDEX idx_ai_workflow_execs_workflow ON ai_workflow_executions(workflow_id);
CREATE INDEX idx_ai_workflow_execs_merchant ON ai_workflow_executions(merchant_id);
CREATE INDEX idx_ai_workflow_execs_status ON ai_workflow_executions(merchant_id, status);
CREATE INDEX idx_ai_workflow_execs_started ON ai_workflow_executions(started_at);

CREATE INDEX idx_ai_workflow_schedules_next ON ai_workflow_schedules(next_run_at) WHERE is_active = TRUE;

CREATE INDEX idx_ai_workflow_logs_exec ON ai_workflow_logs(execution_id);
CREATE INDEX idx_ai_workflow_logs_level ON ai_workflow_logs(execution_id, level);

-- ============================================
-- RLS POLICIES (P5 pattern with account_roles)
-- ============================================
ALTER TABLE ai_workflow_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_workflow_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_workflow_logs ENABLE ROW LEVEL SECURITY;

-- Workflow Definitions
CREATE POLICY "workflow_defs_read_own" ON ai_workflow_definitions
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "workflow_defs_write_own" ON ai_workflow_definitions
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Workflow Executions
CREATE POLICY "workflow_execs_read_own" ON ai_workflow_executions
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "workflow_execs_write_own" ON ai_workflow_executions
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Workflow Schedules
CREATE POLICY "workflow_scheds_read_own" ON ai_workflow_schedules
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "workflow_scheds_write_own" ON ai_workflow_schedules
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Workflow Logs (read via execution)
CREATE POLICY "workflow_logs_read_own" ON ai_workflow_logs
  FOR SELECT USING (
    execution_id IN (
      SELECT id FROM ai_workflow_executions
      WHERE merchant_id IN (
        SELECT ar.tenant_id FROM account_roles ar
        WHERE ar.account_id = auth.uid()
      )
    )
  );

-- Admin access
CREATE POLICY "workflow_defs_admin" ON ai_workflow_definitions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "workflow_execs_admin" ON ai_workflow_executions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "workflow_scheds_admin" ON ai_workflow_schedules
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "workflow_logs_admin" ON ai_workflow_logs
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
CREATE TRIGGER trigger_ai_workflow_defs_updated_at
  BEFORE UPDATE ON ai_workflow_definitions
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_delegated_tasks_updated_at();

-- ============================================
-- FUNCTION: Get due scheduled workflows
-- Called by cron job to find workflows to run
-- ============================================
CREATE OR REPLACE FUNCTION get_due_workflows()
RETURNS TABLE (
  workflow_id UUID,
  merchant_id UUID,
  workflow_name TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.workflow_id,
    s.merchant_id,
    w.name as workflow_name
  FROM ai_workflow_schedules s
  JOIN ai_workflow_definitions w ON w.id = s.workflow_id
  WHERE
    s.is_active = TRUE
    AND w.is_active = TRUE
    AND s.next_run_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON TABLE ai_workflow_definitions IS 'Agentic workflow templates with multi-step actions';
COMMENT ON TABLE ai_workflow_executions IS 'Individual workflow execution runs';
COMMENT ON TABLE ai_workflow_schedules IS 'Scheduled workflow triggers';
COMMENT ON TABLE ai_workflow_logs IS 'Detailed execution logs for debugging';
COMMENT ON FUNCTION get_due_workflows() IS 'Returns workflows due for scheduled execution';
