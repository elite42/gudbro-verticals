-- Migration 036: AI Inventory & Supplier Negotiation
-- Phase 12: Inventory tracking + AI-assisted supplier management
-- Created: 2026-01-05

-- ============================================
-- TABLE: ai_suppliers
-- Supplier directory
-- ============================================
CREATE TABLE IF NOT EXISTS ai_suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,

  categories TEXT[] DEFAULT '{}',       -- What they supply
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,

  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ai_inventory_items
-- Track stock items
-- ============================================
CREATE TABLE IF NOT EXISTS ai_inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,                   -- kg, liters, pieces, etc.

  current_stock DECIMAL(12,2) DEFAULT 0,
  min_stock DECIMAL(12,2) DEFAULT 5,    -- Reorder point
  max_stock DECIMAL(12,2) DEFAULT 100,  -- Maximum capacity
  avg_daily_usage DECIMAL(12,2) DEFAULT 0,

  supplier_id UUID REFERENCES ai_suppliers(id) ON DELETE SET NULL,
  unit_cost DECIMAL(10,2),              -- Cost per unit

  last_updated TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(merchant_id, name)
);

-- ============================================
-- TABLE: ai_stock_movements
-- Track stock changes
-- ============================================
CREATE TABLE IF NOT EXISTS ai_stock_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES ai_inventory_items(id) ON DELETE CASCADE,

  adjustment DECIMAL(12,2) NOT NULL,    -- Positive or negative
  new_stock DECIMAL(12,2) NOT NULL,
  reason TEXT,                          -- delivery, usage, waste, adjustment, etc.

  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- ============================================
-- TABLE: ai_stock_alerts
-- Low stock and other inventory alerts
-- ============================================
CREATE TABLE IF NOT EXISTS ai_stock_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  item_id UUID NOT NULL REFERENCES ai_inventory_items(id) ON DELETE CASCADE,

  item_name TEXT NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN (
    'low_stock', 'out_of_stock', 'expiring', 'overstock'
  )),

  current_level DECIMAL(12,2),
  threshold DECIMAL(12,2),
  suggested_action TEXT,

  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN (
    'low', 'medium', 'high', 'critical'
  )),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- ============================================
-- TABLE: ai_purchase_orders
-- Orders to suppliers
-- ============================================
CREATE TABLE IF NOT EXISTS ai_purchase_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES ai_suppliers(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,

  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'sent', 'confirmed', 'delivered', 'cancelled'
  )),

  items JSONB NOT NULL DEFAULT '[]',
  -- [{ itemId, itemName, quantity, unit, unitPrice, totalPrice }]

  subtotal DECIMAL(12,2) DEFAULT 0,
  tax DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2) DEFAULT 0,

  notes TEXT,
  expected_delivery DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABLE: ai_negotiation_drafts
