'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge, VerifiedBadge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import type { Tour, TourBooking, TourOperator } from '@/lib/types'

/* ═══════════════════════════════════════════════════════════════════════════
   OPERATOR DASHBOARD COMPONENT

   Simple dashboard for tour operators to manage their listings and bookings.
   Designed for Vietnamese operators with basic smartphone skills.
   ═══════════════════════════════════════════════════════════════════════════ */

interface OperatorDashboardProps {
  operator: TourOperator
  tours: Tour[]
  bookings: TourBooking[]
  onAddTour: () => void
  onEditTour: (tour: Tour) => void
  onViewBooking: (booking: TourBooking) => void
  onConfirmBooking: (bookingId: string) => void
  onDownloadQR: () => void
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
  const [activeTab, setActiveTab] = useState<'overview' | 'tours' | 'bookings'>('overview')

  // Stats
  const pendingBookings = bookings.filter(b => b.status === 'pending').length
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length
  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + b.total_price_vnd, 0)

  const formatPrice = (price: number) => `${price.toLocaleString()}₫`

  return (
    <div className="min-h-screen bg-background">
      {/* ─────────────────────────────────────────────────────────────────
          HEADER
         ───────────────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-primary to-[hsl(24,85%,55%)] text-white p-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-display text-xl font-bold">Dashboard</h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={onDownloadQR}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13 2h-2v2h2v-2zm-4 4h2v-2h-2v2zm-2-2h2v-2h-2v2zm4 0h2v-2h-2v2zm2 2h2v-2h-2v2zm0-4h2v-2h-2v2zm-4 0h2v-2h-2v2zm0-4h2v-2h-2v2z" />
                </svg>
              }
            >
              QR Code
            </Button>
          </div>

          {/* Operator info */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              🧑‍✈️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">{operator.name}</h2>
                {operator.verified && (
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-white/80 text-sm">{operator.area}</p>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────
          STATS CARDS
         ───────────────────────────────────────────────────────────────── */}
      <section className="px-4 -mt-4">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-card text-center">
            <div className="text-2xl font-display font-bold text-primary">
              {tours.length}
            </div>
            <div className="text-xs text-foreground-muted mt-1">Tours</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-card text-center">
            <div className="text-2xl font-display font-bold text-secondary">
              {confirmedBookings}
            </div>
            <div className="text-xs text-foreground-muted mt-1">Bookings</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-card text-center">
            <div className="text-lg font-display font-bold text-accent">
              {(totalRevenue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-foreground-muted mt-1">Revenue</div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          PENDING BOOKINGS ALERT
         ───────────────────────────────────────────────────────────────── */}
      {pendingBookings > 0 && (
        <section className="px-4 mt-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔔</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {pendingBookings} pending booking{pendingBookings > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-foreground-muted">
                  Tap to confirm or reject
                </p>
              </div>
              <button
                onClick={() => setActiveTab('bookings')}
                className="text-primary font-medium"
              >
                View →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          TAB NAVIGATION
         ───────────────────────────────────────────────────────────────── */}
      <section className="px-4 mt-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex bg-gray-100 rounded-xl p-1">
            {(['overview', 'tours', 'bookings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors',
                  activeTab === tab
                    ? 'bg-white text-foreground shadow-sm'
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
        <div className="max-w-3xl mx-auto">
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
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                    </svg>
                  }
                >
                  Get QR
                </Button>
              </div>

              {/* Recent Bookings */}
              <div className="mt-6">
                <h3 className="font-display text-lg font-semibold mb-3">
                  Recent Bookings
                </h3>
                {bookings.slice(0, 3).map(booking => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    tours={tours}
                    onView={() => onViewBooking(booking)}
                    onConfirm={() => onConfirmBooking(booking.id)}
                  />
                ))}
                {bookings.length === 0 && (
                  <div className="text-center py-8 text-foreground-muted">
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
              <div className="flex justify-between items-center">
                <h3 className="font-display text-lg font-semibold">
                  Your Tours ({tours.length})
                </h3>
                <Button size="sm" onClick={onAddTour}>
                  + Add Tour
                </Button>
              </div>

              {tours.map(tour => (
                <TourListItem
                  key={tour.id}
                  tour={tour}
                  onEdit={() => onEditTour(tour)}
                />
              ))}

              {tours.length === 0 && (
                <div className="text-center py-12">
                  <span className="text-5xl">🏍️</span>
                  <h4 className="font-display font-semibold mt-4">
                    No tours yet
                  </h4>
                  <p className="text-foreground-muted mt-2 mb-4">
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
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {['All', 'Pending', 'Confirmed', 'Completed'].map(filter => (
                  <button
                    key={filter}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 transition-colors flex-shrink-0"
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {bookings.map(booking => (
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
                <div className="text-center py-12 text-foreground-muted">
                  <span className="text-5xl">📋</span>
                  <p className="mt-4">No bookings yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
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
  booking: TourBooking
  tours: Tour[]
  onView: () => void
  onConfirm: () => void
  expanded?: boolean
}) {
  const tour = tours.find(t => t.id === booking.tour_id)

  const statusColors = {
    pending: 'bg-warning/10 text-warning border-warning/30',
    confirmed: 'bg-success/10 text-success border-success/30',
    completed: 'bg-gray-100 text-gray-600 border-gray-200',
    cancelled: 'bg-error/10 text-error border-error/30',
    no_show: 'bg-error/10 text-error border-error/30',
  }

  return (
    <div
      className="bg-white rounded-xl border border-border p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onView}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                'px-2 py-0.5 text-xs font-medium rounded-full border',
                statusColors[booking.status]
              )}
            >
              {booking.status}
            </span>
            <span className="text-xs text-foreground-muted">
              {new Date(booking.created_at).toLocaleDateString()}
            </span>
          </div>

          <h4 className="font-medium text-foreground truncate">
            {tour?.name || 'Unknown Tour'}
          </h4>

          <div className="flex items-center gap-3 mt-1 text-sm text-foreground-muted">
            <span>📅 {booking.booking_date}</span>
            <span>👥 {booking.number_of_people}</span>
          </div>

          {expanded && (
            <div className="mt-2 text-sm">
              <p className="text-foreground-muted">
                {booking.customer_name} • {booking.customer_phone}
              </p>
              <p className="font-medium text-primary mt-1">
                {booking.total_price_vnd.toLocaleString()}₫
              </p>
            </div>
          )}
        </div>

        {booking.status === 'pending' && (
          <Button
            size="sm"
            onClick={e => {
              e.stopPropagation()
              onConfirm()
            }}
          >
            Confirm
          </Button>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────
   TOUR LIST ITEM SUBCOMPONENT
   ───────────────────────────────────────────────────────────────────── */

function TourListItem({
  tour,
  onEdit,
}: {
  tour: Tour
  onEdit: () => void
}) {
  return (
    <div
      className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onEdit}
    >
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={tour.images[0] || '/placeholder-tour.jpg'}
            alt={tour.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-foreground truncate">{tour.name}</h4>
            {!tour.active && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                Inactive
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 text-sm text-foreground-muted">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {tour.rating.toFixed(1)}
            </span>
            <span>📊 {tour.booking_count} bookings</span>
          </div>

          <p className="font-semibold text-primary mt-2">
            {tour.price_vnd.toLocaleString()}₫
            <span className="text-foreground-muted font-normal text-sm ml-1">
              / {tour.price_per}
            </span>
          </p>
        </div>

        <button
          className="p-2 text-foreground-muted hover:text-foreground transition-colors"
          onClick={e => {
            e.stopPropagation()
            onEdit()
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
