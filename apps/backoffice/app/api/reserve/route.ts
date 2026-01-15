import { NextRequest, NextResponse } from 'next/server';
import {
  getReservation,
  createReservation,
  cancelReservation,
  getSettings,
  getAvailableSlots,
  checkSlotAvailability,
} from '@/lib/reservations/reservations-service';
import { getSections, getTablesForPartySize } from '@/lib/reservations/table-management-service';

export const dynamic = 'force-dynamic';

// GET /api/reserve - Public endpoint for availability and reservation lookup
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'availability'; // availability, lookup, settings, sections
    const locationId = searchParams.get('locationId');
    const code = searchParams.get('code');
    const date = searchParams.get('date');
    const partySize = searchParams.get('partySize');

    switch (type) {
      case 'availability': {
        if (!locationId || !date || !partySize) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, date, partySize' },
            { status: 400 }
          );
        }

        // Get settings for this location
        const settings = await getSettings(locationId);

        // Validate party size
        const size = parseInt(partySize);
        if (settings) {
          if (size < settings.min_party_size || size > settings.max_party_size) {
            return NextResponse.json(
              {
                error: `Party size must be between ${settings.min_party_size} and ${settings.max_party_size}`,
                minPartySize: settings.min_party_size,
                maxPartySize: settings.max_party_size,
              },
              { status: 400 }
            );
          }
        }

        // Get available slots
        const slots = await getAvailableSlots(locationId, date, size);

        // Get suitable tables count for this party size
        const suitableTables = await getTablesForPartySize(locationId, size);

        return NextResponse.json({
          success: true,
          date,
          partySize: size,
          slots: slots.filter((s) => s.available),
          totalTablesAvailable: suitableTables.length,
          settings: settings
            ? {
                slotDuration: settings.slot_duration_minutes,
                defaultDuration: settings.default_dining_duration,
                requireDeposit: settings.require_deposit,
                depositAmount: settings.deposit_amount,
                requirePhone: settings.require_phone,
                requireEmail: settings.require_email,
                allowSectionPreference: settings.allow_section_preference,
              }
            : null,
        });
      }

      case 'check': {
        if (!locationId || !date || !partySize) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, date, partySize' },
            { status: 400 }
          );
        }

        const time = searchParams.get('time');
        if (!time) {
          return NextResponse.json({ error: 'Missing required field: time' }, { status: 400 });
        }

        const isAvailable = await checkSlotAvailability(
          locationId,
          date,
          time,
          parseInt(partySize)
        );

        return NextResponse.json({
          success: true,
          available: isAvailable,
          date,
          time,
          partySize: parseInt(partySize),
        });
      }

      case 'lookup': {
        if (!code) {
          return NextResponse.json({ error: 'Missing required field: code' }, { status: 400 });
        }

        const reservation = await getReservation(code, { includeSection: true });

        if (!reservation) {
          return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
        }

        // Return limited info for public access
        return NextResponse.json({
          success: true,
          reservation: {
            code: reservation.reservation_code,
            guestName: reservation.guest_name,
            partySize: reservation.party_size,
            date: reservation.reservation_date,
            time: reservation.reservation_time,
            status: reservation.status,
            section: reservation.section?.name,
            specialRequests: reservation.special_requests,
          },
        });
      }

      case 'settings': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const settings = await getSettings(locationId);

        // Return only public settings
        return NextResponse.json({
          success: true,
          settings: settings
            ? {
                minAdvanceHours: settings.min_advance_hours,
                maxAdvanceDays: settings.max_advance_days,
                slotDuration: settings.slot_duration_minutes,
                defaultDuration: settings.default_dining_duration,
                minPartySize: settings.min_party_size,
                maxPartySize: settings.max_party_size,
                requireDeposit: settings.require_deposit,
                depositAmount: settings.deposit_amount,
                depositPercent: settings.deposit_percent,
                requirePhone: settings.require_phone,
                requireEmail: settings.require_email,
                allowSectionPreference: settings.allow_section_preference,
              }
            : {
                minAdvanceHours: 2,
                maxAdvanceDays: 30,
                slotDuration: 15,
                defaultDuration: 90,
                minPartySize: 1,
                maxPartySize: 20,
                requireDeposit: false,
                requirePhone: true,
                requireEmail: false,
                allowSectionPreference: true,
              },
        });
      }

      case 'sections': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const sections = await getSections(locationId, {
          activeOnly: true,
          reservableOnly: true,
        });

        // Return only public section info
        return NextResponse.json({
          success: true,
          sections: sections.map((s) => ({
            id: s.id,
            name: s.name,
            nameTranslations: s.name_translations,
            type: s.section_type,
            amenities: s.amenities,
            weatherDependent: s.weather_dependent,
          })),
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: availability, check, lookup, settings, sections' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Reserve GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/reserve - Create a public reservation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      locationId,
      guestName,
      guestEmail,
      guestPhone,
      guestLocale,
      partySize,
      reservationDate,
      reservationTime,
      sectionId,
      occasion,
      specialRequests,
      dietaryRequirements,
    } = body;

    // Validate required fields
    if (!locationId || !guestName || !partySize || !reservationDate || !reservationTime) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: locationId, guestName, partySize, reservationDate, reservationTime',
        },
        { status: 400 }
      );
    }

    // Get settings to validate
    const settings = await getSettings(locationId);

    // Validate party size
    if (settings) {
      if (partySize < settings.min_party_size || partySize > settings.max_party_size) {
        return NextResponse.json(
          {
            error: `Party size must be between ${settings.min_party_size} and ${settings.max_party_size}`,
          },
          { status: 400 }
        );
      }

      // Validate phone requirement
      if (settings.require_phone && !guestPhone) {
        return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
      }

      // Validate email requirement
      if (settings.require_email && !guestEmail) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }
    }

    // Check slot availability
    const isAvailable = await checkSlotAvailability(
      locationId,
      reservationDate,
      reservationTime,
      partySize
    );

    if (!isAvailable) {
      return NextResponse.json({ error: 'This time slot is not available' }, { status: 409 });
    }

    // Create the reservation
    const reservation = await createReservation({
      location_id: locationId,
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
      guest_locale: guestLocale || 'en',
      party_size: partySize,
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      duration_minutes: settings?.default_dining_duration || 90,
      section_id: sectionId,
      source: 'website',
      occasion: occasion,
      special_requests: specialRequests,
      dietary_requirements: dietaryRequirements,
    });

    // Auto-confirm if party size is within threshold
    let autoConfirmed = false;
    if (settings?.auto_confirm_threshold && partySize <= settings.auto_confirm_threshold) {
      // TODO: Call updateReservationStatus to auto-confirm
      autoConfirmed = true;
    }

    return NextResponse.json({
      success: true,
      reservation: {
        code: reservation.reservation_code,
        guestName: reservation.guest_name,
        partySize: reservation.party_size,
        date: reservation.reservation_date,
        time: reservation.reservation_time,
        status: autoConfirmed ? 'confirmed' : reservation.status,
        requiresDeposit: settings?.require_deposit && settings.deposit_amount > 0,
        depositAmount: settings?.deposit_amount,
      },
      message: autoConfirmed
        ? 'Your reservation is confirmed!'
        : 'Your reservation is pending confirmation. We will contact you shortly.',
    });
  } catch (error) {
    console.error('Reserve POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/reserve - Cancel a reservation (by code)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const reason = searchParams.get('reason');

    if (!code) {
      return NextResponse.json({ error: 'Missing required field: code' }, { status: 400 });
    }

    // Find reservation by code
    const reservation = await getReservation(code);

    if (!reservation) {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }

    // Check if cancellation is allowed
    if (['cancelled', 'no_show', 'completed', 'seated'].includes(reservation.status)) {
      return NextResponse.json({ error: 'This reservation cannot be cancelled' }, { status: 400 });
    }

    // Cancel the reservation
    await cancelReservation(reservation.id, reason || 'Cancelled by guest');

    return NextResponse.json({
      success: true,
      message: 'Reservation cancelled successfully',
    });
  } catch (error) {
    console.error('Reserve DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
