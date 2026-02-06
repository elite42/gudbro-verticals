-- Rentals Module - Database Schema (Phase 2)
-- Note: Phase 1 MVP uses external services (Airtable, Google Sheets)
-- This schema is for future proprietary system after validation

-- Rental Businesses (Multiple rental shops can use platform)
CREATE TABLE rental_businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    hub_page_id UUID REFERENCES hub_pages(id) ON DELETE SET NULL,

    -- Business Info
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(50) NOT NULL, -- 'bike', 'car', 'boat', 'equipment'
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,

    -- Location
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(50) DEFAULT 'Vietnam',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Contact
    phone VARCHAR(20),
    email VARCHAR(255),
    whatsapp_number VARCHAR(20),
    zalo_number VARCHAR(20),

    -- Settings
    currency VARCHAR(3) DEFAULT 'VND',
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    is_active BOOLEAN DEFAULT TRUE,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_user_id (user_id),
    INDEX idx_hub_page_id (hub_page_id),
    INDEX idx_business_type (business_type),
    INDEX idx_city (city)
);

-- Rental Fleet (Bikes, Cars, Boats, Equipment)
CREATE TABLE rental_fleet (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,

    -- Item Details
    item_type VARCHAR(50) NOT NULL, -- 'bike', 'scooter', 'car', 'boat', 'surfboard', etc.
    brand VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    color VARCHAR(50),

    -- Specifications (JSONB for flexibility)
    specs JSONB DEFAULT '{}'::jsonb, -- {"engine": "125cc", "transmission": "automatic", "seats": 2}

    -- Identifiers
    license_plate VARCHAR(50), -- For vehicles
    serial_number VARCHAR(100),

    -- Media
    photos JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
    thumbnail_url TEXT,

    -- Pricing
    hourly_rate INTEGER, -- VND (null if not rented hourly)
    daily_rate INTEGER NOT NULL, -- VND
    weekly_rate INTEGER, -- Discount for week
    monthly_rate INTEGER, -- Discount for month

    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    condition VARCHAR(50) DEFAULT 'excellent', -- excellent, good, fair
    condition_notes TEXT,
    last_maintenance_date DATE,
    next_maintenance_date DATE,

    -- Location (if multi-location)
    location VARCHAR(100), -- 'main_shop', 'airport', 'beach'

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_business_id (business_id),
    INDEX idx_item_type (item_type),
    INDEX idx_is_available (is_available),
    INDEX idx_daily_rate (daily_rate)
);

-- Rental Bookings
CREATE TABLE rental_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,
    fleet_item_id UUID REFERENCES rental_fleet(id) ON DELETE RESTRICT,

    -- Customer Info
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255),
    customer_phone VARCHAR(20) NOT NULL,
    customer_whatsapp VARCHAR(20),

    -- Booking Dates
    pickup_date DATE NOT NULL,
    pickup_time TIME,
    return_date DATE NOT NULL,
    return_time TIME,
    total_days INTEGER NOT NULL,

    -- Pickup/Return
    pickup_location VARCHAR(100), -- 'shop', 'delivery', 'airport'
    delivery_address TEXT, -- If delivery
    delivery_fee INTEGER DEFAULT 0,
    return_location VARCHAR(100),

    -- Pricing
    base_price INTEGER NOT NULL, -- Total for rental period
    addons_price INTEGER DEFAULT 0,
    delivery_price INTEGER DEFAULT 0,
    discount_amount INTEGER DEFAULT 0,
    total_price INTEGER NOT NULL,

    -- Add-ons (JSONB for flexibility)
    addons JSONB DEFAULT '[]'::jsonb,
    -- Example: [{"item": "helmet", "quantity": 2, "price": 50000}, {"item": "insurance", "price": 100000}]

    -- Payment
    payment_method VARCHAR(50), -- 'vietqr', 'stripe', 'cash', 'momo', 'zalopay'
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, partial, refunded
    paid_amount INTEGER DEFAULT 0,
    payment_date TIMESTAMP,
    payment_reference TEXT, -- Transaction ID

    -- Documents (uploaded by customer)
    id_document_url TEXT, -- Passport/ID photo
    selfie_photo_url TEXT, -- Face verification
    license_photo_url TEXT, -- For car/bike rentals

    -- Status
    booking_status VARCHAR(50) DEFAULT 'pending',
    -- pending, confirmed, active, completed, cancelled, no_show

    -- Contract
    contract_signed BOOLEAN DEFAULT FALSE,
    contract_signed_at TIMESTAMP,
    contract_pdf_url TEXT,

    -- Special Requests
    special_requests TEXT,
    internal_notes TEXT, -- Admin notes

    -- Actual Return (can differ from booking)
    actual_return_date DATE,
    actual_return_time TIME,
    late_return_fee INTEGER DEFAULT 0,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_business_id (business_id),
    INDEX idx_fleet_item_id (fleet_item_id),
    INDEX idx_customer_phone (customer_phone),
    INDEX idx_pickup_date (pickup_date),
    INDEX idx_booking_status (booking_status),
    INDEX idx_payment_status (payment_status)
);

