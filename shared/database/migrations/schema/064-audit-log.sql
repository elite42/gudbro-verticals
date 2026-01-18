-- ============================================================================
-- Migration 064: Audit Log System
-- ============================================================================
-- Security audit trail for tracking all sensitive actions
-- Tracks: WHO did WHAT, WHEN, WHERE (IP), and WHAT CHANGED
-- ============================================================================

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Who performed the action
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  user_role TEXT,

  -- What action was performed
  action TEXT NOT NULL CHECK (action IN (
    -- Authentication
    'auth.login', 'auth.logout', 'auth.login_failed', 'auth.password_change',
    -- Menu management
    'menu.item_create', 'menu.item_update', 'menu.item_delete',
    'menu.category_create', 'menu.category_update', 'menu.category_delete',
    -- Order management
    'order.status_change', 'order.cancel', 'order.refund',
    -- Settings
    'settings.update', 'settings.payment_update', 'settings.hours_update',
    -- Team management
    'team.member_invite', 'team.member_remove', 'team.role_change',
    -- QR codes
    'qr.create', 'qr.update', 'qr.delete',
    -- AI actions
    'ai.suggestion_accept', 'ai.suggestion_reject', 'ai.task_delegate',
    -- System
    'system.export_data', 'system.bulk_update', 'system.config_change'
  )),

  -- Resource affected
  resource_type TEXT, -- 'menu_item', 'order', 'user', etc.
  resource_id UUID,

  -- What changed (before/after for updates)
  changes JSONB, -- { field: { old: X, new: Y } }

  -- Additional context
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Request context
  ip_address INET,
  user_agent TEXT,
  request_id TEXT,

  -- Multi-tenant
  merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Index for common queries
  CONSTRAINT audit_logs_merchant_required CHECK (
    merchant_id IS NOT NULL OR action LIKE 'auth.%' OR action LIKE 'system.%'
  )
);

-- Indexes for efficient querying
CREATE INDEX idx_audit_logs_merchant_created ON audit_logs(merchant_id, created_at DESC);
CREATE INDEX idx_audit_logs_user_created ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- RLS policies
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only service_role can insert (from backend)
CREATE POLICY "audit_logs_insert_service" ON audit_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Business owners can read their own audit logs
CREATE POLICY "audit_logs_select_owner" ON audit_logs
  FOR SELECT
  USING (
    auth.role() = 'service_role'
    OR merchant_id IN (
      SELECT merchant_id FROM merchant_users
      WHERE user_id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Function to record audit log entries
CREATE OR REPLACE FUNCTION record_audit_log(
  p_action TEXT,
  p_user_id UUID DEFAULT NULL,
  p_user_email TEXT DEFAULT NULL,
  p_user_role TEXT DEFAULT NULL,
  p_resource_type TEXT DEFAULT NULL,
  p_resource_id UUID DEFAULT NULL,
  p_changes JSONB DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_request_id TEXT DEFAULT NULL,
  p_merchant_id UUID DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO audit_logs (
    user_id, user_email, user_role,
    action, resource_type, resource_id,
    changes, metadata,
    ip_address, user_agent, request_id,
    merchant_id
  ) VALUES (
    p_user_id, p_user_email, p_user_role,
    p_action, p_resource_type, p_resource_id,
    p_changes, p_metadata,
    p_ip_address, p_user_agent, p_request_id,
    p_merchant_id
  )
  RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

-- View for recent audit activity (last 7 days)
CREATE OR REPLACE VIEW v_recent_audit_activity
WITH (security_invoker = true)
AS
SELECT
  al.id,
  al.action,
  al.user_email,
  al.user_role,
  al.resource_type,
  al.resource_id,
  al.changes,
  al.ip_address,
  al.created_at,
  al.merchant_id,
  -- Human-readable action description
  CASE
    WHEN al.action = 'auth.login' THEN 'Accesso effettuato'
    WHEN al.action = 'auth.logout' THEN 'Disconnessione'
    WHEN al.action = 'auth.login_failed' THEN 'Tentativo di accesso fallito'
    WHEN al.action = 'menu.item_create' THEN 'Nuovo piatto creato'
    WHEN al.action = 'menu.item_update' THEN 'Piatto modificato'
    WHEN al.action = 'menu.item_delete' THEN 'Piatto eliminato'
    WHEN al.action = 'order.status_change' THEN 'Stato ordine modificato'
    WHEN al.action = 'team.member_invite' THEN 'Nuovo membro invitato'
    WHEN al.action = 'team.role_change' THEN 'Ruolo modificato'
    WHEN al.action = 'settings.update' THEN 'Impostazioni modificate'
    ELSE al.action
  END AS action_description
FROM audit_logs al
WHERE al.created_at > NOW() - INTERVAL '7 days'
ORDER BY al.created_at DESC;

-- Grant execute on function
GRANT EXECUTE ON FUNCTION record_audit_log TO service_role;

COMMENT ON TABLE audit_logs IS 'Security audit trail for all sensitive actions';
COMMENT ON FUNCTION record_audit_log IS 'Record an audit log entry - call from backend services';
