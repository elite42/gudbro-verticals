/**
 * IBA Unforgettables: Clover Club
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const cloverClub: Cocktail = {
  id: 'f7b06f82-bcfa-426c-8d11-17f19462b37a',
  slug: 'clover-club',
  stable_key: 'ae84232a865262ae3e01e4f44a89d23e8cd42f53',

  name: {
    en: 'Clover Club',
    it: 'Clover Club',
    vi: 'Clover Club',
    ko: '클로버 클럽',
    ja: 'クローバークラブ',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'fruity', 'pre-prohibition', 'egg-white', 'pink'],

  description: {
    en: "An elegant pre-Prohibition cocktail with a beautiful pink color and silky foam from egg white. The Clover Club combines gin with raspberry and lemon for a perfectly balanced, sophisticated drink that's fruity without being sweet.",
    it: "Un elegante cocktail pre-Proibizionismo con un bel colore rosa e schiuma setosa dall'albume. Il Clover Club combina gin con lampone e limone per una bevanda perfettamente bilanciata e sofisticata, fruttata senza essere dolce.",
    vi: 'Một cocktail thanh lịch tiền-Cấm rượu với màu hồng đẹp và bọt mượt từ lòng trắng trứng. Clover Club kết hợp gin với mâm xôi và chanh tạo nên thức uống cân bằng hoàn hảo, tinh tế, trái cây mà không ngọt.',
  },

  history: {
    created_year: '1900s',
    origin: {
      city: 'Philadelphia',
      bar: 'Bellevue-Stratford Hotel',
      country: 'USA',
    },
    story: {
      en: 'The Clover Club originated in the pre-Prohibition era at the Bellevue-Stratford Hotel in Philadelphia, where a men\'s club of the same name met. The Clover Club was an exclusive gentlemen\'s club of lawyers, writers, and businessmen who gathered to discuss literature and politics. The pink, frothy cocktail became their signature drink. After Prohibition and the rise of "girly drink" stigma, the cocktail fell out of favor, unfairly dismissed as too feminine. It was rediscovered in the craft cocktail renaissance of the 2000s and is now rightfully celebrated as a sophisticated classic.',
      it: "Il Clover Club ha origine nell'era pre-Proibizionismo al Bellevue-Stratford Hotel di Philadelphia, dove si riuniva un club maschile omonimo. Il Clover Club era un esclusivo club di gentiluomini formato da avvocati, scrittori e uomini d'affari che si riunivano per discutere di letteratura e politica. Il cocktail rosa e spumoso divenne la loro bevanda distintiva. Dopo il Proibizionismo, il cocktail cadde in disgrazia, ingiustamente liquidato come troppo femminile. Fu riscoperto nel rinascimento dei cocktail artigianali degli anni 2000.",
      vi: 'Clover Club có nguồn gốc từ thời kỳ tiền-Cấm rượu tại Khách sạn Bellevue-Stratford ở Philadelphia, nơi một câu lạc bộ nam giới cùng tên họp mặt. Clover Club là câu lạc bộ quý ông độc quyền của luật sư, nhà văn và doanh nhân tụ họp để thảo luận về văn học và chính trị. Cocktail màu hồng sủi bọt trở thành thức uống đặc trưng của họ. Sau Cấm rượu, cocktail không còn được ưa chuộng, bị coi là quá nữ tính. Nó được tái khám phá trong thời kỳ phục hưng cocktail thủ công những năm 2000.',
    },
    named_after: {
      en: "Named after the Clover Club, an exclusive Philadelphia gentlemen's club that met at the Bellevue-Stratford Hotel from the 1880s to 1920s.",
      it: "Prende il nome dal Clover Club, un esclusivo club di gentiluomini di Philadelphia che si riuniva al Bellevue-Stratford Hotel dal 1880 agli anni '20.",
      vi: 'Được đặt tên theo Clover Club, một câu lạc bộ quý ông độc quyền ở Philadelphia họp tại Khách sạn Bellevue-Stratford từ những năm 1880 đến 1920.',
    },
  },

  taste: {
    profile: ['fruity', 'sour', 'dry', 'refreshing'],
    description: {
      en: 'Bright and refreshing with a silky texture from the egg white. The raspberry provides fruitiness without cloying sweetness, while lemon adds tartness and gin contributes botanical backbone. The foam creates a luxurious mouthfeel.',
      it: "Luminoso e rinfrescante con una consistenza setosa dall'albume. Il lampone fornisce fruttato senza dolcezza stucchevole, mentre il limone aggiunge acidità e il gin contribuisce alla struttura botanica. La schiuma crea una sensazione lussuosa in bocca.",
      vi: 'Tươi sáng và sảng khoái với kết cấu mượt mà từ lòng trắng trứng. Mâm xôi cung cấp vị trái cây không ngọt gắt, trong khi chanh thêm vị chua và gin đóng góp xương sống thực vật. Bọt tạo cảm giác sang trọng trong miệng.',
    },
    first_impression: {
      en: 'Bright raspberry and citrus with silky foam',
      it: 'Lampone e agrumi luminosi con schiuma setosa',
      vi: 'Mâm xôi và cam quýt tươi sáng với bọt mượt mà',
    },
    finish: {
      en: 'Clean, dry finish with lingering berry notes',
      it: 'Finale pulito e secco con note di frutti di bosco persistenti',
      vi: 'Kết thúc sạch, khô với hương quả mọng kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between fruit sweetness and citrus tartness, with gin providing structure',
      it: 'Perfettamente bilanciato tra dolcezza fruttata e acidità agrumata, con il gin che fornisce struttura',
      vi: 'Cân bằng hoàn hảo giữa vị ngọt trái cây và vị chua cam quýt, với gin cung cấp cấu trúc',
    },
  },

  recommendations: {
    best_time: ['evening'],
    occasions: ['date_night', 'celebration', 'brunch'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs beautifully with light appetizers, seafood, and berry desserts. Excellent brunch cocktail alongside eggs Benedict or fruit plates.',
      it: 'Si abbina magnificamente con antipasti leggeri, frutti di mare e dessert ai frutti di bosco. Eccellente cocktail da brunch con uova alla Benedict o piatti di frutta.',
      vi: 'Kết hợp tuyệt vời với khai vị nhẹ, hải sản và tráng miệng berry. Cocktail brunch tuyệt vời cùng với trứng Benedict hoặc đĩa trái cây.',
    },
    ideal_for: {
      en: 'Anyone who enjoys sours and gin cocktails. Perfect for those who appreciate texture in their drinks. A great introduction to egg white cocktails.',
      it: "Chiunque apprezzi i sour e i cocktail a base di gin. Perfetto per chi apprezza la texture nelle bevande. Un'ottima introduzione ai cocktail con albume.",
      vi: 'Bất kỳ ai thích sour và cocktail gin. Hoàn hảo cho những ai đánh giá cao kết cấu trong đồ uống. Giới thiệu tuyệt vời về cocktail lòng trắng trứng.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_RASPBERRY_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Raspberry Syrup', it: 'Sciroppo di Lampone', vi: 'Siro Mâm Xôi' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'Fresh Lemon Juice',
        it: 'Succo di Limone Fresco',
        vi: 'Nước Chanh Tươi',
      },
    },
    {
      ingredient_id: 'ING_EGG_WHITE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Egg White', it: "Albume d'Uovo", vi: 'Lòng Trắng Trứng' },
      notes: { en: 'Few drops', it: 'Qualche goccia', vi: 'Vài giọt' },
      substitutes: ['ING_AQUAFABA'],
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker. Dry shake (without ice) vigorously to emulsify the egg white. Add ice and shake again until well chilled. Strain into a chilled cocktail glass. Garnish with fresh raspberries.',
    it: "Versare tutti gli ingredienti in uno shaker. Shakerare a secco (senza ghiaccio) vigorosamente per emulsionare l'albume. Aggiungere ghiaccio e shakerare di nuovo fino a raffreddare. Filtrare in una coppa da cocktail raffreddata. Guarnire con lamponi freschi.",
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail. Lắc khô (không có đá) mạnh mẽ để nhũ hóa lòng trắng trứng. Thêm đá và lắc lại cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh. Trang trí với mâm xôi tươi.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Fresh raspberries',
    it: 'Lamponi freschi',
    vi: 'Mâm xôi tươi',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['fruity', 'sour', 'dry', 'refreshing'],
  abv_estimate: 20,
  calories_estimate: 165,
  difficulty: 'medium',
  prep_time_seconds: 90,

  computed: {
    allergens: ['eggs', 'sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['date_night', 'celebration', 'brunch'],

  is_mocktail: false,
  is_signature: false,

  variants: ['clover-club-royal'],

  notes_for_staff:
    "The dry shake is essential for the silky foam. Offer aquafaba for vegan guests. Fresh raspberries for garnish make it special. Don't skip the egg white - it transforms the texture completely.",

  price_tier: 'mid',
  popularity: 68,

  source: {
    primary: 'https://iba-world.com/clover-club/',
    notes: 'IBA Official Recipe. Pre-Prohibition classic from Philadelphia.',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
