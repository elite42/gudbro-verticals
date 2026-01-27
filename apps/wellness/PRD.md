# Wellness PWA - Product Requirements Document

> **Version:** 1.0
> **Last Updated:** 2026-01-27
> **Status:** In Development

---

## 1. Executive Summary

### Vision

GUDBRO Wellness è una PWA mobile-first per attività di benessere e cura della persona. Permette ai clienti di scoprire servizi, visualizzare staff/specialisti, e prenotare appuntamenti in modo semplice e immediato.

### Target Market

- **Primary:** Turisti internazionali in Vietnam (Da Nang, Hoi An, Ho Chi Minh, Hanoi)
- **Secondary:** Expat community, digital nomads
- **Tertiary:** Clienti locali vietnamiti

### Business Types Supportati

| Categoria               | Esempi                                                    | Icon |
| ----------------------- | --------------------------------------------------------- | ---- |
| **Spa & Massage**       | Thai massage, Vietnamese massage, Hot stone, Aromatherapy | 💆   |
| **Hair Salon**          | Taglio, colore, trattamenti, styling                      | ✂️   |
| **Barbershop**          | Taglio uomo, barba, grooming                              | 💈   |
| **Nail Salon**          | Manicure, pedicure, nail art, gel                         | 💅   |
| **Beauty & Aesthetics** | Facial, skincare, lash extensions, brows                  | ✨   |
| **Tattoo & Piercing**   | Tattoo, piercing, removal                                 | 🎨   |
| **Wellness Center**     | Yoga, meditation, sauna, detox                            | 🧘   |

### Multi-Service Business

Molte attività offrono servizi combinati:

- Spa + Hair Salon
- Massage + Nail Salon
- Barbershop + Massage
- Full-service Beauty Center (tutto)

La PWA deve gestire **categorie multiple per singolo business**.

---

## 2. User Personas

### Persona 1: Tourist Traveler

- **Nome:** Sarah, 32, USA
- **Contesto:** In vacanza a Da Nang per 2 settimane
- **Needs:** Trovare spa affidabile, vedere prezzi chiari, prenotare facilmente
- **Pain Points:** Barriera linguistica, non sa quali posti sono buoni
- **Goals:** Rilassarsi, provare massaggio vietnamita tradizionale

### Persona 2: Digital Nomad

- **Nome:** Marcus, 28, Germany
- **Contesto:** Lavora da remoto, vive a Hoi An da 3 mesi
- **Needs:** Barbiere regolare, massaggi settimanali, prezzi locali
- **Pain Points:** Vuole qualità ma budget-conscious
- **Goals:** Trovare "i suoi posti" di fiducia

### Persona 3: Expat Resident

- **Nome:** Lisa, 45, Australia
- **Contesto:** Vive in Vietnam da 5 anni con famiglia
- **Needs:** Hair salon professionale, nail care regolare, servizi premium
- **Pain Points:** Standard occidentali difficili da trovare
- **Goals:** Qualità costante, staff che parla inglese

### Persona 4: Local Vietnamese

- **Nome:** Linh, 25, Vietnam
- **Contesto:** Professionista locale, cerca trattamenti dopo lavoro
- **Needs:** Prezzi competitivi, disponibilità serale/weekend
- **Pain Points:** Vuole servizi moderni ma prezzi locali
- **Goals:** Self-care routine accessibile

---

## 3. Core Features

### 3.1 Service Discovery

**Service Categories**

```
├── Massage & Spa
│   ├── Traditional Vietnamese
│   ├── Thai Massage
│   ├── Hot Stone
│   ├── Aromatherapy
│   ├── Deep Tissue
│   ├── Couples Massage
│   └── Foot Reflexology
│
├── Hair
│   ├── Haircut (Men/Women)
│   ├── Color & Highlights
│   ├── Keratin Treatment
│   ├── Hair Spa
│   ├── Styling & Blowout
│   └── Extensions
│
├── Barbershop
│   ├── Haircut
│   ├── Beard Trim
│   ├── Hot Towel Shave
│   ├── Beard Design
│   └── Grooming Package
│
├── Nails
│   ├── Manicure
│   ├── Pedicure
│   ├── Gel/Shellac
│   ├── Nail Art
│   ├── Nail Extensions
│   └── Mani-Pedi Combo
│
├── Beauty & Face
│   ├── Facial Treatment
│   ├── Acne Treatment
│   ├── Anti-Aging
│   ├── Lash Extensions
│   ├── Lash Lift
│   ├── Brow Shaping
│   └── Brow Lamination
│
├── Tattoo & Piercing
│   ├── Custom Tattoo
│   ├── Flash Tattoo
│   ├── Cover-up
│   ├── Piercing
│   └── Tattoo Removal
│
└── Wellness
    ├── Yoga Class
    ├── Meditation
    ├── Sauna/Steam
    ├── Body Scrub
    └── Detox Program
```

