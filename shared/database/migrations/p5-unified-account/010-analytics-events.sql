-- ============================================================================
-- P5 UNIFIED ACCOUNT - PHASE 10: ANALYTICS EVENTS
-- ============================================================================
-- Version: 1.0.1
-- Date: 2026-01-02
-- Description: User behavior tracking and analytics events
-- ============================================================================

-- ============================================================================
-- 1. ANALYTICS EVENTS TABLE
-- ============================================================================

-- Drop if exists to ensure clean schema
DROP TABLE IF EXISTS analytics_events CASCADE;

CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Who
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    anonymous_id TEXT,                          -- For non-logged users
    session_id TEXT,                            -- Browser/app session

    -- What
    event_name TEXT NOT NULL,                   -- e.g., 'page_view', 'button_click'
    event_category TEXT NOT NULL,               -- e.g., 'navigation', 'engagement', 'conversion'

    -- Where
    page_path TEXT,                             -- URL path
    page_title TEXT,
    referrer TEXT,

    -- Context
    properties JSONB DEFAULT '{}',              -- Event-specific data

    -- Device & Browser
    device_type TEXT,                           -- 'desktop', 'mobile', 'tablet'
    browser TEXT,
    browser_version TEXT,
    os TEXT,
    os_version TEXT,
    screen_width INTEGER,
    screen_height INTEGER,

    -- Location (approximate)
    country_code TEXT,
    region TEXT,
    city TEXT,

    -- UTM tracking
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,

    -- App context
    app_version TEXT,
    platform TEXT,                              -- 'web', 'ios', 'android', 'pwa'

    -- Tenant context (for B2B analytics)
    merchant_id UUID,
    organization_id UUID,

    -- Timestamps
    client_timestamp TIMESTAMPTZ,               -- When event occurred on client
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Denormalized date for efficient indexing (populated by trigger)
    event_date DATE NOT NULL DEFAULT CURRENT_DATE
);

-- ============================================================================
-- 2. DAILY AGGREGATES TABLE (for fast dashboard queries)
-- ============================================================================

DROP TABLE IF EXISTS analytics_daily_aggregates CASCADE;

CREATE TABLE analytics_daily_aggregates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Dimensions (use empty strings instead of NULL for uniqueness)
    date DATE NOT NULL,
    event_name TEXT NOT NULL,
    event_category TEXT NOT NULL,
    merchant_id TEXT NOT NULL DEFAULT '',       -- TEXT to allow empty string
    platform TEXT NOT NULL DEFAULT '',
    device_type TEXT NOT NULL DEFAULT '',
    country_code TEXT NOT NULL DEFAULT '',

    -- Metrics
    event_count INTEGER DEFAULT 0,
    unique_users INTEGER DEFAULT 0,
    unique_sessions INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

    -- Simple unique constraint (no NULLs, using empty strings)
    CONSTRAINT unique_daily_aggregate UNIQUE (
        date, event_name, event_category, merchant_id, platform, device_type, country_code
    )
);

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Events indexes
CREATE INDEX idx_analytics_events_account ON analytics_events(account_id)
    WHERE account_id IS NOT NULL;
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX idx_analytics_events_category ON analytics_events(event_category);
CREATE INDEX idx_analytics_events_created ON analytics_events(created_at DESC);
CREATE INDEX idx_analytics_events_merchant ON analytics_events(merchant_id, created_at DESC)
    WHERE merchant_id IS NOT NULL;
-- Use denormalized event_date column instead of DATE(created_at)
CREATE INDEX idx_analytics_events_date ON analytics_events(event_date);

-- Aggregates indexes
CREATE INDEX idx_analytics_aggregates_date ON analytics_daily_aggregates(date DESC);
CREATE INDEX idx_analytics_aggregates_merchant ON analytics_daily_aggregates(merchant_id, date DESC)
    WHERE merchant_id != '';

-- ============================================================================
-- 4. TRIGGER FOR EVENT_DATE
-- ============================================================================

