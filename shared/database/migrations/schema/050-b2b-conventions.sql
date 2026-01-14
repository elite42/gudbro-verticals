-- ============================================================================
-- B2B-CONVENTIONS: Corporate Partnership System
-- Migration 050
-- ============================================================================
-- Sistema di convenzioni aziendali per uffici, palestre, scuole e altri partner B2B.
-- Collegato a AI-ZONE-INTEL per discovery automatica.
--
-- Tabelle:
-- 1. office_partners - Registro uffici/aziende partner
-- 2. merchant_office_outreach - Pipeline CRM per uffici
-- 3. partner_conventions - Convenzioni attive merchant-partner
-- 4. convention_vouchers - Voucher individuali per utenti
-- 5. convention_redemptions - Tracking utilizzo convenzioni
-- ============================================================================

-- ============================================================================
-- 1. OFFICE PARTNERS (Registro uffici/aziende)
-- ============================================================================

CREATE TABLE IF NOT EXISTS office_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  company_name TEXT NOT NULL,
  industry TEXT CHECK (industry IN (
    'tech', 'legal', 'finance', 'healthcare', 'retail',
    'manufacturing', 'education', 'government', 'other'
  )),
  partner_type TEXT NOT NULL DEFAULT 'office' CHECK (partner_type IN (
    'office', 'gym', 'school', 'coworking', 'hospital', 'other'
  )),

  -- Location
  address TEXT,
  city TEXT NOT NULL,
  country_code TEXT NOT NULL DEFAULT 'IT',
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  distance_to_merchant_m INTEGER,

  -- Size
  employee_count INTEGER,
  floors_occupied INTEGER,
  building_name TEXT,

  -- Contacts
  hr_contact_name TEXT,
  hr_contact_email TEXT,
  hr_contact_phone TEXT,
  office_manager_name TEXT,
  office_manager_email TEXT,
  office_manager_phone TEXT,
  reception_phone TEXT,

  -- Characteristics
  has_canteen BOOLEAN DEFAULT false,
  canteen_quality TEXT CHECK (canteen_quality IN ('none', 'basic', 'good', 'excellent')),
  lunch_break_start TIME,
  lunch_break_end TIME,
  wfh_policy TEXT CHECK (wfh_policy IN ('full_office', 'hybrid', 'mostly_remote', 'full_remote')),

  -- Metadata
  data_source TEXT CHECK (data_source IN ('manual', 'google_places', 'ai_enriched', 'linkedin')),
  source_id TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. MERCHANT OFFICE OUTREACH (Pipeline CRM)
-- ============================================================================

CREATE TABLE IF NOT EXISTS merchant_office_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  office_id UUID NOT NULL REFERENCES office_partners(id) ON DELETE CASCADE,

  -- Pipeline status
  status TEXT NOT NULL DEFAULT 'suggested' CHECK (status IN (
    'suggested', 'contacted', 'meeting_scheduled',
    'negotiating', 'active', 'declined', 'no_response'
  )),

  -- Proposed convention
  proposed_benefit_type TEXT CHECK (proposed_benefit_type IN (
    'percentage_discount', 'fixed_discount', 'free_item',
    'special_price', 'points_multiplier'
  )),
  proposed_benefit_value DECIMAL(10, 2),
  proposed_benefit_description TEXT,

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  meeting_date DATE,
  meeting_notes TEXT,
  contract_signed_at DATE,

  -- Contact method
  contact_method TEXT CHECK (contact_method IN ('email', 'phone', 'in_person', 'linkedin')),
  contact_person TEXT,

  -- Results
  employees_enrolled INTEGER DEFAULT 0,
  monthly_visits INTEGER DEFAULT 0,
  monthly_revenue DECIMAL(10, 2) DEFAULT 0,

  -- AI Recommendations
  ai_score DECIMAL(5, 2),
  ai_recommendation TEXT,
  ai_reasoning TEXT,

  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, office_id)
);

-- ============================================================================
-- 3. PARTNER CONVENTIONS (Convenzioni attive)
-- ============================================================================

