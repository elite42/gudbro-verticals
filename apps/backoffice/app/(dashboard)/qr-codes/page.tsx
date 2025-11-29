'use client';

import { useState } from 'react';

interface QRCode {
  id: string;
  name: string;
  type: 'table' | 'room' | 'property' | 'general';
  slug: string;
  scans: number;
  lastScanned: string | null;
  isActive: boolean;
  createdAt: string;
}

const qrCodes: QRCode[] = [
  {
    id: '1',
    name: 'Table 1',
    type: 'table',
    slug: 'roots-cafe/table-1',
    scans: 234,
    lastScanned: '2 hours ago',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Table 2',
    type: 'table',
    slug: 'roots-cafe/table-2',
    scans: 189,
    lastScanned: '5 hours ago',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Counter',
    type: 'general',
    slug: 'roots-cafe/counter',
    scans: 456,
    lastScanned: '30 minutes ago',
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: '4',
    name: 'Outdoor Area',
    type: 'general',
    slug: 'roots-cafe/outdoor',
    scans: 78,
    lastScanned: '1 day ago',
    isActive: false,
    createdAt: '2024-01-20',
  },
];

export default function QRCodesPage() {
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalScans = qrCodes.reduce((acc, qr) => acc + qr.scans, 0);
  const activeQRs = qrCodes.filter((qr) => qr.isActive).length;

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
              <div className="w-32 h-32 bg-white rounded flex items-center justify-center border-2 border-gray-200">
                {/* Placeholder for actual QR */}
                <div className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 ${Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
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

              <p className="mt-1 text-sm text-gray-500 font-mono">
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
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  ⬇️ Download
                </button>
                <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  ✏️ Edit
                </button>
                <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  📋
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
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">🪑</span>
            <h4 className="mt-2 font-medium text-gray-900">Bulk Tables</h4>
            <p className="mt-1 text-sm text-gray-500">Create QR codes for multiple tables</p>
          </button>

          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">🛏️</span>
            <h4 className="mt-2 font-medium text-gray-900">Bulk Rooms</h4>
            <p className="mt-1 text-sm text-gray-500">Create QR codes for hotel rooms</p>
          </button>

          <button className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <span className="text-2xl">🏷️</span>
            <h4 className="mt-2 font-medium text-gray-900">Custom Range</h4>
            <p className="mt-1 text-sm text-gray-500">Define your own naming pattern</p>
          </button>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Download All QR Codes</h3>
        <p className="mt-1 text-sm text-gray-500">Export all your QR codes in various formats</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            📄 Download as PDF
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            🖼️ Download as PNG (ZIP)
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            📊 Download as SVG (ZIP)
          </button>
        </div>
      </div>
    </div>
  );
}
