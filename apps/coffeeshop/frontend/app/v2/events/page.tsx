/**
 * V2 Events Page Route (Server Component)
 *
 * Pagina eventi e attività.
 *
 * @route /v2/events
 */

import V2EventsClient from './V2EventsClient';

export const metadata = {
  title: 'Events - ROOTS',
  description: 'Check out upcoming events and activities at ROOTS',
};

export default function V2EventsPage() {
  return <V2EventsClient />;
}
