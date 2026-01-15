/**
 * QR Code Service
 * CRUD operations for QR codes
 */

import { createClient } from '@supabase/supabase-js';
import { QRCode, CreateQRCodeInput, UpdateQRCodeInput, ListQRCodesOptions } from './qr-types';

// Lazy init Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase configuration');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

/**
 * Generate a unique short code for QR URLs
 */
function generateShortCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * List QR codes for a merchant
 */
export async function listQRCodes(
  merchantId: string,
  options: ListQRCodesOptions = {}
): Promise<{ data: QRCode[]; count: number }> {
  const supabase = getSupabase();
  const {
    filters = {},
    limit = 50,
    offset = 0,
    orderBy = 'created_at',
    orderDir = 'desc',
  } = options;

  let query = supabase
    .from('qr_codes')
    .select('*', { count: 'exact' })
    .eq('merchant_id', merchantId);

  // Apply filters
  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  if (filters.context) {
    query = query.eq('context', filters.context);
  }
  if (filters.source) {
    query = query.eq('source', filters.source);
  }
  if (filters.is_active !== undefined) {
    query = query.eq('is_active', filters.is_active);
  }

  // Apply ordering
  query = query.order(orderBy, { ascending: orderDir === 'asc' });

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    console.error('[QRService] List error:', error);
    throw new Error(`Failed to list QR codes: ${error.message}`);
  }

  return {
    data: (data as QRCode[]) || [],
    count: count || 0,
  };
}

/**
 * Get a single QR code by ID
 */
export async function getQRCode(id: string): Promise<QRCode | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase.from('qr_codes').select('*').eq('id', id).single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('[QRService] Get error:', error);
    throw new Error(`Failed to get QR code: ${error.message}`);
  }

  return data as QRCode;
}

/**
 * Create a new QR code
 */
export async function createQRCode(
  merchantId: string,
  input: Omit<CreateQRCodeInput, 'merchant_id'>
): Promise<QRCode> {
  const supabase = getSupabase();

  // Generate short code if using short URLs
  const short_code = input.use_short_url !== false ? generateShortCode() : null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('qr_codes')
    .insert({
      ...input,
      merchant_id: merchantId,
      short_code,
      is_active: true,
      total_scans: 0,
    })
    .select()
    .single();

  if (error) {
    console.error('[QRService] Create error:', error);
    throw new Error(`Failed to create QR code: ${error.message}`);
  }

  return data as QRCode;
}

/**
 * Update a QR code
 */
export async function updateQRCode(id: string, input: UpdateQRCodeInput): Promise<QRCode> {
  const supabase = getSupabase();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('qr_codes')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[QRService] Update error:', error);
    throw new Error(`Failed to update QR code: ${error.message}`);
  }

  return data as QRCode;
}

/**
 * Toggle QR code active status
 */
export async function toggleQRCodeActive(id: string, is_active: boolean): Promise<QRCode> {
  return updateQRCode(id, { is_active });
}

/**
 * Delete a QR code
 */
export async function deleteQRCode(id: string): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase.from('qr_codes').delete().eq('id', id);

  if (error) {
    console.error('[QRService] Delete error:', error);
    throw new Error(`Failed to delete QR code: ${error.message}`);
  }
}

/**
 * Get QR code analytics
 */
