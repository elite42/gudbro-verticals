# Phase 19: Property Page & Booking Flow - Research

**Researched:** 2026-01-31
**Domain:** Next.js server-rendered property page, image gallery, date range calendar, booking form, SEO/structured data
**Confidence:** HIGH

## Summary

Phase 19 builds the public-facing property page for the accommodations PWA -- the "sales page" that converts visitors into bookers. It encompasses five major technical areas: (1) a swipeable photo gallery with fullscreen/zoom support, (2) an inline date range calendar with unavailable date blocking, (3) a booking form with international phone input and guest checkout (no account), (4) server-rendered SEO with dynamic OG meta tags and JSON-LD structured data, and (5) API routes for property data fetching, availability checking, and booking submission.

The existing codebase already provides strong foundations. The accommodations frontend (`apps/accommodations/frontend/`) has Next.js 14 with Supabase, JWT auth (`jose`), `date-fns`, Stripe, and Tailwind CSS installed. The database schema from Phase 18 (migration 083) includes all necessary columns: `accom_properties` has booking_mode, pricing/discount config, cleaning_fee; `accom_rooms` has base_price_per_night, images, beds; `accom_bookings` has full pricing breakdown, payment tracking, and expires_at for inquiry timeout. The existing In-Stay Dashboard (Phase 14-17) provides verified patterns for API routes, JWT auth, Supabase queries, and component structure.

**Primary recommendation:** Use Embla Carousel for the gallery (lightweight, 6kb, touch-native), React DayPicker v9 for the inline calendar (built-in range mode with disabled dates), and `react-international-phone` for the phone input. Follow the existing API route pattern (admin Supabase client, typed responses) and use Next.js `generateMetadata` with `schema-dts` for SEO. The property page route should be a server component at `app/property/[slug]/page.tsx` with client components for interactive sections.

## Standard Stack

### Core

| Library                 | Version | Purpose                                   | Why Standard                                        |
| ----------------------- | ------- | ----------------------------------------- | --------------------------------------------------- |
| Next.js 14 (App Router) | 14.2.33 | Framework, SSR, routing                   | Already installed in accommodations frontend        |
| @supabase/supabase-js   | ^2.39.0 | Database queries                          | Already installed, admin client pattern established |
| date-fns                | ^3.3.1  | Date manipulation, formatting, diffInDays | Already installed, used throughout codebase         |
| jose                    | ^6.0.8  | JWT signing/verification for guest tokens | Already installed, pattern in `lib/auth.ts`         |
| Tailwind CSS            | ^3.4.1  | Styling                                   | Already installed, existing design system           |

### New Dependencies

| Library                   | Version | Purpose                                 | Why This One                                                                                                                                  |
| ------------------------- | ------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| embla-carousel-react      | ^8.6.0  | Swipeable photo gallery                 | 6kb, touch-native, no dependencies, great swipe precision. Handles horizontal swipe + prevents vertical scroll interference.                  |
| react-day-picker          | ^9.13.0 | Inline date range calendar              | Lightweight, native range mode with `excludeDisabled`, custom modifiers for booked dates, fully stylable with CSS. Already used by shadcn/ui. |
| react-international-phone | ^4.x    | Phone input with country code picker    | Zero dependencies, lightweight, auto-country detection from typing, Twemoji flags.                                                            |
| schema-dts                | ^1.1.0  | TypeScript types for Schema.org JSON-LD | Official Schema.org types including LodgingBusiness, AggregateOffer. Type-safe structured data.                                               |

### Alternatives Considered

| Instead of                | Could Use                    | Tradeoff                                                                                                                |
| ------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| embla-carousel            | Swiper.js                    | Swiper is more feature-rich (80kb+ vs 6kb) but much heavier. Embla is sufficient for a simple gallery.                  |
| embla-carousel            | react-image-gallery          | Has built-in thumbnails/fullscreen but is opinionated about styling. Embla gives full control.                          |
| react-day-picker          | react-datepicker             | react-datepicker works but has larger bundle. DayPicker v9 has native range mode with disabled date exclusion built-in. |
| react-international-phone | react-phone-number-input     | react-phone-number-input pulls in libphonenumber-js (140kb+). react-international-phone has zero dependencies.          |
| schema-dts                | Hand-written JSON-LD objects | schema-dts provides TypeScript autocompletion and validation, preventing typos in schema properties.                    |

