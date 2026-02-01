'use client';

import {
  UserCircle,
  ClipboardText,
  IdentificationCard,
  Globe,
  CurrencyDollar,
} from '@phosphor-icons/react';
import type {
  BookingInfo,
  RoomInfo,
  PropertyInfo,
  GuestDocument,
  ServiceOrder,
} from '@/types/stay';
import VisaStatusCard from '@/components/stay/VisaStatusCard';
import VisaExpiryAlert from '@/components/stay/VisaExpiryAlert';

interface ProfileViewProps {
  booking: BookingInfo;
  room: RoomInfo;
  property: PropertyInfo;
  documents: GuestDocument[];
  orders: ServiceOrder[];
  activeVisa: GuestDocument | undefined;
  onUploadDocument: () => void;
}

/** Status badge colors for order status pills */
function statusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-700';
    case 'confirmed':
    case 'preparing':
      return 'bg-blue-100 text-blue-700';
    case 'ready':
      return 'bg-emerald-100 text-emerald-700';
    case 'delivered':
      return 'bg-gray-100 text-gray-600';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

/** Format order items summary: "Item 1, Item 2 and 3 more" */
function itemsSummary(items: ServiceOrder['items']): string {
  if (items.length === 0) return 'No items';
  const shown = items.slice(0, 2).map((i) => i.name);
  const remaining = items.length - shown.length;
  if (remaining > 0) {
    return `${shown.join(', ')} and ${remaining} more`;
  }
  return shown.join(', ');
}

export default function ProfileView({
  booking,
  room,
  property,
  documents,
  orders,
  activeVisa,
  onUploadDocument,
}: ProfileViewProps) {
  const activeDocuments = documents.filter((d) => !d.supersededBy);

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Guest Info Card */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <UserCircle size={22} weight="duotone" className="text-[#3D8B87]" />
          <h3 className="font-semibold text-[#2D2016]">Guest Information</h3>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B7355]">Name</span>
            <span className="text-sm font-medium text-[#2D2016]">{booking.guestName}</span>
          </div>
          {booking.guestCountry && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8B7355]">Nationality</span>
              <span className="text-sm font-medium text-[#2D2016]">{booking.guestCountry}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B7355]">Room</span>
            <span className="text-sm font-medium text-[#2D2016]">
              {room.number} {room.name ? `(${room.name})` : ''}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B7355]">Check-in</span>
            <span className="text-sm font-medium text-[#2D2016]">
              {new Date(booking.checkIn).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B7355]">Check-out</span>
            <span className="text-sm font-medium text-[#2D2016]">
              {new Date(booking.checkOut).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8B7355]">Nights</span>
            <span className="text-sm font-medium text-[#2D2016]">{booking.nights}</span>
          </div>
        </div>
      </div>

      {/* Visa Status */}
      {booking.guestCountry && (
        <div className="[&>section]:mb-0 [&>section]:px-0">
          <VisaStatusCard
            guestCountry={booking.guestCountry}
            checkInDate={booking.checkIn}
            uploadedVisaExpiry={activeVisa?.visaExpiryDate}
          />
          {activeVisa?.visaExpiryDate && (
            <VisaExpiryAlert
              visaExpiryDate={activeVisa.visaExpiryDate}
              checkInDate={booking.checkIn}
            />
          )}
        </div>
      )}

      {/* Documents */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IdentificationCard size={22} weight="duotone" className="text-[#6366F1]" />
            <h3 className="font-semibold text-[#2D2016]">
              Documents{activeDocuments.length > 0 ? ` (${activeDocuments.length})` : ''}
            </h3>
          </div>
          <button
            onClick={onUploadDocument}
            className="rounded-lg bg-[#3D8B87]/10 px-3 py-1.5 text-xs font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/20"
          >
            Upload
          </button>
        </div>

        {activeDocuments.length === 0 ? (
          <p className="text-xs text-[#8B7355]">
            No documents uploaded yet. Upload your passport for residence registration.
          </p>
        ) : (
          <div className="space-y-2">
            {activeDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {doc.documentType === 'passport' ? '\u{1F6C2}' : '\u{1F4C4}'}
                  </span>
                  <div>
                    <p className="text-xs font-medium capitalize text-[#2D2016]">
                      {doc.documentType}
                    </p>
                    {doc.visaExpiryDate && (
                      <p className="text-[10px] text-[#8B7355]">Expires: {doc.visaExpiryDate}</p>
                    )}
                  </div>
                </div>
                {doc.registeredWithAuthorities && (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    Registered
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order History */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <ClipboardText size={22} weight="duotone" className="text-[#059669]" />
          <h3 className="font-semibold text-[#2D2016]">Order History</h3>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-[#8B7355]">No orders yet. Use Services to place an order.</p>
        ) : (
          <div className="space-y-2.5">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl bg-[#FAF8F5] px-3 py-2.5">
                <div className="mb-1.5 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                  <span className="text-[10px] text-[#8B7355]">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-xs text-[#2D2016]">{itemsSummary(order.items)}</p>
                <p className="mt-1 text-xs font-semibold text-[#2D2016]">
                  {order.currency} {order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preferences (stub for Phase 38) */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Globe size={22} weight="duotone" className="text-[#D97706]" />
          <h3 className="font-semibold text-[#2D2016]">Preferences</h3>
        </div>

        <p className="mb-3 text-xs text-[#8B7355]">
          Your preferences will be saved for future stays.
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-3 py-2">
            <div className="flex items-center gap-2">
              <CurrencyDollar size={16} className="text-[#8B7355]" />
              <span className="text-xs text-[#8B7355]">Currency</span>
            </div>
            <span className="text-xs font-medium text-[#2D2016]">
              {typeof window !== 'undefined'
                ? localStorage.getItem('preferred-currency') || 'USD'
                : 'USD'}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[#FAF8F5] px-3 py-2">
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#8B7355]" />
              <span className="text-xs text-[#8B7355]">Language</span>
            </div>
            <span className="text-xs font-medium text-[#2D2016]">
              {typeof window !== 'undefined' ? navigator.language || 'en' : 'en'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
