-- =============================================================================
-- Phase 7: Row-Level Security (RLS) hardening
-- =============================================================================
-- Before this migration the anon key had full read/write on every table,
-- meaning anyone could read customer leads (PII) and edit/delete all content.
--
-- Model:
--   * Public (anon) can READ published content only.
--   * Public can INSERT leads (enquiry form) and testimonials (review form).
--   * Public can do nothing else — no updates, no deletes, no reading leads.
--   * The admin CMS uses the service_role key (server-side only), which
--     bypasses RLS entirely, so admin reads/writes continue to work.
--
-- Run this in the Supabase SQL editor (or via the CLI) against your project.
-- =============================================================================

-- Enable RLS on every table. With RLS enabled and no permissive policy,
-- the anon/authenticated roles are denied by default.
ALTER TABLE destinations  ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries   ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels        ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages         ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials  ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs          ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- Public read access to content tables
-- ---------------------------------------------------------------------------
CREATE POLICY "public_read_destinations" ON destinations
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_packages" ON packages
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_itineraries" ON itineraries
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_hotels" ON hotels
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_pages" ON pages
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_blogs" ON blogs
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "public_read_faqs" ON faqs
  FOR SELECT TO anon, authenticated USING (true);

-- Testimonials: the public site should only ever see approved reviews.
CREATE POLICY "public_read_published_testimonials" ON testimonials
  FOR SELECT TO anon, authenticated USING (is_published = true);

-- ---------------------------------------------------------------------------
-- Public write access — ONLY the two visitor-facing forms
-- ---------------------------------------------------------------------------
-- Enquiry form -> leads. Anyone may submit a lead, nobody (anon) may read them.
CREATE POLICY "public_insert_leads" ON leads
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Review form -> testimonials. New submissions must be unpublished (pending
-- moderation); this prevents the public from self-publishing reviews.
CREATE POLICY "public_insert_testimonials" ON testimonials
  FOR INSERT TO anon, authenticated WITH CHECK (is_published = false);

-- ---------------------------------------------------------------------------
-- NOTE: No UPDATE/DELETE policies are defined for the anon role on purpose.
-- All admin mutations go through the service_role key, which bypasses RLS.
-- =============================================================================