-- AI-generated negotiation emails
-- ============================================
CREATE TABLE IF NOT EXISTS ai_negotiation_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
  supplier_id UUID NOT NULL REFERENCES ai_suppliers(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,

  type TEXT NOT NULL CHECK (type IN (
    'price_reduction', 'bulk_discount', 'payment_terms', 'new_supplier'
  )),

  subject TEXT NOT NULL,
  email_draft TEXT NOT NULL,
  talking_points TEXT[] DEFAULT '{}',
  target_savings DECIMAL(12,2),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_ai_suppliers_merchant ON ai_suppliers(merchant_id);
CREATE INDEX idx_ai_suppliers_active ON ai_suppliers(merchant_id, is_active) WHERE is_active = TRUE;

CREATE INDEX idx_ai_inventory_items_merchant ON ai_inventory_items(merchant_id);
CREATE INDEX idx_ai_inventory_items_category ON ai_inventory_items(merchant_id, category);
CREATE INDEX idx_ai_inventory_items_supplier ON ai_inventory_items(supplier_id);
CREATE INDEX idx_ai_inventory_items_low_stock ON ai_inventory_items(merchant_id)
  WHERE current_stock <= min_stock;

CREATE INDEX idx_ai_stock_movements_item ON ai_stock_movements(item_id);
CREATE INDEX idx_ai_stock_movements_date ON ai_stock_movements(created_at);

CREATE INDEX idx_ai_stock_alerts_merchant ON ai_stock_alerts(merchant_id);
CREATE INDEX idx_ai_stock_alerts_unresolved ON ai_stock_alerts(merchant_id, resolved_at)
  WHERE resolved_at IS NULL;
CREATE INDEX idx_ai_stock_alerts_priority ON ai_stock_alerts(merchant_id, priority);

CREATE INDEX idx_ai_purchase_orders_merchant ON ai_purchase_orders(merchant_id);
CREATE INDEX idx_ai_purchase_orders_supplier ON ai_purchase_orders(supplier_id);
CREATE INDEX idx_ai_purchase_orders_status ON ai_purchase_orders(merchant_id, status);

CREATE INDEX idx_ai_negotiation_drafts_merchant ON ai_negotiation_drafts(merchant_id);
CREATE INDEX idx_ai_negotiation_drafts_supplier ON ai_negotiation_drafts(supplier_id);

-- ============================================
-- RLS POLICIES (P5 pattern with account_roles)
-- ============================================
ALTER TABLE ai_suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_stock_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_negotiation_drafts ENABLE ROW LEVEL SECURITY;

-- Suppliers
CREATE POLICY "suppliers_read_own" ON ai_suppliers
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "suppliers_write_own" ON ai_suppliers
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Inventory Items
CREATE POLICY "inventory_read_own" ON ai_inventory_items
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "inventory_write_own" ON ai_inventory_items
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Stock Movements (via item)
CREATE POLICY "movements_read_own" ON ai_stock_movements
  FOR SELECT USING (
    item_id IN (
      SELECT id FROM ai_inventory_items
      WHERE merchant_id IN (
        SELECT ar.tenant_id FROM account_roles ar
        WHERE ar.account_id = auth.uid()
      )
    )
  );

CREATE POLICY "movements_write_own" ON ai_stock_movements
  FOR ALL USING (
    item_id IN (
      SELECT id FROM ai_inventory_items
      WHERE merchant_id IN (
        SELECT ar.tenant_id FROM account_roles ar
        WHERE ar.account_id = auth.uid()
      )
    )
  );

-- Stock Alerts
CREATE POLICY "alerts_read_own" ON ai_stock_alerts
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "alerts_write_own" ON ai_stock_alerts
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Purchase Orders
CREATE POLICY "orders_read_own" ON ai_purchase_orders
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "orders_write_own" ON ai_purchase_orders
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Negotiation Drafts
CREATE POLICY "negotiations_read_own" ON ai_negotiation_drafts
  FOR SELECT USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

CREATE POLICY "negotiations_write_own" ON ai_negotiation_drafts
  FOR ALL USING (
    merchant_id IN (
      SELECT ar.tenant_id FROM account_roles ar
      WHERE ar.account_id = auth.uid()
    )
  );

-- Admin access for all tables
CREATE POLICY "suppliers_admin" ON ai_suppliers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "inventory_admin" ON ai_inventory_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "movements_admin" ON ai_stock_movements
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "alerts_admin" ON ai_stock_alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "orders_admin" ON ai_purchase_orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

CREATE POLICY "negotiations_admin" ON ai_negotiation_drafts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM account_roles ar
      WHERE ar.account_id = auth.uid()
      AND ar.role_type IN ('gudbro_admin', 'gudbro_superadmin')
    )
  );

-- ============================================
-- TRIGGER: Update timestamps
-- ============================================
CREATE TRIGGER trigger_ai_inventory_items_updated
  BEFORE UPDATE ON ai_inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_delegated_tasks_updated_at();

CREATE TRIGGER trigger_ai_purchase_orders_updated
  BEFORE UPDATE ON ai_purchase_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_delegated_tasks_updated_at();

-- ============================================
-- COMMENT
-- ============================================
COMMENT ON TABLE ai_suppliers IS 'Supplier directory for each merchant';
COMMENT ON TABLE ai_inventory_items IS 'Track stock levels and reorder points';
COMMENT ON TABLE ai_stock_movements IS 'Log of all stock changes';
COMMENT ON TABLE ai_stock_alerts IS 'Automated stock level alerts';
COMMENT ON TABLE ai_purchase_orders IS 'Purchase orders to suppliers';
COMMENT ON TABLE ai_negotiation_drafts IS 'AI-generated negotiation emails';
