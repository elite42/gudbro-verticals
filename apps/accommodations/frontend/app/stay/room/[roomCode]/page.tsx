'use client';

import { useState, useCallback } from 'react';
import { useRoomSession } from '@/hooks/useRoomSession';
import { useServiceCart } from '@/hooks/useServiceCart';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import type { ServiceCategoryWithItems, AccessSettings } from '@/types/stay';
import { ACCESS_PRESETS } from '@/types/stay';

import WifiCard from '@/components/stay/WifiCard';
import CheckoutInfo from '@/components/stay/CheckoutInfo';
import ContactSheet from '@/components/stay/ContactSheet';
import RestaurantSection from '@/components/stay/RestaurantSection';
import ServicesCarousel from '@/components/stay/ServicesCarousel';
import ActiveOrders from '@/components/stay/ActiveOrders';
import CartFAB from '@/components/stay/CartFAB';
import CartDrawer from '@/components/stay/CartDrawer';
import InlineVerification from '@/components/stay/InlineVerification';

/**
 * Room QR Dashboard - Progressive Authentication
 *
 * Renders when guest scans a permanent room QR code.
 * Browse tier: Shows WiFi, property info, contacts, house rules, and services (view-only).
 * Full tier: After inline verification, enables ordering, cart, and active orders.
 */
