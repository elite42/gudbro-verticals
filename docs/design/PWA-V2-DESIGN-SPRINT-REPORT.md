# GUDBRO PWA v2 - Design Sprint Report

> **Tipo:** Design Guidelines & Implementation Spec
> **Data:** 2026-01-24
> **Team:** UX Research + Product + Engineering
> **Metodo:** Design Thinking Sprint (Empathize → Define → Ideate → Prototype → Test)

---

## Visual References

📁 **Screenshot Library:** `docs/design/references/`

Prima di implementare qualsiasi componente, consulta gli screenshot di riferimento:

| Screen | Screenshot Reference |
|--------|---------------------|
| Homepage | `meandu-16-homepage-categories-grid-hero.png` |
| Product List | `meandu-01-product-list-desserts-bingsu.png`, `meandu-08-product-list-mains-horizontal-tabs.png` |
| Product Detail | `meandu-02-product-detail-dietary-tags-GFO-VG.png`, `meandu-04-product-detail-steak-modifiers-cooking.png` |
| Modifiers | `meandu-09-product-detail-burger-extras-checkboxes.png`, `meandu-10-modifiers-extras-upsell-fries.png` |
| Dietary Filter | `meandu-06-filter-modal-dietaries.png` |
| Cart | `meandu-13-cart-checkout-loyalty-redeem.png`, `meandu-17-cart-voucher-discount-code.png` |
| Payment | `meandu-14-payment-methods-applepay-card.png` |
| Confirmation | `meandu-15-order-confirmation-loyalty-earned.png` |

> **Workflow:** Usa `Read` tool per visualizzare gli screenshot prima di implementare un componente.

---

## Risorse Già Disponibili nel Progetto

⚠️ **IMPORTANTE:** Non cercare/scaricare icon packs esterni. Usa queste librerie già installate:

| Package | Import | Uso |
|---------|--------|-----|
| `@phosphor-icons/react` | `import { Icon } from '@phosphor-icons/react'` | **7,000+ icone** - UI generale, allergens, dietary |
| `lucide-react` | `import { Icon } from 'lucide-react'` | **1,000+ icone** - UI componenti shadcn |
| `@web3icons/react` | `import { Bitcoin, Ethereum } from '@web3icons/react'` | **Crypto icons** - BTC, ETH, USDC, USDT |
| `react-svg-credit-card-payment-icons` | `import { Visa, Mastercard } from 'react-svg-credit-card-payment-icons'` | **Payment icons** - Carte di credito |

### Icone Consigliate per Feature GUDBRO

```tsx
// Allergens - usa Phosphor con colori
import { Warning, Leaf, Fish, Egg, Grains, Drop } from '@phosphor-icons/react'

// Dietary
import { Plant, Carrot, Fire } from '@phosphor-icons/react' // vegan, vegetarian, spicy

// Crypto payments
import { Bitcoin, Ethereum, Tether, UsdCoin } from '@web3icons/react'

// General UI - usa Lucide (compatibile con shadcn)
import { ShoppingCart, User, Search, Filter, Star } from 'lucide-react'
```

### Per Allergeni Specifici (30 totali)

Crea componenti custom con Phosphor + colore:
```tsx
// Esempio: EU 14 allergens
const allergenIcons = {
  gluten: { icon: Grains, color: '#EAB308' },      // giallo
  crustaceans: { icon: Fish, color: '#F97316' },   // arancione
  eggs: { icon: Egg, color: '#FBBF24' },           // ambra
  fish: { icon: Fish, color: '#3B82F6' },          // blu
  peanuts: { icon: Nut, color: '#A16207' },        // marrone
  soy: { icon: Leaf, color: '#84CC16' },           // verde lime
  milk: { icon: Drop, color: '#60A5FA' },          // azzurro
  // ... altri
}
```

---

## Executive Summary

Questo documento guida l'implementazione del frontend PWA v2 di GUDBRO, basandosi su:

1. **Competitive Analysis** di me&u, Menuviel, LeggieMenu, MenuDigitale, MenuTigr
2. **Gap Analysis** tra backend esistente e UI attuale
3. **Design Principles** da PRODUCT.md
4. **User Research** dalle personas definite

**Obiettivo:** Portare l'UI/UX al livello dei migliori competitor (me&u), esponendo al contempo i **differenziatori unici** di GUDBRO che i competitor NON hanno.

