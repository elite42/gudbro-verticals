import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '@/styles/globals.css'

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT LAYOUT

   App-wide configuration including fonts, metadata, and viewport settings.
   Mobile-first PWA configuration for tourists scanning QR codes.
   ═══════════════════════════════════════════════════════════════════════════ */

// Main font - Clean, highly readable, supports all languages
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Monospace font (for prices, codes)
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'GUDBRO Tours - Discover Local Experiences',
    template: '%s | GUDBRO Tours',
  },
  description:
    'Book authentic local tours and transport services directly from small operators. Multilingual, multi-currency, instant confirmation.',
  keywords: [
    'Vietnam tours',
    'Da Nang tours',
    'Hoi An tours',
    'local tour operator',
    'motorbike tour',
    'airport transfer',
    'travel Vietnam',
  ],
  authors: [{ name: 'GUDBRO' }],
  creator: 'GUDBRO',
  publisher: 'GUDBRO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tours.gudbro.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tours.gudbro.com',
    siteName: 'GUDBRO Tours',
    title: 'GUDBRO Tours - Discover Local Experiences',
    description:
      'Book authentic local tours and transport services directly from small operators.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GUDBRO Tours',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUDBRO Tours',
    description:
      'Book authentic local tours and transport services directly from small operators.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A1A' },
  ],
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}
