-- =============================================================================
-- Phase 8: Reconcile leads schema with the enquiry form + add newsletter table
-- =============================================================================
-- The enquiry form (EnquiryForm.tsx) and the Leads CRM both reference columns
-- that never existed in the committed schema, so enquiries failed to insert and
-- the CRM rendered blank cells. This adds the missing columns and a table for
-- the newsletter signup (previously a dead form).
--
-- Run after migration_phase7_rls.sql.
-- =============================================================================

-- 1. Missing lead columns referenced by the enquiry form / CRM ----------------
ALTER TABLE leads ADD COLUMN IF NOT EXISTS destination     TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS preferred_date  DATE;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS no_of_nights    INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS no_of_adults    INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS no_of_children  INTEGER;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS children_ages   JSONB;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget          NUMERIC;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget_type     TEXT;

-- 2. Newsletter subscribers ---------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT NOT NULL UNIQUE
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone may subscribe; nobody (anon) may read the list. Admin reads via
-- the service-role key, which bypasses RLS.
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);