📄 **Report Completo:** `docs/design/references/COMPETITOR-ANALYSIS.md`

---

## 1. COMPETITIVE ANALYSIS

### Sintesi Competitor Analizzati (Live Testing 2026-01-24)

| Competitor | URL | Punti Forza | Best Practice per GUDBRO |
|------------|-----|-------------|--------------------------|
| **me&u** | mryum.com | UX premium, loyalty, dietary tags | ✅ Reference principale UI |
| **Menuviel** | menuviel.com | Calorie, prep time, allergen icons colorati, likes | ✅ Nutritional info |
| **LeggieMenu** | leggimenu.it | Allergeni EU testuali, badge "Più scelto" | ✅ Compliance EU |
| **MenuDigitale** | menudigitale.io | **LEGENDA completa** (8 dietary + 14 allergeni) | ✅ Legenda allergeni |
| **MenuTigr** | menutigr.com | Search, prep time, order type | ⚠️ Pattern basilari |

### Pattern UI Chiave Identificati

**Must Have (P0):**
- Category pills scrollabili orizzontali
- Product card: immagine + nome + prezzo + dietary icons
- Badge Popular/New
- CTA verde #22C55E full-width sticky
- Allergen display (icone + testo)
- Prep time con icona orologio

**Should Have (P1):**
- Calorie display ("XXX Cal")
- Likes/popularity counter
- Promo banner contestuale (Happy Hour)
- Legenda accessibile da nav
- Search prominente

**GUDBRO Differenziatori (non presenti nei competitor):**
- 30 allergeni (vs 14 EU) - Korea, Japan, custom
- Crypto payments badges
- 4-tier Loyalty con progress
- 15+ lingue auto-tradotte
- AI suggestions
- Bill splitting
- Social login asiatici

### 1.1 me&u (Mr Yum) - UI Reference Principale

me&u è il reference principale per l'UI del menu digitale. Dall'analisi degli screenshot reali dell'app:

#### Homepage Menu
```
┌─────────────────────────────────────┐
│ [←]  The Local        ⭐ 37,000  [≡] │  ← Header verde scuro + punti loyalty
├─────────────────────────────────────┤
│ ✨ Mr Yum is now me&u   Read more   │  ← Banner announcement (opzionale)
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      [HERO IMAGE RISTORANTE]    │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Table 5                  [Change]  │  ← Table indicator
├─────────────────────────────────────┤
│ ┌───────────────┐ ┌───────────────┐ │
│ │ 👥 Start      │ │ 🔄 Reorder    │ │  ← Quick actions
│ │ group order   │ │ drinks        │ │
│ └───────────────┘ └───────────────┘ │
├─────────────────────────────────────┤
│ ┌───────────┐ ┌───────────┐        │
│ │  [IMG]    │ │  [IMG]    │        │  ← Category grid 2x2
│ │ Breakfast │ │  Lunch    │        │     con foto grandi
│ └───────────┘ └───────────┘        │
│ ┌───────────┐ ┌───────────┐        │
│ │  [IMG]    │ │  [IMG]    │        │
│ │ Cocktails │ │ All Day   │        │
│ └───────────┘ └───────────┘        │
└─────────────────────────────────────┘
```

#### Product List (Category View)
```
┌─────────────────────────────────────┐
│ [←] Homm Dessert at Heart...  🔍 ⚙️│  ← Header con search e filtri
├─────────────────────────────────────┤
│ 🍰 Desserts and Drinks ▼           │  ← Category dropdown
│ [Bingsu] [Brûlée] [Drinks]         │  ← Subcategory pills (scroll)
├─────────────────────────────────────┤
│ Thai style shaved snowflakes...    │  ← Category description
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │[IMG]│  Popular                │ │  ← Badge viola
│ │ │     │  Thai Tea Bingsu        │ │  ← Nome bold
│ │ │     │  Thai tea based snow... │ │  ← Descrizione troncata
│ │ └─────┘  $26.80                 │ │  ← Prezzo
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ┌─────┐                         │ │
│ │ │[IMG]│  Salted Egg Coconut     │ │
│ │ │     │  Bingsu                 │ │
│ │ │     │  Authentic Thai coco... │ │
│ │ └─────┘  $26.80                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│         [ View order ]              │  ← Footer sticky
└─────────────────────────────────────┘
```

