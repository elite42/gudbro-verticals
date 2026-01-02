# Wellness - Claude Code Context

**Vertical:** Spa / Massage / Beauty Services Platform
**Tech Stack:** Next.js 14 (Frontend planned) + Express (Backend ready)
**Port:** 3023 (backend), 3024 (frontend planned)
**Languages:** TBD (not yet implemented)
**Status:** 🔄 Backend Ready, Frontend Pending (2-3 hours estimated)
**Last Updated:** 2025-11-17

---

## Quick Context

This is a **standalone wellness/spa booking platform**, part of GUDBRO's vertical business templates strategy.

**Current State:**
- ✅ Backend API complete and functional
- ⏳ Frontend UI not yet created (2-3 hours estimated)

**NOT integrated** with core platform modules (by design - see ADR-001).

---

## Project Structure

```
packages/wellness/
├── backend/                # Express API (Port 3023) ✅ COMPLETE
│   ├── server.js          # Main entry point
│   ├── routes/            # API routes
│   │   ├── services.js    # Spa services endpoints
│   │   ├── bookings.js    # Booking management
│   │   └── staff.js       # Staff/therapist management
│   ├── models/            # Data models
│   ├── services/          # Business logic
│   └── db/                # Database setup
│
├── frontend/              # Next.js 14 App (Port 3024) ⏳ PENDING
│   ├── app/               # App Router (to be created)
│   │   ├── page.tsx       # Homepage
│   │   ├── services/      # Browse services
│   │   ├── booking/       # Booking flow
│   │   ├── staff/         # Staff profiles
│   │   └── packages/      # Service packages
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── public/            # Static assets
│
└── shared/                # Shared types
    └── types.ts           # TypeScript interfaces
```

---

## Tech Stack Details

### Backend (Express API) ✅

```json
{
  "framework": "Express 4.x",
  "language": "Node.js + TypeScript",
  "database": "PostgreSQL (setup in db/)",
  "port": "3023",
  "status": "Production Ready"
}
```

**Key Features:**
- Spa service catalog
- Booking/appointment system
- Staff/therapist management
- Package deals
- Time slot management

### Frontend (Next.js 14) ⏳

```json
{
  "framework": "Next.js 14 (planned)",
  "react": "19.0.0",
  "typescript": "5.x",
  "styling": "Tailwind CSS",
  "port": "3024",
  "status": "Not Yet Created"
}
```

**Planned Features:**
- Service browsing
- Staff profiles with photos
- Real-time availability
- Booking calendar
- Package selection
- Payment integration

---

## Current State

### ✅ Completed (Nov 6, 2025)

- [x] Backend API complete
- [x] Database schema designed
- [x] Service catalog endpoints
- [x] Booking management system
- [x] Staff management
- [x] Package deals logic
- [x] SEO infrastructure integrated

### ⏳ Pending (Priority: High)

- [ ] **Frontend UI creation** (2-3 hours estimated)
  - Homepage
  - Services browsing page
  - Service detail page
  - Booking flow
  - Staff profiles
  - Package deals page

- [ ] i18n implementation (language TBD)
- [ ] Payment integration
- [ ] Email notifications
- [ ] Admin dashboard

---

## API Endpoints (Backend)

### Services

```
GET    /api/services              # List all spa services
GET    /api/services/:id          # Service details
GET    /api/services/category/:cat # Filter by category
POST   /api/services              # Create service (admin)
PUT    /api/services/:id          # Update service
DELETE /api/services/:id          # Delete service
```

**Categories:** Massage, Facial, Body Treatment, Nail Care, Hair Care, etc.

### Bookings

```
GET    /api/bookings              # List bookings
GET    /api/bookings/:id          # Booking details
POST   /api/bookings              # Create booking
PUT    /api/bookings/:id          # Update booking
DELETE /api/bookings/:id/cancel   # Cancel booking
GET    /api/bookings/availability # Check availability
```

### Staff

```
GET    /api/staff                 # List all staff
GET    /api/staff/:id             # Staff profile
GET    /api/staff/:id/availability # Staff availability
POST   /api/staff                 # Add staff member (admin)
```

