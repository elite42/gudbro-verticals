'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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

// Eye style types
type EyeStyle = 'square' | 'circle' | 'rounded';

// Draw a single finder pattern eye with custom style
function drawFinderPattern(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  moduleSize: number,
  eyeStyle: EyeStyle,
  foreground: string,
  background: string
) {
  const outerSize = 7 * moduleSize;
  const middleSize = 5 * moduleSize;
  const innerSize = 3 * moduleSize;
  const middleOffset = moduleSize;
  const innerOffset = 2 * moduleSize;

  // Clear the area first
  ctx.fillStyle = background;
  ctx.fillRect(x, y, outerSize, outerSize);

  // Draw based on eye style
  if (eyeStyle === 'circle') {
    // Outer circle (foreground)
    ctx.fillStyle = foreground;
    ctx.beginPath();
    ctx.arc(x + outerSize / 2, y + outerSize / 2, outerSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Middle circle (background)
    ctx.fillStyle = background;
    ctx.beginPath();
    ctx.arc(x + outerSize / 2, y + outerSize / 2, middleSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Inner circle (foreground)
    ctx.fillStyle = foreground;
    ctx.beginPath();
    ctx.arc(x + outerSize / 2, y + outerSize / 2, innerSize / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (eyeStyle === 'rounded') {
    const radius = moduleSize * 1.5;

    // Outer rounded square (foreground)
    ctx.fillStyle = foreground;
    drawRoundedRect(ctx, x, y, outerSize, outerSize, radius);
    ctx.fill();

    // Middle rounded square (background)
    ctx.fillStyle = background;
    drawRoundedRect(ctx, x + middleOffset, y + middleOffset, middleSize, middleSize, radius * 0.8);
    ctx.fill();

    // Inner rounded square (foreground)
    ctx.fillStyle = foreground;
    drawRoundedRect(ctx, x + innerOffset, y + innerOffset, innerSize, innerSize, radius * 0.6);
    ctx.fill();
  } else {
    // Square (default)
    // Outer square (foreground)
    ctx.fillStyle = foreground;
    ctx.fillRect(x, y, outerSize, outerSize);

    // Middle square (background)
    ctx.fillStyle = background;
    ctx.fillRect(x + middleOffset, y + middleOffset, middleSize, middleSize);

    // Inner square (foreground)
    ctx.fillStyle = foreground;
    ctx.fillRect(x + innerOffset, y + innerOffset, innerSize, innerSize);
  }
}

// Helper to draw rounded rectangle
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Draw logo in center of QR code
function drawLogo(
  ctx: CanvasRenderingContext2D,
  logoUrl: string,
  canvasSize: number,
  logoSizePercent: number,
  background: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const logoSize = canvasSize * (logoSizePercent / 100);
      const logoX = (canvasSize - logoSize) / 2;
      const logoY = (canvasSize - logoSize) / 2;

      // Draw white background behind logo for better contrast
      ctx.fillStyle = background;
      const padding = logoSize * 0.1;
      ctx.fillRect(
        logoX - padding,
        logoY - padding,
        logoSize + padding * 2,
        logoSize + padding * 2
      );

      // Draw the logo
      ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
      resolve();
    };
    img.onerror = reject;
    img.src = logoUrl;
  });
}

// Draw frame around QR code
function drawFrame(
  ctx: CanvasRenderingContext2D,
  qrSize: number,
  frameText: string,
  frameColor: string,
  background: string
) {
  const frameHeight = 30;
  const totalHeight = qrSize + frameHeight;
  const padding = 8;

  // Extend canvas by frameHeight - this is handled in the main render
  // Draw frame background
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, qrSize, qrSize, frameHeight);

  // Draw frame text
  ctx.fillStyle = background;
  ctx.font = `bold ${frameHeight * 0.5}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(frameText.toUpperCase(), qrSize / 2, qrSize + frameHeight / 2);
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

  const renderQR = useCallback(async () => {
    if (!content || !canvasRef.current) {
      setError('No content');
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const foreground = design.colors?.foreground || '#000000';
    const background = design.colors?.background || '#FFFFFF';
    const eyeStyle = (design.eye_style || 'square') as EyeStyle;
    const hasFrame = design.frame?.enabled && design.frame?.text;
    const frameHeight = hasFrame ? 30 : 0;

    // Calculate QR size (without frame)
    const qrSize = size;
    const totalHeight = qrSize + frameHeight;

    // Set canvas size
    canvas.width = qrSize;
    canvas.height = totalHeight;

    try {
      // First, generate QR to a temporary canvas to get the modules
      const tempCanvas = document.createElement('canvas');
      await QRCode.toCanvas(tempCanvas, content, {
        width: qrSize,
        margin: 2,
        errorCorrectionLevel: design.logo?.url ? 'H' : 'M', // Higher error correction for logo
        color: {
          dark: foreground,
          light: background,
        },
      });

      // Copy the temp canvas to our canvas
      ctx.drawImage(tempCanvas, 0, 0);

      // Get QR code data to find module size
      const qrData = QRCode.create(content, { errorCorrectionLevel: design.logo?.url ? 'H' : 'M' });
      const moduleCount = qrData.modules.size;
      const margin = 2;
      const moduleSize = qrSize / (moduleCount + margin * 2);
      const offset = margin * moduleSize;

      // Redraw finder patterns with custom eye style if not square
      if (eyeStyle !== 'square') {
        // Top-left finder pattern
        drawFinderPattern(ctx, offset, offset, moduleSize, eyeStyle, foreground, background);

        // Top-right finder pattern
        drawFinderPattern(
          ctx,
          qrSize - offset - 7 * moduleSize,
          offset,
          moduleSize,
          eyeStyle,
          foreground,
          background
        );

        // Bottom-left finder pattern
        drawFinderPattern(
          ctx,
          offset,
          qrSize - offset - 7 * moduleSize,
          moduleSize,
          eyeStyle,
          foreground,
          background
        );
      }

      // Draw logo if present
      if (design.logo?.url) {
        await drawLogo(ctx, design.logo.url, qrSize, design.logo.size || 20, background);
      }

      // Draw frame if enabled
      if (hasFrame) {
        drawFrame(
          ctx,
          qrSize,
          design.frame!.text || 'SCAN ME',
          design.frame!.color || foreground,
          background
        );
      }

      setError(null);
    } catch (err) {
      console.error('QR generation error:', err);
      setError('Failed to generate QR');
    }
  }, [content, design, size]);

  useEffect(() => {
    renderQR();
  }, [renderQR]);

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

  const hasFrame = design.frame?.enabled && design.frame?.text;
  const frameHeight = hasFrame ? 30 : 0;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div
        className="overflow-hidden rounded-lg border"
        style={{ backgroundColor: design.colors?.background || '#FFFFFF' }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>
      {showContent && <p className="max-w-full truncate px-2 text-xs text-gray-500">{content}</p>}
    </div>
  );
}

// Async version that returns data URL with full customization support
export async function generateQRPreview(
  content: string,
  design: QRDesign = DEFAULT_QR_DESIGN,
  size: number = 512
): Promise<string> {
  const foreground = design.colors?.foreground || '#000000';
  const background = design.colors?.background || '#FFFFFF';
  const eyeStyle = (design.eye_style || 'square') as EyeStyle;
  const hasFrame = design.frame?.enabled && design.frame?.text;
  const frameHeight = hasFrame ? Math.round(size * 0.15) : 0;

  // Create offscreen canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size + frameHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  // Generate base QR code
  const tempCanvas = document.createElement('canvas');
  await QRCode.toCanvas(tempCanvas, content, {
    width: size,
    margin: 2,
    errorCorrectionLevel: design.logo?.url ? 'H' : 'M',
    color: {
      dark: foreground,
      light: background,
    },
  });

  // Copy to main canvas
  ctx.drawImage(tempCanvas, 0, 0);

  // Get QR code data for module calculations
  const qrData = QRCode.create(content, { errorCorrectionLevel: design.logo?.url ? 'H' : 'M' });
  const moduleCount = qrData.modules.size;
  const margin = 2;
  const moduleSize = size / (moduleCount + margin * 2);
  const offset = margin * moduleSize;

  // Redraw finder patterns with custom eye style if not square
  if (eyeStyle !== 'square') {
    drawFinderPattern(ctx, offset, offset, moduleSize, eyeStyle, foreground, background);
    drawFinderPattern(
      ctx,
      size - offset - 7 * moduleSize,
      offset,
      moduleSize,
      eyeStyle,
      foreground,
      background
    );
    drawFinderPattern(
      ctx,
      offset,
      size - offset - 7 * moduleSize,
      moduleSize,
      eyeStyle,
      foreground,
      background
    );
  }

  // Draw logo if present
  if (design.logo?.url) {
    await drawLogo(ctx, design.logo.url, size, design.logo.size || 20, background);
  }

  // Draw frame if enabled
  if (hasFrame) {
    ctx.fillStyle = design.frame!.color || foreground;
    ctx.fillRect(0, size, size, frameHeight);

    ctx.fillStyle = background;
    ctx.font = `bold ${frameHeight * 0.5}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((design.frame!.text || 'SCAN ME').toUpperCase(), size / 2, size + frameHeight / 2);
  }

  return canvas.toDataURL('image/png');
}
