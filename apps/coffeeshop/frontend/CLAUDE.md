# Coffeeshop Frontend (ROOTS) - Claude Code Context

**Vertical:** Coffeeshop / Restaurant Digital Menu
**Tech Stack:** Next.js 14 App Router + React 19
**Port:** 3004 (⚠️ Should be 3020 - see PORT-REGISTRY.json)
**Languages:** EN, VI (Vietnamese), IT (Italian)
**Status:** ✅ Production Ready
**Design System:** ✅ Complete (CVA + shadcn/ui pattern + Internal Hub)
**Last Updated:** 2025-11-23

---

## Quick Context

This is a **standalone Next.js 14 application** for restaurant digital menus, part of GUDBRO's vertical business templates strategy.

**NOT integrated** with core platform modules (by design - see ADR-001).

---

## Project Structure

```
packages/coffeeshop/frontend/
├── app/                      # Next.js 14 App Router
│   ├── page.tsx             # Homepage with featured items
│   ├── menu/                # Menu browsing
│   ├── cart/                # Shopping cart
│   ├── orders/              # Order history
│   ├── offers/              # Special offers
│   ├── account/             # User account
│   └── design-system/       # ✨ Internal Design System Hub (NEW 2025-11-23)
│       ├── layout.tsx       # Hub layout with sidebar nav
│       ├── page.tsx         # Overview page
│       ├── brand/           # Brand guidelines (colors, typography)
│       ├── components/      # Component showcase
│       ├── safety/          # Safety filter icons (46 SVG)
│       └── products/        # Product library management
├── components/              # React components
│   ├── ui/                  # ✨ Design System (NEW 2025-11-19)
│   │   ├── README.md        # Complete documentation (567 lines)
│   │   ├── index.ts         # Centralized exports
│   │   ├── button.tsx       # Button component (6 variants)
│   │   ├── card.tsx         # Card component (5 variants)
│   │   ├── input.tsx        # Input & Textarea components
│   │   ├── badge.tsx        # Badge component (8 variants)
│   │   └── alert.tsx        # Alert component (5 variants)
│   ├── HomeHeader.tsx       # Main navigation
│   ├── MenuHeader.tsx       # Menu-specific nav
│   ├── CartSidebar.tsx      # Shopping cart UI
│   ├── WelcomeModal.tsx     # First-visit experience
│   ├── PaymentMethodModal.tsx  # ✨ Refactored with Design System
│   └── customizations/      # Product customization widgets
├── lib/                     # Business logic
│   ├── utils/
│   │   └── cn.ts            # ✨ Class merge utility (NEW)
│   ├── translations.ts      # ⚠️ 359 lines - duplicate of Module 10
│   ├── use-translation.ts   # i18n React hook
│   ├── cart-store.ts        # Cart state management
│   ├── feedback-store.ts    # User feedback
│   └── table-context-store.ts  # Table/venue context
├── config/
│   └── coffeeshop.config.ts # App configuration
├── data/                    # ✨ NEW 2025-11-23
│   └── sample-products.json # Sample product library data
└── public/                  # Static assets
```

---

## Tech Stack Details

### Framework & Libraries

```json
{
  "framework": "Next.js 14",
  "react": "19.0.0",
  "typescript": "5.x",
  "styling": "Tailwind CSS",
  "designSystem": "shadcn/ui pattern + CVA",
  "icons": "Lucide React",
  "state": "React hooks + localStorage"
}
```

### Key Features

1. **Multi-language Support** - EN/VI/IT via own i18n system
2. **Shopping Cart** - Persistent cart with localStorage
3. **Product Customization** - Size, sugar, ice, milk, extras
4. **Table Context** - QR scan identifies table/venue
5. **Minimal Design** - Flat, clean, mobile-first
6. **Design System** - ✨ Complete UI component library (NEW 2025-11-19)
7. **Design System Hub** - ✨ Internal brand guidelines & product library (NEW 2025-11-23)
8. **No Backend** - Pure frontend (API integration planned)

