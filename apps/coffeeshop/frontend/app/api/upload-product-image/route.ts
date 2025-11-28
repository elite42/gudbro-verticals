import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

/**
 * API Route: Upload Product Image
 *
 * Handles image uploads for product catalog.
 * Saves images to /public/products/{slug}.{ext}
 *
 * POST /api/upload-product-image
 * Body: FormData with 'image' and 'slug' fields
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const slug = formData.get('slug') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'No product slug provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 5MB' },
        { status: 400 }
      );
    }

    // Get file extension
    const ext = file.type.split('/')[1];
    const filename = `${slug}.${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/products/
    const publicPath = path.join(process.cwd(), 'public', 'products', filename);
    await writeFile(publicPath, buffer);

    // Return the public URL path
    const imagePath = `/products/${filename}`;

    return NextResponse.json({
      success: true,
      path: imagePath,
      slug,
      filename,
      size: file.size,
      type: file.type,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

/**
 * GET handler - List all product images
 */
export async function GET() {
  try {
    const fs = require('fs');
    const productsDir = path.join(process.cwd(), 'public', 'products');

    // Check if directory exists
    if (!fs.existsSync(productsDir)) {
      return NextResponse.json({ images: [] });
    }

    const files = fs.readdirSync(productsDir);
    const images = files
      .filter((file: string) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file: string) => ({
        filename: file,
        slug: file.replace(/\.(jpg|jpeg|png|webp)$/i, ''),
        path: `/products/${file}`,
      }));

    return NextResponse.json({ images });

  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json({ images: [] });
  }
}