**Installation:**

```bash
cd apps/accommodations/frontend
pnpm add embla-carousel-react react-day-picker react-international-phone schema-dts
```

## Architecture Patterns

### Recommended Project Structure

```
apps/accommodations/frontend/
  app/
    property/
      [slug]/
        page.tsx              # Server component: fetch + SSR + SEO
        PropertyPageClient.tsx # Client: interactive sections
    api/
      property/
        [slug]/
          route.ts          # GET: full property data (public)
          availability/
            route.ts        # GET: booked dates for calendar
      booking/
        route.ts            # POST: submit booking
    booking/
      [code]/
        page.tsx            # Confirmation page (after booking)
  components/
    booking/                    # Booking Mode components
      PropertyGallery.tsx       # Embla carousel + fullscreen
      PropertyHeader.tsx        # Name, location, stats
      PropertyDescription.tsx   # Description with "Read more"
      AmenityGrid.tsx           # Icon grid grouped by category
      HouseRules.tsx            # Rules list with icons
      HostInfoCard.tsx          # Host photo, name, WhatsApp
      LocationSection.tsx       # Static map + Google Maps link
      BookingCalendar.tsx       # React DayPicker inline calendar
      PriceBreakdown.tsx        # Per-night x nights + fees
      BookingForm.tsx           # Guest info form + submit
      BookingConfirmation.tsx   # Success screen with booking code
    stay/                       # In-Stay Mode (existing)
  hooks/
    useBookingForm.ts           # Form state, validation, submission
  lib/
    property-api.ts             # Property data fetching (public, no auth)
    booking-api.ts              # Booking submission
    price-utils.ts              # Price calculation, formatting
  types/
    property.ts                 # Property page types
```

### Pattern 1: Server Component with Client Islands (SSR + Interactivity)

**What:** The property page is a server component that fetches data and renders static content (SEO), with client components for interactive sections (gallery, calendar, form).
**When to use:** For the main property page route.

```typescript
// app/property/[slug]/page.tsx (Server Component)
import { Metadata } from 'next';
import { getSupabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import PropertyPageClient from './PropertyPageClient';

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await fetchPropertyBySlug(params.slug);
  if (!property) return {};

  return {
    title: `${property.name} -- ${property.city} | GUDBRO Stays`,
    description: property.description?.slice(0, 155) || `Book ${property.name} directly`,
    openGraph: {
      title: property.name,
      description: property.description?.slice(0, 155),
      images: property.images?.[0] ? [{ url: property.images[0] }] : [],
      type: 'website',
      siteName: 'GUDBRO Stays',
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const property = await fetchPropertyBySlug(params.slug);
  if (!property) notFound();

  // JSON-LD structured data rendered server-side
  const jsonLd = buildLodgingBusinessSchema(property);

  return (
    <>
      <script
        type="application/ld+json"
        // Next.js recommended pattern for JSON-LD
        // Safe: data is server-controlled, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <PropertyPageClient property={property} />
    </>
  );
}
```

**Note on XSS safety:** The `JSON.stringify().replace(/</g, '\\u003c')` pattern sanitizes the output by escaping `<` characters, preventing script injection via property data. This is the approach recommended by the Next.js documentation for JSON-LD.

### Pattern 2: Public API Routes (No Auth Required)

**What:** Property page data and availability are public endpoints using the admin Supabase client (no guest auth). Booking submission creates a record and returns a JWT.
**When to use:** For `/api/property/[slug]`, `/api/property/[slug]/availability`, and `/api/booking`.

```typescript
// app/api/property/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = getSupabaseAdmin();

  const { data: property, error } = await supabase
    .from('accom_properties')
    .select(
      `
      *,
      accom_rooms!inner(
        id, room_number, room_type, capacity, description,
        base_price_per_night, currency, images, beds, is_active
      )
    `
    )
    .eq('slug', params.slug)
    .eq('is_active', true)
    .single();

  if (error || !property) {
    return NextResponse.json({ error: 'property_not_found' }, { status: 404 });
  }

  return NextResponse.json({ data: property });
}
```

### Pattern 3: Booking Submission with JWT Response

**What:** Guest submits booking form, server creates booking record and returns a JWT token for tracking.
**When to use:** For the POST `/api/booking` endpoint.

