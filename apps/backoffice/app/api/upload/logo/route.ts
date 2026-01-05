import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const BUCKET_NAME = 'brand-assets';

// Lazy initialization to avoid build-time errors
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase configuration');
  }

  return createClient(url, key);
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

export async function POST(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const brandId = formData.get('brandId') as string | null;
    const merchantId = formData.get('merchantId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PNG, JPEG, WebP, SVG' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Maximum size is 5MB' }, { status: 400 });
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'png';
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const folder = brandId || merchantId || 'general';
    const fileName = `logos/${folder}/${timestamp}-${randomId}.${ext}`;

    // Convert File to ArrayBuffer then to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Ensure bucket exists (create if not)
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE,
        allowedMimeTypes: ALLOWED_TYPES,
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
        // Continue anyway - bucket might exist but not be listable
      }
    }

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(fileName, uint8Array, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(data.path);

    // Optionally update brand with logo URL
    if (brandId) {
      const { error: updateError } = await supabaseAdmin
        .from('brands')
        .update({ logo_url: publicUrl })
        .eq('id', brandId);

      if (updateError) {
        console.error('Error updating brand logo:', updateError);
        // Don't fail the request - logo was uploaded successfully
      }
    }

    return NextResponse.json(
      {
        url: publicUrl,
        path: data.path,
        message: 'Logo uploaded successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/upload/logo:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.storage.from(BUCKET_NAME).remove([path]);

    if (error) {
      console.error('Storage delete error:', error);
      return NextResponse.json({ error: `Delete failed: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Error in DELETE /api/upload/logo:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
