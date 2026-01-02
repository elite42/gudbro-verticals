-- ============================================================================
-- P5 UNIFIED ACCOUNT SYSTEM - Phase 1: Foundation
-- Migration: 001-accounts-foundation.sql
-- Created: 2026-01-02
-- ============================================================================
--
-- OVERVIEW:
-- This migration creates the foundation for the Unified Account System.
-- One account can have multiple roles (Consumer, Merchant, Admin).
--
-- TABLES CREATED:
--   1. accounts          - Main user account (one per person)
--   2. account_roles     - Roles associated with account (can have multiple)
--   3. health_profiles   - 5 Dimensions health data (separate for GDPR)
--   4. referrals         - Bidirectional referral tracking
--
-- BACKWARD COMPATIBILITY:
--   - merchant_users table remains untouched
--   - Future migration will link merchant_users.email → accounts.email
--
-- ============================================================================

-- ============================================================================
-- 1. ACCOUNTS - Main user account (ONE per person)
-- ============================================================================

CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Authentication (links to Supabase Auth)
    auth_id UUID UNIQUE,                    -- auth.users.id from Supabase
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,

    -- Profile
    first_name TEXT,
    last_name TEXT,
    display_name TEXT,                      -- Computed or custom
    avatar_url TEXT,
    locale TEXT DEFAULT 'en',               -- Preferred language
    timezone TEXT DEFAULT 'UTC',

    -- Loyalty Points (Unified across all roles)
    total_points INTEGER DEFAULT 0 NOT NULL,
    consumer_points INTEGER DEFAULT 0 NOT NULL,
    merchant_points INTEGER DEFAULT 0 NOT NULL,
    contributor_points INTEGER DEFAULT 0 NOT NULL,
    loyalty_tier TEXT DEFAULT 'bronze' CHECK (loyalty_tier IN ('bronze', 'silver', 'gold', 'platinum', 'founding')),

    -- Premium Status
    is_premium BOOLEAN DEFAULT FALSE NOT NULL,
    premium_type TEXT CHECK (premium_type IN ('consumer', 'merchant', 'both', NULL)),
    premium_started_at TIMESTAMPTZ,
    premium_expires_at TIMESTAMPTZ,

    -- Referral
    referral_code TEXT UNIQUE,              -- Auto-generated unique code
    referred_by_account_id UUID REFERENCES accounts(id),

    -- Status
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    last_login_at TIMESTAMPTZ,

    -- Metadata
    metadata JSONB DEFAULT '{}',            -- Extensible metadata
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_accounts_email ON accounts(email);
CREATE INDEX IF NOT EXISTS idx_accounts_auth_id ON accounts(auth_id);
CREATE INDEX IF NOT EXISTS idx_accounts_referral_code ON accounts(referral_code);
CREATE INDEX IF NOT EXISTS idx_accounts_referred_by ON accounts(referred_by_account_id);
CREATE INDEX IF NOT EXISTS idx_accounts_loyalty_tier ON accounts(loyalty_tier);
CREATE INDEX IF NOT EXISTS idx_accounts_active ON accounts(is_active) WHERE is_active = TRUE;

-- Generate referral code on insert
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referral_code IS NULL THEN
        -- Generate unique 8-char alphanumeric code
        NEW.referral_code := UPPER(SUBSTRING(MD5(NEW.id::TEXT || NOW()::TEXT) FROM 1 FOR 8));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_generate_referral_code
    BEFORE INSERT ON accounts
    FOR EACH ROW EXECUTE FUNCTION generate_referral_code();

-- ============================================================================
-- 2. ACCOUNT_ROLES - Roles associated with account (can have MULTIPLE)
-- ============================================================================

