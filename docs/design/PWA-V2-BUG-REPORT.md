# PWA v2 - BUG REPORT & DESIGN INCONSISTENCIES

> **Data:** 2026-01-24
> **Revisore:** Design Review Team (Visual Testing Completed)
> **Criticità:** ALTA - Richiede fix prima di production
> **Test URL:** http://localhost:3004/v2-demo

---

## EXECUTIVE SUMMARY

Dopo analisi approfondita del codice e dei componenti v2, sono stati identificati **27 bug e inconsistenze** che necessitano correzione. I problemi principali riguardano:

1. **Mix di elementi v1 e v2** - Coesistenza di componenti legacy
2. **Hardcoded values** - Colori scritti direttamente invece di usare CSS variables
3. **Link rotti** - Riferimenti a pagine non esistenti
4. **Layout issues** - BottomNav in demo page non funziona correttamente
5. **Mancanza di integrazione** - Componenti v2 isolati, non connessi al sistema esistente

---

## 🔴 CRITICAL (P0) - Da fixare subito

### BUG-001: BottomNav usa link a pagine inesistenti
**File:** `components/v2/BottomNav.tsx`
**Linee:** 23-28

```tsx
// PROBLEMA: Link a pagine che non esistono nella v2-demo
const navItems: NavItem[] = [
  { href: '/', icon: House, label: 'Home' },           // ❌ NON /v2-demo
  { href: '/menu', icon: ForkKnife, label: 'Menu' },   // ❌ NON /v2-demo/menu
  { href: '/favorites', icon: Heart, label: 'Favorites' }, // ❌ NON ESISTE
  { href: '/cart', icon: ShoppingBag, label: 'Cart', badge: cartCount },
  { href: '/account', icon: User, label: 'Account' },  // ❌ NON ESISTE
];
```

**FIX:** BottomNav deve accettare prop `basePath` o usare navigazione interna alla demo.

---

### BUG-002: HomePage ha link a pagine inesistenti
**File:** `components/v2/HomePage.tsx`
**Linee:** 176-181, 348-355, 393-400

```tsx
// PROBLEMA: Link statici invece di callback
<Link href="/menu" className="btn btn-primary">
  View Full Menu
</Link>

<Link href="/menu?filter=popular" className="...">
  See all
</Link>
```

**FIX:** Usare callback `onViewMenu()` invece di Link.

---

### BUG-003: Colori hardcoded invece di CSS variables
**File:** `components/v2/BottomNav.tsx`
**Linee:** 55, 64

```tsx
// PROBLEMA: Verde hardcoded
style={{ color: active ? '#22C55E' : 'var(--text-tertiary)' }}
style={{ background: '#22C55E' }}

// SOLUZIONE:
style={{ color: active ? 'var(--interactive-primary)' : 'var(--text-tertiary)' }}
```

**Files affetti:**
- `BottomNav.tsx` - linee 55, 64
- `ProductCard.tsx` - linea 221 (`#22c55e` invece di `var(--status-success)`)

---

### BUG-004: Demo page importa CSS che sovrascrive globali
**File:** `app/v2-demo/page.tsx`
**Linea:** 21

```tsx
import '../globals-v2.css';
```

**PROBLEMA:** Questo importa CSS v2 DOPO che il layout principale ha già caricato `globals.css`, causando conflitti e override imprevedibili.

**FIX:** La demo page dovrebbe avere un layout isolato che usa SOLO globals-v2.css.

---

### BUG-005: ProductBottomSheet manca gestione allergeni completa
**File:** `components/v2/ProductBottomSheet.tsx`

Verificare che mostri warning allergeni come da design spec (MenuDigitale LEGENDA pattern).

---

## 🟠 HIGH (P1) - Da fixare prima di release

### BUG-006: CategoryGrid non ha fallback per immagini mancanti
**File:** `components/v2/CategoryGrid.tsx`

Manca skeleton loader e fallback quando le immagini delle categorie non caricano.

---

### BUG-007: HomePage duplica sezione Categories
**File:** `app/v2-demo/page.tsx`
**Linee:** 527-539

```tsx
{/* Category Grid Section */}
<div className="container-app pb-24">
  <h2>Browse Categories</h2>
  <CategoryGrid ... />
</div>
```

HomePage già include le sezioni Popular e New Items che implicitamente mostrano categorie. Il CategoryGrid aggiunto manualmente crea ridondanza.