```typescript
// app/api/booking/route.ts
import { signGuestToken } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase';
import { addHours } from 'date-fns';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabase = getSupabaseAdmin();

  // 1. Validate required fields
  // 2. Check room availability (query bookings for date overlap)
  // 3. Calculate pricing (fetch room + property config)
  // 4. Determine booking status (instant vs inquiry based on property.booking_mode)
  // 5. Insert booking with pricing breakdown
  // 6. Sign JWT token for guest
  // 7. Return { bookingCode, token, status }

  const status = property.booking_mode === 'instant' ? 'confirmed' : 'pending';
  const expiresAt =
    status === 'pending'
      ? addHours(new Date(), property.inquiry_timeout_hours)
      : null;

  const { data: booking } = await supabase
    .from('accom_bookings')
    .insert({
      property_id: property.id,
      room_id: roomId,
      guest_name: body.firstName,
      guest_last_name: body.lastName,
      guest_email: body.email,
      guest_phone: body.phone,
      guest_count: body.guestCount,
      check_in_date: body.checkIn,
      check_out_date: body.checkOut,
      special_requests: body.specialRequests || null,
      status,
      booking_source: 'direct',
      price_per_night: pricePerNight,
      num_nights: nights,
      subtotal,
      cleaning_fee: property.cleaning_fee,
      discount_amount: discountAmount,
      total_price: totalPrice,
      currency: room.currency,
      expires_at: expiresAt,
    })
    .select('id, booking_code')
    .single();

  const token = await signGuestToken({
    bookingId: booking.id,
    propertyId: property.id,
    checkoutDate: body.checkOut,
  });

  return NextResponse.json({
    data: {
      bookingCode: booking.booking_code,
      token,
      status,
      expiresAt,
    },
  });
}
```

### Pattern 4: Availability Query for Calendar

**What:** Fetch booked date ranges for a property/room to disable them in the calendar.
**When to use:** When the calendar component loads or when the guest selects a room.

```typescript
// app/api/property/[slug]/availability/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = getSupabaseAdmin();
  const roomId = request.nextUrl.searchParams.get('room_id');

  // Fetch active bookings (not cancelled/no_show) for the next 12 months
  // Also exclude expired inquiry bookings
  const { data: bookings } = await supabase
    .from('accom_bookings')
    .select('check_in_date, check_out_date')
    .eq('property_id', propertyId)
    .eq('room_id', roomId)
    .not('status', 'in', '("cancelled","no_show")')
    .gte('check_out_date', new Date().toISOString().split('T')[0])
    .or('expires_at.is.null,expires_at.gte.' + new Date().toISOString());

  // Return as date ranges the calendar can consume
  return NextResponse.json({
    data: {
      bookedRanges:
        bookings?.map((b) => ({
          from: b.check_in_date,
          to: b.check_out_date, // exclusive [) -- checkout day is available
        })) || [],
    },
  });
}
```

### Pattern 5: Price Calculation (Server-Side)

**What:** Calculate price breakdown from property config + room price + date range.
**When to use:** Both in the UI (preview) and in the booking submission (authoritative calculation).

```typescript
// lib/price-utils.ts
import { differenceInDays } from 'date-fns';

interface PriceBreakdown {
  pricePerNight: number; // INTEGER minor units
  nights: number;
  subtotal: number; // pricePerNight * nights
  cleaningFee: number;
  discountAmount: number;
  discountLabel: string | null; // "10% weekly discount"
  totalPrice: number;
  currency: string;
}

export function calculatePriceBreakdown(
  pricePerNight: number,
  checkIn: Date,
  checkOut: Date,
  cleaningFee: number,
  weeklyDiscountPercent: number,
  monthlyDiscountPercent: number,
  currency: string
): PriceBreakdown {
  const nights = differenceInDays(checkOut, checkIn);
  const subtotal = pricePerNight * nights;

  let discountPercent = 0;
  let discountLabel: string | null = null;
  if (nights >= 28 && monthlyDiscountPercent > 0) {
    discountPercent = monthlyDiscountPercent;
    discountLabel = `${monthlyDiscountPercent}% monthly discount`;
  } else if (nights >= 7 && weeklyDiscountPercent > 0) {
    discountPercent = weeklyDiscountPercent;
    discountLabel = `${weeklyDiscountPercent}% weekly discount`;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalPrice = subtotal + cleaningFee - discountAmount;

  return {
    pricePerNight,
    nights,
    subtotal,
    cleaningFee,
    discountAmount,
    discountLabel,
    totalPrice,
    currency,
  };
}

/**
 * Format integer minor units to display string.
 * VND: 500000 -> "500,000 VND"
 * USD: 4500 -> "$45.00"
 */
export function formatPrice(amount: number, currency: string): string {
  const minorUnits = currency === 'VND' ? 1 : 100; // VND has no decimal
  const value = amount / minorUnits;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'VND' ? 0 : 2,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(value);
}
```

