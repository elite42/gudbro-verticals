# TOURISM-B2B - Database Schema (SQL Dettagliato)

> Questo file contiene gli schema SQL completi per l'implementazione di TOURISM-B2B.
> Per la visione e workflow, vedi [TOURISM-B2B.md](./TOURISM-B2B.md)

---

## Tour Operators

```sql
CREATE TABLE tour_operators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identità
  name TEXT NOT NULL,
  country_code TEXT NOT NULL,        -- ISO 3166-1 (IT, DE, US, CN, JP)
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,

  -- Tipo e specializzazione
  operator_type TEXT CHECK (operator_type IN (
    'bus_operator', 'luxury', 'religious', 'cultural',
    'budget', 'cruise', 'mice', 'school', 'senior'
  )),

  -- Copertura geografica
  regions_covered TEXT[],            -- ['lombardia', 'veneto', 'toscana']
  pois_visited TEXT[],               -- ['duomo_milano', 'colosseo', 'uffizi']

  -- Caratteristiche gruppi
  typical_group_size INT4RANGE,      -- [20, 50)
  meal_budget_per_person INT4RANGE,  -- [25, 45) EUR

  -- Booking
  booking_method TEXT CHECK (booking_method IN (
    'direct', 'viator', 'getyourguide', 'civitatis', 'email'
  )),

  -- Qualità e priorità
  volume_estimate TEXT,              -- 'high', 'medium', 'low'
  response_rate DECIMAL(3,2),        -- Storico risposte

  -- Metadata
  data_source TEXT,                  -- 'manual', 'scraped', 'ai_enriched'
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Merchant Tour Operator Outreach (CRM)

```sql
CREATE TABLE merchant_tour_operator_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  operator_id UUID REFERENCES tour_operators(id),

  -- Stato outreach
  status TEXT CHECK (status IN (
    'suggested', 'contacted', 'responded', 'negotiating',
    'partnership_active', 'declined', 'no_response'
  )),

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,

  -- Contenuto
  outreach_template_used TEXT,
  custom_message TEXT,

  -- Risultato
  partnership_terms JSONB,           -- Menu concordato, commissioni, etc.
  bookings_generated INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Tourist POIs

```sql
CREATE TABLE tourist_pois (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,         -- 'duomo_milano', 'colosseo'
  city TEXT NOT NULL,
  country_code TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  annual_visitors INTEGER,           -- Stima visitatori/anno
  peak_seasons TEXT[],               -- ['spring', 'summer']
  typical_visit_duration INTEGER,    -- Minuti
  meal_opportunity TEXT              -- 'lunch', 'dinner', 'both'
);
```

---

## Accommodation Partners

```sql
CREATE TABLE accommodation_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identità
  name TEXT NOT NULL,
  accommodation_type TEXT CHECK (accommodation_type IN (
    'hotel', 'hostel', 'airbnb_host', 'b_and_b', 'aparthotel'
  )),

  -- Location
  address TEXT,
  city TEXT NOT NULL,
  country_code TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  distance_to_merchant_m INTEGER,    -- Calcolato

  -- Contatti
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,

  -- Capacità
  room_count INTEGER,                -- Camere/unità
  avg_guests_per_day INTEGER,        -- Stima ospiti/giorno
  star_rating DECIMAL(2,1),          -- 1.0 - 5.0

  -- Per Airbnb hosts
  properties_count INTEGER,          -- Numero proprietà gestite
  superhost BOOLEAN,

  -- Caratteristiche ospiti
  guest_nationality_mix JSONB,       -- {"DE": 25, "US": 20, "IT": 15}
  avg_stay_nights DECIMAL(3,1),
  business_vs_leisure TEXT,          -- 'business', 'leisure', 'mixed'

  -- Servizi che cercano
  needs_breakfast BOOLEAN DEFAULT false,
  needs_lunch BOOLEAN DEFAULT false,
  needs_dinner BOOLEAN DEFAULT false,
  needs_recommendations BOOLEAN DEFAULT true,

  -- Metadata
  data_source TEXT,                  -- 'google_maps', 'booking', 'airbnb', 'manual'
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per query geospaziali
CREATE INDEX idx_accommodation_location ON accommodation_partners USING GIST (location);
CREATE INDEX idx_accommodation_city ON accommodation_partners(city);
CREATE INDEX idx_accommodation_type ON accommodation_partners(accommodation_type);
```