**Service Card Info**

- Nome servizio (multi-lingua)
- Durata (30min, 60min, 90min, etc.)
- Prezzo (con valuta selezionabile)
- Rating medio
- Immagine/gallery
- Staff disponibili
- Disponibilità immediata badge

### 3.2 Staff Profiles

**Staff Card**

- Foto professionale
- Nome e ruolo/specialità
- Anni di esperienza
- Lingue parlate (EN, VN, KO, etc.)
- Rating personale
- Servizi offerti
- Bio breve
- Disponibilità oggi/domani

**Staff Detail Page**

- Gallery lavori (per tattoo, nails, hair)
- Certificazioni
- Reviews clienti
- Calendario disponibilità
- Book now CTA

### 3.3 Booking System

**Booking Flow**

1. Seleziona servizio (o pacchetto)
2. Seleziona staff (opzionale - "Any available")
3. Seleziona data
4. Seleziona orario disponibile
5. Aggiungi note speciali
6. Conferma (con contatto: WhatsApp/Zalo/Call)

**Booking Options**

- **Instant Book:** Conferma immediata
- **Request Book:** Richiesta da confermare
- **Walk-in Welcome:** Badge per chi accetta senza prenotazione

### 3.4 Packages & Promotions

**Package Types**

- Combo servizi (Massage + Facial)
- Time-based (2h Pamper Package)
- VIP Packages (Full day spa)
- Couples/Group packages
- Membership packages (10 sessions)

**Promotions**

- Happy Hour (orari specifici)
- First-time discount
- Referral bonus
- Seasonal offers
- Last-minute deals

### 3.5 Reviews & Trust

**Review Display**

- Rating complessivo (4.8/5)
- Breakdown per categoria (Service, Cleanliness, Value)
- Reviews recenti con foto
- Verified booking badge
- Response from owner

### 3.6 Contact & Location

**Contact Methods**

- WhatsApp (preferito per turisti)
- Zalo (preferito per vietnamiti)
- Telegram
- Phone call
- Facebook Messenger

**Location**

- Indirizzo con mappa
- Distanza da punto di riferimento
- Indicazioni (come arrivare)
- Parcheggio info
- Orari di apertura

---

## 4. User Flows

### Flow 1: Browse & Book Service

```
Homepage
    ↓
[Browse Categories] → [Select "Massage"]
    ↓
Service List (filtered)
    ↓
[Select "Thai Massage 60min"]
    ↓
Service Detail
    ↓
[Book Now]
    ↓
Select Staff (optional)
    ↓
Select Date & Time
    ↓
Add Notes
    ↓
[Confirm via WhatsApp/Zalo]
    ↓
Confirmation + Add to Calendar
```

### Flow 2: Find Staff First

```
Homepage
    ↓
[View Staff] → Staff Gallery
    ↓
[Select Therapist "Linh"]
    ↓
Staff Profile
    ↓
[View Services by Linh]
    ↓
[Select Service]
    ↓
Booking Flow...
```

### Flow 3: Quick Package Booking

```
Homepage
    ↓
[Featured Package Banner]
    ↓
Package Detail (services included)
    ↓
[Book Package]
    ↓
Select Date & Time
    ↓
Confirm...
```

---

## 5. Data Models

### Business (Merchant)

```typescript
interface WellnessBusiness {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline: string;

  // Multi-category support
  categories: WellnessCategory[];
  primaryCategory: WellnessCategory;

  // Contact
  phone: string;
  whatsapp?: string;
  zalo?: string;
  telegram?: string;
  email?: string;
  website?: string;

  // Social
  facebook?: string;
  instagram?: string;
  tiktok?: string;

  // Location
  address: string;
  city: string;
  district: string;
  coordinates: { lat: number; lng: number };
  googleMapsUrl: string;

  // Hours
  openingHours: OpeningHours[];
  timezone: string;

  // Media
  logo: string;
  coverImage: string;
  gallery: string[];

  // Settings
  currency: string;
  languages: string[];
  acceptWalkIns: boolean;
  instantBooking: boolean;

  // Reviews
  rating: number;
  reviewCount: number;

  // Payment
  paymentMethods: PaymentMethod[];

  status: 'active' | 'paused' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

type WellnessCategory =
  | 'spa_massage'
  | 'hair_salon'
  | 'barbershop'
  | 'nail_salon'
  | 'beauty_aesthetics'
  | 'tattoo_piercing'
  | 'wellness_center';
```

### Service

