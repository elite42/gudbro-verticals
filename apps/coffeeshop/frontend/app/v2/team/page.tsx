/**
 * V2 Team Page Route (Server Component)
 *
 * Pagina team con profili staff.
 *
 * @route /v2/team
 */

import V2TeamClient from './V2TeamClient';

export const metadata = {
  title: 'Our Team - ROOTS',
  description: 'Meet the amazing team behind ROOTS',
};

export default function V2TeamPage() {
  return <V2TeamClient />;
}
