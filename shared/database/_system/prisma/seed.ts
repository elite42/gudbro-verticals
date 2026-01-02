import { PrismaClient } from '@prisma/client';
import { rootsProducts } from '../products/roots-products';
import { allIngredients as ingredientsList } from '../index';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding ...');

    // 1. Seed Ingredients
    console.log('Seeding ingredients...');
    for (const ing of ingredientsList) {
        const existing = await prisma.ingredient.findUnique({ where: { slug: ing.slug } });
        if (!existing) {
            await prisma.ingredient.create({
                data: {
                    slug: ing.slug,
                    name: JSON.stringify(ing.name),
                    allergens: JSON.stringify(ing.allergens),
                    intolerances: JSON.stringify(ing.intolerances),
                    diets: JSON.stringify(ing.dietary_restrictions),
                },
            });
        }
    }

    // 2. Seed Products (Global Catalog)
    console.log('Seeding products...');
    for (const product of rootsProducts) {
        const existing = await prisma.product.findUnique({ where: { slug: product.slug } });
        if (!existing) {
            // Create product
            const dbProduct = await prisma.product.create({
                data: {
                    slug: product.slug,
                    name: JSON.stringify(product.name),
                    description: product.description ? JSON.stringify(product.description) : null,
                    image: product.media.images.thumbnail,
                    price: product.pricing?.selling_price_local?.amount || 0,
                    currency: product.pricing?.selling_price_local?.currency || 'VND',
                    categoryMain: product.category.main,
                    categorySub: product.category.sub,
                    venueId: null, // Global product
                    computed: product.computed ? JSON.stringify(product.computed) : null,
                    customizations: product.customizations ? JSON.stringify(product.customizations) : null,
                },
            });

            // Link ingredients
            for (const prodIng of product.ingredients) {
                const dbIng = await prisma.ingredient.findUnique({
                    where: { slug: prodIng.ingredient_id.toLowerCase().replace(/_/g, '-') }, // Try to match slug?
                    // Wait, the ingredient_id in product might not match slug directly.
                    // Let's check how they link.
                    // In `roots-menu.ts`: `allIngredients.find(ing => ing.id === prodIngredient.ingredient_id)`
                    // So we need to match by ID, not slug.
                });

                // Actually, let's find by ID first.
                // But our schema uses UUID for ID.
                // We should probably store the original ID as slug or a separate field "originalId" to map them.
                // Or just look up the ingredient by its original ID in the list to get its slug, then find in DB.

                const originalIng = ingredientsList.find(i => i.id === prodIng.ingredient_id);
                if (originalIng) {
                    const dbIngredient = await prisma.ingredient.findUnique({ where: { slug: originalIng.slug } });
                    if (dbIngredient) {
                        await prisma.productIngredient.create({
                            data: {
                                productId: dbProduct.id,
                                ingredientId: dbIngredient.id,
                                quantity: prodIng.quantity?.amount,
                                unit: prodIng.quantity?.unit,
                                optional: prodIng.optional || false,
                            }
                        });
                    }
                }
            }
        }
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
