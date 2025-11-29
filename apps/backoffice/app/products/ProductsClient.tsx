'use client';

import { deleteProduct } from '../actions';
import { ProductForm } from './ProductForm';
import { useState } from 'react';

interface ProductsClientProps {
    products: any[];
}

export default function ProductsClient({ products }: ProductsClientProps) {
    const [editingProduct, setEditingProduct] = useState<any | null>(null);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product List */}
                <div className="lg:col-span-2 space-y-4">
                    {products.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">No products found. Add your first product!</p>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className={`flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow ${editingProduct?.id === product.id ? 'ring-2 ring-indigo-500' : ''}`}>
                                <div className="flex items-center space-x-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                                        {product.image && (
                                            <img src={product.image} alt={product.name.en} className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{product.name.en}</h3>
                                        <p className="text-sm text-gray-500">{product.categoryMain} • {product.price} {product.currency}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setEditingProduct({
                                            id: product.id,
                                            name: product.name.en,
                                            description: product.description?.en || '',
                                            price: product.price,
                                            category: product.categoryMain
                                        })}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-1 rounded hover:bg-indigo-50"
                                    >
                                        Edit
                                    </button>
                                    <form action={deleteProduct.bind(null, product.id)}>
                                        <button className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add/Edit Product Form */}
                <div>
                    <div className="sticky top-8">
                        <ProductForm
                            key={editingProduct ? editingProduct.id : 'new'} // Force re-mount on change
                            initialData={editingProduct}
                            onCancel={() => setEditingProduct(null)}
                            onSuccess={() => setEditingProduct(null)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
