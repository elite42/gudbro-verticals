-- ============================================================================
-- Seed 002: Map Test Data for ROOTS My Khe
-- ============================================================================
-- Purpose: Create realistic test data for SmartMap and AI Co-Manager testing
-- Location: ROOTS Plant-Based Cafe, Da Nang (16.048672, 108.247856)
--
-- This creates:
-- - 35 customer accounts with delivery locations
-- - ~80 orders to establish customer status
-- - 6 competitors nearby
-- - 4 accommodation partners
-- - Customer loyalty accounts and wallets
--
-- IMPORTANT: Run with triggers disabled for accounts table!
-- ============================================================================

-- IDs for reference
-- Merchant: 11111111-1111-1111-1111-111111111111
-- Location: 10000000-0000-0000-0000-000000000001
-- Center: lat 16.048672, lng 108.247856

-- ============================================================================
-- 0. DISABLE TRIGGERS (required for bulk insert)
-- ============================================================================
ALTER TABLE accounts DISABLE TRIGGER trg_account_welcome_bonus;
ALTER TABLE accounts DISABLE TRIGGER trigger_create_notification_preferences;
ALTER TABLE accounts DISABLE TRIGGER trigger_generate_referral_code;

-- ============================================================================
-- 1. CUSTOMER ACCOUNTS (35 total)
-- Distribution: 60% tourists (21), 40% residents (14)
-- Tiers: bronze (lowercase!), silver, gold, platinum
-- ============================================================================

-- Tourists (21 accounts) - International names
INSERT INTO accounts (id, email, first_name, last_name, phone, is_resident, home_country, nationality,
  delivery_latitude, delivery_longitude, delivery_city, delivery_country_code,
  profile_completion_pct, is_active, is_verified, loyalty_tier, created_at)
