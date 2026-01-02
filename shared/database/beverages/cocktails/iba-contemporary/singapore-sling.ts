/**
 * IBA Contemporary Classics: Singapore Sling
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const singaporeSling: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  slug: 'singapore-sling',
  stable_key: 'singapore_sling_iba_contemporary_classic',

  name: {
    en: 'Singapore Sling',
    it: 'Singapore Sling',
    vi: 'Singapore Sling',
    ko: '싱가포르 슬링',
    ja: 'シンガポール・スリング',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'tropical', 'fruity', 'classic', 'iconic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary gin-based cocktail with a complex blend of citrus, cherry liqueur, and tropical flavors. Created at the iconic Raffles Hotel, this pink-hued classic is one of the most famous cocktails in the world.',
    it: 'Un leggendario cocktail a base di gin con una miscela complessa di agrumi, liquore di ciliegie e sapori tropicali. Creato nell\'iconico Raffles Hotel, questo classico dalle tonalità rosa è uno dei cocktail più famosi al mondo.',
    vi: 'Một cocktail huyền thoại dựa trên gin với sự pha trộn phức tạp của cam quýt, rượu mùi anh đào và hương vị nhiệt đới. Được tạo ra tại khách sạn Raffles biểu tượng, tác phẩm màu hồng cổ điển này là một trong những cocktail nổi tiếng nhất thế giới.',
  },

  history: {
    created_year: '1915',
    origin: {
      city: 'Singapore',
      bar: 'Raffles Hotel Long Bar',
      country: 'Singapore',
    },
    creator: {
      name: 'Ngiam Tong Boon',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Hainanese-Chinese bartender Ngiam Tong Boon at Raffles Hotel\'s Long Bar around 1915. Originally designed to appeal to ladies who weren\'t supposed to drink in public, the cocktail\'s fruity appearance disguised its alcoholic content. The original recipe was lost and recreated in the 1970s.',
      it: 'Creato dal barman sino-hainanese Ngiam Tong Boon al Long Bar del Raffles Hotel intorno al 1915. Originariamente progettato per attirare le signore che non dovevano bere in pubblico, l\'aspetto fruttato del cocktail nascondeva il suo contenuto alcolico. La ricetta originale è stata persa e ricreata negli anni \'70.',
      vi: 'Được tạo ra bởi bartender gốc Hải Nam-Trung Quốc Ngiam Tong Boon tại Long Bar của khách sạn Raffles khoảng năm 1915. Ban đầu được thiết kế để thu hút phụ nữ không được phép uống rượu nơi công cộng, vẻ ngoài trái cây của cocktail che giấu hàm lượng cồn. Công thức gốc đã bị mất và được tạo lại vào những năm 1970.',
    },
    named_after: {
      en: 'Named after Singapore, where it was created at the legendary Raffles Hotel.',
      it: 'Prende il nome da Singapore, dove è stato creato nel leggendario Raffles Hotel.',
      vi: 'Được đặt theo tên Singapore, nơi nó được tạo ra tại khách sạn Raffles huyền thoại.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'tropical'],
    description: {
      en: 'Complex and tropical with layers of cherry, pineapple, and citrus. The gin provides a botanical backbone while Benedictine adds herbal depth. Sweet yet refreshing with a beautiful balance.',
      it: 'Complesso e tropicale con strati di ciliegia, ananas e agrumi. Il gin fornisce una base botanica mentre il Benedictine aggiunge profondità erbacea. Dolce ma rinfrescante con un bellissimo equilibrio.',
      vi: 'Phức tạp và nhiệt đới với các lớp anh đào, dứa và cam quýt. Gin cung cấp xương sống thực vật trong khi Benedictine thêm chiều sâu thảo mộc. Ngọt nhưng sảng khoái với sự cân bằng tuyệt đẹp.',
    },
    first_impression: {
      en: 'Bright cherry and pineapple flavors with gin botanicals',
      it: 'Sapori brillanti di ciliegia e ananas con note botaniche del gin',
      vi: 'Hương vị anh đào và dứa sáng với thực vật gin',
    },
    finish: {
      en: 'Long, fruity finish with lingering herbal notes from Benedictine',
      it: 'Finale lungo e fruttato con note erbacee persistenti dal Benedictine',
      vi: 'Kết thúc dài, trái cây với hương thảo mộc kéo dài từ Benedictine',
    },
    balance: {
      en: 'Well-balanced between sweetness, citrus acidity, and botanical complexity',
      it: 'Ben bilanciato tra dolcezza, acidità degli agrumi e complessità botanica',
      vi: 'Cân bằng tốt giữa vị ngọt, độ acid cam quýt và độ phức tạp thực vật',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['celebration', 'special_occasion', 'tropical_party'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Pairs well with Asian cuisine, especially Singaporean dishes, seafood, and tropical fruits.',
      it: 'Si abbina bene con la cucina asiatica, in particolare piatti singaporiani, frutti di mare e frutti tropicali.',
      vi: 'Kết hợp tốt với ẩm thực châu Á, đặc biệt là các món Singapore, hải sản và trái cây nhiệt đới.',
    },
    ideal_for: {
      en: 'Perfect for those who enjoy complex, fruity cocktails with historical significance. A must-try for anyone visiting Singapore.',
      it: 'Perfetto per chi ama cocktail complessi e fruttati con significato storico. Un must per chiunque visiti Singapore.',
      vi: 'Hoàn hảo cho những ai thích cocktail phức tạp, trái cây có ý nghĩa lịch sử. Bắt buộc phải thử cho bất kỳ ai đến thăm Singapore.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_GIN',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Gin', it: 'Gin', vi: 'Gin' },
    },
    {
      ingredient_id: 'ING_CHERRY_LIQUEUR',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Cherry liqueur', it: 'Liquore di ciliegie', vi: 'Rượu mùi anh đào' },
    },
    {
      ingredient_id: 'ING_BENEDICTINE',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Bénédictine', it: 'Bénédictine', vi: 'Bénédictine' },
    },
    {
      ingredient_id: 'ING_COINTREAU',
      quantity: { amount: 7.5, unit: 'ml' },
      display_name: { en: 'Cointreau', it: 'Cointreau', vi: 'Cointreau' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 10, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 120, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo d\'ananas', vi: 'Nước dứa' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước cốt chanh tươi' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitter', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a cocktail shaker filled with ice cubes. Shake well. Strain into a highball glass. Garnish with a slice of pineapple and a maraschino cherry.',
    it: 'Versare tutti gli ingredienti in uno shaker pieno di cubetti di ghiaccio. Shakerare bene. Filtrare in un bicchiere highball. Guarnire con una fetta di ananas e una ciliegia maraschino.',
    vi: 'Đổ tất cả nguyên liệu vào bình lắc cocktail đầy đá viên. Lắc kỹ. Lọc vào ly highball. Trang trí bằng lát dứa và anh đào maraschino.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Pineapple slice and maraschino cherry',
    it: 'Fetta di ananas e ciliegia maraschino',
    vi: 'Lát dứa và anh đào maraschino',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_GIN'],

  flavor_profile: ['fruity', 'sweet', 'tropical'],

  abv_estimate: 12,

  calories_estimate: 240,

  difficulty: 'intermediate',

  prep_time_seconds: 180,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['celebration', 'special_occasion', 'tropical_party'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['classic-singapore-sling', 'modern-singapore-sling'],

  notes_for_staff: 'Use fresh pineapple juice if possible. The original recipe was lost and multiple versions exist. This is the IBA official version. Shake vigorously to properly integrate all ingredients.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 85,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/singapore-sling/',
    note: 'IBA Official Recipe. Historical information from Raffles Hotel archives.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