CREATE TABLE IF NOT EXISTS partner_conventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Partner (polymorphic: può essere tour_op, hotel, office, etc.)
  partner_type TEXT NOT NULL CHECK (partner_type IN (
    'tour_operator', 'accommodation', 'office', 'gym', 'school', 'other'
  )),
  partner_id UUID NOT NULL,
  partner_name TEXT NOT NULL,

  -- Convention name and slug
  convention_name TEXT NOT NULL,
  convention_slug TEXT,

  -- Benefit
  benefit_type TEXT NOT NULL CHECK (benefit_type IN (
    'percentage_discount',      -- 10% off
    'fixed_discount',           -- €2 off
    'free_item',                -- Free coffee with lunch
    'special_price',            -- Fixed menu €8
    'points_multiplier'         -- 2x loyalty points
  )),
  benefit_value DECIMAL(10, 2),
  benefit_description TEXT,
  benefit_conditions TEXT,
  free_item_id UUID,

  -- Validity
  valid_from DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until DATE,
  valid_days INTEGER[] DEFAULT '{1,2,3,4,5}',
  valid_time_start TIME DEFAULT '00:00',
  valid_time_end TIME DEFAULT '23:59',

  -- Verification method
  verification_method TEXT NOT NULL DEFAULT 'link' CHECK (verification_method IN (
    'link',           -- Direct link with embedded code
    'qr_scan',        -- Partner displays QR, users scan
    'daily_code',     -- Daily rotating code
    'badge_id',       -- Employee badge number
    'automatic'       -- Geofencing/recognition (future)
  )),
  daily_code_prefix TEXT,
  current_daily_code TEXT,
  daily_code_generated_at DATE,

  -- Limits
  max_uses_total INTEGER,
  max_uses_per_user INTEGER DEFAULT 1,
  max_uses_period TEXT DEFAULT 'day' CHECK (max_uses_period IN ('day', 'week', 'month', 'total')),
  current_uses INTEGER DEFAULT 0,

  -- Minimum requirements
  min_order_amount DECIMAL(10, 2),
  min_party_size INTEGER DEFAULT 1,

  -- Status
  is_active BOOLEAN DEFAULT true,
  paused_reason TEXT,

  -- Analytics
  total_redemptions INTEGER DEFAULT 0,
  total_revenue_generated DECIMAL(10, 2) DEFAULT 0,
  avg_order_value DECIMAL(10, 2),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, partner_type, partner_id, convention_name)
);

-- ============================================================================
-- 4. CONVENTION VOUCHERS (Voucher individuali)
-- ============================================================================