### Anti-Patterns to Avoid

- **Client-side price calculation as source of truth:** Calculate prices on the server in the booking API route. Client-side calculation is for preview only. The server is authoritative.
- **Fetching all booking records for availability:** Only fetch `check_in_date, check_out_date` columns for active bookings in the next 12 months. Do not fetch full booking objects.
- **Using `getServerSideProps` or `getStaticProps`:** This is App Router. Use server components and `generateMetadata` directly.
- **Creating a custom swipe implementation:** Use Embla Carousel. Hand-rolled swipe detection has edge cases with momentum, velocity, and scroll interference.
- **Querying Supabase from client components directly:** All database queries go through API routes using the admin client. Guest has no Supabase auth -- they use JWT tokens.
- **Storing the guest JWT in cookies:** Store in localStorage (same as existing In-Stay pattern in `useStaySession`). The property page is public; JWT is only issued after booking submission.

## Don't Hand-Roll

| Problem                   | Don't Build                     | Use Instead                                   | Why                                                                                                           |
| ------------------------- | ------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Touch swipe gallery       | Custom touch event handlers     | Embla Carousel                                | Momentum physics, velocity tracking, scroll interference, edge snapping -- all complex to get right on mobile |
| Date range calendar       | Custom grid with click handlers | React DayPicker v9                            | Disabled dates, range selection, month navigation, keyboard accessibility, locale support                     |
| Phone country code picker | Custom dropdown with flag list  | react-international-phone                     | 200+ countries, auto-formatting, E.164 output, flag rendering, country detection from dialing                 |
| Price formatting          | Manual string manipulation      | `Intl.NumberFormat`                           | Handles VND (no decimals), USD (2 decimals), thousand separators, currency symbols correctly                  |
| Booking code generation   | UUID or random string           | Existing `generate_booking_code()` trigger    | Already in migration 077, auto-fires on INSERT, excludes ambiguous characters, collision-resistant            |
| Double-booking prevention | Application-level date check    | Existing exclusion constraint (migration 083) | DB constraint is atomic, immune to race conditions from concurrent requests                                   |
| JSON-LD types             | Hand-typed objects              | `schema-dts`                                  | TypeScript autocompletion, catches schema.org property typos at compile time                                  |

**Key insight:** The property page is a conversion-critical page. Every millisecond of load time and every friction point in the booking flow directly impacts revenue. Use battle-tested libraries for interactions (gallery, calendar, phone) and focus engineering effort on the property-specific logic (pricing, availability, booking flow).

## Common Pitfalls

### Pitfall 1: Fullscreen Gallery Blocking Page Scroll

**What goes wrong:** Opening a fullscreen gallery overlay doesn't prevent the page behind from scrolling, causing a jarring experience.
**Why it happens:** Default browser behavior allows background scroll when a fixed overlay is present.
**How to avoid:** When fullscreen gallery opens: (1) set `document.body.style.overflow = 'hidden'`, (2) use a portal or `position: fixed` overlay, (3) restore scroll on close. If using Radix Dialog for the fullscreen overlay, it handles body scroll lock automatically. Radix Dialog is already installed (`@radix-ui/react-dialog` in package.json).
**Warning signs:** Page scrolls behind the fullscreen image view.

### Pitfall 2: Calendar Date Selection with Half-Open Range

**What goes wrong:** Calendar shows checkout day as "unavailable" even though it should be bookable (half-open `[)` convention).
**Why it happens:** Naively disabling all dates from check_in to check_out (inclusive) instead of `[check_in, check_out)` (exclusive end).
**How to avoid:** When converting booked ranges to disabled dates, exclude the checkout day. If a booking is Jan 10-15, disable Jan 10, 11, 12, 13, 14 but NOT Jan 15. Jan 15 is available for new check-in. Use `subDays(parseISO(checkout), 1)` as the end of the disabled interval.
**Warning signs:** Back-to-back bookings appear impossible in the calendar even though the DB allows them.

