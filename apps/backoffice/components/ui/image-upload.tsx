'use client';

import { useState, useRef, useCallback } from 'react';

export type ImageUploadFolder =
  | 'staff-photos'
  | 'menu-items'
  | 'categories'
  | 'locations'
  | 'logos'
  | 'site-assets'
  | 'events'
  | 'promotions'
  | 'challenges';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder: ImageUploadFolder;
  entityId?: string; // e.g., locationId, staffId, menuItemId
  locationId?: string;
  maxSizeMB?: number;
  aspectRatio?: 'square' | 'landscape' | 'portrait' | 'free';
  className?: string;
  label?: string;
  helpText?: string;
  showPreview?: boolean;
  previewSize?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function ImageUpload({
  value,
  onChange,
  folder,
  entityId,
  locationId,
  maxSizeMB = 2,
  aspectRatio = 'free',
  className = '',
  label,
  helpText,
  showPreview = true,
  previewSize = 'md',
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const previewSizes = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32',
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    landscape: 'aspect-video',
    portrait: 'aspect-[3/4]',
    free: '',
  };

  const handleFileUpload = useCallback(
    async (file: File) => {
      setError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError('Formato non supportato. Usa PNG, JPEG o WebP');
        return;
      }

      if (file.size > maxSizeBytes) {
        setError(`File troppo grande. Massimo ${maxSizeMB}MB`);
        return;
      }

      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        if (locationId) formData.append('locationId', locationId);
        if (entityId) formData.append('entityId', entityId);

        const res = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          onChange(data.url);
        } else {
          setError(data.error || "Errore durante l'upload");
        }
      } catch (err) {
        console.error('Upload error:', err);
        setError("Errore durante l'upload");
      } finally {
        setIsUploading(false);
      }
    },
    [folder, locationId, entityId, maxSizeBytes, maxSizeMB, onChange]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) handleFileUpload(file);
    },
    [disabled, handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileUpload(file);
    },
    [handleFileUpload]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onChange]
  );

  return (
    <div className={className}>
      {label && <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${aspectRatioClasses[aspectRatio]} ${
          disabled
            ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-60'
            : isDragging
              ? 'border-blue-500 bg-blue-50'
              : value
                ? 'border-green-300 bg-green-50 hover:border-green-400'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            <span>Caricamento...</span>
          </div>
        ) : value && showPreview ? (
          <div className="flex flex-col items-center gap-2">
            <img
              src={value}
              alt="Preview"
              className={`${previewSizes[previewSize]} rounded-lg object-cover`}
            />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-700">Caricata</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-red-500 hover:text-red-700"
                >
                  Rimuovi
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            <svg
              className="mb-2 h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-blue-600">Clicca</span> o trascina
            </p>
            <p className="mt-1 text-xs text-gray-400">PNG, JPEG, WebP (max {maxSizeMB}MB)</p>
          </>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {helpText && !error && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
    </div>
  );
}
