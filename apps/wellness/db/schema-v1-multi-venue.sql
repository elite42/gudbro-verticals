-- =====================================================
-- Wellness/Spa Module - Database Schema v1.0
-- Multi-Venue Support with Staff Member Association
-- =====================================================
--
-- Purpose: Complete database schema for spa, massage, beauty, wellness businesses
-- Key Feature: Staff member association with services (e.g., "Thai Massage with Linh")
-- Multi-Venue: Supports chains with multiple locations
--
-- Created: 2025-11-06
-- Status: Production Ready (Phase 2+)
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. WELLNESS BUSINESSES (Hub Configuration)
-- =====================================================

CREATE TABLE wellness_businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hub_id VARCHAR(255) UNIQUE NOT NULL, -- External Hub ID from main platform

    -- Business Info
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) NOT NULL, -- 'spa', 'massage', 'salon', 'barbershop', 'nails', 'wellness'
    description TEXT,
    tagline TEXT,

    -- Multi-Venue Config
    multi_venue BOOLEAN DEFAULT FALSE,
    primary_location_id UUID, -- Set after creating locations

    -- Branding
    logo_url TEXT,
    cover_image_url TEXT,
    brand_colors JSONB, -- {"primary": "#FF6B6B", "secondary": "#4ECDC4"}

    -- Languages
    supported_languages JSONB DEFAULT '["vi", "en", "ko", "zh"]'::jsonb,
    default_language VARCHAR(5) DEFAULT 'vi',

    -- Settings
    settings JSONB DEFAULT '{}'::jsonb, -- Additional configuration
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wellness_businesses_hub_id ON wellness_businesses(hub_id);
CREATE INDEX idx_wellness_businesses_type ON wellness_businesses(business_type);

-- =====================================================
-- 2. WELLNESS LOCATIONS (Multi-Venue Support)
-- =====================================================

CREATE TABLE wellness_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES wellness_businesses(id) ON DELETE CASCADE,

    -- Location Info
    name VARCHAR(255) NOT NULL, -- "City Center Spa", "Beach Location"
    slug VARCHAR(255), -- URL-friendly name
    description TEXT,

    -- Address
    address TEXT,
    neighborhood VARCHAR(100), -- "An Thuong", "My Khe Beach"
    city VARCHAR(100) DEFAULT 'Da Nang',
    region VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Vietnam',

    -- Geo Coordinates
    coordinates JSONB, -- {"lat": 16.054, "lng": 108.202}

    -- Contact
    phone VARCHAR(20),
    email VARCHAR(255),
    whatsapp VARCHAR(20),
    zalo VARCHAR(50),

    -- Operating Hours
    opening_hours JSONB, -- [{"days": ["Mon", "Tue"], "open": "09:00", "close": "21:00"}]

    -- Amenities
    amenities JSONB, -- ["wifi", "parking", "shower", "lockers", "sauna", "jacuzzi"]

    -- Images
    images JSONB, -- ["url1", "url2", "url3"]

    -- Status
    is_primary BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    accepts_bookings BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wellness_locations_business ON wellness_locations(business_id);
CREATE INDEX idx_wellness_locations_slug ON wellness_locations(slug);
CREATE INDEX idx_wellness_locations_city ON wellness_locations(city);

-- =====================================================
-- 3. WELLNESS STAFF (Staff Members - KEY FEATURE!)
-- =====================================================