### Pitfall 3: Price Calculation Mismatch Between Client and Server

**What goes wrong:** Guest sees one price in the UI, but the booking confirmation shows a different price.
**Why it happens:** Client-side calculation uses stale data or different rounding than the server.
**How to avoid:** (1) Client calculation is for preview only (show "estimated" label). (2) Server recalculates authoritatively on booking submission. (3) Use `Math.round()` consistently for all integer arithmetic. (4) Return the authoritative price breakdown in the booking response.
**Warning signs:** Guest complaints about price discrepancy, or booking total doesn't match UI total.

### Pitfall 4: Inquiry Booking Expiry Not Handled

**What goes wrong:** Inquiry bookings sit in `pending` status forever, blocking the date range.
**Why it happens:** No cron job or scheduled function to expire pending bookings after `inquiry_timeout_hours`.
**How to avoid:** For Phase 19 (MVP), handle expiry at query time: when fetching availability, exclude bookings where `status = 'pending' AND expires_at < NOW()`. A proper cron job to update status belongs in a later phase. Alternatively, use Supabase `pg_cron` to run `UPDATE accom_bookings SET status = 'cancelled' WHERE status = 'pending' AND expires_at < NOW()` every hour.
**Warning signs:** Calendar shows dates as unavailable that should be free (expired inquiry blocking them).

### Pitfall 5: SEO Meta Tags Not Rendering Server-Side

**What goes wrong:** Social media previews show default/blank meta tags instead of property-specific content.
**Why it happens:** Metadata is generated in a client component or fetched after hydration, so crawlers and social media bots see the initial HTML without metadata.
**How to avoid:** Use `generateMetadata` in the server component page file. This runs before the page renders and injects `<meta>` tags into the initial HTML response. Never rely on `useEffect` or client-side JS for OG tags.
**Warning signs:** Sharing property URL on WhatsApp/Facebook shows "GUDBRO Stays" instead of the property name and photo.

### Pitfall 6: Gallery Images Not Optimized for Mobile

**What goes wrong:** Property page loads slowly on mobile because gallery images are full-resolution originals.
**Why it happens:** Using raw Supabase Storage URLs without size optimization.
**How to avoid:** Use Next.js `<Image>` component with `sizes` prop for responsive loading, or Supabase Storage transformations (`?width=800&quality=75`). For the main gallery, limit to ~800px width on mobile. Fullscreen can load higher resolution.
**Warning signs:** Lighthouse audit shows images as the main performance bottleneck. Page load > 3s on 4G.

### Pitfall 7: Booking Form Submitted Without Room Selection

**What goes wrong:** If a property has multiple rooms, the booking is submitted without specifying which room. The exclusion constraint requires `room_id`.
**Why it happens:** Properties with a single room can auto-select, but multi-room properties need explicit selection.
**How to avoid:** (1) For single-room properties, auto-select the room (hidden). (2) For multi-room properties, show a room selector before the calendar (price depends on room). (3) Validate `room_id` is present before booking submission.
**Warning signs:** Booking API returns constraint violation error about missing room_id.

## Code Examples

### Embla Carousel Gallery Component

```typescript
// components/booking/PropertyGallery.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {images.map((src, i) => (
            <div key={i} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full">
              <img
                src={src}
                alt={`${propertyName} - Photo ${i + 1}`}
                className="h-64 w-full object-cover sm:h-80 md:h-96"
                onClick={() => setIsFullscreen(true)}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
        {currentIndex + 1}/{images.length}
      </div>

      {/* Desktop Arrows (hidden on mobile, shown md+) */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow md:block"
        aria-label="Previous photo"
      >
        {/* Use Phosphor CaretLeft icon */}
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow md:block"
        aria-label="Next photo"
      >
        {/* Use Phosphor CaretRight icon */}
      </button>
    </div>
  );
}
```

### React DayPicker Booking Calendar

