/**
 * Demo Hub Layout
 *
 * Layout standalone per la Demo Hub che esclude header/footer dell'app principale.
 * Questo permette alla Demo Hub di avere un design pulito e indipendente.
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GUDBRO Demo Hub - Digital Solutions for Hospitality',
  description:
    'Explore our digital menu and management solutions for restaurants, cafes, hotels, spas, and more.',
  themeColor: '#fafaf9',
  appleWebApp: {
    title: 'GUDBRO Demo',
    capable: true,
    statusBarStyle: 'default',
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
