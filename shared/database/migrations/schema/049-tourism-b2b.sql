-- =====================================================
-- TOURISM-B2B: Partnership Hub for Tour Operators & Accommodations
-- Migration: 049
-- Date: 2026-01-14
--
-- Tables: 11
-- 1. tour_operators - Directory of tour operators
-- 2. tourist_pois - Points of interest
-- 3. accommodation_partners - Hotels, hostels, Airbnb hosts
-- 4. merchant_tour_operator_outreach - CRM pipeline for tour ops
-- 5. merchant_accommodation_outreach - CRM pipeline for accommodations
-- 6. partner_feedback - Network effect feedback
-- 7. ai_booking_config - AI automation settings
-- 8. group_booking_requests - Booking request pipeline
-- 9. booking_performance_history - ML training data
-- 10. tourism_product_templates - Reusable product templates
-- 11. merchant_tourism_products - Merchant-specific products
-- =====================================================

-- =====================================================
-- 1. TOUR OPERATORS
-- =====================================================
CREATE TABLE IF NOT EXISTS tour_operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,        -- ISO 3166-1 (IT, DE, US, CN, JP)
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  -- Type and specialization
  operator_type TEXT CHECK (operator_type IN (
    'bus_operator', 'luxury', 'religious', 'cultural',
    'budget', 'cruise', 'mice', 'school', 'senior'
  )),

  -- Geographic coverage
  regions_covered TEXT[],            -- ['lombardia', 'veneto', 'toscana']
  pois_visited TEXT[],               -- ['duomo_milano', 'colosseo', 'uffizi']

  -- Group characteristics (replacing INT4RANGE with min/max)
  typical_group_size_min INTEGER,
  typical_group_size_max INTEGER,
  meal_budget_min INTEGER,           -- EUR per person
  meal_budget_max INTEGER,

  -- Booking
  booking_method TEXT CHECK (booking_method IN (
    'direct', 'viator', 'getyourguide', 'civitatis', 'email'
  )),

  -- Quality and priority
  volume_estimate TEXT CHECK (volume_estimate IN ('high', 'medium', 'low')),
  response_rate DECIMAL(3,2),        -- Historical response rate (0.00-1.00)

  -- Metadata
  data_source TEXT CHECK (data_source IN ('manual', 'scraped', 'ai_enriched')),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tour_operators_country ON tour_operators(country_code);
CREATE INDEX IF NOT EXISTS idx_tour_operators_type ON tour_operators(operator_type);
CREATE INDEX IF NOT EXISTS idx_tour_operators_active ON tour_operators(is_active) WHERE is_active = true;

