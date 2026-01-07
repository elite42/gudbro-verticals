/**
 * Famous Cocktails: Spring Forward
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const springForward: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  slug: 'spring-forward',
  stable_key: 'a3b2c1d0e9f8a7b6c594839281706958fecdab06',

  name: {
    en: 'Spring Forward',
    it: 'Spring Forward',
    vi: 'Spring Forward',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'gin', 'floral', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A floral and refreshing gin cocktail featuring elderflower liqueur, lemon juice, and Aperol. The Spring Forward captures the essence of springtime in a glass with its bright, botanical flavors.',
    it: "Un cocktail floreale e rinfrescante a base di gin con liquore di fiori di sambuco, succo di limone e Aperol. Il Spring Forward cattura l'essenza della primavera in un bicchiere con i suoi sapori botanici e luminosi.",
    vi: 'Một loại cocktail gin hoa và sảng khoái với rượu mùi hoa cơm cháy, nước chanh và Aperol. Spring Forward nắm bắt bản chất của mùa xuân trong ly với hương vị thực vật sáng.',
  },

  history: {
    created_year: '2009',
    origin: {
      city: 'New York City',
      bar: "PDT (Please Don't Tell)",
      country: 'USA',
    },
    creator: {
      name: 'Jim Meehan',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Jim Meehan at the legendary PDT in New York City in 2009, the Spring Forward was designed as a seasonal cocktail to celebrate the arrival of spring. Meehan combined gin with elderflower liqueur and Aperol to create a drink that perfectly captures the fresh, floral character of the season. The name cleverly references both the spring season and the daylight saving time change.',
      it: "Creato da Jim Meehan al leggendario PDT di New York City nel 2009, il Spring Forward è stato progettato come cocktail stagionale per celebrare l'arrivo della primavera. Meehan ha combinato gin con liquore di fiori di sambuco e Aperol per creare una bevanda che cattura perfettamente il carattere fresco e floreale della stagione. Il nome fa riferimento abilmente sia alla stagione primaverile che al cambio dell'ora legale.",
      vi: 'Được tạo ra bởi Jim Meehan tại PDT huyền thoại ở New York City năm 2009, Spring Forward được thiết kế như một cocktail theo mùa để chào đón mùa xuân. Meehan kết hợp gin với rượu mùi hoa cơm cháy và Aperol để tạo ra đồ uống nắm bắt hoàn hảo đặc tính tươi mát, hoa của mùa. Tên gọi khéo léo ám chỉ cả mùa xuân và thay đổi giờ tiết kiệm ánh sáng ban ngày.',
    },
    named_after: {
      en: 'Named "Spring Forward" referencing both the spring season and the "spring forward" daylight saving time change that occurs in spring.',
      it: 'Chiamato "Spring Forward" facendo riferimento sia alla stagione primaverile che al cambio dell\'ora legale "spring forward" che avviene in primavera.',
      vi: 'Được đặt tên "Spring Forward" ám chỉ cả mùa xuân và thay đổi giờ tiết kiệm ánh sáng ban ngày "spring forward" xảy ra vào mùa xuân.',
    },
  },

  taste: {
    profile: ['floral', 'citrus', 'refreshing'],
    description: {
      en: 'Light, floral, and refreshing with botanical complexity. Gin provides a juniper backbone, elderflower liqueur adds delicate floral sweetness, lemon brings bright acidity, and Aperol contributes subtle bitter-orange notes.',
      it: "Leggero, floreale e rinfrescante con complessità botanica. Il gin fornisce una struttura di ginepro, il liquore di fiori di sambuco aggiunge dolcezza floreale delicata, il limone porta acidità brillante e l'Aperol contribuisce con note sottili di arancia amara.",
      vi: 'Nhẹ nhàng, hoa và sảng khoái với độ phức tạp thực vật. Gin mang đến xương sống bách xù, rượu mùi hoa cơm cháy thêm vị ngọt hoa tinh tế, chanh mang độ chua sáng, và Aperol đóng góp hương cam đắng tinh tế.',
    },
    first_impression: {
      en: 'Bright elderflower and citrus hit first, followed by gin botanicals and subtle bitterness',
      it: 'Fiori di sambuco luminosi e agrumi colpiscono per primi, seguiti da botanici del gin e amarezza sottile',
      vi: 'Hoa cơm cháy sáng và cam chanh đập vào đầu tiên, tiếp theo là thực vật gin và vị đắng tinh tế',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering floral and citrus notes',
      it: 'Finale pulito e rinfrescante con note persistenti di fiori e agrumi',
      vi: 'Kết thúc sạch, sảng khoái với hương hoa và cam chanh kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between floral sweetness and citrus tartness, light and refreshing',
      it: 'Perfettamente bilanciato tra dolcezza floreale e acidità agrumata, leggero e rinfrescante',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt hoa và vị chua cam chanh, nhẹ nhàng và sảng khoái',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['brunch', 'garden_party', 'spring_celebration', 'aperitivo'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with spring salads, fresh cheeses, light seafood, asparagus dishes, and herb-forward cuisine. The floral character complements delicate, fresh flavors.',
      it: 'Perfetto con insalate primaverili, formaggi freschi, pesce leggero, piatti di asparagi e cucina alle erbe. Il carattere floreale complementa sapori delicati e freschi.',
      vi: 'Hoàn hảo với salad mùa xuân, phô mai tươi, hải sản nhẹ, món măng tây và ẩm thực thảo mộc. Đặc tính hoa bổ sung cho hương vị tươi mát, tinh tế.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who enjoy floral, botanical cocktails. Ideal for those seeking a light, refreshing drink with spring-like character.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail floreali e botanici. Ideale per chi cerca una bevanda leggera e rinfrescante con carattere primaverile.',
      vi: 'Hoàn hảo cho người yêu gin thích cocktail hoa, thực vật. Lý tưởng cho những ai tìm kiếm đồ uống nhẹ nhàng, sảng khoái với đặc tính mùa xuân.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_ELDERFLOWER_LIQUEUR',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Elderflower liqueur',
        it: 'Liquore di fiori di sambuco',
        vi: 'Rượu mùi hoa cơm cháy',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Aperol',
        it: 'Aperol',
        vi: 'Aperol',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe glass. Garnish with an edible flower or lemon twist.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata. Guarnire con un fiore commestibile o una twist di limone.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe đã làm lạnh. Trang trí với hoa ăn được hoặc vỏ chanh xoắn.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Edible flower or lemon twist',
    it: 'Fiore commestibile o twist di limone',
    vi: 'Hoa ăn được hoặc vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['floral', 'citrus', 'refreshing'],

  abv_estimate: 18,

  calories_estimate: 155,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
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
  occasion_tags: ['brunch', 'garden_party', 'spring_celebration', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['french-75', 'southside'],

  notes_for_staff:
    'Use quality elderflower liqueur (St-Germain recommended). Fresh lemon juice is essential. Edible flowers make a beautiful seasonal garnish for special occasions.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 73,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'PDT Cocktail Book by Jim Meehan',
    notes: 'Created by Jim Meehan at PDT, 2009. Modern classic cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
