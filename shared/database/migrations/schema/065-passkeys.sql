-- ============================================================================
-- Migration: 065-passkeys
-- Description: WebAuthn/Passkey authentication for passwordless login
-- Author: Claude Code
-- Date: 2026-01-18
-- ============================================================================

-- ============================================================================
-- PASSKEY CREDENTIALS TABLE
-- Stores registered passkey credentials for each account
-- ============================================================================

CREATE TABLE IF NOT EXISTS passkeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Account relationship
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- WebAuthn credential data
    credential_id TEXT UNIQUE NOT NULL,      -- Base64URL encoded credential ID
    public_key TEXT NOT NULL,                 -- Base64URL encoded COSE public key
    counter BIGINT NOT NULL DEFAULT 0,        -- Signature counter for replay protection

    -- Device information
    device_type TEXT CHECK (device_type IN ('platform', 'cross-platform')),
    transports TEXT[],                        -- Array of transports: 'internal', 'hybrid', 'usb', 'ble', 'nfc'

    -- User-friendly identification
    friendly_name TEXT,                       -- e.g., "iPhone di Gianfranco", "MacBook Pro"

    -- Usage tracking
    last_used_at TIMESTAMPTZ,

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Constraints
    CONSTRAINT passkeys_credential_id_not_empty CHECK (credential_id <> ''),
    CONSTRAINT passkeys_public_key_not_empty CHECK (public_key <> '')
);

-- Index for fast lookups by account
CREATE INDEX idx_passkeys_account_id ON passkeys(account_id);

-- Index for credential lookup during authentication
CREATE INDEX idx_passkeys_credential_id ON passkeys(credential_id);

COMMENT ON TABLE passkeys IS 'WebAuthn/Passkey credentials for passwordless authentication';
COMMENT ON COLUMN passkeys.credential_id IS 'Base64URL encoded credential ID from WebAuthn registration';
COMMENT ON COLUMN passkeys.public_key IS 'Base64URL encoded COSE public key for signature verification';
COMMENT ON COLUMN passkeys.counter IS 'Signature counter - must increment on each use to prevent replay attacks';
COMMENT ON COLUMN passkeys.device_type IS 'platform = built-in (Face ID, Touch ID), cross-platform = external key';
COMMENT ON COLUMN passkeys.transports IS 'Available transports for this credential';

-- ============================================================================
-- PASSKEY CHALLENGES TABLE
-- Ephemeral storage for WebAuthn challenges (5 minute TTL)
-- ============================================================================

CREATE TABLE IF NOT EXISTS passkey_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Optional account reference (for registration, account is known; for auth, may use email)
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    email TEXT,

    -- Challenge data
    challenge TEXT NOT NULL,                  -- Base64URL encoded challenge

    -- Challenge type
    type TEXT NOT NULL CHECK (type IN ('registration', 'authentication')),

    -- Expiration (default 5 minutes)
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '5 minutes'),

    -- Timestamps
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Either account_id or email must be provided
    CONSTRAINT passkey_challenges_identity_required
        CHECK (account_id IS NOT NULL OR email IS NOT NULL)
);

-- Index for looking up challenges by account
CREATE INDEX idx_passkey_challenges_account_id ON passkey_challenges(account_id);

-- Index for looking up challenges by email (for passwordless auth)
CREATE INDEX idx_passkey_challenges_email ON passkey_challenges(email);

-- Index for cleanup of expired challenges
CREATE INDEX idx_passkey_challenges_expires_at ON passkey_challenges(expires_at);

COMMENT ON TABLE passkey_challenges IS 'Ephemeral WebAuthn challenges with 5 minute TTL';
COMMENT ON COLUMN passkey_challenges.challenge IS 'Base64URL encoded challenge for WebAuthn ceremony';
COMMENT ON COLUMN passkey_challenges.type IS 'registration = adding new passkey, authentication = logging in';

-- ============================================================================
-- CLEANUP FUNCTION FOR EXPIRED CHALLENGES
-- ============================================================================

CREATE OR REPLACE FUNCTION cleanup_expired_passkey_challenges()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM passkey_challenges
    WHERE expires_at < NOW();

    GET DIAGNOSTICS deleted_count = ROW_COUNT;

    RETURN deleted_count;
END;
$$;

COMMENT ON FUNCTION cleanup_expired_passkey_challenges IS 'Removes expired passkey challenges. Call periodically via cron.';

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE passkeys ENABLE ROW LEVEL SECURITY;
ALTER TABLE passkey_challenges ENABLE ROW LEVEL SECURITY;

-- Passkeys: Users can view and delete their own passkeys
CREATE POLICY "Users can view own passkeys"
    ON passkeys FOR SELECT
    USING (
        account_id IN (
            SELECT id FROM accounts WHERE auth_id = auth.uid()
        )
    );

CREATE POLICY "Users can delete own passkeys"
    ON passkeys FOR DELETE
    USING (
        account_id IN (
            SELECT id FROM accounts WHERE auth_id = auth.uid()
        )
    );

-- Passkeys: Service role can do everything (for registration/verification)
CREATE POLICY "Service role full access to passkeys"
    ON passkeys FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Challenges: Service role only (ephemeral, managed by API)
CREATE POLICY "Service role full access to challenges"
    ON passkey_challenges FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- HELPER VIEWS
-- ============================================================================

-- View for users to see their registered passkeys (without sensitive data)
CREATE OR REPLACE VIEW my_passkeys AS
SELECT
    p.id,
    p.friendly_name,
    p.device_type,
    p.transports,
    p.last_used_at,
    p.created_at
FROM passkeys p
JOIN accounts a ON p.account_id = a.id
WHERE a.auth_id = auth.uid();

COMMENT ON VIEW my_passkeys IS 'User-facing view of their registered passkeys (excludes credential data)';

-- ============================================================================
-- GRANTS
-- ============================================================================

-- Grant access to authenticated users for the view
GRANT SELECT ON my_passkeys TO authenticated;

-- ============================================================================
-- DONE
-- ============================================================================
