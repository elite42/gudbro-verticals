/**
 * Famous Cocktails: Long Beach Iced Tea
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const longBeachIcedTea: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e7f8a9b0-1234-5678-e123-567890123456',
  slug: 'long-beach-iced-tea',
  stable_key: 'c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',

  name: {
    en: 'Long Beach Iced Tea',
    it: 'Long Beach Iced Tea',
    vi: 'Long Beach Iced Tea',
    ko: '롱비치 아이스티',
    ja: 'ロングビーチアイスティー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'strong', 'party', 'cranberry', 'multi-spirit'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A vibrant variation of the Long Island Iced Tea, swapping cola for cranberry juice. This powerful cocktail combines five spirits with sweet and sour mix and cranberry juice, creating a fruity, deceptively strong drink.',
    it: 'Una vibrante variazione del Long Island Iced Tea, sostituendo la cola con succo di mirtillo rosso. Questo potente cocktail combina cinque spiriti con sweet and sour mix e succo di mirtillo rosso, creando un drink fruttato e ingannevolmente forte.',
    vi: 'Một biến thể sống động của Long Island Iced Tea, thay cola bằng nước ép nam việt quất. Cocktail mạnh mẽ này kết hợp năm loại rượu với hỗn hợp chua ngọt và nước ép nam việt quất, tạo ra thức uống trái cây, mạnh đến lừa dối.',
  },

  history: {
    created_year: '1980',
    origin: {
      city: 'Long Beach',
      state: 'California',
      country: 'USA',
    },
    story: {
      en: 'The Long Beach Iced Tea emerged in the 1980s in Long Beach, California, as a West Coast answer to the Long Island Iced Tea. The substitution of cranberry juice for cola gives the drink a distinctive pink color and fruiter profile. While the Long Island version gained fame in New York, the Long Beach version became popular in California beach bars and clubs. The cranberry juice makes it slightly less sweet than its East Coast cousin while maintaining the same potent multi-spirit formula.',
      it: "Il Long Beach Iced Tea emerse negli anni '80 a Long Beach, California, come risposta della costa occidentale al Long Island Iced Tea. La sostituzione della cola con succo di mirtillo rosso conferisce al drink un caratteristico colore rosa e un profilo più fruttato. Mentre la versione Long Island divenne famosa a New York, la versione Long Beach divenne popolare nei bar e club sulla spiaggia della California. Il succo di mirtillo rosso lo rende leggermente meno dolce del suo cugino della costa orientale mantenendo la stessa potente formula multi-spirito.",
      vi: 'Long Beach Iced Tea xuất hiện vào những năm 1980 ở Long Beach, California, như câu trả lời của Bờ Tây cho Long Island Iced Tea. Việc thay thế cola bằng nước ép nam việt quất mang lại cho thức uống màu hồng đặc trưng và hồ sơ trái cây hơn. Trong khi phiên bản Long Island trở nên nổi tiếng ở New York, phiên bản Long Beach trở nên phổ biến ở các quán bar và câu lạc bộ bãi biển California. Nước ép nam việt quất làm cho nó ít ngọt hơn một chút so với người anh em bờ Đông trong khi duy trì công thức đa rượu mạnh mẽ tương tự.',
    },
    named_after: {
      en: 'Named after Long Beach, California, where this variation was created as a West Coast alternative to the Long Island Iced Tea.',
      it: 'Prende il nome da Long Beach, California, dove questa variazione fu creata come alternativa della costa occidentale al Long Island Iced Tea.',
      vi: 'Được đặt theo tên Long Beach, California, nơi biến thể này được tạo ra như một sự thay thế Bờ Tây cho Long Island Iced Tea.',
    },
  },

  taste: {
    profile: ['fruity', 'tart', 'strong', 'cranberry'],
    description: {
      en: 'Fruity and tart with cranberry taking the lead, masking the substantial alcohol content from five different spirits. The sweet and sour mix adds citrus balance while the cranberry provides a refreshing tartness. Dangerously smooth and deceptively strong.',
      it: "Fruttato e aspro con il mirtillo rosso in primo piano, mascherando il sostanziale contenuto alcolico di cinque spiriti diversi. Il sweet and sour mix aggiunge equilibrio di agrumi mentre il mirtillo rosso fornisce un'acidità rinfrescante. Pericolosamente morbido e ingannevolmente forte.",
      vi: 'Trái cây và chua với nam việt quất dẫn đầu, che giấu hàm lượng cồn đáng kể từ năm loại rượu khác nhau. Hỗn hợp chua ngọt thêm sự cân bằng cam quýt trong khi nam việt quất cung cấp vị chua tươi mát. Mượt mà đến nguy hiểm và mạnh đến lừa dối.',
    },
    first_impression: {
      en: 'Sweet-tart cranberry with fruity complexity',
      it: 'Mirtillo rosso dolce-aspro con complessità fruttata',
      vi: 'Nam việt quất ngọt-chua với sự phức tạp trái cây',
    },
    finish: {
      en: 'Long, warming finish with cranberry tartness and multi-spirit complexity',
      it: 'Finale lungo e caldo con acidità di mirtillo rosso e complessità multi-spirito',
      vi: 'Kết thúc dài, ấm áp với vị chua nam việt quất và sự phức tạp đa rượu',
    },
    balance: {
      en: 'The cranberry and sweet-sour balance each other while masking the substantial alcohol - drink with caution',
      it: 'Il mirtillo rosso e il dolce-aspro si bilanciano a vicenda mascherando il sostanziale alcol - bere con cautela',
      vi: 'Nam việt quất và chua-ngọt cân bằng lẫn nhau trong khi che giấu cồn đáng kể - uống cẩn thận',
    },
  },

  recommendations: {
    best_time: ['evening', 'night', 'late_night'],
    occasions: ['party', 'celebration', 'nightclub', 'beach'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best consumed as a party drink rather than with food. If pairing, works with bar snacks, pizza, and casual party foods.',
      it: 'Meglio consumato come drink da festa piuttosto che con il cibo. Se abbinato, funziona con snack da bar, pizza e cibi da festa casual.',
      vi: 'Tốt nhất nên tiêu thụ như thức uống tiệc hơn là với đồ ăn. Nếu kết hợp, phù hợp với đồ ăn nhẹ quán bar, pizza và đồ ăn tiệc thông thường.',
    },
    ideal_for: {
      en: "Perfect for party atmospheres and those who want a strong drink that doesn't taste overly alcoholic. Great for nightclubs and celebrations. Warning: very high alcohol content - pace yourself.",
      it: 'Perfetto per atmosfere da festa e per chi vuole un drink forte che non abbia un sapore eccessivamente alcolico. Ottimo per nightclub e celebrazioni. Attenzione: contenuto alcolico molto elevato - dosarsi.',
      vi: 'Hoàn hảo cho không khí tiệc tùng và những ai muốn thức uống mạnh không có vị rượu quá mức. Tuyệt vời cho hộp đêm và kỷ niệm. Cảnh báo: hàm lượng cồn rất cao - uống từ từ.',
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
      ingredient_id: 'ING_TRIPLE_SEC',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Triple sec', it: 'Triple sec', vi: 'Triple sec' },
    },
    {
      ingredient_id: 'ING_SWEET_AND_SOUR',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Sweet and sour mix', it: 'Sweet and sour mix', vi: 'Hỗn hợp chua ngọt' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Cranberry juice',
        it: 'Succo di mirtillo rosso',
        vi: 'Nước ép nam việt quất',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all spirits, sweet and sour mix, and cranberry juice to a cocktail shaker with ice. Shake vigorously. Strain into a tall glass filled with fresh ice. Garnish with a lemon wedge.',
    it: 'Aggiungere tutti gli spiriti, sweet and sour mix e succo di mirtillo rosso in uno shaker con ghiaccio. Shakerare vigorosamente. Filtrare in un bicchiere alto pieno di ghiaccio fresco. Guarnire con uno spicchio di limone.',
    vi: 'Thêm tất cả rượu, hỗn hợp chua ngọt và nước ép nam việt quất vào bình lắc cocktail với đá. Lắc mạnh. Lọc vào ly cao đầy đá tươi. Trang trí với một lát chanh.',
  },

  glass: 'Collins glass or Hurricane glass',

  garnish: {
    en: 'Lemon wedge',
    it: 'Spicchio di limone',
    vi: 'Lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA', 'ING_WHITE_RUM', 'ING_GIN', 'ING_TEQUILA_SILVER', 'ING_TRIPLE_SEC'],

  flavor_profile: ['fruity', 'tart', 'strong', 'cranberry'],

  abv_estimate: 22,

  calories_estimate: 245,

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
  occasion_tags: ['party', 'celebration', 'nightclub', 'beach'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['long-island-iced-tea', 'tokyo-tea', 'miami-iced-tea'],

  notes_for_staff:
    'VERY STRONG - contains 5 spirits. Some versions use lemon juice + simple syrup instead of sweet and sour mix. Warn customers about alcohol content. Popular order at beach bars.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1250/long-beach-iced-tea',
    notes: 'West Coast variation of Long Island Iced Tea, emerged 1980s in Long Beach, CA.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
