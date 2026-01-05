-- Migration 034: AI Task Delegation
-- Phase 10: AI delegates physical tasks to merchant/staff
-- Created: 2026-01-05

-- ============================================
-- TABLE: ai_delegated_tasks
-- Tasks created by AI for human execution
-- ============================================
CREATE TABLE IF NOT EXISTS ai_delegated_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Task details
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'inventory', 'maintenance', 'staff', 'customer',
    'marketing', 'financial', 'compliance', 'other'
  )),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'in_progress', 'completed', 'cancelled', 'overdue'
  )),

  -- Assignment
  assigned_to UUID REFERENCES auth.users(id),
  assigned_role TEXT,                    -- e.g., "manager", "staff"

  -- Timing
  due_date TIMESTAMPTZ,
  estimated_minutes INTEGER,
  completed_at TIMESTAMPTZ,

  -- AI context
  ai_reason TEXT,                        -- Why AI created this task
  ai_suggestions TEXT[] DEFAULT '{}',    -- Tips for completing
  related_data JSONB,                    -- e.g., low stock items, event details

  -- Tracking
  created_by TEXT NOT NULL DEFAULT 'manual' CHECK (created_by IN ('ai', 'manual')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Completion feedback
  completion_notes TEXT,
  was_helpful BOOLEAN                    -- User feedback on task usefulness
);

-- ============================================
-- TABLE: ai_task_templates
-- Reusable task templates for common operations
-- ============================================
CREATE TABLE IF NOT EXISTS ai_task_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,  -- NULL = global template

  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  default_priority TEXT DEFAULT 'medium',
  estimated_minutes INTEGER,
  checklist JSONB DEFAULT '[]',          -- Array of steps

  -- Recurrence settings
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_pattern TEXT,               -- daily, weekly, monthly
  recurrence_day INTEGER,                -- Day of week (0-6) or month (1-31)

  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ai_task_recurrences
-- Track recurring task instances
-- ============================================
CREATE TABLE IF NOT EXISTS ai_task_recurrences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID NOT NULL REFERENCES ai_task_templates(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  last_generated_at TIMESTAMPTZ,
  next_due_at TIMESTAMPTZ,

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_ai_delegated_tasks_merchant ON ai_delegated_tasks(merchant_id);
CREATE INDEX idx_ai_delegated_tasks_status ON ai_delegated_tasks(merchant_id, status);
CREATE INDEX idx_ai_delegated_tasks_priority ON ai_delegated_tasks(merchant_id, priority);
CREATE INDEX idx_ai_delegated_tasks_category ON ai_delegated_tasks(merchant_id, category);
CREATE INDEX idx_ai_delegated_tasks_due_date ON ai_delegated_tasks(merchant_id, due_date) WHERE due_date IS NOT NULL;
CREATE INDEX idx_ai_delegated_tasks_assigned ON ai_delegated_tasks(assigned_to) WHERE assigned_to IS NOT NULL;
CREATE INDEX idx_ai_task_templates_merchant ON ai_task_templates(merchant_id);
CREATE INDEX idx_ai_task_recurrences_next ON ai_task_recurrences(next_due_at) WHERE is_active = TRUE;

-- ============================================
-- RLS POLICIES (P5 pattern with account_roles)
-- ============================================
ALTER TABLE ai_delegated_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_task_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_task_recurrences ENABLE ROW LEVEL SECURITY;

-- Delegated Tasks: Full access for merchant team
CREATE POLICY "tasks_read_own" ON ai_delegated_tasks
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "tasks_write_own" ON ai_delegated_tasks
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Task Templates: Read global + own, write own
CREATE POLICY "templates_read" ON ai_task_templates
  FOR SELECT USING (
    merchant_id IS NULL OR  -- Global templates
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "templates_write_own" ON ai_task_templates
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Recurrences
CREATE POLICY "recurrences_read_own" ON ai_task_recurrences
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "recurrences_write_own" ON ai_task_recurrences
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Admin access
CREATE POLICY "tasks_admin_access" ON ai_delegated_tasks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "templates_admin_access" ON ai_task_templates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "recurrences_admin_access" ON ai_task_recurrences
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
CREATE OR REPLACE FUNCTION update_ai_delegated_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_ai_delegated_tasks_updated_at
  BEFORE UPDATE ON ai_delegated_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_delegated_tasks_updated_at();

CREATE TRIGGER trigger_ai_task_templates_updated_at
  BEFORE UPDATE ON ai_task_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_delegated_tasks_updated_at();

-- ============================================
-- FUNCTION: Mark overdue tasks
-- Run periodically to update overdue status
-- ============================================
CREATE OR REPLACE FUNCTION mark_overdue_tasks()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE ai_delegated_tasks
  SET
    status = 'overdue',
    updated_at = NOW()
  WHERE
    due_date < NOW()
    AND status IN ('pending', 'in_progress');

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED: Default task templates (global)
-- ============================================
INSERT INTO ai_task_templates (name, description, category, default_priority, estimated_minutes, checklist, is_recurring, recurrence_pattern)
VALUES
  ('Daily Opening Checklist', 'Pre-opening tasks to start the day right', 'maintenance', 'high', 30,
   '[{"step": "Turn on lights and HVAC", "order": 1}, {"step": "Check cash drawer", "order": 2}, {"step": "Review reservations", "order": 3}, {"step": "Brief staff on specials", "order": 4}]'::jsonb,
   true, 'daily'),

  ('Daily Closing Checklist', 'End-of-day closing tasks', 'maintenance', 'high', 45,
   '[{"step": "Reconcile cash drawer", "order": 1}, {"step": "Clean kitchen surfaces", "order": 2}, {"step": "Take out trash", "order": 3}, {"step": "Set alarm and lock up", "order": 4}]'::jsonb,
   true, 'daily'),

  ('Weekly Inventory Check', 'Check stock levels and plan orders', 'inventory', 'medium', 60,
   '[{"step": "Count perishables", "order": 1}, {"step": "Check dry goods", "order": 2}, {"step": "Review par levels", "order": 3}, {"step": "Create order list", "order": 4}]'::jsonb,
   true, 'weekly'),

  ('Monthly Equipment Maintenance', 'Inspect and maintain kitchen equipment', 'maintenance', 'medium', 120,
   '[{"step": "Clean hood filters", "order": 1}, {"step": "Check refrigerator temps", "order": 2}, {"step": "Inspect fire suppression", "order": 3}, {"step": "Deep clean fryers", "order": 4}]'::jsonb,
   true, 'monthly')
ON CONFLICT DO NOTHING;

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON TABLE ai_delegated_tasks IS 'AI-generated tasks for human execution';
COMMENT ON TABLE ai_task_templates IS 'Reusable task templates for common operations';
COMMENT ON TABLE ai_task_recurrences IS 'Tracks recurring task generation';
COMMENT ON FUNCTION mark_overdue_tasks() IS 'Updates status of overdue tasks - run via cron';
