/**
 * API Route: Staff Self-Assign
 *
 * Allows staff to self-assign to a table by scanning its QR code
 *
 * @route POST /api/staff/self-assign - Self-assign to table
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get account and staff profile
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 });
    }

    // Get staff profile
    const { data: staffProfile } = await supabase
      .from('staff_profiles')
      .select('id, location_id')
      .eq('account_id', account.id)
      .eq('status', 'active')
      .single();

    if (!staffProfile) {
      return NextResponse.json(
        { success: false, error: 'Staff profile not found or inactive' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { tableNumber, locationId, tableId } = body;

    if (!locationId && !tableId) {
      return NextResponse.json(
        { success: false, error: 'Location ID or Table ID required' },
        { status: 400 }
      );
    }

    // Verify the table exists
    let tableQuery = supabase.from('location_tables').select(`
        id,
        location_id,
        section_id,
        table_number,
        display_name,
        location_sections(name)
      `);

    if (tableId) {
      tableQuery = tableQuery.eq('id', tableId);
    } else if (tableNumber && locationId) {
      tableQuery = tableQuery.eq('location_id', locationId).eq('table_number', tableNumber);
    }

    const { data: table, error: tableError } = (await tableQuery.single()) as {
      data: {
        id: string;
        location_id: string;
        section_id: string | null;
        table_number: string;
        display_name: string | null;
        location_sections: { name: string } | null;
      } | null;
      error: unknown;
    };

    if (tableError || !table) {
      return NextResponse.json({ success: false, error: 'Table not found' }, { status: 404 });
    }

    const today = new Date().toISOString().split('T')[0];

    // Check if already assigned to this table today
    const { data: existingAssignment } = await supabase
      .from('staff_table_assignments')
      .select('id')
      .eq('staff_id', staffProfile.id)
      .eq('table_id', table.id)
      .eq('shift_date', today)
      .eq('is_active', true)
      .maybeSingle();

    if (existingAssignment) {
      return NextResponse.json({
        success: true,
        message: 'Already assigned to this table',
        assignmentId: existingAssignment.id,
        alreadyAssigned: true,
        tableNumber: table.table_number,
        tableName: table.display_name,
        sectionName: table.location_sections?.name,
      });
    }

    // Create self-assignment
    const { data: newAssignment, error: insertError } = await supabase
      .from('staff_table_assignments')
      .insert({
        staff_id: staffProfile.id,
        location_id: table.location_id,
        table_id: table.id,
        shift_date: today,
        assignment_method: 'self_assign',
        assigned_by: account.id,
        is_active: true,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error creating self-assignment:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to create assignment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Assigned to table ${table.display_name || table.table_number}`,
      assignmentId: newAssignment.id,
      tableNumber: table.table_number,
      tableName: table.display_name,
      sectionName: table.location_sections?.name,
      table: {
        id: table.id,
        number: table.table_number,
        name: table.display_name,
      },
    });
  } catch (error) {
    console.error('Error in self-assign API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET - Get current staff's assignments and requests for today
 *
 * Query params:
 * - status: 'pending' | 'in_progress' | 'completed' | 'all'
 * - onlyMine: 'true' to filter only assigned to current staff
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status') || 'pending';
    const onlyMine = searchParams.get('onlyMine') === 'true';

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Get account and staff profile
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 });
    }

    // Get staff profile with merchant info
    const { data: staffProfile } = await supabase
      .from('staff_profiles')
      .select('id, location_id, merchant_id, display_name')
      .eq('account_id', account.id)
      .single();

    if (!staffProfile) {
      return NextResponse.json(
        { success: false, error: 'Staff profile not found' },
        { status: 404 }
      );
    }

    const today = new Date().toISOString().split('T')[0];

    // Get today's assignments
    const { data: assignments } = await supabase
      .from('staff_table_assignments')
      .select(
        `
        id,
        section_id,
        table_id,
        shift_start,
        shift_end,
        assignment_method,
        location_sections(name),
        location_tables(table_number, display_name)
      `
      )
      .eq('staff_id', staffProfile.id)
      .eq('shift_date', today)
      .eq('is_active', true);

    // Build request query based on filters
    let requestsQuery = supabase
      .from('hot_action_requests')
      .select(
        `
        id,
        table_number,
        customer_note,
        status,
        priority,
        created_at,
        acknowledged_at,
        completed_at,
        assigned_to_staff_id,
        hot_action_types(code, name, icon),
        staff_profiles!hot_action_requests_assigned_to_staff_id_fkey(display_name)
      `
      )
      .eq('location_id', staffProfile.location_id)
      .order('created_at', { ascending: false })
      .limit(50);

    // Apply status filter
    if (statusFilter === 'pending') {
      requestsQuery = requestsQuery.eq('status', 'pending');
    } else if (statusFilter === 'in_progress') {
      requestsQuery = requestsQuery.eq('status', 'acknowledged');
    } else if (statusFilter === 'completed') {
      requestsQuery = requestsQuery.in('status', ['completed', 'cancelled']);
    }
    // 'all' shows everything

    // Apply onlyMine filter
    if (onlyMine) {
      requestsQuery = requestsQuery.eq('assigned_to_staff_id', staffProfile.id);
    }

    const { data: requests } = await requestsQuery;

    // Separate pending from completed for the response
    const pendingRequests = (requests || [])
      .filter((r: any) => r.status === 'pending' || r.status === 'acknowledged')
      .map((r: any) => ({
        id: r.id,
        tableNumber: r.table_number,
        type: r.hot_action_types?.code,
        typeName: r.hot_action_types?.name,
        icon: r.hot_action_types?.icon,
        note: r.customer_note,
        status: r.status === 'acknowledged' ? 'in_progress' : r.status,
        priority: r.priority,
        createdAt: r.created_at,
        acknowledgedAt: r.acknowledged_at,
        assignedTo: r.assigned_to_staff_id,
        assignedToName: r.staff_profiles?.display_name,
      }));

    const completedRequests = (requests || [])
      .filter((r: any) => r.status === 'completed' || r.status === 'cancelled')
      .map((r: any) => ({
        id: r.id,
        tableNumber: r.table_number,
        type: r.hot_action_types?.code,
        typeName: r.hot_action_types?.name,
        icon: r.hot_action_types?.icon,
        note: r.customer_note,
        status: r.status,
        priority: r.priority,
        createdAt: r.created_at,
        completedAt: r.completed_at,
        assignedTo: r.assigned_to_staff_id,
        assignedToName: r.staff_profiles?.display_name,
      }));

    return NextResponse.json({
      success: true,
      staff: {
        id: staffProfile.id,
        name: staffProfile.display_name,
      },
      assignments: (assignments || []).map((a: any) => ({
        id: a.id,
        type: a.table_id ? 'table' : a.section_id ? 'section' : 'location',
        sectionName: a.location_sections?.name,
        tableNumber: a.location_tables?.table_number,
        tableName: a.location_tables?.display_name,
        shiftStart: a.shift_start,
        shiftEnd: a.shift_end,
        method: a.assignment_method,
      })),
      pendingRequests,
      completedRequests,
    });
  } catch (error) {
    console.error('Error in self-assign GET:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
