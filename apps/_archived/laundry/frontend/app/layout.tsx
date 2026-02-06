import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { generateLocalBusinessMeta } from '@/lib/seo/meta-tags';
import { generateLocalBusinessSchema } from '@/lib/seo/schema-org';
import ClientShell from '@/components/ClientShell';

// Business data for SEO
const BUSINESS_DATA = {
  name: 'Fresh & Clean Laundry',
  description:
    'Professional laundry and dry cleaning services in Da Nang. Wash & fold, ironing, dry cleaning, shoe cleaning, and express service. Affordable prices, fast turnaround. Order via WhatsApp or Zalo.',
  type: 'LaundryService',
  city: 'Da Nang',
  country: 'Vietnam',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://freshclean.gudbro.com',
  image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=1200&h=630&fit=crop',
  phone: '+84935123456',
  address: {
    street: '56 An Thuong 4',
    city: 'Ngu Hanh Son, Da Nang',
    region: 'Da Nang',
    postalCode: '550000',
    country: 'VN',
  },
  geo: {
    lat: 16.0544,
    lng: 108.2022,
  },
  rating: {
    value: 4.7,
    count: 183,
  },
  priceRange: '$',
};

// Generate comprehensive meta tags
export const metadata: Metadata = generateLocalBusinessMeta(BUSINESS_DATA);

// Viewport configuration for mobile-first PWA
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4A90D9',
};

// Generate Schema.org structured data
const businessSchema = generateLocalBusinessSchema({
  ...BUSINESS_DATA,
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      open: '07:00',
      close: '20:00',
    },
    {
      days: ['Sunday'],
      open: '08:00',
      close: '18:00',
    },
  ],
  email: 'info@freshclean.gudbro.com',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* Schema.org JSON-LD for rich search results */}
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
