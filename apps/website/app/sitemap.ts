import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gudbro-website.vercel.app';

  // Static pages
  const staticPages = [
    '',
    '/sign-in',
    '/sign-up',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/demo',
    '/faq',
    '/about',
    '/solutions/restaurants',
    '/solutions/hotels',
    '/solutions/airbnb',
    '/solutions/food-trucks',
    '/recipes',
    '/ingredients',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route === '/recipes' || route === '/ingredients' ? 0.9 : 0.8,
  }));

  // Recipe and Ingredient pages will be generated dynamically from Supabase
  // For now, we include sample pages that exist
  const contentPages = [
    { url: '/recipes/spaghetti-carbonara', priority: 0.7 },
    { url: '/ingredients/parmesan-cheese', priority: 0.7 },
  ];

  const contentRoutes = contentPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.priority,
  }));

  // TODO: When connected to Supabase, fetch all recipes and ingredients
  // const recipes = await getRecipes();
  // const recipeRoutes = recipes.map((recipe) => ({
  //   url: `${baseUrl}/recipes/${recipe.slug}`,
  //   lastModified: recipe.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));
  //
  // const ingredients = await getIngredients();
  // const ingredientRoutes = ingredients.map((ingredient) => ({
  //   url: `${baseUrl}/ingredients/${ingredient.slug}`,
  //   lastModified: ingredient.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticRoutes,
    ...contentRoutes,
  ];
}
