/**
 * IBA Contemporary Classics: Zombie
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const zombie: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b',
  slug: 'zombie',
  stable_key: 'zombie_iba_contemporary_2025',

  name: {
    en: 'Zombie',
    it: 'Zombie',
    vi: 'Zombie',
    ko: '좀비',
    ja: 'ゾンビ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'tiki', 'strong', 'complex', 'tropical'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A legendary tiki cocktail combining three types of rum with tropical fruit juices and secret spices. Deceptively potent, the Zombie is famous for its ability to "turn drinkers into zombies" due to its high alcohol content masked by fruity sweetness.',
    it: 'Un cocktail tiki leggendario che combina tre tipi di rum con succhi di frutta tropicale e spezie segrete. Ingannevolmente potente, lo Zombie è famoso per la sua capacità di "trasformare i bevitori in zombi" a causa del suo alto contenuto alcolico mascherato dalla dolcezza fruttata.',
    vi: 'Một loại cocktail tiki huyền thoại kết hợp ba loại rum với nước ép trái cây nhiệt đới và gia vị bí mật. Mạnh đánh lừa, Zombie nổi tiếng với khả năng "biến người uống thành zombie" do hàm lượng cồn cao được che giấu bởi vị ngọt trái cây.',
  },

  history: {
    created_year: '1934',
    origin: {
      city: 'Los Angeles',
      bar: 'Don the Beachcomber',
      country: 'USA',
    },
    creator: {
      name: 'Donn Beach (Ernest Raymond Beaumont Gantt)',
      profession: 'bartender',
    },
    story: {
      en: 'Created by Donn Beach (Don the Beachcomber) in 1934 at his Hollywood restaurant. Legend says he created it for a hungover customer who needed help getting through a business meeting. The customer returned days later complaining he had been "turned into a zombie" for his entire trip. Don limited customers to two Zombies due to its potency. The original recipe was kept secret for decades, with staff mixing ingredients from coded bottles.',
      it: 'Creato da Donn Beach (Don the Beachcomber) nel 1934 nel suo ristorante di Hollywood. La leggenda narra che lo creò per un cliente con i postumi della sbornia che aveva bisogno di aiuto per superare una riunione di lavoro. Il cliente tornò giorni dopo lamentandosi di essere stato "trasformato in uno zombi" per tutto il viaggio. Don limitò i clienti a due Zombi a causa della sua potenza. La ricetta originale fu tenuta segreta per decenni, con lo staff che mescolava ingredienti da bottiglie codificate.',
      vi: 'Được tạo ra bởi Donn Beach (Don the Beachcomber) vào năm 1934 tại nhà hàng Hollywood của ông. Truyền thuyết kể rằng ông đã tạo ra nó cho một khách hàng say hangover cần giúp đỡ để vượt qua một cuộc họp kinh doanh. Khách hàng quay lại nhiều ngày sau phàn nàn rằng ông đã bị "biến thành zombie" trong toàn bộ chuyến đi. Don giới hạn khách hàng hai Zombie do độ mạnh của nó. Công thức gốc được giữ bí mật trong nhiều thập kỷ, với nhân viên trộn nguyên liệu từ các chai được mã hóa.',
    },
    named_after: {
      en: 'Named for its zombifying effect on drinkers due to high alcohol content.',
      it: 'Prende il nome dal suo effetto zombificante sui bevitori a causa dell\'alto contenuto alcolico.',
      vi: 'Được đặt tên theo hiệu ứng zombie hóa trên người uống do hàm lượng cồn cao.',
    },
  },

  taste: {
    profile: ['tropical', 'sweet', 'strong', 'complex'],
    description: {
      en: 'Complex, fruity, and dangerously drinkable. Multiple rums create depth, tropical juices provide sweetness, and secret spices add complexity. The high alcohol is masterfully hidden beneath layers of flavor.',
      it: 'Complesso, fruttato e pericolosamente bevibile. Più rum creano profondità, i succhi tropicali forniscono dolcezza e le spezie segrete aggiungono complessità. L\'alto contenuto alcolico è magistralmente nascosto sotto strati di sapore.',
      vi: 'Phức tạp, trái cây và nguy hiểm dễ uống. Nhiều loại rum tạo ra chiều sâu, nước ép nhiệt đới cung cấp vị ngọt và gia vị bí mật thêm độ phức tạp. Rượu cao được che giấu khéo léo bên dưới các lớp hương vị.',
    },
    first_impression: {
      en: 'Tropical fruit sweetness with hints of spice',
      it: 'Dolcezza di frutta tropicale con accenni di spezie',
      vi: 'Vị ngọt trái cây nhiệt đới với gợi ý gia vị',
    },
    finish: {
      en: 'Long, warm finish revealing the drink\'s true strength',
      it: 'Finale lungo e caldo che rivela la vera forza del drink',
      vi: 'Kết thúc dài, ấm tiết lộ sức mạnh thực sự của thức uống',
    },
    balance: {
      en: 'Masterfully balanced to hide extreme alcohol content',
      it: 'Magistralmente bilanciato per nascondere il contenuto alcolico estremo',
      vi: 'Cân bằng khéo léo để che giấu hàm lượng cồn cực cao',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'tiki_bar'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Best with tropical foods, Caribbean cuisine, jerk chicken, coconut shrimp, or Polynesian dishes. Often enjoyed on its own at tiki bars.',
      it: 'Meglio con cibi tropicali, cucina caraibica, jerk chicken, gamberetti al cocco o piatti polinesiani. Spesso gustato da solo nei tiki bar.',
      vi: 'Tốt nhất với đồ ăn nhiệt đới, ẩm thực Caribbean, gà jerk, tôm dừa hoặc món Polynesia. Thường được thưởng thức riêng tại các quán tiki bar.',
    },
    ideal_for: {
      en: 'WARNING: Extremely strong cocktail. For experienced drinkers only. Perfect for tiki enthusiasts and special celebrations. Limit to one or two maximum.',
      it: 'ATTENZIONE: Cocktail estremamente forte. Solo per bevitori esperti. Perfetto per gli appassionati di tiki e celebrazioni speciali. Limitare a uno o due massimo.',
      vi: 'CẢNH BÁO: Cocktail cực kỳ mạnh. Chỉ dành cho người uống có kinh nghiệm. Hoàn hảo cho những người đam mê tiki và lễ kỷ niệm đặc biệt. Giới hạn tối đa một hoặc hai ly.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RUM_DARK',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Dark rum', it: 'Rum scuro', vi: 'Rum đen' },
    },
    {
      ingredient_id: 'ING_RUM_WHITE',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'White rum', it: 'Rum bianco', vi: 'Rum trắng' },
    },
    {
      ingredient_id: 'ING_RUM_OVERPROOF',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Overproof rum', it: 'Rum overproof', vi: 'Rum overproof' },
    },
    {
      ingredient_id: 'ING_LIME_JUICE',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Fresh lime juice', it: 'Succo di lime fresco', vi: 'Nước chanh tươi' },
    },
    {
      ingredient_id: 'ING_GRAPEFRUIT_JUICE',
      quantity: { amount: 40, unit: 'ml' },
      display_name: { en: 'Grapefruit juice', it: 'Succo di pompelmo', vi: 'Nước bưởi' },
    },
    {
      ingredient_id: 'ING_CINNAMON_SYRUP',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Cinnamon syrup', it: 'Sciroppo di cannella', vi: 'Siro quế' },
    },
    {
      ingredient_id: 'ING_GRENADINE',
      quantity: { amount: 15, unit: 'ml' },
      display_name: { en: 'Grenadine', it: 'Granatina', vi: 'Grenadine' },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
    {
      ingredient_id: 'ING_ANGOSTURA_BITTERS',
      quantity: { amount: 1, unit: 'dash' },
      display_name: { en: 'Angostura bitters', it: 'Angostura bitters', vi: 'Angostura bitters' },
    },
  ],

  method: 'shake',

  instructions: {
    en: 'Pour all ingredients into a blender with crushed ice. Blend at high speed for 5 seconds. Pour into a tall glass. Garnish with mint sprig and pineapple wedge.',
    it: 'Versare tutti gli ingredienti in un frullatore con ghiaccio tritato. Frullare ad alta velocità per 5 secondi. Versare in un bicchiere alto. Guarnire con rametto di menta e spicchio di ananas.',
    vi: 'Đổ tất cả nguyên liệu vào máy xay với đá nghiền. Xay ở tốc độ cao trong 5 giây. Đổ vào ly cao. Trang trí với cành bạc hà và miếng dứa.',
  },

  glass: 'Tiki mug or Collins glass',

  garnish: {
    en: 'Mint sprig and pineapple wedge',
    it: 'Rametto di menta e spicchio di ananas',
    vi: 'Cành bạc hà và miếng dứa',
  },

  ice: 'crushed',

  serving_style: 'blended',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RUM_DARK', 'ING_RUM_WHITE', 'ING_RUM_OVERPROOF'],

  flavor_profile: ['tropical', 'sweet', 'strong', 'complex'],

  abv_estimate: 25,

  calories_estimate: 320,

  difficulty: 'hard',

  prep_time_seconds: 120,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'wormwood'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegan', 'vegetarian', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['spring', 'summer'],
  occasion_tags: ['party', 'celebration', 'tiki_bar'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['1934-zombie', 'modern-zombie'],

  notes_for_staff: 'CRITICAL: Extremely high alcohol content. Limit customers to 2 maximum. Original Don the Beachcomber rule. Use quality rums for best results. The exact "Don\'s Mix" recipe varies - this is the modern IBA standard.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'high',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/zombie/',
    note: 'IBA Official Recipe. Original recipe by Donn Beach.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
