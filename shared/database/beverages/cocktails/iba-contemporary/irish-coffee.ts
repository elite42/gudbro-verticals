/**
 * IBA Contemporary Classics: Irish Coffee
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const irishCoffee: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
  slug: 'irish-coffee',
  stable_key: 'irish_coffee_iba_contemporary_classic',

  name: {
    en: 'Irish Coffee',
    it: 'Irish Coffee',
    vi: 'Irish Coffee',
    ko: '아이리시 커피',
    ja: 'アイリッシュコーヒー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'hot', 'coffee', 'irish', 'after-dinner', 'winter'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The perfect marriage of hot coffee, Irish whiskey, and cream. Warming, comforting, and sophisticated - this iconic Irish creation is the ultimate cold-weather indulgence.',
    it: 'Il matrimonio perfetto tra caffè caldo, whiskey irlandese e panna. Riscaldante, confortante e sofisticato - questa iconica creazione irlandese è l\'indulgenza definitiva per il freddo.',
    vi: 'Sự kết hợp hoàn hảo của cà phê nóng, whiskey Ireland và kem. Ấm áp, thoải mái và tinh tế - tác phẩm biểu tượng của Ireland này là sự nuông chiều tối thượng cho thời tiết lạnh.',
  },

  history: {
    created_year: '1943',
    origin: {
      city: 'Foynes',
      bar: 'Foynes Airbase Restaurant',
      country: 'Ireland',
    },
    creator: {
      name: 'Joe Sheridan',
      profession: 'chef',
    },
    story: {
      en: 'Created by chef Joe Sheridan at Foynes Airbase (now Shannon Airport) in Ireland during winter 1943. When a Pan Am flying boat returned to port due to bad weather, Sheridan added whiskey to the passengers\' coffee to warm them. When asked if it was Brazilian coffee, he replied, "No, that\'s Irish coffee!" The drink was later popularized in America by travel writer Stanton Delaplane and the Buena Vista Cafe in San Francisco.',
      it: 'Creato dallo chef Joe Sheridan alla base aerea di Foynes (ora aeroporto di Shannon) in Irlanda durante l\'inverno del 1943. Quando un idrovolante della Pan Am tornò al porto a causa del maltempo, Sheridan aggiunse whiskey al caffè dei passeggeri per scaldarli. Quando gli fu chiesto se fosse caffè brasiliano, rispose: "No, è Irish coffee!" La bevanda fu poi resa popolare in America dallo scrittore di viaggi Stanton Delaplane e dal Buena Vista Cafe di San Francisco.',
      vi: 'Được tạo ra bởi đầu bếp Joe Sheridan tại căn cứ không quân Foynes (nay là sân bay Shannon) ở Ireland trong mùa đông năm 1943. Khi một thủy phi cơ Pan Am quay lại cảng do thời tiết xấu, Sheridan đã thêm whiskey vào cà phê của hành khách để sưởi ấm họ. Khi được hỏi liệu đó có phải là cà phê Brazil không, ông trả lời, "Không, đó là Irish coffee!" Thức uống sau đó được phổ biến ở Mỹ bởi nhà văn du lịch Stanton Delaplane và Buena Vista Cafe ở San Francisco.',
    },
    named_after: {
      en: 'Named "Irish Coffee" by its creator Joe Sheridan to distinguish it from regular coffee.',
      it: 'Chiamato "Irish Coffee" dal suo creatore Joe Sheridan per distinguerlo dal normale caffè.',
      vi: 'Được đặt tên "Irish Coffee" bởi người tạo ra nó Joe Sheridan để phân biệt với cà phê thông thường.',
    },
  },

  taste: {
    profile: ['coffee', 'creamy', 'warm'],
    description: {
      en: 'Rich coffee with smooth Irish whiskey warmth, balanced by sweet brown sugar and topped with luxurious cream. The cream should be sipped through, creating a perfect contrast between hot coffee and cold cream.',
      it: 'Caffè ricco con morbido calore di whiskey irlandese, bilanciato da zucchero di canna dolce e coronato da panna lussuosa. La panna dovrebbe essere sorseggiata attraverso, creando un perfetto contrasto tra caffè caldo e panna fredda.',
      vi: 'Cà phê đậm đà với hơi ấm whiskey Ireland mượt mà, cân bằng bởi đường nâu ngọt và phủ kem sang trọng. Kem nên được nhấm nháp qua, tạo ra sự tương phản hoàn hảo giữa cà phê nóng và kem lạnh.',
    },
    first_impression: {
      en: 'Hot coffee and whiskey warmth with cold cream',
      it: 'Caffè caldo e calore di whiskey con panna fredda',
      vi: 'Cà phê nóng và hơi ấm whiskey với kem lạnh',
    },
    finish: {
      en: 'Long, warming finish with lingering coffee and whiskey',
      it: 'Finale lungo e caldo con caffè e whiskey persistenti',
      vi: 'Kết thúc dài, ấm áp với cà phê và whiskey kéo dài',
    },
    balance: {
      en: 'Perfect balance between coffee bitterness, whiskey warmth, and cream richness',
      it: 'Equilibrio perfetto tra amarezza del caffè, calore del whiskey e ricchezza della panna',
      vi: 'Cân bằng hoàn hảo giữa vị đắng cà phê, hơi ấm whiskey và độ đậm đà của kem',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['after-dinner', 'nightcap', 'winter_gathering', 'digestivo'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect after dinner, especially with chocolate desserts, Irish desserts like bread pudding, or as a standalone digestif.',
      it: 'Perfetto dopo cena, specialmente con dessert al cioccolato, dessert irlandesi come il bread pudding, o come digestivo autonomo.',
      vi: 'Hoàn hảo sau bữa tối, đặc biệt với món tráng miệng chocolate, món tráng miệng Ireland như bánh pudding bánh mì, hoặc như một thức uống tiêu hóa độc lập.',
    },
    ideal_for: {
      en: 'Perfect for coffee and whiskey lovers seeking warmth and comfort. Ideal for cold evenings, après-ski, or any time you need warming up.',
      it: 'Perfetto per gli amanti del caffè e del whiskey che cercano calore e comfort. Ideale per serate fredde, après-ski, o ogni volta che hai bisogno di scaldarti.',
      vi: 'Hoàn hảo cho người yêu cà phê và whiskey tìm kiếm sự ấm áp và thoải mái. Lý tưởng cho buổi tối lạnh, après-ski, hoặc bất cứ khi nào bạn cần sưởi ấm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_IRISH_WHISKEY',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Irish whiskey', it: 'Whiskey irlandese', vi: 'Whiskey Ireland' },
    },
    {
      ingredient_id: 'ING_HOT_COFFEE',
      quantity: { amount: 80, unit: 'ml' },
      display_name: { en: 'Hot coffee', it: 'Caffè caldo', vi: 'Cà phê nóng' },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
    {
      ingredient_id: 'ING_BROWN_SUGAR',
      quantity: { amount: 1, unit: 'tsp' },
      display_name: { en: 'Brown sugar', it: 'Zucchero di canna', vi: 'Đường nâu' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Warm an Irish coffee glass with hot water, then empty. Pour in hot coffee and dissolve brown sugar. Add Irish whiskey and stir. Top with lightly whipped cream by pouring it over the back of a spoon so it floats on top. Do not stir after adding cream.',
    it: 'Scaldare un bicchiere da Irish coffee con acqua calda, poi svuotare. Versare il caffè caldo e sciogliere lo zucchero di canna. Aggiungere il whiskey irlandese e mescolare. Completare con panna leggermente montata versandola sul dorso di un cucchiaio in modo che galleggi sopra. Non mescolare dopo aver aggiunto la panna.',
    vi: 'Làm ấm ly Irish coffee bằng nước nóng, sau đó làm trống. Đổ cà phê nóng vào và hòa tan đường nâu. Thêm whiskey Ireland và khuấy. Phủ kem đánh nhẹ bằng cách rót nó qua mặt sau của thìa để nó nổi trên mặt. Không khuấy sau khi thêm kem.',
  },

  glass: 'Irish coffee glass',

  garnish: {
    en: 'None (cream topping)',
    it: 'Nessuna (topping di panna)',
    vi: 'Không (phủ kem)',
  },

  ice: 'none',

  serving_style: 'hot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_IRISH_WHISKEY'],

  flavor_profile: ['coffee', 'creamy', 'warm'],

  abv_estimate: 8,

  calories_estimate: 210,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['after-dinner', 'nightcap', 'winter_gathering', 'digestivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['baileys-coffee', 'spanish-coffee', 'italian-coffee'],

  notes_for_staff: 'The cream must float on top - lightly whip it to proper consistency (not too thick) and pour over the back of a spoon. Pre-warm the glass. Use good quality Irish whiskey and fresh, hot coffee. The drink is meant to be sipped through the cream, not stirred.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/irish-coffee/',
    note: 'IBA Official Recipe. Created by Joe Sheridan in 1943.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
