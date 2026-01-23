/**
 * API Route: Staff Invitations
 *
 * Handles staff invitation CRUD operations
 *
 * @route GET /api/staff/invite - List pending invitations
 * @route POST /api/staff/invite - Create new invitation
 * @route DELETE /api/staff/invite - Revoke invitation
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { inviteStaffMember, getPendingInvitations, revokeInvitation } from '@/lib/staff-service';

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
    const organizationId = searchParams.get('organizationId');

    if (!organizationId) {
      return NextResponse.json(
        { success: false, error: 'Organization ID required' },
        { status: 400 }
      );
    }

    const invitations = await getPendingInvitations(organizationId);

    return NextResponse.json({
      success: true,
      invitations,
    });
  } catch (error) {
    console.error('Error fetching invitations:', error);
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

    // Get account ID from auth_id
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const {
      organizationId,
      email,
      firstName,
      lastName,
      roleTitle,
      permissions,
      message,
      brandId,
      locationId,
    } = body;

    if (!organizationId || !email) {
      return NextResponse.json(
        { success: false, error: 'Organization ID and email required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
    }

    const result = await inviteStaffMember(account.id, organizationId, email, {
      firstName,
      lastName,
      roleTitle: roleTitle || 'staff',
      permissions: permissions || {},
      message,
      brandId,
      locationId,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        invitationId: result.invitationId,
        message: `Invito inviato a ${email}`,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send invitation' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error sending invitation:', error);
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

    // Get account ID from auth_id
    const { data: account, error: accountError } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ success: false, error: 'Account not found' }, { status: 404 });
    }

    const searchParams = request.nextUrl.searchParams;
    const invitationId = searchParams.get('invitationId');

    if (!invitationId) {
      return NextResponse.json(
        { success: false, error: 'Invitation ID required' },
        { status: 400 }
      );
    }

    const success = await revokeInvitation(invitationId, account.id);

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Invitation revoked',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to revoke invitation' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error revoking invitation:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
