import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  updateReservationStatus,
  cancelReservation,
  assignTables,
  getSettings,
  upsertSettings,
  getReservationStats,
  getReservationsForDate,
  getBlockedSlots,
  createBlockedSlot,
  deleteBlockedSlot,
  getReservationHistory,
  addHistoryEntry,
  type ReservationStatus,
} from '@/lib/reservations/reservations-service';
import {
  sendReservationNotification,
  scheduleReminders,
  cancelScheduledNotifications,
} from '@/lib/notifications/notification-dispatcher';

export const dynamic = 'force-dynamic';

// GET /api/reservations - Get reservations, settings, stats, or history
export async function GET(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const type = searchParams.get('type') || 'list'; // list, single, settings, stats, blocked, history
    const reservationId = searchParams.get('reservationId');
    const code = searchParams.get('code');
    const date = searchParams.get('date');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const status = searchParams.get('status');

    switch (type) {
      case 'list': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const statusArray = status ? (status.split(',') as ReservationStatus[]) : undefined;

        const reservations = await getReservations(locationId, {
          date: date || undefined,
          dateFrom: dateFrom || undefined,
          dateTo: dateTo || undefined,
          status: statusArray,
          includeSection: true,
        });

        return NextResponse.json({
          success: true,
          reservations,
          count: reservations.length,
        });
      }

      case 'forDate': {
        if (!locationId || !date) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, date' },
            { status: 400 }
          );
        }

        const reservations = await getReservationsForDate(locationId, date);

        return NextResponse.json({
          success: true,
          reservations,
          count: reservations.length,
        });
      }

      case 'single': {
        const idOrCode = reservationId || code;
        if (!idOrCode) {
          return NextResponse.json(
            { error: 'Missing required field: reservationId or code' },
            { status: 400 }
          );
        }

        const reservation = await getReservation(idOrCode, { includeSection: true });

        if (!reservation) {
          return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          reservation,
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

        return NextResponse.json({
          success: true,
          settings: settings || {
            location_id: locationId,
            min_advance_hours: 2,
            max_advance_days: 30,
            slot_duration_minutes: 15,
            default_dining_duration: 90,
            auto_confirm_threshold: 4,
            cancellation_deadline_hours: 24,
            require_deposit: false,
            send_reminder_hours: 24,
            max_party_size: 20,
            min_party_size: 1,
            allow_section_preference: true,
            require_phone: true,
          },
        });
      }

      case 'stats': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const stats = await getReservationStats(locationId, date || undefined);

        return NextResponse.json({
          success: true,
          stats,
        });
      }

      case 'blocked': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const from = dateFrom || new Date().toISOString().split('T')[0];
        const to =
          dateTo || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const blockedSlots = await getBlockedSlots(locationId, from, to);

        return NextResponse.json({
          success: true,
          blockedSlots,
          count: blockedSlots.length,
        });
      }

      case 'history': {
        if (!reservationId) {
          return NextResponse.json(
            { error: 'Missing required field: reservationId' },
            { status: 400 }
          );
        }

        const history = await getReservationHistory(reservationId);

        return NextResponse.json({
          success: true,
          history,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: list, forDate, single, settings, stats, blocked, history' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Reservations GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/reservations - Create reservations or perform actions
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, ...params } = body;

    switch (action || 'create') {
      case 'create': {
        const {
          locationId,
          accountId,
          guestName,
          guestEmail,
          guestPhone,
          guestLocale,
          partySize,
          reservationDate,
          reservationTime,
          durationMinutes,
          sectionId,
          source,
          occasion,
          specialRequests,
          dietaryRequirements,
          notes,
        } = params;

        if (!locationId || !guestName || !partySize || !reservationDate || !reservationTime) {
          return NextResponse.json(
            {
              error:
                'Missing required fields: locationId, guestName, partySize, reservationDate, reservationTime',
            },
            { status: 400 }
          );
        }

        const reservation = await createReservation({
          location_id: locationId,
          account_id: accountId,
          guest_name: guestName,
          guest_email: guestEmail,
          guest_phone: guestPhone,
          guest_locale: guestLocale,
          party_size: partySize,
          reservation_date: reservationDate,
          reservation_time: reservationTime,
          duration_minutes: durationMinutes,
          section_id: sectionId,
          source: source,
          occasion: occasion,
          special_requests: specialRequests,
          dietary_requirements: dietaryRequirements,
          notes: notes,
        });

        // Wire notification flow - send confirmation and schedule reminders
        try {
          await sendReservationNotification({
            reservationId: reservation.id,
            type: 'reservation_confirmed',
            priority: 5,
            locale: guestLocale || 'en',
          });

          await scheduleReminders(
            reservation.id,
            reservation.reservation_date,
            reservation.reservation_time
          );
        } catch (notifError) {
          console.error('Notification error (non-blocking):', notifError);
        }

        return NextResponse.json({
          success: true,
          reservation,
          message: 'Reservation created',
        });
      }

      case 'updateStatus': {
        const { reservationId, status, changedBy, cancellationReason } = params;

        if (!reservationId || !status) {
          return NextResponse.json(
            { error: 'Missing required fields: reservationId, status' },
            { status: 400 }
          );
        }

        const reservation = await updateReservationStatus(reservationId, status, {
          changedBy,
          cancellationReason,
        });

        // Send notification based on status change
        try {
          if (status === 'confirmed') {
            await sendReservationNotification({
              reservationId,
              type: 'reservation_confirmed',
              priority: 5,
            });
            await scheduleReminders(
              reservationId,
              reservation.reservation_date,
              reservation.reservation_time
            );
          } else if (status === 'cancelled') {
            await cancelScheduledNotifications(reservationId);
            await sendReservationNotification({
              reservationId,
              type: 'reservation_cancelled',
              priority: 5,
            });
          }
        } catch (notifError) {
          console.error('Status change notification error (non-blocking):', notifError);
        }

        return NextResponse.json({
          success: true,
          reservation,
          message: `Status updated to ${status}`,
        });
      }

      case 'cancel': {
        const { reservationId, reason, cancelledBy } = params;

        if (!reservationId) {
          return NextResponse.json(
            { error: 'Missing required field: reservationId' },
            { status: 400 }
          );
        }

        const reservation = await cancelReservation(reservationId, reason, cancelledBy);

        // Cancel scheduled notifications and send cancellation notice
        try {
          await cancelScheduledNotifications(reservationId);
          await sendReservationNotification({
            reservationId,
            type: 'reservation_cancelled',
            priority: 5,
          });
        } catch (notifError) {
          console.error('Cancellation notification error (non-blocking):', notifError);
        }

        return NextResponse.json({
          success: true,
          reservation,
          message: 'Reservation cancelled',
        });
      }

      case 'assignTables': {
        const { reservationId, tableIds, assignedBy } = params;

        if (!reservationId || !tableIds) {
          return NextResponse.json(
            { error: 'Missing required fields: reservationId, tableIds' },
            { status: 400 }
          );
        }

        await assignTables(reservationId, tableIds, assignedBy);

        return NextResponse.json({
          success: true,
          message: `Assigned ${tableIds.length} tables`,
        });
      }

      case 'updateSettings': {
        const { locationId, ...settings } = params;

        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const updatedSettings = await upsertSettings(locationId, settings);

        return NextResponse.json({
          success: true,
          settings: updatedSettings,
          message: 'Settings updated',
        });
      }

      case 'blockSlot': {
        const {
          locationId,
          blockDate,
          startTime,
          endTime,
          sectionId,
          tableId,
          reason,
          blockType,
          createdBy,
        } = params;

        if (!locationId || !blockDate || !reason) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, blockDate, reason' },
            { status: 400 }
          );
        }

        const blockedSlot = await createBlockedSlot({
          location_id: locationId,
          block_date: blockDate,
          start_time: startTime,
          end_time: endTime,
          section_id: sectionId,
          table_id: tableId,
          reason: reason,
          block_type: blockType,
          created_by: createdBy,
        });

        return NextResponse.json({
          success: true,
          blockedSlot,
          message: 'Slot blocked',
        });
      }

      case 'unblockSlot': {
        const { blockId } = params;

        if (!blockId) {
          return NextResponse.json({ error: 'Missing required field: blockId' }, { status: 400 });
        }

        await deleteBlockedSlot(blockId);

        return NextResponse.json({
          success: true,
          message: 'Slot unblocked',
        });
      }

      case 'addNote': {
        const { reservationId, note, changedBy } = params;

        if (!reservationId || !note) {
          return NextResponse.json(
            { error: 'Missing required fields: reservationId, note' },
            { status: 400 }
          );
        }

        await addHistoryEntry({
          reservation_id: reservationId,
          action: 'note_added',
          notes: note,
          changed_by: changedBy,
        });

        return NextResponse.json({
          success: true,
          message: 'Note added',
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: create, updateStatus, cancel, assignTables, updateSettings, blockSlot, unblockSlot, addNote',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Reservations POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/reservations - Update reservation details
export async function PATCH(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reservationId, ...updates } = body;

    if (!reservationId) {
      return NextResponse.json({ error: 'Missing required field: reservationId' }, { status: 400 });
    }

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      guestName: 'guest_name',
      guestEmail: 'guest_email',
      guestPhone: 'guest_phone',
      partySize: 'party_size',
      reservationDate: 'reservation_date',
      reservationTime: 'reservation_time',
      durationMinutes: 'duration_minutes',
      sectionId: 'section_id',
      specialRequests: 'special_requests',
      dietaryRequirements: 'dietary_requirements',
      internalNotes: 'internal_notes',
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const reservation = await updateReservation(reservationId, mappedUpdates);

    return NextResponse.json({
      success: true,
      reservation,
      message: 'Reservation updated',
    });
  } catch (error) {
    console.error('Reservations PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
