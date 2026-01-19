-- Migration: 067-two-factor-auth.sql
-- Description: Two-Factor Authentication (TOTP) for backoffice accounts
-- Date: 2026-01-19
-- Dependencies: accounts table (P5 unified accounts)

-- ============================================================================
-- TWO-FACTOR AUTHENTICATION (TOTP)
-- ============================================================================
-- Implements TOTP-based 2FA for backoffice admin/owner accounts
-- - Optional for all roles
-- - 7-day session TTL before re-verification required
-- - 8 one-time recovery codes
-- - Encrypted secret storage

-- ============================================================================
-- TOTP SECRETS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS account_totp_secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- TOTP secret (encrypted with AES-256-GCM)
  encrypted_secret TEXT NOT NULL,

  -- Status
  is_enabled BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,

  -- Recovery codes (8 one-time use codes, hashed)
  recovery_codes JSONB DEFAULT '[]'::jsonb,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  enabled_at TIMESTAMPTZ,
  last_used_at TIMESTAMPTZ,

  -- Only one TOTP config per account
  CONSTRAINT unique_account_totp UNIQUE (account_id)
);

-- ============================================================================
-- 2FA VERIFICATION SESSIONS
-- ============================================================================
-- Tracks when 2FA was last verified for a session
-- Used to enforce 7-day re-verification requirement

CREATE TABLE IF NOT EXISTS account_2fa_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

  -- Session identifier (links to Supabase auth session)
  session_id TEXT NOT NULL,

  -- Verification timestamp
  verified_at TIMESTAMPTZ DEFAULT NOW(),

  -- Expiration (7 days from verification)
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),

  -- Device info for audit
  user_agent TEXT,
  ip_address TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- One session record per account+session pair
  CONSTRAINT unique_account_session UNIQUE (account_id, session_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Fast lookup by account
CREATE INDEX IF NOT EXISTS idx_totp_account
ON account_totp_secrets(account_id);

-- Fast lookup for enabled 2FA accounts
CREATE INDEX IF NOT EXISTS idx_totp_enabled
ON account_totp_secrets(account_id)
WHERE is_enabled = true;

-- Session lookup and cleanup
CREATE INDEX IF NOT EXISTS idx_2fa_session_account
ON account_2fa_sessions(account_id);

CREATE INDEX IF NOT EXISTS idx_2fa_session_expires
ON account_2fa_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_2fa_session_lookup
ON account_2fa_sessions(account_id, session_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE account_totp_secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_2fa_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own TOTP config
CREATE POLICY "Users can view own TOTP" ON account_totp_secrets
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Service role has full access (for API routes)
CREATE POLICY "Service role full access TOTP" ON account_totp_secrets
  FOR ALL USING (auth.role() = 'service_role');

-- Users can view their own 2FA sessions
CREATE POLICY "Users can view own 2FA sessions" ON account_2fa_sessions
  FOR SELECT USING (
    account_id IN (
      SELECT id FROM accounts WHERE auth_id = auth.uid()
    )
  );

-- Service role has full access for session management
CREATE POLICY "Service role full access 2FA sessions" ON account_2fa_sessions
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check if 2FA is required for a login
CREATE OR REPLACE FUNCTION check_2fa_required(p_account_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_is_enabled BOOLEAN;
BEGIN
  SELECT is_enabled INTO v_is_enabled
  FROM account_totp_secrets
  WHERE account_id = p_account_id
    AND is_enabled = true
    AND is_verified = true;

  RETURN COALESCE(v_is_enabled, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Function to check if 2FA session is valid (within 7-day window)
CREATE OR REPLACE FUNCTION check_2fa_session_valid(
  p_account_id UUID,
  p_session_id TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  v_valid BOOLEAN;
BEGIN
  SELECT EXISTS(
    SELECT 1 FROM account_2fa_sessions
    WHERE account_id = p_account_id
      AND session_id = p_session_id
      AND expires_at > NOW()
  ) INTO v_valid;

  RETURN COALESCE(v_valid, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Function to clean up expired 2FA sessions
CREATE OR REPLACE FUNCTION cleanup_expired_2fa_sessions()
RETURNS INTEGER AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM account_2fa_sessions
  WHERE expires_at < NOW();

  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE account_totp_secrets IS 'TOTP secrets for two-factor authentication';
COMMENT ON COLUMN account_totp_secrets.encrypted_secret IS 'AES-256-GCM encrypted TOTP secret';
COMMENT ON COLUMN account_totp_secrets.recovery_codes IS 'Array of hashed one-time recovery codes';
COMMENT ON COLUMN account_totp_secrets.is_verified IS 'True after user successfully enters first TOTP code';

COMMENT ON TABLE account_2fa_sessions IS 'Tracks 2FA verification status per session';
COMMENT ON COLUMN account_2fa_sessions.session_id IS 'Supabase auth session ID';
COMMENT ON COLUMN account_2fa_sessions.expires_at IS '7-day expiration for 2FA verification';

COMMENT ON FUNCTION check_2fa_required IS 'Returns true if account has 2FA enabled and verified';
COMMENT ON FUNCTION check_2fa_session_valid IS 'Returns true if 2FA session is still valid (within 7 days)';
COMMENT ON FUNCTION cleanup_expired_2fa_sessions IS 'Removes expired 2FA session records';