CREATE TABLE IF NOT EXISTS convention_vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  convention_id UUID NOT NULL REFERENCES partner_conventions(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Unique identifier
  voucher_code TEXT UNIQUE NOT NULL,
  short_url TEXT,
  qr_data TEXT,

  -- User info
  user_id UUID REFERENCES accounts(id),
  user_identifier TEXT,
  user_name TEXT,
  user_email TEXT,
  user_phone TEXT,
  badge_number TEXT,

  -- Validity
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT true,
  deactivated_at TIMESTAMPTZ,
  deactivated_reason TEXT,

  -- Usage tracking
  last_used_at TIMESTAMPTZ,
  total_savings DECIMAL(10, 2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID
);

-- ============================================================================
-- 5. CONVENTION REDEMPTIONS (Tracking utilizzo)
-- ============================================================================

CREATE TABLE IF NOT EXISTS convention_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID REFERENCES convention_vouchers(id),
  convention_id UUID NOT NULL REFERENCES partner_conventions(id),
  merchant_id UUID NOT NULL REFERENCES merchants(id),

  -- Transaction details
  order_id UUID,
  original_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  final_amount DECIMAL(10, 2),

  -- Items (for reporting)
  items_summary TEXT,
  party_size INTEGER DEFAULT 1,

  -- How verified
  verification_method TEXT NOT NULL,
  verification_code TEXT,
  verified_by_staff UUID,

  -- Location/context
  pos_terminal_id TEXT,

  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Office Partners
CREATE INDEX IF NOT EXISTS idx_office_partners_city ON office_partners(city);
CREATE INDEX IF NOT EXISTS idx_office_partners_type ON office_partners(partner_type);
CREATE INDEX IF NOT EXISTS idx_office_partners_industry ON office_partners(industry);
CREATE INDEX IF NOT EXISTS idx_office_partners_active ON office_partners(is_active);

-- Merchant Office Outreach
CREATE INDEX IF NOT EXISTS idx_office_outreach_merchant ON merchant_office_outreach(merchant_id);
CREATE INDEX IF NOT EXISTS idx_office_outreach_status ON merchant_office_outreach(status);
CREATE INDEX IF NOT EXISTS idx_office_outreach_office ON merchant_office_outreach(office_id);

-- Partner Conventions
CREATE INDEX IF NOT EXISTS idx_conventions_merchant ON partner_conventions(merchant_id);
CREATE INDEX IF NOT EXISTS idx_conventions_partner ON partner_conventions(partner_type, partner_id);
CREATE INDEX IF NOT EXISTS idx_conventions_active ON partner_conventions(is_active);
CREATE INDEX IF NOT EXISTS idx_conventions_valid ON partner_conventions(valid_from, valid_until);

-- Convention Vouchers
CREATE INDEX IF NOT EXISTS idx_vouchers_code ON convention_vouchers(voucher_code);
CREATE INDEX IF NOT EXISTS idx_vouchers_convention ON convention_vouchers(convention_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_user ON convention_vouchers(user_id);
CREATE INDEX IF NOT EXISTS idx_vouchers_active ON convention_vouchers(is_active);

-- Convention Redemptions
CREATE INDEX IF NOT EXISTS idx_redemptions_convention ON convention_redemptions(convention_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_merchant ON convention_redemptions(merchant_id);
CREATE INDEX IF NOT EXISTS idx_redemptions_date ON convention_redemptions(redeemed_at);
CREATE INDEX IF NOT EXISTS idx_redemptions_voucher ON convention_redemptions(voucher_id);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_conventions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_office_partners_updated_at
  BEFORE UPDATE ON office_partners
  FOR EACH ROW EXECUTE FUNCTION update_conventions_updated_at();

CREATE TRIGGER update_office_outreach_updated_at
  BEFORE UPDATE ON merchant_office_outreach
  FOR EACH ROW EXECUTE FUNCTION update_conventions_updated_at();

CREATE TRIGGER update_partner_conventions_updated_at
  BEFORE UPDATE ON partner_conventions
  FOR EACH ROW EXECUTE FUNCTION update_conventions_updated_at();

-- Auto-generate daily codes
CREATE OR REPLACE FUNCTION generate_daily_convention_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.verification_method = 'daily_code' AND NEW.daily_code_prefix IS NOT NULL THEN
    IF NEW.daily_code_generated_at IS NULL OR NEW.daily_code_generated_at < CURRENT_DATE THEN
      NEW.current_daily_code = NEW.daily_code_prefix || '-' || TO_CHAR(CURRENT_DATE, 'MMDD');
      NEW.daily_code_generated_at = CURRENT_DATE;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_generate_daily_code
  BEFORE INSERT OR UPDATE ON partner_conventions
  FOR EACH ROW EXECUTE FUNCTION generate_daily_convention_code();

-- Update convention stats on redemption
CREATE OR REPLACE FUNCTION update_convention_stats_on_redemption()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE partner_conventions
  SET
    total_redemptions = total_redemptions + 1,
    total_revenue_generated = total_revenue_generated + COALESCE(NEW.final_amount, 0),
    current_uses = current_uses + 1
  WHERE id = NEW.convention_id;

  -- Update voucher usage
  IF NEW.voucher_id IS NOT NULL THEN
    UPDATE convention_vouchers
    SET
      times_used = times_used + 1,
      last_used_at = NOW(),
      total_savings = total_savings + COALESCE(NEW.discount_amount, 0)
    WHERE id = NEW.voucher_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stats_on_redemption
  AFTER INSERT ON convention_redemptions
  FOR EACH ROW EXECUTE FUNCTION update_convention_stats_on_redemption();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE office_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_office_outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_conventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE convention_vouchers ENABLE ROW LEVEL SECURITY;
ALTER TABLE convention_redemptions ENABLE ROW LEVEL SECURITY;

-- Office Partners: Public read for authenticated users, write for service_role
CREATE POLICY "office_partners_read_authenticated"
  ON office_partners FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "office_partners_write_service_role"
  ON office_partners FOR ALL TO authenticated
  USING (auth.role() = 'service_role');

-- Merchant Office Outreach: Merchant staff access
CREATE POLICY "office_outreach_merchant_staff"
  ON merchant_office_outreach FOR ALL TO authenticated
  USING (
    (merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid() AND ar.role_type = 'merchant'
    )) OR (auth.role() = 'service_role')
  );

-- Partner Conventions: Merchant staff access
CREATE POLICY "conventions_merchant_staff"
  ON partner_conventions FOR ALL TO authenticated
  USING (
    (merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid() AND ar.role_type = 'merchant'
    )) OR (auth.role() = 'service_role')
  );

-- Convention Vouchers: User read own, merchant staff manage
CREATE POLICY "vouchers_user_read"
  ON convention_vouchers FOR SELECT TO authenticated
  USING (
    user_id = auth.uid()
    OR merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid() AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

CREATE POLICY "vouchers_merchant_write"
  ON convention_vouchers FOR ALL TO authenticated
  USING (
    (merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid() AND ar.role_type = 'merchant'
    )) OR (auth.role() = 'service_role')
  );

-- Convention Redemptions: Merchant staff access
CREATE POLICY "redemptions_merchant_staff"
  ON convention_redemptions FOR ALL TO authenticated
  USING (
    (merchant_id IN (
      SELECT ar.tenant_id
      FROM account_roles ar
      WHERE ar.account_id = auth.uid() AND ar.role_type = 'merchant'
    )) OR (auth.role() = 'service_role')
  );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Generate unique voucher code
CREATE OR REPLACE FUNCTION generate_voucher_code(prefix TEXT DEFAULT 'CONV')
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    code := prefix || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8));
    SELECT EXISTS(SELECT 1 FROM convention_vouchers WHERE voucher_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Validate voucher for redemption
CREATE OR REPLACE FUNCTION validate_voucher(
  p_voucher_code TEXT,
  p_merchant_id UUID
)
RETURNS TABLE(
  is_valid BOOLEAN,
  error_message TEXT,
  convention_id UUID,
  voucher_id UUID,
  benefit_type TEXT,
  benefit_value DECIMAL,
  partner_name TEXT
) AS $$
DECLARE
  v_voucher convention_vouchers%ROWTYPE;
  v_convention partner_conventions%ROWTYPE;
  v_current_day INTEGER;
  v_current_time TIME;
BEGIN
  -- Find voucher
  SELECT * INTO v_voucher FROM convention_vouchers cv WHERE cv.voucher_code = p_voucher_code;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Voucher not found'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check voucher is active
  IF NOT v_voucher.is_active THEN
    RETURN QUERY SELECT false, 'Voucher is deactivated'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check voucher validity period
  IF v_voucher.valid_until IS NOT NULL AND v_voucher.valid_until < NOW() THEN
    RETURN QUERY SELECT false, 'Voucher has expired'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check usage limit
  IF v_voucher.times_used >= v_voucher.max_uses THEN
    RETURN QUERY SELECT false, 'Voucher usage limit reached'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Find convention
  SELECT * INTO v_convention FROM partner_conventions pc WHERE pc.id = v_voucher.convention_id;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 'Convention not found'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check convention is active
  IF NOT v_convention.is_active THEN
    RETURN QUERY SELECT false, 'Convention is not active'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check merchant matches
  IF v_convention.merchant_id != p_merchant_id THEN
    RETURN QUERY SELECT false, 'Voucher not valid at this location'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check day validity
  v_current_day := EXTRACT(DOW FROM NOW())::INTEGER;
  IF NOT (v_current_day = ANY(v_convention.valid_days)) THEN
    RETURN QUERY SELECT false, 'Convention not valid today'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Check time validity
  v_current_time := LOCALTIME;
  IF v_current_time < v_convention.valid_time_start OR v_current_time > v_convention.valid_time_end THEN
    RETURN QUERY SELECT false, 'Convention not valid at this time'::TEXT, NULL::UUID, NULL::UUID, NULL::TEXT, NULL::DECIMAL, NULL::TEXT;
    RETURN;
  END IF;

  -- Valid!
  RETURN QUERY SELECT
    true,
    NULL::TEXT,
    v_convention.id,
    v_voucher.id,
    v_convention.benefit_type,
    v_convention.benefit_value,
    v_convention.partner_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GRANTS
-- ============================================================================

GRANT SELECT ON office_partners TO authenticated;
GRANT ALL ON merchant_office_outreach TO authenticated;
GRANT ALL ON partner_conventions TO authenticated;
GRANT ALL ON convention_vouchers TO authenticated;
GRANT ALL ON convention_redemptions TO authenticated;

GRANT EXECUTE ON FUNCTION generate_voucher_code TO authenticated;
GRANT EXECUTE ON FUNCTION validate_voucher TO authenticated;
