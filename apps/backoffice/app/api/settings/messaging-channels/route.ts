/**
 * Messaging Channels Settings API
 *
 * GET /api/settings/messaging-channels?merchantId=...
 * - Returns all channel configurations for a merchant
 *
 * PUT /api/settings/messaging-channels
 * - Save credentials for a channel
 *
 * PATCH /api/settings/messaging-channels
 * - Toggle channel enabled/disabled
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { encryptCredentials, isEncryptionConfigured } from '@/lib/security/credentials-encryption';

interface ChannelStatus {
  isEnabled: boolean;
  isConfigured: boolean;
  isVerified: boolean;
  displayName?: string;
  publicId?: string;
  lastVerifiedAt?: string;
  verificationError?: string;
}

// GET - Fetch all channel configurations
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const merchantId = searchParams.get('merchantId');

  if (!merchantId) {
    return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();

    const { data: channels, error } = await supabase
      .from('merchant_notification_channels')
      .select('*')
      .eq('merchant_id', merchantId);

    if (error) {
      console.error('Error fetching channels:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform to status object keyed by channel
    const channelStatuses: Record<string, ChannelStatus> = {};

    for (const channel of channels || []) {
      channelStatuses[channel.channel_type] = {
        isEnabled: channel.is_enabled,
        isConfigured: !!channel.credentials_encrypted,
        isVerified: channel.is_verified,
        displayName: channel.display_name || undefined,
        publicId: channel.public_id || undefined,
        lastVerifiedAt: channel.last_verified_at || undefined,
        verificationError: channel.verification_error || undefined,
      };
    }

    return NextResponse.json({ channels: channelStatuses });
  } catch (error) {
    console.error('Error in GET:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

// PUT - Save channel credentials
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, channel, credentials } = body;

    if (!merchantId || !channel || !credentials) {
      return NextResponse.json(
        { error: 'merchantId, channel, and credentials are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Check if channel config already exists
    const { data: existing } = await supabase
      .from('merchant_notification_channels')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('channel_type', channel)
      .single();

    // Encrypt credentials with AES encryption
    // Falls back to JSON if CREDENTIALS_ENCRYPTION_KEY is not set (dev only)
    let encryptedCredentials: string;
    if (isEncryptionConfigured()) {
      encryptedCredentials = encryptCredentials(credentials);
    } else {
      console.warn('CREDENTIALS_ENCRYPTION_KEY not set - storing as plain JSON (dev only)');
      encryptedCredentials = JSON.stringify(credentials);
    }

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('merchant_notification_channels')
        .update({
          credentials_encrypted: encryptedCredentials,
          is_verified: false, // Reset verification on credential change
          verification_error: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (error) {
        console.error('Error updating channel:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      // Insert new
      const { error } = await supabase.from('merchant_notification_channels').insert({
        merchant_id: merchantId,
        channel_type: channel,
        is_enabled: false,
        credentials_encrypted: encryptedCredentials,
        is_verified: false,
      });

      if (error) {
        console.error('Error inserting channel:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in PUT:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

// PATCH - Toggle channel enabled/disabled
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, channel, isEnabled } = body;

    if (!merchantId || !channel || typeof isEnabled !== 'boolean') {
      return NextResponse.json(
        { error: 'merchantId, channel, and isEnabled are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Check if channel config exists
    const { data: existing } = await supabase
      .from('merchant_notification_channels')
      .select('id')
      .eq('merchant_id', merchantId)
      .eq('channel_type', channel)
      .single();

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('merchant_notification_channels')
        .update({
          is_enabled: isEnabled,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);

      if (error) {
        console.error('Error updating channel:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      // Create new with just enabled status
      const { error } = await supabase.from('merchant_notification_channels').insert({
        merchant_id: merchantId,
        channel_type: channel,
        is_enabled: isEnabled,
        is_verified: false,
      });

      if (error) {
        console.error('Error inserting channel:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, isEnabled });
  } catch (error) {
    console.error('Error in PATCH:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
