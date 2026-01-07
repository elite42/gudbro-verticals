/**
 * IBA New Era Drinks: Illegal
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const illegal: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
  slug: 'illegal',
  stable_key: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',

  name: {
    en: 'Illegal',
    it: 'Illegal',
    vi: 'Illegal',
    ko: '일리걸',
    ja: 'イリーガル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'mezcal', 'smoky', 'complex', 'prohibition'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A smoky, sophisticated cocktail featuring mezcal, aged rum, maraschino liqueur, and falernum. This modern classic showcases the complex interplay between mezcal's smoke, rum's richness, and exotic tiki spices, creating a drink that's both mysterious and utterly compelling.",
    it: 'Un cocktail affumicato e sofisticato con mezcal, rum invecchiato, liquore di maraschino e falernum. Questo classico moderno mostra il complesso gioco tra il fumo del mezcal, la ricchezza del rum e le spezie tiki esotiche, creando una bevanda misteriosa e assolutamente avvincente.',
    vi: 'Một cocktail khói, tinh tế với mezcal, rum ủ, rượu mùi maraschino và falernum. Tác phẩm hiện đại này thể hiện sự tương tác phức tạp giữa khói mezcal, sự đậm đà của rum và gia vị tiki kỳ lạ, tạo ra đồ uống vừa bí ẩn vừa hấp dẫn tuyệt đối.',
  },

  history: {
    created_year: '2011',
    origin: {
      city: 'New York City',
      bar: 'Pouring Ribbons',
      country: 'USA',
    },
    creator: {
      name: 'Joaquín Simó',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Joaquín Simó at Pouring Ribbons in New York City in 2011. Simó was inspired by a drink from a 1930s Cuban cocktail book called "Ilegal" and reimagined it with mezcal. The name has a double meaning: referencing both the historical drink and the era when mezcal was difficult to import legally into the United States. The cocktail became an instant hit and helped popularize mezcal in craft cocktail culture, showcasing how this smoky spirit could be used in complex, elegant drinks.',
      it: 'Creato da Joaquín Simó al Pouring Ribbons a New York City nel 2011. Simó si ispirò a una bevanda da un libro di cocktail cubani degli anni \'30 chiamata "Ilegal" e la reimmaginò con il mezcal. Il nome ha un doppio significato: riferimento sia alla bevanda storica che all\'era in cui il mezcal era difficile da importare legalmente negli Stati Uniti. Il cocktail divenne un successo immediato e contribuì a rendere popolare il mezcal nella cultura dei cocktail artigianali, mostrando come questo spirito affumicato potesse essere utilizzato in bevande complesse ed eleganti.',
      vi: 'Được tạo ra bởi Joaquín Simó tại Pouring Ribbons ở New York City năm 2011. Simó lấy cảm hứng từ một đồ uống từ sách cocktail Cuba những năm 1930 tên "Ilegal" và tái tưởng tượng nó với mezcal. Cái tên có nghĩa kép: đề cập đến cả đồ uống lịch sử và thời kỳ khi mezcal khó nhập khẩu hợp pháp vào Hoa Kỳ. Cocktail trở thành cú hit ngay lập tức và giúp phổ biến mezcal trong văn hóa cocktail thủ công, cho thấy rượu mạnh khói này có thể được dùng trong đồ uống phức tạp, thanh lịch.',
    },
    named_after: {
      en: 'Named "Illegal" referencing both a 1930s Cuban cocktail and the era when mezcal was difficult to import legally into the US.',
      it: 'Chiamato "Illegal" con riferimento sia a un cocktail cubano degli anni \'30 che all\'era in cui il mezcal era difficile da importare legalmente negli Stati Uniti.',
      vi: 'Được đặt tên "Illegal" đề cập đến cả cocktail Cuba những năm 1930 và thời kỳ khi mezcal khó nhập khẩu hợp pháp vào Mỹ.',
    },
  },

  taste: {
    profile: ['smoky', 'complex', 'spiced', 'sophisticated'],
    description: {
      en: "Beautifully layered with mezcal's signature smoke melding with aged rum's caramel richness, maraschino's cherry-almond complexity, and falernum's exotic spices. The lime provides brightness while bitters add depth. Each sip reveals new dimensions.",
      it: 'Magnificamente stratificato con il caratteristico fumo del mezcal che si fonde con la ricchezza caramellata del rum invecchiato, la complessità ciliegia-mandorla del maraschino e le spezie esotiche del falernum. Il lime fornisce luminosità mentre i bitter aggiungono profondità. Ogni sorso rivela nuove dimensioni.',
      vi: 'Nhiều lớp tuyệt đẹp với khói đặc trưng của mezcal hòa quyện với sự đậm đà caramel của rum ủ, độ phức tạp cherry-hạnh nhân của maraschino và gia vị kỳ lạ của falernum. Chanh cung cấp độ sáng trong khi bitters thêm chiều sâu. Mỗi ngụm tiết lộ những chiều hướng mới.',
    },
    first_impression: {
      en: 'Smoky mezcal with rum sweetness and exotic spice aromatics',
      it: 'Mezcal affumicato con dolcezza di rum e aromatici speziati esotici',
      vi: 'Mezcal khói với vị ngọt rum và hương thơm gia vị kỳ lạ',
    },
    finish: {
      en: 'Long, complex finish with lingering smoke, spice, and subtle bitterness',
      it: 'Finale lungo e complesso con fumo persistente, spezie e sottile amarezza',
      vi: 'Kết thúc dài, phức tạp với khói kéo dài, gia vị và vị đắng tinh tế',
    },
    balance: {
      en: 'Expertly balanced between smoke, sweetness, spice, and citrus with remarkable depth',
      it: 'Magistralmente bilanciato tra fumo, dolcezza, spezie e agrumi con profondità straordinaria',
      vi: 'Cân bằng chuyên nghiệp giữa khói, vị ngọt, gia vị và cam chanh với chiều sâu đáng kinh ngạc',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['date_night', 'cocktail_party', 'special_occasion', 'nightcap'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with grilled meats, Mexican cuisine, barbecue, dark chocolate, and bold cheeses.',
      it: 'Eccellente con carni alla griglia, cucina messicana, barbecue, cioccolato fondente e formaggi audaci.',
      vi: 'Tuyệt vời với thịt nướng, ẩm thực Mexico, thịt nướng BBQ, chocolate đen và phô mai đậm đà.',
    },
    ideal_for: {
      en: 'Perfect for mezcal enthusiasts and adventurous drinkers who appreciate smoky, complex cocktails. Ideal for those seeking a sophisticated spirit-forward drink with tiki influences.',
      it: 'Perfetto per gli appassionati di mezcal e bevitori avventurosi che apprezzano cocktail affumicati e complessi. Ideale per chi cerca una bevanda sofisticata incentrata sugli spiriti con influenze tiki.',
      vi: 'Hoàn hảo cho người đam mê mezcal và người uống phiêu lưu đánh giá cao cocktail khói, phức tạp. Lý tưởng cho những ai tìm kiếm đồ uống tinh tế hướng rượu mạnh với ảnh hưởng tiki.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_MEZCAL',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Mezcal', it: 'Mezcal', vi: 'Mezcal' },
    },
    {
      ingredient_id: 'ING_RUM_AGED',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Aged rum', it: 'Rum invecchiato', vi: 'Rum ủ' },
    },
    {
      ingredient_id: 'ING_MARASCHINO_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Maraschino liqueur',
        it: 'Liquore di maraschino',
        vi: 'Rượu mùi maraschino',
      },
    },
    {
      ingredient_id: 'ING_FALERNUM',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Falernum', it: 'Falernum', vi: 'Falernum' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 2, unit: 'dashes' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Double strain into a chilled coupe glass. Garnish with a lime wheel or twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare due volte in una coppa raffreddata. Guarnire con una ruota di lime o scorza.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc kép vào ly coupe đã làm lạnh. Trang trí với vòng chanh hoặc vỏ xoắn.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lime wheel or twist',
    it: 'Ruota di lime o scorza',
    vi: 'Vòng chanh hoặc vỏ xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_MEZCAL'],

  flavor_profile: ['smoky', 'complex', 'spiced', 'sophisticated'],

  abv_estimate: 22,

  calories_estimate: 170,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['date_night', 'cocktail_party', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['legal-cocktail', 'illegal-on-rocks'],

  notes_for_staff:
    'Quality mezcal is essential - use Espadin or similar. Luxardo maraschino preferred. Falernum adds critical spice notes. Double strain for clarity. Smoke should be present but balanced.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/illegal/',
    notes: 'IBA Official Recipe. Created by Joaquín Simó at Pouring Ribbons, NYC, 2011.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