CREATE TABLE wellness_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES wellness_businesses(id) ON DELETE CASCADE,

    -- Personal Info
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255), -- URL-friendly name for profile page
    title VARCHAR(100), -- "Senior Therapist", "Master Barber", "Nail Technician"
    bio TEXT,

    -- Professional Info
    specialties JSONB, -- ["Thai Massage", "Deep Tissue", "Aromatherapy"]
    certifications JSONB, -- ["Thai Massage Certificate 2020", "Reflexology License"]
    years_experience INTEGER,

    -- Languages Spoken
    languages JSONB, -- ["Vietnamese", "English", "Korean"]

    -- Availability
    available_locations JSONB, -- [location_id_1, location_id_2] - which locations they work at
    working_hours JSONB, -- [{"days": ["Mon", "Tue"], "start": "09:00", "end": "18:00"}]

    -- Profile
    profile_image TEXT,
    gallery_images JSONB, -- Additional images for portfolio

    -- Rating & Reviews
    rating_average DECIMAL(3,2) DEFAULT 0.00, -- 0.00 to 5.00
    rating_count INTEGER DEFAULT 0,

    -- Pricing (if staff has premium pricing)
    premium_pricing BOOLEAN DEFAULT FALSE, -- If true, services with this staff cost more
    premium_percentage INTEGER DEFAULT 0, -- e.g., 20 = +20% on service price

    -- Status
    is_featured BOOLEAN DEFAULT FALSE, -- Show on homepage
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0, -- For sorting

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wellness_staff_business ON wellness_staff(business_id);
CREATE INDEX idx_wellness_staff_slug ON wellness_staff(slug);
CREATE INDEX idx_wellness_staff_featured ON wellness_staff(is_featured, display_order);

-- =====================================================
-- 4. WELLNESS SERVICES (Services Offered)
-- =====================================================

CREATE TABLE wellness_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES wellness_businesses(id) ON DELETE CASCADE,

    -- Service Info
    name VARCHAR(255) NOT NULL, -- "Traditional Thai Massage", "Deep Tissue Massage"
    slug VARCHAR(255), -- URL-friendly name
    category VARCHAR(100) NOT NULL, -- "massage", "facial", "manicure", "haircut", "spa"
    description TEXT,

    -- Service Details
    duration INTEGER NOT NULL, -- Duration in minutes (60, 90, 120)
    includes JSONB, -- ["Hot stones", "Aromatherapy oil", "Herbal compress"]
    benefits JSONB, -- ["Stress relief", "Muscle relaxation", "Improved circulation"]

    -- Images
    image_url TEXT,
    gallery_images JSONB,

    -- Availability
    available_locations JSONB, -- [location_id_1, location_id_2]
    requires_staff BOOLEAN DEFAULT TRUE, -- If false, service can be booked without specific staff

    -- Popular / Featured
    is_popular BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,

    -- Status
    is_active BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wellness_services_business ON wellness_services(business_id);
CREATE INDEX idx_wellness_services_category ON wellness_services(category);
CREATE INDEX idx_wellness_services_slug ON wellness_services(slug);

-- =====================================================
-- 5. SERVICE STAFF (Many-to-Many: Services ↔ Staff)
-- =====================================================
-- Allows associating multiple staff members with each service
-- E.g., "Thai Massage" available with Linh, Mai, and Hoa

CREATE TABLE service_staff (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES wellness_services(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES wellness_staff(id) ON DELETE CASCADE,

    -- Custom pricing for this staff-service combination (optional)
    custom_price INTEGER, -- If set, overrides default service price

    -- Availability for this specific combination
    is_available BOOLEAN DEFAULT TRUE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(service_id, staff_id)
);

CREATE INDEX idx_service_staff_service ON service_staff(service_id);
CREATE INDEX idx_service_staff_staff ON service_staff(staff_id);

-- =====================================================
-- 6. WELLNESS PRICING (Service Pricing)
-- =====================================================

CREATE TABLE wellness_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES wellness_services(id) ON DELETE CASCADE,
    location_id UUID REFERENCES wellness_locations(id) ON DELETE CASCADE,

    -- Pricing (in VND)
    base_price INTEGER NOT NULL, -- Base price for service

    -- Time-based pricing (optional)
    morning_discount INTEGER, -- Discount % for morning slots (before 12pm)
    evening_premium INTEGER, -- Premium % for evening slots (after 6pm)
    weekend_premium INTEGER, -- Premium % for weekend bookings

    -- Packages (optional)
    package_3_sessions INTEGER, -- Price for 3-session package
    package_5_sessions INTEGER, -- Price for 5-session package
    package_10_sessions INTEGER, -- Price for 10-session package

    -- Deposit
    deposit_required BOOLEAN DEFAULT FALSE,
    deposit_amount INTEGER DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(service_id, location_id)
);

CREATE INDEX idx_wellness_pricing_service ON wellness_pricing(service_id);
CREATE INDEX idx_wellness_pricing_location ON wellness_pricing(location_id);

