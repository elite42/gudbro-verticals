/**
 * V2 About Page Route (Server Component)
 *
 * Pagina about con informazioni sul ristorante.
 *
 * @route /v2/about
 */

import V2AboutClient from './V2AboutClient';

export const metadata = {
  title: 'About Us - ROOTS',
  description: 'Learn about ROOTS - Clean food opportunity for everyone',
};

export default function V2AboutPage() {
  return <V2AboutClient />;
}
