import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/welcome';
  const type = requestUrl.searchParams.get('type');

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.redirect(new URL('/sign-in?error=config_error', requestUrl.origin));
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Auth callback error:', error);
        return NextResponse.redirect(new URL('/sign-in?error=auth_callback_error', requestUrl.origin));
      }

      // Record login in P5 accounts system
      try {
        await supabase.rpc('record_user_login');
      } catch {
        // Ignore errors - login recording is not critical
      }

      // Redirect based on account type
      if (type === 'business') {
        // Business accounts go to backoffice
        return NextResponse.redirect('https://gudbro-backoffice.vercel.app/dashboard');
      }

      // Personal accounts go to welcome page
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    } catch (err) {
      console.error('Auth callback exception:', err);
      return NextResponse.redirect(new URL('/sign-in?error=auth_callback_error', requestUrl.origin));
    }
  }

  // No code provided
  return NextResponse.redirect(new URL('/sign-in', requestUrl.origin));
}
