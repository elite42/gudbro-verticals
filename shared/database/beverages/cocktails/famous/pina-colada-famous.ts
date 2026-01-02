/**
 * Famous Cocktails: Piña Colada (Famous Variant)
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const pinaColadaFamous: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c',
  slug: 'pina-colada-famous',
  stable_key: 'pina-colada-famous-variant-tiki-tropical-2025',

  name: {
    en: 'Piña Colada (Famous Variant)',
    it: 'Piña Colada (Variante Famosa)',
    vi: 'Piña Colada (Biến thể Nổi tiếng)',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'rum', 'creamy', 'frozen', 'popular'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The popular frozen variant of the classic Piña Colada, blended to a smooth, slushie-like consistency. This beach resort favorite combines rum, coconut cream, and pineapple juice into an indulgent frozen treat that epitomizes tropical vacation vibes.',
    it: 'La popolare variante ghiacciata della classica Piña Colada, frullata fino a una consistenza liscia simile a un granita. Questo favorito dei resort sulla spiaggia combina rum, crema di cocco e succo di ananas in un trattamento ghiacciato indulgente che incarna le vibrazioni delle vacanze tropicali.',
    vi: 'Biến thể đá xay phổ biến của Piña Colada cổ điển, được xay nhuyễn đến độ mịn như sinh tố đá. Món ưa thích của khu nghỉ dưỡng bãi biển này kết hợp rum, kem dừa và nước ép dứa thành món đá xay nuông chiều thể hiện bầu không khí kỳ nghỉ nhiệt đới.',
  },

  history: {
    created_year: '1970s',
    origin: {
      city: 'Various',
      bar: 'Beach Resorts',
      country: 'Puerto Rico / USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'While the original Piña Colada was created in Puerto Rico in the 1950s (claimed by both Ramón "Monchito" Marrero at Caribe Hilton and Ricardo García at Barrachina), the frozen blended version became the dominant style in the 1970s with the widespread availability of electric blenders. This frozen variant, immortalized in the 1979 Rupert Holmes song "Escape (The Piña Colada Song)," became the quintessential beach resort cocktail. The frozen version is now so ubiquitous that most people think of it as the "original" way to serve a Piña Colada. It became the official drink of Puerto Rico in 1978.',
      it: 'Mentre la Piña Colada originale fu creata a Porto Rico negli anni \'50 (rivendicata sia da Ramón "Monchito" Marrero al Caribe Hilton che da Ricardo García al Barrachina), la versione frullata ghiacciata divenne lo stile dominante negli anni \'70 con la diffusa disponibilità di frullatori elettrici. Questa variante ghiacciata, immortalata nella canzone del 1979 di Rupert Holmes "Escape (The Piña Colada Song)," divenne il cocktail quintessenziale dei resort sulla spiaggia. La versione ghiacciata è ora così onnipresente che la maggior parte delle persone la considera il modo "originale" di servire una Piña Colada. Divenne la bevanda ufficiale di Porto Rico nel 1978.',
      vi: 'Trong khi Piña Colada gốc được tạo ra ở Puerto Rico vào những năm 1950 (được tuyên bố bởi cả Ramón "Monchito" Marrero tại Caribe Hilton và Ricardo García tại Barrachina), phiên bản xay đá đông lạnh trở thành phong cách thống trị vào những năm 1970 với sự sẵn có rộng rãi của máy xay điện. Biến thể đông lạnh này, được bất tử hóa trong bài hát năm 1979 của Rupert Holmes "Escape (The Piña Colada Song)," trở thành cocktail tinh túy của khu nghỉ dưỡng bãi biển. Phiên bản đông lạnh hiện nay phổ biến đến mức hầu hết mọi người nghĩ đó là cách "ban đầu" để phục vụ Piña Colada. Nó trở thành thức uống chính thức của Puerto Rico vào năm 1978.',
    },
    named_after: {
      en: 'Spanish for "strained pineapple," referring to the fresh pineapple juice that is a key ingredient. The name remained the same from the original recipe.',
      it: 'Spagnolo per "ananas filtrato," riferendosi al succo di ananas fresco che è un ingrediente chiave. Il nome è rimasto lo stesso dalla ricetta originale.',
      vi: 'Tiếng Tây Ban Nha có nghĩa là "dứa lọc," đề cập đến nước ép dứa tươi là thành phần chính. Tên vẫn giữ nguyên từ công thức gốc.',
    },
  },

  taste: {
    profile: ['creamy', 'tropical', 'sweet'],
    description: {
      en: 'Incredibly creamy and smooth with pronounced coconut and pineapple flavors. The frozen texture makes it like a tropical milkshake - rich, indulgent, and refreshing. Sweet and luscious with the rum providing subtle warmth beneath the cold, creamy surface.',
      it: 'Incredibilmente cremoso e liscio con pronunciati sapori di cocco e ananas. La consistenza ghiacciata lo rende come un frappè tropicale - ricco, indulgente e rinfrescante. Dolce e delizioso con il rum che fornisce un sottile calore sotto la superficie fredda e cremosa.',
      vi: 'Cực kỳ béo ngậy và mịn màng với hương vị dừa và dứa rõ rệt. Kết cấu đông lạnh làm cho nó giống như một ly sinh tố nhiệt đới - đậm đà, nuông chiều và sảng khoái. Ngọt ngào và hấp dẫn với rum mang lại sự ấm áp tinh tế bên dưới bề mặt lạnh, béo ngậy.',
    },
    first_impression: {
      en: 'Cold, creamy coconut and sweet pineapple with smooth frozen texture',
      it: 'Cocco cremoso freddo e ananas dolce con texture ghiacciata liscia',
      vi: 'Dừa béo ngậy lạnh và dứa ngọt với kết cấu đông lạnh mịn màng',
    },
    finish: {
      en: 'Long, creamy finish with lingering coconut sweetness and gentle rum warmth',
      it: 'Finale lungo e cremoso con dolcezza persistente di cocco e delicato calore di rum',
      vi: 'Kết thúc dài, béo ngậy với vị ngọt dừa kéo dài và sự ấm áp nhẹ nhàng của rum',
    },
    balance: {
      en: 'Sweet and creamy with good coconut-pineapple balance - the frozen format makes it more like a dessert than a cocktail',
      it: 'Dolce e cremoso con buon equilibrio cocco-ananas - il formato ghiacciato lo rende più simile a un dessert che a un cocktail',
      vi: 'Ngọt và béo ngậy với sự cân bằng dừa-dứa tốt - định dạng đông lạnh làm cho nó giống món tráng miệng hơn cocktail',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'vacation', 'cruise', 'tropical_celebration'],
    seasons: ['summer', 'year_round'],
    food_pairings: {
      en: 'Perfect as a dessert replacement or alongside tropical fruit platters, coconut shrimp, fish tacos, or light Caribbean fare. Also pairs well with grilled pineapple and coconut cake.',
      it: 'Perfetto come sostituto del dessert o insieme a piatti di frutta tropicale, gamberi al cocco, tacos di pesce o piatti caraibici leggeri. Si abbina bene anche con ananas alla griglia e torta al cocco.',
      vi: 'Hoàn hảo như thay thế món tráng miệng hoặc cùng với đĩa trái cây nhiệt đới, tôm dừa, tacos cá hoặc món ăn Caribbean nhẹ. Cũng kết hợp tốt với dứa nướng và bánh dừa.',
    },
    ideal_for: {
      en: 'Perfect for beach vacations, pool parties, and cruise ships. Ideal for those who love creamy, dessert-like cocktails. The ultimate tropical indulgence and beach resort staple. Great for hot summer days.',
      it: 'Perfetto per vacanze al mare, feste in piscina e navi da crociera. Ideale per chi ama i cocktail cremosi simili ai dessert. L\'indulgenza tropicale definitiva e il pilastro dei resort sulla spiaggia. Ottimo per le calde giornate estive.',
      vi: 'Hoàn hảo cho kỳ nghỉ biển, tiệc hồ bơi và tàu du lịch. Lý tưởng cho những ai yêu thích cocktail béo ngậy giống món tráng miệng. Sự nuông chiều nhiệt đới tối thượng và món chính của khu nghỉ dưỡng bãi biển. Tuyệt vời cho những ngày hè nóng bức.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_CREAM_OF_COCONUT',
      quantity: { amount: 45, unit: 'ml' },
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
    en: 'Add rum, cream of coconut, pineapple juice, and 1.5 cups of ice to a blender. Blend on high speed until smooth and creamy, with a consistency like a frozen milkshake. Pour into a hurricane glass or tiki mug. Garnish with pineapple wedge and maraschino cherry.',
    it: 'Aggiungere rum, crema di cocco, succo di ananas e 1,5 tazze di ghiaccio in un frullatore. Frullare ad alta velocità fino a ottenere una consistenza liscia e cremosa, come un frappè ghiacciato. Versare in un bicchiere hurricane o tazza tiki. Guarnire con spicchio di ananas e ciliegina al maraschino.',
    vi: 'Thêm rum, kem dừa, nước ép dứa và 1,5 cốc đá vào máy xay. Xay ở tốc độ cao cho đến khi mịn và béo ngậy, với độ đặc như sinh tố đá. Đổ vào ly hurricane hoặc cốc tiki. Trang trí với miếng dứa và cherry maraschino.',
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
  base_spirits: ['ING_RUM_WHITE'],

  flavor_profile: ['creamy', 'tropical', 'sweet'],

  abv_estimate: 10,

  calories_estimate: 320,

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
  occasion_tags: ['beach', 'pool_party', 'vacation', 'cruise'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['pina-colada-iba-official', 'virgin-pina-colada', 'strawberry-colada', 'lava-flow'],

  notes_for_staff: 'This is the popular frozen version, different from IBA official recipe. Blend until smooth like a milkshake. Use Coco López or similar cream of coconut (NOT coconut milk). Fresh pineapple juice highly recommended. Official drink of Puerto Rico since 1978. Made famous by Rupert Holmes song. Very popular at beach resorts.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/pina-colada/',
    note: 'Popular frozen variant. Official drink of Puerto Rico. Different from IBA official recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
