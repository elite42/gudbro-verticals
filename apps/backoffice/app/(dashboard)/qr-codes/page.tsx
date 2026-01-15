'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { QRBuilderModal, QRPreview } from '@/components/qr';
import { QRCode as QRCodeEntity, QRContext, QRType } from '@/lib/qr/qr-types';
import { listQRCodes, toggleQRCodeActive, deleteQRCode } from '@/lib/qr/qr-service';
import { buildQRContent, generateQRDataUrl } from '@/lib/qr/qr-generator';
import {
  PlusIcon,
  DownloadIcon,
  LinkIcon,
  WifiIcon,
  TableIcon,
  ShareIcon,
  EyeIcon,
  EyeOffIcon,
  TrashIcon,
  CopyIcon,
  QrCodeIcon,
  BarChart3Icon,
  FilterIcon,
  PencilIcon,
  ChevronDownIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/lib/contexts/TenantContext';

function formatTimeAgo(dateString: string | null | undefined): string {
  if (!dateString) return 'Never';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays}d ago`;
}

function getTypeIcon(type: 'url' | 'wifi') {
  return type === 'wifi' ? <WifiIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />;
}

// Quick Create Tab Button
function QuickCreateTab({
  icon: Icon,
  label,
  description,
  color,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg border-2 border-transparent px-4 py-3 hover:border-${color}-300 hover:bg-${color}-50 group min-w-0 flex-1 transition-all`}
    >
      <div
        className={`rounded-lg p-2 bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}
      >
        <Icon className={`h-5 w-5 text-${color}-600`} />
      </div>
      <div className="min-w-0 text-left">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="truncate text-xs text-gray-500">{description}</p>
      </div>
    </button>
  );
}

export default function QRCodesPage() {
  // Tenant context
  const { brand } = useTenant();
  const merchantId = brand?.id;
  const merchantSlug = brand?.slug;

  // State
  const [qrCodes, setQrCodes] = useState<QRCodeEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingQR, setEditingQR] = useState<QRCodeEntity | null>(null);
  const [presetContext, setPresetContext] = useState<QRContext | undefined>();
  const [presetType, setPresetType] = useState<QRType | undefined>();

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'url' | 'wifi'>('all');
  const [filterContext, setFilterContext] = useState<'all' | QRContext>('all');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  // Load data
  const loadData = async () => {
    if (!merchantId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const filters: Parameters<typeof listQRCodes>[1] = {
        filters: {},
      };

      if (filterType !== 'all') {
        filters.filters!.type = filterType;
      }
      if (filterContext !== 'all') {
        filters.filters!.context = filterContext;
      }
      if (filterActive !== 'all') {
        filters.filters!.is_active = filterActive === 'active';
      }

      const result = await listQRCodes(merchantId, filters);
      setQrCodes(result.data);
    } catch (err) {
      console.error('Failed to load QR codes:', err);
      setError('Failed to load QR codes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterType, filterContext, filterActive, merchantId]);

  // Handlers
  const handleCreateComplete = (qr: QRCodeEntity) => {
    setQrCodes([qr, ...qrCodes]);
  };

  const handleToggleActive = async (qr: QRCodeEntity) => {
    try {
      const updated = await toggleQRCodeActive(qr.id, !qr.is_active);
      setQrCodes(qrCodes.map((q) => (q.id === qr.id ? updated : q)));
    } catch (err) {
      console.error('Failed to toggle QR code:', err);
    }
  };

  const handleDelete = async (qr: QRCodeEntity) => {
    if (!confirm('Are you sure you want to delete this QR code?')) return;

    try {
      await deleteQRCode(qr.id);
      setQrCodes(qrCodes.filter((q) => q.id !== qr.id));
    } catch (err) {
      console.error('Failed to delete QR code:', err);
    }
  };

  const handleDownload = async (qr: QRCodeEntity) => {
    try {
      const content = buildQRContent(qr, { baseUrl: 'https://go.gudbro.com' });
      const dataUrl = await generateQRDataUrl(content, {
        width: 512,
        design: qr.design ?? undefined,
      });

      const link = document.createElement('a');
      link.download = `qr-${qr.title || qr.id}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download QR code:', err);
    }
  };

  const handleCopyUrl = async (qr: QRCodeEntity) => {
    const content = buildQRContent(qr, { baseUrl: 'https://go.gudbro.com' });
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const handleQuickCreate = (type: 'table' | 'marketing' | 'wifi') => {
    if (type === 'wifi') {
      setPresetType('wifi');
      setPresetContext(undefined);
    } else if (type === 'table') {
      setPresetType('url');
      setPresetContext('table');
    } else {
      setPresetType('url');
      setPresetContext('external');
    }
    setShowCreateModal(true);
  };

  const handleEdit = (qr: QRCodeEntity) => {
    setEditingQR(qr);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingQR(null);
    setPresetContext(undefined);
    setPresetType(undefined);
  };

  const hasFiltersActive =
    filterType !== 'all' || filterContext !== 'all' || filterActive !== 'all';

  return (
    <div className="space-y-4">
      {/* Header - Compact */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">QR Codes</h1>
          <p className="text-sm text-gray-500">Create and manage QR codes for your business</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/analytics?tab=qr"
            className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-blue-600"
          >
            <BarChart3Icon className="h-4 w-4" />
            <span>View Analytics</span>
          </Link>
        </div>
      </div>

      {/* Quick Create Section */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-700">Quick Create</h2>
          <Button size="sm" onClick={() => setShowCreateModal(true)}>
            <PlusIcon className="mr-1 h-4 w-4" />
            Custom QR
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <QuickCreateTab
            icon={TableIcon}
            label="Table QR"
            description="Link to table number"
            color="blue"
            onClick={() => handleQuickCreate('table')}
          />
          <QuickCreateTab
            icon={ShareIcon}
            label="Marketing QR"
            description="Track social, flyers, events"
            color="purple"
            onClick={() => handleQuickCreate('marketing')}
          />
          <QuickCreateTab
            icon={WifiIcon}
            label="WiFi QR"
            description="Easy WiFi connection"
            color="green"
            onClick={() => handleQuickCreate('wifi')}
          />
        </div>
      </div>

      {/* QR Codes List Section */}
      <div className="rounded-xl border border-gray-200 bg-white">
        {/* List Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-medium text-gray-700">
            My QR Codes {!isLoading && `(${qrCodes.length})`}
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
              hasFiltersActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FilterIcon className="h-3.5 w-3.5" />
            <span>Filter</span>
            {hasFiltersActive && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                {
                  [filterType !== 'all', filterContext !== 'all', filterActive !== 'all'].filter(
                    Boolean
                  ).length
                }
              </span>
            )}
            <ChevronDownIcon
              className={`h-3.5 w-3.5 transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Filters (collapsible) */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Type:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as typeof filterType)}
                className="rounded-md border border-gray-300 px-2 py-1 text-xs"
              >
                <option value="all">All</option>
                <option value="url">URL</option>
                <option value="wifi">WiFi</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Context:</span>
              <select
                value={filterContext}
                onChange={(e) => setFilterContext(e.target.value as typeof filterContext)}
                className="rounded-md border border-gray-300 px-2 py-1 text-xs"
              >
                <option value="all">All</option>
                <option value="table">Table</option>
                <option value="external">Marketing</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Status:</span>
              <select
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value as typeof filterActive)}
                className="rounded-md border border-gray-300 px-2 py-1 text-xs"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {hasFiltersActive && (
              <button
                onClick={() => {
                  setFilterType('all');
                  setFilterContext('all');
                  setFilterActive('all');
                }}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 p-4 text-sm text-red-700">
            {error}
            <button onClick={() => loadData()} className="ml-2 underline">
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Empty State - Minimal */}
        {!isLoading && !error && qrCodes.length === 0 && (
          <div className="px-4 py-8 text-center">
            <QrCodeIcon className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-2 text-sm text-gray-500">
              {hasFiltersActive
                ? 'No QR codes match your filters'
                : 'Your QR codes will appear here'}
            </p>
          </div>
        )}

        {/* QR Codes Grid - Compact */}
        {!isLoading && !error && qrCodes.length > 0 && (
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {qrCodes.map((qr) => (
              <div
                key={qr.id}
                className={`rounded-lg border bg-white transition-all hover:shadow-md ${
                  qr.is_active ? 'border-gray-200' : 'border-gray-200 opacity-60'
                }`}
              >
                {/* QR Preview - Smaller */}
                <div className="flex items-center justify-center rounded-t-lg bg-gray-50 p-3">
                  <QRPreview
                    content={buildQRContent(qr, { baseUrl: 'https://go.gudbro.com' })}
                    design={qr.design ?? undefined}
                    size={100}
                  />
                </div>

                {/* QR Info - Compact */}
                <div className="p-3">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex min-w-0 items-center gap-1.5">
                      {getTypeIcon(qr.type)}
                      <h3 className="truncate text-sm font-medium text-gray-900">
                        {qr.title || `QR ${qr.id.slice(0, 6)}`}
                      </h3>
                    </div>
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        qr.is_active ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      title={qr.is_active ? 'Active' : 'Inactive'}
                    />
                  </div>

                  <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                    <span>{qr.total_scans} scans</span>
                    <span>·</span>
                    <span>{formatTimeAgo(qr.last_scanned_at)}</span>
                  </div>

                  {/* Actions - Icon only */}
                  <div className="flex items-center gap-1 border-t border-gray-100 pt-2">
                    <button
                      onClick={() => handleDownload(qr)}
                      className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-xs text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      title="Download"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleEdit(qr)}
                      className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-xs text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      title="Edit"
                    >
                      <PencilIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyUrl(qr)}
                      className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-xs text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      title="Copy URL"
                    >
                      <CopyIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(qr)}
                      className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-xs text-gray-600 transition-colors hover:bg-yellow-50 hover:text-yellow-600"
                      title={qr.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {qr.is_active ? (
                        <EyeOffIcon className="h-3.5 w-3.5" />
                      ) : (
                        <EyeIcon className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(qr)}
                      className="flex flex-1 items-center justify-center gap-1 rounded py-1.5 text-xs text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
                      title="Delete"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QR Builder Modal */}
      <QRBuilderModal
        open={showCreateModal}
        onClose={handleCloseModal}
        merchantId={merchantId}
        merchantSlug={merchantSlug}
        editQRCode={editingQR || undefined}
        defaultType={presetType}
        defaultContext={presetContext}
        onComplete={handleCreateComplete}
      />
    </div>
  );
}
