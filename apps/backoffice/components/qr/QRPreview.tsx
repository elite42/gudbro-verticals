'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QRDesign, DEFAULT_QR_DESIGN } from '@/lib/qr/qr-types';
import { cn } from '@/lib/utils';

interface QRPreviewProps {
  content: string;
  design?: QRDesign;
  size?: number;
  className?: string;
  showContent?: boolean;
}

export function QRPreview({
  content,
  design = DEFAULT_QR_DESIGN,
  size = 200,
  className,
  showContent = false,
}: QRPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!content) {
      setError('No content');
      return;
    }

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, content, {
        width: size,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: design.colors?.foreground || '#000000',
          light: design.colors?.background || '#FFFFFF',
        },
      })
        .then(() => setError(null))
        .catch((err) => {
          console.error('QR generation error:', err);
          setError('Failed to generate QR');
        });
    }
  }, [content, design, size]);

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-sm text-gray-400',
          className
        )}
        style={{ width: size, height: size }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className="rounded-lg border p-2"
        style={{ backgroundColor: design.colors?.background || '#FFFFFF' }}
      >
        <canvas ref={canvasRef} />
      </div>
      {showContent && <p className="max-w-full truncate px-2 text-xs text-gray-500">{content}</p>}
    </div>
  );
}

// Async version that returns data URL
export async function generateQRPreview(
  content: string,
  design: QRDesign = DEFAULT_QR_DESIGN,
  size: number = 512
): Promise<string> {
  return QRCode.toDataURL(content, {
    width: size,
    margin: 2,
    errorCorrectionLevel: 'H',
    color: {
      dark: design.colors?.foreground || '#000000',
      light: design.colors?.background || '#FFFFFF',
    },
  });
}
