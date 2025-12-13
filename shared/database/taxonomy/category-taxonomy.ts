/**
 * GUDBRO Centralized Database - Category Taxonomy
 *
 * Professional hierarchical classification system for food and beverages.
 * Based on industry standards:
 * - IIFRP RFC #5 Food Taxonomy
 * - Court of Master Sommeliers wine regions
 * - BJCP Beer Style Guidelines
 * - IBA Cocktail Classifications
 *
 * Structure: Domain → Category → Subcategory → Type → Variety
 *
 * @version 2.0
 * @lastUpdated 2025-12-13
 *
 * Sources:
 * - https://iifrp.org/rfc/RFC-5.html
 * - https://www.mastersommeliers.org
 * - https://www.bjcp.org/beer-styles/beer-style-guidelines/
 * - https://www.diffordsguide.com/encyclopedia/1989/cocktails/cocktail-categories/families
 */

import type { MultiLangText } from '../types';

// ============================================================================
// DOMAIN LEVEL - Top Level Classification
// ============================================================================

export type Domain = 'food' | 'beverage' | 'condiment';

export interface DomainInfo {
  id: Domain;
  name: MultiLangText;
  icon: string;
  description: MultiLangText;
}

export const domains: Record<Domain, DomainInfo> = {
  food: {
    id: 'food',
    name: { en: 'Food', it: 'Cibo', vi: 'Thức ăn' },
    icon: '🍽️',
    description: {
      en: 'Dishes, meals, and food items',
      it: 'Piatti, pasti e alimenti',
      vi: 'Món ăn, bữa ăn và thực phẩm',
    },
  },
  beverage: {
    id: 'beverage',
    name: { en: 'Beverage', it: 'Bevanda', vi: 'Đồ uống' },
    icon: '🍹',
    description: {
      en: 'Drinks, both alcoholic and non-alcoholic',
      it: 'Bevande, alcoliche e analcoliche',
      vi: 'Đồ uống, có cồn và không cồn',
    },
  },
  condiment: {
    id: 'condiment',
    name: { en: 'Condiment', it: 'Condimento', vi: 'Gia vị' },
    icon: '🧂',
    description: {
      en: 'Sauces, seasonings, and accompaniments',
      it: 'Salse, condimenti e accompagnamenti',
      vi: 'Nước sốt, gia vị và đồ ăn kèm',
    },
  },
};

// ============================================================================
// FOOD TAXONOMY
// ============================================================================

export interface FoodCategory {
  id: string;
  domain: 'food';
  name: MultiLangText;
  icon: string;
  subcategories: FoodSubcategory[];
}

export interface FoodSubcategory {
  id: string;
  name: MultiLangText;
  types?: FoodType[];
}

export interface FoodType {
  id: string;
  name: MultiLangText;
  varieties?: string[];
}

