'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRoomSession } from '@/hooks/useRoomSession';
import { useServiceCart } from '@/hooks/useServiceCart';
import { useOrderPolling } from '@/hooks/useOrderPolling';
import { fetchDocuments } from '@/lib/stay-api';
import type { ServiceCategoryWithItems, AccessSettings, GuestDocument } from '@/types/stay';
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
import DocumentUpload from '@/components/stay/DocumentUpload';
import VisaExpiryAlert from '@/components/stay/VisaExpiryAlert';

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
  const [showContact, setShowContact] = useState(false);

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

  // Document state (full tier only)
  const [documents, setDocuments] = useState<GuestDocument[]>([]);
  const [showUpload, setShowUpload] = useState(false);

  const loadDocuments = useCallback(async () => {
    if (!bookingCode || !token || accessTier !== 'full') return;
    const { data } = await fetchDocuments(bookingCode, token);
    if (data?.documents) setDocuments(data.documents);
  }, [bookingCode, token, accessTier]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  // Find latest active visa document
  const activeVisa = documents.find((d) => d.documentType === 'visa' && !d.supersededBy);

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

          {/* Contact host trigger */}
          {hostPhone && (
            <section className="mb-5 px-4">
              <button
                onClick={() => setShowContact(true)}
                className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76] p-4 transition-all active:scale-[0.98]"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <span className="text-sm font-semibold text-white">Contact Host</span>
                  <p className="text-[10px] text-white/70">WhatsApp or Call</p>
                </div>
              </button>
            </section>
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

      {/* Visa expiry alert — above WiFi when visa document exists */}
      {isFullTier && activeVisa?.visaExpiryDate && booking && (
        <VisaExpiryAlert visaExpiryDate={activeVisa.visaExpiryDate} checkInDate={booking.checkIn} />
      )}

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

      {/* Documents section — full tier only (legal requirement, always available) */}
      {isFullTier && booking && token && (
        <section className="mb-5 px-4">
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
            {showUpload ? (
              <DocumentUpload
                bookingCode={booking.code}
                token={token}
                onUploadComplete={() => {
                  loadDocuments();
                  setShowUpload(false);
                }}
                existingDocuments={documents}
              />
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#2D2016]">Documents</h3>
                  <button
                    onClick={() => setShowUpload(true)}
                    className="rounded-lg bg-[#3D8B87]/10 px-3 py-1.5 text-xs font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/20"
                  >
                    Upload Document
                  </button>
                </div>
                {documents.length === 0 ? (
                  <p className="text-xs text-[#8B7355]">
                    No documents uploaded yet. Upload your passport for residence registration.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {documents
                      .filter((d) => !d.supersededBy)
                      .map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {doc.documentType === 'passport' ? '🛂' : '📄'}
                            </span>
                            <div>
                              <p className="text-xs font-medium capitalize text-[#2D2016]">
                                {doc.documentType}
                              </p>
                              {doc.visaExpiryDate && (
                                <p className="text-[10px] text-[#8B7355]">
                                  Expires: {doc.visaExpiryDate}
                                </p>
                              )}
                            </div>
                          </div>
                          {doc.registeredWithAuthorities && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                              Registered
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
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

      {/* Contact host trigger */}
      {hostPhone && (
        <section className="mb-5 px-4">
          <button
            onClick={() => setShowContact(true)}
            className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76] p-4 transition-all active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <span className="text-sm font-semibold text-white">Contact Host</span>
              <p className="text-[10px] text-white/70">WhatsApp or Call</p>
            </div>
          </button>
        </section>
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

      {/* Contact sheet overlay */}
      {hostPhone && (
        <ContactSheet
          isOpen={showContact}
          onClose={() => setShowContact(false)}
          phone={hostPhone}
          whatsapp={property.contactWhatsapp}
          roomNumber={room.number}
          propertyName={property.name}
        />
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
