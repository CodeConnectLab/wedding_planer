/**
 * Seeds the WAH Momentz database with starter content so every admin-managed section of the
 * website has something to show. Safe to re-run: it never deletes or overwrites existing data —
 * collections that already have content are left untouched, and keyed items (services, blogs,
 * categories) are only inserted when their slug is missing. Contact enquiries are never touched.
 *
 *   npm run seed
 *
 * Images come from lib/site-images.json (run `node scripts/upload-site-images.js` first).
 * Testimonials and gallery entries are SAMPLE content — replace them with real couples' reviews
 * and photos from the admin panel before launch.
 */
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const images = require('../lib/site-images.json');
const serviceDetails = require('./seed-data/service-details.json');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI is not set');

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@wahmomentz.com').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/** Cloudinary URL for a curated image, capped at `width`. */
const img = (key, width = 1800) => {
  if (!images[key]) throw new Error(`Unknown image key: ${key}`);
  return images[key].replace('/upload/', `/upload/c_limit,w_${width},q_auto/`);
};

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const now = () => new Date();

// ── Content ────────────────────────────────────────────────────────────────

const categories = ['Royal Heritage', 'Destination', 'Traditional', 'Pre-Wedding Rituals', 'Modern & Intimate'];

const projects = [
  {
    title: 'A Royal Palace Wedding',
    category: 'Royal Heritage',
    location: 'Udaipur, Rajasthan',
    venue: 'Lakeside palace, Udaipur',
    weddingStyle: 'Royal Heritage',
    guestCount: 350,
    isFeatured: true,
    description:
      'Three days of regal celebration on the shores of Lake Pichola — a floral archway entrance lit by hundreds of diyas, a rose-and-marigold mandap at golden hour, and a reception under crystal chandeliers that carried on long after the fireworks.',
    images: ['hero-palace-couple', 'couple-palace-night', 'decor-floral-stage', 'bride-red', 'venue-lake-palace-night', 'couple-varmala'],
  },
  {
    title: 'A Grand Mandap Affair',
    category: 'Traditional',
    location: 'New Delhi',
    venue: 'Five-star ballroom, New Delhi',
    weddingStyle: 'Traditional',
    guestCount: 600,
    isFeatured: true,
    description:
      'A classic North Indian wedding with a towering floral mandap, chandelier-lit pheras and a ballroom transformed with cascading florals. Every ritual was timed to the muhurat, with family elders guided through each moment by our team.',
    images: ['hero-mandap', 'ritual-ballroom', 'hero-grand-decor', 'ritual-hands', 'bride-smile', 'couple-stage'],
  },
  {
    title: 'Haldi & Mehndi Mornings',
    category: 'Pre-Wedding Rituals',
    location: 'Jaipur, Rajasthan',
    venue: 'Heritage haveli courtyard, Jaipur',
    weddingStyle: 'Pre-Wedding Rituals',
    guestCount: 150,
    isFeatured: true,
    description:
      'Sunshine-yellow haldi under marigold canopies followed by a mehndi afternoon of colourful umbrellas, folk musicians and live chaat counters — playful, vibrant and deeply personal.',
    images: ['haldi-bride', 'haldi-ceremony', 'haldi-decor', 'mehndi-closeup', 'mehndi-marigold', 'decor-mehndi-setup', 'decor-outdoor-mehndi'],
  },
  {
    title: 'Lakeside Celebrations in Udaipur',
    category: 'Destination',
    location: 'Udaipur, Rajasthan',
    venue: 'City Palace precinct, Udaipur',
    weddingStyle: 'Destination',
    guestCount: 220,
    isFeatured: true,
    description:
      'A destination wedding for guests flying in from four countries — boat transfers across the lake, a sundowner welcome dinner and an open-air ceremony framed by the Aravalli hills.',
    images: ['venue-udaipur-palace', 'venue-udaipur-golden', 'couple-river', 'decor-outdoor-setup', 'decor-reception-canopy', 'venue-lake-palace'],
  },
  {
    title: 'Sangeet Under the Stars',
    category: 'Pre-Wedding Rituals',
    location: 'Gurugram, Haryana',
    venue: 'Farmhouse lawns, Gurugram',
    weddingStyle: 'Pre-Wedding Rituals',
    guestCount: 300,
    isFeatured: true,
    description:
      'Choreographed family performances, a dhol-led baraat rehearsal and a stage glowing in pinks and golds — a sangeet night that had every generation on the dance floor.',
    images: ['sangeet-ladies', 'baraat-dance', 'decor-reception-stage', 'punjabi-groomsmen', 'couple-celebration'],
  },
  {
    title: 'An Intimate Garden Wedding',
    category: 'Modern & Intimate',
    location: 'Delhi NCR',
    venue: 'Private garden estate',
    weddingStyle: 'Modern & Intimate',
    guestCount: 80,
    isFeatured: true,
    description:
      'Eighty guests, a white-and-blush palette and a canopy of hanging florals — a modern, pared-back celebration that put the couple and their closest people at the centre of everything.',
    images: ['couple-canopy', 'couple-woods', 'decor-chandelier-lawn', 'decor-aisle', 'couple-newlywed'],
  },
  {
    title: 'Backwater Vows in Kerala',
    category: 'Destination',
    location: 'Alleppey, Kerala',
    venue: 'Backwater resort, Alleppey',
    weddingStyle: 'Destination',
    guestCount: 120,
    isFeatured: false,
    description:
      'A serene South Indian ceremony beside the backwaters — jasmine garlands, kasavu silks, a traditional sadya on banana leaves and a houseboat sunset for the newlyweds.',
    images: ['venue-kerala', 'bride-south', 'venue-kerala-river', 'couple-traditional'],
  },
  {
    title: 'The Grand Baraat',
    category: 'Traditional',
    location: 'Jodhpur, Rajasthan',
    venue: 'Fort palace, Jodhpur',
    weddingStyle: 'Traditional',
    guestCount: 450,
    isFeatured: false,
    description:
      'A groom’s arrival worthy of royalty — a gilded carriage, a decorated horse, a brass band and fireworks lighting up the fort walls before the varmala.',
    images: ['baraat-carriage', 'baraat-horse', 'groom-sherwani', 'couple-sherwani', 'couple-embrace'],
  },
];