-- =====================================================
-- 7. CONTACT SETTINGS (Multi-Channel Communication)
-- =====================================================

CREATE TABLE wellness_contact_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES wellness_businesses(id) ON DELETE CASCADE,

    -- Primary Channel (Vietnam: Zalo is #1)
    primary_channel VARCHAR(20) DEFAULT 'zalo', -- 'zalo', 'whatsapp', 'email', 'telegram'

    -- Zalo (Most popular in Vietnam)
    zalo_id VARCHAR(50),
    zalo_qr_url TEXT,

    -- WhatsApp
    whatsapp_number VARCHAR(20),
    whatsapp_message_template TEXT,

    -- Email
    email VARCHAR(255),
    email_template TEXT,

    -- Telegram
    telegram_username VARCHAR(100),
    telegram_bot_token TEXT,

    -- Phone
    phone_number VARCHAR(20),
    phone_international VARCHAR(20), -- +84905123456

    -- Additional
    facebook_page VARCHAR(255),
    instagram_handle VARCHAR(100),
    line_id VARCHAR(100), -- Popular in Thailand

    -- Booking Integration (Phase 2)
    cal_com_embed_url TEXT, -- Cal.com booking widget
    booking_enabled BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wellness_contact_business ON wellness_contact_settings(business_id);

-- =====================================================
-- 8. WELLNESS BOOKINGS (Appointments - Phase 2)
-- =====================================================

CREATE TABLE wellness_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES wellness_businesses(id) ON DELETE CASCADE,
    location_id UUID REFERENCES wellness_locations(id),
    service_id UUID REFERENCES wellness_services(id),
    staff_id UUID REFERENCES wellness_staff(id), -- Can be NULL if customer has no preference

    -- Customer Info
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    customer_notes TEXT,

    -- Booking Details
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    duration INTEGER NOT NULL, -- Minutes

    -- Pricing
    price INTEGER NOT NULL,
    deposit_paid INTEGER DEFAULT 0,
    total_paid INTEGER DEFAULT 0,

    -- Payment Method
    payment_method VARCHAR(50), -- 'cash', 'vietqr', 'card', 'zalo_pay'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'partial', 'paid'

    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'

    -- Communication
    confirmation_sent BOOLEAN DEFAULT FALSE,
    reminder_sent BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wellness_bookings_business ON wellness_bookings(business_id);
CREATE INDEX idx_wellness_bookings_date ON wellness_bookings(booking_date);
CREATE INDEX idx_wellness_bookings_staff ON wellness_bookings(staff_id);
CREATE INDEX idx_wellness_bookings_status ON wellness_bookings(status);

-- =====================================================
-- 9. SERVICE REVIEWS (Customer Reviews - Phase 3)
-- =====================================================

CREATE TABLE service_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES wellness_businesses(id) ON DELETE CASCADE,
    service_id UUID REFERENCES wellness_services(id) ON DELETE CASCADE,
    staff_id UUID REFERENCES wellness_staff(id) ON DELETE SET NULL, -- Can review staff specifically
    booking_id UUID REFERENCES wellness_bookings(id) ON DELETE SET NULL,

    -- Review Content
    reviewer_name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,

    -- Images (optional)
    images JSONB,

    -- Response from business (optional)
    business_response TEXT,
    response_date TIMESTAMP,

    -- Verification
    verified BOOLEAN DEFAULT FALSE, -- True if from actual booking

    -- Status
    is_approved BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,

    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_reviews_service ON service_reviews(service_id);
CREATE INDEX idx_service_reviews_staff ON service_reviews(staff_id);
CREATE INDEX idx_service_reviews_rating ON service_reviews(rating);

-- =====================================================
-- SAMPLE DATA: Da Nang Luxury Spa
-- =====================================================

-- 1. Create Business
INSERT INTO wellness_businesses (hub_id, business_name, business_type, description, tagline, multi_venue, supported_languages, default_language)
VALUES (
    '660e8400-e29b-41d4-a716-446655440000',
    'Da Nang Luxury Spa',
    'spa',
    'Traditional Vietnamese spa and massage services in the heart of Da Nang. Our experienced therapists provide authentic Thai massage, aromatherapy, and rejuvenating spa treatments.',
    '🌺 Your Wellness Sanctuary',
    TRUE,
    '["vi", "en", "ko", "zh"]'::jsonb,
    'vi'
);

-- 2. Create Locations
INSERT INTO wellness_locations (business_id, name, slug, description, address, neighborhood, city, coordinates, phone, opening_hours, amenities, is_primary, is_active)
VALUES
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'City Center Spa',
    'city-center',
    'Our flagship location in the heart of Da Nang city center',
    '123 Tran Phu Street',
    'Hai Chau',
    'Da Nang',
    '{"lat": 16.0544, "lng": 108.2022}'::jsonb,
    '+84 905 234 567',
    '[{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "open": "09:00", "close": "21:00"}, {"days": ["Saturday", "Sunday"], "open": "09:00", "close": "22:00"}]'::jsonb,
    '["wifi", "parking", "shower", "lockers", "sauna", "steam_room", "tea_lounge"]'::jsonb,
    TRUE,
    TRUE
),
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'My Khe Beach Spa',
    'my-khe-beach',
    'Beachfront spa with ocean views and premium treatments',
    '456 Vo Nguyen Giap Street',
    'My Khe Beach',
    'Da Nang',
    '{"lat": 16.0385, "lng": 108.2419}'::jsonb,
    '+84 905 234 568',
    '[{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "open": "08:00", "close": "22:00"}]'::jsonb,
    '["wifi", "parking", "shower", "lockers", "jacuzzi", "ocean_view", "tea_lounge", "couples_suite"]'::jsonb,
    FALSE,
    TRUE
);

