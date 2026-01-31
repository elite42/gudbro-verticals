'use client';

import { useRoomSession } from '@/hooks/useRoomSession';

import WifiCard from '@/components/stay/WifiCard';
import CheckoutInfo from '@/components/stay/CheckoutInfo';
import ContactSheet from '@/components/stay/ContactSheet';
import RestaurantSection from '@/components/stay/RestaurantSection';

/**
 * Room QR Dashboard - Browse Tier
 *
 * Renders when guest scans a permanent room QR code.
 * Shows WiFi, property info, contacts, house rules immediately.
 * Hides guest-specific info (name, orders, cart) in browse tier.
 *
 * For Phase 25: read-only dashboard. Phase 26 adds inline verification
 * to upgrade to full tier for ordering.
 */
export default function RoomDashboard({ params }: { params: { roomCode: string } }) {
  const { token, stay, isLoading, hasActiveBooking, error } = useRoomSession(params.roomCode);

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
          <div className="mb-4 text-4xl">🔍</div>
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

          {/* F&B link if available (deep-link only, no static menu in browse tier) */}
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

  // Full browse-tier dashboard (active booking, but read-only)
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Header - property name instead of guest name (browse tier privacy) */}
      <div className="border-b border-[#E8E2D9] bg-white px-4 py-4">
        <h1 className="text-lg font-semibold text-[#2D2016]">Welcome to {property.name}</h1>
        <p className="mt-0.5 text-sm text-[#8B7355]">
          Room {room.number}
          {room.name ? ` \u00b7 ${room.name}` : ''}
        </p>
        {booking && (
          <p className="mt-1 text-xs text-[#8B7355]/70">
            {booking.checkIn} &mdash; {booking.checkOut}
          </p>
        )}
      </div>

      {/* WiFi card - prominent, first thing guest needs */}
      <WifiCard wifi={wifi} />

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

      {/* F&B link (deep-link only, no static menu without real token) */}
      {property.hasLinkedFnb && property.linkedFnbSlug && (
        <RestaurantSection
          hasLinkedFnb={true}
          linkedFnbSlug={property.linkedFnbSlug}
          bookingCode=""
          token=""
        />
      )}

      {/* Browse tier notice - gentle prompt for Phase 26 upgrade */}
      <section className="mb-5 px-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-center">
          <p className="text-sm text-blue-700">
            To order room service or other paid services, please verify your booking.
          </p>
          <p className="mt-1 text-xs text-blue-500">This feature is coming soon.</p>
        </div>
      </section>
    </div>
  );
}