export async function getQRCodeAnalytics(
  qrCodeId: string,
  options: { startDate?: string; endDate?: string } = {}
): Promise<{
  totalScans: number;
  uniqueDevices: number;
  byDevice: Record<string, number>;
  byOS: Record<string, number>;
  byBrowser: Record<string, number>;
  byCountry: Record<string, number>;
  timeline: { date: string; count: number }[];
}> {
  const supabase = getSupabase();

  // Type for QR scan row (table not in generated types)
  type QRScanRow = {
    ip_address?: string;
    device_type?: string;
    os?: string;
    browser?: string;
    country?: string;
    scanned_at?: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query = (supabase as any).from('qr_scans').select('*').eq('qr_code_id', qrCodeId);

  if (options.startDate) {
    query = query.gte('scanned_at', options.startDate);
  }
  if (options.endDate) {
    query = query.lte('scanned_at', options.endDate);
  }

  const { data: scans, error } = (await query) as { data: QRScanRow[] | null; error: Error | null };

  if (error) {
    console.error('[QRService] Analytics error:', error);
    throw new Error(`Failed to get analytics: ${error.message}`);
  }

  const allScans = scans || [];

  // Calculate metrics
  const byDevice: Record<string, number> = {};
  const byOS: Record<string, number> = {};
  const byBrowser: Record<string, number> = {};
  const byCountry: Record<string, number> = {};
  const byDate: Record<string, number> = {};
  const uniqueIPs = new Set<string>();

  allScans.forEach((scan) => {
    if (scan.ip_address) uniqueIPs.add(scan.ip_address);

    const device = scan.device_type || 'unknown';
    byDevice[device] = (byDevice[device] || 0) + 1;

    const os = scan.os || 'unknown';
    byOS[os] = (byOS[os] || 0) + 1;

    const browser = scan.browser || 'unknown';
    byBrowser[browser] = (byBrowser[browser] || 0) + 1;

    const country = scan.country || 'unknown';
    byCountry[country] = (byCountry[country] || 0) + 1;

    const date = scan.scanned_at?.split('T')[0] || 'unknown';
    byDate[date] = (byDate[date] || 0) + 1;
  });

  // Create timeline
  const timeline = Object.entries(byDate)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalScans: allScans.length,
    uniqueDevices: uniqueIPs.size,
    byDevice,
    byOS,
    byBrowser,
    byCountry,
    timeline,
  };
}

// Alias for backwards compatibility
export const getQRAnalytics = getQRCodeAnalytics;

/**
 * Bulk create QR codes
 */
export async function bulkCreateQRCodes(
  merchantId: string,
  inputs: Omit<CreateQRCodeInput, 'merchant_id'>[]
): Promise<QRCode[]> {
  const results: QRCode[] = [];
  for (const input of inputs) {
    const qr = await createQRCode(merchantId, input);
    results.push(qr);
  }
  return results;
}

/**
 * Get merchant QR stats summary
 */
export async function getMerchantQRStats(merchantId: string): Promise<{
  totalQRCodes: number;
  activeQRCodes: number;
  totalScans: number;
  topPerformers: { id: string; title: string | null; scans: number }[];
}> {
  const supabase = getSupabase();

  // Type for QR code stats row (table not in generated types)
  type QRStatsRow = {
    id: string;
    title: string | null;
    is_active: boolean;
    total_scans: number;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: qrCodes, error } = (await (supabase as any)
    .from('qr_codes')
    .select('id, title, is_active, total_scans')
    .eq('merchant_id', merchantId)
    .order('total_scans', { ascending: false })) as {
    data: QRStatsRow[] | null;
    error: Error | null;
  };

  if (error) {
    console.error('[QRService] Stats error:', error);
    throw new Error(`Failed to get QR stats: ${error.message}`);
  }

  const all = qrCodes || [];

  return {
    totalQRCodes: all.length,
    activeQRCodes: all.filter((q) => q.is_active).length,
    totalScans: all.reduce((sum, q) => sum + (q.total_scans || 0), 0),
    topPerformers: all.slice(0, 5).map((q) => ({
      id: q.id,
      title: q.title,
      scans: q.total_scans || 0,
    })),
  };
}

/**
 * Get source performance for a merchant
 */
export async function getMerchantSourcePerformance(merchantId: string): Promise<{
  bySource: Record<string, { qrCount: number; totalScans: number }>;
}> {
  const supabase = getSupabase();

  // Type for source performance row (table not in generated types)
  type QRSourceRow = {
    source: string | null;
    total_scans: number;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: qrCodes, error } = (await (supabase as any)
    .from('qr_codes')
    .select('source, total_scans')
    .eq('merchant_id', merchantId)) as { data: QRSourceRow[] | null; error: Error | null };

  if (error) {
    console.error('[QRService] Source performance error:', error);
    throw new Error(`Failed to get source performance: ${error.message}`);
  }

  const bySource: Record<string, { qrCount: number; totalScans: number }> = {};

  (qrCodes || []).forEach((qr) => {
    const source = qr.source || 'unknown';
    if (!bySource[source]) {
      bySource[source] = { qrCount: 0, totalScans: 0 };
    }
    bySource[source].qrCount++;
    bySource[source].totalScans += qr.total_scans || 0;
  });

  return { bySource };
}
