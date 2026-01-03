-- ============================================================================
-- P5 UNIFIED ACCOUNT: 006 - Unified Profile Functions
-- ============================================================================
-- Provides functions to retrieve and manage unified user profiles
-- across all roles (consumer, merchant, admin)
-- ============================================================================

-- ============================================================================
-- 1. GET FULL PROFILE WITH ALL ROLES
-- ============================================================================
-- Returns complete profile including all tenant associations

CREATE OR REPLACE FUNCTION get_unified_profile(p_account_id UUID)
RETURNS TABLE (
    -- Account info
    account_id UUID,
    auth_id UUID,
    email TEXT,
    display_name TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    phone TEXT,
    locale TEXT,
    timezone TEXT,
    account_created_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,

    -- Loyalty (from accounts table)
    total_points INTEGER,
    loyalty_tier TEXT,

    -- Roles summary
    is_consumer BOOLEAN,
    is_merchant BOOLEAN,
    is_admin BOOLEAN,
    is_contributor BOOLEAN,

    -- Tenants (as JSON array for merchant roles)
    tenants JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    WITH account_data AS (
        SELECT
            a.id,
            a.auth_id,
            a.email,
            a.display_name,
            a.first_name,
            a.last_name,
            a.avatar_url,
            a.phone,
            a.locale,
            a.timezone,
            a.created_at,
            a.last_login_at,
            a.total_points,
            a.loyalty_tier
        FROM accounts a
        WHERE a.id = p_account_id
    ),
    merchant_tenants AS (
        SELECT jsonb_agg(
            jsonb_build_object(
                'roleId', r.id,
                'tenantId', r.tenant_id,
                'tenantType', r.tenant_type,
                'permissions', r.permissions,
                'isActive', r.is_active,
                'isPrimary', r.is_primary,
                'joinedAt', r.created_at
            ) ORDER BY r.is_primary DESC, r.created_at ASC
        ) as tenants
        FROM account_roles r
        WHERE r.account_id = p_account_id
          AND r.role_type = 'merchant'
          AND r.is_active = true
    ),
    role_flags AS (
        SELECT
            bool_or(role_type = 'consumer') as has_consumer,
            bool_or(role_type = 'merchant') as has_merchant,
            bool_or(role_type = 'admin') as has_admin,
            bool_or(role_type = 'contributor') as has_contributor
        FROM account_roles
        WHERE account_id = p_account_id AND is_active = true
    )
    SELECT
        ad.id,
        ad.auth_id,
        ad.email,
        ad.display_name,
        ad.first_name,
        ad.last_name,
        ad.avatar_url,
        ad.phone,
        ad.locale,
        ad.timezone,
        ad.created_at,
        ad.last_login_at,
        ad.total_points,
        ad.loyalty_tier,
        COALESCE(rf.has_consumer, false),
        COALESCE(rf.has_merchant, false),
        COALESCE(rf.has_admin, false),
        COALESCE(rf.has_contributor, false),
        COALESCE(mt.tenants, '[]'::jsonb)
    FROM account_data ad
    CROSS JOIN role_flags rf
    LEFT JOIN merchant_tenants mt ON true;
END;
$$;

-- ============================================================================
-- 2. UPDATE PROFILE
-- ============================================================================
-- Updates account profile information

CREATE OR REPLACE FUNCTION update_profile(
    p_account_id UUID,
    p_display_name TEXT DEFAULT NULL,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_avatar_url TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_locale TEXT DEFAULT NULL,
    p_timezone TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE accounts
    SET
        display_name = COALESCE(p_display_name, display_name),
        first_name = COALESCE(p_first_name, first_name),
        last_name = COALESCE(p_last_name, last_name),
        avatar_url = COALESCE(p_avatar_url, avatar_url),
        phone = COALESCE(p_phone, phone),
        locale = COALESCE(p_locale, locale),
        timezone = COALESCE(p_timezone, timezone),
        updated_at = NOW()
    WHERE id = p_account_id;

    RETURN FOUND;
END;
$$;

-- ============================================================================
-- 3. SET PRIMARY ROLE
-- ============================================================================
-- Sets the primary role for a user (for switching between merchant tenants)

CREATE OR REPLACE FUNCTION set_primary_role(
    p_account_id UUID,
    p_role_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Verify the role belongs to this account
    IF NOT EXISTS (
        SELECT 1 FROM account_roles
        WHERE id = p_role_id
          AND account_id = p_account_id
          AND is_active = true
    ) THEN
        RETURN false;
    END IF;

    -- Clear all primary flags for this account
    UPDATE account_roles
    SET is_primary = false, updated_at = NOW()
    WHERE account_id = p_account_id;

    -- Set the new primary
    UPDATE account_roles
    SET is_primary = true, updated_at = NOW()
    WHERE id = p_role_id;

    RETURN true;
END;
$$;

-- ============================================================================
-- 4. GET ACCOUNT BY AUTH ID
-- ============================================================================
-- Helper to get account_id from Supabase auth.uid()

CREATE OR REPLACE FUNCTION get_account_by_auth_id(p_auth_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_account_id UUID;
BEGIN
    SELECT id INTO v_account_id
    FROM accounts
    WHERE auth_id = p_auth_id;

    RETURN v_account_id;
END;
$$;

-- ============================================================================
-- 5. RECORD LOGIN
-- ============================================================================
-- Updates last_login_at timestamp

CREATE OR REPLACE FUNCTION record_login(p_account_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE accounts
    SET last_login_at = NOW()
    WHERE id = p_account_id;
END;
$$;

-- ============================================================================
-- 6. GET USER ROLES
-- ============================================================================
-- Returns all active roles for a user

CREATE OR REPLACE FUNCTION get_user_roles(p_account_id UUID)
RETURNS TABLE (
    role_id UUID,
    role_type TEXT,
    tenant_id UUID,
    tenant_type TEXT,
    permissions JSONB,
    is_primary BOOLEAN,
    is_active BOOLEAN,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        r.id,
        r.role_type,
        r.tenant_id,
        r.tenant_type,
        r.permissions,
        r.is_primary,
        r.is_active,
        r.created_at
    FROM account_roles r
    WHERE r.account_id = p_account_id
      AND r.is_active = true
    ORDER BY r.is_primary DESC, r.created_at ASC;
END;
$$;

-- ============================================================================
-- 7. UPDATE ROLE PERMISSIONS
-- ============================================================================
-- Updates permissions for a specific role (admin function)

CREATE OR REPLACE FUNCTION update_role_permissions(
    p_role_id UUID,
    p_permissions JSONB
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE account_roles
    SET
        permissions = p_permissions,
        updated_at = NOW()
    WHERE id = p_role_id;

    RETURN FOUND;
END;
$$;

-- ============================================================================
-- 8. GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION get_unified_profile(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_profile(UUID, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION set_primary_role(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_account_by_auth_id(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION record_login(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_roles(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_role_permissions(UUID, JSONB) TO authenticated;

-- ============================================================================
-- COMPLETE
-- ============================================================================
