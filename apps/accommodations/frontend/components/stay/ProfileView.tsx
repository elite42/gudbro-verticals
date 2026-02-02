'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  UserCircle,
  ClipboardText,
  IdentificationCard,
  Clock,
  SpinnerGap,
  CheckCircle,
  XCircle,
  HourglassMedium,
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

interface CheckoutRequestData {
  id: string;
  request_type: 'early_checkin' | 'late_checkout';
  requested_time: string;
  reason: string | null;
  status: 'pending' | 'approved' | 'rejected';
  owner_response: string | null;
  created_at: string;
}

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
  const isBookingInactive = ['checked_out', 'cancelled'].includes(booking.status);

  // Checkout request state
  const [checkoutRequests, setCheckoutRequests] = useState<CheckoutRequestData[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [submittingType, setSubmittingType] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<'early_checkin' | 'late_checkout' | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const getToken = useCallback(() => {
    try {
      return (
        localStorage.getItem('gudbro_guest_token') ||
        localStorage.getItem('gudbro_booking_token') ||
        ''
      );
    } catch {
      return '';
    }
  }, []);

  // Fetch existing requests on mount
  useEffect(() => {
    async function fetchRequests() {
      try {
        const token = getToken();
        const res = await fetch(`/api/stay/${booking.code}/checkout-request`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setCheckoutRequests(data.data?.requests || []);
        }
      } catch {
        // Non-blocking
      } finally {
        setLoadingRequests(false);
      }
    }
    fetchRequests();
  }, [booking.code, getToken]);

  const handleSubmitRequest = async (type: 'early_checkin' | 'late_checkout') => {
    if (!selectedTime) return;
    setSubmittingType(type);
    setSubmitError(null);
    try {
      const token = getToken();
      const res = await fetch(`/api/stay/${booking.code}/checkout-request`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          request_type: type,
          requested_time: `${selectedTime}:00`,
          reason: reason.trim() || undefined,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setCheckoutRequests((prev) => [data.data.request, ...prev]);
        setShowForm(null);
        setSelectedTime('');
        setReason('');
      } else {
        const errData = await res.json();
        setSubmitError(errData.error || 'Failed to submit request');
      }
    } catch {
      setSubmitError('Network error');
    } finally {
      setSubmittingType(null);
    }
  };

  const earlyCheckinRequest = checkoutRequests.find((r) => r.request_type === 'early_checkin');
  const lateCheckoutRequest = checkoutRequests.find((r) => r.request_type === 'late_checkout');

  const EARLY_CHECKIN_TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00'];
  const LATE_CHECKOUT_TIMES = ['14:00', '15:00', '16:00', '17:00', '18:00'];

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

      {/* Check-in / Checkout Requests */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <Clock size={22} weight="duotone" className="text-[#D97706]" />
          <h3 className="font-semibold text-[#2D2016]">Check-in / Checkout Requests</h3>
        </div>

        {loadingRequests ? (
          <div className="flex items-center justify-center py-4">
            <SpinnerGap size={20} className="animate-spin text-[#8B7355]" />
          </div>
        ) : isBookingInactive ? (
          <p className="text-xs text-[#8B7355]">Your booking is no longer active.</p>
        ) : (
          <div className="space-y-3">
            {/* Early Check-in */}
            {earlyCheckinRequest ? (
              <RequestStatusCard request={earlyCheckinRequest} label="Early Check-in" />
            ) : showForm === 'early_checkin' ? (
              <RequestForm
                label="Early Check-in"
                times={EARLY_CHECKIN_TIMES}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                reason={reason}
                setReason={setReason}
                onSubmit={() => handleSubmitRequest('early_checkin')}
                onCancel={() => {
                  setShowForm(null);
                  setSelectedTime('');
                  setReason('');
                  setSubmitError(null);
                }}
                submitting={submittingType === 'early_checkin'}
                error={submitError}
              />
            ) : (
              <button
                onClick={() => {
                  setShowForm('early_checkin');
                  setSubmitError(null);
                }}
                className="w-full rounded-xl bg-[#FAF8F5] px-3 py-2.5 text-left text-xs font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/10"
              >
                Request Early Check-in
              </button>
            )}

            {/* Late Checkout */}
            {lateCheckoutRequest ? (
              <RequestStatusCard request={lateCheckoutRequest} label="Late Checkout" />
            ) : showForm === 'late_checkout' ? (
              <RequestForm
                label="Late Checkout"
                times={LATE_CHECKOUT_TIMES}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                reason={reason}
                setReason={setReason}
                onSubmit={() => handleSubmitRequest('late_checkout')}
                onCancel={() => {
                  setShowForm(null);
                  setSelectedTime('');
                  setReason('');
                  setSubmitError(null);
                }}
                submitting={submittingType === 'late_checkout'}
                error={submitError}
              />
            ) : (
              <button
                onClick={() => {
                  setShowForm('late_checkout');
                  setSubmitError(null);
                }}
                className="w-full rounded-xl bg-[#FAF8F5] px-3 py-2.5 text-left text-xs font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/10"
              >
                Request Late Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components for checkout requests
// ---------------------------------------------------------------------------

function RequestStatusCard({ request, label }: { request: CheckoutRequestData; label: string }) {
  return (
    <div
      className={`rounded-xl px-3 py-2.5 ${
        request.status === 'approved'
          ? 'bg-emerald-50'
          : request.status === 'rejected'
            ? 'bg-red-50'
            : 'bg-amber-50'
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#2D2016]">{label}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
            request.status === 'approved'
              ? 'bg-emerald-100 text-emerald-700'
              : request.status === 'rejected'
                ? 'bg-red-100 text-red-700'
                : 'bg-amber-100 text-amber-700'
          }`}
        >
          {request.status === 'approved' ? (
            <CheckCircle size={10} weight="fill" />
          ) : request.status === 'rejected' ? (
            <XCircle size={10} weight="fill" />
          ) : (
            <HourglassMedium size={10} weight="fill" />
          )}
          {request.status}
        </span>
      </div>
      <p className="text-xs text-[#2D2016]">
        Requested time: <strong>{request.requested_time.slice(0, 5)}</strong>
      </p>
      {request.reason && (
        <p className="mt-0.5 text-[10px] italic text-[#8B7355]">{request.reason}</p>
      )}
      {request.owner_response && (
        <p className="mt-1 text-[10px] text-[#2D2016]">Owner: {request.owner_response}</p>
      )}
    </div>
  );
}

function RequestForm({
  label,
  times,
  selectedTime,
  setSelectedTime,
  reason,
  setReason,
  onSubmit,
  onCancel,
  submitting,
  error,
}: {
  label: string;
  times: string[];
  selectedTime: string;
  setSelectedTime: (v: string) => void;
  reason: string;
  setReason: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitting: boolean;
  error: string | null;
}) {
  return (
    <div className="rounded-xl border border-[#3D8B87]/20 bg-[#FAF8F5] px-3 py-3">
      <p className="mb-2 text-xs font-semibold text-[#2D2016]">{label}</p>
      <div className="mb-2">
        <label className="mb-1 block text-[10px] text-[#8B7355]">Preferred time</label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full rounded-lg border border-[#E5DDD0] bg-white px-2 py-1.5 text-xs text-[#2D2016] outline-none focus:border-[#3D8B87]"
        >
          <option value="">Select time</option>
          {times.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="mb-1 block text-[10px] text-[#8B7355]">Reason (optional)</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={2}
          className="w-full resize-none rounded-lg border border-[#E5DDD0] bg-white px-2 py-1.5 text-xs text-[#2D2016] outline-none focus:border-[#3D8B87]"
          placeholder="e.g. Early flight, late arrival..."
        />
      </div>
      {error && <p className="mb-2 text-[10px] text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={onSubmit}
          disabled={!selectedTime || submitting}
          className="rounded-lg bg-[#3D8B87] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2D6B67] disabled:opacity-50"
        >
          {submitting ? <SpinnerGap size={14} className="animate-spin" /> : 'Submit'}
        </button>
        <button
          onClick={onCancel}
          disabled={submitting}
          className="rounded-lg bg-[#E5DDD0] px-3 py-1.5 text-xs font-medium text-[#8B7355] transition-colors hover:bg-[#D5CCC0]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
