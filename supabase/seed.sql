-- Domestic Packages
INSERT INTO packages (id, title, slug, type, description, inclusions, exclusions, price, image_url, is_featured) VALUES
('d1000000-0000-0000-0000-000000000001', 'Majestic Kashmir', 'majestic-kashmir', 'domestic', 'Experience the heaven on earth with our 6 Days Kashmir package. Houseboat stay included.', '• 5 Nights Accommodation\n• Daily Breakfast & Dinner\n• Shikara Ride\n• Airport Transfers', '• Flights/Train tickets\n• Lunch\n• Monument entry fees', 25000, 'https://images.unsplash.com/photo-1566996694954-90b052c413c4?auto=format&fit=crop&w=800&q=80', true),
('d1000000-0000-0000-0000-000000000002', 'Kerala Backwaters', 'kerala-backwaters', 'domestic', 'Relax in the serene backwaters of Alleppey and explore Munnar tea gardens.', '• 4 Nights Accommodation\n• Houseboat Stay\n• All meals on houseboat', '• Flights\n• Personal expenses', 22000, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', true),
('d1000000-0000-0000-0000-000000000003', 'Goa Beaches', 'goa-beaches', 'domestic', 'Sun, sand, and sea. Enjoy the vibrant nightlife and pristine beaches of North and South Goa.', '• 3 Nights Accommodation\n• Breakfast\n• North Goa Sightseeing', '• Flights\n• Water sports', 15000, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', false);

-- International Packages
INSERT INTO packages (id, title, slug, type, description, inclusions, exclusions, price, image_url, is_featured) VALUES
('i1000000-0000-0000-0000-000000000001', 'Magical Bali Gateway', 'magical-bali-gateway', 'international', '5 Days, 4 Nights • Private Villa • Daily Breakfast in beautiful Bali.', '• 4 Nights in Private Villa\n• Airport Transfers\n• Ubud Tour', '• Flights\n• Visa on arrival', 45000, 'https://images.unsplash.com/photo-1542315143-6903525281ac?auto=format&fit=crop&w=800&q=80', true),
('i1000000-0000-0000-0000-000000000002', 'Swiss Alps Retreat', 'swiss-alps-retreat', 'international', '7 Days, 6 Nights • Train Passes • Mount Titlis. Discover Switzerland.', '• 6 Nights Accommodation\n• Swiss Travel Pass\n• Mt. Titlis Excursion', '• Flights\n• Schengen Visa', 85000, 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80', true),
('i1000000-0000-0000-0000-000000000003', 'Dubai Luxury Escapade', 'dubai-luxury-escapade', 'international', 'Experience the luxury of Dubai with Desert Safari, Burj Khalifa, and Dhow Cruise.', '• 4 Nights 4-Star Hotel\n• Desert Safari with BBQ Dinner\n• Burj Khalifa 124th Floor', '• Flights\n• Tourism Dirham Fee', 35000, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', false);

-- Itineraries for Bali
INSERT INTO itineraries (package_id, day_number, title, description) VALUES
('i1000000-0000-0000-0000-000000000001', 1, 'Arrival in Bali', 'Welcome to Bali! Transfer to your private pool villa in Seminyak.'),
('i1000000-0000-0000-0000-000000000001', 2, 'Kintamani Volcano Tour', 'Full day tour to Kintamani overlooking the active volcano Mt. Batur.'),
('i1000000-0000-0000-0000-000000000001', 3, 'Water Sports & Uluwatu', 'Enjoy parasailing and jet ski in the morning. Evening sunset at Uluwatu Temple.'),
('i1000000-0000-0000-0000-000000000001', 4, 'Leisure Day', 'Spend the day at leisure, shopping or enjoying a Balinese massage.'),
('i1000000-0000-0000-0000-000000000001', 5, 'Departure', 'After breakfast, transfer to the airport for your flight back home.');

-- Sample Hotels for Bali
INSERT INTO hotels (package_id, star_rating, name, description) VALUES
('i1000000-0000-0000-0000-000000000001', 5, 'W Bali - Seminyak', 'Luxury beachfront resort with vibrant nightlife.'),
('i1000000-0000-0000-0000-000000000001', 4, 'The Haven Bali Seminyak', 'Elegant suites within walking distance to Seminyak beach.'),
('i1000000-0000-0000-0000-000000000001', 3, 'Ibis Styles Bali Legian', 'Comfortable stay with modern amenities in the heart of Legian.');
