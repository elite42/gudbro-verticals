'use client';

import { useState, useEffect, useCallback } from 'react';
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
  BottomNav,
} from '@/components/v2';
import { Funnel, Globe } from '@phosphor-icons/react';

// ============================================================================
// DEMO DATA
// ============================================================================

const demoProducts = [
  {
    id: '1',
    name: 'Signature Espresso',
    description: 'Rich and bold double shot espresso with notes of dark chocolate and caramel.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
    category: 'coffee',
    isPopular: true,
    isVegan: true,
    prepTime: 3,
    calories: 5,
    likesCount: 42,
    allergens: ['caffeine'],
    nutrition: { calories: 5, protein: 0, carbs: 1, fat: 0 },
  },
  {
    id: '2',
    name: 'Matcha Oat Latte',
    description: 'Ceremonial grade matcha whisked with creamy oat milk and a touch of honey.',
    price: 75000,
    originalPrice: 85000,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=300&fit=crop',
    category: 'drinks',
    isNew: true,
    isVegan: true,
    isGlutenFree: true,
    prepTime: 5,
    calories: 180,
    likesCount: 28,
    allergens: ['GF', 'VG'],
    nutrition: { calories: 180, protein: 5, carbs: 30, fat: 4 },
  },
  {
    id: '3',
    name: 'Avocado Toast',
    description: 'Sourdough topped with smashed avocado, cherry tomatoes, microgreens, and everything bagel seasoning.',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    category: 'food',
    isPopular: true,
    isBestSeller: true,
    isVegetarian: true,
    prepTime: 8,
    calories: 380,
    likesCount: 156,
    allergens: ['gluten', 'sesame'],
    extras: [
      { id: 'e1', name: 'Extra Avocado', price: 25000 },
      { id: 'e2', name: 'Poached Egg', price: 15000 },
      { id: 'e3', name: 'Smoked Salmon', price: 45000 },
    ],
    nutrition: { calories: 380, protein: 8, carbs: 35, fat: 22 },
  },
  {
    id: '4',
    name: 'Açaí Bowl',
    description: 'Frozen açaí blended with banana, topped with granola, fresh berries, coconut, and honey.',
    price: 115000,
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop',
    category: 'bowls',
    isNew: true,
    isVegan: true,
    isGlutenFree: true,
    prepTime: 6,
    calories: 420,
    likesCount: 89,
    allergens: ['VG', 'GF', 'NF'],
    nutrition: { calories: 420, protein: 6, carbs: 65, fat: 12 },
  },
  {
    id: '5',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream.',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    category: 'dessert',
    isPopular: true,
    prepTime: 2,
    calories: 450,
    likesCount: 73,
    allergens: ['dairy', 'eggs', 'gluten'],
    nutrition: { calories: 450, protein: 7, carbs: 42, fat: 28 },
  },
  {
    id: '6',
    name: 'Green Detox Smoothie',
    description: 'Spinach, kale, banana, mango, ginger, and coconut water blended to perfection.',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop',
    category: 'drinks',
    isVegan: true,
    isGlutenFree: true,
    prepTime: 4,
    calories: 180,
    likesCount: 34,
    allergens: ['VG', 'GF'],
    nutrition: { calories: 180, protein: 4, carbs: 38, fat: 2 },
  },
  {
    id: '7',
    name: 'Margherita Pizza',
    description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil.',
    price: 145000,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    category: 'food',
    isVegetarian: true,
    isSpicy: false,
    prepTime: 15,
    calories: 850,
    likesCount: 112,
    allergens: ['gluten', 'dairy'],
    nutrition: { calories: 850, protein: 32, carbs: 98, fat: 35 },
  },
  {
    id: '8',
    name: 'Cold Brew Coffee',
    description: '16-hour steeped cold brew, smooth and naturally sweet with low acidity.',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    category: 'coffee',
    isVegan: true,
    isGlutenFree: true,
    prepTime: 1,
    calories: 10,
    likesCount: 67,
    allergens: ['VG', 'GF'],
    nutrition: { calories: 10, protein: 0, carbs: 2, fat: 0 },
  },
  {
    id: '9',
    name: 'Spicy Pad Thai',
    description: 'Rice noodles stir-fried with tofu, bean sprouts, peanuts, and our house tamarind sauce.',
    price: 125000,
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop',
    category: 'food',
    isVegan: true,
    isSpicy: true,
    isGlutenFree: true,
    prepTime: 12,
    calories: 650,
    likesCount: 94,
    allergens: ['peanuts', 'soy'],
    nutrition: { calories: 650, protein: 18, carbs: 85, fat: 24 },
  },
  {
    id: '10',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop',
    category: 'dessert',
    isBestSeller: true,
    prepTime: 10,
    calories: 520,
    likesCount: 203,
    allergens: ['dairy', 'eggs', 'gluten'],
    nutrition: { calories: 520, protein: 8, carbs: 58, fat: 32 },
  },
];

