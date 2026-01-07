/**
 * Famous Cocktails: Aperol Spritz
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const aperolSpritz: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c',
  slug: 'aperol-spritz',
  stable_key: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',

  name: {
    en: 'Aperol Spritz',
    it: 'Aperol Spritz',
    vi: 'Aperol Spritz',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'aperitivo', 'italian', 'refreshing', 'sparkling'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "Italy's most iconic aperitivo cocktail, the Aperol Spritz combines Aperol's bittersweet orange flavor with prosecco and soda water. Light, refreshing, and impossibly drinkable, it's the perfect pre-dinner drink that embodies the Italian art of \"la dolce vita.\"",
    it: "Il cocktail aperitivo più iconico d'Italia, l'Aperol Spritz combina il sapore amarognolo e dolce dell'Aperol con prosecco e acqua frizzante. Leggero, rinfrescante e incredibilmente beverino, è il perfetto drink pre-cena che incarna l'arte italiana della \"dolce vita.\"",
    vi: 'Cocktail khai vị mang tính biểu tượng nhất của Ý, Aperol Spritz kết hợp hương vị cam đắng ngọt của Aperol với prosecco và nước soda. Nhẹ nhàng, sảng khoái và dễ uống không thể tin được, đây là thức uống trước bữa tối hoàn hảo thể hiện nghệ thuật "la dolce vita" của Ý.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'Venice',
      bar: 'Various cafes',
      country: 'Italy',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Aperol Spritz has its roots in the Habsburg Empire\'s occupation of Venice in the 1800s. Austrian soldiers found local Italian wines too strong and began diluting them with water - creating the "spritz." When Aperol was created by the Barbieri brothers in Padua in 1919, bartenders in the Veneto region began mixing it with prosecco and soda water. The drink exploded in popularity in the 1950s and became synonymous with Italian aperitivo culture. It gained worldwide fame in the 2000s, becoming the unofficial drink of summer.',
      it: "L'Aperol Spritz ha le sue radici nell'occupazione di Venezia da parte dell'Impero Asburgico nel 1800. I soldati austriaci trovavano i vini locali italiani troppo forti e cominciarono a diluirli con acqua - creando lo \"spritz.\" Quando l'Aperol fu creato dai fratelli Barbieri a Padova nel 1919, i barman nella regione Veneto cominciarono a mescolarlo con prosecco e acqua frizzante. La bevanda esplose in popolarità negli anni '50 e divenne sinonimo della cultura dell'aperitivo italiano. Ha guadagnato fama mondiale negli anni 2000, diventando il drink non ufficiale dell'estate.",
      vi: 'Aperol Spritz có nguồn gốc từ thời Đế chế Habsburg chiếm đóng Venice vào những năm 1800. Binh lính Áo thấy rượu vang Ý địa phương quá mạnh và bắt đầu pha loãng với nước - tạo ra "spritz." Khi Aperol được tạo ra bởi anh em nhà Barbieri ở Padua năm 1919, các bartender ở vùng Veneto bắt đầu trộn nó với prosecco và nước soda. Thức uống bùng nổ phổ biến vào những năm 1950 và trở thành từ đồng nghĩa với văn hóa aperitivo của Ý. Nó nổi tiếng toàn cầu vào những năm 2000, trở thành thức uống không chính thức của mùa hè.',
    },
    named_after: {
      en: 'Named after Aperol, the Italian aperitif liqueur created by the Barbieri brothers. "Spritz" comes from the German word "spritzen" meaning "to spray" or "splash."',
      it: 'Prende il nome dall\'Aperol, il liquore aperitivo italiano creato dai fratelli Barbieri. "Spritz" deriva dalla parola tedesca "spritzen" che significa "spruzzare."',
      vi: 'Được đặt theo tên Aperol, rượu khai vị Ý được tạo ra bởi anh em nhà Barbieri. "Spritz" xuất phát từ từ tiếng Đức "spritzen" có nghĩa là "phun" hoặc "bắn tung tóe."',
    },
  },

  taste: {
    profile: ['bitter', 'sweet', 'citrus'],
    description: {
      en: 'Bright, refreshing, and perfectly balanced. The Aperol Spritz delivers a bittersweet orange flavor with subtle herbal notes, lifted by prosecco bubbles and lengthened with a splash of soda. Low in alcohol, high in drinkability.',
      it: "Brillante, rinfrescante e perfettamente bilanciato. L'Aperol Spritz offre un sapore di arancia amarognola con note erbacee sottili, sollevato dalle bollicine del prosecco e allungato con uno splash di soda. Basso contenuto alcolico, alta bevibilità.",
      vi: 'Tươi sáng, sảng khoái và cân bằng hoàn hảo. Aperol Spritz mang đến hương vị cam đắng ngọt với nốt thảo mộc tinh tế, được nâng lên bởi bọt prosecco và kéo dài với một chút soda. Độ cồn thấp, độ dễ uống cao.',
    },
    first_impression: {
      en: 'Bright orange citrus with gentle bubbles and a hint of bitterness',
      it: 'Agrumi arancioni brillanti con bollicine delicate e un tocco di amarezza',
      vi: 'Cam tươi sáng với bọt nhẹ nhàng và một chút đắng',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering orange and subtle herbal notes',
      it: 'Finale pulito e rinfrescante con note persistenti di arancia e erbe sottili',
      vi: 'Kết thúc sạch, sảng khoái với hương cam kéo dài và nốt thảo mộc tinh tế',
    },
    balance: {
      en: 'Masterfully balanced between bitter and sweet, with effervescence adding lightness and drinkability',
      it: "Magistralmente bilanciato tra amaro e dolce, con l'effervescenza che aggiunge leggerezza e bevibilità",
      vi: 'Cân bằng tuyệt vời giữa đắng và ngọt, với sủi bọt thêm sự nhẹ nhàng và dễ uống',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'early_evening'],
    occasions: ['aperitivo', 'social', 'outdoor', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Italian aperitivo classics: olives, bruschetta, prosciutto, cheese, cicchetti. Also pairs well with seafood, light salads, and salty snacks.',
      it: "Perfetto con i classici dell'aperitivo italiano: olive, bruschetta, prosciutto, formaggio, cicchetti. Si abbina bene anche con frutti di mare, insalate leggere e snack salati.",
      vi: 'Hoàn hảo với các món khai vị Ý cổ điển: ô liu, bruschetta, prosciutto, phô mai, cicchetti. Cũng kết hợp tốt với hải sản, salad nhẹ và đồ ăn vặt mặn.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy light, refreshing aperitifs. Ideal for social gatherings, outdoor terraces, and lazy summer afternoons. A gateway cocktail for those new to bittersweet flavors.',
      it: "Perfetto per chi ama aperitivi leggeri e rinfrescanti. Ideale per incontri sociali, terrazze all'aperto e pigri pomeriggi estivi. Un cocktail d'ingresso per chi è nuovo ai sapori amarognoli.",
      vi: 'Hoàn hảo cho những ai thích đồ uống khai vị nhẹ, sảng khoái. Lý tưởng cho các buổi họp mặt, sân thượng ngoài trời và những buổi chiều hè lười biếng. Cocktail cửa ngõ cho những người mới làm quen với hương vị đắng ngọt.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_PROSECCO',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Prosecco', it: 'Prosecco', vi: 'Prosecco' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Aperol', it: 'Aperol', vi: 'Aperol' },
    },
    {
      ingredient_id: 'ING_SODA_WATER',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Soda water', it: 'Acqua frizzante', vi: 'Nước soda' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a large wine glass with ice. Add Aperol, followed by prosecco, and finish with a splash of soda water. Stir gently to combine. Garnish with an orange slice.',
    it: "Riempire un grande bicchiere da vino con ghiaccio. Aggiungere l'Aperol, seguito dal prosecco, e finire con uno splash di acqua frizzante. Mescolare delicatamente. Guarnire con una fetta d'arancia.",
    vi: 'Đổ đầy ly rượu vang lớn với đá. Thêm Aperol, tiếp theo prosecco, và kết thúc với một chút nước soda. Khuấy nhẹ để pha trộn. Trang trí với lát cam.',
  },

  glass: 'Large wine glass',

  garnish: {
    en: 'Orange slice',
    it: "Fetta d'arancia",
    vi: 'Lát cam',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_APEROL'],

  flavor_profile: ['bitter', 'sweet', 'citrus'],

  abv_estimate: 8,

  calories_estimate: 158,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
      'nut_free',
      'dairy_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['aperitivo', 'social', 'outdoor', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['campari-spritz', 'select-spritz', 'cynar-spritz'],

  notes_for_staff:
    "The traditional ratio is 3-2-1 (prosecco-Aperol-soda). Use well-chilled prosecco. Don't over-stir - gentle integration is key. Serve immediately while bubbles are active.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.aperol.com/en-us/cocktails/aperol-spritz/',
    notes: 'Official Aperol recipe. Historical information from various cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