```typescript
interface WellnessService {
  id: string;
  businessId: string;

  name: string;
  nameTranslations: Record<string, string>; // { en, vi, ko, zh }
  description: string;
  descriptionTranslations: Record<string, string>;

  category: WellnessCategory;
  subcategory: string; // "thai_massage", "haircut_men", etc.

  duration: number; // minutes
  price: number;
  currency: string;
  priceType: 'fixed' | 'from' | 'variable';

  // Variants (e.g., 30min/60min/90min)
  variants?: ServiceVariant[];

  // Media
  image?: string;
  gallery?: string[];

  // Availability
  availableStaff: string[]; // staff IDs
  requiresSpecificStaff: boolean;

  // Booking settings
  advanceBookingDays: number;
  cancellationPolicy: string;

  // Display
  featured: boolean;
  sortOrder: number;

  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

interface ServiceVariant {
  name: string;
  duration: number;
  price: number;
  description?: string;
}
```

### Staff

```typescript
interface WellnessStaff {
  id: string;
  businessId: string;

  name: string;
  nickname?: string;
  role: string; // "Massage Therapist", "Hair Stylist", etc.

  bio: string;
  bioTranslations: Record<string, string>;

  photo: string;
  portfolio?: string[]; // Work samples (tattoos, nails, hair)

  specialties: string[];
  certifications?: string[];
  yearsExperience: number;
  languages: string[];

  // Services this staff can perform
  serviceIds: string[];

  // Availability
  workingDays: number[]; // 0-6 (Sun-Sat)
  workingHours: { start: string; end: string };

  // Reviews
  rating: number;
  reviewCount: number;

  status: 'active' | 'on_leave' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
```

### Booking

```typescript
interface WellnessBooking {
  id: string;
  businessId: string;

  // Customer
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerLanguage: string;

  // Service
  serviceId: string;
  serviceName: string;
  variantName?: string;
  duration: number;
  price: number;
  currency: string;

  // Staff
  staffId?: string; // null = any available
  staffName?: string;

  // Timing
  date: Date;
  startTime: string; // "10:00"
  endTime: string; // "11:00"

  // Status
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  confirmedVia?: 'whatsapp' | 'zalo' | 'phone' | 'walk_in';

  // Notes
  customerNotes?: string;
  staffNotes?: string;

  // Package reference
  packageId?: string;

  createdAt: Date;
  updatedAt: Date;
}
```

### Package

```typescript
interface WellnessPackage {
  id: string;
  businessId: string;

  name: string;
  nameTranslations: Record<string, string>;
  description: string;

  // Included services
  services: {
    serviceId: string;
    serviceName: string;
    duration: number;
  }[];

  totalDuration: number;
  originalPrice: number;
  packagePrice: number;
  discountPercent: number;
  currency: string;

  image?: string;

  // Validity
  validFrom?: Date;
  validUntil?: Date;

  featured: boolean;
  status: 'active' | 'inactive';

  createdAt: Date;
  updatedAt: Date;
}
```

---

## 6. Design System

### Color Palette

```css
:root {
  /* Primary - Sage Green (calm, natural, wellness) */
  --sage: #8ba888;
  --sage-light: #e8f0e7;
  --sage-dark: #6b8869;

  /* Background - Warm Cream */
  --cream: #faf8f3;
  --cream-dark: #f0ede5;

  /* Text */
  --charcoal: #2d2926;
  --charcoal-light: #6b6560;
  --charcoal-muted: #9b9590;

  /* Accent - Soft Gold */
  --gold: #c9a962;
  --gold-light: #f5eed9;

  /* Secondary - Blush Pink */
  --blush: #e8d5d5;
  --blush-dark: #d4b5b5;

  /* Functional */
  --success: #4caf50;
  --error: #e57373;
  --warning: #ffb74d;

  /* Category Colors */
  --cat-massage: #8ba888; /* Sage */
  --cat-hair: #b8a898; /* Taupe */
  --cat-nails: #e8b8b8; /* Rose */
  --cat-beauty: #d4b8d4; /* Lavender */
  --cat-tattoo: #4a4a4a; /* Charcoal */
  --cat-barber: #8b7355; /* Warm Brown */
  --cat-wellness: #a8c8d8; /* Sky Blue */
}
```