const sliders = [
  {
    image: 'hero-palace-couple',
    eyebrow: 'Luxury Wedding Planners',
    title: 'Where Love Stories Become Legends',
    subtitle: 'Luxury Indian weddings planned with heart — from the first roka to the final vidaai, every detail handled by our team.',
    buttonText: 'Plan Your Wedding',
    buttonLink: '/contact',
  },
  {
    image: 'hero-mandap',
    eyebrow: 'Rooted in Tradition',
    title: 'Sacred Vows, Timeless Rituals',
    subtitle: "Mandaps, pheras and every custom honoured with grace — designed around your family's traditions.",
    buttonText: 'Explore Our Services',
    buttonLink: '/services',
  },
  {
    image: 'hero-grand-decor',
    eyebrow: 'Wedding Décor & Design',
    title: 'Décor That Takes Your Breath Away',
    subtitle: 'Floral mandaps, crystal chandeliers and cinematic lighting crafted by our in-house design team.',
    buttonText: 'See Our Décor',
    buttonLink: '/services/wedding-decor',
  },
  {
    image: 'hero-udaipur-night',
    eyebrow: 'Destination Weddings',
    title: 'Royal Weddings in India’s Most Beautiful Cities',
    subtitle: "Udaipur's lake palaces, Jaipur's forts, Goa's beaches and Kerala's backwaters — travel, stays and guests, all taken care of.",
    buttonText: 'Explore Destinations',
    buttonLink: '/destination-weddings',
  },
  {
    image: 'hero-mehndi',
    eyebrow: 'Mehndi · Haldi · Sangeet',
    title: 'Every Ritual, Beautifully Celebrated',
    subtitle: 'Haldi mornings, mehndi afternoons and sangeet nights — curated with colour, music and joy.',
    buttonText: 'View Our Gallery',
    buttonLink: '/gallery',
  },
];

