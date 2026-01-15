// Escalations API
// Manage escalated customer conversations

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/lib/supabase-server';

// GET - List escalations for the merchant's locations
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status'); // pending, assigned, in_progress, resolved
  const priority = searchParams.get('priority'); // low, normal, high, urgent
  const locationId = searchParams.get('locationId');

  // Get user's locations
  const { data: roles } = await supabase
    .from('account_roles')
    .select('tenant_id')
    .eq('account_id', user.id)
    .eq('tenant_type', 'location')
    .in('role_type', ['owner', 'manager']);

  const locationIds = roles?.map((r: { tenant_id: string }) => r.tenant_id) || [];

  if (locationIds.length === 0) {
    return NextResponse.json({ escalations: [] });
  }

  // Build query
  const adminSupabase = supabaseAdmin;
  let query = adminSupabase
    .from('conversation_escalations')
    .select(
      `
      *,
      conversation:customer_conversations(
        id,
        customer_name,
        customer_phone,
        customer_email,
        channel,
        topic,
        total_messages,
        last_message_at
      ),
      assigned_user:accounts!conversation_escalations_assigned_to_fkey(
        id,
        full_name,
        email
      )
    `
    )
    .in('location_id', locationId ? [locationId] : locationIds)
    .order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  if (priority) {
    query = query.eq('priority', priority);
  }

  const { data: escalations, error } = await query.limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ escalations });
}

// PATCH - Update escalation (assign, resolve, etc.)
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { escalationId, status, assignedTo, resolution, priority } = body;

  if (!escalationId) {
    return NextResponse.json({ error: 'escalationId is required' }, { status: 400 });
  }

  const adminSupabase = supabaseAdmin;

  // Build update object
  const updates: Record<string, unknown> = {};

  if (status) {
    updates.status = status;
    if (status === 'resolved') {
      updates.resolved_at = new Date().toISOString();
    }
  }

  if (assignedTo !== undefined) {
    updates.assigned_to = assignedTo;
    updates.assigned_at = new Date().toISOString();
    if (!status) {
      updates.status = 'assigned';
    }
  }

  if (resolution) {
    updates.resolution = resolution;
  }

  if (priority) {
    updates.priority = priority;
  }

  const { data: escalation, error } = await adminSupabase
    .from('conversation_escalations')
    .update(updates)
    .eq('id', escalationId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If resolved, also close the conversation
  if (status === 'resolved') {
    const { data: escData } = await adminSupabase
      .from('conversation_escalations')
      .select('conversation_id')
      .eq('id', escalationId)
      .single();

    if (escData?.conversation_id) {
      await adminSupabase
        .from('customer_conversations')
        .update({ status: 'closed', closed_at: new Date().toISOString() })
        .eq('id', escData.conversation_id);
    }
  }

  return NextResponse.json({ escalation });
}
