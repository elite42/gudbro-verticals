'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

interface ScanResult {
  success: boolean;
  message: string;
  tableNumber?: string;
  tableName?: string;
  sectionName?: string;
  alreadyAssigned?: boolean;
}

export default function StaffScanPage() {
  const router = useRouter();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [manualCode, setManualCode] = useState('');

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setError(null);
      }
    } catch (err) {
      console.error('Camera error:', err);
      setHasCamera(false);
      setError('Impossibile accedere alla fotocamera. Usa il codice manuale.');
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // Process QR code data
  const processQRCode = async (qrData: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Expected QR format: gudbro://table/{locationId}/{tableId}
      // or: https://menu.gudbro.com/{slug}?table={tableId}
      let tableId: string | null = null;

      if (qrData.startsWith('gudbro://table/')) {
        const parts = qrData.replace('gudbro://table/', '').split('/');
        tableId = parts[1] || parts[0];
      } else if (qrData.includes('table=')) {
        const url = new URL(qrData);
        tableId = url.searchParams.get('table');
      } else {
        // Try as direct table ID
        tableId = qrData;
      }

      if (!tableId) {
        setScanResult({
          success: false,
          message: 'QR code non valido. Riprova.',
        });
        return;
      }

      // Call self-assign API
      const res = await fetch('/api/staff/self-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId }),
      });

      const result = await res.json();

      if (result.success) {
        setScanResult({
          success: true,
          message: result.alreadyAssigned
            ? 'Tavolo già assegnato a te'
            : 'Tavolo assegnato con successo!',
          tableNumber: result.tableNumber,
          tableName: result.tableName,
          sectionName: result.sectionName,
          alreadyAssigned: result.alreadyAssigned,
        });
        stopCamera();
      } else {
        setScanResult({
          success: false,
          message: result.error || "Errore nell'assegnazione",
        });
      }
    } catch (err) {
      console.error('QR processing error:', err);
      setScanResult({
        success: false,
        message: "Errore durante l'elaborazione",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Scan frame for QR code
  useEffect(() => {
    if (!isScanning) return;

    let animationId: number;

    const scanFrame = () => {
      if (!videoRef.current || !canvasRef.current) {
        animationId = requestAnimationFrame(scanFrame);
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Use BarcodeDetector if available
        if ('BarcodeDetector' in window) {
          // @ts-expect-error BarcodeDetector is not in TypeScript types
          const detector = new BarcodeDetector({ formats: ['qr_code'] });
          detector
            .detect(canvas)
            .then((barcodes: Array<{ rawValue: string }>) => {
              if (barcodes.length > 0) {
                processQRCode(barcodes[0].rawValue);
              }
            })
            .catch(() => {
              // Ignore detection errors
            });
        }
      }

      animationId = requestAnimationFrame(scanFrame);
    };

    animationId = requestAnimationFrame(scanFrame);

    return () => cancelAnimationFrame(animationId);
  }, [isScanning]);

  // Handle manual code submission
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    await processQRCode(manualCode.trim());
  };

  // Reset and scan again
  const handleScanAgain = () => {
    setScanResult(null);
    setManualCode('');
    if (hasCamera) {
      startCamera();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="mx-auto max-w-md space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-bold">Scansiona Tavolo</h1>
          <p className="text-sm text-gray-400">Scansiona il QR del tavolo per assegnartelo</p>
        </div>

        {/* Result Display */}
        {scanResult && (
          <div
            className={`rounded-xl border p-6 text-center ${
              scanResult.success
                ? 'border-green-500/30 bg-green-500/10'
                : 'border-red-500/30 bg-red-500/10'
            }`}
          >
            <span className="text-4xl">{scanResult.success ? '✅' : '❌'}</span>
            <p
              className={`mt-3 font-medium ${
                scanResult.success ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {scanResult.message}
            </p>

            {scanResult.success && scanResult.tableNumber && (
              <div className="mt-4 rounded-lg bg-gray-800 p-4">
                <p className="text-2xl font-bold">Tavolo {scanResult.tableNumber}</p>
                {scanResult.tableName && <p className="text-gray-400">{scanResult.tableName}</p>}
                {scanResult.sectionName && (
                  <p className="text-sm text-blue-400">📍 {scanResult.sectionName}</p>
                )}
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleScanAgain}
                className="flex-1 rounded-lg bg-gray-700 py-3 text-sm font-medium hover:bg-gray-600"
              >
                🔄 Scansiona altro
              </button>
              <button
                onClick={() => router.push('/staff')}
                className="flex-1 rounded-lg bg-blue-600 py-3 text-sm font-medium hover:bg-blue-700"
              >
                🏠 Home
              </button>
            </div>
          </div>
        )}

        {/* Camera View */}
        {!scanResult && (
          <>
            {hasCamera ? (
              <div className="relative overflow-hidden rounded-xl bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="aspect-square w-full object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Scan overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-48 w-48 rounded-2xl border-2 border-white/50">
                    <div className="absolute -left-1 -top-1 h-6 w-6 border-l-4 border-t-4 border-blue-500" />
                    <div className="absolute -right-1 -top-1 h-6 w-6 border-r-4 border-t-4 border-blue-500" />
                    <div className="absolute -bottom-1 -left-1 h-6 w-6 border-b-4 border-l-4 border-blue-500" />
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 border-b-4 border-r-4 border-blue-500" />
                  </div>
                </div>

                {/* Processing indicator */}
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                  </div>
                )}

                {/* Camera controls */}
                {!isScanning ? (
                  <button
                    onClick={startCamera}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80"
                  >
                    <span className="text-4xl">📷</span>
                    <span className="mt-2 text-sm">Avvia fotocamera</span>
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="absolute bottom-4 right-4 rounded-full bg-gray-800/80 p-2"
                  >
                    ⏹️
                  </button>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-gray-700 bg-gray-800 p-8 text-center">
                <span className="text-4xl">📵</span>
                <p className="mt-3 text-gray-400">Fotocamera non disponibile</p>
                <p className="mt-1 text-sm text-gray-500">Usa il codice manuale qui sotto</p>
              </div>
            )}

            {/* Manual Code Input */}
            <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
              <p className="mb-3 text-sm text-gray-400">
                Oppure inserisci il codice tavolo manualmente:
              </p>
              <form onSubmit={handleManualSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  placeholder="Codice o numero tavolo"
                  className="flex-1 rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!manualCode.trim() || isProcessing}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {isProcessing ? '...' : '→'}
                </button>
              </form>
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-center">
                <p className="text-sm text-amber-400">{error}</p>
              </div>
            )}
          </>
        )}

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500">
          <p>Scansiona il QR code presente sul tavolo</p>
          <p>per assegnarti automaticamente il servizio</p>
        </div>
      </div>
    </div>
  );
}