export default function RoomDashboard({ params }: { params: { roomCode: string } }) {
  const {
    token,
    stay,
    isLoading,
    hasActiveBooking,
    accessTier,
    accessSettings,
    error,
    upgradeSession,
  } = useRoomSession(params.roomCode);

  // Verification modal state
  const [showVerification, setShowVerification] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Cart state (only used in full tier, but initialized always for hook rules)
  const cart = useServiceCart();
  const [showCart, setShowCart] = useState(false);

  // Service categories from carousel (used to determine currency)
  const [serviceCategories, setServiceCategories] = useState<ServiceCategoryWithItems[]>([]);
  const [serviceTimezone, setServiceTimezone] = useState('UTC');

  const handleCategoriesLoaded = useCallback(
    (categories: ServiceCategoryWithItems[], timezone: string) => {
      setServiceCategories(categories);
      setServiceTimezone(timezone);
    },
    []
  );

  // Order polling (only when full tier with a booking code)
  const bookingCode = accessTier === 'full' && stay?.booking ? stay.booking.code : '';
  const { orders, refetch: refetchOrders } = useOrderPolling({
    bookingCode,
    token: token ?? '',
    enabled: accessTier === 'full' && !!bookingCode,
  });

  /**
   * Gate paid actions behind verification.
   * If already full tier, executes immediately.
   * If browse tier, stores the action and opens verification modal.
   */
  const requireFullTier = useCallback(
    (action: () => void) => {
      if (accessTier === 'full') {
        action();
      } else {
        setPendingAction(() => action);
        setShowVerification(true);
      }
    },
    [accessTier]
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#E07A5F] border-t-transparent" />
          <p className="text-sm text-[#8B7355]">Loading room information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !stay) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-4">
        <div className="max-w-sm text-center">
          <div className="mb-4 text-4xl">&#128269;</div>
          <h1 className="mb-2 text-lg font-semibold text-[#2D2016]">Room Not Found</h1>
          <p className="mb-4 text-sm text-[#8B7355]">
            {error ||
              'We could not find information for this room. Please scan the QR code in your room.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-medium text-[#3D8B87] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const { property, room, wifi, booking } = stay;
  const hostPhone = property.contactWhatsapp || property.contactPhone || '';
  const propertyCurrency = serviceCategories[0]?.items[0]?.currency ?? 'EUR';
  const isFullTier = accessTier === 'full';

  /**
   * Check if a specific action is gated (requires verification).
   * Returns false when: already full tier, or owner set action as free (false).
   * Returns true when: browse tier AND action is gated in access_settings.
   * Legacy properties (no access_settings): fall back to standard preset behavior.
   */
  const effectiveActions = accessSettings?.actions ?? ACCESS_PRESETS.standard.actions;
  function isActionGated(action: keyof AccessSettings['actions']): boolean {
    if (isFullTier) return false; // Already verified, nothing gated
    return effectiveActions[action] ?? true; // true = gated = needs verification
  }

  // Whether any action is gated (used to show/hide verify prompt)
  const hasAnyGatedAction = Object.values(effectiveActions).some((v) => v);

  // Property info page (no active booking)
  if (!hasActiveBooking) {
    return (
      <div className="min-h-screen bg-[#FAF8F5]">
        {/* Header with property name */}
        <div className="border-b border-[#E8E2D9] bg-white px-4 py-4">
          <h1 className="text-lg font-semibold text-[#2D2016]">{property.name}</h1>
          <p className="mt-0.5 text-sm text-[#8B7355]">
            Room {room.number}
            {room.name ? ` \u00b7 ${room.name}` : ''}
          </p>
        </div>

        <div className="pb-24">
          {/* WiFi card - always shown */}
          <WifiCard wifi={wifi} />

          {/* Property description */}
          {property.description && (
            <section className="mb-5 px-4">
              <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
                <h2 className="mb-2 text-sm font-semibold text-[#2D2016]">About</h2>
                <p className="text-sm text-[#8B7355]">{property.description}</p>
              </div>
            </section>
          )}

          {/* House rules + checkout time */}
          <CheckoutInfo checkoutTime={property.checkoutTime} houseRules={property.houseRules} />

          {/* Contact host */}
          {hostPhone && (
            <ContactSheet
              phone={hostPhone}
              whatsapp={property.contactWhatsapp}
              roomNumber={room.number}
              propertyName={property.name}
            />
          )}

          {/* F&B link if available */}
          {property.hasLinkedFnb && property.linkedFnbSlug && (
            <RestaurantSection
              hasLinkedFnb={true}
              linkedFnbSlug={property.linkedFnbSlug}
              bookingCode=""
              token=""
            />
          )}
        </div>
      </div>
    );
  }

  // Active booking dashboard (browse or full tier)
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header - shows guest name in full tier, property name in browse tier */}
      <div className="border-b border-[#E8E2D9] bg-white px-4 py-4">
        {isFullTier && booking ? (
          <>
            <h1 className="text-lg font-semibold text-[#2D2016]">
              Welcome, {booking.guestName.split(' ')[0]}
            </h1>
            <p className="mt-0.5 text-sm text-[#8B7355]">
              {property.name} &middot; Room {room.number}
              {room.name ? ` \u00b7 ${room.name}` : ''}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-lg font-semibold text-[#2D2016]">Welcome to {property.name}</h1>
            <p className="mt-0.5 text-sm text-[#8B7355]">
              Room {room.number}
              {room.name ? ` \u00b7 ${room.name}` : ''}
            </p>
          </>
        )}
        {booking && (
          <p className="mt-1 text-xs text-[#8B7355]/70">
            {booking.checkIn} &mdash; {booking.checkOut}
          </p>
        )}
      </div>

      {/* WiFi card - prominent, first thing guest needs */}
      <WifiCard wifi={wifi} />

      {/* Services carousel - visible in both tiers
          In browse tier: cart prop triggers verification via requireFullTier
          In full tier: cart works normally with booking code */}
      {booking && token && (
        <ServicesCarousel
          bookingCode={isFullTier ? booking.code : booking.code}
          token={token}
          cart={
            isFullTier || !isActionGated('order_service')
              ? cart
              : {
                  // Wrap cart methods to gate behind verification in browse tier
                  ...cart,
                  addItem: (item) => {
                    requireFullTier(() => cart.addItem(item));
                  },
                }
          }
          onCategoriesLoaded={handleCategoriesLoaded}
        />
      )}

      {/* Active orders - visible when full tier OR view_orders is not gated */}
      {(isFullTier || !isActionGated('view_orders')) && (
        <ActiveOrders orders={orders} currency={propertyCurrency} />
      )}

      {/* House rules + checkout time */}
      <CheckoutInfo checkoutTime={property.checkoutTime} houseRules={property.houseRules} />

      {/* Property description */}
      {property.description && (
        <section className="mb-5 px-4">
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold text-[#2D2016]">About</h2>
            <p className="text-sm text-[#8B7355]">{property.description}</p>
          </div>
        </section>
      )}

      {/* Contact host */}
      {hostPhone && (
        <ContactSheet
          phone={hostPhone}
          whatsapp={property.contactWhatsapp}
          roomNumber={room.number}
          propertyName={property.name}
        />
      )}

      {/* F&B link */}
      {property.hasLinkedFnb && property.linkedFnbSlug && (
        <RestaurantSection
          hasLinkedFnb={true}
          linkedFnbSlug={property.linkedFnbSlug}
          bookingCode={isFullTier && booking ? booking.code : ''}
          token={isFullTier && token ? token : ''}
        />
      )}

      {/* Browse tier: gentle verify prompt — only when at least one action is gated */}
      {!isFullTier && hasAnyGatedAction && (
        <section className="mb-5 px-4">
          <button
            onClick={() => setShowVerification(true)}
            className="w-full rounded-2xl border border-[#3D8B87]/20 bg-[#3D8B87]/5 p-4 text-center transition-colors hover:bg-[#3D8B87]/10"
          >
            <p className="text-sm font-medium text-[#3D8B87]">
              Verify your booking to order room service
            </p>
            <p className="mt-1 text-xs text-[#8B7355]">
              Quick verification with your{' '}
              {stay.verificationMethod === 'pin' ? 'room PIN' : 'last name'}
            </p>
          </button>
        </section>
      )}

      {/* Cart FAB + drawer - full tier only */}
      {isFullTier && (
        <>
          <CartFAB itemCount={cart.itemCount} onClick={() => setShowCart(true)} />
          {showCart && booking && token && (
            <CartDrawer
              cart={cart}
              bookingCode={booking.code}
              token={token}
              currency={propertyCurrency}
              timezone={serviceTimezone}
              onClose={() => setShowCart(false)}
              onOrderPlaced={() => {
                refetchOrders();
                setShowCart(false);
              }}
            />
          )}
        </>
      )}

      {/* Inline verification modal */}
      <InlineVerification
        isOpen={showVerification}
        onClose={() => {
          setShowVerification(false);
          setPendingAction(null);
        }}
        onVerified={() => {
          setShowVerification(false);
          if (pendingAction) {
            setTimeout(() => {
              pendingAction();
              setPendingAction(null);
            }, 100);
          }
        }}
        verificationMethod={stay.verificationMethod || 'last_name'}
        upgradeSession={upgradeSession}
      />
    </div>
  );
}
