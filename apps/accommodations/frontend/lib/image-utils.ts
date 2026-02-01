/**
 * Image processing pipeline for guest document uploads.
 *
 * Handles HEIC → JPEG conversion, compression, blur detection,
 * and GDPR consent text hashing.
 */

export interface ProcessedImage {
  blob: Blob;
  isBlurry: boolean;
  blurScore: number;
}

/**
 * Process a document image through the full pipeline:
 * 1. HEIC conversion (if needed)
 * 2. Compression (max 0.5MB, strip EXIF/GPS)
 * 3. Blur detection (Laplacian variance)
 */
export async function processDocumentImage(file: File): Promise<ProcessedImage> {
  let blob: Blob = file;

  // Step 1: HEIC → JPEG conversion
  const isHeic =
    file.type === 'image/heic' ||
    file.type === 'image/heif' ||
    file.name.toLowerCase().endsWith('.heic') ||
    file.name.toLowerCase().endsWith('.heif');

  if (isHeic) {
    const heic2any = (await import('heic2any')).default;
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.85,
    });
    blob = Array.isArray(result) ? result[0] : result;
  }

  // Step 2: Compress (strip EXIF/GPS for privacy)
  const imageCompression = (await import('browser-image-compression')).default;
  const compressedBlob = await imageCompression(blob as File, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 2048,
    useWebWorker: true,
    preserveExif: false,
  });
  blob = compressedBlob;

  // Step 3: Blur detection
  const blurScore = await detectBlur(blob);
  const isBlurry = blurScore < 100;

  return { blob, isBlurry, blurScore };
}

/**
 * Detect blur using Laplacian variance on a downscaled canvas.
 * Higher score = sharper image.
 *
 * Thresholds:
 * - < 100: blurry (warn user)
 * - 100-500: acceptable
 * - > 500: sharp
 */
async function detectBlur(blob: Blob): Promise<number> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Scale down for fast processing (max 300px on longest side)
      const maxDim = 300;
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve(500); // Can't detect, assume sharp
        return;
      }

      ctx.drawImage(img, 0, 0, w, h);
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;

      // Convert to grayscale
      const gray = new Float32Array(w * h);
      for (let i = 0; i < w * h; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        gray[i] = 0.299 * r + 0.587 * g + 0.114 * b;
      }

      // Apply Laplacian kernel [0, 1, 0; 1, -4, 1; 0, 1, 0]
      let sum = 0;
      let count = 0;

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = y * w + x;
          const laplacian =
            gray[idx - w] + gray[idx - 1] + -4 * gray[idx] + gray[idx + 1] + gray[idx + w];
          sum += laplacian * laplacian;
          count++;
        }
      }

      const variance = count > 0 ? sum / count : 0;
      resolve(variance);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(500); // Can't detect, assume sharp
    };

    img.src = url;
  });
}

/**
 * Hash consent text for GDPR version tracking.
 * Returns a deterministic hash string like "v1-abc123".
 */
export function hashConsentText(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  const base36 = Math.abs(hash).toString(36);
  return `v1-${base36}`;
}
