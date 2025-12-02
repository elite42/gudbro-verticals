import { getLocalProducts } from '../actions';
import ProductsClient from './ProductsClient';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
    const products = await getLocalProducts();

    return <ProductsClient products={products} />;
}
