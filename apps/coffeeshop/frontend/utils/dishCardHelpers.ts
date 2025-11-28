// Utility functions for DishCard component

/**
 * Get country flag emoji from origin string
 */
export const getOriginFlag = (origin: string): string => {
  const flags: Record<string, string> = {
    'italy': '🇮🇹',
    'vietnam': '🇻🇳',
    'france': '🇫🇷',
    'japan': '🇯🇵',
    'usa': '🇺🇸',
    'thailand': '🇹🇭',
    'korea': '🇰🇷',
    'china': '🇨🇳',
    'mexico': '🇲🇽',
    'spain': '🇪🇸',
    'india': '🇮🇳',
    'brazil': '🇧🇷'
  };
  return flags[origin.toLowerCase()] || '';
};

/**
 * Get Tailwind CSS classes for category badge color
 */
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'coffee': 'bg-amber-100 text-amber-800',
    'tea': 'bg-green-100 text-green-800',
    'pastry': 'bg-pink-100 text-pink-800',
    'breakfast': 'bg-orange-100 text-orange-800',
    'lunch': 'bg-blue-100 text-blue-800',
    'dessert': 'bg-purple-100 text-purple-800',
    'beverage': 'bg-cyan-100 text-cyan-800'
  };
  return colors[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
};
