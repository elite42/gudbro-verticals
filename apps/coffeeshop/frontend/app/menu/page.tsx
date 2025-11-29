import { getMenuProducts } from '../actions';
import MenuClient from './MenuClient';

export default async function MenuPage() {
    const menuItems = await getMenuProducts();

    return <MenuClient initialMenuItems={menuItems} />;
}
