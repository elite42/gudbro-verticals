import {
  WifiHigh,
  Car,
  SwimmingPool,
  CookingPot,
  Fan,
  Television,
  WashingMachine,
  Snowflake,
  Fire,
  Elevator,
  FirstAid,
  Baby,
  Dog,
  Barbell,
  Waves,
  Bathtub,
  Coffee,
  Broom,
  CheckCircle,
} from '@phosphor-icons/react/dist/ssr';
import type { Icon } from '@phosphor-icons/react';

interface AmenityGridProps {
  amenities: string[];
}

// Map amenity names (lowercase) to Phosphor Icons
const AMENITY_ICON_MAP: Record<string, Icon> = {
  wifi: WifiHigh,
  parking: Car,
  pool: SwimmingPool,
  'swimming pool': SwimmingPool,
  kitchen: CookingPot,
  ac: Fan,
  'air conditioning': Fan,
  tv: Television,
  television: Television,
  washer: WashingMachine,
  'washing machine': WashingMachine,
  heating: Fire,
  fireplace: Fire,
  elevator: Elevator,
  'first aid': FirstAid,
  'baby friendly': Baby,
  'pet friendly': Dog,
  gym: Barbell,
  fitness: Barbell,
  'hot tub': Waves,
  jacuzzi: Waves,
  bathtub: Bathtub,
  coffee: Coffee,
  'coffee maker': Coffee,
  cleaning: Broom,
  'daily cleaning': Broom,
  'air conditioner': Snowflake,
};

function getAmenityIcon(amenity: string): Icon {
  const key = amenity.toLowerCase().trim();
  return AMENITY_ICON_MAP[key] || CheckCircle;
}

export default function AmenityGrid({ amenities }: AmenityGridProps) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Amenities</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = getAmenityIcon(amenity);
          return (
            <div key={amenity} className="text-foreground-muted flex items-center gap-2.5">
              <Icon size={20} weight="duotone" className="text-primary flex-shrink-0" />
              <span className="text-sm">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
