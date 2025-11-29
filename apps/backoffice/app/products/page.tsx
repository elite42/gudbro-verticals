import { getLocalProducts } from '../actions';
import ProductsClient from './ProductsClient';

export default async function ProductsPage() {
    const products = await getLocalProducts();

    return <ProductsClient products={products} />;
}