CREATE TABLE IF NOT EXISTS account_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Role Type
    role_type TEXT NOT NULL CHECK (role_type IN ('consumer', 'merchant', 'admin', 'contributor')),

    -- For merchant role: link to tenant
    tenant_id UUID,                         -- References merchants(id) when role_type = 'merchant'
    tenant_type TEXT CHECK (tenant_type IN ('merchant', 'organization', 'brand', NULL)),

    -- Permissions (granular)
    permissions JSONB DEFAULT '{}',
    /*
    Example permissions:
    {
        "menu_edit": true,
        "orders_view": true,
        "orders_manage": true,
        "analytics_view": true,
        "staff_manage": false,
        "billing_manage": false
    }
    */

    -- Role Settings
    is_primary BOOLEAN DEFAULT FALSE NOT NULL,  -- Default role when logging in
    is_active BOOLEAN DEFAULT TRUE NOT NULL,

    -- Invitation tracking (for merchant invites)
    invited_by_account_id UUID REFERENCES accounts(id),
    invited_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Constraints
    UNIQUE(account_id, role_type, tenant_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_account_roles_account ON account_roles(account_id);
CREATE INDEX IF NOT EXISTS idx_account_roles_type ON account_roles(role_type);
CREATE INDEX IF NOT EXISTS idx_account_roles_tenant ON account_roles(tenant_id) WHERE tenant_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_account_roles_primary ON account_roles(account_id, is_primary) WHERE is_primary = TRUE;
CREATE INDEX IF NOT EXISTS idx_account_roles_active ON account_roles(account_id, is_active) WHERE is_active = TRUE;

-- Ensure only one primary role per account
CREATE OR REPLACE FUNCTION ensure_single_primary_role()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_primary = TRUE THEN
        UPDATE account_roles
        SET is_primary = FALSE
        WHERE account_id = NEW.account_id
          AND id != NEW.id
          AND is_primary = TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_ensure_single_primary_role
    BEFORE INSERT OR UPDATE ON account_roles
    FOR EACH ROW EXECUTE FUNCTION ensure_single_primary_role();

-- ============================================================================
-- 3. HEALTH_PROFILES - 5 Dimensions health data (separate for GDPR)
-- ============================================================================

CREATE TABLE IF NOT EXISTS health_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID UNIQUE NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Dimension 1: Allergens (30 types)
    allergens JSONB DEFAULT '{}' NOT NULL,
    /*
    {
        "gluten": true,
        "milk": true,
        "eggs": false,
        "fish": false,
        "shellfish": true,
        "tree_nuts": false,
        "peanuts": true,
        ...
    }
    */

    -- Dimension 2: Intolerances (10 types)
    intolerances JSONB DEFAULT '{}' NOT NULL,
    /*
    {
        "lactose": true,
        "fructose": false,
        "histamine": false,
        "caffeine": true,
        ...
    }
    */

    -- Dimension 3: Dietary Preferences (11 types)
    dietary JSONB DEFAULT '{}' NOT NULL,
    /*
    {
        "vegetarian": true,
        "vegan": false,
        "pescatarian": false,
        "halal": false,
        "kosher": false,
        "gluten_free": true,
        ...
    }
    */

    -- Dimension 4: Food Styles
    food_styles JSONB DEFAULT '{}' NOT NULL,
    /*
    {
        "spice_tolerance": 3,      -- 0-5 scale
        "preferred_cuisines": ["italian", "japanese", "mexican"],
        "avoided_cuisines": [],
        "portion_preference": "medium"  -- small, medium, large
    }
    */

    -- Dimension 5: Personal Preferences
    preferences JSONB DEFAULT '{}' NOT NULL,
    /*
    {
        "organic_preferred": true,
        "local_preferred": true,
        "sustainable_preferred": true,
        "budget_conscious": false,
        "adventurous_eater": true
    }
    */

    -- Profile completeness
    completeness_score INTEGER DEFAULT 0 CHECK (completeness_score >= 0 AND completeness_score <= 100),

    -- Privacy settings
    share_with_merchants BOOLEAN DEFAULT TRUE,   -- Allow merchants to see for recommendations
    share_anonymized BOOLEAN DEFAULT TRUE,       -- Allow anonymized analytics

    -- Metadata
    last_updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index
CREATE INDEX IF NOT EXISTS idx_health_profiles_account ON health_profiles(account_id);
CREATE INDEX IF NOT EXISTS idx_health_profiles_allergens ON health_profiles USING GIN(allergens);
CREATE INDEX IF NOT EXISTS idx_health_profiles_dietary ON health_profiles USING GIN(dietary);

-- Auto-compute completeness score
CREATE OR REPLACE FUNCTION compute_health_profile_completeness()
RETURNS TRIGGER AS $$
DECLARE
    v_score INTEGER := 0;
    v_total_fields INTEGER := 5;  -- 5 dimensions
    v_filled INTEGER := 0;
BEGIN
    -- Check each dimension
    IF jsonb_typeof(NEW.allergens) = 'object' AND NEW.allergens != '{}' THEN
        v_filled := v_filled + 1;
    END IF;
    IF jsonb_typeof(NEW.intolerances) = 'object' AND NEW.intolerances != '{}' THEN
        v_filled := v_filled + 1;
    END IF;
    IF jsonb_typeof(NEW.dietary) = 'object' AND NEW.dietary != '{}' THEN
        v_filled := v_filled + 1;
    END IF;
    IF jsonb_typeof(NEW.food_styles) = 'object' AND NEW.food_styles != '{}' THEN
        v_filled := v_filled + 1;
    END IF;
    IF jsonb_typeof(NEW.preferences) = 'object' AND NEW.preferences != '{}' THEN
        v_filled := v_filled + 1;
    END IF;

    NEW.completeness_score := (v_filled * 100) / v_total_fields;
    NEW.last_updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_compute_health_completeness
    BEFORE INSERT OR UPDATE ON health_profiles
    FOR EACH ROW EXECUTE FUNCTION compute_health_profile_completeness();

-- ============================================================================
-- 4. REFERRALS - Bidirectional referral tracking
-- ============================================================================

CREATE TABLE IF NOT EXISTS referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who referred
    referrer_account_id UUID NOT NULL REFERENCES accounts(id),

    -- Who was referred (nullable until they sign up)
    referred_account_id UUID REFERENCES accounts(id),
    referred_email TEXT,                    -- Track before signup

    -- Referral type
    referral_type TEXT NOT NULL CHECK (referral_type IN (
        'consumer_to_consumer',             -- Friend referral
        'consumer_to_merchant',             -- User invites their favorite restaurant
        'merchant_to_merchant',             -- Restaurant invites another restaurant
        'merchant_to_consumer'              -- Restaurant invites customer
    )),

    -- Status tracking
    status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN (
        'pending',                          -- Invitation sent
        'signed_up',                        -- Referred signed up
        'qualified',                        -- Met qualification criteria
        'rewarded',                         -- Rewards distributed
        'expired'                           -- Invitation expired
    )),

    -- Rewards
    referrer_points_awarded INTEGER DEFAULT 0,
    referred_points_awarded INTEGER DEFAULT 0,
    bonus_description TEXT,                 -- e.g., "1 month free"

    -- For merchant referrals
    target_merchant_id UUID,                -- Which merchant was referred (if type = consumer_to_merchant)

    -- Qualification tracking
    qualification_criteria JSONB DEFAULT '{}',
    /*
    {
        "min_orders": 1,
        "min_spend": 100000,
        "subscription_required": true,
        "days_to_qualify": 30
    }
    */
    qualified_at TIMESTAMPTZ,

    -- Expiration
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_account_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred ON referrals(referred_account_id) WHERE referred_account_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_referrals_email ON referrals(referred_email) WHERE referred_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_referrals_type ON referrals(referral_type);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referrals_pending ON referrals(status, expires_at) WHERE status = 'pending';

