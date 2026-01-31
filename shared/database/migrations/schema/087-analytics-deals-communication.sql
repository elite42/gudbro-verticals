-- ============================================================================
-- Migration 087: Analytics, Deals & Communication Foundation
-- ============================================================================
-- Date: 2026-01-31
-- Description: Creates tables for local deals/partnerships, deal click tracking,
--              and email communication logs. Foundation for Phase 24 plans 02/03.
--
-- Tables:
--   - accom_deals: Local partner deals shown to guests during stay
--   - accom_deal_clicks: Click tracking for deal engagement analytics
--   - accom_email_logs: Email send history for booking communications
--
-- Depends on: 077-accommodations-schema.sql (accom_properties, accom_bookings)
-- ============================================================================

-- ============================================================================
-- 1. CREATE accom_deals (local partner deals)
-- ============================================================================

CREATE TABLE accom_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES accom_properties(id) ON DELETE CASCADE,
  partner_name TEXT NOT NULL,
  discount_description TEXT NOT NULL,
  description TEXT,
  url TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 2. CREATE accom_deal_clicks (click tracking)
-- ============================================================================

CREATE TABLE accom_deal_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES accom_deals(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES accom_bookings(id) ON DELETE SET NULL,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. CREATE accom_email_logs (email communication history)
-- ============================================================================

CREATE TABLE accom_email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES accom_bookings(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL CHECK (email_type IN ('booking_confirmation', 'pre_arrival')),
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'skipped')),
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 4. INDEXES
-- ============================================================================

CREATE INDEX idx_accom_deals_property ON accom_deals(property_id);
CREATE INDEX idx_accom_deal_clicks_deal ON accom_deal_clicks(deal_id);
CREATE INDEX idx_accom_email_logs_booking_type ON accom_email_logs(booking_id, email_type);

-- ============================================================================
-- 5. TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS update_accom_deals_updated_at ON accom_deals;
CREATE TRIGGER update_accom_deals_updated_at
  BEFORE UPDATE ON accom_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE accom_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_deal_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE accom_email_logs ENABLE ROW LEVEL SECURITY;

-- Deals: owner manages via property_id
CREATE POLICY accom_deals_owner_manage
  ON accom_deals FOR ALL TO authenticated
  USING (property_id IN (
    SELECT id FROM accom_properties
    WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
  ));

-- Deal clicks: owner views via deal -> property chain
CREATE POLICY accom_deal_clicks_owner_manage
  ON accom_deal_clicks FOR ALL TO authenticated
  USING (deal_id IN (
    SELECT id FROM accom_deals
    WHERE property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  ));

-- Email logs: owner views via booking -> property chain
CREATE POLICY accom_email_logs_owner_manage
  ON accom_email_logs FOR ALL TO authenticated
  USING (booking_id IN (
    SELECT id FROM accom_bookings
    WHERE property_id IN (
      SELECT id FROM accom_properties
      WHERE owner_id IN (SELECT id FROM accounts WHERE auth_id = auth.uid())
    )
  ));

-- ============================================================================
-- 7. ROLE GRANTS
-- ============================================================================

GRANT ALL ON accom_deals TO authenticated;
GRANT ALL ON accom_deal_clicks TO authenticated;
GRANT ALL ON accom_email_logs TO authenticated;

-- ============================================================================
-- 8. COMMENTS
-- ============================================================================

COMMENT ON TABLE accom_deals IS 'Local partner deals shown to guests during their stay. Managed by property owner.';
COMMENT ON TABLE accom_deal_clicks IS 'Click tracking for deal engagement. Links to booking for attribution.';
COMMENT ON TABLE accom_email_logs IS 'Email send log for booking communications (confirmation, pre-arrival).';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
