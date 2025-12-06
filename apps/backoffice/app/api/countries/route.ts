import { NextResponse } from 'next/server';
import { supabase, Country } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const continent = searchParams.get('continent');
  const supported = searchParams.get('supported');

  let query = supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .order('name_en', { ascending: true });

  // Filter by continent
  if (continent) {
    query = query.eq('continent', continent);
  }

  // Filter by supported status
  if (supported === 'true') {
    query = query.eq('is_supported', true);
  }

  // Search by name
  if (search) {
    query = query.or(`name_en.ilike.%${search}%,name_native.ilike.%${search}%,code.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    countries: data as Country[],
    total: data?.length || 0
  });
}
