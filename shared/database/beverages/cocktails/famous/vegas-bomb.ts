/**
 * Famous Cocktails: Vegas Bomb
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vegasBomb: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'g7h8i9j0-1234-5678-gh78-ij90kl123456',
  slug: 'vegas-bomb',
  stable_key: 'vegas_bomb_shot_famous_energy_drink_bomb_coconut',

  name: {
    en: 'Vegas Bomb',
    it: 'Vegas Bomb',
    vi: 'Vegas Bomb',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'bomb', 'energy-drink', 'party', 'fruity'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A fruity bomb shot featuring Crown Royal whisky, peach schnapps, Malibu coconut rum, and cranberry juice, dropped into Red Bull. This party favorite combines tropical flavors with an energy boost, embodying the wild spirit of Las Vegas nightlife.',
    it: 'Un bomb shot fruttato con whisky Crown Royal, peach schnapps, rum al cocco Malibu e succo di mirtillo rosso, lasciato cadere nel Red Bull. Questo favorito delle feste combina sapori tropicali con una spinta energetica, incarnando lo spirito selvaggio della vita notturna di Las Vegas.',
    vi: 'Một loại bomb shot trái cây có whisky Crown Royal, peach schnapps, rum dừa Malibu và nước ép nam việt quất, được thả vào Red Bull. Món yêu thích tiệc tùng này kết hợp hương vị nhiệt đới với năng lượng tăng cường, hiện thân cho tinh thần hoang dã của cuộc sống về đêm Las Vegas.',
  },

  history: {
    created_year: '2000s',
    origin: {
      city: 'Las Vegas',
      bar: 'Unknown',
      country: 'USA',
    },
    story: {
      en: 'The Vegas Bomb emerged in Las Vegas during the early 2000s as a sweeter, more approachable alternative to the Jäger Bomb. Created to appeal to a broader audience who wanted the energy drink bomb experience without the intense herbal flavors, it quickly became a staple in Vegas bars and spread to nightclubs nationwide.',
      it: 'Il Vegas Bomb è emerso a Las Vegas nei primi anni 2000 come alternativa più dolce e accessibile al Jäger Bomb. Creato per attrarre un pubblico più ampio che voleva l\'esperienza del bomb energetico senza i sapori erbacei intensi, è diventato rapidamente un elemento fondamentale nei bar di Vegas e si è diffuso nei nightclub in tutta la nazione.',
      vi: 'Vegas Bomb xuất hiện ở Las Vegas vào đầu những năm 2000 như một sự thay thế ngọt hơn, dễ tiếp cận hơn cho Jäger Bomb. Được tạo ra để thu hút đối tượng rộng hơn muốn trải nghiệm bomb nước tăng lực mà không có hương vị thảo mộc mãnh liệt, nó nhanh chóng trở thành món chủ lực tại các quầy bar Vegas và lan rộng ra các hộp đêm trên toàn quốc.',
    },
    named_after: {
      en: 'Named after Las Vegas, the city where it was created and popularized in the casino nightclub scene.',
      it: 'Prende il nome da Las Vegas, la città dove è stato creato e reso popolare nella scena dei nightclub dei casinò.',
      vi: 'Được đặt theo tên Las Vegas, thành phố nơi nó được tạo ra và phổ biến trong bối cảnh hộp đêm casino.',
    },
  },

  taste: {
    profile: ['sweet', 'fruity', 'tropical', 'energizing'],
    description: {
      en: 'Sweet and tropical with peach, coconut, and cranberry flavors. The Crown Royal adds smoothness while the Red Bull provides sweetness and energy. Much sweeter and fruitier than a Jäger Bomb.',
      it: 'Dolce e tropicale con sapori di pesca, cocco e mirtillo rosso. Il Crown Royal aggiunge morbidezza mentre il Red Bull fornisce dolcezza ed energia. Molto più dolce e fruttato di un Jäger Bomb.',
      vi: 'Ngọt và nhiệt đới với hương vị đào, dừa và nam việt quất. Crown Royal thêm độ mượt trong khi Red Bull cung cấp vị ngọt và năng lượng. Ngọt hơn và có nhiều trái cây hơn Jäger Bomb.',
    },
    first_impression: {
      en: 'Sweet tropical fruit flavors with energy drink base',
      it: 'Sapori dolci di frutta tropicale con base di bevanda energetica',
      vi: 'Hương vị trái cây nhiệt đới ngọt với nền nước tăng lực',
    },
    finish: {
      en: 'Smooth, fruity finish with energizing caffeine kick',
      it: 'Finale morbido e fruttato con calcio energizzante di caffeina',
      vi: 'Kết thúc mượt mà, trái cây với cú đá caffeine tràn năng lượng',
    },
    balance: {
      en: 'Very sweet and approachable, designed for easy drinking',
      it: 'Molto dolce e accessibile, progettato per una facile bevuta',
      vi: 'Rất ngọt và dễ tiếp cận, được thiết kế để dễ uống',
    },
  },

  recommendations: {
    best_time: ['late_night'],
    occasions: ['party', 'nightlife', 'celebration', 'vegas_trip', 'bachelor_bachelorette'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Not typically paired with food. Best as a standalone party shot or nightclub drink.',
      it: 'In genere non abbinato al cibo. Meglio come shot da festa standalone o bevanda da nightclub.',
      vi: 'Thường không kết hợp với thức ăn. Tốt nhất như shot tiệc độc lập hoặc đồ uống hộp đêm.',
    },
    ideal_for: {
      en: 'Perfect for Vegas trips, bachelorette parties, and nightclub celebrations. Great for those who want a sweeter alternative to Jäger Bombs. WARNING: Contains high amounts of caffeine and alcohol.',
      it: 'Perfetto per viaggi a Vegas, addii al nubilato e celebrazioni in nightclub. Ottimo per chi vuole un\'alternativa più dolce ai Jäger Bomb. ATTENZIONE: Contiene elevate quantità di caffeina e alcol.',
      vi: 'Hoàn hảo cho chuyến đi Vegas, tiệc độc thân và lễ kỷ niệm hộp đêm. Tuyệt vời cho những ai muốn một sự thay thế ngọt hơn cho Jäger Bomb. CẢNH BÁO: Chứa lượng caffeine và rượu cao.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CANADIAN_WHISKY',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Crown Royal Whisky', it: 'Whisky Crown Royal', vi: 'Whisky Crown Royal' },
    },
    {
      ingredient_id: 'ING_PEACH_SCHNAPPS',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Peach Schnapps', it: 'Peach Schnapps', vi: 'Peach Schnapps' },
    },
    {
      ingredient_id: 'ING_MALIBU',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Malibu Coconut Rum', it: 'Rum al Cocco Malibu', vi: 'Rum Dừa Malibu' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Cranberry Juice', it: 'Succo di Mirtillo Rosso', vi: 'Nước Ép Nam Việt Quất' },
    },
    {
      ingredient_id: 'ING_RED_BULL',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Red Bull (or energy drink)', it: 'Red Bull (o bevanda energetica)', vi: 'Red Bull (hoặc nước tăng lực)' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a pint glass halfway with Red Bull or energy drink. In a shot glass, combine Crown Royal, peach schnapps, Malibu, and cranberry juice. Drop the shot glass into the pint glass and consume immediately.',
    it: 'Riempire un bicchiere da pinta a metà con Red Bull o bevanda energetica. In un bicchierino da shot, combinare Crown Royal, peach schnapps, Malibu e succo di mirtillo rosso. Lasciar cadere il bicchierino nel bicchiere da pinta e consumare immediatamente.',
    vi: 'Đổ đầy nửa ly pint với Red Bull hoặc nước tăng lực. Trong ly shot, kết hợp Crown Royal, peach schnapps, Malibu và nước ép nam việt quất. Thả ly shot vào ly pint và uống ngay lập tức.',
  },

  glass: 'Shot glass (dropped into pint glass)',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CANADIAN_WHISKY', 'ING_PEACH_SCHNAPPS', 'ING_MALIBU'],

  flavor_profile: ['sweet', 'fruity', 'tropical', 'energizing'],

  abv_estimate: 10,

  calories_estimate: 220,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'caffeine'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'caffeine_sensitivity'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['all-seasons'],
  occasion_tags: ['party', 'nightlife', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['irish-vegas-bomb', 'tropical-vegas-bomb', 'cherry-vegas-bomb'],

  notes_for_staff: 'Mix shot ingredients in shot glass before dropping. Some variations use different ratios or substitute ingredients. WARNING: High caffeine and alcohol content - serve responsibly. Very popular for Vegas trips and bachelor/bachelorette parties.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/vegas-bomb/',
    note: 'Popular Las Vegas bomb shot from the early 2000s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
