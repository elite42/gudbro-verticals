# GUDBRO PWA v2 - Design Report & Implementation Guidelines

## Executive Summary

Questo documento fornisce le specifiche precise per implementare un design di livello premium per GUDBRO PWA v2, ispirato ai migliori competitor del settore:

| Competitor | Punto di Forza | Cosa Copiare |
|------------|----------------|--------------|
| **Sunday App / Big Mamma** | Design elegante, tipografia pulita | Layout menu, categorie, tipografia |
| **me&u (Mr Yum)** | Features avanzate, UX ordering | Foto prodotti, filtri dietetici, sold out |

---

## 1. DESIGN SYSTEM - Specifiche Precise

### 1.1 Palette Colori (già implementata)

```css
/* Primary CTA - Verde (appetizing, "go" signal) */
--interactive-primary: #22C55E;         /* Green 500 */
--interactive-primary-hover: #16A34A;   /* Green 600 */

/* Prezzo - Amber (warm, appetizing) */
--price-primary: #B45309;               /* Amber 700 - light mode */
--price-primary: #FBBF24;               /* Amber 400 - dark mode */

/* Background */
--bg-primary: #FFFFFF;                  /* Pure white */
--bg-secondary: #F5F5F4;                /* Stone 100 */

/* Text */
--text-primary: #1C1917;                /* Stone 900 */
--text-secondary: #78716C;              /* Stone 500 */
```

### 1.2 Tipografia (DA IMPLEMENTARE - Stile Big Mamma)

```css
/* Font Stack Premium */
--font-display: 'DM Sans', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;

/* Sizes - Mobile First */
--text-xs: 0.75rem;     /* 12px - badges, meta */
--text-sm: 0.875rem;    /* 14px - descriptions */
--text-base: 1rem;      /* 16px - body */
--text-lg: 1.125rem;    /* 18px - product names */
--text-xl: 1.25rem;     /* 20px - section headers */
--text-2xl: 1.5rem;     /* 24px - page titles */
--text-3xl: 1.875rem;   /* 30px - hero titles */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Letter Spacing (Big Mamma style) */
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.05em;      /* Per categorie uppercase */
--tracking-wider: 0.1em;      /* Per badges */
```

### 1.3 Spacing System (8px base)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

### 1.4 Border Radius

```css
--radius-sm: 0.375rem;    /* 6px - badges */
--radius-md: 0.5rem;      /* 8px - cards */
--radius-lg: 0.75rem;     /* 12px - buttons */
--radius-xl: 1rem;        /* 16px - modals */
--radius-full: 9999px;    /* pills, avatars */
```

---

## 2. COMPONENTI - Specifiche Dettagliate

### 2.1 Category Navigation (Stile Big Mamma)

**Design Reference**: menu.bigmammagroup.com - tab orizzontali scrollabili

```tsx
// CategoryTabs.tsx - SPECIFICHE
interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

/* Styling */
.category-tabs {
  display: flex;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  border-bottom: 1px solid var(--border-primary);
}

.category-tab {
  padding: 16px 24px;
  font-size: 0.75rem;           /* 12px */
  font-weight: 600;
  letter-spacing: 0.1em;        /* Wide tracking */
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--text-secondary);
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.category-tab.active {
  color: #166534;               /* Green 800 */
  background: #166534;          /* Verde scuro come Big Mamma */
  color: white;
}

.category-tab:hover:not(.active) {
  color: var(--text-primary);
}
```

### 2.2 Product Card (Layout Ottimizzato)

**Design Reference**: Combinazione Big Mamma (testo) + me&u (foto)

