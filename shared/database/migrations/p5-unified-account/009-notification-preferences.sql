-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 9: NOTIFICATION PREFERENCES
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-02
-- Description: User notification preferences for email, push, and in-app
-- ============================================================================

-- ============================================================================
-- 1. NOTIFICATION PREFERENCES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Email notifications
    email_enabled BOOLEAN DEFAULT TRUE,
    email_marketing BOOLEAN DEFAULT TRUE,          -- Promos, offers
    email_orders BOOLEAN DEFAULT TRUE,             -- Order updates
    email_loyalty BOOLEAN DEFAULT TRUE,            -- Points, tier changes
    email_contributions BOOLEAN DEFAULT TRUE,      -- Contribution status
    email_team BOOLEAN DEFAULT TRUE,               -- Staff invites, team updates
    email_digest_frequency TEXT DEFAULT 'weekly'   -- 'daily', 'weekly', 'monthly', 'never'
        CHECK (email_digest_frequency IN ('daily', 'weekly', 'monthly', 'never')),

    -- Push notifications
    push_enabled BOOLEAN DEFAULT TRUE,
    push_orders BOOLEAN DEFAULT TRUE,              -- Real-time order updates
    push_loyalty BOOLEAN DEFAULT TRUE,             -- Points earned
    push_promotions BOOLEAN DEFAULT FALSE,         -- Promos (opt-in)
    push_reminders BOOLEAN DEFAULT TRUE,           -- Cart abandonment, etc.

    -- In-app notifications
    inapp_enabled BOOLEAN DEFAULT TRUE,
    inapp_all BOOLEAN DEFAULT TRUE,                -- Show all in-app notifications

    -- SMS (future)
    sms_enabled BOOLEAN DEFAULT FALSE,
    sms_orders BOOLEAN DEFAULT FALSE,
    sms_marketing BOOLEAN DEFAULT FALSE,

    -- Quiet hours
    quiet_hours_enabled BOOLEAN DEFAULT FALSE,
    quiet_hours_start TIME DEFAULT '22:00',
    quiet_hours_end TIME DEFAULT '08:00',

    -- Timezone for scheduling
    timezone TEXT DEFAULT 'Europe/Rome',

    -- Language preference for notifications
    notification_locale TEXT DEFAULT 'it',

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Unique constraint
    CONSTRAINT unique_account_preferences UNIQUE (account_id)
);

-- ============================================================================
-- 2. PUSH TOKENS TABLE (for mobile push notifications)
-- ============================================================================

CREATE TABLE IF NOT EXISTS push_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Token info
    token TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
    device_name TEXT,
    device_id TEXT,                                -- Unique device identifier

    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    last_used_at TIMESTAMPTZ DEFAULT NOW(),

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Unique token per platform
    CONSTRAINT unique_push_token UNIQUE (token, platform)
);