---

### BUG-008: AllergenFilter non filtra realmente i prodotti
**File:** `app/v2-demo/page.tsx`
**Linee:** 343-348

```tsx
const safeProducts = selectedAllergens.length > 0
  ? demoProducts.filter((p) => {
      const productAllergens = p.allergens?.map((a) => a.toLowerCase()) || [];
      return !selectedAllergens.some((a) => productAllergens.includes(a.toLowerCase()));
    })
  : demoProducts;
```

**PROBLEMA:** La logica è corretta ma `safeProducts` viene usato solo in MenuPage. HomePage mostra sempre `popularItems` e `newItems` senza filtro allergeni.

---

### BUG-009: LoyaltyRedeemCard tier colors non consistenti
**File:** `components/v2/LoyaltyRedeemCard.tsx`

Verificare che i colori dei tier (bronze, silver, gold, platinum) usino CSS variables.

---

### BUG-010: PaymentMethodSelector crypto icons mancanti
**File:** `components/v2/PaymentMethodSelector.tsx`
**Linee:** 70-75

```tsx
case 'crypto':
  return (
    <div className="flex -space-x-1">
      <TokenIcon symbol="BTC" variant="branded" size={size - 4} />
      <TokenIcon symbol="ETH" variant="branded" size={size - 4} />
    </div>
  );
```

Mancano USDC e USDT come indicato nel report (4 crypto supportate).

---

## 🟡 MEDIUM (P2) - Design inconsistencies

### BUG-011: Font display non usato consistentemente
Alcuni componenti usano `font-display` class, altri no. Manca consistenza.

**Pattern corretto:**
```tsx
className="font-display text-xl font-semibold"
```

---

### BUG-012: Badge classes non definite
**File:** `components/v2/ProductCard.tsx`
**Linee:** 107-111

```tsx
const badgeClass = isBestSeller
  ? 'badge-best-seller'
  : isPopular
    ? 'badge-popular'
    : 'badge-new';
```

Verificare che queste classi siano definite in `globals-v2.css`.

---

### BUG-013: Container padding inconsistente
Mix di `container-app`, `px-4`, e padding inline. Standardizzare.

---

### BUG-014: Animazioni shimmer non definite
**File:** `components/v2/ProductCard.tsx`
**Linea:** 131

```tsx
animation: 'shimmer 1.5s infinite',
```

Verificare che `@keyframes shimmer` sia definito in CSS.

---

### BUG-015: OrderConfirmation non usa design tokens
Verificare che tutti i colori usino CSS variables.

---

## 🔵 LOW (P3) - Nice to have

### BUG-016: Manca loading state per VoucherInput
Quando si applica un voucher, manca feedback visivo durante la validazione.

---

### BUG-017: LanguageSelector auto-detect non testato
La logica `navigator.language` potrebbe non funzionare in tutti i browser.

---

### BUG-018: AllergenLegend variante inline non implementata
Il report dice che ci sono varianti ma verificare che funzionino tutte.

---

### BUG-019: Touch targets potrebbero essere troppo piccoli
Verificare che tutti i bottoni siano almeno 44x44px.

---

### BUG-020: Scrollbar styling manca in alcuni componenti
Non tutti gli elementi scrollabili usano `scrollbar-hide` o `scrollbar-styled`.

---

## 🔴 STRUCTURAL ISSUES

### STRUCT-001: Componenti v2 isolati dal sistema
I componenti v2 sono in una cartella separata ma:
- Non usano i servizi esistenti (`lib/menu-service.ts`, `lib/cart-store.ts`)
- Non si integrano con autenticazione
- Non hanno accesso ai dati reali del database

**Questo significa che la demo è solo una demo statica, non production-ready.**

---

### STRUCT-002: Duplicazione componenti
Esistono due versioni di componenti simili:

| Componente v1 | Componente v2 | Duplicato? |
|---------------|---------------|------------|
| `BottomNavLocal.tsx` | `v2/BottomNav.tsx` | ✅ Sì |
| `DishCard.tsx` | `v2/ProductCard.tsx` | ✅ Sì |
| `CategorySection.tsx` | `v2/CategoryTabs.tsx` | ✅ Sì |
| `CartSidebar.tsx` | `v2/CartPage.tsx` | ✅ Sì |

**PROBLEMA:** Manutenzione doppia, rischio divergenza.

---

