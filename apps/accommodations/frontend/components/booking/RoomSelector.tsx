'use client';

import { Bed, Users, Check } from '@phosphor-icons/react';
import { formatPrice } from '@/lib/price-utils';
import type { PropertyRoom } from '@/types/property';

interface RoomSelectorProps {
  rooms: PropertyRoom[];
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export default function RoomSelector({ rooms, selectedRoomId, onSelectRoom }: RoomSelectorProps) {
  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Select a Room</h2>
      <div className="space-y-3">
        {rooms
          .filter((r) => r.is_active)
          .map((room) => {
            const isSelected = room.id === selectedRoomId;
            return (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary-light shadow-sm'
                    : 'border-border bg-background hover:border-foreground-subtle'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <p className="text-foreground font-medium">
                      {room.room_type}
                      {room.room_number && (
                        <span className="text-foreground-muted ml-1.5 text-sm">
                          #{room.room_number}
                        </span>
                      )}
                    </p>

                    {/* Capacity */}
                    <div className="text-foreground-muted flex items-center gap-1.5 text-sm">
                      <Users size={14} weight="duotone" />
                      <span>
                        Up to {room.capacity} guest{room.capacity !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {/* Bed configuration */}
                    {room.beds.length > 0 && (
                      <div className="text-foreground-muted flex items-center gap-1.5 text-sm">
                        <Bed size={14} weight="duotone" />
                        <span>{room.beds.map((bed) => `${bed.count} ${bed.type}`).join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <p className="text-foreground text-lg font-semibold">
                      {formatPrice(room.base_price_per_night, room.currency)}
                    </p>
                    <p className="text-foreground-muted text-xs">per night</p>
                    {isSelected && (
                      <div className="text-primary mt-1 flex items-center gap-1 text-xs font-medium">
                        <Check size={14} weight="bold" />
                        Selected
                      </div>
                    )}
                  </div>
                </div>

                {room.description && (
                  <p className="text-foreground-muted mt-2 line-clamp-2 text-xs">
                    {room.description}
                  </p>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
