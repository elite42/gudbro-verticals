/**
 * Famous Cocktails: Riff
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const riff: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a',
  slug: 'riff',
  stable_key: 'c1d0e9f8a7b6c594839281706958473faecdbd04',

  name: {
    en: 'Riff',
    it: 'Riff',
    vi: 'Riff',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'whiskey', 'spirit-forward', 'complex'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic featuring rye whiskey, Aperol, dry vermouth, and maraschino liqueur. The Riff is a spirit-forward cocktail that brilliantly balances bitter, sweet, and herbal notes.',
    it: 'Un classico moderno con whiskey di segale, Aperol, vermouth dry e liquore di maraschino. Il Riff è un cocktail spirit-forward che bilancia brillantemente note amare, dolci ed erbali.',
    vi: 'Một cocktail cổ điển hiện đại với rượu whiskey lúa mạch đen, Aperol, vermouth khô và rượu mùi maraschino. Riff là cocktail hướng rượu mạnh cân bằng tuyệt vời giữa đắng, ngọt và thảo mộc.',
  },

  history: {
    created_year: '2010',
    origin: {
      city: 'New York City',
      bar: 'Dutch Kills',
      country: 'USA',
    },
    creator: {
      name: 'Zachary Gelnaw-Rubin',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Zachary Gelnaw-Rubin at Dutch Kills in Queens, New York in 2010, the Riff is a riff on the classic Paper Plane cocktail. Gelnaw-Rubin substituted Aperol for Campari and added dry vermouth, creating a more nuanced and accessible version. The cocktail quickly gained popularity in the craft cocktail community and has become a modern classic in its own right.',
      it: 'Creato da Zachary Gelnaw-Rubin al Dutch Kills a Queens, New York nel 2010, il Riff è una variazione del classico cocktail Paper Plane. Gelnaw-Rubin ha sostituito l\'Aperol al Campari e aggiunto vermouth dry, creando una versione più sfumata e accessibile. Il cocktail ha rapidamente guadagnato popolarità nella comunità dei cocktail artigianali ed è diventato un classico moderno a pieno titolo.',
      vi: 'Được tạo ra bởi Zachary Gelnaw-Rubin tại Dutch Kills ở Queens, New York năm 2010, Riff là biến t주 của cocktail Paper Plane cổ điển. Gelnaw-Rubin thay Aperol cho Campari và thêm vermouth khô, tạo ra phiên bản tinh tế và dễ tiếp cận hơn. Cocktail nhanh chóng trở nên phổ biến trong cộng đồng cocktail thủ công và đã trở thành cocktail cổ điển hiện đại.',
    },
    named_after: {
      en: 'Named "Riff" because it\'s a variation or "riff" on the Paper Plane cocktail, playing with similar ingredients in a new way.',
      it: 'Chiamato "Riff" perché è una variazione o "riff" del cocktail Paper Plane, giocando con ingredienti simili in un modo nuovo.',
      vi: 'Được đặt tên "Riff" vì nó là biến thể hoặc "riff" của cocktail Paper Plane, chơi với các nguyên liệu tương tự theo cách mới.',
    },
  },

  taste: {
    profile: ['bitter', 'complex', 'spirit-forward'],
    description: {
      en: 'Balanced and sophisticated with layers of flavor. Rye whiskey provides spicy backbone, Aperol contributes gentle bitterness and orange notes, dry vermouth adds herbal complexity, and maraschino liqueur brings subtle cherry sweetness.',
      it: 'Bilanciato e sofisticato con strati di sapore. Il whiskey di segale fornisce una struttura piccante, l\'Aperol contribuisce con amarezza delicata e note d\'arancia, il vermouth dry aggiunge complessità erbale e il liquore di maraschino porta dolcezza sottile di ciliegia.',
      vi: 'Cân bằng và tinh tế với nhiều tầng hương vị. Rye whiskey mang đến xương sống cay, Aperol đóng góp vị đắng nhẹ nhàng và hương cam, vermouth khô thêm độ phức tạp thảo mộc, và rượu mùi maraschino mang vị ngọt anh đào tinh tế.',
    },
    first_impression: {
      en: 'Whiskey spice and Aperol bitterness hit first, followed by herbal and cherry complexity',
      it: 'Spezie del whiskey e amarezza dell\'Aperol colpiscono per primi, seguiti da complessità erbale e di ciliegia',
      vi: 'Vị cay whiskey và đắng Aperol đập vào đầu tiên, tiếp theo là độ phức tạp thảo mộc và anh đào',
    },
    finish: {
      en: 'Long, sophisticated finish with lingering spice and herbal notes',
      it: 'Finale lungo e sofisticato con note persistenti di spezie ed erbe',
      vi: 'Kết thúc dài, tinh tế với gia vị và thảo mộc kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between bitter, sweet, and spirit strength - complex but approachable',
      it: 'Perfettamente bilanciato tra amaro, dolce e forza dello spirito - complesso ma accessibile',
      vi: 'Cân bằng hoàn hảo giữa đắng, ngọt và độ mạnh rượu - phức tạp nhưng dễ tiếp cận',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['cocktail_hour', 'date_night', 'aperitivo'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Excellent with charcuterie, aged cheeses, roasted nuts, and savory appetizers. The bitter-sweet profile makes it a perfect aperitivo.',
      it: 'Eccellente con salumi, formaggi stagionati, noci tostate e antipasti salati. Il profilo amaro-dolce lo rende un perfetto aperitivo.',
      vi: 'Tuyệt vời với thịt nguội, phô mai già, hạt rang và món khai vị mặn. Hương vị đắng-ngọt làm nó trở thành aperitivo hoàn hảo.',
    },
    ideal_for: {
      en: 'Perfect for whiskey lovers who enjoy bitter, complex cocktails. Ideal for those who appreciate Italian aperitivi but want something with more spirit presence.',
      it: 'Perfetto per gli amanti del whiskey che apprezzano cocktail amari e complessi. Ideale per chi apprezza gli aperitivi italiani ma vuole qualcosa con più presenza alcolica.',
      vi: 'Hoàn hảo cho người yêu whiskey thích cocktail đắng, phức tạp. Lý tưởng cho những ai thích aperitivi Ý nhưng muốn thứ gì đó có nhiều rượu mạnh hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Whiskey di segale', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_APEROL',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Aperol',
        it: 'Aperol',
        vi: 'Aperol',
      },
    },
    {
      ingredient_id: 'ING_VERMOUTH_DRY',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Dry vermouth',
        it: 'Vermouth dry',
        vi: 'Vermouth khô',
      },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Maraschino liqueur',
        it: 'Liquore di maraschino',
        vi: 'Rượu mùi maraschino',
      },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir until well-chilled, about 30 seconds. Strain into a chilled coupe glass. Express an orange peel over the drink and use as garnish.',
    it: 'Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare fino a raffreddare bene, circa 30 secondi. Filtrare in una coppa raffreddata. Esprimere una scorza d\'arancia sulla bevanda e usarla come guarnizione.',
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy cho đến khi lạnh kỹ, khoảng 30 giây. Lọc vào ly coupe đã làm lạnh. Vắt vỏ cam lên đồ uống và dùng làm trang trí.',
  },

  glass: 'Coupe',

  garnish: {
    en: 'Orange peel',
    it: 'Scorza d\'arancia',
    vi: 'Vỏ cam',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RYE_WHISKEY'],

  flavor_profile: ['bitter', 'complex', 'spirit-forward'],

  abv_estimate: 24,

  calories_estimate: 165,

  difficulty: 'easy',

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
  season_tags: ['all-seasons'],
  occasion_tags: ['cocktail_hour', 'date_night', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['paper-plane', 'boulevardier'],

  notes_for_staff: 'Stir, don\'t shake - this is a spirit-forward cocktail. Use quality rye whiskey for best results. Express orange oils over the drink before adding peel as garnish.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://dutch-kills.com',
    note: 'Created by Zachary Gelnaw-Rubin at Dutch Kills, 2010. Modern classic cocktail.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
