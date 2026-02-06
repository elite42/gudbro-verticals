-- Rentals Module - Multi-Venue Database Schema (Phase 2 Ready)
-- Version: 2.0
-- Date: 2025-11-06
-- Features: Multi-venue, Multi-category (Motorcycles + Bicycles), Duration pricing, Multi-channel contact

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Rental Businesses (Hub)
CREATE TABLE rental_businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    hub_page_id UUID REFERENCES hub_pages(id) ON DELETE CASCADE,

    -- Business Info
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(50) NOT NULL DEFAULT 'rental', -- 'rental', 'rental+sale'
    description TEXT,
    logo_url TEXT,
    cover_image_url TEXT,

    -- Contact Info (Primary)
    primary_phone VARCHAR(20),
    primary_email VARCHAR(255),

    -- Settings
    is_active BOOLEAN DEFAULT TRUE,
    multi_venue BOOLEAN DEFAULT FALSE, -- Enable multi-venue features

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rental_businesses_user ON rental_businesses(user_id);
CREATE INDEX idx_rental_businesses_hub ON rental_businesses(hub_page_id);

-- ============================================================================
-- MULTI-VENUE TABLES
-- ============================================================================

-- Locations (Venues)
CREATE TABLE rental_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,

    -- Location Info
    name VARCHAR(255) NOT NULL, -- "City Center", "An Thuong Beach", "Airport Pickup"
    address TEXT,
    coordinates JSONB, -- {"lat": 16.054, "lng": 108.202}

    -- Contact (Location-specific)
    phone VARCHAR(20),
    email VARCHAR(255),

    -- Operating Hours
    opening_hours JSONB, -- {"mon": "8:00-20:00", "tue": "8:00-20:00", ...}

    -- Settings
    is_primary BOOLEAN DEFAULT FALSE, -- Primary location
    is_active BOOLEAN DEFAULT TRUE,
    accepts_pickup BOOLEAN DEFAULT TRUE,
    accepts_return BOOLEAN DEFAULT TRUE,

    -- Display Order
    display_order INTEGER DEFAULT 0,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rental_locations_business ON rental_locations(business_id);
CREATE INDEX idx_rental_locations_active ON rental_locations(is_active);

-- ============================================================================
-- FLEET / INVENTORY TABLES
-- ============================================================================

-- Rental Items (Bikes, Bicycles, etc.)
CREATE TABLE rental_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,

    -- Item Type
    category VARCHAR(50) NOT NULL, -- 'scooter', 'sport', 'electric', 'bicycle'
    item_type VARCHAR(20) NOT NULL DEFAULT 'rental', -- 'rental', 'sale', 'both'

    -- Basic Info
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER,
    condition VARCHAR(50) DEFAULT 'excellent', -- 'excellent', 'good', 'fair'

    -- Specs (JSONB for flexibility per category)
    specs JSONB NOT NULL DEFAULT '{}',
    -- Examples:
    -- Motorcycle: {"engine": "110cc", "transmission": "automatic", "fuel": "petrol", "seats": 2}
    -- Bicycle: {"type": "mountain", "gears": 21, "frame": "aluminum"}
    -- Electric: {"battery": "60V", "range": "80km", "charging_time": "6h"}

    -- Media
    photos JSONB DEFAULT '[]', -- ["url1", "url2", "url3"]
    thumbnail_url TEXT,

    -- Features / Amenities
    features JSONB DEFAULT '[]', -- ["helmet", "lock", "phone_holder", "insurance"]

    -- Settings
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rental_items_business ON rental_items(business_id);
CREATE INDEX idx_rental_items_category ON rental_items(category);
CREATE INDEX idx_rental_items_active ON rental_items(is_active);