#### Product Detail
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │[←]    [HERO IMAGE PRODOTTO]     │ │  ← ~40% schermo
│ │                                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Popular                            │  ← Badge (se presente)
│                                     │
│  Seasonal Avocado                   │  ← Nome 24px bold
│                                     │
│  heirloom tomato, avocado,          │  ← Descrizione completa
│  whipped goats cheese, basil        │
│  pesto, poached egg, toasted        │
│  Turkish bread                      │
│                                     │
│  $25.00                 [GFO, VG]   │  ← Prezzo + dietary pills
├─────────────────────────────────────┤
│  Sides?                             │  ← Sezione modifiers
│  Max 10                             │
│                                     │
│  ☐ Extra Scrambled Egg        +$3  │
│  ☐ Bacon                      +$4  │
│  ☐ Avocado                    +$5  │
├─────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────┐ │
│ │  [−] 1 [+]  │ │  Add to order   │ │  ← Footer sticky
│ └─────────────┘ └─────────────────┘ │
└─────────────────────────────────────┘
```

#### Cart/Checkout
```
┌─────────────────────────────────────┐
│ [←]           Dine-in               │  ← Header verde
├─────────────────────────────────────┤
│  Table number              Table 15 │  ← Badge tavolo
├─────────────────────────────────────┤
│  Hot Chips                          │
│  1x Tomato Sauce           (−) 1 (+)│  ← Quantity selector
│  $12.00                             │
│                                     │
│  Cheese Burger                      │
│  1x Bacon                  (−) 1 (+)│
│  $19.00                             │
│                                     │
│              [ + Add items ]        │  ← Torna al menu
├─────────────────────────────────────┤
│  Redeem points                      │
│  ┌─────────────────────────────────┐│
│  │ ⭐ 31,000 points     [Claim]   ││  ← Loyalty integration
│  │    Claim for $31.00            ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  ◇ Add voucher or discount code  > │  ← Voucher row
├─────────────────────────────────────┤
│  Subtotal                   $31.00  │
│  Total                      $31.00  │
├─────────────────────────────────────┤
│         [ Continue ]                │  ← CTA verde
└─────────────────────────────────────┘
```

#### Payment
```
┌─────────────────────────────────────┐
│ [←]           Dine-in               │
├─────────────────────────────────────┤
│  Your details                       │
│  Need a receipt? Enter email below  │
│                                     │
│  Name                               │
│  ┌─────────────────────────────────┐│
│  │ Ryan                            ││
│  └─────────────────────────────────┘│
│                                     │
│  Email (optional)                   │
│  ┌─────────────────────────────────┐│
│  │ ryan@example.com                ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  Select your payment method         │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ [Pay] Apple Pay            ◉   ││  ← Selected (verde)
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ [MC] •••• 8831             ○   ││
│  │     7/2025                     ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  Subtotal                   $31.00  │
│  Total                      $31.00  │
├─────────────────────────────────────┤
│           [ Pay now ]               │  ← CTA verde
└─────────────────────────────────────┘
```

#### Order Confirmation
```
┌─────────────────────────────────────┐
│ ┌─────────────────────────────────┐ │
│ │    [HERO IMAGE RISTORANTE]      │ │
│ │           ┌───┐                 │ │
│ │           │ ✓ │                 │ │  ← Checkmark in cerchio
│ │           └───┘                 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│       Thank you, Ryan!              │  ← Personalizzato
│                                     │
│  We sent your receipt to            │
│  ryan@example.com                   │
│                                     │
│  [✏️ Edit email]  [📄 View receipt] │  ← Quick actions
├─────────────────────────────────────┤
│  Your loyalty                       │
│  ┌─────────────────────────────────┐│
│  │ ⭐ You've earned 310 loyalty   ││
│  │    points with this purchase.  ││
│  │                                ││
│  │    Your points can be redeemed ││
│  │    at checkout.                ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  Your order                         │
│  📋 Order for Table 15      $31.00  │
├─────────────────────────────────────┤
│        [ Back to menu ]             │  ← CTA verde
└─────────────────────────────────────┘
```

### 1.2 Sunday App - Payment Reference

Sunday è focalizzato sul **pagamento**, non sul menu. Utile come reference per:
- Bill view con lista items
- Split payment flow
- Tip selection

```
┌─────────────────────────────────────┐
│         DEMO ENVIRONMENT            │  ← Banner arancione
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │    [HERO IMAGE RISTORANTE]      │ │
│ │         ┌───────┐               │ │
│ │         │UPTOWN │               │ │  ← Logo venue in cerchio
│ │         └───────┘               │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│  Tavolo 9971                        │  ← Table indicator piccolo
│                                     │
│  Resta da pagare          176,00 €  │  ← Totale grande
├─────────────────────────────────────┤
│  1  Crème brûlée              7,00 €│
│  3  Daurade        18,00 €   54,00 €│  ← Qty × Unit = Total
│  3  Tarte aux ch...23,00 €   69,00 €│
│  2  Verre de vin... 4,50 €    9,00 €│
│  3  Mozzarella St...8,00 €   24,00 €│
│  4  Frites de Pa... 6,50 €   13,00 €│
├─────────────────────────────────────┤
│  Paga in modo sicuro con 🔒 sunday  │
│                                     │
│  termini di utilizzo | privacy      │
├─────────────────────────────────────┤
│    [ Pagare o dividere il conto ]   │  ← CTA arancione
└─────────────────────────────────────┘
```

### 1.3 Competitive Gap Analysis

| Feature | Sunday | me&u | GUDBRO Backend | GUDBRO PWA v2 Needed |
|---------|--------|------|----------------|---------------------|
| Menu con foto | ❌ | ✅ | ✅ | 🔨 Migliorare layout |
| Category grid | ❌ | ✅ | ✅ | 🔨 Implementare |
| Product detail | ❌ | ✅ | ✅ | 🔨 Redesign |
| Dietary filters | ❌ | Basic | ✅ 30 allergens | 🔨 Esporre UI |
| Modifiers | ❌ | ✅ | ✅ | 🔨 Implementare |
| Loyalty points | ❌ | ✅ | ✅ 4 tier | 🔨 Integrare |
| Bill splitting | ✅ | ✅ | ✅ | 🔨 Implementare |
| Crypto payments | ❌ | ❌ | ✅ | 🔨 **DIFFERENZIATORE** |
| 30 allergeni | ❌ | ❌ | ✅ | 🔨 **DIFFERENZIATORE** |
| AI suggestions | ❌ | ❌ | ✅ | 🔨 **DIFFERENZIATORE** |
| Multi-lingua | ❌ | ❌ | ✅ 15+ | 🔨 **DIFFERENZIATORE** |

---

## 2. DESIGN PRINCIPLES (da PRODUCT.md)

### 2.1 Principi Operativi

| Principio | Applicazione PWA |
|-----------|------------------|
| **3-Second Rule** | Ogni azione core < 3 secondi |
| **Thumb-Friendly** | Bottoni 44px+, bottom navigation |
| **Works During Rush** | UI minimale, no distrazioni |
| **Mobile-First** | 80%+ traffico mobile |
| **Progressive Disclosure** | Info base in card, dettagli in bottom sheet |

### 2.2 Principi UX

| Principio | Implementazione |
|-----------|-----------------|
| **Don't Make Me Think** | Labels chiari, icone universali |
| **Recognition > Recall** | Mostra opzioni, non chiedere di ricordare |
| **Error Prevention** | Conferme smart, undo facile |
| **Consistency** | Stessi pattern ovunque |

### 2.3 Metriche Target

| Metrica | Target |
|---------|--------|
| Time to First Order | < 60 secondi |
| Task Completion Rate | > 90% |
| Error Rate | < 5% |

---

## 3. USER PERSONAS (Target Prioritari)

### 3.1 Il Turista (PRIMARIO)
- **Comportamento:** Scansiona QR, cerca traduzione, foto-friendly
- **Pain points:** Menu solo in italiano, info allergeni vaghe
- **Soluzione GUDBRO:** 15+ lingue auto, 30 allergeni, foto prodotti

### 3.2 Il Cliente con Restrizioni Alimentari (PRIMARIO)
- **Comportamento:** Cerca disperatamente filtri dietetici
- **Pain points:** Informazioni vaghe, "chiedi al cameriere"
- **Soluzione GUDBRO:** 12 dietary flags, 30 allergeni, filtri prominenti

### 3.3 Il Cliente Abituale (SECONDARIO)
- **Comportamento:** Velocità è chiave, vuole riconoscimento
- **Pain points:** Ripartire da zero ogni volta
- **Soluzione GUDBRO:** Loyalty 4 tier, storico ordini, preferenze salvate

---

## 4. INFORMATION ARCHITECTURE

### 4.1 Sitemap PWA

```
Home (/)
├── Menu (/menu)
│   ├── Category View (/menu?category=X)
│   └── Product Detail (Bottom Sheet)
├── Cart (/cart)
│   ├── Edit Item (Bottom Sheet)
│   └── Redeem Points (Bottom Sheet)
├── Checkout (/checkout)
│   ├── Payment Method Selection
│   └── Tip Selection (se abilitato)
├── Order Confirmation (/order/[id])
├── Orders History (/orders)
├── Account (/account)
│   ├── Profile
│   ├── Preferences (Dietary)
│   ├── Saved Payments
│   └── Loyalty Status
├── Offers (/offers)
└── Events (/events)
```

### 4.2 Navigation Pattern

```
┌─────────────────────────────────────┐
│                                     │
│            [CONTENT]                │
│                                     │
├─────────────────────────────────────┤
│  🏠      📋      🛒      👤        │  ← Bottom Nav (4 items max)
│  Home    Menu    Cart   Account    │
└─────────────────────────────────────┘
```

**Regole Bottom Nav:**
- Max 4 items (Fitts's Law)
- Icone + label sempre visibili
- Cart con badge counter
- Active state verde (#22C55E)

---

## 5. COMPONENT SPECIFICATIONS

### 5.1 Design Tokens

```css
/* =================================
   GUDBRO PWA v2 - Design Tokens
   ================================= */