CREATE OR REPLACE FUNCTION set_event_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.event_date := DATE(NEW.created_at);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_event_date
    BEFORE INSERT ON analytics_events
    FOR EACH ROW
    EXECUTE FUNCTION set_event_date();

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- Drop existing functions first to avoid signature conflicts
DROP FUNCTION IF EXISTS track_event(TEXT, TEXT, UUID, TEXT, TEXT, TEXT, JSONB, TEXT, TEXT, UUID, TEXT, TEXT, TEXT, TIMESTAMPTZ);
DROP FUNCTION IF EXISTS track_event CASCADE;
DROP FUNCTION IF EXISTS track_page_view CASCADE;
DROP FUNCTION IF EXISTS get_event_counts CASCADE;
DROP FUNCTION IF EXISTS get_user_activity CASCADE;
DROP FUNCTION IF EXISTS get_popular_pages CASCADE;
DROP FUNCTION IF EXISTS get_device_breakdown CASCADE;
DROP FUNCTION IF EXISTS get_utm_performance CASCADE;
DROP FUNCTION IF EXISTS aggregate_daily_analytics CASCADE;
DROP FUNCTION IF EXISTS cleanup_old_analytics_events CASCADE;

-- Track an analytics event
CREATE OR REPLACE FUNCTION track_event(
    p_event_name TEXT,
    p_event_category TEXT,
    p_account_id UUID DEFAULT NULL,
    p_anonymous_id TEXT DEFAULT NULL,
    p_session_id TEXT DEFAULT NULL,
    p_page_path TEXT DEFAULT NULL,
    p_properties JSONB DEFAULT '{}',
    p_device_type TEXT DEFAULT NULL,
    p_platform TEXT DEFAULT 'web',
    p_merchant_id UUID DEFAULT NULL,
    p_utm_source TEXT DEFAULT NULL,
    p_utm_medium TEXT DEFAULT NULL,
    p_utm_campaign TEXT DEFAULT NULL,
    p_client_timestamp TIMESTAMPTZ DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_event_id UUID;
    v_created_at TIMESTAMPTZ;
BEGIN
    v_created_at := COALESCE(p_client_timestamp, NOW());

    INSERT INTO analytics_events (
        account_id, anonymous_id, session_id,
        event_name, event_category,
        page_path, properties,
        device_type, platform, merchant_id,
        utm_source, utm_medium, utm_campaign,
        client_timestamp, created_at, event_date
    ) VALUES (
        p_account_id, p_anonymous_id, p_session_id,
        p_event_name, p_event_category,
        p_page_path, p_properties,
        p_device_type, p_platform, p_merchant_id,
        p_utm_source, p_utm_medium, p_utm_campaign,
        p_client_timestamp, v_created_at, DATE(v_created_at)
    )
    RETURNING id INTO v_event_id;

    RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Track page view (convenience function)
CREATE OR REPLACE FUNCTION track_page_view(
    p_page_path TEXT,
    p_page_title TEXT DEFAULT NULL,
    p_account_id UUID DEFAULT NULL,
    p_session_id TEXT DEFAULT NULL,
    p_referrer TEXT DEFAULT NULL,
    p_merchant_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
BEGIN
    RETURN track_event(
        'page_view',
        'navigation',
        p_account_id,
        NULL,
        p_session_id,
        p_page_path,
        jsonb_build_object('page_title', p_page_title, 'referrer', p_referrer),
        NULL,
        'web',
        p_merchant_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Get event counts for a date range
CREATE OR REPLACE FUNCTION get_event_counts(
    p_start_date DATE,
    p_end_date DATE,
    p_event_name TEXT DEFAULT NULL,
    p_event_category TEXT DEFAULT NULL,
    p_merchant_id UUID DEFAULT NULL
)
RETURNS TABLE(
    event_date DATE,
    event_name TEXT,
    event_count BIGINT,
    unique_users BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ae.event_date,
        ae.event_name,
        COUNT(*)::BIGINT AS event_count,
        COUNT(DISTINCT COALESCE(ae.account_id::TEXT, ae.anonymous_id))::BIGINT AS unique_users
    FROM analytics_events ae
    WHERE ae.event_date BETWEEN p_start_date AND p_end_date
    AND (p_event_name IS NULL OR ae.event_name = p_event_name)
    AND (p_event_category IS NULL OR ae.event_category = p_event_category)
    AND (p_merchant_id IS NULL OR ae.merchant_id = p_merchant_id)
    GROUP BY ae.event_date, ae.event_name
    ORDER BY ae.event_date DESC, event_count DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get user activity summary
CREATE OR REPLACE FUNCTION get_user_activity(
    p_account_id UUID,
    p_days INTEGER DEFAULT 30
)
RETURNS TABLE(
    event_date DATE,
    event_count BIGINT,
    page_views BIGINT,
    sessions BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ae.event_date,
        COUNT(*)::BIGINT AS event_count,
        COUNT(*) FILTER (WHERE ae.event_name = 'page_view')::BIGINT AS page_views,
        COUNT(DISTINCT ae.session_id)::BIGINT AS sessions
    FROM analytics_events ae
    WHERE ae.account_id = p_account_id
    AND ae.event_date >= CURRENT_DATE - p_days
    GROUP BY ae.event_date
    ORDER BY ae.event_date DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get popular pages
CREATE OR REPLACE FUNCTION get_popular_pages(
    p_merchant_id UUID DEFAULT NULL,
    p_days INTEGER DEFAULT 7,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE(
    page_path TEXT,
    view_count BIGINT,
    unique_visitors BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ae.page_path,
        COUNT(*)::BIGINT AS view_count,
        COUNT(DISTINCT COALESCE(ae.account_id::TEXT, ae.anonymous_id))::BIGINT AS unique_visitors
    FROM analytics_events ae
    WHERE ae.event_name = 'page_view'
    AND ae.page_path IS NOT NULL
    AND ae.event_date >= CURRENT_DATE - p_days
    AND (p_merchant_id IS NULL OR ae.merchant_id = p_merchant_id)
    GROUP BY ae.page_path
    ORDER BY view_count DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get device breakdown
CREATE OR REPLACE FUNCTION get_device_breakdown(
    p_merchant_id UUID DEFAULT NULL,
    p_days INTEGER DEFAULT 30
)
RETURNS TABLE(
    device_type TEXT,
    event_count BIGINT,
    percentage NUMERIC
) AS $$
DECLARE
    v_total BIGINT;
BEGIN
    SELECT COUNT(*) INTO v_total
    FROM analytics_events ae
    WHERE ae.event_date >= CURRENT_DATE - p_days
    AND (p_merchant_id IS NULL OR ae.merchant_id = p_merchant_id);

    RETURN QUERY
    SELECT
        COALESCE(ae.device_type, 'unknown') AS device_type,
        COUNT(*)::BIGINT AS event_count,
        ROUND((COUNT(*)::NUMERIC / NULLIF(v_total, 0)) * 100, 2) AS percentage
    FROM analytics_events ae
    WHERE ae.event_date >= CURRENT_DATE - p_days
    AND (p_merchant_id IS NULL OR ae.merchant_id = p_merchant_id)
    GROUP BY ae.device_type
    ORDER BY event_count DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Get UTM performance
CREATE OR REPLACE FUNCTION get_utm_performance(
    p_merchant_id UUID DEFAULT NULL,
    p_days INTEGER DEFAULT 30
)
RETURNS TABLE(
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    event_count BIGINT,
    unique_users BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ae.utm_source,
        ae.utm_medium,
        ae.utm_campaign,
        COUNT(*)::BIGINT AS event_count,
        COUNT(DISTINCT COALESCE(ae.account_id::TEXT, ae.anonymous_id))::BIGINT AS unique_users
    FROM analytics_events ae
    WHERE ae.event_date >= CURRENT_DATE - p_days
    AND (p_merchant_id IS NULL OR ae.merchant_id = p_merchant_id)
    AND (ae.utm_source IS NOT NULL OR ae.utm_medium IS NOT NULL OR ae.utm_campaign IS NOT NULL)
    GROUP BY ae.utm_source, ae.utm_medium, ae.utm_campaign
    ORDER BY event_count DESC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- Aggregate daily stats (to be run by cron job)
CREATE OR REPLACE FUNCTION aggregate_daily_analytics(p_date DATE DEFAULT CURRENT_DATE - 1)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER := 0;
BEGIN
    INSERT INTO analytics_daily_aggregates (
        date, event_name, event_category, merchant_id, platform, device_type, country_code,
        event_count, unique_users, unique_sessions
    )
    SELECT
        p_date,
        event_name,
        event_category,
        COALESCE(merchant_id::TEXT, ''),
        COALESCE(platform, ''),
        COALESCE(device_type, ''),
        COALESCE(country_code, ''),
        COUNT(*) AS event_count,
        COUNT(DISTINCT COALESCE(account_id::TEXT, anonymous_id)) AS unique_users,
        COUNT(DISTINCT session_id) AS unique_sessions
    FROM analytics_events
    WHERE event_date = p_date
    GROUP BY event_name, event_category, merchant_id, platform, device_type, country_code
    ON CONFLICT ON CONSTRAINT unique_daily_aggregate
    DO UPDATE SET
        event_count = EXCLUDED.event_count,
        unique_users = EXCLUDED.unique_users,
        unique_sessions = EXCLUDED.unique_sessions,
        updated_at = NOW();

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Clean old events (retention policy)
CREATE OR REPLACE FUNCTION cleanup_old_analytics_events(p_days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    DELETE FROM analytics_events
    WHERE event_date < CURRENT_DATE - p_days_to_keep;

    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- ============================================================================
-- 6. VIEWS
-- ============================================================================

-- Real-time dashboard view (last 24 hours)
CREATE OR REPLACE VIEW v_realtime_analytics AS
SELECT
    DATE_TRUNC('hour', created_at) AS hour,
    event_name,
    event_category,
    COUNT(*) AS event_count,
    COUNT(DISTINCT COALESCE(account_id::TEXT, anonymous_id)) AS unique_users,
    COUNT(DISTINCT session_id) AS sessions
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at), event_name, event_category
ORDER BY hour DESC;

-- Top events summary
CREATE OR REPLACE VIEW v_top_events AS
SELECT
    event_name,
    event_category,
    COUNT(*) AS total_count,
    COUNT(*) FILTER (WHERE event_date = CURRENT_DATE) AS today,
    COUNT(*) FILTER (WHERE event_date >= CURRENT_DATE - 7) AS last_7d,
    COUNT(*) FILTER (WHERE event_date >= CURRENT_DATE - 30) AS last_30d
FROM analytics_events
WHERE event_date >= CURRENT_DATE - 30
GROUP BY event_name, event_category
ORDER BY today DESC;

-- ============================================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_daily_aggregates ENABLE ROW LEVEL SECURITY;

-- Users can view their own events
CREATE POLICY "Users can view own analytics" ON analytics_events
    FOR SELECT USING (
        account_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    );

-- Merchants can view their events
CREATE POLICY "Merchants can view own analytics" ON analytics_events
    FOR SELECT USING (
        merchant_id IN (
            SELECT ar.tenant_id::UUID FROM account_roles ar
            JOIN accounts a ON a.id = ar.account_id
            WHERE a.auth_id = auth.uid()
            AND ar.tenant_type = 'merchant'
        )
    );

-- Service role full access
CREATE POLICY "Service role full access analytics_events" ON analytics_events
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access analytics_aggregates" ON analytics_daily_aggregates
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- 8. COMMENTS
-- ============================================================================

COMMENT ON TABLE analytics_events IS 'Raw analytics events for user behavior tracking';
COMMENT ON TABLE analytics_daily_aggregates IS 'Pre-aggregated daily analytics for fast dashboard queries';
COMMENT ON FUNCTION track_event IS 'Track a custom analytics event';
COMMENT ON FUNCTION track_page_view IS 'Track a page view event';
COMMENT ON FUNCTION get_event_counts IS 'Get event counts for a date range';
COMMENT ON FUNCTION aggregate_daily_analytics IS 'Aggregate daily analytics (run via cron)';
COMMENT ON FUNCTION cleanup_old_analytics_events IS 'Clean up old events based on retention policy';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
