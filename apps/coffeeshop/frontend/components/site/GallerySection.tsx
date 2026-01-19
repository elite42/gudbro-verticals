'use client';

import { useState } from 'react';
import { GalleryContent, SiteSectionContent } from '../../lib/site-config';

interface GallerySectionProps {
  content: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

export function GallerySection({ content, styleOverrides }: GallerySectionProps) {
  const galleryContent = content as GalleryContent;
  const { title, images } = galleryContent;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
      {/* Title */}
      {title && <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">🖼️ {title}</h2>}

      {/* Image Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className="group relative aspect-square overflow-hidden rounded-xl"
          >
            <img
              src={image.url}
              alt={image.alt || `Gallery image ${index + 1}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.style.display = 'none';
              }}
            />
            {image.caption && (
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-sm text-white">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute right-4 top-4 text-3xl text-white"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage > 0 ? selectedImage - 1 : images.length - 1);
            }}
          >
            ‹
          </button>

          <img
            src={images[selectedImage].url}
            alt={images[selectedImage].alt || ''}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage < images.length - 1 ? selectedImage + 1 : 0);
            }}
          >
            ›
          </button>

          {images[selectedImage].caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
              <p>{images[selectedImage].caption}</p>
              <p className="mt-1 text-sm text-white/70">
                {selectedImage + 1} / {images.length}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
