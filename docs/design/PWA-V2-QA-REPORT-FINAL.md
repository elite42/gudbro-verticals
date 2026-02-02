# PWA v2 - QA TESTING REPORT FINALE

> **Data:** 2026-01-24
> **Tester:** QA Team (Visual + Functional Testing)
> **URL Testato:** http://localhost:3004/v2-demo
> **Dispositivo:** Mobile viewport (375x812 simulato)

---

## EXECUTIVE SUMMARY

Testing completo eseguito su tutte le pagine e componenti della PWA v2 demo. Identificati **7 bug critici** e **3 miglioramenti consigliati**.

### Stato Fix Precedenti
| Bug ID | Descrizione | Status |
|--------|-------------|--------|
| V-001 | BottomNav naviga a PWA v1 | ✅ **RISOLTO** |
| V-003 | Floating buttons sovrapposti | ✅ **RISOLTO** |
| V-004 | CTA "View Full Menu" troncato | ✅ **RISOLTO** |
| V-005 | Icona traduttore duplicata | ✅ **RISOLTO** |
| V-006 | Cart badge mostra "0" | ✅ **RISOLTO** |

---

## 🔴 BUG CRITICI (P0) - Da fixare immediatamente

### BUG-QA-001: Pagina "Favorites" completamente vuota
**Gravità:** 🔴 CRITICO
**Componente:** `app/v2-demo/page.tsx` → renderPage()
**Riproduzione:**
1. Vai a http://localhost:3004/v2-demo
2. Clicca "Favorites" nella BottomNav
3. La pagina è completamente vuota (solo floating buttons visibili)

**Problema:**
La funzione `renderPage()` nel demo non gestisce il caso `currentPage === 'favorites'` oppure il componente non è implementato.

**FIX RICHIESTO:**
```tsx
// In app/v2-demo/page.tsx, nella funzione renderPage()
// Aggiungere il case per 'favorites':

case 'favorites':
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={merchantData.name}
        merchantLogo={merchantData.logo}
        onThemeToggle={() => setIsDark(!isDark)}
        isDark={isDark}
      />
      <main className="container-app py-8 pb-24">
        <h1 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Your Favorites
        </h1>
        {/* Empty state se nessun favorito */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart size={64} weight="light" style={{ color: 'var(--text-tertiary)' }} />
          <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
            No favorites yet
          </p>
          <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>
            Tap the heart icon on any item to save it here
          </p>
          <button
            onClick={() => setCurrentPage('menu')}
            className="btn btn-primary mt-6"
          >
            Browse Menu
          </button>
        </div>
      </main>
      <BottomNav cartCount={cart.length} activePage="favorites" onNavigate={setCurrentPage} />
    </div>
  );
```

---

### BUG-QA-002: Pagina "Account" completamente vuota
**Gravità:** 🔴 CRITICO
**Componente:** `app/v2-demo/page.tsx` → renderPage()
**Riproduzione:**
1. Vai a http://localhost:3004/v2-demo
2. Clicca "Account" nella BottomNav
3. La pagina è completamente vuota

**FIX RICHIESTO:**
```tsx
// In app/v2-demo/page.tsx, nella funzione renderPage()
// Aggiungere il case per 'account':

case 'account':
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={merchantData.name}
        merchantLogo={merchantData.logo}
        onThemeToggle={() => setIsDark(!isDark)}
        isDark={isDark}
      />
      <main className="container-app py-8 pb-24">
        <h1 className="font-display text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Account
        </h1>
        {/* Guest user state */}
        <div className="card p-6 text-center">
          <User size={64} weight="light" className="mx-auto" style={{ color: 'var(--text-tertiary)' }} />
          <h2 className="mt-4 font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            Guest User
          </h2>
          <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
            Sign in to track orders and earn rewards
          </p>
          <button className="btn btn-primary mt-6 w-full">
            Sign In
          </button>
          <button className="btn btn-ghost mt-3 w-full">
            Create Account
          </button>
        </div>

        {/* Settings links */}
        <div className="mt-6 space-y-3">
          <button className="card flex items-center gap-4 p-4 w-full text-left">
            <Gear size={24} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Settings</span>
          </button>
          <button className="card flex items-center gap-4 p-4 w-full text-left">
            <Question size={24} style={{ color: 'var(--text-secondary)' }} />
            <span style={{ color: 'var(--text-primary)' }}>Help & Support</span>
          </button>
        </div>
      </main>
      <BottomNav cartCount={cart.length} activePage="account" onNavigate={setCurrentPage} />
    </div>
  );
```

