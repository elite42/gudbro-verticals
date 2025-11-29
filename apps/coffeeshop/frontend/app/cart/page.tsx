'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cartStore, CartItem } from '../../lib/cart-store';
import { currencyPreferencesStore } from '../../lib/currency-preferences';
import { formatConvertedPrice } from '../../lib/currency-converter';
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

      setSubmittedOrder(result);
      cartStore.clear();
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
      <div className="min-h-screen bg-theme-bg-secondary pb-28">
        <HomeHeader />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-theme-text-primary mb-4">
              Order Submitted!
            </h2>
            <div className="bg-theme-bg-elevated rounded-2xl p-6 mb-8 inline-block">
              <p className="text-theme-text-secondary mb-2">Your order number</p>
              <p className="text-5xl font-bold text-amber-600">{submittedOrder.order_code}</p>
            </div>
            <p className="text-theme-text-secondary mb-8">
              Your order has been sent to the kitchen.<br />
              We&apos;ll notify you when it&apos;s ready!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/orders')}
                className="w-full max-w-xs mx-auto bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transition-all block"
              >
                Track Order Status
              </button>
              <button
                onClick={() => {
                  setSubmittedOrder(null);
                  router.push('/menu');
                }}
                className="w-full max-w-xs mx-auto bg-theme-bg-tertiary text-theme-text-primary px-8 py-4 rounded-2xl font-bold text-lg block"
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
      <div className="min-h-screen bg-theme-bg-secondary pb-28">
        <HomeHeader />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-8xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-theme-text-primary mb-4">
              Your order is empty
            </h2>
            <p className="text-theme-text-secondary mb-8">
              Add some delicious plant-based items to start your order!
            </p>
            <button
              onClick={() => router.push('/menu')}
              className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transition-all transform hover:scale-105"
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
    <div className="min-h-screen bg-theme-bg-secondary pb-32">
      <HomeHeader />

      {/* Hero */}
      <div className="bg-primary text-white py-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">🍽️ Your Order</h1>
          <p className="text-lg opacity-90">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => {
            const itemTotal = item.dish.price * item.quantity +
              item.extras.reduce((sum, extra) => sum + extra.price, 0) * item.quantity;

            return (
              <div key={item.id} className="bg-theme-bg-elevated rounded-xl shadow-md p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <img
                    src={item.dish.image}
                    alt={item.dish.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-theme-text-primary mb-1">
                      {item.dish.name}
                    </h3>
                    <p className="text-sm text-theme-text-secondary mb-2">
                      {formatPriceCompact(item.dish.price)} each
                    </p>

                    {/* Extras */}
                    {item.extras.length > 0 && (
                      <div className="mb-2">
                        {item.extras.map((extra) => (
                          <div key={extra.id} className="text-xs text-theme-text-tertiary">
                            + {extra.name} ({formatPriceCompact(extra.price)})
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-theme-bg-secondary rounded-full px-2 py-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-theme-bg-elevated rounded-full font-bold text-theme-text-primary hover:bg-theme-bg-tertiary transition-colors flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-bold text-theme-text-primary min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-theme-brand-primary rounded-full font-bold text-white hover:bg-theme-brand-primary-hover transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex-1" />

                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="mt-2 text-right">
                      <span className="font-bold text-amber-700 text-lg">
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
        <div className="bg-theme-bg-elevated rounded-xl shadow-md p-4 mb-4">
          <label className="block text-sm font-medium text-theme-text-secondary mb-2">
            Special Instructions (optional)
          </label>
          <textarea
            value={customerNotes}
            onChange={(e) => setCustomerNotes(e.target.value)}
            placeholder="Allergies, special requests, etc."
            className="w-full px-4 py-3 bg-theme-bg-secondary rounded-lg text-theme-text-primary placeholder-theme-text-tertiary resize-none"
            rows={2}
          />
        </div>

        {/* Order Summary */}
        <div className="bg-theme-bg-elevated rounded-xl shadow-lg p-6 sticky bottom-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-theme-text-secondary mb-1">Order Total ({itemCount} items)</p>
              <p className="text-3xl font-bold text-amber-700">
                {formatPriceCompact(total)}
              </p>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Place Order'
            )}
          </button>

          <button
            onClick={() => router.push('/menu')}
            className="w-full mt-3 bg-theme-bg-secondary text-theme-text-primary py-3 rounded-2xl font-semibold hover:bg-theme-bg-tertiary transition-colors"
          >
            Add More Items
          </button>
        </div>
      </div>

      <BottomNavLocal />
    </div>
  );
}
