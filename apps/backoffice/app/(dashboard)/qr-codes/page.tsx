'use client';

import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeItem {
  id: string;
  name: string;
  type: 'table' | 'room' | 'property' | 'general';
  slug: string;
  scans: number;
  lastScanned: string | null;
  isActive: boolean;
  createdAt: string;
}

const defaultQRCodes: QRCodeItem[] = [
  {
    id: '1',
    name: 'Table 1',
    type: 'table',
    slug: 'demo-cafe/table-1',
    scans: 234,
    lastScanned: '2 hours ago',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Table 2',
    type: 'table',
    slug: 'demo-cafe/table-2',
    scans: 189,
    lastScanned: '5 hours ago',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Counter',
    type: 'general',
    slug: 'demo-cafe/counter',
    scans: 456,
    lastScanned: '30 minutes ago',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Outdoor Area',
    type: 'general',
    slug: 'demo-cafe/outdoor',
    scans: 78,
    lastScanned: '1 day ago',
    isActive: false,
    createdAt: '2024-01-20',
  },
];

function QRCodeCanvas({ url, size = 128 }: { url: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
    }
  }, [url, size]);

  return <canvas ref={canvasRef} />;
}

export default function QRCodesPage() {
  const [qrCodes, setQRCodes] = useState<QRCodeItem[]>(defaultQRCodes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkType, setBulkType] = useState<'table' | 'room' | 'custom'>('table');

  // Form state
  const [newQR, setNewQR] = useState({
    name: '',
    type: 'table' as 'table' | 'room' | 'property' | 'general',
    slug: '',
  });

  // Bulk form state
  const [bulkForm, setBulkForm] = useState({
    prefix: '',
    start: 1,
    end: 10,
  });

  const totalScans = qrCodes.reduce((acc, qr) => acc + qr.scans, 0);
  const activeQRs = qrCodes.filter((qr) => qr.isActive).length;

  const getQRUrl = (slug: string) => `https://go.gudbro.com/${slug}`;

  const handleCreateQR = () => {
    if (!newQR.name) return;

    const qr: QRCodeItem = {
      id: Date.now().toString(),
      name: newQR.name,
      type: newQR.type,
      slug: newQR.slug || `demo-cafe/${newQR.name.toLowerCase().replace(/\s+/g, '-')}`,
      scans: 0,
      lastScanned: null,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setQRCodes([...qrCodes, qr]);
    setShowCreateModal(false);
    setNewQR({ name: '', type: 'table', slug: '' });
  };

  const handleBulkCreate = () => {
    const newQRs: QRCodeItem[] = [];
    const prefix = bulkForm.prefix || (bulkType === 'table' ? 'Table' : bulkType === 'room' ? 'Room' : 'Item');

    for (let i = bulkForm.start; i <= bulkForm.end; i++) {
      newQRs.push({
        id: `bulk-${Date.now()}-${i}`,
        name: `${prefix} ${i}`,
        type: bulkType === 'custom' ? 'general' : bulkType,
        slug: `demo-cafe/${prefix.toLowerCase()}-${i}`,
        scans: 0,
        lastScanned: null,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0],
      });
    }

    setQRCodes([...qrCodes, ...newQRs]);
    setShowBulkModal(false);
    setBulkForm({ prefix: '', start: 1, end: 10 });
  };

  const handleDownload = async (qr: QRCodeItem) => {
    const url = getQRUrl(qr.slug);
    const dataUrl = await QRCode.toDataURL(url, { width: 512, margin: 2 });

    const link = document.createElement('a');
    link.download = `qr-${qr.slug.replace(/\//g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyUrl = (slug: string) => {
    navigator.clipboard.writeText(getQRUrl(slug));
  };

  const toggleActive = (id: string) => {
    setQRCodes(qrCodes.map(qr =>
      qr.id === id ? { ...qr, isActive: !qr.isActive } : qr
    ));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this QR code?')) {
      setQRCodes(qrCodes.filter(qr => qr.id !== id));
    }
  };

  const downloadAllAsPNG = async () => {
    for (const qr of qrCodes.filter(q => q.isActive)) {
      await handleDownload(qr);
      await new Promise(r => setTimeout(r, 100));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Codes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage QR codes for tables, rooms, and locations
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          + Create QR Code
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total QR Codes</p>
          <p className="text-2xl font-bold text-gray-900">{qrCodes.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">{activeQRs}</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Scans</p>
          <p className="text-2xl font-bold text-blue-600">{totalScans.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Scans Today</p>
          <p className="text-2xl font-bold text-purple-600">47</p>
        </div>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {qrCodes.map((qr) => (
          <div
            key={qr.id}
            className={`p-6 bg-white rounded-xl border ${
              qr.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'
            }`}
          >
            {/* QR Code Preview */}
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <QRCodeCanvas url={getQRUrl(qr.slug)} size={128} />
            </div>

            {/* QR Info */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{qr.name}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    qr.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {qr.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="mt-1 text-sm text-gray-500 font-mono truncate">
                go.gudbro.com/{qr.slug}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Total Scans</p>
                  <p className="font-semibold text-gray-900">{qr.scans}</p>
                </div>
                <div>
                  <p className="text-gray-500">Last Scanned</p>
                  <p className="font-semibold text-gray-900">{qr.lastScanned || 'Never'}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => handleDownload(qr)}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                >
                  Download
                </button>
                <button
                  onClick={() => toggleActive(qr.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    qr.isActive
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {qr.isActive ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleCopyUrl(qr.slug)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                  title="Copy URL"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleDelete(qr.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                  title="Delete"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Create New QR Card */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center min-h-[320px]"
        >
          <span className="text-4xl text-gray-400">+</span>
          <span className="mt-2 text-sm font-medium text-gray-600">Create New QR Code</span>
          <span className="mt-1 text-xs text-gray-400">Table, room, or custom location</span>
        </button>
      </div>

      {/* Quick Create Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Quick Create</h3>
        <p className="mt-1 text-sm text-gray-500">Generate multiple QR codes at once</p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button
            onClick={() => { setBulkType('table'); setShowBulkModal(true); }}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">Table</span>
            <h4 className="mt-2 font-medium text-gray-900">Bulk Tables</h4>
            <p className="mt-1 text-sm text-gray-500">Create QR codes for multiple tables</p>
          </button>

          <button
            onClick={() => { setBulkType('room'); setShowBulkModal(true); }}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">Room</span>
            <h4 className="mt-2 font-medium text-gray-900">Bulk Rooms</h4>
            <p className="mt-1 text-sm text-gray-500">Create QR codes for hotel rooms</p>
          </button>

          <button
            onClick={() => { setBulkType('custom'); setShowBulkModal(true); }}
            className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <span className="text-2xl">Custom</span>
            <h4 className="mt-2 font-medium text-gray-900">Custom Range</h4>
            <p className="mt-1 text-sm text-gray-500">Define your own naming pattern</p>
          </button>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Download All QR Codes</h3>
        <p className="mt-1 text-sm text-gray-500">Export all your QR codes</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={downloadAllAsPNG}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Download All (PNG)
          </button>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create QR Code</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={newQR.name}
                  onChange={(e) => setNewQR({ ...newQR, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Table 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newQR.type}
                  onChange={(e) => setNewQR({ ...newQR, type: e.target.value as typeof newQR.type })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="table">Table</option>
                  <option value="room">Room</option>
                  <option value="property">Property</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Slug (optional)</label>
                <input
                  type="text"
                  value={newQR.slug}
                  onChange={(e) => setNewQR({ ...newQR, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                  placeholder="demo-cafe/custom-name"
                />
              </div>

              {newQR.name && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <div className="flex justify-center">
                    <QRCodeCanvas
                      url={getQRUrl(newQR.slug || `demo-cafe/${newQR.name.toLowerCase().replace(/\s+/g, '-')}`)}
                      size={150}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateQR}
                disabled={!newQR.name}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Create QR Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Create Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Bulk Create {bulkType === 'table' ? 'Tables' : bulkType === 'room' ? 'Rooms' : 'Items'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prefix (optional)
                </label>
                <input
                  type="text"
                  value={bulkForm.prefix}
                  onChange={(e) => setBulkForm({ ...bulkForm, prefix: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder={bulkType === 'table' ? 'Table' : bulkType === 'room' ? 'Room' : 'Item'}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Number</label>
                  <input
                    type="number"
                    value={bulkForm.start}
                    onChange={(e) => setBulkForm({ ...bulkForm, start: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Number</label>
                  <input
                    type="number"
                    value={bulkForm.end}
                    onChange={(e) => setBulkForm({ ...bulkForm, end: parseInt(e.target.value) || 10 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  This will create <strong>{Math.max(0, bulkForm.end - bulkForm.start + 1)}</strong> QR codes:
                  {bulkForm.prefix || (bulkType === 'table' ? 'Table' : bulkType === 'room' ? 'Room' : 'Item')} {bulkForm.start}
                  {' '}to{' '}
                  {bulkForm.prefix || (bulkType === 'table' ? 'Table' : bulkType === 'room' ? 'Room' : 'Item')} {bulkForm.end}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkCreate}
                disabled={bulkForm.end < bulkForm.start}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Create {Math.max(0, bulkForm.end - bulkForm.start + 1)} QR Codes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
