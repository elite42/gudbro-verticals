'use client';

import { useState, useEffect } from 'react';
import { rootsProducts } from '@/database/index';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import Image from 'next/image';

interface UploadedImage {
  filename: string;
  slug: string;
  path: string;
}

export default function ProductImagesPage() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'with-image' | 'without-image'>('all');

  // Load existing images on mount
  useEffect(() => {
    fetch('/api/upload-product-image')
      .then(res => res.json())
      .then(data => setUploadedImages(data.images || []))
      .catch(err => console.error('Failed to load images:', err));
  }, []);

  const handleFileChange = async (slug: string, file: File | null) => {
    if (!file) return;

    setUploading(slug);
    setMessage(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('slug', slug);

    try {
      const res = await fetch('/api/upload-product-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Update uploaded images list
      setUploadedImages(prev => [
        ...prev.filter(img => img.slug !== slug),
        { filename: data.filename, slug: data.slug, path: data.path }
      ]);

      setMessage({ type: 'success', text: `Image uploaded for ${slug}` });
    } catch (error) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Upload failed' });
    } finally {
      setUploading(null);
    }
  };

  const getImagePath = (slug: string): string | null => {
    const uploaded = uploadedImages.find(img => img.slug === slug);
    if (uploaded) return uploaded.path;

    // Check if product has media field with thumbnail
    const product = rootsProducts.find(p => p.slug === slug);
    if (product?.media?.images?.thumbnail) {
      // If it's a local path (starts with /), use it; otherwise it's Unsplash
      if (product.media.images.thumbnail.startsWith('/')) {
        return product.media.images.thumbnail;
      }
    }

    return null;
  };

  const filteredProducts = rootsProducts.filter(product => {
    // Search filter
    const matchesSearch = product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.slug.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const hasImage = !!getImagePath(product.slug);
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'with-image' && hasImage) ||
                         (filterStatus === 'without-image' && !hasImage);

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: rootsProducts.length,
    withImage: rootsProducts.filter(p => !!getImagePath(p.slug)).length,
    withoutImage: rootsProducts.filter(p => !getImagePath(p.slug)).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Product Images</h1>
        <p className="text-gray-600 mt-2">
          Upload and manage product images for the ROOTS menu
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="default" padding="lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-black">{stats.total}</div>
            <div className="text-sm text-gray-600 mt-1">Total Products</div>
          </div>
        </Card>
        <Card variant="default" padding="lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.withImage}</div>
            <div className="text-sm text-gray-600 mt-1">With Images</div>
          </div>
        </Card>
        <Card variant="default" padding="lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{stats.withoutImage}</div>
            <div className="text-sm text-gray-600 mt-1">Without Images</div>
          </div>
        </Card>
      </div>

      {/* Message */}
      {message && (
        <Alert variant={message.type === 'success' ? 'success' : 'error'}>
          {message.text}
        </Alert>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'primary' : 'ghost'}
            size="md"
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'with-image' ? 'primary' : 'ghost'}
            size="md"
            onClick={() => setFilterStatus('with-image')}
          >
            With Image
          </Button>
          <Button
            variant={filterStatus === 'without-image' ? 'primary' : 'ghost'}
            size="md"
            onClick={() => setFilterStatus('without-image')}
          >
            Missing
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => {
          const imagePath = getImagePath(product.slug);
          const isUploading = uploading === product.slug;

          return (
            <Card key={product.id} variant="default" padding="md">
              <div className="space-y-3">
                {/* Image Preview */}
                <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                  {imagePath ? (
                    <Image
                      src={imagePath}
                      alt={product.name.en}
                      fill
                      className="object-cover"
                      unoptimized={imagePath.startsWith('http')}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-black">{product.name.en}</h3>
                  <p className="text-sm text-gray-500">{product.slug}</p>
                </div>

                {/* Status Badge */}
                <div>
                  {imagePath ? (
                    <Badge variant="success">Has Image</Badge>
                  ) : (
                    <Badge variant="warning">Missing Image</Badge>
                  )}
                </div>

                {/* Upload Button */}
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(product.slug, e.target.files?.[0] || null)}
                    disabled={isUploading}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    disabled={isUploading}
                    onClick={(e) => (e.currentTarget.previousElementSibling as HTMLInputElement)?.click()}
                  >
                    {isUploading ? 'Uploading...' : imagePath ? 'Replace Image' : 'Upload Image'}
                  </Button>
                </label>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products found matching your filters
        </div>
      )}
    </div>
  );
}
