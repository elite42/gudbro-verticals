/**
 * IBA Unforgettables: Daiquiri
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const daiquiri: Cocktail = {
  id: '2218cd73-5e9d-4148-979d-13436b6e2c47',
  slug: 'daiquiri',
  stable_key: 'daiquiri-iba-unforgettable',

  name: {
    en: 'Daiquiri',
    it: 'Daiquiri',
    vi: 'Daiquiri',
    ko: '다이키리',
    ja: 'ダイキリ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'cuban', 'rum', 'sour', 'refreshing', 'hemingway'],

  description: {
    en: 'The quintessential rum sour - a perfect balance of white rum, fresh lime, and just enough sugar. Simple, elegant, and refreshing, the classic Daiquiri is a testament to the beauty of restraint. Forget the frozen strawberry versions - this is the real deal.',
    it: 'Il sour di rum per eccellenza - un equilibrio perfetto di rum bianco, lime fresco e giusto un po\' di zucchero. Semplice, elegante e rinfrescante, il classico Daiquiri è una testimonianza della bellezza della moderazione. Dimentica le versioni frozen alla fragola - questo è l\'originale.',
    vi: 'Rum sour tinh túy - sự cân bằng hoàn hảo của rum trắng, chanh tươi và đủ đường. Đơn giản, thanh lịch và sảng khoái, Daiquiri cổ điển là minh chứng cho vẻ đẹp của sự tiết chế. Quên các phiên bản frozen dâu đi - đây mới là thật.',
  },

  history: {
    created_year: 1898,
    origin: {
      city: 'Santiago de Cuba',
      bar: 'Venus Hotel / Daiquiri mines',
      country: 'Cuba',
    },
    creator: {
      name: 'Jennings Cox',
      profession: 'American mining engineer',
    },
    story: {
      en: 'The Daiquiri was created around 1898 by Jennings Cox, an American mining engineer working at iron mines near the village of Daiquirí in Cuba. Legend says Cox ran out of gin while entertaining American guests and improvised with local rum, lime, and sugar. The cocktail was later popularized at Havana\'s El Floridita bar, where it became Ernest Hemingway\'s drink of choice. Hemingway allegedly consumed up to 15 double daiquiris in a single sitting (though he preferred his without sugar - the "Papa Doble"). The simple recipe epitomizes Cuban cocktail culture.',
      it: 'Il Daiquiri fu creato intorno al 1898 da Jennings Cox, un ingegnere minerario americano che lavorava nelle miniere di ferro vicino al villaggio di Daiquirí a Cuba. La leggenda narra che Cox finì il gin mentre intratteneva ospiti americani e improvvisò con rum locale, lime e zucchero. Il cocktail fu poi reso popolare all\'El Floridita di L\'Avana, dove divenne la bevanda preferita di Ernest Hemingway. Si dice che Hemingway consumasse fino a 15 daiquiri doppi in una sola seduta (anche se preferiva il suo senza zucchero - il "Papa Doble").',
      vi: 'Daiquiri được tạo ra khoảng năm 1898 bởi Jennings Cox, một kỹ sư mỏ người Mỹ làm việc tại các mỏ sắt gần làng Daiquirí ở Cuba. Truyền thuyết kể Cox hết gin khi tiếp khách Mỹ và đã ứng biến với rum địa phương, chanh và đường. Cocktail sau đó được phổ biến tại quán bar El Floridita ở Havana, nơi nó trở thành thức uống ưa thích của Ernest Hemingway. Hemingway được cho là uống tới 15 ly daiquiri đôi trong một lần ngồi (mặc dù ông thích không đường - "Papa Doble").',
    },
    named_after: {
      en: 'Named after Daiquirí, a village and beach near Santiago de Cuba where the iron mines were located.',
      it: 'Prende il nome da Daiquirí, un villaggio e una spiaggia vicino a Santiago de Cuba dove si trovavano le miniere di ferro.',
      vi: 'Được đặt tên theo Daiquirí, một ngôi làng và bãi biển gần Santiago de Cuba, nơi có các mỏ sắt.',
    },
  },

  taste: {
    profile: ['sour', 'sweet', 'citrus', 'refreshing'],
    description: {
      en: 'Crisp, clean, and perfectly balanced. The white rum provides a clean canvas with subtle sweetness, the lime brings bright acidity, and the sugar rounds it all together. Simple ingredients, complex satisfaction.',
      it: 'Frizzante, pulito e perfettamente bilanciato. Il rum bianco fornisce una tela pulita con sottile dolcezza, il lime porta acidità brillante e lo zucchero arrotonda tutto insieme. Ingredienti semplici, soddisfazione complessa.',
      vi: 'Thanh, sạch và cân bằng hoàn hảo. Rum trắng cung cấp nền sạch với vị ngọt tinh tế, chanh mang đến độ chua tươi sáng và đường làm tròn tất cả. Nguyên liệu đơn giản, sự hài lòng phức tạp.',
    },
    first_impression: {
      en: 'Bright, zesty lime followed by clean rum sweetness',
      it: 'Lime brillante e vivace seguito dalla dolcezza pulita del rum',
      vi: 'Chanh tươi sáng theo sau là vị ngọt sạch của rum',
    },
    finish: {
      en: 'Clean, refreshing finish with subtle rum warmth',
      it: 'Finale pulito e rinfrescante con sottile calore del rum',
      vi: 'Kết thúc sạch, sảng khoái với sự ấm áp tinh tế của rum',
    },
    balance: {
      en: 'The holy trinity of rum cocktails - spirit, citrus, and sugar in perfect harmony',
      it: 'La sacra trinità dei cocktail al rum - spirito, agrumi e zucchero in perfetta armonia',
      vi: 'Bộ ba thần thánh của cocktail rum - rượu, cam quýt và đường hài hòa hoàn hảo',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['casual', 'party', 'aperitivo'],
    seasons: ['spring', 'summer', 'all_year'],
    food_pairings: {
      en: 'Perfect with seafood, especially ceviche, oysters, and grilled fish. Also excellent with Cuban cuisine and Caribbean dishes.',
      it: 'Perfetto con frutti di mare, specialmente ceviche, ostriche e pesce alla griglia. Eccellente anche con cucina cubana e piatti caraibici.',
      vi: 'Hoàn hảo với hải sản, đặc biệt là ceviche, hàu và cá nướng. Cũng tuyệt vời với ẩm thực Cuba và các món Caribe.',
    },
    ideal_for: {
      en: 'Everyone. A true crowd-pleaser that showcases rum\'s versatility. Perfect for rum skeptics and enthusiasts alike. The benchmark for all rum sours.',
      it: 'Tutti. Un vero piacere per tutti che mette in mostra la versatilità del rum. Perfetto sia per scettici che entusiasti del rum. Il benchmark per tutti i rum sour.',
      vi: 'Tất cả mọi người. Một thức uống hài lòng mọi người thể hiện tính linh hoạt của rum. Hoàn hảo cho cả người hoài nghi và yêu thích rum. Tiêu chuẩn cho tất cả rum sour.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'White Cuban Rum', it: 'Rum Bianco Cubano', vi: 'Rum Trắng Cuba' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh Lime Juice', it: 'Succo di Lime Fresco', vi: 'Nước Chanh Xanh Tươi' },
    },
    {
      ingredient_id: 'ING_SUPERFINE_SUGAR',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Superfine Sugar', it: 'Zucchero Semolato Fine', vi: 'Đường Siêu Mịn' },
      notes: { en: '2 bar spoons', it: '2 cucchiai da bar', vi: '2 thìa bar' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'In a cocktail shaker, add all ingredients. Stir well to dissolve the sugar. Add ice and shake vigorously until well chilled. Strain into a chilled cocktail glass.',
    it: 'In uno shaker da cocktail, aggiungere tutti gli ingredienti. Mescolare bene per sciogliere lo zucchero. Aggiungere ghiaccio e shakerare vigorosamente fino a raffreddare. Filtrare in una coppa da cocktail raffreddata.',
    vi: 'Trong bình lắc cocktail, cho tất cả nguyên liệu. Khuấy kỹ để hòa tan đường. Thêm đá và lắc mạnh cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'None (traditionally served without garnish)',
    it: 'Nessuna (tradizionalmente servito senza guarnizione)',
    vi: 'Không có (truyền thống phục vụ không trang trí)',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_RUM_WHITE'],
  flavor_profile: ['sour', 'sweet', 'citrus', 'refreshing'],
  abv_estimate: 23,
  calories_estimate: 145,
  difficulty: 'easy',
  prep_time_seconds: 45,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'fructose', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'all_year'],
  occasion_tags: ['casual', 'party', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  variants: ['frozen-daiquiri', 'hemingway-daiquiri', 'strawberry-daiquiri'],

  notes_for_staff: 'Use quality white rum (Havana Club, Bacardi Superior). Fresh lime juice is non-negotiable. Dissolve sugar before adding ice. This is NOT a frozen drink - that\'s a different (and lesser) beast. Offer the Hemingway Daiquiri (Papa Doble) as a drier variation.',

  price_tier: 'low',
  popularity: 92,

  source: {
    primary: 'https://iba-world.com/daiquiri/',
    note: 'IBA Official Recipe. Cuban classic from 1898.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