-- ============================================================================
-- 5. LOYALTY_TRANSACTIONS - Track all point changes
-- ============================================================================

CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Transaction details
    transaction_type TEXT NOT NULL CHECK (transaction_type IN (
        -- Consumer actions
        'order_completed',
        'review_submitted',
        'social_share',
        'referral_consumer',
        'referral_merchant_bonus',
        'checkin',

        -- Merchant actions
        'referral_merchant',
        'ingredient_contributed',
        'bug_report',
        'feature_adopted',
        'subscription_anniversary',
        'profile_completed',
        'case_study',

        -- System actions
        'admin_adjustment',
        'points_redeemed',
        'points_expired',
        'tier_bonus'
    )),

    -- Points
    points_change INTEGER NOT NULL,         -- Can be negative for redemptions
    points_type TEXT NOT NULL CHECK (points_type IN ('consumer', 'merchant', 'contributor')),
    balance_after INTEGER NOT NULL,         -- New balance after transaction

    -- Reference
    reference_type TEXT,                    -- 'order', 'referral', 'review', etc.
    reference_id UUID,                      -- ID of related entity

    -- Description
    description TEXT,

    -- Metadata
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_loyalty_tx_account ON loyalty_transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_loyalty_tx_type ON loyalty_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_loyalty_tx_created ON loyalty_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_loyalty_tx_account_created ON loyalty_transactions(account_id, created_at DESC);

-- ============================================================================
-- 6. UPDATE TRIGGERS
-- ============================================================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_accounts_updated_at
    BEFORE UPDATE ON accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_account_roles_updated_at
    BEFORE UPDATE ON account_roles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_health_profiles_updated_at
    BEFORE UPDATE ON health_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_referrals_updated_at
    BEFORE UPDATE ON referrals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 7. HELPER FUNCTIONS
-- ============================================================================