VALUES
  -- Active tourists (8) - orders in last 30 days
  ('c0000001-0001-4000-a000-000000000001', 'john.smith@gmail.com', 'John', 'Smith', '+14155551001', false, 'US', 'American', 16.0512, 108.2456, 'Da Nang', 'VN', 80, true, true, 'silver', NOW() - INTERVAL '45 days'),
  ('c0000001-0001-4000-a000-000000000002', 'kim.minjun@naver.com', 'Minjun', 'Kim', '+821012341002', false, 'KR', 'Korean', 16.0534, 108.2501, 'Da Nang', 'VN', 90, true, true, 'gold', NOW() - INTERVAL '30 days'),
  ('c0000001-0001-4000-a000-000000000003', 'tanaka.yuki@gmail.com', 'Yuki', 'Tanaka', '+819012341003', false, 'JP', 'Japanese', 16.0489, 108.2423, 'Da Nang', 'VN', 75, true, true, 'bronze', NOW() - INTERVAL '60 days'),
  ('c0000001-0001-4000-a000-000000000004', 'wang.wei@qq.com', 'Wei', 'Wang', '+8613812341004', false, 'CN', 'Chinese', 16.0556, 108.2534, 'Da Nang', 'VN', 85, true, true, 'platinum', NOW() - INTERVAL '90 days'),
  ('c0000001-0001-4000-a000-000000000005', 'emma.jones@outlook.com', 'Emma', 'Jones', '+61412341005', false, 'AU', 'Australian', 16.0467, 108.2389, 'Da Nang', 'VN', 70, true, true, 'silver', NOW() - INTERVAL '20 days'),
  ('c0000001-0001-4000-a000-000000000006', 'lucas.mueller@web.de', 'Lucas', 'Mueller', '+491512341006', false, 'DE', 'German', 16.0523, 108.2478, 'Da Nang', 'VN', 65, true, true, 'bronze', NOW() - INTERVAL '15 days'),
  ('c0000001-0001-4000-a000-000000000007', 'marie.dupont@orange.fr', 'Marie', 'Dupont', '+33612341007', false, 'FR', 'French', 16.0498, 108.2512, 'Da Nang', 'VN', 80, true, true, 'gold', NOW() - INTERVAL '25 days'),
  ('c0000001-0001-4000-a000-000000000008', 'sofia.garcia@gmail.com', 'Sofia', 'Garcia', '+34612341008', false, 'ES', 'Spanish', 16.0545, 108.2445, 'Da Nang', 'VN', 60, true, true, 'bronze', NOW() - INTERVAL '10 days'),

  -- At-risk tourists (7) - orders 31-90 days ago
  ('c0000001-0001-4000-a000-000000000009', 'james.brown@yahoo.com', 'James', 'Brown', '+447812341009', false, 'GB', 'British', 16.0412, 108.2567, 'Da Nang', 'VN', 55, true, true, 'bronze', NOW() - INTERVAL '100 days'),
  ('c0000001-0001-4000-a000-000000000010', 'park.jihye@daum.net', 'Jihye', 'Park', '+821023451010', false, 'KR', 'Korean', 16.0578, 108.2401, 'Da Nang', 'VN', 70, true, true, 'silver', NOW() - INTERVAL '75 days'),
  ('c0000001-0001-4000-a000-000000000011', 'sato.kenji@yahoo.co.jp', 'Kenji', 'Sato', '+819034561011', false, 'JP', 'Japanese', 16.0456, 108.2534, 'Da Nang', 'VN', 45, true, true, 'bronze', NOW() - INTERVAL '80 days'),
  ('c0000001-0001-4000-a000-000000000012', 'li.fang@163.com', 'Fang', 'Li', '+8613923451012', false, 'CN', 'Chinese', 16.0534, 108.2389, 'Da Nang', 'VN', 50, true, true, 'bronze', NOW() - INTERVAL '65 days'),
  ('c0000001-0001-4000-a000-000000000013', 'oliver.wilson@gmail.com', 'Oliver', 'Wilson', '+61423451013', false, 'AU', 'Australian', 16.0489, 108.2501, 'Da Nang', 'VN', 75, true, true, 'gold', NOW() - INTERVAL '70 days'),
  ('c0000001-0001-4000-a000-000000000014', 'nina.schmidt@gmx.de', 'Nina', 'Schmidt', '+491523451014', false, 'DE', 'German', 16.0567, 108.2456, 'Da Nang', 'VN', 60, true, true, 'silver', NOW() - INTERVAL '85 days'),
  ('c0000001-0001-4000-a000-000000000015', 'pierre.martin@laposte.fr', 'Pierre', 'Martin', '+33623451015', false, 'FR', 'French', 16.0423, 108.2478, 'Da Nang', 'VN', 40, true, true, 'bronze', NOW() - INTERVAL '55 days'),

  -- Churned tourists (6) - orders >90 days ago or none
  ('c0000001-0001-4000-a000-000000000016', 'sarah.davis@icloud.com', 'Sarah', 'Davis', '+12125551016', false, 'US', 'American', 16.0601, 108.2523, 'Da Nang', 'VN', 35, true, true, 'bronze', NOW() - INTERVAL '150 days'),
  ('c0000001-0001-4000-a000-000000000017', 'lee.sunhee@naver.com', 'Sunhee', 'Lee', '+821034561017', false, 'KR', 'Korean', 16.0378, 108.2445, 'Da Nang', 'VN', 50, true, true, 'silver', NOW() - INTERVAL '120 days'),
  ('c0000001-0001-4000-a000-000000000018', 'yamamoto.aya@docomo.ne.jp', 'Aya', 'Yamamoto', '+819045671018', false, 'JP', 'Japanese', 16.0512, 108.2601, 'Da Nang', 'VN', 30, true, true, 'bronze', NOW() - INTERVAL '180 days'),
  ('c0000001-0001-4000-a000-000000000019', 'zhang.ming@sina.com', 'Ming', 'Zhang', '+8613034561019', false, 'CN', 'Chinese', 16.0445, 108.2367, 'Da Nang', 'VN', 25, true, true, 'bronze', NOW() - INTERVAL '200 days'),
  ('c0000001-0001-4000-a000-000000000020', 'jack.taylor@bigpond.com', 'Jack', 'Taylor', '+61434561020', false, 'AU', 'Australian', 16.0589, 108.2512, 'Da Nang', 'VN', 45, true, true, 'bronze', NOW() - INTERVAL '140 days'),
  ('c0000001-0001-4000-a000-000000000021', 'anna.weber@t-online.de', 'Anna', 'Weber', '+491534561021', false, 'DE', 'German', 16.0401, 108.2489, 'Da Nang', 'VN', 55, true, true, 'silver', NOW() - INTERVAL '160 days')
