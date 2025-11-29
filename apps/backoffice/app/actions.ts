'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Initialize Prisma Client
// In a real app, use a singleton pattern to avoid multiple instances in dev
const prisma = new PrismaClient();

export async function getLocalProducts() {
    const products = await prisma.product.findMany({
        where: {
            NOT: {
                venueId: null
            }
        },
        include: {
            ingredients: {
                include: {
                    ingredient: true
                }
            }
        },
        orderBy: {
            updatedAt: 'desc'
        }
    });

    // Parse JSON fields
    return products.map(p => ({
        ...p,
        name: JSON.parse(p.name),
        description: p.description ? JSON.parse(p.description) : null,
        computed: p.computed ? JSON.parse(p.computed) : null,
        customizations: p.customizations ? JSON.parse(p.customizations) : null,
        ingredients: p.ingredients.map(pi => ({
            ...pi,
            ingredient: {
                ...pi.ingredient,
                name: JSON.parse(pi.ingredient.name)
            }
        }))
    }));
}

export async function getGlobalProducts() {
    const venueId = 'demo-venue-id';

    const products = await prisma.product.findMany({
        where: {
            venueId: null
        },
        include: {
            venueData: {
                where: {
                    venueId
                }
            }
        },
        orderBy: {
            categoryMain: 'asc'
        }
    });

    return products.map(p => {
        const venueInfo = p.venueData[0]; // Should be only one for this venue

        // Destructure to exclude venueData from the returned object
        const { venueData, ...productData } = p;

        return {
            ...productData,
            name: JSON.parse(p.name),
            description: p.description ? JSON.parse(p.description) : null,
            computed: p.computed ? JSON.parse(p.computed) : null,
            customizations: p.customizations ? JSON.parse(p.customizations) : null,
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
            // Venue specific data
            isActive: venueInfo ? venueInfo.isActive : false,
            priceOverride: venueInfo ? venueInfo.priceOverride : null,
        };
    });
}

export async function createLocalProduct(formData: FormData) {
    const nameJson = formData.get('nameJson') as string;
    const descriptionJson = formData.get('descriptionJson') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string;
    const ingredientIds = formData.get('ingredientIds') as string;
    const computed = formData.get('computed') as string;

    // Simple ID generation for demo
    const slug = JSON.parse(nameJson).en.toLowerCase().replace(/ /g, '-') + '-' + Date.now();

    const product = await prisma.product.create({
        data: {
            slug,
            name: nameJson, // Already JSON string
            description: descriptionJson, // Already JSON string
            price,
            categoryMain: category,
            venueId: 'demo-venue-id', // Hardcoded for now
            image: image || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
            computed: computed || null,
        }
    });

    // Link ingredients if provided
    if (ingredientIds) {
        const ids = ingredientIds.split(',').filter(Boolean);
        await Promise.all(
            ids.map(ingId =>
                prisma.productIngredient.create({
                    data: {
                        productId: product.id,
                        ingredientId: ingId,
                    }
                })
            )
        );
    }

    revalidatePath('/products');
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id }
    });
    revalidatePath('/products');
}

export async function updateProduct(id: string, formData: FormData) {
    const nameJson = formData.get('nameJson') as string;
    const descriptionJson = formData.get('descriptionJson') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = formData.get('image') as string;
    const ingredientIds = formData.get('ingredientIds') as string;
    const computed = formData.get('computed') as string;

    await prisma.product.update({
        where: { id },
        data: {
            name: nameJson,
            description: descriptionJson,
            price,
            categoryMain: category,
            image: image || undefined,
            computed: computed || undefined,
        }
    });

    // Update ingredients - delete existing and recreate
    await prisma.productIngredient.deleteMany({
        where: { productId: id }
    });

    if (ingredientIds) {
        const ids = ingredientIds.split(',').filter(Boolean);
        await Promise.all(
            ids.map(ingId =>
                prisma.productIngredient.create({
                    data: {
                        productId: id,
                        ingredientId: ingId,
                    }
                })
            )
        );
    }

    revalidatePath('/products');
}

export async function toggleProductActivation(productId: string, isActive: boolean) {
    const venueId = 'demo-venue-id'; // Hardcoded for now

    await prisma.venueProduct.upsert({
        where: {
            venueId_productId: {
                venueId,
                productId
            }
        },
        update: {
            isActive
        },
        create: {
            venueId,
            productId,
            isActive
        }
    });

    revalidatePath('/catalog');
}

export async function updateProductOverride(productId: string, priceOverride: number | null) {
    const venueId = 'demo-venue-id'; // Hardcoded for now

    await prisma.venueProduct.upsert({
        where: {
            venueId_productId: {
                venueId,
                productId
            }
        },
        update: {
            priceOverride
        },
        create: {
            venueId,
            productId,
            isActive: true, // Auto-activate if setting price
            priceOverride
        }
    });

    revalidatePath('/catalog');
}

export async function getIngredients() {
    const ingredients = await prisma.ingredient.findMany({
        orderBy: {
            name: 'asc'
        }
    });

    return ingredients.map(ing => ({
        ...ing,
        name: JSON.parse(ing.name),
        allergens: ing.allergens ? JSON.parse(ing.allergens) : null,
        intolerances: ing.intolerances ? JSON.parse(ing.intolerances) : null,
        diets: ing.diets ? JSON.parse(ing.diets) : null,
    }));
}

export async function computeSafetyFlags(ingredientIds: string[]) {
    const { computeProductFlags } = await import('@/../../shared/database/utils/auto-compute');
    return await computeProductFlags(ingredientIds);
}

export async function bulkToggleActivation(productIds: string[], isActive: boolean) {
    const venueId = 'demo-venue-id';

    await Promise.all(
        productIds.map(productId =>
            prisma.venueProduct.upsert({
                where: {
                    venueId_productId: {
                        venueId,
                        productId
                    }
                },
                update: {
                    isActive
                },
                create: {
                    venueId,
                    productId,
                    isActive
                }
            })
        )
    );

    revalidatePath('/catalog');
}
