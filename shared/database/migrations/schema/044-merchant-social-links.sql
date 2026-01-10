-- ============================================================================
-- Migration 044: Merchant Social Links
-- ============================================================================
-- Stores social media and platform links for merchants
-- Phase 1: Simple URL/handle storage (no OAuth)
-- ============================================================================

-- Create table for merchant social links
CREATE TABLE IF NOT EXISTS merchant_social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL UNIQUE REFERENCES merchants(id) ON DELETE CASCADE,

    -- Global Social Media
    facebook_url TEXT,           -- Facebook page URL
    instagram_handle TEXT,       -- @handle (without @)
    tiktok_handle TEXT,          -- @handle
    twitter_handle TEXT,         -- @handle (X)
    youtube_url TEXT,            -- Channel URL
    linkedin_url TEXT,           -- Company page URL

    -- Asian Platforms
    zalo_oa_id TEXT,             -- Zalo Official Account ID
    line_id TEXT,                -- LINE Official Account ID
    kakaotalk_channel TEXT,      -- KakaoTalk Channel URL
    wechat_id TEXT,              -- WeChat Official Account ID
    xiaohongshu_id TEXT,         -- Xiaohongshu (RED) ID

    -- Review Platforms
    google_business_url TEXT,    -- Google Business Profile URL
    tripadvisor_url TEXT,        -- TripAdvisor page URL
    dianping_url TEXT,           -- Dianping (China) URL
    yelp_url TEXT,               -- Yelp page URL

    -- Delivery Platforms
    grabfood_url TEXT,           -- GrabFood store URL
    shopeefood_url TEXT,         -- ShopeeFood store URL
    gojek_url TEXT,              -- GoFood store URL
    baemin_url TEXT,             -- Baemin (Korea) store URL
    foodpanda_url TEXT,          -- Foodpanda store URL
    deliveroo_url TEXT,          -- Deliveroo store URL
    ubereats_url TEXT,           -- UberEats store URL

    -- Custom Links (JSONB for flexibility)
    custom_links JSONB DEFAULT '[]',
    -- Format: [{"name": "Custom Platform", "url": "https://...", "icon": "link"}]

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on merchant_id (already unique, but explicit)
CREATE INDEX IF NOT EXISTS idx_merchant_social_links_merchant
    ON merchant_social_links(merchant_id);

-- Enable RLS
ALTER TABLE merchant_social_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Merchants can read their own social links
CREATE POLICY "merchant_social_links_select_own"
    ON merchant_social_links
    FOR SELECT
    USING (
        merchant_id IN (
            SELECT merchant_id FROM account_roles
            WHERE account_id = auth.uid()
        )
    );

-- Merchants can insert their own social links
CREATE POLICY "merchant_social_links_insert_own"
    ON merchant_social_links
    FOR INSERT
    WITH CHECK (
        merchant_id IN (
            SELECT merchant_id FROM account_roles
            WHERE account_id = auth.uid()
        )
    );

-- Merchants can update their own social links
CREATE POLICY "merchant_social_links_update_own"
    ON merchant_social_links
    FOR UPDATE
    USING (
        merchant_id IN (
            SELECT merchant_id FROM account_roles
            WHERE account_id = auth.uid()
        )
    );

-- Service role has full access (for backend operations)
CREATE POLICY "merchant_social_links_service_role"
    ON merchant_social_links
    FOR ALL
    USING (auth.role() = 'service_role');

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION trigger_update_social_links_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE TRIGGER update_merchant_social_links_timestamp
    BEFORE UPDATE ON merchant_social_links
    FOR EACH ROW
    EXECUTE FUNCTION trigger_update_social_links_timestamp();

-- ============================================================================
-- Comments for documentation
-- ============================================================================
COMMENT ON TABLE merchant_social_links IS 'Stores social media and platform links for merchants (Phase 1: links only, no OAuth)';
COMMENT ON COLUMN merchant_social_links.custom_links IS 'JSONB array for custom platform links: [{"name": "Platform", "url": "https://...", "icon": "link"}]';