### Packages

```
GET    /api/packages              # List packages
GET    /api/packages/:id          # Package details
POST   /api/packages/:id/book     # Book package
```

---

## Data Models

### Service

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  category: 'massage' | 'facial' | 'body' | 'nails' | 'hair';
  duration: number;  // minutes
  price: number;
  image?: string;
  staff: Staff[];
}
```

### Booking

```typescript
interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  staffId: string;
  date: Date;
  time: string;  // '10:00', '14:30', etc.
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}
```

### Staff

```typescript
interface Staff {
  id: string;
  name: string;
  role: string;  // 'Therapist', 'Massage Specialist', etc.
  bio: string;
  photo?: string;
  specialties: string[];
  availability: TimeSlot[];
}
```

---

## Shared Dependencies

### From `packages/shared/`

```typescript
// SEO components (already integrated)
import { SEOHead } from '@gudbro/shared/seo';

// Database types
import { Service, Booking } from '@gudbro/shared/database/types';
```

**Key:** Wellness uses shared SEO infrastructure (same as Coffeeshop, Rentals).

---

## i18n Strategy (Not Yet Implemented)

### Recommended Languages

For Da Nang/Vietnam wellness market:
- English (EN) - International tourists
- Vietnamese (VN) - Local customers
- Thai (TH) - Thailand has strong spa culture, many Thai tourists in Vietnam
- Korean (KO) - Korean tourists (wellness tourism popular)

### Implementation Decision

**Recommendation:** Start with standalone i18n (like Coffeeshop), migrate to Module 10 when adding 5th vertical.

**Rationale:**
- Faster implementation
- Can include Thai (TH) which Module 10 doesn't have
- When adding 5th vertical, trigger migration to Module 10

See: `/docs/I18N-MIGRATION-ROADMAP.md`

---

## Frontend Creation Plan (2-3 Hours)

### Phase 1: Setup (30 min)

```bash
cd packages/wellness
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
npm install
```

### Phase 2: Pages (1.5 hours)

**Create these pages:**

1. **Homepage** (`app/page.tsx`)
   - Hero section with spa imagery
   - Featured services
   - Staff highlights
   - Call-to-action

2. **Services** (`app/services/page.tsx`)
   - Grid of all services
   - Filter by category
   - Quick booking buttons

3. **Service Detail** (`app/services/[id]/page.tsx`)
   - Service description
   - Duration, price
   - Available staff
   - Booking form

4. **Staff** (`app/staff/page.tsx`)
   - Staff profiles with photos
   - Specialties
   - Link to book

5. **Packages** (`app/packages/page.tsx`)
   - Package deals
   - Pricing
   - Booking flow

6. **Booking** (`app/booking/page.tsx`)
   - Calendar interface
   - Time slot selection
   - Staff selection
   - Confirmation

### Phase 3: Components (30 min)

**Reuse from menu-template where possible:**

```typescript
// components/ServiceCard.tsx
// components/StaffCard.tsx
// components/BookingCalendar.tsx
// components/TimeSlotPicker.tsx
```

### Phase 4: Integration (30 min)

- Connect to backend API (port 3023)
- Test booking flow
- Add loading states
- Error handling

---

## Styling Guidelines

### Design Philosophy

**Wellness/Spa aesthetic:**
- Calm, serene colors (light greens, blues, whites)
- Spacious layouts
- High-quality imagery
- Smooth transitions
- Minimal, clean design

### Color Palette (Suggested)

```css
:root {
  --sage: #8BA888;        /* Primary - sage green */
  --cream: #FAF8F3;       /* Background - warm white */
  --charcoal: #333333;    /* Text - dark grey */
  --gold: #D4AF37;        /* Accent - gold */
  --aqua: #A8DADC;        /* Secondary - light blue */
}
```

---

## Known Issues & Technical Debt

### High Priority

**Frontend Not Created**
- Status: Backend complete, frontend pending
- Estimate: 2-3 hours
- Priority: HIGH

### Medium Priority

1. **No i18n** - Language support not implemented
2. **No Payment** - Payment processing not integrated
3. **No Admin Dashboard** - Staff/service management UI needed
4. **No Email Notifications** - Booking confirmations not sent

### Low Priority

1. **No README.md** - This CLAUDE.md serves as documentation
2. **No Automated Tests** - Testing infrastructure not set up

---

## Development Workflow

### Start Backend

```bash
cd packages/wellness/backend
npm start  # Runs on port 3023
```

**Test API:**
```bash
curl http://localhost:3023/api/services
curl http://localhost:3023/api/staff
```

### Start Frontend (When Created)

```bash
cd packages/wellness/frontend
npm run dev  # Will run on port 3024
```

---

## Database Setup

### PostgreSQL Schema

```sql
-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  category VARCHAR(50),
  duration INT,  -- minutes
  price DECIMAL(10,2),
  image_url VARCHAR(255)
);

