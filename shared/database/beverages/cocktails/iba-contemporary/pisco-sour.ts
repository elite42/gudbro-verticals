/**
 * IBA Contemporary Classics: Pisco Sour
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const piscoSour: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  slug: 'pisco-sour',
  stable_key: 'pisco_sour_iba_contemporary_2025',

  name: {
    en: 'Pisco Sour',
    it: 'Pisco Sour',
    vi: 'Pisco Sour',
    ko: '피스코 사워',
    ja: 'ピスコ・サワー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'peruvian', 'sour', 'classic', 'foamy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'Peru\'s national cocktail, combining pisco (grape brandy) with lime juice, simple syrup, egg white, and Angostura bitters. The egg white creates a luxurious foam cap, making this sour cocktail exceptionally smooth and elegant.',
    it: 'Il cocktail nazionale del Perù, che combina pisco (brandy d\'uva) con succo di lime, sciroppo semplice, albume d\'uovo e Angostura bitters. L\'albume crea una schiuma lussuosa, rendendo questo cocktail sour eccezionalmente morbido ed elegante.',
    vi: 'Cocktail quốc gia của Peru, kết hợp pisco (brandy nho) với nước chanh, siro đường, lòng trắng trứng và Angostura bitters. Lòng trắng trứng tạo ra lớp bọt sang trọng, làm cho cocktail chua này mượt mà và thanh lịch đặc biệt.',
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Lima',
      bar: 'Morris\' Bar',
      country: 'Peru',
    },
    creator: {
      name: 'Victor Vaughen Morris',
      profession: 'bartender',
    },
    story: {
      en: 'Created by American bartender Victor Vaughen Morris in the early 1920s at his bar in Lima, Peru. Morris adapted the classic whiskey sour recipe using pisco, Peru\'s national spirit made from grapes. The drink became Peru\'s national cocktail and is celebrated annually on the first Saturday of February as "Pisco Sour Day." Chile also claims the Pisco Sour, leading to an ongoing friendly rivalry between the two countries.',
      it: 'Creato dal barman americano Victor Vaughen Morris nei primi anni \'20 nel suo bar a Lima, Perù. Morris adattò la classica ricetta del whiskey sour usando il pisco, lo spirito nazionale del Perù fatto dall\'uva. Il drink divenne il cocktail nazionale del Perù ed è celebrato annualmente il primo sabato di febbraio come "Pisco Sour Day." Anche il Cile rivendica il Pisco Sour, portando a una rivalità amichevole continua tra i due paesi.',
      vi: 'Được tạo ra bởi bartender người Mỹ Victor Vaughen Morris vào đầu những năm 1920 tại quán bar của ông ở Lima, Peru. Morris đã điều chỉnh công thức whiskey sour cổ điển bằng cách sử dụng pisco, rượu mạnh quốc gia của Peru làm từ nho. Thức uống trở thành cocktail quốc gia của Peru và được kỷ niệm hàng năm vào thứ Bảy đầu tiên của tháng 2 như "Ngày Pisco Sour." Chile cũng tuyên bố Pisco Sour, dẫn đến một cuộc cạnh tranh thân thiện đang diễn ra giữa hai quốc gia.',
    },
    named_after: {
      en: 'Named after pisco, the grape brandy spirit that forms its base.',
      it: 'Prende il nome dal pisco, il brandy d\'uva che forma la sua base.',
      vi: 'Được đặt theo tên pisco, rượu mạnh brandy nho tạo nên cơ sở của nó.',
    },
  },

  taste: {
    profile: ['sour', 'citrus', 'smooth', 'aromatic'],
    description: {
      en: 'Silky smooth with a perfect balance of tart and sweet. Fresh lime provides bright acidity, pisco brings floral, fruity grape notes, and egg white creates velvety texture. Angostura bitters add aromatic complexity to the foam.',
      it: 'Setoso e morbido con un perfetto equilibrio di aspro e dolce. Il lime fresco fornisce acidità brillante, il pisco porta note floreali e fruttate d\'uva, e l\'albume crea una consistenza vellutata. Gli Angostura bitters aggiungono complessità aromatica alla schiuma.',
      vi: 'Mượt mà như lụa với sự cân bằng hoàn hảo giữa chua và ngọt. Chanh tươi cung cấp độ chua sáng, pisco mang đến hương hoa, trái cây nho, và lòng trắng trứng tạo kết cấu mượt mà. Angostura bitters thêm độ phức tạp thơm ngát vào bọt.',
    },
    first_impression: {
      en: 'Aromatic foam with bitters, followed by tart lime',
      it: 'Schiuma aromatica con bitters, seguita da lime aspro',
      vi: 'Bọt thơm với bitters, theo sau là chanh chua',
    },
    finish: {
      en: 'Clean, crisp finish with lingering citrus and grape notes',
      it: 'Finale pulito e fresco con note persistenti di agrumi e uva',
      vi: 'Kết thúc sạch, sắc nét với hương chanh và nho kéo dài',
    },
    balance: {
      en: 'Perfectly balanced sour cocktail with luxurious texture',
      it: 'Cocktail sour perfettamente bilanciato con consistenza lussuosa',
      vi: 'Cocktail chua cân bằng hoàn hảo với kết cấu sang trọng',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening'],
    occasions: ['aperitivo', 'celebration', 'date_night'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with Peruvian ceviche, seafood, grilled fish, empanadas, and light appetizers. The acidity complements seafood beautifully.',
      it: 'Eccellente con ceviche peruviano, frutti di mare, pesce alla griglia, empanadas e antipasti leggeri. L\'acidità complementa magnificamente i frutti di mare.',
      vi: 'Tuyệt vời với ceviche Peru, hải sản, cá nướng, empanadas và món khai vị nhẹ. Độ chua bổ sung hoàn hảo cho hải sản.',
    },
    ideal_for: {
      en: 'Perfect for sour cocktail lovers and those who appreciate elegant, classic drinks. Great for special occasions and introducing people to pisco.',
      it: 'Perfetto per gli amanti dei cocktail sour e chi apprezza drink eleganti e classici. Ottimo per occasioni speciali e per presentare il pisco alle persone.',
      vi: 'Hoàn hảo cho người yêu cocktail chua và những ai đánh giá cao đồ uống thanh lịch, cổ điển. Tuyệt vời cho những dịp đặc biệt và giới thiệu mọi người với pisco.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PISCO',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Pisco', it: 'Pisco', vi: 'Pisco' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Simple syrup', it: 'Sciroppo semplice', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 1, unit: 'whole' },
      display_name: { en: 'Egg white', it: 'Albume d\'uovo', vi: 'Lòng trắng trứng' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 3, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
      note: { en: 'for garnish', it: 'per guarnizione', vi: 'để trang trí' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add pisco, lime juice, simple syrup, and egg white to shaker. Dry shake (without ice) vigorously for 15 seconds. Add ice and shake again until well chilled. Strain into a chilled cocktail glass. Drop 3 dashes of Angostura bitters on foam and garnish.',
    it: 'Aggiungere pisco, succo di lime, sciroppo semplice e albume nello shaker. Dry shake (senza ghiaccio) vigorosamente per 15 secondi. Aggiungere ghiaccio e shakerare di nuovo fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Versare 3 gocce di Angostura bitters sulla schiuma e guarnire.',
    vi: 'Thêm pisco, nước chanh, siro đường và lòng trắng trứng vào shaker. Dry shake (không có đá) mạnh mẽ trong 15 giây. Thêm đá và lắc lại cho đến khi lạnh tốt. Lọc vào ly cocktail đã làm lạnh. Nhỏ 3 giọt Angostura bitters lên bọt và trang trí.',
  },

  glass: 'Cocktail glass (Coupe)',

  garnish: {
    en: '3 drops Angostura bitters on foam',
    it: '3 gocce di Angostura bitters sulla schiuma',
    vi: '3 giọt Angostura bitters trên bọt',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_PISCO'],

  flavor_profile: ['sour', 'citrus', 'smooth', 'aromatic'],

  abv_estimate: 15,

  calories_estimate: 180,

  difficulty: 'medium',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['eggs', 'sulphites'],
    intolerances: ['alcohol', 'eggs', 'sulphites_intolerance'],
    suitable_for_diets: ['pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['aperitivo', 'celebration', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['chilean-pisco-sour', 'pisco-punch'],

  notes_for_staff: 'Dry shake first (no ice) to emulsify egg white properly. Then add ice and shake again. Use fresh egg white - pasteurized works but creates less foam. Drop bitters precisely on foam for visual effect.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/pisco-sour/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