-- =====================================================
-- 2. TOURIST POIS (Points of Interest)
-- =====================================================
CREATE TABLE IF NOT EXISTS tourist_pois (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,         -- 'duomo_milano', 'colosseo'
  city TEXT NOT NULL,
  country_code TEXT NOT NULL,

  -- Location (using DECIMAL instead of GEOGRAPHY for consistency)
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),

  -- Visitor data
  annual_visitors INTEGER,           -- Estimated visitors/year
  peak_seasons TEXT[],               -- ['spring', 'summer']
  typical_visit_duration INTEGER,    -- Minutes

  -- Meal opportunity
  meal_opportunity TEXT CHECK (meal_opportunity IN ('lunch', 'dinner', 'both')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tourist_pois_city ON tourist_pois(city);
CREATE INDEX IF NOT EXISTS idx_tourist_pois_country ON tourist_pois(country_code);

-- =====================================================
-- 3. ACCOMMODATION PARTNERS
-- =====================================================
CREATE TABLE IF NOT EXISTS accommodation_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name TEXT NOT NULL,
  accommodation_type TEXT CHECK (accommodation_type IN (
    'hotel', 'hostel', 'airbnb_host', 'b_and_b', 'aparthotel'
  )),

  -- Location (using DECIMAL instead of GEOGRAPHY)
  address TEXT,
  city TEXT NOT NULL,
  country_code TEXT NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  distance_to_merchant_m INTEGER,    -- Calculated distance

  -- Contacts
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,

  -- Capacity
  room_count INTEGER,                -- Rooms/units
  avg_guests_per_day INTEGER,        -- Estimated guests/day
  star_rating DECIMAL(2,1),          -- 1.0 - 5.0

  -- Airbnb hosts specific
  properties_count INTEGER,          -- Number of managed properties
  is_superhost BOOLEAN,

  -- Guest characteristics
  guest_nationality_mix JSONB,       -- {"DE": 25, "US": 20, "IT": 15}
  avg_stay_nights DECIMAL(3,1),
  business_vs_leisure TEXT CHECK (business_vs_leisure IN ('business', 'leisure', 'mixed')),

  -- Services they need
  needs_breakfast BOOLEAN DEFAULT false,
  needs_lunch BOOLEAN DEFAULT false,
  needs_dinner BOOLEAN DEFAULT false,
  needs_recommendations BOOLEAN DEFAULT true,

  -- Metadata
  data_source TEXT CHECK (data_source IN ('google_maps', 'booking', 'airbnb', 'manual')),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_accommodation_city ON accommodation_partners(city);
CREATE INDEX IF NOT EXISTS idx_accommodation_type ON accommodation_partners(accommodation_type);
CREATE INDEX IF NOT EXISTS idx_accommodation_coords ON accommodation_partners(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_accommodation_active ON accommodation_partners(is_active) WHERE is_active = true;

-- =====================================================
-- 4. MERCHANT TOUR OPERATOR OUTREACH (CRM)
-- =====================================================
CREATE TABLE IF NOT EXISTS merchant_tour_operator_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  operator_id UUID NOT NULL REFERENCES tour_operators(id) ON DELETE CASCADE,

  -- Outreach status pipeline
  status TEXT DEFAULT 'suggested' CHECK (status IN (
    'suggested',           -- AI suggested
    'contacted',           -- Email/call sent
    'responded',           -- They responded
    'negotiating',         -- In negotiation
    'partnership_active',  -- Active agreement
    'declined',            -- They refused
    'no_response'          -- No response after X days
  )),

  -- Tracking timestamps
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,

  -- Content
  outreach_template_used TEXT,
  custom_message TEXT,

  -- Results
  partnership_terms JSONB,           -- Agreed menu, commissions, etc.
  bookings_generated INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, operator_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tour_outreach_merchant ON merchant_tour_operator_outreach(merchant_id);
CREATE INDEX IF NOT EXISTS idx_tour_outreach_status ON merchant_tour_operator_outreach(merchant_id, status);

-- =====================================================
-- 5. MERCHANT ACCOMMODATION OUTREACH (CRM)
-- =====================================================
CREATE TABLE IF NOT EXISTS merchant_accommodation_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  accommodation_id UUID NOT NULL REFERENCES accommodation_partners(id) ON DELETE CASCADE,

  -- Pipeline status
  status TEXT DEFAULT 'suggested' CHECK (status IN (
    'suggested',           -- AI suggested
    'contacted',           -- Email/call sent
    'responded',           -- They responded
    'negotiating',         -- In negotiation
    'partnership_active',  -- Active agreement
    'declined',            -- They refused
    'no_response'          -- No response after X days
  )),

  -- Partnership type proposed
  partnership_type TEXT CHECK (partnership_type IN (
    'breakfast_convention',    -- Breakfast agreement
    'lunch_convention',        -- Lunch
    'dinner_convention',       -- Dinner
    'discount_guests',         -- % discount for guests
    'recommendation_only',     -- Recommendation only
    'full_board'              -- Full board
  )),

  -- Agreement terms
  discount_percent INTEGER,          -- e.g., 10% guest discount
  commission_percent INTEGER,        -- e.g., 5% referral commission
  fixed_price_menu DECIMAL(10,2),    -- Fixed price convention menu

  -- Tracking timestamps
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,
  partnership_start_date DATE,
  partnership_end_date DATE,

  -- Results
  guests_referred INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,

  -- Notes
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, accommodation_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_accom_outreach_merchant ON merchant_accommodation_outreach(merchant_id);
CREATE INDEX IF NOT EXISTS idx_accom_outreach_status ON merchant_accommodation_outreach(merchant_id, status);

-- =====================================================
-- 6. PARTNER FEEDBACK (Network Effect)
-- =====================================================
CREATE TABLE IF NOT EXISTS partner_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  partner_type TEXT NOT NULL CHECK (partner_type IN ('tour_operator', 'accommodation')),
  partner_id UUID NOT NULL,
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  feedback_type TEXT NOT NULL CHECK (feedback_type IN (
    'contact_verified',     -- Contacts work
    'contact_wrong',        -- Wrong email/phone
    'closed_business',      -- Business closed
    'successful_deal',      -- Deal closed!
    'declined',             -- Not interested
    'wrong_info'            -- Wrong information
  )),

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_partner_feedback_partner ON partner_feedback(partner_type, partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_feedback_merchant ON partner_feedback(merchant_id);

-- =====================================================
-- 7. AI BOOKING CONFIG
-- =====================================================
CREATE TABLE IF NOT EXISTS ai_booking_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID UNIQUE NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Automation level
  automation_level TEXT DEFAULT 'suggest' CHECK (automation_level IN (
    'suggest',       -- AI suggests, manager decides
    'auto_routine',  -- AI decides for standard requests
    'full_auto'      -- AI manages everything
  )),

  -- Optimization weights (0-100, should total 100)
  weight_revenue INTEGER DEFAULT 50 CHECK (weight_revenue >= 0 AND weight_revenue <= 100),
  weight_occupancy INTEGER DEFAULT 30 CHECK (weight_occupancy >= 0 AND weight_occupancy <= 100),
  weight_relationships INTEGER DEFAULT 20 CHECK (weight_relationships >= 0 AND weight_relationships <= 100),

  -- Constraints
  min_margin_percent INTEGER DEFAULT 20,    -- Don't accept below X% margin
  max_group_percent INTEGER DEFAULT 60,     -- Max % capacity for groups
  blackout_dates DATE[],                    -- No-group dates (e.g., Valentine's)

  -- Partner preferences
  preferred_partners UUID[],                -- Partners to favor
  blocked_partners UUID[],                  -- Partners to avoid

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. GROUP BOOKING REQUESTS
-- =====================================================
CREATE TABLE IF NOT EXISTS group_booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  -- Source
  partner_type TEXT CHECK (partner_type IN ('tour_operator', 'accommodation', 'direct')),
  partner_id UUID,                          -- FK to tour_operators or accommodation_partners

  -- Request details
  requested_date DATE NOT NULL,
  requested_slot TEXT CHECK (requested_slot IN ('breakfast', 'lunch', 'dinner')),
  party_size INTEGER NOT NULL CHECK (party_size > 0),
  price_per_person DECIMAL(10,2),
  total_value DECIMAL(10,2) GENERATED ALWAYS AS (party_size * price_per_person) STORED,

  -- Menu/requirements
  menu_type TEXT,                           -- 'silver', 'gold', 'platinum', 'custom'
  dietary_requirements TEXT[],
  special_requests TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',              -- New request
    'ai_suggested_accept',  -- AI recommends accept
    'ai_suggested_decline', -- AI recommends decline
    'ai_suggested_counter', -- AI recommends counter-offer
    'accepted',             -- Accepted
    'declined',             -- Declined
    'countered',            -- Counter-offer sent
    'expired',              -- Request expired
    'cancelled'             -- Cancelled
  )),

  -- AI reasoning
  ai_recommendation TEXT,
  ai_reasoning TEXT,
  ai_expected_value DECIMAL(10,2),
  ai_confidence DECIMAL(3,2) CHECK (ai_confidence >= 0 AND ai_confidence <= 1),

  -- Counter offer
  counter_price_per_person DECIMAL(10,2),
  counter_date DATE,
  counter_slot TEXT,

  -- Tracking
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  decided_at TIMESTAMPTZ,
  decided_by TEXT,                          -- 'ai_auto', 'manager'

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_booking_requests_merchant_date ON group_booking_requests(merchant_id, requested_date);
CREATE INDEX IF NOT EXISTS idx_booking_requests_status ON group_booking_requests(status);
CREATE INDEX IF NOT EXISTS idx_booking_requests_pending ON group_booking_requests(merchant_id, status) WHERE status = 'pending';

-- =====================================================
-- 9. BOOKING PERFORMANCE HISTORY (ML Optimization)
-- =====================================================
CREATE TABLE IF NOT EXISTS booking_performance_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  date DATE NOT NULL,
  slot TEXT NOT NULL CHECK (slot IN ('breakfast', 'lunch', 'dinner')),

  -- Capacity
  total_capacity INTEGER,
  group_covers INTEGER DEFAULT 0,
  walkin_covers INTEGER DEFAULT 0,
  total_covers INTEGER DEFAULT 0,
  occupancy_percent DECIMAL(5,2),

  -- Revenue
  group_revenue DECIMAL(10,2) DEFAULT 0,
  walkin_revenue DECIMAL(10,2) DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,

  -- Averages
  avg_group_spend DECIMAL(10,2),
  avg_walkin_spend DECIMAL(10,2),

  -- For ML optimization
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  is_holiday BOOLEAN DEFAULT false,
  weather_conditions TEXT,
  special_events TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, date, slot)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_booking_performance_merchant ON booking_performance_history(merchant_id, date);
CREATE INDEX IF NOT EXISTS idx_booking_performance_dow ON booking_performance_history(merchant_id, day_of_week);

-- =====================================================
-- 10. TOURISM PRODUCT TEMPLATES
-- =====================================================
CREATE TABLE IF NOT EXISTS tourism_product_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  venue_type TEXT NOT NULL,          -- 'gelateria', 'enoteca', 'rooftop_bar'
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,

  -- Characteristics
  target TEXT CHECK (target IN ('tour_operator', 'accommodation', 'both')),
  duration_minutes INTEGER,

  -- Suggested pricing
  suggested_price_min DECIMAL(10,2),
  suggested_price_max DECIMAL(10,2),

  -- Capacity
  min_group_size INTEGER,
  max_group_size INTEGER,

  -- Description
  description_template TEXT,         -- With placeholders {venue_name}, {location}
  includes TEXT[],                   -- What's included

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(venue_type, product_slug)
);

