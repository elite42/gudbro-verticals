/**
 * Negroni Cocktail
 *
 * Born in Florence, Italy in 1919, the Negroni is one of the most
 * iconic Italian cocktails. Created at Caffè Casoni for Count Camillo Negroni,
 * it's a bold, bitter aperitivo that has become a global phenomenon.
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const negroni: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '94c32eb5-4ac2-4903-82a9-947f048ffc5b',
  slug: 'negroni',
  stable_key: 'negroni',

  name: {
    en: 'Negroni',
    it: 'Negroni',
    vi: 'Negroni',
    ko: '네그로니',
    ja: 'ネグローニ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'italian', 'bitter', 'aperitivo'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "The Negroni is a bold, bitter Italian aperitivo cocktail. Perfectly balanced with equal parts gin, Campari, and sweet vermouth, it's a sophisticated drink that embodies la dolce vita. Voted the most ordered cocktail in the world in 2022.",
    it: 'Il Negroni è un audace e amaro aperitivo italiano. Perfettamente bilanciato con parti uguali di gin, Campari e vermouth dolce, è un drink sofisticato che incarna la dolce vita. Votato come il cocktail più ordinato al mondo nel 2022.',
    vi: 'Negroni là aperitivo Ý đậm đà, đắng. Cân bằng hoàn hảo với tỷ lệ bằng nhau gin, Campari và vermouth ngọt, đây là đồ uống tinh tế thể hiện la dolce vita. Được bình chọn là cocktail được gọi nhiều nhất thế giới năm 2022.',
  },

  history: {
    created_year: '1919',
    origin: {
      city: 'Florence',
      bar: 'Caffè Casoni (now Caffè Giacosa)',
      country: 'Italy',
    },
    creator: {
      name: 'Fosco Scarselli',
      profession: 'bartender',
    },
    story: {
      en: 'In 1919 at Caffè Casoni in Florence, Count Camillo Negroni asked bartender Fosco Scarselli to strengthen his favorite cocktail, the Americano, by replacing soda water with gin. Scarselli obliged and also added an orange garnish instead of the traditional lemon to signify the variation. The drink became so popular among other patrons requesting "Count Negroni\'s drink" that it simply became known as the Negroni. The flamboyant count had returned from America when Prohibition began, having lived as a cowboy in the Wild West and a gambler in New York.',
      it: "Nel 1919 al Caffè Casoni di Firenze, il Conte Camillo Negroni chiese al barman Fosco Scarselli di rafforzare il suo cocktail preferito, l'Americano, sostituendo l'acqua di seltz con il gin. Scarselli acconsentì e aggiunse anche una guarnizione di arancia invece del tradizionale limone per indicare la variazione. Il drink divenne così popolare tra gli altri clienti che richiedevano \"il drink del Conte Negroni\" che divenne semplicemente noto come Negroni. Il conte stravagante era tornato dall'America quando iniziò il Proibizionismo, dopo aver vissuto come cowboy nel Far West e giocatore d'azzardo a New York.",
      vi: 'Năm 1919 tại Caffè Casoni ở Florence, Bá tước Camillo Negroni yêu cầu bartender Fosco Scarselli làm mạnh cocktail yêu thích của ông, Americano, bằng cách thay nước soda bằng gin. Scarselli đồng ý và cũng thêm trang trí cam thay vì chanh truyền thống để đánh dấu biến thể. Đồ uống trở nên phổ biến đến mức khách khác yêu cầu "đồ uống của Bá tước Negroni" và nó chỉ đơn giản được gọi là Negroni. Bá tước hào hoa đã trở về từ Mỹ khi Prohibition bắt đầu, sau khi sống như cao bồi ở miền Tây hoang dã và tay cờ bạc ở New York.',
    },
    named_after: {
      en: 'Named after Count Camillo Negroni, the customer for whom the drink was created in 1919.',
      it: 'Prende il nome dal Conte Camillo Negroni, il cliente per cui il drink fu creato nel 1919.',
      vi: 'Được đặt tên theo Bá tước Camillo Negroni, khách hàng mà đồ uống được tạo ra vào năm 1919.',
    },
  },

  taste: {
    profile: ['bitter', 'sweet', 'herbal', 'complex'],
    description: {
      en: 'The Negroni delivers a complex interplay of flavors. Campari provides distinctive bitter orange notes, the gin adds botanical complexity and juniper backbone, while sweet vermouth brings herbal sweetness and depth. The equal proportions create perfect harmony between bitter and sweet.',
      it: "Il Negroni offre un'interazione complessa di sapori. Il Campari fornisce distintive note amare di arancia, il gin aggiunge complessità botanica e spina dorsale di ginepro, mentre il vermouth dolce porta dolcezza erbacea e profondità. Le proporzioni uguali creano armonia perfetta tra amaro e dolce.",
      vi: 'Negroni mang sự tương tác phức hợp của hương vị. Campari cung cấp hương cam đắng đặc trưng, gin thêm độ phức tạp thực vật và xương sống thơm, trong khi vermouth ngọt mang vị ngọt thảo mộc và chiều sâu. Tỷ lệ bằng nhau tạo sự hài hòa hoàn hảo giữa đắng và ngọt.',
    },
    first_impression: {
      en: "Immediately bold and bitter with Campari's distinctive orange peel bitterness, followed quickly by gin's botanical notes and vermouth's sweet complexity.",
      it: "Immediatamente audace e amaro con la distintiva amarezza della scorza d'arancia del Campari, seguito rapidamente dalle note botaniche del gin e dalla dolce complessità del vermouth.",
      vi: 'Ngay lập tức đậm đà và đắng với vị đắng vỏ cam đặc trưng của Campari, theo sau nhanh chóng là hương thực vật của gin và độ phức tạp ngọt của vermouth.',
    },
    finish: {
      en: 'Long, warming finish with persistent bitter orange notes and herbal complexity. The sweetness fades gradually, leaving pleasant bitterness that stimulates the appetite.',
      it: "Finale lungo e avvolgente con persistenti note amare di arancia e complessità erbacea. La dolcezza svanisce gradualmente, lasciando un'amaro piacevole che stimola l'appetito.",
      vi: 'Hậu vị dài, ấm áp với hương cam đắng dai dẳng và độ phức tạp thảo mộc. Vị ngọt nhạt dần, để lại vị đắng dễ chịu kích thích khẩu vị.',
    },
    balance: {
      en: 'Masterfully balanced with the classic 1:1:1 ratio. The three components create synergy where bitter Campari, aromatic gin, and sweet vermouth achieve perfect equilibrium.',
      it: 'Magistralmente bilanciato con il classico rapporto 1:1:1. I tre componenti creano sinergia dove Campari amaro, gin aromatico e vermouth dolce raggiungono perfetto equilibrio.',
      vi: 'Cân bằng tinh tế với tỷ lệ cổ điển 1:1:1. Ba thành phần tạo sự cộng hưởng mà Campari đắng, gin thơm và vermouth ngọt đạt được sự cân bằng hoàn hảo.',
    },
  },

  recommendations: {
    best_time: ['pre-dinner', 'aperitivo', 'evening'],
    occasions: ['aperitivo', 'date_night', 'social_gathering'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Perfect aperitivo pairing with Italian antipasti: olives, cured meats, aged cheeses, bruschetta, and arancini. The bitterness prepares the palate for a meal.',
      it: "Abbinamento aperitivo perfetto con antipasti italiani: olive, salumi, formaggi stagionati, bruschetta e arancini. L'amarezza prepara il palato per un pasto.",
      vi: 'Kết hợp aperitivo hoàn hảo với antipasti Ý: ô liu, thịt hun khói, phô mai lâu năm, bruschetta và arancini. Vị đắng chuẩn bị vị giác cho bữa ăn.',
    },
    ideal_for: {
      en: "Perfect for aperitivo hour, those who appreciate bitter flavors, cocktail enthusiasts, and anyone seeking an authentic Italian drinking experience. The world's most ordered cocktail in 2022.",
      it: "Perfetto per l'ora dell'aperitivo, coloro che apprezzano i sapori amari, appassionati di cocktail e chiunque cerchi un'autentica esperienza di bere italiana. Il cocktail più ordinato al mondo nel 2022.",
      vi: 'Hoàn hảo cho giờ aperitivo, những ai đánh giá cao hương vị đắng, người đam mê cocktail và bất kỳ ai tìm kiếm trải nghiệm uống Ý đích thực. Cocktail được gọi nhiều nhất thế giới năm 2022.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_CAMPARI',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Bitter Campari', it: 'Campari', vi: 'Bitter Campari' },
    },
    {
      ingredient_id: 'ING_VERMOUTH_SWEET',
      quantity: { amount: 30, unit: 'ml' },
      display_name: {
        en: 'Sweet Red Vermouth',
        it: 'Vermouth Rosso Dolce',
        vi: 'Vermouth Đỏ Ngọt',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour all ingredients directly into an old fashioned glass filled with ice. Stir gently to combine and chill. Express the oils from an orange peel over the drink, then use the peel as garnish.',
    it: "Versare tutti gli ingredienti direttamente in un bicchiere old fashioned riempito di ghiaccio. Mescolare delicatamente per combinare e raffreddare. Spruzzare gli oli da una scorza d'arancia sul drink, quindi usare la scorza come guarnizione.",
    vi: 'Đổ tất cả nguyên liệu trực tiếp vào ly old fashioned đầy đá. Khuấy nhẹ nhàng để kết hợp và làm lạnh. Vắt tinh dầu từ vỏ cam lên đồ uống, sau đó dùng vỏ làm trang trí.',
  },

  glass: 'Old fashioned glass',

  garnish: {
    en: 'Half orange slice',
    it: "Mezza fetta d'arancia",
    vi: 'Nửa lát cam',
  },

  ice: 'cubed',
  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['bitter', 'sweet', 'herbal', 'complex'],
  abv_estimate: 24,
  calories_estimate: 195,
  difficulty: 'easy',
  prep_time_seconds: 45,

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
  season_tags: ['all_year'],
  occasion_tags: ['aperitivo', 'date_night', 'social_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: [],

  notes_for_staff:
    'The classic 1:1:1 ratio is essential - never deviate. Use quality Campari (no substitutions for authentic Negroni). Fresh ice is important as dilution affects the drink significantly. Build directly in the glass - no shaking or straining needed. Popular variations include Negroni Sbagliato (prosecco instead of gin) and White Negroni (Suze and Lillet Blanc). June is celebrated as Negroni Week globally.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/negroni/',
    notes:
      'IBA Official Recipe. Historical information from Caffè Giacosa, Florence, and cocktail historians. Voted most ordered cocktail worldwide in 2022 by Drinks International.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
