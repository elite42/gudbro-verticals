# Coffeeshop PWA - Claude Context

**App:** Digital Menu PWA for restaurants
**Port:** 3004
**URL:** gudbro-coffeeshop-pwa.vercel.app
**Status:** Production Ready

---

## Quick Start

```bash
cd apps/coffeeshop/frontend
npm run dev  # localhost:3004
```

## Tech Stack

- Next.js 14 App Router + React 18
- Tailwind CSS + CVA (Class Variance Authority)
- TypeScript
- Supabase (PostgreSQL)
- localStorage (cart persistence)

## Project Structure

```
apps/coffeeshop/frontend/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── menu/                # Menu browsing
│   ├── cart/                # Shopping cart
│   ├── orders/              # Order history
│   ├── account/             # User account
│   └── design-system/       # Internal Design Hub
├── components/
│   ├── ui/                  # Design System (Button, Card, Input, Badge, Alert)
│   ├── HomeHeader.tsx
│   ├── MenuHeader.tsx
│   ├── CartSidebar.tsx
│   └── customizations/      # Size, Sugar, Ice, Milk selectors
├── lib/
│   ├── translations.ts      # i18n strings (EN/VI/IT)
│   ├── use-translation.ts   # i18n hook
│   ├── cart-store.ts        # Cart state
│   ├── order-service.ts     # Supabase order submission
│   └── supabase.ts          # DB client
└── config/
    └── coffeeshop.config.ts # App configuration
```

## Key Features

1. **Multi-language** - EN, VI (Vietnamese), IT (Italian)
2. **Shopping Cart** - Persistent via localStorage
3. **Product Customization** - Size, sugar, ice, milk, extras
4. **Table Context** - QR scan identifies table/venue
5. **Order Submission** - Supabase backend with order codes (A-001)
6. **Design System** - 5 components with CVA variants

## Configuration

```typescript
// config/coffeeshop.config.ts
export const coffeeshopConfig = {
  name: 'ROOTS Coffee & Kitchen',
  supportedLanguages: ['en', 'vi', 'it'],
  defaultLanguage: 'en',
  currency: { code: 'USD', symbol: '$' },
  features: {
    cart: true,
    customization: true,
    payments: false  // Planned
  }
}
```

## i18n Usage

```typescript
import { useTranslation } from '@/lib/use-translation';

function Component() {
  const { t, language, setLanguage } = useTranslation();
  return <h1>{t.menu.title}</h1>;
}
```

## Design System

```typescript
import { Button, Card, Input, Badge, Alert } from '@/components/ui';

<Button variant="primary" size="lg">Confirm</Button>
<Card variant="elevated" padding="lg">...</Card>
<Badge variant="success">Available</Badge>
```

**Variants:**
- Button: 6 variants (primary, secondary, danger, ghost, link, outline)
- Card: 5 variants (default, elevated, interactive, selected, ghost)
- Badge: 8 variants
- Alert: 5 variants

**Documentation:** `components/ui/README.md`

## Cart Store

```typescript
import { useCartStore } from '@/lib/cart-store';

const { addItem, removeItem, clearCart, items } = useCartStore();
addItem({
  id: 'coffee-1',
  name: 'Espresso',
  price: 3.50,
  customizations: { size: 'medium' }
});
```

## Order Service

```typescript
import { submitOrder } from '@/lib/order-service';

const result = await submitOrder({
  items,
  total: 25.00,
  table_context: { table_number: '5' },
  customer_notes: 'No ice please'
});
// Returns: { order_id, order_code: 'A-001' }
```

## Design System Hub

Internal tool at `/design-system`:
- `/design-system/brand` - Colors, typography
- `/design-system/components` - Component showcase
- `/design-system/safety` - 46 allergen/dietary icons
- `/design-system/products` - Product library

## Dependencies

- **Shared safety filters:** `@/../../shared/database/safety-filters.ts`
- **Product data:** Connected to main database via Supabase

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
```

---

**Last Updated:** 2025-12-16
