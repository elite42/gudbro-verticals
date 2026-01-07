/**
 * Famous Cocktails: Tokyo Tea
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const tokyoTea: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f8a9b0c1-2345-6789-f234-678901234567',
  slug: 'tokyo-tea',
  stable_key: 'd5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4',

  name: {
    en: 'Tokyo Tea',
    it: 'Tokyo Tea',
    vi: 'Tokyo Tea',
    ko: '도쿄 티',
    ja: '東京ティー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'strong', 'party', 'melon', 'multi-spirit', 'green'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A vibrant green variation of the Long Island Iced Tea, featuring Midori melon liqueur instead of cola. This potent cocktail combines five spirits with sweet and sour mix and lemon-lime soda, creating a dangerously drinkable party favorite.',
    it: 'Una vibrante variazione verde del Long Island Iced Tea, con liquore di melone Midori invece della cola. Questo potente cocktail combina cinque spiriti con sweet and sour mix e soda limone-lime, creando un favorito da festa pericolosamente bevibile.',
    vi: 'Một biến thể xanh lá sống động của Long Island Iced Tea, có liqueur dưa Midori thay vì cola. Cocktail mạnh mẽ này kết hợp năm loại rượu với hỗn hợp chua ngọt và soda chanh-lime, tạo ra món yêu thích của tiệc tùng cực kỳ dễ uống.',
  },

  history: {
    created_year: '1990',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Tokyo Tea emerged in the 1990s as part of the "geography-themed iced tea" trend that included Long Island, Long Beach, Miami, and other variations. The name references Tokyo and Japanese culture through the use of Midori, a Japanese melon liqueur. The vibrant green color makes it visually striking and Instagram-worthy. Like its cousins, it contains multiple spirits making it extremely strong despite tasting sweet and fruity. The drink became popular in nightclubs and college bars where the sweet melon flavor masked its substantial alcohol content.',
      it: 'Il Tokyo Tea emerse negli anni \'90 come parte della tendenza "iced tea a tema geografico" che includeva Long Island, Long Beach, Miami e altre variazioni. Il nome fa riferimento a Tokyo e alla cultura giapponese attraverso l\'uso di Midori, un liquore di melone giapponese. Il vibrante colore verde lo rende visivamente sorprendente e degno di Instagram. Come i suoi cugini, contiene più spiriti rendendolo estremamente forte nonostante il sapore dolce e fruttato. Il drink divenne popolare nei nightclub e nei bar universitari dove il dolce sapore di melone mascherava il suo sostanziale contenuto alcolico.',
      vi: 'Tokyo Tea xuất hiện vào những năm 1990 như một phần của xu hướng "trà đá theo chủ đề địa lý" bao gồm Long Island, Long Beach, Miami và các biến thể khác. Cái tên ám chỉ Tokyo và văn hóa Nhật Bản thông qua việc sử dụng Midori, một liqueur dưa Nhật Bản. Màu xanh lá sống động làm cho nó nổi bật về mặt hình ảnh và đáng đăng Instagram. Giống như anh em họ của nó, nó chứa nhiều loại rượu khiến nó cực kỳ mạnh mặc dù có vị ngọt và trái cây. Thức uống trở nên phổ biến ở hộp đêm và quán bar sinh viên nơi hương vị dưa ngọt che giấu hàm lượng cồn đáng kể.',
    },
    named_after: {
      en: 'Named after Tokyo, Japan, referencing Japanese culture through Midori melon liqueur, which is produced in Japan.',
      it: 'Prende il nome da Tokyo, Giappone, riferendosi alla cultura giapponese attraverso il liquore di melone Midori, prodotto in Giappone.',
      vi: 'Được đặt theo tên Tokyo, Nhật Bản, ám chỉ văn hóa Nhật Bản thông qua liqueur dưa Midori, được sản xuất tại Nhật Bản.',
    },
  },

  taste: {
    profile: ['sweet', 'fruity', 'melon', 'strong'],
    description: {
      en: 'Sweet and fruity with prominent melon flavor from Midori, masking the considerable alcohol content from five spirits. The lemon-lime soda adds effervescence while the sweet and sour mix provides citrus balance. Dangerously smooth and deceptively strong.',
      it: 'Dolce e fruttato con prominente sapore di melone dal Midori, mascherando il considerevole contenuto alcolico di cinque spiriti. La soda limone-lime aggiunge effervescenza mentre il sweet and sour mix fornisce equilibrio di agrumi. Pericolosamente morbido e ingannevolmente forte.',
      vi: 'Ngọt ngào và trái cây với hương vị dưa nổi bật từ Midori, che giấu hàm lượng cồn đáng kể từ năm loại rượu. Soda chanh-lime thêm bọt khí trong khi hỗn hợp chua ngọt cung cấp sự cân bằng cam quýt. Mượt mà đến nguy hiểm và mạnh đến lừa dối.',
    },
    first_impression: {
      en: 'Sweet melon with citrus and fruity complexity',
      it: 'Melone dolce con complessità di agrumi e frutta',
      vi: 'Dưa ngọt với sự phức tạp cam quýt và trái cây',
    },
    finish: {
      en: 'Long, warming finish with melon sweetness and multi-spirit heat',
      it: 'Finale lungo e caldo con dolcezza di melone e calore multi-spirito',
      vi: 'Kết thúc dài, ấm áp với vị ngọt dưa và độ nóng đa rượu',
    },
    balance: {
      en: 'Very sweet with melon dominating - the substantial alcohol is well-masked, making it dangerously easy to drink',
      it: "Molto dolce con il melone dominante - l'alcol sostanziale è ben mascherato, rendendolo pericolosamente facile da bere",
      vi: 'Rất ngọt với dưa chiếm ưu thế - cồn đáng kể được che giấu tốt, khiến nó cực kỳ dễ uống',
    },
  },

  recommendations: {
    best_time: ['evening', 'night', 'late_night'],
    occasions: ['party', 'celebration', 'nightclub', 'birthday'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best enjoyed as a party drink without food. If pairing, works with Asian fusion appetizers, sushi, and light party snacks.',
      it: 'Meglio gustato come drink da festa senza cibo. Se abbinato, funziona con antipasti fusion asiatici, sushi e snack leggeri da festa.',
      vi: 'Tốt nhất nên thưởng thức như thức uống tiệc không có đồ ăn. Nếu kết hợp, phù hợp với món khai vị fusion Á, sushi và đồ ăn nhẹ tiệc.',
    },
    ideal_for: {
      en: 'Perfect for party-goers who love sweet, colorful drinks. Great for celebrations and nightclub settings. WARNING: Extremely high alcohol content - pace yourself and drink responsibly.',
      it: 'Perfetto per i festaioli che amano drink dolci e colorati. Ottimo per celebrazioni e ambienti da nightclub. ATTENZIONE: Contenuto alcolico estremamente elevato - dosarsi e bere responsabilmente.',
      vi: 'Hoàn hảo cho người đi tiệc yêu thích đồ uống ngọt ngào, đầy màu sắc. Tuyệt vời cho kỷ niệm và môi trường hộp đêm. CẢNH BÁO: Hàm lượng cồn cực cao - uống từ từ và có trách nhiệm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_WHITE_RUM',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_TEQUILA_SILVER',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Tequila (silver)', it: 'Tequila (blanco)', vi: 'Tequila (bạc)' },
    },
    {
      ingredient_id: 'ING_MIDORI',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Midori melon liqueur',
        it: 'Liquore di melone Midori',
        vi: 'Liqueur dưa Midori',
      },
    },
    {
      ingredient_id: 'ING_SWEET_AND_SOUR',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet and sour mix', it: 'Sweet and sour mix', vi: 'Hỗn hợp chua ngọt' },
    },
    {
      ingredient_id: 'ING_LEMON_LIME_SODA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Lemon-lime soda (7-Up or Sprite)',
        it: 'Soda limone-lime (7-Up o Sprite)',
        vi: 'Soda chanh-lime (7-Up hoặc Sprite)',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add vodka, rum, gin, tequila, Midori, and sweet and sour mix to a cocktail shaker with ice. Shake vigorously. Strain into a tall glass filled with fresh ice. Top with lemon-lime soda. Stir gently. Garnish with a cherry and lemon wheel.',
    it: 'Aggiungere vodka, rum, gin, tequila, Midori e sweet and sour mix in uno shaker con ghiaccio. Shakerare vigorosamente. Filtrare in un bicchiere alto pieno di ghiaccio fresco. Completare con soda limone-lime. Mescolare delicatamente. Guarnire con una ciliegia e una rondella di limone.',
    vi: 'Thêm vodka, rum, gin, tequila, Midori và hỗn hợp chua ngọt vào bình lắc cocktail với đá. Lắc mạnh. Lọc vào ly cao đầy đá tươi. Thêm soda chanh-lime lên trên. Khuấy nhẹ nhàng. Trang trí với cherry và vòng chanh.',
  },

  glass: 'Collins glass or Hurricane glass',

  garnish: {
    en: 'Maraschino cherry and lemon wheel',
    it: 'Ciliegia maraschino e rondella di limone',
    vi: 'Cherry maraschino và vòng chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA', 'ING_WHITE_RUM', 'ING_GIN', 'ING_TEQUILA_SILVER', 'ING_MIDORI'],

  flavor_profile: ['sweet', 'fruity', 'melon', 'strong'],

  abv_estimate: 22,

  calories_estimate: 260,

  difficulty: 'easy',

  prep_time_seconds: 45,

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
  season_tags: ['all_year'],
  occasion_tags: ['party', 'celebration', 'nightclub'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['long-island-iced-tea', 'long-beach-iced-tea', 'miami-iced-tea'],

  notes_for_staff:
    'EXTREMELY STRONG - 5 spirits total. The green color makes it visually appealing. Midori is essential for authentic Tokyo Tea. Warn customers about high alcohol content.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1251/tokyo-tea',
    notes: 'Part of 1990s "geography iced tea" trend, featuring Midori melon liqueur.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
