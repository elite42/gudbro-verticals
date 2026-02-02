# PWA v2 Migration Guide

> **Guida architetturale** per comprendere le differenze tra v1 e v2 della PWA e come migrare componenti.

---

## Architettura a 4 Tier

La v2 introduce una separazione netta delle responsabilità:

```
Route (Server Component)
    ↓ fetch data
V2*Client (Client Component - Data Processor)
    ↓ transform + localize
Connected* (Connected Component - State + Logic)
    ↓ props + handlers
Presentational (Pure Component - UI only)
```

---

## 1. Struttura File

### v1 (Legacy)

```
app/
├── page.tsx                    # 416 righe - tutto mescolato
├── menu/
│   └── MenuClient.tsx          # 520+ righe
└── cart/page.tsx

components/
├── BottomNavLocal.tsx          # 280+ righe
├── DishCard.tsx                # Router a varianti
└── ... (80+ componenti monolitici)
```

### v2 (Nuovo)

```
app/v2/
├── page.tsx                    # 17 righe (server)
├── V2HomeClient.tsx            # 125 righe (data processor)
├── menu/
│   ├── page.tsx               # 19 righe (server)
│   └── V2MenuClient.tsx        # 125 righe (data processor)
└── cart/page.tsx

components/v2/
├── connected/                  # State + Logic
│   ├── ConnectedHomePage.tsx
│   └── ConnectedMenuPage.tsx
├── HomePage.tsx               # Pure UI
├── MenuPage.tsx               # Pure UI
├── ProductCard.tsx
└── BottomNav.tsx
```

---

## 2. Pattern Concreti

### Livello 1: Route (Server Component)

```typescript
// app/v2/menu/page.tsx
import { getMenuProductsRaw } from '@/app/actions';
import V2MenuClient from './V2MenuClient';

export default async function V2MenuPage() {
  const menuItems = await getMenuProductsRaw();  // Server fetch
  return <V2MenuClient initialMenuItems={menuItems} />;
}
```

### Livello 2: V2*Client (Data Processor)

```typescript
// app/v2/menu/V2MenuClient.tsx
export default function V2MenuClient({ initialMenuItems }: Props) {
  const { language } = useTranslation();
  const [isDark, setIsDark] = useState(false);

  // Trasforma e localizza dati
  const v2MenuItems = useMemo(() => {
    return initialMenuItems.map((item) => ({
      id: item.id,
      name: getLocalizedText(item.nameMulti, item.name, language),
      description: getLocalizedText(item.descriptionMulti, item.description, language),
      price: item.price,
      image: item.image || '',
      category: item.category || 'other',
      isVegan: item.dietary?.includes('vegan') ?? false,
    }));
  }, [initialMenuItems, language]);

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ConnectedMenuPage
        menuItems={v2MenuItems}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
      />
    </div>
  );
}
```

### Livello 3: Connected* (State + Logic)

```typescript
// components/v2/connected/ConnectedMenuPage.tsx
export function ConnectedMenuPage({
  menuItems, isDark, onThemeToggle
}: ConnectedMenuPageProps) {
  // State locale
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);

  // Tier checks
  const { isEnabled: cartEnabled } = useTierFeature('enableCart');

  // Sync con v1 stores
  useEffect(() => {
    const updateCartCount = () => setCartCount(cartStore.count());
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  useEffect(() => {
    const updateFavorites = () => setFavorites(favoritesStore.get().favoriteIds);
    updateFavorites();
    window.addEventListener('favorites-updated', updateFavorites);
    return () => window.removeEventListener('favorites-updated', updateFavorites);
  }, []);

  // Handlers tier-aware
  const handleAddToCart = useCallback((productId, quantity, extras) => {
    if (!selectedProduct || !cartEnabled) return;  // Tier check

    // Conversione v2 → v1 format
    const cartExtras = extras.map((e) => ({
      ...e,
      type: 'addon' as const,
    }));

    cartStore.add({ ...selectedProduct }, quantity, cartExtras);
    setSelectedProduct(null);
  }, [selectedProduct, cartEnabled]);

  return (
    <>
      <MenuPage
        menuItems={menuItems}
        cartCount={cartCount}
        favorites={favorites}
        onAddToCart={cartEnabled ? handleAddToCart : undefined}
        isDark={isDark}
        onThemeToggle={onThemeToggle}
      />

      {selectedProduct && (
        <ProductBottomSheet
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={cartEnabled ? handleAddToCart : undefined}
        />
      )}
    </>
  );
}
```

### Livello 4: Presentational (Pure UI)

```typescript
// components/v2/MenuPage.tsx
interface MenuPageProps {
  menuItems: MenuItem[];
  cartCount: number;
  favorites: string[];
  onProductClick: (product: MenuItem) => void;
  onFavoriteToggle: (id: string) => void;
  onAddToCart?: (productId: string, qty: number, extras: any[]) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function MenuPage({
  menuItems, cartCount, favorites, onProductClick,
  onFavoriteToggle, onAddToCart, isDark, onThemeToggle
}: MenuPageProps) {
  // Solo state UI (no business logic)
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter (pure function)
  const filteredItems = useMemo(() => {
    let items = [...menuItems];
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (searchQuery.trim()) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <Header isDark={isDark} onThemeToggle={onThemeToggle} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <ProductGrid items={filteredItems} onItemClick={onProductClick} />
      <BottomNav cartCount={cartCount} />
    </div>
  );
}
```

