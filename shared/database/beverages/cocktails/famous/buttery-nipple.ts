/**
 * Famous Cocktails: Buttery Nipple
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const butteryNipple: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a',
  slug: 'buttery-nipple',
  stable_key: 'buttery_nipple_butterscotch_baileys_shot',

  name: {
    en: 'Buttery Nipple',
    it: 'Buttery Nipple',
    vi: 'Buttery Nipple',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['creamy', 'dessert', 'famous', 'shooter', 'sweet', 'layered'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A popular layered shooter combining butterscotch schnapps and Irish cream. This sweet, creamy shot has a smooth buttery flavor that makes it a favorite at bars and parties, despite its provocative name.',
    it: 'Un popolare shooter a strati che combina schnapps al butterscotch e crema irlandese. Questo shot dolce e cremoso ha un sapore burroso liscio che lo rende un favorito nei bar e alle feste, nonostante il suo nome provocatorio.',
    vi: 'Một loại shooter nhiều lớp phổ biến kết hợp schnapps butterscotch và kem Ireland. Shot ngọt, béo ngậy này có hương vị bơ mượt mà khiến nó trở thành yêu thích ở các quầy bar và bữa tiệc, mặc dù có cái tên khiêu khích.',
  },

  history: {
    created_year: '1980s',
    origin: {
      country: 'USA',
    },
    story: {
      en: 'The Buttery Nipple emerged in the 1980s during the shooter craze that swept American bars. It became one of the most popular layered shots of the era, known for its sweet, approachable flavor and eye-catching presentation. The drink\'s popularity was driven by the rise of schnapps and cream liqueurs in American drinking culture. Its suggestive name made it a frequent request at parties and bachelor/bachelorette celebrations. The shot remains popular today as a gateway drink for those new to spirits.',
      it: 'Il Buttery Nipple emerse negli anni \'80 durante la mania degli shooter che travolse i bar americani. Divenne uno degli shot a strati più popolari dell\'epoca, noto per il suo sapore dolce e accessibile e la presentazione accattivante. La popolarità della bevanda fu guidata dall\'ascesa degli schnapps e dei liquori alla crema nella cultura del bere americana. Il suo nome suggestivo lo rese una richiesta frequente a feste e celebrazioni di addio al celibato/nubilato. Lo shot rimane popolare oggi come bevanda introduttiva per chi è nuovo agli spiriti.',
      vi: 'Buttery Nipple xuất hiện vào những năm 1980 trong cơn sốt shooter quét qua các quầy bar Mỹ. Nó đã trở thành một trong những shot nhiều lớp phổ biến nhất thời đó, nổi tiếng với hương vị ngọt, dễ tiếp cận và cách trình bày bắt mắt. Sự phổ biến của thức uống được thúc đẩy bởi sự gia tăng của schnapps và rượu mùi kem trong văn hóa uống rượu Mỹ. Cái tên gợi cảm của nó khiến nó trở thành yêu cầu thường xuyên tại các bữa tiệc và lễ kỷ niệm độc thân. Shot vẫn phổ biến ngày nay như một thức uống cửa ngõ cho những người mới làm quen với rượu mạnh.',
    },
    named_after: {
      en: 'The suggestive name refers to the creamy, buttery appearance and smooth texture of the layered shot.',
      it: 'Il nome suggestivo si riferisce all\'aspetto cremoso e burroso e alla consistenza liscia dello shot a strati.',
      vi: 'Cái tên gợi cảm đề cập đến vẻ ngoài béo ngậy, bơ và kết cấu mượt mà của shot nhiều lớp.',
    },
  },

  taste: {
    profile: ['creamy', 'sweet', 'buttery', 'caramel'],
    description: {
      en: 'Extremely sweet with pronounced butterscotch and caramel flavors balanced by creamy Irish cream. The combination creates a smooth, buttery shot that goes down easily with minimal alcohol burn.',
      it: 'Estremamente dolce con pronunciati sapori di butterscotch e caramello bilanciati dalla cremosa crema irlandese. La combinazione crea uno shot liscio e burroso che scende facilmente con minima bruciatura alcolica.',
      vi: 'Cực kỳ ngọt với hương vị butterscotch và caramel rõ rệt được cân bằng bởi kem Ireland béo ngậy. Sự kết hợp tạo ra một shot mượt mà, bơ đi xuống dễ dàng với cảm giác cồn tối thiểu.',
    },
    first_impression: {
      en: 'Sweet butterscotch cream with immediate caramel notes',
      it: 'Crema dolce al butterscotch con immediate note di caramello',
      vi: 'Kem butterscotch ngọt với hương caramel ngay lập tức',
    },
    finish: {
      en: 'Smooth, sweet finish with lingering butterscotch',
      it: 'Finale liscio e dolce con butterscotch persistente',
      vi: 'Kết thúc mượt mà, ngọt với butterscotch kéo dài',
    },
    balance: {
      en: 'Very sweet and dessert-focused - designed for easy drinking rather than complexity',
      it: 'Molto dolce e focalizzato sul dessert - progettato per una facile bevuta piuttosto che per complessità',
      vi: 'Rất ngọt và tập trung vào tráng miệng - được thiết kế để uống dễ dàng hơn là phức tạp',
    },
  },

  recommendations: {
    best_time: ['evening', 'late_night'],
    occasions: ['party', 'celebration', 'casual', 'bachelor_party'],
    seasons: ['all_seasons'],
    food_pairings: {
      en: 'Typically consumed as a standalone shot between other drinks. Can accompany desserts or be served as a liquid dessert itself.',
      it: 'Tipicamente consumato come shot standalone tra altre bevande. Può accompagnare dessert o essere servito come dessert liquido stesso.',
      vi: 'Thường được tiêu thụ như một shot độc lập giữa các đồ uống khác. Có thể đi kèm với món tráng miệng hoặc được phục vụ như một món tráng miệng lỏng.',
    },
    ideal_for: {
      en: 'Perfect for those new to shots or who prefer very sweet drinks. Ideal for parties, celebrations, and social drinking occasions. Popular with guests who want an easy, non-threatening shot experience.',
      it: 'Perfetto per chi è nuovo agli shot o preferisce bevande molto dolci. Ideale per feste, celebrazioni e occasioni di bevute sociali. Popolare con gli ospiti che vogliono un\'esperienza di shot facile e non minacciosa.',
      vi: 'Hoàn hảo cho những người mới uống shot hoặc thích đồ uống rất ngọt. Lý tưởng cho các bữa tiệc, lễ kỷ niệm và dịp uống rượu xã hội. Phổ biến với khách muốn trải nghiệm shot dễ dàng, không đe dọa.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_BUTTERSCOTCH_SCHNAPPS',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Butterscotch schnapps',
        it: 'Schnapps al butterscotch',
        vi: 'Schnapps butterscotch',
      },
    },
    {
      ingredient_id: 'ING_IRISH_CREAM',
      quantity: { amount: 22.5, unit: 'ml' },
      display_name: {
        en: 'Irish cream (Baileys)',
        it: 'Crema irlandese (Baileys)',
        vi: 'Kem Ireland (Baileys)',
      },
    },
  ],

  method: 'layer',

  instructions: {
    en: 'Pour butterscotch schnapps into a shot glass. Using the back of a bar spoon, slowly layer the Irish cream on top by pouring it gently over the spoon. The two liqueurs should form distinct layers. Shoot or sip slowly to enjoy the layered effect.',
    it: 'Versare schnapps al butterscotch in un bicchierino. Usando il retro di un cucchiaio da bar, stratificare lentamente la crema irlandese sopra versandola delicatamente sul cucchiaio. I due liquori dovrebbero formare strati distinti. Bere in un colpo o sorseggiare lentamente per godere dell\'effetto a strati.',
    vi: 'Rót schnapps butterscotch vào ly shot. Sử dụng mặt sau của thìa bar, từ từ xếp lớp kem Ireland lên trên bằng cách rót nhẹ nhàng qua thìa. Hai loại rượu mùi sẽ tạo thành các lớp riêng biệt. Uống một hơi hoặc nhấp từ từ để thưởng thức hiệu ứng nhiều lớp.',
  },

  glass: 'Shot glass',

  garnish: {
    en: 'None',
    it: 'Nessuna',
    vi: 'Không',
  },

  ice: 'none',

  serving_style: 'shot',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_BUTTERSCOTCH_SCHNAPPS'],

  flavor_profile: ['creamy', 'sweet', 'buttery', 'caramel'],

  abv_estimate: 17,

  calories_estimate: 150,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['milk'],
    intolerances: ['lactose', 'alcohol'],
    suitable_for_diets: ['vegetarian', 'pescatarian', 'gluten_free', 'nut_free'],
    spice_level: 0,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // DIETARY & TAGS
  // ─────────────────────────────────────────────────────────────────────────
  diet_tags: ['vegetarian', 'gluten-free'],
  season_tags: ['all-seasons'],
  occasion_tags: ['party', 'celebration', 'casual'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['slippery-nipple', 'comfortable-screw', 'buttery-finger'],

  notes_for_staff: 'Very popular party shot. Layering technique is important for visual appeal - pour slowly. Can add vodka on bottom for "Slippery Nipple" variation. Very sweet - warn guests. Name may require discretion with certain clientele.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'budget',
  popularity: 70,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://www.liquor.com/recipes/buttery-nipple/',
    note: 'Classic 1980s layered shooter, popular at parties.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
