/**
 * Famous Cocktails: Final Ward
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const finalWard: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  slug: 'final-ward',
  stable_key: '524334849302847563829104857362918475638292',

  name: {
    en: 'Final Ward',
    it: 'Final Ward',
    vi: 'Final Ward',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'rye', 'herbal', 'bitter'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A modern classic riff on the pre-Prohibition Last Word, the Final Ward swaps gin for rye whiskey while maintaining the equal-parts formula. Created by Phil Ward, this cocktail balances spicy rye with herbal Chartreuse, bitter Maraschino, and tart lemon, creating a complex, sophisticated drink.',
    it: 'Un riff classico moderno sul Last Word del pre-Proibizionismo, il Final Ward sostituisce il gin con il rye whiskey mantenendo la formula a parti uguali. Creato da Phil Ward, questo cocktail bilancia il rye piccante con il Chartreuse erbaceo, il Maraschino amaro e il limone aspro, creando una bevanda complessa e sofisticata.',
    vi: 'Một biến tấu cổ điển hiện đại của Last Word thời tiền Cấm rượu, Final Ward thay gin bằng rye whiskey trong khi duy trì công thức phần bằng nhau. Được tạo ra bởi Phil Ward, cocktail này cân bằng rye cay với Chartreuse thảo mộc, Maraschino đắng và chanh chua, tạo ra thức uống phức tạp, tinh tế.',
  },

  history: {
    created_year: '2007',
    origin: {
      city: 'New York City',
      bar: 'Death & Co',
      country: 'USA',
    },
    creator: {
      name: 'Phil Ward',
      profession: 'bartender',
    },
    story: {
      en: 'Phil Ward created the Final Ward in 2007 at Death & Co, shortly after creating his other modern classic, the Oaxaca Old Fashioned. Ward wanted to create a rye whiskey variation of the cult-favorite Last Word (gin, Chartreuse, Maraschino, lime). By swapping gin for rye and lime for lemon, he created a drink that honors the original while being distinctly American. The name plays on "Last Word" while suggesting finality and authority. It became an instant hit and is now considered one of the essential modern classics.',
      it: 'Phil Ward creò il Final Ward nel 2007 al Death & Co, poco dopo aver creato il suo altro classico moderno, l\'Oaxaca Old Fashioned. Ward voleva creare una variante al rye whiskey del Last Word di culto (gin, Chartreuse, Maraschino, lime). Sostituendo il gin con il rye e il lime con il limone, creò una bevanda che onora l\'originale pur essendo distintamente americana. Il nome gioca su "Last Word" suggerendo finalità e autorità. Divenne un successo istantaneo ed è ora considerato uno dei classici moderni essenziali.',
      vi: 'Phil Ward đã tạo ra Final Ward vào năm 2007 tại Death & Co, ngay sau khi tạo ra tác phẩm cổ điển hiện đại khác của mình, Oaxaca Old Fashioned. Ward muốn tạo ra một biến thể rye whiskey của Last Word được yêu thích (gin, Chartreuse, Maraschino, chanh). Bằng cách thay gin bằng rye và chanh bằng chanh vàng, ông đã tạo ra một thức uống tôn vinh bản gốc trong khi mang đặc trưng Mỹ. Tên chơi chữ với "Last Word" trong khi gợi ý sự hoàn thiện và quyền uy. Nó ngay lập tức thành công và hiện được coi là một trong những tác phẩm cổ điển hiện đại thiết yếu.',
    },
    named_after: {
      en: 'Named as a play on "Last Word" (the original cocktail), suggesting both finality and the bartender\'s ultimate statement on the formula.',
      it: 'Prende il nome come gioco di parole su "Last Word" (il cocktail originale), suggerendo sia la finalità che la dichiarazione definitiva del barman sulla formula.',
      vi: 'Được đặt tên như một trò chơi chữ với "Last Word" (cocktail gốc), gợi ý cả sự hoàn thiện và tuyên bố cuối cùng của bartender về công thức.',
    },
  },

  taste: {
    profile: ['herbal', 'spicy', 'complex', 'balanced'],
    description: {
      en: "Intensely complex and perfectly balanced. Rye whiskey provides spicy, peppery notes that contrast beautifully with Green Chartreuse's herbal sweetness. Maraschino adds almond-cherry complexity with a subtle bitterness, while lemon brings brightness. The equal-parts formula creates harmony where no single ingredient dominates. More assertive and whiskey-forward than the gin-based Last Word.",
      it: "Intensamente complesso e perfettamente bilanciato. Il rye whiskey fornisce note piccanti e pepate che contrastano magnificamente con la dolcezza erbacea del Green Chartreuse. Il Maraschino aggiunge complessità di mandorla e ciliegia con un'amarezza sottile, mentre il limone porta brillantezza. La formula a parti uguali crea armonia dove nessun singolo ingrediente domina. Più assertivo e incentrato sul whiskey rispetto al Last Word a base di gin.",
      vi: 'Cực kỳ phức tạp và cân bằng hoàn hảo. Rye whiskey mang đến hương cay, tiêu đối lập tuyệt đẹp với vị ngọt thảo mộc của Green Chartreuse. Maraschino thêm độ phức tạp hạnh nhân-cherry với vị đắng tinh tế, trong khi chanh mang lại độ tươi sáng. Công thức phần bằng nhau tạo sự hài hòa nơi không có thành phần nào thống trị. Quyết đoán hơn và tập trung vào whiskey hơn Last Word dựa trên gin.',
    },
    first_impression: {
      en: 'Herbal Chartreuse and spicy rye hit first, followed by citrus and cherry notes',
      it: 'Chartreuse erbaceo e rye piccante colpiscono per primi, seguiti da note di agrumi e ciliegia',
      vi: 'Chartreuse thảo mộc và rye cay đập vào đầu tiên, tiếp theo là hương cam quýt và cherry',
    },
    finish: {
      en: 'Long, complex finish with lingering herbal, spice, and almond notes',
      it: 'Finale lungo e complesso con note erbacee, speziate e di mandorla persistenti',
      vi: 'Kết thúc dài, phức tạp với hương thảo mộc, gia vị và hạnh nhân kéo dài',
    },
    balance: {
      en: 'Perfectly balanced equal-parts formula - each ingredient contributes equally',
      it: 'Formula a parti uguali perfettamente bilanciata - ogni ingrediente contribuisce ugualmente',
      vi: 'Công thức phần bằng nhau cân bằng hoàn hảo - mỗi thành phần đóng góp như nhau',
    },
  },

  recommendations: {
    best_time: ['evening', 'cocktail_hour', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'contemplative_drinking', 'special_occasion'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent with charcuterie, aged cheeses, or herbal dishes. Also pairs well with duck, game meats, cherry-based desserts, and almond pastries.',
      it: 'Eccellente con salumi, formaggi stagionati o piatti alle erbe. Si abbina bene anche con anatra, carni di selvaggina, dolci alle ciliegie e pasticcini alle mandorle.',
      vi: 'Tuyệt vời với thịt nguội, phô mai già, hoặc các món thảo mộc. Cũng kết hợp tốt với vịt, thịt thú rừng, món tráng miệng cherry và bánh ngọt hạnh nhân.',
    },
    ideal_for: {
      en: 'Perfect for adventurous drinkers who appreciate complex, spirit-forward cocktails. Ideal for whiskey lovers exploring herbal liqueurs, or Last Word fans wanting a rye variation. Great for those who enjoy balanced, contemplative drinks.',
      it: 'Perfetto per i bevitori avventurosi che apprezzano i cocktail complessi e incentrati sullo spirito. Ideale per gli amanti del whiskey che esplorano i liquori alle erbe, o i fan del Last Word che vogliono una variante al rye. Ottimo per chi ama le bevande bilanciate e contemplative.',
      vi: 'Hoàn hảo cho những người uống phiêu lưu đánh giá cao cocktail phức tạp, tập trung vào rượu mạnh. Lý tưởng cho những người yêu whiskey khám phá rượu mùi thảo mộc, hoặc người hâm mộ Last Word muốn biến thể rye. Tuyệt vời cho những ai thích đồ uống cân bằng, suy ngẫm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Rye whiskey', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_GREEN_CHARTREUSE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Green Chartreuse', it: 'Green Chartreuse', vi: 'Green Chartreuse' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Maraschino liqueur',
        it: 'Liquore Maraschino',
        vi: 'Rượu mùi Maraschino',
      },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Fresh lemon juice',
        it: 'Succo di limone fresco',
        vi: 'Nước chanh tươi',
      },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well chilled. Strain into a chilled coupe or Nick & Nora glass. Garnish with a lemon twist or brandied cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare in una coppa o bicchiere Nick & Nora raffreddato. Guarnire con una scorza di limone o ciliegia al brandy.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc vào ly coupe hoặc Nick & Nora đã được làm lạnh. Trang trí với vỏ chanh xoắn hoặc cherry ngâm brandy.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lemon twist or brandied cherry',
    it: 'Scorza di limone o ciliegia al brandy',
    vi: 'Vỏ chanh xoắn hoặc cherry ngâm brandy',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RYE_WHISKEY'],

  flavor_profile: ['herbal', 'spicy', 'complex', 'balanced'],

  abv_estimate: 28,

  calories_estimate: 180,

  difficulty: 'intermediate',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['aperitivo', 'date_night', 'contemplative_drinking', 'special_occasion'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['last-word', 'division-bell', 'naked-and-famous'],

  notes_for_staff:
    'Equal parts formula - precision matters. Use fresh lemon juice only. Green Chartreuse essential (not yellow). Shake hard to properly chill and dilute. Cousin to Last Word, Division Bell, and Naked & Famous.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'premium',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.deathandcompany.com/',
    notes: 'Created by Phil Ward at Death & Co, New York City, 2007.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
