import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

/**
 * POST /api/requests/action
 *
 * Handle request actions: acknowledge, complete, reassign
 * Used by Staff PWA to manage hot action requests
 *
 * Special handling for cross-assignment:
 * When a staff member takes a request for a table not assigned to them,
 * they can choose to:
 * - takeoverTable: false → Handle just this request (table stays with original staff)
 * - takeoverTable: true → Take over the table entirely
 *
 * Use checkOnly: true to check if confirmation is needed without performing action
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
    }

    const body = await request.json();
    const { requestId, action, note, reassignTo, takeoverTable, checkOnly } = body;

    if (!requestId || !action) {
      return NextResponse.json({ error: 'requestId e action sono richiesti' }, { status: 400 });
    }

    // Get current request with table info
    const { data: requestData, error: fetchError } = await supabase
      .from('hot_action_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError || !requestData) {
      return NextResponse.json({ error: 'Richiesta non trovata' }, { status: 404 });
    }

    // Get account first
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account non trovato' }, { status: 403 });
    }

    // Get staff profile
    const { data: staffProfile } = await supabase
      .from('staff_profiles')
      .select('id, merchant_id, location_id, display_name')
      .eq('account_id', account.id)
      .single();

    if (!staffProfile) {
      return NextResponse.json({ error: 'Profilo staff non trovato' }, { status: 403 });
    }

    const now = new Date().toISOString();
    const today = now.split('T')[0];

    // For acknowledge action, check if this is someone else's table
    if (action === 'acknowledge') {
      // Find current table assignment
      const { data: tableAssignments } = await supabase
        .from('staff_table_assignments')
        .select(
          `
          id,
          staff_id,
          table_id,
          section_id,
          staff_profiles!inner(id, display_name)
        `
        )
        .eq('location_id', requestData.location_id)
        .eq('shift_date', today)
        .eq('is_active', true);

      // Find who is assigned to this table (by table_number)
      // First, get the table info
      const { data: tableInfo } = await supabase
        .from('location_tables')
        .select('id, section_id')
        .eq('location_id', requestData.location_id)
        .eq('table_number', requestData.table_number)
        .single();

      let assignedStaff: { id: string; name: string } | null = null;
      let assignmentId: string | null = null;

      if (tableInfo && tableAssignments) {
        // Check for direct table assignment
        const directAssignment = tableAssignments.find(
          (a: any) => a.table_id === tableInfo.id && a.staff_id !== staffProfile.id
        );

        if (directAssignment) {
          assignedStaff = {
            id: (directAssignment as any).staff_profiles.id,
            name: (directAssignment as any).staff_profiles.display_name,
          };
          assignmentId = directAssignment.id;
        } else if (tableInfo.section_id) {
          // Check for section assignment
          const sectionAssignment = tableAssignments.find(
            (a: any) => a.section_id === tableInfo.section_id && a.staff_id !== staffProfile.id
          );
          if (sectionAssignment) {
            assignedStaff = {
              id: (sectionAssignment as any).staff_profiles.id,
              name: (sectionAssignment as any).staff_profiles.display_name,
            };
            assignmentId = sectionAssignment.id;
          }
        }
      }

      // If checkOnly, return assignment info without performing action
      if (checkOnly) {
        return NextResponse.json({
          success: true,
          checkOnly: true,
          needsConfirmation: !!assignedStaff,
          assignedTo: assignedStaff,
          tableNumber: requestData.table_number,
        });
      }

      // If table is assigned to someone else and no explicit choice made
      if (assignedStaff && takeoverTable === undefined) {
        return NextResponse.json({
          success: false,
          needsConfirmation: true,
          assignedTo: assignedStaff,
          tableNumber: requestData.table_number,
          message: `Questo tavolo è assegnato a ${assignedStaff.name}. Vuoi solo gestire questa richiesta o prendere in carico il tavolo?`,
        });
      }

      // If takeoverTable is true, transfer the table assignment
      if (assignedStaff && takeoverTable && assignmentId && tableInfo) {
        // Deactivate the old assignment
        await supabase
          .from('staff_table_assignments')
          .update({ is_active: false })
          .eq('id', assignmentId);

        // Create new assignment for current staff
        await supabase.from('staff_table_assignments').insert({
          staff_id: staffProfile.id,
          location_id: requestData.location_id,
          table_id: tableInfo.id,
          shift_date: today,
          assignment_method: 'takeover',
          assigned_by: account.id,
          is_active: true,
          notes: `Preso in carico da ${assignedStaff.name}`,
        });
      }
    }

    let updateData: Record<string, unknown> = {};
    let escalationData: Record<string, unknown> | null = null;

    // Calculate response time for acknowledge action
    const responseTimeSeconds = Math.round(
      (new Date(now).getTime() - new Date(requestData.created_at).getTime()) / 1000
    );

    switch (action) {
      case 'acknowledge':
        // Take ownership of the request
        updateData = {
          status: 'acknowledged',
          assigned_to_staff_id: staffProfile.id,
          acknowledged_at: now,
          acknowledged_by: staffProfile.id,
          response_time_seconds: responseTimeSeconds,
        };

        // Store original assignee if different
        if (
          requestData.assigned_to_staff_id &&
          requestData.assigned_to_staff_id !== staffProfile.id
        ) {
          updateData.original_assigned_staff_id = requestData.assigned_to_staff_id;
        }

        // Cancel any pending escalation
        escalationData = {
          escalation_cancelled: true,
          escalation_cancelled_at: now,
          escalation_cancelled_by: staffProfile.id,
        };
        break;

      case 'complete':
        // Mark request as completed
        updateData = {
          status: 'completed',
          completed_at: now,
          completed_by: staffProfile.id,
        };
        break;

      case 'reassign':
        // Reassign to another staff member
        if (!reassignTo) {
          return NextResponse.json(
            { error: 'reassignTo è richiesto per questa azione' },
            { status: 400 }
          );
        }

        updateData = {
          assigned_to_staff_id: reassignTo,
          original_assigned_staff_id: requestData.assigned_to_staff_id || staffProfile.id,
        };
        break;

      case 'cancel':
        // Cancel the request (customer changed mind, etc.)
        updateData = {
          status: 'cancelled',
          completed_at: now,
          completed_by: staffProfile.id,
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Azione non valida. Usa: acknowledge, complete, reassign, cancel' },
          { status: 400 }
        );
    }

    // Update the request
    const { error: updateError } = await supabase
      .from('hot_action_requests')
      .update(updateData)
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating request:', updateError);
      return NextResponse.json(
        { error: "Errore nell'aggiornamento della richiesta" },
        { status: 500 }
      );
    }

    // Handle escalation cancellation if needed
    if (escalationData) {
      const { error: escalationError } = await supabase
        .from('escalation_events')
        .update({
          status: 'cancelled',
          resolved_at: now,
          resolved_by: staffProfile.id,
        })
        .eq('request_id', requestId)
        .in('status', ['pending', 'sent']);

      if (escalationError) {
        console.warn('[Requests] Escalation update skipped:', escalationError.message);
      }
    }

    // Log the action for analytics
    const { error: logError } = await supabase.from('request_action_logs').insert({
      request_id: requestId,
      action,
      performed_by: staffProfile.id,
      performed_at: now,
      note,
      previous_status: requestData.status,
      new_status: updateData.status || requestData.status,
    });

    if (logError) {
      console.warn('[Requests] Action log skipped:', logError.message);
    }

    return NextResponse.json({
      success: true,
      action,
      requestId,
      performedBy: staffProfile.display_name,
      responseTimeSeconds: action === 'acknowledge' ? responseTimeSeconds : null,
      tableTakenOver: takeoverTable === true,
      message: getActionMessage(action, takeoverTable),
    });
  } catch (error) {
    console.error('Request action error:', error);
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}

function getActionMessage(action: string, tableTakenOver?: boolean): string {
  switch (action) {
    case 'acknowledge':
      return tableTakenOver
        ? 'Richiesta presa in carico e tavolo assegnato a te'
        : 'Richiesta presa in carico';
    case 'complete':
      return 'Richiesta completata';
    case 'reassign':
      return 'Richiesta riassegnata';
    case 'cancel':
      return 'Richiesta annullata';
    default:
      return 'Azione completata';
  }
}
