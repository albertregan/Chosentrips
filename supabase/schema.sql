-- Create destinations table
CREATE TABLE destinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- Create packages table
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('domestic', 'international')),
  description TEXT,
  inclusions TEXT,
  exclusions TEXT,
  price NUMERIC,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- Create itineraries table
CREATE TABLE itineraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  UNIQUE(package_id, day_number)
);

-- Create hotels table
CREATE TABLE hotels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  star_rating INTEGER CHECK (star_rating IN (3, 4, 5)),
  name TEXT NOT NULL,
  description TEXT
);

-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'won', 'lost'))
);

-- Create pages table for CMS (Privacy Policy, T&C, etc)
CREATE TABLE pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  updated_at TIMESTAMPTZ DEFAULT now(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT
);

-- Insert placeholder pages
INSERT INTO pages (slug, title, content) VALUES
('terms-and-conditions', 'Terms & Conditions', 'Your terms and conditions content goes here.'),
('privacy-policy', 'Privacy Policy', 'Your privacy policy content goes here.'),
('refund-policy', 'Refund Policy', 'Your refund policy content goes here.');
