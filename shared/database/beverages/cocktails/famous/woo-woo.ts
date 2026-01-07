/**
 * Famous Cocktails: Woo Woo
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const wooWoo: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-0123-4567-f012-456789012345',
  slug: 'woo-woo',
  stable_key: 'd3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2',

  name: {
    en: 'Woo Woo',
    it: 'Woo Woo',
    vi: 'Woo Woo',
    ko: '우 우',
    ja: 'ウーウー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'vodka', 'peach', 'cranberry', 'fruity', 'party'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sweet and fruity party cocktail combining vodka, peach schnapps, and cranberry juice. The Woo Woo is a fun, easy-drinking highball that became a staple of 1980s nightlife and remains a popular choice for celebrations.',
    it: "Un cocktail da festa dolce e fruttato che combina vodka, schnapps alla pesca e succo di mirtillo rosso. Il Woo Woo è un highball divertente e facile da bere che divenne un pilastro della vita notturna degli anni '80 e rimane una scelta popolare per le celebrazioni.",
    vi: 'Một cocktail tiệc tùng ngọt ngào và trái cây kết hợp vodka, schnapps đào và nước ép nam việt quất. Woo Woo là highball vui vẻ, dễ uống đã trở thành thức uống chính của cuộc sống về đêm những năm 1980 và vẫn là lựa chọn phổ biến cho các dịp kỷ niệm.',
  },

  history: {
    created_year: '1980',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: 'The Woo Woo emerged in the 1980s during the heyday of fruity vodka cocktails and sweet schnapps drinks. It became popular in nightclubs and bars as an easy-to-make, crowd-pleasing shot and cocktail. The name is thought to come from the enthusiastic reaction people had when drinking it. The Woo Woo is essentially a variation of the Sex on the Beach, using cranberry juice instead of orange juice, and became a favorite among party-goers for its sweet, approachable flavor.',
      it: "Il Woo Woo emerse negli anni '80 durante l'età dell'oro dei cocktail fruttati alla vodka e delle bevande dolci con schnapps. Divenne popolare nei nightclub e nei bar come shot e cocktail facile da preparare e che piaceva a tutti. Si pensa che il nome derivi dalla reazione entusiasta che le persone avevano bevendo. Il Woo Woo è essenzialmente una variazione del Sex on the Beach, usando succo di mirtillo rosso invece di succo d'arancia, e divenne un favorito tra i festaioli per il suo sapore dolce e accessibile.",
      vi: 'Woo Woo xuất hiện vào những năm 1980 trong thời kỳ hoàng kim của các cocktail vodka trái cây và đồ uống schnapps ngọt. Nó trở nên phổ biến ở các hộp đêm và quán bar như một shot và cocktail dễ làm, được nhiều người yêu thích. Cái tên được cho là xuất phát từ phản ứng nhiệt tình của mọi người khi uống nó. Woo Woo về cơ bản là một biến thể của Sex on the Beach, sử dụng nước ép nam việt quất thay vì nước cam, và trở thành món yêu thích của những người đi tiệc vì hương vị ngọt ngào, dễ tiếp cận.',
    },
    named_after: {
      en: 'Named after the enthusiastic "woo woo!" exclamation people made when enjoying this fun, party-friendly cocktail.',
      it: 'Prende il nome dall\'esclamazione entusiasta "woo woo!" che le persone facevano quando gustavano questo cocktail divertente e adatto alle feste.',
      vi: 'Được đặt theo tiếng kêu nhiệt tình "woo woo!" mọi người thốt lên khi thưởng thức cocktail vui vẻ, thân thiện với tiệc tùng này.',
    },
  },

  taste: {
    profile: ['sweet', 'fruity', 'peach', 'tart'],
    description: {
      en: 'Sweet and fruity with dominant peach flavor from the schnapps, balanced by the tart cranberry juice. The vodka provides a subtle kick without overwhelming the fruit flavors, making it dangerously easy to drink.',
      it: 'Dolce e fruttato con sapore dominante di pesca dallo schnapps, bilanciato dal succo di mirtillo rosso aspro. La vodka fornisce un calcio sottile senza sopraffare i sapori di frutta, rendendolo pericolosamente facile da bere.',
      vi: 'Ngọt ngào và trái cây với hương đào nổi bật từ schnapps, được cân bằng bởi nước ép nam việt quất chua. Vodka mang lại cảm giác mạnh nhẹ mà không át hương trái cây, khiến nó cực kỳ dễ uống.',
    },
    first_impression: {
      en: 'Sweet peach and cranberry burst with vibrant fruitiness',
      it: 'Esplosione di pesca dolce e mirtillo rosso con fruttosità vibrante',
      vi: 'Vị đào ngọt và nam việt quất bùng nổ với hương trái cây sống động',
    },
    finish: {
      en: 'Sweet, smooth finish with lingering peach and cranberry notes',
      it: 'Finale dolce e morbido con note persistenti di pesca e mirtillo rosso',
      vi: 'Kết thúc ngọt ngào, mượt mà với hương đào và nam việt quất kéo dài',
    },
    balance: {
      en: 'Leans toward sweetness but cranberry provides enough tartness to keep it refreshing',
      it: 'Tende verso la dolcezza ma il mirtillo rosso fornisce abbastanza acidità per mantenerlo rinfrescante',
      vi: 'Nghiêng về vị ngọt nhưng nam việt quất cung cấp đủ vị chua để giữ nó tươi mát',
    },
  },

  recommendations: {
    best_time: ['evening', 'night', 'late_night'],
    occasions: ['party', 'celebration', 'nightclub', 'girls_night'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Best enjoyed as a party drink rather than with food. Pairs well with salty snacks, chips, and finger foods at casual gatherings.',
      it: 'Meglio gustato come drink da festa piuttosto che con il cibo. Si abbina bene con snack salati, patatine e finger food in incontri informali.',
      vi: 'Tốt nhất nên thưởng thức như thức uống tiệc tùng hơn là với đồ ăn. Kết hợp tốt với đồ ăn nhẹ mặn, khoai tây chiên và đồ ăn vặt tại các buổi họp mặt thân mật.',
    },
    ideal_for: {
      en: "Perfect for party-goers and those who enjoy sweet, fruity cocktails. Great for celebrations, nightclub settings, or anyone who prefers drinks that don't taste strongly of alcohol.",
      it: 'Perfetto per i festaioli e per chi ama cocktail dolci e fruttati. Ottimo per celebrazioni, ambienti da nightclub o per chiunque preferisca drink che non hanno un sapore forte di alcol.',
      vi: 'Hoàn hảo cho người đi tiệc và những ai thích cocktail ngọt ngào, trái cây. Tuyệt vời cho các dịp kỷ niệm, môi trường hộp đêm hoặc bất kỳ ai thích đồ uống không có vị rượu mạnh.',
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
      ingredient_id: 'ING_PEACH_SCHNAPPS',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Peach schnapps', it: 'Schnapps alla pesca', vi: 'Schnapps đào' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: {
        en: 'Cranberry juice',
        it: 'Succo di mirtillo rosso',
        vi: 'Nước ép nam việt quất',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour vodka and peach schnapps over ice, then top with cranberry juice. Stir gently to combine. Garnish with a lime wedge.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare vodka e schnapps alla pesca sul ghiaccio, quindi completare con succo di mirtillo rosso. Mescolare delicatamente per combinare. Guarnire con uno spicchio di lime.',
    vi: 'Đổ đầy ly highball với đá. Rót vodka và schnapps đào lên đá, sau đó thêm nước ép nam việt quất. Khuấy nhẹ nhàng để trộn đều. Trang trí với một lát chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['sweet', 'fruity', 'peach', 'tart'],

  abv_estimate: 12,

  calories_estimate: 195,

  difficulty: 'easy',

  prep_time_seconds: 30,

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
  variants: ['sex-on-the-beach', 'fuzzy-navel'],

  notes_for_staff:
    'Can also be served as a shot (equal parts all ingredients). Very popular with younger crowds. Use quality peach schnapps for best flavor - avoid artificial-tasting brands.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1239/woo-woo',
    notes: 'Popular 1980s party drink, variation of Sex on the Beach.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