-- 3. Create Staff Members (KEY FEATURE!)
INSERT INTO wellness_staff (business_id, name, slug, title, bio, specialties, certifications, years_experience, languages, available_locations, profile_image, rating_average, rating_count, premium_pricing, premium_percentage, is_featured, is_active, display_order)
VALUES
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Linh Nguyen',
    'linh-nguyen',
    'Senior Thai Massage Therapist',
    'Linh has over 10 years of experience in traditional Thai massage and deep tissue therapy. Trained in Bangkok, she brings authentic techniques and healing touch to every session.',
    '["Thai Massage", "Deep Tissue", "Aromatherapy", "Hot Stone"]'::jsonb,
    '["Thai Massage Certificate (Bangkok, 2014)", "Aromatherapy Specialist (2018)"]'::jsonb,
    10,
    '["Vietnamese", "English", "Thai"]'::jsonb,
    (SELECT jsonb_agg(id) FROM wellness_locations WHERE business_id = (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000')),
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop',
    4.9,
    156,
    TRUE,
    15, -- +15% premium for Linh's services
    TRUE,
    TRUE,
    1
),
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Mai Tran',
    'mai-tran',
    'Facial & Skincare Specialist',
    'Mai specializes in advanced facial treatments and Korean skincare techniques. Her gentle approach and expertise make her a favorite for facial rejuvenation.',
    '["Facial Treatments", "Microdermabrasion", "Korean Skincare", "Anti-aging"]'::jsonb,
    '["Advanced Facial Therapy (Seoul, 2019)", "K-Beauty Specialist (2020)"]'::jsonb,
    7,
    '["Vietnamese", "English", "Korean"]'::jsonb,
    (SELECT jsonb_build_array((SELECT id FROM wellness_locations WHERE slug = 'city-center' LIMIT 1))),
    'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
    4.8,
    98,
    TRUE,
    10,
    TRUE,
    TRUE,
    2
),
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Hoa Le',
    'hoa-le',
    'Reflexology Expert',
    'Hoa brings ancient Vietnamese reflexology wisdom to modern wellness. Her precise pressure point techniques provide deep relaxation and healing.',
    '["Reflexology", "Foot Massage", "Acupressure"]'::jsonb,
    '["Vietnamese Traditional Medicine Certificate", "Reflexology Master (2016)"]'::jsonb,
    12,
    '["Vietnamese", "English"]'::jsonb,
    (SELECT jsonb_agg(id) FROM wellness_locations WHERE business_id = (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000')),
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    4.7,
    124,
    FALSE,
    0,
    FALSE,
    TRUE,
    3
);

-- 4. Create Services
INSERT INTO wellness_services (business_id, name, slug, category, description, duration, includes, benefits, available_locations, requires_staff, is_popular, is_featured, display_order, is_active)
VALUES
-- Massage Services
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Traditional Thai Massage',
    'traditional-thai-massage',
    'massage',
    'Authentic Thai massage using ancient techniques to stretch muscles, improve flexibility, and release tension. Perfect for stress relief and muscle recovery.',
    90,
    '["Herbal compress", "Aromatherapy oil", "Hot towel", "Green tea"]'::jsonb,
    '["Stress relief", "Improved flexibility", "Better circulation", "Muscle relaxation"]'::jsonb,
    (SELECT jsonb_agg(id) FROM wellness_locations),
    TRUE,
    TRUE,
    TRUE,
    1,
    TRUE
),
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Deep Tissue Massage',
    'deep-tissue-massage',
    'massage',
    'Intensive massage targeting deep muscle layers to release chronic tension and knots. Ideal for athletes and those with persistent muscle pain.',
    60,
    '["Deep pressure techniques", "Therapeutic oil", "Hot stones (optional)", "Herbal tea"]'::jsonb,
    '["Pain relief", "Improved mobility", "Tension release", "Injury recovery"]'::jsonb,
    (SELECT jsonb_agg(id) FROM wellness_locations),
    TRUE,
    TRUE,
    FALSE,
    2,
    TRUE
),
-- Facial Services
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Korean Glass Skin Facial',
    'korean-glass-skin-facial',
    'facial',
    'Achieve luminous, translucent skin with our signature Korean facial. Multi-step treatment including double cleansing, exfoliation, hydration, and LED therapy.',
    75,
    '["Double cleanse", "Exfoliation", "Sheet masks", "LED therapy", "Moisturizing cream"]'::jsonb,
    '["Radiant skin", "Deep hydration", "Pore refinement", "Anti-aging"]'::jsonb,
    (SELECT jsonb_build_array((SELECT id FROM wellness_locations WHERE slug = 'city-center' LIMIT 1))),
    TRUE,
    TRUE,
    TRUE,
    3,
    TRUE
),
-- Specialty Services
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Reflexology Foot Massage',
    'reflexology-foot-massage',
    'reflexology',
    'Traditional Vietnamese reflexology targeting pressure points on feet to promote healing throughout the body. Deeply relaxing and therapeutic.',
    45,
    '["Foot soak", "Pressure point therapy", "Herbal balm", "Ginger tea"]'::jsonb,
    '["Full body relaxation", "Improved circulation", "Stress relief", "Better sleep"]'::jsonb,
    (SELECT jsonb_agg(id) FROM wellness_locations),
    TRUE,
    TRUE,
    FALSE,
    4,
    TRUE
),
(
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'Couples Spa Package',
    'couples-spa-package',
    'package',
    'Romantic spa experience for two. Includes side-by-side massage, private couples suite, champagne, and chocolate-covered strawberries.',
    120,
    '["Side-by-side massage", "Private suite", "Champagne", "Strawberries", "Rose petals"]'::jsonb,
    '["Romantic experience", "Shared relaxation", "Quality time", "Stress relief"]'::jsonb,
    (SELECT jsonb_build_array((SELECT id FROM wellness_locations WHERE slug = 'my-khe-beach' LIMIT 1))),
    TRUE,
    FALSE,
    TRUE,
    5,
    TRUE
);

