import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token) {
    return NextResponse.json({ error: 'Token mancante' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('staff_invitations')
      .select(`
        id,
        email,
        first_name,
        last_name,
        role_title,
        permissions,
        message,
        status,
        expires_at,
        organizations!inner(name),
        accounts!staff_invitations_inviter_account_id_fkey(email, display_name)
      `)
      .eq('invite_token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invito non trovato' }, { status: 404 });
    }

    // Check if invitation is still valid
    if (data.status !== 'pending') {
      return NextResponse.json({ error: 'Invito già utilizzato' }, { status: 410 });
    }

    const expiresAt = new Date(data.expires_at);
    if (expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invito scaduto' }, { status: 410 });
    }

    // Return invitation details
    return NextResponse.json({
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      roleTitle: data.role_title,
      permissions: data.permissions || {},
      organizationName: (data.organizations as any)?.name || 'Organizzazione',
      inviterEmail: (data.accounts as any)?.email || '',
      inviterName: (data.accounts as any)?.display_name,
      message: data.message,
      expiresAt: data.expires_at,
    });
  } catch (err) {
    console.error('[InvitationsAPI] Error:', err);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}
