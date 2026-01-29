'use client';

import { differenceInCalendarDays, format } from 'date-fns';
import type { BookingInfo, RoomInfo } from '@/types/stay';

interface WelcomeCardProps {
  booking: BookingInfo;
  room: RoomInfo;
}

export default function WelcomeCard({ booking, room }: WelcomeCardProps) {
  const today = new Date();
  const checkOutDate = new Date(booking.checkOut);
  const checkInDate = new Date(booking.checkIn);
  const daysRemaining = differenceInCalendarDays(checkOutDate, today);

  const firstName = booking.guestName.split(' ')[0];

  return (
    <section className="mb-4 px-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm text-[#8B7355]">Welcome</p>
          <h2 className="font-display text-2xl font-semibold text-[#2D2016]">{firstName}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-[#2D2016]">
            {room.name || `Room ${room.number}`}
          </p>
          <div className="inline-block rounded-full bg-[#E07A5F]/10 px-2 py-0.5">
            <span className="text-xs font-semibold text-[#E07A5F]">
              {daysRemaining > 0 ? `${daysRemaining}d left` : 'Checkout today'}
            </span>
          </div>
        </div>
      </div>

      {/* Stay dates and guest info */}
      <div className="flex items-center gap-3 text-xs text-[#8B7355]">
        <span>
          {format(checkInDate, 'MMM d')} - {format(checkOutDate, 'MMM d, yyyy')}
        </span>
        <span>&bull;</span>
        <span>
          {booking.nights} night{booking.nights !== 1 ? 's' : ''}
        </span>
        {booking.guestCount > 1 && (
          <>
            <span>&bull;</span>
            <span>
              {booking.guestCount} guest{booking.guestCount !== 1 ? 's' : ''}
            </span>
          </>
        )}
      </div>
    </section>
  );
}
