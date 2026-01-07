/**
 * IBA Unforgettables: Ramos Gin Fizz
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const ramosGinFizz: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  slug: 'ramos-gin-fizz',
  stable_key: 'd9c8b7a6f5e4d3c2b1a098765432109fedcba987',

  name: {
    en: 'Ramos Gin Fizz',
    it: 'Ramos Gin Fizz',
    vi: 'Ramos Gin Fizz',
    ko: '라모스 진 피즈',
    ja: 'ラモス・ジン・フィズ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'creamy', 'refreshing', 'fizz', 'labor-intensive'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary New Orleans classic known for its rich, creamy texture and refreshing citrus flavor. The Ramos Gin Fizz requires vigorous shaking to achieve its signature frothy, meringue-like consistency. Often called "the workout in a glass," it\'s one of the most labor-intensive cocktails.',
    it: 'Un leggendario classico di New Orleans noto per la sua consistenza ricca e cremosa e il sapore rinfrescante agli agrumi. Il Ramos Gin Fizz richiede uno shaking vigoroso per ottenere la sua caratteristica consistenza schiumosa simile alla meringa. Spesso chiamato "l\'allenamento in un bicchiere," è uno dei cocktail più laboriosi.',
    vi: 'Một tác phẩm kinh điển huyền thoại của New Orleans nổi tiếng với kết cấu béo ngậy, kem và hương vị cam quýt tươi mát. Ramos Gin Fizz yêu cầu lắc mạnh để đạt được độ sủi bọt đặc trưng giống như meringue. Thường được gọi là "bài tập trong ly," đây là một trong những cocktail tốn công nhất.',
  },

  history: {
    created_year: '1888',
    origin: {
      city: 'New Orleans',
      bar: 'Imperial Cabinet Saloon',
      country: 'USA',
    },
    creator: {
      name: 'Henry Charles Ramos',
      profession: 'bartender',
    },
    story: {
      en: 'The Ramos Gin Fizz was created in 1888 by Henry Charles Ramos at the Imperial Cabinet Saloon on the corner of Gravier and Carondelet Streets in New Orleans, Louisiana. Originally named the "New Orleans Fizz," Henry used to call his famous creation "the One And Only One." According to legend, Ramos himself routinely employed up to 30 bartenders dedicated solely to shaking up the drink, sometimes for 12 minutes apiece, to achieve the perfect consistency. The drink became so popular that during Mardi Gras, the bar had a dedicated "shaker boy" assembly line.',
      it: 'Il Ramos Gin Fizz fu creato nel 1888 da Henry Charles Ramos all\'Imperial Cabinet Saloon all\'angolo tra Gravier e Carondelet Streets a New Orleans, Louisiana. Originariamente chiamato "New Orleans Fizz," Henry chiamava la sua famosa creazione "the One And Only One." Secondo la leggenda, Ramos stesso impiegava abitualmente fino a 30 barman dedicati esclusivamente allo shaking della bevanda, a volte per 12 minuti ciascuno, per ottenere la consistenza perfetta. La bevanda divenne così popolare che durante il Mardi Gras, il bar aveva una linea di assemblaggio dedicata ai "shaker boy".',
      vi: 'Ramos Gin Fizz được tạo ra vào năm 1888 bởi Henry Charles Ramos tại Imperial Cabinet Saloon ở góc đường Gravier và Carondelet ở New Orleans, Louisiana. Ban đầu có tên "New Orleans Fizz," Henry gọi tác phẩm nổi tiếng của mình là "the One And Only One." Theo truyền thuyết, chính Ramos thường xuyên thuê tới 30 bartender chỉ để lắc thức uống, đôi khi mỗi người lắc 12 phút, để đạt được độ đặc hoàn hảo. Thức uống trở nên phổ biến đến mức trong Mardi Gras, quán bar có một dây chuyền lắp ráp "shaker boy" chuyên dụng.',
    },
    named_after: {
      en: 'Named after its creator, Henry Charles Ramos.',
      it: 'Prende il nome dal suo creatore, Henry Charles Ramos.',
      vi: 'Được đặt theo tên người tạo ra nó, Henry Charles Ramos.',
    },
  },

  taste: {
    profile: ['creamy', 'citrus', 'floral'],
    description: {
      en: 'Silky smooth and cloud-like with a perfect balance of tart citrus, floral orange blossom, and creamy richness. The gin provides botanical backbone while the egg white creates an ethereal, meringue-like texture. Vanilla adds subtle sweetness.',
      it: "Setoso e simile a una nuvola con un perfetto equilibrio di agrumi aspri, fiori d'arancio floreali e ricchezza cremosa. Il gin fornisce una struttura botanica mentre l'albume crea una consistenza eterea simile alla meringa. La vaniglia aggiunge dolcezza sottile.",
      vi: 'Mượt mà như lụa và giống như đám mây với sự cân bằng hoàn hảo giữa cam quýt chua, hoa cam và độ béo ngậy của kem. Gin cung cấp xương sống thực vật trong khi lòng trắng trứng tạo ra kết cấu thanh thoát giống meringue. Vani thêm vị ngọt tinh tế.',
    },
    first_impression: {
      en: 'Fluffy, cloud-like foam with bright citrus and delicate orange blossom aroma',
      it: "Schiuma soffice e simile a una nuvola con agrumi brillanti e delicato aroma di fiori d'arancio",
      vi: 'Bọt mềm mại giống đám mây với hương cam quýt tươi sáng và hoa cam tinh tế',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering floral notes and gentle cream',
      it: 'Finale pulito e rinfrescante con note floreali persistenti e panna delicata',
      vi: 'Kết thúc sạch sẽ, sảng khoái với hương hoa kéo dài và kem nhẹ nhàng',
    },
    balance: {
      en: 'Perfectly balanced between rich creaminess and bright, refreshing citrus',
      it: 'Perfettamente bilanciato tra cremosità ricca e agrumi brillanti e rinfrescanti',
      vi: 'Cân bằng hoàn hảo giữa độ béo ngậy và cam quýt tươi sáng, sảng khoái',
    },
  },

  recommendations: {
    best_time: ['brunch', 'afternoon', 'early_evening'],
    occasions: ['brunch', 'celebration', 'special_occasion', 'impressive'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with brunch dishes like eggs Benedict, French toast, or fresh fruit. Also pairs well with light seafood, salads, or as a palate cleanser between courses.',
      it: 'Perfetto con piatti da brunch come uova Benedict, french toast o frutta fresca. Si abbina bene anche con frutti di mare leggeri, insalate o come pulitore del palato tra le portate.',
      vi: 'Hoàn hảo với các món brunch như trứng Benedict, bánh mì Pháp nướng hoặc trái cây tươi. Cũng kết hợp tốt với hải sản nhẹ, salad hoặc như một chất làm sạch vị giác giữa các món.',
    },
    ideal_for: {
      en: "Perfect for gin lovers who appreciate classic cocktails and don't mind waiting for their drink. Ideal for special occasions when you want to impress guests with both flavor and presentation.",
      it: 'Perfetto per gli amanti del gin che apprezzano i cocktail classici e non si preoccupano di aspettare la loro bevanda. Ideale per occasioni speciali quando si desidera impressionare gli ospiti con sapore e presentazione.',
      vi: 'Hoàn hảo cho người yêu gin đánh giá cao cocktail cổ điển và không ngại đợi đồ uống của họ. Lý tưởng cho những dịp đặc biệt khi bạn muốn gây ấn tượng với khách bằng cả hương vị và cách trình bày.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh vàng tươi',
      },
    },
    {
      ingredient_id: 'ING_SIMPLE_SYRUP',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sugar syrup', it: 'Sciroppo di zucchero', vi: 'Siro đường' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Cream', it: 'Panna', vi: 'Kem' },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Egg white', it: 'Albume', vi: 'Lòng trắng trứng' },
    },
    {
      ingredient_id: 'ING_ORANGE_FLOWER_WATER',
      quantity: { amount: 3, unit: 'dash' },
      display_name: {
        en: 'Orange flower water',
        it: "Acqua di fiori d'arancio",
        vi: 'Nước hoa cam',
      },
    },
    {
      ingredient_id: 'ING_VANILLA_EXTRACT',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Vanilla extract', it: 'Estratto di vaniglia', vi: 'Chiết xuất vani' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Soda water', it: 'Acqua di soda', vi: 'Nước soda' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients except soda water in a cocktail shaker with ice. Shake for two minutes, double strain in a glass, pour the drink back in the shaker and hard shake without ice for one minute. Strain into a highball glass, top up with soda.',
    it: "Versare tutti gli ingredienti tranne l'acqua di soda in uno shaker con ghiaccio. Shakerare per due minuti, filtrare due volte in un bicchiere, versare la bevanda di nuovo nello shaker e shakerare energicamente senza ghiaccio per un minuto. Filtrare in un bicchiere highball, completare con soda.",
    vi: 'Đổ tất cả nguyên liệu trừ nước soda vào bình lắc với đá. Lắc trong hai phút, lọc kép vào ly, đổ thức uống trở lại bình lắc và lắc mạnh không có đá trong một phút. Lọc vào ly highball, thêm soda lên trên.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'None (the foam crown is the garnish)',
    it: 'Nessuna (la corona di schiuma è la guarnizione)',
    vi: 'Không (vương miện bọt là đồ trang trí)',
  },

  ice: 'none', // Ice used for shaking but not in final serve

  serving_style: 'straight_up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['creamy', 'citrus', 'floral'],

  abv_estimate: 8, // ~8% ABV after dilution and cream

  calories_estimate: 320, // High due to cream and sugar

  difficulty: 'advanced',

  prep_time_seconds: 240, // 4 minutes of shaking!

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['egg', 'milk', 'sulphites'],
    intolerances: ['egg_intolerance', 'lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'celebration', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['gin-fizz', 'silver-fizz', 'royal-fizz'],

  notes_for_staff:
    "This is the most labor-intensive cocktail on the menu. Requires 3 minutes of vigorous shaking total. Use fresh egg white for best foam. Orange flower water is essential - don't substitute. The double shake method (with ice, then without) is critical for proper texture. Soda should be added last and very gently to preserve the foam crown.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/ramos-fizz/',
    notes:
      'IBA Official Recipe. Historical information from New Orleans cocktail history and Henry Charles Ramos documentation.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
