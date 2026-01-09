// QR Codes Service
// CRUD operations for QR codes using Supabase

import { supabase } from '@/lib/supabase';
import {
  QRCode,
  QRScan,
  CreateQRCodeInput,
  UpdateQRCodeInput,
  CreateQRScanInput,
  BulkCreateQRInput,
  QRCodeListOptions,
  QRAnalyticsSummary,
  QRSourcePerformance,
  QRTimelineData,
  QRDeviceBreakdown,
  DEFAULT_QR_DESIGN,
} from './qr-types';

// ============================================
// SHORT CODE GENERATION
// ============================================

const SHORT_CODE_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789'; // No confusing chars

export function generateShortCode(length: number = 8): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += SHORT_CODE_CHARS.charAt(Math.floor(Math.random() * SHORT_CODE_CHARS.length));
  }
  return result;
}

async function generateUniqueShortCode(length: number = 8): Promise<string> {
  const maxAttempts = 10;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const code = generateShortCode(length);
    const { data } = await supabase.from('qr_codes').select('id').eq('short_code', code).single();

    if (!data) {
      return code;
    }
  }
  throw new Error('Could not generate unique short code');
}

// ============================================
// CRUD OPERATIONS
// ============================================

export async function createQRCode(merchantId: string, input: CreateQRCodeInput): Promise<QRCode> {
  // Validate based on type
  if (input.type === 'url' && !input.destination_url) {
    throw new Error('URL QR codes require a destination URL');
  }
  if (input.type === 'wifi' && (!input.wifi_ssid || !input.wifi_security)) {
    throw new Error('WiFi QR codes require SSID and security type');
  }

  // Generate short code if using short URL
  let shortCode: string | null = null;
  if (input.type === 'url' && input.use_short_url) {
    shortCode = await generateUniqueShortCode();
  }

  const qrData = {
    merchant_id: merchantId,
    type: input.type,

    // URL fields
    short_code: shortCode,
    destination_url: input.destination_url,
    use_short_url: input.use_short_url ?? false,
    context: input.context,
    source: input.source,
    table_number: input.table_number,
    event_id: input.event_id,

    // WiFi fields
    wifi_ssid: input.wifi_ssid,
    wifi_password: input.wifi_password,
    wifi_security: input.wifi_security,
    wifi_hidden: input.wifi_hidden ?? false,

    // Metadata
    title: input.title,
    description: input.description,

    // Design (merge with defaults)
    design: {
      ...DEFAULT_QR_DESIGN,
      ...input.design,
      colors: {
        ...DEFAULT_QR_DESIGN.colors,
        ...(input.design?.colors || {}),
      },
    },

    // Status
    is_active: true,
    expires_at: input.expires_at,
    max_scans: input.max_scans,
    total_scans: 0,
  };

  const { data, error } = await supabase.from('qr_codes').insert(qrData).select().single();

  if (error) {
    console.error('Error creating QR code:', error);
    throw new Error(`Failed to create QR code: ${error.message}`);
  }

  return data as QRCode;
}

export async function getQRCode(id: string): Promise<QRCode | null> {
  const { data, error } = await supabase.from('qr_codes').select('*').eq('id', id).single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // Not found
    }
    throw new Error(`Failed to get QR code: ${error.message}`);
  }

  return data as QRCode;
}

export async function getQRCodeByShortCode(shortCode: string): Promise<QRCode | null> {
  const { data, error } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('short_code', shortCode)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw new Error(`Failed to get QR code: ${error.message}`);
  }

  return data as QRCode;
}

export async function updateQRCode(id: string, input: UpdateQRCodeInput): Promise<QRCode> {
  const updateData: Record<string, unknown> = {};

  // Only include fields that are explicitly provided
  if (input.title !== undefined) updateData.title = input.title;
  if (input.description !== undefined) updateData.description = input.description;
  if (input.is_active !== undefined) updateData.is_active = input.is_active;
  if (input.expires_at !== undefined) updateData.expires_at = input.expires_at;
  if (input.max_scans !== undefined) updateData.max_scans = input.max_scans;
  if (input.destination_url !== undefined) updateData.destination_url = input.destination_url;
  if (input.source !== undefined) updateData.source = input.source;

  // WiFi updates
  if (input.wifi_ssid !== undefined) updateData.wifi_ssid = input.wifi_ssid;
  if (input.wifi_password !== undefined) updateData.wifi_password = input.wifi_password;
  if (input.wifi_security !== undefined) updateData.wifi_security = input.wifi_security;
  if (input.wifi_hidden !== undefined) updateData.wifi_hidden = input.wifi_hidden;

  // Design update (merge with existing)
  if (input.design) {
    const existing = await getQRCode(id);
    if (existing) {
      updateData.design = {
        ...existing.design,
        ...input.design,
        colors: {
          ...(existing.design?.colors || DEFAULT_QR_DESIGN.colors),
          ...(input.design.colors || {}),
        },
      };
    }
  }

  const { data, error } = await supabase
    .from('qr_codes')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update QR code: ${error.message}`);
  }

  return data as QRCode;
}

export async function deleteQRCode(id: string): Promise<void> {
  const { error } = await supabase.from('qr_codes').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete QR code: ${error.message}`);
  }
}

