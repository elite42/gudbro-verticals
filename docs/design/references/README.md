# Design References - Screenshot Library

> **Per Claude Code:** Usa questi screenshot come riferimento visivo per implementare i componenti UI di GUDBRO PWA v2.

---

## Fonte: me&u (Mr Yum)

**URL:** mryum.com
**Tipo:** Menu digitale + Ordering PWA
**Perché me&u:** Leader di mercato per UX menu digitali, pattern consolidati, design pulito

---

## Screenshot Index

### Homepage & Navigation

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-16-homepage-categories-grid-hero.png` | Homepage con hero image e grid categorie | Hero banner, Category grid 2x2, Table selector, Loyalty badge, "Start group order" |

### Product Lists

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-01-product-list-desserts-bingsu.png` | Lista prodotti dessert | Card verticali, Immagine + nome + descrizione + prezzo, Badge "Popular" |
| `meandu-05-category-tabs-info-allergens-specials.png` | Tabs categorie + Info allergie | Horizontal scroll tabs, Info section con disclaimer allergie, Card specials |
| `meandu-07-category-specials-starters.png` | Sezione specials + starters | Horizontal tabs, Cards con immagini, Prezzo + badge GFO |
| `meandu-08-product-list-mains-horizontal-tabs.png` | Lista mains con tabs | Horizontal category tabs, Product cards con immagini circolari |

### Product Detail

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-02-product-detail-dietary-tags-GFO-VG.png` | Dettaglio con dietary tags | Full-width image, Nome + descrizione, Prezzo, **GFO, VG badges**, Sides upsell, Add to order CTA |
| `meandu-03-product-detail-cocktail-simple.png` | Dettaglio cocktail semplice | Hero image, Nome + ingredienti, Prezzo, Quantity selector, Green CTA |
| `meandu-04-product-detail-steak-modifiers-cooking.png` | Dettaglio steak con cottura | Image, "On special" badge, Prezzo barrato, **GFO badge**, Radio buttons cottura (Rare/Medium Rare) |
| `meandu-11-product-detail-fries-allergen-warning.png` | Dettaglio con allergen warning | "Popular" badge, **"Contains: gluten" warning**, Sauce selector radio |

### Modifiers & Extras

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-09-product-detail-burger-extras-checkboxes.png` | Extras con checkboxes | Checkbox list extras (Bacon +5, Pickles +2, etc.), Add to order CTA |
| `meandu-10-modifiers-extras-upsell-fries.png` | Modifiers scrollati + upsell | Checkboxes selezionati (green check), "Want to remove something?", "Something extra?" upsell section |
| `meandu-12-modifiers-selected-upsell-summary.png` | Summary modifiers selezionati | Selected item card con "Remove" link, Upsell products con thumbnail |

### Filter & Search

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-06-filter-modal-dietaries.png` | Modal filtri dietary | **"Dietaries" checkboxes**: Vegan, Vegetarian, Dairy Intolerance, Gluten Intolerance, Nut Intolerance, Without Garlic, Green "Apply" button |

### Cart & Checkout

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-13-cart-checkout-loyalty-redeem.png` | Cart con loyalty redeem | Table number badge, Items con modifiers, Quantity controls, **Loyalty points card** (31,000 points, Claim for $31), Subtotal/Total |
| `meandu-17-cart-voucher-discount-code.png` | Cart con voucher input | Items list, Loyalty redeem, **"Add voucher or discount code"** link, Continue CTA |

### Payment

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-14-payment-methods-applepay-card.png` | Payment method selection | User details form (Name, Email optional), **Payment methods**: Apple Pay (selected), Mastercard saved, "Pay now" green CTA |

### Order Confirmation

| File | Descrizione | Elementi Chiave |
|------|-------------|-----------------|
| `meandu-15-order-confirmation-loyalty-earned.png` | Conferma ordine + loyalty earned | Success checkmark, Receipt sent message, **Loyalty earned card** (310 points earned), Order summary, "Back to menu" CTA |

---

## Design Tokens Estratti

### Colors
- **CTA Green:** `#22C55E` (tutti i bottoni primari)
- **Header Green:** `#1F2937` (header scuro)
- **Price Amber:** `#B45309` (prezzi, badges)
- **Text Primary:** `#111827`
- **Text Secondary:** `#6B7280`
- **Background:** `#FFFFFF`
- **Dividers:** `#E5E7EB`

### Typography
- **Product Name:** 18px, font-semibold
- **Description:** 14px, text-gray-600, line-clamp-2
- **Price:** 16px, font-semibold, amber-700
- **Badge:** 12px, font-medium, uppercase

### Spacing
- **Card padding:** 16px
- **Grid gap:** 12px
- **Section gap:** 24px
- **Safe area bottom:** 80px (per bottom CTA)

### Components Pattern
- **Dietary badges:** Pills verdi piccoli (`GFO`, `VG`, `V`)
- **Allergen warning:** Info icon + "Contains: X" text
- **CTA Button:** Full-width, rounded-lg, py-3, bg-green-600
- **Quantity:** `-` `[num]` `+` bordered controls
- **Modifiers:** Checkbox con prezzo a destra (+$X)

---

## Come Usare (Per Claude Code)

1. **Prima di implementare un componente**, trova lo screenshot di riferimento in questa cartella
2. **Apri lo screenshot** con il tool Read per vedere i dettagli visivi
3. **Estrai pattern** di layout, spaziatura, colori
4. **Adatta per GUDBRO** aggiungendo le funzionalità extra (30 allergens, crypto, etc.)

### Esempio Workflow

```
Task: Implementare ProductDetailSheet

1. Read meandu-02-product-detail-dietary-tags-GFO-VG.png
2. Read meandu-04-product-detail-steak-modifiers-cooking.png
3. Read meandu-09-product-detail-burger-extras-checkboxes.png
4. Implementa seguendo i pattern visivi
5. Aggiungi: 30 allergens icons, crypto prices, AI suggestions
```

---

## Aggiungere Nuovi Screenshot

Quando aggiungi nuovi screenshot:

1. **Naming convention:** `[source]-[number]-[screen]-[details].png`
   - Esempio: `meandu-18-search-results.png`
   - Esempio: `sunday-01-bill-split.png`

2. **Aggiorna questo README** con la nuova entry nella tabella appropriata

3. **Fonti valide:**
   - `meandu` - me&u / Mr Yum (menu/ordering)
   - `sunday` - Sunday App (payment/bill)
   - `bigmamma` - Big Mamma (menu only)
   - `other` - Altri competitor

---

**Last Updated:** 2026-01-24
**Total Screenshots:** 17
