/**
 * IBA Contemporary Classics: Bloody Mary
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bloodyMary: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d',
  slug: 'bloody-mary',
  stable_key: 'bloody_mary_iba_contemporary_2025',

  name: {
    en: 'Bloody Mary',
    it: 'Bloody Mary',
    vi: 'Bloody Mary',
    ko: '블러디 메리',
    ja: 'ブラッディ・メアリー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'savory', 'brunch', 'spicy', 'complex'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The ultimate brunch cocktail, combining vodka with tomato juice, lemon juice, and savory spices. Famous for its complex, savory flavor and reputation as a hangover cure. Endlessly customizable with garnishes.',
    it: 'Il cocktail da brunch definitivo, che combina vodka con succo di pomodoro, succo di limone e spezie salate. Famoso per il suo sapore complesso e salato e la reputazione di cura per i postumi della sbornia. Infinitamente personalizzabile con guarnizioni.',
    vi: 'Cocktail brunch tối thượng, kết hợp vodka với nước cà chua, nước chanh và gia vị mặn. Nổi tiếng với hương vị mặn phức tạp và danh tiếng chữa say. Có thể tùy chỉnh vô tận với trang trí.',
  },

  history: {
    created_year: '1921',
    origin: {
      city: 'Paris',
      bar: "Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Fernand Petiot',
      profession: 'bartender',
    },
    story: {
      en: "Created by Fernand Petiot at Harry's New York Bar in Paris in 1921, mixing vodka with tomato juice. When Petiot moved to New York's King Cole Bar in the 1930s, he refined the recipe with spices, creating the modern Bloody Mary. The drink became synonymous with brunch culture and hangover remedies.",
      it: "Creato da Fernand Petiot all'Harry's New York Bar di Parigi nel 1921, mescolando vodka con succo di pomodoro. Quando Petiot si trasferì al King Cole Bar di New York negli anni '30, perfezionò la ricetta con spezie, creando il moderno Bloody Mary. Il drink divenne sinonimo di cultura del brunch e rimedi per i postumi della sbornia.",
      vi: "Được tạo ra bởi Fernand Petiot tại Harry's New York Bar ở Paris năm 1921, trộn vodka với nước cà chua. Khi Petiot chuyển đến King Cole Bar của New York vào những năm 1930, ông đã tinh chỉnh công thức với gia vị, tạo ra Bloody Mary hiện đại. Thức uống trở thành đồng nghĩa với văn hóa brunch và thuốc chữa say.",
    },
    named_after: {
      en: 'Named after Queen Mary I of England (aka "Bloody Mary") or a waitress named Mary at a Chicago bar. Origins are disputed.',
      it: 'Prende il nome dalla Regina Maria I d\'Inghilterra (detta "Bloody Mary") o da una cameriera di nome Mary in un bar di Chicago. Le origini sono contestate.',
      vi: 'Được đặt theo tên Nữ hoàng Mary I của Anh (còn gọi là "Bloody Mary") hoặc một nữ phục vụ tên Mary tại một quán bar Chicago. Nguồn gốc còn tranh cãi.',
    },
  },

  taste: {
    profile: ['savory', 'spicy', 'umami', 'citrus'],
    description: {
      en: 'Complex, savory, and thoroughly unique among cocktails. Tomato juice provides umami richness, lemon adds brightness, Worcestershire and Tabasco create depth and heat, while celery salt ties everything together.',
      it: 'Complesso, salato e completamente unico tra i cocktail. Il succo di pomodoro fornisce ricchezza umami, il limone aggiunge brillantezza, Worcestershire e Tabasco creano profondità e calore, mentre il sale di sedano lega tutto insieme.',
      vi: 'Phức tạp, mặn và hoàn toàn độc đáo trong số các cocktail. Nước cà chua cung cấp sự phong phú umami, chanh thêm sự tươi sáng, Worcestershire và Tabasco tạo ra chiều sâu và cay, trong khi muối cần tây kết hợp mọi thứ lại với nhau.',
    },
    first_impression: {
      en: 'Savory tomato with immediate spice and acidity',
      it: 'Pomodoro salato con spezie e acidità immediate',
      vi: 'Cà chua mặn với gia vị và độ chua ngay lập tức',
    },
    finish: {
      en: 'Long, savory finish with lingering heat and umami',
      it: 'Finale lungo e salato con calore e umami persistenti',
      vi: 'Kết thúc dài, mặn với cay và umami kéo dài',
    },
    balance: {
      en: 'Complex balance of savory, spicy, sour, and salty elements',
      it: 'Equilibrio complesso di elementi salati, piccanti, acidi e salati',
      vi: 'Cân bằng phức tạp của các yếu tố mặn, cay, chua và mặn',
    },
  },

  recommendations: {
    best_time: ['brunch', 'morning', 'afternoon'],
    occasions: ['brunch', 'casual', 'recovery'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Perfect with brunch dishes: eggs Benedict, bacon, breakfast sandwiches, oysters, shrimp cocktail. Often served as a meal replacement with elaborate garnishes.',
      it: 'Perfetto con piatti da brunch: uova Benedict, bacon, sandwich per colazione, ostriche, cocktail di gamberetti. Spesso servito come sostituto del pasto con guarnizioni elaborate.',
      vi: 'Hoàn hảo với các món brunch: trứng Benedict, thịt xông khói, sandwich sáng, hàu, cocktail tôm. Thường được phục vụ như một bữa ăn thay thế với trang trí công phu.',
    },
    ideal_for: {
      en: 'Perfect for brunch lovers and those who appreciate savory cocktails. Famous as a hangover remedy. Not for those who prefer sweet drinks.',
      it: 'Perfetto per gli amanti del brunch e chi apprezza i cocktail salati. Famoso come rimedio per i postumi della sbornia. Non per chi preferisce drink dolci.',
      vi: 'Hoàn hảo cho người yêu brunch và những ai đánh giá cao cocktail mặn. Nổi tiếng như một phương thuốc chữa say. Không dành cho những người thích đồ uống ngọt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_TOMATO_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Tomato juice', it: 'Succo di pomodoro', vi: 'Nước cà chua' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_WORCESTERSHIRE',
      quantity: { amount: 2, unit: 'dash' },
      display_name: {
        en: 'Worcestershire sauce',
        it: 'Salsa Worcestershire',
        vi: 'Tương Worcestershire',
      },
    },
    {
      ingredient_id: 'ING_TABASCO',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Tabasco sauce', it: 'Salsa Tabasco', vi: 'Tương Tabasco' },
    },
    {
      ingredient_id: 'ING_CELERY_SALT',
      quantity: { amount: 1, unit: 'pinch' },
      display_name: { en: 'Celery salt', it: 'Sale di sedano', vi: 'Muối cần tây' },
    },
    {
      ingredient_id: 'ING_BLACK_PEPPER',
      quantity: { amount: 1, unit: 'pinch' },
      display_name: { en: 'Black pepper', it: 'Pepe nero', vi: 'Tiêu đen' },
    },
  ],

  method: 'roll',

  instructions: {
    en: 'Pour all ingredients into a highball glass. Roll gently (pour back and forth between glasses). Garnish with celery stalk and lemon wedge. Season to taste.',
    it: 'Versare tutti gli ingredienti in un bicchiere highball. Rollare delicatamente (versare avanti e indietro tra bicchieri). Guarnire con gambo di sedano e spicchio di limone. Condire a piacere.',
    vi: 'Đổ tất cả nguyên liệu vào ly highball. Lăn nhẹ (đổ qua lại giữa các ly). Trang trí với cọng cần tây và miếng chanh. Nêm nếm theo khẩu vị.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Celery stalk and lemon wedge',
    it: 'Gambo di sedano e spicchio di limone',
    vi: 'Cọng cần tây và miếng chanh',
  },

  ice: 'cubes',

  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['savory', 'spicy', 'umami', 'citrus'],

  abv_estimate: 12,

  calories_estimate: 125,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'celery', 'fish'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'nightshades', 'histamine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['brunch', 'casual', 'recovery'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['virgin-mary', 'bloody-caesar', 'red-snapper', 'michelada'],

  notes_for_staff:
    'Highly customizable - ask customer about spice preference. Common garnishes include bacon, shrimp, pickles, olives, cheese. Rolling (not shaking) preserves texture. Worcestershire contains anchovies (not vegetarian).',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/bloody-mary/',
    notes: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
