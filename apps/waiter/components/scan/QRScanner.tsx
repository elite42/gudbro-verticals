'use client';

/**
 * QR Scanner Component
 *
 * Uses the device camera to scan QR codes.
 * Falls back to manual entry on desktop or if camera access is denied.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Camera, X, Flashlight } from '@phosphor-icons/react';

interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (error: string) => void;
  onClose?: () => void;
}

export function QRScanner({ onScan, onError, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
        setIsScanning(true);

        // Check for torch capability
        const track = mediaStream.getVideoTracks()[0];
        const capabilities = track.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean };
        setHasTorch(!!capabilities?.torch);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setHasCamera(false);
      onError?.('Impossibile accedere alla fotocamera');
    }
  }, [onError]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsScanning(false);
  }, [stream]);

  // Toggle torch
  const toggleTorch = useCallback(async () => {
    if (!stream || !hasTorch) return;

    const track = stream.getVideoTracks()[0];
    try {
      await track.applyConstraints({
        advanced: [{ torch: !torchOn } as MediaTrackConstraintSet],
      });
      setTorchOn(!torchOn);
    } catch (error) {
      console.error('Torch toggle error:', error);
    }
  }, [stream, hasTorch, torchOn]);

  // Scan for QR codes
  useEffect(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastScanTime = 0;
    const scanInterval = 250; // ms between scans

    const scanFrame = () => {
      const now = Date.now();
      if (now - lastScanTime < scanInterval) {
        animationId = requestAnimationFrame(scanFrame);
        return;
      }
      lastScanTime = now;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data for QR detection
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Simple pattern detection (placeholder for actual QR decoding)
        // In production, use a library like @zxing/browser or jsQR
        // For now, we'll simulate QR detection with a test pattern

        // Check if we have a valid QR code pattern
        // This is a placeholder - real implementation needs a QR library
        const testData = detectQRCodePattern(imageData);
        if (testData) {
          stopCamera();
          onScan(testData);
          return;
        }
      }

      animationId = requestAnimationFrame(scanFrame);
    };

    animationId = requestAnimationFrame(scanFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isScanning, onScan, stopCamera]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start camera on mount
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  if (!hasCamera) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 mb-4 bg-theme-bg-tertiary rounded-full flex items-center justify-center">
          <Camera size={40} weight="duotone" className="text-theme-text-tertiary" />
        </div>
        <h3 className="text-lg font-semibold text-theme-text-primary">Fotocamera non disponibile</h3>
        <p className="text-theme-text-secondary mt-1 max-w-xs">
          Concedi laccesso alla fotocamera o inserisci il numero del tavolo manualmente
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Video preview */}
      <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Scan overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Corners */}
          <div className="w-64 h-64 relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />

            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-0.5 bg-theme-brand-primary animate-pulse" style={{ top: '50%' }} />
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          {hasTorch && (
            <button
              onClick={toggleTorch}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
              aria-label={torchOn ? 'Spegni flash' : 'Accendi flash'}
            >
              <Flashlight size={20} weight={torchOn ? 'fill' : 'bold'} />
            </button>
          )}
          {onClose && (
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
              aria-label="Chiudi scanner"
            >
              <X size={20} weight="bold" />
            </button>
          )}
        </div>
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Instructions */}
      <p className="text-center text-sm text-theme-text-secondary mt-4">
        Inquadra il QR code del tavolo
      </p>
    </div>
  );
}

/**
 * Placeholder QR detection function
 * In production, use a proper QR library like @zxing/browser or jsQR
 */
function detectQRCodePattern(imageData: ImageData): string | null {
  // This is a placeholder - real QR detection needs a library
  // For demo, we'll return null (no detection)
  return null;
}
