# GUDBRO PWA v2 - Implementation Guide

> **QUESTO DOCUMENTO È PER CLAUDE CODE**
> Contiene istruzioni esecutive, non linee guida. Segui passo per passo.

---

## 🔴 PRIMA DI INIZIARE - Leggi Questo

### Struttura Progetto

```
apps/coffeeshop/frontend/
├── app/                    # Next.js App Router pages
├── components/
│   ├── v2/                 # ⭐ NUOVI COMPONENTI - LAVORA QUI
│   │   ├── BottomNav.tsx       ✅ Esistente
│   │   ├── CartPage.tsx        ✅ Esistente
│   │   ├── CategoryTabs.tsx    ✅ Esistente
│   │   ├── Header.tsx          ✅ Esistente
│   │   ├── HomePage.tsx        ✅ Esistente
│   │   ├── MenuPage.tsx        ✅ Esistente
│   │   ├── ProductBottomSheet.tsx  ✅ Esistente
│   │   ├── ProductCard.tsx     ✅ Esistente
│   │   ├── WelcomeModal.tsx       ✅ Esistente
│   │   └── index.ts            ✅ Esistente
│   ├── ui/                 # shadcn/ui components
│   └── [altri legacy]      # NON MODIFICARE senza chiedere
├── lib/
│   ├── cart-store.ts       # Zustand store carrello
│   ├── menu-service.ts     # API menu
│   ├── loyalty-service.ts  # API loyalty
│   └── [altri services]
├── hooks/                  # Custom React hooks
└── types/                  # TypeScript types
```

### Librerie Disponibili - USA QUESTE

```tsx
// ICONE - Non installare altre librerie
import { IconName } from '@phosphor-icons/react'  // 7000+ icone
import { IconName } from 'lucide-react'           // Per shadcn/ui

// CRYPTO ICONS - Già installate
import { Bitcoin, Ethereum } from '@web3icons/react'

// PAYMENT ICONS - Già installate
import { Visa, Mastercard } from 'react-svg-credit-card-payment-icons'

// ANIMAZIONI
import { motion } from 'framer-motion'

// UI COMPONENTS - shadcn/ui già configurato
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sheet } from '@/components/ui/sheet'
```

### Design Tokens - USA QUESTE VARIABILI CSS

```css
/* Colori - SEMPRE usare variabili, MAI valori hardcoded */
--color-primary: #22C55E       /* Verde CTA */
--price-primary: #B45309       /* Ambra prezzi */
--status-error: #DC2626        /* Rosso errori */
--status-warning: #F59E0B      /* Ambra warning */
--status-success: #22C55E      /* Verde successo */

--text-primary                  /* Testo principale */
--text-secondary                /* Testo secondario */
--text-tertiary                 /* Testo terziario */

--bg-primary                    /* Sfondo principale */
--bg-secondary                  /* Sfondo secondario */
```

---

## 📁 RIFERIMENTI VISIVI

Prima di implementare un componente, DEVI guardare lo screenshot di riferimento:

```bash
# Comando per vedere uno screenshot
Read docs/design/references/meandu-XX-nome-file.png
```

| Componente | Screenshot da Guardare |
|------------|----------------------|
| Homepage | `meandu-16-homepage-categories-grid-hero.png` |
| Product Card | `meandu-01-product-list-desserts-bingsu.png` |
| Product Detail | `meandu-02-product-detail-dietary-tags-GFO-VG.png` |
| Modifiers | `meandu-09-product-detail-burger-extras-checkboxes.png` |
| Cart | `meandu-13-cart-checkout-loyalty-redeem.png` |
| Payment | `meandu-14-payment-methods-applepay-card.png` |
| Dietary Filter | `meandu-06-filter-modal-dietaries.png` |

**Documenti da consultare:**
- `docs/design/references/COMPETITOR-ANALYSIS.md` - Pattern UI da competitor
- `docs/design/PWA-V2-DESIGN-SPRINT-REPORT.md` - Specifiche complete
- `docs/PRODUCT.md` - Contesto prodotto e personas

---

## ✅ CHECKLIST COMPONENTI

### FASE 1: Core Menu (P0)

#### 1.1 CategoryGrid (DA CREARE)
**File:** `components/v2/CategoryGrid.tsx`
**Riferimento:** `meandu-16-homepage-categories-grid-hero.png`

```tsx
// STRUTTURA RICHIESTA
interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

// SPECIFICHE
// - Layout: grid 2 colonne, gap-4
// - Card: aspect-ratio 4/3, rounded-xl
// - Immagine: object-cover, hover scale 1.05
// - Nome: text-base font-semibold, centered sotto immagine
// - Animazione: framer-motion whileHover, whileTap
```

**Checklist:**
- [x] Creare file `components/v2/CategoryGrid.tsx`
- [x] Importare da `@/lib/menu-service` per dati categorie
- [x] Usare skeleton loader mentre carica
- [x] Esportare da `components/v2/index.ts`
- [ ] Testare su mobile (375px) e tablet (768px)

