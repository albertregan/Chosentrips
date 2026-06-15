-- Phase 3 Migration: Add new columns to leads table
ALTER TABLE leads
ADD COLUMN destination TEXT,
ADD COLUMN preferred_date DATE,
ADD COLUMN no_of_nights INTEGER,
ADD COLUMN no_of_adults INTEGER,
ADD COLUMN no_of_children INTEGER,
ADD COLUMN children_ages JSONB,
ADD COLUMN budget NUMERIC,
ADD COLUMN budget_type TEXT CHECK (budget_type IN ('per_person', 'total'));

-- Create testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  guest_name TEXT NOT NULL,
  destination TEXT NOT NULL,
  review_content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true
);

-- Insert dummy testimonials
INSERT INTO testimonials (guest_name, destination, review_content, is_published) VALUES
('Eleanor & James Wentworth', 'Swiss Alps Retreat', 'An absolutely transcendent experience. Albert and his team curated every detail flawlessly, from the private train carriages to the breathtaking views from our suite. Chosen Trips redefined luxury for us.', true),
('Sarah Jenkins', 'Magical Bali', 'I requested a retreat that balanced spiritual tranquility with extreme comfort. The villa in Seminyak was stunning, and the private guides were incredibly knowledgeable. Truly a journey chosen with care.', true),
('Marcus Thorne', 'Maldives Escapade', 'The attention to detail is what sets Chosen Trips apart. We didn''t have to think about a single logistical element; we just immersed ourselves in paradise.', true);
