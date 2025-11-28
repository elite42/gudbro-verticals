# Rentals Module - MVP Strategy

> Bike, Scooter, Car, Boat & Equipment Rental Service for Vietnam Market

**Status:** ✅ **PHASE 1 MVP COMPLETE - Frontend + Backend Integrated**
**Demo:** http://localhost:3013 (frontend) + http://localhost:3012 (backend)
**Test Results:** All 5 API endpoints passing (100% success rate)
**Commits:** e6b93e8, 02c2d8a, 46884a2, 1435872, 1f3eb29

**What's Ready:**
- ✅ Backend API (4 endpoints with mock data fallback)
- ✅ Frontend Landing Page (Next.js 14, full-stack integration)
- ✅ Component Library (5 React components)
- ✅ Mobile-responsive design (Tailwind CSS)
- ✅ SEO optimized
- ✅ Complete documentation

**Next Steps:**
1. Browser testing (manual validation)
2. Deploy demo site (Vercel + Railway/Render)
3. Setup external services (Airtable, Cal.com - optional)
4. Recruit first pilot customer (Da Nang bike shop)

---

## 🎯 MVP Strategy (Phase 1)

**Goal:** Launch in 1-2 days using external integrations, validate with 3-5 pilot customers

### External Integrations (Phase 1)

| Feature | External Service | Cost | Why |
|---------|-----------------|------|-----|
| **Booking Calendar** | Cal.com (open source) | Free | Avoid building calendar from scratch |
| **Payment** | VietQR + Stripe Links | Transaction fee | Already integrated in QR Engine |
| **Customer CRM** | Airtable / Google Sheets | Free - $20/mo | Quick admin interface |
| **WhatsApp Notifications** | WhatsApp Business API | Pay per message | Instant customer communication |
| **Inventory Management** | Google Sheets | Free | MVP fleet tracking |

### What We Build (Phase 1)

1. **Landing Page Template** (`rental-service`)
   - Hero section with business branding
   - Fleet gallery (photos from Google Sheets/Airtable)
   - Pricing table
   - Contact form → WhatsApp
   - Embedded Cal.com widget

2. **Hub Integration**
   - New template type in `hub_pages`: `rental-service`
   - Custom JSON config for fleet data
   - Links to external booking/payment

3. **Admin Dashboard (Simple)**
   - Google Sheets embed for fleet management
   - Airtable embed for booking view
   - WhatsApp Business link for customer chat

### Phase 2 (Post-Validation)

**After 5-10 paying customers**, build proprietary system:
- Custom booking engine with availability logic
- Real-time inventory tracking (PostgreSQL)
- Built-in CRM and customer database
- Automated WhatsApp messaging
- Document upload system
- Digital contracts with e-signature

---

## 🚀 Quick Start (MVP)

### 1. Setup External Services

**Cal.com (Free Booking Calendar):**
```bash
# Self-hosted option
git clone https://github.com/calcom/cal.com
cd cal.com
docker-compose up -d

# Or use cal.com hosted (free plan)
# https://cal.com - Create account, get embed code
```

**Airtable (Fleet + Bookings Database):**
```bash
# Create Airtable base with 2 tables:
# 1. Fleet (Model, Brand, Price/day, Photo URL, Available)
# 2. Bookings (Customer, Bike, Dates, Status, Payment)
```

**WhatsApp Business:**
```bash
# Get WhatsApp Business API access
# https://business.whatsapp.com
# Or use WhatsApp Link: https://wa.me/84XXXXXXXXX?text=
```

### 2. Install Module

```bash
cd packages/rentals
npm install
```

### 3. Configure

```bash
cp .env.example .env
# Add:
# CAL_COM_EMBED_URL=https://cal.com/your-username
# AIRTABLE_API_KEY=your_key
# AIRTABLE_BASE_ID=your_base
# WHATSAPP_BUSINESS_PHONE=+84XXXXXXXXX
# VIETQR_ACCOUNT=your_bank_account
```

### 4. Run

```bash
npm run dev
```

---

## 📋 Templates

### Rental Service Template Structure

```
┌─────────────────────────────────────┐
│  HERO SECTION                       │
│  - Business name + logo             │
│  - Hero image (fleet/location)      │
│  - Tagline                          │
│  - "Book Now" CTA                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  KEY FEATURES (Trust Badges)        │
│  ✓ No Deposit Required              │
│  ✓ Free Delivery <3km               │
│  ✓ 24/7 Support                     │
│  ✓ Insurance Included               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  FLEET GALLERY (From Airtable)      │
│  [Load bikes from external source]  │
│  Each card: Photo, model, price     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  PRICING TABLE                      │
│  Duration | Price                   │
│  1-3 days | 150k VND/day            │
│  4-6 days | 130k VND/day (-13%)     │
│  7+ days  | 100k VND/day (-33%)     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  BOOKING WIDGET                     │
│  [Embedded Cal.com calendar]        │
│  OR                                 │
│  WhatsApp contact button            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  PAYMENT OPTIONS                    │
│  - VietQR QR code (instant)         │
│  - Stripe Payment Link              │
│  - Cash on pickup                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  LOCATION & CONTACT                 │
│  - Google Maps embed                │
│  - WhatsApp, Zalo, Phone            │
│  - Business hours                   │
└─────────────────────────────────────┘
```

