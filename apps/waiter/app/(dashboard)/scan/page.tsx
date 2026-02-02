'use client';

/**
 * QR Scan Page
 *
 * Allows scanning table QR codes for quick assignment.
 * Falls back to manual entry if camera is unavailable.
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRScanner } from '@/components/scan/QRScanner';
import { selfAssignToTable } from '@/lib/services/requests-service';
import { useAssignmentsStore } from '@/lib/stores/assignments-store';
import { useAuth } from '@/components/providers/AuthProvider';
import {
  QrCode,
  CheckCircle,
  Warning,
  Keyboard,
  Camera,
  CircleNotch
} from '@phosphor-icons/react';

export default function ScanPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addAssignment } = useAssignmentsStore();

  const [mode, setMode] = useState<'scan' | 'manual'>('scan');
  const [tableNumber, setTableNumber] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  // Handle QR scan
  const handleScan = async (data: string) => {
    // Parse QR data - expected format: gudbro://table/{tableId}
    const match = data.match(/gudbro:\/\/table\/([a-zA-Z0-9-]+)/);
    if (!match) {
      setResult({ success: false, message: 'QR code non valido' });
      return;
    }

    const tableId = match[1];
    await assignToTable(tableId);
  };

  // Handle manual entry
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tableNumber.trim()) return;

    // For manual entry, we need to look up the table by number
    // This is a simplified version - in production, query the API
    await assignToTable(`table-${tableNumber}`);
  };

  // Assign to table
  const assignToTable = async (tableId: string) => {
    setIsAssigning(true);
    setResult(null);

    const response = await selfAssignToTable(tableId);

    if (response.success) {
      // Add to local assignments
      addAssignment({
        id: `assign-${Date.now()}`,
        tableId,
        tableNumber: response.data?.tableNumber || tableNumber,
        locationId: user?.locationId || '',
        assignedAt: new Date().toISOString(),
        status: 'active',
      });

      setResult({ success: true, message: `Assegnato al tavolo ${response.data?.tableNumber || tableNumber}` });

      // Navigate to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else {
      setResult({ success: false, message: response.error || 'Errore durante lassegnazione' });
    }

    setIsAssigning(false);
  };

  // Reset result
  const resetResult = () => {
    setResult(null);
    setTableNumber('');
  };

  // Show result screen
  if (result) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
          result.success
            ? 'bg-green-100 dark:bg-green-900/30'
            : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          {result.success ? (
            <CheckCircle size={48} weight="fill" className="text-green-600 dark:text-green-400" />
          ) : (
            <Warning size={48} weight="fill" className="text-red-600 dark:text-red-400" />
          )}
        </div>

        <h2 className={`text-xl font-bold mb-2 ${
          result.success ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
        }`}>
          {result.success ? 'Fatto!' : 'Errore'}
        </h2>
        <p className="text-theme-text-secondary text-center mb-6">{result.message}</p>

        {!result.success && (
          <button
            onClick={resetResult}
            className="btn-primary"
          >
            Riprova
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2 p-1 bg-theme-bg-secondary rounded-xl">
        <button
          onClick={() => setMode('scan')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
            mode === 'scan'
              ? 'bg-theme-brand-primary text-white'
              : 'text-theme-text-secondary hover:text-theme-text-primary'
          }`}
        >
          <Camera size={20} weight="bold" />
          Scansiona
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${
            mode === 'manual'
              ? 'bg-theme-brand-primary text-white'
              : 'text-theme-text-secondary hover:text-theme-text-primary'
          }`}
        >
          <Keyboard size={20} weight="bold" />
          Manuale
        </button>
      </div>

      {/* Scanner mode */}
      {mode === 'scan' && (
        <QRScanner
          onScan={handleScan}
          onError={(error) => setResult({ success: false, message: error })}
        />
      )}

      {/* Manual mode */}
      {mode === 'manual' && (
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-theme-brand-secondary rounded-full flex items-center justify-center">
              <QrCode size={40} weight="duotone" className="text-theme-brand-primary" />
            </div>
            <h3 className="text-lg font-semibold text-theme-text-primary">
              Inserisci numero tavolo
            </h3>
            <p className="text-sm text-theme-text-secondary mt-1">
              Inserisci il numero del tavolo a cui vuoi assegnarti
            </p>
          </div>

          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Es. 7"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="w-full text-center text-4xl font-bold py-6 rounded-xl bg-theme-bg-secondary border-2 border-theme-border-medium text-theme-text-primary placeholder:text-theme-text-tertiary focus:border-theme-brand-primary focus:ring-2 focus:ring-theme-brand-secondary transition-colors"
            autoFocus
          />

          <button
            type="submit"
            disabled={!tableNumber.trim() || isAssigning}
            className="btn-primary w-full btn-lg"
          >
            {isAssigning ? (
              <>
                <CircleNotch size={20} weight="bold" className="animate-spin" />
                Assegnazione...
              </>
            ) : (
              'Assegna a me'
            )}
          </button>
        </form>
      )}

      {/* Help text */}
      <div className="text-center text-sm text-theme-text-tertiary">
        <p>Scansiona il QR code sul tavolo o inserisci il numero manualmente</p>
      </div>
    </div>
  );
}
