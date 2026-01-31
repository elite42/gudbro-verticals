/**
 * JSON-LD Structured Data for Property Pages
 *
 * Generates Schema.org LodgingBusiness markup for SEO.
 * Used in the server component to render in <script type="application/ld+json">.
 */
import type { WithContext, LodgingBusiness } from 'schema-dts';
import type { PropertyPageData } from '@/types/property';
import { formatPrice } from './price-utils';

export function buildLodgingBusinessSchema(
  property: PropertyPageData
): WithContext<LodgingBusiness> {
  const priceRange = formatPriceRange(property.rooms);

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: property.name,
    description: property.description || undefined,
    image: property.images?.[0] || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address || undefined,
      addressLocality: property.city || undefined,
      addressCountry: property.country_code,
    },
    geo:
      property.latitude && property.longitude
        ? {
            '@type': 'GeoCoordinates',
            latitude: property.latitude,
            longitude: property.longitude,
          }
        : undefined,
    telephone: property.contact_phone || undefined,
    checkinTime: property.check_in_time,
    checkoutTime: property.check_out_time,
    amenityFeature: property.amenities?.map((amenity: string) => ({
      '@type': 'LocationFeatureSpecification' as const,
      name: amenity,
      value: true,
    })),
    numberOfRooms: property.rooms?.length,
    priceRange,
  };
}

function formatPriceRange(rooms: PropertyPageData['rooms']): string | undefined {
  if (!rooms || rooms.length === 0) return undefined;

  const activeRooms = rooms.filter((r) => r.is_active);
  if (activeRooms.length === 0) return undefined;

  const prices = activeRooms.map((r) => r.base_price_per_night);
  const currency = activeRooms[0].currency;
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  if (min === max) {
    return formatPrice(min, currency);
  }
  return `${formatPrice(min, currency)} - ${formatPrice(max, currency)}`;
}
