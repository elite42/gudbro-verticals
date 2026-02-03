'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge, VerifiedBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Tour, TourBooking, TourOperator } from '@/lib/types';
import { formatPrice as _fp } from '@gudbro/utils';

/* ═══════════════════════════════════════════════════════════════════════════
   OPERATOR DASHBOARD COMPONENT

   Simple dashboard for tour operators to manage their listings and bookings.
   Designed for Vietnamese operators with basic smartphone skills.
   ═══════════════════════════════════════════════════════════════════════════ */

interface OperatorDashboardProps {
  operator: TourOperator;
  tours: Tour[];
  bookings: TourBooking[];
  onAddTour: () => void;
  onEditTour: (tour: Tour) => void;
  onViewBooking: (booking: TourBooking) => void;
  onConfirmBooking: (bookingId: string) => void;
  onDownloadQR: () => void;
}

export function OperatorDashboard({
  operator,
  tours,
  bookings,
  onAddTour,
  onEditTour,
  onViewBooking,
  onConfirmBooking,
  onDownloadQR,
}: OperatorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'bookings'>('overview');

  // Stats
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.total_price_vnd, 0);

  const formatPrice = (price: number) => _fp(price, 'VND');

  return (
    <div className="bg-background min-h-screen">
      {/* ─────────────────────────────────────────────────────────────────
          HEADER
         ───────────────────────────────────────────────────────────────── */}
      <header className="from-primary bg-gradient-to-r to-[hsl(24,85%,55%)] p-4 pb-6 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-display text-xl font-bold">Dashboard</h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={onDownloadQR}
              icon={
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13 2h-2v2h2v-2zm-4 4h2v-2h-2v2zm-2-2h2v-2h-2v2zm4 0h2v-2h-2v2zm2 2h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 0h2v-2h-2v2zm0-4h2v-2h-2v2z" />
                </svg>
              }
            >
              QR Code
            </Button>
          </div>

          {/* Operator info */}
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl">
              🧑‍✈️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{operator.name}</h2>
                {operator.verified && (
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">✓ Verified</span>
                )}
              </div>
              <p className="text-sm text-white/80">{operator.area}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────
          STATS CARDS
         ───────────────────────────────────────────────────────────────── */}
      <section className="-mt-4 px-4">
        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3">
          <div className="shadow-card rounded-xl bg-white p-4 text-center">
            <div className="font-display text-primary text-2xl font-bold">{tours.length}</div>
            <div className="text-foreground-muted mt-1 text-xs">Tours</div>
          </div>

          <div className="shadow-card rounded-xl bg-white p-4 text-center">
            <div className="font-display text-secondary text-2xl font-bold">
              {confirmedBookings}
            </div>
            <div className="text-foreground-muted mt-1 text-xs">Bookings</div>
          </div>

          <div className="shadow-card rounded-xl bg-white p-4 text-center">
            <div className="font-display text-accent text-lg font-bold">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-foreground-muted mt-1 text-xs">Revenue</div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          PENDING BOOKINGS ALERT
         ───────────────────────────────────────────────────────────────── */}
      {pendingBookings > 0 && (
        <section className="mt-4 px-4">
          <div className="mx-auto max-w-3xl">
            <div className="bg-warning/10 border-warning/30 flex items-center gap-3 rounded-xl border p-4">
              <div className="bg-warning/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                <span className="text-xl">🔔</span>
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium">
                  {pendingBookings} pending booking{pendingBookings > 1 ? 's' : ''}
                </p>
                <p className="text-foreground-muted text-sm">Tap to confirm or reject</p>
              </div>
              <button onClick={() => setActiveTab('bookings')} className="text-primary font-medium">
                View →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          TAB NAVIGATION
         ───────────────────────────────────────────────────────────────── */}
      <section className="mt-6 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="flex rounded-xl bg-gray-100 p-1">
            {(['overview', 'tours', 'bookings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors',
                  activeTab === tab
                    ? 'text-foreground bg-white shadow-sm'
                    : 'text-foreground-muted hover:text-foreground'
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          TAB CONTENT
         ───────────────────────────────────────────────────────────────── */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-3xl">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={onAddTour}
                  icon={
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  }
                >
                  Add Tour
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={onDownloadQR}
                  icon={
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                  }
                >
                  Get QR
                </Button>
              </div>

              {/* Recent Bookings */}
              <div className="mt-6">
                <h3 className="font-display mb-3 text-lg font-semibold">Recent Bookings</h3>
                {bookings.slice(0, 3).map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    tours={tours}
                    onView={() => onViewBooking(booking)}
                    onConfirm={() => onConfirmBooking(booking.id)}
                  />
                ))}
                {bookings.length === 0 && (
                  <div className="text-foreground-muted py-8 text-center">
                    <span className="text-4xl">📭</span>
                    <p className="mt-2">No bookings yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tours Tab */}
          {activeTab === 'tours' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">Your Tours ({tours.length})</h3>
                <Button size="sm" onClick={onAddTour}>
                  + Add Tour
                </Button>
              </div>

              {tours.map((tour) => (
                <TourListItem key={tour.id} tour={tour} onEdit={() => onEditTour(tour)} />
              ))}

              {tours.length === 0 && (
                <div className="py-12 text-center">
                  <span className="text-5xl">🏍️</span>
                  <h4 className="font-display mt-4 font-semibold">No tours yet</h4>
                  <p className="text-foreground-muted mb-4 mt-2">
                    Add your first tour to start receiving bookings
                  </p>
                  <Button onClick={onAddTour}>Add Your First Tour</Button>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold">
                All Bookings ({bookings.length})
              </h3>

              {/* Filter pills */}
              <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
                {['All', 'Pending', 'Confirmed', 'Completed'].map((filter) => (
                  <button
                    key={filter}
                    className="flex-shrink-0 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  tours={tours}
                  onView={() => onViewBooking(booking)}
                  onConfirm={() => onConfirmBooking(booking.id)}
                  expanded
                />
              ))}

              {bookings.length === 0 && (
                <div className="text-foreground-muted py-12 text-center">
                  <span className="text-5xl">📋</span>
                  <p className="mt-4">No bookings yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   BOOKING CARD SUBCOMPONENT
   ───────────────────────────────────────────────────────────────────── */

function BookingCard({
  booking,
  tours,
  onView,
  onConfirm,
  expanded = false,
}: {
  booking: TourBooking;
  tours: Tour[];
  onView: () => void;
  onConfirm: () => void;
  expanded?: boolean;
}) {
  const tour = tours.find((t) => t.id === booking.tour_id);

  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/30',
    confirmed: 'bg-success/10 text-success border-success/30',
    completed: 'bg-gray-100 text-gray-600 border-gray-200',
    cancelled: 'bg-error/10 text-error border-error/30',
    no_show: 'bg-error/10 text-error border-error/30',
  };

  return (
    <div
      className="border-border mb-3 cursor-pointer rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
      onClick={onView}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={cn(
                'rounded-full border px-2 py-0.5 text-xs font-medium',
                statusColors[booking.status]
              )}
            >
              {booking.status}
            </span>
            <span className="text-foreground-muted text-xs">
              {new Date(booking.created_at).toLocaleDateString()}
            </span>
          </div>

          <h4 className="text-foreground truncate font-medium">{tour?.name || 'Unknown Tour'}</h4>

          <div className="text-foreground-muted mt-1 flex items-center gap-3 text-sm">
            <span>📅 {booking.booking_date}</span>
            <span>👥 {booking.number_of_people}</span>
          </div>

          {expanded && (
            <div className="mt-2 text-sm">
              <p className="text-foreground-muted">
                {booking.customer_name} • {booking.customer_phone}
              </p>
              <p className="text-primary mt-1 font-medium">
                {booking.total_price_vnd.toLocaleString()}₫
              </p>
            </div>
          )}
        </div>

        {booking.status === 'pending' && (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   TOUR LIST ITEM SUBCOMPONENT
   ───────────────────────────────────────────────────────────────────── */

function TourListItem({ tour, onEdit }: { tour: Tour; onEdit: () => void }) {
  return (
    <div
      className="border-border cursor-pointer rounded-xl border bg-white p-4 transition-shadow hover:shadow-md"
      onClick={onEdit}
    >
      <div className="flex gap-4">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={tour.images[0] || '/placeholder-tour.jpg'}
            alt={tour.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="text-foreground truncate font-medium">{tour.name}</h4>
            {!tour.active && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                Inactive
              </span>
            )}
          </div>

          <div className="text-foreground-muted flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4 fill-current text-amber-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {tour.rating.toFixed(1)}
            </span>
            <span>📊 {tour.booking_count} bookings</span>
          </div>

          <p className="text-primary mt-2 font-semibold">
            {tour.price_vnd.toLocaleString()}₫
            <span className="text-foreground-muted ml-1 text-sm font-normal">
              / {tour.price_per}
            </span>
          </p>
        </div>

        <button
          className="text-foreground-muted hover:text-foreground p-2 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