ON CONFLICT (email) DO UPDATE SET
  delivery_latitude = EXCLUDED.delivery_latitude,
  delivery_longitude = EXCLUDED.delivery_longitude,
  is_resident = EXCLUDED.is_resident;

-- Residents (14 accounts) - Vietnamese names
INSERT INTO accounts (id, email, first_name, last_name, phone, is_resident, home_country, nationality,
  delivery_latitude, delivery_longitude, delivery_city, delivery_country_code,
  profile_completion_pct, is_active, is_verified, loyalty_tier, created_at)
VALUES
  -- Active residents (6) - orders in last 30 days
  ('c0000001-0002-4000-a000-000000000001', 'nguyen.van.an@gmail.com', 'An', 'Nguyen Van', '+84901234001', true, 'VN', 'Vietnamese', 16.0478, 108.2434, 'Da Nang', 'VN', 95, true, true, 'platinum', NOW() - INTERVAL '365 days'),
  ('c0000001-0002-4000-a000-000000000002', 'tran.thi.bich@yahoo.com', 'Bich', 'Tran Thi', '+84902345002', true, 'VN', 'Vietnamese', 16.0523, 108.2512, 'Da Nang', 'VN', 90, true, true, 'gold', NOW() - INTERVAL '300 days'),
  ('c0000001-0002-4000-a000-000000000003', 'le.hoang.cuong@gmail.com', 'Cuong', 'Le Hoang', '+84903456003', true, 'VN', 'Vietnamese', 16.0456, 108.2389, 'Da Nang', 'VN', 85, true, true, 'gold', NOW() - INTERVAL '250 days'),
  ('c0000001-0002-4000-a000-000000000004', 'pham.minh.duc@outlook.com', 'Duc', 'Pham Minh', '+84904567004', true, 'VN', 'Vietnamese', 16.0534, 108.2467, 'Da Nang', 'VN', 80, true, true, 'silver', NOW() - INTERVAL '200 days'),
  ('c0000001-0002-4000-a000-000000000005', 'hoang.thi.em@gmail.com', 'Em', 'Hoang Thi', '+84905678005', true, 'VN', 'Vietnamese', 16.0489, 108.2523, 'Da Nang', 'VN', 75, true, true, 'silver', NOW() - INTERVAL '180 days'),
  ('c0000001-0002-4000-a000-000000000006', 'vu.quang.phong@yahoo.com', 'Phong', 'Vu Quang', '+84906789006', true, 'VN', 'Vietnamese', 16.0567, 108.2401, 'Da Nang', 'VN', 70, true, true, 'bronze', NOW() - INTERVAL '150 days'),

  -- At-risk residents (4) - orders 31-90 days ago
  ('c0000001-0002-4000-a000-000000000007', 'dang.van.giang@gmail.com', 'Giang', 'Dang Van', '+84907890007', true, 'VN', 'Vietnamese', 16.0412, 108.2478, 'Da Nang', 'VN', 65, true, true, 'bronze', NOW() - INTERVAL '120 days'),
  ('c0000001-0002-4000-a000-000000000008', 'bui.thi.hanh@outlook.com', 'Hanh', 'Bui Thi', '+84908901008', true, 'VN', 'Vietnamese', 16.0545, 108.2534, 'Da Nang', 'VN', 60, true, true, 'silver', NOW() - INTERVAL '100 days'),
  ('c0000001-0002-4000-a000-000000000009', 'do.minh.khoi@gmail.com', 'Khoi', 'Do Minh', '+84909012009', true, 'VN', 'Vietnamese', 16.0478, 108.2356, 'Da Nang', 'VN', 55, true, true, 'bronze', NOW() - INTERVAL '90 days'),
  ('c0000001-0002-4000-a000-000000000010', 'ngo.thi.lan@yahoo.com', 'Lan', 'Ngo Thi', '+84900123010', true, 'VN', 'Vietnamese', 16.0601, 108.2445, 'Da Nang', 'VN', 50, true, true, 'bronze', NOW() - INTERVAL '80 days'),

  -- Churned residents (4) - orders >90 days ago
  ('c0000001-0002-4000-a000-000000000011', 'trinh.van.minh@gmail.com', 'Minh', 'Trinh Van', '+84901234011', true, 'VN', 'Vietnamese', 16.0389, 108.2501, 'Da Nang', 'VN', 45, true, true, 'bronze', NOW() - INTERVAL '400 days'),
  ('c0000001-0002-4000-a000-000000000012', 'luong.thi.nga@outlook.com', 'Nga', 'Luong Thi', '+84902345012', true, 'VN', 'Vietnamese', 16.0556, 108.2378, 'Da Nang', 'VN', 40, true, true, 'silver', NOW() - INTERVAL '350 days'),
  ('c0000001-0002-4000-a000-000000000013', 'cao.quoc.anh@gmail.com', 'Quoc Anh', 'Cao', '+84903456013', true, 'VN', 'Vietnamese', 16.0423, 108.2567, 'Da Nang', 'VN', 35, true, true, 'bronze', NOW() - INTERVAL '300 days'),
  ('c0000001-0002-4000-a000-000000000014', 'dinh.thi.suong@yahoo.com', 'Suong', 'Dinh Thi', '+84904567014', true, 'VN', 'Vietnamese', 16.0512, 108.2612, 'Da Nang', 'VN', 30, true, true, 'bronze', NOW() - INTERVAL '280 days')
