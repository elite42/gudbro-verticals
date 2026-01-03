-- ============================================================================
-- P5 UNIFIED ACCOUNT: 007 - Auth Integration
-- ============================================================================
-- Integrates the accounts system with Supabase Auth
-- Creates triggers for automatic account creation and sync
-- ============================================================================

-- ============================================================================
-- 1. FUNCTION: Handle New Auth User
-- ============================================================================
-- Called when a new user signs up via Supabase Auth
-- Creates a corresponding account and consumer role

CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_account_id UUID;
    v_display_name TEXT;
    v_first_name TEXT;
    v_last_name TEXT;
BEGIN
    -- Extract name from metadata if available
    v_first_name := NEW.raw_user_meta_data->>'first_name';
    v_last_name := NEW.raw_user_meta_data->>'last_name';
    v_display_name := NEW.raw_user_meta_data->>'display_name';

    -- Fallback display name from email
    IF v_display_name IS NULL THEN
        v_display_name := SPLIT_PART(NEW.email, '@', 1);
    END IF;

    -- Check if account already exists (e.g., from invitation flow)
    SELECT id INTO v_account_id
    FROM accounts
    WHERE email = LOWER(NEW.email);

    IF v_account_id IS NOT NULL THEN
        -- Link existing account to auth user
        UPDATE accounts
        SET
            auth_id = NEW.id,
            email_verified = COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE),
            phone = COALESCE(NEW.phone, phone),
            phone_verified = COALESCE(NEW.phone_confirmed_at IS NOT NULL, FALSE),
            first_name = COALESCE(v_first_name, first_name),
            last_name = COALESCE(v_last_name, last_name),
            display_name = COALESCE(v_display_name, display_name),
            avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', avatar_url),
            last_login_at = NOW(),
            updated_at = NOW()
        WHERE id = v_account_id;
    ELSE
        -- Create new account
        INSERT INTO accounts (
            auth_id,
            email,
            email_verified,
            phone,
            phone_verified,
            first_name,
            last_name,
            display_name,
            avatar_url,
            locale,
            last_login_at
        ) VALUES (
            NEW.id,
            LOWER(NEW.email),
            COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE),
            NEW.phone,
            COALESCE(NEW.phone_confirmed_at IS NOT NULL, FALSE),
            v_first_name,
            v_last_name,
            v_display_name,
            NEW.raw_user_meta_data->>'avatar_url',
            COALESCE(NEW.raw_user_meta_data->>'locale', 'it'),
            NOW()
        )
        RETURNING id INTO v_account_id;

        -- Create default consumer role
        INSERT INTO account_roles (
            account_id,
            role_type,
            is_primary,
            is_active,
            permissions
        ) VALUES (
            v_account_id,
            'consumer',
            TRUE,
            TRUE,
            '{}'::jsonb
        );

        -- Award signup bonus points
        UPDATE accounts
        SET
            total_points = 50,
            consumer_points = 50
        WHERE id = v_account_id;
    END IF;

    RETURN NEW;
END;
$$;

-- ============================================================================
-- 2. TRIGGER: On Auth User Created
-- ============================================================================
-- Note: This trigger is on auth.users which requires special permissions

-- Drop if exists (for re-running)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_auth_user();

-- ============================================================================
-- 3. FUNCTION: Handle Auth User Updated
-- ============================================================================
-- Syncs changes from auth.users to accounts

CREATE OR REPLACE FUNCTION handle_auth_user_updated()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Sync relevant fields
    UPDATE accounts
    SET
        email = LOWER(NEW.email),
        email_verified = COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE),
        phone = NEW.phone,
        phone_verified = COALESCE(NEW.phone_confirmed_at IS NOT NULL, FALSE),
        avatar_url = COALESCE(NEW.raw_user_meta_data->>'avatar_url', avatar_url),
        updated_at = NOW()
    WHERE auth_id = NEW.id;

    RETURN NEW;
END;
$$;

-- Drop if exists
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_auth_user_updated();

-- ============================================================================
-- 4. FUNCTION: Handle Auth User Deleted
-- ============================================================================
-- Deactivates account when auth user is deleted (soft delete)

CREATE OR REPLACE FUNCTION handle_auth_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Soft delete: deactivate account and all roles
    UPDATE accounts
    SET
        is_active = FALSE,
        updated_at = NOW()
    WHERE auth_id = OLD.id;

    UPDATE account_roles
    SET
        is_active = FALSE,
        updated_at = NOW()
    WHERE account_id IN (
        SELECT id FROM accounts WHERE auth_id = OLD.id
    );

    RETURN OLD;
END;
$$;

-- Drop if exists
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_deleted
    BEFORE DELETE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_auth_user_deleted();

-- ============================================================================
-- 5. FUNCTION: Get Current Account
-- ============================================================================
-- Helper to get account for current authenticated user

