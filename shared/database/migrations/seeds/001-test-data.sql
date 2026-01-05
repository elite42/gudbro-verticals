-- =====================================================
-- SEED DATA FOR TESTING
-- Date: 2026-01-05
-- Description: Test data for AI Co-Manager and all features
-- Execute on Supabase SQL Editor
-- =====================================================

-- =====================================================
-- PART 0: DISABLE TRIGGERS THAT CAUSE ISSUES
-- =====================================================

-- Disable the welcome bonus trigger temporarily
-- (it tries to insert into loyalty_transactions without balance_after)
DROP TRIGGER IF EXISTS trg_account_welcome_bonus ON accounts;

-- =====================================================
-- PART 1: ORGANIZATIONS
-- =====================================================

-- Test Organization 1: ROOTS Restaurant Group (F&B)
INSERT INTO organizations (id, name, slug, type, subscription_plan, subscription_status, status)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'ROOTS Restaurant Group',
  'roots-restaurant-group',
  'standard',
  'pro',
  'active',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Test Organization 2: Scallywags Vietnam (Hotel/Bar)
INSERT INTO organizations (id, name, slug, type, subscription_plan, subscription_status, status)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Scallywags Hospitality',
  'scallywags-hospitality',
  'standard',
  'starter',
  'active',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Test Organization 3: Demo Enterprise (for testing)
INSERT INTO organizations (id, name, slug, type, subscription_plan, subscription_status, status)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Demo Enterprise Corp',
  'demo-enterprise',
  'enterprise',
  NULL,
  'active',
  'active'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 2: BRANDS
-- =====================================================

-- Brand 1: ROOTS Cafe (under ROOTS Restaurant Group)
INSERT INTO brands (id, organization_id, name, slug, description, business_type, logo_url, primary_color, is_active)
VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '11111111-1111-1111-1111-111111111111',
  'ROOTS Cafe',
  'roots-cafe',
  'Healthy brunch and specialty coffee in Da Nang',
  'fnb',
  NULL,
  '#4A7C59',
  true
) ON CONFLICT (id) DO NOTHING;

-- Brand 2: ROOTS Kitchen (under ROOTS Restaurant Group)
INSERT INTO brands (id, organization_id, name, slug, description, business_type, logo_url, primary_color, is_active)
VALUES (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '11111111-1111-1111-1111-111111111111',
  'ROOTS Kitchen',
  'roots-kitchen',
  'Farm-to-table restaurant experience',
  'fnb',
  NULL,
  '#2E5339',
  true
) ON CONFLICT (id) DO NOTHING;

-- Brand 3: Scallywags Beach Club
INSERT INTO brands (id, organization_id, name, slug, description, business_type, logo_url, primary_color, is_active)
VALUES (
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '22222222-2222-2222-2222-222222222222',
  'Scallywags Beach Club',
  'scallywags-beach-club',
  'Beachfront bar and restaurant in An Bang',
  'fnb',
  NULL,
  '#1E88E5',
  true
) ON CONFLICT (id) DO NOTHING;

-- Brand 4: Demo Brand (for testing)
INSERT INTO brands (id, organization_id, name, slug, description, business_type, logo_url, primary_color, is_active)
VALUES (
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  '33333333-3333-3333-3333-333333333333',
  'Demo Brand',
  'demo-brand',
  'Test brand for development',
  'fnb',
  NULL,
  '#FF5722',
  true
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 3: LOCATIONS
-- =====================================================

-- Location 1: ROOTS Cafe - My Khe
INSERT INTO locations (id, brand_id, name, slug, description, address, city, postal_code, country_code, currency_code, primary_language, enabled_languages, timezone, phone, email, operating_hours, is_active)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'ROOTS My Khe',
  'my-khe',
  'Flagship location near My Khe Beach',
  '45 Vo Nguyen Giap, My An Ward',
  'Da Nang',
  '550000',
  'VN',
  'VND',
  'en',
  ARRAY['en', 'vi', 'ko'],
  'Asia/Ho_Chi_Minh',
  '+84 236 123 4567',
  'mykhe@rootscafe.vn',
  '{"mon": {"open": "07:00", "close": "22:00"}, "tue": {"open": "07:00", "close": "22:00"}, "wed": {"open": "07:00", "close": "22:00"}, "thu": {"open": "07:00", "close": "22:00"}, "fri": {"open": "07:00", "close": "23:00"}, "sat": {"open": "07:00", "close": "23:00"}, "sun": {"open": "07:00", "close": "22:00"}}',
  true
) ON CONFLICT (id) DO NOTHING;