-- Rental Pricing (Duration-based)
CREATE TABLE rental_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES rental_items(id) ON DELETE CASCADE,
    location_id UUID REFERENCES rental_locations(id) ON DELETE CASCADE, -- Location-specific pricing

    -- Duration Pricing (VND)
    daily_rate INTEGER NOT NULL, -- 1 day
    weekly_rate INTEGER, -- 7 days
    monthly_rate INTEGER, -- 30 days
    long_term_rate INTEGER, -- 90+ days

    -- Custom Duration Pricing (Optional)
    custom_pricing JSONB, -- [{"days": 3, "rate": 350000}, {"days": 14, "rate": 1400000}]

    -- Deposit
    deposit_amount INTEGER DEFAULT 0,
    deposit_required BOOLEAN DEFAULT FALSE,

    -- Currency (Multi-currency ready)
    currency VARCHAR(3) DEFAULT 'VND',

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(item_id, location_id)
);

CREATE INDEX idx_rental_pricing_item ON rental_pricing(item_id);
CREATE INDEX idx_rental_pricing_location ON rental_pricing(location_id);

-- Sale Pricing (Phase 2 - Ready)
CREATE TABLE sale_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES rental_items(id) ON DELETE CASCADE,

    -- Sale Info
    sale_price INTEGER NOT NULL, -- VND
    is_negotiable BOOLEAN DEFAULT FALSE,
    min_price INTEGER, -- Minimum acceptable price if negotiable

    -- Condition & Warranty
    condition_notes TEXT,
    warranty_months INTEGER DEFAULT 0,

    -- Currency
    currency VARCHAR(3) DEFAULT 'VND',

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(item_id)
);

CREATE INDEX idx_sale_pricing_item ON sale_pricing(item_id);

-- Inventory (Stock per Location)
CREATE TABLE rental_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES rental_items(id) ON DELETE CASCADE,
    location_id UUID REFERENCES rental_locations(id) ON DELETE CASCADE,

    -- Stock
    quantity_total INTEGER NOT NULL DEFAULT 1, -- Total units at this location
    quantity_available INTEGER NOT NULL DEFAULT 1, -- Currently available
    quantity_reserved INTEGER DEFAULT 0, -- Reserved by bookings
    quantity_maintenance INTEGER DEFAULT 0, -- In maintenance

    -- Metadata
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(item_id, location_id)
);

CREATE INDEX idx_rental_inventory_item ON rental_inventory(item_id);
CREATE INDEX idx_rental_inventory_location ON rental_inventory(location_id);

-- ============================================================================
-- CONTACT & COMMUNICATION SETTINGS
-- ============================================================================

-- Multi-Channel Contact Settings
CREATE TABLE contact_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE UNIQUE,

    -- Primary Channel
    primary_channel VARCHAR(50) NOT NULL DEFAULT 'zalo', -- 'zalo', 'whatsapp', 'email', etc.

    -- Enabled Channels
    enabled_channels JSONB NOT NULL DEFAULT '["zalo", "email"]', -- ["zalo", "whatsapp", "email", "telegram"]

    -- Channel Contact Details
    phone VARCHAR(20), -- For WhatsApp, Zalo, Telegram
    email VARCHAR(255),
    zalo_id VARCHAR(100),
    whatsapp_number VARCHAR(20),
    kakao_id VARCHAR(100),
    line_id VARCHAR(100),
    wechat_qr_url TEXT,
    telegram_username VARCHAR(100),

    -- Message Templates (Multi-language ready)
    message_templates JSONB DEFAULT '{}',
    -- Example: {
    --   "rental_inquiry": {
    --     "en": "Hi! I want to rent...",
    --     "vi": "Xin chào! Tôi muốn thuê..."
    --   }
    -- }

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_settings_business ON contact_settings(business_id);

-- ============================================================================
-- BOOKINGS (Phase 2 - Structure Ready)
-- ============================================================================