export async function toggleQRCodeActive(id: string, isActive: boolean): Promise<QRCode> {
  return updateQRCode(id, { is_active: isActive });
}

// ============================================
// LIST & FILTER
// ============================================

export interface QRCodeListResult {
  data: QRCode[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export async function listQRCodes(
  merchantId: string,
  options: QRCodeListOptions = {}
): Promise<QRCodeListResult> {
  const {
    filters = {},
    page = 1,
    limit = 20,
    sort_by = 'created_at',
    sort_order = 'desc',
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
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,short_code.ilike.%${filters.search}%`
    );
  }
  if (filters.created_after) {
    query = query.gte('created_at', filters.created_after);
  }
  if (filters.created_before) {
    query = query.lte('created_at', filters.created_before);
  }

  // Apply sorting
  query = query.order(sort_by, { ascending: sort_order === 'asc' });

  // Apply pagination
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to list QR codes: ${error.message}`);
  }

  return {
    data: (data || []) as QRCode[],
    total: count || 0,
    page,
    limit,
    hasMore: (count || 0) > page * limit,
  };
}

// ============================================
// BULK OPERATIONS
// ============================================

export async function bulkCreateQRCodes(
  merchantId: string,
  input: BulkCreateQRInput
): Promise<QRCode[]> {
  const qrCodes: CreateQRCodeInput[] = [];

  if (input.type === 'tables' && input.table_count) {
    const startNumber = input.table_start || 1;
    for (let i = 0; i < input.table_count; i++) {
      const tableNum = startNumber + i;
      qrCodes.push({
        type: 'url',
        destination_url: `${input.destination_base_url}?table=${tableNum}`,
        use_short_url: input.use_short_url,
        context: 'table',
        source: 'table',
        table_number: tableNum,
        title: `Table ${tableNum}`,
        design: input.design,
      });
    }
  } else if (input.type === 'custom' && input.items) {
    for (const item of input.items) {
      qrCodes.push({
        type: 'url',
        destination_url: input.destination_base_url,
        use_short_url: input.use_short_url,
        context: item.context,
        source: item.source,
        title: item.title,
        design: input.design,
      });
    }
  }

  // Create all QR codes
  const results: QRCode[] = [];
  for (const qrInput of qrCodes) {
    const qr = await createQRCode(merchantId, qrInput);
    results.push(qr);
  }

  return results;
}

export async function bulkDeleteQRCodes(ids: string[]): Promise<void> {
  const { error } = await supabase.from('qr_codes').delete().in('id', ids);

  if (error) {
    throw new Error(`Failed to bulk delete QR codes: ${error.message}`);
  }
}

export async function bulkToggleActive(ids: string[], isActive: boolean): Promise<void> {
  const { error } = await supabase.from('qr_codes').update({ is_active: isActive }).in('id', ids);

  if (error) {
    throw new Error(`Failed to bulk update QR codes: ${error.message}`);
  }
}

// ============================================
// SCAN TRACKING
// ============================================

export async function recordQRScan(input: CreateQRScanInput): Promise<QRScan> {
  const { data, error } = await supabase
    .from('qr_scans')
    .insert({
      qr_code_id: input.qr_code_id,
      ip_address: input.ip_address,
      user_agent: input.user_agent,
      device_type: input.device_type,
      os: input.os,
      browser: input.browser,
      country: input.country,
      city: input.city,
      utm_source: input.utm_source,
      utm_medium: input.utm_medium,
      utm_campaign: input.utm_campaign,
      utm_term: input.utm_term,
      utm_content: input.utm_content,
      referer: input.referer,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to record scan: ${error.message}`);
  }

  return data as QRScan;
}

// ============================================
// ANALYTICS
// ============================================

export async function getQRAnalytics(qrCodeId: string): Promise<QRAnalyticsSummary> {
  const { data, error } = await supabase.rpc('get_qr_analytics', {
    p_qr_code_id: qrCodeId,
  });

  if (error) {
    throw new Error(`Failed to get analytics: ${error.message}`);
  }

  // Handle single row result
  const result = Array.isArray(data) ? data[0] : data;
  return result as QRAnalyticsSummary;
}

export async function getMerchantSourcePerformance(
  merchantId: string
): Promise<QRSourcePerformance[]> {
  const { data, error } = await supabase.rpc('get_merchant_qr_source_performance', {
    p_merchant_id: merchantId,
  });

  if (error) {
    throw new Error(`Failed to get source performance: ${error.message}`);
  }

  return (data || []) as QRSourcePerformance[];
}

export async function getQRTimeline(
  qrCodeId: string,
  days: number = 30
): Promise<QRTimelineData[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('qr_scans')
    .select('scanned_at')
    .eq('qr_code_id', qrCodeId)
    .gte('scanned_at', startDate.toISOString())
    .order('scanned_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to get timeline: ${error.message}`);
  }

  // Group by date
  const dateMap = new Map<string, number>();
  for (const scan of data || []) {
    const date = new Date(scan.scanned_at).toISOString().split('T')[0];
    dateMap.set(date, (dateMap.get(date) || 0) + 1);
  }

  // Fill in missing dates
  const result: QRTimelineData[] = [];
  const current = new Date(startDate);
  const today = new Date();

  while (current <= today) {
    const dateStr = current.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      scans: dateMap.get(dateStr) || 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
}

export async function getQRDeviceBreakdown(qrCodeId: string): Promise<QRDeviceBreakdown[]> {
  const { data, error } = await supabase
    .from('qr_scans')
    .select('device_type')
    .eq('qr_code_id', qrCodeId);

  if (error) {
    throw new Error(`Failed to get device breakdown: ${error.message}`);
  }

  // Count by device type
  const counts = new Map<string, number>();
  let total = 0;

  for (const scan of data || []) {
    const type = scan.device_type || 'unknown';
    counts.set(type, (counts.get(type) || 0) + 1);
    total++;
  }

  // Convert to breakdown array
  const result: QRDeviceBreakdown[] = [];
  for (const [device_type, count] of counts) {
    result.push({
      device_type: device_type as 'mobile' | 'tablet' | 'desktop',
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    });
  }

  // Sort by count descending
  result.sort((a, b) => b.count - a.count);

  return result;
}

// ============================================
// MERCHANT STATS
// ============================================

export interface MerchantQRStats {
  total_qr_codes: number;
  active_qr_codes: number;
  total_scans: number;
  scans_today: number;
  scans_this_week: number;
  top_performing_qr?: QRCode;
}

export async function getMerchantQRStats(merchantId: string): Promise<MerchantQRStats> {
  // Get QR codes with stats
  const { data: qrCodes, error } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('merchant_id', merchantId);

  if (error) {
    throw new Error(`Failed to get merchant stats: ${error.message}`);
  }

  const codes = (qrCodes || []) as QRCode[];

  // Calculate stats
  const total = codes.length;
  const active = codes.filter((qr) => qr.is_active).length;
  const totalScans = codes.reduce((sum, qr) => sum + (qr.total_scans || 0), 0);

  // Find top performer
  const topPerformer = codes.reduce(
    (top, qr) => (!top || qr.total_scans > top.total_scans ? qr : top),
    null as QRCode | null
  );

  // Get today's and this week's scans
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const qrIds = codes.map((qr) => qr.id);

  let scansToday = 0;
  let scansThisWeek = 0;

  if (qrIds.length > 0) {
    const { data: recentScans } = await supabase
      .from('qr_scans')
      .select('scanned_at')
      .in('qr_code_id', qrIds)
      .gte('scanned_at', weekAgo.toISOString());

    for (const scan of recentScans || []) {
      const scanDate = new Date(scan.scanned_at);
      scansThisWeek++;
      if (scanDate >= today) {
        scansToday++;
      }
    }
  }

  return {
    total_qr_codes: total,
    active_qr_codes: active,
    total_scans: totalScans,
    scans_today: scansToday,
    scans_this_week: scansThisWeek,
    top_performing_qr: topPerformer || undefined,
  };
}

// Note: URL generation helpers moved to qr-generator.ts
// Use buildQRContent, buildTableQRUrl, buildExternalQRUrl from there