const serviceCards = [
  { slug: 'destination-weddings', href: '/destination-weddings', category: 'wedding', icon: '✈️', image: 'venue-udaipur-palace', isFeatured: true,
    title: 'Destination Weddings',
    shortDescription: 'Seamlessly curated weddings across Udaipur, Jaipur, Goa, Kerala and international locales — every detail handled with precision.',
    description: "From Udaipur's serene lake palaces to Goa's sunlit shores and international locales — we create seamless destination celebrations that transport your guests into a dream. Venue scouting, guest travel and stays, local vendors and permissions are all managed by our team.",
    features: ['Destination & venue scouting', 'Guest travel, stays & hospitality desk', 'Local vendor & permit management', 'Welcome kits and itineraries'] },
  { slug: 'wedding-decor', category: 'wedding', icon: '🌸', image: 'hero-grand-decor', isFeatured: true,
    shortDescription: 'From floral mandaps to cinematic lighting, our décor team transforms venues into breathtaking dreamscapes unique to your story.' },
  { slug: 'photography', category: 'wedding', icon: '📸', image: 'couple-celebration', isFeatured: true,
    shortDescription: 'Artistic photographers and cinematic filmmakers who capture every stolen glance, tearful embrace and joyful dance — timelessly.' },
  { slug: 'venue-management', category: 'wedding', icon: '🏛️', image: 'venue-lake-palace', isFeatured: true,
    shortDescription: 'From palace properties to boutique resorts, we manage every venue detail — logistics, décor, catering coordination and guest experience.' },
  { slug: 'catering', category: 'wedding', icon: '🍽️', image: 'catering-thalis', isFeatured: true,
    shortDescription: 'A curated feast spanning regional Indian cuisines and international menus, styled with elegance to delight every palate.' },
  { slug: 'mehndi', category: 'wedding', icon: '🌿', image: 'mehndi-closeup', isFeatured: true,
    shortDescription: 'Celebrated mehndi artists and bridal beauty teams so you look and feel absolutely radiant through every function.' },
  { slug: 'entertainment', category: 'wedding', icon: '🎵', image: 'sangeet-ladies',
    shortDescription: 'Sangeet choreography, live bands, DJs, dhol and surprise acts that keep every generation on the dance floor.' },
  { slug: 'invitations', category: 'wedding', icon: '✉️', image: 'invitation-suite',
    shortDescription: 'Bespoke wedding stationery — handcrafted invitation suites, monograms, digital e-invites and welcome kits.' },
  { slug: 'bachelor-party', href: '/bachelor-party', category: 'wedding', icon: '🥂', image: 'party-sparklers-beach',
    title: 'Bachelor & Bachelorette Parties',
    shortDescription: 'Pre-wedding getaways and parties — from Goa weekends to rooftop soirées — planned around the guest of honour.',
    description: 'Tailored pre-wedding celebrations — from intimate gatherings to epic adventures — designed around the personality and preferences of the guest of honour. We handle travel, stays, experiences, décor and the after-party.',
    features: ['Goa, Rishikesh & international getaways', 'Themed parties & décor', 'Curated experiences & activities', 'Travel and stay management'] },
  { slug: 'honeymoon', category: 'wedding', icon: '🌅', image: 'honeymoon-beach',
    shortDescription: 'Romantic, carefully curated honeymoon itineraries — Maldivian overwater villas, Kerala backwaters and Himalayan retreats.' },
  { slug: 'anniversary', category: 'wedding', icon: '💍', image: 'anniversary-dinner',
    shortDescription: 'Intimate dinners, surprise parties and vow renewals that celebrate the milestones of your love story.' },
  { slug: 'corporate-events', category: 'event', icon: '🎯', image: 'event-corporate',
    shortDescription: 'Corporate galas, product launches, dealer meets and brand activations — executed with the precision of our weddings.' },
  { slug: 'fashion-shows', category: 'event', icon: '👗', image: 'event-fashion',
    shortDescription: 'Runway shows, designer showcases and trousseau events with full staging, lighting and backstage management.' },
  { slug: 'award-nights', category: 'event', icon: '🏆', image: 'event-gala',
    shortDescription: 'Black-tie award ceremonies and gala dinners with complete production — staging, lighting, sound and hosting.' },
  { slug: 'conference', category: 'event', icon: '📊', image: 'event-conference-panel',
    title: 'Conference & Expo',
    shortDescription: 'Conferences, summits and exhibitions for 30 to 1,000+ delegates, managed end to end.' },
];

