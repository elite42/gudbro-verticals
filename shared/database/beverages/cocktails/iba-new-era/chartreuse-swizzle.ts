/**
 * IBA New Era Drinks: Chartreuse Swizzle
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const chartreuseSwizzle: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
  slug: 'chartreuse-swizzle',
  stable_key: 'd9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8',

  name: {
    en: 'Chartreuse Swizzle',
    it: 'Chartreuse Swizzle',
    vi: 'Chartreuse Swizzle',
    ko: '샤르트뢰즈 스위즐',
    ja: 'シャルトリューズ・スウィズル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'tiki', 'herbal', 'refreshing', 'swizzle'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern tiki classic featuring the herbaceous complexity of Green Chartreuse swizzled with pineapple, lime, and falernum over crushed ice. This refreshing cocktail combines Caribbean swizzle tradition with French herbal liqueur sophistication.',
    it: 'Un classico tiki moderno che presenta la complessità erbacea della Chartreuse Verde miscelata con ananas, lime e falernum su ghiaccio tritato. Questo cocktail rinfrescante combina la tradizione caraibica dello swizzle con la raffinatezza del liquore erbaceo francese.',
    vi: 'Một tác phẩm tiki hiện đại với độ phức tạp thảo mộc của Green Chartreuse được swizzle với dứa, chanh và falernum trên đá bào. Cocktail sảng khoái này kết hợp truyền thống swizzle Caribbean với sự tinh tế của rượu mùi thảo mộc Pháp.',
  },

  history: {
    created_year: '2004',
    origin: {
      city: 'San Francisco',
      bar: 'Alembic',
      country: 'USA',
    },
    creator: {
      name: 'Marcovaldo Dionysos',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Marcovaldo Dionysos at the Alembic bar in San Francisco around 2004. The drink was inspired by classic Caribbean swizzles but substitutes Green Chartreuse for rum, creating a more herbaceous and complex profile. The swizzle technique, using a traditional swizzle stick or bar spoon, aerates the drink and creates a frosty, diluted consistency perfect for sipping. The cocktail gained popularity during the tiki revival of the 2000s.',
      it: 'Creato da Marcovaldo Dionysos al bar Alembic di San Francisco intorno al 2004. La bevanda si ispirò agli swizzle caraibici classici ma sostituisce la Chartreuse Verde al rum, creando un profilo più erbaceo e complesso. La tecnica dello swizzle, usando un tradizionale swizzle stick o cucchiaio da bar, aera la bevanda e crea una consistenza gelida e diluita perfetta per sorseggiare. Il cocktail guadagnò popolarità durante il revival tiki degli anni 2000.',
      vi: 'Được tạo ra bởi Marcovaldo Dionysos tại quầy bar Alembic ở San Francisco khoảng năm 2004. Đồ uống lấy cảm hứng từ swizzle Caribbean cổ điển nhưng thay thế Green Chartreuse cho rum, tạo ra hồ sơ thảo mộc và phức tạp hơn. Kỹ thuật swizzle, sử dụng que swizzle truyền thống hoặc thìa bar, sục khí đồ uống và tạo độ lạnh băng, pha loãng hoàn hảo để nhâm nhi. Cocktail trở nên phổ biến trong thời kỳ phục hưng tiki những năm 2000.',
    },
    named_after: {
      en: 'Named for the "swizzle" technique of rapidly rotating a stick or spoon in crushed ice to chill and dilute the drink, combined with the dominant Chartreuse flavor.',
      it: 'Prende il nome dalla tecnica "swizzle" di ruotare rapidamente un bastoncino o cucchiaio nel ghiaccio tritato per raffreddare e diluire la bevanda, combinata con il sapore dominante della Chartreuse.',
      vi: 'Được đặt tên theo kỹ thuật "swizzle" quay nhanh que hoặc thìa trong đá bào để làm lạnh và pha loãng đồ uống, kết hợp với hương vị Chartreuse chủ đạo.',
    },
  },

  taste: {
    profile: ['herbal', 'tropical', 'complex', 'refreshing'],
    description: {
      en: "Intensely herbaceous with Green Chartreuse's 130 botanical complexity balanced by tropical pineapple sweetness, tart lime, and aromatic falernum spices. The swizzle dilution makes it remarkably smooth and refreshing.",
      it: "Intensamente erbaceo con la complessità di 130 botanici della Chartreuse Verde bilanciata dalla dolcezza tropicale dell'ananas, lime aspro e spezie aromatiche del falernum. La diluizione dello swizzle lo rende straordinariamente morbido e rinfrescante.",
      vi: 'Thảo mộc mãnh liệt với độ phức tạp 130 thực vật của Green Chartreuse cân bằng bởi vị ngọt dứa nhiệt đới, chanh chua và gia vị thơm của falernum. Sự pha loãng swizzle làm cho nó mượt mà và sảng khoái đáng kinh ngạc.',
    },
    first_impression: {
      en: 'Bold herbal Chartreuse with tropical pineapple and lime brightness',
      it: 'Chartreuse erbacea audace con luminosità tropicale di ananas e lime',
      vi: 'Chartreuse thảo mộc táo bạo với độ tươi sáng dứa và chanh nhiệt đới',
    },
    finish: {
      en: 'Long, complex finish with lingering herbal notes and tropical warmth',
      it: 'Finale lungo e complesso con note erbacee persistenti e calore tropicale',
      vi: 'Kết thúc dài, phức tạp với nốt thảo mộc kéo dài và hơi ấm nhiệt đới',
    },
    balance: {
      en: 'Masterfully balanced between intense herbal complexity and tropical fruit sweetness',
      it: 'Magistralmente bilanciato tra intensa complessità erbacea e dolcezza di frutta tropicale',
      vi: 'Cân bằng điêu luyện giữa độ phức tạp thảo mộc mãnh liệt và vị ngọt trái cây nhiệt đới',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['tiki_party', 'garden_party', 'special_occasion', 'summer_gathering'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs well with Caribbean jerk dishes, grilled seafood, Thai cuisine, tropical fruits, and herb-crusted meats.',
      it: 'Si abbina bene con piatti jerk caraibici, frutti di mare alla griglia, cucina thailandese, frutti tropicali e carni in crosta di erbe.',
      vi: 'Kết hợp tốt với món jerk Caribbean, hải sản nướng, ẩm thực Thái, trái cây nhiệt đới và thịt phủ thảo mộc.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who love herbal complexity in tropical cocktails. Ideal for Chartreuse enthusiasts and those seeking a sophisticated tiki experience. Great for hot weather sipping.',
      it: "Perfetto per bevitori avventurosi che amano la complessità erbacea nei cocktail tropicali. Ideale per gli appassionati di Chartreuse e chi cerca un'esperienza tiki sofisticata. Ottimo per sorseggiare con tempo caldo.",
      vi: 'Hoàn hảo cho người uống phiêu lưu yêu thích độ phức tạp thảo mộc trong cocktail nhiệt đới. Lý tưởng cho người đam mê Chartreuse và những ai tìm kiếm trải nghiệm tiki tinh tế. Tuyệt vời để nhâm nhi thời tiết nóng.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CHARTREUSE_GREEN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Green Chartreuse', it: 'Chartreuse Verde', vi: 'Green Chartreuse' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
  ],

  method: 'swizzle',

  instructions: {
    en: 'Add all ingredients to a Collins or highball glass. Fill with crushed ice. Insert a swizzle stick or bar spoon and rapidly rotate between your palms for 10-15 seconds until the outside of the glass frosts. Top with more crushed ice to form a snow cone. Garnish with a pineapple frond and fresh mint sprig.',
    it: "Aggiungere tutti gli ingredienti in un bicchiere Collins o highball. Riempire con ghiaccio tritato. Inserire uno swizzle stick o cucchiaio da bar e ruotare rapidamente tra i palmi per 10-15 secondi fino a quando l'esterno del bicchiere si congela. Completare con più ghiaccio tritato per formare un cono di neve. Guarnire con una fronda di ananas e rametto di menta fresca.",
    vi: 'Thêm tất cả nguyên liệu vào ly Collins hoặc highball. Đổ đầy đá bào. Đặt que swizzle hoặc thìa bar và quay nhanh giữa lòng bàn tay trong 10-15 giây cho đến khi bên ngoài ly đóng băng. Thêm đá bào để tạo thành nón tuyết. Trang trí với lá dứa và cành bạc hà tươi.',
  },

  glass: 'Collins or Highball glass',

  garnish: {
    en: 'Pineapple frond and fresh mint sprig',
    it: 'Fronda di ananas e rametto di menta fresca',
    vi: 'Lá dứa và cành bạc hà tươi',
  },

  ice: 'crushed',

  serving_style: 'swizzle',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CHARTREUSE_GREEN'],

  flavor_profile: ['herbal', 'tropical', 'complex', 'refreshing'],

  abv_estimate: 14,

  calories_estimate: 210,

  difficulty: 'medium',

  prep_time_seconds: 120,

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
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['party', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['yellow-chartreuse-swizzle', 'rum-chartreuse-swizzle'],

  notes_for_staff:
    'Green Chartreuse is essential (55% ABV). Proper swizzle technique creates frost on outside of glass. Use plenty of crushed ice. Falernum adds essential spice notes. Fresh pineapple juice preferred.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/chartreuse-swizzle/',
    notes: 'IBA Official Recipe. Created by Marcovaldo Dionysos at Alembic, San Francisco.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