-- 5. Associate Staff with Services
INSERT INTO service_staff (service_id, staff_id, is_available)
VALUES
-- Thai Massage: Linh (specialist)
((SELECT id FROM wellness_services WHERE slug = 'traditional-thai-massage'), (SELECT id FROM wellness_staff WHERE slug = 'linh-nguyen'), TRUE),
-- Deep Tissue: Linh (also does deep tissue)
((SELECT id FROM wellness_services WHERE slug = 'deep-tissue-massage'), (SELECT id FROM wellness_staff WHERE slug = 'linh-nguyen'), TRUE),
-- Korean Facial: Mai (specialist)
((SELECT id FROM wellness_services WHERE slug = 'korean-glass-skin-facial'), (SELECT id FROM wellness_staff WHERE slug = 'mai-tran'), TRUE),
-- Reflexology: Hoa (specialist)
((SELECT id FROM wellness_services WHERE slug = 'reflexology-foot-massage'), (SELECT id FROM wellness_staff WHERE slug = 'hoa-le'), TRUE),
-- Couples Package: Available with Linh + Hoa
((SELECT id FROM wellness_services WHERE slug = 'couples-spa-package'), (SELECT id FROM wellness_staff WHERE slug = 'linh-nguyen'), TRUE);

-- 6. Set Pricing (Location-specific)
INSERT INTO wellness_pricing (service_id, location_id, base_price, weekend_premium, deposit_required, deposit_amount)
VALUES
-- Thai Massage
(
    (SELECT id FROM wellness_services WHERE slug = 'traditional-thai-massage'),
    (SELECT id FROM wellness_locations WHERE slug = 'city-center'),
    450000, -- 450k VND
    10, -- +10% on weekends
    FALSE,
    0
),
(
    (SELECT id FROM wellness_services WHERE slug = 'traditional-thai-massage'),
    (SELECT id FROM wellness_locations WHERE slug = 'my-khe-beach'),
    500000, -- 500k VND (beach premium)
    15, -- +15% on weekends
    FALSE,
    0
),
-- Deep Tissue
(
    (SELECT id FROM wellness_services WHERE slug = 'deep-tissue-massage'),
    (SELECT id FROM wellness_locations WHERE slug = 'city-center'),
    400000,
    10,
    FALSE,
    0
),
-- Korean Facial
(
    (SELECT id FROM wellness_services WHERE slug = 'korean-glass-skin-facial'),
    (SELECT id FROM wellness_locations WHERE slug = 'city-center'),
    650000,
    10,
    TRUE,
    100000 -- Require 100k deposit for facial
),
-- Reflexology
(
    (SELECT id FROM wellness_services WHERE slug = 'reflexology-foot-massage'),
    (SELECT id FROM wellness_locations WHERE slug = 'city-center'),
    300000,
    5,
    FALSE,
    0
),
-- Couples Package
(
    (SELECT id FROM wellness_services WHERE slug = 'couples-spa-package'),
    (SELECT id FROM wellness_locations WHERE slug = 'my-khe-beach'),
    1200000,
    20, -- +20% on weekends
    TRUE,
    300000 -- Require 300k deposit
);