const processSteps = [
  { stepNumber: 1, title: 'Consultation', description: 'A personal conversation to understand your vision, families, traditions and the unique essence of your love story.' },
  { stepNumber: 2, title: 'Concept & Design', description: 'Our creative team crafts a bespoke wedding concept — mood boards, theme, colour palette and style direction.' },
  { stepNumber: 3, title: 'Planning & Curation', description: 'We orchestrate every detail — venue, vendors, timelines and logistics — managing it all so you simply enjoy.' },
  { stepNumber: 4, title: 'Flawless Execution', description: 'On your day, our team is on-ground ensuring every ritual and moment unfolds exactly as you dreamed.' },
];

// SAMPLE testimonials — replace with real client reviews before launch.
const testimonials = [
  { name: 'Ananya & Vikram', serviceType: 'Destination Wedding', location: 'Udaipur',
    text: 'From the welcome dinner to the vidaai, everything ran like clockwork. Our families still talk about the mandap at sunset — we simply got to enjoy our own wedding.' },
  { name: 'Priya & Arjun', serviceType: 'Full Wedding Planning', location: 'New Delhi',
    text: 'Six hundred guests, four functions and not a single thing we had to chase. The team understood both our families’ customs and blended them beautifully.' },
  { name: 'Kavya & Siddharth', serviceType: 'Wedding Décor', location: 'Jaipur',
    text: 'The haldi and mehndi décor was exactly the burst of colour we imagined — marigolds everywhere, umbrellas, folk music. Every guest wanted photos in that courtyard.' },
  { name: 'Meera & Rahul', serviceType: 'Mehndi & Sangeet', location: 'Gurugram',
    text: 'They choreographed our whole family for the sangeet — even my grandfather danced! Warm, organised and genuinely invested in making it special.' },
  { name: 'Nisha & Pranav', serviceType: 'Destination Wedding', location: 'Kerala',
    text: 'A backwater wedding sounded impossible to manage from Delhi, but they handled travel, stays and the sadya flawlessly. It felt calm, personal and very us.' },
  { name: 'Riya & Kabir', serviceType: 'Photography & Film', location: 'Jodhpur',
    text: 'The baraat at the fort was straight out of a film — and the photographers they brought in captured every bit of it. Our album is a treasure.' },
];