ON CONFLICT (email) DO UPDATE SET
  delivery_latitude = EXCLUDED.delivery_latitude,
  delivery_longitude = EXCLUDED.delivery_longitude,
  is_resident = EXCLUDED.is_resident;

-- Re-enable triggers
ALTER TABLE accounts ENABLE TRIGGER trg_account_welcome_bonus;
ALTER TABLE accounts ENABLE TRIGGER trigger_create_notification_preferences;
ALTER TABLE accounts ENABLE TRIGGER trigger_generate_referral_code;

-- ============================================================================
-- 2. CUSTOMER LOYALTY ACCOUNTS
-- ============================================================================

INSERT INTO customer_loyalty_accounts (account_id, merchant_id, points_balance, lifetime_points, current_tier, created_at)
SELECT
  a.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  CASE a.loyalty_tier
    WHEN 'platinum' THEN 5000 + floor(random() * 3000)
    WHEN 'gold' THEN 2000 + floor(random() * 2000)
    WHEN 'silver' THEN 500 + floor(random() * 1000)
    ELSE floor(random() * 500)
  END::int,
  CASE a.loyalty_tier
    WHEN 'platinum' THEN 15000 + floor(random() * 10000)
    WHEN 'gold' THEN 5000 + floor(random() * 5000)
    WHEN 'silver' THEN 1500 + floor(random() * 2000)
    ELSE floor(random() * 1000)
  END::int,
  a.loyalty_tier,
  a.created_at
FROM accounts a
WHERE a.id::text LIKE 'c0000001-%'
ON CONFLICT (account_id, merchant_id) DO UPDATE SET
  points_balance = EXCLUDED.points_balance,
  lifetime_points = EXCLUDED.lifetime_points,
  current_tier = EXCLUDED.current_tier;