```tsx
// ProductCard.tsx - LAYOUT SPECIFICO

/* Card Container */
.product-card {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid var(--border-primary);
  transition: box-shadow 0.2s ease;
}

.product-card:active {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Image Container - Quadrato con aspect ratio */
.product-image-container {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--bg-secondary);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Content Area */
.product-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* Product Name - Stile Big Mamma */
.product-name {
  font-size: 1rem;              /* 16px */
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.3;
  /* Truncate a 2 linee */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Description */
.product-description {
  font-size: 0.875rem;          /* 14px */
  color: var(--text-secondary);
  line-height: 1.4;
  /* Truncate a 2 linee */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Price Row */
.product-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 8px;
}

.product-price {
  font-size: 1.125rem;          /* 18px */
  font-weight: 700;
  color: var(--price-primary);  /* Amber */
}

/* Dietary Icons - Solo icone, no testo */
.dietary-icons {
  display: flex;
  gap: 6px;
}

.dietary-icon {
  width: 20px;
  height: 20px;
}
```

### 2.3 Dietary Icons (Icone Grandi, No Testo)

**Già implementato** - Usare Phosphor Icons 18-20px senza label

```tsx
// Icone da usare (Phosphor)
import { Leaf, GrainsSlash, Pepper, Fish, Egg } from '@phosphor-icons/react';

const DietaryIcons = {
  vegan: <Leaf size={20} weight="fill" color="#22c55e" />,
  vegetarian: <Leaf size={20} weight="duotone" color="#22c55e" />,
  glutenFree: <GrainsSlash size={20} weight="fill" color="#f59e0b" />,
  spicy: <Pepper size={20} weight="fill" color="#ef4444" />,
  seafood: <Fish size={20} weight="fill" color="#3b82f6" />,
  containsEgg: <Egg size={20} weight="fill" color="#fbbf24" />,
};
```

### 2.4 Bottom Sheet (Product Detail)

**Design Reference**: me&u - full detail view

```tsx
// ProductBottomSheet.tsx - SPECIFICHE

/* Backdrop */
.bottom-sheet-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 50;
}

/* Sheet Container */
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 90vh;
  background: white;
  border-radius: 24px 24px 0 0;
  z-index: 51;
  display: flex;
  flex-direction: column;
}

/* Handle Bar */
.bottom-sheet-handle {
  width: 40px;
  height: 4px;
  background: var(--border-primary);
  border-radius: 2px;
  margin: 12px auto;
}

/* Hero Image */
.bottom-sheet-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

/* Content */
.bottom-sheet-content {
  padding: 24px;
  overflow-y: auto;
  flex: 1;
}

/* Product Title */
.bottom-sheet-title {
  font-size: 1.5rem;            /* 24px */
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

/* Description - Full, no truncate */
.bottom-sheet-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
}

/* Dietary Tags - Con testo nel detail */
.dietary-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.dietary-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--bg-secondary);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Price */
.bottom-sheet-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--price-primary);
  margin-bottom: 24px;
}

/* Add to Order Button */
.add-to-order-btn {
  width: 100%;
  padding: 16px 24px;
  background: #22C55E;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 9999px;        /* Full round */
  border: none;
  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.3);
  transition: all 0.2s ease;
}

.add-to-order-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.4);
}
```

### 2.5 Badges (Contrasto Migliorato)

**Già implementato** - Confermare questi colori

```css
/* NEW Badge */
.badge-new {
  background: #DCFCE7;          /* Green 100 */
  color: #15803D;               /* Green 700 */
}

/* POPULAR Badge */
.badge-popular {
  background: #FEF3C7;          /* Amber 100 */
  color: #B45309;               /* Amber 700 */
}

/* BEST SELLER Badge */
.badge-best-seller {
  background: #FEE2E2;          /* Red 100 */
  color: #B91C1C;               /* Red 700 */
}

/* SOLD OUT Badge */
.badge-sold-out {
  background: #F5F5F4;          /* Stone 100 */
  color: #78716C;               /* Stone 500 */
}

/* Badge Base Styles */
.badge {
  padding: 4px 8px;
  font-size: 0.625rem;          /* 10px */
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 4px;
}
```

---

## 3. FEATURES DA IMPLEMENTARE (Ispirate a me&u)

### 3.1 Sold Out Indicator

