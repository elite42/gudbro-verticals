import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// All product tables in the database
const PRODUCT_TABLES = [
  { table: 'coffee', category: 'beverages', subcategory: 'coffee' },
  { table: 'tea', category: 'beverages', subcategory: 'tea' },
  { table: 'cocktails', category: 'beverages', subcategory: 'cocktails' },
  { table: 'wines', category: 'beverages', subcategory: 'wines' },
  { table: 'smoothies', category: 'beverages', subcategory: 'smoothies' },
  { table: 'pasta', category: 'dishes', subcategory: 'pasta' },
  { table: 'pizzas', category: 'dishes', subcategory: 'pizzas' },
  { table: 'salads', category: 'sides', subcategory: 'salads' },
  { table: 'burgers', category: 'dishes', subcategory: 'burgers' },
  { table: 'risotti', category: 'dishes', subcategory: 'risotti' },
  { table: 'soups', category: 'sides', subcategory: 'soups' },
  { table: 'dumplings', category: 'dishes', subcategory: 'dumplings' },
  { table: 'steaks', category: 'dishes', subcategory: 'steaks' },
  { table: 'seafood', category: 'dishes', subcategory: 'seafood' },
  { table: 'sandwiches', category: 'sides', subcategory: 'sandwiches' },
  { table: 'desserts', category: 'sides', subcategory: 'desserts' },
  { table: 'appetizers', category: 'sides', subcategory: 'appetizers' },
] as const;

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  category: string;
  subcategory: string;
  product_type: string;
  selling_price_usd: number | null;
  calories_per_serving: number | null;
  is_vegan: boolean;
  is_dairy_free: boolean;
  is_gluten_free: boolean;
  allergens: string[];
  tags: string[];
  popularity: number;
  is_signature: boolean;
  image_url: string | null;
  prep_time_seconds: number | null;
}

// GET /api/products - Fetch products from database
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // If specific subcategory requested, fetch only from that table
    if (subcategory) {
      const tableInfo = PRODUCT_TABLES.find((t) => t.subcategory === subcategory);
      if (!tableInfo) {
        return NextResponse.json(
          {
            error: `Unknown subcategory: ${subcategory}`,
            validSubcategories: PRODUCT_TABLES.map((t) => t.subcategory),
          },
          { status: 400 }
        );
      }

      const products = await fetchFromTable(
        tableInfo.table,
        tableInfo.category,
        tableInfo.subcategory,
        search,
        limit,
        offset
      );
      return NextResponse.json({
        success: true,
        products,
        total: products.length,
        category: tableInfo.category,
        subcategory: tableInfo.subcategory,
      });
    }

    // Fetch from all tables (or filtered by category)
    const tablesToQuery = category
      ? PRODUCT_TABLES.filter((t) => t.category === category)
      : PRODUCT_TABLES;

    const allProducts: Product[] = [];
    const stats: Record<string, number> = {};

    for (const tableInfo of tablesToQuery) {
      const products = await fetchFromTable(
        tableInfo.table,
        tableInfo.category,
        tableInfo.subcategory,
        search,
        // If fetching all, use a reasonable limit per table
        subcategory ? limit : Math.ceil(limit / tablesToQuery.length),
        0
      );
      allProducts.push(...products);
      stats[tableInfo.subcategory] = products.length;
    }

    // Sort by popularity
    allProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    // Apply overall limit
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      total: allProducts.length,
      stats,
      categories: [...new Set(PRODUCT_TABLES.map((t) => t.category))],
      subcategories: PRODUCT_TABLES.map((t) => ({
        name: t.subcategory,
        category: t.category,
        count: stats[t.subcategory] || 0,
      })),
    });
  } catch (error) {
    console.error('Products API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function fetchFromTable(
  tableName: string,
  category: string,
  subcategory: string,
  search: string | null,
  limit: number,
  offset: number
): Promise<Product[]> {
  try {
    let query = supabase
      .from(tableName)
      .select('*')
      .order('popularity', { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching from ${tableName}:`, error);
      return [];
    }

    // Normalize data to consistent Product format
    return (data || []).map((item: Record<string, unknown>) => ({
      id: item.id as string,
      slug: (item.slug as string) || (item.id as string),
      name: item.name as string,
      description: item.description as string | null,
      category,
      subcategory,
      product_type: tableName,
      selling_price_usd:
        parseFloat(String(item.selling_price_usd || item.base_price_usd || 0)) || null,
      calories_per_serving: (item.calories_per_serving as number) || null,
      is_vegan: Boolean(item.is_vegan),
      is_dairy_free: Boolean(item.is_dairy_free),
      is_gluten_free: Boolean(item.is_gluten_free),
      allergens: (item.allergens as string[]) || [],
      tags: (item.tags as string[]) || [],
      popularity: (item.popularity as number) || 0,
      is_signature: Boolean(item.is_signature),
      image_url: item.image_url as string | null,
      prep_time_seconds: (item.prep_time_seconds as number) || null,
    }));
  } catch (error) {
    console.error(`Error fetching from ${tableName}:`, error);
    return [];
  }
}

// GET /api/products/stats - Get counts by category
export async function HEAD() {
  try {
    const stats: Record<string, number> = {};
    let total = 0;

    for (const tableInfo of PRODUCT_TABLES) {
      const { count, error } = await supabase
        .from(tableInfo.table)
        .select('*', { count: 'exact', head: true });

      if (!error && count !== null) {
        stats[tableInfo.subcategory] = count;
        total += count;
      }
    }

    return NextResponse.json({
      success: true,
      total,
      bySubcategory: stats,
      byCategory: {
        beverages: Object.entries(stats)
          .filter(([key]) => ['coffee', 'tea', 'cocktails', 'wines', 'smoothies'].includes(key))
          .reduce((sum, [, val]) => sum + val, 0),
        dishes: Object.entries(stats)
          .filter(([key]) =>
            ['pasta', 'pizzas', 'burgers', 'risotti', 'dumplings', 'steaks', 'seafood'].includes(
              key
            )
          )
          .reduce((sum, [, val]) => sum + val, 0),
        sides: Object.entries(stats)
          .filter(([key]) =>
            ['salads', 'soups', 'sandwiches', 'desserts', 'appetizers'].includes(key)
          )
          .reduce((sum, [, val]) => sum + val, 0),
      },
    });
  } catch (error) {
    console.error('Products stats error:', error);
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}
