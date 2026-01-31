import { MapPin, Users, Bed, Bathtub } from '@phosphor-icons/react/dist/ssr';
import type { PropertyRoom } from '@/types/property';

interface PropertyHeaderProps {
  name: string;
  city: string | null;
  countryCode: string;
  type: string;
  rooms: PropertyRoom[];
}

export default function PropertyHeader({
  name,
  city,
  countryCode,
  type,
  rooms,
}: PropertyHeaderProps) {
  const maxGuests = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const bedroomCount = rooms.filter((r) => r.is_active).length;

  // Capitalize property type for display
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="space-y-2">
      <p className="text-foreground-muted text-sm font-medium uppercase tracking-wide">
        {typeLabel}
      </p>
      <h1 className="font-display text-foreground text-2xl font-bold md:text-3xl">{name}</h1>

      {city && (
        <div className="text-foreground-muted flex items-center gap-1.5">
          <MapPin size={16} weight="fill" />
          <span className="text-sm">
            {city}, {countryCode.toUpperCase()}
          </span>
        </div>
      )}

      <div className="text-foreground-muted flex flex-wrap items-center gap-4 pt-1 text-sm">
        <div className="flex items-center gap-1.5">
          <Users size={16} weight="duotone" />
          <span>
            {maxGuests} guest{maxGuests !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Bed size={16} weight="duotone" />
          <span>
            {bedroomCount} bedroom{bedroomCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Bathtub size={16} weight="duotone" />
          <span>Bathroom</span>
        </div>
      </div>
    </div>
  );
}
