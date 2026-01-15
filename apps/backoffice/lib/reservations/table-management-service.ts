// Table Management Service
// Manages location sections and tables for the reservation system
// Sprint 1 of RESERVATIONS-SYSTEM

import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES - Location Sections
// =============================================================================

export type SectionType =
  | 'indoor'
  | 'outdoor'
  | 'semi_outdoor'
  | 'private'
  | 'bar'
  | 'terrace'
  | 'garden';

export type SectionAmenity =
  | 'smoking_allowed'
  | 'pets_allowed'
  | 'wheelchair_accessible'
  | 'scenic_view'
  | 'air_conditioned'
  | 'heated';

export interface FloorPlanConfig {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
}

export interface LocationSection {
  id: string;
  location_id: string;
  name: string;
  name_translations: Record<string, string>;
  code: string;
  description?: string;
  max_capacity: number;
  default_covers_per_table: number;
  section_type: SectionType;
  amenities: SectionAmenity[];
  weather_dependent: boolean;
  is_reservable: boolean;
  is_active: boolean;
  display_order: number;
  floor_plan_config: FloorPlanConfig;
  color_hex: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSectionInput {
  location_id: string;
  name: string;
  name_translations?: Record<string, string>;
  code: string;
  description?: string;
  max_capacity?: number;
  default_covers_per_table?: number;
  section_type?: SectionType;
  amenities?: SectionAmenity[];
  weather_dependent?: boolean;
  is_reservable?: boolean;
  display_order?: number;
  color_hex?: string;
}

export interface UpdateSectionInput {
  name?: string;
  name_translations?: Record<string, string>;
  description?: string;
  section_type?: SectionType;
  amenities?: SectionAmenity[];
  weather_dependent?: boolean;
  is_reservable?: boolean;
  is_active?: boolean;
  display_order?: number;
  floor_plan_config?: FloorPlanConfig;
  color_hex?: string;
}

// =============================================================================
// TYPES - Location Tables
// =============================================================================

export type TableShape =
  | 'rectangular'
  | 'round'
  | 'square'
  | 'oval'
  | 'booth'
  | 'bar_stool'
  | 'long';

export type TableSize = 'small' | 'standard' | 'large' | 'xl';

export type TableFeature =
  | 'window'
  | 'corner'
  | 'romantic'
  | 'high_chair'
  | 'wheelchair_accessible'
  | 'power_outlet'
  | 'quiet';

export interface LocationTable {
  id: string;
  location_id: string;
  section_id?: string;
  table_number: string;
  display_name?: string;
  min_capacity: number;
  max_capacity: number;
  optimal_capacity: number;
  table_shape: TableShape;
  table_size: TableSize;
  is_combinable: boolean;
  combine_with: string[]; // array of table_ids
  features: TableFeature[];
  priority: number; // 0-100
  is_reservable: boolean;
  is_active: boolean;
  floor_plan_config: FloorPlanConfig;
  notes?: string;
  created_at: string;
  updated_at: string;
  // Joined fields
  section?: LocationSection;
}

export interface CreateTableInput {
  location_id: string;
  section_id?: string;
  table_number: string;
  display_name?: string;
  min_capacity?: number;
  max_capacity?: number;
  optimal_capacity?: number;
  table_shape?: TableShape;
  table_size?: TableSize;
  is_combinable?: boolean;
  combine_with?: string[];
  features?: TableFeature[];
  priority?: number;
  is_reservable?: boolean;
  notes?: string;
}

export interface UpdateTableInput {
  section_id?: string;
  display_name?: string;
  min_capacity?: number;
  max_capacity?: number;
  optimal_capacity?: number;
  table_shape?: TableShape;
  table_size?: TableSize;
  is_combinable?: boolean;
  combine_with?: string[];
  features?: TableFeature[];
  priority?: number;
  is_reservable?: boolean;
  is_active?: boolean;
  floor_plan_config?: FloorPlanConfig;
  notes?: string;
}

// =============================================================================
// TYPES - Query & Results
// =============================================================================

export interface TableForPartySize {
  table_id: string;
  table_number: string;
  display_name?: string;
  section_id?: string;
  section_name?: string;
  min_capacity: number;
  max_capacity: number;
  priority: number;
}

export interface LocationCapacity {
  location_id: string;
  total_tables: number;
  total_capacity: number;
  sections: {
    id: string;
    name: string;
    table_count: number;
    capacity: number;
  }[];
}

// =============================================================================
// SECTION FUNCTIONS
// =============================================================================

/**
 * Get all sections for a location
 */
export async function getSections(
  locationId: string,
  options?: { activeOnly?: boolean; reservableOnly?: boolean }
): Promise<LocationSection[]> {
  let query = supabase
    .from('location_sections')
    .select('*')
    .eq('location_id', locationId)
    .order('display_order', { ascending: true });

  if (options?.activeOnly) {
    query = query.eq('is_active', true);
  }
  if (options?.reservableOnly) {
    query = query.eq('is_reservable', true);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching sections:', error);
    throw new Error(`Failed to fetch sections: ${error.message}`);
  }

  return data || [];
}

/**
 * Get a single section by ID
 */
export async function getSection(sectionId: string): Promise<LocationSection | null> {
  const { data, error } = await supabase
    .from('location_sections')
    .select('*')
    .eq('id', sectionId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching section:', error);
    throw new Error(`Failed to fetch section: ${error.message}`);
  }

  return data;
}

/**
 * Create a new section
 */
export async function createSection(input: CreateSectionInput): Promise<LocationSection> {
  const { data, error } = await supabase
    .from('location_sections')
    .insert({
      location_id: input.location_id,
      name: input.name,
      name_translations: input.name_translations || {},
      code: input.code,
      description: input.description,
      max_capacity: input.max_capacity || 0,
      default_covers_per_table: input.default_covers_per_table || 4,
      section_type: input.section_type || 'indoor',
      amenities: input.amenities || [],
      weather_dependent: input.weather_dependent || false,
      is_reservable: input.is_reservable ?? true,
      display_order: input.display_order || 0,
      color_hex: input.color_hex || '#3B82F6',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating section:', error);
    throw new Error(`Failed to create section: ${error.message}`);
  }

  return data;
}

/**
 * Update a section
 */
export async function updateSection(
  sectionId: string,
  input: UpdateSectionInput
): Promise<LocationSection> {
  const { data, error } = await supabase
    .from('location_sections')
    .update(input)
    .eq('id', sectionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating section:', error);
    throw new Error(`Failed to update section: ${error.message}`);
  }

  return data;
}

/**
 * Delete a section (soft delete by setting is_active = false)
 */
export async function deleteSection(sectionId: string, hardDelete = false): Promise<void> {
  if (hardDelete) {
    const { error } = await supabase.from('location_sections').delete().eq('id', sectionId);

    if (error) {
      console.error('Error deleting section:', error);
      throw new Error(`Failed to delete section: ${error.message}`);
    }
  } else {
    await updateSection(sectionId, { is_active: false });
  }
}

// =============================================================================
// TABLE FUNCTIONS
// =============================================================================

/**
 * Get all tables for a location
 */
export async function getTables(
  locationId: string,
  options?: {
    sectionId?: string;
    activeOnly?: boolean;
    reservableOnly?: boolean;
    includeSection?: boolean;
  }
): Promise<LocationTable[]> {
  const selectQuery = options?.includeSection ? '*, section:location_sections(*)' : '*';

  let query = supabase.from('location_tables').select(selectQuery);

  query = query.eq('location_id', locationId);

  if (options?.sectionId) {
    query = query.eq('section_id', options.sectionId);
  }
  if (options?.activeOnly) {
    query = query.eq('is_active', true);
  }
  if (options?.reservableOnly) {
    query = query.eq('is_reservable', true);
  }

  query = query.order('table_number', { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching tables:', error);
    throw new Error(`Failed to fetch tables: ${error.message}`);
  }

  return (data as unknown as LocationTable[]) || [];
}

/**
 * Get a single table by ID
 */
export async function getTable(tableId: string): Promise<LocationTable | null> {
  const { data, error } = await supabase
    .from('location_tables')
    .select('*, section:location_sections(*)')
    .eq('id', tableId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    console.error('Error fetching table:', error);
    throw new Error(`Failed to fetch table: ${error.message}`);
  }

  return data;
}

/**
 * Create a new table
 */
export async function createTable(input: CreateTableInput): Promise<LocationTable> {
  const { data, error } = await supabase
    .from('location_tables')
    .insert({
      location_id: input.location_id,
      section_id: input.section_id,
      table_number: input.table_number,
      display_name: input.display_name,
      min_capacity: input.min_capacity || 1,
      max_capacity: input.max_capacity || 4,
      optimal_capacity: input.optimal_capacity || 2,
      table_shape: input.table_shape || 'rectangular',
      table_size: input.table_size || 'standard',
      is_combinable: input.is_combinable ?? true,
      combine_with: input.combine_with || [],
      features: input.features || [],
      priority: input.priority || 50,
      is_reservable: input.is_reservable ?? true,
      notes: input.notes,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating table:', error);
    throw new Error(`Failed to create table: ${error.message}`);
  }

  return data;
}

/**
 * Update a table
 */
export async function updateTable(
  tableId: string,
  input: UpdateTableInput
): Promise<LocationTable> {
  const { data, error } = await supabase
    .from('location_tables')
    .update(input)
    .eq('id', tableId)
    .select()
    .single();

  if (error) {
    console.error('Error updating table:', error);
    throw new Error(`Failed to update table: ${error.message}`);
  }

  return data;
}

/**
 * Delete a table (soft delete by setting is_active = false)
 */
export async function deleteTable(tableId: string, hardDelete = false): Promise<void> {
  if (hardDelete) {
    const { error } = await supabase.from('location_tables').delete().eq('id', tableId);

    if (error) {
      console.error('Error deleting table:', error);
      throw new Error(`Failed to delete table: ${error.message}`);
    }
  } else {
    await updateTable(tableId, { is_active: false });
  }
}

/**
 * Bulk create tables
 */
export async function createTablesBulk(inputs: CreateTableInput[]): Promise<LocationTable[]> {
  const rows = inputs.map((input) => ({
    location_id: input.location_id,
    section_id: input.section_id,
    table_number: input.table_number,
    display_name: input.display_name,
    min_capacity: input.min_capacity || 1,
    max_capacity: input.max_capacity || 4,
    optimal_capacity: input.optimal_capacity || 2,
    table_shape: input.table_shape || 'rectangular',
    table_size: input.table_size || 'standard',
    is_combinable: input.is_combinable ?? true,
    combine_with: input.combine_with || [],
    features: input.features || [],
    priority: input.priority || 50,
    is_reservable: input.is_reservable ?? true,
    notes: input.notes,
  }));

  const { data, error } = await supabase.from('location_tables').insert(rows).select();

  if (error) {
    console.error('Error creating tables:', error);
    throw new Error(`Failed to create tables: ${error.message}`);
  }

  return data || [];
}

// =============================================================================
// CAPACITY & AVAILABILITY FUNCTIONS
// =============================================================================

/**
 * Get tables suitable for a party size
 * Uses the database function get_tables_for_party_size
 */
export async function getTablesForPartySize(
  locationId: string,
  partySize: number,
  sectionId?: string
): Promise<TableForPartySize[]> {
  const { data, error } = await supabase.rpc('get_tables_for_party_size', {
    p_location_id: locationId,
    p_party_size: partySize,
    p_section_id: sectionId || null,
  });

  if (error) {
    console.error('Error fetching tables for party size:', error);
    throw new Error(`Failed to fetch tables for party size: ${error.message}`);
  }

  return data || [];
}

/**
 * Get total capacity for a location
 * Uses the database function get_location_total_capacity
 */
export async function getLocationTotalCapacity(locationId: string): Promise<number> {
  const { data, error } = await supabase.rpc('get_location_total_capacity', {
    p_location_id: locationId,
  });

  if (error) {
    console.error('Error fetching location capacity:', error);
    throw new Error(`Failed to fetch location capacity: ${error.message}`);
  }

  return data || 0;
}

/**
 * Get detailed capacity breakdown for a location
 */
export async function getLocationCapacityBreakdown(locationId: string): Promise<LocationCapacity> {
  // Get sections with their tables
  const { data: sections, error: sectionsError } = await supabase
    .from('location_sections')
    .select('id, name, max_capacity')
    .eq('location_id', locationId)
    .eq('is_active', true);

  if (sectionsError) {
    console.error('Error fetching sections for capacity:', sectionsError);
    throw new Error(`Failed to fetch sections: ${sectionsError.message}`);
  }

  // Get tables grouped by section
  const { data: tables, error: tablesError } = await supabase
    .from('location_tables')
    .select('section_id, max_capacity')
    .eq('location_id', locationId)
    .eq('is_active', true)
    .eq('is_reservable', true);

  if (tablesError) {
    console.error('Error fetching tables for capacity:', tablesError);
    throw new Error(`Failed to fetch tables: ${tablesError.message}`);
  }

  // Calculate totals
  const sectionMap = new Map<
    string,
    { id: string; name: string; table_count: number; capacity: number }
  >();

  sections?.forEach((s) => {
    sectionMap.set(s.id, {
      id: s.id,
      name: s.name,
      table_count: 0,
      capacity: 0,
    });
  });

  let totalTables = 0;
  let totalCapacity = 0;

  tables?.forEach((t) => {
    totalTables++;
    totalCapacity += t.max_capacity;

    if (t.section_id && sectionMap.has(t.section_id)) {
      const section = sectionMap.get(t.section_id)!;
      section.table_count++;
      section.capacity += t.max_capacity;
    }
  });

  return {
    location_id: locationId,
    total_tables: totalTables,
    total_capacity: totalCapacity,
    sections: Array.from(sectionMap.values()),
  };
}

// =============================================================================
// FLOOR PLAN FUNCTIONS
// =============================================================================

/**
 * Update floor plan position for a section
 */
export async function updateSectionFloorPlan(
  sectionId: string,
  config: FloorPlanConfig
): Promise<void> {
  await updateSection(sectionId, { floor_plan_config: config });
}

/**
 * Update floor plan position for a table
 */
export async function updateTableFloorPlan(
  tableId: string,
  config: FloorPlanConfig
): Promise<void> {
  await updateTable(tableId, { floor_plan_config: config });
}

/**
 * Get all floor plan data for a location (sections + tables with positions)
 */
export async function getFloorPlanData(locationId: string): Promise<{
  sections: LocationSection[];
  tables: LocationTable[];
}> {
  const [sections, tables] = await Promise.all([
    getSections(locationId, { activeOnly: true }),
    getTables(locationId, { activeOnly: true }),
  ]);

  return { sections, tables };
}
