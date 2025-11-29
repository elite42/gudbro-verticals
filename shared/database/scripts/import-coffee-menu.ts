import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const JSON_PATH = path.join(__dirname, '../coffee_recipes.json');

async function main() {
    console.log('☕ Starting Coffee Menu Import...');

    if (!fs.existsSync(JSON_PATH)) {
        console.error(`❌ File not found: ${JSON_PATH}`);
        process.exit(1);
    }

    const rawData = fs.readFileSync(JSON_PATH, 'utf-8');
    const data = JSON.parse(rawData);
    const recipes = data.Sheet1;

    console.log(`Found ${recipes.length} recipes to import.`);

    // Ensure Venue exists
    const venueId = 'demo-venue-id';
    const venue = await prisma.venue.upsert({
        where: { id: venueId },
        update: {},
        create: {
            id: venueId,
            name: 'Demo Coffeeshop',
            slug: 'demo-coffeeshop',
        }
    });
    console.log(`✅ Venue ensured: ${venue.name} (${venue.id})`);

    for (const recipe of recipes) {
        const slug = recipe['Product Name'].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        // Map Category
        let categoryMain = 'coffee';
        const catLower = recipe['Category'].toLowerCase();
        if (catLower.includes('tea') || catLower.includes('matcha')) categoryMain = 'tea';
        else if (catLower.includes('smoothie')) categoryMain = 'smoothie';
        else if (catLower.includes('milkshake')) categoryMain = 'beverage'; // or dessert?

        // Construct Description
        const description = {
            en: `${recipe['Main Ingredients']}. ${recipe['Notes'] || ''}`,
            it: `${recipe['Main Ingredients']}. ${recipe['Notes'] || ''}` // Placeholder translation
        };

        // Construct Computed Data (Ingredients/Allergens placeholder)
        const computed = {
            allergens: { present: [], traces: [] },
            diets: { compatible: [], incompatible: [] },
            nutrition: { calories: 0 } // Placeholder
        };

        // Construct Customizations (Serving info)
        const customizations = {
            serving: {
                glass: recipe['Serving Glass / Cup Type'],
                decoration: recipe['Premium Style Decoration']
            },
            preparation: {
                method: recipe['Preparation Method'],
                time: recipe['Prep Time (sec)'],
                skill: recipe['Skill Level (1–3)']
            }
        };

        console.log(`Importing: ${recipe['Product Name']} (${slug})`);

        await prisma.product.upsert({
            where: { slug },
            update: {
                name: JSON.stringify({ en: recipe['Product Name'], it: recipe['Product Name'] }),
                description: JSON.stringify(description),
                price: recipe['Selling Price (USD)'],
                currency: 'USD', // Keeping original currency from JSON
                categoryMain,
                categorySub: recipe['Category'].toLowerCase(),
                venueId: null, // Global product
                image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop', // Generic placeholder
                computed: JSON.stringify(computed),
                customizations: JSON.stringify(customizations),
            },
            create: {
                slug,
                name: JSON.stringify({ en: recipe['Product Name'], it: recipe['Product Name'] }),
                description: JSON.stringify(description),
                price: recipe['Selling Price (USD)'],
                currency: 'USD',
                categoryMain,
                categorySub: recipe['Category'].toLowerCase(),
                venueId: null, // Global product
                image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
                computed: JSON.stringify(computed),
                customizations: JSON.stringify(customizations),
            }
        });

        // Auto-activate for demo venue
        await prisma.venueProduct.upsert({
            where: {
                venueId_productId: {
                    venueId: 'demo-venue-id',
                    productId: (await prisma.product.findUnique({ where: { slug } }))!.id
                }
            },
            update: {},
            create: {
                venueId: 'demo-venue-id',
                productId: (await prisma.product.findUnique({ where: { slug } }))!.id,
                isActive: true
            }
        });

        // Parse and Link Ingredients
        const ingredientNames = recipe['Main Ingredients'].split(',').map((s: string) => s.trim());
        const product = await prisma.product.findUnique({ where: { slug } });

        if (product) {
            // Clear existing links
            await prisma.productIngredient.deleteMany({ where: { productId: product.id } });

            const linkedIngredients = [];
            let totalCalories = 0;
            let maxSpiceLevel = 0;

            for (const name of ingredientNames) {
                const ingSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

                // --- 1. ALLERGENS & INTOLERANCES DETECTION ---
                const isMilk = ingSlug.includes('milk') || ingSlug.includes('cream') || ingSlug.includes('cheese') || ingSlug.includes('yogurt') || ingSlug.includes('latte');
                const isNut = ingSlug.includes('nut') || ingSlug.includes('almond') || ingSlug.includes('hazelnut') || ingSlug.includes('peanut') || ingSlug.includes('pistachio');
                const isGluten = ingSlug.includes('cookie') || ingSlug.includes('oreo') || ingSlug.includes('wafer') || ingSlug.includes('biscuit') || ingSlug.includes('bread');
                const isSoy = ingSlug.includes('soy');
                const isCaffeine = ingSlug.includes('coffee') || ingSlug.includes('espresso') || ingSlug.includes('matcha') || ingSlug.includes('tea') && !ingSlug.includes('herbal');

                // --- 2. CALORIES ESTIMATION (Per Ingredient) ---
                let calories = 0;
                if (ingSlug.includes('sugar') || ingSlug.includes('syrup')) calories = 50;
                else if (ingSlug.includes('milk') || ingSlug.includes('cream')) calories = 80;
                else if (ingSlug.includes('cookie') || ingSlug.includes('oreo')) calories = 100;
                else if (ingSlug.includes('fruit') || ingSlug.includes('berry')) calories = 30;
                else if (ingSlug.includes('coffee') || ingSlug.includes('espresso')) calories = 5;
                else if (ingSlug.includes('chocolate') || ingSlug.includes('cocoa')) calories = 70;
                else calories = 10; // Default low calorie for water/ice/herbs

                totalCalories += calories;

                // --- 3. SPICINESS DETECTION ---
                let spiceLevel = 0;
                if (ingSlug.includes('chili') || ingSlug.includes('jalapeno')) spiceLevel = 3;
                else if (ingSlug.includes('ginger') || ingSlug.includes('cinnamon') || ingSlug.includes('spice')) spiceLevel = 1;

                if (spiceLevel > maxSpiceLevel) maxSpiceLevel = spiceLevel;

                // Build Flags
                const allergens: { present: string[], traces: string[] } = { present: [], traces: [] };
                if (isMilk) allergens.present.push('milk');
                if (isNut) allergens.present.push('nuts');
                if (isGluten) allergens.present.push('gluten');
                if (isSoy) allergens.present.push('soy');

                const intolerances: { present: string[] } = { present: [] };
                if (isMilk) intolerances.present.push('lactose');
                if (isGluten) intolerances.present.push('gluten-sensitivity');
                if (isCaffeine) intolerances.present.push('caffeine');

                const diets: { compatible: string[], incompatible: string[] } = { compatible: ['vegetarian'], incompatible: [] };
                if (isMilk) diets.incompatible.push('vegan', 'lactose-free', 'dairy-free');
                if (isGluten) diets.incompatible.push('gluten-free');
                if (isNut) diets.incompatible.push('nut-free');
                if (!isMilk && !isGluten && !isNut) diets.compatible.push('vegan', 'gluten-free', 'lactose-free', 'nut-free');

                const ingredient = await prisma.ingredient.upsert({
                    where: { slug: ingSlug },
                    update: {
                        allergens: JSON.stringify(allergens),
                        intolerances: JSON.stringify(intolerances),
                        diets: JSON.stringify(diets),
                        // We could store calories/spice on ingredient too, but for now we compute product total
                    },
                    create: {
                        slug: ingSlug,
                        name: JSON.stringify({ en: name, it: name }),
                        allergens: JSON.stringify(allergens),
                        intolerances: JSON.stringify(intolerances),
                        diets: JSON.stringify(diets)
                    }
                });

                await prisma.productIngredient.create({
                    data: {
                        productId: product.id,
                        ingredientId: ingredient.id,
                        quantity: 1,
                        unit: 'serving'
                    }
                });

                linkedIngredients.push(ingredient);
            }

            // --- 4. AGGREGATE PRODUCT FLAGS ---
            const computedAllergens = new Set<string>();
            const computedIntolerances = new Set<string>();
            const compatibleDiets = new Set(['vegan', 'vegetarian', 'gluten-free', 'lactose-free', 'nut-free', 'dairy-free']);

            for (const ing of linkedIngredients) {
                const a = JSON.parse(ing.allergens as string);
                a.present?.forEach((x: string) => computedAllergens.add(x));

                const i = JSON.parse(ing.intolerances as string);
                i.present?.forEach((x: string) => computedIntolerances.add(x));

                const d = JSON.parse(ing.diets as string);
                d.incompatible?.forEach((x: string) => compatibleDiets.delete(x));
            }

            const computedResult = {
                allergens: { present: Array.from(computedAllergens), traces: [] },
                intolerances: { present: Array.from(computedIntolerances) },
                diets: { compatible: Array.from(compatibleDiets), incompatible: [] },
                nutrition: { calories: totalCalories },
                spice: { max_level: maxSpiceLevel }
            };

            await prisma.product.update({
                where: { id: product.id },
                data: { computed: JSON.stringify(computedResult) }
            });
        }
    }

    console.log('✅ Import completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
