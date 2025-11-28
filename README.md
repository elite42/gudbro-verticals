# GUDBRO Verticals

Standalone vertical business applications built on GUDBRO's QR platform.

## 📦 Repository Structure

```
gudbro-verticals/
├── apps/
│   ├── coffeeshop/          # Coffee shop / restaurant digital menu
│   ├── wellness/            # Wellness center & spa management
│   └── rentals/             # Equipment & vehicle rentals
└── shared/                  # Shared code & product database
    ├── database/            # Product catalogs, safety filters
    └── menu-template/       # Reusable menu components
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install all dependencies
npm install
```

### Development

Run individual apps:

```bash
# Coffeeshop (Port 3020)
npm run dev:coffeeshop

# Wellness (Port 3021)
npm run dev:wellness

# Rentals (Port 3022)
npm run dev:rentals
```

### Production Build

```bash
# Build all apps
npm run build:coffeeshop
npm run build:wellness
npm run build:rentals
```

## 📱 Applications

### Coffeeshop (ROOTS)
**Status:** ✅ Production Ready
**Port:** 3020
**Features:**
- Multi-language digital menu (EN/VI/IT)
- Product customization (size, sugar, ice, milk)
- Shopping cart with localStorage
- Design system with 46 safety filter icons
- Responsive mobile-first UI

**Tech Stack:** Next.js 14, React 19, Tailwind CSS, TypeScript

### Wellness
**Status:** 🚧 Development
**Port:** 3021
**Features:**
- Spa & wellness service booking
- Treatment packages
- Therapist profiles
- Membership management

**Tech Stack:** Next.js, React, Tailwind CSS

### Rentals
**Status:** 🚧 Development
**Port:** 3022
**Features:**
- Equipment rental catalog
- Booking & availability calendar
- Pricing calculator
- Customer management

**Tech Stack:** Next.js, React, Tailwind CSS

## 🛠️ Shared Resources

### Product Database
Centralized product catalogs in `shared/database/products/`:
- `roots-products.ts` - Coffeeshop menu items
- Safety filter system (allergens, dietary requirements)

### Menu Template
Reusable React components in `shared/menu-template/`:
- MenuCard, CategoryTabs, ProductCustomization
- 80%+ code reuse across verticals

## 📝 Development Guidelines

### Adding a New Vertical

1. Create new app directory: `apps/your-vertical/`
2. Copy structure from existing app
3. Add npm scripts to root `package.json`
4. Import shared components from `shared/`
5. Update this README

### Port Assignments

- Coffeeshop: 3020
- Wellness: 3021
- Rentals: 3022
- Future verticals: 3023+

## 🔗 Related Repositories

- **gudbro-qr-core** - QR platform, microservices, admin UI

## 📄 License

UNLICENSED - Proprietary software

## 👥 Team

GUDBRO Development Team

---

**Last Updated:** 2025-11-28
