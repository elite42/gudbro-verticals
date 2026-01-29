-- ============================================================================
-- Migration 078: Accommodations Seed Data
-- ============================================================================
-- Date: 2026-01-29
-- Description: Demo data for the In-Stay Dashboard.
--              One complete property "Roots Da Nang" with rooms, bookings,
--              service categories/items, and local partnership deals.
-- Depends on: 077-accommodations-schema.sql, 050-b2b-conventions.sql
-- ============================================================================

-- ============================================================================
-- 0. DEMO HOST ACCOUNT
-- ============================================================================
-- The accom_properties.owner_id is NOT NULL REFERENCES accounts(id),
-- so we need a host account to own the demo property.

INSERT INTO accounts (id, email, first_name, last_name, display_name, locale, timezone, is_active, is_verified)
VALUES (
  'a0000000-0000-0000-0000-000000000010',
  'minh@rootsdanang.com',
  'Minh',
  'Nguyen Van',
  'Minh Nguyen',
  'en',
  'Asia/Ho_Chi_Minh',
  true,
  true
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 1. DEMO PROPERTY: Roots Da Nang
-- ============================================================================

INSERT INTO accom_properties (
  id, name, slug, description, tagline, property_type,
  address, city, country_code, timezone,
  host_name, host_phone, host_email, emergency_phone,
  wifi_ssid, wifi_password,
  currency, default_language, supported_languages,
  check_in_time, check_out_time,
  images, amenities, house_rules,
  owner_id, is_active
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Roots Da Nang',
  'roots-danang',
  'Modern tourist apartment in the heart of Da Nang, steps from My Khe Beach. Perfect base for exploring Central Vietnam.',
  'Your home in Da Nang',
  'apartment',
  '234 Vo Nguyen Giap, Son Tra District',
  'Da Nang',
  'VN',
  'Asia/Ho_Chi_Minh',
  'Nguyen Van Minh',
  '+84905123456',
  'minh@rootsdanang.com',
  '+84905999888',
  'Roots-Guest-5G',
  'welcome2danang',
  'VND',
  'en',
  '{"en","vi"}',
  '14:00',
  '11:00',
  '[]',
  '["wifi", "air_conditioning", "kitchen", "washing_machine", "beach_access", "motorbike_parking", "rooftop_terrace"]',
  'No smoking indoors. Quiet hours 22:00-07:00. No parties. Shoes off at entrance. Trash separation required.',
  'a0000000-0000-0000-0000-000000000010',
  true
);

-- ============================================================================
-- 2. ROOMS
-- ============================================================================

-- Room 101 - Studio
INSERT INTO accom_rooms (id, property_id, room_number, room_type, capacity, floor, description)
VALUES (
  'aa000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '101',
  'studio',
  2,
  '1',
  'Cozy studio with city view, queen bed, and kitchenette'
);

-- Room 201 - Suite
INSERT INTO accom_rooms (id, property_id, room_number, room_type, capacity, floor, description)
VALUES (
  'aa000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '201',
  'suite',
  4,
  '2',
  'Spacious suite with ocean view, king bed, living area, and full kitchen'
);

-- Room 301 - Deluxe
INSERT INTO accom_rooms (id, property_id, room_number, room_type, capacity, floor, description)
VALUES (
  'aa000000-0000-0000-0000-000000000003',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  '301',
  'deluxe',
  2,
  '3',
  'Premium room with panoramic beach view, king bed, and balcony'
);

-- ============================================================================
-- 3. BOOKINGS
-- ============================================================================

-- Booking 1: Current booking (for testing dashboard access)
-- John Smith, checked in 2 days ago, checking out in 5 days
INSERT INTO accom_bookings (
  id, property_id, room_id, booking_code,
  guest_name, guest_last_name, guest_email, guest_phone, guest_count,
  check_in_date, check_out_date, status, booking_source, special_requests
) VALUES (
  'bb000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'aa000000-0000-0000-0000-000000000002',
  'BK-T3ST01',
  'John Smith',
  'Smith',
  'john.smith@example.com',
  '+1555123456',
  2,
  CURRENT_DATE - INTERVAL '2 days',
  CURRENT_DATE + INTERVAL '5 days',
  'checked_in',
  'airbnb',
  'Late check-in, extra towels please'
);

-- Booking 2: Future booking (for testing states)
-- Maria Garcia, arriving in 14 days
INSERT INTO accom_bookings (
  id, property_id, room_id, booking_code,
  guest_name, guest_last_name, guest_email, guest_phone, guest_count,
  check_in_date, check_out_date, status, booking_source
) VALUES (
  'bb000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'aa000000-0000-0000-0000-000000000003',
  'BK-F8TR02',
  'Maria Garcia',
  'Garcia',
  'maria.garcia@example.com',
  '+34612345678',
  1,
  CURRENT_DATE + INTERVAL '14 days',
  CURRENT_DATE + INTERVAL '21 days',
  'confirmed',
  'direct'
);

-- ============================================================================
-- 4. SERVICE CATEGORIES
-- ============================================================================

INSERT INTO accom_service_categories (id, property_id, name, slug, icon, display_order)
VALUES (
  'cc000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Breakfast',
  'breakfast',
  'CookingPot',
  1
);

INSERT INTO accom_service_categories (id, property_id, name, slug, icon, display_order)
VALUES (
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Minibar',
  'minibar',
  'Wine',
  2
);

INSERT INTO accom_service_categories (id, property_id, name, slug, icon, display_order)
VALUES (
  'cc000000-0000-0000-0000-000000000003',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Laundry',
  'laundry',
  'TShirt',
  3
);

-- ============================================================================
-- 5. SERVICE ITEMS
-- ============================================================================

-- --- Breakfast Items (available 07:00 - 10:30) ---

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, available_from, available_until, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000001',
  'cc000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Vietnamese Pho',
  'Traditional beef noodle soup with herbs',
  65000,
  false,
  '07:00',
  '10:30',
  1
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, available_from, available_until, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000002',
  'cc000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Banh Mi Sandwich',
  'Classic Vietnamese baguette with pork and pickled vegetables',
  35000,
  false,
  '07:00',
  '10:30',
  2
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, available_from, available_until, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000003',
  'cc000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Fresh Fruit Plate',
  'Seasonal tropical fruits: mango, dragon fruit, pineapple',
  45000,
  false,
  '07:00',
  '10:30',
  3
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, available_from, available_until, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000004',
  'cc000000-0000-0000-0000-000000000001',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Egg and Toast Set',
  'Two eggs any style with toast, butter, and jam',
  40000,
  false,
  '07:00',
  '10:30',
  4
);