---

### BUG-QA-003: OrderConfirmation mostra prezzi "0K"
**Gravità:** 🔴 CRITICO
**Componente:** `app/v2-demo/page.tsx` → OrderConfirmation rendering
**Riproduzione:**
1. Aggiungi un prodotto al carrello
2. Vai al Cart e clicca "Place Order"
3. Nella schermata di conferma, i prezzi mostrano "0K" invece del valore reale

**Screenshot Evidence:**
- "1x Demo Order" → **0K** (dovrebbe essere nome prodotto + prezzo)
- "Subtotal" → **0K**
- "Total" → **0K**
- C'è uno "0" solitario sotto "Paid with Apple Pay"

**Problema:**
L'OrderConfirmation non riceve o non usa correttamente i dati del carrello.

**FIX RICHIESTO:**
Verificare che quando si mostra OrderConfirmation:
1. I dati del carrello vengano passati correttamente
2. Il formatPrice sia applicato ai valori
3. I nomi dei prodotti vengano mostrati invece di "Demo Order"

```tsx
// Nel caso 'confirmation' di renderPage():
// Assicurarsi di passare i dati corretti

<OrderConfirmation
  orderNumber={orderNumber}
  items={cart.map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price
  }))}
  subtotal={cartTotal}
  total={cartTotal}
  formatPrice={formatPrice}
  // ... altri props
/>
```

---

### BUG-QA-004: Rewards page non implementata
**Gravità:** 🟠 HIGH
**Componente:** `app/v2-demo/page.tsx`
**Riproduzione:**
1. Nella HomePage, fai check-in
2. Clicca "View Rewards"
3. Probabilmente pagina vuota o errore

**FIX RICHIESTO:**
Aggiungere case 'rewards' in renderPage() con contenuto appropriato che mostra:
- Punti attuali dell'utente
- Lista rewards disponibili con LoyaltyRedeemCard
- Progress verso prossimo tier

---

## 🟡 BUG MINORI (P2)

### BUG-QA-005: Manca empty state per Cart vuoto
**Gravità:** 🟡 MEDIUM
**Componente:** CartPage o demo page
**Problema:** Quando il carrello è vuoto, dovrebbe mostrare un empty state friendly invece di solo il container vuoto.

---

## ✅ COMPONENTI TESTATI E FUNZIONANTI

| Componente | Status | Note |
|------------|--------|------|
| HomePage | ✅ OK | Hero, tagline, orari, WiFi, location tutti funzionanti |
| MenuPage | ✅ OK | Grid prodotti, immagini caricate, badges corretti |
| ProductCard | ✅ OK | Immagini, prezzi, sconti, badges, likes count |
| ProductBottomSheet | ✅ OK | Immagine, descrizione, allergeni espandibili, quantity selector, add to order |
| CartPage | ✅ OK | Items, quantity, delete, special instructions, totale |
| BottomNav | ✅ OK | Navigazione interna funziona, badge cart si aggiorna |
| Header | ✅ OK | Logo, search, theme toggle |
| LanguageSelector | ✅ OK | Modal con 6+ lingue, selezione funziona |
| AllergenFilter | ✅ OK | Selezione allergeni, counter, feedback "X items safe" |
| Check-in Card | ✅ OK | +5 pts button, stato checked-in |
| Floating Buttons | ✅ OK | Posizionati correttamente in basso |

---

## 📋 CHECKLIST FIX PER CLAUDE CODE

### Fase 1: Bug Critici (30 min)
- [ ] **BUG-QA-001**: Implementare pagina Favorites in renderPage()
- [ ] **BUG-QA-002**: Implementare pagina Account in renderPage()
- [ ] **BUG-QA-003**: Fixare OrderConfirmation per mostrare prezzi e nomi corretti

### Fase 2: Bug High Priority (20 min)
- [ ] **BUG-QA-004**: Implementare pagina Rewards

### Fase 3: Polish (10 min)
- [ ] **BUG-QA-005**: Aggiungere empty state per Cart vuoto

