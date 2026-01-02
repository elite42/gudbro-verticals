-- =============================================================================
-- MIGRATION: Add new values to ingredient_category ENUM
-- Date: 2025-12-27
-- Purpose: Add meat subcategories to existing ENUM type
-- =============================================================================

-- IMPORTANTE: Lezione #41 da LESSONS-LEARNED.md
-- PostgreSQL ENUM: nuovi valori devono essere COMMITTED prima di poterli usare
-- Eseguire questo script PRIMA, poi eseguire gli script di migrazione (02-07)

-- NOTA: In Supabase SQL Editor, ogni statement viene auto-committed.
-- Se ricevi errore, esegui ogni ALTER TYPE separatamente.

ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'red_meat';
ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'poultry';
ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'game';
ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'offal';
ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'cured_meats';
ALTER TYPE ingredient_category ADD VALUE IF NOT EXISTS 'sausages';

-- Verifica che i nuovi valori esistano:
SELECT enumlabel FROM pg_enum
WHERE enumtypid = 'ingredient_category'::regtype
ORDER BY enumlabel;