-- ============================================================================
-- 3. NOTIFICATION LOG TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS notification_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,

    -- Notification details
    notification_type TEXT NOT NULL,               -- 'email', 'push', 'sms', 'inapp'
    category TEXT NOT NULL,                        -- 'order', 'loyalty', 'marketing', etc.
    title TEXT NOT NULL,
    body TEXT,
    data JSONB DEFAULT '{}',                       -- Additional payload

    -- Delivery status
    status TEXT DEFAULT 'pending'
        CHECK (status IN ('pending', 'sent', 'delivered', 'failed', 'read')),
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    error_message TEXT,

    -- Reference
    reference_type TEXT,                           -- 'order', 'contribution', 'referral', etc.
    reference_id UUID,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_notification_prefs_account ON notification_preferences(account_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_account ON push_tokens(account_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_active ON push_tokens(account_id, is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_notification_log_account ON notification_log(account_id);
CREATE INDEX IF NOT EXISTS idx_notification_log_status ON notification_log(status, created_at);
CREATE INDEX IF NOT EXISTS idx_notification_log_unread ON notification_log(account_id, status)
    WHERE status != 'read';

-- ============================================================================
-- 5. TRIGGERS
-- ============================================================================

-- Update timestamp trigger for preferences
CREATE TRIGGER update_notification_preferences_updated_at
    BEFORE UPDATE ON notification_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update timestamp trigger for push tokens
CREATE TRIGGER update_push_tokens_updated_at
    BEFORE UPDATE ON push_tokens
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create preferences on account creation
CREATE OR REPLACE FUNCTION create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notification_preferences (account_id)
    VALUES (NEW.id)
    ON CONFLICT (account_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trigger_create_notification_preferences
    AFTER INSERT ON accounts
    FOR EACH ROW EXECUTE FUNCTION create_default_notification_preferences();

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Get notification preferences for account
CREATE OR REPLACE FUNCTION get_notification_preferences(p_account_id UUID)
RETURNS TABLE(
    email_enabled BOOLEAN,
    email_marketing BOOLEAN,
    email_orders BOOLEAN,
    email_loyalty BOOLEAN,
    email_contributions BOOLEAN,
    email_team BOOLEAN,
    email_digest_frequency TEXT,
    push_enabled BOOLEAN,
    push_orders BOOLEAN,
    push_loyalty BOOLEAN,
    push_promotions BOOLEAN,
    push_reminders BOOLEAN,
    inapp_enabled BOOLEAN,
    quiet_hours_enabled BOOLEAN,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    timezone TEXT,
    notification_locale TEXT
) AS $$
BEGIN
    -- Ensure preferences exist
    INSERT INTO notification_preferences (account_id)
    VALUES (p_account_id)
    ON CONFLICT (account_id) DO NOTHING;

    RETURN QUERY
    SELECT
        np.email_enabled,
        np.email_marketing,
        np.email_orders,
        np.email_loyalty,
        np.email_contributions,
        np.email_team,
        np.email_digest_frequency,
        np.push_enabled,
        np.push_orders,
        np.push_loyalty,
        np.push_promotions,
        np.push_reminders,
        np.inapp_enabled,
        np.quiet_hours_enabled,
        np.quiet_hours_start,
        np.quiet_hours_end,
        np.timezone,
        np.notification_locale
    FROM notification_preferences np
    WHERE np.account_id = p_account_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update notification preferences
CREATE OR REPLACE FUNCTION update_notification_preferences(
    p_account_id UUID,
    p_preferences JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Ensure preferences exist
    INSERT INTO notification_preferences (account_id)
    VALUES (p_account_id)
    ON CONFLICT (account_id) DO NOTHING;

    -- Update only provided fields
    UPDATE notification_preferences
    SET
        email_enabled = COALESCE((p_preferences->>'email_enabled')::BOOLEAN, email_enabled),
        email_marketing = COALESCE((p_preferences->>'email_marketing')::BOOLEAN, email_marketing),
        email_orders = COALESCE((p_preferences->>'email_orders')::BOOLEAN, email_orders),
        email_loyalty = COALESCE((p_preferences->>'email_loyalty')::BOOLEAN, email_loyalty),
        email_contributions = COALESCE((p_preferences->>'email_contributions')::BOOLEAN, email_contributions),
        email_team = COALESCE((p_preferences->>'email_team')::BOOLEAN, email_team),
        email_digest_frequency = COALESCE(p_preferences->>'email_digest_frequency', email_digest_frequency),
        push_enabled = COALESCE((p_preferences->>'push_enabled')::BOOLEAN, push_enabled),
        push_orders = COALESCE((p_preferences->>'push_orders')::BOOLEAN, push_orders),
        push_loyalty = COALESCE((p_preferences->>'push_loyalty')::BOOLEAN, push_loyalty),
        push_promotions = COALESCE((p_preferences->>'push_promotions')::BOOLEAN, push_promotions),
        push_reminders = COALESCE((p_preferences->>'push_reminders')::BOOLEAN, push_reminders),
        inapp_enabled = COALESCE((p_preferences->>'inapp_enabled')::BOOLEAN, inapp_enabled),
        quiet_hours_enabled = COALESCE((p_preferences->>'quiet_hours_enabled')::BOOLEAN, quiet_hours_enabled),
        quiet_hours_start = COALESCE((p_preferences->>'quiet_hours_start')::TIME, quiet_hours_start),
        quiet_hours_end = COALESCE((p_preferences->>'quiet_hours_end')::TIME, quiet_hours_end),
        timezone = COALESCE(p_preferences->>'timezone', timezone),
        notification_locale = COALESCE(p_preferences->>'notification_locale', notification_locale),
        updated_at = NOW()
    WHERE account_id = p_account_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Register push token
CREATE OR REPLACE FUNCTION register_push_token(
    p_account_id UUID,
    p_token TEXT,
    p_platform TEXT,
    p_device_name TEXT DEFAULT NULL,
    p_device_id TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_token_id UUID;
BEGIN
    INSERT INTO push_tokens (account_id, token, platform, device_name, device_id)
    VALUES (p_account_id, p_token, p_platform, p_device_name, p_device_id)
    ON CONFLICT (token, platform) DO UPDATE
    SET account_id = p_account_id,
        device_name = COALESCE(p_device_name, push_tokens.device_name),
        device_id = COALESCE(p_device_id, push_tokens.device_id),
        is_active = TRUE,
        last_used_at = NOW(),
        updated_at = NOW()
    RETURNING id INTO v_token_id;

    RETURN v_token_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Deactivate push token
CREATE OR REPLACE FUNCTION deactivate_push_token(p_token TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE push_tokens
    SET is_active = FALSE, updated_at = NOW()
    WHERE token = p_token;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get active push tokens for account
CREATE OR REPLACE FUNCTION get_push_tokens(p_account_id UUID)
RETURNS TABLE(
    token_id UUID,
    token TEXT,
    platform TEXT,
    device_name TEXT,
    last_used_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT pt.id, pt.token, pt.platform, pt.device_name, pt.last_used_at
    FROM push_tokens pt
    WHERE pt.account_id = p_account_id
    AND pt.is_active = TRUE
    ORDER BY pt.last_used_at DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Log a notification
CREATE OR REPLACE FUNCTION log_notification(
    p_account_id UUID,
    p_notification_type TEXT,
    p_category TEXT,
    p_title TEXT,
    p_body TEXT DEFAULT NULL,
    p_data JSONB DEFAULT '{}',
    p_reference_type TEXT DEFAULT NULL,
    p_reference_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_log_id UUID;
BEGIN
    INSERT INTO notification_log (
        account_id, notification_type, category, title, body, data,
        reference_type, reference_id, status
    ) VALUES (
        p_account_id, p_notification_type, p_category, p_title, p_body, p_data,
        p_reference_type, p_reference_id, 'pending'
    )
    RETURNING id INTO v_log_id;

    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Mark notification as sent
CREATE OR REPLACE FUNCTION mark_notification_sent(p_log_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE notification_log
    SET status = 'sent', sent_at = NOW()
    WHERE id = p_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Mark notification as read
CREATE OR REPLACE FUNCTION mark_notification_read(p_log_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE notification_log
    SET status = 'read', read_at = NOW()
    WHERE id = p_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get unread notifications count
CREATE OR REPLACE FUNCTION get_unread_notifications_count(p_account_id UUID)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    SELECT COUNT(*)::INTEGER INTO v_count
    FROM notification_log
    WHERE account_id = p_account_id
    AND status != 'read'
    AND notification_type = 'inapp';

    RETURN v_count;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get recent in-app notifications
CREATE OR REPLACE FUNCTION get_inapp_notifications(
    p_account_id UUID,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
    notification_id UUID,
    category TEXT,
    title TEXT,
    body TEXT,
    data JSONB,
    is_read BOOLEAN,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        nl.id AS notification_id,
        nl.category,
        nl.title,
        nl.body,
        nl.data,
        (nl.status = 'read') AS is_read,
        nl.created_at
    FROM notification_log nl
    WHERE nl.account_id = p_account_id
    AND nl.notification_type = 'inapp'
    ORDER BY nl.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Check if should send notification (respects preferences and quiet hours)
CREATE OR REPLACE FUNCTION should_send_notification(
    p_account_id UUID,
    p_notification_type TEXT,
    p_category TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    v_prefs RECORD;
    v_current_time TIME;
    v_in_quiet_hours BOOLEAN;
BEGIN
    SELECT * INTO v_prefs
    FROM notification_preferences
    WHERE account_id = p_account_id;

    IF NOT FOUND THEN
        RETURN TRUE; -- Default to send if no preferences
    END IF;

    -- Check notification type enabled
    IF p_notification_type = 'email' AND NOT v_prefs.email_enabled THEN
        RETURN FALSE;
    END IF;

    IF p_notification_type = 'push' AND NOT v_prefs.push_enabled THEN
        RETURN FALSE;
    END IF;

    IF p_notification_type = 'inapp' AND NOT v_prefs.inapp_enabled THEN
        RETURN FALSE;
    END IF;

    -- Check category preferences
    IF p_notification_type = 'email' THEN
        CASE p_category
            WHEN 'marketing' THEN RETURN v_prefs.email_marketing;
            WHEN 'orders' THEN RETURN v_prefs.email_orders;
            WHEN 'loyalty' THEN RETURN v_prefs.email_loyalty;
            WHEN 'contributions' THEN RETURN v_prefs.email_contributions;
            WHEN 'team' THEN RETURN v_prefs.email_team;
            ELSE RETURN TRUE;
        END CASE;
    END IF;

    IF p_notification_type = 'push' THEN
        -- Check quiet hours for push
        IF v_prefs.quiet_hours_enabled THEN
            v_current_time := (NOW() AT TIME ZONE v_prefs.timezone)::TIME;

            IF v_prefs.quiet_hours_start > v_prefs.quiet_hours_end THEN
                -- Overnight quiet hours (e.g., 22:00 to 08:00)
                v_in_quiet_hours := v_current_time >= v_prefs.quiet_hours_start
                                 OR v_current_time <= v_prefs.quiet_hours_end;
            ELSE
                -- Same day quiet hours
                v_in_quiet_hours := v_current_time >= v_prefs.quiet_hours_start
                                AND v_current_time <= v_prefs.quiet_hours_end;
            END IF;

            IF v_in_quiet_hours THEN
                RETURN FALSE;
            END IF;
        END IF;

        CASE p_category
            WHEN 'orders' THEN RETURN v_prefs.push_orders;
            WHEN 'loyalty' THEN RETURN v_prefs.push_loyalty;
            WHEN 'promotions' THEN RETURN v_prefs.push_promotions;
            WHEN 'reminders' THEN RETURN v_prefs.push_reminders;
            ELSE RETURN TRUE;
        END CASE;
    END IF;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;

-- Users can view/update own preferences
CREATE POLICY "Users can manage own notification preferences" ON notification_preferences
    FOR ALL USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Users can manage own push tokens
CREATE POLICY "Users can manage own push tokens" ON push_tokens
    FOR ALL USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Users can view own notification log
CREATE POLICY "Users can view own notifications" ON notification_log
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Service role full access
CREATE POLICY "Service role full access notification_preferences" ON notification_preferences
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access push_tokens" ON push_tokens
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access notification_log" ON notification_log
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 8. BACKFILL EXISTING ACCOUNTS
-- ============================================================================

-- Create notification preferences for existing accounts
INSERT INTO notification_preferences (account_id)
SELECT id FROM accounts
WHERE id NOT IN (SELECT account_id FROM notification_preferences)
ON CONFLICT (account_id) DO NOTHING;

-- ============================================================================
-- 9. COMMENTS
-- ============================================================================

COMMENT ON TABLE notification_preferences IS 'User notification preferences for all channels';
COMMENT ON TABLE push_tokens IS 'Push notification tokens for mobile and web';
COMMENT ON TABLE notification_log IS 'Log of all notifications sent to users';
COMMENT ON FUNCTION get_notification_preferences IS 'Get notification preferences for an account';
COMMENT ON FUNCTION update_notification_preferences IS 'Update notification preferences with partial JSON';
COMMENT ON FUNCTION register_push_token IS 'Register or update a push notification token';
COMMENT ON FUNCTION should_send_notification IS 'Check if notification should be sent based on preferences and quiet hours';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