```typescript
// components/booking/BookingCalendar.tsx
'use client';

import { useState, useMemo } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { addMonths, eachDayOfInterval, parseISO, subDays } from 'date-fns';
import 'react-day-picker/style.css';

interface BookingCalendarProps {
  bookedRanges: { from: string; to: string }[];
  minNights: number;
  onDateChange: (range: DateRange | undefined) => void;
}

export function BookingCalendar({
  bookedRanges,
  minNights,
  onDateChange,
}: BookingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();

  // Convert booked ranges to individual disabled dates
  // IMPORTANT: exclude checkout day (half-open [) range)
  const disabledDates = useMemo(() => {
    const dates: Date[] = [];
    for (const bookedRange of bookedRanges) {
      const from = parseISO(bookedRange.from);
      const to = subDays(parseISO(bookedRange.to), 1); // Exclude checkout day
      if (from <= to) {
        dates.push(...eachDayOfInterval({ start: from, end: to }));
      }
    }
    return dates;
  }, [bookedRanges]);

  const handleSelect = (newRange: DateRange | undefined) => {
    setRange(newRange);
    onDateChange(newRange);
  };

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={handleSelect}
      disabled={[
        { before: new Date() },  // Can't book in the past
        ...disabledDates,
      ]}
      excludeDisabled
      min={minNights}
      numberOfMonths={typeof window !== 'undefined' && window.innerWidth >= 768 ? 2 : 1}
      startMonth={new Date()}
      endMonth={addMonths(new Date(), 12)}
    />
  );
}
```

### JSON-LD Structured Data

```typescript
// lib/structured-data.ts
import type { WithContext, LodgingBusiness } from 'schema-dts';

export function buildLodgingBusinessSchema(
  property: PropertyData
): WithContext<LodgingBusiness> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    description: property.description || undefined,
    image: property.images?.[0] || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address || undefined,
      addressLocality: property.city || undefined,
      addressCountry: property.country_code,
    },
    geo:
      property.latitude && property.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: Number(property.latitude),
            longitude: Number(property.longitude),
          }
        : undefined,
    telephone: property.host_phone || undefined,
    checkinTime: property.check_in_time,
    checkoutTime: property.check_out_time,
    amenityFeature: property.amenities?.map((amenity: string) => ({
      '@type': 'LocationFeatureSpecification' as const,
      name: amenity,
      value: true,
    })),
    numberOfRooms: property.rooms?.length,
    priceRange: formatPriceRange(property.rooms),
  };
}
```

### Booking Form with Phone Input

```typescript
// components/booking/BookingForm.tsx (key fields)
'use client';

import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export function BookingForm({ onSubmit, maxGuests, bookingMode }: Props) {
  const [phone, setPhone] = useState('');

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" required placeholder="First name" />
      <input name="lastName" required placeholder="Last name" />
      <input name="email" type="email" required placeholder="Email" />

      <PhoneInput
        defaultCountry="vn"
        value={phone}
        onChange={setPhone}
        inputClassName="w-full rounded-xl border px-4 py-3"
      />

      <select name="guestCount">
        {Array.from({ length: maxGuests }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1} guest{i > 0 ? 's' : ''}
          </option>
        ))}
      </select>

      <textarea name="specialRequests" placeholder="Special requests (optional)" />

      <button type="submit">
        {bookingMode === 'instant' ? 'Book Now' : 'Request to Book'}
      </button>
    </form>
  );
}
```

## State of the Art

| Old Approach                   | Current Approach                       | When Changed           | Impact                                           |
| ------------------------------ | -------------------------------------- | ---------------------- | ------------------------------------------------ |
| `getServerSideProps` for SSR   | Server Components + `generateMetadata` | Next.js 13+ App Router | Simpler data fetching, co-located metadata       |
| Separate `_meta` components    | `generateMetadata` async function      | Next.js 13+            | Type-safe metadata, auto-deduplication           |
| `next-seo` package for JSON-LD | Native script tag in server components | Next.js 13+            | No dependency needed, server-rendered by default |
| `react-dates` for date pickers | `react-day-picker` v9                  | 2024                   | Smaller bundle, better range mode, modern React  |
| Touch event handlers for swipe | Embla Carousel                         | Stable since 2020      | Physics-based momentum, battle-tested on mobile  |

## Open Questions

1. **Fullscreen gallery pinch-to-zoom implementation**
   - What we know: Embla Carousel handles horizontal swipe but does not have built-in pinch-to-zoom. A separate library like `react-zoom-pan-pinch` could overlay on the fullscreen view.
   - What's unclear: Whether pinch-to-zoom on property photos is critical for MVP or can be deferred.
   - Recommendation: For Phase 19, implement tap-to-fullscreen with simple image display. Add pinch-to-zoom as a polish item in Phase 24 if time permits. Most users will rely on browser native zoom (double-tap) in fullscreen.