/* Colors - Primary */
--color-primary: #22C55E;           /* Green 500 - CTA, active states */
--color-primary-hover: #16A34A;     /* Green 600 */
--color-primary-light: #DCFCE7;     /* Green 100 - backgrounds */

/* Colors - Semantic */
--color-price: #B45309;             /* Amber 700 - prezzi (light mode) */
--color-price-dark: #FBBF24;        /* Amber 400 - prezzi (dark mode) */
--color-error: #DC2626;             /* Red 600 */
--color-warning: #F59E0B;           /* Amber 500 */
--color-success: #22C55E;           /* Green 500 */

/* Colors - Neutral */
--color-text-primary: #1C1917;      /* Stone 900 */
--color-text-secondary: #78716C;    /* Stone 500 */
--color-text-tertiary: #A8A29E;     /* Stone 400 */
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F5F5F4;      /* Stone 100 */
--color-border: #E7E5E4;            /* Stone 200 */

/* Typography */
--font-family: 'Inter', system-ui, -apple-system, sans-serif;
--font-size-xs: 0.75rem;            /* 12px */
--font-size-sm: 0.875rem;           /* 14px */
--font-size-base: 1rem;             /* 16px */
--font-size-lg: 1.125rem;           /* 18px */
--font-size-xl: 1.25rem;            /* 20px */
--font-size-2xl: 1.5rem;            /* 24px */
--font-size-3xl: 1.875rem;          /* 30px */