-- Location 2: ROOTS Cafe - Han River
INSERT INTO locations (id, brand_id, name, slug, description, address, city, postal_code, country_code, currency_code, primary_language, enabled_languages, timezone, phone, email, operating_hours, is_active)
VALUES (
  '10000000-0000-0000-0000-000000000002',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'ROOTS Han River',
  'han-river',
  'Downtown location with river view',
  '12 Bach Dang, Thach Thang Ward',
  'Da Nang',
  '550000',
  'VN',
  'VND',
  'vi',
  ARRAY['vi', 'en'],
  'Asia/Ho_Chi_Minh',
  '+84 236 234 5678',
  'hanriver@rootscafe.vn',
  '{"mon": {"open": "06:30", "close": "21:00"}, "tue": {"open": "06:30", "close": "21:00"}, "wed": {"open": "06:30", "close": "21:00"}, "thu": {"open": "06:30", "close": "21:00"}, "fri": {"open": "06:30", "close": "21:00"}, "sat": {"open": "07:00", "close": "21:00"}, "sun": {"open": "07:00", "close": "20:00"}}',
  true
) ON CONFLICT (id) DO NOTHING;

-- Location 3: Scallywags An Bang
INSERT INTO locations (id, brand_id, name, slug, description, address, city, postal_code, country_code, currency_code, primary_language, enabled_languages, timezone, phone, email, operating_hours, is_active)
VALUES (
  '10000000-0000-0000-0000-000000000003',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'Scallywags An Bang',
  'an-bang',
  'Beachfront location in Hoi An',
  'An Bang Beach, Cam An Ward',
  'Hoi An',
  '560000',
  'VN',
  'VND',
  'en',
  ARRAY['en', 'vi', 'ko', 'zh'],
  'Asia/Ho_Chi_Minh',
  '+84 235 391 8888',
  'anbang@scallywags.vn',
  '{"mon": {"open": "10:00", "close": "23:00"}, "tue": {"open": "10:00", "close": "23:00"}, "wed": {"open": "10:00", "close": "23:00"}, "thu": {"open": "10:00", "close": "23:00"}, "fri": {"open": "10:00", "close": "24:00"}, "sat": {"open": "09:00", "close": "24:00"}, "sun": {"open": "09:00", "close": "23:00"}}',
  true
) ON CONFLICT (id) DO NOTHING;

-- Location 4: Demo Location (for testing - minimal data)
INSERT INTO locations (id, brand_id, name, slug, country_code, currency_code, primary_language, enabled_languages, is_active)
VALUES (
  '10000000-0000-0000-0000-000000000004',
  'dddddddd-dddd-dddd-dddd-dddddddddddd',
  'Demo Location',
  'demo-main',
  'US',
  'USD',
  'en',
  ARRAY['en'],
  true
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 4: ACCOUNTS (P5 Unified)
-- =====================================================

-- Account 1: Restaurant Owner (ROOTS)
INSERT INTO accounts (id, email, first_name, last_name, display_name, locale, timezone, is_active, is_verified, loyalty_tier)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'owner@rootscafe.vn',
  'Minh',
  'Nguyen',
  'Minh Nguyen',
  'vi',
  'Asia/Ho_Chi_Minh',
  true,
  true,
  'gold'
) ON CONFLICT (id) DO NOTHING;

