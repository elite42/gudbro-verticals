// QR Code Redirect API Route
// Handles short URL redirects and tracks scan analytics
// URL pattern: /api/qr/r/[code]

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a separate Supabase client for this route (can't use shared client in API route)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Parse user agent to get device info
// Bug fixes from test suite: iOS/Samsung/Opera detection order corrected
function parseUserAgent(ua: string): {
  device_type: string;
  os: string;
  browser: string;
} {
  // Determine device type
  let device_type = 'desktop';
  if (/mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(ua)) {
    device_type = /tablet|ipad/i.test(ua) ? 'tablet' : 'mobile';
  }

  // Determine OS - check iOS BEFORE macOS (iOS UA contains "Mac OS X")
  let os = 'unknown';
  if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Determine browser - check specific browsers BEFORE Chrome (they contain "Chrome" in UA)
  let browser = 'unknown';
  if (/samsungbrowser/i.test(ua)) browser = 'Samsung Browser';
  else if (/opera|opr\//i.test(ua)) browser = 'Opera';
  else if (/edg/i.test(ua)) browser = 'Edge';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';

  return { device_type, os, browser };
}

// Get client IP from request headers
function getClientIP(request: NextRequest): string | null {
  // Try various headers where IP might be stored
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;

  return null;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Helper to build error redirect URL with merchant context
  function buildErrorRedirect(
    path: string,
    merchantInfo?: { name?: string; slug?: string; phone?: string; pwa_url?: string }
  ): URL {
    const url = new URL(path, request.url);
    if (merchantInfo?.name) url.searchParams.set('merchant', merchantInfo.name);
    if (merchantInfo?.slug) url.searchParams.set('slug', merchantInfo.slug);
    if (merchantInfo?.phone) url.searchParams.set('phone', merchantInfo.phone);
    if (merchantInfo?.pwa_url) url.searchParams.set('menu', merchantInfo.pwa_url);
    return url;
  }

  try {
    // Look up the QR code by short_code with merchant info
    const { data: qrCode, error: qrError } = await supabase
      .from('qr_codes')
      .select(
        `
        id, destination_url, is_active, max_scans, total_scans, expires_at, type, wifi_ssid, merchant_id,
        merchants:merchant_id (
          id,
          slug,
          brands:brand_id (
            name
          ),
          locations:locations!locations_merchant_id_fkey (
            phone,
            whatsapp
          )
        )
      `
      )
      .eq('short_code', code)
      .single();

    // Extract merchant info for error pages
    // Note: Supabase returns the joined data based on the FK relationship
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const merchantData = qrCode?.merchants as any;

    const merchantInfo = merchantData
      ? {
          name: merchantData.brands?.name || undefined,
          slug: merchantData.slug || undefined,
          phone: Array.isArray(merchantData.locations)
            ? merchantData.locations[0]?.phone || merchantData.locations[0]?.whatsapp || undefined
            : undefined,
          pwa_url: merchantData.slug
            ? `${process.env.NEXT_PUBLIC_PWA_URL || 'https://menu.gudbro.com'}/${merchantData.slug}`
            : undefined,
        }
      : undefined;

    if (qrError || !qrCode) {
      console.error('QR code not found:', code);
      return NextResponse.redirect(buildErrorRedirect('/qr-not-found', undefined));
    }

    // Check if QR code is active
    if (!qrCode.is_active) {
      console.log('QR code inactive:', code);
      return NextResponse.redirect(buildErrorRedirect('/qr-inactive', merchantInfo));
    }

    // Check expiration
    if (qrCode.expires_at && new Date(qrCode.expires_at) < new Date()) {
      console.log('QR code expired:', code);
      return NextResponse.redirect(buildErrorRedirect('/qr-expired', merchantInfo));
    }

    // Check max scans
    if (qrCode.max_scans && qrCode.total_scans >= qrCode.max_scans) {
      console.log('QR code max scans reached:', code);
      return NextResponse.redirect(buildErrorRedirect('/qr-limit-reached', merchantInfo));
    }

    // Parse request info for analytics
    const userAgent = request.headers.get('user-agent') || '';
    const { device_type, os, browser } = parseUserAgent(userAgent);
    const clientIP = getClientIP(request);

    // Get UTM params from request URL
    const searchParams = request.nextUrl.searchParams;
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');

    // Record the scan (async, don't wait)
    supabase
      .from('qr_scans')
      .insert({
        qr_code_id: qrCode.id,
        ip_address: clientIP,
        user_agent: userAgent.substring(0, 500), // Truncate long user agents
        device_type,
        os,
        browser,
        utm_source,
        utm_medium,
        utm_campaign,
      })
      .then(({ error }) => {
        if (error) {
          console.error('Failed to record scan:', error);
        }
      });

    // The trigger in the database will update total_scans and last_scanned_at

    // Determine redirect URL
    let redirectUrl = qrCode.destination_url;

    // For WiFi QR codes, we can't redirect (data is in the QR itself)
    // But if someone manually visits the short URL, show a helpful page
    if (qrCode.type === 'wifi') {
      const wifiUrl = new URL('/wifi-info', request.url);
      wifiUrl.searchParams.set('ssid', qrCode.wifi_ssid || '');
      if (merchantInfo?.name) wifiUrl.searchParams.set('merchant', merchantInfo.name);
      if (merchantInfo?.pwa_url) wifiUrl.searchParams.set('menu', merchantInfo.pwa_url);
      return NextResponse.redirect(wifiUrl);
    }

    // Append UTM params to destination if they exist
    if (redirectUrl && (utm_source || utm_medium || utm_campaign)) {
      const destUrl = new URL(redirectUrl);
      if (utm_source) destUrl.searchParams.set('utm_source', utm_source);
      if (utm_medium) destUrl.searchParams.set('utm_medium', utm_medium);
      if (utm_campaign) destUrl.searchParams.set('utm_campaign', utm_campaign);
      redirectUrl = destUrl.toString();
    }

    // Redirect to destination
    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl);
    }

    // Fallback
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('QR redirect error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Handle HEAD requests (some scanners check with HEAD first)
export async function HEAD(request: NextRequest, context: { params: Promise<{ code: string }> }) {
  return GET(request, context);
}
