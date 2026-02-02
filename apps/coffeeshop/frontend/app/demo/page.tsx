/**
 * Demo Hub Landing Page
 *
 * Pagina centrale per accedere a tutte le demo dei verticali GUDBRO.
 * Usata durante presentazioni B2B ai potenziali clienti.
 *
 * @route /demo
 */

import DemoHubClient from './DemoHubClient';

export const metadata = {
  title: 'GUDBRO Demo Hub - Digital Solutions for Hospitality',
  description: 'Explore our digital menu and management solutions for restaurants, cafes, hotels, spas, and more.',
};

export default function DemoHubPage() {
  return <DemoHubClient />;
}