-- Account 2: Manager (ROOTS My Khe)
INSERT INTO accounts (id, email, first_name, last_name, display_name, locale, timezone, is_active, is_verified)
VALUES (
  'a0000000-0000-0000-0000-000000000002',
  'manager@rootscafe.vn',
  'Linh',
  'Tran',
  'Linh Tran',
  'vi',
  'Asia/Ho_Chi_Minh',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- Account 3: Scallywags Owner
INSERT INTO accounts (id, email, first_name, last_name, display_name, locale, timezone, is_active, is_verified)
VALUES (
  'a0000000-0000-0000-0000-000000000003',
  'owner@scallywags.vn',
  'Tom',
  'Wilson',
  'Tom Wilson',
  'en',
  'Asia/Ho_Chi_Minh',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- Account 4: Demo/Dev Account
INSERT INTO accounts (id, email, first_name, last_name, display_name, locale, timezone, is_active, is_verified)
VALUES (
  'a0000000-0000-0000-0000-000000000004',
  'dev@gudbro.com',
  'Developer',
  'Test',
  'Dev Test',
  'en',
  'UTC',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 5: ACCOUNT ROLES
-- =====================================================

-- Role: ROOTS Owner is merchant admin for ROOTS org
-- UUID must be hex only (0-9, a-f)
INSERT INTO account_roles (id, account_id, role_type, tenant_id, tenant_type, permissions, is_primary, is_active)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'merchant',
  '11111111-1111-1111-1111-111111111111',
  'organization',
  '{"all": true, "manage_staff": true, "manage_menu": true, "view_analytics": true}',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- Role: ROOTS Manager for My Khe location
INSERT INTO account_roles (id, account_id, role_type, tenant_id, tenant_type, permissions, is_primary, is_active)
VALUES (
  'b0000000-0000-0000-0000-000000000002',
  'a0000000-0000-0000-0000-000000000002',
  'merchant',
  '10000000-0000-0000-0000-000000000001',
  'location',
  '{"manage_orders": true, "view_analytics": true, "manage_menu": false}',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- Role: Scallywags Owner
INSERT INTO account_roles (id, account_id, role_type, tenant_id, tenant_type, permissions, is_primary, is_active)
VALUES (
  'b0000000-0000-0000-0000-000000000003',
  'a0000000-0000-0000-0000-000000000003',
  'merchant',
  '22222222-2222-2222-2222-222222222222',
  'organization',
  '{"all": true}',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- Role: Dev account is admin
INSERT INTO account_roles (id, account_id, role_type, tenant_id, tenant_type, permissions, is_primary, is_active)
VALUES (
  'b0000000-0000-0000-0000-000000000004',
  'a0000000-0000-0000-0000-000000000004',
  'admin',
  NULL,
  NULL,
  '{"all": true, "super_admin": true}',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 6: MERCHANTS (Legacy table, needed for AI)
-- =====================================================

-- merchants table: id, name, slug, description, email, timezone (NO business_type - that's in brands)
INSERT INTO merchants (id, name, slug, description, email, timezone)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'ROOTS Cafe',
  'roots-cafe',
  'Healthy brunch and specialty coffee in Da Nang',
  'contact@rootscafe.vn',
  'Asia/Ho_Chi_Minh'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO merchants (id, name, slug, description, email, timezone)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'Scallywags Beach Club',
  'scallywags-beach-club',
  'Beachfront bar and restaurant',
  'contact@scallywags.vn',
  'Asia/Ho_Chi_Minh'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO merchants (id, name, slug, description, email, timezone)
VALUES (
  '33333333-3333-3333-3333-333333333333',
  'Demo Merchant',
  'demo-merchant',
  'Test merchant for development',
  'demo@gudbro.com',
  'UTC'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 7: AI MERCHANT PREFERENCES
-- =====================================================

-- Note: ai_merchant_preferences uses merchant_id as PRIMARY KEY (no separate id column)
INSERT INTO ai_merchant_preferences (merchant_id, preferred_language, communication_style, can_read_menu, can_read_orders, can_read_feedback, can_read_analytics, can_read_events, can_create_events, can_modify_menu, include_last_n_days_data)
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'en',
  'professional',
  true,
  true,
  true,
  true,
  true,
  true,
  false,
  30
) ON CONFLICT (merchant_id) DO NOTHING;

INSERT INTO ai_merchant_preferences (merchant_id, preferred_language, communication_style, can_read_menu, can_read_orders, can_read_feedback, can_read_analytics, can_read_events, can_create_events, can_modify_menu, include_last_n_days_data)
VALUES (
  '22222222-2222-2222-2222-222222222222',
  'en',
  'friendly',
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  14
) ON CONFLICT (merchant_id) DO NOTHING;

-- =====================================================
-- PART 8: SAMPLE EVENTS (for AI Knowledge Base)
-- =====================================================

-- Events table uses: location_id, start_date, start_time, end_time, event_type, event_category
INSERT INTO events (id, location_id, title, description, event_type, event_category, start_date, start_time, end_time, status, is_public, recurrence, recurrence_days)
VALUES (
  'e0000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'Sunday Brunch Special',
  'All-you-can-eat brunch with live acoustic music',
  'brunch',
  'food',
  '2026-01-12',
  '10:00',
  '14:00',
  'published',
  true,
  'weekly',
  ARRAY[7]
) ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, location_id, title, description, event_type, event_category, start_date, start_time, end_time, status, is_public)
VALUES (
  'e0000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  'Full Moon Party',
  'Monthly beach party with DJ and cocktail specials',
  'dj_set',
  'entertainment',
  '2026-01-13',
  '18:00',
  '02:00',
  'published',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO events (id, location_id, title, description, event_type, event_category, start_date, start_time, end_time, status, is_public, sports_info)
VALUES (
  'e0000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Liverpool vs Manchester United',
  'Premier League live on big screen',
  'sports_viewing',
  'sports',
  '2026-01-18',
  '23:00',
  '01:30',
  'published',
  true,
  '{"sport": "football", "homeTeam": "Liverpool", "awayTeam": "Manchester United", "competition": "Premier League"}'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 9: CUSTOMER FEEDBACK (for AI Knowledge Base)
-- =====================================================

-- customer_feedback: type (rating|review|suggestion|issue|compliment), category, message
INSERT INTO customer_feedback (id, merchant_id, account_id, type, category, rating, message, status)
VALUES
  ('f0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', NULL, 'review', 'food_quality', 5, 'Amazing avocado toast and great coffee! Staff is super friendly.', 'resolved'),
  ('f0000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', NULL, 'review', 'service', 4, 'Good food but a bit slow service during peak hours.', 'read'),
  ('f0000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', NULL, 'suggestion', 'menu', NULL, 'Would love to see more vegan options on the menu!', 'new'),
  ('f0000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', NULL, 'review', 'ambience', 5, 'Best sunset views in Hoi An! Cocktails are fantastic.', 'resolved'),
  ('f0000000-0000-0000-0000-000000000005', '22222222-2222-2222-2222-222222222222', NULL, 'issue', 'ambience', 2, 'Music was too loud, could not have a conversation.', 'resolved')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 10: AI DAILY BRIEFINGS (Sample)
-- =====================================================

-- ai_daily_briefings: date (not briefing_date), summary is required
INSERT INTO ai_daily_briefings (id, merchant_id, location_id, date, summary, highlights, alerts, suggestions, generated_at)
VALUES (
  'c0000000-0000-0000-0000-000000000001',
  '11111111-1111-1111-1111-111111111111',
  '10000000-0000-0000-0000-000000000001',
  '2026-01-04',
  'Good day yesterday! Revenue up 15% compared to last Saturday. 3 new 5-star reviews. Watch avocado inventory.',
  '[{"type": "revenue", "title": "Revenue Up", "description": "Revenue up 15% vs last Saturday", "metric": 15, "change": "up"}]',
  '[{"type": "inventory", "priority": "medium", "message": "Avocado stock running low"}]',
  '[{"type": "event", "message": "Consider creating a Super Bowl viewing event"}]',
  '2026-01-04 06:00:00+07'
) ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 11: AI FINANCIAL DATA (P9)
-- =====================================================

-- ai_financial_summaries: period (not period_type), revenue/costs as JSONB
INSERT INTO ai_financial_summaries (id, merchant_id, period, period_start, period_end, revenue, costs, gross_profit, gross_margin, net_profit, net_margin, created_at)
VALUES
  ('d0000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'monthly', '2025-12-01', '2025-12-31', '{"total": 450000000, "byCategory": {"food": 300000000, "beverages": 120000000, "merchandise": 30000000}, "orderCount": 1250, "averageOrderValue": 360000}', '{"total": 320000000, "labor": 100000000, "ingredients": 150000000, "utilities": 20000000, "rent": 50000000}', 130000000, 28.89, 130000000, 28.89, '2026-01-01 00:00:00+07'),
  ('d0000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'monthly', '2025-12-01', '2025-12-31', '{"total": 680000000, "byCategory": {"food": 280000000, "beverages": 350000000, "events": 50000000}, "orderCount": 2100, "averageOrderValue": 323800}', '{"total": 450000000, "labor": 150000000, "ingredients": 200000000, "utilities": 30000000, "rent": 70000000}', 230000000, 33.82, 230000000, 33.82, '2026-01-01 00:00:00+07')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 12: AI INVENTORY DATA (P12)
-- =====================================================

-- Suppliers (columns: id, merchant_id, name, contact_name, email, phone, address, categories, rating, notes, is_active)
-- UUID must be hex only (0-9, a-f)
INSERT INTO ai_suppliers (id, merchant_id, name, contact_name, email, phone, address, categories, rating, notes, is_active)
VALUES
  ('5a000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Fresh Farm Vietnam', 'Mr. Hung', 'hung@freshfarm.vn', '+84 905 123 456', 'Hoa Vang, Da Nang', '{"produce", "dairy"}', 4.5, 'Reliable organic supplier', true),
  ('5a000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'VN Coffee Roasters', 'Ms. Lan', 'lan@vncoffee.vn', '+84 909 234 567', 'Buon Ma Thuot', '{"coffee", "tea"}', 5.0, 'Premium single-origin beans', true),
  ('5a000000-0000-0000-0000-000000000003', '22222222-2222-2222-2222-222222222222', 'Hoi An Seafood Co', 'Mr. Binh', 'binh@hoianseafood.vn', '+84 912 345 678', 'Cua Dai, Hoi An', '{"seafood"}', 4.8, 'Daily fresh catch', true)
ON CONFLICT (id) DO NOTHING;

-- Inventory Items (columns: id, merchant_id, supplier_id, name, category, unit, current_stock, min_stock, max_stock, unit_cost)
-- Note: UNIQUE constraint on (merchant_id, name), no is_active or last_restocked_at
-- UUID must be hex only (0-9, a-f): inv → 1a0
INSERT INTO ai_inventory_items (id, merchant_id, supplier_id, name, category, unit, current_stock, min_stock, max_stock, unit_cost)
VALUES
  ('1a000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', '5a000000-0000-0000-0000-000000000001', 'Organic Avocados', 'produce', 'kg', 15, 10, 50, 85000),
  ('1a000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', '5a000000-0000-0000-0000-000000000001', 'Free-range Eggs', 'dairy', 'piece', 120, 50, 300, 4500),
  ('1a000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', '5a000000-0000-0000-0000-000000000002', 'Arabica Coffee Beans', 'coffee', 'kg', 8, 5, 20, 350000),
  ('1a000000-0000-0000-0000-000000000004', '22222222-2222-2222-2222-222222222222', '5a000000-0000-0000-0000-000000000003', 'Fresh Prawns', 'seafood', 'kg', 5, 3, 15, 280000)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 13: AI WORKFLOW DATA (P11)
-- =====================================================

-- ai_workflow_definitions uses "trigger" not "trigger_type"
-- UUID hex only: wf → af
-- trigger CHECK: 'manual', 'scheduled', 'event', 'condition'
INSERT INTO ai_workflow_definitions (id, merchant_id, name, description, trigger, trigger_config, steps, is_active)
VALUES
  ('af000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Morning Setup', 'Daily opening checklist', 'scheduled', '{"cron": "0 6 * * *", "timezone": "Asia/Ho_Chi_Minh"}', '[{"order": 1, "action": "check_inventory", "params": {"categories": ["produce", "dairy"]}}, {"order": 2, "action": "generate_briefing", "params": {}}, {"order": 3, "action": "notify_staff", "params": {"channel": "slack"}}]', true),
  ('af000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Low Stock Alert', 'Alert when inventory is low', 'event', '{"event_type": "inventory_low"}', '[{"order": 1, "action": "generate_purchase_order", "params": {}}, {"order": 2, "action": "notify_manager", "params": {}}]', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 14: AI TASK DELEGATION (P10)
-- =====================================================

-- ai_delegated_tasks: no location_id column, due_date is TIMESTAMPTZ
-- UUID hex only: task → da5c
-- category CHECK: 'inventory', 'maintenance', 'staff', 'customer', 'marketing', 'financial', 'compliance', 'other'
INSERT INTO ai_delegated_tasks (id, merchant_id, title, description, category, priority, status, assigned_to, due_date, created_by)
VALUES
  ('da5c0000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'Restock avocados', 'Order avocados from Fresh Farm - current stock low', 'inventory', 'high', 'pending', NULL, '2026-01-06 17:00:00+07', 'ai'),
  ('da5c0000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 'Respond to reviews', 'Reply to 3 new Google reviews', 'marketing', 'medium', 'pending', NULL, '2026-01-07 12:00:00+07', 'ai'),
  ('da5c0000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 'Staff meeting prep', 'Prepare agenda for weekly team meeting', 'staff', 'low', 'pending', NULL, '2026-01-08 09:00:00+07', 'ai')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- PART 15: AI SOCIAL MEDIA (P8)
-- =====================================================

-- ai_social_posts: no content_type column, uses content + caption
-- UUID hex only: soc → 50c
INSERT INTO ai_social_posts (id, merchant_id, platform, content, caption, hashtags, scheduled_for, status)
VALUES
  ('50c00000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 'instagram', 'Start your Sunday right with our famous avocado toast!', 'Fresh, healthy, and delicious. Book your table now!', '{"#brunch", "#danang", "#avocadotoast", "#healthyfood", "#rootscafe"}', '2026-01-12 09:00:00+07', 'scheduled'),
  ('50c00000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 'facebook', 'Full Moon Party this Saturday!', 'Live DJ, cocktail specials, and the best sunset in Hoi An.', '{"#fullmoonparty", "#hoian", "#beachclub", "#scallywags"}', '2026-01-11 18:00:00+07', 'scheduled')
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

-- Run this to verify seed data:
/*
SELECT 'organizations' as table_name, COUNT(*) as count FROM organizations
UNION ALL
SELECT 'brands', COUNT(*) FROM brands
UNION ALL
SELECT 'locations', COUNT(*) FROM locations
UNION ALL
SELECT 'accounts', COUNT(*) FROM accounts
UNION ALL
SELECT 'account_roles', COUNT(*) FROM account_roles
UNION ALL
SELECT 'merchants', COUNT(*) FROM merchants
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'customer_feedback', COUNT(*) FROM customer_feedback
UNION ALL
SELECT 'ai_financial_summaries', COUNT(*) FROM ai_financial_summaries
UNION ALL
SELECT 'ai_suppliers', COUNT(*) FROM ai_suppliers
UNION ALL
SELECT 'ai_inventory_items', COUNT(*) FROM ai_inventory_items
UNION ALL
SELECT 'ai_workflow_definitions', COUNT(*) FROM ai_workflow_definitions
UNION ALL
SELECT 'ai_delegated_tasks', COUNT(*) FROM ai_delegated_tasks
UNION ALL
SELECT 'ai_social_posts', COUNT(*) FROM ai_social_posts;
*/

-- =====================================================
-- PART 16: RE-ENABLE TRIGGERS
-- =====================================================

-- Re-create the welcome bonus trigger
CREATE TRIGGER trg_account_welcome_bonus
    AFTER INSERT ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION trigger_account_welcome_bonus();

-- =====================================================
-- SEED DATA COMPLETE
-- =====================================================