-- Rental Bookings
CREATE TABLE rental_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID REFERENCES rental_businesses(id) ON DELETE CASCADE,

    -- Location Info
    pickup_location_id UUID REFERENCES rental_locations(id),
    return_location_id UUID REFERENCES rental_locations(id),

    -- Customer Info
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    customer_nationality VARCHAR(100),

    -- Booking Details
    booking_date TIMESTAMP DEFAULT NOW(),
    pickup_date DATE NOT NULL,
    return_date DATE NOT NULL,
    duration_days INTEGER NOT NULL,

    -- Items (JSONB for flexibility)
    items JSONB NOT NULL,
    -- [{"item_id": "uuid", "quantity": 2, "daily_rate": 120000}]

    -- Pricing
    subtotal INTEGER NOT NULL, -- Total before deposit
    deposit_paid INTEGER DEFAULT 0,
    total_amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'VND',

    -- Payment
    payment_method VARCHAR(50), -- 'cash', 'vietqr', 'momo', 'stripe', etc.
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'deposit_paid', 'paid', 'refunded'

    -- Status
    booking_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'active', 'completed', 'cancelled'

    -- Notes
    customer_notes TEXT,
    internal_notes TEXT,

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rental_bookings_business ON rental_bookings(business_id);
CREATE INDEX idx_rental_bookings_pickup_location ON rental_bookings(pickup_location_id);
CREATE INDEX idx_rental_bookings_status ON rental_bookings(booking_status);
CREATE INDEX idx_rental_bookings_pickup_date ON rental_bookings(pickup_date);

-- ============================================================================
-- REVIEWS & RATINGS (Phase 3 - Structure Ready)
-- ============================================================================

-- Item Reviews
CREATE TABLE item_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID REFERENCES rental_items(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES rental_bookings(id),

    -- Review Info
    customer_name VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,

    -- Media
    photos JSONB DEFAULT '[]',

    -- Status
    is_verified BOOLEAN DEFAULT FALSE, -- Verified booking
    is_approved BOOLEAN DEFAULT FALSE, -- Approved by merchant

    -- Metadata
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_item_reviews_item ON item_reviews(item_id);
CREATE INDEX idx_item_reviews_approved ON item_reviews(is_approved);

-- ============================================================================
-- VIEWS (Convenience)
-- ============================================================================

-- View: Fleet with Availability (All Locations Aggregated)
CREATE OR REPLACE VIEW v_fleet_availability AS
SELECT
    i.id AS item_id,
    i.business_id,
    i.category,
    i.brand,
    i.model,
    i.specs,
    i.photos,
    i.thumbnail_url,
    i.features,
    i.is_featured,

    -- Aggregated availability
    COALESCE(SUM(inv.quantity_available), 0) AS total_available,
    COUNT(DISTINCT inv.location_id) AS locations_count,

    -- Pricing (from primary location or minimum)
    MIN(p.daily_rate) AS min_daily_rate,
    MIN(p.weekly_rate) AS min_weekly_rate,
    MIN(p.monthly_rate) AS min_monthly_rate,

    -- Reviews (Phase 3)
    COALESCE(AVG(r.rating), 0) AS avg_rating,
    COUNT(r.id) AS review_count

FROM rental_items i
LEFT JOIN rental_inventory inv ON i.id = inv.item_id
LEFT JOIN rental_pricing p ON i.id = p.item_id
LEFT JOIN item_reviews r ON i.id = r.item_id AND r.is_approved = TRUE
WHERE i.is_active = TRUE
GROUP BY i.id;

-- ============================================================================
-- SAMPLE DATA (Development)
-- ============================================================================

-- Sample Business
INSERT INTO rental_businesses (id, business_name, business_type, description, multi_venue, primary_phone, primary_email) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Da Nang Bike Rentals', 'rental', 'Best bike & bicycle rentals in Da Nang', TRUE, '+84905123456', 'hello@danangbikes.com');

-- Sample Locations
INSERT INTO rental_locations (id, business_id, name, address, is_primary, phone) VALUES
('loc-001', '550e8400-e29b-41d4-a716-446655440000', 'City Center', 'Ngo Thi Si Street, Da Nang', TRUE, '+84905123456'),
('loc-002', '550e8400-e29b-41d4-a716-446655440000', 'An Thuong Beach', 'An Thuong 2, Ngu Hanh Son, Da Nang', FALSE, '+84905123457');

-- Sample Contact Settings
INSERT INTO contact_settings (business_id, primary_channel, enabled_channels, phone, email, zalo_id, whatsapp_number) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'zalo', '["zalo", "whatsapp", "email", "telegram"]', '+84905123456', 'hello@danangbikes.com', 'danangbikes', '+84905123456');

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
