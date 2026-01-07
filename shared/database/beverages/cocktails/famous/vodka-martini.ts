/**
 * Famous Cocktails: Vodka Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const vodkaMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd5e6f7a8-b9c0-4d1e-2f3a-4b5c6d7e8f9a',
  slug: 'vodka-martini',
  stable_key: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',

  name: {
    en: 'Vodka Martini',
    it: 'Vodka Martini',
    vi: 'Vodka Martini',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'vodka', 'sophisticated', 'iconic', 'james-bond'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'The vodka variation of the classic Martini, made famous by James Bond\'s preference for it "shaken, not stirred." Cleaner and less botanical than a gin martini, the Vodka Martini is the ultimate expression of minimalist sophistication.',
    it: 'La variante vodka del classico Martini, resa famosa dalla preferenza di James Bond per esso "shakerato, non mescolato." Più pulito e meno botanico di un martini al gin, il Vodka Martini è l\'espressione ultima della sofisticazione minimalista.',
    vi: 'Biến thể vodka của Martini cổ điển, nổi tiếng nhờ sở thích của James Bond "lắc, không khuấy." Sạch hơn và ít thực vật hơn martini gin, Vodka Martini là biểu hiện tối thượng của sự tinh tế tối giản.',
  },

  history: {
    created_year: '1950',
    origin: {
      city: 'United States',
      bar: 'Various',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: "The Vodka Martini emerged in the 1950s during vodka's rise to popularity in America. While gin purists considered it sacrilege, the vodka variation quickly gained a following for its clean, neutral character. The drink was catapulted to iconic status by Ian Fleming's James Bond, who ordered it \"shaken, not stirred\" in the novels and films. Bond's specific order - the Vesper - called for vodka, gin, and Kina Lillet. The standard Vodka Martini became the drink of choice for those who wanted the sophistication of a martini without gin's assertive botanicals. By the 1980s and 90s, the Vodka Martini had become more popular than the original gin version in many American bars.",
      it: "Il Vodka Martini emerse negli anni '50 durante l'ascesa della popolarità della vodka in America. Mentre i puristi del gin lo consideravano un sacrilegio, la variante vodka guadagnò rapidamente un seguito per il suo carattere pulito e neutrale. La bevanda fu catapultata allo status iconico da James Bond di Ian Fleming, che lo ordinava \"shakerato, non mescolato\" nei romanzi e nei film. L'ordine specifico di Bond - il Vesper - richiedeva vodka, gin e Kina Lillet. Il Vodka Martini standard divenne la bevanda preferita per chi voleva la sofisticazione di un martini senza i botanici assertivi del gin. Negli anni '80 e '90, il Vodka Martini era diventato più popolare della versione originale al gin in molti bar americani.",
      vi: 'Vodka Martini xuất hiện vào những năm 1950 trong thời kỳ vodka tăng độ phổ biến ở Mỹ. Trong khi những người thuần túy gin coi đó là tội lỗi, biến thể vodka nhanh chóng có được lượng người theo dõi vì tính cách sạch, trung tính của nó. Thức uống được đưa lên vị trí biểu tượng bởi James Bond của Ian Fleming, người đã gọi nó "lắc, không khuấy" trong tiểu thuyết và phim. Đơn hàng cụ thể của Bond - Vesper - yêu cầu vodka, gin và Kina Lillet. Vodka Martini tiêu chuẩn trở thành lựa chọn của những ai muốn sự tinh tế của martini mà không có thực vật quyết đoán của gin. Đến những năm 1980 và 90, Vodka Martini đã trở nên phổ biến hơn phiên bản gin gốc ở nhiều quán bar Mỹ.',
    },
    named_after: {
      en: "Named as the vodka variation of the classic Martini cocktail. Made globally famous by James Bond's signature order.",
      it: "Prende il nome come variante vodka del classico cocktail Martini. Reso famoso a livello globale dall'ordine caratteristico di James Bond.",
      vi: 'Được đặt tên là biến thể vodka của cocktail Martini cổ điển. Nổi tiếng toàn cầu nhờ đơn hàng đặc trưng của James Bond.',
    },
  },

  taste: {
    profile: ['clean', 'smooth', 'crisp'],
    description: {
      en: "Exceptionally clean and smooth with a silky mouthfeel. The Vodka Martini is all about the quality of the vodka and the subtle vermouth influence. When made well, it's crystal clear in flavor - smooth, slightly herbal from the vermouth, with a cold, clean finish.",
      it: 'Eccezionalmente pulito e liscio con una sensazione setosa in bocca. Il Vodka Martini riguarda la qualità della vodka e la sottile influenza del vermouth. Quando fatto bene, è cristallino nel sapore - liscio, leggermente erbaceo dal vermouth, con un finale freddo e pulito.',
      vi: 'Đặc biệt sạch và mượt với cảm giác lụa trong miệng. Vodka Martini là tất cả về chất lượng của vodka và ảnh hưởng tinh tế của vermouth. Khi được pha chế tốt, nó trong như pha lê về hương vị - mượt, hơi thảo mộc từ vermouth, với kết thúc lạnh, sạch.',
    },
    first_impression: {
      en: 'Ice-cold smoothness with subtle herbal notes from vermouth',
      it: 'Morbidezza gelata con note erbacee sottili dal vermouth',
      vi: 'Độ mượt lạnh như băng với hương thảo mộc tinh tế từ vermouth',
    },
    finish: {
      en: 'Clean, crisp finish with lingering coolness and subtle vermouth complexity',
      it: 'Finale pulito e croccante con freschezza persistente e sottile complessità del vermouth',
      vi: 'Kết thúc sạch, giòn với độ mát kéo dài và sự phức tạp tinh tế của vermouth',
    },
    balance: {
      en: 'The balance is about vodka quality and vermouth quantity - adjust vermouth from "perfect" to "very dry" based on preference',
      it: 'L\'equilibrio riguarda la qualità della vodka e la quantità di vermouth - regolare il vermouth da "perfect" a "very dry" in base alle preferenze',
      vi: 'Sự cân bằng là về chất lượng vodka và số lượng vermouth - điều chỉnh vermouth từ "hoàn hảo" đến "rất khô" dựa trên sở thích',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_afternoon'],
    occasions: ['sophisticated', 'date_night', 'aperitivo', 'celebration'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Classic pairings include oysters, caviar, smoked salmon, and other delicate seafood. Also excellent with olives, almonds, and light appetizers.',
      it: 'Gli abbinamenti classici includono ostriche, caviale, salmone affumicato e altri frutti di mare delicati. Eccellente anche con olive, mandorle e antipasti leggeri.',
      vi: 'Kết hợp cổ điển bao gồm hàu, trứng cá muối, cá hồi hun khói và các loại hải sản tinh tế khác. Cũng tuyệt vời với ô liu, hạnh nhân và món khai vị nhẹ.',
    },
    ideal_for: {
      en: "Perfect for those who appreciate clean, minimalist cocktails. Ideal for vodka enthusiasts who want the sophistication of a martini without gin's botanical complexity. The choice of sophisticates and James Bond fans worldwide.",
      it: 'Perfetto per chi apprezza cocktail puliti e minimalisti. Ideale per gli appassionati di vodka che vogliono la sofisticazione di un martini senza la complessità botanica del gin. La scelta di sofisticati e fan di James Bond in tutto il mondo.',
      vi: 'Hoàn hảo cho những ai đánh giá cao cocktail sạch, tối giản. Lý tưởng cho những người đam mê vodka muốn sự tinh tế của martini mà không có sự phức tạp thực vật của gin. Lựa chọn của những người tinh tế và người hâm mộ James Bond trên toàn thế giới.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_DRY_VERMOUTH',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Dry vermouth', it: 'Vermouth dry', vi: 'Vermouth khô' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour vodka and vermouth into a mixing glass with ice. Stir gently for 30-40 seconds until well-chilled. Strain into a chilled martini glass. Garnish with a lemon twist or olives. Note: James Bond prefers it shaken, though stirring is the traditional method.',
    it: 'Versare vodka e vermouth in un mixing glass con ghiaccio. Mescolare delicatamente per 30-40 secondi fino a raffreddare bene. Filtrare in un bicchiere da martini raffreddato. Guarnire con una scorza di limone o olive. Nota: James Bond lo preferisce shakerato, anche se mescolare è il metodo tradizionale.',
    vi: 'Đổ vodka và vermouth vào ly pha trộn với đá. Khuấy nhẹ trong 30-40 giây cho đến khi lạnh kỹ. Lọc vào ly martini đã làm lạnh. Trang trí với vỏ chanh xoắn hoặc ô liu. Lưu ý: James Bond thích lắc, mặc dù khuấy là phương pháp truyền thống.',
  },

  glass: 'Martini glass (Cocktail)',

  garnish: {
    en: 'Lemon twist or olives',
    it: 'Scorza di limone o olive',
    vi: 'Vỏ chanh xoắn hoặc ô liu',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['clean', 'smooth', 'crisp'],

  abv_estimate: 28,

  calories_estimate: 140,

  difficulty: 'medium',

  prep_time_seconds: 90,

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
      'nut_free',
      'dairy_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['sophisticated', 'date_night', 'aperitivo', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['vesper', 'dirty-martini', 'espresso-martini'],

  notes_for_staff:
    'Use premium vodka - quality is paramount here. Store vodka and vermouth in freezer for extra-cold serve. Traditional method is stirred, but offer shaken if requested (Bond-style). Vermouth amount varies: "dry" = less vermouth, "wet" = more vermouth, "dirty" = add olive brine. Always use fresh vermouth.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/2374/vodka-martini',
    notes: 'Classic recipe with James Bond cultural influence. Various cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