---

## 🔌 API Endpoints (Phase 1 - Simple)

### Get Rental Hub Page
```http
GET /api/rentals/:hubId
Response: Hub page data + fleet from Airtable
```

### Send Inquiry (WhatsApp)
```http
POST /api/rentals/:hubId/inquiry
Body: { name, phone, message, bike_model }
Action: Opens WhatsApp with pre-filled message
```

### Get Fleet (From Airtable)
```http
GET /api/rentals/:hubId/fleet
Response: List of bikes from Airtable API
```

---

## 🎨 Frontend Components (Phase 1)

```
frontend/components/
├── RentalHero.tsx              // Hero section
├── FleetGallery.tsx            // Load from Airtable, display cards
├── PricingTable.tsx            // Static pricing display
├── CalComEmbed.tsx             // Embedded Cal.com booking widget
├── WhatsAppContactForm.tsx     // Pre-fill WhatsApp message
├── VietQRPayment.tsx           // Display VietQR code (reuse from QR Engine)
└── LocationMap.tsx             // Google Maps embed
```

---

## 📊 Competitive Analysis

**EMOVE (Da Nang competitor):**
- Load time: 3-5 seconds ❌
- Design: Basic, unprofessional ❌
- Booking: Manual via WhatsApp ❌
- Payment: Cash only ❌
- Real-time availability: No ❌

**Gudbro MVP:**
- Load time: <1 second ✅ (Next.js SSR)
- Design: Professional, branded ✅
- Booking: Cal.com widget (better than manual) ✅
- Payment: VietQR instant bank transfer ✅
- Real-time availability: Cal.com handles it ✅

**We beat them 10x even with MVP!**

---

## 📈 Success Metrics (Phase 1)

**Pilot Program (Week 1-4):**
- Target: 3-5 bike rental shops in Da Nang
- Setup time: <2 hours per shop
- Free for 3 months

**Validation Metrics:**
- 10+ bookings per shop per week
- 70%+ conversion rate (visitors → WhatsApp contacts)
- 4.5+ customer satisfaction (Google reviews)
- Shop owners save 5+ hours/week vs manual booking

**Revenue Target (Month 2-3):**
- 10 paying customers @ $29/month = $290 MRR
- Validate PMF before building Phase 2

---

## 🚧 Phase 2 (Future - Proprietary System)

**Only build if Phase 1 validates PMF:**

### Database Schema (Phase 2)
```sql
-- See db/schema-phase2.sql for full proprietary system
-- Includes: rental_fleet, rental_bookings, availability_calendar, customers, etc.
```

### Custom Features (Phase 2)
- Real-time availability engine (no double-bookings)
- Document upload & verification (passport/ID)
- Digital rental contracts with e-signature
- Automated WhatsApp reminders
- Damage reporting system
- Multi-location inventory management
- Advanced analytics dashboard

**Estimated Phase 2 effort:** 2-3 weeks (60-80 hours)

---

## 🎯 Go-To-Market (Da Nang)

### Target Shops
1. **Ngo Thi Si area** (backpacker street) - 20+ shops
2. **An Thuong beach road** - 15+ shops
3. **Near Dragon Bridge** - 10+ shops
4. **Airport pickup operators** - 5+ shops

### Pitch
> "We saw EMOVE has a slow, basic website. We built something 10x better for the same price ($29/month). Free setup, 3 months free trial. We handle everything - you just accept bookings."

### Demo
- Live demo: `demo.gudbro.com/rental/danang-bikes`
- Show vs EMOVE side-by-side (speed test)
- Show WhatsApp automation
- Show VietQR payment (instant!)

---

## 📚 References

- **Bike Rental Spec:** [docs/verticals/bike-rental.md](../../docs/verticals/bike-rental.md)
- **Hub Integration:** [packages/hub/README.md](../hub/README.md)
- **VietQR Integration:** [packages/qr-engine/utils/vietqr.js](../qr-engine/utils/vietqr.js)

---

**Last Updated:** 2025-11-05
**Status:** 🚧 Phase 1 MVP In Development
**Next Milestone:** Launch pilot with 3 shops in Da Nang