-- ============================================================================
-- 3. CUSTOMER WALLETS
-- ============================================================================

INSERT INTO customer_wallets (account_id, merchant_id, balance_cents, bonus_balance_cents, currency, max_balance_cents, is_active, created_at)
SELECT
  a.id,
  '11111111-1111-1111-1111-111111111111'::uuid,
  floor(random() * 500000)::int, -- Up to 500,000 VND (~$20)
  floor(random() * 100000)::int, -- Bonus up to 100,000 VND
  'VND',
  10000000, -- Max 10M VND
  true,
  a.created_at
FROM accounts a
WHERE a.id::text LIKE 'c0000001-%'
ON CONFLICT (account_id, merchant_id) DO UPDATE SET
  balance_cents = EXCLUDED.balance_cents;

-- ============================================================================
-- 4. ORDERS (~80 orders distributed by customer status)
-- NOTE: status must be 'delivered' (not 'completed')
-- ============================================================================

-- Orders for active tourists (8 accounts x 3 orders = 24 orders)
INSERT INTO orders (merchant_id, account_id, order_number, order_code, customer_name, status, subtotal, total, currency, payment_status, created_at)
SELECT
  '11111111-1111-1111-1111-111111111111'::uuid,
  a.id,
  10000 + (row_number() OVER ())::int,
  'T' || substr(md5(a.id::text || s.n::text), 1, 6),
  a.first_name || ' ' || a.last_name,
  'delivered',
  (150000 + floor(random() * 350000))::numeric,
  (150000 + floor(random() * 350000))::numeric,
  'VND',
  'paid',
  NOW() - ((floor(random() * 25) + 1)::int || ' days')::interval
FROM accounts a
CROSS JOIN generate_series(1, 3) AS s(n)
WHERE a.id::text >= 'c0000001-0001-4000-a000-000000000001'
  AND a.id::text <= 'c0000001-0001-4000-a000-000000000008'
ON CONFLICT DO NOTHING;

-- Orders for active residents (6 accounts x 4 orders = 24 orders)
INSERT INTO orders (merchant_id, account_id, order_number, order_code, customer_name, status, subtotal, total, currency, payment_status, created_at)
SELECT
  '11111111-1111-1111-1111-111111111111'::uuid,
  a.id,
  20000 + (row_number() OVER ())::int,
  'R' || substr(md5(a.id::text || s.n::text), 1, 6),
  a.first_name || ' ' || a.last_name,
  'delivered',
  (120000 + floor(random() * 280000))::numeric,
  (120000 + floor(random() * 280000))::numeric,
  'VND',
  'paid',
  NOW() - ((floor(random() * 28) + 1)::int || ' days')::interval
FROM accounts a
CROSS JOIN generate_series(1, 4) AS s(n)
WHERE a.id::text >= 'c0000001-0002-4000-a000-000000000001'
  AND a.id::text <= 'c0000001-0002-4000-a000-000000000006'
ON CONFLICT DO NOTHING;

-- Orders for at-risk tourists (7 accounts x 2 orders = 14 orders)
INSERT INTO orders (merchant_id, account_id, order_number, order_code, customer_name, status, subtotal, total, currency, payment_status, created_at)
SELECT
  '11111111-1111-1111-1111-111111111111'::uuid,
  a.id,
  30000 + (row_number() OVER ())::int,
  'A' || substr(md5(a.id::text || s.n::text), 1, 6),
  a.first_name || ' ' || a.last_name,
  'delivered',
  (100000 + floor(random() * 300000))::numeric,
  (100000 + floor(random() * 300000))::numeric,
  'VND',
  'paid',
  NOW() - ((35 + floor(random() * 50))::int || ' days')::interval
FROM accounts a
CROSS JOIN generate_series(1, 2) AS s(n)
WHERE a.id::text >= 'c0000001-0001-4000-a000-000000000009'
  AND a.id::text <= 'c0000001-0001-4000-a000-000000000015'
ON CONFLICT DO NOTHING;

