/**
 * Famous Cocktails: White Negroni
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const whiteNegroni: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f',
  slug: 'white-negroni',
  stable_key: '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a09',

  name: {
    en: 'White Negroni',
    it: 'Negroni Bianco',
    vi: 'White Negroni',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'gin', 'bitter', 'aperitivo'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A pale, elegant variation on the classic Negroni featuring gin, Suze (or gentian liqueur), and Lillet Blanc. The White Negroni offers a more subtle, floral bitterness compared to its red predecessor.',
    it: "Una variazione pallida ed elegante del classico Negroni con gin, Suze (o liquore di genziana) e Lillet Blanc. Il Negroni Bianco offre un'amarezza più sottile e floreale rispetto al suo predecessore rosso.",
    vi: 'Biến thể nhạt, thanh lịch của Negroni cổ điển với gin, Suze (hoặc rượu mùi long đởm) và Lillet Blanc. White Negroni mang đến vị đắng tinh tế, hoa hơn so với phiên bản đỏ trước đó.',
  },

  history: {
    created_year: '2001',
    origin: {
      city: 'Paris',
      bar: 'ECC Chiado',
      country: 'France',
    },
    creator: {
      name: 'Wayne Collins',
      profession: 'bartender',
    },
    story: {
      en: 'Created by bartender Wayne Collins in 2001 while working at ECC Chiado in Paris, the White Negroni was born during a Negroni Week event. Collins substituted Suze (a French gentian liqueur) for Campari and Lillet Blanc for sweet vermouth, creating a lighter, more elegant interpretation. The drink gained international recognition and became one of the most popular Negroni variations of the modern era.',
      it: "Creato dal barman Wayne Collins nel 2001 mentre lavorava all'ECC Chiado a Parigi, il Negroni Bianco nacque durante un evento della Settimana del Negroni. Collins sostituì Suze (un liquore francese di genziana) al Campari e Lillet Blanc al vermouth dolce, creando un'interpretazione più leggera ed elegante. La bevanda ha guadagnato riconoscimento internazionale ed è diventata una delle variazioni più popolari del Negroni dell'era moderna.",
      vi: 'Được tạo ra bởi bartender Wayne Collins năm 2001 khi làm việc tại ECC Chiado ở Paris, White Negroni ra đời trong sự kiện Tuần lễ Negroni. Collins thay Suze (rượu mùi long đởm Pháp) cho Campari và Lillet Blanc cho vermouth ngọt, tạo ra phiên bản nhẹ nhàng, thanh lịch hơn. Đồ uống đạt được sự công nhận quốc tế và trở thành một trong những biến thể Negroni phổ biến nhất của thời hiện đại.',
    },
    named_after: {
      en: 'Named "White Negroni" for its pale color, distinguishing it from the classic red Negroni.',
      it: 'Chiamato "Negroni Bianco" per il suo colore pallido, distinguendolo dal classico Negroni rosso.',
      vi: 'Được đặt tên "White Negroni" cho màu nhạt của nó, phân biệt với Negroni đỏ cổ điển.',
    },
  },

  taste: {
    profile: ['bitter', 'floral', 'herbal'],
    description: {
      en: 'Refined and subtly bitter with floral complexity. Gin provides botanical backbone, Suze contributes elegant gentian bitterness, and Lillet Blanc adds floral sweetness and citrus notes. More delicate than the classic Negroni but equally sophisticated.',
      it: 'Raffinato e sottilmente amaro con complessità floreale. Il gin fornisce una struttura botanica, Suze contribuisce con amarezza elegante di genziana e Lillet Blanc aggiunge dolcezza floreale e note agrumate. Più delicato del Negroni classico ma ugualmente sofisticato.',
      vi: 'Tinh tế và đắng nhẹ nhàng với độ phức tạp hoa. Gin mang đến xương sống thực vật, Suze đóng góp vị đắng long đởm thanh lịch, và Lillet Blanc thêm vị ngọt hoa và hương cam chanh. Tinh tế hơn Negroni cổ điển nhưng đều tinh tế.',
    },
    first_impression: {
      en: 'Gentle bitterness and floral notes hit first, followed by gin botanicals and citrus',
      it: 'Amarezza delicata e note floreali colpiscono per prime, seguite da botanici del gin e agrumi',
      vi: 'Vị đắng nhẹ nhàng và hương hoa đập vào đầu tiên, tiếp theo là thực vật gin và cam chanh',
    },
    finish: {
      en: 'Clean, bitter finish with lingering floral and herbal notes',
      it: 'Finale pulito e amaro con note persistenti floreali ed erbali',
      vi: 'Kết thúc sạch, đắng với hương hoa và thảo mộc kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between bitter and sweet, more subtle than classic Negroni but equally complex',
      it: 'Perfettamente bilanciato tra amaro e dolce, più sottile del Negroni classico ma ugualmente complesso',
      vi: 'Cân bằng hoàn hảo giữa đắng và ngọt, tinh tế hơn Negroni cổ điển nhưng đều phức tạp',
    },
  },

  recommendations: {
    best_time: ['late_afternoon', 'early_evening'],
    occasions: ['aperitivo', 'cocktail_hour', 'date_night'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with light appetizers, seafood, fresh cheeses, and vegetable-based dishes. The gentle bitterness makes it a perfect aperitivo.',
      it: "Eccellente con antipasti leggeri, frutti di mare, formaggi freschi e piatti a base di verdure. L'amarezza delicata lo rende un perfetto aperitivo.",
      vi: 'Tuyệt vời với món khai vị nhẹ, hải sản, phô mai tươi và món ăn từ rau củ. Vị đắng nhẹ nhàng làm nó trở thành aperitivo hoàn hảo.',
    },
    ideal_for: {
      en: 'Perfect for Negroni lovers seeking a lighter, more delicate variation. Ideal for those who appreciate bitter cocktails with floral complexity.',
      it: 'Perfetto per gli amanti del Negroni che cercano una variazione più leggera e delicata. Ideale per chi apprezza cocktail amari con complessità floreale.',
      vi: 'Hoàn hảo cho người yêu Negroni tìm kiếm biến thể nhẹ nhàng, tinh tế hơn. Lý tưởng cho những ai thích cocktail đắng với độ phức tạp hoa.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_SUZE',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Suze (gentian liqueur)',
        it: 'Suze (liquore di genziana)',
        vi: 'Suze (rượu mùi long đởm)',
      },
    },
    {
      ingredient_id: 'ING_LILLET_BLANC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Lillet Blanc',
        it: 'Lillet Blanc',
        vi: 'Lillet Blanc',
      },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Add all ingredients to a mixing glass filled with ice. Stir until well-chilled, about 30 seconds. Strain into a rocks glass over a large ice cube. Express a lemon twist over the drink and use as garnish.',
    it: 'Aggiungere tutti gli ingredienti in un mixing glass pieno di ghiaccio. Mescolare fino a raffreddare bene, circa 30 secondi. Filtrare in un bicchiere rocks su un grosso cubetto di ghiaccio. Esprimere una twist di limone sulla bevanda e usarla come guarnizione.',
    vi: 'Thêm tất cả nguyên liệu vào ly trộn đầy đá. Khuấy cho đến khi lạnh kỹ, khoảng 30 giây. Lọc vào ly rocks trên viên đá lớn. Vắt vỏ chanh xoắn lên đồ uống và dùng làm trang trí.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Lemon twist',
    it: 'Twist di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'large_cube',

  serving_style: 'on_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['bitter', 'floral', 'herbal'],

  abv_estimate: 24,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 90,

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
  occasion_tags: ['aperitivo', 'cocktail_hour', 'date_night'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['negroni', 'negroni-sbagliato'],

  notes_for_staff:
    "Stir, don't shake. Can substitute other gentian liqueurs if Suze unavailable. Use a large ice cube to minimize dilution. Express lemon oils over drink before adding twist.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 80,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'Created by Wayne Collins, 2001',
    notes: 'Modern variation on the classic Negroni. One of the most popular Negroni variations.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
