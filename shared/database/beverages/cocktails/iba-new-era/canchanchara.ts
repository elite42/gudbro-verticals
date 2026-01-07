/**
 * IBA New Era Drinks: Canchanchara
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const canchanchara: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
  slug: 'canchanchara',
  stable_key: 'f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5',

  name: {
    en: 'Canchánchara',
    it: 'Canchánchara',
    vi: 'Canchánchara',
    ko: '칸찬차라',
    ja: 'カンチャンチャラ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'rum', 'cuban', 'historical', 'simple'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "One of Cuba's oldest cocktails, the Canchánchara is a simple yet historic blend of rum, honey, and lime. This rustic drink was the precursor to the Daiquiri and remains a beloved Cuban classic.",
    it: 'Uno dei cocktail più antichi di Cuba, il Canchánchara è una miscela semplice ma storica di rum, miele e lime. Questa bevanda rustica fu il precursore del Daiquiri e rimane un classico cubano amato.',
    vi: 'Một trong những cocktail lâu đời nhất của Cuba, Canchánchara là sự pha trộn đơn giản nhưng lịch sử của rum, mật ong và chanh. Thức uống mộc mạc này là tiền thân của Daiquiri và vẫn là một cocktail Cuba được yêu thích.',
  },

  history: {
    created_year: '1868',
    origin: {
      city: 'Trinidad',
      bar: 'Unknown',
      country: 'Cuba',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Canchánchara dates back to the Cuban War of Independence (1868-1878). Cuban independence fighters, known as "mambises," would mix aguardiente (a raw rum-like spirit), honey, and lime juice as both refreshment and medicine. The drink is named after a traditional Cuban song and dance. It became popular in Trinidad, Cuba, where it\'s still served in traditional clay cups called "jícaras."',
      it: 'Il Canchánchara risale alla Guerra d\'Indipendenza Cubana (1868-1878). I combattenti per l\'indipendenza cubana, noti come "mambises", mescolavano aguardiente (un distillato grezzo simile al rum), miele e succo di lime sia come rinfresco che come medicina. La bevanda prende il nome da una canzone e danza tradizionale cubana. Divenne popolare a Trinidad, Cuba, dove viene ancora servita in tradizionali tazze di terracotta chiamate "jícaras."',
      vi: 'Canchánchara có từ thời Chiến tranh Độc lập Cuba (1868-1878). Các chiến binh độc lập Cuba, được gọi là "mambises," pha trộn aguardiente (một loại rượu thô giống rum), mật ong và nước chanh vừa để giải khát vừa làm thuốc. Thức uống được đặt theo tên một bài hát và điệu nhảy truyền thống của Cuba. Nó trở nên phổ biến ở Trinidad, Cuba, nơi nó vẫn được phục vụ trong những chiếc cốc đất nung truyền thống gọi là "jícaras."',
    },
    named_after: {
      en: 'Named after a traditional Cuban song and dance from the independence era.',
      it: "Prende il nome da una canzone e danza tradizionale cubana dell'era dell'indipendenza.",
      vi: 'Được đặt theo tên một bài hát và điệu nhảy truyền thống Cuba từ thời kỳ độc lập.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'simple'],
    description: {
      en: 'Rustic and straightforward with natural honey sweetness, bright lime tartness, and the raw character of aguardiente or light rum. Simple yet perfectly balanced.',
      it: "Rustico e diretto con dolcezza naturale del miele, acidità brillante del lime e il carattere grezzo dell'aguardiente o del rum leggero. Semplice ma perfettamente bilanciato.",
      vi: 'Mộc mạc và đơn giản với vị ngọt tự nhiên của mật ong, vị chua tươi mát của chanh và tính cách thô của aguardiente hoặc rum nhẹ. Đơn giản nhưng cân bằng hoàn hảo.',
    },
    first_impression: {
      en: 'Bright lime and honey sweetness with rum warmth',
      it: 'Lime brillante e dolcezza del miele con il calore del rum',
      vi: 'Chanh tươi mát và vị ngọt mật ong với hương ấm rum',
    },
    finish: {
      en: 'Clean, sweet finish with lingering honey and citrus notes',
      it: 'Finale pulito e dolce con note persistenti di miele e agrumi',
      vi: 'Kết thúc trong trẻo, ngọt ngào với hương mật ong và cam quýt kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between honey sweetness and lime tartness',
      it: "Perfettamente bilanciato tra la dolcezza del miele e l'acidità del lime",
      vi: 'Cân bằng hoàn hảo giữa vị ngọt mật ong và vị chua chanh',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'historical_tasting', 'beach', 'party'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Excellent with Cuban cuisine, grilled pork, plantains, or traditional Cuban sandwiches.',
      it: 'Eccellente con cucina cubana, maiale alla griglia, platani, o tradizionali panini cubani.',
      vi: 'Tuyệt vời với ẩm thực Cuba, thịt lợn nướng, chuối tiêu hoặc bánh mì Cuba truyền thống.',
    },
    ideal_for: {
      en: 'Perfect for rum enthusiasts interested in cocktail history. Ideal for those who appreciate simple, rustic drinks with authentic Cuban heritage.',
      it: 'Perfetto per gli appassionati di rum interessati alla storia dei cocktail. Ideale per chi apprezza bevande semplici e rustiche con autentico patrimonio cubano.',
      vi: 'Hoàn hảo cho người đam mê rum quan tâm đến lịch sử cocktail. Lý tưởng cho những ai đánh giá cao đồ uống đơn giản, mộc mạc với di sản Cuba chân thật.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_LIGHT',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Light rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_HONEY',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Honey', it: 'Miele', vi: 'Mật ong' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_WATER',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Water', it: 'Acqua', vi: 'Nước' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Mix honey with water and lime juice in a traditional clay cup or rocks glass. Add rum and stir well. Add ice if desired.',
    it: 'Mescolare il miele con acqua e succo di lime in una tradizionale tazza di terracotta o bicchiere rocks. Aggiungere il rum e mescolare bene. Aggiungere ghiaccio se desiderato.',
    vi: 'Trộn mật ong với nước và nước chanh trong cốc đất nung truyền thống hoặc ly rocks. Thêm rum và khuấy đều. Thêm đá nếu muốn.',
  },

  glass: 'Rocks glass (or traditional clay cup)',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Miếng chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_LIGHT'],

  flavor_profile: ['sweet', 'citrus', 'simple'],

  abv_estimate: 18,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: [],
    intolerances: ['alcohol'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['summer', 'spring'],
  occasion_tags: ['casual', 'beach', 'party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'Traditionally served in clay cups called "jícaras." Use raw honey for authentic flavor. Can be served with or without ice.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/canchanchara/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