CREATE OR REPLACE FUNCTION get_current_account()
RETURNS TABLE (
    account_id UUID,
    email TEXT,
    display_name TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    total_points INTEGER,
    loyalty_tier TEXT,
    is_premium BOOLEAN,
    locale TEXT,
    timezone TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        a.id,
        a.email,
        a.display_name,
        a.first_name,
        a.last_name,
        a.avatar_url,
        a.total_points,
        a.loyalty_tier,
        a.is_premium,
        a.locale,
        a.timezone
    FROM accounts a
    WHERE a.auth_id = auth.uid()
      AND a.is_active = TRUE;
END;
$$;

-- ============================================================================
-- 6. FUNCTION: Get Current Roles
-- ============================================================================
-- Helper to get all roles for current authenticated user

CREATE OR REPLACE FUNCTION get_current_roles()
RETURNS TABLE (
    role_id UUID,
    role_type TEXT,
    tenant_id UUID,
    tenant_type TEXT,
    permissions JSONB,
    is_primary BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_account_id UUID;
BEGIN
    -- Get account ID for current user
    SELECT id INTO v_account_id
    FROM accounts
    WHERE auth_id = auth.uid()
      AND is_active = TRUE;

    IF v_account_id IS NULL THEN
        RETURN;
    END IF;

    RETURN QUERY
    SELECT
        r.id,
        r.role_type,
        r.tenant_id,
        r.tenant_type,
        r.permissions,
        r.is_primary
    FROM account_roles r
    WHERE r.account_id = v_account_id
      AND r.is_active = TRUE
    ORDER BY r.is_primary DESC, r.created_at ASC;
END;
$$;

-- ============================================================================
-- 7. FUNCTION: Check Permission
-- ============================================================================
-- Check if current user has a specific permission

CREATE OR REPLACE FUNCTION has_permission(
    p_permission TEXT,
    p_tenant_id UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_account_id UUID;
    v_has_permission BOOLEAN := FALSE;
BEGIN
    -- Get account ID for current user
    SELECT id INTO v_account_id
    FROM accounts
    WHERE auth_id = auth.uid()
      AND is_active = TRUE;

    IF v_account_id IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Check for permission across roles
    SELECT EXISTS (
        SELECT 1
        FROM account_roles r
        WHERE r.account_id = v_account_id
          AND r.is_active = TRUE
          AND (p_tenant_id IS NULL OR r.tenant_id = p_tenant_id)
          AND (r.permissions->>p_permission)::boolean = TRUE
    ) INTO v_has_permission;

    RETURN v_has_permission;
END;
$$;

-- ============================================================================
-- 8. FUNCTION: Record Login (Auto)
-- ============================================================================
-- Call this from your app after successful login

CREATE OR REPLACE FUNCTION record_user_login()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE accounts
    SET last_login_at = NOW()
    WHERE auth_id = auth.uid();
END;
$$;

-- ============================================================================
-- 9. RLS POLICIES FOR ACCOUNTS
-- ============================================================================

-- Enable RLS
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_roles ENABLE ROW LEVEL SECURITY;

-- Accounts: Users can read their own account
DROP POLICY IF EXISTS accounts_select_own ON accounts;
CREATE POLICY accounts_select_own ON accounts
    FOR SELECT
    USING (auth_id = auth.uid());

-- Accounts: Users can update their own account
DROP POLICY IF EXISTS accounts_update_own ON accounts;
CREATE POLICY accounts_update_own ON accounts
    FOR UPDATE
    USING (auth_id = auth.uid())
    WITH CHECK (auth_id = auth.uid());

-- Account Roles: Users can read their own roles
DROP POLICY IF EXISTS account_roles_select_own ON account_roles;
CREATE POLICY account_roles_select_own ON account_roles
    FOR SELECT
    USING (
        account_id IN (
            SELECT id FROM accounts WHERE auth_id = auth.uid()
        )
    );

-- Account Roles: Service role can manage all (for admin functions)
DROP POLICY IF EXISTS account_roles_service ON account_roles;
CREATE POLICY account_roles_service ON account_roles
    FOR ALL
    USING (auth.role() = 'service_role');

-- ============================================================================
-- 10. GRANT PERMISSIONS
-- ============================================================================

GRANT EXECUTE ON FUNCTION get_current_account() TO authenticated;
GRANT EXECUTE ON FUNCTION get_current_roles() TO authenticated;
GRANT EXECUTE ON FUNCTION has_permission(TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION record_user_login() TO authenticated;

-- ============================================================================
-- 11. BACKFILL: Link Existing Auth Users
-- ============================================================================
-- Run this once to link any existing auth users to accounts

DO $$
DECLARE
    r RECORD;
    v_account_id UUID;
BEGIN
    -- Loop through auth users without linked accounts
    FOR r IN
        SELECT au.id, au.email, au.phone, au.raw_user_meta_data,
               au.email_confirmed_at, au.phone_confirmed_at
        FROM auth.users au
        LEFT JOIN accounts a ON a.auth_id = au.id
        WHERE a.id IS NULL
    LOOP
        -- Check if account exists by email
        SELECT id INTO v_account_id
        FROM accounts
        WHERE email = LOWER(r.email);

        IF v_account_id IS NOT NULL THEN
            -- Link existing account
            UPDATE accounts
            SET auth_id = r.id,
                email_verified = r.email_confirmed_at IS NOT NULL,
                updated_at = NOW()
            WHERE id = v_account_id;
        ELSE
            -- Create new account
            INSERT INTO accounts (
                auth_id,
                email,
                email_verified,
                phone,
                phone_verified,
                display_name,
                first_name,
                last_name,
                avatar_url,
                locale
            ) VALUES (
                r.id,
                LOWER(r.email),
                r.email_confirmed_at IS NOT NULL,
                r.phone,
                r.phone_confirmed_at IS NOT NULL,
                COALESCE(r.raw_user_meta_data->>'display_name', SPLIT_PART(r.email, '@', 1)),
                r.raw_user_meta_data->>'first_name',
                r.raw_user_meta_data->>'last_name',
                r.raw_user_meta_data->>'avatar_url',
                COALESCE(r.raw_user_meta_data->>'locale', 'it')
            )
            RETURNING id INTO v_account_id;

            -- Create consumer role
            INSERT INTO account_roles (account_id, role_type, is_primary, is_active)
            VALUES (v_account_id, 'consumer', TRUE, TRUE);
        END IF;
    END LOOP;

    RAISE NOTICE 'Backfill complete';
END;
$$;

-- ============================================================================
-- COMPLETE
-- ============================================================================