export const foodCategories: FoodCategory[] = [
  // -------------------------------------------------------------------------
  // COURSE-BASED CATEGORIES (Restaurant Menu Structure)
  // -------------------------------------------------------------------------
  {
    id: 'antipasti',
    domain: 'food',
    name: { en: 'Appetizers', it: 'Antipasti', vi: 'Khai vị' },
    icon: '🥗',
    subcategories: [
      {
        id: 'cold-appetizers',
        name: { en: 'Cold Appetizers', it: 'Antipasti Freddi', vi: 'Khai vị lạnh' },
        types: [
          { id: 'salads', name: { en: 'Salads', it: 'Insalate', vi: 'Salad' } },
          { id: 'carpaccio', name: { en: 'Carpaccio', it: 'Carpaccio', vi: 'Carpaccio' } },
          { id: 'ceviche', name: { en: 'Ceviche', it: 'Ceviche', vi: 'Ceviche' } },
          { id: 'tartare', name: { en: 'Tartare', it: 'Tartare', vi: 'Tartare' } },
          { id: 'bruschetta', name: { en: 'Bruschetta', it: 'Bruschetta', vi: 'Bruschetta' } },
        ],
      },
      {
        id: 'hot-appetizers',
        name: { en: 'Hot Appetizers', it: 'Antipasti Caldi', vi: 'Khai vị nóng' },
        types: [
          { id: 'fried', name: { en: 'Fried', it: 'Fritti', vi: 'Chiên' } },
          { id: 'baked', name: { en: 'Baked', it: 'Al forno', vi: 'Nướng' } },
          { id: 'grilled', name: { en: 'Grilled', it: 'Alla griglia', vi: 'Nướng than' } },
          { id: 'steamed', name: { en: 'Steamed', it: 'Al vapore', vi: 'Hấp' } },
        ],
      },
      {
        id: 'dips-spreads',
        name: { en: 'Dips & Spreads', it: 'Salse e Creme', vi: 'Nước chấm' },
        types: [
          { id: 'hummus', name: { en: 'Hummus', it: 'Hummus', vi: 'Hummus' } },
          { id: 'guacamole', name: { en: 'Guacamole', it: 'Guacamole', vi: 'Guacamole' } },
          { id: 'baba-ganoush', name: { en: 'Baba Ganoush', it: 'Baba Ganoush', vi: 'Baba Ganoush' } },
        ],
      },
    ],
  },
  {
    id: 'primi',
    domain: 'food',
    name: { en: 'First Courses', it: 'Primi Piatti', vi: 'Món đầu tiên' },
    icon: '🍝',
    subcategories: [
      {
        id: 'pasta',
        name: { en: 'Pasta', it: 'Pasta', vi: 'Mì Ý' },
        types: [
          { id: 'long-pasta', name: { en: 'Long Pasta', it: 'Pasta Lunga', vi: 'Mì dài' }, varieties: ['spaghetti', 'linguine', 'fettuccine', 'tagliatelle', 'pappardelle', 'bucatini'] },
          { id: 'short-pasta', name: { en: 'Short Pasta', it: 'Pasta Corta', vi: 'Mì ngắn' }, varieties: ['penne', 'rigatoni', 'fusilli', 'farfalle', 'orecchiette', 'paccheri'] },
          { id: 'filled-pasta', name: { en: 'Filled Pasta', it: 'Pasta Ripiena', vi: 'Mì nhân' }, varieties: ['ravioli', 'tortellini', 'agnolotti', 'cappelletti', 'cannelloni'] },
          { id: 'baked-pasta', name: { en: 'Baked Pasta', it: 'Pasta al Forno', vi: 'Mì nướng' }, varieties: ['lasagna', 'timballo', 'pasticcio'] },
        ],
      },
      {
        id: 'risotto',
        name: { en: 'Risotto', it: 'Risotto', vi: 'Cơm Ý' },
        types: [
          { id: 'classic-risotto', name: { en: 'Classic Risotto', it: 'Risotto Classico', vi: 'Risotto cổ điển' } },
          { id: 'seafood-risotto', name: { en: 'Seafood Risotto', it: 'Risotto ai Frutti di Mare', vi: 'Risotto hải sản' } },
          { id: 'vegetable-risotto', name: { en: 'Vegetable Risotto', it: 'Risotto alle Verdure', vi: 'Risotto rau' } },
        ],
      },
      {
        id: 'soup',
        name: { en: 'Soups', it: 'Zuppe e Minestre', vi: 'Súp' },
        types: [
          { id: 'broth-based', name: { en: 'Broth-Based', it: 'A Base di Brodo', vi: 'Súp nước dùng' } },
          { id: 'cream-based', name: { en: 'Cream-Based', it: 'Vellutate', vi: 'Súp kem' } },
          { id: 'noodle-soup', name: { en: 'Noodle Soup', it: 'Zuppa di Noodle', vi: 'Phở/Mì nước' } },
        ],
      },
      {
        id: 'noodles-asian',
        name: { en: 'Asian Noodles', it: 'Noodle Asiatici', vi: 'Mì châu Á' },
        types: [
          { id: 'ramen', name: { en: 'Ramen', it: 'Ramen', vi: 'Mì Ramen' } },
          { id: 'pho', name: { en: 'Phở', it: 'Phở', vi: 'Phở' } },
          { id: 'pad-thai', name: { en: 'Pad Thai', it: 'Pad Thai', vi: 'Pad Thai' } },
          { id: 'udon', name: { en: 'Udon', it: 'Udon', vi: 'Mì Udon' } },
          { id: 'soba', name: { en: 'Soba', it: 'Soba', vi: 'Mì Soba' } },
          { id: 'bun', name: { en: 'Bún (Rice Vermicelli)', it: 'Bún', vi: 'Bún' } },
        ],
      },
    ],
  },
  {
    id: 'secondi',
    domain: 'food',
    name: { en: 'Main Courses', it: 'Secondi Piatti', vi: 'Món chính' },
    icon: '🥩',
    subcategories: [
      {
        id: 'meat',
        name: { en: 'Meat', it: 'Carne', vi: 'Thịt' },
        types: [
          { id: 'beef', name: { en: 'Beef', it: 'Manzo', vi: 'Bò' }, varieties: ['steak', 'roast', 'braised', 'grilled', 'tartare'] },
          { id: 'pork', name: { en: 'Pork', it: 'Maiale', vi: 'Heo' }, varieties: ['chops', 'roast', 'belly', 'tenderloin', 'ribs'] },
          { id: 'lamb', name: { en: 'Lamb', it: 'Agnello', vi: 'Cừu' }, varieties: ['chops', 'rack', 'leg', 'shoulder', 'shank'] },
          { id: 'veal', name: { en: 'Veal', it: 'Vitello', vi: 'Bê' }, varieties: ['scaloppine', 'ossobuco', 'milanese'] },
          { id: 'game', name: { en: 'Game', it: 'Selvaggina', vi: 'Thịt rừng' }, varieties: ['venison', 'wild-boar', 'rabbit', 'duck'] },
        ],
      },
      {
        id: 'poultry',
        name: { en: 'Poultry', it: 'Pollame', vi: 'Gia cầm' },
        types: [
          { id: 'chicken', name: { en: 'Chicken', it: 'Pollo', vi: 'Gà' } },
          { id: 'duck', name: { en: 'Duck', it: 'Anatra', vi: 'Vịt' } },
          { id: 'turkey', name: { en: 'Turkey', it: 'Tacchino', vi: 'Gà tây' } },
          { id: 'quail', name: { en: 'Quail', it: 'Quaglia', vi: 'Chim cút' } },
        ],
      },
      {
        id: 'seafood',
        name: { en: 'Seafood', it: 'Pesce e Frutti di Mare', vi: 'Hải sản' },
        types: [
          { id: 'fish', name: { en: 'Fish', it: 'Pesce', vi: 'Cá' }, varieties: ['salmon', 'tuna', 'sea-bass', 'cod', 'snapper', 'trout'] },
          { id: 'shellfish', name: { en: 'Shellfish', it: 'Crostacei', vi: 'Giáp xác' }, varieties: ['lobster', 'crab', 'shrimp', 'prawns'] },
          { id: 'mollusks', name: { en: 'Mollusks', it: 'Molluschi', vi: 'Nhuyễn thể' }, varieties: ['mussels', 'clams', 'oysters', 'scallops', 'squid', 'octopus'] },
        ],
      },
    ],
  },
  {
    id: 'contorni',
    domain: 'food',
    name: { en: 'Side Dishes', it: 'Contorni', vi: 'Món phụ' },
    icon: '🥦',
    subcategories: [
      {
        id: 'vegetables',
        name: { en: 'Vegetables', it: 'Verdure', vi: 'Rau' },
        types: [
          { id: 'roasted', name: { en: 'Roasted', it: 'Arrosto', vi: 'Nướng' } },
          { id: 'grilled', name: { en: 'Grilled', it: 'Grigliati', vi: 'Nướng than' } },
          { id: 'sauteed', name: { en: 'Sautéed', it: 'Saltati', vi: 'Xào' } },
          { id: 'steamed', name: { en: 'Steamed', it: 'Al vapore', vi: 'Hấp' } },
        ],
      },
      {
        id: 'starches',
        name: { en: 'Starches', it: 'Amidi', vi: 'Tinh bột' },
        types: [
          { id: 'potatoes', name: { en: 'Potatoes', it: 'Patate', vi: 'Khoai tây' }, varieties: ['mashed', 'roasted', 'fries', 'gratin', 'baked'] },
          { id: 'rice', name: { en: 'Rice', it: 'Riso', vi: 'Cơm' } },
          { id: 'grains', name: { en: 'Grains', it: 'Cereali', vi: 'Ngũ cốc' }, varieties: ['quinoa', 'couscous', 'farro', 'polenta'] },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // INSALATE - Dedicated category for salads (healthy, fresh, trendy)
  // -------------------------------------------------------------------------
  {
    id: 'insalate',
    domain: 'food',
    name: { en: 'Salads', it: 'Insalate', vi: 'Salad' },
    icon: '🥗',
    subcategories: [
      {
        id: 'insalate-classiche',
        name: { en: 'Classic Salads', it: 'Insalate Classiche', vi: 'Salad Cổ Điển' },
        types: [
          { id: 'caesar', name: { en: 'Caesar Salad', it: 'Insalata Caesar', vi: 'Salad Caesar' }, varieties: ['classic', 'chicken', 'shrimp', 'salmon', 'vegan'] },
          { id: 'greek', name: { en: 'Greek Salad', it: 'Insalata Greca', vi: 'Salad Hy Lạp' }, varieties: ['classic', 'with-chicken', 'with-feta'] },
          { id: 'caprese', name: { en: 'Caprese', it: 'Caprese', vi: 'Salad Caprese' }, varieties: ['classic', 'burrata', 'stracciatella'] },
          { id: 'nicoise', name: { en: 'Niçoise', it: 'Nizzarda', vi: 'Salad Niçoise' }, varieties: ['tuna', 'salmon', 'vegetarian'] },
          { id: 'waldorf', name: { en: 'Waldorf', it: 'Waldorf', vi: 'Salad Waldorf' } },
          { id: 'cobb', name: { en: 'Cobb Salad', it: 'Insalata Cobb', vi: 'Salad Cobb' } },
          { id: 'garden', name: { en: 'Garden Salad', it: 'Insalata Mista', vi: 'Salad Vườn' } },
        ],
      },
      {
        id: 'insalate-proteiche',
        name: { en: 'Protein Salads', it: 'Insalate Proteiche', vi: 'Salad Giàu Protein' },
        types: [
          { id: 'chicken-salad', name: { en: 'Chicken Salad', it: 'Insalata di Pollo', vi: 'Salad Gà' }, varieties: ['grilled', 'crispy', 'teriyaki', 'buffalo', 'caesar'] },
          { id: 'tuna-salad', name: { en: 'Tuna Salad', it: 'Insalata di Tonno', vi: 'Salad Cá Ngừ' }, varieties: ['seared', 'canned', 'tataki'] },
          { id: 'salmon-salad', name: { en: 'Salmon Salad', it: 'Insalata di Salmone', vi: 'Salad Cá Hồi' }, varieties: ['smoked', 'grilled', 'poached', 'gravlax'] },
          { id: 'shrimp-salad', name: { en: 'Shrimp Salad', it: 'Insalata di Gamberi', vi: 'Salad Tôm' }, varieties: ['grilled', 'poached', 'coconut'] },
          { id: 'steak-salad', name: { en: 'Steak Salad', it: 'Insalata con Tagliata', vi: 'Salad Bò' }, varieties: ['ribeye', 'flank', 'sirloin'] },
          { id: 'egg-salad', name: { en: 'Egg Salad', it: 'Insalata di Uova', vi: 'Salad Trứng' }, varieties: ['classic', 'deviled', 'soft-boiled'] },
          { id: 'tofu-salad', name: { en: 'Tofu Salad', it: 'Insalata di Tofu', vi: 'Salad Đậu Phụ' }, varieties: ['crispy', 'marinated', 'smoked'] },
        ],
      },
      {
        id: 'insalate-grano',
        name: { en: 'Grain Salads', it: 'Insalate di Cereali', vi: 'Salad Ngũ Cốc' },
        types: [
          { id: 'quinoa-salad', name: { en: 'Quinoa Salad', it: 'Insalata di Quinoa', vi: 'Salad Quinoa' }, varieties: ['mediterranean', 'southwest', 'asian', 'roasted-vegetable'] },
          { id: 'farro-salad', name: { en: 'Farro Salad', it: 'Insalata di Farro', vi: 'Salad Farro' }, varieties: ['tuscan', 'roasted-beet', 'herb'] },
          { id: 'couscous-salad', name: { en: 'Couscous Salad', it: 'Insalata di Couscous', vi: 'Salad Couscous' }, varieties: ['moroccan', 'israeli', 'mediterranean'] },
          { id: 'bulgur-salad', name: { en: 'Bulgur Salad', it: 'Insalata di Bulgur', vi: 'Salad Bulgur' }, varieties: ['tabbouleh', 'kisir'] },
          { id: 'rice-salad', name: { en: 'Rice Salad', it: 'Insalata di Riso', vi: 'Salad Cơm' }, varieties: ['wild-rice', 'brown-rice', 'sushi-rice'] },
          { id: 'orzo-salad', name: { en: 'Orzo Salad', it: 'Insalata di Orzo', vi: 'Salad Orzo' }, varieties: ['greek', 'lemon-herb', 'mediterranean'] },
          { id: 'pasta-salad', name: { en: 'Pasta Salad', it: 'Insalata di Pasta', vi: 'Salad Mì Ý' }, varieties: ['italian', 'pesto', 'caprese', 'southwestern'] },
        ],
      },
      {
        id: 'insalate-internazionali',
        name: { en: 'International Salads', it: 'Insalate Internazionali', vi: 'Salad Quốc Tế' },
        types: [
          { id: 'asian-salad', name: { en: 'Asian Salad', it: 'Insalata Asiatica', vi: 'Salad Châu Á' }, varieties: ['thai', 'vietnamese', 'japanese', 'chinese', 'korean'] },
          { id: 'fattoush', name: { en: 'Fattoush', it: 'Fattoush', vi: 'Salad Fattoush' } },
          { id: 'israeli-salad', name: { en: 'Israeli Salad', it: 'Insalata Israeliana', vi: 'Salad Israel' } },
          { id: 'larb', name: { en: 'Larb', it: 'Larb', vi: 'Larb' }, varieties: ['chicken', 'pork', 'beef', 'tofu'] },
          { id: 'som-tam', name: { en: 'Som Tam (Papaya)', it: 'Som Tam (Papaya)', vi: 'Gỏi Đu Đủ' }, varieties: ['thai', 'lao', 'with-crab'] },
          { id: 'goi-cuon', name: { en: 'Gỏi (Vietnamese)', it: 'Gỏi Vietnamita', vi: 'Gỏi' }, varieties: ['goi-ga', 'goi-bo', 'goi-tom', 'goi-buoi'] },
          { id: 'panzanella', name: { en: 'Panzanella', it: 'Panzanella', vi: 'Salad Panzanella' } },
          { id: 'tabbouleh', name: { en: 'Tabbouleh', it: 'Tabbouleh', vi: 'Tabbouleh' } },
        ],
      },
      {
        id: 'insalate-vegane',
        name: { en: 'Vegan Salads', it: 'Insalate Vegane', vi: 'Salad Thuần Chay' },
        types: [
          { id: 'kale-salad', name: { en: 'Kale Salad', it: 'Insalata di Cavolo Riccio', vi: 'Salad Cải Xoăn' }, varieties: ['massaged', 'raw', 'tuscan'] },
          { id: 'buddha-bowl', name: { en: 'Buddha Bowl', it: 'Buddha Bowl', vi: 'Buddha Bowl' }, varieties: ['mediterranean', 'asian', 'mexican', 'middle-eastern'] },
          { id: 'rainbow-salad', name: { en: 'Rainbow Salad', it: 'Insalata Arcobaleno', vi: 'Salad Cầu Vồng' } },
          { id: 'superfood-salad', name: { en: 'Superfood Salad', it: 'Insalata Superfood', vi: 'Salad Siêu Thực Phẩm' }, varieties: ['acai', 'goji', 'spirulina', 'hemp'] },
          { id: 'roasted-veggie', name: { en: 'Roasted Vegetable Salad', it: 'Insalata di Verdure Arrosto', vi: 'Salad Rau Nướng' } },
          { id: 'raw-salad', name: { en: 'Raw Salad', it: 'Insalata Cruda', vi: 'Salad Sống' }, varieties: ['zucchini-noodle', 'carrot-ribbon', 'beet-carpaccio'] },
        ],
      },
      {
        id: 'insalate-frutta',
        name: { en: 'Fruit Salads', it: 'Insalate di Frutta', vi: 'Salad Trái Cây' },
        types: [
          { id: 'tropical-fruit', name: { en: 'Tropical Fruit Salad', it: 'Macedonia Tropicale', vi: 'Salad Trái Cây Nhiệt Đới' }, varieties: ['mango', 'papaya', 'pineapple', 'coconut'] },
          { id: 'berry-salad', name: { en: 'Berry Salad', it: 'Insalata di Frutti di Bosco', vi: 'Salad Quả Mọng' } },
          { id: 'citrus-salad', name: { en: 'Citrus Salad', it: 'Insalata di Agrumi', vi: 'Salad Cam Quýt' } },
          { id: 'melon-salad', name: { en: 'Melon Salad', it: 'Insalata di Melone', vi: 'Salad Dưa' }, varieties: ['watermelon-feta', 'cantaloupe', 'honeydew'] },
          { id: 'apple-walnut', name: { en: 'Apple Walnut Salad', it: 'Insalata Mela e Noci', vi: 'Salad Táo Óc Chó' } },
          { id: 'pear-gorgonzola', name: { en: 'Pear & Gorgonzola', it: 'Pere e Gorgonzola', vi: 'Salad Lê Phô Mai Xanh' } },
        ],
      },
      {
        id: 'condimenti-insalata',
        name: { en: 'Salad Dressings', it: 'Condimenti per Insalate', vi: 'Nước Sốt Salad' },
        types: [
          { id: 'vinaigrette', name: { en: 'Vinaigrette', it: 'Vinaigrette', vi: 'Sốt Vinaigrette' }, varieties: ['balsamic', 'red-wine', 'lemon', 'honey-mustard', 'shallot'] },
          { id: 'creamy-dressing', name: { en: 'Creamy Dressings', it: 'Condimenti Cremosi', vi: 'Sốt Kem' }, varieties: ['ranch', 'blue-cheese', 'caesar', 'thousand-island', 'green-goddess'] },
          { id: 'asian-dressing', name: { en: 'Asian Dressings', it: 'Condimenti Asiatici', vi: 'Sốt Châu Á' }, varieties: ['sesame', 'ginger', 'miso', 'peanut', 'ponzu'] },
          { id: 'mediterranean-dressing', name: { en: 'Mediterranean', it: 'Mediterranei', vi: 'Sốt Địa Trung Hải' }, varieties: ['tahini', 'lemon-herb', 'greek', 'feta'] },
          { id: 'oil-based', name: { en: 'Oil-Based', it: 'A Base di Olio', vi: 'Sốt Dầu' }, varieties: ['evoo', 'truffle-oil', 'walnut-oil', 'avocado-oil'] },
        ],
      },
    ],
  },
  {
    id: 'piatti-unici',
    domain: 'food',
    name: { en: 'One-Dish Meals', it: 'Piatti Unici', vi: 'Món đơn' },
    icon: '🍱',
    subcategories: [
      // -------------------------------------------------------------------------
      // BURGER - Dedicated category for hamburger restaurants
      // -------------------------------------------------------------------------
      {
        id: 'burger',
        name: { en: 'Burgers', it: 'Hamburger', vi: 'Burger' },
        types: [
          { id: 'smash-burger', name: { en: 'Smash Burger', it: 'Smash Burger', vi: 'Smash Burger' }, varieties: ['single', 'double', 'triple'] },
          { id: 'gourmet-burger', name: { en: 'Gourmet Burger', it: 'Burger Gourmet', vi: 'Burger Cao Cấp' }, varieties: ['wagyu', 'truffle', 'foie-gras', 'blue-cheese'] },
          { id: 'classic-burger', name: { en: 'Classic Burger', it: 'Burger Classico', vi: 'Burger Cổ Điển' }, varieties: ['cheeseburger', 'bacon-burger', 'mushroom-swiss', 'bbq-burger'] },
          { id: 'chicken-burger', name: { en: 'Chicken Burger', it: 'Burger di Pollo', vi: 'Burger Gà' }, varieties: ['crispy', 'grilled', 'spicy', 'buffalo'] },
          { id: 'fish-burger', name: { en: 'Fish Burger', it: 'Burger di Pesce', vi: 'Burger Cá' }, varieties: ['fish-fillet', 'shrimp', 'crab-cake'] },
          { id: 'veggie-burger', name: { en: 'Veggie Burger', it: 'Burger Vegetariano', vi: 'Burger Chay' }, varieties: ['black-bean', 'mushroom', 'beyond-meat', 'impossible', 'falafel'] },
        ],
      },
      // -------------------------------------------------------------------------
      // PIADINE - Italian flatbread specialty
      // -------------------------------------------------------------------------
      {
        id: 'piadina',
        name: { en: 'Piadina', it: 'Piadine', vi: 'Bánh Piadina' },
        types: [
          { id: 'piadina-romagnola', name: { en: 'Romagnola Piadina', it: 'Piadina Romagnola', vi: 'Piadina Romagnola' }, varieties: ['classica', 'integrale', 'senza-strutto'] },
          { id: 'crescione', name: { en: 'Crescione', it: 'Crescione', vi: 'Crescione' }, varieties: ['spinach-ricotta', 'potato', 'sausage', 'pumpkin'] },
          { id: 'piadina-gourmet', name: { en: 'Gourmet Piadina', it: 'Piadina Gourmet', vi: 'Piadina Cao Cấp' }, varieties: ['burrata', 'tartufo', 'bresaola-rucola', 'salmone'] },
          { id: 'piadina-farciture', name: { en: 'Classic Fillings', it: 'Farciture Classiche', vi: 'Nhân Cổ Điển' }, varieties: ['prosciutto-squacquerone', 'salame-stracchino', 'mortadella-squacquerone', 'rucola-grana'] },
        ],
      },
      // -------------------------------------------------------------------------
      // KEBAB - Middle Eastern & Mediterranean grilled meats
      // -------------------------------------------------------------------------
      {
        id: 'kebab',
        name: { en: 'Kebab', it: 'Kebab', vi: 'Kebab' },
        types: [
          { id: 'doner-kebab', name: { en: 'Döner Kebab', it: 'Döner Kebab', vi: 'Döner Kebab' }, varieties: ['lamb', 'chicken', 'beef', 'mixed'] },
          { id: 'shawarma', name: { en: 'Shawarma', it: 'Shawarma', vi: 'Shawarma' }, varieties: ['chicken', 'beef', 'lamb', 'mixed'] },
          { id: 'gyros', name: { en: 'Gyros', it: 'Gyros', vi: 'Gyros' }, varieties: ['pork', 'chicken', 'lamb'] },
          { id: 'adana-kebab', name: { en: 'Adana Kebab', it: 'Adana Kebab', vi: 'Adana Kebab' } },
          { id: 'shish-kebab', name: { en: 'Shish Kebab', it: 'Shish Kebab', vi: 'Shish Kebab' }, varieties: ['lamb', 'chicken', 'beef', 'vegetable'] },
          { id: 'iskender', name: { en: 'Iskender Kebab', it: 'Iskender Kebab', vi: 'Iskender Kebab' } },
          { id: 'durum', name: { en: 'Dürüm (Wrap)', it: 'Dürüm', vi: 'Dürüm' }, varieties: ['chicken', 'beef', 'mixed', 'falafel'] },
          { id: 'kebab-plate', name: { en: 'Kebab Plate', it: 'Piatto Kebab', vi: 'Đĩa Kebab' }, varieties: ['with-rice', 'with-fries', 'with-salad'] },
        ],
      },
      // -------------------------------------------------------------------------
      // ROSTICCERIA - Italian rotisserie & deli
      // -------------------------------------------------------------------------
      {
        id: 'rosticceria',
        name: { en: 'Rotisserie', it: 'Rosticceria', vi: 'Thịt Nướng Quay' },
        types: [
          { id: 'pollo-arrosto', name: { en: 'Roast Chicken', it: 'Pollo Arrosto', vi: 'Gà Quay' }, varieties: ['intero', 'mezzo', 'quarto', 'coscia', 'petto'] },
          { id: 'porchetta', name: { en: 'Porchetta', it: 'Porchetta', vi: 'Heo Quay Ý' }, varieties: ['panino', 'piatto', 'tagliata'] },
          { id: 'arrosticini', name: { en: 'Arrosticini', it: 'Arrosticini', vi: 'Xiên Thịt Cừu' } },
          { id: 'spiedo', name: { en: 'Spit Roast', it: 'Spiedo', vi: 'Thịt Xiên Quay' }, varieties: ['misto', 'agnello', 'maiale'] },
          { id: 'supplì', name: { en: 'Supplì', it: 'Supplì', vi: 'Cơm Viên Chiên' }, varieties: ['al-telefono', 'alla-romana', 'al-ragù'] },
          { id: 'arancini', name: { en: 'Arancini', it: 'Arancini', vi: 'Cơm Viên Sicily' }, varieties: ['ragù', 'burro', 'pistacchio', 'norma'] },
          { id: 'fritture', name: { en: 'Fried Items', it: 'Fritture', vi: 'Đồ Chiên' }, varieties: ['olive-ascolane', 'fiori-di-zucca', 'crocchette', 'mozzarella-in-carrozza'] },
          { id: 'gastronomia', name: { en: 'Deli Items', it: 'Gastronomia', vi: 'Thức Ăn Nguội' }, varieties: ['lasagne', 'parmigiana', 'polpette', 'involtini'] },
        ],
      },
      // -------------------------------------------------------------------------
      // PANINI GOURMET - Premium Italian sandwiches
      // -------------------------------------------------------------------------
      {
        id: 'panini-gourmet',
        name: { en: 'Gourmet Sandwiches', it: 'Panini Gourmet', vi: 'Bánh Mì Cao Cấp' },
        types: [
          { id: 'focaccia', name: { en: 'Focaccia Sandwich', it: 'Focaccia Farcita', vi: 'Focaccia Nhân' }, varieties: ['genovese', 'barese', 'recco'] },
          { id: 'ciabatta', name: { en: 'Ciabatta Sandwich', it: 'Ciabatta Farcita', vi: 'Ciabatta Nhân' } },
          { id: 'tramezzino', name: { en: 'Tramezzino', it: 'Tramezzino', vi: 'Tramezzino' }, varieties: ['tonno', 'prosciutto', 'vegetariano', 'salmone'] },
          { id: 'toast', name: { en: 'Italian Toast', it: 'Toast', vi: 'Toast Ý' }, varieties: ['prosciutto-formaggio', 'caprese', 'club'] },
          { id: 'panino-lampredotto', name: { en: 'Lampredotto Sandwich', it: 'Panino al Lampredotto', vi: 'Panino Lampredotto' } },
          { id: 'panino-porchetta', name: { en: 'Porchetta Sandwich', it: 'Panino alla Porchetta', vi: 'Panino Porchetta' } },
          { id: 'schiacciatina', name: { en: 'Schiacciatina', it: 'Schiacciatina', vi: 'Schiacciatina' }, varieties: ['toscana', 'fiorentina'] },
        ],
      },
      // -------------------------------------------------------------------------
      // BÁNH MÌ - Vietnamese sandwiches
      // -------------------------------------------------------------------------
      {
        id: 'banh-mi',
        name: { en: 'Bánh Mì', it: 'Bánh Mì Vietnamita', vi: 'Bánh Mì' },
        types: [
          { id: 'banh-mi-thit', name: { en: 'Meat Bánh Mì', it: 'Bánh Mì con Carne', vi: 'Bánh Mì Thịt' }, varieties: ['thit-nuong', 'cha-lua', 'xiu-mai', 'thit-nguoi'] },
          { id: 'banh-mi-dac-biet', name: { en: 'Special Bánh Mì', it: 'Bánh Mì Speciale', vi: 'Bánh Mì Đặc Biệt' } },
          { id: 'banh-mi-ga', name: { en: 'Chicken Bánh Mì', it: 'Bánh Mì di Pollo', vi: 'Bánh Mì Gà' } },
          { id: 'banh-mi-chay', name: { en: 'Vegetarian Bánh Mì', it: 'Bánh Mì Vegetariano', vi: 'Bánh Mì Chay' } },
          { id: 'banh-mi-trung', name: { en: 'Egg Bánh Mì', it: 'Bánh Mì con Uovo', vi: 'Bánh Mì Trứng' } },
        ],
      },
      // -------------------------------------------------------------------------
      // OTHER SANDWICHES
      // -------------------------------------------------------------------------
      {
        id: 'sandwiches-other',
        name: { en: 'Other Sandwiches', it: 'Altri Panini', vi: 'Bánh Mì Khác' },
        types: [
          { id: 'club-sandwich', name: { en: 'Club Sandwich', it: 'Club Sandwich', vi: 'Club Sandwich' } },
          { id: 'wrap', name: { en: 'Wraps', it: 'Wrap', vi: 'Wrap' }, varieties: ['chicken', 'falafel', 'veggie', 'caesar'] },
          { id: 'submarine', name: { en: 'Submarine', it: 'Submarine', vi: 'Submarine' }, varieties: ['italian', 'meatball', 'philly-cheesesteak'] },
          { id: 'hot-dog', name: { en: 'Hot Dog', it: 'Hot Dog', vi: 'Hot Dog' }, varieties: ['classic', 'chicago', 'new-york', 'chili-dog'] },
          { id: 'croque', name: { en: 'Croque Monsieur/Madame', it: 'Croque Monsieur', vi: 'Croque Monsieur' } },
        ],
      },
      // -------------------------------------------------------------------------
      // BOWLS
      // -------------------------------------------------------------------------
      {
        id: 'bowls',
        name: { en: 'Bowls', it: 'Bowl', vi: 'Tô' },
        types: [
          { id: 'poke-bowl', name: { en: 'Poke Bowl', it: 'Poke Bowl', vi: 'Poke Bowl' }, varieties: ['salmon', 'tuna', 'shrimp', 'tofu'] },
          { id: 'buddha-bowl', name: { en: 'Buddha Bowl', it: 'Buddha Bowl', vi: 'Buddha Bowl' } },
          { id: 'grain-bowl', name: { en: 'Grain Bowl', it: 'Grain Bowl', vi: 'Grain Bowl' }, varieties: ['quinoa', 'farro', 'brown-rice'] },
          { id: 'acai-bowl', name: { en: 'Açaí Bowl', it: 'Açaí Bowl', vi: 'Açaí Bowl' } },
          { id: 'smoothie-bowl', name: { en: 'Smoothie Bowl', it: 'Smoothie Bowl', vi: 'Smoothie Bowl' } },
          { id: 'burrito-bowl', name: { en: 'Burrito Bowl', it: 'Burrito Bowl', vi: 'Burrito Bowl' } },
        ],
      },
      // -------------------------------------------------------------------------
      // PIZZA
      // -------------------------------------------------------------------------
      {
        id: 'pizza',
        name: { en: 'Pizza', it: 'Pizza', vi: 'Pizza' },
        types: [
          { id: 'neapolitan', name: { en: 'Neapolitan', it: 'Napoletana', vi: 'Neapolitan' }, varieties: ['margherita', 'marinara', 'diavola', 'capricciosa'] },
          { id: 'roman', name: { en: 'Roman', it: 'Romana', vi: 'Roman' }, varieties: ['al-taglio', 'tonda-romana'] },
          { id: 'sicilian', name: { en: 'Sicilian', it: 'Siciliana', vi: 'Sicilian' }, varieties: ['sfincione', 'pizzolo'] },
          { id: 'pizza-gourmet', name: { en: 'Gourmet Pizza', it: 'Pizza Gourmet', vi: 'Pizza Cao Cấp' }, varieties: ['tartufo', 'burrata', 'crudo'] },
          { id: 'pizza-fritta', name: { en: 'Fried Pizza', it: 'Pizza Fritta', vi: 'Pizza Chiên' }, varieties: ['montanara', 'calzone-fritto'] },
          { id: 'pinsa', name: { en: 'Pinsa Romana', it: 'Pinsa Romana', vi: 'Pinsa Romana' } },
          { id: 'focaccia-pizza', name: { en: 'Focaccia Pizza', it: 'Focaccia', vi: 'Focaccia Pizza' } },
        ],
      },
      // -------------------------------------------------------------------------
      // TACOS & MEXICAN
      // -------------------------------------------------------------------------
      {
        id: 'tacos-burritos',
        name: { en: 'Tacos & Mexican', it: 'Tacos e Messicano', vi: 'Tacos và Mexico' },
        types: [
          { id: 'tacos', name: { en: 'Tacos', it: 'Tacos', vi: 'Tacos' }, varieties: ['carnitas', 'al-pastor', 'carne-asada', 'pollo', 'pescado', 'vegetariano'] },
          { id: 'burritos', name: { en: 'Burritos', it: 'Burritos', vi: 'Burritos' }, varieties: ['carne', 'pollo', 'vegetariano', 'breakfast'] },
          { id: 'quesadillas', name: { en: 'Quesadillas', it: 'Quesadillas', vi: 'Quesadillas' } },
          { id: 'nachos', name: { en: 'Nachos', it: 'Nachos', vi: 'Nachos' }, varieties: ['supreme', 'cheese', 'loaded'] },
          { id: 'enchiladas', name: { en: 'Enchiladas', it: 'Enchiladas', vi: 'Enchiladas' } },
          { id: 'tostadas', name: { en: 'Tostadas', it: 'Tostadas', vi: 'Tostadas' } },
        ],
      },
      // -------------------------------------------------------------------------
      // RICE DISHES
      // -------------------------------------------------------------------------
      {
        id: 'rice-dishes',
        name: { en: 'Rice Dishes', it: 'Piatti di Riso', vi: 'Cơm' },
        types: [
          { id: 'fried-rice', name: { en: 'Fried Rice', it: 'Riso Fritto', vi: 'Cơm chiên' }, varieties: ['yangzhou', 'kimchi', 'nasi-goreng', 'thai'] },
          { id: 'curry-rice', name: { en: 'Curry Rice', it: 'Riso al Curry', vi: 'Cơm cà ri' }, varieties: ['japanese', 'thai', 'indian', 'katsu'] },
          { id: 'biryani', name: { en: 'Biryani', it: 'Biryani', vi: 'Biryani' }, varieties: ['chicken', 'lamb', 'vegetable', 'hyderabadi'] },
          { id: 'donburi', name: { en: 'Donburi', it: 'Donburi', vi: 'Cơm Nhật' }, varieties: ['gyudon', 'katsudon', 'oyakodon', 'tendon'] },
          { id: 'com-tam', name: { en: 'Cơm Tấm', it: 'Cơm Tấm', vi: 'Cơm Tấm' }, varieties: ['suon', 'bi', 'cha', 'dac-biet'] },
          { id: 'chirashi', name: { en: 'Chirashi', it: 'Chirashi', vi: 'Chirashi' } },
        ],
      },
    ],
  },
  {
    id: 'dessert',
    domain: 'food',
    name: { en: 'Desserts', it: 'Dessert', vi: 'Tráng miệng' },
    icon: '🍰',
    subcategories: [
      {
        id: 'cakes',
        name: { en: 'Cakes', it: 'Torte', vi: 'Bánh ngọt' },
        types: [
          { id: 'layer-cake', name: { en: 'Layer Cake', it: 'Torta a Strati', vi: 'Bánh tầng' } },
          { id: 'cheesecake', name: { en: 'Cheesecake', it: 'Cheesecake', vi: 'Bánh phô mai' } },
          { id: 'mousse-cake', name: { en: 'Mousse Cake', it: 'Torta Mousse', vi: 'Bánh mousse' } },
          { id: 'sponge-cake', name: { en: 'Sponge Cake', it: 'Pan di Spagna', vi: 'Bánh bông lan' } },
        ],
      },
      {
        id: 'pastries',
        name: { en: 'Pastries', it: 'Pasticceria', vi: 'Bánh ngọt Pháp' },
        types: [
          { id: 'croissant', name: { en: 'Croissant', it: 'Croissant', vi: 'Croissant' } },
          { id: 'danish', name: { en: 'Danish', it: 'Danish', vi: 'Danish' } },
          { id: 'eclair', name: { en: 'Éclair', it: 'Éclair', vi: 'Éclair' } },
          { id: 'macaron', name: { en: 'Macaron', it: 'Macaron', vi: 'Macaron' } },
        ],
      },
      {
        id: 'custards-puddings',
        name: { en: 'Custards & Puddings', it: 'Creme e Budini', vi: 'Bánh flan' },
        types: [
          { id: 'flan', name: { en: 'Flan', it: 'Flan', vi: 'Bánh flan' } },
          { id: 'creme-brulee', name: { en: 'Crème Brûlée', it: 'Crème Brûlée', vi: 'Crème Brûlée' } },
          { id: 'panna-cotta', name: { en: 'Panna Cotta', it: 'Panna Cotta', vi: 'Panna Cotta' } },
          { id: 'tiramisu', name: { en: 'Tiramisù', it: 'Tiramisù', vi: 'Tiramisù' } },
        ],
      },
      {
        id: 'frozen',
        name: { en: 'Frozen Desserts', it: 'Dessert Gelati', vi: 'Tráng miệng lạnh' },
        types: [
          { id: 'gelato', name: { en: 'Gelato', it: 'Gelato', vi: 'Gelato' } },
          { id: 'ice-cream', name: { en: 'Ice Cream', it: 'Gelato', vi: 'Kem' } },
          { id: 'sorbet', name: { en: 'Sorbet', it: 'Sorbetto', vi: 'Sorbet' } },
          { id: 'affogato', name: { en: 'Affogato', it: 'Affogato', vi: 'Affogato' } },
        ],
      },
    ],
  },
];

// ============================================================================
// BEVERAGE TAXONOMY
// ============================================================================

export interface BeverageCategory {
  id: string;
  domain: 'beverage';
  name: MultiLangText;
  icon: string;
  alcoholic: boolean;
  subcategories: BeverageSubcategory[];
}

export interface BeverageSubcategory {
  id: string;
  name: MultiLangText;
  types?: BeverageType[];
}

export interface BeverageType {
  id: string;
  name: MultiLangText;
  regions?: BeverageRegion[];
  varieties?: string[];
}

export interface BeverageRegion {
  id: string;
  name: MultiLangText;
  country: string;
  subregions?: string[];
}

export const beverageCategories: BeverageCategory[] = [
  // -------------------------------------------------------------------------
  // COFFEE
  // -------------------------------------------------------------------------
  {
    id: 'coffee',
    domain: 'beverage',
    name: { en: 'Coffee', it: 'Caffè', vi: 'Cà phê' },
    icon: '☕',
    alcoholic: false,
    subcategories: [
      {
        id: 'espresso-based',
        name: { en: 'Espresso-Based', it: 'A Base di Espresso', vi: 'Nền Espresso' },
        types: [
          { id: 'espresso', name: { en: 'Espresso', it: 'Espresso', vi: 'Espresso' }, varieties: ['single', 'double', 'ristretto', 'lungo'] },
          { id: 'americano', name: { en: 'Americano', it: 'Americano', vi: 'Americano' } },
          { id: 'cappuccino', name: { en: 'Cappuccino', it: 'Cappuccino', vi: 'Cappuccino' } },
          { id: 'latte', name: { en: 'Latte', it: 'Latte', vi: 'Latte' } },
          { id: 'macchiato', name: { en: 'Macchiato', it: 'Macchiato', vi: 'Macchiato' } },
          { id: 'flat-white', name: { en: 'Flat White', it: 'Flat White', vi: 'Flat White' } },
          { id: 'mocha', name: { en: 'Mocha', it: 'Mocha', vi: 'Mocha' } },
          { id: 'cortado', name: { en: 'Cortado', it: 'Cortado', vi: 'Cortado' } },
        ],
      },
      {
        id: 'filter-coffee',
        name: { en: 'Filter Coffee', it: 'Caffè Filtro', vi: 'Cà phê phin' },
        types: [
          { id: 'drip', name: { en: 'Drip Coffee', it: 'Caffè Americano', vi: 'Cà phê nhỏ giọt' } },
          { id: 'pour-over', name: { en: 'Pour Over', it: 'Pour Over', vi: 'Pour Over' }, varieties: ['v60', 'chemex', 'kalita'] },
          { id: 'french-press', name: { en: 'French Press', it: 'Caffettiera a Stantuffo', vi: 'French Press' } },
          { id: 'aeropress', name: { en: 'Aeropress', it: 'Aeropress', vi: 'Aeropress' } },
          { id: 'vietnamese', name: { en: 'Vietnamese Coffee', it: 'Caffè Vietnamita', vi: 'Cà phê phin Việt Nam' } },
        ],
      },
      {
        id: 'cold-coffee',
        name: { en: 'Cold Coffee', it: 'Caffè Freddo', vi: 'Cà phê lạnh' },
        types: [
          { id: 'cold-brew', name: { en: 'Cold Brew', it: 'Cold Brew', vi: 'Cold Brew' } },
          { id: 'iced-latte', name: { en: 'Iced Latte', it: 'Latte Freddo', vi: 'Latte đá' } },
          { id: 'frappuccino', name: { en: 'Frappuccino', it: 'Frappuccino', vi: 'Frappuccino' } },
          { id: 'nitro', name: { en: 'Nitro Coffee', it: 'Nitro Coffee', vi: 'Nitro Coffee' } },
        ],
      },
      {
        id: 'specialty-coffee',
        name: { en: 'Specialty Coffee', it: 'Caffè Speciale', vi: 'Cà phê đặc biệt' },
        types: [
          { id: 'egg-coffee', name: { en: 'Vietnamese Egg Coffee', it: 'Caffè all\'Uovo', vi: 'Cà phê trứng' } },
          { id: 'coconut-coffee', name: { en: 'Coconut Coffee', it: 'Caffè al Cocco', vi: 'Cà phê cốt dừa' } },
          { id: 'orange-coffee', name: { en: 'Orange Coffee', it: 'Caffè all\'Arancia', vi: 'Cà phê cam' } },
          { id: 'affogato', name: { en: 'Affogato', it: 'Affogato', vi: 'Affogato' } },
        ],
      },
      {
        id: 'coffee-beans',
        name: { en: 'Coffee Beans (Origin)', it: 'Chicchi (Origine)', vi: 'Hạt cà phê' },
        types: [
          {
            id: 'arabica',
            name: { en: 'Arabica', it: 'Arabica', vi: 'Arabica' },
            regions: [
              { id: 'ethiopia', name: { en: 'Ethiopia', it: 'Etiopia', vi: 'Ethiopia' }, country: 'ET', subregions: ['yirgacheffe', 'sidamo', 'harrar'] },
              { id: 'colombia', name: { en: 'Colombia', it: 'Colombia', vi: 'Colombia' }, country: 'CO', subregions: ['huila', 'narino', 'antioquia'] },
              { id: 'brazil', name: { en: 'Brazil', it: 'Brasile', vi: 'Brazil' }, country: 'BR', subregions: ['minas-gerais', 'sao-paulo', 'bahia'] },
              { id: 'guatemala', name: { en: 'Guatemala', it: 'Guatemala', vi: 'Guatemala' }, country: 'GT', subregions: ['antigua', 'huehuetenango'] },
              { id: 'kenya', name: { en: 'Kenya', it: 'Kenya', vi: 'Kenya' }, country: 'KE' },
              { id: 'jamaica', name: { en: 'Jamaica Blue Mountain', it: 'Jamaica Blue Mountain', vi: 'Jamaica Blue Mountain' }, country: 'JM' },
            ],
          },
          {
            id: 'robusta',
            name: { en: 'Robusta', it: 'Robusta', vi: 'Robusta' },
            regions: [
              { id: 'vietnam', name: { en: 'Vietnam', it: 'Vietnam', vi: 'Việt Nam' }, country: 'VN', subregions: ['central-highlands', 'buon-ma-thuot'] },
              { id: 'indonesia', name: { en: 'Indonesia', it: 'Indonesia', vi: 'Indonesia' }, country: 'ID', subregions: ['sumatra', 'java'] },
              { id: 'uganda', name: { en: 'Uganda', it: 'Uganda', vi: 'Uganda' }, country: 'UG' },
            ],
          },
          { id: 'liberica', name: { en: 'Liberica', it: 'Liberica', vi: 'Liberica' } },
          { id: 'excelsa', name: { en: 'Excelsa', it: 'Excelsa', vi: 'Excelsa' } },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // TEA
  // -------------------------------------------------------------------------
  {
    id: 'tea',
    domain: 'beverage',
    name: { en: 'Tea', it: 'Tè', vi: 'Trà' },
    icon: '🍵',
    alcoholic: false,
    subcategories: [
      {
        id: 'black-tea',
        name: { en: 'Black Tea', it: 'Tè Nero', vi: 'Trà đen' },
        types: [
          { id: 'assam', name: { en: 'Assam', it: 'Assam', vi: 'Assam' } },
          { id: 'darjeeling', name: { en: 'Darjeeling', it: 'Darjeeling', vi: 'Darjeeling' } },
          { id: 'ceylon', name: { en: 'Ceylon', it: 'Ceylon', vi: 'Ceylon' } },
          { id: 'earl-grey', name: { en: 'Earl Grey', it: 'Earl Grey', vi: 'Earl Grey' } },
          { id: 'english-breakfast', name: { en: 'English Breakfast', it: 'English Breakfast', vi: 'English Breakfast' } },
          { id: 'lapsang-souchong', name: { en: 'Lapsang Souchong', it: 'Lapsang Souchong', vi: 'Trà hun khói' } },
        ],
      },
      {
        id: 'green-tea',
        name: { en: 'Green Tea', it: 'Tè Verde', vi: 'Trà xanh' },
        types: [
          { id: 'sencha', name: { en: 'Sencha', it: 'Sencha', vi: 'Sencha' } },
          { id: 'matcha', name: { en: 'Matcha', it: 'Matcha', vi: 'Matcha' } },
          { id: 'gyokuro', name: { en: 'Gyokuro', it: 'Gyokuro', vi: 'Gyokuro' } },
          { id: 'longjing', name: { en: 'Longjing (Dragon Well)', it: 'Longjing', vi: 'Long Tỉnh' } },
          { id: 'gunpowder', name: { en: 'Gunpowder', it: 'Gunpowder', vi: 'Gunpowder' } },
          { id: 'jasmine', name: { en: 'Jasmine Green', it: 'Tè al Gelsomino', vi: 'Trà lài' } },
        ],
      },
      {
        id: 'oolong-tea',
        name: { en: 'Oolong Tea', it: 'Tè Oolong', vi: 'Trà Ô long' },
        types: [
          { id: 'tieguanyin', name: { en: 'Tieguanyin', it: 'Tieguanyin', vi: 'Thiết Quan Âm' } },
          { id: 'da-hong-pao', name: { en: 'Da Hong Pao', it: 'Da Hong Pao', vi: 'Đại Hồng Bào' } },
          { id: 'dong-ding', name: { en: 'Dong Ding', it: 'Dong Ding', vi: 'Đông Đỉnh' } },
          { id: 'oriental-beauty', name: { en: 'Oriental Beauty', it: 'Oriental Beauty', vi: 'Bạch Hào Ô Long' } },
        ],
      },
      {
        id: 'white-tea',
        name: { en: 'White Tea', it: 'Tè Bianco', vi: 'Trà trắng' },
        types: [
          { id: 'silver-needle', name: { en: 'Silver Needle', it: 'Silver Needle', vi: 'Bạch Hào Ngân Châm' } },
          { id: 'white-peony', name: { en: 'White Peony', it: 'White Peony', vi: 'Bạch Mẫu Đơn' } },
        ],
      },
      {
        id: 'pu-erh',
        name: { en: 'Pu-erh Tea', it: 'Tè Pu-erh', vi: 'Trà Phổ Nhĩ' },
        types: [
          { id: 'sheng', name: { en: 'Sheng (Raw)', it: 'Sheng', vi: 'Sheng' } },
          { id: 'shou', name: { en: 'Shou (Ripe)', it: 'Shou', vi: 'Shou' } },
        ],
      },
      {
        id: 'herbal-tea',
        name: { en: 'Herbal Tea (Tisanes)', it: 'Tisane', vi: 'Trà thảo mộc' },
        types: [
          { id: 'chamomile', name: { en: 'Chamomile', it: 'Camomilla', vi: 'Cúc La Mã' } },
          { id: 'peppermint', name: { en: 'Peppermint', it: 'Menta', vi: 'Bạc hà' } },
          { id: 'rooibos', name: { en: 'Rooibos', it: 'Rooibos', vi: 'Rooibos' } },
          { id: 'hibiscus', name: { en: 'Hibiscus', it: 'Ibisco', vi: 'Hoa dâm bụt' } },
          { id: 'ginger', name: { en: 'Ginger Tea', it: 'Tè allo Zenzero', vi: 'Trà gừng' } },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // WINE
  // -------------------------------------------------------------------------
  {
    id: 'wine',
    domain: 'beverage',
    name: { en: 'Wine', it: 'Vino', vi: 'Rượu vang' },
    icon: '🍷',
    alcoholic: true,
    subcategories: [
      {
        id: 'red-wine',
        name: { en: 'Red Wine', it: 'Vino Rosso', vi: 'Rượu vang đỏ' },
        types: [
          {
            id: 'cabernet-sauvignon',
            name: { en: 'Cabernet Sauvignon', it: 'Cabernet Sauvignon', vi: 'Cabernet Sauvignon' },
            regions: [
              { id: 'bordeaux', name: { en: 'Bordeaux', it: 'Bordeaux', vi: 'Bordeaux' }, country: 'FR', subregions: ['medoc', 'pauillac', 'margaux', 'saint-julien', 'saint-estephe'] },
              { id: 'napa-valley', name: { en: 'Napa Valley', it: 'Napa Valley', vi: 'Napa Valley' }, country: 'US' },
              { id: 'coonawarra', name: { en: 'Coonawarra', it: 'Coonawarra', vi: 'Coonawarra' }, country: 'AU' },
              { id: 'maipo-valley', name: { en: 'Maipo Valley', it: 'Valle del Maipo', vi: 'Maipo Valley' }, country: 'CL' },
            ],
          },
          {
            id: 'merlot',
            name: { en: 'Merlot', it: 'Merlot', vi: 'Merlot' },
            regions: [
              { id: 'bordeaux-right', name: { en: 'Bordeaux Right Bank', it: 'Bordeaux Rive Droite', vi: 'Bordeaux bờ phải' }, country: 'FR', subregions: ['pomerol', 'saint-emilion'] },
            ],
          },
          {
            id: 'pinot-noir',
            name: { en: 'Pinot Noir', it: 'Pinot Nero', vi: 'Pinot Noir' },
            regions: [
              { id: 'burgundy', name: { en: 'Burgundy', it: 'Borgogna', vi: 'Burgundy' }, country: 'FR', subregions: ['cote-de-nuits', 'cote-de-beaune', 'gevrey-chambertin', 'vosne-romanee'] },
              { id: 'oregon', name: { en: 'Oregon', it: 'Oregon', vi: 'Oregon' }, country: 'US', subregions: ['willamette-valley'] },
              { id: 'central-otago', name: { en: 'Central Otago', it: 'Central Otago', vi: 'Central Otago' }, country: 'NZ' },
            ],
          },
          {
            id: 'nebbiolo',
            name: { en: 'Nebbiolo', it: 'Nebbiolo', vi: 'Nebbiolo' },
            regions: [
              { id: 'barolo', name: { en: 'Barolo', it: 'Barolo', vi: 'Barolo' }, country: 'IT' },
              { id: 'barbaresco', name: { en: 'Barbaresco', it: 'Barbaresco', vi: 'Barbaresco' }, country: 'IT' },
            ],
          },
          {
            id: 'sangiovese',
            name: { en: 'Sangiovese', it: 'Sangiovese', vi: 'Sangiovese' },
            regions: [
              { id: 'chianti', name: { en: 'Chianti', it: 'Chianti', vi: 'Chianti' }, country: 'IT', subregions: ['chianti-classico', 'chianti-rufina'] },
              { id: 'brunello', name: { en: 'Brunello di Montalcino', it: 'Brunello di Montalcino', vi: 'Brunello' }, country: 'IT' },
            ],
          },
          { id: 'syrah-shiraz', name: { en: 'Syrah/Shiraz', it: 'Syrah/Shiraz', vi: 'Syrah/Shiraz' } },
          { id: 'tempranillo', name: { en: 'Tempranillo', it: 'Tempranillo', vi: 'Tempranillo' } },
          { id: 'malbec', name: { en: 'Malbec', it: 'Malbec', vi: 'Malbec' } },
          { id: 'zinfandel', name: { en: 'Zinfandel', it: 'Zinfandel', vi: 'Zinfandel' } },
        ],
      },
      {
        id: 'white-wine',
        name: { en: 'White Wine', it: 'Vino Bianco', vi: 'Rượu vang trắng' },
        types: [
          {
            id: 'chardonnay',
            name: { en: 'Chardonnay', it: 'Chardonnay', vi: 'Chardonnay' },
            regions: [
              { id: 'chablis', name: { en: 'Chablis', it: 'Chablis', vi: 'Chablis' }, country: 'FR' },
              { id: 'meursault', name: { en: 'Meursault', it: 'Meursault', vi: 'Meursault' }, country: 'FR' },
              { id: 'sonoma', name: { en: 'Sonoma', it: 'Sonoma', vi: 'Sonoma' }, country: 'US' },
            ],
          },
          { id: 'sauvignon-blanc', name: { en: 'Sauvignon Blanc', it: 'Sauvignon Blanc', vi: 'Sauvignon Blanc' } },
          { id: 'riesling', name: { en: 'Riesling', it: 'Riesling', vi: 'Riesling' } },
          { id: 'pinot-grigio', name: { en: 'Pinot Grigio/Gris', it: 'Pinot Grigio', vi: 'Pinot Grigio' } },
          { id: 'gewurztraminer', name: { en: 'Gewürztraminer', it: 'Gewürztraminer', vi: 'Gewürztraminer' } },
          { id: 'viognier', name: { en: 'Viognier', it: 'Viognier', vi: 'Viognier' } },
        ],
      },
      {
        id: 'rose-wine',
        name: { en: 'Rosé Wine', it: 'Vino Rosato', vi: 'Rượu vang hồng' },
        types: [
          { id: 'provence-rose', name: { en: 'Provence Rosé', it: 'Rosato di Provenza', vi: 'Rosé Provence' } },
          { id: 'white-zinfandel', name: { en: 'White Zinfandel', it: 'White Zinfandel', vi: 'White Zinfandel' } },
        ],
      },
      {
        id: 'sparkling-wine',
        name: { en: 'Sparkling Wine', it: 'Vino Spumante', vi: 'Rượu vang sủi' },
        types: [
          {
            id: 'champagne',
            name: { en: 'Champagne', it: 'Champagne', vi: 'Champagne' },
            varieties: ['brut', 'extra-brut', 'demi-sec', 'blanc-de-blancs', 'blanc-de-noirs', 'rose', 'vintage', 'prestige-cuvee'],
          },
          { id: 'prosecco', name: { en: 'Prosecco', it: 'Prosecco', vi: 'Prosecco' } },
          { id: 'cava', name: { en: 'Cava', it: 'Cava', vi: 'Cava' } },
          { id: 'cremant', name: { en: 'Crémant', it: 'Crémant', vi: 'Crémant' } },
          { id: 'franciacorta', name: { en: 'Franciacorta', it: 'Franciacorta', vi: 'Franciacorta' } },
        ],
      },
      {
        id: 'dessert-wine',
        name: { en: 'Dessert Wine', it: 'Vino da Dessert', vi: 'Rượu vang ngọt' },
        types: [
          { id: 'sauternes', name: { en: 'Sauternes', it: 'Sauternes', vi: 'Sauternes' } },
          { id: 'ice-wine', name: { en: 'Ice Wine', it: 'Eiswein', vi: 'Ice Wine' } },
          { id: 'tokaji', name: { en: 'Tokaji', it: 'Tokaji', vi: 'Tokaji' } },
          { id: 'moscato', name: { en: 'Moscato', it: 'Moscato', vi: 'Moscato' } },
        ],
      },
      {
        id: 'fortified-wine',
        name: { en: 'Fortified Wine', it: 'Vino Liquoroso', vi: 'Rượu vang tăng cường' },
        types: [
          { id: 'port', name: { en: 'Port', it: 'Porto', vi: 'Port' }, varieties: ['ruby', 'tawny', 'vintage', 'lbv', 'vintage', 'colheita'] },
          { id: 'sherry', name: { en: 'Sherry', it: 'Sherry', vi: 'Sherry' }, varieties: ['fino', 'manzanilla', 'amontillado', 'oloroso', 'pedro-ximenez', 'cream'] },
          { id: 'madeira', name: { en: 'Madeira', it: 'Madeira', vi: 'Madeira' } },
          { id: 'marsala', name: { en: 'Marsala', it: 'Marsala', vi: 'Marsala' } },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // BEER
  // -------------------------------------------------------------------------
  {
    id: 'beer',
    domain: 'beverage',
    name: { en: 'Beer', it: 'Birra', vi: 'Bia' },
    icon: '🍺',
    alcoholic: true,
    subcategories: [
      {
        id: 'lager',
        name: { en: 'Lager', it: 'Lager', vi: 'Lager' },
        types: [
          { id: 'pilsner', name: { en: 'Pilsner', it: 'Pilsner', vi: 'Pilsner' }, varieties: ['czech-pilsner', 'german-pilsner'] },
          { id: 'helles', name: { en: 'Helles', it: 'Helles', vi: 'Helles' } },
          { id: 'vienna-lager', name: { en: 'Vienna Lager', it: 'Vienna Lager', vi: 'Vienna Lager' } },
          { id: 'marzen', name: { en: 'Märzen/Oktoberfest', it: 'Märzen', vi: 'Märzen' } },
          { id: 'dunkel', name: { en: 'Dunkel', it: 'Dunkel', vi: 'Dunkel' } },
          { id: 'schwarzbier', name: { en: 'Schwarzbier', it: 'Schwarzbier', vi: 'Schwarzbier' } },
          { id: 'bock', name: { en: 'Bock', it: 'Bock', vi: 'Bock' }, varieties: ['traditional-bock', 'doppelbock', 'maibock', 'eisbock'] },
          { id: 'american-lager', name: { en: 'American Lager', it: 'Lager Americana', vi: 'Lager Mỹ' } },
          { id: 'mexican-lager', name: { en: 'Mexican Lager', it: 'Lager Messicana', vi: 'Lager Mexico' } },
        ],
      },
      {
        id: 'ale',
        name: { en: 'Ale', it: 'Ale', vi: 'Ale' },
        types: [
          { id: 'pale-ale', name: { en: 'Pale Ale', it: 'Pale Ale', vi: 'Pale Ale' }, varieties: ['american-pale-ale', 'english-pale-ale', 'belgian-pale-ale'] },
          { id: 'ipa', name: { en: 'India Pale Ale (IPA)', it: 'IPA', vi: 'IPA' }, varieties: ['english-ipa', 'american-ipa', 'double-ipa', 'triple-ipa', 'new-england-ipa', 'hazy-ipa', 'session-ipa', 'black-ipa', 'west-coast-ipa'] },
          { id: 'amber-ale', name: { en: 'Amber Ale', it: 'Amber Ale', vi: 'Amber Ale' } },
          { id: 'brown-ale', name: { en: 'Brown Ale', it: 'Brown Ale', vi: 'Brown Ale' } },
          { id: 'scottish-ale', name: { en: 'Scottish Ale', it: 'Scottish Ale', vi: 'Scottish Ale' } },
        ],
      },
      {
        id: 'wheat-beer',
        name: { en: 'Wheat Beer', it: 'Birra di Frumento', vi: 'Bia lúa mì' },
        types: [
          { id: 'hefeweizen', name: { en: 'Hefeweizen', it: 'Hefeweizen', vi: 'Hefeweizen' } },
          { id: 'witbier', name: { en: 'Witbier', it: 'Witbier', vi: 'Witbier' } },
          { id: 'dunkelweizen', name: { en: 'Dunkelweizen', it: 'Dunkelweizen', vi: 'Dunkelweizen' } },
          { id: 'american-wheat', name: { en: 'American Wheat', it: 'Wheat Americana', vi: 'American Wheat' } },
          { id: 'berliner-weisse', name: { en: 'Berliner Weisse', it: 'Berliner Weisse', vi: 'Berliner Weisse' } },
          { id: 'gose', name: { en: 'Gose', it: 'Gose', vi: 'Gose' } },
        ],
      },
      {
        id: 'stout-porter',
        name: { en: 'Stout & Porter', it: 'Stout e Porter', vi: 'Stout và Porter' },
        types: [
          { id: 'dry-stout', name: { en: 'Dry Stout (Irish)', it: 'Stout Irlandese', vi: 'Dry Stout' } },
          { id: 'milk-stout', name: { en: 'Milk Stout', it: 'Milk Stout', vi: 'Milk Stout' } },
          { id: 'oatmeal-stout', name: { en: 'Oatmeal Stout', it: 'Oatmeal Stout', vi: 'Oatmeal Stout' } },
          { id: 'imperial-stout', name: { en: 'Imperial Stout', it: 'Imperial Stout', vi: 'Imperial Stout' } },
          { id: 'pastry-stout', name: { en: 'Pastry Stout', it: 'Pastry Stout', vi: 'Pastry Stout' } },
          { id: 'porter', name: { en: 'Porter', it: 'Porter', vi: 'Porter' } },
          { id: 'baltic-porter', name: { en: 'Baltic Porter', it: 'Baltic Porter', vi: 'Baltic Porter' } },
        ],
      },
      {
        id: 'belgian',
        name: { en: 'Belgian Styles', it: 'Stili Belgi', vi: 'Bia Bỉ' },
        types: [
          { id: 'belgian-blonde', name: { en: 'Belgian Blonde', it: 'Blonde Belga', vi: 'Belgian Blonde' } },
          { id: 'belgian-dubbel', name: { en: 'Dubbel', it: 'Dubbel', vi: 'Dubbel' } },
          { id: 'belgian-tripel', name: { en: 'Tripel', it: 'Tripel', vi: 'Tripel' } },
          { id: 'belgian-quadrupel', name: { en: 'Quadrupel', it: 'Quadrupel', vi: 'Quadrupel' } },
          { id: 'saison', name: { en: 'Saison', it: 'Saison', vi: 'Saison' } },
          { id: 'trappist', name: { en: 'Trappist', it: 'Trappista', vi: 'Trappist' } },
        ],
      },
      {
        id: 'sour-beer',
        name: { en: 'Sour Beer', it: 'Birra Acida', vi: 'Bia chua' },
        types: [
          { id: 'lambic', name: { en: 'Lambic', it: 'Lambic', vi: 'Lambic' }, varieties: ['gueuze', 'kriek', 'framboise'] },
          { id: 'flanders-red', name: { en: 'Flanders Red', it: 'Flanders Red', vi: 'Flanders Red' } },
          { id: 'kettle-sour', name: { en: 'Kettle Sour', it: 'Kettle Sour', vi: 'Kettle Sour' } },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // SPIRITS
  // -------------------------------------------------------------------------
  {
    id: 'spirits',
    domain: 'beverage',
    name: { en: 'Spirits', it: 'Distillati', vi: 'Rượu mạnh' },
    icon: '🥃',
    alcoholic: true,
    subcategories: [
      {
        id: 'whiskey',
        name: { en: 'Whiskey/Whisky', it: 'Whisky', vi: 'Whisky' },
        types: [
          {
            id: 'scotch',
            name: { en: 'Scotch Whisky', it: 'Scotch', vi: 'Scotch' },
            regions: [
              { id: 'speyside', name: { en: 'Speyside', it: 'Speyside', vi: 'Speyside' }, country: 'GB' },
              { id: 'highland', name: { en: 'Highland', it: 'Highland', vi: 'Highland' }, country: 'GB' },
              { id: 'lowland', name: { en: 'Lowland', it: 'Lowland', vi: 'Lowland' }, country: 'GB' },
              { id: 'islay', name: { en: 'Islay', it: 'Islay', vi: 'Islay' }, country: 'GB' },
              { id: 'campbeltown', name: { en: 'Campbeltown', it: 'Campbeltown', vi: 'Campbeltown' }, country: 'GB' },
              { id: 'islands', name: { en: 'Islands', it: 'Islands', vi: 'Islands' }, country: 'GB' },
            ],
            varieties: ['single-malt', 'blended', 'blended-malt', 'single-grain'],
          },
          {
            id: 'bourbon',
            name: { en: 'Bourbon', it: 'Bourbon', vi: 'Bourbon' },
            regions: [
              { id: 'kentucky', name: { en: 'Kentucky', it: 'Kentucky', vi: 'Kentucky' }, country: 'US' },
              { id: 'tennessee', name: { en: 'Tennessee', it: 'Tennessee', vi: 'Tennessee' }, country: 'US' },
            ],
            varieties: ['straight-bourbon', 'small-batch', 'single-barrel', 'wheated-bourbon', 'high-rye'],
          },
          { id: 'irish-whiskey', name: { en: 'Irish Whiskey', it: 'Whiskey Irlandese', vi: 'Irish Whiskey' }, varieties: ['single-malt', 'single-pot-still', 'blended'] },
          { id: 'japanese-whisky', name: { en: 'Japanese Whisky', it: 'Whisky Giapponese', vi: 'Japanese Whisky' } },
          { id: 'canadian-whisky', name: { en: 'Canadian Whisky', it: 'Whisky Canadese', vi: 'Canadian Whisky' } },
          { id: 'rye-whiskey', name: { en: 'Rye Whiskey', it: 'Rye Whiskey', vi: 'Rye Whiskey' } },
        ],
      },
      {
        id: 'vodka',
        name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
        types: [
          { id: 'plain-vodka', name: { en: 'Plain Vodka', it: 'Vodka Liscia', vi: 'Vodka nguyên chất' } },
          { id: 'flavored-vodka', name: { en: 'Flavored Vodka', it: 'Vodka Aromatizzata', vi: 'Vodka hương vị' } },
        ],
      },
      {
        id: 'gin',
        name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
        types: [
          { id: 'london-dry', name: { en: 'London Dry', it: 'London Dry', vi: 'London Dry' } },
          { id: 'plymouth', name: { en: 'Plymouth', it: 'Plymouth', vi: 'Plymouth' } },
          { id: 'old-tom', name: { en: 'Old Tom', it: 'Old Tom', vi: 'Old Tom' } },
          { id: 'genever', name: { en: 'Genever', it: 'Genever', vi: 'Genever' } },
          { id: 'contemporary', name: { en: 'Contemporary/New Western', it: 'Contemporaneo', vi: 'Contemporary' } },
          { id: 'sloe-gin', name: { en: 'Sloe Gin', it: 'Sloe Gin', vi: 'Sloe Gin' } },
        ],
      },
      {
        id: 'rum',
        name: { en: 'Rum', it: 'Rum', vi: 'Rum' },
        types: [
          { id: 'white-rum', name: { en: 'White/Silver Rum', it: 'Rum Bianco', vi: 'Rum trắng' } },
          { id: 'gold-rum', name: { en: 'Gold/Amber Rum', it: 'Rum Dorato', vi: 'Rum vàng' } },
          { id: 'dark-rum', name: { en: 'Dark Rum', it: 'Rum Scuro', vi: 'Rum đen' } },
          { id: 'aged-rum', name: { en: 'Aged Rum', it: 'Rum Invecchiato', vi: 'Rum lâu năm' } },
          { id: 'overproof-rum', name: { en: 'Overproof Rum', it: 'Rum Overproof', vi: 'Rum cao độ' } },
          { id: 'spiced-rum', name: { en: 'Spiced Rum', it: 'Rum Speziato', vi: 'Rum gia vị' } },
          { id: 'rhum-agricole', name: { en: 'Rhum Agricole', it: 'Rhum Agricole', vi: 'Rhum Agricole' } },
          { id: 'cachaca', name: { en: 'Cachaça', it: 'Cachaça', vi: 'Cachaça' } },
        ],
      },
      {
        id: 'tequila-mezcal',
        name: { en: 'Tequila & Mezcal', it: 'Tequila e Mezcal', vi: 'Tequila và Mezcal' },
        types: [
          { id: 'blanco', name: { en: 'Blanco/Silver', it: 'Blanco', vi: 'Blanco' } },
          { id: 'reposado', name: { en: 'Reposado', it: 'Reposado', vi: 'Reposado' } },
          { id: 'anejo', name: { en: 'Añejo', it: 'Añejo', vi: 'Añejo' } },
          { id: 'extra-anejo', name: { en: 'Extra Añejo', it: 'Extra Añejo', vi: 'Extra Añejo' } },
          { id: 'mezcal', name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' } },
        ],
      },
      {
        id: 'brandy-cognac',
        name: { en: 'Brandy & Cognac', it: 'Brandy e Cognac', vi: 'Brandy và Cognac' },
        types: [
          { id: 'cognac', name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' }, varieties: ['vs', 'vsop', 'xo', 'hors-dage'] },
          { id: 'armagnac', name: { en: 'Armagnac', it: 'Armagnac', vi: 'Armagnac' } },
          { id: 'calvados', name: { en: 'Calvados', it: 'Calvados', vi: 'Calvados' } },
          { id: 'pisco', name: { en: 'Pisco', it: 'Pisco', vi: 'Pisco' } },
          { id: 'grappa', name: { en: 'Grappa', it: 'Grappa', vi: 'Grappa' } },
        ],
      },
      {
        id: 'liqueurs',
        name: { en: 'Liqueurs', it: 'Liquori', vi: 'Liqueur' },
        types: [
          { id: 'orange-liqueur', name: { en: 'Orange Liqueur', it: 'Liquore all\'Arancia', vi: 'Liqueur cam' }, varieties: ['triple-sec', 'curacao', 'grand-marnier', 'cointreau'] },
          { id: 'coffee-liqueur', name: { en: 'Coffee Liqueur', it: 'Liquore al Caffè', vi: 'Liqueur cà phê' } },
          { id: 'cream-liqueur', name: { en: 'Cream Liqueur', it: 'Liquore alla Crema', vi: 'Liqueur kem' } },
          { id: 'herbal-liqueur', name: { en: 'Herbal Liqueur', it: 'Liquore alle Erbe', vi: 'Liqueur thảo mộc' } },
          { id: 'amaro', name: { en: 'Amaro', it: 'Amaro', vi: 'Amaro' }, varieties: ['fernet', 'montenegro', 'averna', 'cynar', 'campari', 'aperol'] },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // COCKTAILS
  // -------------------------------------------------------------------------
  {
    id: 'cocktails',
    domain: 'beverage',
    name: { en: 'Cocktails', it: 'Cocktail', vi: 'Cocktail' },
    icon: '🍸',
    alcoholic: true,
    subcategories: [
      {
        id: 'spirit-forward',
        name: { en: 'Spirit-Forward', it: 'A Base di Distillato', vi: 'Nền rượu mạnh' },
        types: [
          { id: 'old-fashioned', name: { en: 'Old Fashioned', it: 'Old Fashioned', vi: 'Old Fashioned' } },
          { id: 'manhattan', name: { en: 'Manhattan', it: 'Manhattan', vi: 'Manhattan' } },
          { id: 'martini', name: { en: 'Martini', it: 'Martini', vi: 'Martini' }, varieties: ['dry', 'wet', 'dirty', 'gibson', 'vesper'] },
          { id: 'negroni', name: { en: 'Negroni', it: 'Negroni', vi: 'Negroni' } },
          { id: 'sazerac', name: { en: 'Sazerac', it: 'Sazerac', vi: 'Sazerac' } },
        ],
      },
      {
        id: 'sours',
        name: { en: 'Sours', it: 'Sour', vi: 'Sour' },
        types: [
          { id: 'whiskey-sour', name: { en: 'Whiskey Sour', it: 'Whiskey Sour', vi: 'Whiskey Sour' } },
          { id: 'daiquiri', name: { en: 'Daiquiri', it: 'Daiquiri', vi: 'Daiquiri' } },
          { id: 'margarita', name: { en: 'Margarita', it: 'Margarita', vi: 'Margarita' } },
          { id: 'sidecar', name: { en: 'Sidecar', it: 'Sidecar', vi: 'Sidecar' } },
          { id: 'cosmopolitan', name: { en: 'Cosmopolitan', it: 'Cosmopolitan', vi: 'Cosmopolitan' } },
          { id: 'amaretto-sour', name: { en: 'Amaretto Sour', it: 'Amaretto Sour', vi: 'Amaretto Sour' } },
        ],
      },
      {
        id: 'highballs',
        name: { en: 'Highballs', it: 'Highball', vi: 'Highball' },
        types: [
          { id: 'gin-tonic', name: { en: 'Gin & Tonic', it: 'Gin Tonic', vi: 'Gin Tonic' } },
          { id: 'moscow-mule', name: { en: 'Moscow Mule', it: 'Moscow Mule', vi: 'Moscow Mule' } },
          { id: 'cuba-libre', name: { en: 'Cuba Libre', it: 'Cuba Libre', vi: 'Cuba Libre' } },
          { id: 'dark-stormy', name: { en: 'Dark & Stormy', it: 'Dark and Stormy', vi: 'Dark and Stormy' } },
          { id: 'paloma', name: { en: 'Paloma', it: 'Paloma', vi: 'Paloma' } },
        ],
      },
      {
        id: 'fizzes-collinses',
        name: { en: 'Fizzes & Collinses', it: 'Fizz e Collins', vi: 'Fizz và Collins' },
        types: [
          { id: 'tom-collins', name: { en: 'Tom Collins', it: 'Tom Collins', vi: 'Tom Collins' } },
          { id: 'gin-fizz', name: { en: 'Gin Fizz', it: 'Gin Fizz', vi: 'Gin Fizz' } },
          { id: 'ramos-gin-fizz', name: { en: 'Ramos Gin Fizz', it: 'Ramos Gin Fizz', vi: 'Ramos Gin Fizz' } },
        ],
      },
      {
        id: 'tropical',
        name: { en: 'Tropical/Tiki', it: 'Tropicali/Tiki', vi: 'Nhiệt đới/Tiki' },
        types: [
          { id: 'mai-tai', name: { en: 'Mai Tai', it: 'Mai Tai', vi: 'Mai Tai' } },
          { id: 'pina-colada', name: { en: 'Piña Colada', it: 'Piña Colada', vi: 'Piña Colada' } },
          { id: 'mojito', name: { en: 'Mojito', it: 'Mojito', vi: 'Mojito' } },
          { id: 'zombie', name: { en: 'Zombie', it: 'Zombie', vi: 'Zombie' } },
          { id: 'hurricane', name: { en: 'Hurricane', it: 'Hurricane', vi: 'Hurricane' } },
        ],
      },
      {
        id: 'spritz-aperitivo',
        name: { en: 'Spritz & Aperitivo', it: 'Spritz e Aperitivo', vi: 'Spritz và Aperitivo' },
        types: [
          { id: 'aperol-spritz', name: { en: 'Aperol Spritz', it: 'Aperol Spritz', vi: 'Aperol Spritz' } },
          { id: 'campari-spritz', name: { en: 'Campari Spritz', it: 'Campari Spritz', vi: 'Campari Spritz' } },
          { id: 'hugo', name: { en: 'Hugo', it: 'Hugo', vi: 'Hugo' } },
          { id: 'americano', name: { en: 'Americano', it: 'Americano', vi: 'Americano' } },
        ],
      },
      {
        id: 'flips-nogs',
        name: { en: 'Flips & Nogs', it: 'Flip e Zabaione', vi: 'Flip và Nog' },
        types: [
          { id: 'eggnog', name: { en: 'Eggnog', it: 'Eggnog', vi: 'Eggnog' } },
          { id: 'brandy-alexander', name: { en: 'Brandy Alexander', it: 'Brandy Alexander', vi: 'Brandy Alexander' } },
          { id: 'porto-flip', name: { en: 'Porto Flip', it: 'Porto Flip', vi: 'Porto Flip' } },
        ],
      },
      {
        id: 'mocktails',
        name: { en: 'Mocktails (Non-Alcoholic)', it: 'Mocktail (Analcolici)', vi: 'Mocktail (Không cồn)' },
        types: [
          { id: 'virgin-mojito', name: { en: 'Virgin Mojito', it: 'Virgin Mojito', vi: 'Virgin Mojito' } },
          { id: 'virgin-pina-colada', name: { en: 'Virgin Piña Colada', it: 'Virgin Piña Colada', vi: 'Virgin Piña Colada' } },
          { id: 'shirley-temple', name: { en: 'Shirley Temple', it: 'Shirley Temple', vi: 'Shirley Temple' } },
          { id: 'arnold-palmer', name: { en: 'Arnold Palmer', it: 'Arnold Palmer', vi: 'Arnold Palmer' } },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // NON-ALCOHOLIC BEVERAGES
  // -------------------------------------------------------------------------
  {
    id: 'soft-drinks',
    domain: 'beverage',
    name: { en: 'Soft Drinks', it: 'Bevande Analcoliche', vi: 'Nước giải khát' },
    icon: '🥤',
    alcoholic: false,
    subcategories: [
      {
        id: 'water',
        name: { en: 'Water', it: 'Acqua', vi: 'Nước' },
        types: [
          { id: 'still-water', name: { en: 'Still Water', it: 'Acqua Naturale', vi: 'Nước lọc' } },
          { id: 'sparkling-water', name: { en: 'Sparkling Water', it: 'Acqua Frizzante', vi: 'Nước có ga' } },
          { id: 'flavored-water', name: { en: 'Flavored Water', it: 'Acqua Aromatizzata', vi: 'Nước hương vị' } },
          { id: 'coconut-water', name: { en: 'Coconut Water', it: 'Acqua di Cocco', vi: 'Nước dừa' } },
        ],
      },
      {
        id: 'juices',
        name: { en: 'Juices', it: 'Succhi', vi: 'Nước ép' },
        types: [
          { id: 'fresh-juice', name: { en: 'Fresh Squeezed', it: 'Spremuta Fresca', vi: 'Nước ép tươi' } },
          { id: 'cold-pressed', name: { en: 'Cold Pressed', it: 'Pressato a Freddo', vi: 'Ép lạnh' } },
          { id: 'fruit-juice', name: { en: 'Fruit Juice', it: 'Succo di Frutta', vi: 'Nước ép trái cây' } },
          { id: 'vegetable-juice', name: { en: 'Vegetable Juice', it: 'Succo di Verdura', vi: 'Nước ép rau' } },
        ],
      },
      {
        id: 'smoothies',
        name: { en: 'Smoothies', it: 'Smoothie', vi: 'Sinh tố' },
        types: [
          { id: 'fruit-smoothie', name: { en: 'Fruit Smoothie', it: 'Smoothie alla Frutta', vi: 'Sinh tố trái cây' } },
          { id: 'green-smoothie', name: { en: 'Green Smoothie', it: 'Smoothie Verde', vi: 'Sinh tố xanh' } },
          { id: 'protein-smoothie', name: { en: 'Protein Smoothie', it: 'Smoothie Proteico', vi: 'Sinh tố protein' } },
        ],
      },
      {
        id: 'sodas',
        name: { en: 'Sodas & Carbonated', it: 'Bibite Gassate', vi: 'Nước ngọt có ga' },
        types: [
          { id: 'cola', name: { en: 'Cola', it: 'Cola', vi: 'Cola' } },
          { id: 'lemon-lime', name: { en: 'Lemon-Lime', it: 'Limone', vi: 'Chanh' } },
          { id: 'ginger-ale', name: { en: 'Ginger Ale', it: 'Ginger Ale', vi: 'Ginger Ale' } },
          { id: 'tonic-water', name: { en: 'Tonic Water', it: 'Acqua Tonica', vi: 'Tonic' } },
          { id: 'craft-soda', name: { en: 'Craft Soda', it: 'Soda Artigianale', vi: 'Soda thủ công' } },
        ],
      },
      {
        id: 'milk-drinks',
        name: { en: 'Milk & Dairy Drinks', it: 'Bevande al Latte', vi: 'Đồ uống sữa' },
        types: [
          { id: 'milk', name: { en: 'Milk', it: 'Latte', vi: 'Sữa' } },
          { id: 'milkshake', name: { en: 'Milkshake', it: 'Milkshake', vi: 'Milkshake' } },
          { id: 'lassi', name: { en: 'Lassi', it: 'Lassi', vi: 'Lassi' } },
          { id: 'plant-milk', name: { en: 'Plant-Based Milk', it: 'Latte Vegetale', vi: 'Sữa thực vật' }, varieties: ['oat', 'almond', 'soy', 'coconut', 'cashew'] },
        ],
      },
    ],
  },
];

// ============================================================================
// CUISINE ORIGINS (For food categorization)
// ============================================================================

export interface CuisineOrigin {
  id: string;
  name: MultiLangText;
  region: 'asia' | 'europe' | 'americas' | 'africa' | 'oceania' | 'middle-east';
  countries: string[];
  keyIngredients: string[];
  signatureDishes: string[];
}

export const cuisineOrigins: CuisineOrigin[] = [
  // ASIA
  { id: 'vietnamese', name: { en: 'Vietnamese', it: 'Vietnamita', vi: 'Việt Nam' }, region: 'asia', countries: ['VN'], keyIngredients: ['fish-sauce', 'rice-noodles', 'fresh-herbs', 'lime'], signatureDishes: ['pho', 'banh-mi', 'spring-rolls', 'bun-cha'] },
  { id: 'japanese', name: { en: 'Japanese', it: 'Giapponese', vi: 'Nhật Bản' }, region: 'asia', countries: ['JP'], keyIngredients: ['soy-sauce', 'miso', 'dashi', 'rice'], signatureDishes: ['sushi', 'ramen', 'tempura', 'teriyaki'] },
  { id: 'chinese', name: { en: 'Chinese', it: 'Cinese', vi: 'Trung Quốc' }, region: 'asia', countries: ['CN'], keyIngredients: ['soy-sauce', 'ginger', 'garlic', 'sesame'], signatureDishes: ['dim-sum', 'kung-pao', 'peking-duck', 'mapo-tofu'] },
  { id: 'thai', name: { en: 'Thai', it: 'Thailandese', vi: 'Thái Lan' }, region: 'asia', countries: ['TH'], keyIngredients: ['fish-sauce', 'coconut-milk', 'lemongrass', 'thai-basil'], signatureDishes: ['pad-thai', 'green-curry', 'tom-yum', 'som-tam'] },
  { id: 'korean', name: { en: 'Korean', it: 'Coreano', vi: 'Hàn Quốc' }, region: 'asia', countries: ['KR'], keyIngredients: ['gochujang', 'sesame-oil', 'garlic', 'kimchi'], signatureDishes: ['bibimbap', 'bulgogi', 'korean-bbq', 'kimchi-jjigae'] },
  { id: 'indian', name: { en: 'Indian', it: 'Indiano', vi: 'Ấn Độ' }, region: 'asia', countries: ['IN'], keyIngredients: ['curry', 'turmeric', 'cumin', 'ghee'], signatureDishes: ['butter-chicken', 'biryani', 'tikka-masala', 'naan'] },

  // EUROPE
  { id: 'italian', name: { en: 'Italian', it: 'Italiano', vi: 'Ý' }, region: 'europe', countries: ['IT'], keyIngredients: ['olive-oil', 'tomato', 'basil', 'parmesan'], signatureDishes: ['pasta', 'pizza', 'risotto', 'tiramisu'] },
  { id: 'french', name: { en: 'French', it: 'Francese', vi: 'Pháp' }, region: 'europe', countries: ['FR'], keyIngredients: ['butter', 'cream', 'wine', 'herbs'], signatureDishes: ['coq-au-vin', 'ratatouille', 'croissant', 'souffle'] },
  { id: 'spanish', name: { en: 'Spanish', it: 'Spagnolo', vi: 'Tây Ban Nha' }, region: 'europe', countries: ['ES'], keyIngredients: ['olive-oil', 'saffron', 'paprika', 'garlic'], signatureDishes: ['paella', 'tapas', 'gazpacho', 'churros'] },
  { id: 'greek', name: { en: 'Greek', it: 'Greco', vi: 'Hy Lạp' }, region: 'europe', countries: ['GR'], keyIngredients: ['olive-oil', 'feta', 'yogurt', 'lemon'], signatureDishes: ['moussaka', 'souvlaki', 'gyros', 'tzatziki'] },

  // AMERICAS
  { id: 'mexican', name: { en: 'Mexican', it: 'Messicano', vi: 'Mexico' }, region: 'americas', countries: ['MX'], keyIngredients: ['corn', 'chili', 'beans', 'lime'], signatureDishes: ['tacos', 'enchiladas', 'guacamole', 'mole'] },
  { id: 'american', name: { en: 'American', it: 'Americano', vi: 'Mỹ' }, region: 'americas', countries: ['US'], keyIngredients: ['beef', 'cheese', 'potatoes', 'bbq-sauce'], signatureDishes: ['burger', 'bbq-ribs', 'mac-cheese', 'apple-pie'] },
  { id: 'brazilian', name: { en: 'Brazilian', it: 'Brasiliano', vi: 'Brazil' }, region: 'americas', countries: ['BR'], keyIngredients: ['black-beans', 'cassava', 'palm-oil', 'coconut'], signatureDishes: ['feijoada', 'picanha', 'coxinha', 'brigadeiro'] },

  // MIDDLE EAST
  { id: 'lebanese', name: { en: 'Lebanese', it: 'Libanese', vi: 'Lebanon' }, region: 'middle-east', countries: ['LB'], keyIngredients: ['olive-oil', 'lemon', 'garlic', 'parsley'], signatureDishes: ['hummus', 'falafel', 'shawarma', 'tabbouleh'] },
  { id: 'turkish', name: { en: 'Turkish', it: 'Turco', vi: 'Thổ Nhĩ Kỳ' }, region: 'middle-east', countries: ['TR'], keyIngredients: ['yogurt', 'lamb', 'eggplant', 'spices'], signatureDishes: ['kebab', 'baklava', 'dolma', 'lahmacun'] },
];

// ============================================================================
// EXPORTS
// ============================================================================

export const TAXONOMY_VERSION = '2.0';
export const TOTAL_FOOD_CATEGORIES = foodCategories.length;
export const TOTAL_BEVERAGE_CATEGORIES = beverageCategories.length;
export const TOTAL_CUISINE_ORIGINS = cuisineOrigins.length;
