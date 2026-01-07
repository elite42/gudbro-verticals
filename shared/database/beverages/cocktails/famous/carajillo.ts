/**
 * Famous Cocktails: Carajillo
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const carajillo: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e',
  slug: 'carajillo',
  stable_key: 'e7f6d5c4b3a2918273645546372819202122232425',

  name: {
    en: 'Carajillo',
    it: 'Carajillo',
    vi: 'Carajillo',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['modern', 'classic', 'famous', 'coffee', 'spanish', 'digestif'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A beloved Spanish cocktail that combines espresso with Licor 43, a vanilla-citrus liqueur. Simple yet sophisticated, the Carajillo is traditionally served after meals as a digestif, offering the perfect balance of coffee bitterness and sweet, aromatic vanilla notes.',
    it: "Un amato cocktail spagnolo che combina espresso con Licor 43, un liquore alla vaniglia e agrumi. Semplice ma sofisticato, il Carajillo è tradizionalmente servito dopo i pasti come digestivo, offrendo il perfetto equilibrio tra l'amarezza del caffè e le dolci note aromatiche di vaniglia.",
    vi: 'Một cocktail Tây Ban Nha được yêu thích kết hợp espresso với Licor 43, một loại rượu mùi vani-cam quýt. Đơn giản nhưng tinh tế, Carajillo truyền thống được phục vụ sau bữa ăn như một thức uống giúp tiêu hóa, mang đến sự cân bằng hoàn hảo giữa vị đắng của cà phê và hương vani ngọt ngào, thơm lừng.',
  },

  history: {
    created_year: '1960s',
    origin: {
      city: 'Barcelona',
      country: 'Spain',
    },
    creator: {
      name: 'Unknown',
      profession: 'bartender',
    },
    story: {
      en: 'The Carajillo has roots in 19th century Cuba, where Spanish soldiers would add rum to coffee for "coraje" (courage) before battle. The name evolved to "carajillo." The modern version using Licor 43 became popular in Spain in the 1960s, particularly in Barcelona and Valencia. Licor 43, with its vanilla and citrus notes, proved to be the perfect complement to espresso, creating a drink that\'s both energizing and relaxing.',
      it: 'Il Carajillo ha radici nella Cuba del XIX secolo, dove i soldati spagnoli aggiungevano rum al caffè per avere "coraje" (coraggio) prima della battaglia. Il nome si è evoluto in "carajillo". La versione moderna con Licor 43 divenne popolare in Spagna negli anni \'60, in particolare a Barcellona e Valencia. Il Licor 43, con le sue note di vaniglia e agrumi, si è rivelato il complemento perfetto per l\'espresso, creando una bevanda che è allo stesso tempo energizzante e rilassante.',
      vi: 'Carajillo có nguồn gốc từ Cuba thế kỷ 19, nơi những người lính Tây Ban Nha thêm rum vào cà phê để có "coraje" (can đảm) trước trận chiến. Tên gọi phát triển thành "carajillo." Phiên bản hiện đại sử dụng Licor 43 trở nên phổ biến ở Tây Ban Nha vào những năm 1960, đặc biệt tại Barcelona và Valencia. Licor 43, với hương vani và cam quýt, tỏ ra là sự bổ sung hoàn hảo cho espresso, tạo ra thức uống vừa tỉnh táo vừa thư giãn.',
    },
    named_after: {
      en: 'Derived from "coraje" (courage in Spanish), referring to the drink\'s original purpose of providing courage to soldiers.',
      it: 'Deriva da "coraje" (coraggio in spagnolo), riferendosi allo scopo originale della bevanda di dare coraggio ai soldati.',
      vi: 'Bắt nguồn từ "coraje" (can đảm trong tiếng Tây Ban Nha), ám chỉ mục đích ban đầu của thức uống là mang lại can đảm cho binh lính.',
    },
  },

  taste: {
    profile: ['coffee', 'sweet', 'vanilla', 'citrus'],
    description: {
      en: "Rich espresso bitterness harmonizes beautifully with Licor 43's sweet vanilla and subtle citrus notes. The result is smooth, aromatic, and perfectly balanced between bitter and sweet. The liqueur adds a silky texture and complex botanical undertones.",
      it: "L'amarezza ricca dell'espresso si armonizza magnificamente con le dolci note di vaniglia e gli agrumi sottili del Licor 43. Il risultato è liscio, aromatico e perfettamente bilanciato tra amaro e dolce. Il liquore aggiunge una texture setosa e complessi sottotoni botanici.",
      vi: 'Vị đắng đậm đà của espresso hòa quyện tuyệt đẹp với hương vani ngọt ngào và cam quýt tinh tế của Licor 43. Kết quả là mượt mà, thơm lừng và cân bằng hoàn hảo giữa đắng và ngọt. Rượu mùi thêm kết cấu mượt như lụa và các tầng hương thực vật phức tạp.',
    },
    first_impression: {
      en: 'Sweet vanilla and espresso hit simultaneously, warm and inviting',
      it: 'Vaniglia dolce ed espresso colpiscono simultaneamente, caldo e invitante',
      vi: 'Vani ngọt và espresso xuất hiện đồng thời, ấm áp và hấp dẫn',
    },
    finish: {
      en: 'Long, warming finish with lingering coffee and vanilla notes',
      it: 'Finale lungo e caldo con note persistenti di caffè e vaniglia',
      vi: 'Kết thúc dài, ấm áp với hương cà phê và vani kéo dài',
    },
    balance: {
      en: 'Perfectly balanced - espresso bitterness prevents excessive sweetness from the liqueur',
      it: "Perfettamente bilanciato - l'amarezza dell'espresso previene l'eccessiva dolcezza del liquore",
      vi: 'Cân bằng hoàn hảo - vị đắng của espresso ngăn ngừa vị ngọt quá mức từ rượu mùi',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'late_night'],
    occasions: ['digestivo', 'after_dinner', 'coffee_break', 'casual'],
    seasons: ['autumn', 'winter', 'spring', 'summer'],
    food_pairings: {
      en: 'Excellent with churros, flan, crème brûlée, or any vanilla-based dessert. Also pairs well with dark chocolate, almond cookies, and Spanish pastries like ensaimadas.',
      it: 'Eccellente con churros, flan, crème brûlée o qualsiasi dolce a base di vaniglia. Si abbina bene anche con cioccolato fondente, biscotti alle mandorle e dolci spagnoli come le ensaimadas.',
      vi: 'Tuyệt vời với churros, flan, crème brûlée, hoặc bất kỳ món tráng miệng vani nào. Cũng kết hợp tốt với chocolate đen, bánh quy hạnh nhân và bánh ngọt Tây Ban Nha như ensaimadas.',
    },
    ideal_for: {
      en: 'Perfect for coffee lovers who enjoy after-dinner drinks. Ideal for those who want the pick-me-up of espresso with a touch of sweetness. Great for anyone exploring Spanish drinking culture.',
      it: "Perfetto per gli amanti del caffè che apprezzano i drink dopo cena. Ideale per chi vuole la carica dell'espresso con un tocco di dolcezza. Ottimo per chiunque voglia esplorare la cultura del bere spagnola.",
      vi: 'Hoàn hảo cho những người yêu cà phê thích đồ uống sau bữa tối. Lý tưởng cho những ai muốn sự tỉnh táo của espresso với một chút ngọt ngào. Tuyệt vời cho bất kỳ ai khám phá văn hóa uống rượu Tây Ban Nha.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_LICOR_43',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Licor 43', it: 'Licor 43', vi: 'Licor 43' },
    },
    {
      ingredient_id: 'ING_ESPRESSO',
      quantity: { amount: 30, unit: 'ml' },
      display_name: { en: 'Fresh espresso', it: 'Espresso fresco', vi: 'Espresso tươi' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Pour Licor 43 into a rocks glass filled with ice. Brew a fresh espresso shot and pour it over the liqueur. Stir gently to combine. Garnish with coffee beans.',
    it: 'Versare il Licor 43 in un bicchiere rocks pieno di ghiaccio. Preparare un espresso fresco e versarlo sul liquore. Mescolare delicatamente per combinare. Guarnire con chicchi di caffè.',
    vi: 'Đổ Licor 43 vào ly rocks đầy đá. Pha một shot espresso tươi và đổ lên rượu mùi. Khuấy nhẹ để kết hợp. Trang trí với hạt cà phê.',
  },

  glass: 'Rocks glass',

  garnish: {
    en: 'Coffee beans (3 beans traditional)',
    it: 'Chicchi di caffè (3 chicchi tradizionali)',
    vi: 'Hạt cà phê (truyền thống 3 hạt)',
  },

  ice: 'cubes',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_LICOR_43'],

  flavor_profile: ['coffee', 'sweet', 'vanilla', 'citrus'],

  abv_estimate: 18,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 90,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'caffeine'],
    intolerances: ['alcohol', 'caffeine_intolerance', 'sulphites_intolerance'],
    suitable_for_diets: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['autumn', 'winter', 'spring', 'summer'],
  occasion_tags: ['digestivo', 'after_dinner', 'coffee_break', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['carajillo-with-brandy', 'carajillo-with-rum', 'iced-carajillo'],

  notes_for_staff:
    'Espresso must be fresh and hot. Can be served hot or over ice. Traditional Spanish serve includes 3 coffee beans as garnish. Some regions flame the liqueur before adding espresso for theatrical presentation.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 75,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.licor43.com/en/cocktails/carajillo',
    notes: 'Traditional Spanish recipe, popularized internationally in recent years.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