-- Orders for at-risk residents (4 accounts x 2 orders = 8 orders)
INSERT INTO orders (merchant_id, account_id, order_number, order_code, customer_name, status, subtotal, total, currency, payment_status, created_at)
SELECT
  '11111111-1111-1111-1111-111111111111'::uuid,
  a.id,
  40000 + (row_number() OVER ())::int,
  'B' || substr(md5(a.id::text || s.n::text), 1, 6),
  a.first_name || ' ' || a.last_name,
  'delivered',
  (100000 + floor(random() * 250000))::numeric,
  (100000 + floor(random() * 250000))::numeric,
  'VND',
  'paid',
  NOW() - ((40 + floor(random() * 45))::int || ' days')::interval
FROM accounts a
CROSS JOIN generate_series(1, 2) AS s(n)
WHERE a.id::text >= 'c0000001-0002-4000-a000-000000000007'
  AND a.id::text <= 'c0000001-0002-4000-a000-000000000010'
ON CONFLICT DO NOTHING;

-- Old orders for churned tourists (6 accounts x 1 order = 6 orders)
INSERT INTO orders (merchant_id, account_id, order_number, order_code, customer_name, status, subtotal, total, currency, payment_status, created_at)
SELECT
  '11111111-1111-1111-1111-111111111111'::uuid,
  a.id,
  50000 + (row_number() OVER ())::int,
  'C' || substr(md5(a.id::text), 1, 6),
  a.first_name || ' ' || a.last_name,
  'delivered',
  (80000 + floor(random() * 200000))::numeric,
  (80000 + floor(random() * 200000))::numeric,
  'VND',
  'paid',
  NOW() - ((100 + floor(random() * 100))::int || ' days')::interval
FROM accounts a
WHERE a.id::text >= 'c0000001-0001-4000-a000-000000000016'
  AND a.id::text <= 'c0000001-0001-4000-a000-000000000021'
ON CONFLICT DO NOTHING;

-- Old orders for churned residents (4 accounts x 1 order = 4 orders)
INSERT INTO orders (merchant_id, account_id, order_number, order_code, customer_name, status, subtotal, total, currency, payment_status, created_at)
SELECT
  '11111111-1111-1111-1111-111111111111'::uuid,
  a.id,
  60000 + (row_number() OVER ())::int,
  'D' || substr(md5(a.id::text), 1, 6),
  a.first_name || ' ' || a.last_name,
  'delivered',
  (80000 + floor(random() * 200000))::numeric,
  (80000 + floor(random() * 200000))::numeric,
  'VND',
  'paid',
  NOW() - ((120 + floor(random() * 150))::int || ' days')::interval
FROM accounts a
WHERE a.id::text >= 'c0000001-0002-4000-a000-000000000011'
  AND a.id::text <= 'c0000001-0002-4000-a000-000000000014'
ON CONFLICT DO NOTHING;

-- ============================================================================
-- 5. COMPETITORS (6 nearby restaurants/bars)
-- NOTE: price_range must be 'mid-range' (not 'mid')
-- ============================================================================

