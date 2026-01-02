/**
 * Famous Cocktails: Mudslide
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const mudslide: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  slug: 'mudslide',
  stable_key: 'mudslide_vodka_kahlua_baileys_cream',

  name: {
    en: 'Mudslide',
    it: 'Mudslide',
    vi: 'Mudslide',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'coffee', 'chocolate', 'vodka-based'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A decadent frozen cocktail blending vodka, coffee liqueur, Irish cream, and heavy cream. The Mudslide is essentially a boozy milkshake that combines coffee and chocolate flavors into a rich, indulgent dessert drink.',
    it: 'Un cocktail frozen decadente che mescola vodka, liquore al caffè, crema irlandese e panna. Il Mudslide è essenzialmente un milkshake alcolico che combina sapori di caffè e cioccolato in una bevanda da dessert ricca e indulgente.',
    vi: 'Một loại cocktail đông lạnh xa hoa pha trộn vodka, rượu mùi cà phê, kem Ireland và kem tươi. Mudslide về cơ bản là một ly sinh tố có cồn kết hợp hương vị cà phê và chocolate thành thức uống tráng miệng đậm đà, nuông chiều.',
  },

  history: {
    created_year: '1970s',
    origin: {
      city: 'Grand Cayman',
      bar: 'Wreck Bar',
      country: 'Cayman Islands',
    },
    story: {
      en: 'The Mudslide was created in the 1970s at the Wreck Bar on Grand Cayman Island. The original version was made with vodka, Kahlúa, and Baileys Irish Cream, served over ice. As the drink gained popularity in beach bars and resorts, the frozen blended version became more common, transforming it into the dessert-like cocktail we know today. The name references the drink\'s thick, muddy appearance when blended.',
      it: 'Il Mudslide fu creato negli anni \'70 al Wreck Bar sull\'isola di Grand Cayman. La versione originale era fatta con vodka, Kahlúa e Baileys Irish Cream, servita con ghiaccio. Con la popolarità acquisita nei bar sulla spiaggia e nei resort, la versione frozen frullata divenne più comune, trasformandola nel cocktail simile a un dessert che conosciamo oggi. Il nome fa riferimento all\'aspetto denso e fangoso della bevanda quando è frullata.',
      vi: 'Mudslide được tạo ra vào những năm 1970 tại Wreck Bar trên đảo Grand Cayman. Phiên bản gốc được làm với vodka, Kahlúa và Baileys Irish Cream, phục vụ với đá. Khi thức uống trở nên phổ biến ở các quầy bar bãi biển và khu nghỉ dưỡng, phiên bản xay đông lạnh trở nên phổ biến hơn, biến nó thành cocktail giống món tráng miệng mà chúng ta biết ngày nay. Cái tên ám chỉ vẻ ngoài dày, đục như bùn của thức uống khi xay.',
    },
    named_after: {
      en: 'Named after its thick, muddy brown appearance when blended, resembling an actual mudslide.',
      it: 'Prende il nome dal suo aspetto denso e marrone fangoso quando frullato, che ricorda una vera frana di fango.',
      vi: 'Được đặt tên theo vẻ ngoài dày, màu nâu như bùn khi xay, giống như một vụ lở đất thực sự.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'coffee', 'chocolate'],
    description: {
      en: 'Extremely rich and dessert-like, with chocolate and coffee flavors melding into a creamy, ice cream-like consistency. Sweet and indulgent with minimal alcohol taste despite the high spirit content.',
      it: 'Estremamente ricco e simile a un dessert, con sapori di cioccolato e caffè che si fondono in una consistenza cremosa simile al gelato. Dolce e indulgente con un sapore alcolico minimo nonostante l\'alto contenuto di spiriti.',
      vi: 'Cực kỳ đậm đà và giống món tráng miệng, với hương vị chocolate và cà phê hòa quyện thành kết cấu béo ngậy như kem. Ngọt và nuông chiều với vị cồn tối thiểu mặc dù hàm lượng rượu cao.',
    },
    first_impression: {
      en: 'Cold, creamy sweetness with immediate chocolate and coffee notes',
      it: 'Dolcezza fredda e cremosa con immediate note di cioccolato e caffè',
      vi: 'Vị ngọt lạnh, béo ngậy với hương chocolate và cà phê ngay lập tức',
    },
    finish: {
      en: 'Long, sweet finish with lingering chocolate and Irish cream flavors',
      it: 'Finale lungo e dolce con sapori persistenti di cioccolato e crema irlandese',
      vi: 'Kết thúc dài, ngọt với hương vị chocolate và kem Ireland kéo dài',
    },
    balance: {
      en: 'Heavily weighted toward sweetness and cream - this is a dessert drink first and foremost',
      it: 'Fortemente orientato verso la dolcezza e la panna - questa è innanzitutto una bevanda da dessert',
      vi: 'Thiên hẳn về vị ngọt và kem - đây là thức uống tráng miệng trước hết và quan trọng nhất',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['dessert', 'celebration', 'beach', 'casual'],
    seasons: ['summer', 'all_seasons'],
    food_pairings: {
      en: 'Best enjoyed as a dessert replacement. Pairs well with light appetizers or as an after-dinner treat. Can accompany chocolate cake or brownie.',
      it: 'Si gusta meglio come sostituto del dessert. Si abbina bene con antipasti leggeri o come dolcetto dopo cena. Può accompagnare torta al cioccolato o brownie.',
      vi: 'Tốt nhất khi thưởng thức như một món tráng miệng thay thế. Kết hợp tốt với món khai vị nhẹ hoặc như món ăn sau bữa tối. Có thể đi kèm với bánh chocolate hoặc brownie.',
    },
    ideal_for: {
      en: 'Perfect for those who love frozen dessert drinks and boozy milkshakes. Ideal for beach vacations, poolside relaxation, or anyone with a serious sweet tooth. Popular in tropical resort settings.',
      it: 'Perfetto per chi ama le bevande da dessert frozen e i milkshake alcolici. Ideale per vacanze al mare, relax a bordo piscina, o chiunque abbia una seria golosità. Popolare nei resort tropicali.',
      vi: 'Hoàn hảo cho những ai yêu thích đồ uống tráng miệng đông lạnh và sinh tố có cồn. Lý tưởng cho kỳ nghỉ biển, thư giãn bên bể bơi, hoặc bất kỳ ai thích ngọt nghiêm trọng. Phổ biến trong các khu nghỉ dưỡng nhiệt đới.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
      },
    },
    {
      ingredient_id: 'ING_IRISH_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Irish cream (Baileys)',
        it: 'Crema irlandese (Baileys)',
        vi: 'Kem Ireland (Baileys)',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Heavy cream', it: 'Panna', vi: 'Kem tươi' },
    },
  ],

  method: 'blend',

  instructions: {
    en: 'Add all ingredients to a blender with 1 cup of ice. Blend until smooth and creamy. Optionally, drizzle chocolate syrup inside a hurricane or poco grande glass. Pour blended mixture into glass. Top with whipped cream and chocolate shavings.',
    it: 'Aggiungere tutti gli ingredienti in un frullatore con 1 tazza di ghiaccio. Frullare fino a ottenere una consistenza liscia e cremosa. Opzionalmente, decorare l\'interno di un bicchiere hurricane o poco grande con sciroppo di cioccolato. Versare il composto frullato nel bicchiere. Guarnire con panna montata e scaglie di cioccolato.',
    vi: 'Cho tất cả nguyên liệu vào máy xay với 1 chén đá. Xay cho đến khi mịn và béo ngậy. Tùy chọn, rưới siro chocolate bên trong ly hurricane hoặc poco grande. Rót hỗn hợp đã xay vào ly. Phủ kem tươi và phoi chocolate lên trên.',
  },

  glass: 'Hurricane (or Poco Grande)',

  garnish: {
    en: 'Whipped cream, chocolate shavings, chocolate syrup drizzle',
    it: 'Panna montata, scaglie di cioccolato, filo di sciroppo di cioccolato',
    vi: 'Kem tươi, phoi chocolate, rưới siro chocolate',
  },

  ice: 'blended',

  serving_style: 'frozen',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'coffee', 'chocolate'],

  abv_estimate: 12,

  calories_estimate: 420,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['summer', 'all-seasons'],
  occasion_tags: ['dessert', 'casual', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['chocolate-mudslide', 'peanut-butter-mudslide', 'frozen-mudslide'],

  notes_for_staff: 'Can be served on the rocks or frozen - frozen version is more popular. Use vanilla ice cream instead of cream for an even richer version. Chocolate rim optional but popular. High calorie count - warn health-conscious guests.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/mudslide/',
    note: 'Classic frozen dessert cocktail from Cayman Islands.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