### STRUCT-003: CSS duplicato
- `globals.css` (v1) - 7KB
- `globals-v2.css` (v2) - 17KB

Ci sono variabili duplicate o in conflitto?

---

### STRUCT-004: Import path non standardizzati
Alcuni import usano `@/components/v2/`, altri potrebbero usare path relativi.

---

## CHECKLIST FIX PRIORITARI

### Fase 1: Critical Bugs (2 ore)
- [ ] BUG-001: Fix BottomNav navigation
- [ ] BUG-002: Fix HomePage links
- [ ] BUG-003: Replace hardcoded colors
- [ ] BUG-004: Fix CSS import order

### Fase 2: High Priority (4 ore)
- [ ] BUG-006: Add image fallbacks
- [ ] BUG-007: Remove duplicate CategoryGrid
- [ ] BUG-008: Fix allergen filtering in HomePage
- [ ] BUG-010: Add missing crypto icons

### Fase 3: Design Polish (4 ore)
- [ ] BUG-011 → BUG-015: Fix design inconsistencies
- [ ] Verificare tutti i CSS variables sono usati

### Fase 4: Structural (futura)
- [ ] STRUCT-001: Connettere a servizi reali
- [ ] STRUCT-002: Deprecare componenti v1
- [ ] STRUCT-003: Unificare CSS

---

## NOTE PER CLAUDE CODE

Quando correggi questi bug:

1. **Non usare mai colori hardcoded** - Sempre `var(--nome-token)`
2. **Non usare Link per navigazione demo** - Usa callback props
3. **Testa in mobile viewport** - 375px è il target principale
4. **Controlla console per errori** - Nessun warning React
5. **Build deve passare** - `pnpm build` senza errori

---

---

## 🔍 VISUAL TESTING RESULTS (Mobile 375x812)

### ✅ FUNZIONA BENE

| Componente | Status | Note |
|------------|--------|------|
| Hero Image | ✅ | Carica correttamente |
| CategoryGrid | ✅ | Immagini categorie OK, layout 2 colonne |
| ProductBottomSheet | ✅ | Drag handle, immagine, allergeni, nutrition, quantity selector |
| LoyaltyRedeemCard | ✅ | "1250 pts GOLD · Worth 13K" |
| VoucherInput | ✅ | Placeholder + hint codes |
| PaymentMethodSelector | ✅ | Apple Pay, Google Pay, Saved Cards, Crypto (BTC/ETH/USDC/USDT) |
| Demo Page Switcher | ✅ | Funziona su desktop |
| Cart Badge | ✅ | Si aggiorna quando aggiungi prodotti |
| Prezzi formattati | ✅ | "55K", "95K" colore ambra |

### ❌ BUG VISIVI CONFERMATI

| # | Bug | Gravità | Screenshot |
|---|-----|---------|------------|
| V-001 | **BottomNav naviga a PWA v1** - Cliccando Menu/Home vai a `/menu` (v1) invece di restare in v2-demo | 🔴 CRITICO | Menu click → design completamente diverso |
| V-002 | **Immagini prodotti non caricano** - ProductCard in HomePage mostra solo skeleton grigio | 🔴 CRITICO | Popular/New Arrivals sections |
| V-003 | **Floating buttons sovrapposti** - 🌐 e filtro coprono le card a destra | 🟠 HIGH | Visibile scrollando |
| V-004 | **CTA "View Full Menu" troncato** - Testo parzialmente visibile | 🟡 MEDIUM | Sotto hero image |
| V-005 | **Header ha icona traduttore ridondante** - 文A nell'header + floating 🌐 button | 🟡 MEDIUM | Duplicazione funzione |
| V-006 | **Cart mostra "0"** quando vuoto invece di nascondere badge | 🟢 LOW | BottomNav |

### 🎯 PRIORITÀ FIX

**FASE 1 - Blockers (prima di mostrare a utenti):**
1. V-001: BottomNav deve navigare internamente alla demo, non a pagine esterne
2. V-002: Fix caricamento immagini ProductCard

**FASE 2 - UX Polish:**
3. V-003: Riposizionare floating buttons o ridurre z-index
4. V-004: Verificare CTA button visibilità
5. V-005: Rimuovere duplicazione language selector

**FASE 3 - Minor:**
6. V-006: Nascondere badge cart quando count=0

---

**Report generato da:** Design Review Team
**Versione:** 2.0 (con visual testing)
**Prossima review:** Dopo fix Fase 1
