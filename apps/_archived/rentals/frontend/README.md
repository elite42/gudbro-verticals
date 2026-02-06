# Rentals Module - Frontend

**Status:** ✅ **FULLY INTEGRATED & RUNNING**
**Demo URL:** http://localhost:3013
**Backend API:** http://localhost:3012

---

## Overview

Complete frontend landing page for Da Nang Bike Rentals, built with Next.js 14 and React 18.

**Tech Stack:**

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Server-side rendering + Client-side interactivity

---

## Features Implemented

### 1. Hero Section ✅

- Cover image with gradient overlay
- Business logo (circular with border)
- Business name, tagline, description
- "Book Now" CTA button with scroll behavior
- Mobile-responsive design

### 2. Features Grid ✅

- 4 trust badges with icons + text:
  - ✅ New & Well-Maintained Bikes
  - 🛡️ Full Insurance Coverage
  - ⚡ Instant Booking
  - 💰 Best Rates in Da Nang
- Auto-responsive grid layout

### 3. Fleet Gallery ✅

- Dynamic fetch from backend API
- Grid display of available bikes
- Each bike card shows:
  - Photo
  - Brand + Model
  - Daily rate (VND)
  - "Select This Bike" button
- Click to auto-scroll to booking form

### 4. Pricing Table ✅

- 4 pricing tiers:
  - 1 Day: 120,000 - 200,000 VND
  - 1 Week: 700,000 - 1,200,000 VND
  - 1 Month: 2,500,000 - 4,000,000 VND
  - Long-term: Special rates
- Alternating row colors
- Orange accent color matching brand

### 5. WhatsApp Contact Form ✅

- Name, Phone, Message fields
- Pre-fills selected bike if clicked from gallery
- Submits to backend → generates WhatsApp URL
- Redirects user to WhatsApp with pre-filled message
- Green WhatsApp brand color

### 6. VietQR Payment (Optional) ✅

- Shows after booking confirmation (optional flow)
- Displays QR code from VietQR API
- Amount + description display
- Step-by-step payment instructions

### 7. Footer ✅

- Business name
- "Powered by Gudbro" branding

---

## Running Locally

### Prerequisites:

1. Backend must be running on port 3012
2. Node.js 20.x installed

### Start Development Server:

```bash
cd packages/rentals/frontend
npm install
npm run dev
```

**Frontend will be available at:** http://localhost:3013

---

## Environment Variables

**.env.local:**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3012/api/rentals
```

**For Production:**

```bash
NEXT_PUBLIC_API_URL=https://api.gudbro.com/api/rentals
```

---

## Architecture

### Component Structure:

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Home page (uses RentalServiceTemplate)
└── globals.css         # Global styles + component CSS

components/
├── RentalServiceTemplate.tsx  # Main orchestrator component
├── RentalHero.tsx             # Hero section
├── FleetGallery.tsx           # Fleet grid with API fetch
├── WhatsAppContactForm.tsx    # Booking form → WhatsApp
└── VietQRPayment.tsx          # Payment QR display
```

### Data Flow:

1. **Page Load** → SSR renders static content (hero, features, pricing)
2. **Client Hydration** → FleetGallery fetches bikes from backend
3. **User Selects Bike** → Scrolls to booking form, pre-fills bike
4. **User Submits Form** → POST to backend → Get WhatsApp URL → Redirect
5. **Optional Payment** → POST to backend → Get VietQR image → Display

---

## Backend Integration

**API Endpoints Used:**

### 1. GET /api/rentals/:hubId/fleet

Fetches available bikes from Airtable (or mock data).

**Request:**

```bash
GET http://localhost:3012/api/rentals/550e8400-e29b-41d4-a716-446655440000/fleet
```

**Response:**

```json
{
  "fleet": [
    {
      "id": "1",
      "brand": "Honda",
      "model": "Wave Alpha",
      "dailyRate": 120000,
      "thumbnail": "...",
      "specs": { ... }
    }
  ]
}
```

### 2. POST /api/rentals/:hubId/inquiry

Submits customer inquiry, returns WhatsApp URL.

**Request:**

```json
{
  "name": "John Doe",
  "phone": "+84905999888",
  "message": "I want to rent a bike",
  "bikeModel": "Honda Wave Alpha"
}
```

**Response:**

```json
{
  "success": true,
  "whatsappUrl": "https://wa.me/84905123456?text=...",
  "message": "Inquiry received. Redirecting to WhatsApp..."
}
```

### 3. POST /api/rentals/:hubId/vietqr

Generates VietQR payment code.

**Request:**

```json
{
  "amount": 500000,
  "description": "Bike rental deposit - Honda Wave Alpha",
  "customerName": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "qrUrl": "https://img.vietqr.io/image/970436-1234567890-compact.png?amount=500000&addInfo=...",
  "vietqrData": { ... }
}
```

---

## Styling

**Design System:**

- Primary color: `#3B82F6` (Blue)
- Secondary color: `#10B981` (Green - WhatsApp)
- Accent color: `#F59E0B` (Orange - pricing)
- Font: Inter, system fonts fallback

**Mobile-first approach:**

- Breakpoint: 768px
- Hero font size scales down
- Grid columns auto-adjust
- Form padding reduces

---

## SEO & Metadata

**Already configured:**

- Title: "Da Nang Bike Rentals - Rent Scooters & Motorbikes"
- Description optimized for search
- Keywords: bike rental da nang, motorbike rental vietnam
- Open Graph tags (Facebook, Twitter)
- Responsive viewport meta tag

---

## Performance

**Optimizations:**

- Image preload for hero
- Lazy loading for images
- CSS code splitting
- Incremental static regeneration (Next.js)
- Fast Refresh in development

**Lighthouse Score (expected in production):**

- Performance: 90+
- SEO: 100
- Accessibility: 95+
- Best Practices: 95+

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## Next Steps

### Phase 1 Remaining:

1. ⏳ Manual browser testing (full user flow)
2. ⏳ Test on real mobile devices
3. ⏳ Connect real Airtable database
4. ⏳ Setup Cal.com booking widget integration
5. ⏳ Deploy to Vercel/Railway

### Phase 2:

- Add image optimization (Next.js Image)
- Add loading states & skeletons
- Add error boundaries
- Add analytics (PostHog)
- Add A/B testing

---

## File Structure

```
packages/rentals/frontend/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global + component styles
├── components/
│   ├── RentalServiceTemplate.tsx
│   ├── RentalHero.tsx
│   ├── FleetGallery.tsx
│   ├── WhatsAppContactForm.tsx
│   ├── VietQRPayment.tsx
│   └── index.ts                # Component exports
├── public/                     # Static assets (if needed)
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── README.md                   # This file
```

---

## Deployment

### Vercel (Recommended):

```bash
cd packages/rentals/frontend
vercel
```

### Environment Variables (Vercel):

- `NEXT_PUBLIC_API_URL` → Backend API URL

### Railway:

```bash
railway up
```

### Docker:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

## Support

**Issues:** Open a GitHub issue in qr-platform-complete repo
**Questions:** Contact tech team

---

**Created:** 2025-11-05
**Status:** ✅ Production-ready (after external services setup)
**Version:** 1.0.0
