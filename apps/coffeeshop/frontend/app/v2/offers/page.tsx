/**
 * V2 Offers Page Route (Server Component)
 *
 * Pagina offerte e promozioni.
 *
 * @route /v2/offers
 */

import V2OffersClient from './V2OffersClient';

export const metadata = {
  title: 'Special Offers - ROOTS',
  description: 'Check out our latest deals and promotions',
};

export default function V2OffersPage() {
  return <V2OffersClient />;
}
