export type FilterType = 'allergen' | 'intolerance' | 'diet';

export interface SafetyFilter {
    id: string;
    label: {
        en: string;
        it: string;
        vi: string;
    };
    type: FilterType;
    icon?: string; // Emoji or icon name
    description?: {
        en: string;
        it: string;
        vi: string;
    };
}

export const safetyFilters: SafetyFilter[] = [
    // ============================================================================
    // LEVEL 1: ALLERGENS (26 total)
    // ============================================================================
    //
    // EU 14 MANDATORY ALLERGENS (Regulation 1169/2011)
    // These are legally required to be declared in the EU
    // ----------------------------------------------------------------------------
    { id: 'gluten', label: { en: 'Gluten', it: 'Glutine', vi: 'Gluten' }, type: 'allergen', icon: '🌾' },
    { id: 'crustaceans', label: { en: 'Crustaceans', it: 'Crostacei', vi: 'Giáp xác' }, type: 'allergen', icon: '🦐' },
    { id: 'eggs', label: { en: 'Eggs', it: 'Uova', vi: 'Trứng' }, type: 'allergen', icon: '🥚' },
    { id: 'fish', label: { en: 'Fish', it: 'Pesce', vi: 'Cá' }, type: 'allergen', icon: '🐟' },
    { id: 'peanuts', label: { en: 'Peanuts', it: 'Arachidi', vi: 'Đậu phộng' }, type: 'allergen', icon: '🥜' },
    { id: 'soy', label: { en: 'Soy', it: 'Soia', vi: 'Đậu nành' }, type: 'allergen', icon: '🫘' },
    { id: 'milk', label: { en: 'Milk', it: 'Latte', vi: 'Sữa' }, type: 'allergen', icon: '🥛' },
    { id: 'nuts', label: { en: 'Tree Nuts', it: 'Frutta a guscio', vi: 'Hạt cây' }, type: 'allergen', icon: '🌰' },
    { id: 'celery', label: { en: 'Celery', it: 'Sedano', vi: 'Cần tây' }, type: 'allergen', icon: '🥬' },
    { id: 'mustard', label: { en: 'Mustard', it: 'Senape', vi: 'Mù tạt' }, type: 'allergen', icon: '🌭' },
    { id: 'sesame', label: { en: 'Sesame', it: 'Sesamo', vi: 'Mè' }, type: 'allergen', icon: '🥯' },
    { id: 'sulphites', label: { en: 'Sulphites', it: 'Solfiti', vi: 'Sunfit' }, type: 'allergen', icon: '🍷' },
    { id: 'lupin', label: { en: 'Lupin', it: 'Lupini', vi: 'Đậu lupin' }, type: 'allergen', icon: '🌸' },
    { id: 'molluscs', label: { en: 'Molluscs', it: 'Molluschi', vi: 'Nhuyễn thể' }, type: 'allergen', icon: '🐚' },

    // ASIA-SPECIFIC ALLERGENS
    // Important for Vietnamese/Asian cuisine where these are common hidden ingredients
    // ----------------------------------------------------------------------------
    { id: 'shellfish', label: { en: 'Shellfish', it: 'Frutti di mare', vi: 'Hải sản vỏ' }, type: 'allergen', icon: '🦞' },
    { id: 'squid', label: { en: 'Squid', it: 'Calamari', vi: 'Mực' }, type: 'allergen', icon: '🦑' },
    { id: 'shrimp', label: { en: 'Shrimp', it: 'Gamberetti', vi: 'Tôm' }, type: 'allergen', icon: '🍤' },
    { id: 'shrimp-paste', label: { en: 'Shrimp Paste', it: 'Pasta di Gamberetti', vi: 'Mắm tôm' }, type: 'allergen', icon: '🥣' },
    { id: 'buckwheat', label: { en: 'Buckwheat', it: 'Grano saraceno', vi: 'Kiều mạch' }, type: 'allergen', icon: '🌾' },

    // OTHER RECOGNIZED ALLERGENS
    // Medically recognized allergens not in EU14 but clinically significant
    // ----------------------------------------------------------------------------
    { id: 'peach', label: { en: 'Peach', it: 'Pesca', vi: 'Đào' }, type: 'allergen', icon: '🍑' },
    { id: 'tomato', label: { en: 'Tomato', it: 'Pomodoro', vi: 'Cà chua' }, type: 'allergen', icon: '🍅' },
    { id: 'seeds', label: { en: 'Seeds', it: 'Semi', vi: 'Hạt' }, type: 'allergen', icon: '🌻' },
    { id: 'coconut', label: { en: 'Coconut', it: 'Cocco', vi: 'Dừa' }, type: 'allergen', icon: '🥥' },
    { id: 'corn', label: { en: 'Corn', it: 'Mais', vi: 'Ngô' }, type: 'allergen', icon: '🌽' },
    { id: 'garlic', label: { en: 'Garlic', it: 'Aglio', vi: 'Tỏi' }, type: 'allergen', icon: '🧄' },
    { id: 'onion', label: { en: 'Onion', it: 'Cipolla', vi: 'Hành' }, type: 'allergen', icon: '🧅' },

    // ============================================================================
    // LEVEL 2: INTOLERANCES (10 total)
    // ============================================================================
    //
    // These are NOT immune-mediated allergies but cause digestive/other issues
    // ----------------------------------------------------------------------------
    { id: 'lactose', label: { en: 'Lactose', it: 'Lattosio', vi: 'Lactose' }, type: 'intolerance', icon: '🥛' },
    { id: 'gluten-sensitivity', label: { en: 'Gluten Sensitivity', it: 'Sensibilità al Glutine', vi: 'Nhạy cảm Gluten' }, type: 'intolerance', icon: '🍞' },
    { id: 'fodmap', label: { en: 'FODMAP', it: 'FODMAP', vi: 'FODMAP' }, type: 'intolerance', icon: '🍏' },
    { id: 'histamine', label: { en: 'Histamine', it: 'Istamina', vi: 'Histamine' }, type: 'intolerance', icon: '🧀' },
    { id: 'fructose', label: { en: 'Fructose', it: 'Fruttosio', vi: 'Fructose' }, type: 'intolerance', icon: '🍇' },
    { id: 'caffeine', label: { en: 'Caffeine', it: 'Caffeina', vi: 'Caffeine' }, type: 'intolerance', icon: '☕' },
    { id: 'alcohol', label: { en: 'Alcohol', it: 'Alcool', vi: 'Cồn' }, type: 'intolerance', icon: '🍷' },
    { id: 'msg', label: { en: 'MSG', it: 'Glutammato', vi: 'Bột ngọt' }, type: 'intolerance', icon: '🧂' },
    { id: 'sulphites-sensitivity', label: { en: 'Sulphites Sensitivity', it: 'Sensibilità Solfiti', vi: 'Nhạy cảm Sunfit' }, type: 'intolerance', icon: '🍾' },
    { id: 'spiciness', label: { en: 'Spiciness', it: 'Piccantezza', vi: 'Độ cay' }, type: 'intolerance', icon: '🌶️' },

    // ============================================================================
    // LEVEL 3: DIETS (14 total)
    // ============================================================================
    //
    // Lifestyle, religious, and health-based dietary choices
    // ----------------------------------------------------------------------------
    // LIFESTYLE DIETS
    { id: 'vegan', label: { en: 'Vegan', it: 'Vegano', vi: 'Thuần chay' }, type: 'diet', icon: '🌱' },
    { id: 'vegetarian', label: { en: 'Vegetarian', it: 'Vegetariano', vi: 'Chay' }, type: 'diet', icon: '🥗' },
    { id: 'pescatarian', label: { en: 'Pescatarian', it: 'Pescetariano', vi: 'Ăn chay + Hải sản' }, type: 'diet', icon: '🐟' },
    { id: 'raw', label: { en: 'Raw', it: 'Crudista', vi: 'Sống' }, type: 'diet', icon: '🥬' },

    // RELIGIOUS DIETS
    { id: 'halal', label: { en: 'Halal', it: 'Halal', vi: 'Halal' }, type: 'diet', icon: '🕌' },
    { id: 'kosher', label: { en: 'Kosher', it: 'Kosher', vi: 'Kosher' }, type: 'diet', icon: '✡️' },
    { id: 'buddhist', label: { en: 'Buddhist', it: 'Buddista', vi: 'Phật giáo' }, type: 'diet', icon: '☸️' },
    { id: 'pork-free', label: { en: 'Pork Free', it: 'Senza Maiale', vi: 'Không thịt heo' }, type: 'diet', icon: '🐖' },

    // HEALTH DIETS
    { id: 'gluten-free', label: { en: 'Gluten Free', it: 'Senza Glutine', vi: 'Không Gluten' }, type: 'diet', icon: '🌾' },
    { id: 'dairy-free', label: { en: 'Dairy Free', it: 'Senza Latticini', vi: 'Không sữa' }, type: 'diet', icon: '🥛' },
    { id: 'nut-free', label: { en: 'Nut Free', it: 'Senza Frutta a Guscio', vi: 'Không hạt' }, type: 'diet', icon: '🌰' },
    { id: 'low-carb', label: { en: 'Low Carb', it: 'Low Carb', vi: 'Ít tinh bột' }, type: 'diet', icon: '🥑' },
    { id: 'keto', label: { en: 'Keto', it: 'Chetogenica', vi: 'Keto' }, type: 'diet', icon: '🥓' },
    { id: 'paleo', label: { en: 'Paleo', it: 'Paleo', vi: 'Paleo' }, type: 'diet', icon: '🦴' },
];

// Helper functions
export const getFilterById = (id: string): SafetyFilter | undefined =>
    safetyFilters.find(f => f.id === id);

export const getFiltersByType = (type: FilterType): SafetyFilter[] =>
    safetyFilters.filter(f => f.type === type);

export const getAllergens = (): SafetyFilter[] => getFiltersByType('allergen');
export const getIntolerances = (): SafetyFilter[] => getFiltersByType('intolerance');
export const getDiets = (): SafetyFilter[] => getFiltersByType('diet');

// Count totals
export const FILTER_COUNTS = {
    allergens: safetyFilters.filter(f => f.type === 'allergen').length,
    intolerances: safetyFilters.filter(f => f.type === 'intolerance').length,
    diets: safetyFilters.filter(f => f.type === 'diet').length,
    total: safetyFilters.length
};
