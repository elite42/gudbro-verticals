import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/billing/invoices
 * Get user's invoices
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const {
      data: invoices,
      count,
      error,
    } = await supabase
      .from('invoices')
      .select('*', { count: 'exact' })
      .eq('account_id', account.id)
      .order('invoice_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[InvoicesAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      invoices:
        invoices?.map((inv) => ({
          id: inv.id,
          number: inv.invoice_number,
          status: inv.status,
          total: inv.total / 100, // Convert from cents
          currency: inv.currency,
          invoiceDate: inv.invoice_date,
          dueDate: inv.due_date,
          paidAt: inv.paid_at,
          pdfUrl: inv.invoice_pdf_url,
          hostedUrl: inv.hosted_invoice_url,
        })) || [],
      total: count || 0,
    });
  } catch (err) {
    console.error('[InvoicesAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
