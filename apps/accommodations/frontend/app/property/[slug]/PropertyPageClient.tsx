'use client';

import type { PropertyPageData } from '@/types/property';
import { useBookingForm } from '@/hooks/useBookingForm';

// Property info components
import PropertyGallery from '@/components/booking/PropertyGallery';
import PropertyHeader from '@/components/booking/PropertyHeader';
import PropertyDescription from '@/components/booking/PropertyDescription';
import AmenityGrid from '@/components/booking/AmenityGrid';
import HouseRules from '@/components/booking/HouseRules';
import HostInfoCard from '@/components/booking/HostInfoCard';
import LocationSection from '@/components/booking/LocationSection';

// Booking components
import RoomSelector from '@/components/booking/RoomSelector';
import BookingCalendar from '@/components/booking/BookingCalendar';
import PriceBreakdown from '@/components/booking/PriceBreakdown';
import BookingForm from '@/components/booking/BookingForm';
import BookingConfirmation from '@/components/booking/BookingConfirmation';

interface PropertyPageClientProps {
  property: PropertyPageData;
}

export default function PropertyPageClient({ property }: PropertyPageClientProps) {
  const {
    selectedRoom,
    selectRoom,
    dateRange,
    setDateRange,
    bookedRanges,
    isLoadingAvailability,
    priceBreakdown,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    guestCount,
    setGuestCount,
    specialRequests,
    setSpecialRequests,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    isSubmitting,
    submitError,
    bookingResult,
    handleSubmit,
    isFormValid,
    voucherDetails,
    setVoucherDetails,
  } = useBookingForm({
    propertySlug: property.slug,
    rooms: property.rooms,
    bookingMode: property.booking_mode,
    cleaningFee: property.cleaning_fee,
    weeklyDiscountPercent: property.weekly_discount_percent,
    monthlyDiscountPercent: property.monthly_discount_percent,
    minNights: property.min_nights,
    acceptedPaymentMethods: property.accepted_payment_methods,
    depositPercent: property.deposit_percent,
  });

  const activeRooms = property.rooms.filter((r) => r.is_active);
  const isBookingDisabled = property.booking_mode === 'disabled';

  // --- Booking Widget (shared between mobile inline and desktop sidebar) ---
  const bookingWidget = bookingResult ? (
    <BookingConfirmation bookingResult={bookingResult} />
  ) : isBookingDisabled ? (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-white p-6 text-center">
      <h3 className="font-display mb-2 text-lg font-semibold">Contact Host Directly</h3>
      <p className="mb-4 text-sm text-[hsl(var(--foreground-muted))]">
        This property does not accept online bookings. Please contact the host to arrange your stay.
      </p>
      {property.contact_whatsapp && (
        <a
          href={`https://wa.me/${property.contact_whatsapp.replace(/\D/g, '')}?text=Hi, I'm interested in booking at ${encodeURIComponent(property.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white transition-colors hover:bg-[#20BD5A]"
        >
          Chat on WhatsApp
        </a>
      )}
      {property.contact_email && !property.contact_whatsapp && (
        <a
          href={`mailto:${property.contact_email}?subject=Booking Inquiry - ${property.name}`}
          className="text-[hsl(var(--primary))] underline"
        >
          Email the host
        </a>
      )}
    </div>
  ) : (
    <div className="space-y-6">
      {/* Room selector only if multiple rooms */}
      {activeRooms.length > 1 && (
        <RoomSelector
          rooms={activeRooms}
          selectedRoomId={selectedRoom?.id || null}
          onSelectRoom={selectRoom}
        />
      )}

      {/* Calendar */}
      {selectedRoom && (
        <>
          {isLoadingAvailability ? (
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent" />
            </div>
          ) : (
            <BookingCalendar
              bookedRanges={bookedRanges}
              minNights={property.min_nights}
              onDateChange={setDateRange}
            />
          )}

          {/* Price breakdown */}
          <PriceBreakdown priceBreakdown={priceBreakdown} />

          {/* Booking form */}
          <BookingForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            guestCount={guestCount}
            setGuestCount={setGuestCount}
            maxGuests={selectedRoom.capacity}
            specialRequests={specialRequests}
            setSpecialRequests={setSpecialRequests}
            bookingMode={property.booking_mode as 'instant' | 'inquiry'}
            isSubmitting={isSubmitting}
            submitError={submitError}
            isFormValid={isFormValid}
            onSubmit={handleSubmit}
            acceptedPaymentMethods={property.accepted_payment_methods}
            selectedPaymentMethod={selectedPaymentMethod}
            onSelectPaymentMethod={setSelectedPaymentMethod}
            depositPercent={property.deposit_percent}
            totalPrice={priceBreakdown?.totalPrice || 0}
            currency={selectedRoom?.currency || 'VND'}
            propertyId={property.id}
            numNights={priceBreakdown?.nights || 1}
            subtotal={priceBreakdown?.subtotal || 0}
            voucherDetails={voucherDetails}
            onVoucherApplied={setVoucherDetails}
            formatPrice={(amount) => {
              const curr = selectedRoom?.currency || 'VND';
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: curr,
                maximumFractionDigits: curr === 'VND' ? 0 : 2,
              }).format(curr === 'VND' ? amount : amount / 100);
            }}
          />
        </>
      )}

      {/* Prompt to select room if none selected and multiple available */}
      {!selectedRoom && activeRooms.length > 1 && (
        <p className="text-center text-sm text-[hsl(var(--foreground-muted))]">
          Select a room above to see availability and pricing.
        </p>
      )}
    </div>
  );

  return (
    <main className="mx-auto max-w-6xl">
      {/* Gallery - full width */}
      <PropertyGallery images={property.images} propertyName={property.name} />

      {/* Two-column layout on desktop */}
      <div className="px-4 py-6 md:grid md:grid-cols-5 md:gap-8">
        {/* Left column: property details */}
        <div className="md:col-span-3">
          <PropertyHeader
            name={property.name}
            city={property.city}
            countryCode={property.country_code}
            type={property.type}
            rooms={property.rooms}
          />

          <div className="mt-6 space-y-8">
            <PropertyDescription description={property.description} />
            {property.amenities.length > 0 && <AmenityGrid amenities={property.amenities} />}
            <HouseRules houseRules={property.house_rules} />
            <HostInfoCard
              hostName={property.host_name}
              hostPhoto={property.host_photo}
              hostLanguages={property.host_languages}
              contactWhatsapp={property.contact_whatsapp}
              contactPhone={property.contact_phone}
            />
            <LocationSection
              address={property.address}
              city={property.city}
              latitude={property.latitude}
              longitude={property.longitude}
            />
          </div>

          {/* Mobile: booking widget inline below property details */}
          <div className="mt-8 md:hidden">{bookingWidget}</div>
        </div>

        {/* Right column: sticky booking sidebar (desktop only) */}
        <div className="hidden md:col-span-2 md:block">
          <div className="sticky top-4">
            <div className="rounded-xl border border-[hsl(var(--border))] bg-white p-6 shadow-lg">
              {bookingWidget}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
