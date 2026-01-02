/**
 * Famous Cocktails: Vieux Mot
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vieuxMot: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
  slug: 'vieux-mot',
  stable_key: '8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a08',

  name: {
    en: 'Vieux Mot',
    it: 'Vieux Mot',
    vi: 'Vieux Mot',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'gin', 'herbal', 'floral'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A sophisticated gin cocktail featuring elderflower liqueur, lemon juice, and green Chartreuse. The Vieux Mot is a floral, herbal variation on the Last Word that showcases French liqueurs.',
    it: 'Un sofisticato cocktail a base di gin con liquore di fiori di sambuco, succo di limone e Chartreuse verde. Il Vieux Mot è una variazione floreale ed erbale del Last Word che mette in mostra i liquori francesi.',
    vi: 'Một loại cocktail gin tinh tế với rượu mùi hoa cơm cháy, nước chanh và Chartreuse xanh. Vieux Mot là biến thể hoa, thảo mộc của Last Word thể hiện rượu mùi Pháp.',
  },

  history: {
    created_year: '2007',
    origin: {
      city: 'Seattle',
      bar: 'Vessel',
      country: 'USA',
    },
    creator: {
      name: 'Jamie Boudreau',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Jamie Boudreau at Vessel in Seattle in 2007, the Vieux Mot is an elegant variation on the classic Last Word cocktail. Boudreau substituted St-Germain elderflower liqueur for maraschino, creating a more floral, French-inspired interpretation. The name "Vieux Mot" means "old word" in French, a clever play on the original Last Word name while highlighting the French character of the elderflower liqueur and Chartreuse.',
      it: 'Creato da Jamie Boudreau al Vessel di Seattle nel 2007, il Vieux Mot è un\'elegante variazione del classico cocktail Last Word. Boudreau ha sostituito il liquore di fiori di sambuco St-Germain al maraschino, creando un\'interpretazione più floreale e di ispirazione francese. Il nome "Vieux Mot" significa "parola vecchia" in francese, un gioco di parole intelligente sul nome originale Last Word evidenziando il carattere francese del liquore di fiori di sambuco e della Chartreuse.',
      vi: 'Được tạo ra bởi Jamie Boudreau tại Vessel ở Seattle năm 2007, Vieux Mot là biến thể thanh lịch của cocktail Last Word cổ điển. Boudreau thay rượu mùi hoa cơm cháy St-Germain cho maraschino, tạo ra phiên bản hoa hơn, lấy cảm hứng từ Pháp. Tên "Vieux Mot" có nghĩa là "từ cũ" trong tiếng Pháp, chơi chữ khéo léo từ tên Last Word ban đầu đồng thời làm nổi bật đặc tính Pháp của rượu mùi hoa cơm cháy và Chartreuse.',
    },
    named_after: {
      en: '"Vieux Mot" (old word in French) is a bilingual pun on "Last Word" while emphasizing the French liqueurs used.',
      it: '"Vieux Mot" (parola vecchia in francese) è un gioco di parole bilingue su "Last Word" enfatizzando al contempo i liquori francesi utilizzati.',
      vi: '"Vieux Mot" (từ cũ bằng tiếng Pháp) là chơi chữ song ngữ về "Last Word" đồng thời nhấn mạnh rượu mùi Pháp được sử dụng.',
    },
  },

  taste: {
    profile: ['floral', 'herbal', 'citrus'],
    description: {
      en: 'Elegant and floral with herbal complexity. Gin provides a juniper backbone, elderflower liqueur adds delicate floral sweetness, green Chartreuse contributes intense herbal notes, and lemon juice brings bright acidity.',
      it: 'Elegante e floreale con complessità erbale. Il gin fornisce una struttura di ginepro, il liquore di fiori di sambuco aggiunge dolcezza floreale delicata, la Chartreuse verde contribuisce con note erbali intense e il succo di limone porta acidità brillante.',
      vi: 'Thanh lịch và hoa với độ phức tạp thảo mộc. Gin mang đến xương sống bách xù, rượu mùi hoa cơm cháy thêm vị ngọt hoa tinh tế, Chartreuse xanh đóng góp hương thảo mộc mãnh liệt, và nước chanh mang độ chua sáng.',
    },
    first_impression: {
      en: 'Bright elderflower and gin botanicals hit first, followed by intense Chartreuse and citrus',
      it: 'Fiori di sambuco luminosi e botanici del gin colpiscono per primi, seguiti da Chartreuse intensa e agrumi',
      vi: 'Hoa cơm cháy sáng và thực vật gin đập vào đầu tiên, tiếp theo là Chartreuse mãnh liệt và cam chanh',
    },
    finish: {
      en: 'Long, herbal finish with lingering floral and botanical notes',
      it: 'Finale lungo ed erbale con note persistenti floreali e botaniche',
      vi: 'Kết thúc dài, thảo mộc với hương hoa và thực vật kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between floral sweetness and herbal intensity, complex yet harmonious',
      it: 'Perfettamente bilanciato tra dolcezza floreale e intensità erbale, complesso ma armonioso',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt hoa và cường độ thảo mộc, phức tạp nhưng hài hòa',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['cocktail_hour', 'date_night', 'spring_celebration'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with fresh cheeses, herb-forward dishes, light seafood, and spring vegetables. The floral-herbal profile complements delicate, aromatic flavors.',
      it: 'Eccellente con formaggi freschi, piatti alle erbe, pesce leggero e verdure primaverili. Il profilo floreale-erbale complementa sapori delicati e aromatici.',
      vi: 'Tuyệt vời với phô mai tươi, món ăn thảo mộc, hải sản nhẹ và rau củ mùa xuân. Hương vị hoa-thảo mộc bổ sung cho hương vị tinh tế, thơm.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers who appreciate floral, botanical cocktails. Ideal for those who enjoy Chartreuse and French liqueurs.',
      it: 'Perfetto per gli amanti del gin che apprezzano cocktail floreali e botanici. Ideale per chi ama la Chartreuse e i liquori francesi.',
      vi: 'Hoàn hảo cho người yêu gin thích cocktail hoa, thực vật. Lý tưởng cho những ai thích Chartreuse và rượu mùi Pháp.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_ELDERFLOWER_LIQUEUR',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Elderflower liqueur (St-Germain)',
        it: 'Liquore di fiori di sambuco (St-Germain)',
        vi: 'Rượu mùi hoa cơm cháy (St-Germain)',
      },
    },
    {
      ingredient_id: 'ING_CHARTREUSE_GREEN',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Green Chartreuse',
        it: 'Chartreuse verde',
        vi: 'Chartreuse xanh',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Strain into a chilled coupe glass. Garnish with a lemon twist or edible flower.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa raffreddata. Guarnire con una twist di limone o un fiore commestibile.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe đã làm lạnh. Trang trí với vỏ chanh xoắn hoặc hoa ăn được.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Lemon twist or edible flower',
    it: 'Twist di limone o fiore commestibile',
    vi: 'Vỏ chanh xoắn hoặc hoa ăn được',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['floral', 'herbal', 'citrus'],

  abv_estimate: 25,

  calories_estimate: 170,

  difficulty: 'medium',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['cocktail_hour', 'date_night', 'spring_celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['last-word', 'final-ward'],

  notes_for_staff: 'Use St-Germain elderflower liqueur for best results. Equal parts recipe like the Last Word. Shake hard to properly chill and dilute the strong spirits.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 71,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'Created by Jamie Boudreau at Vessel, 2007',
    note: 'Modern variation on the Last Word cocktail. Featured in craft cocktail publications.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
