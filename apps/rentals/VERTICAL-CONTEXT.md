# Rentals - Claude Code Context

**Vertical:** Bike/Scooter/Vehicle Rental Platform
**Tech Stack:** Next.js 14 (Frontend) + Express (Backend)
**Ports:** 3012 (backend), 3013 (frontend) ⚠️ **Should be 3021-3022**
**Languages:** TBD (not yet implemented)
**Status:** ✅ MVP Complete (Backend + Frontend functional)
**Last Updated:** 2025-11-17

---

## Quick Context

This is a **standalone rental platform** for bikes, scooters, and vehicles, part of GUDBRO's vertical business templates strategy.

**Two-part architecture:**
1. **Backend** (Express API) - Rental logic, availability, bookings
2. **Frontend** (Next.js 14) - User interface for browsing and booking

**NOT integrated** with core platform modules (by design - see ADR-001).

---

## Project Structure

```
packages/rentals/
├── backend/                 # Express API (Port 3012*)
│   ├── server.js           # Main entry point
│   ├── routes/             # API routes
│   ├── models/             # Data models
│   └── services/           # Business logic
│
├── frontend/               # Next.js 14 App (Port 3013*)
│   ├── app/                # App Router
│   │   ├── page.tsx        # Homepage
│   │   ├── vehicles/       # Browse vehicles
│   │   ├── booking/        # Booking flow
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   ├── lib/                # Utilities (to be added)
│   └── public/             # Static assets
│
└── shared/                 # Shared between FE/BE
    └── types/              # TypeScript types
```

**⚠️ Port Conflicts:** Currently on 3012/3013 which conflict with Auth/Filters modules. Should move to 3021-3022. See PORT-REGISTRY.json.

---

## Tech Stack Details

### Backend (Express API)

```json
{
  "framework": "Express 4.x",
  "language": "Node.js + TypeScript",
  "database": "TBD (likely PostgreSQL)",
  "port": "3012 (target: 3021)"
}
```

**Key Features:**
- Vehicle availability management
- Booking/reservation system
- Pricing calculator
- Multi-location support (planned)

### Frontend (Next.js 14)

```json
{
  "framework": "Next.js 14",
  "react": "19.0.0",
  "typescript": "5.x",
  "styling": "Tailwind CSS",
  "port": "3013 (target: 3022)"
}
```

**Key Features:**
- Vehicle browsing
- Real-time availability
- Booking flow
- Payment integration (planned)

---

## Current State

### ✅ Completed (Nov 5-6, 2025)

- [x] Backend API structure
- [x] Frontend UI basic pages
- [x] Vehicle listing
- [x] Booking flow skeleton
- [x] SEO integration (via packages/shared/seo/)

### 🔄 In Progress / Planned

- [ ] i18n implementation (language TBD)
- [ ] Database integration
- [ ] Payment processing
- [ ] User authentication
- [ ] Booking management dashboard
- [ ] Multi-location support

---

## Shared Dependencies

### From `packages/shared/`

```typescript
// SEO components
import { SEOHead } from '@gudbro/shared/seo';

// Database types (when implemented)
// import { Vehicle } from '@gudbro/shared/database/types';
```

**Key:** Rentals uses shared SEO infrastructure (same as Coffeeshop, Wellness).

---

## i18n Strategy (Not Yet Implemented)

### Recommended Languages

For Da Nang/Vietnam market:
- English (EN) - International tourists
- Vietnamese (VN) - Local customers
- Korean (KO) - Korean tourists (popular in Da Nang)

### Implementation Options

**Option A: Use Module 10**
- Pro: Already has VN/KO/EN
- Pro: No duplicate code
- Con: Need to integrate with core platform

**Option B: Standalone (like Coffeeshop)**
- Pro: Faster implementation
- Pro: Can add other languages easily
- Con: Duplicate code

**Recommendation:** Start with Option B (standalone), migrate to Module 10 when adding 5th vertical or 5th language.

---

## API Endpoints (Backend)

### Vehicles

```
GET    /api/vehicles              # List all vehicles
GET    /api/vehicles/:id          # Get vehicle details
GET    /api/vehicles/available    # Check availability
POST   /api/vehicles/:id/book     # Create booking
```

### Bookings

```
GET    /api/bookings              # List user bookings
GET    /api/bookings/:id          # Get booking details
PUT    /api/bookings/:id/cancel   # Cancel booking
```

### Locations (Planned)

```
GET    /api/locations             # List rental locations
GET    /api/locations/:id         # Location details
```

---

## Frontend Pages

### Public Pages

```
/                  # Homepage - Featured vehicles
/vehicles          # Browse all vehicles
/vehicles/:id      # Vehicle details
/booking           # Booking flow
/about             # About the rental service
/contact           # Contact information
```

### User Pages (Planned)

```
/account           # User dashboard
/account/bookings  # Booking history
/account/profile   # User profile
```

---

## Known Issues & Technical Debt

