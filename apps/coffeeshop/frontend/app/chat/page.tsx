import { getMenuProducts } from '../actions';
import { ModernChatMenuV5 } from '@/components/ModernChatMenuV5';

export const metadata = {
  title: 'GUDBRO Chat Menu | AI-Powered Menu Assistant',
  description: 'Explore our menu with our AI assistant. Get personalized recommendations, filter by allergies, and order with ease.',
};

export default async function ChatPage() {
  const menuItems = await getMenuProducts();

  return <ModernChatMenuV5 menuItems={menuItems} />;
}