---

## Merchant Accommodation Outreach (CRM)

```sql
CREATE TABLE merchant_accommodation_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  accommodation_id UUID REFERENCES accommodation_partners(id),

  -- Stato pipeline
  status TEXT CHECK (status IN (
    'suggested',           -- AI ha suggerito
    'contacted',           -- Email/chiamata inviata
    'responded',           -- Hanno risposto
    'negotiating',         -- In trattativa
    'partnership_active',  -- Accordo attivo
    'declined',            -- Hanno rifiutato
    'no_response'          -- Nessuna risposta dopo X giorni
  )),

  -- Tipo convenzione proposta
  partnership_type TEXT CHECK (partnership_type IN (
    'breakfast_convention',    -- Colazione convenzionata
    'lunch_convention',        -- Pranzo
    'dinner_convention',       -- Cena
    'discount_guests',         -- Sconto % per ospiti
    'recommendation_only',     -- Solo raccomandazione
    'full_board'              -- Pensione completa
  )),

  -- Termini accordo
  discount_percent INTEGER,          -- Es: 10% sconto ospiti
  commission_percent INTEGER,        -- Es: 5% a hotel per referral
  fixed_price_menu DECIMAL(10,2),    -- Menu fisso convenzionato

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  last_contact_at TIMESTAMPTZ,
  response_at TIMESTAMPTZ,
  partnership_start_date DATE,
  partnership_end_date DATE,

  -- Risultati
  guests_referred INTEGER DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,

  -- Note
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, accommodation_id)
);
```

---

## Partner Feedback (Network Effect)

```sql
CREATE TABLE partner_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_type TEXT CHECK (partner_type IN ('tour_operator', 'accommodation')),
  partner_id UUID NOT NULL,
  merchant_id UUID NOT NULL REFERENCES merchants(id),

  feedback_type TEXT CHECK (feedback_type IN (
    'contact_verified',     -- Contatti funzionano ✅
    'contact_wrong',        -- Email/tel sbagliati ❌
    'closed_business',      -- Non esiste più ❌
    'successful_deal',      -- Accordo chiuso! 🎉
    'declined',             -- Non interessati
    'wrong_info'            -- Info sbagliate
  )),

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_partner_feedback_partner ON partner_feedback(partner_type, partner_id);
```

---

## RLS Policies (da aggiungere)

```sql
-- Tour operators: pubblici in lettura
ALTER TABLE tour_operators ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tour operators readable by authenticated"
  ON tour_operators FOR SELECT TO authenticated USING (true);

-- Outreach: solo il merchant proprietario
ALTER TABLE merchant_tour_operator_outreach ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Merchant can manage own outreach"
  ON merchant_tour_operator_outreach FOR ALL TO authenticated
  USING (merchant_id IN (SELECT merchant_id FROM merchant_users WHERE user_id = auth.uid()));

-- Stesso pattern per accommodation...
```

---

---

## AI Booking Config

