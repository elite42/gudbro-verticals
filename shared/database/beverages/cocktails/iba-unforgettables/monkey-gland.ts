/**
 * IBA Unforgettables: Monkey Gland
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const monkeyGland: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  slug: 'monkey-gland',
  stable_key: 'b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0',

  name: {
    en: 'Monkey Gland',
    it: 'Monkey Gland',
    vi: 'Monkey Gland',
    ko: '몽키 글랜드',
    ja: 'モンキー・グランド',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'gin', 'fruity', 'prohibition-era', 'controversial-name'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A bold Prohibition-era cocktail combining gin with orange juice, grenadine, and a hint of absinthe. Despite its controversial name, this Harry's New York Bar classic delivers a fruity, complex flavor profile that has stood the test of time.",
    it: "Un audace cocktail dell'era del Proibizionismo che combina gin con succo d'arancia, granatina e un accenno di assenzio. Nonostante il nome controverso, questo classico dell'Harry's New York Bar offre un profilo aromatico fruttato e complesso che ha resistito alla prova del tempo.",
    vi: "Một loại cocktail táo bạo thời kỳ Cấm rượu kết hợp gin với nước cam, grenadine và một chút absinthe. Mặc dù có cái tên gây tranh cãi, tác phẩm kinh điển của Harry's New York Bar này mang đến hương vị trái cây phức tạp đã vượt qua thử thách của thời gian.",
  },

  history: {
    created_year: '1920',
    origin: {
      city: 'Paris',
      bar: "Harry's New York Bar",
      country: 'France',
    },
    creator: {
      name: 'Harry MacElhone',
      profession: 'bartender',
    },
    story: {
      en: "The Monkey Gland was created by legendary bartender Harry MacElhone at Harry's New York Bar in Paris during the 1920s. The cocktail's unusual name references a controversial medical procedure of the era performed by Russian-French surgeon Serge Voronoff, who claimed to restore youth and vitality by transplanting monkey glands into humans. The procedure became a sensation in 1920s Paris, and MacElhone named the drink after this bizarre practice, suggesting the cocktail itself had rejuvenating properties. Despite the strange name, the drink became hugely popular among American expatriates in Paris during Prohibition.",
      it: "Il Monkey Gland fu creato dal leggendario barman Harry MacElhone all'Harry's New York Bar a Parigi negli anni '20. Il nome insolito del cocktail fa riferimento a una controversa procedura medica dell'epoca eseguita dal chirurgo russo-francese Serge Voronoff, che affermava di ripristinare giovinezza e vitalità trapiantando ghiandole di scimmia negli esseri umani. La procedura divenne una sensazione nella Parigi degli anni '20, e MacElhone chiamò il drink dopo questa bizzarra pratica, suggerendo che il cocktail stesso avesse proprietà ringiovanenti. Nonostante il nome strano, il drink divenne estremamente popolare tra gli espatriati americani a Parigi durante il Proibizionismo.",
      vi: "Monkey Gland được tạo ra bởi bartender huyền thoại Harry MacElhone tại Harry's New York Bar ở Paris trong những năm 1920. Cái tên khác thường của cocktail ám chỉ một thủ thuật y tế gây tranh cãi thời đó do bác sĩ phẫu thuật người Nga-Pháp Serge Voronoff thực hiện, người tuyên bố phục hồi tuổi trẻ và sức sống bằng cách cấy ghép tuyến khỉ vào con người. Thủ thuật này đã gây chấn động ở Paris những năm 1920, và MacElhone đặt tên thức uống theo thực hành kỳ lạ này, gợi ý rằng chính cocktail có đặc tính trẻ hóa. Mặc dù có cái tên kỳ lạ, thức uống này đã trở nên cực kỳ phổ biến trong số những người Mỹ sống ở Paris trong thời kỳ Cấm rượu.",
    },
    named_after: {
      en: 'Named after the controversial "monkey gland" transplant procedure performed by Dr. Serge Voronoff in 1920s Paris, which claimed to restore youth and virility.',
      it: 'Prende il nome dalla controversa procedura di trapianto di "ghiandole di scimmia" eseguita dal Dr. Serge Voronoff nella Parigi degli anni \'20, che affermava di ripristinare giovinezza e virilità.',
      vi: 'Được đặt theo tên thủ thuật cấy ghép "tuyến khỉ" gây tranh cãi do Bác sĩ Serge Voronoff thực hiện ở Paris những năm 1920, được cho là phục hồi tuổi trẻ và sinh lực.',
    },
  },

  taste: {
    profile: ['fruity', 'citrus', 'herbal'],
    description: {
      en: 'Bright and fruity with orange juice taking the lead, balanced by botanical gin and a touch of grenadine sweetness. The absinthe adds a subtle anise complexity that elevates the drink beyond a simple gin and orange combination. The result is refreshing, slightly mysterious, and more sophisticated than its playful appearance suggests.',
      it: "Brillante e fruttato con il succo d'arancia in primo piano, bilanciato da gin botanico e un tocco di dolcezza di granatina. L'assenzio aggiunge una sottile complessità di anice che eleva il drink oltre una semplice combinazione di gin e arancia. Il risultato è rinfrescante, leggermente misterioso e più sofisticato di quanto suggerisca il suo aspetto giocoso.",
      vi: 'Tươi sáng và trái cây với nước cam dẫn đầu, được cân bằng bởi gin thực vật và chút ngọt grenadine. Absinthe thêm độ phức tạp hồi tinh tế nâng thức uống lên cao hơn sự kết hợp đơn giản giữa gin và cam. Kết quả là sảng khoái, hơi bí ẩn và tinh tế hơn vẻ ngoài vui tươi của nó.',
    },
    first_impression: {
      en: 'Fresh orange juice with herbal gin complexity',
      it: "Succo d'arancia fresco con complessità erbacea del gin",
      vi: 'Nước cam tươi với độ phức tạp thảo mộc của gin',
    },
    finish: {
      en: 'Subtle anise notes from absinthe with lingering citrus',
      it: "Note sottili di anice dall'assenzio con agrumi persistenti",
      vi: 'Hương hồi tinh tế từ absinthe với vị cam quýt kéo dài',
    },
    balance: {
      en: 'Well-balanced between fruity sweetness and botanical complexity - playful yet sophisticated',
      it: 'Ben bilanciato tra dolcezza fruttata e complessità botanica - giocoso ma sofisticato',
      vi: 'Cân bằng tốt giữa vị ngọt trái cây và độ phức tạp thực vật - vui tươi nhưng tinh tế',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'party', 'conversation', 'vintage_theme'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with French cuisine, smoked salmon canapés, cheese boards, roasted duck, and citrus-based desserts. Pairs beautifully with Middle Eastern mezze and herb-forward dishes.',
      it: 'Eccellente con cucina francese, canapè di salmone affumicato, taglieri di formaggi, anatra arrosto e dessert agli agrumi. Si abbina magnificamente con mezze mediorientali e piatti ricchi di erbe.',
      vi: 'Tuyệt vời với ẩm thực Pháp, canapé cá hồi hun khói, đĩa phô mai, vịt quay và các món tráng miệng cam quýt. Kết hợp tuyệt vời với mezze Trung Đông và các món ăn thảo mộc.',
    },
    ideal_for: {
      en: 'Perfect for adventurous gin lovers who appreciate cocktails with history and character. An excellent conversation starter due to its unusual name, ideal for vintage cocktail enthusiasts and those exploring classic Prohibition-era drinks.',
      it: "Perfetto per gli amanti del gin avventurosi che apprezzano i cocktail con storia e carattere. Un eccellente rompighiaccio grazie al suo nome insolito, ideale per gli appassionati di cocktail vintage e per coloro che esplorano i classici drink dell'era del Proibizionismo.",
      vi: 'Hoàn hảo cho những người yêu gin phiêu lưu đánh giá cao cocktail có lịch sử và cá tính. Lựa chọn tuyệt vời để bắt đầu cuộc trò chuyện nhờ cái tên khác thường, lý tưởng cho những người đam mê cocktail cổ điển và khám phá đồ uống thời kỳ Cấm rượu.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_ORANGE_JUICE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Fresh orange juice', it: "Succo d'arancia fresco", vi: 'Nước cam tươi' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Grenadine syrup', it: 'Sciroppo di granatina', vi: 'Xi-rô grenadine' },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 2, unit: 'dash' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled cocktail glass.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã được làm lạnh.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Orange twist (optional)',
    it: "Scorza d'arancia (opzionale)",
    vi: 'Vỏ cam xoắn (tùy chọn)',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['fruity', 'citrus', 'herbal'],

  abv_estimate: 18, // ~18% ABV after dilution

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'party', 'conversation'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['monkey-gland-royale', 'modern-monkey'],

  notes_for_staff:
    'Use fresh orange juice for best results. Absinthe should be used sparingly - just a hint to add complexity. Can substitute with pastis if absinthe unavailable. The name often requires explanation to curious guests - be prepared with the historical story.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 52,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/monkey-gland/',
    notes:
      'IBA Official Recipe. Historical information from Harry MacElhone\'s "Harry\'s ABC of Mixing Cocktails" and cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
