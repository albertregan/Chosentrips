-- Add new columns to leads table
ALTER TABLE public.leads 
ADD COLUMN IF NOT EXISTS referral_name text,
ADD COLUMN IF NOT EXISTS plan_summary text,
ADD COLUMN IF NOT EXISTS customer_type text DEFAULT 'Family';

-- Add new columns to packages table
ALTER TABLE public.packages
ADD COLUMN IF NOT EXISTS category text DEFAULT 'Beach',
ADD COLUMN IF NOT EXISTS departure_city text,
ADD COLUMN IF NOT EXISTS is_weekend_destination boolean DEFAULT false;

-- Add rating to testimonials
ALTER TABLE public.testimonials
ADD COLUMN IF NOT EXISTS rating integer DEFAULT 5;
