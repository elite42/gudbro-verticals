-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 4: STAFF INVITATIONS
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: Staff invitation and role management for merchants
-- ============================================================================

-- ============================================================================
-- 1. STAFF INVITATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS staff_invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who is inviting
    inviter_account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Organization context
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
    location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

    -- Invitee info
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,

    -- Role assignment
    role_title TEXT NOT NULL DEFAULT 'staff',  -- Display title: 'Manager', 'Chef', 'Waiter', etc.
    permissions JSONB NOT NULL DEFAULT '{}',
    /*
    {
        "menu_view": true,
        "menu_edit": false,
        "orders_view": true,
        "orders_manage": true,
        "analytics_view": false,
        "staff_manage": false,
        "billing_manage": false
    }
    */

    -- Invitation token
    invite_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),

    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Invitation sent, waiting response
        'accepted',     -- Accepted, account/role created
        'declined',     -- Explicitly declined
        'expired',      -- Expired without response
        'revoked'       -- Revoked by inviter
    )),

    -- Response tracking
    accepted_account_id UUID REFERENCES accounts(id),
    responded_at TIMESTAMPTZ,
    decline_reason TEXT,

    -- Expiration
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),

    -- Notification tracking
    email_sent_at TIMESTAMPTZ,
    reminder_sent_at TIMESTAMPTZ,

    -- Metadata
    message TEXT,  -- Personal message from inviter
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_staff_invites_inviter ON staff_invitations(inviter_account_id);
CREATE INDEX IF NOT EXISTS idx_staff_invites_org ON staff_invitations(organization_id);
CREATE INDEX IF NOT EXISTS idx_staff_invites_email ON staff_invitations(email);
CREATE INDEX IF NOT EXISTS idx_staff_invites_token ON staff_invitations(invite_token);
CREATE INDEX IF NOT EXISTS idx_staff_invites_status ON staff_invitations(status);
CREATE INDEX IF NOT EXISTS idx_staff_invites_pending ON staff_invitations(status, expires_at)
    WHERE status = 'pending';

-- Unique partial index to prevent duplicate pending invites (same org + email)
CREATE UNIQUE INDEX IF NOT EXISTS idx_staff_invites_unique_pending
    ON staff_invitations(organization_id, email)
    WHERE status = 'pending';

-- ============================================================================
-- 2. UPDATE TRIGGER
-- ============================================================================

CREATE TRIGGER update_staff_invitations_updated_at
    BEFORE UPDATE ON staff_invitations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. PREDEFINED ROLE TEMPLATES
-- ============================================================================

CREATE TABLE IF NOT EXISTS role_templates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    permissions JSONB NOT NULL,
    display_order INTEGER DEFAULT 0
);

INSERT INTO role_templates (id, name, description, permissions, display_order) VALUES
('owner', 'Owner', 'Full access to everything', '{
    "menu_view": true,
    "menu_edit": true,
    "orders_view": true,
    "orders_manage": true,
    "analytics_view": true,
    "staff_manage": true,
    "billing_manage": true,
    "settings_manage": true,
    "is_owner": true
}', 1),
('manager', 'Manager', 'Manage daily operations', '{
    "menu_view": true,
    "menu_edit": true,
    "orders_view": true,
    "orders_manage": true,
    "analytics_view": true,
    "staff_manage": true,
    "billing_manage": false,
    "settings_manage": false
}', 2),
('chef', 'Chef', 'Kitchen and menu management', '{
    "menu_view": true,
    "menu_edit": true,
    "orders_view": true,
    "orders_manage": false,
    "analytics_view": false,
    "staff_manage": false,
    "billing_manage": false
}', 3),
('waiter', 'Waiter', 'Order management', '{
    "menu_view": true,
    "menu_edit": false,
    "orders_view": true,
    "orders_manage": true,
    "analytics_view": false,
    "staff_manage": false,
    "billing_manage": false
}', 4),
('viewer', 'Viewer', 'Read-only access', '{
    "menu_view": true,
    "menu_edit": false,
    "orders_view": true,
    "orders_manage": false,
    "analytics_view": true,
    "staff_manage": false,
    "billing_manage": false
}', 5)
ON CONFLICT (id) DO UPDATE SET
    permissions = EXCLUDED.permissions,
    description = EXCLUDED.description;

