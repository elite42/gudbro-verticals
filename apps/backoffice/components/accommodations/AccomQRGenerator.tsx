'use client';

import { useState, useEffect, useCallback } from 'react';
import { DownloadSimple, Printer, Link as LinkIcon, Bed, SpinnerGap } from '@phosphor-icons/react';
import { generateQRDataUrl, SIZE_PRESETS } from '@/lib/qr/qr-generator';

const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

interface Property {
  id: string;
  name: string;
  slug: string;
}

interface Room {
  id: string;
  room_number: string;
  room_type: string;
  is_active: boolean;
}

interface AccomQRGeneratorProps {
  propertyId: string;
}

export function AccomQRGenerator({ propertyId }: AccomQRGeneratorProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyQR, setPropertyQR] = useState<string>('');
  const [roomQRs, setRoomQRs] = useState<Map<string, string>>(new Map());

  // Load property and rooms
  const loadData = useCallback(async () => {
    try {
      const [propRes, roomsRes] = await Promise.all([
        fetch(`/api/accommodations/property?propertyId=${propertyId}`, {
          headers: authHeaders(),
        }),
        fetch(`/api/accommodations/rooms?propertyId=${propertyId}`, {
          headers: authHeaders(),
        }),
      ]);

      const propData = await propRes.json();
      const roomsData = await roomsRes.json();

      if (propData.property) {
        setProperty(propData.property);
      }

      if (roomsData.rooms) {
        const activeRooms = roomsData.rooms.filter((r: Room) => r.is_active);
        setRooms(activeRooms);
      }
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      loadData();
    }
  }, [propertyId, loadData]);

  // Generate QR codes once data is loaded
  useEffect(() => {
    if (!property) return;

    const generateQRs = async () => {
      // Property QR
      const propertyUrl = `https://stays.gudbro.com/${property.slug}`;
      try {
        const qr = await generateQRDataUrl(propertyUrl, { width: SIZE_PRESETS.medium });
        setPropertyQR(qr);
      } catch (err) {
        console.error('Error generating property QR:', err);
      }

      // Room QRs
      const qrMap = new Map<string, string>();
      for (const room of rooms) {
        const roomUrl = `https://stays.gudbro.com/checkin/${propertyId}/${room.id}`;
        try {
          const qr = await generateQRDataUrl(roomUrl, { width: SIZE_PRESETS.medium });
          qrMap.set(room.id, qr);
        } catch (err) {
          console.error(`Error generating QR for room ${room.room_number}:`, err);
        }
      }
      setRoomQRs(qrMap);
    };

    generateQRs();
  }, [property, rooms, propertyId]);

  // Download QR as PNG
  const downloadQR = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <SpinnerGap className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-800">Property not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Print button */}
      <div className="flex justify-end print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Printer className="h-4 w-4" weight="duotone" />
          Print All QR Codes
        </button>
      </div>

      {/* Property QR */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Property QR Code</h2>
        <p className="mb-4 text-sm text-gray-500">
          Place this QR code at your entrance or reception. Guests scan it to view your property
          page.
        </p>

        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            {propertyQR ? (
              <img
                src={propertyQR}
                alt={`QR code for ${property.name}`}
                className="h-48 w-48 rounded-lg border border-gray-100"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <SpinnerGap className="h-6 w-6 animate-spin text-gray-400" />
              </div>
            )}
            <p className="mt-2 text-center text-sm font-medium text-gray-700">{property.name}</p>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <LinkIcon className="h-4 w-4" weight="duotone" />
              <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                https://stays.gudbro.com/{property.slug}
              </code>
            </div>
            {propertyQR && (
              <button
                onClick={() => downloadQR(propertyQR, `${property.slug}-property-qr.png`)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 print:hidden"
              >
                <DownloadSimple className="h-4 w-4" weight="bold" />
                Download PNG
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Room QR Codes */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Room QR Codes</h2>
        <p className="mb-4 text-sm text-gray-500">
          Place these QR codes in each room. Guests scan to check in or access room services.
        </p>

        {rooms.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
            <Bed className="mx-auto h-10 w-10 text-gray-300" weight="duotone" />
            <p className="mt-2 text-sm text-gray-500">No active rooms</p>
            <a
              href="/accommodations/rooms"
              className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Add rooms first
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => {
              const qr = roomQRs.get(room.id);
              const roomUrl = `https://stays.gudbro.com/checkin/${propertyId}/${room.id}`;

              return (
                <div key={room.id} className="rounded-lg border border-gray-200 p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <span className="font-semibold text-gray-900">Room {room.room_number}</span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs capitalize text-blue-700">
                      {room.room_type}
                    </span>
                  </div>

                  {qr ? (
                    <img
                      src={qr}
                      alt={`QR code for room ${room.room_number}`}
                      className="mx-auto h-40 w-40 rounded border border-gray-100"
                    />
                  ) : (
                    <div className="mx-auto flex h-40 w-40 items-center justify-center rounded border border-gray-200 bg-gray-50">
                      <SpinnerGap className="h-5 w-5 animate-spin text-gray-400" />
                    </div>
                  )}

                  <p className="mt-2 break-all text-xs text-gray-400">{roomUrl}</p>

                  {qr && (
                    <button
                      onClick={() =>
                        downloadQR(qr, `${property.slug}-room-${room.room_number}-qr.png`)
                      }
                      className="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 print:hidden"
                    >
                      <DownloadSimple className="h-3.5 w-3.5" weight="bold" />
                      Download PNG
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Print-friendly CSS */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          body * {
            visibility: hidden;
          }
          .space-y-8,
          .space-y-8 * {
            visibility: visible;
          }
          section {
            break-inside: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