INSERT INTO ai_competitor_profiles (
  id, merchant_id, location_id, name, business_type, address,
  latitude, longitude, distance, price_range,
  strengths, weaknesses, popular_items, source, is_active
) VALUES
  ('c00c0001-0001-4000-a000-000000000001', '11111111-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001',
   'Oceanview Restaurant', 'restaurant', '89 Vo Nguyen Giap, My An, Da Nang',
   16.0521, 108.2512, 350, 'mid-range',
   ARRAY['Ocean view seating', 'Large menu variety', 'Live music weekends'],
   ARRAY['Slow service during peak', 'Limited vegetarian options'],
   ARRAY['Grilled seafood platter', 'Vietnamese spring rolls', 'Lemongrass chicken'],
   'manual', true),

  ('c00c0001-0001-4000-a000-000000000002', '11111111-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001',
   'Beach Garden Cafe', 'cafe', '67 Ho Xuan Huong, My An, Da Nang',
   16.0456, 108.2423, 450, 'budget',
   ARRAY['Affordable prices', 'Garden atmosphere', 'Good coffee'],
   ARRAY['Basic food menu', 'No AC indoor'],
   ARRAY['Egg coffee', 'Banh mi', 'Fruit smoothies'],
   'manual', true),

  ('c00c0001-0001-4000-a000-000000000003', '11111111-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001',
   'Sunset Lounge', 'bar', '125 Vo Nguyen Giap, My An, Da Nang',
   16.0534, 108.2534, 520, 'premium',
   ARRAY['Rooftop views', 'Craft cocktails', 'Upscale ambiance'],
   ARRAY['Expensive', 'Limited food', 'Crowded weekends'],
   ARRAY['Signature sunset cocktail', 'Wine selection', 'Tapas plates'],
   'manual', true),

  ('c00c0001-0001-4000-a000-000000000004', '11111111-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001',
   'Pho Hai San', 'restaurant', '34 An Thuong 4, My An, Da Nang',
   16.0445, 108.2489, 680, 'budget',
   ARRAY['Authentic local food', 'Very affordable', 'Quick service'],
   ARRAY['Basic seating', 'Limited English', 'Cash only'],
   ARRAY['Seafood pho', 'Banh canh', 'Bun cha ca'],
   'manual', true),

  ('c00c0001-0001-4000-a000-000000000005', '11111111-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001',
   'La Plage Resort Restaurant', 'restaurant', 'Furama Resort, Vo Nguyen Giap, Da Nang',
   16.0589, 108.2401, 750, 'luxury',
   ARRAY['5-star service', 'International buffet', 'Beach access'],
   ARRAY['Very expensive', 'Resort guests priority', 'Formal dress code'],
   ARRAY['Seafood buffet', 'French cuisine', 'Sunday brunch'],
   'manual', true),

  ('c00c0001-0001-4000-a000-000000000006', '11111111-1111-1111-1111-111111111111', '10000000-0000-0000-0000-000000000001',
   'Korean BBQ House', 'restaurant', '56 An Thuong 1, My An, Da Nang',
   16.0467, 108.2556, 820, 'mid-range',
   ARRAY['Authentic Korean BBQ', 'All-you-can-eat option', 'Good for groups'],
   ARRAY['Smoke smell', 'Noisy', 'Long wait times'],
   ARRAY['Samgyeopsal', 'Bulgogi', 'Korean fried chicken'],
   'manual', true)
ON CONFLICT (id) DO UPDATE SET
  latitude = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  is_active = true;

-- ============================================================================
-- 6. ACCOMMODATION PARTNERS (4 hotels)
-- NOTE: accommodation_type must be: hotel, hostel, airbnb_host, b_and_b, aparthotel
-- NOTE: UUID must be hex only (0-9, a-f)
-- ============================================================================