-- ============================================================================
-- 4. INVITE STAFF FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION invite_staff_member(
    p_inviter_account_id UUID,
    p_organization_id UUID,
    p_email TEXT,
    p_role_title TEXT DEFAULT 'staff',
    p_permissions JSONB DEFAULT '{}',
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_message TEXT DEFAULT NULL,
    p_brand_id UUID DEFAULT NULL,
    p_location_id UUID DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    invitation_id UUID,
    invite_token TEXT,
    error_message TEXT
) AS $$
DECLARE
    v_invitation_id UUID;
    v_invite_token TEXT;
    v_existing_account_id UUID;
    v_existing_role_id UUID;
BEGIN
    -- Check if inviter has permission to invite
    IF NOT EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = p_inviter_account_id
          AND ar.tenant_id = p_organization_id
          AND ar.is_active = TRUE
          AND (ar.permissions->>'staff_manage')::boolean = TRUE
    ) THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'No permission to invite staff'::TEXT;
        RETURN;
    END IF;

    -- Check if email already has active role in this org
    SELECT a.id INTO v_existing_account_id
    FROM accounts a
    WHERE a.email = LOWER(TRIM(p_email));

    IF v_existing_account_id IS NOT NULL THEN
        SELECT ar.id INTO v_existing_role_id
        FROM account_roles ar
        WHERE ar.account_id = v_existing_account_id
          AND ar.tenant_id = p_organization_id
          AND ar.is_active = TRUE;

        IF v_existing_role_id IS NOT NULL THEN
            RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'User already has access to this organization'::TEXT;
            RETURN;
        END IF;
    END IF;

    -- Check for existing pending invitation
    IF EXISTS (
        SELECT 1 FROM staff_invitations
        WHERE organization_id = p_organization_id
          AND email = LOWER(TRIM(p_email))
          AND status = 'pending'
          AND expires_at > NOW()
    ) THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TEXT, 'Pending invitation already exists for this email'::TEXT;
        RETURN;
    END IF;

    -- Generate token
    v_invite_token := encode(gen_random_bytes(32), 'hex');

    -- Create invitation
    INSERT INTO staff_invitations (
        inviter_account_id,
        organization_id,
        brand_id,
        location_id,
        email,
        first_name,
        last_name,
        role_title,
        permissions,
        invite_token,
        message
    ) VALUES (
        p_inviter_account_id,
        p_organization_id,
        p_brand_id,
        p_location_id,
        LOWER(TRIM(p_email)),
        p_first_name,
        p_last_name,
        p_role_title,
        p_permissions,
        v_invite_token,
        p_message
    )
    RETURNING id INTO v_invitation_id;

    RETURN QUERY SELECT TRUE, v_invitation_id, v_invite_token, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 5. ACCEPT INVITATION FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION accept_staff_invitation(
    p_invite_token TEXT,
    p_auth_id UUID DEFAULT NULL
)
RETURNS TABLE (
    success BOOLEAN,
    account_id UUID,
    organization_id UUID,
    role_id UUID,
    error_message TEXT
) AS $$
DECLARE
    v_invitation staff_invitations%ROWTYPE;
    v_account_id UUID;
    v_role_id UUID;
