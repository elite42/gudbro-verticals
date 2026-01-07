/**
 * Famous Cocktails: AMF (Adios Motherfucker)
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const amf: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a9b0c1d2-3456-7890-a345-789012345678',
  slug: 'amf',
  stable_key: 'e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5',

  name: {
    en: 'AMF (Adios Motherfucker)',
    it: 'AMF (Adios Motherfucker)',
    vi: 'AMF (Adios Motherfucker)',
    ko: 'AMF',
    ja: 'AMF',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'strong', 'party', 'blue', 'multi-spirit', 'extreme'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An infamously strong blue cocktail combining five spirits with sweet and sour mix and lemon-lime soda, topped with blue curaçao. The AMF is essentially a Long Island Iced Tea with blue curaçao, creating one of the strongest mixed drinks in existence.',
    it: "Un cocktail blu famigeratamente forte che combina cinque spiriti con sweet and sour mix e soda limone-lime, completato con blue curaçao. L'AMF è essenzialmente un Long Island Iced Tea con blue curaçao, creando uno dei drink misti più forti in esistenza.",
    vi: 'Một cocktail xanh lam nổi tiếng mạnh mẽ kết hợp năm loại rượu với hỗn hợp chua ngọt và soda chanh-lime, phủ blue curaçao. AMF về cơ bản là Long Island Iced Tea với blue curaçao, tạo ra một trong những thức uống pha trộn mạnh nhất tồn tại.',
  },

  history: {
    created_year: '1990',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The AMF (Adios Motherfucker) emerged in the 1990s as the most extreme version of the "geography iced tea" family. While its exact origin is disputed, it became popular in college bars and nightclubs for its shocking name, electric blue color, and extremely high alcohol content. The drink\'s name reflects its potency - essentially bidding farewell to sobriety. Like other iced tea variations, it contains five different spirits, but the addition of blue curaçao not only colors it but adds a sixth alcoholic component. The AMF became notorious as a "last call" drink or celebration shot for those seeking maximum alcohol in a single glass.',
      it: 'L\'AMF (Adios Motherfucker) emerse negli anni \'90 come la versione più estrema della famiglia "geography iced tea". Anche se la sua origine esatta è contestata, divenne popolare nei bar universitari e nei nightclub per il suo nome scioccante, il colore blu elettrico e il contenuto alcolico estremamente elevato. Il nome del drink riflette la sua potenza - essenzialmente salutando la sobrietà. Come altre variazioni di iced tea, contiene cinque spiriti diversi, ma l\'aggiunta di blue curaçao non solo lo colora ma aggiunge un sesto componente alcolico. L\'AMF divenne noto come drink di "ultima chiamata" o shot di celebrazione per coloro che cercano il massimo alcol in un singolo bicchiere.',
      vi: 'AMF (Adios Motherfucker) xuất hiện vào những năm 1990 như phiên bản cực đoan nhất của họ "trà đá địa lý". Mặc dù nguồn gốc chính xác của nó còn tranh cãi, nó trở nên phổ biến ở các quán bar sinh viên và hộp đêm vì cái tên gây sốc, màu xanh lam điện và hàm lượng cồn cực cao. Tên của thức uống phản ánh sức mạnh của nó - về cơ bản là tạm biệt sự tỉnh táo. Giống như các biến thể trà đá khác, nó chứa năm loại rượu khác nhau, nhưng việc thêm blue curaçao không chỉ tô màu mà còn thêm thành phần rượu thứ sáu. AMF trở nên khét tiếng như thức uống "cuộc gọi cuối cùng" hoặc shot kỷ niệm cho những ai tìm kiếm cồn tối đa trong một ly.',
    },
    named_after: {
      en: 'Named "Adios Motherfucker" - a farewell to sobriety, reflecting its extremely high alcohol content.',
      it: 'Chiamato "Adios Motherfucker" - un addio alla sobrietà, riflettendo il suo contenuto alcolico estremamente elevato.',
      vi: 'Được đặt tên "Adios Motherfucker" - tạm biệt sự tỉnh táo, phản ánh hàm lượng cồn cực cao của nó.',
    },
  },

  taste: {
    profile: ['sweet', 'citrus', 'orange', 'strong'],
    description: {
      en: "Sweet and citrusy with blue curaçao's orange flavor dominating, barely masking the staggering alcohol content from six alcoholic ingredients. The lemon-lime soda adds effervescence while sweet and sour provides citrus notes. Dangerously smooth despite containing more alcohol than most cocktails.",
      it: "Dolce e agrumato con il sapore d'arancia del blue curaçao dominante, mascherando a malapena lo sbalorditivo contenuto alcolico di sei ingredienti alcolici. La soda limone-lime aggiunge effervescenza mentre il sweet and sour fornisce note di agrumi. Pericolosamente morbido nonostante contenga più alcol della maggior parte dei cocktail.",
      vi: 'Ngọt ngào và cam quýt với hương cam của blue curaçao chiếm ưu thế, hầu như không che giấu được hàm lượng cồn đáng kinh ngạc từ sáu thành phần có cồn. Soda chanh-lime thêm bọt khí trong khi chua ngọt cung cấp hương cam quýt. Mượt mà đến nguy hiểm mặc dù chứa nhiều cồn hơn hầu hết các cocktail.',
    },
    first_impression: {
      en: 'Sweet orange-citrus with electric blue color',
      it: 'Arancia-agrumi dolce con colore blu elettrico',
      vi: 'Cam-quýt ngọt với màu xanh lam điện',
    },
    finish: {
      en: 'Long, very strong finish with considerable alcohol warmth',
      it: 'Finale lungo e molto forte con considerevole calore alcolico',
      vi: 'Kết thúc dài, rất mạnh với hơi ấm cồn đáng kể',
    },
    balance: {
      en: 'Extremely strong - the sweetness cannot fully mask the massive alcohol content. Proceed with extreme caution.',
      it: 'Estremamente forte - la dolcezza non può mascherare completamente il massiccio contenuto alcolico. Procedere con estrema cautela.',
      vi: 'Cực kỳ mạnh - vị ngọt không thể che giấu hoàn toàn hàm lượng cồn khổng lồ. Tiến hành với sự thận trọng cực độ.',
    },
  },

  recommendations: {
    best_time: ['night', 'late_night'],
    occasions: ['party', 'celebration', 'nightclub', 'dare'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Not recommended with food. This is strictly a party/celebration drink. Consume responsibly and slowly.',
      it: 'Non raccomandato con il cibo. Questo è rigorosamente un drink da festa/celebrazione. Consumare responsabilmente e lentamente.',
      vi: 'Không khuyến nghị với đồ ăn. Đây hoàn toàn là thức uống tiệc/kỷ niệm. Tiêu thụ có trách nhiệm và từ từ.',
    },
    ideal_for: {
      en: 'EXTREME CAUTION REQUIRED. Only for experienced drinkers who know their limits. Popular as a dare drink or celebration. NOT recommended for casual drinking. Bartenders should warn customers about the extreme alcohol content.',
      it: 'RICHIESTA ESTREMA CAUTELA. Solo per bevitori esperti che conoscono i loro limiti. Popolare come drink da sfida o celebrazione. NON raccomandato per bere casual. I barman dovrebbero avvertire i clienti del contenuto alcolico estremo.',
      vi: 'YÊU CẦU THẬN TRỌNG CỰC ĐỘ. Chỉ dành cho người uống có kinh nghiệm biết giới hạn của mình. Phổ biến như thức uống thách thức hoặc kỷ niệm. KHÔNG khuyến nghị uống thông thường. Bartender nên cảnh báo khách hàng về hàm lượng cồn cực cao.',
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
      ingredient_id: 'ING_BLUE_CURACAO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Blue curaçao', it: 'Blue curaçao', vi: 'Blue curaçao' },
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
    en: 'Add vodka, rum, gin, tequila, blue curaçao, and sweet and sour mix to a cocktail shaker with ice. Shake vigorously. Strain into a tall glass filled with fresh ice. Top with lemon-lime soda. Stir gently once. Serve with a straw and WARNING about alcohol content.',
    it: 'Aggiungere vodka, rum, gin, tequila, blue curaçao e sweet and sour mix in uno shaker con ghiaccio. Shakerare vigorosamente. Filtrare in un bicchiere alto pieno di ghiaccio fresco. Completare con soda limone-lime. Mescolare delicatamente una volta. Servire con cannuccia e AVVERTIMENTO sul contenuto alcolico.',
    vi: 'Thêm vodka, rum, gin, tequila, blue curaçao và hỗn hợp chua ngọt vào bình lắc cocktail với đá. Lắc mạnh. Lọc vào ly cao đầy đá tươi. Thêm soda chanh-lime lên trên. Khuấy nhẹ một lần. Phục vụ với ống hút và CẢNH BÁO về hàm lượng cồn.',
  },

  glass: 'Collins glass or Hurricane glass',

  garnish: {
    en: 'Lemon wheel (optional)',
    it: 'Rondella di limone (opzionale)',
    vi: 'Vòng chanh (tùy chọn)',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA', 'ING_WHITE_RUM', 'ING_GIN', 'ING_TEQUILA_SILVER', 'ING_BLUE_CURACAO'],

  flavor_profile: ['sweet', 'citrus', 'orange', 'strong'],

  abv_estimate: 24,

  calories_estimate: 270,

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
  variants: ['long-island-iced-tea', 'tokyo-tea', 'blue-long-island'],

  notes_for_staff:
    'EXTREMELY DANGEROUS - highest alcohol content of common cocktails. ALWAYS warn customers. Some bars refuse to serve. Responsible service practices essential. Also known as "Blue Motherfucker" or "Blue Long Island."',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1252/adios-motherfucker',
    notes: 'Extreme 1990s variation, strongest of the "iced tea" family.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
