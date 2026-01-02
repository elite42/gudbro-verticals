-- Fix: Add missing enum values
-- Run this BEFORE importing wine batches

-- Add 'medium_high' to tannin_level enum
ALTER TYPE tannin_level ADD VALUE IF NOT EXISTS 'medium_high';
