'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cartStore, CartItem } from '../../lib/cart-store';
import { currencyPreferencesStore, formatConvertedPrice } from '../../lib/currency';
import { submitOrder, SubmittedOrder } from '../../lib/order-service';
import { tableContextStore } from '../../lib/table-context-store';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { HomeHeader } from '../../components/HomeHeader';
import { coffeeshopConfig } from '../../config/coffeeshop.config';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [customerNotes, setCustomerNotes] = useState('');

  // Load cart client-side only (avoid hydration mismatch)
  useEffect(() => {
    setIsClient(true);
    setCartItems(cartStore.get().items);
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(cartStore.get().items);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', handleCartUpdate);
      return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }
  }, []);

  // Listen for currency preferences changes
  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  // Format price with K notation for VND
  const formatPriceCompact = (price: number) => {
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    cartStore.updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    cartStore.remove(itemId);
  };

  const handlePlaceOrder = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const orderData = cartStore.getOrderData();
      const result = await submitOrder({
        ...orderData,
        customer_notes: customerNotes || undefined,
      });

      if (result.success) {
        setSubmittedOrder(result.order);
        cartStore.clear();
      } else {
        const errorMsg = result.error.userMessage.en;
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = cartStore.getTotal();
  const itemCount = cartStore.count();

  // Order submitted success state
  if (submittedOrder) {
    return (
      <div className="bg-theme-bg-secondary min-h-screen pb-28">
        <HomeHeader />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-6 text-8xl">✅</div>
            <h2 className="text-theme-text-primary mb-4 text-3xl font-bold">Order Submitted!</h2>
            <div className="bg-theme-bg-elevated mb-8 inline-block rounded-2xl p-6">
              <p className="text-theme-text-secondary mb-2">Your order number</p>
              <p className="text-5xl font-bold text-amber-600">{submittedOrder.order_code}</p>
            </div>
            <p className="text-theme-text-secondary mb-8">
              Your order has been sent to the kitchen.
              <br />
              We&apos;ll notify you when it&apos;s ready!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/orders')}
                className="from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover mx-auto block w-full max-w-xs rounded-2xl bg-gradient-to-r px-8 py-4 text-lg font-bold text-white shadow-lg transition-all"
              >
                Track Order Status
              </button>
              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  router.push('/menu');
                }}
                className="bg-theme-bg-tertiary text-theme-text-primary mx-auto block w-full max-w-xs rounded-2xl px-8 py-4 text-lg font-bold"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        <BottomNavLocal />
      </div>
    );
  }

  // Empty cart state
  if (!isClient || cartItems.length === 0) {
    return (
      <div className="bg-theme-bg-secondary min-h-screen pb-28">
        <HomeHeader />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="mb-6 text-8xl">🛒</div>
            <h2 className="text-theme-text-primary mb-4 text-3xl font-bold">Your order is empty</h2>
            <p className="text-theme-text-secondary mb-8">
              Add some delicious plant-based items to start your order!
            </p>
            <button
              onClick={() => router.push('/menu')}
              className="from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transform rounded-2xl bg-gradient-to-r px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              View Menu
            </button>
          </div>
        </div>

        <BottomNavLocal />
      </div>
    );
  }

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-32">
      <HomeHeader />

      {/* Hero */}
      <div className="bg-primary px-4 py-6 text-white">
        <div className="container mx-auto">
          <h1 className="mb-2 text-3xl font-bold">🍽️ Your Order</h1>
          <p className="text-lg opacity-90">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 space-y-4">
          {cartItems.map((item) => {
            const itemTotal =
              item.dish.price * item.quantity +
              item.extras.reduce((sum, extra) => sum + extra.price, 0) * item.quantity;

            return (
              <div key={item.id} className="bg-theme-bg-elevated rounded-xl p-4 shadow-md">
                <div className="flex gap-4">
                  {/* Image */}
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="h-24 w-24 flex-shrink-0 rounded-lg object-cover"
                  />

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-theme-text-primary mb-1 text-lg font-bold">
                      {item.dish.name}
                    </h3>
                    <p className="text-theme-text-secondary mb-2 text-sm">
                      {formatPriceCompact(item.dish.price)} each
                    </p>

                    {/* Extras */}
                    {item.extras.length > 0 && (
                      <div className="mb-2">
                        {item.extras.map((extra) => (
                          <div key={extra.id} className="text-theme-text-tertiary text-xs">
                            + {extra.name} ({formatPriceCompact(extra.price)})
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="bg-theme-bg-secondary flex items-center gap-2 rounded-full px-2 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="bg-theme-bg-elevated text-theme-text-primary hover:bg-theme-bg-tertiary flex h-8 w-8 items-center justify-center rounded-full font-bold transition-colors"
                        >
                          −
                        </button>
                        <span className="text-theme-text-primary min-w-[20px] text-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="bg-theme-brand-primary hover:bg-theme-brand-primary-hover flex h-8 w-8 items-center justify-center rounded-full font-bold text-white transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex-1" />

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 transition-colors hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="mt-2 text-right">
                      <span className="text-lg font-bold text-amber-700">
                        {formatPriceCompact(itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Instructions */}
        <div className="bg-theme-bg-elevated mb-4 rounded-xl p-4 shadow-md">
          <label className="text-theme-text-secondary mb-2 block text-sm font-medium">
            Special Instructions (optional)
          </label>
          <textarea
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
            placeholder="Allergies, special requests, etc."
            className="bg-theme-bg-secondary text-theme-text-primary placeholder-theme-text-tertiary w-full resize-none rounded-lg px-4 py-3"
            rows={2}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-theme-bg-elevated sticky bottom-20 rounded-xl p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-theme-text-secondary mb-1">Order Total ({itemCount} items)</p>
              <p className="text-3xl font-bold text-amber-700">{formatPriceCompact(total)}</p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover w-full transform rounded-2xl bg-gradient-to-r py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Place Order'
            )}
          </button>

          <button
            onClick={() => router.push('/menu')}
            className="bg-theme-bg-secondary text-theme-text-primary hover:bg-theme-bg-tertiary mt-3 w-full rounded-2xl py-3 font-semibold transition-colors"
          >
            Add More Items
          </button>
        </div>
      </div>

      <BottomNavLocal />
    </div>
  );
}
