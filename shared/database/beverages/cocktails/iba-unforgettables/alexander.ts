/**
 * IBA Unforgettables: Alexander
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const alexander: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '133dd203-39eb-40b4-95c5-a665306e0bcc',
  slug: 'alexander',
  stable_key: '22e80616ae87d60827ded6f473074b5a9b991f35',

  name: {
    en: 'Alexander',
    it: 'Alexander',
    vi: 'Alexander',
    ko: '알렉산더',
    ja: 'アレキサンダー',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'creamy', 'dessert', 'after-dinner'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A luxurious, creamy cocktail combining cognac with crème de cacao and fresh cream. Often called a "drinkable dessert," the Alexander is the perfect after-dinner indulgence with its rich chocolate and brandy notes.',
    it: 'Un cocktail lussuoso e cremoso che combina cognac con crème de cacao e panna fresca. Spesso chiamato "dessert da bere," l\'Alexander è la perfetta indulgenza dopo cena con le sue note ricche di cioccolato e brandy.',
    vi: 'Một loại cocktail sang trọng, béo ngậy kết hợp cognac với crème de cacao và kem tươi. Thường được gọi là "món tráng miệng uống được," Alexander là sự nuông chiều hoàn hảo sau bữa tối với hương vị chocolate và brandy đậm đà.',
  },

  history: {
    created_year: '1915',
    origin: {
      city: 'New York City',
      bar: "Rector's Restaurant",
      country: 'USA',
    },
    creator: {
      name: 'Troy Alexander',
      profession: 'bartender',
    },
    story: {
      en: 'The Alexander was created by bartender Troy Alexander at Rector\'s Restaurant in New York City around 1915. It was originally made with gin (not cognac) and was created to honor Phoebe Snow, an advertising character for the Delaware, Lackawanna and Western Railroad. The character wore white to demonstrate how clean the railroad\'s anthracite coal was. The white, creamy drink was meant to match her pristine image. The cognac version, sometimes called "Brandy Alexander," became the more popular variation over time.',
      it: 'L\'Alexander fu creato dal barman Troy Alexander al Rector\'s Restaurant di New York City intorno al 1915. Originariamente era fatto con gin (non cognac) e fu creato in onore di Phoebe Snow, un personaggio pubblicitario della Delaware, Lackawanna and Western Railroad. Il personaggio indossava il bianco per dimostrare quanto fosse pulito il carbone antracite della ferrovia. La bevanda bianca e cremosa doveva corrispondere alla sua immagine immacolata. La versione con cognac, a volte chiamata "Brandy Alexander," divenne la variante più popolare nel tempo.',
      vi: 'Alexander được tạo ra bởi bartender Troy Alexander tại Nhà hàng Rector\'s ở New York City vào khoảng năm 1915. Ban đầu nó được làm với gin (không phải cognac) và được tạo ra để vinh danh Phoebe Snow, một nhân vật quảng cáo cho Delaware, Lackawanna và Western Railroad. Nhân vật mặc đồ trắng để chứng minh than anthracite của đường sắt sạch như thế nào. Thức uống trắng, béo ngậy được tạo ra để phù hợp với hình ảnh tinh khiết của cô. Phiên bản cognac, đôi khi được gọi là "Brandy Alexander," trở thành biến thể phổ biến hơn theo thời gian.',
    },
    named_after: {
      en: 'Named after its creator, bartender Troy Alexander. Some believe it may also reference Tsar Alexander II of Russia, though this is unconfirmed.',
      it: 'Prende il nome dal suo creatore, il barman Troy Alexander. Alcuni credono che possa anche riferirsi allo Zar Alessandro II di Russia, anche se questo non è confermato.',
      vi: 'Được đặt theo tên người tạo ra nó, bartender Troy Alexander. Một số người tin rằng nó cũng có thể ám chỉ Nga hoàng Alexander II, mặc dù điều này chưa được xác nhận.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'boozy'],
    description: {
      en: 'Rich, velvety, and indulgent. The Alexander delivers a harmonious blend of chocolate sweetness from the crème de cacao, the warming depth of cognac, and the silky smoothness of fresh cream.',
      it: 'Ricco, vellutato e indulgente. L\'Alexander offre un\'armoniosa miscela di dolcezza al cioccolato dalla crème de cacao, la profondità calda del cognac e la morbidezza setosa della panna fresca.',
      vi: 'Đậm đà, mượt mà và nuông chiều. Alexander mang đến sự pha trộn hài hòa của vị ngọt chocolate từ crème de cacao, độ ấm sâu của cognac và sự mịn màng như lụa của kem tươi.',
    },
    first_impression: {
      en: 'Smooth chocolate and cream hit first, followed by the warm brandy backbone',
      it: 'Prima arrivano il cioccolato liscio e la panna, seguiti dalla struttura calda del brandy',
      vi: 'Chocolate mượt mà và kem đập vào đầu tiên, tiếp theo là xương sống brandy ấm áp',
    },
    finish: {
      en: 'Long, warming finish with lingering cocoa and nutmeg notes',
      it: 'Finale lungo e caldo con note persistenti di cacao e noce moscata',
      vi: 'Kết thúc dài, ấm áp với hương cacao và nhục đậu khấu kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between sweetness and spirit strength - neither too cloying nor too boozy',
      it: 'Perfettamente bilanciato tra dolcezza e forza alcolica - né troppo stucchevole né troppo alcolico',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt và độ mạnh của rượu - không quá ngọt gắt cũng không quá nồng',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['digestivo', 'date_night', 'celebration', 'nightcap'],
    seasons: ['autumn', 'winter'],
    food_pairings: {
      en: 'Excellent with chocolate desserts, tiramisu, or as a standalone dessert replacement. Also pairs well with cheese plates and dark chocolate truffles.',
      it: 'Eccellente con dessert al cioccolato, tiramisù, o come sostituto del dessert. Si abbina bene anche con taglieri di formaggi e tartufi al cioccolato fondente.',
      vi: 'Tuyệt vời với các món tráng miệng chocolate, tiramisu, hoặc thay thế món tráng miệng. Cũng kết hợp tốt với đĩa phô mai và truffle chocolate đen.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy dessert cocktails and creamy drinks. A great choice for brandy lovers who want something indulgent, or for anyone looking for a sophisticated after-dinner drink.',
      it: 'Perfetto per chi ama i cocktail da dessert e le bevande cremose. Un\'ottima scelta per gli amanti del brandy che vogliono qualcosa di indulgente, o per chiunque cerchi una bevanda sofisticata dopo cena.',
      vi: 'Hoàn hảo cho những ai thích cocktail tráng miệng và đồ uống béo ngậy. Lựa chọn tuyệt vời cho người yêu brandy muốn thứ gì đó nuông chiều, hoặc cho bất kỳ ai tìm kiếm thức uống tinh tế sau bữa tối.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_COGNAC',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Cognac', it: 'Cognac', vi: 'Cognac' },
    },
    {
      ingredient_id: 'ING_CREME_DE_CACAO_DARK',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Crème de Cacao (brown)',
        it: 'Crème de Cacao (scura)',
        vi: 'Crème de Cacao (nâu)',
      },
    },
    {
      ingredient_id: 'ING_HEAVY_CREAM',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh cream', it: 'Panna fresca', vi: 'Kem tươi' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice. Shake well until properly chilled. Strain into a chilled cocktail glass. Sprinkle fresh grated nutmeg on top.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare bene fino a raffreddare adeguatamente. Filtrare in una coppa da cocktail raffreddata. Spolverare con noce moscata appena grattugiata.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc kỹ cho đến khi lạnh đúng mức. Lọc vào ly cocktail đã được làm lạnh. Rắc nhục đậu khấu mới xay lên trên.',
  },

  glass: 'Cocktail glass (Martini)',

  garnish: {
    en: 'Freshly grated nutmeg',
    it: 'Noce moscata appena grattugiata',
    vi: 'Nhục đậu khấu mới xay',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_COGNAC'],

  flavor_profile: ['creamy', 'sweet', 'boozy'],

  abv_estimate: 18, // ~18% ABV after dilution

  calories_estimate: 280, // Cream + liqueur + cognac

  difficulty: 'easy',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk', 'sulphites'],
    intolerances: ['lactose', 'alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['autumn', 'winter'],
  occasion_tags: ['digestivo', 'date_night', 'celebration', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['brandy-alexander', 'coffee-alexander', 'alexander-sister'],

  notes_for_staff: 'Use freshly grated nutmeg, not pre-ground. Shake hard to properly emulsify the cream. Can substitute with Brandy if Cognac unavailable. Original recipe used gin - offer as variation for curious guests.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/alexander/',
    note: 'IBA Official Recipe. Historical information from David Wondrich and various cocktail history sources.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