### Typography

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'DM Sans', system-ui, sans-serif;
}
```

### Design Principles

1. **Zen & Calm** - Spazi generosi, colori soft, transizioni fluide
2. **Premium Feel** - Immagini di qualità, tipografia elegante
3. **Mobile-First** - Ottimizzato per smartphone, touch-friendly
4. **Trust Building** - Reviews prominenti, staff visibili, certificazioni
5. **Easy Booking** - Max 3 tap per prenotare

---

## 7. Page Structure

### Homepage

```
┌─────────────────────────┐
│ Header (compact)        │
│ Logo + Lang/Currency    │
├─────────────────────────┤
│ Hero Category Pills     │
│ [Massage][Hair][Nails]  │
├─────────────────────────┤
│ Featured Services       │
│ (horizontal scroll)     │
├─────────────────────────┤
│ Meet Our Team           │
│ Staff cards (scroll)    │
├─────────────────────────┤
│ Special Packages        │
│ VIP deals banner        │
├─────────────────────────┤
│ Reviews Highlight       │
│ Rating + recent reviews │
├─────────────────────────┤
│ Location & Hours        │
│ Map + contact buttons   │
├─────────────────────────┤
│ Bottom Nav              │
│ [Home][Services][Book]  │
│ [Staff][More]           │
└─────────────────────────┘
```

### Services Page

```
┌─────────────────────────┐
│ Header + Search         │
├─────────────────────────┤
│ Category Filter Tabs    │
│ [All][Massage][Hair]... │
├─────────────────────────┤
│ Services Grid/List      │
│ ┌─────────┐ ┌─────────┐ │
│ │ Service │ │ Service │ │
│ │  Card   │ │  Card   │ │
│ └─────────┘ └─────────┘ │
├─────────────────────────┤
│ Bottom Nav              │
└─────────────────────────┘
```

### Booking Sheet (Bottom Sheet)

```
┌─────────────────────────┐
│ ──── (drag handle)      │
├─────────────────────────┤
│ Service: Thai Massage   │
│ 60 min • $25            │
├─────────────────────────┤
│ Select Staff            │
│ [Any] [Linh] [Mai]      │
├─────────────────────────┤
│ Select Date             │
│ [Calendar picker]       │
├─────────────────────────┤
│ Select Time             │
│ [09:00][10:00][11:00]   │
├─────────────────────────┤
│ Notes (optional)        │
│ [________________]      │
├─────────────────────────┤
│ [Book via WhatsApp]     │
│ [Book via Zalo]         │
│ [Call to Book]          │
└─────────────────────────┘
```

---

## 8. i18n Strategy

### Supported Languages

| Code | Language   | Priority                     |
| ---- | ---------- | ---------------------------- |
| EN   | English    | Primary (tourists)           |
| VI   | Vietnamese | Primary (locals)             |
| KO   | Korean     | Secondary (Korean tourists)  |
| ZH   | Chinese    | Secondary (Chinese tourists) |
| JA   | Japanese   | Tertiary                     |
| RU   | Russian    | Tertiary (Nha Trang)         |

### Supported Currencies

| Code | Currency        | Markets           |
| ---- | --------------- | ----------------- |
| VND  | Vietnamese Dong | Default           |
| USD  | US Dollar       | Tourists          |
| KRW  | Korean Won      | Korean tourists   |
| EUR  | Euro            | European tourists |

---

## 9. Technical Requirements

### Performance

- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse score > 90

### PWA Features

- Installable (Add to Home Screen)
- Offline service catalog
- Push notifications (booking reminders)

### SEO

- Server-side rendering for service pages
- Structured data (LocalBusiness, Service)
- Multi-language hreflang tags

### Analytics

- Page views per service
- Booking funnel conversion
- Staff popularity
- Peak booking times

---

## 10. Success Metrics

### North Star

- **Bookings per Month** via PWA

### Key Metrics

| Metric                        | Target            |
| ----------------------------- | ----------------- |
| Conversion Rate (view → book) | > 5%              |
| Booking Completion Rate       | > 70%             |
| Return Customer Rate          | > 30%             |
| Average Rating                | > 4.5             |
| Staff Profile Views           | > 50% of visitors |

---

## 11. Roadmap

### Phase 1: MVP (Current)

- [x] Service catalog
- [x] Staff profiles
- [ ] **Redesign homepage** ← CURRENT
- [ ] Booking flow via messaging
- [ ] Multi-language support

### Phase 2: Enhanced Booking

- [ ] Real-time availability calendar
- [ ] Instant booking confirmation
- [ ] Booking management for customers
- [ ] Email/SMS reminders

### Phase 3: Growth

- [ ] Online payment integration
- [ ] Loyalty program
- [ ] Gift certificates
- [ ] Referral system

### Phase 4: Platform

- [ ] Multi-location support
- [ ] Franchise management
- [ ] Advanced analytics
- [ ] API for third-party integrations

---

## 12. Competitive Analysis

### Direct Competitors (Vietnam)

- **Zenoti** - Enterprise spa software (too complex for SMB)
- **Fresha** - Free booking platform (limited customization)
- **Vagaro** - US-focused (not localized for Vietnam)

### GUDBRO Advantages

1. **Localized** - Built for Vietnam market (Zalo, VND, Vietnamese)
2. **Multi-category** - One system for spa+hair+nails
3. **Simple** - Easy setup, no training needed
4. **Affordable** - SMB-friendly pricing
5. **Mobile-first** - PWA, not legacy web app

---

## Changelog

| Version | Date       | Changes                                 |
| ------- | ---------- | --------------------------------------- |
| 1.0     | 2026-01-27 | Initial PRD with multi-category support |
