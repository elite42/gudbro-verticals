'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getMenuProducts() {
    // Fetch both Global products (venueId: null) AND Local products (venueId: 'demo-venue-id')
    // For now we simulate a specific venue
    const products = await prisma.product.findMany({
        where: {
            OR: [
                { venueId: null },
                { venueId: 'demo-venue-id' }
            ]
        },
        orderBy: {
            categoryMain: 'asc'
        }
    });

    // Transform to frontend format (DishItem)
    return products.map(p => {
        const name = JSON.parse(p.name);
        const description = p.description ? JSON.parse(p.description) : null;
        const computed = p.computed ? JSON.parse(p.computed) : null;
        const customizations = p.customizations ? JSON.parse(p.customizations) : null;

        return {
            id: p.slug,
            name: name.en || name.it, // Fallback
            description: description?.en || description?.it || '',
            image: p.image || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
            price: p.price,
            category: p.categoryMain,
            origin: p.categorySub,
            dietary: computed?.diets?.compatible || [],
            allergens: computed?.allergens?.present || [],
            intolerances: computed?.intolerances?.present || [],
            spiciness: computed?.spice?.max_level || 0,
            calories: computed?.nutrition?.calories || 0,
            customizations: customizations,
            // Add other fields as needed mapping from DB to Frontend types
        };
    });
}
