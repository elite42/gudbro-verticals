'use server';

// Temporarily using sample data instead of Prisma
// TODO: Replace with actual database queries when Prisma is configured
import sampleProducts from '@/data/sample-products.json';

export async function getMenuProducts() {
    // Return sample products for now
    // This will be replaced with actual Prisma/Supabase queries later
    return sampleProducts as any[];
}
