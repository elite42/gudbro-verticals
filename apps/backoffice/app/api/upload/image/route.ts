import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSession } from '@/lib/supabase-server';

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

// Folder-specific configs
const FOLDER_CONFIGS: Record<
  string,
  { maxSize: number; allowedTypes: string[]; subfolder: string }
> = {
  'staff-photos': {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'staff',
  },
  'menu-items': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'menu',
  },
  categories: {
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    subfolder: 'categories',
  },
  locations: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'locations',
  },
  logos: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
    subfolder: 'logos',
  },
  'site-assets': {
    maxSize: 10 * 1024 * 1024, // 10MB for hero images etc
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'site',
  },
  events: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'events',
  },
  promotions: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'promotions',
  },
  challenges: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'challenges',
  },
  'feedback-screenshots': {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
    subfolder: 'feedback',
  },
};

const DEFAULT_CONFIG = {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/png', 'image/jpeg', 'image/webp'],
  subfolder: 'general',
};

export async function POST(request: Request) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseAdmin = getSupabaseAdmin();
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';
    const locationId = formData.get('locationId') as string | null;
    const entityId = formData.get('entityId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get folder config
    const config = FOLDER_CONFIGS[folder] || DEFAULT_CONFIG;

    // Validate file type
    if (!config.allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed: ${config.allowedTypes.map((t) => t.split('/')[1].toUpperCase()).join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > config.maxSize) {
      const maxMB = config.maxSize / (1024 * 1024);
      return NextResponse.json(
        { error: `File too large. Maximum size is ${maxMB}MB` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg';
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const locationFolder = locationId || 'shared';
    const entityPart = entityId ? `${entityId}-` : '';
    const fileName = `${config.subfolder}/${locationFolder}/${entityPart}${timestamp}-${randomId}.${ext}`;

    // Convert File to ArrayBuffer then to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Ensure bucket exists (create if not)
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10 * 1024 * 1024, // 10MB general limit
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'],
      });

      if (createError) {
        console.error('Error creating bucket:', createError);
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

    return NextResponse.json(
      {
        url: publicUrl,
        path: data.path,
        folder,
        message: 'Image uploaded successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/upload/image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
    console.error('Error in DELETE /api/upload/image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