```sql
CREATE TABLE ai_booking_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID UNIQUE REFERENCES merchants(id),

  -- Automation level
  automation_level TEXT DEFAULT 'suggest' CHECK (automation_level IN (
    'suggest', 'auto_routine', 'full_auto'
  )),

  -- Optimization weights (0-100, total = 100)
  weight_revenue INTEGER DEFAULT 50,        -- Priorità revenue
  weight_occupancy INTEGER DEFAULT 30,      -- Priorità riempimento
  weight_relationships INTEGER DEFAULT 20,  -- Priorità relazioni partner

  -- Constraints
  min_margin_percent INTEGER DEFAULT 20,    -- Non accettare sotto X% margine
  max_group_percent INTEGER DEFAULT 60,     -- Max % capacità a gruppi
  blackout_dates DATE[],                    -- Date no gruppi (es. San Valentino)

  -- Partner preferences
  preferred_partners UUID[],                -- Partner da favorire
  blocked_partners UUID[],                  -- Partner da evitare

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Group Booking Requests

```sql
CREATE TABLE group_booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  -- Source
  partner_type TEXT CHECK (partner_type IN ('tour_operator', 'accommodation', 'direct')),
  partner_id UUID,                          -- FK to tour_operators or accommodation_partners

  -- Request details
  requested_date DATE NOT NULL,
  requested_slot TEXT CHECK (requested_slot IN ('breakfast', 'lunch', 'dinner')),
  party_size INTEGER NOT NULL,
  price_per_person DECIMAL(10,2),
  total_value DECIMAL(10,2) GENERATED ALWAYS AS (party_size * price_per_person) STORED,

  -- Menu/requirements
  menu_type TEXT,                           -- 'silver', 'gold', 'platinum', 'custom'
  dietary_requirements TEXT[],
  special_requests TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'ai_suggested_accept', 'ai_suggested_decline', 'ai_suggested_counter',
    'accepted', 'declined', 'countered', 'expired', 'cancelled'
  )),

  -- AI reasoning
  ai_recommendation TEXT,
  ai_reasoning TEXT,
  ai_expected_value DECIMAL(10,2),
  ai_confidence DECIMAL(3,2),               -- 0.00-1.00

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

CREATE INDEX idx_booking_requests_merchant_date ON group_booking_requests(merchant_id, requested_date);
CREATE INDEX idx_booking_requests_status ON group_booking_requests(status);
```

---

## Booking Performance History (ML Optimization)

```sql
CREATE TABLE booking_performance_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  date DATE NOT NULL,
  slot TEXT NOT NULL,

  -- Capacity
  total_capacity INTEGER,
  group_covers INTEGER,
  walkin_covers INTEGER,
  total_covers INTEGER,
  occupancy_percent DECIMAL(5,2),

  -- Revenue
  group_revenue DECIMAL(10,2),
  walkin_revenue DECIMAL(10,2),
  total_revenue DECIMAL(10,2),

  -- Averages
  avg_group_spend DECIMAL(10,2),
  avg_walkin_spend DECIMAL(10,2),

  -- For ML optimization
  day_of_week INTEGER,
  is_holiday BOOLEAN,
  weather_conditions TEXT,
  special_events TEXT[],

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, date, slot)
);

CREATE INDEX idx_booking_performance_merchant ON booking_performance_history(merchant_id, date);
```

---

## Tourism Product Templates

```sql
CREATE TABLE tourism_product_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  venue_type TEXT NOT NULL,          -- 'gelateria', 'enoteca', 'rooftop_bar'
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,

  -- Caratteristiche
  target TEXT CHECK (target IN ('tour_operator', 'accommodation', 'both')),
  duration_minutes INTEGER,

  -- Pricing suggerito
  suggested_price_min DECIMAL(10,2),
  suggested_price_max DECIMAL(10,2),

  -- Capacità
  min_group_size INTEGER,
  max_group_size INTEGER,

  -- Descrizione
  description_template TEXT,         -- Con placeholder {venue_name}, {location}
  includes TEXT[],                   -- Cosa è incluso

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Merchant Tourism Products

```sql
CREATE TABLE merchant_tourism_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  template_id UUID REFERENCES tourism_product_templates(id),

  -- Override del template
  custom_name TEXT,
  custom_price DECIMAL(10,2),
  custom_duration INTEGER,
  custom_min_group INTEGER,
  custom_max_group INTEGER,
  custom_description TEXT,
  custom_includes TEXT[],

  -- Disponibilità
  available_days INTEGER[],          -- 0=Sun, 1=Mon, etc.
  available_slots TEXT[],            -- ['morning', 'afternoon', 'evening']
  max_per_day INTEGER,               -- Max gruppi/giorno per questo prodotto

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

**Nota:** Questo file preserva gli schema SQL dettagliati dal backlog originale.
Quando implementi TOURISM-B2B, usa questi schema come base per la migration.
