/**
 * IBA Unforgettables: Aviation
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const aviation: Cocktail = {
  id: '01563d2f-07b9-4049-aa29-d63c854f831a',
  slug: 'aviation',
  stable_key: '6b7736cd1ee920f1f015a5b03d90364f7442efba',

  name: {
    en: 'Aviation',
    it: 'Aviation',
    vi: 'Aviation',
    ko: '에비에이션',
    ja: 'アビエーション',
  },

  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'floral', 'pre-prohibition', 'elegant'],

  description: {
    en: 'A stunning pre-Prohibition classic with a distinctive pale sky-blue color from crème de violette. The Aviation captures the wonder and romance of early flight with its ethereal appearance and delicate floral-citrus balance.',
    it: 'Un splendido classico pre-Proibizionismo con un distintivo colore celeste pallido dalla crème de violette. L\'Aviation cattura la meraviglia e il romanticismo dei primi voli con il suo aspetto etereo e il delicato equilibrio floreale-agrumato.',
    vi: 'Một tác phẩm kinh điển tiền-Cấm rượu tuyệt đẹp với màu xanh nhạt đặc trưng từ crème de violette. Aviation gợi lên sự kỳ diệu và lãng mạn của những chuyến bay đầu tiên với vẻ ngoài thanh tao và sự cân bằng hoa-cam quýt tinh tế.',
  },

  history: {
    created_year: 1916,
    origin: {
      city: 'New York City',
      bar: 'Hotel Wallick',
      country: 'USA',
    },
    creator: {
      name: 'Hugo Ensslin',
      profession: 'head bartender',
    },
    story: {
      en: 'The Aviation was created by Hugo Ensslin, head bartender at the Hotel Wallick in New York City, and published in his 1916 book "Recipes for Mixed Drinks." The cocktail was named to honor the pioneers of aviation during the exciting early days of flight. The crème de violette gives it a pale blue color reminiscent of the sky. When Harry Craddock included it in the Savoy Cocktail Book (1930), he omitted the crème de violette, and for decades the "colorless" version became standard. The original violet-tinted recipe was rediscovered in the craft cocktail renaissance of the 2000s.',
      it: 'L\'Aviation fu creato da Hugo Ensslin, capo barman all\'Hotel Wallick di New York City, e pubblicato nel suo libro del 1916 "Recipes for Mixed Drinks." Il cocktail fu nominato per onorare i pionieri dell\'aviazione durante gli emozionanti primi giorni del volo. La crème de violette gli conferisce un colore celeste pallido che ricorda il cielo. Quando Harry Craddock lo incluse nel Savoy Cocktail Book (1930), omise la crème de violette, e per decenni la versione "incolore" divenne standard. La ricetta originale con tonalità viola fu riscoperta nel rinascimento dei cocktail artigianali degli anni 2000.',
      vi: 'Aviation được tạo ra bởi Hugo Ensslin, trưởng bartender tại Hotel Wallick ở New York City, và được xuất bản trong cuốn sách năm 1916 "Recipes for Mixed Drinks." Cocktail được đặt tên để tôn vinh những người tiên phong hàng không trong những ngày đầu thú vị của ngành bay. Crème de violette tạo cho nó màu xanh nhạt gợi nhớ đến bầu trời. Khi Harry Craddock đưa nó vào Savoy Cocktail Book (1930), ông đã bỏ qua crème de violette, và trong nhiều thập kỷ phiên bản "không màu" trở thành tiêu chuẩn. Công thức gốc màu tím được tái khám phá trong thời kỳ phục hưng cocktail thủ công những năm 2000.',
    },
    named_after: {
      en: 'Named to honor early aviation pioneers. The pale blue color from crème de violette represents the sky, making it a tribute to the romance of flight.',
      it: 'Nominato per onorare i primi pionieri dell\'aviazione. Il colore celeste pallido dalla crème de violette rappresenta il cielo, rendendolo un tributo al romanticismo del volo.',
      vi: 'Được đặt tên để tôn vinh những người tiên phong hàng không đầu tiên. Màu xanh nhạt từ crème de violette đại diện cho bầu trời, biến nó thành lời tri ân cho sự lãng mạn của bay.',
    },
  },

  taste: {
    profile: ['floral', 'citrus', 'dry', 'herbal'],
    description: {
      en: 'Delicate and sophisticated. The gin provides the juniper backbone while maraschino adds subtle cherry-almond complexity. The lemon brings bright acidity and the crème de violette contributes ethereal floral notes without overwhelming.',
      it: 'Delicato e sofisticato. Il gin fornisce la struttura di ginepro mentre il maraschino aggiunge sottile complessità di ciliegia-mandorla. Il limone porta acidità brillante e la crème de violette contribuisce note floreali eteree senza sopraffare.',
      vi: 'Tinh tế và thanh lịch. Gin cung cấp xương sống bách xù trong khi maraschino thêm sự phức tạp cherry-hạnh nhân tinh tế. Chanh mang đến độ chua tươi sáng và crème de violette đóng góp hương hoa thanh tao mà không áp đảo.',
    },
    first_impression: {
      en: 'Bright lemon and subtle violet florals',
      it: 'Limone brillante e sottili note floreali di violetta',
      vi: 'Chanh tươi sáng và hương hoa violet tinh tế',
    },
    finish: {
      en: 'Clean, dry finish with lingering floral elegance',
      it: 'Finale pulito e secco con eleganza floreale persistente',
      vi: 'Kết thúc sạch, khô với sự thanh lịch hoa kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between citrus brightness, floral delicacy, and gin\'s botanical complexity',
      it: 'Perfettamente bilanciato tra luminosità agrumata, delicatezza floreale e complessità botanica del gin',
      vi: 'Cân bằng hoàn hảo giữa độ sáng cam quýt, sự tinh tế hoa và sự phức tạp thực vật của gin',
    },
  },

  recommendations: {
    best_time: ['evening'],
    occasions: ['date_night', 'celebration', 'aperitivo'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent aperitif before seafood or light fare. The floral notes complement dishes with herbs like lavender or thyme. Pairs beautifully with oysters or light canapés.',
      it: 'Eccellente aperitivo prima di pesce o piatti leggeri. Le note floreali completano piatti con erbe come lavanda o timo. Si abbina magnificamente con ostriche o canapé leggeri.',
      vi: 'Khai vị tuyệt vời trước hải sản hoặc món ăn nhẹ. Hương hoa bổ sung cho các món với thảo mộc như oải hương hoặc húng tây. Kết hợp tuyệt vời với hàu hoặc canapé nhẹ.',
    },
    ideal_for: {
      en: 'Cocktail connoisseurs who appreciate subtle flavors and historical drinks. Perfect for gin lovers seeking something elegant and unusual. A must-try for anyone interested in craft cocktail history.',
      it: 'Intenditori di cocktail che apprezzano sapori sottili e drink storici. Perfetto per amanti del gin che cercano qualcosa di elegante e insolito. Da provare per chiunque sia interessato alla storia dei cocktail artigianali.',
      vi: 'Người sành cocktail đánh giá cao hương vị tinh tế và đồ uống lịch sử. Hoàn hảo cho người yêu gin tìm kiếm điều gì đó thanh lịch và khác thường. Phải thử cho bất kỳ ai quan tâm đến lịch sử cocktail thủ công.',
    },
  },

  ingredients: [
    {
      ingredient_id: 'ING_GIN_LONDON_DRY',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_MARASCHINO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Maraschino Luxardo', it: 'Maraschino Luxardo', vi: 'Maraschino Luxardo' },
    },
    {
      ingredient_id: 'ING_LEMON_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh Lemon Juice', it: 'Succo di Limone Fresco', vi: 'Nước Chanh Tươi' },
    },
    {
      ingredient_id: 'ING_CREME_DE_VIOLETTE',
      quantity: { amount: 5, unit: 'ml' }, // 1 bar spoon ≈ 5ml
      display_name: { en: 'Crème de Violette', it: 'Crème de Violette', vi: 'Crème de Violette' },
      notes: { en: '1 bar spoon', it: '1 cucchiaio da bar', vi: '1 thìa bar' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Add all ingredients into a cocktail shaker. Shake with cracked ice until well chilled. Strain into a chilled cocktail glass. Optionally garnish with a maraschino cherry.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker. Shakerare con ghiaccio rotto fino a raffreddare bene. Filtrare in una coppa da cocktail raffreddata. Guarnire opzionalmente con una ciliegia al maraschino.',
    vi: 'Cho tất cả nguyên liệu vào bình lắc cocktail. Lắc với đá nghiền cho đến khi lạnh. Lọc vào ly cocktail đã làm lạnh. Tùy chọn trang trí với cherry maraschino.',
  },

  glass: 'Cocktail glass',

  garnish: {
    en: 'Optional maraschino cherry',
    it: 'Ciliegia al maraschino opzionale',
    vi: 'Cherry maraschino tùy chọn',
  },

  ice: 'none',
  serving_style: 'up',

  base_spirits: ['ING_GIN_LONDON_DRY'],
  flavor_profile: ['floral', 'citrus', 'dry', 'herbal'],
  abv_estimate: 24,
  calories_estimate: 165,
  difficulty: 'easy',
  prep_time_seconds: 45,

  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['date_night', 'celebration', 'aperitivo'],

  is_mocktail: false,
  is_signature: false,

  variants: ['aviation-without-violette'],

  notes_for_staff: 'The crème de violette is essential for the authentic sky-blue color - don\'t skip it. Use Luxardo maraschino, not cheap imitations. Use sparingly - too much violette makes it taste like perfume. A tiny amount goes a long way.',

  price_tier: 'mid',
  popularity: 72,

  source: {
    primary: 'https://iba-world.com/aviation/',
    note: 'IBA Official Recipe. Originally from Hugo Ensslin\'s 1916 "Recipes for Mixed Drinks."',
  },

  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