-- Damage Reports
CREATE TABLE rental_damage_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,
    fleet_item_id UUID REFERENCES rental_fleet(id) ON DELETE CASCADE,

    -- Report Type
    report_type VARCHAR(50) NOT NULL, -- 'pre_rental', 'post_rental', 'incident'

    -- Damage Details
    damage_description TEXT NOT NULL,
    damage_severity VARCHAR(50), -- 'minor', 'moderate', 'severe'
    damage_photos JSONB DEFAULT '[]'::jsonb, -- Array of photo URLs

    -- Cost
    estimated_cost INTEGER,
    actual_cost INTEGER,
    insurance_covered BOOLEAN DEFAULT FALSE,
    customer_charged INTEGER DEFAULT 0,

    -- Resolution
    resolved BOOLEAN DEFAULT FALSE,
    resolution_notes TEXT,
    resolved_at TIMESTAMP,

    -- Metadata
    reported_by VARCHAR(50), -- 'customer', 'staff'
    created_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_booking_id (booking_id),
    INDEX idx_fleet_item_id (fleet_item_id),
    INDEX idx_report_type (report_type)
);

-- Rental Reviews
CREATE TABLE rental_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,

    -- Rating
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
    vehicle_condition_rating INTEGER,
    customer_service_rating INTEGER,
    value_for_money_rating INTEGER,

    -- Review
    review_title VARCHAR(255),
    review_text TEXT,
    photos JSONB DEFAULT '[]'::jsonb,

    -- Customer
    customer_name VARCHAR(255),
    customer_country VARCHAR(50),

    -- Status
    is_verified BOOLEAN DEFAULT FALSE, -- Verified booking
    is_visible BOOLEAN DEFAULT TRUE,
    flagged BOOLEAN DEFAULT FALSE,

    -- Response
    business_response TEXT,
    response_date TIMESTAMP,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_business_id (business_id),
    INDEX idx_booking_id (booking_id),
    INDEX idx_overall_rating (overall_rating),
    INDEX idx_is_visible (is_visible)
);

-- Availability Calendar (Pre-computed for fast lookups)
CREATE TABLE rental_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fleet_item_id UUID REFERENCES rental_fleet(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES rental_bookings(id) ON DELETE CASCADE,

    -- Date Range
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,

    -- Reason (if not available)
    unavailability_reason VARCHAR(100), -- 'booked', 'maintenance', 'blocked'

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (fleet_item_id, date),
    INDEX idx_fleet_item_id_date (fleet_item_id, date),
    INDEX idx_date (date)
);

-- Add-on Products (Helmets, Insurance, GPS, etc.)
CREATE TABLE rental_addons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,

    -- Add-on Details
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50), -- 'safety', 'convenience', 'insurance'

    -- Pricing
    price_type VARCHAR(50), -- 'per_day', 'per_booking', 'per_item'
    price INTEGER NOT NULL,

    -- Availability
    is_available BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER, -- null = unlimited

    -- Display
    icon VARCHAR(100), -- Lucide icon name
    display_order INTEGER DEFAULT 0,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    INDEX idx_business_id (business_id),
    INDEX idx_is_available (is_available)
);

-- Triggers: Update updated_at
CREATE OR REPLACE FUNCTION update_rentals_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rental_businesses_updated_at
BEFORE UPDATE ON rental_businesses
FOR EACH ROW EXECUTE FUNCTION update_rentals_updated_at();

CREATE TRIGGER rental_fleet_updated_at
BEFORE UPDATE ON rental_fleet
FOR EACH ROW EXECUTE FUNCTION update_rentals_updated_at();

CREATE TRIGGER rental_bookings_updated_at
BEFORE UPDATE ON rental_bookings
FOR EACH ROW EXECUTE FUNCTION update_rentals_updated_at();

CREATE TRIGGER rental_addons_updated_at
BEFORE UPDATE ON rental_addons
FOR EACH ROW EXECUTE FUNCTION update_rentals_updated_at();

-- View: Business Dashboard Stats
CREATE VIEW rental_business_stats AS
SELECT
    rb.id,
    rb.business_name,
    COUNT(DISTINCT rf.id) as total_fleet,
    COUNT(DISTINCT rf.id) FILTER (WHERE rf.is_available = true) as available_fleet,
    COUNT(DISTINCT rbo.id) as total_bookings,
    COUNT(DISTINCT rbo.id) FILTER (WHERE rbo.booking_status = 'confirmed') as confirmed_bookings,
    COUNT(DISTINCT rbo.id) FILTER (WHERE rbo.booking_status = 'active') as active_bookings,
    COALESCE(SUM(rbo.total_price) FILTER (WHERE rbo.payment_status = 'paid'), 0) as total_revenue,
    COALESCE(AVG(rr.overall_rating), 0) as average_rating,
    COUNT(DISTINCT rr.id) as total_reviews
FROM rental_businesses rb
LEFT JOIN rental_fleet rf ON rb.id = rf.business_id
LEFT JOIN rental_bookings rbo ON rb.id = rbo.business_id
LEFT JOIN rental_reviews rr ON rb.id = rr.business_id
GROUP BY rb.id;
