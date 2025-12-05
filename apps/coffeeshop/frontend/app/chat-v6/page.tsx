import { getMenuProductsRaw } from '../actions';
import { ModernChatMenuV6 } from '@/components/ModernChatMenuV6';

export const metadata = {
  title: 'GUDBRO Chat Menu V6 | AI-Powered Menu Assistant',
  description: 'Explore our menu with our AI assistant. Get personalized recommendations, filter by allergies, and order with ease.',
};

export default async function ChatV6Page() {
  const menuItems = await getMenuProductsRaw();

  return <ModernChatMenuV6 menuItems={menuItems} />;
}
