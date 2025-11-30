'use server';

// Temporarily using sample data instead of Prisma
// TODO: Replace with actual database queries when Prisma is configured
import sampleProducts from '@/data/sample-products.json';

// Helper to convert multilingual objects to strings
// This prevents React Error #31 (object as child)
function normalizeMultilingualField(field: any, defaultLang = 'en'): string {
  if (typeof field === 'string') {
    return field;
  }
  if (typeof field === 'object' && field !== null) {
    return field[defaultLang] || field.en || field.it || field.vi || '';
  }
  return '';
}

export async function getMenuProducts() {
  // Transform multilingual fields to strings to prevent hydration errors
  const products = sampleProducts.map((product: any) => ({
    ...product,
    name: normalizeMultilingualField(product.name),
    description: normalizeMultilingualField(product.description),
  }));

  return products as any[];
}
