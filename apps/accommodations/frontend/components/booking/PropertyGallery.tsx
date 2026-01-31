'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import * as Dialog from '@radix-ui/react-dialog';
import { CaretLeft, CaretRight, X, House } from '@phosphor-icons/react';

interface PropertyGalleryProps {
  images: string[];
  propertyName: string;
}

export default function PropertyGallery({ images, propertyName }: PropertyGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [fullscreenRef, fullscreenApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync fullscreen carousel to current index when opened
  useEffect(() => {
    if (isFullscreen && fullscreenApi) {
      fullscreenApi.scrollTo(currentIndex, true);
    }
  }, [isFullscreen, fullscreenApi, currentIndex]);

  // Sync fullscreen index back
  useEffect(() => {
    if (!fullscreenApi) return;
    const onFullscreenSelect = () => {
      const idx = fullscreenApi.selectedScrollSnap();
      setCurrentIndex(idx);
      emblaApi?.scrollTo(idx, true);
    };
    fullscreenApi.on('select', onFullscreenSelect);
    return () => {
      fullscreenApi.off('select', onFullscreenSelect);
    };
  }, [fullscreenApi, emblaApi]);

  // No images placeholder
  if (images.length === 0) {
    return (
      <div className="bg-primary-light flex h-64 items-center justify-center sm:h-80 md:h-96">
        <div className="text-center">
          <House size={48} weight="duotone" className="text-foreground-muted mx-auto mb-2" />
          <p className="text-foreground-muted text-sm">No photos available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {/* Main carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex touch-pan-y">
            {images.map((src, i) => (
              <div key={i} className="min-w-0 flex-shrink-0 flex-grow-0 basis-full">
                <img
                  src={src}
                  alt={`${propertyName} - Photo ${i + 1}`}
                  className="h-64 w-full cursor-pointer object-cover sm:h-80 md:h-96"
                  onClick={() => setIsFullscreen(true)}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Photo counter - only shown for multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white">
            {currentIndex + 1}/{images.length}
          </div>
        )}

        {/* Desktop navigation arrows - only shown for multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white md:block"
              aria-label="Previous photo"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white md:block"
              aria-label="Next photo"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen overlay via Radix Dialog (handles body scroll lock) */}
      <Dialog.Root open={isFullscreen} onOpenChange={setIsFullscreen}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-fade-in fixed inset-0 z-50 bg-black/90" />
          <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center outline-none">
            <Dialog.Title className="sr-only">{propertyName} - Photo gallery</Dialog.Title>

            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
              aria-label="Close gallery"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Fullscreen carousel */}
            <div className="w-full">
              <div ref={fullscreenRef} className="overflow-hidden">
                <div className="flex touch-pan-y">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      className="flex min-w-0 flex-shrink-0 flex-grow-0 basis-full items-center justify-center"
                    >
                      <img
                        src={src}
                        alt={`${propertyName} - Photo ${i + 1}`}
                        className="max-h-[85vh] w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fullscreen counter */}
              {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-medium text-white">
                  {currentIndex + 1} / {images.length}
                </div>
              )}

              {/* Fullscreen arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => fullscreenApi?.scrollPrev()}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
                    aria-label="Previous photo"
                  >
                    <CaretLeft size={24} weight="bold" />
                  </button>
                  <button
                    onClick={() => fullscreenApi?.scrollNext()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-colors hover:bg-white/30"
                    aria-label="Next photo"
                  >
                    <CaretRight size={24} weight="bold" />
                  </button>
                </>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
