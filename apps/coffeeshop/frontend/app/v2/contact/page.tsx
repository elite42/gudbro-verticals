/**
 * V2 Contact Page Route (Server Component)
 *
 * Pagina contatti con form e mappa.
 *
 * @route /v2/contact
 */

import V2ContactClient from './V2ContactClient';

export const metadata = {
  title: 'Contact Us - ROOTS',
  description: 'Get in touch with ROOTS - We\'d love to hear from you',
};

export default function V2ContactPage() {
  return <V2ContactClient />;
}