INSERT INTO accommodation_partners (
  id, name, accommodation_type, address, city, country_code,
  latitude, longitude, distance_to_merchant_m,
  contact_name, contact_email, contact_phone, website,
  room_count, avg_guests_per_day, star_rating,
  partnership_status, vouchers_issued, vouchers_redeemed,
  merchant_id, is_active, is_verified
) VALUES
  ('acc00001-0001-4000-a000-000000000001',
   'Fusion Suites Da Nang Beach', 'hotel',
   '78 Vo Nguyen Giap, My An, Da Nang', 'Da Nang', 'VN',
   16.0512, 108.2501, 280,
   'Ms. Linh Nguyen', 'partnership@fusionsuites.com', '+84236123456', 'https://fusionsuites.com',
   120, 180, 4.5,
   'active', 45, 32,
   '11111111-1111-1111-1111-111111111111', true, true),

  ('acc00001-0001-4000-a000-000000000002',
   'Melia Danang Beach Resort', 'hotel',
   'Truong Sa, Hoa Hai, Ngu Hanh Son, Da Nang', 'Da Nang', 'VN',
   16.0534, 108.2423, 450,
   'Mr. Tuan Pham', 'events@meliadanang.com', '+84236789012', 'https://melia.com/danang',
   220, 350, 5.0,
   'negotiating', 0, 0,
   '11111111-1111-1111-1111-111111111111', true, true),

  ('acc00001-0001-4000-a000-000000000003',
   'My Khe Beach Hostel', 'hostel',
   '45 An Thuong 3, My An, Da Nang', 'Da Nang', 'VN',
   16.0478, 108.2534, 350,
   'Mr. Hieu Tran', 'info@mykhebeachhostel.com', '+84905123456', null,
   25, 40, 2.5,
   'contacted', 5, 2,
   '11111111-1111-1111-1111-111111111111', true, false),

  ('acc00001-0001-4000-a000-000000000004',
   'Seaside Boutique Hotel', 'hotel',
   '92 Ho Xuan Huong, My An, Da Nang', 'Da Nang', 'VN',
   16.0489, 108.2467, 380,
   null, null, null, 'https://seasidedanang.com',
   35, 55, 3.5,
   'lead', 0, 0,
   '11111111-1111-1111-1111-111111111111', true, false)
ON CONFLICT (id) DO UPDATE SET
  partnership_status = EXCLUDED.partnership_status,
  vouchers_issued = EXCLUDED.vouchers_issued,
  vouchers_redeemed = EXCLUDED.vouchers_redeemed,
  merchant_id = EXCLUDED.merchant_id;

-- ============================================================================
-- 7. AI ZONE ANALYSIS (update existing for ROOTS location)
-- ============================================================================

UPDATE ai_zone_analysis SET
  address = '45 Vo Nguyen Giap, My An Ward',
  city = 'Da Nang',
  country = 'Vietnam',
  coordinates = '{"lat": 16.048672, "lng": 108.247856}'::jsonb,
  zone_type = 'tourist',
  foot_traffic = 'high',
  demographics = '{"age_group": "25-45", "primary": "international tourists", "secondary": "young professionals", "income_level": "medium-high"}'::jsonb,
  nearby_pois = ARRAY['My Khe Beach (100m)', 'An Thuong Night Street (300m)', 'Furama Resort (750m)', 'Multiple hotels within 500m'],
  peak_hours = ARRAY['07:00-10:00', '17:00-21:00'],
  busy_days = ARRAY['Saturday', 'Sunday'],
  recommendations = ARRAY[
    'Offer hotel partnership breakfast vouchers',
    'Create beach picnic packages',
    'Extend weekend brunch hours',
    'Add Korean/Japanese menu items for Asian tourists',
    'Partner with tour operators for group bookings'
  ]
WHERE merchant_id = '11111111-1111-1111-1111-111111111111'
AND location_id = '10000000-0000-0000-0000-000000000001';

-- ============================================================================
-- VERIFICATION QUERIES (run after seeding)
-- ============================================================================

-- SELECT 'Customers' as entity, count(*) as count FROM accounts WHERE id::text LIKE 'c0000001-%';
-- SELECT 'Orders', count(*) FROM orders WHERE merchant_id = '11111111-1111-1111-1111-111111111111' AND order_number >= 10000;
-- SELECT 'Competitors', count(*) FROM ai_competitor_profiles WHERE merchant_id = '11111111-1111-1111-1111-111111111111';
-- SELECT 'Partners', count(*) FROM accommodation_partners WHERE merchant_id = '11111111-1111-1111-1111-111111111111';
-- SELECT CASE WHEN is_resident THEN 'Residents' ELSE 'Tourists' END as type, count(*) FROM accounts WHERE id::text LIKE 'c0000001-%' GROUP BY is_resident;
-- SELECT loyalty_tier, count(*) FROM accounts WHERE id::text LIKE 'c0000001-%' GROUP BY loyalty_tier ORDER BY count(*) DESC;
