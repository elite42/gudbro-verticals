/**
 * Famous Cocktails: Jäger Bomb
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const jagerBomb: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'f6g7h8i9-0123-4567-fg67-hi89jk012345',
  slug: 'jager-bomb',
  stable_key: 'jager_bomb_shot_famous_energy_drink_bomb',

  name: {
    en: 'Jäger Bomb',
    it: 'Jäger Bomb',
    vi: 'Jäger Bomb',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'famous',
  tags: ['shot', 'shooter', 'famous', 'bomb', 'energy-drink', 'party', 'herbal'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'A high-energy bomb shot where Jägermeister is dropped into a glass of Red Bull or energy drink. This iconic party drink combines the herbal liqueur with caffeine for an intense, energizing experience that became a nightlife phenomenon.',
    it: "Un bomb shot ad alta energia dove il Jägermeister viene lasciato cadere in un bicchiere di Red Bull o bevanda energetica. Questa iconica bevanda da festa combina il liquore erbaceo con la caffeina per un'esperienza intensa ed energizzante che è diventata un fenomeno della vita notturna.",
    vi: 'Một loại bomb shot năng lượng cao trong đó Jägermeister được thả vào ly Red Bull hoặc nước tăng lực. Thức uống tiệc mang tính biểu tượng này kết hợp rượu thảo mộc với caffeine để có trải nghiệm mãnh liệt, tràn đầy năng lượng đã trở thành hiện tượng cuộc sống về đêm.',
  },

  history: {
    created_year: '2000s',
    origin: {
      city: 'Unknown',
      bar: 'Unknown',
      country: 'USA',
    },
    story: {
      en: "The Jäger Bomb exploded in popularity in the early 2000s in American bars and nightclubs. While bomb shots existed before, the specific combination of Jägermeister and Red Bull became a cultural phenomenon, particularly in the electronic dance music scene. The drink's popularity was so significant that it influenced nightlife culture worldwide and spawned numerous variations.",
      it: 'Il Jäger Bomb è esploso in popolarità nei primi anni 2000 nei bar e nei nightclub americani. Sebbene i bomb shot esistessero prima, la specifica combinazione di Jägermeister e Red Bull è diventata un fenomeno culturale, in particolare nella scena della musica dance elettronica. La popolarità della bevanda è stata così significativa da influenzare la cultura della vita notturna in tutto il mondo e generare numerose variazioni.',
      vi: 'Jäger Bomb bùng nổ phổ biến vào đầu những năm 2000 tại các quầy bar và hộp đêm Mỹ. Mặc dù bomb shot đã tồn tại trước đó, sự kết hợp cụ thể của Jägermeister và Red Bull đã trở thành một hiện tượng văn hóa, đặc biệt là trong làng nhạc dance điện tử. Sự phổ biến của thức uống này đã ảnh hưởng đến văn hóa cuộc sống về đêm trên toàn thế giới và tạo ra nhiều biến thể.',
    },
    named_after: {
      en: 'Named after Jägermeister and the "bomb shot" style of dropping a shot glass into a larger drink.',
      it: 'Prende il nome da Jägermeister e lo stile "bomb shot" di far cadere un bicchierino in una bevanda più grande.',
      vi: 'Được đặt theo tên Jägermeister và phong cách "bomb shot" thả ly shot vào thức uống lớn hơn.',
    },
  },

  taste: {
    profile: ['herbal', 'sweet', 'energizing'],
    description: {
      en: "Complex herbal flavors from Jägermeister blend with the sweet, citrusy energy drink. The 56 herbs and spices in Jäger create a unique profile that's both medicinal and sweet, enhanced by the Red Bull's taurine and caffeine kick.",
      it: 'I sapori erbacei complessi del Jägermeister si fondono con la dolce bevanda energetica agli agrumi. Le 56 erbe e spezie nel Jäger creano un profilo unico che è sia medicinale che dolce, esaltato dal calcio di taurina e caffeina del Red Bull.',
      vi: 'Hương vị thảo mộc phức tạp từ Jägermeister hòa quyện với nước tăng lực ngọt, vị cam chanh. 56 loại thảo mộc và gia vị trong Jäger tạo ra hương vị độc đáo vừa có tính dược liệu vừa ngọt, được tăng cường bởi taurine và caffeine của Red Bull.',
    },
    first_impression: {
      en: 'Sweet energy drink followed by intense herbal Jäger notes',
      it: 'Bevanda energetica dolce seguita da intense note erbacee di Jäger',
      vi: 'Nước tăng lực ngọt theo sau là hương thảo mộc Jäger mãnh liệt',
    },
    finish: {
      en: 'Energizing finish with lingering herbal complexity and caffeine buzz',
      it: 'Finale energizzante con complessità erbacea persistente e effetto caffeina',
      vi: 'Kết thúc tràn năng lượng với sự phức tạp thảo mộc kéo dài và cảm giác caffeine',
    },
    balance: {
      en: "Energy drink sweetness balances Jägermeister's herbal intensity",
      it: "La dolcezza della bevanda energetica bilancia l'intensità erbacea del Jägermeister",
      vi: 'Vị ngọt của nước tăng lực cân bằng cường độ thảo mộc của Jägermeister',
    },
  },

  recommendations: {
    best_time: ['late_night'],
    occasions: ['party', 'nightlife', 'clubbing', 'celebration'],
    seasons: ['all_year'],
    food_pairings: {
      en: 'Not typically paired with food. Best consumed as a standalone party shot or nightclub drink.',
      it: 'In genere non abbinato al cibo. Meglio consumato come shot da festa standalone o bevanda da nightclub.',
      vi: 'Thường không kết hợp với thức ăn. Tốt nhất là tiêu thụ như một shot tiệc độc lập hoặc đồ uống hộp đêm.',
    },
    ideal_for: {
      en: 'Perfect for high-energy nightlife situations and late-night partying. Popular among clubbers and EDM fans. WARNING: Contains high amounts of caffeine and alcohol - consume responsibly.',
      it: "Perfetto per situazioni di vita notturna ad alta energia e feste fino a tardi. Popolare tra i frequentatori di club e fan dell'EDM. ATTENZIONE: Contiene elevate quantità di caffeina e alcol - consumare responsabilmente.",
      vi: 'Hoàn hảo cho các tình huống cuộc sống về đêm năng lượng cao và tiệc tùng khuya. Phổ biến trong giới clubber và fan EDM. CẢNH BÁO: Chứa lượng caffeine và rượu cao - tiêu thụ có trách nhiệm.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_JAGERMEISTER',
      quantity: { amount: 45, unit: 'ml' },
      display_name: { en: 'Jägermeister', it: 'Jägermeister', vi: 'Jägermeister' },
    },
    {
      ingredient_id: 'ING_RED_BULL',
      quantity: { amount: 120, unit: 'ml' },
      display_name: {
        en: 'Red Bull (or energy drink)',
        it: 'Red Bull (o bevanda energetica)',
        vi: 'Red Bull (hoặc nước tăng lực)',
      },
    },
  ],

  method: 'build',

  instructions: {
    en: 'Fill a pint glass halfway with Red Bull or energy drink. Pour Jägermeister into a shot glass. Drop the shot glass into the pint glass and consume immediately in one go.',
    it: "Riempire un bicchiere da pinta a metà con Red Bull o bevanda energetica. Versare il Jägermeister in un bicchierino da shot. Lasciar cadere il bicchierino nel bicchiere da pinta e consumare immediatamente tutto d'un fiato.",
    vi: 'Đổ đầy nửa ly pint với Red Bull hoặc nước tăng lực. Rót Jägermeister vào ly shot. Thả ly shot vào ly pint và uống ngay một lúc.',
  },

  glass: 'Shot glass (dropped into pint glass)',

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
  base_spirits: ['ING_JAGERMEISTER'],

  flavor_profile: ['herbal', 'sweet', 'energizing'],

  abv_estimate: 12,

  calories_estimate: 200,

  difficulty: 'easy',

  prep_time_seconds: 30,

  // ─────────────────────────────────────────────────────────────────────────
  // AUTO-COMPUTED
  // ─────────────────────────────────────────────────────────────────────────
  computed: {
    allergens: ['sulphites', 'caffeine'],
    intolerances: ['alcohol', 'sulphites_intolerance', 'caffeine_sensitivity'],
    suitable_for_diets: [
      'vegan',
      'vegetarian',
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
  diet_tags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
  season_tags: ['all_year'],
  occasion_tags: ['party', 'nightlife', 'clubbing'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['jagerbomb-original', 'skip-and-go-naked', 'starry-night'],

  notes_for_staff:
    'WARNING: High caffeine and alcohol content. Serve responsibly and be aware of mixing stimulants with depressants. Some regions have restrictions on serving these drinks. Ensure shot glass is sturdy to prevent breakage when dropped. Can substitute Red Bull with other energy drinks.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'mid',
  popularity: 95,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://en.wikipedia.org/wiki/Jägerbomb',
    notes: 'Iconic 2000s bomb shot combining Jägermeister and energy drink.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
