/**
 * IBA New Era Drinks: French Martini
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const frenchMartini: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'c5d6e7f8-9a0b-1c2d-3e4f-5a6b7c8d9e0f',
  slug: 'french-martini',
  stable_key: 'a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7',

  name: {
    en: 'French Martini',
    it: 'French Martini',
    vi: 'French Martini',
    ko: '프렌치 마티니',
    ja: 'フレンチ・マティーニ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'NewEraDrinks',
  tags: ['iba', 'official', 'modern', 'vodka', 'fruity', 'elegant', '1990s'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A luxurious and fruity cocktail featuring vodka, Chambord raspberry liqueur, and pineapple juice. Despite its name, this elegant drink is neither French nor a true Martini, but rather a sophisticated vodka cocktail with a beautiful foam cap and complex fruit flavors that became iconic in the 1990s.',
    it: 'Un cocktail lussuoso e fruttato con vodka, liquore di lamponi Chambord e succo di ananas. Nonostante il nome, questa elegante bevanda non è né francese né un vero Martini, ma piuttosto un sofisticato cocktail di vodka con una bellissima schiuma e sapori di frutta complessi che divenne iconico negli anni \'90.',
    vi: 'Một cocktail sang trọng và trái cây với vodka, rượu mùi mâm xôi Chambord và nước dứa. Bất chấp tên gọi, đồ uống thanh lịch này không phải là Pháp cũng không phải Martini thực sự, mà là cocktail vodka tinh tế với lớp bọt đẹp và hương vị trái cây phức tạp trở nên biểu tượng trong những năm 1990.',
  },

  history: {
    created_year: '1980s',
    origin: {
      city: 'New York City',
      bar: "Keith McNally's establishments",
      country: 'USA',
    },
    creator: {
      name: 'Dale DeGroff (popularized)',
      profession: 'bartender',
    },
    story: {
      en: 'The French Martini emerged in the 1980s at Keith McNally\'s New York establishments and was popularized by legendary bartender Dale DeGroff in the 1990s. The name "French" refers to Chambord, a French raspberry liqueur from the Loire Valley. The drink became a symbol of 1990s cocktail culture and the vodka craze of that era. Its distinctive frothy texture comes from the pineapple juice when shaken vigorously. The cocktail experienced a resurgence in the 2010s-2020s as part of the nostalgic revival of \'90s drinks.',
      it: 'Il French Martini emerse negli anni \'80 nei locali di Keith McNally a New York e fu reso popolare dal leggendario barman Dale DeGroff negli anni \'90. Il nome "French" si riferisce al Chambord, un liquore di lamponi francese della Valle della Loira. La bevanda divenne un simbolo della cultura dei cocktail degli anni \'90 e della mania della vodka di quell\'epoca. La sua distintiva consistenza spumosa proviene dal succo di ananas quando shakerato vigorosamente. Il cocktail ha vissuto una rinascita negli anni 2010-2020 come parte del revival nostalgico delle bevande degli anni \'90.',
      vi: 'French Martini xuất hiện những năm 1980 tại các cơ sở của Keith McNally ở New York và được phổ biến bởi bartender huyền thoại Dale DeGroff những năm 1990. Tên "French" đề cập đến Chambord, một rượu mùi mâm xôi Pháp từ thung lũng Loire. Đồ uống trở thành biểu tượng của văn hóa cocktail những năm 1990 và cơn sốt vodka thời đó. Kết cấu bọt đặc trưng đến từ nước dứa khi lắc mạnh. Cocktail trải qua sự hồi sinh trong những năm 2010-2020 như một phần của sự phục hưng hoài niệm đồ uống những năm 90.',
    },
    named_after: {
      en: 'Named "French" for Chambord, the French raspberry liqueur, and "Martini" for its elegant, sophisticated presentation in a cocktail glass.',
      it: 'Chiamato "French" per il Chambord, il liquore di lamponi francese, e "Martini" per la sua presentazione elegante e sofisticata in un bicchiere da cocktail.',
      vi: 'Được đặt tên "French" cho Chambord, rượu mùi mâm xôi Pháp, và "Martini" cho cách trình bày thanh lịch, tinh tế trong ly cocktail.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'smooth', 'elegant'],
    description: {
      en: 'Luxuriously fruity with sweet-tart raspberry from Chambord, tropical pineapple sweetness, and smooth vodka character. The vigorous shaking creates a silky foam texture that adds elegance. The combination is indulgent yet balanced, with the raspberry and pineapple flavors complementing each other beautifully.',
      it: 'Lussuosamente fruttato con lampone dolce-acido dal Chambord, dolcezza tropicale di ananas e carattere morbido della vodka. Lo shakeramento vigoroso crea una consistenza setosa di schiuma che aggiunge eleganza. La combinazione è indulgente ma equilibrata, con i sapori di lampone e ananas che si completano magnificamente.',
      vi: 'Trái cây sang trọng với mâm xôi ngọt chua từ Chambord, vị ngọt dứa nhiệt đới và đặc tính vodka mượt mà. Lắc mạnh tạo kết cấu bọt mượt mà thêm sự thanh lịch. Sự kết hợp nuông chiều nhưng cân bằng, với hương vị mâm xôi và dứa bổ sung cho nhau tuyệt đẹp.',
    },
    first_impression: {
      en: 'Sweet raspberry and tropical pineapple with elegant foam texture',
      it: 'Lampone dolce e ananas tropicale con elegante consistenza di schiuma',
      vi: 'Mâm xôi ngọt và dứa nhiệt đới với kết cấu bọt thanh lịch',
    },
    finish: {
      en: 'Smooth, fruity finish with lingering raspberry sweetness',
      it: 'Finale morbido e fruttato con dolcezza persistente di lampone',
      vi: 'Kết thúc mượt mà, trái cây với vị ngọt mâm xôi kéo dài',
    },
    balance: {
      en: 'Well balanced between raspberry liqueur sweetness and pineapple tartness with smooth vodka base',
      it: 'Ben bilanciato tra dolcezza del liquore di lamponi e acidità dell\'ananas con base morbida di vodka',
      vi: 'Cân bằng tốt giữa vị ngọt rượu mùi mâm xôi và vị chua dứa với nền vodka mượt mà',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night', 'celebration'],
    occasions: ['date_night', 'celebration', 'cocktail_party', 'glamorous_evening'],
    seasons: ['spring', 'summer', 'autumn', 'winter'],
    food_pairings: {
      en: 'Pairs well with chocolate desserts, cheese plates, fresh berries, creamy dishes, and light appetizers.',
      it: 'Si abbina bene con dessert al cioccolato, taglieri di formaggi, bacche fresche, piatti cremosi e antipasti leggeri.',
      vi: 'Kết hợp tốt với tráng miệng chocolate, đĩa phô mai, quả mọng tươi, món kem và món khai vị nhẹ.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy fruity, elegant cocktails with a luxurious feel. Ideal for celebrations, date nights, and anyone seeking a glamorous \'90s throwback. Great for vodka enthusiasts who appreciate fruit-forward drinks.',
      it: 'Perfetto per chi ama cocktail fruttati ed eleganti con un tocco lussuoso. Ideale per celebrazioni, serate romantiche e chiunque cerchi un glamour throwback agli anni \'90. Ottimo per gli appassionati di vodka che apprezzano bevande con frutta in primo piano.',
      vi: 'Hoàn hảo cho những ai thích cocktail trái cây, thanh lịch với cảm giác sang trọng. Lý tưởng cho lễ kỷ niệm, tối hẹn hò và ai đang tìm kiếm sự quyến rũ hoài niệm những năm 90. Tuyệt vời cho người đam mê vodka đánh giá cao đồ uống hương trái cây.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_CHAMBORD',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Chambord (raspberry liqueur)', it: 'Chambord (liquore di lamponi)', vi: 'Chambord (rượu mùi mâm xôi)' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước dứa' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously for 15-20 seconds to create a frothy texture. Fine strain into a chilled Martini glass (coupe also works well). The drink should have a beautiful foam cap. Garnish with a lemon twist or fresh raspberry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente per 15-20 secondi per creare una consistenza spumosa. Filtrare finemente in un bicchiere Martini raffreddato (anche la coppa funziona bene). La bevanda dovrebbe avere una bellissima schiuma. Guarnire con una scorza di limone o lampone fresco.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh trong 15-20 giây để tạo kết cấu bọt. Lọc mịn vào ly Martini đã làm lạnh (coupe cũng hoạt động tốt). Đồ uống nên có lớp bọt đẹp. Trang trí với vỏ chanh xoắn hoặc mâm xôi tươi.',
  },

  glass: 'Martini glass (or Coupe)',

  garnish: {
    en: 'Lemon twist or fresh raspberry',
    it: 'Scorza di limone o lampone fresco',
    vi: 'Vỏ chanh xoắn hoặc mâm xôi tươi',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['fruity', 'sweet', 'smooth', 'elegant'],

  abv_estimate: 15,

  calories_estimate: 190,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn', 'winter'],
  occasion_tags: ['date_night', 'celebration', 'cocktail_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['pornstar-martini', 'raspberry-martini'],

  notes_for_staff: 'Chambord is essential - do not substitute with other raspberry liqueurs. Vigorous shaking creates signature foam. Fresh pineapple juice preferred. Fine strain for smooth texture.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/french-martini/',
    note: 'IBA Official Recipe. Popularized by Dale DeGroff in 1990s New York.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