---

#### 1.2 ProductCard (ESISTENTE - VERIFICARE)
**File:** `components/v2/ProductCard.tsx` ✅ Esiste
**Riferimento:** `meandu-01-product-list-desserts-bingsu.png`

**Checklist verifica:**
- [x] Ha dietary icons (vegan, gluten-free, spicy)
- [x] Ha badge Popular/New/Best Seller
- [x] Ha prezzo con sconto
- [x] Ha prep time e calories
- [x] Ha likes count
- [x] Ha favorite button
- [x] **COMPLETATO:** Allergen pills (GFO, VG, DF) - aggiunto

**Da aggiungere:**
```tsx
// Aggiungere sotto dietary icons
{allergens && allergens.length > 0 && (
  <div className="flex gap-1 flex-wrap">
    {allergens.slice(0, 3).map(a => (
      <span key={a} className="px-1.5 py-0.5 text-[10px] font-semibold
        uppercase rounded-full bg-stone-100 text-stone-600">
        {a}
      </span>
    ))}
  </div>
)}
```

---

#### 1.3 ProductBottomSheet (ESISTENTE - VERIFICARE)
**File:** `components/v2/ProductBottomSheet.tsx` ✅ Esiste
**Riferimento:** `meandu-02-product-detail-dietary-tags-GFO-VG.png`

**Checklist verifica:**
- [x] Verificare che abbia sezione allergen warning
- [x] Verificare modifiers con checkboxes
- [x] Verificare quantity selector
- [x] Verificare CTA "Add to order" sticky

---

#### 1.4 SearchOverlay (DA VERIFICARE/MIGLIORARE)
**File:** `components/SearchOverlay.tsx` (legacy) o creare in v2
**Riferimento:** Pattern da `menutigr.com` - search prominente

**Checklist:**
- [x] Verificare se SearchOverlay esistente è adeguato - SearchBar integrata in MenuPage
- [x] Se no, creare `components/v2/SearchBar.tsx` - non necessario, già in MenuPage
- [x] Deve avere: input con icona, risultati live, filtri quick - presente in MenuPage

---

### FASE 2: Cart & Checkout (P0)

#### 2.1 CartPage (ESISTENTE - VERIFICARE)
**File:** `components/v2/CartPage.tsx` ✅ Esiste
**Riferimento:** `meandu-13-cart-checkout-loyalty-redeem.png`

**Checklist verifica:**
- [x] Ha line items con modifiers visualizzati
- [x] Ha quantity selector per ogni item
- [x] Ha "Add more items" link
- [x] Ha sezione Loyalty points redemption (LoyaltyRedeemCard component)
- [x] Ha input voucher/discount code (VoucherInput component)
- [x] Ha totali (subtotal, tax, total)
- [x] Ha CTA "Continue" sticky

---

#### 2.2 LoyaltyRedeemCard ✅ CREATO
**File:** `components/v2/LoyaltyRedeemCard.tsx`
**Riferimento:** `meandu-13-cart-checkout-loyalty-redeem.png`
**API:** `lib/loyalty-service.ts`

```tsx
interface LoyaltyRedeemCardProps {
  points: number;
  redeemableValue: number;  // es. $31.00
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  onRedeem: () => void;
}

// SPECIFICHE GUDBRO (differenziatore)
// - Mostrare tier attuale con icona
// - Mostrare progress verso prossimo tier
// - Mostrare punti convertibili in valore
// - CTA "Claim" per riscattare
```

---

#### 2.3 PaymentMethodSelector ✅ CREATO
**File:** `components/v2/PaymentMethodSelector.tsx`
**Riferimento:** `meandu-14-payment-methods-applepay-card.png`

```tsx
interface PaymentMethod {
  id: string;
  type: 'apple_pay' | 'google_pay' | 'card' | 'crypto';
  label: string;
  icon: ReactNode;
  lastFour?: string;  // Per carte salvate
}

// SPECIFICHE
// - Radio buttons per selezione
// - Apple Pay / Google Pay in cima
// - Carte salvate con last 4 digits
// - DIFFERENZIATORE: Opzione "Pay with Crypto" con icone BTC, ETH, USDC, USDT
```

**Per crypto, usa:**
```tsx
import { Bitcoin, Ethereum, Tether, UsdCoin } from '@web3icons/react'
```

---

### FASE 3: Differenziatori GUDBRO (P1)

#### 3.1 AllergenFilter ✅ CREATO - DIFFERENZIATORE
**File:** `components/v2/AllergenFilter.tsx`
**Riferimento:** `meandu-06-filter-modal-dietaries.png` + `docs/design/references/COMPETITOR-ANALYSIS.md`

