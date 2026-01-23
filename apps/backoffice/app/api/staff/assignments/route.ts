/**
 * API Route: Staff Table/Section Assignments
 *
 * Manages staff assignments to tables and sections
 *
 * @route GET /api/staff/assignments - List assignments for a location
 * @route POST /api/staff/assignments - Create/update assignment
 * @route DELETE /api/staff/assignments - Remove assignment
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

interface Assignment {
  id: string;
  staffId: string;
  staffName: string;
  staffPhoto?: string;
  locationId: string;
  sectionId?: string;
  sectionName?: string;
  tableId?: string;
  tableNumber?: string;
  shiftDate: string;
  shiftStart?: string;
  shiftEnd?: string;
  assignmentMethod: string;
  isActive: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('locationId');
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const staffId = searchParams.get('staffId');

    if (!locationId) {
      return NextResponse.json({ success: false, error: 'Location ID required' }, { status: 400 });
    }

    let query = supabase
      .from('staff_table_assignments')
      .select(
        `
        id,
        staff_id,
        location_id,
        section_id,
        table_id,
        shift_date,
        shift_start,
        shift_end,
        assignment_method,
        is_active,
        staff_profiles!inner(display_name, photo_url),
        location_sections(name),
        location_tables(table_number, display_name)
      `
      )
      .eq('location_id', locationId)
      .eq('shift_date', date)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (staffId) {
      query = query.eq('staff_id', staffId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching assignments:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch assignments' },
        { status: 500 }
      );
    }

    const assignments: Assignment[] = (data || []).map((a: any) => ({
      id: a.id,
      staffId: a.staff_id,
      staffName: a.staff_profiles?.display_name || 'Unknown',
      staffPhoto: a.staff_profiles?.photo_url,
      locationId: a.location_id,
      sectionId: a.section_id,
      sectionName: a.location_sections?.name,
      tableId: a.table_id,
      tableNumber: a.location_tables?.table_number,
      tableName: a.location_tables?.display_name,
      shiftDate: a.shift_date,
      shiftStart: a.shift_start,
      shiftEnd: a.shift_end,
      assignmentMethod: a.assignment_method,
      isActive: a.is_active,
    }));

    return NextResponse.json({
      success: true,
      assignments,
      date,
    });
  } catch (error) {
    console.error('Error in assignments API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

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

    // Get account ID
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    const body = await request.json();
    const {
      staffId,
      locationId,
      sectionId,
      tableId,
      shiftDate,
      shiftStart,
      shiftEnd,
      assignmentMethod = 'manager',
    } = body;

    if (!staffId || !locationId) {
      return NextResponse.json(
        { success: false, error: 'Staff ID and Location ID required' },
        { status: 400 }
      );
    }

    // Check for existing assignment on same date
    const { data: existing } = await supabase
      .from('staff_table_assignments')
      .select('id')
      .eq('staff_id', staffId)
      .eq('location_id', locationId)
      .eq('shift_date', shiftDate || new Date().toISOString().split('T')[0])
      .eq('is_active', true)
      .maybeSingle();

    if (existing && !sectionId && !tableId) {
      // Update existing location-wide assignment
      const { error: updateError } = await supabase
        .from('staff_table_assignments')
        .update({
          shift_start: shiftStart,
          shift_end: shiftEnd,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (updateError) {
        return NextResponse.json(
          { success: false, error: 'Failed to update assignment' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        assignmentId: existing.id,
        message: 'Assignment updated',
      });
    }

    // Create new assignment
    const { data: newAssignment, error: insertError } = await supabase
      .from('staff_table_assignments')
      .insert({
        staff_id: staffId,
        location_id: locationId,
        section_id: sectionId || null,
        table_id: tableId || null,
        shift_date: shiftDate || new Date().toISOString().split('T')[0],
        shift_start: shiftStart || null,
        shift_end: shiftEnd || null,
        assignment_method: assignmentMethod,
        assigned_by: account?.id || null,
        is_active: true,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Error creating assignment:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to create assignment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      assignmentId: newAssignment.id,
      message: 'Assignment created',
    });
  } catch (error) {
    console.error('Error in assignments API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const assignmentId = searchParams.get('assignmentId');

    if (!assignmentId) {
      return NextResponse.json(
        { success: false, error: 'Assignment ID required' },
        { status: 400 }
      );
    }

    // Soft delete by setting is_active = false
    const { error } = await supabase
      .from('staff_table_assignments')
      .update({ is_active: false })
      .eq('id', assignmentId);

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to remove assignment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Assignment removed',
    });
  } catch (error) {
    console.error('Error in assignments API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
