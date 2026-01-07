/**
 * IBA New Era Drinks: Three Dots and a Dash
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const threeDotsAndADash: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  slug: 'three-dots-and-a-dash',
  stable_key: 'e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3',

  name: {
    en: 'Three Dots and a Dash',
    it: 'Three Dots and a Dash',
    vi: 'Three Dots and a Dash',
    ko: '쓰리 닷츠 앤 어 대시',
    ja: 'スリー・ドッツ・アンド・ア・ダッシュ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'tiki', 'rum', 'tropical', 'complex'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A complex tiki classic combining multiple rums with tropical fruit flavors and exotic spices. The name refers to Morse code for "V" (for Victory), created during World War II. This elaborate cocktail showcases the artistry of tiki culture with its layered flavors and dramatic presentation.',
    it: 'Un classico tiki complesso che combina più rum con sapori di frutta tropicale e spezie esotiche. Il nome si riferisce al codice Morse per "V" (per Vittoria), creato durante la Seconda Guerra Mondiale. Questo cocktail elaborato mostra l\'arte della cultura tiki con i suoi sapori stratificati e la presentazione drammatica.',
    vi: 'Một tiki cổ điển phức tạp kết hợp nhiều loại rum với hương vị trái cây nhiệt đới và gia vị kỳ lạ. Tên gọi đề cập đến mã Morse cho "V" (Chiến thắng), được tạo ra trong Thế chiến II. Cocktail tinh xảo này thể hiện nghệ thuật văn hóa tiki với hương vị nhiều lớp và cách trình bày ấn tượng.',
  },

  history: {
    created_year: '1941',
    origin: {
      city: 'Hollywood',
      bar: "Don the Beachcomber's",
      country: 'USA',
    },
    creator: {
      name: 'Donn Beach (Ernest Raymond Beaumont Gantt)',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Donn Beach (Don the Beachcomber) in 1941 during World War II. The cocktail\'s name comes from Morse code: three dots and a dash represents the letter "V" for Victory. The garnish of three cherries and a pineapple chunk on a skewer literally illustrates the Morse code pattern. It became one of the most celebrated tiki drinks, exemplifying the complex, multi-rum style that defined the era.',
      it: 'Creato da Donn Beach (Don the Beachcomber) nel 1941 durante la Seconda Guerra Mondiale. Il nome del cocktail deriva dal codice Morse: tre punti e una linea rappresentano la lettera "V" per Vittoria. La guarnizione di tre ciliegie e un pezzo di ananas su uno spiedo illustra letteralmente il modello del codice Morse. È diventato uno dei drink tiki più celebrati, esemplificando lo stile complesso e multi-rum che ha definito l\'epoca.',
      vi: 'Được tạo ra bởi Donn Beach (Don the Beachcomber) năm 1941 trong Thế chiến II. Tên cocktail đến từ mã Morse: ba chấm và một gạch đại diện cho chữ "V" nghĩa là Chiến thắng. Phần trang trí ba quả cherry và một miếng dứa trên que꼬 minh họa trực quan mẫu mã Morse. Nó trở thành một trong những đồ uống tiki được tôn vinh nhất, thể hiện phong cách phức tạp nhiều rum đặc trưng của thời đại.',
    },
    named_after: {
      en: 'Named after Morse code for the letter "V" (Victory) - three dots and a dash (···-), a symbol of Allied victory in World War II.',
      it: 'Prende il nome dal codice Morse per la lettera "V" (Vittoria) - tre punti e una linea (···-), simbolo della vittoria degli Alleati nella Seconda Guerra Mondiale.',
      vi: 'Được đặt tên theo mã Morse cho chữ "V" (Chiến thắng) - ba chấm và một gạch (···-), biểu tượng chiến thắng của Đồng minh trong Thế chiến II.',
    },
  },

  taste: {
    profile: ['tropical', 'fruity', 'complex', 'spiced'],
    description: {
      en: 'Complex and layered with tropical fruit flavors, warm spice notes, and a balanced rum backbone. The combination of multiple rums creates depth while citrus and allspice add brightness and exotic character.',
      it: 'Complesso e stratificato con sapori di frutta tropicale, note di spezie calde e una struttura equilibrata di rum. La combinazione di più rum crea profondità mentre agrumi e pimento aggiungono luminosità e carattere esotico.',
      vi: 'Phức tạp và nhiều lớp với hương vị trái cây nhiệt đới, nốt gia vị ấm áp và nền rum cân bằng. Sự kết hợp của nhiều loại rum tạo chiều sâu trong khi cam chanh và hạt tiêu Jamaica thêm độ tươi sáng và tính cách kỳ lạ.',
    },
    first_impression: {
      en: 'Tropical fruit sweetness with honey and citrus brightness',
      it: 'Dolcezza di frutta tropicale con miele e luminosità di agrumi',
      vi: 'Vị ngọt trái cây nhiệt đới với mật ong và độ tươi cam chanh',
    },
    finish: {
      en: 'Long, warm finish with lingering spice and rum character',
      it: 'Finale lungo e caldo con spezie persistenti e carattere di rum',
      vi: 'Kết thúc dài, ấm với gia vị kéo dài và đặc tính rum',
    },
    balance: {
      en: 'Perfectly balanced between sweet, sour, and spirit strength with complex spice undertones',
      it: 'Perfettamente bilanciato tra dolce, acido e forza alcolica con sottotoni speziati complessi',
      vi: 'Cân bằng hoàn hảo giữa ngọt, chua và độ mạnh rượu với âm hưởng gia vị phức tạp',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['celebration', 'tiki_party', 'summer_gathering', 'special_occasion'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs wonderfully with Polynesian cuisine, grilled pineapple, coconut shrimp, teriyaki chicken, and tropical fruit platters.',
      it: 'Si abbina meravigliosamente con cucina polinesiana, ananas grigliato, gamberi al cocco, pollo teriyaki e vassoi di frutta tropicale.',
      vi: 'Kết hợp tuyệt vời với ẩm thực Polynesia, dứa nướng, tôm dừa, gà teriyaki và đĩa trái cây nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for tiki enthusiasts and rum lovers who appreciate complex, multi-layered cocktails. Ideal for those seeking an authentic piece of cocktail history with dramatic presentation.',
      it: 'Perfetto per gli appassionati di tiki e gli amanti del rum che apprezzano cocktail complessi e stratificati. Ideale per chi cerca un autentico pezzo di storia dei cocktail con presentazione drammatica.',
      vi: 'Hoàn hảo cho người đam mê tiki và yêu rum, những ai đánh giá cao cocktail phức tạp nhiều lớp. Lý tưởng cho những ai tìm kiếm một mảnh lịch sử cocktail đích thực với cách trình bày ấn tượng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_AGED',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Aged rum', it: 'Rum invecchiato', vi: 'Rum ủ' },
    },
    {
      ingredient_id: 'ING_RUM_DEMERARA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Demerara rum', it: 'Rum Demerara', vi: 'Rum Demerara' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_HONEY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Honey syrup', it: 'Sciroppo di miele', vi: 'Siro mật ong' },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_ALLSPICE_DRAM',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Allspice dram (Pimento dram)', it: 'Pimento dram', vi: 'Pimento dram' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with crushed ice. Shake vigorously until well-chilled. Pour unstrained (with the ice) into a tiki mug or tall glass. Garnish elaborately with three cherries and a pineapple chunk on a cocktail pick, representing the Morse code pattern.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio tritato. Shakerare vigorosamente fino a raffreddare bene. Versare senza filtrare (con il ghiaccio) in un tiki mug o bicchiere alto. Guarnire elaboratamente con tre ciliegie e un pezzo di ananas su uno stuzzicadenti, rappresentando il modello del codice Morse.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá bào. Lắc mạnh cho đến khi lạnh kỹ. Đổ không lọc (cùng đá) vào cốc tiki hoặc ly cao. Trang trí công phu với ba quả cherry và một miếng dứa trên que꼬 cocktail, thể hiện mẫu mã Morse.',
  },

  glass: 'Tiki mug or tall glass',

  garnish: {
    en: 'Three maraschino cherries and pineapple chunk on a pick (representing Morse code ···-)',
    it: 'Tre ciliegie maraschino e pezzo di ananas su uno stuzzicadenti (rappresentando il codice Morse ···-)',
    vi: 'Ba quả cherry maraschino và miếng dứa trên que (thể hiện mã Morse ···-)',
  },

  ice: 'crushed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_AGED', 'ING_RUM_DEMERARA'],

  flavor_profile: ['tropical', 'fruity', 'complex', 'spiced'],

  abv_estimate: 15,

  calories_estimate: 240,

  difficulty: 'hard',

  prep_time_seconds: 180,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['celebration', 'party', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['modern-tiki-variations'],

  notes_for_staff:
    'Multiple rum blend is essential for authenticity. Honey syrup is 1:1 honey to water. Falernum and allspice dram are specialty tiki ingredients - keep in stock. Garnish is important for visual storytelling.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/three-dots-and-a-dash/',
    notes:
      "IBA Official Recipe. Historical information from Beachbum Berry's tiki cocktail research.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
