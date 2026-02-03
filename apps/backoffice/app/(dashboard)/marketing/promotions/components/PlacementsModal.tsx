'use client';

import type { Promotion } from './types';

interface PlacementsModalProps {
  promotion: Promotion;
  onClose: () => void;
}

export function PlacementsModal({ promotion, onClose }: PlacementsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Gestione QR Posizionamenti</h2>
              <p className="text-sm text-gray-500">{promotion.title}</p>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          {/* Add new placement */}
          <div className="mb-6">
            <button className="w-full rounded-xl border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-purple-400 hover:text-purple-600">
              <span className="mb-1 block text-2xl">+</span>
              <span className="text-sm font-medium">Aggiungi nuovo posizionamento QR</span>
            </button>
          </div>

          {/* Placement types */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-blue-50 p-4">
              <h4 className="flex items-center gap-2 font-medium text-blue-900">
                <span>📍</span> Offline
              </h4>
              <p className="mt-1 text-sm text-blue-700">Volantini, manifesti, partner, biglietti</p>
            </div>
            <div className="rounded-xl bg-purple-50 p-4">
              <h4 className="flex items-center gap-2 font-medium text-purple-900">
                <span>🌐</span> Online
              </h4>
              <p className="mt-1 text-sm text-purple-700">Social media, siti partner, ads, email</p>
            </div>
          </div>

          {/* Existing placements */}
          <h4 className="mb-3 font-medium text-gray-900">
            Posizionamenti Attivi ({promotion.externalQR.placements.length})
          </h4>
          <div className="space-y-3">
            {promotion.externalQR.placements.map((placement) => (
              <div key={placement.id} className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-white">
                  <span className="text-3xl">{placement.type === 'offline' ? '📍' : '🌐'}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{placement.name}</p>
                  <p className="text-sm text-gray-500">{placement.address || placement.platform}</p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                    <span>{placement.scans} scan</span>
                    <span>{placement.conversions} conv.</span>
                    {placement.cost && (
                      <span>
                        &euro;{placement.cost}/{placement.costPeriod?.slice(0, 3)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                    QR Code
                  </button>
                  <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-200 p-6">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
}
