/**
 * IBA Unforgettables: Sazerac
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const sazerac: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  slug: 'sazerac',
  stable_key: 'a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6',

  name: {
    en: 'Sazerac',
    it: 'Sazerac',
    vi: 'Sazerac',
    ko: '새저랙',
    ja: 'サゼラック',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'new-orleans', 'stirred', 'strong', 'official-cocktail'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "New Orleans' official cocktail, the Sazerac is a bold, spirit-forward classic combining cognac or rye whiskey with Peychaud's bitters, sugar, and an absinthe rinse. One of America's oldest cocktails, it embodies the soul of the Crescent City.",
    it: "Il cocktail ufficiale di New Orleans, il Sazerac è un classico audace e ricco di spirito che combina cognac o rye whiskey con Peychaud's bitters, zucchero e un risciacquo di assenzio. Uno dei cocktail più antichi d'America, incarna l'anima della Città della Mezzaluna.",
    vi: "Cocktail chính thức của New Orleans, Sazerac là một tác phẩm kinh điển táo bạo, hướng rượu kết hợp cognac hoặc rye whiskey với Peychaud's bitters, đường và lớp absinthe rửa ly. Một trong những cocktail lâu đời nhất của Mỹ, nó thể hiện linh hồn của Thành phố Lưỡi Liềm.",
  },

  history: {
    created_year: '1838',
    origin: {
      city: 'New Orleans',
      bar: 'Sazerac Coffee House',
      country: 'USA',
    },
    creator: {
      name: 'Antoine Amédée Peychaud',
      profession: 'pharmacist/bartender',
    },
    story: {
      en: "The Sazerac is a local variation of a cognac or whiskey cocktail originally from New Orleans, named for the Sazerac de Forge et Fils brand of cognac that served as its original main ingredient. Created around 1838 by Antoine Amédée Peychaud, a Creole apothecary who invented Peychaud's bitters. The original recipe changed after the American Civil War when rye whiskey substituted cognac as it became hard to obtain. In 2008, the Louisiana Legislature declared the Sazerac as New Orleans' official cocktail. The Sazerac Coffee House, where it was popularized, is now a protected historic site.",
      it: "Il Sazerac è una variazione locale di un cocktail al cognac o whiskey originario di New Orleans, prende il nome dal marchio di cognac Sazerac de Forge et Fils che serviva come ingrediente principale originale. Creato intorno al 1838 da Antoine Amédée Peychaud, un farmacista creolo che inventò i Peychaud's bitters. La ricetta originale cambiò dopo la Guerra Civile Americana quando il rye whiskey sostituì il cognac poiché divenne difficile da ottenere. Nel 2008, la Legislatura della Louisiana dichiarò il Sazerac come cocktail ufficiale di New Orleans. Il Sazerac Coffee House, dove fu reso popolare, è ora un sito storico protetto.",
      vi: "Sazerac là một biến thể địa phương của cocktail cognac hoặc whiskey có nguồn gốc từ New Orleans, được đặt tên theo nhãn hiệu cognac Sazerac de Forge et Fils từng là thành phần chính ban đầu của nó. Được tạo ra vào khoảng năm 1838 bởi Antoine Amédée Peychaud, một dược sĩ Creole đã phát minh ra Peychaud's bitters. Công thức gốc thay đổi sau Nội chiến Mỹ khi rye whiskey thay thế cognac vì khó kiếm. Năm 2008, Cơ quan Lập pháp Louisiana tuyên bố Sazerac là cocktail chính thức của New Orleans. Sazerac Coffee House, nơi nó được phổ biến, hiện là di tích lịch sử được bảo vệ.",
    },
    named_after: {
      en: 'Named after Sazerac de Forge et Fils, the cognac brand originally used in the drink.',
      it: 'Prende il nome da Sazerac de Forge et Fils, il marchio di cognac originariamente utilizzato nella bevanda.',
      vi: 'Được đặt tên theo Sazerac de Forge et Fils, nhãn hiệu cognac ban đầu được sử dụng trong thức uống.',
    },
  },

  taste: {
    profile: ['complex', 'herbal', 'anise'],
    description: {
      en: "Bold and complex with anise and herbal notes from absinthe dominating the aroma, followed by the rich warmth of cognac or rye. Peychaud's bitters provide distinctive fruity-floral complexity. The sugar softens the edges while lemon oils add brightness.",
      it: "Audace e complesso con note di anice ed erbacee dall'assenzio che dominano l'aroma, seguite dal ricco calore del cognac o della segale. I Peychaud's bitters forniscono una distintiva complessità fruttata-floreale. Lo zucchero ammorbidisce i bordi mentre gli oli di limone aggiungono luminosità.",
      vi: "Táo bạo và phức tạp với hương hồi và thảo mộc từ absinthe chi phối mùi hương, tiếp theo là sự ấm áp đậm đà của cognac hoặc rye. Peychaud's bitters cung cấp độ phức tạp trái cây-hoa đặc trưng. Đường làm mềm các cạnh trong khi dầu chanh thêm độ sáng.",
    },
    first_impression: {
      en: 'Anise and herbal aromatics, followed by bold spirit and bitters',
      it: 'Aromi di anice ed erbacei, seguiti da spirito audace e bitters',
      vi: 'Hương hồi và thảo mộc, tiếp theo là rượu táo bạo và bitters',
    },
    finish: {
      en: 'Long, warming finish with lingering anise, bitters, and lemon',
      it: 'Finale lungo e caldo con anice, bitters e limone persistenti',
      vi: 'Kết thúc dài, ấm áp với hồi, bitters và chanh kéo dài',
    },
    balance: {
      en: 'Spirit-forward with aromatic complexity from absinthe and bitters',
      it: 'Ricco di spirito con complessità aromatica da assenzio e bitters',
      vi: 'Hướng rượu với độ phức tạp thơm từ absinthe và bitters',
    },
  },

  recommendations: {
    best_time: ['aperitivo', 'evening', 'pre_dinner'],
    occasions: ['aperitivo', 'contemplative', 'sophisticated_gathering', 'celebration'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent with rich Creole cuisine like gumbo, jambalaya, or blackened fish. Pairs well with oysters, spicy foods, or as a powerful aperitif before a hearty meal.',
      it: 'Eccellente con ricca cucina creola come gumbo, jambalaya o pesce annerito. Si abbina bene con ostriche, cibi piccanti o come potente aperitivo prima di un pasto sostanzioso.',
      vi: 'Tuyệt vời với ẩm thực Creole đậm đà như gumbo, jambalaya hoặc cá blackened. Kết hợp tốt với hàu, thức ăn cay hoặc như một aperitif mạnh mẽ trước bữa ăn thịnh soạn.',
    },
    ideal_for: {
      en: 'Perfect for whiskey or cognac enthusiasts who appreciate bold, aromatic cocktails with historical significance. Ideal for those who enjoy spirit-forward drinks with complex flavor profiles.',
      it: 'Perfetto per gli appassionati di whiskey o cognac che apprezzano cocktail audaci e aromatici con significato storico. Ideale per chi ama drink ricchi di spirito con profili di sapore complessi.',
      vi: 'Hoàn hảo cho những người đam mê whiskey hoặc cognac đánh giá cao cocktail táo bạo, thơm với ý nghĩa lịch sử. Lý tưởng cho những ai thích đồ uống hướng rượu với hương vị phức tạp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 50, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
    {
      ingredient_id: 'ING_SUGAR_CUBE',
      quantity: { amount: 1, unit: 'cube' },
      display_name: { en: 'Sugar cube', it: 'Zolletta di zucchero', vi: 'Viên đường' },
    },
    {
      ingredient_id: 'ING_PEYCHAUDS_BITTERS',
      quantity: { amount: 2, unit: 'dash' },
      display_name: {
        en: "Peychaud's bitters",
        it: "Peychaud's bitters",
        vi: "Peychaud's bitters",
      },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Rinse a chilled old-fashioned glass with the absinthe, add crushed ice and set it aside. Stir the remaining ingredients over ice in a mixing glass. Discard the ice and any excess absinthe from the prepared glass, strain the mixed drink into the glass. Add the lemon peel for garnish.',
    it: "Sciacquare un bicchiere old-fashioned raffreddato con l'assenzio, aggiungere ghiaccio tritato e metterlo da parte. Mescolare gli ingredienti rimanenti sul ghiaccio in un mixing glass. Scartare il ghiaccio e l'assenzio in eccesso dal bicchiere preparato, filtrare il drink mescolato nel bicchiere. Aggiungere la scorza di limone per guarnire.",
    vi: 'Rửa ly old-fashioned đã làm lạnh bằng absinthe, thêm đá nghiền và để sang một bên. Khuấy các nguyên liệu còn lại trên đá trong ly trộn. Loại bỏ đá và absinthe dư thừa khỏi ly đã chuẩn bị, lọc thức uống đã trộn vào ly. Thêm vỏ chanh để trang trí.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'Lemon peel',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh',
  },

  ice: 'none', // Ice discarded before serving

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],

  flavor_profile: ['complex', 'herbal', 'anise'],

  abv_estimate: 35, // ~35% ABV after dilution

  calories_estimate: 150,

  difficulty: 'intermediate',

  prep_time_seconds: 120,

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
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['aperitivo', 'contemplative', 'sophisticated_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['rye-sazerac', 'old-fashioned', 'vieux-carre'],

  notes_for_staff:
    "The absinthe rinse is essential - coat the glass and discard excess. Peychaud's bitters are specific and non-negotiable. Traditional recipe uses cognac, but rye whiskey is also acceptable (and often preferred in New Orleans today). Express lemon oils over drink but traditionally don't drop the peel in.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/sazerac/',
    notes:
      'IBA Official Recipe. Historical information from New Orleans cocktail history and Antoine Amédée Peychaud documentation.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
