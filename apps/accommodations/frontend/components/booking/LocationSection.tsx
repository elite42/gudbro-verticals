import { MapPin, NavigationArrow } from '@phosphor-icons/react/dist/ssr';

interface LocationSectionProps {
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

export default function LocationSection({
  address,
  city,
  latitude,
  longitude,
}: LocationSectionProps) {
  if (!address && !city && !latitude) return null;

  const hasCoords = latitude !== null && longitude !== null;
  const googleMapsUrl = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    : null;

  // OpenStreetMap static tile for map preview
  const mapTileUrl = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${longitude! - 0.01},${latitude! - 0.005},${longitude! + 0.01},${latitude! + 0.005}&layer=mapnik&marker=${latitude},${longitude}`
    : null;

  return (
    <div>
      <h2 className="font-display text-foreground mb-3 text-lg font-semibold">Location</h2>

      {/* Map preview */}
      {mapTileUrl ? (
        <div className="border-border mb-3 overflow-hidden rounded-xl border">
          <iframe
            src={mapTileUrl}
            className="h-48 w-full md:h-64"
            title="Property location"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="bg-primary-light mb-3 flex h-48 items-center justify-center rounded-xl">
          <MapPin size={40} weight="duotone" className="text-foreground-muted" />
        </div>
      )}

      {/* Address */}
      {(address || city) && (
        <div className="text-foreground-muted flex items-start gap-2 text-sm">
          <MapPin size={16} weight="fill" className="mt-0.5 flex-shrink-0" />
          <span>{address || city}</span>
        </div>
      )}

      {/* Google Maps link */}
      {googleMapsUrl && (
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-hover mt-2 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          <NavigationArrow size={14} weight="fill" />
          Open in Google Maps
        </a>
      )}
    </div>
  );
}