-- 7. Contact Settings
INSERT INTO wellness_contact_settings (business_id, primary_channel, zalo_id, whatsapp_number, email, phone_number, phone_international)
VALUES (
    (SELECT id FROM wellness_businesses WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000'),
    'zalo',
    '0905234567',
    '+84905234567',
    'info@danangspа.com',
    '0905 234 567',
    '+84905234567'
);

-- =====================================================
-- END OF SCHEMA
-- =====================================================

-- Update business with primary location
UPDATE wellness_businesses
SET primary_location_id = (SELECT id FROM wellness_locations WHERE slug = 'city-center' LIMIT 1)
WHERE hub_id = '660e8400-e29b-41d4-a716-446655440000';

-- Sample Queries for Testing:

-- Get all services with associated staff members
-- SELECT
--     s.name as service_name,
--     s.category,
--     s.duration,
--     st.name as staff_name,
--     st.title as staff_title,
--     st.rating_average,
--     st.premium_percentage
-- FROM wellness_services s
-- JOIN service_staff ss ON s.id = ss.service_id
-- JOIN wellness_staff st ON ss.staff_id = st.id
-- WHERE s.is_active = TRUE AND st.is_active = TRUE
-- ORDER BY s.display_order, st.rating_average DESC;

-- Get staff member with their services
-- SELECT
--     st.name as staff_name,
--     st.title,
--     st.specialties,
--     st.rating_average,
--     jsonb_agg(jsonb_build_object('service', s.name, 'category', s.category, 'duration', s.duration)) as services
-- FROM wellness_staff st
-- JOIN service_staff ss ON st.id = ss.staff_id
-- JOIN wellness_services s ON ss.service_id = s.id
-- WHERE st.slug = 'linh-nguyen'
-- GROUP BY st.id;
