import type { Beer } from '../../types/beer';
import { v4 as uuidv4 } from 'uuid';

export const lagunitasIpa: Beer = {
  id: uuidv4(),
  slug: 'lagunitas-ipa',
  stable_key: 'lagunitas-ipa-craft-ipa',
  name: {
    en: 'Lagunitas IPA',
    it: 'Lagunitas IPA',
    vi: 'Lagunitas IPA',
  },

  status: 'craft_classic',
  style_category: 'ale',
  style: 'ipa',
  tags: ['craft', 'california', 'west-coast', 'hoppy', 'bold'],

  origin: {
    country: 'United States',
    country_code: 'US',
    city: 'Petaluma, California',
    brewery: {
      en: 'Lagunitas Brewing Company',
      it: 'Birrificio Lagunitas',
      vi: 'Công ty Bia Lagunitas',
    },
    brewery_founded: 1993,
    brewery_type: 'craft',
  },

  history: {
    first_brewed: '1995',
    story: {
      en: 'Lagunitas IPA was created by founder Tony Magee in the mid-90s during the West Coast IPA explosion. Known for its irreverent labels and bold hop character, Lagunitas became one of the fastest-growing craft breweries in America. This IPA embodies the California craft beer spirit with its aggressive hopping and unapologetic flavor.',
      it: 'Lagunitas IPA è stata creata dal fondatore Tony Magee a metà degli anni \'90 durante l\'esplosione delle IPA della West Coast. Conosciuto per le sue etichette irriverenti e il carattere audace del luppolo, Lagunitas è diventato uno dei birrifici artigianali in più rapida crescita in America. Questa IPA incarna lo spirito della birra artigianale californiana con il suo luppolo aggressivo e il sapore senza scuse.',
      vi: 'Lagunitas IPA được tạo ra bởi người sáng lập Tony Magee vào giữa những năm 90 trong thời kỳ bùng nổ IPA Bờ Tây. Nổi tiếng với nhãn mác bất kính và đặc trưng hoa bia táo bạo, Lagunitas trở thành một trong những nhà máy bia thủ công phát triển nhanh nhất ở Mỹ. IPA này thể hiện tinh thần bia thủ công California với việc sử dụng hoa bia mạnh mẽ và hương vị không xin lỗi.',
    },
    awards: ['World Beer Cup Medal', 'Great American Beer Festival Medal'],
    named_after: {
      en: 'Named after Lagunitas Creek in Marin County, California',
      it: 'Prende il nome dal torrente Lagunitas nella contea di Marin, California',
      vi: 'Được đặt theo tên con lạch Lagunitas ở Quận Marin, California',
    },
  },

  description: {
    en: 'A well-rounded West Coast IPA with a huge hop profile featuring citrus, pine, and tropical fruit notes. Full-bodied with a strong malt backbone to balance the assertive bitterness.',
    it: 'Una IPA della West Coast ben bilanciata con un enorme profilo di luppolo caratterizzato da note di agrumi, pino e frutta tropicale. Di corpo pieno con una forte base di malto per bilanciare l\'amarezza assertiva.',
    vi: 'Một IPA Bờ Tây cân bằng với hồ sơ hoa bia khổng lồ có hương cam quýt, thông và trái cây nhiệt đới. Độ đậm cao với nền mạch nha mạnh mẽ để cân bằng vị đắng quyết đoán.',
  },

  tagline: {
    en: 'Speak of the Devil',
    it: 'Parla del Diavolo',
    vi: 'Nói về Ác Quỷ',
  },

  characteristics: {
    abv: 6.2,
    ibu: 51,
    srm: 9,
    color: 'golden',
    clarity: 'clear',
    carbonation: 'medium',
    body: 'medium_full',
    fermentation: 'top_fermented',
  },

  taste: {
    profile: ['hoppy', 'citrus', 'piney', 'tropical', 'bitter'],
    description: {
      en: 'Explosive hop aroma with grapefruit, pine, and mango. Rich caramel malt sweetness supports the bold hop bitterness. Complex and layered with a dry, clean finish.',
      it: 'Aroma esplosivo di luppolo con pompelmo, pino e mango. La dolcezza del malto caramello ricco sostiene l\'amarezza audace del luppolo. Complesso e stratificato con un finale secco e pulito.',
      vi: 'Hương hoa bia bùng nổ với bưởi, thông và xoài. Vị ngọt mạch nha caramel phong phú hỗ trợ vị đắng hoa bia táo bạo. Phức tạp và nhiều lớp với kết thúc khô, sạch.',
    },
    aroma: {
      en: 'Intense citrus and pine hops with mango, peach, and caramel malt',
      it: 'Luppolo intenso di agrumi e pino con mango, pesca e malto caramello',
      vi: 'Hoa bia cam quýt và thông mãnh liệt với xoài, đào và mạch nha caramel',
    },
    finish: {
      en: 'Long, dry finish with assertive hop bitterness',
      it: 'Finale lungo e secco con amarezza di luppolo assertiva',
      vi: 'Kết thúc dài, khô với vị đắng hoa bia quyết đoán',
    },
    bitterness_level: 5,
    sweetness_level: 3,
  },

  ingredients: {
    malts: ['Two-row pale malt', 'Caramel malt', 'Munich malt'],
    hops: ['Cascade', 'Centennial', 'Chinook', 'Simcoe'],
    yeast: 'Ale yeast',
  },

  serving: {
    glass: 'pint',
    temperature: 'cool',
    temperature_celsius: { min: 7, max: 10 },
    pouring_notes: {
      en: 'Pour aggressively to release hop aromatics, creating a thick white head',
      it: 'Versare vigorosamente per rilasciare gli aromi del luppolo, creando una densa schiuma bianca',
      vi: 'Rót mạnh để giải phóng hương thơm hoa bia, tạo lớp bọt trắng dày',
    },
  },

  pairing: {
    food_categories: ['spicy-foods', 'burgers', 'indian-cuisine'],
    food_pairings: {
      en: 'Excellent with spicy Thai or Indian curries, loaded burgers, buffalo wings, and sharp cheddar. The high IBU cuts through heat and fat.',
      it: 'Eccellente con curry piccanti tailandesi o indiani, hamburger farciti, ali di pollo buffalo e cheddar piccante. L\'alto IBU taglia attraverso il calore e il grasso.',
      vi: 'Tuyệt vời với cà ri Thái hoặc Ấn Độ cay, burger đầy đủ, cánh gà buffalo và phô mai cheddar sắc. IBU cao cắt qua nhiệt và chất béo.',
    },
    cheese_pairings: ['Sharp Cheddar', 'Aged Gouda', 'Blue cheese'],
    cuisine_pairings: ['Indian', 'Thai', 'American BBQ'],
  },

  season_tags: ['all_year'],
  occasion_tags: ['casual', 'party', 'dinner', 'celebration'],
  is_gluten_free: false,
  is_non_alcoholic: false,
  is_vegan: true,

  available_formats: ['bottle', 'can', 'draft'],
  available_sizes: [355, 473],
  availability: 'year_round',

  price_tier: 'mid',
  popularity: 88,

  source: {
    primary: 'https://lagunitas.com',
    note: 'Official Lagunitas website and brewing information',
  },

  version: 1,
};
