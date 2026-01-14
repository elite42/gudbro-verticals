# B2B-CONVENTIONS - Database Schema (SQL Dettagliato)

> Questo file contiene gli schema SQL completi per B2B-CONVENTIONS.
> Per la visione e workflow, vedi [B2B-CONVENTIONS.md](./B2B-CONVENTIONS.md)

---

## Partner Conventions

```sql
-- Convenzioni attive tra merchant e partner
CREATE TABLE partner_conventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),

  -- Partner (può essere tour_op, hotel, o office)
  partner_type TEXT CHECK (partner_type IN (
    'tour_operator', 'accommodation', 'office', 'school', 'gym', 'other'
  )),
  partner_id UUID,              -- FK to respective table
  partner_name TEXT,            -- Denormalized for quick display

  -- Benefit
  benefit_type TEXT CHECK (benefit_type IN (
    'percentage_discount',      -- 10% off
    'fixed_discount',           -- €2 off
    'free_item',                -- Free coffee with lunch
    'special_price',            -- Fixed menu €8
    'points_multiplier'         -- 2x loyalty points
  )),
  benefit_value DECIMAL(10,2),
  benefit_description TEXT,     -- "10% off all orders"
  benefit_conditions TEXT,      -- "Minimum €10 order"

  -- Validity
  valid_from DATE,
  valid_until DATE,             -- NULL = no expiry
  valid_days INTEGER[],         -- [1,2,3,4,5] = Mon-Fri only
  valid_hours TSRANGE,          -- 12:00-14:30 lunch only

  -- Verification
  verification_method TEXT DEFAULT 'link' CHECK (verification_method IN (
    'link',           -- Direct link with embedded code
    'qr_scan',        -- Partner has QR that users scan
    'daily_code',     -- Daily rotating code
    'badge_id',       -- Employee badge number
    'automatic'       -- Geofencing/recognition
  )),
  daily_code_prefix TEXT,       -- "TECHCORP" → TECHCORP-1301

  -- Limits
  max_uses_total INTEGER,       -- NULL = unlimited
  max_uses_per_user INTEGER,    -- Per day/week/month
  max_uses_period TEXT,         -- 'day', 'week', 'month'

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Convention Vouchers

```sql
-- Voucher/link individuali
CREATE TABLE convention_vouchers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  convention_id UUID REFERENCES partner_conventions(id),

  -- Unique identifier
  voucher_code TEXT UNIQUE NOT NULL,
  short_url TEXT,
  qr_data TEXT,                 -- For QR generation

  -- User info
  user_id UUID REFERENCES accounts(id),
  user_identifier TEXT,         -- Room 305, Badge #12345
  user_name TEXT,
  user_email TEXT,

  -- Validity
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  max_uses INTEGER DEFAULT 1,
  times_used INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ
);
```

---

## Convention Redemptions

```sql
-- Ogni utilizzo tracciato
CREATE TABLE convention_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  voucher_id UUID REFERENCES convention_vouchers(id),
  convention_id UUID REFERENCES partner_conventions(id),
  merchant_id UUID REFERENCES merchants(id),

  -- Transaction details
  order_id UUID,
  original_amount DECIMAL(10,2),
  discount_amount DECIMAL(10,2),
  final_amount DECIMAL(10,2),

  -- How verified
  verification_method TEXT,
  verified_by_staff UUID,

  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Office Partners

```sql
-- Uffici/aziende partner (estensione di accommodation_partners logic)
CREATE TABLE office_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identità
  company_name TEXT NOT NULL,
  industry TEXT,                -- 'tech', 'legal', 'finance', 'healthcare'

  -- Location
  address TEXT,
  city TEXT,
  location GEOGRAPHY(POINT, 4326),
  distance_to_merchant_m INTEGER,

  -- Size
  employee_count INTEGER,
  floors_occupied INTEGER,

  -- Contacts
  hr_contact_name TEXT,
  hr_contact_email TEXT,
  hr_contact_phone TEXT,
  office_manager_name TEXT,
  office_manager_email TEXT,

  -- Characteristics
  has_canteen BOOLEAN DEFAULT false,   -- Competition!
  lunch_break_time TSRANGE,            -- Typical lunch hours
  wfh_policy TEXT,                     -- 'full_office', 'hybrid', 'remote'

  -- Metadata
  data_source TEXT,
  verified BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Merchant Office Outreach

```sql
-- Outreach per uffici (stesso pattern hotel)
CREATE TABLE merchant_office_outreach (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES merchants(id),
  office_id UUID REFERENCES office_partners(id),

  -- Pipeline status
  status TEXT CHECK (status IN (
    'suggested', 'contacted', 'meeting_scheduled',
    'negotiating', 'active', 'declined', 'no_response'
  )),

  -- Proposed convention
  proposed_benefit_type TEXT,
  proposed_benefit_value DECIMAL(10,2),

  -- Tracking
  first_contact_at TIMESTAMPTZ,
  meeting_date DATE,
  contract_signed_at DATE,

  -- Results
  employees_enrolled INTEGER DEFAULT 0,
  monthly_visits INTEGER DEFAULT 0,
  monthly_revenue DECIMAL(10,2) DEFAULT 0,

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Indexes

```sql
-- Indici per performance
CREATE INDEX idx_conventions_merchant ON partner_conventions(merchant_id);
CREATE INDEX idx_conventions_partner ON partner_conventions(partner_type, partner_id);
CREATE INDEX idx_vouchers_code ON convention_vouchers(voucher_code);
CREATE INDEX idx_redemptions_date ON convention_redemptions(redeemed_at);
CREATE INDEX idx_office_location ON office_partners USING GIST (location);
CREATE INDEX idx_office_city ON office_partners(city);
```

---

## RLS Policies (da aggiungere)

```sql
-- Conventions: merchant può gestire le proprie
ALTER TABLE partner_conventions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Merchant can manage own conventions"
  ON partner_conventions FOR ALL TO authenticated
  USING (merchant_id IN (SELECT merchant_id FROM merchant_users WHERE user_id = auth.uid()));

-- Vouchers: leggibili da chi ha il voucher
ALTER TABLE convention_vouchers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "User can read own vouchers"
  ON convention_vouchers FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Office partners: pubblici in lettura
ALTER TABLE office_partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Office partners readable by authenticated"
  ON office_partners FOR SELECT TO authenticated USING (true);
```

---

**Nota:** Questo file preserva gli schema SQL dettagliati dal backlog originale.
Quando implementi B2B-CONVENTIONS, usa questi schema come base per la migration.
