-- Migration: 051-holidays-database
-- Description: Centralized holidays database for AI intelligence
-- Created: 2026-01-15
-- Feature: HOLIDAYS-DB (P2)

-- ============================================================================
-- HOLIDAYS TABLE
-- ============================================================================
-- Centralized repository of holidays per country/city for AI to understand
-- business impact (busy days, closed days, special events)

CREATE TABLE IF NOT EXISTS holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Location
  country_code TEXT NOT NULL,          -- ISO 3166-1 alpha-2 (e.g., 'VN', 'IT', 'US')
  region_code TEXT,                     -- Region/State code (e.g., 'HCM', 'CA', 'MI')
  city TEXT,                            -- City name (e.g., 'Ho Chi Minh City', 'Milan')

  -- Holiday info
  date DATE NOT NULL,
  name TEXT NOT NULL,                   -- Holiday name in local language
  name_en TEXT,                         -- Holiday name in English

  -- Classification
  type TEXT NOT NULL CHECK (type IN (
    'national',      -- National public holiday
    'religious',     -- Religious holiday (Easter, Eid, Lunar New Year)
    'local',         -- City/town specific (patron saint, local festival)
    'regional',      -- Region/state specific
    'sporting',      -- Major sporting events (World Cup, Olympics)
    'cultural',      -- Cultural events (Carnival, Oktoberfest)
    'observance',    -- Awareness days (not public holiday)
    'school',        -- School holidays
    'bank'           -- Bank holidays
  )),

  -- Business impact
  impact_level TEXT NOT NULL DEFAULT 'medium' CHECK (impact_level IN (
    'critical',   -- Business must adapt (closed, special hours)
    'high',       -- Significant impact (40%+ traffic change)
    'medium',     -- Moderate impact (20-40% traffic change)
    'low',        -- Minor impact (<20% change)
    'none'        -- Observance only, no business impact
  )),

  is_public_holiday BOOLEAN NOT NULL DEFAULT false,
  is_bank_holiday BOOLEAN NOT NULL DEFAULT false,

  -- Recurrence
  is_recurring BOOLEAN NOT NULL DEFAULT true,
  recurrence_rule TEXT,                 -- For variable dates: 'easter+1', '3rd-monday-january'

  -- Notes
  notes TEXT,                           -- Additional info for AI
  business_notes TEXT,                  -- Business-specific notes (e.g., "expect 50% more takeaway")

  -- Source tracking
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN (
    'manual',         -- Manually added
    'api',            -- From external API (Calendarific, etc.)
    'merchant',       -- Crowdsourced from merchant
    'ai_discovered'   -- AI found and suggested
  )),
  source_reference TEXT,                -- API ID or reference

  -- Verification
  is_verified BOOLEAN NOT NULL DEFAULT false,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id),

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Primary lookups
CREATE INDEX IF NOT EXISTS idx_holidays_country_date
  ON holidays(country_code, date);

CREATE INDEX IF NOT EXISTS idx_holidays_date
  ON holidays(date);

-- Location-based lookups
CREATE INDEX IF NOT EXISTS idx_holidays_country_region
  ON holidays(country_code, region_code)
  WHERE region_code IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_holidays_city
  ON holidays(country_code, city)
  WHERE city IS NOT NULL;

-- Type and impact filtering
CREATE INDEX IF NOT EXISTS idx_holidays_type
  ON holidays(type);

CREATE INDEX IF NOT EXISTS idx_holidays_impact
  ON holidays(impact_level);

-- Note: Partial index with CURRENT_DATE not possible (not immutable)
-- Use idx_holidays_date for date range queries

-- ============================================================================
-- MERCHANT HOLIDAY OVERRIDES
-- ============================================================================
-- Merchants can customize holiday impact for their specific business

CREATE TABLE IF NOT EXISTS merchant_holiday_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  holiday_id UUID NOT NULL REFERENCES holidays(id) ON DELETE CASCADE,

  -- Override values (null = use default from holidays table)
  custom_impact_level TEXT CHECK (custom_impact_level IN (
    'critical', 'high', 'medium', 'low', 'none'
  )),

  is_closed BOOLEAN,                    -- Merchant closes on this day
  special_hours TEXT,                   -- Modified hours (e.g., "10:00-14:00")
  custom_notes TEXT,                    -- Merchant's notes

  -- Expected impact (for AI learning)
  expected_revenue_change INTEGER,      -- Percentage (-100 to +200)
  expected_traffic_change INTEGER,      -- Percentage (-100 to +200)

  -- Tracking
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(merchant_id, holiday_id)
);

-- Index for merchant lookups
CREATE INDEX IF NOT EXISTS idx_merchant_holiday_overrides_merchant
  ON merchant_holiday_overrides(merchant_id);

-- ============================================================================
-- CUSTOM MERCHANT HOLIDAYS
-- ============================================================================
-- Merchants can add their own important dates (anniversaries, local events)

