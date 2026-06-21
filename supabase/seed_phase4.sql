-- Seed 2 packages per destination for Phase 4
INSERT INTO destinations (name, slug, description, image_url, is_featured) VALUES
('Maldives', 'maldives', 'Overwater villas, reef-blue lagoons, private sandbanks, and serene island luxury.', 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80', true),
('Swiss Alps', 'swiss-alps', 'Iconic mountain villages, glacier journeys, grand hotels, and polished alpine adventure.', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80', true),
('Bali', 'bali', 'Temple rituals, private pool villas, wellness retreats, and dramatic coastlines.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80', true),
('Dubai', 'dubai', 'Skyline glamour, desert escapes, private dining, and high-touch city experiences.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80', false),
('Kashmir', 'kashmir', 'Houseboats, Himalayan valleys, alpine meadows, and quiet luxury in northern India.', 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80', true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url,
  is_featured = EXCLUDED.is_featured;

-- MALDIVES
INSERT INTO packages (title, slug, destination_id, type, description, inclusions, exclusions, price, image_url) VALUES
('Maldives Serenity Villa Escapade', 'maldives-serenity-villa', (SELECT id FROM destinations WHERE slug = 'maldives'), 'international', 'A 5-night retreat in an overwater villa with private pool, featuring daily spa treatments and sunset cruises.', 'All-inclusive meals\nSeaplane transfers\nPrivate butler', 'International flights\nGratuities', 4500, 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'),
('Maldives Active Ocean Adventure', 'maldives-active-ocean', (SELECT id FROM destinations WHERE slug = 'maldives'), 'international', 'A 7-night dynamic experience including scuba diving with manta rays, deep sea fishing, and luxury yacht charting.', 'Daily breakfast and dinner\nYacht charter for 1 day\n5 guided dives', 'International flights\nSpa treatments', 6200, 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO UPDATE SET destination_id = EXCLUDED.destination_id;

-- SWISS ALPS
INSERT INTO packages (title, slug, destination_id, type, description, inclusions, exclusions, price, image_url) VALUES
('Swiss Alps Winter Retreat', 'swiss-alps-winter-retreat', (SELECT id FROM destinations WHERE slug = 'swiss-alps'), 'international', '7 days of world-class skiing, staying in a luxury chalet with a private chef in St. Moritz.', 'Chalet accommodation\nPrivate chef meals\nHeliskiing excursion', 'Flights to Zurich\nSki equipment rental', 8500, 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80'),
('Glacier Express Scenic Journey', 'glacier-express-scenic', (SELECT id FROM destinations WHERE slug = 'swiss-alps'), 'international', 'A magnificent 5-day rail journey across the Swiss Alps in Excellence Class, stopping at premium mountain resorts.', 'Excellence Class tickets\n5-star hotel stays\nAll dining on train', 'Flights to Geneva\nPersonal expenses', 3200, 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO UPDATE SET destination_id = EXCLUDED.destination_id;

-- BALI
INSERT INTO packages (title, slug, destination_id, type, description, inclusions, exclusions, price, image_url) VALUES
('Bali Spiritual Awakening', 'bali-spiritual-awakening', (SELECT id FROM destinations WHERE slug = 'bali'), 'international', '10 days of profound cultural immersion, yoga retreats in Ubud, and private temple blessings.', 'Private pool villa\nDaily yoga and meditation\nTemple entry and donations', 'International flights\nAlcoholic beverages', 2100, 'https://images.unsplash.com/photo-1542315143-6903525281ac?auto=format&fit=crop&w=1200&q=80'),
('Bali Coastline Luxury', 'bali-coastline-luxury', (SELECT id FROM destinations WHERE slug = 'bali'), 'international', '7 nights in Uluwatu cliff-top resorts, surfing lessons, and exclusive beach club access.', 'Cliff-top accommodation\nVIP beach club beds\nPrivate surf instructor', 'International flights\nLunch', 3400, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO UPDATE SET destination_id = EXCLUDED.destination_id;

-- DUBAI
INSERT INTO packages (title, slug, destination_id, type, description, inclusions, exclusions, price, image_url) VALUES
('Dubai Desert Opulence', 'dubai-desert-opulence', (SELECT id FROM destinations WHERE slug = 'dubai'), 'international', '5 nights bridging the gap between futuristic cityscapes and ancient desert traditions. Includes a private night safari.', 'Burj Al Arab stay\nPrivate desert camp night\nHelicopter tour', 'Flights to Dubai\nGratuities', 5500, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'),
('Dubai Shopping & Skyline', 'dubai-shopping-skyline', (SELECT id FROM destinations WHERE slug = 'dubai'), 'international', 'A lavish 4-day weekend focusing on exclusive personal shopping experiences and VIP dining at the highest restaurants.', 'Downtown 5-star suite\nPersonal shopper\nDinner at At.mosphere', 'Flights to Dubai\nShopping budget', 2800, 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO UPDATE SET destination_id = EXCLUDED.destination_id;

-- KASHMIR
INSERT INTO packages (title, slug, destination_id, type, description, inclusions, exclusions, price, image_url) VALUES
('Kashmir Houseboat Romance', 'kashmir-houseboat-romance', (SELECT id FROM destinations WHERE slug = 'kashmir'), 'domestic', '4 nights on a luxury heritage houseboat on Dal Lake, with private Shikara rides and floating markets.', 'Luxury houseboat stay\nAll meals\nDaily Shikara rides', 'Flights to Srinagar\nGratuities', 1200, 'https://images.unsplash.com/photo-1566996694954-90b052c413c4?auto=format&fit=crop&w=1200&q=80'),
('Kashmir Himalayan Expedition', 'kashmir-himalayan-expedition', (SELECT id FROM destinations WHERE slug = 'kashmir'), 'domestic', '7 days exploring the valleys of Gulmarg and Pahalgam, staying in premium resorts and guided treks.', '5-star resort stays\nGuided trekking\nGondola tickets', 'Flights to Srinagar\nTrekking gear', 1800, 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (slug) DO UPDATE SET destination_id = EXCLUDED.destination_id;
