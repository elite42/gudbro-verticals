# Sistema Customizzazioni Merchant

> **Guida completa** al sistema di personalizzazioni per merchant (colori, loghi, temi, sezioni PWA, customizzazioni prodotto)

---

## Architettura

Il sistema è stratificato su 3 livelli:

```
Database (brands, site_sections, product customizations)
    ↓
API Routes (/api/brands, /api/partner-branding)
    ↓
Frontend (Context + Hooks + Componenti)
```

---

## 1. Brand Customization (Colori & Logo)

### Database: Tabella `brands`

**Migrazione:** `shared/database/migrations/schema/012-multi-tenant-architecture.sql`

```sql
CREATE TABLE brands (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE,
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#000000',
  secondary_color VARCHAR(7),
  is_active BOOLEAN DEFAULT true
);
```

### API: `/api/brands`

**Path:** `apps/backoffice/app/api/brands/route.ts`

```typescript
// Aggiornare colore brand
PATCH /api/brands
Body: {
  id: 'brand-uuid',
  primaryColor: '#EF4444',
  logoUrl: 'https://...'
}
```

### Frontend Hook: `useBrandTheme`

**Path:** `apps/coffeeshop/frontend/lib/hooks/useBrandTheme.ts`

```typescript
import { useBrandTheme, generatePalette, getBrandClasses } from '@/lib/hooks/useBrandTheme'

// Applica colori brand come CSS variables
useBrandTheme(merchantBranding)

// Genera palette da colore primario
const palette = generatePalette('#DC2626')
// → { 50: '#FEF2F2', 100: '#FEE2E2', ..., 900: '#7F1D1D' }

// Ottieni classi Tailwind brand-aware
const classes = getBrandClasses(branding)
// → { primaryBg: 'bg-brand-500', primaryText: 'text-brand-600', ... }
```

---

## 2. Theme System (Light/Dark)

### Definizioni Tema

**Path:** `apps/coffeeshop/frontend/lib/theme/theme-definitions.ts`

```typescript
interface Theme {
  mode: 'light' | 'dark'
  colors: {
    background: { primary, secondary, tertiary, elevated }
    text: { primary, secondary, tertiary, inverse }
    brand: { primary, primaryHover, secondary, accent }
    // ...
  }
}

export const lightTheme: Theme = { ... }
export const darkTheme: Theme = { ... }
```

### Theme Context & Hook

**Path:** `apps/coffeeshop/frontend/lib/theme/theme-context.tsx`

```typescript
import { useTheme } from '@/lib/theme/theme-context'

function MyComponent() {
  const { theme, themeMode, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme}>
      {themeMode === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
  )
}
```

### CSS Variables Generate

Il sistema genera automaticamente CSS variables:

```css
:root {
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-brand-primary: #DC2626;
  --color-brand-500: #EF4444;
  --brand-primary-rgb: 220, 38, 38;  /* Per opacity variants */
}
```

---

## 3. Site Sections (Sezioni PWA Personalizzate)

### Database: Tabella `site_sections`

**Migrazione:** `shared/database/migrations/schema/068-site-customization.sql`

```sql
CREATE TABLE site_sections (
    id UUID PRIMARY KEY,
    location_id UUID NOT NULL,
    section_type TEXT CHECK (section_type IN (
        'hero', 'about', 'gallery', 'hours',
        'contact', 'social', 'reviews'
    )),
    is_enabled BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    content JSONB NOT NULL,
    style_overrides JSONB,
    published_at TIMESTAMPTZ
);
```

### Sezioni Disponibili

| Tipo | Descrizione | Content JSONB |
|------|-------------|---------------|
| `hero` | Banner principale | title, subtitle, image_url, cta_text |
| `about` | Chi siamo | text, image_url |
| `gallery` | Galleria foto | images: [{url, caption}] |
| `hours` | Orari apertura | schedule: {mon, tue, ...} |
| `contact` | Info contatti | phone, email, address |
| `social` | Link social | facebook, instagram, tiktok |
| `reviews` | Recensioni | testimonials: [{name, text, rating}] |

---

## 4. Product Customizations (Database-Driven)

### Types

**Path:** `shared/database/_system/types/index.ts`

```typescript
type CustomizationType = 'radio' | 'checkbox' | 'quantity' | 'text' | 'number'

interface ProductCustomization {
  id: string
  type: CustomizationType
  name: MultiLangText              // { en, it, vi }
  required: boolean
  min_selections?: number          // Per checkbox
  max_selections?: number
  display_order?: number
  display_style?: 'list' | 'grid' | 'buttons' | 'dropdown'
  icon?: string                    // Emoji
  age_restricted?: number          // 18+
  requires_license?: 'alcohol' | 'tobacco'
  options: CustomizationOption[]
}

interface CustomizationOption {
  id: string
  name: MultiLangText
  price_modifier: number           // +5000, -2000, 0
  is_default: boolean
  available?: boolean
}
```

### Esempio: Customizzazioni Espresso

**Path:** `shared/database/_system/customizations/espresso-customizations.ts`