const faqs = [
  { category: 'Process', question: 'How far in advance should we book WAH Momentz?', answer: 'We recommend booking 9–12 months ahead for destination weddings and 6–9 months for weddings in Delhi NCR. Peak muhurat dates between November and February fill quickly, but we do take on shorter timelines when availability allows.' },
  { category: 'Services', question: 'What does full wedding planning include?', answer: 'Full planning covers concept and design, venue selection, vendor management (décor, catering, photography, entertainment), budgeting, guest hospitality, timelines and complete on-ground coordination for every function — from haldi and mehndi to the reception.' },
  { category: 'Services', question: 'Do you plan destination weddings?', answer: 'Yes. We plan destination weddings across India — Udaipur, Jaipur, Jodhpur, Goa, Kerala, Rishikesh and more — as well as select international destinations. We handle venue booking, guest travel and stays, local vendors and permissions.' },
  { category: 'Pricing', question: 'How does your pricing work?', answer: 'Every wedding is quoted individually based on the number of functions, guest count, destination and services required. After the first consultation we share a transparent, itemised proposal — there are no hidden charges.' },
  { category: 'Services', question: 'Can we use our own vendors alongside your team?', answer: 'Absolutely. We are happy to coordinate with vendors you already love and fill any gaps from our trusted network. Our goal is your vision.' },
  { category: 'General', question: 'Do you handle different wedding traditions and interfaith ceremonies?', answer: 'Yes — Punjabi, Marwari, Bengali, South Indian, Gujarati, Sikh, Muslim, Christian and interfaith ceremonies. We work closely with your families and officiants so every custom is honoured correctly.' },
  { category: 'Services', question: 'Can we book you only for décor or only for coordination?', answer: 'Yes. Along with full planning we offer partial planning, décor-only and wedding-day coordination packages, tailored to exactly what you need.' },
  { category: 'Support', question: 'What happens if a vendor cancels at the last minute?', answer: 'We vet every vendor carefully, and our network lets us arrange qualified replacements quickly if an emergency ever arises — so your celebration stays on track.' },
];

