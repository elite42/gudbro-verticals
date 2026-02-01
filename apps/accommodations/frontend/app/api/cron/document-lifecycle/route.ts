import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cron/document-lifecycle
 *
 * Vercel Cron job: runs daily at 09:00 UTC.
 * Two responsibilities:
 *   A) Mark visa expiry reminder flags for documents approaching expiry
 *   B) GDPR auto-delete documents after retention period post-checkout
 *
 * Protected by CRON_SECRET authorization header.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends Authorization: Bearer <CRON_SECRET>)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  let remindersSent = 0;
  let deletionsProcessed = 0;
  let deletionsDeleted = 0;
  let deletionsFailed = 0;

  try {
    // ========================================================================
    // Part A: Visa Expiry Reminders
    // ========================================================================

    // Fetch all properties with their visa_reminder_days config
    const { data: properties, error: propError } = await supabase
      .from('accom_properties')
      .select('id, visa_reminder_days')
      .not('visa_reminder_days', 'is', null);

    if (propError) {
      console.error('document-lifecycle cron: properties query error', propError);
    }

    if (properties && properties.length > 0) {
      // Collect all unique reminder intervals across properties
      const intervalMap = new Map<number, string[]>();
      for (const prop of properties) {
        const days = (prop.visa_reminder_days as number[]) || [7, 3];
        for (const d of days) {
          if (!intervalMap.has(d)) {
            intervalMap.set(d, []);
          }
          intervalMap.get(d)!.push(prop.id);
        }
      }

      for (const [days, propertyIds] of Array.from(intervalMap.entries())) {
        // Determine which reminder flag to update
        const flagColumn = days === 7 ? 'reminder_sent_7d' : days === 3 ? 'reminder_sent_3d' : null;
        if (!flagColumn) {
          // For custom intervals, we skip flag updates (only 7d and 3d have DB columns)
          continue;
        }

        // Find visa documents expiring in exactly `days` days
        // that haven't had this reminder sent yet
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + days);
        const targetDateStr = targetDate.toISOString().split('T')[0];

        const { data: docs, error: docsError } = await supabase
          .from('accom_guest_documents')
          .select('id')
          .in('property_id', propertyIds)
          .eq('document_type', 'visa')
          .eq('visa_expiry_date', targetDateStr)
          .is('deleted_at', null)
          .is('superseded_by', null)
          .eq(flagColumn, false);

        if (docsError) {
          console.error(`document-lifecycle cron: ${days}d reminder query error`, docsError);
          continue;
        }

        if (docs && docs.length > 0) {
          const docIds = docs.map((d) => d.id);
          const { error: updateError } = await supabase
            .from('accom_guest_documents')
            .update({ [flagColumn]: true, updated_at: new Date().toISOString() })
            .in('id', docIds);

          if (updateError) {
            console.error(`document-lifecycle cron: ${days}d reminder update error`, updateError);
          } else {
            remindersSent += docIds.length;
            console.log(
              `document-lifecycle cron: marked ${docIds.length} visa docs for ${days}d reminder`
            );
          }
        }
      }
    }

    // ========================================================================
    // Part B: GDPR Auto-Delete (post-checkout retention)
    // ========================================================================

    // Find documents past retention period:
    // check_out_date + document_retention_days < today
    const { data: expiredDocs, error: expiredError } = await supabase.rpc('get_expired_documents');

    // If the RPC doesn't exist, fall back to a raw query approach
    let docsToDelete: Array<{ id: string; storage_path: string }> = [];

    if (expiredError) {
      // Fallback: query directly
      // We need documents where the booking checkout + retention days < now
      const { data: fallbackDocs, error: fallbackError } = await supabase
        .from('accom_guest_documents')
        .select(
          `
          id,
          storage_path,
          booking_id,
          property_id
        `
        )
        .is('deleted_at', null);

      if (fallbackError) {
        console.error('document-lifecycle cron: expired docs fallback query error', fallbackError);
      } else if (fallbackDocs && fallbackDocs.length > 0) {
        // For each document, check if it's past retention
        const propertyIds = Array.from(new Set(fallbackDocs.map((d) => d.property_id)));
        const bookingIds = Array.from(new Set(fallbackDocs.map((d) => d.booking_id)));

        const [{ data: propsData }, { data: bookingsData }] = await Promise.all([
          supabase
            .from('accom_properties')
            .select('id, document_retention_days')
            .in('id', propertyIds),
          supabase.from('accom_bookings').select('id, check_out_date').in('id', bookingIds),
        ]);

        const retentionMap = new Map<string, number>();
        for (const p of propsData || []) {
          retentionMap.set(p.id, p.document_retention_days ?? 30);
        }

        const checkoutMap = new Map<string, string>();
        for (const b of bookingsData || []) {
          checkoutMap.set(b.id, b.check_out_date);
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const doc of fallbackDocs) {
          const checkoutStr = checkoutMap.get(doc.booking_id);
          if (!checkoutStr) continue;

          const retentionDays = retentionMap.get(doc.property_id) ?? 30;
          const checkout = new Date(checkoutStr);
          checkout.setDate(checkout.getDate() + retentionDays);

          if (checkout < today) {
            docsToDelete.push({ id: doc.id, storage_path: doc.storage_path });
          }
        }
      }
    } else if (expiredDocs) {
      docsToDelete = expiredDocs as Array<{ id: string; storage_path: string }>;
    }

    deletionsProcessed = docsToDelete.length;

    // Delete each document: storage first, then soft-delete in DB
    for (const doc of docsToDelete) {
      try {
        const { error: storageErr } = await supabase.storage
          .from('guest-documents')
          .remove([doc.storage_path]);

        if (storageErr) {
          console.error(`document-lifecycle cron: storage delete failed for ${doc.id}`, storageErr);
          deletionsFailed++;
          // Skip DB soft-delete — retry next cron run
          continue;
        }

        const { error: dbErr } = await supabase
          .from('accom_guest_documents')
          .update({ deleted_at: new Date().toISOString(), updated_at: new Date().toISOString() })
          .eq('id', doc.id);

        if (dbErr) {
          console.error(`document-lifecycle cron: DB soft-delete failed for ${doc.id}`, dbErr);
          deletionsFailed++;
        } else {
          deletionsDeleted++;
        }
      } catch (err) {
        console.error(`document-lifecycle cron: error deleting doc ${doc.id}`, err);
        deletionsFailed++;
      }
    }

    return NextResponse.json({
      reminders: { sent: remindersSent },
      deletions: {
        processed: deletionsProcessed,
        deleted: deletionsDeleted,
        failed: deletionsFailed,
      },
    });
  } catch (err) {
    console.error('document-lifecycle cron error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
