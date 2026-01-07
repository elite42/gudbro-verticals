/**
 * Famous Cocktails: B-52
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const b52: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-5e6f-7890-ab12-cd34ef567890',
  slug: 'b-52',
  stable_key: 'b52_shot_famous_layered_bomber',

  name: {
    en: 'B-52',
    it: 'B-52',
    vi: 'B-52',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'layered', 'coffee', 'creamy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A visually stunning layered shot featuring coffee liqueur, Irish cream, and Grand Marnier. Named after the B-52 Stratofortress bomber, this classic shooter is known for its distinct three-layer appearance and smooth, sweet taste.',
    it: 'Uno shot stratificato visivamente stupefacente con liquore al caffè, crema irlandese e Grand Marnier. Prende il nome dal bombardiere B-52 Stratofortress, questo shooter classico è noto per la sua distinta apparenza a tre strati e il gusto dolce e morbido.',
    vi: 'Một shot phân lớp ấn tượng với rượu mùi cà phê, kem Ireland và Grand Marnier. Được đặt tên theo máy bay ném bom B-52 Stratofortress, loại shooter cổ điển này nổi tiếng với vẻ ngoài ba lớp riêng biệt và hương vị ngọt mượt.',
  },

  history: {
    created_year: '1977',
    origin: {
      city: 'Alberta',
      bar: 'Banff Springs Hotel',
      country: 'Canada',
    },
    creator: {
      name: 'Peter Fich',
      profession: 'bartender',
    },
    story: {
      en: "Created by bartender Peter Fich at the Banff Springs Hotel in Alberta, Canada in 1977. The shot was named after the B-52 Stratofortress bomber aircraft. The layering technique creates a visual effect reminiscent of the aircraft's stratified flight levels.",
      it: "Creato dal barman Peter Fich al Banff Springs Hotel in Alberta, Canada nel 1977. Lo shot prende il nome dall'aereo bombardiere B-52 Stratofortress. La tecnica di stratificazione crea un effetto visivo che ricorda i livelli di volo stratificati dell'aereo.",
      vi: 'Được tạo ra bởi bartender Peter Fich tại Khách sạn Banff Springs ở Alberta, Canada vào năm 1977. Shot được đặt tên theo máy bay ném bom B-52 Stratofortress. Kỹ thuật phân lớp tạo ra hiệu ứng thị giác gợi nhớ đến các tầng bay phân tầng của máy bay.',
    },
    named_after: {
      en: 'Named after the B-52 Stratofortress, an American long-range strategic bomber aircraft.',
      it: 'Prende il nome dal B-52 Stratofortress, un bombardiere strategico americano a lungo raggio.',
      vi: 'Được đặt theo tên B-52 Stratofortress, một máy bay ném bom chiến lược tầm xa của Mỹ.',
    },
  },

  taste: {
    profile: ['sweet', 'creamy', 'coffee'],
    description: {
      en: 'Smooth and sweet with distinct layers of coffee, cream, and orange flavors. The Kahlúa provides rich coffee notes, Baileys adds creamy sweetness, and Grand Marnier brings a citrus finish.',
      it: 'Morbido e dolce con distinti strati di sapori di caffè, panna e arancia. Il Kahlúa fornisce ricche note di caffè, il Baileys aggiunge dolcezza cremosa e il Grand Marnier porta un finale agrumato.',
      vi: 'Mượt và ngọt với các lớp cà phê, kem và hương cam riêng biệt. Kahlúa mang đến hương cà phê đậm đà, Baileys thêm vị ngọt béo ngậy, và Grand Marnier mang lại vị cam kết thúc.',
    },
    first_impression: {
      en: 'Sweet coffee and cream flavors with a hint of orange',
      it: 'Sapori dolci di caffè e panna con un tocco di arancia',
      vi: 'Hương vị cà phê và kem ngọt với chút cam',
    },
    finish: {
      en: 'Smooth finish with lingering orange liqueur warmth',
      it: "Finale morbido con calore persistente di liquore all'arancia",
      vi: 'Kết thúc mượt mà với hơi ấm rượu cam kéo dài',
    },
    balance: {
      en: 'Well-balanced layers that blend smoothly when consumed',
      it: 'Strati ben bilanciati che si fondono dolcemente quando consumati',
      vi: 'Các lớp cân bằng tốt hòa quyện mượt mà khi uống',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'nightlife'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best enjoyed on its own as a party shot. Can be paired with chocolate desserts or coffee-based sweets.',
      it: 'Meglio gustato da solo come shot da festa. Può essere abbinato a dessert al cioccolato o dolci a base di caffè.',
      vi: 'Thưởng thức tốt nhất một mình như một shot tiệc tung. Có thể kết hợp với món tráng miệng chocolate hoặc kẹo cà phê.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy sweet, visually impressive shots. A crowd-pleaser at parties and great for coffee liqueur lovers.',
      it: 'Perfetto per chi ama gli shot dolci e visivamente impressionanti. Un successo alle feste e ottimo per gli amanti del liquore al caffè.',
      vi: 'Hoàn hảo cho những ai thích shot ngọt, ấn tượng về mặt thị giác. Được ưa chuộng tại các bữa tiệc và tuyệt vời cho người yêu rượu cà phê.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_KAHLUA',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Kahlúa', it: 'Kahlúa', vi: 'Kahlúa' },
    },
    {
      ingredient_id: 'ING_BAILEYS',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Baileys Irish Cream',
        it: 'Baileys Irish Cream',
        vi: 'Baileys Irish Cream',
      },
    },
    {
      ingredient_id: 'ING_GRAND_MARNIER',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grand Marnier', it: 'Grand Marnier', vi: 'Grand Marnier' },
    },
  ],

  method: 'layer',

  instructions: {
    en: 'Layer the ingredients in a shot glass in the following order: Kahlúa (bottom), Baileys Irish Cream (middle), Grand Marnier (top). Pour each layer slowly over the back of a bar spoon to maintain separation.',
    it: 'Stratificare gli ingredienti in un bicchierino da shot nel seguente ordine: Kahlúa (fondo), Baileys Irish Cream (mezzo), Grand Marnier (cima). Versare ogni strato lentamente sul retro di un cucchiaio da bar per mantenere la separazione.',
    vi: 'Phân lớp các nguyên liệu trong ly shot theo thứ tự sau: Kahlúa (đáy), Baileys Irish Cream (giữa), Grand Marnier (trên). Rót từng lớp chậm rãi qua mặt sau của thìa bar để duy trì sự phân tách.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'None (the layered appearance is the visual appeal)',
    it: "Nessuna (l'aspetto stratificato è l'appeal visivo)",
    vi: 'Không (vẻ ngoài phân lớp là điểm hấp dẫn thị giác)',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_KAHLUA', 'ING_BAILEYS', 'ING_GRAND_MARNIER'],

  flavor_profile: ['sweet', 'creamy', 'coffee'],

  abv_estimate: 25,

  calories_estimate: 160,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all_year'],
  occasion_tags: ['party', 'celebration', 'nightlife'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['b-53', 'b-54', 'flaming-b-52'],

  notes_for_staff:
    'Layer carefully using the back of a bar spoon. Pour slowly to maintain distinct layers. Can be served flaming (ignite Grand Marnier) if requested - ensure safety precautions.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://en.wikipedia.org/wiki/B-52_(cocktail)',
    notes: 'Classic layered shot recipe. Created by Peter Fich in 1977.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
