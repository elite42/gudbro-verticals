import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ComputedFlags {
  allergens: { present: string[] };
  intolerances: { present: string[] };
  diets: { compatible: string[] };
  nutrition: { calories: number };
  spice: { max_level: number };
}

export async function computeProductFlags(ingredientIds: string[]): Promise<ComputedFlags> {
  if (!ingredientIds || ingredientIds.length === 0) {
    return {
      allergens: { present: [] },
      intolerances: { present: [] },
      diets: { compatible: [] },
      nutrition: { calories: 0 },
      spice: { max_level: 0 }
    };
  }

  const ingredients = await prisma.ingredient.findMany({
    where: { id: { in: ingredientIds } }
  });

  const allergensSet = new Set<string>();
  const intolerancesSet = new Set<string>();
  const dietsSet = new Set<string>();
  let totalCalories = 0;
  let maxSpiceLevel = 0;

  for (const ingredient of ingredients) {
    // Parse JSON fields
    const ingAllergens = ingredient.allergens ? JSON.parse(ingredient.allergens) : {};
    const ingIntolerances = ingredient.intolerances ? JSON.parse(ingredient.intolerances) : {};
    const ingDiets = ingredient.diets ? JSON.parse(ingredient.diets) : {};

    // Aggregate allergens
    if (ingAllergens.milk) allergensSet.add('allergen-milk');
    if (ingAllergens.nuts) allergensSet.add('allergen-nuts');
    if (ingAllergens.gluten) allergensSet.add('allergen-gluten');
    if (ingAllergens.soy) allergensSet.add('allergen-soy');

    // Aggregate intolerances
    if (ingIntolerances.lactose) intolerancesSet.add('intolerance-lactose');
    if (ingIntolerances.caffeine) intolerancesSet.add('intolerance-caffeine');
    if (ingIntolerances.gluten) intolerancesSet.add('intolerance-gluten');

    // Aggregate diets (intersection logic - product is compatible if ALL ingredients are compatible)
    if (ingDiets.vegan) dietsSet.add('diet-vegan');
    if (ingDiets.vegetarian) dietsSet.add('diet-vegetarian');
    if (ingDiets.glutenFree) dietsSet.add('diet-gluten-free');
    if (ingDiets.nutFree) dietsSet.add('diet-nut-free');

    // Note: For real diet compatibility, we'd need intersection logic
    // For now, we do union (if ANY ingredient supports, product supports)
    // TODO: Improve to intersection (ALL ingredients must support)
  }

  // Estimate calories (simplified - in production, use nutrition database)
  // For now, we'll return 0 as we don't have calorie data per ingredient yet
  totalCalories = 0;

  // Spiciness (simplified - in production, check ingredient properties)
  maxSpiceLevel = 0;

  return {
    allergens: { present: Array.from(allergensSet) },
    intolerances: { present: Array.from(intolerancesSet) },
    diets: { compatible: Array.from(dietsSet) },
    nutrition: { calories: totalCalories },
    spice: { max_level: maxSpiceLevel }
  };
}