```tsx
// GUDBRO ha 30 allergeni (competitor ne hanno max 14)
// Organizzare in gruppi:

const ALLERGEN_GROUPS = {
  common: ['gluten', 'dairy', 'eggs', 'nuts', 'soy'],
  eu14: ['celery', 'mustard', 'sesame', 'sulphites', 'lupin', 'molluscs', 'crustaceans', 'fish'],
  korea: ['buckwheat', 'pork', 'peach', 'tomato', 'chicken', 'beef', 'squid'],
  japan: ['abalone', 'salmon_roe', 'orange', 'kiwi', 'banana', 'matsutake', 'yam'],
  gudbro: ['msg', 'palm_oil']
};
```

**Checklist:**
- [x] Creare modal/sheet con filtri
- [x] Raggruppare per regione (Common, EU, Korea, Japan, GUDBRO)
- [x] Checkbox per ogni allergene
- [x] Search input per trovare allergeni
- [x] CTA "Show X safe items" con count
- [ ] Salvare preferenze in localStorage + sync con backend (da integrare)

---

#### 3.2 LanguageSelector ✅ CREATO - DIFFERENZIATORE
**File:** `components/v2/LanguageSelector.tsx`
**API:** `lib/language-preferences.ts`

```tsx
// GUDBRO supporta 15+ lingue (competitor max 2-3)
const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  // ... altri
];

// SPECIFICHE
// - Grid di bandiere cliccabili
// - Evidenziare lingua corrente
// - Auto-detect da browser se prima visita
// - Salvare in localStorage + sync
```

---

#### 3.3 CryptoPaymentFlow (ESISTENTE - VERIFICARE)
**File:** `components/CryptoPaymentModal.tsx` (21KB - già esiste!)
**API:** `lib/crypto-price-service.ts`

**Checklist:**
- [ ] Verificare che sia integrato nel checkout v2
- [ ] Verificare che mostri prezzi live in crypto
- [ ] Verificare che supporti BTC, ETH, USDC, USDT

---

#### 3.4 SplitBillFlow (ESISTENTE - VERIFICARE)
**File:** `components/SplitBillModal.tsx` (15KB - già esiste!)

**Checklist:**
- [ ] Verificare che sia integrato nel cart v2
- [ ] Verificare UX di selezione items per persona
- [ ] Verificare calcolo automatico quote

---

## 🔌 API E SERVICES

### Menu Data
```tsx
// lib/menu-service.ts
import { getCategories, getProductsByCategory, getProductById } from '@/lib/menu-service';
```

### Cart
```tsx
// lib/cart-store.ts (Zustand)
import { useCartStore } from '@/lib/cart-store';
const { items, addItem, removeItem, updateQuantity, total } = useCartStore();
```

### Loyalty
```tsx
// lib/loyalty-service.ts
import { getLoyaltyStatus, redeemPoints } from '@/lib/loyalty-service';
```

### Ordini
```tsx
// lib/order-service.ts
import { createOrder, getOrderStatus } from '@/lib/order-service';
```

---

## 📋 ORDINE DI IMPLEMENTAZIONE

Segui questo ordine esatto:

### Sprint 1 (Core Menu)
1. [x] Verificare `ProductCard.tsx` - aggiungere allergen pills se mancanti
2. [x] Creare `CategoryGrid.tsx`
3. [x] Verificare `ProductBottomSheet.tsx` - allergen warning
4. [x] Verificare/creare `SearchBar.tsx` - già integrata in MenuPage
5. [x] Integrare tutto in `MenuPage.tsx`

### Sprint 2 (Cart & Checkout)
6. [x] Verificare `CartPage.tsx` - completezza
7. [x] Creare `LoyaltyRedeemCard.tsx`
8. [x] Creare `PaymentMethodSelector.tsx`
9. [x] Integrare crypto payment esistente (via PaymentMethodSelector)
10. [x] Creare `OrderConfirmation.tsx`
11. [x] Creare `VoucherInput.tsx` (bonus)

### Sprint 3 (Differenziatori)
11. [x] Creare `AllergenFilter.tsx` con 30 allergeni
12. [x] Creare `LanguageSelector.tsx` con 18 lingue
13. [x] Verificare/integrare `SplitBillModal.tsx` (396 righe, già esistente)
14. [x] Verificare/integrare `CryptoPaymentModal.tsx` (579 righe, già esistente)

---

## ⚠️ REGOLE IMPORTANTI

1. **NON creare nuovi file fuori da `components/v2/`** senza chiedere
2. **NON installare nuove dipendenze** - abbiamo tutto
3. **SEMPRE usare variabili CSS** per colori/spacing
4. **SEMPRE esportare da `components/v2/index.ts`**
5. **SEMPRE testare su mobile first** (375px width)
6. **GUARDARE screenshot PRIMA di implementare**

---

## 🧪 COME TESTARE

```bash
# Avviare dev server
cd apps/coffeeshop/frontend
pnpm dev

# Aprire http://localhost:3000
# Testare su Chrome DevTools mobile view (375px)
```

---

**Ultimo aggiornamento:** 2026-01-24
**Versione:** 1.0
