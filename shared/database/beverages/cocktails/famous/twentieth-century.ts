/**
 * Famous Cocktails: Twentieth Century
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const twentiethCentury: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f8e4a9d3-5b2c-4f1d-9c6e-2b3c4d5e6f7a',
  slug: 'twentieth-century',
  stable_key: 'c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',

  name: {
    en: 'Twentieth Century',
    it: 'Ventesimo Secolo',
    vi: 'Thế Kỷ Hai Mươi',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['classic', 'vintage', 'famous', 'gin', 'elegant', 'white'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'An elegant white cocktail featuring gin, Lillet Blanc, white crème de cacao, and lemon juice. The Twentieth Century is a sophisticated blend of botanical, floral, and subtle chocolate notes with bright citrus balance.',
    it: 'Un elegante cocktail bianco con gin, Lillet Blanc, crème de cacao bianco e succo di limone. Il Ventesimo Secolo è una miscela sofisticata di note botaniche, floreali e cioccolato sottile con equilibrio agrumato brillante.',
    vi: 'Một loại cocktail trắng thanh lịch với gin, Lillet Blanc, crème de cacao trắng và nước chanh. Twentieth Century là sự pha trộn tinh tế của các nốt thực vật, hoa và chocolate tinh tế với sự cân bằng cam quýt tươi sáng.',
  },

  history: {
    created_year: '1937',
    origin: {
      city: 'London',
      bar: 'Unknown',
      country: 'UK',
    },
    creator: {
      name: 'C.A. Tuck',
      profession: 'bartender',
    },
    story: {
      en: 'Created by British bartender C.A. Tuck and published in the "Café Royal Cocktail Book" (1937). Named after the luxurious 20th Century Limited train that ran between New York and Chicago from 1902-1967. This cocktail celebrates the glamour and sophistication of early 20th-century luxury travel. The white color evokes the train\'s elegant dining cars and Art Deco aesthetic.',
      it: 'Creato dal barman britannico C.A. Tuck e pubblicato nel "Café Royal Cocktail Book" (1937). Prende il nome dal lussuoso treno 20th Century Limited che viaggiava tra New York e Chicago dal 1902 al 1967. Questo cocktail celebra il glamour e la sofisticazione dei viaggi di lusso dell\'inizio del XX secolo. Il colore bianco evoca le eleganti carrozze ristorante del treno e l\'estetica Art Déco.',
      vi: 'Được tạo ra bởi bartender Anh C.A. Tuck và xuất bản trong "Café Royal Cocktail Book" (1937). Được đặt theo tên chuyến tàu sang trọng 20th Century Limited chạy giữa New York và Chicago từ 1902-1967. Cocktail này ca ngợi sự quyến rũ và tinh tế của du lịch xa xỉ đầu thế kỷ 20. Màu trắng gợi nhớ toa ăn thanh lịch của tàu và thẩm mỹ Art Deco.',
    },
    named_after: {
      en: 'Named after the legendary 20th Century Limited luxury train that symbolized elegance, speed, and sophistication in early 20th-century America.',
      it: "Prende il nome dal leggendario treno di lusso 20th Century Limited che simboleggiava eleganza, velocità e sofisticazione nell'America dell'inizio del XX secolo.",
      vi: 'Được đặt theo tên chuyến tàu xa xỉ huyền thoại 20th Century Limited tượng trưng cho sự thanh lịch, tốc độ và tinh tế ở Mỹ đầu thế kỷ 20.',
    },
  },

  taste: {
    profile: ['elegant', 'floral', 'citrus'],
    description: {
      en: "Sophisticated and elegant with gin botanicals, Lillet's floral-wine notes, subtle white chocolate from crème de cacao, and bright lemon acidity. Delicate yet complex with a beautiful white appearance.",
      it: 'Sofisticato ed elegante con botanici del gin, note floreali-vinose del Lillet, cioccolato bianco sottile dalla crème de cacao e acidità brillante del limone. Delicato ma complesso con un bellissimo aspetto bianco.',
      vi: 'Tinh tế và thanh lịch với thực vật gin, nốt hoa-rượu của Lillet, chocolate trắng tinh tế từ crème de cacao và độ chua chanh tươi sáng. Tinh tế nhưng phức tạp với vẻ ngoài trắng đẹp mắt.',
    },
    first_impression: {
      en: 'Bright lemon and floral Lillet notes with subtle chocolate hints',
      it: 'Note brillanti di limone e Lillet floreale con accenni sottili di cioccolato',
      vi: 'Nốt chanh tươi sáng và Lillet hoa với gợi ý chocolate tinh tế',
    },
    finish: {
      en: 'Clean, elegant finish with lingering botanicals and gentle sweetness',
      it: 'Finale pulito ed elegante con botanici persistenti e dolcezza delicata',
      vi: 'Kết thúc sạch, thanh lịch với thực vật kéo dài và vị ngọt nhẹ nhàng',
    },
    balance: {
      en: 'Perfectly balanced elegance - bright yet subtle, complex yet refined',
      it: 'Eleganza perfettamente bilanciata - brillante ma sottile, complesso ma raffinato',
      vi: 'Sự thanh lịch cân bằng hoàn hảo - tươi sáng nhưng tinh tế, phức tạp nhưng tinh tế',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['brunch', 'aperitivo', 'date_night', 'celebration'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Excellent with light seafood, oysters, delicate desserts, or as an elegant aperitif. Pairs beautifully with French cuisine and white chocolate.',
      it: 'Eccellente con frutti di mare leggeri, ostriche, dessert delicati, o come aperitivo elegante. Si abbina magnificamente con la cucina francese e il cioccolato bianco.',
      vi: 'Tuyệt vời với hải sản nhẹ, hàu, món tráng miệng tinh tế hoặc làm khai vị thanh lịch. Kết hợp tuyệt đẹp với ẩm thực Pháp và chocolate trắng.',
    },
    ideal_for: {
      en: 'Perfect for gin lovers seeking elegant, white cocktails with subtle complexity. Ideal for those who appreciate delicate flavors and sophisticated presentation.',
      it: 'Perfetto per gli amanti del gin che cercano cocktail bianchi eleganti con complessità sottile. Ideale per chi apprezza sapori delicati e presentazione sofisticata.',
      vi: 'Hoàn hảo cho người yêu gin tìm kiếm các loại cocktail trắng thanh lịch với độ phức tạp tinh tế. Lý tưởng cho những ai đánh giá cao hương vị tinh tế và trình bày tinh tế.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_LILLET_BLANC',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: { en: 'Lillet Blanc', it: 'Lillet Blanc', vi: 'Lillet Blanc' },
    },
    {
      ingredient_id: 'ING_WHITE_CREME_DE_CACAO',
      quantity: { amount: 15, unit: 'ml' },
      display_name: {
        en: 'White crème de cacao',
        it: 'Crème de cacao bianco',
        vi: 'Crème de cacao trắng',
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
    en: 'Add all ingredients to a cocktail shaker filled with ice. Shake vigorously until well-chilled. Double strain into a chilled coupe or cocktail glass. Garnish with a lemon twist, expressing the oils over the drink.',
    it: 'Aggiungere tutti gli ingredienti in uno shaker pieno di ghiaccio. Shakerare vigorosamente fino a raffreddare bene. Filtrare doppiamente in una coppa raffreddata o bicchiere da cocktail. Guarnire con una scorza di limone, esprimendo gli oli sulla bevanda.',
    vi: 'Thêm tất cả nguyên liệu vào bình lắc cocktail đầy đá. Lắc mạnh cho đến khi lạnh kỹ. Lọc hai lần vào ly coupe hoặc ly cocktail đã làm lạnh. Trang trí với vỏ chanh xoắn, ép tinh dầu lên thức uống.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'Lemon twist',
    it: 'Scorza di limone',
    vi: 'Vỏ chanh xoắn',
  },

  ice: 'none',

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['elegant', 'floral', 'citrus'],

  abv_estimate: 22,

  calories_estimate: 170,

  difficulty: 'easy',

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
      'dairy_free',
      'nut_free',
    ],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['brunch', 'aperitivo', 'date_night', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['twentieth-century-moderne'],

  notes_for_staff:
    "Use WHITE crème de cacao to maintain the elegant white color. Lillet Blanc essential - do not substitute with vermouth. Double strain for perfect clarity. Fresh lemon juice only. The drink should be pristine white like the train's dining cars.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1556/twentieth-century-cocktail',
    notes:
      'Café Royal Cocktail Book (1937). Named after the legendary 20th Century Limited luxury train.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
