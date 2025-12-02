import { getGlobalProducts } from '../actions';
import { CatalogClient } from './CatalogClient';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
    const products = await getGlobalProducts();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Global Catalog</h1>
                <p className="text-gray-500">Centralized products available to all venues</p>
            </div>

            <CatalogClient products={products} />
        </div>
    );
}