-- =====================================================
-- 11. MERCHANT TOURISM PRODUCTS
-- =====================================================
CREATE TABLE IF NOT EXISTS merchant_tourism_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  template_id UUID REFERENCES tourism_product_templates(id) ON DELETE SET NULL,

  -- Template overrides
  custom_name TEXT,
  custom_price DECIMAL(10,2),
  custom_duration INTEGER,
  custom_min_group INTEGER,
  custom_max_group INTEGER,
  custom_description TEXT,
  custom_includes TEXT[],

  -- Availability
  available_days INTEGER[],          -- 0=Sun, 1=Mon, etc.
  available_slots TEXT[],            -- ['morning', 'afternoon', 'evening']
  max_per_day INTEGER,               -- Max groups/day for this product

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_merchant_products_merchant ON merchant_tourism_products(merchant_id);
CREATE INDEX IF NOT EXISTS idx_merchant_products_active ON merchant_tourism_products(merchant_id, is_active) WHERE is_active = true;

-- =====================================================
-- TRIGGERS FOR updated_at
-- =====================================================

-- Tour operators
CREATE TRIGGER update_tour_operators_updated_at
  BEFORE UPDATE ON tour_operators
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Accommodation partners
CREATE TRIGGER update_accommodation_partners_updated_at
  BEFORE UPDATE ON accommodation_partners
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Tour operator outreach
CREATE TRIGGER update_tour_operator_outreach_updated_at
  BEFORE UPDATE ON merchant_tour_operator_outreach
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Accommodation outreach
CREATE TRIGGER update_accommodation_outreach_updated_at
  BEFORE UPDATE ON merchant_accommodation_outreach
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- AI booking config
CREATE TRIGGER update_ai_booking_config_updated_at
  BEFORE UPDATE ON ai_booking_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Merchant tourism products
