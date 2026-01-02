// ============================================
// SPIRITS Types - GUDBRO Database Standards v1.1
// ============================================
// Database progettato per crescere nel tempo.
// Categorie iniziali: whisky, gin, rum, amari_liqueurs
// Future: vodka, tequila_mezcal, brandy_cognac, other
// ============================================

/**
 * Categorie principali degli spirits
 * Espandibile nel tempo aggiungendo nuove categorie
 */
export type SpiritCategory =
  | 'whisky'           // Scotch, Bourbon, Irish, Japanese, Rye, Canadian
  | 'gin'              // London Dry, Old Tom, Navy, Contemporary, Genever
  | 'rum'              // White, Gold, Dark, Spiced, Agricole, Cachaça
  | 'vodka'            // Neutral, Flavored, Potato, Grape
  | 'tequila_mezcal'   // Blanco, Reposado, Añejo, Mezcal varieties
  | 'brandy_cognac'    // Cognac, Armagnac, Calvados, Grappa, Pisco
  | 'amari_liqueurs'   // Italian amari, herbal, cream, fruit liqueurs
  | 'other';           // Absinthe, Soju, Baijiu, Aquavit, etc.

/**
 * Sottocategorie per classificazione più granulare
 */
export type SpiritSubcategory =
  // Whisky
  | 'scotch_single_malt'
  | 'scotch_blended'
  | 'bourbon'
  | 'tennessee'
  | 'rye'
  | 'irish'
  | 'japanese'
  | 'canadian'
  | 'world_whisky'
  // Gin
  | 'london_dry'
  | 'old_tom'
  | 'navy_strength'
  | 'contemporary'
  | 'genever'
  | 'sloe_gin'
  // Rum
  | 'white_rum'
  | 'gold_rum'
  | 'dark_rum'
  | 'spiced_rum'
  | 'agricole'
  | 'cachaca'
  | 'overproof'
  // Vodka
  | 'neutral_vodka'
  | 'flavored_vodka'
  | 'potato_vodka'
  | 'grape_vodka'
  // Tequila & Mezcal
  | 'tequila_blanco'
  | 'tequila_reposado'
  | 'tequila_anejo'
  | 'tequila_extra_anejo'
  | 'mezcal_joven'
  | 'mezcal_reposado'
  | 'mezcal_anejo'
  // Brandy & Cognac
  | 'cognac_vs'
  | 'cognac_vsop'
  | 'cognac_xo'
  | 'armagnac'
  | 'calvados'
  | 'grappa'
  | 'pisco'
  | 'brandy_generic'
  // Amari & Liqueurs
  | 'amaro_bitter'
  | 'amaro_alpine'
  | 'amaro_citrus'
  | 'amaro_fernet'
  | 'liqueur_herbal'
  | 'liqueur_cream'
  | 'liqueur_fruit'
  | 'liqueur_nut'
  | 'liqueur_coffee'
  | 'liqueur_anise'
  // Other (Asian Spirits)
  | 'absinthe'
  | 'aquavit'
  | 'sake'           // Japanese rice wine
  | 'soju'           // Korean distilled spirit
  | 'shochu'         // Japanese distilled spirit
  | 'baijiu'         // Chinese white spirit
  | 'other_spirit';

/**
 * Status del prodotto
 */
export type SpiritStatus =
  | 'active'
  | 'classic'
  | 'popular'
  | 'premium'
  | 'ultra_premium'
  | 'limited_edition'
  | 'vintage'
  | 'craft';

/**
 * Regioni di produzione principali
 */
