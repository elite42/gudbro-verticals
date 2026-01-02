/**
 * IBA Contemporary Classics: Caipirinha
 */

import type { Cocktail } from '../../types/cocktail';

const NOW = new Date().toISOString();

export const caipirinha: Cocktail = {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFIERS
  // ─────────────────────────────────────────────────────────────────────────
  id: 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e',
  slug: 'caipirinha',
  stable_key: 'caipirinha_iba_contemporary_2025',

  name: {
    en: 'Caipirinha',
    it: 'Caipirinha',
    vi: 'Caipirinha',
    ko: '카이피리냐',
    ja: 'カイピリーニャ',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLASSIFICATION
  // ─────────────────────────────────────────────────────────────────────────
  status: 'iba_official',
  iba_category: 'Contemporary',
  tags: ['iba', 'official', 'brazilian', 'refreshing', 'summer', 'simple'],

  // ─────────────────────────────────────────────────────────────────────────
  // DESCRIPTION & HISTORY
  // ─────────────────────────────────────────────────────────────────────────
  description: {
    en: 'Brazil\'s national cocktail, made with cachaça, lime, and sugar. Refreshingly simple yet complex, the Caipirinha showcases cachaça\'s grassy, vegetal character. A perfect beach drink that embodies Brazilian spirit.',
    it: 'Il cocktail nazionale del Brasile, fatto con cachaça, lime e zucchero. Rinfrescante semplice ma complesso, la Caipirinha mette in mostra il carattere erbaceo e vegetale della cachaça. Una bevanda da spiaggia perfetta che incarna lo spirito brasiliano.',
    vi: 'Cocktail quốc gia của Brazil, làm với cachaça, chanh và đường. Đơn giản nhưng phức tạp một cách sảng khoái, Caipirinha thể hiện đặc tính cỏ, thực vật của cachaça. Một thức uống bãi biển hoàn hảo thể hiện tinh thần Brazil.',
  },

  history: {
    created_year: '1918',
    origin: {
      city: 'São Paulo',
      country: 'Brazil',
    },
    story: {
      en: 'The Caipirinha originated in the state of São Paulo in the early 20th century, possibly as a medicinal remedy during the Spanish flu pandemic of 1918. Originally made with garlic, honey, and lime to cure illness, it evolved into the refreshing cocktail we know today. The name comes from "caipira," meaning countryside person or hillbilly in Portuguese. It became Brazil\'s national cocktail and gained worldwide popularity in the 1990s.',
      it: 'La Caipirinha ha avuto origine nello stato di San Paolo all\'inizio del XX secolo, probabilmente come rimedio medicinale durante la pandemia di influenza spagnola del 1918. Originariamente fatto con aglio, miele e lime per curare le malattie, si è evoluto nel cocktail rinfrescante che conosciamo oggi. Il nome deriva da "caipira," che significa persona di campagna o montanaro in portoghese. È diventato il cocktail nazionale del Brasile e ha guadagnato popolarità mondiale negli anni \'90.',
      vi: 'Caipirinha có nguồn gốc từ bang São Paulo vào đầu thế kỷ 20, có thể là một phương thuốc chữa bệnh trong đại dịch cúm Tây Ban Nha năm 1918. Ban đầu được làm với tỏi, mật ong và chanh để chữa bệnh, nó đã phát triển thành cocktail sảng khoái mà chúng ta biết ngày nay. Cái tên bắt nguồn từ "caipira," có nghĩa là người nông thôn hoặc dân quê trong tiếng Bồ Đào Nha. Nó trở thành cocktail quốc gia của Brazil và nổi tiếng toàn cầu vào những năm 1990.',
    },
    named_after: {
      en: 'Named after "caipira," a Portuguese word for countryside person or rural dweller.',
      it: 'Prende il nome da "caipira," una parola portoghese per persona di campagna o abitante rurale.',
      vi: 'Được đặt theo tên "caipira," một từ tiếng Bồ Đào Nha chỉ người nông thôn hoặc cư dân vùng quê.',
    },
  },

  taste: {
    profile: ['citrus', 'sweet', 'refreshing', 'grassy'],
    description: {
      en: 'Fresh, bright, and incredibly refreshing. Muddled lime releases essential oils and juice, cachaça provides grassy, vegetal notes with slight funk, and sugar balances the acidity. Simple ingredients create complex flavor.',
      it: 'Fresco, brillante e incredibilmente rinfrescante. Il lime pestato rilascia oli essenziali e succo, la cachaça fornisce note erbacee e vegetali con un leggero funk, e lo zucchero bilancia l\'acidità. Ingredienti semplici creano sapore complesso.',
      vi: 'Tươi mát, sáng và vô cùng sảng khoái. Chanh nghiền giải phóng tinh dầu và nước cốt, cachaça cung cấp hương vị cỏ, thực vật với một chút funk, và đường cân bằng độ chua. Nguyên liệu đơn giản tạo ra hương vị phức tạp.',
    },
    first_impression: {
      en: 'Bright lime with grassy cachaça notes',
      it: 'Lime brillante con note erbacee di cachaça',
      vi: 'Chanh tươi sáng với hương cỏ của cachaça',
    },
    finish: {
      en: 'Clean, refreshing finish with lingering citrus and sugar',
      it: 'Finale pulito e rinfrescante con agrumi e zucchero persistenti',
      vi: 'Kết thúc sạch, sảng khoái với chanh và đường kéo dài',
    },
    balance: {
      en: 'Perfectly balanced between tart lime and sweet sugar',
      it: 'Perfettamente bilanciato tra lime aspro e zucchero dolce',
      vi: 'Cân bằng hoàn hảo giữa chanh chua và đường ngọt',
    },
  },

  recommendations: {
    best_time: ['afternoon', 'evening'],
    occasions: ['beach', 'party', 'casual', 'celebration'],
    seasons: ['spring', 'summer'],
    food_pairings: {
      en: 'Perfect with Brazilian churrasco, feijoada, grilled meats, seafood, ceviche, and spicy foods. Excellent with beach snacks and BBQ.',
      it: 'Perfetto con churrasco brasiliano, feijoada, carni alla griglia, frutti di mare, ceviche e cibi piccanti. Eccellente con snack da spiaggia e BBQ.',
      vi: 'Hoàn hảo với churrasco Brazil, feijoada, thịt nướng, hải sản, ceviche và đồ ăn cay. Tuyệt vời với đồ ăn nhẹ bãi biển và BBQ.',
    },
    ideal_for: {
      en: 'Perfect for anyone who loves fresh, citrus-forward cocktails. Ideal for beach days and summer parties. Great introduction to cachaça.',
      it: 'Perfetto per chi ama cocktail freschi e agrumati. Ideale per giornate in spiaggia e feste estive. Ottima introduzione alla cachaça.',
      vi: 'Hoàn hảo cho bất kỳ ai yêu thích cocktail tươi mát, hương chanh nổi bật. Lý tưởng cho những ngày đi biển và tiệc mùa hè. Giới thiệu tuyệt vời về cachaça.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RECIPE (IBA Official)
  // ─────────────────────────────────────────────────────────────────────────
  ingredients: [
    {
      ingredient_id: 'ING_CACHACA',
      quantity: { amount: 60, unit: 'ml' },
      display_name: { en: 'Cachaça', it: 'Cachaça', vi: 'Cachaça' },
    },
    {
      ingredient_id: 'ING_LIME',
      quantity: { amount: 1, unit: 'whole' },
      display_name: { en: 'Lime', it: 'Lime', vi: 'Chanh' },
      note: { en: 'cut into wedges', it: 'tagliato a spicchi', vi: 'cắt thành miếng' },
    },
    {
      ingredient_id: 'ING_SUGAR',
      quantity: { amount: 2, unit: 'tsp' },
      display_name: { en: 'White sugar', it: 'Zucchero bianco', vi: 'Đường trắng' },
    },
  ],

  method: 'muddle',

  instructions: {
    en: 'Place lime wedges and sugar in an Old Fashioned glass. Muddle gently to release lime juice and oils. Fill glass with crushed ice. Add cachaça and stir well. Serve with a straw.',
    it: 'Mettere gli spicchi di lime e lo zucchero in un bicchiere Old Fashioned. Pestare delicatamente per rilasciare succo e oli di lime. Riempire il bicchiere con ghiaccio tritato. Aggiungere la cachaça e mescolare bene. Servire con una cannuccia.',
    vi: 'Đặt miếng chanh và đường vào ly Old Fashioned. Nghiền nhẹ để giải phóng nước chanh và tinh dầu. Đổ đầy ly bằng đá nghiền. Thêm cachaça và khuấy kỹ. Phục vụ với ống hút.',
  },

  glass: 'Old Fashioned glass',

  garnish: {
    en: 'Lime wedge',
    it: 'Spicchio di lime',
    vi: 'Miếng chanh',
  },

  ice: 'crushed',

  serving_style: 'built',

  // ─────────────────────────────────────────────────────────────────────────
  // CHARACTERISTICS
  // ─────────────────────────────────────────────────────────────────────────
  base_spirits: ['ING_CACHACA'],

  flavor_profile: ['citrus', 'sweet', 'refreshing', 'grassy'],

  abv_estimate: 18,

  calories_estimate: 180,

  difficulty: 'easy',

  prep_time_seconds: 60,

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
  occasion_tags: ['beach', 'party', 'casual', 'celebration'],

  is_mocktail: false,
  is_signature: false,

  // ─────────────────────────────────────────────────────────────────────────
  // VARIANTS & NOTES
  // ─────────────────────────────────────────────────────────────────────────
  variants: ['caipiroska', 'caipifruta', 'caipirissima'],

  notes_for_staff: 'Muddle gently - don\'t pulverize the lime or it becomes bitter. Use fresh limes only. Crushed ice is traditional and essential for proper dilution. Quality cachaça makes a huge difference.',

  // ─────────────────────────────────────────────────────────────────────────
  // BUSINESS
  // ─────────────────────────────────────────────────────────────────────────
  price_tier: 'low',
  popularity: 88,

  // ─────────────────────────────────────────────────────────────────────────
  // SOURCES
  // ─────────────────────────────────────────────────────────────────────────
  source: {
    primary: 'https://iba-world.com/caipirinha/',
    note: 'IBA Official Recipe.',
  },

  // ─────────────────────────────────────────────────────────────────────────
  // METADATA
  // ─────────────────────────────────────────────────────────────────────────
  created_at: NOW,
  updated_at: NOW,
  version: 1,
};
