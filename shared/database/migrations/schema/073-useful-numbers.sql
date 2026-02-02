-- ============================================================================
-- USEFUL NUMBERS SYSTEM
-- ============================================================================
-- Version: 1.0.0
-- Date: 2026-01-23
-- Description: Emergency numbers, city services, merchant-specific contacts
--              3 livelli: Paese (emergenze), Città (servizi locali), Merchant
-- ============================================================================

-- ============================================================================
-- 1. EMERGENCY NUMBERS (LIVELLO PAESE - gestito GUDBRO)
-- ============================================================================

CREATE TABLE IF NOT EXISTS emergency_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('general', 'police', 'ambulance', 'fire')),
  phone_number TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(country_code, service_type)
);

-- ============================================================================
-- 2. CITY USEFUL NUMBERS (LIVELLO CITTA' - gestito GUDBRO)
-- ============================================================================

CREATE TABLE IF NOT EXISTS city_useful_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  country_code TEXT NOT NULL,
  city_name TEXT NOT NULL,
  label TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('taxi', 'pharmacy', 'hospital', 'police_local', 'medical_guard', 'embassy', 'tourist_info', 'other')),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. MERCHANT USEFUL NUMBERS (LIVELLO MERCHANT)
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_useful_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. ERROR REPORTS (segnalazioni merchant)
-- ============================================================================

CREATE TABLE IF NOT EXISTS useful_numbers_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id),
  reported_by UUID NOT NULL REFERENCES accounts(id),
  reference_type TEXT NOT NULL CHECK (reference_type IN ('city', 'emergency')),
  reference_id UUID NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('wrong_number', 'outdated', 'closed', 'other')),
  description TEXT,
  suggested_fix TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'fixed', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_emergency_numbers_country ON emergency_numbers(country_code);
