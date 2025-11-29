# GUDBRO SaaS Architecture

## Overview

GUDBRO is a SaaS platform for hospitality businesses (F&B, Hotels, Airbnb) to create QR-based digital experiences for their guests.

## System Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              GUDBRO PLATFORM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FRONTEND APPS                                                              │
│  ─────────────                                                              │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐             │
│  │    WEBSITE      │  │   BACKOFFICE    │  │   GUEST APP     │             │
│  │  apps/website   │  │ apps/backoffice │  │   apps/guest    │             │
│  │                 │  │                 │  │                 │             │
│  │ Next.js 16      │  │ Next.js 16      │  │ Next.js 14      │             │
│  │ Public facing   │  │ Authenticated   │  │ Public (QR)     │             │
│  │ Port: 3000      │  │ Port: 3001      │  │ Port: 3002      │             │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘             │
│                                                                             │
│  SHARED INFRASTRUCTURE                                                      │
│  ─────────────────────                                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         shared/core                                  │   │
│  │                                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │   │
│  │  │ Translation  │  │   Modules    │  │  Templates   │               │   │
│  │  │   Engine     │  │ (Components) │  │  (Configs)   │               │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │   │
│  │                                                                      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │   │
│  │  │    Auth      │  │   Database   │  │   Billing    │               │   │
│  │  │  (Clerk)     │  │  (Supabase)  │  │  (Stripe)    │               │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  EXTERNAL SERVICES                                                          │
│  ─────────────────                                                          │
│                                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │  Clerk   │  │ Supabase │  │  Stripe  │  │  OpenAI  │  │  Vercel  │     │
│  │  (Auth)  │  │   (DB)   │  │ (Billing)│  │(Translate│  │ (Deploy) │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Apps Structure

### 1. Website (Marketing + Auth)

Public-facing marketing site where merchants discover, sign up, and manage their subscription.

```
apps/website/
├── app/
│   ├── (marketing)/           # Public pages
│   │   ├── page.tsx          # Landing page
│   │   ├── features/         # Features showcase
│   │   ├── pricing/          # Pricing plans
│   │   ├── about/            # About us
│   │   ├── contact/          # Contact form
│   │   └── blog/             # Blog/resources
│   │
│   ├── (auth)/               # Authentication
│   │   ├── sign-in/          # Login
│   │   ├── sign-up/          # Register
│   │   └── verify/           # Email verification
│   │
│   ├── (legal)/              # Legal pages
│   │   ├── privacy/          # Privacy policy
│   │   ├── terms/            # Terms of service
│   │   └── cookies/          # Cookie policy
│   │
│   └── api/                  # API routes
│       ├── contact/          # Contact form handler
│       ├── newsletter/       # Newsletter signup
│       └── webhooks/         # Stripe webhooks
│
├── components/
│   ├── marketing/            # Landing page components
│   ├── pricing/              # Pricing components
│   └── common/               # Shared components
│
└── lib/
    ├── analytics.ts          # Plausible/Mixpanel
    └── newsletter.ts         # Mailchimp/ConvertKit
```

**Key Features:**
- Landing page with value proposition
- Feature showcase (F&B, Hotels, Airbnb)
- Pricing tiers with comparison
- Sign up → redirect to Backoffice
- Blog/resources for SEO
- Multi-language (EN, VI, KO, etc.)

### 2. Backoffice (Merchant Dashboard)

Authenticated dashboard where merchants manage their business, content, and settings.

```
apps/backoffice/
├── app/
│   ├── (auth)/                    # Auth pages (Clerk)
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── (dashboard)/               # Protected routes
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   ├── page.tsx              # Dashboard home
│   │   │
│   │   ├── onboarding/           # First-time setup wizard
│   │   │   ├── page.tsx         # Step router
│   │   │   ├── business-type/   # Choose: F&B, Hotel, Airbnb
│   │   │   ├── business-info/   # Name, address, contact
│   │   │   ├── branding/        # Logo, colors
│   │   │   └── first-qr/        # Generate first QR
│   │   │
│   │   ├── content/              # Content management
│   │   │   ├── menu/            # F&B menu editor
│   │   │   ├── services/        # Hotel services
│   │   │   ├── rooms/           # Room configurations
│   │   │   ├── wifi/            # WiFi settings
│   │   │   ├── attractions/     # Local attractions
│   │   │   └── translations/    # AI translation UI
│   │   │
│   │   ├── qr-codes/             # QR management
│   │   │   ├── page.tsx         # List all QRs
│   │   │   ├── create/          # Create new QR
│   │   │   └── [id]/            # Edit specific QR
│   │   │
│   │   ├── analytics/            # Usage analytics
│   │   │   ├── page.tsx         # Overview
│   │   │   ├── scans/           # QR scan stats
│   │   │   └── engagement/      # User engagement
│   │   │
│   │   ├── team/                 # Team management
│   │   │   ├── page.tsx         # Team members
│   │   │   └── invite/          # Invite new member
│   │   │
│   │   ├── billing/              # Subscription & billing
│   │   │   ├── page.tsx         # Current plan
│   │   │   ├── upgrade/         # Upgrade plan
│   │   │   └── invoices/        # Invoice history
│   │   │
│   │   └── settings/             # Account settings
│   │       ├── profile/         # Business profile
│   │       ├── branding/        # Logo, colors
│   │       ├── languages/       # Supported languages
│   │       ├── integrations/    # Third-party integrations
│   │       └── api-keys/        # API access
│   │
│   └── api/                      # API routes
│       ├── content/             # CRUD for content
│       ├── qr/                  # QR generation
│       ├── translate/           # Translation API
│       ├── upload/              # Image upload
│       └── webhooks/            # Stripe webhooks
│
├── components/
│   ├── dashboard/               # Dashboard components
│   ├── content/                 # Content editors
│   ├── qr/                      # QR components
│   └── ui/                      # Design system
│
└── lib/
    ├── auth.ts                  # Clerk helpers
    ├── db.ts                    # Supabase client
    ├── stripe.ts                # Stripe helpers
    └── translate.ts             # Translation helpers
```

**Key Features:**
- Onboarding wizard (business type → info → branding → first QR)
- Content management (menu, services, WiFi, attractions)
- AI-powered translation (one-click translate all content)
- QR code generator (per table, room, property)
- Analytics dashboard (scans, engagement)
- Team management (roles: owner, manager, staff)
- Billing (Stripe subscription)

### 3. Guest App (QR Experience)

The public-facing app that guests see when scanning QR codes.

```
apps/guest/
├── app/
│   ├── [businessId]/             # Dynamic business route
│   │   ├── page.tsx             # Business landing
│   │   ├── [locationId]/        # Location-specific
│   │   │   ├── page.tsx        # Location home
│   │   │   ├── menu/           # F&B menu
│   │   │   ├── room/           # Hotel room info
│   │   │   ├── property/       # Airbnb info
│   │   │   ├── cart/           # Shopping cart
│   │   │   └── [moduleId]/     # Dynamic modules
│   │   └── layout.tsx          # Business-themed layout
│   │
│   └── api/
│       ├── menu/                # Menu data
│       ├── order/               # Order submission
│       └── feedback/            # Guest feedback
│
├── components/
│   └── (uses shared/core/modules)
│
└── lib/
    └── (minimal, uses shared/core)
```

**Key Features:**
- Dynamic routing: `/{businessId}/{locationId}`
- Themed per business (colors, logo)
- All modules from shared/core
- Multi-language selection
- Currency conversion
- Works offline (PWA)

## Database Schema (Supabase)

```sql
-- =====================
-- AUTHENTICATION (via Clerk, synced to Supabase)
-- =====================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ORGANIZATIONS (Multi-tenant)
-- =====================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,              -- For URLs: gudbro.app/{slug}
  owner_id UUID REFERENCES users(id),

  -- Business info
  business_type TEXT NOT NULL,            -- 'fnb', 'hotel', 'airbnb', 'hostel'
  business_name TEXT NOT NULL,
  description JSONB,                      -- MultiLangText
  logo_url TEXT,
  cover_image_url TEXT,

  -- Contact
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  website TEXT,

  -- Address
  address TEXT,
  city TEXT,
  country TEXT,
  coordinates POINT,
  timezone TEXT DEFAULT 'Asia/Ho_Chi_Minh',

  -- Branding
  primary_color TEXT DEFAULT '#000000',
  secondary_color TEXT,
  font_family TEXT DEFAULT 'Inter',

  -- Settings
  default_language TEXT DEFAULT 'en',
  supported_languages TEXT[] DEFAULT ARRAY['en'],
  default_currency TEXT DEFAULT 'VND',
  supported_currencies TEXT[] DEFAULT ARRAY['VND', 'USD'],

  -- Subscription
  subscription_tier TEXT DEFAULT 'free',  -- 'free', 'starter', 'pro', 'enterprise'
  subscription_status TEXT DEFAULT 'active',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,

  -- Metadata
  is_active BOOLEAN DEFAULT true,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- TEAM MEMBERS
-- =====================

CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member',             -- 'owner', 'admin', 'manager', 'member'
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMPTZ,
  joined_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(organization_id, user_id)
);

-- =====================
-- LOCATIONS (Tables, Rooms, Properties)
-- =====================

CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  -- Basic info
  name TEXT NOT NULL,                     -- "Table 5", "Room 301", "Beach House"
  type TEXT NOT NULL,                     -- 'table', 'room', 'property', 'area'
  description JSONB,                      -- MultiLangText

  -- QR Code
  qr_code_url TEXT,
  short_code TEXT UNIQUE,                 -- For short URLs

  -- Location-specific config (overrides org defaults)
  config JSONB,                           -- WiFi, specific content, etc.

  -- Status
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- CONTENT MODULES
-- =====================

-- Menu (F&B)
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  name JSONB NOT NULL,                    -- MultiLangText
  description JSONB,
  icon TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,

  name JSONB NOT NULL,                    -- MultiLangText
  description JSONB,

  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'VND',
  price_modifiers JSONB,                  -- Size variants, add-ons

  -- Media
  image_url TEXT,

  -- Customizations
  customizations JSONB,                   -- Available options

  -- Safety & dietary
  allergens TEXT[],
  dietary_flags TEXT[],
  spicy_level INTEGER,

  -- Status
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- WiFi Networks
CREATE TABLE wifi_networks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,  -- Optional, for location-specific

  ssid TEXT NOT NULL,
  password TEXT,
  security TEXT DEFAULT 'WPA2',
  note JSONB,                             -- MultiLangText

  is_primary BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services (Hotel)
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  category TEXT NOT NULL,                 -- 'room_service', 'spa', 'facilities', etc.
  name JSONB NOT NULL,
  description JSONB,

  price DECIMAL(10,2),
  currency TEXT,
  unit JSONB,                             -- "per hour", "per item"

  available_hours TEXT,
  booking_required BOOLEAN DEFAULT false,

  icon TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attractions
CREATE TABLE attractions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  name JSONB NOT NULL,
  description JSONB,
  category TEXT NOT NULL,
  address JSONB,

  distance TEXT,
  walking_time TEXT,
  coordinates POINT,

  price_range TEXT,
  rating DECIMAL(2,1),
  image_url TEXT,

  -- Partner discount
  has_partner_discount BOOLEAN DEFAULT false,
  discount_type TEXT,
  discount_value DECIMAL(5,2),
  discount_code TEXT,
  discount_description JSONB,

  -- Links
  google_maps_url TEXT,
  tripadvisor_url TEXT,
  website_url TEXT,

  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- House Rules (Airbnb)
CREATE TABLE house_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  icon TEXT,
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  rule_type TEXT NOT NULL,                -- 'allowed', 'not_allowed', 'info'
  category TEXT NOT NULL,                 -- 'general', 'noise', 'smoking', etc.

  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- ANALYTICS
-- =====================

CREATE TABLE qr_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  location_id UUID REFERENCES locations(id) ON DELETE CASCADE,

  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  referrer TEXT,

  -- Session tracking
  session_id TEXT,
  page_views INTEGER DEFAULT 1,
  duration_seconds INTEGER
);

CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,

  path TEXT NOT NULL,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT,
  user_agent TEXT,

  -- Engagement
  time_on_page INTEGER,
  scroll_depth INTEGER
);

-- =====================
-- INDEXES
-- =====================

CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_owner ON organizations(owner_id);
CREATE INDEX idx_locations_organization ON locations(organization_id);
CREATE INDEX idx_locations_short_code ON locations(short_code);
CREATE INDEX idx_menu_items_organization ON menu_items(organization_id);
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_qr_scans_organization ON qr_scans(organization_id);
CREATE INDEX idx_qr_scans_date ON qr_scans(scanned_at);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wifi_networks ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE house_rules ENABLE ROW LEVEL SECURITY;

-- Example RLS policy for organizations
CREATE POLICY "Users can view their organizations" ON organizations
  FOR SELECT USING (
    id IN (
      SELECT organization_id FROM organization_members
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Owners can update their organizations" ON organizations
  FOR UPDATE USING (
    owner_id = auth.uid()
  );
```

## Subscription Tiers

| Feature | Free | Starter ($29) | Pro ($79) | Enterprise |
|---------|------|---------------|-----------|------------|
| QR Codes | 1 | 10 | 50 | Unlimited |
| Team Members | 1 | 3 | 10 | Unlimited |
| Languages | 2 | 5 | All | All |
| AI Translations | 100/mo | 1,000/mo | 10,000/mo | Unlimited |
| Analytics | Basic | Standard | Advanced | Custom |
| Custom Domain | ❌ | ❌ | ✅ | ✅ |
| API Access | ❌ | ❌ | ✅ | ✅ |
| White Label | ❌ | ❌ | ❌ | ✅ |
| Support | Community | Email | Priority | Dedicated |

## Tech Stack Summary

| Layer | Technology | Reason |
|-------|------------|--------|
| **Frontend** | Next.js 14/16 | SSR, App Router, best DX |
| **Styling** | Tailwind CSS | Rapid development |
| **UI Components** | Radix UI + CVA | Accessible, customizable |
| **Auth** | Clerk | Simple, powerful, multi-tenant |
| **Database** | Supabase (PostgreSQL) | Realtime, RLS, storage |
| **Payments** | Stripe | Industry standard |
| **AI Translation** | OpenAI GPT-4o-mini | Best value |
| **Deployment** | Vercel | Optimized for Next.js |
| **Analytics** | Plausible | Privacy-focused |
| **Email** | Resend | Developer-friendly |

## URL Structure

```
# Marketing Website
gudbro.com/                      # Landing page
gudbro.com/features              # Features
gudbro.com/pricing               # Pricing
gudbro.com/sign-up               # Register
gudbro.com/sign-in               # Login

# Backoffice (Dashboard)
app.gudbro.com/                  # Dashboard home
app.gudbro.com/onboarding        # First-time setup
app.gudbro.com/content           # Content management
app.gudbro.com/qr-codes          # QR management
app.gudbro.com/analytics         # Analytics
app.gudbro.com/billing           # Subscription
app.gudbro.com/settings          # Settings

# Guest App (QR)
go.gudbro.com/{shortCode}        # Short QR URLs
menu.gudbro.com/{slug}           # Business landing
menu.gudbro.com/{slug}/menu      # F&B menu
menu.gudbro.com/{slug}/room/301  # Hotel room 301

# Custom Domains (Pro+)
menu.rootscafe.com/              # Custom domain
```

## Next Steps

1. **Phase 1: Foundation**
   - [ ] Setup Supabase project & schema
   - [ ] Integrate Clerk authentication
   - [ ] Build Website landing page
   - [ ] Build Backoffice onboarding wizard

2. **Phase 2: Core Features**
   - [ ] Content management (menu, services)
   - [ ] QR code generation
   - [ ] Guest app with all modules
   - [ ] AI translation integration

3. **Phase 3: Monetization**
   - [ ] Stripe subscription integration
   - [ ] Usage metering (QR scans, translations)
   - [ ] Upgrade/downgrade flows

4. **Phase 4: Growth**
   - [ ] Analytics dashboard
   - [ ] Team management
   - [ ] API access
   - [ ] Custom domains
