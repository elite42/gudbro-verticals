import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSupabaseAdmin } from '@/lib/supabase';
import { buildLodgingBusinessSchema } from '@/lib/structured-data';
import type { PropertyPageData, PropertyRoom, RoomBed } from '@/types/property';
import PropertyPageClient from './PropertyPageClient';

interface Props {
  params: { slug: string };
}

/**
 * Fetch property data with rooms join, directly from Supabase (server-side).
 * Uses regular join (not !inner) so the page loads even if a property has no rooms.
 */
async function fetchProperty(slug: string): Promise<PropertyPageData | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('accom_properties')
    .select(
      `
      id,
      name,
      slug,
      type,
      description,
      address,
      city,
      country_code,
      latitude,
      longitude,
      images,
      amenities,
      house_rules,
      contact_phone,
      contact_email,
      contact_whatsapp,
      check_in_time,
      check_out_time,
      host_name,
      host_photo,
      host_languages,
      booking_mode,
      accepted_payment_methods,
      min_nights,
      max_nights,
      cleaning_fee,
      weekly_discount_percent,
      monthly_discount_percent,
      has_linked_fnb,
      linked_fnb_slug,
      accom_rooms (
        id,
        room_number,
        room_type,
        capacity,
        description,
        base_price_per_night,
        currency,
        images,
        beds,
        is_active
      )
    `
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;

  // Map DB row to PropertyPageData
  const property: PropertyPageData = {
    id: data.id,
    name: data.name,
    slug: data.slug,
    type: data.type || 'hotel',
    description: data.description,
    address: data.address,
    city: data.city,
    country_code: data.country_code || 'VN',
    latitude: data.latitude,
    longitude: data.longitude,
    images: data.images || [],
    amenities: data.amenities || [],
    house_rules: data.house_rules || {},
    contact_phone: data.contact_phone,
    contact_email: data.contact_email,
    contact_whatsapp: data.contact_whatsapp,
    check_in_time: data.check_in_time || '14:00',
    check_out_time: data.check_out_time || '12:00',
    host_name: data.host_name,
    host_photo: data.host_photo,
    host_languages: data.host_languages || [],
    booking_mode: data.booking_mode || 'inquiry',
    accepted_payment_methods: data.accepted_payment_methods || [],
    min_nights: data.min_nights || 1,
    max_nights: data.max_nights,
    cleaning_fee: data.cleaning_fee || 0,
    weekly_discount_percent: data.weekly_discount_percent || 0,
    monthly_discount_percent: data.monthly_discount_percent || 0,
    has_linked_fnb: data.has_linked_fnb || false,
    linked_fnb_slug: data.linked_fnb_slug,
    rooms: ((data.accom_rooms as unknown as PropertyRoom[]) || []).map((r) => ({
      id: r.id,
      room_number: r.room_number,
      room_type: r.room_type,
      capacity: r.capacity,
      description: r.description,
      base_price_per_night: r.base_price_per_night,
      currency: r.currency || 'VND',
      images: r.images || [],
      beds: (r.beds as unknown as RoomBed[]) || [],
      is_active: r.is_active,
    })),
  };

  return property;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = await fetchProperty(params.slug);
  if (!property) return {};

  return {
    title: `${property.name} -- ${property.city || ''} | GUDBRO Stays`,
    description: property.description?.slice(0, 155) || `Book ${property.name} directly`,
    openGraph: {
      title: property.name,
      description: property.description?.slice(0, 155) || `Book ${property.name} directly`,
      images: property.images?.[0] ? [{ url: property.images[0] }] : [],
      type: 'website',
      siteName: 'GUDBRO Stays',
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const property = await fetchProperty(params.slug);
  if (!property) notFound();

  const jsonLd = buildLodgingBusinessSchema(property);

  // JSON-LD rendered via standard Next.js pattern.
  // Data is server-controlled from our own database -- JSON.stringify is sufficient.
  const jsonLdHtml = JSON.stringify(jsonLd);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <PropertyPageClient property={property} />
    </>
  );
}
