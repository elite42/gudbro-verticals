'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// =============================================================================
// MOCK DATA
// =============================================================================

const services = [
  {
    id: '1',
    slug: 'wash-and-fold',
    name: 'Wash & Fold',
    category: 'wash',
    categoryLabel: 'Wash & Fold',
    price: 25000,
    unit: 'kg',
    turnaround: '24h',
    description:
      'Machine wash with premium detergent, tumble dry, neatly folded. Perfect for everyday clothes, casual wear, and gym clothes.',
    includes: [
      'Machine wash (warm/cold)',
      'Premium eco-friendly detergent',
      'Tumble dry',
      'Neatly folded & packaged',
    ],
    tips: [
      'Separate colors before drop-off for best results',
      'Minimum 2kg per order',
      'Express option available (+50%)',
    ],
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&h=500&fit=crop',
  },
  {
    id: '2',
    slug: 'wash-and-iron',
    name: 'Wash & Iron',
    category: 'iron',
    categoryLabel: 'Wash & Iron',
    price: 35000,
    unit: 'kg',
    turnaround: '24-36h',
    description:
      'Full wash, dry, and professional steam ironing for everyday clothes. Your garments come back fresh and wrinkle-free.',
    includes: [
      'Machine wash',
      'Tumble dry',
      'Professional steam ironing',
      'Hung on hangers or folded',
    ],
    tips: ['Best for office wear and smart casual', 'Minimum 2kg per order'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop',
  },
  {
    id: '3',
    slug: 'shirt-wash-iron',
    name: 'Shirt (Wash & Iron)',
    category: 'iron',
    categoryLabel: 'Wash & Iron',
    price: 20000,
    unit: 'item',
    turnaround: '24h',
    description:
      'Individual shirt wash and press with crisp collar and cuff finishing. Perfect for business shirts.',
    includes: [
      'Individual wash',
      'Starch option available',
      'Collar & cuff pressing',
      'Hung on hanger',
    ],
    tips: ['Point out any stains at drop-off', 'Light or heavy starch available on request'],
    image: 'https://images.unsplash.com/photo-1598032895455-1abb86a4530e?w=800&h=500&fit=crop',
  },
  {
    id: '4',
    slug: 'pants-wash-iron',
    name: 'Pants (Wash & Iron)',
    category: 'iron',
    categoryLabel: 'Wash & Iron',
    price: 25000,
    unit: 'item',
    turnaround: '24h',
    description: 'Wash and press for trousers, chinos, and dress pants with sharp crease.',
    includes: ['Gentle wash cycle', 'Steam pressing', 'Sharp crease finish', 'Hung or folded'],
    tips: ['Remove belt and items from pockets', 'Mention if you prefer no crease'],
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=500&fit=crop',
  },
  {
    id: '5',
    slug: 'dress-wash-iron',
    name: 'Dress (Wash & Iron)',
    category: 'iron',
    categoryLabel: 'Wash & Iron',
    price: 35000,
    unit: 'item',
    turnaround: '24-36h',
    description: 'Gentle wash and careful ironing for dresses and delicate garments.',
    includes: [
      'Gentle cycle wash',
      'Low-heat drying',
      'Careful hand ironing',
      'Protective packaging',
    ],
    tips: ['For heavily beaded or embellished dresses, consider dry cleaning instead'],
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=500&fit=crop',
  },
  {
    id: '6',
    slug: 'suit-dry-clean',
    name: 'Suit (2-piece)',
    category: 'dry_clean',
    categoryLabel: 'Dry Clean',
    price: 80000,
    unit: 'item',
    turnaround: '48-72h',
    description:
      'Professional dry cleaning for 2-piece suits with expert pressing and finishing. Jacket and trousers included.',
    includes: [
      'Solvent-based dry cleaning',
      'Stain pre-treatment',
      'Expert pressing',
      'Suit bag packaging',
    ],
    tips: [
      'Empty all pockets before drop-off',
      'Point out any stains for special treatment',
      'Regular dry cleaning extends suit life',
    ],
    image: 'https://images.unsplash.com/photo-1507679799987-c73b1160fdc7?w=800&h=500&fit=crop',
  },
  {
    id: '7',
    slug: 'jacket-dry-clean',
    name: 'Jacket',
    category: 'dry_clean',
    categoryLabel: 'Dry Clean',
    price: 60000,
    unit: 'item',
    turnaround: '48-72h',
    description: 'Dry cleaning for jackets and blazers with stain treatment and careful pressing.',
    includes: [
      'Professional dry cleaning',
      'Stain treatment',
      'Steam pressing',
      'Hanger packaging',
    ],
    tips: ['Remove pins and brooches before drop-off'],
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=500&fit=crop',
  },
  {
    id: '8',
    slug: 'dress-dry-clean',
    name: 'Dress (Dry Clean)',
    category: 'dry_clean',
    categoryLabel: 'Dry Clean',
    price: 50000,
    unit: 'item',
    turnaround: '48-72h',
    description:
      'Specialist dry cleaning for formal dresses and evening wear with delicate handling.',
    includes: [
      'Specialist dry cleaning',
      'Delicate handling',
      'Hand finishing',
      'Protective garment bag',
    ],
    tips: ['Recommended for silk, satin, and heavily embellished items'],
    image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&h=500&fit=crop',
  },
  {
    id: '9',
    slug: 'iron-only',
    name: 'Iron Only',
    category: 'iron_only',
    categoryLabel: 'Iron Only',
    price: 10000,
    unit: 'item',
    turnaround: '12-24h',
    description: 'Steam press service for clean garments that just need ironing. Quick turnaround.',
    includes: ['Professional steam ironing', 'Collar & cuff attention', 'Hung on hanger or folded'],
    tips: ['Garments must be clean and dry', 'Great for travel wrinkles'],
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800&h=500&fit=crop',
  },
  {
    id: '10',
    slug: 'shoe-cleaning',
    name: 'Shoe Cleaning',
    category: 'shoes',
    categoryLabel: 'Shoes',
    price: 60000,
    unit: 'pair',
    turnaround: '24-48h',
    description:
      'Professional shoe cleaning, conditioning, and polishing. Suitable for leather, suede, and canvas shoes.',
    includes: ['Surface cleaning', 'Conditioning treatment', 'Polish & buff', 'Deodorizing'],
    tips: ['Remove laces before drop-off', 'Different treatment for leather vs suede'],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=500&fit=crop',
  },
  {
    id: '11',
    slug: 'sneaker-cleaning',
    name: 'Sneaker Deep Clean',
    category: 'shoes',
    categoryLabel: 'Shoes',
    price: 80000,
    unit: 'pair',
    turnaround: '48h',
    description:
      'Deep cleaning for sneakers including sole whitening, upper cleaning, and deodorizing.',
    includes: ['Upper deep cleaning', 'Sole whitening', 'Lace cleaning', 'Deodorizing treatment'],
    tips: ['Best for white sneakers and premium kicks', 'Remove insoles if possible'],
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=500&fit=crop',
  },
  {
    id: '12',
    slug: 'bedsheet-set',
    name: 'Bedsheet Set',
    category: 'wash',
    categoryLabel: 'Wash & Fold',
    price: 30000,
    unit: 'set',
    turnaround: '24h',
    description:
      'Complete bedsheet set wash, dry and fold. Includes fitted sheet, flat sheet, and pillowcases.',
    includes: [
      'Hot water wash for hygiene',
      'Tumble dry',
      'Neatly folded',
      'Set packaged together',
    ],
    tips: [
      'One set = fitted sheet + flat sheet + 2 pillowcases',
      'Duvet covers charged separately',
    ],
    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&h=500&fit=crop',
  },
  {
    id: '13',
    slug: 'express-wash-fold',
    name: 'Express Wash & Fold',
    category: 'express',
    categoryLabel: 'Express',
    price: 37500,
    unit: 'kg',
    turnaround: '4-8h',
    description:
      'Same-day express service. Drop off in the morning, pick up by evening. 50% surcharge over standard.',
    includes: ['Priority processing', 'Machine wash', 'Quick dry', 'Neatly folded & packaged'],
    tips: ['Drop off before 10 AM for same-day pickup', 'Available Monday-Saturday only'],
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&h=500&fit=crop',
  },
  {
    id: '14',
    slug: 'towel-wash',
    name: 'Towel',
    category: 'wash',
    categoryLabel: 'Wash & Fold',
    price: 15000,
    unit: 'item',
    turnaround: '24h',
    description: 'Individual towel wash with fabric softener for maximum fluffiness.',
    includes: ['Hot water wash', 'Fabric softener', 'Tumble dry', 'Fluffy fold'],
    tips: ['Great for hotel/hostel guests', 'Bath towels and beach towels same price'],
    image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=800&h=500&fit=crop',
  },
  {
    id: '15',
    slug: 'delicate-hand-wash',
    name: 'Delicate Hand Wash',
    category: 'wash',
    categoryLabel: 'Wash & Fold',
    price: 45000,
    unit: 'item',
    turnaround: '36-48h',
    description:
      'Hand wash for silk, cashmere, lace, and other delicate fabrics requiring special care.',
    includes: [
      'Hand wash with gentle detergent',
      'Air dry (no tumble)',
      'Careful handling',
      'Flat or hang dry',
    ],
    tips: ['Best for silk, cashmere, wool, and lace', 'Longer turnaround due to air drying'],
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=500&fit=crop',
  },
];

import { formatPrice as _fp } from '@gudbro/utils';
function formatPrice(price: number): string {
  return _fp(price, 'VND');
}

const categoryColors: Record<string, string> = {
  wash: '#4A90D9',
  iron: '#38B2AC',
  dry_clean: '#9F7AEA',
  iron_only: '#ED8936',
  shoes: '#E53E3E',
  express: '#D69E2E',
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: 'var(--cloud)' }}
      >
        <div className="space-y-4 text-center">
          <p className="text-6xl">🧺</p>
          <h1 className="font-display text-xl font-bold" style={{ color: 'var(--charcoal)' }}>
            Service Not Found
          </h1>
          <Link
            href="/services"
            className="inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: 'var(--blue-hex)' }}
          >
            Browse All Services
          </Link>
        </div>
      </div>
    );
  }

  const related = services
    .filter((s) => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  const catColor = categoryColors[service.category] || '#4A90D9';

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: 'var(--cloud)' }}>
      {/* Hero Image */}
      <div className="relative h-56 w-full">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Back button */}
        <Link
          href="/services"
          className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--charcoal)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>

        {/* Category badge */}
        <span
          className="absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${catColor}20`, color: catColor, backdropFilter: 'blur(8px)' }}
        >
          {service.categoryLabel}
        </span>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-display text-2xl font-bold text-white drop-shadow-md">
            {service.name}
          </h1>
        </div>
      </div>

      {/* Price card */}
      <div className="relative z-10 mx-4 -mt-6">
        <div className="shadow-soft rounded-2xl bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold" style={{ color: 'var(--blue-hex)' }}>
                {formatPrice(service.price)}
              </span>
              <span className="ml-1 text-sm" style={{ color: 'var(--charcoal-muted)' }}>
                / {service.unit}
              </span>
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{ backgroundColor: 'var(--cloud)' }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--charcoal-muted)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                {service.turnaround}
              </span>
            </div>
          </div>

          {/* Express note */}
          {service.category === 'express' && (
            <div
              className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ backgroundColor: '#FEF3C7' }}
            >
              <span>⚡</span>
              <span className="text-xs font-medium" style={{ color: '#92400E' }}>
                Same-day service — drop off before 10 AM
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-5 px-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--charcoal)' }}>
          {service.description}
        </p>
      </div>

      {/* What's Included */}
      <div className="mt-6 px-4">
        <h2 className="font-display mb-3 text-base font-bold" style={{ color: 'var(--charcoal)' }}>
          What&apos;s Included
        </h2>
        <div className="space-y-2.5">
          {service.includes.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${catColor}15` }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={catColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <span className="text-sm" style={{ color: 'var(--charcoal)' }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 px-4">
        <h2 className="font-display mb-3 text-base font-bold" style={{ color: 'var(--charcoal)' }}>
          Tips
        </h2>
        <div className="shadow-soft space-y-2 rounded-xl bg-white p-4">
          {service.tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 text-xs">💡</span>
              <span className="text-xs leading-relaxed" style={{ color: 'var(--charcoal-muted)' }}>
                {tip}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Services */}
      {related.length > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between px-4">
            <h2 className="font-display text-base font-bold" style={{ color: 'var(--charcoal)' }}>
              Related Services
            </h2>
            <Link
              href="/services"
              className="text-xs font-medium"
              style={{ color: 'var(--blue-hex)' }}
            >
              See All →
            </Link>
          </div>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/services/${rel.slug}`}
                className="shadow-soft hover-lift w-44 flex-shrink-0 overflow-hidden rounded-xl bg-white transition-all"
              >
                <div className="relative h-28">
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    className="object-cover"
                    sizes="176px"
                  />
                </div>
                <div className="p-3">
                  <h3 className="truncate text-xs font-bold" style={{ color: 'var(--charcoal)' }}>
                    {rel.name}
                  </h3>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: 'var(--blue-hex)' }}>
                      {formatPrice(rel.price)}
                      <span className="font-normal" style={{ color: 'var(--charcoal-muted)' }}>
                        /{rel.unit}
                      </span>
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                      {rel.turnaround}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-20 left-0 right-0 z-20 px-4">
        <a
          href={`https://wa.me/84935123456?text=Hi! I'd like to order: ${service.name} (${formatPrice(service.price)}/${service.unit})`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-lift flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all"
          style={{
            backgroundColor: 'var(--blue-hex)',
            boxShadow: '0 4px 20px rgba(74,144,217,0.4)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Order on WhatsApp
        </a>
      </div>
    </div>
  );
}