-- --- Minibar Items (always available) ---

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000005',
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Local Beer (333)',
  'Vietnamese lager, 330ml can',
  25000,
  true,
  1
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000006',
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Coca-Cola',
  '330ml can',
  15000,
  true,
  2
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000007',
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Bottled Water',
  'Pure spring water, 500ml',
  10000,
  true,
  3
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000008',
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Saigon Special',
  'Premium Vietnamese beer, 330ml bottle',
  30000,
  true,
  4
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000009',
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Fresh Coconut Water',
  'Young coconut, 500ml',
  20000,
  true,
  5
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000010',
  'cc000000-0000-0000-0000-000000000002',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Instant Coffee Sachets',
  'Vietnamese G7 coffee, pack of 3',
  12000,
  true,
  6
);

-- --- Laundry Items (always available) ---

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000011',
  'cc000000-0000-0000-0000-000000000003',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Wash and Fold (per kg)',
  'Standard laundry service, returned same day',
  30000,
  true,
  1
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000012',
  'cc000000-0000-0000-0000-000000000003',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Iron Only (per item)',
  'Professional pressing service',
  15000,
  true,
  2
);

INSERT INTO accom_service_items (id, category_id, property_id, name, description, price, is_always_available, display_order)
VALUES (
  'dd000000-0000-0000-0000-000000000013',
  'cc000000-0000-0000-0000-000000000003',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Express Wash and Fold',
  'Returned within 3 hours, per kg',
  50000,
  true,
  3
);

-- ============================================================================
-- 6. LOCAL PARTNERSHIP MERCHANTS
-- ============================================================================
-- These minimal merchant records satisfy the FK constraint on partner_conventions.
-- Required NOT NULL columns: id, slug, name, email