CREATE TABLE IF NOT EXISTS merchant_custom_holidays (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  date DATE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'local' CHECK (type IN (
    'anniversary',     -- Business anniversary
    'local_event',     -- Local event (street fair, concert)
    'sports',          -- Nearby sporting event
    'convention',      -- Convention/conference nearby
    'school',          -- School event (graduation, etc.)
    'other'
  )),

  impact_level TEXT NOT NULL DEFAULT 'medium' CHECK (impact_level IN (
    'critical', 'high', 'medium', 'low', 'none'
  )),

  is_closed BOOLEAN NOT NULL DEFAULT false,
  special_hours TEXT,
  notes TEXT,

  -- Recurrence
  is_recurring BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for merchant lookups
CREATE INDEX IF NOT EXISTS idx_merchant_custom_holidays_merchant
  ON merchant_custom_holidays(merchant_id);

CREATE INDEX IF NOT EXISTS idx_merchant_custom_holidays_date
  ON merchant_custom_holidays(merchant_id, date);

-- ============================================================================
-- TRIGGER: Updated at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_holidays_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE TRIGGER trigger_holidays_updated_at
  BEFORE UPDATE ON holidays
  FOR EACH ROW
  EXECUTE FUNCTION update_holidays_updated_at();

CREATE TRIGGER trigger_merchant_holiday_overrides_updated_at
  BEFORE UPDATE ON merchant_holiday_overrides
  FOR EACH ROW
  EXECUTE FUNCTION update_holidays_updated_at();

CREATE TRIGGER trigger_merchant_custom_holidays_updated_at
  BEFORE UPDATE ON merchant_custom_holidays
  FOR EACH ROW
  EXECUTE FUNCTION update_holidays_updated_at();

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

ALTER TABLE holidays ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_holiday_overrides ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_custom_holidays ENABLE ROW LEVEL SECURITY;

-- Holidays: Public read, service_role write
CREATE POLICY holidays_select_all ON holidays
  FOR SELECT USING (true);

CREATE POLICY holidays_service_role ON holidays
  FOR ALL USING (auth.role() = 'service_role');

-- Merchant overrides: Only merchant staff can access
CREATE POLICY merchant_holiday_overrides_staff ON merchant_holiday_overrides
  FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.tenant_type = 'location'
        AND ar.is_active = true
    )
  );

-- Custom holidays: Same pattern
CREATE POLICY merchant_custom_holidays_staff ON merchant_custom_holidays
  FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
        AND ar.tenant_type = 'location'
        AND ar.is_active = true
    )
  );

-- Service role full access for both
CREATE POLICY merchant_holiday_overrides_service ON merchant_holiday_overrides
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY merchant_custom_holidays_service ON merchant_custom_holidays
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================================
-- SEED DATA: Major Vietnamese holidays
-- ============================================================================

INSERT INTO holidays (country_code, date, name, name_en, type, impact_level, is_public_holiday, is_recurring, notes, source)
VALUES
  -- Tet (Lunar New Year) - dates vary, these are 2026 approximations
  ('VN', '2026-01-29', 'Tết Nguyên Đán', 'Lunar New Year''s Eve', 'national', 'critical', true, true, 'Biggest holiday. Most businesses close 3-7 days.', 'manual'),
  ('VN', '2026-01-30', 'Tết Nguyên Đán', 'Lunar New Year Day 1', 'national', 'critical', true, true, 'First day of Tet. Everything closed.', 'manual'),
  ('VN', '2026-01-31', 'Tết Nguyên Đán', 'Lunar New Year Day 2', 'national', 'critical', true, true, 'Second day of Tet. Most closed.', 'manual'),
  ('VN', '2026-02-01', 'Tết Nguyên Đán', 'Lunar New Year Day 3', 'national', 'critical', true, true, 'Third day of Tet. Some reopen.', 'manual'),
  ('VN', '2026-02-02', 'Tết Nguyên Đán', 'Lunar New Year Day 4', 'national', 'high', true, true, 'Fourth day. More businesses open.', 'manual'),

  -- Other major holidays
  ('VN', '2026-04-30', 'Ngày Giải phóng miền Nam', 'Reunification Day', 'national', 'high', true, true, 'National holiday. Many closed.', 'manual'),
  ('VN', '2026-05-01', 'Ngày Quốc tế Lao động', 'International Labor Day', 'national', 'high', true, true, 'Labor Day. Many closed.', 'manual'),
  ('VN', '2026-09-02', 'Ngày Quốc khánh', 'National Day', 'national', 'high', true, true, 'Independence Day. Many closed.', 'manual'),

  -- Observances
  ('VN', '2026-02-14', 'Ngày lễ tình nhân', 'Valentine''s Day', 'observance', 'medium', false, true, 'Popular for restaurants. Expect +30% dinner traffic.', 'manual'),
  ('VN', '2026-03-08', 'Ngày Quốc tế Phụ nữ', 'International Women''s Day', 'observance', 'medium', false, true, 'Popular for gifts and dining out.', 'manual'),
  ('VN', '2026-10-20', 'Ngày Phụ nữ Việt Nam', 'Vietnamese Women''s Day', 'observance', 'medium', false, true, 'Very popular for restaurants.', 'manual')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- HELPER VIEW: Upcoming holidays for a location
-- ============================================================================

CREATE OR REPLACE VIEW upcoming_holidays AS
SELECT
  h.*,
  h.date - CURRENT_DATE AS days_until
FROM holidays h
WHERE h.date >= CURRENT_DATE
ORDER BY h.date ASC;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE holidays IS 'Centralized holidays database for AI business intelligence';
COMMENT ON TABLE merchant_holiday_overrides IS 'Merchant-specific overrides for global holidays';
COMMENT ON TABLE merchant_custom_holidays IS 'Custom holidays added by merchants (anniversaries, local events)';

COMMENT ON COLUMN holidays.impact_level IS 'Expected business impact: critical (closed/special), high (40%+ change), medium (20-40%), low (<20%), none';
COMMENT ON COLUMN holidays.recurrence_rule IS 'For variable holidays: easter+1, 3rd-monday-january, lunar-1-1';
COMMENT ON COLUMN merchant_holiday_overrides.expected_revenue_change IS 'Percentage change expected: -100 (closed) to +200 (triple)';