const demoCategories = [
  { id: 'coffee', name: 'Coffee', icon: '☕', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' },
  { id: 'drinks', name: 'Drinks', icon: '🥤', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop' },
  { id: 'food', name: 'Food', icon: '🍽️', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
  { id: 'bowls', name: 'Bowls', icon: '🥗', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop' },
  { id: 'dessert', name: 'Dessert', icon: '🍰', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop' },
];

const demoPaymentMethods = [
  { id: 'apple_pay', type: 'apple_pay' as const, label: 'Apple Pay' },
  { id: 'google_pay', type: 'google_pay' as const, label: 'Google Pay' },
  { id: 'card_1', type: 'saved_card' as const, label: 'Visa', lastFour: '4242', brand: 'visa', isDefault: true },
  { id: 'card_2', type: 'saved_card' as const, label: 'Mastercard', lastFour: '8888', brand: 'mastercard' },
];

type DemoPage = 'home' | 'menu' | 'cart' | 'checkout' | 'confirmation' | 'favorites' | 'account';

// ============================================================================
// LOCAL STORAGE HELPERS
// ============================================================================

const STORAGE_KEYS = {
  language: 'gudbro_language',
  allergens: 'gudbro_allergens',
  favorites: 'gudbro_favorites',
  theme: 'gudbro_theme',
};

function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function V2DemoPage() {
  // Navigation
  const [currentPage, setCurrentPage] = useState<DemoPage>('home');

  // Theme
  const [isDark, setIsDark] = useState(false);

  // Product selection - using any to avoid type mismatch since this demo file will be removed in Phase 6
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Handler for product click - accepts any product type for demo flexibility
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProductClick = useCallback((product: any) => {
    setSelectedProduct(product);
  }, []);

  // User preferences (persisted)
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Cart state
  const [cartItems, setCartItems] = useState<Array<{
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    extras?: { name: string; price: number }[];
  }>>([]);

  // Checkout state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>('apple_pay');
  const [appliedVoucher, setAppliedVoucher] = useState<{
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    description: string;
  } | null>(null);

  // Order state
  const [orderCode, setOrderCode] = useState<string | null>(null);
  // FIX QA-003: Store order data before clearing cart
  const [completedOrder, setCompletedOrder] = useState<{
    items: Array<{ name: string; quantity: number; price: number }>;
    subtotal: number;
    discount: number;
    total: number;
    pointsEarned: number;
  } | null>(null);

  // Modals
  const [showAllergenFilter, setShowAllergenFilter] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Loyalty
  const [userPoints, setUserPoints] = useState(1250);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Demo user authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  // ============================================================================
  // LOAD PERSISTED STATE
  // ============================================================================

  useEffect(() => {
    setFavorites(loadFromStorage(STORAGE_KEYS.favorites, ['1', '3']));
    setSelectedAllergens(loadFromStorage(STORAGE_KEYS.allergens, []));
    setCurrentLanguage(loadFromStorage(STORAGE_KEYS.language, 'en'));
    setIsDark(loadFromStorage(STORAGE_KEYS.theme, false));
  }, []);

  // ============================================================================
  // PERSIST STATE CHANGES
  // ============================================================================

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.favorites, favorites);
  }, [favorites]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.allergens, selectedAllergens);
  }, [selectedAllergens]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.language, currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.theme, isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // ============================================================================
  // HELPERS
  // ============================================================================

  const formatPrice = (price: number) => `${Math.round(price / 1000)}K`;

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cartItems.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((e, extra) => e + extra.price, 0) || 0;
    return sum + (item.price + extrasTotal) * item.quantity;
  }, 0);

  const discount = appliedVoucher
    ? appliedVoucher.type === 'percentage'
      ? Math.floor(cartSubtotal * (appliedVoucher.value / 100))
      : appliedVoucher.value
    : 0;

  const cartTotal = cartSubtotal - discount;

  // Filter products based on allergens
  const safeProducts = selectedAllergens.length > 0
    ? demoProducts.filter((p) => {
        const productAllergens = p.allergens?.map((a) => a.toLowerCase()) || [];
        return !selectedAllergens.some((a) => productAllergens.includes(a.toLowerCase()));
      })
    : demoProducts;

  const popularItems = demoProducts.filter((p) => p.isPopular);
  const newItems = demoProducts.filter((p) => p.isNew);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (productId: string, quantity: number, extras: any[]) => {
    const product = demoProducts.find((p) => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${Date.now()}`;
    setCartItems((prev) => [
      ...prev,
      {
        id: cartItemId,
        productId,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        extras: extras.map((e) => ({ name: e.name, price: e.price })),
      },
    ]);
    setSelectedProduct(null);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyVoucher = async (code: string) => {
    // Demo voucher codes
    await new Promise((r) => setTimeout(r, 500));
    if (code === 'WELCOME10') {
      return { code, type: 'percentage' as const, value: 10, description: '10% off your order' };
    }
    if (code === 'SAVE20K') {
      return { code, type: 'fixed' as const, value: 20000, description: '20K off your order' };
    }
    return null;
  };

  const handlePlaceOrder = async (notes: string) => {
    await new Promise((r) => setTimeout(r, 1000));
    const code = `GUD${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // FIX QA-003: Save order data BEFORE clearing cart
    const orderItems = cartItems.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: (item.price + (item.extras?.reduce((e, extra) => e + extra.price, 0) || 0)) * item.quantity,
    }));
    const pointsEarned = Math.floor(cartTotal / 10000) * 10;

    setCompletedOrder({
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discount,
      total: cartTotal,
      pointsEarned,
    });

    setOrderCode(code);
    setCartItems([]);
    setAppliedVoucher(null);
    setUserPoints((prev) => prev + pointsEarned);
    setCurrentPage('confirmation');
    return { success: true, orderCode: code };
  };

  const handleRedeemPoints = async (points: number) => {
    await new Promise((r) => setTimeout(r, 500));
    setUserPoints((prev) => prev - points);
    const value = Math.floor(points * 10); // 10 VND per point
    setAppliedVoucher({
      code: 'POINTS',
      type: 'fixed',
      value,
      description: `${points} points redeemed`,
    });
    return true;
  };

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setUserPoints((prev) => prev + 50);
  };

  const handleCategorySelect = (category: { id: string }) => {
    setCurrentPage('menu');
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      {/* Demo Page Switcher (desktop only) */}
      <div
        className="fixed bottom-24 left-1/2 z-[100] hidden -translate-x-1/2 items-center gap-1 rounded-full p-1 shadow-lg md:flex"
        style={{ background: 'var(--surface-card)', border: '1px solid var(--border-medium)' }}
      >
        <span className="px-3 py-1.5 text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
          Demo:
        </span>
        {(['home', 'menu', 'cart', 'checkout'] as const).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className="rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors"
            style={{
              background: currentPage === page ? 'var(--interactive-primary)' : 'transparent',
              color: currentPage === page ? 'var(--text-inverse)' : 'var(--text-secondary)',
            }}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Quick Actions Bar (mobile) - FIX V-003: moved lower to avoid overlap with cards */}
      <div
        className="fixed bottom-28 right-4 z-50 flex flex-col gap-2 md:hidden"
      >
        {/* Language */}
        <button
          onClick={() => setShowLanguageSelector(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-medium)' }}
        >
          <Globe size={20} style={{ color: 'var(--text-secondary)' }} />
        </button>

        {/* Allergen Filter */}
        <button
          onClick={() => setShowAllergenFilter(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
          style={{ background: 'var(--surface-card)', border: '1px solid var(--border-medium)' }}
        >
          <Funnel size={20} style={{ color: 'var(--text-secondary)' }} />
          {selectedAllergens.length > 0 && (
            <span
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
              style={{ background: 'var(--interactive-primary)', color: 'var(--text-inverse)' }}
            >
              {selectedAllergens.length}
            </span>
          )}
        </button>
      </div>

      {/* Pages */}
      {currentPage === 'home' && (
        <>
          <HomePage
            merchantName="ROOTS Café"
            tagline="Fresh, local, delicious"
            heroImage="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=450&fit=crop"
            popularItems={popularItems}
            newItems={newItems}
            openingHours={{ today: '7:00 AM - 9:00 PM', isOpen: true }}
            wifiPassword="roots2024"
            address="123 Le Loi Street, Da Nang"
            phone="+84 123 456 789"
            onProductClick={handleProductClick}
            onThemeToggle={() => setIsDark(!isDark)}
            isDark={isDark}
            cartCount={cartCount}
            formatPrice={formatPrice}
            userPoints={userPoints}
            isCheckedIn={isCheckedIn}
            onCheckIn={handleCheckIn}
            activePage={currentPage}
            onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)}
          />

          {/* Category Grid Section */}
          <div className="container-app pb-24">
            <h2
              className="mb-4 px-4 font-display text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Browse Categories
            </h2>
            <CategoryGrid
              categories={demoCategories}
              onSelect={handleCategorySelect}
            />
          </div>
        </>
      )}

      {currentPage === 'menu' && (
        <MenuPage
          merchantName="ROOTS Café"
          menuItems={safeProducts}
          categories={demoCategories}
          onProductClick={handleProductClick}
          onThemeToggle={() => setIsDark(!isDark)}
          isDark={isDark}
          cartCount={cartCount}
          formatPrice={formatPrice}
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
          activePage={currentPage}
          onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)}
        />
      )}

      {currentPage === 'cart' && (
        <CartPage
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          onRemoveItem={handleRemoveItem}
          onPlaceOrder={handlePlaceOrder}
          formatPrice={formatPrice}
          merchantName="ROOTS Café"
          onThemeToggle={() => setIsDark(!isDark)}
          isDark={isDark}
          activePage={currentPage}
          onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)}
        />
      )}

      {/* FIX QA-001: Favorites page */}
      {currentPage === 'favorites' && (
        <div className="min-h-screen pb-24" style={{ background: 'var(--bg-primary)' }}>
          <header
            className="sticky top-0 z-40 glass"
            style={{ borderBottom: '1px solid var(--border-light)' }}
          >
            <div className="container-app py-4">
              <h1
                className="font-display text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Your Favorites
              </h1>
            </div>
          </header>
          <main className="container-app py-6">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {demoProducts
                  .filter((p) => favorites.includes(p.id))
                  .map((product) => (
                    <div key={product.id} className="cursor-pointer" onClick={() => handleProductClick(product)}>
                      <div className="card overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="aspect-square w-full object-cover"
                        />
                        <div className="p-3">
                          <h3 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                            {product.name}
                          </h3>
                          <p className="font-display font-semibold" style={{ color: 'var(--price-primary)' }}>
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <span className="text-4xl">❤️</span>
                </div>
                <h2 className="mb-2 font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  No favorites yet
                </h2>
                <p className="mb-6 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Tap the heart icon on products to save them here
                </p>
                <button
                  onClick={() => setCurrentPage('menu')}
                  className="btn btn-primary"
                >
                  Browse Menu
                </button>
              </div>
            )}
          </main>
          <BottomNav cartCount={cartCount} activePage={currentPage} onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)} />
        </div>
      )}

      {/* FIX QA-002: Account page */}
      {currentPage === 'account' && (
        <div className="min-h-screen pb-24" style={{ background: 'var(--bg-primary)' }}>
          <header
            className="sticky top-0 z-40 glass"
            style={{ borderBottom: '1px solid var(--border-light)' }}
          >
            <div className="container-app py-4">
              <h1
                className="font-display text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Account
              </h1>
            </div>
          </header>
          <main className="container-app py-6 space-y-6">
            {/* User Profile Card */}
            <div className="card p-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
                  style={{ background: 'var(--interactive-primary)', color: 'white' }}
                >
                  {isLoggedIn ? userName.charAt(0).toUpperCase() : 'G'}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {isLoggedIn ? userName : 'Guest User'}
                  </h2>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    {isLoggedIn ? userEmail : 'Sign in to save your favorites & orders'}
                  </p>
                </div>
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserName('');
                      setUserEmail('');
                    }}
                    className="text-sm font-medium"
                    style={{ color: 'var(--status-error)' }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>

            {/* Points Card */}
            <div
              className="card p-4"
              style={{ background: 'linear-gradient(135deg, var(--brand-warm) 0%, var(--interactive-primary) 100%)' }}
            >
              <p className="text-sm text-white/80">Your Points</p>
              <p className="font-display text-3xl font-bold text-white">{userPoints}</p>
              <p className="mt-1 text-sm text-white/80">Worth {formatPrice(userPoints * 10)}</p>
            </div>

            {/* Menu Items */}
            <div className="card overflow-hidden">
              {[
                { label: 'Order History', icon: '📋' },
                { label: 'Payment Methods', icon: '💳' },
                { label: 'Addresses', icon: '📍' },
                { label: 'Notifications', icon: '🔔' },
                { label: 'Help & Support', icon: '❓' },
              ].map((item, index) => (
                <button
                  key={item.label}
                  className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-black/5"
                  style={{ borderTop: index > 0 ? '1px solid var(--border-light)' : undefined }}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="flex-1 font-medium" style={{ color: 'var(--text-primary)' }}>
                    {item.label}
                  </span>
                  <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                </button>
              ))}
            </div>

            {/* Sign In Button - only show when not logged in */}
            {!isLoggedIn && (
              <button
                onClick={() => {
                  // Demo: simulate login with fake user
                  setIsLoggedIn(true);
                  setUserName('Marco Rossi');
                  setUserEmail('marco.rossi@demo.com');
                  setUserPoints((prev) => prev + 100); // Bonus points for signing up
                }}
                className="btn btn-primary w-full"
              >
                Sign In / Create Account
              </button>
            )}

            {/* Logged in: show tier info */}
            {isLoggedIn && (
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Member Tier</p>
                    <p className="font-display text-lg font-bold" style={{ color: 'var(--price-primary)' }}>
                      🥇 Gold Member
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Next tier in</p>
                    <p className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                      750 pts
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: '62%', background: 'var(--interactive-primary)' }}
                  />
                </div>
              </div>
            )}
          </main>
          <BottomNav cartCount={cartCount} activePage={currentPage} onNavigate={(pageId) => setCurrentPage(pageId as DemoPage)} />
        </div>
      )}

      {currentPage === 'checkout' && (
        <div className="min-h-screen pb-32" style={{ background: 'var(--bg-primary)' }}>
          <header
            className="sticky top-0 z-40 glass"
            style={{ borderBottom: '1px solid var(--border-light)' }}
          >
            <div className="container-app py-4">
              <h1
                className="font-display text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Checkout
              </h1>
            </div>
          </header>

          <main className="container-app space-y-6 py-4">
            {/* Loyalty Points */}
            <LoyaltyRedeemCard
              points={userPoints}
              pointsValue={userPoints * 10}
              tier="gold"
              nextTier="platinum"
              pointsToNextTier={750}
              onRedeem={handleRedeemPoints}
              formatPrice={formatPrice}
            />

            {/* Voucher */}
            <div>
              <h3
                className="mb-3 font-display font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Promo Code
              </h3>
              <VoucherInput
                onApply={handleApplyVoucher}
                onRemove={() => setAppliedVoucher(null)}
                appliedVoucher={appliedVoucher}
                formatPrice={formatPrice}
              />
              <p className="mt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Try: WELCOME10 or SAVE20K
              </p>
            </div>

            {/* Payment Methods */}
            <div>
              <h3
                className="mb-3 font-display font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Payment Method
              </h3>
              <PaymentMethodSelector
                methods={demoPaymentMethods}
                selectedMethodId={selectedPaymentMethod}
                onSelect={setSelectedPaymentMethod}
                showCrypto={true}
                onCryptoSelect={() => alert('Crypto payment modal would open here')}
              />
            </div>

            {/* Order Summary */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-tertiary)' }}>Subtotal</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{formatPrice(cartSubtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--status-success)' }}>Discount</span>
                    <span style={{ color: 'var(--status-success)' }}>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-display text-lg font-bold" style={{ borderColor: 'var(--border-light)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Total</span>
                  <span style={{ color: 'var(--price-primary)' }}>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </main>

          {/* Place Order Button */}
          <div
            className="fixed bottom-0 left-0 right-0 z-40 border-t p-4 glass"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <button
              onClick={() => handlePlaceOrder('')}
              disabled={!selectedPaymentMethod}
              className="w-full rounded-full py-4 text-base font-semibold text-white disabled:opacity-50"
              style={{ background: 'var(--interactive-primary)' }}
            >
              Pay {formatPrice(cartTotal)}
            </button>
          </div>
        </div>
      )}

      {currentPage === 'confirmation' && orderCode && completedOrder && (
        <OrderConfirmation
          orderCode={orderCode}
          estimatedTime={15}
          items={completedOrder.items}
          subtotal={completedOrder.subtotal}
          discount={completedOrder.discount}
          total={completedOrder.total}
          paymentMethod="Apple Pay"
          pointsEarned={completedOrder.pointsEarned}
          formatPrice={formatPrice}
          onTrackOrder={() => setCurrentPage('home')}
          onBackToMenu={() => setCurrentPage('menu')}
        />
      )}

      {/* Product Bottom Sheet */}
      <ProductBottomSheet
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        formatPrice={formatPrice}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onFavoriteToggle={handleFavoriteToggle}
      />

      {/* Allergen Filter Modal */}
      <AllergenFilter
        isOpen={showAllergenFilter}
        onClose={() => setShowAllergenFilter(false)}
        selectedAllergens={selectedAllergens}
        onApply={setSelectedAllergens}
        safeItemsCount={safeProducts.length}
        totalItemsCount={demoProducts.length}
      />

      {/* Language Selector Modal */}
      <LanguageSelector
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        variant="modal"
        isOpen={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
      />
    </>
  );
}
