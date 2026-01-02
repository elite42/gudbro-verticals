/**
 * Famous Cocktails: Chi Chi
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const chiChi: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '8c3f1a9e-4d2b-5e7c-9a1f-3b6d8e2c4a7f',
  slug: 'chi-chi',
  stable_key: 'chi-chi-tiki-tropical-famous-2025',

  name: {
    en: 'Chi Chi',
    it: 'Chi Chi',
    vi: 'Chi Chi',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'vodka', 'pina-colada-variation', 'creamy', 'frozen'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The vodka version of the classic Piña Colada, blending vodka with pineapple juice and cream of coconut. The Chi Chi offers the same creamy, tropical indulgence as its rum-based cousin but with a cleaner, more neutral spirit base.',
    it: 'La versione vodka del classico Piña Colada, che mescola vodka con succo di ananas e crema di cocco. Il Chi Chi offre la stessa indulgenza cremosa e tropicale del suo cugino a base di rum ma con una base di spirito più pulita e neutra.',
    vi: 'Phiên bản vodka của Piña Colada cổ điển, pha trộn vodka với nước ép dứa và kem dừa. Chi Chi mang đến sự nuông chiều béo ngậy, nhiệt đới giống như người anh em họ có rum nhưng với nền rượu sạch hơn, trung tính hơn.',
  },

  history: {
    created_year: '1970s',
    origin: {
      city: 'Various',
      bar: 'Multiple Claims',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Chi Chi emerged in the 1970s as bartenders began experimenting with vodka variations of classic cocktails during vodka\'s rise to popularity in America. While the exact origin is disputed, the drink became popular in beach bars and resorts as a lighter alternative to the Piña Colada. The name "Chi Chi" is playful and catchy, though its exact etymology is unclear. Some suggest it was named after a socialite, while others believe it\'s simply a fun, memorable name that matched the drink\'s festive character.',
      it: 'Il Chi Chi emerse negli anni \'70 quando i barman iniziarono a sperimentare varianti alla vodka dei cocktail classici durante l\'ascesa della vodka alla popolarità in America. Sebbene l\'origine esatta sia controversa, la bevanda divenne popolare nei bar sulla spiaggia e nei resort come alternativa più leggera al Piña Colada. Il nome "Chi Chi" è giocoso e orecchiabile, anche se la sua etimologia esatta non è chiara. Alcuni suggeriscono che fosse chiamato così in onore di una socialite, mentre altri credono che sia semplicemente un nome divertente e memorabile che corrisponde al carattere festoso della bevanda.',
      vi: 'Chi Chi xuất hiện vào những năm 1970 khi các bartender bắt đầu thử nghiệm các biến thể vodka của cocktail cổ điển trong thời kỳ vodka trở nên phổ biến ở Mỹ. Mặc dù nguồn gốc chính xác còn tranh cãi, thức uống trở nên phổ biến tại các quán bar bãi biển và khu nghỉ dưỡng như một lựa chọn nhẹ hơn cho Piña Colada. Cái tên "Chi Chi" vui tươi và hấp dẫn, mặc dù nguồn gốc từ nguyên chính xác không rõ ràng. Một số cho rằng nó được đặt theo tên một nhân vật xã hội, trong khi những người khác tin rằng đó chỉ đơn giản là một cái tên vui vẻ, đáng nhớ phù hợp với tính cách lễ hội của thức uống.',
    },
    named_after: {
      en: 'The exact origin of the name "Chi Chi" is unclear, though it may reference a socialite or simply be a playful, memorable name chosen for its festive sound.',
      it: 'L\'origine esatta del nome "Chi Chi" non è chiara, anche se potrebbe riferirsi a una socialite o essere semplicemente un nome giocoso e memorabile scelto per il suo suono festoso.',
      vi: 'Nguồn gốc chính xác của tên "Chi Chi" không rõ ràng, mặc dù nó có thể tham chiếu đến một nhân vật xã hội hoặc đơn giản là một cái tên vui tươi, đáng nhớ được chọn vì âm thanh lễ hội của nó.',
    },
  },

  taste: {
    profile: ['creamy', 'tropical', 'sweet'],
    description: {
      en: 'Creamy and luscious with bright pineapple and rich coconut flavors. The vodka provides a clean, neutral base that lets the tropical fruits shine. Smooth, indulgent, and dangerously easy to drink.',
      it: 'Cremoso e delizioso con vivaci sapori di ananas e cocco ricco. La vodka fornisce una base pulita e neutra che lascia risplendere i frutti tropicali. Morbido, indulgente e pericolosamente facile da bere.',
      vi: 'Béo ngậy và hấp dẫn với hương vị dứa tươi sáng và dừa đậm đà. Vodka cung cấp nền trung tính, sạch để trái cây nhiệt đới tỏa sáng. Mượt mà, nuông chiều và dễ uống nguy hiểm.',
    },
    first_impression: {
      en: 'Sweet pineapple and creamy coconut hit simultaneously with smooth texture',
      it: 'Ananas dolce e cocco cremoso colpiscono simultaneamente con texture morbida',
      vi: 'Dứa ngọt và dừa béo ngậy đập vào đồng thời với kết cấu mượt mà',
    },
    finish: {
      en: 'Long, creamy finish with lingering coconut and tropical fruit notes',
      it: 'Finale lungo e cremoso con note persistenti di cocco e frutta tropicale',
      vi: 'Kết thúc dài, béo ngậy với hương dừa và trái cây nhiệt đới kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet and creamy - the pineapple acidity prevents it from being too rich',
      it: 'Ben bilanciato tra dolce e cremoso - l\'acidità dell\'ananas impedisce che sia troppo ricco',
      vi: 'Cân bằng tốt giữa ngọt và béo ngậy - độ axit của dứa ngăn không cho quá đậm',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'vacation', 'celebration', 'summer_gathering'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Pairs beautifully with grilled seafood, coconut shrimp, tropical fruit platters, Hawaiian pizza, or Caribbean jerk dishes. Also excellent with Thai and tropical Asian cuisine.',
      it: 'Si abbina magnificamente con frutti di mare alla griglia, gamberi al cocco, piatti di frutta tropicale, pizza hawaiana o piatti jerk caraibici. Eccellente anche con cucina tailandese e asiatica tropicale.',
      vi: 'Kết hợp tuyệt vời với hải sản nướng, tôm dừa, đĩa trái cây nhiệt đới, pizza Hawaii hoặc món jerk Caribbean. Cũng tuyệt vời với ẩm thực Thái và Châu Á nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for beach vacations, poolside lounging, and tropical-themed parties. Ideal for those who love creamy cocktails but prefer vodka over rum. A great frozen drink for hot summer days.',
      it: 'Perfetto per vacanze al mare, relax a bordo piscina e feste a tema tropicale. Ideale per chi ama i cocktail cremosi ma preferisce la vodka al rum. Un\'ottima bevanda ghiacciata per le calde giornate estive.',
      vi: 'Hoàn hảo cho kỳ nghỉ biển, thư giãn bên hồ bơi và tiệc chủ đề nhiệt đới. Lý tưởng cho những ai yêu thích cocktail béo ngậy nhưng thích vodka hơn rum. Đồ uống đá tuyệt vời cho những ngày hè nóng bức.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_CREAM_OF_COCONUT',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cream of coconut', it: 'Crema di cocco', vi: 'Kem dừa' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Fresh pineapple juice', it: 'Succo di ananas fresco', vi: 'Nước ép dứa tươi' },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Add all ingredients to a blender with 1 cup of ice. Blend until smooth and creamy. Pour into a hurricane glass. Garnish with pineapple wedge and maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in un frullatore con 1 tazza di ghiaccio. Frullare fino a ottenere una consistenza liscia e cremosa. Versare in un bicchiere hurricane. Guarnire con spicchio di ananas e ciliegina al maraschino.',
    vi: 'Thêm tất cả nguyên liệu vào máy xay với 1 cốc đá. Xay cho đến khi mịn và béo ngậy. Đổ vào ly hurricane. Trang trí với miếng dứa và cherry maraschino.',
  },

  glass: 'Hurricane glass',

  garnish: {
    en: 'Pineapple wedge and maraschino cherry',
    it: 'Spicchio di ananas e ciliegina al maraschino',
    vi: 'Miếng dứa và cherry maraschino',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'tropical', 'sweet'],

  abv_estimate: 12,

  calories_estimate: 280,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'tree_nuts'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['summer', 'year_round'],
  occasion_tags: ['beach', 'pool_party', 'vacation', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['pina-colada', 'virgin-chi-chi', 'strawberry-chi-chi'],

  notes_for_staff: 'Vodka version of Piña Colada. Use Coco López or similar cream of coconut (not coconut milk). Blend until smooth - consistency should be like a frozen dessert. Fresh pineapple juice highly recommended. Can also be served shaken over ice if blender unavailable.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/chi-chi/',
    note: 'Vodka variation of classic Piña Colada. Multiple origin claims.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
