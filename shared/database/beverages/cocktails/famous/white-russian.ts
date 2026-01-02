/**
 * Famous Cocktails: White Russian
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const whiteRussian: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  slug: 'white-russian',
  stable_key: 'white_russian_vodka_kahlua_cream',

  name: {
    en: 'White Russian',
    it: 'White Russian',
    vi: 'White Russian',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'coffee', 'vodka-based'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A creamy, sweet cocktail combining vodka, coffee liqueur, and fresh cream. Made famous by "The Big Lebowski," the White Russian is the ultimate indulgent drink that blurs the line between cocktail and dessert.',
    it: 'Un cocktail cremoso e dolce che combina vodka, liquore al caffè e panna fresca. Reso famoso da "Il Grande Lebowski," il White Russian è la bevanda indulgente definitiva che confonde il confine tra cocktail e dessert.',
    vi: 'Một loại cocktail béo ngậy, ngọt kết hợp vodka, rượu mùi cà phê và kem tươi. Được làm nổi tiếng bởi "The Big Lebowski," White Russian là thức uống nuông chiều tối thượng làm mờ ranh giới giữa cocktail và món tráng miệng.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Unknown',
      country: 'USA',
    },
    story: {
      en: 'The White Russian emerged in the 1960s as a variation of the Black Russian (vodka and Kahlúa), with the addition of cream. While it enjoyed moderate popularity in the 1970s, the cocktail experienced a massive resurgence after appearing as the signature drink of Jeff Bridges\' character "The Dude" in the 1998 Coen Brothers film "The Big Lebowski." The movie popularized the drink among a new generation, making it an icon of laid-back sophistication.',
      it: 'Il White Russian è emerso negli anni \'60 come variazione del Black Russian (vodka e Kahlúa), con l\'aggiunta di panna. Sebbene godesse di una moderata popolarità negli anni \'70, il cocktail ha vissuto una massiccia rinascita dopo essere apparso come la bevanda distintiva del personaggio di Jeff Bridges "The Dude" nel film dei fratelli Coen del 1998 "Il Grande Lebowski." Il film ha reso popolare la bevanda tra una nuova generazione, rendendola un\'icona di sofisticazione rilassata.',
      vi: 'White Russian xuất hiện vào những năm 1960 như một biến thể của Black Russian (vodka và Kahlúa), với sự bổ sung của kem. Trong khi nó được ưa chuộng vừa phải vào những năm 1970, cocktail đã trải qua sự hồi sinh lớn sau khi xuất hiện như thức uống đặc trưng của nhân vật Jeff Bridges "The Dude" trong bộ phim năm 1998 của anh em nhà Coen "The Big Lebowski." Bộ phim đã phổ biến thức uống này trong thế hệ mới, biến nó thành biểu tượng của sự tinh tế thoải mái.',
    },
    named_after: {
      en: 'Named "White Russian" due to the addition of cream to the Black Russian, turning it white. The "Russian" refers to the vodka base.',
      it: 'Chiamato "White Russian" per l\'aggiunta di panna al Black Russian, che lo rende bianco. Il "Russian" si riferisce alla base di vodka.',
      vi: 'Được đặt tên "White Russian" do việc thêm kem vào Black Russian, biến nó thành màu trắng. "Russian" đề cập đến cơ sở vodka.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'coffee'],
    description: {
      en: 'Smooth and dessert-like with pronounced coffee flavors balanced by sweet cream and clean vodka. The texture is silky and indulgent, making it more of a treat than a traditional cocktail.',
      it: 'Liscio e simile a un dessert con pronunciati sapori di caffè bilanciati da panna dolce e vodka pulita. La consistenza è setosa e indulgente, rendendolo più un dolcetto che un cocktail tradizionale.',
      vi: 'Mượt mà và giống món tráng miệng với hương vị cà phê rõ rệt được cân bằng bởi kem ngọt và vodka trong sạch. Kết cấu mượt như lụa và nuông chiều, biến nó thành món ăn đặc biệt hơn là cocktail truyền thống.',
    },
    first_impression: {
      en: 'Sweet coffee and cream dominate, with a smooth vodka backbone',
      it: 'Caffè dolce e panna dominano, con una base liscia di vodka',
      vi: 'Cà phê ngọt và kem chiếm ưu thế, với xương sống vodka mượt mà',
    },
    finish: {
      en: 'Lingering coffee sweetness with creamy texture',
      it: 'Dolcezza persistente di caffè con consistenza cremosa',
      vi: 'Vị ngọt cà phê kéo dài với kết cấu béo ngậy',
    },
    balance: {
      en: 'Rich and sweet, designed for dessert lovers rather than those seeking balance',
      it: 'Ricco e dolce, progettato per gli amanti dei dessert piuttosto che per chi cerca equilibrio',
      vi: 'Đậm đà và ngọt, được thiết kế cho người yêu tráng miệng hơn là những người tìm kiếm sự cân bằng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'casual', 'movie_night', 'nightcap'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Perfect with chocolate desserts, coffee cake, tiramisu, or as a dessert replacement. Also pairs well with vanilla ice cream and brownie.',
      it: 'Perfetto con dessert al cioccolato, torta al caffè, tiramisù, o come sostituto del dessert. Si abbina bene anche con gelato alla vaniglia e brownie.',
      vi: 'Hoàn hảo với các món tráng miệng chocolate, bánh cà phê, tiramisu, hoặc thay thế món tráng miệng. Cũng kết hợp tốt với kem vani và brownie.',
    },
    ideal_for: {
      en: 'Perfect for coffee lovers who enjoy sweet, creamy cocktails. A must-try for fans of "The Big Lebowski." Ideal for those who want a relaxing, indulgent drink without too much alcohol bite.',
      it: 'Perfetto per gli amanti del caffè che amano i cocktail dolci e cremosi. Un must per i fan de "Il Grande Lebowski." Ideale per chi vuole una bevanda rilassante e indulgente senza troppo morso alcolico.',
      vi: 'Hoàn hảo cho người yêu cà phê thích cocktail ngọt, béo ngậy. Phải thử cho người hâm mộ "The Big Lebowski." Lý tưởng cho những ai muốn thức uống thư giãn, nuông chiều mà không có nhiều vị cồn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_COFFEE_LIQUEUR',
      quantity: { amount: 25, unit: 'ml' },
      display_name: {
        en: 'Coffee liqueur (Kahlúa)',
        it: 'Liquore al caffè (Kahlúa)',
        vi: 'Rượu mùi cà phê (Kahlúa)',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill an Old Fashioned glass with ice. Pour vodka and coffee liqueur over ice. Gently float cream on top by pouring over the back of a spoon. Stir gently before drinking, or enjoy layered.',
    it: 'Riempire un bicchiere Old Fashioned con ghiaccio. Versare vodka e liquore al caffè sul ghiaccio. Far galleggiare delicatamente la panna sopra versando sul retro di un cucchiaio. Mescolare delicatamente prima di bere, o gustare a strati.',
    vi: 'Đổ đầy ly Old Fashioned với đá. Rót vodka và rượu mùi cà phê lên đá. Nhẹ nhàng để kem nổi trên mặt bằng cách rót qua mặt sau của thìa. Khuấy nhẹ trước khi uống, hoặc thưởng thức theo lớp.',
  },

  glass: 'Old Fashioned',

  garnish: {
    en: 'None (or coffee beans optional)',
    it: 'Nessuna (o chicchi di caffè opzionali)',
    vi: 'Không (hoặc hạt cà phê tùy chọn)',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['creamy', 'sweet', 'coffee'],

  abv_estimate: 16,

  calories_estimate: 250,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol', 'caffeine'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all-seasons'],
  occasion_tags: ['digestivo', 'casual', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['black-russian', 'white-cuban', 'dirty-russian'],

  notes_for_staff: 'The Dude from "The Big Lebowski" made this drink iconic. Can be built directly in glass or shaken for a frothier texture. Some guests prefer it stirred, others layered. Use good quality coffee liqueur for best results.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/white-russian/',
    note: 'Classic recipe popularized by "The Big Lebowski" (1998).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
