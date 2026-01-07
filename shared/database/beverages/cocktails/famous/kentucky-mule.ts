/**
 * Famous Cocktails: Kentucky Mule
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const kentuckyMule: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c',
  slug: 'kentucky-mule',
  stable_key: 'a3b2c1d0e9f8182736455463728192021222324252',

  name: {
    en: 'Kentucky Mule',
    it: 'Kentucky Mule',
    vi: 'Kentucky Mule',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'bourbon', 'ginger', 'refreshing'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A bourbon-based variation of the classic Moscow Mule, the Kentucky Mule combines bourbon whiskey with spicy ginger beer and fresh lime juice. Served in the traditional copper mug, this refreshing highball showcases how bourbon's vanilla and caramel notes harmonize beautifully with ginger's spice.",
    it: 'Una variante a base di bourbon del classico Moscow Mule, il Kentucky Mule combina bourbon whiskey con ginger beer piccante e succo di lime fresco. Servito nella tradizionale tazza di rame, questo rinfrescante highball mostra come le note di vaniglia e caramello del bourbon si armonizzano magnificamente con il piccante dello zenzero.',
    vi: 'Một biến thể dựa trên bourbon của Moscow Mule cổ điển, Kentucky Mule kết hợp whiskey bourbon với bia gừng cay và nước chanh tươi. Được phục vụ trong cốc đồng truyền thống, highball sảng khoái này cho thấy cách hương vani và caramel của bourbon hòa quyện tuyệt đẹp với vị cay của gừng.',
  },

  history: {
    created_year: '1940s-1950s',
    origin: {
      city: 'Kentucky',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Kentucky Mule emerged as a natural variation of the Moscow Mule, which was created in the 1940s. As the Moscow Mule gained popularity, bartenders across America began substituting vodka with their local spirits. In Kentucky, the bourbon capital of the United States, it was only natural to create a version with bourbon. The drink gained mainstream popularity in the 2010s during the craft cocktail renaissance, becoming a go-to bourbon cocktail for those who find Old Fashioneds too strong.',
      it: "Il Kentucky Mule emerse come variazione naturale del Moscow Mule, creato negli anni '40. Man mano che il Moscow Mule guadagnava popolarità, i barman in tutta l'America iniziarono a sostituire la vodka con i loro spiriti locali. In Kentucky, la capitale del bourbon degli Stati Uniti, era naturale creare una versione con il bourbon. La bevanda guadagnò popolarità mainstream negli anni 2010 durante la rinascita dei cocktail artigianali, diventando un cocktail al bourbon di riferimento per chi trova gli Old Fashioned troppo forti.",
      vi: 'Kentucky Mule xuất hiện như một biến thể tự nhiên của Moscow Mule, được tạo ra vào những năm 1940. Khi Moscow Mule trở nên phổ biến, các bartender khắp nước Mỹ bắt đầu thay thế vodka bằng rượu mạnh địa phương của họ. Ở Kentucky, thủ phủ bourbon của Hoa Kỳ, việc tạo ra một phiên bản với bourbon là điều tự nhiên. Thức uống trở nên phổ biến rộng rãi vào những năm 2010 trong thời kỳ phục hưng cocktail thủ công, trở thành cocktail bourbon ưa thích cho những ai thấy Old Fashioned quá mạnh.',
    },
    named_after: {
      en: 'Named after Kentucky, the bourbon capital of the United States, replacing vodka (Moscow) with bourbon (Kentucky) in the Mule formula.',
      it: 'Prende il nome da Kentucky, la capitale del bourbon degli Stati Uniti, sostituendo la vodka (Mosca) con il bourbon (Kentucky) nella formula Mule.',
      vi: 'Được đặt tên theo Kentucky, thủ phủ bourbon của Hoa Kỳ, thay thế vodka (Moscow) bằng bourbon (Kentucky) trong công thức Mule.',
    },
  },

  taste: {
    profile: ['ginger', 'bourbon', 'citrus', 'refreshing'],
    description: {
      en: "Refreshing and complex. Bourbon's vanilla, oak, and caramel notes are lifted by spicy ginger beer, while fresh lime adds bright acidity. The copper mug keeps it ice cold, emphasizing the refreshing quality. Ginger's spice complements bourbon's warmth beautifully.",
      it: 'Rinfrescante e complesso. Le note di vaniglia, rovere e caramello del bourbon sono sollevate dalla ginger beer piccante, mentre il lime fresco aggiunge acidità brillante. La tazza di rame lo mantiene ghiacciato, enfatizzando la qualità rinfrescante. Il piccante dello zenzero completa magnificamente il calore del bourbon.',
      vi: 'Sảng khoái và phức tạp. Hương vani, gỗ sồi và caramel của bourbon được nâng lên bởi bia gừng cay, trong khi chanh tươi thêm độ chua tươi sáng. Cốc đồng giữ nó lạnh như băng, nhấn mạnh chất lượng sảng khoái. Vị cay của gừng bổ sung tuyệt đẹp cho hơi ấm của bourbon.',
    },
    first_impression: {
      en: 'Spicy ginger and bright lime hit first, bourbon warmth follows',
      it: 'Zenzero piccante e lime brillante colpiscono per primi, segue il calore del bourbon',
      vi: 'Gừng cay và chanh tươi sáng đập vào đầu tiên, hơi ấm bourbon theo sau',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering ginger spice and bourbon notes',
      it: 'Finale pulito e rinfrescante con piccante di zenzero persistente e note di bourbon',
      vi: 'Kết thúc sạch sẽ, sảng khoái với vị cay gừng và hương bourbon kéo dài',
    },
    balance: {
      en: "Well-balanced - ginger spice cuts bourbon's sweetness, lime adds brightness",
      it: 'Ben bilanciato - il piccante dello zenzero taglia la dolcezza del bourbon, il lime aggiunge brillantezza',
      vi: 'Cân bằng tốt - vị cay gừng cắt vị ngọt bourbon, chanh thêm độ tươi sáng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'happy_hour'],
    occasions: ['casual', 'party', 'bbq', 'summer_gathering'],
    seasons: ['spring', 'summer', 'autumn'],
    food_pairings: {
      en: 'Excellent with barbecue, fried chicken, burgers, or spicy foods. Also pairs well with Asian cuisine, particularly Thai or Vietnamese dishes, and pub fare like wings or nachos.',
      it: 'Eccellente con barbecue, pollo fritto, hamburger o cibi piccanti. Si abbina bene anche con la cucina asiatica, in particolare piatti tailandesi o vietnamiti, e cibo da pub come alette o nachos.',
      vi: 'Tuyệt vời với thịt nướng, gà rán, burger, hoặc đồ ăn cay. Cũng kết hợp tốt với món Á, đặc biệt là món Thái hoặc Việt, và đồ ăn quán bar như cánh gà hoặc nachos.',
    },
    ideal_for: {
      en: 'Perfect for bourbon lovers who want something refreshing and easy-drinking. Ideal for those who enjoy Moscow Mules but prefer whiskey to vodka. Great for hot weather and casual gatherings.',
      it: 'Perfetto per gli amanti del bourbon che vogliono qualcosa di rinfrescante e facile da bere. Ideale per chi ama i Moscow Mule ma preferisce il whiskey alla vodka. Ottimo per il caldo e le riunioni informali.',
      vi: 'Hoàn hảo cho những người yêu bourbon muốn thứ gì đó sảng khoái và dễ uống. Lý tưởng cho những ai thích Moscow Mule nhưng thích whiskey hơn vodka. Tuyệt vời cho thời tiết nóng và các buổi tụ tập bình thường.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Bourbon whiskey', it: 'Bourbon whiskey', vi: 'Rượu whiskey bourbon' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GINGER_BEER',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Ginger beer', it: 'Ginger beer', vi: 'Bia gừng' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a copper mug or highball glass with ice. Add bourbon and lime juice. Top with ginger beer and stir gently to combine. Garnish with a lime wedge and mint sprig.',
    it: 'Riempire una tazza di rame o un bicchiere highball con ghiaccio. Aggiungere bourbon e succo di lime. Completare con ginger beer e mescolare delicatamente per combinare. Guarnire con uno spicchio di lime e un rametto di menta.',
    vi: 'Đổ đầy cốc đồng hoặc ly highball bằng đá. Thêm bourbon và nước chanh. Đổ đầy bia gừng và khuấy nhẹ để kết hợp. Trang trí với múi chanh và cành bạc hà.',
  },

  glass: 'Copper mug (or Highball glass)',

  garnish: {
    en: 'Lime wedge and mint sprig',
    it: 'Spicchio di lime e rametto di menta',
    vi: 'Múi chanh và cành bạc hà',
  },

  ice: 'cubes',

  serving_style: 'highball',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['ginger', 'bourbon', 'citrus', 'refreshing'],

  abv_estimate: 12,

  calories_estimate: 200,

  difficulty: 'easy',

  prep_time_seconds: 45,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'ginger_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer', 'autumn'],
  occasion_tags: ['casual', 'party', 'bbq', 'summer_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['spicy-kentucky-mule', 'apple-kentucky-mule', 'smoky-kentucky-mule'],

  notes_for_staff:
    'Use quality ginger beer with real ginger - not ginger ale. Copper mug preferred for presentation and temperature. Can muddle mint for extra freshness. Fresh lime juice essential.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/kentucky-mule/',
    notes: 'Modern variation of Moscow Mule, popularized in 2010s.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