```tsx
// Nel ProductCard
{product.soldOut && (
  <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
    <span className="badge badge-sold-out">Sold Out</span>
  </div>
)}

// Stile immagine sold out
.product-card.sold-out .product-image {
  filter: grayscale(100%);
  opacity: 0.6;
}
```

### 3.2 Dietary Filters (Header)

```tsx
// DietaryFilters.tsx
const filters = [
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
  { id: 'gluten-free', label: 'Gluten Free', icon: GrainsSlash },
];

/* Filter Pills */
.filter-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--border-primary);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-pill.active {
  background: #22C55E;
  border-color: #22C55E;
  color: white;
}
```

### 3.3 Quick Add Button (Card Corner)

```tsx
// Bottone + nell'angolo della card
.quick-add-btn {
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background: #22C55E;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  transition: all 0.2s ease;
}

.quick-add-btn:active {
  transform: scale(0.95);
}
```

---

## 4. ANIMAZIONI & MICRO-INTERACTIONS

### 4.1 Page Transitions

```tsx
// Framer Motion config
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeOut' }
};
```

### 4.2 Card Tap Feedback

```tsx
// ProductCard tap
<motion.div
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.1 }}
>
```

### 4.3 Bottom Sheet Animation

```tsx
// Bottom sheet spring animation
const sheetAnimation = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 300
    }
  }
};
```

---

## 5. RESPONSIVE BREAKPOINTS

```css
/* Mobile First */
@media (min-width: 375px) {
  /* Small phones */
}

@media (min-width: 414px) {
  /* Large phones */
  .product-image-container {
    width: 120px;
    height: 120px;
  }
}

@media (min-width: 768px) {
  /* Tablets - 2 column grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}
```

---

## 6. CHECKLIST IMPLEMENTAZIONE

### P0 - Critici (Fare Subito)
- [ ] Verificare che le immagini dei prodotti si carichino correttamente
- [ ] Implementare loading skeleton per le immagini
- [ ] Testare bottom sheet su tutti i device

### P1 - Importanti (Questa Settimana)
- [ ] Aggiungere filtri dietetici nel header
- [ ] Implementare indicatore "Sold Out"
- [ ] Aggiungere animazioni smooth alle transizioni

### P2 - Nice to Have (Prossima Settimana)
- [ ] Quick Add button sulle card
- [ ] Haptic feedback sui bottoni (se supportato)
- [ ] Skeleton loading per le categorie

---

## 7. RIFERIMENTI DESIGN

### URL da consultare:
- **Big Mamma Menu**: https://menu.bigmammagroup.com/pink
- **Sunday App Demo**: https://sundayapp.io/venues/f458644c-e654-4af8-926f-31971ac38478
- **me&u Website**: https://www.meandu.com/serve

### Screenshot catturati:
Gli screenshot sono stati catturati durante la sessione di review e mostrano:
1. Big Mamma: Tab navigation verde scuro, tipografia maiuscola, layout pulito
2. Sunday App: Landing page con hero image, bottone CTA bianco arrotondato
3. me&u: Menu visuale con foto, filtri dietetici, one-tap payment

---

## 8. NOTE FINALI

### Filosofia di Design
- **Minimal ma non freddo**: Usa il verde per dare calore e appetibilità
- **Mobile-first**: Ogni elemento ottimizzato per il pollice
- **Progressive disclosure**: Info base nella card, dettagli nel bottom sheet
- **Feedback immediato**: Ogni tap deve avere risposta visiva

### Don't
- ❌ Non usare nero come colore CTA (non appetizing)
- ❌ Non aggiungere testo alle icone dietetiche nelle card
- ❌ Non usare più di 2 righe per descrizioni nelle card
- ❌ Non dimenticare gli stati loading/error/empty

### Do
- ✅ Usa verde per tutti i CTA primari
- ✅ Usa amber per i prezzi (caldo, appetizing)
- ✅ Mantieni alto contrasto per accessibilità
- ✅ Testa sempre su device reali

---

*Report generato il 24 Gennaio 2026*
*Basato su analisi di: Sunday App, Big Mamma, me&u (Mr Yum)*
