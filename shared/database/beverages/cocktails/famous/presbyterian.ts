/**
 * Famous Cocktails: Presbyterian
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const presbyterian: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-4567-8901-d456-890123456789',
  slug: 'presbyterian',
  stable_key: 'b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6',

  name: {
    en: 'Presbyterian',
    it: 'Presbyterian',
    vi: 'Presbyterian',
    ko: '프레즈비테리언',
    ja: 'プレスビテリアン',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['highball', 'long-drink', 'famous', 'whiskey', 'bourbon', 'refreshing', 'classic'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: "A classic American highball combining whiskey with ginger ale and club soda. The Presbyterian is a light, refreshing drink that softens the whiskey's edge with effervescence, making it perfect for casual sipping.",
    it: "Un classico highball americano che combina whiskey con ginger ale e acqua di seltz. Il Presbyterian è un drink leggero e rinfrescante che ammorbidisce il carattere del whiskey con l'effervescenza, rendendolo perfetto per un sorso casuale.",
    vi: 'Một highball cổ điển của Mỹ kết hợp whiskey với ginger ale và soda. Presbyterian là thức uống nhẹ nhàng, tươi mát làm dịu vị nồng của whiskey bằng khí CO2, làm cho nó hoàn hảo cho việc nhâm nhi thư giãn.',
  },

  history: {
    created_year: '1895',
    origin: {
      city: 'United States',
      country: 'USA',
    },
    story: {
      en: "The Presbyterian dates back to the late 19th century and is one of America's oldest highball cocktails. The name's origin is debated - some believe it references the Presbyterian church's temperance movement (the drink being relatively light on alcohol), while others suggest it was simply a popular drink among Presbyterian communities. The combination of ginger ale and club soda creates a unique effervescence that sets it apart from simpler whiskey highballs. It gained popularity in country clubs and became a staple \"golf course drink\" in the mid-20th century.",
      it: 'Il Presbyterian risale alla fine del XIX secolo ed è uno dei più antichi cocktail highball americani. L\'origine del nome è dibattuta - alcuni credono che si riferisca al movimento temperante della chiesa presbiteriana (il drink essendo relativamente leggero in alcol), mentre altri suggeriscono che fosse semplicemente una bevanda popolare tra le comunità presbiteriane. La combinazione di ginger ale e acqua di seltz crea un\'effervescenza unica che lo distingue dai semplici highball di whiskey. Guadagnò popolarità nei country club e divenne un "drink da campo da golf" di base a metà del XX secolo.',
      vi: 'Presbyterian có từ cuối thế kỷ 19 và là một trong những cocktail highball lâu đời nhất của Mỹ. Nguồn gốc của tên gọi còn được tranh luận - một số tin rằng nó ám chỉ phong trào tiết chế của giáo hội Presbyterian (thức uống có ít cồn tương đối), trong khi những người khác cho rằng nó đơn giản là thức uống phổ biến trong cộng đồng Presbyterian. Sự kết hợp của ginger ale và soda tạo ra khí CO2 độc đáo phân biệt nó với các whiskey highball đơn giản hơn. Nó trở nên phổ biến ở các câu lạc bộ đồng quê và trở thành "thức uống sân golf" chính vào giữa thế kỷ 20.',
    },
    named_after: {
      en: 'Likely named after the Presbyterian church community, though the exact origin remains uncertain.',
      it: "Probabilmente prende il nome dalla comunità della chiesa presbiteriana, anche se l'origine esatta rimane incerta.",
      vi: 'Có thể được đặt theo tên cộng đồng giáo hội Presbyterian, mặc dù nguồn gốc chính xác vẫn không chắc chắn.',
    },
  },

  taste: {
    profile: ['refreshing', 'spicy', 'ginger', 'whiskey'],
    description: {
      en: "Light and refreshing with whiskey warmth balanced by ginger spice and carbonation. The dual soda combination creates a unique texture that's more effervescent than a standard highball, while the ginger ale adds subtle sweetness and spice.",
      it: 'Leggero e rinfrescante con il calore del whiskey bilanciato dalla spezia di zenzero e dalla carbonazione. La doppia combinazione di soda crea una texture unica più effervescente di un highball standard, mentre il ginger ale aggiunge dolcezza e spezia sottili.',
      vi: 'Nhẹ nhàng và tươi mát với hơi ấm whiskey được cân bằng bởi vị cay gừng và khí CO2. Sự kết hợp soda kép tạo ra kết cấu độc đáo có nhiều bọt hơn highball tiêu chuẩn, trong khi ginger ale thêm vị ngọt và cay tinh tế.',
    },
    first_impression: {
      en: 'Effervescent and spicy with ginger and whiskey warmth',
      it: 'Effervescente e piccante con calore di zenzero e whiskey',
      vi: 'Sủi bọt và cay với hơi ấm gừng và whiskey',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering ginger spice',
      it: 'Finale pulito e rinfrescante con spezia di zenzero persistente',
      vi: 'Kết thúc trong sạch, tươi mát với vị cay gừng kéo dài',
    },
    balance: {
      en: 'Well-balanced between whiskey character and refreshing carbonation - neither too strong nor too diluted',
      it: 'Ben bilanciato tra il carattere del whiskey e la carbonazione rinfrescante - né troppo forte né troppo diluito',
      vi: 'Cân bằng tốt giữa đặc tính whiskey và khí CO2 tươi mát - không quá mạnh cũng không quá loãng',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening', 'daytime'],
    occasions: ['casual', 'golf', 'outdoor', 'social'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Pairs well with grilled meats, barbecue, burgers, and pub fare. Excellent with smoked foods and charcuterie. Traditional golf course accompaniment.',
      it: 'Si abbina bene con carni alla griglia, barbecue, hamburger e piatti da pub. Eccellente con cibi affumicati e salumi. Accompagnamento tradizionale del campo da golf.',
      vi: 'Kết hợp tốt với thịt nướng, barbecue, burger và đồ ăn pub. Tuyệt vời với thức ăn hun khói và charcuterie. Đồng hành truyền thống trên sân golf.',
    },
    ideal_for: {
      en: 'Perfect for whiskey lovers who want a lighter, more refreshing drink. Great for hot days, golf outings, or casual social gatherings. Ideal for those who find straight whiskey too strong but enjoy its flavor.',
      it: 'Perfetto per gli amanti del whiskey che vogliono un drink più leggero e rinfrescante. Ottimo per giornate calde, uscite di golf o incontri sociali informali. Ideale per chi trova il whiskey liscio troppo forte ma ne apprezza il sapore.',
      vi: 'Hoàn hảo cho người yêu whiskey muốn thức uống nhẹ hơn, tươi mát hơn. Tuyệt vời cho những ngày nóng, chơi golf hoặc các buổi họp mặt xã hội thân mật. Lý tưởng cho những ai thấy whiskey nguyên chất quá mạnh nhưng thích hương vị của nó.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BOURBON',
      quantity: { amount: 60, unit: 'ml' },
      display_name: {
        en: 'Bourbon or rye whiskey',
        it: 'Bourbon o whiskey di segale',
        vi: 'Bourbon hoặc rye whiskey',
      },
    },
    {
      ingredient_id: 'ING_GINGER_ALE',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Ginger ale', it: 'Ginger ale', vi: 'Ginger ale' },
    },
    {
      ingredient_id: 'ING_CLUB_SODA',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Club soda', it: 'Acqua di seltz', vi: 'Soda' },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a highball glass with ice. Pour whiskey over ice. Add equal parts ginger ale and club soda. Stir gently to combine. Garnish with a lemon twist or lime wedge.',
    it: 'Riempire un bicchiere highball con ghiaccio. Versare il whiskey sul ghiaccio. Aggiungere parti uguali di ginger ale e acqua di seltz. Mescolare delicatamente per combinare. Guarnire con una scorza di limone o uno spicchio di lime.',
    vi: 'Đổ đầy ly highball với đá. Rót whiskey lên đá. Thêm phần bằng nhau ginger ale và soda. Khuấy nhẹ nhàng để trộn đều. Trang trí với vỏ chanh xoắn hoặc lát chanh.',
  },

  glass: 'Highball glass',

  garnish: {
    en: 'Lemon twist or lime wedge',
    it: 'Scorza di limone o spicchio di lime',
    vi: 'Vỏ chanh xoắn hoặc lát chanh',
  },

  ice: 'cubed',

  serving_style: 'on_the_rocks',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BOURBON'],

  flavor_profile: ['refreshing', 'spicy', 'ginger', 'whiskey'],

  abv_estimate: 10,

  calories_estimate: 145,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites'],
    intolerances: ['alcohol', 'sulphites_intolerance'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
      'pescatarian',
      'gluten_free',
      'dairy_free',
      'nut_free',
    ],
    spice_level: 1,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegan', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['casual', 'golf', 'outdoor'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['whiskey-ginger', 'mamie-taylor'],

  notes_for_staff:
    'Equal parts ginger ale and club soda is traditional, but ratio can be adjusted to taste. Works with bourbon, rye, or blended whiskey. Sometimes called "Press" in some regions.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 65,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.diffordsguide.com/cocktails/recipe/1243/presbyterian',
    notes: 'Classic American highball from late 19th century.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