const blogs = [
  {
    slug: 'questions-to-ask-your-wedding-planner',
    title: '10 Questions to Ask Your Wedding Planner Before You Sign',
    category: 'Planning Tips',
    image: 'couple-fairy-lights',
    excerpt: 'Choosing a planner is one of the biggest decisions of your wedding journey. These ten questions help you understand scope, budget and working style before you commit.',
    tags: ['wedding planner', 'planning tips', 'budget'],
    content: `<p>Your wedding planner will be with you through every decision — from the first venue visit to the last guest leaving the reception. Before you sign, make sure you are aligned on these points.</p>
<h2>1. Which functions are included?</h2><p>Roka, haldi, mehndi, sangeet, wedding and reception all need different teams and set-ups. Ask for a function-by-function scope.</p>
<h2>2. How is the fee structured?</h2><p>Is it a fixed planning fee or a percentage of the budget? What is billed separately?</p>
<h2>3. Who will be our point of contact?</h2><p>Know who you will speak to every week and who will be on-ground on the day.</p>
<h2>4. Can we see full galleries of past weddings?</h2><p>Instagram highlights are curated — full galleries show consistency.</p>
<h2>5. How do you choose and manage vendors?</h2><p>Ask whether you can bring your own vendors and how payments are handled.</p>
<h2>6. What does the timeline look like?</h2><p>A good planner will share milestones: venue lock, design approval, invitations, final run-through.</p>
<h2>7. How do you handle family traditions?</h2><p>Especially for inter-community weddings, ask how they research and respect each family's customs.</p>
<h2>8. What is the plan for bad weather?</h2><p>For outdoor functions, ask about rain plans and backup spaces.</p>
<h2>9. How do you manage guest hospitality?</h2><p>Airport pickups, room allocation and welcome desks make a huge difference to guests' experience.</p>
<h2>10. What happens if something goes wrong?</h2><p>Ask about contingency budgets, backup vendors and how decisions are made on the day.</p>`,
  },
  {
    slug: 'royal-wedding-venues-in-rajasthan',
    title: 'Royal Wedding Venues in Rajasthan: Udaipur, Jaipur & Jodhpur',
    category: 'Destination Weddings',
    image: 'venue-udaipur-palace',
    excerpt: "From Udaipur's lake palaces to Jodhpur's fort walls — how to choose the right Rajasthan city and venue for your destination wedding.",
    tags: ['destination wedding', 'Rajasthan', 'Udaipur', 'Jaipur', 'Jodhpur'],
    content: `<p>Rajasthan remains India's favourite destination for a royal wedding. Each city has a distinct personality — here is how to choose.</p>
<h2>Udaipur — the city of lakes</h2><p>Lake-facing palaces and island venues make Udaipur perfect for sunset pheras and boat arrivals. Ideal for 150–400 guests; book early for peak season.</p>
<h2>Jaipur — grandeur and accessibility</h2><p>With excellent flight and road connectivity from Delhi, Jaipur suits larger guest lists. Heritage havelis are wonderful for haldi and mehndi, while fort hotels deliver a grand wedding night.</p>
<h2>Jodhpur — dramatic forts</h2><p>Blue-city views and fort ramparts create an unforgettable backdrop for a baraat and a fireworks-lit varmala.</p>
<h2>Planning tips</h2><ul><li>Visit in the same month as your wedding to understand weather and light.</li><li>Check sound and fireworks permissions early.</li><li>Block rooms for guests at least 6–9 months ahead.</li></ul>`,
  },
  {
    slug: 'planning-the-perfect-mehndi-and-haldi',
    title: 'Planning the Perfect Mehndi & Haldi: Décor, Music and Menu',
    category: 'Rituals & Traditions',
    image: 'haldi-bride',
    excerpt: 'Marigolds, music and messy fun — ideas to make your pre-wedding rituals colourful, comfortable and completely you.',
    tags: ['mehndi', 'haldi', 'pre-wedding', 'decor'],
    content: `<p>Haldi and mehndi are the most relaxed, colourful functions of an Indian wedding. A little planning keeps them joyful rather than chaotic.</p>
<h2>Décor</h2><p>Think marigold and jasmine garlands, colourful umbrellas, low seating with bolsters and plenty of shade for daytime functions.</p>
<h2>Mehndi artists</h2><p>Plan one artist for every 8–10 guests who want mehndi, plus a senior artist for the bride's bridal design (4–6 hours).</p>
<h2>Music</h2><p>Dholis, folk singers or a live band of Bollywood classics keep energy high without overpowering conversation.</p>
<h2>Menu</h2><p>Live chaat counters, fresh juices and finger food work best — guests with mehndi on their hands will thank you.</p>
<h2>Practical touches</h2><ul><li>Keep old towels and slippers ready for haldi guests.</li><li>Protect outfits with a colour-safe changing area.</li><li>Schedule photos before the haldi begins.</li></ul>`,
  },
  {
    slug: 'wedding-decor-trends-2026',
    title: 'Indian Wedding Décor Trends for the 2026 Season',
    category: 'Décor & Design',
    image: 'decor-floral-stage',
    excerpt: 'Floral ceilings, statement chandeliers and heritage-inspired mandaps — the décor ideas couples are loving this season.',
    tags: ['decor', 'trends', 'mandap'],
    content: `<p>This season's weddings blend heritage with a lighter, more personal touch.</p>
<h2>Floral ceilings and hanging installations</h2><p>Suspended florals and cascading garlands create intimacy in large ballrooms and lawns alike.</p>
<h2>Statement chandeliers outdoors</h2><p>Crystal chandeliers hung from trees or pergolas bring evening glamour to garden receptions.</p>
<h2>Heritage-inspired mandaps</h2><p>Carved wooden pillars, brass details and jharokha frames give mandaps a timeless, rooted feel.</p>
<h2>Colour stories by function</h2><p>Yellow and green for haldi, jewel tones for sangeet and blush-ivory for the wedding — each function gets its own mood.</p>`,
  },
];