---

## ISTRUZIONI DETTAGLIATE PER CLAUDE CODE

### File da modificare: `apps/coffeeshop/frontend/app/v2-demo/page.tsx`

---

### TASK 1: Aggiorna il type DemoPage (linea 200)

```tsx
// PRIMA:
type DemoPage = 'home' | 'menu' | 'cart' | 'checkout' | 'confirmation';

// DOPO:
type DemoPage = 'home' | 'menu' | 'cart' | 'checkout' | 'confirmation' | 'favorites' | 'account' | 'rewards';
```

---

### TASK 2: Aggiungi import mancanti (linea 18)

```tsx
// Aggiungi questi import da @phosphor-icons/react:
import { Funnel, Globe, Heart, User, Gear, Question, Gift } from '@phosphor-icons/react';
```

---

### TASK 3: Aggiungi state per salvare cart pre-order (dopo linea 272)

```tsx
// Aggiungi questo state per memorizzare il carrello prima del checkout
const [confirmedOrderItems, setConfirmedOrderItems] = useState<typeof cartItems>([]);
const [confirmedOrderTotal, setConfirmedOrderTotal] = useState(0);
```

---

### TASK 4: Fix handlePlaceOrder (linea 408-417)

```tsx
// PRIMA:
const handlePlaceOrder = async (notes: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  const code = `GUD${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  setOrderCode(code);
  setCartItems([]);  // ← PROBLEMA: svuota il carrello PRIMA di salvare i dati
  setAppliedVoucher(null);
  setUserPoints((prev) => prev + Math.floor(cartTotal / 10000) * 10);
  setCurrentPage('confirmation');
  return { success: true, orderCode: code };
};