---

## Design System (NEW 2025-11-19)

Sistema completo di UI components type-safe per garantire consistenza e manutenibilità.

### Componenti Disponibili

- **Button** - 6 varianti (primary, secondary, danger, ghost, link, outline) + 4 taglie
- **Card** - 5 varianti (default, elevated, interactive, selected, ghost) + sub-componenti semantici
- **Input/Textarea** - 4 varianti (default, error, success, ghost) con validazione integrata
- **Badge** - 8 varianti per status, labels, categorie
- **Alert** - 5 varianti per messaggi e notifiche

### Tecnologie

```json
{
  "cva": "Class Variance Authority - Type-safe variant management",
  "tailwind-merge": "Intelligent Tailwind class merging",
  "clsx": "Conditional class names",
  "pattern": "shadcn/ui inspired"
}
```

### Benefici

- ✅ **Single Source of Truth** - Modifica 1 file → cambia tutto
- ✅ **Type-Safe** - TypeScript autocomplete per tutte le varianti
- ✅ **98% tempo risparmiato** - Da 60 min a 30 sec per modifiche design
- ✅ **Zero inconsistenze** - Stile centralizzato
- ✅ **Ready for Backoffice** - Foundation pronta per admin UI

### Utilizzo

```tsx
import { Button, Card, Input, Badge, Alert } from '@/components/ui'

<Button variant="primary" size="lg">Conferma</Button>
<Card variant="elevated" padding="lg">...</Card>
<Input placeholder="Email" inputSize="md" />
<Badge variant="success">Disponibile</Badge>
<Alert variant="info">Messaggio informativo</Alert>
```

### Documentazione

Documentazione completa in `components/ui/README.md` (567 righe) con:
- Guida di ogni componente
- Esempi pratici (Form, Dashboard, Product List)
- Best practices
- Guide per estensione

---

## Design System Hub (NEW 2025-11-23)

Internal web-based hub for brand consistency, component showcase, and product library management. Accessible at `/design-system`.

### Overview

The Design System Hub is a **developer and designer tool** (not exposed to end users) that serves as:
- **Single source of truth** for GUDBRO brand guidelines
- **Component showcase** with live examples
- **Safety filter library** (46 SVG allergen & dietary icons)
- **Product library** for managing menu items

### Features

**🎨 Brand Guidelines (`/design-system/brand`)**
- Official GUDBRO color palette (extracted from PDF)
  - Primary: Red #cd0931, Black #000000, Gold #f8ad16, Light Gray #f2f2f2
  - Secondary: Blue #0931cd, Dark Gray #333333, Orange #f88d16
- Typography system (Rethink Sans + Planet Kosmos)
- Spacing scale (8 values from 4px to 96px)
- Usage guidelines with do's and don'ts

**🧩 Component Showcase (`/design-system/components`)**
- Live examples of all 5 UI components
- All variants displayed (Button: 6, Card: 5, Badge: 8, etc.)
- Interactive demos with different states
- Copy-paste code examples

**🛡️ Safety System (`/design-system/safety`)**
- 46 SVG safety filter icons
- 30 allergen filters + 16 dietary filters
- Multi-language labels (EN/IT/VI)
- Search and filter functionality
- Icon preview with translations

**🍽️ Product Library (`/design-system/products`)**
- Centralized menu item database
- Multi-language support (EN/IT/VI)
- Category filtering (Beverage/Food/Dessert/Other)
- Auto-computed safety badges
- localStorage persistence
- Sample data: 10 products for demonstration

### Accessibility

**WCAG AA Compliant:**
- All text meets minimum 4.5:1 contrast ratio
- Fixed text-on-gold contrast issue (text-black instead of text-gray-900)
- **Dark mode override** - CSS forcing light mode for consistent readability
- Fully responsive with mobile-first design
- Collapsible sidebar with smooth animations

### Technical Implementation