BEGIN
    -- Get invitation
    SELECT * INTO v_invitation
    FROM staff_invitations
    WHERE invite_token = p_invite_token
      AND status = 'pending'
      AND expires_at > NOW();

    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID, NULL::UUID, 'Invalid or expired invitation'::TEXT;
        RETURN;
    END IF;

    -- Check if account exists
    SELECT id INTO v_account_id
    FROM accounts
    WHERE email = v_invitation.email;

    -- Create account if doesn't exist
    IF v_account_id IS NULL THEN
        INSERT INTO accounts (
            email,
            first_name,
            last_name,
            auth_id
        ) VALUES (
            v_invitation.email,
            v_invitation.first_name,
            v_invitation.last_name,
            p_auth_id
        )
        RETURNING id INTO v_account_id;

        -- Create consumer role
        INSERT INTO account_roles (account_id, role_type, is_primary)
        VALUES (v_account_id, 'consumer', FALSE);

        -- Create health profile
        INSERT INTO health_profiles (account_id) VALUES (v_account_id);
    ELSE
        -- Update auth_id if provided and not set
        IF p_auth_id IS NOT NULL THEN
            UPDATE accounts
            SET auth_id = COALESCE(auth_id, p_auth_id)
            WHERE id = v_account_id;
        END IF;
    END IF;

    -- Create merchant role
    INSERT INTO account_roles (
        account_id,
        role_type,
        tenant_id,
        tenant_type,
        permissions,
        invited_by_account_id,
        invited_at,
        accepted_at,
        is_primary
    ) VALUES (
        v_account_id,
        'merchant',
        v_invitation.organization_id,
        'organization',
        v_invitation.permissions,
        v_invitation.inviter_account_id,
        v_invitation.created_at,
        NOW(),
        FALSE  -- Not primary, they might have other roles
    )
    RETURNING id INTO v_role_id;

    -- Update invitation status
    UPDATE staff_invitations
    SET
        status = 'accepted',
        accepted_account_id = v_account_id,
        responded_at = NOW()
    WHERE id = v_invitation.id;

    -- Award points to inviter for successful invite
    PERFORM award_loyalty_points(
        v_invitation.inviter_account_id,
        25,
        'merchant',
        'referral_merchant',
        'Staff member joined: ' || v_invitation.email
    );

    RETURN QUERY SELECT TRUE, v_account_id, v_invitation.organization_id, v_role_id, NULL::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. DECLINE INVITATION FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION decline_staff_invitation(
    p_invite_token TEXT,
    p_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE staff_invitations
    SET
        status = 'declined',
        responded_at = NOW(),
        decline_reason = p_reason
    WHERE invite_token = p_invite_token
      AND status = 'pending';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. REVOKE INVITATION FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION revoke_staff_invitation(
    p_invitation_id UUID,
    p_revoker_account_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check permission
    IF NOT EXISTS (
        SELECT 1 FROM staff_invitations si
        JOIN account_roles ar ON ar.tenant_id = si.organization_id
        WHERE si.id = p_invitation_id
          AND ar.account_id = p_revoker_account_id
          AND ar.is_active = TRUE
          AND (ar.permissions->>'staff_manage')::boolean = TRUE
    ) THEN
        RETURN FALSE;
    END IF;

    UPDATE staff_invitations
    SET status = 'revoked', responded_at = NOW()
    WHERE id = p_invitation_id
      AND status = 'pending';

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 8. REMOVE STAFF MEMBER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION remove_staff_member(
    p_role_id UUID,
    p_remover_account_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_org_id UUID;
    v_target_account_id UUID;
BEGIN
    -- Get role info
    SELECT tenant_id, account_id INTO v_org_id, v_target_account_id
    FROM account_roles
    WHERE id = p_role_id AND role_type = 'merchant';

    IF v_org_id IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Check permission (must be owner or have staff_manage)
    IF NOT EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = p_remover_account_id
          AND ar.tenant_id = v_org_id
          AND ar.is_active = TRUE
          AND (
              (ar.permissions->>'is_owner')::boolean = TRUE
              OR (ar.permissions->>'staff_manage')::boolean = TRUE
          )
    ) THEN
        RETURN FALSE;
    END IF;

    -- Cannot remove yourself if you're the owner
    IF p_remover_account_id = v_target_account_id THEN
        IF EXISTS (
            SELECT 1 FROM account_roles
            WHERE id = p_role_id
              AND (permissions->>'is_owner')::boolean = TRUE
        ) THEN
            RETURN FALSE;  -- Owners cannot remove themselves
        END IF;
    END IF;

    -- Deactivate role (soft delete)
    UPDATE account_roles
    SET is_active = FALSE, updated_at = NOW()
    WHERE id = p_role_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 9. UPDATE STAFF PERMISSIONS FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_staff_permissions(
    p_role_id UUID,
    p_updater_account_id UUID,
    p_new_permissions JSONB,
    p_new_title TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_org_id UUID;
BEGIN
    -- Get org from role
    SELECT tenant_id INTO v_org_id
    FROM account_roles
    WHERE id = p_role_id AND role_type = 'merchant';

    IF v_org_id IS NULL THEN
        RETURN FALSE;
    END IF;

    -- Check permission
    IF NOT EXISTS (
        SELECT 1 FROM account_roles ar
        WHERE ar.account_id = p_updater_account_id
          AND ar.tenant_id = v_org_id
          AND ar.is_active = TRUE
          AND (
              (ar.permissions->>'is_owner')::boolean = TRUE
              OR (ar.permissions->>'staff_manage')::boolean = TRUE
          )
    ) THEN
        RETURN FALSE;
    END IF;

    -- Update permissions
    UPDATE account_roles
    SET
        permissions = p_new_permissions,
        updated_at = NOW()
    WHERE id = p_role_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 10. VIEWS
-- ============================================================================

-- Staff list for an organization
CREATE OR REPLACE VIEW v_organization_staff AS
SELECT
    ar.id AS role_id,
    ar.account_id,
    ar.tenant_id AS organization_id,
    ar.permissions,
    ar.is_active,
    ar.invited_by_account_id,
    ar.invited_at,
    ar.accepted_at,
    ar.created_at,
    a.email,
    a.first_name,
    a.last_name,
    a.display_name,
    a.avatar_url,
    a.last_login_at,
    inviter.email AS inviter_email,
    inviter.display_name AS inviter_name
FROM account_roles ar
JOIN accounts a ON a.id = ar.account_id
LEFT JOIN accounts inviter ON inviter.id = ar.invited_by_account_id
WHERE ar.role_type = 'merchant'
  AND ar.is_active = TRUE;

-- Pending invitations for an organization
CREATE OR REPLACE VIEW v_pending_staff_invitations AS
SELECT
    si.id,
    si.organization_id,
    si.brand_id,
    si.location_id,
    si.email,
    si.first_name,
    si.last_name,
    si.role_title,
    si.permissions,
    si.status,
    si.created_at,
    si.expires_at,
    si.message,
    inviter.email AS inviter_email,
    inviter.display_name AS inviter_name,
    o.name AS organization_name
FROM staff_invitations si
JOIN accounts inviter ON inviter.id = si.inviter_account_id
JOIN organizations o ON o.id = si.organization_id
WHERE si.status = 'pending'
  AND si.expires_at > NOW();

-- ============================================================================
-- 11. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE staff_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_templates ENABLE ROW LEVEL SECURITY;

-- Staff invitations: visible to org members with staff_manage permission
CREATE POLICY "Staff invitations visible to managers" ON staff_invitations
    FOR SELECT USING (
        organization_id IN (
            SELECT ar.tenant_id FROM account_roles ar
            JOIN accounts a ON a.id = ar.account_id
            WHERE a.auth_id = auth.uid()
              AND ar.is_active = TRUE
              AND (ar.permissions->>'staff_manage')::boolean = TRUE
        )
    );

-- Invitees can see their own invitations
CREATE POLICY "Invitees can view own invitations" ON staff_invitations
    FOR SELECT USING (
        email = (SELECT email FROM accounts WHERE auth_id = auth.uid())
    );

-- Role templates are public read
CREATE POLICY "Role templates are public" ON role_templates
    FOR SELECT USING (TRUE);

-- Service role full access
CREATE POLICY "Service role full access invitations" ON staff_invitations
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access templates" ON role_templates
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 12. CLEANUP EXPIRED INVITATIONS
-- ============================================================================

CREATE OR REPLACE FUNCTION cleanup_expired_staff_invitations()
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    UPDATE staff_invitations
    SET status = 'expired'
    WHERE status = 'pending'
      AND expires_at < NOW();

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 13. COMMENTS
-- ============================================================================

COMMENT ON TABLE staff_invitations IS 'Tracks staff member invitations for organizations';
COMMENT ON TABLE role_templates IS 'Predefined role permission templates';
COMMENT ON FUNCTION invite_staff_member IS 'Creates a new staff invitation';
COMMENT ON FUNCTION accept_staff_invitation IS 'Accepts invitation and creates account/role';
COMMENT ON FUNCTION decline_staff_invitation IS 'Declines an invitation';
COMMENT ON FUNCTION revoke_staff_invitation IS 'Revokes a pending invitation';
COMMENT ON FUNCTION remove_staff_member IS 'Removes staff access (soft delete)';
COMMENT ON FUNCTION update_staff_permissions IS 'Updates staff member permissions';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
