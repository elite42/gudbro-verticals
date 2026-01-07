/**
 * IBA New Era Drinks: Suffering Bastard
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sufferingBastard: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
  slug: 'suffering-bastard',
  stable_key: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',

  name: {
    en: 'Suffering Bastard',
    it: 'Suffering Bastard',
    vi: 'Suffering Bastard',
    ko: '서퍼링 바스타드',
    ja: 'サファリングバスタード',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'gin', 'brandy', 'tiki', 'refreshing', 'hangover'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary hangover cure from Cairo combining gin and brandy with lime, ginger beer, and Angostura bitters. Refreshing, spicy, and supposedly medicinal - perfect for "suffering bastards."',
    it: 'Una leggendaria cura per i postumi della sbornia dal Cairo che combina gin e brandy con lime, ginger beer e Angostura bitter. Rinfrescante, speziato e presumibilmente medicinale - perfetto per i "poveri diavoli sofferenti."',
    vi: 'Một thức uống huyền thoại chữa say từ Cairo kết hợp gin và brandy với chanh, bia gừng và Angostura bitters. Sảng khoái, cay và được cho là có tác dụng chữa bệnh - hoàn hảo cho những "kẻ khốn đau khổ."',
  },

  history: {
    created_year: '1942',
    origin: {
      city: 'Cairo',
      bar: "Shepheard's Hotel",
      country: 'Egypt',
    },
    creator: {
      name: 'Joe Scialom',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Joe Scialom at Shepheard\'s Hotel in Cairo during World War II. The drink was allegedly invented as a hangover cure for British officers stationed in North Africa. The name refers to the hungover soldiers who would stumble into the bar seeking relief. The drink became so popular that Scialom reportedly made "by the barrel" during the war years.',
      it: 'Creato da Joe Scialom allo Shepheard\'s Hotel al Cairo durante la Seconda Guerra Mondiale. La bevanda fu presumibilmente inventata come cura per i postumi della sbornia per gli ufficiali britannici di stanza nel Nord Africa. Il nome si riferisce ai soldati con i postumi che barcollando entravano nel bar cercando sollievo. La bevanda divenne così popolare che Scialom la preparava "a barili" durante gli anni di guerra.',
      vi: 'Được tạo ra bởi Joe Scialom tại khách sạn Shepheard\'s ở Cairo trong Thế chiến II. Thức uống được cho là được phát minh như một phương thuốc chữa say cho các sĩ quan Anh đóng quân ở Bắc Phi. Cái tên ám chỉ những người lính say đi loạng choạng vào quán bar tìm kiếm sự giải thoát. Thức uống trở nên phổ biến đến mức Scialom được báo cáo là pha "từng thùng" trong những năm chiến tranh.',
    },
    named_after: {
      en: 'Named after the hungover British officers who were "suffering bastards" in need of a cure.',
      it: 'Prende il nome dagli ufficiali britannici con i postumi che erano "poveri diavoli sofferenti" bisognosi di una cura.',
      vi: 'Được đặt theo tên các sĩ quan Anh say rượu là những "kẻ khốn đau khổ" cần được chữa trị.',
    },
  },

  taste: {
    profile: ['spicy', 'refreshing', 'complex'],
    description: {
      en: 'Complex blend of gin and brandy with bright lime, spicy ginger beer, and aromatic bitters. Refreshing, warming, and surprisingly balanced despite the multiple spirits.',
      it: 'Miscela complessa di gin e brandy con lime brillante, ginger beer speziato e bitter aromatici. Rinfrescante, riscaldante e sorprendentemente bilanciato nonostante i molteplici distillati.',
      vi: 'Sự pha trộn phức tạp của gin và brandy với chanh tươi mát, bia gừng cay và bitters thơm. Sảng khoái, ấm áp và cân bằng đáng ngạc nhiên mặc dù có nhiều loại rượu.',
    },
    first_impression: {
      en: 'Bright citrus and spicy ginger with herbal gin notes',
      it: 'Agrumi brillanti e zenzero speziato con note erbacee di gin',
      vi: 'Cam quýt tươi mát và gừng cay với hương thảo mộc từ gin',
    },
    finish: {
      en: 'Long, warming finish with ginger spice and aromatic bitters',
      it: 'Finale lungo e caldo con spezie di zenzero e bitter aromatici',
      vi: 'Kết thúc dài, ấm áp với gia vị gừng và bitters thơm',
    },
    balance: {
      en: 'Well-balanced between spirit strength, citrus brightness, and ginger spice',
      it: 'Ben bilanciato tra la forza degli alcolici, la brillantezza degli agrumi e le spezie dello zenzero',
      vi: 'Cân bằng tốt giữa độ mạnh rượu, độ tươi cam quýt và vị cay gừng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'recovery', 'party', 'casual'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Excellent with spicy foods, Middle Eastern cuisine, grilled meats, or as a brunch refresher.',
      it: 'Eccellente con cibi piccanti, cucina mediorientale, carni alla griglia, o come rinfrescante per il brunch.',
      vi: 'Tuyệt vời với món ăn cay, ẩm thực Trung Đông, thịt nướng, hoặc làm thức uống sảng khoái cho bữa brunch.',
    },
    ideal_for: {
      en: 'Perfect for those seeking a refreshing, complex drink or a legendary hangover cure. Ideal for tiki enthusiasts and history buffs.',
      it: 'Perfetto per chi cerca una bevanda rinfrescante e complessa o una leggendaria cura per i postumi. Ideale per gli appassionati di tiki e gli appassionati di storia.',
      vi: 'Hoàn hảo cho những ai tìm kiếm thức uống sảng khoái, phức tạp hoặc phương thuốc chữa say huyền thoại. Lý tưởng cho người đam mê tiki và những người yêu lịch sử.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_BRANDY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Brandy', it: 'Brandy', vi: 'Brandy' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GINGER_BEER',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Ginger beer', it: 'Ginger beer', vi: 'Bia gừng' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitter', vi: 'Angostura bitters' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour gin, brandy, and lime juice into a highball glass filled with ice. Top with ginger beer. Add two dashes of Angostura bitters. Stir gently.',
    it: 'Versare gin, brandy e succo di lime in un bicchiere highball pieno di ghiaccio. Completare con ginger beer. Aggiungere due gocce di Angostura bitter. Mescolare delicatamente.',
    vi: 'Đổ gin, brandy và nước chanh vào ly highball đầy đá. Phủ bia gừng lên trên. Thêm hai giọt Angostura bitters. Khuấy nhẹ nhàng.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Mint sprig and lime wheel',
    it: 'Rametto di menta e rondella di lime',
    vi: 'Cành bạc hà và lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN', 'ING_BRANDY'],

  flavor_profile: ['spicy', 'refreshing', 'complex'],

  abv_estimate: 10,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
    spice_level: 2,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['summer', 'spring'],
  occasion_tags: ['brunch', 'party', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['original-suffering-bastard'],

  notes_for_staff:
    "Use quality ginger beer for best results. The combination of gin and brandy is traditional - don't substitute. Originally created as a hangover cure.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/suffering-bastard/',
    notes: 'IBA Official Recipe',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
