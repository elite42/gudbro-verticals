/**
 * IBA Unforgettables: Rusty Nail
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const rustyNail: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c',
  slug: 'rusty-nail',
  stable_key: 'b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7',

  name: {
    en: 'Rusty Nail',
    it: 'Rusty Nail',
    vi: 'Rusty Nail',
    ko: '러스티 네일',
    ja: 'ラスティ・ネイル',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'two-ingredient', 'stirred', 'after-dinner', 'scottish'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A classic Scottish two-ingredient cocktail combining Scotch whisky with Drambuie, the honey and herb liqueur. Simple yet sophisticated, the Rusty Nail is warming, smooth, and perfect for sipping slowly. The golden color and rich flavor make it an ideal after-dinner drink.',
    it: 'Un classico cocktail scozzese a due ingredienti che combina whisky scozzese con Drambuie, il liquore al miele ed erbe. Semplice ma sofisticato, il Rusty Nail è caldo, morbido e perfetto da sorseggiare lentamente. Il colore dorato e il sapore ricco lo rendono una bevanda ideale dopo cena.',
    vi: 'Một cocktail Scotland cổ điển hai thành phần kết hợp Scotch whisky với Drambuie, liqueur mật ong và thảo mộc. Đơn giản nhưng tinh tế, Rusty Nail ấm áp, mượt mà và hoàn hảo để nhâm nhi từ từ. Màu vàng óng và hương vị đậm đà làm cho nó trở thành thức uống lý tưởng sau bữa tối.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Unknown',
      bar: '21 Club (popularized)',
      country: 'USA/Scotland',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'While the exact origins are unclear, the Rusty Nail gained popularity in the 1960s and 1970s, particularly after being championed by the Rat Pack (Frank Sinatra, Dean Martin, and their crew) at New York\'s 21 Club. The drink showcases Drambuie, a Scotch-based liqueur flavored with honey, herbs, and spices, which was created from a secret recipe given to the MacKinnon family by Bonnie Prince Charlie in 1746. The name "Rusty Nail" likely refers to the drink\'s rusty golden color.',
      it: 'Anche se le origini esatte non sono chiare, il Rusty Nail guadagnò popolarità negli anni \'60 e \'70, in particolare dopo essere stato promosso dal Rat Pack (Frank Sinatra, Dean Martin e il loro gruppo) al 21 Club di New York. La bevanda mette in mostra il Drambuie, un liquore a base di Scotch aromatizzato con miele, erbe e spezie, creato da una ricetta segreta data alla famiglia MacKinnon dal Principe Charlie nel 1746. Il nome "Rusty Nail" si riferisce probabilmente al colore dorato arrugginito della bevanda.',
      vi: 'Mặc dù nguồn gốc chính xác không rõ ràng, Rusty Nail trở nên phổ biến vào những năm 1960 và 1970, đặc biệt sau khi được Rat Pack (Frank Sinatra, Dean Martin và nhóm của họ) ủng hộ tại 21 Club của New York. Thức uống thể hiện Drambuie, một liqueur dựa trên Scotch có hương vị mật ong, thảo mộc và gia vị, được tạo ra từ công thức bí mật được Hoàng tử Charlie trao cho gia đình MacKinnon vào năm 1746. Cái tên "Rusty Nail" có thể đề cập đến màu vàng óng gỉ của thức uống.',
    },
    named_after: {
      en: 'Named for the rusty golden color of the drink.',
      it: 'Prende il nome dal colore dorato arrugginito della bevanda.',
      vi: 'Được đặt tên theo màu vàng óng gỉ của thức uống.',
    },
  },

  taste: {
    profile: ['sweet', 'herbal', 'warming'],
    description: {
      en: 'Rich and warming with smoky Scotch balanced by sweet, honeyed Drambuie. The honey and herbal notes from Drambuie soften the whisky\'s edges while maintaining complexity. Smooth and satisfying with a long, warming finish.',
      it: 'Ricco e caldo con Scotch affumicato bilanciato dal Drambuie dolce e mielato. Le note di miele ed erbacee del Drambuie ammorbidiscono i bordi del whisky mantenendo la complessità. Morbido e soddisfacente con un finale lungo e caldo.',
      vi: 'Đậm đà và ấm áp với Scotch khói cân bằng bởi Drambuie ngọt, mật ong. Hương mật ong và thảo mộc từ Drambuie làm mềm các cạnh của whisky trong khi duy trì độ phức tạp. Mượt mà và thỏa mãn với kết thúc dài, ấm áp.',
    },
    first_impression: {
      en: 'Sweet honey and herbs followed by smoky Scotch',
      it: 'Miele dolce ed erbe seguite da Scotch affumicato',
      vi: 'Mật ong ngọt và thảo mộc tiếp theo là Scotch khói',
    },
    finish: {
      en: 'Long, warming finish with lingering honey, herbs, and smoke',
      it: 'Finale lungo e caldo con miele, erbe e fumo persistenti',
      vi: 'Kết thúc dài, ấm áp với mật ong, thảo mộc và khói kéo dài',
    },
    balance: {
      en: 'Well-balanced between sweet Drambuie and smoky Scotch',
      it: 'Ben bilanciato tra Drambuie dolce e Scotch affumicato',
      vi: 'Cân bằng tốt giữa Drambuie ngọt và Scotch khói',
    },
  },

  recommendations: {
    best_time: ['after_dinner', 'evening', 'nightcap'],
    occasions: ['digestivo', 'nightcap', 'contemplative', 'fireside'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Perfect as a digestif with desserts, especially those with caramel, honey, or nuts. Pairs well with Scottish shortbread, chocolate, aged cheese, or smoked meats.',
      it: 'Perfetto come digestivo con dessert, specialmente quelli con caramello, miele o noci. Si abbina bene con shortbread scozzese, cioccolato, formaggi stagionati o carni affumicate.',
      vi: 'Hoàn hảo như một digestif với món tráng miệng, đặc biệt là những món có caramel, mật ong hoặc hạt. Kết hợp tốt với bánh shortbread Scotland, chocolate, phô mai già hoặc thịt hun khói.',
    },
    ideal_for: {
      en: 'Perfect for Scotch enthusiasts who enjoy sweeter, more approachable whisky drinks. Ideal for those seeking a warming, simple yet sophisticated after-dinner cocktail.',
      it: 'Perfetto per gli appassionati di Scotch che amano drink al whisky più dolci e accessibili. Ideale per chi cerca un cocktail dopo cena caldo, semplice ma sofisticato.',
      vi: 'Hoàn hảo cho những người đam mê Scotch thích đồ uống whisky ngọt hơn, dễ tiếp cận hơn. Lý tưởng cho những ai tìm kiếm cocktail sau bữa tối ấm áp, đơn giản nhưng tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_SCOTCH_WHISKY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Scotch whisky', it: 'Whisky scozzese', vi: 'Scotch whisky' },
    },
    {
      ingredient_id: 'ING_DRAMBUIE',
      quantity: { amount: 25, unit: 'ml' },
      display_name: { en: 'Drambuie', it: 'Drambuie', vi: 'Drambuie' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour all ingredients directly into an old fashioned glass filled with ice. Stir gently. Garnish with lemon zest.',
    it: 'Versare tutti gli ingredienti direttamente in un bicchiere old fashioned pieno di ghiaccio. Mescolare delicatamente. Guarnire con scorza di limone.',
    vi: 'Đổ tất cả nguyên liệu trực tiếp vào ly old fashioned đầy đá. Khuấy nhẹ nhàng. Trang trí với vỏ chanh.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'Lemon zest',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_SCOTCH_WHISKY'],

  flavor_profile: ['sweet', 'herbal', 'warming'],

  abv_estimate: 32, // ~32% ABV

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'nightcap', 'contemplative'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rob-roy', 'bobby-burns', 'godfather'],

  notes_for_staff: 'The official IBA ratio is 9 parts Scotch to 5 parts Drambuie (45ml:25ml). Can be adjusted to taste - some prefer equal parts. Build directly in glass for simplicity. Drambuie is essential - no substitutes. Stir gently to avoid over-dilution.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/rusty-nail/',
    note: 'IBA Official Recipe. Historical information from Drambuie history and 1960s cocktail culture.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