/* Spacing (8px base) */
--space-1: 0.25rem;                 /* 4px */
--space-2: 0.5rem;                  /* 8px */
--space-3: 0.75rem;                 /* 12px */
--space-4: 1rem;                    /* 16px */
--space-5: 1.25rem;                 /* 20px */
--space-6: 1.5rem;                  /* 24px */
--space-8: 2rem;                    /* 32px */

/* Border Radius */
--radius-sm: 0.375rem;              /* 6px - badges */
--radius-md: 0.5rem;                /* 8px - cards */
--radius-lg: 0.75rem;               /* 12px - buttons */
--radius-xl: 1rem;                  /* 16px - modals */
--radius-full: 9999px;              /* pills */

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-cta: 0 4px 14px rgba(34, 197, 94, 0.3);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
```

### 5.2 Component: Category Grid

**Quando usare:** Homepage menu, per mostrare categorie principali

```tsx
interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

// Layout: 2 colonne, gap 16px
// Card: aspect-ratio 4:3, immagine full, nome sotto
// Immagine: object-fit cover, border-radius 12px
// Nome: 16px semibold, centered, padding-top 8px
```

```
┌─────────────────┐ ┌─────────────────┐
│                 │ │                 │
│   [CATEGORY     │ │   [CATEGORY     │
│    IMAGE]       │ │    IMAGE]       │
│                 │ │                 │
├─────────────────┤ ├─────────────────┤
│   Breakfast     │ │     Lunch       │
└─────────────────┘ └─────────────────┘
```

### 5.3 Component: Product Card (Horizontal)

**Quando usare:** Lista prodotti in categoria

```tsx
interface ProductCardProps {
  product: Product;
  onTap: () => void;
  onQuickAdd?: () => void;  // Se modifiers = 0
}

