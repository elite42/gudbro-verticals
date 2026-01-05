// AI Inventory & Supplier Negotiation Service
// Phase 12: Inventory tracking + AI-assisted supplier negotiation
// Track stock, predict needs, find suppliers, draft negotiations

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface InventoryItem {
  id: string;
  merchantId: string;
  name: string;
  category: string;
  unit: string; // kg, liters, pieces, etc.
  currentStock: number;
  minStock: number; // Reorder point
  maxStock: number; // Maximum capacity
  avgDailyUsage: number;
  daysUntilEmpty?: number;
  lastUpdated: string;
  supplierId?: string;
  unitCost?: number;
}

export interface StockAlert {
  id: string;
  merchantId: string;
  itemId: string;
  itemName: string;
  alertType: 'low_stock' | 'out_of_stock' | 'expiring' | 'overstock';
  currentLevel: number;
  threshold: number;
  suggestedAction: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  resolvedAt?: string;
}

export interface Supplier {
  id: string;
  merchantId: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  address?: string;
  categories: string[]; // What they supply
  rating?: number; // 1-5
  notes?: string;
  isActive: boolean;
  createdAt: string;
}

export interface PurchaseOrder {
  id: string;
  merchantId: string;
  supplierId: string;
  supplierName: string;
  status: 'draft' | 'sent' | 'confirmed' | 'delivered' | 'cancelled';
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  expectedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NegotiationDraft {
  id: string;
  merchantId: string;
  supplierId: string;
  supplierName: string;
  type: 'price_reduction' | 'bulk_discount' | 'payment_terms' | 'new_supplier';
  subject: string;
  emailDraft: string;
  talkingPoints: string[];
  targetSavings?: number;
  createdAt: string;
}

// Analyze inventory and generate alerts
export async function analyzeInventory(
  merchantId: string
): Promise<{ items: InventoryItem[]; alerts: StockAlert[] }> {
  // Get inventory items
  const { data: inventoryData } = await supabase
    .from('ai_inventory_items')
    .select('*')
    .eq('merchant_id', merchantId);

  const items: InventoryItem[] = (inventoryData || []).map((i) => ({
    id: i.id,
    merchantId: i.merchant_id,
    name: i.name,
    category: i.category,
    unit: i.unit,
    currentStock: i.current_stock,
    minStock: i.min_stock,
    maxStock: i.max_stock,
    avgDailyUsage: i.avg_daily_usage,
    daysUntilEmpty:
      i.avg_daily_usage > 0 ? Math.floor(i.current_stock / i.avg_daily_usage) : undefined,
    lastUpdated: i.last_updated,
    supplierId: i.supplier_id,
    unitCost: i.unit_cost,
  }));

  // Generate alerts
  const alerts: StockAlert[] = [];

  for (const item of items) {
    // Out of stock
    if (item.currentStock <= 0) {
      alerts.push({
        id: crypto.randomUUID(),
        merchantId,
        itemId: item.id,
        itemName: item.name,
        alertType: 'out_of_stock',
        currentLevel: item.currentStock,
        threshold: 0,
        suggestedAction: `Order ${item.name} immediately`,
        priority: 'critical',
        createdAt: new Date().toISOString(),
      });
    }
    // Low stock
    else if (item.currentStock <= item.minStock) {
      const priority = item.currentStock <= item.minStock * 0.5 ? 'high' : 'medium';
      alerts.push({
        id: crypto.randomUUID(),
        merchantId,
        itemId: item.id,
        itemName: item.name,
        alertType: 'low_stock',
        currentLevel: item.currentStock,
        threshold: item.minStock,
        suggestedAction: `Reorder ${item.name} - current stock: ${item.currentStock} ${item.unit}`,
        priority,
        createdAt: new Date().toISOString(),
      });
    }
    // Overstock
    else if (item.maxStock && item.currentStock > item.maxStock) {
      alerts.push({
        id: crypto.randomUUID(),
        merchantId,
        itemId: item.id,
        itemName: item.name,
        alertType: 'overstock',
        currentLevel: item.currentStock,
        threshold: item.maxStock,
        suggestedAction: `Consider using more ${item.name} in specials to reduce excess stock`,
        priority: 'low',
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Save alerts
  if (alerts.length > 0) {
    await supabase.from('ai_stock_alerts').insert(
      alerts.map((a) => ({
        id: a.id,
        merchant_id: a.merchantId,
        item_id: a.itemId,
        item_name: a.itemName,
        alert_type: a.alertType,
        current_level: a.currentLevel,
        threshold: a.threshold,
        suggested_action: a.suggestedAction,
        priority: a.priority,
        created_at: a.createdAt,
      }))
    );
  }

  return { items, alerts };
}

// Update stock levels
export async function updateStock(
  itemId: string,
  adjustment: number,
  reason: string
): Promise<void> {
  // Get current stock
  const { data: item } = await supabase
    .from('ai_inventory_items')
    .select('current_stock')
    .eq('id', itemId)
    .single();

  if (!item) throw new Error('Item not found');

  const newStock = item.current_stock + adjustment;

  // Update stock
  await supabase
    .from('ai_inventory_items')
    .update({
      current_stock: Math.max(0, newStock),
      last_updated: new Date().toISOString(),
    })
    .eq('id', itemId);

  // Log the change
  await supabase.from('ai_stock_movements').insert({
    item_id: itemId,
    adjustment,
    new_stock: newStock,
    reason,
    created_at: new Date().toISOString(),
  });
}

// Generate purchase order
export async function generatePurchaseOrder(
  merchantId: string,
  supplierId: string,
  itemIds: string[]
): Promise<PurchaseOrder> {
  // Get supplier
  const { data: supplier } = await supabase
    .from('ai_suppliers')
    .select('*')
    .eq('id', supplierId)
    .single();

  if (!supplier) throw new Error('Supplier not found');

  // Get items
  const { data: items } = await supabase.from('ai_inventory_items').select('*').in('id', itemIds);

  if (!items || items.length === 0) throw new Error('No items found');

  // Calculate order quantities (order to max stock)
  const orderItems = items.map((item) => {
    const quantityNeeded = item.max_stock - item.current_stock;
    const unitPrice = item.unit_cost || 0;
    return {
      itemId: item.id,
      itemName: item.name,
      quantity: Math.max(1, quantityNeeded),
      unit: item.unit,
      unitPrice,
      totalPrice: quantityNeeded * unitPrice,
    };
  });

  const subtotal = orderItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const tax = subtotal * 0.1; // 10% VAT

  const order: PurchaseOrder = {
    id: crypto.randomUUID(),
    merchantId,
    supplierId,
    supplierName: supplier.name,
    status: 'draft',
    items: orderItems,
    subtotal,
    tax,
    total: subtotal + tax,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Save order
  await supabase.from('ai_purchase_orders').insert({
    id: order.id,
    merchant_id: order.merchantId,
    supplier_id: order.supplierId,
    supplier_name: order.supplierName,
    status: order.status,
    items: order.items,
    subtotal: order.subtotal,
    tax: order.tax,
    total: order.total,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  });

  return order;
}

// AI generates negotiation email draft
export async function generateNegotiationDraft(
  merchantId: string,
  supplierId: string,
  type: NegotiationDraft['type'],
  context: {
    currentSpend?: number;
    desiredDiscount?: number;
    competitorPrice?: number;
    orderHistory?: string;
  }
): Promise<NegotiationDraft> {
  const openai = getOpenAIClient();

  // Get supplier and merchant info
  const [supplierData, merchantData] = await Promise.all([
    supabase.from('ai_suppliers').select('*').eq('id', supplierId).single(),
    supabase.from('merchants').select('name, business_type').eq('id', merchantId).single(),
  ]);

  const supplier = supplierData.data;
  const merchant = merchantData.data;

  if (!supplier) throw new Error('Supplier not found');

  const typeDescriptions: Record<NegotiationDraft['type'], string> = {
    price_reduction: 'requesting a price reduction on existing items',
    bulk_discount: 'negotiating bulk purchase discounts',
    payment_terms: 'discussing better payment terms (e.g., net-60 instead of net-30)',
    new_supplier: 'introducing ourselves as a potential new customer',
  };

  const prompt = `Write a professional negotiation email for a restaurant/cafe owner.

From: ${merchant?.name || 'Restaurant Owner'}
To: ${supplier.name} (${supplier.contact_name || 'Supplier'})
Purpose: ${typeDescriptions[type]}

Context:
- Monthly spend with this supplier: $${context.currentSpend || 'unknown'}
- Desired discount: ${context.desiredDiscount || 10}%
- Competitor offers similar products at: ${context.competitorPrice ? `$${context.competitorPrice}` : 'competitive prices'}
- Order history: ${context.orderHistory || 'Regular monthly orders'}

Write:
1. A professional, friendly email (150-200 words)
2. 3-5 key talking points for phone negotiation

Respond with JSON:
{
  "subject": "Email subject line",
  "emailDraft": "Full email text...",
  "talkingPoints": ["Point 1", "Point 2", "Point 3"],
  "targetSavings": estimated monthly savings in dollars
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert business negotiator. Write professional, persuasive communications.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {
        subject: 'Partnership Discussion',
        emailDraft: 'We would like to discuss our business relationship...',
        talkingPoints: ['Discuss volume discounts', 'Review payment terms'],
        targetSavings: 0,
      };
    }

    const draft: NegotiationDraft = {
      id: crypto.randomUUID(),
      merchantId,
      supplierId,
      supplierName: supplier.name,
      type,
      subject: parsed.subject,
      emailDraft: parsed.emailDraft,
      talkingPoints: parsed.talkingPoints || [],
      targetSavings: parsed.targetSavings,
      createdAt: new Date().toISOString(),
    };

    // Save draft
    await supabase.from('ai_negotiation_drafts').insert({
      id: draft.id,
      merchant_id: draft.merchantId,
      supplier_id: draft.supplierId,
      supplier_name: draft.supplierName,
      type: draft.type,
      subject: draft.subject,
      email_draft: draft.emailDraft,
      talking_points: draft.talkingPoints,
      target_savings: draft.targetSavings,
      created_at: draft.createdAt,
    });

    return draft;
  } catch (error) {
    console.error('Negotiation draft generation failed:', error);
    throw error;
  }
}

// Find potential new suppliers (AI-assisted)
export async function findSuppliers(
  merchantId: string,
  category: string,
  location?: string
): Promise<{ suppliers: Partial<Supplier>[]; recommendations: string[] }> {
  const openai = getOpenAIClient();

  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  const { data: locationData } = await supabase
    .from('locations')
    .select('city, country')
    .eq('merchant_id', merchantId)
    .single();

  const searchLocation = location || `${locationData?.city || ''}, ${locationData?.country || ''}`;

  const prompt = `Suggest food/beverage suppliers for a ${merchant?.business_type || 'restaurant'} looking for "${category}" products in or near ${searchLocation}.

Provide realistic supplier recommendations. Respond with JSON:
{
  "suppliers": [
    {
      "name": "Supplier Name",
      "categories": ["category1", "category2"],
      "notes": "Brief description and why they're recommended"
    }
  ],
  "recommendations": [
    "General advice for finding and vetting suppliers in this category"
  ]
}

Suggest 3-5 potential suppliers.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a restaurant supply chain consultant. Provide practical supplier recommendations.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = { suppliers: [], recommendations: [] };
    }

    return {
      suppliers: (parsed.suppliers || []).map((s: any) => ({
        name: s.name,
        categories: s.categories || [category],
        notes: s.notes,
        isActive: true,
      })),
      recommendations: parsed.recommendations || [],
    };
  } catch (error) {
    console.error('Supplier search failed:', error);
    throw error;
  }
}

// Get inventory data for a merchant
export async function getInventoryData(merchantId: string): Promise<{
  items: InventoryItem[];
  alerts: StockAlert[];
  suppliers: Supplier[];
  recentOrders: PurchaseOrder[];
}> {
  const [itemsData, alertsData, suppliersData, ordersData] = await Promise.all([
    supabase.from('ai_inventory_items').select('*').eq('merchant_id', merchantId).order('name'),
    supabase
      .from('ai_stock_alerts')
      .select('*')
      .eq('merchant_id', merchantId)
      .is('resolved_at', null)
      .order('created_at', { ascending: false }),
    supabase.from('ai_suppliers').select('*').eq('merchant_id', merchantId).eq('is_active', true),
    supabase
      .from('ai_purchase_orders')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('created_at', { ascending: false })
      .limit(10),
  ]);

  return {
    items: (itemsData.data || []).map((i) => ({
      id: i.id,
      merchantId: i.merchant_id,
      name: i.name,
      category: i.category,
      unit: i.unit,
      currentStock: i.current_stock,
      minStock: i.min_stock,
      maxStock: i.max_stock,
      avgDailyUsage: i.avg_daily_usage,
      daysUntilEmpty:
        i.avg_daily_usage > 0 ? Math.floor(i.current_stock / i.avg_daily_usage) : undefined,
      lastUpdated: i.last_updated,
      supplierId: i.supplier_id,
      unitCost: i.unit_cost,
    })),
    alerts: (alertsData.data || []).map((a) => ({
      id: a.id,
      merchantId: a.merchant_id,
      itemId: a.item_id,
      itemName: a.item_name,
      alertType: a.alert_type,
      currentLevel: a.current_level,
      threshold: a.threshold,
      suggestedAction: a.suggested_action,
      priority: a.priority,
      createdAt: a.created_at,
      resolvedAt: a.resolved_at,
    })),
    suppliers: (suppliersData.data || []).map((s) => ({
      id: s.id,
      merchantId: s.merchant_id,
      name: s.name,
      contactName: s.contact_name,
      email: s.email,
      phone: s.phone,
      address: s.address,
      categories: s.categories,
      rating: s.rating,
      notes: s.notes,
      isActive: s.is_active,
      createdAt: s.created_at,
    })),
    recentOrders: (ordersData.data || []).map((o) => ({
      id: o.id,
      merchantId: o.merchant_id,
      supplierId: o.supplier_id,
      supplierName: o.supplier_name,
      status: o.status,
      items: o.items,
      subtotal: o.subtotal,
      tax: o.tax,
      total: o.total,
      notes: o.notes,
      expectedDelivery: o.expected_delivery,
      createdAt: o.created_at,
      updatedAt: o.updated_at,
    })),
  };
}

// Add inventory item
export async function addInventoryItem(
  merchantId: string,
  item: Partial<InventoryItem>
): Promise<InventoryItem> {
  const newItem: InventoryItem = {
    id: crypto.randomUUID(),
    merchantId,
    name: item.name || 'New Item',
    category: item.category || 'Other',
    unit: item.unit || 'units',
    currentStock: item.currentStock || 0,
    minStock: item.minStock || 5,
    maxStock: item.maxStock || 50,
    avgDailyUsage: item.avgDailyUsage || 0,
    lastUpdated: new Date().toISOString(),
    supplierId: item.supplierId,
    unitCost: item.unitCost,
  };

  const { error } = await supabase.from('ai_inventory_items').insert({
    id: newItem.id,
    merchant_id: newItem.merchantId,
    name: newItem.name,
    category: newItem.category,
    unit: newItem.unit,
    current_stock: newItem.currentStock,
    min_stock: newItem.minStock,
    max_stock: newItem.maxStock,
    avg_daily_usage: newItem.avgDailyUsage,
    last_updated: newItem.lastUpdated,
    supplier_id: newItem.supplierId,
    unit_cost: newItem.unitCost,
  });

  if (error) throw error;
  return newItem;
}

// Add supplier
export async function addSupplier(
  merchantId: string,
  supplier: Partial<Supplier>
): Promise<Supplier> {
  const newSupplier: Supplier = {
    id: crypto.randomUUID(),
    merchantId,
    name: supplier.name || 'New Supplier',
    contactName: supplier.contactName,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
    categories: supplier.categories || [],
    rating: supplier.rating,
    notes: supplier.notes,
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase.from('ai_suppliers').insert({
    id: newSupplier.id,
    merchant_id: newSupplier.merchantId,
    name: newSupplier.name,
    contact_name: newSupplier.contactName,
    email: newSupplier.email,
    phone: newSupplier.phone,
    address: newSupplier.address,
    categories: newSupplier.categories,
    rating: newSupplier.rating,
    notes: newSupplier.notes,
    is_active: newSupplier.isActive,
    created_at: newSupplier.createdAt,
  });

  if (error) throw error;
  return newSupplier;
}