**Responsive Design:**
- Mobile: Single column, hamburger menu
- Tablet: 2-3 columns, visible sidebar
- Desktop: 4 columns, persistent sidebar
- Breakpoints: sm (640px), md (768px), lg (1024px)

**Layout Structure:**
```tsx
app/design-system/
├── layout.tsx          # Root layout with sidebar + dark mode override
├── page.tsx            # Overview with stats cards
├── brand/page.tsx      # Brand guidelines
├── components/page.tsx # Component showcase
├── safety/page.tsx     # Safety filter library
└── products/
    ├── page.tsx        # Product list
    └── create/page.tsx # Add product form
```

**CSS Override for Light Mode:**
The layout includes CSS to force light mode colors, preventing dark mode from making text illegible:

```tsx
<style jsx global>{`
  [class*="bg-theme-bg"] {
    background-color: white !important;
  }
  [class*="text-theme-text"] {
    color: #111827 !important;
  }
  [class*="border-theme-border"] {
    border-color: #e5e7eb !important;
  }
`}</style>
```

**Why This Override?**
- Card component uses `bg-theme-bg-secondary` which changes to dark in browser dark mode
- Text colors (`text-gray-900`) don't adapt → invisible text
- Design System Hub is internal tool, light mode consistency is preferred

### Usage

**Access the Hub:**
```bash
npm run dev
# Navigate to http://localhost:3004/design-system
```

**Adding Products:**
1. Go to `/design-system/products`
2. Click "+ Add Product"
3. Fill in name, category, price, description (3 languages)
4. Add ingredients for auto-computed safety badges
5. Upload photo (optional)
6. Save to localStorage

**Finding Safety Icons:**
1. Go to `/design-system/safety`
2. Use search bar or filter by Allergen/Dietary
3. View icon, translations, and unique ID
4. Import from `@/../../shared/database/safety-filters`

### Data Management

**Product Library Storage:**
- **Development:** localStorage (`designSystem_products`)
- **Production:** Should integrate with backend API
- **Sample Data:** `data/sample-products.json` (10 items)

**Safety Filter Icons:**
- **Source:** `packages/shared/database/safety-filters.ts`
- **Format:** SVG emoji with multi-language labels
- **Count:** 46 total (30 allergens + 16 dietary)

### Future Enhancements

- [ ] Backend API integration for product library
- [ ] Export/import functionality (JSON/CSV)
- [ ] Version history for brand guidelines
- [ ] Component code generator
- [ ] Figma integration
- [ ] Usage analytics (which components used most)

---

## Configuration

### Main Config: `config/coffeeshop.config.ts`

```typescript
export const coffeeshopConfig = {
  name: 'ROOTS Coffee & Kitchen',
  supportedLanguages: [
    { code: 'en', flag: '🇬🇧', name: 'English' },
    { code: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
    { code: 'it', flag: '🇮🇹', name: 'Italiano' }
  ],
  defaultLanguage: 'en',
  currency: { code: 'USD', symbol: '$' },
  features: {
    cart: true,
    customization: true,
    loyalty: false,  // Planned
    payments: false  // Planned
  }
}
```

**⚠️ IMPORTANT:** Korean was removed (no translations exist yet). See MODULE-REGISTRY.md for Module 10 integration plan.

---

## i18n System (Standalone)

### Current Implementation

**Files:**
- `lib/translations.ts` - 359 lines of translation strings
- `lib/use-translation.ts` - React hook for language switching

**Languages:** EN, VI, IT

**Why Standalone?**
- Faster MVP (10-day deadline met in 2 days)
- Italian needed for specific market
- Module 10 only has VN/KO/CN/EN

**Future Plan:**
- Migrate to Module 10 when adding 5th language
- See: `/docs/I18N-MIGRATION-ROADMAP.md`

### Usage Example

```typescript
import { useTranslation } from '@/lib/use-translation';

function MyComponent() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <h1>{t.menu.title}</h1> // Renders in current language
  );
}
```

---

## State Management

### Cart Store (`lib/cart-store.ts`)

