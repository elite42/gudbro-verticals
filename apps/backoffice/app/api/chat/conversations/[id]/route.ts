// Conversation Details API
// Get conversation messages and allow merchant to respond

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { createClient } from '@/lib/supabase-server';

// GET - Get conversation with messages
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminSupabase = supabaseAdmin;

    // Get conversation
    const { data: conversation, error: convError } = await adminSupabase
      .from('customer_conversations')
      .select(
        `
        *,
        location:locations(id, name),
        reservation:reservations(id, reservation_date, reservation_time, party_size)
      `
      )
      .eq('id', id)
      .single();

    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Get messages
    const { data: messages } = await adminSupabase
      .from('customer_messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    return NextResponse.json({
      conversation,
      messages: messages || [],
    });
  } catch (error) {
    console.error('Conversation GET error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Send a message as staff
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    const adminSupabase = supabaseAdmin;

    // Get conversation to get channel info
    const { data: conversation } = await adminSupabase
      .from('customer_conversations')
      .select('channel, channel_user_id, location_id')
      .eq('id', id)
      .single();

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Save the message
    const { data: savedMessage, error: msgError } = await adminSupabase
      .from('customer_messages')
      .insert({
        conversation_id: id,
        role: 'agent',
        content: message,
        agent_id: user.id,
        status: 'sent',
      })
      .select()
      .single();

    if (msgError) {
      return NextResponse.json({ error: msgError.message }, { status: 500 });
    }

    // TODO: Send message through the channel (WhatsApp, Telegram, etc.)
    // This would use the channel-router.sendChannelResponse function

    return NextResponse.json({ message: savedMessage });
  } catch (error) {
    console.error('Conversation POST error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