const ads = [
  {
    title: 'Wedding Season 2026–27 Bookings Open',
    description: 'Lock your dates for the November–February muhurats. Book a free first consultation and get a personalised venue shortlist.',
    image: 'decor-floral-stage',
    link: '/contact',
    buttonText: 'Book Free Consultation',
  },
  {
    title: 'Destination Weddings in Rajasthan, Goa & Kerala',
    description: 'Palaces, beaches and backwaters — end-to-end planning with guest travel, stays and hospitality handled by our team.',
    image: 'venue-udaipur-palace',
    link: '/destination-weddings',
    buttonText: 'Explore Destinations',
  },
];

// ── Seeding ────────────────────────────────────────────────────────────────

async function insertIfEmpty(db, name, docs) {
  const col = db.collection(name);
  if ((await col.countDocuments()) > 0) {
    console.log(`• ${name}: already has data — skipped`);
    return;
  }
  await col.insertMany(docs);
  console.log(`✓ ${name}: inserted ${docs.length}`);
}

async function main() {
  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
  const db = mongoose.connection.db;
  console.log(`Connected to ${db.databaseName}\n`);

  // Admin
  const admins = db.collection('admins');
  if ((await admins.countDocuments()) === 0) {
    await admins.insertOne({ email: ADMIN_EMAIL, password: await bcrypt.hash(ADMIN_PASSWORD, 10) });
    console.log(`✓ admins: created ${ADMIN_EMAIL} (change this password after first login)`);
  } else {
    console.log('• admins: already exists — skipped');
  }

  // Categories (wedding styles)
  const categoryCol = db.collection('categories');
  for (const name of categories) {
    const slug = slugify(name);
    const res = await categoryCol.updateOne({ slug }, { $setOnInsert: { name, slug } }, { upsert: true });
    if (res.upsertedCount) console.log(`✓ categories: added ${name}`);
  }
  const categoryIds = Object.fromEntries((await categoryCol.find().toArray()).map((c) => [c.name, c._id]));

  // Wedding gallery
  const year = new Date().getFullYear();
  await insertIfEmpty(
    db,
    'projects',
    projects.map((p, i) => ({
      title: p.title,
      slug: slugify(p.title),
      category: categoryIds[p.category],
      images: p.images.map((k) => img(k)),
      description: p.description,
      location: p.location,
      venue: p.venue,
      clientName: 'Private client',
      year: i < 4 ? year : year - 1,
      weddingStyle: p.weddingStyle,
      guestCount: p.guestCount,
      isFeatured: p.isFeatured,
      isPublished: true,
      createdAt: new Date(Date.now() - i * 86400000),
      updatedAt: now(),
    }))
  );

  // Hero slider
  await insertIfEmpty(
    db,
    'sliders',
    sliders.map((s, i) => ({ ...s, image: img(s.image, 2400), order: i + 1, isActive: true, createdAt: now(), updatedAt: now() }))
  );

  // Services (only slugs that don't exist yet)
  const serviceCol = db.collection('services');
  let order = 1;
  for (const card of serviceCards) {
    const detail = serviceDetails[card.slug] || {};
    const doc = {
      title: card.title || detail.title,
      slug: card.slug,
      href: card.href || '',
      category: card.category,
      icon: card.icon,
      image: img(card.image, 2000),
      shortDescription: card.shortDescription,
      description: card.description || detail.description,
      features: card.features || detail.features || [],
      gallery: [],
      isFeatured: !!card.isFeatured,
      order: order++,
      isActive: true,
      createdAt: now(),
      updatedAt: now(),
    };
    if (!doc.title || !doc.description) throw new Error(`Incomplete service ${card.slug}`);
    const res = await serviceCol.updateOne({ slug: card.slug }, { $setOnInsert: doc }, { upsert: true });
    if (res.upsertedCount) console.log(`✓ services: added ${doc.title}`);
  }

  await insertIfEmpty(
    db,
    'processsteps',
    processSteps.map((s) => ({ ...s, order: s.stepNumber, isActive: true, createdAt: now(), updatedAt: now() }))
  );

  await insertIfEmpty(
    db,
    'testimonials',
    testimonials.map((t, i) => ({ ...t, rating: 5, isPublished: true, isFeatured: i < 3, order: i + 1, approvedAt: now(), createdAt: now(), updatedAt: now() }))
  );

  await insertIfEmpty(
    db,
    'faqs',
    faqs.map((f, i) => ({ ...f, order: i + 1, isActive: true, createdAt: now(), updatedAt: now() }))
  );

  // Blogs (by slug)
  const blogCol = db.collection('blogs');
  for (const [i, b] of blogs.entries()) {
    const words = b.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const doc = {
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      featuredImage: img(b.image, 1600),
      author: 'WAH Momentz',
      category: b.category,
      tags: b.tags,
      isPublished: true,
      isFeatured: i === 0,
      readTime: Math.max(3, Math.ceil(words / 200)),
      seoTitle: b.title,
      seoDescription: b.excerpt.slice(0, 160),
      publishedAt: new Date(Date.now() - i * 9 * 86400000),
      createdAt: now(),
      updatedAt: now(),
    };
    const res = await blogCol.updateOne({ slug: b.slug }, { $setOnInsert: doc }, { upsert: true });
    if (res.upsertedCount) console.log(`✓ blogs: added "${b.title}"`);
  }

  await insertIfEmpty(
    db,
    'adssliders',
    ads.map((a, i) => ({ ...a, image: img(a.image, 900), isActive: true, isPublished: true, order: i + 1, createdAt: now(), updatedAt: now() }))
  );

  // Site settings: create if missing; otherwise only repair values left over from the old template.
  const settingsCol = db.collection('footersettings');
  const settings = await settingsCol.findOne();
  if (!settings) {
    await settingsCol.insertOne({
      companyName: 'WAH Momentz',
      companyDescription:
        "India's premier luxury wedding planning studio. We craft bespoke celebrations that honour your love story — from intimate ceremonies to grand royal weddings.",
      logo: '/logo.svg',
      phone: '+91 98911 06761',
      email: 'wahmomentz@gmail.com',
      address: 'H5-16, Sector 11, Rohini\nNew Delhi — 110085',
      facebookUrl: 'https://facebook.com/wahmomentz',
      instagramUrl: 'https://instagram.com/wahmomentz',
      linkedinUrl: '',
      youtubeUrl: '',
      pinterestUrl: '',
      whatsappNumber: '919891106761',
      copyrightText: 'WAH Momentz. All Rights Reserved.',
      createdAt: now(),
      updatedAt: now(),
    });
    console.log('✓ footersettings: created');
  } else {
    const fix = {};
    if (/urban design/i.test(settings.copyrightText || '')) fix.copyrightText = 'WAH Momentz. All Rights Reserved.';
    if (settings.address === 'Delhi NCR, India') fix.address = 'H5-16, Sector 11, Rohini\nNew Delhi — 110085';
    if (/^https?:\/\/(www\.)?instagram\.com\/?$/.test(settings.instagramUrl || '')) fix.instagramUrl = 'https://instagram.com/wahmomentz';
    if (/^https?:\/\/(www\.)?facebook\.com\/?$/.test(settings.facebookUrl || '')) fix.facebookUrl = 'https://facebook.com/wahmomentz';
    if (/^https?:\/\/(www\.)?linkedin\.com\/?$/.test(settings.linkedinUrl || '')) fix.linkedinUrl = '';
    if (Object.keys(fix).length) {
      await settingsCol.updateOne({ _id: settings._id }, { $set: { ...fix, updatedAt: now() } });
      console.log(`✓ footersettings: repaired ${Object.keys(fix).join(', ')}`);
    } else {
      console.log('• footersettings: ok — skipped');
    }
  }

  console.log('\nDone.');
  await mongoose.disconnect();
}

main().catch(async (err) => {
  console.error('Seed failed:', err);
  await mongoose.disconnect();
  process.exit(1);
});
