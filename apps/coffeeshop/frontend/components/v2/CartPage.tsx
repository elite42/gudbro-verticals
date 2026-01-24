'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Minus,
  Plus,
  Trash,
  ArrowLeft,
  ShoppingBag,
  Notepad,
  CheckCircle,
  SpinnerGap,
} from '@phosphor-icons/react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  extras?: { name: string; price: number }[];
  notes?: string;
}

interface CartPageProps {
  items: CartItem[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onPlaceOrder: (notes: string) => Promise<{ success: boolean; orderCode?: string }>;
  formatPrice: (price: number) => string;
  merchantName: string;
  merchantLogo?: string;
  onThemeToggle: () => void;
  isDark: boolean;
  // Navigation (for demo mode) - FIX V-001
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

export function CartPage({
  items,
  onQuantityChange,
  onRemoveItem,
  onPlaceOrder,
  formatPrice,
  merchantName,
  merchantLogo,
  onThemeToggle,
  isDark,
  activePage,
  onNavigate,
}: CartPageProps) {
  const router = useRouter();
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<{ code: string } | null>(null);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const extrasTotal = item.extras?.reduce((e, extra) => e + extra.price, 0) || 0;
    return sum + (item.price + extrasTotal) * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await onPlaceOrder(orderNotes);
      if (result.success && result.orderCode) {
        setOrderSuccess({ code: result.orderCode });
      }
    } catch (error) {
      console.error('Order failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (orderSuccess) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Header
          merchantName={merchantName}
          merchantLogo={merchantLogo}
          showSearch={false}
          onThemeToggle={onThemeToggle}
          isDark={isDark}
        />

        <main className="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CheckCircle size={80} weight="fill" style={{ color: 'var(--status-success)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <h1
              className="font-display text-3xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Order Placed!
            </h1>
            <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
              Your order has been sent to the kitchen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card mt-8 p-6"
          >
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Order Number
            </p>
            <p
              className="font-display mt-1 text-4xl font-bold"
              style={{ color: 'var(--brand-warm)' }}
            >
              {orderSuccess.code}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col gap-3"
          >
            <button onClick={() => router.push('/orders')} className="btn btn-primary">
              Track Order Status
            </button>
            <button
              onClick={() => (onNavigate ? onNavigate('menu') : router.push('/menu'))}
              className="btn btn-ghost"
            >
              Back to Menu
            </button>
          </motion.div>
        </main>

        <BottomNav cartCount={0} activePage={activePage} onNavigate={onNavigate} />
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Header
          merchantName={merchantName}
          merchantLogo={merchantLogo}
          showSearch={false}
          onThemeToggle={onThemeToggle}
          isDark={isDark}
        />

        <main className="container-app flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <ShoppingBag size={64} style={{ color: 'var(--text-tertiary)' }} />
          <h2
            className="font-display mt-4 text-2xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Your cart is empty
          </h2>
          <p className="mt-2" style={{ color: 'var(--text-tertiary)' }}>
            Add some delicious items to get started
          </p>
          <button
            onClick={() => (onNavigate ? onNavigate('menu') : router.push('/menu'))}
            className="btn btn-primary mt-6"
          >
            Browse Menu
          </button>
        </main>

        <BottomNav cartCount={0} activePage={activePage} onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Simple header with back button */}
      <header
        className="glass sticky top-0 z-40"
        style={{ borderBottom: '1px solid var(--border-light)' }}
      >
        <div className="container-app flex items-center gap-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <ArrowLeft size={20} style={{ color: 'var(--text-primary)' }} />
          </button>
          <div>
            <h1
              className="font-display text-xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              Your Order
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>
      </header>

      <main className="container-app py-4 pb-48">
        {/* Cart items */}
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => {
              const extrasTotal = item.extras?.reduce((sum, e) => sum + e.price, 0) || 0;
              const itemTotal = (item.price + extrasTotal) * item.quantity;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="card overflow-hidden"
                >
                  <div className="flex gap-4 p-4">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-display font-medium leading-tight"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.name}
                      </h3>

                      {/* Extras */}
                      {item.extras && item.extras.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {item.extras.map((extra, idx) => (
                            <p
                              key={idx}
                              className="text-xs"
                              style={{ color: 'var(--text-tertiary)' }}
                            >
                              + {extra.name}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Quantity controls */}
                      <div className="mt-3 flex items-center justify-between">
                        <div
                          className="flex items-center gap-3 rounded-full px-1 py-1"
                          style={{ background: 'var(--bg-secondary)' }}
                        >
                          <button
                            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                            style={{
                              background: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                            }}
                          >
                            <Minus size={14} weight="bold" />
                          </button>
                          <span
                            className="min-w-[1.5rem] text-center font-semibold"
                            style={{ color: 'var(--text-primary)' }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                            style={{
                              background: 'var(--interactive-primary)',
                              color: 'var(--text-inverse)',
                            }}
                          >
                            <Plus size={14} weight="bold" />
                          </button>
                        </div>

                        <p
                          className="font-display text-lg font-semibold"
                          style={{ color: 'var(--price-primary)' }}
                        >
                          {formatPrice(itemTotal)}
                        </p>
                      </div>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="self-start p-2"
                      style={{ color: 'var(--status-error)' }}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Order notes */}
        <div className="mt-6">
          <label
            className="mb-2 flex items-center gap-2 text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Notepad size={16} />
            Special Instructions
          </label>
          <textarea
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
            placeholder="Allergies, special requests..."
            rows={2}
            className="w-full resize-none rounded-xl p-4 text-sm"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-medium)',
            }}
          />
        </div>
      </main>

      {/* Sticky footer */}
      <div
        className="glass fixed bottom-0 left-0 right-0 z-40 border-t"
        style={{
          borderColor: 'var(--border-light)',
          paddingBottom: 'calc(var(--spacing-nav) + var(--safe-area-bottom))',
        }}
      >
        <div className="container-app py-4">
          {/* Summary */}
          <div className="mb-4 flex items-center justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Total ({itemCount} items)</span>
            <span
              className="font-display text-2xl font-bold"
              style={{ color: 'var(--price-primary)' }}
            >
              {formatPrice(subtotal)}
            </span>
          </div>

          {/* Place order button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary w-full py-4 text-base disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <SpinnerGap size={20} className="animate-spin" />
                Placing Order...
              </>
            ) : (
              <>
                <ShoppingBag size={20} weight="fill" />
                Place Order
              </>
            )}
          </button>

          {/* Add more items */}
          <button
            onClick={() => (onNavigate ? onNavigate('menu') : router.push('/menu'))}
            className="btn btn-ghost mt-2 w-full"
          >
            Add More Items
          </button>
        </div>
      </div>
    </div>
  );
}
