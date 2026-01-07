/**
 * IBA Unforgettables: Remember the Maine
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const rememberTheMaine: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
  slug: 'remember-the-maine',
  stable_key: 'f8e7d6c5b4a3928170695847362514039281fade',

  name: {
    en: 'Remember the Maine',
    it: 'Remember the Maine',
    vi: 'Remember the Maine',
    ko: '리멤버 더 메인',
    ja: 'リメンバー・ザ・メイン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Unforgettables',
  tags: ['iba', 'official', 'classic', 'stirred', 'strong', 'complex'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A richly complex, Prohibition-era classic that blends the bold character of rye whiskey with the herbal depth of sweet vermouth, a touch of cherry liqueur, and a whisper of absinthe. Named after the rallying cry that sparked the Spanish-American War.',
    it: "Un classico complesso dell'era del Proibizionismo che unisce il carattere audace del rye whiskey con la profondità erbacea del vermouth dolce, un tocco di liquore di ciliegie e un sussurro di assenzio. Prende il nome dal grido di battaglia che scatenò la guerra ispano-americana.",
    vi: 'Một tác phẩm kinh điển phức tạp từ thời Cấm rượu, pha trộn tính cách táo bạo của rye whiskey với độ sâu thảo mộc của vermouth ngọt, một chút rượu cherry và một chút absinthe. Được đặt tên theo khẩu hiệu kêu gọi đã châm ngòi cho Chiến tranh Tây Ban Nha-Mỹ.',
  },

  history: {
    created_year: '1933',
    origin: {
      city: 'Havana',
      bar: 'Unknown',
      country: 'Cuba',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'Charles H. Baker Jr., in his book "The Gentleman\'s Companion" (1939), states that he encountered this cocktail in Havana, Cuba during the Cuban Revolution of 1933. The cocktail is named after the press slogan "Remember the Maine, to Hell with Spain!" which blamed Spain for the unexplained sinking of the U.S.S. Maine off Cuba in 1898, helping provoke the Spanish-American War.',
      it: 'Charles H. Baker Jr., nel suo libro "The Gentleman\'s Companion" (1939), afferma di aver incontrato questo cocktail all\'Avana, Cuba, durante la Rivoluzione cubana del 1933. Il cocktail prende il nome dallo slogan della stampa "Remember the Maine, to Hell with Spain!" che incolpava la Spagna per l\'affondamento inspiegabile della nave U.S.S. Maine al largo di Cuba nel 1898, contribuendo a provocare la guerra ispano-americana.',
      vi: 'Charles H. Baker Jr., trong cuốn sách "The Gentleman\'s Companion" (1939), tuyên bố rằng ông đã gặp cocktail này ở Havana, Cuba trong Cách mạng Cuba năm 1933. Cocktail được đặt tên theo khẩu hiệu báo chí "Remember the Maine, to Hell with Spain!" đổ lỗi cho Tây Ban Nha về vụ chìm không rõ nguyên nhân của tàu U.S.S. Maine ngoài khơi Cuba năm 1898, giúp kích động Chiến tranh Tây Ban Nha-Mỹ.',
    },
    named_after: {
      en: 'Named after the U.S.S. Maine battleship and the rallying cry "Remember the Maine, to Hell with Spain!" which became a slogan during the Spanish-American War.',
      it: 'Prende il nome dalla nave da guerra U.S.S. Maine e dal grido di battaglia "Remember the Maine, to Hell with Spain!" che divenne uno slogan durante la guerra ispano-americana.',
      vi: 'Được đặt tên theo chiến hạm U.S.S. Maine và khẩu hiệu "Remember the Maine, to Hell with Spain!" đã trở thành khẩu hiệu trong Chiến tranh Tây Ban Nha-Mỹ.',
    },
  },

  taste: {
    profile: ['complex', 'herbal', 'boozy'],
    description: {
      en: 'Complex and sophisticated with spicy rye whiskey at the forefront, balanced by sweet vermouth and enhanced with cherry notes from the liqueur. The absinthe rinse adds an elegant herbal whisper without overpowering the drink.',
      it: 'Complesso e sofisticato con rye whiskey speziato in primo piano, bilanciato dal vermouth dolce e arricchito con note di ciliegia dal liquore. Il risciacquo di assenzio aggiunge un elegante sussurro erbaceo senza sopraffare la bevanda.',
      vi: 'Phức tạp và tinh tế với rye whiskey cay nồng ở mặt trước, cân bằng bởi vermouth ngọt và được tăng cường với hương vị cherry từ liqueur. Lớp absinthe rửa ly thêm một âm hưởng thảo mộc thanh lịch mà không át đi thức uống.',
    },
    first_impression: {
      en: 'Anise and herbal notes from absinthe, followed by bold rye spice',
      it: "Note di anice ed erbe dall'assenzio, seguite da spezie audaci di segale",
      vi: 'Hương hồi và thảo mộc từ absinthe, tiếp theo là gia vị rye táo bạo',
    },
    finish: {
      en: 'Long, warming finish with lingering cherry sweetness and herbal complexity',
      it: 'Finale lungo e caldo con dolcezza persistente di ciliegia e complessità erbacea',
      vi: 'Kết thúc dài, ấm áp với vị ngọt cherry kéo dài và độ phức tạp thảo mộc',
    },
    balance: {
      en: 'Beautifully balanced between strong spirit and aromatic modifiers',
      it: 'Perfettamente bilanciato tra spirito forte e modificatori aromatici',
      vi: 'Cân bằng tuyệt đẹp giữa rượu mạnh và các chất thơm',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['aperitivo', 'date_night', 'contemplative', 'nightcap'],
    seasons: ['autumn', 'winter', 'spring'],
    food_pairings: {
      en: 'Excellent with charcuterie, aged cheeses, dark chocolate, or smoked meats. Also pairs well with rich desserts like chocolate cake or bread pudding.',
      it: 'Eccellente con salumi, formaggi stagionati, cioccolato fondente o carni affumicate. Si abbina bene anche con dessert ricchi come torta al cioccolato o budino di pane.',
      vi: 'Tuyệt vời với thịt nguội, phô mai già, chocolate đen hoặc thịt hun khói. Cũng kết hợp tốt với các món tráng miệng đậm đà như bánh chocolate hoặc bánh pudding.',
    },
    ideal_for: {
      en: 'Perfect for whiskey enthusiasts who appreciate complex, spirit-forward cocktails with historical significance. Ideal for those who enjoy Manhattan variations and bold, aromatic drinks.',
      it: 'Perfetto per gli appassionati di whiskey che apprezzano cocktail complessi e ricchi di spirito con significato storico. Ideale per chi ama le variazioni di Manhattan e bevande audaci e aromatiche.',
      vi: 'Hoàn hảo cho những người đam mê whiskey đánh giá cao các cocktail phức tạp, đậm rượu với ý nghĩa lịch sử. Lý tưởng cho những ai thích biến thể Manhattan và đồ uống táo bạo, thơm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_RYE_WHISKEY',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Rye whiskey', it: 'Rye whiskey', vi: 'Rye whiskey' },
    },
    {
      ingredient_id: 'ING_SWEET_VERMOUTH',
      quantity: { amount: 20, unit: 'ml' },
      display_name: { en: 'Sweet vermouth', it: 'Vermouth dolce', vi: 'Vermouth ngọt' },
    },
    {
      ingredient_id: 'ING_CHERRY_HEERING',
      quantity: { amount: 10, unit: 'ml' },
      display_name: {
        en: 'Cherry Heering',
        it: 'Cherry Heering',
        vi: 'Cherry Heering',
      },
    },
    {
      ingredient_id: 'ING_ABSINTHE',
      quantity: { amount: 2, unit: 'barspoon' },
      display_name: { en: 'Absinthe', it: 'Assenzio', vi: 'Absinthe' },
    },
  ],

  method: 'stir',

  instructions: {
    en: 'Pour the absinthe into a coupe glass and swirl to completely coat the inside. Discard the absinthe and set the glass aside. Add the other ingredients to a mixing glass and fill it 3/4 full with ice. Stir until chilled, then strain into the glass rinsed with the absinthe.',
    it: "Versare l'assenzio in una coppa e ruotare per ricoprire completamente l'interno. Scartare l'assenzio e mettere da parte il bicchiere. Aggiungere gli altri ingredienti in un mixing glass e riempirlo per 3/4 con ghiaccio. Mescolare fino a raffreddare, quindi filtrare nel bicchiere sciacquato con l'assenzio.",
    vi: 'Đổ absinthe vào ly coupe và xoay để phủ hoàn toàn bên trong. Loại bỏ absinthe và để ly sang một bên. Thêm các nguyên liệu khác vào ly trộn và đổ đầy 3/4 với đá. Khuấy cho đến khi lạnh, sau đó lọc vào ly đã rửa bằng absinthe.',
  },

  glass: 'Coupe glass',

  garnish: {
    en: 'None (or lemon twist optional)',
    it: 'Nessuna (o scorza di limone opzionale)',
    vi: 'Không (hoặc vỏ chanh tùy chọn)',
  },

  ice: 'none', // Served "up" - no ice in glass

  serving_style: 'up',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_RYE_WHISKEY'],

  flavor_profile: ['complex', 'herbal', 'boozy'],

  abv_estimate: 30, // ~30% ABV after dilution

  calories_estimate: 180,

  difficulty: 'intermediate',

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
  season_tags: ['autumn', 'winter', 'spring'],
  occasion_tags: ['aperitivo', 'date_night', 'contemplative', 'nightcap'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['manhattan', 'brooklyn', 'vieux-carre'],

  notes_for_staff:
    "The absinthe rinse is essential - don't skip it. Use Cherry Heering for authenticity. Can substitute bourbon for rye if needed, but rye's spice is traditional. Ensure proper stirring to achieve ideal dilution.",

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 55,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/iba-cocktail/remember-the-maine/',
    notes:
      'IBA Official Recipe. Historical information from Charles H. Baker Jr. "The Gentleman\'s Companion" (1939).',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
