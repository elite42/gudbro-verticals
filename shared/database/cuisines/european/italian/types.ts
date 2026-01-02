// ============================================
// ITALIAN Database Types
// GUDBRO Database Standards v1.7
// Focus: Secondi, Antipasti, Zuppe, Contorni, Dolci
// (Pasta, Pizza, Risotti in tabelle dedicate)
// ============================================

export type ItalianCategory =
  | 'antipasto_freddo'    // Cold appetizers (Carpaccio, Vitello Tonnato, Caprese)
  | 'antipasto_caldo'     // Hot appetizers (Arancini, Supplì, Carciofi fritti)
  | 'secondo_carne'       // Meat main courses (Ossobuco, Saltimbocca, Bistecca)
  | 'secondo_pesce'       // Seafood main courses (Fritto misto, Baccalà, Branzino)
  | 'zuppa'               // Soups and broths (Ribollita, Minestrone, Stracciatella)
  | 'contorno'            // Side dishes (Verdure, Patate, Legumi)
  | 'dolce'               // Desserts (Tiramisù, Cannoli, Panna Cotta)
  | 'formaggio'           // Cheese plates (Tagliere formaggi DOP)
  | 'salume';             // Cured meat plates (Tagliere salumi)

export type ItalianRegion =
  | 'piemonte'
  | 'valle_aosta'
  | 'lombardia'
  | 'trentino_alto_adige'
  | 'veneto'
  | 'friuli_venezia_giulia'
  | 'liguria'
  | 'emilia_romagna'
  | 'toscana'
  | 'umbria'
  | 'marche'
  | 'lazio'
  | 'abruzzo'
  | 'molise'
  | 'campania'
  | 'puglia'
  | 'basilicata'
  | 'calabria'
  | 'sicilia'
  | 'sardegna'
  | 'pan_italian';        // Dishes common across Italy

export type ItalianStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'signature'
  | 'traditional'
  | 'regional'
  | 'premium'
  | 'seasonal';

export type ProteinType =
  | 'beef'
  | 'veal'
  | 'pork'
  | 'lamb'
  | 'rabbit'
  | 'poultry'
  | 'game'
  | 'fish'
  | 'seafood'
  | 'offal'
  | 'vegetarian'
  | 'vegan';

export type CookingMethod =
  | 'grilled'         // Alla griglia
  | 'roasted'         // Arrosto
  | 'braised'         // Brasato
  | 'stewed'          // Stufato/In umido
  | 'fried'           // Fritto
  | 'baked'           // Al forno
  | 'boiled'          // Bollito/Lesso
  | 'sauteed'         // Saltato/Ripassato
  | 'raw'             // Crudo
  | 'steamed'         // Al vapore
  | 'pan_fried'       // In padella
  | 'deep_fried';     // Fritto in immersione

export interface ItalianItem {
  id: string;                           // ITA_{REGION}_{NAME}
  slug: string;
  name: string;
  local_name?: string;                  // Nome dialettale/regionale
  description: string;
  category: ItalianCategory;
  region: ItalianRegion;
  status: ItalianStatus;

  // Origin (standard JSONB)
  origin: {
    region_type: 'country';
    country: 'Italy';
    country_code: 'IT';
    continent: 'Europe';
    continent_code: 'EU';
    region?: string;                    // Regione italiana
    city?: string;                      // Città di origine
    year_created?: string;              // Anno creazione
    certification?: string;             // DOP, IGP, STG
  };

  // Cooking
  protein_type?: ProteinType;
  cooking_method?: CookingMethod;
  spice_level: number;                  // 0-5 (cucina italiana generalmente 0-2)

  // Serving
  serving_size_g?: number;
  prep_time_min?: number;

  // Sistema 5 Dimensioni - Dietary
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_gluten_free: boolean;
  is_dairy_free: boolean;
  is_nut_free: boolean;
  is_halal: boolean;
  is_kosher: boolean;
  allergens: string[];

  // Ingredients
  ingredient_ids: string[];

  // Metadata
  tags: string[];
  popularity: number;                   // 0-100

  // Multi-tenant (v1.6)
  is_public: boolean;
  owner_id?: string;

  // Image (v1.7)
  image_url?: string;

  // Timestamps (handled by DB)
  created_at?: string;
  updated_at?: string;
}

// Helper per generare ID
export const generateItalianId = (region: ItalianRegion, name: string): string => {
  const regionPrefix: Record<ItalianRegion, string> = {
    piemonte: 'PIE',
    valle_aosta: 'VDA',
    lombardia: 'LOM',
    trentino_alto_adige: 'TAA',
    veneto: 'VEN',
    friuli_venezia_giulia: 'FVG',
    liguria: 'LIG',
    emilia_romagna: 'EMR',
    toscana: 'TOS',
    umbria: 'UMB',
    marche: 'MAR',
    lazio: 'LAZ',
    abruzzo: 'ABR',
    molise: 'MOL',
    campania: 'CAM',
    puglia: 'PUG',
    basilicata: 'BAS',
    calabria: 'CAL',
    sicilia: 'SIC',
    sardegna: 'SAR',
    pan_italian: 'ITA'
  };

  const cleanName = name
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

  return `ITA_${regionPrefix[region]}_${cleanName}`;
};

// Helper per mapping regione a origin
export const getRegionOrigin = (region: ItalianRegion): ItalianItem['origin'] => {
  const regionNames: Record<ItalianRegion, string> = {
    piemonte: 'Piedmont',
    valle_aosta: 'Aosta Valley',
    lombardia: 'Lombardy',
    trentino_alto_adige: 'Trentino-Alto Adige',
    veneto: 'Veneto',
    friuli_venezia_giulia: 'Friuli Venezia Giulia',
    liguria: 'Liguria',
    emilia_romagna: 'Emilia-Romagna',
    toscana: 'Tuscany',
    umbria: 'Umbria',
    marche: 'Marche',
    lazio: 'Lazio',
    abruzzo: 'Abruzzo',
    molise: 'Molise',
    campania: 'Campania',
    puglia: 'Apulia',
    basilicata: 'Basilicata',
    calabria: 'Calabria',
    sicilia: 'Sicily',
    sardegna: 'Sardinia',
    pan_italian: 'Italy'
  };

  return {
    region_type: 'country',
    country: 'Italy',
    country_code: 'IT',
    continent: 'Europe',
    continent_code: 'EU',
    region: regionNames[region]
  };
};
