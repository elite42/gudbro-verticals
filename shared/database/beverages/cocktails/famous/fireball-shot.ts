/**
 * Famous Cocktails: Fireball Shot
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const fireballShot: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'i9j0k1l2-3456-7890-ij90-kl12mn345678',
  slug: 'fireball-shot',
  stable_key: 'fireball_shot_famous_cinnamon_whisky_spicy',

  name: {
    en: 'Fireball Shot',
    it: 'Fireball Shot',
    vi: 'Fireball Shot',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'cinnamon', 'whisky', 'spicy', 'party'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A straight shot of Fireball Cinnamon Whisky, the iconic spicy-sweet liqueur that became a cultural phenomenon. This simple but intense shot delivers powerful cinnamon candy flavor with a fiery kick that lives up to its name.',
    it: "Un shot diretto di Fireball Cinnamon Whisky, l'iconico liquore piccante-dolce che è diventato un fenomeno culturale. Questo shot semplice ma intenso offre un potente sapore di caramella alla cannella con un calcio infuocato che è all'altezza del suo nome.",
    vi: 'Một shot thẳng của Fireball Cinnamon Whisky, loại rượu mùi cay-ngọt mang tính biểu tượng đã trở thành hiện tượng văn hóa. Shot đơn giản nhưng mãnh liệt này mang đến hương vị kẹo quế mạnh mẽ với cú đá nóng bỏng xứng đáng với cái tên của nó.',
  },

  history: {
    created_year: '1984',
    origin: {
      city: 'Unknown',
      bar: 'Seagram Company',
      country: 'Canada',
    },
    story: {
      en: 'Fireball Cinnamon Whisky was originally developed in Canada in 1984 by Seagram as "Dr. McGillicuddy\'s Fireball Whisky." It was rebranded as simply "Fireball" and exploded in popularity in the United States during the 2010s, becoming one of the best-selling liqueurs in America. The drink became synonymous with party culture and college nightlife, spawning countless social media moments and drinking traditions.',
      it: 'Fireball Cinnamon Whisky è stato originariamente sviluppato in Canada nel 1984 da Seagram come "Dr. McGillicuddy\'s Fireball Whisky." È stato rinominato semplicemente "Fireball" ed è esploso in popolarità negli Stati Uniti durante gli anni 2010, diventando uno dei liquori più venduti in America. La bevanda è diventata sinonimo di cultura delle feste e vita notturna universitaria, generando innumerevoli momenti sui social media e tradizioni di bevute.',
      vi: 'Fireball Cinnamon Whisky ban đầu được phát triển ở Canada vào năm 1984 bởi Seagram với tên "Dr. McGillicuddy\'s Fireball Whisky." Nó được đổi thương hiệu đơn giản thành "Fireball" và bùng nổ phổ biến ở Hoa Kỳ trong những năm 2010, trở thành một trong những loại rượu mùi bán chạy nhất ở Mỹ. Thức uống này trở thành đồng nghĩa với văn hóa tiệc tùng và cuộc sống về đêm của sinh viên, tạo ra vô số khoảnh khắc trên mạng xã hội và truyền thống uống rượu.',
    },
    named_after: {
      en: 'Named "Fireball" for its intense cinnamon heat and spicy flavor that feels like a fireball going down.',
      it: 'Chiamato "Fireball" per il suo intenso calore alla cannella e sapore piccante che sembra una palla di fuoco che scende.',
      vi: 'Được đặt tên "Fireball" cho độ nóng quế mãnh liệt và hương vị cay như một quả cầu lửa đi xuống.',
    },
  },

  taste: {
    profile: ['spicy', 'sweet', 'cinnamon'],
    description: {
      en: 'Intensely sweet with dominant cinnamon candy flavor reminiscent of Red Hots or Big Red gum. The whisky base provides warmth while the cinnamon creates a burning sensation. Syrupy sweet with a fiery spice kick.',
      it: 'Intensamente dolce con sapore dominante di caramella alla cannella che ricorda i Red Hots o le gomme Big Red. La base di whisky fornisce calore mentre la cannella crea una sensazione di bruciore. Dolce sciropposo con un calcio di spezie infuocate.',
      vi: 'Ngọt mãnh liệt với hương vị kẹo quế chiếm ưu thế gợi nhớ đến Red Hots hoặc kẹo cao su Big Red. Nền whisky mang lại hơi ấm trong khi quế tạo ra cảm giác bỏng rát. Ngọt như xi-rô với cú đá gia vị nóng bỏng.',
    },
    first_impression: {
      en: 'Intense cinnamon candy sweetness with immediate heat',
      it: 'Intensa dolcezza di caramella alla cannella con calore immediato',
      vi: 'Vị ngọt kẹo quế mãnh liệt với độ nóng ngay lập tức',
    },
    finish: {
      en: 'Long, burning cinnamon finish with lingering sweetness',
      it: 'Finale lungo e bruciante di cannella con dolcezza persistente',
      vi: 'Kết thúc quế bỏng rát kéo dài với vị ngọt kéo dài',
    },
    balance: {
      en: 'Very sweet with intense cinnamon spice - polarizing flavor',
      it: 'Molto dolce con intensa spezia di cannella - sapore polarizzante',
      vi: 'Rất ngọt với gia vị quế mãnh liệt - hương vị phân cực',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'nightlife', 'tailgate', 'celebration', 'college_party'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Best as a standalone shot. Can be paired with apple-based desserts or cinnamon treats. Popular with pizza and wings at casual gatherings.',
      it: 'Meglio come shot standalone. Può essere abbinato a dessert a base di mele o dolci alla cannella. Popolare con pizza e ali in incontri casuali.',
      vi: 'Tốt nhất như một shot độc lập. Có thể kết hợp với món tráng miệng táo hoặc món quế. Phổ biến với pizza và cánh gà tại các buổi tụ tập bình thường.',
    },
    ideal_for: {
      en: 'Perfect for those who love sweet, spicy shots and cinnamon candy flavor. A party staple and college favorite. Extremely polarizing - people either love it or hate it.',
      it: 'Perfetto per chi ama gli shot dolci e piccanti e il sapore di caramella alla cannella. Un elemento base delle feste e favorito del college. Estremamente polarizzante - la gente lo ama o lo odia.',
      vi: 'Hoàn hảo cho những ai yêu shot ngọt, cay và hương vị kẹo quế. Món chủ lực tiệc tùng và được sinh viên ưa chuộng. Cực kỳ phân cực - mọi người hoặc yêu hoặc ghét.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_FIREBALL_WHISKY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: {
        en: 'Fireball Cinnamon Whisky',
        it: 'Fireball Cinnamon Whisky',
        vi: 'Fireball Cinnamon Whisky',
      },
    },
  ],

  method: 'pour',

  instructions: {
    en: 'Pour Fireball Cinnamon Whisky directly into a shot glass. Serve immediately. Can be served chilled or at room temperature.',
    it: 'Versare Fireball Cinnamon Whisky direttamente in un bicchierino da shot. Servire immediatamente. Può essere servito freddo o a temperatura ambiente.',
    vi: 'Rót Fireball Cinnamon Whisky trực tiếp vào ly shot. Phục vụ ngay lập tức. Có thể phục vụ lạnh hoặc ở nhiệt độ phòng.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'None (sometimes served with cinnamon sugar rim)',
    it: 'Nessuna (a volte servito con bordo di zucchero alla cannella)',
    vi: 'Không (đôi khi phục vụ với viền đường quế)',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_FIREBALL_WHISKY'],

  flavor_profile: ['spicy', 'sweet', 'cinnamon'],

  abv_estimate: 33,

  calories_estimate: 108,

  difficulty: 'easy',

  prep_time_seconds: 10,

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
    spice_level: 3,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['party', 'nightlife', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['fireball-apple-cider', 'cinnamon-toast-crunch-shot', 'angry-balls'],

  notes_for_staff:
    'Store in freezer for smoother shots - the cold reduces the burn. Extremely popular but polarizing. Some customers prefer it mixed with apple cider or ginger ale. Check ID carefully as this is often requested by younger drinkers.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.fireballwhisky.com/',
    notes: 'Iconic cinnamon whisky that became a cultural phenomenon in the 2010s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