CREATE INDEX IF NOT EXISTS idx_city_useful_numbers_location ON city_useful_numbers(country_code, city_name);
CREATE INDEX IF NOT EXISTS idx_city_useful_numbers_active ON city_useful_numbers(country_code, city_name) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_merchant_useful_numbers_merchant ON merchant_useful_numbers(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_useful_numbers_active ON merchant_useful_numbers(merchant_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_useful_numbers_reports_status ON useful_numbers_reports(status) WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_useful_numbers_reports_merchant ON useful_numbers_reports(merchant_id);

-- ============================================================================
-- 6. RLS POLICIES
-- ============================================================================

ALTER TABLE emergency_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_useful_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_useful_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE useful_numbers_reports ENABLE ROW LEVEL SECURITY;

-- Emergency Numbers: read-only per tutti, write solo service_role
CREATE POLICY "Anyone can read emergency numbers"
  ON emergency_numbers FOR SELECT USING (true);

CREATE POLICY "Service role manages emergency numbers"
  ON emergency_numbers FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- City Numbers: read-only attivi per tutti, write solo service_role
CREATE POLICY "Anyone can read active city numbers"
  ON city_useful_numbers FOR SELECT USING (is_active = true);

CREATE POLICY "Service role manages city numbers"
  ON city_useful_numbers FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Merchant Numbers: CRUD per merchant
CREATE POLICY "Merchants can view their numbers"
  ON merchant_useful_numbers FOR SELECT
  USING (merchant_id IN (SELECT tenant_id FROM account_roles WHERE account_id = auth.uid()));

CREATE POLICY "Merchants can insert their numbers"
  ON merchant_useful_numbers FOR INSERT
  WITH CHECK (merchant_id IN (SELECT tenant_id FROM account_roles WHERE account_id = auth.uid()));

CREATE POLICY "Merchants can update their numbers"
  ON merchant_useful_numbers FOR UPDATE
  USING (merchant_id IN (SELECT tenant_id FROM account_roles WHERE account_id = auth.uid()));

CREATE POLICY "Merchants can delete their numbers"
  ON merchant_useful_numbers FOR DELETE
  USING (merchant_id IN (SELECT tenant_id FROM account_roles WHERE account_id = auth.uid()));

CREATE POLICY "Service role full access merchant numbers"
  ON merchant_useful_numbers FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Reports: merchants can create, service_role manages
CREATE POLICY "Merchants can create reports"
  ON useful_numbers_reports FOR INSERT
  WITH CHECK (merchant_id IN (SELECT tenant_id FROM account_roles WHERE account_id = auth.uid()));

CREATE POLICY "Merchants can view their reports"
  ON useful_numbers_reports FOR SELECT
  USING (merchant_id IN (SELECT tenant_id FROM account_roles WHERE account_id = auth.uid()));

CREATE POLICY "Service role manages reports"
  ON useful_numbers_reports FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================================================
-- 7. TRIGGERS
-- ============================================================================

-- Auto-update timestamp for emergency_numbers
CREATE OR REPLACE FUNCTION update_emergency_numbers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_emergency_numbers_timestamp ON emergency_numbers;
CREATE TRIGGER trigger_update_emergency_numbers_timestamp
  BEFORE UPDATE ON emergency_numbers
  FOR EACH ROW EXECUTE FUNCTION update_emergency_numbers_timestamp();

-- Auto-update timestamp for city_useful_numbers
CREATE OR REPLACE FUNCTION update_city_useful_numbers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_city_useful_numbers_timestamp ON city_useful_numbers;
CREATE TRIGGER trigger_update_city_useful_numbers_timestamp
  BEFORE UPDATE ON city_useful_numbers
  FOR EACH ROW EXECUTE FUNCTION update_city_useful_numbers_timestamp();

-- Auto-update timestamp for merchant_useful_numbers
CREATE OR REPLACE FUNCTION update_merchant_useful_numbers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_merchant_useful_numbers_timestamp ON merchant_useful_numbers;
CREATE TRIGGER trigger_update_merchant_useful_numbers_timestamp
  BEFORE UPDATE ON merchant_useful_numbers
  FOR EACH ROW EXECUTE FUNCTION update_merchant_useful_numbers_timestamp();

-- ============================================================================
-- 8. SEED DATA: Emergency Numbers
-- ============================================================================

INSERT INTO emergency_numbers (country_code, service_type, phone_number) VALUES
-- Italy
('IT', 'general', '112'),
('IT', 'police', '113'),
('IT', 'ambulance', '118'),
('IT', 'fire', '115'),
-- Germany
('DE', 'general', '112'),
('DE', 'police', '110'),
('DE', 'ambulance', '112'),
('DE', 'fire', '112'),
-- France
('FR', 'general', '112'),
('FR', 'police', '17'),
('FR', 'ambulance', '15'),
('FR', 'fire', '18'),
-- Spain
('ES', 'general', '112'),
('ES', 'police', '091'),
('ES', 'ambulance', '061'),
('ES', 'fire', '080'),
-- United Kingdom
('UK', 'general', '999'),
('UK', 'police', '999'),
('UK', 'ambulance', '999'),
('UK', 'fire', '999'),
-- United States
('US', 'general', '911'),
('US', 'police', '911'),
('US', 'ambulance', '911'),
('US', 'fire', '911'),
-- Vietnam
('VN', 'general', '113'),
('VN', 'police', '113'),
('VN', 'ambulance', '115'),
('VN', 'fire', '114')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 9. SEED DATA: Roma (prima citta')
-- ============================================================================

INSERT INTO city_useful_numbers (country_code, city_name, label, phone_number, category, sort_order) VALUES
('IT', 'Roma', 'Radiotaxi 3570', '+39 06 3570', 'taxi', 1),
('IT', 'Roma', 'Samarcanda Taxi', '+39 06 5551', 'taxi', 2),
('IT', 'Roma', 'Policlinico Umberto I', '+39 06 49971', 'hospital', 3),
('IT', 'Roma', 'Ospedale San Camillo', '+39 06 58701', 'hospital', 4),
('IT', 'Roma', 'Guardia Medica', '+39 06 570600', 'medical_guard', 5),
('IT', 'Roma', 'Turismo Roma', '+39 06 0608', 'tourist_info', 6),
('IT', 'Roma', 'Farmacia Notturna Centrale', '+39 06 4880019', 'pharmacy', 7)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 10. COMMENTS
-- ============================================================================

COMMENT ON TABLE emergency_numbers IS 'Emergency numbers per country (112, 911, etc). Managed by GUDBRO.';
COMMENT ON TABLE city_useful_numbers IS 'City services (taxi, hospitals, pharmacies). Managed by GUDBRO when opening a city.';
COMMENT ON TABLE merchant_useful_numbers IS 'Merchant-specific useful numbers for their zone.';
COMMENT ON TABLE useful_numbers_reports IS 'Merchant reports for incorrect city/emergency numbers.';

COMMENT ON COLUMN emergency_numbers.service_type IS 'general = unified emergency, police, ambulance, fire';
COMMENT ON COLUMN city_useful_numbers.category IS 'taxi, pharmacy, hospital, police_local, medical_guard, embassy, tourist_info, other';
COMMENT ON COLUMN useful_numbers_reports.reference_type IS 'city = city_useful_numbers, emergency = emergency_numbers';
COMMENT ON COLUMN useful_numbers_reports.report_type IS 'wrong_number, outdated, closed, other';
COMMENT ON COLUMN useful_numbers_reports.status IS 'pending, reviewed, fixed, rejected';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