CREATE TRIGGER update_merchant_tourism_products_updated_at
  BEFORE UPDATE ON merchant_tourism_products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Tour operators: Public read for authenticated, service_role for write
ALTER TABLE tour_operators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tour_operators_select_authenticated"
  ON tour_operators FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "tour_operators_all_service_role"
  ON tour_operators FOR ALL TO authenticated
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Tourist POIs: Public read for authenticated
ALTER TABLE tourist_pois ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tourist_pois_select_authenticated"
  ON tourist_pois FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "tourist_pois_all_service_role"
  ON tourist_pois FOR ALL TO authenticated
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Accommodation partners: Public read, service_role for write
ALTER TABLE accommodation_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "accommodation_partners_select_authenticated"
  ON accommodation_partners FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "accommodation_partners_all_service_role"
  ON accommodation_partners FOR ALL TO authenticated
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Merchant tour operator outreach: Merchant staff only
ALTER TABLE merchant_tour_operator_outreach ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tour_outreach_merchant_staff"
  ON merchant_tour_operator_outreach FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  )
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

-- Merchant accommodation outreach: Merchant staff only
ALTER TABLE merchant_accommodation_outreach ENABLE ROW LEVEL SECURITY;

CREATE POLICY "accom_outreach_merchant_staff"
  ON merchant_accommodation_outreach FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  )
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

