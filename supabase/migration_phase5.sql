-- Phase 5 Migration: Leads, Packages, Testimonials enhancements

-- 1. Leads Table Updates
ALTER TABLE leads ADD COLUMN referral_name TEXT;
ALTER TABLE leads ADD COLUMN plan_summary TEXT;
ALTER TABLE leads ADD COLUMN customer_type TEXT;

-- 2. Packages Table Updates
ALTER TABLE packages ADD COLUMN category TEXT;
ALTER TABLE packages ADD COLUMN departure_city TEXT;
ALTER TABLE packages ADD COLUMN is_weekend_destination BOOLEAN DEFAULT false;

-- 3. Testimonials Table Updates
ALTER TABLE testimonials ADD COLUMN rating INT;

-- 4. Seed 5 Weekend Destination Packages
-- Assuming 'domestic' type since these are Ex India cities.
-- We'll attach them to the 'kashmir' destination as a fallback if no other destination fits, 
-- or we can insert a generic destination. Let's insert a 'Weekend Getaways' destination first to be safe.

INSERT INTO destinations (name, slug, description, image_url, is_featured) 
VALUES ('Weekend Getaways', 'weekend-getaways', 'Short, refreshing trips departing from major cities.', 'https://images.unsplash.com/photo-1546708688-662f55811c75?auto=format&fit=crop&w=1200&q=80', false)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO packages (title, slug, destination_id, type, description, inclusions, exclusions, price, image_url, category, departure_city, is_weekend_destination, is_featured) VALUES
('Coorg Coffee Retreat Ex Bangalore', 'coorg-retreat-ex-bangalore', (SELECT id FROM destinations WHERE slug = 'weekend-getaways'), 'domestic', 'A quick escape to the coffee plantations of Coorg.', 'Hotel stay\nBreakfast', 'Transport to Coorg', 350, 'https://images.unsplash.com/photo-1596422846543-74c6e273e979?auto=format&fit=crop&w=1200&q=80', 'Mountains', 'Bangalore', true, false),
('Mahabalipuram Coast Ex Chennai', 'mahabalipuram-ex-chennai', (SELECT id FROM destinations WHERE slug = 'weekend-getaways'), 'domestic', 'Coastal heritage and relaxing beach resorts.', 'Resort stay\nTemple tour', 'Transport', 250, 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80', 'Beach', 'Chennai', true, false),
('Agra Heritage Ex Delhi', 'agra-heritage-ex-delhi', (SELECT id FROM destinations WHERE slug = 'weekend-getaways'), 'domestic', 'Weekend dive into Mughal history.', 'Hotel stay\nGuided tour', 'Entry tickets', 200, 'https://images.unsplash.com/photo-1564507592208-02722129fb66?auto=format&fit=crop&w=1200&q=80', 'History', 'Delhi', true, false),
('Lonavala Luxury Ex Mumbai', 'lonavala-luxury-ex-mumbai', (SELECT id FROM destinations WHERE slug = 'weekend-getaways'), 'domestic', 'Luxury villa stay in the misty Western Ghats.', 'Villa stay\nAll meals', 'Personal expenses', 450, 'https://images.unsplash.com/photo-1565019056263-8a3036a18d6a?auto=format&fit=crop&w=1200&q=80', 'Mountains', 'Mumbai', true, false),
('Sundarbans Safari Ex Kolkata', 'sundarbans-safari-ex-kolkata', (SELECT id FROM destinations WHERE slug = 'weekend-getaways'), 'domestic', 'Weekend wildlife adventure in the mangrove forest.', 'Boat stay\nSafari', 'Camera fees', 300, 'https://images.unsplash.com/photo-1622308644420-a61b84f33166?auto=format&fit=crop&w=1200&q=80', 'Adventure', 'Kolkata', true, false)
ON CONFLICT (slug) DO UPDATE SET 
  category = EXCLUDED.category,
  departure_city = EXCLUDED.departure_city,
  is_weekend_destination = EXCLUDED.is_weekend_destination;