export type SpiritRegion =
  // Whisky regions
  | 'scotland_speyside'
  | 'scotland_highland'
  | 'scotland_islay'
  | 'scotland_lowland'
  | 'scotland_campbeltown'
  | 'ireland'
  | 'usa_kentucky'
  | 'usa_tennessee'
  | 'japan'
  | 'canada'
  | 'taiwan'
  | 'india'
  // Gin regions
  | 'england'
  | 'spain'
  | 'germany'
  | 'netherlands'
  // Rum regions
  | 'caribbean'
  | 'jamaica'
  | 'cuba'
  | 'puerto_rico'
  | 'barbados'
  | 'martinique'
  | 'guyana'
  | 'brazil'
  // Tequila regions
  | 'mexico_jalisco'
  | 'mexico_oaxaca'
  // Brandy regions
  | 'france_cognac'
  | 'france_armagnac'
  | 'france_normandy'
  | 'italy_veneto'
  | 'italy_piedmont'
  | 'peru'
  | 'chile'
  // Other
  | 'italy'
  | 'france'
  | 'russia'
  | 'poland'
  | 'sweden'
  | 'korea'
  | 'china'
  | 'international';

/**
 * Profilo aromatico principale
 */
export type FlavorProfile =
  | 'smoky'
  | 'peaty'
  | 'fruity'
  | 'floral'
  | 'spicy'
  | 'sweet'
  | 'herbal'
  | 'bitter'
  | 'citrus'
  | 'vanilla'
  | 'caramel'
  | 'honey'
  | 'nutty'
  | 'woody'
  | 'maritime'
  | 'medicinal'
  | 'creamy'
  | 'clean'
  | 'complex';

/**
 * Interfaccia principale per gli spirits
 */
export interface SpiritItem {
  // IDENTIFICATION
  id: string;                       // SPI_{NAME} - es. SPI_LAGAVULIN_16
  slug: string;                     // lowercase-hyphens

  // BASE INFO (English only)
  name: string;                     // Nome commerciale
  brand: string;                    // Marca/Distilleria
  description: string;              // Descrizione dettagliata

  // CLASSIFICATION
  category: SpiritCategory;
  subcategory: SpiritSubcategory;
  status: SpiritStatus;

  // ORIGIN
  country: string;                  // Paese di origine
  region: SpiritRegion;             // Regione specifica
  distillery?: string;              // Nome distilleria (se applicabile)

  // PRODUCT DETAILS
  abv: number;                      // Alcohol by volume (es. 40, 43, 46)
  age_years?: number;               // Invecchiamento in anni (se applicabile)
  age_statement?: string;           // Es. "No Age Statement", "12 Years", "XO"
  volume_ml: number;                // Volume standard (700, 750, 1000)

  // PRODUCTION
  base_ingredient: string;          // Es. "malted barley", "agave", "sugarcane"
  production_method?: string;       // Es. "pot still", "column still", "solera"
  cask_type?: string;               // Es. "ex-bourbon", "sherry", "virgin oak"

  // TASTING NOTES
  flavor_profiles: FlavorProfile[]; // Profili aromatici principali
  tasting_notes?: string;           // Note di degustazione
  color?: string;                   // Es. "golden", "amber", "deep mahogany"
  nose?: string;                    // Descrizione olfattiva
  palate?: string;                  // Descrizione gustativa
  finish?: string;                  // Descrizione finale

  // SERVING
  serving_suggestions: string[];    // Es. ["neat", "on the rocks", "cocktails"]
  cocktail_uses?: string[];         // Cocktail classici dove viene usato
  food_pairings?: string[];         // Abbinamenti cibo
  optimal_temperature?: string;     // Es. "room temperature", "chilled"

  // DIETARY & SAFETY
  allergens: string[];              // Tipicamente vuoto per spirits puri
  is_gluten_free: boolean;          // Most distilled spirits are GF
  is_vegan: boolean;                // Some use animal products in filtering
  is_organic: boolean;
  is_kosher: boolean;

  // PRICE TIER
  price_tier: 'budget' | 'standard' | 'premium' | 'ultra_premium' | 'luxury';

  // METADATA
  tags: string[];
  popularity: number;               // 0-100
  awards?: string[];                // Premi e riconoscimenti
  year_established?: number;        // Anno fondazione distilleria/marca

  // INGREDIENTS (for liqueurs mainly)
  ingredient_ids: string[];         // ING_* references - importante per liquori
}

/**
 * Statistiche database spirits
 */
export interface SpiritsStats {
  total: number;
  byCategory: Record<SpiritCategory, number>;
  byRegion: Record<string, number>;
  byPriceTier: Record<string, number>;
}
