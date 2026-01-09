-- Migration: 042-qr-codes
-- Description: QR Codes system with analytics and tracking
-- Created: 2026-01-09
-- Author: Claude

-- ============================================
-- QR CODES TABLE
-- ============================================

CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Type: url or wifi
  type TEXT NOT NULL DEFAULT 'url' CHECK (type IN ('url', 'wifi')),

  -- URL Info (only for type='url')
  short_code VARCHAR(12) UNIQUE,
  destination_url TEXT,
  use_short_url BOOLEAN DEFAULT false,
  context TEXT CHECK (context IN ('table', 'external', 'takeaway', 'delivery')),
  source TEXT,  -- google_maps, instagram, facebook, event, flyer, table
  table_number INTEGER,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,

  -- WiFi Info (only for type='wifi')
  wifi_ssid VARCHAR(64),
  wifi_password VARCHAR(128),
  wifi_security TEXT CHECK (wifi_security IN ('WPA', 'WEP', 'nopass')),
  wifi_hidden BOOLEAN DEFAULT false,

  -- Metadata
  title VARCHAR(120),
  description TEXT,

  -- Design (JSON)
  design JSONB DEFAULT '{}'::jsonb,

  -- Status
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  max_scans INTEGER,
  total_scans INTEGER DEFAULT 0,
  last_scanned_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Constraints
  CONSTRAINT url_qr_requires_destination CHECK (
    type != 'url' OR destination_url IS NOT NULL
  ),
  CONSTRAINT wifi_qr_requires_ssid CHECK (
    type != 'wifi' OR (wifi_ssid IS NOT NULL AND wifi_security IS NOT NULL)
  )
);

-- ============================================
-- QR SCANS TABLE (Analytics)
-- ============================================

CREATE TABLE qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qr_code_id UUID NOT NULL REFERENCES qr_codes(id) ON DELETE CASCADE,

  -- Device Info
  ip_address INET,
  user_agent TEXT,
  device_type TEXT,  -- mobile, tablet, desktop
  os TEXT,
  browser TEXT,

  -- Location (if consent given)
  country TEXT,
  city TEXT,

  -- UTM Parameters
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,

  -- Referer
  referer TEXT,

  -- Timestamp
  scanned_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

-- QR Codes indexes
CREATE INDEX idx_qr_codes_merchant ON qr_codes(merchant_id);
CREATE INDEX idx_qr_codes_short_code ON qr_codes(short_code) WHERE short_code IS NOT NULL;
CREATE INDEX idx_qr_codes_type ON qr_codes(type);
CREATE INDEX idx_qr_codes_context ON qr_codes(context) WHERE context IS NOT NULL;
CREATE INDEX idx_qr_codes_source ON qr_codes(source) WHERE source IS NOT NULL;
CREATE INDEX idx_qr_codes_active ON qr_codes(is_active) WHERE is_active = true;
CREATE INDEX idx_qr_codes_created ON qr_codes(created_at);

-- QR Scans indexes
CREATE INDEX idx_qr_scans_qr_code ON qr_scans(qr_code_id);
CREATE INDEX idx_qr_scans_scanned_at ON qr_scans(scanned_at);
CREATE INDEX idx_qr_scans_device ON qr_scans(device_type);
-- Note: DATE(scanned_at) index removed - requires IMMUTABLE function
-- Use scanned_at directly with date comparisons in queries

-- ============================================
-- TRIGGER: Update total_scans counter
-- ============================================

CREATE OR REPLACE FUNCTION update_qr_scan_counter()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE qr_codes
  SET
    total_scans = total_scans + 1,
    last_scanned_at = NEW.scanned_at,
    updated_at = now()
  WHERE id = NEW.qr_code_id;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_qr_scan_insert
  AFTER INSERT ON qr_scans
  FOR EACH ROW
  EXECUTE FUNCTION update_qr_scan_counter();

-- ============================================
-- TRIGGER: Update updated_at
-- ============================================

CREATE TRIGGER update_qr_codes_updated_at
  BEFORE UPDATE ON qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_scans ENABLE ROW LEVEL SECURITY;

-- QR Codes: Merchant can manage their own QR codes
-- Note: account_roles uses tenant_id/tenant_type pattern (P5 unified accounts)
CREATE POLICY qr_codes_merchant_select ON qr_codes
  FOR SELECT
  USING (
    merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.tenant_type = 'merchant'
        AND ar.is_active = true
    )
  );

CREATE POLICY qr_codes_merchant_insert ON qr_codes
  FOR INSERT
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.tenant_type = 'merchant'
        AND ar.role_type IN ('owner', 'manager')
        AND ar.is_active = true
    )
  );

CREATE POLICY qr_codes_merchant_update ON qr_codes
  FOR UPDATE
  USING (
    merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.tenant_type = 'merchant'
        AND ar.role_type IN ('owner', 'manager')
        AND ar.is_active = true
    )
  );