2. **Inquiry booking expiry mechanism**
   - What we know: The `expires_at` column exists on `accom_bookings`. Pending bookings should expire after `inquiry_timeout_hours`.
   - What's unclear: Whether to use pg_cron, Supabase Edge Functions, or query-time filtering.
   - Recommendation: Phase 19 should filter at query time: when checking availability, exclude bookings where `status = 'pending' AND expires_at < NOW()`. A proper cron job for status cleanup is a Phase 24 polish item.

3. **WhatsApp deep-link for booking confirmation**
   - What we know: WhatsApp deep-links work via `https://wa.me/{phone}?text={encoded_message}`. The host phone is in `accom_properties.host_phone`.
   - What's unclear: Exact message template and whether to include booking details in the WhatsApp message.
   - Recommendation: Pre-fill message with booking code and dates: `Hi, I just booked BK-XXXXXX (Jan 15-18). Looking forward to my stay!`. Keep it simple and customizable later.

4. **Email confirmation for booking**
   - What we know: BOOK-04 requires email confirmation. The codebase does not currently have an email sending service.
   - What's unclear: Which email service to use (Resend, SendGrid, Supabase edge function).
   - Recommendation: For Phase 19 MVP, skip email sending and show the confirmation in-page with a "Check your email" note as a placeholder. Email integration is a separate task that can be added without changing the booking flow. Document this as a TODO.

5. **Multi-room property: room selection UI**
   - What we know: Some properties have multiple rooms with different prices. The calendar and pricing depend on which room is selected.
   - What's unclear: Exact UI for room selection (cards, dropdown, tabs).
   - Recommendation: Show room cards above the calendar if `rooms.length > 1`. Each card shows room type, capacity, price, and a "Select" button. Selected room highlights and calendar + pricing update accordingly. For single-room properties, auto-select and hide the selector.

## Sources

### Primary (HIGH confidence)

- Existing codebase: `apps/accommodations/frontend/` -- established patterns for API routes, JWT auth, Supabase queries, types
- Migration 077 (`shared/database/migrations/schema/077-accommodations-schema.sql`) -- core schema with RLS
- Migration 083 (`shared/database/migrations/schema/083-accommodations-v2-foundation.sql`) -- pricing columns, exclusion constraint
- Phase 18 Research (`.planning/phases/18-database-foundation/18-RESEARCH.md`) -- architectural decisions
- V2 Migration Guide (`docs/knowledge/systems/V2-MIGRATION-GUIDE.md`) -- 4-tier architecture pattern
- PRD v2.3 (`apps/accommodations/PRD.md`) -- product requirements, user journeys, URL structure
- Next.js Metadata docs (https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- generateMetadata API
- Next.js JSON-LD guide (https://nextjs.org/docs/app/guides/json-ld) -- structured data pattern

### Secondary (MEDIUM confidence)

- Embla Carousel docs (https://www.embla-carousel.com/) -- v8.6.0, React integration, touch handling
- React DayPicker docs (https://daypicker.dev/) -- v9.13.0, range mode, disabled dates, excludeDisabled
- react-international-phone docs (https://react-international-phone.vercel.app/) -- API, customization
- schema-dts npm (https://www.npmjs.com/package/schema-dts) -- TypeScript Schema.org types
- Schema.org LodgingBusiness (https://schema.org/LodgingBusiness) -- property fields

### Tertiary (LOW confidence)

- Embla pinch-to-zoom discussion (https://github.com/davidjerleke/embla-carousel/discussions/828) -- community workarounds, not official support
- react-zoom-pan-pinch for fullscreen zoom -- untested in this codebase context

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH -- all core libraries already installed; new dependencies are well-established (Embla 8.6, DayPicker 9.13)
- Architecture: HIGH -- patterns directly extend existing codebase (API routes, types, JWT auth, server components)
- Pitfalls: HIGH -- identified from real-world accommodation booking systems and existing codebase conventions (half-open ranges, integer pricing, RLS)

**Research date:** 2026-01-31
**Valid until:** 2026-03-31 (stable domain -- Next.js 14, Embla, DayPicker change slowly)