### High Priority

**Port Conflicts**
- Backend on 3012 conflicts with Auth module
- Frontend on 3013 conflicts with Filters module
- **Action:** Move to 3021-3022
- **When:** When refactoring ports (see PORT-REGISTRY.json)

### Medium Priority

1. **No i18n** - Language support not implemented
2. **No Database** - Using mock data
3. **No Authentication** - User login not implemented
4. **No Payment** - Payment processing not integrated

### Low Priority

1. **No README.md** - This CLAUDE.md serves as documentation
2. **No Automated Tests** - Testing infrastructure not set up

---

## Development Workflow

### Start Both Services

```bash
# Terminal 1 - Backend
cd packages/rentals/backend
npm start  # Runs on port 3012

# Terminal 2 - Frontend
cd packages/rentals/frontend
npm run dev  # Runs on port 3013
```

**⚠️ Note:** Frontend may fail if backend not running (API calls depend on it).

### Build for Production

```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build && npm start
```

---

## Adding i18n (When Triggered)

### Step 1: Choose Strategy

Decide: Module 10 or standalone?
- Check: `/docs/I18N-MIGRATION-ROADMAP.md`
- Follow: i18n decision tree in root `/CLAUDE.md`

### Step 2: If Standalone (Like Coffeeshop)

1. Copy from coffeeshop:
   ```bash
   cp packages/coffeeshop/frontend/lib/translations.ts \
      packages/rentals/frontend/lib/
   cp packages/coffeeshop/frontend/lib/use-translation.ts \
      packages/rentals/frontend/lib/
   ```

2. Adapt translations for rental context:
   ```typescript
   export const translations = {
     en: {
       vehicles: { title: 'Available Vehicles' },
       booking: { button: 'Book Now' },
       // ...
     },
     vn: {
       vehicles: { title: 'Xe Có Sẵn' },
       // ...
     }
   }
   ```

3. Update components to use `useTranslation()`

### Step 3: If Module 10

Follow migration guide in `/docs/I18N-MIGRATION-ROADMAP.md`.

---

## Code Patterns

### Backend API Route

```javascript
// backend/routes/vehicles.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const vehicles = await vehicleService.getAll();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

### Frontend Component

```typescript
// frontend/app/vehicles/page.tsx
'use client';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3012/api/vehicles')
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, []);

  return (
    <div>
      {vehicles.map(v => (
        <VehicleCard key={v.id} vehicle={v} />
      ))}
    </div>
  );
}
```

---

## Environment Variables

### Backend `.env`

```bash
PORT=3012  # Target: 3021
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
STRIPE_KEY=sk_test_...
```

### Frontend `.env.local`

```bash
NEXT_PUBLIC_API_URL=http://localhost:3012  # Target: 3021
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## Future Roadmap

### Phase 1: MVP Enhancements (Next)

- [ ] Add i18n (EN/VN/KO recommended)
- [ ] Integrate real database (PostgreSQL)
- [ ] Add user authentication
- [ ] Implement booking confirmation

### Phase 2: Payments & Bookings

- [ ] Stripe/PayPal integration
- [ ] Booking management dashboard
- [ ] Email notifications
- [ ] SMS notifications (for Da Nang market)

### Phase 3: Multi-Location

- [ ] Support multiple rental locations
- [ ] Location-based availability
- [ ] Pickup/dropoff coordination

### Phase 4: Advanced Features

- [ ] Loyalty program
- [ ] Dynamic pricing
- [ ] Mobile app (React Native)
- [ ] Fleet management tools

---

## Port Migration Plan

**Current:** 3012 (backend), 3013 (frontend)
**Target:** 3021 (backend), 3022 (frontend)

**Steps:**
1. Update `backend/server.js`: `PORT = 3021`
2. Update `frontend/.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:3021`
3. Update `/docs/PORT-REGISTRY.json`
4. Update `/docs/MODULE-REGISTRY.md`
5. Test both services
6. Commit changes

**When:** During next refactoring session (low priority - no immediate conflicts).

---

## Getting Help

**Within Rentals:**
- Check this file (CLAUDE.md)
- Review backend `routes/` for API structure
- Review frontend `app/` for page structure

**Project-Wide:**
- Root `/CLAUDE.md` - Overall architecture
- `/docs/MODULE-REGISTRY.md` - All modules
- `/docs/adr/001-standalone-vertical-templates.md` - Why standalone
- `/docs/PORT-REGISTRY.json` - Port conflicts and resolution

---

## Quick Commands

```bash
# Start backend
cd backend && npm start

# Start frontend
cd frontend && npm run dev

# Check both ports
lsof -i :3012  # Backend
lsof -i :3013  # Frontend

# Search for TODOs
grep -r "TODO" backend/ frontend/
```

---

**This file provides Rentals-specific context for Claude Code sessions.**

**Last Updated:** 2025-11-17
**Status:** MVP Complete, enhancement pending