-- Bookings table
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT,
  service_id INT,
  staff_id INT,
  booking_date DATE,
  booking_time TIME,
  duration INT,
  status VARCHAR(20),
  notes TEXT,
  FOREIGN KEY (service_id) REFERENCES services(id)
);

-- Staff table
CREATE TABLE staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(100),
  bio TEXT,
  photo_url VARCHAR(255),
  specialties TEXT[]
);
```

**Location:** `packages/wellness/db/schema.sql`

---

## Future Roadmap

### Phase 1: Frontend Creation (NEXT - 2-3 hours)

- [ ] Setup Next.js 14 app
- [ ] Create all pages (homepage, services, booking, etc.)
- [ ] Connect to backend API
- [ ] Basic styling with Tailwind
- [ ] Test booking flow

### Phase 2: Enhancements

- [ ] Add i18n (EN/VN/TH/KO recommended)
- [ ] Integrate payment (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS reminders (for Vietnamese market)
- [ ] Admin dashboard

### Phase 3: Advanced Features

- [ ] Loyalty program
- [ ] Membership packages
- [ ] Gift certificates
- [ ] Mobile app
- [ ] Multi-location support

---

## Quick Start for Frontend Development

**When you're ready to create frontend:**

1. Run pre-session checklist (`/docs/DEVELOPMENT-PROCESS-CHECKLISTS.md`)
2. Check this CLAUDE.md for context
3. Follow "Frontend Creation Plan" above
4. Reuse components from coffeeshop/rentals where possible
5. Connect to backend on port 3023
6. Test thoroughly before deployment

**Estimated Time:** 2-3 hours for MVP frontend

---

## Code Examples

### Fetch Services in Frontend

```typescript
// app/services/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3023/api/services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
```

### Backend API Response Example

```json
// GET /api/services
[
  {
    "id": "1",
    "name": "Traditional Thai Massage",
    "description": "60-minute therapeutic massage...",
    "category": "massage",
    "duration": 60,
    "price": 35.00,
    "image": "/images/thai-massage.jpg"
  }
]
```

---

## Environment Variables

### Backend `.env`

```bash
PORT=3023
DATABASE_URL=postgresql://localhost/wellness
JWT_SECRET=your-secret
```

### Frontend `.env.local` (When Created)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3023
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## Getting Help

**Within Wellness:**
- Check this file (CLAUDE.md)
- Review backend `routes/` for API structure
- Check `db/schema.sql` for data models

**Project-Wide:**
- Root `/CLAUDE.md` - Overall architecture
- `/docs/MODULE-REGISTRY.md` - All modules
- `/packages/coffeeshop/frontend/CLAUDE.md` - Similar frontend example
- `/docs/adr/001-standalone-vertical-templates.md` - Why standalone

---

## Quick Commands

```bash
# Start backend
cd backend && npm start

# Check backend port
lsof -i :3023

# Test API
curl http://localhost:3023/api/services

# When frontend created:
cd frontend && npm run dev
```

---

**This file provides Wellness-specific context for Claude Code sessions.**

**Last Updated:** 2025-11-17
**Status:** Backend Complete, Frontend Pending (2-3 hours)
**Priority:** HIGH - Frontend creation next major task
