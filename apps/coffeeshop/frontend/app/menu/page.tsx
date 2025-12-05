import { getMenuProductsRaw } from '../actions';
import MenuClient from './MenuClient';

export default async function MenuPage() {
    // Use raw products with multilingual fields for client-side language switching
    const menuItems = await getMenuProductsRaw();

    return <MenuClient initialMenuItems={menuItems} />;
}