```typescript
// Add item to cart
const { addItem, removeItem, clearCart, items } = useCartStore();

addItem({
  id: 'coffee-1',
  name: 'Espresso',
  price: 3.50,
  customizations: { size: 'medium', sugar: 'normal' }
});
```

**Persistence:** localStorage (survives page refresh)

### Feedback Store (`lib/feedback-store.ts`)

Tracks user ratings and feedback for social proof.

### Table Context Store (`lib/table-context-store.ts`)

Stores table number and venue from QR scan.

---

## Product Customization

### Customization Types

**Available in `components/customizations/`:**

1. **SizeSelector.tsx** - Small / Medium / Large
2. **SugarLevelSelector.tsx** - No sugar / Less / Normal / Extra
3. **IceLevelSelector.tsx** - No ice / Less / Normal / Extra
4. **MilkTypeSelector.tsx** - Regular / Almond / Soy / Oat
5. **ExtrasSelector.tsx** - Whipped cream, extra shot, etc.

### Auto-Pricing

Customizations auto-adjust price (see `packages/shared/database/utils/auto-compute.ts`).

---

## Shared Dependencies

### Imports from Shared Packages

```typescript
// Product data
import { rootsProducts } from '@gudbro/shared/database/products/roots-products';

// SEO components
import { SEOHead } from '@gudbro/shared/seo';

// Menu template (80% code reuse)
import { MenuCard } from '@gudbro/menu-template/components';
```

**Key:** Most UI comes from `menu-template` for code sharing.

---

## Styling Approach

### Tailwind + Custom Variables

```css
/* app/globals.css */
:root {
  --primary-brown: #8B4513;
  --cream: #F5F5DC;
  --dark-text: #2D2D2D;
}
```

**Design Philosophy:** Minimal, flat, clean. No gradients, no shadows (mostly).

---

## Known Issues & Technical Debt

### High Priority

None blocking

### Medium Priority