-- Partner feedback: Merchant staff can create, service_role for all
ALTER TABLE partner_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "partner_feedback_merchant_insert"
  ON partner_feedback FOR INSERT TO authenticated
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
  );

CREATE POLICY "partner_feedback_select"
  ON partner_feedback FOR SELECT TO authenticated
  USING (auth.role() = 'service_role');

CREATE POLICY "partner_feedback_all_service_role"
  ON partner_feedback FOR ALL TO authenticated
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- AI booking config: Merchant staff only
ALTER TABLE ai_booking_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ai_booking_config_merchant_staff"
  ON ai_booking_config FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  )
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

-- Group booking requests: Merchant staff only
ALTER TABLE group_booking_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "group_booking_requests_merchant_staff"
  ON group_booking_requests FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  )
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

-- Booking performance history: Merchant staff only
ALTER TABLE booking_performance_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "booking_performance_merchant_staff"
  ON booking_performance_history FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  )
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

-- Tourism product templates: Public read, service_role for write
ALTER TABLE tourism_product_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tourism_templates_select_authenticated"
  ON tourism_product_templates FOR SELECT TO authenticated
  USING (is_active = true);

CREATE POLICY "tourism_templates_all_service_role"
  ON tourism_product_templates FOR ALL TO authenticated
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Merchant tourism products: Merchant staff only
ALTER TABLE merchant_tourism_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchant_products_merchant_staff"
  ON merchant_tourism_products FOR ALL TO authenticated
  USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  )
  WITH CHECK (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type = 'merchant'
    )
    OR auth.role() = 'service_role'
  );

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE tour_operators IS 'Directory of tour operators for B2B partnerships';
COMMENT ON TABLE tourist_pois IS 'Points of interest near merchants for tourism matching';
COMMENT ON TABLE accommodation_partners IS 'Hotels, hostels, Airbnb hosts for accommodation partnerships';
COMMENT ON TABLE merchant_tour_operator_outreach IS 'CRM pipeline for tour operator outreach';
COMMENT ON TABLE merchant_accommodation_outreach IS 'CRM pipeline for accommodation partnerships';
COMMENT ON TABLE partner_feedback IS 'Crowdsourced feedback on partner data quality';
COMMENT ON TABLE ai_booking_config IS 'AI Booking Coordinator configuration per merchant';
COMMENT ON TABLE group_booking_requests IS 'Group booking request pipeline with AI recommendations';
COMMENT ON TABLE booking_performance_history IS 'Historical performance data for ML optimization';
COMMENT ON TABLE tourism_product_templates IS 'Reusable product templates for tourism offerings';
COMMENT ON TABLE merchant_tourism_products IS 'Merchant-specific tourism products based on templates';