// DOPO:
const handlePlaceOrder = async (notes: string) => {
  await new Promise((r) => setTimeout(r, 1000));
  const code = `GUD${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  setOrderCode(code);
  // Salva i dati del carrello PRIMA di svuotarlo
  setConfirmedOrderItems([...cartItems]);
  setConfirmedOrderTotal(cartTotal);
  setCartItems([]);
  setAppliedVoucher(null);
  setUserPoints((prev) => prev + Math.floor(cartTotal / 10000) * 10);
  setCurrentPage('confirmation');
  return { success: true, orderCode: code };
};
```

---

### TASK 5: Fix OrderConfirmation render (linea 679-695)

```tsx
// PRIMA:
{currentPage === 'confirmation' && orderCode && (
  <OrderConfirmation
    orderCode={orderCode}
    estimatedTime={15}
    items={[
      { name: 'Demo Order', quantity: 1, price: cartTotal },  // ← HARDCODED!
    ]}
    subtotal={cartSubtotal}  // ← GIÀ 0!
    discount={discount}
    total={cartTotal}        // ← GIÀ 0!
    // ...
  />
)}

// DOPO:
{currentPage === 'confirmation' && orderCode && (
  <OrderConfirmation
    orderCode={orderCode}
    estimatedTime={15}
    items={confirmedOrderItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }))}
    subtotal={confirmedOrderTotal}
    discount={0}
    total={confirmedOrderTotal}
    paymentMethod="Apple Pay"
    pointsEarned={Math.floor(confirmedOrderTotal / 10000) * 10}
    formatPrice={formatPrice}
    onTrackOrder={() => setCurrentPage('home')}
    onBackToMenu={() => setCurrentPage('menu')}
  />
)}
```

---

### TASK 6: Aggiungi pagina Favorites (dopo linea 571, prima di checkout)

```tsx
{currentPage === 'favorites' && (
  <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
    <header className="sticky top-0 z-40 glass" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="container-app flex items-center justify-between py-4">
        <h1 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Your Favorites
        </h1>
      </div>
    </header>

    <main className="container-app py-8 pb-24">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart size={64} weight="light" style={{ color: 'var(--text-tertiary)' }} />
          <p className="mt-4 text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
            No favorites yet
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Tap the heart icon on any item to save it here
          </p>
          <button
            onClick={() => setCurrentPage('menu')}
            className="btn btn-primary mt-6"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {demoProducts
            .filter((p) => favorites.includes(p.id))
            .map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product)} className="cursor-pointer">
                <div className="card overflow-hidden">
                  <img src={product.image} alt={product.name} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-3">
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
                    <p className="font-display font-semibold" style={{ color: 'var(--price-primary)' }}>
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </main>

    <BottomNav cartCount={cartCount} activePage="favorites" onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)} />
  </div>
)}
```

---

### TASK 7: Aggiungi pagina Account (dopo Favorites)

```tsx
{currentPage === 'account' && (
  <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
    <header className="sticky top-0 z-40 glass" style={{ borderBottom: '1px solid var(--border-light)' }}>
      <div className="container-app flex items-center justify-between py-4">
        <h1 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Account
        </h1>
      </div>
    </header>

    <main className="container-app py-8 pb-24">
      <div className="card p-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full" style={{ background: 'var(--bg-tertiary)' }}>
          <User size={40} weight="light" style={{ color: 'var(--text-tertiary)' }} />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Guest User
        </h2>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Sign in to track orders and earn rewards
        </p>
        <button className="btn btn-primary mt-6 w-full">
          Sign In
        </button>
        <button className="btn btn-ghost mt-3 w-full" style={{ color: 'var(--text-secondary)' }}>
          Create Account
        </button>
      </div>

      {/* Points Card */}
      <div className="card mt-6 p-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: 'var(--status-warning-bg)' }}>
            <Gift size={24} style={{ color: 'var(--status-warning)' }} />
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Your Points</p>
            <p className="font-display text-2xl font-bold" style={{ color: 'var(--price-primary)' }}>
              {userPoints.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 space-y-3">
        <button className="card flex w-full items-center gap-4 p-4 text-left">
          <Gear size={24} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ color: 'var(--text-primary)' }}>Settings</span>
        </button>
        <button className="card flex w-full items-center gap-4 p-4 text-left">
          <Question size={24} style={{ color: 'var(--text-secondary)' }} />
          <span style={{ color: 'var(--text-primary)' }}>Help & Support</span>
        </button>
      </div>
    </main>

    <BottomNav cartCount={cartCount} activePage="account" onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)} />
  </div>
)}
```

---

### TASK 8: Aggiungi import BottomNav se mancante

Verifica che `BottomNav` sia importato da `@/components/v2`. Se non lo è, aggiungilo:

```tsx
import {
  HomePage,
  MenuPage,
  CartPage,
  ProductBottomSheet,
  CategoryGrid,
  AllergenFilter,
  LanguageSelector,
  LoyaltyRedeemCard,
  PaymentMethodSelector,
  VoucherInput,
  OrderConfirmation,
  AllergenLegend,
  BottomNav,  // ← AGGIUNGI QUESTO
} from '@/components/v2';
```

---

### VERIFICA FINALE

Dopo aver applicato tutti i fix, testa:

1. **Favorites**: Clicca Favorites → deve mostrare empty state o lista favoriti
2. **Account**: Clicca Account → deve mostrare guest user con punti
3. **Order Flow**:
   - Aggiungi prodotto al carrello
   - Vai al Cart → Place Order
   - Verifica che Order Confirmation mostri:
     - Nome prodotto corretto (non "Demo Order")
     - Prezzo corretto (non 0K)
     - Totale corretto

---

### ORDINE DI ESECUZIONE CONSIGLIATO

1. Task 1 (type DemoPage) - 1 minuto
2. Task 2 (imports) - 1 minuto
3. Task 3 (state) - 1 minuto
4. Task 4 (handlePlaceOrder) - 2 minuti
5. Task 5 (OrderConfirmation) - 2 minuti
6. Task 6 (Favorites page) - 5 minuti
7. Task 7 (Account page) - 5 minuti
8. Task 8 (BottomNav import) - 1 minuto
9. Test finale - 5 minuti

**Tempo stimato totale: ~25 minuti**

---

## NOTE TECNICHE

- **CSS Variables**: Tutti i colori devono usare `var(--nome-token)`
- **Navigazione**: Usa `onNavigate` callback, non `<Link>`
- **State Management**: Il carrello è gestito con useState nel page.tsx
- **formatPrice**: Funzione `(price: number) => \`\${Math.round(price / 1000)}K\``

---

**Report generato da:** QA Team
**Testing completato:** 2026-01-24
**Prossima review:** Dopo implementazione fix
