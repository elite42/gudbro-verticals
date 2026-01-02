/**
 * IBA Contemporary Classics: Horse's Neck
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const horsesNeck: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
  slug: 'horses-neck',
  stable_key: 'horses_neck_iba_contemporary_classic',

  name: {
    en: 'Horse\'s Neck',
    it: 'Horse\'s Neck',
    vi: 'Horse\'s Neck',
    ko: '호스 넥',
    ja: 'ホーセズネック',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'classic', 'simple', 'refreshing', 'highball'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A classic highball combining brandy or bourbon with ginger ale, distinguished by its signature long spiral of lemon peel. Simple, refreshing, and elegant - a drink with old-world sophistication.',
    it: 'Un classico highball che combina brandy o bourbon con ginger ale, distinto dalla sua caratteristica lunga spirale di scorza di limone. Semplice, rinfrescante ed elegante - una bevanda con sofisticazione d\'altri tempi.',
    vi: 'Một highball cổ điển kết hợp brandy hoặc bourbon với ginger ale, được phân biệt bởi vỏ chanh xoắn dài đặc trưng. Đơn giản, sảng khoái và thanh lịch - một thức uống với sự tinh tế cổ điển.',
  },

  history: {
    created_year: '1890',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Horse\'s Neck dates back to the 1890s and was originally a non-alcoholic drink of ginger ale with lemon peel. Brandy was added later, creating the "Horse\'s Neck with a Kick." The distinctive spiral lemon peel garnish gives the drink its name, resembling a horse\'s neck and mane.',
      it: 'Il Horse\'s Neck risale agli anni 1890 ed era originariamente una bevanda analcolica di ginger ale con scorza di limone. Il brandy fu aggiunto successivamente, creando il "Horse\'s Neck with a Kick." La caratteristica guarnizione a spirale di scorza di limone dà il nome alla bevanda, che ricorda il collo e la criniera di un cavallo.',
      vi: 'Horse\'s Neck có từ những năm 1890 và ban đầu là một thức uống không cồn gồm ginger ale với vỏ chanh. Brandy được thêm vào sau, tạo ra "Horse\'s Neck with a Kick." Vỏ chanh xoắn đặc biệt làm trang trí mang lại tên gọi cho thức uống, giống như cổ và bờm ngựa.',
    },
    named_after: {
      en: 'Named after the long spiral lemon peel garnish that resembles a horse\'s neck and mane.',
      it: 'Prende il nome dalla lunga spirale di scorza di limone che ricorda il collo e la criniera di un cavallo.',
      vi: 'Được đặt tên theo vỏ chanh xoắn dài giống như cổ và bờm ngựa.',
    },
  },

  taste: {
    profile: ['spicy', 'citrus', 'refreshing'],
    description: {
      en: 'Refreshing and spicy from the ginger ale, with the warmth of brandy and bright citrus notes from the lemon peel. Light, bubbly, and easy-drinking with subtle complexity.',
      it: 'Rinfrescante e speziato dal ginger ale, con il calore del brandy e note di agrumi brillanti dalla scorza di limone. Leggero, frizzante e facile da bere con sottile complessità.',
      vi: 'Sảng khoái và cay từ ginger ale, với hơi ấm của brandy và hương cam quýt sáng từ vỏ chanh. Nhẹ nhàng, sủi bọt và dễ uống với độ phức tạp tinh tế.',
    },
    first_impression: {
      en: 'Bright lemon and ginger spice with smooth brandy',
      it: 'Limone brillante e spezie di zenzero con brandy morbido',
      vi: 'Chanh sáng và gia vị gừng với brandy mượt',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering ginger warmth',
      it: 'Finale pulito e rinfrescante con calore di zenzero persistente',
      vi: 'Kết thúc sạch, sảng khoái với hơi ấm gừng kéo dài',
    },
    balance: {
      en: 'Well-balanced between spirit strength and ginger ale effervescence',
      it: 'Ben bilanciato tra la forza dello spirito e l\'effervescenza del ginger ale',
      vi: 'Cân bằng tốt giữa độ mạnh của rượu và sự sủi bọt của ginger ale',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'relaxation', 'digestivo'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with light appetizers, cheese plates, nuts, and casual fare. Excellent as a digestif after meals.',
      it: 'Si abbina bene con antipasti leggeri, taglieri di formaggi, noci e piatti casual. Eccellente come digestivo dopo i pasti.',
      vi: 'Kết hợp tốt với món khai vị nhẹ, đĩa phô mai, hạt và món ăn thông thường. Tuyệt vời như một thức uống tiêu hóa sau bữa ăn.',
    },
    ideal_for: {
      en: 'Perfect for those who prefer simple, refreshing cocktails with a touch of elegance. Great for brandy lovers seeking a lighter serve.',
      it: 'Perfetto per chi preferisce cocktail semplici e rinfrescanti con un tocco di eleganza. Ottimo per gli amanti del brandy che cercano una bevanda più leggera.',
      vi: 'Hoàn hảo cho những ai thích cocktail đơn giản, sảng khoái với chút thanh lịch. Tuyệt vời cho người yêu brandy tìm kiếm thức uống nhẹ hơn.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BRANDY',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Brandy (or Bourbon)', it: 'Brandy (o Bourbon)', vi: 'Brandy (hoặc Bourbon)' },
    },
    {
      ingredient_id: 'ING_GINGER_ALE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Ginger ale', it: 'Ginger ale', vi: 'Ginger ale' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Angostura bitters (optional)', it: 'Angostura bitter (opzionale)', vi: 'Angostura bitters (tùy chọn)' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Place a long spiral of lemon peel into a highball glass. Fill with ice cubes. Pour in brandy and top with ginger ale. Stir gently. Optionally add a dash of Angostura bitters.',
    it: 'Posizionare una lunga spirale di scorza di limone in un bicchiere highball. Riempire con cubetti di ghiaccio. Versare il brandy e completare con ginger ale. Mescolare delicatamente. Aggiungere opzionalmente un dash di Angostura bitter.',
    vi: 'Đặt một vỏ chanh xoắn dài vào ly highball. Đổ đầy đá viên. Rót brandy và rót ginger ale lên trên. Khuấy nhẹ. Tùy chọn thêm một dash Angostura bitters.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Long spiral lemon peel',
    it: 'Lunga spirale di scorza di limone',
    vi: 'Vỏ chanh xoắn dài',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BRANDY'],

  flavor_profile: ['spicy', 'citrus', 'refreshing'],

  abv_estimate: 8,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['casual', 'relaxation', 'digestivo'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['horses-neck-with-bourbon', 'virgin-horses-neck'],

  notes_for_staff: 'The signature garnish is key - create a long spiral of lemon peel from top to bottom of the glass. Can be made with bourbon instead of brandy. The non-alcoholic version was the original.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 50,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/horses-neck/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
