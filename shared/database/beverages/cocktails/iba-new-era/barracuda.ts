/**
 * IBA New Era Drinks: Barracuda
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const barracuda: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  slug: 'barracuda',
  stable_key: 'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3',

  name: {
    en: 'Barracuda',
    it: 'Barracuda',
    vi: 'Barracuda',
    ko: '바라쿠다',
    ja: 'バラクーダ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'rum', 'tropical', 'sparkling', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A tropical sparkling cocktail combining gold rum with pineapple, lime, and Galliano, topped with sparkling wine. Refreshing and elegant with a perfect balance of tropical fruit and effervescence.',
    it: 'Un cocktail tropicale frizzante che combina rum dorato con ananas, lime e Galliano, completato con vino spumante. Rinfrescante ed elegante con un perfetto equilibrio tra frutta tropicale ed effervescenza.',
    vi: 'Một cocktail nhiệt đới có ga kết hợp rum vàng với dứa, chanh và Galliano, phủ rượu vang có ga. Sảng khoái và thanh lịch với sự cân bằng hoàn hảo giữa trái cây nhiệt đới và độ sủi bọt.',
  },

  history: {
    created_year: '1980',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'Unknown',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Barracuda emerged in the 1980s as a tropical variation on the classic Champagne cocktail. Its combination of rum, pineapple, and sparkling wine made it popular in beach resorts and tropical destinations. The addition of Galliano adds a distinctive herbal-vanilla note that sets it apart from simpler tropical drinks.',
      it: "Il Barracuda è emerso negli anni '80 come una variazione tropicale del classico cocktail Champagne. La sua combinazione di rum, ananas e vino spumante lo ha reso popolare nei resort sulla spiaggia e nelle destinazioni tropicali. L'aggiunta di Galliano aggiunge una nota distintiva erbacea-vaniglia che lo distingue dalle bevande tropicali più semplici.",
      vi: 'Barracuda xuất hiện vào những năm 1980 như một biến thể nhiệt đới của cocktail Champagne cổ điển. Sự kết hợp rum, dứa và rượu vang có ga đã làm cho nó phổ biến ở các khu nghỉ dưỡng bãi biển và điểm đến nhiệt đới. Việc thêm Galliano tạo ra hương vị thảo mộc-vani đặc trưng khiến nó khác biệt với các loại đồ uống nhiệt đới đơn giản hơn.',
    },
    named_after: {
      en: "Named after the barracuda fish, known for being swift and striking - qualities that match the drink's refreshing and bold character.",
      it: 'Prende il nome dal pesce barracuda, noto per essere veloce e sorprendente - qualità che corrispondono al carattere rinfrescante e audace della bevanda.',
      vi: 'Được đặt theo tên loài cá barracuda, được biết đến là nhanh nhẹn và ấn tượng - những phẩm chất phù hợp với tính cách sảng khoái và táo bạo của thức uống.',
    },
  },

  taste: {
    profile: ['tropical', 'sparkling', 'fruity'],
    description: {
      en: 'Tropical pineapple and lime juice balanced with rum warmth, herbal Galliano notes, and celebratory sparkling wine. Light, refreshing, and sophisticated.',
      it: 'Ananas tropicale e succo di lime bilanciati con il calore del rum, note erbacee di Galliano e vino spumante celebrativo. Leggero, rinfrescante e sofisticato.',
      vi: 'Dứa nhiệt đới và nước chanh cân bằng với hương ấm rum, hương thảo mộc Galliano và rượu vang có ga lễ hội. Nhẹ nhàng, sảng khoái và tinh tế.',
    },
    first_impression: {
      en: 'Bright tropical fruit with sparkling effervescence',
      it: 'Frutta tropicale brillante con effervescenza frizzante',
      vi: 'Trái cây nhiệt đới tươi sáng với độ sủi bọt',
    },
    finish: {
      en: 'Clean, crisp finish with lingering vanilla and herbal notes',
      it: 'Finale pulito e croccante con note persistenti di vaniglia ed erbe',
      vi: 'Kết thúc trong trẻo, sắc nét với hương vani và thảo mộc kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tropical sweetness, citrus tartness, and sparkling wine elegance',
      it: 'Perfettamente bilanciato tra dolcezza tropicale, acidità degli agrumi ed eleganza del vino spumante',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt nhiệt đới, vị chua cam quýt và sự thanh lịch của rượu vang có ga',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['celebration', 'party', 'brunch', 'beach'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with tropical fruit platters, seafood dishes, grilled fish, or as a celebratory aperitif.',
      it: 'Eccellente con piatti di frutta tropicale, piatti di pesce, pesce alla griglia, o come aperitivo celebrativo.',
      vi: 'Tuyệt vời với đĩa trái cây nhiệt đới, món hải sản, cá nướng, hoặc làm aperitif lễ hội.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy tropical flavors with an elegant twist. Ideal for celebrations or anyone seeking a sophisticated beach cocktail.',
      it: 'Perfetto per chi ama i sapori tropicali con un tocco elegante. Ideale per celebrazioni o per chiunque cerchi un cocktail da spiaggia sofisticato.',
      vi: 'Hoàn hảo cho những ai thích hương vị nhiệt đới với chút thanh lịch. Lý tưởng cho lễ kỷ niệm hoặc bất kỳ ai tìm kiếm cocktail bãi biển tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_GOLD',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gold rum', it: 'Rum dorato', vi: 'Rum vàng' },
    },
    {
      ingredient_id: 'ING_GALLIANO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Galliano', it: 'Galliano', vi: 'Galliano' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_PROSECCO',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Prosecco', it: 'Prosecco', vi: 'Prosecco' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Shake rum, Galliano, pineapple juice, and lime juice with ice. Strain into a highball glass filled with ice. Top with Prosecco.',
    it: 'Shakerare rum, Galliano, succo di ananas e succo di lime con ghiaccio. Filtrare in un bicchiere highball pieno di ghiaccio. Completare con Prosecco.',
    vi: 'Lắc rum, Galliano, nước dứa và nước chanh với đá. Lọc vào ly highball đầy đá. Phủ Prosecco lên trên.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Pineapple wedge and cherry',
    it: 'Spicchio di ananas e ciliegia',
    vi: 'Miếng dứa và cherry',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_GOLD'],

  flavor_profile: ['tropical', 'sparkling', 'fruity'],

  abv_estimate: 12,

  calories_estimate: 210,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegetarian',
      'vegan',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['celebration', 'party', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'Add Prosecco last to preserve carbonation. Use fresh pineapple juice for best results. Can substitute Champagne for Prosecco.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/barracuda/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