-- Function to award points
CREATE OR REPLACE FUNCTION award_loyalty_points(
    p_account_id UUID,
    p_points INTEGER,
    p_points_type TEXT,
    p_transaction_type TEXT,
    p_description TEXT DEFAULT NULL,
    p_reference_type TEXT DEFAULT NULL,
    p_reference_id UUID DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_new_balance INTEGER;
    v_column_name TEXT;
BEGIN
    -- Determine which column to update
    v_column_name := p_points_type || '_points';

    -- Update account points
    IF p_points_type = 'consumer' THEN
        UPDATE accounts
        SET consumer_points = consumer_points + p_points,
            total_points = total_points + p_points
        WHERE id = p_account_id
        RETURNING consumer_points INTO v_new_balance;
    ELSIF p_points_type = 'merchant' THEN
        UPDATE accounts
        SET merchant_points = merchant_points + p_points,
            total_points = total_points + p_points
        WHERE id = p_account_id
        RETURNING merchant_points INTO v_new_balance;
    ELSIF p_points_type = 'contributor' THEN
        UPDATE accounts
        SET contributor_points = contributor_points + p_points,
            total_points = total_points + p_points
        WHERE id = p_account_id
        RETURNING contributor_points INTO v_new_balance;
    END IF;

    -- Record transaction
    INSERT INTO loyalty_transactions (
        account_id, transaction_type, points_change, points_type,
        balance_after, description, reference_type, reference_id
    ) VALUES (
        p_account_id, p_transaction_type, p_points, p_points_type,
        v_new_balance, p_description, p_reference_type, p_reference_id
    );

    -- Check for tier upgrade
    PERFORM check_loyalty_tier_upgrade(p_account_id);

    RETURN v_new_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to check and upgrade loyalty tier
CREATE OR REPLACE FUNCTION check_loyalty_tier_upgrade(p_account_id UUID)
RETURNS TEXT AS $$
DECLARE
    v_total_points INTEGER;
    v_current_tier TEXT;
    v_new_tier TEXT;
BEGIN
    SELECT total_points, loyalty_tier
    INTO v_total_points, v_current_tier
    FROM accounts WHERE id = p_account_id;

    -- Determine new tier based on total points
    v_new_tier := CASE
        WHEN v_total_points >= 10000 THEN 'platinum'
        WHEN v_total_points >= 5000 THEN 'gold'
        WHEN v_total_points >= 1000 THEN 'silver'
        ELSE 'bronze'
    END;

    -- Update if tier changed
    IF v_new_tier != v_current_tier THEN
        UPDATE accounts SET loyalty_tier = v_new_tier WHERE id = p_account_id;

        -- Award tier bonus
        IF v_new_tier IN ('silver', 'gold', 'platinum') THEN
            PERFORM award_loyalty_points(
                p_account_id,
                CASE v_new_tier
                    WHEN 'silver' THEN 100
                    WHEN 'gold' THEN 250
                    WHEN 'platinum' THEN 500
                END,
                'consumer',
                'tier_bonus',
                'Congratulations on reaching ' || v_new_tier || ' tier!'
            );
        END IF;
    END IF;

    RETURN v_new_tier;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to create account with consumer role
CREATE OR REPLACE FUNCTION create_consumer_account(
    p_email TEXT,
    p_first_name TEXT DEFAULT NULL,
    p_last_name TEXT DEFAULT NULL,
    p_auth_id UUID DEFAULT NULL,
    p_referral_code TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_account_id UUID;
    v_referrer_id UUID;
BEGIN
    -- Check if referred
    IF p_referral_code IS NOT NULL THEN
        SELECT id INTO v_referrer_id
        FROM accounts
        WHERE referral_code = p_referral_code;
    END IF;

    -- Create account
    INSERT INTO accounts (email, first_name, last_name, auth_id, referred_by_account_id)
    VALUES (p_email, p_first_name, p_last_name, p_auth_id, v_referrer_id)
    RETURNING id INTO v_account_id;

    -- Create consumer role (primary by default)
    INSERT INTO account_roles (account_id, role_type, is_primary)
    VALUES (v_account_id, 'consumer', TRUE);

    -- Create empty health profile
    INSERT INTO health_profiles (account_id)
    VALUES (v_account_id);

    -- Process referral if exists
    IF v_referrer_id IS NOT NULL THEN
        -- Update pending referral
        UPDATE referrals
        SET referred_account_id = v_account_id,
            status = 'signed_up'
        WHERE referrer_account_id = v_referrer_id
          AND referred_email = p_email
          AND status = 'pending';

        -- If no pending referral, create one
        IF NOT FOUND THEN
            INSERT INTO referrals (
                referrer_account_id, referred_account_id,
                referral_type, status
            ) VALUES (
                v_referrer_id, v_account_id,
                'consumer_to_consumer', 'signed_up'
            );
        END IF;
    END IF;

    RETURN v_account_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to add merchant role to existing account
CREATE OR REPLACE FUNCTION add_merchant_role(
    p_account_id UUID,
    p_merchant_id UUID,
    p_permissions JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_role_id UUID;
BEGIN
    INSERT INTO account_roles (
        account_id, role_type, tenant_id, tenant_type, permissions
    ) VALUES (
        p_account_id, 'merchant', p_merchant_id, 'merchant', p_permissions
    )
    ON CONFLICT (account_id, role_type, tenant_id)
    DO UPDATE SET
        permissions = EXCLUDED.permissions,
        is_active = TRUE,
        updated_at = NOW()
    RETURNING id INTO v_role_id;

    RETURN v_role_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 8. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- Accounts: Users can only see their own account
CREATE POLICY "Users can view own account" ON accounts
    FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can update own account" ON accounts
    FOR UPDATE USING (auth.uid() = auth_id);

-- Account Roles: Users can see their own roles
CREATE POLICY "Users can view own roles" ON account_roles
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Health Profiles: Users can manage their own
CREATE POLICY "Users can manage own health profile" ON health_profiles
    FOR ALL USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Referrals: Users can see referrals they're involved in
CREATE POLICY "Users can view own referrals" ON referrals
    FOR SELECT USING (
        referrer_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
        OR referred_account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Loyalty Transactions: Users can see their own
CREATE POLICY "Users can view own transactions" ON loyalty_transactions
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Service role bypass for all tables
CREATE POLICY "Service role full access accounts" ON accounts
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access roles" ON account_roles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access health" ON health_profiles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access referrals" ON referrals
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access loyalty" ON loyalty_transactions
    FOR ALL USING (auth.role() = 'service_role');

-- Anon can create accounts (signup)
CREATE POLICY "Anon can create accounts" ON accounts
    FOR INSERT WITH CHECK (TRUE);

-- ============================================================================
-- 9. VIEWS
-- ============================================================================

-- View: Account with roles
CREATE OR REPLACE VIEW v_account_with_roles AS
SELECT
    a.*,
    COALESCE(
        jsonb_agg(
            jsonb_build_object(
                'id', ar.id,
                'role_type', ar.role_type,
                'tenant_id', ar.tenant_id,
                'tenant_type', ar.tenant_type,
                'is_primary', ar.is_primary,
                'is_active', ar.is_active,
                'permissions', ar.permissions
            )
        ) FILTER (WHERE ar.id IS NOT NULL),
        '[]'::jsonb
    ) AS roles
FROM accounts a
LEFT JOIN account_roles ar ON ar.account_id = a.id AND ar.is_active = TRUE
GROUP BY a.id;

-- View: Referral statistics
CREATE OR REPLACE VIEW v_referral_stats AS
SELECT
    a.id AS account_id,
    a.email,
    a.referral_code,
    COUNT(r.id) FILTER (WHERE r.status IN ('signed_up', 'qualified', 'rewarded')) AS successful_referrals,
    COUNT(r.id) FILTER (WHERE r.status = 'pending') AS pending_referrals,
    SUM(r.referrer_points_awarded) AS total_points_earned
FROM accounts a
LEFT JOIN referrals r ON r.referrer_account_id = a.id
GROUP BY a.id;

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE accounts IS 'Unified account system - one account per person with multiple roles';
COMMENT ON TABLE account_roles IS 'Roles associated with account (consumer, merchant, admin, contributor)';
COMMENT ON TABLE health_profiles IS '5 Dimensions health data for personalized recommendations';
COMMENT ON TABLE referrals IS 'Bidirectional referral tracking (C2C, C2M, M2M, M2C)';
COMMENT ON TABLE loyalty_transactions IS 'Audit log of all loyalty point changes';

COMMENT ON COLUMN accounts.total_points IS 'Sum of consumer_points + merchant_points + contributor_points';
COMMENT ON COLUMN accounts.referral_code IS 'Auto-generated unique 8-char code for sharing';
COMMENT ON COLUMN account_roles.tenant_id IS 'References merchants(id) when role_type = merchant';
COMMENT ON COLUMN health_profiles.completeness_score IS 'Auto-computed 0-100 based on filled dimensions';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