// Layout: flex row, gap 12px
// Immagine: 100x100px (mobile), 120x120px (tablet+), border-radius 8px
// Content: flex column, justify between
// Badge: position absolute, top-left dell'immagine
```

```
┌────────────────────────────────────────┐
│ ┌──────────┐                           │
│ │ Popular  │  Product Name             │
│ │  [IMG]   │  Description text that    │
│ │          │  truncates to 2 lines...  │
│ │          │                           │
│ └──────────┘  $12.00        🌿 🌾 🌶️   │
└────────────────────────────────────────┘
                               ↑ Dietary icons
```

### 5.4 Component: Product Bottom Sheet

**Quando usare:** Dettaglio prodotto, selezione modifiers

```tsx
interface ProductBottomSheetProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

// Altezza: max 90vh, scrollabile
// Handle bar: 40x4px centered, margin-top 12px
// Hero image: width 100%, height 240px
// Content: padding 24px
// Footer: sticky, padding 16px, border-top
```

**Sezioni contenuto:**
1. **Header:** Nome (24px bold) + Badge (se presente)
2. **Description:** Testo completo, color secondary
3. **Dietary Info:** Pills con abbreviazioni (GFO, VG, V, DF, etc.)
4. **Allergen Warning:** Se presenti, alert box rosso/amber
5. **Price:** 24px bold, color price
6. **Modifiers:** Grouped by type (required first)
7. **Footer:** Quantity selector + Add to order button

### 5.5 Component: Dietary Pills

**Design:** Pills compatte con abbreviazioni standard

```tsx
const DIETARY_ABBREVIATIONS = {
  vegan: 'V',
  vegetarian: 'VG',
  gluten_free: 'GF',
  gluten_free_option: 'GFO',
  dairy_free: 'DF',
  nut_free: 'NF',
  halal: 'HAL',
  kosher: 'KOS',
  keto: 'KETO',
  low_carb: 'LC',
  organic: 'ORG',
  locally_sourced: 'LOCAL'
};

// Style: bg-stone-100, color-stone-600, padding 4px 8px
// Font: 10px uppercase, font-weight 600
// Border-radius: full (pill)
```

### 5.6 Component: Allergen Alert

**Quando usare:** Nel product detail se il prodotto contiene allergeni

```tsx
interface AllergenAlertProps {
  allergens: Allergen[];
  severity: 'warning' | 'danger';
}

