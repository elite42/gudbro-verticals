import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';
import { sendInviteDeclinedEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token mancante' }, { status: 400 });
    }

    // Get invitation details before declining (for email notification)
    const { data: inviteData } = await supabase
      .from('staff_invitations')
      .select(
        `
        email,
        organizations!inner(name),
        accounts!staff_invitations_inviter_account_id_fkey(email, display_name, first_name)
      `
      )
      .eq('invite_token', token)
      .single();

    // Call the RPC function to decline the invitation
    const { data, error } = await supabase.rpc('decline_staff_invitation', {
      p_invite_token: token,
    });

    if (error) {
      console.error('[DeclineInvitation] RPC Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data !== true) {
      return NextResponse.json({ error: "Impossibile rifiutare l'invito" }, { status: 400 });
    }

    // Send notification email to inviter (async, don't wait)
    if (inviteData) {
      const inviterAccount = inviteData.accounts as any;
      const organization = inviteData.organizations as any;

      sendInviteDeclinedEmail({
        inviterEmail: inviterAccount?.email || '',
        inviterName: inviterAccount?.display_name || inviterAccount?.first_name || 'Team',
        inviteeEmail: inviteData.email,
        organizationName: organization?.name || 'Organizzazione',
      }).catch((err) => {
        console.error('[DeclineInvitation] Email notification failed:', err);
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DeclineInvitation] Error:', err);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