INSERT INTO merchants (id, slug, name, email, city, country, currency, is_active)
VALUES (
  'ee000000-0000-0000-0000-000000000001',
  'madame-lan-danang',
  'Madame Lan Restaurant',
  'info@madamelan.vn',
  'Da Nang',
  'VN',
  'VND',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO merchants (id, slug, name, email, city, country, currency, is_active)
VALUES (
  'ee000000-0000-0000-0000-000000000002',
  'hai-van-adventures',
  'Hai Van Adventures',
  'info@haivanadventures.com',
  'Da Nang',
  'VN',
  'VND',
  true
) ON CONFLICT (id) DO NOTHING;

INSERT INTO merchants (id, slug, name, email, city, country, currency, is_active)
VALUES (
  'ee000000-0000-0000-0000-000000000003',
  'danang-airport-transfer',
  'Da Nang Airport Transfer',
  'booking@danangairport.vn',
  'Da Nang',
  'VN',
  'VND',
  true
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 7. PARTNER CONVENTIONS
-- ============================================================================
-- Relationship direction:
--   merchant_id = the local business (restaurant, tour op, transport)
--   partner_type = 'accommodation'
--   partner_id = the property UUID (Roots Da Nang)
--   partner_name = 'Roots Da Nang'

INSERT INTO partner_conventions (
  id, merchant_id, partner_type, partner_id, partner_name,
  convention_name, benefit_type, benefit_value, benefit_description,
  verification_method, is_active
) VALUES (
  'ff000000-0000-0000-0000-000000000001',
  'ee000000-0000-0000-0000-000000000001',
  'accommodation',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Roots Da Nang',
  '10% Guest Discount',
  'percentage_discount',
  10.00,
  '10% off for Roots Da Nang guests. Show your booking confirmation.',
  'link',
  true
);

INSERT INTO partner_conventions (
  id, merchant_id, partner_type, partner_id, partner_name,
  convention_name, benefit_type, benefit_value, benefit_description,
  verification_method, is_active
) VALUES (
  'ff000000-0000-0000-0000-000000000002',
  'ee000000-0000-0000-0000-000000000002',
  'accommodation',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Roots Da Nang',
  'Exclusive Hai Van Pass Tour',
  'special_price',
  45.00,
  'Motorbike tour of Hai Van Pass. $45 instead of $55 for our guests.',
  'link',
  true
);

INSERT INTO partner_conventions (
  id, merchant_id, partner_type, partner_id, partner_name,
  convention_name, benefit_type, benefit_value, benefit_description,
  verification_method, is_active
) VALUES (
  'ff000000-0000-0000-0000-000000000003',
  'ee000000-0000-0000-0000-000000000003',
  'accommodation',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Roots Da Nang',
  'Airport Shuttle',
  'fixed_discount',
  100000.00,
  'Private airport transfer 250,000 VND (regular 350,000). Book via WhatsApp.',
  'link',
  true
);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Test booking access (current booking -- should return valid):
--   SELECT * FROM verify_booking_access('BK-T3ST01', 'Smith');
--   Expected: is_valid = true, property_id = a1b2c3d4-..., guest_name = 'John Smith'
--
-- Test booking access (future booking -- should return invalid):
--   SELECT * FROM verify_booking_access('BK-F8TR02', 'Garcia');
--   Expected: is_valid = false (future booking, check_in_date > CURRENT_DATE)
--
-- Test booking access (wrong last name -- should return invalid):
--   SELECT * FROM verify_booking_access('BK-T3ST01', 'Wrong');
--   Expected: is_valid = false (wrong last name)
--
-- Count seed data:
--   SELECT 'properties' AS entity, COUNT(*) FROM accom_properties
--   UNION ALL SELECT 'rooms', COUNT(*) FROM accom_rooms
--   UNION ALL SELECT 'bookings', COUNT(*) FROM accom_bookings
--   UNION ALL SELECT 'categories', COUNT(*) FROM accom_service_categories
--   UNION ALL SELECT 'items', COUNT(*) FROM accom_service_items;
-- ============================================================================
