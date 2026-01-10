import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface CustomLink {
  name: string;
  url: string;
  icon?: string;
}

interface SocialLinksRequest {
  merchantId: string;

  // Global Social Media
  facebookUrl?: string;
  instagramHandle?: string;
  tiktokHandle?: string;
  twitterHandle?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;

  // Asian Platforms
  zaloOaId?: string;
  lineId?: string;
  kakaotalkChannel?: string;
  wechatId?: string;
  xiaohongshuId?: string;

  // Review Platforms
  googleBusinessUrl?: string;
  tripadvisorUrl?: string;
  dianpingUrl?: string;
  yelpUrl?: string;

  // Delivery Platforms
  grabfoodUrl?: string;
  shopeefoodUrl?: string;
  gojekUrl?: string;
  baeminUrl?: string;
  foodpandaUrl?: string;
  deliverooUrl?: string;
  ubereatsUrl?: string;

  // Custom Links
  customLinks?: CustomLink[];
}

// ============================================================================
// GET - Fetch social links
// ============================================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Fetch social links
    const { data: links, error } = await supabase
      .from('merchant_social_links')
      .select('*')
      .eq('merchant_id', merchantId)
      .single();

    // If no links exist, return empty state
    if (error && error.code === 'PGRST116') {
      return NextResponse.json({
        links: null,
        isNew: true,
        message: 'No social links configured yet',
      });
    }

    if (error) {
      console.error('Error fetching social links:', error);
      return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
    }

    // Transform snake_case to camelCase for frontend
    const transformedLinks = {
      merchantId: links.merchant_id,
      facebookUrl: links.facebook_url,
      instagramHandle: links.instagram_handle,
      tiktokHandle: links.tiktok_handle,
      twitterHandle: links.twitter_handle,
      youtubeUrl: links.youtube_url,
      linkedinUrl: links.linkedin_url,
      zaloOaId: links.zalo_oa_id,
      lineId: links.line_id,
      kakaotalkChannel: links.kakaotalk_channel,
      wechatId: links.wechat_id,
      xiaohongshuId: links.xiaohongshu_id,
      googleBusinessUrl: links.google_business_url,
      tripadvisorUrl: links.tripadvisor_url,
      dianpingUrl: links.dianping_url,
      yelpUrl: links.yelp_url,
      grabfoodUrl: links.grabfood_url,
      shopeefoodUrl: links.shopeefood_url,
      gojekUrl: links.gojek_url,
      baeminUrl: links.baemin_url,
      foodpandaUrl: links.foodpanda_url,
      deliverooUrl: links.deliveroo_url,
      ubereatsUrl: links.ubereats_url,
      customLinks: links.custom_links || [],
    };

    return NextResponse.json({ links: transformedLinks });
  } catch (error) {
    console.error('Error in GET /api/settings/social:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Update social links
// ============================================================================

export async function PUT(request: Request) {
  try {
    const body: SocialLinksRequest = await request.json();
    const { merchantId, ...links } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    // Transform camelCase to snake_case for database
    const dbData = {
      merchant_id: merchantId,
      facebook_url: links.facebookUrl || null,
      instagram_handle: links.instagramHandle || null,
      tiktok_handle: links.tiktokHandle || null,
      twitter_handle: links.twitterHandle || null,
      youtube_url: links.youtubeUrl || null,
      linkedin_url: links.linkedinUrl || null,
      zalo_oa_id: links.zaloOaId || null,
      line_id: links.lineId || null,
      kakaotalk_channel: links.kakaotalkChannel || null,
      wechat_id: links.wechatId || null,
      xiaohongshu_id: links.xiaohongshuId || null,
      google_business_url: links.googleBusinessUrl || null,
      tripadvisor_url: links.tripadvisorUrl || null,
      dianping_url: links.dianpingUrl || null,
      yelp_url: links.yelpUrl || null,
      grabfood_url: links.grabfoodUrl || null,
      shopeefood_url: links.shopeefoodUrl || null,
      gojek_url: links.gojekUrl || null,
      baemin_url: links.baeminUrl || null,
      foodpanda_url: links.foodpandaUrl || null,
      deliveroo_url: links.deliverooUrl || null,
      ubereats_url: links.ubereatsUrl || null,
      custom_links: links.customLinks || [],
    };

    // Upsert (insert or update)
    const { data, error } = await supabase
      .from('merchant_social_links')
      .upsert(dbData, { onConflict: 'merchant_id' })
      .select()
      .single();

    if (error) {
      console.error('Error saving social links:', error);
      return NextResponse.json({ error: 'Failed to save social links' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Social links saved successfully',
      links: data,
    });
  } catch (error) {
    console.error('Error in PUT /api/settings/social:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
