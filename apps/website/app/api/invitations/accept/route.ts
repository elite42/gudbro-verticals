import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';
import { sendInviteAcceptedEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await request.json();
    const { token, authId } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token mancante' }, { status: 400 });
    }

    // Get invitation details before accepting (for email notification)
    const { data: inviteData } = await supabase
      .from('staff_invitations')
      .select(
        `
        email,
        first_name,
        role_title,
        organizations!inner(name),
        accounts!staff_invitations_inviter_account_id_fkey(email, display_name, first_name)
      `
      )
      .eq('invite_token', token)
      .single();

    // Call the RPC function to accept the invitation
    const { data, error } = await supabase.rpc('accept_staff_invitation', {
      p_invite_token: token,
      p_auth_id: authId || null,
    });

    if (error) {
      console.error('[AcceptInvitation] RPC Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Errore nell'accettazione" }, { status: 500 });
    }

    const result = data[0];

    if (!result.success) {
      return NextResponse.json(
        { error: result.error_message || "Errore nell'accettazione" },
        { status: 400 }
      );
    }

    // Send notification email to inviter (async, don't wait)
    if (inviteData) {
      const inviterAccount = inviteData.accounts as any;
      const organization = inviteData.organizations as any;

      sendInviteAcceptedEmail({
        inviterEmail: inviterAccount?.email || '',
        inviterName: inviterAccount?.display_name || inviterAccount?.first_name || 'Team',
        inviteeName: inviteData.first_name || inviteData.email.split('@')[0],
        inviteeEmail: inviteData.email,
        organizationName: organization?.name || 'Organizzazione',
        roleTitle: inviteData.role_title,
      }).catch((err) => {
        console.error('[AcceptInvitation] Email notification failed:', err);
      });
    }

    return NextResponse.json({
      success: true,
      accountId: result.account_id,
      organizationId: result.organization_id,
    });
  } catch (err) {
    console.error('[AcceptInvitation] Error:', err);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
