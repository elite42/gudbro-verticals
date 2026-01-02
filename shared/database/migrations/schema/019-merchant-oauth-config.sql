-- =====================================================
-- Migration 019: Merchant OAuth Configuration
-- Date: 2025-12-12
-- Description: Store OAuth provider configuration per merchant
-- =====================================================

-- =====================================================
-- PART 1: MERCHANT OAUTH CONFIG TABLE
-- =====================================================
-- Stores OAuth provider credentials and settings per merchant
-- Allows each merchant to configure their own social login options

CREATE TABLE IF NOT EXISTS merchant_oauth_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Merchant reference
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Provider configurations (JSONB for flexibility)
  -- Structure: { "google": { enabled, client_id, client_secret }, ... }
  providers JSONB NOT NULL DEFAULT '{}',

  -- Email/Password settings
  email_auth_enabled BOOLEAN NOT NULL DEFAULT true,
  require_email_verification BOOLEAN NOT NULL DEFAULT true,

  -- Security settings
  allowed_domains TEXT[] DEFAULT '{}',  -- Empty = allow all domains
  blocked_domains TEXT[] DEFAULT '{}',

  -- Session settings
  session_duration_hours INTEGER DEFAULT 24,
  refresh_token_enabled BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Unique constraint: one config per merchant
  CONSTRAINT unique_merchant_oauth_config UNIQUE (merchant_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_oauth_config_merchant ON merchant_oauth_config(merchant_id);

-- =====================================================
-- PART 2: ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE merchant_oauth_config ENABLE ROW LEVEL SECURITY;

-- Merchants can view their own OAuth config
CREATE POLICY "Merchants can view own OAuth config"
  ON merchant_oauth_config FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM merchant_users mu
      WHERE mu.user_id = auth.uid()
      AND mu.merchant_id = merchant_oauth_config.merchant_id
    )
  );

-- Only admin users can modify OAuth config
CREATE POLICY "Admins can manage OAuth config"
  ON merchant_oauth_config FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM merchant_users mu
      WHERE mu.user_id = auth.uid()
      AND mu.merchant_id = merchant_oauth_config.merchant_id
      AND mu.role IN ('owner', 'admin')
    )
  );

-- =====================================================
-- PART 3: HELPER FUNCTIONS
-- =====================================================

-- Function to get enabled providers for a merchant
CREATE OR REPLACE FUNCTION get_enabled_oauth_providers(p_merchant_id UUID)
RETURNS TEXT[]
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_providers TEXT[];
  v_config JSONB;
BEGIN
  SELECT providers INTO v_config
  FROM merchant_oauth_config
  WHERE merchant_id = p_merchant_id;

  IF v_config IS NULL THEN
    RETURN ARRAY[]::TEXT[];
  END IF;

  -- Extract enabled provider names
  SELECT ARRAY_AGG(key)
  INTO v_providers
  FROM jsonb_each(v_config) AS x(key, value)
  WHERE (value->>'enabled')::boolean = true;

  RETURN COALESCE(v_providers, ARRAY[]::TEXT[]);
END;
$$;

-- Function to check if a specific provider is enabled
CREATE OR REPLACE FUNCTION is_oauth_provider_enabled(p_merchant_id UUID, p_provider TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM merchant_oauth_config
    WHERE merchant_id = p_merchant_id
    AND (providers->p_provider->>'enabled')::boolean = true
  );
END;
$$;

-- =====================================================
-- PART 4: UPDATED_AT TRIGGER
-- =====================================================

DROP TRIGGER IF EXISTS update_merchant_oauth_config_updated_at ON merchant_oauth_config;
CREATE TRIGGER update_merchant_oauth_config_updated_at
  BEFORE UPDATE ON merchant_oauth_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================
-- Table created:
--   - merchant_oauth_config (OAuth provider settings per merchant)
--
-- Functions created:
--   - get_enabled_oauth_providers(merchant_id) -> TEXT[]
--   - is_oauth_provider_enabled(merchant_id, provider) -> BOOLEAN
--
-- RLS Policies:
--   - Merchants can view their own config
--   - Only owner/admin can modify
-- =====================================================
