/**
 * Famous Cocktails: Bay Breeze
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const bayBreeze: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: '2b4f8e1c-9d3a-4e7b-a1c5-6f8d2e3a9b7c',
  slug: 'bay-breeze',
  stable_key: 'bay-breeze-tiki-tropical-famous-2025',

  name: {
    en: 'Bay Breeze',
    it: 'Bay Breeze',
    vi: 'Bay Breeze',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['tiki', 'tropical', 'famous', 'vodka', 'fruity', 'refreshing', 'easy'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A light and refreshing tropical cocktail combining vodka with cranberry and pineapple juices. The Bay Breeze is the perfect poolside sipper, offering a beautiful pink hue and balanced sweet-tart flavor that\'s dangerously easy to drink.',
    it: 'Un cocktail tropicale leggero e rinfrescante che combina vodka con succhi di mirtillo rosso e ananas. Il Bay Breeze è il perfetto sorso a bordo piscina, offrendo una bella tonalità rosa e un sapore dolce-aspro bilanciato che è pericolosamente facile da bere.',
    vi: 'Một loại cocktail nhiệt đới nhẹ nhàng và sảng khoái kết hợp vodka với nước ép nam việt quất và dứa. Bay Breeze là thức uống hoàn hảo bên hồ bơi, mang đến sắc hồng đẹp mắt và hương vị ngọt chua cân bằng cực kỳ dễ uống.',
  },

  history: {
    created_year: '1980s',
    origin: {
      city: 'Miami',
      bar: 'Beach Bars',
      country: 'USA',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Bay Breeze emerged in the 1980s as a variation of the classic Sea Breeze, swapping grapefruit juice for pineapple. Created in Miami beach bars during the height of vodka cocktail popularity, it became a staple of tropical resort menus. The drink\'s name evokes the gentle ocean breezes of coastal bays, while its easy-drinking nature made it a favorite among beachgoers and pool parties.',
      it: 'Il Bay Breeze emerse negli anni \'80 come variazione del classico Sea Breeze, sostituendo il succo di pompelmo con l\'ananas. Creato nei bar sulla spiaggia di Miami durante l\'apice della popolarità dei cocktail alla vodka, divenne un punto fermo dei menu dei resort tropicali. Il nome della bevanda evoca le dolci brezze oceaniche delle baie costiere, mentre la sua natura facile da bere la rese una favorita tra i frequentatori della spiaggia e delle feste in piscina.',
      vi: 'Bay Breeze xuất hiện vào những năm 1980 như một biến thể của Sea Breeze cổ điển, thay nước ép bưởi bằng dứa. Được tạo ra tại các quán bar bãi biển Miami trong thời kỳ đỉnh cao của sự phổ biến cocktail vodka, nó trở thành món chính trong thực đơn khu nghỉ dưỡng nhiệt đới. Tên của thức uống gợi lên những làn gió biển nhẹ nhàng của các vịnh ven biển, trong khi bản chất dễ uống của nó khiến nó trở thành món ưa thích của những người đi biển và tiệc hồ bơi.',
    },
    named_after: {
      en: 'Named after the refreshing ocean breezes that blow across coastal bays, evoking a sense of relaxation and tropical vacation.',
      it: 'Prende il nome dalle rinfrescanti brezze oceaniche che soffiano attraverso le baie costiere, evocando un senso di relax e vacanza tropicale.',
      vi: 'Được đặt theo tên những làn gió biển sảng khoái thổi qua các vịnh ven biển, gợi lên cảm giác thư giãn và kỳ nghỉ nhiệt đới.',
    },
  },

  taste: {
    profile: ['fruity', 'sweet', 'tart'],
    description: {
      en: 'Bright and refreshing with a perfect balance of tart cranberry and sweet pineapple. The vodka provides a clean, neutral base that lets the fruit juices shine. Light, crisp, and incredibly refreshing.',
      it: 'Luminoso e rinfrescante con un perfetto equilibrio di mirtillo rosso aspro e ananas dolce. La vodka fornisce una base pulita e neutra che lascia risplendere i succhi di frutta. Leggero, fresco e incredibilmente rinfrescante.',
      vi: 'Tươi sáng và sảng khoái với sự cân bằng hoàn hảo giữa nam việt quất chua và dứa ngọt. Vodka cung cấp nền trung tính, sạch để nước ép trái cây tỏa sáng. Nhẹ nhàng, tươi mát và cực kỳ sảng khoái.',
    },
    first_impression: {
      en: 'Tart cranberry hits first, followed by tropical pineapple sweetness',
      it: 'Il mirtillo rosso aspro colpisce per primo, seguito dalla dolcezza tropicale dell\'ananas',
      vi: 'Nam việt quất chua đập vào đầu tiên, tiếp theo là vị ngọt dứa nhiệt đới',
    },
    finish: {
      en: 'Clean, crisp finish with lingering fruit notes and subtle vodka warmth',
      it: 'Finale pulito e fresco con note di frutta persistenti e sottile calore di vodka',
      vi: 'Kết thúc sạch, tươi với hương trái cây kéo dài và sự ấm áp tinh tế của vodka',
    },
    balance: {
      en: 'Perfectly balanced between sweet and tart - the pineapple and cranberry complement each other beautifully',
      it: 'Perfettamente bilanciato tra dolce e aspro - l\'ananas e il mirtillo rosso si completano a vicenda magnificamente',
      vi: 'Cân bằng hoàn hảo giữa ngọt và chua - dứa và nam việt quất bổ sung cho nhau một cách tuyệt đẹp',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'pool_party', 'brunch', 'casual_gathering', 'summer_day'],
    seasons: ['summer', 'spring'],
    food_pairings: {
      en: 'Pairs beautifully with seafood appetizers, ceviche, grilled fish, tropical salads, or light summer fare. Also excellent with brunch dishes like eggs benedict or smoked salmon.',
      it: 'Si abbina magnificamente con antipasti di mare, ceviche, pesce alla griglia, insalate tropicali o piatti estivi leggeri. Eccellente anche con piatti da brunch come uova alla benedict o salmone affumicato.',
      vi: 'Kết hợp tuyệt vời với món khai vị hải sản, ceviche, cá nướng, salad nhiệt đới hoặc món ăn mùa hè nhẹ. Cũng tuyệt vời với món brunch như trứng benedict hoặc cá hồi hun khói.',
    },
    ideal_for: {
      en: 'Perfect for beach days, poolside lounging, and casual summer gatherings. Ideal for those who prefer lighter, refreshing cocktails over heavy tiki drinks. A great choice for brunch or afternoon sipping.',
      it: 'Perfetto per giornate in spiaggia, relax a bordo piscina e incontri estivi informali. Ideale per chi preferisce cocktail leggeri e rinfrescanti rispetto ai pesanti drink tiki. Un\'ottima scelta per il brunch o per sorseggiare nel pomeriggio.',
      vi: 'Hoàn hảo cho những ngày biển, thư giãn bên hồ bơi và các buổi họp mặt mùa hè thông thường. Lý tưởng cho những ai thích cocktail nhẹ nhàng, sảng khoái hơn đồ uống tiki nặng. Lựa chọn tuyệt vời cho bữa brunch hoặc nhâm nhi buổi chiều.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_VODKA',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Vodka', it: 'Vodka', vi: 'Vodka' },
    },
    {
      ingredient_id: 'ING_CRANBERRY_JUICE',
      quantity: { amount: 90, unit: 'ml' },
      display_name: { en: 'Cranberry juice', it: 'Succo di mirtillo rosso', vi: 'Nước ép nam việt quất' },
    },
    {
      ingredient_id: 'ING_PINEAPPLE_JUICE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Pineapple juice', it: 'Succo di ananas', vi: 'Nước ép dứa' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Add vodka, then cranberry juice, and top with pineapple juice. Stir gently to combine. Garnish with lime wedge and fresh pineapple.',
    it: 'Riempire un bicchiere highball con ghiaccio. Aggiungere vodka, poi succo di mirtillo rosso e completare con succo di ananas. Mescolare delicatamente per combinare. Guarnire con spicchio di lime e ananas fresco.',
    vi: 'Đổ đầy ly highball với đá. Thêm vodka, sau đó nước ép nam việt quất và hoàn thiện với nước ép dứa. Khuấy nhẹ để trộn đều. Trang trí với miếng lime và dứa tươi.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lime wedge and pineapple slice',
    it: 'Spicchio di lime e fetta di ananas',
    vi: 'Miếng lime và lát dứa',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_VODKA'],

  flavor_profile: ['fruity', 'sweet', 'tart'],

  abv_estimate: 8,

  calories_estimate: 180,

  difficulty: 'beginner',

  prep_time_seconds: 60,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free'],
  season_tags: ['summer', 'spring'],
  occasion_tags: ['beach', 'pool_party', 'brunch', 'casual_gathering'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['sea-breeze', 'madras', 'virgin-bay-breeze'],

  notes_for_staff: 'Very easy to make - just build in glass. Use quality cranberry juice (not cocktail). Can adjust juice ratios to taste. Popular brunch and poolside drink. Sister cocktails: Sea Breeze (grapefruit instead of pineapple) and Madras (orange instead of pineapple).',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/bay-breeze/',
    note: 'Classic tropical cocktail, variation of Sea Breeze.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