---

## 3. Feature Gating (Tier System)

### Hook useTierFeature

```typescript
const { isEnabled: cartEnabled } = useTierFeature('enableCart');
const { isEnabled: engagementEnabled } = useTierFeature('enableEngagementSystem');

// Uso condizionale
const handleAddToCart = useCallback((id, qty, extras) => {
  if (!cartEnabled) return;  // Early return
  // ...
}, [cartEnabled]);
```

### TierGate Component

```typescript
<TierGate feature="enableEngagementSystem">
  <CheckInCard userPoints={userPoints} />
</TierGate>
```

### BottomNav con tier check

```typescript
const navItems = [
  { id: 'home', href: '/v2', icon: House },
  { id: 'menu', href: '/v2/menu', icon: ForkKnife },
  { id: 'cart', href: '/v2/cart', icon: ShoppingBag, requiredFeature: 'enableCart' },
];

const visibleItems = navItems.filter((item) => {
  if (!item.requiredFeature) return true;
  if (item.requiredFeature === 'enableCart') return cartEnabled;
  return true;
});
```

---

## 4. Middleware Redirect

**File:** `middleware.ts`

```typescript
const V2_ROUTES: Record<string, string> = {
  '/': '/v2',
  '/menu': '/v2/menu',
  '/cart': '/v2/cart',
  '/favorites': '/v2/favorites',
};

// 1. Opt-in v2: ?use-v2=true
if (useV2Param && V2_ROUTES[pathname]) {
  const response = NextResponse.redirect(V2_ROUTES[pathname]);
  response.cookies.delete('prefer-v1');
  return response;
}

// 2. Opt-out v1: ?legacy=true
if (legacyParam) {
  const response = NextResponse.redirect(v1Url);
  response.cookies.set('prefer-v1', 'true', { maxAge: 30 * 24 * 60 * 60 });
  return response;
}

// 3. Auto-redirect se non opt-out
if (V2_ROUTES[pathname] && !preferV1Cookie) {
  return NextResponse.redirect(V2_ROUTES[pathname]);
}
```

---

## 5. Integrazione v1 Stores

### CartStore

```typescript
// Sync cart count
useEffect(() => {
  const update = () => setCartCount(cartStore.count());
  update();
  window.addEventListener('cart-updated', update);
  return () => window.removeEventListener('cart-updated', update);
}, []);

// Add to cart (v2 → v1 conversion)
const cartExtras = extras.map((e) => ({
  ...e,
  type: 'addon' as const,  // v1 richiede 'type'
}));
cartStore.add(product, quantity, cartExtras);
```

### FavoritesStore

```typescript
// Sync favorites
useEffect(() => {
  const update = () => setFavorites(favoritesStore.get().favoriteIds);
  update();
  window.addEventListener('favorites-updated', update);
  return () => window.removeEventListener('favorites-updated', update);
}, []);

// Toggle favorite
const handleFavoriteToggle = (id: string) => favoritesStore.toggle(id);
```

---

## 6. Design System

### CSS Variables (globals-v2.css)

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --interactive-primary: #dc2626;
  --status-success: #10b981;
  --border-light: #e0e0e0;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #ffffff;
}
```

### Uso in componenti

```typescript
// v2 usa CSS variables
<div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

// Dark mode via data-theme
<div data-theme={isDark ? 'dark' : 'light'}>
```

### Phosphor Icons (preferite)

```typescript
import { House, ForkKnife, Heart, ShoppingBag } from '@phosphor-icons/react';

<House size={24} weight="fill" style={{ color: 'var(--text-primary)' }} />
```

---

## 7. Checklist Migrazione Componente

```
[ ] Creare page.tsx (server) con fetch async
[ ] Creare V2*Client.tsx (data processor)
    [ ] useMemo per trasformazione dati
    [ ] useTranslation per localizzazione
    [ ] Props passate a Connected
[ ] Creare Connected*Page.tsx
    [ ] useState per state locale
    [ ] useTierFeature per feature gating
    [ ] useEffect per sync v1 stores
    [ ] Handlers tier-aware
[ ] Creare Presentational (o riusare esistente)
    [ ] Solo props-based
    [ ] Niente business logic
    [ ] Solo state UI (search, filters)
[ ] Aggiornare middleware con nuova route
[ ] Test: ?legacy=true → v1, default → v2
```

---

## 8. Tabella Comparativa

| Aspetto | v1 | v2 |
|---------|----|----|
| Struttura | Monolitico | 4-tier |
| Data Flow | Client sync | Server async |
| State | 17+ useState sparsi | Centralizzato in Connected |
| Feature Gating | Runtime checks | useTierFeature |
| Icons | Custom SVG | Phosphor |
| Styling | Tailwind inline | CSS Variables |
| Testing | Difficile | Facile (ogni tier testabile) |
| SSR | No | Si |

---

## 9. File Critici

| File | Descrizione |
|------|-------------|
| `app/v2/page.tsx` | Home server component |
| `app/v2/V2HomeClient.tsx` | Home data processor |
| `components/v2/connected/ConnectedHomePage.tsx` | Home state + logic |
| `components/v2/HomePage.tsx` | Home pure UI |
| `middleware.ts` | Redirect v1 ↔ v2 |
| `app/globals-v2.css` | CSS variables |

---

**Version:** 1.0
**Last Updated:** 2026-01-26
