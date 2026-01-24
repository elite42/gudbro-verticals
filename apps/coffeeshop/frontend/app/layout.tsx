import type { Metadata, Viewport } from 'next';
import './globals-v2.css';
import { ThemeProvider } from '@/lib/theme/theme-context';
import { DirectionProvider } from '@/components/DirectionProvider';
import { MerchantConfigProvider } from '@/lib/contexts/MerchantConfigContext';
import { PWAProvider } from '@/components/PWAProvider';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { DesktopNav } from '@/components/layout/DesktopNav';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'ROOTS Plant-Based Cafe - Healthy Vegan Restaurant in Danang',
  description:
    'Clean food opportunity for everyone. Modern plant-based dining using fresh, locally farmed produce in Đà Nẵng, Vietnam.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'ROOTS',
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#DC2626',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/pwa/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <PWAProvider>
          <ThemeProvider>
            <MerchantConfigProvider>
              <DirectionProvider>
                <AnalyticsProvider>
                  <DesktopNav />
                  {children}
                  <Footer />
                </AnalyticsProvider>
              </DirectionProvider>
            </MerchantConfigProvider>
          </ThemeProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