1. **Port Conflict** - On 3004, should be 3020
   - **Impact:** Low (doesn't run with Bulk module simultaneously)
   - **Resolution:** When refactoring ports

2. **i18n Duplication** - 359 lines duplicate of Module 10
   - **Impact:** Medium (maintenance overhead)
   - **Resolution:** Migrate when adding 5th language

### Low Priority

1. **No README.md** - This CLAUDE.md serves as documentation
2. **No Backend Integration** - Pure frontend for now
3. **No Payment Processing** - Planned feature

---

## Development Workflow

### Local Development

```bash
cd packages/coffeeshop/frontend
npm run dev  # Starts on port 3004
```

Open: `http://localhost:3004`

### Building

```bash
npm run build
npm start  # Production mode
```

### Linting

```bash
npm run lint
```

---

## Adding New Language

**Current Process (Before Module 10 migration):**

1. Add to `lib/translations.ts`:
   ```typescript
   export const translations = {
     // ...existing languages
     es: {  // Spanish
       menu: { title: 'Menú' },
       // ...all strings
     }
   }
   ```

2. Add to `config/coffeeshop.config.ts`:
   ```typescript
   supportedLanguages: [
     // ...existing
     { code: 'es', flag: '🇪🇸', name: 'Español' }
   ]
   ```

3. Update `lib/use-translation.ts` if needed

**Future Process (After Module 10 migration):**
- Add to Module 10 database (30 min)
- All verticals get it automatically

---

## Testing

### Manual Testing Checklist

- [ ] Homepage loads
- [ ] Language selector works (EN/VI/IT)
- [ ] Add items to cart
- [ ] Customize products (size, sugar, etc.)
- [ ] Cart persists on refresh
- [ ] Responsive design (mobile/tablet/desktop)

### Automated Tests

Not yet implemented. See `/docs/PROJECT-PLAN.md`.

---

## Deployment

### Vercel (Planned)

```bash
vercel --prod
```

**Environment Variables:**
- `NEXT_PUBLIC_API_URL` - Backend API (when ready)
- `NEXT_PUBLIC_VENUE_ID` - Venue identifier

---

## Code Patterns

### Component Structure

```typescript
'use client';  // Client component (uses hooks)

import { useTranslation } from '@/lib/use-translation';

export function MyComponent() {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <h1>{t.section.title}</h1>
    </div>
  );
}
```

### Server Components

```typescript
// No 'use client' directive
// Can fetch data server-side
// Cannot use React hooks

export default function Page() {
  return <div>Static content</div>;
}
```

---

## Dependencies on Other Packages

### From `packages/shared/`

- **database/products/roots-products.ts** - Product catalog
- **database/customizations/** - Customization options
- **seo/** - SEO components

### From `packages/menu-template/`

- **components/MenuCard.tsx** - Product card UI
- **components/CategoryTabs.tsx** - Category navigation
- **Other UI components** - ~80% reuse

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build production
npm run build

# Type check
npx tsc --noEmit

# Find TODO comments
grep -r "TODO" app/ components/ lib/

# Search translations
grep "menu.title" lib/translations.ts
```

---

## Future Roadmap

### Planned Features

- [ ] Backend API integration
- [ ] Payment processing (Stripe/PayPal)
- [ ] Loyalty program
- [ ] Order history sync
- [ ] Push notifications
- [ ] Offline mode (PWA)

### Migration Tasks

- [ ] Move port from 3004 → 3020
- [ ] Migrate i18n to Module 10 (when 5th language added)
- [ ] Create proper README.md

### Testing & Quality Assurance

**⚠️ To be done after product stabilization**

- [ ] **Test Suite Setup**
  - Configure Jest + React Testing Library
  - Configure Playwright for E2E tests
  - Setup test scripts in package.json

- [ ] **Unit Tests (High Priority)**
  - Cart operations (add/remove/clear)
  - Price formatting & currency conversion
  - Language switching (i18n)
  - Search functionality
  - Customizations logic

- [ ] **Integration Tests (Medium Priority)**
  - DishCard → Cart flow
  - Language selector → UI updates
  - Currency selector → Price updates
  - WelcomeModal navigation
  - WiFi QR generation

- [ ] **E2E Tests (Low Priority)**
  - Complete user journey (browse → customize → cart → checkout)
  - Multi-language navigation
  - Mobile responsiveness

---

## Getting Help

**Within Coffeeshop:**
- Check this file (CLAUDE.md)
- Review `config/coffeeshop.config.ts`
- Check `lib/` for business logic
- **Design System Hub:** Visit `/design-system` for brand guidelines, components, and safety icons
- **Icon Reference:** See `ICON-MAPPING-REFERENCE.md` for complete safety filter icon documentation
- **Component Docs:** See `components/ui/README.md` for detailed component documentation

**Project-Wide:**
- Root `/CLAUDE.md` - Overall architecture
- `/docs/MODULE-REGISTRY.md` - All modules
- `/docs/adr/001-standalone-vertical-templates.md` - Why standalone

---

## Recent Fixes & Updates

### 🔧 Session 2025-11-28: Critical Bug Fixes & UI Improvements

**Overview**: Completed audit and resolved 4 critical issues in coffeeshop app.

---

#### Fix #1: Add to Cart Functionality Broken ✅

**Issue**: "Add to Cart" button did nothing - items were never added to selections/cart.

**Root Cause**:
- `handleAddToCart()` in `app/menu/page.tsx` had `selectionsStore.add()` commented out with misleading message
- `selectionsStore` didn't support extras/customizations (only dish + quantity)
- Active tier is `'pre-ordering'` which has `enableCart: true`, but code was disabled

**Fix Applied**:
1. **Enhanced `selectionsStore`** (`lib/selections-store.ts`):
   ```typescript
   // Added extras field to interface
   export interface SelectionItem {
     id: string; // Unique: dish.id + extras hash
     dish: DishItem;
     quantity: number;
     extras: Extra[]; // ✅ NEW
     addedAt: number;
   }
   
   // Added unique ID generator
   function generateSelectionId(dishId: string, extras: Extra[]): string {
     const extrasIds = extras.map(e => e.id).sort().join(',');
     return `${dishId}-${extrasIds}`;
   }
   
   // Updated methods to accept extras
   add(dish, quantity, extras)
   increment(dish, extras)
   toggle(dish, extras)
   ```

2. **Fixed Menu Handler** (`app/menu/page.tsx` lines 381-390):
   ```typescript
   // BEFORE (broken)
   const handleAddToCart = (...) => {
     console.log('⚠️ Cart is disabled for TIER 1');
     // cartStore.add(dish, quantity, extras); // ❌ COMMENTED
   };
   
   // AFTER (working)
   const handleAddToCart = (...) => {
     selectionsStore.add(dish, quantity, extras); // ✅
     console.log('✅ Added to selections:', ...);
   };
   ```

**Impact**: Full ordering/selections flow now functional for both TIER 1 (notepad) and TIER 2+ (checkout).

---

#### Fix #2: Category "See All" Pages Crashing ✅

**Issue**: Clicking category "See All" arrow resulted in error page: `selectionsStore.getItem is not a function`.

**Root Cause**: Missing `getItem(dishId)` method in `selectionsStore`. Method was called by `useDishCardState` hook but didn't exist.

**Fix Applied** (`lib/selections-store.ts`):
```typescript
getItem(dishId: string): SelectionItem | undefined {
  const current = this.get();
  return current.items.find(item => item.dish.id === dishId);
}
```

**Impact**: Category navigation now works. Users can view all products in a category.

---

#### Fix #3: SelectionsSidebar UI Redesign (Compact Layout) ✅

**Issue**: Large card design wasted space - only 2-3 items visible in viewport. Long orders were hard to scan.

**Old Design**:
- Each item: ~200px height
- Large image (80x80px)
- Full description text
- Large "Modifica" and "Rimuovi" buttons
- Only 2-3 items visible

**New Design** (`components/SelectionsSidebar.tsx`):
- Each item: ~50px height (4x more efficient!)
- Compact single-line layout:
  - Name + Extras (inline, truncated)
  - Quantity badge (circular)
  - Total price
  - Edit icon (pencil, blue)
  - Delete icon (trash, red)
- 6-8 items visible in same space
- Hover effects for better UX

**Impact**: Much better space efficiency. Easier to scan long orders. Professional "list" appearance.

---

#### Fix #4: Edit Flow Z-Index Stacking Issue ✅

**Issue**: Clicking "Edit" in SelectionsSidebar opened ProductBottomSheet UNDER the sidebar (double overlay). After editing, modal closed but sidebar stayed open.

**Root Cause**:
- **SelectionsSidebar**: `z-[9998]` (backdrop) / `z-[9999]` (content)
- **ProductBottomSheet**: `z-40` (backdrop) / `z-50` (content) ❌ TOO LOW!
- Even when closing sidebar before opening product, modal rendered under closing animation

**Fix Applied**:
1. **Close sidebar before opening product** (`app/menu/page.tsx`):
   ```typescript
   onEditProduct={(dish) => {
     setShowSelectionsSidebar(false); // Close first
     setSelectedProduct(dish);         // Then open
   }}
   ```

2. **Increase ProductBottomSheet z-index** (`components/ProductBottomSheet.tsx`):
   ```typescript
   // Backdrop: z-40 → z-[10000]
   // Content:  z-50 → z-[10001]
   ```

**Impact**: Correct modal stacking. Edit flow now smooth: sidebar closes → product modal opens on top → user edits → modal closes → returns to menu.

---

### Testing & Validation

All fixes tested and confirmed working by user:
- ✅ Add to Cart with extras/customizations
- ✅ Category "See All" navigation
- ✅ Compact selections list UI
- ✅ Edit flow with proper modal layering

### Documentation

- **Audit Report**: `/audit_report.md` (artifacts)
- **Walkthrough**: `/walkthrough.md` (artifacts)
- **Task Tracking**: `/task.md` (artifacts)

---

### 🔧 Session 2025-11-29: PWA Order Submission + Supabase Integration

**Overview**: Added complete order submission flow with Supabase backend integration.

---

#### Feature #1: Order Submission in SelectionsSidebar ✅

**What**: Unified order submission directly from the Selections list.

**Implementation**:
- Added "Invia Ordine" button in `SelectionsSidebar.tsx` (tier-gated via `enableCart`)
- Added customer notes textarea for special requests
- Order success state displays order code (e.g., "A-002")
- "Traccia Ordine" button navigates to orders page

**Key Code** (`components/SelectionsSidebar.tsx`):
```typescript
const isOrderingEnabled = coffeeshopConfig.features.enableCart;

const handlePlaceOrder = async () => {
  const result = await submitOrder({
    items,
    total: calculateTotal(),
    table_context: { ... },
    customer_notes: customerNotes || undefined,
  });
  setSubmittedOrder(result);
  selectionsStore.clear();
};
```

---

#### Feature #2: Supabase Order Service ✅

**What**: Full order management with Supabase backend + localStorage fallback.

**Files Created**:
- `lib/order-service.ts` - Order submission, status tracking, realtime subscriptions
- `lib/supabase.ts` - Supabase client with session management

**Features**:
- Auto-generated order codes (A-001, A-002, etc.)
- Session-based anonymous ordering
- Realtime order status updates via Supabase subscriptions
- localStorage fallback when Supabase not configured

**Key Code** (`lib/order-service.ts`):
```typescript
export async function submitOrder(orderData: SubmitOrderData): Promise<SubmittedOrder> {
  if (isSupabaseConfigured && supabase) {
    return submitToSupabase(orderData);
  }
  return submitToLocalStorage(orderData);
}

export function subscribeToOrderStatus(
  orderId: string,
  onStatusChange: (status: OrderStatus) => void
): () => void {
  // Realtime subscription via Supabase channels
}
```

---

#### Feature #3: Orders Page with Session History ✅

**What**: View order history for current session with realtime status updates.

**Implementation**:
- `getSessionOrders()` fetches orders by session_id
- Displays order code, status, items, total
- Time-ago formatting (e.g., "5 min fa")
- Expandable order details

---

#### Database Schema: Standalone Orders ✅

**File**: `shared/database/schema/002-orders-standalone.sql`

**Tables**:
- `orders` - Main order data with auto-generated order_code
- `order_items` - Line items with extras JSON
- `order_status_history` - Audit trail of status changes

**Key Features**:
- Auto-increment order_number per merchant (resets daily)
- Order code format: Letter + Number (A-001, B-050, etc.)
- Auto-set timestamps on status changes (confirmed_at, prepared_at, etc.)
- PostgreSQL triggers for all auto-computation

---

#### Tier Integration ✅

**Tier-Gated Features**:
- `digital-menu` (TIER 1): Selections as notepad only, no order submission
- `pre-ordering` (TIER 2): Full ordering enabled
- `full-suite` (TIER 3): All features including delivery

**How It Works**:
```typescript
// In coffeeshop.config.ts
const ACTIVE_TIER: TierLevel = 'pre-ordering';

// In SelectionsSidebar.tsx
const isOrderingEnabled = coffeeshopConfig.features.enableCart;
{isOrderingEnabled && (
  <button onClick={handlePlaceOrder}>Invia Ordine</button>
)}
```

---

#### Testing Checklist

- ✅ Order submission to Supabase
- ✅ Auto-generated order code display
- ✅ Order success state with "Traccia Ordine" button
- ✅ Orders page with session history
- ✅ Correct timestamp formatting
- ✅ localStorage fallback when Supabase not configured
- ✅ Tier gating (button hidden for TIER 1)

---

**This file provides Coffeeshop-specific context for Claude Code sessions.**

**Last Updated:** 2025-11-29
