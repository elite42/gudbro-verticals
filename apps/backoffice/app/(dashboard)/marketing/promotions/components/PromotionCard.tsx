'use client';

import type { Promotion, QRPlacement } from './types';
import { PROMOTION_TYPE_CONFIG, STATUS_CONFIG, TRIGGER_CONFIG } from './types';

interface PromotionCardProps {
  promo: Promotion;
  onActivate: (id: string) => void;
  onPause: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (promo: Promotion) => void;
  onManagePlacements: (promo: Promotion) => void;
  formatDate: (dateStr: string) => string;
  calculateROI: (placement: QRPlacement, avgOrderValue?: number) => string;
}

export function PromotionCard({
  promo,
  onActivate,
  onPause,
  onDelete,
  onEdit,
  onManagePlacements,
  formatDate,
  calculateROI,
}: PromotionCardProps) {
  const typeConfig = PROMOTION_TYPE_CONFIG[promo.type];
  const statusConfig = STATUS_CONFIG[promo.status];
  const triggerConfig = TRIGGER_CONFIG[promo.triggerAction];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div
              className={`h-12 w-12 rounded-xl ${typeConfig.color} flex items-center justify-center text-2xl`}
            >
              {typeConfig.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{promo.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.color}`}
                >
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-sm text-gray-500">{promo.description}</p>
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                <span>
                  {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                </span>
                <span className="flex items-center gap-1">
                  {triggerConfig.icon} {triggerConfig.label}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {promo.status === 'draft' && (
              <button
                onClick={() => onActivate(promo.id)}
                className="rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
              >
                Attiva
              </button>
            )}
            {promo.status === 'active' && (
              <button
                onClick={() => onPause(promo.id)}
                className="rounded-lg bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-200"
              >
                Pausa
              </button>
            )}
            {promo.status === 'paused' && (
              <button
                onClick={() => onActivate(promo.id)}
                className="rounded-lg bg-green-100 px-3 py-1.5 text-sm font-medium text-green-700 hover:bg-green-200"
              >
                Riattiva
              </button>
            )}
            <button
              onClick={() => onEdit(promo)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(promo.id)}
              className="rounded-lg p-2 text-red-500 hover:bg-red-50"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Stats & Placements */}
      {promo.externalQR.enabled && (
        <div className="bg-gray-50 p-4">
          {/* Stats row */}
          <div className="mb-4 grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Scansioni QR</p>
              <p className="text-lg font-bold text-gray-900">
                {promo.stats.totalViews.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Conversioni</p>
              <p className="text-lg font-bold text-purple-600">{promo.stats.totalRedemptions}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Tasso Conv.</p>
              <p className="text-lg font-bold text-blue-600">{promo.stats.conversionRate}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Posizionamenti</p>
              <p className="text-lg font-bold text-gray-900">
                {promo.externalQR.placements.length}
              </p>
            </div>
          </div>

          {/* Placements */}
          {promo.externalQR.placements.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700">QR Posizionati</h4>
                <button
                  onClick={() => onManagePlacements(promo)}
                  className="text-xs text-purple-600 hover:underline"
                >
                  Gestisci tutti
                </button>
              </div>
              <div className="grid gap-2 md:grid-cols-3">
                {promo.externalQR.placements.slice(0, 3).map((placement) => {
                  const roi = calculateROI(placement);
                  return (
                    <div
                      key={placement.id}
                      className="rounded-lg border border-gray-200 bg-white p-3"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-lg">
                          {placement.type === 'offline' ? '📍' : '🌐'}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {placement.name}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {placement.address || placement.platform || '-'}
                          </p>
                        </div>
                        <span
                          className={`h-2 w-2 rounded-full ${placement.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500">Scan</p>
                          <p className="font-medium">{placement.scans}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Conv.</p>
                          <p className="font-medium text-purple-600">{placement.conversions}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">ROI</p>
                          <p
                            className={`font-medium ${roi === '\u221E' ? 'text-blue-600' : Number(roi) > 0 ? 'text-green-600' : Number(roi) < 0 ? 'text-red-600' : 'text-gray-600'}`}
                          >
                            {roi === '\u221E' ? '\u221E' : `${roi}%`}
                          </p>
                        </div>
                      </div>
                      {placement.cost && placement.cost > 0 && (
                        <p className="mt-2 text-xs text-gray-400">
                          &euro;{placement.cost}/
                          {placement.costPeriod === 'monthly'
                            ? 'mese'
                            : placement.costPeriod === 'weekly'
                              ? 'sett'
                              : placement.costPeriod === 'daily'
                                ? 'giorno'
                                : 'una tantum'}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {promo.externalQR.placements.length > 3 && (
                <p className="text-center text-xs text-gray-500">
                  + {promo.externalQR.placements.length - 3} altri posizionamenti
                </p>
              )}
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="mb-2 text-sm text-gray-500">Nessun QR esterno posizionato</p>
              <button
                onClick={() => onManagePlacements(promo)}
                className="text-sm text-purple-600 hover:underline"
              >
                + Aggiungi posizionamento
              </button>
            </div>
          )}
        </div>
      )}

      {/* Internal only promo */}
      {!promo.externalQR.enabled && (
        <div className="bg-gray-50 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>📍</span>
            <span>Promozione solo interna (no QR esterno)</span>
            <span className="ml-auto font-medium text-gray-900">
              {promo.stats.totalRedemptions} utilizzi
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