CREATE POLICY qr_codes_merchant_delete ON qr_codes
  FOR DELETE
  USING (
    merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.tenant_type = 'merchant'
        AND ar.role_type IN ('owner', 'manager')
        AND ar.is_active = true
    )
  );

-- QR Codes: Service role has full access
CREATE POLICY qr_codes_service_role ON qr_codes
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- QR Scans: Merchant can view scans for their QR codes
CREATE POLICY qr_scans_merchant_select ON qr_scans
  FOR SELECT
  USING (
    qr_code_id IN (
      SELECT qc.id
      FROM qr_codes qc
      JOIN account_roles ar ON ar.tenant_id = qc.merchant_id
        AND ar.tenant_type = 'merchant'
      WHERE ar.account_id = auth.uid()
        AND ar.is_active = true
    )
  );

-- QR Scans: Anyone can insert (for tracking)
-- Note: In production, use Edge Function with service_role for inserts
CREATE POLICY qr_scans_public_insert ON qr_scans
  FOR INSERT
  WITH CHECK (true);

-- QR Scans: Service role has full access
CREATE POLICY qr_scans_service_role ON qr_scans
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Generate unique short code
CREATE OR REPLACE FUNCTION generate_qr_short_code(length INTEGER DEFAULT 8)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chars TEXT := 'abcdefghjkmnpqrstuvwxyz23456789';  -- No confusing chars (i,l,o,0,1)
  result TEXT := '';
  i INTEGER;
  attempts INTEGER := 0;
  max_attempts INTEGER := 10;
BEGIN
  LOOP
    result := '';
    FOR i IN 1..length LOOP
      result := result || substr(chars, floor(random() * length(chars))::int + 1, 1);
    END LOOP;

    -- Check if code already exists
    IF NOT EXISTS (SELECT 1 FROM qr_codes WHERE short_code = result) THEN
      RETURN result;
    END IF;

    attempts := attempts + 1;
    IF attempts >= max_attempts THEN
      RAISE EXCEPTION 'Could not generate unique short code after % attempts', max_attempts;
    END IF;
  END LOOP;
END;
$$;

-- Get QR analytics summary
CREATE OR REPLACE FUNCTION get_qr_analytics(p_qr_code_id UUID)
RETURNS TABLE (
  total_scans BIGINT,
  unique_ips BIGINT,
  mobile_scans BIGINT,
  desktop_scans BIGINT,
  tablet_scans BIGINT,
  scans_today BIGINT,
  scans_this_week BIGINT,
  scans_this_month BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_scans,
    COUNT(DISTINCT ip_address)::BIGINT as unique_ips,
    COUNT(*) FILTER (WHERE device_type = 'mobile')::BIGINT as mobile_scans,
    COUNT(*) FILTER (WHERE device_type = 'desktop')::BIGINT as desktop_scans,
    COUNT(*) FILTER (WHERE device_type = 'tablet')::BIGINT as tablet_scans,
    COUNT(*) FILTER (WHERE DATE(scanned_at) = CURRENT_DATE)::BIGINT as scans_today,
    COUNT(*) FILTER (WHERE scanned_at >= CURRENT_DATE - INTERVAL '7 days')::BIGINT as scans_this_week,
    COUNT(*) FILTER (WHERE scanned_at >= CURRENT_DATE - INTERVAL '30 days')::BIGINT as scans_this_month
  FROM qr_scans
  WHERE qr_code_id = p_qr_code_id;
END;
$$;

-- Get merchant QR source performance
CREATE OR REPLACE FUNCTION get_merchant_qr_source_performance(p_merchant_id UUID)
RETURNS TABLE (
  source TEXT,
  qr_count BIGINT,
  total_scans BIGINT,
  avg_scans_per_qr NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    qc.source,
    COUNT(DISTINCT qc.id)::BIGINT as qr_count,
    COALESCE(SUM(qc.total_scans), 0)::BIGINT as total_scans,
    ROUND(AVG(qc.total_scans)::NUMERIC, 2) as avg_scans_per_qr
  FROM qr_codes qc
  WHERE qc.merchant_id = p_merchant_id
    AND qc.source IS NOT NULL
  GROUP BY qc.source
  ORDER BY total_scans DESC;
END;
$$;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE qr_codes IS 'QR codes for merchants - URL-based or WiFi';
COMMENT ON TABLE qr_scans IS 'Analytics tracking for QR code scans';
COMMENT ON COLUMN qr_codes.short_code IS 'Unique short code for URL redirection (e.g., abc123)';
COMMENT ON COLUMN qr_codes.design IS 'JSON with design options: colors, logo, pattern, frame';
COMMENT ON COLUMN qr_codes.context IS 'Usage context: table (in-venue), external (marketing), takeaway, delivery';
COMMENT ON COLUMN qr_codes.source IS 'Traffic source: google_maps, instagram, facebook, event, flyer, table';