// Warning (amber): "Contains: gluten, dairy, eggs"
// Danger (red): Per allergeni severi (nuts, shellfish)
```

```
┌─────────────────────────────────────┐
│ ⚠️ Contains: gluten, dairy, eggs   │  ← Warning (amber bg)
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ ⛔ Contains: peanuts, tree nuts     │  ← Danger (red bg)
└─────────────────────────────────────┘
```

### 5.7 Component: Cart Item

```tsx
interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (qty: number) => void;
  onRemove: () => void;
  onEdit: () => void;
}
```

```
┌─────────────────────────────────────┐
│  Cheese Burger                      │
│  1x Bacon, No onions       (−) 1 (+)│  ← Modifiers + qty
│  $19.00                      [Edit] │
└─────────────────────────────────────┘
```

### 5.8 Component: Loyalty Card

**DIFFERENZIATORE:** me&u mostra solo punti, GUDBRO mostra tier + progress

```tsx
interface LoyaltyCardProps {
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
  pointsToNextTier: number;
  redeemableValue: number;
}
```

```
┌─────────────────────────────────────┐
│  ⭐ Gold Member           1,250 pts │
│  ████████████░░░░░░░  750 to Plat. │  ← Progress bar
│                                     │
│  Available to redeem: $12.50        │
│                       [ Redeem ]    │
└─────────────────────────────────────┘
```

---

## 6. UNIQUE DIFFERENTIATORS UI

Queste sono features che **solo GUDBRO ha** e devono essere evidenziate nell'UI.

### 6.1 Multi-Language Selector

```
┌─────────────────────────────────────┐
│  🌐 Menu Language                   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ EN  │ │ VI  │ │ KO  │ │ JA  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ ZH  │ │ IT  │ │ TH  │ │ +8  │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
└─────────────────────────────────────┘
```

### 6.2 Advanced Allergen Filter

```
┌─────────────────────────────────────┐
│  Filter by dietary needs           │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ 🔍 Search allergens...          ││
│  └─────────────────────────────────┘│
│                                     │
│  Common:                            │
│  [Gluten] [Dairy] [Nuts] [Eggs]    │
│                                     │
│  Regional (EU 14):                  │
│  [Celery] [Mustard] [Sesame] ...   │
│                                     │
│  Regional (Korea):                  │
│  [Buckwheat] [Peach] [Pork] ...    │
│                                     │
│  [ Show only safe items ]           │
└─────────────────────────────────────┘
```

### 6.3 Crypto Payment Option

```
┌─────────────────────────────────────┐
│  Select payment method              │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ [Pay] Apple Pay            ○   ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ [MC] •••• 8831             ○   ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ [₿] Pay with Crypto        ○   ││  ← DIFFERENZIATORE
│  │     BTC, ETH, USDC, USDT       ││
│  └─────────────────────────────────┘│
└─────────────────────────────────────┘
```

### 6.4 AI Recommendations (Future)

```
┌─────────────────────────────────────┐
│  ✨ Recommended for you            │
│                                     │
│  Based on your preferences:         │
│  • Vegetarian                       │
│  • No gluten                        │
│                                     │
│  [Product Card] [Product Card]      │
└─────────────────────────────────────┘
```

---

## 7. IMPLEMENTATION PRIORITIES

### Phase 1: Core Menu Experience (P0)
1. ✅ Category navigation (tabs/grid)
2. ✅ Product list (horizontal cards)
3. ✅ Product detail (bottom sheet)
4. ✅ Dietary icons (icon-only in cards)
5. 🔨 Image loading con skeleton
6. 🔨 Search functionality

### Phase 2: Cart & Checkout (P0)
1. 🔨 Cart page con quantity controls
2. 🔨 Modifiers selection in bottom sheet
3. 🔨 Checkout flow (minimal fields)
4. 🔨 Payment method selection
5. 🔨 Order confirmation page

### Phase 3: Differentiators (P1)
1. 🔨 Multi-language selector
2. 🔨 Advanced allergen filters
3. 🔨 Loyalty points display & redemption
4. 🔨 Crypto payment option

### Phase 4: Engagement (P2)
1. 🔨 Order history
2. 🔨 Saved preferences
3. 🔨 Offers/Promotions page
4. 🔨 Events page

---

## 8. TECHNICAL NOTES

### 8.1 State Management
- Cart: Zustand store con persistence (localStorage)
- User preferences: Supabase + localStorage fallback
- Menu data: React Query con cache

### 8.2 Performance
- Images: Next.js Image con blur placeholder
- Lists: Virtualization per categorie con 50+ items
- Bottom sheets: Framer Motion per animazioni smooth

### 8.3 Offline
- Service Worker: Cache menu, images, translations
- Cart: Persist locally, sync on reconnect
- UI: Show "offline" banner, disable ordering

### 8.4 Accessibility
- Touch targets: min 44x44px
- Color contrast: WCAG AA minimum
- Screen reader: aria-labels su tutti i bottoni

---

## 9. SUCCESS METRICS

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Time to First Order | ? | < 60s | Analytics timestamp |
| Cart Abandonment | ? | < 30% | Funnel analysis |
| Dietary Filter Usage | ? | > 20% | Feature analytics |
| Language Switch | ? | > 40% | For tourist venues |
| Loyalty Redemption | ? | > 15% | Checkout analytics |

---

## 10. APPENDIX: Screenshot References

Gli screenshot di me&u mostrano:

1. **Homepage:** Category grid 2x2, hero image, table indicator, quick actions
2. **Product List:** Horizontal cards, badge "Popular", image left, price right
3. **Product Detail:** Hero image 40%, dietary pills (GFO, VG), modifiers con checkbox
4. **Cart:** Line items con modifiers, quantity selector, loyalty redeem section
5. **Payment:** Form minimal, Apple Pay/card selection, totals
6. **Confirmation:** Thank you personalizzato, loyalty points earned, receipt actions
7. **Upsell:** "Something extra?" con product suggestions

Questi pattern devono essere replicati in GUDBRO PWA v2, mantenendo però i differenziatori unici (30 allergeni, crypto, multi-lingua, AI).

---

**Document Version:** 1.0
**Created:** 2026-01-24
**Author:** UX Research Team
**Next Review:** After Phase 1 implementation