```typescript
export const espressoMilkCustomization: ProductCustomization = {
  id: 'espresso-milk',
  type: 'radio',
  name: { en: 'Milk', it: 'Latte', vi: 'Sữa' },
  required: false,
  display_order: 5,
  display_style: 'list',
  icon: '🥛',
  options: [
    { id: 'no-milk', name: {...}, price_modifier: 0, is_default: true },
    { id: 'cow-milk', name: {...}, price_modifier: 5000 },
    { id: 'oat-milk', name: {...}, price_modifier: 7000 },
    { id: 'almond-milk', name: {...}, price_modifier: 8000 }
  ]
}

export const espressoLiquorCustomization: ProductCustomization = {
  id: 'espresso-liquor',
  type: 'radio',
  requires_license: 'alcohol',
  age_restricted: 18,
  options: [
    { id: 'grappa', price_modifier: 25000 },
    { id: 'baileys', price_modifier: 30000 }
  ]
}
```

### Frontend: Renderer Dinamico

**Path:** `apps/coffeeshop/frontend/components/customizations/`

```typescript
import { DynamicCustomizationRenderer } from '@/components/customizations'

function ProductSheet({ product }) {
  const [state, setState] = useState({})

  return (
    <DynamicCustomizationRenderer
      customizations={product.customizations}
      state={state}
      onChange={(id, value) => setState(prev => ({ ...prev, [id]: value }))}
      language="it"
    />
  )
}

// Validazione
import { validateCustomizations } from '@/components/customizations'
const { isValid, errors } = validateCustomizations(customizations, state)

// Calcolo prezzo
import { calculateCustomizationPrice } from '@/components/customizations'
const extraPrice = calculateCustomizationPrice(customizations, state)
```

### Componenti Disponibili

| Componente | Tipo | Uso |
|------------|------|-----|
| `RadioGroupCustomization` | radio | Scelta singola (size, milk) |
| `CheckboxGroupCustomization` | checkbox | Scelta multipla (toppings) |
| `QuantityCustomization` | quantity | Input numerico (shots) |
| `TextInputCustomization` | text | Testo libero (note) |

---

## 5. White-Label (Partner Branding)

### API: `/api/partner-branding`

**Path:** `apps/backoffice/app/api/partner-branding/route.ts`

Legge headers impostati dal middleware:

```typescript
GET /api/partner-branding

Response: {
  partnerId: string | null
  partnerName: string | null
  logoUrl: string | null
  primaryColor: string
  hideGudbroBranding: boolean
  isWhiteLabel: boolean
}
```

### Context: `usePartnerBranding`

**Path:** `apps/backoffice/lib/contexts/PartnerBrandingContext.tsx`

```typescript
import { usePartnerBranding } from '@/lib/contexts/PartnerBrandingContext'

function Header() {
  const { isWhiteLabel, logoUrl, partnerName, primaryColor } = usePartnerBranding()

  if (isWhiteLabel) {
    return <img src={logoUrl} alt={partnerName} />
  }
  return <GudbroLogo />
}
```

---

## 6. Flusso Completo

```
MERCHANT BACKOFFICE
  │
  ├── Modifica colore primario
  │   └── PATCH /api/brands { primaryColor: '#EF4444' }
  │
  ├── Upload logo
  │   └── PATCH /api/brands { logoUrl: 'https://...' }
  │
  └── Configura sezioni PWA
      └── INSERT/UPDATE site_sections { section_type, content }

      ↓

DATABASE
  │
  ├── brands.primary_color = '#EF4444'
  ├── brands.logo_url = 'https://...'
  └── site_sections (hero, about, gallery, ...)

      ↓

PWA CUSTOMER
  │
  ├── useBrandTheme() → Applica CSS variables
  ├── useTheme() → Light/Dark mode
  └── DynamicCustomizationRenderer → Customizzazioni prodotto
```

---

## 7. File Chiave

| Area | File | Descrizione |
|------|------|-------------|
| **Types** | `shared/database/_system/types/index.ts` | ProductCustomization, CustomizationOption |
| **Theme** | `apps/coffeeshop/frontend/lib/theme/` | theme-definitions, theme-context, theme-store |
| **Brand** | `apps/coffeeshop/frontend/lib/hooks/useBrandTheme.ts` | Palette generation, CSS variables |
| **API** | `apps/backoffice/app/api/brands/route.ts` | CRUD brands |
| **Renderer** | `apps/coffeeshop/frontend/components/customizations/` | Dynamic customization UI |
| **White-label** | `apps/backoffice/lib/contexts/PartnerBrandingContext.tsx` | Partner branding |

---

## 8. Aggiungere Nuove Customizzazioni

### Step 1: Definire customizzazione

```typescript
// shared/database/_system/customizations/my-product.ts
export const myCustomization: ProductCustomization = {
  id: 'my-custom',
  type: 'radio',
  name: { en: 'Choose', it: 'Scegli' },
  required: true,
  options: [
    { id: 'opt-1', name: { en: 'Option 1' }, price_modifier: 0, is_default: true },
    { id: 'opt-2', name: { en: 'Option 2' }, price_modifier: 5000 }
  ]
}
```

### Step 2: Aggiungere al prodotto

```typescript
export const myProduct: Product = {
  id: 'PROD_XXX',
  customizations: [myCustomization]
}
```

### Step 3: Frontend renderizza automaticamente

Il `DynamicCustomizationRenderer` gestisce tutto in base al `type`.

---

**Version:** 1.0
**Last Updated:** 2026-01-26
