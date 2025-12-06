import { NextResponse } from 'next/server';
import { supabase, Language } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search');
  const direction = searchParams.get('direction');

  let query = supabase
    .from('languages')
    .select('*')
    .eq('is_active', true)
    .order('name_en', { ascending: true });

  // Filter by direction (ltr/rtl)
  if (direction === 'rtl' || direction === 'ltr') {
    query = query.eq('direction', direction);
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
    languages: data as Language[],
    total: data?.length || 0
  });
}
