const { createClient } = require('@supabase/supabase-js');

// Credentials are read from the environment — never hardcode keys in source.
// Use the service-role key so seeding works once RLS is enabled:
//   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node seed.js
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const packages = [
  {
    title: 'Maldives Serenity Villa Escapade',
    slug: 'maldives-serenity-villa',
    type: 'international',
    description: 'A 5-night retreat in an overwater villa with private pool, featuring daily spa treatments and sunset cruises.',
    inclusions: 'All-inclusive meals\nSeaplane transfers\nPrivate butler',
    exclusions: 'International flights\nGratuities',
    price: 450000,
    image_url: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Maldives Active Ocean Adventure',
    slug: 'maldives-active-ocean',
    type: 'international',
    description: 'A 7-night dynamic experience including scuba diving with manta rays, deep sea fishing, and luxury yacht charting.',
    inclusions: 'Daily breakfast and dinner\nYacht charter for 1 day\n5 guided dives',
    exclusions: 'International flights\nSpa treatments',
    price: 620000,
    image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Swiss Alps Winter Retreat',
    slug: 'swiss-alps-winter-retreat',
    type: 'international',
    description: '7 days of world-class skiing, staying in a luxury chalet with a private chef in St. Moritz.',
    inclusions: 'Chalet accommodation\nPrivate chef meals\nHeliskiing excursion',
    exclusions: 'Flights to Zurich\nSki equipment rental',
    price: 850000,
    image_url: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Bali Spiritual Awakening',
    slug: 'bali-spiritual-awakening',
    type: 'international',
    description: '10 days of profound cultural immersion, yoga retreats in Ubud, and private temple blessings.',
    inclusions: 'Private pool villa\nDaily yoga and meditation\nTemple entry and donations',
    exclusions: 'International flights\nAlcoholic beverages',
    price: 210000,
    image_url: 'https://images.unsplash.com/photo-1542315143-6903525281ac?auto=format&fit=crop&w=1200&q=80'
  }
];

async function seed() {
  console.log('Seeding packages...');
  for (const pkg of packages) {
    const { data, error } = await supabase.from('packages').upsert([pkg], { onConflict: 'slug' });
    if (error) {
      console.error('Error inserting:', pkg.title, error.message);
    } else {
      console.log('Inserted:', pkg.title);
    }
  }
  console.log('Done seeding packages.');
}

seed();
